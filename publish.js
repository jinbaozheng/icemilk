/**
 * Created by cuppi on 2017/5/26.
 */

var Client = require('/usr/local/lib/node_modules/ssh2').Client;
var conn = new Client();

const exec = require('child_process').exec;

exec('npm run generate-docs', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  update();
});

function update() {
  conn.on('ready', function () {
    // console.log('Client :: ready');
    conn.exec('cd /opt/project/NodeWorld/jbzweb-sdk && node ./publish.js', function (err, stream) {
      if (err) throw err;
      stream.on('close', function (code, signal) {
        console.log('更新文档成功');
        // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        // conn.end();
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

