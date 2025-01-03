export const Twitter = (props: { link: string }) => {
  return (
    <blockquote className="twitter-tweet">
      <a href={props.link.replace("x.com", "twitter.com")}></a>
    </blockquote>
  );
};
