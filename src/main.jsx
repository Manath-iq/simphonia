import React, { useEffect, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import useEmblaCarousel from "embla-carousel-react";

const phone = "tel:+79179186505";
const telegram = "https://t.me/symphony_nk";
const picture = (name) => "./assets/" + name + ".webp";
const sides = [
  {
    tab: "Бар",
    title: ["Ещё по", "одному?"],
    img: "evening",
    alt: "Гости встречаются бокалами над столом",
    desc: "Коктейли, долгие разговоры и ещё один тост на пятом этаже «Олимпа».",
    color: "bar",
  },
  {
    tab: "Кухня",
    title: ["Что будем", "делить?"],
    img: "bruschetta",
    alt: "Брускетты на чёрной тарелке",
    desc: "Возьмите закуски на общий стол. За разговорами последняя брускетта обычно достаётся самому быстрому.",
    color: "food",
  },
  {
    tab: "Зал",
    title: ["Увидимся", "на пятом."],
    img: "room",
    alt: "Зал гастробара с тёплой подсветкой и мягкими креслами",
    desc: "Мягкие кресла у бара, тёплый свет и стол для своих. Поднимайтесь на пятый этаж.",
    color: "room",
  },
];
function Header() {
  return (
    <header>
      <a href="#top" className="wordmark">
        Симфония<span>✳</span>
      </a>
      <nav aria-label="Основная навигация">
        <a href="#table">Кухня</a>
        <a href="#film">Атмосфера</a>
        <a href="#nights">Афиша</a>
        <a href="#visit">Как найти</a>
      </nav>
      <a className="reserve" href={phone}>
        Бронь столика ↗
      </a>
    </header>
  );
}
function Sleeve() {
  const [index, select] = useState(0);
  const side = sides[index];
  return (
    <section aria-label="Стороны Симфонии" className={"sleeve " + side.color}>
      <div className="cover">
        <div className="copy">
          <div className="location">Гастробар &nbsp; / &nbsp; Нижнекамск</div>
          <h1 key={side.tab}>
            {side.title[0]}
            <br />
            {side.title[1]}
          </h1>
          <p>{side.desc}</p>
        </div>
        <figure className="record" key={side.img}>
          <img src={picture(side.img)} alt={side.alt} />
        </figure>
      </div>
      <div className="controls">
        <div className="selectors" aria-label="Выбрать сторону вечера">
          {sides.map((s, i) => (
            <button
              key={s.tab}
              aria-pressed={i === index}
              onClick={() => select(i)}
            >
              <span aria-hidden="true">{String.fromCharCode(65 + i)}</span>
              {s.tab}
            </button>
          ))}
        </div>
        <a className="down" href="#table">
          К столу ↓
        </a>
      </div>
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
        <small>Из дневника гастробара</small>
        <h2>Мы ненадолго.</h2>
        <p>
          Так обычно начинается вечер. Загляните на десять секунд за столик
          «Симфонии».
        </p>
        <button className="play" onClick={open}>
          <span>▶</span> Смотреть видео <small>0:10</small>
        </button>
        <a href={telegram}>Афиша и новые вечера в Telegram ↗</a>
      </div>
      <div className="frames" aria-hidden="true">
        <img src={picture("room")} loading="lazy" alt="" />
        <img src={picture("film")} loading="lazy" alt="" />
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
      <Header />
      <main>
        <Sleeve />
        <Kitchen />
        <Film />
        <Events />
      </main>
      <Visit />
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
