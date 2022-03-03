import React from "react";
import { Link } from "react-router-dom"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PasswordStr from "./Password";
import StyledAuthForm, {AuthBox} from "./AuthForm.styles";
import {IAuthUser} from "./Auth.types";

type Props = {
  pathname: string,
  authHeader: string;
  authLink: string;
  authLabel: string;
  user: IAuthUser,
  score: number,
  btnTxt: string,
  type: string,
  onSubmit: any,
  onChange: any,
  errors: any,
  pwMask: any,
  onPwChange: any,
}

const AuthForm = ({
                    pathname,
                    authHeader,
                    authLabel,
                    authLink,
                    user,
                    score,
                    btnTxt,
                    type,
                    onSubmit,
                    onChange,
                    errors,
                    pwMask,
                    onPwChange,
                  }: Props) => {
  return (
    <AuthBox>
      <h1 style={{marginBottom: "10px"}}>{authHeader}</h1>
      <StyledAuthForm onSubmit={(event) => onSubmit({event, pathname})}>
        <TextField
          name="email"
          label="email"
          value={user.email}
          onChange={onChange}
          error={Boolean(errors?.fields && errors.fields.email.length)}
          helperText={errors?.fields && errors.fields.email.length ? errors.fields.email : ''}
        />
        <TextField
          type={type}
          name="password"
          label="password"
          value={user.password}
          onChange={onPwChange}
          error={Boolean(errors?.fields && errors.fields.password.length)}
          helperText={(errors?.fields && errors.fields.password.length) ? errors.fields.password : ''}
        />
        {pathname === '/signup' ?
          <>
            <TextField
              type={type}
              name="pwconfirm"
              label="confirm password"
              value={user.pwconfirm}
              onChange={onChange}
              error={Boolean(errors?.fields && errors.fields.pwconfirm.length)}
              helperText={errors?.fields && errors.fields.pwconfirm?.length ? errors.fields.pwconfirm : ''}/>
            <div className="pwStrRow">
              {score >= 1 && (
                <div>
                  <PasswordStr score={score} />
                  <Button
                    className="pwShowHideBtn"
                    variant="outlined"
                    onClick={pwMask}
                    style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}}>
                    {btnTxt}
                  </Button>
                </div>
              )}
            </div>
            <TextField
              type='text'
              name="firstName"
              label="first name"
              value={user.firstName}
              onChange={onChange}
              error={Boolean(errors?.fields.firstName.length)}
              helperText={errors?.fields.firstName?.length ? errors.fields.firstName : ''}/>
            <TextField
              type='text'
              name="lastName"
              label="last name"
              value={user.lastName}
              onChange={onChange}
              error={Boolean(errors?.fields.lastName.length)}
              helperText={errors?.fields.lastName?.length ? errors.fields.lastName : ''}/>
          </> :
          null}
        {/*<br />*/}
        <Button className="signUpSubmit"  variant="contained" type="submit">
          Submit
        </Button>
        { errors?.message.length ?
        <div className='errorMsg'>{errors?.message}</div> :
        <span className='errorMsg'>&nbsp;&nbsp;</span>}
      </StyledAuthForm>
      <p>
        Already have an account? <br />
        <Link to={authLink}>{authLabel}</Link>
      </p>
    </AuthBox>
  );
};

export default AuthForm;
