export function formationEmailTemplate(
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  message: string
) {
  return {
    subject: `📚 Demande formation - ${title}`,
    text: `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.5; color: #333; font-size: 16px;">
        <div style="padding: 25px; background: #f9f9f9;">
          <div style="background: white; padding: 22px; border-radius: 8px; margin-bottom: 18px;">
            <h3 style="color: #0066cc; margin-top: 0; font-size: 20px;">Demande de formation</h3>
            <p style="margin: 10px 0; font-size: 15px;"><strong>Formation :</strong> ${title}</p>
            <p style="margin: 10px 0; font-size: 15px;"><strong>Nom :</strong> ${lastName}</p>
            <p style="margin: 10px 0; font-size: 15px;"><strong>Prénom :</strong> ${firstName}</p>
            <p style="margin: 10px 0; font-size: 15px;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0; font-size: 15px;"><strong>Téléphone :</strong> ${phone}</p>
          </div>
          
          <div style="background: white; padding: 22px; border-radius: 8px;">
            <h3 style="color: #0066cc; margin-top: 0; font-size: 20px;">Message</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word; overflow-wrap: break-word; font-size: 15px;">
${message}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 18px; color: #666; font-size: 14px;">
            Reçu le ${new Date().toLocaleDateString(
              "fr-FR"
            )} à ${new Date().toLocaleTimeString("fr-FR")}
          </div>
        </div>
      </div>
    `,
  };
}
