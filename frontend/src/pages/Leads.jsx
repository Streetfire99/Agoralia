import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

export default function Leads() {
	const [q, setQ] = useState('')
	const [rows, setRows] = useState([])
	const [loading, setLoading] = useState(false)
	async function search() {
		setLoading(true)
		try {
			const data = await apiFetch(`/leads?q=${encodeURIComponent(q)}`)
			setRows(Array.isArray(data?.items) ? data.items : [])
		} catch (e) {
			setRows([])
		} finally { setLoading(false) }
	}
	useEffect(() => { search() }, [])
	return (
		<div>
			<h1>Leads</h1>
			<div style={{ display:'flex', gap:8, margin:'8px 0' }}>
				<input className="input" placeholder="Search" value={q} onChange={(e)=> setQ(e.target.value)} />
				<button className="btn" onClick={search} disabled={loading}>{loading ? 'Loading…' : 'Search'}</button>
			</div>
			<table className="table">
				<thead><tr><th>Name</th><th>Phone</th><th>Status</th></tr></thead>
				<tbody>
					{rows.map((r,i)=> (<tr key={i}><td>{r.name ?? '—'}</td><td className="preserve-ltr">{r.phone ?? '—'}</td><td>{r.status ?? '—'}</td></tr>))}
					{!rows.length && !loading && <tr><td colSpan="3">No leads</td></tr>}
				</tbody>
			</table>
		</div>
	)
}
