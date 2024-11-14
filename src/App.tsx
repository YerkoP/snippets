import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import './App.css'
import { AppSidebar } from './components/app-sidebar'
import { Snippet } from './components/snippet'

function App() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Snippet title='For loop' description='Basic for loop'></Snippet>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default App
