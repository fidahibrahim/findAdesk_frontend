import { Input } from "@/components/ui/input";
import { loginInterface } from "@/interface/user/loginInterface";
import { setOwnerInfo } from "@/redux/slice/ownerSlice";
import { login } from "@/services/api/owner";
import { loginSchema } from "@/validation/formValidation"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { Eye, EyeOff } from 'lucide-react';
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const LoginForm = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (values: loginInterface) => {
        try {
            const response = await login(values)
            if (response?.status === 200) {
                toast.success("Successfully Logged into findAdesk")
                if (response.data?.user) {
                    dispatch(setOwnerInfo({
                        _id: response.data.user._id,
                        name: response.data.user.name,
                        email: response.data.user.email
                    }))
                }
                navigate("/owner/dashboard")
            }
        } catch (error) {
            toast.error("Invalid email or password!")
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col space-y-5 w-full">
                        <div className="flex flex-col">
                            <label
                                className="mb-1 text-lg text-gray-700"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
                            />
                            <div className="h-3">
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-1 flex justify-between">
                                <label
                                    className="mb-1 text-lg text-gray-700"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <a
                                    href="/owner/forgotPassword"
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Reset password?
                                </a>
                            </div>
                            <div className="relative">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    as={Input}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none "
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                            <div className="h-6">
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 rounded bg-[#1a1464] py-2.5 text-lg font-normal text-white hover:bg-[#13104d]"
                        >
                            Sign In
                        </button>
                    </Form>
                )}

            </Formik>
        </>
    )
}

export default LoginForm
