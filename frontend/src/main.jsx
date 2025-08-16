import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Settings from './pages/Settings.jsx'
import Admin from './pages/Admin.jsx'
import { I18nProvider } from './lib/i18n.jsx'
import { ToastProvider } from './components/ToastProvider.jsx'
import Root from './layouts/Root.jsx'

const rootEl = document.getElementById('root')
if (rootEl) {
	createRoot(rootEl).render(
		<ToastProvider>
			<I18nProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<Root />}>
							<Route index element={<Dashboard />} />
							<Route path="leads" element={<Leads />} />
							<Route path="settings" element={<Settings />} />
							<Route path="admin" element={<Admin />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</I18nProvider>
		</ToastProvider>
	)
}
