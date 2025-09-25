export async function getRedirection(slug: string) {
  try {
    const res = await fetch(`${process.env.APOLLO_URI}/${slug}`, {
      method: "HEAD", // Plus rapide que GET
      redirect: "manual", // Important : ne pas suivre automatiquement
      headers: {
        "User-Agent": "NextJS-Middleware",
      },
    });

    if (res.status !== 301) {
      return {
        success: false,
        message: "Redirection non trouvée",
        data: null,
      };
    }

    return {
      success: true,
      message: "Redirection récupérée avec succès",
      data: {
        redirect_url: res?.headers?.get("Location"),
      },
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err.message ||
        "Une erreur est survenue lors de la récupération de la redirection"
    );

    return {
      success: false,
      message:
        err.message ||
        "Une erreur est survenue lors de la récupération de la redirection",
      data: null,
    };
  }
}
