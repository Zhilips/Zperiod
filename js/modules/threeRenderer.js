// =============================================================================
// Three.js 3D Atom Renderer
// Performance-optimized: nucleus interior culling, geometry/material caching,
// reusable Vector3 pool, for-loop hot paths, capped DPR
// =============================================================================

// ===== Module-level state =====
let scene, camera, renderer, atomGroup, animationId;
let electrons = [];
let introStartTime = 0;
let isIntroAnimating = false;
let isTopViewMode = false;
let initialCameraZ = 16;
let targetCameraZ = 16;

let _container = null;
let eventAbortController = null;
let threeLoadPromise = null;

let raycaster = null;
let mouse = null;
let hoveredOrbit = null;
let orbitHitTargets = [];

// ===== Caches =====
const geometryCache = new Map();
let sharedMaterials = null;

// Reusable Vector3 pool — allocated once, zero GC pressure in hot loops
let _v1 = null;
let _v2 = null;
let _v3 = null;

// Direct references to avoid getObjectByName() every frame
let _nucleusGroupRef = null;
let _wobbleGroupRef = null;

// ===== Quality profile (segment counts only — trails are always 10) =====
function getQualityProfile(atomicNumber) {
  const dm =
    typeof navigator !== "undefined" && navigator.deviceMemory
      ? navigator.deviceMemory
      : 0;
  const low = dm > 0 && dm <= 4;
  const heavy = atomicNumber >= 37 || low;
  return {
    nucleusSegments: heavy ? 14 : 24,
    electronSegments: heavy ? 10 : 20,
    orbitTubularSegments: heavy ? 44 : 80,
    hitTubularSegments: heavy ? 20 : 32,
    settleIterations: (atomicNumber >= 73 || low) ? 1 : heavy ? 2 : 4,
  };
}

// ===== Geometry cache helpers =====
function getSphereGeometry(radius, segments) {
  const key = `s:${radius}:${segments}`;
  let g = geometryCache.get(key);
  if (!g) {
    g = new THREE.SphereGeometry(radius, segments, segments);
    geometryCache.set(key, g);
  }
  return g;
}

function getTorusGeometry(radius, tube, radial, tubular) {
  const key = `t:${radius}:${tube}:${radial}:${tubular}`;
  let g = geometryCache.get(key);
  if (!g) {
    g = new THREE.TorusGeometry(radius, tube, radial, tubular);
    geometryCache.set(key, g);
  }
  return g;
}

// ===== Shared materials (created once) =====
function ensureSharedMaterials() {
  if (sharedMaterials) return sharedMaterials;
  sharedMaterials = {
    protonMat: new THREE.MeshStandardMaterial({
      color: 0xff2222,
      roughness: 0.25,
      metalness: 0.4,
      emissive: 0xff0000,
      emissiveIntensity: 1.5,
    }),
    neutronMat: new THREE.MeshStandardMaterial({
      color: 0x999999,
      roughness: 0.15,
      metalness: 0.5,
      emissive: 0x333333,
      emissiveIntensity: 0.6,
    }),
    electronMat: new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      roughness: 0.4,
      metalness: 0.6,
    }),
    hitMat: new THREE.MeshBasicMaterial({ visible: false }),
  };
  return sharedMaterials;
}

// ===== Lazy-load Three.js =====
export function ensureThreeLibLoaded() {
  if (typeof window !== "undefined" && window.THREE) {
    return Promise.resolve(window.THREE);
  }
  if (threeLoadPromise) return threeLoadPromise;
  threeLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-zperiod-three="1"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.THREE));
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load script: three.min.js")),
      );
      return;
    }
    const script = document.createElement("script");
    script.src = "three.min.js";
    script.async = true;
    script.dataset.zperiodThree = "1";
    script.onload = () => resolve(window.THREE);
    script.onerror = () =>
      reject(new Error("Failed to load script: three.min.js"));
    document.body.appendChild(script);
  });
  return threeLoadPromise;
}


// ===== Scene Initialization =====
export function init3DScene(container) {
  if (typeof window === "undefined" || !window.THREE) {
    console.error("init3DScene: THREE is not loaded");
    return;
  }

  if (!raycaster) raycaster = new window.THREE.Raycaster();
  if (!mouse) mouse = new window.THREE.Vector2(-1, -1);
  if (!_v1) {
    _v1 = new window.THREE.Vector3();
    _v2 = new window.THREE.Vector3();
    _v3 = new window.THREE.Vector3();
  }

  _container = container || _container;
  if (renderer) {
    if (
      _container &&
      renderer.domElement &&
      !_container.contains(renderer.domElement)
    ) {
      _container.appendChild(renderer.domElement);
      if (_container.clientWidth > 0 && _container.clientHeight > 0) {
        renderer.setSize(_container.clientWidth, _container.clientHeight);
      }
    }
    return;
  }
  if (!_container) {
    console.error("init3DScene: container not found");
    return;
  }
  try {
    scene = new THREE.Scene();
    const width = _container.clientWidth || 400;
    const height = _container.clientHeight || 400;
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
    } catch (e1) {
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        });
      } catch (e2) {
        const msg = document.createElement("div");
        msg.style.cssText =
          "color:#333;display:flex;justify-content:center;align-items:center;height:100%;flex-direction:column;text-align:center;padding:20px;";
        msg.innerHTML =
          '<div style="font-size:1.2rem;margin-bottom:10px;">3D View Unavailable</div><div style="font-size:0.8rem;opacity:0.7;">请在Chrome地址栏输入 chrome://settings/system<br>确保"使用硬件加速"已开启，然后刷新页面</div>';
        _container.appendChild(msg);
        return;
      }
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    _container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    atomGroup = new THREE.Group();
    scene.add(atomGroup);
    atomGroup.rotation.set(0, 0, 0);

    if (eventAbortController) eventAbortController.abort();
    eventAbortController = new AbortController();
    const sig = { signal: eventAbortController.signal };

    let isDragging = false;
    let prevPos = { x: 0, y: 0 };
    const canvasEl = renderer.domElement;

    canvasEl.addEventListener("mousedown", (e) => {
      isDragging = true;
      isIntroAnimating = false;
      prevPos = { x: e.offsetX, y: e.offsetY };
      canvasEl.style.cursor = "grabbing";
    }, sig);

    canvasEl.addEventListener("mousemove", (e) => {
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (!isDragging) return;
      const dx = e.offsetX - prevPos.x;
      const dy = e.offsetY - prevPos.y;
      atomGroup.rotation.y += dx * 0.005;
      atomGroup.rotation.x += dy * 0.005;
      prevPos = { x: e.offsetX, y: e.offsetY };
    }, sig);

    window.addEventListener("mouseup", () => {
      isDragging = false;
      canvasEl.style.cursor = "grab";
    }, sig);

    canvasEl.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        isIntroAnimating = false;
        prevPos = { x: e.touches[0].pageX, y: e.touches[0].pageY };
      }
    }, { passive: false, signal: eventAbortController.signal });

    canvasEl.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      e.preventDefault();
      const dx = e.touches[0].pageX - prevPos.x;
      const dy = e.touches[0].pageY - prevPos.y;
      atomGroup.rotation.y += dx * 0.005;
      atomGroup.rotation.x += dy * 0.005;
      prevPos = { x: e.touches[0].pageX, y: e.touches[0].pageY };
    }, { passive: false, signal: eventAbortController.signal });

    window.addEventListener("touchend", () => { isDragging = false; }, sig);

    canvasEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      isIntroAnimating = false;
      camera.position.z = Math.max(4, Math.min(60, camera.position.z + e.deltaY * 0.02));
    }, { passive: false, signal: eventAbortController.signal });

    canvasEl.style.cursor = "grab";
    window.addEventListener("resize", onWindowResize, sig);
  } catch (error) {
    console.error("Critical error initializing 3D scene:", error);
  }
}

// ===== Atom Structure Builder =====
export function updateAtomStructure(element) {
  if (!atomGroup) return;
  while (atomGroup.children.length > 0) {
    atomGroup.remove(atomGroup.children[0]);
  }
  electrons = [];
  orbitHitTargets = [];
  _nucleusGroupRef = null;
  _wobbleGroupRef = null;

  const nucleusGroup = new THREE.Group();
  nucleusGroup.name = "nucleusGroup";
  atomGroup.add(nucleusGroup);
  _nucleusGroupRef = nucleusGroup;

  const wobbleGroup = new THREE.Group();
  wobbleGroup.name = "wobbleGroup";
  atomGroup.add(wobbleGroup);
  _wobbleGroupRef = wobbleGroup;

  const atomicNumber = element.number;
  const quality = getQualityProfile(atomicNumber);

  // --- Neutron count ---
  let neutronCount;
  if (atomicNumber === 1) {
    neutronCount = 0;
  } else {
    const eduData = element.educational || {};
    if (eduData && eduData.neutronOverride) {
      neutronCount = eduData.neutronOverride;
    } else if (element.weight && !isNaN(element.weight)) {
      neutronCount = Math.round(element.weight) - atomicNumber;
    } else {
      neutronCount = atomicNumber;
    }
  }

  const mats = ensureSharedMaterials();
  const particleRadius = 0.6;
  const protonGeo = getSphereGeometry(particleRadius, quality.nucleusSegments);
  const neutronGeo = getSphereGeometry(particleRadius, quality.nucleusSegments);

  // --- Build & shuffle particle list ---
  const particles = [];
  for (let i = 0; i < atomicNumber; i++) particles.push({ type: "proton" });
  for (let i = 0; i < neutronCount; i++) particles.push({ type: "neutron" });
  for (let i = particles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [particles[i], particles[j]] = [particles[j], particles[i]];
  }

  // --- Position particles using Fibonacci sphere ---
  const phi = Math.PI * (3 - Math.sqrt(5));
  const n = particles.length;
  const clusterScale = Math.pow(n, 1 / 3) * particleRadius * 0.8;
  for (let i = 0; i < n; i++) {
    const p = particles[i];
    const k = i + 0.5;
    const y = 1 - (k / n) * 2;
    const theta = phi * k;
    const rr = Math.sqrt(1 - y * y);
    p.pos = new THREE.Vector3(
      Math.cos(theta) * rr * clusterScale + (Math.random() - 0.5) * 0.15,
      y * clusterScale + (Math.random() - 0.5) * 0.15,
      Math.sin(theta) * rr * clusterScale + (Math.random() - 0.5) * 0.15,
    );
  }

  // --- Settle physics (for-loop, no forEach) ---
  if (n === 1) {
    particles[0].pos.set(0, 0, 0);
  } else if (n === 2) {
    particles[0].pos.set(-0.4, 0, 0);
    particles[1].pos.set(0.4, 0, 0);
  } else if (n > 2) {
    nucleusGroup.userData.particles = particles;
    nucleusGroup.userData.physicsIterationsRemaining = 0;
    const repDist = particleRadius * 1.5;
    for (let iter = 0; iter < quality.settleIterations; iter++) {
      for (let a = 0; a < n; a++) {
        const p1 = particles[a];
        _v1.set(0, 0, 0);
        _v3.copy(p1.pos).multiplyScalar(-0.1);
        _v1.add(_v3);
        for (let b = 0; b < n; b++) {
          if (a === b) continue;
          _v2.subVectors(p1.pos, particles[b].pos);
          const d = _v2.length();
          if (d < repDist && d > 0.01) {
            _v2.normalize().multiplyScalar((repDist - d) * 0.2);
            _v1.add(_v2);
          }
        }
        p1.pos.add(_v1);
      }
    }
  }

  // --- Red point light for nucleus glow ---
  if (atomicNumber > 1) {
    let lightIntensity = 2.0;
    if (atomicNumber === 11 && window._zperiodNaMode === "cloud") lightIntensity = 5.0;
    nucleusGroup.add(new THREE.PointLight(0xff0000, lightIntensity, 15));
  }

  // --- NUCLEUS INTERIOR CULLING ---
  // For atoms with many nucleons, interior particles are completely hidden
  // by outer ones. We skip creating meshes for them → huge draw call savings.
  // Example: Oganesson has ~294 nucleons, but only ~120 are on the surface.
  const CULL_THRESHOLD = 20; // Only cull for nuclei with > 20 particles
  let surfaceParticles = particles;

  if (n > CULL_THRESHOLD) {
    // Find max distance from center
    let maxDist = 0;
    for (let i = 0; i < n; i++) {
      const d = particles[i].pos.length();
      if (d > maxDist) maxDist = d;
    }
    // Keep particles within 1.5 particle diameters of the surface
    const cutoff = maxDist - particleRadius * 3;
    if (cutoff > 0) {
      surfaceParticles = [];
      for (let i = 0; i < n; i++) {
        if (particles[i].pos.length() >= cutoff) {
          surfaceParticles.push(particles[i]);
        }
      }
    }
  }

  // --- Create meshes only for visible (surface) particles ---
  for (let i = 0; i < surfaceParticles.length; i++) {
    const p = surfaceParticles[i];
    const mesh = new THREE.Mesh(
      p.type === "proton" ? protonGeo : neutronGeo,
      p.type === "proton" ? mats.protonMat : mats.neutronMat,
    );
    mesh.position.copy(p.pos);
    p.mesh = mesh;
    nucleusGroup.add(mesh);
  }

  // --- Helper: Volumetric Cloud Layers ---
  const buildCloudLayer = (cloudRadius, layers, maxOpacity) => {
    const cloudGeo = getSphereGeometry(cloudRadius, 32); 
    const cloudGroup = new THREE.Group();
    cloudGroup.userData = { isCloud: true };
    for (let i = 0; i < layers; i++) {
       // Smooth spacing from 1.0 (outer) down to 0.08 (core focus)
       const scale = 1.0 - (i / layers) * 0.92; 
       
       const x = i / layers; 
       // Gaussian density profile approximation: core is densest
       const intensity = Math.exp(-Math.pow((1.0 - x) * 3.0, 2));
       
       // Distribute opacity to prevent solid clipping on many layers
       const layerOpacity = (0.02 + intensity) * maxOpacity * (8.0 / layers);
       
       const r = 0.0 + intensity * 0.2;
       const g = 0.3 + intensity * 0.5;
       const b = 0.9 + intensity * 0.1;
       
       const shellMat = new THREE.MeshBasicMaterial({
         color: new THREE.Color(r, g, b),
         transparent: true,
         opacity: Math.min(layerOpacity, 1.0),
         blending: THREE.NormalBlending, 
         depthWrite: false,
         side: THREE.DoubleSide
       });
       const shell = new THREE.Mesh(cloudGeo, shellMat);
       shell.scale.set(scale, scale, scale);
       cloudGroup.add(shell);
    }
    return cloudGroup;
  };

  // --- Electron shells ---
  const shells = [2, 8, 8, 18, 18, 32, 32];
  
  let electronsLeft = atomicNumber;
  for (let s = 0; s < shells.length; s++) {
    if (electronsLeft <= 0) break;
    const capacity = shells[s];
    const count = Math.min(electronsLeft, capacity);
    electronsLeft -= count;
    const radius = 4.5 + s * 2.5;

    // Standard Planetary Bohr Render Path
    // Orbit ring
    const orbitGeo = getTorusGeometry(radius, 0.04, 20, quality.orbitTubularSegments);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x8d7f71,
      transparent: true,
      opacity: 0.3,
    });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = Math.PI / 2;
    orbit.userData = { originalOpacity: 0.3, highlightOpacity: 0.8, originalColor: 0x8d7f71 };
    wobbleGroup.add(orbit);

    // Invisible hit target for raycaster hover
    const hitGeo = getTorusGeometry(radius, 0.4, 8, quality.hitTubularSegments);
    const hitMesh = new THREE.Mesh(hitGeo, mats.hitMat);
    hitMesh.rotation.x = Math.PI / 2;
    hitMesh.userData = { orbitMesh: orbit };
    wobbleGroup.add(hitMesh);
    orbitHitTargets.push(hitMesh);

    // Electron geometry + trail geometries
    const elGeo = getSphereGeometry(0.3, quality.electronSegments);
    const TRAIL_LENGTH = 10;
    const trailGeos = [];
    for (let t = 0; t < TRAIL_LENGTH; t++) {
      trailGeos.push(new THREE.SphereGeometry(0.2 - t * 0.015, 8, 8));
    }

    for (let e = 0; e < count; e++) {
      const elMesh = new THREE.Mesh(elGeo, mats.electronMat);
      const angleOffset = (e / count) * Math.PI * 2;
      elMesh.userData = {
        radius: radius,
        angle: angleOffset,
        speed: 0.02 - s * 0.002,
        trails: [],
      };
      elMesh.position.x = radius * Math.cos(angleOffset);
      elMesh.position.z = radius * Math.sin(angleOffset);

      for (let t = 0; t < TRAIL_LENGTH; t++) {
        const tMat = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          transparent: true,
          opacity: 0.3 - t * 0.03,
        });
        const tMesh = new THREE.Mesh(trailGeos[t], tMat);
        tMesh.position.copy(elMesh.position);
        wobbleGroup.add(tMesh);
        elMesh.userData.trails.push(tMesh);
      }
      wobbleGroup.add(elMesh);
      electrons.push(elMesh);
    }
  }

  // --- Camera fit ---
  let actualMaxRadius = 4.5;
  let shellsUsed = 0;
  let tempElectrons = atomicNumber;
  for (let s = 0; s < shells.length; s++) {
    if (tempElectrons <= 0) break;
    tempElectrons -= shells[s];
    shellsUsed = s + 1;
  }
  if (shellsUsed > 0) {
    actualMaxRadius = 4.5 + (shellsUsed - 1) * 2.5;
  }
  
  atomGroup.userData.maxRadius = actualMaxRadius;
  atomGroup.userData.popStartTime = Date.now();
  atomGroup.scale.set(0.1, 0.1, 0.1);

  // Keep the overlay containers unmounted/hidden when rendering standard view
  const toggleUi = document.getElementById("na-model-toggle");
  if (toggleUi) toggleUi.style.display = "none";
  
  const eduOverlay = document.getElementById("na-edu-overlay");
  if (eduOverlay) eduOverlay.style.display = "none";
}

// ===== Window Resize Handler =====
export function onWindowResize() {
  if (!camera || !renderer) return;
  if (_container.clientHeight === 0) {
    const visualPane = document.querySelector(".modal-visual-pane");
    if (visualPane) _container.style.height = visualPane.clientHeight + "px";
  }
  camera.aspect = _container.clientWidth / _container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(_container.clientWidth, _container.clientHeight);
}

// ===== Reset Camera View =====
export function reset3DView() {
  if (!atomGroup) return;
  introStartTime = Date.now();
  isIntroAnimating = true;
  atomGroup.rotation.set(0, 0, 0);
  const vFOV = 45 * (Math.PI / 180);
  const r = atomGroup.userData.maxRadius || 4.5;
  let dist = (r * 1.2) / Math.tan(vFOV / 2);
  if (camera.aspect < 1) dist = dist / camera.aspect;
  targetCameraZ = dist;
  initialCameraZ = 16;
  camera.position.z = initialCameraZ;
}

// ===== Animation Loop =====
export function animateAtom() {
  if (!renderer) return;
  animationId = requestAnimationFrame(animateAtom);

  const isPaused = window._zperiodAnimPaused || false;
  const speedMul = (typeof window._zperiodAnimSpeed === "number") ? window._zperiodAnimSpeed : 0.6;
  const time = Date.now() * 0.001;

  if (!atomGroup) return;

  // --- Orbit hover (raycaster) ---
  if (orbitHitTargets.length > 0) {
    raycaster.setFromCamera(mouse, camera);
    try {
      const intersects = raycaster.intersectObjects(orbitHitTargets, false);
      let foundOrbit = null;
      for (let i = 0; i < intersects.length; i++) {
        const ud = intersects[i].object.userData;
        if (ud && ud.orbitMesh) { foundOrbit = ud.orbitMesh; break; }
      }
      if (hoveredOrbit && hoveredOrbit !== foundOrbit) {
        hoveredOrbit.material.opacity = hoveredOrbit.userData.originalOpacity || 0.3;
        if (hoveredOrbit.userData.originalColor !== undefined) {
          hoveredOrbit.material.color.setHex(hoveredOrbit.userData.originalColor);
        }
      }
      if (foundOrbit) {
        foundOrbit.material.opacity = foundOrbit.userData.highlightOpacity || 0.8;
        foundOrbit.material.color.setHex(0xffaa00);
        hoveredOrbit = foundOrbit;
      } else {
        hoveredOrbit = null;
      }
    } catch (e) { /* teardown race */ }
  }

  // --- Nucleus lazy physics (disabled by default, physicsIterationsRemaining=0) ---
  const ng = _nucleusGroupRef;
  if (ng && ng.userData.physicsIterationsRemaining > 0) {
    const particles = ng.userData.particles;
    const runCount = Math.min(ng.userData.physicsIterationsRemaining, 5);
    const repDist = 0.9; // 0.6 * 1.5
    for (let k = 0; k < runCount; k++) {
      for (let a = 0; a < particles.length; a++) {
        const p1 = particles[a];
        _v1.set(0, 0, 0);
        _v3.copy(p1.pos).multiplyScalar(-0.1);
        _v1.add(_v3);
        for (let b = 0; b < particles.length; b++) {
          if (a === b) continue;
          _v2.subVectors(p1.pos, particles[b].pos);
          const d = _v2.length();
          if (d < repDist && d > 0.01) {
            _v2.normalize().multiplyScalar((repDist - d) * 0.2);
            _v1.add(_v2);
          }
        }
        p1.pos.add(_v1);
      }
    }
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.mesh) p.mesh.position.copy(p.pos);
    }
    ng.userData.physicsIterationsRemaining -= runCount;
  }

  // --- Intro camera animation ---
  const isNa = window.currentAtomElement && window.currentAtomElement.number === 11;
  const isEdu = isNa && window._zperiodNaMode === "educational";

  if (isIntroAnimating) {
    const elapsed = (Date.now() - introStartTime) * 0.001;
    const t = Math.min(elapsed / 2.0, 1);
    const ease = 1 - Math.pow(1 - t, 5);
    camera.position.z = 20 - (20 - targetCameraZ) * ease;
    
    if (!isEdu) {
       atomGroup.rotation.x = ease * 0.5;
       atomGroup.rotation.y += 0.002 * ease;
    } else {
       // Lock rotation for 2D Educational Mode
       atomGroup.rotation.x = 0;
       atomGroup.rotation.y = 0;
    }
    
    if (t >= 1) isIntroAnimating = false;
  } else if (!isTopViewMode && !isPaused && !isEdu) {
    atomGroup.rotation.y += 0.002 * speedMul;
  }

  // --- Pop-in scale ---
  if (atomGroup.userData.popStartTime) {
    const pe = (Date.now() - atomGroup.userData.popStartTime) * 0.001;
    if (pe < 0.5) {
      const ease = 1 - Math.pow(1 - pe / 0.5, 3);
      const s = 0.1 + 0.9 * ease;
      atomGroup.scale.set(s, s, s);
    } else {
      atomGroup.scale.set(1, 1, 1);
      atomGroup.userData.popStartTime = null;
    }
  }

  // --- Wobble & nucleus rotation ---
  const wg = _wobbleGroupRef;
  if (wg && !isTopViewMode && !isPaused) {
    if (!isEdu) {
       wg.rotation.y += 0.002 * speedMul;
       wg.rotation.z = Math.sin(time * 0.5 * speedMul) * 0.2;
       wg.rotation.x = Math.cos(time * 0.3 * speedMul) * 0.1;
    } else {
       wg.rotation.set(0,0,0);
    }
  }
  if (ng && !isTopViewMode && !isPaused) {
    if (!isEdu) {
       ng.rotation.y -= 0.005 * speedMul;
       ng.rotation.x = Math.sin(time * 0.2 * speedMul) * 0.1;
    } else {
       ng.rotation.set(0,0,0);
    }
  }

  // --- Electrons + trails (for-loop, no forEach) ---
  const eLen = electrons.length;
  for (let i = 0; i < eLen; i++) {
    const el = electrons[i];
    const ud = el.userData;
    
    if (ud.isCloud) {
      if (!isTopViewMode && !isPaused) {
        el.rotation.y += 0.003 * speedMul;
        el.rotation.x += 0.001 * speedMul;
      }
      continue;
    }
    
    if (!isTopViewMode && !isPaused) {
      ud.angle += ud.speed * speedMul;
    }
    const r = ud.radius;
    
    if (isEdu) {
       // Flat 2D rotation for Educational mode
       el.position.x = r * Math.cos(ud.angle);
       el.position.y = r * Math.sin(ud.angle);
       // Reset Z just in case
       el.position.z = 0;
    } else {
       // Normal 3D orbit
       el.position.x = r * Math.cos(ud.angle);
       el.position.z = r * Math.sin(ud.angle);
    }
    
    const trails = ud.trails;
    if (trails && trails.length > 0) {
      for (let t = trails.length - 1; t > 0; t--) {
        trails[t].position.copy(trails[t - 1].position);
      }
      trails[0].position.copy(el.position);
    }
  }

  renderer.render(scene, camera);
}

// ===== Cleanup / Dispose =====
export function cleanup3D(full) {
  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;
  if (full && eventAbortController) {
    eventAbortController.abort();
    eventAbortController = null;
  }
  if (full && renderer) {
    renderer.forceContextLoss();
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
    renderer = null;
    scene = null;
    camera = null;
    atomGroup = null;
    electrons = [];
    orbitHitTargets = [];
    _nucleusGroupRef = null;
    _wobbleGroupRef = null;
  }
}

// ===== Helper: Clear current atom =====
export function clearCurrentAtom() {
  if (atomGroup) {
    while (atomGroup.children.length > 0) {
      atomGroup.remove(atomGroup.children[0]);
    }
  }
  _nucleusGroupRef = null;
  _wobbleGroupRef = null;
}

// ===== Helper: Render scene once =====
export function renderScene() {
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}
