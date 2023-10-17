interface Props {
  handleMenu: () => void;
}

const Hamburger: React.FC<Props> = ({ handleMenu }) => {
  return (
    <div
      className="absolute left-0 top-16 z-10 flex h-128 w-72 flex-col border-4 bg-slate-50 md:hidden"
      onClick={handleMenu} // put this on an X in the corner to close
    >
      <div className="flex justify-between">
        <div className="p-2">
          <ul>
            <li>Item1</li>
            <li>Item2</li>
            <li>Item3</li>
          </ul>
        </div>
        <div onClick={handleMenu} className="p-2 text-xl hover:cursor-pointer">
          X
        </div>
      </div>
    </div>
  );
};

export default Hamburger;
