import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

import './index.css'

const Home =(props)=>{
    const navigate= useNavigate()
    const onLogout=()=>{
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true }) 
    }


    return(
    <div className="home-container">
        <div className='background-image-container'>
            <nav className='navbar'>
                <h1>logo</h1>
                <ul className='link-items'>
                    <li><a href='/'>Home</a></li>
                     <li><a href='/'>About</a></li>
                </ul>
                <button className='logout-btn' onClick={onLogout} >Logout</button>

            </nav>

        <div className='landing-section'>
            <h1>Landing Page <br/> Abstract Background</h1>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text
                 ever since the 1500s, when an unknown printer took a galley of 
                 type and scrambled it to make a type specimen book. It has 
                 survived not only five centuries, but also the leap into 
                 electronic typesetting, remaining essentially unchanged. 
            </p>
            <div className='btn-container'>
                <button className='btn btn-apply' >Apply Now</button>
                <button className='btn btn-learn' >Learn More</button>
            </div>
        </div>
        </div>
    
    </div>
    )
}


export default Home