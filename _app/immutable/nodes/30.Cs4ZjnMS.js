import{s as pa,d as o,w as ga,i as d,a as Ne,b as T,c as $,h as fa,e as D,f as We,g as ua,j as R,k as A,l as x,m as M,t as O,n as ra,o as ba,p as ya,q as wa,r as va,u as ee}from"../chunks/scheduler.wXRIqz25.js";import{S as $a,i as xa,d as q,t as w,a as g,c as Ce,m as C,b as S,e as L,g as Se}from"../chunks/index.uz5rP6Z2.js";import{F as ka}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Ha}from"../chunks/Hero.C0o6T8tj.js";import{P as qa}from"../chunks/PolygonMap.DD1ANdqB.js";import{S as Ca}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as Sa}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as Ve,C as Y}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as oe,w as La}from"../chunks/entry.DotynpIs.js";import{A as Qe}from"../chunks/Alert.DFISYc09.js";import{e as Da,s as Ma,Q as je,p as Ga,a as ia,r as na,C as Ta}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as ye}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as ca,a as Ie}from"../chunks/Dropdown.Dl2mephJ.js";import{p as Na}from"../chunks/stores.DJGNasUV.js";import{Q as Fe}from"../chunks/QueryViewer.RFckNDEV.js";import{p as Ba}from"../chunks/profile.BW8tN6E9.js";function Ua(c){let a,i=U.title+"",e;return{c(){a=M("h1"),e=O(i),this.h()},l(r){a=D(r,"H1",{class:!0});var l=ua(a);e=R(l,i),l.forEach(o),this.h()},h(){T(a,"class","title")},m(r,l){d(r,a,l),Ne(a,e)},p:ee,d(r){r&&o(a)}}}function Ea(c){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:ee,p:ee,d:ee}}function Aa(c){let a,i,e,r,l;return document.title=a=U.title,{c(){i=x(),e=M("meta"),r=x(),l=M("meta"),this.h()},l(h){i=$(h),e=D(h,"META",{property:!0,content:!0}),r=$(h),l=D(h,"META",{name:!0,content:!0}),this.h()},h(){var h,n;T(e,"property","og:title"),T(e,"content",((h=U.og)==null?void 0:h.title)??U.title),T(l,"name","twitter:title"),T(l,"content",((n=U.og)==null?void 0:n.title)??U.title)},m(h,n){d(h,i,n),d(h,e,n),d(h,r,n),d(h,l,n)},p(h,n){n&0&&a!==(a=U.title)&&(document.title=a)},d(h){h&&(o(i),o(e),o(r),o(l))}}}function Ia(c){var l,h;let a,i,e=(U.description||((l=U.og)==null?void 0:l.description))&&za(),r=((h=U.og)==null?void 0:h.image)&&Ra();return{c(){e&&e.c(),a=x(),r&&r.c(),i=We()},l(n){e&&e.l(n),a=$(n),r&&r.l(n),i=We()},m(n,b){e&&e.m(n,b),d(n,a,b),r&&r.m(n,b),d(n,i,b)},p(n,b){var v,y;(U.description||(v=U.og)!=null&&v.description)&&e.p(n,b),(y=U.og)!=null&&y.image&&r.p(n,b)},d(n){n&&(o(a),o(i)),e&&e.d(n),r&&r.d(n)}}}function za(c){let a,i,e,r,l;return{c(){a=M("meta"),i=x(),e=M("meta"),r=x(),l=M("meta"),this.h()},l(h){a=D(h,"META",{name:!0,content:!0}),i=$(h),e=D(h,"META",{property:!0,content:!0}),r=$(h),l=D(h,"META",{name:!0,content:!0}),this.h()},h(){var h,n,b;T(a,"name","description"),T(a,"content",U.description??((h=U.og)==null?void 0:h.description)),T(e,"property","og:description"),T(e,"content",((n=U.og)==null?void 0:n.description)??U.description),T(l,"name","twitter:description"),T(l,"content",((b=U.og)==null?void 0:b.description)??U.description)},m(h,n){d(h,a,n),d(h,i,n),d(h,e,n),d(h,r,n),d(h,l,n)},p:ee,d(h){h&&(o(a),o(i),o(e),o(r),o(l))}}}function Ra(c){let a,i,e;return{c(){a=M("meta"),i=x(),e=M("meta"),this.h()},l(r){a=D(r,"META",{property:!0,content:!0}),i=$(r),e=D(r,"META",{name:!0,content:!0}),this.h()},h(){var r,l;T(a,"property","og:image"),T(a,"content",ia((r=U.og)==null?void 0:r.image)),T(e,"name","twitter:image"),T(e,"content",ia((l=U.og)==null?void 0:l.image))},m(r,l){d(r,a,l),d(r,i,l),d(r,e,l)},p:ee,d(r){r&&(o(a),o(i),o(e))}}}function Oa(c){let a,i="How to read the map:",e,r,l='"Gentrification stage"',h,n,b="Berlin's map",v,y,u='"Social status"',f,s,_='"Dynamism"',I,G,z="more deprived",E,m,k="worsening",re,K,Z="3-year",j,J,ae="methodology §6",me;return{c(){a=M("b"),a.textContent=i,e=O(" the "),r=M("b"),r.textContent=l,h=O(` option colours each area by one of
  six plain-language stages (numbered 1–6 by position in the cycle; see the legend) — the same
  six-stage typology used on `),n=M("a"),n.textContent=b,v=O(`. At the statistisches Gebiet
  level, the `),y=M("b"),y.textContent=u,f=O(" and "),s=M("b"),s.textContent=_,I=O(` options are also offered, showing the raw
  ordinal inputs (not offered as a map colour at Stadtteil/Bezirk grain — see the Indicator note
  there for why): "Social status" is ordinal — higher shading means `),G=M("b"),G.textContent=z,E=O(`, not more
  prosperous. "Dynamism" is the official status-trend class: 1 = improving, 2 = stable,
  3 = worsening relative to the city, so higher shading means a `),m=M("b"),m.textContent=k,re=O(` trend, over
  Hamburg's own `),K=M("b"),K.textContent=Z,j=O(` observation window (Berlin's is 2 years) — see
  `),J=M("a"),J.textContent=ae,me=O(` for why that is a qualitative difference in what
  "active" means, not just a numeric-scale one. Under "Gentrification stage", areas without a stage
  are drawn in very light grey as "No stage on record"; areas without a value for the other two
  options are drawn with grey hatching ("No data").`),this.h()},l(H){a=D(H,"B",{"data-svelte-h":!0}),A(a)!=="svelte-1k0da8y"&&(a.textContent=i),e=R(H," the "),r=D(H,"B",{"data-svelte-h":!0}),A(r)!=="svelte-1sxo7gq"&&(r.textContent=l),h=R(H,` option colours each area by one of
  six plain-language stages (numbered 1–6 by position in the cycle; see the legend) — the same
  six-stage typology used on `),n=D(H,"A",{href:!0,"data-svelte-h":!0}),A(n)!=="svelte-1xjrx70"&&(n.textContent=b),v=R(H,`. At the statistisches Gebiet
  level, the `),y=D(H,"B",{"data-svelte-h":!0}),A(y)!=="svelte-1tb9m99"&&(y.textContent=u),f=R(H," and "),s=D(H,"B",{"data-svelte-h":!0}),A(s)!=="svelte-108pztc"&&(s.textContent=_),I=R(H,` options are also offered, showing the raw
  ordinal inputs (not offered as a map colour at Stadtteil/Bezirk grain — see the Indicator note
  there for why): "Social status" is ordinal — higher shading means `),G=D(H,"B",{"data-svelte-h":!0}),A(G)!=="svelte-1t7i6y0"&&(G.textContent=z),E=R(H,`, not more
  prosperous. "Dynamism" is the official status-trend class: 1 = improving, 2 = stable,
  3 = worsening relative to the city, so higher shading means a `),m=D(H,"B",{"data-svelte-h":!0}),A(m)!=="svelte-12oj2em"&&(m.textContent=k),re=R(H,` trend, over
  Hamburg's own `),K=D(H,"B",{"data-svelte-h":!0}),A(K)!=="svelte-cks6f7"&&(K.textContent=Z),j=R(H,` observation window (Berlin's is 2 years) — see
  `),J=D(H,"A",{href:!0,"data-svelte-h":!0}),A(J)!=="svelte-fe16dh"&&(J.textContent=ae),me=R(H,` for why that is a qualitative difference in what
  "active" means, not just a numeric-scale one. Under "Gentrification stage", areas without a stage
  are drawn in very light grey as "No stage on record"; areas without a value for the other two
  options are drawn with grey hatching ("No data").`),this.h()},h(){T(n,"href","/gentriduck/berlin/maps"),T(J,"href","/gentriduck/methodology")},m(H,N){d(H,a,N),d(H,e,N),d(H,r,N),d(H,h,N),d(H,n,N),d(H,v,N),d(H,y,N),d(H,f,N),d(H,s,N),d(H,I,N),d(H,G,N),d(H,E,N),d(H,m,N),d(H,re,N),d(H,K,N),d(H,j,N),d(H,J,N),d(H,me,N)},p:ee,d(H){H&&(o(a),o(e),o(r),o(h),o(n),o(v),o(y),o(f),o(s),o(I),o(G),o(E),o(m),o(re),o(K),o(j),o(J),o(me))}}}function ja(c){let a,i="Gebiet names on this map are labels, not official names.",e,r,l="the full Gebiet list",h,n,b="This map is never shown alongside, or blended with, Berlin's own map",v,y,u="methodology §6",f;return{c(){a=M("b"),a.textContent=i,e=O(` Hamburg's statistische Gebiete
  carry only a numeric code in the source geodata (unlike Berlin's named Planungsräume or
  Hamburg's own Stadtteile/Bezirke), so each one is shown as its Stadtteil plus an OpenStreetMap
  neighbourhood name that lies inside it, or its code where there is none — hover any Gebiet for
  its label and value, and click it to open its profile page (or search for it in
  `),r=M("a"),r.textContent=l,h=O(`).
  `),n=M("b"),n.textContent=b,v=O(` — Hamburg and Berlin
  each have their own route, their own colour-scale computation, and are never offered as a
  side-by-side or subtracted comparison (see `),y=M("a"),y.textContent=u,f=O(")."),this.h()},l(s){a=D(s,"B",{"data-svelte-h":!0}),A(a)!=="svelte-hhnhni"&&(a.textContent=i),e=R(s,` Hamburg's statistische Gebiete
  carry only a numeric code in the source geodata (unlike Berlin's named Planungsräume or
  Hamburg's own Stadtteile/Bezirke), so each one is shown as its Stadtteil plus an OpenStreetMap
  neighbourhood name that lies inside it, or its code where there is none — hover any Gebiet for
  its label and value, and click it to open its profile page (or search for it in
  `),r=D(s,"A",{href:!0,"data-svelte-h":!0}),A(r)!=="svelte-18zoxd8"&&(r.textContent=l),h=R(s,`).
  `),n=D(s,"B",{"data-svelte-h":!0}),A(n)!=="svelte-1dputrs"&&(n.textContent=b),v=R(s,` — Hamburg and Berlin
  each have their own route, their own colour-scale computation, and are never offered as a
  side-by-side or subtracted comparison (see `),y=D(s,"A",{href:!0,"data-svelte-h":!0}),A(y)!=="svelte-fe16dh"&&(y.textContent=u),f=R(s,")."),this.h()},h(){T(r,"href","/gentriduck/hamburg/area"),T(y,"href","/gentriduck/methodology")},m(s,_){d(s,a,_),d(s,e,_),d(s,r,_),d(s,h,_),d(s,n,_),d(s,v,_),d(s,y,_),d(s,f,_)},p:ee,d(s){s&&(o(a),o(e),o(r),o(h),o(n),o(v),o(y),o(f))}}}function Fa(c){let a,i,e,r,l,h;return a=new Ie({props:{value:"subarea_l2",valueLabel:"Statistisches Gebiet — finest detail"}}),e=new Ie({props:{value:"subarea_l1",valueLabel:"Stadtteil — ~104 named districts"}}),l=new Ie({props:{value:"district",valueLabel:"Bezirk — 7 boroughs"}}),{c(){L(a.$$.fragment),i=x(),L(e.$$.fragment),r=x(),L(l.$$.fragment)},l(n){S(a.$$.fragment,n),i=$(n),S(e.$$.fragment,n),r=$(n),S(l.$$.fragment,n)},m(n,b){C(a,n,b),d(n,i,b),C(e,n,b),d(n,r,b),C(l,n,b),h=!0},p:ee,i(n){h||(g(a.$$.fragment,n),g(e.$$.fragment,n),g(l.$$.fragment,n),h=!0)},o(n){w(a.$$.fragment,n),w(e.$$.fragment,n),w(l.$$.fragment,n),h=!1},d(n){n&&(o(i),o(r)),q(a,n),q(e,n),q(l,n)}}}function sa(c){let a,i,e,r;return a=new Qe({props:{status:"info",$$slots:{default:[Pa]},$$scope:{ctx:c}}}),e=new Qe({props:{status:"warning",$$slots:{default:[Wa]},$$scope:{ctx:c}}}),{c(){L(a.$$.fragment),i=x(),L(e.$$.fragment)},l(l){S(a.$$.fragment,l),i=$(l),S(e.$$.fragment,l)},m(l,h){C(a,l,h),d(l,i,h),C(e,l,h),r=!0},i(l){r||(g(a.$$.fragment,l),g(e.$$.fragment,l),r=!0)},o(l){w(a.$$.fragment,l),w(e.$$.fragment,l),r=!1},d(l){l&&o(i),q(a,l),q(e,l)}}}function Pa(c){let a,i=`Stadtteil / Bezirk are population-weighted rollups, where possible, of the Gebiet-level
  data`,e,r,l="#310 design decision",h,n,b='most widespread ("dominant") stage',v,y,u="share",f,s,_="Hamburg's latest published period has no population figures for effectively any Gebiet",I,G,z="equal",E;return{c(){a=M("b"),a.textContent=i,e=O(` — never a re-scored index at this grain (averaging the underlying MSS-equivalent
  ordinals into a single new category would be statistically invalid; see the
  `),r=M("a"),r.textContent=l,h=O(`, the same
  decision applied unmodified to Berlin's Bezirk/PGR/Ortsteil rollups). The map colours by the
  `),n=M("b"),n.textContent=b,v=O(` among that area's constituent Gebiete, weighted by
  population where available — its tooltip and the tables below always show that stage's
  `),y=M("b"),y.textContent=u,f=O(` alongside it (population-weighted where possible, equal-weighted as a flagged
  fallback otherwise), and the "Stage mix" table further down shows the full breakdown. Areas with
  fewer than 3 Gebiete with real data are flagged as a fragile ("small sample") reading.
  `),s=M("b"),s.textContent=_,I=O(` —
  every Stadtteil/Bezirk rollup shown here currently falls back to `),G=M("b"),G.textContent=z,E=O(` weighting across
  its constituent Gebiete rather than true population weighting, flagged as "population data
  incomplete" in the table and map tooltip below.`),this.h()},l(m){a=D(m,"B",{"data-svelte-h":!0}),A(a)!=="svelte-1gbvnu3"&&(a.textContent=i),e=R(m,` — never a re-scored index at this grain (averaging the underlying MSS-equivalent
  ordinals into a single new category would be statistically invalid; see the
  `),r=D(m,"A",{href:!0,"data-svelte-h":!0}),A(r)!=="svelte-vym2cu"&&(r.textContent=l),h=R(m,`, the same
  decision applied unmodified to Berlin's Bezirk/PGR/Ortsteil rollups). The map colours by the
  `),n=D(m,"B",{"data-svelte-h":!0}),A(n)!=="svelte-1d2azc6"&&(n.textContent=b),v=R(m,` among that area's constituent Gebiete, weighted by
  population where available — its tooltip and the tables below always show that stage's
  `),y=D(m,"B",{"data-svelte-h":!0}),A(y)!=="svelte-dsjmq7"&&(y.textContent=u),f=R(m,` alongside it (population-weighted where possible, equal-weighted as a flagged
  fallback otherwise), and the "Stage mix" table further down shows the full breakdown. Areas with
  fewer than 3 Gebiete with real data are flagged as a fragile ("small sample") reading.
  `),s=D(m,"B",{"data-svelte-h":!0}),A(s)!=="svelte-w70dn4"&&(s.textContent=_),I=R(m,` —
  every Stadtteil/Bezirk rollup shown here currently falls back to `),G=D(m,"B",{"data-svelte-h":!0}),A(G)!=="svelte-12wzsvk"&&(G.textContent=z),E=R(m,` weighting across
  its constituent Gebiete rather than true population weighting, flagged as "population data
  incomplete" in the table and map tooltip below.`),this.h()},h(){T(r,"href","https://github.com/dhelweg/gentriduck/issues/310")},m(m,k){d(m,a,k),d(m,e,k),d(m,r,k),d(m,h,k),d(m,n,k),d(m,v,k),d(m,y,k),d(m,f,k),d(m,s,k),d(m,I,k),d(m,G,k),d(m,E,k)},p:ee,d(m){m&&(o(a),o(e),o(r),o(h),o(n),o(v),o(y),o(f),o(s),o(I),o(G),o(E))}}}function Wa(c){let a,i=`A "6 · Stable / established" reading at this grain does not mean that no part of the area is
  changing.`,e;return{c(){a=M("b"),a.textContent=i,e=O(` Plurality voting resolves an area to whichever stage is most widespread among its
  constituent Gebiete — and because "6 · Stable / established" is, by construction, the most common
  stage citywide, coarser levels are systematically biased toward reading as calm, not toward
  neutral noise. An area whose map colour reads "6 · Stable / established" can still contain
  smaller neighbourhoods in stages 2–4; this map alone cannot show you whether it does. The share
  of the area in stages 2–4 (residents where population data exists, otherwise constituent areas —
  in the tooltip and table below) and the statistisches Gebiet level — the finest grain this site
  publishes — are where such change can actually be located.`)},l(r){a=D(r,"B",{"data-svelte-h":!0}),A(a)!=="svelte-zhlhl0"&&(a.textContent=i),e=R(r,` Plurality voting resolves an area to whichever stage is most widespread among its
  constituent Gebiete — and because "6 · Stable / established" is, by construction, the most common
  stage citywide, coarser levels are systematically biased toward reading as calm, not toward
  neutral noise. An area whose map colour reads "6 · Stable / established" can still contain
  smaller neighbourhoods in stages 2–4; this map alone cannot show you whether it does. The share
  of the area in stages 2–4 (residents where population data exists, otherwise constituent areas —
  in the tooltip and table below) and the statistisches Gebiet level — the finest grain this site
  publishes — are where such change can actually be located.`)},m(r,l){d(r,a,l),d(r,e,l)},p:ee,d(r){r&&(o(a),o(e))}}}function Qa(c){let a,i=`<b>Indicator: Gentrification stage</b> — the only map colour offered at this area level. A
  population-weighted <i>mean</i> of the Social status / Dynamism ordinals is not offered as a
  coloured, ranked map indicator at Stadtteil/Bezirk grain (averaging discrete ordinal classes into
  a coarse-grain score and colouring or ranking by it is a documented methodology red line for
  this project — see the <a href="/gentriduck/methodology">methodology &amp; data sources</a> page); those raw
  ordinals remain available, clearly labelled as a mean ordinal class (mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, in the
  table below and as a real map colour at the statistisches Gebiet level above.`;return{c(){a=M("p"),a.innerHTML=i,this.h()},l(e){a=D(e,"P",{class:!0,"data-svelte-h":!0}),A(a)!=="svelte-re7ig2"&&(a.innerHTML=i),this.h()},h(){T(a,"class","text-sm mb-2")},m(e,r){d(e,a,r)},i:ee,o:ee,d(e){e&&o(a)}}}function Ya(c){let a,i;return a=new ca({props:{name:"indicator",title:"Indicator",defaultValue:"status_class",$$slots:{default:[Ja]},$$scope:{ctx:c}}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function Ja(c){let a,i,e,r,l,h;return a=new Ie({props:{value:"status_class",valueLabel:"Gentrification stage — plain-language, colour-coded"}}),e=new Ie({props:{value:"status_index",valueLabel:"Social status — how deprived or affluent (current snapshot)"}}),l=new Ie({props:{value:"dynamism_index",valueLabel:"Dynamism — how fast that status is changing (3-year window)"}}),{c(){L(a.$$.fragment),i=x(),L(e.$$.fragment),r=x(),L(l.$$.fragment)},l(n){S(a.$$.fragment,n),i=$(n),S(e.$$.fragment,n),r=$(n),S(l.$$.fragment,n)},m(n,b){C(a,n,b),d(n,i,b),C(e,n,b),d(n,r,b),C(l,n,b),h=!0},p:ee,i(n){h||(g(a.$$.fragment,n),g(e.$$.fragment,n),g(l.$$.fragment,n),h=!0)},o(n){w(a.$$.fragment,n),w(e.$$.fragment,n),w(l.$$.fragment,n),h=!1},d(n){n&&(o(i),o(r)),q(a,n),q(e,n),q(l,n)}}}function la(c){let a,i;return a=new Fe({props:{queryID:"areas_leaf",queryResult:c[3]}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},p(e,r){const l={};r[0]&8&&(l.queryResult=e[3]),a.$set(l)},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function oa(c){let a,i;return a=new Fe({props:{queryID:"areas_rollup",queryResult:c[4]}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},p(e,r){const l={};r[0]&16&&(l.queryResult=e[4]),a.$set(l)},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function ma(c){let a,i;return a=new Fe({props:{queryID:"area_table_leaf",queryResult:c[5]}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},p(e,r){const l={};r[0]&32&&(l.queryResult=e[5]),a.$set(l)},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function da(c){let a,i;return a=new Fe({props:{queryID:"area_table_rollup",queryResult:c[6]}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},p(e,r){const l={};r[0]&64&&(l.queryResult=e[6]),a.$set(l)},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function Va(c){let a,i;return a=new Ve({props:{data:c[5],rows:"10",search:"true",$$slots:{default:[Xa]},$$scope:{ctx:c}}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},p(e,r){const l={};r[0]&32&&(l.data=e[5]),r[1]&2097152&&(l.$$scope={dirty:r,ctx:e}),a.$set(l)},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function Ka(c){let a,i,e,r='<a href="#stage-mix--full-breakdown-per-area">Stage mix — full breakdown per area</a>',l,h,n=`Never rely on the most widespread stage alone: this table is the full stage-mix distribution
behind every area above — population-weighted where an area's population data is complete,
equal-weighted as a flagged fallback otherwise (see the "population data incomplete" column) —
including the "No stage on record" bucket (Gebiete not scored by the Sozialmonitoring), shown as
a count of constituent areas, not a share (it is excluded from the share calculation by design;
see that column's own values below).`,b,v,y,u;a=new Ve({props:{data:c[6],rows:"10",$$slots:{default:[Za]},$$scope:{ctx:c}}});let f=c[7]&&_a(c);return y=new Ve({props:{data:c[7],rows:"50",search:"true",$$slots:{default:[et]},$$scope:{ctx:c}}}),{c(){L(a.$$.fragment),i=x(),e=M("h3"),e.innerHTML=r,l=x(),h=M("p"),h.textContent=n,b=x(),f&&f.c(),v=x(),L(y.$$.fragment),this.h()},l(s){S(a.$$.fragment,s),i=$(s),e=D(s,"H3",{class:!0,id:!0,"data-svelte-h":!0}),A(e)!=="svelte-gqegou"&&(e.innerHTML=r),l=$(s),h=D(s,"P",{class:!0,"data-svelte-h":!0}),A(h)!=="svelte-dsbqgs"&&(h.textContent=n),b=$(s),f&&f.l(s),v=$(s),S(y.$$.fragment,s),this.h()},h(){T(e,"class","markdown"),T(e,"id","stage-mix--full-breakdown-per-area"),T(h,"class","markdown")},m(s,_){C(a,s,_),d(s,i,_),d(s,e,_),d(s,l,_),d(s,h,_),d(s,b,_),f&&f.m(s,_),d(s,v,_),C(y,s,_),u=!0},p(s,_){const I={};_[0]&64&&(I.data=s[6]),_[1]&2097152&&(I.$$scope={dirty:_,ctx:s}),a.$set(I),s[7]?f?(f.p(s,_),_[0]&128&&g(f,1)):(f=_a(s),f.c(),g(f,1),f.m(v.parentNode,v)):f&&(Se(),w(f,1,1,()=>{f=null}),Ce());const G={};_[0]&128&&(G.data=s[7]),_[1]&2097152&&(G.$$scope={dirty:_,ctx:s}),y.$set(G)},i(s){u||(g(a.$$.fragment,s),g(f),g(y.$$.fragment,s),u=!0)},o(s){w(a.$$.fragment,s),w(f),w(y.$$.fragment,s),u=!1},d(s){s&&(o(i),o(e),o(l),o(h),o(b),o(v)),q(a,s),f&&f.d(s),q(y,s)}}}function Xa(c){let a,i,e,r,l,h,n,b,v,y;return a=new Y({props:{id:"area_name",title:"Statistisches Gebiet"}}),e=new Y({props:{id:"code_note",title:"Code (if not in the name)"}}),l=new Y({props:{id:"status_index",title:"Social status (1=least deprived … 4=most deprived)"}}),n=new Y({props:{id:"dynamism_index",title:"Status trend class (1 = improving, 2 = stable, 3 = worsening; 3-year window)"}}),v=new Y({props:{id:"stage_label",title:"Gentrification stage"}}),{c(){L(a.$$.fragment),i=x(),L(e.$$.fragment),r=x(),L(l.$$.fragment),h=x(),L(n.$$.fragment),b=x(),L(v.$$.fragment)},l(u){S(a.$$.fragment,u),i=$(u),S(e.$$.fragment,u),r=$(u),S(l.$$.fragment,u),h=$(u),S(n.$$.fragment,u),b=$(u),S(v.$$.fragment,u)},m(u,f){C(a,u,f),d(u,i,f),C(e,u,f),d(u,r,f),C(l,u,f),d(u,h,f),C(n,u,f),d(u,b,f),C(v,u,f),y=!0},p:ee,i(u){y||(g(a.$$.fragment,u),g(e.$$.fragment,u),g(l.$$.fragment,u),g(n.$$.fragment,u),g(v.$$.fragment,u),y=!0)},o(u){w(a.$$.fragment,u),w(e.$$.fragment,u),w(l.$$.fragment,u),w(n.$$.fragment,u),w(v.$$.fragment,u),y=!1},d(u){u&&(o(i),o(r),o(h),o(b)),q(a,u),q(e,u),q(l,u),q(n,u),q(v,u)}}}function Za(c){let a,i,e,r,l,h,n,b,v,y,u,f,s,_,I,G,z,E;return a=new Y({props:{id:"area_name",title:"Area"}}),e=new Y({props:{id:"status_index",title:"Social status — mean ordinal class (mean rank; 1=least deprived … 4=most deprived), population-weighted where population data is complete and equal-weighted otherwise"}}),l=new Y({props:{id:"dynamism_index",title:"Speed of change — mean ordinal class (mean rank; 3-year window), population-weighted where population data is complete and equal-weighted otherwise"}}),n=new Y({props:{id:"stage_label",title:"Most widespread gentrification stage"}}),v=new Y({props:{id:"dominant_share",title:"Most widespread stage's share (population-weighted, or equal-weighted — see the incomplete-data column)",fmt:"pct0"}}),u=new Y({props:{id:"stages_2_4_share",title:"Share in stages 2–4 (improving from very low, low or middle status; population-weighted, or equal-weighted — see the incomplete-data column)",fmt:"pct0"}}),s=new Y({props:{id:"n_habitable_children",title:"Gebiete with data"}}),I=new Y({props:{id:"is_dominant_fragile",title:"Fragile (< 3 Gebiete)?"}}),z=new Y({props:{id:"has_incomplete_population",title:"Population data incomplete (share above is equal-weighted, not population-weighted)?"}}),{c(){L(a.$$.fragment),i=x(),L(e.$$.fragment),r=x(),L(l.$$.fragment),h=x(),L(n.$$.fragment),b=x(),L(v.$$.fragment),y=x(),L(u.$$.fragment),f=x(),L(s.$$.fragment),_=x(),L(I.$$.fragment),G=x(),L(z.$$.fragment)},l(m){S(a.$$.fragment,m),i=$(m),S(e.$$.fragment,m),r=$(m),S(l.$$.fragment,m),h=$(m),S(n.$$.fragment,m),b=$(m),S(v.$$.fragment,m),y=$(m),S(u.$$.fragment,m),f=$(m),S(s.$$.fragment,m),_=$(m),S(I.$$.fragment,m),G=$(m),S(z.$$.fragment,m)},m(m,k){C(a,m,k),d(m,i,k),C(e,m,k),d(m,r,k),C(l,m,k),d(m,h,k),C(n,m,k),d(m,b,k),C(v,m,k),d(m,y,k),C(u,m,k),d(m,f,k),C(s,m,k),d(m,_,k),C(I,m,k),d(m,G,k),C(z,m,k),E=!0},p:ee,i(m){E||(g(a.$$.fragment,m),g(e.$$.fragment,m),g(l.$$.fragment,m),g(n.$$.fragment,m),g(v.$$.fragment,m),g(u.$$.fragment,m),g(s.$$.fragment,m),g(I.$$.fragment,m),g(z.$$.fragment,m),E=!0)},o(m){w(a.$$.fragment,m),w(e.$$.fragment,m),w(l.$$.fragment,m),w(n.$$.fragment,m),w(v.$$.fragment,m),w(u.$$.fragment,m),w(s.$$.fragment,m),w(I.$$.fragment,m),w(z.$$.fragment,m),E=!1},d(m){m&&(o(i),o(r),o(h),o(b),o(y),o(f),o(_),o(G)),q(a,m),q(e,m),q(l,m),q(n,m),q(v,m),q(u,m),q(s,m),q(I,m),q(z,m)}}}function _a(c){let a,i;return a=new Fe({props:{queryID:"area_mix_table",queryResult:c[7]}}),{c(){L(a.$$.fragment)},l(e){S(a.$$.fragment,e)},m(e,r){C(a,e,r),i=!0},p(e,r){const l={};r[0]&128&&(l.queryResult=e[7]),a.$set(l)},i(e){i||(g(a.$$.fragment,e),i=!0)},o(e){w(a.$$.fragment,e),i=!1},d(e){q(a,e)}}}function et(c){let a,i,e,r,l,h,n,b,v,y,u,f;return a=new Y({props:{id:"area_name",title:"Area"}}),e=new Y({props:{id:"stage_label",title:"Stage"}}),l=new Y({props:{id:"stage_note",title:"Note"}}),n=new Y({props:{id:"stage_population_share",title:"Share (population-weighted, or equal-weighted — see last column)",fmt:"pct0"}}),v=new Y({props:{id:"stage_n_children",title:"Constituent Gebiete"}}),u=new Y({props:{id:"has_incomplete_population",title:"Population data incomplete for this area?"}}),{c(){L(a.$$.fragment),i=x(),L(e.$$.fragment),r=x(),L(l.$$.fragment),h=x(),L(n.$$.fragment),b=x(),L(v.$$.fragment),y=x(),L(u.$$.fragment)},l(s){S(a.$$.fragment,s),i=$(s),S(e.$$.fragment,s),r=$(s),S(l.$$.fragment,s),h=$(s),S(n.$$.fragment,s),b=$(s),S(v.$$.fragment,s),y=$(s),S(u.$$.fragment,s)},m(s,_){C(a,s,_),d(s,i,_),C(e,s,_),d(s,r,_),C(l,s,_),d(s,h,_),C(n,s,_),d(s,b,_),C(v,s,_),d(s,y,_),C(u,s,_),f=!0},p:ee,i(s){f||(g(a.$$.fragment,s),g(e.$$.fragment,s),g(l.$$.fragment,s),g(n.$$.fragment,s),g(v.$$.fragment,s),g(u.$$.fragment,s),f=!0)},o(s){w(a.$$.fragment,s),w(e.$$.fragment,s),w(l.$$.fragment,s),w(n.$$.fragment,s),w(v.$$.fragment,s),w(u.$$.fragment,s),f=!1},d(s){s&&(o(i),o(r),o(h),o(b),o(y)),q(a,s),q(e,s),q(l,s),q(n,s),q(v,s),q(u,s)}}}function at(c){let a,i,e,r,l,h,n,b,v,y,u,f,s,_,I,G,z,E,m,k,re,K,Z,j,J,ae,me,H=c[2]?"profile":"Gebiet",N,he,ge,le,Be='<a href="#the-numbers-behind-the-map">The numbers behind the map</a>',$e,ne,se,X,te,fe,de,be=`Want to see how Hamburg&#39;s Gebiete have moved since 2019? Use the
<a href="/gentriduck/hamburg/time-series" class="markdown">time series page</a>. Clicking a Gebiet on the map above opens its exact
profile page; browsing by district works on the <a href="/gentriduck/hamburg/area-detail" class="markdown">area detail page</a>. Want
the commercial-mix (shops/cafés) view instead of the social-status index — POI density and
Offering Advantage by domain — see the
<a href="/gentriduck/hamburg/poi-map" class="markdown">POI &amp; Offering Advantage map</a>.`,_e,ie,Ue='<a href="#honest-caveats">Honest caveats</a>',xe,ue,Pe=`<li class="markdown"><strong class="markdown">Social status and dynamism are ordinal, not linear</strong> — higher social-status shading means
<strong class="markdown">more deprived</strong>, not more prosperous. See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for the
full decoder.</li> <li class="markdown"><strong class="markdown">Hamburg&#39;s Dynamik window is 3 years, Berlin&#39;s is 2</strong> — this is a qualitative difference in
what &quot;4 · Active gentrification&quot; means, not just a numeric-scale one; see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a> point 1.</li> <li class="markdown"><strong class="markdown">Stadtteil / Bezirk are population-weighted rollups, where possible, never a re-scored index.</strong>
The map colours by the <em class="markdown">most widespread</em> (&quot;dominant&quot;) stage among each area&#39;s constituent
Gebiete — always shown with its share (population-weighted where possible, equal-weighted as a
flagged fallback otherwise) and the full stage mix (see the &quot;Stage mix&quot; table), never as a
standalone label. Areas with fewer than 3 Gebiete contributing real data are flagged fragile.</li> <li class="markdown"><strong class="markdown">A coarse-grain reading is directionally biased toward &quot;calm&quot;, not neutral.</strong> Plurality voting
resolves an area to whichever stage is most widespread among its constituents, and the most
widespread stage is, by construction, usually &quot;6 · Stable / established&quot; — so coarser levels
systematically understate local change rather than randomly blurring it. An area shown as
&quot;6 · Stable / established&quot; can still contain smaller neighbourhoods in stages 2–4; this map
cannot be read as evidence that no part of it is changing. The share of the area in stages 2–4
(residents where population data exists, otherwise constituent areas — in the tooltip and table
above) and the statistisches Gebiet level — the finest grain this site publishes — are where such
change can actually be located.</li> <li class="markdown"><strong class="markdown">The rollup &quot;Social status&quot;/&quot;Speed of change&quot; figures are a mean ordinal class (a mean rank),
population-weighted where population data is complete and equal-weighted otherwise, not a
rescaled score.</strong> They are not offered as a map colour at Stadtteil/Bezirk grain, and the table
above no longer ranks by them, for exactly this reason — see the Indicator note above the map.</li> <li class="markdown"><strong class="markdown">&quot;Population-weighted&quot; is a best-effort weighting, not a guarantee.</strong> Hamburg&#39;s latest published
period has no population figures for effectively any Gebiet, so every Stadtteil/Bezirk rollup
shown here currently falls back to <em class="markdown">equal</em> weighting across its constituent Gebiete rather than
true population weighting — flagged per-area as &quot;population data incomplete&quot; in the table and
map tooltip.</li> <li class="markdown"><strong class="markdown">Gebiet names are labels, not official names</strong> — Hamburg&#39;s statistische Gebiete have only a
numeric code in the source data, so each is shown as its Stadtteil plus an OpenStreetMap
neighbourhood name inside it, or its code; see the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for details.
Stadtteil/Bezirk names are the official ones.</li> <li class="markdown"><strong class="markdown">Only Hamburg&#39;s D1/D2 Sozialmonitoring outcome is shown here</strong> — the demographic (D4)
composite, land value &amp; rent, and Milieuschutz-equivalent displacement zones are not (yet)
published as a Hamburg map; see <a href="/gentriduck/methodology" class="markdown">methodology §6</a> for the full inventory.</li> <li class="markdown"><strong class="markdown">This map is never combined with, or compared numerically against, Berlin&#39;s map</strong> — see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>&#39;s structural rule against pooled cross-city ranking.</li>`,Ee,pe,ze='<a href="#where-next">Where next</a>',Ae,B,Le=`<li class="markdown"><strong class="markdown"><a href="/gentriduck/hamburg/time-series" class="markdown">Time series</a></strong> — how Hamburg&#39;s Gebiete have moved over the 2019–2025
trajectory window.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/hamburg/area-detail" class="markdown">Area detail</a></strong> — browse by district, or open one Gebiet&#39;s full profile
via a map click.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/hamburg/poi-map" class="markdown">POI &amp; Offering Advantage map</a></strong> — the commercial-mix (shops/cafés) view of
the same Gebiete.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/methodology" class="markdown">Methodology &amp; data sources</a></strong> — what the six gentrification stages
mean, and (§6) how Hamburg&#39;s data differs from Berlin&#39;s.</li>`,De,ce,ke,Me,Re,we=typeof U<"u"&&U.title&&U.hide_title!==!0&&Ua();function ha(t,p){return typeof U<"u"&&U.title?Aa:Ea}let Oe=ha()(c),ve=typeof U=="object"&&Ia();h=new Ha({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Maps — gentrification stages by area",lede:"Colours each of Hamburg's statistische Gebiete by its current gentrification stage (numbered 1–6 by position in the cycle; see the legend), from Hamburg's own official Sozialmonitoring — the same D1×D2 typology matrix used for Berlin, applied to Hamburg's own indicators and observation window."}}),b=new Qe({props:{status:"info",$$slots:{default:[Oa]},$$scope:{ctx:c}}}),y=new Ca({}),f=new Sa({}),_=new Qe({props:{status:"warning",$$slots:{default:[ja]},$$scope:{ctx:c}}}),G=new ca({props:{name:"area_level",title:"Area level",defaultValue:"subarea_l2",$$slots:{default:[Fa]},$$scope:{ctx:c}}});let V=c[2]&&sa(c);const Ke=[Ya,Qa],Ge=[];function Xe(t,p){return t[2]?1:0}m=Xe(c),k=Ge[m]=Ke[m](c);let F=c[3]&&la(c),P=c[4]&&oa(c);j=new qa({props:{data:c[2]?c[4]:c[3],geoJsonUrl:c[9],geoId:"area_code",areaCol:"area_code",value:c[1]==="status_class"?"stage_label":c[1],legendType:c[1]==="status_class"?"categorical":"scalar",colorPalette:c[1]==="status_class"?c[11](c[2]?c[4]:c[3]):void 0,title:"Hamburg "+c[12][c[0].area_level.value]+" — "+c[10]+", latest period",link:"link",tooltip:c[8]}});let W=c[5]&&ma(c),Q=c[6]&&da(c);const Ze=[Ka,Va],He=[];function ea(t,p){return t[2]?0:1}return X=ea(c),te=He[X]=Ze[X](c),Me=new ka({}),{c(){we&&we.c(),a=x(),Oe.c(),i=M("meta"),e=M("meta"),ve&&ve.c(),r=We(),l=x(),L(h.$$.fragment),n=x(),L(b.$$.fragment),v=x(),L(y.$$.fragment),u=x(),L(f.$$.fragment),s=x(),L(_.$$.fragment),I=x(),L(G.$$.fragment),z=x(),V&&V.c(),E=x(),k.c(),re=x(),F&&F.c(),K=x(),P&&P.c(),Z=x(),L(j.$$.fragment),J=x(),ae=M("p"),me=O("Click an area on the map to open its "),N=O(H),he=O(" page."),ge=x(),le=M("h2"),le.innerHTML=Be,$e=x(),W&&W.c(),ne=x(),Q&&Q.c(),se=x(),te.c(),fe=x(),de=M("p"),de.innerHTML=be,_e=x(),ie=M("h2"),ie.innerHTML=Ue,xe=x(),ue=M("ul"),ue.innerHTML=Pe,Ee=x(),pe=M("h2"),pe.innerHTML=ze,Ae=x(),B=M("ul"),B.innerHTML=Le,De=x(),ce=M("hr"),ke=x(),L(Me.$$.fragment),this.h()},l(t){we&&we.l(t),a=$(t);const p=fa("svelte-2igo1p",document.head);Oe.l(p),i=D(p,"META",{name:!0,content:!0}),e=D(p,"META",{name:!0,content:!0}),ve&&ve.l(p),r=We(),p.forEach(o),l=$(t),S(h.$$.fragment,t),n=$(t),S(b.$$.fragment,t),v=$(t),S(y.$$.fragment,t),u=$(t),S(f.$$.fragment,t),s=$(t),S(_.$$.fragment,t),I=$(t),S(G.$$.fragment,t),z=$(t),V&&V.l(t),E=$(t),k.l(t),re=$(t),F&&F.l(t),K=$(t),P&&P.l(t),Z=$(t),S(j.$$.fragment,t),J=$(t),ae=D(t,"P",{class:!0});var Te=ua(ae);me=R(Te,"Click an area on the map to open its "),N=R(Te,H),he=R(Te," page."),Te.forEach(o),ge=$(t),le=D(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(le)!=="svelte-1loy64m"&&(le.innerHTML=Be),$e=$(t),W&&W.l(t),ne=$(t),Q&&Q.l(t),se=$(t),te.l(t),fe=$(t),de=D(t,"P",{class:!0,"data-svelte-h":!0}),A(de)!=="svelte-x4fgnr"&&(de.innerHTML=be),_e=$(t),ie=D(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(ie)!=="svelte-ad0syq"&&(ie.innerHTML=Ue),xe=$(t),ue=D(t,"UL",{class:!0,"data-svelte-h":!0}),A(ue)!=="svelte-u0i16t"&&(ue.innerHTML=Pe),Ee=$(t),pe=D(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(pe)!=="svelte-1v8k4cs"&&(pe.innerHTML=ze),Ae=$(t),B=D(t,"UL",{class:!0,"data-svelte-h":!0}),A(B)!=="svelte-1ruq7lk"&&(B.innerHTML=Le),De=$(t),ce=D(t,"HR",{class:!0}),ke=$(t),S(Me.$$.fragment,t),this.h()},h(){T(i,"name","twitter:card"),T(i,"content","summary_large_image"),T(e,"name","twitter:site"),T(e,"content","@evidence_dev"),T(ae,"class","markdown"),T(le,"class","markdown"),T(le,"id","the-numbers-behind-the-map"),T(de,"class","markdown"),T(ie,"class","markdown"),T(ie,"id","honest-caveats"),T(ue,"class","markdown"),T(pe,"class","markdown"),T(pe,"id","where-next"),T(B,"class","markdown"),T(ce,"class","markdown")},m(t,p){we&&we.m(t,p),d(t,a,p),Oe.m(document.head,null),Ne(document.head,i),Ne(document.head,e),ve&&ve.m(document.head,null),Ne(document.head,r),d(t,l,p),C(h,t,p),d(t,n,p),C(b,t,p),d(t,v,p),C(y,t,p),d(t,u,p),C(f,t,p),d(t,s,p),C(_,t,p),d(t,I,p),C(G,t,p),d(t,z,p),V&&V.m(t,p),d(t,E,p),Ge[m].m(t,p),d(t,re,p),F&&F.m(t,p),d(t,K,p),P&&P.m(t,p),d(t,Z,p),C(j,t,p),d(t,J,p),d(t,ae,p),Ne(ae,me),Ne(ae,N),Ne(ae,he),d(t,ge,p),d(t,le,p),d(t,$e,p),W&&W.m(t,p),d(t,ne,p),Q&&Q.m(t,p),d(t,se,p),He[X].m(t,p),d(t,fe,p),d(t,de,p),d(t,_e,p),d(t,ie,p),d(t,xe,p),d(t,ue,p),d(t,Ee,p),d(t,pe,p),d(t,Ae,p),d(t,B,p),d(t,De,p),d(t,ce,p),d(t,ke,p),C(Me,t,p),Re=!0},p(t,p){typeof U<"u"&&U.title&&U.hide_title!==!0&&we.p(t,p),Oe.p(t,p),typeof U=="object"&&ve.p(t,p);const Te={};p[1]&2097152&&(Te.$$scope={dirty:p,ctx:t}),b.$set(Te);const aa={};p[1]&2097152&&(aa.$$scope={dirty:p,ctx:t}),_.$set(aa);const ta={};p[1]&2097152&&(ta.$$scope={dirty:p,ctx:t}),G.$set(ta),t[2]?V?p[0]&4&&g(V,1):(V=sa(t),V.c(),g(V,1),V.m(E.parentNode,E)):V&&(Se(),w(V,1,1,()=>{V=null}),Ce());let Ye=m;m=Xe(t),m!==Ye&&(Se(),w(Ge[Ye],1,1,()=>{Ge[Ye]=null}),Ce(),k=Ge[m],k||(k=Ge[m]=Ke[m](t),k.c()),g(k,1),k.m(re.parentNode,re)),t[3]?F?(F.p(t,p),p[0]&8&&g(F,1)):(F=la(t),F.c(),g(F,1),F.m(K.parentNode,K)):F&&(Se(),w(F,1,1,()=>{F=null}),Ce()),t[4]?P?(P.p(t,p),p[0]&16&&g(P,1)):(P=oa(t),P.c(),g(P,1),P.m(Z.parentNode,Z)):P&&(Se(),w(P,1,1,()=>{P=null}),Ce());const qe={};p[0]&28&&(qe.data=t[2]?t[4]:t[3]),p[0]&512&&(qe.geoJsonUrl=t[9]),p[0]&2&&(qe.value=t[1]==="status_class"?"stage_label":t[1]),p[0]&2&&(qe.legendType=t[1]==="status_class"?"categorical":"scalar"),p[0]&30&&(qe.colorPalette=t[1]==="status_class"?t[11](t[2]?t[4]:t[3]):void 0),p[0]&1025&&(qe.title="Hamburg "+t[12][t[0].area_level.value]+" — "+t[10]+", latest period"),p[0]&256&&(qe.tooltip=t[8]),j.$set(qe),(!Re||p[0]&4)&&H!==(H=t[2]?"profile":"Gebiet")&&ga(N,H),t[5]?W?(W.p(t,p),p[0]&32&&g(W,1)):(W=ma(t),W.c(),g(W,1),W.m(ne.parentNode,ne)):W&&(Se(),w(W,1,1,()=>{W=null}),Ce()),t[6]?Q?(Q.p(t,p),p[0]&64&&g(Q,1)):(Q=da(t),Q.c(),g(Q,1),Q.m(se.parentNode,se)):Q&&(Se(),w(Q,1,1,()=>{Q=null}),Ce());let Je=X;X=ea(t),X===Je?He[X].p(t,p):(Se(),w(He[Je],1,1,()=>{He[Je]=null}),Ce(),te=He[X],te?te.p(t,p):(te=He[X]=Ze[X](t),te.c()),g(te,1),te.m(fe.parentNode,fe))},i(t){Re||(g(h.$$.fragment,t),g(b.$$.fragment,t),g(y.$$.fragment,t),g(f.$$.fragment,t),g(_.$$.fragment,t),g(G.$$.fragment,t),g(V),g(k),g(F),g(P),g(j.$$.fragment,t),g(W),g(Q),g(te),g(Me.$$.fragment,t),Re=!0)},o(t){w(h.$$.fragment,t),w(b.$$.fragment,t),w(y.$$.fragment,t),w(f.$$.fragment,t),w(_.$$.fragment,t),w(G.$$.fragment,t),w(V),w(k),w(F),w(P),w(j.$$.fragment,t),w(W),w(Q),w(te),w(Me.$$.fragment,t),Re=!1},d(t){t&&(o(a),o(l),o(n),o(v),o(u),o(s),o(I),o(z),o(E),o(re),o(K),o(Z),o(J),o(ae),o(ge),o(le),o($e),o(ne),o(se),o(fe),o(de),o(_e),o(ie),o(xe),o(ue),o(Ee),o(pe),o(Ae),o(B),o(De),o(ce),o(ke)),we&&we.d(t),Oe.d(t),o(i),o(e),ve&&ve.d(t),o(r),q(h,t),q(b,t),q(y,t),q(f,t),q(_,t),q(G,t),V&&V.d(t),Ge[m].d(t),F&&F.d(t),P&&P.d(t),q(j,t),W&&W.d(t),Q&&Q.d(t),He[X].d(t),q(Me,t)}}}const U={title:"Maps — gentrification stages by area"},tt="#f0f0f0";function rt(c,a,i){let e,r,l,h,n,b,v;ra(c,Na,B=>i(35,b=B)),ra(c,na,B=>i(40,v=B));let{data:y}=a,{data:u={},customFormattingSettings:f,__db:s,inputs:_}=y;ba(na,v="9f8718a8edaba5d4420c8c771a784d20",v);let I=Da(La(_));ya(I.subscribe(B=>i(0,_=B))),wa(Ta,{getCustomFormats:()=>f.customFormats||[]});const G=(B,Le)=>Ba(s.query,B,{query_name:Le});Ma(G),b.params,va(()=>!0);let z={initialData:void 0,initialError:void 0},E=ye`-- Only one (variant, area_level) combination exists for Hamburg's leaf grain in
-- gentrification_index: live_data / subarea_l2 (H3, #237). #358: stage_label/stage_number are
-- gentrification_index's own dbt display columns (typology_stage_display), the same as
-- /berlin/maps' \`areas_plr\` -- same D1xD2 matrix, reused unmodified per H1-domain-signoff.md §1.
-- Ordered by cycle position so the legend reads 1..6, then "No stage on record".
select
    city_code,
    area_code,
    area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    -- #353: click-through to this Gebiet's profile page, same \`${oe}\`-prefixed column
    -- convention as /berlin/maps' areas_plr \`link\` (PolygonMap expects an already-prefixed URL).
    '${oe}/hamburg/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by stage_number nulls last, area_name, area_code`,m=`-- Only one (variant, area_level) combination exists for Hamburg's leaf grain in
-- gentrification_index: live_data / subarea_l2 (H3, #237). #358: stage_label/stage_number are
-- gentrification_index's own dbt display columns (typology_stage_display), the same as
-- /berlin/maps' \`areas_plr\` -- same D1xD2 matrix, reused unmodified per H1-domain-signoff.md §1.
-- Ordered by cycle position so the legend reads 1..6, then "No stage on record".
select
    city_code,
    area_code,
    area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    -- #353: click-through to this Gebiet's profile page, same \`${oe}\`-prefixed column
    -- convention as /berlin/maps' areas_plr \`link\` (PolygonMap expects an already-prefixed URL).
    '${oe}/hamburg/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by stage_number nulls last, area_name, area_code`;u.areas_leaf_data&&(u.areas_leaf_data instanceof Error?z.initialError=u.areas_leaf_data:z.initialData=u.areas_leaf_data,u.areas_leaf_columns&&(z.knownColumns=u.areas_leaf_columns));let k,re=!1;const K=je.createReactive({callback:B=>{i(3,k=B)},execFn:G},{id:"areas_leaf",...z});K(m,{noResolve:E,...z}),globalThis[Symbol.for("areas_leaf")]={get value(){return k}};let Z={initialData:void 0,initialError:void 0},j=ye`-- #310: one row per rollup area (subarea_l1/district), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- see
-- /berlin/maps' \`areas_rollup\` query for the identical pattern/rationale (dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean,
-- n_habitable_children, is_dominant_fragile, has_incomplete_population are all CONSTANT across
-- an area's typology_stage rows).
--
-- #310 review fix (MEDIUM-A): \`area_table_rollup\`/\`area_mix_table\` below each re-run an
-- equivalent query directly against the mart rather than chaining from this block by name using
-- Evidence's own block-interpolation syntax -- not because Evidence/DuckDB-WASM lacks support for
-- that (an earlier revision of this comment claimed exactly that; it was wrong -- see
-- /berlin/maps' \`bezirk_names\` block, added in the #310 review's MEDIUM-A fix, for a working
-- example of one block referencing another this way), but because \`area_mix_table\` needs the full
-- per-stage grain this query has already collapsed via QUALIFY, and \`area_table_rollup\` only
-- needs a handful of the same columns -- a direct re-select reads just as clearly as a chained one
-- here, for a query this short. Hamburg's subarea_l1/district area_name is real (no
-- Berlin-Bezirk-style blank-name gap, see H3-domain-signoff.md §condition 3), so unlike
-- /berlin/maps this page has no name-fallback lookup to de-duplicate in the first place.
--
-- NB: this comment deliberately avoids spelling out this block's own name inside that
-- interpolation syntax -- Evidence's query-chaining resolver scans a block's full text (comments
-- included) for that exact token, so a block mentioning its own name that way, in its own text,
-- creates a literal self-reference the resolver reports as "Compiler error: circular reference"
-- (hit and fixed during this review pass, both here and in /berlin/maps' \`bezirk_names\` block).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' identical \`areas_rollup\` query for
-- the full rationale/citation and the NULL-vs-0 note (the mart is sparse, so a filtered SUM over
-- zero matching rows is NULL, not 0 -- \`stages_2_4_share_raw\` is coalesced to 0 below only when
-- the area has at least one habitable child).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.city_code,
    m.area_code,
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    -- dominant_stage as status_class kept for shape symmetry with \`areas_leaf\`'s status_class
    -- column (#310 review, LOW-J) -- not otherwise consumed downstream at this grain (the map/
    -- tooltip read \`stage_label\` instead).
    m.dominant_stage as status_class,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label,
    m.dominant_stage_number as stage_number,
    case
        when m.dominant_stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    -- #310 review fix (MEDIUM-4): pairs the most-widespread-stage reading with an explicit
    -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment point 3)
    -- this must never be shown as a standalone, confident-looking label. Blank ('') rather than
    -- NULL when not fragile, so the tooltip line renders empty instead of a formatted "-"
    -- placeholder.
    case
        when m.is_dominant_fragile
        then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
        else ''
    end as fragile_note,
    -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit caveat
    -- whenever the weighting silently degraded to equal-weight for this area (see
    -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / has_incomplete_population -- Hamburg's
    -- entire latest published period has this for effectively every Gebiet).
    case
        when m.has_incomplete_population
        then 'Population data incomplete for this area — equal-weighted, not population-weighted'
        else ''
    end as population_note,
    -- #353: rollup profile pages, /hamburg/area/<level>/<code> (same pattern as /berlin/maps).
    -- Merged-pair Stadtteil codes (#334, slash-joined) have no profile page -> NULL, no link.
    case
        when m.area_code like '%/%' then null
        else '${oe}/hamburg/area/${_.area_level.value}/' || m.area_code
    end as link
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
  -- defends against a future second variant silently duplicating rows here.
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by m.dominant_stage_number nulls last, m.area_name, m.area_code`,J=`-- #310: one row per rollup area (subarea_l1/district), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- see
-- /berlin/maps' \`areas_rollup\` query for the identical pattern/rationale (dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean,
-- n_habitable_children, is_dominant_fragile, has_incomplete_population are all CONSTANT across
-- an area's typology_stage rows).
--
-- #310 review fix (MEDIUM-A): \`area_table_rollup\`/\`area_mix_table\` below each re-run an
-- equivalent query directly against the mart rather than chaining from this block by name using
-- Evidence's own block-interpolation syntax -- not because Evidence/DuckDB-WASM lacks support for
-- that (an earlier revision of this comment claimed exactly that; it was wrong -- see
-- /berlin/maps' \`bezirk_names\` block, added in the #310 review's MEDIUM-A fix, for a working
-- example of one block referencing another this way), but because \`area_mix_table\` needs the full
-- per-stage grain this query has already collapsed via QUALIFY, and \`area_table_rollup\` only
-- needs a handful of the same columns -- a direct re-select reads just as clearly as a chained one
-- here, for a query this short. Hamburg's subarea_l1/district area_name is real (no
-- Berlin-Bezirk-style blank-name gap, see H3-domain-signoff.md §condition 3), so unlike
-- /berlin/maps this page has no name-fallback lookup to de-duplicate in the first place.
--
-- NB: this comment deliberately avoids spelling out this block's own name inside that
-- interpolation syntax -- Evidence's query-chaining resolver scans a block's full text (comments
-- included) for that exact token, so a block mentioning its own name that way, in its own text,
-- creates a literal self-reference the resolver reports as "Compiler error: circular reference"
-- (hit and fixed during this review pass, both here and in /berlin/maps' \`bezirk_names\` block).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' identical \`areas_rollup\` query for
-- the full rationale/citation and the NULL-vs-0 note (the mart is sparse, so a filtered SUM over
-- zero matching rows is NULL, not 0 -- \`stages_2_4_share_raw\` is coalesced to 0 below only when
-- the area has at least one habitable child).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.city_code,
    m.area_code,
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    -- dominant_stage as status_class kept for shape symmetry with \`areas_leaf\`'s status_class
    -- column (#310 review, LOW-J) -- not otherwise consumed downstream at this grain (the map/
    -- tooltip read \`stage_label\` instead).
    m.dominant_stage as status_class,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label,
    m.dominant_stage_number as stage_number,
    case
        when m.dominant_stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    -- #310 review fix (MEDIUM-4): pairs the most-widespread-stage reading with an explicit
    -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment point 3)
    -- this must never be shown as a standalone, confident-looking label. Blank ('') rather than
    -- NULL when not fragile, so the tooltip line renders empty instead of a formatted "-"
    -- placeholder.
    case
        when m.is_dominant_fragile
        then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
        else ''
    end as fragile_note,
    -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit caveat
    -- whenever the weighting silently degraded to equal-weight for this area (see
    -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / has_incomplete_population -- Hamburg's
    -- entire latest published period has this for effectively every Gebiet).
    case
        when m.has_incomplete_population
        then 'Population data incomplete for this area — equal-weighted, not population-weighted'
        else ''
    end as population_note,
    -- #353: rollup profile pages, /hamburg/area/<level>/<code> (same pattern as /berlin/maps).
    -- Merged-pair Stadtteil codes (#334, slash-joined) have no profile page -> NULL, no link.
    case
        when m.area_code like '%/%' then null
        else '${oe}/hamburg/area/${_.area_level.value}/' || m.area_code
    end as link
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
  -- defends against a future second variant silently duplicating rows here.
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by m.dominant_stage_number nulls last, m.area_name, m.area_code`;u.areas_rollup_data&&(u.areas_rollup_data instanceof Error?Z.initialError=u.areas_rollup_data:Z.initialData=u.areas_rollup_data,u.areas_rollup_columns&&(Z.knownColumns=u.areas_rollup_columns));let ae,me=!1;const H=je.createReactive({callback:B=>{i(4,ae=B)},execFn:G},{id:"areas_rollup",...Z});H(J,{noResolve:j,...Z}),globalThis[Symbol.for("areas_rollup")]={get value(){return ae}};let N={initialData:void 0,initialError:void 0},he=ye`select
    area_name,
    -- #353 (#352 review follow-up): the code only where the label doesn't already contain it,
    -- same label-contains-code test as code_note above.
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
order by stage_number nulls last, area_name, area_code`,ge=`select
    area_name,
    -- #353 (#352 review follow-up): the code only where the label doesn't already contain it,
    -- same label-contains-code test as code_note above.
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
order by stage_number nulls last, area_name, area_code`;u.area_table_leaf_data&&(u.area_table_leaf_data instanceof Error?N.initialError=u.area_table_leaf_data:N.initialData=u.area_table_leaf_data,u.area_table_leaf_columns&&(N.knownColumns=u.area_table_leaf_columns));let le,Be=!1;const $e=je.createReactive({callback:B=>{i(5,le=B)},execFn:G},{id:"area_table_leaf",...N});$e(ge,{noResolve:he,...N}),globalThis[Symbol.for("area_table_leaf")]={get value(){return le}};let ne={initialData:void 0,initialError:void 0},se=ye`-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' \`area_table_rollup\` query for the
-- full rationale/citation and the NULL-vs-0 note.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index_weighted_mean desc\`. Ranking a citywide table by a population-weighted
-- MEAN of an ordinal class code is exactly the "presented, coloured, or ordered" construct the
-- standing #267 domain decision forbids for a coarse scalar -- order by area_name instead (matches
-- /berlin/maps' equivalent fix and the Stage-mix table below). status_index/dynamism_index remain
-- visible as informational columns (see the Column titles below, per the geo-DS's C1: "mean
-- ordinal class (mean rank)", not a score -- #310 review fix D2-R2: population-weighted where
-- population data is complete and equal-weighted otherwise, not unconditionally).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_stage_label as stage_label,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`,X=`-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' \`area_table_rollup\` query for the
-- full rationale/citation and the NULL-vs-0 note.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index_weighted_mean desc\`. Ranking a citywide table by a population-weighted
-- MEAN of an ordinal class code is exactly the "presented, coloured, or ordered" construct the
-- standing #267 domain decision forbids for a coarse scalar -- order by area_name instead (matches
-- /berlin/maps' equivalent fix and the Stage-mix table below). status_index/dynamism_index remain
-- visible as informational columns (see the Column titles below, per the geo-DS's C1: "mean
-- ordinal class (mean rank)", not a score -- #310 review fix D2-R2: population-weighted where
-- population data is complete and equal-weighted otherwise, not unconditionally).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_stage_label as stage_label,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`;u.area_table_rollup_data&&(u.area_table_rollup_data instanceof Error?ne.initialError=u.area_table_rollup_data:ne.initialData=u.area_table_rollup_data,u.area_table_rollup_columns&&(ne.knownColumns=u.area_table_rollup_columns));let te,fe=!1;const de=je.createReactive({callback:B=>{i(6,te=B)},execFn:G},{id:"area_table_rollup",...ne});de(X,{noResolve:se,...ne}),globalThis[Symbol.for("area_table_rollup")]={get value(){return te}};let be={initialData:void 0,initialError:void 0},_e=ye`-- #310 review fix (LOW-6): explicit variant filter, same as areas_rollup/area_table_rollup above
-- -- Hamburg's subarea_l1/district area_name is real (no Berlin-Bezirk-style blank-name gap), so
-- unlike /berlin/maps' equivalent query this one needs no name-fallback join.
--
-- #310 review fix (R-310-1): stage_label de-jargons typology_stage with the exact same stage-name
-- mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level.
-- #358: stage_label is the mart's dbt display column; stages listed in cycle order within each
-- area; stage_note carries the spec §1 C2 text for the "No stage on record" bucket.
select
    area_name,
    stage_label,
    case
        when stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    stage_population_share,
    stage_n_children,
    has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${_.area_level.value}'
  and city_code = 'HH'
  and variant = 'live_data'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
order by area_name, stage_number nulls last`,ie=`-- #310 review fix (LOW-6): explicit variant filter, same as areas_rollup/area_table_rollup above
-- -- Hamburg's subarea_l1/district area_name is real (no Berlin-Bezirk-style blank-name gap), so
-- unlike /berlin/maps' equivalent query this one needs no name-fallback join.
--
-- #310 review fix (R-310-1): stage_label de-jargons typology_stage with the exact same stage-name
-- mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level.
-- #358: stage_label is the mart's dbt display column; stages listed in cycle order within each
-- area; stage_note carries the spec §1 C2 text for the "No stage on record" bucket.
select
    area_name,
    stage_label,
    case
        when stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    stage_population_share,
    stage_n_children,
    has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${_.area_level.value}'
  and city_code = 'HH'
  and variant = 'live_data'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
order by area_name, stage_number nulls last`;u.area_mix_table_data&&(u.area_mix_table_data instanceof Error?be.initialError=u.area_mix_table_data:be.initialData=u.area_mix_table_data,u.area_mix_table_columns&&(be.knownColumns=u.area_mix_table_columns));let Ue,xe=!1;const ue=je.createReactive({callback:B=>{i(7,Ue=B)},execFn:G},{id:"area_mix_table",...be});ue(ie,{noResolve:_e,...be}),globalThis[Symbol.for("area_mix_table")]={get value(){return Ue}};const Pe={1:"#bddf26",2:"#5ec962",3:"#21918c",4:"#31688e",5:"#482878",6:"#bdbdbd"};function Ee(B){const Le=new Set,De=[];for(const ce of B??[]){const ke=ce==null?void 0:ce.stage_label;ke==null||Le.has(ke)||(Le.add(ke),De.push(Pe[ce==null?void 0:ce.stage_number]??tt))}return De}const pe={status_class:"Gentrification stage",status_index:"Social status",dynamism_index:"Dynamism"},ze={subarea_l2:"subarea_l2_live_data.geojson",subarea_l1:"subarea_l1_current.geojson",district:"district_current.geojson"},Ae={subarea_l2:"statistisches Gebiet",subarea_l1:"Stadtteil",district:"Bezirk"};return c.$$set=B=>{"data"in B&&i(13,y=B.data)},c.$$.update=()=>{c.$$.dirty[0]&8192&&i(14,{data:u={},customFormattingSettings:f,__db:s}=y,u),c.$$.dirty[0]&16384&&Ga.set(Object.keys(u).length>0),c.$$.dirty[1]&16&&b.params,c.$$.dirty[0]&491520&&(E||!re?E||(K(m,{noResolve:E,...z}),i(18,re=!0)):K(m,{noResolve:E})),c.$$.dirty[0]&1&&i(20,j=ye`-- #310: one row per rollup area (subarea_l1/district), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- see
-- /berlin/maps' \`areas_rollup\` query for the identical pattern/rationale (dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean,
-- n_habitable_children, is_dominant_fragile, has_incomplete_population are all CONSTANT across
-- an area's typology_stage rows).
--
-- #310 review fix (MEDIUM-A): \`area_table_rollup\`/\`area_mix_table\` below each re-run an
-- equivalent query directly against the mart rather than chaining from this block by name using
-- Evidence's own block-interpolation syntax -- not because Evidence/DuckDB-WASM lacks support for
-- that (an earlier revision of this comment claimed exactly that; it was wrong -- see
-- /berlin/maps' \`bezirk_names\` block, added in the #310 review's MEDIUM-A fix, for a working
-- example of one block referencing another this way), but because \`area_mix_table\` needs the full
-- per-stage grain this query has already collapsed via QUALIFY, and \`area_table_rollup\` only
-- needs a handful of the same columns -- a direct re-select reads just as clearly as a chained one
-- here, for a query this short. Hamburg's subarea_l1/district area_name is real (no
-- Berlin-Bezirk-style blank-name gap, see H3-domain-signoff.md §condition 3), so unlike
-- /berlin/maps this page has no name-fallback lookup to de-duplicate in the first place.
--
-- NB: this comment deliberately avoids spelling out this block's own name inside that
-- interpolation syntax -- Evidence's query-chaining resolver scans a block's full text (comments
-- included) for that exact token, so a block mentioning its own name that way, in its own text,
-- creates a literal self-reference the resolver reports as "Compiler error: circular reference"
-- (hit and fixed during this review pass, both here and in /berlin/maps' \`bezirk_names\` block).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' identical \`areas_rollup\` query for
-- the full rationale/citation and the NULL-vs-0 note (the mart is sparse, so a filtered SUM over
-- zero matching rows is NULL, not 0 -- \`stages_2_4_share_raw\` is coalesced to 0 below only when
-- the area has at least one habitable child).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.city_code,
    m.area_code,
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    -- dominant_stage as status_class kept for shape symmetry with \`areas_leaf\`'s status_class
    -- column (#310 review, LOW-J) -- not otherwise consumed downstream at this grain (the map/
    -- tooltip read \`stage_label\` instead).
    m.dominant_stage as status_class,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label,
    m.dominant_stage_number as stage_number,
    case
        when m.dominant_stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    -- #310 review fix (MEDIUM-4): pairs the most-widespread-stage reading with an explicit
    -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment point 3)
    -- this must never be shown as a standalone, confident-looking label. Blank ('') rather than
    -- NULL when not fragile, so the tooltip line renders empty instead of a formatted "-"
    -- placeholder.
    case
        when m.is_dominant_fragile
        then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
        else ''
    end as fragile_note,
    -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit caveat
    -- whenever the weighting silently degraded to equal-weight for this area (see
    -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / has_incomplete_population -- Hamburg's
    -- entire latest published period has this for effectively every Gebiet).
    case
        when m.has_incomplete_population
        then 'Population data incomplete for this area — equal-weighted, not population-weighted'
        else ''
    end as population_note,
    -- #353: rollup profile pages, /hamburg/area/<level>/<code> (same pattern as /berlin/maps).
    -- Merged-pair Stadtteil codes (#334, slash-joined) have no profile page -> NULL, no link.
    case
        when m.area_code like '%/%' then null
        else '${oe}/hamburg/area/${_.area_level.value}/' || m.area_code
    end as link
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
  -- defends against a future second variant silently duplicating rows here.
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by m.dominant_stage_number nulls last, m.area_name, m.area_code`),c.$$.dirty[0]&1&&i(21,J=`-- #310: one row per rollup area (subarea_l1/district), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- see
-- /berlin/maps' \`areas_rollup\` query for the identical pattern/rationale (dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean,
-- n_habitable_children, is_dominant_fragile, has_incomplete_population are all CONSTANT across
-- an area's typology_stage rows).
--
-- #310 review fix (MEDIUM-A): \`area_table_rollup\`/\`area_mix_table\` below each re-run an
-- equivalent query directly against the mart rather than chaining from this block by name using
-- Evidence's own block-interpolation syntax -- not because Evidence/DuckDB-WASM lacks support for
-- that (an earlier revision of this comment claimed exactly that; it was wrong -- see
-- /berlin/maps' \`bezirk_names\` block, added in the #310 review's MEDIUM-A fix, for a working
-- example of one block referencing another this way), but because \`area_mix_table\` needs the full
-- per-stage grain this query has already collapsed via QUALIFY, and \`area_table_rollup\` only
-- needs a handful of the same columns -- a direct re-select reads just as clearly as a chained one
-- here, for a query this short. Hamburg's subarea_l1/district area_name is real (no
-- Berlin-Bezirk-style blank-name gap, see H3-domain-signoff.md §condition 3), so unlike
-- /berlin/maps this page has no name-fallback lookup to de-duplicate in the first place.
--
-- NB: this comment deliberately avoids spelling out this block's own name inside that
-- interpolation syntax -- Evidence's query-chaining resolver scans a block's full text (comments
-- included) for that exact token, so a block mentioning its own name that way, in its own text,
-- creates a literal self-reference the resolver reports as "Compiler error: circular reference"
-- (hit and fixed during this review pass, both here and in /berlin/maps' \`bezirk_names\` block).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' identical \`areas_rollup\` query for
-- the full rationale/citation and the NULL-vs-0 note (the mart is sparse, so a filtered SUM over
-- zero matching rows is NULL, not 0 -- \`stages_2_4_share_raw\` is coalesced to 0 below only when
-- the area has at least one habitable child).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.city_code,
    m.area_code,
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    -- dominant_stage as status_class kept for shape symmetry with \`areas_leaf\`'s status_class
    -- column (#310 review, LOW-J) -- not otherwise consumed downstream at this grain (the map/
    -- tooltip read \`stage_label\` instead).
    m.dominant_stage as status_class,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label,
    m.dominant_stage_number as stage_number,
    case
        when m.dominant_stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    -- #310 review fix (MEDIUM-4): pairs the most-widespread-stage reading with an explicit
    -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment point 3)
    -- this must never be shown as a standalone, confident-looking label. Blank ('') rather than
    -- NULL when not fragile, so the tooltip line renders empty instead of a formatted "-"
    -- placeholder.
    case
        when m.is_dominant_fragile
        then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
        else ''
    end as fragile_note,
    -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit caveat
    -- whenever the weighting silently degraded to equal-weight for this area (see
    -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / has_incomplete_population -- Hamburg's
    -- entire latest published period has this for effectively every Gebiet).
    case
        when m.has_incomplete_population
        then 'Population data incomplete for this area — equal-weighted, not population-weighted'
        else ''
    end as population_note,
    -- #353: rollup profile pages, /hamburg/area/<level>/<code> (same pattern as /berlin/maps).
    -- Merged-pair Stadtteil codes (#334, slash-joined) have no profile page -> NULL, no link.
    case
        when m.area_code like '%/%' then null
        else '${oe}/hamburg/area/${_.area_level.value}/' || m.area_code
    end as link
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
  -- defends against a future second variant silently duplicating rows here.
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by m.dominant_stage_number nulls last, m.area_name, m.area_code`),c.$$.dirty[0]&7864320&&(j||!me?j||(H(J,{noResolve:j,...Z}),i(22,me=!0)):H(J,{noResolve:j})),c.$$.dirty[0]&125829120&&(he||!Be?he||($e(ge,{noResolve:he,...N}),i(26,Be=!0)):$e(ge,{noResolve:he})),c.$$.dirty[0]&1&&i(28,se=ye`-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' \`area_table_rollup\` query for the
-- full rationale/citation and the NULL-vs-0 note.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index_weighted_mean desc\`. Ranking a citywide table by a population-weighted
-- MEAN of an ordinal class code is exactly the "presented, coloured, or ordered" construct the
-- standing #267 domain decision forbids for a coarse scalar -- order by area_name instead (matches
-- /berlin/maps' equivalent fix and the Stage-mix table below). status_index/dynamism_index remain
-- visible as informational columns (see the Column titles below, per the geo-DS's C1: "mean
-- ordinal class (mean rank)", not a score -- #310 review fix D2-R2: population-weighted where
-- population data is complete and equal-weighted otherwise, not unconditionally).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_stage_label as stage_label,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`),c.$$.dirty[0]&1&&i(29,X=`-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (the same three typology_stage values) -- see /berlin/maps' \`area_table_rollup\` query for the
-- full rationale/citation and the NULL-vs-0 note.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index_weighted_mean desc\`. Ranking a citywide table by a population-weighted
-- MEAN of an ordinal class code is exactly the "presented, coloured, or ordered" construct the
-- standing #267 domain decision forbids for a coarse scalar -- order by area_name instead (matches
-- /berlin/maps' equivalent fix and the Stage-mix table below). status_index/dynamism_index remain
-- visible as informational columns (see the Column titles below, per the geo-DS's C1: "mean
-- ordinal class (mean rank)", not a score -- #310 review fix D2-R2: population-weighted where
-- population data is complete and equal-weighted otherwise, not unconditionally).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'HH'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'HH'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    m.area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_stage_label as stage_label,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'HH'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`),c.$$.dirty[0]&2013265920&&(se||!fe?se||(de(X,{noResolve:se,...ne}),i(30,fe=!0)):de(X,{noResolve:se})),c.$$.dirty[0]&1&&i(32,_e=ye`-- #310 review fix (LOW-6): explicit variant filter, same as areas_rollup/area_table_rollup above
-- -- Hamburg's subarea_l1/district area_name is real (no Berlin-Bezirk-style blank-name gap), so
-- unlike /berlin/maps' equivalent query this one needs no name-fallback join.
--
-- #310 review fix (R-310-1): stage_label de-jargons typology_stage with the exact same stage-name
-- mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level.
-- #358: stage_label is the mart's dbt display column; stages listed in cycle order within each
-- area; stage_note carries the spec §1 C2 text for the "No stage on record" bucket.
select
    area_name,
    stage_label,
    case
        when stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    stage_population_share,
    stage_n_children,
    has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${_.area_level.value}'
  and city_code = 'HH'
  and variant = 'live_data'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
order by area_name, stage_number nulls last`),c.$$.dirty[0]&1&&i(33,ie=`-- #310 review fix (LOW-6): explicit variant filter, same as areas_rollup/area_table_rollup above
-- -- Hamburg's subarea_l1/district area_name is real (no Berlin-Bezirk-style blank-name gap), so
-- unlike /berlin/maps' equivalent query this one needs no name-fallback join.
--
-- #310 review fix (R-310-1): stage_label de-jargons typology_stage with the exact same stage-name
-- mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level.
-- #358: stage_label is the mart's dbt display column; stages listed in cycle order within each
-- area; stage_note carries the spec §1 C2 text for the "No stage on record" bucket.
select
    area_name,
    stage_label,
    case
        when stage_number is null then 'not scored by the Sozialmonitoring'
        else ''
    end as stage_note,
    stage_population_share,
    stage_n_children,
    has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix
where area_level = '${_.area_level.value}'
  and city_code = 'HH'
  and variant = 'live_data'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'HH' and variant = 'live_data'
  )
order by area_name, stage_number nulls last`),c.$$.dirty[1]&15&&(_e||!xe?_e||(ue(ie,{noResolve:_e,...be}),i(34,xe=!0)):ue(ie,{noResolve:_e})),c.$$.dirty[0]&1&&i(2,e=_.area_level.value!=="subarea_l2"),c.$$.dirty[0]&5&&i(1,r=e?"status_class":_.indicator.value),c.$$.dirty[0]&5&&i(10,l=e?"Gentrification stage — plain-language, colour-coded":_.indicator.label),c.$$.dirty[0]&1&&i(9,h=ze[_.area_level.value]?`${oe}/geo/${ze[_.area_level.value]}`:void 0),c.$$.dirty[0]&6&&i(8,n=e?[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:"stage_label",title:"Most widespread stage",fmt:"id"},{id:"stage_note",showColumnName:!1,valueClass:"text-xs opacity-70",fmt:"id"},{id:"dominant_share",title:"Most widespread stage's share",fmt:"pct0"},{id:"stages_2_4_share",title:"Share in stages 2–4",fmt:"pct0"},{id:"n_habitable_children",title:"Constituent Gebiete with data",fmt:"id"},{id:"fragile_note",showColumnName:!1,valueClass:"text-xs text-amber-700",fmt:"id"},{id:"population_note",showColumnName:!1,valueClass:"text-xs text-amber-700",fmt:"id"},{id:"area_code",title:"Area code",valueClass:"text-xs opacity-60",fmt:"id"}]:[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:r==="status_class"?"stage_label":r,title:pe[r],fmt:r==="status_class"?"id":"num1"},{id:"code_note",title:"Gebiet code",valueClass:"text-xs opacity-60",fmt:"id"}])},i(16,E=ye`-- Only one (variant, area_level) combination exists for Hamburg's leaf grain in
-- gentrification_index: live_data / subarea_l2 (H3, #237). #358: stage_label/stage_number are
-- gentrification_index's own dbt display columns (typology_stage_display), the same as
-- /berlin/maps' \`areas_plr\` -- same D1xD2 matrix, reused unmodified per H1-domain-signoff.md §1.
-- Ordered by cycle position so the legend reads 1..6, then "No stage on record".
select
    city_code,
    area_code,
    area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    -- #353: click-through to this Gebiet's profile page, same \`${oe}\`-prefixed column
    -- convention as /berlin/maps' areas_plr \`link\` (PolygonMap expects an already-prefixed URL).
    '${oe}/hamburg/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by stage_number nulls last, area_name, area_code`),i(17,m=`-- Only one (variant, area_level) combination exists for Hamburg's leaf grain in
-- gentrification_index: live_data / subarea_l2 (H3, #237). #358: stage_label/stage_number are
-- gentrification_index's own dbt display columns (typology_stage_display), the same as
-- /berlin/maps' \`areas_plr\` -- same D1xD2 matrix, reused unmodified per H1-domain-signoff.md §1.
-- Ordered by cycle position so the legend reads 1..6, then "No stage on record".
select
    city_code,
    area_code,
    area_name,
    -- #352 review: the Gebiet code as a separate tooltip line, only where the label doesn't
    -- already contain it (the '<Stadtteil> · Gebiet <code>' fallback labels do).
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    -- #353: click-through to this Gebiet's profile page, same \`${oe}\`-prefixed column
    -- convention as /berlin/maps' areas_plr \`link\` (PolygonMap expects an already-prefixed URL).
    '${oe}/hamburg/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
order by stage_number nulls last, area_name, area_code`),i(24,he=ye`select
    area_name,
    -- #353 (#352 review follow-up): the code only where the label doesn't already contain it,
    -- same label-contains-code test as code_note above.
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
order by stage_number nulls last, area_name, area_code`),i(25,ge=`select
    area_name,
    -- #353 (#352 review follow-up): the code only where the label doesn't already contain it,
    -- same label-contains-code test as code_note above.
    case when strpos(area_name, 'Gebiet ' || area_code) > 0 then null else area_code end
        as code_note,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )
-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
order by stage_number nulls last, area_name, area_code`),[_,r,e,k,ae,le,te,Ue,n,h,l,Ee,Ae,y,u,z,E,m,re,Z,j,J,me,N,he,ge,Be,ne,se,X,fe,be,_e,ie,xe,b]}class vt extends $a{constructor(a){super(),xa(this,a,rt,at,pa,{data:13},null,[-1,-1])}}export{vt as component};
