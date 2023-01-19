console.log('background running');

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        text: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}
