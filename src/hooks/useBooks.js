import { useMemo } from 'react'

export const useBooks = (links) => {
    return useMemo(() => {
        return Object.entries(links)
        .filter(([_, url]) => url)
        .map(([platform, url]) => ({platform, url,displayName: getDisplayName(platform)}))
    }, [links])
}

const getDisplayName = (platform) => {
  const names = {
    litres: 'Литрес',
    wildberries: 'Wildberries',
    ozon: 'Ozon',
    market: 'Я.Маркет'
  };
  return names[platform] || platform;
};