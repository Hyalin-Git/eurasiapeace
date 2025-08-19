import React from "react";
import BreadCrumb from "./BreadCrumb";
import Image from "next/image";

export default function Banner({
  BannerProps,
  children,
}: {
  BannerProps: {
    title: string;
    content?: string;
    src: string;
  };
  children?: React.ReactNode;
}) {
  const { title, content, src } = BannerProps;

  return (
    <div
      className={`relative bg-headband-contact [&_*]:z-2 flex items-center w-full h-[320px]`}
    >
      {src && (
        <Image
          src={src}
          alt="Bannière"
          fill
          className="object-cover"
          priority={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-midnight-green to-black/40"></div>

      <div className="container flex flex-col gap-4">
        <BreadCrumb />
        <h1 className="text-white text-4xl sm:text-4xl font-medium max-w-3xl">
          {title}
        </h1>
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
