import $ from 'jquery';

class DropUp{
	constructor(idName, subscribe = null){
		this.idName = idName;
		this.language = '';
		this.subscribe = subscribe;
	}
	init(){
		let name = this.idName;
		let instance = this;
		let subscribe = this.subscribe;
		let curTarget = null;
		$(`#${name}`).on('click', function(event){
			$(`#${name}-list`).toggle();
			curTarget = event.currentTarget;
		});
		$(`.${name}__item`).each(function(){
			$(this).on('click',function(){
				let itemHtml = $(this).html();
				instance.language = $(this).data('lang');
				$(`#${name}-list`).hide();
				$(`#${name}`).html(itemHtml);
				if(typeof subscribe === 'function'){
				 	subscribe(instance.language);	
				}
				else console.log('Nothig to inform...! No subscribers!');
			});
		});
		$(window).on('click',function(event){
			if(!event.target.closest('.dropup')){
				$(`#${name}-list`).hide();
			}
		})	
	}
	getLang(){
		return this.language;
	}
}

export {DropUp};