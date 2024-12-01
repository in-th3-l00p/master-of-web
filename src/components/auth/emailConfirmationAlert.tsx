import { CheckCircleIcon } from '@heroicons/react/20/solid';
import clsx from "clsx";
import React from "react";

interface AlertProps {
    message: string;
    showAlert: boolean;
    setShowAlert: (showAlert: boolean) => void;
}

export const EmailConfirmationAlert: React.FC<AlertProps> = ({ message, showAlert, setShowAlert }) => {
    return (
        <div className={clsx(
            "bg-green-50 p-4",
            "top-0 left-0 w-full z-10",
            "md:max-w-fit md:m-8 md:rounded-md transition-all",
            showAlert ? "fixed" : "hidden"
        )}>
            <div className="flex">
                <div className="shrink-0">
                    <CheckCircleIcon aria-hidden="true" className="size-5 text-green-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Check your email</h3>
                    <div className="mt-2 text-sm text-green-700">
                        <p>{message}</p>
                    </div>
                    <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                            <button
                                type="button"
                                onClick={() => setShowAlert(false)}
                                className="rounded-md bg-green-50 px-2 py-1.5 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
