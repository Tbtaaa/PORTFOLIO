(async function () {

    const navContainer = document.getElementById("site-nav");

    if (!navContainer) return;


    // ---------------------------------
    // CHECK WHERE THE CURRENT PAGE IS
    // ---------------------------------

    const isProjectDetail =
        window.location.pathname.includes("/projects/");

    const prefix = isProjectDetail ? "../" : "";


    // ---------------------------------
    // LOAD NAV.HTML
    // ---------------------------------

    const response = await fetch(prefix + "nav/nav.html");
    const html = await response.text();

    navContainer.innerHTML = html;


    // ---------------------------------
    // FIX LINKS
    // ---------------------------------

    navContainer.querySelectorAll("a").forEach(link => {

        const href = link.getAttribute("href");

        link.setAttribute("href", prefix + href);

    });


    // ---------------------------------
    // FIND CURRENT SECTION
    // ---------------------------------

    const path = window.location.pathname.toLowerCase();

    let currentSection = null;


    // Any page inside /projects/
    // OR projects.html itself

    if (
        path.includes("/projects/") ||
        path.endsWith("/projects.html")
    ) {
        currentSection = "projects";
    }


    // Distinctions

    else if (path.endsWith("/distinctions.html")) {
        currentSection = "distinctions";
    }


    // Publications

    else if (path.endsWith("/publications.html")) {
        currentSection = "publications";
    }


    // ---------------------------------
    // MAKE CURRENT SECTION BLUE
    // ---------------------------------

    if (currentSection) {

        const activeLink =
            navContainer.querySelector(
                `[data-nav="${currentSection}"]`
            );

        if (activeLink) {
            activeLink.classList.add("active");
        }

    }

})();