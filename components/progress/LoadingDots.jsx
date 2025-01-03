export default function LoadingDots({
  width = 'w-6',
  height = 'h-6',
  bgColor = '#FC0068',
}) {
  return (
    <div className="flex space-x-2 justify-center items-center dark:invert">
      <span className="sr-only">Loading...</span>
      <div
        className={`${width} ${height} bg-[${bgColor}] rounded-full animate-bounce [animation-delay:-0.3s]`}
      ></div>
      <div
        className={`${width} ${height} bg-[${bgColor}] rounded-full animate-bounce [animation-delay:-0.15s]`}
      ></div>
      <div
        className={`${width} ${height} bg-[${bgColor}] rounded-full animate-bounce`}
      ></div>
    </div>
  );
}
