"use client";

import { useState } from "react";
import { Heart, Users, BookOpen, Globe, Check } from "lucide-react";
import Banner from "@/components/Banner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import { createPaymentIntent } from "@/server/api/stripe";
import Checkout from "@/components/stripe/Checkout";

const donationAmounts = [5, 10, 20, 50, 100, 200];

export default function FaireUnDon() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isPayment, setIsPayment] = useState<boolean>(false);

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const BannerProps = {
    title: "Faire un don",
    content:
      "Soutenez notre mission de recherche et de promotion de la paix en Eurasie",
    image:
      "bg-[url('/banner/contact-banner.webp')] bg-cover bg-center bg-no-repeat",
    className:
      "before:bg-[linear-gradient(to_right,_var(--color-midnight-green)_20%,_#355b7c0d)]",
  };

  async function handleDonation() {
    const amount = getCurrentAmount();

    if (amount > 0) {
      const response = await createPaymentIntent(amount);
      setClientSecret(response?.data?.client_secret);
      setIsPayment(true);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <Banner BannerProps={BannerProps} />
      <section className="container py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Mission Statement */}
            <div className="mb-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Votre soutien nous permet de continuer nos recherches
                indépendantes, d&apos;organiser des événements de qualité et de
                promouvoir le dialogue entre l&apos;Europe et l&apos;Asie.
                Chaque don, quelle que soit sa taille, contribue directement à
                notre mission de paix et de compréhension mutuelle.
              </p>
            </div>

            <div className="flex gap-8">
              <div className="w-1/2 bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-2xl font-bold mb-6">Faire un don</h3>
                {/* Preset Amounts */}
                {!isPayment ? (
                  <div className="mb-4">
                    <span className="block text-sm font-medium mb-2">
                      Montant
                    </span>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {donationAmounts.map((amount) => (
                        <label
                          className="flex items-center justify-center border border-midnight-green rounded-md p-2 cursor-pointer has-checked:bg-midnight-green has-checked:text-white hover:bg-midnight-green hover:text-white transition-all duration-300"
                          key={amount}
                        >
                          <input
                            type="radio"
                            name="donationAmount"
                            className="hidden"
                            checked={selectedAmount === amount}
                            onChange={() => handleAmountSelect(amount)}
                          />
                          <div>{amount} €</div>
                        </label>
                      ))}
                    </div>

                    {/* Custom Amount */}
                    <div className="relative mb-4">
                      <Input
                        id="customAmount"
                        type="number"
                        configs={{
                          placeholder: "Autre montant",
                          value: customAmount,
                          onChange: (e) => handleCustomAmount(e.target.value),
                        }}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        €
                      </span>
                    </div>

                    <Button
                      type="button"
                      className="w-full h-12 text-lg"
                      disabled={getCurrentAmount() === 0}
                      onClick={handleDonation}
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      {getCurrentAmount() > 0
                        ? `Donner ${getCurrentAmount()} €`
                        : "Faire un don"}
                    </Button>

                    <p className="text-xs mt-2 text-center">
                      Paiement sécurisé. Vous recevrez un reçu fiscal pour votre
                      don.
                    </p>
                  </div>
                ) : (
                  <div className="mb-4">
                    <span className="block text-sm font-medium mb-2">
                      Choisissez votre méthode de paiement
                    </span>
                    <Checkout
                      clientSecret={clientSecret}
                      buttonText={`Payer ${getCurrentAmount()} € maintenant`}
                    />
                    <Button
                      type="button"
                      className="w-full h-12 text-lg mt-2 bg-gray-400/40! text-text-primary! hover:bg-gray-400/50! transition-all duration-300"
                      onClick={() => setIsPayment(false)}
                    >
                      Annuler
                    </Button>
                    <p className="text-xs mt-2 text-center">
                      Paiement sécurisé. Vous recevrez un reçu fiscal pour votre
                      don.
                    </p>
                  </div>
                )}
              </div>

              {/* Impact Information */}
              <div className="w-1/2 space-y-6">
                {/* Tax Benefits */}
                <div className="border-primary/20 bg-primary/5 rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <Check className="h-6 w-6 text-primary mr-2" />
                    <h3 className="text-xl font-semibold">Avantages fiscaux</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">
                    Votre don à Eurasia Peace est déductible de vos impôts :
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 66% de réduction d&apos;impôt sur le revenu</li>
                    <li>• Plafond de 20% du revenu imposable</li>
                    <li>• Reçu fiscal automatique</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mr-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Recherche indépendante
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Vos dons financent nos recherches approfondies sur les
                    enjeux géopolitiques eurasiatiques, garantissant notre
                    indépendance et la qualité de nos analyses.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mr-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Dialogue et formation
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nous organisons des conférences, webinaires et formations
                    pour promouvoir la compréhension mutuelle et le dialogue
                    constructif.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mr-4">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      Impact international
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Nos travaux influencent les décideurs politiques et
                    contribuent à l&apos;amélioration des relations
                    internationales en Eurasie.
                  </p>
                </div>
              </div>
            </div>

            {/* Transparency Section */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-6">
                Transparence financière
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-background-light-third rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">
                    75%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    des fonds consacrés à la recherche
                  </p>
                </div>
                <div className="p-6 bg-background-light-third rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">
                    20%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    pour les événements et formations
                  </p>
                </div>
                <div className="p-6 bg-background-third rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-2">5%</div>
                  <p className="text-sm text-muted-foreground">
                    frais administratifs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
