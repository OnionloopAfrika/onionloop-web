import React from "react";

const Header = (props: { heading: string; subHeading: string }) => {
  const { heading: heading, subHeading: subHeading } = props;
  return (
    <div className=" space-y-[8px]">
      <h1 className=" text-base md:text-[24px] font-[600]">{heading}</h1>
      <h2 className=" text-sm md:text-[16px] text-[#363636] font-[500]">
        {subHeading}
      </h2>
    </div>
  );
};

export default Header;
