import './style.css'
import axios from 'axios'
import ScoreViewer from './score-viewer'
import { ScoreNote } from './types'

function createScore (csv: string) {
  let csvTable: string[] = csv.split('\n')
  const fullCombo = csvTable[1].split(',').map(value => Number(value))[5]
  const score: ScoreNote[] = []

  for (let i = 2; i < csvTable.length; i++) {
    const noteArr: any[] = csvTable[i].split(',').map(value => Number(value))
    if (noteArr[2] !== 1 && noteArr[2] !== 2 && noteArr[2] !== 3) {
      continue
    }
    score.push({
      sec: noteArr[1],
      type: noteArr[2],
      finishPos: noteArr[4],
      status: noteArr[5],
      sync: noteArr[6],
      groupId: noteArr[7]
    })
  }

  return { fullCombo, score }
}

async function main () {
  const data = (await axios.get('./res/score.csv')).data
  const { fullCombo, score } = createScore(data)
  ScoreViewer.main({
    src: './res/live.mp3',
    fullCombo,
    score
  })
}

main()
