import * as Yup from 'yup';

const userValidation = Yup.object({
  userName: Yup.string()
    .required('User Name is required')
    .matches(/^\S+$/, 'User Name cannot contain spaces'),
  firstName: Yup.string()
    .min(3, 'First Name at least 3 characters')
    .max(64, 'First Name cannot more than 64 characters')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(3, 'Last Name at least 3 characters')
    .max(64, 'Last Name cannot more than 64 characters')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default userValidation;
