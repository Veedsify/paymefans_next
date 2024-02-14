"use client"
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ChooseUserName = () => {
    const ref = useRef<HTMLInputElement>(null);
    const clearInput = () => {
        if (ref.current) {
            ref.current.value = "";
        }
    }

    return (
        <div className="min-h-screen lg:p-0 bg-black p-5">
            <div className="lg:grid grid-cols-2 items-start justify-center mx-auto">
                <div className="min-h-screen hidden lg:block relative">
                    <Image width={1200} height={1200} priority src="/images/auth_image.jpeg" alt="Login Image" className="h-full absolute object-cover inset-0 w-full " />
                </div>
                <div className="h-full lg:p-14 2xl:p-28">
                    <div className="max-w-screen-xl pt-12 mx-auto mb-24 md:mt-16">
                        <Link href="/">
                            <Image width={150} height={150} priority src="/site/logo.svg" alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex flex-col items-start justify-center max-w-screen-xl mx-auto">
                        <h1 className="mt-auto mb-5 text-2xl font-bold text-white">Choose your Username</h1>
                        <form action="" className="flex-1 w-full mb-5" autoComplete="false">
                            <div className="flex flex-col gap-3 mb-4 md:max-w-96">
                                <div className="flex items-center gap-1 outline outline-white outline-1 rounded-lg px-3">
                                    <input
                                        ref={ref}
                                        type="text" id="name" className="block w-full py-3 font-bold text-white bg-transparent text-sm outline-none accent-primary-dark-pink" placeholder="Username" />
                                    <div
                                        onClick={clearInput}
                                    >
                                        <X
                                            className="w-5 h-5 cursor-pointer" stroke="#CC0DF8" strokeWidth={3} size={25} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="block w-full px-3 py-3 text-sm font-bold text-white rounded-lg bg-primary-dark-pink md:max-w-96 disabled:bg-gray-600">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ChooseUserName;