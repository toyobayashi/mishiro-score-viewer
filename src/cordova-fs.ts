export function writeFile (filePath: string, data: Blob | Uint8Array | ArrayBuffer | string, isAppend: boolean = false): Promise<void> {
  if (!window.cordova) return Promise.resolve()

  return new Promise((resolve, reject) => {
    import('path-browserify').then((path) => {
      const dir: string = path.dirname(filePath)
      const filename: string = path.basename(filePath)

      window.resolveLocalFileSystemURL(dir, function (dirEntry) {
        console.log('file system open: ' + dirEntry.name);
        (dirEntry as DirectoryEntry).getFile(filename, { create: true, exclusive: false }, function (fileEntry) {

          fileEntry.createWriter(function (fileWriter) {
            fileWriter.onwriteend = function () {
              resolve()
            }
            fileWriter.onerror = function (progressEvent) {
              reject(progressEvent.toString())
            }

            if (isAppend) {
              try {
                fileWriter.seek(fileWriter.length)
              } catch (e) {
                reject(new Error('file doesn\'t exist!'))
              }
            }

            fileWriter.write(data instanceof Blob ? data : new Blob([data]))
          }, (err) => reject(err))
        }, (err) => reject(err))
      }, (err) => reject(err))
    })
  })
}
