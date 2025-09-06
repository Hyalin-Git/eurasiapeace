export function passwordResetCodeTemplate(code: string) {
  return {
    subject: "🔐 Réinitialisation de votre mot de passe - Eurasia Peace",
    text: `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
        <div style="padding: 25px; background: #f9f9f9;">
          <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
            <h2 style="color: #dc3545; margin-top: 0; font-size: 20px;">Réinitialisation de votre mot de passe</h2>
            <p style="font-size: 15px;">Bonjour,</p>
            <p style="font-size: 15px;">Vous avez demandé la réinitialisation de votre mot de passe sur Eurasia Peace.</p>
            <p style="font-size: 15px;">Voici votre code de vérification :</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background-color: #f8f9fa; border: 2px solid #dc3545; padding: 20px; border-radius: 8px; display: inline-block;">
                <span style="font-size: 24px; font-weight: bold; color: #dc3545; letter-spacing: 3px;">${code}</span>
              </div>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>⏰ Important :</strong> Ce code expirera dans 2 heures pour des raisons de sécurité.
              </p>
            </div>
            
            <div style="background: #f8d7da; padding: 15px; border-radius: 4px; border-left: 4px solid #dc3545; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>🛡️ Sécurité :</strong> Si vous n'avez pas demandé cette réinitialisation, ignorez cet email. Votre mot de passe actuel reste inchangé.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  };
}

export function passwordResetConfirmationTemplate() {
  return {
    subject: "✅ Mot de passe modifié avec succès - Eurasia Peace",
    text: `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
        <div style="padding: 25px; background: #f9f9f9;">
          <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
            <h2 style="color: #28a745; margin-top: 0; font-size: 20px;">Mot de passe modifié avec succès</h2>
            <p style="font-size: 15px;">Bonjour,</p>
            <p style="font-size: 15px;">Votre mot de passe a été réinitialisé avec succès sur Eurasia Peace.</p>
            
            <div style="background: #e9f7ef; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>✅ Confirmation :</strong> Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXT_PUBLIC_CLIENT_URL}/connexion" 
                 style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">
                🔐 Se connecter
              </a>
            </div>
            
            <div style="background: #f8d7da; padding: 15px; border-radius: 4px; border-left: 4px solid #dc3545; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>🛡️ Sécurité :</strong> Si vous n'avez pas effectué cette modification, contactez immédiatement notre support.
              </p>
            </div>
          </div>
        </div>
      </div>
    `,
  };
}
