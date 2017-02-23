# tlt-calendar

`npm install` to install dependencies

`npm start` to run dev server

`npm test` to run jest tests

`npm run build` to build production bundle

## Create local link to API server
Requires [sshfs and Fuse for macOS](https://osxfuse.github.io/)<br>
`mkdir /tmp/sccal`<br>
`sshfs tltsecure@apps.tlt.stonybrook.edu:/home1/tltsecure/www/sccal /tmp/sccal`

## Building to API server
`npm run build`
<br>or if you need to customize the output path:<br>
`node_modules/webpack/bin/webpack --config webpack.prod.config.babel.js --output-path <output path>`

Site will be at: [https://apps.tlt.stonybrook.edu/sccal](https://apps.tlt.stonybrook.edu/sccal)

## Experimental test debugging
`npm run test:debug` and open [127.0.0.1:5000/?port=5858](http://127.0.0.1:5000/?port=5858) in Chrome to debug tests (requires [node-inspector](https://github.com/node-inspector/node-inspector) to be installed using `npm -g`)
