const express = require('express')

const productsRouter = require('./products.router')
const categoriesRouter = require('./categories.router')

const routerApi = (app) => {
  const router = express.Router()
  // Uso de rutas previo a ruta global
  // app.use('/products',productsRouter)
  // app.use('/categories',categoriesRouter)
  app.use('/api/v1',router) // Ruta global

  router.use('/products',productsRouter)
  router.use('/categories',categoriesRouter)
}
module.exports = routerApi
