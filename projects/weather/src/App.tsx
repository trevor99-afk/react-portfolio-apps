import { useMemo, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
const cities = {
  'Portland': { temp: 18, condition: 'Partly cloudy', icon: '⛅', humidity: 62, wind: 11, air: 24, forecast: [17, 19, 16, 14, 18] },
  'London': { temp: 13, condition: 'Light rain', icon: '🌦️', humidity: 78, wind: 16, air: 31, forecast: [13, 14, 12, 15, 16] },
  'Tokyo': { temp: 22, condition: 'Clear skies', icon: '☀️', humidity: 48, wind: 8, air: 18, forecast: [22, 23, 21, 20, 22] },
  'New York': { temp: 16, condition: 'Breezy', icon: '🌤️', humidity: 55, wind: 19, air: 28, forecast: [16, 18, 19, 17, 15] },
};
type City = keyof typeof cities;
function App() {
  const [city, setCity] = useState<City>('Portland');
  const [query, setQuery] = useState('');
  const [celsius, setCelsius] = useState(true);
  const data = cities[city];
  const suggestions = useMemo(() => Object.keys(cities).filter((name) => name.toLowerCase().includes(query.toLowerCase())), [query]);
  function choose(name: string) { if (name in cities) setCity(name as City); setQuery(''); }
  const degrees = (value: number) => celsius ? value : Math.round(value * 9 / 5 + 32);
  return <main className="app-shell" style={{ '--accent': '#47789a', '--accent-soft': '#e9f1f7' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">☼</span>Skycast</div><span className="top-note">A little more in tune with the day</span></header>
    <section className="hero"><div><div className="eyebrow">Your weather, thoughtfully</div><h1>Look outside.<br />Know what to expect.</h1><p className="subtitle">A friendly forecast for planning whatever the day brings.</p></div><button className="button secondary" onClick={() => setCelsius(!celsius)}>°{celsius ? 'C' : 'F'} · Switch units</button></section>
    <section className="grid grid-2"><article className="card" style={{ background: 'linear-gradient(140deg,#eef5f9,#fff 75%)' }}><div className="controls"><div style={{ fontSize: 42 }}>{data.icon}</div><div><div className="eyebrow">Currently in</div><h2 style={{ marginTop: 4 }}>{city}</h2></div><form className="inline-form" style={{ marginLeft: 'auto' }} onSubmit={(e) => { e.preventDefault(); choose(suggestions[0] || ''); }}><input className="input" style={{ width: 145 }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find a city..." aria-label="Search city" list="city-options" /><datalist id="city-options">{Object.keys(cities).map((name) => <option key={name} value={name} />)}</datalist><button className="button small" aria-label="Search">⌕</button></form></div><div className="section-space" style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}><span style={{ fontSize: 65, fontWeight: 800, letterSpacing: '-.07em', fontFamily: 'Manrope' }}>{degrees(data.temp)}°</span><span className="subtitle">{data.condition}</span></div><div className="row-sub">Feels like {degrees(data.temp - 1)}° · Updated just now</div><div className="grid grid-3 section-space"><div><div className="stat-label">Humidity</div><strong>{data.humidity}%</strong></div><div><div className="stat-label">Wind</div><strong>{data.wind} km/h</strong></div><div><div className="stat-label">Air quality</div><strong style={{ color: '#39836d' }}>{data.air} · Good</strong></div></div></article>
      <article className="card"><div className="card-title"><div><h2>Coming up</h2><span className="row-sub">A five-day glance</span></div><span className="pill accent">Forecast</span></div><div className="list">{['Today', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => <div className="list-row" key={day}><div className="row-title">{day}</div><span style={{ fontSize: 19 }}>{i === 1 ? '☀️' : i === 3 ? '🌧️' : data.icon}</span><div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><span className="row-sub">{degrees(data.forecast[i] - 3)}°</span><strong>{degrees(data.forecast[i])}°</strong></div></div>)}</div></article></section>
    <section className="card section-space"><div className="card-title"><div><h2>Explore another city</h2><span className="row-sub">Choose a saved place for a quick forecast</span></div></div><div className="controls">{Object.keys(cities).map((name) => <button className={`button small ${city === name ? '' : 'secondary'}`} key={name} onClick={() => choose(name)}>{name}</button>)}</div><div className="card section-space" style={{ background: '#f5f8fa', border: 0 }}><span className="pill accent">Air quality · {data.air} AQI</span><span style={{ marginLeft: 10, fontSize: 13, color: '#68766f' }}>Good — conditions are great for spending time outside.</span></div></section>
    <p className="footer-note">Skycast · Sample forecast data, no location tracking or API key</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
