


// import { check } from "../assets";
// import logo from "../assets/logo/logo-aura.png";
// import { collabApps, collabContent, collabText } from "../constants";
// import Button from "./Button";
// import Section from "./Section";
// import { GradientLight } from "./design/Features.jsx";
// import { Gradient } from "./design/Roadmap.jsx";
// import { LeftCurve, RightCurve } from "./design/TechStack.jsx";

// const Collaboration = () => {
//     return (
//         <Section crosses>
//             <div className="container lg:flex">
//                 <div className="max-w-[35rem] -mt-12">
//                     <h2 className="h2 mb-4 md:mb-8">
//                         You don't have to choose between cost, time, and quality
//                     </h2>

//                     <ul className="max-w-[22rem] mb-10 md:mb-14">
//                         {collabContent.map((item) => (
//                             <li className="mb-3 py-3" key={item.id}>
//                                 <div className="flex items-center">
//                                     <img src={check} width={24} height={24} alt="check" />
//                                     <h6 className="body-2 ml-5">{item.title}</h6>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>

//                     <Button>Try it now</Button>
//                 </div>

//                 <div className="xl:w-[38rem] lg:mt-16 lg:ml-auto">
//                     <Gradient />

//                     <div className="relative left-1/2 flex w-[25rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100">
//                         <div className="flex w-120 aspect-square m-auto border border-n-6 rounded-full">
//                             <div className="flex w-80 aspect-square m-auto border border-n-6 rounded-full">
//                                 <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
//                                     <div className="flex w-40 aspect-square m-auto border border-n-6 rounded-full">
//                                         <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
//                                             <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
//                                                 <img
//                                                     src={logo}
//                                                     width={48}
//                                                     height={48}
//                                                     alt="brainwave"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <ul>
//                             {collabApps.map((app, index) => (
//                                 <li
//                                     key={app.id}
//                                     className={`absolute top-0 left-1/2 h-1/2 -ml-[2.6rem] origin-bottom rotate-${index * 90}`}
//                                 >
//                                     <div
//                                         className={`relative -top-[2.6rem] flex flex-col items-center justify-center w-[6.2rem] h-[6.2rem] bg-n-7 border border-n-1/15 rounded-full -rotate-${index * 90}`}
//                                     >
//                                         {/* Icon */}
//                                         <div className="w-6 h-6 ">
//                                             <img src={app.icon} alt={app.title} className="w-full h-full" />
//                                         </div>

//                                         {/* Title */}
//                                         <h4 className="text-2xl -mb-2 text-white">{app.title}</h4>

//                                         {/* Subtitle */}
//                                         <p className="text-[0.50rem] text-gray-300 text-wrap text-center">{app.subtitle}</p>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
                        
//                         <GradientLight className="opacity-40 blur-lg -translate-x-1/2" />
//                         <LeftCurve />
//                         <RightCurve />
//                     </div>
//                 </div>
//             </div>
//         </Section>
//     );
// };

// export default Collaboration;
import { check } from "../assets";
import logo from "../assets/logo/logo-aura.png";
import { collabApps, collabContent, collabText } from "../constants";
import Button from "./Button";
import Section from "./Section";
import { GradientLight } from "./design/Features.jsx";
import { Gradient } from "./design/Roadmap.jsx";
import { LeftCurve, RightCurve } from "./design/TechStack.jsx";

const Collaboration = () => {
    return (
        <Section crosses id="impact">
            <div className="container lg:flex">
                <div className="max-w-[35rem] -mt-12">
                    <h2 className="h2 mb-4 md:mb-8">
                        You don't have to choose between cost, time, and quality
                    </h2>

                    <ul className="max-w-[22rem] mb-10 md:mb-14">
                        {collabContent.map((item) => (
                            <li className="mb-3 py-3" key={item.id}>
                                <div className="flex items-center">
                                    <img src={check} width={24} height={24} alt="check" />
                                    <h6 className="body-2 ml-5">{item.title}</h6>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Button>Try it now</Button>
                </div>

                <div className="xl:w-[38rem] lg:mt-16 lg:ml-auto">
                    <Gradient />

                    {/* Outer circle (stationary) */}
                    <div className="relative left-1/2 flex w-[25rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale:75 md:scale-100    ">
                        <div className="flex w-120 aspect-square m-auto border border-n-6 rounded-full">
                            <div className="flex w-80 aspect-square m-auto border border-n-6 rounded-full">
                                <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
                                    <div className="flex w-40 aspect-square m-auto border border-n-6 rounded-full">
                                        <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
                                            <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                                                <img
                                                    src={logo}
                                                    width={48}
                                                    height={48}
                                                    alt="brainwave"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rotating small circles */}
                        <ul className="animate-rotate-small">
                            {collabApps.map((app, index) => (
                                <li
                                    key={app.id}
                                    className={`absolute top-0 left-1/2 h-1/2 -ml-[2.6rem] origin-bottom rotate-${index * 90}`}
                                >
                                    <div
                                        className={`relative -top-[2.6rem] flex flex-col items-center justify-center w-[6.2rem] h-[6.2rem] bg-n-7 border border-n-1/15 rounded-full -rotate-${index * 90}`}
                                    >
                                        {/* Icon */}
                                        <div className="w-6 h-6 ">
                                            <img src={app.icon} alt={app.title} className="w-full h-full" />
                                        </div>

                                        {/* Title */}
                                        <h4 className="text-2xl -mb-2 text-white">{app.title}</h4>

                                        {/* Subtitle */}
                                        <p className="text-[0.50rem] text-gray-300 text-wrap text-center font-grotesk">{app.subtitle}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        <GradientLight className="opacity-40 blur-lg -translate-x-1/2" />
                        <LeftCurve />
                        <RightCurve />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default Collaboration;
