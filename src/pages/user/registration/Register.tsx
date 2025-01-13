
import { Card, CardContent } from "@/components/ui/card";
import Footer from '@/components/user/Footer';
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <>
        <div className="min-h-screen bg-[url('/user/banner-3.jpg')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/40" />
        
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {/* Logo Section */}
        <div className='p-8'>
          <div className="flex items-center space-x-2">
            <img 
              src="/user/logo.png" 
              alt="FindADesk Logo" 
              className="h-8 w-32 "
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md bg-white ">
            <CardContent className="pt-6">
              <h1 className="text-3xl font-bold text-center mb-2">REGISTER</h1>
              <p className="text-center text-gray-600 mb-6">we are here to help you</p>
               
              <RegisterForm/>

              <p className="text-black text-lg mt-4 text-center">
                Already have an account? <a href="/login"> <span className='text-blue-800' > Sign in </span> </a> 
              </p>
            </CardContent>
          </Card>
        </div>
        
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;