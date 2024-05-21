"use client"
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'

const ForgotPasswordSchema = yup.object().shape({
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password required")
});

export default function ForgotPassword() {
  const params = useParams();
  const router = useRouter();

  const updatePassword = async(data : any) => {
    const response = await fetch(`http://localhost:8000/api/users/reset-password`, {
      method : "POST",
      body: JSON.stringify(data),
      headers: {
        "Authorization" : `Bearer ${params.token}`,
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json();
    if(response.ok) {
      alert("Update password successfully!");
      router.push("/login");
    } else {
      alert("Update password failed");
    }
  };

  return (
    <Formik
      initialValues={{
        password: ""
      }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        updatePassword(values);
      }}
    >
      {() => (
        <div className="bg-putih w-full min-h-screen flex items-center justify-center md:pt-20">
          <Form className="flex items-center justify-center w-full max-w-lg">
            <div className="relative flex flex-col space-y-8 bg-white shadow-2xl rounded-lg md:space-y-0 md:flex-row md:w-auto">
              <div className="p-8 md:p-12 md:w-96">
                <h1 className="mb-4 text-4xl font-bold text-birutua">Reset Password</h1>
                <p className="mb-8 font-light text-gray-400 text-birutua">Please type your new password!</p>
                <div className="py-4">
                  <label htmlFor="password" className="mb-2 font-bold text-birutua text-md">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] rounded-md placeholder:font-light text-birutua"
                  />
                  <ErrorMessage name="password" component="div" className="text-merahtua text-xs mt-1" />
                </div>
                <div className='flex justify-end'>
                <button type="submit" className="w-full bg-birutua rounded-md px-4 py-2 text-putih font-medium mt-4">
                  Submit
                </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
