import styled, {createGlobalStyle} from "styled-components";
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
  ${reset}
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    color: #1a202c;
    margin: 0;
    padding: 0;
  }
  body {
    line-height: 1.5;
    letter-spacing: 0;
    background-color: #f7fafc;
  }
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1040px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 50px;
  padding-right: 50px;
  
  @media screen and (max-width: 991px) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

export default GlobalStyles;