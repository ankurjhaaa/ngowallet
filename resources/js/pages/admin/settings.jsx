import AdminLayout from"@/layouts/AdminLayout";
import { useForm, usePage } from"@inertiajs/react";
import { Download } from"lucide-react";

export default function Settings() {
 const { settings = {} } = usePage().props;
 const { data, setData, post, processing, errors } = useForm(settings);

 const submit = (e) => {
 e.preventDefault();
 post("/admin/settings");
 };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Settings</h1>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Configure site-wide parameters
                </p>
                <div className="mt-3">
                    <a
                        href="/admin/settings/database-backup"
                        className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 transition"
                    >
                        <i className="fas fa-download text-xs"></i>
                        Download Database Backup (.sql)
                    </a>
                </div>
            </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
 <div className="lg:col-span-2">
 <form onSubmit={submit} className="bg-white rounded-md p-4">
 {Object.keys(data).map((key) => (
 <div key={key} className="mb-4">
 <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
 {key.replace(/_/g,"")}
 </label>
 {key.includes("address") ? (
 <textarea
 value={data[key] ||""}
 onChange={(e) => setData(key, e.target.value)}
 rows={3}
 className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
 />
 ) : (
 <input
 type="text"
 value={data[key] ||""}
 onChange={(e) => setData(key, e.target.value)}
 className="w-full h-10 px-3 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-200"
 />
 )}
 {errors[key] && (
 <p className="text-xs text-red-700 mt-1">{errors[key]}</p>
 )}
 </div>
 ))}

 <button
 type="submit"
 disabled={processing}
 className="mt-2 px-4 py-2.5 rounded-md bg-red-800 text-white text-sm font-medium hover:bg-red-900 disabled:opacity-60"
 >
 Save Settings
 </button>
 </form>
 </div>

 <div className="lg:col-span-1">
 <div className="bg-white rounded-md p-4">
 <h2 className="text-lg font-medium text-gray-900 mb-2">Database Backup</h2>
 <p className="text-sm text-gray-500 mb-4">
 Download a full backup of your current database. It is recommended to perform backups manually on a regular basis.
 </p>
 <a
 href="/admin/backup"
 className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-md bg-emerald-800 text-white text-sm font-medium hover:bg-emerald-900 transition-colors"
 >
 <Download className="w-4 h-4 mr-2"/>
 Download Backup
 </a>
 </div>
 </div>
 </div>
 </AdminLayout>
 );
}
