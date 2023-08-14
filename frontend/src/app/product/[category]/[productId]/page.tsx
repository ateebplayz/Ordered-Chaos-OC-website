'use client'
import NavBar from "@/components/navbar"
import '../../../globals.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Product } from "@/components/schemas/product"
import { convertToTitleCase } from "@/components/product"
import { AiOutlineShoppingCart, AiOutlineHeart} from 'react-icons/ai'
const initialProd: Product = {
  id: '',
  title: '',
  description: '',
  images:[''],
  inStock: '',
  inSale: '',
  featured: ' ',
  special: '',
  price: '',
  discountedPrice: '',
}
function getLastWordWithCapital(str: string) {
  const words = str.split('-');
  const lastWord = words[words.length - 1];
  return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
}
export default function Page({ params }: { params: { category: string, productId: string, } }) {
  const router = useRouter()
  const [product, setProduct] = useState(initialProd)
  const fetchProduct = async () => {
    const prod = await axios.get(`http://localhost:8080/api/product/${params.productId}/${params.category}`)
    if(prod.data.code == 200) {
      setProduct(prod.data.product)
    } else {
      router.push('/404')
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])
  return(
    <>
      <NavBar/>
        <div className='home-featured-products-container'  style={{marginTop: '20vh'}}>
            <div className='home-home-subcontainer'>
              <h1 style={{margin: '0', marginBottom: '40px', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>View a <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>Product</span></h1>
              <div className="product-page-container">
                <div className='product-page-left'>
                  {product.images && product.images.length > 0 && (
                    <Image className="product-page-img" src={product.images[0]} alt='Product Image' width={500} height={500} />
                  )}
                </div>
                <div className='product-page-right'>
                  <h2 style={{margin: '0', marginTop:'40px', marginBottom: '0 ', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}><span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>{product.title}</span></h2>
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <h4 style={{marginTop: '15px', marginBottom: '15px', textAlign: 'center', width: 'fit-content', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '5px', backgroundColor: 'white'}}>{product.price} PKR</h4>
                    <h4 style={{marginLeft: '10px',marginTop: '15px', marginBottom: '15px', textAlign: 'center', width: 'fit-content', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '5px', backgroundColor: 'white'}}>{product.description}</h4>
                    <h4 style={{marginLeft: '10px',marginTop: '15px', marginBottom: '15px', textAlign: 'center', width: 'fit-content', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '5px', backgroundColor: 'white'}}>{convertToTitleCase(product.special)}</h4>
                    <h4 style={{marginLeft: '10px',marginTop: '15px', marginBottom: '15px', textAlign: 'center', width: 'fit-content', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '5px', backgroundColor: 'white'}}>{convertToTitleCase(getLastWordWithCapital(product.id))}</h4>
                  </div>
                  <h4 style={product.inStock ? { marginBottom: '15px', marginTop: '0', textAlign: 'center', width: 'fit-content', color: 'black', padding: '5px 15px', border: '2px solid black',borderRadius: '5px', backgroundColor: 'lightgreen'} : { marginBottom: '15px', marginTop: '0', textAlign: 'center', width: 'fit-content', color: 'white', padding: '5px 15px', border: '2px solid black',borderRadius: '5px', backgroundColor: 'red'} }>{product.inStock ? 'In Stock!' : 'Not in Stock'}</h4>
                  <div className='home-home-btns' style={{display: 'flex', flexDirection: 'row', marginTop: '0'}}>
                    <button disabled={product.inStock ? true : false} style={product.inStock ? {display:'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', opacity: '1'} : {opacity: '0.8',display:'flex', cursor: 'not-allowed',justifyContent: 'center', alignItems: 'center'} } className='home-home-btn-secondary'><span style={{verticalAlign: 'middle'}}>Add To Cart</span><AiOutlineShoppingCart style={{marginLeft: '10px'}} size={24} color= '#000'/></button>
                    <button style={{display:'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', opacity: '1', width: 'fit-content', backgroundColor: 'red', marginLeft: '15px'}} className='home-home-btn-secondary'><AiOutlineHeart size={24} color= 'white'/></button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}