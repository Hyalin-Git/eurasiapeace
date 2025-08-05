export default function ForgotPasswordSteps({ step }: { step: number }) {
  const steps = [1, 2, 3];

  const instructions =
    step === 1
      ? "Entrez votre adresse e-mail"
      : step === 2
      ? "Entrez le code de vérification"
      : "Réinitialisez votre mot de passe";

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex justify-between items-center w-full mb-4 max-w-80 relative">
        {steps.map((s) => {
          return (
            <div key={s} className="flex items-center relative">
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s ? "bg-midnight-green text-white" : "bg-gray-200"
                }`}
              >
                {s}
              </div>
            </div>
          );
        })}

        {/* Barres de connexion entre les steps */}
        <div className="absolute inset-0 flex justify-between items-center px-4">
          <div
            className={`h-1 flex-1 mx-4 ${
              step >= 2 ? "bg-midnight-green" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-1 flex-1 mx-4 ${
              step >= 3 ? "bg-midnight-green" : "bg-gray-200"
            }`}
          ></div>
        </div>
      </div>

      <p className="text-sm text-center text-text-secondary">
        Étape {step} sur 3: {instructions}
      </p>
    </div>
  );
}
