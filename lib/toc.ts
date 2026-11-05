export interface TocItem {
  id: string;
  text: string;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function extractTocFromMarkdown(
  content: string,
  hasQuickAnswer = false,
  hasPrompt = false
): TocItem[] {
  const items: TocItem[] = [];

  if (hasQuickAnswer) {
    items.push({ id: 'quick-answer', text: 'Quick Answer' });
  }

  if (content) {
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^##\s+(.+)$/);
      if (match) {
        const rawText = match[1].trim();
        const cleanText = rawText.replace(/[*_`]/g, '');
        const id = slugifyHeading(cleanText);
        items.push({ id, text: cleanText });
      }
    }
  }

  if (hasPrompt) {
    items.push({ id: 'interactive-prompt', text: 'Interactive Prompt' });
  }

  return items;
}
