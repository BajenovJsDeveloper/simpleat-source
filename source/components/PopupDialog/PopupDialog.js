import $ from 'jquery';


class PopupDialog{
	constructor(idPopup, buttonsClssList){
		this.buttonsClssList = buttonsClssList;
		this.idPopup = idPopup;
	}
	init(){
		const popup = this.idPopup;
		const curItem = this;
		$(`.${this.buttonsClssList}`)
		.each(function(){
			$(this)
			.on('click', function(){
				$('html').css({overflowY:'hidden',width: `100vh + ${curItem._getScrollWidth()}`});
				$(`#${popup}`)
				.css({visibility: 'visible', 
					opacity: 1
				})
				$('.popup-demo__message-box').addClass('show');	  
				
				setTimeout(()=>{
					$(`#${popup}`)
					.css({opacity: 0,
						 visibility: 'hidden'
					})
					$('.popup-demo__message-box').removeClass('show');
					$('html').css({overflowY:'auto'});
				},3000);
			});
		});
	}
	_getScrollWidth(){
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
}

export { PopupDialog }