import nodemailer from "nodemailer";
import { Error } from "@/types";

//  MailPit config
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
  secure: false,
  // host: "in-v3.mailjet.com",
  // port: 587,
  // auth: {
  //   user: `${process.env.MAILJET_API_KEY}`,
  //   pass: `${process.env.MAILJET_API_SECRET}`,
  // },
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
          } 0%, #4a6b78 100%); padding: 30px; color: ${
    colors.white
  }; position: relative; overflow: hidden;">
            <div style="position: relative; z-index: 2;">
              <p style="font-size: 14px; line-height: 1.6; margin: 0 0 20px 0; max-width: 400px;">
                EurasiaPeace œuvre pour la construction d'un monde plus pacifique à travers la diplomatie, l'éducation et la coopération internationale.
              </p>
              
              <!-- Contact Info -->
              <div style="margin-bottom: 20px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="${
                      colors.white
                    }"/>
                  </svg>
                  <span style="font-size: 13px;">contact@eurasiapeace.org</span>
                </div>
                <div style="display: flex; align-items: center;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 8px;">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="${
                      colors.white
                    }"/>
                  </svg>
                  <span style="font-size: 13px;">+33 (0)6 37 36 36 99</span>
                </div>
              </div>

              <!-- Social Media -->
              <div style="margin-bottom: 20px;">
                <span style="font-size: 13px; margin-right: 15px;">Suivez-nous</span>
                <a href="#" style="display: inline-block; margin-right: 10px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${
                    colors.white
                  }">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" style="display: inline-block; margin-right: 10px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${
                    colors.white
                  }">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" style="display: inline-block; margin-right: 10px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${
                    colors.white
                  }">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </a>
                <a href="#" style="display: inline-block; margin-right: 10px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${
                    colors.white
                  }">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" style="display: inline-block; margin-right: 15px;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="${
                    colors.white
                  }">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 15px; font-size: 11px; color: rgba(255,255,255,0.8);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>© ${new Date().getFullYear()} EurasiaPeace. Tous droits réservés.</span>
                  <div>
                    <a href="${
                      process.env.NEXT_PUBLIC_CLIENT_URL
                    }/politique-de-confidentialite" style="color: rgba(255,255,255,0.8); text-decoration: none; margin-right: 15px;">Politique de confidentialité</a>
                  </div>
                </div>
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
