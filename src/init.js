const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const vfs = require('vinyl-fs')
const through = require('through2')

function info(type, message) {
  console.log(`${chalk.green.bold(`  ${type}`)}  ${message}`)
}

function error(message) {
  console.error(chalk.red(message))
}

function success(message) {
  console.error(chalk.green(message))
}

function init({ demo, install, react }) {
  let type = 'vue-cli'
  if (react) {
    type = 'react-cli'
  }
  const cwd = path.join(__dirname, '../boilerplates', type)
  const dest = process.cwd()
  const projectName = path.basename(dest)

  if (!fs.emptyDir(dest)) {
    error('Existing files here, please run init command in an empty folder!');
    process.exit(1)
  }

  console.log(`Creating a new ${type.split('-')[0]} app in ${dest}`)
  console.log()

  // 将本地的模板转移到用户需要安装的目录下
  vfs.src(['**/*', '!node_modules/**/*'], { cwd, cwd, dot: true })
    .pipe(template(dest, cwd, projectName))
    .pipe(vfs.dest(dest, {base: true}))
    .on('end', function () {
      // info('rename', 'gitignore -> .gitignore')
      let json = fs.readFileSync(path.join(dest, 'package.json')).toString()
      console.log(json)
      json = json.replace('$$name', projectName)
      fs.writeFileSync(path.join(dest, 'package.json'), json)
      if (install) {
        info('run', 'npm install')
        // require('./install')(printSuccess)
      } else {
        printSuccess(projectName, dest)
      }
    })
}

function printSuccess(projectName, dest) {
  success(`
    Success! Created ${projectName} at ${dest}.
    Inside that directory, you can run several commands:

    We suggest that you begin by typing:

        ${chalk.yellow(`cd ${projectName}`)}
        ${chalk.yellow(`yarn start`)}
    
    Happy hacking!`);
}

function template(dest, cwd, projectName) {
  return through.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb()
    }
    info('create', path.join(projectName, file.path.replace(cwd, '')))
    this.push(file)
    cb()
  })
}

module.exports = init
