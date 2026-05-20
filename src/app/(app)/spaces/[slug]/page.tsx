'use client'

import { notFound, useParams } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { SpaceHeader } from '@/components/app/spaces/SpaceHeader'
import { OverviewView } from '@/components/app/spaces/OverviewView'
import { ListView } from '@/components/app/spaces/ListView'
import { KanbanView } from '@/components/app/spaces/KanbanView'
import { CalendarView } from '@/components/app/spaces/CalendarView'
import { GanttView } from '@/components/app/spaces/GanttView'
import { getSpace, getSpaceTasks } from '@/data/mock'

export default function SpaceDetailPage() {
  const params = useParams<{ slug: string }>()
  const space = getSpace(params.slug)
  if (!space) notFound()
  const tasks = getSpaceTasks(space.slug)

  return (
    <div className="space-y-6">
      <SpaceHeader space={space} />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="gantt">Gantt Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewView space={space} tasks={tasks} />
        </TabsContent>
        <TabsContent value="list">
          <ListView tasks={tasks} />
        </TabsContent>
        <TabsContent value="kanban">
          <KanbanView tasks={tasks} />
        </TabsContent>
        <TabsContent value="calendar">
          <CalendarView tasks={tasks} />
        </TabsContent>
        <TabsContent value="gantt">
          <GanttView tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
