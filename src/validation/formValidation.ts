import { SUPPORTED_IMAGE_FORMATS } from "@/components/owner/ErrorWrapper";
import * as yup from "yup";
import dayjs from 'dayjs';

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
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    )
    .required("Password is required")
})

export const emailSchema = yup.object().shape({
  email: yup.string()
    .email("Invalid email")
    .required("Email is required")
})


export const workspaceRegisterSchema = yup.object().shape({
  workspaceName: yup.string()
    .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "Name must only contain letters with single spaces between words")
    .required('Workspace Name is required')
    .min(3, "Name must contain minimum 3 letters")
    .max(50, "Name is too long"),

  workspaceMail: yup.string()
    .email("Invalid email")
    .required('Mail Id is required'),

  workspaceType: yup.string()
    .oneOf(['coWorking', 'meetingRoom', 'conferenceHall'], 'Please select a valid workspace type')
    .required('Workspace Type is required'),

  capacity: yup
    .number()
    .typeError('Capacity must be a valid number')
    .min(1, 'Capacity must be at least 1')
    .required('Capacity is required'),
  place: yup.string()
    .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "Place must only contain letters with single spaces between words")
    .required('Place is required')
    .min(3, "Place must contain minimum 3 letters"),

  street: yup.string()
    .matches(/^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/, "Street must only contain letters and numbers with single spaces between words")
    .required('Street is required')
    .min(3, "Street must contain minimum 3 characters"),

  state: yup.string()
    .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/, "State must only contain letters with single spaces between words")
    .required('State is required')
    .min(2, "State must contain minimum 2 letters"),

  spaceDescription: yup.string()
    .required('Space Description is required')
    .test('word-count', 'Description must be between 4 and 20 words', value => {
      if (!value) return false;
      const words = value.trim().split(/\s+/);
      return words.length >= 4 && words.length <= 20;
    })
    .matches(/^\S+(?:\s+\S+)*$/, "Description cannot start or end with spaces or contain multiple consecutive spaces"),

  startTime: yup.mixed().required('Start time is required'),
  endTime: yup.mixed()
    .required('End time is required')
    .test('min-duration', 'End time must be at least 1 hour after start time', function (endTime) {
      const { startTime } = this.parent;
      if (dayjs.isDayjs(startTime) && dayjs.isDayjs(endTime)) {
        return endTime.diff(startTime, 'hour') >= 1;
      }
      return true;
    }),

  workingDays: yup.string()
    .oneOf(['weekdays', 'weekends', 'allDays'], 'Please select valid working days')
    .required('Working Days is required'),

  pricePerHour: yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price per hour is required'),

  workspaceRules: yup.string()
    .matches(/^\S+(?:\s+\S+)*$/, "Rules cannot start or end with spaces or contain multiple consecutive spaces")
    .nullable(),

  amenities: yup.array()
    .min(2, 'Minimum 2 amenities required')
    .max(5, 'Maximum 5 amenities allowed')
    .required('Amenities are required'),

  images: yup.array()
    .min(2, 'Minimum 2 images required')
    .max(5, 'Maximum 5 images allowed')
    .of(
      yup.object().shape({
        file: yup.mixed()
          .required('File is required')
          .test('fileFormat', 'Unsupported file format. Only JPG, JPEG and PNG are allowed',
            (value: any) => {
              if (!value || !value.type) return false;
              return SUPPORTED_IMAGE_FORMATS.includes(value.type);
            }
          )
          .test('fileSize', 'File size must be less than 5MB',
            (value: any) => {
              if (!value || !value.size) return false;
              return value.size <= 5 * 1024 * 1024;
            }
          ),
        preview: yup.string()
          .required('Preview URL is required')
          .test('isValidPreview', 'Invalid preview URL',
            (value: string) => {
              if (!value) return false;
              try {
                new URL(value);
                return true;
              } catch {
                return false;
              }
            }
          )
      })
    )
    .required('Images are required')
});

