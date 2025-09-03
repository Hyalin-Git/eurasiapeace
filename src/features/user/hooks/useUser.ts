"use client";
import useSWR from "swr";
import { getUser } from "../server/db/user";

export function useUser(uid: string) {
  const getUserWithUid = getUser.bind(null, uid);
  const { data, isLoading, error, mutate } = useSWR(
    `/user/${uid}`,
    getUserWithUid
  );

  return {
    success: data?.success,
    data: data?.data?.user,
    isLoading,
    error,
    mutate,
  };
}
