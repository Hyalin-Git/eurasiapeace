import Image from "next/image";

export default function CardBanner({
  imageUrl,
  imageAlt,
  bannerSize,
}: {
  imageUrl: string;
  imageAlt: string;
  bannerSize: string;
}) {
  function responsiveBannerSize() {
    if (bannerSize === "h-[380px]") {
      return "h-50 md:h-[380px]";
    }
    return "h-50";
  }

  return (
    <div
      className={`relative bg-background-third rounded-t-md ${responsiveBannerSize()} w-full`}
    >
      {imageUrl && (
        <Image
          src={imageUrl || ""}
          alt={imageAlt || "Bannière"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
          className="object-cover rounded-t-md"
        />
      )}
    </div>
  );
}
