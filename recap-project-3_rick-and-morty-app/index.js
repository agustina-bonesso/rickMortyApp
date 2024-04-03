const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage;
let page = 1;
const searchQuery = "";
let url = "https://rickandmortyapi.com/api/character";
let nextUrl;
let prevUrl;

// fetch data
import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  const response = await fetch(url);
  const data = await response.json();
  maxPage = data.info.pages;
  nextUrl = data.info.next;
  prevUrl = data.info.prev;

  return data.results;
}

async function createSingleCard() {
  const cardArray = await fetchCharacters();

  cardArray.forEach((element) => {
    const card = CharacterCard(element);
    cardContainer.append(card);
  });
}
createSingleCard();

nextButton.addEventListener("click", () => {
  if (page < 42) {
    page = page + 1;
    pagination.innerHTML = ` ${page} / ${maxPage}`;
    url = nextUrl;
    fetchCharacters();
    createSingleCard();
    console.log(nextUrl);
  }
});

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
    pagination.innerHTML = ` ${page} /  ${maxPage}`;
    url = prevUrl;
    fetchCharacters();
    createSingleCard();
  }
});
