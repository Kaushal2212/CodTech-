let activeTabId = null;
let startTime = null;

// Function to update time spent per domain
function updateTimeSpent(domain, duration) {
    chrome.storage.local.get(["timeSpent"], (result) => {
        let timeSpent = result.timeSpent || {};
        if (!timeSpent[domain]) timeSpent[domain] = 0;
        timeSpent[domain] += duration;

        chrome.storage.local.set({ timeSpent }, () => {
            console.log(`Updated time for ${domain}:`, timeSpent[domain]);
        });
    });
}

// Get domain from a URL
function extractDomain(url) {
    try {
        let hostname = new URL(url).hostname;
        return hostname.replace("www.", ""); // Remove 'www.'
    } catch (error) {
        return "unknown"; // Handle invalid URLs
    }
}

// Listen for tab changes
chrome.tabs.onActivated.addListener((activeInfo) => {
    if (activeTabId !== null && startTime !== null) {
        chrome.tabs.get(activeTabId, (tab) => {
            if (tab && tab.url) {
                let domain = extractDomain(tab.url);
                let duration = Date.now() - startTime;
                updateTimeSpent(domain, duration);
            }
        });
    }

    activeTabId = activeInfo.tabId;
    startTime = Date.now();
});

// Listen for website changes (page loads)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tabId === activeTabId && changeInfo.url) {
        if (startTime !== null) {
            let domain = extractDomain(changeInfo.url);
            let duration = Date.now() - startTime;
            updateTimeSpent(domain, duration);
        }
        startTime = Date.now();
    }
});

// Send stored data to popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTimeSpent") {
        chrome.storage.local.get(["timeSpent"], (result) => {
            console.log("Sending time spent data:", result.timeSpent);
            sendResponse({ data: result.timeSpent || {} });
        });
        return true; // Ensures async response
    }
});
