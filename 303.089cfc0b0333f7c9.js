"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[303],{8795:(k,C,d)=>{d.d(C,{Y:()=>v});var v=function(s){return s[s.Boulder=0]="Boulder",s[s.Route=1]="Route",s}(v||{})},303:(k,C,d)=>{d.r(C),d.d(C,{ViewRouteDetailsPageModule:()=>c});var v=d(177),s=d(4341),a=d(9364),b=d(8986),S=d(467),e=d(4438),M=d(8795),A=d(3245),I=d(5332);const g=()=>[];function T(o,f){if(1&o){const n=e.RV6();e.j41(0,"ion-button",17),e.bIt("click",function(){e.eBV(n);const t=e.XpG();return e.Njj(t.openSendModal())}),e.nrm(1,"ion-icon",18),e.k0s()}}function N(o,f){if(1&o&&(e.j41(0,"ion-item")(1,"p",12),e.EFF(2,"SETTER'S"),e.k0s(),e.j41(3,"p"),e.EFF(4),e.k0s()()),2&o){const n=e.XpG();e.R7$(4),e.Lme("",null==n.route?null:n.route.SettersDifficulty," @ ",null==n.route?null:n.route.SettersAngle,"\xb0")}}function l(o,f){1&o&&e.nrm(0,"ion-icon",19)}function r(o,f){1&o&&e.nrm(0,"ion-icon",19)}function D(o,f){if(1&o&&(e.j41(0,"ion-item")(1,"div",22)(2,"p",23),e.EFF(3),e.k0s(),e.j41(4,"div",24)(5,"p",25),e.EFF(6),e.k0s(),e.j41(7,"p",26),e.EFF(8),e.k0s(),e.j41(9,"p",27),e.DNE(10,r,1,0,"ion-icon",14),e.k0s()()()()),2&o){const n=f.$implicit;e.R7$(3),e.JRh(n.Comment),e.R7$(3),e.JRh(n.User),e.R7$(2),e.JRh(n.Date),e.R7$(2),e.Y8G("ngForOf",e.lJ4(4,g).constructor(n.Rating))}}function _(o,f){if(1&o&&(e.j41(0,"ion-list",20)(1,"ion-list-header")(2,"ion-label"),e.EFF(3,"SENDS"),e.k0s()(),e.DNE(4,D,11,5,"ion-item",21),e.k0s()),2&o){const n=e.XpG();e.R7$(4),e.Y8G("ngForOf",null==n.route?null:n.route.Sends)}}function p(o,f){if(1&o&&(e.j41(0,"ion-select-option",36),e.EFF(1),e.k0s()),2&o){const n=f.$implicit;e.FS9("value",n.key),e.R7$(),e.JRh(n.value)}}function y(o,f){if(1&o&&(e.j41(0,"ion-select-option",36),e.EFF(1),e.k0s()),2&o){const n=f.index;e.FS9("value",n),e.R7$(),e.JRh(n)}}function u(o,f){if(1&o){const n=e.RV6();e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",28)(3,"ion-button",29),e.bIt("click",function(){e.eBV(n);const t=e.XpG();return e.Njj(t.close())}),e.EFF(4,"CLOSE"),e.k0s()(),e.j41(5,"ion-buttons",1)(6,"ion-button",30),e.bIt("click",function(){e.eBV(n);const t=e.XpG();return e.Njj(t.send())}),e.EFF(7,"SEND"),e.k0s()(),e.j41(8,"ion-title"),e.EFF(9,"SEND"),e.k0s()()(),e.j41(10,"ion-content",31)(11,"ion-list")(12,"ion-item")(13,"ion-textarea",32),e.mxI("ngModelChange",function(t){e.eBV(n);const h=e.XpG();return e.DH7(h.comment,t)||(h.comment=t),e.Njj(t)}),e.k0s()(),e.j41(14,"ion-item")(15,"ion-select",33),e.mxI("ngModelChange",function(t){e.eBV(n);const h=e.XpG();return e.DH7(h.sendDifficulty,t)||(h.sendDifficulty=t),e.Njj(t)}),e.DNE(16,p,2,2,"ion-select-option",34),e.nI1(17,"keyvalue"),e.k0s()(),e.j41(18,"ion-item")(19,"ion-select",35),e.mxI("ngModelChange",function(t){e.eBV(n);const h=e.XpG();return e.DH7(h.rating,t)||(h.rating=t),e.Njj(t)}),e.DNE(20,y,2,2,"ion-select-option",34),e.k0s()()()()}if(2&o){const n=e.XpG();e.R7$(6),e.Y8G("strong",!0),e.R7$(7),e.R50("ngModel",n.comment),e.R7$(2),e.R50("ngModel",n.sendDifficulty),e.R7$(),e.Y8G("ngForOf",e.bMT(17,6,n.difficulties)),e.R7$(3),e.R50("ngModel",n.rating),e.R7$(),e.Y8G("ngForOf",e.lJ4(8,g).constructor(6))}}const R=[{path:"",component:(()=>{var o;class f{constructor(i,t,h){this.routeService=i,this.router=t,this.auth=h,this.user=null,this.activatedRoute=(0,e.WQX)(b.nX),this.isSendModalOpen=!1,this.difficulties=new Map}ngOnInit(){var i=this;return(0,S.A)(function*(){i.auth.user.subscribe(h=>{i.user=h}),i.id=i.activatedRoute.snapshot.paramMap.get("id");const t=yield i.routeService.getById(i.id);i.difficulties.clear(),(null==t?void 0:t.RouteType)==M.Y.Boulder?i.difficulties=i.routeService.boulderDifficulty:(null==t?void 0:t.RouteType)==M.Y.Route&&(i.difficulties=i.routeService.routeDifficulty),i.sendDifficulty=null==t?void 0:t.DifficultyNumber,t?i.route=t:i.router.navigateByUrl("/not-found",{replaceUrl:!0})})()}openSendModal(){var i=this;return(0,S.A)(function*(){i.isSendModalOpen=!0})()}send(){var i=this;return(0,S.A)(function*(){yield i.modal.dismiss("ok","send")})()}close(){var i=this;return(0,S.A)(function*(){yield i.modal.dismiss(null,"close")})()}onWillDismiss(i){var t=this;return(0,S.A)(function*(){var w;"send"===i.detail.role&&(yield t.routeService.logSend(null===(w=t.route)||void 0===w?void 0:w.Id,t.comment,t.sendDifficulty,t.rating)),t.isSendModalOpen=!1})()}}return(o=f).\u0275fac=function(i){return new(i||o)(e.rXU(A.v),e.rXU(b.Ix),e.rXU(I.u))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-view-route-details"]],viewQuery:function(i,t){if(1&i&&e.GBs(a.Sb,5),2&i){let h;e.mGM(h=e.lsd())&&(t.modal=h.first)}},inputs:{user:"user"},outputs:{difficulties:"difficulties"},decls:47,vars:16,consts:[[3,"translucent"],["slot","primary"],["fill","solid",3,"click",4,"ngIf"],["fill","solid","routerLink",".."],["name","map-outline"],["slot","start"],["fill","solid","routerLink","/routes"],["name","chevron-back-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],[1,"item-header"],[4,"ngIf"],["name","star-outline",4,"ngFor","ngForOf"],["lines","full","inset","true",4,"ngIf"],[3,"willDismiss","isOpen"],["fill","solid",3,"click"],["name","checkmark-outline"],["name","star-outline"],["lines","full","inset","true"],[4,"ngFor","ngForOf"],[1,"send-item"],[1,"send-comment"],[1,"send-meta"],[1,"send-user"],[1,"send-date"],[1,"send-rating"],["slot","secondary"],[3,"click"],[3,"click","strong"],[1,"ion-padding"],["label","Comment","placeholder","Enter send comment",3,"ngModelChange","ngModel"],["label","Difficulty","placeholder","Select route difficulty","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["label","Rating","placeholder","Select route rating","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],[3,"value"]],template:function(i,t){1&i&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e.DNE(3,T,2,0,"ion-button",2),e.k0s(),e.j41(4,"ion-buttons",1)(5,"ion-button",3),e.nrm(6,"ion-icon",4),e.k0s()(),e.j41(7,"ion-title"),e.EFF(8),e.k0s(),e.j41(9,"ion-buttons",5)(10,"ion-button",6),e.nrm(11,"ion-icon",7),e.k0s()()()(),e.j41(12,"ion-content",8)(13,"ion-header",9)(14,"ion-toolbar")(15,"ion-title",10),e.EFF(16,"view-route-details"),e.k0s()()(),e.j41(17,"div",11)(18,"ion-list")(19,"ion-item")(20,"p",12),e.EFF(21,"DESCRIPTION"),e.k0s(),e.j41(22,"p"),e.EFF(23),e.k0s()(),e.j41(24,"ion-item")(25,"p",12),e.EFF(26,"BY"),e.k0s(),e.j41(27,"p"),e.EFF(28),e.k0s()(),e.j41(29,"ion-item")(30,"p",12),e.EFF(31,"DIFFICULTY"),e.k0s(),e.j41(32,"p"),e.EFF(33),e.k0s()(),e.j41(34,"ion-item")(35,"p",12),e.EFF(36,"STYLE"),e.k0s(),e.j41(37,"p"),e.EFF(38),e.k0s()(),e.DNE(39,N,5,2,"ion-item",13),e.j41(40,"ion-item")(41,"p",12),e.EFF(42,"RATING"),e.k0s(),e.DNE(43,l,1,0,"ion-icon",14),e.k0s()(),e.DNE(44,_,5,1,"ion-list",15),e.k0s(),e.j41(45,"ion-modal",16),e.bIt("willDismiss",function(w){return t.onWillDismiss(w)}),e.DNE(46,u,21,9,"ng-template"),e.k0s()()),2&i&&(e.Y8G("translucent",!0),e.R7$(3),e.Y8G("ngIf",t.user),e.R7$(5),e.E5c("",null==t.route?null:t.route.Name," [ ",null==t.route?null:t.route.Difficulty," @ ",null==t.route?null:t.route.Angle,"\xb0 ] "),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(11),e.JRh(null==t.route?null:t.route.Description),e.R7$(5),e.JRh(null==t.route?null:t.route.Autor),e.R7$(5),e.JRh(null==t.route?null:t.route.Difficulty),e.R7$(5),e.Lme("",null==t.route?null:t.route.Type," / ",null==t.route?null:t.route.Style,""),e.R7$(),e.Y8G("ngIf",(null==t.route?null:t.route.SettersAngle)!==(null==t.route?null:t.route.Angle)),e.R7$(4),e.Y8G("ngForOf",e.lJ4(15,g).constructor(null==t.route?null:t.route.Rating)),e.R7$(),e.Y8G("ngIf",null==t.route?null:t.route.Sends),e.R7$(),e.Y8G("isOpen",t.isSendModalOpen))},dependencies:[v.Sq,v.bT,s.BC,s.YS,s.vS,a.Jm,a.QW,a.W9,a.eU,a.iq,a.uz,a.he,a.nf,a.AF,a.Nm,a.Ip,a.nc,a.BC,a.ai,a.Sb,a.Je,a.Gw,a.N7,b.Wk,v.lG],styles:[".item-header[_ngcontent-%COMP%]{font-size:.8em;font-weight:lighter;width:10em}.send-item[_ngcontent-%COMP%]{width:100%}.send-comment[_ngcontent-%COMP%]{white-space:pre}.send-user[_ngcontent-%COMP%]{font-size:.9em;float:left;margin-right:1em}.send-date[_ngcontent-%COMP%]{font-size:.7em;float:left;margin-right:1em;margin-top:1.3em}.send-rating[_ngcontent-%COMP%]{font-size:.8em;float:left;margin-right:1em;margin-top:1.2em}.send-meta[_ngcontent-%COMP%]{float:right}"]}),f})()}];let m=(()=>{var o;class f{}return(o=f).\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[b.iI.forChild(R),b.iI]}),f})(),c=(()=>{var o;class f{}return(o=f).\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[v.MD,s.YN,a.bv,m]}),f})()},3245:(k,C,d)=>{d.d(C,{v:()=>I});var v=d(467),s=d(1562),a=d(8795),b=function(g){return g[g.FeetFollow=0]="FeetFollow",g[g.OpenFeet=1]="OpenFeet",g[g.NoMatches=2]="NoMatches",g[g.NoFeet=4]="NoFeet",g}(b||{}),S=d(5312),e=d(4438),M=d(2420),A=d(5332);let I=(()=>{var g;class T{constructor(l,r){this.appwrite=l,this.auth=r,this._routeCollectionId=S.c.AppWrite.Collections.Routes,this._logCollectionId=S.c.AppWrite.Collections.Logs,this.routeDifficulty=new Map,this.boulderDifficulty=new Map,this.routeStyles=new Map,this.routeTypes=new Map,this.holdBuffer=[],this.filter={RouteType:void 0,RouteStyle:void 0,MinDifficulty:void 0,MaxDifficulty:void 0,Angle:void 0,ExcludeMyAscends:void 0},this.routeTypes.set(a.Y.Boulder,"Boulder"),this.routeTypes.set(a.Y.Route,"Route"),this.routeStyles.set(b.FeetFollow,"Feet follow hands"),this.routeStyles.set(b.OpenFeet,"Open feet"),this.routeStyles.set(b.NoMatches,"No matching"),this.routeStyles.set(b.NoFeet,"No feet / Campusing"),this.boulderDifficulty.set(20,"3"),this.boulderDifficulty.set(25,"4-"),this.boulderDifficulty.set(30,"4"),this.boulderDifficulty.set(35,"4+"),this.boulderDifficulty.set(40,"5-"),this.boulderDifficulty.set(45,"5"),this.boulderDifficulty.set(50,"5+"),this.boulderDifficulty.set(55,"6A"),this.boulderDifficulty.set(60,"6A+"),this.boulderDifficulty.set(65,"6B"),this.boulderDifficulty.set(70,"6B+"),this.boulderDifficulty.set(75,"6C"),this.boulderDifficulty.set(80,"6C+"),this.boulderDifficulty.set(85,"7A"),this.boulderDifficulty.set(90,"7A+"),this.boulderDifficulty.set(95,"7B"),this.boulderDifficulty.set(100,"7B+"),this.boulderDifficulty.set(105,"7C"),this.boulderDifficulty.set(110,"7C+"),this.boulderDifficulty.set(115,"8A"),this.boulderDifficulty.set(120,"8A+"),this.boulderDifficulty.set(125,"8B"),this.boulderDifficulty.set(130,"8B+"),this.boulderDifficulty.set(135,"8C"),this.boulderDifficulty.set(140,"8C+"),this.boulderDifficulty.set(145,"9A"),this.routeDifficulty.set(20,"5b+"),this.routeDifficulty.set(25,"5c"),this.routeDifficulty.set(30,"5c+"),this.routeDifficulty.set(35,"6a"),this.routeDifficulty.set(40,"6a+"),this.routeDifficulty.set(45,"6b"),this.routeDifficulty.set(50,"6b+"),this.routeDifficulty.set(55,"6c"),this.routeDifficulty.set(60,"6c+"),this.routeDifficulty.set(65,"7a"),this.routeDifficulty.set(70,"7a+"),this.routeDifficulty.set(75,"7b"),this.routeDifficulty.set(80,"7b+"),this.routeDifficulty.set(85,"7c"),this.routeDifficulty.set(90,"7c+"),this.routeDifficulty.set(95,"8a"),this.routeDifficulty.set(100,"8a+"),this.routeDifficulty.set(105,"8b"),this.routeDifficulty.set(110,"8b+"),this.routeDifficulty.set(115,"8c"),this.routeDifficulty.set(120,"8c+"),this.routeDifficulty.set(125,"9a"),this.routeDifficulty.set(130,"9a+"),this.routeDifficulty.set(135,"9b"),this.routeDifficulty.set(140,"9b+"),this.routeDifficulty.set(145,"9c"),this._db=new s.Lv(this.appwrite.client)}getAll(){var l=this;return(0,v.A)(function*(){let r=[],D=[];D.push(s.XK.select(["$id","Name","Difficulty","Angle","Type"])),D.push(s.XK.limit(1e5)),D.push(s.XK.orderAsc("Difficulty")),l.filter.Angle&&D.push(s.XK.equal("Angle",[l.filter.Angle])),l.filter.RouteType&&D.push(s.XK.equal("Type",[l.filter.RouteType])),l.filter.RouteStyle&&D.push(s.XK.equal("Style",[l.filter.RouteStyle])),l.filter.MinDifficulty&&D.push(s.XK.greaterThanEqual("Difficulty",Number(l.filter.MinDifficulty))),l.filter.MaxDifficulty&&D.push(s.XK.lessThanEqual("Difficulty",Number(l.filter.MaxDifficulty))),l.filter.SetBy&&D.push(s.XK.search("CreatedByName",l.filter.SetBy));const _=yield l._db.listDocuments(l.appwrite.DatabaseId,l._routeCollectionId,D);let p=[];var y,u;l.filter.ExcludeMyAscends&&(p=(yield l._db.listDocuments(l.appwrite.DatabaseId,l._logCollectionId,[s.XK.select(["Route.$id"]),s.XK.equal("CreatedById",null!==(y=null===(u=l.auth.user.value)||void 0===u?void 0:u.id)&&void 0!==y?y:"invalid-user-id")])).documents.map(function(m){return m.Route.$id}));for(let R of _.documents){var F;if(l.filter.ExcludeMyAscends&&p.includes(R.$id))continue;let m=l.boulderDifficulty.get(R.Difficulty);R.Type===a.Y.Route&&(m=l.routeDifficulty.get(R.Difficulty)),r.push({Id:R.$id,Name:R.Name,Angle:R.Angle,Difficulty:null!==(F=m)&&void 0!==F?F:"unknown",Type:R.Type})}return r})()}getById(l){var r=this;return(0,v.A)(function*(){var D,_,p,y;const u=yield r._db.getDocument(r.appwrite.DatabaseId,r._routeCollectionId,l),F=yield r._db.listDocuments(r.appwrite.DatabaseId,r._logCollectionId,[s.XK.equal("Route",[u.$id]),s.XK.orderAsc("$createdAt")]);let R=0,m=0;const c=[];for(const i of F.documents){m+=i.Rating;let t=0==u.Type?r.boulderDifficulty.get(u.Difficulty):r.routeDifficulty.get(u.Difficulty);t||(t="unknown"),c.push({Date:new Date(i.$createdAt).toDateString(),Difficulty:t,Rating:i.Rating,Comment:i.Comment,User:i.CreatedByName})}F.total>0&&(R=m/F.total);let o=[];for(let i of JSON.parse(u.JsonHolds))o.push({Type:i[2],Center:{X:i[0][0],Y:i[0][1]}});let f=r.boulderDifficulty.get(u.Difficulty),n=r.boulderDifficulty.get(u.SettersDifficulty);return u.Type===a.Y.Route&&(f=r.routeDifficulty.get(u.Difficulty),n=r.routeDifficulty.get(u.SettersDifficulty)),{Id:u.$id,Name:u.Name,Description:u.Description,Angle:u.Angle,Difficulty:null!==(D=f)&&void 0!==D?D:"unknown",DifficultyNumber:u.Difficulty,SettersAngle:u.SettersAngle,SettersDifficulty:null!==(_=n)&&void 0!==_?_:"unknown",Autor:u.CreatedByName,Holds:o,Style:null!==(p=r.routeStyles.get(u.Style))&&void 0!==p?p:"Unknown",Type:null!==(y=r.routeTypes.get(u.Type))&&void 0!==y?y:"Unknown",RouteType:u.Type,Rating:R,Sends:c}})()}create(l,r,D,_,p,y,u,F,R=[]){var m=this;return(0,v.A)(function*(){const c=yield m.auth.user.value;let o=[];for(let n of F)o.push([[n.TemplateHold.Center.X,n.TemplateHold.Center.Y],n.TemplateHold.Radius,n.Type]);const f=yield m._db.createDocument(m.appwrite.DatabaseId,m._routeCollectionId,s.ID.unique(),{Name:D,Description:_,Angle:y,Difficulty:p,CreatedById:null==c?void 0:c.id,CreatedByName:null==c?void 0:c.name,Type:r,Style:u,FAById:null==c?void 0:c.id,FAByName:null==c?void 0:c.name,JsonHolds:JSON.stringify(o),SettersAngle:y,SettersDifficulty:p,Wall:l});for(const n of R){const i=n-y;let t=Number(p)+Number(i);0!=i&&(t=Math.min(t,145),t=Math.max(t,0),yield m._db.createDocument(m.appwrite.DatabaseId,m._routeCollectionId,s.ID.unique(),{Name:D,Description:_,Angle:n,Difficulty:t,CreatedById:null==c?void 0:c.id,CreatedByName:null==c?void 0:c.name,Type:r,Style:u,JsonHolds:JSON.stringify(o),SettersAngle:y,SettersDifficulty:p,ParentId:f.$id,Wall:l}))}return m.lastRouteAngle=y,m.lastRouteDifficulty=p,m.lastRouteStyle=u,m.lastRouteType=r,f.$id})()}logSend(l,r,D,_){var p=this;return(0,v.A)(function*(){const y=yield p.auth.user.value;yield p._db.createDocument(p.appwrite.DatabaseId,p._logCollectionId,s.ID.unique(),{Route:l,Comment:r,Rating:_,Difficulty:D,CreatedById:null==y?void 0:y.id,CreatedByName:null==y?void 0:y.name})})()}}return(g=T).\u0275fac=function(l){return new(l||g)(e.KVO(M.k),e.KVO(A.u))},g.\u0275prov=e.jDH({token:g,factory:g.\u0275fac,providedIn:"root"}),T})()}}]);