"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9520],{9520:(T,h,r)=>{r.r(h),r.d(h,{ViewRoutePageModule:()=>H});var f=r(177),p=r(4341),u=r(9364),g=r(8986),v=r(467),e=r(4438),M=r(2167),P=r(4943),R=r(2542);const z=["canvas"],w=["zoom"],y=["zoomContainer"];function O(o,l){1&o&&e.nrm(0,"ion-icon",17)}const V=[{path:"",component:(()=>{var o;class l{constructor(n,t,i){this.routeService=n,this.wallTemplateService=t,this.router=i,this.routes=[],this.activatedRoute=(0,e.WQX)(g.nX),this._discoveredHolds=[],this.schemaSize=500,this.rating=new Array(0)}ngOnInit(){var n=this;return(0,v.A)(function*(){n.id=n.activatedRoute.snapshot.paramMap.get("id");const t=yield n.routeService.getById(n.id),i=n.canvas.nativeElement;yield n.wallTemplateService.drawTemplateBackdrop(i),t?(n.route=t,yield n.markHolds(),yield n.zoomToRoute()):n.router.navigateByUrl("not-found",{replaceUrl:!0})})()}zoomToRoute(){var n=this;return(0,v.A)(function*(){if(n._discoveredHolds&&n._discoveredHolds.length>0){let t=6e4,i=0,m=6e4,s=0;const d=HTMLDivElement=n.zoomContainer.nativeElement,C=n.canvas.nativeElement,G=C.width,X=C.height;for(const a of n._discoveredHolds)a&&(t>a.Center.X-a.Radius&&(t=Math.max(0,a.Center.X-a.Radius)),i<a.Center.X+a.Radius&&(i=Math.min(G,a.Center.X+a.Radius)),m>a.Center.Y-a.Radius&&(m=Math.max(0,a.Center.Y-a.Radius)),s<a.Center.Y+a.Radius&&(s=Math.min(X,a.Center.Y+a.Radius)));const S=Math.min(d.clientWidth/(i-t),d.clientHeight/(s-m));n.zoom.zoomControlScale=S,n.zoom.toggleZoom()}})()}markHolds(){var n=this;return(0,v.A)(function*(){for(const s of null!==(t=null===(i=n.route)||void 0===i?void 0:i.Holds)&&void 0!==t?t:[]){var t,i;const d=yield n.wallTemplateService.findHold(s.Center.X,s.Center.Y);d&&(s.Contour=d.Contour,s.MinRect=d.MinRect,s.Radius=d.Radius,n._discoveredHolds.push(s))}n.wallTemplateService.markHolds(n._discoveredHolds,null,n.canvas.nativeElement)})()}}return(o=l).\u0275fac=function(n){return new(n||o)(e.rXU(M.v),e.rXU(P.s),e.rXU(g.Ix))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-view-route"]],viewQuery:function(n,t){if(1&n&&(e.GBs(z,7),e.GBs(w,7),e.GBs(y,7)),2&n){let i;e.mGM(i=e.lsd())&&(t.canvas=i.first),e.mGM(i=e.lsd())&&(t.zoom=i.first),e.mGM(i=e.lsd())&&(t.zoomContainer=i.first)}},decls:28,vars:14,consts:[["zoomContainer",""],["zoom",""],["canvas",""],[3,"translucent"],["slot","start"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],["id","zoomContainer"],[3,"limit-zoom"],["width","1500","height","700"],["id","info"],["id","rating"],["name","star-outline",4,"ngFor","ngForOf"],[1,"description"],[1,"author"],["name","star-outline"]],template:function(n,t){1&n&&(e.j41(0,"ion-header",3)(1,"ion-toolbar")(2,"ion-buttons",4),e.nrm(3,"ion-menu-button"),e.k0s(),e.j41(4,"ion-title"),e.EFF(5),e.k0s()()(),e.j41(6,"ion-content",5)(7,"ion-header",6)(8,"ion-toolbar")(9,"ion-title",7),e.EFF(10),e.k0s()()(),e.j41(11,"div",8)(12,"div",9,0)(14,"pinch-zoom",10,1)(16,"canvas",11,2),e.EFF(18," Not supported on this browser "),e.k0s()()(),e.j41(19,"div",12)(20,"div",13),e.DNE(21,O,1,0,"ion-icon",14),e.k0s(),e.j41(22,"p")(23,"span",15),e.EFF(24),e.k0s()(),e.j41(25,"p")(26,"span",16),e.EFF(27),e.k0s()()()()()),2&n&&(e.Y8G("translucent",!0),e.R7$(5),e.E5c("",null==t.route?null:t.route.Name," [ ",null==t.route?null:t.route.Difficulty," @ ",null==t.route?null:t.route.Angle,"\xb0 ] "),e.R7$(),e.Y8G("fullscreen",!0),e.R7$(4),e.JRh(null==t.route?null:t.route.Name),e.R7$(4),e.xc7("width",t.schemaSize)("height",t.schemaSize),e.Y8G("limit-zoom",20),e.R7$(7),e.Y8G("ngForOf",t.rating),e.R7$(3),e.JRh(null==t.route?null:t.route.Description),e.R7$(3),e.SpI("by ",null==t.route?null:t.route.Autor,""))},dependencies:[f.Sq,u.QW,u.W9,u.eU,u.iq,u.MC,u.BC,u.ai,R.Hg],styles:["ion-menu-button[_ngcontent-%COMP%]{color:var(--ion-color-primary)}#container[_ngcontent-%COMP%]{text-align:center}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}#container[_ngcontent-%COMP%]   #zoomContainer[_ngcontent-%COMP%]   pinch-zoom[_ngcontent-%COMP%]{height:50em}#container[_ngcontent-%COMP%]   #rating[_ngcontent-%COMP%]{float:right}#container[_ngcontent-%COMP%]   #info[_ngcontent-%COMP%]{text-align:left;padding:1em}.author[_ngcontent-%COMP%]{font-size:.8em}"]}),l})()}];let F=(()=>{var o;class l{}return(o=l).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[g.iI.forChild(V),g.iI]}),l})(),H=(()=>{var o;class l{}return(o=l).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[f.MD,p.YN,u.bv,F,R.Ud]}),l})()}}]);