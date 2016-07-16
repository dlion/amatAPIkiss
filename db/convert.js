'use strict'

const csvjson = require('csvjson')
const fs = require('fs')
const path = require('path')

fs.readdirSync('./').map((file) => {
  if (file !== 'convert.js') {
    let name = file.split('.')[0].toString()
    let data = fs.readFileSync(path.join(__dirname, file), { encoding: 'utf8' })
    let result = {}
    result[name] = csvjson.toObject(data)
    fs.writeFile(file + '.json', JSON.stringify(result), 'utf-8', (err) => console.log('File ' + file))
  }
})
