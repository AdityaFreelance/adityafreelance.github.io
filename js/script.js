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