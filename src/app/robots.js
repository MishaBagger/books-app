export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/cabinet/'],
      },
    ],
    sitemap: 'https://kniginatka.ru/sitemap.xml',
  }
}