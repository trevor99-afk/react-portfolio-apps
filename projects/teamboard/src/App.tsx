import { useState, type CSSProperties, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
type Task = { id: number; title: string; tag: string; owner: string; status: string };
const columns = ['To do', 'In progress', 'Done'];
function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Gather inspiration for the new landing page', tag: 'Design', owner: 'AM', status: 'To do' },
    { id: 2, title: 'Map out the onboarding flow', tag: 'Product', owner: 'JK', status: 'To do' },
    { id: 3, title: 'Build responsive navigation', tag: 'Engineering', owner: 'SL', status: 'In progress' },
    { id: 4, title: 'Share first-round concepts', tag: 'Design', owner: 'AM', status: 'Done' },
  ]);
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Product');
  function addTask(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: title.trim(), tag, owner: 'ME', status: 'To do' }]);
    setTitle('');
  }
  function move(id: number, status: string) { setTasks((items) => items.map((task) => task.id === id ? { ...task, status } : task)); }
  return <main className="app-shell" style={{ '--accent': '#587b91', '--accent-soft': '#eaf1f5' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">▦</span>Teamspace</div><span className="top-note">Studio North · Website refresh</span></header>
    <section className="hero"><div><div className="eyebrow">Workspace / Projects</div><h1>Website refresh</h1><p className="subtitle">A little structure makes room for great work.</p></div><div className="controls"><span className="pill">👥 4 teammates</span><button className="button" onClick={() => document.getElementById('task-title')?.focus()}>＋ Add task</button></div></section>
    <section className="grid grid-3">{columns.map((column) => <article className="card" key={column}><div className="card-title"><div><h2>{column}</h2><span className="row-sub">{tasks.filter((task) => task.status === column).length} tasks</span></div><span className="pill">{column === 'Done' ? '✓' : '···'}</span></div><div className="list">{tasks.filter((task) => task.status === column).map((task) => <article className="card" key={task.id} style={{ padding: 15, boxShadow: 'none' }}><div className="card-title"><span className="pill accent">{task.tag}</span><button className="icon-button" aria-label="Task options" onClick={() => setTasks((items) => items.filter((item) => item.id !== task.id))}>×</button></div><div className="row-title" style={{ lineHeight: 1.5 }}>{task.title}</div><div className="card-title section-space" style={{ marginBottom: 0 }}><span className="pill">{task.owner}</span>{column !== 'Done' && <button className="button small secondary" onClick={() => move(task.id, columns[columns.indexOf(column) + 1])}>Move →</button>}</div></article>)}</div></article>)}</section>
    <form className="card controls section-space" onSubmit={addTask}><input id="task-title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to get done?" aria-label="Task title" /><select className="select" style={{ width: 145 }} value={tag} onChange={(e) => setTag(e.target.value)} aria-label="Task category"><option>Product</option><option>Design</option><option>Engineering</option></select><button className="button">Create task</button></form>
    <p className="footer-note">Teamspace · Tasks are local to this demo and reset on refresh</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
