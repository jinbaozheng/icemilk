/**
 * Created by cuppi on 2017/9/1.
 */

const exec = require('child_process').exec;
const program = require('commander');

program
  .version('1.0.0')
  .option('-s, --simple', '生成基本模板')
  .option('-c, --complex', '生成复杂模板', 'complex')
  .parse(process.argv);

let command = null;
if (program.simple){
  console.log('  - 基本模板');
  command = 'jsdoc -c jsdoc.config.json --destination ./comment -R README.md -r .';
}

if (program.complex){
  console.log('  - 复杂模板');
  command = 'jsdoc -c jsdoc.config.json --destination ./comment -t ./node_modules/ink-docstrap/template -R README.md -r .';
}

if (!command){
  console.log('  - 默认模板');
  command = 'jsdoc -c jsdoc.config.json --destination ./comment -t ./node_modules/ink-docstrap/template -R README.md -r .';
}

exec(command, function (error, stdout, stderr) {
  if (error){
    console.log('模板生成失败');
  } else {
    console.log('模板生成成功');
    console.log(stdout);
  }
})
