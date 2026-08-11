import{s as sr,d,i as _,a as Ca,b as x,c as y,h as or,e as T,f as nt,g as B,j as b,k as q,l as Dt,m as lr,o as dr,n as _r,p as cr,q as ne,r as pt,t as Q,u as Z,v as mr,H as ur,w as At}from"../chunks/scheduler.BopPEjhc.js";import{S as fr,i as gr,d as $,t as g,a as u,c as te,m as w,b as k,e as R,g as re}from"../chunks/index.CYkVJg6_.js";import{A as pr}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as hr}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as yr}from"../chunks/Hero.CRoRGI02.js";import{D as ft,C as _a}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as Ua,w as br}from"../chunks/entry.BMmpG6A7.js";import{A as ca}from"../chunks/Alert.BO8kFSQK.js";import{e as vr,s as $r,Q as Pe,p as wr,a as jt,r as Nt,C as kr}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as M}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as It,a as na}from"../chunks/Dropdown.BxlIFH-r.js";import{p as Rr}from"../chunks/stores.Ceyp10jj.js";import{Q as De}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as rt}from"../chunks/BarChart.DzrCmZ_r.js";import{B as gt}from"../chunks/BigValue.Ck7K9e2S.js";import{p as xr}from"../chunks/profile.BW8tN6E9.js";function zr(i){var s;let t,r=(S.title??((s=S.og)==null?void 0:s.title))+"",a;return{c(){t=q("h1"),a=Z(r),this.h()},l(o){t=T(o,"H1",{class:!0});var h=pt(t);a=Q(h,r),h.forEach(d),this.h()},h(){x(t,"class","title")},m(o,h){_(o,t,h),Ca(t,a)},p:ne,d(o){o&&d(t)}}}function Er(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:ne,p:ne,d:ne}}function Tr(i){var h;let t,r,a,s,o;return document.title=t=S.title??((h=S.og)==null?void 0:h.title),{c(){r=b(),a=q("meta"),s=b(),o=q("meta"),this.h()},l(c){r=y(c),a=T(c,"META",{property:!0,content:!0}),s=y(c),o=T(c,"META",{name:!0,content:!0}),this.h()},h(){var c,l;x(a,"property","og:title"),x(a,"content",((c=S.og)==null?void 0:c.title)??S.title),x(o,"name","twitter:title"),x(o,"content",((l=S.og)==null?void 0:l.title)??S.title)},m(c,l){_(c,r,l),_(c,a,l),_(c,s,l),_(c,o,l)},p(c,l){var p;l&0&&t!==(t=S.title??((p=S.og)==null?void 0:p.title))&&(document.title=t)},d(c){c&&(d(r),d(a),d(s),d(o))}}}function qr(i){var o,h;let t,r,a=(S.description||((o=S.og)==null?void 0:o.description))&&Sr(),s=((h=S.og)==null?void 0:h.image)&&Cr();return{c(){a&&a.c(),t=b(),s&&s.c(),r=nt()},l(c){a&&a.l(c),t=y(c),s&&s.l(c),r=nt()},m(c,l){a&&a.m(c,l),_(c,t,l),s&&s.m(c,l),_(c,r,l)},p(c,l){var p,E;(S.description||(p=S.og)!=null&&p.description)&&a.p(c,l),(E=S.og)!=null&&E.image&&s.p(c,l)},d(c){c&&(d(t),d(r)),a&&a.d(c),s&&s.d(c)}}}function Sr(i){let t,r,a,s,o;return{c(){t=q("meta"),r=b(),a=q("meta"),s=b(),o=q("meta"),this.h()},l(h){t=T(h,"META",{name:!0,content:!0}),r=y(h),a=T(h,"META",{property:!0,content:!0}),s=y(h),o=T(h,"META",{name:!0,content:!0}),this.h()},h(){var h,c,l;x(t,"name","description"),x(t,"content",S.description??((h=S.og)==null?void 0:h.description)),x(a,"property","og:description"),x(a,"content",((c=S.og)==null?void 0:c.description)??S.description),x(o,"name","twitter:description"),x(o,"content",((l=S.og)==null?void 0:l.description)??S.description)},m(h,c){_(h,t,c),_(h,r,c),_(h,a,c),_(h,s,c),_(h,o,c)},p:ne,d(h){h&&(d(t),d(r),d(a),d(s),d(o))}}}function Cr(i){let t,r,a;return{c(){t=q("meta"),r=b(),a=q("meta"),this.h()},l(s){t=T(s,"META",{property:!0,content:!0}),r=y(s),a=T(s,"META",{name:!0,content:!0}),this.h()},h(){var s,o;x(t,"property","og:image"),x(t,"content",jt((s=S.og)==null?void 0:s.image)),x(a,"name","twitter:image"),x(a,"content",jt((o=S.og)==null?void 0:o.image))},m(s,o){_(s,t,o),_(s,r,o),_(s,a,o)},p:ne,d(s){s&&(d(t),d(r),d(a))}}}function Ot(i){let t,r;return t=new De({props:{queryID:"bezirk_name",queryResult:i[1]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Br(i){let t,r,a="sums and population-weighted averages",s,o,h="methodology page",c,l,p="full neighbourhood list",E;return{c(){t=Z("Figures on this page are "),r=q("b"),r.textContent=a,s=Z(` of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  `),o=q("a"),o.textContent=h,c=Z(` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),l=q("a"),l.textContent=p,E=Z(` for the actual
  gentrification index and trajectory.`),this.h()},l(v){t=Q(v,"Figures on this page are "),r=T(v,"B",{"data-svelte-h":!0}),B(r)!=="svelte-rhlwxq"&&(r.textContent=a),s=Q(v,` of this district's
  neighbourhoods (Planungsräume) — never a separately re-scored index. See the
  `),o=T(v,"A",{href:!0,"data-svelte-h":!0}),B(o)!=="svelte-1l2pw3"&&(o.textContent=h),c=Q(v,` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),l=T(v,"A",{href:!0,"data-svelte-h":!0}),B(l)!=="svelte-z78e0k"&&(l.textContent=p),E=Q(v,` for the actual
  gentrification index and trajectory.`),this.h()},h(){x(o,"href","/gentriduck/methodology"),x(l,"href","/gentriduck/berlin/area")},m(v,C){_(v,t,C),_(v,r,C),_(v,s,C),_(v,o,C),_(v,c,C),_(v,l,C),_(v,E,C)},p:ne,d(v){v&&(d(t),d(r),d(s),d(o),d(c),d(l),d(E))}}}function Ut(i){let t,r;return t=new De({props:{queryID:"stage_mix",queryResult:i[2]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Kt(i){let t,r;return t=new De({props:{queryID:"stage_mix_summary",queryResult:i[0]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Mr(i){let t,r;return t=new ca({props:{status:"warning",$$slots:{default:[Lr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[2]&16777216&&(o.$$scope={dirty:s,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Hr(i){let t,r;return{c(){t=q("p"),r=new ur(!1),this.h()},l(a){t=T(a,"P",{});var s=pt(t);r=mr(s,!1),s.forEach(d),this.h()},h(){r.a=null},m(a,s){_(a,t,s),r.m(i[12],t)},p(a,s){s[0]&4096&&r.p(a[12])},i:ne,o:ne,d(a){a&&d(t)}}}function Lr(i){let t;return{c(){t=Z("No neighbourhood-stage data available for this district.")},l(r){t=Q(r,"No neighbourhood-stage data available for this district.")},m(r,a){_(r,t,a)},d(r){r&&d(t)}}}function Wt(i){let t,r;return t=new De({props:{queryID:"poi_mix",queryResult:i[3]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Fr(i){let t,r="Context only — never a Kiez-level claim.",a,s,o="Offering Advantage decoder",h;return{c(){t=q("b"),t.textContent=r,a=Z(` A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
  `),s=q("a"),s.textContent=o,h=Z(` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},l(c){t=T(c,"B",{"data-svelte-h":!0}),B(t)!=="svelte-a7l1s8"&&(t.textContent=r),a=Q(c,` A district pools roughly 30–40 very different
  neighbourhoods into one number; that this district reads as "up-market" or "under-represented" in
  a domain says nothing about any one Kiez inside it. The Bezirksregionen and Prognoseräume listed
  further down this page sit closer to the neighbourhood grain — the
  `),s=T(c,"A",{href:!0,"data-svelte-h":!0}),B(s)!=="svelte-168mye8"&&(s.textContent=o),h=Q(c,` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(c,l){_(c,t,l),_(c,a,l),_(c,s,l),_(c,h,l)},p:ne,d(c){c&&(d(t),d(a),d(s),d(h))}}}function Qt(i){let t,r;return t=new De({props:{queryID:"oa_arealevel",queryResult:i[4]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Zt(i){let t,r;return t=new ca({props:{status:"warning",$$slots:{default:[Pr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Pr(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,s,o="Offering Advantage decoder",h;return{c(){t=q("b"),t.textContent=r,a=Z(` PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  `),s=q("a"),s.textContent=o,h=Z(" §4/§7 for the full finding."),this.h()},l(c){t=T(c,"B",{"data-svelte-h":!0}),B(t)!=="svelte-1impqbu"&&(t.textContent=r),a=Q(c,` PLR-vs-Bezirk rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this district's apparent rank in a domain can genuinely
  shift depending on the spatial scale read. See the
  `),s=T(c,"A",{href:!0,"data-svelte-h":!0}),B(s)!=="svelte-168mye8"&&(s.textContent=o),h=Q(c," §4/§7 for the full finding."),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(c,l){_(c,t,l),_(c,a,l),_(c,s,l),_(c,h,l)},p:ne,d(c){c&&(d(t),d(a),d(s),d(h))}}}function Dr(i){let t,r;return t=new ca({props:{status:"warning",$$slots:{default:[jr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[2]&16777216&&(o.$$scope={dirty:s,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Ar(i){let t,r;return t=new rt({props:{data:i[4],x:"poi_domain_h",y:"pct_vs_baseline",title:i[1][0].bezirk_name+" — Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this district."}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&16&&(o.data=a[4]),s[0]&2&&(o.title=a[1][0].bezirk_name+" — Offering Advantage vs. Berlin average, by domain"),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function jr(i){let t;return{c(){t=Z("No Offering Advantage data for this district.")},l(r){t=Q(r,"No Offering Advantage data for this district.")},m(r,a){_(r,t,a)},d(r){r&&d(t)}}}function Gt(i){let t,r;return t=new ca({props:{status:"info",$$slots:{default:[Nr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Nr(i){let t;return{c(){t=Z(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=Q(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at district grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){_(r,t,a)},d(r){r&&d(t)}}}function Ir(i){let t,r="Dominance is sign-blind",a,s,o="Offering Advantage decoder",h;return{c(){t=q("b"),t.textContent=r,a=Z(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=q("a"),s.textContent=o,h=Z(" §5 for the full ethics note."),this.h()},l(c){t=T(c,"B",{"data-svelte-h":!0}),B(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=Q(c,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=T(c,"A",{href:!0,"data-svelte-h":!0}),B(s)!=="svelte-168mye8"&&(s.textContent=o),h=Q(c," §5 for the full ethics note."),this.h()},h(){x(s,"href","/gentriduck/methodology-oa-modes")},m(c,l){_(c,t,l),_(c,a,l),_(c,s,l),_(c,h,l)},p:ne,d(c){c&&(d(t),d(a),d(s),d(h))}}}function Or(i){let t,r,a,s,o,h,c,l;return t=new na({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new na({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new na({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),c=new na({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment),s=b(),R(o.$$.fragment),h=b(),R(c.$$.fragment)},l(p){k(t.$$.fragment,p),r=y(p),k(a.$$.fragment,p),s=y(p),k(o.$$.fragment,p),h=y(p),k(c.$$.fragment,p)},m(p,E){w(t,p,E),_(p,r,E),w(a,p,E),_(p,s,E),w(o,p,E),_(p,h,E),w(c,p,E),l=!0},p:ne,i(p){l||(u(t.$$.fragment,p),u(a.$$.fragment,p),u(o.$$.fragment,p),u(c.$$.fragment,p),l=!0)},o(p){g(t.$$.fragment,p),g(a.$$.fragment,p),g(o.$$.fragment,p),g(c.$$.fragment,p),l=!1},d(p){p&&(d(r),d(s),d(h)),$(t,p),$(a,p),$(o,p),$(c,p)}}}function Ur(i){let t,r,a,s,o,h,c,l,p,E,v,C;return t=new na({props:{value:"2025",valueLabel:"2025"}}),a=new na({props:{value:"2024",valueLabel:"2024"}}),o=new na({props:{value:"2023",valueLabel:"2023"}}),c=new na({props:{value:"2022",valueLabel:"2022"}}),p=new na({props:{value:"2021",valueLabel:"2021"}}),v=new na({props:{value:"2020",valueLabel:"2020"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment),s=b(),R(o.$$.fragment),h=b(),R(c.$$.fragment),l=b(),R(p.$$.fragment),E=b(),R(v.$$.fragment)},l(m){k(t.$$.fragment,m),r=y(m),k(a.$$.fragment,m),s=y(m),k(o.$$.fragment,m),h=y(m),k(c.$$.fragment,m),l=y(m),k(p.$$.fragment,m),E=y(m),k(v.$$.fragment,m)},m(m,f){w(t,m,f),_(m,r,f),w(a,m,f),_(m,s,f),w(o,m,f),_(m,h,f),w(c,m,f),_(m,l,f),w(p,m,f),_(m,E,f),w(v,m,f),C=!0},p:ne,i(m){C||(u(t.$$.fragment,m),u(a.$$.fragment,m),u(o.$$.fragment,m),u(c.$$.fragment,m),u(p.$$.fragment,m),u(v.$$.fragment,m),C=!0)},o(m){g(t.$$.fragment,m),g(a.$$.fragment,m),g(o.$$.fragment,m),g(c.$$.fragment,m),g(p.$$.fragment,m),g(v.$$.fragment,m),C=!1},d(m){m&&(d(r),d(s),d(h),d(l),d(E)),$(t,m),$(a,m),$(o,m),$(c,m),$(p,m),$(v,m)}}}function Vt(i){let t,r;return t=new De({props:{queryID:"dom_suppressed_count",queryResult:i[5]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Kr(i){let t,r=(i[5][0]?i[5][0].n_suppressed:0)+"",a,s,o=(i[5][0]?i[5][0].n_suppressed+i[5][0].n_shown:0)+"",h,c,l;return{c(){t=q("b"),a=Z(r),s=Z(" of "),h=Z(o),c=Z(" neighbourhoods here are suppressed below as too thinly observed to characterize"),l=Z(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(p){t=T(p,"B",{});var E=pt(t);a=Q(E,r),s=Q(E," of "),h=Q(E,o),c=Q(E," neighbourhoods here are suppressed below as too thinly observed to characterize"),E.forEach(d),l=Q(p,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(p,E){_(p,t,E),Ca(t,a),Ca(t,s),Ca(t,h),Ca(t,c),_(p,l,E)},p(p,E){E[0]&32&&r!==(r=(p[5][0]?p[5][0].n_suppressed:0)+"")&&At(a,r),E[0]&32&&o!==(o=(p[5][0]?p[5][0].n_suppressed+p[5][0].n_shown:0)+"")&&At(h,o)},d(p){p&&(d(t),d(l))}}}function Jt(i){let t,r;return t=new De({props:{queryID:"dominance_children",queryResult:i[6]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Wr(i){let t,r,a,s,o,h,c,l,p,E,v,C;return t=new _a({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new _a({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new _a({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),c=new _a({props:{id:"top_child",title:"Leading type"}}),p=new _a({props:{id:"n_children",title:"Types in this group here"}}),v=new _a({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment),s=b(),R(o.$$.fragment),h=b(),R(c.$$.fragment),l=b(),R(p.$$.fragment),E=b(),R(v.$$.fragment)},l(m){k(t.$$.fragment,m),r=y(m),k(a.$$.fragment,m),s=y(m),k(o.$$.fragment,m),h=y(m),k(c.$$.fragment,m),l=y(m),k(p.$$.fragment,m),E=y(m),k(v.$$.fragment,m)},m(m,f){w(t,m,f),_(m,r,f),w(a,m,f),_(m,s,f),w(o,m,f),_(m,h,f),w(c,m,f),_(m,l,f),w(p,m,f),_(m,E,f),w(v,m,f),C=!0},p:ne,i(m){C||(u(t.$$.fragment,m),u(a.$$.fragment,m),u(o.$$.fragment,m),u(c.$$.fragment,m),u(p.$$.fragment,m),u(v.$$.fragment,m),C=!0)},o(m){g(t.$$.fragment,m),g(a.$$.fragment,m),g(o.$$.fragment,m),g(c.$$.fragment,m),g(p.$$.fragment,m),g(v.$$.fragment,m),C=!1},d(m){m&&(d(r),d(s),d(h),d(l),d(E)),$(t,m),$(a,m),$(o,m),$(c,m),$(p,m),$(v,m)}}}function Yt(i){let t,r;return t=new De({props:{queryID:"demographics",queryResult:i[7]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Xt(i){let t,r;return t=new ca({props:{status:"warning",$$slots:{default:[Qr]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Qr(i){let t;return{c(){t=Z(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.`)},l(r){t=Q(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this district's figures may understate the true total.`)},m(r,a){_(r,t,a)},d(r){r&&d(t)}}}function er(i){let t,r;return t=new De({props:{queryID:"age_mix",queryResult:i[8]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ar(i){let t,r;return t=new De({props:{queryID:"minimap_areas",queryResult:i[9]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function tr(i){let t,r;return t=new De({props:{queryID:"children",queryResult:i[10]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&1024&&(o.queryResult=a[10]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Zr(i){let t,r,a,s;return t=new _a({props:{id:"area_name",title:"Prognoseraum"}}),a=new _a({props:{id:"residents_total",title:"Residents",fmt:"num0"}}),{c(){R(t.$$.fragment),r=b(),R(a.$$.fragment)},l(o){k(t.$$.fragment,o),r=y(o),k(a.$$.fragment,o)},m(o,h){w(t,o,h),_(o,r,h),w(a,o,h),s=!0},p:ne,i(o){s||(u(t.$$.fragment,o),u(a.$$.fragment,o),s=!0)},o(o){g(t.$$.fragment,o),g(a.$$.fragment,o),s=!1},d(o){o&&d(r),$(t,o),$(a,o)}}}function rr(i){let t,r;return t=new De({props:{queryID:"ortsteile",queryResult:i[11]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const o={};s[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Gr(i){let t,r;return t=new _a({props:{id:"area_name",title:"Ortsteil"}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p:ne,i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Vr(i){var Et;let t,r,a,s,o,h,c,l,p,E=`<a href="/gentriduck/berlin/area/bezirk" class="markdown">All districts</a> · <a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a> ·
<a href="/gentriduck/berlin/area-detail" class="markdown">district browse</a>`,v,C,m,f,je='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',ke,ge,Ma=`Every neighbourhood (Planungsraum) in this district is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This district&#39;s own page reports the
<strong class="markdown">distribution</strong> of those neighbourhood-level stages — never a single re-scored index value for the
district itself, since averaging ordinal stage codes across such different neighbourhoods would
mask exactly the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on
(see &quot;Honest caveats&quot; below).`,ma,Ne,pe,H,Y,Ie,Re,ua,X,Oe='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Ue,ie,Ha='<a href="#mapped-places">Mapped places</a>',fa,he,se,Ke,$e,La='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',ga,oe,xe,ze,We,le,de,ye,Ae=i[4].some(nr),Ee,Te,Fa=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule, or <a href="/gentriduck/berlin/area" class="markdown">this district&#39;s neighbourhoods</a> for the canonical PLR-grain
figure.`,pa,ee,Qe='<a href="#within-group-dominance">Within-group dominance</a>',Ze,qe,ha,Se,Ce,_e,Ge,Ve,Be,ya,be,ce,Je,Me,Pa=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,ba,ae,Ye='<a href="#people--structure">People &amp; structure</a>',Xe,ea,He,va,me,Le,ve,$a,aa,ta,ue,Fe,fe,Da='<a href="#where-this-area-sits">Where this area sits</a>',wa,ra,z,ka,we,Ka='<a href="#prognoseräume-in-this-district">Prognoseräume in this district</a>',Wa,Aa,Ra,Qa,ia,ht='<a href="#ortsteile-in-this-district">Ortsteile in this district</a>',Za,xa,yt=`Ortsteil (Stadtteil) is a different, non-LOR district subdivision (it does not nest into the
Prognoseraum/Bezirksregion/Planungsraum ladder above) — see the
<a href="/gentriduck/berlin/area/ortsteil" class="markdown">Ortsteil profile page</a> for how its own neighbourhood rollup is built.`,Ga,ja,za,Va,sa,bt='<a href="#honest-caveats">Honest caveats</a>',Ja,Ea,vt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this district</strong> — only
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,Ya,oa,$t='<a href="#further-reading">Further reading</a>',Xa,Ta,wt=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other districts, or drill into any of this district&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,et,Na,at,Ba,tt,la=typeof S<"u"&&(S.title||((Et=S.og)==null?void 0:Et.title))&&S.hide_title!==!0&&zr();function ir(e,n){var Oa;return typeof S<"u"&&(S.title||(Oa=S.og)!=null&&Oa.title)?Tr:Er}let Ia=ir()(i),da=typeof S=="object"&&qr(),L=i[1]&&Ot(i);c=new yr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:i[1][0].bezirk_name+" — district profile",lede:"Population, composition, and neighbourhood-stage mix for this district, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain."}}),C=new ca({props:{status:"info",$$slots:{default:[Br]},$$scope:{ctx:i}}});let F=i[2]&&Ut(i),P=i[0]&&Kt(i);const kt=[Hr,Mr],qa=[];function Rt(e,n){return e[12]?0:1}H=Rt(i),Y=qa[H]=kt[H](i),Re=new rt({props:{data:i[2],x:"stage",y:"n_areas",title:"Neighbourhoods by stage, "+i[1][0].bezirk_name,swapXY:"true"}});let D=i[3]&&Wt(i);se=new rt({props:{data:i[3],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+i[1][0].bezirk_name,swapXY:"true"}}),oe=new ca({props:{status:"warning",$$slots:{default:[Fr]},$$scope:{ctx:i}}});let A=i[4]&&Qt(i),G=i[4][0]&&i[4][0].maup_caveat_required&&Zt(i);const xt=[Ar,Dr],Sa=[];function zt(e,n){return e[4].length>0?0:1}le=zt(i),de=Sa[le]=xt[le](i);let V=Ae&&Gt(i);qe=new ca({props:{status:"info",$$slots:{default:[Ir]},$$scope:{ctx:i}}}),Se=new It({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[Or]},$$scope:{ctx:i}}}),_e=new It({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[Ur]},$$scope:{ctx:i}}});let j=i[5]&&Vt(i);Be=new ca({props:{status:"info",$$slots:{default:[Kr]},$$scope:{ctx:i}}});let N=i[6]&&Jt(i);ce=new ft({props:{data:i[6],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this district.",$$slots:{default:[Wr]},$$scope:{ctx:i}}});let I=i[7]&&Yt(i);He=new gt({props:{data:i[7],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),me=new gt({props:{data:i[7],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),ve=new gt({props:{data:i[7],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let J=i[7]&&i[7][0]&&i[7][0].any_indicator_suppressed&&Xt(i),O=i[8]&&er(i);ue=new rt({props:{data:i[8],x:"age_band",y:"share",title:"Age structure, "+i[1][0].bezirk_name,yFmt:"pct0"}});let U=i[9]&&ar(i);z=new pr({props:{data:i[9],geoJsonUrl:`${Ua}/geo/bezirk_pgr_drilldown.geojson`,title:(i[1][0]?i[1][0].bezirk_name:"This district")+" and its Prognoseräume"}});let K=i[10]&&tr(i);Ra=new ft({props:{data:i[10],rows:"20",link:"pgr_link",$$slots:{default:[Zr]},$$scope:{ctx:i}}});let W=i[11]&&rr(i);return za=new ft({props:{data:i[11],rows:"20",link:"ortsteil_link",$$slots:{default:[Gr]},$$scope:{ctx:i}}}),Ba=new hr({}),{c(){la&&la.c(),t=b(),Ia.c(),r=q("meta"),a=q("meta"),da&&da.c(),s=nt(),o=b(),L&&L.c(),h=b(),R(c.$$.fragment),l=b(),p=q("p"),p.innerHTML=E,v=b(),R(C.$$.fragment),m=b(),f=q("h2"),f.innerHTML=je,ke=b(),ge=q("p"),ge.innerHTML=Ma,ma=b(),F&&F.c(),Ne=b(),P&&P.c(),pe=b(),Y.c(),Ie=b(),R(Re.$$.fragment),ua=b(),X=q("h2"),X.innerHTML=Oe,Ue=b(),ie=q("h3"),ie.innerHTML=Ha,fa=b(),D&&D.c(),he=b(),R(se.$$.fragment),Ke=b(),$e=q("h3"),$e.innerHTML=La,ga=b(),R(oe.$$.fragment),xe=b(),A&&A.c(),ze=b(),G&&G.c(),We=b(),de.c(),ye=b(),V&&V.c(),Ee=b(),Te=q("p"),Te.innerHTML=Fa,pa=b(),ee=q("h2"),ee.innerHTML=Qe,Ze=b(),R(qe.$$.fragment),ha=b(),R(Se.$$.fragment),Ce=b(),R(_e.$$.fragment),Ge=b(),j&&j.c(),Ve=b(),R(Be.$$.fragment),ya=b(),N&&N.c(),be=b(),R(ce.$$.fragment),Je=b(),Me=q("p"),Me.innerHTML=Pa,ba=b(),ae=q("h2"),ae.innerHTML=Ye,Xe=b(),I&&I.c(),ea=b(),R(He.$$.fragment),va=b(),R(me.$$.fragment),Le=b(),R(ve.$$.fragment),$a=b(),J&&J.c(),aa=b(),O&&O.c(),ta=b(),R(ue.$$.fragment),Fe=b(),fe=q("h2"),fe.innerHTML=Da,wa=b(),U&&U.c(),ra=b(),R(z.$$.fragment),ka=b(),we=q("h3"),we.innerHTML=Ka,Wa=b(),K&&K.c(),Aa=b(),R(Ra.$$.fragment),Qa=b(),ia=q("h3"),ia.innerHTML=ht,Za=b(),xa=q("p"),xa.innerHTML=yt,Ga=b(),W&&W.c(),ja=b(),R(za.$$.fragment),Va=b(),sa=q("h2"),sa.innerHTML=bt,Ja=b(),Ea=q("ul"),Ea.innerHTML=vt,Ya=b(),oa=q("h2"),oa.innerHTML=$t,Xa=b(),Ta=q("p"),Ta.innerHTML=wt,et=b(),Na=q("hr"),at=b(),R(Ba.$$.fragment),this.h()},l(e){la&&la.l(e),t=y(e);const n=or("svelte-2igo1p",document.head);Ia.l(n),r=T(n,"META",{name:!0,content:!0}),a=T(n,"META",{name:!0,content:!0}),da&&da.l(n),s=nt(),n.forEach(d),o=y(e),L&&L.l(e),h=y(e),k(c.$$.fragment,e),l=y(e),p=T(e,"P",{class:!0,"data-svelte-h":!0}),B(p)!=="svelte-ii1lbl"&&(p.innerHTML=E),v=y(e),k(C.$$.fragment,e),m=y(e),f=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(f)!=="svelte-14f17uo"&&(f.innerHTML=je),ke=y(e),ge=T(e,"P",{class:!0,"data-svelte-h":!0}),B(ge)!=="svelte-1vk2ss4"&&(ge.innerHTML=Ma),ma=y(e),F&&F.l(e),Ne=y(e),P&&P.l(e),pe=y(e),Y.l(e),Ie=y(e),k(Re.$$.fragment,e),ua=y(e),X=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(X)!=="svelte-1i9w9pn"&&(X.innerHTML=Oe),Ue=y(e),ie=T(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(ie)!=="svelte-3hvew3"&&(ie.innerHTML=Ha),fa=y(e),D&&D.l(e),he=y(e),k(se.$$.fragment,e),Ke=y(e),$e=T(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B($e)!=="svelte-5mc7pd"&&($e.innerHTML=La),ga=y(e),k(oe.$$.fragment,e),xe=y(e),A&&A.l(e),ze=y(e),G&&G.l(e),We=y(e),de.l(e),ye=y(e),V&&V.l(e),Ee=y(e),Te=T(e,"P",{class:!0,"data-svelte-h":!0}),B(Te)!=="svelte-ub6827"&&(Te.innerHTML=Fa),pa=y(e),ee=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(ee)!=="svelte-4kb45v"&&(ee.innerHTML=Qe),Ze=y(e),k(qe.$$.fragment,e),ha=y(e),k(Se.$$.fragment,e),Ce=y(e),k(_e.$$.fragment,e),Ge=y(e),j&&j.l(e),Ve=y(e),k(Be.$$.fragment,e),ya=y(e),N&&N.l(e),be=y(e),k(ce.$$.fragment,e),Je=y(e),Me=T(e,"P",{class:!0,"data-svelte-h":!0}),B(Me)!=="svelte-1xa7bh7"&&(Me.innerHTML=Pa),ba=y(e),ae=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(ae)!=="svelte-1mdzqzc"&&(ae.innerHTML=Ye),Xe=y(e),I&&I.l(e),ea=y(e),k(He.$$.fragment,e),va=y(e),k(me.$$.fragment,e),Le=y(e),k(ve.$$.fragment,e),$a=y(e),J&&J.l(e),aa=y(e),O&&O.l(e),ta=y(e),k(ue.$$.fragment,e),Fe=y(e),fe=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(fe)!=="svelte-60cjj9"&&(fe.innerHTML=Da),wa=y(e),U&&U.l(e),ra=y(e),k(z.$$.fragment,e),ka=y(e),we=T(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(we)!=="svelte-1krkey9"&&(we.innerHTML=Ka),Wa=y(e),K&&K.l(e),Aa=y(e),k(Ra.$$.fragment,e),Qa=y(e),ia=T(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),B(ia)!=="svelte-984tou"&&(ia.innerHTML=ht),Za=y(e),xa=T(e,"P",{class:!0,"data-svelte-h":!0}),B(xa)!=="svelte-1ttuuyo"&&(xa.innerHTML=yt),Ga=y(e),W&&W.l(e),ja=y(e),k(za.$$.fragment,e),Va=y(e),sa=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(sa)!=="svelte-ad0syq"&&(sa.innerHTML=bt),Ja=y(e),Ea=T(e,"UL",{class:!0,"data-svelte-h":!0}),B(Ea)!=="svelte-vmlcgf"&&(Ea.innerHTML=vt),Ya=y(e),oa=T(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),B(oa)!=="svelte-oimjns"&&(oa.innerHTML=$t),Xa=y(e),Ta=T(e,"P",{class:!0,"data-svelte-h":!0}),B(Ta)!=="svelte-1ga3uyz"&&(Ta.innerHTML=wt),et=y(e),Na=T(e,"HR",{class:!0}),at=y(e),k(Ba.$$.fragment,e),this.h()},h(){x(r,"name","twitter:card"),x(r,"content","summary_large_image"),x(a,"name","twitter:site"),x(a,"content","@evidence_dev"),x(p,"class","markdown"),x(f,"class","markdown"),x(f,"id","social-status--trajectory"),x(ge,"class","markdown"),x(X,"class","markdown"),x(X,"id","commercial-mix--offering-advantage"),x(ie,"class","markdown"),x(ie,"id","mapped-places"),x($e,"class","markdown"),x($e,"id","offering-advantage-across-the-area-hierarchy"),x(Te,"class","markdown"),x(ee,"class","markdown"),x(ee,"id","within-group-dominance"),x(Me,"class","markdown"),x(ae,"class","markdown"),x(ae,"id","people--structure"),x(fe,"class","markdown"),x(fe,"id","where-this-area-sits"),x(we,"class","markdown"),x(we,"id","prognoseräume-in-this-district"),x(ia,"class","markdown"),x(ia,"id","ortsteile-in-this-district"),x(xa,"class","markdown"),x(sa,"class","markdown"),x(sa,"id","honest-caveats"),x(Ea,"class","markdown"),x(oa,"class","markdown"),x(oa,"id","further-reading"),x(Ta,"class","markdown"),x(Na,"class","markdown")},m(e,n){la&&la.m(e,n),_(e,t,n),Ia.m(document.head,null),Ca(document.head,r),Ca(document.head,a),da&&da.m(document.head,null),Ca(document.head,s),_(e,o,n),L&&L.m(e,n),_(e,h,n),w(c,e,n),_(e,l,n),_(e,p,n),_(e,v,n),w(C,e,n),_(e,m,n),_(e,f,n),_(e,ke,n),_(e,ge,n),_(e,ma,n),F&&F.m(e,n),_(e,Ne,n),P&&P.m(e,n),_(e,pe,n),qa[H].m(e,n),_(e,Ie,n),w(Re,e,n),_(e,ua,n),_(e,X,n),_(e,Ue,n),_(e,ie,n),_(e,fa,n),D&&D.m(e,n),_(e,he,n),w(se,e,n),_(e,Ke,n),_(e,$e,n),_(e,ga,n),w(oe,e,n),_(e,xe,n),A&&A.m(e,n),_(e,ze,n),G&&G.m(e,n),_(e,We,n),Sa[le].m(e,n),_(e,ye,n),V&&V.m(e,n),_(e,Ee,n),_(e,Te,n),_(e,pa,n),_(e,ee,n),_(e,Ze,n),w(qe,e,n),_(e,ha,n),w(Se,e,n),_(e,Ce,n),w(_e,e,n),_(e,Ge,n),j&&j.m(e,n),_(e,Ve,n),w(Be,e,n),_(e,ya,n),N&&N.m(e,n),_(e,be,n),w(ce,e,n),_(e,Je,n),_(e,Me,n),_(e,ba,n),_(e,ae,n),_(e,Xe,n),I&&I.m(e,n),_(e,ea,n),w(He,e,n),_(e,va,n),w(me,e,n),_(e,Le,n),w(ve,e,n),_(e,$a,n),J&&J.m(e,n),_(e,aa,n),O&&O.m(e,n),_(e,ta,n),w(ue,e,n),_(e,Fe,n),_(e,fe,n),_(e,wa,n),U&&U.m(e,n),_(e,ra,n),w(z,e,n),_(e,ka,n),_(e,we,n),_(e,Wa,n),K&&K.m(e,n),_(e,Aa,n),w(Ra,e,n),_(e,Qa,n),_(e,ia,n),_(e,Za,n),_(e,xa,n),_(e,Ga,n),W&&W.m(e,n),_(e,ja,n),w(za,e,n),_(e,Va,n),_(e,sa,n),_(e,Ja,n),_(e,Ea,n),_(e,Ya,n),_(e,oa,n),_(e,Xa,n),_(e,Ta,n),_(e,et,n),_(e,Na,n),_(e,at,n),w(Ba,e,n),tt=!0},p(e,n){var Pt;typeof S<"u"&&(S.title||(Pt=S.og)!=null&&Pt.title)&&S.hide_title!==!0&&la.p(e,n),Ia.p(e,n),typeof S=="object"&&da.p(e,n),e[1]?L?(L.p(e,n),n[0]&2&&u(L,1)):(L=Ot(e),L.c(),u(L,1),L.m(h.parentNode,h)):L&&(re(),g(L,1,1,()=>{L=null}),te());const Oa={};n[0]&2&&(Oa.title=e[1][0].bezirk_name+" — district profile"),c.$set(Oa);const Tt={};n[2]&16777216&&(Tt.$$scope={dirty:n,ctx:e}),C.$set(Tt),e[2]?F?(F.p(e,n),n[0]&4&&u(F,1)):(F=Ut(e),F.c(),u(F,1),F.m(Ne.parentNode,Ne)):F&&(re(),g(F,1,1,()=>{F=null}),te()),e[0]?P?(P.p(e,n),n[0]&1&&u(P,1)):(P=Kt(e),P.c(),u(P,1),P.m(pe.parentNode,pe)):P&&(re(),g(P,1,1,()=>{P=null}),te());let it=H;H=Rt(e),H===it?qa[H].p(e,n):(re(),g(qa[it],1,1,()=>{qa[it]=null}),te(),Y=qa[H],Y?Y.p(e,n):(Y=qa[H]=kt[H](e),Y.c()),u(Y,1),Y.m(Ie.parentNode,Ie));const st={};n[0]&4&&(st.data=e[2]),n[0]&2&&(st.title="Neighbourhoods by stage, "+e[1][0].bezirk_name),Re.$set(st),e[3]?D?(D.p(e,n),n[0]&8&&u(D,1)):(D=Wt(e),D.c(),u(D,1),D.m(he.parentNode,he)):D&&(re(),g(D,1,1,()=>{D=null}),te());const ot={};n[0]&8&&(ot.data=e[3]),n[0]&2&&(ot.title="Mapped places by category (latest snapshot), "+e[1][0].bezirk_name),se.$set(ot);const qt={};n[2]&16777216&&(qt.$$scope={dirty:n,ctx:e}),oe.$set(qt),e[4]?A?(A.p(e,n),n[0]&16&&u(A,1)):(A=Qt(e),A.c(),u(A,1),A.m(ze.parentNode,ze)):A&&(re(),g(A,1,1,()=>{A=null}),te()),e[4][0]&&e[4][0].maup_caveat_required?G?n[0]&16&&u(G,1):(G=Zt(e),G.c(),u(G,1),G.m(We.parentNode,We)):G&&(re(),g(G,1,1,()=>{G=null}),te());let lt=le;le=zt(e),le===lt?Sa[le].p(e,n):(re(),g(Sa[lt],1,1,()=>{Sa[lt]=null}),te(),de=Sa[le],de?de.p(e,n):(de=Sa[le]=xt[le](e),de.c()),u(de,1),de.m(ye.parentNode,ye)),n[0]&16&&(Ae=e[4].some(nr)),Ae?V?n[0]&16&&u(V,1):(V=Gt(e),V.c(),u(V,1),V.m(Ee.parentNode,Ee)):V&&(re(),g(V,1,1,()=>{V=null}),te());const St={};n[2]&16777216&&(St.$$scope={dirty:n,ctx:e}),qe.$set(St);const Ct={};n[2]&16777216&&(Ct.$$scope={dirty:n,ctx:e}),Se.$set(Ct);const Bt={};n[2]&16777216&&(Bt.$$scope={dirty:n,ctx:e}),_e.$set(Bt),e[5]?j?(j.p(e,n),n[0]&32&&u(j,1)):(j=Vt(e),j.c(),u(j,1),j.m(Ve.parentNode,Ve)):j&&(re(),g(j,1,1,()=>{j=null}),te());const Mt={};n[0]&32|n[2]&16777216&&(Mt.$$scope={dirty:n,ctx:e}),Be.$set(Mt),e[6]?N?(N.p(e,n),n[0]&64&&u(N,1)):(N=Jt(e),N.c(),u(N,1),N.m(be.parentNode,be)):N&&(re(),g(N,1,1,()=>{N=null}),te());const dt={};n[0]&64&&(dt.data=e[6]),n[2]&16777216&&(dt.$$scope={dirty:n,ctx:e}),ce.$set(dt),e[7]?I?(I.p(e,n),n[0]&128&&u(I,1)):(I=Yt(e),I.c(),u(I,1),I.m(ea.parentNode,ea)):I&&(re(),g(I,1,1,()=>{I=null}),te());const Ht={};n[0]&128&&(Ht.data=e[7]),He.$set(Ht);const Lt={};n[0]&128&&(Lt.data=e[7]),me.$set(Lt);const Ft={};n[0]&128&&(Ft.data=e[7]),ve.$set(Ft),e[7]&&e[7][0]&&e[7][0].any_indicator_suppressed?J?n[0]&128&&u(J,1):(J=Xt(e),J.c(),u(J,1),J.m(aa.parentNode,aa)):J&&(re(),g(J,1,1,()=>{J=null}),te()),e[8]?O?(O.p(e,n),n[0]&256&&u(O,1)):(O=er(e),O.c(),u(O,1),O.m(ta.parentNode,ta)):O&&(re(),g(O,1,1,()=>{O=null}),te());const _t={};n[0]&256&&(_t.data=e[8]),n[0]&2&&(_t.title="Age structure, "+e[1][0].bezirk_name),ue.$set(_t),e[9]?U?(U.p(e,n),n[0]&512&&u(U,1)):(U=ar(e),U.c(),u(U,1),U.m(ra.parentNode,ra)):U&&(re(),g(U,1,1,()=>{U=null}),te());const ct={};n[0]&512&&(ct.data=e[9]),n[0]&2&&(ct.title=(e[1][0]?e[1][0].bezirk_name:"This district")+" and its Prognoseräume"),z.$set(ct),e[10]?K?(K.p(e,n),n[0]&1024&&u(K,1)):(K=tr(e),K.c(),u(K,1),K.m(Aa.parentNode,Aa)):K&&(re(),g(K,1,1,()=>{K=null}),te());const mt={};n[0]&1024&&(mt.data=e[10]),n[2]&16777216&&(mt.$$scope={dirty:n,ctx:e}),Ra.$set(mt),e[11]?W?(W.p(e,n),n[0]&2048&&u(W,1)):(W=rr(e),W.c(),u(W,1),W.m(ja.parentNode,ja)):W&&(re(),g(W,1,1,()=>{W=null}),te());const ut={};n[0]&2048&&(ut.data=e[11]),n[2]&16777216&&(ut.$$scope={dirty:n,ctx:e}),za.$set(ut)},i(e){tt||(u(L),u(c.$$.fragment,e),u(C.$$.fragment,e),u(F),u(P),u(Y),u(Re.$$.fragment,e),u(D),u(se.$$.fragment,e),u(oe.$$.fragment,e),u(A),u(G),u(de),u(V),u(qe.$$.fragment,e),u(Se.$$.fragment,e),u(_e.$$.fragment,e),u(j),u(Be.$$.fragment,e),u(N),u(ce.$$.fragment,e),u(I),u(He.$$.fragment,e),u(me.$$.fragment,e),u(ve.$$.fragment,e),u(J),u(O),u(ue.$$.fragment,e),u(U),u(z.$$.fragment,e),u(K),u(Ra.$$.fragment,e),u(W),u(za.$$.fragment,e),u(Ba.$$.fragment,e),tt=!0)},o(e){g(L),g(c.$$.fragment,e),g(C.$$.fragment,e),g(F),g(P),g(Y),g(Re.$$.fragment,e),g(D),g(se.$$.fragment,e),g(oe.$$.fragment,e),g(A),g(G),g(de),g(V),g(qe.$$.fragment,e),g(Se.$$.fragment,e),g(_e.$$.fragment,e),g(j),g(Be.$$.fragment,e),g(N),g(ce.$$.fragment,e),g(I),g(He.$$.fragment,e),g(me.$$.fragment,e),g(ve.$$.fragment,e),g(J),g(O),g(ue.$$.fragment,e),g(U),g(z.$$.fragment,e),g(K),g(Ra.$$.fragment,e),g(W),g(za.$$.fragment,e),g(Ba.$$.fragment,e),tt=!1},d(e){e&&(d(t),d(o),d(h),d(l),d(p),d(v),d(m),d(f),d(ke),d(ge),d(ma),d(Ne),d(pe),d(Ie),d(ua),d(X),d(Ue),d(ie),d(fa),d(he),d(Ke),d($e),d(ga),d(xe),d(ze),d(We),d(ye),d(Ee),d(Te),d(pa),d(ee),d(Ze),d(ha),d(Ce),d(Ge),d(Ve),d(ya),d(be),d(Je),d(Me),d(ba),d(ae),d(Xe),d(ea),d(va),d(Le),d($a),d(aa),d(ta),d(Fe),d(fe),d(wa),d(ra),d(ka),d(we),d(Wa),d(Aa),d(Qa),d(ia),d(Za),d(xa),d(Ga),d(ja),d(Va),d(sa),d(Ja),d(Ea),d(Ya),d(oa),d(Xa),d(Ta),d(et),d(Na),d(at)),la&&la.d(e),Ia.d(e),d(r),d(a),da&&da.d(e),d(s),L&&L.d(e),$(c,e),$(C,e),F&&F.d(e),P&&P.d(e),qa[H].d(e),$(Re,e),D&&D.d(e),$(se,e),$(oe,e),A&&A.d(e),G&&G.d(e),Sa[le].d(e),V&&V.d(e),$(qe,e),$(Se,e),$(_e,e),j&&j.d(e),$(Be,e),N&&N.d(e),$(ce,e),I&&I.d(e),$(He,e),$(me,e),$(ve,e),J&&J.d(e),O&&O.d(e),$(ue,e),U&&U.d(e),$(z,e),K&&K.d(e),$(Ra,e),W&&W.d(e),$(za,e),$(Ba,e)}}}const S={},nr=i=>i.oa_domain_min_base_flag;function Jr(i,t,r){let a,s,o,h;Dt(i,Rr,z=>r(66,o=z)),Dt(i,Nt,z=>r(70,h=z));let{data:c}=t,{data:l={},customFormattingSettings:p,__db:E,inputs:v}=c;lr(Nt,h="232b0788e82321534e0845a0d8ea883d",h);let C=vr(br(v));dr(C.subscribe(z=>r(15,v=z))),_r(kr,{getCustomFormats:()=>p.customFormats||[]});const m=(z,ka)=>xr(E.query,z,{query_name:ka});$r(m);let f=o.params;cr(()=>!0);let je={initialData:void 0,initialError:void 0},ke=M`select bezirk_name
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
where bezirk_code = '${f.code}'`,ge=`select bezirk_name
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
where bezirk_code = '${f.code}'`;l.bezirk_name_data&&(l.bezirk_name_data instanceof Error?je.initialError=l.bezirk_name_data:je.initialData=l.bezirk_name_data,l.bezirk_name_columns&&(je.knownColumns=l.bezirk_name_columns));let Ma,ma=!1;const Ne=Pe.createReactive({callback:z=>{r(1,Ma=z)},execFn:m},{id:"bezirk_name",...je});Ne(ge,{noResolve:ke,...je}),globalThis[Symbol.for("bezirk_name")]={get value(){return Ma}};let pe={initialData:void 0,initialError:void 0},H=M`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`,Y=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`;l.stage_mix_data&&(l.stage_mix_data instanceof Error?pe.initialError=l.stage_mix_data:pe.initialData=l.stage_mix_data,l.stage_mix_columns&&(pe.knownColumns=l.stage_mix_columns));let Ie,Re=!1;const ua=Pe.createReactive({callback:z=>{r(2,Ie=z)},execFn:m},{id:"stage_mix",...pe});ua(Y,{noResolve:H,...pe}),globalThis[Symbol.for("stage_mix")]={get value(){return Ie}};let X={initialData:void 0,initialError:void 0},Oe=M`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`,Ue=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`;l.stage_mix_summary_data&&(l.stage_mix_summary_data instanceof Error?X.initialError=l.stage_mix_summary_data:X.initialData=l.stage_mix_summary_data,l.stage_mix_summary_columns&&(X.knownColumns=l.stage_mix_summary_columns));let ie,Ha=!1;const fa=Pe.createReactive({callback:z=>{r(0,ie=z)},execFn:m},{id:"stage_mix_summary",...X});fa(Ue,{noResolve:Oe,...X}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return ie}};let he={initialData:void 0,initialError:void 0},se=M`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`,Ke=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;l.poi_mix_data&&(l.poi_mix_data instanceof Error?he.initialError=l.poi_mix_data:he.initialData=l.poi_mix_data,l.poi_mix_columns&&(he.knownColumns=l.poi_mix_columns));let $e,La=!1;const ga=Pe.createReactive({callback:z=>{r(3,$e=z)},execFn:m},{id:"poi_mix",...he});ga(Ke,{noResolve:se,...he}),globalThis[Symbol.for("poi_mix")]={get value(){return $e}};let oe={initialData:void 0,initialError:void 0},xe=M`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${f.code}'
  )
order by oa_domain desc`,ze=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${f.code}'
  )
order by oa_domain desc`;l.oa_arealevel_data&&(l.oa_arealevel_data instanceof Error?oe.initialError=l.oa_arealevel_data:oe.initialData=l.oa_arealevel_data,l.oa_arealevel_columns&&(oe.knownColumns=l.oa_arealevel_columns));let We,le=!1;const de=Pe.createReactive({callback:z=>{r(4,We=z)},execFn:m},{id:"oa_arealevel",...oe});de(ze,{noResolve:xe,...oe}),globalThis[Symbol.for("oa_arealevel")]={get value(){return We}};let ye={initialData:void 0,initialError:void 0},Ae=M`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and dominance_group = '${v.dom_group.value}'
  and snapshot_year = ${v.dom_year.value}
  and substr(area_code, 1, 2) = '${f.code}'`,Ee=`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and dominance_group = '${v.dom_group.value}'
  and snapshot_year = ${v.dom_year.value}
  and substr(area_code, 1, 2) = '${f.code}'`;l.dom_suppressed_count_data&&(l.dom_suppressed_count_data instanceof Error?ye.initialError=l.dom_suppressed_count_data:ye.initialData=l.dom_suppressed_count_data,l.dom_suppressed_count_columns&&(ye.knownColumns=l.dom_suppressed_count_columns));let Te,Fa=!1;const pa=Pe.createReactive({callback:z=>{r(5,Te=z)},execFn:m},{id:"dom_suppressed_count",...ye});pa(Ee,{noResolve:Ae,...ye}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return Te}};let ee={initialData:void 0,initialError:void 0},Qe=M`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${v.dom_group.value}'
    and d.snapshot_year = ${v.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${f.code}'
order by d.hhi desc
limit 15`,Ze=`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${v.dom_group.value}'
    and d.snapshot_year = ${v.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${f.code}'
order by d.hhi desc
limit 15`;l.dominance_children_data&&(l.dominance_children_data instanceof Error?ee.initialError=l.dominance_children_data:ee.initialData=l.dominance_children_data,l.dominance_children_columns&&(ee.knownColumns=l.dominance_children_columns));let qe,ha=!1;const Se=Pe.createReactive({callback:z=>{r(6,qe=z)},execFn:m},{id:"dominance_children",...ee});Se(Ze,{noResolve:Qe,...ee}),globalThis[Symbol.for("dominance_children")]={get value(){return qe}};let Ce={initialData:void 0,initialError:void 0},_e=M`select
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
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
order by reference_year desc
limit 1`,Ge=`select
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
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
order by reference_year desc
limit 1`;l.demographics_data&&(l.demographics_data instanceof Error?Ce.initialError=l.demographics_data:Ce.initialData=l.demographics_data,l.demographics_columns&&(Ce.knownColumns=l.demographics_columns));let Ve,Be=!1;const ya=Pe.createReactive({callback:z=>{r(7,Ve=z)},execFn:m},{id:"demographics",...Ce});ya(Ge,{noResolve:_e,...Ce}),globalThis[Symbol.for("demographics")]={get value(){return Ve}};let be={initialData:void 0,initialError:void 0},ce=M`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
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
order by sort_order`,Je=`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
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
order by sort_order`;l.age_mix_data&&(l.age_mix_data instanceof Error?be.initialError=l.age_mix_data:be.initialData=l.age_mix_data,l.age_mix_columns&&(be.knownColumns=l.age_mix_columns));let Me,Pa=!1;const ba=Pe.createReactive({callback:z=>{r(8,Me=z)},execFn:m},{id:"age_mix",...be});ba(Je,{noResolve:ce,...be}),globalThis[Symbol.for("age_mix")]={get value(){return Me}};let ae={initialData:void 0,initialError:void 0},Ye=M`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${f.code}' as feature_key,
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
where bezirk_code = '${f.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Ua}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by sort_order, area_name`,Xe=`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${f.code}' as feature_key,
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
where bezirk_code = '${f.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Ua}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by sort_order, area_name`;l.minimap_areas_data&&(l.minimap_areas_data instanceof Error?ae.initialError=l.minimap_areas_data:ae.initialData=l.minimap_areas_data,l.minimap_areas_columns&&(ae.knownColumns=l.minimap_areas_columns));let ea,He=!1;const va=Pe.createReactive({callback:z=>{r(9,ea=z)},execFn:m},{id:"minimap_areas",...ae});va(Xe,{noResolve:Ye,...ae}),globalThis[Symbol.for("minimap_areas")]={get value(){return ea}};let me={initialData:void 0,initialError:void 0},Le=M`select
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
  and substr(d.area_code, 1, 2) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`,ve=`select
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
  and substr(d.area_code, 1, 2) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`;l.children_data&&(l.children_data instanceof Error?me.initialError=l.children_data:me.initialData=l.children_data,l.children_columns&&(me.knownColumns=l.children_columns));let $a,aa=!1;const ta=Pe.createReactive({callback:z=>{r(10,$a=z)},execFn:m},{id:"children",...me});ta(ve,{noResolve:Le,...me}),globalThis[Symbol.for("children")]={get value(){return $a}};let ue={initialData:void 0,initialError:void 0},Fe=M`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by area_name`,fe=`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by area_name`;l.ortsteile_data&&(l.ortsteile_data instanceof Error?ue.initialError=l.ortsteile_data:ue.initialData=l.ortsteile_data,l.ortsteile_columns&&(ue.knownColumns=l.ortsteile_columns));let Da,wa=!1;const ra=Pe.createReactive({callback:z=>{r(11,Da=z)},execFn:m},{id:"ortsteile",...ue});return ra(fe,{noResolve:Fe,...ue}),globalThis[Symbol.for("ortsteile")]={get value(){return Da}},i.$$set=z=>{"data"in z&&r(13,c=z.data)},i.$$.update=()=>{i.$$.dirty[0]&8192&&r(14,{data:l={},customFormattingSettings:p,__db:E}=c,l),i.$$.dirty[0]&16384&&wr.set(Object.keys(l).length>0),i.$$.dirty[2]&16&&r(16,f=o.params),i.$$.dirty[0]&65536&&r(18,ke=M`select bezirk_name
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
where bezirk_code = '${f.code}'`),i.$$.dirty[0]&65536&&r(19,ge=`select bezirk_name
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
where bezirk_code = '${f.code}'`),i.$$.dirty[0]&1966080&&(ke||!ma?ke||(Ne(ge,{noResolve:ke,...je}),r(20,ma=!0)):Ne(ge,{noResolve:ke})),i.$$.dirty[0]&65536&&r(22,H=M`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&65536&&r(23,Y=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 2) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&31457280&&(H||!Re?H||(ua(Y,{noResolve:H,...pe}),r(24,Re=!0)):ua(Y,{noResolve:H})),i.$$.dirty[0]&65536&&r(26,Oe=M`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&65536&&r(27,Ue=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- the "N of M ... no single stage holds a majority" distributional headline §2.2 row 2
-- requires at context_only grain, in place of a re-scored point value (see header comment).
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 2) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&503316480&&(Oe||!Ha?Oe||(fa(Ue,{noResolve:Oe,...X}),r(28,Ha=!0)):fa(Ue,{noResolve:Oe})),i.$$.dirty[0]&65536&&r(30,se=M`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[0]&65536&&r(31,Ke=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 2) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[0]&1610612736|i.$$.dirty[1]&3&&(se||!La?se||(ga(Ke,{noResolve:se,...he}),r(32,La=!0)):ga(Ke,{noResolve:se})),i.$$.dirty[0]&65536&&r(34,xe=M`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${f.code}'
  )
order by oa_domain desc`),i.$$.dirty[0]&65536&&r(35,ze=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bezirk' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bezirk' and area_code = '${f.code}'
  )
order by oa_domain desc`),i.$$.dirty[1]&60&&(xe||!le?xe||(de(ze,{noResolve:xe,...oe}),r(36,le=!0)):de(ze,{noResolve:xe})),i.$$.dirty[0]&98304&&r(38,Ae=M`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and dominance_group = '${v.dom_group.value}'
  and snapshot_year = ${v.dom_year.value}
  and substr(area_code, 1, 2) = '${f.code}'`),i.$$.dirty[0]&98304&&r(39,Ee=`-- Disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same discipline as the
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
  and dominance_group = '${v.dom_group.value}'
  and snapshot_year = ${v.dom_year.value}
  and substr(area_code, 1, 2) = '${f.code}'`),i.$$.dirty[1]&960&&(Ae||!Fa?Ae||(pa(Ee,{noResolve:Ae,...ye}),r(40,Fa=!0)):pa(Ee,{noResolve:Ae})),i.$$.dirty[0]&98304&&r(42,Qe=M`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${v.dom_group.value}'
    and d.snapshot_year = ${v.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${f.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&98304&&r(43,Ze=`-- This district's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${v.dom_group.value}'
    and d.snapshot_year = ${v.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 2) = '${f.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&15360&&(Qe||!ha?Qe||(Se(Ze,{noResolve:Qe,...ee}),r(44,ha=!0)):Se(Ze,{noResolve:Qe})),i.$$.dirty[0]&65536&&r(46,_e=M`select
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
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
order by reference_year desc
limit 1`),i.$$.dirty[0]&65536&&r(47,Ge=`select
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
where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
order by reference_year desc
limit 1`),i.$$.dirty[1]&245760&&(_e||!Be?_e||(ya(Ge,{noResolve:_e,...Ce}),r(48,Be=!0)):ya(Ge,{noResolve:_e})),i.$$.dirty[0]&65536&&r(50,ce=M`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
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
order by sort_order`),i.$$.dirty[0]&65536&&r(51,Je=`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'bezirk' and area_code = '${f.code}'
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
order by sort_order`),i.$$.dirty[1]&3932160&&(ce||!Pa?ce||(ba(Je,{noResolve:ce,...be}),r(52,Pa=!0)):ba(Je,{noResolve:ce})),i.$$.dirty[0]&65536&&r(54,Ye=M`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${f.code}' as feature_key,
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
where bezirk_code = '${f.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Ua}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by sort_order, area_name`),i.$$.dirty[0]&65536&&r(55,Xe=`-- Self row's name resolved via the same fixed 12-entry lookup as this page's own \`bezirk_name\`
-- query above, re-expressed in SQL only (not a JS-templated string literal) so this query's SQL
-- syntax can never depend on the contents of an external name value -- same defensive reasoning
-- applied throughout this section for the WFS-sourced PGR/BZR/Ortsteil/Hamburg names.
select
    'bezirk:' || '${f.code}' as feature_key,
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
where bezirk_code = '${f.code}'
union all
select
    'pgr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${Ua}/berlin/area/pgr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by sort_order, area_name`),i.$$.dirty[1]&62914560&&(Ye||!He?Ye||(va(Xe,{noResolve:Ye,...ae}),r(56,He=!0)):va(Xe,{noResolve:Ye})),i.$$.dirty[0]&65536&&r(58,Le=M`select
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
  and substr(d.area_code, 1, 2) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`),i.$$.dirty[0]&65536&&r(59,ve=`select
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
  and substr(d.area_code, 1, 2) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'pgr'
  )
order by d.residents_total desc nulls last`),i.$$.dirty[1]&1006632960&&(Le||!aa?Le||(ta(ve,{noResolve:Le,...me}),r(60,aa=!0)):ta(ve,{noResolve:Le})),i.$$.dirty[0]&65536&&r(62,Fe=M`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by area_name`),i.$$.dirty[0]&65536&&r(63,fe=`select
    area_code,
    area_name,
    '/berlin/area/ortsteil/' || area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil'
  -- #255-style defensive guard, see the matching comment above this page's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 2) = '${f.code}'
order by area_name`),i.$$.dirty[1]&1073741824|i.$$.dirty[2]&7&&(Fe||!wa?Fe||(ra(fe,{noResolve:Fe,...ue}),r(64,wa=!0)):ra(fe,{noResolve:Fe})),i.$$.dirty[0]&1&&r(65,a=ie==null?void 0:ie[0]),i.$$.dirty[2]&8&&r(12,s=!a||a.n_total==null||Number(a.n_total)===0?null:(()=>{const z=Number(a.n_total),ka=Number(a.n_advanced||0),we=a.top_stage_share!=null?Number(a.top_stage_share):null,Ka=we!=null&&we>.5?`<b>${a.top_stage}</b> is the only stage holding a majority (${Math.round(we*100)}%)`:"no single stage holds a majority";return`<b>${ka}</b> of <b>${z}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${Ka} — a distribution across this district's own neighbourhoods, never a single re-scored gentrification-index value for the district itself.`})())},[ie,Ma,Ie,$e,We,Te,qe,Ve,Me,ea,$a,Da,s,c,l,v,f,je,ke,ge,ma,pe,H,Y,Re,X,Oe,Ue,Ha,he,se,Ke,La,oe,xe,ze,le,ye,Ae,Ee,Fa,ee,Qe,Ze,ha,Ce,_e,Ge,Be,be,ce,Je,Pa,ae,Ye,Xe,He,me,Le,ve,aa,ue,Fe,fe,wa,a,o]}class pn extends fr{constructor(t){super(),gr(this,t,Jr,Vr,sr,{data:13},null,[-1,-1,-1])}}export{pn as component};
