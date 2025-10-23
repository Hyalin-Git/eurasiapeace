import { Error } from "@/types";

interface CompressImageResult {
  success: boolean;
  message?: string;
  data: File | null;
}

interface CompressedImageData {
  buffer: string;
  mimeType: string;
  originalName: string;
  size: number;
}

export async function compressImage(file: File): Promise<CompressImageResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/compress-image", {
      method: "POST",
      body: formData,
    });

    const response = await res.json();

    if (!response.success) {
      return {
        success: false,
        message: response.message || "Erreur lors de la compression de l'image",
        data: null,
      };
    }

    // Convertir les données base64 en File
    const imageData = response.data as CompressedImageData;
    const binaryString = atob(imageData.buffer);
    const bytes = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const compressedFile = new File(
      [bytes],
      imageData.originalName.replace(/\.[^/.]+$/, ".webp"), // Change l'extension en .webp
      {
        type: imageData.mimeType,
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
