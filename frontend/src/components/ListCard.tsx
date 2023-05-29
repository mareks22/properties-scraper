import { Listing } from "../model";
import "./ListCard.scss";

type Props = {
  listing: Listing;
};

export default function ListCard(props: Props) {
  return (
    <div className="card">
      <a className="card-img-url" href={props.listing.url}>
        <img className="card-img" src={props.listing.img} alt="home-image" />
      </a>
      <div className="card__info">
        <a className="card__info-url" href={props.listing.url}>
          <h2 className="card__info-title">{props.listing.title}</h2>
        </a>

        <p className="card__info-location">{props.listing.location}</p>
        <p className="card__info-price">{props.listing.price}</p>
      </div>
    </div>
  );
}
