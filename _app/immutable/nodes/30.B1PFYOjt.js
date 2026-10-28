import{s as vt,d as r,i as s,a as Ue,b as T,c,h as wt,e as B,f as ze,k as z,l as $,m as G,n as _t,o as kt,p as Ht,q as Ct,r as St,u as me,j as ie,t as re,g as At}from"../chunks/scheduler.CmMeO4ay.js";import{S as Mt,i as Ot,d as v,t as y,a as b,c as We,m as w,b as k,e as H,g as je}from"../chunks/index.bfDa0Uqw.js";import{F as Tt}from"../chunks/FooterNav.BbND9dxm.js";import{H as Lt}from"../chunks/Hero.wYia6TQ0.js";import{P as qt}from"../chunks/PolygonMap.CTN86heI.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as ge,w as xt}from"../chunks/entry.vKQYRLhF.js";import{A as qe}from"../chunks/Alert.BNZjDqvU.js";import{e as Rt,s as Bt,Q as Ve,p as Gt,a as ut,r as ft,C as It}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as Ce}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as Xe,a as E}from"../chunks/Dropdown.zhownQxu.js";import{B as Et,a as ct}from"../chunks/ButtonGroup.pUeJH1df.js";import{p as Dt}from"../chunks/stores.CGa44sBH.js";import{Q as Qe}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as Pt}from"../chunks/BarChart.BZFK7Gke.js";import{L as Ft}from"../chunks/LineChart.Dkgv3PwH.js";import{p as Nt}from"../chunks/profile.BW8tN6E9.js";function Wt(d){let n,o=F.title+"",a;return{c(){n=G("h1"),a=re(o),this.h()},l(l){n=B(l,"H1",{class:!0});var i=At(n);a=ie(i,o),i.forEach(r),this.h()},h(){T(n,"class","title")},m(l,i){s(l,n,i),Ue(n,a)},p:me,d(l){l&&r(n)}}}function jt(d){return{c(){this.h()},l(n){this.h()},h(){document.title="Evidence"},m:me,p:me,d:me}}function Vt(d){let n,o,a,l,i;return document.title=n=F.title,{c(){o=$(),a=G("meta"),l=$(),i=G("meta"),this.h()},l(u){o=c(u),a=B(u,"META",{property:!0,content:!0}),l=c(u),i=B(u,"META",{name:!0,content:!0}),this.h()},h(){var u,_;T(a,"property","og:title"),T(a,"content",((u=F.og)==null?void 0:u.title)??F.title),T(i,"name","twitter:title"),T(i,"content",((_=F.og)==null?void 0:_.title)??F.title)},m(u,_){s(u,o,_),s(u,a,_),s(u,l,_),s(u,i,_)},p(u,_){_&0&&n!==(n=F.title)&&(document.title=n)},d(u){u&&(r(o),r(a),r(l),r(i))}}}function Ut(d){var i,u;let n,o,a=(F.description||((i=F.og)==null?void 0:i.description))&&zt(),l=((u=F.og)==null?void 0:u.image)&&Qt();return{c(){a&&a.c(),n=$(),l&&l.c(),o=ze()},l(_){a&&a.l(_),n=c(_),l&&l.l(_),o=ze()},m(_,f){a&&a.m(_,f),s(_,n,f),l&&l.m(_,f),s(_,o,f)},p(_,f){var O,L;(F.description||(O=F.og)!=null&&O.description)&&a.p(_,f),(L=F.og)!=null&&L.image&&l.p(_,f)},d(_){_&&(r(n),r(o)),a&&a.d(_),l&&l.d(_)}}}function zt(d){let n,o,a,l,i;return{c(){n=G("meta"),o=$(),a=G("meta"),l=$(),i=G("meta"),this.h()},l(u){n=B(u,"META",{name:!0,content:!0}),o=c(u),a=B(u,"META",{property:!0,content:!0}),l=c(u),i=B(u,"META",{name:!0,content:!0}),this.h()},h(){var u,_,f;T(n,"name","description"),T(n,"content",F.description??((u=F.og)==null?void 0:u.description)),T(a,"property","og:description"),T(a,"content",((_=F.og)==null?void 0:_.description)??F.description),T(i,"name","twitter:description"),T(i,"content",((f=F.og)==null?void 0:f.description)??F.description)},m(u,_){s(u,n,_),s(u,o,_),s(u,a,_),s(u,l,_),s(u,i,_)},p:me,d(u){u&&(r(n),r(o),r(a),r(l),r(i))}}}function Qt(d){let n,o,a;return{c(){n=G("meta"),o=$(),a=G("meta"),this.h()},l(l){n=B(l,"META",{property:!0,content:!0}),o=c(l),a=B(l,"META",{name:!0,content:!0}),this.h()},h(){var l,i;T(n,"property","og:image"),T(n,"content",ut((l=F.og)==null?void 0:l.image)),T(a,"name","twitter:image"),T(a,"content",ut((i=F.og)==null?void 0:i.image))},m(l,i){s(l,n,i),s(l,o,i),s(l,a,i)},p:me,d(l){l&&(r(n),r(o),r(a))}}}function Yt(d){let n,o="How to read this:",a,l,i="OA = 1.0",u,_,f="above 1.0",O,L,C="below 1.0",j,h,I="Density",q,W,D='"Stock vs. development"',Q,R,V='"Change since previous year"',x,N,P="methodology §6",Y;return{c(){n=G("b"),n.textContent=o,a=$(),l=G("b"),l.textContent=i,u=re(` means an area has exactly the Hamburg-wide average share
  of a POI domain; `),_=G("b"),_.textContent=f,O=re(" means that domain is over-represented there, "),L=G("b"),L.textContent=C,j=re(`
  means under-represented. `),h=G("b"),h.textContent=I,q=re(` is simply mapped-place count per km². Switch
  `),W=G("b"),W.textContent=D,Q=re(" to "),R=G("b"),R.textContent=V,x=re(` to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see `),N=G("a"),N.textContent=P,Y=re(`'s structural rule against pooled
  cross-city comparison).`),this.h()},l(g){n=B(g,"B",{"data-svelte-h":!0}),z(n)!=="svelte-1d2ahpj"&&(n.textContent=o),a=c(g),l=B(g,"B",{"data-svelte-h":!0}),z(l)!=="svelte-17c8v7u"&&(l.textContent=i),u=ie(g,` means an area has exactly the Hamburg-wide average share
  of a POI domain; `),_=B(g,"B",{"data-svelte-h":!0}),z(_)!=="svelte-11ia4c8"&&(_.textContent=f),O=ie(g," means that domain is over-represented there, "),L=B(g,"B",{"data-svelte-h":!0}),z(L)!=="svelte-1m0m3gk"&&(L.textContent=C),j=ie(g,`
  means under-represented. `),h=B(g,"B",{"data-svelte-h":!0}),z(h)!=="svelte-uzvr2g"&&(h.textContent=I),q=ie(g,` is simply mapped-place count per km². Switch
  `),W=B(g,"B",{"data-svelte-h":!0}),z(W)!=="svelte-17y0108"&&(W.textContent=D),Q=ie(g," to "),R=B(g,"B",{"data-svelte-h":!0}),z(R)!=="svelte-t4tx04"&&(R.textContent=V),x=ie(g,` to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see `),N=B(g,"A",{href:!0,"data-svelte-h":!0}),z(N)!=="svelte-fe16dh"&&(N.textContent=P),Y=ie(g,`'s structural rule against pooled
  cross-city comparison).`),this.h()},h(){T(N,"href","/gentriduck/methodology")},m(g,M){s(g,n,M),s(g,a,M),s(g,l,M),s(g,u,M),s(g,_,M),s(g,O,M),s(g,L,M),s(g,j,M),s(g,h,M),s(g,q,M),s(g,W,M),s(g,Q,M),s(g,R,M),s(g,x,M),s(g,N,M),s(g,Y,M)},p:me,d(g){g&&(r(n),r(a),r(l),r(u),r(_),r(O),r(L),r(j),r(h),r(q),r(W),r(Q),r(R),r(x),r(N),r(Y))}}}function Xt(d){let n,o="Gebiet names are labels, and thinly-mapped Gebiete are hatched grey.",a,l,i=`gentrification
  map`,u,_,f=`OSM's mapping coverage is not spatially neutral: completeness tends to correlate with
  area advantage, and poorer/peripheral areas are typically less thoroughly mapped than
  richer/central ones`,O,L,C="Berlin POI map",j;return{c(){n=G("b"),n.textContent=o,a=re(` Hamburg's
  statistische Gebiete carry only a numeric code, so each is labelled by its Stadtteil plus an
  OpenStreetMap neighbourhood name or its code (see the `),l=G("a"),l.textContent=i,u=re(`); hover any area for its label. Offering Advantage is a compositional ratio (a
  location quotient) — in a Gebiet-year with very few mapped places overall, a single new or
  removed business can swing its Offering Advantage value disproportionately, so Gebiet-years
  below the same minimum-mapped-place threshold used for Berlin are shown as a hatched grey "No data" area rather
  than a potentially misleading value; the raw mapped-place count is always visible in the
  tooltip. `),_=G("b"),_.textContent=f,O=re(` (Haklay, M. 2010, "How Good is Volunteered Geographical Information?",
  *Environment and Planning B*). So a blank Gebiet-year can reflect an OSM coverage gap rather than
  a real absence of commercial activity — please don't read it as evidence that nothing is
  happening there. Hamburg's own affluent Alster–Elbe axis against a deprived eastern/southern
  periphery is a sharper socio-spatial divide than Berlin's more mosaic pattern, so this
  cross-sectional under-mapping gradient may be even steeper here (see the
  `),L=G("a"),L.textContent=C,j=re(" for the same caveat applied there)."),this.h()},l(h){n=B(h,"B",{"data-svelte-h":!0}),z(n)!=="svelte-11ez0f9"&&(n.textContent=o),a=ie(h,` Hamburg's
  statistische Gebiete carry only a numeric code, so each is labelled by its Stadtteil plus an
  OpenStreetMap neighbourhood name or its code (see the `),l=B(h,"A",{href:!0,"data-svelte-h":!0}),z(l)!=="svelte-195e3sq"&&(l.textContent=i),u=ie(h,`); hover any area for its label. Offering Advantage is a compositional ratio (a
  location quotient) — in a Gebiet-year with very few mapped places overall, a single new or
  removed business can swing its Offering Advantage value disproportionately, so Gebiet-years
  below the same minimum-mapped-place threshold used for Berlin are shown as a hatched grey "No data" area rather
  than a potentially misleading value; the raw mapped-place count is always visible in the
  tooltip. `),_=B(h,"B",{"data-svelte-h":!0}),z(_)!=="svelte-1k67crw"&&(_.textContent=f),O=ie(h,` (Haklay, M. 2010, "How Good is Volunteered Geographical Information?",
  *Environment and Planning B*). So a blank Gebiet-year can reflect an OSM coverage gap rather than
  a real absence of commercial activity — please don't read it as evidence that nothing is
  happening there. Hamburg's own affluent Alster–Elbe axis against a deprived eastern/southern
  periphery is a sharper socio-spatial divide than Berlin's more mosaic pattern, so this
  cross-sectional under-mapping gradient may be even steeper here (see the
  `),L=B(h,"A",{href:!0,"data-svelte-h":!0}),z(L)!=="svelte-1iq2t0m"&&(L.textContent=C),j=ie(h," for the same caveat applied there)."),this.h()},h(){T(l,"href","/gentriduck/hamburg/maps"),T(L,"href","/gentriduck/berlin/poi-map")},m(h,I){s(h,n,I),s(h,a,I),s(h,l,I),s(h,u,I),s(h,_,I),s(h,O,I),s(h,L,I),s(h,j,I)},p:me,d(h){h&&(r(n),r(a),r(l),r(u),r(_),r(O),r(L),r(j))}}}function Jt(d){let n,o,a,l;return n=new E({props:{value:"density",valueLabel:"POI density (mapped places per km²)"}}),a=new E({props:{value:"oa",valueLabel:"Offering Advantage (location quotient vs. Hamburg-wide average)"}}),{c(){H(n.$$.fragment),o=$(),H(a.$$.fragment)},l(i){k(n.$$.fragment,i),o=c(i),k(a.$$.fragment,i)},m(i,u){w(n,i,u),s(i,o,u),w(a,i,u),l=!0},p:me,i(i){l||(b(n.$$.fragment,i),b(a.$$.fragment,i),l=!0)},o(i){y(n.$$.fragment,i),y(a.$$.fragment,i),l=!1},d(i){i&&r(o),v(n,i),v(a,i)}}}function Kt(d){let n,o,a,l,i,u,_,f,O,L,C,j,h,I,q,W,D,Q,R,V,x,N,P,Y,g,M;return n=new E({props:{value:"Entertainment",valueLabel:"Entertainment"}}),a=new E({props:{value:"Gastronomy",valueLabel:"Gastronomy"}}),i=new E({props:{value:"Mobility",valueLabel:"Mobility"}}),_=new E({props:{value:"Office",valueLabel:"Office"}}),O=new E({props:{value:"Other",valueLabel:"Other"}}),C=new E({props:{value:"Public Service",valueLabel:"Public Service"}}),h=new E({props:{value:"Public Space",valueLabel:"Public Space"}}),q=new E({props:{value:"Religion",valueLabel:"Religion"}}),D=new E({props:{value:"Retail",valueLabel:"Retail"}}),R=new E({props:{value:"Services",valueLabel:"Services"}}),x=new E({props:{value:"Sports and Recreation",valueLabel:"Sports and Recreation"}}),P=new E({props:{value:"Tourism",valueLabel:"Tourism"}}),g=new E({props:{value:"Vacancy",valueLabel:"Vacancy"}}),{c(){H(n.$$.fragment),o=$(),H(a.$$.fragment),l=$(),H(i.$$.fragment),u=$(),H(_.$$.fragment),f=$(),H(O.$$.fragment),L=$(),H(C.$$.fragment),j=$(),H(h.$$.fragment),I=$(),H(q.$$.fragment),W=$(),H(D.$$.fragment),Q=$(),H(R.$$.fragment),V=$(),H(x.$$.fragment),N=$(),H(P.$$.fragment),Y=$(),H(g.$$.fragment)},l(m){k(n.$$.fragment,m),o=c(m),k(a.$$.fragment,m),l=c(m),k(i.$$.fragment,m),u=c(m),k(_.$$.fragment,m),f=c(m),k(O.$$.fragment,m),L=c(m),k(C.$$.fragment,m),j=c(m),k(h.$$.fragment,m),I=c(m),k(q.$$.fragment,m),W=c(m),k(D.$$.fragment,m),Q=c(m),k(R.$$.fragment,m),V=c(m),k(x.$$.fragment,m),N=c(m),k(P.$$.fragment,m),Y=c(m),k(g.$$.fragment,m)},m(m,S){w(n,m,S),s(m,o,S),w(a,m,S),s(m,l,S),w(i,m,S),s(m,u,S),w(_,m,S),s(m,f,S),w(O,m,S),s(m,L,S),w(C,m,S),s(m,j,S),w(h,m,S),s(m,I,S),w(q,m,S),s(m,W,S),w(D,m,S),s(m,Q,S),w(R,m,S),s(m,V,S),w(x,m,S),s(m,N,S),w(P,m,S),s(m,Y,S),w(g,m,S),M=!0},p:me,i(m){M||(b(n.$$.fragment,m),b(a.$$.fragment,m),b(i.$$.fragment,m),b(_.$$.fragment,m),b(O.$$.fragment,m),b(C.$$.fragment,m),b(h.$$.fragment,m),b(q.$$.fragment,m),b(D.$$.fragment,m),b(R.$$.fragment,m),b(x.$$.fragment,m),b(P.$$.fragment,m),b(g.$$.fragment,m),M=!0)},o(m){y(n.$$.fragment,m),y(a.$$.fragment,m),y(i.$$.fragment,m),y(_.$$.fragment,m),y(O.$$.fragment,m),y(C.$$.fragment,m),y(h.$$.fragment,m),y(q.$$.fragment,m),y(D.$$.fragment,m),y(R.$$.fragment,m),y(x.$$.fragment,m),y(P.$$.fragment,m),y(g.$$.fragment,m),M=!1},d(m){m&&(r(o),r(l),r(u),r(f),r(L),r(j),r(I),r(W),r(Q),r(V),r(N),r(Y)),v(n,m),v(a,m),v(i,m),v(_,m),v(O,m),v(C,m),v(h,m),v(q,m),v(D,m),v(R,m),v(x,m),v(P,m),v(g,m)}}}function Zt(d){let n,o,a,l,i,u,_,f,O,L,C,j,h,I,q,W,D,Q,R,V,x,N,P,Y,g,M,m,S,ee,pe,te,ae,U,de,oe,ne,se,le;return n=new E({props:{value:"2008",valueLabel:"2008"}}),a=new E({props:{value:"2009",valueLabel:"2009"}}),i=new E({props:{value:"2010",valueLabel:"2010"}}),_=new E({props:{value:"2011",valueLabel:"2011"}}),O=new E({props:{value:"2012",valueLabel:"2012"}}),C=new E({props:{value:"2013",valueLabel:"2013"}}),h=new E({props:{value:"2014",valueLabel:"2014"}}),q=new E({props:{value:"2015",valueLabel:"2015"}}),D=new E({props:{value:"2016",valueLabel:"2016"}}),R=new E({props:{value:"2017",valueLabel:"2017"}}),x=new E({props:{value:"2018",valueLabel:"2018"}}),P=new E({props:{value:"2019",valueLabel:"2019"}}),g=new E({props:{value:"2020",valueLabel:"2020"}}),m=new E({props:{value:"2021",valueLabel:"2021"}}),ee=new E({props:{value:"2022",valueLabel:"2022"}}),te=new E({props:{value:"2023",valueLabel:"2023"}}),U=new E({props:{value:"2024",valueLabel:"2024"}}),oe=new E({props:{value:"2025",valueLabel:"2025"}}),se=new E({props:{value:"2026",valueLabel:"2026"}}),{c(){H(n.$$.fragment),o=$(),H(a.$$.fragment),l=$(),H(i.$$.fragment),u=$(),H(_.$$.fragment),f=$(),H(O.$$.fragment),L=$(),H(C.$$.fragment),j=$(),H(h.$$.fragment),I=$(),H(q.$$.fragment),W=$(),H(D.$$.fragment),Q=$(),H(R.$$.fragment),V=$(),H(x.$$.fragment),N=$(),H(P.$$.fragment),Y=$(),H(g.$$.fragment),M=$(),H(m.$$.fragment),S=$(),H(ee.$$.fragment),pe=$(),H(te.$$.fragment),ae=$(),H(U.$$.fragment),de=$(),H(oe.$$.fragment),ne=$(),H(se.$$.fragment)},l(t){k(n.$$.fragment,t),o=c(t),k(a.$$.fragment,t),l=c(t),k(i.$$.fragment,t),u=c(t),k(_.$$.fragment,t),f=c(t),k(O.$$.fragment,t),L=c(t),k(C.$$.fragment,t),j=c(t),k(h.$$.fragment,t),I=c(t),k(q.$$.fragment,t),W=c(t),k(D.$$.fragment,t),Q=c(t),k(R.$$.fragment,t),V=c(t),k(x.$$.fragment,t),N=c(t),k(P.$$.fragment,t),Y=c(t),k(g.$$.fragment,t),M=c(t),k(m.$$.fragment,t),S=c(t),k(ee.$$.fragment,t),pe=c(t),k(te.$$.fragment,t),ae=c(t),k(U.$$.fragment,t),de=c(t),k(oe.$$.fragment,t),ne=c(t),k(se.$$.fragment,t)},m(t,A){w(n,t,A),s(t,o,A),w(a,t,A),s(t,l,A),w(i,t,A),s(t,u,A),w(_,t,A),s(t,f,A),w(O,t,A),s(t,L,A),w(C,t,A),s(t,j,A),w(h,t,A),s(t,I,A),w(q,t,A),s(t,W,A),w(D,t,A),s(t,Q,A),w(R,t,A),s(t,V,A),w(x,t,A),s(t,N,A),w(P,t,A),s(t,Y,A),w(g,t,A),s(t,M,A),w(m,t,A),s(t,S,A),w(ee,t,A),s(t,pe,A),w(te,t,A),s(t,ae,A),w(U,t,A),s(t,de,A),w(oe,t,A),s(t,ne,A),w(se,t,A),le=!0},p:me,i(t){le||(b(n.$$.fragment,t),b(a.$$.fragment,t),b(i.$$.fragment,t),b(_.$$.fragment,t),b(O.$$.fragment,t),b(C.$$.fragment,t),b(h.$$.fragment,t),b(q.$$.fragment,t),b(D.$$.fragment,t),b(R.$$.fragment,t),b(x.$$.fragment,t),b(P.$$.fragment,t),b(g.$$.fragment,t),b(m.$$.fragment,t),b(ee.$$.fragment,t),b(te.$$.fragment,t),b(U.$$.fragment,t),b(oe.$$.fragment,t),b(se.$$.fragment,t),le=!0)},o(t){y(n.$$.fragment,t),y(a.$$.fragment,t),y(i.$$.fragment,t),y(_.$$.fragment,t),y(O.$$.fragment,t),y(C.$$.fragment,t),y(h.$$.fragment,t),y(q.$$.fragment,t),y(D.$$.fragment,t),y(R.$$.fragment,t),y(x.$$.fragment,t),y(P.$$.fragment,t),y(g.$$.fragment,t),y(m.$$.fragment,t),y(ee.$$.fragment,t),y(te.$$.fragment,t),y(U.$$.fragment,t),y(oe.$$.fragment,t),y(se.$$.fragment,t),le=!1},d(t){t&&(r(o),r(l),r(u),r(f),r(L),r(j),r(I),r(W),r(Q),r(V),r(N),r(Y),r(M),r(S),r(pe),r(ae),r(de),r(ne)),v(n,t),v(a,t),v(i,t),v(_,t),v(O,t),v(C,t),v(h,t),v(q,t),v(D,t),v(R,t),v(x,t),v(P,t),v(g,t),v(m,t),v(ee,t),v(te,t),v(U,t),v(oe,t),v(se,t)}}}function ea(d){let n,o,a,l;return n=new ct({props:{value:"stock",valueLabel:"Stock (this year's value)",default:!0}}),a=new ct({props:{value:"development",valueLabel:"Change since previous year"}}),{c(){H(n.$$.fragment),o=$(),H(a.$$.fragment)},l(i){k(n.$$.fragment,i),o=c(i),k(a.$$.fragment,i)},m(i,u){w(n,i,u),s(i,o,u),w(a,i,u),l=!0},p:me,i(i){l||(b(n.$$.fragment,i),b(a.$$.fragment,i),l=!0)},o(i){y(n.$$.fragment,i),y(a.$$.fragment,i),l=!1},d(i){i&&r(o),v(n,i),v(a,i)}}}function ta(d){let n,o='"Change since previous year" for POI density is not adjusted for growing OSM coverage.',a;return{c(){n=G("b"),n.textContent=o,a=re(`
  Mapper coverage grew fastest in Hamburg's earliest years (the coverage curve stabilizes only
  around ~2014–2015 — see the citywide growth chart further down this page), so an early-year
  density delta can reflect new OSM contributors catching up rather than real commercial change.
  Offering Advantage's "change" view is less exposed to this: it is a same-year ratio to the
  citywide average, so an area-uniform coverage shift cancels out; density's raw count carries no
  such protection. Read early-year density deltas cautiously, especially before ~2014.`)},l(l){n=B(l,"B",{"data-svelte-h":!0}),z(n)!=="svelte-b5xv1v"&&(n.textContent=o),a=ie(l,`
  Mapper coverage grew fastest in Hamburg's earliest years (the coverage curve stabilizes only
  around ~2014–2015 — see the citywide growth chart further down this page), so an early-year
  density delta can reflect new OSM contributors catching up rather than real commercial change.
  Offering Advantage's "change" view is less exposed to this: it is a same-year ratio to the
  citywide average, so an area-uniform coverage shift cancels out; density's raw count carries no
  such protection. Read early-year density deltas cautiously, especially before ~2014.`)},m(l,i){s(l,n,i),s(l,a,i)},p:me,d(l){l&&(r(n),r(a))}}}function $t(d){let n,o;return n=new Qe({props:{queryID:"poi_map_data",queryResult:d[3]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),o=!0},p(a,l){const i={};l[0]&8&&(i.queryResult=a[3]),n.$set(i)},i(a){o||(b(n.$$.fragment,a),o=!0)},o(a){y(n.$$.fragment,a),o=!1},d(a){v(n,a)}}}function aa(d){let n,o,a="Berlin's equivalent section",l,i,u="the Hamburg data hub",_;return{c(){n=re(`A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  `),o=G("a"),o.textContent=a,l=re(`, there is no land-value/rent chart here:
  Hamburg's price/rent mart now carries narrower-in-kind data (Wohnlage tier composition +
  modelled Mietenspiegel rent, I21-i/#303) than Berlin's, but no chart or section is built from it
  on this page (see `),i=G("a"),i.textContent=u,_=re(")."),this.h()},l(f){n=ie(f,`A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  `),o=B(f,"A",{href:!0,"data-svelte-h":!0}),z(o)!=="svelte-ypxl3v"&&(o.textContent=a),l=ie(f,`, there is no land-value/rent chart here:
  Hamburg's price/rent mart now carries narrower-in-kind data (Wohnlage tier composition +
  modelled Mietenspiegel rent, I21-i/#303) than Berlin's, but no chart or section is built from it
  on this page (see `),i=B(f,"A",{href:!0,"data-svelte-h":!0}),z(i)!=="svelte-rsbj88"&&(i.textContent=u),_=ie(f,")."),this.h()},h(){T(o,"href","/gentriduck/berlin/poi-map"),T(i,"href","/gentriduck/hamburg")},m(f,O){s(f,n,O),s(f,o,O),s(f,l,O),s(f,i,O),s(f,_,O)},p:me,d(f){f&&(r(n),r(o),r(l),r(i),r(_))}}}function bt(d){let n,o;return n=new Qe({props:{queryID:"poi_citywide",queryResult:d[4]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),o=!0},p(a,l){const i={};l[0]&16&&(i.queryResult=a[4]),n.$set(i)},i(a){o||(b(n.$$.fragment,a),o=!0)},o(a){y(n.$$.fragment,a),o=!1},d(a){v(n,a)}}}function na(d){let n;return{c(){n=re(`As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.`)},l(o){n=ie(o,`As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.`)},m(o,a){s(o,n,a)},d(o){o&&r(n)}}}function gt(d){let n,o;return n=new Qe({props:{queryID:"poi_latest_year",queryResult:d[1]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),o=!0},p(a,l){const i={};l[0]&2&&(i.queryResult=a[1]),n.$set(i)},i(a){o||(b(n.$$.fragment,a),o=!0)},o(a){y(n.$$.fragment,a),o=!1},d(a){v(n,a)}}}function yt(d){let n,o;return n=new Qe({props:{queryID:"poi_mix_latest",queryResult:d[5]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),o=!0},p(a,l){const i={};l[0]&32&&(i.queryResult=a[5]),n.$set(i)},i(a){o||(b(n.$$.fragment,a),o=!0)},o(a){y(n.$$.fragment,a),o=!1},d(a){v(n,a)}}}function ia(d){let n,o,a,l,i,u,_,f,O=`This map shows where different kinds of shops, cafés, and other mapped places (&quot;points of
interest,&quot; or POIs) are concentrated across Hamburg — either as raw density, or as
<strong class="markdown">Offering Advantage (OA)</strong>: how over- or under-represented a POI domain is in an area compared
to the citywide (Hamburg-wide) average for that domain. See
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
and <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md" rel="nofollow" class="markdown">ADR-0018</a>
for the full method, or the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for a plain-language walkthrough. This
data does not depend on Hamburg&#39;s gentrification-index admission (H3, #237) — it is a separate,
city-agnostic mart that has carried real Hamburg rows since H1 (#40).`,L,C,j,h,I,q,W,D,Q,R,V,x,N,P,Y,g,M,m,S,ee=`Click a Gebiet on the map to open its profile page, which also shows the Gebiet's full
OA-by-domain profile as a radar chart.`,pe,te,ae,U,de='<a href="#citywide-context-poi-growth">Citywide context: POI growth</a>',oe,ne,se,le,t='<a href="#shops-cafés--amenities-citywide">Shops, cafés &amp; amenities, citywide</a>',A,Ae,ye,xe,he,Re,ue,Je='<a href="#what-kinds-of-places-make-up-that-total-latest-year">What kinds of places make up that total? (latest year)</a>',Be,Me,Oe,ve,Ge,fe,Ke='<a href="#honest-caveats">Honest caveats</a>',Ie,we,Ze=`<li class="markdown"><strong class="markdown">OSM early-year completeness bias</strong> — the citywide POI-growth chart&#39;s early years should be
read cautiously, for the same reason as Berlin&#39;s (see <a href="/gentriduck/methodology" class="markdown">methodology §6</a>).</li> <li class="markdown"><strong class="markdown">Gebiet names are labels, not official names</strong> — Hamburg&#39;s statistische Gebiete have only a
numeric code, so each is shown as its Stadtteil plus an OpenStreetMap neighbourhood name or its
code (see the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a>).</li> <li class="markdown"><strong class="markdown">No land value or rent chart on this page (yet)</strong> — Hamburg&#39;s price/rent mart now carries
narrower-in-kind data than Berlin&#39;s (Wohnlage tier composition + modelled Mietenspiegel rent,
I21-i/#303: no BRW/land-value equivalent, 2-tier not 3-tier Wohnlage, current-state-only), but no
chart or section is built from it on this page.</li> <li class="markdown"><strong class="markdown">Offering Advantage and POI density are commercial-side signals, not the outcome variable</strong> —
see <a href="/gentriduck/methodology" class="markdown">methodology §1</a>.</li> <li class="markdown"><strong class="markdown">Thinly-mapped Gebiete are suppressed, not shown as zero</strong> — same D-3 minimum-mapped-place
threshold as Berlin&#39;s map (#274, ADR-0017 D5 D-3); a blank cell means &quot;too thinly observed,&quot;
never &quot;commercially dead.&quot;</li> <li class="markdown"><strong class="markdown">This map&#39;s Offering Advantage baseline is Hamburg-wide, never pooled with Berlin&#39;s</strong> — see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>&#39;s structural rule against pooled cross-city comparison.</li>`,Ee,ce,et='<a href="#further-reading">Further reading</a>',De,ke,tt=`See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
for how Offering Advantage is computed, the <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg gentrification-pressure map</a>
for the governed D1/D2 outcome, the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory of what is
and isn&#39;t built for Hamburg, or <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for the full
Berlin/Hamburg comparability caveats.`,Pe,Te,Fe,Se,Ne,$e=typeof F<"u"&&F.title&&F.hide_title!==!0&&Wt();function ht(e,p){return typeof F<"u"&&F.title?Vt:jt}let Le=ht()(d),be=typeof F=="object"&&Ut();u=new Lt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"POI & Offering Advantage map",lede:"Where shops, cafés, and other mapped places are concentrated across Hamburg, and how that commercial mix has grown over time — the same Offering Advantage construct used for Berlin, computed independently on Hamburg's own OpenStreetMap history."}}),C=new qe({props:{status:"info",$$slots:{default:[Yt]},$$scope:{ctx:d}}}),h=new qe({props:{status:"warning",$$slots:{default:[Xt]},$$scope:{ctx:d}}}),q=new Xe({props:{name:"metric",title:"Metric",defaultValue:"density",$$slots:{default:[Jt]},$$scope:{ctx:d}}}),D=new Xe({props:{name:"domain",title:"POI domain",defaultValue:"Retail",$$slots:{default:[Kt]},$$scope:{ctx:d}}}),R=new Xe({props:{name:"year",title:"Year",defaultValue:"2025",$$slots:{default:[Zt]},$$scope:{ctx:d}}}),x=new Et({props:{name:"view",title:"Stock vs. development",display:"tabs",defaultValue:"stock",$$slots:{default:[ea]},$$scope:{ctx:d}}}),P=new qe({props:{status:"warning",$$slots:{default:[ta]},$$scope:{ctx:d}}});let X=d[3]&&$t(d);M=new qt({props:{data:d[3],geoJsonUrl:`${ge}/geo/subarea_l2_live_data.geojson`,geoId:"area_code",areaCol:"area_code",value:d[0].metric.value==="density"?d[2]==="stock"?"poi_density_per_km2":"density_delta":d[2]==="stock"?"oa_domain":"oa_delta",legendType:"scalar",colorPalette:d[0].metric.value==="density"&&d[2]==="stock"?void 0:d[7],min:d[0].metric.value==="oa"?d[2]==="stock"?_e(d[3],"oa_domain",1)[0]:_e(d[3],"oa_delta",0)[0]:d[2]==="development"?_e(d[3],"density_delta",0)[0]:void 0,max:d[0].metric.value==="oa"?d[2]==="stock"?_e(d[3],"oa_domain",1)[1]:_e(d[3],"oa_delta",0)[1]:d[2]==="development"?_e(d[3],"density_delta",0)[1]:void 0,title:"Hamburg statistisches Gebiet — "+(d[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+d[0].domain.value+", "+d[0].year.value+(d[2]==="development"?" (change vs. previous year)":""),link:"link",tooltip:d[6],emptyMessage:"No data for this domain/year combination."}}),ne=new qe({props:{status:"info",$$slots:{default:[aa]},$$scope:{ctx:d}}});let J=d[4]&&bt(d);ye=new qe({props:{status:"info",$$slots:{default:[na]},$$scope:{ctx:d}}}),he=new Ft({props:{data:d[4],x:"snapshot_year",y:"poi_count",title:"Total mapped shops, cafés & amenities, city of Hamburg",yAxisTitle:"Number of mapped places"}});let K=d[1]&&gt(d),Z=d[5]&&yt(d);return ve=new Pt({props:{data:d[5],x:"poi_category_h",y:"poi_count",title:"Top 15 categories of mapped places, "+d[1][0].year,yAxisTitle:"Number of mapped places",swapXY:"true"}}),Se=new Tt({}),{c(){$e&&$e.c(),n=$(),Le.c(),o=G("meta"),a=G("meta"),be&&be.c(),l=ze(),i=$(),H(u.$$.fragment),_=$(),f=G("p"),f.innerHTML=O,L=$(),H(C.$$.fragment),j=$(),H(h.$$.fragment),I=$(),H(q.$$.fragment),W=$(),H(D.$$.fragment),Q=$(),H(R.$$.fragment),V=$(),H(x.$$.fragment),N=$(),H(P.$$.fragment),Y=$(),X&&X.c(),g=$(),H(M.$$.fragment),m=$(),S=G("p"),S.textContent=ee,pe=$(),te=G("hr"),ae=$(),U=G("h2"),U.innerHTML=de,oe=$(),H(ne.$$.fragment),se=$(),le=G("h3"),le.innerHTML=t,A=$(),J&&J.c(),Ae=$(),H(ye.$$.fragment),xe=$(),H(he.$$.fragment),Re=$(),ue=G("h4"),ue.innerHTML=Je,Be=$(),K&&K.c(),Me=$(),Z&&Z.c(),Oe=$(),H(ve.$$.fragment),Ge=$(),fe=G("h2"),fe.innerHTML=Ke,Ie=$(),we=G("ul"),we.innerHTML=Ze,Ee=$(),ce=G("h2"),ce.innerHTML=et,De=$(),ke=G("p"),ke.innerHTML=tt,Pe=$(),Te=G("hr"),Fe=$(),H(Se.$$.fragment),this.h()},l(e){$e&&$e.l(e),n=c(e);const p=wt("svelte-2igo1p",document.head);Le.l(p),o=B(p,"META",{name:!0,content:!0}),a=B(p,"META",{name:!0,content:!0}),be&&be.l(p),l=ze(),p.forEach(r),i=c(e),k(u.$$.fragment,e),_=c(e),f=B(e,"P",{class:!0,"data-svelte-h":!0}),z(f)!=="svelte-z6ys4a"&&(f.innerHTML=O),L=c(e),k(C.$$.fragment,e),j=c(e),k(h.$$.fragment,e),I=c(e),k(q.$$.fragment,e),W=c(e),k(D.$$.fragment,e),Q=c(e),k(R.$$.fragment,e),V=c(e),k(x.$$.fragment,e),N=c(e),k(P.$$.fragment,e),Y=c(e),X&&X.l(e),g=c(e),k(M.$$.fragment,e),m=c(e),S=B(e,"P",{class:!0,"data-svelte-h":!0}),z(S)!=="svelte-bb6c1d"&&(S.textContent=ee),pe=c(e),te=B(e,"HR",{class:!0}),ae=c(e),U=B(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),z(U)!=="svelte-1aivtag"&&(U.innerHTML=de),oe=c(e),k(ne.$$.fragment,e),se=c(e),le=B(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),z(le)!=="svelte-1pe5ai8"&&(le.innerHTML=t),A=c(e),J&&J.l(e),Ae=c(e),k(ye.$$.fragment,e),xe=c(e),k(he.$$.fragment,e),Re=c(e),ue=B(e,"H4",{class:!0,id:!0,"data-svelte-h":!0}),z(ue)!=="svelte-1mnfgmg"&&(ue.innerHTML=Je),Be=c(e),K&&K.l(e),Me=c(e),Z&&Z.l(e),Oe=c(e),k(ve.$$.fragment,e),Ge=c(e),fe=B(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),z(fe)!=="svelte-ad0syq"&&(fe.innerHTML=Ke),Ie=c(e),we=B(e,"UL",{class:!0,"data-svelte-h":!0}),z(we)!=="svelte-ap0m4m"&&(we.innerHTML=Ze),Ee=c(e),ce=B(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),z(ce)!=="svelte-oimjns"&&(ce.innerHTML=et),De=c(e),ke=B(e,"P",{class:!0,"data-svelte-h":!0}),z(ke)!=="svelte-1k280vd"&&(ke.innerHTML=tt),Pe=c(e),Te=B(e,"HR",{class:!0}),Fe=c(e),k(Se.$$.fragment,e),this.h()},h(){T(o,"name","twitter:card"),T(o,"content","summary_large_image"),T(a,"name","twitter:site"),T(a,"content","@evidence_dev"),T(f,"class","markdown"),T(S,"class","markdown"),T(te,"class","markdown"),T(U,"class","markdown"),T(U,"id","citywide-context-poi-growth"),T(le,"class","markdown"),T(le,"id","shops-cafés--amenities-citywide"),T(ue,"class","markdown"),T(ue,"id","what-kinds-of-places-make-up-that-total-latest-year"),T(fe,"class","markdown"),T(fe,"id","honest-caveats"),T(we,"class","markdown"),T(ce,"class","markdown"),T(ce,"id","further-reading"),T(ke,"class","markdown"),T(Te,"class","markdown")},m(e,p){$e&&$e.m(e,p),s(e,n,p),Le.m(document.head,null),Ue(document.head,o),Ue(document.head,a),be&&be.m(document.head,null),Ue(document.head,l),s(e,i,p),w(u,e,p),s(e,_,p),s(e,f,p),s(e,L,p),w(C,e,p),s(e,j,p),w(h,e,p),s(e,I,p),w(q,e,p),s(e,W,p),w(D,e,p),s(e,Q,p),w(R,e,p),s(e,V,p),w(x,e,p),s(e,N,p),w(P,e,p),s(e,Y,p),X&&X.m(e,p),s(e,g,p),w(M,e,p),s(e,m,p),s(e,S,p),s(e,pe,p),s(e,te,p),s(e,ae,p),s(e,U,p),s(e,oe,p),w(ne,e,p),s(e,se,p),s(e,le,p),s(e,A,p),J&&J.m(e,p),s(e,Ae,p),w(ye,e,p),s(e,xe,p),w(he,e,p),s(e,Re,p),s(e,ue,p),s(e,Be,p),K&&K.m(e,p),s(e,Me,p),Z&&Z.m(e,p),s(e,Oe,p),w(ve,e,p),s(e,Ge,p),s(e,fe,p),s(e,Ie,p),s(e,we,p),s(e,Ee,p),s(e,ce,p),s(e,De,p),s(e,ke,p),s(e,Pe,p),s(e,Te,p),s(e,Fe,p),w(Se,e,p),Ne=!0},p(e,p){typeof F<"u"&&F.title&&F.hide_title!==!0&&$e.p(e,p),Le.p(e,p),typeof F=="object"&&be.p(e,p);const at={};p[1]&256&&(at.$$scope={dirty:p,ctx:e}),C.$set(at);const nt={};p[1]&256&&(nt.$$scope={dirty:p,ctx:e}),h.$set(nt);const it={};p[1]&256&&(it.$$scope={dirty:p,ctx:e}),q.$set(it);const rt={};p[1]&256&&(rt.$$scope={dirty:p,ctx:e}),D.$set(rt);const ot={};p[1]&256&&(ot.$$scope={dirty:p,ctx:e}),R.$set(ot);const st={};p[1]&256&&(st.$$scope={dirty:p,ctx:e}),x.$set(st);const lt={};p[1]&256&&(lt.$$scope={dirty:p,ctx:e}),P.$set(lt),e[3]?X?(X.p(e,p),p[0]&8&&b(X,1)):(X=$t(e),X.c(),b(X,1),X.m(g.parentNode,g)):X&&(je(),y(X,1,1,()=>{X=null}),We());const He={};p[0]&8&&(He.data=e[3]),p[0]&5&&(He.value=e[0].metric.value==="density"?e[2]==="stock"?"poi_density_per_km2":"density_delta":e[2]==="stock"?"oa_domain":"oa_delta"),p[0]&5&&(He.colorPalette=e[0].metric.value==="density"&&e[2]==="stock"?void 0:e[7]),p[0]&13&&(He.min=e[0].metric.value==="oa"?e[2]==="stock"?_e(e[3],"oa_domain",1)[0]:_e(e[3],"oa_delta",0)[0]:e[2]==="development"?_e(e[3],"density_delta",0)[0]:void 0),p[0]&13&&(He.max=e[0].metric.value==="oa"?e[2]==="stock"?_e(e[3],"oa_domain",1)[1]:_e(e[3],"oa_delta",0)[1]:e[2]==="development"?_e(e[3],"density_delta",0)[1]:void 0),p[0]&5&&(He.title="Hamburg statistisches Gebiet — "+(e[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+e[0].domain.value+", "+e[0].year.value+(e[2]==="development"?" (change vs. previous year)":"")),p[0]&64&&(He.tooltip=e[6]),M.$set(He);const mt={};p[1]&256&&(mt.$$scope={dirty:p,ctx:e}),ne.$set(mt),e[4]?J?(J.p(e,p),p[0]&16&&b(J,1)):(J=bt(e),J.c(),b(J,1),J.m(Ae.parentNode,Ae)):J&&(je(),y(J,1,1,()=>{J=null}),We());const pt={};p[1]&256&&(pt.$$scope={dirty:p,ctx:e}),ye.$set(pt);const dt={};p[0]&16&&(dt.data=e[4]),he.$set(dt),e[1]?K?(K.p(e,p),p[0]&2&&b(K,1)):(K=gt(e),K.c(),b(K,1),K.m(Me.parentNode,Me)):K&&(je(),y(K,1,1,()=>{K=null}),We()),e[5]?Z?(Z.p(e,p),p[0]&32&&b(Z,1)):(Z=yt(e),Z.c(),b(Z,1),Z.m(Oe.parentNode,Oe)):Z&&(je(),y(Z,1,1,()=>{Z=null}),We());const Ye={};p[0]&32&&(Ye.data=e[5]),p[0]&2&&(Ye.title="Top 15 categories of mapped places, "+e[1][0].year),ve.$set(Ye)},i(e){Ne||(b(u.$$.fragment,e),b(C.$$.fragment,e),b(h.$$.fragment,e),b(q.$$.fragment,e),b(D.$$.fragment,e),b(R.$$.fragment,e),b(x.$$.fragment,e),b(P.$$.fragment,e),b(X),b(M.$$.fragment,e),b(ne.$$.fragment,e),b(J),b(ye.$$.fragment,e),b(he.$$.fragment,e),b(K),b(Z),b(ve.$$.fragment,e),b(Se.$$.fragment,e),Ne=!0)},o(e){y(u.$$.fragment,e),y(C.$$.fragment,e),y(h.$$.fragment,e),y(q.$$.fragment,e),y(D.$$.fragment,e),y(R.$$.fragment,e),y(x.$$.fragment,e),y(P.$$.fragment,e),y(X),y(M.$$.fragment,e),y(ne.$$.fragment,e),y(J),y(ye.$$.fragment,e),y(he.$$.fragment,e),y(K),y(Z),y(ve.$$.fragment,e),y(Se.$$.fragment,e),Ne=!1},d(e){e&&(r(n),r(i),r(_),r(f),r(L),r(j),r(I),r(W),r(Q),r(V),r(N),r(Y),r(g),r(m),r(S),r(pe),r(te),r(ae),r(U),r(oe),r(se),r(le),r(A),r(Ae),r(xe),r(Re),r(ue),r(Be),r(Me),r(Oe),r(Ge),r(fe),r(Ie),r(we),r(Ee),r(ce),r(De),r(ke),r(Pe),r(Te),r(Fe)),$e&&$e.d(e),Le.d(e),r(o),r(a),be&&be.d(e),r(l),v(u,e),v(C,e),v(h,e),v(q,e),v(D,e),v(R,e),v(x,e),v(P,e),X&&X.d(e),v(M,e),v(ne,e),J&&J.d(e),v(ye,e),v(he,e),K&&K.d(e),Z&&Z.d(e),v(ve,e),v(Se,e)}}}const F={title:"POI & Offering Advantage map"};function _e(d,n,o){const l=d.map(i=>i[n]).filter(i=>i!=null&&!isNaN(i)).reduce((i,u)=>Math.max(i,Math.abs(u-o)),0)||1;return[o-l,o+l]}function ra(d,n,o){let a,l,i,u;_t(d,Dt,t=>o(26,i=t)),_t(d,ft,t=>o(31,u=t));let{data:_}=n,{data:f={},customFormattingSettings:O,__db:L,inputs:C}=_;kt(ft,u="9a4cb0405bffb581fa65fd69e4001a3a",u);let j=Rt(xt(C));Ht(j.subscribe(t=>o(0,C=t))),Ct(It,{getCustomFormats:()=>O.customFormats||[]});const h=(t,A)=>Nt(L.query,t,{query_name:A});Bt(h),i.params,St(()=>!0);let I={initialData:void 0,initialError:void 0},q=Ce`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
-- delta columns computed on the RAW (pre-suppression) oa_domain over the full series via a
-- window function, suppression applied once at the very end based on THIS row's own
-- oa_domain_min_base_flag, then filtered to the selected year -- no cross-block query chaining
-- (Evidence sql blocks are independent DuckDB-WASM queries; this keeps the whole thing in one).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${C.domain.value}'
    ),
    -- #352: Gebiet labels (single 'current' vintage for Hamburg).
    names as (
        select area_code, area_name
        from gentriduck_marts.dim_area_geometry
        where city_code = 'HH' and area_level = 'subarea_l2'
    )
select
    b.area_code,
    n.area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(n.area_name, 'Gebiet ' || b.area_code) > 0 then null else b.area_code end
        as code_note,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- #353: basePath-aware click-through, same \`${ge}\`-prefixed column as /berlin/poi-map.
    '${ge}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${C.year.value}`,W=`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
-- delta columns computed on the RAW (pre-suppression) oa_domain over the full series via a
-- window function, suppression applied once at the very end based on THIS row's own
-- oa_domain_min_base_flag, then filtered to the selected year -- no cross-block query chaining
-- (Evidence sql blocks are independent DuckDB-WASM queries; this keeps the whole thing in one).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${C.domain.value}'
    ),
    -- #352: Gebiet labels (single 'current' vintage for Hamburg).
    names as (
        select area_code, area_name
        from gentriduck_marts.dim_area_geometry
        where city_code = 'HH' and area_level = 'subarea_l2'
    )
select
    b.area_code,
    n.area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(n.area_name, 'Gebiet ' || b.area_code) > 0 then null else b.area_code end
        as code_note,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- #353: basePath-aware click-through, same \`${ge}\`-prefixed column as /berlin/poi-map.
    '${ge}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${C.year.value}`;f.poi_map_data_data&&(f.poi_map_data_data instanceof Error?I.initialError=f.poi_map_data_data:I.initialData=f.poi_map_data_data,f.poi_map_data_columns&&(I.knownColumns=f.poi_map_data_columns));let D,Q=!1;const R=Ve.createReactive({callback:t=>{o(3,D=t)},execFn:h},{id:"poi_map_data",...I});R(W,{noResolve:q,...I}),globalThis[Symbol.for("poi_map_data")]={get value(){return D}};let V={initialData:void 0,initialError:void 0},x=Ce`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`,N=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`;f.poi_citywide_data&&(f.poi_citywide_data instanceof Error?V.initialError=f.poi_citywide_data:V.initialData=f.poi_citywide_data,f.poi_citywide_columns&&(V.knownColumns=f.poi_citywide_columns));let P,Y=!1;const g=Ve.createReactive({callback:t=>{o(4,P=t)},execFn:h},{id:"poi_citywide",...V});g(N,{noResolve:x,...V}),globalThis[Symbol.for("poi_citywide")]={get value(){return P}};let M={initialData:void 0,initialError:void 0},m=Ce`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`,S=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`;f.poi_latest_year_data&&(f.poi_latest_year_data instanceof Error?M.initialError=f.poi_latest_year_data:M.initialData=f.poi_latest_year_data,f.poi_latest_year_columns&&(M.knownColumns=f.poi_latest_year_columns));let ee,pe=!1;const te=Ve.createReactive({callback:t=>{o(1,ee=t)},execFn:h},{id:"poi_latest_year",...M});te(S,{noResolve:m,...M}),globalThis[Symbol.for("poi_latest_year")]={get value(){return ee}};let ae={initialData:void 0,initialError:void 0},U=Ce`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ee[0].year}
group by all
order by poi_count desc
limit 15`,de=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ee[0].year}
group by all
order by poi_count desc
limit 15`;f.poi_mix_latest_data&&(f.poi_mix_latest_data instanceof Error?ae.initialError=f.poi_mix_latest_data:ae.initialData=f.poi_mix_latest_data,f.poi_mix_latest_columns&&(ae.knownColumns=f.poi_mix_latest_columns));let oe,ne=!1;const se=Ve.createReactive({callback:t=>{o(5,oe=t)},execFn:h},{id:"poi_mix_latest",...ae});se(de,{noResolve:U,...ae}),globalThis[Symbol.for("poi_mix_latest")]={get value(){return oe}};const le=["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"];return d.$$set=t=>{"data"in t&&o(8,_=t.data)},d.$$.update=()=>{d.$$.dirty[0]&256&&o(9,{data:f={},customFormattingSettings:O,__db:L}=_,f),d.$$.dirty[0]&512&&Gt.set(Object.keys(f).length>0),d.$$.dirty[0]&67108864&&i.params,d.$$.dirty[0]&1&&o(11,q=Ce`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
-- delta columns computed on the RAW (pre-suppression) oa_domain over the full series via a
-- window function, suppression applied once at the very end based on THIS row's own
-- oa_domain_min_base_flag, then filtered to the selected year -- no cross-block query chaining
-- (Evidence sql blocks are independent DuckDB-WASM queries; this keeps the whole thing in one).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${C.domain.value}'
    ),
    -- #352: Gebiet labels (single 'current' vintage for Hamburg).
    names as (
        select area_code, area_name
        from gentriduck_marts.dim_area_geometry
        where city_code = 'HH' and area_level = 'subarea_l2'
    )
select
    b.area_code,
    n.area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(n.area_name, 'Gebiet ' || b.area_code) > 0 then null else b.area_code end
        as code_note,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- #353: basePath-aware click-through, same \`${ge}\`-prefixed column as /berlin/poi-map.
    '${ge}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${C.year.value}`),d.$$.dirty[0]&1&&o(12,W=`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
-- delta columns computed on the RAW (pre-suppression) oa_domain over the full series via a
-- window function, suppression applied once at the very end based on THIS row's own
-- oa_domain_min_base_flag, then filtered to the selected year -- no cross-block query chaining
-- (Evidence sql blocks are independent DuckDB-WASM queries; this keeps the whole thing in one).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${C.domain.value}'
    ),
    -- #352: Gebiet labels (single 'current' vintage for Hamburg).
    names as (
        select area_code, area_name
        from gentriduck_marts.dim_area_geometry
        where city_code = 'HH' and area_level = 'subarea_l2'
    )
select
    b.area_code,
    n.area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(n.area_name, 'Gebiet ' || b.area_code) > 0 then null else b.area_code end
        as code_note,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- #353: basePath-aware click-through, same \`${ge}\`-prefixed column as /berlin/poi-map.
    '${ge}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${C.year.value}`),d.$$.dirty[0]&15360&&(q||!Q?q||(R(W,{noResolve:q,...I}),o(13,Q=!0)):R(W,{noResolve:q})),d.$$.dirty[0]&245760&&(x||!Y?x||(g(N,{noResolve:x,...V}),o(17,Y=!0)):g(N,{noResolve:x})),d.$$.dirty[0]&3932160&&(m||!pe?m||(te(S,{noResolve:m,...M}),o(21,pe=!0)):te(S,{noResolve:m})),d.$$.dirty[0]&2&&o(23,U=Ce`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ee[0].year}
group by all
order by poi_count desc
limit 15`),d.$$.dirty[0]&2&&o(24,de=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ee[0].year}
group by all
order by poi_count desc
limit 15`),d.$$.dirty[0]&62914560&&(U||!ne?U||(se(de,{noResolve:U,...ae}),o(25,ne=!0)):se(de,{noResolve:U})),d.$$.dirty[0]&1&&o(2,a=C.view==="development"?"development":"stock"),d.$$.dirty[0]&5&&o(6,l=[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:C.metric.value==="density"?a==="stock"?"poi_density_per_km2":"density_delta":a==="stock"?"oa_domain":"oa_delta",title:(C.metric.value==="density"?"POI density / km²":"Offering Advantage")+(a==="development"?" (change vs. previous year)":""),fmt:"num1"},{id:"poi_count",title:"Mapped places (this domain)",fmt:"num0"},{id:"code_note",title:"Gebiet code",valueClass:"text-xs opacity-60",fmt:"id"}])},o(15,x=Ce`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`),o(16,N=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`),o(19,m=Ce`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`),o(20,S=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`),[C,ee,a,D,P,oe,l,le,_,f,I,q,W,Q,V,x,N,Y,M,m,S,pe,ae,U,de,ne,i]}class Ha extends Mt{constructor(n){super(),Ot(this,n,ra,ia,vt,{data:8},null,[-1,-1])}}export{Ha as component};
