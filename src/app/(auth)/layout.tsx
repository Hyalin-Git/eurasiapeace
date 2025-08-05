"use server";

import GoogleReCaptchaProvider from "@/context/GoogleReCaptchaProvider";

// Ensure that the GoogleReCaptchaProvider is used in the auth layout
export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GoogleReCaptchaProvider>{children}</GoogleReCaptchaProvider>;
}
