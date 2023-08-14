'use client'
import { useRouter } from 'next/navigation';
import '../globals.css'
import axios from 'axios'
import { Product } from '../../components/schemas/product'
import { User } from '../../components/schemas/user'
import React, { useEffect, useState } from 'react';
import router from 'next/dist/server/router';
import NavBar from '../../components/navbar'
import { ProductDB } from '../../components/product'
const ProductsHome = ({ products }: { products: Product[] }) => {
	const productList = products.map((product, index) => (
	  <ProductDB key={index} product={product} />
	));
	return <div className='home-featured-products-products-container'>{productList}</div>;
  };
export default function Dashboard() {
    const router = useRouter();
  const [products, setProducts] = useState([])
  let prods: Product[] = [];
  const fetchProds = async () => {
    const resp = await axios.get('http://localhost:8080/api/products')
    setProducts(resp.data.products)
  }
  fetchProds()
  const [user, setUser] = useState({username:'', password: '', code: 0});
  useEffect(() => {
    const checkToken = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/getToken/${token}`);
        const data = response.data;
        console.log(response.data)
        if (data.code === 200) {
            setUser(response.data)
        } else {
            router.push('/dashboard/');
        }
    };
    
    checkToken();
  }, []);
  return (
    <>
        <NavBar />
        <div className='home-featured-products-container'  style={{marginTop: '20vh'}}>
            <div className='home-home-subcontainer'>
                <h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>View a <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>Product</span></h1>
                <ProductsHome products={products}/>
            </div>
        </div>
    </>
  );
}
