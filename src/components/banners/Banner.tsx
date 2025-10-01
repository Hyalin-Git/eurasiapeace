import React from "react";
import BreadCrumb from "../BreadCrumb";
import Image from "next/image";

export default function Banner({
  BannerProps,
  children,
}: {
  BannerProps: {
    title: string;
    content?: string;
    src: string;
    qualiopi?: boolean;
  };
  children?: React.ReactNode;
}) {
  const { title, content, src, qualiopi } = BannerProps;

  return (
    <div
      className={`relative bg-headband-contact [&_*]:z-2 flex items-center w-full h-fit py-6 md:h-[320px] md:py-0`}
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
      <div className="container flex justify-between">
        <div className=" flex flex-col gap-4">
          <BreadCrumb title={title} />
          <h1 className="text-white font-medium max-w-3xl text-xl md:text-4xl">
            {title}
          </h1>
          {content && (
            <p className="text-white/80 xl:text-lg max-w-[800px] hidden md:block text-md">
              {content}
            </p>
          )}
          {children}
        </div>

        {qualiopi && (
          <div className="relative w-full max-w-100 h-50 mt-2 hidden xl:block">
            <Image
              src={"/qualiopi-gqc.webp"}
              alt="Logo Qualiopi"
              fill
              quality={100}
              className="object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
}
