document.getElementById('elementForm').addEventListener('submit', (event) => {
    const selector = document.getElementById('classToRemove');
    if(selector.checked) {
        const classText = document.getElementById('classSelector').value;
        chrome.storage.sync.set({
            classSelector: classText
        })
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'removeElements',
                selector: classText
            }, function(response) {
                console.log(response.status)
            })
        });
    }
})
