import { motion } from "framer-motion";
import { collabApps } from "../constants"; // Ensure constants are correctly imported
import Aura from "../assets/logo/logo-aura.png";
import Section from "./Section";
import Heading from "./Heading";

const Collaboration = () => {
  const numberOfApps = collabApps.length;
  const angleIncrement = 360 / numberOfApps;

  return (
    <Section crosses className="py-0" id="techstack">
      <div className="container">
      
        <div className="md:mt-4 mb-6">
        <Heading tag="Tech Foundation" title="The Technology Behind the Magic" />
          <div className="relative left-1/2 flex w-[29rem] aspect-square border border-n-6 rounded-full -translate-x-1/2 scale-75 md:scale-100">
        
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto p-[0.2rem] bg-conic-gradient rounded-full">
            
                <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                  <img src={Aura} width={58} height={58} alt="Aura" />
                </div>
              </div>
            </div>

            {/* Circular animation with upright icons */}
            <motion.ul
              className="absolute inset-0"
              animate={{ rotate: 360 }} // Rotate the entire UL around the center
              transition={{
                repeat: Infinity, // Infinite loop
                duration: 60, // Full rotation time in seconds
                ease: "linear", // Smooth continuous motion
              }}
            >
              {/* {collabApps.map((app, index) => {
                const angleDeg = index * angleIncrement; // Calculate the angle for positioning
                const rotate = -angleDeg; // Rotate each item to keep it upright
                return (
                  <motion.li
                    key={app.id}
                    className="absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom"
                    style={{ rotate: `${rotate}deg` }} // Apply counter-rotation to keep icons upright
                  >
                    <div className="relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl">
                      <img
                        className="m-auto"
                        width={app.width}
                        height={app.height}
                        alt={app.title}
                        src={app.icon}
                      />
                    </div>
                  </motion.li>
                );
              })} */}
            </motion.ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;
