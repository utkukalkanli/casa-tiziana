import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Scene from './scene/Scene.jsx'
import { content } from './content.js'

const { headline, price, contact, cta } = content

export default function App() {
  return (
    <>
      <div className="canvas-host">
        {/* shadows="percentage" → PCFShadowMap. The default "soft" maps to
            PCFSoftShadowMap, which three has deprecated. */}
        {/* shadows="percentage" → PCFShadowMap. The default "soft" maps to
            PCFSoftShadowMap, which three has deprecated.
            Exposure is lifted because R3F tone-maps with ACES Filmic by default,
            which reads noticeably flat on a bright daylight scene. */}
        <Canvas
          shadows="percentage"
          dpr={[1, 2]}
          gl={{ toneMappingExposure: 1.35 }}
          camera={{ position: [16, 9, 18], fov: 38 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="overlay">
        <header>
          <a className="eyebrow" href={contact.maps} target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="14" height="14">
              <path
                fill="currentColor"
                d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z"
              />
            </svg>
            {content.location}
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
        </header>

        <div className="footer">
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
      </div>
    </>
  )
}
