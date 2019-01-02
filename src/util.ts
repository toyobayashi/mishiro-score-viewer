import { ScoreNote } from './types'

export function createScore (csv: string) {
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

export function getQuery (key: string) {
  if (!window.location.search) return undefined
  const obj: { [key: string]: string } = {}
  const keyvalue = window.location.search.substr(1).split('&')
  for (let i = 0; i < keyvalue.length; i++) {
    const [key, value] = keyvalue[i].split('=')
    obj[key] = value
  }
  return obj[key]
}
