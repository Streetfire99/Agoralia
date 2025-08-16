import { Link, Outlet } from 'react-router-dom'
import UsageBar from '../components/UsageBar.jsx'

export default function Root() {
	return (
		<div style={{ display:'grid', gridTemplateColumns:'220px 1fr', minHeight:'100vh' }}>
			<aside style={{ borderRight:'1px solid #eee', padding:16 }}>
				<h2 style={{ marginTop:0 }}>Agoralia</h2>
				<nav style={{ display:'grid', gap:8 }}>
					<Link to="/">Dashboard</Link>
					<Link to="/leads">Leads</Link>
					<Link to="/settings">Settings</Link>
					<Link to="/admin">Admin</Link>
				</nav>
			</aside>
			<section>
				<header style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', borderBottom:'1px solid #eee' }}>
					<div style={{ marginLeft:'auto' }}><UsageBar /></div>
				</header>
				<div style={{ padding:24 }}>
					<Outlet />
				</div>
			</section>
		</div>
	)
}
