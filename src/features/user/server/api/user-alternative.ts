import { Error } from "@/types";

interface CompressImageResult {
  success: boolean;
  message?: string;
  data: File | null;
}

// Alternative : retourner directement un Blob depuis l'API
export async function compressImageBlob(
  file: File
): Promise<CompressImageResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/compress-image-blob", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      return {
        success: false,
        message:
          errorResponse.message || "Erreur lors de la compression de l'image",
        data: null,
      };
    }

    // Récupérer le blob directement
    const blob = await res.blob();

    // Convertir le blob en File
    const compressedFile = new File(
      [blob],
      file.name.replace(/\.[^/.]+$/, ".webp"),
      {
        type: "image/webp",
        lastModified: Date.now(),
      }
    );

    return {
      success: true,
      message: "Image compressée avec succès",
      data: compressedFile,
    };
  } catch (e: unknown) {
    const err = e as Error;

    console.log("Erreur lors de la compression de l'image:", err.message);

    return {
      success: false,
      message: "Erreur lors de la compression de l'image",
      data: null,
    };
  }
}
