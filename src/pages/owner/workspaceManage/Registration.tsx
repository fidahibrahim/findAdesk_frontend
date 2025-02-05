import { Card, CardContent } from "@/components/ui/card";
import RegistrationForm from "./RegistrationForm";
import Header from "@/components/owner/Header";
import Navbar from "@/components/owner/Navbar";

const Registration = () => {
    return (
        <>
            <Header />
            <Navbar />
            <div className="min-h-scree py-12">
                <div className="max-w-[950px] ml-96">
                    <Card className="bg-gray-100 mb-12">
                        <CardContent >
                            <RegistrationForm  />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Registration;