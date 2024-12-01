import React, { useState } from 'react';
import { supabase } from "../lib/supabase";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    country: string;
}

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        country: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        username: formData.username,
                        country: formData.country,
                    }
                }
            });

            if (error)
                setError(error.message);
            else
                window.location.href = "/login?message=Please check your email to verify your account.";
        } catch (err) {
            setLoading(false);
            setError('Something went wrong, please try again later.');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 pt-36 pb-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/logo.svg" alt="Master of Web" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Create your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label htmlFor="first-name" className="block text-sm/6 font-medium text-white">
                            First Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="firstName"
                                id="first-name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="last-name" className="block text-sm/6 font-medium text-white">
                            Last Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="lastName"
                                id="last-name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm/6 font-medium text-white">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-white">
                            Confirm Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirm-password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="country" className="block text-sm/6 font-medium text-white">
                            Country
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            {loading ? (
                                <span className="animate-spin">Loading...</span>
                            ) : (
                                'Sign up'
                            )}
                        </button>
                    </div>
                </form>

                {error && (
                    <p className="mt-4 text-center text-sm/6 text-red-500">
                        {error}
                    </p>
                )}

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Already a member?{" "}
                    <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
