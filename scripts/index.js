// add padding to tabs to account for navbar placement
const navHeight = $("nav.navbar").outerHeight(true);
$(".tab-pane").css("padding-top", navHeight + 25);

// close navbar after clicking a navbar item
$("button.nav-link").click(() => {
  $("button.navbar-toggler").addClass("collapsed");
  $(".navbar-collapse").removeClass("show");
});

let pwCounter = 0;
$("#pw1").on("click", function() {
  pwCounter += 11;
});
$("#pw2").on("click", function() {
  pwCounter += 12;
});
$("#pw3").on("click", function() {
  pwCounter += 13;
});
$("#pw4").on("click", function() {
  pwCounter += 14;
});
$("#pw5").on("click", function() {
  pwCounter += 15;
});
$("#pw6").on("click", function() {
  pwCounter += 16;
});
$("#pw7").on("click", function() {
  pwCounter += 17;
});

let compType = "";
$(".navbar-brand").on("click", function() {
  compType = "regular";
  if (pwCounter == 39) {
    $("select.cb-selector").append('<option value="10">CB#10</option>');
    $("#recommended-select").css("display", "flex");
    pwCounter += 5;
    $("select.cb-selector").val("10");
    generateComps();
    $("#cbcomps-tab").click();
  }
});

let bossSelectorValue = "1";
$(".boss-selector").on("click", e => {
  if (!$(e.target).hasClass("active-boss")) {
    compType = "regular";
    bossSelectorValue = $(e.target).val();
    generateComps();
    $("div.carousel-item .select-boss-text").html(bossSelectorValue);
    $(".boss-selector").removeClass("active-boss");
    $(e.target).addClass("active-boss");
    $(".wrapper").animate(
      {
        scrollTop:
          $("#lapCarouselControls").offset().top -
          navHeight -
          10 -
          $(".wrapper").offset().top +
          $(".wrapper").scrollTop()
      },
      500
    );
  }
});

$(".lap-selector").on("click", function() {
  compType = "regular";
  generateComps();
});

$("#btnFilterClose").on("click", function() {
  compType = "regular";
  generateComps();
});

$(".cb-selector option").on("click", function() {
  compType = "regular";
  generateComps();
});

$("#cbcomps-tab").on("click", function() {
  compType = "regular";
  generateComps();
});

let recommendedCompValue = 0;
$("#recommended-select li a.dropdown-item").on("click", e => {
  compType = "special";
  $(".boss-selector").removeClass("active-boss");
  recommendedCompValue = $(e.target).val();
  generateComps();
  $("#recommended-comps-selector").removeClass("show");
  $("#recommended-select").attr("aria-expanded", "false");
  $("#recommended-select ul").removeClass("show");
  $(".wrapper").animate(
    {
      scrollTop:
        $("#teamCompsCB").offset().top -
        navHeight -
        $(".wrapper").offset().top +
        $(".wrapper").scrollTop()
    },
    500
  );
});

var myCarousel = document.getElementById("lapCarouselControls");
var whichLap = $(".carousel-item.active").data("value");
myCarousel.addEventListener("slid.bs.carousel", function() {
  whichLap = $(".carousel-item.active").data("value");
  generateComps();
});

function compareDamage(comp1, comp2) {
  if (comp1.damage > comp2.damage) {
    return -1;
  }
  if (comp2.damage > comp1.damage) {
    return 1;
  }
  return 0;
}

function compareRange(unit1, unit2) {
  if (unit1.range < unit2.range) {
    return -1;
  }
  if (unit2.range < unit1.range) {
    return 1;
  }
  return 0;
}

function compareNames(unit1, unit2) {
  if (unit1.unit < unit2.unit) {
    return -1;
  }
  if (unit2.unit < unit1.unit) {
    return 1;
  }
  return 0;
}

function generateComps() {
  $("#teamCompsCB").html(""); // clear current comps
  let tempComps = JSON.parse(JSON.stringify(teamComps));
  let tempHeaders = JSON.parse(JSON.stringify(compHeaders));

  // filter based on clan clan battle
  const whichCB = $("select.cb-selector").val();
  if (whichCB >= 10) {
    $("button.boss-selector[value=6]").css("display", "none");
  } else {
    $("button.boss-selector[value=6]").css("display", "initial");
  }
  $(tempComps).each((x, tempComp) => {
    if (tempComps[x].clanBattle != whichCB) {
      tempComps[x] = "";
    }
  });
  tempComps = tempComps.filter(item => item);
  $(tempHeaders).each((x, tempHeader) => {
    if (tempHeaders[x].clanBattle != whichCB) {
      tempHeaders[x] = "";
    }
  });
  tempHeaders = tempHeaders.filter(item => item);

  // filter for recommended comps
  if (compType == "special") {
    // filter out non-recommended comps
    $(tempComps).each((x, tempComp) => {
      if (!tempComps[x].special) {
        tempComps[x] = "";
      }
    });
    tempComps = tempComps.filter(item => item);
    $(tempHeaders).each((x, tempHeader) => {
      if (!tempHeaders[x].special) {
        tempHeaders[x] = "";
      }
    });
    tempHeaders = tempHeaders.filter(item => item);

    // filter down to one set of comps
    let whichRecommendedComp = recommendedCompValue;
    $(tempComps).each((x, tempComp) => {
      if (tempComps[x].special != whichRecommendedComp) {
        tempComps[x] = "";
      }
    });
    tempComps = tempComps.filter(item => item);
    $(tempHeaders).each((x, tempHeader) => {
      if (tempHeaders[x].special != whichRecommendedComp) {
        tempHeaders[x] = "";
      }
    });
    tempHeaders = tempHeaders.filter(item => item);
  } // filter for regular team comps
  else {
    tempComps.sort(compareDamage);

    // filter out recommended comps
    $(tempComps).each((x, tempComp) => {
      if (tempComps[x].special) {
        tempComps[x] = "";
      }
    });
    tempComps = tempComps.filter(item => item);
    $(tempHeaders).each((x, tempHeader) => {
      if (tempHeaders[x].special) {
        tempHeaders[x] = "";
      }
    });
    tempHeaders = tempHeaders.filter(item => item);

    // filter based on boss
    $(tempComps).each((x, tempComp) => {
      if (tempComps[x].boss != bossSelectorValue) {
        tempComps[x] = "";
      }
    });
    tempComps = tempComps.filter(item => item);
    $(tempHeaders).each((x, tempHeader) => {
      if (tempHeaders[x].boss != bossSelectorValue) {
        tempHeaders[x] = "";
      }
    });
    tempHeaders = tempHeaders.filter(item => item);

    // filter based on lap and change "Select Boss" text
    // const whichLap = $(".lap-selector .btn-check:checked").val();
    $(tempComps).each((x, tempComp) => {
      switch (whichLap) {
        case 1:
          if (tempComp.lap != 1) {
            tempComps[x] = "";
          }
          break;
        case 2:
          if (tempComp.lap != 2) {
            tempComps[x] = "";
          }
          break;
        case 3:
          if (tempComp.lap != 3) {
            tempComps[x] = "";
          }
          break;
      }
    });
    tempComps = tempComps.filter(item => item);
    $(tempHeaders).each((x, tempHeader) => {
      switch (whichLap) {
        case 1:
          if (tempHeader.lap != 1) {
            tempHeaders[x] = "";
          }
          break;
        case 2:
          if (tempHeader.lap != 2) {
            tempHeaders[x] = "";
          }
          break;
        case 3:
          if (tempHeader.lap != 3) {
            tempHeaders[x] = "";
          }
          break;
      }
    });
    tempHeaders = tempHeaders.filter(item => item);

    // // filter based on unchecked unit checkboxes
    // $("input:checkbox:checked").each((i, e) => {
    //   $(tempComps).each((x, tempComp) => {
    //     if (
    //       tempComps[x] &&
    //       (tempComps[x].unit1[0] ==
    //         $(e)
    //           .next()
    //           .text()
    //           .toLowerCase() ||
    //         tempComps[x].unit2[0] ==
    //           $(e)
    //             .next()
    //             .text()
    //             .toLowerCase() ||
    //         tempComps[x].unit3[0] ==
    //           $(e)
    //             .next()
    //             .text()
    //             .toLowerCase() ||
    //         tempComps[x].unit4[0] ==
    //           $(e)
    //             .next()
    //             .text()
    //             .toLowerCase() ||
    //         tempComps[x].unit5[0] ==
    //           $(e)
    //             .next()
    //             .text()
    //             .toLowerCase())
    //     ) {
    //       tempComps[x] = "";
    //     }
    //   });
    // });
    // tempComps = tempComps.filter(item => item);
  }

  let sub = "";
  if (
    !$(location).attr("href") ==
    "https://paohpaoh.github.io/Symphonia-Clan-Hub/"
  ) {
    sub = '`<div class="placeholder-text">comps</div>`';
  }

  if (tempComps.length == 0) {
    $("#teamCompsCB").append(
      '<div class="placeholder-text">No team comps currently available for this boss with the current filters. Change your filters and try again, or check back later for updates!</div>'
    );
    return false;
  }

  if (compType == "special") {
    $("#teamCompsCB").append(
      `<div class='damage-goal'><b>Recommended Comps Set ` +
        tempHeaders[0].special +
        `</b><br /><br />` +
        tempHeaders[0].notes +
        `</div><hr />`
    );
  } else {
    let damageString = "";
    if (tempHeaders[0].damage == 0) {
      damageString = "Not available";
    } else {
      damageString = tempHeaders[0].damage.toLocaleString("en") + "+";
    }
    $("#teamCompsCB").append(
      `<div class='damage-goal'><b>Damage goal for B` +
        tempHeaders[0].boss +
        `: ` +
        damageString +
        "</b><br /><br />" +
        tempHeaders[0].notes +
        "</div><hr />"
    );
  }

  $(tempComps).each((i, comp) => {
    let starContainer1String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit1[1]) {
        starContainer1String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star.png" /></div>' +
          sub;
      } else {
        starContainer1String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star-grey.png" /></div>';
      }
    }
    let starContainer2String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit2[1]) {
        starContainer2String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star.png" /></div>';
      } else {
        starContainer2String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star-grey.png" /></div>';
      }
    }
    let starContainer3String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit3[1]) {
        starContainer3String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star.png" /></div>';
      } else {
        starContainer3String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star-grey.png" /></div>';
      }
    }
    let starContainer4String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit4[1]) {
        starContainer4String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star.png" /></div>';
      } else {
        starContainer4String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star-grey.png" /></div>';
      }
    }
    let starContainer5String = "";
    for (stars = 1; stars < 5; stars += 1) {
      if (stars < comp.unit5[1]) {
        starContainer5String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star.png" /></div>';
      } else {
        starContainer5String +=
          '<div class="col p-0 star"><img class="img-fluid" src="./images/star-grey.png" /></div>';
      }
    }
    $("#teamCompsCB").append(
      '<div class="placeholder mx-auto"><div class="submission-info"> B' +
        comp.boss +
        "L" +
        comp.lap +
        " - <b>" +
        comp.damage.toLocaleString("en") +
        "</b> - <i>submitted by " +
        comp.player +
        "</i>" +
        // '<hr class="comp-spacer" />' +
        `</div><div class="container mb-3 p-1 text-center"><div class="row mx-1"><div class="col p-1 mr-1"><img class="img-fluid unit rounded-3" src="./images/${comp.unit1[0]}.png" /><div class="container stars-container p-0"><div class="row p-0"><div class="col p-0 star first-star"><img class="img-fluid" src="./images/star.png" /></div>` +
        starContainer1String +
        `</div></div></div><div class="col p-1 mr-1"><img class="img-fluid unit rounded-3" src="./images/${comp.unit2[0]}.png" />` +
        sub +
        `<div class="container stars-container p-0"><div class="row p-0"><div class="col p-0 star first-star"><img class="img-fluid" src="./images/star.png" /></div>` +
        starContainer2String +
        `</div></div></div><div class="col p-1 mr-1"><img class="img-fluid unit rounded-3" src="./images/${comp.unit3[0]}.png" /><div class="container stars-container p-0"><div class="row p-0"><div class="col p-0 star first-star"><img class="img-fluid" src="./images/star.png" /></div>` +
        starContainer3String +
        `</div></div></div><div class="col p-1 mr-1"><img class="img-fluid unit rounded-3" src="./images/${comp.unit4[0]}.png" /><div class="container stars-container p-0"><div class="row p-0"><div class="col p-0 star first-star"><img class="img-fluid" src="./images/star.png" /></div>` +
        starContainer4String +
        `</div></div></div><div class="col p-1 mr-1"><img class="img-fluid unit rounded-3" src="./images/${comp.unit5[0]}.png" /><div class="container stars-container p-0"><div class="row p-0"><div class="col p-0 star first-star"><img class="img-fluid" src="./images/star.png" /></div>` +
        starContainer5String +
        '</div></div></div><div class="notes"><i>Notes</i> - ' +
        comp.notes +
        "<hr /></div></div></div></div>"
    );
  });
}

var unitList = [
  { unit: "Lima", range: 105, cb: true },
  { unit: "Miyako", range: 125, cb: true },
  { unit: "Kuuka", range: 130, cb: true },
  { unit: "Jun", range: 135, cb: true },
  { unit: "Kaori", range: 145, cb: true },
  { unit: "NY Rei", range: 153, cb: false },
  { unit: "Pecorine", range: 155, cb: false },
  { unit: "Ruka", range: 158, cb: true },
  { unit: "Nozomi", range: 160, cb: true },
  { unit: "Muimi", range: 162, cb: true },
  { unit: "Makoto", range: 165, cb: true },
  { unit: "NY Hiyori", range: 170, cb: true },
  { unit: "Akino", range: 180, cb: true },
  { unit: "Matsuri", range: 185, cb: false },
  { unit: "V Eriko", range: 187, cb: true },
  { unit: "C Ayane", range: 190, cb: true },
  { unit: "Tsumugi", range: 195, cb: false },
  { unit: "Hiyori", range: 200, cb: true },
  { unit: "Misogi", range: 205, cb: false },
  { unit: "Ayane", range: 210, cb: true },
  { unit: "Tamaki", range: 215, cb: true },
  { unit: "Tomo", range: 220, cb: true },
  { unit: "S Tamaki", range: 225, cb: true },
  { unit: "Eriko", range: 230, cb: true },
  { unit: "S Pecorine", range: 235, cb: false },
  { unit: "Kurumi", range: 240, cb: false },
  { unit: "Djeeta", range: 245, cb: true },
  { unit: "Rei", range: 250, cb: true },
  { unit: "Shizuru", range: 285, cb: true },
  { unit: "Christina", range: 290, cb: true },
  { unit: "Mimi", range: 360, cb: true },
  { unit: "Shinobu", range: 365, cb: true },
  { unit: "V Shizuru", range: 385, cb: true },
  { unit: "Mahiru", range: 395, cb: false },
  { unit: "Yukari", range: 405, cb: true },
  { unit: "Monika", range: 410, cb: false },
  { unit: "Ninon", range: 415, cb: false },
  { unit: "Mifuyu", range: 420, cb: false },
  { unit: "Illya", range: 425, cb: true },
  { unit: "Saren", range: 430, cb: true },
  { unit: "Anna", range: 440, cb: false },
  { unit: "H Shinobu", range: 440, cb: false },
  { unit: "S Mifuyu", range: 495, cb: false },
  { unit: "Kokkoro", range: 500, cb: true },
  { unit: "S Kokkoro", range: 535, cb: true },
  { unit: "Rin", range: 550, cb: false },
  { unit: "Mitsuki", range: 565, cb: true },
  { unit: "Akari", range: 570, cb: true },
  { unit: "Yori", range: 575, cb: false },
  { unit: "H Miyako", range: 590, cb: true },
  { unit: "Arisa", range: 625, cb: true },
  { unit: "Rino", range: 700, cb: false },
  { unit: "Suzuna", range: 705, cb: true },
  { unit: "Shiori", range: 710, cb: true },
  { unit: "Io", range: 715, cb: false },
  { unit: "Suzume", range: 720, cb: false },
  { unit: "Misato", range: 735, cb: true },
  { unit: "Nanaka", range: 740, cb: true },
  { unit: "NY Yui", range: 745, cb: true },
  { unit: "Karyl", range: 750, cb: true },
  { unit: "Hatsune", range: 755, cb: true },
  { unit: "Misaki", range: 760, cb: false },
  { unit: "C Chika", range: 770, cb: true },
  { unit: "S Suzume", range: 775, cb: false },
  { unit: "S Karyl", range: 780, cb: true },
  { unit: "Aoi", range: 785, cb: false },
  { unit: "Chika", range: 790, cb: false },
  { unit: "Maho", range: 795, cb: false },
  { unit: "Yui", range: 800, cb: false },
  { unit: "Yuki", range: 805, cb: false },
  { unit: "Kyouka", range: 810, cb: true },
  { unit: "H Misaki", range: 820, cb: true }
];
unitList.sort(compareNames);

// // populate unit filter modal
// var tempUnitList = JSON.parse(JSON.stringify(unitList));
// // remove non-CB units
// $(tempUnitList).each(i => {
//   if (!tempUnitList[i].cb) {
//     tempUnitList[i] = "";
//   }
// });
// tempUnitList = tempUnitList.filter(item => item);
// let unitCounter = 0;
// const rowCount = Math.ceil(tempUnitList.length / 3);
// var modalContent = document.createElement("div");
// $(modalContent).addClass("row");
// for (columns = 1; columns <= 3; columns += 1) {
//   const tempColumn = document.createElement("div");
//   $(tempColumn).addClass("col");
//   for (units = 1; units <= rowCount; units += 1) {
//     const tempFormCheck = document.createElement("div");
//     $(tempFormCheck).addClass("form-check");
//     let tempString =
//       '<input class="form-check-input" type="checkbox" id="inlineCheckbox' +
//       unitCounter +
//       1 +
//       '" value="option' +
//       unitCounter +
//       1 +
//       '" /><label class="form-check-label" for="inlineCheckbox' +
//       unitCounter +
//       1 +
//       '">' +
//       tempUnitList[unitCounter].unit +
//       "</label>";
//     $(tempFormCheck).append(tempString);
//     $(tempColumn).append(tempFormCheck);
//     unitCounter += 1;
//     if (unitCounter == $(tempUnitList).length) {
//       break;
//     }
//   }
//   $(modalContent).append(tempColumn);
// }
// $(".modal-body .container").append(modalContent);

// show unit range from saren
var tempUnitList2 = JSON.parse(JSON.stringify(unitList));
tempUnitList2.sort(compareRange);
const sarenRange = tempUnitList2.find(i => i.unit === "Saren").range;
for (i = 0; i < tempUnitList2.length; i += 1) {
  if (tempUnitList2[i].unit === "Saren") {
    $("div.guides").append("<br />");
  }
  $("div.guides").append(
    `<div class="d-inline-block text-center unit-range m-1"><img class="img-fluid unit-range rounded-3" src="./images/${tempUnitList2[
      i
    ].unit.toLowerCase()}.png" /><div class="unit-range">${Math.abs(
      tempUnitList2[i].range - sarenRange
    )}</div></div>`
  );
  if (tempUnitList2[i].unit === "Saren") {
    $("div.guides").append("<br />");
  }
}
