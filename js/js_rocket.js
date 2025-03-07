

document.addEventListener("DOMContentLoaded", function () {
    // Определяем ссылки для каждой страницы
    const navigationLinks = {
        "mani0.html": { next: "mani1.html", prev: "/index.html" },
        "mani1.html": { next: "/index.html", prev: "mani0.html" },
        "about.html": { next: "/index.html", prev: "/index.html" },
        "page3.html": { next: "page4.html", prev: "page2.html" },
        "page4.html": { next: "page5.html", prev: "page3.html" },
        "ru1.html": { next:"ru2.html", prev: "index.html" }
    };

    // Получаем имя текущей страницы
    const currentPage = window.location.pathname.split("/").pop();

    if (navigationLinks[currentPage]) {
        const { next, prev } = navigationLinks[currentPage];

        // Контейнер для навигации
        const navContainer = document.createElement("div");
        navContainer.classList.add("rocket-navigation");

        // Создаем общий ряд навигации
        const navRow = document.createElement("div");
        navRow.classList.add("nav-row");

        // Кнопка "Назад"
        const rocketLeft = document.createElement("a");
        rocketLeft.href = prev || "#";
        rocketLeft.innerHTML = "🌺";  // Используем стрелку
        rocketLeft.classList.add("rocket-left");

        // Кнопка "Домой"
        const rocketHome = document.createElement("a");
        rocketHome.href = "/index.html";
        rocketHome.innerHTML = "🌺";  // Иконка "Домой"
        rocketHome.classList.add("rocket-home");

        // Кнопка "Вперед"
        const rocketRight = document.createElement("a");
        rocketRight.href = next || "#";
        rocketRight.innerHTML = "🌺";  // Используем стрелку
        rocketRight.classList.add("rocket-right");

        // Добавляем элементы в общий ряд
        navRow.appendChild(rocketLeft);
        navRow.appendChild(rocketHome);
        navRow.appendChild(rocketRight);

        // Добавляем строку навигации в контейнер
        navContainer.appendChild(navRow);
        document.body.appendChild(navContainer);
    }
});