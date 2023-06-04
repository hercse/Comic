var comiclist;
var output;
fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/193NLQaDa9eKSApAHpW0PQQ16rPOlZX2VzPzU2eaSzAc/values/Comic Storage List?alt=json&key=AIzaSyDx9l2u11YUgI_XZ7KB3n0v7yvvN_ERhCk"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.values);
    comiclist = res.values;
    displayComics(comiclist.slice(1), "");

    // Get the search term from the query string and display filtered results
    const searchTerm = getSearchTermFromQueryString();
    filterAndDisplayComics(searchTerm);

    // 為搜尋欄位添加事件監聽器
    document
      .getElementById("search-input")
      .addEventListener("input", handleSearchInput);
  });

// 當頁面加載時，並沒有調用QueryString並出現搜尋結果
function getSearchTermFromQueryString() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("search") || "";
}

function filterAndDisplayComics(searchTerm) {
  if (searchTerm === "") {
    displayComics(comiclist.slice(1), "");
  } else {
    document.getElementById("search-input").value = searchTerm;
    const filteredComicList = comiclist
      .slice(1)
      .filter((comic) =>
        comic[0].toLowerCase().includes(searchTerm.toLowerCase())
      );
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
    // 如果搜尋欄位是空的，則顯示所有漫畫
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

    output = `<label>
    <input type="checkbox"  class=""  ${isChecked} />
    <div class="comiclist__title">
      <div class="comiclist__title__name">${i[0]}</div>
      <div class="comiclist__title__year">${i[1]}</div>
      <div class="comiclist__title__authors">${i[2]}</div>
      <div class="comiclist__title__authors">${i[3]}</div>
      <div class="grades">
      ${i[4]} <span>(${GradeInfo(i[4])})</span>
      </label>
    </div>
      <div class="comiclist__title__">${i[5]}</div>
      <div class="comiclist__title__link"><a href="${i[6]}">${i[6]}</a></div>
      <div class="comiclist__title__price">${i[9]}</div>
    </div>
    <div class="comiclist__content">
      <img class="" src="${i[7]}" alt="" />
      <div class="">${i[8]}</div>
    </div>
  </label>`; // 在此處使用 highlightedTitle 替換原始模板中的 ${i[0]}
    wirtein();
  });
}

function wirtein() {
  document.querySelector("section.comiclist").innerHTML += output;
}

function GradeInfo(e) {
  switch (e) {
    case "GM":
      info = "10.0 Gem Mint is in perfect condition.";
      break;
    case "MT":
      info = "9.9 Mint is in near perfect condition.";
      break;
    case "NM/MT":
      info = "9.8 Near Mint/Mint is in very close to perfect condition.";
      break;
    case "NM+":
      info = "9.6 Near Mint+ is in excellent condition.";
      break;
    case "NM":
      info = "9.4 Near Mint is in very good condition.";
      break;
    case "NM-":
      info = "9.2 Near Mint- is in good condition.";
      break;
    case "VF/NM":
      info = "9.0 Very Fine/Near Mint is in very fine condition.";
      break;
    case "VF+":
      info = "8.5 Very Fine+ is in fine condition.";
      break;
    case "VF":
      info = "8.0 Very Fine is in very good condition.";
      break;
    case "VF-":
      info = "7.5 Very Fine- is in good condition.";
      break;
    case "FN/VF":
      info = "7.0 Fine/Very Fine is in fine condition.";
      break;
    case "FN+":
      info = "6.5 Fine+ is in very good condition.";
      break;
    case "FN":
      info = "6.0 Fine is in good condition.";
      break;
    case "FN-":
      info = "5.5 Fine- is in fair condition.";
      break;
    case "VG/FN":
      info = "5.0 Very Good/Fine is in very good condition.";
      break;
    case "VG+":
      info = "4.5 Very Good+ is in good condition.";
      break;
    case "VG":
      info = "4.0 Very Good is in fair condition.";
      break;
    case "VG-":
      info = "3.5 Very Good- is in poor condition.";
      break;
    case "GD/VG":
      info = "3.0 Good/Very Good is in poor condition.";
      break;
    case "GD+":
      info = "2.5 Good+ is in fair condition.";
      break;
    case "GD":
      info = "2.0 Good is in poor condition.";
      break;
    case "GD-":
      info = "1.8 Good- is in very poor condition.";
      break;
    case "FR/GD":
      info = "1.5 Fair/Good is in very poor condition.";
      break;
    case "FR":
      info = "1.0 Fair is in very poor condition.";
      break;
    case "PR":
      info = "0.5 Poor is in very poor condition.";
      break;
    default:
      info = "?";
      break;
  }
  return info;
}
