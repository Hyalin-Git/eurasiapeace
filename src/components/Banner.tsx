import React from "react";
import BreadCrumb from "./BreadCrumb";

export default function Banner({
  BannerProps,
  children,
}: {
  BannerProps: { title: string; content?: string; image: string };
  children?: React.ReactNode;
}) {
  const { title, content, image } = BannerProps;

  return (
    <div
      className={`relative p-12 bg-headband-contact ${image} bg-position-center bg-cover bg-no-repeat [&_*]:z-2 flex items-center w-full h-[300px]`}
    >
      <div className="container flex flex-col gap-4">
        <BreadCrumb />
        <h1 className="text-white text-4xl sm:text-4xl font-medium">{title}</h1>
        {content && (
          <p className="text-white/80 text-lg max-w-[800px] hidden sm:block ">
            {content}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
