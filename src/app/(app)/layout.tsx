import type { Metadata } from 'next'
import React from 'react'
import '../globals.css'
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
          {/* Match reference layout: flex row, sidebar at left, scrollable main content */}
          <div className="h-screen bg-gray-50 flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden bg-white">
              <Topbar />
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 sm:px-6 lg:px-8 py-6">{children}</div>
              </div>
            </main>
          </div>
        </TooltipProvider>
      </body>
    </html>
  )
}
