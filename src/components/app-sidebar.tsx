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

const langs = [
  {
    title: 'Angular',
    url: '#',
    count: 15
  },
  {
    title: 'C#',
    url: '#',
    count: 10
  },
  {
    title: 'Javascript',
    url: '#',
    count: 22
  },
  {
    title: 'React',
    url: '#',
    count: 5
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SearchForm/>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
          <SidebarMenu>
              {langs.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
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
