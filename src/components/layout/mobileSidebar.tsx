import type {Profile} from "../../lib/hooks/useSession.ts";
import {Dialog, DialogPanel} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {navigation} from "./header.tsx";
import {supabase} from "../../lib/supabase.ts";


export default function MobileSidebar({ user, loading, mobileMenuOpen, setMobileMenuOpen }: {
    user: Profile | null;
    loading: boolean;
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}) {

    return (
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
                <div className="flex items-center justify-between">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Master of Web</span>
                        <img
                            alt="logo"
                            src="/logo.svg"
                            className="h-8 w-auto"
                        />
                    </a>
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-m-2.5 rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/25">
                        <div className="space-y-2 py-6">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="py-6">
                            {loading && <div className="text-base/7 font-semibold text-white">Loading...</div>}
                            {(!loading && !user) && (
                                <a
                                    href="/login"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                                >
                                    Log in
                                </a>
                            )}
                            {(!loading && user) && (
                                <>
                                    <div className="text-base/7 text-white mb-2.5">
                                        Logged in as: <span className="ms-1">{user.username}</span>
                                    </div>
                                    <a
                                        href="/dashboard"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                                    >
                                        Dashboard
                                    </a>
                                    <a
                                        href="/profile"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                                    >
                                        Profile
                                    </a>
                                    <button
                                        className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                                        onClick={() => {
                                            supabase.auth.signOut()
                                                .then(() => window.location.href = "/login");
                                        }}
                                    >
                                        Log out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    );
}