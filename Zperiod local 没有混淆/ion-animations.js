/**
 * ION ANIMATIONS - Unified Visual System
 * 20 Unique Animation Types with HTML Templates
 */

const IonAnimations = {
    
    // ===== 20 Animation Types =====
    
    // TYPE 1: pH Indicator Bar
    ph: (config = {}) => `
        <div class="ion-anim ion-anim-ph">
            <div class="ph-drops">
                <div class="ph-drop"></div>
                <div class="ph-drop"></div>
                <div class="ph-drop"></div>
            </div>
            <div class="ph-bar">
                <div class="ph-pointer" style="--ph-pos: ${config.start || '10%'}; --ph-hover: ${config.end || '90%'};"></div>
            </div>
            <span class="ph-label">${config.label || 'pH'}</span>
        </div>
    `,
    
    // TYPE 2: Rising Bubbles
    bubble: (config = {}) => `
        <div class="ion-anim ion-anim-bubble">
            <div class="bubble-rise"></div>
            <div class="bubble-rise"></div>
            <div class="bubble-rise"></div>
        </div>
    `,
    
    // TYPE 3: Flame Test
    flame: (config = {}) => `
        <div class="ion-anim ion-anim-flame">
            <div class="flame-shape ${config.color || 'flame-orange'}"></div>
        </div>
    `,
    
    // TYPE 4: Dissolving Cube
    dissolve: (config = {}) => `
        <div class="ion-anim ion-anim-dissolve">
            <div class="dissolve-cube"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-particle"></div>
            <div class="dissolve-ripple"></div>
            <div class="dissolve-ripple"></div>
        </div>
    `,
    
    // TYPE 5: Color Orb
    orb: (config = {}) => `
        <div class="ion-anim ion-anim-orb">
            <div class="color-orb ${config.color || 'orb-blue'}"></div>
            <div class="orb-wave"></div>
            <div class="orb-wave"></div>
            <div class="orb-wave"></div>
            <div class="orb-bubble"></div>
            <div class="orb-bubble"></div>
            <div class="orb-bubble"></div>
        </div>
    `,
    
    // TYPE 6: Pulse Ring (Danger)
    pulse: (config = {}) => `
        <div class="ion-anim ion-anim-pulse">
            <div class="pulse-center ${config.color || 'pulse-red'}"></div>
            <div class="pulse-ring ${config.color || 'pulse-red'}"></div>
            <div class="pulse-ring ${config.color || 'pulse-red'}"></div>
            <div class="pulse-ring ${config.color || 'pulse-red'}"></div>
            <div class="pulse-particle ${config.color || 'pulse-red'}"></div>
            <div class="pulse-particle ${config.color || 'pulse-red'}"></div>
            <div class="pulse-particle ${config.color || 'pulse-red'}"></div>
            <div class="pulse-particle ${config.color || 'pulse-red'}"></div>
            <div class="pulse-wave ${config.color || 'pulse-red'}"></div>
            <div class="pulse-wave ${config.color || 'pulse-red'}"></div>
        </div>
    `,
    
    // TYPE 7: Battery Charge
    battery: (config = {}) => `
        <div class="ion-anim ion-anim-battery">
            <div class="battery-body">
                <div class="battery-fill"></div>
            </div>
        </div>
    `,
    
    // TYPE 8: Crystallize
    crystal: (config = {}) => `
        <div class="ion-anim ion-anim-crystal">
            <div class="crystal-arm"></div>
            <div class="crystal-arm"></div>
            <div class="crystal-arm"></div>
            <div class="crystal-arm"></div>
            <div class="crystal-arm-diag"></div>
            <div class="crystal-arm-diag"></div>
            <div class="crystal-arm-diag"></div>
            <div class="crystal-arm-diag"></div>
            <div class="crystal-sparkle"></div>
            <div class="crystal-sparkle"></div>
            <div class="crystal-sparkle"></div>
            <div class="crystal-sparkle"></div>
            <div class="crystal-core"></div>
        </div>
    `,
    
    // TYPE 9: Electron Flow
    electron: (config = {}) => `
        <div class="ion-anim ion-anim-electron">
            <div class="electron-wire">
                <div class="electron-dot"></div>
                <div class="electron-dot"></div>
                <div class="electron-dot"></div>
            </div>
        </div>
    `,
    
    // TYPE 10: Precipitate Cloud
    precipitate: (config = {}) => `
        <div class="ion-anim ion-anim-precipitate">
            <div class="ppt-cloud ${config.color || 'ppt-white'}"></div>
            <div class="ppt-fall ${config.color || 'ppt-white'}"></div>
            <div class="ppt-fall ${config.color || 'ppt-white'}"></div>
            <div class="ppt-fall ${config.color || 'ppt-white'}"></div>
            <div class="ppt-fall ${config.color || 'ppt-white'}"></div>
            <div class="ppt-fall ${config.color || 'ppt-white'}"></div>
            <div class="ppt-sediment ${config.color || 'ppt-white'}"></div>
        </div>
    `,
    
    // TYPE 11: Plant Growth
    plant: (config = {}) => `
        <div class="ion-anim ion-anim-plant">
            <div class="plant-stem">
                <div class="plant-leaf"></div>
                <div class="plant-leaf"></div>
            </div>
        </div>
    `,
    
    // TYPE 12: Bone Structure
    bone: (config = {}) => `
        <div class="ion-anim ion-anim-bone">
            <div class="bone-particle"></div>
            <div class="bone-particle"></div>
            <div class="bone-particle"></div>
            <div class="bone-particle"></div>
            <div class="bone-particle"></div>
            <div class="bone-ring"></div>
            <div class="bone-ring"></div>
            <div class="bone-glow"></div>
            <div class="bone-shape"></div>
        </div>
    `,
    
    // TYPE 13: Shield Protect
    shield: (config = {}) => `
        <div class="ion-anim ion-anim-shield">
            <div class="shield-ring"></div>
            <div class="shield-ring"></div>
            <div class="shield-ring"></div>
            <div class="shield-spark"></div>
            <div class="shield-spark"></div>
            <div class="shield-spark"></div>
            <div class="shield-spark"></div>
            <div class="shield-icon"></div>
        </div>
    `,
    
    // TYPE 14: Water Drop
    water: (config = {}) => `
        <div class="ion-anim ion-anim-water">
            <div class="water-drop"></div>
            <div class="water-ripple"></div>
            <div class="water-ripple"></div>
        </div>
    `,
    
    // TYPE 15: Magnet Attract
    magnet: (config = {}) => `
        <div class="ion-anim ion-anim-magnet">
            <div class="magnet-particle"></div>
            <div class="magnet-particle"></div>
            <div class="magnet-particle"></div>
            <div class="magnet-u"></div>
        </div>
    `,
    
    // TYPE 16: Tooth Health
    tooth: (config = {}) => `
        <div class="ion-anim ion-anim-tooth">
            <div class="tooth-sparkle"></div>
            <div class="tooth-sparkle"></div>
            <div class="tooth-sparkle"></div>
            <div class="tooth-shield"></div>
            <div class="fluoride-particle"></div>
            <div class="fluoride-particle"></div>
            <div class="fluoride-particle"></div>
            <div class="fluoride-particle"></div>
            <div class="tooth-shape"></div>
        </div>
    `,
    
    // TYPE 17: Sun Rays
    sun: (config = {}) => `
        <div class="ion-anim ion-anim-sun">
            <div class="sun-core">
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
                <div class="sun-ray"></div>
            </div>
        </div>
    `,
    
    // TYPE 18: Medicine Pill
    pill: (config = {}) => `
        <div class="ion-anim ion-anim-pill">
            <div class="pill-shape">
                <div class="pill-half"></div>
                <div class="pill-half"></div>
            </div>
        </div>
    `,
    
    // TYPE 19: Lightning Bolt
    lightning: (config = {}) => `
        <div class="ion-anim ion-anim-lightning">
            <div class="lightning-branch"></div>
            <div class="lightning-branch"></div>
            <div class="lightning-branch"></div>
            <div class="lightning-energy"></div>
            <div class="lightning-energy"></div>
            <div class="lightning-energy"></div>
            <div class="lightning-spark"></div>
            <div class="lightning-spark"></div>
            <div class="lightning-spark"></div>
            <div class="lightning-spark"></div>
            <div class="lightning-bolt"></div>
        </div>
    `,
    
    // TYPE 20: DNA Helix
    dna: (config = {}) => `
        <div class="ion-anim ion-anim-dna">
            <div class="dna-strand">
                <div class="dna-node"></div>
                <div class="dna-node"></div>
                <div class="dna-node"></div>
                <div class="dna-node"></div>
                <div class="dna-node-r"></div>
                <div class="dna-node-r"></div>
                <div class="dna-node-r"></div>
                <div class="dna-node-r"></div>
                <div class="dna-link"></div>
                <div class="dna-link"></div>
                <div class="dna-link"></div>
                <div class="dna-link"></div>
            </div>
        </div>
    `,
    
    // TYPE 21: Gas Fume (刺鼻气体)
    gas: (config = {}) => `
        <div class="ion-anim ion-anim-gas">
            <div class="gas-cloud ${config.color || 'gas-gray'}"></div>
            <div class="gas-cloud ${config.color || 'gas-gray'}"></div>
            <div class="gas-cloud ${config.color || 'gas-gray'}"></div>
        </div>
    `,
    
    // TYPE 22: Bleach Effect (漂白)
    bleach: (config = {}) => `
        <div class="ion-anim ion-anim-bleach">
            <div class="bleach-paper"></div>
            <div class="bleach-wave"></div>
        </div>
    `,

    // ===== Animation Mapping for Each Ion =====
    // Format: ionId: { slotA: 'animationType', slotB: 'animationType', configA: {}, configB: {} }
    
    ionMap: {
        // === Cations ===
        'h_plus': { 
            slotA: 'ph', 
            slotB: 'bubble',
            configA: { start: '10%', end: '10%', label: 'Acidic' }
        },
        'li_plus': { 
            slotA: 'flame', 
            slotB: 'battery',
            configA: { color: 'flame-red' }
        },
        'na_plus': { 
            slotA: 'flame', 
            slotB: 'dissolve',
            configA: { color: 'flame-orange' }
        },
        'k_plus': { 
            slotA: 'flame', 
            slotB: 'plant',
            configA: { color: 'flame-violet' }
        },
        'ag_plus': { 
            slotA: 'precipitate', 
            slotB: 'sun',
            configA: { color: 'ppt-white' }
        },
        'mg_2plus': { 
            slotA: 'bone', 
            slotB: 'flame',
            configB: { color: 'flame-white' }
        },
        'ca_2plus': { 
            slotA: 'bone', 
            slotB: 'precipitate',
            configB: { color: 'ppt-white' }
        },
        'ba_2plus': { 
            slotA: 'flame', 
            slotB: 'shield',
            configA: { color: 'flame-green' }
        },
        'zn_2plus': { 
            slotA: 'shield', 
            slotB: 'dissolve'
        },
        'cu_2plus': { 
            slotA: 'orb', 
            slotB: 'electron',
            configA: { color: 'orb-blue' }
        },
        'fe_2plus': { 
            slotA: 'orb', 
            slotB: 'dna',
            configA: { color: 'orb-green' }
        },
        'fe_3plus': { 
            slotA: 'orb', 
            slotB: 'precipitate',
            configA: { color: 'orb-yellow' },
            configB: { color: 'ppt-brown' }
        },
        'al_3plus': { 
            slotA: 'shield', 
            slotB: 'crystal'
        },
        'pb_2plus': { 
            slotA: 'pulse', 
            slotB: 'precipitate',
            configA: { color: 'pulse-red' },
            configB: { color: 'ppt-yellow' }
        },
        'nh4_plus': { 
            slotA: 'gas', 
            slotB: 'plant',
            configA: { color: 'gas-clear' }
        },
        'h3o_plus': { 
            slotA: 'ph', 
            slotB: 'water',
            configA: { start: '10%', end: '10%', label: 'Acidic' }
        },
        
        // === Anions ===
        'oh_minus': { 
            slotA: 'ph', 
            slotB: 'water',
            configA: { start: '90%', end: '90%', label: 'Basic' }
        },
        'cl_minus': { 
            slotA: 'dissolve', 
            slotB: 'bleach'
        },
        'br_minus': { 
            slotA: 'orb', 
            slotB: 'precipitate',
            configA: { color: 'orb-orange' },
            configB: { color: 'ppt-cream' }
        },
        'i_minus': { 
            slotA: 'orb', 
            slotB: 'precipitate',
            configA: { color: 'orb-purple' },
            configB: { color: 'ppt-yellow' }
        },
        'f_minus': { 
            slotA: 'tooth', 
            slotB: 'pulse',
            configB: { color: 'pulse-orange' }
        },
        'n_3minus': { 
            slotA: 'gas', 
            slotB: 'sun',
            configA: { color: 'gas-clear' }
        },
        'p_3minus': { 
            slotA: 'pulse', 
            slotB: 'electron',
            configA: { color: 'pulse-red' }
        },
        'o_2minus': { 
            slotA: 'lightning', 
            slotB: 'flame',
            configB: { color: 'flame-blue' }
        },
        's_2minus': { 
            slotA: 'precipitate', 
            slotB: 'gas',
            configA: { color: 'ppt-black' },
            configB: { color: 'gas-yellow' }
        },
        
        // === Polyatomic Anions ===
        'no3_minus': { 
            slotA: 'dissolve', 
            slotB: 'lightning'
        },
        'no2_minus': { 
            slotA: 'pill', 
            slotB: 'gas',
            configB: { color: 'gas-brown' }
        },
        'so4_2minus': { 
            slotA: 'battery', 
            slotB: 'precipitate',
            configB: { color: 'ppt-white' }
        },
        'so3_2minus': { 
            slotA: 'bleach', 
            slotB: 'gas',
            configB: { color: 'gas-yellow' }
        },
        'co3_2minus': { 
            slotA: 'bubble', 
            slotB: 'precipitate',
            configB: { color: 'ppt-white' }
        },
        'hco3_minus': { 
            slotA: 'bubble', 
            slotB: 'pill'
        },
        'po4_3minus': { 
            slotA: 'dna', 
            slotB: 'bone'
        },
        'ch3coo_minus': { 
            slotA: 'ph', 
            slotB: 'crystal',
            configA: { start: '30%', end: '30%', label: 'Weak Acid' }
        },
        'mno4_minus': { 
            slotA: 'orb', 
            slotB: 'bleach',
            configA: { color: 'orb-purple' }
        },
        'cro4_2minus': { 
            slotA: 'orb', 
            slotB: 'pulse',
            configA: { color: 'orb-yellow' },
            configB: { color: 'pulse-orange' }
        },
        'cr2o7_2minus': { 
            slotA: 'orb', 
            slotB: 'lightning',
            configA: { color: 'orb-orange' }
        },
        'sio3_2minus': { 
            slotA: 'crystal', 
            slotB: 'dissolve'
        },
        'clo_minus': { 
            slotA: 'bleach', 
            slotB: 'shield'
        },
        'cn_minus': { 
            slotA: 'pulse', 
            slotB: 'dissolve',
            configA: { color: 'pulse-red' }
        },
        'scn_minus': { 
            slotA: 'orb', 
            slotB: 'precipitate',
            configA: { color: 'orb-red' },
            configB: { color: 'ppt-brown' }
        },
        'c2o4_2minus': { 
            slotA: 'plant', 
            slotB: 'precipitate',
            configB: { color: 'ppt-white' }
        },
        'hso4_minus': { 
            slotA: 'ph', 
            slotB: 'battery',
            configA: { start: '20%', end: '20%', label: 'Acidic' }
        },
        'h2po4_minus': { 
            slotA: 'plant', 
            slotB: 'ph',
            configB: { start: '40%', end: '40%', label: 'Buffer' }
        },
        'hpo4_2minus': { 
            slotA: 'bone', 
            slotB: 'ph',
            configB: { start: '60%', end: '60%', label: 'Buffer' }
        },
        's2o3_2minus': { 
            slotA: 'sun', 
            slotB: 'crystal'
        },
        'clo3_minus': { 
            slotA: 'lightning', 
            slotB: 'plant'
        },
        'clo4_minus': { 
            slotA: 'lightning', 
            slotB: 'dissolve'
        },
        'bro3_minus': { 
            slotA: 'pulse', 
            slotB: 'sun',
            configA: { color: 'pulse-orange' }
        },
        'io3_minus': { 
            slotA: 'orb', 
            slotB: 'tooth',
            configA: { color: 'orb-purple' }
        }
    },

    // ===== Get Animation HTML =====
    getAnimation: function(ionId, slot) {
        const mapping = this.ionMap[ionId];
        if (!mapping) {
            // Default fallback
            return slot === 'slotA' ? this.orb({ color: 'orb-clear' }) : this.water({});
        }
        
        const isSlotA = slot === 'slotA' || slot === 'A';
        const animType = isSlotA ? mapping.slotA : mapping.slotB;
        const config = isSlotA ? (mapping.configA || {}) : (mapping.configB || {});
        
        if (this[animType]) {
            return this[animType](config);
        }
        
        return this.orb({ color: 'orb-clear' });
    },

    // ===== Inject Animation into Card =====
    injectAnimation: function(cardElement, ionId, slot) {
        const html = this.getAnimation(ionId, slot);
        
        // Find or create wrapper
        let wrapper = cardElement.querySelector('.ion-anim-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'ion-anim-wrapper';
            // Insert after title
            const title = cardElement.querySelector('.visual-card-title');
            if (title) {
                title.after(wrapper);
            } else {
                cardElement.prepend(wrapper);
            }
        }
        
        wrapper.innerHTML = html;
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IonAnimations;
}
