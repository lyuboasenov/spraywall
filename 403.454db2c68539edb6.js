"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[403],{3875:(I,T,c)=>{c.d(T,{S:()=>g});var g=function(t){return t[t.Hold="Hold"]="Hold",t[t.StartingHold="StartingHold"]="StartingHold",t[t.FinishingHold="FinishingHold"]="FinishingHold",t[t.FootHold="FootHold"]="FootHold",t}(g||{})},1118:(I,T,c)=>{c.d(T,{Z:()=>g});var g=function(t){return t[t.FeetFollow=0]="FeetFollow",t[t.OpenFeet=1]="OpenFeet",t[t.NoMatches=2]="NoMatches",t[t.NoFeet=4]="NoFeet",t}(g||{})},8795:(I,T,c)=>{c.d(T,{Y:()=>g});var g=function(t){return t[t.Boulder=0]="Boulder",t[t.Route=1]="Route",t}(g||{})},403:(I,T,c)=>{c.r(T),c.d(T,{AddRouteDetailsPageModule:()=>s});var g=c(177),t=c(4341),m=c(9364),_=c(8986),A=c(467),C=c(8795),e=c(4438),E=c(2167),S=c(4943);function R(o,h){if(1&o&&(e.j41(0,"ion-select-option",19),e.EFF(1),e.k0s()),2&o){const d=h.$implicit;e.Y8G("value",d.key),e.R7$(),e.JRh(d.value)}}function M(o,h){if(1&o&&(e.j41(0,"ion-select-option",19),e.EFF(1),e.k0s()),2&o){const d=h.$implicit;e.Y8G("value",d.key),e.R7$(),e.JRh(d.value)}}function p(o,h){if(1&o&&(e.j41(0,"ion-select-option",19),e.EFF(1),e.k0s()),2&o){const d=h.$implicit;e.FS9("value",d),e.R7$(),e.SpI("",d,"\xb0")}}function r(o,h){if(1&o&&(e.j41(0,"ion-item")(1,"ion-select",20),e.DNE(2,p,2,2,"ion-select-option",13),e.k0s()()),2&o){const d=e.XpG();e.R7$(2),e.Y8G("ngForOf",null==d.template?null:d.template.Angles)}}function n(o,h){if(1&o&&(e.j41(0,"ion-select-option",19),e.EFF(1),e.k0s()),2&o){const d=h.$implicit;e.Y8G("value",d.key),e.R7$(),e.JRh(d.value)}}const i=[{path:"",component:(()=>{var o;class h{constructor(u,f,y,D){this.routeService=u,this.wallTemplateService=f,this.formBuilder=y,this.router=D,this.template=null,this.difficulties=new Map,this.routeTypes=this.routeService.routeTypes,this.routeStyles=this.routeService.routeStyles,this.formGroup=y.group({name:["",t.k0.required],description:["",t.k0.required],routeType:[this.routeService.lastRouteType,t.k0.required],difficulty:[this.routeService.lastRouteDifficulty,t.k0.required],angle:[this.routeService.lastRouteAngle,t.k0.required],routeStyle:[this.routeService.lastRouteStyle,t.k0.required]})}ngOnInit(){var u=this;return(0,A.A)(function*(){var f,y,D;u.template=yield u.wallTemplateService.getTemplate(),u.setDifficulty(u.routeService.boulderDifficulty);let b=null===(f=u.template)||void 0===f?void 0:f.Angles[0];var v,F;null!==(y=null===(D=u.template)||void 0===D?void 0:D.Angles.length)&&void 0!==y&&y&&(b=null!==(v=null===(F=u.template)||void 0===F?void 0:F.Angles[u.template.Angles.length/2])&&void 0!==v?v:40),u.formGroup=u.formBuilder.group({name:["",t.k0.required],description:["",t.k0.required],routeType:[u.routeService.lastRouteType,t.k0.required],difficulty:[u.routeService.lastRouteDifficulty,t.k0.required],angle:[u.routeService.lastRouteAngle,t.k0.required],routeStyle:[u.routeService.lastRouteStyle,t.k0.required]})})()}onSubmit(u){var f=this;return(0,A.A)(function*(){var y,D,b,v;const F=null!==(y=null===(D=f.template)||void 0===D?void 0:D.Angles)&&void 0!==y?y:[],P=yield f.routeService.create(null!==(b=null===(v=f.template)||void 0===v?void 0:v.Id)&&void 0!==b?b:"missing",u.routeType,u.name,u.description,u.difficulty,u.angle,u.routeStyle,f.routeService.holdBuffer,F);yield f.router.navigate(["/routes",{id:P}])})()}setDifficulty(u){var f=this;return(0,A.A)(function*(){f.difficulties.clear();for(let[y,D]of u)f.difficulties.set(y,D)})()}changeRouteType(u){var f=this;return(0,A.A)(function*(){const y=u.detail.value;y===C.Y.Route?f.setDifficulty(f.routeService.routeDifficulty):y===C.Y.Boulder&&f.setDifficulty(f.routeService.boulderDifficulty)})()}}return(o=h).\u0275fac=function(u){return new(u||o)(e.rXU(E.v),e.rXU(S.s),e.rXU(t.ok),e.rXU(_.Ix))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-add-route-details"]],outputs:{routeStyles:"routeStyles",routeTypes:"routeTypes",difficulties:"difficulties"},decls:36,vars:14,consts:[[3,"translucent"],["slot","primary"],["fill","solid","routerLink","/routes"],["name","close-circle-outline"],["fill","solid","routerLink","details","form","form","type","submit",3,"disabled"],["name","save-outline"],[3,"fullscreen"],["collapse","condense"],["size","large"],["id","container"],[1,"capitalize"],["id","form",3,"ngSubmit","formGroup"],["formControlName","routeType","placeholder","Select route type","interface","action-sheet",3,"ionChange"],[3,"value",4,"ngFor","ngForOf"],["formControlName","name","label","Name","placeholder","Enter route name","required","true"],["formControlName","description","label","Description","placeholder","Enter route description"],["formControlName","difficulty","label","Difficulty","placeholder","Select route difficulty","interface","action-sheet","required","true"],[4,"ngIf"],["formControlName","routeStyle","placeholder","Select route type","interface","action-sheet","required","true"],[3,"value"],["formControlName","angle","label","Angle","placeholder","Select board angle","interface","action-sheet","required","true"]],template:function(u,f){if(1&u&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1)(3,"ion-button",2),e.nrm(4,"ion-icon",3),e.k0s()(),e.j41(5,"ion-buttons",1)(6,"ion-button",4),e.nrm(7,"ion-icon",5),e.k0s()(),e.j41(8,"ion-title"),e.EFF(9,"New route"),e.k0s()()(),e.j41(10,"ion-content",6)(11,"ion-header",7)(12,"ion-toolbar")(13,"ion-title",8),e.EFF(14,"add-route-details"),e.k0s()()(),e.j41(15,"div",9),e.nrm(16,"strong",10),e.j41(17,"form",11),e.bIt("ngSubmit",function(){return f.onSubmit(f.formGroup.value)}),e.j41(18,"ion-list")(19,"ion-item")(20,"ion-select",12),e.bIt("ionChange",function(D){return f.changeRouteType(D)}),e.DNE(21,R,2,2,"ion-select-option",13),e.nI1(22,"keyvalue"),e.k0s()(),e.j41(23,"ion-item"),e.nrm(24,"ion-input",14),e.k0s(),e.j41(25,"ion-item"),e.nrm(26,"ion-textarea",15),e.k0s(),e.j41(27,"ion-item")(28,"ion-select",16),e.DNE(29,M,2,2,"ion-select-option",13),e.nI1(30,"keyvalue"),e.k0s()(),e.DNE(31,r,3,1,"ion-item",17),e.j41(32,"ion-item")(33,"ion-select",18),e.DNE(34,n,2,2,"ion-select-option",13),e.nI1(35,"keyvalue"),e.k0s()()()()()()),2&u){let y;e.Y8G("translucent",!0),e.R7$(6),e.Y8G("disabled",!f.formGroup.valid),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(7),e.Y8G("formGroup",f.formGroup),e.R7$(4),e.Y8G("ngForOf",e.bMT(22,8,f.routeTypes)),e.R7$(8),e.Y8G("ngForOf",e.bMT(30,10,f.difficulties)),e.R7$(2),e.Y8G("ngIf",(null!==(y=null==f.template||null==f.template.Angles?null:f.template.Angles.length)&&void 0!==y?y:0)>1),e.R7$(3),e.Y8G("ngForOf",e.bMT(35,12,f.routeStyles))}},dependencies:[g.Sq,g.bT,t.qT,t.BC,t.cb,t.YS,m.Jm,m.QW,m.W9,m.eU,m.iq,m.$w,m.uz,m.nf,m.Nm,m.Ip,m.nc,m.BC,m.ai,m.Je,m.Gw,m.N7,_.Wk,t.j4,t.JD,g.lG]}),h})()}];let a=(()=>{var o;class h{}return(o=h).\u0275fac=function(u){return new(u||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[_.iI.forChild(i),_.iI]}),h})(),s=(()=>{var o;class h{}return(o=h).\u0275fac=function(u){return new(u||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[g.MD,t.YN,m.bv,a,t.X1]}),h})()},2167:(I,T,c)=>{c.d(T,{v:()=>E});var g=c(467),t=c(1562),m=c(8795),_=c(1118),A=c(4438),C=c(2420),e=c(4796);let E=(()=>{var S;class R{constructor(p,r){this.appwrite=p,this.auth=r,this._routeCollectionId="6616dd90781920c2be2e",this.routeDifficulty=new Map,this.boulderDifficulty=new Map,this.routeStyles=new Map,this.routeTypes=new Map,this.holdBuffer=[],this.filter={RouteType:void 0,RouteStyle:void 0,MinDifficulty:void 0,MaxDifficulty:void 0,Angle:void 0},this.routeTypes.set(m.Y.Boulder,"Boulder"),this.routeTypes.set(m.Y.Route,"Route"),this.routeStyles.set(_.Z.FeetFollow,"Feet follow hands"),this.routeStyles.set(_.Z.OpenFeet,"Open feet"),this.routeStyles.set(_.Z.NoMatches,"No matching"),this.routeStyles.set(_.Z.NoFeet,"No feet / Campusing"),this.boulderDifficulty.set(20,"3"),this.boulderDifficulty.set(25,"4-"),this.boulderDifficulty.set(30,"4"),this.boulderDifficulty.set(35,"4+"),this.boulderDifficulty.set(40,"5-"),this.boulderDifficulty.set(45,"5"),this.boulderDifficulty.set(50,"5+"),this.boulderDifficulty.set(55,"6A"),this.boulderDifficulty.set(60,"6A+"),this.boulderDifficulty.set(65,"6B"),this.boulderDifficulty.set(70,"6B+"),this.boulderDifficulty.set(75,"6C"),this.boulderDifficulty.set(80,"6C+"),this.boulderDifficulty.set(85,"7A"),this.boulderDifficulty.set(90,"7A+"),this.boulderDifficulty.set(95,"7B"),this.boulderDifficulty.set(100,"7B+"),this.boulderDifficulty.set(105,"7C"),this.boulderDifficulty.set(110,"7C+"),this.boulderDifficulty.set(115,"8A"),this.boulderDifficulty.set(120,"8A+"),this.boulderDifficulty.set(125,"8B"),this.boulderDifficulty.set(130,"8B+"),this.boulderDifficulty.set(135,"8C"),this.boulderDifficulty.set(140,"8C+"),this.boulderDifficulty.set(145,"9A"),this.routeDifficulty.set(20,"5b+"),this.routeDifficulty.set(25,"5c"),this.routeDifficulty.set(30,"5c+"),this.routeDifficulty.set(35,"6a"),this.routeDifficulty.set(40,"6a+"),this.routeDifficulty.set(45,"6b"),this.routeDifficulty.set(50,"6b+"),this.routeDifficulty.set(55,"6c"),this.routeDifficulty.set(60,"6c+"),this.routeDifficulty.set(65,"7a"),this.routeDifficulty.set(70,"7a+"),this.routeDifficulty.set(75,"7b"),this.routeDifficulty.set(80,"7b+"),this.routeDifficulty.set(85,"7c"),this.routeDifficulty.set(90,"7c+"),this.routeDifficulty.set(95,"8a"),this.routeDifficulty.set(100,"8a+"),this.routeDifficulty.set(105,"8b"),this.routeDifficulty.set(110,"8b+"),this.routeDifficulty.set(115,"8c"),this.routeDifficulty.set(120,"8c+"),this.routeDifficulty.set(125,"9a"),this.routeDifficulty.set(130,"9a+"),this.routeDifficulty.set(135,"9b"),this.routeDifficulty.set(140,"9b+"),this.routeDifficulty.set(145,"9c"),this._db=new t.Lv(this.appwrite.client)}getAll(){var p=this;return(0,g.A)(function*(){let r=[],n=[];n.push(t.XK.select(["$id","Name","Difficulty","Angle","Type"])),n.push(t.XK.limit(1e5)),n.push(t.XK.orderAsc("Difficulty")),p.filter.Angle&&n.push(t.XK.equal("Angle",[p.filter.Angle])),p.filter.RouteType&&n.push(t.XK.equal("RouteType",[p.filter.RouteType])),p.filter.RouteStyle&&n.push(t.XK.equal("RouteStyle",[p.filter.RouteStyle])),p.filter.MinDifficulty&&n.push(t.XK.greaterThanEqual("Difficulty",Number(p.filter.MinDifficulty))),p.filter.MaxDifficulty&&n.push(t.XK.lessThanEqual("Difficulty",Number(p.filter.MaxDifficulty)));const l=yield p._db.listDocuments(p.appwrite.DatabaseId,p._routeCollectionId,n);for(let a of l.documents){var i;let s=p.boulderDifficulty.get(a.Difficulty);a.Type===m.Y.Route&&(s=p.routeDifficulty.get(a.Difficulty)),r.push({Id:a.$id,Name:a.Name,Angle:a.Angle,Difficulty:null!==(i=s)&&void 0!==i?i:"unknown",Type:a.Type})}return r})()}getById(p){var r=this;return(0,g.A)(function*(){var n;const l=yield r._db.getDocument(r.appwrite.DatabaseId,r._routeCollectionId,p);let i=[];for(let s of JSON.parse(l.JsonHolds))i.push({Type:s[2],Center:{X:s[0][0],Y:s[0][1]}});let a=r.boulderDifficulty.get(l.Difficulty);return l.Type===m.Y.Route&&(a=r.routeDifficulty.get(l.Difficulty)),{Id:l.$id,Name:l.Name,Description:l.Description,Angle:l.Angle,Difficulty:null!==(n=a)&&void 0!==n?n:"unknown",Autor:l.CreatedByName,Holds:i,Style:l.Style,Type:l.Type,Rating:5}})()}create(p,r,n,l,i,a,s,o,h=[]){var d=this;return(0,g.A)(function*(){const u=yield d.auth.getUser();let f=[];for(let D of o)f.push([[D.TemplateHold.Center.X,D.TemplateHold.Center.Y],D.TemplateHold.Radius,D.Type]);const y=yield d._db.createDocument(d.appwrite.DatabaseId,d._routeCollectionId,t.ID.unique(),{Name:n,Description:l,Angle:a,Difficulty:i,CreatedById:u.$id,CreatedByName:u.name,Type:r,Style:s,FAById:u.$id,FAByName:u.name,JsonHolds:JSON.stringify(f),SettersAngle:a,Wall:p});for(const D of h){const b=D-a;let v=Number(i)+Number(b);0!=b&&(v=Math.min(v,145),v=Math.max(v,0),yield d._db.createDocument(d.appwrite.DatabaseId,d._routeCollectionId,t.ID.unique(),{Name:n,Description:l,Angle:D,Difficulty:v,CreatedById:u.$id,CreatedByName:u.name,Type:r,Style:s,JsonHolds:JSON.stringify(f),SettersAngle:a,ParentId:y.$id,Wall:p}))}return d.lastRouteAngle=a,d.lastRouteDifficulty=i,d.lastRouteStyle=s,d.lastRouteType=r,y.$id})()}}return(S=R).\u0275fac=function(p){return new(p||S)(A.KVO(C.k),A.KVO(e.u))},S.\u0275prov=A.jDH({token:S,factory:S.\u0275fac,providedIn:"root"}),R})()},4943:(I,T,c)=>{c.d(T,{s:()=>S});var g=c(467),m=(c(5312),c(1562)),_=c(3875),A=c(4438),C=c(2420);let S=(()=>{var R;class M{constructor(r){this.appwrite=r,this._img=new Image,this._imgLoaded=!1,this._templateLoaded=!1,this._collectionId="661264719e62da3812a6",this.width=0,this.height=0,this._db=new m.Lv(r.client),this._img.onload=n=>{this.width=this._img.width,this.height=this._img.height,this._imgLoaded=!0},this.getTemplate()}getTemplate(){var r=this;return(0,g.A)(function*(){var n,l,i;if(!r._template){const s=(yield r._db.listDocuments(r.appwrite.DatabaseId,r._collectionId)).documents[0].$id,u=(yield r._db.getDocument(r.appwrite.DatabaseId,r._collectionId,s),yield(yield fetch("https://storage.googleapis.com/spraywall/balkan/template.2024-04-10T04-07-30.json")).json());r._template={Id:s,EncodedImage:u.EncodedImage,Holds:r.TransformHolds(u.Holds),Angles:u.Angles}}return null!==(n=r._template)&&void 0!==n&&n.EncodedImage&&(r._img.src="data:image/jpeg;base64, "+(null===(i=r._template)||void 0===i?void 0:i.EncodedImage)),null!==(l=r._template)&&void 0!==l?l:null})()}markHolds(r,n,l){let i=l.getContext("2d");if(i&&r)for(let a=0;a<r.length;a++){const s=r[a];i.save(),i.beginPath(),i.moveTo(s.TemplateHold.Contour[0].X,s.TemplateHold.Contour[0].Y);for(let o=1;o<s.TemplateHold.Contour.length;o++)i.lineTo(s.TemplateHold.Contour[o].X,s.TemplateHold.Contour[o].Y);i.lineTo(s.TemplateHold.Contour[0].X,s.TemplateHold.Contour[0].Y),i.closePath(),i.clip(),i.drawImage(this._img,0,0),i.restore(),i.save(),i.beginPath(),i.arc(s.TemplateHold.Center.X,s.TemplateHold.Center.Y,s.TemplateHold.Radius+10,0,2*Math.PI,!0),i.closePath(),i.lineWidth=5,i.strokeStyle=s.Type==_.S.StartingHold?"#00FF00":s.Type==_.S.FinishingHold?"#FF0000":s.Type==_.S.FootHold?"#ffe066":"#00FFFF",i.stroke(),i.restore(),s==n&&(i.save(),i.beginPath(),i.arc(s.TemplateHold.Center.X,s.TemplateHold.Center.Y,s.TemplateHold.Radius+20,0,2*Math.PI,!0),i.closePath(),i.lineWidth=5,i.strokeStyle=s.Type==_.S.StartingHold?"#00FF00":s.Type==_.S.FinishingHold?"#FF0000":s.Type==_.S.FootHold?"#ffe066":"#00FFFF",i.stroke(),i.restore())}}drawTemplateBackdrop(r){var n=this;return(0,g.A)(function*(){for(n._templateLoaded||(yield n.getTemplate());!n._imgLoaded;)yield new Promise(h=>setTimeout(h,500));r.width=n._img.width,r.height=n._img.height;var l=r.getContext("2d");if(l){l.save(),l.drawImage(n._img,0,0),l.restore(),l.save();for(var i=l.getImageData(0,0,n.width,n.height),a=i.data,s=0;s<a.length;s+=4){let h=.3;var o=.299*a[s]*h+.587*a[s+1]*h+.114*a[s+2]*h;a[s]=Math.round(o),a[s+1]=Math.round(o),a[s+2]=Math.round(o)}l.putImageData(i,0,0),l.restore()}})()}findHold(r,n){var l=this;return(0,g.A)(function*(){var i;if(null!==(i=l._template)&&void 0!==i&&i.Holds){var a;let h,s=null===(a=l._template)||void 0===a?void 0:a.Holds,o=null;return s.forEach(d=>{l.regionMatch(r,n,d.MinRect)&&(null==h||h>d.MinRect.Size.Width*d.MinRect.Size.Height)&&(o=d)}),o}return null})()}regionMatch(r,n,l){let i=l.Size.Width/2,a=l.Size.Height/2;return l.Center.X-i<r&&l.Center.X+i>r&&l.Center.Y-a<n&&l.Center.Y+a>n}TransformHolds(r){const n=[];for(const l of r){const i={X:l[0][0],Y:l[0][1]},a=l[1],s={Center:{X:l[2][0][0],Y:l[2][0][1]},Size:{Width:l[2][1][0],Height:l[2][1][1]},Angle:l[2][2]},o=[];for(let h=0;h<l[3].length;h++)o.push({X:l[3][h][0],Y:l[3][h][1]});n.push({Center:i,MinRect:s,Contour:o,Radius:a})}return n}}return(R=M).\u0275fac=function(r){return new(r||R)(A.KVO(C.k))},R.\u0275prov=A.jDH({token:R,factory:R.\u0275fac,providedIn:"root"}),M})()}}]);