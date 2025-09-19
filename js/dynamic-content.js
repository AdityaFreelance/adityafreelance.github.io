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
    }

    // Skills
    if (data.skills) {
        document.getElementById('skills-title').textContent = data.skills.title;
        
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
        const servicesContainer = document.getElementById('services-container');
        servicesContainer.innerHTML = '';
        data.services.items.forEach(service => {
            servicesContainer.innerHTML += `
                <div class="col-md-4" data-aos="zoom-in-up" data-aos-duration="1000">
                    <div class="card text-center h-100">
                        <div class="card-body h-100">
                            <i class="${service.icon} service-icon"></i>
                            <h5 class="card-title">${service.title}</h5>
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
                        <h5 class="card-title">${job.title}</h5>
                        <h6 class="card-subtitle mb-2">${job.company} | ${job.duration} | ${job.location}</h6>
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
        const projectTabs = document.getElementById('projectTabs');
        projectTabs.innerHTML = '';
        data.projects.tabs.forEach((tab, index) => {
            const activeClass = (index === 0) ? 'active' : '';
            projectTabs.innerHTML += `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ${activeClass}" id="${tab.id}-tab" type="button" role="tab" data-company="${tab.id}">${tab.text}</button>
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
                    <img src="${item.image}" class="rounded-circle" alt="Testimonial Image">
                    <p>"${item.text}"</p>
                    <footer class="blockquote-footer">${item.author}, <cite title="Source Title">${item.company}</cite></footer>
                </div>
            `;
        });
        
    }

    // Contact
    if (data.contact) {
        document.getElementById('contact-title').textContent = data.contact.title;
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
                        <img src="${project.image}" class="card-img-top project-logo" alt="${project.title} Logo">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${project.title}</h5>
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

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([
        fetch('data/content.json').then(response => response.json()),
        fetch('data/projects.json').then(response => response.json())
    ])
    .then(([contentData, projectsData]) => {
        populateContent(contentData);
        populateProjects(projectsData);
    })
    .catch(error => console.error('Error fetching data:', error));

    const contactForm = document.querySelector('#contact form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        const phoneNumber = '918545845171';
        
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.location.href = whatsappURL;
    });
});