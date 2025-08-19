'use client';

import { useEffect } from 'react';

export default function YandexMetrika({ ymId }) {
  useEffect(() => {
    // Не трекать в dev-режиме
    if (process.env.NODE_ENV !== 'production') return;

    // Проверяем, есть ли уже скрипт
    if (window.ym) return;

    // Создаем очередь вызовов, если её нет
    window.ym = window.ym || function() {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = +new Date;

    // Загрузка скрипта
    const script = document.createElement('script');
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.async = true;

    // Инициализация после загрузки
    script.onload = () => {
      window.ym(ymId, 'init', {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [ymId]);

  return (
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${ymId}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=""
        />
      </div>
    </noscript>
  );
}