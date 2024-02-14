import { LucideAlertCircle } from "lucide-react";
import Toggle from "./checked";
import Image from "next/image";

const SetSubscription = () => {
    return (
        <div className={`mt-10 `} >
            <h1 className="font-bold text-2xl mb-3">Subscription</h1>
            <p>Setup a subscription price for your fans</p>
            <div className="text-center bg-[#FAE2FF] my-4 flex justify-center items-center text-primary-dark-pink w-full gap-2 p-8 rounded-xl  cursor-pointer">
                <LucideAlertCircle />
                <p>You will receive 100% for each transaction</p>
            </div>
            <div className="inline-flex gap-2 my-4">
                <Toggle />
                Enable free subscription
            </div>
            <h1 className="font-bold mb-2">Select duration</h1>
            <div className="w-full border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl flex gap-2 ">
                <div className="flex gap-2 w-full">
                    <Image
                        width={20}
                        height={20}
                        priority
                        src="/site/coin.svg" alt="" />
                    <input
                        type="tel"
                        placeholder="Price"
                        className="w-full outline-none font-bold text-gray-700"
                    />
                </div>
                <h2 className="text-primary-dark-pink font-bold">₦0</h2>
            </div>
            <div>
                <input
                    type="text"
                    className="w-full block border mb-3 border-gray-300 p-4 outline-none text-black rounded-xl"
                    placeholder="Select duration "
                />
            </div>
        </div>
    );
}

export default SetSubscription;