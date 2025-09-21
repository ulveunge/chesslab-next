'use client';

import { Games } from '../api/appwrite/collections';
import { IGame } from '../types';
import { getGameConfig } from '../utils';
import { Chess as ChessGame } from 'chess.ts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PieceDropHandlerArgs } from 'react-chessboard';

export default function useChessPvpGame(game: IGame) {
  const chessGameRef = useRef(new ChessGame(game.fen));

  const [position, setPosition] = useState(chessGameRef.current.fen());

  const [turn, setTurn] = useState<'w' | 'b'>(chessGameRef.current.turn());

  const playerId = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return window.localStorage.getItem('player-id');
  }, []);

  const [gameConfig, setGameConfig] = useState(getGameConfig(game.$id));

  const boardOrientation = useMemo(() => {
    switch (true) {
      case gameConfig && gameConfig.id === game.$id && gameConfig.color === 'b':
        return 'black';
      case !gameConfig:
      default:
        return 'white';
    }
  }, [game.$id, gameConfig]);

  const canMakeMove = useMemo(() => {
    if (!gameConfig) return false;

    if (gameConfig.playerId !== playerId) return false;

    const isPlayerTurn =
      (turn === 'w' && gameConfig.color === 'w') ||
      (turn === 'b' && gameConfig.color === 'b');

    return isPlayerTurn;
  }, [gameConfig, playerId, turn]);

  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!targetSquare || !canMakeMove) return false;

    const move = chessGameRef.current.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    });

    if (!move) return false;

    const newFen = chessGameRef.current.fen();
    const newPgn = chessGameRef.current.pgn();

    setPosition(newFen);
    setTurn(chessGameRef.current.turn());

    Games.update(game.$id, { fen: newFen, pgn: newPgn });

    return true;
  };

  useEffect(() => {
    const unsubscribe = Games.subscribe({
      id: game.$id,
      callback: (event) => {
        if (event.events.some((e) => e.includes('update'))) {
          chessGameRef.current.loadPgn(event.payload.pgn);
          setPosition(chessGameRef.current.fen());
          setTurn(chessGameRef.current.turn());
        }
      },
    });

    return unsubscribe;
  }, [game.$id]);

  useEffect(() => {
    console.log('position: ', position);
  }, [position]);

  useEffect(() => {
    if (
      (game.whitePlayerId && game.blackPlayerId) ||
      !playerId ||
      playerId === game.whitePlayerId ||
      playerId === game.blackPlayerId
    )
      return;

    Games.update(game.$id, {
      ...(game.whitePlayerId ? { blackPlayerId: playerId } : {}),
      ...(game.blackPlayerId
        ? {
            whitePlayerId: playerId,
          }
        : {}),
    }).then((res) => {
      const newGameConfig = {
        id: res.$id,
        color: (res.whitePlayerId === playerId ? 'w' : 'b') as 'w' | 'b',
        playerId,
      };

      setGameConfig(newGameConfig);

      return res;
    });
  }, [game, playerId]);

  return {
    position,
    onPieceDrop,
    boardOrientation: boardOrientation as 'white' | 'black',
  };
}
