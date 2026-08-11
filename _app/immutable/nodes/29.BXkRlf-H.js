import{s as wt,d as r,i as s,a as Ue,b as q,c as _,h as bt,e as S,f as Ve,g as Q,j as c,k as R,l as ft,m as ht,o as kt,n as Ht,p as Ct,q as me,t as ne,u as re,r as Tt}from"../chunks/scheduler.BopPEjhc.js";import{S as At,i as Lt,d as w,t as v,a as g,c as Ne,m as b,b as h,e as k,g as We}from"../chunks/index.CYkVJg6_.js";import{F as Mt}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as Ot}from"../chunks/Hero.CRoRGI02.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as qt,w as St}from"../chunks/entry.BMmpG6A7.js";import{A as qe}from"../chunks/Alert.BO8kFSQK.js";import{e as Rt,s as Bt,Q as je,p as xt,a as dt,r as ut,C as It}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as He}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as Ye,a as E}from"../chunks/Dropdown.BxlIFH-r.js";import{B as Et,a as _t}from"../chunks/ButtonGroup.inaDnyw_.js";import{p as Dt}from"../chunks/stores.Ceyp10jj.js";import{Q as Qe}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as Pt}from"../chunks/BarChart.DzrCmZ_r.js";import{L as Gt}from"../chunks/LineChart.BThKrpoY.js";import{A as Ft}from"../chunks/AreaMap.w9kcpT6D.js";import{p as Nt}from"../chunks/profile.BW8tN6E9.js";function Wt(d){let t,o=N.title+"",a;return{c(){t=R("h1"),a=re(o),this.h()},l(l){t=S(l,"H1",{class:!0});var n=Tt(t);a=ne(n,o),n.forEach(r),this.h()},h(){q(t,"class","title")},m(l,n){s(l,t,n),Ue(t,a)},p:me,d(l){l&&r(t)}}}function jt(d){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:me,p:me,d:me}}function Ut(d){let t,o,a,l,n;return document.title=t=N.title,{c(){o=c(),a=R("meta"),l=c(),n=R("meta"),this.h()},l(u){o=_(u),a=S(u,"META",{property:!0,content:!0}),l=_(u),n=S(u,"META",{name:!0,content:!0}),this.h()},h(){var u,f;q(a,"property","og:title"),q(a,"content",((u=N.og)==null?void 0:u.title)??N.title),q(n,"name","twitter:title"),q(n,"content",((f=N.og)==null?void 0:f.title)??N.title)},m(u,f){s(u,o,f),s(u,a,f),s(u,l,f),s(u,n,f)},p(u,f){f&0&&t!==(t=N.title)&&(document.title=t)},d(u){u&&(r(o),r(a),r(l),r(n))}}}function Vt(d){var n,u;let t,o,a=(N.description||((n=N.og)==null?void 0:n.description))&&Qt(),l=((u=N.og)==null?void 0:u.image)&&zt();return{c(){a&&a.c(),t=c(),l&&l.c(),o=Ve()},l(f){a&&a.l(f),t=_(f),l&&l.l(f),o=Ve()},m(f,H){a&&a.m(f,H),s(f,t,H),l&&l.m(f,H),s(f,o,H)},p(f,H){var M,C;(N.description||(M=N.og)!=null&&M.description)&&a.p(f,H),(C=N.og)!=null&&C.image&&l.p(f,H)},d(f){f&&(r(t),r(o)),a&&a.d(f),l&&l.d(f)}}}function Qt(d){let t,o,a,l,n;return{c(){t=R("meta"),o=c(),a=R("meta"),l=c(),n=R("meta"),this.h()},l(u){t=S(u,"META",{name:!0,content:!0}),o=_(u),a=S(u,"META",{property:!0,content:!0}),l=_(u),n=S(u,"META",{name:!0,content:!0}),this.h()},h(){var u,f,H;q(t,"name","description"),q(t,"content",N.description??((u=N.og)==null?void 0:u.description)),q(a,"property","og:description"),q(a,"content",((f=N.og)==null?void 0:f.description)??N.description),q(n,"name","twitter:description"),q(n,"content",((H=N.og)==null?void 0:H.description)??N.description)},m(u,f){s(u,t,f),s(u,o,f),s(u,a,f),s(u,l,f),s(u,n,f)},p:me,d(u){u&&(r(t),r(o),r(a),r(l),r(n))}}}function zt(d){let t,o,a;return{c(){t=R("meta"),o=c(),a=R("meta"),this.h()},l(l){t=S(l,"META",{property:!0,content:!0}),o=_(l),a=S(l,"META",{name:!0,content:!0}),this.h()},h(){var l,n;q(t,"property","og:image"),q(t,"content",dt((l=N.og)==null?void 0:l.image)),q(a,"name","twitter:image"),q(a,"content",dt((n=N.og)==null?void 0:n.image))},m(l,n){s(l,t,n),s(l,o,n),s(l,a,n)},p:me,d(l){l&&(r(t),r(o),r(a))}}}function Yt(d){let t,o="How to read this:",a,l,n="OA = 1.0",u,f,H="above 1.0",M,C,P="below 1.0",W,y,I="Density",B,U,G='"Stock vs. development"',z,O,V='"Change since previous year"',x,j,F="methodology §6",Y;return{c(){t=R("b"),t.textContent=o,a=c(),l=R("b"),l.textContent=n,u=re(` means an area has exactly the Hamburg-wide average share
  of a POI domain; `),f=R("b"),f.textContent=H,M=re(" means that domain is over-represented there, "),C=R("b"),C.textContent=P,W=re(`
  means under-represented. `),y=R("b"),y.textContent=I,B=re(` is simply mapped-place count per km². Switch
  `),U=R("b"),U.textContent=G,z=re(" to "),O=R("b"),O.textContent=V,x=re(` to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see `),j=R("a"),j.textContent=F,Y=re(`'s structural rule against pooled
  cross-city comparison).`),this.h()},l($){t=S($,"B",{"data-svelte-h":!0}),Q(t)!=="svelte-1d2ahpj"&&(t.textContent=o),a=_($),l=S($,"B",{"data-svelte-h":!0}),Q(l)!=="svelte-17c8v7u"&&(l.textContent=n),u=ne($,` means an area has exactly the Hamburg-wide average share
  of a POI domain; `),f=S($,"B",{"data-svelte-h":!0}),Q(f)!=="svelte-11ia4c8"&&(f.textContent=H),M=ne($," means that domain is over-represented there, "),C=S($,"B",{"data-svelte-h":!0}),Q(C)!=="svelte-1m0m3gk"&&(C.textContent=P),W=ne($,`
  means under-represented. `),y=S($,"B",{"data-svelte-h":!0}),Q(y)!=="svelte-uzvr2g"&&(y.textContent=I),B=ne($,` is simply mapped-place count per km². Switch
  `),U=S($,"B",{"data-svelte-h":!0}),Q(U)!=="svelte-17y0108"&&(U.textContent=G),z=ne($," to "),O=S($,"B",{"data-svelte-h":!0}),Q(O)!=="svelte-t4tx04"&&(O.textContent=V),x=ne($,` to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see `),j=S($,"A",{href:!0,"data-svelte-h":!0}),Q(j)!=="svelte-fe16dh"&&(j.textContent=F),Y=ne($,`'s structural rule against pooled
  cross-city comparison).`),this.h()},h(){q(j,"href","/gentriduck/methodology")},m($,A){s($,t,A),s($,a,A),s($,l,A),s($,u,A),s($,f,A),s($,M,A),s($,C,A),s($,W,A),s($,y,A),s($,B,A),s($,U,A),s($,z,A),s($,O,A),s($,x,A),s($,j,A),s($,Y,A)},p:me,d($){$&&(r(t),r(a),r(l),r(u),r(f),r(M),r(C),r(W),r(y),r(B),r(U),r(z),r(O),r(x),r(j),r(Y))}}}function Xt(d){let t,o="This map has no neighbourhood names, and thinly-mapped Gebiete are left blank.",a,l,n=`gentrification
  map`,u,f,H=`OSM's mapping coverage is not spatially neutral: completeness tends to correlate with
  area advantage, and poorer/peripheral areas are typically less thoroughly mapped than
  richer/central ones`,M,C,P="Berlin POI map",W;return{c(){t=R("b"),t.textContent=o,a=re(` Hamburg's
  statistische Gebiete carry only a numeric code (see the `),l=R("a"),l.textContent=n,u=re(` for why); hover any area for its code. Offering Advantage is a compositional ratio (a
  location quotient) — in a Gebiet-year with very few mapped places overall, a single new or
  removed business can swing its Offering Advantage value disproportionately, so Gebiet-years
  below the same minimum-mapped-place threshold used for Berlin are shown as an unshaded gap rather
  than a potentially misleading value; the raw mapped-place count is always visible in the
  tooltip. `),f=R("b"),f.textContent=H,M=re(` (Haklay, M. 2010, "How Good is Volunteered Geographical Information?",
  *Environment and Planning B*). So a blank Gebiet-year can reflect an OSM coverage gap rather than
  a real absence of commercial activity — please don't read it as evidence that nothing is
  happening there. Hamburg's own affluent Alster–Elbe axis against a deprived eastern/southern
  periphery is a sharper socio-spatial divide than Berlin's more mosaic pattern, so this
  cross-sectional under-mapping gradient may be even steeper here (see the
  `),C=R("a"),C.textContent=P,W=re(" for the same caveat applied there)."),this.h()},l(y){t=S(y,"B",{"data-svelte-h":!0}),Q(t)!=="svelte-3igchx"&&(t.textContent=o),a=ne(y,` Hamburg's
  statistische Gebiete carry only a numeric code (see the `),l=S(y,"A",{href:!0,"data-svelte-h":!0}),Q(l)!=="svelte-195e3sq"&&(l.textContent=n),u=ne(y,` for why); hover any area for its code. Offering Advantage is a compositional ratio (a
  location quotient) — in a Gebiet-year with very few mapped places overall, a single new or
  removed business can swing its Offering Advantage value disproportionately, so Gebiet-years
  below the same minimum-mapped-place threshold used for Berlin are shown as an unshaded gap rather
  than a potentially misleading value; the raw mapped-place count is always visible in the
  tooltip. `),f=S(y,"B",{"data-svelte-h":!0}),Q(f)!=="svelte-1k67crw"&&(f.textContent=H),M=ne(y,` (Haklay, M. 2010, "How Good is Volunteered Geographical Information?",
  *Environment and Planning B*). So a blank Gebiet-year can reflect an OSM coverage gap rather than
  a real absence of commercial activity — please don't read it as evidence that nothing is
  happening there. Hamburg's own affluent Alster–Elbe axis against a deprived eastern/southern
  periphery is a sharper socio-spatial divide than Berlin's more mosaic pattern, so this
  cross-sectional under-mapping gradient may be even steeper here (see the
  `),C=S(y,"A",{href:!0,"data-svelte-h":!0}),Q(C)!=="svelte-1iq2t0m"&&(C.textContent=P),W=ne(y," for the same caveat applied there)."),this.h()},h(){q(l,"href","/gentriduck/hamburg/maps"),q(C,"href","/gentriduck/berlin/poi-map")},m(y,I){s(y,t,I),s(y,a,I),s(y,l,I),s(y,u,I),s(y,f,I),s(y,M,I),s(y,C,I),s(y,W,I)},p:me,d(y){y&&(r(t),r(a),r(l),r(u),r(f),r(M),r(C),r(W))}}}function Jt(d){let t,o,a,l;return t=new E({props:{value:"density",valueLabel:"POI density (mapped places per km²)"}}),a=new E({props:{value:"oa",valueLabel:"Offering Advantage (location quotient vs. Hamburg-wide average)"}}),{c(){k(t.$$.fragment),o=c(),k(a.$$.fragment)},l(n){h(t.$$.fragment,n),o=_(n),h(a.$$.fragment,n)},m(n,u){b(t,n,u),s(n,o,u),b(a,n,u),l=!0},p:me,i(n){l||(g(t.$$.fragment,n),g(a.$$.fragment,n),l=!0)},o(n){v(t.$$.fragment,n),v(a.$$.fragment,n),l=!1},d(n){n&&r(o),w(t,n),w(a,n)}}}function Kt(d){let t,o,a,l,n,u,f,H,M,C,P,W,y,I,B,U,G,z,O,V,x,j,F,Y,$,A;return t=new E({props:{value:"Entertainment",valueLabel:"Entertainment"}}),a=new E({props:{value:"Gastronomy",valueLabel:"Gastronomy"}}),n=new E({props:{value:"Mobility",valueLabel:"Mobility"}}),f=new E({props:{value:"Office",valueLabel:"Office"}}),M=new E({props:{value:"Other",valueLabel:"Other"}}),P=new E({props:{value:"Public Service",valueLabel:"Public Service"}}),y=new E({props:{value:"Public Space",valueLabel:"Public Space"}}),B=new E({props:{value:"Religion",valueLabel:"Religion"}}),G=new E({props:{value:"Retail",valueLabel:"Retail"}}),O=new E({props:{value:"Services",valueLabel:"Services"}}),x=new E({props:{value:"Sports and Recreation",valueLabel:"Sports and Recreation"}}),F=new E({props:{value:"Tourism",valueLabel:"Tourism"}}),$=new E({props:{value:"Vacancy",valueLabel:"Vacancy"}}),{c(){k(t.$$.fragment),o=c(),k(a.$$.fragment),l=c(),k(n.$$.fragment),u=c(),k(f.$$.fragment),H=c(),k(M.$$.fragment),C=c(),k(P.$$.fragment),W=c(),k(y.$$.fragment),I=c(),k(B.$$.fragment),U=c(),k(G.$$.fragment),z=c(),k(O.$$.fragment),V=c(),k(x.$$.fragment),j=c(),k(F.$$.fragment),Y=c(),k($.$$.fragment)},l(m){h(t.$$.fragment,m),o=_(m),h(a.$$.fragment,m),l=_(m),h(n.$$.fragment,m),u=_(m),h(f.$$.fragment,m),H=_(m),h(M.$$.fragment,m),C=_(m),h(P.$$.fragment,m),W=_(m),h(y.$$.fragment,m),I=_(m),h(B.$$.fragment,m),U=_(m),h(G.$$.fragment,m),z=_(m),h(O.$$.fragment,m),V=_(m),h(x.$$.fragment,m),j=_(m),h(F.$$.fragment,m),Y=_(m),h($.$$.fragment,m)},m(m,T){b(t,m,T),s(m,o,T),b(a,m,T),s(m,l,T),b(n,m,T),s(m,u,T),b(f,m,T),s(m,H,T),b(M,m,T),s(m,C,T),b(P,m,T),s(m,W,T),b(y,m,T),s(m,I,T),b(B,m,T),s(m,U,T),b(G,m,T),s(m,z,T),b(O,m,T),s(m,V,T),b(x,m,T),s(m,j,T),b(F,m,T),s(m,Y,T),b($,m,T),A=!0},p:me,i(m){A||(g(t.$$.fragment,m),g(a.$$.fragment,m),g(n.$$.fragment,m),g(f.$$.fragment,m),g(M.$$.fragment,m),g(P.$$.fragment,m),g(y.$$.fragment,m),g(B.$$.fragment,m),g(G.$$.fragment,m),g(O.$$.fragment,m),g(x.$$.fragment,m),g(F.$$.fragment,m),g($.$$.fragment,m),A=!0)},o(m){v(t.$$.fragment,m),v(a.$$.fragment,m),v(n.$$.fragment,m),v(f.$$.fragment,m),v(M.$$.fragment,m),v(P.$$.fragment,m),v(y.$$.fragment,m),v(B.$$.fragment,m),v(G.$$.fragment,m),v(O.$$.fragment,m),v(x.$$.fragment,m),v(F.$$.fragment,m),v($.$$.fragment,m),A=!1},d(m){m&&(r(o),r(l),r(u),r(H),r(C),r(W),r(I),r(U),r(z),r(V),r(j),r(Y)),w(t,m),w(a,m),w(n,m),w(f,m),w(M,m),w(P,m),w(y,m),w(B,m),w(G,m),w(O,m),w(x,m),w(F,m),w($,m)}}}function Zt(d){let t,o,a,l,n,u,f,H,M,C,P,W,y,I,B,U,G,z,O,V,x,j,F,Y,$,A,m,T,se,pe,J,ae,X,de,oe,ie,le,D;return t=new E({props:{value:"2008",valueLabel:"2008"}}),a=new E({props:{value:"2009",valueLabel:"2009"}}),n=new E({props:{value:"2010",valueLabel:"2010"}}),f=new E({props:{value:"2011",valueLabel:"2011"}}),M=new E({props:{value:"2012",valueLabel:"2012"}}),P=new E({props:{value:"2013",valueLabel:"2013"}}),y=new E({props:{value:"2014",valueLabel:"2014"}}),B=new E({props:{value:"2015",valueLabel:"2015"}}),G=new E({props:{value:"2016",valueLabel:"2016"}}),O=new E({props:{value:"2017",valueLabel:"2017"}}),x=new E({props:{value:"2018",valueLabel:"2018"}}),F=new E({props:{value:"2019",valueLabel:"2019"}}),$=new E({props:{value:"2020",valueLabel:"2020"}}),m=new E({props:{value:"2021",valueLabel:"2021"}}),se=new E({props:{value:"2022",valueLabel:"2022"}}),J=new E({props:{value:"2023",valueLabel:"2023"}}),X=new E({props:{value:"2024",valueLabel:"2024"}}),oe=new E({props:{value:"2025",valueLabel:"2025"}}),le=new E({props:{value:"2026",valueLabel:"2026"}}),{c(){k(t.$$.fragment),o=c(),k(a.$$.fragment),l=c(),k(n.$$.fragment),u=c(),k(f.$$.fragment),H=c(),k(M.$$.fragment),C=c(),k(P.$$.fragment),W=c(),k(y.$$.fragment),I=c(),k(B.$$.fragment),U=c(),k(G.$$.fragment),z=c(),k(O.$$.fragment),V=c(),k(x.$$.fragment),j=c(),k(F.$$.fragment),Y=c(),k($.$$.fragment),A=c(),k(m.$$.fragment),T=c(),k(se.$$.fragment),pe=c(),k(J.$$.fragment),ae=c(),k(X.$$.fragment),de=c(),k(oe.$$.fragment),ie=c(),k(le.$$.fragment)},l(i){h(t.$$.fragment,i),o=_(i),h(a.$$.fragment,i),l=_(i),h(n.$$.fragment,i),u=_(i),h(f.$$.fragment,i),H=_(i),h(M.$$.fragment,i),C=_(i),h(P.$$.fragment,i),W=_(i),h(y.$$.fragment,i),I=_(i),h(B.$$.fragment,i),U=_(i),h(G.$$.fragment,i),z=_(i),h(O.$$.fragment,i),V=_(i),h(x.$$.fragment,i),j=_(i),h(F.$$.fragment,i),Y=_(i),h($.$$.fragment,i),A=_(i),h(m.$$.fragment,i),T=_(i),h(se.$$.fragment,i),pe=_(i),h(J.$$.fragment,i),ae=_(i),h(X.$$.fragment,i),de=_(i),h(oe.$$.fragment,i),ie=_(i),h(le.$$.fragment,i)},m(i,L){b(t,i,L),s(i,o,L),b(a,i,L),s(i,l,L),b(n,i,L),s(i,u,L),b(f,i,L),s(i,H,L),b(M,i,L),s(i,C,L),b(P,i,L),s(i,W,L),b(y,i,L),s(i,I,L),b(B,i,L),s(i,U,L),b(G,i,L),s(i,z,L),b(O,i,L),s(i,V,L),b(x,i,L),s(i,j,L),b(F,i,L),s(i,Y,L),b($,i,L),s(i,A,L),b(m,i,L),s(i,T,L),b(se,i,L),s(i,pe,L),b(J,i,L),s(i,ae,L),b(X,i,L),s(i,de,L),b(oe,i,L),s(i,ie,L),b(le,i,L),D=!0},p:me,i(i){D||(g(t.$$.fragment,i),g(a.$$.fragment,i),g(n.$$.fragment,i),g(f.$$.fragment,i),g(M.$$.fragment,i),g(P.$$.fragment,i),g(y.$$.fragment,i),g(B.$$.fragment,i),g(G.$$.fragment,i),g(O.$$.fragment,i),g(x.$$.fragment,i),g(F.$$.fragment,i),g($.$$.fragment,i),g(m.$$.fragment,i),g(se.$$.fragment,i),g(J.$$.fragment,i),g(X.$$.fragment,i),g(oe.$$.fragment,i),g(le.$$.fragment,i),D=!0)},o(i){v(t.$$.fragment,i),v(a.$$.fragment,i),v(n.$$.fragment,i),v(f.$$.fragment,i),v(M.$$.fragment,i),v(P.$$.fragment,i),v(y.$$.fragment,i),v(B.$$.fragment,i),v(G.$$.fragment,i),v(O.$$.fragment,i),v(x.$$.fragment,i),v(F.$$.fragment,i),v($.$$.fragment,i),v(m.$$.fragment,i),v(se.$$.fragment,i),v(J.$$.fragment,i),v(X.$$.fragment,i),v(oe.$$.fragment,i),v(le.$$.fragment,i),D=!1},d(i){i&&(r(o),r(l),r(u),r(H),r(C),r(W),r(I),r(U),r(z),r(V),r(j),r(Y),r(A),r(T),r(pe),r(ae),r(de),r(ie)),w(t,i),w(a,i),w(n,i),w(f,i),w(M,i),w(P,i),w(y,i),w(B,i),w(G,i),w(O,i),w(x,i),w(F,i),w($,i),w(m,i),w(se,i),w(J,i),w(X,i),w(oe,i),w(le,i)}}}function ea(d){let t,o,a,l;return t=new _t({props:{value:"stock",valueLabel:"Stock (this year's value)"}}),a=new _t({props:{value:"development",valueLabel:"Change since previous year"}}),{c(){k(t.$$.fragment),o=c(),k(a.$$.fragment)},l(n){h(t.$$.fragment,n),o=_(n),h(a.$$.fragment,n)},m(n,u){b(t,n,u),s(n,o,u),b(a,n,u),l=!0},p:me,i(n){l||(g(t.$$.fragment,n),g(a.$$.fragment,n),l=!0)},o(n){v(t.$$.fragment,n),v(a.$$.fragment,n),l=!1},d(n){n&&r(o),w(t,n),w(a,n)}}}function ta(d){let t,o='"Change since previous year" for POI density is not adjusted for growing OSM coverage.',a;return{c(){t=R("b"),t.textContent=o,a=re(`
  Mapper coverage grew fastest in Hamburg's earliest years (the coverage curve stabilizes only
  around ~2014–2015 — see the citywide growth chart further down this page), so an early-year
  density delta can reflect new OSM contributors catching up rather than real commercial change.
  Offering Advantage's "change" view is less exposed to this: it is a same-year ratio to the
  citywide average, so an area-uniform coverage shift cancels out; density's raw count carries no
  such protection. Read early-year density deltas cautiously, especially before ~2014.`)},l(l){t=S(l,"B",{"data-svelte-h":!0}),Q(t)!=="svelte-b5xv1v"&&(t.textContent=o),a=ne(l,`
  Mapper coverage grew fastest in Hamburg's earliest years (the coverage curve stabilizes only
  around ~2014–2015 — see the citywide growth chart further down this page), so an early-year
  density delta can reflect new OSM contributors catching up rather than real commercial change.
  Offering Advantage's "change" view is less exposed to this: it is a same-year ratio to the
  citywide average, so an area-uniform coverage shift cancels out; density's raw count carries no
  such protection. Read early-year density deltas cautiously, especially before ~2014.`)},m(l,n){s(l,t,n),s(l,a,n)},p:me,d(l){l&&(r(t),r(a))}}}function ct(d){let t,o;return t=new Qe({props:{queryID:"poi_map_data",queryResult:d[2]}}),{c(){k(t.$$.fragment)},l(a){h(t.$$.fragment,a)},m(a,l){b(t,a,l),o=!0},p(a,l){const n={};l[0]&4&&(n.queryResult=a[2]),t.$set(n)},i(a){o||(g(t.$$.fragment,a),o=!0)},o(a){v(t.$$.fragment,a),o=!1},d(a){w(t,a)}}}function aa(d){let t,o,a="Berlin's equivalent section",l,n,u="the Hamburg data hub",f;return{c(){t=re(`A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  `),o=R("a"),o.textContent=a,l=re(`, there is no land-value/rent chart here:
  Hamburg's price/rent mart now carries narrower-in-kind data (Wohnlage tier composition +
  modelled Mietenspiegel rent, I21-i/#303) than Berlin's, but no chart or section is built from it
  on this page (see `),n=R("a"),n.textContent=u,f=re(")."),this.h()},l(H){t=ne(H,`A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  `),o=S(H,"A",{href:!0,"data-svelte-h":!0}),Q(o)!=="svelte-ypxl3v"&&(o.textContent=a),l=ne(H,`, there is no land-value/rent chart here:
  Hamburg's price/rent mart now carries narrower-in-kind data (Wohnlage tier composition +
  modelled Mietenspiegel rent, I21-i/#303) than Berlin's, but no chart or section is built from it
  on this page (see `),n=S(H,"A",{href:!0,"data-svelte-h":!0}),Q(n)!=="svelte-rsbj88"&&(n.textContent=u),f=ne(H,")."),this.h()},h(){q(o,"href","/gentriduck/berlin/poi-map"),q(n,"href","/gentriduck/hamburg")},m(H,M){s(H,t,M),s(H,o,M),s(H,l,M),s(H,n,M),s(H,f,M)},p:me,d(H){H&&(r(t),r(o),r(l),r(n),r(f))}}}function $t(d){let t,o;return t=new Qe({props:{queryID:"poi_citywide",queryResult:d[3]}}),{c(){k(t.$$.fragment)},l(a){h(t.$$.fragment,a)},m(a,l){b(t,a,l),o=!0},p(a,l){const n={};l[0]&8&&(n.queryResult=a[3]),t.$set(n)},i(a){o||(g(t.$$.fragment,a),o=!0)},o(a){v(t.$$.fragment,a),o=!1},d(a){w(t,a)}}}function ia(d){let t;return{c(){t=re(`As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.`)},l(o){t=ne(o,`As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.`)},m(o,a){s(o,t,a)},d(o){o&&r(t)}}}function gt(d){let t,o;return t=new Qe({props:{queryID:"poi_latest_year",queryResult:d[1]}}),{c(){k(t.$$.fragment)},l(a){h(t.$$.fragment,a)},m(a,l){b(t,a,l),o=!0},p(a,l){const n={};l[0]&2&&(n.queryResult=a[1]),t.$set(n)},i(a){o||(g(t.$$.fragment,a),o=!0)},o(a){v(t.$$.fragment,a),o=!1},d(a){w(t,a)}}}function vt(d){let t,o;return t=new Qe({props:{queryID:"poi_mix_latest",queryResult:d[4]}}),{c(){k(t.$$.fragment)},l(a){h(t.$$.fragment,a)},m(a,l){b(t,a,l),o=!0},p(a,l){const n={};l[0]&16&&(n.queryResult=a[4]),t.$set(n)},i(a){o||(g(t.$$.fragment,a),o=!0)},o(a){v(t.$$.fragment,a),o=!1},d(a){w(t,a)}}}function na(d){let t,o,a,l,n,u,f,H,M=`This map shows where different kinds of shops, cafés, and other mapped places (&quot;points of
interest,&quot; or POIs) are concentrated across Hamburg — either as raw density, or as
<strong class="markdown">Offering Advantage (OA)</strong>: how over- or under-represented a POI domain is in an area compared
to the citywide (Hamburg-wide) average for that domain. See
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
and <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md" rel="nofollow" class="markdown">ADR-0018</a>
for the full method, or the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for a plain-language walkthrough. This
data does not depend on Hamburg&#39;s gentrification-index admission (H3, #237) — it is a separate,
city-agnostic mart that has carried real Hamburg rows since H1 (#40).`,C,P,W,y,I,B,U,G,z,O,V,x,j,F,Y,$,A,m,T,se=`There is no per-area drill-down page for Hamburg yet — see the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for
what is and isn&#39;t built.`,pe,J,ae,X,de='<a href="#citywide-context-poi-growth">Citywide context: POI growth</a>',oe,ie,le,D,i='<a href="#shops-cafés--amenities-citywide">Shops, cafés &amp; amenities, citywide</a>',L,Te,ve,Se,ye,Re,ue,Xe='<a href="#what-kinds-of-places-make-up-that-total-latest-year">What kinds of places make up that total? (latest year)</a>',Be,Ae,Le,we,xe,_e,Je='<a href="#honest-caveats">Honest caveats</a>',Ie,be,Ke=`<li class="markdown"><strong class="markdown">OSM early-year completeness bias</strong> — the citywide POI-growth chart&#39;s early years should be
read cautiously, for the same reason as Berlin&#39;s (see <a href="/gentriduck/methodology" class="markdown">methodology §6</a>).</li> <li class="markdown"><strong class="markdown">No neighbourhood names</strong> — Hamburg&#39;s statistische Gebiete are shown by numeric code only.</li> <li class="markdown"><strong class="markdown">No land value or rent chart on this page (yet)</strong> — Hamburg&#39;s price/rent mart now carries
narrower-in-kind data than Berlin&#39;s (Wohnlage tier composition + modelled Mietenspiegel rent,
I21-i/#303: no BRW/land-value equivalent, 2-tier not 3-tier Wohnlage, current-state-only), but no
chart or section is built from it on this page.</li> <li class="markdown"><strong class="markdown">Offering Advantage and POI density are commercial-side signals, not the outcome variable</strong> —
see <a href="/gentriduck/methodology" class="markdown">methodology §1</a>.</li> <li class="markdown"><strong class="markdown">Thinly-mapped Gebiete are suppressed, not shown as zero</strong> — same D-3 minimum-mapped-place
threshold as Berlin&#39;s map (#274, ADR-0017 D5 D-3); a blank cell means &quot;too thinly observed,&quot;
never &quot;commercially dead.&quot;</li> <li class="markdown"><strong class="markdown">This map&#39;s Offering Advantage baseline is Hamburg-wide, never pooled with Berlin&#39;s</strong> — see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>&#39;s structural rule against pooled cross-city comparison.</li>`,Ee,ce,Ze='<a href="#further-reading">Further reading</a>',De,he,et=`See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
for how Offering Advantage is computed, the <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg gentrification-pressure map</a>
for the governed D1/D2 outcome, the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory of what is
and isn&#39;t built for Hamburg, or <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for the full
Berlin/Hamburg comparability caveats.`,Pe,Me,Ge,Ce,Fe,$e=typeof N<"u"&&N.title&&N.hide_title!==!0&&Wt();function yt(e,p){return typeof N<"u"&&N.title?Ut:jt}let Oe=yt()(d),ge=typeof N=="object"&&Vt();u=new Ot({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"POI & Offering Advantage map",lede:"Where shops, cafés, and other mapped places are concentrated across Hamburg, and how that commercial mix has grown over time — the same Offering Advantage construct used for Berlin, computed independently on Hamburg's own OpenStreetMap history."}}),P=new qe({props:{status:"info",$$slots:{default:[Yt]},$$scope:{ctx:d}}}),y=new qe({props:{status:"warning",$$slots:{default:[Xt]},$$scope:{ctx:d}}}),B=new Ye({props:{name:"metric",title:"Metric",defaultValue:"density",$$slots:{default:[Jt]},$$scope:{ctx:d}}}),G=new Ye({props:{name:"domain",title:"POI domain",defaultValue:"Retail",$$slots:{default:[Kt]},$$scope:{ctx:d}}}),O=new Ye({props:{name:"year",title:"Year",defaultValue:"2025",$$slots:{default:[Zt]},$$scope:{ctx:d}}}),x=new Et({props:{name:"view",title:"Stock vs. development",display:"tabs",defaultValue:"stock",$$slots:{default:[ea]},$$scope:{ctx:d}}}),F=new qe({props:{status:"warning",$$slots:{default:[ta]},$$scope:{ctx:d}}});let K=d[2]&&ct(d);A=new Ft({props:{data:d[2],geoJsonUrl:`${qt}/geo/subarea_l2_live_data.geojson`,geoId:"area_code",areaCol:"area_code",value:d[0].metric.value==="density"?d[0].view==="stock"?"poi_density_per_km2":"density_delta":d[0].view==="stock"?"oa_domain":"oa_delta",legendType:"scalar",colorPalette:d[0].metric.value==="density"&&d[0].view==="stock"?void 0:d[6],min:d[0].metric.value==="oa"?d[0].view==="stock"?fe(d[2],"oa_domain",1)[0]:fe(d[2],"oa_delta",0)[0]:d[0].view==="development"?fe(d[2],"density_delta",0)[0]:void 0,max:d[0].metric.value==="oa"?d[0].view==="stock"?fe(d[2],"oa_domain",1)[1]:fe(d[2],"oa_delta",0)[1]:d[0].view==="development"?fe(d[2],"density_delta",0)[1]:void 0,title:"Hamburg statistisches Gebiet — "+(d[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+d[0].domain.value+", "+d[0].year.value+(d[0].view==="development"?" (change vs. previous year)":""),startingLat:53.5511,startingLong:9.9937,startingZoom:10,tooltip:d[5],emptySet:"warn",emptyMessage:"No data for this domain/year combination."}}),ie=new qe({props:{status:"info",$$slots:{default:[aa]},$$scope:{ctx:d}}});let Z=d[3]&&$t(d);ve=new qe({props:{status:"info",$$slots:{default:[ia]},$$scope:{ctx:d}}}),ye=new Gt({props:{data:d[3],x:"snapshot_year",y:"poi_count",title:"Total mapped shops, cafés & amenities, city of Hamburg",yAxisTitle:"Number of mapped places"}});let ee=d[1]&&gt(d),te=d[4]&&vt(d);return we=new Pt({props:{data:d[4],x:"poi_category_h",y:"poi_count",title:"Top 15 categories of mapped places, "+d[1][0].year,yAxisTitle:"Number of mapped places",swapXY:"true"}}),Ce=new Mt({}),{c(){$e&&$e.c(),t=c(),Oe.c(),o=R("meta"),a=R("meta"),ge&&ge.c(),l=Ve(),n=c(),k(u.$$.fragment),f=c(),H=R("p"),H.innerHTML=M,C=c(),k(P.$$.fragment),W=c(),k(y.$$.fragment),I=c(),k(B.$$.fragment),U=c(),k(G.$$.fragment),z=c(),k(O.$$.fragment),V=c(),k(x.$$.fragment),j=c(),k(F.$$.fragment),Y=c(),K&&K.c(),$=c(),k(A.$$.fragment),m=c(),T=R("p"),T.innerHTML=se,pe=c(),J=R("hr"),ae=c(),X=R("h2"),X.innerHTML=de,oe=c(),k(ie.$$.fragment),le=c(),D=R("h3"),D.innerHTML=i,L=c(),Z&&Z.c(),Te=c(),k(ve.$$.fragment),Se=c(),k(ye.$$.fragment),Re=c(),ue=R("h4"),ue.innerHTML=Xe,Be=c(),ee&&ee.c(),Ae=c(),te&&te.c(),Le=c(),k(we.$$.fragment),xe=c(),_e=R("h2"),_e.innerHTML=Je,Ie=c(),be=R("ul"),be.innerHTML=Ke,Ee=c(),ce=R("h2"),ce.innerHTML=Ze,De=c(),he=R("p"),he.innerHTML=et,Pe=c(),Me=R("hr"),Ge=c(),k(Ce.$$.fragment),this.h()},l(e){$e&&$e.l(e),t=_(e);const p=bt("svelte-2igo1p",document.head);Oe.l(p),o=S(p,"META",{name:!0,content:!0}),a=S(p,"META",{name:!0,content:!0}),ge&&ge.l(p),l=Ve(),p.forEach(r),n=_(e),h(u.$$.fragment,e),f=_(e),H=S(e,"P",{class:!0,"data-svelte-h":!0}),Q(H)!=="svelte-z6ys4a"&&(H.innerHTML=M),C=_(e),h(P.$$.fragment,e),W=_(e),h(y.$$.fragment,e),I=_(e),h(B.$$.fragment,e),U=_(e),h(G.$$.fragment,e),z=_(e),h(O.$$.fragment,e),V=_(e),h(x.$$.fragment,e),j=_(e),h(F.$$.fragment,e),Y=_(e),K&&K.l(e),$=_(e),h(A.$$.fragment,e),m=_(e),T=S(e,"P",{class:!0,"data-svelte-h":!0}),Q(T)!=="svelte-btkcw5"&&(T.innerHTML=se),pe=_(e),J=S(e,"HR",{class:!0}),ae=_(e),X=S(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(X)!=="svelte-1aivtag"&&(X.innerHTML=de),oe=_(e),h(ie.$$.fragment,e),le=_(e),D=S(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),Q(D)!=="svelte-1pe5ai8"&&(D.innerHTML=i),L=_(e),Z&&Z.l(e),Te=_(e),h(ve.$$.fragment,e),Se=_(e),h(ye.$$.fragment,e),Re=_(e),ue=S(e,"H4",{class:!0,id:!0,"data-svelte-h":!0}),Q(ue)!=="svelte-1mnfgmg"&&(ue.innerHTML=Xe),Be=_(e),ee&&ee.l(e),Ae=_(e),te&&te.l(e),Le=_(e),h(we.$$.fragment,e),xe=_(e),_e=S(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(_e)!=="svelte-ad0syq"&&(_e.innerHTML=Je),Ie=_(e),be=S(e,"UL",{class:!0,"data-svelte-h":!0}),Q(be)!=="svelte-bj6iqd"&&(be.innerHTML=Ke),Ee=_(e),ce=S(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(ce)!=="svelte-oimjns"&&(ce.innerHTML=Ze),De=_(e),he=S(e,"P",{class:!0,"data-svelte-h":!0}),Q(he)!=="svelte-1k280vd"&&(he.innerHTML=et),Pe=_(e),Me=S(e,"HR",{class:!0}),Ge=_(e),h(Ce.$$.fragment,e),this.h()},h(){q(o,"name","twitter:card"),q(o,"content","summary_large_image"),q(a,"name","twitter:site"),q(a,"content","@evidence_dev"),q(H,"class","markdown"),q(T,"class","markdown"),q(J,"class","markdown"),q(X,"class","markdown"),q(X,"id","citywide-context-poi-growth"),q(D,"class","markdown"),q(D,"id","shops-cafés--amenities-citywide"),q(ue,"class","markdown"),q(ue,"id","what-kinds-of-places-make-up-that-total-latest-year"),q(_e,"class","markdown"),q(_e,"id","honest-caveats"),q(be,"class","markdown"),q(ce,"class","markdown"),q(ce,"id","further-reading"),q(he,"class","markdown"),q(Me,"class","markdown")},m(e,p){$e&&$e.m(e,p),s(e,t,p),Oe.m(document.head,null),Ue(document.head,o),Ue(document.head,a),ge&&ge.m(document.head,null),Ue(document.head,l),s(e,n,p),b(u,e,p),s(e,f,p),s(e,H,p),s(e,C,p),b(P,e,p),s(e,W,p),b(y,e,p),s(e,I,p),b(B,e,p),s(e,U,p),b(G,e,p),s(e,z,p),b(O,e,p),s(e,V,p),b(x,e,p),s(e,j,p),b(F,e,p),s(e,Y,p),K&&K.m(e,p),s(e,$,p),b(A,e,p),s(e,m,p),s(e,T,p),s(e,pe,p),s(e,J,p),s(e,ae,p),s(e,X,p),s(e,oe,p),b(ie,e,p),s(e,le,p),s(e,D,p),s(e,L,p),Z&&Z.m(e,p),s(e,Te,p),b(ve,e,p),s(e,Se,p),b(ye,e,p),s(e,Re,p),s(e,ue,p),s(e,Be,p),ee&&ee.m(e,p),s(e,Ae,p),te&&te.m(e,p),s(e,Le,p),b(we,e,p),s(e,xe,p),s(e,_e,p),s(e,Ie,p),s(e,be,p),s(e,Ee,p),s(e,ce,p),s(e,De,p),s(e,he,p),s(e,Pe,p),s(e,Me,p),s(e,Ge,p),b(Ce,e,p),Fe=!0},p(e,p){typeof N<"u"&&N.title&&N.hide_title!==!0&&$e.p(e,p),Oe.p(e,p),typeof N=="object"&&ge.p(e,p);const tt={};p[1]&128&&(tt.$$scope={dirty:p,ctx:e}),P.$set(tt);const at={};p[1]&128&&(at.$$scope={dirty:p,ctx:e}),y.$set(at);const it={};p[1]&128&&(it.$$scope={dirty:p,ctx:e}),B.$set(it);const nt={};p[1]&128&&(nt.$$scope={dirty:p,ctx:e}),G.$set(nt);const rt={};p[1]&128&&(rt.$$scope={dirty:p,ctx:e}),O.$set(rt);const ot={};p[1]&128&&(ot.$$scope={dirty:p,ctx:e}),x.$set(ot);const st={};p[1]&128&&(st.$$scope={dirty:p,ctx:e}),F.$set(st),e[2]?K?(K.p(e,p),p[0]&4&&g(K,1)):(K=ct(e),K.c(),g(K,1),K.m($.parentNode,$)):K&&(We(),v(K,1,1,()=>{K=null}),Ne());const ke={};p[0]&4&&(ke.data=e[2]),p[0]&1&&(ke.value=e[0].metric.value==="density"?e[0].view==="stock"?"poi_density_per_km2":"density_delta":e[0].view==="stock"?"oa_domain":"oa_delta"),p[0]&1&&(ke.colorPalette=e[0].metric.value==="density"&&e[0].view==="stock"?void 0:e[6]),p[0]&5&&(ke.min=e[0].metric.value==="oa"?e[0].view==="stock"?fe(e[2],"oa_domain",1)[0]:fe(e[2],"oa_delta",0)[0]:e[0].view==="development"?fe(e[2],"density_delta",0)[0]:void 0),p[0]&5&&(ke.max=e[0].metric.value==="oa"?e[0].view==="stock"?fe(e[2],"oa_domain",1)[1]:fe(e[2],"oa_delta",0)[1]:e[0].view==="development"?fe(e[2],"density_delta",0)[1]:void 0),p[0]&1&&(ke.title="Hamburg statistisches Gebiet — "+(e[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+e[0].domain.value+", "+e[0].year.value+(e[0].view==="development"?" (change vs. previous year)":"")),p[0]&32&&(ke.tooltip=e[5]),A.$set(ke);const lt={};p[1]&128&&(lt.$$scope={dirty:p,ctx:e}),ie.$set(lt),e[3]?Z?(Z.p(e,p),p[0]&8&&g(Z,1)):(Z=$t(e),Z.c(),g(Z,1),Z.m(Te.parentNode,Te)):Z&&(We(),v(Z,1,1,()=>{Z=null}),Ne());const mt={};p[1]&128&&(mt.$$scope={dirty:p,ctx:e}),ve.$set(mt);const pt={};p[0]&8&&(pt.data=e[3]),ye.$set(pt),e[1]?ee?(ee.p(e,p),p[0]&2&&g(ee,1)):(ee=gt(e),ee.c(),g(ee,1),ee.m(Ae.parentNode,Ae)):ee&&(We(),v(ee,1,1,()=>{ee=null}),Ne()),e[4]?te?(te.p(e,p),p[0]&16&&g(te,1)):(te=vt(e),te.c(),g(te,1),te.m(Le.parentNode,Le)):te&&(We(),v(te,1,1,()=>{te=null}),Ne());const ze={};p[0]&16&&(ze.data=e[4]),p[0]&2&&(ze.title="Top 15 categories of mapped places, "+e[1][0].year),we.$set(ze)},i(e){Fe||(g(u.$$.fragment,e),g(P.$$.fragment,e),g(y.$$.fragment,e),g(B.$$.fragment,e),g(G.$$.fragment,e),g(O.$$.fragment,e),g(x.$$.fragment,e),g(F.$$.fragment,e),g(K),g(A.$$.fragment,e),g(ie.$$.fragment,e),g(Z),g(ve.$$.fragment,e),g(ye.$$.fragment,e),g(ee),g(te),g(we.$$.fragment,e),g(Ce.$$.fragment,e),Fe=!0)},o(e){v(u.$$.fragment,e),v(P.$$.fragment,e),v(y.$$.fragment,e),v(B.$$.fragment,e),v(G.$$.fragment,e),v(O.$$.fragment,e),v(x.$$.fragment,e),v(F.$$.fragment,e),v(K),v(A.$$.fragment,e),v(ie.$$.fragment,e),v(Z),v(ve.$$.fragment,e),v(ye.$$.fragment,e),v(ee),v(te),v(we.$$.fragment,e),v(Ce.$$.fragment,e),Fe=!1},d(e){e&&(r(t),r(n),r(f),r(H),r(C),r(W),r(I),r(U),r(z),r(V),r(j),r(Y),r($),r(m),r(T),r(pe),r(J),r(ae),r(X),r(oe),r(le),r(D),r(L),r(Te),r(Se),r(Re),r(ue),r(Be),r(Ae),r(Le),r(xe),r(_e),r(Ie),r(be),r(Ee),r(ce),r(De),r(he),r(Pe),r(Me),r(Ge)),$e&&$e.d(e),Oe.d(e),r(o),r(a),ge&&ge.d(e),r(l),w(u,e),w(P,e),w(y,e),w(B,e),w(G,e),w(O,e),w(x,e),w(F,e),K&&K.d(e),w(A,e),w(ie,e),Z&&Z.d(e),w(ve,e),w(ye,e),ee&&ee.d(e),te&&te.d(e),w(we,e),w(Ce,e)}}}const N={title:"POI & Offering Advantage map"};function fe(d,t,o){const l=d.map(n=>n[t]).filter(n=>n!=null&&!isNaN(n)).reduce((n,u)=>Math.max(n,Math.abs(u-o)),0)||1;return[o-l,o+l]}function ra(d,t,o){let a,l,n;ft(d,Dt,D=>o(25,l=D)),ft(d,ut,D=>o(30,n=D));let{data:u}=t,{data:f={},customFormattingSettings:H,__db:M,inputs:C}=u;ht(ut,n="9a4cb0405bffb581fa65fd69e4001a3a",n);let P=Rt(St(C));kt(P.subscribe(D=>o(0,C=D))),Ht(It,{getCustomFormats:()=>H.customFormats||[]});const W=(D,i)=>Nt(M.query,D,{query_name:i});Bt(W),l.params,Ct(()=>!0);let y={initialData:void 0,initialError:void 0},I=He`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
    )
select
    b.area_code,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag
from base as b
where b.snapshot_year = ${C.year.value}`,B=`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
    )
select
    b.area_code,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag
from base as b
where b.snapshot_year = ${C.year.value}`;f.poi_map_data_data&&(f.poi_map_data_data instanceof Error?y.initialError=f.poi_map_data_data:y.initialData=f.poi_map_data_data,f.poi_map_data_columns&&(y.knownColumns=f.poi_map_data_columns));let U,G=!1;const z=je.createReactive({callback:D=>{o(2,U=D)},execFn:W},{id:"poi_map_data",...y});z(B,{noResolve:I,...y}),globalThis[Symbol.for("poi_map_data")]={get value(){return U}};let O={initialData:void 0,initialError:void 0},V=He`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`,x=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`;f.poi_citywide_data&&(f.poi_citywide_data instanceof Error?O.initialError=f.poi_citywide_data:O.initialData=f.poi_citywide_data,f.poi_citywide_columns&&(O.knownColumns=f.poi_citywide_columns));let j,F=!1;const Y=je.createReactive({callback:D=>{o(3,j=D)},execFn:W},{id:"poi_citywide",...O});Y(x,{noResolve:V,...O}),globalThis[Symbol.for("poi_citywide")]={get value(){return j}};let $={initialData:void 0,initialError:void 0},A=He`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`,m=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`;f.poi_latest_year_data&&(f.poi_latest_year_data instanceof Error?$.initialError=f.poi_latest_year_data:$.initialData=f.poi_latest_year_data,f.poi_latest_year_columns&&($.knownColumns=f.poi_latest_year_columns));let T,se=!1;const pe=je.createReactive({callback:D=>{o(1,T=D)},execFn:W},{id:"poi_latest_year",...$});pe(m,{noResolve:A,...$}),globalThis[Symbol.for("poi_latest_year")]={get value(){return T}};let J={initialData:void 0,initialError:void 0},ae=He`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${T[0].year}
group by all
order by poi_count desc
limit 15`,X=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${T[0].year}
group by all
order by poi_count desc
limit 15`;f.poi_mix_latest_data&&(f.poi_mix_latest_data instanceof Error?J.initialError=f.poi_mix_latest_data:J.initialData=f.poi_mix_latest_data,f.poi_mix_latest_columns&&(J.knownColumns=f.poi_mix_latest_columns));let de,oe=!1;const ie=je.createReactive({callback:D=>{o(4,de=D)},execFn:W},{id:"poi_mix_latest",...J});ie(X,{noResolve:ae,...J}),globalThis[Symbol.for("poi_mix_latest")]={get value(){return de}};const le=["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"];return d.$$set=D=>{"data"in D&&o(7,u=D.data)},d.$$.update=()=>{d.$$.dirty[0]&128&&o(8,{data:f={},customFormattingSettings:H,__db:M}=u,f),d.$$.dirty[0]&256&&xt.set(Object.keys(f).length>0),d.$$.dirty[0]&33554432&&l.params,d.$$.dirty[0]&1&&o(10,I=He`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
    )
select
    b.area_code,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag
from base as b
where b.snapshot_year = ${C.year.value}`),d.$$.dirty[0]&1&&o(11,B=`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
    )
select
    b.area_code,
    b.poi_density_per_km2,
    b.poi_count,
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag
from base as b
where b.snapshot_year = ${C.year.value}`),d.$$.dirty[0]&7680&&(I||!G?I||(z(B,{noResolve:I,...y}),o(12,G=!0)):z(B,{noResolve:I})),d.$$.dirty[0]&122880&&(V||!F?V||(Y(x,{noResolve:V,...O}),o(16,F=!0)):Y(x,{noResolve:V})),d.$$.dirty[0]&1966080&&(A||!se?A||(pe(m,{noResolve:A,...$}),o(20,se=!0)):pe(m,{noResolve:A})),d.$$.dirty[0]&2&&o(22,ae=He`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${T[0].year}
group by all
order by poi_count desc
limit 15`),d.$$.dirty[0]&2&&o(23,X=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${T[0].year}
group by all
order by poi_count desc
limit 15`),d.$$.dirty[0]&31457280&&(ae||!oe?ae||(ie(X,{noResolve:ae,...J}),o(24,oe=!0)):ie(X,{noResolve:ae})),d.$$.dirty[0]&1&&o(5,a=[{id:C.metric.value==="density"?C.view==="stock"?"poi_density_per_km2":"density_delta":C.view==="stock"?"oa_domain":"oa_delta",title:(C.metric.value==="density"?"POI density / km²":"Offering Advantage")+(C.view==="development"?" (change vs. previous year)":""),fmt:"num1"},{id:"poi_count",title:"Mapped places (this domain)",fmt:"num0"},{id:"area_code",title:"Gebiet code",valueClass:"text-xs opacity-60",fmt:"id"}])},o(14,V=He`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`),o(15,x=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`),o(18,A=He`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`),o(19,m=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`),[C,T,U,j,de,a,le,u,f,y,I,B,G,O,V,x,F,$,A,m,se,J,ae,X,oe,l]}class Ha extends At{constructor(t){super(),Lt(this,t,ra,na,wt,{data:7},null,[-1,-1])}}export{Ha as component};
