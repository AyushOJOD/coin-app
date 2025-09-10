'use client'

import { BlocksHeader } from '@/components/BlocksHeader'
import { BlocksList } from '@/components/BlocksList'
import { useBlocks } from '@/hooks/useBlocks'

export default function Home() {
  const { blocks, error, isManualLoading, isPaused, refreshNow, togglePause } = useBlocks(1000)

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold">Saved Blocks</h1>
        </header>

        <section className="mb-8">
          <BlocksHeader
            isPaused={isPaused}
            isManualLoading={isManualLoading}
            onTogglePause={togglePause}
            onRefresh={refreshNow}
          />
          <BlocksList blocks={blocks} isManualLoading={isManualLoading} error={error} />
        </section>
      </div>
    </div>
  )
}
