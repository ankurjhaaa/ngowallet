import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  LayoutDashboard, Users, ClipboardList, Receipt, 
  Banknote, PieChart, UserPlus, Settings, LogOut, Menu,
  Bell, Search, User, ChevronRight, ArrowLeft
} from "lucide-react";
import { useLanguage, LanguageSwitcher } from "@/contexts/LanguageContext";

export default function AdminLayout({ children }) {
  const { url, props } = usePage();
  const user = props.auth?.user;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { ngoName, t, lang } = useLanguage();

  const active = (path) => url.startsWith(path);

  const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Plans", href: "/admin/plans", icon: ClipboardList },
  { label: "Transactions", href: "/admin/transactions", icon: Receipt },
  { label: "Expense", href: "/admin/expense", icon: Banknote },
  { label: "Reports", href: "/admin/reports", icon: PieChart },
  { label: "Add Member", href: "/admin/add-member-page", icon: UserPlus },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const SidebarContent = () => (
  <div className="flex flex-col h-full bg-slate-900 text-slate-300">
  {/* Brand */}
  <div className="h-20 flex items-center px-4 border-b border-slate-800">
  <div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-md bg-red-600 flex items-center justify-center text-white">
  <LayoutDashboard className="h-5 w-5" />
  </div>
  <span className="text-lg font-bold tracking-tight text-white truncate max-w-[150px]">
  {ngoName || "NGO Hub"}
  </span>
  </div>
  </div>

 {/* Navigation */}
 <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
 {menuItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className={cn(
"group flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200",
 active(item.href)
 ?"bg-red-600 text-white"
 :"hover:bg-slate-800 hover:text-white"
 )}
 onClick={() => setIsMobileOpen(false)}
 >
 <div className="flex items-center gap-3">
 <item.icon className={cn("h-5 w-5 transition-colors", active(item.href) ?"text-white":"text-slate-500 group-hover:text-red-400")} />
 <span className="font-medium text-sm">{t['nav' + item.label.replace(' ', '')] || item.label}</span>
 </div>
 {active(item.href) && <ChevronRight className="h-4 w-4 opacity-70"/>}
 </Link>
 ))}
 </nav>

 {/* User Profile */}
 <div className="p-4 border-t border-slate-800">
 <div className="bg-slate-800/50 rounded-md p-4 mb-4">
 <div className="flex items-center gap-3">
 <div className="h-10 w-10 rounded-md bg-red-500 text-white flex items-center justify-center font-bold text-sm">
 {user?.name?.charAt(0) ??"A"}
 </div>
 <div className="flex-1 min-w-0">
 <p className="text-sm font-semibold text-white truncate">
 {user?.name ??"Admin User"}
 </p>
 <p className="text-xs text-slate-500 truncate">
 {user?.email}
 </p>
 </div>
 </div>
 </div>

 <Link 
 href="/logout"
 method="post"
 as="button"
 className="w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-semibold text-red-400 hover:text-white hover:bg-red-600 transition-all border border-red-900/50 active:scale-95"
 >
 <LogOut className="h-4 w-4"/>
 {t.navLogout || "Logout"}
 </Link>
 </div>
 </div>
 );

  return (
  <div dir={lang === 'ur' ? 'rtl' : 'ltr'} className={cn(
    "min-h-screen flex bg-slate-50 overflow-x-hidden selection:bg-red-100 selection:text-red-900",
    lang === 'ur' ? 'font-urdu text-right' : ''
  )}>
 {/* Desktop Sidebar */}
 <aside className={cn(
    "hidden lg:block fixed inset-y-0 z-40 w-72",
    lang === 'ur' ? 'right-0' : 'left-0'
  )}>
 <SidebarContent />
 </aside>

 {/* Main Area */}
 <div className={cn(
    "flex-1 flex flex-col min-h-screen min-w-0",
    lang === 'ur' ? 'lg:mr-72' : 'lg:ml-72'
  )}>
 {/* Header */}
 <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 sm:px-4 flex items-center justify-between">
  <div className="flex items-center gap-4">
  {url !== '/admin/dashboard' && (
    <Button variant="ghost" size="icon" className="rounded-md hover:bg-slate-100" onClick={() => window.history.back()}>
      <ArrowLeft className="h-5 w-5 text-slate-600" />
    </Button>
  )}
 <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
 <SheetTrigger asChild>
 <Button variant="ghost"size="icon"className="lg:hidden rounded-md hover:bg-slate-100 hidden">
 <Menu className="h-5 w-5 text-slate-600"/>
 </Button>
 </SheetTrigger>
 <SheetContent side={lang === 'ur' ? 'right' : 'left'} className="p-0 border-none w-72">
 <SidebarContent />
 </SheetContent>
 </Sheet>
 <h1 className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
 Portal Overview
 </h1>
 </div>

 <div className="flex px-4 items-center gap-2 sm:gap-4">
 <div className="hidden md:flex items-center relative">
 <Search className={cn("absolute h-4 w-4 text-slate-400", lang === 'ur' ? 'right-3' : 'left-3')}/>
 <input 
 type="text"
 placeholder={t.search || "Search everything..."}
 className={cn(
    "py-2 bg-slate-100 border-none rounded-md text-xs w-64 focus:ring-2 focus:ring-red-100 transition-all",
    lang === 'ur' ? 'pr-10 pl-4' : 'pl-10 pr-4'
  )}
 />
 </div>
 <div className="hidden sm:block">
     <LanguageSwitcher />
 </div>
 <Button variant="ghost"size="icon"className="rounded-md text-slate-500 relative hidden sm:flex">
 <Bell className="h-5 w-5"/>
 <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-md border-2 border-white"></span>
 </Button>
 <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
 <Link href="/profile"className="flex items-center gap-2 group">
 <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-red-50 group-hover:text-red-600 transition-colors border border-slate-200">
 <User className="h-4 w-4 sm:h-5 sm:w-5"/>
 </div>
 </Link>
 </div>
 </header>

 {/* Content */}
 <main className="flex-1 p-4 sm:p-4 w-full max-w-full overflow-x-hidden pt-6">
 {/* Flash Messages */}
 {props.flash?.success && (
 <div className="mb-4 rounded-md bg-emerald-50 border border-emerald-100 p-4 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in slide-in-bg-top-4">
 <CheckCircle2 className="h-5 w-5 text-emerald-500"/>
 {props.flash.success}
 </div>
 )}
 {props.flash?.error && (
 <div className="mb-4 rounded-md bg-red-50 border border-red-100 p-4 text-red-800 text-sm flex items-center gap-3 animate-in fade-in slide-in-bg-top-4">
 <i className="fas fa-exclamation-circle text-red-500"></i>
 {props.flash.error}
 </div>
 )}

 {children}
 </main>

  {/* Mobile Bottom Navigation */}
  <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-40 pb-safe">
    {[
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Plans", href: "/admin/plans", icon: ClipboardList },
      { label: "Member", href: "/admin/add-member-page", icon: UserPlus },
      { label: "Reports", href: "/admin/reports", icon: PieChart },
      { label: "More", href: "#", icon: Menu, isMenu: true }
    ].map((item) => (
      item.isMenu ? (
        <Sheet key="more" open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-red-500">
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          </SheetTrigger>
        </Sheet>
      ) : (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center justify-center p-2 transition-colors",
            active(item.href) ? "text-red-600" : "text-slate-500 hover:text-red-500"
          )}
        >
          <item.icon className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">{t['nav' + item.label.replace(' ', '')] || item.label}</span>
        </Link>
      )
    ))}
  </div>
  </div>
 </div>
 );
}

function CheckCircle2({ className, ...props }) {
 return (
 <svg
 {...props}
 xmlns="http://www.w3.org/2000/svg"
 width="24"
 height="24"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={className}
 >
 <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
 <path d="m9 12 2 2 4-4"/>
 </svg>
 )
}
