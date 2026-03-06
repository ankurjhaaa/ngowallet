import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  LayoutDashboard, Users, ClipboardList, Receipt, 
  Banknote, PieChart, UserPlus, Settings, LogOut, Menu,
  Bell, Search, User, ChevronRight, ArrowLeft, X
} from "lucide-react";
import { useLanguage, LanguageSwitcher } from "@/contexts/LanguageContext";

export default function AdminLayout({ children, title }) {
  const { url, props } = usePage();
  const user = props.auth?.user;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { ngoName, t, lang } = useLanguage();

  const active = (path) => url.startsWith(path);

  const allMenuItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, role: "admin" },
  { label: "Users", href: "/admin/users", icon: Users, role: "admin" },
  { label: "Plans", href: "/admin/plans", icon: ClipboardList, role: "admin" },
  { label: "Transactions", href: "/admin/transactions", icon: Receipt, role: "admin" },
  { label: "Expense", href: "/admin/expense", icon: Banknote, role: "admin" },
  { label: "Reports", href: "/admin/reports", icon: PieChart, role: "admin" },
  { label: "Add Member", href: "/admin/add-member-page", icon: UserPlus, role: "admin" },
  { label: "Settings", href: "/admin/settings", icon: Settings, role: "admin" },
  { label: "My Profile", href: "/profile", icon: User, role: "user" },
  ];

  const menuItems = allMenuItems.filter(item => {
    if (user?.role === "admin") return item.role === "admin" || item.role === "user";
    return item.role === "user";
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-600">
      {/* Brand area */}
      <div className="h-20 flex items-center px-6 border-b border-slate-100 relative">
        <div className="flex items-center gap-3 py-2">
          <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
            <LayoutDashboard className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 truncate max-w-[180px]">
            {ngoName || "Bazm-e-Haidri"}
          </span>
        </div>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto hidden-scrollbar">
        {menuItems.map((item) => {
          const isActive = active(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-red-600 text-white shadow-md"
                  : "hover:bg-slate-50 hover:text-slate-900"
              )}
              onClick={() => setIsMobileOpen(false)}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "h-4 w-4 transition-colors duration-200", 
                  isActive ? "text-white" : "text-slate-400 group-hover:text-red-600"
                )} />
                <span className="font-semibold text-sm tracking-tight">
                  {t['nav' + item.label.replace(' ', '')] || item.label}
                </span>
              </div>
              {isActive && <ChevronRight className="h-3 w-3 text-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Area */}
      <div className="p-4 space-y-3 border-t border-slate-100 bg-slate-50/50">
        {/* User Card */}
        <div className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-500 text-white flex items-center justify-center font-bold text-base shadow-inner">
              {user?.name?.charAt(0) ?? "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate mb-0.5">
                {user?.name ?? "Admin User"}
              </p>
              <p className="text-[10px] font-medium text-slate-400 truncate tracking-wider uppercase">
                {user?.role || "Administrator"}
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <Link
          href="/logout"
          method="post"
          as="button"
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-red-600 hover:text-white hover:bg-red-600 transition-all duration-200 border border-red-100 active:scale-[0.98] group shadow-sm bg-white"
        >
          <LogOut className="h-4 w-4" />
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
  <h1 className="text-base font-bold text-slate-900 tracking-tight ml-1 mr-2 truncate max-w-[180px] sm:max-w-none">
  {title || "Portal"}
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
  {(() => {
    const bottomNavItems = user?.role === "admin" 
      ? [
          { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
          { label: "Plans", href: "/admin/plans", icon: ClipboardList },
          { label: "Member", href: "/admin/add-member-page", icon: UserPlus },
          { label: "Reports", href: "/admin/reports", icon: PieChart },
          { label: "More", href: "#", icon: Menu, isMenu: true }
        ]
      : [
          { label: "Home", href: "/profile", icon: User },
          { label: "More", href: "#", icon: Menu, isMenu: true }
        ];

    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-40 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        {bottomNavItems.map((item) => (
          item.isMenu ? (
            <Sheet key="more" open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <button className="flex flex-col items-center justify-center p-2 text-slate-500 hover:text-red-600 transition-colors">
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-[10px] font-bold">{item.label}</span>
                </button>
              </SheetTrigger>
            </Sheet>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 transition-all",
                active(item.href) ? "text-red-600" : "text-slate-400 hover:text-red-500"
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1 transition-transform", active(item.href) && "scale-110")} />
              <span className="text-[10px] font-bold">{t['nav' + item.label.replace(' ', '')] || item.label}</span>
            </Link>
          )
        ))}
      </div>
    );
  })()}
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
