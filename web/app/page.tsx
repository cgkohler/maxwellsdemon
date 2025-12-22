'use client'

import { useState, useRef } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false)
  const [waitlistSuccess, setWaitlistSuccess] = useState(false)
  const [waitlistError, setWaitlistError] = useState('')
  
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '' })
  const [isContactSubmitting, setIsContactSubmitting] = useState(false)
  const [contactSuccess, setContactSuccess] = useState(false)
  const [contactError, setContactError] = useState('')

  const belowFoldRef = useRef<HTMLDivElement>(null)

  const scrollToBelowFold = () => {
    belowFoldRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsWaitlistSubmitting(true)
    setWaitlistError('')
    setWaitlistSuccess(false)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit email')
      }

      setWaitlistSuccess(true)
      setEmail('')
    } catch (error) {
      setWaitlistError('Something went wrong. Please try again.')
    } finally {
      setIsWaitlistSubmitting(false)
    }
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactSubmitting(true)
    setContactError('')
    setContactSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      })

      if (!response.ok) {
        throw new Error('Failed to submit contact form')
      }

      setContactSuccess(true)
      setContactForm({ name: '', email: '', phone: '' })
      setTimeout(() => {
        setIsContactModalOpen(false)
        setContactSuccess(false)
      }, 2000)
    } catch (error) {
      setContactError('Something went wrong. Please try again.')
    } finally {
      setIsContactSubmitting(false)
    }
  }

  return (
    <main className="main-container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          We do the impossible: decrease entropy in your engineering systems.
        </h1>
        <p className="hero-subtitle">
          Sustain high velocity throughput without scaling headcount and complexity.
        </p>
        <button onClick={scrollToBelowFold} className="hero-cta">
          Introducing Maxwell&apos;s Demon
        </button>
      </section>

      {/* Below the Fold Section */}
      <section ref={belowFoldRef} className="below-fold">
        <div className="below-fold-content">
          <p className="copy-paragraph">
            <strong>Your support queue knows why your systems fail.</strong>
          </p>
          <p className="copy-paragraph">
            Every ticket contains forensic evidence - not just what broke, but which team owns it, where handoffs failed, and why the same issues keep recurring. Your support team sees these patterns. They just can&apos;t fix them fast enough.
          </p>

          <p className="copy-paragraph">
            <strong>Maxwell&apos;s Demon turns tickets into prevention.</strong>
          </p>
          <p className="copy-paragraph">
            We trace every customer complaint back through your system to its origin. That mysterious 500 error hitting production weekly? We&apos;ll show you it&apos;s three teams with conflicting assumptions about data ownership. Those duplicate incidents across customers? We&apos;ll map them to the undefined handoff everyone avoids discussing.
          </p>

          <p className="copy-paragraph">
            <strong>The math is simple:</strong>
          </p>
          <ul className="copy-list">
            <li>100 tickets/week from undefined ownership</li>
            <li>5 engineers fixing symptoms instead of causes</li>
            <li>3 teams building parallel solutions to the same problem</li>
            <li>1 support team doing unofficial product management</li>
          </ul>

          <p className="copy-paragraph">
            You&apos;re not lacking monitoring. You&apos;re lacking clarity on who owns what.
          </p>

          <p className="copy-paragraph">
            <strong>Pattern recognition at machine speed.</strong>
          </p>
          <p className="copy-paragraph">
            Our engine ingests your tickets, maps them to code changes, identifies ownership gaps, and surfaces the organizational debt creating repeated failures. What takes your best engineers weeks to diagnose, we surface in hours.
          </p>

          <p className="copy-paragraph">
            This isn&apos;t another dashboard. It&apos;s archaeology for your operations.
          </p>

          <p className="copy-paragraph">
            <strong>Built by operators who&apos;ve been there.</strong>
          </p>
          <p className="copy-paragraph">
            Twelve years building support and ops at Modern Treasury, Affirm, and AutoFi taught us that every &quot;technical&quot; incident has an organizational root cause. We watched teams implement inference logic that recreated the exact problems reconciliation logic was meant to solve. Different code, same ownership vacuum.
          </p>

          <p className="copy-paragraph">
            <strong>One metric changes everything:</strong>
          </p>
          <p className="copy-paragraph">
            What percentage of your incidents would disappear if every system had a clear owner?
          </p>
        </div>

        {/* CTAs */}
        <div className="cta-container">
          <div className="cta-item">
            <form onSubmit={handleWaitlistSubmit} className="waitlist-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="cta-input"
                disabled={isWaitlistSubmitting || waitlistSuccess}
              />
              <button
                type="submit"
                disabled={isWaitlistSubmitting || waitlistSuccess}
                className="cta-button"
              >
                {isWaitlistSubmitting ? 'Submitting...' : waitlistSuccess ? 'Joined!' : 'Join Waitlist'}
              </button>
              {waitlistError && <p className="error-message">{waitlistError}</p>}
            </form>
          </div>

          <div className="cta-item">
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="cta-button"
            >
              Skip Waitlist
            </button>
          </div>
        </div>

        {/* Contact Modal */}
        {isContactModalOpen && (
          <div className="modal-overlay" onClick={() => setIsContactModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setIsContactModalOpen(false)}
                aria-label="Close modal"
              >
                ×
              </button>
              <h2 className="modal-title">Skip Waitlist</h2>
              <form onSubmit={handleContactSubmit} className="contact-form">
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Name"
                  required
                  className="form-input"
                  disabled={isContactSubmitting}
                />
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="Email"
                  required
                  className="form-input"
                  disabled={isContactSubmitting}
                />
                <input
                  type="tel"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="Phone number"
                  required
                  className="form-input"
                  disabled={isContactSubmitting}
                />
                <button
                  type="submit"
                  disabled={isContactSubmitting}
                  className="form-submit-button"
                >
                  {isContactSubmitting ? 'Submitting...' : contactSuccess ? 'Submitted!' : 'Submit'}
                </button>
                {contactError && <p className="error-message">{contactError}</p>}
              </form>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
