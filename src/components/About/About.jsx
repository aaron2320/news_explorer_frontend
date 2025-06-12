import "./About.css";
import profileImage from "../../assets/Self-Picture.jpg";

function About() {
  return (
    <section className="about">
      <div className="about__image-container">
        <img
          src={profileImage}
          alt="Author portrait"
          className="about__image"
        />
      </div>
      <div className="about__text-wrapper">
        <div className="about__info">
          <h3 className="about__title">About the author</h3>
          <p className="about__paragraph">
            My name is Aaron Brown. I am a full stack software engineer
            proficient in JavaScript, React, Express, Node, HTML, CSS. I am
            currently enrolled in the Full Stack Developer program at TripleTen
            bootcamp.
          </p>
          <p className="about__paragraph">
            I am looking forward to learning more about software development.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
