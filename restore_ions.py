
import os
import re

# Ion Data to Restore (ID, Name, Mass, Anim1, Anim2)
ions_to_restore = [
    {
        "id": "ch3coo", 
        "name": "Acetate", 
        "formula": "CH₃COO⁻",
        "mass": "59.04", 
        "anims": [
            {"id": "vinegar", "title": "Vinegar Smell", "desc": "Pungent Odor", "icon": "wave"},
            {"id": "hot-ice", "title": "Hot Ice", "desc": "Crystallization", "icon": "crystal"}
        ]
    },
    {
        "id": "co3", 
        "name": "Carbonate", 
        "formula": "CO₃²⁻",
        "mass": "60.01", 
        "anims": [
            {"id": "fizz", "title": "Acid Test", "desc": "Fizzes (CO₂)", "icon": "bubbles"},
            {"id": "precip", "title": "Precipitation", "desc": "Insoluble", "icon": "precip"}
        ]
    },
    {
        "id": "po4", 
        "name": "Phosphate",
        "formula": "PO₄³⁻",
        "mass": "94.97",
        "anims": [
             {"id": "fertilizer", "title": "Fertilizer", "desc": "Plant Growth", "icon": "plant"},
             {"id": "precip", "title": "Precipitation", "desc": "Yellow/White", "icon": "precip"}
        ]
    },
    {
        "id": "so4", "name": "Sulfate", "formula": "SO₄²⁻", "mass": "96.06",
        "anims": [{"id": "precip", "title": "BaSO₄ Test", "desc": "White Precip.", "icon": "precip"}, {"id": "acid", "title": "Sulfuric Acid", "desc": "Strong Acid", "icon": "beaker"}]
    },
    {
        "id": "no3", "name": "Nitrate", "formula": "NO₃⁻", "mass": "62.00",
        "anims": [{"id": "soluble", "title": "Solubility", "desc": "Always Soluble", "icon": "check"}, {"id": "brown-ring", "title": "Brown Ring", "desc": "Test", "icon": "ring"}]
    },
    {
        "id": "nh4", "name": "Ammonium", "formula": "NH₄⁺", "mass": "18.04",
        "anims": [{"id": "smell", "title": "Base Test", "desc": "Ammonia Gas", "icon": "wave"}, {"id": "soluble", "title": "Solubility", "desc": "Always Soluble", "icon": "check"}]
    },
    {
        "id": "oh", "name": "Hydroxide", "formula": "OH⁻", "mass": "17.01",
        "anims": [{"id": "base", "title": "Alkaline", "desc": "Blue Litmus", "icon": "litmus"}, {"id": "precip", "title": "Precipitation", "desc": "Insoluble", "icon": "precip"}]
    },
    # Add generics for others
    # ...
]

# Generate HTML for a single ion
def generate_ion_html(ion):
    html = f'''
                                    <!-- {ion['name']} Special Layout -->
                                    <div class="na-plus-l2-container" id="ion-l2-{ion['id']}" style="display: none;">
                                        <div class="na-l2-info-section">
                                            <div class="na-l2-info-row">
                                                <span class="na-l2-label" data-en="Molar Mass" data-zh="摩尔质量">Molar Mass</span>
                                                <span class="na-l2-value">{ion['mass']} <span class="na-l2-unit">g/mol</span></span>
                                            </div>
                                            <div class="na-l2-info-row">
                                                <span class="na-l2-label" data-en="Formula" data-zh="化学式">Formula</span>
                                                <span class="na-l2-value l2-formula">{ion['formula']}</span>
                                            </div>
                                            <div class="na-l2-shell-note">
                                                <span data-en="Polyatomic Ion" data-zh="多原子离子">Polyatomic Ion</span>
                                            </div>
                                            <div class="na-l2-solubility">
                                                <span class="na-l2-sol-star">★</span>
                                                <span class="na-l2-sol-label" data-en="Properties" data-zh="性质">Properties</span>
                                            </div>
                                        </div>
                                        <div class="na-l2-animations">'''
    
    for anim in ion['anims']:
        icon_html = ''
        if anim['icon'] == 'wave':
            icon_html = '<div class="vinegar-wave"></div><div class="vinegar-wave" style="animation-delay: 0.5s"></div>'
        elif anim['icon'] == 'bubbles':
            icon_html = '<div class="bubble b1"></div><div class="bubble b2"></div><div class="bubble b3"></div>'
        elif anim['icon'] == 'precip':
             icon_html = '<div class="precip-particles"></div><div class="precip-pile"></div>'
        else:
             icon_html = '<div class="generic-icon-circle"></div>'

        html += f'''
                                            <div class="na-l2-anim-card" id="{ion['id']}-{anim['id']}-card">
                                                <div class="na-l2-anim-icon">
                                                    {icon_html}
                                                    <svg class="na-l2-icon-line" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                                        <rect x="2" y="2" width="20" height="20" rx="4" opacity="0.1"/>
                                                    </svg>
                                                </div>
                                                <div class="na-l2-anim-text">
                                                    <span class="na-l2-anim-title">{anim['title']}</span>
                                                    <span class="na-l2-anim-desc">{anim['desc']}</span>
                                                </div>
                                            </div>'''
    
    html += '''
                                        </div>
                                    </div>'''
    return html

# Generate CSS
css_content = '''
/* Added by Restoration Script */
.vinegar-wave {
    position: absolute;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(0,0,0,0.1);
    border-radius: 50%;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: wave-expand 2s infinite ease-out;
}
@keyframes wave-expand {
    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}
.bubble {
    position: absolute;
    bottom: 0;
    background: rgba(59, 130, 246, 0.5);
    border-radius: 50%;
    animation: bubble-rise 2s infinite ease-in;
}
.b1 { width: 6px; height: 6px; left: 30%; animation-duration: 1.5s; }
.b2 { width: 4px; height: 4px; left: 50%; animation-duration: 2.2s; }
.b3 { width: 8px; height: 8px; left: 70%; animation-duration: 1.8s; }

.precip-particles {
    position: absolute;
    top: 10px; width: 100%; height: 100%;
    background-image: radial-gradient(circle, #fff 2px, transparent 3px);
    background-size: 10px 10px;
    animation: precip-fall 3s linear infinite;
}
.precip-pile {
    position: absolute;
    bottom: 5px; width: 60%; left: 20%; height: 10px;
    background: #fff;
    border-radius: 4px 4px 0 0;
    opacity: 0.8;
}
@keyframes precip-fall {
    from { background-position: 0 0; }
    to { background-position: 0 50px; }
}
'''

# Main Logic
file_path = 'index.html'
style_path = 'style.css'

with open(file_path, 'r') as f:
    content = f.read()

# Find insertion point (Inside yellow-rectangle of Level 2)
# We look for the closing div of yellow-rectangle. 
# Identifying it by indentation or context.
# na-plus-l2-container is inside it.
# We'll search for the last occurrence of 'na-plus-l2-container' and insert after its closing div.

matches = list(re.finditer(r'<div class="na-plus-l2-container".*?</div>\s*</div>', content, re.DOTALL)) # Try simpler approach
# Just find the LAST <div class="na-plus-l2-container" ...> ... </div> 
# and insert after it.

last_l2_end = -1
search_token = 'class="na-plus-l2-container"'
last_idx = content.rfind(search_token)

if last_idx != -1:
    # Find the closing div for this container
    # Simple logic: assume indented closing div or scan forward
    # This is risky with regex but file has standard formatting
    # We'll insert BEFORE the closing </div> of the PARENT yellow-rectangle.
    
    # Locate "yellow-rectangle"
    yellow_rec_idx = content.find('class="yellow-rectangle"', content.find('Level 2')) # Find L2 yellow rect
    if yellow_rec_idx != -1:
        # Find the closing div corresponding to yellow-rectangle
        # It's tricky without a parser.
        # But we know Na+ card closes with </div>.
        # And it is followed by </div> (yellow rect close)
        # So we can insert before the first </div> that follows the LAST l2-container.
        
        # Actually, let's insert BEFORE the closing div of "yellow-rectangle".
        # We can find the start of Level 3 card to define the boundary.
        l3_idx = content.find('<!-- Level 3')
        if l3_idx != -1:
             # Look backwards from l3_idx for the closing div of card-slide/yellow-rectangle
             insert_pos = content.rfind('</div>', 0, l3_idx)
             insert_pos = content.rfind('</div>', 0, insert_pos) # Close yellow-rectangle
             # Insert here
             
             new_html = ""
             for ion in ions_to_restore:
                 # Check if NOT already present
                 if f'id="ion-l2-{ion["id"]}"' not in content:
                     new_html += generate_ion_html(ion)
                     print(f"Adding {ion['name']}")
             
             if new_html:
                 updated_content = content[:insert_pos] + new_html + content[insert_pos:]
                 with open(file_path, 'w') as f:
                     f.write(updated_content)
                 print("Updated index.html")
             else:
                 print("No new ions to add.")

# Update CSS
with open(style_path, 'a') as f:
    f.write(css_content)
print("Updated style.css")
