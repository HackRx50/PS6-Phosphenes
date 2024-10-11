// import React from "react";
// import Section from "./Section";
// import { socials } from "../constants";

// const Footer = () => {
//   return (
//     <Section crosses className="!px-0 !py-10">
//       <div className="container flex sm:justify-between justify-center items-center gap-10 max-sm:flex-col">
//         <p className="caption text-n-4 lg:block">
//           © {new Date().getFullYear()}. All rights reserved.
//         </p>

//         <ul className="flex gap-5 flex-wrap">
//           {socials.map((item) => (
//             <a
//               key={item.id}
//               href={item.url}
//               target="_blank"
//               className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
//             >
//               <img src={item.iconUrl} width={16} height={16} alt={item.title} />
//             </a>
//           ))}
//         </ul>
//       </div>
//     </Section>
//   );
// };

// export default Footer;


import React from "react";
import Section from "./Section";
import { socials } from "../constants";
import logo from "../assets/logo/logo-aura.png"

const Footer = () => {
  return (
    <Section className="relative pt-11 pb-6 px-5 lg:pt-24 lg:px-10 lg:pb-12">
      <div className="flex items-center justify-center h-24 mb-6 border-b border-n-6 lg:justify-start">
        <a className="flex w-[11.875rem]" href="/">
          <img
            fetchpriority="high"
            width={35}
            height={35}
            decoding="async"
            src={logo}
          />
          <span><p className="ml-3 mt-3 text-2xl bg-gradient-text text-transparent bg-clip-text font-bold">
            AURA.ai
          </p></span>
        </a>

        {/* Navigation for desktop */}
        <nav className="hidden lg:flex items-center justify-center ml-auto">
          <a
            className="px-12 py-8 font-code text-xs font-semibold leading-5 uppercase text-n-1/50 transition-colors hover:text-n-1"
            href="/features"
          >
            Features
          </a>
          <a
            className="px-12 py-8 font-code text-xs font-semibold leading-5 uppercase text-n-1/50 transition-colors hover:text-n-1"
            href="/pricing"
          >
            Pricing
          </a>
          <a
            className="px-12 py-8 font-code text-xs font-semibold leading-5 uppercase text-n-1/50 transition-colors hover:text-n-1"
            href="/how-to-use"
          >
            How to Use
          </a>
          <a
            className="px-12 py-8 font-code text-xs font-semibold leading-5 uppercase text-n-1/50 transition-colors hover:text-n-1"
            href="/roadmap"
          >
            Roadmap
          </a>
          <a
            className="px-12 py-8 font-code text-xs font-semibold leading-5 uppercase text-n-1/50 transition-colors hover:text-n-1"
            href="/login?new=true"
          >
            New Account
          </a>
        </nav>
      </div>

      <div className="lg:flex lg:items-center lg:justify-between">
        {/* Copyright and Privacy Policy */}
        <div className="hidden lg:block caption text-n-4">
          ©&nbsp;{new Date().getFullYear()} AURA.ai&nbsp; All rights reserved.&nbsp;{" "}
          <a
            href="/privacy-policy"
            className="hover:text-n-1 transition-colors"
          >
            Privacy Policy
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center -mx-4">
          {socials.map((social) => (
            <a
              key={social.id}
              className="flex items-center justify-center w-10 h-10 mx-4 bg-n-7 rounded-full transition-colors hover:bg-n-6"
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt={social.title}
                width={16}
                height={16}
                src={social.iconUrl}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Decorative border lines */}
      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:left-7.5 xl:left-10"></div>
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-stroke-1 pointer-events-none md:block lg:right-7.5 xl:right-10"></div>
      <div className="hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-stroke-1 pointer-events-none lg:block xl:left-10"></div>

      {/* Decorative SVGs */}
      <svg
        className="hidden absolute -top-[0.3125rem] left-[1.5625rem] pointer-events-none lg:block xl:left-[2.1875rem]"
        xmlns="http://www.w3.org/2000/svg"
        width={11}
        height={11}
        fill="none"
      >
        <path
          d="M7 1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8a1 1 0 0 1-1-1V1z"
          fill="#ada8c4"
        />
      </svg>

      <svg
        className="hidden absolute -top-[0.3125rem] right-[1.5625rem] pointer-events-none lg:block xl:right-[2.1875rem]"
        xmlns="http://www.w3.org/2000/svg"
        width={11}
        height={11}
        fill="none"
      >
        <path
          d="M7 1a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8a1 1 0 0 1-1-1V1z"
          fill="#ada8c4"
        />
      </svg>
    </Section>
  );
};

export default Footer;

