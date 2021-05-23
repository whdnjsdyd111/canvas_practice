document.addEventListener(
    "DOMContentLoaded",
    () => {
        function animateSgv(id, delay, delayIncrement) {
            const logo = document.getElementById(id);
            const logoPaths = document.querySelectorAll(`#${id} > path`);
            const logoOutside = document.getElementById(`${id}-outside`);
            delay = delay;
            for (let i = 0; i < logoPaths.length; i++) {
                logoPaths[i].style.strokeDasharray =
                    logoPaths[i].getTotalLength();
                logoPaths[i].style.strokeDashoffset =
                    logoPaths[i].getTotalLength();
                logoPaths[
                    i
                ].style.animation = `line-anim 2s ease forwards ${delay}s`;
                delay += delayIncrement;
            }
            logoOutside.style.animation = `fills 0.5s ease forwards ${
                delay + 1.25
            }s`;
        }
        // Set the id of SVG, delay time in seconds to start animation and delay between each animation
        animateSgv("logo", 0, 0.3);
    },
    false
);
