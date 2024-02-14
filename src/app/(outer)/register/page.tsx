"use client"
import { countries } from "@/app/lib/locations";
import { useUser } from "@/app/lib/userContext";
import { UserRegisterType } from "@/app/types/user";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

const Register = () => {
    const [country, setCountry] = useState<string>("Nigeria");
    const [countryList, setCountryList] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserRegisterType | null>(null);
    const { setUser } = useUser();

    const UserInputCaptured = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Update userData state using spread operator to ensure immutability:
        setUserData({
            ...userData,
            [name]: value,
        } as UserRegisterType);
    };

    useEffect(() => {
        // Update user state in the context only when userData changes:
        if (userData) {
            setUser(userData);
        }

        // Log userData for debugging or validation:
        console.log(userData);
    }, [userData, setUser]);

    const selectCountry = (e: MouseEvent<HTMLButtonElement>) => {
        console.log("clicked");
        const code = e.currentTarget.getAttribute("data-code");
        const selectedCountry = countries.find(country => country.code === code);

        if (selectedCountry) {
            // Only update if a valid country is selected:
            setCountry(selectedCountry.name);
            setUserData({
                ...userData,
                location: selectedCountry.name, // Ensure consistent key name
            } as UserRegisterType);
        }

        setCountryList(false);
    };

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
                    <h1 className="mt-auto mb-5 text-2xl font-bold  text-white">Sign up</h1>
                    <form action="" className="flex-1 w-full mb-5" autoComplete="false">
                        <div className="flex flex-col gap-3 mb-4">
                            <input type="text" onChange={UserInputCaptured} name="fullname" className="block w-full px-3 py-3 text-sm font-bold text-white  bg-transparent rounded-lg outline outline-white outline-1  md:max-w-lg" placeholder="Full Name" />
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <input type="email" onChange={UserInputCaptured} name="email" className="block w-full px-3 py-3 text-sm font-bold text-white  bg-transparent rounded-lg outline outline-white outline-1  md:max-w-lg" placeholder="Email" />
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <input type="tel" onChange={UserInputCaptured} name="phone" className="block w-full px-3 py-3 text-sm font-bold text-white  bg-transparent rounded-lg outline outline-white outline-1  md:max-w-lg" placeholder="Phone Number" />
                        </div>
                        <div className="flex flex-col gap-3 mb-4">
                            <input
                                onFocus={() => setCountryList(true)}
                                onChange={UserInputCaptured}
                                name="location" className="block w-full px-3 py-3 text-sm font-medium bg-transparent text-white  rounded-lg outline outline-white outline-1 md:max-w-lg" value={country} />
                            {countryList && (
                                <div className="overflow-y-auto rounded-lg max-h-80 p-3 md:max-w-lg bg-white ">
                                    {countries.map((country, index) => (
                                        <button
                                            onClick={selectCountry}
                                            data-code={country.code}
                                            className="block w-full py-2 text-left text-sm font-bold border-b cursor-pointer text-black hover:bg-messages-unread" key={index}>{country.name}</button>
                                    ))}
                                </div>
                            )
                            }
                        </div>
                        <div className="flex flex-col gap-3 mb-5">
                            <input type="password" onChange={UserInputCaptured} name="password" className="block w-full px-3 py-3 text-sm font-bold text-white  bg-transparent rounded-lg outline outline-white outline-1  md:max-w-lg" placeholder="Password" />
                        </div>
                        <div className="flex items-center w-full mb-6">
                            <input type="checkbox" name="terms" onChange={UserInputCaptured} className="w-5 h-5 mt-1 mr-2 bg-transparent accent-primary-dark-pink" value="accepted" />
                            <label htmlFor="terms" className="text-sm font-bold  text-white cursor-pointer">I am 18+ and it is legal to access this site in my country.</label>
                        </div>
                        <div>
                            <button className="block w-full px-3 py-3 text-sm font-bold text-white rounded-lg bg-primary-dark-pink md:max-w-lg">Sign up</button>
                        </div>
                    </form>
                    <div className="mt-12">
                        <p className="text-sm font-bold text-white ">Have an account? <Link href="/login" className="font-bold text-primary-dark-pink">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;