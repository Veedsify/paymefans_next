"use client"
import React, { useEffect, useRef } from "react";

interface VideoStreamerProps {
    className?: string;
}

const VideoStreamer: React.FC<VideoStreamerProps> = ({ className }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const fetchVideoStream = async () => {
            try {
                // Check if navigator.mediaDevices.getUserMedia is supported
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    console.error("Camera and microphone access not supported!");
                    return;
                }

                // Request user permission for camera and microphone
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1920 },
                        height: { ideal: 1080 }
                    },
                    audio: true,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing video stream:", error);
            }
        };

        // Request permission when component mounts
        fetchVideoStream();
    }, []);

    return (
        <>
            <video ref={videoRef} className={className} autoPlay />
        </>
    );
};

export default VideoStreamer;
