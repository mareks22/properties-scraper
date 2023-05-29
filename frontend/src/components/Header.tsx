import { NavLink } from "react-router-dom";
import "./Header.scss";

type Props = {
  isLoading: boolean;
  resetPage: () => void;
};

export default function Header(props: Props) {
  const handleClick = () => {
    props.resetPage();
  };

  return (
    <div className="header">
      <NavLink
        onClick={handleClick}
        className="header__nav"
        to="/rent"
      >
        TO RENT
      </NavLink>
      <NavLink
        onClick={handleClick}
        className="header__nav"
        to="/sale"
      >
        FOR SALE
      </NavLink>
    </div>
  );
}
