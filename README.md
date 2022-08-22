## New Tab

A new tab extension for Chrome made using React.

### Functionality

- date/time
- weather/current temp (geolocation, toggle fahrenheit/celcius)
- notepad (notes saved in localStorage)
- 4 background options, light/dark themes applied accordingly

### Building

- cra extension nested inside newTab folder
- added `"move": "yarn build && rm -rf ../static && mv build/static ../static"` script to package.json
- `npm run move` inside extension
- open chrome://extensions
- developer mode on, load unpacked
