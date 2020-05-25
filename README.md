## React-Typescript-HMR-Boilerplate

For the run projects locally need to make `.env` file with the config. This file we cant commit because it's secure data.
Without `.env` config cannot start project.

Install `yarn` globally `npm i -g yarn`
1. Install packages `yarn install`.
2. Start project in development env `yarn start`

If you need build project - `yarn build` (If you see type or eslint error, dont worry, this information is required only for developers.)
If you need server production version -  `yarn build && node server.js`
