import { useMemo, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
const events = [
  { title: 'Sunday farmers market', category: 'Food', date: 'Sun, Nov 3 · 9:00 AM', place: 'Riverside Park', emoji: '🥕', price: 'Free' },
  { title: 'Ceramics for beginners', category: 'Workshop', date: 'Sat, Nov 2 · 2:30 PM', place: 'Clay House Studio', emoji: '🏺', price: '$18' },
  { title: 'Indie film under the stars', category: 'Arts', date: 'Fri, Nov 1 · 7:00 PM', place: 'The Old Courtyard', emoji: '🎬', price: '$12' },
  { title: 'Neighborhood jazz night', category: 'Music', date: 'Sat, Nov 2 · 8:00 PM', place: 'Bluebird Cafe', emoji: '🎷', price: '$10' },
  { title: 'Guided morning garden walk', category: 'Outdoors', date: 'Sun, Nov 3 · 8:00 AM', place: 'Botanical Gardens', emoji: '🌿', price: 'Free' },
  { title: 'Pasta-making with Luca', category: 'Workshop', date: 'Wed, Nov 6 · 6:00 PM', place: 'Little Olive Kitchen', emoji: '🍝', price: '$24' },
];
function App() {
  const [category, setCategory] = useState('Everything');
  const [saved, setSaved] = useState<string[]>([]);
  const filtered = useMemo(() => events.filter((event) => category === 'Everything' || event.category === category), [category]);
  function toggle(title: string) { setSaved((items) => items.includes(title) ? items.filter((item) => item !== title) : [...items, title]); }
  return <main className="app-shell" style={{ '--accent': '#397896', '--accent-soft': '#e8f2f7' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">↗</span>Out & About</div><span className="top-note">A good day is just around the corner</span></header>
    <section className="hero"><div><div className="eyebrow">Your city, this week</div><h1>Find your next<br />favorite thing.</h1><p className="subtitle">Small gatherings, new places, and good reasons to get out.</p></div><div className="pill accent">📍 Portland, OR</div></section>
    <section className="card"><div className="card-title"><div><h2>Make a day of it</h2><span className="row-sub">{filtered.length} hand-picked events nearby</span></div><span className="pill">{saved.length} saved</span></div><div className="controls">{['Everything', 'Food', 'Workshop', 'Arts', 'Music', 'Outdoors'].map((item) => <button key={item} className={`button small ${category === item ? '' : 'secondary'}`} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="grid grid-3 section-space">{filtered.map((event) => <article className="card" key={event.title} style={{ padding: 17, background: '#fcfdff' }}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}><span style={{ fontSize: 35 }}>{event.emoji}</span><button className="icon-button" aria-label={`Save ${event.title}`} onClick={() => toggle(event.title)}>{saved.includes(event.title) ? '♥' : '♡'}</button></div><span className="pill accent">{event.category}</span><h3 className="section-space">{event.title}</h3><div className="row-sub">{event.date}</div><div className="row-sub" style={{ marginTop: 6 }}>⌖ {event.place}</div><div className="card-title section-space" style={{ marginBottom: 0 }}><strong>{event.price}</strong><button className="button small secondary" onClick={() => alert(`Details for ${event.title} · ${event.place}`)}>Details</button></div></article>)}</div>
      {!filtered.length && <div className="empty">No events in this category yet.</div>}
    </section>
    <section className="grid grid-2 section-space"><article className="card"><div className="card-title"><h2>Explore the neighborhood</h2><span className="pill">Map preview</span></div><div style={{ minHeight: 150, borderRadius: 13, background: 'radial-gradient(circle at 30% 45%, #e4f0e7 0 11%, transparent 12%), radial-gradient(circle at 68% 32%, #dcecf2 0 15%, transparent 16%), linear-gradient(135deg,#f0f3e8,#e6f0f5)', display: 'grid', placeItems: 'center', color: '#526a71', fontWeight: 700 }}>✦ Riverside · Downtown · Eastside</div></article><article className="card"><div className="eyebrow">A local favorite</div><h2 className="section-space">Little places make big weekends.</h2><p className="subtitle">Discover independent makers, community spaces, and events from people who live here.</p><button className="button section-space" onClick={() => setCategory('Everything')}>See all events</button></article></section>
    <p className="footer-note">Out & About · Sample local listings, no map API required</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
