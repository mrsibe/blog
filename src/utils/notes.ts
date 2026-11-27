import { getCollection, type CollectionEntry } from 'astro:content'

/**
 * Get all notes, filtering out notes whose filenames start with _
 */
export async function getFilteredNotes() {
  const notes = await getCollection('notes')
  return notes.filter((note: CollectionEntry<'notes'>) => !note.id.startsWith('_'))
}

/**
 * Get all notes sorted by their path, so notes on the same topic stay together
 */
export async function getSortedFilteredNotes() {
  const notes = await getFilteredNotes()
  return notes.sort((a: CollectionEntry<'notes'>, b: CollectionEntry<'notes'>) => a.id.localeCompare(b.id))
}
