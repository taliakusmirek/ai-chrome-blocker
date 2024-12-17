# AI Blocker Chrome Extension

The **AI Blocker** Chrome extension allows you to block or unblock access to specific AI websites. It detects when you're visiting restricted AI websites and prevents access by injecting a custom "blocked" page. You can also unblock these websites using the extension's interface.

## Features

- Block access to specific AI websites (like ChatGPT, Claude, Gemini, and more).
- Custom "Access Blocked" page is shown when a restricted website is visited.
- Unblock websites and reset the page with a simple click.
- Works on both new and existing tabs.

## Supported Websites

The extension blocks the following AI-related websites by default:
- **chatgpt.com**
- **claude.ai**
- **gemini.google.com**
- **perplexity.ai**

You can easily modify the list by adding or removing websites in the `myurls` array.

## Installation

### Step 1: Download the extension code
Clone or download the source code from this repository.

```bash
git clone <repository_url>
```

### Step 2: Load the extension into Chrome
1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (toggle switch in the top right).
3. Click **Load unpacked** and select the directory where you saved the extension files.
4. The extension should now appear in your list of extensions.

### Step 3: Use the Extension
- Click the extension icon to open the popup.
- Use the **Block** button to start blocking AI websites.
- When blocked, the button will change to **Unblock**.
- Click **Unblock** to restore access to previously blocked websites.

## How It Works

The extension uses the `chrome.tabs` API to monitor tab creation and updates. If a tab’s URL matches one of the AI-related URLs (either through exact matching or partial matching), the extension will block access to the website by:
- Injecting a custom "Access Blocked" page using `chrome.scripting.executeScript`.
- Storing the blocked tab’s ID in `chrome.storage.local` to remember blocked sites.

When unblocking, the extension:
- Reloads all tabs that were blocked.
- Resets the page content to its original state.
- Removes the tab ID from storage.

## Code Overview

- **`background.js`**: Manages the core functionality, such as blocking and unblocking tabs, interacting with the Chrome APIs (tabs, storage, scripting), and handling messages between the popup and the background script.
- **`popup.html`**: The interface displayed when you click the extension icon. It contains a button to block or unblock AI sites.
- **`popup.js`**: Handles the button click events and communicates with the background script to block/unblock AI websites.

## Development

To modify the extension or add new features:
1. Clone the repository.
2. Make changes to the JavaScript files.
3. Test your changes by reloading the extension in `chrome://extensions/`.

### Suggested Improvements
- Add a customizable list of blocked websites through the popup.
- Include more advanced blocking options (e.g., blocking based on content type, user-defined categories).
- Provide user feedback on which sites are currently blocked.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
