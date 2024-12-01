import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { EmailConfirmationAlert } from './emailConfirmationAlert';

interface LoginData {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('registered')) setShowAlert(true);
    }, []);

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
            const { email, password } = formData;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
            } else {
                console.log('Login successful:', data);
                setLoading(false);
                window.location.href = '/dashboard';
            }
        } catch (err) {
            console.error(err);
            setError('An unexpected error occurred.');
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/logo.svg" alt="Master of Web" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>

            {showAlert && (
                <EmailConfirmationAlert
                    message="Please check your email to verify your account and activate your login."
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                />
            )}

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
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
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all duration-300 ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="relative flex justify-center items-center">
                                    <div className="absolute animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white/50 border-solid"></div>
                                    <span className="opacity-0">Signing in...</span>
                                </div>
                            ) : (
                                'Sign in'
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
                    Not a member?{" "}
                    <a href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Create an account
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
