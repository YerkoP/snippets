import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import './App.css'
import { AppSidebar } from './components/app-sidebar'
import { Snippet } from './components/snippet'
import { Header } from './components/header'

function App() {

  return (
    <>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <SidebarInset>
          <Header>
            <SidebarTrigger className="-ml-1" />
          </Header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Snippet title='For loop' description='Basic for loop'></Snippet>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  )
}

export default App
