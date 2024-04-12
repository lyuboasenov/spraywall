"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2542],{2542:(S,p,m)=>{m.d(p,{Hg:()=>T,Ud:()=>I});var n=m(4438),c=m(177);const d=["*"];function g(a,t){if(1&a){const e=n.RV6();n.j41(0,"div",2),n.bIt("click",function(){n.eBV(e);const o=n.XpG();return n.Njj(o.toggleZoom())}),n.k0s()}if(2&a){const e=n.XpG();n.AVh("pz-zoom-button-out",e.isZoomedIn)}}const r={transitionDuration:200,doubleTap:!0,doubleTapScale:2,limitZoom:"original image size",autoZoomOut:!1,zoomControlScale:1,minPanScale:1.0001,minScale:0,listeners:"mouse and touch",wheel:!0,wheelZoomFactor:.2,draggableImage:!1},u={"transition-duration":"transitionDuration",transitionDurationBackwardCompatibility:"transitionDuration","double-tap":"doubleTap",doubleTapBackwardCompatibility:"doubleTap","double-tap-scale":"doubleTapScale",doubleTapScaleBackwardCompatibility:"doubleTapScale","auto-zoom-out":"autoZoomOut",autoZoomOutBackwardCompatibility:"autoZoomOut","limit-zoom":"limitZoom",limitZoomBackwardCompatibility:"limitZoom"};class f{get touchListeners(){return this.properties.touchListeners?this.properties.touchListeners:this._touchListeners}get mouseListeners(){return this.properties.mouseListeners?this.properties.mouseListeners:this._mouseListeners}get otherListeners(){return this.properties.otherListeners?this.properties.otherListeners:this._otherListeners}constructor(t){this.eventType=void 0,this.handlers={},this.startX=0,this.startY=0,this.lastTap=0,this.doubleTapMinTimeout=300,this.tapMinTimeout=200,this.touchstartTime=0,this.i=0,this.isMousedown=!1,this._touchListeners={touchstart:"handleTouchstart",touchmove:"handleTouchmove",touchend:"handleTouchend"},this._mouseListeners={mousedown:"handleMousedown",mousemove:"handleMousemove",mouseup:"handleMouseup",wheel:"handleWheel"},this._otherListeners={resize:"handleResize"},this.handleTouchstart=e=>{this.elementPosition=this.getElementPosition(),this.touchstartTime=(new Date).getTime(),void 0===this.eventType&&this.getTouchstartPosition(e),this.runHandler("touchstart",e)},this.handleTouchmove=e=>{this.detectPan(e.touches)&&this.runHandler("pan",e),this.detectPinch(e)&&this.runHandler("pinch",e)},this.handleTouchend=e=>{const i=e.touches;this.detectDoubleTap()&&this.runHandler("double-tap",e),this.detectTap(),this.runHandler("touchend",e),this.eventType="touchend",i&&0===i.length&&(this.eventType=void 0,this.i=0)},this.handleMousedown=e=>{this.isMousedown=!0,this.elementPosition=this.getElementPosition(),this.touchstartTime=(new Date).getTime(),void 0===this.eventType&&this.getMousedownPosition(e),this.runHandler("mousedown",e)},this.handleMousemove=e=>{if(this.isMousedown){switch(this.runHandler("pan",e),this.detectLinearSwipe(e)){case"horizontal-swipe":e.swipeType="horizontal-swipe",this.runHandler("horizontal-swipe",e);break;case"vertical-swipe":e.swipeType="vertical-swipe",this.runHandler("vertical-swipe",e)}(this.detectLinearSwipe(e)||"horizontal-swipe"===this.eventType||"vertical-swipe"===this.eventType)&&this.handleLinearSwipe(e)}},this.handleMouseup=e=>{this.detectTap(),this.isMousedown=!1,this.runHandler("mouseup",e),this.eventType=void 0,this.i=0},this.handleWheel=e=>{this.runHandler("wheel",e)},this.handleResize=e=>{this.runHandler("resize",e)},this.properties=t,this.element=this.properties.element,this.elementPosition=this.getElementPosition(),this.toggleEventListeners("addEventListener")}destroy(){this.toggleEventListeners("removeEventListener")}toggleEventListeners(t){let e;for(var i in e="mouse and touch"===this.properties.listeners?Object.assign(this.touchListeners,this.mouseListeners):this.detectTouchScreen()?this.touchListeners:this.mouseListeners,this.properties.resize&&(e=Object.assign(e,this.otherListeners)),e){const o=e[i];"resize"===i?("addEventListener"===t&&window.addEventListener(i,this[o],!1),"removeEventListener"===t&&window.removeEventListener(i,this[o],!1)):"mouseup"===i||"mousemove"===i?("addEventListener"===t&&document.addEventListener(i,this[o],!1),"removeEventListener"===t&&document.removeEventListener(i,this[o],!1)):("addEventListener"===t&&this.element.addEventListener(i,this[o],!1),"removeEventListener"===t&&this.element.removeEventListener(i,this[o],!1))}}addEventListeners(t){window.addEventListener(t,this[this._mouseListeners[t]],!1)}removeEventListeners(t){window.removeEventListener(t,this[this._mouseListeners[t]],!1)}handleLinearSwipe(t){this.i++,this.i>3&&(this.eventType=this.getLinearSwipeType(t)),"horizontal-swipe"===this.eventType&&this.runHandler("horizontal-swipe",t),"vertical-swipe"===this.eventType&&this.runHandler("vertical-swipe",t)}runHandler(t,e){this.handlers[t]&&this.handlers[t](e)}detectPan(t){return 1===t.length&&!this.eventType||"pan"===this.eventType}detectDoubleTap(){if(null!=this.eventType)return;const t=(new Date).getTime(),e=t-this.lastTap;if(clearTimeout(this.doubleTapTimeout),e<this.doubleTapMinTimeout&&e>0)return!0;this.doubleTapTimeout=setTimeout(()=>{clearTimeout(this.doubleTapTimeout)},this.doubleTapMinTimeout),this.lastTap=t}detectTap(){if(null!=this.eventType)return;const e=(new Date).getTime()-this.touchstartTime;e>0&&this.runHandler(e<this.tapMinTimeout?"tap":"longtap",{})}detectPinch(t){return 2===t.touches.length&&void 0===this.eventType||"pinch"===this.eventType}detectLinearSwipe(t){const e=t.touches;if(e){if(1===e.length&&!this.eventType||"horizontal-swipe"===this.eventType||"vertical-swipe"===this.eventType)return this.getLinearSwipeType(t)}else if(!this.eventType||"horizontal-swipe"===this.eventType||"vertical-swipe"===this.eventType)return this.getLinearSwipeType(t)}getLinearSwipeType(t){if("horizontal-swipe"!==this.eventType&&"vertical-swipe"!==this.eventType){const e=Math.abs(this.moveLeft(0,t)-this.startX);return 3*Math.abs(this.moveTop(0,t)-this.startY)>e?"vertical-swipe":"horizontal-swipe"}return this.eventType}getElementPosition(){return this.element.getBoundingClientRect()}getTouchstartPosition(t){this.startX=t.touches[0].clientX-this.elementPosition.left,this.startY=t.touches[0].clientY-this.elementPosition.top}getMousedownPosition(t){this.startX=t.clientX-this.elementPosition.left,this.startY=t.clientY-this.elementPosition.top}moveLeft(t,e){const i=e.touches;return i?i[t].clientX-this.elementPosition.left:e.clientX-this.elementPosition.left}moveTop(t,e){const i=e.touches;return i?i[t].clientY-this.elementPosition.top:e.clientY-this.elementPosition.top}detectTouchScreen(){var t=" -webkit- -moz- -o- -ms- ".split(" ");if("ontouchstart"in window)return!0;var i=["(",t.join("touch-enabled),("),"heartz",")"].join("");return window.matchMedia(i).matches}on(t,e){t&&(this.handlers[t]=e)}}class b{get minPanScale(){return this.getPropertiesValue("minPanScale")}get fullImage(){return this.properties.fullImage}constructor(t){this.properties=r,this.i=0,this.scale=1,this.initialScale=1,this.startX=0,this.startY=0,this.moveX=0,this.moveY=0,this.initialMoveX=0,this.initialMoveY=0,this.moveXC=0,this.moveYC=0,this.lastTap=0,this.draggingMode=!1,this.distance=0,this.doubleTapTimeout=0,this.initialDistance=0,this.events={},this.defaultMaxScale=3,this.handleTouchstart=e=>{this.touches.addEventListeners("mousemove","handleMousemove"),this.getElementPosition(),void 0===this.eventType&&this.getTouchstartPosition(e)},this.handleTouchend=e=>{if("touchend"===e.type){this.i=0,this.draggingMode=!1;const i=e.touches;this.scale<1&&(this.scale=1),this.properties.autoZoomOut&&"pinch"===this.eventType&&(this.scale=1),("pinch"===this.eventType||"pan"===this.eventType&&this.scale>this.minPanScale)&&this.alignImage(),("pinch"===this.eventType||"pan"===this.eventType||"horizontal-swipe"===this.eventType||"vertical-swipe"===this.eventType)&&this.updateInitialValues(),this.eventType="touchend",i&&0===i.length&&(this.eventType=void 0)}"mouseup"===e.type&&(this.draggingMode=!1,this.updateInitialValues(),this.eventType=void 0),this.touches.removeEventListeners("mousemove","handleMousemove")},this.handlePan=e=>{if(this.scale<this.minPanScale||this.properties.disablePan)return;e.preventDefault();const{clientX:i,clientY:o}=this.getClientPosition(e);this.eventType||(this.startX=i-this.elementPosition.left,this.startY=o-this.elementPosition.top),this.eventType="pan",this.moveX=this.initialMoveX+(this.moveLeft(e,0)-this.startX),this.moveY=this.initialMoveY+(this.moveTop(e,0)-this.startY),this.properties.limitPan&&(this.limitPanY(),this.limitPanX()),"mousemove"===e.type&&this.scale>this.minPanScale&&this.centeringImage(),this.transformElement(0)},this.handleDoubleTap=e=>{this.toggleZoom(e)},this.handlePinch=e=>{if(e.preventDefault(),void 0===this.eventType||"pinch"===this.eventType){const i=e.touches;if(!this.eventType){this.initialDistance=this.getDistance(i);const o=this.moveLeft(e,0),s=this.moveLeft(e,1),h=this.moveTop(e,0),l=this.moveTop(e,1);this.moveXC=(o+s)/2-this.initialMoveX,this.moveYC=(h+l)/2-this.initialMoveY}this.eventType="pinch",this.distance=this.getDistance(i),this.scale=this.initialScale*(this.distance/this.initialDistance),this.moveX=this.initialMoveX-(this.distance/this.initialDistance*this.moveXC-this.moveXC),this.moveY=this.initialMoveY-(this.distance/this.initialDistance*this.moveYC-this.moveYC),this.handleLimitZoom(),this.properties.limitPan&&(this.limitPanY(),this.limitPanX()),this.transformElement(0)}},this.handleWheel=e=>{e.preventDefault();let i=this.properties.wheelZoomFactor||0,s=this.initialScale+(e.deltaY<0?i:-i);s<1+i?s=1:s<this.maxScale&&s>this.maxScale-i&&(s=this.maxScale),s<1||s>this.maxScale||s===this.scale||(this.getElementPosition(),this.scale=s,this.setZoom({scale:s,center:[e.clientX-this.elementPosition.left-this.initialMoveX,e.clientY-this.elementPosition.top-this.initialMoveY]}))},this.handleResize=e=>{this.setAutoHeight()},this.element=t.element,this.element&&("number"==typeof t.limitZoom&&(this.maxScale=t.limitZoom),this.elementTarget=this.element.querySelector("*").tagName,this.parentElement=this.element.parentElement,this.properties=Object.assign({},r,t),this.detectLimitZoom(),this.touches=new f({element:t.element,listeners:t.listeners,resize:t.autoHeight,mouseListeners:{mousedown:"handleMousedown",mouseup:"handleMouseup",wheel:"handleWheel"}}),this.setBasicStyles(),this.touches.on("touchstart",this.handleTouchstart),this.touches.on("touchend",this.handleTouchend),this.touches.on("mousedown",this.handleTouchstart),this.touches.on("mouseup",this.handleTouchend),this.touches.on("pan",this.handlePan),this.touches.on("mousemove",this.handlePan),this.touches.on("pinch",this.handlePinch),this.properties.wheel&&this.touches.on("wheel",this.handleWheel),this.properties.doubleTap&&this.touches.on("double-tap",this.handleDoubleTap),this.properties.autoHeight&&this.touches.on("resize",this.handleResize))}handleLimitZoom(){const t=this.maxScale,e=this.properties.minScale||0;if(this.scale>t||this.scale<=e){const i=this.getImageWidth(),o=this.getImageHeight(),l=this.moveX/(i*this.scale-i),M=this.moveY/(o*this.scale-o);this.scale>t&&(this.scale=t),this.scale<=e&&(this.scale=e);const P=o*this.scale;this.moveX=-Math.abs(l*(i*this.scale-i)),this.moveY=-Math.abs(-M*(P-o))}}moveLeft(t,e=0){return this.getClientPosition(t,e).clientX-this.elementPosition.left}moveTop(t,e=0){return this.getClientPosition(t,e).clientY-this.elementPosition.top}centeringImage(){const t=this.element.getElementsByTagName(this.elementTarget)[0],e=this.moveX,i=this.moveY;return this.moveY>0&&(this.moveY=0),this.moveX>0&&(this.moveX=0),t&&(this.limitPanY(),this.limitPanX()),t&&this.scale<1&&this.moveX<this.element.offsetWidth*(1-this.scale)&&(this.moveX=this.element.offsetWidth*(1-this.scale)),e!==this.moveX||i!==this.moveY}limitPanY(){const t=this.getImageHeight(),e=t*this.scale,i=this.parentElement.offsetHeight,o=this.element.offsetHeight;if(e<i)this.moveY=(i-o*this.scale)/2;else{const s=(t-o)*this.scale/2;this.moveY>s?this.moveY=s:e+Math.abs(s)-i+this.moveY<0&&(this.moveY=-(e+Math.abs(s)-i))}}limitPanX(){const t=this.getImageWidth(),e=t*this.scale,i=this.parentElement.offsetWidth,o=this.element.offsetWidth;if(e<i)this.moveX=(i-o*this.scale)/2;else{const s=(t-o)*this.scale/2;this.moveX>s?this.moveX=s:e+Math.abs(s)-i+this.moveX<0&&(this.moveX=-(t*this.scale+Math.abs(s)-i))}}setBasicStyles(){this.element.style.display="flex",this.element.style.alignItems="center",this.element.style.justifyContent="center",this.element.style.transformOrigin="0 0",this.setImageSize(),this.setDraggableImage()}removeBasicStyles(){this.element.style.display="",this.element.style.alignItems="",this.element.style.justifyContent="",this.element.style.transformOrigin="",this.removeImageSize(),this.removeDraggableImage()}setDraggableImage(){const t=this.getImageElement();t&&(t.draggable=this.properties.draggableImage)}removeDraggableImage(){const t=this.getImageElement();t&&(t.draggable=!0)}setImageSize(){const t=this.element.getElementsByTagName(this.elementTarget);t.length&&(t[0].style.maxWidth="100%",t[0].style.maxHeight="100%",this.setAutoHeight())}setAutoHeight(){const t=this.element.getElementsByTagName(this.elementTarget);if(!this.properties.autoHeight||!t.length)return;const e=t[0].getAttribute("width"),i=t[0].getAttribute("height");t[0].style.maxHeight=this.parentElement.offsetWidth/(e/i)+"px"}removeImageSize(){const t=this.element.getElementsByTagName(this.elementTarget);t.length&&(t[0].style.maxWidth="",t[0].style.maxHeight="")}getElementPosition(){this.elementPosition=this.element.parentElement.getBoundingClientRect()}getTouchstartPosition(t){const{clientX:e,clientY:i}=this.getClientPosition(t);this.startX=e-this.elementPosition.left,this.startY=i-this.elementPosition.top}getClientPosition(t,e=0){let i,o;return("touchstart"===t.type||"touchmove"===t.type)&&(i=t.touches[e].clientX,o=t.touches[e].clientY),("mousedown"===t.type||"mousemove"===t.type)&&(i=t.clientX,o=t.clientY),{clientX:i,clientY:o}}resetScale(){this.scale=1,this.moveX=0,this.moveY=0,this.updateInitialValues(),this.transformElement(this.properties.transitionDuration)}updateInitialValues(){this.initialScale=this.scale,this.initialMoveX=this.moveX,this.initialMoveY=this.moveY}getDistance(t){return Math.sqrt(Math.pow(t[0].pageX-t[1].pageX,2)+Math.pow(t[0].pageY-t[1].pageY,2))}getImageHeight(){return this.element.getElementsByTagName(this.elementTarget)[0].offsetHeight}getImageWidth(){return this.element.getElementsByTagName(this.elementTarget)[0].offsetWidth}transformElement(t){this.element.style.transition="all "+t+"ms",this.element.style.transform="matrix("+Number(this.scale)+", 0, 0, "+Number(this.scale)+", "+Number(this.moveX)+", "+Number(this.moveY)+")"}isTouchScreen(){const t=" -webkit- -moz- -o- -ms- ".split(" ");if("ontouchstart"in window)return!0;const e=["(",t.join("touch-enabled),("),"heartz",")"].join("");return this.getMatchMedia(e)}getMatchMedia(t){return window.matchMedia(t).matches}isDragging(){if(this.properties.disablePan)return!1;const t=this.getImageHeight(),e=this.getImageWidth();return this.scale>1?t*this.scale>this.parentElement.offsetHeight||e*this.scale>this.parentElement.offsetWidth:1===this.scale?t>this.parentElement.offsetHeight||e>this.parentElement.offsetWidth:void 0}detectLimitZoom(){var t;null!==(t=this.maxScale)&&void 0!==t||(this.maxScale=this.defaultMaxScale),"original image size"===this.properties.limitZoom&&"IMG"===this.elementTarget&&this.pollLimitZoomForOriginalImage()}pollLimitZoomForOriginalImage(){let t=setInterval(()=>{let e=this.getMaxScaleForOriginalImage();"number"==typeof e&&(this.maxScale=e,clearInterval(t))},10)}getMaxScaleForOriginalImage(){let t,e=this.element.getElementsByTagName("img")[0];return e.naturalWidth&&e.offsetWidth&&(t=e.naturalWidth/e.offsetWidth),t}getImageElement(){const t=this.element.getElementsByTagName(this.elementTarget);if(t.length)return t[0]}toggleZoom(t=!1){if(1===this.initialScale){if(t&&t.changedTouches){if(void 0===this.properties.doubleTapScale)return;const e=t.changedTouches;this.scale=this.initialScale*this.properties.doubleTapScale,this.moveX=this.initialMoveX-(e[0].clientX-this.elementPosition.left)*(this.properties.doubleTapScale-1),this.moveY=this.initialMoveY-(e[0].clientY-this.elementPosition.top)*(this.properties.doubleTapScale-1)}else this.scale=this.initialScale*((this.properties.zoomControlScale||0)+1),this.moveX=this.initialMoveX-this.element.offsetWidth*(this.scale-1)/2,this.moveY=this.initialMoveY-this.element.offsetHeight*(this.scale-1)/2;this.centeringImage(),this.updateInitialValues(),this.transformElement(this.properties.transitionDuration)}else this.resetScale()}setZoom(t){this.scale=t.scale;let e,i,o=this.element.offsetWidth,h=o*this.scale/(o*this.initialScale);t.center?(e=t.center[0],i=t.center[1]):(e=o/2-this.initialMoveX,i=this.element.offsetHeight/2-this.initialMoveY),this.moveX=this.initialMoveX-(h*e-e),this.moveY=this.initialMoveY-(h*i-i),this.centeringImage(),this.updateInitialValues(),this.transformElement(this.properties.transitionDuration)}alignImage(){this.centeringImage()&&(this.updateInitialValues(),this.transformElement(this.properties.transitionDuration))}destroy(){this.removeBasicStyles(),this.touches.destroy()}getPropertiesValue(t){return this.properties&&this.properties[t]?this.properties[t]:r[t]}}const v={overflow:"hidden",disableZoomControl:"auto",backgroundColor:"rgba(0,0,0,0.85)"};let T=(()=>{var a;class t{set properties(i){i&&(this._properties=i)}get properties(){return this._properties}set transitionDurationBackwardCompatibility(i){i&&(this._transitionDuration=i)}set transitionDuration(i){i&&(this._transitionDuration=i)}get transitionDuration(){return this._transitionDuration}set doubleTapBackwardCompatibility(i){i&&(this._doubleTap=i)}set doubleTap(i){i&&(this._doubleTap=i)}get doubleTap(){return this._doubleTap}set doubleTapScaleBackwardCompatibility(i){i&&(this._doubleTapScale=i)}set doubleTapScale(i){i&&(this._doubleTapScale=i)}get doubleTapScale(){return this._doubleTapScale}set autoZoomOutBackwardCompatibility(i){i&&(this._autoZoomOut=i)}set autoZoomOut(i){i&&(this._autoZoomOut=i)}get autoZoomOut(){return this._autoZoomOut}set limitZoomBackwardCompatibility(i){i&&(this._limitZoom=i)}set limitZoom(i){i&&(this._limitZoom=i)}get limitZoom(){return this._limitZoom}get hostOverflow(){return this.properties.overflow}get hostBackgroundColor(){return this.properties.backgroundColor}get isTouchScreen(){var i=" -webkit- -moz- -o- -ms- ".split(" ");if("ontouchstart"in window)return!0;var s=["(",i.join("touch-enabled),("),"heartz",")"].join("");return window.matchMedia(s).matches}get isDragging(){return this.pinchZoom?this.pinchZoom.isDragging():void 0}get isDisabled(){return this.properties.disabled}get scale(){return this.pinchZoom.scale}get isZoomedIn(){return this.scale>1}get scaleLevel(){return Math.round(this.scale/this._zoomControlScale)}get maxScale(){return this.pinchZoom.maxScale}get isZoomLimitReached(){return this.scale>=this.maxScale}get _zoomControlScale(){return this.getPropertiesValue("zoomControlScale")}constructor(i){this.elementRef=i,this.defaultComponentProperties=this.getDefaultComponentProperties(),this.applyPropertiesDefault(this.defaultComponentProperties,{})}ngOnInit(){this.initPinchZoom(),this.detectLimitZoom()}ngOnChanges(i){let o=this.getProperties(i);o=this.renameProperties(o),this.applyPropertiesDefault(this.defaultComponentProperties,o)}ngOnDestroy(){this.destroy()}initPinchZoom(){this.properties.disabled||(this.properties.limitZoom=this.limitZoom,this.properties.element=this.elementRef.nativeElement.querySelector(".pinch-zoom-content"),this.pinchZoom=new b(this.properties))}getProperties(i){let o={};for(var s in i)"properties"!==s&&(o[s]=i[s].currentValue),"properties"===s&&(o=i[s].currentValue);return o}renameProperties(i){for(var o in i)u[o]&&(i[u[o]]=i[o],delete i[o]);return i}applyPropertiesDefault(i,o){this.properties=Object.assign({},i,o)}toggleZoom(){this.pinchZoom.toggleZoom()}isControl(){return!(this.isDisabled||"disable"===this.properties.disableZoomControl||this.isTouchScreen&&"auto"===this.properties.disableZoomControl)}detectLimitZoom(){this.pinchZoom&&this.pinchZoom.detectLimitZoom()}destroy(){this.pinchZoom&&this.pinchZoom.destroy()}getPropertiesValue(i){return this.properties&&this.properties[i]?this.properties[i]:this.defaultComponentProperties[i]}getDefaultComponentProperties(){return{...r,...v}}}return(a=t).\u0275fac=function(i){return new(i||a)(n.rXU(n.aKT))},a.\u0275cmp=n.VBU({type:a,selectors:[["pinch-zoom"],["","pinch-zoom",""]],hostVars:4,hostBindings:function(i,o){2&i&&n.xc7("overflow",o.hostOverflow)("background-color",o.hostBackgroundColor)},inputs:{properties:"properties",transitionDurationBackwardCompatibility:[n.Mj6.None,"transition-duration","transitionDurationBackwardCompatibility"],transitionDuration:"transitionDuration",doubleTapBackwardCompatibility:[n.Mj6.None,"double-tap","doubleTapBackwardCompatibility"],doubleTap:"doubleTap",doubleTapScaleBackwardCompatibility:[n.Mj6.None,"double-tap-scale","doubleTapScaleBackwardCompatibility"],doubleTapScale:"doubleTapScale",autoZoomOutBackwardCompatibility:[n.Mj6.None,"auto-zoom-out","autoZoomOutBackwardCompatibility"],autoZoomOut:"autoZoomOut",limitZoomBackwardCompatibility:[n.Mj6.None,"limit-zoom","limitZoomBackwardCompatibility"],limitZoom:"limitZoom",disabled:"disabled",disablePan:"disablePan",overflow:"overflow",zoomControlScale:"zoomControlScale",disableZoomControl:"disableZoomControl",backgroundColor:"backgroundColor",limitPan:"limitPan",minPanScale:"minPanScale",minScale:"minScale",listeners:"listeners",wheel:"wheel",autoHeight:"autoHeight",wheelZoomFactor:"wheelZoomFactor",draggableImage:"draggableImage"},exportAs:["pinchZoom"],features:[n.OA$],ngContentSelectors:d,decls:3,vars:3,consts:[[1,"pinch-zoom-content"],["class","pz-zoom-button pz-zoom-control-position-bottom",3,"pz-zoom-button-out","click",4,"ngIf"],[1,"pz-zoom-button","pz-zoom-control-position-bottom",3,"click"]],template:function(i,o){1&i&&(n.NAR(),n.j41(0,"div",0),n.SdG(1),n.k0s(),n.DNE(2,g,1,2,"div",1)),2&i&&(n.AVh("pz-dragging",o.isDragging),n.R7$(2),n.Y8G("ngIf",o.isControl()))},dependencies:[c.bT],styles:["[_nghost-%COMP%]{position:relative;overflow:hidden;display:block}.pinch-zoom-content[_ngcontent-%COMP%]{height:inherit}.pz-dragging[_ngcontent-%COMP%]{cursor:all-scroll}.pz-zoom-button[_ngcontent-%COMP%]{position:absolute;z-index:1000;color:#fff;background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6IiBpZD0ic3ZnXzEiIGNsYXNzPSIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMSIvPjxwYXRoIGQ9Ik0xMiAxMGgtMnYySDl2LTJIN1Y5aDJWN2gxdjJoMnYxeiIgaWQ9InN2Z18zIiBjbGFzcz0iIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9zdmc+),url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE1LjUgMTRoLS43OWwtLjI4LS4yN0MxNS40MSAxMi41OSAxNiAxMS4xMSAxNiA5LjUgMTYgNS45MSAxMy4wOSAzIDkuNSAzUzMgNS45MSAzIDkuNSA1LjkxIDE2IDkuNSAxNmMxLjYxIDAgMy4wOS0uNTkgNC4yMy0xLjU3bC4yNy4yOHYuNzlsNSA0Ljk5TDIwLjQ5IDE5bC00Ljk5LTV6bS02IDBDNy4wMSAxNCA1IDExLjk5IDUgOS41UzcuMDEgNSA5LjUgNSAxNCA3LjAxIDE0IDkuNSAxMS45OSAxNCA5LjUgMTR6TTcgOWg1djFIN3oiIGlkPSJzdmdfMiIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==);background-color:#000c;background-position:center,-1000px;background-repeat:no-repeat,no-repeat;background-size:40px;width:56px;height:56px;border-radius:4px;opacity:.5;cursor:pointer;transition:opacity .1s;-webkit-user-select:none;user-select:none}.pz-zoom-button-out[_ngcontent-%COMP%]{background-position:-1000px,center}.pz-zoom-button[_ngcontent-%COMP%]:hover{opacity:.7}.pz-zoom-button.pz-zoom-control-position-right[_ngcontent-%COMP%]{right:16px;top:50%;margin-top:-28px}.pz-zoom-button.pz-zoom-control-position-right-bottom[_ngcontent-%COMP%]{right:16px;bottom:32px}.pz-zoom-button.pz-zoom-control-position-bottom[_ngcontent-%COMP%]{bottom:16px;left:50%;margin-left:-28px}.pz-zoom-control[_ngcontent-%COMP%]{position:absolute;background-color:#000c;border-radius:4px;overflow:hidden}.pz-zoom-control.pz-zoom-control-position-right[_ngcontent-%COMP%]{right:16px;top:50%;margin-top:-48px}.pz-zoom-control.pz-zoom-control-position-right-bottom[_ngcontent-%COMP%]{right:16px;bottom:32px}.pz-zoom-control.pz-zoom-control-position-bottom[_ngcontent-%COMP%]{bottom:16px;left:50%;margin-left:-48px}.pz-zoom-in[_ngcontent-%COMP%], .pz-zoom-out[_ngcontent-%COMP%]{width:48px;height:48px;background-position:center;background-repeat:no-repeat;opacity:1;cursor:pointer}.pz-zoom-in[_ngcontent-%COMP%]:hover, .pz-zoom-out[_ngcontent-%COMP%]:hover{background-color:#fff3}.pz-zoom-control-position-bottom[_ngcontent-%COMP%]   .pz-zoom-in[_ngcontent-%COMP%], .pz-zoom-control-position-bottom[_ngcontent-%COMP%]   .pz-zoom-out[_ngcontent-%COMP%]{float:right}.pz-disabled[_ngcontent-%COMP%]{opacity:.5;cursor:default}.pz-disabled[_ngcontent-%COMP%]:hover{background-color:#fff0}.pz-zoom-in[_ngcontent-%COMP%]{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgc3R5bGU9IiI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzaC02djZoLTJ2LTZINXYtMmg2VjVoMnY2aDZ2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgc3Ryb2tlPSJub25lIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjEiLz48cGF0aCBkPSJNLTE1LjgzNjczNDQyMDQ2MTY1Myw0NC41MzU0MDkzMDY3MTAxOCBoNTguMjA0MDgwODI3NTkzMDkgdi02LjU3NjIyNjcyMzM2OTIyMTUgSC0xNS44MzY3MzQ0MjA0NjE2NTMgeiIgZmlsbD0ibm9uZSIgaWQ9InN2Z18yIiBjbGFzcz0iIiBzdHJva2U9Im5vbmUiLz48L2c+PC9zdmc+)}.pz-zoom-out[_ngcontent-%COMP%]{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCI+PHJlY3QgaWQ9ImJhY2tncm91bmRyZWN0IiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4PSIwIiB5PSIwIiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48ZyBjbGFzcz0iY3VycmVudExheWVyIiBzdHlsZT0iIj48dGl0bGU+TGF5ZXIgMTwvdGl0bGU+PHBhdGggZD0iTTE5IDEzSDV2LTJoMTR2MnoiIGlkPSJzdmdfMSIgY2xhc3M9IiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvc3ZnPg==)}"]}),t})(),I=(()=>{var a;class t{}return(a=t).\u0275fac=function(i){return new(i||a)},a.\u0275mod=n.$C({type:a}),a.\u0275inj=n.G2t({imports:[c.MD]}),t})()}}]);