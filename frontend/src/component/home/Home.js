import React, {useEffect} from 'react';
import "./home.css";
import Product from "./ProductCard.js";
import MetaData from '../../component/layout/MetaData.js';
import { clearErrors, getProduct } from '../../actions/productAction';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {loading, error, products} = useSelector(state => state.products);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch,error,alert]);

  return (
      <>
      {loading? <Loader/> : (
      <>
        <MetaData title="Ecommerce" />
        <div className="banner">
            <p className='text-lg mb-3'>Welcome To ecommerce</p>
            <h1 className="font-bold text-xl mb-3">Find amazing products below.</h1>

            <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:translate-y-4 transition duration-700 ease-in-out focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Scroll Down</button>
        </div>

        <h2 className="homeHeading">Featured Products</h2>

        <div className="container" id="container">
            {products && products.map(product => 
            <Product key={product._id} product={product} />
            )}
        </div>
    </>)
    }
    </>
  )
}

export default Home