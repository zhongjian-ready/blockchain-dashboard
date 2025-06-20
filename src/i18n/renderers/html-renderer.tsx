'use client';

import DOMPurify from 'isomorphic-dompurify';

interface HtmlRendererProps {
  content: string;
}

export function HtmlRenderer({ content }: HtmlRendererProps) {
  const __html = DOMPurify.sanitize(content);
  return <div dangerouslySetInnerHTML={{ __html }} />;
}
