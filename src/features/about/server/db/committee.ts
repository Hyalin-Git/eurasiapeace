"use server";

import { Error } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";
import { Members } from "../../types";

export async function getCommitteesMembers() {
  try {
    // Fetch the first 100 members (DB will never reach this number)
    const query = `
      query {
        committeesMembers (first: 100) {
            nodes {
                committeesMembersFields {
                    committeeMember
                    picture {
                      node {
                        sourceUrl
                        altText
                      }
                    }
                    title
                    fullName
                    expertises {
                        expertise
                    }
                    bio
                }
            }
        }
      }
    `;

    const res = await fetchGraphQL(query);

    if (!res.success) {
      return {
        success: false,
        status: res.status || 500,
        message: res.message || "An unknown error occurred",
      };
    }

    if (res?.data?.committeesMembers?.nodes.length === 0) {
      return {
        success: true,
        status: 404,
        message: "No committee members found",
        data: [],
      };
    }

    const clearData = res?.data?.committeesMembers?.nodes.map(
      (m: Members) => m?.committeesMembersFields
    );

    return {
      success: true,
      status: 200,
      message: "Committee members fetched successfully",
      data: clearData || [],
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error fetching committee members:",
      err || "An unknown error occurred"
    );

    return {
      success: false,
      status: err.status || 500,
      message: err.message || "An unknown error occurred",
    };
  }
}
