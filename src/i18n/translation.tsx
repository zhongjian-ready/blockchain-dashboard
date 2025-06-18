'use client';

import { get } from 'lodash';
import type { MDXComponents } from 'mdx/types';
import { useMemo, useState } from 'react';
import { useDeepCompareEffectNoCheck as useDeepCompareEffect } from 'use-deep-compare-effect';
import { TranslationType } from './helper';
import { HtmlRenderer } from './renderers/html-renderer';
import { ImageRenderer } from './renderers/image-renderer';
import { MarkdownRenderer } from './renderers/markdown-renderer';
import { TextRenderer } from './renderers/text-renderer';
import { useTranslation } from './use-translation';

// 辅助类型，递减深度
type Decrement<N extends number> = ((...args: unknown[]) => void) extends (
  first: unknown,
  ...rest: infer Rest
) => void
  ? Rest['length'] extends N
    ? Rest['length']
    : N
  : never;

// 定义递归遍历对象并生成可能的路径，限制最大递归深度
type DotPrefix<T extends string> = `.${T}`;

// 生成对象路径的递归类型，限制最大递归深度
type Path<T, Depth extends number = 10> = [Depth] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T & string]: `${K}${T[K] extends object
        ? DotPrefix<Path<T[K], Decrement<Depth>>>
        : ''}`;
    }[keyof T & string]
  : '';

// 递归将 'a.b.c' 转为 ['a', 'b', 'c']
type Split<
  S extends string,
  Delimiter extends string = '.'
> = S extends `${infer Head}${Delimiter}${infer Tail}`
  ? [Head, ...Split<Tail, Delimiter>]
  : [S];

export interface TranslationProps<
  T extends Path<TranslationType> = Path<TranslationType>
> {
  path: T | Split<T>;
  params?: Record<string, unknown>;
  components?: MDXComponents;
  disableParentContext?: boolean;
}

const availableTypes = ['md', 'mdx', 'markdown', 'img', 'image', 'svg', 'html'];

const matchRegex = new RegExp(`^\\[(${availableTypes.join('|')})\\](.*)$`);

export function Translation({
  path,
  params,
  components,
  disableParentContext,
}: TranslationProps) {
  const [memoizedParams, setMemoizedParams] = useState(params);

  useDeepCompareEffect(() => {
    setMemoizedParams(params);
  }, [params]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const translationSource: string = useTranslation(path);
  console.assert(translationSource != null, `Translation not found: ${path}`);
  const translation = useMemo(
    () =>
      memoizedParams != null
        ? translationSource.replace(/\$\{\s*([\w.]+)\s*\}/g, (match, key) => {
            const value = get(memoizedParams, key);
            return typeof value === 'string' || typeof value === 'number'
              ? String(value)
              : match;
          })
        : translationSource,
    [translationSource, memoizedParams]
  );
  const match = useMemo(() => translation.match(matchRegex), [translation]);
  if (match) {
    const type = match[1]!;
    const content = match[2]!;
    switch (type) {
      case 'md':
      case 'mdx':
      case 'markdown':
        return (
          <MarkdownRenderer
            content={content}
            components={components}
            disableParentContext={disableParentContext}
          />
        );
      case 'img':
      case 'image':
        return <ImageRenderer content={content} />;
      case 'svg':
      case 'html':
        return <HtmlRenderer content={content} />;
    }
  }
  return <TextRenderer content={translation} />;
}
