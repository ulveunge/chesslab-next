import React, { ComponentProps } from 'react';

type Props = ComponentProps<'div'>;

export default function ChessBoardContainer({ ...props }: Props) {
  return <div {...props} />;
}
