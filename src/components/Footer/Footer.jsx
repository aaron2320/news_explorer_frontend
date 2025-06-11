import "./Footer.css";
import githubIcon from "../../assets/github.svg";
import facebookIcon from "../../assets/FaceBookIcon.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© Supersite, Powered by News API</p>
      <div className="footer__social">
        <nav className="footer__nav">
          <a href="/" className="footer__link">
            Home
          </a>

          <a
            href="https://tripleten.com/"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            TriplenTen
          </a>
        </nav>

        <div className="footer__media">
          <a
            href="https://github.com/aaron2320/news_explorer_frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={githubIcon}
              alt="GitHub Logo"
              className="footer__github-icon"
            />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={facebookIcon}
              alt="Facebook Logo"
              className="footer__fb-icon"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
