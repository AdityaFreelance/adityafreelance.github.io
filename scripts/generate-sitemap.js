const fs = require('fs');
const path = require('path');

const siteUrl = 'https://adityafreelance.github.io';
const rootPath = path.join(__dirname, '..');
const blogs = JSON.parse(fs.readFileSync(path.join(rootPath, 'data', 'blogs.json'), 'utf8'));
const blogOutputPath = path.join(rootPath, 'blog');
const sitemapPath = path.join(rootPath, 'sitemap.xml');

const escapeHtml = value => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeJsonForHtml = value => JSON.stringify(value).replace(/</g, '\\u003c');

const formatDate = date => new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
}).format(new Date(`${date}T00:00:00`));

const createBlogPage = blog => {
    const canonicalUrl = `${siteUrl}/blog/${blog.slug}.html`;
    const articleBody = blog.content.join('\n\n');
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        'mainEntityOfPage': canonicalUrl,
        'headline': blog.title,
        'description': blog.excerpt,
        'keywords': blog.keywords.join(', '),
        'articleSection': blog.category,
        'articleBody': articleBody,
        'datePublished': blog.date,
        'dateModified': blog.date,
        'author': {
            '@type': 'Person',
            'name': 'Aditya Kumar Singh',
            'url': siteUrl
        },
        'publisher': {
            '@type': 'Person',
            'name': 'Aditya Kumar Singh',
            'url': siteUrl
        }
    };

    return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${escapeHtml(blog.excerpt)}">
    <meta name="keywords" content="${escapeHtml(blog.keywords.join(', '))}">
    <meta name="author" content="Aditya Kumar Singh">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="icon" href="../images/favicon.png" type="image/png">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(blog.title)}">
    <meta property="og:description" content="${escapeHtml(blog.excerpt)}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:site_name" content="Aditya Kumar Singh">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(blog.title)}">
    <meta name="twitter:description" content="${escapeHtml(blog.excerpt)}">
    <title>${escapeHtml(blog.title)} | Aditya Kumar Singh</title>
    <script type="application/ld+json">${escapeJsonForHtml(articleSchema)}</script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <header class="navbar-dark bg-dark">
        <div class="container">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="../index.html">Aditya</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#blogDetailNav"
                    aria-controls="blogDetailNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="blogDetailNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link" href="../index.html">Portfolio</a></li>
                        <li class="nav-item"><a class="nav-link" href="../blog.html">All Articles</a></li>
                        <li class="nav-item"><a class="nav-link" href="../index.html#contact">Contact</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </header>
    <main id="main-content">
        <article class="blog-detail-page">
            <div class="container blog-detail-container">
                <a class="blog-back-link" href="../blog.html">&larr; Back to all articles</a>
                <p class="blog-category mt-4 mb-2">${escapeHtml(blog.category)}</p>
                <h1>${escapeHtml(blog.title)}</h1>
                <div class="blog-detail-meta">
                    <span>By Aditya Kumar Singh</span>
                    <span aria-hidden="true">&middot;</span>
                    <time datetime="${blog.date}">${formatDate(blog.date)}</time>
                </div>
                <p class="blog-detail-intro">${escapeHtml(blog.excerpt)}</p>
                <div class="blog-article-content">
                    ${blog.content.map((paragraph, index) => index === 0
                        ? `<p class="blog-lead">${escapeHtml(paragraph)}</p>`
                        : `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
                </div>
                <div class="blog-keywords mt-4" aria-label="Article topics">
                    ${blog.keywords.map(keyword => `<span class="technology-badge">${escapeHtml(keyword)}</span>`).join('')}
                </div>
            </div>
        </article>
    </main>
    <div class="theme-switcher">
        <button id="theme-toggle" type="button" title="Toggle light/dark mode" aria-label="Toggle light/dark mode">
            <i class="fas fa-moon" aria-hidden="true"></i>
        </button>
    </div>
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/js/all.min.js"></script>
    <script defer src="../js/theme.js"></script>
</body>
</html>`;
};

fs.mkdirSync(blogOutputPath, { recursive: true });
blogs.forEach(blog => {
    fs.writeFileSync(path.join(blogOutputPath, `${blog.slug}.html`), createBlogPage(blog));
});

const urls = [
    { path: '/', lastmod: [...blogs].sort((a, b) => b.date.localeCompare(a.date))[0].date, priority: '1.00' },
    { path: '/blog.html', lastmod: [...blogs].sort((a, b) => b.date.localeCompare(a.date))[0].date, priority: '0.90' },
    ...blogs.map(blog => ({
        path: `/blog/${blog.slug}.html`,
        lastmod: blog.date,
        priority: '0.70'
    }))
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeHtml(siteUrl + url.path)}</loc>
    <lastmod>${escapeHtml(url.lastmod)}</lastmod>
    <priority>${escapeHtml(url.priority)}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, xml);
console.log(`Generated ${blogs.length} blog pages and sitemap with ${urls.length} URLs.`);
