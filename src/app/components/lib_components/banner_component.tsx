"use client"
import { documentcookie } from "@/app/utils/documentcookie";
import { LucideCamera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface BannerComponentProps {
    profile_banner?: string
}
const BannerComponent = ({ profile_banner }: BannerComponentProps) => {
    const [file, setFile] = useState<File | null>(null)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] !== undefined) {
            if (e.target.files[0].size > 2000000) return toast.error('Image size should be less than 2MB')
            const acceptedImageTypes = ['image/jpeg', 'image/png']
            if (!acceptedImageTypes.includes(e.target.files[0].type)) return toast.error('Only .jpeg and .png images are allowed')
            setFile(e.target.files[0])
            toast.promise(uploadBannerImage(e.target.files[0]), {
                loading: 'Uploading banner image...',
                success: 'Banner image uploaded successfully',
                error: 'Failed to upload banner image',
            })
        }
    }
    const uploadBannerImage = async (file: File) => {
        const formData = new FormData()
        formData.append('banner', file)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/profile/banner/change`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${documentcookie}`,
                },
            })
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Failed to upload banner image')
            }
        } catch (error) {
            console.error(error)
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