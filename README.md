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

Local development port can be changed in `script/config.json`.  

Use [mishiro desktop application](https://github.com/toyobayashi/mishiro) to have a better experience.

把MP3文件和CSV文件都放在 `docs/res`，  
按照上面的格式重命名对应的音乐和谱面，  
并在 `docs/data.json` 的 `list` 下添加ID和谱面难度，  
在 **Chrome** 或 **Firefox** 中打开`http://localhost:9080/`。

本地开发环境的端口可以在 `script/config.json` 中更改。

推荐使用 [mishiro 桌面应用](https://github.com/toyobayashi/mishiro) 获得更好的体验。
