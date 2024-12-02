'use client'

import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import useSession from "../../lib/hooks/useSession.ts";
import DesktopProfileDropdown from "./desktopProfileDropdown.tsx";
import MobileSidebar from "./mobileSidebar.tsx";

export const navigation = [
    { name: 'About', href: '/about' },
    { name: 'Articles', href: '/articles' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Courses', href: '/courses' },
    { name: 'Forum', href: '/forum' },
]

export default function Header() {
    const { user, loading } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="w-screen fixed z-10 bg-gray-900 bg-opacity-50">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Master of Web</span>
                        <img
                            alt="logo"
                            src="/logo.svg"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex gap-x-12 lg:flex-1 lg:justify-end">
                    {loading && <div className="text-sm/6 font-semibold text-white">Loading...</div>}
                    {(!loading && user) && (
                        <DesktopProfileDropdown user={user} />
                    )}
                    {(!loading && !user) && (
                        <a
                            href="/login"
                            className="text-sm/6 font-semibold text-white"
                        >Log in</a>
                    )}
                </div>
            </nav>
            <MobileSidebar
                user={user} loading={loading}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />
        </header>
    )
}
