"use client";

import { useAuth } from "@/context/AuthProvider";
import { unsubscribeFromNewsletter } from "@/utils/mailjet";
import { useEffect, useState } from "react";
import { MailX, ArrowLeft, Mail } from "lucide-react";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import SuccessMessage from "@/ui/SuccessMessage";
import ErrorMessage from "@/ui/ErrorMessage";
import Link from "next/link";

export default function UnsubscribePage() {
  const { user } = useAuth();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);

  async function handleUnsubscribe(emailToUnsubscribe: string) {
    setIsLoading(true);
    setError("");
    setHasAttempted(true);

    try {
      const { success, message } = await unsubscribeFromNewsletter(
        emailToUnsubscribe
      );

      if (success) {
        setIsSuccess(true);
      } else {
        setError(message || "Une erreur est survenue lors du désabonnement");
      }
    } catch {
      setError("Une erreur inattendue est survenue");
    } finally {
      setIsLoading(false);
    }
  }

  // Auto-désabonnement si l'utilisateur est connecté
  useEffect(() => {
    if (user?.email && !hasAttempted) {
      handleUnsubscribe(user.email);
    }
  }, [user, hasAttempted]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      handleUnsubscribe(email.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background-primary py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-red-100 rounded-full">
              <MailX size={48} className="text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Désabonnement de la newsletter
          </h1>
          <p className="text-text-secondary">
            Nous sommes désolés de vous voir partir
          </p>
        </div>

        {/* Contenu principal */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {isSuccess ? (
            // Message de succès
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-green-100 rounded-full">
                  <MailX size={32} className="text-green-600" />
                </div>
              </div>
              <SuccessMessage>
                <span className="text-base font-medium">
                  Désabonnement réussi !
                </span>
                <span className="block mt-2 text-sm">
                  Vous avez été désabonné de notre newsletter avec succès. Vous
                  ne recevrez plus d&apos;emails de notre part.
                </span>
              </SuccessMessage>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button type="button" className="flex items-center gap-2">
                    <ArrowLeft size={16} />
                    Retour à l&apos;accueil
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    type="button"
                    className="bg-gray-500 hover:bg-gray-600 flex items-center gap-2"
                  >
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          ) : user ? (
            // Utilisateur connecté - désabonnement en cours
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Mail size={32} className="text-blue-600" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Désabonnement en cours...
              </h2>
              <p className="text-text-secondary mb-6">
                Nous traitons votre demande de désabonnement pour l&apos;adresse
                :
                <br />
                <span className="font-medium">{user.email}</span>
              </p>

              {isLoading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-midnight-green"></div>
                </div>
              )}

              {error && <ErrorMessage>{error}</ErrorMessage>}
            </div>
          ) : (
            // Formulaire pour utilisateur non connecté
            <div>
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Saisissez votre adresse email
                </h2>
                <p className="text-text-secondary">
                  Entrez l&apos;adresse email que vous souhaitez désabonner de
                  notre newsletter
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-2"
                  >
                    Adresse email
                  </label>
                  <Input
                    type="email"
                    id="email"
                    configs={{
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: "votre@email.com",
                      isRequired: true,
                      icon: (
                        <Mail
                          size={20}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                      ),
                    }}
                  />
                </div>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !email.trim()}
                    className="flex-1 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Désabonnement...
                      </>
                    ) : (
                      <>
                        <MailX size={16} />
                        Se désabonner
                      </>
                    )}
                  </Button>

                  <Link href="/" className="flex-1">
                    <Button
                      type="button"
                      className="w-full bg-gray-500 hover:bg-gray-600 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      Annuler
                    </Button>
                  </Link>
                </div>
              </form>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-text-secondary text-center">
                  <strong>Note :</strong> Une fois désabonné, vous ne recevrez
                  plus nos analyses géopolitiques. Vous pourrez vous réabonner à
                  tout moment depuis notre site.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lien de retour */}
        {!isSuccess && (
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-midnight-green hover:text-midnight-green/80 text-sm font-medium inline-flex items-center gap-1"
            >
              <ArrowLeft size={14} />
              Retour à l&apos;accueil
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
