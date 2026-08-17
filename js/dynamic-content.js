document.addEventListener('DOMContentLoaded', () => {
    // Fetch and load all content
    Promise.all([
        fetch('data/content.json').then(res => res.json()),
        fetch('data/projects.json').then(res => res.json()),
        fetch('data/faq.json').then(res => res.json()),
        fetch('data/blogs.json').then(res => res.json())
    ]).then(([contentData, projectsData, faqData, blogsData]) => {
        
        // 1. Navigation
        renderNavigation(contentData.navigation);

        // 2. Hero Section (Typed.js)
        renderHero(contentData.hero);

        // 3. About Section
        renderAbout(contentData.about);

        // 4. Skills Section
        renderSkills(contentData.skills);

        // 5. Services Section
        renderServices(contentData.services);

        // 6. Experience Section
        renderExperience(contentData.experience);

        // 7. Projects Section
        renderProjectsSection(contentData.projects, projectsData);

        // 8. FAQ Section
        renderFAQ(faqData);

        // 9. Contact Section
        renderContact(contentData.contact);

        // 10. Blog Section
        renderBlogs(blogsData);

        // 11. Footer
        renderFooter(contentData.footer);

        // Re-initialize AOS to catch new elements
        setTimeout(() => {
            AOS.refresh();
        }, 100);

    }).catch(error => {
        console.error('Error loading dynamic content:', error);
    });
});

// --- Render Functions ---

function renderNavigation(navData) {
    const brand = document.querySelector('.navbar-brand');
    if (brand) brand.textContent = navData.brand;

    const navList = document.querySelector('.navbar-nav');
    if (navList) {
        navList.innerHTML = navData.links.map(link => 
            `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`
        ).join('');
        navList.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                window.trackEvent?.('navigation_click', { section: link.getAttribute('href') });
            });
        });
    }
}

function renderHero(heroData) {
    const typedElement = document.getElementById('typed');
    if (typedElement && heroData.typed_text) {
        new Typed('#typed', {
            strings: heroData.typed_text,
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });
    }
}

function renderAbout(aboutData) {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const title = aboutSection.querySelector('h2');
    if (title) title.textContent = aboutData.title;

    const images = aboutSection.querySelectorAll('.about-image');
    images.forEach(img => {
        img.src = aboutData.image;
        img.alt = "Aditya Kumar Singh";
    });

    const pTag = aboutSection.querySelector('p');
    if (pTag) pTag.textContent = aboutData.text;

    const resume = aboutData.resume || {};
    const previewButton = aboutSection.querySelector('#resume-preview');
    const downloadButton = aboutSection.querySelector('#resume-download');
    const trackResumeEvent = (eventName) => {
        if (typeof window.gtag === 'function') {
            window.gtag('event', eventName, {
                file_name: resume.download_filename || 'Aditya-Kumar-Singh-Resume.pdf'
            });
        }
    };

    if (previewButton) {
        previewButton.textContent = resume.preview_button_text || 'View Resume';
        previewButton.href = resume.preview_url || resume.download_url || '#';
        previewButton.addEventListener('click', () => trackResumeEvent('resume_preview'));
    }
    if (downloadButton) {
        downloadButton.textContent = resume.button_text || 'Download Resume';
        downloadButton.href = resume.download_url || '#';
        downloadButton.download = resume.download_filename || 'Aditya-Kumar-Singh-Resume.pdf';
        downloadButton.addEventListener('click', () => trackResumeEvent('resume_download'));
    }
}

function renderSkills(skillsData) {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    skillsSection.querySelector('h2').textContent = skillsData.title;
    skillsSection.querySelector('p').textContent = skillsData.skills_summary;

    const lists = skillsSection.querySelectorAll('ul');
    
    if (lists[0]) {
        lists[0].innerHTML = skillsData.proficient_technologies.map(item => `<li>${item}</li>`).join('');
        const h3 = lists[0].previousElementSibling;
        if(h3) h3.textContent = "Proficient Technologies";
    }
    if (lists[1]) {
        lists[1].innerHTML = skillsData.familiar_technologies.map(item => `<li>${item}</li>`).join('');
        const h3 = lists[1].previousElementSibling;
        if(h3) h3.textContent = "Familiar Technologies";
    }
    if (lists[2]) {
        lists[2].innerHTML = skillsData.tools.map(item => `<li>${item}</li>`).join('');
        const h3 = lists[2].previousElementSibling;
        if(h3) h3.textContent = "Tools & Technologies";
    }
    if (lists[3]) {
        lists[3].innerHTML = skillsData.soft_skills.map(item => `<li>${item}</li>`).join('');
        const h3 = lists[3].previousElementSibling;
        if(h3) h3.textContent = "Soft Skills";
    }
}

function renderServices(servicesData) {
    const container = document.getElementById('services-container');
    const title = document.querySelector('#services h2');
    const summary = document.querySelector('#services p');

    if (title) title.textContent = servicesData.title;
    if (summary) summary.textContent = servicesData.services_summary;

    if (container) {
        container.innerHTML = servicesData.items.map(item => `
            <div class="col-md-4" data-aos="zoom-in-up" data-aos-duration="1000">
                <div class="card text-center h-100">
                    <div class="card-body h-100">
                        <i class="${item.icon} service-icon"></i>
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-text">${item.text}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function renderExperience(expData) {
    const container = document.getElementById('experience-container');
    const title = document.querySelector('#experience h2');
    const summary = document.querySelector('#experience > .container > p');

    if (title) title.textContent = expData.title;
    if (summary) summary.textContent = expData.summary;

    if (container) {
        container.innerHTML = expData.jobs.map(job => `
            <div class="card mb-3" data-aos="fade-up" data-aos-duration="1000">
                <div class="card-body">
                    <h3 class="card-title">${job.title}</h3>
                    <h4 class="card-subtitle mb-2">${job.company} | ${job.duration} | ${job.location} | ${job.job_type}</h4>
                    <ul>
                        ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }
}

function renderProjectsSection(projectsInfo, projectsData) {
    const section = document.getElementById('projects');
    if (!section) return;

    section.querySelector('h2').textContent = projectsInfo.title;
    section.querySelector('p').textContent = projectsInfo.projects_summary;

    const tabsContainer = document.getElementById('projectTabs');
    if (tabsContainer) {
        tabsContainer.innerHTML = projectsInfo.tabs.map((tab, index) => `
            <li class="nav-item" role="presentation">
                <button class="nav-link ${index === 0 ? 'active' : ''}" 
                    id="${tab.id}-tab" 
                    data-bs-toggle="tab" 
                    data-bs-target="#${tab.id}" 
                    type="button" 
                    role="tab" 
                    aria-controls="${tab.id}" 
                    aria-selected="${index === 0}"
                    data-company="${tab.id}"
                    onclick="filterProjects('${tab.id}')"
                >
                    ${tab.text}
                </button>
            </li>
        `).join('');
        tabsContainer.querySelectorAll('.nav-link').forEach(tab => {
            tab.addEventListener('click', () => {
                window.trackEvent?.('company_filter', { company: tab.dataset.company });
            });
        });
    }

    window.allProjectsData = projectsData;
    populateTechnologyFilter(projectsData);

    const searchInput = document.getElementById('project-search');
    const technologyFilter = document.getElementById('technology-filter');
    if (searchInput) {
        searchInput.addEventListener('input', () => filterProjects(window.activeProjectCategory || 'all'));
        searchInput.addEventListener('change', () => {
            if (searchInput.value.trim()) {
                window.trackEvent?.('project_search', { search_term: searchInput.value.trim() });
            }
        });
    }
    if (technologyFilter) {
        technologyFilter.addEventListener('change', () => {
            filterProjects(window.activeProjectCategory || 'all');
            if (technologyFilter.value !== 'all') {
                window.trackEvent?.('technology_filter', { technology: technologyFilter.value });
            }
        });
    }

    filterProjects('all');
}

function populateTechnologyFilter(projectsData) {
    const select = document.getElementById('technology-filter');
    if (!select) return;

    const technologies = [...new Set(Object.values(projectsData)
        .flat()
        .flatMap(project => project.technologies || []))]
        .sort((a, b) => a.localeCompare(b));

    select.innerHTML = '<option value="all">All Technologies</option>' + technologies
        .map(technology => `<option value="${technology}">${technology}</option>`)
        .join('');
}

window.filterProjects = function(category) {
    const container = document.getElementById('projects-container');
    if (!container || !window.allProjectsData) return;

    window.activeProjectCategory = category;

    let projectsToShow = [];
    if (category === 'all') {
        Object.values(window.allProjectsData).forEach(group => {
            projectsToShow = projectsToShow.concat(group);
        });
    } else {
        projectsToShow = window.allProjectsData[category] || [];
    }

    const searchTerm = (document.getElementById('project-search')?.value || '').trim().toLowerCase();
    const selectedTechnology = document.getElementById('technology-filter')?.value || 'all';
    projectsToShow = projectsToShow.filter(project => {
        const searchableText = [project.title, project.description, project.company,
            ...(project.technologies || [])].join(' ').toLowerCase();
        const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
        const matchesTechnology = selectedTechnology === 'all' ||
            (project.technologies || []).includes(selectedTechnology);
        return matchesSearch && matchesTechnology;
    });

    container.innerHTML = projectsToShow.map(project => `
        <div class="col-md-4 mb-4" data-aos="zoom-in-up" data-aos-duration="1000">
            <div class="card h-100">
                <img src="${project.image}" class="card-img-top project-logo" alt="Logo for ${project.title}" loading="lazy" decoding="async" width="100" height="100">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-text flex-grow-1">${project.description}</p>
                    <div class="project-technologies mb-3">${(project.technologies || [])
                        .map(technology => `<span class="technology-badge">${technology}</span>`).join('')}</div>
                    <button type="button" class="btn btn-outline-primary mb-2 project-details-button"
                        data-project-title="${project.title}">View Details</button>
                    <a href="${project.link}" class="btn btn-primary mt-auto project-live-link" data-project-title="${project.title}" target="_blank" rel="noopener noreferrer" title="View the ${project.title} project">View Project</a>
                </div>
            </div>
        </div>
    `).join('');

    const noProjectsMessage = document.getElementById('no-projects-message');
    if (noProjectsMessage) noProjectsMessage.hidden = projectsToShow.length > 0;

    container.querySelectorAll('.project-details-button').forEach(button => {
        button.addEventListener('click', () => showProjectDetails(button.dataset.projectTitle));
    });
    container.querySelectorAll('.project-live-link').forEach(link => {
        link.addEventListener('click', () => {
            window.trackEvent?.('project_click', { project_name: link.dataset.projectTitle });
        });
    });

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none'; 
};

function showProjectDetails(projectTitle) {
    const project = Object.values(window.allProjectsData || {}).flat()
        .find(item => item.title === projectTitle);
    const modalElement = document.getElementById('project-details-modal');
    if (!project || !modalElement || typeof bootstrap === 'undefined') return;

    document.getElementById('project-details-title').textContent = project.title;
    document.getElementById('project-details-description').textContent = project.description;
    document.getElementById('project-details-company').textContent = project.company;
    document.getElementById('project-details-link').href = project.link;
    window.trackEvent?.('project_view', { project_name: project.title });
    document.getElementById('project-details-technologies').innerHTML = (project.technologies || [])
        .map(technology => `<span class="technology-badge">${technology}</span>`).join('');

    const featuresWrapper = document.getElementById('project-details-features-wrapper');
    const featuresList = document.getElementById('project-details-features');
    const features = project.features || [];
    if (featuresWrapper && featuresList) {
        featuresWrapper.hidden = features.length === 0;
        featuresList.innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
    }

    const responsibilitiesWrapper = document.getElementById('project-details-responsibilities-wrapper');
    const responsibilitiesList = document.getElementById('project-details-responsibilities');
    const responsibilities = project.responsibilities || [];
    if (responsibilitiesWrapper && responsibilitiesList) {
        responsibilitiesWrapper.hidden = responsibilities.length === 0;
        responsibilitiesList.innerHTML = responsibilities
            .map(responsibility => `<li>${responsibility}</li>`).join('');
    }

    const challengesWrapper = document.getElementById('project-details-challenges-wrapper');
    const challengesContainer = document.getElementById('project-details-challenges');
    const challenges = project.challenges || [];
    if (challengesWrapper && challengesContainer) {
        challengesWrapper.hidden = challenges.length === 0;
        challengesContainer.innerHTML = challenges.map(item => `
            <div class="project-challenge mb-3">
                <p class="mb-1"><strong>Challenge:</strong> ${item.challenge}</p>
                <p class="mb-0"><strong>Solution:</strong> ${item.solution}</p>
            </div>
        `).join('');
    }

    bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

const projectDetailsModal = document.getElementById('project-details-modal');
if (projectDetailsModal) {
    projectDetailsModal.addEventListener('show.bs.modal', () => {
        document.documentElement.classList.add('modal-open');
        document.body.classList.add('modal-open');
    });

    projectDetailsModal.addEventListener('hidden.bs.modal', () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
    });
}

function renderFAQ(faqData) {
    const container = document.querySelector('#faq .container');
    if (!container) return;

    const title = container.querySelector('h2');
    const summary = container.querySelector('p');
    if (title) title.textContent = faqData.title;
    if (summary) summary.textContent = faqData.summary;

    const accordion = document.getElementById('faqAccordion');
    if (accordion) {
        accordion.innerHTML = faqData.faqs.map((item, index) => `
            <div class="accordion-item" data-aos="fade-up" data-aos-duration="1000">
                <h3 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${index !== 0 ? 'collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${index === 0}" aria-controls="collapse${index}">
                        ${item.question}
                    </button>
                </h3>
                <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" aria-labelledby="heading${index}" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        <p style="margin-bottom: 0;">${item.answer}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function renderContact(contactData) {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    contactSection.querySelector('h2').textContent = contactData.title;
    contactSection.querySelector('p').textContent = contactData.contact_summary;

    const formLabels = {
        name: contactData.form.name_label,
        email: contactData.form.email_label,
        service: contactData.form.service_label,
        'project-type': contactData.form.project_type_label,
        technology: contactData.form.technology_label,
        backend: contactData.form.backend_label,
        database: contactData.form.database_label,
        budget: contactData.form.budget_label,
        timeline: contactData.form.timeline_label,
        'website-url': contactData.form.website_url_label,
        message: contactData.form.message_label
    };
    Object.entries(formLabels).forEach(([fieldId, labelText]) => {
        const label = contactSection.querySelector(`label[for="${fieldId}"]`);
        if (label && labelText) {
            const optionalText = label.querySelector('.text-muted');
            label.textContent = labelText;
            if (optionalText) label.appendChild(optionalText);
        }
    });
    
    const btn = contactSection.querySelector('button[type="submit"]');
    if (btn) btn.textContent = contactData.form.submit_button;

    const form = contactSection.querySelector('#contact-form');
    if (form && !form.dataset.analyticsBound) {
        form.addEventListener('submit', () => window.trackEvent?.('contact_form_submit'));
        form.dataset.analyticsBound = 'true';
    }
}

function renderFooter(footerData) {
    const footer = document.getElementById('main-footer');
    if (!footer) return;

    const copyright = footer.querySelector('p');
    if (copyright) copyright.textContent = footerData.text;

    const socialList = footer.querySelector('ul');
    if (socialList) {
        socialList.innerHTML = footerData.social_links.map(link => {
            let iconHtml = '';
            if (link.icon) {
                iconHtml = `<i class="${link.icon}"></i>`;
            } else if (link.svg_icon) {
                iconHtml = `<img src="${link.svg_icon}" style="width: 24px; height: 24px;">`;
            }
            const accessibleLabel = link.title || link.text || 'Social Link';
            return `<li><a href="${link.href}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${accessibleLabel}" title="${accessibleLabel}">${iconHtml}</a></li>`;
        }).join('');
        socialList.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', () => {
                window.trackEvent?.('social_link_click', { social_network: link.title });
            });
        });
    }
}

function renderBlogs(blogsData) {
    const container = document.getElementById('blog-container');
    if (!container || !Array.isArray(blogsData)) return;

    const latestBlogs = [...blogsData]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 6);

    window.blogsData = blogsData;

    container.innerHTML = latestBlogs.map(blog => `
        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-duration="1000">
            <article class="card blog-card h-100">
                <div class="card-body d-flex flex-column">
                    <p class="blog-category mb-2">${blog.category}</p>
                    <h3 class="card-title">${blog.title}</h3>
                    <time class="blog-date mb-3" datetime="${blog.date}">${formatBlogDate(blog.date)}</time>
                    <p class="card-text flex-grow-1">${blog.excerpt}</p>
                    <a href="blog/${blog.slug}.html" class="btn btn-primary mt-auto">Read Article</a>
                </div>
            </article>
        </div>
    `).join('');

}

function formatBlogDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }).format(new Date(`${dateString}T00:00:00`));
}
