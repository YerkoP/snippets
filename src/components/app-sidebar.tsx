import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar'
import { SearchForm } from '@/components/search-form'
import { SnippetContext } from '@/hooks/use-snippet'
import { useContext, useEffect, useState } from 'react'

export function AppSidebar() {
  const { snippets } = useContext(SnippetContext)
  const [ langs, setLangs ] = useState<any[]>([])

  useEffect(() => {
    if (snippets) {
      const tmpLangs: any[] = []
      for (const snippet of snippets) {
        const index = tmpLangs.findIndex(l => l.id === snippet.lang)
        if (tmpLangs[index]) {
          if (!tmpLangs[index].count) {
            tmpLangs[index].count = 0
          }
          tmpLangs[index].count++
        } else {
          tmpLangs.push({
            id: snippet.lang,
            name: snippet.lang,
            count: 1
          })
        }
      }
      setLangs(tmpLangs)
    }
  }, [snippets])
  return (
    <Sidebar>
      <SidebarHeader>
        <SearchForm/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
          <SidebarMenu>
              {langs?.filter(item => item.count > 0).map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
