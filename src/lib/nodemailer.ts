import nodemailer from "nodemailer";
import { Error } from "@/types";

//  MailPit config
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  auth: null,
} as nodemailer.TransportOptions);

const colors = {
  backgroundPrimary: "#fbfcfd",
  textPrimary: "#2a303b",
  textSecondary: "#8d8d8d",
  darkBlue: "#32649e",
  gold: "#d1a65e",
  borderPrimary: "#ebf0f8",
};

function removeHtmlTags(html: string) {
  return html?.replace(/<[^>]*>?/gm, "");
}

export async function sendEmail(
  from: string = "",
  to: string,
  subject: string,
  text: string
) {
  try {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: removeHtmlTags(text),
      html: `
      <!DOCTYPE html>
      <html lang="fr" xmlns="https://www.w3.org/1999/xhtml">
        <head>
          <title>${subject}</title>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        
        <body>
          <div style="margin: 0; padding: 0; background-color: ${
            colors.backgroundPrimary
          }; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
            <table style="width: 100%; border: 0; border-spacing: 0; border-collapse: collapse; padding: 0;">
              <tr>
                <td style="text-align: center; vertical-align: top; padding: 40px 20px;">
                  <table style="width: 100%; border: 0; border-spacing: 0; border-collapse: collapse; padding: 0; max-width: 600px; margin: 0 auto;">
                    <tr>
                      <td>
                        ${text}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div style="font-size: 13px; color: ${
                          colors.textSecondary
                        }; text-align: center; margin-top: 30px; max-width: 460px; margin-left: auto; margin-right: auto;">
                          <p style="margin: 0 0 10px 0;">
                            Vous recevez cet e-mail dans le cadre de votre relation avec Eurasia Peace. Si vous pensez l'avoir reçu par erreur, vous pouvez l'ignorer.
                          </p>
                          <p style="margin: 0;">
                            © ${new Date().getFullYear()} Eurasia Peace. Tous droits réservés.
                          </p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </body>
      </html>
   `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);

    return {
      success: true,
      status: 200,
      message: "Email sent successfully",
      data: info.messageId,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      err?.message || "Une erreur est survenue lors de l'envoi du mail"
    );

    return {
      success: false,
      status: err?.status || 500,
      message: "Email not sent",
      data: null,
    };
  }
}
