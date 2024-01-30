import React, { useState, useRef, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ArrowDropDownSharpIcon from "@mui/icons-material/ArrowDropDownSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import LogoutIcon from "@mui/icons-material/Logout";
import { allItems } from "../../constants/Index";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logo } from "../../assets/index";
import HeaderButtom from "./HeaderButtom";
import { userSignOut } from "../../Redux-Store/amazonSlice";

function Header() {
  const auth = getAuth();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const ref = useRef();
  const [showALL, setShowALL] = useState(false);
  // console.log(userInfo);

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        showALL && setShowALL(false);
      }
    });
  }, [ref, showALL]);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successfully");
        dispatch(userSignOut());
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full sticky top-0 z-50">
      <div className="w-full bg-amazon_blue text-white px-4 py-3  flex items-center gap-4">
        <Link to="/">
          <div className="headerHover">
            <img className="w-24 mt-2" src={logo} alt="logo" />
          </div>
        </Link>

        <div className="headerHover hidden mdl:inline-flex">
          <LocationOnIcon />
          <p className="text-sm text-lightText font-light">
            Deliver to{" "}
            {userInfo ? (
              <span className="text-sm font-semibold -mt-1 text-whiteText">
                {" "}
                {userInfo.userName}
              </span>
            ) : (
              <span className="text-sm font-semibold -mt-1 text-whiteText">
                xyz
              </span>
            )}
          </p>
        </div>

        <div className="h-10 rounded-md hidden lgl:flex flex-grow relative ">
          <span
            onClick={() => setShowALL(!showALL)}
            className="w-14 h-full bg-gray-200 hover:bg-gray-300 border-2 cursor-point duration-300 text-sm text-amazon_blue font-titleFont flex items-center justify-center rounded-tl-md rounded-bl-md"
          >
            All<span></span>
            <ArrowDropDownSharpIcon />
          </span>
          {showALL && (
            <div>
              <ul
                ref={ref}
                className="absolute w-56 h-80 top-10 left-0 overflow-y-scroll
              overflow-x-hidden bg-white border-[1px] border-amazon_blue text-black p-2 flex-col gap-1 z-50 "
              >
                {allItems.map((item) => (
                  <li
                    className=" text-sm tracking-wide font-titleFont border-b-[1px] border-b-transparents hover:border-b-amazon_blue cusor-pointer duration-200"
                    key={item.id}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <input
            className="h-full text-base text-amazon_blue flex-grow outline-none border-none px-2"
            type="text"
          />
          <span className="w-12 h-full flex items-center justify-center bg-amazon_yellow hover:bg-[#f3a847] duration-300 text-amazon_blue cursor-pointer rounded-tr-md rounded-br-md">
            <SearchSharpIcon />
          </span>
        </div>

        <Link to="/signin">
          <div className="flex flex-col items-start justify-center headerHover ">
            {userInfo ? (
              <p className="text-sm text-gray-100 font-medium">
                {userInfo.userName}
              </p>
            ) : (
              <p className=" text-sm mdl:text-xs  text-white  mdl:text-lightText font-light">
                Hello,sign in
              </p>
            )}

            <p className="text-small font-semibold -mt-1 text-whiteText hidden mdl:inline-flex">
              Accounts &Lists
              <span>
                <ArrowDropDownSharpIcon />
              </span>
            </p>
          </div>
        </Link>
        <div className=" hidden lgl:flex flex-col items-start justify-center headerHover">
          <p className="text-xs text-lightText font-light">Returns</p>
          <p className="text-small font-semibold -mt-1 text-whiteText">
            &Orders
          </p>
        </div>
        <Link to="/cart">
          <div className="flex items-start justify-center headerHover relatve">
            <ShoppingCartSharpIcon />
            <p className="text-xs font-semibold mt-4 text-whiteText">
              <span className="absolute text-xs top-7 font-semibold p-1 h-4 bg-[#f3a847] text-amazon_blue rounded-full flex justify-center items-center ">
                {products.length > 0 ? products.length : 0}
              </span>
              cart
            </p>
          </div>
        </Link>
        <div onClick={handleLogOut}>
          <LogoutIcon />
          <p>
            <span className="text-sm font-titleFont font-bold text-whiteText ">
              log out
            </span>
          </p>
        </div>
      </div>
      <HeaderButtom />
    </div>
  );
}

export default Header;
