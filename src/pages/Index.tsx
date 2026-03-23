import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── DATA ──────────────────────────────────────────────────────────────
const POSTER_1 = "https://cdn.poehali.dev/projects/aaaf741d-7481-4a3c-b165-d4d60d5437c2/files/57d3cbbf-30d4-4d08-b30c-1b713cc7d5fe.jpg";
const POSTER_2 = "https://cdn.poehali.dev/projects/aaaf741d-7481-4a3c-b165-d4d60d5437c2/files/99ae8dbd-2844-40fe-8d09-bc5dfa00614b.jpg";
const POSTER_3 = "https://cdn.poehali.dev/projects/aaaf741d-7481-4a3c-b165-d4d60d5437c2/files/ccb7a63d-ff42-414f-aa31-e4200d5589c5.jpg";

const MOVIES_DATA = [
  { id: 1, title: "Тени Нуара", year: 2023, rating: 8.7, genre: "Триллер", duration: "2ч 14м", poster: POSTER_1, director: "Андрей Тарковский", favorite: false },
  { id: 2, title: "Звёздный Предел", year: 2024, rating: 9.1, genre: "Фантастика", duration: "2ч 38м", poster: POSTER_2, director: "Кристофер Нолан", favorite: true },
  { id: 3, title: "Ночной Дрейф", year: 2023, rating: 8.3, genre: "Боевик", duration: "1ч 58м", poster: POSTER_3, director: "Дени Вильнёв", favorite: false },
  { id: 4, title: "Последний Акт", year: 2024, rating: 7.9, genre: "Драма", duration: "2ч 05м", poster: POSTER_1, director: "Пон Джун-хо", favorite: false },
  { id: 5, title: "Горизонт", year: 2022, rating: 8.5, genre: "Фантастика", duration: "2ч 22м", poster: POSTER_2, director: "Рид Скотт", favorite: true },
  { id: 6, title: "Тёмный Пульс", year: 2024, rating: 8.8, genre: "Триллер", duration: "2ч 01м", poster: POSTER_3, director: "Финчер Дэвид", favorite: false },
];

const GENRES = [
  { id: "Все", label: "Все", icon: "Film", count: 148 },
  { id: "Боевик", label: "Боевик", icon: "Zap", count: 34 },
  { id: "Драма", label: "Драма", icon: "Heart", count: 56 },
  { id: "Фантастика", label: "Фантастика", icon: "Rocket", count: 28 },
  { id: "Триллер", label: "Триллер", icon: "Eye", count: 41 },
  { id: "Комедия", label: "Комедия", icon: "Smile", count: 22 },
  { id: "Ужасы", label: "Ужасы", icon: "Ghost", count: 19 },
  { id: "Мелодрама", label: "Мелодрама", icon: "Sparkles", count: 31 },
];

const HISTORY = [
  { id: 1, title: "Звёздный Предел", progress: 78, poster: POSTER_2, watched: "Сегодня" },
  { id: 2, title: "Тени Нуара", progress: 100, poster: POSTER_1, watched: "Вчера" },
  { id: 3, title: "Ночной Дрейф", progress: 42, poster: POSTER_3, watched: "3 дня назад" },
];

type Movie = typeof MOVIES_DATA[0];
type Page = "home" | "genres" | "search" | "collection" | "profile" | "support";

// ─── MOVIE CARD ─────────────────────────────────────────────────────────
function MovieCard({ movie, onToggleFav }: { movie: Movie; onToggleFav: (id: number) => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="movie-card relative rounded-xl overflow-hidden cursor-pointer group"
      style={{ background: "var(--card-bg)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          style={{ background: "rgba(8,12,18,0.7)" }}>
          <button className="btn-gold rounded-full w-14 h-14 flex items-center justify-center shadow-2xl">
            <Icon name="Play" size={22} className="ml-1" />
          </button>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(movie.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{ background: movie.favorite ? "var(--gold)" : "rgba(8,12,18,0.7)", color: movie.favorite ? "#080c12" : "var(--gold)" }}
        >
          <Icon name="Heart" size={14} />
        </button>

        <div className="absolute top-3 left-3 rating-badge flex items-center gap-1">
          <Icon name="Star" size={10} />
          {movie.rating}
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-cormorant font-semibold text-lg leading-tight" style={{ color: "#e8dfc4" }}>{movie.title}</h3>
        <div className="flex items-center justify-between mt-1">
          <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>{movie.year} · {movie.duration}</span>
          <span className="px-2 py-0.5 rounded" style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)", fontSize: "0.7rem" }}>{movie.genre}</span>
        </div>
        <p style={{ color: "var(--text-dim)", fontSize: "0.75rem", marginTop: "4px" }}>{movie.director}</p>
      </div>
    </div>
  );
}

// ─── NAV BAR ────────────────────────────────────────────────────────────
function NavBar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "genres", label: "Жанры", icon: "Layers" },
    { id: "search", label: "Поиск", icon: "Search" },
    { id: "collection", label: "Коллекция", icon: "Bookmark" },
    { id: "profile", label: "Профиль", icon: "User" },
  ];
  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <button onClick={() => setPage("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "var(--gold)" }}>
            <Icon name="Film" size={16} className="text-black" />
          </div>
          <span className="font-cormorant text-xl font-bold text-gold-gradient">CineVault</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: page === item.id ? "var(--gold)" : "var(--text-dim)",
                background: page === item.id ? "rgba(201,168,76,0.1)" : "transparent",
              }}
            >
              <Icon name={item.icon} size={15} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage("support")}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:text-yellow-400"
            style={{ color: "var(--text-dim)" }}
          >
            <Icon name="HelpCircle" size={15} />
          </button>
          <button
            onClick={() => setPage("profile")}
            className="avatar-ring w-9 h-9 rounded-full overflow-hidden"
          >
            <div className="w-full h-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg, #2a3450, #1a2340)", color: "var(--gold)" }}>АН</div>
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2" style={{ color: "var(--gold)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setPage(item.id); setMenuOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all"
              style={{ color: page === item.id ? "var(--gold)" : "var(--text-dim)", background: page === item.id ? "rgba(201,168,76,0.08)" : "transparent" }}>
              <Icon name={item.icon} size={16} />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────
function HomePage({ movies, onToggleFav, setPage }: { movies: Movie[]; onToggleFav: (id: number) => void; setPage: (p: Page) => void }) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="relative overflow-hidden" style={{ height: "85vh", minHeight: "500px" }}>
        <img src={POSTER_2} alt="hero" className="w-full h-full object-cover object-top" style={{ filter: "brightness(0.45)" }} />
        <div className="hero-overlay absolute inset-0" />

        <div className="absolute inset-0 flex items-center px-6 sm:px-12" style={{ maxWidth: "1280px", margin: "0 auto", left: 0, right: 0 }}>
          <div style={{ maxWidth: "520px" }}>
            <div className="flex items-center gap-2 mb-4 animate-fade-in stagger-1">
              <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: "rgba(201,168,76,0.15)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.3)" }}>
                🎬 Премьера недели
              </span>
            </div>
            <h1 className="font-cormorant font-bold leading-none mb-4 animate-fade-in stagger-2"
              style={{ fontSize: "clamp(3rem, 7vw, 5rem)", color: "#f0e6c8" }}>
              Звёздный<br /><span className="text-gold-gradient italic">Предел</span>
            </h1>
            <p className="text-base mb-2 animate-fade-in stagger-3" style={{ color: "var(--text-dim)" }}>
              Кристофер Нолан · 2024 · 2ч 38м · Фантастика
            </p>
            <p className="text-sm leading-relaxed mb-8 animate-fade-in stagger-4" style={{ color: "#9aa5bf", maxWidth: "400px" }}>
              Команда астронавтов отправляется за пределы известной галактики в поисках нового дома. Но то, что они обнаруживают, меняет всё.
            </p>
            <div className="flex items-center gap-4 animate-fade-in stagger-5">
              <button className="btn-gold px-8 py-3 rounded-xl font-golos font-semibold flex items-center gap-2 text-sm">
                <Icon name="Play" size={16} /> Смотреть
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.08)", color: "#e8dfc4", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon name="Info" size={16} /> Подробнее
              </button>
            </div>
            <div className="flex items-center gap-6 mt-8 animate-fade-in stagger-6">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Icon key={i} name="Star" size={12} style={{ color: i <= 4 ? "var(--gold)" : "var(--text-dim)" }} />
                  ))}
                </div>
                <span style={{ color: "var(--gold)", fontSize: "0.85rem", fontWeight: 700 }}>9.1</span>
              </div>
              <span style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>24 843 оценки</span>
              <span className="flex items-center gap-1" style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>
                <Icon name="Eye" size={12} /> 1.2М просмотров
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 animate-float" style={{ transform: "translateX(-50%)", color: "rgba(201,168,76,0.5)" }}>
          <Icon name="ChevronDown" size={24} />
        </div>
      </div>

      {/* Новинки */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-cormorant text-3xl font-bold section-title" style={{ color: "#e8dfc4" }}>Новинки</h2>
          <button onClick={() => setPage("genres")} className="flex items-center gap-1 text-sm transition-colors hover:text-yellow-300" style={{ color: "var(--gold)" }}>
            Все фильмы <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {movies.map((m, i) => (
            <div key={m.id} className={`animate-fade-in stagger-${Math.min(i + 1, 6)}`}>
              <MovieCard movie={m} onToggleFav={onToggleFav} />
            </div>
          ))}
        </div>
      </div>

      {/* Настроение */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="font-cormorant text-3xl font-bold section-title mb-8" style={{ color: "#e8dfc4" }}>Смотри по настроению</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Остросюжетные", emoji: "🔥", desc: "34 фильма" },
            { label: "Для всей семьи", emoji: "🌟", desc: "28 фильмов" },
            { label: "Классика кино", emoji: "🎭", desc: "56 фильмов" },
            { label: "Документальные", emoji: "🎬", desc: "19 фильмов" },
          ].map((cat) => (
            <button key={cat.label} onClick={() => setPage("genres")}
              className="genre-card p-5 rounded-2xl text-left"
              style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.1)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
                style={{ background: "rgba(201,168,76,0.08)" }}>
                {cat.emoji}
              </div>
              <h3 className="font-cormorant font-semibold text-lg" style={{ color: "#e8dfc4" }}>{cat.label}</h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>{cat.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── GENRES PAGE ────────────────────────────────────────────────────────
function GenresPage({ movies, onToggleFav }: { movies: Movie[]; onToggleFav: (id: number) => void }) {
  const [activeGenre, setActiveGenre] = useState("Все");
  const filtered = activeGenre === "Все" ? movies : movies.filter(m => m.genre === activeGenre);

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <h1 className="font-cormorant text-4xl font-bold section-title mb-8" style={{ color: "#e8dfc4" }}>Фильмы по жанрам</h1>
      <div className="flex flex-wrap gap-2 mb-10">
        {GENRES.map(g => (
          <button key={g.id} onClick={() => setActiveGenre(g.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            style={{
              background: activeGenre === g.id ? "var(--gold)" : "var(--card-bg)",
              color: activeGenre === g.id ? "#080c12" : "var(--text-dim)",
              border: `1px solid ${activeGenre === g.id ? "var(--gold)" : "rgba(201,168,76,0.15)"}`,
            }}>
            <Icon name={g.icon} size={14} />
            {g.label}
            <span className="text-xs opacity-60">{g.count}</span>
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: "var(--text-dim)" }}>
          <Icon name="Film" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">Фильмы этого жанра скоро появятся</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {filtered.map(m => <MovieCard key={m.id} movie={m} onToggleFav={onToggleFav} />)}
        </div>
      )}
    </div>
  );
}

// ─── SEARCH PAGE ────────────────────────────────────────────────────────
function SearchPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"title" | "actor" | "director" | "year">("title");
  const [yearFrom, setYearFrom] = useState("2020");
  const [yearTo, setYearTo] = useState("2024");

  const searched = query.length > 0 ? MOVIES_DATA.filter(m => {
    if (filter === "title") return m.title.toLowerCase().includes(query.toLowerCase());
    if (filter === "director") return m.director.toLowerCase().includes(query.toLowerCase());
    if (filter === "year") return m.year >= +yearFrom && m.year <= +yearTo;
    return true;
  }) : [];

  const filterLabels: Record<string, string> = { title: "Названию", actor: "Актёру", director: "Режиссёру", year: "Году" };

  return (
    <div className="pt-24 max-w-4xl mx-auto px-4 sm:px-6 pb-16">
      <h1 className="font-cormorant text-4xl font-bold section-title mb-8" style={{ color: "#e8dfc4" }}>Поиск фильмов</h1>

      <div className="relative mb-6">
        <div className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--gold)" }}>
          <Icon name="Search" size={18} />
        </div>
        <input className="input-cinema w-full py-4 pl-12 pr-4 rounded-2xl text-base"
          placeholder="Название фильма, режиссёр..."
          value={query} onChange={e => setQuery(e.target.value)} />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100" style={{ color: "var(--text-dim)" }}>
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm py-2" style={{ color: "var(--text-dim)" }}>Искать по:</span>
        {(["title", "actor", "director", "year"] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: filter === f ? "rgba(201,168,76,0.15)" : "var(--card-bg)",
              color: filter === f ? "var(--gold)" : "var(--text-dim)",
              border: `1px solid ${filter === f ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)"}`,
            }}>
            {filterLabels[f]}
          </button>
        ))}
      </div>

      {filter === "year" && (
        <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.1)" }}>
          <div className="flex items-center gap-2">
            <label className="text-sm" style={{ color: "var(--text-dim)" }}>С</label>
            <input type="number" className="input-cinema w-24 px-3 py-2 rounded-lg text-sm" value={yearFrom} onChange={e => setYearFrom(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm" style={{ color: "var(--text-dim)" }}>По</label>
            <input type="number" className="input-cinema w-24 px-3 py-2 rounded-lg text-sm" value={yearTo} onChange={e => setYearTo(e.target.value)} />
          </div>
          <button className="btn-gold px-4 py-2 rounded-lg text-sm">Найти</button>
        </div>
      )}

      {query && searched.length === 0 && (
        <div className="text-center py-16" style={{ color: "var(--text-dim)" }}>
          <Icon name="SearchX" size={40} className="mx-auto mb-3 opacity-30" />
          <p>По запросу «{query}» ничего не найдено</p>
        </div>
      )}

      {searched.length > 0 && (
        <div>
          <p className="text-sm mb-4" style={{ color: "var(--text-dim)" }}>Найдено: {searched.length} {searched.length === 1 ? "фильм" : "фильма"}</p>
          <div className="flex flex-col gap-3">
            {searched.map(m => (
              <div key={m.id} className="flex gap-4 p-4 rounded-2xl transition-all hover:scale-[1.01]"
                style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.1)" }}>
                <img src={m.poster} alt={m.title} className="w-16 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-cormorant text-xl font-semibold" style={{ color: "#e8dfc4" }}>{m.title}</h3>
                    <span className="rating-badge flex items-center gap-1 flex-shrink-0">
                      <Icon name="Star" size={10} />{m.rating}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: "var(--text-dim)" }}>{m.year} · {m.duration} · {m.genre}</p>
                  <p className="text-sm mt-1" style={{ color: "var(--text-dim)" }}>Режиссёр: {m.director}</p>
                  <button className="btn-gold mt-3 px-4 py-1.5 rounded-lg text-xs flex items-center gap-1">
                    <Icon name="Play" size={12} /> Смотреть
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="text-center py-16" style={{ color: "var(--text-dim)" }}>
          <div className="text-5xl mb-4">🎬</div>
          <p className="font-cormorant text-xl" style={{ color: "#e8dfc4" }}>Начни вводить запрос</p>
          <p className="text-sm mt-2">Поиск по 148 фильмам и сериалам</p>
        </div>
      )}
    </div>
  );
}

// ─── COLLECTION PAGE ────────────────────────────────────────────────────
function CollectionPage({ movies, onToggleFav }: { movies: Movie[]; onToggleFav: (id: number) => void }) {
  const [tab, setTab] = useState<"favorites" | "history">("favorites");
  const favorites = movies.filter(m => m.favorite);

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <h1 className="font-cormorant text-4xl font-bold section-title mb-8" style={{ color: "#e8dfc4" }}>Моя коллекция</h1>

      <div className="flex gap-2 mb-8 p-1 rounded-2xl w-fit" style={{ background: "var(--card-bg)" }}>
        {[{ id: "favorites" as const, label: "Избранное", icon: "Heart" }, { id: "history" as const, label: "История", icon: "Clock" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ background: tab === t.id ? "var(--gold)" : "transparent", color: tab === t.id ? "#080c12" : "var(--text-dim)" }}>
            <Icon name={t.icon} size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "favorites" && (
        favorites.length === 0 ? (
          <div className="text-center py-20" style={{ color: "var(--text-dim)" }}>
            <Icon name="Heart" size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-cormorant text-xl" style={{ color: "#e8dfc4" }}>Пока пусто</p>
            <p className="text-sm mt-2">Нажми ❤ на постере фильма, чтобы добавить в избранное</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {favorites.map(m => <MovieCard key={m.id} movie={m} onToggleFav={onToggleFav} />)}
          </div>
        )
      )}

      {tab === "history" && (
        <div className="flex flex-col gap-4">
          {HISTORY.map(item => (
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.08)" }}>
              <img src={item.poster} alt={item.title} className="w-20 h-28 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 py-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-cormorant text-xl font-semibold" style={{ color: "#e8dfc4" }}>{item.title}</h3>
                  <span className="text-xs" style={{ color: "var(--text-dim)" }}>{item.watched}</span>
                </div>
                <p className="text-sm mt-1 mb-3" style={{ color: "var(--text-dim)" }}>
                  {item.progress === 100 ? "✅ Просмотрено" : `Просмотрено ${item.progress}%`}
                </p>
                {item.progress < 100 && (
                  <div className="mb-4">
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="progress-bar h-full rounded-full" style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                )}
                <button className="btn-gold px-4 py-1.5 rounded-lg text-xs flex items-center gap-1">
                  <Icon name={item.progress === 100 ? "RotateCcw" : "Play"} size={12} />
                  {item.progress === 100 ? "Смотреть снова" : "Продолжить"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── PROFILE PAGE ────────────────────────────────────────────────────────
function ProfilePage({ setPage }: { setPage: (p: Page) => void }) {
  const stats = [
    { label: "Просмотрено", value: "47", icon: "Film" },
    { label: "Часов", value: "94", icon: "Clock" },
    { label: "Избранное", value: "12", icon: "Heart" },
    { label: "Рецензий", value: "8", icon: "MessageSquare" },
  ];

  return (
    <div className="pt-24 max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl mb-8"
        style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="avatar-ring w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 text-3xl font-bold font-cormorant"
          style={{ background: "linear-gradient(135deg, #1a2340, #2a3450)", color: "var(--gold)" }}>
          АН
        </div>
        <div className="text-center sm:text-left flex-1">
          <h2 className="font-cormorant text-3xl font-bold" style={{ color: "#e8dfc4" }}>Александр Новиков</h2>
          <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>@alex_novikov · Участник с 2023</p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.2)" }}>🎬 Синефил</span>
            <span className="px-3 py-1 rounded-full text-xs" style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.2)" }}>⭐ Топ-рецензент</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
          style={{ border: "1px solid rgba(201,168,76,0.2)", color: "var(--text-dim)" }}>
          <Icon name="Settings" size={14} /> Настройки
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="p-5 rounded-2xl text-center" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.08)" }}>
            <Icon name={s.icon} size={20} className="mx-auto mb-2" style={{ color: "var(--gold)" }} />
            <div className="font-cormorant text-3xl font-bold" style={{ color: "#e8dfc4" }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-3xl mb-6" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.08)" }}>
        <h3 className="font-cormorant text-xl font-semibold mb-4" style={{ color: "#e8dfc4" }}>Любимые жанры</h3>
        <div className="flex flex-col gap-3">
          {[{ name: "Фантастика", pct: 78 }, { name: "Триллер", pct: 62 }, { name: "Драма", pct: 45 }].map(g => (
            <div key={g.name}>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: "#e8dfc4" }}>{g.name}</span>
                <span style={{ color: "var(--gold)" }}>{g.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div className="progress-bar h-full rounded-full" style={{ width: `${g.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-3xl" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-cormorant text-xl font-semibold" style={{ color: "#e8dfc4" }}>История просмотров</h3>
          <button onClick={() => setPage("collection")} className="text-sm flex items-center gap-1" style={{ color: "var(--gold)" }}>
            Все <Icon name="ChevronRight" size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {HISTORY.map(item => (
            <div key={item.id} className="flex-shrink-0 w-20">
              <div className="relative rounded-xl overflow-hidden mb-2">
                <img src={item.poster} alt={item.title} className="w-20 h-28 object-cover" />
                {item.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="progress-bar h-full" style={{ width: `${item.progress}%` }} />
                  </div>
                )}
              </div>
              <p className="text-xs text-center leading-tight truncate" style={{ color: "var(--text-dim)" }}>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SUPPORT PAGE ────────────────────────────────────────────────────────
function SupportPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "Техническая проблема", message: "" });

  const faqs = [
    { q: "Как отменить подписку?", a: "Перейдите в Профиль → Подписка → Отменить. Доступ сохранится до конца оплаченного периода." },
    { q: "Почему видео не воспроизводится?", a: "Проверьте интернет-соединение. Попробуйте обновить страницу или сменить качество видео." },
    { q: "Как скачать фильм для офлайн-просмотра?", a: "Нажмите иконку загрузки на странице фильма. Функция доступна для подписчиков Premium." },
    { q: "Доступно ли приложение на мобильных?", a: "Да, сайт адаптирован для всех устройств. Мобильное приложение выйдет в 2025 году." },
  ];

  return (
    <div className="pt-24 max-w-3xl mx-auto px-4 sm:px-6 pb-16">
      <h1 className="font-cormorant text-4xl font-bold section-title mb-2" style={{ color: "#e8dfc4" }}>Поддержка</h1>
      <p className="text-sm mb-10" style={{ color: "var(--text-dim)" }}>Ответим в течение 2 часов в рабочее время</p>

      <div className="mb-10">
        <h2 className="font-cormorant text-2xl font-semibold mb-5" style={{ color: "#e8dfc4" }}>Частые вопросы</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-2xl overflow-hidden" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.1)" }}>
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none" style={{ color: "#e8dfc4" }}>
                <span className="font-medium text-sm">{faq.q}</span>
                <Icon name="ChevronDown" size={16} style={{ color: "var(--gold)" }} />
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-dim)" }}>{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-3xl" style={{ background: "var(--card-bg)", border: "1px solid rgba(201,168,76,0.1)" }}>
        <h2 className="font-cormorant text-2xl font-semibold mb-6" style={{ color: "#e8dfc4" }}>Написать нам</h2>
        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(201,168,76,0.15)" }}>
              <Icon name="CheckCircle" size={32} style={{ color: "var(--gold)" }} />
            </div>
            <h3 className="font-cormorant text-2xl font-bold mb-2" style={{ color: "#e8dfc4" }}>Сообщение отправлено!</h3>
            <p style={{ color: "var(--text-dim)", fontSize: "0.9rem" }}>Мы свяжемся с вами в ближайшее время</p>
            <button onClick={() => setSent(false)} className="mt-6 btn-gold px-6 py-2 rounded-xl text-sm">Написать ещё</button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-2" style={{ color: "var(--text-dim)" }}>Имя</label>
                <input className="input-cinema w-full px-4 py-3 rounded-xl text-sm" placeholder="Александр"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-xs mb-2" style={{ color: "var(--text-dim)" }}>Email</label>
                <input className="input-cinema w-full px-4 py-3 rounded-xl text-sm" placeholder="alex@mail.ru" type="email"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-2" style={{ color: "var(--text-dim)" }}>Тема</label>
              <select className="input-cinema w-full px-4 py-3 rounded-xl text-sm"
                value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
                <option>Техническая проблема</option>
                <option>Вопрос по подписке</option>
                <option>Предложение</option>
                <option>Другое</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-2" style={{ color: "var(--text-dim)" }}>Сообщение</label>
              <textarea rows={5} className="input-cinema w-full px-4 py-3 rounded-xl text-sm resize-none"
                placeholder="Опишите вашу проблему или вопрос..."
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
              className="btn-gold py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
              <Icon name="Send" size={15} /> Отправить сообщение
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────
export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [movieList, setMovieList] = useState(MOVIES_DATA);

  const toggleFav = (id: number) => {
    setMovieList(prev => prev.map(m => m.id === id ? { ...m, favorite: !m.favorite } : m));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--deep-bg)" }}>
      <NavBar page={page} setPage={setPage} />

      {page === "home" && <HomePage movies={movieList} onToggleFav={toggleFav} setPage={setPage} />}
      {page === "genres" && <GenresPage movies={movieList} onToggleFav={toggleFav} />}
      {page === "search" && <SearchPage />}
      {page === "collection" && <CollectionPage movies={movieList} onToggleFav={toggleFav} />}
      {page === "profile" && <ProfilePage setPage={setPage} />}
      {page === "support" && <SupportPage />}

      <footer className="py-10" style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "var(--gold)" }}>
              <Icon name="Film" size={12} className="text-black" />
            </div>
            <span className="font-cormorant font-bold text-gold-gradient">CineVault</span>
          </div>
          <p style={{ color: "var(--text-dim)", fontSize: "0.8rem" }}>© 2024 CineVault · Все права защищены</p>
          <div className="flex gap-4">
            {["О нас", "Условия", "Конфиденциальность"].map(l => (
              <button key={l} className="text-xs transition-colors hover:text-yellow-400" style={{ color: "var(--text-dim)" }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
