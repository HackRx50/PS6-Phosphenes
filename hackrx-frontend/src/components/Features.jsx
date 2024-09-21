// import { benefits } from "../constants";
// import Heading from "./Heading";
// import Section from "./Section";
// import Arrow from "../assets/svg/Arrow";
// import { GradientLight } from "./design/Features";
// import ClipPath from "../assets/svg/ClipPath";
// import { Link } from "react-router-dom";

// const Benefits = () => {
//   return (
//     <Section id="features">
//       <div className="container relative z-2">
//         <Heading
//           className="md:max-w-md lg:max-w-2xl"
//           title="Key Features that Elevate Your Video Creation"
//         />

//         <div className="flex flex-wrap gap-10 mb-10">
//           {benefits.map((item) => (
//             <div
//               className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
//               style={{
//                 backgroundImage: `url(${item.backgroundUrl})`,
//               }}
//               key={item.id}
//             >
//               <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
//                 <h5 className="h5 mb-5">{item.title}</h5>
//                 <p className="body-2 mb-6 text-n-3">{item.text}</p>
//                 <div className="flex items-center mt-auto">
//                   <img
//                     src={item.iconUrl}
//                     width={48}
//                     height={48}
//                     alt={item.title}
//                   />
//                   <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
//                     Explore more
//                   </p>
//                   <Arrow />
//                 </div>
//               </div>

//               {item.light && <GradientLight />}

//               <div
//                 className="absolute inset-0.5 bg-n-8"
//                 style={{ clipPath: "url(#benefits)" }}
//               >
//                 <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
//                   {item.imageUrl && (
//                     <img
//                       src={item.imageUrl}
//                       width={380}
//                       height={362}
//                       alt={item.title}
//                       className="w-full h-full object-cover"
//                     />
//                   )}
//                 </div>
//               </div>

//               <ClipPath />
//             </div>
//           ))}
//         </div>
//       </div>
//     </Section>
//   );
// };

// export default Benefits;
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Features";
import ClipPath from "../assets/svg/ClipPath";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';  // Swiper core styles
import 'swiper/css/pagination';  // Pagination module styles

// Import required Swiper modules
import { Pagination } from 'swiper/modules'; // Only import Pagination

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Key Features that Elevate Your Video Creation"
        />

        {/* Swiper Wrapper */}
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} w-3 h-3 bg-white mx-10 rounded-full transition-all duration-300 transform ease-in-out"></span>`;
            },
            bulletActiveClass: 'swiper-pagination-bullet-active w-4 h-4 bg-blue-500 scale-125',
          }}
          modules={[Pagination]}  // Include only the Pagination module
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {benefits.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
                style={{
                  backgroundImage: `url(${item.backgroundUrl})`,
                }}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                  <h5 className="h5 mb-5">{item.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{item.text}</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={item.iconUrl}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                    <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                      Explore more
                    </p>
                    <Arrow />
                  </div>
                </div>

                {item.light && <GradientLight />}

                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        width={380}
                        height={362}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <ClipPath />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

export default Benefits;
