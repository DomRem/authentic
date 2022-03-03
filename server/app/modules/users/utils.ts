import {compare,} from 'bcrypt';
import {IUser} from "./types";

export const validateUserPasswordHash = async ({email, password}, users: IUser[]) => {
  const user = users.find(user => user.email === email);
  if (user && await compare(password, user.password)) return user;
  return null;
}

export const getUserNotFoundMessage = (method: string): string => {
  return `Could not perform the ${method} request. User not found!`
}

// TODO: delete this link when done:
//  https://stackoverflow.com/questions/65908610/express-validator-how-to-make-conditional-validations-based-on-other-fields
export const validateByEmailUserNotExists = (email, users: IUser[]) => {
  const existingUser = users.find(user => user.email === email);
  if (existingUser) throw new Error('Email already exists')
  return true;
}

export const validateByIdUserExists = (id, req, users: IUser[]) => {
  const existingUser = users.find(user => user.id === id);
  if (!existingUser) throw new Error(getUserNotFoundMessage(req.method))
  return true;
}

export const validateByEmailUserEmailNotExists = (email, req, users: IUser[]) => {
  const id = req.params?.id;
  const currentUserEmail = users.find(user => user.id === id)?.email;
  const existingEmails = users.map(user => user.email);
  if (currentUserEmail !== email && existingEmails.includes(email)) throw new Error('Email already exists')
  return true;
}