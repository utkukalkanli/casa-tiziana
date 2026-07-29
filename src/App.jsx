import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './scene/Scene.jsx'
import { content, sections } from './content.js'
import { useInView } from './lib/useInView.js'

const { headline, price, contact, cta, place } = content
const { about, location, seasons, faq, closing } = sections

export default function App() {
  const heroRef = useRef(null)
  // The canvas is fixed behind the whole document; once the hero scrolls away there
  // is nothing to draw. See useInView.
  const heroInView = useInView(heroRef)

  return (
    <>
      <div className="canvas-host" aria-hidden="true">
        {/* shadows="percentage" → PCFShadowMap. The default "soft" maps to
            PCFSoftShadowMap, which three has deprecated.
            Exposure is lifted because R3F tone-maps with ACES Filmic by default,
            which reads noticeably flat on a bright daylight scene. */}
        <Canvas
          shadows="percentage"
          dpr={[1, 2]}
          frameloop={heroInView ? 'always' : 'never'}
          gl={{ toneMappingExposure: 1.35 }}
          camera={{ position: [16, 9, 18], fov: 38 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <header className="hero" ref={heroRef}>
        <div className="hero-top">
          <a className="eyebrow" href={contact.maps} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="14" height="14">
              <path
                fill="currentColor"
                d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
              />
            </svg>
            {content.location}
            <span className="eyebrow-cta">
              <span>{content.locationCta}</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </a>
          <h1 className="headline">
            <span className="thin">{headline.lead} </span>
            {headline.main}
            <br />
            <span className="thin">{headline.connector} </span>
            <br />
            {headline.place}
          </h1>
          <p className="intro">{content.intro}</p>
          <span className="pill">
            Rents from {price.currency}
            {price.from}/{price.unit}
            <span className="note">{price.note}</span>
          </span>

          <ul className="activities">
            {content.activities.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="hero-bottom">
          <ul className="features">
            {content.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="contact">
            <a className="btn-deals" href={cta.url} target="_blank" rel="noreferrer">
              {cta.label}
            </a>
            <a className="btn-whatsapp" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              Book on WhatsApp
            </a>
            <a className="email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </div>

        {/* Without a cue the page reads as a single fixed screen and nobody finds the
            copy below it — which is the copy search engines and undecided guests both
            need. Its bob is a CSS animation, so the global reduced-motion rule in
            index.css already stills it. */}
        <a className="scroll-cue" href={`#${about.id}`}>
          <span>{sections.scrollCue}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true" width="16" height="16" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </a>
      </header>

      <main className="page">
        <section className="band" id={about.id}>
          <h2>{about.title}</h2>
          <p className="lede">{about.lede}</p>
          {about.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </section>

        <section className="band" id={location.id}>
          <h2>{location.title}</h2>
          <p className="lede">{location.lede}</p>
          <dl className="facts">
            {location.facts.map((f) => (
              <div className="fact" key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="band" id={seasons.id}>
          <h2>{seasons.title}</h2>
          <ul className="seasons">
            {seasons.items.map((s) => (
              <li key={s.label}>
                <h3>{s.label}</h3>
                <p>{s.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="band" id={faq.id}>
          <h2>{faq.title}</h2>
          <div className="faq">
            {faq.items.map((item) => (
              <div key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="band closing">
          <h2>{closing.title}</h2>
          <p className="lede">{closing.body}</p>
          <div className="closing-actions">
            <a className="btn-whatsapp" href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              Book on WhatsApp
            </a>
            <a className="email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
        </section>

        {/* The one place on the page that spells the postal address out. It is what a
            crawler reads as the business's location, and it matches the structured
            data in index.html exactly — a mismatch between the two is the usual
            reason a local listing fails to associate with its page. */}
        <footer className="colophon">
          <p>
            <strong>{content.name}</strong> · {place.locality}, {place.comune} (
            {place.provinceCode}) · {place.postalCode} {place.valley}, {place.country}
          </p>
          <p>
            <a href={contact.maps} target="_blank" rel="noreferrer">
              {content.locationCta}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp {contact.whatsapp}
            </a>
            <span aria-hidden="true"> · </span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
        </footer>
      </main>
    </>
  )
}
