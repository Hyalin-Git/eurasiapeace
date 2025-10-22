import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compresser l'image avec Sharp (qualité maximale)
    const compressedBuffer = await sharp(buffer)
      .resize(400, 400, {
        fit: "cover",
        withoutEnlargement: true, // Évite l'agrandissement si l'image est plus petite
      })
      .webp({
        quality: 95, // Qualité très élevée
        lossless: false, // Compression avec perte mais haute qualité
        effort: 6, // Effort maximum pour la compression (0-6, 6 = meilleur)
      })
      .toBuffer();

    // Créer la réponse avec l'image compressée
    return new NextResponse(new Uint8Array(compressedBuffer), {
      headers: {
        "Content-Type": "image/webp",
        "Content-Length": compressedBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Erreur lors de la compression de l'image:", error);
    return NextResponse.json(
      { error: "Erreur lors de la compression de l'image" },
      { status: 500 }
    );
  }
}
