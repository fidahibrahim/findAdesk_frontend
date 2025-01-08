import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { registrationSchema } from "@/validation/formValidation";
import { signUp } from "@/services/api/user";
import { toast } from "sonner"
import handleError from "@/utils/errorHandler";

const RegisterForm = () => {
  const navigate = useNavigate()

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
          if (response.status === 200) {
            toast.success("An otp is sent to your mail");
            navigate("/otp", { state: { email: response.data.email } })
          }
        } catch (error) {
          handleError(error)
        }
      }} >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          {/* Username Field */}
          <div>
            <Field
              name="username"
              as={Input}
              placeholder="Username"
              className="w-full bg-gray-200"
            />
            <div className="h-2">
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
