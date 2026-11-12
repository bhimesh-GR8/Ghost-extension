# GHOST EXTENSION
A Halloween-themed Chrome extension that makes the web a little spookier. It turns YouTube thumbnails into scary images, sends ghosts drifting across every site, leaves a trail of embers behind your cursor, and occasionally jump-scares you when a page loads.

It was built on scratch with Manifest V3, plain javascript and without any dependancies

## features

| Feature | Where it works | What it does

|---|---|---|

| **Scary thumbnails** | YouTube (home, search, Shorts, " next") | I notice Scary thumbnails replace normal video pictures with random scary pictures. When I turn thumbnails off the original pictures return. |


| **Flicker & hover** | YouTube | I find Flicker & hover makes the swapped thumbnails glitch every seconds. When I hover over a thumbnail it zooms in. Turns bright red. |


| **Dark vignette** | YouTube | I see Dark vignette adds a red shadow around the edges of the screen. |


*Jump scare** | Every site | I watch Jump scare show a full-screen image and sound when a page loads. I click the image to dismiss it. It fades out by itself. |


*Floating ghosts** | Every site | I notice Floating ghosts are translucent and drift and bob across the page. |


| **Cursor trail** | Every site | I see Cursor trail shows glowing orange embers that drift up from the mouse. |


| **Skip list** | Every site | I use Skip list to turn off the jump scare, ghosts and trail on sites I choose like my bank. Adding a site also covers its subdomains. |


| | | Each feature has its checkbox in the popup. Reset puts everything back, to defaults.


## Install
 
1. Download or clone this folder.
2. Add your own media if you want to in the images folder and then edit it inn the content.js (keep it appropriate for ur own sake)
3. Open `chrome://extensions` in Chrome (version 116 or newer).
4. Turn on **Developer mode** in the top right.
5. Click **Load unpacked** and select this folder, the one that contains `manifest.json`.
6. Click the puzzle-piece icon in the toolbar and pin **ghost extension**.
After changing any file, click the reload arrow on the extension's card. Then refresh the open tabs, because tabs keep running the old scripts until they reload.


## Using it
 
- Click the extension icon to open the popup and tick or untick any feature. When you change thumbnails, flicker vignette, ghosts or the trail the extension updates away and you do not need to refresh the page.

- The jump scare only checks its setting when a page loads so unticking the jump scare stops the jump scare, not one already on screen.

- **Skip this site** adds the site to the skip list. The skip list changes the jump scare, ghosts and trail. The skip list does not change the YouTube thumbnail features, which have their checkboxes.

- Chrome blocks extensions, on its own pages (`chrome://` and the Web Store) so nothing appears on those pages.


`ghost-extension/
├── manifest.json        Extension configuration (must stay at the top level)
├── background.js        Service worker: starts the hidden audio page and relays the sound request
├── youtube/
│   ├── content.js       Finds YouTube thumbnails, swaps and restores them, applies the effect classes
│   └── style.css        Flicker animation, hover effect, vignette
├── all-sites/
│   ├── skip.js          Shared helper: checks whether the current site is in the skip list
│   ├── jumpscare.js     Builds the jump scare overlay on page load
│   ├── jumpscare.css    Overlay layout and fade animation
│   ├── ghost.js        Creates the floating ghosts
│   ├── ghost.css       Ghost drift and bob animations
│   └── trail.js         Draws the cursor ember trail on a canvas
├── popup/
│   ├── popup.html       The settings popup
│   ├── popup.js         Saves the checkboxes and manages the skip list
│   └── popup.css        Popup styling
├── offscreen/
│   ├── offscreen.html   Hidden page that plays the sound
│   └── offscreen.js     Plays the jump scare sound
├── images/
├── icons/
└── sounds/`

## Privacy
 
Everything stays on your computer. The extension makes no network requests, collects no data, and has no analytics. The only thing stored is your settings and skip list, in Chrome's local extension storage.

# made with love by bhimesh and no one else
im just very tuff gang.
