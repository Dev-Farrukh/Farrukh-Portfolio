export async function getCroppedImageFile(imageSrc: string, _area: unknown) {
  const response = await fetch(imageSrc);
  return new File([await response.blob()], "testimonial.jpg", { type: "image/jpeg" });
}