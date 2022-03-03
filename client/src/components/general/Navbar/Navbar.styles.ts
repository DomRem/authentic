import styled from "styled-components";
import { Container } from "../../../globalStyles";
import { AiFillHome } from "react-icons/ai"
import { BiLogOutCircle } from "react-icons/bi"
import { Link } from "react-router-dom"
import {HiHome} from "react-icons/hi";

export const StyledNavbar = styled.nav`
  background: #101522;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  height: 80px;
  ${Container}
`;

export const NavLogo = styled(Link)`
  text-decoration: none;
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;


export const NavIcon = styled(AiFillHome)`
  font-size: 2rem;

`;

export const LogoutIcon = styled(BiLogOutCircle)`
  font-size: 2rem;
`;

export const LogoIcon = styled(HiHome)`
  font-size: 2rem;
`;

