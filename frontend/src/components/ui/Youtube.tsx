export const Youtube = (props: { link: string }) => {
  const ytlink = props.link;
  const params = ytlink.split("=")[1];
  const id = params.split("&")[0];
  return (
    <>
      <iframe
        className="rounded-md w-full h-[175px]"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
};
