## New Tab

A new tab extension for Chrome using React.

### MVP

- date/time
- weather (geolocation)
- notepad (localStorage or database)
- custom background image upload

### Building

- cra extension nested inside newTab folder
- added `"move": "yarn build && rm -rf ../static && mv build/static ../static"` script to package.json
- `npm run move` inside extension
- open chrome://extensions
- developer mode on, load unpacked
- \*\*remember to cd out to newTab for repo actions
