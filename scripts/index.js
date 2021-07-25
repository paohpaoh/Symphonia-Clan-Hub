var comp1 = {
  unit1: ["shiori", 5],
  unit2: ["saren", 5],
  unit3: ["makoto", 5],
  unit4: ["kaori", 5],
  unit5: ["jun", 3],
  damage: 1137218,
  boss: 4,
  lap: "1",
  clanBattle: "6",
  player: "paoh"
};
var comp2 = {
  unit1: ["kyouka", 3],
  unit2: ["misato", 2],
  unit3: ["summer karyl", 5],
  unit4: ["akari", 5],
  unit5: ["ilya", 5],
  damage: 1284718,
  boss: 3,
  clanBattle: "6",
  lap: "1",
  player: "paoh"
};
var comp3 = {
  unit1: ["suzuna", 5],
  unit2: ["mitsuki", 5],
  unit3: ["kokkoro", 5],
  unit4: ["makoto", 5],
  unit5: ["kaori", 5],
  damage: 1092638,
  boss: 5,
  clanBattle: "6",
  lap: "2",
  player: "paoh"
};
var comp4 = {
  unit1: ["shiori", 5],
  unit2: ["saren", 5],
  unit3: ["makoto", 5],
  unit4: ["kaori", 5],
  unit5: ["jun", 3],
  damage: 1146082,
  boss: 4,
  clanBattle: "6",
  lap: "1",
  player: "paoh"
};
var comp5 = {
  unit1: ["kyouka", 3],
  unit2: ["misato", 2],
  unit3: ["summer karyl", 5],
  unit4: ["akari", 5],
  unit5: ["ilya", 5],
  damage: 981378,
  boss: 3,
  clanBattle: "6",
  lap: "1",
  player: "paoh"
};
var comp6 = {
  unit1: ["suzuna", 5],
  unit2: ["mitsuki", 5],
  unit3: ["kokkoro", 5],
  unit4: ["makoto", 5],
  unit5: ["kaori", 5],
  damage: 871249,
  boss: 5,
  clanBattle: "6",
  lap: "2",
  player: "paoh"
};
// for (let i = 0; i <= 3; i += 1) {
//   stuff;
// }
var teamComps = [comp1, comp2, comp3, comp4, comp5, comp6];
function compareDamage(comp1, comp2) {
  if (comp1.damage < comp2.damage) {
    return 1;
  }
  if (comp2.damage > comp1.damage) {
    return -1;
  }
  return 0;
}
teamComps.sort(compareDamage);

function generateComps(whichCB) {
  // clear current comps
  $("#teamCompsCB").html("");

  // filter based on boss
  let tempComps = teamComps.slice();
  const whichBoss = $(".boss-selector #select-menu").val();
  $(tempComps).each((x, tempComp) => {
    if (whichBoss == "6") {
      return false;
    }
    if (tempComp.boss != whichBoss) {
      tempComps[x] = "";
    }
  });
  tempComps = tempComps.filter(item => item);
  $(tempComps).each((i, comp) => {
    let starContainer1String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit1[1]) {
        starContainer1String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star.png" />' +
          " </div>";
      } else {
        starContainer1String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star-grey.png" />' +
          " </div>";
      }
    }
    let starContainer2String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit2[1]) {
        starContainer2String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star.png" />' +
          " </div>";
      } else {
        starContainer2String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star-grey.png" />' +
          " </div>";
      }
    }
    let starContainer3String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit3[1]) {
        starContainer3String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star.png" />' +
          " </div>";
      } else {
        starContainer3String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star-grey.png" />' +
          " </div>";
      }
    }
    let starContainer4String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit4[1]) {
        starContainer4String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star.png" />' +
          " </div>";
      } else {
        starContainer4String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star-grey.png" />' +
          " </div>";
      }
    }
    let starContainer5String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit5[1]) {
        starContainer5String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star.png" />' +
          " </div>";
      } else {
        starContainer5String +=
          '<div class="col p-0 star">' +
          ' <img class="img-fluid" src="./images/star-grey.png" />' +
          " </div>";
      }
    }
    $("#teamCompsCB").append(
      "<div>" +
        '<div class="submission-info"> B' +
        comp.boss +
        "L" +
        comp.lap +
        " - <b>" +
        comp.damage.toLocaleString("en") +
        "</b> - <i>submitted by " +
        comp.player +
        '</i><hr class="comp-spacer" /></div>' +
        '<div class="container mb-4 p-1 text-center">' +
        '<div class="row mx-1">' +
        '<div class="col p-1 mr-1">' +
        "<img" +
        ' class="img-fluid unit rounded-3"' +
        ` src="./images/${comp.unit1[0]}.png"` +
        " />" +
        '<div class="container stars-container p-0">' +
        '<div class="row p-0">' +
        '<div class="col p-0 star first-star">' +
        '<img class="img-fluid" src="./images/star.png" />' +
        "</div>" +
        starContainer1String +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col p-1 mr-1">' +
        "<img" +
        ' class="img-fluid unit rounded-3"' +
        ` src="./images/${comp.unit2[0]}.png"` +
        " />" +
        '<div class="container stars-container p-0">' +
        '<div class="row p-0">' +
        '<div class="col p-0 star first-star">' +
        '<img class="img-fluid" src="./images/star.png" />' +
        "</div>" +
        starContainer2String +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col p-1">' +
        "<img" +
        ' class="img-fluid unit rounded-3"' +
        ` src="./images/${comp.unit3[0]}.png"` +
        " />" +
        '<div class="container stars-container p-0">' +
        '<div class="row p-0">' +
        '<div class="col p-0 star first-star">' +
        '<img class="img-fluid" src="./images/star.png" />' +
        "</div>" +
        starContainer3String +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col p-1 ml-1">' +
        "<img" +
        ' class="img-fluid unit rounded-3"' +
        ` src="./images/${comp.unit4[0]}.png"` +
        " />" +
        '<div class="container stars-container p-0">' +
        '<div class="row p-0">' +
        '<div class="col p-0 star first-star">' +
        '<img class="img-fluid" src="./images/star.png" />' +
        "</div>" +
        starContainer4String +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="col p-1 ml-1">' +
        "<img" +
        ' class="img-fluid unit rounded-3"' +
        ` src="./images/${comp.unit5[0]}.png"` +
        " />" +
        '<div class="container stars-container p-0">' +
        '<div class="row p-0">' +
        '<div class="col p-0 star first-star">' +
        '<img class="img-fluid" src="./images/star.png" />' +
        "</div>" +
        starContainer5String +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  });
}

$("#generate-comps").on("click", function() {
  console.log("Clicked");
  generateComps();
});
