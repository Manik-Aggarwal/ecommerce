import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/loader/Loader.js";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if(product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  }
  const decreaseQuantity = () => {
    if(quantity <= 1) return;
    const qty = quantity - 1;
    setQuantity(qty);
  }

  const { id } = useParams();

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item added to cart");
  }

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "medium",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {loading ? (<Loader/>) :
      (
      <section className="text-gray-600 body-font overflow-hidden">
        <MetaData title={`${product.name}--Ecommerce`}/>
      <div className="container px-3 py-24 mx-auto bg-indigo-50 rounded-lg">
        <div className="lg:w-4/5 flex flex-wrap">
          <div className="carimg">
            <Carousel>
              {product.images &&
              product.images.map((item, i) => (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
              ))}
            </Carousel>
          </div>
          <div className="md:w-1/2 w-full md:pl-9 md:py-5 mt-5 md:mt-0 grid content-around">
            <div className="productname">
              <h1 className="text-xl font-bold text-gray-500">
                {product.name}
              </h1>
            </div>
            <div className="productid">
              <h4 className="text-sm title-font text-gray-500 tracking-widest">
                {product._id}
              </h4>
            </div>
            <hr></hr>
            <div className="starsandreviews">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <hr></hr>
            <div className="flex inputandcart justify-between">
                <div className="inputbtn">
                  <button className="bg-black w-4 text-white" onClick={decreaseQuantity}>-</button>
                  <input className="w-8 p-1 text-center" value={quantity} readOnly type="number" />
                  <button className="bg-black w-4 text-white" onClick={increaseQuantity}>+</button>
                </div>
                <div className="addtocartbtn"  onClick={addToCartHandler}>
                    <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" disabled={product.Stock < 1 ? true : false}>Add to Cart</button>
                </div>
            </div>
            <div className="detailsBlock-3">
              <h1 className="productPrice font-bold text-3xl">{`₹${product.price}`}</h1>
              <hr></hr>
              <p className="text-lg font-semibold">
                Status :
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? " Out Of Stock" : " In Stock"}
                </b>
              </p>
              <hr></hr>
            </div>
            <div className="descriptionbox m-3 text-md">
              Description : <h4>{product.description}</h4>
            </div>
            <div className="submit-review mb-5">
              <button type="button" onClick={submitReviewToggle} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit Review</button>
            </div>
            <div className="features flex gap-4 justify-around">
                <div className="rounded-lg">
                  <CurrencyRupeeIcon className="productdetailicon text-green-800" />
                  <p>Pay on Delivery</p>
                </div>
                <div className="rounded-lg">
                    <AcUnitIcon className="productdetailicon text-green-800" />
                  <p>14 Days Replacement</p>
                </div>
                <div className="rounded-lg">
                    <DirectionsBusFilledIcon className="productdetailicon text-green-800" />
                  <p>Trusted Delivery</p>
                </div>
                <div className="rounded-lg">
                    <PlaylistAddCheckCircleIcon className="productdetailicon text-green-800" />
                  <p>1 Year Warranty</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-3xl text-center m-auto border-b-4 border-indigo-500 w-1/2 pb-2 font-bold mb-3">Reviews</h3>

      <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                name="unique-rating"
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog> 

          {product.reviews && product.reviews[0] ? (
            <div className="reviews flex overflow-auto">
              {product.reviews.map((review,i) => <ReviewCard key={i} review = {review}/>)}
            </div>
          ) : (
            <p className="noReviews font-semibold text-2xl text-gray-400 text-center p-7">No Review Yet </p>
          )}
    </section>)}
    </>
  );
};

export default ProductDetails;