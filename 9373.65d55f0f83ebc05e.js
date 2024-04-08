"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9373],{9373:(j,P,s)=>{s.r(P),s.d(P,{ViewRouteSchemaPageModule:()=>E});var S=s(177),z=s(4341),u=s(9364),v=s(8986),f=s(467),t=s(4438),p=s(2167),X=s(4943),w=s(2542);const V=["canvas"],Y=["zoom"],H=["zoomContainer"],G=[{path:"",component:(()=>{var i;class c{constructor(e,o,a,d){this.routeService=e,this.wallTemplateService=o,this.router=a,this.loadingCtrl=d,this.activatedRoute=(0,t.WQX)(v.nX),this._discoveredHolds=[],this.handlePan=(n,l,h)=>{n.scale<n.minPanScale||n.properties.disablePan||(n.startX=l.x,n.startY=l.y,n.eventType="pan",n.moveX=n.initialMoveX+(h.x-l.x),n.moveY=n.initialMoveY+(h.y-l.y),n.properties.limitPan&&(n.limitPanY(),n.limitPanX()),n.scale>n.minPanScale&&n.centeringImage(),n.transformElement(0))}}ngOnInit(){var e=this;return(0,f.A)(function*(){yield e.showLoading(),e.id=e.activatedRoute.snapshot.paramMap.get("id");const o=yield e.routeService.getById(e.id),a=e.canvas.nativeElement;yield e.wallTemplateService.drawTemplateBackdrop(a),o?(e.route=o,yield e.markHolds(),setTimeout(()=>e.zoomToRoute(),100)):e.router.navigateByUrl("/not-found",{replaceUrl:!0}),e.loading.dismiss()})()}showLoading(){var e=this;return(0,f.A)(function*(){e.loading=yield e.loadingCtrl.create({message:"Loading routes..."}),e.loading.present()})()}zoomToRoute(){var e=this;return(0,f.A)(function*(){if(e._discoveredHolds&&e._discoveredHolds.length>0){let o=6e4,a=0,d=6e4,n=0;const l=HTMLDivElement=e.zoomContainer.nativeElement,h=e.canvas.nativeElement,R=h.width,M=h.height;for(const r of e._discoveredHolds)r&&(o>r.Center.X-r.Radius&&(o=Math.max(0,r.Center.X-r.Radius)),a<r.Center.X+r.Radius&&(a=Math.min(R,r.Center.X+r.Radius)),d>r.Center.Y-r.Radius&&(d=Math.max(0,r.Center.Y-r.Radius)),n<r.Center.Y+r.Radius&&(n=Math.min(M,r.Center.Y+r.Radius)));const y=n-d,B=a-o,C=Math.max(R/l.clientWidth,M/l.clientHeight);let g=Math.min(R/B,M/y);e.zoom.toggleZoom(),g=e.zoom.pinchZoom.scale,e.handlePan(e.zoom.pinchZoom,{x:(o+a)*g/(2*C),y:(d+n)*g/(2*C)},{x:R*g/(2*C),y:y*g/(2*C)})}})()}markHolds(){var e=this;return(0,f.A)(function*(){for(const n of null!==(o=null===(a=e.route)||void 0===a?void 0:a.Holds)&&void 0!==o?o:[]){var o,a;const l=yield e.wallTemplateService.findHold(n.Center.X,n.Center.Y);l&&(n.Contour=l.Contour,n.MinRect=l.MinRect,n.Radius=l.Radius,e._discoveredHolds.push(n))}e.wallTemplateService.markHolds(e._discoveredHolds,null,e.canvas.nativeElement)})()}}return(i=c).\u0275fac=function(e){return new(e||i)(t.rXU(p.v),t.rXU(X.s),t.rXU(v.Ix),t.rXU(u.Xi))},i.\u0275cmp=t.VBU({type:i,selectors:[["app-view-route-schema"]],viewQuery:function(e,o){if(1&e&&(t.GBs(V,7),t.GBs(Y,7),t.GBs(H,7)),2&e){let a;t.mGM(a=t.lsd())&&(o.canvas=a.first),t.mGM(a=t.lsd())&&(o.zoom=a.first),t.mGM(a=t.lsd())&&(o.zoomContainer=a.first)}},decls:23,vars:6,consts:[["zoomContainer",""],["zoom",""],["canvas",""],[3,"translucent"],["slot","primary"],["fill","solid","routerLink","details"],["name","checkmark-outline"],["name","information-circle-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],["id","zoomContainer"],["id","zoom",3,"limit-zoom"],["width","1500","height","700"]],template:function(e,o){1&e&&(t.j41(0,"ion-header",3)(1,"ion-toolbar")(2,"ion-buttons",4)(3,"ion-button",5),t.nrm(4,"ion-icon",6),t.k0s()(),t.j41(5,"ion-buttons",4)(6,"ion-button",5),t.nrm(7,"ion-icon",7),t.k0s()(),t.j41(8,"ion-title"),t.EFF(9),t.k0s()()(),t.j41(10,"ion-content",8)(11,"ion-header",9)(12,"ion-toolbar")(13,"ion-title",10),t.EFF(14,"view-route-schema"),t.k0s()()(),t.j41(15,"div",11)(16,"div",12,0)(18,"pinch-zoom",13,1)(20,"canvas",14,2),t.EFF(22," Not supported on this browser "),t.k0s()()()()()),2&e&&(t.Y8G("translucent",!0),t.R7$(9),t.E5c("",null==o.route?null:o.route.Name," [ ",null==o.route?null:o.route.Difficulty," @ ",null==o.route?null:o.route.Angle,"\xb0 ] "),t.R7$(),t.Y8G("fullscreen",!0),t.R7$(8),t.Y8G("limit-zoom",20))},dependencies:[u.Jm,u.QW,u.W9,u.eU,u.iq,u.BC,u.ai,u.N7,v.Wk,w.Hg],styles:["#container[_ngcontent-%COMP%], #container[_ngcontent-%COMP%]   #zoomContainer[_ngcontent-%COMP%], #container[_ngcontent-%COMP%]   #zoomContainer[_ngcontent-%COMP%]   #zoom[_ngcontent-%COMP%]{width:100%;height:100%}"]}),c})()}];let T=(()=>{var i;class c{}return(i=c).\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.$C({type:i}),i.\u0275inj=t.G2t({imports:[v.iI.forChild(G),v.iI]}),c})(),E=(()=>{var i;class c{}return(i=c).\u0275fac=function(e){return new(e||i)},i.\u0275mod=t.$C({type:i}),i.\u0275inj=t.G2t({imports:[S.MD,z.YN,u.bv,T,w.Ud]}),c})()}}]);