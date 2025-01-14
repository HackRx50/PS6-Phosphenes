import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check, happy, hishita } from "../assets";
import {
  Gradient, 
} from "./design/Services";
// import Vedansh from "../assets/team/vedansh1.jpg";
// import Ansh from "../assets/team/Ansh.jpeg";
// import happy from "../assets/team/happy"


import Generating from "./Generating-box";

const Services = () => {
  return (
    <Section id="ourteam">
      <div className="container">
        <Heading
          title="Our Hardworking Team."
          text="The People Behind"
        />

        <div className="relative">
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-n-1/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5 xl:w-auto">
              <img
                className="w-full h-full object-cover md:object-right"
                width={800}
                alt="Smartest AI"
                height={730}
                src={service1}
              />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Smartest AI</h4>
              <p className="body-2 mb-[3rem] text-n-3">
                Brainwave unlocks the potential of AI-powered applications
              </p>
              <ul className="body-2">
                {brainwaveServices.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <img width={24} height={24} src={check} />
                    <p className="ml-4">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          <div className="relative z-1 grid gap-5 md:grid-cols-2 lg:grid-cols-4 ">
           <div className="relative border border-n-1/10 rounded-3xl overflow-hidden  bg-conic-gradient  h-[30rem] lg:h-[25rem] md:h-[40rem] sm:h-[30rem]">
              <div className="absolute inset-0 ">
                <img
                  src={happy}
                  className="h-full w-full object-cover  "
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end items-center p-2 bg-gradient-to-b from-n-8/0 to-n-8/90 ">
                <h4 className="h5 mb-1">Happy Yadav</h4>
                <p className="body-2 mb-[1rem] text-n-3">
                 Lead Backend Developer
                </p>
              </div>

           
            </div> 

          <div className="relative border border-n-1/10 rounded-3xl overflow-hidden bg-conic-gradient h-[30rem] lg:h-[25rem] md:h-[40rem] sm:h-[30rem]">
              <div className="absolute inset-0">
                <img
                  src={Vedansh}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end items-center p-2 bg-gradient-to-b from-n-8/0 to-n-8/90 ">
                <h4 className="h5 mb-1">Vedansh Sharma</h4>
                <p className="body-2 mb-[1rem] text-n-3">
                 Lead Python Developer
                </p>
              </div>

           
            </div> 


          <div className="relative border border-n-1/10 rounded-3xl overflow-hidden bg-conic-gradient h-[30rem] lg:h-[25rem] md:h-[40rem] sm:h-[30rem]">
              <div className="absolute inset-0">
                <img
                  src={hishita}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end items-center p-2 bg-gradient-to-b from-n-8/0 to-n-8/90 ">
                <h4 className="h5 mb-1">Hishita Gupta</h4>
                <p className="body-2 mb-[1rem] text-n-3">
                  Lead Frontend Developer
                </p>
              </div>

           
            </div>

           <div className="relative border border-n-1/10 rounded-3xl overflow-hidden bg-conic-gradient h-[30rem] lg:h-[25rem] md:h-[40rem] sm:h-[30rem]">
              <div className="absolute inset-0">
                <img
                  src={Ansh}
                  className="h-full w-full object-cover"
                  width={630}
                  height={750}
                  alt="robot"
                />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end items-center p-2 bg-gradient-to-b from-n-8/0 to-n-8/90 ">
                <h4 className="h5 mb-1">Ansh Chahal</h4>
                <p className="body-2 mb-[1rem] text-n-3">
                  UI/UX Designer
                </p>
              </div>

           
            </div> 


          </div>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;
