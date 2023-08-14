'use client'
import NavBar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import '../globals.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { dbUrl } from '@/components/url';

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState('test');
  const [password, setPassword] = useState('test');
  const [shake, setShake] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleBtnClick = async () => {
    const response = await axios.get(`http://localhost:8080/api/getUser/${username}/${password}`);
    const user = response.data;
    
    if (user.code === 200) {
      localStorage.setItem("token", user.token);
      router.push('/dashboard/main');
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 500);
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
	  if (token == 'null') {

	  } else {
		const response = await axios.get(`http://localhost:8080/api/getToken/${token}`);
		const data = response.data;
    console.log(response, data)
		if (data.code === 200) {
		  router.push('/dashboard/main');
		}
	  }
    };
    
    checkToken();
  }, []);
  return (
    <>
      <NavBar />
      <div className={`home-home-container ${shake ? 'shake-animation' : ''}`} style={{ height:'fit-content', padding: '60px 0',marginTop: '20vh' }}>
        <div className='home-home-subcontainer'>
          <h1 className='home-home-heading' style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Login To</h1>
          <h1 style={{ margin: '0', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Ordered<span style={{ color: 'var(--primary-color)' }}>Chaos</span></h1>
          <div className='home-home-btns'>
            <input placeholder='Username' onChange={handleUsernameChange} className='dashboard-dashboard-input-one'></input>
            <input type="password" placeholder='Password' onChange={handlePasswordChange} className='dashboard-dashboard-input'></input>
          </div>
          <div className='home-home-btns' style={{ marginTop: '20px' }}>
            <button onClick={handleBtnClick} className='dashboard-dashboard-btn-primary'>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
