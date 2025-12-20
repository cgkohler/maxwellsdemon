export default function Home() {
  return (
    <main className="main-container">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <a href="#" className="nav-logo">Maxwell&apos;s Demon</a>
          <div className="nav-links">
            <a href="#philosophy">Philosophy</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Other tools show you problems.<br />
          We prevent them from existing.
        </h1>
        <p className="hero-subtitle">
          Trace incidents to root causes. Fix the system that caused it.
        </p>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="philosophy">
        <h2 className="section-title">Our philosophy</h2>
        <p className="philosophy-intro">
          We have founded, operated and invested in some of the most iconic tech companies of our era. 
          While we&apos;re proud of our past, we&apos;re just getting started.
        </p>
        
        <div className="philosophy-grid">
          <div className="philosophy-item">
            <h3 className="philosophy-title">Conviction-led</h3>
            <p className="philosophy-description">
              We invest first.<br />
              With unwavering conviction.
            </p>
          </div>
          
          <div className="philosophy-item">
            <h3 className="philosophy-title">Relentless</h3>
            <p className="philosophy-description">
              We are relentless.<br />
              Just like our founders.
            </p>
          </div>
          
          <div className="philosophy-item">
            <h3 className="philosophy-title">Founder-centric</h3>
            <p className="philosophy-description">
              We work together.<br />
              To shape a better future.
            </p>
          </div>
        </div>
        
        <a href="#" className="meet-team-link">Meet the team</a>
      </section>
    </main>
  )
}

