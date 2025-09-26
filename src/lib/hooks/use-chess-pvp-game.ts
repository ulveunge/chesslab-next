'use client';

import { IGame } from '../types';
import useAnonymousUser from './use-anonymous-user';
import { Games } from '@/lib/appwrite/browser/collections';
import { joinGame } from '@/lib/server/actions';
import { Chess as ChessGame } from 'chess.ts';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PieceDropHandlerArgs } from 'react-chessboard';

export default function useChessPvpGame(game: IGame) {
  const chessGameRef = useRef(new ChessGame(game.fen));
  const { anonymousUser } = useAnonymousUser();

  const [position, setPosition] = useState(chessGameRef.current.fen());

  const [turn, setTurn] = useState<'w' | 'b'>(chessGameRef.current.turn());

  const [currentGame, setCurrentGame] = useState(game);

  // TODO: возможно, имеет смысл сохранять ориентацию доски в куки, чтобы её смены не происходило на клиенте?
  const boardOrientation = useMemo(() => {
    if (!anonymousUser) return 'white';

    const { id: playerId } = anonymousUser;

    if (playerId === game.whitePlayerId) return 'white';

    if (playerId === game.blackPlayerId) return 'black';

    return 'white';
  }, [anonymousUser, game.blackPlayerId, game.whitePlayerId]);

  const ownColor = useMemo(() => {
    if (!anonymousUser) return null;

    return anonymousUser.id === currentGame.whitePlayerId ? 'w' : 'b';
  }, [currentGame, anonymousUser]);

  const canMove = useMemo(() => {
    return (
      anonymousUser &&
      (anonymousUser.id === currentGame.whitePlayerId ||
        anonymousUser.id === currentGame.blackPlayerId) &&
      turn === ownColor
    );
  }, [
    anonymousUser,
    currentGame.blackPlayerId,
    currentGame.whitePlayerId,
    ownColor,
    turn,
  ]);

  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!targetSquare || !canMove) return false;

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
          setCurrentGame(event.payload);
          setPosition(chessGameRef.current.fen());
          setTurn(chessGameRef.current.turn());
        }
      },
    });

    return unsubscribe;
  }, [game.$id]);

  useEffect(() => {
    (async () => {
      if (!anonymousUser) return;

      if (currentGame.whitePlayerId && currentGame.blackPlayerId) return;

      try {
        const updatedGame = await joinGame({
          game,
          userId: anonymousUser.id,
        });

        setCurrentGame(updatedGame);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [
    anonymousUser,
    currentGame.blackPlayerId,
    currentGame.whitePlayerId,
    game,
  ]);

  return {
    position,
    onPieceDrop,
    boardOrientation: boardOrientation as 'white' | 'black',
  };
}
