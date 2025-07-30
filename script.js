let marker = document.querySelector("#marker");
let light = document.querySelector("#light");
let list = document.querySelectorAll(".header ul li");

function move_indicator(target) {
  const rect = target.getBoundingClientRect();
  const ulRect = target.parentElement.getBoundingClientRect();
  const left = rect.left - ulRect.left;

  marker.style.left = target.offsetLeft + 12 + "px";// centrar
  light.style.left =  target.offsetLeft + 42 + "px";  // centrar cono de luz
  marker.style.width = `60px`; // opcional: ancho fijo o ajustable
}

function active_link() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
  move_indicator(this.querySelector('a'));
}

// Al cargar la página: mover al primer ítem activo
window.addEventListener("load", () => {
  const active = document.querySelector("ul li.active a");
  if (active) move_indicator(active);
});

// Evento para cada ítem
list.forEach((item) => {
  item.addEventListener("click", function () {
    active_link.call(this);
  });
});







const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`ul li a[href="#${id}"]`);

      if (entry.isIntersecting) {
        list.forEach((item) => item.classList.remove("active"));
        if (link && link.parentElement) {
          link.parentElement.classList.add("active");
          move_indicator(link);
        }
      }
    });
  },
  {
    threshold: 0.6, // % de visibilidad de la sección para activarse
  }
);

sections.forEach((section) => observer.observe(section));
