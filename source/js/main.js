import $ from "jquery";
import { listOfTables } from "../data/table_data.js";
import Table from "../components/Table/Table.js";
import { DropUp } from "../components/Dropup/DropUp.js";
import { PopupDialog } from "../components/PopupDialog/PopupDialog.js";

const PER_MEAL = 2.6;
const FIRST_ITEM = 0;
const ANIMATION_TIME = 500;
const ESC_CODE = 27;
const SCROLLUP_SPEED = 3;

$(document).ready(function () {
  let currentTabItem = $(".super-food__tab")[FIRST_ITEM];
  let subscribeState = true;
  const closeVideo = function () {
    $(".video-popup").animate({ opacity: 0 }, ANIMATION_TIME, function () {
      $(this).css({ display: "none" });
    });
    document.querySelector(".video-popup__video").pause();
    $("html").css({ overflowY: "auto" });
  };
  const playVideo = function () {
    $(".video-popup")
      .css({ display: "flex" })
      .animate({ opacity: 1 }, ANIMATION_TIME);

    $("html").css({
      overflowY: "hidden",
      width: `100vh + ${getScrollWidth()}`,
    });
  };
  
  function getScrollWidth() {
    let div = document.createElement("div");
    div.style.overflowY = "scroll";
    div.style.width = "50px";
    div.style.height = "50px";
    div.style.visibility = "hidden";
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollWidth;
  }

  function tabClick(event) {
    let tableId = $(this).data("id");
    $(this).addClass("super-food_active");
    $(currentTabItem).removeClass("super-food_active");
    currentTabItem = this;
    table.update(listOfTables[tableId - 1]);
  }

  function setClickOnTabs(tabsClassList) {
    $(`.${tabsClassList}`).each(function () {
      $(this).on("click", tabClick);
    });
  }

  function setClickOnVideo(playID, closeID) {
    $(`#${playID}`).click(playVideo);
    $(`#${closeID}`).click(closeVideo);
  }

  function setKeyPressOnESC(closeHdl) {
    $(document).keydown(event, function () {
      if (event.which === ESC_CODE) {
        closeHdl();
      }
    });
  }

  function setChangeOnSelect(selecID) {
    $(`#${selecID}`).change(function () {
      let volume = $(this).val();
      let totalCost = Math.ceil(PER_MEAL * volume);
      $("#total-cost").html(`€${totalCost}`);
    });
  }

  function setClickOnCheckbox(checkID1, checkID2) {
    $(`#${checkID2}`).addClass("colored");
    $(`#${checkID1}`).click(function () {
      $(this).find(".select-form__check-area").addClass("checked");

      $(`#${checkID2}`).find(".select-form__check-area").removeClass("checked");

      $("[name=purchase]").attr("checked", true);
      $("[name=subscribe]").removeAttr("checked");
      $(".food__button").html("Add to cart");
      $(this).addClass("colored");
      $(`#${checkID2}`).removeClass("colored");
      subscribeState = false;
    });
    $(`#${checkID2}`).click(function () {
      $(this).find(".select-form__check-area").addClass("checked");

      $(`#${checkID1}`).find(".select-form__check-area").removeClass("checked");

      $("[name=subscribe]").attr("checked", true);
      $("[name=purchase]").removeAttr("checked");
      $(".food__button").html("Subscribe");
      $(this).addClass("colored");
      $(`#${checkID1}`).removeClass("colored");
      subscribeState = true;
    });
  }

  function secClickScrollUp(itemsClassList) {
    $(`.${itemsClassList}`).each(function () {
      $(this).on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, "swing");
      });
    });
  }

  function setupCookie(cookieID, buttonID) {
    setTimeout(function () {
      $(`#${cookieID}`).css({ display: "flex", opacity: 0 });
      $(`#${cookieID}`).animate(
        {
          opacity: 1,
        },
        ANIMATION_TIME
      );

      $(`#${buttonID}`).click(function () {
        $(`#${cookieID}`).animate(
          {
            opacity: 0,
          },
          ANIMATION_TIME,
          function () {
            $(`#${cookieID}`).css({ display: "none" });
          }
        );
      });
    }, ANIMATION_TIME);
  }

  function setClickOnPlayVideoCards(buttonsID) {
    let prevPlayedItems = [];
    const VIDEO_ITEM = 0;
    const IMAGE_ITEM = 1;
    const RESET_HANDLE = 2;
    const INITIAL_TIME = 0;

    function playPause(index) {
      let togglePlay = false;

      function stopPrevPlayer(curItem, curImageItem, reset) {
        if (prevPlayedItems[VIDEO_ITEM]) {
          prevPlayedItems[VIDEO_ITEM].pause();
          prevPlayedItems[VIDEO_ITEM].currentTime = 0;
          prevPlayedItems[RESET_HANDLE]();
          $(prevPlayedItems[IMAGE_ITEM]).css({ opacity: 0 });
        }
        prevPlayedItems = [curItem, curImageItem, reset];
      }

      function togglePlayVideo() {
        let resetTogglePlay = () => {
          togglePlay = false;
        };
        let curItem = $(".frame-card__video")[index];
        let curImageItem = $(".frame-card__video-block")[index];
        if (!togglePlay) {
          stopPrevPlayer(curItem, curImageItem, resetTogglePlay);
          curItem.play();
          togglePlay = true;
          $(curImageItem).css({ opacity: 1 });
        } else {
          curItem.pause();
          curItem.currentTime = INITIAL_TIME;
          togglePlay = false;
          $(curImageItem).css({ opacity: 0 });
        }
      }

      return togglePlayVideo;
    }
    $(`.${buttonsID}`).each(function (index, item) {
      let button = $(item).find(".frame-card__play-button");
      $(button).on("click", playPause(index));
    });
  }

  setClickOnPlayVideoCards("frame-card"); 

  setupCookie("popup-cookie", "close-cookie");

  secClickScrollUp("order-now");

  setClickOnCheckbox("check-purchase", "check-subscribe");

  setChangeOnSelect("select-food");

  setClickOnVideo("video-play", "video-close");

  setKeyPressOnESC(closeVideo);

  setClickOnTabs("super-food__tab");

  const subscribeOnLangChange = (lang) => {
    console.log('Changing language on: ',lang);
  };

  const table = new Table("table", ["", "Amount", "%RI"]);
  table.create(listOfTables[FIRST_ITEM]);
  table.render();

  let dropup = new DropUp("dropup", subscribeOnLangChange);
  dropup.init();
  const demo = new PopupDialog("popup-demo", "demo");
  demo.init();
  const language = new PopupDialog("popup-lang", "language");
  language.init();
});
