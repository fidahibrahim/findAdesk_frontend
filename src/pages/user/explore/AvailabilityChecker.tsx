import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Field, Form, Formik } from 'formik';
import { availabilitySchema } from '@/validation/formValidation';
import { checkAvailability } from '@/services/api/user';
import handleError from '@/utils/errorHandler';
import dayjs from 'dayjs';



const AvailabilityChecker = ({ workspace }: any) => {
  const handleCheck = async (values: any) => {
    const workspaceId = workspace._id
    try {

      const dayOfWeek = dayjs(values.date).format('dddd')
      console.log(dayOfWeek)

      const formattedStartTime = values.startTime
        ? dayjs(values.startTime).format('HH:mm')
        : '';

      const formattedEndTime = values.endTime
        ? dayjs(values.endTime).format('HH:mm')
        : '';

      const formData = new FormData()
      formData.append('date', dayOfWeek)
      formData.append('startTime', formattedStartTime);
      formData.append('endTime', formattedEndTime);
      formData.append('seats', values.seats.toString());

      const response = await checkAvailability(workspaceId, values)
      console.log(response)
    } catch (error) {
      handleError(error)
    }
  };

  const initialValues = {
    date: '',
    startTime: null,
    endTime: null,
    seats: ''
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={initialValues}
        validationSchema={availabilitySchema}
        onSubmit={handleCheck}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Card className="mb-8 shadow-sm">
              <CardHeader className="mt-2 pb-6">
                <CardTitle>Check Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6">
                  {/* Date Input */}
                  <div className="flex-1 min-w-[200px]">

                    <Field
                      type="date"
                      name="date"
                      className="w-full px-3 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                      placeholder="dd-mm-yyyy"
                    />
                    {errors.date && touched.date && (
                      <div className="text-red-500 text-sm mt-1">{errors.date}</div>
                    )}
                  </div>

                  {/* Start Time */}
                  <div className="flex-1 min-w-[200px]">
                    <TimePicker
                      label="Start Time"
                      value={values.startTime}
                      onChange={(newValue) => setFieldValue('startTime', newValue)}
                    />
                    {errors.startTime && touched.startTime && (
                      <div className="text-red-500 text-sm mt-1">{errors.startTime}</div>
                    )}
                  </div>

                  {/* End Time */}
                  <div className="flex-1 min-w-[200px]">
                    <TimePicker
                      label="End Time"
                      value={values.endTime}
                      onChange={(newValue) => setFieldValue('endTime', newValue)}
                    />
                    {errors.endTime && touched.endTime && (
                      <div className="text-red-500 text-sm mt-1">{errors.endTime}</div>
                    )}
                  </div>

                  {/* Required Seats */}
                  <div className="flex-1 min-w-[200px]">
                    <Field
                      type="number"
                      name="seats"
                      className="w-full px-3 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1"
                      max={workspace?.capacity}
                      placeholder="Enter number of seats"
                    />
                    {errors.seats && touched.seats && (
                      <div className="text-red-500 text-sm mt-1">{errors.seats}</div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type='submit'
                    className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Check Availability
                  </button>
                </div>
              </CardContent>
            </Card>
          </Form>
        )}

      </Formik>
    </LocalizationProvider>
  );
};

export default AvailabilityChecker;