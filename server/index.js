const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const convert = require('xml-js')
const app = express()

require('isomorphic-fetch')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  const { GOODREADS_API_KEY, IGDB_API_KEY, OMDB_API_KEY } = process.env

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.get('/api/movies', async (req, res) => {
    try {
      const query = req.query.q

      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&type=movie`
      )
      const results = await response.json()

      res.json(results)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/books', async (req, res) => {
    try {
      const query = req.query.q

      const response = await fetch(
        `https://www.goodreads.com/search.xml?key=${GOODREADS_API_KEY}&q=${query}`
      )
      const results = await response.text()
      const convertedResults = JSON.parse(
        convert.xml2json(results, {
          compact: true
        })
      )

      res.json(convertedResults)
    } catch (error) {
      throw new Error(error)
    }
  })

  app.get('/api/games', async (req, res) => {
    try {
      const query = req.query.q

      const response = await fetch(
        `https://api-v3.igdb.com/games/?search=${query}&fields=name,total_rating&filter[total_rating][not_eq]=null&limit=10`,
        {
          headers: {
            Accept: 'application/json',
            'user-key': IGDB_API_KEY
          }
        }
      )
      const results = await response.json()

      res.json(results)
    } catch (error) {
      throw new Error(error)
    }
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
