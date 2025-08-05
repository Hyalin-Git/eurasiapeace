"use server";
import GoogleReCaptchaProvider from "@/context/GoogleReCaptchaProvider";

export default async function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GoogleReCaptchaProvider>{children}</GoogleReCaptchaProvider>;
}
