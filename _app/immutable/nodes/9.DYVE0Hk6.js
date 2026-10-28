import{s as mr,d as l,i as d,a as La,b as x,c as h,h as ur,e as q,f as lt,k as C,l as y,m as S,n as Ut,o as fr,p as gr,q as pr,r as hr,u as oe,g as vt,j as G,t as V,v as yr,H as br,w as Kt}from"../chunks/scheduler.CmMeO4ay.js";import{S as vr,i as $r,d as $,t as f,a as m,c as ie,m as w,b as k,e as R,g as se}from"../chunks/index.bfDa0Uqw.js";import{A as wr,P as kr,a as Rr}from"../chunks/PageTitle.nASIZfTP.js";import{F as xr}from"../chunks/FooterNav.BbND9dxm.js";import{H as zr}from"../chunks/Hero.wYia6TQ0.js";import{D as yt,C as ma}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as Za,w as Er}from"../chunks/entry.vKQYRLhF.js";import{A as ua}from"../chunks/Alert.BNZjDqvU.js";import{e as Tr,s as qr,Q as Ue,p as Sr,a as Wt,r as Qt,C as Br}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as M}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as Zt,a as ia}from"../chunks/Dropdown.zhownQxu.js";import{p as Cr}from"../chunks/stores.CGa44sBH.js";import{Q as Ke}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as ot}from"../chunks/BarChart.BZFK7Gke.js";import{B as bt}from"../chunks/BigValue.Cf_smc5N.js";import{p as Lr}from"../chunks/profile.BW8tN6E9.js";function Mr(i){var s;let t,r=(B.title??((s=B.og)==null?void 0:s.title))+"",a;return{c(){t=S("h1"),a=V(r),this.h()},l(o){t=q(o,"H1",{class:!0});var g=vt(t);a=G(g,r),g.forEach(l),this.h()},h(){x(t,"class","title")},m(o,g){d(o,t,g),La(t,a)},p:oe,d(o){o&&l(t)}}}function Hr(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:oe,p:oe,d:oe}}function Pr(i){var g;let t,r,a,s,o;return document.title=t=B.title??((g=B.og)==null?void 0:g.title),{c(){r=y(),a=S("meta"),s=y(),o=S("meta"),this.h()},l(_){r=h(_),a=q(_,"META",{property:!0,content:!0}),s=h(_),o=q(_,"META",{name:!0,content:!0}),this.h()},h(){var _,b;x(a,"property","og:title"),x(a,"content",((_=B.og)==null?void 0:_.title)??B.title),x(o,"name","twitter:title"),x(o,"content",((b=B.og)==null?void 0:b.title)??B.title)},m(_,b){d(_,r,b),d(_,a,b),d(_,s,b),d(_,o,b)},p(_,b){var p;b&0&&t!==(t=B.title??((p=B.og)==null?void 0:p.title))&&(document.title=t)},d(_){_&&(l(r),l(a),l(s),l(o))}}}function Dr(i){var o,g;let t,r,a=(B.description||((o=B.og)==null?void 0:o.description))&&Fr(),s=((g=B.og)==null?void 0:g.image)&&Ar();return{c(){a&&a.c(),t=y(),s&&s.c(),r=lt()},l(_){a&&a.l(_),t=h(_),s&&s.l(_),r=lt()},m(_,b){a&&a.m(_,b),d(_,t,b),s&&s.m(_,b),d(_,r,b)},p(_,b){var p,z;(B.description||(p=B.og)!=null&&p.description)&&a.p(_,b),(z=B.og)!=null&&z.image&&s.p(_,b)},d(_){_&&(l(t),l(r)),a&&a.d(_),s&&s.d(_)}}}function Fr(i){let t,r,a,s,o;return{c(){t=S("meta"),r=y(),a=S("meta"),s=y(),o=S("meta"),this.h()},l(g){t=q(g,"META",{name:!0,content:!0}),r=h(g),a=q(g,"META",{property:!0,content:!0}),s=h(g),o=q(g,"META",{name:!0,content:!0}),this.h()},h(){var g,_,b;x(t,"name","description"),x(t,"content",B.description??((g=B.og)==null?void 0:g.description)),x(a,"property","og:description"),x(a,"content",((_=B.og)==null?void 0:_.description)??B.description),x(o,"name","twitter:description"),x(o,"content",((b=B.og)==null?void 0:b.description)??B.description)},m(g,_){d(g,t,_),d(g,r,_),d(g,a,_),d(g,s,_),d(g,o,_)},p:oe,d(g){g&&(l(t),l(r),l(a),l(s),l(o))}}}function Ar(i){let t,r,a;return{c(){t=S("meta"),r=y(),a=S("meta"),this.h()},l(s){t=q(s,"META",{property:!0,content:!0}),r=h(s),a=q(s,"META",{name:!0,content:!0}),this.h()},h(){var s,o;x(t,"property","og:image"),x(t,"content",Wt((s=B.og)==null?void 0:s.image)),x(a,"name","twitter:image"),x(a,"content",Wt((o=B.og)==null?void 0:o.image))},m(s,o){d(s,t,o),d(s,r,o),d(s,a,o)},p:oe,d(s){s&&(l(t),l(r),l(a))}}}function Gt(i){let t,r;return t=new Ke({props:{queryID:"bezirk_name",queryResult:i[0]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function jr(i){let t,r,a="sums and population-weighted averages",s,o,g="methodology page",_,b,p="full neighbourhood list",z;return{c(){t=V("Figures on this page are "),r=S("b"),r.textContent=a,s=V(` of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  `),o=S("a"),o.textContent=g,_=V(` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),b=S("a"),b.textContent=p,z=V(` for the actual
  gentrification index and trajectory.`),this.h()},l(c){t=G(c,"Figures on this page are "),r=q(c,"B",{"data-svelte-h":!0}),C(r)!=="svelte-rhlwxq"&&(r.textContent=a),s=G(c,` of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  `),o=q(c,"A",{href:!0,"data-svelte-h":!0}),C(o)!=="svelte-1l2pw3"&&(o.textContent=g),_=G(c,` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),b=q(c,"A",{href:!0,"data-svelte-h":!0}),C(b)!=="svelte-z78e0k"&&(b.textContent=p),z=G(c,` for the actual
  gentrification index and trajectory.`),this.h()},h(){x(o,"href","/gentriduck/methodology"),x(b,"href","/gentriduck/berlin/area")},m(c,L){d(c,t,L),d(c,r,L),d(c,s,L),d(c,o,L),d(c,_,L),d(c,b,L),d(c,z,L)},p:oe,d(c){c&&(l(t),l(r),l(s),l(o),l(_),l(b),l(z))}}}function Vt(i){let t,r;return t=new Ke({props:{queryID:"stage_mix",queryResult:i[2]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Jt(i){let t,r;return t=new Ke({props:{queryID:"stage_mix_summary",queryResult:i[1]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Nr(i){let t,r;return t=new ua({props:{status:"warning",$$slots:{default:[Or]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[2]&134217728&&(o.$$scope={dirty:s,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Ir(i){let t,r;return{c(){t=S("p"),r=new br(!1),this.h()},l(a){t=q(a,"P",{});var s=vt(t);r=yr(s,!1),s.forEach(l),this.h()},h(){r.a=null},m(a,s){d(a,t,s),r.m(i[12],t)},p(a,s){s[0]&4096&&r.p(a[12])},i:oe,o:oe,d(a){a&&l(t)}}}function Or(i){let t;return{c(){t=V("No neighbourhood-stage data available for this district.")},l(r){t=G(r,"No neighbourhood-stage data available for this district.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function Yt(i){let t,r;return t=new Ke({props:{queryID:"poi_mix",queryResult:i[3]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Ur(i){let t,r="Context only — never a Kiez-level claim.",a,s,o="Offering Advantage decoder",g;return{c(){t=S("b"),t.textContent=r,a=V(` A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
  `),s=S("a"),s.textContent=o,g=V(` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),C(t)!=="svelte-a7l1s8"&&(t.textContent=r),a=G(_,` A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
  `),s=q(_,"A",{href:!0,"data-svelte-h":!0}),C(s)!=="svelte-168mye8"&&(s.textContent=o),g=G(_,` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(_,b){d(_,t,b),d(_,a,b),d(_,s,b),d(_,g,b)},p:oe,d(_){_&&(l(t),l(a),l(s),l(g))}}}function Xt(i){let t,r;return t=new Ke({props:{queryID:"oa_arealevel",queryResult:i[4]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function er(i){let t,r;return t=new ua({props:{status:"warning",$$slots:{default:[Kr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Kr(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,s,o="Offering Advantage decoder",g;return{c(){t=S("b"),t.textContent=r,a=V(` PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  `),s=S("a"),s.textContent=o,g=V(" §4/§7 for the full finding."),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),C(t)!=="svelte-1impqbu"&&(t.textContent=r),a=G(_,` PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  `),s=q(_,"A",{href:!0,"data-svelte-h":!0}),C(s)!=="svelte-168mye8"&&(s.textContent=o),g=G(_," §4/§7 for the full finding."),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(_,b){d(_,t,b),d(_,a,b),d(_,s,b),d(_,g,b)},p:oe,d(_){_&&(l(t),l(a),l(s),l(g))}}}function Wr(i){let t,r;return t=new ua({props:{status:"warning",$$slots:{default:[Zr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[2]&134217728&&(o.$$scope={dirty:s,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Qr(i){let t,r;return t=new ot({props:{data:i[4],x:"poi_domain_h",y:"pct_vs_baseline",title:i[0][0].bezirk_name+" — Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this district."}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&16&&(o.data=a[4]),s[0]&1&&(o.title=a[0][0].bezirk_name+" — Offering Advantage vs. Berlin average, by domain"),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Zr(i){let t;return{c(){t=V("No Offering Advantage data for this district.")},l(r){t=G(r,"No Offering Advantage data for this district.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function ar(i){let t,r;return t=new ua({props:{status:"info",$$slots:{default:[Gr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Gr(i){let t;return{c(){t=V(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=G(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function Vr(i){let t,r="Dominance is sign-blind",a,s,o="Offering Advantage decoder",g;return{c(){t=S("b"),t.textContent=r,a=V(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=S("a"),s.textContent=o,g=V(" §5 for the full ethics note."),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),C(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=G(_,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=q(_,"A",{href:!0,"data-svelte-h":!0}),C(s)!=="svelte-168mye8"&&(s.textContent=o),g=G(_," §5 for the full ethics note."),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(_,b){d(_,t,b),d(_,a,b),d(_,s,b),d(_,g,b)},p:oe,d(_){_&&(l(t),l(a),l(s),l(g))}}}function Jr(i){let t,r,a,s,o,g,_,b;return t=new ia({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new ia({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new ia({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),_=new ia({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){R(t.$$.fragment),r=y(),R(a.$$.fragment),s=y(),R(o.$$.fragment),g=y(),R(_.$$.fragment)},l(p){k(t.$$.fragment,p),r=h(p),k(a.$$.fragment,p),s=h(p),k(o.$$.fragment,p),g=h(p),k(_.$$.fragment,p)},m(p,z){w(t,p,z),d(p,r,z),w(a,p,z),d(p,s,z),w(o,p,z),d(p,g,z),w(_,p,z),b=!0},p:oe,i(p){b||(m(t.$$.fragment,p),m(a.$$.fragment,p),m(o.$$.fragment,p),m(_.$$.fragment,p),b=!0)},o(p){f(t.$$.fragment,p),f(a.$$.fragment,p),f(o.$$.fragment,p),f(_.$$.fragment,p),b=!1},d(p){p&&(l(r),l(s),l(g)),$(t,p),$(a,p),$(o,p),$(_,p)}}}function Yr(i){let t,r,a,s,o,g,_,b,p,z,c,L;return t=new ia({props:{value:"2025",valueLabel:"2025"}}),a=new ia({props:{value:"2024",valueLabel:"2024"}}),o=new ia({props:{value:"2023",valueLabel:"2023"}}),_=new ia({props:{value:"2022",valueLabel:"2022"}}),p=new ia({props:{value:"2021",valueLabel:"2021"}}),c=new ia({props:{value:"2020",valueLabel:"2020"}}),{c(){R(t.$$.fragment),r=y(),R(a.$$.fragment),s=y(),R(o.$$.fragment),g=y(),R(_.$$.fragment),b=y(),R(p.$$.fragment),z=y(),R(c.$$.fragment)},l(u){k(t.$$.fragment,u),r=h(u),k(a.$$.fragment,u),s=h(u),k(o.$$.fragment,u),g=h(u),k(_.$$.fragment,u),b=h(u),k(p.$$.fragment,u),z=h(u),k(c.$$.fragment,u)},m(u,E){w(t,u,E),d(u,r,E),w(a,u,E),d(u,s,E),w(o,u,E),d(u,g,E),w(_,u,E),d(u,b,E),w(p,u,E),d(u,z,E),w(c,u,E),L=!0},p:oe,i(u){L||(m(t.$$.fragment,u),m(a.$$.fragment,u),m(o.$$.fragment,u),m(_.$$.fragment,u),m(p.$$.fragment,u),m(c.$$.fragment,u),L=!0)},o(u){f(t.$$.fragment,u),f(a.$$.fragment,u),f(o.$$.fragment,u),f(_.$$.fragment,u),f(p.$$.fragment,u),f(c.$$.fragment,u),L=!1},d(u){u&&(l(r),l(s),l(g),l(b),l(z)),$(t,u),$(a,u),$(o,u),$(_,u),$(p,u),$(c,u)}}}function tr(i){let t,r;return t=new Ke({props:{queryID:"dom_suppressed_count",queryResult:i[5]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Xr(i){let t,r=(i[5][0]?i[5][0].n_suppressed:0)+"",a,s,o=(i[5][0]?i[5][0].n_suppressed+i[5][0].n_shown:0)+"",g,_,b;return{c(){t=S("b"),a=V(r),s=V(" of "),g=V(o),_=V(" neighbourhoods here are suppressed below as too thinly observed to characterize"),b=V(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(p){t=q(p,"B",{});var z=vt(t);a=G(z,r),s=G(z," of "),g=G(z,o),_=G(z," neighbourhoods here are suppressed below as too thinly observed to characterize"),z.forEach(l),b=G(p,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(p,z){d(p,t,z),La(t,a),La(t,s),La(t,g),La(t,_),d(p,b,z)},p(p,z){z[0]&32&&r!==(r=(p[5][0]?p[5][0].n_suppressed:0)+"")&&Kt(a,r),z[0]&32&&o!==(o=(p[5][0]?p[5][0].n_suppressed+p[5][0].n_shown:0)+"")&&Kt(g,o)},d(p){p&&(l(t),l(b))}}}function rr(i){let t,r;return t=new Ke({props:{queryID:"dominance_children",queryResult:i[6]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function en(i){let t,r,a,s,o,g,_,b,p,z,c,L;return t=new ma({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new ma({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new ma({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),_=new ma({props:{id:"top_child",title:"Leading type"}}),p=new ma({props:{id:"n_children",title:"Types in this group here"}}),c=new ma({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){R(t.$$.fragment),r=y(),R(a.$$.fragment),s=y(),R(o.$$.fragment),g=y(),R(_.$$.fragment),b=y(),R(p.$$.fragment),z=y(),R(c.$$.fragment)},l(u){k(t.$$.fragment,u),r=h(u),k(a.$$.fragment,u),s=h(u),k(o.$$.fragment,u),g=h(u),k(_.$$.fragment,u),b=h(u),k(p.$$.fragment,u),z=h(u),k(c.$$.fragment,u)},m(u,E){w(t,u,E),d(u,r,E),w(a,u,E),d(u,s,E),w(o,u,E),d(u,g,E),w(_,u,E),d(u,b,E),w(p,u,E),d(u,z,E),w(c,u,E),L=!0},p:oe,i(u){L||(m(t.$$.fragment,u),m(a.$$.fragment,u),m(o.$$.fragment,u),m(_.$$.fragment,u),m(p.$$.fragment,u),m(c.$$.fragment,u),L=!0)},o(u){f(t.$$.fragment,u),f(a.$$.fragment,u),f(o.$$.fragment,u),f(_.$$.fragment,u),f(p.$$.fragment,u),f(c.$$.fragment,u),L=!1},d(u){u&&(l(r),l(s),l(g),l(b),l(z)),$(t,u),$(a,u),$(o,u),$(_,u),$(p,u),$(c,u)}}}function nr(i){let t,r;return t=new Ke({props:{queryID:"demographics",queryResult:i[7]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ir(i){let t,r;return t=new ua({props:{status:"warning",$$slots:{default:[an]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function an(i){let t;return{c(){t=V(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.`)},l(r){t=G(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function sr(i){let t,r;return t=new Ke({props:{queryID:"age_mix",queryResult:i[8]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function or(i){let t,r;return t=new Ke({props:{queryID:"minimap_areas",queryResult:i[9]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function lr(i){let t,r;return t=new Ke({props:{queryID:"children",queryResult:i[10]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&1024&&(o.queryResult=a[10]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function tn(i){let t,r,a,s;return t=new ma({props:{id:"area_name",title:"Prognoseraum"}}),a=new ma({props:{id:"residents_total",title:"Residents",fmt:"num0"}}),{c(){R(t.$$.fragment),r=y(),R(a.$$.fragment)},l(o){k(t.$$.fragment,o),r=h(o),k(a.$$.fragment,o)},m(o,g){w(t,o,g),d(o,r,g),w(a,o,g),s=!0},p:oe,i(o){s||(m(t.$$.fragment,o),m(a.$$.fragment,o),s=!0)},o(o){f(t.$$.fragment,o),f(a.$$.fragment,o),s=!1},d(o){o&&l(r),$(t,o),$(a,o)}}}function dr(i){let t,r;return t=new Ke({props:{queryID:"ortsteile",queryResult:i[11]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function rn(i){let t,r;return t=new ma({props:{id:"area_name",title:"Ortsteil"}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p:oe,i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function nn(i){var Bt;let t,r,a,s,o,g,_,b,p,z,c,L,u,E=`<a href="/gentriduck/berlin/area/bezirk" class="markdown">All districts</a> · <a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a> ·
<a href="/gentriduck/berlin/area-detail" class="markdown">district browse</a>`,Ha,H,v,ae,Qe='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Ze,fe,Pa=`Every neighbourhood (Planungsraum) in this district is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This district&#39;s own page reports the
<strong class="markdown">distribution</strong> of those neighbourhood-level stages — never a single re-scored index value for the
district itself, since averaging ordinal stage codes across such different neighbourhoods would
mask exactly the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on
(see &quot;Honest caveats&quot; below).`,fa,ge,pe,ee,le,Ge,Te,qe,te,ga='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',We,Re,Da='<a href="#mapped-places">Mapped places</a>',Se,he,ye,pa,xe,Fa='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',Be,de,Ve,Je,Ye,_e,P,be,sa=i[4].some(_r),Xe,Ce,Aa=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule, or <a href="/gentriduck/berlin/area" class="markdown">this district&#39;s neighbourhoods</a> for the canonical PLR-grain
figure.`,Le,re,ha='<a href="#within-group-dominance">Within-group dominance</a>',ya,Me,ba,ce,He,ve,va,ea,Pe,De,$e,we,$a,Fe,ja=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Ae,ne,wa='<a href="#people--structure">People &amp; structure</a>',ka,aa,je,Ne,me,ta,Ie,Ra,ra,ke,ue,na,ze,Na='<a href="#where-this-area-sits">Where this area sits</a>',xa,T,Oe,Ia,Ee,Ga='<a href="#prognoseräume-in-this-district">Prognoseräume in this district</a>',Va,Oa,za,Ja,oa,$t='<a href="#ortsteile-in-this-district">Ortsteile in this district</a>',Ya,Ea,wt=`Ortsteil (Stadtteil) is a different, non-LOR district subdivision (it does not nest into the
Prognoseraum/Bezirksregion/Planungsraum ladder above) — see the
<a href="/gentriduck/berlin/area/ortsteil" class="markdown">Ortsteil profile page</a> for how its own neighbourhood rollup is built.`,Xa,Ua,Ta,et,la,kt='<a href="#honest-caveats">Honest caveats</a>',at,qa,Rt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this district</strong> — only
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,tt,da,xt='<a href="#further-reading">Further reading</a>',rt,Sa,zt=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other districts, or drill into any of this district&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,nt,Ka,it,Ma,st,_a=typeof B<"u"&&(B.title||((Bt=B.og)==null?void 0:Bt.title))&&B.hide_title!==!0&&Mr();function cr(e,n){var Qa;return typeof B<"u"&&(B.title||(Qa=B.og)!=null&&Qa.title)?Pr:Hr}let Wa=cr()(i),ca=typeof B=="object"&&Dr(),D=i[0]&&Gt(i);_=new wr({props:{crumbs:i[14]}}),p=new kr({props:{title:i[13]}}),c=new zr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:i[0][0].bezirk_name+" — district profile",lede:"Population, composition, and neighbourhood-stage mix for this district, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain."}}),H=new ua({props:{status:"info",$$slots:{default:[jr]},$$scope:{ctx:i}}});let F=i[2]&&Vt(i),A=i[1]&&Jt(i);const Et=[Ir,Nr],Ba=[];function Tt(e,n){return e[12]?0:1}ee=Tt(i),le=Ba[ee]=Et[ee](i),Te=new ot({props:{data:i[2],x:"stage",y:"n_areas",title:"Neighbourhoods by stage, "+i[0][0].bezirk_name,swapXY:"true"}});let j=i[3]&&Yt(i);ye=new ot({props:{data:i[3],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+i[0][0].bezirk_name,swapXY:"true"}}),de=new ua({props:{status:"warning",$$slots:{default:[Ur]},$$scope:{ctx:i}}});let N=i[4]&&Xt(i),J=i[4][0]&&i[4][0].maup_caveat_required&&er(i);const qt=[Qr,Wr],Ca=[];function St(e,n){return e[4].length>0?0:1}_e=St(i),P=Ca[_e]=qt[_e](i);let Y=sa&&ar(i);Me=new ua({props:{status:"info",$$slots:{default:[Vr]},$$scope:{ctx:i}}}),ce=new Zt({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[Jr]},$$scope:{ctx:i}}}),ve=new Zt({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[Yr]},$$scope:{ctx:i}}});let I=i[5]&&tr(i);Pe=new ua({props:{status:"info",$$slots:{default:[Xr]},$$scope:{ctx:i}}});let O=i[6]&&rr(i);we=new yt({props:{data:i[6],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this district.",$$slots:{default:[en]},$$scope:{ctx:i}}});let U=i[7]&&nr(i);je=new bt({props:{data:i[7],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),me=new bt({props:{data:i[7],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),Ie=new bt({props:{data:i[7],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let X=i[7]&&i[7][0]&&i[7][0].any_indicator_suppressed&&ir(i),K=i[8]&&sr(i);ue=new ot({props:{data:i[8],x:"age_band",y:"share",title:"Age structure, "+i[0][0].bezirk_name,yFmt:"pct0"}});let W=i[9]&&or(i);Oe=new Rr({props:{data:i[9],geoJsonUrl:`${Za}/geo/bezirk_pgr_drilldown.geojson`,title:(i[0][0]?i[0][0].bezirk_name:"This district")+" and its Prognoseräume"}});let Q=i[10]&&lr(i);za=new yt({props:{data:i[10],rows:"20",link:"pgr_link",$$slots:{default:[tn]},$$scope:{ctx:i}}});let Z=i[11]&&dr(i);return Ta=new yt({props:{data:i[11],rows:"20",link:"ortsteil_link",$$slots:{default:[rn]},$$scope:{ctx:i}}}),Ma=new xr({}),{c(){_a&&_a.c(),t=y(),Wa.c(),r=S("meta"),a=S("meta"),ca&&ca.c(),s=lt(),o=y(),D&&D.c(),g=y(),R(_.$$.fragment),b=y(),R(p.$$.fragment),z=y(),R(c.$$.fragment),L=y(),u=S("p"),u.innerHTML=E,Ha=y(),R(H.$$.fragment),v=y(),ae=S("h2"),ae.innerHTML=Qe,Ze=y(),fe=S("p"),fe.innerHTML=Pa,fa=y(),F&&F.c(),ge=y(),A&&A.c(),pe=y(),le.c(),Ge=y(),R(Te.$$.fragment),qe=y(),te=S("h2"),te.innerHTML=ga,We=y(),Re=S("h3"),Re.innerHTML=Da,Se=y(),j&&j.c(),he=y(),R(ye.$$.fragment),pa=y(),xe=S("h3"),xe.innerHTML=Fa,Be=y(),R(de.$$.fragment),Ve=y(),N&&N.c(),Je=y(),J&&J.c(),Ye=y(),P.c(),be=y(),Y&&Y.c(),Xe=y(),Ce=S("p"),Ce.innerHTML=Aa,Le=y(),re=S("h2"),re.innerHTML=ha,ya=y(),R(Me.$$.fragment),ba=y(),R(ce.$$.fragment),He=y(),R(ve.$$.fragment),va=y(),I&&I.c(),ea=y(),R(Pe.$$.fragment),De=y(),O&&O.c(),$e=y(),R(we.$$.fragment),$a=y(),Fe=S("p"),Fe.innerHTML=ja,Ae=y(),ne=S("h2"),ne.innerHTML=wa,ka=y(),U&&U.c(),aa=y(),R(je.$$.fragment),Ne=y(),R(me.$$.fragment),ta=y(),R(Ie.$$.fragment),Ra=y(),X&&X.c(),ra=y(),K&&K.c(),ke=y(),R(ue.$$.fragment),na=y(),ze=S("h2"),ze.innerHTML=Na,xa=y(),W&&W.c(),T=y(),R(Oe.$$.fragment),Ia=y(),Ee=S("h3"),Ee.innerHTML=Ga,Va=y(),Q&&Q.c(),Oa=y(),R(za.$$.fragment),Ja=y(),oa=S("h3"),oa.innerHTML=$t,Ya=y(),Ea=S("p"),Ea.innerHTML=wt,Xa=y(),Z&&Z.c(),Ua=y(),R(Ta.$$.fragment),et=y(),la=S("h2"),la.innerHTML=kt,at=y(),qa=S("ul"),qa.innerHTML=Rt,tt=y(),da=S("h2"),da.innerHTML=xt,rt=y(),Sa=S("p"),Sa.innerHTML=zt,nt=y(),Ka=S("hr"),it=y(),R(Ma.$$.fragment),this.h()},l(e){_a&&_a.l(e),t=h(e);const n=ur("svelte-2igo1p",document.head);Wa.l(n),r=q(n,"META",{name:!0,content:!0}),a=q(n,"META",{name:!0,content:!0}),ca&&ca.l(n),s=lt(),n.forEach(l),o=h(e),D&&D.l(e),g=h(e),k(_.$$.fragment,e),b=h(e),k(p.$$.fragment,e),z=h(e),k(c.$$.fragment,e),L=h(e),u=q(e,"P",{class:!0,"data-svelte-h":!0}),C(u)!=="svelte-ii1lbl"&&(u.innerHTML=E),Ha=h(e),k(H.$$.fragment,e),v=h(e),ae=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(ae)!=="svelte-14f17uo"&&(ae.innerHTML=Qe),Ze=h(e),fe=q(e,"P",{class:!0,"data-svelte-h":!0}),C(fe)!=="svelte-1vk2ss4"&&(fe.innerHTML=Pa),fa=h(e),F&&F.l(e),ge=h(e),A&&A.l(e),pe=h(e),le.l(e),Ge=h(e),k(Te.$$.fragment,e),qe=h(e),te=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(te)!=="svelte-1i9w9pn"&&(te.innerHTML=ga),We=h(e),Re=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),C(Re)!=="svelte-3hvew3"&&(Re.innerHTML=Da),Se=h(e),j&&j.l(e),he=h(e),k(ye.$$.fragment,e),pa=h(e),xe=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),C(xe)!=="svelte-5mc7pd"&&(xe.innerHTML=Fa),Be=h(e),k(de.$$.fragment,e),Ve=h(e),N&&N.l(e),Je=h(e),J&&J.l(e),Ye=h(e),P.l(e),be=h(e),Y&&Y.l(e),Xe=h(e),Ce=q(e,"P",{class:!0,"data-svelte-h":!0}),C(Ce)!=="svelte-ub6827"&&(Ce.innerHTML=Aa),Le=h(e),re=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(re)!=="svelte-4kb45v"&&(re.innerHTML=ha),ya=h(e),k(Me.$$.fragment,e),ba=h(e),k(ce.$$.fragment,e),He=h(e),k(ve.$$.fragment,e),va=h(e),I&&I.l(e),ea=h(e),k(Pe.$$.fragment,e),De=h(e),O&&O.l(e),$e=h(e),k(we.$$.fragment,e),$a=h(e),Fe=q(e,"P",{class:!0,"data-svelte-h":!0}),C(Fe)!=="svelte-1xa7bh7"&&(Fe.innerHTML=ja),Ae=h(e),ne=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(ne)!=="svelte-1mdzqzc"&&(ne.innerHTML=wa),ka=h(e),U&&U.l(e),aa=h(e),k(je.$$.fragment,e),Ne=h(e),k(me.$$.fragment,e),ta=h(e),k(Ie.$$.fragment,e),Ra=h(e),X&&X.l(e),ra=h(e),K&&K.l(e),ke=h(e),k(ue.$$.fragment,e),na=h(e),ze=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(ze)!=="svelte-60cjj9"&&(ze.innerHTML=Na),xa=h(e),W&&W.l(e),T=h(e),k(Oe.$$.fragment,e),Ia=h(e),Ee=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),C(Ee)!=="svelte-1krkey9"&&(Ee.innerHTML=Ga),Va=h(e),Q&&Q.l(e),Oa=h(e),k(za.$$.fragment,e),Ja=h(e),oa=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),C(oa)!=="svelte-984tou"&&(oa.innerHTML=$t),Ya=h(e),Ea=q(e,"P",{class:!0,"data-svelte-h":!0}),C(Ea)!=="svelte-1ttuuyo"&&(Ea.innerHTML=wt),Xa=h(e),Z&&Z.l(e),Ua=h(e),k(Ta.$$.fragment,e),et=h(e),la=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(la)!=="svelte-ad0syq"&&(la.innerHTML=kt),at=h(e),qa=q(e,"UL",{class:!0,"data-svelte-h":!0}),C(qa)!=="svelte-vmlcgf"&&(qa.innerHTML=Rt),tt=h(e),da=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),C(da)!=="svelte-oimjns"&&(da.innerHTML=xt),rt=h(e),Sa=q(e,"P",{class:!0,"data-svelte-h":!0}),C(Sa)!=="svelte-1ga3uyz"&&(Sa.innerHTML=zt),nt=h(e),Ka=q(e,"HR",{class:!0}),it=h(e),k(Ma.$$.fragment,e),this.h()},h(){x(r,"name","twitter:card"),x(r,"content","summary_large_image"),x(a,"name","twitter:site"),x(a,"content","@evidence_dev"),x(u,"class","markdown"),x(ae,"class","markdown"),x(ae,"id","social-status--trajectory"),x(fe,"class","markdown"),x(te,"class","markdown"),x(te,"id","commercial-mix--offering-advantage"),x(Re,"class","markdown"),x(Re,"id","mapped-places"),x(xe,"class","markdown"),x(xe,"id","offering-advantage-across-the-area-hierarchy"),x(Ce,"class","markdown"),x(re,"class","markdown"),x(re,"id","within-group-dominance"),x(Fe,"class","markdown"),x(ne,"class","markdown"),x(ne,"id","people--structure"),x(ze,"class","markdown"),x(ze,"id","where-this-area-sits"),x(Ee,"class","markdown"),x(Ee,"id","prognoseräume-in-this-district"),x(oa,"class","markdown"),x(oa,"id","ortsteile-in-this-district"),x(Ea,"class","markdown"),x(la,"class","markdown"),x(la,"id","honest-caveats"),x(qa,"class","markdown"),x(da,"class","markdown"),x(da,"id","further-reading"),x(Sa,"class","markdown"),x(Ka,"class","markdown")},m(e,n){_a&&_a.m(e,n),d(e,t,n),Wa.m(document.head,null),La(document.head,r),La(document.head,a),ca&&ca.m(document.head,null),La(document.head,s),d(e,o,n),D&&D.m(e,n),d(e,g,n),w(_,e,n),d(e,b,n),w(p,e,n),d(e,z,n),w(c,e,n),d(e,L,n),d(e,u,n),d(e,Ha,n),w(H,e,n),d(e,v,n),d(e,ae,n),d(e,Ze,n),d(e,fe,n),d(e,fa,n),F&&F.m(e,n),d(e,ge,n),A&&A.m(e,n),d(e,pe,n),Ba[ee].m(e,n),d(e,Ge,n),w(Te,e,n),d(e,qe,n),d(e,te,n),d(e,We,n),d(e,Re,n),d(e,Se,n),j&&j.m(e,n),d(e,he,n),w(ye,e,n),d(e,pa,n),d(e,xe,n),d(e,Be,n),w(de,e,n),d(e,Ve,n),N&&N.m(e,n),d(e,Je,n),J&&J.m(e,n),d(e,Ye,n),Ca[_e].m(e,n),d(e,be,n),Y&&Y.m(e,n),d(e,Xe,n),d(e,Ce,n),d(e,Le,n),d(e,re,n),d(e,ya,n),w(Me,e,n),d(e,ba,n),w(ce,e,n),d(e,He,n),w(ve,e,n),d(e,va,n),I&&I.m(e,n),d(e,ea,n),w(Pe,e,n),d(e,De,n),O&&O.m(e,n),d(e,$e,n),w(we,e,n),d(e,$a,n),d(e,Fe,n),d(e,Ae,n),d(e,ne,n),d(e,ka,n),U&&U.m(e,n),d(e,aa,n),w(je,e,n),d(e,Ne,n),w(me,e,n),d(e,ta,n),w(Ie,e,n),d(e,Ra,n),X&&X.m(e,n),d(e,ra,n),K&&K.m(e,n),d(e,ke,n),w(ue,e,n),d(e,na,n),d(e,ze,n),d(e,xa,n),W&&W.m(e,n),d(e,T,n),w(Oe,e,n),d(e,Ia,n),d(e,Ee,n),d(e,Va,n),Q&&Q.m(e,n),d(e,Oa,n),w(za,e,n),d(e,Ja,n),d(e,oa,n),d(e,Ya,n),d(e,Ea,n),d(e,Xa,n),Z&&Z.m(e,n),d(e,Ua,n),w(Ta,e,n),d(e,et,n),d(e,la,n),d(e,at,n),d(e,qa,n),d(e,tt,n),d(e,da,n),d(e,rt,n),d(e,Sa,n),d(e,nt,n),d(e,Ka,n),d(e,it,n),w(Ma,e,n),st=!0},p(e,n){var Ot;typeof B<"u"&&(B.title||(Ot=B.og)!=null&&Ot.title)&&B.hide_title!==!0&&_a.p(e,n),Wa.p(e,n),typeof B=="object"&&ca.p(e,n),e[0]?D?(D.p(e,n),n[0]&1&&m(D,1)):(D=Gt(e),D.c(),m(D,1),D.m(g.parentNode,g)):D&&(se(),f(D,1,1,()=>{D=null}),ie());const Qa={};n[0]&16384&&(Qa.crumbs=e[14]),_.$set(Qa);const Ct={};n[0]&8192&&(Ct.title=e[13]),p.$set(Ct);const Lt={};n[0]&1&&(Lt.title=e[0][0].bezirk_name+" — district profile"),c.$set(Lt);const Mt={};n[2]&134217728&&(Mt.$$scope={dirty:n,ctx:e}),H.$set(Mt),e[2]?F?(F.p(e,n),n[0]&4&&m(F,1)):(F=Vt(e),F.c(),m(F,1),F.m(ge.parentNode,ge)):F&&(se(),f(F,1,1,()=>{F=null}),ie()),e[1]?A?(A.p(e,n),n[0]&2&&m(A,1)):(A=Jt(e),A.c(),m(A,1),A.m(pe.parentNode,pe)):A&&(se(),f(A,1,1,()=>{A=null}),ie());let dt=ee;ee=Tt(e),ee===dt?Ba[ee].p(e,n):(se(),f(Ba[dt],1,1,()=>{Ba[dt]=null}),ie(),le=Ba[ee],le?le.p(e,n):(le=Ba[ee]=Et[ee](e),le.c()),m(le,1),le.m(Ge.parentNode,Ge));const _t={};n[0]&4&&(_t.data=e[2]),n[0]&1&&(_t.title="Neighbourhoods by stage, "+e[0][0].bezirk_name),Te.$set(_t),e[3]?j?(j.p(e,n),n[0]&8&&m(j,1)):(j=Yt(e),j.c(),m(j,1),j.m(he.parentNode,he)):j&&(se(),f(j,1,1,()=>{j=null}),ie());const ct={};n[0]&8&&(ct.data=e[3]),n[0]&1&&(ct.title="Mapped places by category (latest snapshot), "+e[0][0].bezirk_name),ye.$set(ct);const Ht={};n[2]&134217728&&(Ht.$$scope={dirty:n,ctx:e}),de.$set(Ht),e[4]?N?(N.p(e,n),n[0]&16&&m(N,1)):(N=Xt(e),N.c(),m(N,1),N.m(Je.parentNode,Je)):N&&(se(),f(N,1,1,()=>{N=null}),ie()),e[4][0]&&e[4][0].maup_caveat_required?J?n[0]&16&&m(J,1):(J=er(e),J.c(),m(J,1),J.m(Ye.parentNode,Ye)):J&&(se(),f(J,1,1,()=>{J=null}),ie());let mt=_e;_e=St(e),_e===mt?Ca[_e].p(e,n):(se(),f(Ca[mt],1,1,()=>{Ca[mt]=null}),ie(),P=Ca[_e],P?P.p(e,n):(P=Ca[_e]=qt[_e](e),P.c()),m(P,1),P.m(be.parentNode,be)),n[0]&16&&(sa=e[4].some(_r)),sa?Y?n[0]&16&&m(Y,1):(Y=ar(e),Y.c(),m(Y,1),Y.m(Xe.parentNode,Xe)):Y&&(se(),f(Y,1,1,()=>{Y=null}),ie());const Pt={};n[2]&134217728&&(Pt.$$scope={dirty:n,ctx:e}),Me.$set(Pt);const Dt={};n[2]&134217728&&(Dt.$$scope={dirty:n,ctx:e}),ce.$set(Dt);const Ft={};n[2]&134217728&&(Ft.$$scope={dirty:n,ctx:e}),ve.$set(Ft),e[5]?I?(I.p(e,n),n[0]&32&&m(I,1)):(I=tr(e),I.c(),m(I,1),I.m(ea.parentNode,ea)):I&&(se(),f(I,1,1,()=>{I=null}),ie());const At={};n[0]&32|n[2]&134217728&&(At.$$scope={dirty:n,ctx:e}),Pe.$set(At),e[6]?O?(O.p(e,n),n[0]&64&&m(O,1)):(O=rr(e),O.c(),m(O,1),O.m($e.parentNode,$e)):O&&(se(),f(O,1,1,()=>{O=null}),ie());const ut={};n[0]&64&&(ut.data=e[6]),n[2]&134217728&&(ut.$$scope={dirty:n,ctx:e}),we.$set(ut),e[7]?U?(U.p(e,n),n[0]&128&&m(U,1)):(U=nr(e),U.c(),m(U,1),U.m(aa.parentNode,aa)):U&&(se(),f(U,1,1,()=>{U=null}),ie());const jt={};n[0]&128&&(jt.data=e[7]),je.$set(jt);const Nt={};n[0]&128&&(Nt.data=e[7]),me.$set(Nt);const It={};n[0]&128&&(It.data=e[7]),Ie.$set(It),e[7]&&e[7][0]&&e[7][0].any_indicator_suppressed?X?n[0]&128&&m(X,1):(X=ir(e),X.c(),m(X,1),X.m(ra.parentNode,ra)):X&&(se(),f(X,1,1,()=>{X=null}),ie()),e[8]?K?(K.p(e,n),n[0]&256&&m(K,1)):(K=sr(e),K.c(),m(K,1),K.m(ke.parentNode,ke)):K&&(se(),f(K,1,1,()=>{K=null}),ie());const ft={};n[0]&256&&(ft.data=e[8]),n[0]&1&&(ft.title="Age structure, "+e[0][0].bezirk_name),ue.$set(ft),e[9]?W?(W.p(e,n),n[0]&512&&m(W,1)):(W=or(e),W.c(),m(W,1),W.m(T.parentNode,T)):W&&(se(),f(W,1,1,()=>{W=null}),ie());const gt={};n[0]&512&&(gt.data=e[9]),n[0]&1&&(gt.title=(e[0][0]?e[0][0].bezirk_name:"This district")+" and its Prognoseräume"),Oe.$set(gt),e[10]?Q?(Q.p(e,n),n[0]&1024&&m(Q,1)):(Q=lr(e),Q.c(),m(Q,1),Q.m(Oa.parentNode,Oa)):Q&&(se(),f(Q,1,1,()=>{Q=null}),ie());const pt={};n[0]&1024&&(pt.data=e[10]),n[2]&134217728&&(pt.$$scope={dirty:n,ctx:e}),za.$set(pt),e[11]?Z?(Z.p(e,n),n[0]&2048&&m(Z,1)):(Z=dr(e),Z.c(),m(Z,1),Z.m(Ua.parentNode,Ua)):Z&&(se(),f(Z,1,1,()=>{Z=null}),ie());const ht={};n[0]&2048&&(ht.data=e[11]),n[2]&134217728&&(ht.$$scope={dirty:n,ctx:e}),Ta.$set(ht)},i(e){st||(m(D),m(_.$$.fragment,e),m(p.$$.fragment,e),m(c.$$.fragment,e),m(H.$$.fragment,e),m(F),m(A),m(le),m(Te.$$.fragment,e),m(j),m(ye.$$.fragment,e),m(de.$$.fragment,e),m(N),m(J),m(P),m(Y),m(Me.$$.fragment,e),m(ce.$$.fragment,e),m(ve.$$.fragment,e),m(I),m(Pe.$$.fragment,e),m(O),m(we.$$.fragment,e),m(U),m(je.$$.fragment,e),m(me.$$.fragment,e),m(Ie.$$.fragment,e),m(X),m(K),m(ue.$$.fragment,e),m(W),m(Oe.$$.fragment,e),m(Q),m(za.$$.fragment,e),m(Z),m(Ta.$$.fragment,e),m(Ma.$$.fragment,e),st=!0)},o(e){f(D),f(_.$$.fragment,e),f(p.$$.fragment,e),f(c.$$.fragment,e),f(H.$$.fragment,e),f(F),f(A),f(le),f(Te.$$.fragment,e),f(j),f(ye.$$.fragment,e),f(de.$$.fragment,e),f(N),f(J),f(P),f(Y),f(Me.$$.fragment,e),f(ce.$$.fragment,e),f(ve.$$.fragment,e),f(I),f(Pe.$$.fragment,e),f(O),f(we.$$.fragment,e),f(U),f(je.$$.fragment,e),f(me.$$.fragment,e),f(Ie.$$.fragment,e),f(X),f(K),f(ue.$$.fragment,e),f(W),f(Oe.$$.fragment,e),f(Q),f(za.$$.fragment,e),f(Z),f(Ta.$$.fragment,e),f(Ma.$$.fragment,e),st=!1},d(e){e&&(l(t),l(o),l(g),l(b),l(z),l(L),l(u),l(Ha),l(v),l(ae),l(Ze),l(fe),l(fa),l(ge),l(pe),l(Ge),l(qe),l(te),l(We),l(Re),l(Se),l(he),l(pa),l(xe),l(Be),l(Ve),l(Je),l(Ye),l(be),l(Xe),l(Ce),l(Le),l(re),l(ya),l(ba),l(He),l(va),l(ea),l(De),l($e),l($a),l(Fe),l(Ae),l(ne),l(ka),l(aa),l(Ne),l(ta),l(Ra),l(ra),l(ke),l(na),l(ze),l(xa),l(T),l(Ia),l(Ee),l(Va),l(Oa),l(Ja),l(oa),l(Ya),l(Ea),l(Xa),l(Ua),l(et),l(la),l(at),l(qa),l(tt),l(da),l(rt),l(Sa),l(nt),l(Ka),l(it)),_a&&_a.d(e),Wa.d(e),l(r),l(a),ca&&ca.d(e),l(s),D&&D.d(e),$(_,e),$(p,e),$(c,e),$(H,e),F&&F.d(e),A&&A.d(e),Ba[ee].d(e),$(Te,e),j&&j.d(e),$(ye,e),$(de,e),N&&N.d(e),J&&J.d(e),Ca[_e].d(e),Y&&Y.d(e),$(Me,e),$(ce,e),$(ve,e),I&&I.d(e),$(Pe,e),O&&O.d(e),$(we,e),U&&U.d(e),$(je,e),$(me,e),$(Ie,e),X&&X.d(e),K&&K.d(e),$(ue,e),W&&W.d(e),$(Oe,e),Q&&Q.d(e),$(za,e),Z&&Z.d(e),$(Ta,e),$(Ma,e)}}}const B={},_r=i=>i.oa_domain_min_base_flag;function sn(i,t,r){let a,s,o,g,_,b,p;Ut(i,Cr,T=>r(69,b=T)),Ut(i,Qt,T=>r(73,p=T));let{data:z}=t,{data:c={},customFormattingSettings:L,__db:u,inputs:E}=z;fr(Qt,p="232b0788e82321534e0845a0d8ea883d",p);let Ha=Tr(Er(E));gr(Ha.subscribe(T=>r(17,E=T))),pr(Br,{getCustomFormats:()=>L.customFormats||[]});const H=(T,Oe)=>Lr(u.query,T,{query_name:Oe});qr(H);let v=b.params;hr(()=>!0);let ae={initialData:void 0,initialError:void 0},Qe=M`select bezirk_name
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
where bezirk_code = '${v.code}'`,Ze=`select bezirk_name
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
where bezirk_code = '${v.code}'`;c.bezirk_name_data&&(c.bezirk_name_data instanceof Error?ae.initialError=c.bezirk_name_data:ae.initialData=c.bezirk_name_data,c.bezirk_name_columns&&(ae.knownColumns=c.bezirk_name_columns));let fe,Pa=!1;const fa=Ue.createReactive({callback:T=>{r(0,fe=T)},execFn:H},{id:"bezirk_name",...ae});fa(Ze,{noResolve:Qe,...ae}),globalThis[Symbol.for("bezirk_name")]={get value(){return fe}};let ge={initialData:void 0,initialError:void 0},pe=M`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`,ee=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`;c.stage_mix_data&&(c.stage_mix_data instanceof Error?ge.initialError=c.stage_mix_data:ge.initialData=c.stage_mix_data,c.stage_mix_columns&&(ge.knownColumns=c.stage_mix_columns));let le,Ge=!1;const Te=Ue.createReactive({callback:T=>{r(2,le=T)},execFn:H},{id:"stage_mix",...ge});Te(ee,{noResolve:pe,...ge}),globalThis[Symbol.for("stage_mix")]={get value(){return le}};let qe={initialData:void 0,initialError:void 0},te=M`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
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
        where stage in ('active-gentrification', 'pioneer-signal')
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`,ga=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
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
        where stage in ('active-gentrification', 'pioneer-signal')
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`;c.stage_mix_summary_data&&(c.stage_mix_summary_data instanceof Error?qe.initialError=c.stage_mix_summary_data:qe.initialData=c.stage_mix_summary_data,c.stage_mix_summary_columns&&(qe.knownColumns=c.stage_mix_summary_columns));let We,Re=!1;const Da=Ue.createReactive({callback:T=>{r(1,We=T)},execFn:H},{id:"stage_mix_summary",...qe});Da(ga,{noResolve:te,...qe}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return We}};let Se={initialData:void 0,initialError:void 0},he=M`select
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
order by poi_count desc`,ye=`select
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
order by poi_count desc`;c.poi_mix_data&&(c.poi_mix_data instanceof Error?Se.initialError=c.poi_mix_data:Se.initialData=c.poi_mix_data,c.poi_mix_columns&&(Se.knownColumns=c.poi_mix_columns));let pa,xe=!1;const Fa=Ue.createReactive({callback:T=>{r(3,pa=T)},execFn:H},{id:"poi_mix",...Se});Fa(ye,{noResolve:he,...Se}),globalThis[Symbol.for("poi_mix")]={get value(){return pa}};let Be={initialData:void 0,initialError:void 0},de=M`select
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
order by oa_domain desc`;c.oa_arealevel_data&&(c.oa_arealevel_data instanceof Error?Be.initialError=c.oa_arealevel_data:Be.initialData=c.oa_arealevel_data,c.oa_arealevel_columns&&(Be.knownColumns=c.oa_arealevel_columns));let Je,Ye=!1;const _e=Ue.createReactive({callback:T=>{r(4,Je=T)},execFn:H},{id:"oa_arealevel",...Be});_e(Ve,{noResolve:de,...Be}),globalThis[Symbol.for("oa_arealevel")]={get value(){return Je}};let P={initialData:void 0,initialError:void 0},be=M`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and substr(area_code, 1, 2) = '${v.code}'`,sa=`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and substr(area_code, 1, 2) = '${v.code}'`;c.dom_suppressed_count_data&&(c.dom_suppressed_count_data instanceof Error?P.initialError=c.dom_suppressed_count_data:P.initialData=c.dom_suppressed_count_data,c.dom_suppressed_count_columns&&(P.knownColumns=c.dom_suppressed_count_columns));let Xe,Ce=!1;const Aa=Ue.createReactive({callback:T=>{r(5,Xe=T)},execFn:H},{id:"dom_suppressed_count",...P});Aa(sa,{noResolve:be,...P}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return Xe}};let Le={initialData:void 0,initialError:void 0},re=M`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
limit 15`,ha=`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
limit 15`;c.dominance_children_data&&(c.dominance_children_data instanceof Error?Le.initialError=c.dominance_children_data:Le.initialData=c.dominance_children_data,c.dominance_children_columns&&(Le.knownColumns=c.dominance_children_columns));let ya,Me=!1;const ba=Ue.createReactive({callback:T=>{r(6,ya=T)},execFn:H},{id:"dominance_children",...Le});ba(ha,{noResolve:re,...Le}),globalThis[Symbol.for("dominance_children")]={get value(){return ya}};let ce={initialData:void 0,initialError:void 0},He=M`select
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
limit 1`;c.demographics_data&&(c.demographics_data instanceof Error?ce.initialError=c.demographics_data:ce.initialData=c.demographics_data,c.demographics_columns&&(ce.knownColumns=c.demographics_columns));let va,ea=!1;const Pe=Ue.createReactive({callback:T=>{r(7,va=T)},execFn:H},{id:"demographics",...ce});Pe(ve,{noResolve:He,...ce}),globalThis[Symbol.for("demographics")]={get value(){return va}};let De={initialData:void 0,initialError:void 0},$e=M`with latest as (
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
order by sort_order`,we=`with latest as (
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
order by sort_order`;c.age_mix_data&&(c.age_mix_data instanceof Error?De.initialError=c.age_mix_data:De.initialData=c.age_mix_data,c.age_mix_columns&&(De.knownColumns=c.age_mix_columns));let $a,Fe=!1;const ja=Ue.createReactive({callback:T=>{r(8,$a=T)},execFn:H},{id:"age_mix",...De});ja(we,{noResolve:$e,...De}),globalThis[Symbol.for("age_mix")]={get value(){return $a}};let Ae={initialData:void 0,initialError:void 0},ne=M`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
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
    '${Za}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`,wa=`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
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
    '${Za}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`;c.minimap_areas_data&&(c.minimap_areas_data instanceof Error?Ae.initialError=c.minimap_areas_data:Ae.initialData=c.minimap_areas_data,c.minimap_areas_columns&&(Ae.knownColumns=c.minimap_areas_columns));let ka,aa=!1;const je=Ue.createReactive({callback:T=>{r(9,ka=T)},execFn:H},{id:"minimap_areas",...Ae});je(wa,{noResolve:ne,...Ae}),globalThis[Symbol.for("minimap_areas")]={get value(){return ka}};let Ne={initialData:void 0,initialError:void 0},me=M`select
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
order by d.residents_total desc nulls last`,ta=`select
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
order by d.residents_total desc nulls last`;c.children_data&&(c.children_data instanceof Error?Ne.initialError=c.children_data:Ne.initialData=c.children_data,c.children_columns&&(Ne.knownColumns=c.children_columns));let Ie,Ra=!1;const ra=Ue.createReactive({callback:T=>{r(10,Ie=T)},execFn:H},{id:"children",...Ne});ra(ta,{noResolve:me,...Ne}),globalThis[Symbol.for("children")]={get value(){return Ie}};let ke={initialData:void 0,initialError:void 0},ue=M`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`,na=`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`;c.ortsteile_data&&(c.ortsteile_data instanceof Error?ke.initialError=c.ortsteile_data:ke.initialData=c.ortsteile_data,c.ortsteile_columns&&(ke.knownColumns=c.ortsteile_columns));let ze,Na=!1;const xa=Ue.createReactive({callback:T=>{r(11,ze=T)},execFn:H},{id:"ortsteile",...ke});return xa(na,{noResolve:ue,...ke}),globalThis[Symbol.for("ortsteile")]={get value(){return ze}},i.$$set=T=>{"data"in T&&r(15,z=T.data)},i.$$.update=()=>{var T;i.$$.dirty[0]&32768&&r(16,{data:c={},customFormattingSettings:L,__db:u}=z,c),i.$$.dirty[0]&65536&&Sr.set(Object.keys(c).length>0),i.$$.dirty[2]&128&&r(18,v=b.params),i.$$.dirty[0]&262144&&r(20,Qe=M`select bezirk_name
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
where bezirk_code = '${v.code}'`),i.$$.dirty[0]&262144&&r(21,Ze=`select bezirk_name
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
where bezirk_code = '${v.code}'`),i.$$.dirty[0]&7864320&&(Qe||!Pa?Qe||(fa(Ze,{noResolve:Qe,...ae}),r(22,Pa=!0)):fa(Ze,{noResolve:Qe})),i.$$.dirty[0]&262144&&r(24,pe=M`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&262144&&r(25,ee=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${v.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&125829120&&(pe||!Ge?pe||(Te(ee,{noResolve:pe,...ge}),r(26,Ge=!0)):Te(ee,{noResolve:pe})),i.$$.dirty[0]&262144&&r(28,te=M`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
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
        where stage in ('active-gentrification', 'pioneer-signal')
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&262144&&r(29,ga=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
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
        where stage in ('active-gentrification', 'pioneer-signal')
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&2013265920&&(te||!Re?te||(Da(ga,{noResolve:te,...qe}),r(30,Re=!0)):Da(ga,{noResolve:te})),i.$$.dirty[0]&262144&&r(32,he=M`select
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
order by poi_count desc`),i.$$.dirty[0]&262144&&r(33,ye=`select
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
order by poi_count desc`),i.$$.dirty[1]&15&&(he||!xe?he||(Fa(ye,{noResolve:he,...Se}),r(34,xe=!0)):Fa(ye,{noResolve:he})),i.$$.dirty[0]&262144&&r(36,de=M`select
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
order by oa_domain desc`),i.$$.dirty[1]&240&&(de||!Ye?de||(_e(Ve,{noResolve:de,...Be}),r(38,Ye=!0)):_e(Ve,{noResolve:de})),i.$$.dirty[0]&393216&&r(40,be=M`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and substr(area_code, 1, 2) = '${v.code}'`),i.$$.dirty[0]&393216&&r(41,sa=`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and substr(area_code, 1, 2) = '${v.code}'`),i.$$.dirty[1]&3840&&(be||!Ce?be||(Aa(sa,{noResolve:be,...P}),r(42,Ce=!0)):Aa(sa,{noResolve:be})),i.$$.dirty[0]&393216&&r(44,re=M`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
limit 15`),i.$$.dirty[0]&393216&&r(45,ha=`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
limit 15`),i.$$.dirty[1]&61440&&(re||!Me?re||(ba(ha,{noResolve:re,...Le}),r(46,Me=!0)):ba(ha,{noResolve:re})),i.$$.dirty[0]&262144&&r(48,He=M`select
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
limit 1`),i.$$.dirty[1]&983040&&(He||!ea?He||(Pe(ve,{noResolve:He,...ce}),r(50,ea=!0)):Pe(ve,{noResolve:He})),i.$$.dirty[0]&262144&&r(52,$e=M`with latest as (
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
order by sort_order`),i.$$.dirty[0]&262144&&r(53,we=`with latest as (
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
order by sort_order`),i.$$.dirty[1]&15728640&&($e||!Fe?$e||(ja(we,{noResolve:$e,...De}),r(54,Fe=!0)):ja(we,{noResolve:$e})),i.$$.dirty[0]&262144&&r(56,ne=M`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
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
    '${Za}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`),i.$$.dirty[0]&262144&&r(57,wa=`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
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
    '${Za}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by sort_order, area_name`),i.$$.dirty[1]&251658240&&(ne||!aa?ne||(je(wa,{noResolve:ne,...Ae}),r(58,aa=!0)):je(wa,{noResolve:ne})),i.$$.dirty[0]&262144&&r(60,me=M`select
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
order by d.residents_total desc nulls last`),i.$$.dirty[0]&262144&&r(61,ta=`select
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
order by d.residents_total desc nulls last`),i.$$.dirty[1]&1879048192|i.$$.dirty[2]&1&&(me||!Ra?me||(ra(ta,{noResolve:me,...Ne}),r(62,Ra=!0)):ra(ta,{noResolve:me})),i.$$.dirty[0]&262144&&r(64,ue=M`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`),i.$$.dirty[0]&262144&&r(65,na=`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${v.code}'
order by area_name`),i.$$.dirty[2]&30&&(ue||!Na?ue||(xa(na,{noResolve:ue,...ke}),r(66,Na=!0)):xa(na,{noResolve:ue})),i.$$.dirty[0]&1&&r(68,a=((T=fe==null?void 0:fe[0])==null?void 0:T.bezirk_name)??null),i.$$.dirty[2]&64&&r(14,s=[{label:"Berlin",href:"/berlin"},{label:"District & area profiles",href:"/berlin/area/bezirk"},{label:a??"District"}]),i.$$.dirty[2]&64&&r(13,o=a?`${a} — district profile · Berlin`:null),i.$$.dirty[0]&2&&r(67,g=We==null?void 0:We[0]),i.$$.dirty[2]&32&&r(12,_=!g||g.n_total==null||Number(g.n_total)===0?null:(()=>{const Oe=Number(g.n_total),Ia=Number(g.n_advanced||0),Ee=g.top_stage_share!=null?Number(g.top_stage_share):null,Ga=Ee!=null&&Ee>.5?`<b>${g.top_stage}</b> is the only stage holding a majority (${Math.round(Ee*100)}%)`:"no single stage holds a majority";return`<b>${Ia}</b> of <b>${Oe}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${Ga} — a distribution across this district's own neighbourhoods, never a single re-scored gentrification-index value for the district itself.`})())},[fe,We,le,pa,Je,Xe,ya,va,$a,ka,Ie,ze,_,o,s,z,c,E,v,ae,Qe,Ze,Pa,ge,pe,ee,Ge,qe,te,ga,Re,Se,he,ye,xe,Be,de,Ve,Ye,P,be,sa,Ce,Le,re,ha,Me,ce,He,ve,ea,De,$e,we,Fe,Ae,ne,wa,aa,Ne,me,ta,Ra,ke,ue,na,Na,g,a,b]}class Rn extends vr{constructor(t){super(),$r(this,t,sn,nn,mr,{data:15},null,[-1,-1,-1])}}export{Rn as component};
