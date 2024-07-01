function removeElements(whatToRemove) {
    const elementsToRemove = document.getElementsByClassName(whatToRemove);
    const elementsArray = Array.from(elementsToRemove);

    elementsArray.forEach(element => {
        element.remove();
    });
}

chrome.storage.sync.get('classSelector', function(data) {
    if(data.classSelector) {
        removeElements(data.classSelector)
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === 'removeElements') {
        removeElements(message.selector)
        chrome.storage.sync.set({ classSelector: message.selector });
        sendResponse({ status: 'elements removed' });

    }
})