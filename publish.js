/**
 * Created by cuppi on 2017/5/26.
 */

var Client = require('/usr/local/lib/node_modules/ssh2').Client;
var conn = new Client();

conn.on('ready', function () {
    console.log('Client :: ready');
    conn.exec('cd /opt/project/NodeWorld/jbzweb-sdk && node ./publish.js', function (err, stream) {
        if (err) throw err;
        stream.on('close', function (code, signal) {
            // console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
            // conn.end();
        }).on('data', function (data) {
            console.log('更新文档成功');
        }).stderr.on('data', function (data) {
            console.log('STDERR: ' + data);
        });
    });
}).connect({
    host: '10.1.1.61',
    username: 'root',
    password: 'JBZ321*88'
});