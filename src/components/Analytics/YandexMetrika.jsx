'use client';

import { useEffect } from 'react';

export default function YandexMetrika({ ymId }) {
  useEffect(() => {

    // Загрузка скрипта
    const script = document.createElement('script');
    script.src = 'https://mc.yandex.ru/metrika/tag.js';
    script.async = true;

    // Инициализация
    script.onload = () => {
      window.ym(ymId, 'init', { 
        clickmap: true, 
        trackLinks: true,
        accurateTrackBounce: true
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