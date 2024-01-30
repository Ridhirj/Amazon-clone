import React from "react";

const FooterMiddleList = ({ title, ListItems }) => {
  return (
    <div>
      <div>
        <h3 className="font-semibold text-base font-titleFont text-white mb-3">
          {title}
        </h3>
        <ul className="flex flex-col gap-2 font-bodyFont">
          {ListItems.map((item) =>
            item.ListData.map((data, i) => (
              <li key={i} className="footerHover">
                {data}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FooterMiddleList;
