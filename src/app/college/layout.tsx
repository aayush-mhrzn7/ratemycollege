import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#f6f7f8] ">
      <article className="pt-36 max-w-[1600px] mx-auto">{children}</article>
    </div>
  );
};

export default layout;
