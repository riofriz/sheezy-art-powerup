async function fetchRandomArtworks() {
    try {
        const response = await fetch("https://sheezy.art/browse?q=%3Erandom");
        const text = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        const artworkList = doc.querySelector("#content > section > main > aside+div > ul");

        if (!artworkList) {
            console.log("Artwork list not found.");
            return null;
        }

        return artworkList;

    } catch (error) {
        console.error("Failed to fetch artworks:", error);
        return null;
    }
}

function injectArtworks(artworkList, container) {
    container.innerHTML = '';
    container.appendChild(artworkList);
}

async function rerollArtworks(container) {
    const artworkList = await fetchRandomArtworks();
    if (artworkList) {
        injectArtworks(artworkList, container);
    }
}

async function addRandomArtworksSection() {
    const targetElement = document.querySelector('.mobile\\:flex.mobile\\:flex-wrap.mobile\\:gap-20');

    if (!targetElement) {
        console.log("Target element not found.");
        return;
    }

    // Check if the wrapper already exists to avoid duplication
    if (document.querySelector('.random-artworks-wrapper')) {
        return; // Avoid injecting again if it already exists
    }

    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('mobile:flex-greedy', 'mobile:max-tablet:ml-10', 'random-artworks-wrapper'); // Add a unique class to identify it

    const title = document.createElement('h1');
    title.classList.add('kpIkk', 'mx-14', 'mobile:mx-5');
    title.innerHTML = '<span><b>Random</b> Artworks</span>';

    const rerollButton = document.createElement('a');
    rerollButton.href = '#';
    rerollButton.classList.add('Jl3nl', 'Ox34D', 'fov1n', 'JrihF', 'not-prose', 'text-12', 'normal-case');
    rerollButton.tabIndex = 0;
    rerollButton.innerHTML = '<span class="kgabw">Re-roll</span><span class="ReZic"><i class="not-prose material-symbols-outlined fHAI2"><span class="KOwcM">refresh</span></i></span>';
    rerollButton.addEventListener('click', (e) => {
        e.preventDefault();
        rerollArtworks(artworkListContainer);  
    });

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('ml-auto');
    titleSpan.appendChild(rerollButton);
    title.appendChild(titleSpan);

    wrapperDiv.appendChild(title);

    const artworkListContainer = document.createElement('div');
    wrapperDiv.appendChild(artworkListContainer);

    targetElement.parentNode.insertBefore(wrapperDiv, targetElement.nextSibling);

    const artworkList = await fetchRandomArtworks();
    if (artworkList) {
        injectArtworks(artworkList, artworkListContainer);
    }
}

// Mutation observer callback function to ensure artwork section is always present
const observerCallback = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const targetElement = document.querySelector('.mobile\\:flex.mobile\\:flex-wrap.mobile\\:gap-20');
            if (targetElement && !document.querySelector('.random-artworks-wrapper')) {
                // Only add random artworks section if it doesn't already exist
                addRandomArtworksSection();
            }
        }
    }
};

// Function to start observing the DOM
function startObservingDOM() {
    const targetElement = document.querySelector('#content'); // Root element of the page content

    if (targetElement) {
        const observerConfig = {
            childList: true,
            subtree: true
        };
        const observer = new MutationObserver(observerCallback);
        observer.observe(targetElement, observerConfig);
    }
}

// Call both the observer and inject on load
window.addEventListener('load', () => {
    addRandomArtworksSection(); // Initial inject on load
    startObservingDOM(); // Start observing DOM for future changes
});
