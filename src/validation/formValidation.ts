import * as yup from "yup";

export const registrationSchema = yup.object().shape({
    username: yup.string()
    .matches(
        /^[a-zA-Z]+( [a-zA-Z]+)?$/,
      "Full name must only contain letters and can have only one space between the first and last name"
    )
    .required('Username is required')
    .min(3, "Username is required")
    .max(50, "Username is too long"),

    email: yup.string()
    .email('Invalid Email')
    .required('Email is required'),

    password: yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),

    confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),  

})

export const loginSchema = yup.object().shape({
  email: yup.string()
  .email("Invalid email")
  .required("Email is required"),

  password: yup.string()
  .min(8,"Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required")
})