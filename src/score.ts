import './style.css'
import ScoreViewer from './score-viewer'

if ((window as any).cordova) {
  document.addEventListener('deviceready', () => {
    ScoreViewer.main()
  })
} else {
  ScoreViewer.main()
}
