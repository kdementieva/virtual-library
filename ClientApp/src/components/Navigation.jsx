import { Link } from 'react-router-dom';

import mainLogo from '../assets/logo-no-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navigation({ onBasketVisibleChange }) {
  const changeBasketVisibility = () => {
    onBasketVisibleChange();
  }

  return (
    <nav className="nav">
      <img className="logo" src={mainLogo}/>
      <ul className="nav-list">
        <li>
          <Link to="/" className="home-btn">
            <FontAwesomeIcon icon="fa-solid fa-house" size="2xl" style={{color: "#411a94",}} />
          </Link>
        </li>
        <li>
          <button className="basket" onClick={changeBasketVisibility}>
            <FontAwesomeIcon icon="fa-solid fa-basket-shopping" size="2xl" style={{color: "#481a9d",}} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;