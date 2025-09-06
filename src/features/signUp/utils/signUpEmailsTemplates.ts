export function welcomeVerificationEmailTemplate(
  firstName: string,
  verificationCode: string,
  clientUrl: string
) {
  return {
    subject: "🎉 Bienvenue sur Eurasia Peace - Confirmez votre compte",
    text: `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
        <div style="padding: 25px; background: #f9f9f9;">
          <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
            <h2 style="color: #0066cc; margin-top: 0; font-size: 20px;">Bienvenue sur Eurasia Peace !</h2>
            <p style="font-size: 15px;">Bonjour ${firstName},</p>
            <p style="font-size: 15px;">Merci de vous être inscrit sur Eurasia Peace ! Nous sommes ravis de vous accueillir dans notre communauté.</p>
            <p style="font-size: 15px;">Pour finaliser votre inscription et accéder à tous nos contenus, veuillez confirmer votre adresse e-mail en cliquant sur le bouton ci-dessous :</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${clientUrl}/verification/${verificationCode}" 
                 style="background-color: #0066cc; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">
                ✅ Confirmer mon compte
              </a>
            </div>
            
            <div style="background: #e9f7ef; padding: 15px; border-radius: 4px; border-left: 4px solid #28a745; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>🌟 Une fois votre compte confirmé, vous pourrez :</strong><br>
                • Accéder à nos analyses géopolitiques exclusives<br>
                • Participer à nos formations spécialisées<br>
                • Recevoir notre newsletter hebdomadaire<br>
                • Rejoindre notre communauté d'experts
              </p>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                <strong>Lien alternatif :</strong><br>
                Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>
                <a href="${clientUrl}/verification/${verificationCode}" style="color: #0066cc; word-break: break-all;">
                  ${clientUrl}/verification/${verificationCode}
                </a>
              </p>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 4px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">
                <strong>⏰ Important :</strong> Ce lien de vérification expirera dans 24 heures pour des raisons de sécurité.
              </p>
            </div>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 14px;">
            <p>Si vous n'avez pas créé de compte sur Eurasia Peace, vous pouvez ignorer cet email.</p>
            <p><strong>L'équipe Eurasia Peace</strong></p>
          </div>
        </div>
      </div>
    `,
  };
}
