import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Settings from './pages/Settings.jsx'
import Admin from './pages/Admin.jsx'
import { I18nProvider, useI18n } from './lib/i18n.jsx'
import { ToastProvider } from './components/ToastProvider.jsx'
import UsageBar from './components/UsageBar.jsx'

function LangSwitcher() {
	const { locale, setLocale } = useI18n()
	return (
		<select value={locale} onChange={(e)=> setLocale(e.target.value)}>
			<option value="en-US">EN</option>
			<option value="it-IT">IT</option>
			<option value="fr-FR">FR</option>
			<option value="ar-EG">AR</option>
			<option value="hi-IN">HI</option>
		</select>
	)
}

function Nav() {
	const navStyle = { display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee', alignItems:'center' }
	return (
		<nav style={navStyle}>
			<Link to="/">Dashboard</Link>
			<Link to="/leads">Leads</Link>
			<Link to="/settings">Settings</Link>
			<Link to="/admin">Admin</Link>
			<div style={{ marginLeft:'auto', display:'flex', gap:12, alignItems:'center' }}>
				<UsageBar />
				<LangSwitcher />
			</div>
		</nav>
	)
}

function AppShell() {
	const wrap = { maxWidth: 1200, margin: '0 auto', padding: 16 }
	return (
		<div>
			<Nav />
			<main style={wrap}>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/leads" element={<Leads />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</main>
		</div>
	)
}

const rootEl = document.getElementById('root')
if (rootEl) {
	createRoot(rootEl).render(
		<ToastProvider>
			<I18nProvider>
				<BrowserRouter>
					<AppShell />
				</BrowserRouter>
			</I18nProvider>
		</ToastProvider>
	)
}
