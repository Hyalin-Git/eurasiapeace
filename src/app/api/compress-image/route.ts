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

    // Vérifier la taille du fichier (limite à 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Le fichier est trop volumineux (maximum 10MB)" },
        { status: 413 }
      );
    }

    // Convertir le fichier en buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compresser l'image avec Sharp (optimisé pour la production)
    const compressedBuffer = await sharp(buffer)
      .resize(300, 300, {
        fit: "cover",
        withoutEnlargement: true, // Évite l'agrandissement si l'image est plus petite
      })
      .webp({
        quality: 85, // Qualité élevée mais optimisée pour la taille
        lossless: false, // Compression avec perte
        effort: 6, // Effort maximum pour la compression
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
