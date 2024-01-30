import React from "react";
import { footerBottomItem } from "../../constants/Index";
function FooterBottem() {
  return (
    <div className="w-full bg-footerBottom py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="w-full grid grid-cols-3 md:grid-cols-5 mdl:grid-cols-6 lgl:grid-cols-5 gap-4 place-content-center text-gray-400">
          {footerBottomItem.map((item) => (
            <div key={item.id}>
              <h3 className="font-semibold w-24 group-hover:underline text-[#DDD] leading-3 mb-[2px]">
                {item.title}
              </h3>
              <p>{item.des}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FooterBottem;
