"use client";

import { cn } from "../lib/utils1";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className
}) => {
    const containerRef = React.useRef(null);
    const scrollerRef = React.useRef(null);

    useEffect(() => {
        addAnimation();
    }, []);

    const [start, setStart] = useState(false);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty("--animation-direction", "forwards");
            } else {
                containerRef.current.style.setProperty("--animation-direction", "reverse");
            }
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        key={item.name}
                        className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] w-[350px] max-w-full rounded-3xl  flex-shrink-0  md:w-[350px]"
                        style={{
                            backgroundImage: `url(${item.backgroundUrl})`,
                        }}
                    >
                        <div className="relative z-2 flex flex-col min-h-[12rem] p-[2.4rem] pointer-events-none">
                            <div className="flex justify-between  items-center mt-auto mb-5 ">
                                <img
                                    src={item.iconUrl}
                                    width={68}
                                    height={68}
                                    alt={item.title}
                                    className="rounded-full aspect-square"
                                />
                                <h3 className=" text-left h3 font-code text-xl text-n-1 uppercase tracking-wider ">
                                    {item.name}
                                </h3>
                                {/* <Arrow /> */}
                            </div>
                            {/* <h5 className="h5 mb-5">{item.title}</h5> */}
                            <p className="body-2 text-n-3">{item.text}</p>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
