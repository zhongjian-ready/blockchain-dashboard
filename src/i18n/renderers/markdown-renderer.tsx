'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/display/hybrid-tooltip';
import { origin } from '@/constants/env';
import { textGradient } from '@/constants/styles';
import { cn } from '@/lib/utils';
import { evaluate } from '@mdx-js/mdx';
import { MDXProvider, useMDXComponents } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import { usePathname, useSearchParams } from 'next/navigation';
import React, {
  HTMLProps,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as runtime from 'react/jsx-runtime';

/**
 * default MDX components
 */
const MarkdownContext = React.createContext<MDXComponents>({
  Link: ({
    textGradient: _textGradient,
    className,
    ...props
  }: HTMLProps<HTMLAnchorElement> & { textGradient?: boolean }) => (
    <a
      {...props}
      className={cn({ [textGradient]: _textGradient }, className)}
    />
  ),
  NavLink: ({
    textGradient: _textGradient,
    href,
    className,
    activeClassName,
    ...props
  }: HTMLProps<HTMLAnchorElement> & {
    textGradient?: boolean;
    activeClassName?: string;
  }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = useMemo(() => searchParams.toString(), [searchParams]);
    const targetHref = useMemo(
      () => `${origin}${href}?${search}`,
      [search, href]
    );
    return (
      <a
        {...props}
        href={targetHref}
        className={cn(
          { [textGradient]: _textGradient },
          className,
          pathname === href && activeClassName
        )}
      />
    );
  },
  Tooltip: ({
    open,
    defaultOpen,
    onOpenChange,
    content,
    children,
    ...props
  }) => {
    return (
      <Tooltip
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <TooltipTrigger type="button" {...props}>
          {children}
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    );
  },
  TextGradient: ({ className, ...props }: HTMLProps<HTMLElement>) => (
    <span {...props} className={cn(textGradient, className)} />
  ),
});

interface MarkdownRendererProps {
  content: string;
  components?: MDXComponents;
  disableParentContext?: boolean;
}

export function MarkdownRenderer({
  content,
  components,
  disableParentContext,
}: MarkdownRendererProps) {
  const [element, setElement] = useState<ReactNode>();
  useEffect(() => {
    let isMounted = true;
    const instantiate = async () => {
      const normalized = content.replace(/[{}]/g, '\\$&');
      const { default: MDXContent } = await evaluate(normalized, {
        ...runtime,
        useMDXComponents,
      });
      if (isMounted) {
        setElement(<MDXContent components={components} />);
      }
    };
    instantiate();
    return () => {
      isMounted = false;
    };
  }, [components, content]);
  const defaultComponents = useContext(MarkdownContext);
  return (
    <MDXProvider
      components={defaultComponents}
      disableParentContext={disableParentContext}
    >
      {element}
    </MDXProvider>
  );
}
