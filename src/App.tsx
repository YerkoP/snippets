import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import './App.css'
import { AppSidebar } from '@/components/app-sidebar'
import { Snippet } from '@/components/snippet'
import { Header } from '@/components/header'
import { SnippetContext, useSnippet } from '@/hooks/use-snippet'

function App() {
  const { snippets, langs, setSnippets, setLangs } = useSnippet()
  return (
    <>
    <SnippetContext.Provider value={{ snippets, langs, setSnippets, setLangs }}>
      <SidebarProvider>
        <AppSidebar></AppSidebar>
        <SidebarInset>
          <Header>
            <SidebarTrigger className="-ml-1" />
          </Header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {snippets && snippets.map(snippet => (
              <Snippet 
                key={snippet.id}
                id={snippet.id}
                name={snippet.name || ''} 
                description={snippet.description || ''}
                lang={snippet.lang}
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
