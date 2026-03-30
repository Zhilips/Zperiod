const FEEDBACK_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1470782870527414455/0c9YPJ-nWeAQ3FDyO7xou9TivkdrPWGmtISAS4MRyY9RKldhtsqekHfbPuhuYIMyVduU";

export const SUCCESS_ICON_SVG =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

export async function submitSuggestion(text, options = {}) {
  const trimmed = text?.trim();
  if (!trimmed) return false;

  const { source = "Zperiod" } = options;
  const sourceLabel = source ? ` from ${source}` : "";

  try {
    await fetch(FEEDBACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `📬 **New Suggestion${sourceLabel}**\n> ${trimmed}\n\n_Sent at ${new Date().toLocaleString()}_`,
      }),
    });
    return true;
  } catch {
    return false;
  }
}

export function flashSentState(button, options = {}) {
  if (!button) return;

  const {
    originalHTML = button.innerHTML,
    successHTML = SUCCESS_ICON_SVG,
    successClass = "sent",
    duration = 1000,
    onReset,
  } = options;

  button.innerHTML = successHTML;
  button.classList.add(successClass);

  window.setTimeout(() => {
    button.innerHTML = originalHTML;
    button.classList.remove(successClass);
    if (typeof onReset === "function") onReset();
  }, duration);
}
