import Image from "next/image";

const ModelsSubscription = () => {
    return (
        <div className="flex flex-col items-center gap-2 select-none">
            <Image
                width={100}
                height={100}
                priority
                src="/images/login_image.png" alt="" className="object-cover w-20 h-20 rounded-full lg:w-24 lg:h-24 aspect-square" />
            <p className="text-sm font-bold text-center">Cartoon🦁</p>
            <div className="text-sm text-center">
                <span className="block text-xs text-center text-slate-400 ">Monthly</span>
            </div>
            <button className="block w-full px-3 py-1 text-xs font-semibold text-white rounded-md bg-primary-dark-pink">Subscribe</button>
        </div>
    );
}

export default ModelsSubscription;