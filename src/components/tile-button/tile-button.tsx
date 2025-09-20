type Props = {
  title: string;
  onClick?: () => void;
};

const TileButton = ({ title, onClick }: Props) => (
  <button
    className='size-44 cursor-pointer rounded-2xl border border-black'
    onClick={onClick}
  >
    {title}
  </button>
);

export default TileButton;
