'use client';
import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { forgotPassword } from '@/lib/user';

const EditSchema = yup.object().shape({
  email: yup.string().email("Email not valid").required("Email required"),
});

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onEditEmail = async (data: any) => {
    setLoading(true);
    setMessage("");
    try {
      const res = await forgotPassword(data);
      
      console.log('Response from forgotPassword:', res);
      if (res.error) {
        console.error('Error sending email:', res.error);
        setMessage('Error sending email. Please check your email.');
        return;
      }
      setMessage('Please check your email! :)');
    } catch (error) {
      console.log(error);
      setMessage('Error sending email. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-putih">
      <div className="w-full max-w-md shadow-xl p-6 rounded-md mt-10">
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={EditSchema}
          onSubmit={async (values, actions) => {
            await onEditEmail(values);
            actions.resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="rounded-md p-6">
              <div className="w-full bg-putih p-6 rounded-md">
                <h1 className="text-2xl font-bold text-birutua mb-4">Type your email</h1>
                {message && <div className="mb-4 text-center text-sm text-hijautua font-bold">{message}</div>}
                <div className="mb-4">
                  <label className="block text-birutua mb-2" htmlFor="email">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] rounded-md placeholder:font-light text-birutua"
                    placeholder="blablabla@mail.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-merahtua text-xs mt-1" />
                </div>
                <div className="flex justify-end ">
                  <button
                    type="submit"
                    className="bg-birutua rounded-md px-4 py-2 text-putih font-medium"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
