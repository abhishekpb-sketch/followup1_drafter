chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes("mail.google.com")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});
