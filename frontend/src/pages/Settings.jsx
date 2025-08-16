import { useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

export default function Settings() {
	const [loading, setLoading] = useState(true)
	const [workspaceName, setWorkspaceName] = useState('')
	const [timezone, setTimezone] = useState('')
	const [saving, setSaving] = useState(false)
	const [msg, setMsg] = useState('')
	useEffect(() => {
		(async () => {
			try {
				const g = await apiFetch('/settings/general')
				setWorkspaceName(g?.workspace_name || '')
				setTimezone(g?.timezone || '')
			} finally { setLoading(false) }
		})()
	}, [])
	async function save() {
		setSaving(true); setMsg('')
		try {
			await apiFetch('/settings/general', { method:'PUT', body: { workspace_name: workspaceName, timezone }})
			setMsg('Saved')
		} catch(e) {
			setMsg('Error saving')
		} finally { setSaving(false) }
	}
	if (loading) return <div><h1>Settings</h1><p>Loading…</p></div>
	return (
		<div>
			<h1>Settings</h1>
			<div style={{ display:'grid', gap:8, maxWidth: 460 }}>
				<label>Workspace Name<input className="input" value={workspaceName} onChange={(e)=> setWorkspaceName(e.target.value)} /></label>
				<label>Timezone<input className="input" value={timezone} onChange={(e)=> setTimezone(e.target.value)} /></label>
				<div style={{ display:'flex', gap:8 }}>
					<button className="btn" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
					{msg && <span className="kpi-title">{msg}</span>}
				</div>
			</div>
		</div>
	)
}
