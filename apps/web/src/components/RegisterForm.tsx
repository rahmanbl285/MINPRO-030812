'use client'
import { regUser } from "@/lib/user";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from 'yup';

const RegisterSchema = yup.object().shape({
    username: yup.string().required("Username required"),
    email: yup.string().email("Invalid email").required("Email required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password required")
});

export default function RegisterForm() {
    const onRegister = async (data : any) => {
        try {
            await regUser(data);
            alert("Register successful!");
        } catch (err) {
            console.log(err);
            alert("Register failed");
        }
    };

    return (
        <div className="w-full max-w-sm p-4 bg-white border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                    <Form className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Register</h5>
                        <div>
                            <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <Field
                                type="text"
                                name="firstname"
                                id="firstname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                                />
                            <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <Field
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                            <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                        </div>
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label htmlFor="refferal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Refferal Code</label>
                            <Field
                                type="text"
                                name="refferal"
                                id="refferal"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">Log In</Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
