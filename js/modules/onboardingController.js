
import { t, setLang } from "./langController.js";

/**
 * Enhanced Onboarding Flow for Zperiod 2.0
 */
export function initOnboardingFlow() {
  const overlay = document.createElement("div");
  overlay.id = "zperiod-onboarding-overlay";
  overlay.innerHTML = `
    <style>
      #zperiod-onboarding-overlay {
        position: fixed;
        inset: 0;
        background: #ffffff;
        z-index: 1000000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        font-family: 'Inter', -apple-system, sans-serif;
      }

      .logo-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 120px;
      }

      .logo-z {
        width: 100px;
        height: 100px;
        z-index: 2;
        transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: transparent;
      }

      .logo-text {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 64px;
        font-weight: 800;
        color: #1e293b;
        letter-spacing: -2px;
        opacity: 0;
        white-space: nowrap;
        pointer-events: none;
        z-index: 1;
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      }

      .logo-container.expanded .logo-z {
        transform: translateX(-95px);
      }

      .logo-container.expanded .logo-text {
        opacity: 1;
        transform: translateX(-15px);
      }

      .danmaku-container {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        opacity: 0;
        transition: opacity 1.5s ease;
      }

      .danmaku-container.visible {
        opacity: 0.25;
      }

      .danmaku-item {
        position: absolute;
        white-space: nowrap;
        font-weight: 700;
        color: #475569;
        opacity: 0.6;
        filter: blur(0.5px);
        animation: danmaku-move linear forwards;
      }

      @keyframes danmaku-move {
        from { transform: translateX(-100%); left: 0; }
        to { transform: translateX(100vw); left: 0; }
      }

      .start-btn-container {
        margin-top: 24px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.6s ease;
        z-index: 10;
      }

      .start-btn-container.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .onboarding-btn {
        padding: 14px 40px;
        background: #1e293b;
        color: white;
        border: none;
        border-radius: 14px;
        font-size: 1.05rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .onboarding-btn:hover {
        transform: translateY(-2px);
        background: #000;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      }

      /* Language Selection Screen */
      .lang-selection {
        display: none;
        flex-direction: column;
        align-items: center;
        gap: 32px;
        width: 100%;
        max-width: 900px;
        padding: 40px;
        z-index: 20;
      }

      .lang-selection.visible {
        display: flex;
        animation: fadeIn 0.5s ease forwards;
      }

      .lang-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        width: 100%;
      }

      .lang-btn {
        position: relative;
        padding: 24px;
        background: #ffffff;
        border: 1px solid rgba(0,0,0,0.06);
        border-radius: 20px;
        font-size: 1.1rem;
        font-weight: 700;
        color: #1e293b;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
      }

      .lang-btn::after {
        content: '→';
        position: absolute;
        right: 20px;
        opacity: 0;
        transform: translateX(-10px);
        transition: all 0.3s ease;
      }

      .lang-btn:hover {
        border-color: #1e293b;
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        background: #fafafa;
      }

      .lang-btn:hover::after {
        opacity: 1;
        transform: translateX(0);
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
    <div class="danmaku-container" id="danmaku-field"></div>
    
    <div id="animation-stage" style="display:flex; flex-direction:column; align-items:center;">
        <div class="logo-container" id="onboarding-logo">
          <img src="logo.svg" class="logo-z" alt="Z">
          <span class="logo-text">Zperiod</span>
        </div>
        
        <div class="start-btn-container" id="start-btn-box">
          <button class="onboarding-btn" id="onboarding-start-btn">Start</button>
        </div>
    </div>

    <div class="lang-selection" id="lang-select-screen">
      <h2 style="font-size: 2.5rem; color: #1e293b; margin-bottom: 0px; font-weight: 800; letter-spacing: -1px;">Select Language</h2>
      <p style="color: #64748b; margin-bottom: 20px; font-size: 1.1rem;">Choose your preferred language to continue</p>
      <div class="lang-grid">
        <button class="lang-btn" data-lang="en">English</button>
        <button class="lang-btn" data-lang="zh">简体中文</button>
        <button class="lang-btn" data-lang="zh-Hant">繁體中文</button>
        <button class="lang-btn" data-lang="fr">Français</button>
        <button class="lang-btn" data-lang="ru">Русский</button>
        <button class="lang-btn" data-lang="uk">Українська</button>
        <button class="lang-btn" data-lang="fa">فارسی</button>
        <button class="lang-btn" data-lang="ur">اردو</button>
        <button class="lang-btn" data-lang="tl">Tagalog</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const logoContainer = document.getElementById("onboarding-logo");
  const danmakuField = document.getElementById("danmaku-field");
  const startBtnBox = document.getElementById("start-btn-box");
  const startBtn = document.getElementById("onboarding-start-btn");
  const stage = document.getElementById("animation-stage");
  const langScreen = document.getElementById("lang-select-screen");

  // Step 1: Initial Delay then Expand Logo
  setTimeout(() => {
    logoContainer.classList.add("expanded");
  }, 800);

  // Step 2: Show Danmaku and Start Button after Logo animation
  setTimeout(() => {
    danmakuField.classList.add("visible");
    startBtnBox.classList.add("visible");
    startDanmaku();
  }, 1600);

  function startDanmaku() {
    const supportedLangs = ["en", "zh", "zh-Hant", "fr", "ru", "uk", "fa", "ur", "tl"];
    const allPhrases = [];
    supportedLangs.forEach(l => {
        const phrases = t(`onboarding.phrases`, [], l);
        if (Array.isArray(phrases)) allPhrases.push(...phrases);
    });

    if (allPhrases.length === 0) {
        allPhrases.push("Zperiod", "Chemistry", "Atom", "Molecule");
    }

    const createItem = () => {
      if (!overlay.parentElement) return;
      const item = document.createElement("div");
      item.className = "danmaku-item";
      item.textContent = allPhrases[Math.floor(Math.random() * allPhrases.length)];
      
      const top = Math.random() * 85 + 5; 
      const size = Math.random() * 0.8 + 0.9; 
      const duration = Math.random() * 12 + 10; 
      
      item.style.top = `${top}%`;
      item.style.fontSize = `${size}rem`;
      item.style.animationDuration = `${duration}s`;
      
      danmakuField.appendChild(item);
      item.addEventListener("animationend", () => item.remove());
      
      setTimeout(createItem, 1500 + Math.random() * 1000);
    };

    for(let i=0; i<4; i++) setTimeout(createItem, i * 1000);
  }

  startBtn.addEventListener("click", () => {
    // Background danmaku fades out
    danmakuField.style.opacity = "0";
    stage.style.transition = "all 0.5s ease";
    stage.style.opacity = "0";
    stage.style.transform = "translateY(-20px)";
    
    setTimeout(() => {
        stage.style.display = "none";
        langScreen.classList.add("visible");
    }, 500);
  });

  langScreen.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    const lang = btn.dataset.lang;
    
    localStorage.setItem("zperiod_welcomed_v2", "true");
    sessionStorage.setItem("zperiod_lang_transition", "true");
    
    // Smooth seamless transition: Create a temporary white overlay to hide the reload flash
    const transitionOverlay = document.createElement("div");
    Object.assign(transitionOverlay.style, {
      position: "fixed",
      inset: "0",
      background: "white",
      zIndex: "2000000",
      opacity: "0",
      transition: "opacity(0.4s ease)"
    });
    document.body.appendChild(transitionOverlay);

    requestAnimationFrame(() => {
      transitionOverlay.style.opacity = "1";
      setTimeout(() => {
        localStorage.setItem("zperiod_lang", lang);
        window.location.reload();
      }, 450);
    });
  });
}
