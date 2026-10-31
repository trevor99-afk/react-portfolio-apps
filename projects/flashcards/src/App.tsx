import { useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
const decks = [
  { name: 'Everyday Spanish', cards: [{ front: 'Good morning', back: 'Buenos días' }, { front: 'See you soon', back: 'Hasta pronto' }, { front: 'A table for two, please', back: 'Una mesa para dos, por favor' }, { front: 'How much does it cost?', back: '¿Cuánto cuesta?' }] },
  { name: 'Design fundamentals', cards: [{ front: 'What is visual hierarchy?', back: 'The arrangement of elements to show their order of importance.' }, { front: 'What does contrast help with?', back: 'It separates visual elements and improves readability.' }, { front: 'What is whitespace?', back: 'The intentional empty space around content.' }] },
];
function App() {
  const [deckIndex, setDeckIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const deck = decks[deckIndex];
  const card = deck.cards[index];
  function nextCard(gotIt: boolean) { if (gotIt) setKnown((value) => value + 1); setFlipped(false); setIndex((value) => (value + 1) % deck.cards.length); }
  function changeDeck(value: number) { setDeckIndex(value); setIndex(0); setFlipped(false); setKnown(0); }
  return <main className="app-shell" style={{ '--accent': '#478270', '--accent-soft': '#e8f2ee' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">✧</span>Recall</div><span className="top-note">Learn a little, remember a lot</span></header>
    <section className="hero"><div><div className="eyebrow">Your study space</div><h1>Make it stick.</h1><p className="subtitle">A few focused minutes today can turn into knowledge that lasts.</p></div><select className="select" style={{ width: 220 }} value={deckIndex} onChange={(e) => changeDeck(Number(e.target.value))} aria-label="Choose a study deck">{decks.map((item, i) => <option value={i} key={item.name}>{item.name}</option>)}</select></section>
    <section className="grid grid-2">
      <article className="card"><div className="card-title"><div><h2>{deck.name}</h2><span className="row-sub">Card {index + 1} of {deck.cards.length}</span></div><span className="pill accent">{known} remembered</span></div><div role="button" tabIndex={0} aria-label="Flip flashcard" onClick={() => setFlipped(!flipped)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFlipped(!flipped); }} style={{ minHeight: 250, borderRadius: 16, padding: 26, display: 'grid', placeItems: 'center', textAlign: 'center', cursor: 'pointer', background: flipped ? '#f5f8f4' : 'var(--accent-soft)', border: '1px solid #e8eee8' }}><div><div className="eyebrow">{flipped ? 'Answer' : 'Prompt'}</div><h2 style={{ fontSize: 27, lineHeight: 1.4, marginTop: 15 }}>{flipped ? card.back : card.front}</h2><div className="row-sub" style={{ marginTop: 20 }}>Tap card to {flipped ? 'see prompt' : 'reveal answer'}</div></div></div><div className="controls section-space" style={{ justifyContent: 'center' }}><button className="button secondary" onClick={() => nextCard(false)}>Still learning</button><button className="button" onClick={() => nextCard(true)}>Got it ✓</button></div><div className="progress section-space"><span style={{ '--progress': `${(index + 1) / deck.cards.length * 100}%` } as CSSProperties} /></div></article>
      <article className="card"><div className="card-title"><div><h2>Your decks</h2><span className="row-sub">Pick a topic and keep going</span></div></div><div className="list">{decks.map((item, i) => <button className="list-row" key={item.name} onClick={() => changeDeck(i)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 0 }}><div className="row-main"><div className="row-title">{item.name}</div><div className="row-sub">{item.cards.length} cards · Beginner</div></div><span className="pill">{i === deckIndex ? 'Studying' : 'Start →'}</span></button>)}</div><div className="card section-space" style={{ background: '#f5f8f5', border: 0 }}><div className="eyebrow">Study tip</div><p style={{ margin: '9px 0 0', lineHeight: 1.6 }}>Try recalling the answer before you flip the card. The effort of remembering is what makes it stick.</p></div></article>
    </section><p className="footer-note">Recall · Sample decks to demonstrate an interactive study flow</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
