chrome.runtime.onInstalled.addListener((reason) => {
    if (reason.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: 'https://vodextended.com/thank-you/?custom_text_title=Prime%20Party%20Extended'
        });
    }
    reloadTabs()
});

function reloadTabs() {
    chrome.tabs.query({url: "https://*.primevideo.com/*"}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id)
        })
    })
    chrome.tabs.query({url: "https://*.amazon.com/*"}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id)
        })
    })
    chrome.tabs.query({url: "https://*.amazon.co.uk/*"}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id)
        })
    })
    chrome.tabs.query({url: "https://*.amazon.de/*"}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id)
        })
    })
    chrome.tabs.query({url: "https://*.amazon.co.jp/*"}, function(tabs) {
        tabs.forEach(tab => {
            chrome.tabs.reload(tab.id)
        })
    })
}