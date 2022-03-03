import {JwtPayload} from "jwt-decode";

interface IStore {
  auth: {
    token: string | null;
    jwt: JwtPayload | null;
  }
}

export const STORE: IStore = {auth: {token: null, jwt: null}};