chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "blockAItabs") {
        blockAItabs();
        sendResponse({ status: "Tabs blocked." });
    } else if (message.action === "unblockAItabs") {
        unblockAItabs();
        sendResponse({ status: "Tabs unblocked." });
    }
});

const myurls = [
    "chatgpt.com",
    "www.chatgpt.com",
    "claude.ai",
    "claude.ai/new",
    "https://gemini.google.com/app",
    "gemini.google.com/app",
    "gemini.google.com",
    "https://www.perplexity.ai/",
    "perplexity.ai"
];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        blockAItabs(tabId, tab.url);
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    if (tab.url) {
        blockAItabs(tab.id, tab.url);
    }
});

function blockAItabs(tabId, url) {
    if (!url) {
        return;
    }
    if (url.endsWith(".ai") || myurls.some((blockedUrl) => url.includes(blockedUrl))) {
        console.log('Blocking:', url);
        chrome.storage.local.set({ [tabId]: true }, () => {
            if (chrome.runtime.lastError) {
                console.error("Error saving to storage:", chrome.runtime.lastError);
            }
        });
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: injectErrorPage
        });
    }
}

async function unblockAItabs() {
    console.log('Unblocking AI tabs...');
    const tabs = await chrome.tabs.query({});
    for (const tab of tabs) {
        if (!tab.url) continue;

        if (tab.url.endsWith(".ai") || myurls.some((blockedUrl) => tab.url.includes(blockedUrl))) {
            chrome.tabs.reload(tab.id);  // Reload the tab to remove the injected page
            chrome.storage.local.remove(tab.id.toString(), () => {  // Make sure to remove correctly from storage
                if (chrome.runtime.lastError) {
                    console.error("Error removing from storage:", chrome.runtime.lastError);
                }
            });
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: resetPage
            });
        }
    }
}

function injectErrorPage() {
    document.body.innerHTML = `
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
            }
            h1 {
                font-size: 50px;
            }
            p {
                font-size: 20px;
            }
        </style>
        <h1>Access Blocked</h1>
        <p>This site has been restricted via the AI Blocker extension.</p>
    `;
}

function resetPage() {
    document.body.innerHTML = `
        <h1>Welcome back!</h1>
        <p>You can now access the content.</p>
    `;
    location.reload();
}
