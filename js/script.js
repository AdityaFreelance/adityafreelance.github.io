// This script initializes the AOS library, which provides animations on scroll.

AOS.init({
    // The duration of the animation in milliseconds.
    duration: 1000,
    // The easing function to use for the animation.
    easing: 'ease-in-out',
    // Whether the animation should only happen once.
    once: true,
});

// Keyboard navigation for project tabs
const projectTabs = document.getElementById('projectTabs');
if (projectTabs) {
    projectTabs.addEventListener('keydown', function(event) {
        const tabs = Array.from(projectTabs.querySelectorAll('.nav-link'));
        const focusedTab = document.activeElement;
        const focusedTabIndex = tabs.indexOf(focusedTab);

        if (event.key === 'ArrowRight') {
            event.preventDefault();
            const nextTabIndex = (focusedTabIndex + 1) % tabs.length;
            tabs[nextTabIndex].focus();
        } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const prevTabIndex = (focusedTabIndex - 1 + tabs.length) % tabs.length;
            tabs[prevTabIndex].focus();
        }
    });
}

// Preloader timing: show for at least 5 seconds
// const PRELOADER_MIN_MS = 3500;
// const preloaderStart = performance.now();

// window.addEventListener('load', function() {
//     const preloader = document.getElementById('preloader');
//     if (!preloader) return;
//     const elapsed = performance.now() - preloaderStart;
//     const remaining = Math.max(0, PRELOADER_MIN_MS - elapsed);
//     setTimeout(function(){ preloader.classList.add('hidden'); }, remaining);
// });

// // Fallback: hide after 5s even if 'load' never fires
// setTimeout(function(){
//     const preloader = document.getElementById('preloader');
//     if (preloader) preloader.classList.add('hidden');
// }, PRELOADER_MIN_MS);

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('typed')) {
        new Typed('#typed', {
            strings: [
                "a Software Engineer",
                "a Front End Developer",
                "an UI Developer",
                "a HTML Developer"
            ],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });
    }
});
