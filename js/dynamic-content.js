document.addEventListener('DOMContentLoaded', () => {
    // Fetch and load all content
    Promise.all([
        fetch('data/content.json').then(res => res.json()),
        fetch('data/projects.json').then(res => res.json()),
        fetch('data/faq.json').then(res => res.json())
    ]).then(([contentData, projectsData, faqData]) => {
        
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

        // 9. Testimonials Section
        renderTestimonials(contentData.testimonials);

        // 10. Contact Section
        renderContact(contentData.contact);

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

    const btn = aboutSection.querySelector('.btn-primary');
    if (btn) {
        btn.textContent = aboutData.resume.button_text;
        btn.href = aboutData.resume.download_url;
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
    }

    window.allProjectsData = projectsData;
    filterProjects('all');
}

window.filterProjects = function(category) {
    const container = document.getElementById('projects-container');
    if (!container || !window.allProjectsData) return;

    let projectsToShow = [];
    if (category === 'all') {
        Object.values(window.allProjectsData).forEach(group => {
            projectsToShow = projectsToShow.concat(group);
        });
    } else {
        projectsToShow = window.allProjectsData[category] || [];
    }

    container.innerHTML = projectsToShow.map(project => `
        <div class="col-md-4 mb-4" data-aos="zoom-in-up" data-aos-duration="1000">
            <div class="card h-100">
                <img src="${project.image}" class="card-img-top project-logo" alt="Logo for ${project.title}" loading="lazy" decoding="async" width="100" height="100">
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title">${project.title}</h3>
                    <p class="card-text flex-grow-1">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary mt-auto" target="_blank" rel="noopener noreferrer" title="View the ${project.title} project">View Project</a>
                </div>
            </div>
        </div>
    `).join('');

    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'none'; 
};

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

function renderTestimonials(testimonialsData) {
    const section = document.getElementById('testimonials');
    if (!section) return;

    section.querySelector('h2').textContent = testimonialsData.title;

    const slider = section.querySelector('.testimonial-slider');
    if (slider) {
        slider.innerHTML = testimonialsData.items.map(item => `
            <div class="testimonial-item">
                <img src="${item.image}" alt="${item.author}" class="rounded-circle mb-3">
                <p class="mb-3">"${item.text}"</p>
                <h4 class="mb-1">${item.author}</h4>
                <small class="text-muted">${item.company}</small>
            </div>
        `).join('');

        // Initialize Slick Carousel after content is injected
        $(slider).slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 3000,
             arrows: true 
        });
    }
}

function renderContact(contactData) {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    contactSection.querySelector('h2').textContent = contactData.title;
    contactSection.querySelector('p').textContent = contactData.contact_summary;

    const labels = contactSection.querySelectorAll('label');
    if (labels[0]) labels[0].textContent = contactData.form.name_label;
    if (labels[1]) labels[1].textContent = contactData.form.email_label;
    if (labels[2]) labels[2].textContent = contactData.form.message_label;
    
    const btn = contactSection.querySelector('button[type="submit"]');
    if (btn) btn.textContent = contactData.form.submit_button;
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
            return `<li><a href="${link.href}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Social Link" title="${link.title || ''}">${iconHtml}</a></li>`;
        }).join('');
    }
}