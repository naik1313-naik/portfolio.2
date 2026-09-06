import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type CursorVariant = 'default' | 'hover' | 'text' | 'hidden'

interface CursorContextValue {
  variant: CursorVariant
  setVariant: (v: CursorVariant) => void
}

const CursorContext = createContext<CursorContextValue | null>(null)

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>('default')

  const value = useMemo(() => ({ variant, setVariant }), [variant])
  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

export function useCursor(): CursorContextValue {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within CursorProvider')
  return ctx
}