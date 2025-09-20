import React, { ComponentProps, createContext } from 'react';
import { ChessboardOptions as ReactChessboardOptions } from 'react-chessboard';

type Props = ComponentProps<'div'> & {
  options?: ReactChessboardOptions;
};

export const ChessContext = createContext<Pick<Props, 'options'>>({});

export default function Chess({ options, children, ...props }: Props) {
  return (
    <div {...props}>
      <ChessContext.Provider value={{ options }}>
        {children}
      </ChessContext.Provider>
    </div>
  );
}
