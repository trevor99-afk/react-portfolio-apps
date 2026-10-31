import { useMemo, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
const recipes = [
  { name: 'Creamy tomato orzo', time: 25, type: 'Vegetarian', tags: ['tomato', 'pasta', 'spinach'], emoji: '🍅' },
  { name: 'Ginger sesame bowls', time: 30, type: 'High protein', tags: ['rice', 'ginger', 'chicken'], emoji: '🥢' },
  { name: 'Green goddess toast', time: 12, type: 'Vegetarian', tags: ['avocado', 'bread', 'lemon'], emoji: '🥑' },
  { name: 'Coconut chickpea curry', time: 35, type: 'Vegan', tags: ['chickpea', 'coconut', 'spinach'], emoji: '🥥' },
  { name: 'Lemon butter salmon', time: 22, type: 'High protein', tags: ['salmon', 'lemon', 'rice'], emoji: '🍋' },
  { name: 'Berry overnight oats', time: 5, type: 'Vegetarian', tags: ['oats', 'berries', 'milk'], emoji: '🫐' },
];
function App() {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('Everything');
  const [favorites, setFavorites] = useState<string[]>(['Coconut chickpea curry']);
  const [savedOnly, setSavedOnly] = useState(false);
  const filtered = useMemo(() => recipes.filter((recipe) => {
    const matchesText = `${recipe.name} ${recipe.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (diet === 'Everything' || recipe.type === diet) && (!savedOnly || favorites.includes(recipe.name));
  }), [query, diet, favorites, savedOnly]);
  const toggle = (name: string) => setFavorites((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
  return <main className="app-shell" style={{ '--accent': '#bd6448', '--accent-soft': '#f9ece6' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">♨</span>Pantry Pal</div><span className="top-note">A little inspiration for dinner</span></header>
    <section className="hero"><div><div className="eyebrow">Cook with what you have</div><h1>Good food starts<br />in your kitchen.</h1><p className="subtitle">Find something delicious with the ingredients already in your pantry.</p></div><button className={`button ${savedOnly ? '' : 'secondary'}`} onClick={() => setSavedOnly(!savedOnly)}>♡ {savedOnly ? 'Showing saved' : `Saved recipes (${favorites.length})`}</button></section>
    <section className="card"><div className="controls"><input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a dish or ingredient, e.g. tomato..." aria-label="Search recipes" /><select className="select" style={{ width: 170 }} value={diet} onChange={(e) => setDiet(e.target.value)} aria-label="Dietary preference"><option>Everything</option><option>Vegetarian</option><option>Vegan</option><option>High protein</option></select></div><div className="section-space card-title"><div><h2>On the menu</h2><span className="row-sub">{filtered.length} ideas for your next meal</span></div><span className="pill accent">Seasonal picks</span></div>
      <div className="grid grid-3">{filtered.map((recipe) => <article className="card" key={recipe.name} style={{ padding: 17, background: '#fffdfa' }}><div style={{ fontSize: 38, marginBottom: 11 }}>{recipe.emoji}</div><div className="card-title"><span className="pill">{recipe.type}</span><button className="icon-button" aria-label={`Save ${recipe.name}`} onClick={() => toggle(recipe.name)}>{favorites.includes(recipe.name) ? '♥' : '♡'}</button></div><h3>{recipe.name}</h3><div className="row-sub">{recipe.time} min · uses {recipe.tags.slice(0, 2).join(', ')}</div><button className="button ghost section-space" onClick={() => alert(`${recipe.name}: ingredients include ${recipe.tags.join(', ')}.`)}>View recipe →</button></article>)}</div>
      {!filtered.length && <div className="empty">No recipes found. Try another ingredient or filter.</div>}
    </section><p className="footer-note">Pantry Pal · Recipe ideas use sample data</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
