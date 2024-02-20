import UserNotFound from "@/app/components/route_component/usernotfound";
import ProfileTabs from "@/app/components/sub_componnets/profile_tabs";
import { authOptions } from "@/app/utils/auth";
import { prismaQuery } from "@/app/utils/prisma";
import {
    LucideCalendar,
    LucideLink,
    LucideLock,
    LucideMail,
    LucideMapPin,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
    const id = params.id
    const session = await getServerSession(authOptions)
    const userdata = await prismaQuery.user.findFirst({
        where: {
            username: id
        }
    })

    if (!userdata) return <UserNotFound userid={id} />

    return (
        <>
            <div className="overflow-hidden">
                <Image
                    src={userdata?.profile_banner || "/site/banner.png"}
                    alt="Home Banner"
                    width={700}
                    height={400}
                    priority
                    className="inset-0 aspect-21-9 object-cover w-full h-full"
                />
                <div className="relative flex w-full px-2 md:px-5">
                    <Image
                        src={userdata?.profile_image || "/site/avatar.png"}
                        alt=""
                        priority
                        height={100}
                        width={100}
                        className="absolute object-cover md:w-24 md:h-24 w-20 h-20 sm:border-4 border-2 rounded-full md:-top-12  -top-6 border-primary-dark-pink "
                    />
                    <div className="flex items-center gap-3 sm:p-3 ml-auto p-3  ">
                        <button>
                            <p className="sm:px-4 py-1 px-2  text-sm font-semibold border border-black rounded font text-color ">
                                Follow
                            </p>
                        </button>
                        <button>
                            <p className="sm:px-4 py-1 px-2 text-sm font-semibold text-white bg-black border border-black rounded text-color">
                                Subscribe
                            </p>
                        </button>
                        <Link
                            href="/mix/chats/1"
                            className="p-1 text-white rounded bg-primary-dark-pink "
                        >
                            <LucideMail className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-2 px-2 mt-2 mb-12 md:px-5">
                    <div className="flex flex-col ">
                        <h1 className="font-bold ">{userdata?.name}</h1>
                        <small className="text-gray-500 ">@{userdata?.username}</small>
                    </div>
                    <p className="font-medium mb-2 leading-normal text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-medium text-primary-text-dark-pink text-sm mb-2"
                    >
                        <LucideLink className="text-primary-text-dark-pink" size={18} />
                        keshaadams.com/about
                    </Link>
                    <div className="flex gap-3 flex-wrap text-sm items-center font-semibold text-gray-700 mb-2">
                        <span className="flex gap-2 items-center">
                            <LucideMapPin className="text-primary-text-dark-pink" size={18} />
                            <span>Lagos, {userdata?.location}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <LucideLock className="text-primary-text-dark-pink" size={18} />
                            <span>Model</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <LucideCalendar className="text-primary-text-dark-pink" size={18} />
                            <span>Joined Nov 2015</span>
                        </span>
                    </div>

                    <div className="flex gap-2 mb-3  flex-wrap sm:text-base text-sm">
                        <span className="flex gap-2 items-center">
                            <h1 className="font-bold text-sm">2.3K</h1>
                            <p className="font-medium text-gray-500 text-sm">Followers</p>
                        </span>
                        <span className="flex gap-2 items-center">
                            <h1 className="font-bold text-sm">38.9K</h1>
                            <p className="font-medium text-gray-500 text-sm">Following</p>
                        </span>
                        <span className="flex gap-2 items-center ">
                            <h1 className="font-bold text-sm">13.3K</h1>
                            <p className="font-medium text-gray-500 text-sm">Subscribers</p>
                        </span>
                    </div>
                </div>
            </div>
            <ProfileTabs />
        </>
    );
}

export default ProfilePage;