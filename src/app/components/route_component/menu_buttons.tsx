"use client"
import { useModalContext } from "@/app/lib/pageContexts";
import { LucideChevronDown, LucideChevronUp, LucideHome, LucideMail, LucidePlus, LucideSearch, LucideUser2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link"
import { usePathname } from "next/navigation"
const MenuButtons = () => {
    const pathname = usePathname()

    return (
        <>
            {
                !pathname.includes("live") ? (<NavigationBar />) : (<NavigationBarSlide />)
            }
        </>
    )
}

const NavigationBar = () => {
    const { setModal } = useModalContext()
    return (
        <div className="fixed bottom-0 right-0 flex pointer-events-none w-full lg:justify-end">
            <div className="flex py-7 border-t items-center justify-between px-8 md:px-16 bg-white w-full lg:w-[33.3%] pointer-events-auto">
                <Link href="/mix" className="cursor-pointer">
                    <LucideHome />
                </Link>
                <span className="cursor-pointer">
                    <LucideSearch />
                </span>
                <span className="cursor-pointer" onClick={() => setModal()} >
                    <LucidePlus />
                </span>
                <Link href="/models" className="cursor-pointer">
                    <LucideUser2 />
                </Link>
                <Link href="/mix/messages" className="cursor-pointer">
                    <LucideMail />
                </Link>
            </div>
        </div>
    )
}

const NavigationBarSlide = () => {
    const { setModal } = useModalContext()
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    return (
        <div className={`fixed  duration-300 transition-all right-0 flex pointer-events-all w-full lg:justify-end z-50 md:-bottom-0 pointer-events-none ${openMenu ? "-bottom-0" : "-bottom-20"}`}>
            <div className="flex py-7 items-center justify-between px-8 md:px-16 bg-white w-full lg:w-[33.3%] pointer-events-auto">
                <Link href="/mix" className="cursor-pointer">
                    <LucideHome />
                </Link>
                <span className="cursor-pointer">
                    <LucideSearch />
                </span>
                <span className="cursor-pointer" onClick={() => setModal()} >
                    <LucidePlus />
                </span>
                <Link href="/models" className="cursor-pointer">
                    <LucideUser2 />
                </Link>
                <Link href="/mix/messages" className="cursor-pointer">
                    <LucideMail />
                </Link>
            </div>
            <div className="absolute h-8 w-16 -top-8 bg-white left-1/2 -translate-x-1/2 flex items-center justify-center rounded-tl-lg rounded-tr-lg cursor-pointer border border-b-0 border-gray-300 md:hidden"
                onClick={() => setOpenMenu(!openMenu)}
            >
                {openMenu ? (
                    <LucideChevronDown size={30} className="cursor-pointer" />
                ) : (
                    <LucideChevronUp size={30} className="cursor-pointer" />
                )}
            </div>
        </div>
    )
}

export default MenuButtons;