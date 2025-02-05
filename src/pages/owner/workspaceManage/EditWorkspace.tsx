import { Formik, Form, Field, ErrorMessage } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Card, CardContent } from '@/components/ui/card';
import dayjs from 'dayjs';
import Header from '@/components/owner/Header';
import Navbar from '@/components/owner/Navbar';
import { ExistingImage, workspaceRegisterSchema } from '@/validation/formValidation';
import { useEffect, useState } from 'react';
import handleError from '@/utils/errorHandler';
import { useLocation, useNavigate } from 'react-router-dom';
import { editWorkspace, viewEditWorkspace } from '@/services/api/owner';
import { ErrorMessageWrapper, SUPPORTED_IMAGE_FORMATS } from '@/components/owner/ErrorWrapper';
import { FormValues } from '@/interface/owner/WorkspaceRegisterValues';
import { toast } from 'sonner';

const EditWorkspace = () => {
    const location = useLocation()
    const workspaceId = location.state.workspaceId
    const [workspaceData, setWorkspaceData] = useState({
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
        images: []
    });

    const navigate = useNavigate()

    const [newAmenity, setNewAmenity] = useState('');

    const handleAddAmenity = (values: any, setFieldValue: any) => {
        if (newAmenity.trim()) {
            setFieldValue('amenities', [...values.amenities, newAmenity.trim()]);
            setNewAmenity('');
        }
    };

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

    useEffect(() => {
        const fetchData = async (workspaceId: string) => {
            try {
                const response = await viewEditWorkspace(workspaceId)
                const data = response.data.data
                console.log(data, "data listed in the edit form")
                const parsedAmenities = data.aminities ?
                    JSON.parse(data.aminities[0]) : [];

                const transformedImages: ExistingImage[] = data.images ?
                    data.images.map((url: string) => ({
                        preview: url,
                        isExisting: true
                    })) : [];


                setWorkspaceData({
                    ...data,
                    amenities: parsedAmenities,
                    images: transformedImages,
                    startTime: data.startTime ? dayjs(data.startTime) : null,
                    endTime: data.endTime ? dayjs(data.endTime) : null
                })
            } catch (error) {
                handleError(error)
            }
        }
        fetchData(workspaceId)
    }, [workspaceId])


    const handleSubmit = async (values: any, { isSubmitting }: any) => {
        try {
            const formData = new FormData();
            (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
                if (key !== 'images') {
                    const value = values[key];
                    if (value !== null && value !== undefined) {
                        if (key === 'startTime' || key === 'endTime') {
                            formData.append(key, value?.format('HH:mm') || '');
                        } else {
                            formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
                        }
                    }
                }
            });

            values.images.forEach((image: any) => {
                if (!image.isExisting && image.file) {
                    formData.append('images', image.file);
                }
            });

            const existingImages = values.images
                .filter((image: any) => image.isExisting)
                .map((image: any) => image.preview);
            if (existingImages.length > 0) {
                formData.append('existingImages', JSON.stringify(existingImages));
            }

            const response = await editWorkspace(workspaceId, formData)
            console.log(response)
            if (response?.data?.success) {
                toast.success("Workspace successfully updated!")
                navigate('/owner/workspace')
            } else {
                toast.error("Something went wrong!")
            }
        } catch (error) {
            handleError(error)
        } finally {
            isSubmitting(false)
        }
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="min-h-screen py-12">
                <div className="max-w-[950px] ml-96">
                    <Card className="bg-gray-100 mb-12">
                        <CardContent>
                            <div className="px-16 py-9">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Formik
                                        initialValues={workspaceData}
                                        validationSchema={workspaceRegisterSchema}
                                        onSubmit={handleSubmit}
                                        enableReinitialize={true}
                                    >
                                        {({ values, setFieldValue, isSubmitting }) => (
                                            <Form noValidate>
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
                                                    <div className="space-y-6" >
                                                        <div className="space-y-2">
                                                            <label className="text-sm">Availability</label>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <TimePicker
                                                                    label="Start Time"
                                                                    value={values.startTime || null}
                                                                    onChange={(time) => {
                                                                        setFieldValue('startTime', time);
                                                                        if (time && !values.endTime) {
                                                                            setFieldValue('endTime', dayjs(time).add(1, 'hour'));
                                                                        }
                                                                    }}
                                                                />
                                                                <TimePicker
                                                                    label="End Time"
                                                                    value={values.endTime || null}
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
                                                                value={values.workspaceRules || "   No rules specified"}
                                                            />
                                                            <ErrorMessage name="workspaceRules" component="div" className="text-red-500 text-sm mt-1" />
                                                        </div>
                                                        <div>
                                                            <label className="text-sm">Amenities</label>
                                                            <div className="flex items-center mt-2 gap-2">
                                                                <input
                                                                    type="text"
                                                                    className="w-full p-2 border rounded-md bg-white"
                                                                    placeholder="Enter amenity"
                                                                    value={newAmenity}
                                                                    onChange={(e) => setNewAmenity(e.target.value)}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="p-2 bg-blue-500 text-white rounded-md"
                                                                    onClick={() => handleAddAmenity(values, setFieldValue)}
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                            <ErrorMessage name="amenities" component="div" className="text-red-500 text-sm mt-1" />
                                                            <ul className="mt-4 space-y-2">
                                                                {values.amenities?.map((amenity, index) => (
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

                                                    </div>
                                                    {/* Images Section with Preview */}
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
                                                                            if (!('isExisting' in image) || !image.isExisting) {
                                                                                URL.revokeObjectURL(image.preview);
                                                                            }
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

                                                {/* Submit Button */}
                                                <div className="flex justify-end mt-12">
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        // onClick={() => navigate(-1)}
                                                        className=" text-indigo-800 px-6 py-2 mr-4 border rounded-md transition-colors disabled:opacity-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="bg-indigo-800 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                                    >
                                                        {isSubmitting ? 'Updating...' : 'Update'}
                                                    </button>

                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </LocalizationProvider>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default EditWorkspace;