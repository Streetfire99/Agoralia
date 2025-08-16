import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

function App() {
	return (
		<div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
			<h1>Agoralia</h1>
			<p>Deployment check OK.</p>
		</div>
	)
}

const rootEl = document.getElementById('root')
if (rootEl) {
	createRoot(rootEl).render(<App />)
}
