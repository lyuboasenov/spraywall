"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9373],{9373:(U,H,r)=>{r.r(H),r.d(H,{ViewRouteSchemaPageModule:()=>k});var M=r(177),y=r(4341),s=r(9364),v=r(8986),f=r(467),t=r(4438),w=r(2167),S=r(4943),T=r(2542);const z=["canvas"],X=["zoom"],V=["zoomContainer"],Y=[{path:"",component:(()=>{var a;class m{constructor(e,n,i,u){this.routeService=e,this.wallTemplateService=n,this.router=i,this.loadingCtrl=u,this.activatedRoute=(0,t.WQX)(v.nX),this._discoveredHolds=[],this.handlePan=(o,d,h)=>{o.scale<o.minPanScale||o.properties.disablePan||(o.startX=d.x,o.startY=d.y,o.eventType="pan",o.moveX=o.initialMoveX+(h.x-d.x),o.moveY=o.initialMoveY+(h.y-d.y),o.properties.limitPan&&(o.limitPanY(),o.limitPanX()),o.scale>o.minPanScale&&o.centeringImage(),o.transformElement(0))}}ngOnInit(){var e=this;return(0,f.A)(function*(){yield e.showLoading(),e.id=e.activatedRoute.snapshot.paramMap.get("id");const n=yield e.routeService.getById(e.id),i=e.canvas.nativeElement;yield e.wallTemplateService.drawTemplateBackdrop(i),n?(e.route=n,yield e.markHolds(),setTimeout(()=>e.zoomToRoute(),100)):e.router.navigateByUrl("/not-found",{replaceUrl:!0}),e.loading.dismiss()})()}showLoading(){var e=this;return(0,f.A)(function*(){e.loading=yield e.loadingCtrl.create({message:"Loading routes..."}),e.loading.present()})()}zoomToRoute(){var e=this;return(0,f.A)(function*(){if(e._discoveredHolds&&e._discoveredHolds.length>0){let n=6e4,i=0,u=6e4,o=0;const d=HTMLDivElement=e.zoomContainer.nativeElement,h=e.canvas.nativeElement,p=h.width,C=h.height;for(const l of e._discoveredHolds)l&&(n>l.TemplateHold.Center.X-l.TemplateHold.Radius&&(n=Math.max(0,l.TemplateHold.Center.X-l.TemplateHold.Radius)),i<l.TemplateHold.Center.X+l.TemplateHold.Radius&&(i=Math.min(p,l.TemplateHold.Center.X+l.TemplateHold.Radius)),u>l.TemplateHold.Center.Y-l.TemplateHold.Radius&&(u=Math.max(0,l.TemplateHold.Center.Y-l.TemplateHold.Radius)),o<l.TemplateHold.Center.Y+l.TemplateHold.Radius&&(o=Math.min(C,l.TemplateHold.Center.Y+l.TemplateHold.Radius)));const P=o-u,E=i-n,R=Math.max(p/d.clientWidth,C/d.clientHeight);let g=Math.min(p/E,C/P);e.zoom.toggleZoom(),g=e.zoom.pinchZoom.scale,e.handlePan(e.zoom.pinchZoom,{x:(n+i)*g/(2*R),y:(u+o)*g/(2*R)},{x:p*g/(2*R),y:P*g/(2*R)})}})()}markHolds(){var e=this;return(0,f.A)(function*(){for(const o of null!==(n=null===(i=e.route)||void 0===i?void 0:i.Holds)&&void 0!==n?n:[]){var n,i;const d=yield e.wallTemplateService.findHold(o.Center.X,o.Center.Y);d&&e._discoveredHolds.push({TemplateHold:d,Type:o.Type})}e.wallTemplateService.markHolds(e._discoveredHolds,null,e.canvas.nativeElement)})()}}return(a=m).\u0275fac=function(e){return new(e||a)(t.rXU(w.v),t.rXU(S.s),t.rXU(v.Ix),t.rXU(s.Xi))},a.\u0275cmp=t.VBU({type:a,selectors:[["app-view-route-schema"]],viewQuery:function(e,n){if(1&e&&(t.GBs(z,7),t.GBs(X,7),t.GBs(V,7)),2&e){let i;t.mGM(i=t.lsd())&&(n.canvas=i.first),t.mGM(i=t.lsd())&&(n.zoom=i.first),t.mGM(i=t.lsd())&&(n.zoomContainer=i.first)}},decls:26,vars:6,consts:[["zoomContainer",""],["zoom",""],["canvas",""],[3,"translucent"],["slot","primary"],["fill","solid","routerLink","details"],["name","checkmark-outline"],["name","information-circle-outline"],["slot","start"],["fill","solid","routerLink","/routes"],["name","chevron-back-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],["id","zoomContainer"],["id","zoom",3,"limit-zoom"],["width","1500","height","700"]],template:function(e,n){1&e&&(t.j41(0,"ion-header",3)(1,"ion-toolbar")(2,"ion-buttons",4)(3,"ion-button",5),t.nrm(4,"ion-icon",6),t.k0s()(),t.j41(5,"ion-buttons",4)(6,"ion-button",5),t.nrm(7,"ion-icon",7),t.k0s()(),t.j41(8,"ion-title"),t.EFF(9),t.k0s(),t.j41(10,"ion-buttons",8)(11,"ion-button",9),t.nrm(12,"ion-icon",10),t.k0s()()()(),t.j41(13,"ion-content",11)(14,"ion-header",12)(15,"ion-toolbar")(16,"ion-title",13),t.EFF(17,"view-route-schema"),t.k0s()()(),t.j41(18,"div",14)(19,"div",15,0)(21,"pinch-zoom",16,1)(23,"canvas",17,2),t.EFF(25," Not supported on this browser "),t.k0s()()()()()),2&e&&(t.Y8G("translucent",!0),t.R7$(9),t.E5c("",null==n.route?null:n.route.Name," [ ",null==n.route?null:n.route.Difficulty," @ ",null==n.route?null:n.route.Angle,"\xb0 ] "),t.R7$(4),t.Y8G("fullscreen",!0),t.R7$(8),t.Y8G("limit-zoom",20))},dependencies:[s.Jm,s.QW,s.W9,s.eU,s.iq,s.BC,s.ai,s.N7,v.Wk,T.Hg],styles:["#container[_ngcontent-%COMP%], #container[_ngcontent-%COMP%]   #zoomContainer[_ngcontent-%COMP%], #container[_ngcontent-%COMP%]   #zoomContainer[_ngcontent-%COMP%]   #zoom[_ngcontent-%COMP%]{width:100%;height:100%}"]}),m})()}];let G=(()=>{var a;class m{}return(a=m).\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.$C({type:a}),a.\u0275inj=t.G2t({imports:[v.iI.forChild(Y),v.iI]}),m})(),k=(()=>{var a;class m{}return(a=m).\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.$C({type:a}),a.\u0275inj=t.G2t({imports:[M.MD,y.YN,s.bv,G,T.Ud]}),m})()}}]);