export async function compressImage(file: File): Promise<File> {
  const formData = new FormData();
  formData.append("file", file);

  const compressResponse = await fetch("/api/compress-image", {
    method: "POST",
    body: formData,
  });

  if (!compressResponse.ok) {
    throw new Error("Erreur lors de la compression de l'image");
  }

  // Récupérer l'image compressée
  const compressedBlob = await compressResponse.blob();
  const fileName = file.name.replace(/\.[^/.]+$/, ".webp");

  return new File([compressedBlob], fileName, {
    type: "image/webp",
  });
}
