import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { notification1 } from "../assets";
import { notificationImages } from "../constants";
import { Link } from "react-router-dom";

const Notification2 = ({ className, title }) => {
    return (
        <div
            className={`${className || ""
                } flex items-center p-2 pt-4 pb-4  bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl gap-5`}
        >

            <div className="flex-1 text-center">
                <h5 className=" font-semibold text-xl">{title}</h5>
                <div className="body-3 text-n-4">Backend Dev And Data Specialist</div>


                <div className="flex items-center justify-center pt-1">
                    <ul className="flex -m-0.5">


                        <Link to={teamdata.linkedin}><li

                            className="flex w-6 h-6   overflow-hidden justify-center items-center"
                        >
                            {/* <img
                  src=""
                  className="w-full"
                  width={20}
                  height={20}
                 
                /> */}
                            <FaLinkedinIn />

                        </li></Link>
                        <Link to={teamdata.github}><li

                            className="flex w-6 h-6   overflow-hidden justify-center items-center"
                        >
                            {/* <img
              src=""
              className="w-full"
              width={20}
              height={20}
             
            /> */}
                            <FaGithub />


                        </li></Link>
                        <Link to={teamdata.instagram}><li

                            className="flex w-6 h-6   overflow-hidden justify-center items-center"
                        >
                            {/* <img
              src=""
              className="w-full"
              width={20}
              height={20}
             
            /> */}
                            <FaInstagram />

                        </li></Link>

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Notification2;
