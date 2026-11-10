import React from "react";

const Header = (props: { heading: string; subHeading: string }) => {
  const { heading: heading, subHeading: subHeading } = props;
  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex flex-col item-start justify-start space-y-[8px]">
        <h1 className="w-full text-[24px] md:text-xl font-semibold">
          {heading}
        </h1>
        <h2 className="w-full font-[500] text-[16px] md:text-sm text-[#363636]">
          {subHeading}
        </h2>
      </div>
    </div>
  );
};

export default Header;
