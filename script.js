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
