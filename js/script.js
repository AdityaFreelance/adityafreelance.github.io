window.trackEvent = function (eventName, eventParameters = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventParameters);
    }
};

// This script initializes the AOS library, which provides animations on scroll.

AOS.init({
    // The duration of the animation in milliseconds.
    duration: 1000,
    // The easing function to use for the animation.
    easing: 'ease-in-out',
    // Whether the animation should only happen once.
    once: true,
});

// Keyboard navigation for project filters.
const projectTabs = document.getElementById('projectTabs');
if (projectTabs) {
    projectTabs.addEventListener('keydown', function(event) {
        const tabs = Array.from(projectTabs.querySelectorAll('button.nav-link'));
        if (!tabs.length) return;
        const focusedTab = document.activeElement;
        const focusedTabIndex = tabs.indexOf(focusedTab);
        if (focusedTabIndex < 0) return;

        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            const nextTabIndex = (focusedTabIndex + 1) % tabs.length;
            tabs[nextTabIndex].focus();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            const prevTabIndex = (focusedTabIndex - 1 + tabs.length) % tabs.length;
            tabs[prevTabIndex].focus();
        } else if (event.key === 'Home') {
            event.preventDefault();
            tabs[0].focus();
        } else if (event.key === 'End') {
            event.preventDefault();
            tabs[tabs.length - 1].focus();
        }
    });
}



// Typed.js initialization has been moved to js/dynamic-content.js to use data from content.json
