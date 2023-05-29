import { Link } from "react-router-dom";
import "./Header.scss";

type Props = {
  isLoading: boolean
}

export default function Header(props: Props) {
  return (
    <div className="header">
      <Link to="/rent">
        <button disabled={props.isLoading} className="header__button">RENT</button>
      </Link>
      <Link to="/sell">
        <button disabled={props.isLoading} className="header__button">SALE</button>
      </Link>
    </div>
  );
}
