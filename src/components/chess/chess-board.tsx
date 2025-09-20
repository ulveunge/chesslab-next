'use client';

import { ChessContext } from './chess';
import React, { useContext } from 'react';
import { Chessboard as ReactChessboard } from 'react-chessboard';

export default function ChessBoard() {
  const { options } = useContext(ChessContext);

  return <ReactChessboard options={options} />;
}
