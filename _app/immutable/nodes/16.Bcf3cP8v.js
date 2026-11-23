import{s as va,d as o,w as ka,i as d,a as je,b as N,c as v,h as xa,e as S,f as Je,k as I,g as ba,j as X,l as k,m as M,t as ee,n as la,o as $a,p as Ea,q as Ba,r as Ra,u as re}from"../chunks/scheduler.wXRIqz25.js";import{S as za,i as La,d as B,t as w,a as g,c as ze,m as R,b as z,e as L,g as Le}from"../chunks/index.uz5rP6Z2.js";import{F as Na}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Sa}from"../chunks/Hero.C0o6T8tj.js";import{P as Ma}from"../chunks/PolygonMap.DD1ANdqB.js";import{S as qa}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as Ca}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as aa,C as J}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as Re,w as Ta}from"../chunks/entry.DotynpIs.js";import{A as ta}from"../chunks/Alert.DFISYc09.js";import{e as Aa,s as Da,Q as Ye,p as Pa,a as da,r as ca,C as Ua}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as _e}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as wa,a as Oe}from"../chunks/Dropdown.Dl2mephJ.js";import{p as Ia}from"../chunks/stores.DJGNasUV.js";import{Q as Ge}from"../chunks/QueryViewer.RFckNDEV.js";import{p as ja}from"../chunks/profile.BW8tN6E9.js";function Oa(h){let a,r=T.title+"",e;return{c(){a=M("h1"),e=ee(r),this.h()},l(n){a=S(n,"H1",{class:!0});var i=ba(a);e=X(i,r),i.forEach(o),this.h()},h(){N(a,"class","title")},m(n,i){d(n,a,i),je(a,e)},p:re,d(n){n&&o(a)}}}function Ha(h){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:re,p:re,d:re}}function Ka(h){let a,r,e,n,i;return document.title=a=T.title,{c(){r=k(),e=M("meta"),n=k(),i=M("meta"),this.h()},l(m){r=v(m),e=S(m,"META",{property:!0,content:!0}),n=v(m),i=S(m,"META",{name:!0,content:!0}),this.h()},h(){var m,s;N(e,"property","og:title"),N(e,"content",((m=T.og)==null?void 0:m.title)??T.title),N(i,"name","twitter:title"),N(i,"content",((s=T.og)==null?void 0:s.title)??T.title)},m(m,s){d(m,r,s),d(m,e,s),d(m,n,s),d(m,i,s)},p(m,s){s&0&&a!==(a=T.title)&&(document.title=a)},d(m){m&&(o(r),o(e),o(n),o(i))}}}function Fa(h){var i,m;let a,r,e=(T.description||((i=T.og)==null?void 0:i.description))&&Wa(),n=((m=T.og)==null?void 0:m.image)&&Ya();return{c(){e&&e.c(),a=k(),n&&n.c(),r=Je()},l(s){e&&e.l(s),a=v(s),n&&n.l(s),r=Je()},m(s,y){e&&e.m(s,y),d(s,a,y),n&&n.m(s,y),d(s,r,y)},p(s,y){var c,b;(T.description||(c=T.og)!=null&&c.description)&&e.p(s,y),(b=T.og)!=null&&b.image&&n.p(s,y)},d(s){s&&(o(a),o(r)),e&&e.d(s),n&&n.d(s)}}}function Wa(h){let a,r,e,n,i;return{c(){a=M("meta"),r=k(),e=M("meta"),n=k(),i=M("meta"),this.h()},l(m){a=S(m,"META",{name:!0,content:!0}),r=v(m),e=S(m,"META",{property:!0,content:!0}),n=v(m),i=S(m,"META",{name:!0,content:!0}),this.h()},h(){var m,s,y;N(a,"name","description"),N(a,"content",T.description??((m=T.og)==null?void 0:m.description)),N(e,"property","og:description"),N(e,"content",((s=T.og)==null?void 0:s.description)??T.description),N(i,"name","twitter:description"),N(i,"content",((y=T.og)==null?void 0:y.description)??T.description)},m(m,s){d(m,a,s),d(m,r,s),d(m,e,s),d(m,n,s),d(m,i,s)},p:re,d(m){m&&(o(a),o(r),o(e),o(n),o(i))}}}function Ya(h){let a,r,e;return{c(){a=M("meta"),r=k(),e=M("meta"),this.h()},l(n){a=S(n,"META",{property:!0,content:!0}),r=v(n),e=S(n,"META",{name:!0,content:!0}),this.h()},h(){var n,i;N(a,"property","og:image"),N(a,"content",da((n=T.og)==null?void 0:n.image)),N(e,"name","twitter:image"),N(e,"content",da((i=T.og)==null?void 0:i.image))},m(n,i){d(n,a,i),d(n,r,i),d(n,e,i)},p:re,d(n){n&&(o(a),o(r),o(e))}}}function Ga(h){let a,r="How to read the map:",e,n,i='"Gentrification stage"',m,s,y='"Social status"',c,b,l='"Dynamism"',$,f,_="more deprived",A,x,q="worsening",U,p,C="index definition",oe,Z,O="methodology & data sources",j;return{c(){a=M("b"),a.textContent=r,e=ee(" The "),n=M("b"),n.textContent=i,m=ee(` option is the easiest to read at a
  glance — it colours each area by one of six plain-language stages (numbered 1–6 by position in
  the cycle; see the legend), no decoder needed — hover any area for its name and value. At the
  Planungsraum (PLR) level, the `),s=M("b"),s.textContent=y,c=ee(" and "),b=M("b"),b.textContent=l,$=ee(` options are also
  offered, showing the raw ordinal inputs behind that stage (not offered as a map colour at
  Bezirk/PGR/Ortsteil grain — see the Indicator note there for why): "Social status" is ordinal —
  higher shading means `),f=M("b"),f.textContent=_,A=ee(`, not more prosperous. "Dynamism" is the official
  status-trend class: 1 = improving, 2 = stable, 3 = worsening relative to the city, so higher
  shading means a `),x=M("b"),x.textContent=q,U=ee(` trend. See the
  `),p=M("a"),p.textContent=C,oe=ee(`
  for the full methodology, or the `),Z=M("a"),Z.textContent=O,j=ee(` page for a
  plain-language walkthrough. Under "Gentrification stage", areas without a stage are drawn in very
  light grey as "No stage on record"; under the other two options, areas without a value are drawn
  with grey hatching and marked "No data" in the legend.`),this.h()},l(E){a=S(E,"B",{"data-svelte-h":!0}),I(a)!=="svelte-1k0da8y"&&(a.textContent=r),e=X(E," The "),n=S(E,"B",{"data-svelte-h":!0}),I(n)!=="svelte-1sxo7gq"&&(n.textContent=i),m=X(E,` option is the easiest to read at a
  glance — it colours each area by one of six plain-language stages (numbered 1–6 by position in
  the cycle; see the legend), no decoder needed — hover any area for its name and value. At the
  Planungsraum (PLR) level, the `),s=S(E,"B",{"data-svelte-h":!0}),I(s)!=="svelte-1tb9m99"&&(s.textContent=y),c=X(E," and "),b=S(E,"B",{"data-svelte-h":!0}),I(b)!=="svelte-108pztc"&&(b.textContent=l),$=X(E,` options are also
  offered, showing the raw ordinal inputs behind that stage (not offered as a map colour at
  Bezirk/PGR/Ortsteil grain — see the Indicator note there for why): "Social status" is ordinal —
  higher shading means `),f=S(E,"B",{"data-svelte-h":!0}),I(f)!=="svelte-1t7i6y0"&&(f.textContent=_),A=X(E,`, not more prosperous. "Dynamism" is the official
  status-trend class: 1 = improving, 2 = stable, 3 = worsening relative to the city, so higher
  shading means a `),x=S(E,"B",{"data-svelte-h":!0}),I(x)!=="svelte-12oj2em"&&(x.textContent=q),U=X(E,` trend. See the
  `),p=S(E,"A",{href:!0,"data-svelte-h":!0}),I(p)!=="svelte-1iha4fz"&&(p.textContent=C),oe=X(E,`
  for the full methodology, or the `),Z=S(E,"A",{href:!0,"data-svelte-h":!0}),I(Z)!=="svelte-3zcnok"&&(Z.textContent=O),j=X(E,` page for a
  plain-language walkthrough. Under "Gentrification stage", areas without a stage are drawn in very
  light grey as "No stage on record"; under the other two options, areas without a value are drawn
  with grey hatching and marked "No data" in the legend.`),this.h()},h(){N(p,"href","https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md"),N(Z,"href","/gentriduck/methodology")},m(E,D){d(E,a,D),d(E,e,D),d(E,n,D),d(E,m,D),d(E,s,D),d(E,c,D),d(E,b,D),d(E,$,D),d(E,f,D),d(E,A,D),d(E,x,D),d(E,U,D),d(E,p,D),d(E,oe,D),d(E,Z,D),d(E,j,D)},p:re,d(E){E&&(o(a),o(e),o(n),o(m),o(s),o(c),o(b),o($),o(f),o(A),o(x),o(U),o(p),o(oe),o(Z),o(j))}}}function Za(h){let a,r,e,n,i,m,s,y;return a=new Oe({props:{value:"plr",valueLabel:"Planungsraum (PLR) — individual neighbourhoods"}}),e=new Oe({props:{value:"bezirk",valueLabel:"Bezirk — 12 boroughs"}}),i=new Oe({props:{value:"pgr",valueLabel:"Prognoseraum (PGR) — ~58 mid-level areas"}}),s=new Oe({props:{value:"ortsteil",valueLabel:"Ortsteil — ~97 traditional neighbourhoods (approximate assignment, see caveats)"}}),{c(){L(a.$$.fragment),r=k(),L(e.$$.fragment),n=k(),L(i.$$.fragment),m=k(),L(s.$$.fragment)},l(c){z(a.$$.fragment,c),r=v(c),z(e.$$.fragment,c),n=v(c),z(i.$$.fragment,c),m=v(c),z(s.$$.fragment,c)},m(c,b){R(a,c,b),d(c,r,b),R(e,c,b),d(c,n,b),R(i,c,b),d(c,m,b),R(s,c,b),y=!0},p:re,i(c){y||(g(a.$$.fragment,c),g(e.$$.fragment,c),g(i.$$.fragment,c),g(s.$$.fragment,c),y=!0)},o(c){w(a.$$.fragment,c),w(e.$$.fragment,c),w(i.$$.fragment,c),w(s.$$.fragment,c),y=!1},d(c){c&&(o(r),o(n),o(m)),B(a,c),B(e,c),B(i,c),B(s,c)}}}function ha(h){let a,r,e,n;return a=new ta({props:{status:"info",$$slots:{default:[Qa]},$$scope:{ctx:h}}}),e=new ta({props:{status:"warning",$$slots:{default:[Va]},$$scope:{ctx:h}}}),{c(){L(a.$$.fragment),r=k(),L(e.$$.fragment)},l(i){z(a.$$.fragment,i),r=v(i),z(e.$$.fragment,i)},m(i,m){R(a,i,m),d(i,r,m),R(e,i,m),n=!0},i(i){n||(g(a.$$.fragment,i),g(e.$$.fragment,i),n=!0)},o(i){w(a.$$.fragment,i),w(e.$$.fragment,i),n=!1},d(i){i&&o(r),B(a,i),B(e,i)}}}function Qa(h){let a,r="Bezirk / PGR / Ortsteil are population-weighted rollups of the PLR-level data",e,n,i="#310 design decision",m,s,y='most widespread ("dominant") stage',c,b,l="share",$,f,_="equal",A;return{c(){a=M("b"),a.textContent=r,e=ee(` — never a
  re-scored index at this grain (averaging the underlying 1-4/1-3 MSS ordinals into a single new
  category would be statistically invalid; see the
  `),n=M("a"),n.textContent=i,m=ee(`). The map
  colours by the `),s=M("b"),s.textContent=y,c=ee(` among that area's constituent PLRs,
  weighted by population where available — its tooltip and the tables below always show that
  stage's `),b=M("b"),b.textContent=l,$=ee(` alongside it (population-weighted where possible, equal-weighted as a
  flagged fallback otherwise), and the "Stage mix" table further down shows the full breakdown,
  never just the single most-widespread label. Areas with fewer than 3 PLRs with real data are
  flagged as a fragile ("small sample") reading. Where population data is missing for some or all
  of an area's constituent PLRs, that area falls back to `),f=M("b"),f.textContent=_,A=ee(` weighting rather than true
  population weighting — flagged per-area as "population data incomplete" in the table and map
  tooltip below.`),this.h()},l(x){a=S(x,"B",{"data-svelte-h":!0}),I(a)!=="svelte-8h6csv"&&(a.textContent=r),e=X(x,` — never a
  re-scored index at this grain (averaging the underlying 1-4/1-3 MSS ordinals into a single new
  category would be statistically invalid; see the
  `),n=S(x,"A",{href:!0,"data-svelte-h":!0}),I(n)!=="svelte-vym2cu"&&(n.textContent=i),m=X(x,`). The map
  colours by the `),s=S(x,"B",{"data-svelte-h":!0}),I(s)!=="svelte-1d2azc6"&&(s.textContent=y),c=X(x,` among that area's constituent PLRs,
  weighted by population where available — its tooltip and the tables below always show that
  stage's `),b=S(x,"B",{"data-svelte-h":!0}),I(b)!=="svelte-dsjmq7"&&(b.textContent=l),$=X(x,` alongside it (population-weighted where possible, equal-weighted as a
  flagged fallback otherwise), and the "Stage mix" table further down shows the full breakdown,
  never just the single most-widespread label. Areas with fewer than 3 PLRs with real data are
  flagged as a fragile ("small sample") reading. Where population data is missing for some or all
  of an area's constituent PLRs, that area falls back to `),f=S(x,"B",{"data-svelte-h":!0}),I(f)!=="svelte-12wzsvk"&&(f.textContent=_),A=X(x,` weighting rather than true
  population weighting — flagged per-area as "population data incomplete" in the table and map
  tooltip below.`),this.h()},h(){N(n,"href","https://github.com/dhelweg/gentriduck/issues/310")},m(x,q){d(x,a,q),d(x,e,q),d(x,n,q),d(x,m,q),d(x,s,q),d(x,c,q),d(x,b,q),d(x,$,q),d(x,f,q),d(x,A,q)},p:re,d(x){x&&(o(a),o(e),o(n),o(m),o(s),o(c),o(b),o($),o(f),o(A))}}}function Va(h){let a,r=`A "6 · Stable / established" reading at this grain does not mean that no part of the area is
  changing.`,e;return{c(){a=M("b"),a.textContent=r,e=ee(` Plurality voting resolves an area to whichever stage is most widespread among its
  constituent PLRs — and because "6 · Stable / established" is, by construction, the most common
  stage citywide, coarser levels are systematically biased toward reading as calm, not toward
  neutral noise. An area whose map colour reads "6 · Stable / established" can still contain
  smaller neighbourhoods in stages 2–4; this map alone cannot show you whether it does. The share
  of the area in stages 2–4 (residents where population data exists, otherwise constituent areas —
  in the tooltip and table below) and the Planungsraum (PLR) level — the finest grain this site
  publishes — are where such change can actually be located.`)},l(n){a=S(n,"B",{"data-svelte-h":!0}),I(a)!=="svelte-zhlhl0"&&(a.textContent=r),e=X(n,` Plurality voting resolves an area to whichever stage is most widespread among its
  constituent PLRs — and because "6 · Stable / established" is, by construction, the most common
  stage citywide, coarser levels are systematically biased toward reading as calm, not toward
  neutral noise. An area whose map colour reads "6 · Stable / established" can still contain
  smaller neighbourhoods in stages 2–4; this map alone cannot show you whether it does. The share
  of the area in stages 2–4 (residents where population data exists, otherwise constituent areas —
  in the tooltip and table below) and the Planungsraum (PLR) level — the finest grain this site
  publishes — are where such change can actually be located.`)},m(n,i){d(n,a,i),d(n,e,i)},p:re,d(n){n&&(o(a),o(e))}}}function Ja(h){let a,r=`<b>Indicator: Gentrification stage</b> — the only map colour offered at this area level. A
  population-weighted <i>mean</i> of the Social status / Dynamism ordinals is not offered as a
  coloured, ranked map indicator at Bezirk/PGR/Ortsteil grain (averaging discrete ordinal classes
  into a coarse-grain score and colouring or ranking by it is a documented methodology red line
  for this project — see the <a href="/gentriduck/methodology">methodology &amp; data sources</a> page); those
  raw ordinals remain available, clearly labelled as a mean ordinal class (mean rank),
  population-weighted where population data is complete and equal-weighted otherwise, in
  the table below and as a real map colour at the Planungsraum (PLR) level above.`;return{c(){a=M("p"),a.innerHTML=r,this.h()},l(e){a=S(e,"P",{class:!0,"data-svelte-h":!0}),I(a)!=="svelte-zteaav"&&(a.innerHTML=r),this.h()},h(){N(a,"class","text-sm mb-2")},m(e,n){d(e,a,n)},i:re,o:re,d(e){e&&o(a)}}}function Xa(h){let a,r;return a=new wa({props:{name:"indicator",title:"Indicator",defaultValue:"status_class",$$slots:{default:[et]},$$scope:{ctx:h}}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function et(h){let a,r,e,n,i,m;return a=new Oe({props:{value:"status_class",valueLabel:"Gentrification stage — plain-language, colour-coded"}}),e=new Oe({props:{value:"status_index",valueLabel:"Social status — how deprived or affluent (current snapshot)"}}),i=new Oe({props:{value:"dynamism_index",valueLabel:"Dynamism — how fast that status is changing"}}),{c(){L(a.$$.fragment),r=k(),L(e.$$.fragment),n=k(),L(i.$$.fragment)},l(s){z(a.$$.fragment,s),r=v(s),z(e.$$.fragment,s),n=v(s),z(i.$$.fragment,s)},m(s,y){R(a,s,y),d(s,r,y),R(e,s,y),d(s,n,y),R(i,s,y),m=!0},p:re,i(s){m||(g(a.$$.fragment,s),g(e.$$.fragment,s),g(i.$$.fragment,s),m=!0)},o(s){w(a.$$.fragment,s),w(e.$$.fragment,s),w(i.$$.fragment,s),m=!1},d(s){s&&(o(r),o(n)),B(a,s),B(e,s),B(i,s)}}}function ma(h){let a,r;return a=new Ge({props:{queryID:"areas_plr",queryResult:h[3]}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&8&&(i.queryResult=e[3]),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function _a(h){let a,r;return a=new Ge({props:{queryID:"bezirk_names",queryResult:h[4]}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&16&&(i.queryResult=e[4]),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function ua(h){let a,r;return a=new Ge({props:{queryID:"areas_rollup",queryResult:h[5]}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&32&&(i.queryResult=e[5]),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function pa(h){let a,r;return a=new Ge({props:{queryID:"area_table_plr",queryResult:h[6]}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&64&&(i.queryResult=e[6]),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function fa(h){let a,r;return a=new Ge({props:{queryID:"area_table_rollup",queryResult:h[7]}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&128&&(i.queryResult=e[7]),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function at(h){let a,r;return a=new aa({props:{data:h[6],rows:"10",$$slots:{default:[rt]},$$scope:{ctx:h}}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&64&&(i.data=e[6]),n[1]&134217728&&(i.$$scope={dirty:n,ctx:e}),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function tt(h){let a,r,e,n='<a href="#stage-mix--full-breakdown-per-area">Stage mix — full breakdown per area</a>',i,m,s=`Never rely on the most widespread stage alone: this table is the full stage-mix distribution
behind every area above — population-weighted where an area's population data is complete,
equal-weighted as a flagged fallback otherwise (see the "population data incomplete" column) —
including the "No stage on record" bucket, shown as a count of constituent areas, not a share
(it is excluded from the share calculation by design; see that column's own values below).`,y,c,b,l;a=new aa({props:{data:h[7],rows:"10",$$slots:{default:[nt]},$$scope:{ctx:h}}});let $=h[8]&&ga(h);return b=new aa({props:{data:h[8],rows:"50",search:"true",$$slots:{default:[it]},$$scope:{ctx:h}}}),{c(){L(a.$$.fragment),r=k(),e=M("h3"),e.innerHTML=n,i=k(),m=M("p"),m.textContent=s,y=k(),$&&$.c(),c=k(),L(b.$$.fragment),this.h()},l(f){z(a.$$.fragment,f),r=v(f),e=S(f,"H3",{class:!0,id:!0,"data-svelte-h":!0}),I(e)!=="svelte-gqegou"&&(e.innerHTML=n),i=v(f),m=S(f,"P",{class:!0,"data-svelte-h":!0}),I(m)!=="svelte-wokf0d"&&(m.textContent=s),y=v(f),$&&$.l(f),c=v(f),z(b.$$.fragment,f),this.h()},h(){N(e,"class","markdown"),N(e,"id","stage-mix--full-breakdown-per-area"),N(m,"class","markdown")},m(f,_){R(a,f,_),d(f,r,_),d(f,e,_),d(f,i,_),d(f,m,_),d(f,y,_),$&&$.m(f,_),d(f,c,_),R(b,f,_),l=!0},p(f,_){const A={};_[0]&128&&(A.data=f[7]),_[1]&134217728&&(A.$$scope={dirty:_,ctx:f}),a.$set(A),f[8]?$?($.p(f,_),_[0]&256&&g($,1)):($=ga(f),$.c(),g($,1),$.m(c.parentNode,c)):$&&(Le(),w($,1,1,()=>{$=null}),ze());const x={};_[0]&256&&(x.data=f[8]),_[1]&134217728&&(x.$$scope={dirty:_,ctx:f}),b.$set(x)},i(f){l||(g(a.$$.fragment,f),g($),g(b.$$.fragment,f),l=!0)},o(f){w(a.$$.fragment,f),w($),w(b.$$.fragment,f),l=!1},d(f){f&&(o(r),o(e),o(i),o(m),o(y),o(c)),B(a,f),$&&$.d(f),B(b,f)}}}function rt(h){let a,r,e,n,i,m,s,y;return a=new J({props:{id:"area_name",title:"Area"}}),e=new J({props:{id:"status_index",title:"Social status (1=least deprived … 4=most deprived)"}}),i=new J({props:{id:"dynamism_index",title:"Status trend class (1 = improving, 2 = stable, 3 = worsening)"}}),s=new J({props:{id:"stage_label",title:"Gentrification stage"}}),{c(){L(a.$$.fragment),r=k(),L(e.$$.fragment),n=k(),L(i.$$.fragment),m=k(),L(s.$$.fragment)},l(c){z(a.$$.fragment,c),r=v(c),z(e.$$.fragment,c),n=v(c),z(i.$$.fragment,c),m=v(c),z(s.$$.fragment,c)},m(c,b){R(a,c,b),d(c,r,b),R(e,c,b),d(c,n,b),R(i,c,b),d(c,m,b),R(s,c,b),y=!0},p:re,i(c){y||(g(a.$$.fragment,c),g(e.$$.fragment,c),g(i.$$.fragment,c),g(s.$$.fragment,c),y=!0)},o(c){w(a.$$.fragment,c),w(e.$$.fragment,c),w(i.$$.fragment,c),w(s.$$.fragment,c),y=!1},d(c){c&&(o(r),o(n),o(m)),B(a,c),B(e,c),B(i,c),B(s,c)}}}function nt(h){let a,r,e,n,i,m,s,y,c,b,l,$,f,_,A,x,q,U;return a=new J({props:{id:"area_name",title:"Area"}}),e=new J({props:{id:"status_index",title:"Social status — mean ordinal class (mean rank; 1=least deprived … 4=most deprived), population-weighted where population data is complete and equal-weighted otherwise"}}),i=new J({props:{id:"dynamism_index",title:"Speed of change — mean ordinal class (mean rank), population-weighted where population data is complete and equal-weighted otherwise"}}),s=new J({props:{id:"stage_label",title:"Most widespread gentrification stage"}}),c=new J({props:{id:"dominant_share",title:"Most widespread stage's share (population-weighted, or equal-weighted — see the incomplete-data column)",fmt:"pct0"}}),l=new J({props:{id:"stages_2_4_share",title:"Share in stages 2–4 (improving from very low, low or middle status; population-weighted, or equal-weighted — see the incomplete-data column)",fmt:"pct0"}}),f=new J({props:{id:"n_habitable_children",title:"PLRs with data"}}),A=new J({props:{id:"is_dominant_fragile",title:"Fragile (< 3 PLRs)?"}}),q=new J({props:{id:"has_incomplete_population",title:"Population data incomplete (share above is equal-weighted, not population-weighted)?"}}),{c(){L(a.$$.fragment),r=k(),L(e.$$.fragment),n=k(),L(i.$$.fragment),m=k(),L(s.$$.fragment),y=k(),L(c.$$.fragment),b=k(),L(l.$$.fragment),$=k(),L(f.$$.fragment),_=k(),L(A.$$.fragment),x=k(),L(q.$$.fragment)},l(p){z(a.$$.fragment,p),r=v(p),z(e.$$.fragment,p),n=v(p),z(i.$$.fragment,p),m=v(p),z(s.$$.fragment,p),y=v(p),z(c.$$.fragment,p),b=v(p),z(l.$$.fragment,p),$=v(p),z(f.$$.fragment,p),_=v(p),z(A.$$.fragment,p),x=v(p),z(q.$$.fragment,p)},m(p,C){R(a,p,C),d(p,r,C),R(e,p,C),d(p,n,C),R(i,p,C),d(p,m,C),R(s,p,C),d(p,y,C),R(c,p,C),d(p,b,C),R(l,p,C),d(p,$,C),R(f,p,C),d(p,_,C),R(A,p,C),d(p,x,C),R(q,p,C),U=!0},p:re,i(p){U||(g(a.$$.fragment,p),g(e.$$.fragment,p),g(i.$$.fragment,p),g(s.$$.fragment,p),g(c.$$.fragment,p),g(l.$$.fragment,p),g(f.$$.fragment,p),g(A.$$.fragment,p),g(q.$$.fragment,p),U=!0)},o(p){w(a.$$.fragment,p),w(e.$$.fragment,p),w(i.$$.fragment,p),w(s.$$.fragment,p),w(c.$$.fragment,p),w(l.$$.fragment,p),w(f.$$.fragment,p),w(A.$$.fragment,p),w(q.$$.fragment,p),U=!1},d(p){p&&(o(r),o(n),o(m),o(y),o(b),o($),o(_),o(x)),B(a,p),B(e,p),B(i,p),B(s,p),B(c,p),B(l,p),B(f,p),B(A,p),B(q,p)}}}function ga(h){let a,r;return a=new Ge({props:{queryID:"area_mix_table",queryResult:h[8]}}),{c(){L(a.$$.fragment)},l(e){z(a.$$.fragment,e)},m(e,n){R(a,e,n),r=!0},p(e,n){const i={};n[0]&256&&(i.queryResult=e[8]),a.$set(i)},i(e){r||(g(a.$$.fragment,e),r=!0)},o(e){w(a.$$.fragment,e),r=!1},d(e){B(a,e)}}}function it(h){let a,r,e,n,i,m,s,y,c,b;return a=new J({props:{id:"area_name",title:"Area"}}),e=new J({props:{id:"stage_label",title:"Stage"}}),i=new J({props:{id:"stage_population_share",title:"Share (population-weighted, or equal-weighted — see last column)",fmt:"pct0"}}),s=new J({props:{id:"stage_n_children",title:"Constituent PLRs"}}),c=new J({props:{id:"has_incomplete_population",title:"Population data incomplete for this area?"}}),{c(){L(a.$$.fragment),r=k(),L(e.$$.fragment),n=k(),L(i.$$.fragment),m=k(),L(s.$$.fragment),y=k(),L(c.$$.fragment)},l(l){z(a.$$.fragment,l),r=v(l),z(e.$$.fragment,l),n=v(l),z(i.$$.fragment,l),m=v(l),z(s.$$.fragment,l),y=v(l),z(c.$$.fragment,l)},m(l,$){R(a,l,$),d(l,r,$),R(e,l,$),d(l,n,$),R(i,l,$),d(l,m,$),R(s,l,$),d(l,y,$),R(c,l,$),b=!0},p:re,i(l){b||(g(a.$$.fragment,l),g(e.$$.fragment,l),g(i.$$.fragment,l),g(s.$$.fragment,l),g(c.$$.fragment,l),b=!0)},o(l){w(a.$$.fragment,l),w(e.$$.fragment,l),w(i.$$.fragment,l),w(s.$$.fragment,l),w(c.$$.fragment,l),b=!1},d(l){l&&(o(r),o(n),o(m),o(y)),B(a,l),B(e,l),B(i,l),B(s,l),B(c,l)}}}function st(h){let a,r,e,n,i,m,s,y,c="Pick an area level and an indicator below.",b,l,$=`This page covers Berlin. See <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s own maps page</a> for the same view scoped to
Hamburg&#39;s own indicators, area levels, and observation window.`,f,_,A,x,q,U,p,C,oe,Z,O,j,E,D,be,we,te,le,ne,De,xe=h[2]?"profile":"neighbourhood",Ne,ue,de,ie,He='<a href="#the-numbers-behind-the-map">The numbers behind the map</a>',Se,ye,se,H,V,ve,ce,Ke=`Want to see how one specific area has changed over the years? Use the
<a href="/gentriduck/berlin/time-series" class="markdown">time series page</a>. Clicking a Planungsraum (PLR) on the map above opens its
exact neighbourhood page (<a href="https://github.com/dhelweg/gentriduck/issues/133" rel="nofollow" class="markdown">#133</a>,
<a href="https://github.com/dhelweg/gentriduck/issues/150" rel="nofollow" class="markdown">#150</a>); browsing by district still works on the
<a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a>. Want the commercial-mix (shops/cafés) view instead of the
social-status index – POI density and Offering Advantage by domain – see the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a>. Looking for the 2018 thesis reproduction&#39;s
Bezirksregion (BZR) map instead? It now lives on
<a href="/gentriduck/thesis-recheck" class="markdown">the 2018 thesis, re-checked</a>.`,he,ae,Me='<a href="#honest-caveats">Honest caveats</a>',qe,me,Fe=`<li class="markdown"><strong class="markdown">Social status and dynamism are ordinal, not linear.</strong> Higher social-status shading means
<strong class="markdown">more deprived</strong>, not more prosperous; the status trend is explained in the legend above the map
— see <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for the full decoder.</li> <li class="markdown"><strong class="markdown">Bezirk / PGR / Ortsteil are population-weighted rollups, never a re-scored index.</strong> The map
colours by the <em class="markdown">most widespread</em> (&quot;dominant&quot;) stage among each area&#39;s constituent PLRs — always
shown with its share (population-weighted where possible, equal-weighted as a flagged fallback
otherwise) and the full stage mix (see the &quot;Stage mix&quot; table), never as a standalone label.
Areas with fewer than 3 PLRs contributing real data are flagged fragile.</li> <li class="markdown"><strong class="markdown">A coarse-grain reading is directionally biased toward &quot;calm&quot;, not neutral.</strong> Plurality voting
resolves an area to whichever stage is most widespread among its constituents, and the most
widespread stage is, by construction, usually &quot;6 · Stable / established&quot; — so coarser levels
systematically understate local change rather than randomly blurring it. An area shown as
&quot;6 · Stable / established&quot; can still contain smaller neighbourhoods in stages 2–4; this map
cannot be read as evidence that no part of it is changing. The share of the area in stages 2–4
(residents where population data exists, otherwise constituent areas — in the tooltip and table
above) and the Planungsraum (PLR) level — the finest grain this site publishes — are where such
change can actually be located.</li> <li class="markdown"><strong class="markdown">The rollup &quot;Social status&quot;/&quot;Speed of change&quot; figures are a mean ordinal class (a mean rank),
population-weighted where population data is complete and equal-weighted otherwise, not a
rescaled score.</strong> They are not offered as a map colour at Bezirk/PGR/Ortsteil grain, and the
table above no longer ranks by them, for exactly this reason — see the Indicator note above the
map.</li> <li class="markdown"><strong class="markdown">Ortsteil figures are approximate, unlike PGR/Bezirk which nest exactly.</strong> PLRs do not nest
cleanly into Ortsteile, so each Ortsteil&#39;s figures are assembled from the PLRs a dominant-overlap
rule assigns to it, not from a clean administrative nesting — the drawn polygon is the true
Ortsteil boundary, but the value describes that assigned-PLR set.</li> <li class="markdown"><strong class="markdown">&quot;Population-weighted&quot; is a best-effort weighting, not a guarantee.</strong> Where population data is
missing for some or all of an area&#39;s constituent PLRs, that area&#39;s rollup falls back to <em class="markdown">equal</em>
weighting across its constituent PLRs rather than true population weighting — flagged per-area
as &quot;population data incomplete&quot; in the table and map tooltip.</li> <li class="markdown">This map&#39;s Planungsraum (PLR) level covers Berlin&#39;s current, live data at neighbourhood detail.
The 2018 thesis&#39;s Dec-2016-snapshot reproduction, at the coarser Bezirksregion level, has its own
fixed map on <a href="/gentriduck/thesis-recheck" class="markdown">the 2018 thesis, re-checked</a>.</li> <li class="markdown">Areas without a stage (e.g. uninhabited planning areas) are drawn in very light grey (&quot;No stage
on record&quot;), and areas without a value for the &quot;Social status&quot; or &quot;Dynamism&quot; option with grey
hatching (&quot;No data&quot;) — either one is missing data, not a &quot;no change&quot; reading.</li>`,We,pe,Ve='<a href="#where-next">Where next</a>',Pe,ke,P=`<li class="markdown"><strong class="markdown"><a href="/gentriduck/berlin/time-series" class="markdown">Time series</a></strong> — how one specific area, or the whole city, has moved
over the years.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/berlin/area-detail" class="markdown">Area detail</a></strong> — browse by district, or open one neighbourhood&#39;s full
profile via a map click.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a></strong> — the commercial-mix (shops/cafés) view of
the same neighbourhoods.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked</a></strong> — the fixed 2018 thesis reproduction map
(Bezirksregion, Dec 2016 snapshot) and the re-test of all eight hypotheses.</li> <li class="markdown"><strong class="markdown"><a href="/gentriduck/methodology" class="markdown">Methodology &amp; data sources</a></strong> — what the six gentrification stages
mean.</li>`,$e,Ce,fe,ge,Ze,Ee=typeof T<"u"&&T.title&&T.hide_title!==!0&&Oa();function ya(t,u){return typeof T<"u"&&T.title?Ka:Ha}let Qe=ya()(h),Be=typeof T=="object"&&Fa();m=new Sa({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Maps — gentrification stages by area",lede:"Colours each of Berlin's neighbourhoods by its current gentrification stage (numbered 1–6 by position in the cycle; see the legend)."}}),_=new ta({props:{status:"info",$$slots:{default:[Ga]},$$scope:{ctx:h}}}),x=new qa({}),U=new Ca({}),C=new wa({props:{name:"area_level",title:"Area level",defaultValue:"plr",$$slots:{default:[Za]},$$scope:{ctx:h}}});let Q=h[2]&&ha(h);const ra=[Xa,Ja],Ue=[];function na(t,u){return t[2]?1:0}O=na(h),j=Ue[O]=ra[O](h);let K=h[3]&&ma(h),F=h[4]&&_a(h),W=h[5]&&ua(h);te=new Ma({props:{data:h[2]?h[5]:h[3],geoJsonUrl:h[10],geoId:"area_code",areaCol:"area_code",value:h[1]==="status_class"?"stage_label":h[1],legendType:h[1]==="status_class"?"categorical":"scalar",colorPalette:h[1]==="status_class"?h[12](h[2]?h[5]:h[3]):void 0,title:"Berlin "+h[13][h[0].area_level.value]+" — "+h[11]+", latest period",link:"link",tooltip:h[9]}});let Y=h[6]&&pa(h),G=h[7]&&fa(h);const ia=[tt,at],Te=[];function sa(t,u){return t[2]?0:1}return H=sa(h),V=Te[H]=ia[H](h),ge=new Na({}),{c(){Ee&&Ee.c(),a=k(),Qe.c(),r=M("meta"),e=M("meta"),Be&&Be.c(),n=Je(),i=k(),L(m.$$.fragment),s=k(),y=M("p"),y.textContent=c,b=k(),l=M("p"),l.innerHTML=$,f=k(),L(_.$$.fragment),A=k(),L(x.$$.fragment),q=k(),L(U.$$.fragment),p=k(),L(C.$$.fragment),oe=k(),Q&&Q.c(),Z=k(),j.c(),E=k(),K&&K.c(),D=k(),F&&F.c(),be=k(),W&&W.c(),we=k(),L(te.$$.fragment),le=k(),ne=M("p"),De=ee("Click an area on the map to open its exact "),Ne=ee(xe),ue=ee(" page."),de=k(),ie=M("h2"),ie.innerHTML=He,Se=k(),Y&&Y.c(),ye=k(),G&&G.c(),se=k(),V.c(),ve=k(),ce=M("p"),ce.innerHTML=Ke,he=k(),ae=M("h2"),ae.innerHTML=Me,qe=k(),me=M("ul"),me.innerHTML=Fe,We=k(),pe=M("h2"),pe.innerHTML=Ve,Pe=k(),ke=M("ul"),ke.innerHTML=P,$e=k(),Ce=M("hr"),fe=k(),L(ge.$$.fragment),this.h()},l(t){Ee&&Ee.l(t),a=v(t);const u=xa("svelte-2igo1p",document.head);Qe.l(u),r=S(u,"META",{name:!0,content:!0}),e=S(u,"META",{name:!0,content:!0}),Be&&Be.l(u),n=Je(),u.forEach(o),i=v(t),z(m.$$.fragment,t),s=v(t),y=S(t,"P",{class:!0,"data-svelte-h":!0}),I(y)!=="svelte-sy1lpd"&&(y.textContent=c),b=v(t),l=S(t,"P",{class:!0,"data-svelte-h":!0}),I(l)!=="svelte-81tax8"&&(l.innerHTML=$),f=v(t),z(_.$$.fragment,t),A=v(t),z(x.$$.fragment,t),q=v(t),z(U.$$.fragment,t),p=v(t),z(C.$$.fragment,t),oe=v(t),Q&&Q.l(t),Z=v(t),j.l(t),E=v(t),K&&K.l(t),D=v(t),F&&F.l(t),be=v(t),W&&W.l(t),we=v(t),z(te.$$.fragment,t),le=v(t),ne=S(t,"P",{class:!0});var Ie=ba(ne);De=X(Ie,"Click an area on the map to open its exact "),Ne=X(Ie,xe),ue=X(Ie," page."),Ie.forEach(o),de=v(t),ie=S(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(ie)!=="svelte-1loy64m"&&(ie.innerHTML=He),Se=v(t),Y&&Y.l(t),ye=v(t),G&&G.l(t),se=v(t),V.l(t),ve=v(t),ce=S(t,"P",{class:!0,"data-svelte-h":!0}),I(ce)!=="svelte-sp7hpd"&&(ce.innerHTML=Ke),he=v(t),ae=S(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(ae)!=="svelte-ad0syq"&&(ae.innerHTML=Me),qe=v(t),me=S(t,"UL",{class:!0,"data-svelte-h":!0}),I(me)!=="svelte-1v5fb0i"&&(me.innerHTML=Fe),We=v(t),pe=S(t,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(pe)!=="svelte-1v8k4cs"&&(pe.innerHTML=Ve),Pe=v(t),ke=S(t,"UL",{class:!0,"data-svelte-h":!0}),I(ke)!=="svelte-1ngkx76"&&(ke.innerHTML=P),$e=v(t),Ce=S(t,"HR",{class:!0}),fe=v(t),z(ge.$$.fragment,t),this.h()},h(){N(r,"name","twitter:card"),N(r,"content","summary_large_image"),N(e,"name","twitter:site"),N(e,"content","@evidence_dev"),N(y,"class","markdown"),N(l,"class","markdown"),N(ne,"class","markdown"),N(ie,"class","markdown"),N(ie,"id","the-numbers-behind-the-map"),N(ce,"class","markdown"),N(ae,"class","markdown"),N(ae,"id","honest-caveats"),N(me,"class","markdown"),N(pe,"class","markdown"),N(pe,"id","where-next"),N(ke,"class","markdown"),N(Ce,"class","markdown")},m(t,u){Ee&&Ee.m(t,u),d(t,a,u),Qe.m(document.head,null),je(document.head,r),je(document.head,e),Be&&Be.m(document.head,null),je(document.head,n),d(t,i,u),R(m,t,u),d(t,s,u),d(t,y,u),d(t,b,u),d(t,l,u),d(t,f,u),R(_,t,u),d(t,A,u),R(x,t,u),d(t,q,u),R(U,t,u),d(t,p,u),R(C,t,u),d(t,oe,u),Q&&Q.m(t,u),d(t,Z,u),Ue[O].m(t,u),d(t,E,u),K&&K.m(t,u),d(t,D,u),F&&F.m(t,u),d(t,be,u),W&&W.m(t,u),d(t,we,u),R(te,t,u),d(t,le,u),d(t,ne,u),je(ne,De),je(ne,Ne),je(ne,ue),d(t,de,u),d(t,ie,u),d(t,Se,u),Y&&Y.m(t,u),d(t,ye,u),G&&G.m(t,u),d(t,se,u),Te[H].m(t,u),d(t,ve,u),d(t,ce,u),d(t,he,u),d(t,ae,u),d(t,qe,u),d(t,me,u),d(t,We,u),d(t,pe,u),d(t,Pe,u),d(t,ke,u),d(t,$e,u),d(t,Ce,u),d(t,fe,u),R(ge,t,u),Ze=!0},p(t,u){typeof T<"u"&&T.title&&T.hide_title!==!0&&Ee.p(t,u),Qe.p(t,u),typeof T=="object"&&Be.p(t,u);const Ie={};u[1]&134217728&&(Ie.$$scope={dirty:u,ctx:t}),_.$set(Ie);const oa={};u[1]&134217728&&(oa.$$scope={dirty:u,ctx:t}),C.$set(oa),t[2]?Q?u[0]&4&&g(Q,1):(Q=ha(t),Q.c(),g(Q,1),Q.m(Z.parentNode,Z)):Q&&(Le(),w(Q,1,1,()=>{Q=null}),ze());let Xe=O;O=na(t),O!==Xe&&(Le(),w(Ue[Xe],1,1,()=>{Ue[Xe]=null}),ze(),j=Ue[O],j||(j=Ue[O]=ra[O](t),j.c()),g(j,1),j.m(E.parentNode,E)),t[3]?K?(K.p(t,u),u[0]&8&&g(K,1)):(K=ma(t),K.c(),g(K,1),K.m(D.parentNode,D)):K&&(Le(),w(K,1,1,()=>{K=null}),ze()),t[4]?F?(F.p(t,u),u[0]&16&&g(F,1)):(F=_a(t),F.c(),g(F,1),F.m(be.parentNode,be)):F&&(Le(),w(F,1,1,()=>{F=null}),ze()),t[5]?W?(W.p(t,u),u[0]&32&&g(W,1)):(W=ua(t),W.c(),g(W,1),W.m(we.parentNode,we)):W&&(Le(),w(W,1,1,()=>{W=null}),ze());const Ae={};u[0]&44&&(Ae.data=t[2]?t[5]:t[3]),u[0]&1024&&(Ae.geoJsonUrl=t[10]),u[0]&2&&(Ae.value=t[1]==="status_class"?"stage_label":t[1]),u[0]&2&&(Ae.legendType=t[1]==="status_class"?"categorical":"scalar"),u[0]&46&&(Ae.colorPalette=t[1]==="status_class"?t[12](t[2]?t[5]:t[3]):void 0),u[0]&2049&&(Ae.title="Berlin "+t[13][t[0].area_level.value]+" — "+t[11]+", latest period"),u[0]&512&&(Ae.tooltip=t[9]),te.$set(Ae),(!Ze||u[0]&4)&&xe!==(xe=t[2]?"profile":"neighbourhood")&&ka(Ne,xe),t[6]?Y?(Y.p(t,u),u[0]&64&&g(Y,1)):(Y=pa(t),Y.c(),g(Y,1),Y.m(ye.parentNode,ye)):Y&&(Le(),w(Y,1,1,()=>{Y=null}),ze()),t[7]?G?(G.p(t,u),u[0]&128&&g(G,1)):(G=fa(t),G.c(),g(G,1),G.m(se.parentNode,se)):G&&(Le(),w(G,1,1,()=>{G=null}),ze());let ea=H;H=sa(t),H===ea?Te[H].p(t,u):(Le(),w(Te[ea],1,1,()=>{Te[ea]=null}),ze(),V=Te[H],V?V.p(t,u):(V=Te[H]=ia[H](t),V.c()),g(V,1),V.m(ve.parentNode,ve))},i(t){Ze||(g(m.$$.fragment,t),g(_.$$.fragment,t),g(x.$$.fragment,t),g(U.$$.fragment,t),g(C.$$.fragment,t),g(Q),g(j),g(K),g(F),g(W),g(te.$$.fragment,t),g(Y),g(G),g(V),g(ge.$$.fragment,t),Ze=!0)},o(t){w(m.$$.fragment,t),w(_.$$.fragment,t),w(x.$$.fragment,t),w(U.$$.fragment,t),w(C.$$.fragment,t),w(Q),w(j),w(K),w(F),w(W),w(te.$$.fragment,t),w(Y),w(G),w(V),w(ge.$$.fragment,t),Ze=!1},d(t){t&&(o(a),o(i),o(s),o(y),o(b),o(l),o(f),o(A),o(q),o(p),o(oe),o(Z),o(E),o(D),o(be),o(we),o(le),o(ne),o(de),o(ie),o(Se),o(ye),o(se),o(ve),o(ce),o(he),o(ae),o(qe),o(me),o(We),o(pe),o(Pe),o(ke),o($e),o(Ce),o(fe)),Ee&&Ee.d(t),Qe.d(t),o(r),o(e),Be&&Be.d(t),o(n),B(m,t),B(_,t),B(x,t),B(U,t),B(C,t),Q&&Q.d(t),Ue[O].d(t),K&&K.d(t),F&&F.d(t),W&&W.d(t),B(te,t),Y&&Y.d(t),G&&G.d(t),Te[H].d(t),B(ge,t)}}}const T={title:"Maps — gentrification stages by area"},ot="#f0f0f0";function lt(h,a,r){let e,n,i,m,s,y,c;la(h,Ia,P=>r(40,y=P)),la(h,ca,P=>r(45,c=P));let{data:b}=a,{data:l={},customFormattingSettings:$,__db:f,inputs:_}=b;$a(ca,c="58e4d6dd5ac3a303a1d759de3fdf1f19",c);let A=Aa(Ta(_));Ea(A.subscribe(P=>r(0,_=P))),Ba(Ua,{getCustomFormats:()=>$.customFormats||[]});const x=(P,$e)=>ja(f.query,P,{query_name:$e});Da(x),y.params,Ra(()=>!0);let q={initialData:void 0,initialError:void 0},U=_e`-- #358: stage_label / stage_number come straight from gentrification_index (dbt macro
-- typology_stage_display, docs/epic-g/358-spec.md §1) -- the page no longer carries its own
-- label CASE or a "severity" sort. Rows are ordered by cycle position (stage_number, NULLs last)
-- so the first-occurrence order of distinct stage_label values -- what presentStagePalette()
-- above and PolygonMap's positional colour rule key on -- is the legend order 1..6, then
-- "No stage on record". stage_note adds "(uninhabited)" to the tooltip only where the PLR has no
-- stage and a population of 0 (spec §1, C2).
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    case
        when stage_number is null and population = 0 then '(uninhabited)'
        else ''
    end as stage_note,
    -- Drill-down click-through target (#133 G1d, exact-code fix #150): /berlin/area/[code]
    -- queries fct_gentrification_change etc. on lor_2021 (current, 542-PLR) area codes, which
    -- this \`live_data\`/\`plr\` query always returns -- see #309 for why the \`standard\` variant
    -- (pre-2021 codes, no click-through) no longer appears on this page at all.
    '${Re}/berlin/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`,p=`-- #358: stage_label / stage_number come straight from gentrification_index (dbt macro
-- typology_stage_display, docs/epic-g/358-spec.md §1) -- the page no longer carries its own
-- label CASE or a "severity" sort. Rows are ordered by cycle position (stage_number, NULLs last)
-- so the first-occurrence order of distinct stage_label values -- what presentStagePalette()
-- above and PolygonMap's positional colour rule key on -- is the legend order 1..6, then
-- "No stage on record". stage_note adds "(uninhabited)" to the tooltip only where the PLR has no
-- stage and a population of 0 (spec §1, C2).
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    case
        when stage_number is null and population = 0 then '(uninhabited)'
        else ''
    end as stage_note,
    -- Drill-down click-through target (#133 G1d, exact-code fix #150): /berlin/area/[code]
    -- queries fct_gentrification_change etc. on lor_2021 (current, 542-PLR) area codes, which
    -- this \`live_data\`/\`plr\` query always returns -- see #309 for why the \`standard\` variant
    -- (pre-2021 codes, no click-through) no longer appears on this page at all.
    '${Re}/berlin/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`;l.areas_plr_data&&(l.areas_plr_data instanceof Error?q.initialError=l.areas_plr_data:q.initialData=l.areas_plr_data,l.areas_plr_columns&&(q.knownColumns=l.areas_plr_columns));let C,oe=!1;const Z=Ye.createReactive({callback:P=>{r(3,C=P)},execFn:x},{id:"areas_plr",...q});Z(p,{noResolve:U,...q}),globalThis[Symbol.for("areas_plr")]={get value(){return C}};let O={initialData:void 0,initialError:void 0},j=_e`-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)`,E=`-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)`;l.bezirk_names_data&&(l.bezirk_names_data instanceof Error?O.initialError=l.bezirk_names_data:O.initialData=l.bezirk_names_data,l.bezirk_names_columns&&(O.knownColumns=l.bezirk_names_columns));let D,be=!1;const we=Ye.createReactive({callback:P=>{r(4,D=P)},execFn:x},{id:"bezirk_names",...O});we(E,{noResolve:j,...O}),globalThis[Symbol.for("bezirk_names")]={get value(){return D}};let te={initialData:void 0,initialError:void 0},le=_e`-- One row per rollup area (bezirk/pgr/ortsteil), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean, n_habitable_children,
-- is_dominant_fragile and has_incomplete_population are all CONSTANT across an area's stage rows
-- (see that mart's header), so any single row carries them; the row itself is not otherwise used
-- (the "Stage mix" table further down this page queries the full per-stage grain separately).
--
-- #310 review fix (MEDIUM-A): area_name falls back to the shared Bezirk-name lookup block above
-- (see that block's header comment; referenced by name in the actual \`left join\` below) wherever
-- the mart's own area_name is NULL -- every Bezirk row, since dim_area carries no bezirk-level
-- rows. At PGR/Ortsteil grain the mart's area_name is always populated, so the left join below is
-- a no-op there (no PGR/Ortsteil code ever matches a '01'..'12' Bezirk code).
--
-- NB: this comment deliberately avoids spelling out the lookup block's interpolation token in
-- prose (see the \`bezirk_names\` block's own header comment for why -- doing so would textually
-- substitute the lookup's entire compiled SQL into the middle of THIS single-line comment,
-- breaking out of the comment and corrupting the query, exactly as it would for a self-reference).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; Dangschat's invasion
-- phase plus the Döring/Ulbricht vulnerability case) from the mart's own per-(area, typology_stage) grain -- a plain aggregate
-- over already-published mix rows, no mart change, permitted under the standing #267 domain
-- decision's Recommendation 4 ("share of PLRs in active-gentrification typology" is an explicitly
-- allowed composition statistic). Filtering to one (city, level, period, variant) before grouping
-- by area_code cannot double-count, since that combination plus typology_stage is this mart's
-- natural key.
--
-- NB: the mart is SPARSE, not padded to all six stages per area (\`stage_agg\` there groups by
-- observed \`typology_stage\` only) -- so \`sum(...) filter (where stage_number between 2 and 4)\` returns
-- NULL, not 0, for an area with real habitable children but none in stages 2-4 (zero matching
-- rows to sum). \`stages_2_4_share_raw\` is therefore coalesced to 0 in \`base\` below, but ONLY when
-- the area has at least one habitable child -- an orphan area (n_habitable_children = 0) keeps a
-- genuine NULL, matching dominant_share's own convention.
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    ),
    base as (
        select
            m.city_code,
            m.area_code,
            coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
            m.status_index_weighted_mean as status_index,
            m.dynamism_index_weighted_mean as dynamism_index,
            -- dominant_stage as status_class kept for shape symmetry with \`areas_plr\`'s
            -- status_class column (not otherwise consumed downstream at this grain -- the map/
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
            -- #358: dbt display columns (typology_stage_display), no page-side CASE.
            m.dominant_stage_label as stage_label,
            m.dominant_stage_number as stage_number,
            -- #310 review fix (MEDIUM-4): pairs the dominant-stage reading with an explicit
            -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment
            -- point 3) this must never be shown as a standalone, confident-looking label. Blank
            -- ('') rather than NULL when not fragile, so the tooltip line renders empty instead
            -- of a formatted "-" placeholder.
            case
                when m.is_dominant_fragile
                then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
                else ''
            end as fragile_note,
            -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit
            -- caveat whenever the weighting silently degraded to equal-weight for this area (see
            -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / MEDIUM-C fix: whenever this flag
            -- is true, the mart now equal-weights EVERY child in the area consistently -- never a
            -- silent partial-coverage mix of weighting schemes within the same area).
            case
                when m.has_incomplete_population
                then 'Population data incomplete for this area — equal-weighted, not population-weighted'
                else ''
            end as population_note,
            -- Rollup profile pages (all pre-existing routes): /berlin/area/<level>/<code>.
            '${Re}/berlin/area/${_.area_level.value}/' || m.area_code as link
        from gentriduck_marts.mart_area_rollup_stage_mix as m
        left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
        left join stages_2_4 as a on m.area_code = a.area_code
        where m.area_level = '${_.area_level.value}'
          and m.city_code = 'BER'
          -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
          -- defends against a future second variant silently duplicating rows here.
          and m.variant = 'live_data'
          and m.period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
    )
select *
from base
order by stage_number nulls last, area_name, area_code`,ne=`-- One row per rollup area (bezirk/pgr/ortsteil), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean, n_habitable_children,
-- is_dominant_fragile and has_incomplete_population are all CONSTANT across an area's stage rows
-- (see that mart's header), so any single row carries them; the row itself is not otherwise used
-- (the "Stage mix" table further down this page queries the full per-stage grain separately).
--
-- #310 review fix (MEDIUM-A): area_name falls back to the shared Bezirk-name lookup block above
-- (see that block's header comment; referenced by name in the actual \`left join\` below) wherever
-- the mart's own area_name is NULL -- every Bezirk row, since dim_area carries no bezirk-level
-- rows. At PGR/Ortsteil grain the mart's area_name is always populated, so the left join below is
-- a no-op there (no PGR/Ortsteil code ever matches a '01'..'12' Bezirk code).
--
-- NB: this comment deliberately avoids spelling out the lookup block's interpolation token in
-- prose (see the \`bezirk_names\` block's own header comment for why -- doing so would textually
-- substitute the lookup's entire compiled SQL into the middle of THIS single-line comment,
-- breaking out of the comment and corrupting the query, exactly as it would for a self-reference).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; Dangschat's invasion
-- phase plus the Döring/Ulbricht vulnerability case) from the mart's own per-(area, typology_stage) grain -- a plain aggregate
-- over already-published mix rows, no mart change, permitted under the standing #267 domain
-- decision's Recommendation 4 ("share of PLRs in active-gentrification typology" is an explicitly
-- allowed composition statistic). Filtering to one (city, level, period, variant) before grouping
-- by area_code cannot double-count, since that combination plus typology_stage is this mart's
-- natural key.
--
-- NB: the mart is SPARSE, not padded to all six stages per area (\`stage_agg\` there groups by
-- observed \`typology_stage\` only) -- so \`sum(...) filter (where stage_number between 2 and 4)\` returns
-- NULL, not 0, for an area with real habitable children but none in stages 2-4 (zero matching
-- rows to sum). \`stages_2_4_share_raw\` is therefore coalesced to 0 in \`base\` below, but ONLY when
-- the area has at least one habitable child -- an orphan area (n_habitable_children = 0) keeps a
-- genuine NULL, matching dominant_share's own convention.
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    ),
    base as (
        select
            m.city_code,
            m.area_code,
            coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
            m.status_index_weighted_mean as status_index,
            m.dynamism_index_weighted_mean as dynamism_index,
            -- dominant_stage as status_class kept for shape symmetry with \`areas_plr\`'s
            -- status_class column (not otherwise consumed downstream at this grain -- the map/
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
            -- #358: dbt display columns (typology_stage_display), no page-side CASE.
            m.dominant_stage_label as stage_label,
            m.dominant_stage_number as stage_number,
            -- #310 review fix (MEDIUM-4): pairs the dominant-stage reading with an explicit
            -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment
            -- point 3) this must never be shown as a standalone, confident-looking label. Blank
            -- ('') rather than NULL when not fragile, so the tooltip line renders empty instead
            -- of a formatted "-" placeholder.
            case
                when m.is_dominant_fragile
                then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
                else ''
            end as fragile_note,
            -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit
            -- caveat whenever the weighting silently degraded to equal-weight for this area (see
            -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / MEDIUM-C fix: whenever this flag
            -- is true, the mart now equal-weights EVERY child in the area consistently -- never a
            -- silent partial-coverage mix of weighting schemes within the same area).
            case
                when m.has_incomplete_population
                then 'Population data incomplete for this area — equal-weighted, not population-weighted'
                else ''
            end as population_note,
            -- Rollup profile pages (all pre-existing routes): /berlin/area/<level>/<code>.
            '${Re}/berlin/area/${_.area_level.value}/' || m.area_code as link
        from gentriduck_marts.mart_area_rollup_stage_mix as m
        left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
        left join stages_2_4 as a on m.area_code = a.area_code
        where m.area_level = '${_.area_level.value}'
          and m.city_code = 'BER'
          -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
          -- defends against a future second variant silently duplicating rows here.
          and m.variant = 'live_data'
          and m.period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
    )
select *
from base
order by stage_number nulls last, area_name, area_code`;l.areas_rollup_data&&(l.areas_rollup_data instanceof Error?te.initialError=l.areas_rollup_data:te.initialData=l.areas_rollup_data,l.areas_rollup_columns&&(te.knownColumns=l.areas_rollup_columns));let De,xe=!1;const Ne=Ye.createReactive({callback:P=>{r(5,De=P)},execFn:x},{id:"areas_rollup",...te});Ne(ne,{noResolve:le,...te}),globalThis[Symbol.for("areas_rollup")]={get value(){return De}};let ue={initialData:void 0,initialError:void 0},de=_e`-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
select
    area_name,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`,ie=`-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
select
    area_name,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`;l.area_table_plr_data&&(l.area_table_plr_data instanceof Error?ue.initialError=l.area_table_plr_data:ue.initialData=l.area_table_plr_data,l.area_table_plr_columns&&(ue.knownColumns=l.area_table_plr_columns));let He,Se=!1;const ye=Ye.createReactive({callback:P=>{r(6,He=P)},execFn:x},{id:"area_table_plr",...ue});ye(ie,{noResolve:de,...ue}),globalThis[Symbol.for("area_table_plr")]={get value(){return He}};let se={initialData:void 0,initialError:void 0},H=_e`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (see that block's header comment; referenced by name in the actual \`left join\`
-- below) instead of duplicating the Bezirk code -> name CTE here -- not the raw (NULL-for-Bezirk)
-- mart column.
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; same construction
-- as the \`areas_rollup\` query above -- see that block's header comment for the full rationale/citation) so the composition
-- counterweight is available in this table too, not just the map tooltip.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index desc\`. Ranking a citywide table by a population-weighted MEAN of an
-- ordinal class code is exactly the "presented, coloured, or ordered" construct the standing #267
-- domain decision forbids for a coarse scalar -- order by area_name instead (matches the
-- Stage-mix table below). status_index/dynamism_index remain visible as informational columns
-- (see the Column titles below, per the geo-DS's C1: "mean ordinal class (mean rank)", not a
-- score -- #310 review fix D2-R2: population-weighted where population data is complete and
-- equal-weighted otherwise, not unconditionally) -- keeping the mart's diagnostic columns
-- available is exactly what D1 remedy (a) intends; only the map-colour/rank uses are removed.
--
-- NB: see \`areas_rollup\`'s own header comment above for why \`stages_2_4_share_raw\` is coalesced
-- to 0 below only when the area has at least one habitable child (the mart is sparse -- a filtered
-- SUM over zero matching rows is NULL, not 0).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where
          area_level = '${_.area_level.value}' and city_code = 'BER'
          and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`,V=`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (see that block's header comment; referenced by name in the actual \`left join\`
-- below) instead of duplicating the Bezirk code -> name CTE here -- not the raw (NULL-for-Bezirk)
-- mart column.
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; same construction
-- as the \`areas_rollup\` query above -- see that block's header comment for the full rationale/citation) so the composition
-- counterweight is available in this table too, not just the map tooltip.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index desc\`. Ranking a citywide table by a population-weighted MEAN of an
-- ordinal class code is exactly the "presented, coloured, or ordered" construct the standing #267
-- domain decision forbids for a coarse scalar -- order by area_name instead (matches the
-- Stage-mix table below). status_index/dynamism_index remain visible as informational columns
-- (see the Column titles below, per the geo-DS's C1: "mean ordinal class (mean rank)", not a
-- score -- #310 review fix D2-R2: population-weighted where population data is complete and
-- equal-weighted otherwise, not unconditionally) -- keeping the mart's diagnostic columns
-- available is exactly what D1 remedy (a) intends; only the map-colour/rank uses are removed.
--
-- NB: see \`areas_rollup\`'s own header comment above for why \`stages_2_4_share_raw\` is coalesced
-- to 0 below only when the area has at least one habitable child (the mart is sparse -- a filtered
-- SUM over zero matching rows is NULL, not 0).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where
          area_level = '${_.area_level.value}' and city_code = 'BER'
          and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`;l.area_table_rollup_data&&(l.area_table_rollup_data instanceof Error?se.initialError=l.area_table_rollup_data:se.initialData=l.area_table_rollup_data,l.area_table_rollup_columns&&(se.knownColumns=l.area_table_rollup_columns));let ve,ce=!1;const Ke=Ye.createReactive({callback:P=>{r(7,ve=P)},execFn:x},{id:"area_table_rollup",...se});Ke(V,{noResolve:H,...se}),globalThis[Symbol.for("area_table_rollup")]={get value(){return ve}};let he={initialData:void 0,initialError:void 0},ae=_e`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (referenced by name in the actual \`left join\` below), left-joined directly onto the
-- mart's full per-stage grain -- not this mart's raw (NULL-for-Bezirk) area_name column --
-- otherwise both this table's Bezirk rows AND its \`order by area_name\` degenerate to
-- blank/undefined for all 12 Bezirke.
--
-- #310 review fix (R-310-1): stage_label de-jargons m.typology_stage with the exact same
-- stage-name mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level and those can
-- have different has_incomplete_population values.
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.stage_label,
    m.stage_population_share,
    m.stage_n_children,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'BER' and variant = 'live_data'
  )
order by area_name, m.stage_number nulls last`,Me=`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (referenced by name in the actual \`left join\` below), left-joined directly onto the
-- mart's full per-stage grain -- not this mart's raw (NULL-for-Bezirk) area_name column --
-- otherwise both this table's Bezirk rows AND its \`order by area_name\` degenerate to
-- blank/undefined for all 12 Bezirke.
--
-- #310 review fix (R-310-1): stage_label de-jargons m.typology_stage with the exact same
-- stage-name mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level and those can
-- have different has_incomplete_population values.
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.stage_label,
    m.stage_population_share,
    m.stage_n_children,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'BER' and variant = 'live_data'
  )
order by area_name, m.stage_number nulls last`;l.area_mix_table_data&&(l.area_mix_table_data instanceof Error?he.initialError=l.area_mix_table_data:he.initialData=l.area_mix_table_data,l.area_mix_table_columns&&(he.knownColumns=l.area_mix_table_columns));let qe,me=!1;const Fe=Ye.createReactive({callback:P=>{r(8,qe=P)},execFn:x},{id:"area_mix_table",...he});Fe(Me,{noResolve:ae,...he}),globalThis[Symbol.for("area_mix_table")]={get value(){return qe}};const We={1:"#bddf26",2:"#5ec962",3:"#21918c",4:"#31688e",5:"#482878",6:"#bdbdbd"};function pe(P){const $e=new Set,Ce=[];for(const fe of P??[]){const ge=fe==null?void 0:fe.stage_label;ge==null||$e.has(ge)||($e.add(ge),Ce.push(We[fe==null?void 0:fe.stage_number]??ot))}return Ce}const Ve={status_class:"Gentrification stage",status_index:"Social status",dynamism_index:"Dynamism"},Pe={plr:"plr_live_data.geojson",pgr:"pgr_lor2021.geojson",bezirk:"bezirk_lor2021.geojson",ortsteil:"ortsteil_self.geojson"},ke={plr:"Planungsraum (PLR)",pgr:"Prognoseraum (PGR)",bezirk:"Bezirk",ortsteil:"Ortsteil"};return h.$$set=P=>{"data"in P&&r(14,b=P.data)},h.$$.update=()=>{h.$$.dirty[0]&16384&&r(15,{data:l={},customFormattingSettings:$,__db:f}=b,l),h.$$.dirty[0]&32768&&Pa.set(Object.keys(l).length>0),h.$$.dirty[1]&512&&y.params,h.$$.dirty[0]&983040&&(U||!oe?U||(Z(p,{noResolve:U,...q}),r(19,oe=!0)):Z(p,{noResolve:U})),h.$$.dirty[0]&15728640&&(j||!be?j||(we(E,{noResolve:j,...O}),r(23,be=!0)):we(E,{noResolve:j})),h.$$.dirty[0]&1&&r(25,le=_e`-- One row per rollup area (bezirk/pgr/ortsteil), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean, n_habitable_children,
-- is_dominant_fragile and has_incomplete_population are all CONSTANT across an area's stage rows
-- (see that mart's header), so any single row carries them; the row itself is not otherwise used
-- (the "Stage mix" table further down this page queries the full per-stage grain separately).
--
-- #310 review fix (MEDIUM-A): area_name falls back to the shared Bezirk-name lookup block above
-- (see that block's header comment; referenced by name in the actual \`left join\` below) wherever
-- the mart's own area_name is NULL -- every Bezirk row, since dim_area carries no bezirk-level
-- rows. At PGR/Ortsteil grain the mart's area_name is always populated, so the left join below is
-- a no-op there (no PGR/Ortsteil code ever matches a '01'..'12' Bezirk code).
--
-- NB: this comment deliberately avoids spelling out the lookup block's interpolation token in
-- prose (see the \`bezirk_names\` block's own header comment for why -- doing so would textually
-- substitute the lookup's entire compiled SQL into the middle of THIS single-line comment,
-- breaking out of the comment and corrupting the query, exactly as it would for a self-reference).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; Dangschat's invasion
-- phase plus the Döring/Ulbricht vulnerability case) from the mart's own per-(area, typology_stage) grain -- a plain aggregate
-- over already-published mix rows, no mart change, permitted under the standing #267 domain
-- decision's Recommendation 4 ("share of PLRs in active-gentrification typology" is an explicitly
-- allowed composition statistic). Filtering to one (city, level, period, variant) before grouping
-- by area_code cannot double-count, since that combination plus typology_stage is this mart's
-- natural key.
--
-- NB: the mart is SPARSE, not padded to all six stages per area (\`stage_agg\` there groups by
-- observed \`typology_stage\` only) -- so \`sum(...) filter (where stage_number between 2 and 4)\` returns
-- NULL, not 0, for an area with real habitable children but none in stages 2-4 (zero matching
-- rows to sum). \`stages_2_4_share_raw\` is therefore coalesced to 0 in \`base\` below, but ONLY when
-- the area has at least one habitable child -- an orphan area (n_habitable_children = 0) keeps a
-- genuine NULL, matching dominant_share's own convention.
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    ),
    base as (
        select
            m.city_code,
            m.area_code,
            coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
            m.status_index_weighted_mean as status_index,
            m.dynamism_index_weighted_mean as dynamism_index,
            -- dominant_stage as status_class kept for shape symmetry with \`areas_plr\`'s
            -- status_class column (not otherwise consumed downstream at this grain -- the map/
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
            -- #358: dbt display columns (typology_stage_display), no page-side CASE.
            m.dominant_stage_label as stage_label,
            m.dominant_stage_number as stage_number,
            -- #310 review fix (MEDIUM-4): pairs the dominant-stage reading with an explicit
            -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment
            -- point 3) this must never be shown as a standalone, confident-looking label. Blank
            -- ('') rather than NULL when not fragile, so the tooltip line renders empty instead
            -- of a formatted "-" placeholder.
            case
                when m.is_dominant_fragile
                then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
                else ''
            end as fragile_note,
            -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit
            -- caveat whenever the weighting silently degraded to equal-weight for this area (see
            -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / MEDIUM-C fix: whenever this flag
            -- is true, the mart now equal-weights EVERY child in the area consistently -- never a
            -- silent partial-coverage mix of weighting schemes within the same area).
            case
                when m.has_incomplete_population
                then 'Population data incomplete for this area — equal-weighted, not population-weighted'
                else ''
            end as population_note,
            -- Rollup profile pages (all pre-existing routes): /berlin/area/<level>/<code>.
            '${Re}/berlin/area/${_.area_level.value}/' || m.area_code as link
        from gentriduck_marts.mart_area_rollup_stage_mix as m
        left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
        left join stages_2_4 as a on m.area_code = a.area_code
        where m.area_level = '${_.area_level.value}'
          and m.city_code = 'BER'
          -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
          -- defends against a future second variant silently duplicating rows here.
          and m.variant = 'live_data'
          and m.period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
    )
select *
from base
order by stage_number nulls last, area_name, area_code`),h.$$.dirty[0]&1&&r(26,ne=`-- One row per rollup area (bezirk/pgr/ortsteil), picked deterministically from
-- mart_area_rollup_stage_mix's per-(area, typology_stage) grain via QUALIFY -- dominant_stage,
-- dominant_share, status_index_weighted_mean, dynamism_index_weighted_mean, n_habitable_children,
-- is_dominant_fragile and has_incomplete_population are all CONSTANT across an area's stage rows
-- (see that mart's header), so any single row carries them; the row itself is not otherwise used
-- (the "Stage mix" table further down this page queries the full per-stage grain separately).
--
-- #310 review fix (MEDIUM-A): area_name falls back to the shared Bezirk-name lookup block above
-- (see that block's header comment; referenced by name in the actual \`left join\` below) wherever
-- the mart's own area_name is NULL -- every Bezirk row, since dim_area carries no bezirk-level
-- rows. At PGR/Ortsteil grain the mart's area_name is always populated, so the left join below is
-- a no-op there (no PGR/Ortsteil code ever matches a '01'..'12' Bezirk code).
--
-- NB: this comment deliberately avoids spelling out the lookup block's interpolation token in
-- prose (see the \`bezirk_names\` block's own header comment for why -- doing so would textually
-- substitute the lookup's entire compiled SQL into the middle of THIS single-line comment,
-- breaking out of the comment and corrupting the query, exactly as it would for a self-reference).
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; Dangschat's invasion
-- phase plus the Döring/Ulbricht vulnerability case) from the mart's own per-(area, typology_stage) grain -- a plain aggregate
-- over already-published mix rows, no mart change, permitted under the standing #267 domain
-- decision's Recommendation 4 ("share of PLRs in active-gentrification typology" is an explicitly
-- allowed composition statistic). Filtering to one (city, level, period, variant) before grouping
-- by area_code cannot double-count, since that combination plus typology_stage is this mart's
-- natural key.
--
-- NB: the mart is SPARSE, not padded to all six stages per area (\`stage_agg\` there groups by
-- observed \`typology_stage\` only) -- so \`sum(...) filter (where stage_number between 2 and 4)\` returns
-- NULL, not 0, for an area with real habitable children but none in stages 2-4 (zero matching
-- rows to sum). \`stages_2_4_share_raw\` is therefore coalesced to 0 in \`base\` below, but ONLY when
-- the area has at least one habitable child -- an orphan area (n_habitable_children = 0) keeps a
-- genuine NULL, matching dominant_share's own convention.
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    ),
    base as (
        select
            m.city_code,
            m.area_code,
            coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
            m.status_index_weighted_mean as status_index,
            m.dynamism_index_weighted_mean as dynamism_index,
            -- dominant_stage as status_class kept for shape symmetry with \`areas_plr\`'s
            -- status_class column (not otherwise consumed downstream at this grain -- the map/
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
            -- #358: dbt display columns (typology_stage_display), no page-side CASE.
            m.dominant_stage_label as stage_label,
            m.dominant_stage_number as stage_number,
            -- #310 review fix (MEDIUM-4): pairs the dominant-stage reading with an explicit
            -- caveat whenever is_dominant_fragile -- per the #310 design decision (issue comment
            -- point 3) this must never be shown as a standalone, confident-looking label. Blank
            -- ('') rather than NULL when not fragile, so the tooltip line renders empty instead
            -- of a formatted "-" placeholder.
            case
                when m.is_dominant_fragile
                then 'Small sample — fewer than 3 constituent areas, most-widespread-stage reading may not be robust'
                else ''
            end as fragile_note,
            -- #310 review fix (MEDIUM-3): pairs the "population-weighted" claim with an explicit
            -- caveat whenever the weighting silently degraded to equal-weight for this area (see
            -- mart_area_rollup_stage_mix's own WEIGHTING NOTE / MEDIUM-C fix: whenever this flag
            -- is true, the mart now equal-weights EVERY child in the area consistently -- never a
            -- silent partial-coverage mix of weighting schemes within the same area).
            case
                when m.has_incomplete_population
                then 'Population data incomplete for this area — equal-weighted, not population-weighted'
                else ''
            end as population_note,
            -- Rollup profile pages (all pre-existing routes): /berlin/area/<level>/<code>.
            '${Re}/berlin/area/${_.area_level.value}/' || m.area_code as link
        from gentriduck_marts.mart_area_rollup_stage_mix as m
        left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
        left join stages_2_4 as a on m.area_code = a.area_code
        where m.area_level = '${_.area_level.value}'
          and m.city_code = 'BER'
          -- #310 review fix (LOW-6): explicit even though the mart is currently single-variant --
          -- defends against a future second variant silently duplicating rows here.
          and m.variant = 'live_data'
          and m.period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
    )
select *
from base
order by stage_number nulls last, area_name, area_code`),h.$$.dirty[0]&251658240&&(le||!xe?le||(Ne(ne,{noResolve:le,...te}),r(27,xe=!0)):Ne(ne,{noResolve:le})),h.$$.dirty[0]&1879048192|h.$$.dirty[1]&1&&(de||!Se?de||(ye(ie,{noResolve:de,...ue}),r(31,Se=!0)):ye(ie,{noResolve:de})),h.$$.dirty[0]&1&&r(33,H=_e`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (see that block's header comment; referenced by name in the actual \`left join\`
-- below) instead of duplicating the Bezirk code -> name CTE here -- not the raw (NULL-for-Bezirk)
-- mart column.
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; same construction
-- as the \`areas_rollup\` query above -- see that block's header comment for the full rationale/citation) so the composition
-- counterweight is available in this table too, not just the map tooltip.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index desc\`. Ranking a citywide table by a population-weighted MEAN of an
-- ordinal class code is exactly the "presented, coloured, or ordered" construct the standing #267
-- domain decision forbids for a coarse scalar -- order by area_name instead (matches the
-- Stage-mix table below). status_index/dynamism_index remain visible as informational columns
-- (see the Column titles below, per the geo-DS's C1: "mean ordinal class (mean rank)", not a
-- score -- #310 review fix D2-R2: population-weighted where population data is complete and
-- equal-weighted otherwise, not unconditionally) -- keeping the mart's diagnostic columns
-- available is exactly what D1 remedy (a) intends; only the map-colour/rank uses are removed.
--
-- NB: see \`areas_rollup\`'s own header comment above for why \`stages_2_4_share_raw\` is coalesced
-- to 0 below only when the area has at least one habitable child (the mart is sparse -- a filtered
-- SUM over zero matching rows is NULL, not 0).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where
          area_level = '${_.area_level.value}' and city_code = 'BER'
          and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`),h.$$.dirty[0]&1&&r(34,V=`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (see that block's header comment; referenced by name in the actual \`left join\`
-- below) instead of duplicating the Bezirk code -> name CTE here -- not the raw (NULL-for-Bezirk)
-- mart column.
--
-- #310 review fix (D4 -- domain sign-off blocking): \`stages_2_4\` (#358: formerly \`acute\`) sums
-- stage_population_share over stage_number 2-4 (improving-vulnerable, pioneer-signal,
-- active-gentrification -- the same three typology_stage values as before; same construction
-- as the \`areas_rollup\` query above -- see that block's header comment for the full rationale/citation) so the composition
-- counterweight is available in this table too, not just the map tooltip.
--
-- #310 review fix (D1/C1 -- domain sign-off section (b)): this table no longer
-- \`order by dynamism_index desc\`. Ranking a citywide table by a population-weighted MEAN of an
-- ordinal class code is exactly the "presented, coloured, or ordered" construct the standing #267
-- domain decision forbids for a coarse scalar -- order by area_name instead (matches the
-- Stage-mix table below). status_index/dynamism_index remain visible as informational columns
-- (see the Column titles below, per the geo-DS's C1: "mean ordinal class (mean rank)", not a
-- score -- #310 review fix D2-R2: population-weighted where population data is complete and
-- equal-weighted otherwise, not unconditionally) -- keeping the mart's diagnostic columns
-- available is exactly what D1 remedy (a) intends; only the map-colour/rank uses are removed.
--
-- NB: see \`areas_rollup\`'s own header comment above for why \`stages_2_4_share_raw\` is coalesced
-- to 0 below only when the area has at least one habitable child (the mart is sparse -- a filtered
-- SUM over zero matching rows is NULL, not 0).
with
    stages_2_4 as (
        select
            area_code,
            sum(stage_population_share) filter (
                where stage_number between 2 and 4
            ) as stages_2_4_share_raw
        from gentriduck_marts.mart_area_rollup_stage_mix
        where area_level = '${_.area_level.value}'
          and city_code = 'BER'
          and variant = 'live_data'
          and period_yyyymm = (
              select max(period_yyyymm)
              from gentriduck_marts.mart_area_rollup_stage_mix
              where
                  area_level = '${_.area_level.value}' and city_code = 'BER'
                  and variant = 'live_data'
          )
        group by area_code
    )
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.status_index_weighted_mean as status_index,
    m.dynamism_index_weighted_mean as dynamism_index,
    m.dominant_share,
    case
        when m.n_habitable_children = 0 then null
        else coalesce(a.stages_2_4_share_raw, 0)
    end as stages_2_4_share,
    m.n_habitable_children,
    m.is_dominant_fragile,
    m.has_incomplete_population,
    m.dominant_stage_label as stage_label
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
left join stages_2_4 as a on m.area_code = a.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where
          area_level = '${_.area_level.value}' and city_code = 'BER'
          and variant = 'live_data'
  )
qualify row_number() over (partition by m.area_code order by m.typology_stage) = 1
order by area_name`),h.$$.dirty[1]&30&&(H||!ce?H||(Ke(V,{noResolve:H,...se}),r(35,ce=!0)):Ke(V,{noResolve:H})),h.$$.dirty[0]&1&&r(37,ae=_e`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (referenced by name in the actual \`left join\` below), left-joined directly onto the
-- mart's full per-stage grain -- not this mart's raw (NULL-for-Bezirk) area_name column --
-- otherwise both this table's Bezirk rows AND its \`order by area_name\` degenerate to
-- blank/undefined for all 12 Bezirke.
--
-- #310 review fix (R-310-1): stage_label de-jargons m.typology_stage with the exact same
-- stage-name mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level and those can
-- have different has_incomplete_population values.
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.stage_label,
    m.stage_population_share,
    m.stage_n_children,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'BER' and variant = 'live_data'
  )
order by area_name, m.stage_number nulls last`),h.$$.dirty[0]&1&&r(38,Me=`-- #310 review fix (MEDIUM-A): area_name fallback via the shared Bezirk-name lookup block defined
-- once above (referenced by name in the actual \`left join\` below), left-joined directly onto the
-- mart's full per-stage grain -- not this mart's raw (NULL-for-Bezirk) area_name column --
-- otherwise both this table's Bezirk rows AND its \`order by area_name\` degenerate to
-- blank/undefined for all 12 Bezirke.
--
-- #310 review fix (R-310-1): stage_label de-jargons m.typology_stage with the exact same
-- stage-name mapping used everywhere else on this page -- the raw machine code (e.g.
-- 'active-gentrification') was previously shown verbatim here, the only table on the page that
-- did so. has_incomplete_population is added (D2) so this table -- unlike area_table_rollup above,
-- which has one row per area -- can disclose per-row whether THIS area's shares are population- or
-- equal-weighted, since a single mix table spans every area at the selected level and those can
-- have different has_incomplete_population values.
select
    coalesce(m.area_name, bn.bezirk_name, m.area_code) as area_name,
    m.stage_label,
    m.stage_population_share,
    m.stage_n_children,
    m.has_incomplete_population
from gentriduck_marts.mart_area_rollup_stage_mix as m
left join (-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)) as bn on m.area_code = bn.area_code
where m.area_level = '${_.area_level.value}'
  and m.city_code = 'BER'
  and m.variant = 'live_data'
  and m.period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.mart_area_rollup_stage_mix
      where area_level = '${_.area_level.value}' and city_code = 'BER' and variant = 'live_data'
  )
order by area_name, m.stage_number nulls last`),h.$$.dirty[1]&480&&(ae||!me?ae||(Fe(Me,{noResolve:ae,...he}),r(39,me=!0)):Fe(Me,{noResolve:ae})),h.$$.dirty[0]&1&&r(2,e=_.area_level.value!=="plr"),h.$$.dirty[0]&5&&r(1,n=e?"status_class":_.indicator.value),h.$$.dirty[0]&5&&r(11,i=e?"Gentrification stage — plain-language, colour-coded":_.indicator.label),h.$$.dirty[0]&1&&r(10,m=Pe[_.area_level.value]?`${Re}/geo/${Pe[_.area_level.value]}`:void 0),h.$$.dirty[0]&6&&r(9,s=e?[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:"stage_label",title:"Most widespread stage",fmt:"id"},{id:"dominant_share",title:"Most widespread stage's share",fmt:"pct0"},{id:"stages_2_4_share",title:"Share in stages 2–4",fmt:"pct0"},{id:"n_habitable_children",title:"Constituent areas with data",fmt:"id"},{id:"fragile_note",showColumnName:!1,valueClass:"text-xs text-amber-700",fmt:"id"},{id:"population_note",showColumnName:!1,valueClass:"text-xs text-amber-700",fmt:"id"},{id:"area_code",title:"Area code",valueClass:"text-xs opacity-60",fmt:"id"}]:[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:n==="status_class"?"stage_label":n,title:Ve[n],fmt:n==="status_class"?"id":"num1"},{id:"stage_note",showColumnName:!1,valueClass:"text-xs opacity-70",fmt:"id"},{id:"area_code",title:"Area code",valueClass:"text-xs opacity-60",fmt:"id"}])},r(17,U=_e`-- #358: stage_label / stage_number come straight from gentrification_index (dbt macro
-- typology_stage_display, docs/epic-g/358-spec.md §1) -- the page no longer carries its own
-- label CASE or a "severity" sort. Rows are ordered by cycle position (stage_number, NULLs last)
-- so the first-occurrence order of distinct stage_label values -- what presentStagePalette()
-- above and PolygonMap's positional colour rule key on -- is the legend order 1..6, then
-- "No stage on record". stage_note adds "(uninhabited)" to the tooltip only where the PLR has no
-- stage and a population of 0 (spec §1, C2).
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    case
        when stage_number is null and population = 0 then '(uninhabited)'
        else ''
    end as stage_note,
    -- Drill-down click-through target (#133 G1d, exact-code fix #150): /berlin/area/[code]
    -- queries fct_gentrification_change etc. on lor_2021 (current, 542-PLR) area codes, which
    -- this \`live_data\`/\`plr\` query always returns -- see #309 for why the \`standard\` variant
    -- (pre-2021 codes, no click-through) no longer appears on this page at all.
    '${Re}/berlin/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`),r(18,p=`-- #358: stage_label / stage_number come straight from gentrification_index (dbt macro
-- typology_stage_display, docs/epic-g/358-spec.md §1) -- the page no longer carries its own
-- label CASE or a "severity" sort. Rows are ordered by cycle position (stage_number, NULLs last)
-- so the first-occurrence order of distinct stage_label values -- what presentStagePalette()
-- above and PolygonMap's positional colour rule key on -- is the legend order 1..6, then
-- "No stage on record". stage_note adds "(uninhabited)" to the tooltip only where the PLR has no
-- stage and a population of 0 (spec §1, C2).
select
    city_code,
    area_code,
    area_name,
    status_index,
    dynamism_index,
    status_class,
    stage_label,
    stage_number,
    case
        when stage_number is null and population = 0 then '(uninhabited)'
        else ''
    end as stage_note,
    -- Drill-down click-through target (#133 G1d, exact-code fix #150): /berlin/area/[code]
    -- queries fct_gentrification_change etc. on lor_2021 (current, 542-PLR) area codes, which
    -- this \`live_data\`/\`plr\` query always returns -- see #309 for why the \`standard\` variant
    -- (pre-2021 codes, no click-through) no longer appears on this page at all.
    '${Re}/berlin/area/' || area_code as link
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`),r(21,j=_e`-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)`),r(22,E=`-- #310 review fix (MEDIUM-A): fixed 12-entry Berlin Bezirk code -> name lookup, needed because
-- mart_area_rollup_stage_mix.area_name is NULL for every Berlin Bezirk row (that mart's own
-- documented gap -- dim_area carries no bezirk-level rows, see this mart's header). Kept in sync
-- with web/scripts/export_area_geojson.py's BEZIRK_NAMES constant if Bezirk names/boundaries ever
-- change.
--
-- Defined ONCE here, as its own top-level SQL block, and referenced BY NAME using Evidence's own
-- block-interpolation syntax from the \`areas_rollup\`, \`area_table_rollup\`, and \`area_mix_table\`
-- blocks below, instead of repeating this lookup three times (see those blocks for the actual
-- reference). An earlier revision of this fix claimed Evidence/DuckDB-WASM does not support one
-- page block referencing another block's result, and duplicated this lookup verbatim into three
-- separate blocks instead -- that claim was wrong. Per
-- @evidence-dev/preprocess/src/extract-queries/extract-queries.cjs's query-chaining step, that
-- interpolation syntax textually inlines the referenced block as a parenthesised subquery
-- wherever it appears in another block's text (confirmed against the installed Evidence version
-- with a real \`evidence build\`). The "Catalog Error: Table with name ... does not exist" the
-- original author hit came from referencing a block by its BARE name as a table identifier (e.g.
-- \`from base\`), not from this interpolation syntax.
--
-- NB: this comment deliberately avoids spelling out this block's own reference token literally --
-- Evidence's query-chaining resolver scans EVERY block's full text (comments included) for that
-- exact token, so writing this block's own name inside that syntax, in its own text, creates a
-- literal self-reference that the resolver reports as "Compiler error: circular reference" (hit
-- and fixed during this review pass -- see the actual reference in \`areas_rollup\` etc. below for
-- what this looks like when it is NOT self-referential).
select
    area_code,
    case area_code
        when '01' then 'Mitte'
        when '02' then 'Friedrichshain-Kreuzberg'
        when '03' then 'Pankow'
        when '04' then 'Charlottenburg-Wilmersdorf'
        when '05' then 'Spandau'
        when '06' then 'Steglitz-Zehlendorf'
        when '07' then 'Tempelhof-Schöneberg'
        when '08' then 'Neukölln'
        when '09' then 'Treptow-Köpenick'
        when '10' then 'Marzahn-Hellersdorf'
        when '11' then 'Lichtenberg'
        when '12' then 'Reinickendorf'
    end as bezirk_name
from
    (
        values
            ('01'),
            ('02'),
            ('03'),
            ('04'),
            ('05'),
            ('06'),
            ('07'),
            ('08'),
            ('09'),
            ('10'),
            ('11'),
            ('12')
    ) as t (area_code)`),r(29,de=_e`-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
select
    area_name,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`),r(30,ie=`-- #358 (spec §3): cycle order (stage_number, NULLs last), then name, then code -- no longer
-- ordered by the Dynamik reading. User-sortable via the DataTable headers.
select
    area_name,
    status_index,
    dynamism_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data'
  and area_level = 'plr'
  and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by stage_number nulls last, area_name, area_code`),[_,n,e,C,D,De,He,ve,qe,s,m,i,pe,ke,b,l,q,U,p,oe,O,j,E,be,te,le,ne,xe,ue,de,ie,Se,se,H,V,ce,he,ae,Me,me,y]}class Bt extends za{constructor(a){super(),La(this,a,lt,st,va,{data:14},null,[-1,-1])}}export{Bt as component};
