"use server";

import { isEmpty } from "@/utils/isEmpty";
import { Member } from "../types";

export default async function CommiteeMember({ member }: { member: Member }) {
  const expertises = member?.expertises?.map((exp) => exp?.expertise);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
      {/* Card decoration */}
      <div className="hidden md:block absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-midnight-green/20 to-transparent rounded-bl-full group-hover:w-62 group-hover:h-62 transition-all duration-300"></div>

      <div className="p-6">
        {/* Heading */}
        <div className="mb-4">
          <div className="w-fit bg-midnight-green rounded-br-full px-3 py-1 pr-6">
            <h3 className="text-2xl font-semibold text-white">
              {member?.fullName}
            </h3>
          </div>
          <p className="mt-2 text-md text-black/70 font-medium">
            {member?.title}
          </p>
        </div>

        {/* Expertises */}
        <div className="mb-8">
          <span className="block mb-2 text-lg text-text-secondary font-medium">
            Expertises
          </span>

          {!isEmpty(member?.expertises) ? (
            <div className="flex flex-wrap gap-4 sm:max-w-[85%]">
              {expertises.map((expertise, idx) => (
                <span
                  key={idx}
                  title={expertise}
                  className="block cursor-default text-text-primary text-sm truncate max-w-60 font-medium shadow-xs rounded-lg px-4 py-2 bg-gray-200/80"
                >
                  {expertise}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-primary">
              Aucune expertise renseignée.
            </p>
          )}
        </div>

        {/* Biography */}
        <div>
          <span className="block text-lg mb-2 text-text-secondary font-medium">
            Biographie
          </span>

          <p className="text-sm text-text-primary">
            {member?.bio || "Biographie non renseignée."}
          </p>
        </div>
      </div>
    </div>
  );
}
