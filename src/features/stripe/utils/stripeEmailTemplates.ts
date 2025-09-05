import { formatCurrency } from "@/utils/currencyFormat";

export function stripePDFPurchaseTemplate(
  email: string,
  pdfName: string,
  amount: number,
  purchaseDate: string
) {
  const pdf = pdfName?.replaceAll("_", " ");
  const formattedPdfName = pdf.charAt(0).toUpperCase() + pdf.slice(1);

  return {
    subject: "✅ Votre achat PDF Eurasia Peace",
    text: `
        <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
          <div style="padding: 25px; background: #f9f9f9;">
            <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
              <h2 style="color: #28a745; margin-top: 0; font-size: 20px;">Merci pour votre achat !</h2>
              <p style="font-size: 15px;">Nous vous confirmons la réception de votre paiement pour le PDF suivant :</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">
                <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">Détails de l'achat</h3>
                <p style="font-size: 15px;"><strong>PDF :</strong> ${formattedPdfName}</p>
                <p style="font-size: 15px;"><strong>Montant payé :</strong> ${formatCurrency(
                  "currency",
                  "EUR",
                  amount
                )}</p>
                <p style="font-size: 15px;"><strong>Date d'achat :</strong> ${purchaseDate}</p>
                <p style="font-size: 15px;"><strong>Adresse e-mail :</strong> ${email}</p>
              </div>
              
              <div style="background: #e9f7ef; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745;">
                <p style="margin: 0; font-size: 15px;"><strong>📎 Votre PDF se trouve en pièce jointe à cet email.</strong></p>
              </div>
            </div>
            
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p>Merci pour votre confiance.</p>
              <p><strong>L'équipe Eurasia Peace</strong></p>
            </div>
          </div>
        </div>
      `,
  };
}

export function stripeInvoicePaid(
  email: string,
  subscriptionName: string,
  amount: number,
  invoiceNumber: string,
  paymentDate: string
) {
  const subscription = subscriptionName?.replaceAll("_", " ");
  const formattedSubscription =
    subscription.charAt(0).toUpperCase() + subscription.slice(1);

  return {
    subject: "✅ Facture payée - Eurasia Peace",
    text: `
        <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
          <div style="padding: 25px; background: #f9f9f9;">
            <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
              <h2 style="color: #28a745; margin-top: 0; font-size: 20px;">Paiement réussi !</h2>
              <p style="font-size: 15px;">Nous vous confirmons la réception de votre paiement pour votre abonnement.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">
                <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">Détails de la facture</h3>
                <p style="font-size: 15px;"><strong>Abonnement :</strong> ${formattedSubscription}</p>
                <p style="font-size: 15px;"><strong>Numéro de facture :</strong> ${invoiceNumber}</p>
                <p style="font-size: 15px;"><strong>Montant payé :</strong> ${formatCurrency(
                  "currency",
                  "EUR",
                  amount
                )}</p>
                <p style="font-size: 15px;"><strong>Date de paiement :</strong> ${paymentDate}</p>
                <p style="font-size: 15px;"><strong>Adresse e-mail :</strong> ${email}</p>
              </div>
              
              <div style="background: #e9f7ef; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745;">
                <p style="margin: 0; font-size: 15px;"><strong>📄 Votre facture se trouve en pièce jointe à cet email.</strong></p>
              </div>
            </div>
            
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p>Merci pour votre confiance.</p>
              <p><strong>L'équipe Eurasia Peace</strong></p>
            </div>
          </div>
        </div>
      `,
  };
}

export function stripeInvoiceFailed(
  email: string,
  subscriptionName: string,
  amount: number,
  invoiceNumber: string,
  paymentDate: string
) {
  const subscription = subscriptionName?.replaceAll("_", " ");
  const formattedSubscription =
    subscription.charAt(0).toUpperCase() + subscription.slice(1);

  return {
    subject: "❌ Échec du paiement - Eurasia Peace",
    text: `
        <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
          <div style="padding: 25px; background: #f9f9f9;">
            <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
              <h2 style="color: #dc3545; margin-top: 0; font-size: 20px;">Problème de paiement</h2>
              <p style="font-size: 15px;">Nous vous informons que le paiement de votre facture n'a pas pu être effectué.</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">
                <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">Détails de la facture</h3>
                <p style="font-size: 15px;"><strong>Abonnement :</strong> ${formattedSubscription}</p>
                <p style="font-size: 15px;"><strong>Numéro de facture :</strong> ${invoiceNumber}</p>
                <p style="font-size: 15px;"><strong>Montant :</strong> ${formatCurrency(
                  "currency",
                  "EUR",
                  amount
                )}</p>
                <p style="font-size: 15px;"><strong>Date de tentative :</strong> ${paymentDate}</p>
                <p style="font-size: 15px;"><strong>Adresse e-mail :</strong> ${email}</p>
              </div>
              
              <div style="background: #f8d7da; padding: 15px; border-radius: 4px; border-left: 4px solid #dc3545; margin: 20px 0;">
                <p style="margin: 0; font-size: 15px;"><strong>📄 Votre facture se trouve en pièce jointe à cet email.</strong></p>
              </div>
              
              <div style="background: #fff3cd; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107;">
                <p style="margin: 0; font-size: 15px;"><strong>💡 Action requise :</strong> Merci de vérifier vos informations de paiement ou de réessayer. Si le problème persiste, contactez notre support.</p>
              </div>
            </div>
            
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p>Merci pour votre confiance.</p>
              <p><strong>L'équipe Eurasia Peace</strong></p>
            </div>
          </div>
        </div>
      `,
  };
}
