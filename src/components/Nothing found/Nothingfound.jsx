import "./NothingFound.css";
import NotFoundIcon from "../../assets/not-found_v1.svg";

function NothingFound() {
  return (
    <div className="nothing-found">
      <img
        src={NotFoundIcon}
        alt="Nothing Found"
        className="nothing-found__image"
      />
      <h3 className="nothing-found__title">Nothing found</h3>
      <p className="nothing-found-text">
        Sorry, but nothing matched
        <br />
        your search terms.
      </p>
    </div>
  );
}

export default NothingFound;
