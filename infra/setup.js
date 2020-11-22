#!/usr/bin/env node

const {  spawn, spawnSync } = require("child_process")
const fs = require('fs');
const path = require('path');

(function start(){
    const scriptsDist = path.resolve(__dirname, './dist') 
    if (fs.existsSync(scriptsDist)){
        fs.readdirSync(scriptsDist).forEach(file => {
            fs.unlinkSync(path.join(scriptsDist, file));
        })
    } else {
        fs.mkdirSync(scriptsDist);
    }
    const com = spawn('tsc', ['--build', path.resolve(__dirname, './tsconfig.json')]);
    com.stdout.on('data', function(data){
        console.log(data.toString());
    })
    com.stderr.on("data", function (data) {
      console.error(data.toString());
    });
    com.on('close', () => {
        console.log(`ts compiler finished`)
        fs.readdirSync(scriptsDist).forEach(file => {
            const filePath = path.join(scriptsDist, file);
            console.log(`granting permission to: ${filePath}`);
            fs.chmodSync(filePath, 999)
        })
    })
})()