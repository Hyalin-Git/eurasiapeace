"use server";

import { Filters } from "@/types";
import Pagination from "./Pagination";
import { getElementPagination } from "@/server/db/pagination";

export default async function Paginations({
  type = "posts",
  limit = 9,
  filters = null,
  search = "",
  offset = 0,
}: {
  type: string;
  limit: number;
  filters: Filters | null;
  search: string;
  offset: number;
}) {
  const { data: pageInfo, success } = await getElementPagination(
    type,
    limit,
    filters,
    search,
    offset
  );

  if (!success || !pageInfo || pageInfo.total < 9) return;

  return (
    <div className="mt-8">
      <Pagination pageInfo={pageInfo} />
    </div>
  );
}
