// "use client";

// import React, { useState } from "react";
// import Section from "./Section";
// import Heading from "./Heading";

// const faqs = [
//     {
//       question: "What is AURA.ai and how does it work?",
//       answer:
//         "AURA.ai is an AI-powered text-to-video platform that converts written content like PDFs, brochures, and text inputs into engaging videos. It offers customization options such as voiceovers, background music, multilingual support, and interactive quizzes.",
//     },
//     {
//       question: "Can AURA.ai handle multilingual content?",
//       answer:
//         "Yes, AURA.ai supports over 64 languages, allowing you to cre+-ate videos in different languages with voiceover and subtitle options for accurate representation.",
//     },
//     {
//       question: "What customization features does AURA.ai offer for videos?",
//       answer:
//         "AURA.ai allows users to customize voiceovers, background music, visuals, logos, pacing, and even add quizzes. These options ensure that the final video aligns with your brand's identity and messaging.",
//     },
//     {
//       question: "Does AURA.ai integrate with other platforms?",
//       answer:
//         "Yes, AURA.ai integrates with Learning Management Systems (LMS), HR platforms, and other business tools. API integrations allow for seamless integration with your existing systems.",
//     },
//     {
//       question: "What types of analytics does AURA.ai provide?",
//       answer:
//         "AURA.ai offers detailed analytics such as video engagement, completion rates, quiz scores, and attention heatmaps, helping businesses optimize content based on user interaction.",
//     },
//     {
//       question: "Can AURA.ai be used for HR and recruitment purposes?",
//       answer:
//         "Yes, AURA.ai includes an AI interview feature that allows recruiters to conduct video-based interviews, with performance analytics provided through a dashboard for efficient assessment.",
//     },
//   ];
  
// export default function FAQ() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleAnswer = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <Section className="pt-[10rem] "
//     crosses
//     crossesOffset="lg:translate-y-[5.25rem]"
//     customPaddings>
//       <div className="flex flex-col items-center justify-center mb-32">
//         <Heading
//           className="md:max-w-md lg:max-w-2xl mb-8"
//           title="AI Video Generation FAQs"
//           tag="FAQs"
//         />
//         <div className="w-full max-w-2xl">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className="mb-4 rounded-lg shadow-md  bg-n-9/40 backdrop-blur border border-n-1/10 "
//             >
//               <button
//                 onClick={() => toggleAnswer(index)}
//                 className="flex justify-between w-full py-4 px-6 rounded-lg text-left text-lg font-semibold transition-all  hover:bg-n-9/10"
//               >
//                 <span>{faq.question}</span>
//                 <span className="text-white">{activeIndex === index ? "−" : "→"}</span>
//               </button>
//               {activeIndex === index && (
//                 <div className="px-6 py-4 pb-4 text-gray-300">
//                   {faq.answer}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </Section>
//   );
// }

"use client";

import React, { useState } from "react";
import Section from "./Section";
import Heading from "./Heading";
import bgcircle from "../assets/circle.webp";

const faqs = [
  {
    question: "What is AURA.ai and how does it work?",
    answer:
      "AURA.ai is an AI-powered text-to-video platform that converts written content like PDFs, brochures, and text inputs into engaging videos. It offers customization options such as voiceovers, background music, multilingual support, and interactive quizzes.",
  },
  {
    question: "Can AURA.ai handle multilingual content?",
    answer:
      "Yes, AURA.ai supports over 64 languages, allowing you to create videos in different languages with voiceover and subtitle options for accurate representation.",
  },
  {
    question: "What customization features does AURA.ai offer for videos?",
    answer:
      "AURA.ai allows users to customize voiceovers, background music, visuals, logos, pacing, and even add quizzes. These options ensure that the final video aligns with your brand's identity and messaging.",
  },
  {
    question: "Does AURA.ai integrate with other platforms?",
    answer:
      "Yes, AURA.ai integrates with Learning Management Systems (LMS), HR platforms, and other business tools. API integrations allow for seamless integration with your existing systems.",
  },
  {
    question: "What types of analytics does AURA.ai provide?",
    answer:
      "AURA.ai offers detailed analytics such as video engagement, completion rates, quiz scores, and attention heatmaps, helping businesses optimize content based on user interaction.",
  },
  {
    question: "Can AURA.ai be used for HR and recruitment purposes?",
    answer:
      "Yes, AURA.ai includes an AI interview feature that allows recruiters to conduct video-based interviews, with performance analytics provided through a dashboard for efficient assessment.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Section
      className="relative pt-[10rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="faq"
    >
      {/* Background Image */}
      <div className="absolute inset-0 top-40 -z-10 left-160">
        <img
          src={bgcircle} // Make sure the path points to the correct location of your image
          alt="Background"
          className="w-50 h-50 object-center blur-md opacity-100"
        />
      </div>

      <div className="flex flex-col items-center justify-center mb-32">
        <Heading
          className="md:max-w-md lg:max-w-2xl mb-8 text-white"
          title="AI Video Generation FAQs"
          tag="FAQs"
        />
        <div className="w-full max-w-2xl">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg shadow-md bg-n-9/40 backdrop-blur-lg border border-white/10"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="flex justify-between w-full py-4 px-6 rounded-lg text-left text-lg font-semibold transition-all text-white hover:bg-white/20"
              >
                <span>{faq.question}</span>
                <span className="text-white">
                  {activeIndex === index ? "−" : "→"}
                </span>
              </button>
              {activeIndex === index && (
                <div className="px-6 py-4 pb-4 text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
