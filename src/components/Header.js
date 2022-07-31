import reddit from '../images/reddit-fake.png'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../css/Header.css'


const Header = () => {
    return (
        <div className='header-flex'>
            <div className='logo-text'>
                <img src={reddit} height="50px" /> <h1>Reddit-fake</h1>
            </div>
            <Link to='/' id='logout-link'><Button varient='secondary'>Logout</Button></Link>
        </div>
    )
}

export default Header