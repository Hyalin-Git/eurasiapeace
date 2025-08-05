"use server";

import SignInForm from "@/features/signIn/components/signInForm";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{
    redirect_url?: string;
  }>;
}) {
  const { redirect_url } = await searchParams;

  return (
    <div className="container h-full flex flex-col justify-center items-center py-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          Connexion à votre compte
        </h2>
        <p className="mt-2 text-center text-sm">
          Accédez à votre espace personnel EurasiaPeace
        </p>
      </div>

      <SignInForm redirect={redirect_url} />
    </div>
  );
}
