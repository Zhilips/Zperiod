// =============================================================================
// Three.js 3D Atom Renderer - Extracted from script.js
// Manages Scene, Camera, Renderer, atom structure, animation loop
// Zero DOM population logic — only WebGL rendering
// =============================================================================

// ===== Module-level state (replaces closure variables) =====
let scene, camera, renderer, atomGroup, animationId;
let electrons = [];
let introStartTime = 0;
let isIntroAnimating = false;
let isTopViewMode = false;
let initialCameraZ = 16;
let targetCameraZ = 16;
let _container = null;

// ===== Scene Initialization =====
export function init3DScene(container) {
  _container = container || _container;
  if (renderer) {
    if (
      _container &&
      renderer.domElement &&
      !_container.contains(renderer.domElement)
    ) {
      _container.appendChild(renderer.domElement);
      if (_container.clientWidth > 0 && _container.clientHeight > 0) {
        renderer.setSize(
          _container.clientWidth,
          _container.clientHeight,
        );
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
    const aspect = width / height;
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
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
    renderer.setPixelRatio(window.devicePixelRatio);
    _container.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    atomGroup = new THREE.Group();
    scene.add(atomGroup);
    atomGroup.rotation.set(0, 0, 0);
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const canvasEl = renderer.domElement;
    canvasEl.addEventListener("mousedown", (e) => {
      isDragging = true;
      isIntroAnimating = false;
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
      canvasEl.style.cursor = "grabbing";
    });
    canvasEl.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.offsetX - previousMousePosition.x,
        y: e.offsetY - previousMousePosition.y,
      };
      const rotateSpeed = 0.005;
      atomGroup.rotation.y += deltaMove.x * rotateSpeed;
      atomGroup.rotation.x += deltaMove.y * rotateSpeed;
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
    });
    window.addEventListener("mouseup", () => {
      isDragging = false;
      canvasEl.style.cursor = "grab";
    });
    canvasEl.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          isIntroAnimating = false;
          previousMousePosition = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          };
        }
      },
      { passive: false },
    );
    canvasEl.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        e.preventDefault();
        const deltaMove = {
          x: e.touches[0].pageX - previousMousePosition.x,
          y: e.touches[0].pageY - previousMousePosition.y,
        };
        const rotateSpeed = 0.005;
        atomGroup.rotation.y += deltaMove.x * rotateSpeed;
        atomGroup.rotation.x += deltaMove.y * rotateSpeed;
        previousMousePosition = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
        };
      },
      { passive: false },
    );
    window.addEventListener("touchend", () => {
      isDragging = false;
    });
    canvasEl.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const zoomSpeed = 0.02;
        camera.position.z += e.deltaY * zoomSpeed;
        camera.position.z = Math.max(4, Math.min(60, camera.position.z));
      },
      { passive: false },
    );
    canvasEl.style.cursor = "grab";
    window.addEventListener("resize", onWindowResize, false);
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
  const nucleusGroup = new THREE.Group();
  nucleusGroup.name = "nucleusGroup";
  atomGroup.add(nucleusGroup);
  const wobbleGroup = new THREE.Group();
  wobbleGroup.name = "wobbleGroup";
  atomGroup.add(wobbleGroup);
  const atomicNumber = element.number;
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
  const particleRadius = 0.6;
  const protonGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
  const protonMat = new THREE.MeshStandardMaterial({
    color: 0xff2222,
    roughness: 0.25,
    metalness: 0.4,
    emissive: 0xff0000,
    emissiveIntensity: 1.5,
  });
  const neutronGeo = new THREE.SphereGeometry(particleRadius, 32, 32);
  const neutronMat = new THREE.MeshStandardMaterial({
    color: 0x999999,
    roughness: 0.15,
    metalness: 0.5,
    emissive: 0x333333,
    emissiveIntensity: 0.6,
  });
  const particles = [];
  for (let i = 0; i < atomicNumber; i++) particles.push({ type: "proton" });
  for (let i = 0; i < neutronCount; i++) particles.push({ type: "neutron" });
  for (let i = particles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [particles[i], particles[j]] = [particles[j], particles[i]];
  }
  const phi = Math.PI * (3 - Math.sqrt(5));
  const n = particles.length;
  const clusterScale = Math.pow(n, 1 / 3) * particleRadius * 0.8;
  particles.forEach((p, i) => {
    const k = i + 0.5;
    const y = 1 - (k / n) * 2;
    const theta = phi * k;
    const r = Math.sqrt(1 - y * y);
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    p.pos = new THREE.Vector3(
      x * clusterScale,
      y * clusterScale,
      z * clusterScale,
    );
    p.pos.x += (Math.random() - 0.5) * 0.15;
    p.pos.y += (Math.random() - 0.5) * 0.15;
    p.pos.z += (Math.random() - 0.5) * 0.15;
    p.vel = new THREE.Vector3(0, 0, 0);
  });
  if (particles.length === 2) {
    particles[0].pos.set(-0.4, 0, 0);
    particles[1].pos.set(0.4, 0, 0);
  } else {
    nucleusGroup.userData.particles = particles;
    nucleusGroup.userData.physicsIterationsRemaining = 0;
    const repulsionDist = particleRadius * 1.5;
    const kRepulse = 0.2;
    const kCenter = 0.1;
    const vForce = new THREE.Vector3();
    const vDiff = new THREE.Vector3();
    const vTemp = new THREE.Vector3();
    for (let i = 0; i < 5; i++) {
      particles.forEach((p1, idx1) => {
        vForce.set(0, 0, 0);
        vTemp.copy(p1.pos).multiplyScalar(-kCenter);
        vForce.add(vTemp);
        particles.forEach((p2, idx2) => {
          if (idx1 === idx2) return;
          vDiff.subVectors(p1.pos, p2.pos);
          const dist = vDiff.length();
          if (dist < repulsionDist && dist > 0.01) {
            vDiff
              .normalize()
              .multiplyScalar((repulsionDist - dist) * kRepulse);
            vForce.add(vDiff);
          }
        });
        p1.pos.add(vForce);
      });
    }
  }
  if (atomicNumber > 1) {
    const centerLight = new THREE.PointLight(0xff0000, 2.0, 15);
    nucleusGroup.add(centerLight);
  }
  particles.forEach((p) => {
    const mesh = new THREE.Mesh(
      p.type === "proton" ? protonGeo : neutronGeo,
      p.type === "proton" ? protonMat : neutronMat,
    );
    mesh.position.copy(p.pos);
    p.mesh = mesh;
    nucleusGroup.add(mesh);
  });
  const shells = [2, 8, 8, 18, 18, 32, 32];
  let electronsLeft = atomicNumber;
  for (let s = 0; s < shells.length; s++) {
    if (electronsLeft <= 0) break;
    const capacity = shells[s];
    const count = Math.min(electronsLeft, capacity);
    electronsLeft -= count;
    const radius = 4.5 + s * 2.5;
    const orbitGeo = new THREE.TorusGeometry(radius, 0.04, 64, 100);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x8d7f71,
      transparent: true,
      opacity: 0.3,
    });
    const orbit = new THREE.Mesh(orbitGeo, orbitMat);
    orbit.rotation.x = Math.PI / 2;
    wobbleGroup.add(orbit);
    const elGeo = new THREE.SphereGeometry(0.3, 32, 32);
    const elMat = new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      roughness: 0.4,
      metalness: 0.6,
    });
    const trailGeos = [];
    const TRAIL_LENGTH = 10;
    for (let t = 0; t < TRAIL_LENGTH; t++) {
      trailGeos.push(new THREE.SphereGeometry(0.2 - t * 0.015, 8, 8));
    }
    for (let e = 0; e < count; e++) {
      const elMesh = new THREE.Mesh(elGeo, elMat);
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
        const tGeo = trailGeos[t];
        const tMat = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          transparent: true,
          opacity: 0.3 - t * 0.03,
        });
        const tMesh = new THREE.Mesh(tGeo, tMat);
        tMesh.position.copy(elMesh.position);
        wobbleGroup.add(tMesh);
        elMesh.userData.trails.push(tMesh);
      }
      wobbleGroup.add(elMesh);
      electrons.push(elMesh);
    }
  }
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
}

// ===== Window Resize Handler =====
export function onWindowResize() {
  if (!camera || !renderer) return;
  if (_container.clientHeight === 0) {
    const visualPane = document.querySelector(".modal-visual-pane");
    if (visualPane)
      _container.style.height = visualPane.clientHeight + "px";
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
  const safeR = r * 1.2;
  let dist = safeR / Math.tan(vFOV / 2);
  const aspect = camera.aspect;
  if (aspect < 1) {
    dist = dist / aspect;
  }
  targetCameraZ = dist;
  initialCameraZ = 16;
  camera.position.z = initialCameraZ;
}

// ===== Animation Loop =====
export function animateAtom() {
  if (!renderer) return;
  animationId = requestAnimationFrame(animateAtom);
  const time = Date.now() * 0.001;
  if (atomGroup) {
    const nucleusGroup = atomGroup.getObjectByName("nucleusGroup");
    if (
      nucleusGroup &&
      nucleusGroup.userData.physicsIterationsRemaining > 0
    ) {
      const particles = nucleusGroup.userData.particles;
      const remaining = nucleusGroup.userData.physicsIterationsRemaining;
      const batchSize = 5;
      const runCount = Math.min(remaining, batchSize);
      const particleRadius = 0.6;
      const repulsionDist = particleRadius * 1.5;
      const kRepulse = 0.2;
      const kCenter = 0.1;
      const vForce = new THREE.Vector3();
      const vDiff = new THREE.Vector3();
      const vTemp = new THREE.Vector3();
      for (let k = 0; k < runCount; k++) {
        particles.forEach((p1, idx1) => {
          vForce.set(0, 0, 0);
          vTemp.copy(p1.pos).multiplyScalar(-kCenter);
          vForce.add(vTemp);
          particles.forEach((p2, idx2) => {
            if (idx1 === idx2) return;
            vDiff.subVectors(p1.pos, p2.pos);
            const dist = vDiff.length();
            if (dist < repulsionDist && dist > 0.01) {
              vDiff
                .normalize()
                .multiplyScalar((repulsionDist - dist) * kRepulse);
              vForce.add(vDiff);
            }
          });
          p1.pos.add(vForce);
        });
      }
      particles.forEach((p) => {
        if (p.mesh) p.mesh.position.copy(p.pos);
      });
      nucleusGroup.userData.physicsIterationsRemaining -= runCount;
    }
  }
  if (isIntroAnimating) {
    const elapsed = (Date.now() - introStartTime) * 0.001;
    const duration = 2.0;
    const t = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - t, 5);
    camera.position.z = 20 - (20 - targetCameraZ) * ease;
    atomGroup.rotation.x = ease * 0.5;
    atomGroup.rotation.y += 0.002 * ease;
    if (t >= 1) isIntroAnimating = false;
  } else if (!isTopViewMode) {
    // Only rotate if not in top view mode
    atomGroup.rotation.y += 0.002;
  }
  if (atomGroup && atomGroup.userData.popStartTime) {
    const popElapsed = (Date.now() - atomGroup.userData.popStartTime) * 0.001;
    const popDur = 0.5;
    if (popElapsed < popDur) {
      const t = popElapsed / popDur;
      const ease = 1 - Math.pow(1 - t, 3);
      const s = 0.1 + (1 - 0.1) * ease;
      atomGroup.scale.set(s, s, s);
    } else {
      atomGroup.scale.set(1, 1, 1);
      atomGroup.userData.popStartTime = null;
    }
  }
  const wobbleGroup = atomGroup.getObjectByName("wobbleGroup");
  if (wobbleGroup && !isTopViewMode) {
    wobbleGroup.rotation.y += 0.002;
    wobbleGroup.rotation.z = Math.sin(time * 0.5) * 0.2;
    wobbleGroup.rotation.x = Math.cos(time * 0.3) * 0.1;
  }
  const nucleusGroupAnim = atomGroup.getObjectByName("nucleusGroup");
  if (nucleusGroupAnim && !isTopViewMode) {
    nucleusGroupAnim.rotation.y -= 0.005;
    nucleusGroupAnim.rotation.x = Math.sin(time * 0.2) * 0.1;
  }
  electrons.forEach((el) => {
    // Only animate electrons if not in top view mode
    if (!isTopViewMode) {
      el.userData.angle += el.userData.speed;
    }
    const r = el.userData.radius;
    el.position.x = r * Math.cos(el.userData.angle);
    el.position.z = r * Math.sin(el.userData.angle);
    const trails = el.userData.trails;
    if (trails && trails.length > 0) {
      for (let i = trails.length - 1; i > 0; i--) {
        trails[i].position.copy(trails[i - 1].position);
      }
      trails[0].position.copy(el.position);
    }
  });
  renderer.render(scene, camera);
}

// ===== Cleanup / Dispose =====
export function cleanup3D(full) {
  if (animationId) cancelAnimationFrame(animationId);
  animationId = null;
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
  }
}

// ===== Helper: Clear current atom (used by showModal before re-render) =====
export function clearCurrentAtom() {
  if (atomGroup) {
    while (atomGroup.children.length > 0) {
      atomGroup.remove(atomGroup.children[0]);
    }
  }
}

// ===== Helper: Render scene once (used by showModal for blank frame) =====
export function renderScene() {
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
}
