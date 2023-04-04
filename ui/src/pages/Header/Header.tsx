import { Link } from 'react-router-dom';
import './Header.css';
import logo from './logo.svg';

export default function Header() {
    return (
        <header className="AppHeader">
            <h1>
                <Link to="/">
                    <img src={logo} alt="logo" />
                    Oxidation State App
                </Link>
            </h1>
            <p>
                <Link to="/">About us</Link>
            </p>
        </header>
    );
}
