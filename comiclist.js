var comiclist;
var output;

// Variables for document objects, URL and API key
const searchInput = document.getElementById("search-input");
const selectAllCheckbox = document.getElementById("select-all-checkbox");
const toggleModeCheckbox = document.getElementById("toggle-mode-checkbox");
const apiUrl =
  "https://sheets.googleapis.com/v4/spreadsheets/193NLQaDa9eKSApAHpW0PQQ16rPOlZX2VzPzU2eaSzAc/values/";
const apiKey = "AIzaSyDx9l2u11YUgI_XZ7KB3n0v7yvvN_ERhCk";
const defaultSheetName = "Comic Storage List";

function getSheetNameFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  const sheetName = urlParams.get("sheet") || "";
  return sheetName !== "" ? sheetName : defaultSheetName;
}

const sheetName = getSheetNameFromQueryString();

fetch(`${apiUrl}${sheetName}?alt=json&key=${apiKey}`)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.values);
    comiclist = res.values;
    displayComics(comiclist.slice(1), "");

    const searchTerm = getSearchTermFromQueryString();
    filterAndDisplayComics(searchTerm);

    searchInput.addEventListener("input", handleSearchInput);
  });

function getSearchTermFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("search") || "";
}

// Patch

function getPatchFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("patch") || "";
}

function filterAndDisplayComics(searchTerm) {
  const patchFilter = getPatchFromQueryString();

  if (searchTerm === "" && patchFilter === "") {
    displayComics(comiclist.slice(1), "");
  } else {
    searchInput.value = searchTerm;
    const filteredComicList = comiclist.slice(1).filter((comic) => {
      const titleMatch = comic[0]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const patchMatch =
        patchFilter === "" ? true : comic[6].includes(patchFilter);
      return titleMatch && patchMatch;
    });
    displayComics(filteredComicList, searchTerm);
  }
}

function updateQueryString(searchTerm) {
  if (searchTerm) {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("search", searchTerm);
    window.history.pushState(null, "", newUrl.toString());
  } else {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete("search");
    window.history.pushState(null, "", newUrl.toString());
  }
}

function handleSearchInput(event) {
  const searchTerm = event.target.value;
  updateQueryString(searchTerm);

  if (searchTerm === "") {
    displayComics(comiclist.slice(1), "");
  } else {
    const filteredComicList = comiclist
      .slice(1)
      .filter((comic) =>
        comic[0].toLowerCase().includes(searchTerm.toLowerCase())
      );
    displayComics(filteredComicList, searchTerm);
  }
}

function createPosterTemplate(i, isChecked) {
  return `<label>
  <input type="checkbox" class="" />
  <img class="" src="${i[7]}" alt="" />
  <div class="display">
    <div class="title">${i[0]}</div>
    <div class="year">${i[1]}</div>
    <div class="issue">#${i[2]}</div>
    <div class="cover">${i[3]}</div>
    <div class="grades">${i[4]}</div>
    <div class="publisher">${i[5]}</div>
    <div class="patch">
      <a href="?patch=${i[6]}">${i[6]}</a>
    </div>
    <div class="price">${i[9]}</div>
  </div>
  <div class="hide">
    <div class="">${i[8]}</div>
  </div>
</label>`;
}

function displayComics(comicList, searchTerm) {
  document.querySelector("section.comiclist").innerHTML = "";
  comicList.forEach((i) => {
    let isChecked = "";

    if (searchTerm !== "") {
      const regExpChars = /[.*+\-?^${}()|[\]\\]/g;
      const escapedSearchTerm = searchTerm.replace(regExpChars, "\\$&");
      const regex = new RegExp(escapedSearchTerm, "gi");

      if (i[0].match(regex)) {
        isChecked = "checked";
      }
    }

    output = createPosterTemplate(i, isChecked);
    wirtein();
  });
}

function wirtein() {
  document.querySelector("section.comiclist").innerHTML += output;
}

selectAllCheckbox.addEventListener("change", (event) => {
  const selectAllChecked = event.target.checked;
  toggleAllCheckboxes(selectAllChecked);
});

function toggleAllCheckboxes(selectAllChecked) {
  const allCheckboxes = document.querySelectorAll(
    "section.comiclist input[type=checkbox]"
  );
  allCheckboxes.forEach((checkbox) => {
    checkbox.checked = selectAllChecked;
  });
}

// Ｍode

function updateModeQueryString(modeChecked) {
  const newUrl = new URL(window.location.href);
  if (modeChecked) {
    newUrl.searchParams.set("mode", "on");
  } else {
    newUrl.searchParams.delete("mode");
  }
  window.history.pushState(null, "", newUrl.toString());
}

function getModeFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("mode");
}

toggleModeCheckbox.addEventListener("change", (event) => {
  const modeChecked = event.target.checked;
  updateModeQueryString(modeChecked);
  toggleMode(modeChecked);
});

// 當頁面載入時，根據網址參數設定模式
document.addEventListener("DOMContentLoaded", () => {
  const modeChecked = getModeFromQueryString();
  toggleModeCheckbox.checked = modeChecked;
  toggleMode(modeChecked);
});

toggleModeCheckbox.addEventListener("change", (event) => {
  const modeChecked = event.target.checked;
  toggleMode(modeChecked);
});

function toggleMode(modeChecked) {
  const comicListSection = document.querySelector("body");
  if (modeChecked) {
    comicListSection.classList.add("mode");
  } else {
    comicListSection.classList.remove("mode");
  }
}
