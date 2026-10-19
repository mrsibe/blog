import type { CollectionEntry } from 'astro:content'

const sectionTitles: Record<string, string> = {
  development: '软件开发',
  engineering: '工程实践',
  systems: '系统与部署',
  ai: '人工智能'
}

const groupTitles: Record<string, string> = {
  'development/frontend': '前端开发',
  'development/backend': '后端开发',
  'engineering/dev-environment': '开发环境',
  'engineering/tools': '效率工具',
  'systems/docker': 'Docker',
  'ai/llm': '大语言模型'
}

// The landing page and the theme's documentation sidebar share the same ordering.
// New directories remain visible even before a Chinese display name is configured.
export function getNoteSections(notes: CollectionEntry<'docs'>[]) {
  const sectionIds = [
    ...new Set([...Object.keys(sectionTitles), ...notes.map((note) => note.id.split('/')[0])])
  ]

  return sectionIds.flatMap((id) => {
    const sectionNotes = notes.filter((note) => note.id.split('/')[0] === id)
    if (!sectionNotes.length) return []

    const directories = [
      ...new Set([
        ...Object.keys(groupTitles).filter((directory) => directory.startsWith(`${id}/`)),
        ...sectionNotes.map((note) => note.id.split('/').slice(0, -1).join('/'))
      ])
    ]

    return [
      {
        id,
        title: sectionTitles[id] ?? id,
        groups: directories.flatMap((directory) => {
          const entries = sectionNotes
            .filter((note) => note.id.split('/').slice(0, -1).join('/') === directory)
            .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id))
          if (!entries.length) return []
          return [
            {
              directory,
              title:
                groupTitles[directory] ?? (directory.split('/').pop() || sectionTitles[id] || id),
              notes: entries
            }
          ]
        })
      }
    ]
  })
}
