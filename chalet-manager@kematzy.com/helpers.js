// Source code copied from [hardpixel/hotel-manager](https://github.com/hardpixel/hotel-manager)
// released as open source under the terms of the [GPL v3](http://www.gnu.org/licenses/gpl-3.0.en.html)

const ByteArray = imports.byteArray
const GLib      = imports.gi.GLib

function toString(charCode) {
  return ByteArray.toString(charCode)
}

function toJSON(string) {
  try {
    return JSON.parse(string)
  } catch (e) {
    return {}
  }
}

function getFilePath(path) {
  return path.replace('~', GLib.get_home_dir())
}

function configProgramPath() {
  const command = fileGetLine('~/.chaletrc', 0, 'chalet')
  return getFilePath(command)
}

function userProgramPath(folder) {
  const path = GLib.build_filenamev([getFilePath(folder), 'chalet'])
  return GLib.file_test(path, GLib.FileTest.EXISTS) && path
}

function findProgramPath() {
  return GLib.find_program_in_path('chalet') ||
    userProgramPath('~/.local/bin')         ||
    userProgramPath('~/.yarn/bin')          ||
    userProgramPath('~/.node_modules/bin')  ||
    configProgramPath()
}

function fileGetContents(path, defaultValue = null, jsonConvert = false) {
  let filePath = getFilePath(path)
  let fileData = defaultValue

  if (GLib.file_test(filePath, GLib.FileTest.EXISTS)) {
    let data = GLib.file_get_contents(filePath)
    fileData = toString(data[1])

    if (jsonConvert) {
      fileData = toJSON(fileData)
    }
  }

  if (!fileData) {
    fileData = defaultValue
  }

  return fileData
}

function fileGetLine(path, line, defaultValue = null) {
  let fileData  = fileGetContents(path, '')
  let fileLine  = fileData.split("\n")[line]
  let lineValue = defaultValue

  if (fileLine != '') {
    lineValue = fileLine
  }

  return lineValue
}
