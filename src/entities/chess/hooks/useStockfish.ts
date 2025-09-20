'use client';

import { PieceSymbol } from 'chess.ts';
import { Chess as ChessGame } from 'chess.ts';
import { useEffect, useRef, useState } from 'react';
import { PieceDropHandlerArgs } from 'react-chessboard';

const useStockfish = (skillLevel: number) => {
  const chessGameRef = useRef(new ChessGame());
  const game = chessGameRef.current;
  const [chessPosition, setChessPosition] = useState(game.fen());

  const stockfishRef = useRef<Worker | null>(null);

  useEffect(() => {
    const wasmSupported =
      typeof WebAssembly === 'object' &&
      WebAssembly.validate(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00),
      );

    // Пока реверсивная проверка, т.к. wasm файл не работает, разберемся чуть позже
    const stockfishPath = !wasmSupported
      ? '/stockfish/stockfish-17.1-lite-51f59da.wasm' // Укажи точное имя файла (с хэшем, если есть)
      : '/stockfish/stockfish-17.1-lite-51f59da.js';

    try {
      stockfishRef.current = new window.Worker(stockfishPath);
      console.log('Worker создан:', stockfishPath);
    } catch (error) {
      console.error('Ошибка создания Worker:', error);
      return;
    }

    const stockfish = stockfishRef.current;
    stockfish.postMessage('uci');
    console.log('Отправлено: uci');
    stockfish.postMessage('isready');
    console.log('Отправлено: isready');
    stockfish.postMessage(`setoption name Skill Level value ${skillLevel}`); // 0–20
    console.log('Сложность стокфиша: ', skillLevel);

    stockfish.onmessage = (event) => {
      const message = event.data;
      console.log('Получено от Stockfish:', message);
      if (message === 'readyok') {
        console.log('Stockfish готов!');
      } else if (message.includes('uciok')) {
        console.log('UCI протокол инициализирован');
        stockfish.postMessage('ucinewgame'); // Новая игра
      } else if (message.startsWith('bestmove')) {
        const bestMove = message.split(' ')[1]; // Извлекаем ход, например, "e2e4"
        makeStockfishMove(bestMove); // Применяем ход Stockfish
      }
    };

    stockfish.onerror = (error) => {
      console.error('Ошибка Worker:', error);
    };

    return () => {
      stockfish.terminate();
      console.log('Worker завершён');
    };
  });

  // Функция для отправки текущей позиции в Stockfish и запроса хода
  const getStockfishMove = () => {
    if (stockfishRef.current) {
      stockfishRef.current.postMessage(`position fen ${game.fen()}`);
      console.log('Отправлено: position fen', game.fen());
      stockfishRef.current.postMessage('go depth 10'); // Глубина поиска
      console.log('Отправлено: go depth 10');
    } else {
      console.error('Worker не инициализирован');
    }
  };

  // Применение хода Stockfish к доске
  const makeStockfishMove = (move: string) => {
    const from = move.slice(0, 2); // Например, "e2"
    const to = move.slice(2, 4); // Например, "e4"
    const promotion =
      move.length > 4 ? (move.slice(4) as PieceSymbol) : undefined; // Промоушен, если есть

    try {
      const result = game.move({ from, to, promotion });
      if (result) {
        setChessPosition(game.fen()); // Обновляем позицию
        console.log('Stockfish ход:', result.san);
        if (game.gameOver()) {
          alert(
            'Игра окончена: ' + (game.inCheckmate() ? 'Мат!' : 'Пат/ничья'),
          );
        }
      } else {
        console.error('Невалидный ход от Stockfish:', move);
      }
    } catch (error) {
      console.error('Ошибка при выполнении хода Stockfish:', error);
    }
  };

  // Обработка хода игрока (drag-and-drop)
  const onPieceDrop = ({
    piece,
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs): boolean => {
    console.log('onPieceDrop:', { piece, sourceSquare, targetSquare });

    // Если targetSquare === null (сброс фигуры) или spare piece, отклоняем ход
    if (targetSquare === null || piece.isSparePiece) {
      console.log('Отклонён ход: targetSquare is null или spare piece');
      return false;
    }

    try {
      // Определяем промоушен (для пешки на 8-й или 1-й горизонтали)
      const isPromotion =
        piece.pieceType.includes('P') &&
        ((game.turn() === 'w' && targetSquare[1] === '8') ||
          (game.turn() === 'b' && targetSquare[1] === '1'));

      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: isPromotion ? 'q' : undefined, // По умолчанию ферзь
      });

      if (move === null) {
        console.error('Невалидный ход игрока:', sourceSquare, targetSquare);
        return false;
      }

      setChessPosition(game.fen()); // Обновляем позицию
      console.log('Ход игрока:', move.san);

      if (!game.gameOver()) {
        setTimeout(getStockfishMove, 500); // Запрашиваем ход Stockfish
      } else {
        alert('Игра окончена: ' + (game.inCheckmate() ? 'Мат!' : 'Пат/ничья'));
      }
      return true;
    } catch (error) {
      console.error('Ошибка при ходе игрока:', error);
      return false;
    }
  };

  return { position: chessPosition, onPieceDrop };
};

export default useStockfish;
