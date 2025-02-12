import { workspaceRegisterSchema } from '@/validation/formValidation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { FormValues } from "@/interface/owner/WorkspaceRegisterValues"
import { ErrorMessageWrapper, SUPPORTED_IMAGE_FORMATS } from '@/components/owner/ErrorWrapper';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { workspaceRegister } from '@/services/api/owner';
import handleError from '@/utils/errorHandler';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


const RegistrationForm = () => {
    const [amenityInput, setAmenityInput] = useState('');
    const initialValues = {
        workspaceName: '',
        workspaceMail: '',
        workspaceType: '',
        capacity: '',
        place: '',
        street: '',
        state: '',
        spaceDescription: '',
        startTime: null,
        endTime: null,
        workingDays: '',
        pricePerHour: '',
        workspaceRules: '',
        amenities: [],
        images: [],
        status: ""
    };

    const navigate = useNavigate()
    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void,
        currentImages: { file: File; preview: string }[]
    ) => {
        const files = Array.from(event.target.files || []);

        const validFiles = files.filter(file =>
            SUPPORTED_IMAGE_FORMATS.includes(file.type as typeof SUPPORTED_IMAGE_FORMATS[number]) &&
            file.size <= 5 * 1024 * 1024
        );

        const newImages = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        const totalImages = [...currentImages, ...newImages];

        if (totalImages.length > 5) {
            alert('Maximum 5 images allowed');
            return;
        }

        setFieldValue('images', totalImages);
    };
    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        try {
            console.log(values.amenities, "aminityyyy")
            const formData = new FormData();
            (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
                            if (key !== 'images') {
                                const value = values[key];
                                if (value !== null && value !== undefined) {
                                    if (key === 'amenities') {
                                        formData.append(key, JSON.stringify(value));
                                    } else {
                                        formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
                                    }
                                }
                            }
                        });

            values.images.forEach((image: { file: File }) => {
                formData.append('images', image.file);
            });

            formData.forEach((item) => console.log(item))

            const response = await workspaceRegister(formData);
            console.log(response, "response data")
            if (response?.data?.success) {
                toast.success("Workspace successfully created")
                navigate('/owner/workspace')
            } else {
                toast.error("Something went wrong!")
            }
            setSubmitting(false);
        } catch (error) {
            handleError(error);
            setSubmitting(false);
        }
    };

    return (
        <div className="px-16 py-9" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={workspaceRegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, isSubmitting }) => (
                        <Form>
                            <div className="mb-8">
                                <h2 className="text-lg mt-6 font-medium mb-6 border-b">Basic Information</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm">Workspace Name</label>
                                        <Field
                                            type="text"
                                            name="workspaceName"
                                            className="w-full p-2 border rounded-md bg-white"
                                        />
                                        <ErrorMessage name="workspaceName" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm">Workspace Mail</label>
                                        <Field
                                            type="email"
                                            name="workspaceMail"
                                            className="w-full p-2 border rounded-md bg-white"
                                        />
                                        <ErrorMessage name="workspaceMail" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm">Workspace Type</label>
                                            <Field as="select" name="workspaceType" className="w-full p-2 border rounded-md bg-white">
                                                <option value="">Select</option>
                                                <option value="coWorking">Co-Working Space</option>
                                                <option value="meetingRoom">Meeting Room</option>
                                                <option value="conferenceHall">Conference Hall</option>
                                            </Field>
                                            <ErrorMessage name="workspaceType" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm">Capacity</label>
                                            <Field type="text" name="capacity" className="w-full p-2 border rounded-md bg-white">
                                            </Field>
                                            <ErrorMessage name="capacity" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm">Place</label>
                                        <Field
                                            type="text"
                                            name="place"
                                            className="w-full p-2 border rounded-md bg-white"
                                        />
                                        <ErrorMessage name="place" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm">Street</label>
                                            <Field
                                                type="text"
                                                name="street"
                                                className="w-full p-2 border rounded-md bg-white"
                                            />
                                            <ErrorMessage name="street" component="div" className="text-red-500 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm">State</label>
                                            <Field
                                                type="text"
                                                name="state"
                                                className="w-full p-2 border rounded-md bg-white"
                                            />
                                            <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm">Space Description</label>
                                        <Field
                                            as="textarea"
                                            name="spaceDescription"
                                            className="w-full p-2 border rounded-md h-24 bg-white"
                                        />
                                        <ErrorMessage name="spaceDescription" component="div" className="text-red-500 text-sm" />
                                    </div>

                                </div>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-lg font-medium border-b mb-6">Space Details</h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm">Availability</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <TimePicker
                                                label="Start Time"
                                                value={values.startTime}
                                                onChange={(time) => {
                                                    setFieldValue('startTime', time);
                                                    if (time && !values.endTime) {
                                                        setFieldValue('endTime', time.add(1, 'hour'));
                                                    }
                                                }}
                                            />
                                            <TimePicker
                                                label="End Time"
                                                value={values.endTime}
                                                onChange={(time) => setFieldValue('endTime', time)}
                                            />
                                        </div>
                                        <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm mt-1" />
                                        <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm">Working Days</label>
                                        <Field as="select" name="workingDays" className="w-full p-2 border rounded-md bg-white">
                                            <option value="">Select</option>
                                            <option value="weekdays">Weekdays</option>
                                            <option value="weekends">Weekends</option>
                                            <option value="allDays">All Days</option>
                                        </Field>
                                        <ErrorMessage name="workingDays" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm">Price/hour</label>
                                        <Field
                                            type="number"
                                            name="pricePerHour"
                                            className="w-full p-2 border rounded-md bg-white"
                                        />
                                        <ErrorMessage name="pricePerHour" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-gray-500">*If you have any workspace rules you can specify</label>
                                        <Field
                                            as="textarea"
                                            name="workspaceRules"
                                            className="w-full p-2 border rounded-md h-24 bg-white"
                                        />
                                        <ErrorMessage name="workspaceRules" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div>
                                        <label className="text-sm">Amenities</label>
                                        <div className="flex items-center mt-2 gap-2">
                                            <input
                                                type="text"
                                                value={amenityInput}
                                                onChange={(e) => setAmenityInput(e.target.value)}
                                                className="w-full p-2 border rounded-md bg-white"
                                                placeholder="Enter amenity"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (amenityInput.trim()) {
                                                        setFieldValue('amenities', [...values.amenities, amenityInput.trim()]);
                                                        setAmenityInput('');
                                                    }
                                                }}
                                                className="p-2 bg-blue-500 text-white rounded-md"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <ErrorMessage name="amenities" component="div" className="text-red-500 text-sm mt-1" />
                                        <ul className="mt-4 space-y-2">
                                            {values.amenities.map((amenity, index) => (
                                                <li
                                                    key={index}
                                                    className="flex justify-between p-2 border rounded-md bg-gray-100"
                                                >
                                                    {amenity}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newAmenities = values.amenities.filter((_, i) => i !== index);
                                                            setFieldValue('amenities', newAmenities);
                                                        }}
                                                        className="text-red-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Images Section */}
                                    <div>
                                        <label className="text-sm">Images</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={(event) => handleImageChange(event, setFieldValue, values.images)}
                                            className="w-full mt-2 p-2 border rounded-md bg-white"
                                        />
                                        <ErrorMessageWrapper name="images" />
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            {values.images.map((image: { file: File; preview: string }, index: number) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={image.preview}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-40 object-cover rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            URL.revokeObjectURL(image.preview);
                                                            const newImages = values.images.filter((_, i) => i !== index);
                                                            setFieldValue('images', newImages);
                                                        }}
                                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-end mt-12">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-800 text-white px-6 py-2 rounded-md hover:bg-indigo-900 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>

                            </div>
                        </Form>
                    )}
                </Formik>
            </LocalizationProvider>
        </div>
    );
};

export default RegistrationForm;