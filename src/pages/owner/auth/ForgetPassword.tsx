
const ForgetPassword = () => {
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
                src="/public/user/banner-1.jpg"
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
            <div className="mb-8 mt-14 text-center w-full">
              <p className="text-base text-gray-600">
                Please enter your email address<br />and we will send you a secure link to reset your password.
              </p>
            </div>
  
            <form className="flex flex-col space-y-5 w-full">
              <div className="flex flex-col">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded bg-[#1a1464] py-2.5 text-lg font-normal text-white hover:bg-[#13104d]"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
    )
  }
  
  export default ForgetPassword
  