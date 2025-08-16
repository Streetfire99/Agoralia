import { Link, Outlet, useLocation } from 'react-router-dom'
import UsageBar from '../components/UsageBar.jsx'

const navItems = [
	{ to:'/', label:'Dashboard', exact:true },
	{ to:'/leads', label:'Leads' },
	{ to:'/settings', label:'Settings' },
	{ to:'/admin', label:'Admin' },
]

export default function Root() {
	const { pathname } = useLocation()
	return (
		<div style={{ display:'grid', gridTemplateColumns:'240px 1fr', minHeight:'100vh' }}>
			<aside style={{ borderRight:'1px solid var(--border)', padding:20 }}>
				<div style={{ fontWeight:800, letterSpacing:.4, marginBottom:18 }}>Agoralia</div>
				<nav style={{ display:'grid', gap:6 }}>
					{navItems.map((n)=>{
						const active = n.exact ? pathname==='/' : pathname.startsWith(n.to)
						return (
							<Link key={n.to} to={n.to} style={{
								padding:'10px 12px', borderRadius:10,
								background: active ? 'var(--surface)' : 'transparent',
								border: active ? '1px solid var(--border)' : '1px solid transparent',
								fontWeight: active ? 700 : 500
							}}>{n.label}</Link>
						)
					})}
				</nav>
			</aside>
			<section>
				<header style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 20px', borderBottom:'1px solid var(--border)' }}>
					<div style={{ marginLeft:'auto' }}><UsageBar /></div>
				</header>
				<div style={{ padding:24, maxWidth:1200, margin:'0 auto' }}>
					<Outlet />
				</div>
			</section>
		</div>
	)
}
