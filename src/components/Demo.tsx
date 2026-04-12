import {
  ArrowDownUp,
  ArrowUpDown,
  ChevronRight,
  Folder,
  FolderClosed,
  FolderOpen,
  Home,
  Monitor,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Sun
} from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useRoute } from 'wouter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import Theme from './Theme'

type SortColumn = 'name' | 'platform' | 'status' | 'description'

const themes = [
  { name: 'light' as const, icon: Sun },
  { name: 'dark' as const, icon: Moon },
  { name: 'system' as const, icon: Monitor }
]

const commandNav = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: FolderClosed },
  { href: '/settings', label: 'Settings', icon: Settings }
]

const projects = [
  {
    id: 'field-notes',
    name: 'Field Notes',
    platform: 'PWA',
    status: 'Active',
    description: 'Offline-first notes with local AI assistance.'
  },
  {
    id: 'dream-studio',
    name: 'Dream Studio',
    platform: 'Electron',
    status: 'Draft',
    description: 'Generate and edit images with diffusion models.'
  },
  {
    id: 'agent-maestro',
    name: 'Agent Maestro',
    platform: 'Electron',
    status: 'Planning',
    description: 'Orchestrate multiple coding agents simultaneously.'
  }
] as const

function toTitleCase(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')
}

function Breadcrumb() {
  const [location] = useLocation()
  const segments = location.split('/').filter(Boolean)
  const crumbs = [
    { href: '/', label: 'Home' },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`
      const project = projects.find((item) => item.id === segment)
      return { href, label: project?.name ?? toTitleCase(segment) }
    })
  ]

  return (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3 w-3" />}
            {isLast ? (
              <span className="text-foreground">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-foreground">
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </div>
  )
}

function NavItem({
  href,
  label,
  icon: Icon,
  collapsed
}: {
  href: string
  label: string
  icon: React.ElementType
  collapsed: boolean
}) {
  const [location] = useLocation()
  const isActive = location === href
  const button = (
    <Button
      variant={isActive ? 'secondary' : 'ghost'}
      size={collapsed ? 'icon' : 'default'}
      className={collapsed ? 'w-9 h-9' : 'w-full justify-start gap-2'}
      asChild
    >
      <Link href={href}>
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span>{label}</span>}
      </Link>
    </Button>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    )
  }
  return button
}

function ProjectsNavItem({
  collapsed,
  expanded,
  onToggle
}: {
  collapsed: boolean
  expanded: boolean
  onToggle: () => void
}) {
  const [location] = useLocation()
  const isActive = location === '/projects' || location.startsWith('/projects/')
  const ProjectsIcon = expanded ? FolderOpen : FolderClosed

  const button = (
    <Button
      type="button"
      variant={isActive ? 'secondary' : 'ghost'}
      size={collapsed ? 'icon' : 'default'}
      className={collapsed ? 'w-9 h-9' : 'w-full justify-start gap-2'}
      onClick={onToggle}
    >
      <ProjectsIcon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>Projects</span>}
    </Button>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">Projects</TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className="space-y-1">
      {button}
      {expanded && (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="ml-4 flex flex-col gap-1 border-l pl-2">
            {projects.map((project) => {
              const href = `/projects/${project.id}`
              const isProjectActive = location === href

              return (
                <Button
                  key={project.id}
                  variant={isProjectActive ? 'secondary' : 'ghost'}
                  size="sm"
                  className="w-full justify-start truncate"
                  asChild
                >
                  <Link href={href}>{project.name}</Link>
                </Button>
              )
            })}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Home</h1>
      <p className="text-muted-foreground">
        A React template for building desktop-style apps with Vite, TypeScript, and Tailwind CSS.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {['Routing', 'Theming', 'Command Palette'].map((feature) => (
          <div key={feature} className="rounded-lg border bg-card p-4 text-card-foreground">
            <h3 className="font-medium">{feature}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {feature === 'Routing' && 'Client-side navigation with Wouter.'}
              {feature === 'Theming' && 'Light, dark, and system themes.'}
              {feature === 'Command Palette' && 'VS Code-style quick navigation with cmdk.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectsPage() {
  const [sortColumn, setSortColumn] = useState<SortColumn>('name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedProjects = useMemo(() => {
    const sorted = [...projects].sort((a, b) =>
      a[sortColumn].localeCompare(b[sortColumn], undefined, { sensitivity: 'base' })
    )

    if (sortDirection === 'desc') {
      sorted.reverse()
    }

    return sorted
  }, [sortColumn, sortDirection])

  const onSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))
      return
    }
    setSortColumn(column)
    setSortDirection('asc')
  }

  const SortDirectionIcon = sortDirection === 'asc' ? ArrowDownUp : ArrowUpDown

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
      <p className="text-muted-foreground">Example projects suited for PWA and Electron apps.</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button
                type="button"
                variant={sortColumn === 'name' ? 'secondary' : 'ghost'}
                size="sm"
                className="-ml-2 h-7 px-2"
                onClick={() => onSort('name')}
              >
                Project
                {sortColumn === 'name' && <SortDirectionIcon className="h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                type="button"
                variant={sortColumn === 'platform' ? 'secondary' : 'ghost'}
                size="sm"
                className="-ml-2 h-7 px-2"
                onClick={() => onSort('platform')}
              >
                Platform
                {sortColumn === 'platform' && <SortDirectionIcon className="h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                type="button"
                variant={sortColumn === 'status' ? 'secondary' : 'ghost'}
                size="sm"
                className="-ml-2 h-7 px-2"
                onClick={() => onSort('status')}
              >
                Status
                {sortColumn === 'status' && <SortDirectionIcon className="h-4 w-4" />}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                type="button"
                variant={sortColumn === 'description' ? 'secondary' : 'ghost'}
                size="sm"
                className="-ml-2 h-7 px-2"
                onClick={() => onSort('description')}
              >
                Description
                {sortColumn === 'description' && <SortDirectionIcon className="h-4 w-4" />}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <Link href={`/projects/${project.id}`} className="hover:underline">
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>{project.platform}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    project.status === 'Active'
                      ? 'default'
                      : project.status === 'Planning'
                        ? 'secondary'
                        : 'outline'
                  }
                >
                  {project.status}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-normal">{project.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function ProjectPage({ projectId }: { projectId: string }) {
  const project = projects.find((item) => item.id === projectId)

  if (!project) return <NotFound />

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
      <p className="text-muted-foreground">{project.description}</p>
      <Button variant="ghost" size="sm" asChild>
        <Link href="/projects">Back to projects</Link>
      </Button>
    </div>
  )
}

function ProjectSettingsPage({ projectId }: { projectId: string }) {
  const project = projects.find((item) => item.id === projectId)

  if (!project) return <NotFound />

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">{project.name} settings</h1>
      <p className="text-muted-foreground">
        This placeholder route demonstrates deeper breadcrumb paths for app-shell navigation.
      </p>
      <Button variant="ghost" size="sm" asChild>
        <Link href={`/projects/${project.id}`}>Back to project</Link>
      </Button>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="text-muted-foreground">Nothing here yet.</p>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-2 text-muted-foreground">Page not found</p>
      <Button variant="link" asChild className="mt-4">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}

function Routes() {
  const [isHome] = useRoute('/')
  const [isProjects] = useRoute('/projects')
  const [isProjectSettings, projectSettingsParams] = useRoute('/projects/:projectId/settings')
  const [isProject, projectParams] = useRoute('/projects/:projectId')
  const [isSettings] = useRoute('/settings')

  if (isHome) {
    return <HomePage />
  }
  if (isProjects) {
    return <ProjectsPage />
  }
  if (isProjectSettings && projectSettingsParams?.projectId) {
    return <ProjectSettingsPage projectId={projectSettingsParams.projectId} />
  }
  if (isProject && projectParams?.projectId) {
    return <ProjectPage projectId={projectParams.projectId} />
  }
  if (isSettings) {
    return <SettingsPage />
  }
  return <NotFound />
}

export default function Demo() {
  const [collapsed, setCollapsed] = useState(false)
  const [location, navigate] = useLocation()
  const [commandOpen, setCommandOpen] = useState(false)
  const [commandQuery, setCommandQuery] = useState('')
  const [projectsExpanded, setProjectsExpanded] = useState(
    () => location === '/projects' || location.startsWith('/projects/')
  )

  const isProjectsRoute = location === '/projects' || location.startsWith('/projects/')

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const navigateTo = (href: string) => {
    navigate(href)
    setCommandOpen(false)
    setCommandQuery('')
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <motion.aside
          className="flex flex-col border-r bg-muted/40"
          animate={{ width: collapsed ? 56 : 200 }}
          transition={{ duration: 0.15 }}
        >
          <div className="flex h-12 items-center justify-between gap-2 px-3 border-b">
            {!collapsed && <span className="text-sm font-semibold truncate">App</span>}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <PanelLeftOpen className="h-4 w-4" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </Button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 p-2">
            <NavItem href="/" label="Home" icon={Home} collapsed={collapsed} />
            <ProjectsNavItem
              collapsed={collapsed}
              expanded={projectsExpanded}
              onToggle={() => {
                if (collapsed) {
                  navigate('/projects')
                  return
                }
                if (isProjectsRoute) {
                  setProjectsExpanded((prev) => !prev)
                  return
                }
                navigate('/projects')
                setProjectsExpanded(true)
              }}
            />
            <NavItem href="/settings" label="Settings" icon={Settings} collapsed={collapsed} />
          </nav>
          <Separator />
          <div className="p-2">
            <Theme themes={themes} collapsed={collapsed} />
          </div>
        </motion.aside>

        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-12 items-center gap-3 border-b px-4">
            <Breadcrumb />
            <div className="relative ml-auto w-full max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={commandQuery}
                onFocus={() => setCommandOpen(true)}
                onChange={(event) => {
                  setCommandQuery(event.target.value)
                  setCommandOpen(true)
                }}
                placeholder="Search pages and projects..."
                className="pl-8 pr-16"
              />
              <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-muted-foreground">
                Ctrl+K
              </span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <Routes />
          </main>
        </div>
      </div>
      <CommandDialog
        open={commandOpen}
        onOpenChange={(open) => {
          setCommandOpen(open)
          if (!open) {
            setCommandQuery('')
          }
        }}
        className="sm:max-w-lg"
      >
        <Command value={commandQuery} onValueChange={setCommandQuery}>
          <CommandInput placeholder="Start typing..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              {commandNav.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`${item.label} ${item.href}`}
                  onSelect={() => navigateTo(item.href)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  <CommandShortcut>
                    {item.href === '/' ? 'Cmd+1' : item.href === '/projects' ? 'Cmd+2' : 'Cmd+3'}
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  value={`${project.name} ${project.platform} ${project.status} ${project.description}`}
                  onSelect={() => navigateTo(`/projects/${project.id}`)}
                >
                  <Folder className="h-4 w-4" />
                  <span>{project.name}</span>
                  <CommandShortcut>{project.platform}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </TooltipProvider>
  )
}
