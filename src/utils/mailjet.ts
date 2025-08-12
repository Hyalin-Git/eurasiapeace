"use server";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_API_SECRET as string
);

export async function subscribeToNewsletter(email: string) {
  const request = await mailjet.post("contact", { version: "v3" }).request({
    Email: email,
    IsExcludedFromCampaigns: false,
  });

  if (request?.response?.status !== 201) {
    return {
      success: false,
      status: request?.response?.status || 500,
      message: "Erreur lors de l'inscription à la newsletter",
    };
  }
}
