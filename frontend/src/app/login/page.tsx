'use client'
import NavBar from '@/components/navbar';
import '../globals.css'
export default function Login() {
	return (
		<>
			<NavBar/>
			<div className="home-container">
				<div className='home-home-container'>
					<div className='home-home-subcontainer'>
						<h1 style={{margin: '0'}}>Quark<span style={{color:'var(--primary-color)'}}>Zy</span> Login</h1>
					</div>
				</div>
			</div>
		</>
	);
}
