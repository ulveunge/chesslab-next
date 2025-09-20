'use client';

import {
  Text,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Stockfish,
} from '@/components';
import { useState } from 'react';

const STOCKFISH_DEFAULT_SKILL_LEVEL = 1;
const STOCKFISH_MAX_SKILL_LEVEL = 10;

const LEVELS = Array.from({ length: STOCKFISH_MAX_SKILL_LEVEL }, (_, idx) =>
  String(idx + 1),
);

export default function Home() {
  return (
    <div>
      <Stockfish />
    </div>
  );
}
