import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const I18nCtx = createContext({ t: (k)=>k, locale: 'en-US', setLocale: ()=>{} })

function deepMerge(a, b) {
	const out = { ...a }
	for (const k of Object.keys(b || {})) {
		const v = b[k]
		out[k] = v && typeof v === 'object' && !Array.isArray(v)
			? deepMerge(a?.[k] || {}, v)
			: v
	}
	return out
}

function isRtl(locale) { return locale.startsWith('ar') }

async function loadJsonSafe(path) {
	try {
		const res = await fetch(path, { cache: 'no-store' })
		if (!res.ok) return {}
		return await res.json()
	} catch { return {} }
}

async function loadMessages(locale) {
	const baseApp = await loadJsonSafe('/locales/en-US/app.json')
	const baseCommon = await loadJsonSafe('/locales/en-US/common.json')
	const basePages = await loadJsonSafe('/locales/en-US/pages.json')
	let app = {}, common = {}, pages = {}
	if (locale !== 'en-US') {
		app = await loadJsonSafe(`/locales/${locale}/app.json`)
		common = await loadJsonSafe(`/locales/${locale}/common.json`)
		pages = await loadJsonSafe(`/locales/${locale}/pages.json`)
	}
	return deepMerge(deepMerge(baseApp, app), deepMerge(deepMerge(baseCommon, common), deepMerge(basePages, pages)))
}

export function I18nProvider({ children }) {
	const [locale, setLocale] = useState(localStorage.getItem('ui_locale') || 'en-US')
	const [messages, setMessages] = useState({})
	useEffect(() => {
		let cancelled = false
		;(async () => {
			const data = await loadMessages(locale)
			if (!cancelled) setMessages(data)
		})()
		localStorage.setItem('ui_locale', locale)
		document.documentElement.lang = locale
		document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr'
		return () => { cancelled = true }
	}, [locale])
	function t(key, vars) {
		const parts = key.split('.')
		let cur = messages
		for (const p of parts) cur = cur?.[p]
		if (cur == null) return key
		if (vars) return String(cur).replace(/\{(\w+)\}/g, (_, k)=> vars[k] ?? `{${k}}`)
		return cur
	}
	return (
		<I18nCtx.Provider value={{ t, locale, setLocale }}>
			{children}
		</I18nCtx.Provider>
	)
}

export function useI18n() { return useContext(I18nCtx) }
