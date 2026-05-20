'use client'

import * as React from 'react'
import { Search, Plus, Bell, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/cn'

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 bg-white">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Spacer to push search to centre on wider screens */}
        <div className="flex-1" />

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search Task"
            className={cn(
              'h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-ink',
              'placeholder:text-muted',
              'focus:outline-none focus:ring-2 focus:ring-ink/20 focus:border-ink/40 transition-colors',
            )}
          />
        </div>

        {/* Create */}
        <Button size="md" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Create
        </Button>

        {/* Spacer */}
        <div className="flex-1 flex items-center justify-end gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-gray-100 hover:text-ink transition-colors"
            aria-label="Help"
          >
            <HelpCircle className="h-[18px] w-[18px]" />
          </button>

          {/* Notification bell */}
          <button
            type="button"
            className="relative grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-gray-100 hover:text-ink transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            <Badge
              variant="warning"
              size="sm"
              className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 ring-2 ring-white"
            >
              12
            </Badge>
          </button>

          {/* User avatar */}
          <button
            type="button"
            className="rounded-full ring-2 ring-pink-300 hover:ring-pink-400 transition-colors"
            aria-label="Account menu"
          >
            <Avatar size="md">
              <AvatarImage src="" alt="" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>
    </header>
  )
}
