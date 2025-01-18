import { Card, CardContent } from "@/components/ui/card";
import RegistrationForm from "./RegistrationForm";

const Registration = () => {
    return (
        <div className="min-h-screen bg-white py-12 px-8">
            <div className="max-w-[900px] mx-auto">
                <div className="text-center mb-3">
                    <img
                        src="/user/logo.png"
                        alt="Logo"
                        className="h-10 w-auto mx-auto"
                    />
                </div>
                <Card className="bg-gray-100 mb-12">
                    <CardContent className="px-16 py-8">
                        <RegistrationForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Registration;