import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { I18nProvider } from './lib/i18n.jsx'
import { ToastProvider } from './components/ToastProvider.jsx'
import Root from './layouts/Root.jsx'

const modules = import.meta.glob('./pages/*.jsx', { eager: true })
const pages = Object.entries(modules)
	.map(([path, mod]) => {
		const file = path.split('/').pop() || ''
		const name = file.replace(/\.jsx$/,'')
		return { name, Component: mod.default }
	})
	.filter(p => typeof p.Component === 'function')

function slugify(name){
	return name.toLowerCase()
}

const rootEl = document.getElementById('root')
if (rootEl) {
	createRoot(rootEl).render(
		<ToastProvider>
			<I18nProvider>
				<BrowserRouter>
					<Routes>
						<Route element={<Root />}> {/* layout */}
							{pages.map(({ name, Component }) => (
								name === 'Dashboard'
									? <Route key={name} index element={<Component />} />
									: <Route key={name} path={slugify(name)} element={<Component />} />
							))}
							<Route path="*" element={<Navigate to="/" replace />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</I18nProvider>
		</ToastProvider>
	)
}
