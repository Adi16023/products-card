export default function Hero() {
  return (
    <section
      id="featured"
      style={{
        width: 'min(1200px, calc(100% - 2rem))',
        margin: '1.5rem auto 0',
        padding: 'clamp(1.25rem, 4vw, 3rem)',
        borderRadius: '24px',
        background:
          'radial-gradient(circle at top right, rgba(79, 70, 229, 0.18), transparent 35%), linear-gradient(135deg, #111827 0%, #1f2937 55%, #312e81 100%)',
        color: '#fff',
        display: 'grid',
        gap: '2rem',
      }}
    >
      <div>
        <p
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.72)',
            marginBottom: '0.75rem',
          }}
        >
          New season collection
        </p>
        <h1
          style={{
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            lineHeight: 1.05,
            fontWeight: 400,
            maxWidth: '10ch',
            marginBottom: '1rem',
          }}
        >
          Discover tech you'll love
        </h1>
        <p
          style={{
            maxWidth: '42rem',
            color: 'rgba(255, 255, 255, 0.82)',
            fontSize: '1.05rem',
          }}
        >
          Curated electronics, wearables, and audio gear with honest ratings and transparent
          pricing.
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: '1.5rem',
          }}
        >
          <a
            href="#shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              borderRadius: '999px',
              padding: '0.7rem 1.15rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'transform 0.15s ease, background 0.2s ease',
              background: '#4f46e5',
              color: '#fff',
            }}
          >
            Shop now
          </a>
          <a
            href="#deals"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              borderRadius: '999px',
              padding: '0.7rem 1.15rem',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'transform 0.15s ease, background 0.2s ease',
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#fff',
            }}
          >
            View deals
          </a>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem',
        }}
      >
        <div
          style={{
            padding: '1rem 1.1rem',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <strong
            style={{
              display: 'block',
              fontSize: '1.4rem',
              marginBottom: '0.15rem',
            }}
          >
            500+
          </strong>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.72)',
              fontSize: '0.85rem',
            }}
          >
            Happy customers
          </span>
        </div>
        <div
          style={{
            padding: '1rem 1.1rem',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <strong
            style={{
              display: 'block',
              fontSize: '1.4rem',
              marginBottom: '0.15rem',
            }}
          >
            4.8
          </strong>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.72)',
              fontSize: '0.85rem',
            }}
          >
            Average rating
          </span>
        </div>
        <div
          style={{
            padding: '1rem 1.1rem',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <strong
            style={{
              display: 'block',
              fontSize: '1.4rem',
              marginBottom: '0.15rem',
            }}
          >
            24h
          </strong>
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.72)',
              fontSize: '0.85rem',
            }}
          >
            Fast dispatch
          </span>
        </div>
      </div>
    </section>
  );
}
