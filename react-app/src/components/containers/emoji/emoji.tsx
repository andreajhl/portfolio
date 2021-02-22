type EmojiProps = {
  label?: string;
  symbol: string;
};

const Emoji = ({ label = "", symbol }: EmojiProps): JSX.Element => (
  <span className="emoji" role="img" aria-label={label} aria-hidden={!label}>
    {symbol}
  </span>
);

export default Emoji;
