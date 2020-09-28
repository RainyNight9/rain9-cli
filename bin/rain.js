#!/usr/bin/env node
// 指定这个文件使用node执行

const program = require('commander')
const chalk = require('chalk')
const path = require('path')
const packageJson = require('../package.json')
const fs = require('fs-extra')
const spawn = require('cross-spawn')

program
  .version(packageJson.version, '-v, --version')
  .usage('<command> [options]')
  .on('--help', printHelp)
  .parse(process.argv)

const args = process.argv.slice(3)
const subcmd = program.args[0]

if (!subcmd) {
  program.help()
} else {
  const bin = executable(subcmd)
  if (bin) {
    console.log('bin', bin)
    wrap(spawn(bin, args, {stdio: 'inherit'}))
  } else {
    program.help()
  }
}

function wrap (sp) {
  sp.on('close', code => {
    process.exit(code)
  })
}

function printHelp() {
  console.log('  Commands:')
  console.log()
  console.log('    create           Init a new vuejs application in the current folder')
  console.log('    list           Init a new reactjs application in the current folder')
  console.log()
  console.log('  All commands can be run with -h (or --help) for more information.')
}

function executable (subcmd) {
  const file = path.join(__dirname, `rain-${subcmd}.js`)
  const _fs = fs
  if (fs.existsSync(file)) {
    return file
  }
}
