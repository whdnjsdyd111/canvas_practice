let more = document.querySelectorAll(".more");

more.forEach((v) => {
    v.addEventListener("click", () => {
        v.parentNode.classList.toggle("active");

        if (!v.parentNode.classList.contains("active")) {
            v.parentNode.querySelector(".content").scrollTo(0, 0);
        }
    });
});
