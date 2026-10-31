import { useMemo, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
const products = [
  { id: 1, name: 'Sunday ceramic mug', type: 'Home', price: 28, emoji: '☕', color: '#f5eee4' },
  { id: 2, name: 'Soft days journal', type: 'Stationery', price: 18, emoji: '📓', color: '#e9edf7' },
  { id: 3, name: 'Wildflower candle', type: 'Home', price: 32, emoji: '🕯️', color: '#f4e8e3' },
  { id: 4, name: 'Everyday tote', type: 'Accessories', price: 24, emoji: '👜', color: '#e9f0e8' },
  { id: 5, name: 'Little moments print', type: 'Art', price: 36, emoji: '🖼️', color: '#f6efdb' },
  { id: 6, name: 'Desk garden kit', type: 'Home', price: 22, emoji: '🌱', color: '#e8f0e8' },
];
function App() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [category, setCategory] = useState('Everything');
  const [cartOpen, setCartOpen] = useState(false);
  const shown = products.filter((product) => category === 'Everything' || product.type === category);
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = useMemo(() => products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0), [cart]);
  const change = (id: number, diff: number) => setCart((items) => ({ ...items, [id]: Math.max(0, (items[id] || 0) + diff) }));
  return <main className="app-shell" style={{ '--accent': '#b56064', '--accent-soft': '#f8ebeb' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">✿</span>Good Things</div><button className="button secondary" onClick={() => setCartOpen(!cartOpen)}>Bag ({count}) · ${total.toFixed(2)}</button></header>
    <section className="hero"><div><div className="eyebrow">Thoughtful things for everyday</div><h1>A little joy,<br />delivered.</h1><p className="subtitle">Small-batch goods, made with care and chosen to bring a little warmth to your day.</p></div><span className="pill accent">Complimentary shipping over $60</span></section>
    {cartOpen && <article className="card section-space"><div className="card-title"><h2>Your bag</h2><button className="button small secondary" onClick={() => setCartOpen(false)}>Close</button></div>{count === 0 ? <p className="subtitle">Your bag is waiting for something lovely.</p> : <><div className="list">{products.filter((item) => cart[item.id]).map((item) => <div className="list-row" key={item.id}><div className="row-main"><div className="row-title">{item.name}</div><div className="row-sub">${item.price} each</div></div><div className="controls"><button className="button small secondary" onClick={() => change(item.id, -1)} aria-label="Remove one">−</button><strong>{cart[item.id]}</strong><button className="button small secondary" onClick={() => change(item.id, 1)} aria-label="Add one">+</button></div></div>)}</div><div className="card-title section-space"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div><button className="button" onClick={() => alert('Demo checkout — your bag is ready!')}>Continue to checkout</button></>}</article>}
    <section className="card section-space"><div className="card-title"><div><h2>Made for your everyday</h2><span className="row-sub">A few of our current favorites</span></div></div><div className="controls">{['Everything', 'Home', 'Stationery', 'Accessories', 'Art'].map((item) => <button key={item} className={`button small ${category === item ? '' : 'secondary'}`} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="grid grid-3 section-space">{shown.map((product) => <article className="card" key={product.id} style={{ padding: 14, boxShadow: 'none' }}><div style={{ background: product.color, minHeight: 135, borderRadius: 13, display: 'grid', placeItems: 'center', fontSize: 48 }}>{product.emoji}</div><div className="row-sub section-space">{product.type}</div><div className="card-title" style={{ marginBottom: 0, marginTop: 6 }}><h3>{product.name}</h3><strong>${product.price}</strong></div><button className="button small secondary section-space" onClick={() => change(product.id, 1)}>Add to bag {cart[product.id] ? `· ${cart[product.id]} in bag` : ''}</button></article>)}</div></section>
    <p className="footer-note">Good Things · Demo storefront, no real payments</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
