import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { productData } from '../../Static/Data';
import ProductDetails from "../../components/ProductDetails/ProductDetails.jsx";
import SuggestedProduct from "../../components/SuggestedProduct/SuggestedProduct.jsx"
import useFetch from '../../customHooks/useFetch.js';

const ProductDetailsPage = ({count,decrementQuantity,incrementQuantity,open,setOpen}) => {
    const {name} = useParams();
    // const encodedName = encodeURIComponent(name.replace(/\//g, '~').replace(/–/g, '!'));
    // const encodedName = encodeURIComponent(name);
    const data = useFetch(`api/products/${name}`);



  return (
    <div>
      <ProductDetails data={data} count={count}
      decrementQuantity={decrementQuantity} incrementQuantity={incrementQuantity}/>
      {
      data && <SuggestedProduct data={data} open = {open} setOpen = {setOpen}/>
    }
    </div>
  )
}

export default ProductDetailsPage
