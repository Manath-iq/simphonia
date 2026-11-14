import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import useEmblaCarousel from "embla-carousel-react";

const phone = "tel:+79179186505";
const telegram = "https://t.me/symphony_nk";
const picture = (name) => "./assets/" + name + ".webp";
function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-image"
        src={picture("nocturne")}
        alt=""
        fetchPriority="high"
      />
      <header>
        <a className="brand" href="#top">
          Симфония
        </a>
        <nav aria-label="Разделы сайта">
          <a href="#bar">Бар</a>
          <a href="#table">Кухня</a>
          <a href="#film">Атмосфера</a>
          <a href="#visit">Контакты</a>
        </nav>
        <a className="reserve" href={phone}>
          Бронь столика ↗
        </a>
      </header>
      <div className="hero-title">
        <small>Гастробар в Нижнекамске</small>
        <h1>Симфония</h1>
      </div>
      <div className="hero-foot">
        <span>ТЦ «Олимп», 5 этаж</span>
        <a href="#bar">К коктейлям ↓</a>
      </div>
    </section>
  );
}
const drinks = [
  {
    image: "amber",
    label: "Цитрус",
    caption: "Янтарь и цедра",
    alt: "Бокал с цитрусовой цедрой в луче янтарного света",
  },
  {
    image: "espresso",
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
        <small>Барная коллекция · Эскизы подачи</small>
        <h2 id="bar-title">
          Свет <em>и тень</em>
        </h2>
        <p>Два настроения одного вечера. Выберите свой бокал.</p>
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
  ["bruschetta", "Брускетты к столу", "Хрустящий хлеб, зелень и яркая подача."],
  ["greens", "Салат с креветками", "Зелень и креветки на тёмной керамике."],
  ["avocado", "Ещё одну закуску", "Три маленьких тоста для большого стола."],
  [
    "coffee",
    "Кофе после обеда",
    "Последний глоток, прежде чем вернуться к делам.",
  ],
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
          <small>Из кухни «Симфонии»</small>
          <h2>На общий стол</h2>
        </div>
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
          {dishes.map(([img, title, desc]) => (
            <figure key={img}>
              <img loading="lazy" src={picture(img)} alt={title} />
              <figcaption>
                <h3>{title}</h3>
                <p>{desc}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
function Film() {
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
        <small>Зал «Симфонии»</small>
        <h2>За столиком</h2>
        <p>Короткое видео из «Симфонии».</p>
        <button className="play" onClick={open}>
          <span>▶</span> Смотреть видео <small>0:10</small>
        </button>
        <a href={telegram}>Афиша и новые вечера в Telegram ↗</a>
      </div>
      <div className="frames" aria-hidden="true">
        <img src={picture("room")} loading="lazy" alt="" />
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
          poster={picture("film")}
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
        src={picture("night")}
        loading="lazy"
        alt="Афиша вечеринки Halloween Night со свечами в зале гастробара"
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
        <Bar />
        <Kitchen />
        <Film />
        <Events />
      </main>
      <Visit />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
