import { useState, useEffect, useRef } from "react";

const VideoAnalytics = ({ videoUrl }) => {
    const [analytics, setAnalytics] = useState({
        name: "",
        email: "",
        pauses: 0,
        pauseTimestamps: [],
        replays: 0,
        speedChanges: 0,
    });

    const [prevSpeed, setPrevSpeed] = useState(1);
    const [userDetailsEntered, setUserDetailsEntered] = useState(false);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const videoRef = useRef(null);

    // const handlePause = () => {
    //     const videoElement = videoRef.current;
    //     if (videoElement) {
    //         const pauseTimeStamp = videoElement.currentTime;
    //         setAnalytics((prev) => ({
    //             ...prev,
    //             pauses: prev.pauses + 1,
    //             pauseTimestamps: [...prev.pauseTimestamps, pauseTimeStamp],
    //         }), sendAnalyticsToBackend);
    //     }
    // };

    const handlePause = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            const pauseTimeStamp = videoElement.currentTime;
    
            // Add the new timestamp only if it's different from the last one
            setAnalytics((prev) => {
                const lastTimestamp = prev.pauseTimestamps[prev.pauseTimestamps.length - 1];
                if (pauseTimeStamp !== lastTimestamp) {
                    return {
                        ...prev,
                        pauses: prev.pauses + 1,
                        pauseTimestamps: [...prev.pauseTimestamps, pauseTimeStamp],
                    };
                }
                return prev; // No change if timestamp is the same
            }, sendAnalyticsToBackend);
        }
    };

    const handleReplay = () => {
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.currentTime = 0;
            videoElement.play();
            setAnalytics((prev) => ({ ...prev, replays: prev.replays + 1 }), sendAnalyticsToBackend);
        }
    };

    const handleSpeedChange = (e) => {
        const currentSpeed = e.target.playbackRate;
        if (currentSpeed !== prevSpeed) {
            setAnalytics((prev) => ({ ...prev, speedChanges: prev.speedChanges + 1 }), sendAnalyticsToBackend);
            setPrevSpeed(currentSpeed);
        }
    };

    const handleUserDetailsSubmit = () => {
        if (nameInput && emailInput) {
            setAnalytics((prev) => ({ ...prev, name: nameInput, email: emailInput }));
            setUserDetailsEntered(true);
        } else {
            alert("Please enter both name and email");
        }
    };

    const sendAnalyticsToBackend = async () => {
        console.log("Sending analytics to backend:", analytics);
        try {
            const response = await fetch("http://localhost:5000/api/send-analytics", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(analytics),
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log("Analytics sent successfully:", result);
        } catch (error) {
            console.error("Error sending analytics:", error);
        }
    };

    useEffect(() => {
        if (userDetailsEntered) {
            sendAnalyticsToBackend();
        }
    }, [userDetailsEntered, analytics]); // Ensure analytics is a dependency to update on change

    return (
        <div className="p-4 bg-gray-100">
            <div className="max-w-xl mx-auto">
                {!userDetailsEntered ? (
                    <div className="bg-white p-4 shadow-md rounded">
                        <h2 className="text-lg font-bold mb-2">Enter your details to watch the video</h2>
                        <input
                            type="text"
                            className="border p-2 mb-2 w-full"
                            placeholder="Enter your name"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                        <input
                            type="email"
                            className="border p-2 mb-2 w-full"
                            placeholder="Enter your email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleUserDetailsSubmit}
                        >
                            Submit
                        </button>
                    </div>
                ) : (
                    <>
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            controls
                            className="w-full"
                            onPause={handlePause}
                            onRateChange={handleSpeedChange}
                        ></video>
                        <div className="mt-4 text-gray-700">
                            <p>Pauses: {analytics.pauses}</p>
                            <p>Replays: {analytics.replays}</p>
                            <p>Speed Changes: {analytics.speedChanges}</p>
                            <button
                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleReplay}
                            >
                                Replay Video
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoAnalytics;
