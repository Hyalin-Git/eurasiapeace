export function updateEmailTemplate(
  firstName: string,
  email: string,
  oldEmail: string,
  validationLink: string
) {
  return {
    subject: "Validation de votre nouvelle adresse e-mail",
    text: `
      <div>
        <div>
          <h1>Confirmez votre nouvelle adresse e-mail</h1>
          <p>Bonjour ${firstName},</p>
          <p>
            Vous avez demandé à modifier l'adresse e-mail associée à votre compte Eurasia Peace.
          </p>
          <ul>
            <li><span>Ancienne adresse :</span> ${oldEmail}</li>
            <li><span>Nouvelle adresse :</span> ${email}</li>
            <li><span>Date de demande :</span> ${new Date().toLocaleString()}</li>
          </ul>
          <p>
            Pour valider ce changement, veuillez cliquer sur le bouton ci-dessous :
          </p>
          <a href="${validationLink}">Valider ma nouvelle adresse e-mail</a>
          <p>
            Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet e-mail ou contacter notre support.
          </p>
        </div>
        <p>
          Vous recevez cet e-mail suite à une demande de modification d'adresse sur eurasiapeace.org.
        </p>
      </div>
    `,
  };
}

export function updateWarningEmailTemplate(
  firstName: string,
  email: string,
  oldEmail: string
) {
  return {
    subject: "Mise à jour de votre adresse e-mail",
    text: `
      <div>
        <p>Bonjour, ${firstName}</p>
        <p>Nous vous informons que l'adresse email associée à votre compte a été modifiée récemment.</p>
        <ul>
            <li>Ancienne adresse : ${oldEmail}</li>
            <li>Nouvelle adresse : ${email}</li>
            <li>Date de modification : ${new Date().toLocaleString()}</li>
        </ul>
        <p>Si vous êtes à l'origine de ce changement, aucune action n'est nécessaire.</p>
        <p>Si vous n'êtes pas à l'origine de cette modification, veuillez contacter immédiatement notre service d'assistance ou réinitialiser votre mot de passe afin de sécuriser votre compte.</p>

        <p>Merci de votre confiance,</p>
        <p>L'équipe EurasiaPeace</p>
      </div>
    `,
  };
}

export function passwordChangeSuccessTemplate(email: string) {
  return {
    subject: "✅ Mot de passe modifié avec succès - Eurasia Peace",
    text: `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
        <div style="padding: 25px; background: #f9f9f9;">
          <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
            <h2 style="color: #28a745; margin-top: 0; font-size: 20px;">Mot de passe modifié avec succès</h2>
            <p style="font-size: 15px;">Bonjour,</p>
            <p style="font-size: 15px;">Nous vous confirmons que votre mot de passe a été modifié avec succès sur votre compte Eurasia Peace.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 4px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0; font-size: 18px;">Détails de la modification</h3>
              <p style="font-size: 15px;"><strong>Adresse e-mail :</strong> ${email}</p>
              <p style="font-size: 15px;"><strong>Date de changement :</strong> ${new Date().toLocaleDateString(
                "fr-FR"
              )} à ${new Date().toLocaleTimeString("fr-FR")}</p>
            </div>
            
            <div style="background: #e9f7ef; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>✅ Confirmation :</strong> Votre compte est maintenant sécurisé avec votre nouveau mot de passe.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_CLIENT_URL}/mon-compte" 
                 style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">
                👤 Accéder à mon compte
              </a>
            </div>
            
            <div style="background: #f8d7da; padding: 15px; border-radius: 4px; border-left: 4px solid #dc3545; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>🛡️ Sécurité :</strong> Si vous n'avez pas effectué cette modification, contactez immédiatement notre support pour sécuriser votre compte.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>Merci de votre confiance.</p>
            <p><strong>L'équipe Eurasia Peace</strong></p>
          </div>
        </div>
      </div>
    `,
  };
}
