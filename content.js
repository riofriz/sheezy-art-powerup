window.addEventListener('load', () => {
    if (window.location.hostname === "sheezy.art") {
        startPollingNotifications();

        if (window.location.pathname === '/') {
            addRandomArtworksSection();
        }
    }
});
