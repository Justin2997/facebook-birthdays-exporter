# Facebook Birthdays Exporter Installation Guide

## Introduction

Welcome to the installation guide for Facebook Birthdays Exporter. This document provides step-by-step instructions on how to install the app in debug mode on your Chrome browser. Debug mode enables developers and testers to load the app unpacked, allowing for real-time code changes and debugging.

## Prerequisites

Before proceeding with the installation, ensure you have the following:

- Google Chrome browser installed on your computer.
- The source code of Facebook Birthdays Exporter or the unpacked version of the app.

## Installation Steps

### Step 1: Open the Chrome Extensions Page

1. Open the Google Chrome browser.
2. Navigate to the Chrome extensions page by either:
   - Typing `chrome://extensions/` in the address bar and pressing Enter.
   - Clicking on the three dots in the upper-right corner of the browser, selecting "More tools," and then "Extensions."

### Step 2: Enable Developer Mode

1. On the top right of the extensions page, find the "Developer mode" toggle.
2. Click to enable Developer Mode. This allows you to load unpacked extensions.

### Step 3: Load Your Unpacked App

1. Click the "Load unpacked" button, which appears after enabling Developer Mode.
2. Navigate to the directory where your app's source code is located. This directory should contain the `manifest.json` file.
3. Select the folder and click "Open" to load your app.

## Post-Installation

After loading your app, you should see it listed among your other installed extensions. You can launch the app from here and begin testing in debug mode.

### Debugging the App

- To debug your app, find your app in the extensions list and click the "background page" link (if your app has a background script). This opens the Developer Tools, where you can view logs, set breakpoints, and inspect the app's background page.
- For popup or options pages, right-click the app icon in the browser toolbar and select "Inspect popup" to open Developer Tools for those pages.

## Troubleshooting

If you encounter issues while installing or running your app in debug mode, consider the following troubleshooting steps:

- Ensure that the `manifest.json` file is correctly configured and error-free.
- Check the console in the Developer Tools for any errors or warnings that may indicate what's wrong.
- Verify that you are using the latest version of the Google Chrome browser.

## Feedback

We welcome your feedback and suggestions to improve Facebook Birthdays Exporter.