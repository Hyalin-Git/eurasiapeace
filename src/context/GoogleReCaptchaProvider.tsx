"use client";
import { GoogleReCaptchaProvider as Provider } from "react-google-recaptcha-v3";

export default function GoogleReCaptchaProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY ?? "NOT DEFINED";

  return <Provider reCaptchaKey={reCaptchaKey}>{children}</Provider>;
}
