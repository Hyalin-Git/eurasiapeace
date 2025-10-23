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

    // Vérifier la taille du fichier (limite à 2MB après pré-compression)
    // if (file.size > 2 * 1024 * 1024) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message:
    //         "Le fichier est trop volumineux après pré-compression (maximum 2MB)",
    //       data: null,
    //     },
    //     { status: 413 }
    //   );
    // }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compresser l'image avec Sharp (très aggressif pour la production)
    const compressedBuffer = await sharp(buffer)
      .resize(120, 120, {
        fit: "cover",
      })
      .webp({
        quality: 70, // Qualité réduite pour minimiser la taille
        lossless: false, // Compression avec perte
      })
      .toBuffer();

    // Convertir le buffer en base64 pour la transmission
    const base64Image = compressedBuffer.toString("base64");

    // Créer la réponse avec l'image en base64
    return NextResponse.json(
      {
        success: true,
        message: "Image compressée avec succès",
        data: {
          buffer: base64Image,
          mimeType: "image/webp",
          originalName: file.name,
          size: compressedBuffer.length,
        },
      },
      { status: 200 }
    );
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
