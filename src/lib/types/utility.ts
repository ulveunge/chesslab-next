import { ComponentProps, ElementType, ReactElement, RefObject } from 'react';

export type Merge<P1 = object, P2 = object> = Omit<P1, keyof P2> & P2;

export type WithRequired<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RefProp<E = HTMLElement> = {
  ref?: RefObject<E | null>;
};

type PolymorphicProps<E extends ElementType, P = object> = {
  as?: E;
} & P &
  Omit<ComponentProps<E>, keyof P | 'as'>;

export type PolymorphicComponent<
  DefaultE extends ElementType,
  BaseProps = object,
> = <E extends ElementType = DefaultE>(
  props: PolymorphicProps<E, BaseProps & RefProp<HTMLElement>>,
) => ReactElement | null;
