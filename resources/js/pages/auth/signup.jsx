import { useState } from "react";
import PublicLayout from "@/layouts/PublicLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        password: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post('/signup_post');
    };
    return (
        <PublicLayout>
            <div className="min-h-[80vh] flex items-center justify-center px-4">

                <div className="w-full max-w-md rounded-lg p-6 border border-emerald-200 bg-white shadow-sm">

                    {/* Mosque Icon */}
                    <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <i className="fas fa-mosque text-lg"></i>
                        </div>
                    </div>

                    {/* Tab Header */}
                    <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                        <Link
                            href="/login"
                            className="flex-1 text-center py-2 rounded-md text-gray-500 text-sm font-medium hover:text-gray-700 transition"
                        >
                            Login
                        </Link>
                        <div className="flex-1 text-center py-2 rounded-md bg-emerald-800 text-white text-sm font-medium shadow-sm">
                            Sign Up
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-bold text-gray-900 text-center">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Sign up using your phone number
                    </p>

                    {/* Form */}
                    <form className="mt-6 space-y-4" onSubmit={submit}>

                        {/* Name */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Enter full name"
                                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50"
                            />
                            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Phone Number (10 digits)
                            </label>
                            <input
                                type="tel"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value.replace(/\D/g, ''))}
                                placeholder="9876543210"
                                maxLength="10"
                                pattern="[6-9][0-9]{9}"
                                className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50"
                            />
                            {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Create password"
                                    className="mt-1 w-full px-4 py-2.5 border border-gray-200 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-400 bg-gray-50"
                                />
                                {errors.password && <div className="text-red-600 text-sm mt-1">{errors.password}</div>}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-emerald-800 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition font-medium disabled:opacity-60"
                        >
                            Create Account
                        </button>
                    </form>
                </div>

            </div>
        </PublicLayout>
    );
}
