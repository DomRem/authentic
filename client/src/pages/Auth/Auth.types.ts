export interface IAuthUser {
  email: string;
  password: string;
  pwconfirm?: string;
  lastName?: string;
  firstName?: string;
}

export type AuthProps = {
  pathname: string,
  user: IAuthUser
}

export type HistoryParams = {
  from: {
    pathname: string;
  };
};
