import { useMemo, useState, type CSSProperties, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
type Job = { id: number; company: string; role: string; status: string; date: string; note: string };
const statuses = ['Interested', 'Applied', 'Interview', 'Offer'];
function App() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, company: 'Figma', role: 'Product Designer', status: 'Interview', date: 'Oct 29', note: 'Portfolio review next week' },
    { id: 2, company: 'Linear', role: 'Frontend Engineer', status: 'Applied', date: 'Oct 27', note: 'Follow up Friday' },
    { id: 3, company: 'Notion', role: 'UX Researcher', status: 'Interested', date: 'Oct 25', note: 'Ask Maya for referral' },
    { id: 4, company: 'Vercel', role: 'Product Designer', status: 'Offer', date: 'Oct 22', note: 'Review offer details' },
    { id: 5, company: 'Webflow', role: 'Design Engineer', status: 'Applied', date: 'Oct 21', note: 'Remote-friendly team' },
  ]);
  const [query, setQuery] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const visible = useMemo(() => jobs.filter((job) => `${job.company} ${job.role}`.toLowerCase().includes(query.toLowerCase())), [jobs, query]);
  function add(event: FormEvent) {
    event.preventDefault();
    if (!company.trim() || !role.trim()) return;
    setJobs([{ id: Date.now(), company: company.trim(), role: role.trim(), status: 'Interested', date: 'Today', note: 'Add a follow-up note' }, ...jobs]);
    setCompany(''); setRole('');
  }
  function advance(id: number, status: string) {
    setJobs((items) => items.map((job) => job.id === id ? { ...job, status: statuses[(statuses.indexOf(status) + 1) % statuses.length] } : job));
  }
  return <main className="app-shell" style={{ '--accent': '#a66c3f', '--accent-soft': '#f7eee6' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">↗</span>Next Step</div><span className="top-note">Your search, with a little more clarity</span></header>
    <section className="hero"><div><div className="eyebrow">Career dashboard</div><h1>Keep good things<br />moving forward.</h1><p className="subtitle">A calm home for every opportunity, follow-up, and next step.</p></div><button className="button" onClick={() => document.getElementById('add-company')?.focus()}>＋ Add application</button></section>
    <section className="grid grid-4"><article className="card"><div className="stat-label">In your pipeline</div><div className="stat-value">{jobs.length}</div><div className="stat-foot">opportunities</div></article>{statuses.slice(1).map((status) => <article className="card" key={status}><div className="stat-label">{status === 'Applied' ? 'Applications sent' : status === 'Interview' ? 'Interviews' : 'Offers'}</div><div className="stat-value">{jobs.filter((job) => job.status === status).length}</div><div className="stat-foot">keep the momentum going</div></article>)}</section>
    <article className="card section-space"><div className="card-title"><div><h2>Your opportunities</h2><span className="row-sub">Move a role to the next stage as you progress</span></div><input className="input" style={{ width: 220 }} placeholder="Search companies..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search jobs" /></div><div className="grid grid-3">{statuses.map((status) => <section key={status}><div className="card-title"><span className="pill accent">{status}</span><span className="row-sub">{visible.filter((job) => job.status === status).length}</span></div><div className="list">{visible.filter((job) => job.status === status).map((job) => <article className="card" key={job.id} style={{ padding: 15, boxShadow: 'none' }}><div className="row-title">{job.company}</div><div className="row-sub">{job.role} · {job.date}</div><div className="pill section-space">{job.note}</div><button className="button small secondary section-space" onClick={() => advance(job.id, job.status)}>Move to {statuses[(statuses.indexOf(job.status) + 1) % statuses.length]} →</button></article>)}</div></section>)}</div>
      <form className="controls section-space" onSubmit={add}><input id="add-company" className="input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" aria-label="Company" /><input className="input" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" aria-label="Role" /><button className="button">Add to pipeline</button></form>
    </article><p className="footer-note">Next Step · Keep your career search organized</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
