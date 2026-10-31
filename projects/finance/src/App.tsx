import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';

type Transaction = { id: number; name: string; category: string; date: string; amount: number };
const initial: Transaction[] = [
  { id: 1, name: 'Weekly groceries', category: 'Food', date: 'Today', amount: -68.42 },
  { id: 2, name: 'Monthly salary', category: 'Income', date: 'Yesterday', amount: 3200 },
  { id: 3, name: 'Metro pass', category: 'Travel', date: 'Oct 28', amount: -42 },
  { id: 4, name: 'Coffee & pastry', category: 'Food', date: 'Oct 27', amount: -9.8 },
];
function App() {
  const [transactions, setTransactions] = useState(initial);
  const [filter, setFilter] = useState('All');
  const [name, setName] = useState('');
  const expenses = transactions.filter((item) => item.amount < 0).reduce((sum, item) => sum - item.amount, 0);
  const visible = useMemo(() => transactions.filter((item) => filter === 'All' || item.category === filter), [transactions, filter]);
  function addExpense(event: FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setTransactions([{ id: Date.now(), name: name.trim(), category: 'Other', date: 'Today', amount: -18.5 }, ...transactions]);
    setName('');
  }
  return <main className="app-shell" style={{ '--accent': '#39836d', '--accent-soft': '#e6f2ed' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">$</span>Pocketwise</div><span className="top-note">Your money, in focus · October</span></header>
    <section className="hero"><div><div className="eyebrow">Good morning, Alex</div><h1>Make room for<br />what matters.</h1><p className="subtitle">A clearer view of your money helps you spend with intention.</p></div><span className="pill accent">● All accounts connected</span></section>
    <section className="grid grid-3">
      <article className="card"><div className="stat-label">Available balance</div><div className="stat-value">$4,280.50</div><div className="stat-foot">↑ 8.2% from last month</div></article>
      <article className="card"><div className="stat-label">Spent this month</div><div className="stat-value">${expenses.toFixed(2)}</div><div className="stat-foot">of $2,400 monthly budget</div><div className="progress section-space"><span style={{ '--progress': `${Math.min(expenses / 2400 * 100, 100)}%` } as CSSProperties} /></div></article>
      <article className="card"><div className="stat-label">Savings goal</div><div className="stat-value">$1,840 <small style={{ fontSize: 14, color: '#78827d' }}>/ $3,000</small></div><div className="stat-foot">Emergency fund · 61% there</div><div className="progress section-space"><span style={{ '--progress': '61%' } as CSSProperties} /></div></article>
    </section>
    <section className="grid grid-2 section-space">
      <article className="card"><div className="card-title"><div><h2>Spending rhythm</h2><span className="row-sub">Weekly activity</span></div><span className="pill">Last 6 weeks</span></div><div className="bar-chart">{[48, 73, 38, 88, 59, 66].map((height, i) => <div className="bar" key={i} style={{ height: `${height}%` }}><span>{['Sep 23', 'Sep 30', 'Oct 7', 'Oct 14', 'Oct 21', 'Oct 28'][i]}</span></div>)}</div></article>
      <article className="card"><div className="card-title"><h2>Recent activity</h2><select className="select" aria-label="Filter category" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 125, padding: 8 }}><option>All</option>{['Food', 'Income', 'Travel', 'Other'].map((value) => <option key={value}>{value}</option>)}</select></div><div className="list">{visible.map((item) => <div className="list-row" key={item.id}><div className="row-main"><div className="row-title">{item.name}</div><div className="row-sub">{item.category} · {item.date}</div></div><strong style={{ color: item.amount > 0 ? '#39836d' : '#28352e' }}>{item.amount > 0 ? '+' : '−'}${Math.abs(item.amount).toFixed(2)}</strong></div>)}</div><form className="inline-form section-space" onSubmit={addExpense}><input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Add a quick expense..." aria-label="Expense name" /><button className="button small">Add $18.50</button></form></article>
    </section>
    <p className="footer-note">Pocketwise · Sample data for portfolio demonstration</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
