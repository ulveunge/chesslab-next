type Props = {
  title: string;
  onClick?: () => void;
};

const TileButton = ({ title, onClick }: Props) => (
  <button
    className='border-foreground size-44 cursor-pointer rounded-2xl border'
    onClick={onClick}
  >
    {title}
  </button>
);

export default TileButton;
