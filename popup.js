document.getElementById('birthdayButton').addEventListener('click', scanFacebookBirtdayPage);

function scanFacebookBirtdayPage() {
    console.log("Scanning Facebook Birthday Page");

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        if (url.includes("facebook.com/events/birthdays")){
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['contentScript.js']
            });
        } else {
            chrome.tabs.create({url: "https://www.facebook.com/events/birthdays/"}, function(tab) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ['contentScript.js']
            });
            });
        }
    });
}