import nodemailer from "nodemailer";
import { Error } from "@/types";

//  MailPit config
const transporter = nodemailer.createTransport({
  // host: "localhost",
  // port: 1025,
  // secure: false,
  host: "in-v3.mailjet.com",
  port: 587,
  auth: {
    user: `${process.env.MAILJET_API_KEY}`,
    pass: `${process.env.MAILJET_API_SECRET}`,
  },
} as nodemailer.TransportOptions);

const colors = {
  backgroundPrimary: "#f8f9fa",
  textPrimary: "#2a303b",
  textSecondary: "#8d8d8d",
  headerBackground: "#5a7c8a",
  darkBlue: "#32649e",
  gold: "#d1a65e",
  borderPrimary: "#ebf0f8",
  white: "#ffffff",
  buttonConseil: "#d1a65e",
  buttonFormation: "#5a7c8a",
};

function removeHtmlTags(html: string) {
  return html?.replace(/<[^>]*>?/gm, "");
}

function generateEmailTemplate(title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html lang="fr" xmlns="https://www.w3.org/1999/xhtml">
      <head>
        <title>${title}</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      
      <body style="margin: 0; padding: 0; background-color: ${
        colors.backgroundPrimary
      }; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="width: 100%; max-width: 800px; margin: 0 auto; background-color: ${
          colors.white
        }; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          
          <!-- Header avec titre et logo -->
          <div style="background: linear-gradient(135deg, ${
            colors.headerBackground
          } 0%, #4a6b78 100%); padding: 40px 30px; position: relative; overflow: hidden;">
            <h1 style="color: ${
              colors.white
            }; font-size: 28px; font-weight: 600; margin: 0; z-index: 2; position: relative;">${title}</h1>
          </div>

          <!-- Contenu principal -->
          <div style="padding: 40px 30px; text-align: center;">
            <div style="font-size: 36px; font-weight: 300; color: ${
              colors.textPrimary
            }; margin-bottom: 40px; line-height: 1.2;">
              ${content}
            </div>
          </div>

          <!-- Section Accès rapide -->
          <div style="padding: 0 30px 40px 30px;">
            <h2 style="color: ${
              colors.textPrimary
            }; font-size: 18px; font-weight: 600; margin-bottom: 30px; text-align: left;">Accès rapide à vos ressources</h2>
            
            <!-- Publications -->
            <div style="background-color: #f8f9fc; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid ${
              colors.darkBlue
            };">
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="margin-right: 15px; margin-top: 2px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" fill="${
                      colors.darkBlue
                    }"/>
                  </svg>
                </div>
                <div>
                  <h3 style="color: ${
                    colors.textPrimary
                  }; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Publications</h3>
                  <p style="color: ${
                    colors.textSecondary
                  }; font-size: 14px; line-height: 1.4; margin: 0 0 15px 0;">
                    Production intellectuelle de notre think-tank pour alimenter votre réflexion stratégique et développer votre connaissance de l'espace eurasiatique.
                  </p>
                  <a href="${
                    process.env.NEXT_PUBLIC_CLIENT_URL
                  }/publications" style="display: inline-block; background-color: ${
    colors.darkBlue
  }; color: ${
    colors.white
  }; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500;">
                    Lire nos publications →
                  </a>
                </div>
              </div>
            </div>

            <!-- Conseils et Formations en ligne -->
            <div style="display: flex; gap: 15px; margin-bottom: 30px;">
              
              <!-- Conseils -->
              <div style="flex: 1; background-color: #fefbf6; padding: 20px; border-radius: 8px; border-left: 4px solid ${
                colors.buttonConseil
              };">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right: 10px;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" fill="${
                      colors.buttonConseil
                    }"/>
                  </svg>
                  <h3 style="color: ${
                    colors.textPrimary
                  }; font-size: 15px; font-weight: 600; margin: 0;">Conseils</h3>
                </div>
                <p style="color: ${
                  colors.textSecondary
                }; font-size: 13px; line-height: 1.4; margin: 0 0 12px 0;">
                  Analyses précises et regards externes rigoureux pour vous accompagner dans vos prises de décisions à court, moyen et long terme.
                </p>
                <a href="${
                  process.env.NEXT_PUBLIC_CLIENT_URL
                }/conseils" style="display: inline-block; background-color: ${
    colors.buttonConseil
  }; color: ${
    colors.white
  }; padding: 6px 12px; border-radius: 5px; text-decoration: none; font-size: 12px; font-weight: 500;">
                  Découvrir ce service →
                </a>
              </div>

              <!-- Formations -->
              <div style="flex: 1; background-color: #f6f9fb; padding: 20px; border-radius: 8px; border-left: 4px solid ${
                colors.buttonFormation
              };">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="margin-right: 10px;">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" fill="${
                      colors.buttonFormation
                    }"/>
                  </svg>
                  <h3 style="color: ${
                    colors.textPrimary
                  }; font-size: 15px; font-weight: 600; margin: 0;">Formations</h3>
                </div>
                <p style="color: ${
                  colors.textSecondary
                }; font-size: 13px; line-height: 1.4; margin: 0 0 12px 0;">
                  Modules sur mesure avec des formateurs spécialisés pour développer votre maîtrise dans des domaines de compétences ciblées.
                </p>
                <a href="${
                  process.env.NEXT_PUBLIC_CLIENT_URL
                }/formations" style="display: inline-block; background-color: ${
    colors.buttonFormation
  }; color: ${
    colors.white
  }; padding: 6px 12px; border-radius: 5px; text-decoration: none; font-size: 12px; font-weight: 500;">
                  Découvrir ce service →
                </a>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: linear-gradient(135deg, ${
            colors.headerBackground
          } 0%, #4a6b78 100%); padding: 40px 30px; color: ${
    colors.white
  }; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 2; max-width: 1200px; margin: 0 auto;">
              
              <!-- Contenu principal du footer -->
              <div style="margin-bottom: 30px;">
                
                <!-- Description -->
                <div style="margin-bottom: 25px;">
                  <p style="font-size: 24px; font-weight: 500; line-height: 1.4; margin: 0; color: ${
                    colors.white
                  };">
                    EurasiaPeace œuvre pour la construction d'un monde plus pacifique à travers la diplomatie, l'éducation et la coopération internationale.
                  </p>
                </div>
                
                <!-- Contact Info -->
                <div style="margin-bottom: 25px;">
                  <div style="margin-bottom: 12px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                          <a href="mailto:contact@eurasiapeace.org" style="text-decoration: none; color: ${
                            colors.white
                          };">
                            <img src="https://img.icons8.com/ios-filled/18/ffffff/email.png" alt="Email" width="18" height="18" style="display: block; border: 0;" />
                          </a>
                        </td>
                        <td style="vertical-align: middle;">
                          <a href="mailto:contact@eurasiapeace.org" style="text-decoration: none; color: ${
                            colors.white
                          };">
                            <span style="font-size: 14px; color: ${
                              colors.white
                            };">contact@eurasiapeace.org</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="vertical-align: middle; padding-right: 10px;">
                          <a href="tel:+33637363699" style="text-decoration: none; color: ${
                            colors.white
                          };">
                            <img src="https://img.icons8.com/ios-filled/18/ffffff/phone.png" alt="Téléphone" width="18" height="18" style="display: block; border: 0;" />
                          </a>
                        </td>
                        <td style="vertical-align: middle;">
                          <a href="tel:+33637363699" style="text-decoration: none; color: ${
                            colors.white
                          };">
                            <span style="font-size: 14px; color: ${
                              colors.white
                            };">+33 (0)6 37 36 36 99</span>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <!-- Social Media et Bouton Faire un don -->
                <div>
                  <table cellpadding="0" cellspacing="0" border="0" width="100%">
                    <tr>
                      <td style="vertical-align: middle; width: 50%;">
                        <table cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="vertical-align: middle; padding-right: 15px;">
                              <span style="font-size: 14px; color: ${
                                colors.white
                              };">Suivez-nous</span>
                            </td>
                            <td style="vertical-align: middle; padding-right: 12px;">
                              <a href="https://www.facebook.com/profile.php?id=61580972964723" target="_blank" style="display: block;">
                                <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" width="24" height="24" style="display: block; border: 0;" />
                              </a>
                            </td>
                            <td style="vertical-align: middle; padding-right: 12px;">
                              <a href="https://x.com/eurasia_peace" target="_blank" style="display: block;">
                                <img src="https://img.icons8.com/ios-filled/24/ffffff/twitterx.png" alt="X (Twitter)" width="24" height="24" style="display: block; border: 0;" />
                              </a>
                            </td>
                            <td style="vertical-align: middle; padding-right: 12px;">
                              <a href="https://fr.linkedin.com/company/eurasiapeace" target="_blank" style="display: block;">
                                <img src="https://img.icons8.com/ios-filled/24/ffffff/linkedin.png" alt="LinkedIn" width="24" height="24" style="display: block; border: 0;" />
                              </a>
                            </td>
                            <td style="vertical-align: middle;">
                              <a href="https://www.instagram.com/eurasiapeace/" target="_blank" style="display: block;">
                                <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" alt="Instagram" width="24" height="24" style="display: block; border: 0;" />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td style="vertical-align: middle; width: 50%; text-align: right;">
                        <a href="${
                          process.env.NEXT_PUBLIC_CLIENT_URL
                        }/faire-un-don" style="display: inline-block; background-color: ${
    colors.white
  }; color: ${
    colors.headerBackground
  }; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 16px; font-weight: 600; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                          Faire un don
                        </a>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Ligne de séparation -->
              <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px; margin-top: 20px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr>
                    <td style="vertical-align: middle; text-align: left; width: 50%;">
                      <span style="font-size: 12px; color: rgba(255,255,255,0.9);">© ${new Date().getFullYear()} EurasiaPeace. Tous droits réservés.</span>
                    </td>
                    <td style="vertical-align: middle; text-align: right; width: 50%;">
                      <a href="${
                        process.env.NEXT_PUBLIC_CLIENT_URL
                      }/politique-de-confidentialite" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 12px; margin-right: 20px;">Politique de confidentialité</a>
                      <a href="${
                        process.env.NEXT_PUBLIC_CLIENT_URL
                      }/newsletter/unsubscribe" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 12px;">Se désabonner</a>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

        </div>
      </body>
    </html>
  `;
}

export async function sendEmail(
  from: string = "",
  to: string,
  subject: string,
  text: string,
  attachments: Array<{
    filename: string;
    path: string;
    contentType: string;
  }> = []
) {
  try {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: removeHtmlTags(text),
      html: generateEmailTemplate(subject, text),
      attachments: attachments || [],
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
