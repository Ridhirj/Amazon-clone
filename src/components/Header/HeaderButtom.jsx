import React, { useState, useRef, useEffect } from "react";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { motion } from "framer-motion";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import SideNavContent from "./SideNavContent";
import { useSelector } from "react-redux";
const HeaderButtom = () => {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  console.log(userInfo);
  const ref = useRef();
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setSidebar(false);
      }
    });
  }, [ref, setSidebar]);
  return (
    <div className="w-full px-4 h-[36px] bg-amazon_light text-white flex items-center">
      <ul className="flex items-center gap-2 text-sm tracking-wide">
        <li
          onClick={() => setSidebar(true)}
          className="headerHover flex items-center gap-1"
        >
          {" "}
          <MenuSharpIcon />
          All
        </li>
        <li className="headerHover hidden md:inline-flex">Today's Deal</li>
        <li className="headerHover hidden md:inline-flex">Customer Service</li>
        <li className="headerHover hidden md:inline-flex">Gift Cards</li>
        <li className="headerHover hidden md:inline-flex">Registry</li>
        <li className="headerHover hidden md:inline-flex">Sell</li>
      </ul>
      {sidebar && (
        <div className="w-full h-screen text-black fixed top-0 left-0 bg-amazon_blue bg-opacity-50">
          <div className="w-full h-full relative">
            <div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animation={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className=" w-[80%] md:w-[350px] h-full bg-white border border-black"
            >
              <div className="w-full bg-amazon_light text-white py-3 px-6 flex items-center gap-4">
                {userInfo ? (
                  <img src={userInfo.img} alt="userImg" />
                ) : (
                  <AccountCircleSharpIcon />
                )}
                {userInfo ? (
                  <h3 className="text-lg font-bold font-titleFont tracking-wide">
                    {userInfo.userName}
                  </h3>
                ) : (
                  <h3 className="text-lg font-bold font-titleFont tracking-wide">
                    hello,sign in
                  </h3>
                )}
              </div>
              <SideNavContent
                title="Digital Content And Devices"
                one=" Amazon music "
                two=" Echo & Alexa"
                three=" Fire TV"
              />

              <SideNavContent
                title="Shop By Category"
                one="Electronics "
                two="Computers"
                three="Smart Home"
              />
              <SideNavContent
                title="Programs & Features"
                one="Gift Cards "
                two="Amazon live"
                three="International Shopping"
              />
              <SideNavContent
                title="Help and Setting"
                one="YOur Account "
                two="Customer Service"
                three="Sign Out"
              />
              <motion.span
                onClick={() => setSidebar(false)}
                className="cursor-pointer absolute top-0  left-[82%] md:left-[360px] w-10 h-10  text-white flex items-center justify-center  hover:bg-red-400 duration-500"
              >
                <CloseSharpIcon />
              </motion.span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderButtom;
