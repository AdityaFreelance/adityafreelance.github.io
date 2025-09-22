function populateContent(data) {
    // Navigation
    if (data.navigation) {
        document.querySelector('.navbar-brand').textContent = data.navigation.brand;
        const navLinks = document.querySelector('.navbar-nav');
        navLinks.innerHTML = '';
        data.navigation.links.forEach(link => {
            navLinks.innerHTML += `<li class="nav-item"><a class="nav-link" href="${link.href}">${link.text}</a></li>`;
        });
    }

    // Hero
    if (data.hero) {
        new Typed('#typed', {
            strings: data.hero.typed_text,
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });
    }

    // About
    if (data.about) {
        document.getElementById('about-title').textContent = data.about.title;
        document.getElementById('about-text').textContent = data.about.text;
        document.getElementById('about-image').src = data.about.image;

        if (data.about.resume) {
            const aboutButtonContainer = document.getElementById('about-button-container');
            const resumeButton = document.createElement('a');
            resumeButton.href = data.about.resume.download_url;
            resumeButton.textContent = data.about.resume.button_text;
            resumeButton.classList.add('btn', 'btn-primary');
            resumeButton.setAttribute('download', '');
            aboutButtonContainer.appendChild(resumeButton);
        }
    }

    // Skills
    if (data.skills) {
        document.getElementById('skills-title').textContent = data.skills.title;
        if (data.skills.skills_summary) {
            document.getElementById('skills-summary').textContent = data.skills.skills_summary;
        }
        
        const proficientTechList = document.getElementById('proficient-tech-list');
        proficientTechList.innerHTML = '';
        data.skills.proficient_technologies.forEach(skill => {
            proficientTechList.innerHTML += `<li>${skill}</li>`;
        });

        const familiarTechList = document.getElementById('familiar-tech-list');
        familiarTechList.innerHTML = '';
        data.skills.familiar_technologies.forEach(skill => {
            familiarTechList.innerHTML += `<li>${skill}</li>`;
        });

        const toolsList = document.getElementById('tools-list');
        toolsList.innerHTML = '';
        data.skills.tools.forEach(tool => {
            toolsList.innerHTML += `<li>${tool}</li>`;
        });

        const softSkillsList = document.getElementById('soft-skills-list');
        softSkillsList.innerHTML = '';
        data.skills.soft_skills.forEach(skill => {
            softSkillsList.innerHTML += `<li>${skill}</li>`;
        });
    }

    // Services
    if (data.services) {
        document.getElementById('services-title').textContent = data.services.title;
        if (data.services.services_summary) {
            document.getElementById('services-summary').textContent = data.services.services_summary;
        }
        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = '';
        data.services.items.forEach(service => {
            servicesContainer.innerHTML += `
                <div class="col-md-4" data-aos="zoom-in-up" data-aos-duration="1000">
                    <div class="card text-center h-100">
                        <div class="card-body h-100">
                            <i class="${service.icon} service-icon"></i>
                            <h3 class="card-title">${service.title}</h3>
                            <p class="card-text">${service.text}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    // Experience
    if (data.experience) {
        document.getElementById('experience-title').textContent = data.experience.title;
        if (data.experience.summary) {
            document.getElementById('experience-summary').textContent = data.experience.summary;
        }
        const experienceContainer = document.getElementById('experience-container');
        experienceContainer.innerHTML = '';
        data.experience.jobs.forEach(job => {
            experienceContainer.innerHTML += `
                <div class="card mb-3" data-aos="fade-up" data-aos-duration="1000">
                    <div class="card-body">
                        <h3 class="card-title">${job.title}</h3>
                        <h4 class="card-subtitle mb-2">${job.company} | ${job.duration} | ${job.location}</h4>
                        <ul>
                            ${job.responsibilities.map(responsibility => `<li>${responsibility}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
    }

    // Projects (Tabs)
    if (data.projects) {
        document.getElementById('projects-title').textContent = data.projects.title;
        if (data.projects.projects_summary) {
            document.getElementById('projects-summary').textContent = data.projects.projects_summary;
        }
        const projectTabs = document.getElementById('projectTabs');
        projectTabs.innerHTML = '';
        data.projects.tabs.forEach((tab, index) => {
            const activeClass = (index === 0) ? 'active' : '';
            const ariaSelected = (index === 0) ? 'true' : 'false';
            projectTabs.innerHTML += `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ${activeClass}" id="${tab.id}-tab" type="button" role="tab" data-company="${tab.id}" aria-selected="${ariaSelected}">${tab.text}</button>
                </li>
            `;
        });
    }

    // Testimonials
    if (data.testimonials) {
        document.getElementById('testimonials-title').textContent = data.testimonials.title;
        const testimonialSlider = document.querySelector('.testimonial-slider');
        testimonialSlider.innerHTML = '';
        data.testimonials.items.forEach(item => {
            testimonialSlider.innerHTML += `
                <div class="testimonial-item">
                    <img src="${item.image}" class="rounded-circle" alt="Photo of ${item.author}">
                    <p>"${item.text}"</p>
                    <footer class="blockquote-footer">${item.author}, <cite title="Source Title">${item.company}</cite></footer>
                </div>
            `;
        });
        
    }

    // Contact
    if (data.contact) {
        document.getElementById('contact-title').textContent = data.contact.title;
        if (data.contact.contact_summary) {
            document.getElementById('contact-summary').textContent = data.contact.contact_summary;
        }
        document.getElementById('name-label').textContent = data.contact.form.name_label;
        document.getElementById('email-label').textContent = data.contact.form.email_label;
        document.getElementById('message-label').textContent = data.contact.form.message_label;
        document.getElementById('submit-button').textContent = data.contact.form.submit_button;
    }

    // Footer
    if (data.footer) {
        const footer = document.getElementById('main-footer');
        footer.innerHTML = ''; // Clear the footer

        if (data.footer.social_links) {
            const socialLinksContainer = document.createElement('ul');
            socialLinksContainer.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'mb-3');
            socialLinksContainer.style.gap = '1rem';
            socialLinksContainer.style.listStyle = 'none';
            socialLinksContainer.style.padding = '0';
            data.footer.social_links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = link.href;
                a.classList.add('social-link');
                a.target = '_blank';
                
                let ariaLabel = '';
                if (link.icon.includes('linkedin')) {
                    ariaLabel = 'Visit my LinkedIn profile';
                } else if (link.icon.includes('envelope')) {
                    ariaLabel = 'Send me an email';
                } else if (link.icon.includes('phone')) {
                    ariaLabel = 'Call me';
                } else if (link.icon.includes('whatsapp')) {
                    ariaLabel = 'Send me a message on WhatsApp';
                } else if (link.icon.includes('twitter')) {
                    ariaLabel = 'Visit my Twitter profile';
                }
                a.setAttribute('aria-label', ariaLabel);

                const i = document.createElement('i');
                i.className = link.icon;
                a.appendChild(i);
                li.appendChild(a);
                socialLinksContainer.appendChild(li);
            });
            footer.appendChild(socialLinksContainer);
        }

        const copyrightP = document.createElement('p');
        copyrightP.innerHTML = data.footer.text;
        footer.appendChild(copyrightP);
    }
}

function populateProjects(projectsData) {
    const projectsContainer = document.getElementById('projects-container');
    const projectTabs = document.getElementById('projectTabs');
    const loadMoreContainer = document.getElementById('load-more-container');
    let currentFilter = 'all';
    const expandedState = {};

    // Initialize expanded state
    for (const company in projectsData) {
        expandedState[company] = false;
    }
    expandedState['all'] = false;


    function renderProjects() {
        let projectsToRender = [];
        if (currentFilter === 'all') {
            for (const company in projectsData) {
                projectsToRender = projectsToRender.concat(projectsData[company]);
            }
        } else {
            projectsToRender = projectsData[currentFilter] || [];
        }

        const isExpanded = expandedState[currentFilter];
        const projectsToShow = isExpanded ? projectsToRender : projectsToRender.slice(0, 3);

        projectsContainer.innerHTML = ''; // Clear existing projects
        projectsToShow.forEach(project => {
            const projectCard = `
                <div class="col-md-4 mb-4" data-aos="zoom-in-up" data-aos-duration="1000">
                    <div class="card h-100">
                        <img src="${project.image}" class="card-img-top project-logo" alt="Logo for ${project.title}">
                        <div class="card-body d-flex flex-column">
                            <h3 class="card-title">${project.title}</h3>
                            <p class="card-text flex-grow-1">${project.description}</p>
                            <a href="${project.link}" class="btn btn-primary mt-auto" target="_blank">View Project</a>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.innerHTML += projectCard;
        });

        // Render Load More/Less button
        loadMoreContainer.innerHTML = '';
        if (projectsToRender.length > 3) {
            const buttonText = isExpanded ? 'Load Less' : 'Load More';
            const loadMoreButton = `<button id="load-more-btn" class="btn btn-primary">${buttonText}</button>`;
            loadMoreContainer.innerHTML = loadMoreButton;
        }
    }

    // Initial render
    renderProjects();

    // Event listener for tabs
    if (projectTabs) {
        projectTabs.addEventListener('click', function(event) {
            const clickedButton = event.target.closest('[data-company]');
            if (clickedButton) {
                event.preventDefault();

                const allTabs = projectTabs.querySelectorAll('[data-company]');
                allTabs.forEach(tab => tab.classList.remove('active'));
                clickedButton.classList.add('active');

                currentFilter = clickedButton.getAttribute('data-company');
                renderProjects();
            }
        });
    }

    // Event listener for Load More/Less button
    if (loadMoreContainer) {
        loadMoreContainer.addEventListener('click', function(event) {
            if (event.target.id === 'load-more-btn') {
                expandedState[currentFilter] = !expandedState[currentFilter];
                renderProjects();
            }
        });
    }
}

function populateFAQ(faqData) {
    document.getElementById('faq-title').textContent = faqData.title;
    document.getElementById('faq-summary').textContent = faqData.summary;
    const faqAccordion = document.getElementById('faqAccordion');
    faqAccordion.innerHTML = '';
    faqData.faqs.forEach((faq, index) => {
        const expanded = index === 0 ? 'true' : 'false';
        const show = index === 0 ? 'show' : '';
        const collapsed = index === 0 ? '' : 'collapsed';
        faqAccordion.innerHTML += `
            <div class="accordion-item">
                <h3 class="accordion-header" id="heading${index}">
                    <button class="accordion-button ${collapsed}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="${expanded}" aria-controls="collapse${index}">
                        ${faq.question}
                    </button>
                </h3>
                <div id="collapse${index}" class="accordion-collapse collapse ${show}" aria-labelledby="heading${index}" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        <p style="margin-bottom: 0;">${faq.answer}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        fetch('data/content.json').then(response => response.json()),
        fetch('data/projects.json').then(response => response.json()),
        fetch('data/faq.json').then(response => response.json())
    ])
    .then(([contentData, projectsData, faqData]) => {
        populateContent(contentData);
        populateProjects(projectsData);
        populateFAQ(faqData);
    })
    .catch(error => console.error('Error fetching data:', error));

    const contactForm = document.querySelector('#contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const errorMessage = document.getElementById('error-message');
        
        errorMessage.textContent = '';

        if (name === '' || email === '' || message === '') {
            errorMessage.textContent = 'All fields are required.';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address.';
            return;
        }
        
        const whatsappMessage = `Name: ${name}\\nEmail: ${email}\\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        const phoneNumber = '918545845171';
        
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.location.href = whatsappURL;
    });
});