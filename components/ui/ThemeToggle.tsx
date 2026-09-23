'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle({ className = 'theme-toggle' }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      window.localStorage.setItem('patidar-history-theme', next ? 'dark' : 'light')
    } catch {}
    setIsDark(next)
  }

  return (
    <button type="button" className={className} onClick={toggle} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={isDark}>
      <Sun />
      <Moon />
    </button>
  )
}

export const themeInitScript = `(function(){try{var t=localStorage.getItem('patidar-history-theme');var wantsDark=t?(t==='dark'):window.matchMedia('(prefers-color-scheme: dark)').matches;if(wantsDark){document.documentElement.classList.add('dark')}}catch(e){}})();`
