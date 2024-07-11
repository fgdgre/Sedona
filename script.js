"use strict";

const HOTELS = "HOTELS";
const FAVORITEHOTELS = "FAVORITEHOTELS";

let hotels = [
  {
    id: "905e6cf9-2139-4056-8ef6-4e3ff80f348b",
    name: "Villas at Poco Diablo",
    price: 5000,
    stars: 4,
    rating: 8.7,
  },
  {
    id: "6e06deea-6dea-40d0-8b96-9083d20680b6",
    name: "Amar Resort & Spa",
    price: 4000,
    stars: 4,
    rating: 9.2,
  },
  {
    id: "b69b4477-ee47-4544-902e-b8078aa19043",
    name: "Desert Quail Inn",
    price: 2500,
    stars: 3,
    rating: 6.9,
  },
  {
    id: "6897d9f9-4dc1-4658-891b-0ccc85f444ca",
    name: "GreenTree Inn",
    price: 1500,
    stars: 2,
    rating: 5.0,
  },
];

let favoriteHotels = [];

function saveData() {
  localStorage.setItem(FAVORITEHOTELS, JSON.stringify(favoriteHotels));
}

function loadData() {
  const localStorageFavoriteHotels = JSON.parse(localStorage.getItem(FAVORITEHOTELS));
  if (Array.isArray(localStorageFavoriteHotels)) {
    favoriteHotels = localStorageFavoriteHotels;
  }
}

const page = {
  hotels: document.querySelector(".hotels-list"),
  hotelsHeader: document.querySelector(".whats-find"),
  favoriteHotels: document.querySelector(".favorite-hotels-list"),
  favoriteHotelsHeader: document.querySelector(".favorite-hotels"),
};

function toggleModal() {
  document.querySelector(".popup-wrapper").classList.toggle("hidden");
}

function validateAndGetForm(form, fields) {
  const fieldData = new FormData(form);
  const data = {};

  for (const field of fields) {
    const fieldValue = fieldData.get(field);
    if (!fieldValue) {
      return;
    }
    data[field] = fieldValue;
  }

  let isValid = true;
  for (const field of fields) {
    if (!data[field]) {
      isValid = false;
    }
  }
  if (!isValid) {
    return;
  }
  return data;
}

function form(event) {
  event.preventDefault();
  const fieldData = validateAndGetForm(event.target, ["arraval-date", "date-of-departure"]);
  if (!fieldData) {
    return;
  }
  console.log(fieldData);
}

function sortHotels() {
  const select = document.querySelector(".select");
  const selectValue = select.value;
  if (selectValue == "Спочатку дешеві") {
    (page.hotels ? page.hotels : page.favoriteHotels).innerHTML = "";
    renderHotels(hotels.sort((a, b) => a.price - b.price));
  }
  if (selectValue == "Спочатку дорогі") {
    (page.hotels ? page.hotels : page.favoriteHotels).innerHTML = "";
    renderHotels(hotels.sort((a, b) => b.price - a.price));
  }

  if (selectValue == "Найпопулярніші") {
    (page.hotels ? page.hotels : page.favoriteHotels).innerHTML = "";
    renderHotels(hotels.sort((a, b) => b.rating - a.rating));
  }
}

function getFiltersForGotels(event) {
  event.preventDefault();

  // console.log(document.querySelector(".infrastructure-form").children[0].children);

  const checkboxes = document.querySelectorAll(".infrastructure-checkbox-visually-hidden");
  const radios = document.querySelectorAll(".infrastructure-radio-visually-hidden");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      console.log(checkboxes[i].getAttribute("id"));
    }
  }

  for (let j = 0; j < radios.length; j++) {
    if (radios[j].checked) {
      console.log(radios[j].getAttribute("id"));
    }
  }
}

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#C6C6C6", "#ffffff", controlSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "#C6C6C6", "#ffffff", controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#ffffff", toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#ffffff", toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

// function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
//   const rangeDistance = to.max - to.min;
//   const fromPosition = from.value - to.min;
//   const toPosition = to.value - to.min;
//   controlSlider.style.background = `linear-gradient(
//       to right,
//       ${sliderColor} 0%,
//       ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
//       ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
//       ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
//       ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
//       ${sliderColor} 100%)`;
// }

// function setToggleAccessible(currentTarget) {
//   const toSlider = document.querySelector("#toSlider");
//   if (Number(currentTarget.value) <= 0) {
//     toSlider.style.zIndex = 2;
//   } else {
//     toSlider.style.zIndex = 0;
//   }
// }

// const fromSlider = document.querySelector("#fromSlider");
// const toSlider = document.querySelector("#toSlider");
// const fromInput = document.querySelector("#fromInput");
// const toInput = document.querySelector("#toInput");
// fillSlider(fromSlider, toSlider, "#C6C6C6", "#ffffff", toSlider);
// setToggleAccessible(toSlider);

// fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
// toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
// fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
// toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

function renderHotels(localHotels) {
  let i = 0;
  for (const hotel of localHotels) {
    const existed = document.querySelector(`[name="${hotel.name}"]`);
    if (!existed) {
      const hotelEl = document.createElement("li");
      hotelEl.classList.add("hotels-list-item");
      hotelEl.setAttribute("name", hotel.name);
      hotelEl.setAttribute("id", hotel.id);
      hotelEl.innerHTML = `
    <img src="img/hotels/${hotel.name.replaceAll(" ", "-")}.jpg" width="300" height="211" alt="Готель ${hotel.name}" />
              <div class="hotels-list-grid">
                <h1 class="hotels-list-paragraph">${hotel.name}</h1>
                <p class="hotels-list-price">Готель</p>
                <p class="hotels-list-price-2">Більше ${hotel.price} $</p>
                <button class="button-brown">Більше</button>
                ${favoriteHotels.find((a) => a === hotel.id) ? `<button class="button-favorite-blue button-favorite-green" onclick="inFavorite(event)">В улюбленному</button>` : `<button class="button-favorite-blue" onclick="inFavorite(event)">В улюблене</button>`}
                   <img class="hotels-list-rating-picture" src="img/icons/${hotel.stars}-stars-icon.svg" alt="" />
                <button class="button-rating hotels-list-rating">Рейтинг: ${hotel.rating}</button>
              </div>`;
      if (page.hotels) {
        page.hotels.appendChild(hotelEl);
        i++;
      }
      if (page.favoriteHotels && favoriteHotels.find((a) => a === hotel.id)) {
        page.favoriteHotels.appendChild(hotelEl);
        i++;
      }
    }

    if (document.querySelector(".whats-find")) {
      document.querySelector(".whats-find").innerText = `Знайдено готелів: ${i}`;
    } else if (document.querySelector(".favorite-hotels")) {
      document.querySelector(".favorite-hotels").innerText = `Улюблених готелів: ${favoriteHotels.length}`;
    }
    document.querySelector(".favorite-number").innerText = favoriteHotels.length;
  }
}

function inFavorite(event) {
  event.target.classList.toggle("button-favorite-green");
  const favoriteHoteId = event.target.closest("li").getAttribute("id");
  if (event.target.classList.contains("button-favorite-green")) {
    event.target.innerText = "В улюбленному";
    favoriteHotels.push(hotels.find((a) => a.id === favoriteHoteId).id);
    saveData();
    document.querySelector(".favorite-number").innerText = favoriteHotels.length;
    if (document.querySelector(".favorite-hotels")) {
      document.querySelector(".favorite-hotels").innerText = `Улюблених готелів: ${favoriteHotels.length}`;
    }
  } else {
    favoriteHotels.splice(
      favoriteHotels.findIndex((a) => a === favoriteHoteId),
      1
    );
    event.target.innerText = "В улюблене";
    saveData();
    document.querySelector(".favorite-number").innerText = favoriteHotels.length;
    if (document.querySelector(".favorite-hotels")) {
      document.querySelector(".favorite-hotels").innerText = `Улюблених готелів: ${favoriteHotels.length}`;
    }
  }
}

(() => {
  loadData();
  renderHotels(hotels);
})();
