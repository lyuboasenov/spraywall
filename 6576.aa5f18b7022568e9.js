"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6576],{6576:(A,h,u)=>{u.r(h),u.d(h,{ListRoutesPageModule:()=>E});var d=u(177),_=u(4341),s=u(9364),m=u(8986),a=u(467),e=u(4438),R=u(3245),M=u(4943),v=u(5332);const S=n=>[n];function k(n,r){if(1&n&&(e.j41(0,"ion-item",13)(1,"ion-label"),e.EFF(2),e.k0s(),e.j41(3,"ion-note"),e.EFF(4),e.k0s()()),2&n){const o=r.$implicit;e.Y8G("button",!0)("routerLink",e.eq3(5,S,"/routes/"+o.Id)),e.R7$(2),e.JRh(o.Name),e.R7$(2),e.Lme("",o.Difficulty," @ ",o.Angle,"\xb0")}}function x(n,r){1&n&&(e.j41(0,"div",14)(1,"ion-fab")(2,"ion-fab-button",15),e.nrm(3,"ion-icon",16),e.k0s()()())}function D(n,r){if(1&n&&(e.j41(0,"ion-select-option",29),e.EFF(1),e.k0s()),2&n){const o=r.$implicit;e.Y8G("value",o.key),e.R7$(),e.JRh(o.value)}}function L(n,r){if(1&n&&(e.j41(0,"ion-select-option",29),e.EFF(1),e.k0s()),2&n){const o=r.$implicit;e.FS9("value",o.key),e.R7$(),e.JRh(o.value)}}function P(n,r){if(1&n&&(e.j41(0,"ion-select-option",29),e.EFF(1),e.k0s()),2&n){const o=r.$implicit;e.FS9("value",o.key),e.R7$(),e.JRh(o.value)}}function j(n,r){if(1&n&&(e.j41(0,"ion-select-option",29),e.EFF(1),e.k0s()),2&n){const o=r.$implicit;e.FS9("value",o),e.R7$(),e.SpI("",o,"\xb0")}}function T(n,r){if(1&n){const o=e.RV6();e.j41(0,"ion-item")(1,"ion-select",30),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG(2);return e.DH7(l.angle,t)||(l.angle=t),e.Njj(t)}),e.DNE(2,j,2,2,"ion-select-option",22),e.k0s()()}if(2&n){const o=e.XpG(2);e.R7$(),e.R50("ngModel",o.angle),e.R7$(),e.Y8G("ngForOf",null==o.template?null:o.template.Angles)}}function C(n,r){if(1&n&&(e.j41(0,"ion-select-option",29),e.EFF(1),e.k0s()),2&n){const o=r.$implicit;e.Y8G("value",o.key),e.R7$(),e.JRh(o.value)}}function b(n,r){if(1&n){const o=e.RV6();e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",17)(3,"ion-button",18),e.bIt("click",function(){e.eBV(o);const t=e.XpG();return e.Njj(t.clear())}),e.EFF(4,"CLEAR"),e.k0s()(),e.j41(5,"ion-buttons",1)(6,"ion-button",19),e.bIt("click",function(){e.eBV(o);const t=e.XpG();return e.Njj(t.close())}),e.EFF(7,"CLOSE"),e.k0s()(),e.j41(8,"ion-title"),e.EFF(9,"FILTER"),e.k0s()()(),e.j41(10,"ion-content",20)(11,"ion-list")(12,"ion-item")(13,"ion-select",21),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG();return e.DH7(l.routeType,t)||(l.routeType=t),e.Njj(t)}),e.DNE(14,D,2,2,"ion-select-option",22),e.nI1(15,"keyvalue"),e.k0s()(),e.j41(16,"ion-item")(17,"ion-select",23),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG();return e.DH7(l.minDifficulty,t)||(l.minDifficulty=t),e.Njj(t)}),e.DNE(18,L,2,2,"ion-select-option",22),e.nI1(19,"keyvalue"),e.k0s()(),e.j41(20,"ion-item")(21,"ion-select",24),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG();return e.DH7(l.maxDifficulty,t)||(l.maxDifficulty=t),e.Njj(t)}),e.DNE(22,P,2,2,"ion-select-option",22),e.nI1(23,"keyvalue"),e.k0s()(),e.DNE(24,T,3,2,"ion-item",25),e.j41(25,"ion-item")(26,"ion-select",26),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG();return e.DH7(l.routeStyle,t)||(l.routeStyle=t),e.Njj(t)}),e.DNE(27,C,2,2,"ion-select-option",22),e.nI1(28,"keyvalue"),e.k0s()(),e.j41(29,"ion-item")(30,"ion-input",27),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG();return e.DH7(l.setBy,t)||(l.setBy=t),e.Njj(t)}),e.k0s()(),e.j41(31,"ion-item")(32,"ion-checkbox",28),e.mxI("ngModelChange",function(t){e.eBV(o);const l=e.XpG();return e.DH7(l.excludeMyAscends,t)||(l.excludeMyAscends=t),e.Njj(t)}),e.k0s()()()()}if(2&n){let o;const i=e.XpG();e.R7$(6),e.Y8G("strong",!0),e.R7$(7),e.R50("ngModel",i.routeType),e.R7$(),e.Y8G("ngForOf",e.bMT(15,12,i.routeTypes)),e.R7$(3),e.R50("ngModel",i.minDifficulty),e.R7$(),e.Y8G("ngForOf",e.bMT(19,14,i.difficulties)),e.R7$(3),e.R50("ngModel",i.maxDifficulty),e.R7$(),e.Y8G("ngForOf",e.bMT(23,16,i.difficulties)),e.R7$(2),e.Y8G("ngIf",(null!==(o=null==i.template||null==i.template.Angles?null:i.template.Angles.length)&&void 0!==o?o:0)>1),e.R7$(2),e.R50("ngModel",i.routeStyle),e.R7$(),e.Y8G("ngForOf",e.bMT(28,18,i.routeStyles)),e.R7$(3),e.R50("ngModel",i.setBy),e.R7$(2),e.R50("ngModel",i.excludeMyAscends)}}const F=[{path:"",component:(()=>{var n;class r{constructor(i,t,l,g){var c=this;this.routeService=i,this.wallTemplateService=t,this.auth=l,this.loadingCtrl=g,this.difficulties=new Map,this.user=null,this.routes=[],this.template=null,this.routeTypes=this.routeService.routeTypes,this.routeStyles=this.routeService.routeStyles,this.routeService.getAll().then(f=>{navigator.locks.request("dismiss-loading",function(){var p=(0,a.A)(function*(y){c.routes=f,c.template&&c.loading&&c.loading.dismiss()});return function(y){return p.apply(this,arguments)}}())}),this.wallTemplateService.getTemplate().then(f=>{navigator.locks.request("dismiss-loading",function(){var p=(0,a.A)(function*(y){c.template=f,c.routes&&c.loading&&c.loading.dismiss()});return function(y){return p.apply(this,arguments)}}())}),this.auth.user.subscribe(f=>{this.user=f})}ngOnInit(){var i=this;return(0,a.A)(function*(){yield i.showLoading(),i.difficulties.clear();for(let[l,g]of i.routeService.boulderDifficulty){var t;const c=null!==(t=i.routeService.routeDifficulty.get(l))&&void 0!==t?t:"unknown";i.difficulties.set(l,g+"/"+c)}i.routeType=i.routeService.filter.RouteType,i.routeStyle=i.routeService.filter.RouteStyle,i.minDifficulty=i.routeService.filter.MinDifficulty,i.maxDifficulty=i.maxDifficulty,i.angle=i.routeService.filter.Angle,i.setBy=i.routeService.filter.SetBy,i.excludeMyAscends=i.routeService.filter.ExcludeMyAscends})()}showLoading(){var i=this;return(0,a.A)(function*(){navigator.locks.request("dismiss-loading",function(){var t=(0,a.A)(function*(l){!i.routes&&!i.template&&(i.loading=yield i.loadingCtrl.create({message:"Loading routes..."}),i.loading.present())});return function(l){return t.apply(this,arguments)}}())})()}clear(){this.modal.dismiss(null,"clear")}close(){this.modal.dismiss("ok","close")}onWillDismiss(i){var t=this;return(0,a.A)(function*(){"close"===i.detail.role?(t.routeService.filter.RouteType=t.routeType,t.routeService.filter.RouteStyle=t.routeStyle,t.routeService.filter.MinDifficulty=t.minDifficulty,t.routeService.filter.MaxDifficulty=t.maxDifficulty,t.routeService.filter.Angle=t.angle,t.routeService.filter.SetBy=t.setBy,t.routeService.filter.ExcludeMyAscends=t.excludeMyAscends,t.routes=yield t.routeService.getAll()):(t.routeService.filter.RouteType=void 0,t.routeService.filter.RouteStyle=void 0,t.routeService.filter.MinDifficulty=void 0,t.routeService.filter.MaxDifficulty=void 0,t.routeService.filter.Angle=void 0,t.routeService.filter.SetBy=void 0,t.routeService.filter.ExcludeMyAscends=void 0,t.routes=yield t.routeService.getAll())})()}}return(n=r).\u0275fac=function(i){return new(i||n)(e.rXU(R.v),e.rXU(M.s),e.rXU(v.u),e.rXU(s.Xi))},n.\u0275cmp=e.VBU({type:n,selectors:[["app-list-routes"]],viewQuery:function(i,t){if(1&i&&e.GBs(s.Sb,5),2&i){let l;e.mGM(l=e.lsd())&&(t.modal=l.first)}},inputs:{user:"user"},outputs:{routeStyles:"routeStyles",routeTypes:"routeTypes",difficulties:"difficulties"},decls:18,vars:4,consts:[[3,"translucent"],["slot","primary"],["fill","solid","id","open-filter"],["name","filter-circle-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],[1,"capitalize"],[1,"routes"],["routerDirection","root",3,"button","routerLink",4,"ngFor","ngForOf"],["class","fab-add",4,"ngIf"],["trigger","open-filter",3,"willDismiss"],["routerDirection","root",3,"button","routerLink"],[1,"fab-add"],["routerDirection","root","routerLink","/routes/add"],["name","add"],["slot","secondary"],[3,"click"],[3,"click","strong"],[1,"ion-padding"],["placeholder","Select route type","interface","action-sheet",3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["label","Min Difficulty","placeholder","Select minimum route difficulty","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],["label","Max Difficulty","placeholder","Select maximum route difficulty","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],[4,"ngIf"],["placeholder","Select route type","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],["label","Set by","placeholder","Set by ...",3,"ngModelChange","ngModel"],["label","Exclude my ascends","placeholder","Exclude my ascends",3,"ngModelChange","ngModel"],[3,"value"],["label","Angle","placeholder","Select board angle","interface","action-sheet","required","true",3,"ngModelChange","ngModel"]],template:function(i,t){if(1&i&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),e.nrm(4,"ion-icon",3),e.k0s()(),e.j41(5,"ion-title"),e.EFF(6,"ROUTES"),e.k0s()()(),e.j41(7,"ion-content",4)(8,"ion-header",5)(9,"ion-toolbar"),e.nrm(10,"ion-title",6),e.k0s()(),e.j41(11,"div",7),e.nrm(12,"strong",8),e.j41(13,"ion-list",9),e.DNE(14,k,5,7,"ion-item",10),e.k0s(),e.DNE(15,x,4,0,"div",11),e.k0s(),e.j41(16,"ion-modal",12),e.bIt("willDismiss",function(g){return t.onWillDismiss(g)}),e.DNE(17,b,33,20,"ng-template"),e.k0s()()),2&i){let l;e.Y8G("translucent",!0),e.R7$(7),e.Y8G("fullscreen",!0),e.R7$(7),e.Y8G("ngForOf",t.routes),e.R7$(),e.Y8G("ngIf",null!==(l=null==t.user||null==t.user.labels?null:t.user.labels.includes("routesetter"))&&void 0!==l&&l)}},dependencies:[d.Sq,d.bT,_.BC,_.YS,_.vS,s.Jm,s.QW,s.eY,s.W9,s.Q8,s.YW,s.eU,s.iq,s.$w,s.uz,s.he,s.nf,s.JI,s.Nm,s.Ip,s.BC,s.ai,s.Sb,s.hB,s.Je,s.Gw,s.N7,m.Wk,d.lG],styles:["ion-menu-button[_ngcontent-%COMP%]{color:var(--ion-color-primary)}#container[_ngcontent-%COMP%]{text-align:center}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}ion-note[_ngcontent-%COMP%]{color:var(--ion-color-primary);vertical-align:middle;font-size:.9em;font-weight:300;margin-top:1em}div[_ngcontent-%COMP%]   .fab-add[_ngcontent-%COMP%]{margin-right:auto;margin-left:auto;margin-top:-1em}"]}),r})()}];let G=(()=>{var n;class r{}return(n=r).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[m.iI.forChild(F),m.iI]}),r})(),E=(()=>{var n;class r{}return(n=r).\u0275fac=function(i){return new(i||n)},n.\u0275mod=e.$C({type:n}),n.\u0275inj=e.G2t({imports:[d.MD,_.YN,s.bv,G]}),r})()}}]);