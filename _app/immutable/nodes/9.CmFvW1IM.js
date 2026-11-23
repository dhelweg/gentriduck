import{s as fr,d as l,i as d,a as Pa,b as x,c as h,h as gr,e as q,f as dt,k as B,l as b,m as S,n as Wt,o as pr,p as hr,q as br,r as yr,u as oe,g as $t,j as G,t as V,v as vr,H as $r,w as Qt}from"../chunks/scheduler.wXRIqz25.js";import{S as wr,i as kr,d as $,t as f,a as m,c as ie,m as w,b as k,e as R,g as se}from"../chunks/index.uz5rP6Z2.js";import{A as Rr,P as xr}from"../chunks/PageTitle.X8fTilZx.js";import{A as zr}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Er}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Tr}from"../chunks/Hero.C0o6T8tj.js";import{S as qr}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{D as yt,C as fa}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as Va,w as Sr}from"../chunks/entry.DotynpIs.js";import{A as ga}from"../chunks/Alert.DFISYc09.js";import{e as Lr,s as Br,Q as Ne,p as Cr,a as Zt,r as Gt,C as Hr}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as H}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as Vt,a as oa}from"../chunks/Dropdown.Dl2mephJ.js";import{p as Mr}from"../chunks/stores.DJGNasUV.js";import{Q as je}from"../chunks/QueryViewer.RFckNDEV.js";import{B as lt}from"../chunks/BarChart.Cy9nf948.js";import{B as vt}from"../chunks/BigValue.Bpt9v-UH.js";import{p as Pr}from"../chunks/profile.BW8tN6E9.js";function Ar(i){var s;let t,r=(L.title??((s=L.og)==null?void 0:s.title))+"",a;return{c(){t=S("h1"),a=V(r),this.h()},l(o){t=q(o,"H1",{class:!0});var g=$t(t);a=G(g,r),g.forEach(l),this.h()},h(){x(t,"class","title")},m(o,g){d(o,t,g),Pa(t,a)},p:oe,d(o){o&&l(t)}}}function Dr(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:oe,p:oe,d:oe}}function Fr(i){var g;let t,r,a,s,o;return document.title=t=L.title??((g=L.og)==null?void 0:g.title),{c(){r=b(),a=S("meta"),s=b(),o=S("meta"),this.h()},l(_){r=h(_),a=q(_,"META",{property:!0,content:!0}),s=h(_),o=q(_,"META",{name:!0,content:!0}),this.h()},h(){var _,y;x(a,"property","og:title"),x(a,"content",((_=L.og)==null?void 0:_.title)??L.title),x(o,"name","twitter:title"),x(o,"content",((y=L.og)==null?void 0:y.title)??L.title)},m(_,y){d(_,r,y),d(_,a,y),d(_,s,y),d(_,o,y)},p(_,y){var p;y&0&&t!==(t=L.title??((p=L.og)==null?void 0:p.title))&&(document.title=t)},d(_){_&&(l(r),l(a),l(s),l(o))}}}function Nr(i){var o,g;let t,r,a=(L.description||((o=L.og)==null?void 0:o.description))&&jr(),s=((g=L.og)==null?void 0:g.image)&&Ir();return{c(){a&&a.c(),t=b(),s&&s.c(),r=dt()},l(_){a&&a.l(_),t=h(_),s&&s.l(_),r=dt()},m(_,y){a&&a.m(_,y),d(_,t,y),s&&s.m(_,y),d(_,r,y)},p(_,y){var p,z;(L.description||(p=L.og)!=null&&p.description)&&a.p(_,y),(z=L.og)!=null&&z.image&&s.p(_,y)},d(_){_&&(l(t),l(r)),a&&a.d(_),s&&s.d(_)}}}function jr(i){let t,r,a,s,o;return{c(){t=S("meta"),r=b(),a=S("meta"),s=b(),o=S("meta"),this.h()},l(g){t=q(g,"META",{name:!0,content:!0}),r=h(g),a=q(g,"META",{property:!0,content:!0}),s=h(g),o=q(g,"META",{name:!0,content:!0}),this.h()},h(){var g,_,y;x(t,"name","description"),x(t,"content",L.description??((g=L.og)==null?void 0:g.description)),x(a,"property","og:description"),x(a,"content",((_=L.og)==null?void 0:_.description)??L.description),x(o,"name","twitter:description"),x(o,"content",((y=L.og)==null?void 0:y.description)??L.description)},m(g,_){d(g,t,_),d(g,r,_),d(g,a,_),d(g,s,_),d(g,o,_)},p:oe,d(g){g&&(l(t),l(r),l(a),l(s),l(o))}}}function Ir(i){let t,r,a;return{c(){t=S("meta"),r=b(),a=S("meta"),this.h()},l(s){t=q(s,"META",{property:!0,content:!0}),r=h(s),a=q(s,"META",{name:!0,content:!0}),this.h()},h(){var s,o;x(t,"property","og:image"),x(t,"content",Zt((s=L.og)==null?void 0:s.image)),x(a,"name","twitter:image"),x(a,"content",Zt((o=L.og)==null?void 0:o.image))},m(s,o){d(s,t,o),d(s,r,o),d(s,a,o)},p:oe,d(s){s&&(l(t),l(r),l(a))}}}function Jt(i){let t,r;return t=new je({props:{queryID:"bezirk_name",queryResult:i[0]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Or(i){let t,r,a="sums and population-weighted averages",s,o,g="methodology page",_,y,p="full neighbourhood list",z;return{c(){t=V("Figures on this page are "),r=S("b"),r.textContent=a,s=V(` of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  `),o=S("a"),o.textContent=g,_=V(` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),y=S("a"),y.textContent=p,z=V(` for the actual
  gentrification index and trajectory.`),this.h()},l(c){t=G(c,"Figures on this page are "),r=q(c,"B",{"data-svelte-h":!0}),B(r)!=="svelte-rhlwxq"&&(r.textContent=a),s=G(c,` of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  `),o=q(c,"A",{href:!0,"data-svelte-h":!0}),B(o)!=="svelte-1l2pw3"&&(o.textContent=g),_=G(c,` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),y=q(c,"A",{href:!0,"data-svelte-h":!0}),B(y)!=="svelte-z78e0k"&&(y.textContent=p),z=G(c,` for the actual
  gentrification index and trajectory.`),this.h()},h(){x(o,"href","/gentriduck/methodology"),x(y,"href","/gentriduck/berlin/area")},m(c,C){d(c,t,C),d(c,r,C),d(c,s,C),d(c,o,C),d(c,_,C),d(c,y,C),d(c,z,C)},p:oe,d(c){c&&(l(t),l(r),l(s),l(o),l(_),l(y),l(z))}}}function Yt(i){let t,r;return t=new je({props:{queryID:"stage_mix",queryResult:i[2]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Xt(i){let t,r;return t=new je({props:{queryID:"stage_mix_summary",queryResult:i[1]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Ur(i){let t,r;return t=new ga({props:{status:"warning",$$slots:{default:[Wr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[2]&134217728&&(o.$$scope={dirty:s,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Kr(i){let t,r;return{c(){t=S("p"),r=new $r(!1),this.h()},l(a){t=q(a,"P",{});var s=$t(t);r=vr(s,!1),s.forEach(l),this.h()},h(){r.a=null},m(a,s){d(a,t,s),r.m(i[12],t)},p(a,s){s[0]&4096&&r.p(a[12])},i:oe,o:oe,d(a){a&&l(t)}}}function Wr(i){let t;return{c(){t=V("No neighbourhood-stage data available for this district.")},l(r){t=G(r,"No neighbourhood-stage data available for this district.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function er(i){let t,r;return t=new je({props:{queryID:"poi_mix",queryResult:i[3]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Qr(i){let t,r="Context only — never a Kiez-level claim.",a,s,o="Offering Advantage decoder",g;return{c(){t=S("b"),t.textContent=r,a=V(` A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
  `),s=S("a"),s.textContent=o,g=V(` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),B(t)!=="svelte-a7l1s8"&&(t.textContent=r),a=G(_,` A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
  `),s=q(_,"A",{href:!0,"data-svelte-h":!0}),B(s)!=="svelte-168mye8"&&(s.textContent=o),g=G(_,` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(_,y){d(_,t,y),d(_,a,y),d(_,s,y),d(_,g,y)},p:oe,d(_){_&&(l(t),l(a),l(s),l(g))}}}function ar(i){let t,r;return t=new je({props:{queryID:"oa_arealevel",queryResult:i[4]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function tr(i){let t,r;return t=new ga({props:{status:"warning",$$slots:{default:[Zr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Zr(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,s,o="Offering Advantage decoder",g;return{c(){t=S("b"),t.textContent=r,a=V(` PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  `),s=S("a"),s.textContent=o,g=V(" §4/§7 for the full finding."),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),B(t)!=="svelte-1impqbu"&&(t.textContent=r),a=G(_,` PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  `),s=q(_,"A",{href:!0,"data-svelte-h":!0}),B(s)!=="svelte-168mye8"&&(s.textContent=o),g=G(_," §4/§7 for the full finding."),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(_,y){d(_,t,y),d(_,a,y),d(_,s,y),d(_,g,y)},p:oe,d(_){_&&(l(t),l(a),l(s),l(g))}}}function Gr(i){let t,r;return t=new ga({props:{status:"warning",$$slots:{default:[Jr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[2]&134217728&&(o.$$scope={dirty:s,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Vr(i){let t,r;return t=new lt({props:{data:i[4],x:"poi_domain_h",y:"pct_vs_baseline",title:i[0][0].bezirk_name+" — Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this district."}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&16&&(o.data=a[4]),s[0]&1&&(o.title=a[0][0].bezirk_name+" — Offering Advantage vs. Berlin average, by domain"),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Jr(i){let t;return{c(){t=V("No Offering Advantage data for this district.")},l(r){t=G(r,"No Offering Advantage data for this district.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function rr(i){let t,r;return t=new ga({props:{status:"info",$$slots:{default:[Yr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Yr(i){let t;return{c(){t=V(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=G(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function Xr(i){let t,r="Dominance is sign-blind",a,s,o="Offering Advantage decoder",g;return{c(){t=S("b"),t.textContent=r,a=V(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=S("a"),s.textContent=o,g=V(` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),B(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=G(_,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=q(_,"A",{href:!0,"data-svelte-h":!0}),B(s)!=="svelte-168mye8"&&(s.textContent=o),g=G(_,` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(_,y){d(_,t,y),d(_,a,y),d(_,s,y),d(_,g,y)},p:oe,d(_){_&&(l(t),l(a),l(s),l(g))}}}function en(i){let t,r,a,s,o,g,_,y;return t=new oa({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new oa({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new oa({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),_=new oa({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment),s=b(),R(o.$$.fragment),g=b(),R(_.$$.fragment)},l(p){k(t.$$.fragment,p),r=h(p),k(a.$$.fragment,p),s=h(p),k(o.$$.fragment,p),g=h(p),k(_.$$.fragment,p)},m(p,z){w(t,p,z),d(p,r,z),w(a,p,z),d(p,s,z),w(o,p,z),d(p,g,z),w(_,p,z),y=!0},p:oe,i(p){y||(m(t.$$.fragment,p),m(a.$$.fragment,p),m(o.$$.fragment,p),m(_.$$.fragment,p),y=!0)},o(p){f(t.$$.fragment,p),f(a.$$.fragment,p),f(o.$$.fragment,p),f(_.$$.fragment,p),y=!1},d(p){p&&(l(r),l(s),l(g)),$(t,p),$(a,p),$(o,p),$(_,p)}}}function an(i){let t,r,a,s,o,g,_,y,p,z,c,C;return t=new oa({props:{value:"2025",valueLabel:"2025"}}),a=new oa({props:{value:"2024",valueLabel:"2024"}}),o=new oa({props:{value:"2023",valueLabel:"2023"}}),_=new oa({props:{value:"2022",valueLabel:"2022"}}),p=new oa({props:{value:"2021",valueLabel:"2021"}}),c=new oa({props:{value:"2020",valueLabel:"2020"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment),s=b(),R(o.$$.fragment),g=b(),R(_.$$.fragment),y=b(),R(p.$$.fragment),z=b(),R(c.$$.fragment)},l(u){k(t.$$.fragment,u),r=h(u),k(a.$$.fragment,u),s=h(u),k(o.$$.fragment,u),g=h(u),k(_.$$.fragment,u),y=h(u),k(p.$$.fragment,u),z=h(u),k(c.$$.fragment,u)},m(u,E){w(t,u,E),d(u,r,E),w(a,u,E),d(u,s,E),w(o,u,E),d(u,g,E),w(_,u,E),d(u,y,E),w(p,u,E),d(u,z,E),w(c,u,E),C=!0},p:oe,i(u){C||(m(t.$$.fragment,u),m(a.$$.fragment,u),m(o.$$.fragment,u),m(_.$$.fragment,u),m(p.$$.fragment,u),m(c.$$.fragment,u),C=!0)},o(u){f(t.$$.fragment,u),f(a.$$.fragment,u),f(o.$$.fragment,u),f(_.$$.fragment,u),f(p.$$.fragment,u),f(c.$$.fragment,u),C=!1},d(u){u&&(l(r),l(s),l(g),l(y),l(z)),$(t,u),$(a,u),$(o,u),$(_,u),$(p,u),$(c,u)}}}function nr(i){let t,r;return t=new je({props:{queryID:"dom_suppressed_count",queryResult:i[5]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function tn(i){let t,r=(i[5][0]?i[5][0].n_suppressed:0)+"",a,s,o=(i[5][0]?i[5][0].n_suppressed+i[5][0].n_shown:0)+"",g,_,y;return{c(){t=S("b"),a=V(r),s=V(" of "),g=V(o),_=V(" neighbourhoods here are suppressed below as too thinly observed to characterize"),y=V(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(p){t=q(p,"B",{});var z=$t(t);a=G(z,r),s=G(z," of "),g=G(z,o),_=G(z," neighbourhoods here are suppressed below as too thinly observed to characterize"),z.forEach(l),y=G(p,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(p,z){d(p,t,z),Pa(t,a),Pa(t,s),Pa(t,g),Pa(t,_),d(p,y,z)},p(p,z){z[0]&32&&r!==(r=(p[5][0]?p[5][0].n_suppressed:0)+"")&&Qt(a,r),z[0]&32&&o!==(o=(p[5][0]?p[5][0].n_suppressed+p[5][0].n_shown:0)+"")&&Qt(g,o)},d(p){p&&(l(t),l(y))}}}function ir(i){let t,r;return t=new je({props:{queryID:"dominance_children",queryResult:i[6]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function rn(i){let t,r,a,s,o,g,_,y,p,z,c,C;return t=new fa({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new fa({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new fa({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),_=new fa({props:{id:"top_child",title:"Leading type"}}),p=new fa({props:{id:"n_children",title:"Types in this group here"}}),c=new fa({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment),s=b(),R(o.$$.fragment),g=b(),R(_.$$.fragment),y=b(),R(p.$$.fragment),z=b(),R(c.$$.fragment)},l(u){k(t.$$.fragment,u),r=h(u),k(a.$$.fragment,u),s=h(u),k(o.$$.fragment,u),g=h(u),k(_.$$.fragment,u),y=h(u),k(p.$$.fragment,u),z=h(u),k(c.$$.fragment,u)},m(u,E){w(t,u,E),d(u,r,E),w(a,u,E),d(u,s,E),w(o,u,E),d(u,g,E),w(_,u,E),d(u,y,E),w(p,u,E),d(u,z,E),w(c,u,E),C=!0},p:oe,i(u){C||(m(t.$$.fragment,u),m(a.$$.fragment,u),m(o.$$.fragment,u),m(_.$$.fragment,u),m(p.$$.fragment,u),m(c.$$.fragment,u),C=!0)},o(u){f(t.$$.fragment,u),f(a.$$.fragment,u),f(o.$$.fragment,u),f(_.$$.fragment,u),f(p.$$.fragment,u),f(c.$$.fragment,u),C=!1},d(u){u&&(l(r),l(s),l(g),l(y),l(z)),$(t,u),$(a,u),$(o,u),$(_,u),$(p,u),$(c,u)}}}function sr(i){let t,r;return t=new je({props:{queryID:"demographics",queryResult:i[7]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function or(i){let t,r;return t=new ga({props:{status:"warning",$$slots:{default:[nn]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function nn(i){let t;return{c(){t=V(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.`)},l(r){t=G(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function lr(i){let t,r;return t=new je({props:{queryID:"age_mix",queryResult:i[8]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function dr(i){let t,r;return t=new je({props:{queryID:"minimap_areas",queryResult:i[9]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function _r(i){let t,r;return t=new je({props:{queryID:"children",queryResult:i[10]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&1024&&(o.queryResult=a[10]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function sn(i){let t,r,a,s;return t=new fa({props:{id:"area_name",title:"Prognoseraum"}}),a=new fa({props:{id:"residents_total",title:"Residents",fmt:"num0"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment)},l(o){k(t.$$.fragment,o),r=h(o),k(a.$$.fragment,o)},m(o,g){w(t,o,g),d(o,r,g),w(a,o,g),s=!0},p:oe,i(o){s||(m(t.$$.fragment,o),m(a.$$.fragment,o),s=!0)},o(o){f(t.$$.fragment,o),f(a.$$.fragment,o),s=!1},d(o){o&&l(r),$(t,o),$(a,o)}}}function cr(i){let t,r;return t=new je({props:{queryID:"ortsteile",queryResult:i[11]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function on(i){let t,r;return t=new fa({props:{id:"area_name",title:"Ortsteil"}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p:oe,i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ln(i){var Ct;let t,r,a,s,o,g,_,y,p,z,c,C,u,E=`<a href="/gentriduck/berlin/area/bezirk" class="markdown">All districts</a> · <a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a> ·
<a href="/gentriduck/berlin/area-detail" class="markdown">district browse</a>`,Fa,M,v,te,Ie='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Oe,ge,Na=`Every neighbourhood (Planungsraum) in this district is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This district&#39;s own page reports the
<strong class="markdown">distribution</strong> of those neighbourhood-level stages — never a single re-scored index value for the
district itself, since averaging ordinal stage codes across such different neighbourhoods would
mask exactly the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on
(see &quot;Honest caveats&quot; below).`,pa,he,be,ee,le,Ue,Ee,Te,pe,Ke,de,ja='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ha,re,We='<a href="#mapped-places">Mapped places</a>',Qe,Ze,qe,ba,ne,Ge='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',Ve,Se,ya,Je,ye,P,ae,Ye,Aa=i[4].some(mr),Xe,_e,ea=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule, or <a href="/gentriduck/berlin/area" class="markdown">this district&#39;s neighbourhoods</a> for the canonical PLR-grain
figure.`,aa,Re,Ia='<a href="#within-group-dominance">Within-group dominance</a>',va,ce,Le,ve,$a,Be,wa,$e,me,ta,ra,Ce,ka,ue,na=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,ia,xe,Oa='<a href="#people--structure">People &amp; structure</a>',Ra,we,fe,sa,He,xa,Me,Pe,ke,Ae,De,za,ze,T='<a href="#where-this-area-sits">Where this area sits</a>',Ea,Ta,Fe,Ua,la,wt='<a href="#prognoseräume-in-this-district">Prognoseräume in this district</a>',Ja,Ka,qa,Ya,da,kt='<a href="#ortsteile-in-this-district">Ortsteile in this district</a>',Xa,Sa,Rt=`Ortsteil (Stadtteil) is a different, non-LOR district subdivision (it does not nest into the
Prognoseraum/Bezirksregion/Planungsraum ladder above) — see the
<a href="/gentriduck/berlin/area/ortsteil" class="markdown">Ortsteil profile page</a> for how its own neighbourhood rollup is built.`,et,Wa,La,at,_a,xt='<a href="#honest-caveats">Honest caveats</a>',tt,Ba,zt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this district</strong> — only
the distribution of its constituent neighbourhoods&#39; (Planungsräume) own stages. A population-
weighted average of ordinal stage/Dynamik classes would violate this project&#39;s own &quot;never average
ordinal class codes&quot; rule and would describe no actual neighbourhood while masking exactly the
frontier heterogeneity gentrification tracking depends on (see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code>,
both <strong class="markdown">decline</strong> the coarse-grain point value).</li> <li class="markdown"><strong class="markdown">Offering Advantage and within-group dominance figures on this page describe the whole pooled
district, not any one neighbourhood inside it</strong> — see the MAUP fragility disclosure above, and the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> before comparing districts.</li> <li class="markdown">Figures on this page are <strong class="markdown">sums and population-weighted averages</strong> of this district&#39;s
neighbourhoods, never observed at the district level itself. Land value and estimated rent are
only published at the individual-neighbourhood grain — see any neighbourhood&#39;s own page (linked
above) for those figures.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,rt,ca,Et='<a href="#further-reading">Further reading</a>',nt,Ca,Tt=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other districts, or drill into any of this district&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,it,Qa,st,Da,ot,ma=typeof L<"u"&&(L.title||((Ct=L.og)==null?void 0:Ct.title))&&L.hide_title!==!0&&Ar();function ur(e,n){var Ga;return typeof L<"u"&&(L.title||(Ga=L.og)!=null&&Ga.title)?Fr:Dr}let Za=ur()(i),ua=typeof L=="object"&&Nr(),A=i[0]&&Jt(i);_=new Rr({props:{crumbs:i[14]}}),p=new xr({props:{title:i[13]}}),c=new Tr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:i[0][0].bezirk_name+" — district profile",lede:"Population, composition, and neighbourhood-stage mix for this district, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain."}}),M=new ga({props:{status:"info",$$slots:{default:[Or]},$$scope:{ctx:i}}});let D=i[2]&&Yt(i),F=i[1]&&Xt(i);const qt=[Kr,Ur],Ha=[];function St(e,n){return e[12]?0:1}ee=St(i),le=Ha[ee]=qt[ee](i),Ee=new lt({props:{data:i[2],x:"stage",y:"n_areas",title:"Neighbourhoods by stage, "+i[0][0].bezirk_name,swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}}}}),pe=new qr({});let N=i[3]&&er(i);qe=new lt({props:{data:i[3],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+i[0][0].bezirk_name,swapXY:"true"}}),Se=new ga({props:{status:"warning",$$slots:{default:[Qr]},$$scope:{ctx:i}}});let j=i[4]&&ar(i),J=i[4][0]&&i[4][0].maup_caveat_required&&tr(i);const Lt=[Vr,Gr],Ma=[];function Bt(e,n){return e[4].length>0?0:1}P=Bt(i),ae=Ma[P]=Lt[P](i);let Y=Aa&&rr(i);ce=new ga({props:{status:"info",$$slots:{default:[Xr]},$$scope:{ctx:i}}}),ve=new Vt({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[en]},$$scope:{ctx:i}}}),Be=new Vt({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[an]},$$scope:{ctx:i}}});let I=i[5]&&nr(i);me=new ga({props:{status:"info",$$slots:{default:[tn]},$$scope:{ctx:i}}});let O=i[6]&&ir(i);Ce=new yt({props:{data:i[6],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this district.",$$slots:{default:[rn]},$$scope:{ctx:i}}});let U=i[7]&&sr(i);fe=new vt({props:{data:i[7],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),He=new vt({props:{data:i[7],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),Me=new vt({props:{data:i[7],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let X=i[7]&&i[7][0]&&i[7][0].any_indicator_suppressed&&or(i),K=i[8]&&lr(i);De=new lt({props:{data:i[8],x:"age_band",y:"share",title:"Age structure, "+i[0][0].bezirk_name,yFmt:"pct0"}});let W=i[9]&&dr(i);Fe=new zr({props:{data:i[9],geoJsonUrl:`${Va}/geo/bezirk_pgr_drilldown.geojson`,title:(i[0][0]?i[0][0].bezirk_name:"This district")+" and its Prognoseräume"}});let Q=i[10]&&_r(i);qa=new yt({props:{data:i[10],rows:"20",link:"pgr_link",$$slots:{default:[sn]},$$scope:{ctx:i}}});let Z=i[11]&&cr(i);return La=new yt({props:{data:i[11],rows:"20",link:"ortsteil_link",$$slots:{default:[on]},$$scope:{ctx:i}}}),Da=new Er({}),{c(){ma&&ma.c(),t=b(),Za.c(),r=S("meta"),a=S("meta"),ua&&ua.c(),s=dt(),o=b(),A&&A.c(),g=b(),R(_.$$.fragment),y=b(),R(p.$$.fragment),z=b(),R(c.$$.fragment),C=b(),u=S("p"),u.innerHTML=E,Fa=b(),R(M.$$.fragment),v=b(),te=S("h2"),te.innerHTML=Ie,Oe=b(),ge=S("p"),ge.innerHTML=Na,pa=b(),D&&D.c(),he=b(),F&&F.c(),be=b(),le.c(),Ue=b(),R(Ee.$$.fragment),Te=b(),R(pe.$$.fragment),Ke=b(),de=S("h2"),de.innerHTML=ja,ha=b(),re=S("h3"),re.innerHTML=We,Qe=b(),N&&N.c(),Ze=b(),R(qe.$$.fragment),ba=b(),ne=S("h3"),ne.innerHTML=Ge,Ve=b(),R(Se.$$.fragment),ya=b(),j&&j.c(),Je=b(),J&&J.c(),ye=b(),ae.c(),Ye=b(),Y&&Y.c(),Xe=b(),_e=S("p"),_e.innerHTML=ea,aa=b(),Re=S("h2"),Re.innerHTML=Ia,va=b(),R(ce.$$.fragment),Le=b(),R(ve.$$.fragment),$a=b(),R(Be.$$.fragment),wa=b(),I&&I.c(),$e=b(),R(me.$$.fragment),ta=b(),O&&O.c(),ra=b(),R(Ce.$$.fragment),ka=b(),ue=S("p"),ue.innerHTML=na,ia=b(),xe=S("h2"),xe.innerHTML=Oa,Ra=b(),U&&U.c(),we=b(),R(fe.$$.fragment),sa=b(),R(He.$$.fragment),xa=b(),R(Me.$$.fragment),Pe=b(),X&&X.c(),ke=b(),K&&K.c(),Ae=b(),R(De.$$.fragment),za=b(),ze=S("h2"),ze.innerHTML=T,Ea=b(),W&&W.c(),Ta=b(),R(Fe.$$.fragment),Ua=b(),la=S("h3"),la.innerHTML=wt,Ja=b(),Q&&Q.c(),Ka=b(),R(qa.$$.fragment),Ya=b(),da=S("h3"),da.innerHTML=kt,Xa=b(),Sa=S("p"),Sa.innerHTML=Rt,et=b(),Z&&Z.c(),Wa=b(),R(La.$$.fragment),at=b(),_a=S("h2"),_a.innerHTML=xt,tt=b(),Ba=S("ul"),Ba.innerHTML=zt,rt=b(),ca=S("h2"),ca.innerHTML=Et,nt=b(),Ca=S("p"),Ca.innerHTML=Tt,it=b(),Qa=S("hr"),st=b(),R(Da.$$.fragment),this.h()},l(e){ma&&ma.l(e),t=h(e);const n=gr("svelte-2igo1p",document.head);Za.l(n),r=q(n,"META",{name:!0,content:!0}),a=q(n,"META",{name:!0,content:!0}),ua&&ua.l(n),s=dt(),n.forEach(l),o=h(e),A&&A.l(e),g=h(e),k(_.$$.fragment,e),y=h(e),k(p.$$.fragment,e),z=h(e),k(c.$$.fragment,e),C=h(e),u=q(e,"P",{class:!0,"data-svelte-h":!0}),B(u)!=="svelte-ii1lbl"&&(u.innerHTML=E),Fa=h(e),k(M.$$.fragment,e),v=h(e),te=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(te)!=="svelte-14f17uo"&&(te.innerHTML=Ie),Oe=h(e),ge=q(e,"P",{class:!0,"data-svelte-h":!0}),B(ge)!=="svelte-1vk2ss4"&&(ge.innerHTML=Na),pa=h(e),D&&D.l(e),he=h(e),F&&F.l(e),be=h(e),le.l(e),Ue=h(e),k(Ee.$$.fragment,e),Te=h(e),k(pe.$$.fragment,e),Ke=h(e),de=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(de)!=="svelte-1i9w9pn"&&(de.innerHTML=ja),ha=h(e),re=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(re)!=="svelte-3hvew3"&&(re.innerHTML=We),Qe=h(e),N&&N.l(e),Ze=h(e),k(qe.$$.fragment,e),ba=h(e),ne=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(ne)!=="svelte-5mc7pd"&&(ne.innerHTML=Ge),Ve=h(e),k(Se.$$.fragment,e),ya=h(e),j&&j.l(e),Je=h(e),J&&J.l(e),ye=h(e),ae.l(e),Ye=h(e),Y&&Y.l(e),Xe=h(e),_e=q(e,"P",{class:!0,"data-svelte-h":!0}),B(_e)!=="svelte-ub6827"&&(_e.innerHTML=ea),aa=h(e),Re=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(Re)!=="svelte-4kb45v"&&(Re.innerHTML=Ia),va=h(e),k(ce.$$.fragment,e),Le=h(e),k(ve.$$.fragment,e),$a=h(e),k(Be.$$.fragment,e),wa=h(e),I&&I.l(e),$e=h(e),k(me.$$.fragment,e),ta=h(e),O&&O.l(e),ra=h(e),k(Ce.$$.fragment,e),ka=h(e),ue=q(e,"P",{class:!0,"data-svelte-h":!0}),B(ue)!=="svelte-1xa7bh7"&&(ue.innerHTML=na),ia=h(e),xe=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(xe)!=="svelte-1mdzqzc"&&(xe.innerHTML=Oa),Ra=h(e),U&&U.l(e),we=h(e),k(fe.$$.fragment,e),sa=h(e),k(He.$$.fragment,e),xa=h(e),k(Me.$$.fragment,e),Pe=h(e),X&&X.l(e),ke=h(e),K&&K.l(e),Ae=h(e),k(De.$$.fragment,e),za=h(e),ze=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(ze)!=="svelte-60cjj9"&&(ze.innerHTML=T),Ea=h(e),W&&W.l(e),Ta=h(e),k(Fe.$$.fragment,e),Ua=h(e),la=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(la)!=="svelte-1krkey9"&&(la.innerHTML=wt),Ja=h(e),Q&&Q.l(e),Ka=h(e),k(qa.$$.fragment,e),Ya=h(e),da=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(da)!=="svelte-984tou"&&(da.innerHTML=kt),Xa=h(e),Sa=q(e,"P",{class:!0,"data-svelte-h":!0}),B(Sa)!=="svelte-1ttuuyo"&&(Sa.innerHTML=Rt),et=h(e),Z&&Z.l(e),Wa=h(e),k(La.$$.fragment,e),at=h(e),_a=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(_a)!=="svelte-ad0syq"&&(_a.innerHTML=xt),tt=h(e),Ba=q(e,"UL",{class:!0,"data-svelte-h":!0}),B(Ba)!=="svelte-vmlcgf"&&(Ba.innerHTML=zt),rt=h(e),ca=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(ca)!=="svelte-oimjns"&&(ca.innerHTML=Et),nt=h(e),Ca=q(e,"P",{class:!0,"data-svelte-h":!0}),B(Ca)!=="svelte-1ga3uyz"&&(Ca.innerHTML=Tt),it=h(e),Qa=q(e,"HR",{class:!0}),st=h(e),k(Da.$$.fragment,e),this.h()},h(){x(r,"name","twitter:card"),x(r,"content","summary_large_image"),x(a,"name","twitter:site"),x(a,"content","@evidence_dev"),x(u,"class","markdown"),x(te,"class","markdown"),x(te,"id","social-status--trajectory"),x(ge,"class","markdown"),x(de,"class","markdown"),x(de,"id","commercial-mix--offering-advantage"),x(re,"class","markdown"),x(re,"id","mapped-places"),x(ne,"class","markdown"),x(ne,"id","offering-advantage-across-the-area-hierarchy"),x(_e,"class","markdown"),x(Re,"class","markdown"),x(Re,"id","within-group-dominance"),x(ue,"class","markdown"),x(xe,"class","markdown"),x(xe,"id","people--structure"),x(ze,"class","markdown"),x(ze,"id","where-this-area-sits"),x(la,"class","markdown"),x(la,"id","prognoseräume-in-this-district"),x(da,"class","markdown"),x(da,"id","ortsteile-in-this-district"),x(Sa,"class","markdown"),x(_a,"class","markdown"),x(_a,"id","honest-caveats"),x(Ba,"class","markdown"),x(ca,"class","markdown"),x(ca,"id","further-reading"),x(Ca,"class","markdown"),x(Qa,"class","markdown")},m(e,n){ma&&ma.m(e,n),d(e,t,n),Za.m(document.head,null),Pa(document.head,r),Pa(document.head,a),ua&&ua.m(document.head,null),Pa(document.head,s),d(e,o,n),A&&A.m(e,n),d(e,g,n),w(_,e,n),d(e,y,n),w(p,e,n),d(e,z,n),w(c,e,n),d(e,C,n),d(e,u,n),d(e,Fa,n),w(M,e,n),d(e,v,n),d(e,te,n),d(e,Oe,n),d(e,ge,n),d(e,pa,n),D&&D.m(e,n),d(e,he,n),F&&F.m(e,n),d(e,be,n),Ha[ee].m(e,n),d(e,Ue,n),w(Ee,e,n),d(e,Te,n),w(pe,e,n),d(e,Ke,n),d(e,de,n),d(e,ha,n),d(e,re,n),d(e,Qe,n),N&&N.m(e,n),d(e,Ze,n),w(qe,e,n),d(e,ba,n),d(e,ne,n),d(e,Ve,n),w(Se,e,n),d(e,ya,n),j&&j.m(e,n),d(e,Je,n),J&&J.m(e,n),d(e,ye,n),Ma[P].m(e,n),d(e,Ye,n),Y&&Y.m(e,n),d(e,Xe,n),d(e,_e,n),d(e,aa,n),d(e,Re,n),d(e,va,n),w(ce,e,n),d(e,Le,n),w(ve,e,n),d(e,$a,n),w(Be,e,n),d(e,wa,n),I&&I.m(e,n),d(e,$e,n),w(me,e,n),d(e,ta,n),O&&O.m(e,n),d(e,ra,n),w(Ce,e,n),d(e,ka,n),d(e,ue,n),d(e,ia,n),d(e,xe,n),d(e,Ra,n),U&&U.m(e,n),d(e,we,n),w(fe,e,n),d(e,sa,n),w(He,e,n),d(e,xa,n),w(Me,e,n),d(e,Pe,n),X&&X.m(e,n),d(e,ke,n),K&&K.m(e,n),d(e,Ae,n),w(De,e,n),d(e,za,n),d(e,ze,n),d(e,Ea,n),W&&W.m(e,n),d(e,Ta,n),w(Fe,e,n),d(e,Ua,n),d(e,la,n),d(e,Ja,n),Q&&Q.m(e,n),d(e,Ka,n),w(qa,e,n),d(e,Ya,n),d(e,da,n),d(e,Xa,n),d(e,Sa,n),d(e,et,n),Z&&Z.m(e,n),d(e,Wa,n),w(La,e,n),d(e,at,n),d(e,_a,n),d(e,tt,n),d(e,Ba,n),d(e,rt,n),d(e,ca,n),d(e,nt,n),d(e,Ca,n),d(e,it,n),d(e,Qa,n),d(e,st,n),w(Da,e,n),ot=!0},p(e,n){var Kt;typeof L<"u"&&(L.title||(Kt=L.og)!=null&&Kt.title)&&L.hide_title!==!0&&ma.p(e,n),Za.p(e,n),typeof L=="object"&&ua.p(e,n),e[0]?A?(A.p(e,n),n[0]&1&&m(A,1)):(A=Jt(e),A.c(),m(A,1),A.m(g.parentNode,g)):A&&(se(),f(A,1,1,()=>{A=null}),ie());const Ga={};n[0]&16384&&(Ga.crumbs=e[14]),_.$set(Ga);const Ht={};n[0]&8192&&(Ht.title=e[13]),p.$set(Ht);const Mt={};n[0]&1&&(Mt.title=e[0][0].bezirk_name+" — district profile"),c.$set(Mt);const Pt={};n[2]&134217728&&(Pt.$$scope={dirty:n,ctx:e}),M.$set(Pt),e[2]?D?(D.p(e,n),n[0]&4&&m(D,1)):(D=Yt(e),D.c(),m(D,1),D.m(he.parentNode,he)):D&&(se(),f(D,1,1,()=>{D=null}),ie()),e[1]?F?(F.p(e,n),n[0]&2&&m(F,1)):(F=Xt(e),F.c(),m(F,1),F.m(be.parentNode,be)):F&&(se(),f(F,1,1,()=>{F=null}),ie());let _t=ee;ee=St(e),ee===_t?Ha[ee].p(e,n):(se(),f(Ha[_t],1,1,()=>{Ha[_t]=null}),ie(),le=Ha[ee],le?le.p(e,n):(le=Ha[ee]=qt[ee](e),le.c()),m(le,1),le.m(Ue.parentNode,Ue));const ct={};n[0]&4&&(ct.data=e[2]),n[0]&1&&(ct.title="Neighbourhoods by stage, "+e[0][0].bezirk_name),Ee.$set(ct),e[3]?N?(N.p(e,n),n[0]&8&&m(N,1)):(N=er(e),N.c(),m(N,1),N.m(Ze.parentNode,Ze)):N&&(se(),f(N,1,1,()=>{N=null}),ie());const mt={};n[0]&8&&(mt.data=e[3]),n[0]&1&&(mt.title="Mapped places by category (latest snapshot), "+e[0][0].bezirk_name),qe.$set(mt);const At={};n[2]&134217728&&(At.$$scope={dirty:n,ctx:e}),Se.$set(At),e[4]?j?(j.p(e,n),n[0]&16&&m(j,1)):(j=ar(e),j.c(),m(j,1),j.m(Je.parentNode,Je)):j&&(se(),f(j,1,1,()=>{j=null}),ie()),e[4][0]&&e[4][0].maup_caveat_required?J?n[0]&16&&m(J,1):(J=tr(e),J.c(),m(J,1),J.m(ye.parentNode,ye)):J&&(se(),f(J,1,1,()=>{J=null}),ie());let ut=P;P=Bt(e),P===ut?Ma[P].p(e,n):(se(),f(Ma[ut],1,1,()=>{Ma[ut]=null}),ie(),ae=Ma[P],ae?ae.p(e,n):(ae=Ma[P]=Lt[P](e),ae.c()),m(ae,1),ae.m(Ye.parentNode,Ye)),n[0]&16&&(Aa=e[4].some(mr)),Aa?Y?n[0]&16&&m(Y,1):(Y=rr(e),Y.c(),m(Y,1),Y.m(Xe.parentNode,Xe)):Y&&(se(),f(Y,1,1,()=>{Y=null}),ie());const Dt={};n[2]&134217728&&(Dt.$$scope={dirty:n,ctx:e}),ce.$set(Dt);const Ft={};n[2]&134217728&&(Ft.$$scope={dirty:n,ctx:e}),ve.$set(Ft);const Nt={};n[2]&134217728&&(Nt.$$scope={dirty:n,ctx:e}),Be.$set(Nt),e[5]?I?(I.p(e,n),n[0]&32&&m(I,1)):(I=nr(e),I.c(),m(I,1),I.m($e.parentNode,$e)):I&&(se(),f(I,1,1,()=>{I=null}),ie());const jt={};n[0]&32|n[2]&134217728&&(jt.$$scope={dirty:n,ctx:e}),me.$set(jt),e[6]?O?(O.p(e,n),n[0]&64&&m(O,1)):(O=ir(e),O.c(),m(O,1),O.m(ra.parentNode,ra)):O&&(se(),f(O,1,1,()=>{O=null}),ie());const ft={};n[0]&64&&(ft.data=e[6]),n[2]&134217728&&(ft.$$scope={dirty:n,ctx:e}),Ce.$set(ft),e[7]?U?(U.p(e,n),n[0]&128&&m(U,1)):(U=sr(e),U.c(),m(U,1),U.m(we.parentNode,we)):U&&(se(),f(U,1,1,()=>{U=null}),ie());const It={};n[0]&128&&(It.data=e[7]),fe.$set(It);const Ot={};n[0]&128&&(Ot.data=e[7]),He.$set(Ot);const Ut={};n[0]&128&&(Ut.data=e[7]),Me.$set(Ut),e[7]&&e[7][0]&&e[7][0].any_indicator_suppressed?X?n[0]&128&&m(X,1):(X=or(e),X.c(),m(X,1),X.m(ke.parentNode,ke)):X&&(se(),f(X,1,1,()=>{X=null}),ie()),e[8]?K?(K.p(e,n),n[0]&256&&m(K,1)):(K=lr(e),K.c(),m(K,1),K.m(Ae.parentNode,Ae)):K&&(se(),f(K,1,1,()=>{K=null}),ie());const gt={};n[0]&256&&(gt.data=e[8]),n[0]&1&&(gt.title="Age structure, "+e[0][0].bezirk_name),De.$set(gt),e[9]?W?(W.p(e,n),n[0]&512&&m(W,1)):(W=dr(e),W.c(),m(W,1),W.m(Ta.parentNode,Ta)):W&&(se(),f(W,1,1,()=>{W=null}),ie());const pt={};n[0]&512&&(pt.data=e[9]),n[0]&1&&(pt.title=(e[0][0]?e[0][0].bezirk_name:"This district")+" and its Prognoseräume"),Fe.$set(pt),e[10]?Q?(Q.p(e,n),n[0]&1024&&m(Q,1)):(Q=_r(e),Q.c(),m(Q,1),Q.m(Ka.parentNode,Ka)):Q&&(se(),f(Q,1,1,()=>{Q=null}),ie());const ht={};n[0]&1024&&(ht.data=e[10]),n[2]&134217728&&(ht.$$scope={dirty:n,ctx:e}),qa.$set(ht),e[11]?Z?(Z.p(e,n),n[0]&2048&&m(Z,1)):(Z=cr(e),Z.c(),m(Z,1),Z.m(Wa.parentNode,Wa)):Z&&(se(),f(Z,1,1,()=>{Z=null}),ie());const bt={};n[0]&2048&&(bt.data=e[11]),n[2]&134217728&&(bt.$$scope={dirty:n,ctx:e}),La.$set(bt)},i(e){ot||(m(A),m(_.$$.fragment,e),m(p.$$.fragment,e),m(c.$$.fragment,e),m(M.$$.fragment,e),m(D),m(F),m(le),m(Ee.$$.fragment,e),m(pe.$$.fragment,e),m(N),m(qe.$$.fragment,e),m(Se.$$.fragment,e),m(j),m(J),m(ae),m(Y),m(ce.$$.fragment,e),m(ve.$$.fragment,e),m(Be.$$.fragment,e),m(I),m(me.$$.fragment,e),m(O),m(Ce.$$.fragment,e),m(U),m(fe.$$.fragment,e),m(He.$$.fragment,e),m(Me.$$.fragment,e),m(X),m(K),m(De.$$.fragment,e),m(W),m(Fe.$$.fragment,e),m(Q),m(qa.$$.fragment,e),m(Z),m(La.$$.fragment,e),m(Da.$$.fragment,e),ot=!0)},o(e){f(A),f(_.$$.fragment,e),f(p.$$.fragment,e),f(c.$$.fragment,e),f(M.$$.fragment,e),f(D),f(F),f(le),f(Ee.$$.fragment,e),f(pe.$$.fragment,e),f(N),f(qe.$$.fragment,e),f(Se.$$.fragment,e),f(j),f(J),f(ae),f(Y),f(ce.$$.fragment,e),f(ve.$$.fragment,e),f(Be.$$.fragment,e),f(I),f(me.$$.fragment,e),f(O),f(Ce.$$.fragment,e),f(U),f(fe.$$.fragment,e),f(He.$$.fragment,e),f(Me.$$.fragment,e),f(X),f(K),f(De.$$.fragment,e),f(W),f(Fe.$$.fragment,e),f(Q),f(qa.$$.fragment,e),f(Z),f(La.$$.fragment,e),f(Da.$$.fragment,e),ot=!1},d(e){e&&(l(t),l(o),l(g),l(y),l(z),l(C),l(u),l(Fa),l(v),l(te),l(Oe),l(ge),l(pa),l(he),l(be),l(Ue),l(Te),l(Ke),l(de),l(ha),l(re),l(Qe),l(Ze),l(ba),l(ne),l(Ve),l(ya),l(Je),l(ye),l(Ye),l(Xe),l(_e),l(aa),l(Re),l(va),l(Le),l($a),l(wa),l($e),l(ta),l(ra),l(ka),l(ue),l(ia),l(xe),l(Ra),l(we),l(sa),l(xa),l(Pe),l(ke),l(Ae),l(za),l(ze),l(Ea),l(Ta),l(Ua),l(la),l(Ja),l(Ka),l(Ya),l(da),l(Xa),l(Sa),l(et),l(Wa),l(at),l(_a),l(tt),l(Ba),l(rt),l(ca),l(nt),l(Ca),l(it),l(Qa),l(st)),ma&&ma.d(e),Za.d(e),l(r),l(a),ua&&ua.d(e),l(s),A&&A.d(e),$(_,e),$(p,e),$(c,e),$(M,e),D&&D.d(e),F&&F.d(e),Ha[ee].d(e),$(Ee,e),$(pe,e),N&&N.d(e),$(qe,e),$(Se,e),j&&j.d(e),J&&J.d(e),Ma[P].d(e),Y&&Y.d(e),$(ce,e),$(ve,e),$(Be,e),I&&I.d(e),$(me,e),O&&O.d(e),$(Ce,e),U&&U.d(e),$(fe,e),$(He,e),$(Me,e),X&&X.d(e),K&&K.d(e),$(De,e),W&&W.d(e),$(Fe,e),Q&&Q.d(e),$(qa,e),Z&&Z.d(e),$(La,e),$(Da,e)}}}const L={},mr=i=>i.oa_domain_min_base_flag;function dn(i,t,r){let a,s,o,g,_,y,p;Wt(i,Mr,T=>r(69,y=T)),Wt(i,Gt,T=>r(73,p=T));let{data:z}=t,{data:c={},customFormattingSettings:C,__db:u,inputs:E}=z;pr(Gt,p="232b0788e82321534e0845a0d8ea883d",p);let Fa=Lr(Sr(E));hr(Fa.subscribe(T=>r(17,E=T))),br(Hr,{getCustomFormats:()=>C.customFormats||[]});const M=(T,Ea)=>Pr(u.query,T,{query_name:Ea});Br(M);let v=y.params;yr(()=>!0);let te={initialData:void 0,initialError:void 0},Ie=H`select bezirk_name
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'`,Oe=`select bezirk_name
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'`;c.bezirk_name_data&&(c.bezirk_name_data instanceof Error?te.initialError=c.bezirk_name_data:te.initialData=c.bezirk_name_data,c.bezirk_name_columns&&(te.knownColumns=c.bezirk_name_columns));let ge,Na=!1;const pa=Ne.createReactive({callback:T=>{r(0,ge=T)},execFn:M},{id:"bezirk_name",...te});pa(Oe,{noResolve:Ie,...te}),globalThis[Symbol.for("bezirk_name")]={get value(){return ge}};let he={initialData:void 0,initialError:void 0},be=H`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`,ee=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`;c.stage_mix_data&&(c.stage_mix_data instanceof Error?he.initialError=c.stage_mix_data:he.initialData=c.stage_mix_data,c.stage_mix_columns&&(he.knownColumns=c.stage_mix_columns));let le,Ue=!1;const Ee=Ne.createReactive({callback:T=>{r(2,le=T)},execFn:M},{id:"stage_mix",...he});Ee(ee,{noResolve:be,...he}),globalThis[Symbol.for("stage_mix")]={get value(){return le}};let Te={initialData:void 0,initialError:void 0},pe=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${v.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.gentrification_index
              where variant = 'live_data' and area_level = 'plr'
          )
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select stage, n_areas from mix order by n_areas desc limit 1),
    advanced as (
        select coalesce(sum(n_areas), 0) as n_advanced
        from mix
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`,Ke=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${v.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.gentrification_index
              where variant = 'live_data' and area_level = 'plr'
          )
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select stage, n_areas from mix order by n_areas desc limit 1),
    advanced as (
        select coalesce(sum(n_areas), 0) as n_advanced
        from mix
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`;c.stage_mix_summary_data&&(c.stage_mix_summary_data instanceof Error?Te.initialError=c.stage_mix_summary_data:Te.initialData=c.stage_mix_summary_data,c.stage_mix_summary_columns&&(Te.knownColumns=c.stage_mix_summary_columns));let de,ja=!1;const ha=Ne.createReactive({callback:T=>{r(1,de=T)},execFn:M},{id:"stage_mix_summary",...Te});ha(Ke,{noResolve:pe,...Te}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return de}};let re={initialData:void 0,initialError:void 0},We=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`,Qe=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;c.poi_mix_data&&(c.poi_mix_data instanceof Error?re.initialError=c.poi_mix_data:re.initialData=c.poi_mix_data,c.poi_mix_columns&&(re.knownColumns=c.poi_mix_columns));let Ze,qe=!1;const ba=Ne.createReactive({callback:T=>{r(3,Ze=T)},execFn:M},{id:"poi_mix",...re});ba(Qe,{noResolve:We,...re}),globalThis[Symbol.for("poi_mix")]={get value(){return Ze}};let ne={initialData:void 0,initialError:void 0},Ge=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${v.code}'
  )
order by oa_domain desc`,Ve=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${v.code}'
  )
order by oa_domain desc`;c.oa_arealevel_data&&(c.oa_arealevel_data instanceof Error?ne.initialError=c.oa_arealevel_data:ne.initialData=c.oa_arealevel_data,c.oa_arealevel_columns&&(ne.knownColumns=c.oa_arealevel_columns));let Se,ya=!1;const Je=Ne.createReactive({callback:T=>{r(4,Se=T)},execFn:M},{id:"oa_arealevel",...ne});Je(Ve,{noResolve:Ge,...ne}),globalThis[Symbol.for("oa_arealevel")]={get value(){return Se}};let ye={initialData:void 0,initialError:void 0},P=H`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
-- /methodology-oa-modes original this table relocates from.
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see this page's header comment (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${E.dom_group.value}'
  and snapshot_year = ${E.dom_year.value}
  and substr(area_code, 1, 2) = '${v.code}'`,ae=`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
-- /methodology-oa-modes original this table relocates from.
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see this page's header comment (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${E.dom_group.value}'
  and snapshot_year = ${E.dom_year.value}
  and substr(area_code, 1, 2) = '${v.code}'`;c.dom_suppressed_count_data&&(c.dom_suppressed_count_data instanceof Error?ye.initialError=c.dom_suppressed_count_data:ye.initialData=c.dom_suppressed_count_data,c.dom_suppressed_count_columns&&(ye.knownColumns=c.dom_suppressed_count_columns));let Ye,Aa=!1;const Xe=Ne.createReactive({callback:T=>{r(5,Ye=T)},execFn:M},{id:"dom_suppressed_count",...ye});Xe(ae,{noResolve:P,...ye}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return Ye}};let _e={initialData:void 0,initialError:void 0},ea=H`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no district-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,2) prefix filter this page already uses for every other
-- children query -- a filter, not a new aggregation.
select
    d.area_code,
    coalesce(gi.area_name, d.area_code) as area_name,
    d.hhi,
    d.top_share,
    d.top_child,
    d.top_child_offering_tier,
    d.n_children,
    d.group_stock_local,
    '/berlin/area/' || d.area_code as area_link
from gentriduck_marts.mart_poi_dominance as d
left join gentriduck_marts.gentrification_index as gi
  on
    gi.area_code = d.area_code and gi.variant = 'live_data' and gi.area_level = 'plr'
    and gi.city_code = 'BER'
    and gi.period_yyyymm = (
        select max(period_yyyymm) from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    )
where
    d.city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this table relocates from.
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see this page's header comment) -- without
    -- this, the same PLR resurfaces once per boundary vintage x weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${E.dom_group.value}'
    and d.snapshot_year = ${E.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${v.code}'
order by d.hhi desc
limit 15`,aa=`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no district-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,2) prefix filter this page already uses for every other
-- children query -- a filter, not a new aggregation.
select
    d.area_code,
    coalesce(gi.area_name, d.area_code) as area_name,
    d.hhi,
    d.top_share,
    d.top_child,
    d.top_child_offering_tier,
    d.n_children,
    d.group_stock_local,
    '/berlin/area/' || d.area_code as area_link
from gentriduck_marts.mart_poi_dominance as d
left join gentriduck_marts.gentrification_index as gi
  on
    gi.area_code = d.area_code and gi.variant = 'live_data' and gi.area_level = 'plr'
    and gi.city_code = 'BER'
    and gi.period_yyyymm = (
        select max(period_yyyymm) from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    )
where
    d.city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this table relocates from.
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see this page's header comment) -- without
    -- this, the same PLR resurfaces once per boundary vintage x weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${E.dom_group.value}'
    and d.snapshot_year = ${E.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${v.code}'
order by d.hhi desc
limit 15`;c.dominance_children_data&&(c.dominance_children_data instanceof Error?_e.initialError=c.dominance_children_data:_e.initialData=c.dominance_children_data,c.dominance_children_columns&&(_e.knownColumns=c.dominance_children_columns));let Re,Ia=!1;const va=Ne.createReactive({callback:T=>{r(6,Re=T)},execFn:M},{id:"dominance_children",..._e});va(aa,{noResolve:ea,..._e}),globalThis[Symbol.for("dominance_children")]={get value(){return Re}};let ce={initialData:void 0,initialError:void 0},Le=H`select
    reference_year,
    residents_total,
    age_under18_share,
    age_18_27_share,
    age_27_45_share,
    age_45_65_share,
    age_65plus_share,
    mean_age_years,
    any_indicator_suppressed,
    n_plr
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
order by reference_year desc
limit 1`,ve=`select
    reference_year,
    residents_total,
    age_under18_share,
    age_18_27_share,
    age_27_45_share,
    age_45_65_share,
    age_65plus_share,
    mean_age_years,
    any_indicator_suppressed,
    n_plr
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
order by reference_year desc
limit 1`;c.demographics_data&&(c.demographics_data instanceof Error?ce.initialError=c.demographics_data:ce.initialData=c.demographics_data,c.demographics_columns&&(ce.knownColumns=c.demographics_columns));let $a,Be=!1;const wa=Ne.createReactive({callback:T=>{r(7,$a=T)},execFn:M},{id:"demographics",...ce});wa(ve,{noResolve:Le,...ce}),globalThis[Symbol.for("demographics")]={get value(){return $a}};let $e={initialData:void 0,initialError:void 0},me=H`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`,ta=`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`;c.age_mix_data&&(c.age_mix_data instanceof Error?$e.initialError=c.age_mix_data:$e.initialData=c.age_mix_data,c.age_mix_columns&&($e.knownColumns=c.age_mix_columns));let ra,Ce=!1;const ka=Ne.createReactive({callback:T=>{r(8,ra=T)},execFn:M},{id:"age_mix",...$e});ka(ta,{noResolve:me,...$e}),globalThis[Symbol.for("age_mix")]={get value(){return ra}};let ue={initialData:void 0,initialError:void 0},na=H`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${v.code}' as feature_key,
    bezirk_name as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Va}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`,ia=`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${v.code}' as feature_key,
    bezirk_name as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Va}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`;c.minimap_areas_data&&(c.minimap_areas_data instanceof Error?ue.initialError=c.minimap_areas_data:ue.initialData=c.minimap_areas_data,c.minimap_areas_columns&&(ue.knownColumns=c.minimap_areas_columns));let xe,Oa=!1;const Ra=Ne.createReactive({callback:T=>{r(9,xe=T)},execFn:M},{id:"minimap_areas",...ue});Ra(ia,{noResolve:na,...ue}),globalThis[Symbol.for("minimap_areas")]={get value(){return xe}};let we={initialData:void 0,initialError:void 0},fe=H`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/pgr/' || d.area_code as pgr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'pgr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'pgr'
  -- #255: defensive guard so a null/blank area_code (from mart_area_demographics; none exist
  -- today, but this belt-and-suspenders check keeps a future regression there from ever
  -- surfacing as a crawlable /berlin/area/pgr/undefined route) never reaches pgr_link.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 2) = '${v.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`,sa=`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/pgr/' || d.area_code as pgr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'pgr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'pgr'
  -- #255: defensive guard so a null/blank area_code (from mart_area_demographics; none exist
  -- today, but this belt-and-suspenders check keeps a future regression there from ever
  -- surfacing as a crawlable /berlin/area/pgr/undefined route) never reaches pgr_link.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 2) = '${v.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`;c.children_data&&(c.children_data instanceof Error?we.initialError=c.children_data:we.initialData=c.children_data,c.children_columns&&(we.knownColumns=c.children_columns));let He,xa=!1;const Me=Ne.createReactive({callback:T=>{r(10,He=T)},execFn:M},{id:"children",...we});Me(sa,{noResolve:fe,...we}),globalThis[Symbol.for("children")]={get value(){return He}};let Pe={initialData:void 0,initialError:void 0},ke=H`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`,Ae=`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`;c.ortsteile_data&&(c.ortsteile_data instanceof Error?Pe.initialError=c.ortsteile_data:Pe.initialData=c.ortsteile_data,c.ortsteile_columns&&(Pe.knownColumns=c.ortsteile_columns));let De,za=!1;const ze=Ne.createReactive({callback:T=>{r(11,De=T)},execFn:M},{id:"ortsteile",...Pe});return ze(Ae,{noResolve:ke,...Pe}),globalThis[Symbol.for("ortsteile")]={get value(){return De}},i.$$set=T=>{"data"in T&&r(15,z=T.data)},i.$$.update=()=>{var T;i.$$.dirty[0]&32768&&r(16,{data:c={},customFormattingSettings:C,__db:u}=z,c),i.$$.dirty[0]&65536&&Cr.set(Object.keys(c).length>0),i.$$.dirty[2]&128&&r(18,v=y.params),i.$$.dirty[0]&262144&&r(20,Ie=H`select bezirk_name
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'`),i.$$.dirty[0]&262144&&r(21,Oe=`select bezirk_name
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'`),i.$$.dirty[0]&7864320&&(Ie||!Na?Ie||(pa(Oe,{noResolve:Ie,...te}),r(22,Na=!0)):pa(Oe,{noResolve:Ie})),i.$$.dirty[0]&262144&&r(24,be=H`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),i.$$.dirty[0]&262144&&r(25,ee=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),i.$$.dirty[0]&125829120&&(be||!Ue?be||(Ee(ee,{noResolve:be,...he}),r(26,Ue=!0)):Ee(ee,{noResolve:be})),i.$$.dirty[0]&262144&&r(28,pe=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${v.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.gentrification_index
              where variant = 'live_data' and area_level = 'plr'
          )
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select stage, n_areas from mix order by n_areas desc limit 1),
    advanced as (
        select coalesce(sum(n_areas), 0) as n_advanced
        from mix
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&262144&&r(29,Ke=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${v.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.gentrification_index
              where variant = 'live_data' and area_level = 'plr'
          )
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select stage, n_areas from mix order by n_areas desc limit 1),
    advanced as (
        select coalesce(sum(n_areas), 0) as n_advanced
        from mix
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&2013265920&&(pe||!ja?pe||(ha(Ke,{noResolve:pe,...Te}),r(30,ja=!0)):ha(Ke,{noResolve:pe})),i.$$.dirty[0]&262144&&r(32,We=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[0]&262144&&r(33,Qe=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[1]&15&&(We||!qe?We||(ba(Qe,{noResolve:We,...re}),r(34,qe=!0)):ba(Qe,{noResolve:We})),i.$$.dirty[0]&262144&&r(36,Ge=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${v.code}'
  )
order by oa_domain desc`),i.$$.dirty[0]&262144&&r(37,Ve=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${v.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${v.code}'
  )
order by oa_domain desc`),i.$$.dirty[1]&240&&(Ge||!ya?Ge||(Je(Ve,{noResolve:Ge,...ne}),r(38,ya=!0)):Je(Ve,{noResolve:Ge})),i.$$.dirty[0]&393216&&r(40,P=H`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
-- /methodology-oa-modes original this table relocates from.
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see this page's header comment (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${E.dom_group.value}'
  and snapshot_year = ${E.dom_year.value}
  and substr(area_code, 1, 2) = '${v.code}'`),i.$$.dirty[0]&393216&&r(41,ae=`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
-- /methodology-oa-modes original this table relocates from.
select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see this page's header comment (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${E.dom_group.value}'
  and snapshot_year = ${E.dom_year.value}
  and substr(area_code, 1, 2) = '${v.code}'`),i.$$.dirty[1]&3840&&(P||!Aa?P||(Xe(ae,{noResolve:P,...ye}),r(42,Aa=!0)):Xe(ae,{noResolve:P})),i.$$.dirty[0]&393216&&r(44,ea=H`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no district-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,2) prefix filter this page already uses for every other
-- children query -- a filter, not a new aggregation.
select
    d.area_code,
    coalesce(gi.area_name, d.area_code) as area_name,
    d.hhi,
    d.top_share,
    d.top_child,
    d.top_child_offering_tier,
    d.n_children,
    d.group_stock_local,
    '/berlin/area/' || d.area_code as area_link
from gentriduck_marts.mart_poi_dominance as d
left join gentriduck_marts.gentrification_index as gi
  on
    gi.area_code = d.area_code and gi.variant = 'live_data' and gi.area_level = 'plr'
    and gi.city_code = 'BER'
    and gi.period_yyyymm = (
        select max(period_yyyymm) from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    )
where
    d.city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this table relocates from.
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see this page's header comment) -- without
    -- this, the same PLR resurfaces once per boundary vintage x weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${E.dom_group.value}'
    and d.snapshot_year = ${E.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${v.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&393216&&r(45,aa=`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no district-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,2) prefix filter this page already uses for every other
-- children query -- a filter, not a new aggregation.
select
    d.area_code,
    coalesce(gi.area_name, d.area_code) as area_name,
    d.hhi,
    d.top_share,
    d.top_child,
    d.top_child_offering_tier,
    d.n_children,
    d.group_stock_local,
    '/berlin/area/' || d.area_code as area_link
from gentriduck_marts.mart_poi_dominance as d
left join gentriduck_marts.gentrification_index as gi
  on
    gi.area_code = d.area_code and gi.variant = 'live_data' and gi.area_level = 'plr'
    and gi.city_code = 'BER'
    and gi.period_yyyymm = (
        select max(period_yyyymm) from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    )
where
    d.city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this table relocates from.
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see this page's header comment) -- without
    -- this, the same PLR resurfaces once per boundary vintage x weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${E.dom_group.value}'
    and d.snapshot_year = ${E.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${v.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&61440&&(ea||!Ia?ea||(va(aa,{noResolve:ea,..._e}),r(46,Ia=!0)):va(aa,{noResolve:ea})),i.$$.dirty[0]&262144&&r(48,Le=H`select
    reference_year,
    residents_total,
    age_under18_share,
    age_18_27_share,
    age_27_45_share,
    age_45_65_share,
    age_65plus_share,
    mean_age_years,
    any_indicator_suppressed,
    n_plr
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
order by reference_year desc
limit 1`),i.$$.dirty[0]&262144&&r(49,ve=`select
    reference_year,
    residents_total,
    age_under18_share,
    age_18_27_share,
    age_27_45_share,
    age_45_65_share,
    age_65plus_share,
    mean_age_years,
    any_indicator_suppressed,
    n_plr
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
order by reference_year desc
limit 1`),i.$$.dirty[1]&983040&&(Le||!Be?Le||(wa(ve,{noResolve:Le,...ce}),r(50,Be=!0)):wa(ve,{noResolve:Le})),i.$$.dirty[0]&262144&&r(52,me=H`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`),i.$$.dirty[0]&262144&&r(53,ta=`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${v.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`),i.$$.dirty[1]&15728640&&(me||!Ce?me||(ka(ta,{noResolve:me,...$e}),r(54,Ce=!0)):ka(ta,{noResolve:me})),i.$$.dirty[0]&262144&&r(56,na=H`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${v.code}' as feature_key,
    bezirk_name as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Va}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`),i.$$.dirty[0]&262144&&r(57,ia=`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${v.code}' as feature_key,
    bezirk_name as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = '${v.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Va}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`),i.$$.dirty[1]&251658240&&(na||!Oa?na||(Ra(ia,{noResolve:na,...ue}),r(58,Oa=!0)):Ra(ia,{noResolve:na})),i.$$.dirty[0]&262144&&r(60,fe=H`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/pgr/' || d.area_code as pgr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'pgr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'pgr'
  -- #255: defensive guard so a null/blank area_code (from mart_area_demographics; none exist
  -- today, but this belt-and-suspenders check keeps a future regression there from ever
  -- surfacing as a crawlable /berlin/area/pgr/undefined route) never reaches pgr_link.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 2) = '${v.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`),i.$$.dirty[0]&262144&&r(61,sa=`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/pgr/' || d.area_code as pgr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'pgr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'pgr'
  -- #255: defensive guard so a null/blank area_code (from mart_area_demographics; none exist
  -- today, but this belt-and-suspenders check keeps a future regression there from ever
  -- surfacing as a crawlable /berlin/area/pgr/undefined route) never reaches pgr_link.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 2) = '${v.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`),i.$$.dirty[1]&1879048192|i.$$.dirty[2]&1&&(fe||!xa?fe||(Me(sa,{noResolve:fe,...we}),r(62,xa=!0)):Me(sa,{noResolve:fe})),i.$$.dirty[0]&262144&&r(64,ke=H`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`),i.$$.dirty[0]&262144&&r(65,Ae=`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`),i.$$.dirty[2]&30&&(ke||!za?ke||(ze(Ae,{noResolve:ke,...Pe}),r(66,za=!0)):ze(Ae,{noResolve:ke})),i.$$.dirty[0]&1&&r(68,a=((T=ge==null?void 0:ge[0])==null?void 0:T.bezirk_name)??null),i.$$.dirty[2]&64&&r(14,s=[{label:"Berlin",href:"/berlin"},{label:"District & area profiles",href:"/berlin/area/bezirk"},{label:a??"District"}]),i.$$.dirty[2]&64&&r(13,o=a?`${a} — district profile · Berlin`:null),i.$$.dirty[0]&2&&r(67,g=de==null?void 0:de[0]),i.$$.dirty[2]&32&&r(12,_=!g||g.n_total==null||Number(g.n_total)===0?null:(()=>{const Ea=Number(g.n_total),Ta=Number(g.n_advanced||0),Fe=g.top_stage_share!=null?Number(g.top_stage_share):null,Ua=Fe!=null&&Fe>.5?`<b>${g.top_stage}</b> is the only stage holding a majority (${Math.round(Fe*100)}%)`:"no single stage holds a majority";return`<b>${Ta}</b> of <b>${Ea}</b> neighbourhoods (Planungsräume) here are classified <b>4 · Active gentrification</b> or <b>3 · Pioneer signal</b>; ${Ua} — a distribution across this district's own neighbourhoods, never a single re-scored gentrification-index value for the district itself.`})())},[ge,de,le,Ze,Se,Ye,Re,$a,ra,xe,He,De,_,o,s,z,c,E,v,te,Ie,Oe,Na,he,be,ee,Ue,Te,pe,Ke,ja,re,We,Qe,qe,ne,Ge,Ve,ya,ye,P,ae,Aa,_e,ea,aa,Ia,ce,Le,ve,Be,$e,me,ta,Ce,ue,na,ia,Oa,we,fe,sa,xa,Pe,ke,Ae,za,g,a,y]}class qn extends wr{constructor(t){super(),kr(this,t,dn,ln,fr,{data:15},null,[-1,-1,-1])}}export{qn as component};
