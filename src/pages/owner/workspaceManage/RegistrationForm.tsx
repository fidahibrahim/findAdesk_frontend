import { workspaceRegisterSchema } from '@/validation/formValidation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { FormValues } from "@/interface/owner/WorkspaceRegisterValues"
import { ErrorMessageWrapper, SUPPORTED_IMAGE_FORMATS } from '@/components/owner/ErrorWrapper';

const RegistrationForm = () => {
    const [amenityInput, setAmenityInput] = useState('');
    const initialValues = {
        workspaceName: '',
        workspaceType: '',
        capacity: '',
        place: '',
        street: '',
        state: '',
        spaceDescription: '',
        startTime: '',
        endTime: '',
        workingDays: '',
        pricePerHour: '',
        workspaceRules: '',
        amenities: [],
        images: [],
    };

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void,
        currentImages: { file: File; preview: string }[]
    ) => {
        const files = Array.from(event.target.files || []);
        console.log(files, "img file")

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
    const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
        console.log(values, "values from form");
        setSubmitting(false);
    };

    return (
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
                                    <Field as="select" name="capacity" className="w-full p-2 border rounded-md bg-white">
                                        <option value="">Select</option>
                                        <option value="1-10">1-10 Seats</option>
                                        <option value="10-20">10-20 Seats</option>
                                        <option value="20-40">20-40 Seats</option>
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
                                    <Field
                                        type="time"
                                        name="startTime"
                                        className="p-2 border rounded-md bg-white"
                                    />
                                    <ErrorMessage name="startTime" component="div" className="text-red-500 text-sm mt-1" />
                                    <Field
                                        type="time"
                                        name="endTime"
                                        className="p-2 border rounded-md bg-white"
                                    />
                                    <ErrorMessage name="endTime" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
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
                    <div className="flex justify-end mt-6">
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
    );
};

export default RegistrationForm;
