import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const AvailabilityResult = ({ result }: any) => {
    if (!result || !result.data) return null;

    const { data } = result.data;
    const isAvailable = data.isAvailable;
    const message = data.message || "No message available";

    return (
        <Card className="mt-6 shadow-md ">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                    {isAvailable ? (
                        <>
                            <CheckCircle className="text-green-500" size={24} />
                            <span>Available Now</span>
                        </>
                    ) : (
                        <>
                            <XCircle className="text-red-500" size={24} />
                            <span>Not Available</span>
                        </>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Message */}
                    <div className="flex items-start gap-2">
                        <Info size={20} className="text-blue-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-700">{message}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AvailabilityResult;