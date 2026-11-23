import{s as vt,d as i,i as r,a as Ue,b as B,c,h as wt,e as R,f as Ve,k as U,l as $,m as I,n as _t,o as kt,p as Ht,q as Ct,r as Ot,u as me,j as ee,t as te,g as St}from"../chunks/scheduler.wXRIqz25.js";import{S as xt,i as Lt,d as v,t as g,a as h,c as We,m as w,b as k,e as H,g as je}from"../chunks/index.uz5rP6Z2.js";import{F as At}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Tt}from"../chunks/Hero.C0o6T8tj.js";import{P as Mt}from"../chunks/PolygonMap.DD1ANdqB.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as be,w as qt}from"../chunks/entry.DotynpIs.js";import{A as Me}from"../chunks/Alert.DFISYc09.js";import{e as Gt,s as Bt,Q as ze,p as Rt,a as ft,r as ut,C as It}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as Ce}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as Ye,a as F}from"../chunks/Dropdown.Dl2mephJ.js";import{B as Et,a as ct}from"../chunks/ButtonGroup.CVfHA_5U.js";import{p as Pt}from"../chunks/stores.DJGNasUV.js";import{Q as Qe}from"../chunks/QueryViewer.RFckNDEV.js";import{B as Dt}from"../chunks/BarChart.Cy9nf948.js";import{L as Ft}from"../chunks/LineChart.DDKWAAFN.js";import{p as Nt}from"../chunks/profile.BW8tN6E9.js";function Wt(d){let n,s=N.title+"",a;return{c(){n=I("h1"),a=te(s),this.h()},l(l){n=R(l,"H1",{class:!0});var o=St(n);a=ee(o,s),o.forEach(i),this.h()},h(){B(n,"class","title")},m(l,o){r(l,n,o),Ue(n,a)},p:me,d(l){l&&i(n)}}}function jt(d){return{c(){this.h()},l(n){this.h()},h(){document.title="Evidence"},m:me,p:me,d:me}}function zt(d){let n,s,a,l,o;return document.title=n=N.title,{c(){s=$(),a=I("meta"),l=$(),o=I("meta"),this.h()},l(f){s=c(f),a=R(f,"META",{property:!0,content:!0}),l=c(f),o=R(f,"META",{name:!0,content:!0}),this.h()},h(){var f,_;B(a,"property","og:title"),B(a,"content",((f=N.og)==null?void 0:f.title)??N.title),B(o,"name","twitter:title"),B(o,"content",((_=N.og)==null?void 0:_.title)??N.title)},m(f,_){r(f,s,_),r(f,a,_),r(f,l,_),r(f,o,_)},p(f,_){_&0&&n!==(n=N.title)&&(document.title=n)},d(f){f&&(i(s),i(a),i(l),i(o))}}}function Ut(d){var o,f;let n,s,a=(N.description||((o=N.og)==null?void 0:o.description))&&Vt(),l=((f=N.og)==null?void 0:f.image)&&Qt();return{c(){a&&a.c(),n=$(),l&&l.c(),s=Ve()},l(_){a&&a.l(_),n=c(_),l&&l.l(_),s=Ve()},m(_,u){a&&a.m(_,u),r(_,n,u),l&&l.m(_,u),r(_,s,u)},p(_,u){var G,E;(N.description||(G=N.og)!=null&&G.description)&&a.p(_,u),(E=N.og)!=null&&E.image&&l.p(_,u)},d(_){_&&(i(n),i(s)),a&&a.d(_),l&&l.d(_)}}}function Vt(d){let n,s,a,l,o;return{c(){n=I("meta"),s=$(),a=I("meta"),l=$(),o=I("meta"),this.h()},l(f){n=R(f,"META",{name:!0,content:!0}),s=c(f),a=R(f,"META",{property:!0,content:!0}),l=c(f),o=R(f,"META",{name:!0,content:!0}),this.h()},h(){var f,_,u;B(n,"name","description"),B(n,"content",N.description??((f=N.og)==null?void 0:f.description)),B(a,"property","og:description"),B(a,"content",((_=N.og)==null?void 0:_.description)??N.description),B(o,"name","twitter:description"),B(o,"content",((u=N.og)==null?void 0:u.description)??N.description)},m(f,_){r(f,n,_),r(f,s,_),r(f,a,_),r(f,l,_),r(f,o,_)},p:me,d(f){f&&(i(n),i(s),i(a),i(l),i(o))}}}function Qt(d){let n,s,a;return{c(){n=I("meta"),s=$(),a=I("meta"),this.h()},l(l){n=R(l,"META",{property:!0,content:!0}),s=c(l),a=R(l,"META",{name:!0,content:!0}),this.h()},h(){var l,o;B(n,"property","og:image"),B(n,"content",ft((l=N.og)==null?void 0:l.image)),B(a,"name","twitter:image"),B(a,"content",ft((o=N.og)==null?void 0:o.image))},m(l,o){r(l,n,o),r(l,s,o),r(l,a,o)},p:me,d(l){l&&(i(n),i(s),i(a))}}}function Zt(d){let n,s="How to read this:",a,l,o="OA = 1.0",f,_,u="above 1.0",G,E,S="below 1.0",V,C,W="Density",M,P,D='"Stock vs. development"',j,x,z='"Change since previous year"',q,y,O="methodology §6",Z;return{c(){n=I("b"),n.textContent=s,a=$(),l=I("b"),l.textContent=o,f=te(` means an area has exactly the Hamburg-wide average share
  of a POI domain; `),_=I("b"),_.textContent=u,G=te(" means that domain is over-represented there, "),E=I("b"),E.textContent=S,V=te(`
  means under-represented. `),C=I("b"),C.textContent=W,M=te(` is simply mapped-place count per km². Switch
  `),P=I("b"),P.textContent=D,j=te(" to "),x=I("b"),x.textContent=z,q=te(` to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see `),y=I("a"),y.textContent=O,Z=te(`'s structural rule against pooled
  cross-city comparison).`),this.h()},l(b){n=R(b,"B",{"data-svelte-h":!0}),U(n)!=="svelte-1d2ahpj"&&(n.textContent=s),a=c(b),l=R(b,"B",{"data-svelte-h":!0}),U(l)!=="svelte-17c8v7u"&&(l.textContent=o),f=ee(b,` means an area has exactly the Hamburg-wide average share
  of a POI domain; `),_=R(b,"B",{"data-svelte-h":!0}),U(_)!=="svelte-11ia4c8"&&(_.textContent=u),G=ee(b," means that domain is over-represented there, "),E=R(b,"B",{"data-svelte-h":!0}),U(E)!=="svelte-1m0m3gk"&&(E.textContent=S),V=ee(b,`
  means under-represented. `),C=R(b,"B",{"data-svelte-h":!0}),U(C)!=="svelte-uzvr2g"&&(C.textContent=W),M=ee(b,` is simply mapped-place count per km². Switch
  `),P=R(b,"B",{"data-svelte-h":!0}),U(P)!=="svelte-17y0108"&&(P.textContent=D),j=ee(b," to "),x=R(b,"B",{"data-svelte-h":!0}),U(x)!=="svelte-t4tx04"&&(x.textContent=z),q=ee(b,` to see year-over-year
  movement instead of the point-in-time value. This map covers Hamburg only — its Offering
  Advantage baseline is computed against Hamburg's own citywide average, never pooled with
  Berlin's (see `),y=R(b,"A",{href:!0,"data-svelte-h":!0}),U(y)!=="svelte-fe16dh"&&(y.textContent=O),Z=ee(b,`'s structural rule against pooled
  cross-city comparison).`),this.h()},h(){B(y,"href","/gentriduck/methodology")},m(b,T){r(b,n,T),r(b,a,T),r(b,l,T),r(b,f,T),r(b,_,T),r(b,G,T),r(b,E,T),r(b,V,T),r(b,C,T),r(b,M,T),r(b,P,T),r(b,j,T),r(b,x,T),r(b,q,T),r(b,y,T),r(b,Z,T)},p:me,d(b){b&&(i(n),i(a),i(l),i(f),i(_),i(G),i(E),i(V),i(C),i(M),i(P),i(j),i(x),i(q),i(y),i(Z))}}}function Yt(d){let n,s="Gebiet names are labels; 0 and the grey hatching have set meanings.",a,l,o=`gentrification
  map`,f,_,u="POI density",G,E,S="0",V,C,W="Offering Advantage",M,P,D=`OSM's mapping coverage is not spatially neutral: completeness tends to correlate with
  area advantage, and poorer/peripheral areas are typically less thoroughly mapped than
  richer/central ones`,j,x,z="Berlin POI map",q;return{c(){n=I("b"),n.textContent=s,a=te(` Hamburg's
  statistische Gebiete carry only a numeric code, so each is labelled by its Stadtteil plus an
  OpenStreetMap neighbourhood name or its code (see the `),l=I("a"),l.textContent=o,f=te("); hover any area for its label. On the "),_=I("b"),_.textContent=u,G=te(` view, a Gebiet with no mapped
  place of the selected domain that year is shown as `),E=I("b"),E.textContent=S,V=te(`, the lowest colour on the scale. On
  the `),C=I("b"),C.textContent=W,M=te(` view, a Gebiet is hatched grey ("No data") in two cases: the
  selected domain has no mapped place there that year (Offering Advantage is only computed for a
  domain present in the area), or the Gebiet-year is thinly mapped. Offering Advantage is a
  compositional ratio (a location quotient) — in a Gebiet-year with very few mapped places overall,
  a single new or removed business can swing its value disproportionately, so Gebiet-years below
  the same minimum-mapped-place threshold used for Berlin are hatched rather than given a
  potentially misleading value. The raw mapped-place count is always visible in the tooltip.
  `),P=I("b"),P.textContent=D,j=te(` (Haklay, M. 2010, "How Good is Volunteered Geographical Information?",
  *Environment and Planning B*). So a 0 or a blank Gebiet-year can reflect an OSM coverage gap
  rather than a real absence of commercial activity — please don't read it as evidence that
  nothing is happening there. Hamburg's own affluent Alster–Elbe axis against a deprived eastern/southern
  periphery is a sharper socio-spatial divide than Berlin's more mosaic pattern, so this
  cross-sectional under-mapping gradient may be even steeper here (see the
  `),x=I("a"),x.textContent=z,q=te(" for the same caveat applied there)."),this.h()},l(y){n=R(y,"B",{"data-svelte-h":!0}),U(n)!=="svelte-m0rleh"&&(n.textContent=s),a=ee(y,` Hamburg's
  statistische Gebiete carry only a numeric code, so each is labelled by its Stadtteil plus an
  OpenStreetMap neighbourhood name or its code (see the `),l=R(y,"A",{href:!0,"data-svelte-h":!0}),U(l)!=="svelte-195e3sq"&&(l.textContent=o),f=ee(y,"); hover any area for its label. On the "),_=R(y,"B",{"data-svelte-h":!0}),U(_)!=="svelte-10svj7c"&&(_.textContent=u),G=ee(y,` view, a Gebiet with no mapped
  place of the selected domain that year is shown as `),E=R(y,"B",{"data-svelte-h":!0}),U(E)!=="svelte-12bhsds"&&(E.textContent=S),V=ee(y,`, the lowest colour on the scale. On
  the `),C=R(y,"B",{"data-svelte-h":!0}),U(C)!=="svelte-197gaox"&&(C.textContent=W),M=ee(y,` view, a Gebiet is hatched grey ("No data") in two cases: the
  selected domain has no mapped place there that year (Offering Advantage is only computed for a
  domain present in the area), or the Gebiet-year is thinly mapped. Offering Advantage is a
  compositional ratio (a location quotient) — in a Gebiet-year with very few mapped places overall,
  a single new or removed business can swing its value disproportionately, so Gebiet-years below
  the same minimum-mapped-place threshold used for Berlin are hatched rather than given a
  potentially misleading value. The raw mapped-place count is always visible in the tooltip.
  `),P=R(y,"B",{"data-svelte-h":!0}),U(P)!=="svelte-1k67crw"&&(P.textContent=D),j=ee(y,` (Haklay, M. 2010, "How Good is Volunteered Geographical Information?",
  *Environment and Planning B*). So a 0 or a blank Gebiet-year can reflect an OSM coverage gap
  rather than a real absence of commercial activity — please don't read it as evidence that
  nothing is happening there. Hamburg's own affluent Alster–Elbe axis against a deprived eastern/southern
  periphery is a sharper socio-spatial divide than Berlin's more mosaic pattern, so this
  cross-sectional under-mapping gradient may be even steeper here (see the
  `),x=R(y,"A",{href:!0,"data-svelte-h":!0}),U(x)!=="svelte-1iq2t0m"&&(x.textContent=z),q=ee(y," for the same caveat applied there)."),this.h()},h(){B(l,"href","/gentriduck/hamburg/maps"),B(x,"href","/gentriduck/berlin/poi-map")},m(y,O){r(y,n,O),r(y,a,O),r(y,l,O),r(y,f,O),r(y,_,O),r(y,G,O),r(y,E,O),r(y,V,O),r(y,C,O),r(y,M,O),r(y,P,O),r(y,j,O),r(y,x,O),r(y,q,O)},p:me,d(y){y&&(i(n),i(a),i(l),i(f),i(_),i(G),i(E),i(V),i(C),i(M),i(P),i(j),i(x),i(q))}}}function Xt(d){let n,s,a,l;return n=new F({props:{value:"density",valueLabel:"POI density (mapped places per km²)"}}),a=new F({props:{value:"oa",valueLabel:"Offering Advantage (location quotient vs. Hamburg-wide average)"}}),{c(){H(n.$$.fragment),s=$(),H(a.$$.fragment)},l(o){k(n.$$.fragment,o),s=c(o),k(a.$$.fragment,o)},m(o,f){w(n,o,f),r(o,s,f),w(a,o,f),l=!0},p:me,i(o){l||(h(n.$$.fragment,o),h(a.$$.fragment,o),l=!0)},o(o){g(n.$$.fragment,o),g(a.$$.fragment,o),l=!1},d(o){o&&i(s),v(n,o),v(a,o)}}}function Jt(d){let n,s,a,l,o,f,_,u,G,E,S,V,C,W,M,P,D,j,x,z,q,y,O,Z,b,T;return n=new F({props:{value:"Entertainment",valueLabel:"Entertainment"}}),a=new F({props:{value:"Gastronomy",valueLabel:"Gastronomy"}}),o=new F({props:{value:"Mobility",valueLabel:"Mobility"}}),_=new F({props:{value:"Office",valueLabel:"Office"}}),G=new F({props:{value:"Other",valueLabel:"Other"}}),S=new F({props:{value:"Public Service",valueLabel:"Public Service"}}),C=new F({props:{value:"Public Space",valueLabel:"Public Space"}}),M=new F({props:{value:"Religion",valueLabel:"Religion"}}),D=new F({props:{value:"Retail",valueLabel:"Retail"}}),x=new F({props:{value:"Services",valueLabel:"Services"}}),q=new F({props:{value:"Sports and Recreation",valueLabel:"Sports and Recreation"}}),O=new F({props:{value:"Tourism",valueLabel:"Tourism"}}),b=new F({props:{value:"Vacancy",valueLabel:"Vacancy"}}),{c(){H(n.$$.fragment),s=$(),H(a.$$.fragment),l=$(),H(o.$$.fragment),f=$(),H(_.$$.fragment),u=$(),H(G.$$.fragment),E=$(),H(S.$$.fragment),V=$(),H(C.$$.fragment),W=$(),H(M.$$.fragment),P=$(),H(D.$$.fragment),j=$(),H(x.$$.fragment),z=$(),H(q.$$.fragment),y=$(),H(O.$$.fragment),Z=$(),H(b.$$.fragment)},l(m){k(n.$$.fragment,m),s=c(m),k(a.$$.fragment,m),l=c(m),k(o.$$.fragment,m),f=c(m),k(_.$$.fragment,m),u=c(m),k(G.$$.fragment,m),E=c(m),k(S.$$.fragment,m),V=c(m),k(C.$$.fragment,m),W=c(m),k(M.$$.fragment,m),P=c(m),k(D.$$.fragment,m),j=c(m),k(x.$$.fragment,m),z=c(m),k(q.$$.fragment,m),y=c(m),k(O.$$.fragment,m),Z=c(m),k(b.$$.fragment,m)},m(m,L){w(n,m,L),r(m,s,L),w(a,m,L),r(m,l,L),w(o,m,L),r(m,f,L),w(_,m,L),r(m,u,L),w(G,m,L),r(m,E,L),w(S,m,L),r(m,V,L),w(C,m,L),r(m,W,L),w(M,m,L),r(m,P,L),w(D,m,L),r(m,j,L),w(x,m,L),r(m,z,L),w(q,m,L),r(m,y,L),w(O,m,L),r(m,Z,L),w(b,m,L),T=!0},p:me,i(m){T||(h(n.$$.fragment,m),h(a.$$.fragment,m),h(o.$$.fragment,m),h(_.$$.fragment,m),h(G.$$.fragment,m),h(S.$$.fragment,m),h(C.$$.fragment,m),h(M.$$.fragment,m),h(D.$$.fragment,m),h(x.$$.fragment,m),h(q.$$.fragment,m),h(O.$$.fragment,m),h(b.$$.fragment,m),T=!0)},o(m){g(n.$$.fragment,m),g(a.$$.fragment,m),g(o.$$.fragment,m),g(_.$$.fragment,m),g(G.$$.fragment,m),g(S.$$.fragment,m),g(C.$$.fragment,m),g(M.$$.fragment,m),g(D.$$.fragment,m),g(x.$$.fragment,m),g(q.$$.fragment,m),g(O.$$.fragment,m),g(b.$$.fragment,m),T=!1},d(m){m&&(i(s),i(l),i(f),i(u),i(E),i(V),i(W),i(P),i(j),i(z),i(y),i(Z)),v(n,m),v(a,m),v(o,m),v(_,m),v(G,m),v(S,m),v(C,m),v(M,m),v(D,m),v(x,m),v(q,m),v(O,m),v(b,m)}}}function Kt(d){let n,s,a,l,o,f,_,u,G,E,S,V,C,W,M,P,D,j,x,z,q,y,O,Z,b,T,m,L,ae,pe,ne,ie,Q,de,re,oe,se,le;return n=new F({props:{value:"2008",valueLabel:"2008"}}),a=new F({props:{value:"2009",valueLabel:"2009"}}),o=new F({props:{value:"2010",valueLabel:"2010"}}),_=new F({props:{value:"2011",valueLabel:"2011"}}),G=new F({props:{value:"2012",valueLabel:"2012"}}),S=new F({props:{value:"2013",valueLabel:"2013"}}),C=new F({props:{value:"2014",valueLabel:"2014"}}),M=new F({props:{value:"2015",valueLabel:"2015"}}),D=new F({props:{value:"2016",valueLabel:"2016"}}),x=new F({props:{value:"2017",valueLabel:"2017"}}),q=new F({props:{value:"2018",valueLabel:"2018"}}),O=new F({props:{value:"2019",valueLabel:"2019"}}),b=new F({props:{value:"2020",valueLabel:"2020"}}),m=new F({props:{value:"2021",valueLabel:"2021"}}),ae=new F({props:{value:"2022",valueLabel:"2022"}}),ne=new F({props:{value:"2023",valueLabel:"2023"}}),Q=new F({props:{value:"2024",valueLabel:"2024"}}),re=new F({props:{value:"2025",valueLabel:"2025"}}),se=new F({props:{value:"2026",valueLabel:"2026"}}),{c(){H(n.$$.fragment),s=$(),H(a.$$.fragment),l=$(),H(o.$$.fragment),f=$(),H(_.$$.fragment),u=$(),H(G.$$.fragment),E=$(),H(S.$$.fragment),V=$(),H(C.$$.fragment),W=$(),H(M.$$.fragment),P=$(),H(D.$$.fragment),j=$(),H(x.$$.fragment),z=$(),H(q.$$.fragment),y=$(),H(O.$$.fragment),Z=$(),H(b.$$.fragment),T=$(),H(m.$$.fragment),L=$(),H(ae.$$.fragment),pe=$(),H(ne.$$.fragment),ie=$(),H(Q.$$.fragment),de=$(),H(re.$$.fragment),oe=$(),H(se.$$.fragment)},l(t){k(n.$$.fragment,t),s=c(t),k(a.$$.fragment,t),l=c(t),k(o.$$.fragment,t),f=c(t),k(_.$$.fragment,t),u=c(t),k(G.$$.fragment,t),E=c(t),k(S.$$.fragment,t),V=c(t),k(C.$$.fragment,t),W=c(t),k(M.$$.fragment,t),P=c(t),k(D.$$.fragment,t),j=c(t),k(x.$$.fragment,t),z=c(t),k(q.$$.fragment,t),y=c(t),k(O.$$.fragment,t),Z=c(t),k(b.$$.fragment,t),T=c(t),k(m.$$.fragment,t),L=c(t),k(ae.$$.fragment,t),pe=c(t),k(ne.$$.fragment,t),ie=c(t),k(Q.$$.fragment,t),de=c(t),k(re.$$.fragment,t),oe=c(t),k(se.$$.fragment,t)},m(t,A){w(n,t,A),r(t,s,A),w(a,t,A),r(t,l,A),w(o,t,A),r(t,f,A),w(_,t,A),r(t,u,A),w(G,t,A),r(t,E,A),w(S,t,A),r(t,V,A),w(C,t,A),r(t,W,A),w(M,t,A),r(t,P,A),w(D,t,A),r(t,j,A),w(x,t,A),r(t,z,A),w(q,t,A),r(t,y,A),w(O,t,A),r(t,Z,A),w(b,t,A),r(t,T,A),w(m,t,A),r(t,L,A),w(ae,t,A),r(t,pe,A),w(ne,t,A),r(t,ie,A),w(Q,t,A),r(t,de,A),w(re,t,A),r(t,oe,A),w(se,t,A),le=!0},p:me,i(t){le||(h(n.$$.fragment,t),h(a.$$.fragment,t),h(o.$$.fragment,t),h(_.$$.fragment,t),h(G.$$.fragment,t),h(S.$$.fragment,t),h(C.$$.fragment,t),h(M.$$.fragment,t),h(D.$$.fragment,t),h(x.$$.fragment,t),h(q.$$.fragment,t),h(O.$$.fragment,t),h(b.$$.fragment,t),h(m.$$.fragment,t),h(ae.$$.fragment,t),h(ne.$$.fragment,t),h(Q.$$.fragment,t),h(re.$$.fragment,t),h(se.$$.fragment,t),le=!0)},o(t){g(n.$$.fragment,t),g(a.$$.fragment,t),g(o.$$.fragment,t),g(_.$$.fragment,t),g(G.$$.fragment,t),g(S.$$.fragment,t),g(C.$$.fragment,t),g(M.$$.fragment,t),g(D.$$.fragment,t),g(x.$$.fragment,t),g(q.$$.fragment,t),g(O.$$.fragment,t),g(b.$$.fragment,t),g(m.$$.fragment,t),g(ae.$$.fragment,t),g(ne.$$.fragment,t),g(Q.$$.fragment,t),g(re.$$.fragment,t),g(se.$$.fragment,t),le=!1},d(t){t&&(i(s),i(l),i(f),i(u),i(E),i(V),i(W),i(P),i(j),i(z),i(y),i(Z),i(T),i(L),i(pe),i(ie),i(de),i(oe)),v(n,t),v(a,t),v(o,t),v(_,t),v(G,t),v(S,t),v(C,t),v(M,t),v(D,t),v(x,t),v(q,t),v(O,t),v(b,t),v(m,t),v(ae,t),v(ne,t),v(Q,t),v(re,t),v(se,t)}}}function ea(d){let n,s,a,l;return n=new ct({props:{value:"stock",valueLabel:"Stock (this year's value)",default:!0}}),a=new ct({props:{value:"development",valueLabel:"Change since previous year"}}),{c(){H(n.$$.fragment),s=$(),H(a.$$.fragment)},l(o){k(n.$$.fragment,o),s=c(o),k(a.$$.fragment,o)},m(o,f){w(n,o,f),r(o,s,f),w(a,o,f),l=!0},p:me,i(o){l||(h(n.$$.fragment,o),h(a.$$.fragment,o),l=!0)},o(o){g(n.$$.fragment,o),g(a.$$.fragment,o),l=!1},d(o){o&&i(s),v(n,o),v(a,o)}}}function ta(d){let n,s='"Change since previous year" for POI density is not adjusted for growing OSM coverage.',a;return{c(){n=I("b"),n.textContent=s,a=te(`
  Mapper coverage grew fastest in Hamburg's earliest years (the coverage curve stabilizes only
  around ~2014–2015 — see the citywide growth chart further down this page), so an early-year
  density delta can reflect new OSM contributors catching up rather than real commercial change.
  Offering Advantage's "change" view is less exposed to this: it is a same-year ratio to the
  citywide average, so an area-uniform coverage shift cancels out; density's raw count carries no
  such protection. Read early-year density deltas cautiously, especially before ~2014.`)},l(l){n=R(l,"B",{"data-svelte-h":!0}),U(n)!=="svelte-b5xv1v"&&(n.textContent=s),a=ee(l,`
  Mapper coverage grew fastest in Hamburg's earliest years (the coverage curve stabilizes only
  around ~2014–2015 — see the citywide growth chart further down this page), so an early-year
  density delta can reflect new OSM contributors catching up rather than real commercial change.
  Offering Advantage's "change" view is less exposed to this: it is a same-year ratio to the
  citywide average, so an area-uniform coverage shift cancels out; density's raw count carries no
  such protection. Read early-year density deltas cautiously, especially before ~2014.`)},m(l,o){r(l,n,o),r(l,a,o)},p:me,d(l){l&&(i(n),i(a))}}}function $t(d){let n,s;return n=new Qe({props:{queryID:"poi_map_data",queryResult:d[3]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),s=!0},p(a,l){const o={};l[0]&8&&(o.queryResult=a[3]),n.$set(o)},i(a){s||(h(n.$$.fragment,a),s=!0)},o(a){g(n.$$.fragment,a),s=!1},d(a){v(n,a)}}}function aa(d){let n,s,a="Berlin's equivalent section",l,o,f="the Hamburg data hub",_;return{c(){n=te(`A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  `),s=I("a"),s.textContent=a,l=te(`, there is no land-value/rent chart here:
  Hamburg's price/rent mart now carries narrower-in-kind data (Wohnlage tier composition +
  modelled Mietenspiegel rent, I21-i/#303) than Berlin's, but no chart or section is built from it
  on this page (see `),o=I("a"),o.textContent=f,_=te(")."),this.h()},l(u){n=ee(u,`A simple citywide total of the same governed data used above — no new indicator, weight, or
  method is introduced here, so no separate methodology sign-off applies. Unlike
  `),s=R(u,"A",{href:!0,"data-svelte-h":!0}),U(s)!=="svelte-ypxl3v"&&(s.textContent=a),l=ee(u,`, there is no land-value/rent chart here:
  Hamburg's price/rent mart now carries narrower-in-kind data (Wohnlage tier composition +
  modelled Mietenspiegel rent, I21-i/#303) than Berlin's, but no chart or section is built from it
  on this page (see `),o=R(u,"A",{href:!0,"data-svelte-h":!0}),U(o)!=="svelte-rsbj88"&&(o.textContent=f),_=ee(u,")."),this.h()},h(){B(s,"href","/gentriduck/berlin/poi-map"),B(o,"href","/gentriduck/hamburg")},m(u,G){r(u,n,G),r(u,s,G),r(u,l,G),r(u,o,G),r(u,_,G)},p:me,d(u){u&&(i(n),i(s),i(l),i(o),i(_))}}}function ht(d){let n,s;return n=new Qe({props:{queryID:"poi_citywide",queryResult:d[4]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),s=!0},p(a,l){const o={};l[0]&16&&(o.queryResult=a[4]),n.$set(o)},i(a){s||(h(n.$$.fragment,a),s=!0)},o(a){g(n.$$.fragment,a),s=!1},d(a){v(n,a)}}}function na(d){let n;return{c(){n=te(`As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.`)},l(s){n=ee(s,`As with Berlin, these are OpenStreetMap-derived counts — growing map-contributor coverage over
  time inflates early-year counts on its own, independent of real-world change. Read the early
  years cautiously.`)},m(s,a){r(s,n,a)},d(s){s&&i(n)}}}function bt(d){let n,s;return n=new Qe({props:{queryID:"poi_latest_year",queryResult:d[1]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),s=!0},p(a,l){const o={};l[0]&2&&(o.queryResult=a[1]),n.$set(o)},i(a){s||(h(n.$$.fragment,a),s=!0)},o(a){g(n.$$.fragment,a),s=!1},d(a){v(n,a)}}}function gt(d){let n,s;return n=new Qe({props:{queryID:"poi_mix_latest",queryResult:d[5]}}),{c(){H(n.$$.fragment)},l(a){k(n.$$.fragment,a)},m(a,l){w(n,a,l),s=!0},p(a,l){const o={};l[0]&32&&(o.queryResult=a[5]),n.$set(o)},i(a){s||(h(n.$$.fragment,a),s=!0)},o(a){g(n.$$.fragment,a),s=!1},d(a){v(n,a)}}}function ia(d){let n,s,a,l,o,f,_,u,G=`This map shows where different kinds of shops, cafés, and other mapped places (&quot;points of
interest,&quot; or POIs) are concentrated across Hamburg — either as raw density, or as
<strong class="markdown">Offering Advantage (OA)</strong>: how over- or under-represented a POI domain is in an area compared
to the citywide (Hamburg-wide) average for that domain. See
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
and <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md" rel="nofollow" class="markdown">ADR-0018</a>
for the full method, or the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for a plain-language walkthrough. This
data does not depend on Hamburg&#39;s gentrification-index admission (H3, #237) — it is a separate,
city-agnostic mart that has carried real Hamburg rows since H1 (#40).`,E,S,V,C,W,M,P,D,j,x,z,q,y,O,Z,b,T,m,L,ae=`Click a Gebiet on the map to open its profile page, which also shows the Gebiet's full
OA-by-domain profile as a radar chart.`,pe,ne,ie,Q,de='<a href="#citywide-context-poi-growth">Citywide context: POI growth</a>',re,oe,se,le,t='<a href="#shops-cafés--amenities-citywide">Shops, cafés &amp; amenities, citywide</a>',A,Se,ge,qe,ye,Ge,fe,Xe='<a href="#what-kinds-of-places-make-up-that-total-latest-year">What kinds of places make up that total? (latest year)</a>',Be,xe,Le,ve,Re,ue,Je='<a href="#honest-caveats">Honest caveats</a>',Ie,we,Ke=`<li class="markdown"><strong class="markdown">OSM early-year completeness bias</strong> — the citywide POI-growth chart&#39;s early years should be
read cautiously, for the same reason as Berlin&#39;s (see <a href="/gentriduck/methodology" class="markdown">methodology §6</a>).</li> <li class="markdown"><strong class="markdown">Gebiet names are labels, not official names</strong> — Hamburg&#39;s statistische Gebiete have only a
numeric code, so each is shown as its Stadtteil plus an OpenStreetMap neighbourhood name or its
code (see the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a>).</li> <li class="markdown"><strong class="markdown">No land value or rent chart on this page (yet)</strong> — Hamburg&#39;s price/rent mart now carries
narrower-in-kind data than Berlin&#39;s (Wohnlage tier composition + modelled Mietenspiegel rent,
I21-i/#303: no BRW/land-value equivalent, 2-tier not 3-tier Wohnlage, current-state-only), but no
chart or section is built from it on this page.</li> <li class="markdown"><strong class="markdown">Offering Advantage and POI density are commercial-side signals, not the outcome variable</strong> —
see <a href="/gentriduck/methodology" class="markdown">methodology §1</a>.</li> <li class="markdown"><strong class="markdown">On the Offering Advantage view, thinly-mapped Gebiete are suppressed, not shown as zero</strong> —
same D-3 minimum-mapped-place threshold as Berlin&#39;s map (#274, ADR-0017 D5 D-3); a hatched cell
means &quot;no place of this kind is mapped here&quot; or &quot;too thinly observed,&quot; never &quot;commercially
dead.&quot; The density view does show 0 where no
place of the selected domain is mapped; that is a count of mapped places, so it too can reflect
an OSM coverage gap.</li> <li class="markdown"><strong class="markdown">This map&#39;s Offering Advantage baseline is Hamburg-wide, never pooled with Berlin&#39;s</strong> — see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>&#39;s structural rule against pooled cross-city comparison.</li>`,Ee,ce,et='<a href="#further-reading">Further reading</a>',Pe,ke,tt=`See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
for how Offering Advantage is computed, the <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg gentrification-stage map</a>
for the governed D1/D2 outcome, the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory of what is
and isn&#39;t built for Hamburg, or <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for the full
Berlin/Hamburg comparability caveats.`,De,Ae,Fe,Oe,Ne,$e=typeof N<"u"&&N.title&&N.hide_title!==!0&&Wt();function yt(e,p){return typeof N<"u"&&N.title?zt:jt}let Te=yt()(d),he=typeof N=="object"&&Ut();f=new Tt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"POI & Offering Advantage map",lede:"Where shops, cafés, and other mapped places are concentrated across Hamburg, and how that commercial mix has grown over time — the same Offering Advantage construct used for Berlin, computed independently on Hamburg's own OpenStreetMap history."}}),S=new Me({props:{status:"info",$$slots:{default:[Zt]},$$scope:{ctx:d}}}),C=new Me({props:{status:"warning",$$slots:{default:[Yt]},$$scope:{ctx:d}}}),M=new Ye({props:{name:"metric",title:"Metric",defaultValue:"density",$$slots:{default:[Xt]},$$scope:{ctx:d}}}),D=new Ye({props:{name:"domain",title:"POI domain",defaultValue:"Retail",$$slots:{default:[Jt]},$$scope:{ctx:d}}}),x=new Ye({props:{name:"year",title:"Year",defaultValue:"2025",$$slots:{default:[Kt]},$$scope:{ctx:d}}}),q=new Et({props:{name:"view",title:"Stock vs. development",display:"tabs",defaultValue:"stock",$$slots:{default:[ea]},$$scope:{ctx:d}}}),O=new Me({props:{status:"warning",$$slots:{default:[ta]},$$scope:{ctx:d}}});let Y=d[3]&&$t(d);T=new Mt({props:{data:d[3],geoJsonUrl:`${be}/geo/subarea_l2_live_data.geojson`,geoId:"area_code",areaCol:"area_code",value:d[0].metric.value==="density"?d[2]==="stock"?"poi_density_per_km2":"density_delta":d[2]==="stock"?"oa_domain":"oa_delta",legendType:"scalar",colorPalette:d[0].metric.value==="density"&&d[2]==="stock"?void 0:d[7],min:d[0].metric.value==="oa"?d[2]==="stock"?_e(d[3],"oa_domain",1)[0]:_e(d[3],"oa_delta",0)[0]:d[2]==="development"?_e(d[3],"density_delta",0)[0]:void 0,max:d[0].metric.value==="oa"?d[2]==="stock"?_e(d[3],"oa_domain",1)[1]:_e(d[3],"oa_delta",0)[1]:d[2]==="development"?_e(d[3],"density_delta",0)[1]:void 0,title:"Hamburg statistisches Gebiet — "+(d[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+d[0].domain.value+", "+d[0].year.value+(d[2]==="development"?" (change vs. previous year)":""),link:"link",tooltip:d[6],emptyMessage:"No data for this domain/year combination."}}),oe=new Me({props:{status:"info",$$slots:{default:[aa]},$$scope:{ctx:d}}});let X=d[4]&&ht(d);ge=new Me({props:{status:"info",$$slots:{default:[na]},$$scope:{ctx:d}}}),ye=new Ft({props:{data:d[4],x:"snapshot_year",y:"poi_count",title:"Total mapped shops, cafés & amenities, city of Hamburg",yAxisTitle:"Number of mapped places"}});let J=d[1]&&bt(d),K=d[5]&&gt(d);return ve=new Dt({props:{data:d[5],x:"poi_category_h",y:"poi_count",title:"Top 15 categories of mapped places, "+d[1][0].year,yAxisTitle:"Number of mapped places",swapXY:"true"}}),Oe=new At({}),{c(){$e&&$e.c(),n=$(),Te.c(),s=I("meta"),a=I("meta"),he&&he.c(),l=Ve(),o=$(),H(f.$$.fragment),_=$(),u=I("p"),u.innerHTML=G,E=$(),H(S.$$.fragment),V=$(),H(C.$$.fragment),W=$(),H(M.$$.fragment),P=$(),H(D.$$.fragment),j=$(),H(x.$$.fragment),z=$(),H(q.$$.fragment),y=$(),H(O.$$.fragment),Z=$(),Y&&Y.c(),b=$(),H(T.$$.fragment),m=$(),L=I("p"),L.textContent=ae,pe=$(),ne=I("hr"),ie=$(),Q=I("h2"),Q.innerHTML=de,re=$(),H(oe.$$.fragment),se=$(),le=I("h3"),le.innerHTML=t,A=$(),X&&X.c(),Se=$(),H(ge.$$.fragment),qe=$(),H(ye.$$.fragment),Ge=$(),fe=I("h4"),fe.innerHTML=Xe,Be=$(),J&&J.c(),xe=$(),K&&K.c(),Le=$(),H(ve.$$.fragment),Re=$(),ue=I("h2"),ue.innerHTML=Je,Ie=$(),we=I("ul"),we.innerHTML=Ke,Ee=$(),ce=I("h2"),ce.innerHTML=et,Pe=$(),ke=I("p"),ke.innerHTML=tt,De=$(),Ae=I("hr"),Fe=$(),H(Oe.$$.fragment),this.h()},l(e){$e&&$e.l(e),n=c(e);const p=wt("svelte-2igo1p",document.head);Te.l(p),s=R(p,"META",{name:!0,content:!0}),a=R(p,"META",{name:!0,content:!0}),he&&he.l(p),l=Ve(),p.forEach(i),o=c(e),k(f.$$.fragment,e),_=c(e),u=R(e,"P",{class:!0,"data-svelte-h":!0}),U(u)!=="svelte-z6ys4a"&&(u.innerHTML=G),E=c(e),k(S.$$.fragment,e),V=c(e),k(C.$$.fragment,e),W=c(e),k(M.$$.fragment,e),P=c(e),k(D.$$.fragment,e),j=c(e),k(x.$$.fragment,e),z=c(e),k(q.$$.fragment,e),y=c(e),k(O.$$.fragment,e),Z=c(e),Y&&Y.l(e),b=c(e),k(T.$$.fragment,e),m=c(e),L=R(e,"P",{class:!0,"data-svelte-h":!0}),U(L)!=="svelte-bb6c1d"&&(L.textContent=ae),pe=c(e),ne=R(e,"HR",{class:!0}),ie=c(e),Q=R(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),U(Q)!=="svelte-1aivtag"&&(Q.innerHTML=de),re=c(e),k(oe.$$.fragment,e),se=c(e),le=R(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),U(le)!=="svelte-1pe5ai8"&&(le.innerHTML=t),A=c(e),X&&X.l(e),Se=c(e),k(ge.$$.fragment,e),qe=c(e),k(ye.$$.fragment,e),Ge=c(e),fe=R(e,"H4",{class:!0,id:!0,"data-svelte-h":!0}),U(fe)!=="svelte-1mnfgmg"&&(fe.innerHTML=Xe),Be=c(e),J&&J.l(e),xe=c(e),K&&K.l(e),Le=c(e),k(ve.$$.fragment,e),Re=c(e),ue=R(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),U(ue)!=="svelte-ad0syq"&&(ue.innerHTML=Je),Ie=c(e),we=R(e,"UL",{class:!0,"data-svelte-h":!0}),U(we)!=="svelte-1edes3h"&&(we.innerHTML=Ke),Ee=c(e),ce=R(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),U(ce)!=="svelte-oimjns"&&(ce.innerHTML=et),Pe=c(e),ke=R(e,"P",{class:!0,"data-svelte-h":!0}),U(ke)!=="svelte-1pzelnm"&&(ke.innerHTML=tt),De=c(e),Ae=R(e,"HR",{class:!0}),Fe=c(e),k(Oe.$$.fragment,e),this.h()},h(){B(s,"name","twitter:card"),B(s,"content","summary_large_image"),B(a,"name","twitter:site"),B(a,"content","@evidence_dev"),B(u,"class","markdown"),B(L,"class","markdown"),B(ne,"class","markdown"),B(Q,"class","markdown"),B(Q,"id","citywide-context-poi-growth"),B(le,"class","markdown"),B(le,"id","shops-cafés--amenities-citywide"),B(fe,"class","markdown"),B(fe,"id","what-kinds-of-places-make-up-that-total-latest-year"),B(ue,"class","markdown"),B(ue,"id","honest-caveats"),B(we,"class","markdown"),B(ce,"class","markdown"),B(ce,"id","further-reading"),B(ke,"class","markdown"),B(Ae,"class","markdown")},m(e,p){$e&&$e.m(e,p),r(e,n,p),Te.m(document.head,null),Ue(document.head,s),Ue(document.head,a),he&&he.m(document.head,null),Ue(document.head,l),r(e,o,p),w(f,e,p),r(e,_,p),r(e,u,p),r(e,E,p),w(S,e,p),r(e,V,p),w(C,e,p),r(e,W,p),w(M,e,p),r(e,P,p),w(D,e,p),r(e,j,p),w(x,e,p),r(e,z,p),w(q,e,p),r(e,y,p),w(O,e,p),r(e,Z,p),Y&&Y.m(e,p),r(e,b,p),w(T,e,p),r(e,m,p),r(e,L,p),r(e,pe,p),r(e,ne,p),r(e,ie,p),r(e,Q,p),r(e,re,p),w(oe,e,p),r(e,se,p),r(e,le,p),r(e,A,p),X&&X.m(e,p),r(e,Se,p),w(ge,e,p),r(e,qe,p),w(ye,e,p),r(e,Ge,p),r(e,fe,p),r(e,Be,p),J&&J.m(e,p),r(e,xe,p),K&&K.m(e,p),r(e,Le,p),w(ve,e,p),r(e,Re,p),r(e,ue,p),r(e,Ie,p),r(e,we,p),r(e,Ee,p),r(e,ce,p),r(e,Pe,p),r(e,ke,p),r(e,De,p),r(e,Ae,p),r(e,Fe,p),w(Oe,e,p),Ne=!0},p(e,p){typeof N<"u"&&N.title&&N.hide_title!==!0&&$e.p(e,p),Te.p(e,p),typeof N=="object"&&he.p(e,p);const at={};p[1]&256&&(at.$$scope={dirty:p,ctx:e}),S.$set(at);const nt={};p[1]&256&&(nt.$$scope={dirty:p,ctx:e}),C.$set(nt);const it={};p[1]&256&&(it.$$scope={dirty:p,ctx:e}),M.$set(it);const ot={};p[1]&256&&(ot.$$scope={dirty:p,ctx:e}),D.$set(ot);const rt={};p[1]&256&&(rt.$$scope={dirty:p,ctx:e}),x.$set(rt);const st={};p[1]&256&&(st.$$scope={dirty:p,ctx:e}),q.$set(st);const lt={};p[1]&256&&(lt.$$scope={dirty:p,ctx:e}),O.$set(lt),e[3]?Y?(Y.p(e,p),p[0]&8&&h(Y,1)):(Y=$t(e),Y.c(),h(Y,1),Y.m(b.parentNode,b)):Y&&(je(),g(Y,1,1,()=>{Y=null}),We());const He={};p[0]&8&&(He.data=e[3]),p[0]&5&&(He.value=e[0].metric.value==="density"?e[2]==="stock"?"poi_density_per_km2":"density_delta":e[2]==="stock"?"oa_domain":"oa_delta"),p[0]&5&&(He.colorPalette=e[0].metric.value==="density"&&e[2]==="stock"?void 0:e[7]),p[0]&13&&(He.min=e[0].metric.value==="oa"?e[2]==="stock"?_e(e[3],"oa_domain",1)[0]:_e(e[3],"oa_delta",0)[0]:e[2]==="development"?_e(e[3],"density_delta",0)[0]:void 0),p[0]&13&&(He.max=e[0].metric.value==="oa"?e[2]==="stock"?_e(e[3],"oa_domain",1)[1]:_e(e[3],"oa_delta",0)[1]:e[2]==="development"?_e(e[3],"density_delta",0)[1]:void 0),p[0]&5&&(He.title="Hamburg statistisches Gebiet — "+(e[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+e[0].domain.value+", "+e[0].year.value+(e[2]==="development"?" (change vs. previous year)":"")),p[0]&64&&(He.tooltip=e[6]),T.$set(He);const mt={};p[1]&256&&(mt.$$scope={dirty:p,ctx:e}),oe.$set(mt),e[4]?X?(X.p(e,p),p[0]&16&&h(X,1)):(X=ht(e),X.c(),h(X,1),X.m(Se.parentNode,Se)):X&&(je(),g(X,1,1,()=>{X=null}),We());const pt={};p[1]&256&&(pt.$$scope={dirty:p,ctx:e}),ge.$set(pt);const dt={};p[0]&16&&(dt.data=e[4]),ye.$set(dt),e[1]?J?(J.p(e,p),p[0]&2&&h(J,1)):(J=bt(e),J.c(),h(J,1),J.m(xe.parentNode,xe)):J&&(je(),g(J,1,1,()=>{J=null}),We()),e[5]?K?(K.p(e,p),p[0]&32&&h(K,1)):(K=gt(e),K.c(),h(K,1),K.m(Le.parentNode,Le)):K&&(je(),g(K,1,1,()=>{K=null}),We());const Ze={};p[0]&32&&(Ze.data=e[5]),p[0]&2&&(Ze.title="Top 15 categories of mapped places, "+e[1][0].year),ve.$set(Ze)},i(e){Ne||(h(f.$$.fragment,e),h(S.$$.fragment,e),h(C.$$.fragment,e),h(M.$$.fragment,e),h(D.$$.fragment,e),h(x.$$.fragment,e),h(q.$$.fragment,e),h(O.$$.fragment,e),h(Y),h(T.$$.fragment,e),h(oe.$$.fragment,e),h(X),h(ge.$$.fragment,e),h(ye.$$.fragment,e),h(J),h(K),h(ve.$$.fragment,e),h(Oe.$$.fragment,e),Ne=!0)},o(e){g(f.$$.fragment,e),g(S.$$.fragment,e),g(C.$$.fragment,e),g(M.$$.fragment,e),g(D.$$.fragment,e),g(x.$$.fragment,e),g(q.$$.fragment,e),g(O.$$.fragment,e),g(Y),g(T.$$.fragment,e),g(oe.$$.fragment,e),g(X),g(ge.$$.fragment,e),g(ye.$$.fragment,e),g(J),g(K),g(ve.$$.fragment,e),g(Oe.$$.fragment,e),Ne=!1},d(e){e&&(i(n),i(o),i(_),i(u),i(E),i(V),i(W),i(P),i(j),i(z),i(y),i(Z),i(b),i(m),i(L),i(pe),i(ne),i(ie),i(Q),i(re),i(se),i(le),i(A),i(Se),i(qe),i(Ge),i(fe),i(Be),i(xe),i(Le),i(Re),i(ue),i(Ie),i(we),i(Ee),i(ce),i(Pe),i(ke),i(De),i(Ae),i(Fe)),$e&&$e.d(e),Te.d(e),i(s),i(a),he&&he.d(e),i(l),v(f,e),v(S,e),v(C,e),v(M,e),v(D,e),v(x,e),v(q,e),v(O,e),Y&&Y.d(e),v(T,e),v(oe,e),X&&X.d(e),v(ge,e),v(ye,e),J&&J.d(e),K&&K.d(e),v(ve,e),v(Oe,e)}}}const N={title:"POI & Offering Advantage map"};function _e(d,n,s){const l=d.map(o=>o[n]).filter(o=>o!=null&&!isNaN(o)).reduce((o,f)=>Math.max(o,Math.abs(f-s)),0)||1;return[s-l,s+l]}function oa(d,n,s){let a,l,o,f;_t(d,Pt,t=>s(26,o=t)),_t(d,ut,t=>s(31,f=t));let{data:_}=n,{data:u={},customFormattingSettings:G,__db:E,inputs:S}=_;kt(ut,f="9a4cb0405bffb581fa65fd69e4001a3a",f);let V=Gt(qt(S));Ht(V.subscribe(t=>s(0,S=t))),Ct(It,{getCustomFormats:()=>G.customFormats||[]});const C=(t,A)=>Nt(E.query,t,{query_name:A});Bt(C),o.params,Ot(()=>!0);let W={initialData:void 0,initialError:void 0},M=Ce`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
            -- #357: same as /berlin/poi-map. Zero-filled rows (is_zero_filled, oa_domain
            -- NULL) get their own lag partition so oa_delta is exactly as before; the
            -- density lag runs over the complete yearly series.
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${S.domain.value}'
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
    -- #353: basePath-aware click-through, same \`${be}\`-prefixed column as /berlin/poi-map.
    '${be}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${S.year.value}`,P=`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
            -- #357: same as /berlin/poi-map. Zero-filled rows (is_zero_filled, oa_domain
            -- NULL) get their own lag partition so oa_delta is exactly as before; the
            -- density lag runs over the complete yearly series.
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${S.domain.value}'
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
    -- #353: basePath-aware click-through, same \`${be}\`-prefixed column as /berlin/poi-map.
    '${be}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${S.year.value}`;u.poi_map_data_data&&(u.poi_map_data_data instanceof Error?W.initialError=u.poi_map_data_data:W.initialData=u.poi_map_data_data,u.poi_map_data_columns&&(W.knownColumns=u.poi_map_data_columns));let D,j=!1;const x=ze.createReactive({callback:t=>{s(3,D=t)},execFn:C},{id:"poi_map_data",...W});x(P,{noResolve:M,...W}),globalThis[Symbol.for("poi_map_data")]={get value(){return D}};let z={initialData:void 0,initialError:void 0},q=Ce`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`,y=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`;u.poi_citywide_data&&(u.poi_citywide_data instanceof Error?z.initialError=u.poi_citywide_data:z.initialData=u.poi_citywide_data,u.poi_citywide_columns&&(z.knownColumns=u.poi_citywide_columns));let O,Z=!1;const b=ze.createReactive({callback:t=>{s(4,O=t)},execFn:C},{id:"poi_citywide",...z});b(y,{noResolve:q,...z}),globalThis[Symbol.for("poi_citywide")]={get value(){return O}};let T={initialData:void 0,initialError:void 0},m=Ce`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`,L=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`;u.poi_latest_year_data&&(u.poi_latest_year_data instanceof Error?T.initialError=u.poi_latest_year_data:T.initialData=u.poi_latest_year_data,u.poi_latest_year_columns&&(T.knownColumns=u.poi_latest_year_columns));let ae,pe=!1;const ne=ze.createReactive({callback:t=>{s(1,ae=t)},execFn:C},{id:"poi_latest_year",...T});ne(L,{noResolve:m,...T}),globalThis[Symbol.for("poi_latest_year")]={get value(){return ae}};let ie={initialData:void 0,initialError:void 0},Q=Ce`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ae[0].year}
group by all
order by poi_count desc
limit 15`,de=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ae[0].year}
group by all
order by poi_count desc
limit 15`;u.poi_mix_latest_data&&(u.poi_mix_latest_data instanceof Error?ie.initialError=u.poi_mix_latest_data:ie.initialData=u.poi_mix_latest_data,u.poi_mix_latest_columns&&(ie.knownColumns=u.poi_mix_latest_columns));let re,oe=!1;const se=ze.createReactive({callback:t=>{s(5,re=t)},execFn:C},{id:"poi_mix_latest",...ie});se(de,{noResolve:Q,...ie}),globalThis[Symbol.for("poi_mix_latest")]={get value(){return re}};const le=["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"];return d.$$set=t=>{"data"in t&&s(8,_=t.data)},d.$$.update=()=>{d.$$.dirty[0]&256&&s(9,{data:u={},customFormattingSettings:G,__db:E}=_,u),d.$$.dirty[0]&512&&Rt.set(Object.keys(u).length>0),d.$$.dirty[0]&67108864&&o.params,d.$$.dirty[0]&1&&s(11,M=Ce`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
            -- #357: same as /berlin/poi-map. Zero-filled rows (is_zero_filled, oa_domain
            -- NULL) get their own lag partition so oa_delta is exactly as before; the
            -- density lag runs over the complete yearly series.
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${S.domain.value}'
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
    -- #353: basePath-aware click-through, same \`${be}\`-prefixed column as /berlin/poi-map.
    '${be}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${S.year.value}`),d.$$.dirty[0]&1&&s(12,P=`-- Single-query form (Berlin's berlin/poi-map.md precedent, that page's \`poi_map_data\` block):
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
            -- #357: same as /berlin/poi-map. Zero-filled rows (is_zero_filled, oa_domain
            -- NULL) get their own lag partition so oa_delta is exactly as before; the
            -- density lag runs over the complete yearly series.
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${S.domain.value}'
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
    -- #353: basePath-aware click-through, same \`${be}\`-prefixed column as /berlin/poi-map.
    '${be}/hamburg/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${S.year.value}`),d.$$.dirty[0]&15360&&(M||!j?M||(x(P,{noResolve:M,...W}),s(13,j=!0)):x(P,{noResolve:M})),d.$$.dirty[0]&245760&&(q||!Z?q||(b(y,{noResolve:q,...z}),s(17,Z=!0)):b(y,{noResolve:q})),d.$$.dirty[0]&3932160&&(m||!pe?m||(ne(L,{noResolve:m,...T}),s(21,pe=!0)):ne(L,{noResolve:m})),d.$$.dirty[0]&2&&s(23,Q=Ce`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ae[0].year}
group by all
order by poi_count desc
limit 15`),d.$$.dirty[0]&2&&s(24,de=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
  and snapshot_year = ${ae[0].year}
group by all
order by poi_count desc
limit 15`),d.$$.dirty[0]&62914560&&(Q||!oe?Q||(se(de,{noResolve:Q,...ie}),s(25,oe=!0)):se(de,{noResolve:Q})),d.$$.dirty[0]&1&&s(2,a=S.view==="development"?"development":"stock"),d.$$.dirty[0]&5&&s(6,l=[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:S.metric.value==="density"?a==="stock"?"poi_density_per_km2":"density_delta":a==="stock"?"oa_domain":"oa_delta",title:(S.metric.value==="density"?"POI density / km²":"Offering Advantage")+(a==="development"?" (change vs. previous year)":""),fmt:"num1"},{id:"poi_count",title:"Mapped places (this domain)",fmt:"num0"},{id:"code_note",title:"Gebiet code",valueClass:"text-xs opacity-60",fmt:"id"}])},s(15,q=Ce`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`),s(16,y=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH'
group by all
order by snapshot_year`),s(19,m=Ce`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`),s(20,L=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'HH'`),[S,ae,a,D,O,re,l,le,_,u,W,M,P,j,z,q,y,Z,T,m,L,pe,ie,Q,de,oe,o]}class Ha extends xt{constructor(n){super(),Lt(this,n,oa,ia,vt,{data:8},null,[-1,-1])}}export{Ha as component};
