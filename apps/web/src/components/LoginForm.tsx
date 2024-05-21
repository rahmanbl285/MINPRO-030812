'use client';
import { loginUser } from "@/lib/user";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup';
import { useState } from "react";
import { createToken } from "@/app/action";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/lib/features/hooks";
import { setUser } from "@/lib/features/user/userSlice";
import { useRouter } from 'next/navigation';

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required")
});

export default function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const search = useSearchParams();
  const redirect = search.get('redirect') || '/';
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogin = async (data: { email: string; password: string }) => {
    try {
      const res = await loginUser(data);
      console.log(res);

      if (res.status === "OK") {
        dispatch(setUser(res.user));
        createToken(res.token, redirect);
        setSuccess("Login successfully!");
        setTimeout(() => {
          router.push(redirect);
        }, 2000); // Redirect setelah 2 detik
      } else {
        setError(res.message === "Wrong Password!" ? "Wrong password" : "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        onLogin(values);
        actions.resetForm();
      }}
    >
      {() => (
        <div className="bg-putih w-full min-h-screen flex items-center justify-center md:pt-20"> {/* Menambahkan pt-20 untuk layar medium ke atas */}
          <Form className="flex items-center justify-center w-full max-w-lg">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-lg md:flex-row md:space-y-0 md:m-0">
              <div className="p-6 md:w-1/2">
                <h2 className="mb-3 pt-8 text-4xl font-bold text-birutua">Login</h2>
                <p className="font-light text-gray-400 mb-8 text-birutua">Please sign in!</p>
                {error && <div className="text-merahtua text-sm">{error}</div>}
                {success && <div className="text-hijautua text-sm">{success}</div>}
                <div className="py-4">
                  <label htmlFor="email" className="mb-2 font-bold text-birutua text-md">Email</label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    placeholder="blablabla@mail.com"
                    className="w-full bg-putih p-2 border-2 border-[#5a5e5e] rounded-md placeholder:font-light text-birutua"
                  />
                  <ErrorMessage name="email" component="div" className="text-merahtua text-xs" />
                </div>
                <div className="py-4">
                  <label htmlFor="password" className="py-4 text-sm text-birutua font-bold block">Password</label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="bg-putih w-full p-2 border-2 border-[#5a5e5e] text-birutua text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  />
                  <ErrorMessage name="password" component="div" className="text-merahtua text-xs" />
                </div>
                <div className="flex justify-between w-full py-4">
                  <Link href="/forgot-password" className="font-bold text-md text-birutua">Forgot password?</Link>
                </div>
                <button type="submit" className="w-full text-putih bg-birutua hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Sign In
                </button>
                <div className="text-sm font-medium text-birutua dark:text-gray-300 mt-4">
                  Don't have an account? <Link href="/register" className="font-bold text-birutua">Sign up for free</Link>
                </div>
              </div>
              <div className="relative hidden md:block md:w-1/2">
                <img className="w-full h-full rounded-r-lg object-cover rounded-2xl" src="/registerrrr.jpg" alt="register" width={400} height={400} />
                {/* <div className="absolute bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg">
                  <span className="text-white text-xl">Happy Join the Event !!</span> */}
                {/* </div> */}
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
