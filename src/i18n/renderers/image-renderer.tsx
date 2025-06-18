'use client';

interface ImageRendererProps {
  content: string;
}

export function ImageRenderer({ content }: ImageRendererProps) {
  return <img src={content} alt="" />;
}
