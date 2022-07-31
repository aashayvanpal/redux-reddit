import { Button } from 'react-bootstrap'
import '../css/LoginPage.css'
import reddit from '../images/reddit-fake.png'

// clientID for reddit dev to be used here process.env.CLIENT_ID
var clientID = "UljU99t3hulMhdrVGKjN1w"

const LoginForm = () => {
    const redirectUser = async () => {
        window.open(`https://www.reddit.com/api/v1/authorize?client_id=${clientID}&response_type=code&state=statecheck&redirect_uri=http://localhost:3000/home&duration=permanent&scope=identity,save,edit,submit,mysubreddits,read`, "_self")
    }
    return <div className='center-container'>
        <img src={reddit} id='reddit-image' />
        <Button onClick={redirectUser}> Login with Reddit</Button>
    </div >
}

export default LoginForm
