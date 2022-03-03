import React from 'react';
import {StyledNavbar, NavbarContainer, NavLogo, LogoIcon} from "./Navbar.styles";
import {useLocation} from "react-router-dom";
import {STORE} from "../../../store";
import {capitalizeFirstLetter} from "../../../utils/capitalizeFirstLetter";

const Navbar = () => {
  const isAuthenticated = STORE.auth.token;
  const location = useLocation();
  const pathname = location?.pathname;
  const authSwitch: string[] = ['login', 'signup'];
  const authLink =`/${authSwitch[Number(pathname === '/login')]}`
  const authLabel = capitalizeFirstLetter(authSwitch[Number(pathname === '/login')])

  const handleLogout = () => {
    STORE.auth.token = null
  }

  return (
    <StyledNavbar>
      <NavbarContainer>
        <NavLogo to='/'>
          <LogoIcon/>
        </NavLogo>
      {isAuthenticated &&
        <NavLogo to='/login' onClick={handleLogout}>
          Logout
        </NavLogo>}
      </NavbarContainer>
    </StyledNavbar>
  )
}

export default Navbar;