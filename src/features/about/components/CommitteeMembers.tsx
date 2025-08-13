"use server";

import { getCommitteesMembers } from "../server/db/committee";
import { Member } from "../types";
import CommiteeMember from "./CommitteeMember";
import NoCommitteeMembersFound from "./NoCommitteeMembersFound";

export default async function CommitteMembers({
  committeeType,
}: {
  committeeType: "Comité d'édition" | "Conseil scientifique";
}) {
  const { data, success } = await getCommitteesMembers();

  if (!success || data?.length <= 0) {
    return <NoCommitteeMembersFound />;
  }

  const members = data.filter(
    (member: Member) => member?.committeeMember === committeeType
  );

  if (members.length <= 0) {
    return <NoCommitteeMembersFound />;
  }

  return (
    <div className="flex flex-col gap-8">
      {members.map((member: Member, idx: number) => (
        <CommiteeMember key={idx} member={member} />
      ))}
    </div>
  );
}
