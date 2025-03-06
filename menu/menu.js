

document.addEventListener("DOMContentLoaded", function () {
    fetch("/menu/menu.html") // Загружаем `menu.html`
        .then(response => response.text())
        .then(data => {
            let menuContainer = document.createElement("div");
            menuContainer.innerHTML = data;
            document.body.appendChild(menuContainer); // Вставляем меню в конец body

            // Подключаем обработчики событий ТОЛЬКО после вставки меню
            attachMenuHandlers();
        })
        .catch(error => console.error("Ошибка загрузки меню:", error));
});

function attachMenuHandlers() {
    let menuIcon = document.querySelector(".menu-icon");
    let menuList = document.getElementById("menuList");

    if (menuIcon && menuList) {
        menuIcon.addEventListener("click", function () {
            menuList.classList.toggle("active");
        });

        document.querySelectorAll(".submenu").forEach(item => {
            item.addEventListener("click", function (event) {
                event.stopPropagation();
                let submenu = this.querySelector(".submenu-list");
                if (submenu) {
                    submenu.classList.toggle("active");
                }
            });
        });
    } else {
        console.error("Меню не найдено!");
    }
}