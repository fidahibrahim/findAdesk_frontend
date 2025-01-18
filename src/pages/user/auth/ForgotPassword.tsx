import { Input } from "@/components/ui/input";
import { emailSchema } from "@/validation/formValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";

const ForgotPassword = () => {

  const handleSubmit = (values) => {
    console.log(values.email, "emaaaa")
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="mb-6 justify-center">
            <img
              src="/user/logo.png"
              alt="Logo"
              className="h-10"
            />
          </div>
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <p className="text-center text-gray-700 mb-8 px-4">
              Please enter your email below<br />
              and we will send you a secure link to reset your password.
            </p>


            <Formik
              initialValues={{
                email: ""
              }}
              validationSchema={emailSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Email Input */}
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    as={Input}
                    className="w-full px-3 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-400"
                  />
                  <div >
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#2A2359] text-white rounded-sm hover:bg-[#1F1A45] transition-colors"
                  >
                    Send Reset Link
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
