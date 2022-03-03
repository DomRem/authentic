import fs from 'fs';
import {IUser} from "../users/types";

export const DB_PATH = `${process.env.DB_PATH || 'users.json'}`;

export function createDb() {
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

export const readFromDb = (): IUser[] => {
  if (!fs.existsSync(DB_PATH)) createDb();
  return JSON.parse(fs.readFileSync(DB_PATH).toString());
}

export const writeToDb = (users: IUser[]) => {
  const data = JSON.stringify(users, null, 2);
  fs.writeFile(DB_PATH, data, (err) => {
    if (err) throw err;
  });
}