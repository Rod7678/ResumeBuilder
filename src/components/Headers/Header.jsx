import siteLogo from '../../assets/Logo.png'
import Button from '../UI/Button'
import './Header.css'

export default function Header(){
    return (
        <header>
            <img src={siteLogo} alt="" />
            <div className="getStarted">
                <Button className='get-started'>Get Started</Button>
            </div>
        </header>
    )
}