import React from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { motion } from "framer-motion";
import { logoDark } from "../assets/index";
import { Link, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";

const Registration = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errCpassword, setErrCpassword] = useState("");
  const [firebaseErr, setFirebaseErr] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };

  const handleCPassword = (e) => {
    setCpassword(e.target.value);
    setErrCpassword("");
  };

  const emailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("enter your name");
    }
    if (!email) {
      setErrEmail("enter your email ");
      setFirebaseErr("");
    }
    if (!emailValidation(email)) {
      setErrEmail("enter correct email ");
    }
    if (!password) {
      setErrPassword("enter your password");
    } else {
      if (password.length < 6) {
        setErrPassword("passwordmust be 6 letter long");
      }
    }
    if (!cpassword) {
      setCpassword("re enter the password");
    } else {
      if (cpassword !== password) {
        setErrCpassword("password not match");
      }
    }

    if (
      clientName &&
      email &&
      emailValidation(email) &&
      password &&
      password.length >= 6 &&
      cpassword &&
      cpassword === password
    ) {
      //   console.log(clientName, email, password, cpassword);
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: clientName,
            //   photoURL: C: \Users\TOSHIBA\Desktop\Amazon\Amazon_clone\src\assets\darkLogo.png
          });
          // Signed up
          const user = userCredential.user;
          console.log(user);
          setLoading(false);
          setSuccessMsg("Account created Successfully!");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;

          console.log(" this is error", errorCode);
          console.log(
            errorCode && errorCode.includes("auth/email-already-in-use")
          );
          if (errorCode && errorCode.includes("auth/email-already-in-use")) {
            setFirebaseErr("email alreadly loggedin! try another one.");
          }
        });

      setClientName("");
      setEmail("");
      setPassword("");
      setCpassword("");
      setFirebaseErr("");
    }
  };
  return (
    <div className="w-full py-4">
      <div className="w-full bg-gray-100 pb-10 ">
        <form className="w-[370px] mx-auto flex flex-col items-center">
          <img className="w-32" src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your Name</p>
                <input
                  onChange={handleName}
                  value={clientName}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                />
                {errClientName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {" "}
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errClientName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email and phone number</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />

                {errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {" "}
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errEmail}
                  </p>
                )}
                {firebaseErr && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {" "}
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {firebaseErr}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {" "}
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">re-enter password</p>
                <input
                  onChange={handleCPassword}
                  value={cpassword}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errCpassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    {" "}
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>
                    {errCpassword}
                  </p>
                )}
                <p className="text-xs text-zinc-600">
                  password must be at least 6 character long
                </p>
              </div>
              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                continue
              </button>
              {loading && (
                <div className="flex justify-center">
                  <RotatingLines
                    visible={true}
                    width="50"
                    strokecolor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    //   ariaLabel="rotating-lines-loading"
                    //   wrapperStyle={{}}
                    //   wrapperClass=""
                  />
                </div>
              )}
              {successMsg && (
                <div>
                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-green-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5"
                  >
                    {successMsg}
                  </motion.p>
                </div>
              )}
            </div>
            <p className="text-sm text-black leadng-4 mt-4">
              By creating an account, you agree with amazon's{" "}
              <span className="text-blue-600">Condition of use</span> and{" "}
              <span className="text-blue-600">Privacy Notice.</span>
            </p>
            <div>
              <p className="text-xs text-black  mt-2">
                Already have an account?{" "}
                <Link to="/signin">
                  <span className="text-blue-600">sign in</span>{" "}
                  <span>
                    <ArrowRightIcon />
                  </span>
                </Link>
              </p>
              <p className="text-xs text-black leadng-4 mt-1">
                Buying for work?{" "}
                <span className="text-blue-600">
                  Create a free business account
                </span>{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-300 flex flex-col gap-4 justify-center items-center py-4">
        <div className="flex items-center gap-6 justify-center">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Conditions of Use{" "}
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;
