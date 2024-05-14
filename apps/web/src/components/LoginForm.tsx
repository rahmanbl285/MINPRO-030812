'use client'
import { loginUser } from "@/lib/user";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup';
import { useState } from "react";
import { createToken } from "@/app/action";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/features/hooks";
import { setUser } from "@/lib/features/user/userSlice";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required")
});

export default function LoginForm() {
  const [error, setError] = useState("");
  const search = useSearchParams()
  const redirect = search.get('redirect') || '/'
  const dispatch = useAppDispatch()

  const onLogin = async (data : any ) => {
    try {
      const res = await loginUser(data);
      dispatch(setUser(res.user))
      createToken(res.token, redirect);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          onLogin(values);
          actions.resetForm();
        }}
      >
        {() => (
          <Form className="space-y-6">
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Log In</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="blablabla@mail.com"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <Field
                type="password"
                name="password"
                id="password"
                // placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create an Account</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}



