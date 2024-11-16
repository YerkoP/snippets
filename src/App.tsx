import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import './App.css'
import { AppSidebar } from '@/components/app-sidebar'
import { Snippet } from '@/components/snippet'
import { Header } from '@/components/header'
import { SnippetContext, useSnippet } from '@/hooks/use-snippet'

function App() {
  const { snippets, langs } = useSnippet()
  return (
    <>
    <SnippetContext.Provider value={{ snippets, langs }}>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <SidebarInset>
          <Header>
            <SidebarTrigger className="-ml-1" />
          </Header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {snippets && snippets.map(snippet => (
              <Snippet 
                key={snippet.name}
                name={snippet.name || ''} 
                description={snippet.description || ''}
                rawCode={snippet.rawCode}></Snippet>
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SnippetContext.Provider>
    </>
  )
}

export default App
