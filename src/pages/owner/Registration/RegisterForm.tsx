import { signupInterface } from "@/interface/user/registerInterface";
import { signUp } from "@/services/api/owner";
import handleError from "@/utils/errorHandler";
import { registrationSchema } from "@/validation/formValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterForm = () => {
  const navigate = useNavigate()
  const handleSubmit = async (values: signupInterface) => {
    try {
      const response = await signUp(values)
      console.log(response, "response from owner reg")
      if (response.status === 200) {
        toast.success("An otp is sent to your mail")
        console.log(response.data.email,"email in register from")
        navigate("/owner/otp", { state: { email: response.data.email } })
      }
    } catch (error) {
      handleError(error)
    }
  }
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-full space-y-2">
            {/* Username field */}
            <div className="flex flex-col min-h-[85px]">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor="username"
              >
                Name
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Enter your name"
                className="w-full rounded border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email field */}
            <div className="flex flex-col min-h-[85px]">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full rounded border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password field */}
            <div className="flex flex-col min-h-[85px]">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full rounded border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password field */}
            <div className="flex flex-col min-h-[85px]">
              <label
                className="text-sm font-medium text-gray-700 mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full rounded border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 rounded bg-[#1a1464] py-2 text-base font-medium text-white hover:bg-[#13104d] disabled:bg-opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send OTP'}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;