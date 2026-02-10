import AdminLayout from "@/layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";

export default function AddMember() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        role: "user",
        gender: "",
        address: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/add-member");
    };

    return (
        <AdminLayout>

            {/* ================= HEADER ================= */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Add New Member
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Create a new user or member account
                </p>
            </div>

            {/* ================= FORM ================= */}
            <div className="max-w-4xl bg-white rounded-lg shadow-sm p-6">

                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* NAME */}
                    <div>
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                            className="form-input"
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData("email", e.target.value)}
                            className="form-input"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    {/* PHONE */}
                    <div>
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={e => setData("phone", e.target.value)}
                            className="form-input"
                        />
                        {errors.phone && <p className="error">{errors.phone}</p>}
                    </div>

                    {/* ROLE */}
                    <div>
                        <label className="form-label">Role</label>
                        <select
                            value={data.role}
                            onChange={e => setData("role", e.target.value)}
                            className="form-input"
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="member">Member</option>
                        </select>
                    </div>

                    

                    {/* GENDER */}
                    <div>
                        <label className="form-label">Gender</label>
                        <select
                            value={data.gender}
                            onChange={e => setData("gender", e.target.value)}
                            className="form-input"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                   

                    {/* PASSWORD */}
                    <div>
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData("password", e.target.value)}
                            className="form-input"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    {/* ADDRESS */}
                    <div className="md:col-span-2">
                        <label className="form-label">Address</label>
                        <textarea
                            rows="3"
                            value={data.address}
                            onChange={e => setData("address", e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>

                    {/* ACTIONS */}
                    <div className="md:col-span-2 flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="
                                px-6 py-2.5 rounded-md text-sm font-medium
                                bg-red-800 text-white
                                hover:bg-red-900 transition
                                disabled:opacity-60
                            "
                        >
                            Create Member
                        </button>

                        <Link
                            href="/admin/dashboard"
                            className="
                                px-6 py-2.5 rounded-md text-sm
                                text-gray-600 hover:bg-gray-50 transition
                            "
                        >
                            Cancel
                        </Link>
                    </div>

                </form>
            </div>

            {/* ================= LOCAL STYLES ================= */}
            <style jsx>{`
                .form-label {
                    display: block;
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: #4b5563;
                    margin-bottom: 0.25rem;
                }
                .form-input {
                    width: 100%;
                    height: 2.5rem;
                    padding: 0 0.75rem;
                    border-radius: 0.375rem;
                    border: 1px solid #d1d5db;
                    font-size: 0.875rem;
                    color: #374151;
                }
                .form-input:focus {
                    outline: none;
                    border-color: #fca5a5;
                    box-shadow: 0 0 0 2px rgba(252, 165, 165, 0.4);
                }
                .error {
                    font-size: 0.75rem;
                    color: #b91c1c;
                    margin-top: 0.25rem;
                }
            `}</style>

        </AdminLayout>
    );
}
