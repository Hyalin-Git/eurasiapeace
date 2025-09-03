import SubscriptionCard from "./SubscriptionCard";

export default function SubscriptionCards() {
  const subscriptions = [
    {
      id: 1,
      title: "Abonnement EurasiaPeace",
      price: "12€",
      duration: "an",
      moreInfo: "Paiement sécurisé via Stripe",
      buttonText: "S'abonner maintenant",
      services: [
        "Accès à l'intégralité du contenu du site",
        "Articles, dossiers thématiques, rapports complets",
        "Réduction de 15% sur toutes les formations EurasiaPeace",
      ],
      color: "forceBlue" as const,
      lookup_key: "Abonnement_EurasiaPeace-8f7f84b",
    },
    {
      id: 2,
      title: "Abonnement Contributeur Spécial",
      price: "4,90€",
      duration: "mois",
      moreInfo: "Conditionné à l'abonnement EurasiaPeace",
      buttonText: "Postuler comme contributeur",
      services: [
        "Canal de communication direct avec l'équipe EurasiaPeace (WhatsApp)",
        "Statut d'auteur avec espace de publication sur le site",
        "Production de points de situation géopolitique hebdomadaires/mensuels",
        "Promotion de vos compétences sur les réseaux sociaux",
        "Accès serveur offres d'emploi, stages, services civiques",
        "Participation aux podcasts, webinaires et dossiers thématiques",
        "Développement de votre réseau professionnel",
      ],
      color: "purple" as const,
      lookup_key: "Abonnement_Contributeur_Spécial-518489b",
    },
  ];

  return (
    <div className="flex justify-between flex-col gap-20">
      {subscriptions.map((sub) => {
        return <SubscriptionCard key={sub?.id} subscription={sub} />;
      })}
    </div>
  );
}
