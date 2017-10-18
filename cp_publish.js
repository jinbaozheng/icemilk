/**
 * Created by cuppi on 2017/9/1.
 */

const exec = require('child_process').exec;
const fs = require("fs");

function _doCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error){
        reject(error);
      } else {
        resolve(stdout, stderr);
      }
    })
  })
}

function buildDist() {
  return _doCommand('npm run build');
}

function publish() {
  return _doCommand('npm publish');
}

function loadPackage() {
  return new Promise((resolve, reject) => {
    fs.readFile("./package.json", "utf-8",(error, data) => {
      if (error){
        reject(error)
      } else {
        resolve(data);
      }
    });
  });
}

function savePackage(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile("./package.json", data, (error) => {
      if (error){
        reject(error);
      } else {
        resolve();
      }
    })
  })
}

function recoverPackage(packageString) {
  savePackage(packageString).then(() => {
    console.log('恢复package');
  }, error => {
    console.log('恢复package失败: ' + error);
  })
}

//2.0.5
loadPackage().then(packageString => {
  let packageObj = JSON.parse(packageString);
  let versionList = packageObj.version.split(".");
  versionList[versionList.length - 1]++;
  packageObj.version = versionList.join(".");
  let nextPackage = JSON.stringify(packageObj, null, 1);

  savePackage(nextPackage).then(() => {
    console.log('更新package成功...');
    buildDist().then(() => {
      console.log('打包成功...');
      publish().then((stdout, stderr) => {
        console.log(stdout);
        console.log('发布成功');
      }, error => {
        console.log('发布失败:' + error);
        recoverPackage(packageString)
      })
    }, error => {
      console.log('打包失败:' + error);
      recoverPackage(packageString)
    })
  }, error => {
    console.log('更新package失败:' + error);
    recoverPackage(packageString)
  })
})


