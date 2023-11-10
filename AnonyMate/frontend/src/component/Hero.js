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
                We must understand that <span>sadness</span> is an ocean, and
                sometimes we
                <span>drown</span>, while other days we are forced to swim.” ―
                R.M. Drake
              </h4>
            </div>
            <div class="hero-main-txt hero-txt-2">
              <h1 className="hero-h1 hero-h1-right">To Feel Sad</h1>
            </div>
          </div>
        </div>
        <div class="ctadiv">
          <div className="cta">
            <button className="button-53">join a group - anonymously</button>
            <div className="Anony-info">
            <h2 className="h2t">
               what you will get
              </h2>
              <ul>
                <li>Anonymous chat</li>
                <li>Streaks</li>
                <li>Virtual pets</li>
                <li>Support groups</li>
                <li>Real time chat</li>
                <li>Anonymous registration</li>
              </ul>
            </div>
          </div>
          <div className="pixdivs">
            <img alt="group-gif" className="anonyteam" src={`${process.env.PUBLIC_URL}/grouppix.png`}></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
