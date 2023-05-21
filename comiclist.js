var comiclist;
var output;
fetch(
  "https://sheets.googleapis.com/v4/spreadsheets/193NLQaDa9eKSApAHpW0PQQ16rPOlZX2VzPzU2eaSzAc/values/Comic Storage List?alt=json&key=AIzaSyDx9l2u11YUgI_XZ7KB3n0v7yvvN_ERhCk"
)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.values);
    comiclist = res.values;
    comiclist.forEach((i) => {
      console.log(i);
      output = `<label>
      <input type="checkbox" class=""/>
      <div class="comiclist__title">
        <div class="comiclist__title__name">${i[0]}</div>
        <div class="comiclist__title__year">${i[1]}</div>
        <div class="comiclist__title__authors">${i[2]}</div>
        <div class="comiclist__title__publisher" onclick="myFunction('${i[3]}')">${i[3]}</div>
        <div class="comiclist__title__price">${i[4]}</div>
        <div class="comiclist__title__link"><a href="${i[5]}">${i[5]}</a></div>
      </div>
      <div class="comiclist__content">
        <img class="" src="${i[6]}" alt="" />
        <div class="">${i[7]}</div>
      </div>
    </label>`;
      console.log(output);
      wirtein();
    });
  });
function myFunction(e) {
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
      info = "Invalid grade.";
      break;
  }
  alert(info);
}
function wirtein(e) {
  document.querySelector("section.comiclist").innerHTML =
    document.querySelector("section.comiclist").innerHTML + output;
}
