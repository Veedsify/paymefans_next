"use client"
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useUser } from "@/app/lib/userContext";
import { useRouter } from "next/navigation";
import axiosServer from "@/app/utils/axios";
import axios from "axios";
import swal from "sweetalert";

const ChooseUserName = () => {
    const router = useRouter()
    const ref = useRef<HTMLInputElement>(null);
    const [buttonActive, setButtonActive] = useState<boolean>(false);
    const { user, setUser } = useUser()
    const clearInput = () => {
        if (ref.current) {
            ref.current.value = "";
        }
    }

    const checkForUsername = async () => {
        if (!ref.current?.value) {
            setButtonActive(false);
            return;
        }
        if (ref.current.value.length < 8) {
            setButtonActive(false);
            return;
        }
        const res = await axiosServer('/auth/signup/username', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: ref.current?.value
            },
        })

        if (res.data) {
            if (res.data.status === true) {
                setButtonActive(true);
                return
            }
        }
        if (res.status === 200) {
            if (res.data.status === false) {
                setButtonActive(false);
                return
            }
        }
    }

    const createNewUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {

            if (ref.current?.value) {
                const createUser = await axiosServer("/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: {
                        fullname: user?.name,
                        user_id: Math.floor(Math.random() * 1000000).toString(),
                        username: ref.current?.value,
                        name: user?.name,
                        email: user?.email,
                        phone: user?.phone,
                        location: user?.location,
                        password: user?.password,
                    },
                });
                if (createUser.data.status === true) {
                    setUser(null)
                    return swal({
                        title: "Success",
                        text: "Account created successfully",
                        icon: "success",
                        buttons: {
                            cancel: false,
                            confirm: {
                                text: "Ok",
                                value: true,
                                visible: true,
                                className: "bg-primary-dark-pink text-white rounded-lg font-bold text-sm",
                                closeModal: true
                            }
                        }
                    }).then((willRedirect) => {
                        if (willRedirect) {
                            router.push("/login");
                        }
                    })
                }

                if (createUser.data.status === false) {
                    swal({
                        title: "Error",
                        text: createUser.data.message,
                        icon: "error",
                        buttons: {
                            cancel: false,
                            confirm: {
                                text: "Ok",
                                value: true,
                                visible: true,
                                className: "bg-primary-dark-pink text-white rounded-lg font-bold text-sm",
                                closeModal: true
                            }
                        }
                    })
                }
            }
        } catch (err) {
            return swal({
                title: "Error",
                text: "Sorry an error occured",
                icon: "error",
                buttons: {
                    cancel: false,
                    confirm: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: "bg-primary-dark-pink text-white rounded-lg font-bold text-sm",
                        closeModal: true
                    }
                }
            })

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
                        <form
                            onSubmit={createNewUser}
                            action="" className="flex-1 w-full mb-5" autoComplete="false">
                            <div className="flex flex-col gap-3 mb-4 md:max-w-96">
                                <div className="flex items-center gap-1 outline outline-white outline-1 rounded-lg px-3">
                                    <input
                                        onChange={checkForUsername}
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
                                {buttonActive ? (
                                    <button
                                        className="block w-full px-3 py-3 text-sm font-bold text-white rounded-lg bg-primary-dark-pink md:max-w-96 disabled:bg-gray-600">Next</button>
                                ) : (
                                    <button
                                        disabled={true}
                                        className="block w-full px-3 py-3 text-sm font-bold text-white rounded-lg md:max-w-96 bg-gray-600">Next</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ChooseUserName;