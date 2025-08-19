export default function sitemap() {
  return [
    {
      url: 'https://kniginatka.ru',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://kniginatka.ru/cabinet',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}