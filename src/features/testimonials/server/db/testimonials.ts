"use server";

import { Error } from "@/types";
import { fetchGraphQL } from "@/utils/authFetch";

export async function getTestimonials() {
  try {
    const query = `
  query {
  testimonials {
    nodes {
      testimonials {
        stars
        avis
        fullName
        profilPicture {
          node {
            sourceUrl
            altText
          }
        }
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
        message:
          res.message ||
          "An unknown error occurred while fetching testimonials",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Testimonials fetched successfully",
      data: res?.data?.testimonials?.nodes[0]?.testimonials || [],
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log(
      "Error fetching testimonials:",
      err || "An unknown error occurred"
    );

    return {
      success: false,
      status: err.status || 500,
      message:
        err.message || "An unknown error occurred while fetching testimonials",
    };
  }
}
