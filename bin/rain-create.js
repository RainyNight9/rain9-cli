#!/usr/bin/env node
// 指定这个文件使用node执行

const program = require('commander')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

const error = chalk.red

program
  .usage('<projectName> [options]')
  .option('--vue', 'Creates a new vuejs application')
  .option('--react', 'Creates a new reactjs application')
  .on('--help', () => {
    console.log('  Commands:')
    console.log()
    console.log()
    console.log('  All commands can be run with -h (or --help) for more information.')
  })
  .parse(process.argv)

if (!program.args[0]) {
  program.help()
} else {
  // 获取当前的目录
  const dest = path.join(process.cwd(), program.args[0])
  if (fs.existsSync(dest)) {
    console.error(error('Existing directory here, please run new command for an empty folder!'))
    process.exit(1)
  }
  fs.ensureDirSync(dest)
  process.chdir(dest)
  require('../src/init')(program)
}
