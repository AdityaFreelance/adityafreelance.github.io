document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('blog-list-container');
    const searchInput = document.getElementById('blog-search');
    const categoryFilter = document.getElementById('blog-category-filter');
    const emptyState = document.getElementById('blog-empty-state');
    if (!container) return;

    try {
        const response = await fetch('data/blogs.json');
        if (!response.ok) throw new Error('Unable to load blog content.');
        const blogs = (await response.json()).sort((a, b) => b.date.localeCompare(a.date));

        [...new Set(blogs.map(blog => blog.category))]
            .sort((a, b) => a.localeCompare(b))
            .forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

        const renderBlogs = () => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const category = categoryFilter.value;
            const filteredBlogs = blogs.filter(blog => {
                const text = [blog.title, blog.excerpt, blog.category, ...blog.keywords].join(' ').toLowerCase();
                return (!searchTerm || text.includes(searchTerm)) &&
                    (category === 'all' || blog.category === category);
            });

            container.innerHTML = filteredBlogs.map(blog => `
                <div class="col-md-6 col-lg-4">
                    <article class="card blog-card h-100">
                        <div class="card-body d-flex flex-column">
                            <p class="blog-category mb-2">${blog.category}</p>
                            <h2 class="h4 card-title">${blog.title}</h2>
                            <time class="blog-date mb-3" datetime="${blog.date}">${formatDate(blog.date)}</time>
                            <p class="card-text flex-grow-1">${blog.excerpt}</p>
                            <a class="btn btn-primary mt-auto" href="blog/${blog.slug}.html">Read Article</a>
                        </div>
                    </article>
                </div>
            `).join('');
            emptyState.hidden = filteredBlogs.length > 0;
        };

        searchInput.addEventListener('input', renderBlogs);
        categoryFilter.addEventListener('change', renderBlogs);
        renderBlogs();
    } catch (error) {
        container.innerHTML = '<p class="text-center text-danger">Blog content could not be loaded.</p>';
        console.error(error);
    }
});

function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(`${dateString}T00:00:00`));
}
