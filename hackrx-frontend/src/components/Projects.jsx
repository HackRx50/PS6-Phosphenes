import { singleBenefit } from "../constants"; // Adjust the import according to where you place the object
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Features";
import ClipPath from "../assets/svg/ClipPath";
import { Link } from "react-router-dom";
import { FaEdit as EditIcon, FaTrash as TrashIcon } from 'react-icons/fa';

const Projects = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Your Projects"
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {singleBenefit.map((benefit) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${benefit.backgroundUrl})`,
              }}
              key={benefit.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="h5 mb-5">{benefit.title}</h5>
                
                {/* Image Below Title */}
                <img
                  src={benefit.imageUrl}
                  alt={benefit.title}
                  className="mb-4 w-full h-auto object-cover rounded-xl"
                />
              </div>

              {benefit.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {benefit.imageUrl && (
                    <img
                      src={benefit.imageUrl}
                      width={380}
                      height={362}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Edit and Trash Icons */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <Link to="/edit">
                  <EditIcon className="w-6 h-6 text-n-9/40 hover:text-n-9" /> {/* Adjust color and size as needed */}
                </Link>
                <Link to="/trash">
                  <TrashIcon className="w-6 h-6 text-n-9/40 hover:text-n-9" /> {/* Adjust color and size as needed */}
                </Link>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;
