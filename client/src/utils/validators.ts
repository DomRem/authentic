import validator from 'validator';
import {IAuthUser} from "../pages/Auth/Auth.types";

interface IFieldErrors {
  email: string;
  password: string;
  pwconfirm: string;
  firstName: string;
  lastName: string;
}

export interface IValidation {
  success: boolean;
  message: string;
  fields: IFieldErrors;
}

const validateSignUpForm = (payload: IAuthUser): IValidation => {
  let fields: IFieldErrors = {
    email: '',
    password: '',
    pwconfirm: '',
    firstName: '',
    lastName: '',
  };
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    !validator.isEmail(payload.email)
  ) {
    isFormValid = false;
    fields.email = "Please provide a correct email address.";
  }

  if (
    !payload ||
    payload.password.trim().length < 8
  ) {
    isFormValid = false;
    fields.password = "Password must have at least 8 characters.";
  }

  if (!payload || payload.pwconfirm !== payload.password) {
    isFormValid = false;
    fields.pwconfirm = "Password confirmation doesn't match.";
  }

  if (
    !payload ||
    typeof payload.firstName !== "string" ||
    payload.firstName.trim().length === 0
  ) {
    isFormValid = false;
    fields.firstName = "Please provide a first name.";
  }

  if (
    !payload ||
    typeof payload.lastName !== "string" ||
    payload.lastName.trim().length === 0
  ) {
    isFormValid = false;
    fields.lastName = "Please provide a last name.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    fields
  };
};

const validateLoginForm = (payload: IAuthUser): IValidation => {
  let fields: IFieldErrors = {
    email: '',
    password: '',
    pwconfirm: '',
    firstName: '',
    lastName: '',
  };
  let message = "";
  let isFormValid = true;

  if (
    !payload ||
    payload.password.trim().length === 0
  ) {
    isFormValid = false;
    fields.password = "Please provide your password.";
  }

  if (!isFormValid) {
    message = "Check the form for errors.";
  }

  return {
    success: isFormValid,
    message,
    fields
  };
};

export {
  validateLoginForm,
  validateSignUpForm
};