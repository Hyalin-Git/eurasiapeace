"use server";

import Mailjet from "node-mailjet";

interface MailjetContactResponse {
  Data: Array<{
    Email: string;
    IsExcludedFromCampaigns: boolean;
    [key: string]: unknown;
  }>;
}

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY as string,
  process.env.MAILJET_API_SECRET as string
);

export async function subscribeToNewsletter(email: string) {
  try {
    // Vérifier si le contact existe déjà
    try {
      const existingContact = await mailjet
        .get("contact", { version: "v3" })
        .id(email)
        .request();

      if (existingContact?.response?.status === 200) {
        // Vérifier si le contact est déjà abonné
        const contactData = (
          existingContact.body as unknown as MailjetContactResponse
        )?.Data?.[0];
        const isExcluded = contactData?.IsExcludedFromCampaigns;

        if (isExcluded === false) {
          // Contact déjà abonné
          return {
            success: false,
            status: 400,
            message: "Cette adresse email est déjà abonnée à la newsletter",
          };
        }

        // Contact existe mais est désabonné, le réactiver
        const updateRequest = await mailjet
          .put("contact", { version: "v3" })
          .id(email)
          .request({
            IsExcludedFromCampaigns: false,
          });

        if (updateRequest?.response?.status === 200) {
          return {
            success: true,
            status: 200,
            message: "Inscription à la newsletter réussie",
          };
        } else {
          return {
            success: false,
            status: updateRequest?.response?.status || 500,
            message: "Erreur lors de la mise à jour du contact",
          };
        }
      }
    } catch (contactError: unknown) {
      // Si le contact n'existe pas (404), on continue pour le créer
      const typedError = contactError as { response?: { status?: number } };
      if (typedError?.response?.status !== 404) {
        console.error(
          "Erreur lors de la vérification du contact:",
          contactError
        );
        return {
          success: false,
          status: typedError?.response?.status || 500,
          message: "Erreur lors de la vérification du contact",
        };
      }
    }

    // Créer un nouveau contact
    const request = await mailjet.post("contact", { version: "v3" }).request({
      Email: email,
      IsExcludedFromCampaigns: false,
    });

    if (request?.response?.status === 201) {
      return {
        success: true,
        status: 200,
        message: "Inscription à la newsletter réussie",
      };
    } else if (request?.response?.status === 400) {
      // Email potentiellement invalide ou déjà existant
      return {
        success: false,
        status: 400,
        message: "Email déjà existant ou invalide",
      };
    } else {
      return {
        success: false,
        status: request?.response?.status || 500,
        message: "Erreur lors de l'inscription à la newsletter",
      };
    }
  } catch (error: unknown) {
    console.error("Erreur générale lors de l'inscription:", error);
    return {
      success: false,
      status: 500,
      message: "Erreur serveur lors de l'inscription",
      error,
    };
  }
}

export async function unsubscribeFromNewsletter(email: string) {
  try {
    // Vérifier d'abord si le contact existe et son statut
    try {
      const existingContact = await mailjet
        .get("contact", { version: "v3" })
        .id(email)
        .request();

      if (existingContact?.response?.status === 200) {
        // Vérifier si le contact est déjà désabonné
        const contactData = (
          existingContact.body as unknown as MailjetContactResponse
        )?.Data?.[0];
        const isExcluded = contactData?.IsExcludedFromCampaigns;

        if (isExcluded === true) {
          // Contact déjà désabonné
          return {
            success: false,
            status: 400,
            message: "Cette adresse email est déjà désabonnée de la newsletter",
          };
        }
      }
    } catch (contactError: unknown) {
      // Si le contact n'existe pas (404), on retourne une erreur appropriée
      const typedError = contactError as { response?: { status?: number } };
      if (typedError?.response?.status === 404) {
        return {
          success: false,
          status: 404,
          message: "Cette adresse email n'est pas abonnée à la newsletter",
        };
      }

      // Pour d'autres erreurs, on continue avec le désabonnement
      console.error("Erreur lors de la vérification du contact:", contactError);
    }

    // Procéder au désabonnement
    const updateRequest = await mailjet
      .put("contact", { version: "v3" })
      .id(email)
      .request({
        IsExcludedFromCampaigns: true,
      });

    if (updateRequest?.response?.status !== 200) {
      return {
        success: false,
        status: updateRequest?.response?.status || 500,
        message: "Erreur lors du désabonnement de la newsletter",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Désabonnement à la newsletter réussi",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Erreur serveur lors du désabonnement",
      error,
    };
  }
}
