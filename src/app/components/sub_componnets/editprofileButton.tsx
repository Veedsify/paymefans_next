"use client"
import { AuthUserProps } from "@/app/types/user";
import { Facebook, Instagram, LucideCamera, LucideInstagram, Twitter, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EditProfileButton = ({ user }: { user: AuthUserProps | undefined }) => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null)
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [open])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            setFile(e.currentTarget.files?.[0])
        }
    }
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="sm:px-4 py-1 px-2 text-sm font-semibold text-white bg-black border border-black rounded text-color">
                Edit Profile
            </button>
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 w-full h-full bg-white z-50 flex items-center justify-center transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0"}`}>
                <span
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => setOpen(false)}>
                    <X />
                </span>
                <div className="bg-white p-5 rounded-md shadow-lg md:min-w-[550px] max-h-[600px] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h1 className="font-bold text-lg md:text-xl mb-5">Edit Profile</h1>
                    <label htmlFor="imageUpload">
                        <div className="relative border-[3px] mb-3 inline-block p-2 rounded-full border-dotted group">
                            <Image
                                src={file ? URL.createObjectURL(file) : user?.user.profile_image || "/site/avatar.png"}
                                alt=""
                                width={100}
                                priority
                                height={100}
                                className="object-cover w-20 h-20 rounded-full lg:w-24 lg:h-24 aspect-square "
                            />
                            <div className="opacity-0 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer group-hover:opacity-100 transition-all duration-200">
                                <LucideCamera size={30} className="text-white" />
                            </div>
                        </div>
                    </label>
                    <input
                        onChange={handleFileChange}
                        type="file" id="imageUpload" className="hidden" />

                    {/* <form onSubmit={(e) => e.preventDefault()} action=""> */}
                    <div>
                        <input
                            type="text"
                            defaultValue={user?.user.name}
                            className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                            placeholder="Name "
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                            defaultValue={user?.user.location ? user?.user.location : ""}
                            placeholder="Location "
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            defaultValue={user?.user.email ? user?.user.email : ""}
                            className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl select-none"
                            readOnly
                            disabled
                            placeholder="Email "
                        />
                    </div>
                    <div>
                        <textarea
                            name=""
                            id=""
                            rows={6}
                            className="resize-none w-full block outline-none border mb-3 border-gray-300 p-4 text-black rounded-xl"
                            placeholder="Bio"
                            defaultValue={user?.user.bio ? user?.user.bio : ""}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="w-full block border mb-5 border-gray-300 p-4 outline-none text-black rounded-xl"
                            placeholder="Website"
                        />
                    </div>
                    <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5">
                        <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                            <Instagram />
                        </div>
                        <input
                            type="text"
                            className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                            placeholder="https://instagram.com/@paymefans"
                        />
                    </div>
                    <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5">
                        <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                            <Twitter />
                        </div>
                        <input
                            type="text"
                            className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                            placeholder="https://twitter.com/@paymefans"
                        />
                    </div>
                    <div className="grid grid-cols-12 border rounded-xl items-center justify-center mb-5">
                        <div className="flex items-center justify-center col-span-2 bg-gray-100 h-full
                        ">
                            <Facebook />
                        </div>
                        <input
                            type="text"
                            className="w-full block border-gray-300 p-4 outline-none text-black  col-span-10"
                            placeholder="https://facebook.com/@paymefans"
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            defaultValue={"Save"}
                            className="w-full block border mb-3 bg-primary-dark-pink p-4 outline-none text-white rounded-xl cursor-pointer"
                            placeholder="Website "
                        />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default EditProfileButton;