const { writeFileSync } = require('fs')
const { join } = require('path')

const MUSIC_DATA = './music_data.json'
const DATA_JSON = './data.json'

let musicData, dataJson
try {
  musicData = require(MUSIC_DATA)
} catch (_) {
  musicData = []
}

try {
  dataJson = require(DATA_JSON)
} catch (_) {
  dataJson = { list: {}, default: { id: -1, score: -1 } }
}

musicData.forEach(music => {
  music.id = Number(music.id)
  delete music.bpm
  delete music.composer
  delete music.lyricist
  delete music.name_kana
  delete music.name_sort
  delete music.sound_length
  delete music.sound_offset
  delete music.music_category
})

writeFileSync(join(__dirname, DATA_JSON), JSON.stringify(Object.assign({}, dataJson, { music: musicData }), null, 2) + '\n')
