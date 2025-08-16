import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LOCALES = ['en-US','it-IT','fr-FR','ar-EG','hi-IN']
const modules = import.meta.glob('../locales/**/*.json', { eager: true })

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

function isRtl(locale) {
	return locale.startsWith('ar')
}

const I18nCtx = createContext({ t: (k)=>k, locale: 'en-US', setLocale: ()=>{} })

export function I18nProvider({ children }) {
	const [locale, setLocale] = useState(localStorage.getItem('ui_locale') || 'en-US')
	const messages = useMemo(() => {
		const [lang, region] = locale.split('-')
		const base = modules[`../locales/en-US/app.json`]?.default || {}
		const baseCommon = modules[`../locales/en-US/common.json`]?.default || {}
		const basePages = modules[`../locales/en-US/pages.json`]?.default || {}
		const locApp = modules[`../locales/${locale}/app.json`]?.default || modules[`../locales/${lang}-${region}/app.json`]?.default || {}
		const locCommon = modules[`../locales/${locale}/common.json`]?.default || modules[`../locales/${lang}-${region}/common.json`]?.default || {}
		const locPages = modules[`../locales/${locale}/pages.json`]?.default || modules[`../locales/${lang}-${region}/pages.json`]?.default || {}
		return deepMerge(deepMerge(base, locApp), deepMerge(deepMerge(baseCommon, locCommon), deepMerge(basePages, locPages)))
	}, [locale])
	useEffect(() => {
		localStorage.setItem('ui_locale', locale)
		document.documentElement.lang = locale
		document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr'
	}, [locale])
	function t(key, vars) {
		const parts = key.split('.')
		let cur = messages
		for (const p of parts) cur = cur?.[p]
		if (cur == null) return key
		if (vars) {
			return String(cur).replace(/\{(\w+)\}/g, (_, k)=> vars[k] ?? `{${k}}`)
		}
		return cur
	}
	return (
		<I18nCtx.Provider value={{ t, locale, setLocale }}>
			{children}
		</I18nCtx.Provider>
	)
}

export function useI18n() { return useContext(I18nCtx) }
