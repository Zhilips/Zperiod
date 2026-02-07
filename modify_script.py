import os

file_path = '/Users/zhilips/Desktop/_Projects/Zperiod local 没有混淆/script.js'
start_line = 9196
end_line = 9811

new_content = r'''function generateBalancerToolContent() {
    return `
        <div class="molar-tool-layout">
            <!-- Left Column: Input & Controls -->
            <div class="molar-input-panel">
                <!-- Boxed Input Section -->
                <div style="background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 24px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02); margin-bottom: 24px;">
                    
                    <!-- Reactants -->
                    <div style="margin-bottom: 16px;">
                        <label for="reactants-input" style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">
                            <span style="color:#ef4444; margin-right:4px;">●</span> ${t('Reactants', '反应物')}
                        </label>
                        <input type="text" 
                               id="reactants-input" 
                               placeholder="${t('e.g., Fe + O2', '例如: Fe + O2')}"
                               autocomplete="off"
                               spellcheck="false"
                               style="width: 100%; padding: 14px 16px; font-size: 1.1rem; font-family: 'SF Pro Display', system-ui, sans-serif; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; background: #fafafa; color: #1d1d1f; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); transition: all 0.2s;">
                    </div>

                    <!-- Arrow Divider -->
                    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 16px; color: #cbd5e1;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                    </div>

                    <!-- Products -->
                    <div style="margin-bottom: 24px;">
                        <label for="products-input" style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 8px; display: block; letter-spacing: 0.05em; text-transform: uppercase;">
                            <span style="color:#007aff; margin-right:4px;">●</span> ${t('Products', '生成物')}
                        </label>
                        <input type="text" 
                               id="products-input" 
                               placeholder="${t('e.g., Fe2O3', '例如: Fe2O3')}"
                               autocomplete="off"
                               spellcheck="false"
                               style="width: 100%; padding: 14px 16px; font-size: 1.1rem; font-family: 'SF Pro Display', system-ui, sans-serif; font-weight: 500; border: 1px solid rgba(0,0,0,0.1); border-radius: 12px; background: #fafafa; color: #1d1d1f; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); transition: all 0.2s;">
                    </div>

                    <!-- Action Button -->
                    <button id="auto-balance-btn" style="width: 100%; padding: 14px; background: #007aff; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(0,122,255,0.25); transition: transform 0.1s;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.64-6.36l-.7.7m-12.02 12.02l-.7.7m0-12.72l.7.7m12.02 12.02l.7.7"/>
                        </svg>
                        ${t('Auto Balance', '自动配平')}
                    </button>
                    
                    <!-- Feedback Status -->
                    <div class="balancer-status-bar" id="balance-feedback" style="margin-top: 16px; text-align: center; font-size: 0.9rem; color: #64748b; min-height: 20px;">
                        ${t('Enter equation', '输入方程式')}
                    </div>
                </div>

                <!-- Result Box (Initially Hidden or Empty) -->
                <div class="balancer-result-box" id="balanced-result" style="display: none; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 20px; text-align: center;">
                    <div class="balancer-result-label" style="color: #166534; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">${t('Balanced Equation', '配平后的方程式')}</div>
                    <div class="balancer-result-equation" id="balanced-equation-text" style="font-size: 1.4rem; font-weight: 700; color: #15803d; font-family: 'SF Pro Display', sans-serif;"></div>
                </div>
            </div>

            <!-- Right Column: Visual Stage (Physics Scale) -->
            <div class="molar-scale-stage">
                <!-- Using the same container class for reuse -->
                <div class="physics-scale-container" style="height: 100%; min-height: 480px; background: #f8fafc; border-radius: 20px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; border: 1px solid rgba(0,0,0,0.04);">
                    
                    <!-- 底座 -->
                    <div style="position: absolute; bottom: 15px; display: flex; flex-direction: column; align-items: center; z-index: 0; pointer-events: none;">
                        <div class="physics-stand-metallic" style="width: 14px; height: 210px; border-radius: 7px 7px 0 0;"></div>
                        <div class="physics-base-metallic" style="width: 140px; height: 22px; border-radius: 9999px; margin-top: -4px; border-top: 1px solid #6b7280;"></div>
                    </div>

                    <!-- 中心支点 -->
                    <div id="physics-pivot" style="position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); margin-top: -50px; z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                        <div style="width: 44px; height: 44px; background: linear-gradient(145deg, #f3f4f6, #d1d5db); border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; border: 3px solid #e5e7eb; position: relative; z-index: 40;">
                            <div id="physics-needle" class="physics-needle"></div>
                            <div style="width: 16px; height: 16px; background: linear-gradient(145deg, #6b7280, #374151); border-radius: 9999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); position: absolute; z-index: 50;"></div>
                        </div>
                    </div>

                    <!-- 旋转横梁 -->
                    <div id="physics-beam-assembly" class="physics-beam-metallic" style="position: absolute; top: 40%; left: 50%; width: 340px; height: 14px; border-radius: 9999px; margin-top: -50px; margin-left: -170px; display: flex; justify-content: space-between; align-items: center; z-index: 20;">
                        <div class="physics-beam-ruler"></div>

                        <!-- 左悬挂组件 -->
                        <div id="physics-hanger-left" style="position: absolute; left: 20px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(-50%); transition: transform 0.1s linear;">
                            <div class="physics-support-rod" style="pointer-events: none;">
                                <div class="physics-joint-ring physics-joint-top"></div>
                                <div class="physics-joint-ring physics-joint-bottom"></div>
                            </div>
                            <div class="physics-pan-metallic" style="width: 90px; height: 10px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                                <div id="physics-pan-label-left" class="physics-pan-label" style="font-size: 0.9rem; font-weight: 700; color: #ef4444;"></div>
                            </div>
                        </div>

                        <!-- 右悬挂组件 -->
                        <div id="physics-hanger-right" style="position: absolute; right: 20px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(50%); transition: transform 0.1s linear;">
                            <div class="physics-support-rod" style="pointer-events: none;">
                                <div class="physics-joint-ring physics-joint-top"></div>
                                <div class="physics-joint-ring physics-joint-bottom"></div>
                            </div>
                            <div class="physics-pan-metallic" style="width: 90px; height: 10px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                                <div id="physics-pan-label-right" class="physics-pan-label" style="font-size: 0.9rem; font-weight: 700; color: #007aff;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hidden elements for compatibility logic if any remain -->
        <button id="clear-balancer-btn" style="display:none;"></button>
        <div id="physics-card-left" style="display:none;"></div>
        <div id="physics-card-right" style="display:none;"></div>
    `;
}'''

with open(file_path, 'r') as f:
    lines = f.readlines()

# Replace lines (adjust for 0-indexing)
lines[start_line-1:end_line] = [new_content + '\n']

with open(file_path, 'w') as f:
    f.writelines(lines)

print("Successfully replaced generateBalancerToolContent")
