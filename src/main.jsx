import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import useEmblaCarousel from "embla-carousel-react";

const phone = "tel:+79179186505";
const telegram = "https://t.me/symphony_nk";
const picture = (name) => "./assets/" + name + ".webp";
function Hero() {
  return (
    <section className="hero">
      <picture>
        <source
          media="(max-width:600px)"
          srcSet={picture("editorial-mobile")}
        />
        <img
          className="hero-image"
          src={picture("editorial-evening")}
          alt=""
          fetchPriority="high"
        />
      </picture>
      <header>
        <span className="city">Нижнекамск</span>
        <div className="mast">
          <h1>SYMPHONY</h1>
          <span>Гастробар</span>
        </div>
        <nav aria-label="Разделы сайта">
          <a href="#film">Атмосфера</a>
          <a href="#bar">Бар</a>
          <a href="#table">Меню</a>
          <a href="#nights">Афиша</a>
        </nav>
        <a className="reserve" href={phone}>
          Бронь столика ↗
        </a>
      </header>
      <nav className="mobile-nav" aria-label="Разделы на телефоне">
        <a href="#film">Зал</a>
        <a href="#bar">Бар</a>
        <a href="#table">Меню</a>
        <a href="#nights">Афиша</a>
      </nav>
      <div className="hero-foot">
        <span>ТЦ «Олимп», 5 этаж</span>
        <a href="#film">Внутри «Симфонии» ↓</a>
      </div>
    </section>
  );
}
const drinks = [
  {
    image: "editorial-ruby",
    label: "Рубиновый",
    caption: "Рубин в янтарном свете",
    alt: "Красный коктейль в рифлёном стакане под янтарным светом",
  },
  {
    image: "editorial-crema",
    label: "Кофе",
    caption: "Эспрессо и крема",
    alt: "Кофейный коктейль на тонкой ножке под медным светом",
  },
];
function Bar() {
  const [selected, setSelected] = useState(0);
  const drink = drinks[selected];
  return (
    <section
      id="bar"
      className={"bar tone-" + drink.image}
      aria-labelledby="bar-title"
    >
      <div className="bar-copy">
        <small>Барный этюд</small>
        <h2 id="bar-title">
          Свет <em>и тень</em>
        </h2>

        <div className="switch" aria-label="Выбор бокала">
          {drinks.map((d, i) => (
            <button
              key={d.image}
              aria-pressed={i === selected}
              onClick={() => setSelected(i)}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <figure className="lightstage">
        <div className="glass">
          {drinks.map((d, i) => (
            <img
              key={d.image}
              className={selected === i ? "lit" : ""}
              loading="lazy"
              src={picture(d.image)}
              alt={selected === i ? d.alt : ""}
            />
          ))}
        </div>
        <figcaption aria-live="polite">{drink.caption}</figcaption>
      </figure>
    </section>
  );
}
const dishes = [
  ["editorial-bruschetta", "Брускетты"],
  ["editorial-greens", "С креветками"],
  ["editorial-film", "Напитки"],
  ["editorial-coffee", "Кофе"],
];
function Kitchen() {
  const [ref, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });
  const [arrows, setArrows] = useState([false, true]);
  useEffect(() => {
    if (!api) return;
    const sync = () => setArrows([api.canScrollPrev(), api.canScrollNext()]);
    sync();
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api]);
  return (
    <section id="table" className="table">
      <div className="sectionhead">
        <div>
          <h2>Меню</h2>
        </div>
        <p className="menu-note">
          Закуски на общий стол, бокал к ужину и кофе после.
        </p>
        <div className="arrows">
          <button
            aria-label="Предыдущее блюдо"
            disabled={!arrows[0]}
            onClick={() => api?.scrollPrev()}
          >
            ←
          </button>
          <button
            aria-label="Следующее блюдо"
            disabled={!arrows[1]}
            onClick={() => api?.scrollNext()}
          >
            →
          </button>
        </div>
      </div>
      <div className="viewport" ref={ref}>
        <div className="rail">
          {dishes.map(([img, title]) => (
            <figure key={img}>
              <figcaption>{title}</figcaption>
              <div className="menu-img">
                <img loading="lazy" src={picture(img)} alt={title} />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
function Film() {
  const frame = useRef(null);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.disconnect();
      }
    });
    observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);
  const dialog = useRef(null),
    video = useRef(null);
  function open() {
    dialog.current.showModal();
    video.current.play().catch(() => {});
  }
  function close() {
    dialog.current.close();
  }
  return (
    <section className="film" id="film">
      <div className="filmtext">
        <small>Атмосфера</small>
        <h2>
          На пятом <br />
          этаже
        </h2>
        <p>
          Кресла у стойки, янтарный свет и мягкие диваны. Здесь ужин легко
          затягивается до ночи.
        </p>
        <button className="play" onClick={open}>
          <span>▶</span> Смотреть видео <small>0:10</small>
        </button>
        <a href={telegram}>Гастробар в Telegram ↗</a>
      </div>
      <div ref={frame} className="frames">
        <img
          src={picture("editorial-room")}
          loading="lazy"
          alt="Мягкие кресла, светящаяся каменная панель и стойка бара «Симфония»"
        />
      </div>
      <dialog
        ref={dialog}
        onClose={() => video.current.pause()}
        aria-label="Видео за столиком Симфонии"
      >
        <button autoFocus onClick={close} aria-label="Закрыть видео">
          Закрыть ×
        </button>
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          poster={picture("editorial-film")}
          src="./assets/at-table.mp4"
        />
      </dialog>
    </section>
  );
}
function Events() {
  return (
    <section id="nights" className="events">
      <img
        src={picture("editorial-night")}
        loading="lazy"
        alt="Гости у свечей во время Halloween Night"
      />
      <div>
        <small>Из архива · 31 октября</small>
        <h2>Halloween Night</h2>
        <p>
          Свечи, бордо и готический дресс-код. На одну ночь бар собрал особую
          коктейльную карту, а за музыку отвечал DJ.
        </p>
        <a href={telegram + "/13"}>Открыть афишу вечера ↗</a>
      </div>
    </section>
  );
}
function Visit() {
  return (
    <footer id="visit">
      <div>
        <small>Бронь столика</small>
        <h2>
          До встречи
          <br />
          на пятом.
        </h2>
        <a className="number" href={phone}>
          +7 917 918-65-05 ↗
        </a>
      </div>
      <div className="info">
        <h3>Как найти</h3>
        <p>
          Нижнекамск, Баки Урманче, 15
          <br />
          ТЦ «Олимп», 5 этаж
        </p>
        <a href="https://yandex.ru/maps/?text=Нижнекамск%20Баки%20Урманче%2015%20Олимп">
          Открыть карту ↗
        </a>
        <h3>Когда приходить</h3>
        <p>
          Вс–чт &nbsp; 12:00–01:00
          <br />
          Пт–сб &nbsp; 12:00–03:00
        </p>
      </div>
      <div className="footline">
        <span>Дизайн-концепция · manath</span>
        <div>
          <a href={telegram}>Telegram</a>
          <a href="https://www.instagram.com/symphony_nk/">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
function App() {
  return (
    <div id="top">
      <main>
        <Hero />
        <Film />
        <Bar />
        <Kitchen />
        <Events />
      </main>
      <Visit />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
