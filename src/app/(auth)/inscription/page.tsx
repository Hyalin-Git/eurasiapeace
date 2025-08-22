"use server";

import SignUpForm from "@/features/signUp/components/SignUpForm";

export default async function SignUp({
  searchParams,
}: {
  searchParams: Promise<{
    redirect_url?: string;
  }>;
}) {
  const { redirect_url } = await searchParams;

  return (
    <div className="container h-full flex flex-col justify-center items-center py-15">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center font-extrabold">Créer votre compte</h2>
        <p className="mt-2 text-center text-sm">
          Rejoignez la communauté EurasiaPeace
        </p>
      </div>

      <SignUpForm redirect={redirect_url} />
    </div>
  );
}
