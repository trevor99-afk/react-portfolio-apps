import { useState, type CSSProperties, type FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import '../../../shared.css';
type Finding = { severity: 'Needs attention' | 'Good practice'; title: string; detail: string; line: number };
const sample = `<html>
<main>
  <h1>Welcome to our site</h1>
  <img src="team.jpg">
  <p>We make useful things for everyone.</p>
  <input type="text" placeholder="Your name">
  <h3>Our services</h3>
</main>
</html>`;
function inspect(html: string): Finding[] {
  const findings: Finding[] = [];
  const lines = html.split(/\r?\n/);
  const lineOf = (pattern: RegExp) => Math.max(1, lines.findIndex((line) => pattern.test(line)) + 1);
  if (/<html\b/i.test(html) && !/<html\b[^>]*\blang\s*=/i.test(html)) findings.push({ severity: 'Needs attention', title: 'Document language is not set', detail: 'Add a valid lang attribute to the html element so screen readers can pronounce content correctly.', line: lineOf(/<html\b/i) });
  if (/<img\b(?![^>]*\balt\s*=)[^>]*>/i.test(html)) findings.push({ severity: 'Needs attention', title: 'Image is missing alternative text', detail: 'Add descriptive alt text, or alt="" when the image is decorative.', line: lineOf(/<img\b(?![^>]*\balt\s*=)/i) });
  if (/<input\b(?![^>]*\baria-label\s*=)(?![^>]*\baria-labelledby\s*=)[^>]*>/i.test(html) && !/<label\b/i.test(html)) findings.push({ severity: 'Needs attention', title: 'Form control may not have a label', detail: 'Associate a label element with the input, or provide an accessible name with aria-label.', line: lineOf(/<input\b/i) });
  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((match) => ({ level: Number(match[1]), index: match.index ?? 0 }));
  const skipped = headings.find((heading, i) => i > 0 && heading.level > headings[i - 1].level + 1);
  if (skipped) findings.push({ severity: 'Needs attention', title: 'Heading levels appear to skip', detail: 'Use headings in a logical order so people can navigate the page structure.', line: html.slice(0, skipped.index).split(/\r?\n/).length });
  if (!findings.length) findings.push({ severity: 'Good practice', title: 'No common issues detected', detail: 'This quick check did not find the patterns it looks for. Manual testing is still important.', line: 1 });
  return findings;
}
function App() {
  const [html, setHtml] = useState(sample);
  const [findings, setFindings] = useState<Finding[]>([]);
  function runCheck(event: FormEvent) { event.preventDefault(); setFindings(inspect(html)); }
  return <main className="app-shell" style={{ '--accent': '#6758a6', '--accent-soft': '#f0edfa' } as CSSProperties}>
    <header className="topbar"><div className="brand"><span className="brand-mark">◉</span>A11y Lens</div><span className="top-note">A clearer web is a kinder web</span></header>
    <section className="hero"><div><div className="eyebrow">Accessibility quick check</div><h1>Find barriers.<br />Make room for all.</h1><p className="subtitle">Paste a small HTML snippet to check for a few common accessibility patterns.</p></div><span className="pill accent">Runs in your browser</span></section>
    <section className="grid grid-2"><form className="card" onSubmit={runCheck}><div className="card-title"><div><h2>Your HTML</h2><span className="row-sub">Nothing is uploaded or stored</span></div><button type="button" className="button small secondary" onClick={() => { setHtml(sample); setFindings([]); }}>Load sample</button></div><label className="field">HTML snippet<textarea className="textarea" value={html} onChange={(e) => setHtml(e.target.value)} spellCheck={false} /></label><button className="button section-space" type="submit">Check snippet →</button></form>
      <article className="card"><div className="card-title"><div><h2>Findings</h2><span className="row-sub">{findings.length ? `${findings.length} check${findings.length === 1 ? '' : 's'} returned` : 'Run a check to see results'}</span></div>{findings.some((f) => f.severity === 'Needs attention') && <span className="pill warning">Review needed</span>}</div>{findings.length ? <div className="list">{findings.map((finding, i) => <div className="list-row" key={`${finding.title}-${i}`} style={{ alignItems: 'start' }}><span className={`pill ${finding.severity === 'Good practice' ? 'accent' : 'warning'}`}>{finding.severity === 'Good practice' ? '✓' : '!'}</span><div className="row-main"><div className="row-title">{finding.title}</div><div className="row-sub" style={{ lineHeight: 1.6 }}>{finding.detail}</div><div className="row-sub section-space">Approx. line {finding.line}</div></div></div>)}</div> : <div className="empty">Your results will appear here.</div>}<div className="card section-space" style={{ background: '#f8f7fc', border: 0 }}><div className="eyebrow">Important</div><p style={{ margin: '8px 0 0', fontSize: 13, lineHeight: 1.6 }}>This demo checks a few source patterns only. It is not a full audit and cannot replace keyboard, screen-reader, and user testing.</p></div></article></section>
    <p className="footer-note">A11y Lens · Educational demo, not compliance certification</p>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App />);
