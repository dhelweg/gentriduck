import{s as _t,d as i,w as pt,i as d,a as ge,b as $,c as p,h as $t,e as E,f as we,k as Q,g as Te,j as V,l as g,m as T,t as K,n as lt,o as yt,p as vt,q as wt,r as kt,u as J}from"../chunks/scheduler.wXRIqz25.js";import{S as Ct,i as xt,d as S,t as v,a as b,c as Ue,m as j,b as B,e as H,g as Qe}from"../chunks/index.uz5rP6Z2.js";import{F as Et}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Tt}from"../chunks/Hero.C0o6T8tj.js";import{S as Rt}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as Lt}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as St,C as Ke}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{w as jt}from"../chunks/entry.DotynpIs.js";import{A as Bt}from"../chunks/Alert.DFISYc09.js";import{e as Ht,s as Mt,Q as st,p as qt,a as ot,r as dt,C as At}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as De}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as gt,a as X}from"../chunks/Dropdown.Dl2mephJ.js";import{p as Nt}from"../chunks/stores.DJGNasUV.js";import{Q as ht}from"../chunks/QueryViewer.RFckNDEV.js";import{B as Pe}from"../chunks/BigValue.Bpt9v-UH.js";import{p as zt}from"../chunks/profile.BW8tN6E9.js";function Ft(f){let r,n=R.title+"",t;return{c(){r=T("h1"),t=K(n),this.h()},l(a){r=E(a,"H1",{class:!0});var s=Te(r);t=V(s,n),s.forEach(i),this.h()},h(){$(r,"class","title")},m(a,s){d(a,r,s),ge(r,t)},p:J,d(a){a&&i(r)}}}function It(f){return{c(){this.h()},l(r){this.h()},h(){document.title="Evidence"},m:J,p:J,d:J}}function Ot(f){let r,n,t,a,s;return document.title=r=R.title,{c(){n=g(),t=T("meta"),a=g(),s=T("meta"),this.h()},l(m){n=p(m),t=E(m,"META",{property:!0,content:!0}),a=p(m),s=E(m,"META",{name:!0,content:!0}),this.h()},h(){var m,o;$(t,"property","og:title"),$(t,"content",((m=R.og)==null?void 0:m.title)??R.title),$(s,"name","twitter:title"),$(s,"content",((o=R.og)==null?void 0:o.title)??R.title)},m(m,o){d(m,n,o),d(m,t,o),d(m,a,o),d(m,s,o)},p(m,o){o&0&&r!==(r=R.title)&&(document.title=r)},d(m){m&&(i(n),i(t),i(a),i(s))}}}function Dt(f){var s,m;let r,n,t=(R.description||((s=R.og)==null?void 0:s.description))&&Pt(),a=((m=R.og)==null?void 0:m.image)&&Ut();return{c(){t&&t.c(),r=g(),a&&a.c(),n=we()},l(o){t&&t.l(o),r=p(o),a&&a.l(o),n=we()},m(o,_){t&&t.m(o,_),d(o,r,_),a&&a.m(o,_),d(o,n,_)},p(o,_){var x,y;(R.description||(x=R.og)!=null&&x.description)&&t.p(o,_),(y=R.og)!=null&&y.image&&a.p(o,_)},d(o){o&&(i(r),i(n)),t&&t.d(o),a&&a.d(o)}}}function Pt(f){let r,n,t,a,s;return{c(){r=T("meta"),n=g(),t=T("meta"),a=g(),s=T("meta"),this.h()},l(m){r=E(m,"META",{name:!0,content:!0}),n=p(m),t=E(m,"META",{property:!0,content:!0}),a=p(m),s=E(m,"META",{name:!0,content:!0}),this.h()},h(){var m,o,_;$(r,"name","description"),$(r,"content",R.description??((m=R.og)==null?void 0:m.description)),$(t,"property","og:description"),$(t,"content",((o=R.og)==null?void 0:o.description)??R.description),$(s,"name","twitter:description"),$(s,"content",((_=R.og)==null?void 0:_.description)??R.description)},m(m,o){d(m,r,o),d(m,n,o),d(m,t,o),d(m,a,o),d(m,s,o)},p:J,d(m){m&&(i(r),i(n),i(t),i(a),i(s))}}}function Ut(f){let r,n,t;return{c(){r=T("meta"),n=g(),t=T("meta"),this.h()},l(a){r=E(a,"META",{property:!0,content:!0}),n=p(a),t=E(a,"META",{name:!0,content:!0}),this.h()},h(){var a,s;$(r,"property","og:image"),$(r,"content",ot((a=R.og)==null?void 0:a.image)),$(t,"name","twitter:image"),$(t,"content",ot((s=R.og)==null?void 0:s.image))},m(a,s){d(a,r,s),d(a,n,s),d(a,t,s)},p:J,d(a){a&&(i(r),i(n),i(t))}}}function Qt(f){let r,n="How to read the figures:",t,a,s="1 = least deprived",m,o,_="4 = most deprived",x,y,A="rising",U,h,W="index",z,L,M="less",N,w,G="methodology & data sources",F;return{c(){r=T("b"),r.textContent=n,t=K(" official status runs "),a=T("b"),a.textContent=s,m=K(` to
  `),o=T("b"),o.textContent=_,x=K(", so a "),y=T("b"),y.textContent=A,U=K(" status (a falling status "),h=T("i"),h.textContent=W,z=K(` value) means an
  area became `),L=T("b"),L.textContent=M,N=K(` deprived — which is also the signature of gentrification, not automatically
  good news for existing residents. See the `),w=T("a"),w.textContent=G,F=K(`
  page for a full walkthrough. Figures are on Berlin's current (2021+) boundaries and the live
  social-monitoring editions (2021–2025).`),this.h()},l(c){r=E(c,"B",{"data-svelte-h":!0}),Q(r)!=="svelte-1he5ddd"&&(r.textContent=n),t=V(c," official status runs "),a=E(c,"B",{"data-svelte-h":!0}),Q(a)!=="svelte-1bcgix4"&&(a.textContent=s),m=V(c,` to
  `),o=E(c,"B",{"data-svelte-h":!0}),Q(o)!=="svelte-1cr3k8t"&&(o.textContent=_),x=V(c,", so a "),y=E(c,"B",{"data-svelte-h":!0}),Q(y)!=="svelte-1q2mp82"&&(y.textContent=A),U=V(c," status (a falling status "),h=E(c,"I",{"data-svelte-h":!0}),Q(h)!=="svelte-1tpkj76"&&(h.textContent=W),z=V(c,` value) means an
  area became `),L=E(c,"B",{"data-svelte-h":!0}),Q(L)!=="svelte-u149sn"&&(L.textContent=M),N=V(c,` deprived — which is also the signature of gentrification, not automatically
  good news for existing residents. See the `),w=E(c,"A",{href:!0,"data-svelte-h":!0}),Q(w)!=="svelte-3zcnok"&&(w.textContent=G),F=V(c,`
  page for a full walkthrough. Figures are on Berlin's current (2021+) boundaries and the live
  social-monitoring editions (2021–2025).`),this.h()},h(){$(w,"href","/gentriduck/methodology")},m(c,k){d(c,r,k),d(c,t,k),d(c,a,k),d(c,m,k),d(c,o,k),d(c,x,k),d(c,y,k),d(c,U,k),d(c,h,k),d(c,z,k),d(c,L,k),d(c,N,k),d(c,w,k),d(c,F,k)},p:J,d(c){c&&(i(r),i(t),i(a),i(m),i(o),i(x),i(y),i(U),i(h),i(z),i(L),i(N),i(w),i(F))}}}function Vt(f){let r,n,t,a,s,m,o,_,x,y,A,U,h,W,z,L,M,N,w,G,F,c,k,P;return r=new X({props:{value:"01",valueLabel:"01 · Mitte"}}),t=new X({props:{value:"02",valueLabel:"02 · Friedrichshain-Kreuzberg"}}),s=new X({props:{value:"03",valueLabel:"03 · Pankow"}}),o=new X({props:{value:"04",valueLabel:"04 · Charlottenburg-Wilmersdorf"}}),x=new X({props:{value:"05",valueLabel:"05 · Spandau"}}),A=new X({props:{value:"06",valueLabel:"06 · Steglitz-Zehlendorf"}}),h=new X({props:{value:"07",valueLabel:"07 · Tempelhof-Schöneberg"}}),z=new X({props:{value:"08",valueLabel:"08 · Neukölln"}}),M=new X({props:{value:"09",valueLabel:"09 · Treptow-Köpenick"}}),w=new X({props:{value:"10",valueLabel:"10 · Marzahn-Hellersdorf"}}),F=new X({props:{value:"11",valueLabel:"11 · Lichtenberg"}}),k=new X({props:{value:"12",valueLabel:"12 · Reinickendorf"}}),{c(){H(r.$$.fragment),n=g(),H(t.$$.fragment),a=g(),H(s.$$.fragment),m=g(),H(o.$$.fragment),_=g(),H(x.$$.fragment),y=g(),H(A.$$.fragment),U=g(),H(h.$$.fragment),W=g(),H(z.$$.fragment),L=g(),H(M.$$.fragment),N=g(),H(w.$$.fragment),G=g(),H(F.$$.fragment),c=g(),H(k.$$.fragment)},l(l){B(r.$$.fragment,l),n=p(l),B(t.$$.fragment,l),a=p(l),B(s.$$.fragment,l),m=p(l),B(o.$$.fragment,l),_=p(l),B(x.$$.fragment,l),y=p(l),B(A.$$.fragment,l),U=p(l),B(h.$$.fragment,l),W=p(l),B(z.$$.fragment,l),L=p(l),B(M.$$.fragment,l),N=p(l),B(w.$$.fragment,l),G=p(l),B(F.$$.fragment,l),c=p(l),B(k.$$.fragment,l)},m(l,C){j(r,l,C),d(l,n,C),j(t,l,C),d(l,a,C),j(s,l,C),d(l,m,C),j(o,l,C),d(l,_,C),j(x,l,C),d(l,y,C),j(A,l,C),d(l,U,C),j(h,l,C),d(l,W,C),j(z,l,C),d(l,L,C),j(M,l,C),d(l,N,C),j(w,l,C),d(l,G,C),j(F,l,C),d(l,c,C),j(k,l,C),P=!0},p:J,i(l){P||(b(r.$$.fragment,l),b(t.$$.fragment,l),b(s.$$.fragment,l),b(o.$$.fragment,l),b(x.$$.fragment,l),b(A.$$.fragment,l),b(h.$$.fragment,l),b(z.$$.fragment,l),b(M.$$.fragment,l),b(w.$$.fragment,l),b(F.$$.fragment,l),b(k.$$.fragment,l),P=!0)},o(l){v(r.$$.fragment,l),v(t.$$.fragment,l),v(s.$$.fragment,l),v(o.$$.fragment,l),v(x.$$.fragment,l),v(A.$$.fragment,l),v(h.$$.fragment,l),v(z.$$.fragment,l),v(M.$$.fragment,l),v(w.$$.fragment,l),v(F.$$.fragment,l),v(k.$$.fragment,l),P=!1},d(l){l&&(i(n),i(a),i(m),i(_),i(y),i(U),i(W),i(L),i(N),i(G),i(c)),S(r,l),S(t,l),S(s,l),S(o,l),S(x,l),S(A,l),S(h,l),S(z,l),S(M,l),S(w,l),S(F,l),S(k,l)}}}function ut(f){let r,n;return r=new ht({props:{queryID:"browse",queryResult:f[0]}}),{c(){H(r.$$.fragment)},l(t){B(r.$$.fragment,t)},m(t,a){j(r,t,a),n=!0},p(t,a){const s={};a&1&&(s.queryResult=t[0]),r.$set(s)},i(t){n||(b(r.$$.fragment,t),n=!0)},o(t){v(r.$$.fragment,t),n=!1},d(t){S(r,t)}}}function Kt(f){let r,n,t,a,s,m;return r=new Ke({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),t=new Ke({props:{id:"stage",title:"Stage",wrap:"true"}}),s=new Ke({props:{id:"status_trend",title:"Status trend"}}),{c(){H(r.$$.fragment),n=g(),H(t.$$.fragment),a=g(),H(s.$$.fragment)},l(o){B(r.$$.fragment,o),n=p(o),B(t.$$.fragment,o),a=p(o),B(s.$$.fragment,o)},m(o,_){j(r,o,_),d(o,n,_),j(t,o,_),d(o,a,_),j(s,o,_),m=!0},p:J,i(o){m||(b(r.$$.fragment,o),b(t.$$.fragment,o),b(s.$$.fragment,o),m=!0)},o(o){v(r.$$.fragment,o),v(t.$$.fragment,o),v(s.$$.fragment,o),m=!1},d(o){o&&(i(n),i(a)),S(r,o),S(t,o),S(s,o)}}}function mt(f){let r,n;return r=new ht({props:{queryID:"spotlight",queryResult:f[3]}}),{c(){H(r.$$.fragment)},l(t){B(r.$$.fragment,t)},m(t,a){j(r,t,a),n=!0},p(t,a){const s={};a&8&&(s.queryResult=t[3]),r.$set(s)},i(t){n||(b(r.$$.fragment,t),n=!0)},o(t){v(r.$$.fragment,t),n=!1},d(t){S(r,t)}}}function ft(f){let r=f[2],n,t,a=ct(f);return{c(){a.c(),n=we()},l(s){a.l(s),n=we()},m(s,m){a.m(s,m),d(s,n,m),t=!0},p(s,m){m&4&&_t(r,r=s[2])?(Qe(),v(a,1,1,J),Ue(),a=ct(s),a.c(),b(a,1),a.m(n.parentNode,n)):a.p(s,m)},i(s){t||(b(a),t=!0)},o(s){v(a),t=!1},d(s){s&&i(n),a.d(s)}}}function ct(f){let r,n;return r=new gt({props:{data:f[0],name:f[2],value:"area_code",label:"area_name",order:"stage_number nulls last, area_name, area_code",defaultValue:f[1],title:"Neighbourhood to show"}}),{c(){H(r.$$.fragment)},l(t){B(r.$$.fragment,t)},m(t,a){j(r,t,a),n=!0},p(t,a){const s={};a&1&&(s.data=t[0]),a&4&&(s.name=t[2]),a&2&&(s.defaultValue=t[1]),r.$set(s)},i(t){n||(b(r.$$.fragment,t),n=!0)},o(t){v(r.$$.fragment,t),n=!1},d(t){S(r,t)}}}function Gt(f){let r,n,t="neighbourhood list",a;return{c(){r=K("Pick a district above to see a snapshot of one of its neighbourhoods — each one also has a full profile in the "),n=T("a"),n.textContent=t,a=K("."),this.h()},l(s){r=V(s,"Pick a district above to see a snapshot of one of its neighbourhoods — each one also has a full profile in the "),n=E(s,"A",{href:!0,"data-svelte-h":!0}),Q(n)!=="svelte-1u7pxa1"&&(n.textContent=t),a=V(s,"."),this.h()},h(){$(n,"href","/gentriduck/berlin/area")},m(s,m){d(s,r,m),d(s,n,m),d(s,a,m)},p:J,d(s){s&&(i(r),i(n),i(a))}}}function Wt(f){let r=f[3][0].area_name+"",n,t,a,s,m,o;return{c(){n=K(r),t=K(` is shown because you selected it (or because it is first in the list). Its full profile — social-status trajectory, commercial-mix development,
Offering Advantage, demographics, amenities, and land value/rent — is on its
`),a=T("a"),s=K("canonical area page"),o=K("."),this.h()},l(_){n=V(_,r),t=V(_,` is shown because you selected it (or because it is first in the list). Its full profile — social-status trajectory, commercial-mix development,
Offering Advantage, demographics, amenities, and land value/rent — is on its
`),a=E(_,"A",{href:!0});var x=Te(a);s=V(x,"canonical area page"),x.forEach(i),o=V(_,"."),this.h()},h(){$(a,"href",m="/gentriduck/berlin/area/"+f[3][0].area_code)},m(_,x){d(_,n,x),d(_,t,x),d(_,a,x),ge(a,s),d(_,o,x)},p(_,x){x&8&&r!==(r=_[3][0].area_name+"")&&pt(n,r),x&8&&m!==(m="/gentriduck/berlin/area/"+_[3][0].area_code)&&$(a,"href",m)},d(_){_&&(i(n),i(t),i(a),i(o))}}}function Xt(f){var et;let r,n,t,a,s,m,o,_,x=`For the citywide picture, see the <a href="/gentriduck/berlin/maps" class="markdown">maps page</a> or the
<a href="/gentriduck/berlin/time-series" class="markdown">time-series view</a>. If you already know which neighbourhood you want, the
<a href="/gentriduck/berlin/area" class="markdown">full searchable list</a> is the faster way in. This page covers Berlin; Hamburg has its
own <a href="/gentriduck/hamburg/area-detail" class="markdown">district browse</a>.`,y,A,U,h,W='<a href="#browse-by-district">Browse by district</a>',z,L,M,N,w,G=`Every neighbourhood with a current stage in the selected district, ordered by stage number (1 to
6), then alphabetically. The order shows where each area sits in the cycle, not how urgent it is.
Click a column header to sort differently.`,F,c,k,P,l,C,se,q,te,ae,Y,ee,Ve,ke=(((et=f[3][0])==null?void 0:et.area_name)??"this district")+"",Re,Le,$e,oe,Se,de,je,ue,Be,me,He,he,Me,fe,Ge=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,qe,re,We='<a href="#honest-caveats">Honest caveats</a>',Ae,ce,Xe=`<li class="markdown"><strong class="markdown">These headline figures summarize what the linked area page shows in full</strong> — its charts,
definitions, and caveats (including that a falling status line means an area became <em class="markdown">less</em>
deprived, the signature of gentrification, and that land value/rent are official reference
values, not observed transaction prices) live there, not duplicated here.</li> <li class="markdown">Figures are on Berlin&#39;s <strong class="markdown">current (2021+) boundaries</strong> and the live social-monitoring editions
(2021–2025) only — this page does not show the pre-2021 <code class="markdown">standard</code> variant.</li> <li class="markdown"><strong class="markdown">Neighbourhoods with no stage on record</strong> (no MSS classification in the latest edition, e.g.
uninhabited planning areas) are not listed in the browse table; they still have their own page
in the <a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a>.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,Ne,ie,Ye='<a href="#further-reading">Further reading</a>',ze,_e,Ze=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means, the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> (its &quot;citywide context&quot; section covers these
signals across all of Berlin) for the citywide picture, the <a href="/gentriduck/berlin/time-series" class="markdown">time-series view</a>
for how the whole city has moved, or the <a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a> to search for a
specific area directly.`,Fe,Ce,Ie,be,xe,ne=typeof R<"u"&&R.title&&R.hide_title!==!0&&Ft();function bt(e,u){return typeof R<"u"&&R.title?Ot:It}let Ee=bt()(f),le=typeof R=="object"&&Dt();m=new Tt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Area detail — one neighbourhood, full picture",lede:"Pick a district to compare its neighbourhoods, then see a headline snapshot of any one of them, with a link to its full profile."}}),A=new Bt({props:{status:"info",$$slots:{default:[Qt]},$$scope:{ctx:f}}}),L=new gt({props:{name:"bezirk",title:"District (Bezirk)",defaultValue:"02",$$slots:{default:[Vt]},$$scope:{ctx:f}}});let I=f[0]&&ut(f);c=new St({props:{data:f[0],rows:"10",rowShading:"true",link:"area_link",$$slots:{default:[Kt]},$$scope:{ctx:f}}}),P=new Rt({}),C=new Lt({});let O=f[3]&&mt(f),D=f[4]&&ft(f);oe=new Pe({props:{data:f[3],value:"stage",title:"Current stage",emptySet:"warn"}}),de=new Pe({props:{data:f[3],value:"status_trend",title:"Status trend",emptySet:"warn"}}),ue=new Pe({props:{data:f[3],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),me=new Pe({props:{data:f[3],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}});function Je(e,u){var pe;return(pe=e[3][0])!=null&&pe.area_code?Wt:Gt}let Oe=Je(f),Z=Oe(f);return be=new Et({}),{c(){ne&&ne.c(),r=g(),Ee.c(),n=T("meta"),t=T("meta"),le&&le.c(),a=we(),s=g(),H(m.$$.fragment),o=g(),_=T("p"),_.innerHTML=x,y=g(),H(A.$$.fragment),U=g(),h=T("h2"),h.innerHTML=W,z=g(),H(L.$$.fragment),M=g(),I&&I.c(),N=g(),w=T("p"),w.textContent=G,F=g(),H(c.$$.fragment),k=g(),H(P.$$.fragment),l=g(),H(C.$$.fragment),se=g(),q=T("hr"),te=g(),O&&O.c(),ae=g(),Y=T("h2"),ee=T("a"),Ve=K("Spotlight — "),Re=K(ke),Le=g(),D&&D.c(),$e=g(),H(oe.$$.fragment),Se=g(),H(de.$$.fragment),je=g(),H(ue.$$.fragment),Be=g(),H(me.$$.fragment),He=g(),he=T("p"),Z.c(),Me=g(),fe=T("p"),fe.innerHTML=Ge,qe=g(),re=T("h2"),re.innerHTML=We,Ae=g(),ce=T("ul"),ce.innerHTML=Xe,Ne=g(),ie=T("h2"),ie.innerHTML=Ye,ze=g(),_e=T("p"),_e.innerHTML=Ze,Fe=g(),Ce=T("hr"),Ie=g(),H(be.$$.fragment),this.h()},l(e){ne&&ne.l(e),r=p(e);const u=$t("svelte-2igo1p",document.head);Ee.l(u),n=E(u,"META",{name:!0,content:!0}),t=E(u,"META",{name:!0,content:!0}),le&&le.l(u),a=we(),u.forEach(i),s=p(e),B(m.$$.fragment,e),o=p(e),_=E(e,"P",{class:!0,"data-svelte-h":!0}),Q(_)!=="svelte-1fddobo"&&(_.innerHTML=x),y=p(e),B(A.$$.fragment,e),U=p(e),h=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(h)!=="svelte-1a89xm1"&&(h.innerHTML=W),z=p(e),B(L.$$.fragment,e),M=p(e),I&&I.l(e),N=p(e),w=E(e,"P",{class:!0,"data-svelte-h":!0}),Q(w)!=="svelte-1c4gwbq"&&(w.textContent=G),F=p(e),B(c.$$.fragment,e),k=p(e),B(P.$$.fragment,e),l=p(e),B(C.$$.fragment,e),se=p(e),q=E(e,"HR",{class:!0}),te=p(e),O&&O.l(e),ae=p(e),Y=E(e,"H2",{class:!0,id:!0});var pe=Te(Y);ee=E(pe,"A",{href:!0});var ye=Te(ee);Ve=V(ye,"Spotlight — "),Re=V(ye,ke),ye.forEach(i),pe.forEach(i),Le=p(e),D&&D.l(e),$e=p(e),B(oe.$$.fragment,e),Se=p(e),B(de.$$.fragment,e),je=p(e),B(ue.$$.fragment,e),Be=p(e),B(me.$$.fragment,e),He=p(e),he=E(e,"P",{});var ve=Te(he);Z.l(ve),ve.forEach(i),Me=p(e),fe=E(e,"P",{class:!0,"data-svelte-h":!0}),Q(fe)!=="svelte-dvqlbe"&&(fe.innerHTML=Ge),qe=p(e),re=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(re)!=="svelte-ad0syq"&&(re.innerHTML=We),Ae=p(e),ce=E(e,"UL",{class:!0,"data-svelte-h":!0}),Q(ce)!=="svelte-qaq7a5"&&(ce.innerHTML=Xe),Ne=p(e),ie=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(ie)!=="svelte-oimjns"&&(ie.innerHTML=Ye),ze=p(e),_e=E(e,"P",{class:!0,"data-svelte-h":!0}),Q(_e)!=="svelte-1uqo22p"&&(_e.innerHTML=Ze),Fe=p(e),Ce=E(e,"HR",{class:!0}),Ie=p(e),B(be.$$.fragment,e),this.h()},h(){$(n,"name","twitter:card"),$(n,"content","summary_large_image"),$(t,"name","twitter:site"),$(t,"content","@evidence_dev"),$(_,"class","markdown"),$(h,"class","markdown"),$(h,"id","browse-by-district"),$(w,"class","markdown"),$(q,"class","markdown"),$(ee,"href","#spotlight--spotlight0area_name--this-district"),$(Y,"class","markdown"),$(Y,"id","spotlight--spotlight0area_name--this-district"),$(fe,"class","markdown"),$(re,"class","markdown"),$(re,"id","honest-caveats"),$(ce,"class","markdown"),$(ie,"class","markdown"),$(ie,"id","further-reading"),$(_e,"class","markdown"),$(Ce,"class","markdown")},m(e,u){ne&&ne.m(e,u),d(e,r,u),Ee.m(document.head,null),ge(document.head,n),ge(document.head,t),le&&le.m(document.head,null),ge(document.head,a),d(e,s,u),j(m,e,u),d(e,o,u),d(e,_,u),d(e,y,u),j(A,e,u),d(e,U,u),d(e,h,u),d(e,z,u),j(L,e,u),d(e,M,u),I&&I.m(e,u),d(e,N,u),d(e,w,u),d(e,F,u),j(c,e,u),d(e,k,u),j(P,e,u),d(e,l,u),j(C,e,u),d(e,se,u),d(e,q,u),d(e,te,u),O&&O.m(e,u),d(e,ae,u),d(e,Y,u),ge(Y,ee),ge(ee,Ve),ge(ee,Re),d(e,Le,u),D&&D.m(e,u),d(e,$e,u),j(oe,e,u),d(e,Se,u),j(de,e,u),d(e,je,u),j(ue,e,u),d(e,Be,u),j(me,e,u),d(e,He,u),d(e,he,u),Z.m(he,null),d(e,Me,u),d(e,fe,u),d(e,qe,u),d(e,re,u),d(e,Ae,u),d(e,ce,u),d(e,Ne,u),d(e,ie,u),d(e,ze,u),d(e,_e,u),d(e,Fe,u),d(e,Ce,u),d(e,Ie,u),j(be,e,u),xe=!0},p(e,[u]){var nt;typeof R<"u"&&R.title&&R.hide_title!==!0&&ne.p(e,u),Ee.p(e,u),typeof R=="object"&&le.p(e,u);const pe={};u&268435456&&(pe.$$scope={dirty:u,ctx:e}),A.$set(pe);const ye={};u&268435456&&(ye.$$scope={dirty:u,ctx:e}),L.$set(ye),e[0]?I?(I.p(e,u),u&1&&b(I,1)):(I=ut(e),I.c(),b(I,1),I.m(N.parentNode,N)):I&&(Qe(),v(I,1,1,()=>{I=null}),Ue());const ve={};u&1&&(ve.data=e[0]),u&268435456&&(ve.$$scope={dirty:u,ctx:e}),c.$set(ve),e[3]?O?(O.p(e,u),u&8&&b(O,1)):(O=mt(e),O.c(),b(O,1),O.m(ae.parentNode,ae)):O&&(Qe(),v(O,1,1,()=>{O=null}),Ue()),(!xe||u&8)&&ke!==(ke=(((nt=e[3][0])==null?void 0:nt.area_name)??"this district")+"")&&pt(Re,ke),e[4]?D?(D.p(e,u),u&16&&b(D,1)):(D=ft(e),D.c(),b(D,1),D.m($e.parentNode,$e)):D&&(Qe(),v(D,1,1,()=>{D=null}),Ue());const tt={};u&8&&(tt.data=e[3]),oe.$set(tt);const at={};u&8&&(at.data=e[3]),de.$set(at);const rt={};u&8&&(rt.data=e[3]),ue.$set(rt);const it={};u&8&&(it.data=e[3]),me.$set(it),Oe===(Oe=Je(e))&&Z?Z.p(e,u):(Z.d(1),Z=Oe(e),Z&&(Z.c(),Z.m(he,null)))},i(e){xe||(b(m.$$.fragment,e),b(A.$$.fragment,e),b(L.$$.fragment,e),b(I),b(c.$$.fragment,e),b(P.$$.fragment,e),b(C.$$.fragment,e),b(O),b(D),b(oe.$$.fragment,e),b(de.$$.fragment,e),b(ue.$$.fragment,e),b(me.$$.fragment,e),b(be.$$.fragment,e),xe=!0)},o(e){v(m.$$.fragment,e),v(A.$$.fragment,e),v(L.$$.fragment,e),v(I),v(c.$$.fragment,e),v(P.$$.fragment,e),v(C.$$.fragment,e),v(O),v(D),v(oe.$$.fragment,e),v(de.$$.fragment,e),v(ue.$$.fragment,e),v(me.$$.fragment,e),v(be.$$.fragment,e),xe=!1},d(e){e&&(i(r),i(s),i(o),i(_),i(y),i(U),i(h),i(z),i(M),i(N),i(w),i(F),i(k),i(l),i(se),i(q),i(te),i(ae),i(Y),i(Le),i($e),i(Se),i(je),i(Be),i(He),i(he),i(Me),i(fe),i(qe),i(re),i(Ae),i(ce),i(Ne),i(ie),i(ze),i(_e),i(Fe),i(Ce),i(Ie)),ne&&ne.d(e),Ee.d(e),i(n),i(t),le&&le.d(e),i(a),S(m,e),S(A,e),S(L,e),I&&I.d(e),S(c,e),S(P,e),S(C,e),O&&O.d(e),D&&D.d(e),S(oe,e),S(de,e),S(ue,e),S(me,e),Z.d(),S(be,e)}}}const R={title:"Area detail — neighbourhood drill-down"};function Yt(f,r,n){let t,a,s,m,o,_;lt(f,Nt,q=>n(17,o=q)),lt(f,dt,q=>n(22,_=q));let{data:x}=r,{data:y={},customFormattingSettings:A,__db:U,inputs:h}=x;yt(dt,_="6e7c0860b566363338e0d48a2d265b99",_);let W=Ht(jt(h));vt(W.subscribe(q=>n(7,h=q))),wt(At,{getCustomFormats:()=>A.customFormats||[]});const z=(q,te)=>zt(U.query,q,{query_name:te});Mt(z),o.params,kt(()=>!0);let L={initialData:void 0,initialError:void 0},M=De`-- #358: stage_label / status_trend come from gentrification_index (live_data only, spec §1-§2);
-- default order is the cycle position (stage_number, NULLs last), then name, then code as a
-- deterministic tie-break (spec §3). Only areas with a current stage are listed (spec §5 wording).
select
    area_code,
    area_name,
    -- which district this result belongs to, so the spotlight picker below only mounts once the
    -- result for the CURRENT district has loaded (its default is this result's first row).
    '${h.bezirk.value}' as district_code,
    stage_number,
    stage_label as stage,
    status_trend,
    -- Exact-code drill-down (#150): every area is one click from its full page, not just the
    -- spotlight below. I2 (#219): area moved under /berlin/area.
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(area_code, 1, 2) = '${h.bezirk.value}'
  and stage_number is not null
order by stage_number nulls last, area_name, area_code`,N=`-- #358: stage_label / status_trend come from gentrification_index (live_data only, spec §1-§2);
-- default order is the cycle position (stage_number, NULLs last), then name, then code as a
-- deterministic tie-break (spec §3). Only areas with a current stage are listed (spec §5 wording).
select
    area_code,
    area_name,
    -- which district this result belongs to, so the spotlight picker below only mounts once the
    -- result for the CURRENT district has loaded (its default is this result's first row).
    '${h.bezirk.value}' as district_code,
    stage_number,
    stage_label as stage,
    status_trend,
    -- Exact-code drill-down (#150): every area is one click from its full page, not just the
    -- spotlight below. I2 (#219): area moved under /berlin/area.
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(area_code, 1, 2) = '${h.bezirk.value}'
  and stage_number is not null
order by stage_number nulls last, area_name, area_code`;y.browse_data&&(y.browse_data instanceof Error?L.initialError=y.browse_data:L.initialData=y.browse_data,y.browse_columns&&(L.knownColumns=y.browse_columns));let w,G=!1;const F=st.createReactive({callback:q=>{n(0,w=q)},execFn:z},{id:"browse",...L});F(N,{noResolve:M,...L}),globalThis[Symbol.for("browse")]={get value(){return w}};let c={initialData:void 0,initialError:void 0},k=De`select
    g.area_code,
    g.area_name,
    g.stage_label as stage,
    g.status_trend,
    t.trajectory_type,
    t.trajectory_confidence
from gentriduck_marts.gentrification_index as g
left join gentriduck_marts.fct_gentrification_trajectory as t
    on t.city_code = g.city_code and t.area_vintage = 'lor_2021' and t.area_code = g.area_code
where g.variant = 'live_data' and g.area_level = 'plr' and g.city_code = 'BER'
  and g.period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(g.area_code, 1, 2) = '${h.bezirk.value}'
  and g.stage_number is not null
-- #358: the reader's pick if it is in this district, otherwise the table's first row.
order by (g.area_code = '${a}') desc, g.stage_number nulls last, g.area_name, g.area_code
limit 1`,P=`select
    g.area_code,
    g.area_name,
    g.stage_label as stage,
    g.status_trend,
    t.trajectory_type,
    t.trajectory_confidence
from gentriduck_marts.gentrification_index as g
left join gentriduck_marts.fct_gentrification_trajectory as t
    on t.city_code = g.city_code and t.area_vintage = 'lor_2021' and t.area_code = g.area_code
where g.variant = 'live_data' and g.area_level = 'plr' and g.city_code = 'BER'
  and g.period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(g.area_code, 1, 2) = '${h.bezirk.value}'
  and g.stage_number is not null
-- #358: the reader's pick if it is in this district, otherwise the table's first row.
order by (g.area_code = '${a}') desc, g.stage_number nulls last, g.area_name, g.area_code
limit 1`;y.spotlight_data&&(y.spotlight_data instanceof Error?c.initialError=y.spotlight_data:c.initialData=y.spotlight_data,y.spotlight_columns&&(c.knownColumns=y.spotlight_columns));let l,C=!1;const se=st.createReactive({callback:q=>{n(3,l=q)},execFn:z},{id:"spotlight",...c});return se(P,{noResolve:k,...c}),globalThis[Symbol.for("spotlight")]={get value(){return l}},f.$$set=q=>{"data"in q&&n(5,x=q.data)},f.$$.update=()=>{var q,te,ae,Y,ee;f.$$.dirty&32&&n(6,{data:y={},customFormattingSettings:A,__db:U}=x,y),f.$$.dirty&64&&qt.set(Object.keys(y).length>0),f.$$.dirty&131072&&o.params,f.$$.dirty&128&&n(9,M=De`-- #358: stage_label / status_trend come from gentrification_index (live_data only, spec §1-§2);
-- default order is the cycle position (stage_number, NULLs last), then name, then code as a
-- deterministic tie-break (spec §3). Only areas with a current stage are listed (spec §5 wording).
select
    area_code,
    area_name,
    -- which district this result belongs to, so the spotlight picker below only mounts once the
    -- result for the CURRENT district has loaded (its default is this result's first row).
    '${h.bezirk.value}' as district_code,
    stage_number,
    stage_label as stage,
    status_trend,
    -- Exact-code drill-down (#150): every area is one click from its full page, not just the
    -- spotlight below. I2 (#219): area moved under /berlin/area.
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(area_code, 1, 2) = '${h.bezirk.value}'
  and stage_number is not null
order by stage_number nulls last, area_name, area_code`),f.$$.dirty&128&&n(10,N=`-- #358: stage_label / status_trend come from gentrification_index (live_data only, spec §1-§2);
-- default order is the cycle position (stage_number, NULLs last), then name, then code as a
-- deterministic tie-break (spec §3). Only areas with a current stage are listed (spec §5 wording).
select
    area_code,
    area_name,
    -- which district this result belongs to, so the spotlight picker below only mounts once the
    -- result for the CURRENT district has loaded (its default is this result's first row).
    '${h.bezirk.value}' as district_code,
    stage_number,
    stage_label as stage,
    status_trend,
    -- Exact-code drill-down (#150): every area is one click from its full page, not just the
    -- spotlight below. I2 (#219): area moved under /berlin/area.
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(area_code, 1, 2) = '${h.bezirk.value}'
  and stage_number is not null
order by stage_number nulls last, area_name, area_code`),f.$$.dirty&3840&&(M||!G?M||(F(N,{noResolve:M,...L}),n(11,G=!0)):F(N,{noResolve:M})),f.$$.dirty&128&&n(2,t="spot_"+(((q=h.bezirk)==null?void 0:q.value)??"")),f.$$.dirty&132&&n(16,a=String(((te=h[t])==null?void 0:te.value)??"").replaceAll("'","")),f.$$.dirty&65664&&n(13,k=De`select
    g.area_code,
    g.area_name,
    g.stage_label as stage,
    g.status_trend,
    t.trajectory_type,
    t.trajectory_confidence
from gentriduck_marts.gentrification_index as g
left join gentriduck_marts.fct_gentrification_trajectory as t
    on t.city_code = g.city_code and t.area_vintage = 'lor_2021' and t.area_code = g.area_code
where g.variant = 'live_data' and g.area_level = 'plr' and g.city_code = 'BER'
  and g.period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(g.area_code, 1, 2) = '${h.bezirk.value}'
  and g.stage_number is not null
-- #358: the reader's pick if it is in this district, otherwise the table's first row.
order by (g.area_code = '${a}') desc, g.stage_number nulls last, g.area_name, g.area_code
limit 1`),f.$$.dirty&65664&&n(14,P=`select
    g.area_code,
    g.area_name,
    g.stage_label as stage,
    g.status_trend,
    t.trajectory_type,
    t.trajectory_confidence
from gentriduck_marts.gentrification_index as g
left join gentriduck_marts.fct_gentrification_trajectory as t
    on t.city_code = g.city_code and t.area_vintage = 'lor_2021' and t.area_code = g.area_code
where g.variant = 'live_data' and g.area_level = 'plr' and g.city_code = 'BER'
  and g.period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  )
  and substr(g.area_code, 1, 2) = '${h.bezirk.value}'
  and g.stage_number is not null
-- #358: the reader's pick if it is in this district, otherwise the table's first row.
order by (g.area_code = '${a}') desc, g.stage_number nulls last, g.area_name, g.area_code
limit 1`),f.$$.dirty&61440&&(k||!C?k||(se(P,{noResolve:k,...c}),n(15,C=!0)):se(P,{noResolve:k})),f.$$.dirty&1&&n(1,s=(ae=w==null?void 0:w[0])==null?void 0:ae.area_code),f.$$.dirty&131&&n(4,m=!!s&&((Y=w==null?void 0:w[0])==null?void 0:Y.district_code)===((ee=h.bezirk)==null?void 0:ee.value))},[w,s,t,l,m,x,y,h,L,M,N,G,c,k,P,C,a,o]}class pa extends Ct{constructor(r){super(),xt(this,r,Yt,Xt,_t,{data:5})}}export{pa as component};
