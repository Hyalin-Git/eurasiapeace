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
    subject: "Votre mot de passe a été changé avec succès",
    text: `
      <div>
        <h1>Changement de mot de passe confirmé</h1>
        <p>Bonjour,</p>
        <p>Nous vous confirmons que votre mot de passe a été changé avec succès.</p>
        <ul>
            <li>Adresse e-mail : ${email}</li>
            <li>Date de changement : ${new Date().toLocaleString()}</li>
        </ul>
        <p>Si vous n'êtes pas à l'origine de ce changement, veuillez contacter immédiatement notre service d'assistance pour sécuriser votre compte.</p>
        <p>Merci de votre confiance,</p>
        <p>L'équipe EurasiaPeace</p>
      </div>
    `,
  };
}
