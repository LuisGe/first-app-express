const express = require('express')
const boom = require('@hapi/boom')
const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema')
const ProductService = require('./../services/product.service')

const router = express.Router()
const service = new ProductService()

// Middleware
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// Routes
router.get('/', async (req, res) => {
  const {size} = req.query
  const products = await service.index(size || 0)
  res.json(products)
})
router.get('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next) => {
  // Uso de Middleware de error en una ruta
  try {
    const {id} = req.params
    const product = await service.find(id)
    if(product){
      res.json(product)
    }else{
      throw boom.notFound("Product not found")
      // res.status(404).json({ message : "NOT FOUND" })
    }
  } catch (error) {
    next(error)
  }
})
router.post('/',
validatorHandler(createProductSchema, 'body'),
async (req, res) => {
  const {body} = req
  const product = await service.create(body)
  res.status(201).json({
    message : "CREATED",
    data : product
  })
})
router.put('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next)=>{
  const {body} = req
  const {id} = req.params
  const product = await service.update(id, body)
  try {
    if(product){
      res.json({
        message : "FULLY UPDATED",
        data : product
      })
    }else{
      throw boom.notFound("Product not found")
      // res.status(404).json({ message : "NOT FOUND" })
    }
  } catch (error) {
    next(error)
  }
})
router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next)=>{
  const {body} = req
  const {id} = req.params
  const product = await service.update(id, body)
  try {
    if(product){
      res.json({
        message : "UPDATED",
        data : product
      })
    }else{
      throw boom.notFound("Product not found")
      // res.status(404).json({ message : "NOT FOUND" })
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:id',
validatorHandler(getProductSchema, 'params'),
async (req, res, next)=>{
  const {id} = req.params
  const product = await service.delete(id)
  try {
    if(product){
      res.json({
        message : "DELETED",
        data : product
      })
    }else{
      throw boom.notFound("Product not found")
      // res.status(404).json({ message : "NOT FOUND" })
    }
  } catch (error) {
    next(error)
  }
})


module.exports = router
