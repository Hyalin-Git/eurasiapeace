import React from 'react'

export default function JoinUs() {
    return (
        <section className="text-center">
            <div className="bg-background-light-secondary p-8 rounded-lg">
                <h2 className="text-2xl font-playfair font-bold text-text-primary mb-6">
                    Rejoindre EurasiaPeace
                </h2>
                <p className="text-text-secondary mb-6">
                    Abonnez-vous à notre newsletter, participez à nos formations,
                    soutenez notre mission de paix en Eurasie.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/abonnements"
                        className="bg-background-light-blue text-white px-6 py-2 rounded-md hover:bg-background-dark-blue transition-colors"
                    >
                        Abonnement
                    </a>
                    <a
                        href="/faire-un-don"
                        className="bg-btn-gold text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
                    >
                        Faire un don
                    </a>
                </div>
            </div>
        </section>
    )
}
