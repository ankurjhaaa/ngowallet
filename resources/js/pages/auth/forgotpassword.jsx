import PublicLayout from "@/layouts/PublicLayout";
import { Link } from "@inertiajs/react";

export default function forgotpassword() {
    return (
        <PublicLayout>
            <div className="min-h-[80vh] flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6">

                    {/* Tab Header (disabled look) */}
                    <div className="flex mb-6">
                        <Link
                            href="/login"
                            className="flex-1 text-center py-2 rounded-md text-gray-500 text-sm font-medium hover:bg-gray-100"
                        >
                            Login
                        </Link>
                        <Link
                            href="/signup"
                            className="flex-1 text-center py-2 rounded-md text-gray-500 text-sm font-medium hover:bg-gray-100"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-bold text-gray-900 text-center">
                        Forgot Password?
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Enter your phone number to reset your password
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
                                placeholder="Enter registered phone number"
                                className="mt-1 w-full px-4 py-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-800 text-white py-2.5 rounded-md hover:bg-red-700 transition"
                        >
                            Send Reset Link / OTP
                        </button>
                    </form>

                    {/* Back link */}
                    <p className="text-sm text-center text-gray-500 mt-4">
                        Remembered your password?{" "}
                        <a href="/login" className="text-red-800 hover:underline">
                            Login
                        </a>
                    </p>
                </div>

            </div>
        </PublicLayout>
    );
}
