

document.addEventListener("DOMContentLoaded", function () {
    // Определяем ссылки для каждой страницы
    const navigationLinks = {
        "mani0.html": { next: "mani1.html", prev: "/index.html" },
        "page1.html": { next: "page2.html", prev: "index.html" },
        "page2.html": { next: "page3.html", prev: "page1.html" },
        "page3.html": { next: "page4.html", prev: "page2.html" },
        "page4.html": { next: "page5.html", prev: "page3.html" },
        "ru1.html": { next:"ru2.html", prev: "index.html" }
    };

    // Получаем имя текущей страницы
    const currentPage = window.location.pathname.split("/").pop();

    if (navigationLinks[currentPage]) {
        const { next, prev } = navigationLinks[currentPage];

        // Контейнер для всей навигации
        const navContainer = document.createElement("div");
        navContainer.classList.add("rocket-navigation");

        // Первая строка — кнопка "Домой" по центру
        const homeRow = document.createElement("div");
        homeRow.classList.add("home-row");

        const rocketHome = document.createElement("a");
        rocketHome.href = "/index.html";
        rocketHome.innerHTML = "🚀";
        rocketHome.classList.add("rocket-home");

        homeRow.appendChild(rocketHome);
        navContainer.appendChild(homeRow);

        // Вторая строка — кнопки "Назад" и "Вперед"
        const navRow = document.createElement("div");
        navRow.classList.add("nav-row");

        if (prev) {
            const rocketLeft = document.createElement("a");
            rocketLeft.href = prev;
            rocketLeft.innerHTML = "🚀";
            rocketLeft.classList.add("rocket-left");
            navRow.appendChild(rocketLeft);
        } else {
            const emptySpace = document.createElement("div");
            navRow.appendChild(emptySpace);
        }

        if (next) {
            const rocketRight = document.createElement("a");
            rocketRight.href = next;
            rocketRight.innerHTML = "🚀";
            rocketRight.classList.add("rocket-right");
            navRow.appendChild(rocketRight);
        } else {
            const emptySpace = document.createElement("div");
            navRow.appendChild(emptySpace);
        }

        navContainer.appendChild(navRow);
        document.body.appendChild(navContainer);
    }
});