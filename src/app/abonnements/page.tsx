import SubscriptionCards from "@/features/subscriptions/components/SubscriptionCards";

export default function Abonnements() {
  return (
    <div className="container bg-gray-50 py-12">
      <div className="max-w-10xl px-4">
        <div className="text-center mb-12">
          <h1 className="font-bold mb-4">S&apos;abonner à EurasiaPeace</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bienvenue sur la page d&apos;abonnement à EurasiaPeace. En
            souscrivant à ces abonnements, vous vous engagez à accepter et à
            respecter les CGUV du site.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="font-bold text-center mb-16">
            Nos offres d&apos;abonnement
          </h2>

          <div className="flex justify-center">
            <SubscriptionCards />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">
          Information importante
        </h4>
        <p className="text-blue-700 text-sm">
          L&apos;abonnement Contributeur Spécial est strictement encadré par un
          contrat d&apos;engagement réciproque. Il est mensuel et peut être
          résilié à tout moment. La candidature est soumise à l&apos;accord du
          fondateur suite à un processus de sélection préalable et un entretien.
        </p>
      </div>
    </div>
  );
}
