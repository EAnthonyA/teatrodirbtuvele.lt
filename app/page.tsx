import Image from "next/image";
import { RegistrationForm } from "@/components/registration-form";
import headerLogo from "../teatro_dirbtuvele_staciakampis_white_transparent.png";
import logoWhite from "../teatro_dirbtuvele_logo_white_transparent.png";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Teatro dirbtuvėlė",
    url: "https://teatrodirbtuvele.lt",
    logo: "https://teatrodirbtuvele.lt/opengraph-image.png",
    description:
      "Kūrybiniai teatro užsiėmimai 5-18 m. vaikams ir jaunimui Vilniuje, Pavilnyje.",
    areaServed: {
      "@type": "City",
      name: "Vilnius",
    },
    location: {
      "@type": "Place",
      name: "Pavilnio bendruomenės namai",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vilnius",
        addressCountry: "LT",
      },
    },
    knowsAbout: ["Teatro ugdymas", "Improvizacija", "Kūrybinės dirbtuvės"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <a className="skip-link" href="#pagrindinis-turinys">
        Pereiti prie turinio
      </a>
      <header className="site-header">
        <a className="wordmark" href="#virsus" aria-label="Teatro dirbtuvėlė – į pradžią">
          <Image alt="" className="header-logo" priority src={headerLogo} />
        </a>
        <a className="header-cta" href="#registracija">
          Registruotis <span aria-hidden="true">↓</span>
        </a>
      </header>

      <main id="pagrindinis-turinys">
        <section className="hero" id="virsus" aria-labelledby="hero-heading">
          <div className="curtain curtain-left" aria-hidden="true" />
          <div className="curtain curtain-right" aria-hidden="true" />
          <div className="hero-copy">
            <p className="eyebrow">Vilnius · Pavilnys</p>
            <h1 id="hero-heading">
              Čia gimsta
              <span> istorijos.</span>
            </h1>
            <p className="hero-lead">
              Vieta vaikų vaizduotei, judesiui ir drąsai būti scenoje bei už jos ribų.
            </p>
            <a className="button button-primary" href="#registracija">
              Noriu užsiregistruoti <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="stage-picture" aria-hidden="true">
            <div className="star star-one">✦</div>
            <div className="star star-two">✧</div>
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="stage-floor" />
            <Image alt="" className="hero-logo" priority src={logoWhite} />
          </div>
          <div className="hero-footnote">
            <span className="scribble" aria-hidden="true">↝</span>
            <p>Pirmas žingsnis į sceną prasideda nuo smalsumo.</p>
          </div>
        </section>

        <section className="intro section-shell" aria-labelledby="about-heading">
          <p className="section-number" aria-hidden="true">01</p>
          <div>
            <p className="eyebrow">Teatras kaip žaidimas</p>
            <h2 id="about-heading">Balsas, kūnas, vaizduotė ir bendras kūrinys.</h2>
          </div>
          <p className="intro-copy">
            Dirbtuvėlėse kuriame, improvizuojame, klausomės vieni kitų ir atrandame savąjį balsą. Kiekvienas gali atsinešti save tokį, koks yra.
          </p>
        </section>

        <section className="groups" aria-labelledby="groups-heading">
          <div className="section-shell groups-heading">
            <p className="eyebrow">Kam skirta?</p>
            <h2 id="groups-heading">Dvi grupės, viena scena.</h2>
          </div>
          <div className="group-list section-shell">
            <article className="group group-young">
              <div className="group-age" aria-hidden="true">5—11</div>
              <div>
                <p className="group-kicker">Metų vaikams</p>
                <h3>Žaidžiame istorijas</h3>
                <p>Judame, kuriame personažus ir leidžiame vaizduotei vesti pirmyn.</p>
              </div>
              <span className="group-mark" aria-hidden="true">●</span>
            </article>
            <article className="group group-teen">
              <div className="group-age" aria-hidden="true">12—18</div>
              <div>
                <p className="group-kicker">Metų jaunimui</p>
                <h3>Kuriame savo balsą</h3>
                <p>Tyrinėjame idėjas, santykius ir sceną kaip vietą pasakyti tai, kas svarbu.</p>
              </div>
              <span className="group-mark" aria-hidden="true">✦</span>
            </article>
          </div>
        </section>

        <section className="place section-shell" aria-labelledby="place-heading">
          <p className="section-number" aria-hidden="true">02</p>
          <div className="place-copy">
            <p className="eyebrow">Susitinkame</p>
            <h2 id="place-heading">Pavilnio bendruomenės namuose</h2>
            <p>Jauki vieta susiburti, repetuoti, atrasti ir auginti mažas bei dideles scenines idėjas.</p>
          </div>
          <div className="address-stamp" aria-label="Vilnius, Pavilnys">
            <span aria-hidden="true">⌖</span>
            <span>Vilnius<br />Pavilnys</span>
          </div>
        </section>

        <section className="registration" id="registracija" aria-labelledby="registration-heading">
          <div className="registration-inner section-shell">
            <div className="registration-intro">
              <p className="eyebrow">Prisijunkite</p>
              <h2 id="registration-heading">Palikite žinutę – susisieksime.</h2>
              <p>
                Užpildykite formą, o mes atsakysime į jūsų klausimus apie užsiėmimus ir grupes.
              </p>
              <p className="note">Formos pateikimas patvirtina, kad gavome jūsų užklausą. Vieta grupėje dar nėra rezervuota.</p>
            </div>
            <RegistrationForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Teatro dirbtuvėlė</span>
        <span aria-hidden="true">✦</span>
        <span>Vilnius</span>
      </footer>
    </>
  );
}
