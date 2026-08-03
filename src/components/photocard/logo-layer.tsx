interface LogoLayerProps {
  url: string | null;
}

export const LogoLayer = ({ url }: LogoLayerProps) => {
  if (!url) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={url}
      alt="Logo"
      className="pointer-events-none h-full w-full object-contain object-left-top drop-shadow-sm"
      draggable={false}
    />
  );
};
