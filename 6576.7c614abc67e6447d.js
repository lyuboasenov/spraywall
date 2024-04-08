"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6576],{9480:(A,M,f)=>{f.d(M,{Y:()=>D,Z:()=>h});var D=function(n){return n[n.Boulder="Boulder"]="Boulder",n[n.Route="Route"]="Route",n}(D||{}),h=function(n){return n[n.FeetFollow="FeetFollow"]="FeetFollow",n[n.OpenFeet="OpenFeet"]="OpenFeet",n[n.NoMatches="NoMatches"]="NoMatches",n}(h||{})},7700:(A,M,f)=>{f.d(M,{S:()=>D});var D=function(h){return h[h.Hold="Hold"]="Hold",h[h.StartingHold="StartingHold"]="StartingHold",h[h.FinishingHold="FinishingHold"]="FinishingHold",h[h.FootHold="FootHold"]="FootHold",h}(D||{})},6576:(A,M,f)=>{f.r(M),f.d(M,{ListRoutesPageModule:()=>O});var D=f(177),h=f(4341),n=f(9364),T=f(8986),S=f(467),C=f(9480),e=f(4438),F=f(2167),I=f(4943),b=f(4796);const _=l=>[l];function v(l,m){if(1&l&&(e.j41(0,"ion-item",13)(1,"ion-label"),e.EFF(2),e.k0s(),e.j41(3,"ion-note"),e.EFF(4),e.k0s()()),2&l){const r=m.$implicit;e.Y8G("button",!0)("routerLink",e.eq3(5,_,"/routes/"+r.Id)),e.R7$(2),e.JRh(r.Name),e.R7$(2),e.Lme("",r.Difficulty," @ ",r.Angle,"\xb0")}}function s(l,m){1&l&&(e.j41(0,"div",14)(1,"ion-fab")(2,"ion-fab-button",15),e.nrm(3,"ion-icon",16),e.k0s()()())}function u(l,m){if(1&l&&(e.j41(0,"ion-select-option",27),e.EFF(1),e.k0s()),2&l){const r=m.$implicit;e.FS9("value",r),e.R7$(),e.JRh(r)}}function a(l,m){if(1&l&&(e.j41(0,"ion-select-option",27),e.EFF(1),e.k0s()),2&l){const r=m.$implicit;e.FS9("value",r.key),e.R7$(),e.JRh(r.value)}}function t(l,m){if(1&l&&(e.j41(0,"ion-select-option",27),e.EFF(1),e.k0s()),2&l){const r=m.$implicit;e.FS9("value",r.key),e.R7$(),e.JRh(r.value)}}function d(l,m){if(1&l&&(e.j41(0,"ion-select-option",27),e.EFF(1),e.k0s()),2&l){const r=m.$implicit;e.FS9("value",r),e.R7$(),e.SpI("",r,"\xb0")}}function c(l,m){if(1&l){const r=e.RV6();e.j41(0,"ion-item")(1,"ion-select",28),e.mxI("ngModelChange",function(i){e.eBV(r);const g=e.XpG(2);return e.DH7(g.angle,i)||(g.angle=i),e.Njj(i)}),e.DNE(2,d,2,2,"ion-select-option",22),e.k0s()()}if(2&l){const r=e.XpG(2);e.R7$(),e.R50("ngModel",r.angle),e.R7$(),e.Y8G("ngForOf",null==r.template?null:r.template.Angles)}}function p(l,m){if(1&l&&(e.j41(0,"ion-select-option",27),e.EFF(1),e.k0s()),2&l){const r=m.$implicit;e.FS9("value",r),e.R7$(),e.JRh(r)}}function y(l,m){if(1&l){const r=e.RV6();e.j41(0,"ion-header")(1,"ion-toolbar")(2,"ion-buttons",17)(3,"ion-button",18),e.bIt("click",function(){e.eBV(r);const i=e.XpG();return e.Njj(i.clear())}),e.EFF(4,"CLEAR"),e.k0s()(),e.j41(5,"ion-buttons",1)(6,"ion-button",19),e.bIt("click",function(){e.eBV(r);const i=e.XpG();return e.Njj(i.close())}),e.EFF(7,"CLOSE"),e.k0s()(),e.j41(8,"ion-title"),e.EFF(9,"FILTER"),e.k0s()()(),e.j41(10,"ion-content",20)(11,"ion-list")(12,"ion-item")(13,"ion-select",21),e.mxI("ngModelChange",function(i){e.eBV(r);const g=e.XpG();return e.DH7(g.routeType,i)||(g.routeType=i),e.Njj(i)}),e.DNE(14,u,2,2,"ion-select-option",22),e.k0s()(),e.j41(15,"ion-item")(16,"ion-select",23),e.mxI("ngModelChange",function(i){e.eBV(r);const g=e.XpG();return e.DH7(g.minDifficulty,i)||(g.minDifficulty=i),e.Njj(i)}),e.DNE(17,a,2,2,"ion-select-option",22),e.nI1(18,"keyvalue"),e.k0s()(),e.j41(19,"ion-item")(20,"ion-select",24),e.mxI("ngModelChange",function(i){e.eBV(r);const g=e.XpG();return e.DH7(g.maxDifficulty,i)||(g.maxDifficulty=i),e.Njj(i)}),e.DNE(21,t,2,2,"ion-select-option",22),e.nI1(22,"keyvalue"),e.k0s()(),e.DNE(23,c,3,2,"ion-item",25),e.j41(24,"ion-item")(25,"ion-select",26),e.mxI("ngModelChange",function(i){e.eBV(r);const g=e.XpG();return e.DH7(g.routeStyle,i)||(g.routeStyle=i),e.Njj(i)}),e.DNE(26,p,2,2,"ion-select-option",22),e.k0s()()()()}if(2&l){let r;const o=e.XpG();e.R7$(6),e.Y8G("strong",!0),e.R7$(7),e.R50("ngModel",o.routeType),e.R7$(),e.Y8G("ngForOf",o.routeTypes),e.R7$(2),e.R50("ngModel",o.minDifficulty),e.R7$(),e.Y8G("ngForOf",e.bMT(18,10,o.difficulties)),e.R7$(3),e.R50("ngModel",o.maxDifficulty),e.R7$(),e.Y8G("ngForOf",e.bMT(22,12,o.difficulties)),e.R7$(2),e.Y8G("ngIf",(null!==(r=null==o.template||null==o.template.Angles?null:o.template.Angles.length)&&void 0!==r?r:0)>1),e.R7$(2),e.R50("ngModel",o.routeStyle),e.R7$(),e.Y8G("ngForOf",o.routeStyles)}}const j=[{path:"",component:(()=>{var l;class m{constructor(o,i,g,L){this.routeService=o,this.wallTemplateService=i,this.auth=g,this.loadingCtrl=L,this.routeStyles=[C.Z.FeetFollow,C.Z.OpenFeet,C.Z.NoMatches],this.routeTypes=[C.Y.Boulder,C.Y.Route],this.difficulties=new Map,this.user=null,this.routes=[],this.template=null,this.routeService.getAll().then(E=>{this.routes=E,this.template&&this.loading&&this.loading.dismiss()}),this.wallTemplateService.getTemplate().then(E=>{this.template=E,this.routes&&this.loading&&this.loading.dismiss()}),this.auth.user.subscribe(E=>{this.user=E})}ngOnInit(){var o=this;return(0,S.A)(function*(){yield o.showLoading(),o.difficulties.clear();for(let[g,L]of o.routeService.boulderDifficulty){var i;const E=null!==(i=o.routeService.routeDifficulty.get(g))&&void 0!==i?i:"unknown";o.difficulties.set(g,L+"/"+E)}o.routeType=o.routeService.filter.RouteType,o.routeStyle=o.routeService.filter.RouteStyle,o.minDifficulty=o.routeService.filter.MinDifficulty,o.maxDifficulty=o.maxDifficulty,o.angle=o.routeService.filter.Angle})()}showLoading(){var o=this;return(0,S.A)(function*(){o.loading=yield o.loadingCtrl.create({message:"Loading routes..."}),o.loading.present()})()}clear(){this.modal.dismiss(null,"clear")}close(){this.modal.dismiss("ok","close")}onWillDismiss(o){var i=this;return(0,S.A)(function*(){"close"===o.detail.role?(i.routeService.filter.RouteType=i.routeType,i.routeService.filter.RouteStyle=i.routeStyle,i.routeService.filter.MinDifficulty=i.minDifficulty,i.routeService.filter.MaxDifficulty=i.maxDifficulty,i.routeService.filter.Angle=i.angle,i.routes=yield i.routeService.getAll()):(i.routeService.filter.RouteType=void 0,i.routeService.filter.RouteStyle=void 0,i.routeService.filter.MinDifficulty=void 0,i.routeService.filter.MaxDifficulty=void 0,i.routeService.filter.Angle=void 0,i.routes=yield i.routeService.getAll())})()}}return(l=m).\u0275fac=function(o){return new(o||l)(e.rXU(F.v),e.rXU(I.s),e.rXU(b.u),e.rXU(n.Xi))},l.\u0275cmp=e.VBU({type:l,selectors:[["app-list-routes"]],viewQuery:function(o,i){if(1&o&&e.GBs(n.Sb,5),2&o){let g;e.mGM(g=e.lsd())&&(i.modal=g.first)}},inputs:{user:"user"},outputs:{routeStyles:"routeStyles",routeTypes:"routeTypes",difficulties:"difficulties"},decls:18,vars:4,consts:[[3,"translucent"],["slot","primary"],["fill","solid","id","open-filter"],["name","filter-circle-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],[1,"capitalize"],[1,"routes"],["routerDirection","root",3,"button","routerLink",4,"ngFor","ngForOf"],["class","fab-add",4,"ngIf"],["trigger","open-filter",3,"willDismiss"],["routerDirection","root",3,"button","routerLink"],[1,"fab-add"],["routerDirection","root","routerLink","/routes/add"],["name","add"],["slot","secondary"],[3,"click"],[3,"click","strong"],[1,"ion-padding"],["placeholder","Select route type","interface","action-sheet",3,"ngModelChange","ngModel"],[3,"value",4,"ngFor","ngForOf"],["label","Min Difficulty","placeholder","Select minimum route difficulty","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],["label","Max Difficulty","placeholder","Select maximum route difficulty","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],[4,"ngIf"],["placeholder","Select route type","interface","action-sheet","required","true",3,"ngModelChange","ngModel"],[3,"value"],["label","Angle","placeholder","Select board angle","interface","action-sheet","required","true",3,"ngModelChange","ngModel"]],template:function(o,i){if(1&o&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),e.nrm(4,"ion-icon",3),e.k0s()(),e.j41(5,"ion-title"),e.EFF(6,"ROUTES"),e.k0s()()(),e.j41(7,"ion-content",4)(8,"ion-header",5)(9,"ion-toolbar"),e.nrm(10,"ion-title",6),e.k0s()(),e.j41(11,"div",7),e.nrm(12,"strong",8),e.j41(13,"ion-list",9),e.DNE(14,v,5,7,"ion-item",10),e.k0s(),e.DNE(15,s,4,0,"div",11),e.k0s(),e.j41(16,"ion-modal",12),e.bIt("willDismiss",function(L){return i.onWillDismiss(L)}),e.DNE(17,y,27,14,"ng-template"),e.k0s()()),2&o){let g;e.Y8G("translucent",!0),e.R7$(7),e.Y8G("fullscreen",!0),e.R7$(7),e.Y8G("ngForOf",i.routes),e.R7$(),e.Y8G("ngIf",null!==(g=null==i.user||null==i.user.labels?null:i.user.labels.includes("routesetter"))&&void 0!==g&&g)}},dependencies:[D.Sq,D.bT,h.BC,h.YS,h.vS,n.Jm,n.QW,n.W9,n.Q8,n.YW,n.eU,n.iq,n.uz,n.he,n.nf,n.JI,n.Nm,n.Ip,n.BC,n.ai,n.Sb,n.Je,n.N7,T.Wk,D.lG],styles:["ion-menu-button[_ngcontent-%COMP%]{color:var(--ion-color-primary)}#container[_ngcontent-%COMP%]{text-align:center}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}ion-note[_ngcontent-%COMP%]{color:var(--ion-color-primary);vertical-align:middle;font-size:.9em;font-weight:300;margin-top:1em}div[_ngcontent-%COMP%]   .fab-add[_ngcontent-%COMP%]{margin-right:auto;margin-left:auto;margin-top:-1em}"]}),m})()}];let P=(()=>{var l;class m{}return(l=m).\u0275fac=function(o){return new(o||l)},l.\u0275mod=e.$C({type:l}),l.\u0275inj=e.G2t({imports:[T.iI.forChild(j),T.iI]}),m})(),O=(()=>{var l;class m{}return(l=m).\u0275fac=function(o){return new(o||l)},l.\u0275mod=e.$C({type:l}),l.\u0275inj=e.G2t({imports:[D.MD,h.YN,n.bv,P]}),m})()},2167:(A,M,f)=>{f.d(M,{v:()=>e});var D=f(467),h=f(9480),n=f(1562),T=f(4438),S=f(2420),C=f(4796);let e=(()=>{var F;class I{constructor(_,v){this.appwrite=_,this.auth=v,this._routeCollectionId="66126500b72562898ef7",this.routeDifficulty=new Map,this.boulderDifficulty=new Map,this.holdBuffer=[],this.filter={RouteType:void 0,RouteStyle:void 0,MinDifficulty:void 0,MaxDifficulty:void 0,Angle:void 0},this.boulderDifficulty.set(20,"3"),this.boulderDifficulty.set(25,"4-"),this.boulderDifficulty.set(30,"4"),this.boulderDifficulty.set(35,"4+"),this.boulderDifficulty.set(40,"5-"),this.boulderDifficulty.set(45,"5"),this.boulderDifficulty.set(50,"5+"),this.boulderDifficulty.set(55,"6A"),this.boulderDifficulty.set(60,"6A+"),this.boulderDifficulty.set(65,"6B"),this.boulderDifficulty.set(70,"6B+"),this.boulderDifficulty.set(75,"6C"),this.boulderDifficulty.set(80,"6C+"),this.boulderDifficulty.set(85,"7A"),this.boulderDifficulty.set(90,"7A+"),this.boulderDifficulty.set(95,"7B"),this.boulderDifficulty.set(100,"7B+"),this.boulderDifficulty.set(105,"7C"),this.boulderDifficulty.set(110,"7C+"),this.boulderDifficulty.set(115,"8A"),this.boulderDifficulty.set(120,"8A+"),this.boulderDifficulty.set(125,"8B"),this.boulderDifficulty.set(130,"8B+"),this.boulderDifficulty.set(135,"8C"),this.boulderDifficulty.set(140,"8C+"),this.boulderDifficulty.set(145,"9A"),this.routeDifficulty.set(20,"5b+"),this.routeDifficulty.set(25,"5c"),this.routeDifficulty.set(30,"5c+"),this.routeDifficulty.set(35,"6a"),this.routeDifficulty.set(40,"6a+"),this.routeDifficulty.set(45,"6b"),this.routeDifficulty.set(50,"6b+"),this.routeDifficulty.set(55,"6c"),this.routeDifficulty.set(60,"6c+"),this.routeDifficulty.set(65,"7a"),this.routeDifficulty.set(70,"7a+"),this.routeDifficulty.set(75,"7b"),this.routeDifficulty.set(80,"7b+"),this.routeDifficulty.set(85,"7c"),this.routeDifficulty.set(90,"7c+"),this.routeDifficulty.set(95,"8a"),this.routeDifficulty.set(100,"8a+"),this.routeDifficulty.set(105,"8b"),this.routeDifficulty.set(110,"8b+"),this.routeDifficulty.set(115,"8c"),this.routeDifficulty.set(120,"8c+"),this.routeDifficulty.set(125,"9a"),this.routeDifficulty.set(130,"9a+"),this.routeDifficulty.set(135,"9b"),this.routeDifficulty.set(140,"9b+"),this.routeDifficulty.set(145,"9c"),this._db=new n.Lv(this.appwrite.client)}getAll(){var _=this;return(0,D.A)(function*(){let v=[],s=[];s.push(n.XK.select(["$id","Name","Difficulty","Angle","Type"])),_.filter.Angle&&s.push(n.XK.equal("Angle",[_.filter.Angle])),_.filter.RouteType&&s.push(n.XK.equal("RouteType",[_.filter.RouteType])),_.filter.RouteStyle&&s.push(n.XK.equal("RouteStyle",[_.filter.RouteStyle])),_.filter.MinDifficulty&&s.push(n.XK.greaterThanEqual("Difficulty",Number(_.filter.MinDifficulty))),_.filter.MaxDifficulty&&s.push(n.XK.lessThanEqual("Difficulty",Number(_.filter.MaxDifficulty)));const u=yield _._db.listDocuments(_.appwrite.DatabaseId,_._routeCollectionId,s);for(let t of u.documents){var a;let d=_.boulderDifficulty.get(t.Difficulty);t.Type===h.Y.Route&&(d=_.routeDifficulty.get(t.Difficulty)),v.push({Id:t.$id,Name:t.Name,Angle:t.Angle,Difficulty:null!==(a=d)&&void 0!==a?a:"unknown",Type:t.Type})}return v})()}getById(_){var v=this;return(0,D.A)(function*(){var s;const u=yield v._db.getDocument(v.appwrite.DatabaseId,v._routeCollectionId,_);let a=[];for(let d of u.Holds)a.push({Type:d.Type,Center:d.Center,MinRect:{Center:d.Center,Size:"",Angle:0},Contour:[],Radius:0});let t=v.boulderDifficulty.get(u.Difficulty);return u.Type===h.Y.Route&&(t=v.routeDifficulty.get(u.Difficulty)),{Id:u.$id,Name:u.Name,Description:u.Description,Angle:u.Angle,Difficulty:null!==(s=t)&&void 0!==s?s:"unknown",Autor:u.CreatedByName,Holds:a,Style:u.Style,Type:u.Type,Rating:5}})()}create(_,v,s,u,a,t,d,c=[]){var p=this;return(0,D.A)(function*(){const y=yield p.auth.getUser();let R=[];for(let P of d)R.push({Type:P.Type,Center:P.Center});const j=yield p._db.createDocument(p.appwrite.DatabaseId,p._routeCollectionId,n.ID.unique(),{Name:v,Description:s,Angle:a,Difficulty:u,CreatedById:y.$id,CreatedByName:y.name,Holds:R,Type:_,Style:t,FAById:y.$id,FAByName:y.name});for(const P of c){const O=P-a;let l=Number(u)+Number(O);0!=O&&(l=Math.min(l,145),l=Math.max(l,0),yield p._db.createDocument(p.appwrite.DatabaseId,p._routeCollectionId,n.ID.unique(),{Name:v,Description:s,Angle:P,Difficulty:l,CreatedById:y.$id,CreatedByName:y.name,Holds:R,Type:_,Style:t,FAById:y.$id,FAByName:y.name}))}return j.$id})()}}return(F=I).\u0275fac=function(_){return new(_||F)(T.KVO(S.k),T.KVO(C.u))},F.\u0275prov=T.jDH({token:F,factory:F.\u0275fac,providedIn:"root"}),I})()},4943:(A,M,f)=>{f.d(M,{s:()=>I});var D=f(467),h=f(7700),T=(f(5312),f(1562)),S=f(4438),C=f(2420);let I=(()=>{var b;class _{constructor(s){this.appwrite=s,this._img=new Image,this._imgLoaded=!1,this._templateLoaded=!1,this._collectionId="661264719e62da3812a6",this.width=0,this.height=0,this._db=new T.Lv(s.client),this._img.onload=u=>{this.width=this._img.width,this.height=this._img.height,this._imgLoaded=!0},this.getTemplate()}getTemplate(){var s=this;return(0,D.A)(function*(){var u,a,t;if(!s._template){const c=(yield s._db.listDocuments(s.appwrite.DatabaseId,s._collectionId)).documents[0].$id,y=(yield s._db.getDocument(s.appwrite.DatabaseId,s._collectionId,c)).TemplateURL,R=yield fetch(y);s._template=yield R.json()}return null!==(u=s._template)&&void 0!==u&&u.EncodedImage&&(s._img.src="data:image/jpeg;base64, "+(null===(t=s._template)||void 0===t?void 0:t.EncodedImage)),null!==(a=s._template)&&void 0!==a?a:null})()}markHolds(s,u,a){let t=a.getContext("2d");if(t&&s)for(let d=0;d<s.length;d++){const c=s[d];t.save(),t.beginPath(),t.moveTo(c.Contour[0].X,c.Contour[0].Y);for(let p=1;p<c.Contour.length;p++)t.lineTo(c.Contour[p].X,c.Contour[p].Y);t.lineTo(c.Contour[0].X,c.Contour[0].Y),t.closePath(),t.clip(),t.drawImage(this._img,0,0),t.restore(),t.save(),t.beginPath(),t.arc(c.Center.X,c.Center.Y,c.Radius+10,0,2*Math.PI,!0),t.closePath(),t.lineWidth=5,t.strokeStyle=c.Type==h.S.StartingHold?"#00FF00":c.Type==h.S.FinishingHold?"#FF0000":c.Type==h.S.FootHold?"#ffe066":"#00FFFF",t.stroke(),t.restore(),c==u&&(t.save(),t.beginPath(),t.arc(c.Center.X,c.Center.Y,c.Radius+20,0,2*Math.PI,!0),t.closePath(),t.lineWidth=5,t.strokeStyle=c.Type==h.S.StartingHold?"#00FF00":c.Type==h.S.FinishingHold?"#FF0000":c.Type==h.S.FootHold?"#ffe066":"#00FFFF",t.stroke(),t.restore())}}drawTemplateBackdrop(s){var u=this;return(0,D.A)(function*(){for(u._templateLoaded||(yield u.getTemplate());!u._imgLoaded;)yield new Promise(y=>setTimeout(y,500));s.width=u._img.width,s.height=u._img.height;var a=s.getContext("2d");if(a){a.save(),a.drawImage(u._img,0,0),a.restore(),a.save();for(var t=a.getImageData(0,0,u.width,u.height),d=t.data,c=0;c<d.length;c+=4){let y=.3;var p=.299*d[c]*y+.587*d[c+1]*y+.114*d[c+2]*y;d[c]=Math.round(p),d[c+1]=Math.round(p),d[c+2]=Math.round(p)}a.putImageData(t,0,0),a.restore()}})()}findHold(s,u){var a=this;return(0,D.A)(function*(){var t;if(null!==(t=a._template)&&void 0!==t&&t.Holds){var d;let y,c=null===(d=a._template)||void 0===d?void 0:d.Holds,p=null;return c.forEach(R=>{a.regionMatch(s,u,R.MinRect)&&(null==y||y>R.MinRect.Size.Width*R.MinRect.Size.Height)&&(p=R)}),p}return null})()}regionMatch(s,u,a){let t=a.Size.Width/2,d=a.Size.Height/2;return a.Center.X-t<s&&a.Center.X+t>s&&a.Center.Y-d<u&&a.Center.Y+d>u}}return(b=_).\u0275fac=function(s){return new(s||b)(S.KVO(C.k))},b.\u0275prov=S.jDH({token:b,factory:b.\u0275fac,providedIn:"root"}),_})()}}]);