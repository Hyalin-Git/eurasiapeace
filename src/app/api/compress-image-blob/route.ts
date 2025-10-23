import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Aucun fichier fourni",
          data: null,
        },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compresser l'image avec Sharp
    const compressedBuffer = await sharp(buffer)
      .resize(120, 120, {
        fit: "cover",
      })
      .webp({
        quality: 70,
        lossless: false,
      })
      .toBuffer();

    // Retourner directement le buffer comme réponse blob
    return new NextResponse(new Uint8Array(compressedBuffer), {
      status: 200,
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": compressedBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la compression de l'image:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la compression de l'image",
        data: null,
      },
      { status: 500 }
    );
  }
}
