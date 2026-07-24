import {
  Check,
  CheckSquare,
  ChevronRight,
  FileText,
  Heading1,
  Heading2,
  List,
  Monitor,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Sun,
  Trash2,
  Type
} from 'lucide-react'
import {
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import Theme from '@/components/Theme'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type BlockType = 'p' | 'h1' | 'h2' | 'todo' | 'bullet'

type TextBlock = {
  id: string
  type: Exclude<BlockType, 'todo'>
  text: string
  html?: string
}

type TodoBlock = {
  id: string
  type: 'todo'
  text: string
  html?: string
  done: boolean
}

type Block = TextBlock | TodoBlock

type Page = {
  id: string
  title: string
  blocks: Block[]
}

type Position = {
  top: number
  left: number
}

type SlashState = Position & {
  blockId: string
  query: string
  index: number
}

/* DATA */

let nextId = 1000
const uid = () => `b${nextId++}`

const BLOCK_TYPES = [
  { type: 'p', label: 'Text', icon: Type, hint: 'Plain paragraph' },
  { type: 'h1', label: 'Heading 1', icon: Heading1, hint: 'Large section heading' },
  { type: 'h2', label: 'Heading 2', icon: Heading2, hint: 'Medium section heading' },
  { type: 'todo', label: 'To-do', icon: CheckSquare, hint: 'Track a task' },
  { type: 'bullet', label: 'Bullet list', icon: List, hint: 'Simple list item' }
] satisfies Array<{ type: BlockType; label: string; icon: typeof Type; hint: string }>

const THEMES = [
  { name: 'light', icon: Sun },
  { name: 'dark', icon: Moon },
  { name: 'system', icon: Monitor }
] satisfies Parameters<typeof Theme>[0]['themes']

const seedPages: Page[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    blocks: [
      { id: uid(), type: 'h1', text: 'Getting started' },
      {
        id: uid(),
        type: 'p',
        text: 'This is a tiny block editor. Every line below is a block — click anywhere to edit.'
      },
      { id: uid(), type: 'h2', text: 'Things to try' },
      { id: uid(), type: 'todo', text: 'Press Enter to create a new block', done: true },
      { id: uid(), type: 'todo', text: 'Type / on an empty block to change its type', done: false },
      {
        id: uid(),
        type: 'todo',
        text: 'Select some text to format it — bold, italic, and more',
        done: false
      },
      { id: uid(), type: 'todo', text: 'Backspace an empty block to delete it', done: false },
      { id: uid(), type: 'bullet', text: 'Cmd/Ctrl+K opens the page switcher' },
      { id: uid(), type: 'bullet', text: 'Everything lives in memory — refresh resets it' }
    ]
  },
  {
    id: 'roadmap',
    title: 'Roadmap',
    blocks: [
      { id: uid(), type: 'h2', text: 'Planned' },
      { id: uid(), type: 'todo', text: 'Drag-and-drop block reordering', done: false },
      { id: uid(), type: 'todo', text: 'Inline formatting (bold, code)', done: false },
      { id: uid(), type: 'h2', text: 'Someday' },
      { id: uid(), type: 'bullet', text: 'Nested pages' },
      { id: uid(), type: 'bullet', text: 'Real persistence' }
    ]
  },
  {
    id: 'scratchpad',
    title: 'Scratchpad',
    blocks: [{ id: uid(), type: 'p', text: '' }]
  }
]

/* BLOCK */

type EditableTextProps = {
  block: Block
  placeholder: string
  className: string
  onChange: (text: string, html: string) => void
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void
  registerRef: (id: string, el: HTMLDivElement | null) => void
}

// contentEditable wrapper that stays uncontrolled while typing.
function EditableText({
  block,
  placeholder,
  className,
  onChange,
  onKeyDown,
  registerRef
}: EditableTextProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  // Set initial content once per block id.
  // Afterwards the DOM owns the content and we only mirror it into state, so the caret never jumps.
  // block.html carries inline formatting (b/i/u/s).
  // block.text is the plain mirror used for search and markdown-prefix detection.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (block.html != null) {
      if (el.innerHTML !== block.html) el.innerHTML = block.html
    } else if (el.textContent !== block.text) {
      el.textContent = block.text
    }
  }, [block.html, block.text])

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: contentEditable handles keyboard input directly.
    <div
      ref={(el) => {
        ref.current = el
        registerRef(block.id, el)
      }}
      contentEditable
      suppressContentEditableWarning
      data-block-id={block.id}
      data-placeholder={placeholder}
      className={cn(
        'wrap-break-word min-h-[1.5em] w-full whitespace-pre-wrap outline-none',
        '[&_b]:font-semibold [&_strong]:font-semibold',
        'empty:before:text-muted-foreground/50 empty:before:content-[attr(data-placeholder)]',
        className
      )}
      onInput={(e) => onChange(e.currentTarget.textContent ?? '', e.currentTarget.innerHTML ?? '')}
      onKeyDown={onKeyDown}
    />
  )
}

/* SLASH MENU */

type SlashMenuProps = {
  query: string
  position: Position
  onSelect: (type: BlockType) => void
  onClose: () => void
  selectedIndex: number
}

function SlashMenu({ query, position, onSelect, onClose, selectedIndex }: SlashMenuProps) {
  const items = BLOCK_TYPES.filter((t) => t.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (items.length === 0) onClose()
  }, [items.length, onClose])

  if (items.length === 0) return null

  return (
    <div
      className="absolute z-50 w-64 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md"
      style={{ top: position.top, left: position.left }}
    >
      <p className="px-2 py-1.5 font-medium text-muted-foreground text-xs">Turn into</p>
      {items.map((item, i) => (
        <button
          key={item.type}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(item.type)
          }}
          className={cn(
            'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
            i === selectedIndex % items.length
              ? 'bg-accent text-accent-foreground'
              : 'hover:bg-accent/50'
          )}
        >
          <item.icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1">{item.label}</span>
          <span className="text-muted-foreground text-xs">{item.hint}</span>
        </button>
      ))}
    </div>
  )
}

/* FLOATING FORMATTING TOOLBAR */

const FORMATS = [
  { cmd: 'bold', label: 'B', title: 'Bold (Ctrl+B)', className: 'font-bold' },
  { cmd: 'italic', label: 'I', title: 'Italic (Ctrl+I)', className: 'italic' },
  { cmd: 'underline', label: 'U', title: 'Underline (Ctrl+U)', className: 'underline' },
  { cmd: 'strikeThrough', label: 'S', title: 'Strikethrough', className: 'line-through' }
] satisfies Array<{ cmd: string; label: string; title: string; className: string }>

type FormatToolbarProps = {
  containerRef: RefObject<HTMLDivElement | null>
  onFormatted: (id: string, text: string, html: string) => void
}

// Appears over a non-collapsed text selection.
// Uses queryCommandState and execCommand which are deprecated but universally supported.
function FormatToolbar({ containerRef, onFormatted }: FormatToolbarProps) {
  const [pos, setPos] = useState<Position | null>(null)
  const [active, setActive] = useState<Record<string, boolean>>({})

  const readActive = useCallback(() => {
    const next: Record<string, boolean> = {}
    for (const f of FORMATS) {
      try {
        next[f.cmd] = document.queryCommandState(f.cmd)
      } catch {
        next[f.cmd] = false
      }
    }
    setActive(next)
  }, [])

  useEffect(() => {
    const onSelectionChange = () => {
      const sel = window.getSelection()
      const container = containerRef.current
      if (!sel || sel.isCollapsed || !sel.rangeCount || !container) {
        setPos(null)
        return
      }
      // Only show for selections inside an editable block of this editor.
      const anchor =
        sel.anchorNode?.nodeType === Node.TEXT_NODE ? sel.anchorNode.parentElement : sel.anchorNode
      if (
        !(anchor instanceof Element) ||
        !anchor.closest('[data-block-id]') ||
        !container.contains(anchor)
      ) {
        setPos(null)
        return
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      const crect = container.getBoundingClientRect()
      setPos({
        top: rect.top - crect.top - 40,
        left: Math.max(0, rect.left - crect.left + rect.width / 2 - 72)
      })
      readActive()
    }

    document.addEventListener('selectionchange', onSelectionChange)
    return () => document.removeEventListener('selectionchange', onSelectionChange)
  }, [containerRef, readActive])

  if (!pos) return null

  const apply = (cmd: string) => {
    document.execCommand(cmd)
    readActive()
    // Mirror the mutated DOM back into block state.
    const sel = window.getSelection()
    const anchor =
      sel?.anchorNode?.nodeType === Node.TEXT_NODE ? sel.anchorNode.parentElement : sel?.anchorNode
    const blockEl =
      anchor instanceof HTMLElement ? anchor.closest<HTMLElement>('[data-block-id]') : null
    if (blockEl?.dataset.blockId) {
      onFormatted(blockEl.dataset.blockId, blockEl.textContent ?? '', blockEl.innerHTML ?? '')
    }
  }

  return (
    <div
      className="absolute z-40 flex items-center gap-0.5 rounded-lg border bg-popover p-0.5 text-popover-foreground shadow-md"
      style={{ top: pos.top, left: pos.left }}
      onMouseDown={(e) => e.preventDefault()} // keep the text selection alive
      role="toolbar"
      aria-label="Text formatting"
    >
      {FORMATS.map((f) => (
        <button
          key={f.cmd}
          type="button"
          title={f.title}
          onClick={() => apply(f.cmd)}
          className={cn(
            'flex h-7 w-8 items-center justify-center rounded-md text-sm transition-colors',
            f.className,
            active[f.cmd]
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}

/* BLOCK EDITOR */

function blockClass(type: BlockType) {
  switch (type) {
    case 'h1':
      return 'text-3xl font-bold tracking-tight mt-4'
    case 'h2':
      return 'text-xl font-semibold tracking-tight mt-3'
    default:
      return 'text-base leading-7'
  }
}

function blockPlaceholder(type: BlockType, isOnly: boolean) {
  if (type === 'h1') return 'Heading 1'
  if (type === 'h2') return 'Heading 2'
  if (type === 'todo') return 'To-do'
  if (type === 'bullet') return 'List item'
  return isOnly ? "Type '/' for block types, or just start writing…" : ''
}

type EditorProps = {
  page: Page
  onChangePage: (page: Page) => void
}

function Editor({ page, onChangePage }: EditorProps) {
  const refs = useRef<Record<string, HTMLDivElement>>({})
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [slash, setSlash] = useState<SlashState | null>(null)

  const registerRef = (id: string, el: HTMLDivElement | null) => {
    if (el) refs.current[id] = el
    else delete refs.current[id]
  }

  const focusBlock = (id: string, atEnd = true) => {
    requestAnimationFrame(() => {
      const el = refs.current[id]
      if (!el) return
      el.focus()
      if (atEnd) {
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)
        const sel = window.getSelection()
        if (!sel) return
        sel.removeAllRanges()
        sel.addRange(range)
      }
    })
  }

  const updateBlocks = (fn: (blocks: Block[]) => Block[]) =>
    onChangePage({ ...page, blocks: fn(page.blocks) })

  // Markdown-style prefixes, checked longest-first so "## " wins over "# ".
  const MD_PREFIXES = [
    { prefix: '- ', type: 'bullet' },
    { prefix: '* ', type: 'bullet' },
    { prefix: '## ', type: 'h2' },
    { prefix: '# ', type: 'h1' }
  ] satisfies Array<{ prefix: string; type: BlockType }>

  const setBlockText = (id: string, text: string, html: string) => {
    // Markdown shortcut: typing a recognized prefix converts the block and strips the prefix.
    // Only on paragraphs, so "- " inside a heading stays put.
    const block = page.blocks.find((b) => b.id === id)
    const md = block?.type === 'p' && MD_PREFIXES.find((m) => text.startsWith(m.prefix))
    if (md) {
      const rest = text.slice(md.prefix.length)
      updateBlocks((blocks) =>
        blocks.map((b) => (b.id === id ? { ...b, type: md.type, text: rest, html: rest } : b))
      )
      const el = refs.current[id]
      if (el) el.textContent = rest
      focusBlock(id)
      return
    }

    updateBlocks((blocks) => blocks.map((b) => (b.id === id ? { ...b, text, html } : b)))

    // Open `/` update the slash menu when the block's content is `/query`.
    if (text.startsWith('/')) {
      const el = refs.current[id]
      const container = containerRef.current
      if (el && container) {
        const rect = el.getBoundingClientRect()
        const crect = container.getBoundingClientRect()
        setSlash({
          blockId: id,
          query: text.slice(1),
          top: rect.bottom - crect.top + 4,
          left: rect.left - crect.left,
          index: 0
        })
      }
    } else if (slash?.blockId === id) {
      setSlash(null)
    }
  }

  // Direct state mirror used by the formatting toolbar; skips markdown/slash logic.
  const mirrorBlock = (id: string, text: string, html: string) => {
    updateBlocks((blocks) => blocks.map((b) => (b.id === id ? { ...b, text, html } : b)))
  }

  const applySlashSelection = (type: BlockType) => {
    if (!slash) return
    const id = slash.blockId
    updateBlocks((blocks) =>
      blocks.map((b) => {
        if (b.id !== id) return b
        return type === 'todo'
          ? { id: b.id, type, text: '', html: '', done: false }
          : { id: b.id, type, text: '', html: '' }
      })
    )
    const el = refs.current[id]
    if (el) el.textContent = ''
    setSlash(null)
    focusBlock(id)
  }

  const insertBlockAfter = (id: string) => {
    const newBlock: Block = { id: uid(), type: 'p', text: '' }
    updateBlocks((blocks) => {
      const i = blocks.findIndex((b) => b.id === id)
      return [...blocks.slice(0, i + 1), newBlock, ...blocks.slice(i + 1)]
    })
    focusBlock(newBlock.id)
  }

  const deleteBlock = (id: string) => {
    const i = page.blocks.findIndex((b) => b.id === id)
    if (page.blocks.length === 1) return // always keep one block
    const prev = page.blocks[i - 1] ?? page.blocks[i + 1]
    updateBlocks((blocks) => blocks.filter((b) => b.id !== id))
    if (prev) focusBlock(prev.id)
  }

  const onBlockKeyDown = (block: Block) => (e: KeyboardEvent<HTMLDivElement>) => {
    const visibleSlashItems = slash
      ? BLOCK_TYPES.filter((t) => t.label.toLowerCase().includes(slash.query.toLowerCase()))
      : []

    if (slash && slash.blockId === block.id && visibleSlashItems.length > 0) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setSlash(
          (s) =>
            s && {
              ...s,
              index: s.index + (e.key === 'ArrowDown' ? 1 : visibleSlashItems.length - 1)
            }
        )
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        applySlashSelection(visibleSlashItems[slash.index % visibleSlashItems.length].type)
        return
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        setSlash(null)
        return
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      insertBlockAfter(block.id)
      return
    }

    const text = e.currentTarget.textContent ?? ''
    if (e.key === 'Backspace' && text === '') {
      e.preventDefault()
      deleteBlock(block.id)
      return
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const i = page.blocks.findIndex((b) => b.id === block.id)
      const target = page.blocks[i + (e.key === 'ArrowDown' ? 1 : -1)]
      if (target) {
        const sel = window.getSelection()
        // Only hop blocks when the caret can't move further within this one.
        if (sel && (text.indexOf('\n') === -1 || !sel.rangeCount)) {
          e.preventDefault()
          focusBlock(target.id, e.key === 'ArrowUp')
        }
      }
    }
  }

  const toggleTodo = (id: string) => {
    updateBlocks((blocks) =>
      blocks.map((b) => (b.id === id && b.type === 'todo' ? { ...b, done: !b.done } : b))
    )
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl px-8 py-12">
      <input
        value={page.title}
        onChange={(e) => onChangePage({ ...page, title: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            focusBlock(page.blocks[0].id, false)
          }
        }}
        placeholder="Untitled"
        className="w-full bg-transparent font-bold text-4xl tracking-tight outline-none placeholder:text-muted-foreground/40"
      />
      <div className="mt-6 space-y-1">
        {page.blocks.map((block) => (
          <div
            key={block.id}
            className="group -mx-1 flex items-start gap-2 rounded-sm px-1 py-0.5 hover:bg-muted/40"
          >
            {block.type === 'todo' && (
              <span className="flex h-7 shrink-0 items-center">
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={!!block.done}
                    onChange={() => toggleTodo(block.id)}
                    aria-label="Toggle to-do"
                    className={cn(
                      'h-4 w-4 appearance-none rounded-sm border transition-colors',
                      block.done
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-input hover:border-primary/50'
                    )}
                  />
                  {block.done && (
                    <Check
                      className="pointer-events-none absolute h-3 w-3 text-primary-foreground"
                      strokeWidth={3}
                    />
                  )}
                </span>
              </span>
            )}
            {block.type === 'bullet' && (
              <span className="flex h-7 shrink-0 items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
              </span>
            )}
            <EditableText
              block={block}
              placeholder={blockPlaceholder(block.type, page.blocks.length === 1)}
              className={cn(
                blockClass(block.type),
                block.type === 'todo' && block.done ? 'text-muted-foreground line-through' : ''
              )}
              onChange={(text, html) => setBlockText(block.id, text, html)}
              onKeyDown={onBlockKeyDown(block)}
              registerRef={registerRef}
            />
          </div>
        ))}
      </div>
      <FormatToolbar containerRef={containerRef} onFormatted={mirrorBlock} />
      {slash && (
        <SlashMenu
          query={slash.query}
          position={slash}
          selectedIndex={slash.index}
          onSelect={applySlashSelection}
          onClose={() => setSlash(null)}
        />
      )}
    </div>
  )
}

// COMMAND PALETTE

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  pages: Page[]
  onSelectPage: (id: string) => void
}

function CommandPalette({ open, onOpenChange, pages, onSelectPage }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pages
    return pages.filter((p) =>
      `${p.title} ${p.blocks.map((b) => b.text).join(' ')}`.toLowerCase().includes(q)
    )
  }, [pages, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    setIndex((current) => (results.length === 0 ? 0 : Math.min(current, results.length - 1)))
  }, [results.length])

  if (!open) return null

  const select = (page: Page) => {
    onSelectPage(page.id)
    onOpenChange(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') onOpenChange(false)
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setIndex((i) => (i + 1) % results.length)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setIndex((i) => (i + results.length - 1) % results.length)
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      select(results[index])
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onMouseDown={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="absolute top-1/3 left-1/2 w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
        role="document"
      >
        <div className="flex items-center gap-2 rounded-lg border border-input/30 bg-input/30 px-2">
          <Search className="size-4 shrink-0 opacity-50" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search pages and content…"
            className="h-8 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-72 overflow-y-auto p-1">
          {results.length === 0 ? (
            <p className="py-6 text-center text-muted-foreground text-sm">No results found.</p>
          ) : (
            <>
              <p className="px-2 py-1.5 font-medium text-muted-foreground text-xs">Pages</p>
              {results.map((page, i) => (
                <button
                  key={page.id}
                  type="button"
                  onMouseEnter={() => setIndex(i)}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    select(page)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm',
                    i === index ? 'bg-muted text-foreground' : ''
                  )}
                >
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex-1 truncate">{page.title || 'Untitled'}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* APP SHELL */

export default function NotesDemo() {
  const [pages, setPages] = useState(seedPages)
  const [activeId, setActiveId] = useState(seedPages[0].id)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const activePage = useMemo(
    () => pages.find((p) => p.id === activeId) ?? pages[0],
    [pages, activeId]
  )

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const updatePage = (next: Page) => {
    setPages((all) => all.map((p) => (p.id === next.id ? next : p)))
  }

  const addPage = () => {
    const page = {
      id: uid(),
      title: '',
      blocks: [{ id: uid(), type: 'p', text: '' }]
    } satisfies Page
    setPages((all) => [...all, page])
    setActiveId(page.id)
  }

  const deletePage = (id: string) => {
    if (pages.length === 1) return
    const remaining = pages.filter((p) => p.id !== id)
    setPages(remaining)
    if (activeId === id) setActiveId(remaining[0].id)
  }

  const todoStats = (page: Page) => {
    const todos = page.blocks.filter((b) => b.type === 'todo')
    if (todos.length === 0) return null
    return `${todos.filter((t) => t.done).length}/${todos.length}`
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <aside
        className={cn(
          'flex shrink-0 flex-col border-r bg-muted/30',
          sidebarOpen ? 'w-60' : 'w-0 overflow-hidden border-r-0'
        )}
      >
        <div className="flex h-12 w-60 items-center justify-between border-b px-3">
          <span className="font-semibold text-sm">Notes</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setSidebarOpen(false)}
            title="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {pages.map((page) => {
            const stats = todoStats(page)
            const isActive = page.id === activeId
            return (
              <div
                key={page.id}
                className={cn(
                  'group flex items-center gap-1 rounded-md text-sm',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                <button
                  type="button"
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left"
                  onClick={() => setActiveId(page.id)}
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="flex-1 truncate">{page.title || 'Untitled'}</span>
                  {stats && (
                    <span className="text-muted-foreground text-xs tabular-nums">{stats}</span>
                  )}
                </button>
                {pages.length > 1 && (
                  <button
                    type="button"
                    className="mr-2 hidden text-muted-foreground hover:text-destructive group-hover:block"
                    onClick={() => deletePage(page.id)}
                    title="Delete page"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )
          })}
        </nav>
        <Separator />
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-3 text-muted-foreground text-sm hover:text-foreground"
          onClick={() => setPaletteOpen(true)}
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
          <span className="ml-auto text-xs">Ctrl+K</span>
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="flex h-12 items-center gap-1 border-b px-4 text-muted-foreground text-sm">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="mr-1 -ml-2 h-7 w-7"
              onClick={() => setSidebarOpen(true)}
              title="Expand sidebar"
            >
              <PanelLeftOpen className="h-4 w-4" />
            </Button>
          )}
          <span>Notes</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{activePage.title || 'Untitled'}</span>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" onClick={addPage} title="New note">
              <Plus className="h-4 w-4" />
              New note
            </Button>
            <Theme themes={THEMES} />
          </div>
        </div>
        <Editor key={activePage.id} page={activePage} onChangePage={updatePage} />
      </main>
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        pages={pages}
        onSelectPage={setActiveId}
      />
    </div>
  )
}
