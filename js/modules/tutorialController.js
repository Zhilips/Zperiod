import { t } from './langController.js';

function ensureDriverTutorialAssets() {
    if (!document.getElementById('driver-css')) {
        const link = document.createElement('link');
        link.id = 'driver-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.css';
        document.head.appendChild(link);
    }

    if (!document.getElementById('driver-custom-zperiod')) {
        const style = document.createElement('style');
        style.id = 'driver-custom-zperiod';
        style.textContent = `
            .driver-overlay { transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) !important; }
            .custom-driver-popover {
                border-radius: 20px !important;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
                border: none !important;
                padding: 24px !important;
                font-family: inherit !important;
                background: rgba(255, 255, 255, 0.72) !important;
                backdrop-filter: blur(20px) saturate(180%) !important;
                -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                opacity: 1;
                transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
            }
            .custom-driver-popover.fade-out { opacity: 0 !important; }
            .driver-overlay { transition: opacity 0.4s ease, fill 0.4s ease !important; }
            .driver-overlay.fade-out { opacity: 0 !important; }
            .custom-driver-popover .driver-popover-title {
                font-size: 1.15rem !important;
                font-weight: 700 !important;
                margin-bottom: 8px !important;
                color: #000000 !important;
            }
            .custom-driver-popover .driver-popover-description {
                font-size: 0.95rem !important;
                color: rgba(0,0,0,0.7) !important;
                line-height: 1.5 !important;
                margin-bottom: 20px !important;
            }
            .custom-driver-popover .driver-popover-footer { margin-top: 20px !important; }
            .custom-driver-popover .driver-popover-next-btn,
            .custom-driver-popover .driver-popover-prev-btn {
                border-radius: 9999px !important;
                padding: 10px 20px !important;
                font-weight: 600 !important;
                font-size: 0.9rem !important;
                background: rgba(0,0,0,0.05) !important;
                color: #000000 !important;
                border: none !important;
                box-shadow: none !important;
                text-shadow: none !important;
                transition: background 0.2s ease !important;
            }
            .custom-driver-popover .driver-popover-next-btn:hover,
            .custom-driver-popover .driver-popover-prev-btn:hover {
                background: rgba(0,0,0,0.1) !important;
                transform: none !important;
            }
            .custom-driver-popover .driver-popover-close-btn { display: none !important; }
            .driver-popover-arrow.driver-popover-arrow-side-top,
            .driver-popover-arrow.driver-popover-arrow-side-bottom {
                left: calc(50% - 5px) !important;
                right: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Initializes and triggers the element tutorial on the first visit.
 */
export async function initElementTutorial(force = false) {
    const tutorialKey = 'hasSeenElementTutorialV7';

    // Check if the user has already seen the tutorial
    if (!force && localStorage.getItem(tutorialKey)) {
        return;
    }

    try {
        // Dynamically load the module and CSS to work in both Vite and vanilla ESM environments
        const { driver } = await import('https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.mjs');
        
        // Ensure CSS is loaded
        if (!document.getElementById('driver-css')) {
            const link = document.createElement('link');
            link.id = 'driver-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.css';
            document.head.appendChild(link);
            
            // Inject custom styles for smoother animations and better rounded corners
            const style = document.createElement('style');
            style.textContent = `
                /* Make the overlay darker and transition smoother */
                .driver-overlay {
                    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                }
                
                /* Style the popover to look more elegant and modern, matching Zperiod UI */
                .custom-driver-popover {
                    border-radius: 20px !important;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
                    border: none !important;
                    padding: 24px !important;
                    font-family: inherit !important;
                    background: rgba(255, 255, 255, 0.72) !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    opacity: 1;
                    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                }
                .custom-driver-popover.fade-out {
                    opacity: 0 !important;
                }
                .driver-overlay {
                    transition: opacity 0.4s ease, fill 0.4s ease !important;
                }
                .driver-overlay.fade-out {
                    opacity: 0 !important;
                }
                .custom-driver-popover .driver-popover-title {
                    font-size: 1.15rem !important;
                    font-weight: 700 !important;
                    margin-bottom: 8px !important;
                    color: #000000 !important;
                }
                .custom-driver-popover .driver-popover-description {
                    font-size: 0.95rem !important;
                    color: rgba(0,0,0,0.7) !important;
                    line-height: 1.5 !important;
                    margin-bottom: 20px !important;
                }
                .custom-driver-popover .driver-popover-footer {
                    margin-top: 20px !important;
                }
                .custom-driver-popover .driver-popover-next-btn, 
                .custom-driver-popover .driver-popover-prev-btn {
                    border-radius: 9999px !important; /* Full pill shape matching other site buttons */
                    padding: 10px 20px !important;
                    font-weight: 600 !important;
                    font-size: 0.9rem !important;
                    background: rgba(0,0,0,0.05) !important;
                    color: #000000 !important;
                    border: none !important;
                    box-shadow: none !important;
                    text-shadow: none !important;
                    transition: background 0.2s ease !important;
                }
                .custom-driver-popover .driver-popover-next-btn:hover, 
                .custom-driver-popover .driver-popover-prev-btn:hover {
                    background: rgba(0,0,0,0.1) !important;
                    transform: none !important;
                }
                .custom-driver-popover .driver-popover-close-btn {
                    display: none !important;
                }
                .driver-popover-arrow.driver-popover-arrow-side-top,
                .driver-popover-arrow.driver-popover-arrow-side-bottom {
                    left: calc(50% - 5px) !important;
                    right: auto !important;
                }
            `;
            document.head.appendChild(style);
        }

        startTutorial(driver, tutorialKey, force ? 100 : 1200);
    } catch (e) {
        console.error("Failed to load driver.js tutorial:", e);
    }
}

/**
 * Initializes and triggers the balancer tool tutorial.
 */
export async function initBalancerTutorial(force = false) {
    const tutorialKey = 'hasSeenBalancerTutorialV1';

    if (!force && localStorage.getItem(tutorialKey)) {
        return;
    }

    try {
        const { driver } = await import('https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.mjs');
        
        if (!document.getElementById('driver-css')) {
            const link = document.createElement('link');
            link.id = 'driver-css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.css';
            document.head.appendChild(link);
            
            const style = document.createElement('style');
            style.textContent = `
                .driver-overlay { transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) !important; }
                .custom-driver-popover {
                    border-radius: 20px !important; box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
                    border: none !important; padding: 24px !important; font-family: inherit !important;
                    background: rgba(255, 255, 255, 0.72) !important;
                    backdrop-filter: blur(20px) saturate(180%) !important;
                    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                    opacity: 1; transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                }
                .custom-driver-popover.fade-out { opacity: 0 !important; }
                .driver-overlay { transition: opacity 0.4s ease, fill 0.4s ease !important; }
                .driver-overlay.fade-out { opacity: 0 !important; }
                .custom-driver-popover .driver-popover-title { font-size: 1.15rem !important; font-weight: 700 !important; margin-bottom: 8px !important; color: #000000 !important; }
                .custom-driver-popover .driver-popover-description { font-size: 0.95rem !important; color: rgba(0,0,0,0.7) !important; line-height: 1.5 !important; margin-bottom: 20px !important; }
                .custom-driver-popover .driver-popover-footer { margin-top: 20px !important; }
                .custom-driver-popover .driver-popover-next-btn, .custom-driver-popover .driver-popover-prev-btn {
                    border-radius: 9999px !important; padding: 10px 20px !important; font-weight: 600 !important; font-size: 0.9rem !important;
                    background: rgba(0,0,0,0.05) !important; color: #000000 !important; border: none !important; box-shadow: none !important; text-shadow: none !important; transition: background 0.2s ease !important;
                }
                .custom-driver-popover .driver-popover-next-btn:hover, .custom-driver-popover .driver-popover-prev-btn:hover { background: rgba(0,0,0,0.1) !important; transform: none !important; }
                .custom-driver-popover .driver-popover-close-btn { display: none !important; }
                .driver-popover-arrow.driver-popover-arrow-side-top, .driver-popover-arrow.driver-popover-arrow-side-bottom { left: calc(50% - 5px) !important; right: auto !important; }
            `;
            document.head.appendChild(style);
        }

        startBalancerTour(driver, tutorialKey, force ? 100 : 800);
    } catch (e) {
        console.error("Failed to load driver.js tutorial:", e);
    }
}

/**
 * Initializes and triggers the predictor tool tutorial.
 */
export async function initPredictorTutorial(force = false) {
    const tutorialKey = 'hasSeenPredictorTutorialV1';

    if (!force && localStorage.getItem(tutorialKey)) {
        return;
    }

    try {
        const { driver } = await import('https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.mjs');
        ensureDriverTutorialAssets();
        
        startPredictorTour(driver, tutorialKey, force ? 100 : 800);
    } catch (e) {
        console.error("Failed to load driver.js tutorial:", e);
    }
}

/**
 * Initializes and triggers the molar mass tool tutorial.
 */
export async function initMolarMassTutorial(force = false) {
    const tutorialKey = 'hasSeenMolarMassTutorialV1';

    if (!force && localStorage.getItem(tutorialKey)) {
        return;
    }

    try {
        const { driver } = await import('https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.mjs');
        ensureDriverTutorialAssets();
        
        startMolarMassTour(driver, tutorialKey, force ? 100 : 800);
    } catch (e) {
        console.error("Failed to load driver.js tutorial:", e);
    }
}

export async function initSolubilityTutorial(force = false) {
    const tutorialKey = 'hasSeenSolubilityTutorialV1';

    if (!force && localStorage.getItem(tutorialKey)) {
        return;
    }

    try {
        const { driver } = await import('https://cdn.jsdelivr.net/npm/driver.js@1.3.1/dist/driver.js.mjs');
        ensureDriverTutorialAssets();

        startSolubilityTour(driver, tutorialKey, force ? 100 : 800);
    } catch (e) {
        console.error("Failed to load driver.js tutorial:", e);
    }
}

function startTutorial(driver, tutorialKey, delayMs = 1200) {
    let tutorialDriver;
    
    // Keyboard handler for space and right arrow
    const handleKeydown = (e) => {
        if (!tutorialDriver) return;
        
        if (e.code === 'Space' || e.key === 'ArrowRight') {
            e.preventDefault(); // Prevent page scrolling
            e.stopPropagation();
            if (tutorialDriver.hasNextStep()) {
                tutorialDriver.moveNext();
            } else {
                // If it's the last step, act like Done was clicked
                fadeAndDestroy();
            }
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            e.stopPropagation();
            if (tutorialDriver.hasPreviousStep()) {
                tutorialDriver.movePrevious();
            }
        }
    };

    const fadeAndDestroy = () => {
        const popover = document.querySelector('.custom-driver-popover');
        const overlay = document.querySelector('.driver-overlay');
        
        if (popover) popover.classList.add('fade-out');
        if (overlay) overlay.classList.add('fade-out');
        
        localStorage.setItem(tutorialKey, 'true');
        
        // Remove keyboard listener
        document.removeEventListener('keydown', handleKeydown, { capture: true });
        
        // Wait for fade transition before destroying
        setTimeout(() => {
            tutorialDriver.destroy();
        }, 350);
    };

    // Set a delay to ensure the modal animation finishes fully and content is settled
    setTimeout(() => {
        tutorialDriver = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            allowKeyboardControl: false, // We handle it custom to prevent scrolling
            prevBtnText: t("tutorial.previous"),
            nextBtnText: t("tutorial.next"),
            doneBtnText: t("tutorial.done"),
            overlayColor: 'rgba(0, 0, 0, 0.65)',
            popoverClass: 'custom-driver-popover',
            stagePadding: 6,
            stageRadius: 36, // Universal large radius: perfectly matches the card's 30px (30+6), creates a pill for dots, and a circle for the button
            steps: [
                {
                    element: '.simplified-element-box .cards-slider-wrapper',
                    popover: {
                        title: t("tutorial.step1Title"),
                        description: t("tutorial.step1Desc"),
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '.slider-controls .slider-dots',
                    popover: {
                        title: t("tutorial.step2Title"),
                        description: t("tutorial.step2Desc"),
                        side: "top",
                        align: 'center'
                    }
                },
                {
                    element: '#level-lock-btn',
                    popover: {
                        title: t("tutorial.step3Title"),
                        description: t("tutorial.step3Desc"),
                        side: "top",
                        align: 'center'
                    }
                },
                {
                    element: '.modal-visual-pane',
                    popover: {
                        title: t("tutorial.step4Title"),
                        description: t("tutorial.step4Desc"),
                        side: "left",
                        align: 'center'
                    }
                }
            ],
            onDestroyStarted: () => {
                fadeAndDestroy();
            }
        });

        // Add custom keyboard listener
        document.addEventListener('keydown', handleKeydown, { capture: true });

        tutorialDriver.drive();
    }, delayMs);
}


function startBalancerTour(driver, tutorialKey, delayMs = 800) {
    let tutorialDriver;
    
    const handleKeydown = (e) => {
        if (!tutorialDriver) return;
        if (e.code === 'Space' || e.key === 'ArrowRight') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasNextStep()) tutorialDriver.moveNext();
            else fadeAndDestroy();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasPreviousStep()) tutorialDriver.movePrevious();
        }
    };

    const fadeAndDestroy = () => {
        const popover = document.querySelector('.custom-driver-popover');
        const overlay = document.querySelector('.driver-overlay');
        if (popover) popover.classList.add('fade-out');
        if (overlay) overlay.classList.add('fade-out');
        localStorage.setItem(tutorialKey, 'true');
        document.removeEventListener('keydown', handleKeydown, { capture: true });
        setTimeout(() => tutorialDriver.destroy(), 350);
    };

    setTimeout(() => {
        tutorialDriver = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            allowKeyboardControl: false,
            prevBtnText: t("tutorial.previous") || "Previous",
            nextBtnText: t("tutorial.next") || "Next",
            doneBtnText: t("tutorial.done") || "Done",
            overlayColor: 'rgba(0, 0, 0, 0.65)',
            popoverClass: 'custom-driver-popover',
            stagePadding: 8,
            stageRadius: 20,
            steps: [
                {
                    element: '#mode-switcher-pill',
                    popover: {
                        title: t('balancerTutorial.modeTitle') || "Mode Switcher",
                        description: t('balancerTutorial.modeDesc') || "Switch between mathematically balancing an existing equation, or intelligently predicting the products of a new reaction.",
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '.physics-scale-container',
                    popover: {
                        title: t('balancerTutorial.scaleTitle') || "Physical Scale",
                        description: t('balancerTutorial.scaleDesc') || "This physics-driven scale visually represents the weight and imbalances of atoms on both sides of the reaction in real-time as you type.",
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '#reactants-input',
                    popover: {
                        title: t('balancerTutorial.inputReactantsTitle') || "Reactants",
                        description: t('balancerTutorial.inputReactantsDesc') || "Enter your chemical formulas here. Watch as we automatically type 'Fe + O2' for our example!",
                        side: "bottom",
                        align: 'center'
                    },
                    onHighlighted: () => {
                        const btnClear = document.getElementById('clear-balancer-btn');
                        if (btnClear) btnClear.click(); // ensure we start clean
                        setTimeout(() => {
                            const input = document.getElementById('reactants-input');
                            if (input) {
                                input.value = "Fe + O2";
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                        }, 100);
                    }
                },
                {
                    element: '#products-input',
                    popover: {
                        title: t('balancerTutorial.inputProductsTitle') || "Products",
                        description: t('balancerTutorial.inputProductsDesc') || "Now let's add the product. We'll type 'Fe2O3'. Notice how the scale immediately reacts to show the imbalance!",
                        side: "bottom",
                        align: 'center'
                    },
                    onHighlighted: () => {
                        const input = document.getElementById('products-input');
                        if (input) {
                            input.value = "Fe2O3";
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                },
                {
                    element: '#auto-balance-btn',
                    popover: {
                        title: t('balancerTutorial.autoTitle') || "Auto-Balance",
                        description: t('balancerTutorial.autoDesc') || "Don't want to solve it manually? Click here (or next) and our algorithm will find the optimal integer coefficients instantly.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: '#balance-feedback',
                    popover: {
                        title: t('balancerTutorial.feedbackTitle') || "Status & Copy",
                        description: t('balancerTutorial.feedbackDesc') || "Perfectly balanced! The finalized equation is right here. You can click it to copy directly to your clipboard!",
                        side: "top",
                        align: 'center'
                    },
                    onHighlightStarted: () => {
                        const btn = document.getElementById('auto-balance-btn');
                        if (btn) btn.click();
                    }
                }
            ],
            onDestroyStarted: () => fadeAndDestroy()
        });

        document.addEventListener('keydown', handleKeydown, { capture: true });
        tutorialDriver.drive();
    }, delayMs);
}


function startPredictorTour(driver, tutorialKey, delayMs = 800) {
    let tutorialDriver;
    
    const handleKeydown = (e) => {
        if (!tutorialDriver) return;
        if (e.code === 'Space' || e.key === 'ArrowRight') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasNextStep()) tutorialDriver.moveNext();
            else fadeAndDestroy();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasPreviousStep()) tutorialDriver.movePrevious();
        }
    };

    const fadeAndDestroy = () => {
        const popover = document.querySelector('.custom-driver-popover');
        const overlay = document.querySelector('.driver-overlay');
        if (popover) popover.classList.add('fade-out');
        if (overlay) overlay.classList.add('fade-out');
        localStorage.setItem(tutorialKey, 'true');
        document.removeEventListener('keydown', handleKeydown, { capture: true });
        setTimeout(() => tutorialDriver.destroy(), 350);
    };

    setTimeout(() => {
        tutorialDriver = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            allowKeyboardControl: false,
            prevBtnText: t("tutorial.previous") || "Previous",
            nextBtnText: t("tutorial.next") || "Next",
            doneBtnText: t("tutorial.done") || "Done",
            overlayColor: 'rgba(0, 0, 0, 0.65)',
            popoverClass: 'custom-driver-popover',
            stagePadding: 8,
            stageRadius: 20,
            steps: [
                {
                    element: '#mode-switcher-pill',
                    popover: {
                        title: t('predictorTutorial.modeTitle') || "Mode Switcher",
                        description: t('predictorTutorial.modeDesc') || "We're now in Predict Mode.",
                        side: "bottom",
                        align: 'center'
                    }
                },
                {
                    element: '#predictor-reactants-input',
                    popover: {
                        title: t('predictorTutorial.inputTitle') || "Reactants",
                        description: t('predictorTutorial.inputDesc') || "Type the reactants of your reaction here.",
                        side: "bottom",
                        align: 'center'
                    },
                    onHighlighted: () => {
                        const btnClear = document.getElementById('clear-predictor-btn');
                        if (btnClear) btnClear.click(); // ensure we start clean
                        setTimeout(() => {
                            const input = document.getElementById('predictor-reactants-input');
                            if (input) {
                                input.value = "Na + Cl2";
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                        }, 100);
                    }
                },
                {
                    element: '#predictor-type-grid',
                    popover: {
                        title: t('predictorTutorial.typeTitle') || "Reaction Type",
                        description: t('predictorTutorial.typeDesc') || "Select the classification of the reaction. We'll select Synthesis.",
                        side: "top",
                        align: 'center'
                    },
                    onHighlighted: () => {
                        const typeCard = document.querySelector('.predictor-type-card[data-type="synthesis"]');
                        if (typeCard) typeCard.click();
                    }
                },
                {
                    element: '#predict-btn',
                    popover: {
                        title: t('predictorTutorial.predictTitle') || "Predict Products",
                        description: t('predictorTutorial.predictDesc') || "Click here (or next)! The engine will predict the product.",
                        side: "top",
                        align: 'start'
                    }
                },
                {
                    element: '.predictor-right-col',
                    popover: {
                        title: t('predictorTutorial.resultTitle') || "Intelligent Output",
                        description: t('predictorTutorial.resultDesc') || "Here is your result! It shows the predicted product and balanced equation.",
                        side: "left",
                        align: 'center'
                    },
                    onHighlightStarted: () => {
                        const btn = document.getElementById('predict-btn');
                        if (btn) btn.click();
                    }
                }
            ],
            onDestroyStarted: () => fadeAndDestroy()
        });

        document.addEventListener('keydown', handleKeydown, { capture: true });
        tutorialDriver.drive();
    }, delayMs);
}


function startMolarMassTour(driver, tutorialKey, delayMs = 800) {
    let tutorialDriver;
    const setReceiptHighlight = (active) => {
        document.getElementById('receipt-wrapper')?.classList.toggle('tutorial-highlight', active);
        document.querySelector('.receipt-anim-container')?.classList.toggle('tutorial-highlight-shell', active);
    };
    
    const handleKeydown = (e) => {
        if (!tutorialDriver) return;
        if (e.code === 'Space' || e.key === 'ArrowRight') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasNextStep()) tutorialDriver.moveNext();
            else fadeAndDestroy();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasPreviousStep()) tutorialDriver.movePrevious();
        }
    };

    const fadeAndDestroy = () => {
        const popover = document.querySelector('.custom-driver-popover');
        const overlay = document.querySelector('.driver-overlay');
        if (popover) popover.classList.add('fade-out');
        if (overlay) overlay.classList.add('fade-out');
        setReceiptHighlight(false);
        localStorage.setItem(tutorialKey, 'true');
        document.removeEventListener('keydown', handleKeydown, { capture: true });
        setTimeout(() => tutorialDriver.destroy(), 350);
    };

    setTimeout(() => {
        tutorialDriver = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            allowKeyboardControl: false,
            prevBtnText: t("tutorial.previous") || "Previous",
            nextBtnText: t("tutorial.next") || "Next",
            doneBtnText: t("tutorial.done") || "Done",
            overlayColor: 'rgba(0, 0, 0, 0.65)',
            popoverClass: 'custom-driver-popover',
            stagePadding: 8,
            stageRadius: 20,
            steps: [
                {
                    element: '#modal-formula-input',
                    popover: {
                        title: t('molarMassTutorial.inputTitle') || "Formula Input",
                        description: t('molarMassTutorial.inputDesc') || "Type any chemical formula here.",
                        side: "bottom",
                        align: 'center'
                    },
                    onHighlighted: () => {
                        const clearBtn = document.getElementById('clear-molar-btn');
                        if (clearBtn) clearBtn.click();
                        setTimeout(() => {
                            const input = document.getElementById('modal-formula-input');
                            if (input) {
                                input.value = 'CaCO3';
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                        }, 150);
                    }
                },
                {
                    element: '#formula-live-preview',
                    popover: {
                        title: t('molarMassTutorial.previewTitle') || "Live Preview",
                        description: t('molarMassTutorial.previewDesc') || "The formula is rendered with proper subscripts in real-time.",
                        side: "bottom",
                        align: 'center'
                    },
                    onHighlighted: () => setReceiptHighlight(false)
                },
                {
                    element: '.electronic-scale-wrapper',
                    popover: {
                        title: t('molarMassTutorial.scaleTitle') || "Interactive Scale",
                        description: t('molarMassTutorial.scaleDesc') || "The electronic scale animates to show the calculated molar mass.",
                        side: "left",
                        align: 'center'
                    },
                    onHighlighted: () => setReceiptHighlight(false)
                },
                {
                    element: '#print-ticket-btn',
                    popover: {
                        title: t('molarMassTutorial.receiptTitle') || "Weight Ticket",
                        description: t('molarMassTutorial.receiptDesc') || "Click Print Ticket for a detailed breakdown.",
                        side: "top",
                        align: 'center'
                    },
                    onHighlightStarted: () => {
                        const btn = document.getElementById('print-ticket-btn');
                        if (btn) btn.click();
                        setTimeout(() => setReceiptHighlight(true), 180);
                    }
                },
                {
                    element: '.molar-quick-examples',
                    popover: {
                        title: t('molarMassTutorial.chipsTitle') || "Quick Examples",
                        description: t('molarMassTutorial.chipsDesc') || "Click any chip to instantly load and calculate.",
                        side: "top",
                        align: 'center'
                    },
                    onHighlighted: () => setReceiptHighlight(false)
                }
            ],
            onDestroyStarted: () => fadeAndDestroy()
        });

        document.addEventListener('keydown', handleKeydown, { capture: true });
        tutorialDriver.drive();
    }, delayMs);
}

function startSolubilityTour(driver, tutorialKey, delayMs = 800) {
    let tutorialDriver;

    const handleKeydown = (e) => {
        if (!tutorialDriver) return;
        if (e.code === 'Space' || e.key === 'ArrowRight') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasNextStep()) tutorialDriver.moveNext();
            else fadeAndDestroy();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault(); e.stopPropagation();
            if (tutorialDriver.hasPreviousStep()) tutorialDriver.movePrevious();
        }
    };

    const fadeAndDestroy = () => {
        const popover = document.querySelector('.custom-driver-popover');
        const overlay = document.querySelector('.driver-overlay');
        if (popover) popover.classList.add('fade-out');
        if (overlay) overlay.classList.add('fade-out');
        localStorage.setItem(tutorialKey, 'true');
        document.removeEventListener('keydown', handleKeydown, { capture: true });
        setTimeout(() => tutorialDriver.destroy(), 350);
    };

    setTimeout(() => {
        tutorialDriver = driver({
            showProgress: true,
            animate: true,
            allowClose: false,
            allowKeyboardControl: false,
            prevBtnText: t("tutorial.previous") || "Previous",
            nextBtnText: t("tutorial.next") || "Next",
            doneBtnText: t("tutorial.done") || "Done",
            overlayColor: 'rgba(0, 0, 0, 0.65)',
            popoverClass: 'custom-driver-popover',
            stagePadding: 8,
            stageRadius: 20,
            steps: [
                {
                    element: '#solubility-input',
                    popover: {
                        title: t('solubilityTutorial.inputTitle', 'Compound Input'),
                        description: t('solubilityTutorial.inputDesc', 'Type an ionic compound like AgCl or Na2CO3 here.'),
                        side: 'bottom',
                        align: 'center'
                    },
                    onHighlighted: () => {
                        const input = document.getElementById('solubility-input');
                        if (input) {
                            input.value = 'AgCl';
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                    }
                },
                {
                    element: '#check-solubility-btn',
                    popover: {
                        title: t('solubilityTutorial.checkTitle', 'Check Rule Match'),
                        description: t('solubilityTutorial.checkDesc', 'Run the quick rule check to see whether the compound is likely soluble or insoluble.'),
                        side: 'bottom',
                        align: 'center'
                    },
                    onHighlightStarted: () => {
                        document.getElementById('check-solubility-btn')?.click();
                    }
                },
                {
                    element: '#solubility-result',
                    popover: {
                        title: t('solubilityTutorial.resultTitle', 'Result Card'),
                        description: t('solubilityTutorial.resultDesc', 'The result card summarizes the likely outcome and the matching rule or exception.'),
                        side: 'bottom',
                        align: 'center'
                    }
                },
                {
                    element: '.sol-glass-table',
                    popover: {
                        title: t('solubilityTutorial.tableTitle', 'Reference Table'),
                        description: t('solubilityTutorial.tableDesc', 'Use the rule table on the right to double-check common ions, exceptions, and fast patterns.'),
                        side: 'left',
                        align: 'center'
                    }
                }
            ],
            onDestroyStarted: () => fadeAndDestroy()
        });

        document.addEventListener('keydown', handleKeydown, { capture: true });
        tutorialDriver.drive();
    }, delayMs);
}
