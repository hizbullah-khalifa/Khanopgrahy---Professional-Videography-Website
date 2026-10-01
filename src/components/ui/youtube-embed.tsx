type YouTubeEmbedProps = {
  id: string;
  title: string;
  short?: boolean;
};

export function YouTubeEmbed({ id, title, short = false }: YouTubeEmbedProps) {
  return (
    <div
      className={`${
        short ? "mx-auto aspect-[9/16] max-w-sm" : "aspect-video"
      } w-full overflow-hidden rounded-2xl bg-black`}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="size-full"
      />
    </div>
  );
}