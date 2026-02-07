import { useState } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import { Link } from "@inertiajs/react";

export default function login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <PublicLayout>
            <div className="min-h-[80vh] flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">

                    {/* Tab Header */}
                    <div className="flex mb-6">
                        <div className="flex-1 text-center py-2 rounded-md bg-red-800 text-white text-sm font-medium">
                            Login
                        </div>
                        <Link
                            href="/signup"
                            className="flex-1 text-center py-2 rounded-md text-gray-500 text-sm font-medium hover:bg-gray-100"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-bold text-gray-900 text-center">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Login using your phone number
                    </p>

                    {/* Form */}
                    <form className="mt-6 space-y-4">

                        {/* Phone */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter phone number"
                                className="mt-1 w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="mt-1 w-full px-4 py-2.5 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-red-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        </div>

                        <div className="text-right text-sm">
                            <Link href="/forgot-password" className="text-red-800 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-800 text-white py-2.5 rounded-md hover:bg-red-700 transition"
                        >
                            Login
                        </button>
                    </form>
                </div>

            </div>
        </PublicLayout>
    );
}
