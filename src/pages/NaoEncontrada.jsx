import { Link } from 'react-router-dom';
import Img from './assets/404.png'
import './css/naoencontrada.css'

export default function NaoEncontrada() {
    return (
        <div className='container'>
            <Link to='/login'>
                <img className='img-404' src={Img} alt="404" />
            </Link>
        </div>
    );
}

const styles = {
    container: {
        padding: '10px 15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '25px',
    },
    img: {
        width: '50%'
    }
};

