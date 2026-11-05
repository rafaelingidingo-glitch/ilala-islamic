'use client'

/**
 * Tiny cached data-fetching hook used by the public pages.
 *
 * Public content (news, events, staff) is served by the API from the
 * database, so school staff can manage it from the admin panel. If the API
 * is unreachable or the database is empty, the hook falls back to the static
 * sample content in `src/data/site-content.ts` so the site never breaks.
 *
 * Results are cached per-URL in module scope, so switching between pages in
 * the SPA does not refetch or flash loading states.
 */

import { useEffect, useState } from 'react'

const cache = new Map<string, unknown>()

interface ApiEnvelope<T> {
  ok: boolean
  data: T
}

export function useApiData<T>(url: string, fallback: T, deps: unknown[] = []) {
  const [data, setData] = useState<T>(() => (cache.get(url) as T | undefined) ?? fallback)
  const [loading, setLoading] = useState(!cache.has(url))
  const [stale, setStale] = useState(false) // true when showing fallback due to an error

  useEffect(() => {
    let cancelled = false

    async function load() {
      // Fresh values in cache win over the static fallback.
      if (cache.has(url)) {
        setData(cache.get(url) as T)
        setStale(false)
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = (await res.json()) as ApiEnvelope<T>
        if (!json.ok) throw new Error('API error')
        // Empty array from a fresh database → keep sample content so the
        // demo site never looks broken.
        const empty = Array.isArray(json.data) && json.data.length === 0
        if (empty) throw new Error('No data yet')
        cache.set(url, json.data)
        if (!cancelled) {
          setData(json.data)
          setStale(false)
        }
      } catch {
        if (!cancelled) setStale(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [url, ...deps])

  return { data, loading, stale }
}

/**
 * Drop cached API responses — called by the admin panel after content
 * changes so the public pages immediately show fresh data.
 */
export function clearApiCache(prefix?: string) {
  if (!prefix) {
    cache.clear()
    return
  }
  for (const key of Array.from(cache.keys())) {
    if (key.startsWith(prefix)) cache.delete(key)
  }
}
