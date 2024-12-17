let isBlocked = false;

const blockBtn = document.getElementById('blockBtn');


chrome.storage.local.get('blocked', (data) => {
    if (data.blocked === true) {
        blockBtn.textContent = 'Unblock';
        isBlocked = true;
    }
    else {
        blockBtn.textContent = "Block";
        isBlocked = false;
    }
});

async function toggleButton() {
    if (!isBlocked) {
        chrome.runtime.sendMessage({action: "blockAItabs"}, (response) => {
            if (response && response.status === 'Tabs blocked.') {
                console.log('AI tabs blocked');
                chrome.storage.local.set({ 'blocked': true }, () => {
                    blockBtn.textContent = 'Unblock';
                    isBlocked = true;
                });
            }
        });       
    }
    else {
        chrome.runtime.sendMessage({action: "unblockAItabs"}, (response) => {
            if (response && response.status === 'Tabs unblocked.') {
                console.log('AI tabs unblocked');
                chrome.storage.local.set({ 'blocked': false }, () => {
                    blockBtn.textContent = 'Block';
                    isBlocked = false;
                });
            }
        });
    }
}
blockBtn.addEventListener("click", toggleButton);