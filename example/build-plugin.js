const fs = require('fs')
const path = require('path')
const nodeModulePath = './node_modules/@wellcare/capacitor-plugin-starter/'


function copy(src, dest, condition = { extension: undefined }) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    const files = fs.readdirSync(src)
    files.map((file) => {
      const srcFilePath = path.join(src, file)
      const destFilePath = path.join(dest, file)
      copy(srcFilePath, destFilePath, condition)
    })
  } else if (
    !condition.extension ||
    (condition.extension && src.includes(condition.extension))
  ) {
    const dirPath = path.dirname(dest)
    if (fs.existsSync(dirPath)) {
      fs.copyFileSync(src, dest)
    } else {
      fs.mkdirSync(dirPath, { recursive: true })
      fs.copyFileSync(src, dest)
    }
  }
}

copy(path.resolve(__dirname, '../dist'), path.resolve(__dirname, `${nodeModulePath}/dist`))
copy(path.resolve(__dirname, '../package.json'), path.resolve(__dirname, `${nodeModulePath}/package.json`))
copy(path.resolve(__dirname, '../android'), path.resolve(__dirname, `${nodeModulePath}/android`))
copy(path.resolve(__dirname, '../ios'), path.resolve(__dirname, `${nodeModulePath}/ios`))
fs.copyFileSync(path.resolve(__dirname, '../CapacitorPluginStarter.podspec'), path.resolve(__dirname, `${nodeModulePath}/CapacitorPluginStarter.podspec`))