"use server";

import Image from "next/image";
import { Member } from "../types";

export default async function CommiteeMember({ member }: { member: Member }) {
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col relative w-1/4 h-64">
        <Image
          src={member.picture}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.title}</p>
        </div>
        <p className="text-sm">{member.expertise}</p>
        <p className="text-sm text-gray-700">{member.bio}</p>
      </div>
    </div>
  );
}
