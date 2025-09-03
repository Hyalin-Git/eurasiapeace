import { User } from "@/features/user/types";

interface MessageDetails {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const colors = {
  backgroundPrimary: "#fbfcfd",
  textPrimary: "#2a303b",
  textSecondary: "#8d8d8d",
  darkBlue: "#32649e",
  forceBlue: "#4a89a8",
  gold: "#d1a65e",
  midnightGreen: "#084854",
  borderPrimary: "#ebf0f8",
};

const emailStyles = {
  container: {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    backgroundColor: colors.backgroundPrimary,
    color: colors.textPrimary,
    textAlign: "center",
    padding: "40px 20px",
  },
  header: {
    marginBottom: "30px",
  },
  logo: {
    maxWidth: "200px",
    margin: "0 auto",
  },
  content: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: `1px solid ${colors.forceBlue}`,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: colors.forceBlue,
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "17px",
    lineHeight: "1.7",
    marginBottom: "25px",
    textAlign: "left",
  },
  button: {
    backgroundColor: colors.gold,
    borderRadius: "50px",
    padding: "15px 35px",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "16px",
    textDecoration: "none",
    display: "inline-block",
    marginTop: "10px",
    letterSpacing: "0.5px",
  },
  highlight: {
    color: colors.gold,
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    color: colors.darkBlue,
  },
  messageBox: {
    border: `1px solid ${colors.borderPrimary}`,
    borderRadius: "8px",
    padding: "15px",
    marginTop: "10px",
    backgroundColor: colors.backgroundPrimary,
  },
  note: {
    fontSize: "14px",
    color: colors.textSecondary,
    marginTop: "30px",
    textAlign: "center",
  },
  summary: {
    border: `1px solid ${colors.borderPrimary}`,
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
    backgroundColor: colors.backgroundPrimary,
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: colors.darkBlue,
    marginBottom: "15px",
  },
  footer: {
    marginTop: "30px",
    fontSize: "13px",
    color: colors.textSecondary,
  },
};

export function emailAccountCreation(user: User) {
  const templates = {
    subject: "Bienvenue chez Eurasia Peace !",
    text: `
       <div style="${emailStyles.container}">
            <div style="${emailStyles.content}">
                <h1 style="${emailStyles.title}">Bienvenue chez Eurasia Peace !</h1>
                <p style="${emailStyles.paragraph}">
                    Bonjour ${user.firstName},
                </p>
                <p style="${emailStyles.paragraph}">
                    Nous sommes ravis de vous accueillir. Votre compte a été créé avec succès. Vous avez désormais accès à un contenu exclusif, incluant nos analyses géopolitiques, nos formations et bien plus encore.
                </p>
                <a href="#" style="${emailStyles.button}">
                    Explorer mon espace
                </a>
            </div>
            <p style="${emailStyles.footer}">
                Vous recevez cet e-mail car un compte a été créé sur eurasiapeace.org avec cette adresse.
            </p>
        </div>
    `,
  };
  return templates;
}

export function emailResetPassword(user: User) {
  const templates = {
    subject: "Réinitialisation de votre mot de passe",
    text: `
       <div style="${emailStyles.container}">
            <div style="${emailStyles.content}">
                <h1 style="${emailStyles.title}">Réinitialisation de votre mot de passe</h1>
                <p style="${emailStyles.paragraph}">
                    Bonjour ${user.firstName},
                </p>
                <p style="${emailStyles.paragraph}">
                    Nous avons reçu une demande de réinitialisation du mot de passe pour votre compte sur Eurasia Peace.
                </p>
                <p style="${emailStyles.paragraph}">
                    Pour choisir un nouveau mot de passe, veuillez cliquer sur le bouton ci-dessous. Ce lien expirera dans 60 minutes.
                </p>
                <div style="${emailStyles.button}">
                    <a href="#" style="${emailStyles.button}">
                        Réinitialiser mon mot de passe
                    </a>
                </div>
                <p style="${emailStyles.note}">
                    Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail en toute sécurité. Votre mot de passe ne sera pas modifié.
                </p>
            </div>
            <p style="${emailStyles.footer}">
                Vous recevez cet e-mail car une demande de réinitialisation de mot de passe a été effectuée pour votre compte.
            </p>
        </div>
    `,
  };
  return templates;
}

export function emailNewMessage(contactDetails: MessageDetails) {
  const templates = {
    subject: "Nouveau message de contact",
    text: `
       <div style={emailStyles.container}>
            <div style="${emailStyles.content}">
                <h1 style="${emailStyles.title}">Nouveau message de contact</h1>
                <p style="${emailStyles.paragraph}">
                    <span style="${emailStyles.label}">De :</span> ${contactDetails.firstname} ${contactDetails.lastname}
                </p>
                <p style="${emailStyles.paragraph}">
                    <span style="${emailStyles.label}">Email :</span> ${contactDetails.email}
                </p>
                <p style="${emailStyles.paragraph}">
                    <span style="${emailStyles.label}">Téléphone :</span> ${contactDetails.phone}
                    </p>
                <p style="${emailStyles.paragraph}">
                    <span style="${emailStyles.label}">Sujet :</span> ${contactDetails.subject}
                </p>
                <div>
                    <p style="${emailStyles.label}">Message :</p>
                    <div style="${emailStyles.messageBox}">
                        <p style="${emailStyles.paragraph}">${contactDetails.message}</p>
                    </div>
                </div>
            </div>
            <p style="${emailStyles.footer}">
                Cet e-mail a été envoyé depuis le formulaire de contact de eurasiapeace.org.
            </p>
        </div>
    `,
  };
  return templates;
}

export function emailNewMessageConfirmation(contactDetails: MessageDetails) {
  const templates = {
    subject: "Nous avons bien reçu votre message",
    text: `
       <div style={emailStyles.container}>
            <div style="${emailStyles.content}">
                <h1 style="${emailStyles.title}">Nous avons bien reçu votre message</h1>
                <p style="${emailStyles.paragraph}">
                    Bonjour ${contactDetails.firstname},
                </p>
                <p style="${emailStyles.paragraph}">
                    Nous vous confirmons la bonne réception de votre message et vous remercions de l'intérêt que vous portez à Eurasia Peace. Notre équipe s'engage à vous répondre dans les plus brefs délais.
                </p>
                <div style="${emailStyles.summary}">
                    <h2 style="${emailStyles.summaryTitle}">Rappel de votre message :</h2>
                    <p style="${emailStyles.paragraph}"><strong>Sujet :</strong> ${contactDetails.subject}</p>
                    <p style="${emailStyles.paragraph}"><strong>Message :</strong> "${contactDetails.message}"</p>
                </div>
                <div style="${emailStyles.button}">
                    <a href="https://eurasiapeace.org" style="${emailStyles.button}">
                        Retourner sur le site
                    </a>
                </div>
            </div>
            <p style="${emailStyles.footer}">
                Vous recevez cet e-mail en confirmation de votre prise de contact sur eurasiapeace.org.
            </p>
        </div>
    `,
  };
  return templates;
}
