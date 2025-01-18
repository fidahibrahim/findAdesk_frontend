import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Footer from '@/components/user/Footer';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { loginSchema } from "@/validation/formValidation";
import { loginInterface } from "@/interface/user/loginInterface";
import { toast } from "sonner";
import { googleLogin, login } from "@/services/api/user";
import { useNavigate, } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/slice/userSlice";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import handleError from "@/utils/errorHandler";
import { GoogleIcon } from "@/components/user/Google";


const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values: loginInterface) => {
    try {
      const response = await login(values)
      if (response?.status === 200) {
        toast.success("Successfully Logged into findAdesk")
        if (response.data?.user) {
          dispatch(setUserInfo({
            _id: response.data.user._id,
            name: response.data.user.name,
            email: response.data.user.email
          }));
        }
        navigate("/")
      }
    } catch (error) {
      handleError(error)
    }
  }

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
    <>
      <div className="min-h-screen bg-[url('/user/banner-3.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 w-full min-h-screen flex flex-col">
          {/* Logo Section */}
          <div className='p-8'>
            <div className="flex items-center space-x-2">
              <img
                src="/user/logo.png"
                alt="FindADesk Logo"
                className="h-8 w-32 "
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex items-center justify-center px-4">
            <Card className="w-full max-w-md bg-white ">
              <CardContent className="pt-6">
                <h1 className="text-3xl font-bold text-center mb-2">LOGIN</h1>
                <p className="text-center text-gray-600 mb-6">Welcome back to findAdesk</p>

                <Formik
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  validationSchema={loginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <Field
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          as={Input}
                          className="w-full bg-gray-200"
                        />
                        <div className="h-3" >
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          as={Input}
                          className="w-full bg-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-5 p-4 -translate-y-1/2"
                        >
                          {showPassword ? (
                            <Eye className="h-4 w-4 text-gray-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                        <div className="h-3" >
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>

                      <p className="text-blue-800 px text-sm mt-0 mb-2">
                        <a href="/forgotPassword">Forget Password?</a>
                      </p>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleGoogleSignup()}
                          className="w-full h-10 px-4 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <GoogleIcon />
                          <span className="text-gray-600 font-medium">Sign in with Google</span>
                        </button>
                      </div>

                      <div>
                        <Button type="submit" disabled={isSubmitting} className="w-full">
                          Sign In
                        </Button>
                      </div>
                    </Form>
                  )}

                </Formik>

                <p className="text-black text-lg mt-4 text-center">
                  Don't have an account? <a href="/register"> <span className='text-blue-800' > Register </span> </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
