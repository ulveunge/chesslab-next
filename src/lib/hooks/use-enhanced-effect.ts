"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * Универсальный хук-эффект, безопасный для SSR
 *
 * Решает проблему использования `useLayoutEffect` в SSR-окружении,
 * где нет DOM API, что вызывает предупреждения в консоли.
 *
 * @example
 * // Использование вместо useLayoutEffect в компонентах, поддерживающих SSR
 * useEnhancedEffect(() => {
 *   // Операции с DOM, измерения элементов и т.д.
 *   const rect = element.getBoundingClientRect();
 *   console.log(rect.width);
 * }, [dependencies]);
 *
 * @returns {Function} Возвращает useEffect на сервере и useLayoutEffect на клиенте
 */
const useEnhancedEffect =
  typeof window === "undefined" ? useLayoutEffect : useEffect;

export default useEnhancedEffect;
