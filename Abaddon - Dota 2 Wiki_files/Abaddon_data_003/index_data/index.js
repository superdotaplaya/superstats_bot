var NEUTROGENA = NEUTROGENA || {};
var nameSpace = NEUTROGENA || {};

( function () {
	"use strict";

	var timeline;
	var wrapper, clickThrough, width, height;
	var activeTrigger = "N/A"; // Default is set as N/A
	var date = new Date();
	var day = date.getDay();
	var hour = date.getHours();
	
	
	nameSpace.init = function () {
		// Initialize any variables here
		wrapper = document.getElementById( 'wrapper' );
		clickThrough = document.getElementById('click_through');
		
		width = 300;
		height = 250;

		//nameSpace.createDust(500);

		wrapper.className = 'show';
		nameSpace.IDsToVars();
		nameSpace.buildDynamicContent();
		nameSpace.initClickTag();
		nameSpace.initAnimation();
		nameSpace.startAnimation();

		console.log('init called')

	};



	nameSpace.initClickTag = function () {
		clickThrough.onclick = function () {
			//jvxAd.openClickThrough(global_clickTAG_url);
			//Enabler.exit('Background Exit');
			Enabler.exitOverride("Background Exit", _clickTAG_url);
			// Dynamically Set Click Variable
			Enabler.reportCustomVariableCount2(_trigger+" with active trigger: "+activeTrigger+" Clicked");
			Enabler.counter(_trigger+" trigger");
		};		
	};

	nameSpace.initAnimation = function () {


		if(_creative === 'HB_FMT' || _creative === 'HB_Cleansing' || _creative === 'HB_Megabrand'){

			TweenMax.set([swipe], {alpha:0});

			//nameSpace.createBubbles(50);
			nameSpace.animateProduct(product1, 1);
			nameSpace.animateProduct(product2, 1);
			nameSpace.animateProduct(product3, 1);

			TweenMax.set([bubbles, copy2], {alpha:0});

			timeline = new TimelineMax( {
				delay: 0.2,
				onComplete: nameSpace.onAnimationComplete
			} );

			timeline.pause();

			if( _copy2 == ""){

				timeline.add ([

					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					TweenMax.to(cta, .8, {alpha:1, ease:Cubic.easeInOut, delay:3})
				]);

				if(_creative === "HB_Megabrand") {
					console.log(_creative);
					var faded = document.getElementById('copy_fade_in');
					timeline.to(faded, 1, {autoAlpha: 1, ease: Cubic.easeInOut}, "-=2");
				}

			}else{
				timeline.add ([
					//
					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					
					//
					TweenMax.to(copy1, .8, {alpha:0, ease:Cubic.easeInOut, delay:5}),
					TweenMax.to(copy2, .8, {alpha:1, ease:Cubic.easeInOut, delay:6}),					

					TweenMax.to(cta, .8, {alpha:1, ease:Cubic.easeInOut, delay:7})
				])
			}
		}

		if(_creative === 'HB_MAKEUP'){

			

			TweenMax.set([copy2, water, waterSplash, water_front], {alpha:0});

			timeline = new TimelineMax( {
				delay: 0.2,
				onComplete: nameSpace.onAnimationComplete
			} );

			timeline.pause();

			if( _copy2 == ""){

				timeline.add ([
					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					TweenMax.to(cta, .8, {alpha:1, ease:Cubic.easeInOut, delay:3}),

					TweenMax.delayedCall(1, nameSpace.animateSwipe, ['#swipe_SVGID_1_', [305, 135, 347, 107]]),

					TweenMax.delayedCall(2, nameSpace.animateSwipe, ['#swipe_SVGID_2_', [341, 91, 416, 53]]),

					TweenMax.delayedCall(2.5, nameSpace.animateSwipe, ['#swipe_SVGID_3_', [324, 96, 403, 57]])
				])

			}else{

				timeline.add ([
					//
					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),

					TweenMax.delayedCall(1, nameSpace.animateSwipe, ['#swipe_SVGID_1_', [305, 135, 347, 107]]),

					TweenMax.delayedCall(2, nameSpace.animateSwipe, ['#swipe_SVGID_2_', [341, 91, 416, 53]]),

					TweenMax.delayedCall(2.5, nameSpace.animateSwipe, ['#swipe_SVGID_3_', [324, 96, 403, 57]]),
					
					//
					TweenMax.to(copy1, .8, {alpha:0, ease:Cubic.easeInOut, delay:5}),
					TweenMax.to(copy2, .8, {alpha:1, ease:Cubic.easeInOut, delay:6}),	

					TweenMax.to(retailLogo, .8, {alpha:1, ease:Cubic.easeInOut, delay:7})
				])

			}
		}

		if(_creative === 'HB_SPF_v2'){

			nameSpace.createDroplets(70);

			TweenMax.set([copy2, water, water_front], {alpha:0});

			if(_copy2 != ""){
				TweenMax.set(retailLogo, {alpha:0});
			}


			timeline = new TimelineMax( {
				delay: 0.2,
				onComplete: nameSpace.onAnimationComplete
			} );

			timeline.pause();

			if( _copy2 == ""){

				timeline.add ([

					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					TweenMax.to(cta, .8, {alpha:1, ease:Cubic.easeInOut, delay:3}),

					TweenMax.delayedCall(1, nameSpace.animateSwipe, ['#splashy_SVGID_1_', [-14, 27, -272, -125]]),

					TweenMax.delayedCall(.5, nameSpace.animateDroplets, [40])
				])

			}else{
				timeline.add ([
					//
					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					//
					TweenMax.to(copy1, .8, {alpha:0, ease:Cubic.easeInOut, delay:5}),
					TweenMax.to(copy2, .8, {alpha:1, ease:Cubic.easeInOut, delay:6}),	

					TweenMax.delayedCall(1, nameSpace.animateSwipe, ['#splashy_SVGID_1_', [-14, 27, -272, -125]]),

					TweenMax.delayedCall(.5, nameSpace.animateDroplets, [40]),

					TweenMax.to(retailLogo, .8, {alpha:1, ease:Cubic.easeInOut, delay:7})
				])

			}
		}



		if(_creative === 'HB_SPF'){

			nameSpace.createDust(500);
			TweenMax.set([copy2, water, water_front], {alpha:0});

			if(_copy2 != ""){
				TweenMax.set(retailLogo, {alpha:0});
			}
			
			// setTimeout(function(){
			// 	nameSpace.animateDust();
			// }, 1000);

			timeline = new TimelineMax( {
				delay: 0.2,
				onComplete: nameSpace.onAnimationComplete
			} );

			timeline.pause();

			if( _copy2 == ""){

				timeline.add ([
		
					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					TweenMax.to(cta, .8, {alpha:1, ease:Cubic.easeInOut, delay:3})
				])
			
			}else{
				timeline.add ([
					//
					TweenMax.to(copy1, .8, {alpha:1, ease:Cubic.easeInOut, delay:2}),
					//
					TweenMax.to(copy1, .8, {alpha:0, ease:Cubic.easeInOut, delay:5}),
					TweenMax.to(copy2, .8, {alpha:1, ease:Cubic.easeInOut, delay:6}),	

					TweenMax.to(retailLogo, .8, {alpha:1, ease:Cubic.easeInOut, delay:7})
				])

			}
		}

		
		
		
	};

	nameSpace.buildDynamicContent = function(){

		Enabler.setProfileId(10044880);
	    var devDynamicContent = {};

	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative= [{}];
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0]._id = 0;
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].startDate = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].startDate.RawValue = "1/1/18";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].startDate.UtcValue = 1514764800000;
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].endDate = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].endDate.RawValue = "12/31/18";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].endDate.UtcValue = 1546214400000;
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].isActive = true;
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].dimAudience = "FMT";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].dimContextual = "N\/A_PMPALL_PMPHispanic_PMPBabyCenter_TrustX";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].dimTrigger = "N\/A";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].dimVersion = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].dimDimension = "160x600";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].creative_name = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].creative = "HB_FMT";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].bg = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].bg.Type = "file";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].bg.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/66344116/dirty/water.jpg";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product1 = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product1.Type = "file";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product1.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/66489754/dirty/HB_FMT_product1.png";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product2 = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product2.Type = "file";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product2.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/66489784/dirty/HB_FMT_product2.png";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product3 = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product3.Type = "file";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product3.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/66489751/dirty/HB_FMT_product3.png";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].logo = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].logo.Type = "file";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].logo.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/66341276/dirty/logo.png";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].retailLogo = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].retailLogo.Type = "file";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].retailLogo.Url = "https://s0.2mdn.net/ads/richmedia/studio/pv2/62883146/dirty/blank.png";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].headerCopy = "Hydro Boost";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].headerLeftTop = ["16", "31"];
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].headerStyle = ["33", "37"];
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1 = "For skin so<br>hydrated<br>and supple<br>it bounces<br>back";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_AM = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_PM = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_Weekends = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_MorningAfternoon = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_extraTrigger = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1LeftTop = ["16", "114"];
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2 = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_AM = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_PM = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_Weekends = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_MorningAfternoon = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_extraTrigger = "";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2LeftTop = ["16", "114"];
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].ctaCopy = "SHOP NOW";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].ctaCopyLeftTop = ["16", "215", "108", "28", "15"];
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].clickTAG_url = {};
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].clickTAG_url.Url = "https://www.neutrogena.com/hydro-boost.html";
	    devDynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].extra = "";
	    Enabler.setDevDynamicContent(devDynamicContent);



	    _creative = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].creative;
	    
	    _trigger = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].dimTrigger;

		_bg = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].bg.Url;
		_product1 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product1.Url;
		_product2 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product2.Url;
		_product3 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].product3.Url;
		_logo = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].logo.Url;
		_retailLogo = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].retailLogo.Url;

		_headerCopy = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].headerCopy;
		
		// assigns default copies
		_copy1 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1;
		_copy2 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2;


		// if triggers are met, assigns trigger copies
		// Within the active trigger, we set the active trigger variable.
		// Allow sus to dynamically build the Custom Variable 1 impression call
		if(_trigger === 'N/A_AM_PM'){
			
			if(hour >= 5 && hour <= 9){
				console.log('AM triggered, display trigger copy');
				activeTrigger = "AM";
				_copy1 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_AM;
				_copy2 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_AM;
			}

			if(hour >= 20 && hour <= 23){
				console.log('PM triggered, display trigger copy');
				activeTrigger = "PM";
				_copy1 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_PM;
				_copy2 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_PM;
			}

			Enabler.counter('Hydro Boost N/A_AM_PM trigger impression');
		}

		if(_trigger === 'N/A_Weekends'){
			
			if(day === 5 || day === 6 || day === 0){
				console.log('N/A_Weekends triggered, display trigger copy');
				activeTrigger = "Weekend";
				_copy1 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_Weekends;
				_copy2 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_Weekends;

			}
			
			Enabler.counter('Hydro Boost N/A_Weekends impression');
		}

		if(_trigger === 'N/A_Morning/Afternoon'){
			if(hour >= 5 && hour <= 12){
				activeTrigger = "Morning/Afternoon";
				console.log('N/A_Morning/Afternoon triggered, display trigger copy');
				_copy1 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1_MorningAfternoon;
				_copy2 = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2_MorningAfternoon;

			}

			Enabler.counter('Hydro Boost N/A_Morning/Afternoon impression');
		}

		if(_trigger === 'N/A'){
			Enabler.counter('Hydro Boost N/A trigger');
		}

		console.log('===> TRIGGER: ' + _trigger);
		// Fire the custom variable 1
		Enabler.reportCustomVariableCount1("Impression: "+_trigger+" with active trigger: "+activeTrigger);
		

		_ctaCopy = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].ctaCopy;

		_headerLeftTop = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].headerLeftTop;
		_headerStyle = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].headerStyle;
		_copy1LeftTop = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy1LeftTop;
		_copy2LeftTop = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].copy2LeftTop;
		_ctaCopyLeftTop = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].ctaCopyLeftTop;
		_clickTAG_url = dynamicContent.Neutrogena_Hydro_Boost_CC_v2_Creative[0].clickTAG_url.Url;


		nameSpace.insertImage(bg, _bg, true);
		nameSpace.insertImage(logo, _logo, true);
		nameSpace.insertImage(product1, _product1, true);
		nameSpace.insertImage(product2, _product2, true);
		nameSpace.insertImage(product3, _product3, true);
		nameSpace.insertImage(retailLogo, _retailLogo, true);

		if(_creative === 'HB_Cleansing'){
			water.style.display = "none"
			// nameSpace.insertImage(water, 'water_Cleansing.png');
			nameSpace.insertImage(water_front, 'water_front_Cleansing.png', true);
		}else if(_creative === 'HB_FMT'){
			nameSpace.insertImage(water_front, 'water_front.png', true);
		}else if(_creative === 'HB_Megabrand'){
			water.style.display = "none"
			// nameSpace.insertImage(water, 'water_Megabrand.png');
			nameSpace.insertImage(water_front, 'water_front_Megabrand.png', true);
		}else{
			//console.log('xx');
		}

		nameSpace.insertCopy(
			headerCopy, 
			_headerCopy, 
			_headerLeftTop, 
			_headerStyle
		);
		
		nameSpace.insertCopy(
			copy1, 
			_copy1, 
			_copy1LeftTop
		);

		nameSpace.insertCopy(
			copy2, 
			_copy2, 
			_copy2LeftTop
			
		);
		nameSpace.insertCopy(
			ctaCopy, 
			_ctaCopy, 
			_ctaCopyLeftTop
		);

	

	}

	nameSpace.insertCopy = function(_target, _copy, _pos, _style){

		_target.innerHTML = _copy;

		if(_style){
			_target.style.fontSize = _style[0] + 'px';
		}

		if(_pos[2]){
			
			if(_target === ctaCopy){
				_target.style.width = _pos[2] + 'px';
				_target.style.height = _pos[3] + 'px';
				_target.style.fontSize = _pos[4] + 'px';
				_target.style.paddingTop = _pos[5] + 'px';
			}else{
				_target.style.fontSize = _pos[2] + 'px';
				_target.style.lineHeight = _pos[3] + 'px';
			}
		}

		TweenMax.set(_target, {x:_pos[0], y:_pos[1]});

	}

	nameSpace.insertImage = function(_target, _img, _isBackground){
		if(_isBackground === true){
			_target.style.width = width + 'px';
			_target.style.height = height + 'px';
			_target.style.backgroundSize = 'contain';
			_target.style.backgroundImage = "url('" + _img + "')";
		}else{
			_target.innerHTML = '<img src="' + _img + '" />';
		}

	}

	nameSpace.startAnimation = function () {
		// Code for animation		
		timeline.play();
	};

	nameSpace.onAnimationComplete = function () {
		// Log duration of timeline
		console.log( 'Animation Duration: ' + timeline.time() + 's' );
		console.log(timeline)

		// Show a CTA or any animations outside main timeline
		// TweenMax.from( cta, 0.4, { y: '110%' } );
		// TweenMax.to( cta, 0.4, { opacity: 1 } );
	};

	nameSpace.IDsToVars = function(){
		var allElements = document.getElementsByTagName("*");

		for (var q = 0; q<allElements.length; q++){
			var el = allElements[q];
			if (el.id){
				window[el.id]=document.getElementById(el.id);
				el.style.position = "absolute";

				
			}
		}
	};


	// functions for HB_FMT

	nameSpace.animateWater = function(){

		//TweenMax.to("#SVGID_1_", 3, {attr:{x1:307, y1:125, x2:555, y2:125}, ease:Linear.easeNone, repeat:6, yoyo:true});
		//TweenMax.to("#water_SVGID_1_", 2, {attr:{x1:307, y1:125, x2:555, y2:125}, ease:Linear.easeNone, repeat:1, yoyo:true});
	}

	nameSpace.animateSplash = function(){

		TweenMax.to("#water_SVGID_3_", 1.5, {attr:{x1:150, y1:1, x2:150, y2:-599}, ease:Expo.easeOut, onComplete:function(){	
			//nameSpace.createBubbles();
		}});
		
		TweenMax.to(waterSplash, .15, {alpha:0, ease:Linear.easeNone, delay:.9});
	}

	nameSpace.animateProduct = function(_p){

		// if(_p == product1){
		// 	TweenMax.set(_p, {transformOrigin:"60% 80%"});
		// 	TweenMax.delayedCall(1, nameSpace.animateSplash);
		// 	TweenMax.delayedCall(1, nameSpace.animateBubbles);
		// }else if(_p == product2){
		// 	TweenMax.set(_p, {transformOrigin:"70% 80%"});
		// }else{
		// 	TweenMax.set(_p, {transformOrigin:"80% 80%"});
		// }

		// var randT = 1.5 + Math.random()*.1;
		// TweenMax.set(_p, {y:-height - (Math.random()*50), rotation:-15 + Math.random()*30});

		// if(_copy2 === ""){

		// 	TweenMax.to(_p, 2, {y:10 + (Math.random()*15), ease:Cubic.easeInOut, onComplete:function(){
		// 		TweenMax.to(_p, 2 + (Math.random()*1), {y:0, rotation:0, ease:Cubic.easeOut});
		// 	}});

			

		// }else{

		// 	TweenMax.to(_p, 2, {y:8 + (Math.random()*25), ease:Cubic.easeInOut, onComplete:function(){
		// 		TweenMax.to(_p, 2 + (Math.random()*1), {y:-5 - (Math.random()*10), rotation:-5 + (Math.random()*10), ease:Linear.easeNone, onComplete:function(){
		// 			TweenMax.to(_p, 2, {y:0, rotation:0, ease:Linear.easeNone, repeat:1, yoyo:true});
		// 		}});
		// 	}});

		// }	

		var _t = 2 + Math.random()*1
		var _v = .5 + Math.random()*10;

		if(_p == product1){
			TweenMax.to(_p, _t, {y:"+=" + 4, ease:Linear.easeNone, yoyo:true, repeat:5});
		}

		if(_p == product2){
			TweenMax.to(_p, _t, {y:"+=" + 6, ease:Linear.easeNone, yoyo:true, repeat:5});
		}

		if(_p == product3){
			TweenMax.to(_p, _t, {y:"+=" + 5, ease:Linear.easeNone, yoyo:true, repeat:5});
		}
		

	}

	nameSpace.createBubbles = function(_qty){

		var bub = 'bubble.png';
		TweenMax.set(bubbles, {alpha:0});
		for(var i = 0; i < _qty; i ++){
			var bub_size = Math.floor(Math.random()*15);
			var d = document.createElement('div');
			d.style.width = bub_size + 'px';
			d.style.height = bub_size + 'px';
			d.style.position = 'absolute';
			d.style.backgroundImage = 'url(' + bub + ')';
			d.style.backgroundSize = 'contain';

			bubbles.appendChild(d);
		}
	}

	nameSpace.animateBubbles = function(){
		TweenMax.to(bubbles, 1.5, {alpha:1, ease:Cubic.easeInOut})
		var _d = bubbles.childNodes.length;

		for(var i = 0; i < _d; i ++){
			var d = bubbles.childNodes[i];
			TweenMax.set(d, {x:40 + Math.random()*200, y:height + Math.random()*20})
			TweenMax.to(d, 3 + (Math.random()*2), {y:"-=" + (45 + Math.random()*40), ease:Cubic.easeInOut, delay: i * .001});
			//TweenMax.to(d, 2, {alpha:0, delay: i * .008});
		}
	}


	nameSpace.createDust = function(_qty){

		var dustColor = ['#f2e4c5', '#d0b4a3', '#d4bba2']
		TweenMax.set(dustHolder, {alpha:0});
		for(var i = 0; i < _qty; i ++){
			var dcolor = dustColor[Math.floor(Math.random()*3)];
			var d = document.createElement('div');
			d.style.width = '2px';
			d.style.height = '2px';
			d.style.backgroundColor = dcolor;
			d.style.position = 'absolute';
			dustHolder.appendChild(d);
		}
	}

	nameSpace.animateDust = function(){
		TweenMax.to(dustHolder, 1.5, {alpha:.9, ease:Cubic.easeInOut})
		var _d = dustHolder.childNodes.length;

		for(var i = 0; i < _d; i ++){
			var d = dustHolder.childNodes[i];
			TweenMax.set(d, {x:-50 + Math.random()*100, y:140 + Math.random()*50})
			TweenMax.to(d, 2 + (Math.random()*.5), {x:300 + Math.random()*150, y:30 + Math.random()*170, ease:Linear.easeNone, delay: i * .005});
			TweenMax.to(d, 2, {alpha:0, delay: i * .008});
		}
	}

	nameSpace.animateSwipe = function(_id, _posValues){
		TweenMax.to(_id, 1, {attr:{x1:_posValues[0], y1:_posValues[1], x2:_posValues[2], y2:_posValues[3]}, ease:Linear.easeNone});
	}

	nameSpace.animateSwipe = function(_id, _posValues){
		TweenMax.set(splashy, {x:"+=20", scale:.8, transformOrigin:"100% 80%"});
		TweenMax.to(splashy, 1, {x:0, scale:1, ease:Cubic.easeInOut});
		TweenMax.to(_id, 1, {attr:{x1:_posValues[0], y1:_posValues[1], x2:_posValues[2], y2:_posValues[3]}, ease:Linear.easeNone});

	}

	nameSpace.createDroplets = function(_qty){

		var droplet = ['droplet1.png', 'droplet2.png'];
		TweenMax.set(dropletHolder, {alpha:0});

		for(var i = 0; i < _qty; i ++){
			var drop = droplet[Math.floor(Math.random()*2)];
			var d = document.createElement('div');
			d.innerHTML = '<img src="' + drop + '" />';
			d.style.position = 'absolute';
			dropletHolder.appendChild(d);
		}
	}

	nameSpace.animateDroplets = function(){
		TweenMax.to(dropletHolder, 1.5, {alpha:1, ease:Cubic.easeInOut})
		var _d = dropletHolder.childNodes.length;

		for(var i = 0; i < _d; i ++){
			var d = dropletHolder.childNodes[i];
			TweenMax.set(d, {x:(width * .8) + Math.random()*30, y:180})
			TweenMax.to(d, 2 + (Math.random()*.5), {x:(width * .4) + Math.random()*180, y:60 + Math.random()*210, ease:Cubic.easeInOut});
			TweenMax.to(d, 3.5, {alpha:0, ease:Cubic.easeInOut});
		}
	}


	// functions for HB_SPF

	nameSpace.createDust = function(_qty){

		var dustColor = ['#f2e4c5', '#d0b4a3', '#d4bba2']
		TweenMax.set(dustHolder, {alpha:0});
		for(var i = 0; i < _qty; i ++){
			var dcolor = dustColor[Math.floor(Math.random()*3)];
			var d = document.createElement('div');
			d.style.width = '2px';
			d.style.height = '2px';
			d.style.backgroundColor = dcolor;
			d.style.position = 'absolute';
			dustHolder.appendChild(d);
		}
	}

	nameSpace.animateDust = function(){
		TweenMax.to(dustHolder, 1.5, {alpha:.9, ease:Cubic.easeInOut})
		var _d = dustHolder.childNodes.length;

		for(var i = 0; i < _d; i ++){
			var d = dustHolder.childNodes[i];
			TweenMax.set(d, {x:-50 + Math.random()*100, y:140 + Math.random()*50})
			TweenMax.to(d, 2 + (Math.random()*.5), {x:300 + Math.random()*150, y:30 + Math.random()*170, ease:Linear.easeNone, delay: i * .005});
			TweenMax.to(d, 2, {alpha:0, delay: i * .008});
		}
	}

	


} ) ();