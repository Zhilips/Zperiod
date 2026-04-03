// CSS is now loaded in index.html to support native ES modules without a bundler

import { t } from "./langController.js";

const TOOL_CONTENT_FACTORIES = {
  balancer: generateBalancerToolContent,
  "molar-mass": generateMolarMassToolContent,
  "virtual-lab": generateVirtualLabToolContent,
  empirical: generateEmpiricalToolContent,
  solubility: generateSolubilityToolContent,
};

export function getChemToolContent(toolType) {
  return TOOL_CONTENT_FACTORIES[toolType]?.() ?? "";
}

function generateBalancerToolContent() {
  return `
        <style>
            /* ===== Apple Style Floating Cards ===== */
            .balancer-main-wrapper {
                display: flex;
                flex-direction: column;
                gap: 16px;
                flex: 1;
                min-height: 0;
                container-type: inline-size;
                container-name: balancer;
            }

            .balancer-float-card {
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
                transition: all 0.2s ease;
            }

            .balancer-float-card:hover {
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .physics-scale-panel {
                background: linear-gradient(to bottom, #f8fafc, #ffffff);
                border-radius: 16px;
                padding: 10px 0;
                width: 100%;
                min-width: 480px;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .balancer-main-wrapper {
                display: flex;
                flex-direction: column;
                flex: 1;
                min-height: 0;
            }

            .physics-scale-container {
                perspective: 1000px;
                width: 100%;
                min-width: 460px;
                min-height: 200px;
                flex: 1;
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(248, 250, 252, 0.6);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .physics-scale-container::before {
                content: '';
                position: absolute;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 60px;
                background: radial-gradient(ellipse at center bottom, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
            }

            .physics-beam-metallic {
                background: linear-gradient(180deg, #6b7280 0%, #4b5563 30%, #374151 70%, #1f2937 100%);
                box-shadow:
                    0 4px 12px rgba(0,0,0,0.25),
                    inset 0 2px 0 rgba(255,255,255,0.15),
                    inset 0 -1px 0 rgba(0,0,0,0.2);
                transition: transform 0.1s linear;
                transform-origin: center center;
            }

            .physics-beam-ruler {
                background-image: repeating-linear-gradient(
                    90deg,
                    rgba(255,255,255,0.25) 0px,
                    rgba(255,255,255,0.25) 1px,
                    transparent 1px,
                    transparent 15px
                );
                height: 40%;
                width: 85%;
                position: absolute;
                top: 30%;
                left: 7.5%;
                pointer-events: none;
            }

            .physics-pan-metallic {
                background: linear-gradient(180deg, #4b5563 0%, #374151 50%, #1f2937 100%);
                box-shadow:
                    0 8px 25px -4px rgba(0, 0, 0, 0.35),
                    inset 0 2px 0 rgba(255,255,255,0.08),
                    inset 0 -1px 3px rgba(0,0,0,0.2);
            }

            .physics-support-rod {
                width: 3px;
                background: linear-gradient(90deg, #d1d5db 0%, #6b7280 20%, #374151 50%, #6b7280 80%, #d1d5db 100%);
                height: 80px;
                margin: 0 auto;
                position: relative;
                z-index: 5;
                box-shadow: 2px 0 4px rgba(0,0,0,0.2);
            }

            .physics-joint-ring {
                width: 10px;
                height: 10px;
                background: radial-gradient(circle at 30% 30%, #f3f4f6, #9ca3af);
                border: 2px solid #4b5563;
                border-radius: 50%;
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                z-index: 6;
            }
            .physics-joint-top { top: -5px; }
            .physics-joint-bottom { bottom: -5px; }

            .physics-stand-metallic {
                background: linear-gradient(90deg, #4b5563 0%, #9ca3af 30%, #6b7280 50%, #9ca3af 70%, #4b5563 100%);
                box-shadow: 2px 0 8px rgba(0,0,0,0.2);
            }

            .physics-base-metallic {
                background: linear-gradient(180deg, #6b7280 0%, #374151 30%, #1f2937 100%);
                box-shadow:
                    0 10px 30px -5px rgba(0, 0, 0, 0.4),
                    inset 0 2px 0 rgba(255,255,255,0.1);
            }

            .physics-needle {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 4px;
                height: 50px;
                background: linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%);
                transform-origin: top center;
                transform: translate(-50%, 0);
                z-index: 35;
                border-radius: 0 0 3px 3px;
                box-shadow: 0 3px 8px rgba(239, 68, 68, 0.4);
                pointer-events: none;
            }

            .physics-pan-label {
                position: absolute;
                bottom: 15px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 14px;
                font-weight: 700;
                color: #374151;
                text-align: left;
                white-space: nowrap;
                text-shadow: 0 1px 2px rgba(255,255,255,0.8);
                letter-spacing: 0.5px;
                min-height: 20px;
                z-index: 100;
            }

            .physics-pan-label.has-content {
                padding: 4px 12px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 12px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .balancer-input-section {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .balancer-input-row {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                gap: 12px;
                align-items: center;
            }

            .balancer-input-group {
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border-radius: 16px;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
                transition: all 0.2s ease;
            }

            .balancer-input-group:hover {
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .balancer-input-group:focus-within {
                border-color: rgba(99, 102, 241, 0.4);
                box-shadow:
                    0 0 0 3px rgba(99, 102, 241, 0.12),
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 12px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .balancer-input-label {
                font-size: 13px;
                font-weight: 600;
                color: #475569;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .balancer-input-label .label-icon {
                width: 20px;
                height: 20px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 700;
                color: white;
            }
            .balancer-input-label .label-icon.reactant { background: linear-gradient(135deg, #6366f1, #4f46e5); }
            .balancer-input-label .label-icon.product { background: linear-gradient(135deg, #10b981, #059669); }

            .balancer-text-input {
                width: 100%;
                padding: 14px 16px;
                font-size: 1.05rem;
                font-weight: 500;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                color: #1e293b;
                background: #ffffff;
                border: 2px solid transparent;
                border-radius: 12px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 2px rgba(0, 0, 0, 0.02);
                outline: none;
                transition: all 0.2s ease;
            }

            .balancer-text-input:focus {
                border-color: rgba(99, 102, 241, 0.4);
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1), 0 4px 12px rgba(0, 0, 0, 0.05);
            }

            .balancer-text-input::placeholder {
                color: #94a3b8;
                font-weight: 400;
            }

            .balancer-arrow-divider {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 14px;
                border: 1px solid rgba(255, 255, 255, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-arrow-divider svg {
                width: 24px;
                height: 24px;
                color: #64748b;
            }

            .balancer-atom-counts {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                padding: 10px 14px;
                background: #f8fafc;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
            }

            .atom-count-column {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }

            .atom-count-title {
                font-size: 11px;
                font-weight: 700;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 1px;
                padding-bottom: 6px;
                border-bottom: 1px dashed #cbd5e1;
            }

            .atom-count-list {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                min-height: 28px;
            }

            .atom-tag {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 10px;
                font-size: 13px;
                font-weight: 600;
                border-radius: 12px;
                background: #ffffff;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
            }
            .atom-tag.left {
                color: #4f46e5;
                border: 1px solid rgba(99, 102, 241, 0.3);
            }
            .atom-tag.right {
                color: #059669;
                border: 1px solid rgba(16, 185, 129, 0.3);
            }

            .balancer-status-bar {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 18px 32px;
                border-radius: 16px;
                font-size: 1rem;
                font-weight: 600;
                transition: all 0.2s ease;
                background: rgba(248, 250, 252, 0.72);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                color: #64748b;
                border: 2px solid transparent;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-status-bar.balanced {
                background: rgba(209, 250, 229, 0.72);
                color: #047857;
                border-color: transparent;
            }

            .balancer-status-bar.unbalanced {
                background: rgba(254, 243, 199, 0.72);
                color: #b45309;
                border-color: transparent;
            }

            .balancer-status-bar .status-icon {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .balancer-status-bar.balanced .status-icon { background: #10b981; color: white; }
            .balancer-status-bar.unbalanced .status-icon { background: #f59e0b; color: white; }

            .balancer-action-buttons {
                display: flex;
                gap: 10px;
                justify-content: flex-start;
            }

            .balancer-btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                padding: 16px 28px;
                font-size: 1.05rem;
                font-weight: 600;
                border-radius: 14px;
                border: none;
                cursor: pointer;
                transition: all 0.2s ease;
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                flex-shrink: 0;
                white-space: nowrap;
            }

            @container balancer (max-width: 700px) {
                .balancer-btn {
                    padding: 14px 20px;
                    font-size: 0.9rem;
                    gap: 6px;
                    border-radius: 12px;
                }
                .balancer-status-bar {
                    padding: 14px 20px;
                    font-size: 0.9rem;
                    border-radius: 12px;
                }
            }

            @container balancer (max-width: 550px) {
                .balancer-btn {
                    padding: 10px 12px;
                    font-size: 0.8rem;
                    gap: 4px;
                    border-radius: 10px;
                }
                .balancer-btn svg {
                    display: none;
                }
                .balancer-status-bar {
                    padding: 10px 12px;
                    font-size: 0.8rem;
                    border-radius: 10px;
                }
            }

            .balancer-btn-primary {
                background: rgba(30, 41, 59, 0.88);
                color: white;
                border: 2px solid transparent;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.12),
                    0 8px 24px rgba(0, 0, 0, 0.16),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .balancer-btn-primary:hover {
                background: rgba(30, 41, 59, 0.95);
                transform: translateY(-1px);
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.15),
                    0 12px 32px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15);
            }

            .balancer-btn-primary:active {
                transform: translateY(0);
            }

            .balancer-btn-secondary {
                background: rgba(255, 255, 255, 0.72);
                color: #475569;
                border: 2px solid transparent;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-btn-secondary:hover {
                background: rgba(255, 255, 255, 0.85);
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .balancer-result-box {
                display: none;
                padding: 16px 20px;
                background: rgba(236, 253, 245, 0.72);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border-radius: 14px;
                border: 1px solid rgba(167, 243, 208, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .balancer-result-box.show {
                display: block;
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .balancer-result-label {
                font-size: 12px;
                font-weight: 600;
                color: #059669;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
            }

            .balancer-result-equation {
                font-size: 20px;
                font-weight: 700;
                color: #047857;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
            }

            .balancer-tips-section {
                padding: 14px 16px;
                background: #f8fafc;
                border-radius: 12px;
                border: 1px solid #e2e8f0;
            }

            .balancer-tips-title {
                font-size: 0.8rem;
                font-weight: 700;
                color: #64748b;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 6px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .balancer-tips-title svg {
                width: 14px;
                height: 14px;
            }

            .balancer-tips-list {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }

            .balancer-tip-item {
                font-size: 0.8rem;
                color: #64748b;
                padding-left: 16px;
                position: relative;
                line-height: 1.5;
            }

            .balancer-tip-item::before {
                content: '•';
                position: absolute;
                left: 4px;
                color: #94a3b8;
            }

            .balancer-example-box {
                margin-top: 10px;
                padding: 10px 12px;
                background: #ffffff;
                border-radius: 12px;
                font-size: 0.8rem;
                color: #475569;
                border: 1px solid #e2e8f0;
            }

            .balancer-example-box code {
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                background: #f1f5f9;
                padding: 2px 5px;
                border-radius: 3px;
                font-weight: 600;
                color: #1e293b;
            }

            .global-nav-pill .nav-pill-btn.active {
                background: transparent;
                box-shadow: none;
            }

            /* ===== PREDICTOR 2-COLUMN LAYOUT ===== */
            .predictor-panel {
                display: none;
                flex-direction: row;
                gap: 20px;
                flex: 1;
                margin-top: 0; /* Fixed: aligned with balancer, previously 10px */
            }
            .predictor-panel.active { display: flex; }

            .balancer-panel {
                display: none;
                flex-direction: column;
                gap: 16px;
                flex: 1;
            }
            .balancer-panel.active { display: flex; }

            .predictor-layout {
                display: flex;
                flex-direction: row;
                gap: 24px;
                width: 100%;
                align-items: stretch;
            }

            .predictor-left-col {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 22px;
                background: #f1f5f9;
                border: 1px solid #e2e8f0;
                border-radius: 20px;
                padding: 24px;
                box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
            }
            .predictor-right-col {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 20px;
                border: 1px solid rgba(255, 255, 255, 0.4);
                border-radius: 20px;
                background: rgba(248, 250, 252, 0.3);
                padding: 24px;
                position: relative;
                box-shadow: inset 0 2px 12px rgba(0, 0, 0, 0.02);
            }

            @media (max-height: 850px) {
                .predictor-left-col, .predictor-right-col {
                    padding: clamp(14px, 2.5vh, 24px);
                    gap: clamp(10px, 2vh, 22px);
                }
                .predictor-type-grid { gap: 8px !important; }
                .predictor-type-card { padding: clamp(8px, 1.5vh, 16px) 14px !important; }
                .predictor-result-card { padding: clamp(12px, 2vh, 20px) 24px !important; }
            }

            @container balancer (max-width: 600px) {
                .predictor-layout { flex-direction: column; }
            }

            .predictor-input-group {
                display: flex; flex-direction: column; gap: 10px;
            }
            .predictor-type-grid {
                display: flex; flex-wrap: wrap; gap: 12px; margin-top: 6px;
            }
            .predictor-type-card {
                padding: 16px 14px;
                background: #ffffff;
                border: 2px solid transparent;
                border-radius: 14px;
                cursor: pointer;
                text-align: center;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                font-weight: 600;
                color: #64748b;
                font-size: 0.9rem;
                flex: 1 1 calc(50% - 12px);
                min-width: 140px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
            }
            .predictor-type-card:hover {
                color: #1e293b;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
            }
            .predictor-type-card.selected {
                background: #ffffff;
                border-color: rgba(99, 102, 241, 0.4);
                color: #4f46e5;
                font-weight: 700;
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12), 0 6px 16px rgba(99, 102, 241, 0.15);
                transform: translateY(-2px);
            }
            .predictor-type-card:active {
                transform: translateY(0);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
            }

            .predictor-result-area {
                display: flex; flex-direction: column; gap: 14px; width: 100%;
                opacity: 0; pointer-events: none;
            }
            .predictor-result-area.show { opacity: 1; pointer-events: auto; }

            .predictor-empty-state {
                position: absolute; inset: 0;
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: #94a3b8; font-weight: 600; font-size: 0.95rem; text-align: center; gap: 12px;
                transition: opacity 0.3s;
                padding: 20px;
            }
            .predictor-result-area.show + .predictor-empty-state { display: none; }

            .predictor-result-card {
                padding: 20px 24px; border-radius: 16px;
                border: 1px solid rgba(167, 243, 208, 0.8);
                background: rgba(236, 253, 245, 0.8);
                backdrop-filter: blur(16px);
                box-shadow: 0 4px 16px rgba(16, 185, 129, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }
            .predictor-result-card.error {
                background: rgba(254, 243, 199, 0.72); border-color: rgba(253, 224, 71, 0.6);
            }
            .predictor-result-card.no-reaction {
                background: rgba(241, 245, 249, 0.72); border-color: rgba(203, 213, 225, 0.6);
            }
            .predictor-result-label {
                font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
                margin-bottom: 6px; color: #059669;
            }
            .predictor-result-card.error .predictor-result-label { color: #b45309; }
            .predictor-result-card.no-reaction .predictor-result-label { color: #64748b; }
            .predictor-result-equation {
                font-size: 1.15rem; font-weight: 700; color: #047857;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace; word-break: break-word;
            }
            .predictor-result-card.error .predictor-result-equation { color: #92400e; font-size: 0.95rem; font-weight: 600; }
            .predictor-result-card.no-reaction .predictor-result-equation { color: #475569; font-size: 0.95rem; font-weight: 600; }

            .predictor-explanation {
                margin-top: 4px; padding: 14px 18px; background: rgba(255, 255, 255, 0.8);
                border-radius: 14px; font-size: 0.9rem; color: #475569; line-height: 1.5;
                display: flex; align-items: flex-start; gap: 10px; border: 1px solid rgba(255, 255, 255, 1);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
            }
            .predictor-explanation .explain-icon { color: #64748b; margin-top: 1px; }
        </style>

        <!-- Mode Switch in Absolute Top Padding -->
        <div style="position: absolute; top: 8px; left: 50%; transform: translateX(-50%); z-index: 100;">
            <div style="display: flex; align-items: stretch; position: relative; margin: 0; padding: 0; box-sizing: border-box; background: rgba(0,0,0,0.04); border-radius: 22px; width: 280px; height: 44px; gap: 0;" id="mode-switcher-pill">
                <div id="balancer-mode-slider" style="position: absolute; top: 3px; bottom: 5px; left: 4px; width: 134px; transform: translateX(0px); transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); box-shadow: 0 1px 3px rgba(0,0,0,0.1); background: #ffffff; border-radius: 18px; z-index: 0;"></div>
                <button class="nav-pill-btn active" data-mode="balance" id="mode-balance-btn" style="flex: 1; min-width: 0; margin: 4px 2px 4px 4px; padding: 0 0 2px; z-index: 1; border-radius: 18px; border: none; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">
                    ${t("balancer.modeBalance")}
                </button>
                <button class="nav-pill-btn" data-mode="predict" id="mode-predict-btn" style="flex: 1; min-width: 0; margin: 4px 4px 4px 2px; padding: 0 0 2px; z-index: 1; border-radius: 18px; border: none; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; line-height: 1;">
                    ${t("balancer.modePredict")}
                </button>
            </div>
        </div>

        <div class="tool-padding-label">${t("balancer.title")}</div>

        <div class="balancer-main-wrapper">

            <!-- ===== BALANCE MODE ===== -->
            <div class="balancer-panel active" id="balancer-panel">


            <div class="physics-scale-container">

                <div style="position: absolute; bottom: 4.7%; top: 24%; display: flex; flex-direction: column; align-items: center; z-index: 0; pointer-events: none;">
                    <div class="physics-stand-metallic" style="width: 14px; flex: 1; border-radius: 7px 7px 0 0;"></div>
                    <div class="physics-base-metallic" style="width: 140px; height: 22px; border-radius: 9999px; margin-top: -4px; border-top: 1px solid #6b7280;"></div>
                </div>

                <div id="physics-pivot" style="position: absolute; top: 24.4%; left: 50%; transform: translate(-50%, -50%); z-index: 30; display: flex; align-items: center; justify-content: center; pointer-events: none;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(145deg, #f3f4f6, #d1d5db); border-radius: 9999px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; border: 3px solid #e5e7eb; position: relative; z-index: 40;">
                        <div id="physics-needle" class="physics-needle"></div>
                        <div style="width: 16px; height: 16px; background: linear-gradient(145deg, #6b7280, #374151); border-radius: 9999px; box-shadow: inset 0 2px 4px rgba(0,0,0,0.4); position: absolute; z-index: 50;"></div>
                    </div>
                </div>

                <div id="physics-beam-assembly" class="physics-beam-metallic" style="position: absolute; top: 24.4%; left: 50%; width: 420px; height: 14px; border-radius: 9999px; margin-left: -210px; display: flex; justify-content: space-between; align-items: center; z-index: 20; transform-origin: center center;">
                    <div class="physics-beam-ruler"></div>

                    <div id="physics-hanger-left" style="position: absolute; left: 25px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(-50%); transition: transform 0.1s linear;">
                        <div class="physics-support-rod" style="pointer-events: none;">
                            <div class="physics-joint-ring physics-joint-top"></div>
                            <div class="physics-joint-ring physics-joint-bottom"></div>
                        </div>
                        <div class="physics-pan-metallic" style="width: 110px; height: 12px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                            <div id="physics-pan-label-left" class="physics-pan-label"></div>
                        </div>
                    </div>

                    <div id="physics-hanger-right" style="position: absolute; right: 25px; top: 7px; width: 24px; display: flex; flex-direction: column; align-items: center; transform-origin: top center; transform: translateX(50%); transition: transform 0.1s linear;">
                        <div class="physics-support-rod" style="pointer-events: none;">
                            <div class="physics-joint-ring physics-joint-top"></div>
                            <div class="physics-joint-ring physics-joint-bottom"></div>
                        </div>
                        <div class="physics-pan-metallic" style="width: 110px; height: 12px; border-radius: 0 0 14px 14px; position: relative; border-top: 1px solid #6b7280;">
                            <div id="physics-pan-label-right" class="physics-pan-label"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="balancer-input-section">
                <div class="balancer-input-row">
                    <div class="balancer-input-group">
                        <label class="balancer-input-label">
                            <span class="label-icon reactant">R</span>
                            ${t("balancer.reactants")}
                        </label>
                        <input type="text"
                               id="reactants-input"
                               class="balancer-text-input"
                               placeholder="${t("balancer.reactantsPlaceholder")}"
                               autocomplete="off"
                               spellcheck="false">
                    </div>

                    <div class="balancer-arrow-divider">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </div>

                    <div class="balancer-input-group">
                        <label class="balancer-input-label">
                            <span class="label-icon product">P</span>
                            ${t("balancer.products")}
                        </label>
                        <input type="text"
                               id="products-input"
                               class="balancer-text-input"
                               placeholder="${t("balancer.productsPlaceholder")}"
                               autocomplete="off"
                               spellcheck="false">
                    </div>
                </div>
            </div>

            <div style="display: flex; align-items: center; gap: 12px;">
                <button id="auto-balance-btn" class="balancer-btn balancer-btn-primary">
                    ${t("balancer.autoBalance")}
                </button>
                <button id="clear-balancer-btn" class="balancer-btn balancer-btn-secondary">
                    ${t("balancer.clear")}
                </button>
                <div class="balancer-status-bar" id="balance-feedback" style="flex: 1; min-width: 0;">
                    ${t("balancer.enterEquation")}
                </div>
            </div>
            </div>

            <!-- ===== PREDICT MODE ===== -->
            <div class="predictor-panel" id="predictor-panel">
                <div class="predictor-layout">

                    <!-- LEFT COLUMN: INPUT FORM -->
                    <div class="predictor-left-col">
                        <!-- Reactant Input -->
                        <div class="predictor-input-group">
                            <label class="balancer-input-label">
                                <span class="label-icon reactant">R</span>
                                ${t("predictor.reactants")}
                            </label>
                            <input type="text"
                                   id="predictor-reactants-input"
                                   class="balancer-text-input"
                                   placeholder="${t("predictor.reactantsPlaceholder")}"
                                   autocomplete="off"
                                   spellcheck="false">
                        </div>

                        <!-- Reaction Type Selector -->
                        <div class="predictor-input-group" style="margin-top: 8px;">
                            <label class="balancer-input-label">
                                <span class="label-icon product" style="background: linear-gradient(135deg, #8b5cf6, #6d28d9);">T</span>
                                ${t("predictor.reactionType")}
                            </label>
                            <div class="predictor-type-grid" id="predictor-type-grid">
                                <div class="predictor-type-card" data-type="synthesis">
                                    ${t("predictor.synthesis")}
                                </div>
                                <div class="predictor-type-card" data-type="decomposition">
                                    ${t("predictor.decomposition")}
                                </div>
                                <div class="predictor-type-card" data-type="single_displacement">
                                    ${t("predictor.singleDisplacement")}
                                </div>
                                <div class="predictor-type-card" data-type="double_displacement">
                                    ${t("predictor.doubleDisplacement")}
                                </div>
                                <div class="predictor-type-card" data-type="combustion">
                                    ${t("predictor.combustion")}
                                </div>
                            </div>
                        </div>
                        
                        <!-- Predict Button -->
                        <div style="display: flex; align-items: center; gap: 12px; margin-top: auto; padding-top: 16px;">
                            <button id="predict-btn" class="balancer-btn balancer-btn-primary">
                                ${t("predictor.predict")}
                            </button>
                            <button id="clear-predictor-btn" class="balancer-btn balancer-btn-secondary">
                                ${t("balancer.clear")}
                            </button>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: RESULTS -->
                    <div class="predictor-right-col">
                        
                        <div class="predictor-result-area" id="predictor-result-area">
                            <!-- Products Card -->
                            <div class="predictor-result-card" id="predictor-products-card">
                                <div class="predictor-result-label" id="predictor-products-label"></div>
                                <div class="predictor-result-equation" id="predictor-products-text"></div>
                            </div>

                            <!-- Balanced Equation Card -->
                            <div class="predictor-result-card" id="predictor-balanced-card">
                                <div class="predictor-result-label" id="predictor-balanced-label"></div>
                                <div class="predictor-result-equation" id="predictor-balanced-text"></div>
                            </div>

                            <!-- Explanation -->
                            <div class="predictor-explanation" id="predictor-explanation">
                                <svg class="explain-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                                <span id="predictor-explanation-text"></span>
                            </div>
                        </div>

                        <!-- Empty State (Shown when results are hidden) -->
                        <div class="predictor-empty-state">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
                            <span>${t("predictor.emptyState", "Enter reactants and select a<br>reaction type to predict products")}</span>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        <!-- Hidden elements for compatibility -->
        <div id="physics-card-left" style="display:none;"></div>
        <div id="physics-card-right" style="display:none;"></div>
    `;
}

function generateMolarMassToolContent() {
  return `

        <div class="tool-padding-label">${t("molarMass.title")}</div>
        <div class="molar-tool-layout">
            <!-- Left Column: Input & Info -->
            <div class="molar-input-panel">
                <div class="tool-input-section molar-input-card">
                    <label for="modal-formula-input" class="molar-input-label">
                        <span class="molar-label-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
                            </svg>
                        </span>
                        ${t("molarMass.chemFormula")}
                    </label>
                    <input type="text" id="modal-formula-input"
                           placeholder="${t("molarMass.placeholder")}"
                           class="realtime-input"
                           autocomplete="off"
                           spellcheck="false">

                    <!-- Live Formula Preview -->
                    <div class="formula-live-preview" id="formula-live-preview">
                        <span class="preview-label">${t("molarMass.formulaPreview")}</span>
                        <span class="preview-formula" id="preview-formula-display">—</span>
                    </div>

                    <!-- Formula Suggestion (always visible container) -->
                    <div class="formula-suggestion" id="formula-suggestion">
                        <span class="suggestion-text" id="suggestion-text">${t("molarMass.enterFormula")}</span>
                    </div>

                    <!-- Removed Tips & Options -->
                </div>

                <div style="display: flex; align-items: stretch; gap: 12px; margin-top: 10px; width: 100%;">
                    <button id="clear-molar-btn" class="molar-action-btn molar-action-btn-secondary">
                        ${t("molarMass.clear")}
                    </button>

                    <button id="print-ticket-btn" class="molar-action-btn molar-action-btn-primary" style="flex: 1;">
                        ${t("molarMass.printTicket")}
                    </button>

                    <button id="modal-exact-toggle-btn" class="molar-action-btn molar-action-btn-secondary" style="border-radius: 50%; width: 56px; height: 56px; padding: 0; min-width: 56px; min-height: 56px; display: flex; align-items: center; justify-content: center; overflow: hidden;" title="${t("molarMass.exactDecimalsTitle")}" data-exact="false">
                        .00
                    </button>
                </div>
                
                <div class="molar-quick-examples">
                    <div class="molar-examples-grid" id="molar-quick-chips">
                        <button class="molar-example-chip" data-formula="H2O">H<sub>2</sub>O <span class="chip-name">${t("molarMass.chipWater")}</span></button>
                        <button class="molar-example-chip" data-formula="NaCl">NaCl <span class="chip-name">${t("molarMass.chipSalt")}</span></button>
                        <button class="molar-example-chip" data-formula="CO2">CO<sub>2</sub> <span class="chip-name">${t("molarMass.chipCarbonDioxide")}</span></button>
                        <button class="molar-example-chip" data-formula="C6H12O6">C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> <span class="chip-name">${t("molarMass.chipGlucose")}</span></button>
                    </div>
                </div>
            </div>

            <!-- Right Column: Visual Stage -->
            <div class="molar-scale-stage">
                <div class="electronic-scale-wrapper">
                    <!-- 3D Blocks -->
                    <div id="scale-blocks-area" class="scale-blocks-area"></div>

                    <!-- Scale Base Top -->
                    <div class="electronic-scale-base">
                        <div class="scale-platform-top"></div>
                        <div class="scale-screen">
                            <span id="scale-display-value">0.00</span>
                            <span style="font-size: 1rem; margin-left: 8px; opacity: 0.7;">g/mol</span>
                        </div>
                    </div>

                    <div class="receipt-anim-container">
                        <div id="receipt-wrapper" class="receipt-wrapper">
                            <div class="receipt-header">${t("molarMass.weightTicket")}</div>
                            <div class="receipt-barcode">|||||||||||||||||||||||</div>
                            <div class="receipt-date" id="receipt-date"></div>
                            <div id="receipt-items"></div>
                            <div class="receipt-total-row">
                                <span>${t("molarMass.total")}</span>
                                <span id="receipt-total-value"></span>
                            </div>
                            <div class="receipt-footer">
                                ${t("molarMass.thankYou")}
                            </div>
                        </div>
                    </div>

                    <div class="scale-front-panel">
                        <div class="receipt-slot"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hidden legacy containers -->
        <div id="modal-mass-result" style="display:none;"></div>
        <div id="modal-mass-breakdown" style="display:none;"></div>
        <button id="modal-calculate-mass-btn" style="display:none;"></button>
    `;
}

function generateVirtualLabToolContent() {
  return `
        <style>
            .virtual-lab-goo-defs {
                position: absolute;
                width: 0;
                height: 0;
                pointer-events: none;
            }

            .virtual-lab-shell {
                display: flex;
                flex: 1;
                flex-direction: column;
                min-height: 0; /* Remove hardcoded 520px to allow shrinking */
                height: 100%;  /* Fill available space */
                max-height: 100%;
                width: 100%;
                box-sizing: border-box;
                padding: 0;
                background: transparent;
                position: relative;
                user-select: none;
                -webkit-user-select: none;
            }

            .virtual-lab-stage {
                width: 100%;
                flex: 1;
                display: flex;
                align-items: stretch;
                justify-content: center;
                background: transparent;
            }

            .virtual-lab-scene {
                position: relative;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(165deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%);
                border-radius: 20px;
                box-sizing: border-box;
                overflow: hidden;
                /* Advanced Premium Bezel / Inset Effect */
                border: 1px solid rgba(0, 0, 0, 0.06);
                box-shadow: 
                    inset 0 4px 10px rgba(0, 0, 0, 0.06),
                    inset 0 2px 4px rgba(0, 0, 0, 0.04),
                    inset 0 -1px 2px rgba(255, 255, 255, 0.6),
                    0 1px 2px rgba(255, 255, 255, 1);
            }

            .virtual-lab-particle-layer {
                position: absolute;
                inset: 0;
                pointer-events: none;
                z-index: 1;
                filter: url(#virtual-lab-goo-filter);
            }

            .virtual-lab-wooden-stand {
                position: absolute;
                left: 0;
                top: 0;
                width: 66px;
                height: 14px;
                box-sizing: border-box;
                border-radius: 4px;
                background: linear-gradient(180deg, #b07e54, #8b5a2b);
                border: 2px solid #5c3a18;
                border-top: 1px solid #d4a373;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.1);
                z-index: 5;
                transition: opacity 0.3s ease;
                will-change: transform;
            }

            .virtual-lab-wooden-stand::before,
            .virtual-lab-wooden-stand::after {
                content: '';
                position: absolute;
                top: 100%;
                width: 10px;
                height: 16px;
                background: linear-gradient(180deg, #8b5a2b, #5c3a18);
                border: 2px solid #5c3a18;
                border-top: none;
                border-radius: 0 0 3px 3px;
                box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                box-sizing: border-box;
            }
            .virtual-lab-wooden-stand::before {
                left: 6px;
            }
            .virtual-lab-wooden-stand::after {
                right: 6px;
            }

            .virtual-lab-metal-cube {
                position: absolute;
                left: 0;
                top: 0;
                width: 46px;
                height: 46px;
                box-sizing: border-box;
                border-radius: 8px;
                background: #b0b5bc;
                border: 1px solid #9da3ab;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                cursor: grab;
                touch-action: none;
                user-select: none;
                z-index: 10;
                will-change: transform;
            }

            .virtual-lab-metal-cube:active {
                cursor: grabbing;
            }

            .virtual-lab-beaker-wrap {
                position: relative;
                width: 168px;
                height: 236px;
                --vlab-x: 0px;
                --vlab-y: 0px;
                --vlab-rot: 0deg;
                transform: translate3d(var(--vlab-x), var(--vlab-y), 0) rotate(var(--vlab-rot));
                transform-origin: 50% 50%;
                cursor: grab;
                touch-action: none;
                user-select: none;
                will-change: transform;
                transition: transform 180ms ease;
                z-index: 3;
            }

            .virtual-lab-beaker-wrap.dragging {
                cursor: grabbing;
                transition: none;
            }

            .virtual-lab-beaker {
                position: relative;
                width: 100%;
                height: 100%;
            }

            .virtual-lab-beaker-body {
                position: absolute;
                left: 18px;
                right: 18px;
                top: 20px;
                bottom: 10px;
                border-radius: 0 0 30px 30px;
                border-left: 3px solid rgba(212, 220, 232, 0.95);
                border-right: 3px solid rgba(212, 220, 232, 0.95);
                border-bottom: 3px solid rgba(212, 220, 232, 0.95);
                background: transparent;
            }

            .virtual-lab-fluid-mask {
                position: absolute;
                left: 0;
                right: 0;
                top: -200px;
                bottom: 0;
                overflow: hidden;
                border-radius: 0 0 27px 27px;
                pointer-events: none;
            }

            .virtual-lab-fluid-layer {
                position: absolute;
                inset: 0;
                filter: url(#virtual-lab-goo-filter);
                pointer-events: none;
            }

            .virtual-lab-particle {
                position: absolute;
                border-radius: 999px;
                background: #4da6ff;
                box-shadow: none;
                will-change: transform;
            }

            .virtual-lab-scale {
                position: absolute;
                right: 14px;
                top: 28px;
                bottom: 18px;
                width: 14px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-end;
                pointer-events: none;
                opacity: 0.72;
            }

            .virtual-lab-scale span {
                display: block;
                height: 1.5px;
                border-radius: 999px;
                background: rgba(200, 210, 224, 0.92);
            }

            .virtual-lab-scale span:nth-child(5n + 1) {
                width: 12px;
            }

            .virtual-lab-scale span:nth-child(5n + 2),
            .virtual-lab-scale span:nth-child(5n + 5) {
                width: 7px;
            }

            .virtual-lab-scale span:nth-child(5n + 3),
            .virtual-lab-scale span:nth-child(5n + 4) {
                width: 9px;
            }

            @keyframes vlab-badge-in {
                from { opacity: 0; transform: translateY(6px) translateX(-50%) scale(0.95); }
                to { opacity: 1; transform: translateY(0) translateX(-50%) scale(1); }
            }

            .virtual-lab-controls {
                position: absolute;
                bottom: 8px; /* Slightly up from the very edge */
                left: 0;
                right: 0;
                height: 48px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 12px;
                z-index: 50;
                pointer-events: none; /* Let clicks pass through to particles, but child buttons need it back */
            }

            .virtual-lab-controls .virtual-lab-btn {
                pointer-events: auto;
            }

            .virtual-lab-btn {
                appearance: none;
                border: 2px solid transparent;
                padding: 10px 24px;
                border-radius: 14px;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                font-family: inherit;
                letter-spacing: -0.01em;
            }

            .virtual-lab-btn.primary {
                background: rgba(30, 41, 59, 0.88);
                color: white;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.12),
                    0 8px 24px rgba(0, 0, 0, 0.16),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }

            .virtual-lab-btn.primary:hover {
                transform: translateY(-1px);
                background: rgba(30, 41, 59, 0.95);
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.15),
                    0 12px 32px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.15);
            }

            .virtual-lab-btn.primary:active {
                transform: translateY(0);
                box-shadow: 0 1px 4px rgba(0,0,0,0.12);
            }

            .virtual-lab-btn.secondary {
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                color: #475569;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 4px 16px rgba(0, 0, 0, 0.06),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
            }

            .virtual-lab-btn.secondary:hover {
                background: rgba(255, 255, 255, 0.85);
                color: #334155;
                box-shadow:
                    0 4px 12px rgba(0, 0, 0, 0.06),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
            }

            .virtual-lab-element-picker {
                position: absolute;
                z-index: 100;
                min-width: 160px;
                max-height: 320px;
                overflow-y: auto;
                background: linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(248,248,250,0.95) 100%);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border-radius: 14px;
                border: 1px solid rgba(0,0,0,0.08);
                box-shadow: 0 14px 38px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08);
                padding: 6px;
                display: none;
                flex-direction: column;
                gap: 2px;
            }

            .virtual-lab-element-picker.open {
                display: flex;
                animation: vlab-picker-in 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            }

            @keyframes vlab-picker-in {
                from { opacity: 0; transform: translateY(-6px) scale(0.97); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }

            .virtual-lab-picker-group {
                padding: 6px 10px 4px;
                font-size: 10px;
                font-weight: 700;
                color: #86868b;
                text-transform: uppercase;
                letter-spacing: 0.06em;
            }

            .virtual-lab-picker-item {
                display: flex;
                align-items: center;
                gap: 10px;
                width: 100%;
                padding: 8px 10px;
                border: none;
                border-radius: 9px;
                background: none;
                text-align: left;
                font-size: 13px;
                font-weight: 550;
                color: #2f3136;
                cursor: pointer;
                transition: background 0.15s ease;
                font-family: inherit;
            }

            .virtual-lab-picker-item:hover {
                background: rgba(0,0,0,0.055);
            }

            .virtual-lab-picker-item.active {
                background: rgba(0,0,0,0.09);
                font-weight: 650;
            }

            .virtual-lab-picker-sym {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                border-radius: 7px;
                font-size: 13px;
                font-weight: 700;
                flex-shrink: 0;
                color: white;
            }

            .virtual-lab-element-picker::-webkit-scrollbar {
                display: none;
            }

            .virtual-lab-thermometer {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                min-width: 48px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                padding: 12px 10px;
                border-radius: 14px;
                background: rgba(255, 255, 255, 0.72);
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: none;
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
                pointer-events: none;
                z-index: 15;
            }
            .virtual-lab-thermo-track {
                position: relative;
                width: 8px;
                height: 100px;
                background: rgba(200, 210, 224, 0.4);
                border-radius: 999px;
                overflow: hidden;
            }
            .virtual-lab-thermo-fill {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 12%;
                background: linear-gradient(180deg, #5cb3ff 0%, #2b7de9 100%);
                border-radius: 999px;
                transition: height 0.6s ease;
            }
            .virtual-lab-thermo-temp {
                font-size: 11px;
                font-weight: 700;
                color: #555;
                letter-spacing: -0.02em;
                text-align: center;
                line-height: 1;
            }
            .virtual-lab-thermo-label {
                font-size: 8px;
                font-weight: 600;
                color: #86868b;
                letter-spacing: 0.03em;
                text-transform: uppercase;
            }

            /* ===== Reaction Bubbles ===== */
            .virtual-lab-bubble {
                position: absolute;
                border-radius: 999px;
                background: rgba(255, 255, 255, 0.55);
                border: 1px solid rgba(255, 255, 255, 0.35);
                pointer-events: none;
                will-change: transform, opacity;
                z-index: 9;
            }

            /* ===== Reaction Sparks ===== */
            .virtual-lab-spark {
                position: absolute;
                border-radius: 999px;
                pointer-events: none;
                will-change: transform, opacity;
                z-index: 11;
            }
            @keyframes vlab-spark-pop {
                0% { transform: scale(0); opacity: 1; }
                50% { transform: scale(1.2); opacity: 0.9; }
                100% { transform: scale(0.3); opacity: 0; }
            }

            /* ===== Reaction Info Badge ===== */
            .virtual-lab-reaction-info {
                display: none;
                position: absolute;
                top: 24px;
                left: 50%;
                transform: translateX(-50%);
                width: max-content;
                z-index: 20;
                align-items: center;
                justify-content: center;
                gap: 12px;
                padding: 14px 22px;
                border-radius: 14px;
                background: rgba(236, 253, 245, 0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(167, 243, 208, 0.6);
                box-shadow:
                    0 2px 8px rgba(0, 0, 0, 0.04),
                    0 8px 24px rgba(0, 0, 0, 0.08),
                    inset 0 1px 0 rgba(255, 255, 255, 0.8);
                font-size: 16px;
                font-family: inherit;
                font-weight: 600;
                color: #047857;
                letter-spacing: 0.01em;
                animation: vlab-badge-in 0.3s ease;
            }
            .virtual-lab-reaction-info.active {
                display: flex;
            }
            @keyframes vlab-badge-in {
                from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.96); }
                to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
            }
            .virtual-lab-reaction-eq {
                color: #047857;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
                font-weight: 700;
            }

            @media (max-width: 980px) {
                .virtual-lab-stage {
                    min-height: 460px;
                }

                .virtual-lab-beaker-wrap {
                    width: 150px;
                    height: 210px;
                }
            }
        </style>

        <div class="tool-padding-label">${t("tools.virtualLabName", "Virtual Lab")}</div>
        <svg class="virtual-lab-goo-defs" aria-hidden="true" focusable="false">
            <defs>
                <filter id="virtual-lab-goo-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur"></feGaussianBlur>
                    <feColorMatrix in="blur" mode="matrix"
                        values="1 0 0 0 0
                                0 1 0 0 0
                                0 0 1 0 0
                                0 0 0 14 -6"
                        result="goo"></feColorMatrix>
                    <feBlend in="SourceGraphic" in2="goo"></feBlend>
                </filter>
            </defs>
        </svg>
        <div class="virtual-lab-shell">
            <div class="virtual-lab-stage">
                <div class="virtual-lab-scene" id="virtual-lab-scene">
                    <div class="virtual-lab-particle-layer" id="virtual-lab-particle-layer" aria-hidden="true"></div>
                    <div class="virtual-lab-wooden-stand" id="virtual-lab-wooden-stand"></div>
                    <div class="virtual-lab-metal-cube" id="virtual-lab-metal-cube"></div>
                    <div class="virtual-lab-beaker-wrap" id="virtual-lab-beaker-wrap" aria-label="${t("virtualLab.beakerAria", "Beaker")}">
                        <div class="virtual-lab-beaker">
                            <div class="virtual-lab-beaker-body" id="virtual-lab-beaker-body">
                                <div class="virtual-lab-fluid-mask" aria-hidden="true">
                                    <div class="virtual-lab-fluid-layer" id="virtual-lab-fluid-layer"></div>
                                </div>
                                <div class="virtual-lab-scale" aria-hidden="true">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="virtual-lab-thermometer" id="virtual-lab-thermometer">
                        <div class="virtual-lab-thermo-track">
                            <div class="virtual-lab-thermo-fill" id="virtual-lab-thermo-fill"></div>
                        </div>
                        <div class="virtual-lab-thermo-temp" id="virtual-lab-thermo-temp">20°</div>
                        <div class="virtual-lab-thermo-label">TEMP</div>
                    </div>
                    <div class="virtual-lab-controls">
                        <button class="virtual-lab-btn primary" id="virtual-lab-add-water-btn" type="button">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-2px;margin-right:6px"><path d="M12 5v14M5 12h14"/></svg>${t("virtualLab.addWater", "Add Water")}
                        </button>
                        <button class="virtual-lab-btn secondary" id="virtual-lab-clear-water-btn" type="button" style="display:flex;align-items:center;gap:6px">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>${t("virtualLab.reset", "Reset")}
                        </button>
                        <button class="virtual-lab-btn secondary" id="virtual-lab-change-element-btn" type="button" style="display:flex;align-items:center;gap:6px">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>${t("virtualLab.element", "Element")}
                        </button>
                    </div>
                </div>
            </div>
            <div class="virtual-lab-reaction-info" id="virtual-lab-reaction-info"></div>
            <div class="virtual-lab-element-picker" id="virtual-lab-element-picker"></div>
        </div>
    `;
}


function generateEmpiricalToolContent() {
  return `
        <style>
            /* ===== Apple-Style Empirical Formula Calculator ===== */
            .emp-calc-wrapper {
                --glass-bg: rgba(255, 255, 255, 0.72);
                --glass-border: rgba(255, 255, 255, 0.6);
                --glass-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
                --text-primary: #1d1d1f;
                --text-secondary: #86868b;
                --text-tertiary: #aeaeb2;
                --accent-purple: #af52de;
                --accent-green: #30d158;
                --surface-elevated: rgba(255, 255, 255, 0.9);
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                display: flex;
                flex-direction: column;
                min-height: 100%;
                width: 100%;
                box-sizing: border-box;
            }

            .emp-grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 1fr;
                gap: 30px;
                flex: 1 0 auto;
                min-height: 0;
            }
            @media (max-width: 720px) {
                .emp-grid { grid-template-columns: 1fr; grid-template-rows: auto auto; height: auto; }
            }

            .emp-controls { display: flex; flex-direction: column; align-self: start; }

            .emp-glass-card {
                background: var(--glass-bg);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                padding: 16px;
                box-shadow: var(--glass-shadow);
            }

            .emp-section-label {
                font-size: 11px; font-weight: 600; color: var(--text-secondary);
                text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 10px;
            }

            .emp-input-stack { display: flex; flex-direction: column; gap: 6px; }

            .emp-input-row {
                display: flex; align-items: flex-start; gap: 8px;
                position: relative;
            }

            .emp-el-input {
                width: 42px; height: 42px; min-width: 42px;
                background: linear-gradient(145deg, #9ca3af, #d1d5db);
                border: 2px solid transparent; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                font-size: 15px; font-weight: 800; color: #fff;
                text-align: center; flex-shrink: 0;
                transition: all 0.2s ease;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
            }
            .emp-el-input:focus {
                outline: none; transform: scale(1.05);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
            }
            .emp-el-input::placeholder { color: rgba(255,255,255,0.7); font-weight: 600; }
            .emp-el-input.has-value { background: linear-gradient(145deg, #6366f1, #8b5cf6); }
            .emp-el-input.el-C { background: linear-gradient(145deg, #374151, #4b5563); }
            .emp-el-input.el-H { background: linear-gradient(145deg, #3b82f6, #60a5fa); }
            .emp-el-input.el-O { background: linear-gradient(145deg, #ef4444, #f87171); }
            .emp-el-input.el-N { background: linear-gradient(145deg, #8b5cf6, #a78bfa); }
            .emp-el-input.el-S { background: linear-gradient(145deg, #eab308, #facc15); color: #1a1a1a; }
            .emp-el-input.el-P { background: linear-gradient(145deg, #f97316, #fb923c); }
            .emp-el-input.el-Cl { background: linear-gradient(145deg, #10b981, #34d399); }
            .emp-el-input.el-Na { background: linear-gradient(145deg, #6366f1, #818cf8); }
            .emp-el-input.el-K { background: linear-gradient(145deg, #ec4899, #f472b6); }
            .emp-el-input.el-Ca { background: linear-gradient(145deg, #84cc16, #a3e635); }
            .emp-el-input.el-Fe { background: linear-gradient(145deg, #b45309, #d97706); }
            .emp-el-input.el-Mg { background: linear-gradient(145deg, #14b8a6, #2dd4bf); }
            .emp-el-input.emp-invalid { border-color: #ef4444 !important; }

            .emp-value-col {
                flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0;
            }

            .emp-value-wrapper {
                flex: 1; position: relative; display: flex; align-items: center; min-width: 0;
            }

            .emp-input-field {
                width: 100%; height: 42px;
                background: rgba(255,255,255,0.9);
                border: 1.5px solid rgba(0,0,0,0.08); border-radius: 10px;
                padding: 0 26px 0 12px;
                font-size: 15px; font-weight: 600; color: var(--text-primary);
                transition: all 0.2s ease; font-variant-numeric: tabular-nums;
            }
            .emp-input-field:focus {
                outline: none; border-color: var(--accent-purple);
                box-shadow: 0 0 0 3px rgba(175, 82, 222, 0.15); background: #fff;
            }
            .emp-input-field::placeholder { color: var(--text-tertiary); font-weight: 400; }
            .emp-input-field.emp-invalid { border-color: #ef4444 !important; }

            .emp-unit {
                position: absolute; right: 10px;
                font-size: 13px; font-weight: 600; color: var(--text-tertiary);
                pointer-events: none;
            }

            /* Inline row error */
            .emp-row-error {
                font-size: 11px; font-weight: 500; color: #ef4444;
                min-height: 14px; line-height: 14px;
                padding-left: 2px;
                opacity: 0; transition: opacity 0.15s ease;
            }
            .emp-row-error.visible { opacity: 1; }

            /* Global error banner */
            .emp-global-error {
                display: none; align-items: center; gap: 8px;
                margin-top: 8px; padding: 10px 14px;
                background: rgba(239, 68, 68, 0.08);
                border: 1px solid rgba(239, 68, 68, 0.2);
                border-radius: 10px;
                font-size: 12px; font-weight: 600; color: #dc2626;
                line-height: 1.4;
            }
            .emp-global-error.visible { display: flex; }
            .emp-global-error svg { flex-shrink: 0; width: 16px; height: 16px; }

            .emp-divider {
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);
                margin: 10px 0;
            }

            .emp-mol-mass-label {
                display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
            }
            .emp-mol-mass-label span {
                font-size: 11px; font-weight: 600; color: var(--text-secondary);
                text-transform: uppercase; letter-spacing: 0.06em;
            }
            .emp-optional-pill {
                font-size: 9px; font-weight: 600; padding: 2px 6px;
                background: rgba(0,0,0,0.04); color: var(--text-tertiary);
                border-radius: 4px; text-transform: uppercase;
            }
            .emp-mol-input {
                width: 100%; height: 42px;
                background: rgba(255,255,255,0.9);
                border: 1.5px solid rgba(0,0,0,0.08); border-radius: 10px;
                padding: 0 12px; font-size: 15px; font-weight: 600;
                color: var(--text-primary); transition: all 0.2s ease;
            }
            .emp-mol-input:focus {
                outline: none; border-color: var(--accent-purple);
                box-shadow: 0 0 0 3px rgba(175, 82, 222, 0.15); background: #fff;
            }

            .emp-calc-btn {
                width: 100%; height: 44px; margin-top: 6px;
                background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%);
                color: #fff; border: none; border-radius: 12px;
                font-size: 14px; font-weight: 600; cursor: pointer;
                display: flex; align-items: center; justify-content: center; gap: 8px;
                transition: all 0.2s ease;
                box-shadow: 0 4px 14px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2);
            }
            .emp-calc-btn:hover:not(:disabled) {
                transform: translateY(-1px);
                box-shadow: 0 6px 18px rgba(139, 92, 246, 0.5), inset 0 1px 0 rgba(255,255,255,0.2);
            }
            .emp-calc-btn:active:not(:disabled) {
                transform: translateY(0);
                box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
            }
            .emp-calc-btn:disabled {
                opacity: 0.45; cursor: not-allowed; transform: none;
            }
            .emp-calc-btn svg { width: 16px; height: 16px; }

            .emp-quick-actions { display: flex; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 6px; }

            .emp-icon-btn {
                width: 32px; height: 32px; border-radius: 50%; border: none;
                cursor: pointer; display: flex; align-items: center; justify-content: center;
                transition: all 0.2s ease;
            }
            .emp-icon-btn svg { width: 14px; height: 14px; }
            .emp-icon-btn.add { background: rgba(139, 92, 246, 0.1); color: var(--accent-purple); }
            .emp-icon-btn.add:hover { background: rgba(139, 92, 246, 0.2); transform: scale(1.1); }
            .emp-icon-btn.add:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
            .emp-icon-btn.remove { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
            .emp-icon-btn.remove:hover { background: rgba(239, 68, 68, 0.2); transform: scale(1.1); }
            .emp-icon-btn.remove:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
            .emp-icon-btn.reset { background: rgba(0,0,0,0.04); color: var(--text-tertiary); }
            .emp-icon-btn.reset:hover { background: rgba(0,0,0,0.08); transform: scale(1.1); }
            .emp-icon-btn.random { background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%); color: #16a34a; box-shadow: 0 2px 6px rgba(34, 197, 94, 0.15); }
            .emp-icon-btn.random:hover { transform: scale(1.1) rotate(15deg); box-shadow: 0 3px 10px rgba(34, 197, 94, 0.25); }

            /* Row status indicator */
            .emp-row-status {
                width: 20px; height: 42px; display: flex; align-items: center; justify-content: center;
                font-size: 14px; flex-shrink: 0; opacity: 0; transition: opacity 0.15s ease;
            }
            .emp-row-status.visible { opacity: 1; }

            /* ===== Right: Results ===== */
            .emp-results { display: flex; flex-direction: column; height: 100%; }

            .emp-results-glass {
                background: var(--glass-bg);
                backdrop-filter: blur(24px) saturate(180%);
                -webkit-backdrop-filter: blur(24px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 18px;
                padding: 24px;
                box-shadow: var(--glass-shadow);
                display: flex; flex-direction: column; align-items: center;
                justify-content: center; text-align: center;
                flex: 1; overflow: hidden;
            }

            .emp-result-display.visible .emp-atom-chip {
                animation: atomPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                opacity: 0;
            }
            .emp-result-display.visible .emp-atom-chip:nth-child(1) { animation-delay: 0.1s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(2) { animation-delay: 0.2s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(3) { animation-delay: 0.3s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(4) { animation-delay: 0.4s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(5) { animation-delay: 0.5s; }
            .emp-result-display.visible .emp-atom-chip:nth-child(6) { animation-delay: 0.6s; }

            @keyframes atomPop {
                0% { opacity: 0; transform: scale(0) rotate(-20deg); }
                70% { transform: scale(1.15) rotate(5deg); }
                100% { opacity: 1; transform: scale(1) rotate(0); }
            }
            .emp-result-display.visible .emp-hero-formula {
                animation: heroReveal 0.5s ease forwards;
            }
            @keyframes heroReveal {
                0% { opacity: 0; transform: translateY(10px) scale(0.9); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }

            .emp-empty-state { display: flex; flex-direction: column; align-items: center; padding: 20px; }

            .emp-floating-atoms { position: relative; width: 150px; height: 90px; margin-bottom: 24px; }
            .emp-atom {
                position: absolute; width: 40px; height: 40px; border-radius: 10px;
                display: flex; align-items: center; justify-content: center;
                font-weight: 700; font-size: 15px; color: #fff;
                box-shadow: 0 4px 14px rgba(0,0,0,0.18);
                animation: atomFloat 3.5s ease-in-out infinite;
            }
            .emp-atom.a1 { background: linear-gradient(145deg, #374151, #4b5563); left: 0; top: 16px; animation-delay: 0s; }
            .emp-atom.a2 { background: linear-gradient(145deg, #3b82f6, #60a5fa); left: 55px; top: 0; animation-delay: 0.25s; }
            .emp-atom.a3 { background: linear-gradient(145deg, #ef4444, #f87171); left: 110px; top: 20px; animation-delay: 0.5s; }
            .emp-atom.a4 { background: linear-gradient(145deg, #22c55e, #4ade80); left: 55px; top: 48px; animation-delay: 0.75s; }
            @keyframes atomFloat { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-5px) scale(1.02); } }

            .emp-empty-text { color: var(--text-tertiary); font-size: 14px; font-weight: 500; line-height: 1.5; }

            .emp-result-display {
                display: none; flex-direction: column; align-items: center; width: 100%; gap: 20px;
            }
            .emp-result-display.visible { display: flex; }

            .emp-empirical-result { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            .emp-result-subtitle {
                font-size: 10px; font-weight: 600; color: var(--text-tertiary);
                text-transform: uppercase; letter-spacing: 0.08em;
            }
            .emp-empirical-pill {
                display: inline-flex; align-items: center; height: 28px; padding: 0 14px;
                background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);
                border: 1px solid #ddd6fe; border-radius: 14px;
                font-size: 15px; font-weight: 700; color: #7c3aed;
                font-family: 'SF Mono', 'Monaco', 'Consolas', monospace; letter-spacing: 0.01em;
            }

            .emp-molecular-result { display: flex; flex-direction: column; align-items: center; gap: 8px; }
            .emp-hero-formula {
                font-size: 3.2rem; font-weight: 800; color: var(--text-primary);
                letter-spacing: -0.03em; line-height: 1.1;
            }
            .emp-hero-formula sub {
                font-size: 0.55em; vertical-align: baseline; position: relative;
                top: 0.25em; font-weight: 700; color: var(--accent-purple);
            }
            .emp-hero-mass { font-size: 13px; font-weight: 500; color: var(--text-secondary); }

            /* Mol mass warning */
            .emp-molmass-warning {
                display: none; font-size: 12px; font-weight: 500; color: #d97706;
                background: rgba(217, 119, 6, 0.08); border: 1px solid rgba(217, 119, 6, 0.18);
                border-radius: 10px; padding: 8px 14px; text-align: center;
                line-height: 1.4; max-width: 360px;
            }
            .emp-molmass-warning.visible { display: block; }

            /* Normalised banner */
            .emp-normalised-tag {
                display: none; font-size: 11px; font-weight: 600; color: #6366f1;
                background: rgba(99, 102, 241, 0.08); border-radius: 8px;
                padding: 4px 12px;
            }
            .emp-normalised-tag.visible { display: inline-block; }

            .emp-atoms-visual {
                display: flex; justify-content: center; flex-wrap: wrap; gap: 10px;
                margin-top: 8px; padding: 14px 20px;
                background: rgba(0,0,0,0.02); border-radius: 14px;
            }
            .emp-atom-chip { display: flex; flex-direction: column; align-items: center; gap: 4px; }
            .emp-atom-circle {
                width: 44px; height: 44px; border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                font-size: 17px; font-weight: 700; color: #fff;
                box-shadow: 0 3px 10px rgba(0,0,0,0.15);
            }
            .emp-atom-circle.el-C { background: linear-gradient(145deg, #374151, #4b5563); }
            .emp-atom-circle.el-H { background: linear-gradient(145deg, #3b82f6, #60a5fa); }
            .emp-atom-circle.el-O { background: linear-gradient(145deg, #ef4444, #f87171); }
            .emp-atom-circle.el-N { background: linear-gradient(145deg, #8b5cf6, #a78bfa); }
            .emp-atom-circle.el-S { background: linear-gradient(145deg, #eab308, #facc15); color: #1a1a1a; }
            .emp-atom-circle.el-P { background: linear-gradient(145deg, #f97316, #fb923c); }
            .emp-atom-circle.el-Cl { background: linear-gradient(145deg, #10b981, #34d399); }
            .emp-atom-circle.el-Br { background: linear-gradient(145deg, #a3231f, #dc2626); }
            .emp-atom-circle.el-F { background: linear-gradient(145deg, #06b6d4, #22d3ee); }
            .emp-atom-circle.el-I { background: linear-gradient(145deg, #7c3aed, #a855f7); }
            .emp-atom-circle.el-Fe { background: linear-gradient(145deg, #b45309, #d97706); }
            .emp-atom-circle.el-Cu { background: linear-gradient(145deg, #0891b2, #06b6d4); }
            .emp-atom-circle.el-Zn { background: linear-gradient(145deg, #64748b, #94a3b8); }
            .emp-atom-circle.el-Ca { background: linear-gradient(145deg, #84cc16, #a3e635); }
            .emp-atom-circle.el-Na { background: linear-gradient(145deg, #6366f1, #818cf8); }
            .emp-atom-circle.el-K { background: linear-gradient(145deg, #ec4899, #f472b6); }
            .emp-atom-circle.el-Mg { background: linear-gradient(145deg, #14b8a6, #2dd4bf); }
            .emp-atom-circle.el-default { background: linear-gradient(145deg, #6b7280, #9ca3af); }
            .emp-atom-count { font-size: 12px; font-weight: 600; color: var(--text-secondary); }

            .emp-steps-wrapper { margin-top: 12px; width: 100%; }
            .emp-steps-toggle {
                display: flex; align-items: center; justify-content: center; gap: 6px;
                width: 100%; padding: 10px 14px;
                background: rgba(139, 92, 246, 0.06);
                border: 1px solid rgba(139, 92, 246, 0.15); border-radius: 10px;
                font-size: 12px; font-weight: 600; color: var(--accent-purple);
                cursor: pointer; transition: all 0.15s ease;
            }
            .emp-steps-toggle:hover { background: rgba(139, 92, 246, 0.1); border-color: rgba(139, 92, 246, 0.25); }
            .emp-steps-toggle svg { width: 14px; height: 14px; transition: transform 0.2s ease; }
            .emp-steps-toggle.open svg { transform: rotate(180deg); }

            .emp-steps-bar { margin-top: 0; flex-shrink: 0; }
            .emp-steps-content {
                display: none; width: 100%; margin-top: 20px; margin-bottom: 60px;
                padding: 16px 40px;
                background: linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%);
                border: 1px solid rgba(139, 92, 246, 0.12); border-radius: 16px;
                text-align: left; font-size: 14px; color: var(--text-secondary); line-height: 1.75;
                box-sizing: border-box;
            }
            .emp-steps-content.visible { display: block; animation: stepsFade 0.3s ease; }
            @keyframes stepsFade { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .emp-steps-content h4 {
                font-size: 15px; font-weight: 700; color: var(--accent-purple);
                text-transform: uppercase; letter-spacing: 0.08em;
                margin: 0 0 20px 0; padding-bottom: 12px;
                border-bottom: 1px solid rgba(139, 92, 246, 0.1);
            }
            .emp-steps-content ol, .emp-steps-content ul { margin: 0 0 16px 0; padding-left: 20px; }
            .emp-steps-content > ol { margin-bottom: 0; }
            .emp-steps-content li { margin-bottom: 8px; font-size: 14px; }
            .emp-steps-content li ul { margin-top: 6px; margin-bottom: 12px; }
            .emp-steps-content li ul li { margin-bottom: 4px; font-size: 13px; color: var(--text-tertiary); }
            .emp-steps-content strong { color: var(--text-primary); font-weight: 600; }
            .emp-steps-content hr { border: none; height: 1px; background: rgba(139, 92, 246, 0.15); margin: 20px 0; }
            .emp-steps-content p { margin: 6px 0; font-size: 14px; }
            .emp-steps-content h4:not(:first-child) {
                margin-top: 24px; padding-top: 20px;
                border-top: 1px solid rgba(139, 92, 246, 0.1); border-bottom: none; padding-bottom: 0;
            }
        </style>

        <div class="tool-padding-label">${t("empirical.title")}</div>
        <div class="emp-calc-wrapper">
            <div class="emp-grid">
                <!-- Left: Controls -->
                <div class="emp-controls">
                    <div class="emp-glass-card">
                        <div class="emp-section-label">${t("empirical.elementComposition")}</div>

                        <div class="emp-input-stack" id="modal-element-inputs"></div>

                        <div class="emp-quick-actions">
                            <button class="emp-icon-btn remove" id="emp-remove-element-btn" title="${t("empirical.removeRowTitle")}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                            <button class="emp-icon-btn add" id="emp-add-element-btn" title="${t("empirical.addRowTitle")}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
                                    <line x1="12" y1="5" x2="12" y2="19"/>
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                            </button>
                            <button class="emp-icon-btn reset" id="emp-reset-btn" title="${t("empirical.resetFieldsTitle")}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 12a9 9 0 1 1 9 9 9.01 9.01 0 0 1-8.7-6.7"/>
                                    <path d="M3 3v6h6"/>
                                </svg>
                            </button>
                            <button class="emp-icon-btn random" id="emp-random-fill-btn" title="${t("empirical.randomFillTitle")}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12a9 9 0 11-9-9c2.52 0 4.85.83 6.72 2.24"/>
                                    <path d="M21 3v6h-6"/>
                                </svg>
                            </button>
                        </div>

                        <div class="emp-global-error" id="emp-global-error">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span id="emp-global-error-text"></span>
                        </div>

                        <div class="emp-divider"></div>

                        <div class="emp-mol-mass-label">
                            <span>${t("empirical.molecularMass")}</span>
                            <span class="emp-optional-pill">${t("common.optional")}</span>
                        </div>

                        <input type="text" inputmode="decimal" id="modal-mol-mass" class="emp-mol-input" placeholder="${t("empirical.molarMassPlaceholder")}">

                        <button id="modal-calc-formula-btn" class="emp-calc-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                                <line x1="12" y1="22.08" x2="12" y2="12"/>
                            </svg>
                            ${t("empirical.calculate")}
                        </button>

                        <input type="hidden" id="modal-formula-method" value="percent">
                    </div>
                </div>

                <!-- Right: Results -->
                <div class="emp-results">
                    <div class="emp-results-glass" id="lego-stage">
                        <div class="emp-empty-state" id="lego-empty">
                            <div class="emp-floating-atoms">
                                <div class="emp-atom a1">C</div>
                                <div class="emp-atom a2">H</div>
                                <div class="emp-atom a3">O</div>
                                <div class="emp-atom a4">N</div>
                            </div>
                            <p class="emp-empty-text">${t("empirical.enterPercent")}</p>
                        </div>

                        <div class="emp-result-display" id="lego-blocks-area">
                            <div class="emp-normalised-tag" id="emp-normalised-tag">Values normalised to 100 %</div>

                            <div class="emp-empirical-result">
                                <span class="emp-result-subtitle">${t("empirical.empiricalFormula")}</span>
                                <div class="emp-empirical-pill" id="empirical-formula-display"></div>
                            </div>

                            <div class="emp-molecular-result" id="molecular-result-card" style="display:none;">
                                <span class="emp-result-subtitle">${t("empirical.molecularFormula")}</span>
                                <div class="emp-hero-formula" id="molecular-formula-display"></div>
                                <span class="emp-hero-mass" id="result-mass-display"></span>
                            </div>

                            <div class="emp-molmass-warning" id="emp-molmass-warning"></div>

                            <div class="emp-atoms-visual" id="lego-blocks-visual"></div>

                            <div class="emp-steps-wrapper" style="display:none;">
                                <button class="emp-steps-toggle" id="calc-details-toggle">
                                    <span>${t("empirical.showSteps")}</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="emp-steps-bar" style="display:none;">
                <div class="emp-steps-content" id="calc-details-content"></div>
            </div>
        </div>

        <div id="empirical-tips" style="display:none;"></div>
        <div id="modal-formula-result" style="display:none;"></div>
        <div id="modal-formula-explanation" style="display:none;"></div>
    `;
}

function generateSolubilityToolContent() {
  return `
        <style>
            /* ===== Solubility Table - Apple Style Layout ===== */
            .sol-calc-wrapper {
                --glass-bg: rgba(255, 255, 255, 0.72);
                --glass-border: rgba(255, 255, 255, 0.6);
                --glass-shadow: 0 2px 8px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8);
                --text-primary: #1d1d1f;
                --text-secondary: #86868b;
                --accent-green: #10b981;

                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
                display: flex;
                flex-direction: column;
                flex: 1;
                width: 100%;
                min-height: 0;
            }

            /* ===== Two Column Grid ===== */
            .sol-grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 24px;
                margin: 0;
                flex: 1 1 auto;
                min-height: 0;
            }

            /* ===== Left Column: Input Controls ===== */
            .sol-controls {
                display: flex;
                flex-direction: column;
                gap: 16px;
                align-self: start;
            }

            .sol-glass-card {
                background: var(--glass-bg);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                padding: 20px;
                box-shadow: var(--glass-shadow);
            }

            .sol-section-label {
                font-size: clamp(10px, 1.6vh, 13px);
                font-weight: 600;
                color: var(--text-secondary);
                text-transform: uppercase;
                letter-spacing: 0.06em;
                margin-bottom: 12px;
            }

            .sol-input-stack {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .sol-input-field {
                width: 100%;
                height: 48px;
                padding: 0 16px;
                background: rgba(255, 255, 255, 0.9);
                border: 1.5px solid rgba(0, 0, 0, 0.08);
                border-radius: 12px;
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-size: 1.1rem;
                font-weight: 500;
                color: var(--text-primary);
                outline: none;
                transition: all 0.2s ease;
                box-sizing: border-box;
            }

            .sol-input-field:focus {
                border-color: var(--accent-green);
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
                background: #fff;
            }

            .sol-input-field::placeholder {
                color: #aeaeb2;
                font-weight: 400;
            }

            .sol-check-btn {
                width: 100%;
                height: 48px;
                background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
                border: none;
                border-radius: 12px;
                color: white;
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
            }

            .sol-check-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.45);
            }

            .sol-check-btn:active {
                transform: translateY(0);
            }

            /* Result Card */
            .sol-result-card {
                border-radius: 16px;
                padding: 20px;
                display: none;
                flex-direction: column;
                justify-content: center;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .sol-result-card.active {
                display: flex;
            }

            .sol-result-card.soluble {
                background: linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(16, 185, 129, 0.25) 100%);
                border: 1.5px solid rgba(52, 211, 153, 0.4);
            }

            .sol-result-card.insoluble {
                background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(220, 38, 38, 0.2) 100%);
                border: 1.5px solid rgba(248, 113, 113, 0.4);
            }

            .sol-result-card.unknown {
                background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.2) 100%);
                border: 1.5px solid rgba(251, 191, 36, 0.4);
            }

            .sol-result-title {
                font-size: clamp(1rem, 2.5vh, 1.4rem);
                font-weight: 700;
                margin-bottom: 4px;
            }

            .sol-result-card.soluble .sol-result-title { color: #047857; }
            .sol-result-card.insoluble .sol-result-title { color: #b91c1c; }
            .sol-result-card.unknown .sol-result-title { color: #b45309; }

            .sol-result-subtitle {
                font-size: clamp(0.78rem, 2vh, 1rem);
                opacity: 0.85;
            }

            .sol-result-card.soluble .sol-result-subtitle { color: #065f46; }
            .sol-result-card.insoluble .sol-result-subtitle { color: #991b1b; }
            .sol-result-card.unknown .sol-result-subtitle { color: #92400e; }

            /* Thinking state */
            .sol-thinking {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #6b7280;
                font-size: clamp(0.78rem, 2vh, 1rem);
            }

            .sol-thinking-dots {
                display: flex;
                gap: 4px;
            }

            .sol-thinking-dots span {
                width: 5px;
                height: 5px;
                background: #9ca3af;
                border-radius: 50%;
                animation: sol-bounce 1.4s ease-in-out infinite;
            }

            .sol-thinking-dots span:nth-child(2) { animation-delay: 0.2s; }
            .sol-thinking-dots span:nth-child(3) { animation-delay: 0.4s; }

            @keyframes sol-bounce {
                0%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-5px); }
            }

            /* ===== Right Column: Reference Table ===== */
            .sol-table-panel {
                background: var(--glass-bg);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border: 1px solid var(--glass-border);
                border-radius: 16px;
                padding: 24px;
                box-shadow: var(--glass-shadow);
                overflow: auto;
                display: flex;
                flex-direction: column;
                min-height: 0;
            }

            .sol-glass-table {
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
                font-size: clamp(0.85rem, 2.4vh, 1.1rem);
            }

            .sol-glass-table th {
                padding: clamp(8px, 2.2vh, 16px) 16px;
                text-align: left;
                font-weight: 600;
                color: #374151;
                font-size: clamp(0.7rem, 1.8vh, 0.9rem);
                text-transform: uppercase;
                letter-spacing: 0.5px;
                background: rgba(0, 0, 0, 0.02);
                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

            .sol-glass-table th:first-child { border-radius: 10px 0 0 0; }
            .sol-glass-table th:last-child { border-radius: 0 10px 0 0; }

            .sol-glass-table td {
                padding: clamp(8px, 2.2vh, 16px) 16px;
                color: #374151;
                border-bottom: 1px solid rgba(0, 0, 0, 0.04);
                vertical-align: middle;
            }

            .sol-glass-table tbody tr {
                transition: background 0.15s ease;
            }

            .sol-glass-table tbody tr:hover {
                background: rgba(0, 0, 0, 0.02);
            }

            .sol-glass-table tbody tr:last-child td {
                border-bottom: none;
            }

            .sol-anion-name {
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-weight: 600;
                color: #1a1a1a;
                font-size: clamp(0.9rem, 2.4vh, 1.15rem);
                display: inline;
                white-space: nowrap;
            }

            /* Ion formula with aligned sub/superscripts */
            .sol-ion {
                display: inline-flex;
                align-items: baseline;
            }

            .sol-ion-base {
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-weight: 600;
            }

            .sol-ion-scripts {
                display: inline-flex;
                flex-direction: column;
                align-items: flex-start;
                font-size: 0.7em;
                line-height: 1;
                vertical-align: middle;
                margin-left: 1px;
                transform: translateY(-8px);
            }

            .sol-ion-scripts .sup {
                transform: translateY(0px);
            }

            .sol-ion-scripts .sub {
                transform: translateY(0px);
            }

            /* Higher superscript for single-script ions */
            .sol-sup-high {
                vertical-align: super;
                font-size: 0.75em;
                position: relative;
                top: -0.4em;
            }

            .sol-anion-label {
                font-size: clamp(0.78rem, 2vh, 0.95rem);
                color: #6b7280;
                margin-left: 8px;
                font-weight: 400;
            }

            /* Pill badges */
            .sol-pill {
                display: inline-flex;
                align-items: center;
                padding: clamp(3px, 1vh, 6px) 12px;
                border-radius: 6px;
                font-size: clamp(0.7rem, 1.7vh, 0.85rem);
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.3px;
            }

            .sol-pill-soluble {
                background: rgba(52, 211, 153, 0.2);
                color: #047857;
            }

            .sol-pill-insoluble {
                background: rgba(248, 113, 113, 0.2);
                color: #b91c1c;
            }

            .sol-exception-text {
                font-size: clamp(0.85rem, 2.2vh, 1.05rem);
                color: #4b5563;
                line-height: 1.6;
            }

            .sol-exception-text .sol-pill {
                padding: clamp(2px, 0.6vh, 4px) 8px;
                font-size: clamp(0.65rem, 1.6vh, 0.78rem);
                margin-left: 6px;
                vertical-align: middle;
            }
        </style>

        <div class="tool-padding-label">${t("solubility.title")}</div>
        <div class="sol-calc-wrapper">

            <!-- Two Column Grid -->
            <div class="sol-grid">
                <!-- Left: Input Controls -->
                <div class="sol-controls">
                    <div class="sol-glass-card">
                        <div class="sol-section-label">${t("solubility.enterFormula")}</div>
                        <div class="sol-input-stack">
                            <input type="text" id="solubility-input" class="sol-input-field" placeholder="${t("solubility.inputPlaceholder")}" autocomplete="off">
                            <button id="check-solubility-btn" class="sol-check-btn">${t("solubility.checkBtn")}</button>
                        </div>
                    </div>

                    <div id="solubility-result" class="sol-result-card">
                        <div class="sol-result-title"></div>
                        <div class="sol-result-subtitle"></div>
                    </div>
                </div>

                <!-- Right: Reference Table -->
                <div class="sol-table-panel">
                    <table class="sol-glass-table">
                        <tbody>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">NO</span><span class="sol-ion-scripts"><span class="sup">−</span><span class="sub">3</span></span></span></span><span class="sol-anion-label">Nitrate</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">None — always soluble</td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">CH<sub>3</sub>COO<sup class="sol-sup-high">−</sup></span><span class="sol-anion-label">Acetate</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">None — always soluble</td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">Cl<sup class="sol-sup-high">−</sup>, Br<sup class="sol-sup-high">−</sup>, I<sup class="sol-sup-high">−</sup></span><span class="sol-anion-label">Halides</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">Ag<sup>+</sup>, Pb<sup>2+</sup>, <span class="sol-ion"><span class="sol-ion-base">Hg</span><span class="sol-ion-scripts"><span class="sup">2+</span><span class="sub">2</span></span></span> <span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">SO</span><span class="sol-ion-scripts"><span class="sup">2−</span><span class="sub">4</span></span></span></span><span class="sol-anion-label">Sulfate</span></td>
                                <td><span class="sol-pill sol-pill-soluble">Soluble</span></td>
                                <td class="sol-exception-text">Ba<sup>2+</sup>, Pb<sup>2+</sup>, Ca<sup>2+</sup>, Sr<sup>2+</sup> <span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">OH<sup class="sol-sup-high">−</sup></span><span class="sol-anion-label">Hydroxide</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</span><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Sol.</span> Ca<sup>2+</sup>, Ba<sup>2+</sup>, Sr<sup>2+</sup> slightly</td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">CO</span><span class="sol-ion-scripts"><span class="sup">2−</span><span class="sub">3</span></span></span></span><span class="sol-anion-label">Carbonate</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</sup><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Soluble</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name"><span class="sol-ion"><span class="sol-ion-base">PO</span><span class="sol-ion-scripts"><span class="sup">3−</span><span class="sub">4</span></span></span></span><span class="sol-anion-label">Phosphate</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</span><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Soluble</span></td>
                            </tr>
                            <tr>
                                <td><span class="sol-anion-name">S<sup class="sol-sup-high">2−</sup></span><span class="sol-anion-label">Sulfide</span></td>
                                <td><span class="sol-pill sol-pill-insoluble">Insol.</span></td>
                                <td class="sol-exception-text">Group 1, Group 2, <span class="sol-ion"><span class="sol-ion-base">NH</span><span class="sol-ion-scripts"><span class="sup">+</span><span class="sub">4</span></span></span> <span class="sol-pill sol-pill-soluble">Sol.</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
