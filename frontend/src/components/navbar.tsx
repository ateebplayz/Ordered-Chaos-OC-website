'use'
import Link from "next/link"
import { useState, useEffect } from "react";
import { AiFillHome, AiFillProject } from 'react-icons/ai'
import { BsFillPersonFill,BsFillChatFill, BsFillCartFill } from 'react-icons/bs'
export default function NavBar() {
	const [activePage, setActivePage] = useState('')
	const [isScrolled, setIsScrolled] = useState(false)
	useEffect(() => {
		const handleScroll = () => {
		  // Check the vertical scroll position of the page
		  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		  
		  // Update the isScrolled state based on the scroll position
		  setIsScrolled(scrollTop > 0);
		};
	
		// Immediately call handleScroll to set initial isScrolled state
		handleScroll();
	
		// Add the event listener to the window object
		window.addEventListener('scroll', handleScroll);
	
		// Clean up the event listener when the component is unmounted
		return () => {
		  window.removeEventListener('scroll', handleScroll);
		};
	  }, []);	
	useEffect(() => {
		const currentPath = window.location.pathname;
		setActivePage(currentPath);
	}, []);
	const getPathVal = (path: string) => {
		if(path === activePage) return 'navbar-btn-active';
		return 'navbar-btn-disabled';
	}
	return (
		<div className={`navbar-container${isScrolled ? ' scrolled' : ''}`}>
			<div className="navbar-left">
				<div className="navbar-left-uwu">
					<Link className={getPathVal('/')} href="/">
						<p>Home</p>
					</Link>
					<Link className={getPathVal('/products')} href="/products">
						<p>Products</p>
					</Link>
					<Link className={getPathVal('/contact')} href="/contact">
						<p>Contact</p>
					</Link>
				</div>
			</div>
			<div className="navbar-middle">
				<Link style={{textDecoration: 'none', color: 'white'}} href="/">
					<p className={`navbar-name	${isScrolled ? '' : ''}`} style={{textShadow:'-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Ordered<span className={`navbar-text${isScrolled ? ' scrolled' : ''}`}>Chaos</span></p>
				</Link>
			</div>
			<div className="navbar-right">
				<div style={{marginLeft: '10rem', width: '100%',height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
					<Link className="navbar-btn-active" href="/login">
						<p>Login</p>
					</Link>
					<Link className={`navbar-btn-primary${isScrolled ? ' scrolled' : ''}`} href="/signup">
						<p>Cart</p>
					</Link>
				</div>
			</div>
			<div className="navbar-mobile">
				<div className="navbar-ic">
					<AiFillHome color="#fff" size={20}/>
				</div>
				<div className="navbar-ic">
					<AiFillProject color="#fff" size={20}/>
				</div>
				<div className="navbar-ic">
					<BsFillChatFill color="#fff" size={20}/>
				</div>
				<div className="navbar-ic">
					<BsFillPersonFill color="#fff" size={20}/>
				</div>
				<div className="navbar-ic">
					<BsFillCartFill color="#fff" size={20}/>
				</div>
			</div>
		</div>
	);
}