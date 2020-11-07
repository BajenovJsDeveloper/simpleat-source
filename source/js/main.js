import $ from 'jquery';
import { listOfTables } from '../data/table_data.js';
import Table from '../components/Table/Table.js';
import { DropUp } from '../components/Dropup/DropUp.js';
import { PopupDialog } from '../components/PopupDialog/PopupDialog.js';

const PER_MEAL = 2.60;
const FIRST_ITEM = 0;
const ANIMATION_TIME = 500;
const ESC_CODE = 27;
const SCROLLUP_SPEED = 3;

function getScrollWidth(){
	let div = document.createElement('div');
		div.style.overflowY = 'scroll';
		div.style.width =  '50px';
		div.style.height = '50px';
		div.style.visibility = 'hidden';
		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		document.body.removeChild(div);
	return scrollWidth;
}

$(document).ready(function(){
	let currentTabItem = $('.super-food__tab')[FIRST_ITEM];
	let subscribeState = false;
	const closeVideo = function() {
			$('.video-popup')
		    // .addClass('shift-left')
		    .animate({ opacity: 0 },ANIMATION_TIME,function(){
		        $(this).css({display: 'none'})
			       // .removeClass('shift-left');
			   });
		    document.querySelector('.video-popup__video').pause();
		    $('html').css({overflowY:'auto'});
		};
	const playVideo = function(){
			$('.video-popup')
			.css({display: 'flex'})
			.animate({ opacity: 1 },ANIMATION_TIME);

			$('html').css({overflowY:'hidden',width: `100vh + ${getScrollWidth()}`});
		};


	function tabClick(event){
		let tableId = $(this).data('id');
		$(this).addClass('super-food_active');
		$(currentTabItem).removeClass('super-food_active');
		currentTabItem = this;
		table.update(listOfTables[tableId - 1]);
	}

	function setClickOnTabs(tabsClassList){
		$(`.${tabsClassList}`).each(function(){
			$(this).on('click',tabClick)
		})
	}

	function setClickOnVideo(playID, closeID){
		$(`#${playID}`).click(playVideo);
		$(`#${closeID}`).click(closeVideo);
	}

	function setKeyPressOnESC(closeHdl){
		$(document).keydown(event, function(){
			console.log('key: ',event.which)
			if(event.which === ESC_CODE){
				closeHdl();
			}
		})
	}

	function setChangeOnSelect(selecID){
		$(`#${selecID}`).change(function(){
			let volume = $(this).val();
			let totalCost = Math.ceil(PER_MEAL * volume);
			$('#total-cost').html(`€${totalCost}`);
		})
	}

	function setClickOnCheckbox(checkID1, checkID2){
		$(`#${checkID1}`).click(function(){
			$('.select-form__purchase').find('.select-form__check-area')
			.addClass('checked');

			$('.select-form__subscribe').find('.select-form__check-area')
			.removeClass('checked');

			$('#check-purchase').prop('checked',true);
			$('#check-subscribe').prop('checked',false);
			$('.food__button').html('Add to cart');
			subscribeState = false;
		});
		$(`#${checkID2}`).click(function(){
			$('.select-form__subscribe').find('.select-form__check-area')
			.addClass('checked');

			$('.select-form__purchase').find('.select-form__check-area')
			.removeClass('checked');

			$('#check-subscribe').prop('checked',true);
			$('#check-purchase').prop('checked',false);
			$('.food__button').html('Subscribe');
			subscribeState = true;
		});
	}

	function secClickScrollUp(itemsClassList){
		$(`.${itemsClassList}`).each(function(){
			$(this).on('click', function(){
    			$("html, body").animate({ scrollTop: 0 }, 'swing');
			});
		});
	}

	secClickScrollUp('order-now');

	setClickOnCheckbox('check-purchase', 'check-subscribe');
	
	setChangeOnSelect('select-food');

	setClickOnVideo('video-play','video-close');

	setKeyPressOnESC(closeVideo);
	
	setClickOnTabs('super-food__tab');

	const subscribeOnLangChange = (lang) => {
			console.log(lang);
		}

	const table = new Table('table',['','Amount','%RI']);
	table.create(listOfTables[FIRST_ITEM]);
	table.render();

	let dropup = new DropUp('dropup', subscribeOnLangChange);
	dropup.init();
	const demo = new PopupDialog('popup-demo','demo');
	demo.init();
	const language = new PopupDialog('popup-lang', 'language');
	language.init();
})