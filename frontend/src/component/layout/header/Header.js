import React from 'react';
import { useEffect, useState } from 'react';
import "./Header.css";
import { CSSTransition } from "react-transition-group";
import SearchIcon from "@material-ui/icons/Search";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Menu from "../../../images/menu.png"

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      {/* <img src={require("../assets/logo.png")} className="Logo" alt="logo" /> */}
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <Link to="/" onClick={()=> setNavVisibility(false)}>Home</Link>
          <Link to="/products" onClick={()=> setNavVisibility(false)}>Products</Link>
          <Link to="/about" onClick={()=> setNavVisibility(false)}>About</Link>
          <Link to="/contact" onClick={()=> setNavVisibility(false)}>Contact</Link>
          <div>
            <Link className='p-1' to="/search" onClick={()=> setNavVisibility(false)}><SearchIcon/></Link>
          <Link className='p-1' to="/login" onClick={()=> setNavVisibility(false)}><AccountBoxIcon/></Link>
          <Link className='p-1' to="/cart" onClick={()=> setNavVisibility(false)}><ShoppingCartIcon/></Link>
          </div>
          
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        <img src={Menu} alt="menu" />
      </button>
    </header>
  );
}