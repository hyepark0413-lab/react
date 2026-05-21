const { useEffect } = React;

/* ================= ROOT ================= */
function Boe() {

  /* ================= SCROLL HEADER ================= */
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const header = document.querySelector(".scroll_header");
    if (!hero || !header) return;

    const onScroll = () => {
      const bottom = hero.offsetTop + hero.offsetHeight;
      header.classList.toggle("show", window.scrollY > bottom - 80);
    };

    header.style.display = "flex";
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= HERO WHEEL SCROLL ================= */
  useEffect(() => {
    const hero = document.querySelector(".hero");
    const next = document.querySelector(".philosophy");
    if (!hero || !next) return;

    let lock = false;

    const onWheel = (e) => {
      const inHero = window.scrollY < hero.offsetHeight - 80;

      if (inHero && e.deltaY > 0 && !lock) {
        e.preventDefault();
        lock = true;

        next.scrollIntoView({ behavior: "smooth" });

        setTimeout(() => (lock = false), 1200);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  /* ================= SEARCH TOGGLE ================= */
  useEffect(() => {
    const icons = document.querySelectorAll('img[alt="검색"]');

    const handlers = [];

    icons.forEach((icon) => {
      const click = (e) => {
        e.preventDefault();

        const header = icon.closest("header");
        const input = header?.querySelector(".search_input");
        if (!input) return;

        input.classList.toggle("open");
        if (input.classList.contains("open")) input.focus();
      };

      icon.parentElement?.addEventListener("click", click);
      handlers.push([icon, click]);
    });

    return () => {
      handlers.forEach(([icon, click]) => {
        icon.parentElement?.removeEventListener("click", click);
      });
    };
  }, []);

  /* ================= PHILOSOPHY REVEAL ================= */
  useEffect(() => {
    const section = document.querySelector(".philosophy");
    if (!section) return;

    const items = section.querySelectorAll(
      ".Ptxt_main h1, .Pdivider, .Ptxt_main p, .Ptxt_sub"
    );

    items.forEach((el, i) => {
      el.classList.add("ph_item");
      el.style.transitionDelay = i * 0.12 + "s";
    });

    const onScroll = () => {
      const r = section.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.75) {
        items.forEach((el) => el.classList.add("ph_show"));
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= CURATED AUTO SCROLL ================= */
  useEffect(() => {
    const track = document.querySelector(".autoflow_image");
    if (!track) return;

    const items = Array.from(track.children);
    items.forEach((el) => track.appendChild(el.cloneNode(true)));

    let x = 0;
    let drag = false;
    let startX = 0;
    let startXpos = 0;
    const speed = 0.3;

    const loopWidth = () => track.scrollWidth / 2;

    const animate = () => {
      if (!drag) {
        x -= speed;
        if (x <= -loopWidth()) x += loopWidth();
        track.style.transform = `translateX(${x}px)`;
      }
      requestAnimationFrame(animate);
    };

    animate();

    const down = (e) => {
      drag = true;
      startX = e.clientX;
      startXpos = x;
      track.setPointerCapture(e.pointerId);
    };

    const move = (e) => {
      if (!drag) return;
      x = startXpos + (e.clientX - startX);
      track.style.transform = `translateX(${x}px)`;
    };

    const up = () => (drag = false);

    track.addEventListener("pointerdown", down);
    track.addEventListener("pointermove", move);
    track.addEventListener("pointerup", up);

    return () => {
      track.removeEventListener("pointerdown", down);
      track.removeEventListener("pointermove", move);
      track.removeEventListener("pointerup", up);
    };
  }, []);

  /* ================= MATERIAL REVEAL ================= */
  useEffect(() => {
    const items = document.querySelectorAll(".desalto_grid > *, .glas_grid > *");
    if (!items.length) return;

    items.forEach((el, i) => {
      el.classList.add("reveal");
      el.classList.add(i % 2 ? "right" : "left");
      el.style.transitionDelay = (i % 4) * 0.1 + "s";
    });

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("show");
      });
    }, { threshold: 0.2 });

    items.forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <Hero />
      <ScrollHeader />
      <Philosophy />
      <Curated />
      <Brand />
      <Designer />
      <Material />
      <Inspire />
      <Showroom />
      <Footer />
    </div>
  );
}

/* ================= UI COMPONENTS ================= */

function Hero() {
  return (
    <section className="hero">
      <img src="img/main_hero.jpg" />
      <h1 className="title">BOE</h1>
    </section>
  );
}

function ScrollHeader() {
  return (
    <header className="scroll_header">
      <h1>BOE</h1>
    </header>
  );
}

function Philosophy() {
  return (
    <section className="philosophy">
      <div className="Ptxt_main">
        <h1>Philosophy</h1>
        <div className="Pdivider"></div>
        <p>A Quiet Point of View</p>
      </div>

      <div className="Ptxt_sub">
        <p>
          We collect forms, materials, and atmospheres that stay with a room.
        </p>
      </div>
    </section>
  );
}

function Curated() {
  return (
    <section className="curated_space">
      <ul className="autoflow_image">
        {Array.from({ length: 12 }).map((_, i) => (
          <li key={i}>
            <img src={`img/space_cur0${i + 1}.jpg`} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Brand() {
  return <section className="brand">BRAND</section>;
}

function Designer() {
  return (
    <section className="designer">
      <h2>Designers</h2>
      <ul />
      <input type="range" className="drag" />
    </section>
  );
}

function Material() {
  return (
    <section className="material">
      <h2>Material</h2>
      <div className="desalto_grid">
        <div></div><p></p><p></p><div></div><div></div>
      </div>
    </section>
  );
}

function Inspire() {
  return <section className="inspire">INSPIRE</section>;
}

function Showroom() {
  return <section className="showroom">SHOWROOM</section>;
}

function Footer() {
  return <footer>FOOTER</footer>;
}

/* ================= RENDER ================= */
ReactDOM.render(<Boe />, document.getElementById("root"));