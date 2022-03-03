import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import zxcvbn from 'zxcvbn';
import jwtDecode, {JwtPayload} from "jwt-decode";
import getApiUrl from "../../config/selectors/getApiUrl";
import constants from "../../config/constants";
import {
  IValidation,
  validateLoginForm,
  validateSignUpForm
} from "../../utils/validators";
import {capitalizeFirstLetter} from "../../utils/capitalizeFirstLetter";
import AuthForm from "./AuthForm";
import {AuthProps, HistoryParams, IAuthUser} from "./Auth.types";
import {STORE} from "../../store";

const apiUrl = getApiUrl(constants);

const Auth = () => {
    const history = useHistory<HistoryParams>();
    const pathname = history.location?.pathname;
    const redirectUrl = history?.location?.state?.from?.pathname;
    const authSwitch: string[] = ['login', 'sign up'];
    const authLink =`/${authSwitch[Number(pathname === '/login')].replace(/\s+/g, '')}`
    const authHeader = capitalizeFirstLetter(authSwitch[Number(pathname === '/signup')])
    const authLabel = capitalizeFirstLetter(authSwitch[Number(pathname === '/login')])

    const initialUserFields = {
      email: '',
      password: '',
      pwconfirm: '',
      lastName: '',
      firstName: '',
    }

    const initialErrorObj = {
      success: true,
      message: '',
      fields: initialUserFields,
    };

    const [errors, setErrors] = useState<IValidation>(initialErrorObj);
    const [user, setUser] = useState<IAuthUser>(initialUserFields);
    const [btnTxt, setBtnTxt] = useState<string>('show');
    const [type, setType] = useState<string>('password');
    const [score, setScore] = useState<number>(0);

  // @ts-ignore
  const handleChange = (event) => {
    const name: string = event.target.name;
    const value = event.target.value;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // @ts-ignore
  const pwHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (event.target.value === "") {
      setScore(0)
    } else {
      const pw = zxcvbn(event.target.value);
      setScore(pw.score + 1)
    }
  }

  const handleAuth = async ({pathname, user}: AuthProps) => {
    try {
      const response = await axios(`${apiUrl}${pathname}`, {
        method: 'POST',
        withCredentials: true,
        data: user,
      });
      const accessToken = await response.data;
      // Testing is token is valid
      jwtDecode<JwtPayload>(accessToken, {header: true});
      // dispatch(setAccessToken({ accessToken, jwt }));
      STORE.auth.token = accessToken
      history.push(redirectUrl || '/');
    } catch (e) {
      // @ts-ignore
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        // setErrors({ message: 'Invalid email or password' });
        setErrors((prevState) => ({
          ...prevState,
          // @ts-ignore
          message: e.response.data?.errors[0].msg,
        }));
        console.log({ message: e.response.data?.errors[0].msg });
      } else {
        setErrors((prevState) => ({
          ...prevState,
          // @ts-ignore
          message: e.response.data?.errors[0].msg,
        }));
        // @ts-ignore
        console.log(`Unknown err: ${e.response.data?.errors[0].msg}`);
      }
      // dispatch(clearAccessToken());
      STORE.auth.token = null;
    }
  };

  // @ts-ignore
  const validateForm = async ({event, pathname}: LoginProps) => {
    event.preventDefault();
    const payload = pathname === '/signup' ? validateSignUpForm(user) : validateLoginForm(user);
    if (payload.success) {
      setErrors(initialErrorObj)
      await handleAuth({pathname, user});
    } else {
      setErrors(payload)
    }
  }

  // @ts-ignore
  const pwMask = (event) => {
    event.preventDefault();
    setType(type === "password" ? "input" : "password")
    setBtnTxt(btnTxt === "show" ? "hide" : "show");
  }

  return (
    <div>
      <AuthForm
        authHeader={authHeader}
        authLabel={authLabel}
        authLink={authLink}
        onSubmit={validateForm}
        onChange={handleChange}
        onPwChange={pwHandleChange}
        errors={errors}
        user={user}
        score={score}
        btnTxt={btnTxt}
        type={type}
        pwMask={pwMask}
        pathname={pathname}
      />
    </div>
  );
}

export default Auth;
