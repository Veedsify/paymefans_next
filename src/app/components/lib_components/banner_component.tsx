"use client"
import { LucideCamera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface BannerComponentProps {
    profile_banner?: string
}
const BannerComponent = ({ profile_banner }: BannerComponentProps) => {
    const [file, setFile] = useState<File | null>(null)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] !== undefined) {
            setFile(e.target.files[0])
        }
    }
    return (
        <div className="relative">
            <Image
                src={file ? URL.createObjectURL(file) : profile_banner || "/site/banner.png"}
                alt="Home Banner"
                width={700}
                height={400}
                priority
                className="inset-0 aspect-21-9 object-cover w-full h-full"
            />
            <form className="absolute inset-0 bg-black bg-opacity-50">
                <label htmlFor="banner_image_upload" className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <span className="select-none">
                        <LucideCamera stroke="#fff" size={30} />
                    </span>
                    <input
                        onChange={handleImageChange}
                        type="file"
                        id="banner_image_upload"
                        className="hidden"
                    />
                </label>
            </form>
        </div>
    );
}

export default BannerComponent;