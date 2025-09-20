import { PolymorphicComponent } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const DEFAULT_TAG = 'p';

const variantToTagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'p',
  muted: 'span',
  blockquote: 'blockquote',
  ul: 'ul',
  code: 'code',
  'visually-hidden': 'span',
} as const;

const textVariants = cva(null, {
  variants: {
    variant: {
      h1: 'text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'text-3xl font-semibold tracking-tight',
      h3: 'text-2xl font-semibold tracking-tight',
      h4: 'text-xl font-semibold tracking-tight',
      p: 'leading-7',
      lead: 'text-muted-foreground text-xl',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-muted-foreground text-sm',
      blockquote: 'border-l-2 pl-6 italic',
      ul: 'ml-6 list-disc [&>li:not(:first-child)]:mt-2',
      code: 'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      'visually-hidden': 'sr-only',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type Props = VariantProps<typeof textVariants> & {
  asChild?: boolean;
};

const Text: PolymorphicComponent<typeof DEFAULT_TAG, Props> = ({
  as: asProp,
  asChild,
  variant,
  className,
  ...props
}) => {
  const Comp = asChild
    ? Slot
    : asProp
      ? asProp
      : variantToTagMap[variant ?? DEFAULT_TAG];

  return (
    <Comp className={cn(textVariants({ variant, className }))} {...props} />
  );
};

export default Text;
