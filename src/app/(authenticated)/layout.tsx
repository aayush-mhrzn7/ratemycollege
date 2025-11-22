import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <article className="max-w-[1700px] mx-auto p-2 md:pg-6 lg:p-10">
      {children}
    </article>
  );
};

export default layout;
