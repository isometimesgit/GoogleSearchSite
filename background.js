
chrome.browserAction.onClicked.addListener(async () => {
    try {
        const [currentTab] = await browser.tabs.query({ 'active': true, 'currentWindow': true });
        if (!currentTab) {
            return;
        }
        const url = new URL(currentTab.url);
        browser.tabs.create({ url: `https://www.google.com/search?q=site:${url.hostname}` });
    } catch (e) {
        console.log('failed', e)
    }
});
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.url == undefined || tab.url.match(/^https?/) == null) {
        browser.browserAction.disable();
    }
    else {
        browser.browserAction.enable();
    }
});
