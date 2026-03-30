import re

def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        if old not in content:
            print(f"Warning: {old} not found in {filepath}")
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

chem_interactions_replacements = [
    ('productsLabel.textContent = "Error";', 'productsLabel.textContent = t("predictor.error") || "Error";'),
    ('productsText.textContent = "Please select a reaction type.";', 'productsText.textContent = t("predictor.selectType") || "Please select a reaction type.";'),
    ('productsLabel.textContent = res.noReaction ? "No Reaction" : "Error";', 'productsLabel.textContent = res.noReaction ? (t("predictor.noReaction") || "No Reaction") : (t("predictor.error") || "Error");'),
    ('productsText.textContent = res.error || (res.noReaction ? "No products formed." : "Unknown error.");', 'productsText.textContent = res.error || (res.noReaction ? (t("predictor.noProducts") || "No products formed.") : (t("predictor.unknownError") || "Unknown error."));'),
    ('explanationText.textContent = res.explanation || "Please check your input and try again.";', 'explanationText.textContent = res.explanation || (t("predictor.checkInputAgain") || "Please check your input and try again.");'),
    ('productsLabel.textContent = "Predicted Products";', 'productsLabel.textContent = t("predictor.predictedProducts") || "Predicted Products";'),
    ('balancedLabel.textContent = "Balanced Equation";', 'balancedLabel.textContent = t("predictor.balancedEquation") || "Balanced Equation";'),
    ('balancedLabel.textContent = "Unbalanced Reaction";', 'balancedLabel.textContent = t("predictor.unbalancedReaction") || "Unbalanced Reaction";'),
    ('explanationText.textContent = res.explanation || "Reaction completed successfully.";', 'explanationText.textContent = res.explanation || (t("predictor.reactionCompleted") || "Reaction completed successfully.");')
]

reaction_predictor_replacements = [
    ('explanation: `Metal (${metal.symbol}) + nonmetal (${nonmetal.symbol}) combine to form an ionic compound.`', 'explanation: ct("predictor.reasonSynthesisBinary", `Metal (${metal.symbol}) + nonmetal (${nonmetal.symbol}) combine to form an ionic compound.`, { m: metal.symbol, nm: nonmetal.symbol })')
]

replace_in_file('js/modules/chemToolInteractions.js', chem_interactions_replacements)
replace_in_file('js/modules/reactionPredictor.js', reaction_predictor_replacements)

