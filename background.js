chrome.runtime.onInstalled.addListener(() => {
    // Set an alarm for weekly reminders
    chrome.alarms.create("weeklyReminder", { periodInMinutes: 10080 }); // 10080 minutes in a week
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "weeklyReminder") {
      // Send a notification when the alarm goes off
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Weekly Reminder",
        message: "Hey! Here's your weekly reminder to go scan your Facebook birthday page using the extension!"
      });s
    }
  });
  