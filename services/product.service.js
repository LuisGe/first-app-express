const {faker} = require('@faker-js/faker')

class ProductService{
  constructor(){
    this.products = []
    this.generate()
  }
  generate(){
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        index: (index + 1),
        name : faker.commerce.productName(),
        price : parseFloat(faker.commerce.price()),
        image : faker.image.imageUrl()
      })
    }
  }
  async index(size){
    if(size > 0 && size < this.products.length)
      return [...this.products].slice(0,size)
    return this.products
  }
  async find(id){
    // const something = this.something()
    return this.products.find(item => item.id == id)
  }
  async create(data){
    this.products.push({
      id: faker.datatype.uuid(),
      index: this.products.length + 1,
      ...data
    })
    return this.products[this.products.length - 1]
  }
  async update(id, data){
    let product = null
    let index = this.products.findIndex(item => item.id == id)
    if(index >= 0){
      this.products[index] = {
        ...this.products[index],
        ...data
      }
      product = this.products[index]
    }
    return product
  }
  async delete(id){
    let product = null
    let index = this.products.findIndex(item => item.id == id)
    if(index >= 0){
      product = this.products[index]
      this.products.splice(index, 1)
      this.products.forEach((item, index)=>{ item.index = (index + 1) })
    }
    return product
  }
}
module.exports = ProductService
