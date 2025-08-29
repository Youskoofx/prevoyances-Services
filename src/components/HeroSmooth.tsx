import React from "react";

type HeroSmoothProps = {
  imageUrl?: string;
};

const HeroSmooth: React.FC<HeroSmoothProps> = ({
  imageUrl = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=85&w=2400&auto=format&fit=crop",
}) => {
  return (
    <section aria-label="Section d'accueil" style={{ background: "#FFFFFF" }}>
      <div
        style={{
          position: "relative",
          minHeight: "88vh",
          overflow: "hidden",
        }}
      >
        {/* Background image */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: "saturate(0.95) contrast(1.05)",
          }}
        />

        {/* Overlay pour lisibilité */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.35))",
          }}
        />

        {/* Contenu */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "96px 24px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              lineHeight: 1.1,
              margin: 0,
              color: "#0F172A",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Indépendants, à vos côtés <br /> dans la durée
          </h1>

          <p
            style={{
              marginTop: 16,
              color: "#4B5563",
              fontSize: 18,
            }}
          >
            Nous comparons et négocions vos assurances partout en France pour
            protéger ce qui compte vraiment.
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            <a
              href="/contact"
              style={{
                background: "#115E59",
                color: "#FFFFFF",
                padding: "12px 20px",
                borderRadius: 9999,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,.08)",
                fontWeight: 600,
              }}
            >
              Demander un devis gratuit
            </a>

            <button
              type="button"
              style={{
                background: "transparent",
                color: "#115E59",
                border: "1px solid #115E59",
                padding: "11px 18px",
                borderRadius: 9999,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={() => {
                console.log("Être rappelé");
              }}
            >
              Être rappelé
            </button>
          </div>

          {/* Stats */}
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "center",
              marginTop: 24,
              color: "#334155",
              flexWrap: "wrap",
            }}
          >
            <span>9200+ clients</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>27 ans d&apos;expertise</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>16 partenaires</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSmooth;
