export function calculateNewDimensions({
  width,
  height,
  newSize
}: {
  width: number
  height: number
  newSize: number
}): { newWidth: number; newHeight: number } {
  const isWidthLarger = width > height
  const scaleFactor = isWidthLarger ? newSize / width : newSize / height
  const newWidth = isWidthLarger ? newSize : Math.round(width * scaleFactor)
  const newHeight = !isWidthLarger ? newSize : Math.round(height * scaleFactor)

  return { newWidth, newHeight }
}
