import { ScoreNote } from './types'

export interface GlobalConstructorArgument {
  noteWidth?: number
  noteHeight?: number
  noteWidthFlip?: number
  scale?: number
  saveSpeed?: number
  notePng: string
  backPng?: {
    src: string
    height: number
    width: number
  }
  se?: string
  seOk?: string
}

export interface Song<ScoreType> {
  src: string
  bpm: number
  score: ScoreType[]
  fullCombo: number
  difficulty: string
}

export interface Option {
  speed: number
}

class Global {
  public noteWidth: number = 102
  public noteHeight: number = 102
  public noteWidthFlip: number = 125
  public scale: number = 3
  public saveSpeed: number = 12
  public backPng?: {
    src: string
    height: number
    width: number
  } = undefined
  private _notePng: string = ''

  public tapCanvas: HTMLCanvasElement = document.createElement('canvas')
  public longLoopCanvas: HTMLCanvasElement = document.createElement('canvas')
  public longMoveCanvas: HTMLCanvasElement = document.createElement('canvas')
  public longMoveWhiteCanvas: HTMLCanvasElement = document.createElement('canvas')
  public flipLeftCanvas: HTMLCanvasElement = document.createElement('canvas')
  public flipRightCanvas: HTMLCanvasElement = document.createElement('canvas')
  private _se: HTMLAudioElement | null = null
  private _seOk: HTMLAudioElement | null = null

  private static _instance: Global | null = null
  private static _query: { [key: string]: string } | null = null
  public static newImage (src: string) {
    const img = new Image()
    img.src = src
    return img
  }

  public static createAudio (src: string) {
    const audio = new Audio(src)
    audio.preload = 'auto'
    return audio
  }

  public static createScore (csv: string) {
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

  public static getQuery (key: string) {
    if (Global._query) return Global._query[key]
    Global._query = {}

    if (!window.location.search) return undefined
    const keyvalue = window.location.search.substr(1).split('&')
    for (let i = 0; i < keyvalue.length; i++) {
      const [key, value] = keyvalue[i].split('=')
      Global._query[key] = value
    }
    return Global._query[key]
  }

  constructor (options: GlobalConstructorArgument) {
    if (Global._instance) return Global._instance
    this.noteWidth = options.noteWidth || this.noteWidth
    this.noteHeight = options.noteHeight || this.noteHeight
    this.noteWidthFlip = options.noteWidthFlip || this.noteWidthFlip
    this.scale = options.scale || this.scale
    this.saveSpeed = options.saveSpeed || this.saveSpeed
    this.backPng = options.backPng
    this._notePng = options.notePng

    this.tapCanvas.width = this.longLoopCanvas.width = this.longMoveCanvas.width = this.longMoveWhiteCanvas.width = this.tapCanvas.height = this.longLoopCanvas.height = this.longMoveCanvas.height = this.longMoveWhiteCanvas.height = this.flipLeftCanvas.height = this.flipRightCanvas.height = this.noteWidth
    this.flipLeftCanvas.width = this.flipRightCanvas.width = this.noteWidthFlip
    const iconNotesImg = Global.newImage(this._notePng)
    iconNotesImg.addEventListener('load', () => {
      (this.tapCanvas.getContext('2d') as CanvasRenderingContext2D).drawImage(iconNotesImg, 0, 0, this.noteWidth, this.noteHeight, 0, 0, this.noteWidth, this.noteHeight);
      (this.longLoopCanvas.getContext('2d') as CanvasRenderingContext2D).drawImage(iconNotesImg, this.noteWidth, 0, this.noteWidth, this.noteHeight, 0, 0, this.noteWidth, this.noteHeight);
      (this.longMoveCanvas.getContext('2d') as CanvasRenderingContext2D).drawImage(iconNotesImg, this.noteWidth * 2, 0, this.noteWidth, this.noteHeight, 0, 0, this.noteWidth, this.noteHeight);
      (this.longMoveWhiteCanvas.getContext('2d') as CanvasRenderingContext2D).drawImage(iconNotesImg, this.noteWidth * 3, 0, this.noteWidth, this.noteHeight, 0, 0, this.noteWidth, this.noteHeight);
      (this.flipLeftCanvas.getContext('2d') as CanvasRenderingContext2D).drawImage(iconNotesImg, this.noteWidth * 4, 0, this.noteWidthFlip, this.noteHeight, 0, 0, this.noteWidthFlip, this.noteHeight);
      (this.flipRightCanvas.getContext('2d') as CanvasRenderingContext2D).drawImage(iconNotesImg, this.noteWidth * 4 + this.noteWidthFlip, 0, this.noteWidthFlip, this.noteHeight, 0, 0, this.noteWidthFlip, this.noteHeight)
    })

    if (options.se) this._se = Global.createAudio(options.se)
    if (options.seOk) this._seOk = Global.createAudio(options.seOk)

    Global._instance = this
    return this
  }

  get noteWidthDelta () {
    return this.noteWidthFlip - this.noteWidth
  }

  get noteWidthHalf () {
    return this.noteWidth / 2
  }

  get noteHeightHalf () {
    return this.noteHeight / 2
  }

  public getInstance () {
    if (!Global._instance) throw new Error('Global instance null.')
    return Global._instance
  }

  public static play (audio: HTMLAudioElement) {
    const playReturn = audio.play()
    if (playReturn && playReturn.catch) {
      playReturn.catch(err => console.log(err))
    }
  }

  public playSe () {
    if (this._se) {
      this._se.currentTime = 0
      Global.play(this._se)
    }
  }
  public playSeOk () {
    if (this._seOk) {
      this._seOk.currentTime = 0
      Global.play(this._seOk)
    }
  }
}

export const globalInstance = new Global({
  notePng: './img/icon_notes.png',
  backPng: {
    src: './img/live_icon_857x114.png',
    height: 114,
    width: 857
  }
  /* se: './bgm/se_common_cancel.mp3',
  seOk: './bgm/se_common_enter.mp3' */
})

export default Global
