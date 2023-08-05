import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors,getProduct } from '../../actions/productAction';
import ProductCard from '../home/ProductCard';
import Loader from '../layout/loader/Loader';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import "./ProductDetails.css";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smart Phones",
];

const Products = () => {
    const {keyword} = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category,setCategory] = useState("");
    const [ratings,setRatings] = useState(0);

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice);
    };
    
    useEffect(( ) => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword,currentPage, price, category, ratings));
    } , [category, currentPage, dispatch, keyword, price, ratings, error, alert]);

    let count = filteredProductsCount;

  return <Fragment>
    {loading ? (<Loader/>) :<Fragment>
        <MetaData title="Products--Ecommerce"/>
        <h2 className="text-center text-gray-700 text-4xl font-medium title-font m-2 p-4">Products</h2>
        <div className='mx-auto w-4/5'>
        <hr className='border-3 border-blue-500 cursor-pointer hover:border-red-500 duration-500'></hr>
        </div>
        <div className="w-4/5 flex flex-wrap justify-center mx-auto min-h-[23rem]">
            {products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>

        <div className='md:w-32 w-52 md:absolute m-auto top-28 left-8 static'>
            <Typography>Price</Typography>
            <Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby='range-slider' min={0} max={25000} />

            <Typography>Categories</Typography>
            <ul>
                {categories.map((category) => (
                    <li className='cursor-pointer text-slate-400 hover:text-red-600' key={category} onClick={() => setCategory(category)}>
                        {category}
                    </li>
                ))}
            </ul>

            <fieldset  className='border-solid border-slate-400 border-2 p-2'>
                <legend><Typography>Ratings Above</Typography></legend>
                <Slider value={ratings} onChange={(e,newRating) => {setRatings(newRating)}} aria-labelledby="continuous-slider" min={0} max={5} valueLabelDisplay="auto" />
            </fieldset>
        </div>
            
            {resultPerPage < count && (
                <div className="w-full flex justify-center mb-5">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>
            )}

        </Fragment>}
  </Fragment>
}

export default Products