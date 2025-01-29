import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registrationSchema } from "@/validation/formValidation";
import { googleLogin, signUp } from "@/services/api/user";
import { toast } from "sonner"
import handleError from "@/utils/errorHandler";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slice/userSlice";
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const RegisterForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (response: TokenResponse) => {
      try {
        const responseData = await googleLogin(response);
        if (responseData?.status == 200) {
          dispatch(setUserInfo({
            _id: responseData.data.user._id,
            name: responseData.data.user.name,
            email: responseData.data.user.email
          }))
          navigate('/')
          toast.success("Logged in to findAdesk")
        }
      } catch (error) {
        handleError(error)
      }
    }
  })

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={registrationSchema}
      onSubmit={async (values) => {
        try {
          const response = await signUp(values);
          console.log("response from reg", response)
          if (response.status === 201) {
            toast.success("An otp is sent to your mail");
            navigate("/otp", { state: { email: response.data.data.email } })
          }
        } catch (error) {
          handleError(error)
        }
      }} >
      {({ isSubmitting }) => (
        <Form className="space-y-5">
          {/* Username Field */}
          <div>
            <Field
              name="username"
              as={Input}
              placeholder="Username"
              className="w-full bg-gray-200"
            />
            <div className="h-5">
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <Field
              name="email"
              type="email"
              as={Input}
              placeholder="E-mail"
              className="w-full bg-gray-200"
            />
            <div className="h-2">
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <Field
              name="password"
              type="password"
              as={Input}
              placeholder="Password"
              className="w-full bg-gray-200"
            />
            <div className="h-2">
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <Field
              name="confirmPassword"
              type="password"
              as={Input}
              placeholder="Confirm password"
              className="w-full bg-gray-200"
            />
            <div className="h-2">
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleGoogleSignup()}
              className="w-full h-10 px-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <GoogleIcon />
              <span className="text-gray-600 font-medium">Sign In with Google</span>
            </button>
          </div>

          {/* Sign Up Button */}
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              Sign Up
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
