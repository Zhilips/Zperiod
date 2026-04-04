const fs = require('fs');
let content = fs.readFileSync('js/modules/chemistryTools.js', 'utf8');

// The prefix and suffix for wrappers
const oldPrefix = '<div style="display:flex; flex-direction:column; gap:2px; text-align:left;">';
const newPrefix = '<span>';
const oldSuffix = '</div></div>';
const newSuffix = '</span>';

// Perform replacements
content = content.split(oldPrefix).join(newPrefix);
content = content.replace(/<\/div><\/div>/g, newSuffix);
// wait, the old format had `<div>Message</div></div>` so the full inner replacement was `<strong>...</strong><div>...</div></div>`
// Let's just adjust it by doing a regex replacement to convert `<div>Message</div>` to `Message`.
content = content.replace(/<strong>(.*?)<\/strong><div>(.*?)<\/div><\/span>/g, '<strong>$1:</strong> $2</span>');

// Also update the specific "Check the formula" dynamic text.
const replacementBlock = `
    // Distinguish Reactant vs Product for error messaging
    const isReactant = i < reactantsInfo.length;
    const specificTitle = isReactant 
       ? ct("balancer.checkReactantTitle", "Check the reactant formula")
       : ct("balancer.checkProductTitle", "Check the product formula");

    const compact = f.replace(/\\s+/g, "");

    // Heuristic B: O / 0 CONFUSION (Check BEFORE space parsing to catch Fe 203 correctly)
    if (/0/.test(compact)) {
      const replaced = compact.replace(/0/g, "O");
      if (replaced !== compact) {
        try {
          parseFormulaStrict(replaced);
          throw new Error(\`<span><strong>\${specificTitle}:</strong> \${ct("balancer.didYouMean", "Did you mean <code>{suggestion}</code>?", {suggestion: replaced})}</span>\`);
        } catch(e) {
          if (e.message.includes("mean <code>") || e.message.includes("你想写")) throw e;
          // If it fails to parse, just fall through to Heuristic A
        }
      }
    }

    // Heuristic A: SPACE (e.g. "H2 O" -> "H2O")
    if (/\\s/.test(f)) {
      try {
        parseFormulaStrict(compact);
        throw new Error(\`<span><strong>\${specificTitle}:</strong> \${ct("balancer.didYouMean", "Did you mean <code>{suggestion}</code>?", {suggestion: compact})}</span>\`);
      } catch (e) {
        if (e.message.includes("mean <code>") || e.message.includes("你想写")) throw e;
        throw new Error(\`<span><strong>\${ct("balancer.checkFormulaFormatTitle", "Check the formula formatting")}:</strong> \${ct("balancer.removeSpacesInside", "Remove spaces inside the chemical formula.")}</span>\`);
      }
    }

    // Heuristic C: HYDRATE FORMAT VALIDATION
    if (f.includes("•")) {
      if (/•\\s*•/.test(f) || /^•/.test(f) || /•$/.test(f)) {
        throw new Error(\`<span><strong class="balancer-error">\${ct("balancer.invalidHydrate", "Invalid hydrate notation")}</strong></span>\`);
      }
    }

    // Formula Validation
    try {
      const atomCounts = parseFormulaStrict(f);
      demoChemistryValidator(f, atomCounts);
    } catch(e) {
      if (!e.message.includes("mean <code>") && !e.message.includes("你想写") && !e.message.includes("移除") && !e.message.includes("Remove") && !e.message.includes("Invalid hydrate") && !e.message.includes("looks unusual") && !e.message.includes("异常") && !e.message.includes("<span")) {
         throw new Error(\`<span><strong>\${specificTitle}:</strong> \${e.message}</span>\`);
      }
      throw e; 
    }
`;

// Replace heuristics
const startFlag = '    const compact = f.replace(/\\s+/g, "");';
const endFlag = '    if (i < reactantsInfo.length) strippedReactants.push(f);';
const startIdx = content.indexOf(startFlag);
const endIdx = content.indexOf(endFlag);
if (startIdx !== -1 && endIdx !== -1) {
    content = content.substring(0, startIdx) + replacementBlock.trim() + '\n\n' + content.substring(endIdx).replace('if (i < reactantsInfo.length)', 'if (isReactant)');
}

fs.writeFileSync('js/modules/chemistryTools.js', content, 'utf8');
console.log('Update finished.');
