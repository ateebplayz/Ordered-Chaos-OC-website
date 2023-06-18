'use client'
import NavBar from '@/components/navbar';
import './globals.css'
import Image from 'next/image';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { ProductHome } from '@/components/product';
const products = [
	{image: 'https://i.imgur.com/yqNy70G.jpg', title: 'Product One', price: '2399 PKR'},
	{image: 'https://i.imgur.com/l5atuNB.jpg', title: 'Product Two', price: '3999 PKR'},
	{image: 'https://i.imgur.com/zsA50c5.jpg', title: 'Product One', price: '14999 PKR'}
]
const productsEid = [
	{image: 'https://i.imgur.com/Xx301B2.jpg', title: 'Product One', price: '14999 PKR'},
	{image: 'https://i.imgur.com/ZIuBq6D.jpgg', title: 'Product Two', price: '999 PKR'},
	{image: 'https://i.imgur.com/ovpqeMi.jpg', title: 'Product Three', price: '49999 PKR'},
	{image: 'https://i.imgur.com/07XeQrP.jpg', title: 'Product Four', price: '89999 PKR'},
	{image: 'https://i.imgur.com/rZjZpvg.jpg', title: 'Product Five', price: '149999 PKR'},
]
const ProductsHome = ({products}: {products: {image: string, title: string, price: string}[]}) => {
	const productList = products.map((product) => <ProductHome product={product}/>)
	return <div className='home-featured-products-products-container'>{productList}</div>
}
export default function Home() {
	return (
		<>
			<NavBar/>
			<div className="home-container">
				<div className='home-home-container' style={{marginTop: '20vh'}}>
					<div className='home-home-subcontainer'>
						<h1 className='home-home-heading' style={{textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Welcome To</h1>
						<h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Ordered<span style={{color:'var(--primary-color)'}}>Chaos</span></h1>
						<div className='home-home-btns'>
							<button className='home-home-btn-primary'>Buy A Product</button>
							<button className='home-home-btn-secondary'>Get In Touch</button>
						</div>
					</div>
				</div>
				<div className='home-featured-products-container'>
					<div className='home-home-subcontainer'>
						<h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>View our Featured <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>Products</span></h1>
						<div className='home-featured-products-products-container'>
						<ProductsHome products={products}/>
						</div>
						<div className='home-home-btns'>
							<button style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} className='home-home-btn-secondary'><span style={{verticalAlign: 'middle'}}>View More</span> <AiOutlineArrowRight style={{verticalAlign: 'middle', marginLeft: '10px'}} size={24}/></button>
						</div>
					</div>
				</div>
				<div className='home-featured-products-container'>
					<div className='home-home-subcontainer'>
						<h1 style={{margin: '0', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>View our <span className='hover-text' style={{color:'var(--primary-color)', borderBottom: '3px solid white'}}>Eid Collection</span></h1>
						<div className='home-featured-products-products-container'>
						<ProductsHome products={productsEid}/>
						</div>
						<div className='home-home-btns'>
							<button style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} className='home-home-btn-secondary'><span style={{verticalAlign: 'middle'}}>View More</span> <AiOutlineArrowRight style={{verticalAlign: 'middle', marginLeft: '10px'}} size={24}/></button>
						</div>
					</div>
				</div>
				<div className='home-featured-products-container'>
					<div className='home-home-subcontainer'>
						<h1 style={{margin: '0', color: 'white', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000', textAlign: 'center'}}>So, what are you <span style={{color:'var(--primary-color)', textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>waiting for?</span></h1>
						<div className='home-home-btns'>
							<button style={{display:'flex', justifyContent: 'center', alignItems: 'center'}} className='home-home-btn-secondary'><span style={{verticalAlign: 'middle'}}>Buy A Product</span> <AiOutlineArrowRight style={{verticalAlign: 'middle', marginLeft: '10px'}} size={24}/></button>
						</div>
					</div>
				</div>
				<div className='home-featured-products-container' style={{padding: '20px 0'}}>
					<div className='home-home-subcontainer'>
						<p className='footer-text' style={{margin: '0', color: 'black', textAlign: 'center'}}>Copyright CC 2023. Made with Love by <span style={{color:'var(--primary-color)', textDecoration: 'none'}}><a style={{textDecoration: 'none'}} href="https://grabyourservices.com">Grab Your Services</a></span></p>
					</div>
				</div>
			</div>
			{/*<div className="home-container">
				<div className='home-home-container'>
					<div className='home-home-subcontainer'>
						<Image src="https://imagizer.imageshack.com/img924/6574/iIziI4.png" alt="People Floating" height={512} width={512}/>
					</div>
				</div>
			</div>*/}
		</>
	);
}
