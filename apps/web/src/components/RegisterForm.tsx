'use client'
import { regUser } from "@/lib/user";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup';
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/features/hooks";

const RegisterSchema = yup.object().shape({
  firstname: yup.string().required("First Name required"),
  lastname: yup.string().required("Last Name required"),
  username: yup.string().required("User Name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password required")
});

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);  // Menambahkan state untuk menyimpan status keberhasilan
  const search = useSearchParams();
  const redirect = search.get('redirect') || '/';
  const dispatch = useAppDispatch();

  const onRegister = async (data: any) => {
    try {
      await regUser(data);
      setSuccess(true);  // Menetapkan status keberhasilan
      setTimeout(() => {
        window.location.href = redirect;
      }, 2000);  // Penundaan 2 detik sebelum mengalihkan
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please check your details.");
    }
  };

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values, actions) => {
        onRegister(values);
        actions.resetForm();
      }}
    >
      {() => (
        <div className="bg-putih w-full min-h-screen flex items-center justify-center md:pt-20"> {/* Menambahkan pt-20 untuk layar medium ke atas */}
          <Form className="flex items-center justify-center w-full max-w-lg">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded md:flex-row md:space-y-0 md:m-0">
              <div className="p-6 md:w-1/2">
                <h2 className="mb-3 text-4xl text-birutua font-bold">Register</h2>
                <p className="font-light text-gray-400 mb-8 text-birutua">Please sign up!</p>
                {error && <div className="text-merahtua text-sm">{error}</div>}
                {success && <div className="text-hijautua font-bold text-sm">Registration success! Redirecting...</div>} {/* Pesan keberhasilan */}
                <div className="py-4">
                  <label htmlFor="firstname" className="mb-2 text-birutua font-bold text-md">First Name</label>
                  <Field
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] text-birutua rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                  <ErrorMessage name="firstname" component="div" className="text-merahtua text-xs" />
                </div>
                <div className="py-4">
                  <label htmlFor="lastname" className="mb-2 text-md text-birutua font-bold">Last Name</label>
                  <Field
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] text-birutua rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                  <ErrorMessage name="lastname" component="div" className="text-merahtua text-xs" />
                </div>
                <div className="py-4">
                  <label htmlFor="username" className="mb-2 text-md font-bold text-birutua">User Name</label>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] text-birutua rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                  <ErrorMessage name="username" component="div" className="text-merahtua text-xs" />
                </div>
                <div className="py-4">
                  <label htmlFor="email" className="mb-2 text-md text-birutua font-bold">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="blablabla@mail.com"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] text-birutua rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-merahtua text-xs" />
                </div>
                <div className="py-4">
                  <label htmlFor="password" className="mb-2 font-bold text-birutua text-md">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] text-birutua rounded-md placeholder:font-light placeholder:text-gray-500"
                  />
                  <ErrorMessage name="password" component="div" className="text-merahtua text-xs" />
                </div>
                <div>
                  <label htmlFor="referral" className="py-4 text-sm text-birutua font-bold block">Referral Code</label>
                  <Field
                    type="text"
                    name="referral"
                    id="referral"
                    className="bg-putih w-full p-2 border-2 border-[#5a5e5e] text-birutua  text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className="pt-8">
                  <button type="submit" className="w-full text-putih bg-birutua hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Register
                  </button>
                </div>
                <div className="text-sm font-medium text-birutua dark:text-gray-300 mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="font-bold text-blue-700 hover:underline dark:text-blue-500">Login</Link>
                </div>
              </div>
              <div className="relative hidden md:block md:w-1/2">
                <img className="w-full h-full rounded-r-2xl object-cover" src="/registerrrr.jpg" alt="register" width={400} height={400} />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
