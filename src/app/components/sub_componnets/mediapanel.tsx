import { useState } from "react";
import MediaPanelImageCard from "./media_panel_image_card";

const MediaPanel = () => {
    const [arraySort, setArraySort] = useState("all")

    const toggleThisSort = (sort: string) => {
        setArraySort(sort)
    }

    return (
        <div className="py-4">
            <div className="py-3 mb-2 flex items-center gap-4">
                <button
                    onClick={() => toggleThisSort("all")}
                    className="px-5 leading-none py-2 rounded-lg text-xs font-bold bg-gray-200">
                    All
                </button>
                <button
                    onClick={() => toggleThisSort("image")}
                    className="px-5 leading-none py-2 rounded-lg text-xs font-bold bg-messages-unread text-primary-dark-pink">
                    Photos
                </button>
                <button
                    onClick={() => toggleThisSort("video")}
                    className="px-5 leading-none py-2 rounded-lg text-xs font-bold bg-gray-200">
                    Videos
                </button>
            </div>
            <div className="grid grid-cols-3 gap-1 mb-20 select-none">
                <MediaPanelImageCard sort={arraySort} />
            </div>
        </div>
    );
}

export default MediaPanel;