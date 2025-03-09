

document.addEventListener("DOMContentLoaded", function () {
    let titles = document.querySelectorAll('.title'); // Находим все заголовки

    titles.forEach(title => {
        title.addEventListener("click", function () {
            let content = this.closest("div").nextElementSibling; // Берем ближайший <div> и ищем следующий элемент
            if (content && content.classList.contains("content")) {
                content.style.display = (content.style.display === "none" || content.style.display === "") ? "block" : "none";
            }
        });
    });
});