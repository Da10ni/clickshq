import type { Metadata } from 'next'
import React from 'react'
import '../(frontend)/globals.css'
import { Sidebar } from '@/components/app/Sidebar'
import { Topbar } from '@/components/app/Topbar'
import { TooltipProvider } from '@/components/ui/Tooltip'

export const metadata: Metadata = {
  title: { default: 'clicsHQ', template: '%s | clicsHQ' },
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased" suppressHydrationWarning>
        <TooltipProvider delayDuration={150}>
          <div className="flex min-h-screen bg-sidebar">
            <Sidebar />

            {/* Main content surface — white card with rounded corners on the outside */}
            <div className="flex-1 flex flex-col bg-white rounded-l-3xl overflow-hidden">
              <Topbar />
              <main className="flex-1 overflow-y-auto">
                <div className="px-4 sm:px-6 lg:px-8 py-6">{children}</div>
              </main>
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
