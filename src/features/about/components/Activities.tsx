export default function Activities() {
  const activities = [
    {
      title: "Centre de Formation",
      description:
        "EurasiaPeace est aussi un centre de formation interdisciplinaire proposant des cycles courts en distanciel ou sur site à destination d'étudiants et de professionnels dans les domaines suivants :",
      list: [
        "Géopolitique",
        "Cartographie",
        "Management interculturel",
        "Intelligence économique",
        "OSINT",
      ],
    },
    {
      title: "Publication et Diffusion",
      description:
        "EurasiaPeace propose un espace de publication et de diffusion d'analyses sous forme de :",
      list: [
        "Veilles géopolitiques",
        "Articles et entretiens",
        "Rapports et dossiers thématiques",
        "Promotion de compétences",
        "Développement de réseau international",
      ],
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-playfair font-bold text-text-primary mb-8 text-center">
        Nos Activités
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-playfair font-bold text-text-primary mb-4">
              {activity.title}
            </h3>
            <p className="text-text-secondary mb-4">{activity.description}</p>
            <ul className="list-disc list-inside text-text-secondary space-y-1">
              {activity.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-text-secondary max-w-3xl mx-auto">
          Ce site se conçoit également comme une plate-forme internationale de
          promotion de compétences et de développement de réseau pour un nombre
          croissant d&apos;étudiants, de jeunes chercheurs ou professionnels,
          français ou étrangers.
        </p>
      </div>
    </section>
  );
}
