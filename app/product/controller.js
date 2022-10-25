const { ObjectID } = require('bson')
const fs = require('fs')
const path = require('path')
const Product = require('../../models/Product')

const index = async (req, res) => {
  try {
    const result = await Product.find()
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const view = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const result = await Product.findOne({ _id: ObjectID(id) })
    res.json(result)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
const store = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body

    const image = req.file
    if (image) {
      const target = path.join(__dirname, '../../uploads', image.originalname)
      fs.renameSync(image.path, target)
      const result = await new Product({
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:8000/public/${image.originalname}`,
      }).save()

      res.json({
        status: 'ok',
        message: 'Product berhasil ditambahkan.',
      })
    } else {
      await new Product({
        name,
        price,
        stock,
        status,
      }).save()

      res.json({
        status: 'ok',
        message: 'Product berhasil ditambahkan.',
      })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { name, price, stock, status } = req.body
    const image = req.file
    if (image) {
      await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        stock,
        status,
        image_url: `http://localhost:8000/public/${image.originalname}`,
      })
      res.json({ status: 'ok', message: 'Product berhasil diupdate.' })
    } else {
      await Product.findByIdAndUpdate(req.params.id, {
        name,
        price,
        stock,
        status,
      })
      res.json({ status: 'ok', message: 'Product berhasil diupdate.' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const destroy = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id)
    res.json({ status: 'ok', message: 'Product berhasil dihapus.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = { index, view, store, update, destroy }
