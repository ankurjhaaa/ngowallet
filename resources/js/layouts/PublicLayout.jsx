import { Link, usePage } from"@inertiajs/react";
import { useState } from"react";
import { LanguageProvider, LanguageSwitcher, useLanguage } from"@/contexts/LanguageContext";
import { Button } from"@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from"@/components/ui/sheet";
import { Menu, LogOut, User, LayoutDashboard, Heart, Target, Home as HomeIcon, Award } from"lucide-react";
import { cn } from"@/lib/utils";

export default function PublicLayout({ children }) {
 return <LayoutInner>{children}</LayoutInner>;
}

function LayoutInner({ children }) {
 const { auth, settings = {} } = usePage().props;
 const user = auth?.user;
 const { t, lang } = useLanguage();
 const isRtl = lang ==="ur";
 const currentUrl = usePage().url;

 const navItems = [
 { label: t.navHome, href:"/", icon: HomeIcon },
 { label: t.navVision, href:"/vision", icon: Target },
 { label: t.navPrograms, href:"/programs", icon: Award },
 { label: t.navJoin, href:"/join", icon: Heart },
 ];

 return (
 <div className={cn("min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900", isRtl &&"rtl")} dir={isRtl ?"rtl":"ltr"}>
 {/* Header */}
 <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md">
 <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-4">
 {/* Logo */}
 <Link href="/"className="flex items-center gap-2.5 group">
 <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-800 text-white transition-transform group-hover:scale-105 active:scale-95">
 <i className="fas fa-mosque text-sm"></i>
 </div>
 <div className="flex flex-col">
 <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
 {t.navBrand}
 </span>
 <span className="text-[10px] font-medium text-emerald-700 mt-0.5">
 {t.navTagline}
 </span>
 </div>
 </Link>

 {/* Desktop Navigation */}
 <nav className="hidden lg:flex items-center gap-1">
 {navItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className={cn(
"px-4 py-2 text-sm font-medium transition-colors rounded-md",
 currentUrl === item.href
 ?"bg-emerald-50 text-emerald-900"
 :"text-slate-600 hover:bg-slate-100 hover:text-slate-900"
 )}
 >
 {item.label}
 </Link>
 ))}
 </nav>

 {/* Right Side Tools */}
 <div className="flex items-center gap-2">
 <div className="mr-2 hidden sm:block">
 <LanguageSwitcher />
 </div>

 {/* Desktop Auth */}
 <div className="hidden sm:flex items-center gap-2">
 {!user ? (
 <Button asChild variant="default"size="sm"className="rounded-md px-5">
 <Link href="/login">
 {t.navLogin}
 </Link>
 </Button>
 ) : (
 <Button asChild variant="outline"size="sm"className="rounded-md gap-2 border-emerald-100 text-emerald-800">
 <Link href={user.role ==="admin"?"/admin/dashboard":"/profile"}>
 <User className="h-4 w-4"/>
 <span className="max-w-[100px] truncate">{user.name}</span>
 </Link>
 </Button>
 )}
 </div>

 {/* Mobile Navigation Trigger */}
 <Sheet>
 <SheetTrigger asChild>
 <Button variant="ghost"size="icon"className="lg:hidden rounded-md hover:bg-emerald-50 text-slate-600">
 <Menu className="h-5 w-5"/>
 <span className="sr-only">Toggle navigation</span>
 </Button>
 </SheetTrigger>
 <SheetContent side={isRtl ?"right":"left"} className="flex flex-col gap-4 pt-12">
 <SheetHeader>
 <SheetTitle className="text-left flex items-center gap-2 px-2">
 <div className="h-8 w-8 rounded-md bg-emerald-800 flex items-center justify-center text-white text-xs">
 <i className="fas fa-mosque"></i>
 </div>
 <span>{t.navBrand}</span>
 </SheetTitle>
 </SheetHeader>
 <div className="flex flex-col gap-2">
 {navItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className={cn(
"flex items-center gap-3 px-4 py-3 text-base font-medium transition-all rounded-md",
 currentUrl === item.href
 ?"bg-emerald-50 text-emerald-900"
 :"text-slate-600 hover:bg-slate-50 hover:text-slate-900"
 )}
 >
 <item.icon className={cn("h-5 w-5", currentUrl === item.href ?"text-emerald-700":"text-slate-400")} />
 {item.label}
 </Link>
 ))}
 </div>

 <div className="mt-auto flex flex-col gap-3 pb-8">
 <div className="flex items-center justify-between px-4 mb-2">
 <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{t.language ||'Language'}</span>
 <LanguageSwitcher />
 </div>
 {!user ? (
 <Button asChild variant="default"className="w-full rounded-md h-12">
 <Link href="/login">{t.navLogin}</Link>
 </Button>
 ) : (
 <div className="flex flex-col gap-2">
 <Button asChild variant="outline"className="w-full rounded-md h-12 justify-start gap-3 border-emerald-100">
 <Link href={user.role ==="admin"?"/admin/dashboard":"/profile"}>
 <LayoutDashboard className="h-5 w-5 text-emerald-600"/>
 {user.role ==="admin"?"Dashboard": t.navProfile}
 </Link>
 </Button>
 <Link
 href="/logout"
 method="post"
 as="button"
 className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
 >
 <LogOut className="h-5 w-5"/>
 {t.navLogout}
 </Link>
 </div>
 )}
 </div>
 </SheetContent>
 </Sheet>
 </div>
 </div>
 </header>

 {/* Main Content */}
 <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden">
 {children}
 </main>

 {/* Footer */}
 <footer className="bg-slate-900 text-slate-300 pb-20 sm:pb-8 pt-16">
 <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
 <div className="space-y-4">
 <div className="flex items-center gap-2.5">
 <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-600 text-white">
 <i className="fas fa-mosque text-xs"></i>
 </div>
 <span className="text-lg font-bold tracking-tight text-white leading-none">
 {t.navBrand}
 </span>
 </div>
 <p className="text-slate-400 leading-relaxed max-w-xs">{t.footerAboutDesc}</p>
 </div>

 <div className="space-y-4">
 <h3 className="font-semibold text-white tracking-tight">{t.footerLinks}</h3>
 <ul className="space-y-2.5">
 {navItems.map((item) => (
 <li key={item.href}>
 <Link href={item.href} className="text-slate-400 hover:text-emerald-400 transition-colors">
 {item.label}
 </Link>
 </li>
 ))}
 <li><Link href="/privacy-policy"className="text-slate-400 hover:text-emerald-400 transition-colors">{t.footerPrivacyPolicy}</Link></li>
 </ul>
 </div>

 <div className="space-y-4">
 <h3 className="font-semibold text-white tracking-tight">{t.footerContact}</h3>
 <div className="space-y-3">
 <p className="flex items-start gap-3 group">
 <div className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-900/30 transition-colors">
 <i className="fas fa-envelope text-emerald-500 text-xs"></i>
 </div>
 <span className="pt-1.5 text-slate-400 group-hover:text-slate-200 transition-colors">{settings.ngo_email ||'info@bazm-e-haidri.org'}</span>
 </p>
 <p className="flex items-start gap-3 group">
 <div className="h-8 w-8 rounded-md bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-900/30 transition-colors">
 <i className="fas fa-phone text-emerald-500 text-xs"></i>
 </div>
 <span className="pt-1.5 text-slate-400 group-hover:text-slate-200 transition-colors">{settings.ngo_phone ||'+91 90000 00000'}</span>
 </p>
 </div>
 </div>

 <div className="space-y-5">
 <h3 className="font-semibold text-white tracking-tight">{t.footerFollow}</h3>
 <div className="flex gap-4">
 {['facebook','instagram','twitter'].map((platform) => (
 <a key={platform} href="#"className="h-10 w-10 flex items-center justify-center rounded-md bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1">
 <i className={`fab fa-${platform}`}></i>
 </a>
 ))}
 </div>
 </div>
 </div>

 <div className="container mx-auto px-4 mt-10 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
 <p className="text-slate-500 text-xs">
 © {new Date().getFullYear()} {settings.ngo_name || t.footerCopy}
 </p>
 {user?.role ==="admin"&& (
 <Link href="/admin/dashboard"className="text-emerald-500 hover:underline text-xs">Admin Dashboard</Link>
 )}
 </div>
 </footer>

 {/* Mobile Bottom Navigation (Glassmorphism style) */}
 <nav className="sm:hidden fixed bottom-4 left-4 right-4 h-16 bg-white/80 backdrop-blur-xl border border-white/20 rounded-md z-40 overflow-hidden ring-1 ring-black/5">
 <div className="grid grid-cols-4 h-full">
 {navItems.map((item) => (
 <Link
 key={item.href}
 href={item.href}
 className={cn(
"flex flex-col items-center justify-center gap-1 transition-all relative",
 currentUrl === item.href ?"text-emerald-700":"text-slate-400"
 )}
 >
 <item.icon className={cn("h-5 w-5 transition-transform", currentUrl === item.href &&"scale-110")} />
 <span className="text-[10px] font-medium">{item.label}</span>
 {currentUrl === item.href && (
 <div className="absolute top-0 w-8 h-1 bg-emerald-700 rounded-md-full"/>
 )}
 </Link>
 ))}
 </div>
 </nav>
 </div>
 );
}
