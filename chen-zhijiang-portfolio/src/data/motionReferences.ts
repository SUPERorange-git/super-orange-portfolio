export const motionReferences = Array.from({ length: 21 }, (_, index) => ({
  src:
    index === 20
      ? ""
      : `${import.meta.env.BASE_URL}media/reference/motion-${String(index + 1).padStart(2, "0")}.mp4`,
  label:
    index === 20
      ? "Reference unavailable · 404"
      : `Motion reference ${String(index + 1).padStart(2, "0")}`,
}));
