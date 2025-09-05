export function contactEmailTemplate(contactDetails: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  const { firstName, lastName, email, phone, subject, message } =
    contactDetails;

  return {
    subject: `Nouveau contact - ${subject}`,
    text: `
      <div style="max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="padding: 30px; background: #f9f9f9;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #0066cc; margin-top: 0;">Informations du contact</h3>
            <p><strong>Nom :</strong> ${lastName}</p>
            <p><strong>Prénom :</strong> ${firstName}</p>
            <p><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone :</strong> ${phone}</p>
            <p><strong>Sujet :</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px;">
            <h2 style="color: #0066cc; margin-top: 0;">Message</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word; word-break: break-word; overflow-wrap: break-word;">
${message}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
            Reçu le ${new Date().toLocaleDateString(
              "fr-FR"
            )} à ${new Date().toLocaleTimeString("fr-FR")}
          </div>
        </div>
      </div>
    `,
  };
}
