import RegisterForm from "./RegisterForm"

const Register = () => {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-white p-4">
                <div className="grid bg-gray-50 max-w-[900px] h-auto md:h-[650px] grid-cols-1 md:grid-cols-2 w-full">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-0 bg-black/20 z-10" />
                        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 z-20">
                            <img
                                src="/user/logo.png"
                                alt="Logo"
                                className="h-14 w-auto"
                            />
                        </div>
                        <div className="h-full">
                            <img
                                src="/user/banner-1.jpg"
                                alt="Interior"
                                className="h-full w-full object-cover grayscale"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center px-6 md:px-12 py-8">
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Sign Up</h1>
                            <p className="text-sm text-gray-600">
                                Register your space into<br />findAdesk for listing with top workspace providers.
                            </p>
                        </div>
                        <RegisterForm />
                        <p className="text-black text-sm mt-4 text-center">
                            Already have an account? <a href="/owner/"><span className='text-blue-800'>Sign In</span></a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register
