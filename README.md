# [Unexpected Keyboard Layout Creator](https://unexpected-keyboard-layout-creator.lixquid.com)

A tool for creating layouts for the Unexpected Keyboard for Android devices.

https://unexpected-keyboard-layout-creator.lixquid.com

## How to Use

1. To get started, either:
    1. Select a layout under the *Start from a template* dropdown, or
    2. Import a layout from its XML by putting it in the *Import from XML* box and clicking *Import*.
2. Add rows by clicking the *Add Row* button, or edit / remove existing rows by clicking on the cog button on the right side of the row.
3. Add keys to rows by clicking the Plus button on the right side of the row, or edit / remove existing keys by clicking on the key itself.
4. Once you're done, click *Export to XML* to get the XML for your layout.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Getting Started

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`
4. Open http://localhost:1234 in your browser

Changes to the source files will be automatically reloaded in the browser.

### Building for Production

1. Remove the `dist` folder: `rm -rf dist`
2. Build the project: `yarn build`
3. The production files will be in the `dist` folder
