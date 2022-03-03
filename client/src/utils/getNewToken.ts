import axios from "axios";
import customHistory from "../components/core/CustomHistory";
import jwtDecode from "jwt-decode";
import getApiUrl from "../config/selectors/getApiUrl";
import constants from "../config/constants";
import {STORE} from "../store";

export interface JwtPayload {
  username: string;
  exp: number;
  sub: string;
}

export default async function getNewToken(): Promise<string> {
  let accessToken;

  const apiUrl = getApiUrl(constants);

  try {
    const response = await axios(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      withCredentials: true,
    });
    accessToken = response.data;
  } catch (e) {
    // 401 Unauthorized means that the refresh token either expired or was invalid
    // @ts-ignore
    if (e.response.status === 401) {
      STORE.auth.token = null;
      customHistory.push('/login');
    }
    throw e;
  }

  let jwt;
  try {
    jwt = jwtDecode<JwtPayload>(accessToken);
  } catch (e) {
    console.error('Received invalid access token from the server.');
    throw e;
  }

  // store.dispatch(setAccessToken({ accessToken, jwt }));
  return accessToken;
}