"use client"
import { getUser } from "@/app/lib/user";
import { useUser } from "@/app/lib/userContext";
import axiosServer from "@/app/utils/axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import toast from "react-hot-toast";

const Login = () => {
    const { setUser } = getUser()
    const router = useRouter()
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    });
    const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
    }
    const submitLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginThisUser = await axiosServer.post("/auth/login", {
            data: loginCredentials
        });
        if (loginThisUser?.data?.status === true) {
            toast.success("Login successful");
            document.cookie = `token=${loginThisUser.data.token}`;
            setUser(loginThisUser.data.user)
            return router.push("/mix");
        } else if (loginThisUser.data.status === false) {
            toast.error("Invalid Login credentials");
            return;
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
                            <Image width={150} height={150} priority className="h-auto" src="/site/logo.svg" alt="Logo" />
                        </Link>
                    </div>
                    <h1 className="mt-auto mb-5 text-2xl font-bold text-white ">Sign in</h1>
                    <form action="" className="flex-1 w-full mb-5" onSubmit={submitLoginForm}>
                        <div className="flex flex-col gap-3 mb-4">
                            <input type="email" name="email" id="email" onChange={handleLoginInput} className="block w-full px-3 py-3 text-sm font-bold text-white bg-transparent rounded-lg outline outline-white outline-1 md:max-w-lg" placeholder="Email" />
                        </div>
                        <div className="flex flex-col gap-3 mb-5">
                            <input type="password" name="password" id="password" onChange={handleLoginInput} className="block w-full px-3 py-3 text-sm font-bold text-white bg-transparent rounded-lg outline outline-white outline-1 md:max-w-lg" placeholder="Password" />
                        </div>
                        <button className="w-full px-3 py-3 text-sm font-bold text-white rounded-lg bg-primary-dark-pink md:max-w-lg">Sign in</button>
                    </form>
                    <div className="flex items-center md:max-w-lg w-full mt-5">
                        <div className="flex">
                            <input type="checkbox" name="remember" id="remember" className="mr-2 text-sm accent-primary-dark-pink" />
                            <label htmlFor="remember" className="text-sm font-bold    text-white cursor-pointer">Remember me</label>
                        </div>
                        <Link href="/" className="text-sm font-bold text-primary-dark-pink  ml-auto">Forgot password?</Link>
                    </div>
                    <div className="mt-28">
                        <p className="text-sm font-bold text-white">Don&apos;t have an account? <Link href="/register" className="text-primary-dark-pink">Sign up</Link></p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;