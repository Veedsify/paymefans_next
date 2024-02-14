import { LucideSearch, } from "lucide-react";
import ModelsSubscription from "../sub_componnets/models_subscription";
import HookupSubscription from "../sub_componnets/hookup_subscription";
import Link from "next/link";

const SideModels = () => {
  return (
    <div className="p-4 lg:block hidden lg:col-span-3">
      <div className="max-w-[450px]">
        <div className="relative overflow-auto mb-8">
          <label className="flex justify-between border border-gray-400 rounded-md pr-5 overflow-hidden">
            <input type="search" name="Search" id="search" className="p-4 w-full outline-none" placeholder="Search" />
            <LucideSearch className="self-center pr-2 cursor-pointer" size={30} />
          </label>
        </div>
        <div className="flex align-middle justify-between pb-12">
          <span className="font-bold">Models/Creators</span>
          <span>
            <Link href="/mix/models" className="bg-primary-dark-pink text-white px-3 text-sm py-1 font-semibold rounded-md">View All</Link>
          </span>
        </div>
        <div className="py-6 mb-6">
          <div className="grid gap-4 lg:gap-6 grid-cols-3">
            <ModelsSubscription />
            <ModelsSubscription />
            <ModelsSubscription />
          </div>
        </div>
        <hr className="" />
        <div className="flex align-middle justify-between  my-8">
          <span className="font-bold">Hookup</span>
          <span>
            <Link href="/hookup" className="bg-primary-dark-pink text-white px-3 text-sm py-1 font-semibold rounded-md">View All</Link>
          </span>
        </div>
        <div className="grid gap-4 lg:gap-6 grid-cols-3 ">
          <HookupSubscription />
          <HookupSubscription />
          <HookupSubscription />
          <HookupSubscription />
        </div>
      </div>
    </div>
  );
}

export default SideModels;