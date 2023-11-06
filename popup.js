// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

document.getElementById('birthdayButton').addEventListener('click', scanFacebookBirtdayPage);
function scanFacebookBirtdayPage() {
    console.log("Scanning Facebook Birthday Page");

    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;

        console.log(tabs[0]);

        if (url.includes("facebook.com/events/birthdays")){
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['contentScript.js']
            });
        } else {
            chrome.tabs.create({url: "https://www.facebook.com/events/birthdays/"});
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['contentScript.js']
            });
        }
    });
}

