import LoginForm from "./LoginForm"

const OwnerLogin = () => {
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
            <LoginForm />
            <p className="text-black text-sm mt-4 text-center">
              Don't have an account? <a href="/owner/register"> <span className='text-blue-800' > Register </span> </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OwnerLogin
