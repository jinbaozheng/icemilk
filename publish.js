/**
 * Created by cuppi on 2017/5/26.
 */

const Client = require('/usr/local/lib/node_modules/ssh2').Client;
const conn = new Client();
const path = require('path');

const exec = require('child_process').exec;
const comment = path.resolve(__dirname, './comment')

exec('npm run generate-docs', {cwd: comment}, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  commitDoc();
});


function commitDoc() {
  exec('git add comment/*', (error, stdout, stderr) => {
    exec('git commit comment/* -m "commit doc comment"', (error, stdout, stderr) => {
      if (error) {
        console.log('提交失败');
        console.error(`exec error: ${error}`);
        updateDoc();
        return;
      }
      exec('git push origin jbz/master:master', (error, stdout, stderr) => {
        if (error) {
          console.log('推送远程库失败');
          console.error(`exec error: ${error}`);
        } else {
          console.log('推送远程库成功...');
        }
        updateDoc();
      });
    });
  });
}

function updateDoc() {
  console.log('开始更新文档...');
  conn.on('ready', function () {
    // console.log('Client :: ready');
    conn.exec('cd /opt/project/NodeWorld/jbzweb-sdk && node ./publish.js', function (err, stream) {
      if (err) throw err;
      stream.on('close', function (code, signal) {
        console.log('更新文档成功');
        // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', function (data) {
      }).stderr.on('data', function (data) {
        console.log('STDERR: ' + data);
      });
    });
  }).connect({
    host: '10.1.1.61',
    username: 'root',
    password: 'JBZ321*88'
  });
}

