import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'
import type {Profile} from "../../lib/hooks/useSession.ts";
import {supabase} from "../../lib/supabase.ts";

export default function DesktopProfileDropdown({user}: { user: Profile }) {
    return (
        <>
            <a
                href="/dashboard"
                className="text-sm/6 font-semibold text-white"
            >Dashboard</a>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="text-sm/6 font-semibold text-white flex gap-2">
                        Options
                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400"/>
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="px-4 py-3">
                        <p className="text-sm">Signed in as</p>
                        <p className="truncate text-sm font-medium text-gray-900">{user.username}</p>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            <a
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                                Account settings
                            </a>
                        </MenuItem>
                    </div>
                    <div className="py-1">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            supabase.auth.signOut()
                                .then(() => {
                                    window.location.href = '/login';
                                });
                        }}>
                            <MenuItem>
                                <button
                                    type="submit"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                >
                                    Sign out
                                </button>
                            </MenuItem>
                        </form>
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}
