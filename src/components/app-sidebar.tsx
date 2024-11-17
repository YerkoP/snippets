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
import { useContext } from 'react'
import { SnippetContext } from '@/hooks/use-snippet'

export function AppSidebar() {
  const snippetContext = useContext(SnippetContext)

  return (
    <Sidebar>
      <SidebarHeader>
        <SearchForm/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
          <SidebarMenu>
              {snippetContext.langs?.map((item) => (
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
