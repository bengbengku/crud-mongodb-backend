const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'field nama tidak boleh kosong.'],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 1000,
      max: 100000000,
    },
    stock: Number,
    status: {
      type: Boolean,
      default: true,
    },
    image_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Product', productSchema)
