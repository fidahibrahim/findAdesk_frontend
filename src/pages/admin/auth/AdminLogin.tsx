import { loginSchema } from "@/validation/formValidation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginInterface } from "@/interface/user/loginInterface";
import { toast } from "sonner";
import { adminLogin } from "@/services/api/admin";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminInfo } from "@/redux/slice/adminSlice";


const AdminLogin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const handleSubmit= async (values: loginInterface)=>{
        try {
          const response = await adminLogin(values)
console.log("respooo", response);

          if(response?.status==200){
            toast.success("logged in successfully")
            
            if (response.data?.admin) {
                      dispatch(setAdminInfo({
                        _id: response.data.admin._id,
                        name: response.data.admin.name,
                        email: response.data.admin.email
                      }));
                    }
            navigate("/admin/dashboard")
          }
        } catch (error) {
          toast.error("Invalid email or password!")
        }
    }


  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="grid w-full max-w-[800px] grid-cols-2">
          {/* Left side with grayscale image */}
          <div className="relative h-[500px]">
            <div className="absolute inset-0 bg-black/20 z-10" />
            {/* Logo positioned absolutely over the image */}
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20">
              <img
                src="/user/logo.png"
                alt="Logo"
                className="h-14 w-auto"
              />
            </div>

            {/* Gray-scale image section */}
            <div className="h-full">
              <img
                src="/user/banner-1.jpg"
                alt="Interior"
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </div>

          {/* Right side with login form - centered content */}
          <div className="flex flex-col h-[500px] bg-gray-50 items-center px-12 py-8">
            {/* Top logo */}
            <div className="mb-2 self-start">
              <img
                src="/user/logo.png"
                alt="Logo"
                className="h-6 w-auto"
              />
            </div>

            {/* Sign In section - centered */}
            <div className="mb-8 text-center w-full">
              <h1 className="mb-2 text-2xl font-normal text-gray-900">Sign In</h1>
              <p className="text-sm text-gray-600">
                Enter your email address<br />and password to access admin panel.
              </p>
            </div>
            <Formik
              initialValues={{
                email:"",
                password:""
              }}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            > 
            {
              ({ isSubmitting }) => (
                <Form className="flex flex-col space-y-5 w-full">
                <div className="flex flex-col">
                  <label
                    className="mb-1 text-lg text-gray-700"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Field
                      as={Input}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-sm text-red-600"
                    />
                </div>

                <div className="flex flex-col">
                  <div className="mb-1 flex justify-between">
                    <label
                      className="text-lg text-gray-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      href="/resetPassword"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Reset password?
                    </a>
                  </div>
                  <Field
                      as={Input}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm text-red-600"
                    />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 rounded bg-[#1a1464] py-2.5 text-lg font-normal text-white hover:bg-[#13104d]"
                >
                  Sign In
                </Button>
              </Form  >
              )
            }
              
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;