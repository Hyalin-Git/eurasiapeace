"use server";

import { isEmpty } from "@/utils/isEmpty";
import { Member } from "../types";
import Image from "next/image";

export default async function CommiteeMember({ member }: { member: Member }) {
  const expertises = member?.expertises?.map((exp) => exp?.expertise);

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
      {/* Card decoration */}
      <div className="hidden md:block absolute top-0 right-0 w-52 h-52 bg-gradient-to-bl from-midnight-green/20 to-transparent rounded-bl-full group-hover:w-62 group-hover:h-62 transition-all duration-300"></div>

      <div className="p-6">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-4">
          <div>
            <Image
              src={member?.picture?.node?.sourceUrl || "/default-avatar.webp"}
              alt={member?.picture?.node?.altText || "Photo du membre"}
              width={100}
              height={100}
              quality={100}
              className="rounded-lg"
            />
          </div>
          <div>
            <div className="w-fit bg-midnight-green rounded-br-full px-3 py-1 pr-6">
              <h3 className="text-2xl font-semibold text-white">
                {member?.fullName}
              </h3>
            </div>
            <p className="mt-2 text-md text-black/70 font-medium">
              {member?.title}
            </p>
          </div>
        </div>

        {/* Expertises */}
        {!isEmpty(member?.expertises) && (
          <div className="mb-8">
            <span className="block mb-2 text-lg text-text-secondary font-medium">
              Expertises
            </span>

            <div className="flex flex-wrap gap-4 sm:max-w-[85%]">
              {expertises.map((expertise, idx) => (
                <span
                  key={idx}
                  title={expertise}
                  className="block cursor-default text-text-primary text-sm truncate font-medium shadow-xs rounded-lg px-4 py-2 bg-gray-200/80"
                >
                  {expertise}
                </span>
              ))}
            </div>
          </div>
        )}

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
