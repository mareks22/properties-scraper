import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <Link to="/rent">
        <button className="header__button">RENT</button>
      </Link>
      <Link to="/sell">
        <button className="header__button">SALE</button>
      </Link>
    </div>
  );
}
