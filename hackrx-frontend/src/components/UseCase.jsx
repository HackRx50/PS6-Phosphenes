
// import React from 'react';
// import Section from './Section';
// import Heading from './Heading';
// import grid from "../assets/grid.png"; // Ensure this points to the correct path of your grid image

// const UseCaseGrid = () => {
//     const gridBackgroundStyle = "relative p-6 overflow-hidden";

//     return (
//         <Section>
//             <Heading
//                 className="md:max-w-md lg:max-w-2xl"
//                 title="Use Cases"
//                 tag="Use Cases"
//             />
//             <div className="flex items-center justify-center">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-5xl">

//                     {/* Zapier Integration */}
//                     <div className={`flex flex-col items-center shadow-lg p-6 border-r border-purple-800 border-b ${gridBackgroundStyle}`}>
//                         <div className="absolute top-0 left-0 w-full h-full opacity-100">
//                             <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
//                         </div>
//                         <div className="relative z-10">
//                             <img src="https://logo.clearbit.com/zapier.com" alt="Zapier Logo" className="w-12 mb-4" />
//                             <h2 className="text-lg font-bold mb-2">Zapier</h2>
//                             <p className="text-sm text-gray-400">Connect with Reflect with dozens of applications without code</p>
//                         </div>
//                     </div>

//                     {/* Readwise Integration */}
//                     <div className={`flex flex-col items-center border-l p-6 border-purple-800 border-b shadow-lg ${gridBackgroundStyle}`}>
//                         <div className="absolute top-0 left-0 w-full h-full opacity-100">
//                             <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
//                         </div>
//                         <div className="relative z-10">
//                             <img src="https://logo.clearbit.com/readwise.io" alt="Readwise Logo" className="w-12 mb-4" />
//                             <h2 className="text-lg font-bold mb-2">Readwise</h2>
//                             <p className="text-sm text-gray-400">Sync your reading highlights and notes with Reflect</p>
//                         </div>
//                     </div>

//                     {/* Google and Outlook Integration */}
//                     <div className={`flex flex-col items-center border-r border-purple-800 border-t p-6 shadow-lg ${gridBackgroundStyle}`}>
//                         <div className="absolute top-0 left-0 w-full h-full opacity-100">
//                             <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
//                         </div>
//                         <div className="relative z-10">
//                             <div className="flex space-x-4 mb-4">
//                                 <img src="https://logo.clearbit.com/google.com" alt="Google Logo" className="w-10" />
//                                 <img src="https://logo.clearbit.com/outlook.com" alt="Outlook Logo" className="w-10" />
//                             </div>
//                             <h2 className="text-lg font-bold mb-2">Google and Outlook</h2>
//                             <p className="text-sm text-gray-400">Integrate your contacts and calendars</p>
//                         </div>
//                     </div>

//                     {/* Chrome and Safari Integration */}
//                     <div className={`flex flex-col items-center border-l border-purple-800 border-t p-6 shadow-lg ${gridBackgroundStyle}`}>
//                         <div className="absolute top-0 left-0 w-full h-full opacity-100">
//                             <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
//                         </div>
//                         <div className="relative z-10">
//                             <div className="flex space-x-4 mb-4">
//                                 <img src="https://logo.clearbit.com/google.com" alt="Chrome Logo" className="w-10" />
//                                 <img src="https://logo.clearbit.com/safari.com" alt="Safari Logo" className="w-10" />
//                             </div>
//                             <h2 className="text-lg font-bold mb-2">Chrome and Safari</h2>
//                             <p className="text-sm text-gray-400">Save web clips and sync with your Kindle</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Section>
//     );
// };

// export default UseCaseGrid;

import React from 'react';
import Section from './Section';
import Heading from './Heading';
import grid from "../assets/grid.png"; // Ensure this points to the correct path of your grid image
import logo from "../assets/logo/logo-aura.png"; // Your application's logo path
import UseCaseCard from './UseCaseCard'; // Importing the Notification component
import marketing from "../assets/UseCase/marketing.png"
import education from "../assets/UseCase/education.png"
import corporate from "../assets/UseCase/corporate.png"
import recruitement from "../assets/UseCase/recruitement.png"
import { Gradient } from './design/Services';
import { GradientLight } from './design/Features';

const UseCaseGrid = () => {
    const gridBackgroundStyle = "relative p-4 md:p-6 overflow-hidden h-full w-full";

    return (
        <Section
            className="pt-[8rem] -mt-[5.25rem] mb-20"
            crosses
            crossesOffset="lg:translate-y-[5.25rem]"
            customPaddings
            id="Usecases"
            >
            <Heading
                className="md:max-w-md lg:max-w-2xl"
                title="Use Cases"
                tag="Who's this for?"
            />
            <div className="flex items-center justify-center relative">
                {/* Central logo with concentric circles */}
                <div className="absolute w-32 h-32 z-20 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        {/* Concentric circles with glow effect */}
                        <div className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-n-8/40 to-purple-950 opacity-5 animate-pulse shadow-[0_0_15px_5px_rgba(128,90,213,0.7)]"></div>
                        <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-purple-900 to-purple-800 opacity-5 animate-pulse shadow-[0_0_25px_10px_rgba(128,90,213,0.6)]"></div>
                        <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-purple-700 to-purple-600 opacity-5 animate-pulse shadow-[0_0_35px_15px_rgba(128,90,213,0.5)]"></div>

                        {/* Logo */}
                        <img src={logo} alt="App Logo" className="relative w-16 h-auto z-30" />
                    </div>
                </div>
<Gradient/>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  max-w-6xl relative z-10 w-full">
                    {/* First quadrant */}
                    <div className={`flex flex-col items-center shadow-lg border-r-[0.1px] border-b-[0.1px] border-purple-800 ${gridBackgroundStyle}`}>
                        <div className="absolute inset-0 w-full h-full">
                            <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-30 flex justify-center items-center w-[80%] h-full pb-4">
                            <UseCaseCard
                                imageSrc={marketing}
                                title="Marketing"
                                description="Marketers can convert product brochures into dynamic promotional videos."
                            />
                        </div>
                    </div>

                    {/* Second quadrant */}
                    <div className={`flex flex-col items-center border-l-[0.1px] border-b-[0.1px] border-purple-800 ${gridBackgroundStyle}`}>
                        <div className="absolute inset-0 w-full h-full">
                            <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-30 flex justify-center items-center w-[80%] h-full pb-4">
                            <UseCaseCard
                                imageSrc={recruitement}
                                title="HR and Recruitment"
                                description="HR professionals can create training or candidate introduction videos."
                            />
                        </div>
                    </div>

                    {/* Third quadrant */}
                    <div className={`flex flex-col items-center shadow-lg border-r-[0.1px] border-t-[0.1px] border-purple-800 ${gridBackgroundStyle}`}>
                        <div className="absolute inset-0 w-full h-full">
                            <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-30 flex justify-center items-center w-[80%] h-full pt-4">
                            <UseCaseCard
                                imageSrc={corporate}
                                title="Corporate"
                                description="Enhance internal communication with engaging video content."
                            />
                        </div>
                    </div>

                    {/* Fourth quadrant */}
                    <div className={`flex flex-col items-center shadow-lg border-l-[0.1px] border-t-[0.1px] border-purple-800 ${gridBackgroundStyle}`}>
                        <div className="absolute inset-0 w-full h-full">
                            <img src={grid} alt="Grid Background" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-30 flex justify-center items-center w-[80%] h-full pt-4">
                            <UseCaseCard
                                imageSrc={education}
                                title="Education"
                                description="Teachers can create interactive educational videos for their students."
                            />
                        </div>
                    </div>
                </div>
               
            </div>
            <div className="flex justify-center mt-10">
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            href="/pricing"
          >
            And much more...
          </a>
        </div>
        </Section>
    );
};

export default UseCaseGrid;
