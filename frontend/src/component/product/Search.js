import React, { Fragment, useState } from 'react'
import Header from '../layout/header/Header';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {
    let navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products");
        }
    }

  return (
    <Fragment>
        <MetaData title="Search--Ecommerce"/>
        <form className='w-full h-full fixed flex justify-center items-center bg-[#dcfce7]' onSubmit={searchSubmitHandler}>
            <Header/>
            <input className='rounded-lg p-5 w-1/2 shadow-2xl' type="text" placeholder="Search a product..." onChange={(e) => setKeyword(e.target.value)} />
            <input className='p-5 cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800' type="submit" value="Search"/>
        </form>
    </Fragment>
    )
}

export default Search;