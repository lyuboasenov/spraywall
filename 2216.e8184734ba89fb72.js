"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2216],{2216:(C,g,i)=>{i.r(g),i.d(g,{AddRouteSchemaPageModule:()=>M});var S=i(177),y=i(4341),d=i(9364),m=i(8986),u=i(467),s=i(7700),e=i(4438),T=i(2167),H=i(4943),p=i(2542);const R=["canvas"],A=["zoom"],P=[{path:"",component:(()=>{var l;class c{constructor(t,o,n){this.routeService=t,this.wallTemplateService=o,this.loadingCtrl=n,this.template=null,this.holds=[],this._selectedHold=null}ngOnInit(){var t=this;return(0,u.A)(function*(){yield t.showLoading(),t.wallTemplateService.drawTemplateBackdrop(t.canvas.nativeElement),t.template=yield t.wallTemplateService.getTemplate(),t.routeService.holdBuffer=[],t.holds=t.routeService.holdBuffer,t.loading.dismiss()})()}showLoading(){var t=this;return(0,u.A)(function*(){t.loading=yield t.loadingCtrl.create({message:"Loading routes..."}),t.loading.present()})()}selectHold(t){var o=this;return(0,u.A)(function*(){o._selectedHold=t;const n=o.canvas.nativeElement;yield o.wallTemplateService.drawTemplateBackdrop(n),yield o.wallTemplateService.markHolds(o.holds,o._selectedHold,n)})()}templateClick(t){var o=this;return(0,u.A)(function*(){const n=Math.min(o.wallTemplateService.width/t.target.offsetWidth,o.wallTemplateService.height/t.target.offsetHeight),f=(t.layerX+(t.target.offsetWidth-t.target.parentElement.clientWidth)/2)*n,h=(t.layerY+(t.target.offsetHeight-t.target.parentElement.clientHeight)/2)*n,a=yield o.wallTemplateService.findHold(f,h);if(a)if(o.holds.includes(a))if(a.Type==s.S.FootHold){a.Type=s.S.Hold;let k=o.holds.indexOf(a);o.holds.splice(k,1),o._selectedHold=null}else a.Type==s.S.StartingHold?a.Type=s.S.Hold:a.Type==s.S.Hold?a.Type=s.S.FinishingHold:a.Type==s.S.FinishingHold&&(a.Type=s.S.FootHold),o._selectedHold=a;else a.Type=0==o.holds.length?s.S.StartingHold:s.S.Hold,o.holds.push(a),o._selectedHold=a;const v=o.canvas.nativeElement;yield o.wallTemplateService.drawTemplateBackdrop(v),yield o.wallTemplateService.markHolds(o.holds,o._selectedHold,v)})()}}return(l=c).\u0275fac=function(t){return new(t||l)(e.rXU(T.v),e.rXU(H.s),e.rXU(d.Xi))},l.\u0275cmp=e.VBU({type:l,selectors:[["app-add-route-schema"]],viewQuery:function(t,o){if(1&t&&(e.GBs(R,7),e.GBs(A,7)),2&t){let n;e.mGM(n=e.lsd())&&(o.canvas=n.first),e.mGM(n=e.lsd())&&(o.zoom=n.first)}},outputs:{holds:"holds"},decls:21,vars:4,consts:[["zoom",""],["canvas",""],[3,"translucent"],["slot","primary"],["fill","solid","routerLink","/routes"],["name","close-circle-outline"],["fill","solid","routerLink","details",3,"disabled"],["name","checkmark-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],["id","zoom",3,"limit-zoom"],["width","1500","height","700",3,"click"]],template:function(t,o){if(1&t){const n=e.RV6();e.j41(0,"ion-header",2)(1,"ion-toolbar")(2,"ion-buttons",3)(3,"ion-button",4),e.nrm(4,"ion-icon",5),e.k0s()(),e.j41(5,"ion-buttons",3)(6,"ion-button",6),e.nrm(7,"ion-icon",7),e.k0s()(),e.j41(8,"ion-title"),e.EFF(9,"New route"),e.k0s()()(),e.j41(10,"ion-content",8)(11,"ion-header",9)(12,"ion-toolbar")(13,"ion-title",10),e.EFF(14,"add-route-schema"),e.k0s()()(),e.j41(15,"div",11)(16,"pinch-zoom",12,0)(18,"canvas",13,1),e.bIt("click",function(h){return e.eBV(n),e.Njj(o.templateClick(h))}),e.EFF(20," Not supported on this browser "),e.k0s()()()()}2&t&&(e.Y8G("translucent",!0),e.R7$(6),e.Y8G("disabled",!(o.holds.length>1)),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(6),e.Y8G("limit-zoom",20))},dependencies:[d.Jm,d.QW,d.W9,d.eU,d.iq,d.BC,d.ai,d.N7,m.Wk,p.Hg],styles:["#container[_ngcontent-%COMP%], #container[_ngcontent-%COMP%]   #zoom[_ngcontent-%COMP%]{width:100%;height:100%}"]}),c})()}];let w=(()=>{var l;class c{}return(l=c).\u0275fac=function(t){return new(t||l)},l.\u0275mod=e.$C({type:l}),l.\u0275inj=e.G2t({imports:[m.iI.forChild(P),m.iI]}),c})(),M=(()=>{var l;class c{}return(l=c).\u0275fac=function(t){return new(t||l)},l.\u0275mod=e.$C({type:l}),l.\u0275inj=e.G2t({imports:[S.MD,y.YN,d.bv,w,p.Ud]}),c})()}}]);