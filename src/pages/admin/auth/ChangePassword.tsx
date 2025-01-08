
const ChangePassword = () => {
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
          <form className="flex flex-col mt-20 space-y-5 w-full">
            <div className="flex flex-col">
              <label 
                className="mb-1 text-lg text-gray-700"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type="passwordl"
                id="password"
                className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-1 flex justify-between">
                <label 
                  className="text-lg text-gray-700"
                  htmlFor="password"
                >
                  Confirm Password
                </label>
              </div>
              <input
                type="password"
                id="password"
                className="rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded bg-[#1a1464] py-2.5 text-lg font-normal text-white hover:bg-[#13104d]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default ChangePassword
