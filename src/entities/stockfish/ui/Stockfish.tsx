// /components/Stockfish.tsx
'use client';

import { useEffect, useRef } from 'react';

// /components/Stockfish.tsx

// /components/Stockfish.tsx

// /components/Stockfish.tsx

const Stockfish = () => {
  const stockfishRef = useRef<Worker | null>(null);

  useEffect(() => {
    console.log(
      'SharedArrayBuffer доступен:',
      typeof SharedArrayBuffer !== 'undefined',
    );
    const wasmSupported =
      typeof WebAssembly === 'object' &&
      WebAssembly.validate(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00),
      );

    const stockfishPath = !wasmSupported
      ? '/stockfish/stockfish-17.1-lite-51f59da.wasm' // Укажи точное имя файла (с хэшем, если есть)
      : '/stockfish/stockfish-17.1-lite-51f59da.js';

    stockfishRef.current = new window.Worker(stockfishPath);
    const stockfish = stockfishRef.current;
    stockfish.postMessage('uci');
    stockfish.postMessage('isready');

    stockfish.onmessage = (event) => {
      console.log('Received message', event.data);
      const message = event.data;
      if (message === 'readyok') {
        console.log('Stockfish готов!');
      } else if (message.includes('uciok')) {
        console.log('UCI протокол инициализирован');
      } else {
        console.log('Stockfish:', message);
      }
    };

    return () => {
      console.log('Terminated');
      stockfish.terminate();
    };
  }, []);

  const testStockfish = () => {
    console.log('hello', stockfishRef.current);
    if (stockfishRef.current) {
      stockfishRef.current.postMessage('position startpos');
      stockfishRef.current.postMessage('go depth 10');
    }
  };

  return (
    <div>
      <h1>Тест Stockfish</h1>
      <button onClick={testStockfish}>Запустить анализ</button>
    </div>
  );
};

export default Stockfish;
