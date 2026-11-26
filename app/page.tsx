"use client";

import { useMemo, useState } from "react";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3,
  Bell, Bot, ChevronDown, CircleDollarSign, Clock3, Gauge, Menu,
  RefreshCw, Settings2, ShieldCheck, Signal, TrendingUp, Wallet,
} from "lucide-react";

type Side = "BUY" | "SELL";
type SignalRow = { time: string; side: Side; entry: string; stop: string; target: string; status: "WATCHING" | "WAITING" | "CLOSED" };

const initialSignals: SignalRow[] = [
  { time: "—", side: "BUY", entry: "—", stop: "—", target: "—", status: "WAITING" },
  { time: "—", side: "SELL", entry: "—", stop: "—", target: "—", status: "WAITING" },
];

function Metric({ label, value, detail, icon: Icon }: { label: string; value: string; detail: string; icon: typeof Activity }) {
  return <div className="metric-card"><div className="metric-top"><span>{label}</span><Icon size={17} /></div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div></div>;
}

export default function Home() {
  const [tab, setTab] = useState("Overview");
  const [signals] = useState(initialSignals);
  const [risk, setRisk] = useState("0.5");
  const [market, setMarket] = useState("XAUUSD");
  const [armed, setArmed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastRefresh] = useState("Waiting for market feed");
  const nav = ["Overview", "Live signals", "Backtesting", "Risk controls"];
  const signalCount = useMemo(() => signals.filter(s => s.status === "WATCHING").length, [signals]);

  return (
    <main className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand"><div className="brand-mark"><TrendingUp size={21}/></div><div><b>GOLD<span>SCALPER</span></b><small>TRADING INTELLIGENCE</small></div></div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>{nav.map((item, i) => <button key={item} className={tab === item ? "nav-item active" : "nav-item"} onClick={() => {setTab(item); setMenuOpen(false);}}>{[Gauge, Signal, BarChart3, ShieldCheck].map((I, j) => i === j ? <I key={j} size={17}/> : null)}{item}{item === "Live signals" && <span className="nav-count">{signalCount}</span>}</button>)}</nav>
        <div className="sidebar-bottom"><div className="secure-note"><ShieldCheck size={17}/><div><b>Risk-first execution</b><small>Trading stays manual until configured.</small></div></div><button className="nav-item"><Settings2 size={17}/> Settings</button><div className="profile"><div className="avatar">GS</div><div><b>Trader workspace</b><small>Personal account</small></div><ChevronDown size={15}/></div></div>
      </aside>

      <section className="main-area">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={20}/></button><div className="crumb">Workspace <span>/</span> <b>{tab}</b></div><div className="top-actions"><div className="connection"><span className="pulse-dot"/> FEED NOT CONNECTED</div><button className="icon-btn" aria-label="Notifications"><Bell size={18}/></button><button className="icon-btn" aria-label="Settings"><Settings2 size={18}/></button></div></header>

        <div className="content">
          <div className="page-heading"><div><div className="eyebrow">THURSDAY, 26 NOVEMBER 2026</div><h1>{tab === "Overview" ? "Market overview" : tab}</h1><p>Gold trading workspace · XAUUSD</p></div><div className="heading-actions"><button className="secondary-btn" onClick={() => window.location.reload()}><RefreshCw size={15}/> Refresh</button><button className={armed ? "danger-btn" : "primary-btn"} onClick={() => setArmed(!armed)}><Bot size={16}/>{armed ? "Pause strategy" : "Enable strategy"}</button></div></div>

          <div className="notice"><AlertTriangle size={18}/><div><b>Demo workspace — no broker connected</b><p>Live prices and automated orders are disabled. Connect and validate a data/broker feed before using real funds.</p></div></div>

          <div className="market-strip"><div className="market-select"><span className="gold-icon">Au</span><div><b>{market}</b><small>Gold / US Dollar · Spot</small></div><select value={market} onChange={e => setMarket(e.target.value)} aria-label="Market"><option value="XAUUSD">XAUUSD</option><option value="XAUEUR">XAUEUR</option><option value="XAGUSD">XAGUSD</option></select></div><div className="market-status"><span className="status-dot"/> Market data unavailable</div><div className="updated"><Clock3 size={14}/> {lastRefresh}</div></div>

          <div className="metrics-grid"><Metric label="GOLD PRICE" value="—" detail="Awaiting live market feed" icon={CircleDollarSign}/><Metric label="TODAY'S P&L" value="—" detail="No trading account connected" icon={Wallet}/><Metric label="ACTIVE SIGNALS" value="0" detail="No confirmed setups" icon={Activity}/><Metric label="WIN RATE" value="—" detail="Requires verified trade history" icon={BarChart3}/></div>

          <div className="dashboard-grid">
            <section className="panel chart-panel"><div className="panel-heading"><div><h2>Price action</h2><p>XAUUSD · Candlestick overview</p></div><div className="timeframes"><button>15m</button><button>1H</button><button>4H</button><button className="selected">1D</button></div></div><div className="chart-empty"><div className="chart-icon"><BarChart3 size={27}/></div><b>Waiting for market data</b><span>Connect a trusted price feed to display live gold candles and technical levels.</span><div className="chart-skeleton"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></section>

            <section className="panel signal-panel"><div className="panel-heading"><div><h2>Signal monitor</h2><p>Strategy opportunities</p></div><span className="live-label">● STANDBY</span></div><div className="signal-empty"><div className="signal-ring"><Signal size={24}/></div><b>No validated signals</b><span>Signals will appear after market data and strategy validation are configured.</span></div><div className="panel-foot"><span>Signal engine</span><b className="muted">Not connected</b></div></section>
          </div>

          <div className="lower-grid">
            <section className="panel"><div className="panel-heading"><div><h2>Recent signals</h2><p>Latest strategy output</p></div><button className="text-btn" onClick={() => setTab("Live signals")}>View all <ArrowUpRight size={14}/></button></div><div className="table-wrap"><table><thead><tr><th>TIME</th><th>DIRECTION</th><th>ENTRY</th><th>STOP LOSS</th><th>TAKE PROFIT</th><th>STATUS</th></tr></thead><tbody>{signals.map((s,i)=><tr key={i}><td>{s.time}</td><td><span className="side-pill neutral">{s.side === "BUY" ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>}{s.side}</span></td><td>{s.entry}</td><td>{s.stop}</td><td>{s.target}</td><td><span className="waiting">{s.status}</span></td></tr>)}</tbody></table></div></section>

            <section className="panel risk-panel"><div className="panel-heading"><div><h2>Risk settings</h2><p>Capital protection controls</p></div><ShieldCheck size={18} className="green-icon"/></div><label className="field-label" htmlFor="risk">Risk per trade</label><div className="input-wrap"><input id="risk" type="number" min="0.1" max="1" step="0.1" value={risk} onChange={e=>setRisk(e.target.value)}/><span>%</span></div><div className="risk-hint">Conservative default · Maximum 1% per trade</div><div className="risk-divider"/><div className="risk-row"><span>Automated execution</span><b className="muted">Disabled</b></div><div className="risk-row"><span>Daily loss limit</span><b>Not configured</b></div><div className="risk-row"><span>Stop-loss required</span><b className="green-text">Yes</b></div><button className="secondary-btn full" onClick={()=>setArmed(false)}>Keep execution paused</button></section>
          </div>
          <footer><span>GOLDSCALPER <i>·</i> BUILD 0.1.0</span><span>Trading involves risk. Signals are informational, not financial advice.</span></footer>
        </div>
      </section>
    </main>
  );
}
