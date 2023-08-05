const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description:{
        type: String,
        required: [true, 'Please add product description']
    },
    price:{
        type: Number,
        required: [true, 'Please add product price'],
        maxLength: [10, 'Price cannot be more than 10 digits']
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id: {
                type: String,
                required: [true, 'Please add product image']
            },
            url: {
                type: String,
                required: [true, 'Please add product image url']
            }
        }
    ],
    category:{
        type: String,
        required: [true, 'Please add product category']
    },
    stock:{
        type: Number,
        required: [true, 'Please add product stock'],
        maxLength: [4, 'Stock cannot be more than 4 characters'],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true//for checking who add a product
                //product id = product user column id
            },
            name:{
                type: String,
                required: [true, 'Please add review name']
            },
            rating:{
                type: Number,
                required: [true, 'Please add review rating']
            },
            comment:{
                type: String,
                required: [true, 'Please add review comment']
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true//for checking who add a product
        //product id = product user column id
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);