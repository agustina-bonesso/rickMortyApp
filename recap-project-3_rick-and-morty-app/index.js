import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector('[data-js="search-bar-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage;
let page = 1;
let searchQuery = "";

// fetch data
async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
  );
  const data = await response.json();
  maxPage = data.info.pages;

  pagination.innerHTML = ` ${page} / ${maxPage}`;
  data.results.forEach((element) => {
    const card = CharacterCard(element);
    cardContainer.append(card);
  });
}
fetchCharacters();

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.query.value;
  page = 1;
  fetchCharacters();
});
