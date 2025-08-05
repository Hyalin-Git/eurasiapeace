import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Error } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Token non valide",
        },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");

    return NextResponse.json(
      {
        success: true,
        message: "Token valide",
        data: decoded,
      },
      { status: 200 }
    );
  } catch (e: unknown) {
    const err = e as Error;
    console.log(
      err?.message || "Une erreur est survenue lors de la vérification du token"
    );

    if (err?.message === "jwt expired") {
      return NextResponse.json(
        {
          success: false,
          message: "Token expiré",
        },
        { status: 401 }
      );
    }

    if (err?.message === "jwt malformed") {
      return NextResponse.json(
        {
          success: false,
          message: "Token invalide",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur est survenue lors de la vérification du token",
        data: null,
      },
      {
        status: 500,
      }
    );
  }
}
