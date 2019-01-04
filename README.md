# mishiro-score-viewer

Demo: [https://toyobayashi.github.io/mishiro-score-viewer/](https://toyobayashi.github.io/mishiro-score-viewer/)

## Quick Start

Require Node.js 8+ and git.

``` bash
$ git clone https://github.com/toyobayashi/mishiro-score-viewer.git

$ cd mishiro-score-viewer

$ npm install

$ npm start
```

Place live song (.mp3) and score (.csv) in `docs/res`,  
rename mp3 to `${id}.mp3`,  
rename csv to `${id}-${difficulty}.csv`,  
add `list` field in `docs/data.json`,  
then open `http://localhost:9080/` in **Chrome** / **Firefox**.

local development port can be changed in `script/config.json`.

Desktop application: [mishiro](https://github.com/toyobayashi/mishiro)
