"use server";

import Image from "next/image";

export default async function Activities() {
  const activities = [
    {
      title: "Centre de Formation",
      description:
        "EurasiaPeace est aussi un centre de formation interdisciplinaire proposant des cycles courts en distanciel ou sur site à destination d'étudiants et de professionnels dans les domaines suivants :",
      list: [
        "Géopolitique",
        "Cartographie",
        "Management interculturel",
        "Gestion des riques",
        "OSINT",
      ],
    },
    {
      title: "Publication et Diffusion",
      description:
        "EurasiaPeace propose un espace de publication et de diffusion d'analyses sous forme de :",
      list: [
        "Veilles géopolitiques",
        "Notes d'analyse",
        "Dossiers thématiques",
        "Rapports et fiches de renseignement",
        "Arts et culture",
      ],
    },
  ];

  return (
    <section className="mb-16">
      <h2 className="font-playfair font-bold text-text-primary mb-8 text-center">
        Nos Activités
      </h2>

      <div className="mb-6 text-center">
        <p className="text-text-secondary max-w-3xl mx-auto">
          Ce site se conçoit également comme une plate-forme internationale de
          promotion de compétences et de développement de réseau pour un nombre
          croissant d&apos;étudiants, de jeunes chercheurs ou professionnels,
          français ou étrangers.
        </p>
      </div>

      <div className="flex lg:flex-row flex-col gap-8">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 p-8 rounded-2xl shadow-md"
          >
            <h3 className="text-2xl font-playfair font-bold text-text-primary mb-4">
              {activity?.title}
            </h3>

            <p className="text-text-secondary mb-4">{activity?.description}</p>
            <ul className="flex items-center flex-wrap gap-2 text-text-secondary space-y-1">
              {activity?.list?.map((item, index) => (
                <li
                  key={index}
                  className="py-2 px-4 bg-gray-200 rounded-4xl font-medium text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
            {activity.title === "Centre de Formation" && (
              <div className="relative w-full max-w-100 h-50 mt-2">
                <Image
                  src={"/qualiopi-gqc.webp"}
                  alt="Logo Qualiopi"
                  fill
                  quality={100}
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 60vw"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
