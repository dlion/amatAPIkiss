'use strict'

const restify = require('restify')
const low = require('lowdb')
const read = require('lowdb/lib/file-sync').read
const fs = require('fs')

// Read dbs
let DBS = {}
let routes = []
fs.readdirSync('./db').map((file) => {
  const splitto = file.toString().split('.txt.json')
  if (splitto.length === 2) {
    routes.push(splitto[0])
    DBS[splitto[0]] = low(`./db/${file}`, { storage: { read: read } })
  }
})

// RESTIFY
const server = restify.createServer({'name': 'AmatAPIkiss'})
server.pre(restify.pre.userAgentConnection())
server.pre(restify.pre.sanitizePath())
server.use(restify.gzipResponse())

// Lists of all routes
server.get('/', (req, res, next) => {
  res.json(201, { routes: routes })
  next()
})

// All basic routes
server.get('/:name', (req, res, next) => {
  const name = req.params.name.toString().toLowerCase()
  if (DBS.hasOwnProperty(name)) {
    res.json(201, DBS[name].get(name).value())
  } else {
    res.json(404, new Error('Routes not found'))
  }
  next()
})

// Find through key:value
server.get('/:name/:key/:value', (req, res, next) => {
  const name = req.params.name.toString().toLowerCase()
  if (DBS.hasOwnProperty(name)) {
    const key = req.params.key.toString().toLowerCase()
    const value = req.params.value.toString()
    const ris = DBS[name].get(name).filter({ [key]: value }).value()
    if (!ris) {
      res.json(404, { message: `${key}:${value} not found in the dataset` })
    } else {
      res.json(201, ris)
    }
  } else {
    res.json(404, new Error('Routes not found'))
  }
  next()
})

// Start
server.listen(3000, () => console.log('%s listening at %s', server.name, server.url))
