import{s as qr,d as _,i as c,a as de,b as R,c as y,h as Tr,e as E,f as Rt,r as va,t as B,g as L,j as v,k as x,u as P,l as ir,m as Sr,o as Br,n as Pr,p as Cr,q as D,v as Lr,H as jr,w as Za}from"../chunks/scheduler.BopPEjhc.js";import{S as Mr,i as Hr,d as b,t as h,a as p,c as re,m as $,b as w,e as k,g as ne}from"../chunks/index.CYkVJg6_.js";import{A as Dr}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as Fr}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as Ar}from"../chunks/Hero.CRoRGI02.js";import{D as St,C as ea}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as ot,w as Ir}from"../chunks/entry.BMmpG6A7.js";import{A as ya}from"../chunks/Alert.BO8kFSQK.js";import{e as Nr,s as Or,Q as qe,p as Ur,a as or,r as lr,C as Kr}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as j}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as _r,a as ha}from"../chunks/Dropdown.BxlIFH-r.js";import{p as Qr}from"../chunks/stores.Ceyp10jj.js";import{Q as Te}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as Pt}from"../chunks/BarChart.DzrCmZ_r.js";import{B as Bt}from"../chunks/BigValue.Ck7K9e2S.js";import{p as Wr}from"../chunks/profile.BW8tN6E9.js";function Gr(i){var n;let t,r=(C.title??((n=C.og)==null?void 0:n.title))+"",a;return{c(){t=x("h1"),a=P(r),this.h()},l(o){t=E(o,"H1",{class:!0});var u=va(t);a=B(u,r),u.forEach(_),this.h()},h(){R(t,"class","title")},m(o,u){c(o,t,u),de(t,a)},p:D,d(o){o&&_(t)}}}function Zr(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:D,p:D,d:D}}function Vr(i){var u;let t,r,a,n,o;return document.title=t=C.title??((u=C.og)==null?void 0:u.title),{c(){r=v(),a=x("meta"),n=v(),o=x("meta"),this.h()},l(d){r=y(d),a=E(d,"META",{property:!0,content:!0}),n=y(d),o=E(d,"META",{name:!0,content:!0}),this.h()},h(){var d,l;R(a,"property","og:title"),R(a,"content",((d=C.og)==null?void 0:d.title)??C.title),R(o,"name","twitter:title"),R(o,"content",((l=C.og)==null?void 0:l.title)??C.title)},m(d,l){c(d,r,l),c(d,a,l),c(d,n,l),c(d,o,l)},p(d,l){var g;l&0&&t!==(t=C.title??((g=C.og)==null?void 0:g.title))&&(document.title=t)},d(d){d&&(_(r),_(a),_(n),_(o))}}}function Jr(i){var o,u;let t,r,a=(C.description||((o=C.og)==null?void 0:o.description))&&Yr(),n=((u=C.og)==null?void 0:u.image)&&Xr();return{c(){a&&a.c(),t=v(),n&&n.c(),r=Rt()},l(d){a&&a.l(d),t=y(d),n&&n.l(d),r=Rt()},m(d,l){a&&a.m(d,l),c(d,t,l),n&&n.m(d,l),c(d,r,l)},p(d,l){var g,z;(C.description||(g=C.og)!=null&&g.description)&&a.p(d,l),(z=C.og)!=null&&z.image&&n.p(d,l)},d(d){d&&(_(t),_(r)),a&&a.d(d),n&&n.d(d)}}}function Yr(i){let t,r,a,n,o;return{c(){t=x("meta"),r=v(),a=x("meta"),n=v(),o=x("meta"),this.h()},l(u){t=E(u,"META",{name:!0,content:!0}),r=y(u),a=E(u,"META",{property:!0,content:!0}),n=y(u),o=E(u,"META",{name:!0,content:!0}),this.h()},h(){var u,d,l;R(t,"name","description"),R(t,"content",C.description??((u=C.og)==null?void 0:u.description)),R(a,"property","og:description"),R(a,"content",((d=C.og)==null?void 0:d.description)??C.description),R(o,"name","twitter:description"),R(o,"content",((l=C.og)==null?void 0:l.description)??C.description)},m(u,d){c(u,t,d),c(u,r,d),c(u,a,d),c(u,n,d),c(u,o,d)},p:D,d(u){u&&(_(t),_(r),_(a),_(n),_(o))}}}function Xr(i){let t,r,a;return{c(){t=x("meta"),r=v(),a=x("meta"),this.h()},l(n){t=E(n,"META",{property:!0,content:!0}),r=y(n),a=E(n,"META",{name:!0,content:!0}),this.h()},h(){var n,o;R(t,"property","og:image"),R(t,"content",or((n=C.og)==null?void 0:n.image)),R(a,"name","twitter:image"),R(a,"content",or((o=C.og)==null?void 0:o.image))},m(n,o){c(n,t,o),c(n,r,o),c(n,a,o)},p:D,d(n){n&&(_(t),_(r),_(a))}}}function dr(i){let t,r;return t=new Te({props:{queryID:"pgr_name",queryResult:i[1]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function cr(i){let t,r;return t=new Te({props:{queryID:"bezirk_name",queryResult:i[2]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function en(i){let t,r="District profile";return{c(){t=x("a"),t.textContent=r,this.h()},l(a){t=E(a,"A",{href:!0,"data-svelte-h":!0}),L(t)!=="svelte-1trtuzf"&&(t.textContent=r),this.h()},h(){R(t,"href","/gentriduck/berlin/area/bezirk")},m(a,n){c(a,t,n)},p:D,d(a){a&&_(t)}}}function an(i){let t,r=i[2][0].bezirk_name+"",a,n;return{c(){t=x("a"),a=P(r),this.h()},l(o){t=E(o,"A",{href:!0});var u=va(t);a=B(u,r),u.forEach(_),this.h()},h(){R(t,"href",n="/gentriduck/berlin/area/bezirk/"+i[2][0].bezirk_code)},m(o,u){c(o,t,u),de(t,a)},p(o,u){u[0]&4&&r!==(r=o[2][0].bezirk_name+"")&&Za(a,r),u[0]&4&&n!==(n="/gentriduck/berlin/area/bezirk/"+o[2][0].bezirk_code)&&R(t,"href",n)},d(o){o&&_(t)}}}function tn(i){let t,r,a="sums and population-weighted averages",n,o,u="methodology page",d;return{c(){t=P("Figures on this page are "),r=x("b"),r.textContent=a,n=P(` of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  `),o=x("a"),o.textContent=u,d=P(" for why coarse-grain areas are not re-scored."),this.h()},l(l){t=B(l,"Figures on this page are "),r=E(l,"B",{"data-svelte-h":!0}),L(r)!=="svelte-rhlwxq"&&(r.textContent=a),n=B(l,` of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  `),o=E(l,"A",{href:!0,"data-svelte-h":!0}),L(o)!=="svelte-1l2pw3"&&(o.textContent=u),d=B(l," for why coarse-grain areas are not re-scored."),this.h()},h(){R(o,"href","/gentriduck/methodology")},m(l,g){c(l,t,g),c(l,r,g),c(l,n,g),c(l,o,g),c(l,d,g)},p:D,d(l){l&&(_(t),_(r),_(n),_(o),_(d))}}}function mr(i){let t,r;return t=new Te({props:{queryID:"stage_mix",queryResult:i[3]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function ur(i){let t,r;return t=new Te({props:{queryID:"stage_mix_summary",queryResult:i[0]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function rn(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[sn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function nn(i){let t,r;return{c(){t=x("p"),r=new jr(!1),this.h()},l(a){t=E(a,"P",{});var n=va(t);r=Lr(n,!1),n.forEach(_),this.h()},h(){r.a=null},m(a,n){c(a,t,n),r.m(i[13],t)},p(a,n){n[0]&8192&&r.p(a[13])},i:D,o:D,d(a){a&&_(t)}}}function sn(i){let t;return{c(){t=P("No neighbourhood-stage data available for this area.")},l(r){t=B(r,"No neighbourhood-stage data available for this area.")},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function fr(i){let t,r;return t=new Te({props:{queryID:"poi_mix",queryResult:i[4]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function on(i){let t,r="Context only — never a Kiez-level claim.",a,n,o="Offering Advantage decoder",u;return{c(){t=x("b"),t.textContent=r,a=P(` A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  `),n=x("a"),n.textContent=o,u=P(` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},l(d){t=E(d,"B",{"data-svelte-h":!0}),L(t)!=="svelte-a7l1s8"&&(t.textContent=r),a=B(d,` A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  `),n=E(d,"A",{href:!0,"data-svelte-h":!0}),L(n)!=="svelte-168mye8"&&(n.textContent=o),u=B(d,` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},h(){R(n,"href","/gentriduck/methodology-oa-modes")},m(d,l){c(d,t,l),c(d,a,l),c(d,n,l),c(d,u,l)},p:D,d(d){d&&(_(t),_(a),_(n),_(u))}}}function pr(i){let t,r;return t=new Te({props:{queryID:"oa_arealevel",queryResult:i[5]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function gr(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[ln]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function ln(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,n,o="Offering Advantage decoder",u;return{c(){t=x("b"),t.textContent=r,a=P(` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=x("a"),n.textContent=o,u=P(" §4/§7 for the full finding."),this.h()},l(d){t=E(d,"B",{"data-svelte-h":!0}),L(t)!=="svelte-1impqbu"&&(t.textContent=r),a=B(d,` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=E(d,"A",{href:!0,"data-svelte-h":!0}),L(n)!=="svelte-168mye8"&&(n.textContent=o),u=B(d," §4/§7 for the full finding."),this.h()},h(){R(n,"href","/gentriduck/methodology-oa-modes")},m(d,l){c(d,t,l),c(d,a,l),c(d,n,l),c(d,u,l)},p:D,d(d){d&&(_(t),_(a),_(n),_(u))}}}function _n(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[cn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function dn(i){let t,r;return t=new Pt({props:{data:i[5],x:"poi_domain_h",y:"pct_vs_baseline",title:"Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this Prognoseraum."}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.data=a[5]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function cn(i){let t;return{c(){t=P("No Offering Advantage data for this Prognoseraum.")},l(r){t=B(r,"No Offering Advantage data for this Prognoseraum.")},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function hr(i){let t,r;return t=new ya({props:{status:"info",$$slots:{default:[mn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function mn(i){let t;return{c(){t=P(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=B(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function un(i){let t,r="Dominance is sign-blind",a,n,o="Offering Advantage decoder",u;return{c(){t=x("b"),t.textContent=r,a=P(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=x("a"),n.textContent=o,u=P(" §5 for the full ethics note."),this.h()},l(d){t=E(d,"B",{"data-svelte-h":!0}),L(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=B(d,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=E(d,"A",{href:!0,"data-svelte-h":!0}),L(n)!=="svelte-168mye8"&&(n.textContent=o),u=B(d," §5 for the full ethics note."),this.h()},h(){R(n,"href","/gentriduck/methodology-oa-modes")},m(d,l){c(d,t,l),c(d,a,l),c(d,n,l),c(d,u,l)},p:D,d(d){d&&(_(t),_(a),_(n),_(u))}}}function fn(i){let t,r,a,n,o,u,d,l;return t=new ha({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new ha({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new ha({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),d=new ha({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(o.$$.fragment),u=v(),k(d.$$.fragment)},l(g){w(t.$$.fragment,g),r=y(g),w(a.$$.fragment,g),n=y(g),w(o.$$.fragment,g),u=y(g),w(d.$$.fragment,g)},m(g,z){$(t,g,z),c(g,r,z),$(a,g,z),c(g,n,z),$(o,g,z),c(g,u,z),$(d,g,z),l=!0},p:D,i(g){l||(p(t.$$.fragment,g),p(a.$$.fragment,g),p(o.$$.fragment,g),p(d.$$.fragment,g),l=!0)},o(g){h(t.$$.fragment,g),h(a.$$.fragment,g),h(o.$$.fragment,g),h(d.$$.fragment,g),l=!1},d(g){g&&(_(r),_(n),_(u)),b(t,g),b(a,g),b(o,g),b(d,g)}}}function pn(i){let t,r,a,n,o,u,d,l,g,z,q,H;return t=new ha({props:{value:"2025",valueLabel:"2025"}}),a=new ha({props:{value:"2024",valueLabel:"2024"}}),o=new ha({props:{value:"2023",valueLabel:"2023"}}),d=new ha({props:{value:"2022",valueLabel:"2022"}}),g=new ha({props:{value:"2021",valueLabel:"2021"}}),q=new ha({props:{value:"2020",valueLabel:"2020"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(o.$$.fragment),u=v(),k(d.$$.fragment),l=v(),k(g.$$.fragment),z=v(),k(q.$$.fragment)},l(m){w(t.$$.fragment,m),r=y(m),w(a.$$.fragment,m),n=y(m),w(o.$$.fragment,m),u=y(m),w(d.$$.fragment,m),l=y(m),w(g.$$.fragment,m),z=y(m),w(q.$$.fragment,m)},m(m,f){$(t,m,f),c(m,r,f),$(a,m,f),c(m,n,f),$(o,m,f),c(m,u,f),$(d,m,f),c(m,l,f),$(g,m,f),c(m,z,f),$(q,m,f),H=!0},p:D,i(m){H||(p(t.$$.fragment,m),p(a.$$.fragment,m),p(o.$$.fragment,m),p(d.$$.fragment,m),p(g.$$.fragment,m),p(q.$$.fragment,m),H=!0)},o(m){h(t.$$.fragment,m),h(a.$$.fragment,m),h(o.$$.fragment,m),h(d.$$.fragment,m),h(g.$$.fragment,m),h(q.$$.fragment,m),H=!1},d(m){m&&(_(r),_(n),_(u),_(l),_(z)),b(t,m),b(a,m),b(o,m),b(d,m),b(g,m),b(q,m)}}}function yr(i){let t,r;return t=new Te({props:{queryID:"dom_suppressed_count",queryResult:i[6]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function gn(i){let t,r=(i[6][0]?i[6][0].n_suppressed:0)+"",a,n,o=(i[6][0]?i[6][0].n_suppressed+i[6][0].n_shown:0)+"",u,d,l;return{c(){t=x("b"),a=P(r),n=P(" of "),u=P(o),d=P(" neighbourhoods here are suppressed below as too thinly observed to characterize"),l=P(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(g){t=E(g,"B",{});var z=va(t);a=B(z,r),n=B(z," of "),u=B(z,o),d=B(z," neighbourhoods here are suppressed below as too thinly observed to characterize"),z.forEach(_),l=B(g,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(g,z){c(g,t,z),de(t,a),de(t,n),de(t,u),de(t,d),c(g,l,z)},p(g,z){z[0]&64&&r!==(r=(g[6][0]?g[6][0].n_suppressed:0)+"")&&Za(a,r),z[0]&64&&o!==(o=(g[6][0]?g[6][0].n_suppressed+g[6][0].n_shown:0)+"")&&Za(u,o)},d(g){g&&(_(t),_(l))}}}function vr(i){let t,r;return t=new Te({props:{queryID:"dominance_children",queryResult:i[7]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function hn(i){let t,r,a,n,o,u,d,l,g,z,q,H;return t=new ea({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new ea({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new ea({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),d=new ea({props:{id:"top_child",title:"Leading type"}}),g=new ea({props:{id:"n_children",title:"Types in this group here"}}),q=new ea({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(o.$$.fragment),u=v(),k(d.$$.fragment),l=v(),k(g.$$.fragment),z=v(),k(q.$$.fragment)},l(m){w(t.$$.fragment,m),r=y(m),w(a.$$.fragment,m),n=y(m),w(o.$$.fragment,m),u=y(m),w(d.$$.fragment,m),l=y(m),w(g.$$.fragment,m),z=y(m),w(q.$$.fragment,m)},m(m,f){$(t,m,f),c(m,r,f),$(a,m,f),c(m,n,f),$(o,m,f),c(m,u,f),$(d,m,f),c(m,l,f),$(g,m,f),c(m,z,f),$(q,m,f),H=!0},p:D,i(m){H||(p(t.$$.fragment,m),p(a.$$.fragment,m),p(o.$$.fragment,m),p(d.$$.fragment,m),p(g.$$.fragment,m),p(q.$$.fragment,m),H=!0)},o(m){h(t.$$.fragment,m),h(a.$$.fragment,m),h(o.$$.fragment,m),h(d.$$.fragment,m),h(g.$$.fragment,m),h(q.$$.fragment,m),H=!1},d(m){m&&(_(r),_(n),_(u),_(l),_(z)),b(t,m),b(a,m),b(o,m),b(d,m),b(g,m),b(q,m)}}}function br(i){let t,r;return t=new Te({props:{queryID:"demographics",queryResult:i[8]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function $r(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[yn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function yn(i){let t;return{c(){t=P(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},l(r){t=B(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function wr(i){let t,r;return t=new Te({props:{queryID:"amenities_current",queryResult:i[9]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function kr(i){let t,r;return t=new Te({props:{queryID:"amenities_table",queryResult:i[10]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&1024&&(o.queryResult=a[10]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function vn(i){let t;return{c(){t=P("No amenity data is available for this area yet.")},l(r){t=B(r,"No amenity data is available for this area yet.")},m(r,a){c(r,t,a)},p:D,d(r){r&&_(t)}}}function bn(i){let t,r,a=i[9][0].snapshot_year+"",n,o;return{c(){t=P("Based on OpenStreetMap tagging as of "),r=x("b"),n=P(a),o=P(`, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(u){t=B(u,"Based on OpenStreetMap tagging as of "),r=E(u,"B",{});var d=va(r);n=B(d,a),d.forEach(_),o=B(u,`, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(u,d){c(u,t,d),c(u,r,d),de(r,n),c(u,o,d)},p(u,d){d[0]&512&&a!==(a=u[9][0].snapshot_year+"")&&Za(n,a)},d(u){u&&(_(t),_(r),_(o))}}}function $n(i){let t,r,a,n,o,u;return t=new ea({props:{id:"indicator",title:"Infrastructure"}}),a=new ea({props:{id:"area_value",title:"This Prognoseraum"}}),o=new ea({props:{id:"district_value",title:"District total"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(o.$$.fragment)},l(d){w(t.$$.fragment,d),r=y(d),w(a.$$.fragment,d),n=y(d),w(o.$$.fragment,d)},m(d,l){$(t,d,l),c(d,r,l),$(a,d,l),c(d,n,l),$(o,d,l),u=!0},p:D,i(d){u||(p(t.$$.fragment,d),p(a.$$.fragment,d),p(o.$$.fragment,d),u=!0)},o(d){h(t.$$.fragment,d),h(a.$$.fragment,d),h(o.$$.fragment,d),u=!1},d(d){d&&(_(r),_(n)),b(t,d),b(a,d),b(o,d)}}}function wn(i){let t,r,a="0",n,o,u="open-data",d;return{c(){t=P("These figures come from OpenStreetMap tagging, not an official registry. A "),r=x("b"),r.textContent=a,n=P(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=x("a"),o.textContent=u,d=P(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(l){t=B(l,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=E(l,"B",{"data-svelte-h":!0}),L(r)!=="svelte-12bhsds"&&(r.textContent=a),n=B(l,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=E(l,"A",{href:!0,"data-svelte-h":!0}),L(o)!=="svelte-1jijq3i"&&(o.textContent=u),d=B(l,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){R(o,"href","/gentriduck/open-data")},m(l,g){c(l,t,g),c(l,r,g),c(l,n,g),c(l,o,g),c(l,d,g)},p:D,d(l){l&&(_(t),_(r),_(n),_(o),_(d))}}}function kn(i){let t;return{c(){t=P(`There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=B(r,`There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){c(r,t,a)},p:D,d(r){r&&_(t)}}}function Rn(i){let t,r,a=i[9][0].gastro_poi_with_cuisine_count+"",n,o,u,d="most common cuisine",l,g,z=i[9][0].dominant_cuisine+"",q,H,m=Math.round(i[9][0].dominant_cuisine_share*100)+"",f,ce;return{c(){t=P("Among "),r=x("b"),n=P(a),o=P(` restaurants/cafes with cuisine
data tagged in this Prognoseraum, the `),u=x("b"),u.textContent=d,l=P(` is
`),g=x("b"),q=P(z),H=P(`
(`),f=P(m),ce=P("% of tagged gastronomy POIs).")},l(S){t=B(S,"Among "),r=E(S,"B",{});var M=va(r);n=B(M,a),M.forEach(_),o=B(S,` restaurants/cafes with cuisine
data tagged in this Prognoseraum, the `),u=E(S,"B",{"data-svelte-h":!0}),L(u)!=="svelte-1floooe"&&(u.textContent=d),l=B(S,` is
`),g=E(S,"B",{});var Ge=va(g);q=B(Ge,z),Ge.forEach(_),H=B(S,`
(`),f=B(S,m),ce=B(S,"% of tagged gastronomy POIs).")},m(S,M){c(S,t,M),c(S,r,M),de(r,n),c(S,o,M),c(S,u,M),c(S,l,M),c(S,g,M),de(g,q),c(S,H,M),c(S,f,M),c(S,ce,M)},p(S,M){M[0]&512&&a!==(a=S[9][0].gastro_poi_with_cuisine_count+"")&&Za(n,a),M[0]&512&&z!==(z=S[9][0].dominant_cuisine+"")&&Za(q,z),M[0]&512&&m!==(m=Math.round(S[9][0].dominant_cuisine_share*100)+"")&&Za(f,m)},d(S){S&&(_(t),_(r),_(o),_(u),_(l),_(g),_(H),_(f),_(ce))}}}function Rr(i){let t,r;return t=new Te({props:{queryID:"minimap_areas",queryResult:i[11]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function zr(i){let t,r;return t=new Te({props:{queryID:"children",queryResult:i[12]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const o={};n[0]&4096&&(o.queryResult=a[12]),t.$set(o)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function zn(i){let t,r,a,n;return t=new ea({props:{id:"area_name",title:"Bezirksregion"}}),a=new ea({props:{id:"residents_total",title:"Residents",fmt:"num0"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment)},l(o){w(t.$$.fragment,o),r=y(o),w(a.$$.fragment,o)},m(o,u){$(t,o,u),c(o,r,u),$(a,o,u),n=!0},p:D,i(o){n||(p(t.$$.fragment,o),p(a.$$.fragment,o),n=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),n=!1},d(o){o&&_(r),b(t,o),b(a,o)}}}function En(i){var Wt;let t,r,a,n,o,u,d,l,g,z,q,H,m,f="all districts",ce,S,M="full neighbourhood list",Ge,Se,xa,se,aa='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',ta,Be,Va=`Every neighbourhood (Planungsraum) in this Prognoseraum is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This page reports the <strong class="markdown">distribution</strong> of
those neighbourhood-level stages — never a single re-scored index value for the Prognoseraum itself,
since averaging ordinal stage codes across such different neighbourhoods would mask exactly the
neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see &quot;Honest
caveats&quot; below).`,qa,ye,ve,te,me,ra,Pe,Ce,ie,Ta='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Ze,Ee,Ja='<a href="#mapped-places">Mapped places</a>',Le,be,$e,Sa,xe,Ya='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',je,ue,na,sa,ia,fe,F,we,ba=i[5].some(Er),oa,Me,Xa=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule.`,He,oe,Ba='<a href="#within-group-dominance">Within-group dominance</a>',Pa,De,Ca,pe,Fe,ke,La,la,Ae,Ie,Re,ze,ja,Ne,et=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Oe,le,Ma='<a href="#people--structure">People &amp; structure</a>',Ha,_a,Ue,Ke,ge,da,Qe,Da,ca,_e,ma='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',ua,fa,pa,Ve,T,We,Fa,ga,lt,Qa,_t,Wa,Ct=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,dt,$a,Lt='<a href="#where-this-area-sits">Where this area sits</a>',ct,at,Aa,mt,wa,jt='<a href="#bezirksregionen-in-this-prognoseraum">Bezirksregionen in this Prognoseraum</a>',ut,tt,Ia,ft,ka,Mt='<a href="#honest-caveats">Honest caveats</a>',pt,Na,Ht=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Prognoseraum</strong> —
only the distribution of its constituent neighbourhoods&#39; (Planungsräume) own stages. A population-
weighted average of ordinal stage/Dynamik classes would violate this project&#39;s own &quot;never average
ordinal class codes&quot; rule and would describe no actual neighbourhood while masking exactly the
frontier heterogeneity gentrification tracking depends on (see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code>,
both <strong class="markdown">decline</strong> the coarse-grain point value).</li> <li class="markdown"><strong class="markdown">Offering Advantage and within-group dominance figures on this page describe the whole pooled
Prognoseraum — a district pools several very different neighbourhoods into one number.</strong> See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> before comparing areas.</li> <li class="markdown">Figures on this page are <strong class="markdown">sums and population-weighted averages</strong> of this Prognoseraum&#39;s
neighbourhoods, never observed at the Prognoseraum level itself. Land value and estimated rent
are only published at the individual-neighbourhood grain — see any neighbourhood&#39;s own page
(linked above) for those figures.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,gt,Ra,Dt='<a href="#further-reading">Further reading</a>',ht,Oa,Ft=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other areas, or drill into any of this Prognoseraum&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,yt,nt,vt,Ga,bt,za=typeof C<"u"&&(C.title||((Wt=C.og)==null?void 0:Wt.title))&&C.hide_title!==!0&&Gr();function xr(e,s){var he;return typeof C<"u"&&(C.title||(he=C.og)!=null&&he.title)?Vr:Zr}let st=xr()(i),Ea=typeof C=="object"&&Jr(),A=i[1]&&dr(i),I=i[2]&&cr(i);l=new Ar({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(i[1][0]&&i[1][0].area_name)+" — Prognoseraum profile",lede:"Population, composition, and neighbourhood-stage mix for this Prognoseraum, summed and recomputed from its constituent Bezirksregionen — never a re-scored index at this grain."}});function At(e,s){var he;return(he=e[2][0])!=null&&he.bezirk_code?an:en}let $t=At(i),Je=$t(i);Se=new ya({props:{status:"info",$$slots:{default:[tn]},$$scope:{ctx:i}}});let N=i[3]&&mr(i),O=i[0]&&ur(i);const It=[nn,rn],Ua=[];function Nt(e,s){return e[13]?0:1}te=Nt(i),me=Ua[te]=It[te](i),Pe=new Pt({props:{data:i[3],x:"stage",y:"n_areas",title:"Neighbourhoods by stage",swapXY:"true"}});let U=i[4]&&fr(i);$e=new Pt({props:{data:i[4],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot)",swapXY:"true"}}),ue=new ya({props:{status:"warning",$$slots:{default:[on]},$$scope:{ctx:i}}});let K=i[5]&&pr(i),X=i[5][0]&&i[5][0].maup_caveat_required&&gr(i);const Ot=[dn,_n],Ka=[];function Ut(e,s){return e[5].length>0?0:1}fe=Ut(i),F=Ka[fe]=Ot[fe](i);let ee=ba&&hr(i);De=new ya({props:{status:"info",$$slots:{default:[un]},$$scope:{ctx:i}}}),pe=new _r({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[fn]},$$scope:{ctx:i}}}),ke=new _r({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[pn]},$$scope:{ctx:i}}});let Q=i[6]&&yr(i);Ae=new ya({props:{status:"info",$$slots:{default:[gn]},$$scope:{ctx:i}}});let W=i[7]&&vr(i);ze=new St({props:{data:i[7],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Prognoseraum.",$$slots:{default:[hn]},$$scope:{ctx:i}}});let G=i[8]&&br(i);Ue=new Bt({props:{data:i[8],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),ge=new Bt({props:{data:i[8],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),Qe=new Bt({props:{data:i[8],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let ae=i[8]&&i[8][0]&&i[8][0].any_indicator_suppressed&&$r(i),Z=i[9]&&wr(i),V=i[10]&&kr(i);function Kt(e,s){return e[9][0]?bn:vn}let wt=Kt(i),Ye=wt(i);We=new St({props:{data:i[10],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[$n]},$$scope:{ctx:i}}}),ga=new ya({props:{status:"info",$$slots:{default:[wn]},$$scope:{ctx:i}}});function Qt(e,s){return e[9][0]&&e[9][0].gastro_poi_with_cuisine_count>=8&&e[9][0].dominant_cuisine_share>=.15?Rn:kn}let kt=Qt(i),Xe=kt(i),J=i[11]&&Rr(i);Aa=new Dr({props:{data:i[11],geoJsonUrl:`${ot}/geo/pgr_bzr_drilldown.geojson`,title:(i[1][0]?i[1][0].area_name:"This Prognoseraum")+" and its Bezirksregionen"}});let Y=i[12]&&zr(i);return Ia=new St({props:{data:i[12],rows:"20",link:"bzr_link",$$slots:{default:[zn]},$$scope:{ctx:i}}}),Ga=new Fr({}),{c(){za&&za.c(),t=v(),st.c(),r=x("meta"),a=x("meta"),Ea&&Ea.c(),n=Rt(),o=v(),A&&A.c(),u=v(),I&&I.c(),d=v(),k(l.$$.fragment),g=v(),z=x("p"),q=P("Up: "),Je.c(),H=P(" · "),m=x("a"),m.textContent=f,ce=P(" · "),S=x("a"),S.textContent=M,Ge=v(),k(Se.$$.fragment),xa=v(),se=x("h2"),se.innerHTML=aa,ta=v(),Be=x("p"),Be.innerHTML=Va,qa=v(),N&&N.c(),ye=v(),O&&O.c(),ve=v(),me.c(),ra=v(),k(Pe.$$.fragment),Ce=v(),ie=x("h2"),ie.innerHTML=Ta,Ze=v(),Ee=x("h3"),Ee.innerHTML=Ja,Le=v(),U&&U.c(),be=v(),k($e.$$.fragment),Sa=v(),xe=x("h3"),xe.innerHTML=Ya,je=v(),k(ue.$$.fragment),na=v(),K&&K.c(),sa=v(),X&&X.c(),ia=v(),F.c(),we=v(),ee&&ee.c(),oa=v(),Me=x("p"),Me.innerHTML=Xa,He=v(),oe=x("h2"),oe.innerHTML=Ba,Pa=v(),k(De.$$.fragment),Ca=v(),k(pe.$$.fragment),Fe=v(),k(ke.$$.fragment),La=v(),Q&&Q.c(),la=v(),k(Ae.$$.fragment),Ie=v(),W&&W.c(),Re=v(),k(ze.$$.fragment),ja=v(),Ne=x("p"),Ne.innerHTML=et,Oe=v(),le=x("h2"),le.innerHTML=Ma,Ha=v(),G&&G.c(),_a=v(),k(Ue.$$.fragment),Ke=v(),k(ge.$$.fragment),da=v(),k(Qe.$$.fragment),Da=v(),ae&&ae.c(),ca=v(),_e=x("h2"),_e.innerHTML=ma,ua=v(),Z&&Z.c(),fa=v(),V&&V.c(),pa=v(),Ve=x("p"),Ye.c(),T=v(),k(We.$$.fragment),Fa=v(),k(ga.$$.fragment),lt=v(),Qa=x("p"),Xe.c(),_t=v(),Wa=x("p"),Wa.textContent=Ct,dt=v(),$a=x("h2"),$a.innerHTML=Lt,ct=v(),J&&J.c(),at=v(),k(Aa.$$.fragment),mt=v(),wa=x("h3"),wa.innerHTML=jt,ut=v(),Y&&Y.c(),tt=v(),k(Ia.$$.fragment),ft=v(),ka=x("h2"),ka.innerHTML=Mt,pt=v(),Na=x("ul"),Na.innerHTML=Ht,gt=v(),Ra=x("h2"),Ra.innerHTML=Dt,ht=v(),Oa=x("p"),Oa.innerHTML=Ft,yt=v(),nt=x("hr"),vt=v(),k(Ga.$$.fragment),this.h()},l(e){za&&za.l(e),t=y(e);const s=Tr("svelte-2igo1p",document.head);st.l(s),r=E(s,"META",{name:!0,content:!0}),a=E(s,"META",{name:!0,content:!0}),Ea&&Ea.l(s),n=Rt(),s.forEach(_),o=y(e),A&&A.l(e),u=y(e),I&&I.l(e),d=y(e),w(l.$$.fragment,e),g=y(e),z=E(e,"P",{});var he=va(z);q=B(he,"Up: "),Je.l(he),H=B(he," · "),m=E(he,"A",{href:!0,"data-svelte-h":!0}),L(m)!=="svelte-6j2qr0"&&(m.textContent=f),ce=B(he," · "),S=E(he,"A",{href:!0,"data-svelte-h":!0}),L(S)!=="svelte-z78e0k"&&(S.textContent=M),he.forEach(_),Ge=y(e),w(Se.$$.fragment,e),xa=y(e),se=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(se)!=="svelte-14f17uo"&&(se.innerHTML=aa),ta=y(e),Be=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Be)!=="svelte-qdtmcq"&&(Be.innerHTML=Va),qa=y(e),N&&N.l(e),ye=y(e),O&&O.l(e),ve=y(e),me.l(e),ra=y(e),w(Pe.$$.fragment,e),Ce=y(e),ie=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(ie)!=="svelte-1i9w9pn"&&(ie.innerHTML=Ta),Ze=y(e),Ee=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(Ee)!=="svelte-3hvew3"&&(Ee.innerHTML=Ja),Le=y(e),U&&U.l(e),be=y(e),w($e.$$.fragment,e),Sa=y(e),xe=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(xe)!=="svelte-5mc7pd"&&(xe.innerHTML=Ya),je=y(e),w(ue.$$.fragment,e),na=y(e),K&&K.l(e),sa=y(e),X&&X.l(e),ia=y(e),F.l(e),we=y(e),ee&&ee.l(e),oa=y(e),Me=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Me)!=="svelte-1q1lnxb"&&(Me.innerHTML=Xa),He=y(e),oe=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(oe)!=="svelte-4kb45v"&&(oe.innerHTML=Ba),Pa=y(e),w(De.$$.fragment,e),Ca=y(e),w(pe.$$.fragment,e),Fe=y(e),w(ke.$$.fragment,e),La=y(e),Q&&Q.l(e),la=y(e),w(Ae.$$.fragment,e),Ie=y(e),W&&W.l(e),Re=y(e),w(ze.$$.fragment,e),ja=y(e),Ne=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Ne)!=="svelte-1xa7bh7"&&(Ne.innerHTML=et),Oe=y(e),le=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(le)!=="svelte-1mdzqzc"&&(le.innerHTML=Ma),Ha=y(e),G&&G.l(e),_a=y(e),w(Ue.$$.fragment,e),Ke=y(e),w(ge.$$.fragment,e),da=y(e),w(Qe.$$.fragment,e),Da=y(e),ae&&ae.l(e),ca=y(e),_e=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(_e)!=="svelte-12k6lqd"&&(_e.innerHTML=ma),ua=y(e),Z&&Z.l(e),fa=y(e),V&&V.l(e),pa=y(e),Ve=E(e,"P",{});var it=va(Ve);Ye.l(it),it.forEach(_),T=y(e),w(We.$$.fragment,e),Fa=y(e),w(ga.$$.fragment,e),lt=y(e),Qa=E(e,"P",{});var rt=va(Qa);Xe.l(rt),rt.forEach(_),_t=y(e),Wa=E(e,"P",{"data-svelte-h":!0}),L(Wa)!=="svelte-ja6pm6"&&(Wa.textContent=Ct),dt=y(e),$a=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L($a)!=="svelte-60cjj9"&&($a.innerHTML=Lt),ct=y(e),J&&J.l(e),at=y(e),w(Aa.$$.fragment,e),mt=y(e),wa=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(wa)!=="svelte-efyvo4"&&(wa.innerHTML=jt),ut=y(e),Y&&Y.l(e),tt=y(e),w(Ia.$$.fragment,e),ft=y(e),ka=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(ka)!=="svelte-ad0syq"&&(ka.innerHTML=Mt),pt=y(e),Na=E(e,"UL",{class:!0,"data-svelte-h":!0}),L(Na)!=="svelte-1vxfhvh"&&(Na.innerHTML=Ht),gt=y(e),Ra=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(Ra)!=="svelte-oimjns"&&(Ra.innerHTML=Dt),ht=y(e),Oa=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Oa)!=="svelte-1iuzmnk"&&(Oa.innerHTML=Ft),yt=y(e),nt=E(e,"HR",{class:!0}),vt=y(e),w(Ga.$$.fragment,e),this.h()},h(){R(r,"name","twitter:card"),R(r,"content","summary_large_image"),R(a,"name","twitter:site"),R(a,"content","@evidence_dev"),R(m,"href","/gentriduck/berlin/area/bezirk"),R(S,"href","/gentriduck/berlin/area"),R(se,"class","markdown"),R(se,"id","social-status--trajectory"),R(Be,"class","markdown"),R(ie,"class","markdown"),R(ie,"id","commercial-mix--offering-advantage"),R(Ee,"class","markdown"),R(Ee,"id","mapped-places"),R(xe,"class","markdown"),R(xe,"id","offering-advantage-across-the-area-hierarchy"),R(Me,"class","markdown"),R(oe,"class","markdown"),R(oe,"id","within-group-dominance"),R(Ne,"class","markdown"),R(le,"class","markdown"),R(le,"id","people--structure"),R(_e,"class","markdown"),R(_e,"id","amenities--everyday-infrastructure"),R($a,"class","markdown"),R($a,"id","where-this-area-sits"),R(wa,"class","markdown"),R(wa,"id","bezirksregionen-in-this-prognoseraum"),R(ka,"class","markdown"),R(ka,"id","honest-caveats"),R(Na,"class","markdown"),R(Ra,"class","markdown"),R(Ra,"id","further-reading"),R(Oa,"class","markdown"),R(nt,"class","markdown")},m(e,s){za&&za.m(e,s),c(e,t,s),st.m(document.head,null),de(document.head,r),de(document.head,a),Ea&&Ea.m(document.head,null),de(document.head,n),c(e,o,s),A&&A.m(e,s),c(e,u,s),I&&I.m(e,s),c(e,d,s),$(l,e,s),c(e,g,s),c(e,z,s),de(z,q),Je.m(z,null),de(z,H),de(z,m),de(z,ce),de(z,S),c(e,Ge,s),$(Se,e,s),c(e,xa,s),c(e,se,s),c(e,ta,s),c(e,Be,s),c(e,qa,s),N&&N.m(e,s),c(e,ye,s),O&&O.m(e,s),c(e,ve,s),Ua[te].m(e,s),c(e,ra,s),$(Pe,e,s),c(e,Ce,s),c(e,ie,s),c(e,Ze,s),c(e,Ee,s),c(e,Le,s),U&&U.m(e,s),c(e,be,s),$($e,e,s),c(e,Sa,s),c(e,xe,s),c(e,je,s),$(ue,e,s),c(e,na,s),K&&K.m(e,s),c(e,sa,s),X&&X.m(e,s),c(e,ia,s),Ka[fe].m(e,s),c(e,we,s),ee&&ee.m(e,s),c(e,oa,s),c(e,Me,s),c(e,He,s),c(e,oe,s),c(e,Pa,s),$(De,e,s),c(e,Ca,s),$(pe,e,s),c(e,Fe,s),$(ke,e,s),c(e,La,s),Q&&Q.m(e,s),c(e,la,s),$(Ae,e,s),c(e,Ie,s),W&&W.m(e,s),c(e,Re,s),$(ze,e,s),c(e,ja,s),c(e,Ne,s),c(e,Oe,s),c(e,le,s),c(e,Ha,s),G&&G.m(e,s),c(e,_a,s),$(Ue,e,s),c(e,Ke,s),$(ge,e,s),c(e,da,s),$(Qe,e,s),c(e,Da,s),ae&&ae.m(e,s),c(e,ca,s),c(e,_e,s),c(e,ua,s),Z&&Z.m(e,s),c(e,fa,s),V&&V.m(e,s),c(e,pa,s),c(e,Ve,s),Ye.m(Ve,null),c(e,T,s),$(We,e,s),c(e,Fa,s),$(ga,e,s),c(e,lt,s),c(e,Qa,s),Xe.m(Qa,null),c(e,_t,s),c(e,Wa,s),c(e,dt,s),c(e,$a,s),c(e,ct,s),J&&J.m(e,s),c(e,at,s),$(Aa,e,s),c(e,mt,s),c(e,wa,s),c(e,ut,s),Y&&Y.m(e,s),c(e,tt,s),$(Ia,e,s),c(e,ft,s),c(e,ka,s),c(e,pt,s),c(e,Na,s),c(e,gt,s),c(e,Ra,s),c(e,ht,s),c(e,Oa,s),c(e,yt,s),c(e,nt,s),c(e,vt,s),$(Ga,e,s),bt=!0},p(e,s){var sr;typeof C<"u"&&(C.title||(sr=C.og)!=null&&sr.title)&&C.hide_title!==!0&&za.p(e,s),st.p(e,s),typeof C=="object"&&Ea.p(e,s),e[1]?A?(A.p(e,s),s[0]&2&&p(A,1)):(A=dr(e),A.c(),p(A,1),A.m(u.parentNode,u)):A&&(ne(),h(A,1,1,()=>{A=null}),re()),e[2]?I?(I.p(e,s),s[0]&4&&p(I,1)):(I=cr(e),I.c(),p(I,1),I.m(d.parentNode,d)):I&&(ne(),h(I,1,1,()=>{I=null}),re());const he={};s[0]&2&&(he.title=(e[1][0]&&e[1][0].area_name)+" — Prognoseraum profile"),l.$set(he),$t===($t=At(e))&&Je?Je.p(e,s):(Je.d(1),Je=$t(e),Je&&(Je.c(),Je.m(z,H)));const it={};s[2]&1073741824&&(it.$$scope={dirty:s,ctx:e}),Se.$set(it),e[3]?N?(N.p(e,s),s[0]&8&&p(N,1)):(N=mr(e),N.c(),p(N,1),N.m(ye.parentNode,ye)):N&&(ne(),h(N,1,1,()=>{N=null}),re()),e[0]?O?(O.p(e,s),s[0]&1&&p(O,1)):(O=ur(e),O.c(),p(O,1),O.m(ve.parentNode,ve)):O&&(ne(),h(O,1,1,()=>{O=null}),re());let rt=te;te=Nt(e),te===rt?Ua[te].p(e,s):(ne(),h(Ua[rt],1,1,()=>{Ua[rt]=null}),re(),me=Ua[te],me?me.p(e,s):(me=Ua[te]=It[te](e),me.c()),p(me,1),me.m(ra.parentNode,ra));const Gt={};s[0]&8&&(Gt.data=e[3]),Pe.$set(Gt),e[4]?U?(U.p(e,s),s[0]&16&&p(U,1)):(U=fr(e),U.c(),p(U,1),U.m(be.parentNode,be)):U&&(ne(),h(U,1,1,()=>{U=null}),re());const Zt={};s[0]&16&&(Zt.data=e[4]),$e.$set(Zt);const Vt={};s[2]&1073741824&&(Vt.$$scope={dirty:s,ctx:e}),ue.$set(Vt),e[5]?K?(K.p(e,s),s[0]&32&&p(K,1)):(K=pr(e),K.c(),p(K,1),K.m(sa.parentNode,sa)):K&&(ne(),h(K,1,1,()=>{K=null}),re()),e[5][0]&&e[5][0].maup_caveat_required?X?s[0]&32&&p(X,1):(X=gr(e),X.c(),p(X,1),X.m(ia.parentNode,ia)):X&&(ne(),h(X,1,1,()=>{X=null}),re());let zt=fe;fe=Ut(e),fe===zt?Ka[fe].p(e,s):(ne(),h(Ka[zt],1,1,()=>{Ka[zt]=null}),re(),F=Ka[fe],F?F.p(e,s):(F=Ka[fe]=Ot[fe](e),F.c()),p(F,1),F.m(we.parentNode,we)),s[0]&32&&(ba=e[5].some(Er)),ba?ee?s[0]&32&&p(ee,1):(ee=hr(e),ee.c(),p(ee,1),ee.m(oa.parentNode,oa)):ee&&(ne(),h(ee,1,1,()=>{ee=null}),re());const Jt={};s[2]&1073741824&&(Jt.$$scope={dirty:s,ctx:e}),De.$set(Jt);const Yt={};s[2]&1073741824&&(Yt.$$scope={dirty:s,ctx:e}),pe.$set(Yt);const Xt={};s[2]&1073741824&&(Xt.$$scope={dirty:s,ctx:e}),ke.$set(Xt),e[6]?Q?(Q.p(e,s),s[0]&64&&p(Q,1)):(Q=yr(e),Q.c(),p(Q,1),Q.m(la.parentNode,la)):Q&&(ne(),h(Q,1,1,()=>{Q=null}),re());const er={};s[0]&64|s[2]&1073741824&&(er.$$scope={dirty:s,ctx:e}),Ae.$set(er),e[7]?W?(W.p(e,s),s[0]&128&&p(W,1)):(W=vr(e),W.c(),p(W,1),W.m(Re.parentNode,Re)):W&&(ne(),h(W,1,1,()=>{W=null}),re());const Et={};s[0]&128&&(Et.data=e[7]),s[2]&1073741824&&(Et.$$scope={dirty:s,ctx:e}),ze.$set(Et),e[8]?G?(G.p(e,s),s[0]&256&&p(G,1)):(G=br(e),G.c(),p(G,1),G.m(_a.parentNode,_a)):G&&(ne(),h(G,1,1,()=>{G=null}),re());const ar={};s[0]&256&&(ar.data=e[8]),Ue.$set(ar);const tr={};s[0]&256&&(tr.data=e[8]),ge.$set(tr);const rr={};s[0]&256&&(rr.data=e[8]),Qe.$set(rr),e[8]&&e[8][0]&&e[8][0].any_indicator_suppressed?ae?s[0]&256&&p(ae,1):(ae=$r(e),ae.c(),p(ae,1),ae.m(ca.parentNode,ca)):ae&&(ne(),h(ae,1,1,()=>{ae=null}),re()),e[9]?Z?(Z.p(e,s),s[0]&512&&p(Z,1)):(Z=wr(e),Z.c(),p(Z,1),Z.m(fa.parentNode,fa)):Z&&(ne(),h(Z,1,1,()=>{Z=null}),re()),e[10]?V?(V.p(e,s),s[0]&1024&&p(V,1)):(V=kr(e),V.c(),p(V,1),V.m(pa.parentNode,pa)):V&&(ne(),h(V,1,1,()=>{V=null}),re()),wt===(wt=Kt(e))&&Ye?Ye.p(e,s):(Ye.d(1),Ye=wt(e),Ye&&(Ye.c(),Ye.m(Ve,null)));const xt={};s[0]&1024&&(xt.data=e[10]),s[2]&1073741824&&(xt.$$scope={dirty:s,ctx:e}),We.$set(xt);const nr={};s[2]&1073741824&&(nr.$$scope={dirty:s,ctx:e}),ga.$set(nr),kt===(kt=Qt(e))&&Xe?Xe.p(e,s):(Xe.d(1),Xe=kt(e),Xe&&(Xe.c(),Xe.m(Qa,null))),e[11]?J?(J.p(e,s),s[0]&2048&&p(J,1)):(J=Rr(e),J.c(),p(J,1),J.m(at.parentNode,at)):J&&(ne(),h(J,1,1,()=>{J=null}),re());const qt={};s[0]&2048&&(qt.data=e[11]),s[0]&2&&(qt.title=(e[1][0]?e[1][0].area_name:"This Prognoseraum")+" and its Bezirksregionen"),Aa.$set(qt),e[12]?Y?(Y.p(e,s),s[0]&4096&&p(Y,1)):(Y=zr(e),Y.c(),p(Y,1),Y.m(tt.parentNode,tt)):Y&&(ne(),h(Y,1,1,()=>{Y=null}),re());const Tt={};s[0]&4096&&(Tt.data=e[12]),s[2]&1073741824&&(Tt.$$scope={dirty:s,ctx:e}),Ia.$set(Tt)},i(e){bt||(p(A),p(I),p(l.$$.fragment,e),p(Se.$$.fragment,e),p(N),p(O),p(me),p(Pe.$$.fragment,e),p(U),p($e.$$.fragment,e),p(ue.$$.fragment,e),p(K),p(X),p(F),p(ee),p(De.$$.fragment,e),p(pe.$$.fragment,e),p(ke.$$.fragment,e),p(Q),p(Ae.$$.fragment,e),p(W),p(ze.$$.fragment,e),p(G),p(Ue.$$.fragment,e),p(ge.$$.fragment,e),p(Qe.$$.fragment,e),p(ae),p(Z),p(V),p(We.$$.fragment,e),p(ga.$$.fragment,e),p(J),p(Aa.$$.fragment,e),p(Y),p(Ia.$$.fragment,e),p(Ga.$$.fragment,e),bt=!0)},o(e){h(A),h(I),h(l.$$.fragment,e),h(Se.$$.fragment,e),h(N),h(O),h(me),h(Pe.$$.fragment,e),h(U),h($e.$$.fragment,e),h(ue.$$.fragment,e),h(K),h(X),h(F),h(ee),h(De.$$.fragment,e),h(pe.$$.fragment,e),h(ke.$$.fragment,e),h(Q),h(Ae.$$.fragment,e),h(W),h(ze.$$.fragment,e),h(G),h(Ue.$$.fragment,e),h(ge.$$.fragment,e),h(Qe.$$.fragment,e),h(ae),h(Z),h(V),h(We.$$.fragment,e),h(ga.$$.fragment,e),h(J),h(Aa.$$.fragment,e),h(Y),h(Ia.$$.fragment,e),h(Ga.$$.fragment,e),bt=!1},d(e){e&&(_(t),_(o),_(u),_(d),_(g),_(z),_(Ge),_(xa),_(se),_(ta),_(Be),_(qa),_(ye),_(ve),_(ra),_(Ce),_(ie),_(Ze),_(Ee),_(Le),_(be),_(Sa),_(xe),_(je),_(na),_(sa),_(ia),_(we),_(oa),_(Me),_(He),_(oe),_(Pa),_(Ca),_(Fe),_(La),_(la),_(Ie),_(Re),_(ja),_(Ne),_(Oe),_(le),_(Ha),_(_a),_(Ke),_(da),_(Da),_(ca),_(_e),_(ua),_(fa),_(pa),_(Ve),_(T),_(Fa),_(lt),_(Qa),_(_t),_(Wa),_(dt),_($a),_(ct),_(at),_(mt),_(wa),_(ut),_(tt),_(ft),_(ka),_(pt),_(Na),_(gt),_(Ra),_(ht),_(Oa),_(yt),_(nt),_(vt)),za&&za.d(e),st.d(e),_(r),_(a),Ea&&Ea.d(e),_(n),A&&A.d(e),I&&I.d(e),b(l,e),Je.d(),b(Se,e),N&&N.d(e),O&&O.d(e),Ua[te].d(e),b(Pe,e),U&&U.d(e),b($e,e),b(ue,e),K&&K.d(e),X&&X.d(e),Ka[fe].d(e),ee&&ee.d(e),b(De,e),b(pe,e),b(ke,e),Q&&Q.d(e),b(Ae,e),W&&W.d(e),b(ze,e),G&&G.d(e),b(Ue,e),b(ge,e),b(Qe,e),ae&&ae.d(e),Z&&Z.d(e),V&&V.d(e),Ye.d(),b(We,e),b(ga,e),Xe.d(),J&&J.d(e),b(Aa,e),Y&&Y.d(e),b(Ia,e),b(Ga,e)}}}const C={},Er=i=>i.oa_domain_min_base_flag;function xn(i,t,r){let a,n,o,u;ir(i,Qr,T=>r(71,o=T)),ir(i,lr,T=>r(75,u=T));let{data:d}=t,{data:l={},customFormattingSettings:g,__db:z,inputs:q}=d;Sr(lr,u="f470234fb75d0fe1491483e9932ff021",u);let H=Nr(Ir(q));Br(H.subscribe(T=>r(16,q=T))),Pr(Kr,{getCustomFormats:()=>g.customFormats||[]});const m=(T,We)=>Wr(z.query,T,{query_name:We});Or(m);let f=o.params;Cr(()=>!0);let ce={initialData:void 0,initialError:void 0},S=j`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
limit 1`,M=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
limit 1`;l.pgr_name_data&&(l.pgr_name_data instanceof Error?ce.initialError=l.pgr_name_data:ce.initialData=l.pgr_name_data,l.pgr_name_columns&&(ce.knownColumns=l.pgr_name_columns));let Ge,Se=!1;const xa=qe.createReactive({callback:T=>{r(1,Ge=T)},execFn:m},{id:"pgr_name",...ce});xa(M,{noResolve:S,...ce}),globalThis[Symbol.for("pgr_name")]={get value(){return Ge}};let se={initialData:void 0,initialError:void 0},aa=j`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${f.code}', 1, 2)`,ta=`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${f.code}', 1, 2)`;l.bezirk_name_data&&(l.bezirk_name_data instanceof Error?se.initialError=l.bezirk_name_data:se.initialData=l.bezirk_name_data,l.bezirk_name_columns&&(se.knownColumns=l.bezirk_name_columns));let Be,Va=!1;const qa=qe.createReactive({callback:T=>{r(2,Be=T)},execFn:m},{id:"bezirk_name",...se});qa(ta,{noResolve:aa,...se}),globalThis[Symbol.for("bezirk_name")]={get value(){return Be}};let ye={initialData:void 0,initialError:void 0},ve=j`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`,te=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`;l.stage_mix_data&&(l.stage_mix_data instanceof Error?ye.initialError=l.stage_mix_data:ye.initialData=l.stage_mix_data,l.stage_mix_columns&&(ye.knownColumns=l.stage_mix_columns));let me,ra=!1;const Pe=qe.createReactive({callback:T=>{r(3,me=T)},execFn:m},{id:"stage_mix",...ye});Pe(te,{noResolve:ve,...ye}),globalThis[Symbol.for("stage_mix")]={get value(){return me}};let Ce={initialData:void 0,initialError:void 0},ie=j`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`,Ta=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`;l.stage_mix_summary_data&&(l.stage_mix_summary_data instanceof Error?Ce.initialError=l.stage_mix_summary_data:Ce.initialData=l.stage_mix_summary_data,l.stage_mix_summary_columns&&(Ce.knownColumns=l.stage_mix_summary_columns));let Ze,Ee=!1;const Ja=qe.createReactive({callback:T=>{r(0,Ze=T)},execFn:m},{id:"stage_mix_summary",...Ce});Ja(Ta,{noResolve:ie,...Ce}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return Ze}};let Le={initialData:void 0,initialError:void 0},be=j`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`,$e=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;l.poi_mix_data&&(l.poi_mix_data instanceof Error?Le.initialError=l.poi_mix_data:Le.initialData=l.poi_mix_data,l.poi_mix_columns&&(Le.knownColumns=l.poi_mix_columns));let Sa,xe=!1;const Ya=qe.createReactive({callback:T=>{r(4,Sa=T)},execFn:m},{id:"poi_mix",...Le});Ya($e,{noResolve:be,...Le}),globalThis[Symbol.for("poi_mix")]={get value(){return Sa}};let je={initialData:void 0,initialError:void 0},ue=j`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${f.code}'
  )
order by oa_domain desc`,na=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${f.code}'
  )
order by oa_domain desc`;l.oa_arealevel_data&&(l.oa_arealevel_data instanceof Error?je.initialError=l.oa_arealevel_data:je.initialData=l.oa_arealevel_data,l.oa_arealevel_columns&&(je.knownColumns=l.oa_arealevel_columns));let sa,ia=!1;const fe=qe.createReactive({callback:T=>{r(5,sa=T)},execFn:m},{id:"oa_arealevel",...je});fe(na,{noResolve:ue,...je}),globalThis[Symbol.for("oa_arealevel")]={get value(){return sa}};let F={initialData:void 0,initialError:void 0},we=j`select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${q.dom_group.value}'
  and snapshot_year = ${q.dom_year.value}
  and substr(area_code, 1, 4) = '${f.code}'`,ba=`select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${q.dom_group.value}'
  and snapshot_year = ${q.dom_year.value}
  and substr(area_code, 1, 4) = '${f.code}'`;l.dom_suppressed_count_data&&(l.dom_suppressed_count_data instanceof Error?F.initialError=l.dom_suppressed_count_data:F.initialData=l.dom_suppressed_count_data,l.dom_suppressed_count_columns&&(F.knownColumns=l.dom_suppressed_count_columns));let oa,Me=!1;const Xa=qe.createReactive({callback:T=>{r(6,oa=T)},execFn:m},{id:"dom_suppressed_count",...F});Xa(ba,{noResolve:we,...F}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return oa}};let He={initialData:void 0,initialError:void 0},oe=j`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no PGR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,4) prefix filter this page's own stage_mix/poi_mix queries
-- already use -- a filter, not a new aggregation.
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${q.dom_group.value}'
    and d.snapshot_year = ${q.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${f.code}'
order by d.hhi desc
limit 15`,Ba=`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no PGR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,4) prefix filter this page's own stage_mix/poi_mix queries
-- already use -- a filter, not a new aggregation.
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${q.dom_group.value}'
    and d.snapshot_year = ${q.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${f.code}'
order by d.hhi desc
limit 15`;l.dominance_children_data&&(l.dominance_children_data instanceof Error?He.initialError=l.dominance_children_data:He.initialData=l.dominance_children_data,l.dominance_children_columns&&(He.knownColumns=l.dominance_children_columns));let Pa,De=!1;const Ca=qe.createReactive({callback:T=>{r(7,Pa=T)},execFn:m},{id:"dominance_children",...He});Ca(Ba,{noResolve:oe,...He}),globalThis[Symbol.for("dominance_children")]={get value(){return Pa}};let pe={initialData:void 0,initialError:void 0},Fe=j`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by reference_year desc
limit 1`,ke=`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by reference_year desc
limit 1`;l.demographics_data&&(l.demographics_data instanceof Error?pe.initialError=l.demographics_data:pe.initialData=l.demographics_data,l.demographics_columns&&(pe.knownColumns=l.demographics_columns));let La,la=!1;const Ae=qe.createReactive({callback:T=>{r(8,La=T)},execFn:m},{id:"demographics",...pe});Ae(ke,{noResolve:Fe,...pe}),globalThis[Symbol.for("demographics")]={get value(){return La}};let Ie={initialData:void 0,initialError:void 0},Re=j`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`,ze=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`;l.amenities_current_data&&(l.amenities_current_data instanceof Error?Ie.initialError=l.amenities_current_data:Ie.initialData=l.amenities_current_data,l.amenities_current_columns&&(Ie.knownColumns=l.amenities_current_columns));let ja,Ne=!1;const et=qe.createReactive({callback:T=>{r(9,ja=T)},execFn:m},{id:"amenities_current",...Ie});et(ze,{noResolve:Re,...Ie}),globalThis[Symbol.for("amenities_current")]={get value(){return ja}};let Oe={initialData:void 0,initialError:void 0},le=j`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${f.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(a.n_schools as varchar) as area_value, cast(d.n_schools as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(a.n_kindergartens as varchar), cast(d.n_kindergartens as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(a.n_doctors as varchar), cast(d.n_doctors as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(a.n_dentists as varchar), cast(d.n_dentists as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(a.n_pharmacies as varchar), cast(d.n_pharmacies as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(a.n_supermarkets as varchar), cast(d.n_supermarkets as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(a.n_playgrounds as varchar), cast(d.n_playgrounds as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(a.n_transit_stops as varchar), cast(d.n_transit_stops as varchar)
from area_row as a cross join district_row as d
order by sort_order`,Ma=`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${f.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(a.n_schools as varchar) as area_value, cast(d.n_schools as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(a.n_kindergartens as varchar), cast(d.n_kindergartens as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(a.n_doctors as varchar), cast(d.n_doctors as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(a.n_dentists as varchar), cast(d.n_dentists as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(a.n_pharmacies as varchar), cast(d.n_pharmacies as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(a.n_supermarkets as varchar), cast(d.n_supermarkets as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(a.n_playgrounds as varchar), cast(d.n_playgrounds as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(a.n_transit_stops as varchar), cast(d.n_transit_stops as varchar)
from area_row as a cross join district_row as d
order by sort_order`;l.amenities_table_data&&(l.amenities_table_data instanceof Error?Oe.initialError=l.amenities_table_data:Oe.initialData=l.amenities_table_data,l.amenities_table_columns&&(Oe.knownColumns=l.amenities_table_columns));let Ha,_a=!1;const Ue=qe.createReactive({callback:T=>{r(10,Ha=T)},execFn:m},{id:"amenities_table",...Oe});Ue(Ma,{noResolve:le,...Oe}),globalThis[Symbol.for("amenities_table")]={get value(){return Ha}};let Ke={initialData:void 0,initialError:void 0},ge=j`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${f.code}'
order by sort_order, area_name`,da=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${f.code}'
order by sort_order, area_name`;l.minimap_areas_data&&(l.minimap_areas_data instanceof Error?Ke.initialError=l.minimap_areas_data:Ke.initialData=l.minimap_areas_data,l.minimap_areas_columns&&(Ke.knownColumns=l.minimap_areas_columns));let Qe,Da=!1;const ca=qe.createReactive({callback:T=>{r(11,Qe=T)},execFn:m},{id:"minimap_areas",...Ke});ca(da,{noResolve:ge,...Ke}),globalThis[Symbol.for("minimap_areas")]={get value(){return Qe}};let _e={initialData:void 0,initialError:void 0},ma=j`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/bzr/' || d.area_code as bzr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'bzr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'bzr'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 4) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`,ua=`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/bzr/' || d.area_code as bzr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'bzr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'bzr'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 4) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`;l.children_data&&(l.children_data instanceof Error?_e.initialError=l.children_data:_e.initialData=l.children_data,l.children_columns&&(_e.knownColumns=l.children_columns));let fa,pa=!1;const Ve=qe.createReactive({callback:T=>{r(12,fa=T)},execFn:m},{id:"children",..._e});return Ve(ua,{noResolve:ma,..._e}),globalThis[Symbol.for("children")]={get value(){return fa}},i.$$set=T=>{"data"in T&&r(14,d=T.data)},i.$$.update=()=>{i.$$.dirty[0]&16384&&r(15,{data:l={},customFormattingSettings:g,__db:z}=d,l),i.$$.dirty[0]&32768&&Ur.set(Object.keys(l).length>0),i.$$.dirty[2]&512&&r(17,f=o.params),i.$$.dirty[0]&131072&&r(19,S=j`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
limit 1`),i.$$.dirty[0]&131072&&r(20,M=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
limit 1`),i.$$.dirty[0]&3932160&&(S||!Se?S||(xa(M,{noResolve:S,...ce}),r(21,Se=!0)):xa(M,{noResolve:S})),i.$$.dirty[0]&131072&&r(23,aa=j`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${f.code}', 1, 2)`),i.$$.dirty[0]&131072&&r(24,ta=`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${f.code}', 1, 2)`),i.$$.dirty[0]&62914560&&(aa||!Va?aa||(qa(ta,{noResolve:aa,...se}),r(25,Va=!0)):qa(ta,{noResolve:aa})),i.$$.dirty[0]&131072&&r(27,ve=j`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&131072&&r(28,te=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&1006632960&&(ve||!ra?ve||(Pe(te,{noResolve:ve,...ye}),r(29,ra=!0)):Pe(te,{noResolve:ve})),i.$$.dirty[0]&131072&&r(31,ie=j`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&131072&&r(32,Ta=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&1073741824|i.$$.dirty[1]&7&&(ie||!Ee?ie||(Ja(Ta,{noResolve:ie,...Ce}),r(33,Ee=!0)):Ja(Ta,{noResolve:ie})),i.$$.dirty[0]&131072&&r(35,be=j`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[0]&131072&&r(36,$e=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[1]&120&&(be||!xe?be||(Ya($e,{noResolve:be,...Le}),r(37,xe=!0)):Ya($e,{noResolve:be})),i.$$.dirty[0]&131072&&r(39,ue=j`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${f.code}'
  )
order by oa_domain desc`),i.$$.dirty[0]&131072&&r(40,na=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${f.code}'
  )
order by oa_domain desc`),i.$$.dirty[1]&1920&&(ue||!ia?ue||(fe(na,{noResolve:ue,...je}),r(41,ia=!0)):fe(na,{noResolve:ue})),i.$$.dirty[0]&196608&&r(43,we=j`select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${q.dom_group.value}'
  and snapshot_year = ${q.dom_year.value}
  and substr(area_code, 1, 4) = '${f.code}'`),i.$$.dirty[0]&196608&&r(44,ba=`select
    count(*) filter (where is_thin_base) as n_suppressed,
    count(*) filter (where not is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance
where city_code = 'BER'
  and is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and area_vintage = 'lor_2021'
  and weight_variant = 'standard'
  and dominance_group = '${q.dom_group.value}'
  and snapshot_year = ${q.dom_year.value}
  and substr(area_code, 1, 4) = '${f.code}'`),i.$$.dirty[1]&30720&&(we||!Me?we||(Xa(ba,{noResolve:we,...F}),r(45,Me=!0)):Xa(ba,{noResolve:we})),i.$$.dirty[0]&196608&&r(47,oe=j`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no PGR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,4) prefix filter this page's own stage_mix/poi_mix queries
-- already use -- a filter, not a new aggregation.
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${q.dom_group.value}'
    and d.snapshot_year = ${q.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${f.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&196608&&r(48,Ba=`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no PGR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,4) prefix filter this page's own stage_mix/poi_mix queries
-- already use -- a filter, not a new aggregation.
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${q.dom_group.value}'
    and d.snapshot_year = ${q.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${f.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&491520&&(oe||!De?oe||(Ca(Ba,{noResolve:oe,...He}),r(49,De=!0)):Ca(Ba,{noResolve:oe})),i.$$.dirty[0]&131072&&r(51,Fe=j`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by reference_year desc
limit 1`),i.$$.dirty[0]&131072&&r(52,ke=`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by reference_year desc
limit 1`),i.$$.dirty[1]&7864320&&(Fe||!la?Fe||(Ae(ke,{noResolve:Fe,...pe}),r(53,la=!0)):Ae(ke,{noResolve:Fe})),i.$$.dirty[0]&131072&&r(55,Re=j`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[0]&131072&&r(56,ze=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[1]&125829120&&(Re||!Ne?Re||(et(ze,{noResolve:Re,...Ie}),r(57,Ne=!0)):et(ze,{noResolve:Re})),i.$$.dirty[0]&131072&&r(59,le=j`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${f.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(a.n_schools as varchar) as area_value, cast(d.n_schools as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(a.n_kindergartens as varchar), cast(d.n_kindergartens as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(a.n_doctors as varchar), cast(d.n_doctors as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(a.n_dentists as varchar), cast(d.n_dentists as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(a.n_pharmacies as varchar), cast(d.n_pharmacies as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(a.n_supermarkets as varchar), cast(d.n_supermarkets as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(a.n_playgrounds as varchar), cast(d.n_playgrounds as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(a.n_transit_stops as varchar), cast(d.n_transit_stops as varchar)
from area_row as a cross join district_row as d
order by sort_order`),i.$$.dirty[0]&131072&&r(60,Ma=`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${f.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(a.n_schools as varchar) as area_value, cast(d.n_schools as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(a.n_kindergartens as varchar), cast(d.n_kindergartens as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(a.n_doctors as varchar), cast(d.n_doctors as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(a.n_dentists as varchar), cast(d.n_dentists as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(a.n_pharmacies as varchar), cast(d.n_pharmacies as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(a.n_supermarkets as varchar), cast(d.n_supermarkets as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(a.n_playgrounds as varchar), cast(d.n_playgrounds as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(a.n_transit_stops as varchar), cast(d.n_transit_stops as varchar)
from area_row as a cross join district_row as d
order by sort_order`),i.$$.dirty[1]&2013265920&&(le||!_a?le||(Ue(Ma,{noResolve:le,...Oe}),r(61,_a=!0)):Ue(Ma,{noResolve:le})),i.$$.dirty[0]&131072&&r(63,ge=j`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${f.code}'
order by sort_order, area_name`),i.$$.dirty[0]&131072&&r(64,da=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${f.code}'
order by sort_order, area_name`),i.$$.dirty[2]&15&&(ge||!Da?ge||(ca(da,{noResolve:ge,...Ke}),r(65,Da=!0)):ca(da,{noResolve:ge})),i.$$.dirty[0]&131072&&r(67,ma=j`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/bzr/' || d.area_code as bzr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'bzr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'bzr'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 4) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`),i.$$.dirty[0]&131072&&r(68,ua=`select
    d.area_code,
    coalesce(g.area_name, d.area_code) as area_name,
    d.residents_total,
    '/berlin/area/bzr/' || d.area_code as bzr_link
from gentriduck_marts.mart_area_demographics as d
left join gentriduck_marts.dim_area_geometry as g
  on g.city_code = 'BER' and g.area_level = 'bzr' and g.area_code = d.area_code
where d.city_code = 'BER' and d.area_level = 'bzr'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and d.area_code is not null and trim(d.area_code) <> ''
  and substr(d.area_code, 1, 4) = '${f.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`),i.$$.dirty[2]&240&&(ma||!pa?ma||(Ve(ua,{noResolve:ma,..._e}),r(69,pa=!0)):Ve(ua,{noResolve:ma})),i.$$.dirty[0]&1&&r(70,a=Ze==null?void 0:Ze[0]),i.$$.dirty[2]&256&&r(13,n=!a||a.n_total==null||Number(a.n_total)===0?null:(()=>{const T=Number(a.n_total),We=Number(a.n_advanced||0),Fa=a.top_stage_share!=null?Number(a.top_stage_share):null,ga=Fa!=null&&Fa>.5?`<b>${a.top_stage}</b> is the only stage holding a majority (${Math.round(Fa*100)}%)`:"no single stage holds a majority";return`<b>${We}</b> of <b>${T}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${ga} — a distribution across this Prognoseraum's own neighbourhoods, never a single re-scored gentrification-index value for the Prognoseraum itself.`})())},[Ze,Ge,Be,me,Sa,sa,oa,Pa,La,ja,Ha,Qe,fa,n,d,l,q,f,ce,S,M,Se,se,aa,ta,Va,ye,ve,te,ra,Ce,ie,Ta,Ee,Le,be,$e,xe,je,ue,na,ia,F,we,ba,Me,He,oe,Ba,De,pe,Fe,ke,la,Ie,Re,ze,Ne,Oe,le,Ma,_a,Ke,ge,da,Da,_e,ma,ua,pa,a,o]}class Kn extends Mr{constructor(t){super(),Hr(this,t,xn,En,qr,{data:14},null,[-1,-1,-1])}}export{Kn as component};
