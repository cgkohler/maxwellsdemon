export default function Home() {
  return (
    <main className="landing-page">
      <div className="glow-panel primary"></div>
      <div className="glow-panel accent"></div>
      <div className="grain"></div>

      <header className="page-header">
        <h1 className="company-name">Maxwell&apos;s Demon</h1>
      </header>

      <div className="content-wrapper">
        <div className="hero-content">
          <p className="eyebrow">In-workflow risk intelligence</p>
          <p className="hero-text">History only repeats itself if you let it.</p>
          <p className="sub-text">
            Maxwell&apos;s Demon turns past regressions into guardrails, and helps Engineers identify and resolve risk in-workflow before the moment of impact so they never make the same mistake twice.
          </p>
        </div>
      </div>
    </main>
  )
}

