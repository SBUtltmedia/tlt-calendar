# tlt-calendar

`npm install` to install dependencies
Also `sudo npm -g install webpack webpack-dev-server` to run dev server

`npm start` to run dev server

`npm test` to run jest tests

`npm run build` to build production bundle

## Create local link to API server
Requires [sshfs and Fuse for macOS](https://osxfuse.github.io/)
`mkdir /tmp/sccal`
`sshfs tltsecure@apps.tlt.stonybrook.edu:/home1/tltsecure/www/sccal /tmp/sccal`

## Building to API server
`webpack --content-base ./ --config webpack.prod.config.babel.js --output-path /tmp/sccal/public`
Open browser to [https://apps.tlt.stonybrook.edu/sccal](https://apps.tlt.stonybrook.edu/sccal)

## Experimental
`npm run test:debug` and open [127.0.0.1:5000/?port=5858](http://127.0.0.1:5000/?port=5858) in Chrome to debug mocha tests (requires [node-inspector](https://github.com/node-inspector/node-inspector) and [jest](https://facebook.github.io/jest) to be installed using `npm -g`)
