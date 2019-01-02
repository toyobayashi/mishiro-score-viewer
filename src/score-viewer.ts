import axios from 'axios'
import Global, { globalInstance } from './global'
import { ScoreNote } from './types'
import Note, { ScoreNoteWithNoteInstance } from './note'
import TapNote from './tap-note'
import FlipNote from './flip-note'
import LongNote from './long-note'
import LongMoveNote from './long-move-note'

interface Song<ScoreType> {
  src: string
  bpm?: number
  score: ScoreType[]
  fullCombo: number
  difficulty?: string
}

interface Option {
  speed: number
}

let id = '9018'
let difficulty = '5'

class ScoreViewer {

  public static async main (): Promise<void> {
    id = Global.getQuery('id') || '9018'
    difficulty = Global.getQuery('difficulty') || '5'
    const data = (await axios.get(`./res/${id}-${difficulty}.csv`)).data
    const { fullCombo, score } = Global.createScore(data)
    ScoreViewer.init({
      src: `./res/${id}.mp3`,
      fullCombo,
      score
    }, document.body)
  }

  private static _instance: ScoreViewer | null = null
  public static init (song: Song<ScoreNote>, el: HTMLElement, options?: Option) {
    return new ScoreViewer(song, el, options)
  }

  public static calY (speed: number, sec: number, currentTime: number): number {
    return ScoreViewer.TOP_TO_TARGET_POSITION - (~~(speed * 60 * (sec - currentTime)))
  }

  public static saveCalY (sv: ScoreViewer, sec: number): number {
    return sv.saveCanvas.height - ((~~(globalInstance.saveSpeed * 60 * (sec)))) / globalInstance.scale
  }

  private static CANVAS_WIDTH = 867
  private static CANVAS_HEIGHT = 720
  public static X: number[] = [238 - 206, 414 - 206, 589 - 206, 764 - 206, 937 - 206]
  private static BOTTOM = 20
  public static TOP_TO_TARGET_POSITION = ScoreViewer.CANVAS_HEIGHT - ScoreViewer.BOTTOM - (globalInstance.backPng ? globalInstance.backPng.height : 0) + (globalInstance.backPng ? Math.round((globalInstance.backPng.height - globalInstance.noteHeight) / 2) : 0)/*  + 114 + 6 */

  public frontCanvas: HTMLCanvasElement
  public backCanvas?: HTMLCanvasElement
  public saveCanvas: HTMLCanvasElement
  public frontCtx: CanvasRenderingContext2D
  public backCtx: CanvasRenderingContext2D
  public saveCtx: CanvasRenderingContext2D
  public song: Song<ScoreNoteWithNoteInstance>
  public audio: HTMLAudioElement
  public pauseButton: HTMLButtonElement
  public saveButton: HTMLButtonElement
  public rangeInput: HTMLInputElement
  public speedInput: HTMLInputElement
  public options: Option = {
    speed: 12 // * 60 px / s
  }

  private _isReady: boolean = false
  private _isReadyToSave: boolean = false
  private _isPaused: boolean = true
  private _t: number
  private _isClean = true
  private _comboDom: HTMLSpanElement

  // private _preCalculation: { timeRange: number }

  constructor (song: Song<ScoreNote>, el: HTMLElement, options?: Option) {
    if (ScoreViewer._instance) return ScoreViewer._instance

    if (options) this.options = Object.assign({}, this.options, options)
    // this.audio = process.env.NODE_ENV === 'production' ? Global.createAudio(song.src) : Global.createAudio(relative(__dirname, song.src))
    this.audio = Global.createAudio(song.src)

    this.song = song
    // this._preCalculation = {
    //   timeRange: 24 * (60 / song.bpm)
    // }

    this._resolveNoteList()
    this._resolveDOM(el)
    // console.log(this.song.score)

    ScoreViewer._instance = this
    return ScoreViewer._instance
  }

  private _setNoteInstance (index: number, note: Note) {
    if (!this.song.score[index]._instance) this.song.score[index]._instance = note
  }

  private _resolveNoteList () {
    for (let i = 0; i < this.song.score.length; i++) {

      if (this.song.score[i]._instance) continue
      const note = this.song.score[i]

      switch (note.type) {
        case 1:
          if (note.status === 0) {
            this._setNoteInstance(i, new TapNote(note, this._getSyncNote(i)))
          } else {
            let group = this._findSameGroup(i, note.groupId)

            if (group.length) {
              for (let x = 0; x < group.length - 1; x++) {
                if (this.song.score[group[x]].finishPos === this.song.score[group[x + 1]].finishPos) {
                  group = group.slice(0, x + 1)
                  break
                }
              }
              for (let j = group.length - 1; j > 0; j--) {
                this._setNoteInstance(group[j], new FlipNote(this.song.score[group[j]], this.song.score[group[j - 1]], this._getSyncNote(group[j])))
              }
              this._setNoteInstance(group[0], new FlipNote(this.song.score[group[0]], note, this._getSyncNote(group[0])))
            }
            this._setNoteInstance(i, new FlipNote(note, undefined, this._getSyncNote(i)))
          }
          break
        case 2:
          const endIndex = this._findLongNote(i, note.finishPos)
          if (endIndex !== -1) {
            const group = this._findSameGroup(endIndex, this.song.score[endIndex].groupId)
            if (group.length) {
              for (let j = group.length - 1; j > 0; j--) {
                if (this.song.score[group[j]].type === 2 && this.song.score[group[j]].status === 0) {
                  this._setNoteInstance(group[j], new LongNote(this.song.score[group[j]], this.song.score[group[j - 1]], this._getSyncNote(group[j])))
                } else {
                  this._setNoteInstance(group[j], new FlipNote(this.song.score[group[j]], this.song.score[group[j - 1]], this._getSyncNote(group[j])))
                }
              }
              if (this.song.score[group[0]].type === 2 && this.song.score[group[0]].status === 0) {
                this._setNoteInstance(group[0], new LongNote(this.song.score[group[0]], this.song.score[endIndex], this._getSyncNote(group[0])))
              } else {
                this._setNoteInstance(group[0], new FlipNote(this.song.score[group[0]], this.song.score[endIndex], this._getSyncNote(group[0])))
              }
            }
            if (this.song.score[endIndex].type === 2 && this.song.score[endIndex].status === 0) {
              this._setNoteInstance(endIndex, new LongNote(this.song.score[endIndex], note, this._getSyncNote(endIndex)))
            } else {
              this._setNoteInstance(endIndex, new FlipNote(this.song.score[endIndex], note, this._getSyncNote(endIndex)))
            }
          }
          this._setNoteInstance(i, new LongNote(note, undefined, this._getSyncNote(i)))
          break
        case 3:
          const group = this._findSameGroup(i, note.groupId)
          if (group.length) {
            for (let j = group.length - 1; j > 0; j--) {
              if (this.song.score[group[j]].type === 3 && this.song.score[group[j]].status === 0) {
                this._setNoteInstance(group[j], new LongMoveNote(this.song.score[group[j]], this.song.score[group[j - 1]], this._getSyncNote(group[j])))
              } else {
                this._setNoteInstance(group[j], new FlipNote(this.song.score[group[j]], this.song.score[group[j - 1]], this._getSyncNote(group[j])))
              }
            }
            if (this.song.score[group[0]].type === 3 && this.song.score[group[0]].status === 0) {
              this._setNoteInstance(group[0], new LongMoveNote(this.song.score[group[0]], note, this._getSyncNote(group[0])))
            } else {
              this._setNoteInstance(group[0], new FlipNote(this.song.score[group[0]], note, this._getSyncNote(group[0])))
            }
          }
          this._setNoteInstance(i, new LongMoveNote(note, undefined, this._getSyncNote(i)))
          break
        default:
          break
      }
    }
  }

  public start () {
    if (!this._isReady) {
      setTimeout(() => {
        this.start()
      }, 100)
      return
    }

    this.audio.play().catch(err => console.log(err))

    const self = this

    _frame()

    function _frame () {
      self._cal()
      self._renderNote()
      self._t = window.requestAnimationFrame(_frame)
    }
  }

  public stop () {
    this.audio.pause()
    window.cancelAnimationFrame(this._t)
  }

  private _clear () {
    if (!this._isClean) {
      this.frontCtx.clearRect(0, 0, ScoreViewer.CANVAS_WIDTH, ScoreViewer.CANVAS_HEIGHT - 15)
      this._isClean = true
    }
  }

  private _cal () {
    let combo = -1

    for (let i = 0; i < this.song.score.length; i++) {
      if (this.song.score[i].sec > this.audio.currentTime) {
        combo = i
        break
      }
      (this.song.score[i]._instance as Note).setY(ScoreViewer.calY(this.options.speed, this.song.score[i].sec, this.audio.currentTime))
    }

    if (combo === -1) combo = this.song.score.length
    if (this._comboDom.innerHTML !== '' + combo) this._comboDom.innerHTML = '' + combo

    for (let i = combo; i < this.song.score.length; i++) {
      (this.song.score[i]._instance as Note).setY(ScoreViewer.calY(this.options.speed, this.song.score[i].sec, this.audio.currentTime))
    }
  }

  private _findLongNote (begin: number, finishPos: number): number {
    for (let i = begin + 1; i < this.song.score.length; i++) {
      if (this.song.score[i].finishPos === finishPos) {
        return i
      }
    }
    return -1
  }

  private _findSameGroup (begin: number, groupId: number): number[] {
    if (groupId === 0) return []
    const index = []
    for (let i = begin + 1; i < this.song.score.length; i++) {
      if (this.song.score[i].groupId === groupId) {
        index.push(i)
      }
    }
    return index
  }

  private _renderNote () {

    this._clear()

    for (let i = this.song.score.length - 1; i >= 0; i--) {
      if ((this.song.score[i]._instance as Note).isNeedDraw()) (this.song.score[i]._instance as Note).drawConnection(this)
    }

    this.frontCtx.save()
    this.frontCtx.fillStyle = '#fff'
    for (let i = this.song.score.length - 1; i >= 0; i--) {
      if ((this.song.score[i]._instance as Note).isNeedDraw()) (this.song.score[i]._instance as Note).drawSync(this)
    }
    this.frontCtx.restore()

    for (let i = this.song.score.length - 1; i >= 0; i--) {
      if ((this.song.score[i]._instance as Note).isNeedDraw()) (this.song.score[i]._instance as Note).drawNote(this)
    }
    this._isClean = false
  }

  private _getSyncNote (index: number): ScoreNote | undefined {
    if (index !== this.song.score.length - 1 && this.song.score[index].sync === 1 && this.song.score[index].sec === this.song.score[index + 1].sec) {
      return this.song.score[index + 1]
    }
    return undefined
  }

  private async _saveScore () {
    if (!this._isReady) {
      setTimeout(async () => {
        await this._saveScore()
      }, 100)
      return
    }

    const toBlob = () => new Promise<Blob | null>((resolve) => {
      this.saveCanvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/png', 1)
    })

    const _drawAndSave = async () => {
      if (!this._isReadyToSave) {
        this.stop()
        this.saveCanvas.height = globalInstance.saveSpeed * 60 * this.audio.duration / globalInstance.scale
        this.saveCtx = this.saveCanvas.getContext('2d') as CanvasRenderingContext2D
        this.saveCtx.fillStyle = 'rgba(255, 255, 255, 0.66)'
        this.saveCtx.save()
        this.saveCtx.fillStyle = 'rgb(39, 40, 34)'
        this.saveCtx.font = '12px Consolas'
        this.saveCtx.fillRect(0, 0, this.saveCanvas.width, this.saveCanvas.height)
        this.saveCtx.strokeStyle = '#e070d0'
        this.saveCtx.fillStyle = '#e070d0'
        // const b = Math.round(this.audio.duration * this.song.bpm / 60)
        // for (let i = 0; i < b; i += 4) {
        //   const y = this.saveCanvas.height - (i * 60 / this.song.bpm * globalInstance.saveSpeed * 60) / globalInstance.scale + globalInstance.noteHeight / 2 / globalInstance.scale
        //   this.saveCtx.fillText('' + i, 1, y - 2)

        //   this.saveCtx.beginPath()
        //   this.saveCtx.moveTo(0, y)
        //   this.saveCtx.lineTo(this.saveCanvas.width, y)
        //   this.saveCtx.stroke()
        //   this.saveCtx.closePath()
        // }
        // const firstY = this.saveCanvas.height - (60 / this.song.bpm * globalInstance.saveSpeed * 60) / globalInstance.scale + globalInstance.noteHeight / 2 / globalInstance.scale
        const firstY = this.saveCanvas.height - 10
        this.saveCtx.font = '12px -apple-system, BlinkMacSystemFont, Segoe WPC,Segoe UI, HelveticaNeue-Light, Noto Sans, Microsoft YaHei, PingFang SC, Hiragino Sans GB, Source Han Sans SC, Source Han Sans CN, Source Han Sans, sans-serif'
        this.saveCtx.fillStyle = '#fff'
        this.saveCtx.textAlign = 'center'
        this.saveCtx.fillText('https://github.com/toyobayashi/mishiro-score-viewer', this.saveCanvas.width / 2, firstY - 7)
        // this.saveCtx.fillText(name, this.saveCanvas.width / 2, firstY - 7 - 16 * 3)
        // this.saveCtx.fillText(this.song.difficulty, this.saveCanvas.width / 2, firstY - 7 - 16 * 4)
        this.saveCtx.restore()
        globalInstance.noteWidth /= globalInstance.scale
        globalInstance.noteHeight /= globalInstance.scale
        globalInstance.noteWidthFlip /= globalInstance.scale

        const OLD_TOP_TO_TARGET_POSITION = ScoreViewer.TOP_TO_TARGET_POSITION
        const oldX = ScoreViewer.X
        ScoreViewer.X = [238 - 206, 414 - 206, 589 - 206, 764 - 206, 937 - 206].map(v => v / globalInstance.scale)
        ScoreViewer.TOP_TO_TARGET_POSITION = this.saveCanvas.height
        for (let i = 0; i < this.song.score.length; i++) {
          (this.song.score[i]._instance as Note).setX((this.song.score[i]._instance as Note).getX() / globalInstance.scale);
          (this.song.score[i]._instance as Note).setY(ScoreViewer.saveCalY(this, this.song.score[i].sec))
        }

        for (let i = this.song.score.length - 1; i >= 0; i--) {
          (this.song.score[i]._instance as Note).saveDrawConnection(this)
        }

        this.saveCtx.save()
        this.saveCtx.fillStyle = '#fff'
        for (let i = this.song.score.length - 1; i >= 0; i--) {
          (this.song.score[i]._instance as Note).saveDrawSync(this)
        }
        this.saveCtx.restore()

        for (let i = this.song.score.length - 1; i >= 0; i--) {
          (this.song.score[i]._instance as Note).saveDrawNote(this)
        }

        for (let i = 0; i < this.song.score.length; i++) {
          (this.song.score[i]._instance as Note).setX((this.song.score[i]._instance as Note).getX() * globalInstance.scale)
        }
        globalInstance.noteWidth *= globalInstance.scale
        globalInstance.noteHeight *= globalInstance.scale
        globalInstance.noteWidthFlip *= globalInstance.scale

        ScoreViewer.TOP_TO_TARGET_POSITION = OLD_TOP_TO_TARGET_POSITION
        ScoreViewer.X = oldX

      }

      // const base64str = this.saveCanvas.toDataURL('image/png')
      const blob = await toBlob()
      if (!blob) {
        const OLD_SAVE_SPEED = globalInstance.saveSpeed
        globalInstance.saveSpeed--
        await _drawAndSave()
        globalInstance.saveSpeed = OLD_SAVE_SPEED
        return
      }

      this._isReadyToSave = true
      this.start()

      // writeFile(filename, Buffer.from(base64str.substr(22), 'base64'), (err) => {
      //   if (err) alert(err.message)
      // })

      const a = document.createElement('a')
      a.download = `${id}-${difficulty}.png`
      a.href = URL.createObjectURL(blob)
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      })
      a.dispatchEvent(event)
      a.remove()
    }

    await _drawAndSave()

    // remote.dialog.showSaveDialog({
    //   title: 'Save Score - ' + name + '-' + this.song.difficulty,
    //   defaultPath: getPath.scoreDir(name + '-' + this.song.difficulty + '.png')
    // }, _drawAndSave)
  }

  private _resolveDOM (el: HTMLElement) {
    // const background = document.getElementById('bg') as HTMLImageElement
    this.frontCanvas = document.createElement('canvas')
    this.saveCanvas = document.createElement('canvas')
    this.frontCanvas.width = ScoreViewer.CANVAS_WIDTH
    this.frontCanvas.height = ScoreViewer.CANVAS_HEIGHT

    this.saveCanvas.width = ScoreViewer.CANVAS_WIDTH / globalInstance.scale

    // this.frontCanvas.className = this.backCanvas.className = 'canvas canvas-center'

    this.pauseButton = document.createElement('button')
    this.pauseButton.innerHTML = 'play'
    this.pauseButton.addEventListener('click', () => {
      globalInstance.playSe()
      if (this._isPaused) {
        this.start()
      } else {
        this.stop()
      }
    })
    this.pauseButton.className = 'cgss-btn cgss-btn-ok'
    this.pauseButton.style.position = 'absolute'
    this.pauseButton.style.zIndex = '2000'
    this.pauseButton.style.top = '2%'
    this.pauseButton.style.left = '1%'

    this.saveButton = document.createElement('button')
    this.saveButton.innerHTML = 'save'
    this.saveButton.addEventListener('click', () => {
      globalInstance.playSeOk()
      this._saveScore()
    })
    this.saveButton.className = 'cgss-btn cgss-btn-ok'
    this.saveButton.style.position = 'absolute'
    this.saveButton.style.zIndex = '2000'
    this.saveButton.style.top = 'calc(2% + 84px)'
    this.saveButton.style.left = '1%'

    this.rangeInput = document.createElement('input')
    this.rangeInput.type = 'range'
    this.rangeInput.min = '0'
    this.rangeInput.max = '100'
    this.rangeInput.value = '0'
    this.rangeInput.style.position = 'absolute'
    this.rangeInput.style.zIndex = '2000'
    this.rangeInput.style.width = '50%'
    this.rangeInput.style.left = '25%'
    this.rangeInput.style.bottom = '10px'
    this.rangeInput.addEventListener('input', (ev) => {
      this.audio.currentTime = Number((ev.target as HTMLInputElement).value)
    })

    this.speedInput = document.createElement('input')
    this.speedInput.type = 'range'
    this.speedInput.min = '5'
    this.speedInput.max = '20'
    this.speedInput.value = '12'
    this.speedInput.style.position = 'absolute'
    this.speedInput.style.zIndex = '2000'
    this.speedInput.style.width = '15%'
    this.speedInput.style.left = '2%'
    this.speedInput.style.bottom = '10px'
    this.speedInput.addEventListener('input', (ev) => {
      this.options.speed = Number((ev.target as HTMLInputElement).value)
    })

    const comboText = document.createElement('span')
    this._comboDom = document.createElement('span')
    this._comboDom.className = 'combo-number'
    this._comboDom.innerHTML = '0'
    comboText.className = 'combo-text'
    comboText.innerHTML = 'combo'
    const comboWrap = document.createElement('div')
    comboWrap.className = 'combo'
    comboWrap.appendChild(this._comboDom)
    comboWrap.appendChild(comboText)

    if (globalInstance.backPng && globalInstance.backPng.src) {
      this.backCanvas = document.createElement('canvas')
      this.backCanvas.width = ScoreViewer.CANVAS_WIDTH
      this.backCanvas.height = ScoreViewer.CANVAS_HEIGHT
      this.backCtx = this.backCanvas.getContext('2d') as CanvasRenderingContext2D
      const self = this
      const liveIcon = Global.newImage(globalInstance.backPng.src)
      liveIcon.addEventListener('load', function () {
        self.backCtx.drawImage(this, Math.round((ScoreViewer.CANVAS_WIDTH - this.width) / 2), ScoreViewer.CANVAS_HEIGHT - ScoreViewer.BOTTOM - this.height)
      }, false)
      el.appendChild(this.backCanvas)
    }
    el.appendChild(this.frontCanvas)
    el.appendChild(this.pauseButton)
    el.appendChild(this.saveButton)
    el.appendChild(this.rangeInput)
    el.appendChild(this.speedInput)
    el.appendChild(comboWrap)

    this.frontCtx = this.frontCanvas.getContext('2d') as CanvasRenderingContext2D
    this.frontCtx.fillStyle = 'rgba(255, 255, 255, 0.66)'

    this.audio.addEventListener('canplay', () => {
      this._isReady = true
      this.rangeInput.max = this.audio.duration.toString()
    })

    this.audio.addEventListener('play', () => {
      this._isPaused = false
      this.pauseButton.innerHTML = 'pause'
      this.pauseButton.className = 'cgss-btn cgss-btn-star'
    })

    this.audio.addEventListener('pause', () => {
      this._isPaused = true
      this.pauseButton.innerHTML = 'play'
      this.pauseButton.className = 'cgss-btn cgss-btn-ok'
    })

    this.audio.addEventListener('ended', () => {
      window.close()
    }, false)

    this.audio.addEventListener('timeupdate', () => {
      this.rangeInput.value = this.audio.currentTime.toString()
      this.rangeInput.style.backgroundSize = 100 * (this.audio.currentTime / this.audio.duration) + '% 100%'
    })

    const resize = () => {
      // if (window.innerWidth / window.innerHeight >= 1280 / 824) {
      //   background.className = 'img-middle'
      // } else {
      //   background.className = 'img-center'
      // }
      if (window.innerWidth / window.innerHeight >= ScoreViewer.CANVAS_WIDTH / ScoreViewer.CANVAS_HEIGHT) {
        this.frontCanvas.className = 'canvas canvas-center'
        if (this.backCanvas) this.backCanvas.className = 'canvas canvas-center'
      } else {
        this.frontCanvas.className = 'canvas canvas-middle'
        if (this.backCanvas) this.backCanvas.className = 'canvas canvas-middle'
      }
    }

    resize()

    window.addEventListener('resize', resize, false)
  }
}

export default ScoreViewer
