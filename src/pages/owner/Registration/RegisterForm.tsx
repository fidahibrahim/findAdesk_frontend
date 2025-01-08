
const RegisterForm = () => {
  return (
    <>
    <form className="flex flex-col w-full space-y-4 ">
      <div className="flex flex-col">
        <label
          className="mb-1 text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="w-full rounded border border-gray-200 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label
          className="mb-1 text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="w-full rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label
          className="mb-1 text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="w-full rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col">
        <label
          className="mb-1 text-sm font-medium text-gray-700"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="w-full rounded border border-gray-200 px-3 py-2 text-lg focus:border-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="mt-2 rounded bg-[#1a1464] py-2 text-base font-medium text-white hover:bg-[#13104d]"
      >
        Send Otp
      </button>
    </form>
    </>
  );
};

export default RegisterForm;