import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
  return (
    <div className="header">
      <Link to="/">
        <button className="header__button">RENT</button>
      </Link>
      <Link to="/sell">
        <button className="header__button">SELL</button>
      </Link>
    </div>
  );
}
