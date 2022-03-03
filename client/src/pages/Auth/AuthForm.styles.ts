import styled from "styled-components";

export const AuthBox = styled.div`
  width: 50%;
  text-align: center;
  position: relative;
  left: 50%;
  transform: translate(-50%, 20%);
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 15px 2px rgba(16, 21, 34, 0.67);

  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const StyledAuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  .signUpSubmit {
    margin: 10px 0 0 0;
  }

  .pwStrRow {
    width: 65%;
    text-align: left;
    margin: auto;
    padding: 0;
    font-size: 12px;
  }

  .pwStrWeak {
    display: inline-block;
    position: relative;
    left: 0;
    padding: 0;
    margin: 0;
    color: gray;
  }

  .pwStrStrong {
    display: inline-block;
    position: relative;
    left: 77%;
    padding: 0;
    margin: 0;
    color: gray;
  }
  
  .errorMsg {
    color: #d32f2f; 
    margin-bottom:10px; 
    line-height:1
  }
`;


export default StyledAuthForm;