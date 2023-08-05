const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const apiFeatures = require('../utils/apifeatures');
const cloudinary = require('cloudinary');

//Create a new product -----only admin can do this
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    let imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });

// Get all products
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new apiFeatures(Product.find(),req.query)
    .search()
    .filter()

    let products = await apiFeature.query.clone();
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;
    res.status(201).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    });
});

// Get all products (admin)
exports.getAdminProducts = catchAsyncErrors(async (req,res)=>{
    const products = await Product.find();
    res.status(201).json({
        success:true,
        products
    });
}
);

// get a single product detail
exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        product
    });
});

// update a product -----only admin can do this
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Images Start Here
    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
        
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });

//delete a product -----only admin can do this
exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    //deleting img from cloudinary
    for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
});

//create a new review or update a review
exports.createProductReview = catchAsyncErrors(async (req,res,next)=>{
    const {rating, comment, productId} = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev=>rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString() === req.user._id.toString()){
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews++;
    }

    let avg = 0;
    product.ratings = product.reviews.forEach(rev=>{avg+=rev.rating});
    
    product.ratings = avg/product.numOfReviews;

    await product.save({validateBeforeSave:false});
    res.status(201).json({
        success:true
    });
});

//get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    });
});

//delete a review
exports.deleteProductReview = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    product.reviews = product.reviews.filter(rev=>rev.user.toString() !== req.user._id.toString());
    product.numOfReviews = product.reviews.length;

    let avg = 0;
    product.ratings = product.reviews.forEach(rev=>{avg+=rev.rating});
    product.ratings = avg/product.numOfReviews;

    await product.save({validateBeforeSave:false});
    res.status(201).json({
        success:true
    });
});