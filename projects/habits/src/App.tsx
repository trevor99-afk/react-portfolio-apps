import { useState, type CSSProperties, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
type Habit = { id: number; title: string; note: string; icon: string; done: boolean; streak: number };
function App() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, title: 'Read for 20 minutes', note: 'Make a little space to learn', icon: '📖', done: true, streak: 8 },
    { id: 2, title: 'Take a mindful walk', note: 'Fresh air, no rush', icon: '🚶', done: false, streak: 4 },
    { id: 3, title: 'Drink 8 glasses of water', note: 'One glass at a time', icon: '💧', done: true, streak: 12 },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const completed = habits.filter((habit) => habit.done).length;
  function addHabit(event: FormEvent) {
    event.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), title: newHabit.trim(), note: 'A new daily intention', icon: '✨', done: false, streak: 0 }]);
    setNewHabit('');
  }
  return <main className="app-shell" style={{ '--accent': '#7271b7', '--accent-soft': '#efeffa' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">✦</span>Little Wins</div><span className="top-note">Small steps count</span></header>
    <section className="hero"><div><div className="eyebrow">Tuesday, October 31</div><h1>Show up for<br />yourself today.</h1><p className="subtitle">Progress is built one kind, consistent choice at a time.</p></div><div className="card" style={{ minWidth: 150, textAlign: 'center' }}><div className="stat-value">{completed}<span style={{ color: '#9b9ba8' }}>/{habits.length}</span></div><div className="stat-foot">habits complete</div></div></section>
    <section className="grid grid-2">
      <article className="card"><div className="card-title"><div><h2>Today's intentions</h2><span className="row-sub">A little better than yesterday</span></div><span className="pill accent">{completed === habits.length ? 'All done!' : `${habits.length - completed} to go`}</span></div><div className="list">{habits.map((habit) => <div className="list-row" key={habit.id}><button className={`icon-button ${habit.done ? 'pill accent' : 'pill'}`} aria-label={`Mark ${habit.title} ${habit.done ? 'not done' : 'done'}`} onClick={() => setHabits((items) => items.map((item) => item.id === habit.id ? { ...item, done: !item.done } : item))}>{habit.done ? '✓' : '○'}</button><div className="row-main" style={{ flex: 1 }}><div className="row-title">{habit.icon} {habit.title}</div><div className="row-sub">{habit.note}</div></div><span className="pill">🔥 {habit.streak} days</span></div>)}</div><form className="inline-form section-space" onSubmit={addHabit}><input className="input" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="Add a daily habit..." aria-label="New habit" /><button className="button small">Add</button></form></article>
      <article className="card"><div className="card-title"><div><h2>Your week</h2><span className="row-sub">A steady rhythm beats perfection</span></div></div><div className="list">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <div className="list-row" key={`${day}-${i}`}><div className="row-title">{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][i]}</div><span className={`pill ${i < 2 ? 'accent' : ''}`}>{i < 2 ? `${i === 0 ? habits.length : completed} / ${habits.length} done` : 'Coming up'}</span></div>)}</div><div className="card section-space" style={{ background: '#f8f7ff', border: 0 }}><div className="eyebrow">A gentle reminder</div><p style={{ margin: '9px 0 0', lineHeight: 1.6 }}>You don't have to do it all. Just the next small thing.</p></div></article>
    </section><p className="footer-note">Little Wins · Your habits stay on this demo page</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
