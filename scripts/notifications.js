async function fetchHomepage() {
    try {
      const response = await fetch('https://sheezy.art/');
      const text = await response.text();
  
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
  
      const fetchedNotificationLink = doc.querySelector('a[href="/inbox/notifications"]');
      const currentNotificationLink = document.querySelector('a[href="/inbox/notifications"]');
  
      if (fetchedNotificationLink && currentNotificationLink) {
        const fetchedNotificationCount = fetchedNotificationLink.querySelector('span.fqr-7');
        const currentNotificationCount = currentNotificationLink.querySelector('span.fqr-7');
  
        if (
          fetchedNotificationCount && 
          (!currentNotificationCount || fetchedNotificationCount.innerText !== currentNotificationCount.innerText)
        ) {
          console.log('New notifications detected, refreshing the page.');
          location.reload();
        }
      }
    } catch (error) {
      console.error("Error fetching homepage:", error);
    }
  }
  

  function startPollingNotifications() {
    setInterval(() => {
      if (window.location.hostname === "sheezy.art") {
        fetchHomepage();
      }
    }, 30000);
  }
  