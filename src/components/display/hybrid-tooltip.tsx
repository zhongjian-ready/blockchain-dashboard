'use client';

import {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from '@radix-ui/react-popover';
import {
  TooltipContentProps,
  TooltipProps,
  TooltipTriggerProps,
} from '@radix-ui/react-tooltip';
import { forwardRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { useTouch } from './hybrid';

const HybridTooltip = (props: TooltipProps & PopoverProps) => {
  const isTouch = useTouch();
  return isTouch ? <Popover {...props} /> : <Tooltip {...props} />;
};

const HybridTooltipTrigger = (
  props: TooltipTriggerProps & PopoverTriggerProps
) => {
  const isTouch = useTouch();
  return isTouch ? (
    <PopoverTrigger {...props} />
  ) : (
    <TooltipTrigger {...props} />
  );
};

const HybridTooltipContent = forwardRef<
  HTMLDivElement,
  TooltipContentProps & PopoverContentProps
>((props, ref) => {
  const isTouch = useTouch();
  return isTouch ? (
    <PopoverContent {...props} />
  ) : (
    <TooltipContent ref={ref} {...props} />
  );
});

HybridTooltipContent.displayName = 'HybridTooltipContent';

export {
  HybridTooltip as Tooltip,
  HybridTooltipContent as TooltipContent,
  HybridTooltipTrigger as TooltipTrigger,
};
