function populateContent(data) {
    console.log('populateContent started');
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
        console.log('Populating project tabs');
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
        console.log('Project tabs populated');
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
        document.querySelector('footer p').innerHTML = data.footer.text;
    }
    console.log('populateContent finished');
}

function populateProjects(projectsData, projectTabsData) {
    console.log('populateProjects started');
    let allProjectsData = projectsData;
    const projectsContainer = document.getElementById('projects-container');
    const projectTabs = document.getElementById('projectTabs');

    // Populate project tabs
    if (projectTabsData) {
        console.log('Populating project tabs in populateProjects');
        projectTabs.innerHTML = '';
        projectTabsData.forEach((tab, index) => {
            const activeClass = (index === 0) ? 'active' : '';
            projectTabs.innerHTML += `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ${activeClass}" id="${tab.id}-tab" type="button" role="tab" data-company="${tab.id}">${tab.text}</button>
                </li>
            `;
        });
        console.log('Project tabs populated in populateProjects');
    }

    function renderProjects(filter = 'all') {
        console.log('renderProjects started with filter:', filter);
        if (!projectsContainer) {
            console.log('projectsContainer not found');
            return;
        }

        let projectsToRender = [];
        if (filter === 'all') {
            for (const company in allProjectsData) {
                projectsToRender = projectsToRender.concat(allProjectsData[company]);
            }
        } else {
            projectsToRender = allProjectsData[filter] || [];
        }

        projectsContainer.innerHTML = ''; // Clear existing projects
        projectsToRender.forEach(project => {
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
        console.log('renderProjects finished. Projects rendered:', projectsToRender.length);
    }

    renderProjects(); // Render all projects initially

    if (projectTabs) {
        projectTabs.addEventListener('click', function(event) {
            console.log('Tab clicked');
            const clickedButton = event.target.closest('[data-company]');
            if (clickedButton) {
                event.preventDefault(); // Prevent default tab behavior

                // Handle active state
                const allTabs = projectTabs.querySelectorAll('[data-company]');
                allTabs.forEach(tab => tab.classList.remove('active'));
                clickedButton.classList.add('active');

                const company = clickedButton.getAttribute('data-company');
                renderProjects(company);
            }
        });
    }
    console.log('populateProjects finished');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    Promise.all([
        fetch('data/content.json').then(response => response.json()),
        fetch('data/projects.json').then(response => response.json())
    ])
    .then(([contentData, projectsData]) => {
        console.log('Data fetched successfully');
        populateContent(contentData);
        populateProjects(projectsData, contentData.projects.tabs);
        console.log('populateContent and populateProjects called');
    })
    .catch(error => console.error('Error fetching data:', error));
});