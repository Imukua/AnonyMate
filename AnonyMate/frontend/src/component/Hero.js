const Hero = () => {
  return (
    <>
      <div className="main-cntr-lnd">
        <div className="landinf-cntr">
          <div className="hero-par-low">
            <div class="hero-main-txt">
              <h1 className="hero-h1">
                Hey <span className="wave">👋</span> <br></br>
                <span>It's</span> Okay
              </h1>
            </div>
            <div class="hero-main">
              <h4 className="hero-paragraph">
                We’re taught to be ashamed of confusion, anger, fear, and
                sadness, and to me, they’re of equal value to happiness,
                excitement, and inspiration.” — Alanis Morrisette
              </h4>
            </div>
          </div>
          <div className="hero-par">
            <div class="hero-main">
              <h4 className="hero-paragraph">
                Anonymate aims to address the challenge of providing a safe,
                anonymous, and structured platform for individuals to seek and
                offer support while dealing with personal challenges, traumas,
                and addictions. It seeks to foster a sense of community,
                understanding, and healing among users.
              </h4>
            </div>
            <div class="hero-main-txt hero-txt-2">
              <h1 className="hero-h1 hero-h1-right">
                To <span className="feelings">Feel </span> Sad
              </h1>
            </div>
          </div>
        </div>
        <div class="ctadiv">
          <div className="cta">
            <button className="button-53">join a group - anonymously</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
