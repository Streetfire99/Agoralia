import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

export default function Dashboard() {
	const [health, setHealth] = useState('…')
	const [usage, setUsage] = useState(null)
	const [error, setError] = useState('')
	useEffect(() => {
		(async () => {
			try {
				const h = await apiFetch('/health')
				setHealth(h?.status || 'ok')
			} catch (e) {
				setHealth('down')
			}
			try {
				const u = await apiFetch('/me/usage')
				setUsage(u)
			} catch (e) {
				setError('Failed to load usage')
			}
		})()
	}, [])
	return (
		<div>
			<h1>Dashboard</h1>
			<p>API health: <strong>{health}</strong></p>
			{usage && (
				<div style={{ marginTop: 8 }}>
					<div>Minutes MTD: {usage.minutes_mtd ?? '—'}</div>
					<div>Minutes Cap: {usage.minutes_cap ?? '—'}</div>
				</div>
			)}
			{error && <p style={{ color: '#b91c1c' }}>{error}</p>}
		</div>
	)
}
