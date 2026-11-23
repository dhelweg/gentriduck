import{s as Mr,d as l,i as d,a as se,b as E,c as y,h as Hr,e as q,f as Bt,g as _a,j as P,k as j,l as v,m as T,t as C,n as fr,o as Ar,p as Dr,q as Fr,r as Nr,u as D,v as Ir,H as Or,w as Va}from"../chunks/scheduler.wXRIqz25.js";import{S as Ur,i as Kr,d as w,t as h,a as m,c as re,m as k,b as R,e as z,g as ne}from"../chunks/index.uz5rP6Z2.js";import{A as Wr,P as Qr}from"../chunks/PageTitle.X8fTilZx.js";import{A as Gr}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Zr}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Vr}from"../chunks/Hero.C0o6T8tj.js";import{S as Jr}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{D as Ht,C as la}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as ut,w as Yr}from"../chunks/entry.DotynpIs.js";import{A as ha}from"../chunks/Alert.DFISYc09.js";import{e as Xr,s as en,Q as Ce,p as an,a as gr,r as pr,C as tn}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as H}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as hr,a as pa}from"../chunks/Dropdown.Dl2mephJ.js";import{p as rn}from"../chunks/stores.DJGNasUV.js";import{Q as Le}from"../chunks/QueryViewer.RFckNDEV.js";import{B as Dt}from"../chunks/BarChart.Cy9nf948.js";import{B as At}from"../chunks/BigValue.Bpt9v-UH.js";import{p as nn}from"../chunks/profile.BW8tN6E9.js";function sn(s){var n;let t,r=(L.title??((n=L.og)==null?void 0:n.title))+"",a;return{c(){t=T("h1"),a=C(r),this.h()},l(o){t=q(o,"H1",{class:!0});var c=_a(t);a=P(c,r),c.forEach(l),this.h()},h(){E(t,"class","title")},m(o,c){d(o,t,c),se(t,a)},p:D,d(o){o&&l(t)}}}function on(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:D,p:D,d:D}}function ln(s){var c;let t,r,a,n,o;return document.title=t=L.title??((c=L.og)==null?void 0:c.title),{c(){r=v(),a=T("meta"),n=v(),o=T("meta"),this.h()},l(_){r=y(_),a=q(_,"META",{property:!0,content:!0}),n=y(_),o=q(_,"META",{name:!0,content:!0}),this.h()},h(){var _,u;E(a,"property","og:title"),E(a,"content",((_=L.og)==null?void 0:_.title)??L.title),E(o,"name","twitter:title"),E(o,"content",((u=L.og)==null?void 0:u.title)??L.title)},m(_,u){d(_,r,u),d(_,a,u),d(_,n,u),d(_,o,u)},p(_,u){var b;u&0&&t!==(t=L.title??((b=L.og)==null?void 0:b.title))&&(document.title=t)},d(_){_&&(l(r),l(a),l(n),l(o))}}}function _n(s){var o,c;let t,r,a=(L.description||((o=L.og)==null?void 0:o.description))&&dn(),n=((c=L.og)==null?void 0:c.image)&&cn();return{c(){a&&a.c(),t=v(),n&&n.c(),r=Bt()},l(_){a&&a.l(_),t=y(_),n&&n.l(_),r=Bt()},m(_,u){a&&a.m(_,u),d(_,t,u),n&&n.m(_,u),d(_,r,u)},p(_,u){var b,x;(L.description||(b=L.og)!=null&&b.description)&&a.p(_,u),(x=L.og)!=null&&x.image&&n.p(_,u)},d(_){_&&(l(t),l(r)),a&&a.d(_),n&&n.d(_)}}}function dn(s){let t,r,a,n,o;return{c(){t=T("meta"),r=v(),a=T("meta"),n=v(),o=T("meta"),this.h()},l(c){t=q(c,"META",{name:!0,content:!0}),r=y(c),a=q(c,"META",{property:!0,content:!0}),n=y(c),o=q(c,"META",{name:!0,content:!0}),this.h()},h(){var c,_,u;E(t,"name","description"),E(t,"content",L.description??((c=L.og)==null?void 0:c.description)),E(a,"property","og:description"),E(a,"content",((_=L.og)==null?void 0:_.description)??L.description),E(o,"name","twitter:description"),E(o,"content",((u=L.og)==null?void 0:u.description)??L.description)},m(c,_){d(c,t,_),d(c,r,_),d(c,a,_),d(c,n,_),d(c,o,_)},p:D,d(c){c&&(l(t),l(r),l(a),l(n),l(o))}}}function cn(s){let t,r,a;return{c(){t=T("meta"),r=v(),a=T("meta"),this.h()},l(n){t=q(n,"META",{property:!0,content:!0}),r=y(n),a=q(n,"META",{name:!0,content:!0}),this.h()},h(){var n,o;E(t,"property","og:image"),E(t,"content",gr((n=L.og)==null?void 0:n.image)),E(a,"name","twitter:image"),E(a,"content",gr((o=L.og)==null?void 0:o.image))},m(n,o){d(n,t,o),d(n,r,o),d(n,a,o)},p:D,d(n){n&&(l(t),l(r),l(a))}}}function br(s){let t,r;return t=new Le({props:{queryID:"pgr_name",queryResult:s[0]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function yr(s){let t,r;return t=new Le({props:{queryID:"bezirk_name",queryResult:s[1]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function mn(s){let t,r="District profile";return{c(){t=T("a"),t.textContent=r,this.h()},l(a){t=q(a,"A",{href:!0,"data-svelte-h":!0}),j(t)!=="svelte-1trtuzf"&&(t.textContent=r),this.h()},h(){E(t,"href","/gentriduck/berlin/area/bezirk")},m(a,n){d(a,t,n)},p:D,d(a){a&&l(t)}}}function un(s){let t,r=s[1][0].bezirk_name+"",a,n;return{c(){t=T("a"),a=C(r),this.h()},l(o){t=q(o,"A",{href:!0});var c=_a(t);a=P(c,r),c.forEach(l),this.h()},h(){E(t,"href",n="/gentriduck/berlin/area/bezirk/"+s[1][0].bezirk_code)},m(o,c){d(o,t,c),se(t,a)},p(o,c){c[0]&2&&r!==(r=o[1][0].bezirk_name+"")&&Va(a,r),c[0]&2&&n!==(n="/gentriduck/berlin/area/bezirk/"+o[1][0].bezirk_code)&&E(t,"href",n)},d(o){o&&l(t)}}}function fn(s){let t,r,a="sums and population-weighted averages",n,o,c="methodology page",_;return{c(){t=C("Figures on this page are "),r=T("b"),r.textContent=a,n=C(` of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  `),o=T("a"),o.textContent=c,_=C(" for why coarse-grain areas are not re-scored."),this.h()},l(u){t=P(u,"Figures on this page are "),r=q(u,"B",{"data-svelte-h":!0}),j(r)!=="svelte-rhlwxq"&&(r.textContent=a),n=P(u,` of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  `),o=q(u,"A",{href:!0,"data-svelte-h":!0}),j(o)!=="svelte-1l2pw3"&&(o.textContent=c),_=P(u," for why coarse-grain areas are not re-scored."),this.h()},h(){E(o,"href","/gentriduck/methodology")},m(u,b){d(u,t,b),d(u,r,b),d(u,n,b),d(u,o,b),d(u,_,b)},p:D,d(u){u&&(l(t),l(r),l(n),l(o),l(_))}}}function vr(s){let t,r;return t=new Le({props:{queryID:"stage_mix",queryResult:s[3]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function $r(s){let t,r;return t=new Le({props:{queryID:"stage_mix_summary",queryResult:s[2]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function gn(s){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[hn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[3]&4&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function pn(s){let t,r;return{c(){t=T("p"),r=new Or(!1),this.h()},l(a){t=q(a,"P",{});var n=_a(t);r=Ir(n,!1),n.forEach(l),this.h()},h(){r.a=null},m(a,n){d(a,t,n),r.m(s[13],t)},p(a,n){n[0]&8192&&r.p(a[13])},i:D,o:D,d(a){a&&l(t)}}}function hn(s){let t;return{c(){t=C("No neighbourhood-stage data available for this area.")},l(r){t=P(r,"No neighbourhood-stage data available for this area.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function wr(s){let t,r;return t=new Le({props:{queryID:"poi_mix",queryResult:s[4]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function bn(s){let t,r="Context only — never a Kiez-level claim.",a,n,o="Offering Advantage decoder",c;return{c(){t=T("b"),t.textContent=r,a=C(` A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  `),n=T("a"),n.textContent=o,c=C(` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),j(t)!=="svelte-a7l1s8"&&(t.textContent=r),a=P(_,` A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  `),n=q(_,"A",{href:!0,"data-svelte-h":!0}),j(n)!=="svelte-168mye8"&&(n.textContent=o),c=P(_,` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(_,u){d(_,t,u),d(_,a,u),d(_,n,u),d(_,c,u)},p:D,d(_){_&&(l(t),l(a),l(n),l(c))}}}function kr(s){let t,r;return t=new Le({props:{queryID:"oa_arealevel",queryResult:s[5]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Rr(s){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[yn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function yn(s){let t,r="MAUP fragility disclosure (always shown at this grain).",a,n,o="Offering Advantage decoder",c;return{c(){t=T("b"),t.textContent=r,a=C(` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=T("a"),n.textContent=o,c=C(" §4/§7 for the full finding."),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),j(t)!=="svelte-1impqbu"&&(t.textContent=r),a=P(_,` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=q(_,"A",{href:!0,"data-svelte-h":!0}),j(n)!=="svelte-168mye8"&&(n.textContent=o),c=P(_," §4/§7 for the full finding."),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(_,u){d(_,t,u),d(_,a,u),d(_,n,u),d(_,c,u)},p:D,d(_){_&&(l(t),l(a),l(n),l(c))}}}function vn(s){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[wn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[3]&4&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function $n(s){let t,r;return t=new Dt({props:{data:s[5],x:"poi_domain_h",y:"pct_vs_baseline",title:"Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this Prognoseraum."}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.data=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function wn(s){let t;return{c(){t=C("No Offering Advantage data for this Prognoseraum.")},l(r){t=P(r,"No Offering Advantage data for this Prognoseraum.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function zr(s){let t,r;return t=new ha({props:{status:"info",$$slots:{default:[kn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function kn(s){let t;return{c(){t=C(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=P(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function Rn(s){let t,r="Dominance is sign-blind",a,n,o="Offering Advantage decoder",c;return{c(){t=T("b"),t.textContent=r,a=C(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=T("a"),n.textContent=o,c=C(` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),j(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=P(_,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=q(_,"A",{href:!0,"data-svelte-h":!0}),j(n)!=="svelte-168mye8"&&(n.textContent=o),c=P(_,` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(_,u){d(_,t,u),d(_,a,u),d(_,n,u),d(_,c,u)},p:D,d(_){_&&(l(t),l(a),l(n),l(c))}}}function zn(s){let t,r,a,n,o,c,_,u;return t=new pa({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new pa({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new pa({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),_=new pa({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment),c=v(),z(_.$$.fragment)},l(b){R(t.$$.fragment,b),r=y(b),R(a.$$.fragment,b),n=y(b),R(o.$$.fragment,b),c=y(b),R(_.$$.fragment,b)},m(b,x){k(t,b,x),d(b,r,x),k(a,b,x),d(b,n,x),k(o,b,x),d(b,c,x),k(_,b,x),u=!0},p:D,i(b){u||(m(t.$$.fragment,b),m(a.$$.fragment,b),m(o.$$.fragment,b),m(_.$$.fragment,b),u=!0)},o(b){h(t.$$.fragment,b),h(a.$$.fragment,b),h(o.$$.fragment,b),h(_.$$.fragment,b),u=!1},d(b){b&&(l(r),l(n),l(c)),w(t,b),w(a,b),w(o,b),w(_,b)}}}function En(s){let t,r,a,n,o,c,_,u,b,x,f,M;return t=new pa({props:{value:"2025",valueLabel:"2025"}}),a=new pa({props:{value:"2024",valueLabel:"2024"}}),o=new pa({props:{value:"2023",valueLabel:"2023"}}),_=new pa({props:{value:"2022",valueLabel:"2022"}}),b=new pa({props:{value:"2021",valueLabel:"2021"}}),f=new pa({props:{value:"2020",valueLabel:"2020"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment),c=v(),z(_.$$.fragment),u=v(),z(b.$$.fragment),x=v(),z(f.$$.fragment)},l(g){R(t.$$.fragment,g),r=y(g),R(a.$$.fragment,g),n=y(g),R(o.$$.fragment,g),c=y(g),R(_.$$.fragment,g),u=y(g),R(b.$$.fragment,g),x=y(g),R(f.$$.fragment,g)},m(g,$){k(t,g,$),d(g,r,$),k(a,g,$),d(g,n,$),k(o,g,$),d(g,c,$),k(_,g,$),d(g,u,$),k(b,g,$),d(g,x,$),k(f,g,$),M=!0},p:D,i(g){M||(m(t.$$.fragment,g),m(a.$$.fragment,g),m(o.$$.fragment,g),m(_.$$.fragment,g),m(b.$$.fragment,g),m(f.$$.fragment,g),M=!0)},o(g){h(t.$$.fragment,g),h(a.$$.fragment,g),h(o.$$.fragment,g),h(_.$$.fragment,g),h(b.$$.fragment,g),h(f.$$.fragment,g),M=!1},d(g){g&&(l(r),l(n),l(c),l(u),l(x)),w(t,g),w(a,g),w(o,g),w(_,g),w(b,g),w(f,g)}}}function Er(s){let t,r;return t=new Le({props:{queryID:"dom_suppressed_count",queryResult:s[6]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function xn(s){let t,r=(s[6][0]?s[6][0].n_suppressed:0)+"",a,n,o=(s[6][0]?s[6][0].n_suppressed+s[6][0].n_shown:0)+"",c,_,u;return{c(){t=T("b"),a=C(r),n=C(" of "),c=C(o),_=C(" neighbourhoods here are suppressed below as too thinly observed to characterize"),u=C(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(b){t=q(b,"B",{});var x=_a(t);a=P(x,r),n=P(x," of "),c=P(x,o),_=P(x," neighbourhoods here are suppressed below as too thinly observed to characterize"),x.forEach(l),u=P(b,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(b,x){d(b,t,x),se(t,a),se(t,n),se(t,c),se(t,_),d(b,u,x)},p(b,x){x[0]&64&&r!==(r=(b[6][0]?b[6][0].n_suppressed:0)+"")&&Va(a,r),x[0]&64&&o!==(o=(b[6][0]?b[6][0].n_suppressed+b[6][0].n_shown:0)+"")&&Va(c,o)},d(b){b&&(l(t),l(u))}}}function xr(s){let t,r;return t=new Le({props:{queryID:"dominance_children",queryResult:s[7]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function qn(s){let t,r,a,n,o,c,_,u,b,x,f,M;return t=new la({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new la({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new la({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),_=new la({props:{id:"top_child",title:"Leading type"}}),b=new la({props:{id:"n_children",title:"Types in this group here"}}),f=new la({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment),c=v(),z(_.$$.fragment),u=v(),z(b.$$.fragment),x=v(),z(f.$$.fragment)},l(g){R(t.$$.fragment,g),r=y(g),R(a.$$.fragment,g),n=y(g),R(o.$$.fragment,g),c=y(g),R(_.$$.fragment,g),u=y(g),R(b.$$.fragment,g),x=y(g),R(f.$$.fragment,g)},m(g,$){k(t,g,$),d(g,r,$),k(a,g,$),d(g,n,$),k(o,g,$),d(g,c,$),k(_,g,$),d(g,u,$),k(b,g,$),d(g,x,$),k(f,g,$),M=!0},p:D,i(g){M||(m(t.$$.fragment,g),m(a.$$.fragment,g),m(o.$$.fragment,g),m(_.$$.fragment,g),m(b.$$.fragment,g),m(f.$$.fragment,g),M=!0)},o(g){h(t.$$.fragment,g),h(a.$$.fragment,g),h(o.$$.fragment,g),h(_.$$.fragment,g),h(b.$$.fragment,g),h(f.$$.fragment,g),M=!1},d(g){g&&(l(r),l(n),l(c),l(u),l(x)),w(t,g),w(a,g),w(o,g),w(_,g),w(b,g),w(f,g)}}}function qr(s){let t,r;return t=new Le({props:{queryID:"demographics",queryResult:s[8]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Tr(s){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[Tn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Tn(s){let t;return{c(){t=C(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},l(r){t=P(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function Br(s){let t,r;return t=new Le({props:{queryID:"amenities_current",queryResult:s[9]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Sr(s){let t,r;return t=new Le({props:{queryID:"amenities_table",queryResult:s[10]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&1024&&(o.queryResult=a[10]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Bn(s){let t;return{c(){t=C("No amenity data is available for this area yet.")},l(r){t=P(r,"No amenity data is available for this area yet.")},m(r,a){d(r,t,a)},p:D,d(r){r&&l(t)}}}function Sn(s){let t,r,a=s[9][0].snapshot_year+"",n,o;return{c(){t=C("Based on OpenStreetMap tagging as of "),r=T("b"),n=C(a),o=C(`, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(c){t=P(c,"Based on OpenStreetMap tagging as of "),r=q(c,"B",{});var _=_a(r);n=P(_,a),_.forEach(l),o=P(c,`, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(c,_){d(c,t,_),d(c,r,_),se(r,n),d(c,o,_)},p(c,_){_[0]&512&&a!==(a=c[9][0].snapshot_year+"")&&Va(n,a)},d(c){c&&(l(t),l(r),l(o))}}}function Pn(s){let t,r,a,n,o,c;return t=new la({props:{id:"indicator",title:"Infrastructure"}}),a=new la({props:{id:"area_value",title:"This Prognoseraum"}}),o=new la({props:{id:"district_value",title:"District total"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment)},l(_){R(t.$$.fragment,_),r=y(_),R(a.$$.fragment,_),n=y(_),R(o.$$.fragment,_)},m(_,u){k(t,_,u),d(_,r,u),k(a,_,u),d(_,n,u),k(o,_,u),c=!0},p:D,i(_){c||(m(t.$$.fragment,_),m(a.$$.fragment,_),m(o.$$.fragment,_),c=!0)},o(_){h(t.$$.fragment,_),h(a.$$.fragment,_),h(o.$$.fragment,_),c=!1},d(_){_&&(l(r),l(n)),w(t,_),w(a,_),w(o,_)}}}function Cn(s){let t,r,a="0",n,o,c="open-data",_;return{c(){t=C("These figures come from OpenStreetMap tagging, not an official registry. A "),r=T("b"),r.textContent=a,n=C(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=T("a"),o.textContent=c,_=C(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(u){t=P(u,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=q(u,"B",{"data-svelte-h":!0}),j(r)!=="svelte-12bhsds"&&(r.textContent=a),n=P(u,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=q(u,"A",{href:!0,"data-svelte-h":!0}),j(o)!=="svelte-1jijq3i"&&(o.textContent=c),_=P(u,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){E(o,"href","/gentriduck/open-data")},m(u,b){d(u,t,b),d(u,r,b),d(u,n,b),d(u,o,b),d(u,_,b)},p:D,d(u){u&&(l(t),l(r),l(n),l(o),l(_))}}}function Ln(s){let t;return{c(){t=C(`There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=P(r,`There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){d(r,t,a)},p:D,d(r){r&&l(t)}}}function jn(s){let t,r,a=s[9][0].gastro_poi_with_cuisine_count+"",n,o;return{c(){t=C("Cuisine is tagged for "),r=T("b"),n=C(a),o=C(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(c){t=P(c,"Cuisine is tagged for "),r=q(c,"B",{});var _=_a(r);n=P(_,a),_.forEach(l),o=P(c,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(c,_){d(c,t,_),d(c,r,_),se(r,n),d(c,o,_)},p(c,_){_[0]&512&&a!==(a=c[9][0].gastro_poi_with_cuisine_count+"")&&Va(n,a)},d(c){c&&(l(t),l(r),l(o))}}}function Mn(s){let t,r,a=s[9][0].gastro_poi_with_cuisine_count+"",n,o,c,_="most common cuisine",u,b,x=s[9][0].dominant_cuisine+"",f,M,g=Math.round(s[9][0].dominant_cuisine_share*100)+"",$,da;return{c(){t=C("Among "),r=T("b"),n=C(a),o=C(` restaurants/cafes with cuisine
data tagged in this Prognoseraum, the `),c=T("b"),c.textContent=_,u=C(` is
`),b=T("b"),f=C(x),M=C(`
(`),$=C(g),da=C("% of cuisine-tagged restaurants/cafes).")},l(S){t=P(S,"Among "),r=q(S,"B",{});var p=_a(r);n=P(p,a),p.forEach(l),o=P(S,` restaurants/cafes with cuisine
data tagged in this Prognoseraum, the `),c=q(S,"B",{"data-svelte-h":!0}),j(c)!=="svelte-1floooe"&&(c.textContent=_),u=P(S,` is
`),b=q(S,"B",{});var ze=_a(b);f=P(ze,x),ze.forEach(l),M=P(S,`
(`),$=P(S,g),da=P(S,"% of cuisine-tagged restaurants/cafes).")},m(S,p){d(S,t,p),d(S,r,p),se(r,n),d(S,o,p),d(S,c,p),d(S,u,p),d(S,b,p),se(b,f),d(S,M,p),d(S,$,p),d(S,da,p)},p(S,p){p[0]&512&&a!==(a=S[9][0].gastro_poi_with_cuisine_count+"")&&Va(n,a),p[0]&512&&x!==(x=S[9][0].dominant_cuisine+"")&&Va(f,x),p[0]&512&&g!==(g=Math.round(S[9][0].dominant_cuisine_share*100)+"")&&Va($,g)},d(S){S&&(l(t),l(r),l(o),l(c),l(u),l(b),l(M),l($),l(da))}}}function Pr(s){let t,r;return t=new Le({props:{queryID:"minimap_areas",queryResult:s[11]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Cr(s){let t,r;return t=new Le({props:{queryID:"children",queryResult:s[12]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&4096&&(o.queryResult=a[12]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Hn(s){let t,r,a,n;return t=new la({props:{id:"area_name",title:"Bezirksregion"}}),a=new la({props:{id:"residents_total",title:"Residents",fmt:"num0"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment)},l(o){R(t.$$.fragment,o),r=y(o),R(a.$$.fragment,o)},m(o,c){k(t,o,c),d(o,r,c),k(a,o,c),n=!0},p:D,i(o){n||(m(t.$$.fragment,o),m(a.$$.fragment,o),n=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),n=!1},d(o){o&&l(r),w(t,o),w(a,o)}}}function An(s){var er;let t,r,a,n,o,c,_,u,b,x,f,M,g,$,da,S,p,ze="all districts",ta,Ee,ba="full neighbourhood list",Ea,je,Me,ie,xa='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',xe,He,at=`Every neighbourhood (Planungsraum) in this Prognoseraum is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This page reports the <strong class="markdown">distribution</strong> of
those neighbourhood-level stages — never a single re-scored index value for the Prognoseraum itself,
since averaging ordinal stage codes across such different neighbourhoods would mask exactly the
neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see &quot;Honest
caveats&quot; below).`,Ae,he,De,_e,de,ca,ce,Fe,qe,ra,Te,tt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Ne,oe,qa='<a href="#mapped-places">Mapped places</a>',Ta,ma,Ie,Oe,le,Ba='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',Sa,Ue,Pa,be,ye,te,me,ua,Ja=s[5].some(Lr),ve,ue,Ca=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule.`,La,Be,rt='<a href="#within-group-dominance">Within-group dominance</a>',Ke,fe,fa,We,ja,Qe,Ge,$e,we,Ma,ga,Ze,Ve,ge,Ha=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Aa,Se,nt='<a href="#people--structure">People &amp; structure</a>',Je,ke,Re,Da,Ye,Fa,pe,Xe,ea,Pe,st='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Na,B,na,ya,it,aa,ot,Ia,ft,Ya,gt,Xa,Ft=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,pt,va,Nt='<a href="#where-this-area-sits">Where this area sits</a>',ht,lt,Oa,bt,$a,It='<a href="#bezirksregionen-in-this-prognoseraum">Bezirksregionen in this Prognoseraum</a>',yt,_t,Ua,vt,wa,Ot='<a href="#honest-caveats">Honest caveats</a>',$t,Ka,Ut=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Prognoseraum</strong> —
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,wt,ka,Kt='<a href="#further-reading">Further reading</a>',kt,Wa,Wt=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other areas, or drill into any of this Prognoseraum&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,Rt,dt,zt,et,Et,Ra=typeof L<"u"&&(L.title||((er=L.og)==null?void 0:er.title))&&L.hide_title!==!0&&sn();function jr(e,i){var A;return typeof L<"u"&&(L.title||(A=L.og)!=null&&A.title)?ln:on}let ct=jr()(s),za=typeof L=="object"&&_n(),F=s[0]&&br(s),N=s[1]&&yr(s);u=new Wr({props:{crumbs:s[15]}}),x=new Qr({props:{title:s[14]}}),M=new Vr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]&&s[0][0].area_name)+" — Prognoseraum profile",lede:"Population, composition, and neighbourhood-stage mix for this Prognoseraum, summed and recomputed from its constituent Bezirksregionen — never a re-scored index at this grain."}});function Qt(e,i){var A;return(A=e[1][0])!=null&&A.bezirk_code?un:mn}let xt=Qt(s),sa=xt(s);je=new ha({props:{status:"info",$$slots:{default:[fn]},$$scope:{ctx:s}}});let I=s[3]&&vr(s),O=s[2]&&$r(s);const Gt=[pn,gn],Qa=[];function Zt(e,i){return e[13]?0:1}_e=Zt(s),de=Qa[_e]=Gt[_e](s),ce=new Dt({props:{data:s[3],x:"stage",y:"n_areas",title:"Neighbourhoods by stage",swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}}}}),qe=new Jr({});let U=s[4]&&wr(s);Ie=new Dt({props:{data:s[4],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot)",swapXY:"true"}}),Ue=new ha({props:{status:"warning",$$slots:{default:[bn]},$$scope:{ctx:s}}});let K=s[5]&&kr(s),X=s[5][0]&&s[5][0].maup_caveat_required&&Rr(s);const Vt=[$n,vn],Ga=[];function Jt(e,i){return e[5].length>0?0:1}te=Jt(s),me=Ga[te]=Vt[te](s);let ee=Ja&&zr(s);fe=new ha({props:{status:"info",$$slots:{default:[Rn]},$$scope:{ctx:s}}}),We=new hr({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[zn]},$$scope:{ctx:s}}}),Qe=new hr({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[En]},$$scope:{ctx:s}}});let W=s[6]&&Er(s);we=new ha({props:{status:"info",$$slots:{default:[xn]},$$scope:{ctx:s}}});let Q=s[7]&&xr(s);Ze=new Ht({props:{data:s[7],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Prognoseraum.",$$slots:{default:[qn]},$$scope:{ctx:s}}});let G=s[8]&&qr(s);Re=new At({props:{data:s[8],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),Ye=new At({props:{data:s[8],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),pe=new At({props:{data:s[8],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let ae=s[8]&&s[8][0]&&s[8][0].any_indicator_suppressed&&Tr(s),Z=s[9]&&Br(s),V=s[10]&&Sr(s);function Yt(e,i){var A;return(A=e[9][0])!=null&&A.snapshot_year?Sn:Bn}let qt=Yt(s),ia=qt(s);aa=new Ht({props:{data:s[10],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Pn]},$$scope:{ctx:s}}}),Ia=new ha({props:{status:"info",$$slots:{default:[Cn]},$$scope:{ctx:s}}});function Xt(e,i){var A,Za;return(A=e[9][0])!=null&&A.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8&&e[9][0].dominant_cuisine_share>=.15?Mn:(Za=e[9][0])!=null&&Za.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8?jn:Ln}let Tt=Xt(s),oa=Tt(s),J=s[11]&&Pr(s);Oa=new Gr({props:{data:s[11],geoJsonUrl:`${ut}/geo/pgr_bzr_drilldown.geojson`,title:(s[0][0]?s[0][0].area_name:"This Prognoseraum")+" and its Bezirksregionen"}});let Y=s[12]&&Cr(s);return Ua=new Ht({props:{data:s[12],rows:"20",link:"bzr_link",$$slots:{default:[Hn]},$$scope:{ctx:s}}}),et=new Zr({}),{c(){Ra&&Ra.c(),t=v(),ct.c(),r=T("meta"),a=T("meta"),za&&za.c(),n=Bt(),o=v(),F&&F.c(),c=v(),N&&N.c(),_=v(),z(u.$$.fragment),b=v(),z(x.$$.fragment),f=v(),z(M.$$.fragment),g=v(),$=T("p"),da=C("Up: "),sa.c(),S=C(" · "),p=T("a"),p.textContent=ze,ta=C(" · "),Ee=T("a"),Ee.textContent=ba,Ea=v(),z(je.$$.fragment),Me=v(),ie=T("h2"),ie.innerHTML=xa,xe=v(),He=T("p"),He.innerHTML=at,Ae=v(),I&&I.c(),he=v(),O&&O.c(),De=v(),de.c(),ca=v(),z(ce.$$.fragment),Fe=v(),z(qe.$$.fragment),ra=v(),Te=T("h2"),Te.innerHTML=tt,Ne=v(),oe=T("h3"),oe.innerHTML=qa,Ta=v(),U&&U.c(),ma=v(),z(Ie.$$.fragment),Oe=v(),le=T("h3"),le.innerHTML=Ba,Sa=v(),z(Ue.$$.fragment),Pa=v(),K&&K.c(),be=v(),X&&X.c(),ye=v(),me.c(),ua=v(),ee&&ee.c(),ve=v(),ue=T("p"),ue.innerHTML=Ca,La=v(),Be=T("h2"),Be.innerHTML=rt,Ke=v(),z(fe.$$.fragment),fa=v(),z(We.$$.fragment),ja=v(),z(Qe.$$.fragment),Ge=v(),W&&W.c(),$e=v(),z(we.$$.fragment),Ma=v(),Q&&Q.c(),ga=v(),z(Ze.$$.fragment),Ve=v(),ge=T("p"),ge.innerHTML=Ha,Aa=v(),Se=T("h2"),Se.innerHTML=nt,Je=v(),G&&G.c(),ke=v(),z(Re.$$.fragment),Da=v(),z(Ye.$$.fragment),Fa=v(),z(pe.$$.fragment),Xe=v(),ae&&ae.c(),ea=v(),Pe=T("h2"),Pe.innerHTML=st,Na=v(),Z&&Z.c(),B=v(),V&&V.c(),na=v(),ya=T("p"),ia.c(),it=v(),z(aa.$$.fragment),ot=v(),z(Ia.$$.fragment),ft=v(),Ya=T("p"),oa.c(),gt=v(),Xa=T("p"),Xa.textContent=Ft,pt=v(),va=T("h2"),va.innerHTML=Nt,ht=v(),J&&J.c(),lt=v(),z(Oa.$$.fragment),bt=v(),$a=T("h3"),$a.innerHTML=It,yt=v(),Y&&Y.c(),_t=v(),z(Ua.$$.fragment),vt=v(),wa=T("h2"),wa.innerHTML=Ot,$t=v(),Ka=T("ul"),Ka.innerHTML=Ut,wt=v(),ka=T("h2"),ka.innerHTML=Kt,kt=v(),Wa=T("p"),Wa.innerHTML=Wt,Rt=v(),dt=T("hr"),zt=v(),z(et.$$.fragment),this.h()},l(e){Ra&&Ra.l(e),t=y(e);const i=Hr("svelte-2igo1p",document.head);ct.l(i),r=q(i,"META",{name:!0,content:!0}),a=q(i,"META",{name:!0,content:!0}),za&&za.l(i),n=Bt(),i.forEach(l),o=y(e),F&&F.l(e),c=y(e),N&&N.l(e),_=y(e),R(u.$$.fragment,e),b=y(e),R(x.$$.fragment,e),f=y(e),R(M.$$.fragment,e),g=y(e),$=q(e,"P",{});var A=_a($);da=P(A,"Up: "),sa.l(A),S=P(A," · "),p=q(A,"A",{href:!0,"data-svelte-h":!0}),j(p)!=="svelte-6j2qr0"&&(p.textContent=ze),ta=P(A," · "),Ee=q(A,"A",{href:!0,"data-svelte-h":!0}),j(Ee)!=="svelte-z78e0k"&&(Ee.textContent=ba),A.forEach(l),Ea=y(e),R(je.$$.fragment,e),Me=y(e),ie=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(ie)!=="svelte-14f17uo"&&(ie.innerHTML=xa),xe=y(e),He=q(e,"P",{class:!0,"data-svelte-h":!0}),j(He)!=="svelte-qdtmcq"&&(He.innerHTML=at),Ae=y(e),I&&I.l(e),he=y(e),O&&O.l(e),De=y(e),de.l(e),ca=y(e),R(ce.$$.fragment,e),Fe=y(e),R(qe.$$.fragment,e),ra=y(e),Te=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(Te)!=="svelte-1i9w9pn"&&(Te.innerHTML=tt),Ne=y(e),oe=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j(oe)!=="svelte-3hvew3"&&(oe.innerHTML=qa),Ta=y(e),U&&U.l(e),ma=y(e),R(Ie.$$.fragment,e),Oe=y(e),le=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j(le)!=="svelte-5mc7pd"&&(le.innerHTML=Ba),Sa=y(e),R(Ue.$$.fragment,e),Pa=y(e),K&&K.l(e),be=y(e),X&&X.l(e),ye=y(e),me.l(e),ua=y(e),ee&&ee.l(e),ve=y(e),ue=q(e,"P",{class:!0,"data-svelte-h":!0}),j(ue)!=="svelte-1q1lnxb"&&(ue.innerHTML=Ca),La=y(e),Be=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(Be)!=="svelte-4kb45v"&&(Be.innerHTML=rt),Ke=y(e),R(fe.$$.fragment,e),fa=y(e),R(We.$$.fragment,e),ja=y(e),R(Qe.$$.fragment,e),Ge=y(e),W&&W.l(e),$e=y(e),R(we.$$.fragment,e),Ma=y(e),Q&&Q.l(e),ga=y(e),R(Ze.$$.fragment,e),Ve=y(e),ge=q(e,"P",{class:!0,"data-svelte-h":!0}),j(ge)!=="svelte-1xa7bh7"&&(ge.innerHTML=Ha),Aa=y(e),Se=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(Se)!=="svelte-1mdzqzc"&&(Se.innerHTML=nt),Je=y(e),G&&G.l(e),ke=y(e),R(Re.$$.fragment,e),Da=y(e),R(Ye.$$.fragment,e),Fa=y(e),R(pe.$$.fragment,e),Xe=y(e),ae&&ae.l(e),ea=y(e),Pe=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(Pe)!=="svelte-12k6lqd"&&(Pe.innerHTML=st),Na=y(e),Z&&Z.l(e),B=y(e),V&&V.l(e),na=y(e),ya=q(e,"P",{});var Za=_a(ya);ia.l(Za),Za.forEach(l),it=y(e),R(aa.$$.fragment,e),ot=y(e),R(Ia.$$.fragment,e),ft=y(e),Ya=q(e,"P",{});var mt=_a(Ya);oa.l(mt),mt.forEach(l),gt=y(e),Xa=q(e,"P",{"data-svelte-h":!0}),j(Xa)!=="svelte-ja6pm6"&&(Xa.textContent=Ft),pt=y(e),va=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(va)!=="svelte-60cjj9"&&(va.innerHTML=Nt),ht=y(e),J&&J.l(e),lt=y(e),R(Oa.$$.fragment,e),bt=y(e),$a=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j($a)!=="svelte-efyvo4"&&($a.innerHTML=It),yt=y(e),Y&&Y.l(e),_t=y(e),R(Ua.$$.fragment,e),vt=y(e),wa=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(wa)!=="svelte-ad0syq"&&(wa.innerHTML=Ot),$t=y(e),Ka=q(e,"UL",{class:!0,"data-svelte-h":!0}),j(Ka)!=="svelte-1vxfhvh"&&(Ka.innerHTML=Ut),wt=y(e),ka=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(ka)!=="svelte-oimjns"&&(ka.innerHTML=Kt),kt=y(e),Wa=q(e,"P",{class:!0,"data-svelte-h":!0}),j(Wa)!=="svelte-1iuzmnk"&&(Wa.innerHTML=Wt),Rt=y(e),dt=q(e,"HR",{class:!0}),zt=y(e),R(et.$$.fragment,e),this.h()},h(){E(r,"name","twitter:card"),E(r,"content","summary_large_image"),E(a,"name","twitter:site"),E(a,"content","@evidence_dev"),E(p,"href","/gentriduck/berlin/area/bezirk"),E(Ee,"href","/gentriduck/berlin/area"),E(ie,"class","markdown"),E(ie,"id","social-status--trajectory"),E(He,"class","markdown"),E(Te,"class","markdown"),E(Te,"id","commercial-mix--offering-advantage"),E(oe,"class","markdown"),E(oe,"id","mapped-places"),E(le,"class","markdown"),E(le,"id","offering-advantage-across-the-area-hierarchy"),E(ue,"class","markdown"),E(Be,"class","markdown"),E(Be,"id","within-group-dominance"),E(ge,"class","markdown"),E(Se,"class","markdown"),E(Se,"id","people--structure"),E(Pe,"class","markdown"),E(Pe,"id","amenities--everyday-infrastructure"),E(va,"class","markdown"),E(va,"id","where-this-area-sits"),E($a,"class","markdown"),E($a,"id","bezirksregionen-in-this-prognoseraum"),E(wa,"class","markdown"),E(wa,"id","honest-caveats"),E(Ka,"class","markdown"),E(ka,"class","markdown"),E(ka,"id","further-reading"),E(Wa,"class","markdown"),E(dt,"class","markdown")},m(e,i){Ra&&Ra.m(e,i),d(e,t,i),ct.m(document.head,null),se(document.head,r),se(document.head,a),za&&za.m(document.head,null),se(document.head,n),d(e,o,i),F&&F.m(e,i),d(e,c,i),N&&N.m(e,i),d(e,_,i),k(u,e,i),d(e,b,i),k(x,e,i),d(e,f,i),k(M,e,i),d(e,g,i),d(e,$,i),se($,da),sa.m($,null),se($,S),se($,p),se($,ta),se($,Ee),d(e,Ea,i),k(je,e,i),d(e,Me,i),d(e,ie,i),d(e,xe,i),d(e,He,i),d(e,Ae,i),I&&I.m(e,i),d(e,he,i),O&&O.m(e,i),d(e,De,i),Qa[_e].m(e,i),d(e,ca,i),k(ce,e,i),d(e,Fe,i),k(qe,e,i),d(e,ra,i),d(e,Te,i),d(e,Ne,i),d(e,oe,i),d(e,Ta,i),U&&U.m(e,i),d(e,ma,i),k(Ie,e,i),d(e,Oe,i),d(e,le,i),d(e,Sa,i),k(Ue,e,i),d(e,Pa,i),K&&K.m(e,i),d(e,be,i),X&&X.m(e,i),d(e,ye,i),Ga[te].m(e,i),d(e,ua,i),ee&&ee.m(e,i),d(e,ve,i),d(e,ue,i),d(e,La,i),d(e,Be,i),d(e,Ke,i),k(fe,e,i),d(e,fa,i),k(We,e,i),d(e,ja,i),k(Qe,e,i),d(e,Ge,i),W&&W.m(e,i),d(e,$e,i),k(we,e,i),d(e,Ma,i),Q&&Q.m(e,i),d(e,ga,i),k(Ze,e,i),d(e,Ve,i),d(e,ge,i),d(e,Aa,i),d(e,Se,i),d(e,Je,i),G&&G.m(e,i),d(e,ke,i),k(Re,e,i),d(e,Da,i),k(Ye,e,i),d(e,Fa,i),k(pe,e,i),d(e,Xe,i),ae&&ae.m(e,i),d(e,ea,i),d(e,Pe,i),d(e,Na,i),Z&&Z.m(e,i),d(e,B,i),V&&V.m(e,i),d(e,na,i),d(e,ya,i),ia.m(ya,null),d(e,it,i),k(aa,e,i),d(e,ot,i),k(Ia,e,i),d(e,ft,i),d(e,Ya,i),oa.m(Ya,null),d(e,gt,i),d(e,Xa,i),d(e,pt,i),d(e,va,i),d(e,ht,i),J&&J.m(e,i),d(e,lt,i),k(Oa,e,i),d(e,bt,i),d(e,$a,i),d(e,yt,i),Y&&Y.m(e,i),d(e,_t,i),k(Ua,e,i),d(e,vt,i),d(e,wa,i),d(e,$t,i),d(e,Ka,i),d(e,wt,i),d(e,ka,i),d(e,kt,i),d(e,Wa,i),d(e,Rt,i),d(e,dt,i),d(e,zt,i),k(et,e,i),Et=!0},p(e,i){var ur;typeof L<"u"&&(L.title||(ur=L.og)!=null&&ur.title)&&L.hide_title!==!0&&Ra.p(e,i),ct.p(e,i),typeof L=="object"&&za.p(e,i),e[0]?F?(F.p(e,i),i[0]&1&&m(F,1)):(F=br(e),F.c(),m(F,1),F.m(c.parentNode,c)):F&&(ne(),h(F,1,1,()=>{F=null}),re()),e[1]?N?(N.p(e,i),i[0]&2&&m(N,1)):(N=yr(e),N.c(),m(N,1),N.m(_.parentNode,_)):N&&(ne(),h(N,1,1,()=>{N=null}),re());const A={};i[0]&32768&&(A.crumbs=e[15]),u.$set(A);const Za={};i[0]&16384&&(Za.title=e[14]),x.$set(Za);const mt={};i[0]&1&&(mt.title=(e[0][0]&&e[0][0].area_name)+" — Prognoseraum profile"),M.$set(mt),xt===(xt=Qt(e))&&sa?sa.p(e,i):(sa.d(1),sa=xt(e),sa&&(sa.c(),sa.m($,S)));const ar={};i[3]&4&&(ar.$$scope={dirty:i,ctx:e}),je.$set(ar),e[3]?I?(I.p(e,i),i[0]&8&&m(I,1)):(I=vr(e),I.c(),m(I,1),I.m(he.parentNode,he)):I&&(ne(),h(I,1,1,()=>{I=null}),re()),e[2]?O?(O.p(e,i),i[0]&4&&m(O,1)):(O=$r(e),O.c(),m(O,1),O.m(De.parentNode,De)):O&&(ne(),h(O,1,1,()=>{O=null}),re());let St=_e;_e=Zt(e),_e===St?Qa[_e].p(e,i):(ne(),h(Qa[St],1,1,()=>{Qa[St]=null}),re(),de=Qa[_e],de?de.p(e,i):(de=Qa[_e]=Gt[_e](e),de.c()),m(de,1),de.m(ca.parentNode,ca));const tr={};i[0]&8&&(tr.data=e[3]),ce.$set(tr),e[4]?U?(U.p(e,i),i[0]&16&&m(U,1)):(U=wr(e),U.c(),m(U,1),U.m(ma.parentNode,ma)):U&&(ne(),h(U,1,1,()=>{U=null}),re());const rr={};i[0]&16&&(rr.data=e[4]),Ie.$set(rr);const nr={};i[3]&4&&(nr.$$scope={dirty:i,ctx:e}),Ue.$set(nr),e[5]?K?(K.p(e,i),i[0]&32&&m(K,1)):(K=kr(e),K.c(),m(K,1),K.m(be.parentNode,be)):K&&(ne(),h(K,1,1,()=>{K=null}),re()),e[5][0]&&e[5][0].maup_caveat_required?X?i[0]&32&&m(X,1):(X=Rr(e),X.c(),m(X,1),X.m(ye.parentNode,ye)):X&&(ne(),h(X,1,1,()=>{X=null}),re());let Pt=te;te=Jt(e),te===Pt?Ga[te].p(e,i):(ne(),h(Ga[Pt],1,1,()=>{Ga[Pt]=null}),re(),me=Ga[te],me?me.p(e,i):(me=Ga[te]=Vt[te](e),me.c()),m(me,1),me.m(ua.parentNode,ua)),i[0]&32&&(Ja=e[5].some(Lr)),Ja?ee?i[0]&32&&m(ee,1):(ee=zr(e),ee.c(),m(ee,1),ee.m(ve.parentNode,ve)):ee&&(ne(),h(ee,1,1,()=>{ee=null}),re());const sr={};i[3]&4&&(sr.$$scope={dirty:i,ctx:e}),fe.$set(sr);const ir={};i[3]&4&&(ir.$$scope={dirty:i,ctx:e}),We.$set(ir);const or={};i[3]&4&&(or.$$scope={dirty:i,ctx:e}),Qe.$set(or),e[6]?W?(W.p(e,i),i[0]&64&&m(W,1)):(W=Er(e),W.c(),m(W,1),W.m($e.parentNode,$e)):W&&(ne(),h(W,1,1,()=>{W=null}),re());const lr={};i[0]&64|i[3]&4&&(lr.$$scope={dirty:i,ctx:e}),we.$set(lr),e[7]?Q?(Q.p(e,i),i[0]&128&&m(Q,1)):(Q=xr(e),Q.c(),m(Q,1),Q.m(ga.parentNode,ga)):Q&&(ne(),h(Q,1,1,()=>{Q=null}),re());const Ct={};i[0]&128&&(Ct.data=e[7]),i[3]&4&&(Ct.$$scope={dirty:i,ctx:e}),Ze.$set(Ct),e[8]?G?(G.p(e,i),i[0]&256&&m(G,1)):(G=qr(e),G.c(),m(G,1),G.m(ke.parentNode,ke)):G&&(ne(),h(G,1,1,()=>{G=null}),re());const _r={};i[0]&256&&(_r.data=e[8]),Re.$set(_r);const dr={};i[0]&256&&(dr.data=e[8]),Ye.$set(dr);const cr={};i[0]&256&&(cr.data=e[8]),pe.$set(cr),e[8]&&e[8][0]&&e[8][0].any_indicator_suppressed?ae?i[0]&256&&m(ae,1):(ae=Tr(e),ae.c(),m(ae,1),ae.m(ea.parentNode,ea)):ae&&(ne(),h(ae,1,1,()=>{ae=null}),re()),e[9]?Z?(Z.p(e,i),i[0]&512&&m(Z,1)):(Z=Br(e),Z.c(),m(Z,1),Z.m(B.parentNode,B)):Z&&(ne(),h(Z,1,1,()=>{Z=null}),re()),e[10]?V?(V.p(e,i),i[0]&1024&&m(V,1)):(V=Sr(e),V.c(),m(V,1),V.m(na.parentNode,na)):V&&(ne(),h(V,1,1,()=>{V=null}),re()),qt===(qt=Yt(e))&&ia?ia.p(e,i):(ia.d(1),ia=qt(e),ia&&(ia.c(),ia.m(ya,null)));const Lt={};i[0]&1024&&(Lt.data=e[10]),i[3]&4&&(Lt.$$scope={dirty:i,ctx:e}),aa.$set(Lt);const mr={};i[3]&4&&(mr.$$scope={dirty:i,ctx:e}),Ia.$set(mr),Tt===(Tt=Xt(e))&&oa?oa.p(e,i):(oa.d(1),oa=Tt(e),oa&&(oa.c(),oa.m(Ya,null))),e[11]?J?(J.p(e,i),i[0]&2048&&m(J,1)):(J=Pr(e),J.c(),m(J,1),J.m(lt.parentNode,lt)):J&&(ne(),h(J,1,1,()=>{J=null}),re());const jt={};i[0]&2048&&(jt.data=e[11]),i[0]&1&&(jt.title=(e[0][0]?e[0][0].area_name:"This Prognoseraum")+" and its Bezirksregionen"),Oa.$set(jt),e[12]?Y?(Y.p(e,i),i[0]&4096&&m(Y,1)):(Y=Cr(e),Y.c(),m(Y,1),Y.m(_t.parentNode,_t)):Y&&(ne(),h(Y,1,1,()=>{Y=null}),re());const Mt={};i[0]&4096&&(Mt.data=e[12]),i[3]&4&&(Mt.$$scope={dirty:i,ctx:e}),Ua.$set(Mt)},i(e){Et||(m(F),m(N),m(u.$$.fragment,e),m(x.$$.fragment,e),m(M.$$.fragment,e),m(je.$$.fragment,e),m(I),m(O),m(de),m(ce.$$.fragment,e),m(qe.$$.fragment,e),m(U),m(Ie.$$.fragment,e),m(Ue.$$.fragment,e),m(K),m(X),m(me),m(ee),m(fe.$$.fragment,e),m(We.$$.fragment,e),m(Qe.$$.fragment,e),m(W),m(we.$$.fragment,e),m(Q),m(Ze.$$.fragment,e),m(G),m(Re.$$.fragment,e),m(Ye.$$.fragment,e),m(pe.$$.fragment,e),m(ae),m(Z),m(V),m(aa.$$.fragment,e),m(Ia.$$.fragment,e),m(J),m(Oa.$$.fragment,e),m(Y),m(Ua.$$.fragment,e),m(et.$$.fragment,e),Et=!0)},o(e){h(F),h(N),h(u.$$.fragment,e),h(x.$$.fragment,e),h(M.$$.fragment,e),h(je.$$.fragment,e),h(I),h(O),h(de),h(ce.$$.fragment,e),h(qe.$$.fragment,e),h(U),h(Ie.$$.fragment,e),h(Ue.$$.fragment,e),h(K),h(X),h(me),h(ee),h(fe.$$.fragment,e),h(We.$$.fragment,e),h(Qe.$$.fragment,e),h(W),h(we.$$.fragment,e),h(Q),h(Ze.$$.fragment,e),h(G),h(Re.$$.fragment,e),h(Ye.$$.fragment,e),h(pe.$$.fragment,e),h(ae),h(Z),h(V),h(aa.$$.fragment,e),h(Ia.$$.fragment,e),h(J),h(Oa.$$.fragment,e),h(Y),h(Ua.$$.fragment,e),h(et.$$.fragment,e),Et=!1},d(e){e&&(l(t),l(o),l(c),l(_),l(b),l(f),l(g),l($),l(Ea),l(Me),l(ie),l(xe),l(He),l(Ae),l(he),l(De),l(ca),l(Fe),l(ra),l(Te),l(Ne),l(oe),l(Ta),l(ma),l(Oe),l(le),l(Sa),l(Pa),l(be),l(ye),l(ua),l(ve),l(ue),l(La),l(Be),l(Ke),l(fa),l(ja),l(Ge),l($e),l(Ma),l(ga),l(Ve),l(ge),l(Aa),l(Se),l(Je),l(ke),l(Da),l(Fa),l(Xe),l(ea),l(Pe),l(Na),l(B),l(na),l(ya),l(it),l(ot),l(ft),l(Ya),l(gt),l(Xa),l(pt),l(va),l(ht),l(lt),l(bt),l($a),l(yt),l(_t),l(vt),l(wa),l($t),l(Ka),l(wt),l(ka),l(kt),l(Wa),l(Rt),l(dt),l(zt)),Ra&&Ra.d(e),ct.d(e),l(r),l(a),za&&za.d(e),l(n),F&&F.d(e),N&&N.d(e),w(u,e),w(x,e),w(M,e),sa.d(),w(je,e),I&&I.d(e),O&&O.d(e),Qa[_e].d(e),w(ce,e),w(qe,e),U&&U.d(e),w(Ie,e),w(Ue,e),K&&K.d(e),X&&X.d(e),Ga[te].d(e),ee&&ee.d(e),w(fe,e),w(We,e),w(Qe,e),W&&W.d(e),w(we,e),Q&&Q.d(e),w(Ze,e),G&&G.d(e),w(Re,e),w(Ye,e),w(pe,e),ae&&ae.d(e),Z&&Z.d(e),V&&V.d(e),ia.d(),w(aa,e),w(Ia,e),oa.d(),J&&J.d(e),w(Oa,e),Y&&Y.d(e),w(Ua,e),w(et,e)}}}const L={},Lr=s=>s.oa_domain_min_base_flag;function Dn(s,t,r){let a,n,o,c,_,u,b;fr(s,rn,B=>r(74,u=B)),fr(s,pr,B=>r(78,b=B));let{data:x}=t,{data:f={},customFormattingSettings:M,__db:g,inputs:$}=x;Ar(pr,b="f470234fb75d0fe1491483e9932ff021",b);let da=Xr(Yr($));Dr(da.subscribe(B=>r(18,$=B))),Fr(tn,{getCustomFormats:()=>M.customFormats||[]});const S=(B,na)=>nn(g.query,B,{query_name:na});en(S);let p=u.params;Nr(()=>!0);let ze={initialData:void 0,initialError:void 0},ta=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
limit 1`,Ee=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
limit 1`;f.pgr_name_data&&(f.pgr_name_data instanceof Error?ze.initialError=f.pgr_name_data:ze.initialData=f.pgr_name_data,f.pgr_name_columns&&(ze.knownColumns=f.pgr_name_columns));let ba,Ea=!1;const je=Ce.createReactive({callback:B=>{r(0,ba=B)},execFn:S},{id:"pgr_name",...ze});je(Ee,{noResolve:ta,...ze}),globalThis[Symbol.for("pgr_name")]={get value(){return ba}};let Me={initialData:void 0,initialError:void 0},ie=H`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${p.code}', 1, 2)`,xa=`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${p.code}', 1, 2)`;f.bezirk_name_data&&(f.bezirk_name_data instanceof Error?Me.initialError=f.bezirk_name_data:Me.initialData=f.bezirk_name_data,f.bezirk_name_columns&&(Me.knownColumns=f.bezirk_name_columns));let xe,He=!1;const at=Ce.createReactive({callback:B=>{r(1,xe=B)},execFn:S},{id:"bezirk_name",...Me});at(xa,{noResolve:ie,...Me}),globalThis[Symbol.for("bezirk_name")]={get value(){return xe}};let Ae={initialData:void 0,initialError:void 0},he=H`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${p.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`,De=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${p.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`;f.stage_mix_data&&(f.stage_mix_data instanceof Error?Ae.initialError=f.stage_mix_data:Ae.initialData=f.stage_mix_data,f.stage_mix_columns&&(Ae.knownColumns=f.stage_mix_columns));let _e,de=!1;const ca=Ce.createReactive({callback:B=>{r(3,_e=B)},execFn:S},{id:"stage_mix",...Ae});ca(De,{noResolve:he,...Ae}),globalThis[Symbol.for("stage_mix")]={get value(){return _e}};let ce={initialData:void 0,initialError:void 0},Fe=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${p.code}'
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
from totals as t cross join top cross join advanced as a`,qe=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${p.code}'
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
from totals as t cross join top cross join advanced as a`;f.stage_mix_summary_data&&(f.stage_mix_summary_data instanceof Error?ce.initialError=f.stage_mix_summary_data:ce.initialData=f.stage_mix_summary_data,f.stage_mix_summary_columns&&(ce.knownColumns=f.stage_mix_summary_columns));let ra,Te=!1;const tt=Ce.createReactive({callback:B=>{r(2,ra=B)},execFn:S},{id:"stage_mix_summary",...ce});tt(qe,{noResolve:Fe,...ce}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return ra}};let Ne={initialData:void 0,initialError:void 0},oe=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`,qa=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;f.poi_mix_data&&(f.poi_mix_data instanceof Error?Ne.initialError=f.poi_mix_data:Ne.initialData=f.poi_mix_data,f.poi_mix_columns&&(Ne.knownColumns=f.poi_mix_columns));let Ta,ma=!1;const Ie=Ce.createReactive({callback:B=>{r(4,Ta=B)},execFn:S},{id:"poi_mix",...Ne});Ie(qa,{noResolve:oe,...Ne}),globalThis[Symbol.for("poi_mix")]={get value(){return Ta}};let Oe={initialData:void 0,initialError:void 0},le=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${p.code}'
  )
order by oa_domain desc`,Ba=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${p.code}'
  )
order by oa_domain desc`;f.oa_arealevel_data&&(f.oa_arealevel_data instanceof Error?Oe.initialError=f.oa_arealevel_data:Oe.initialData=f.oa_arealevel_data,f.oa_arealevel_columns&&(Oe.knownColumns=f.oa_arealevel_columns));let Sa,Ue=!1;const Pa=Ce.createReactive({callback:B=>{r(5,Sa=B)},execFn:S},{id:"oa_arealevel",...Oe});Pa(Ba,{noResolve:le,...Oe}),globalThis[Symbol.for("oa_arealevel")]={get value(){return Sa}};let be={initialData:void 0,initialError:void 0},ye=H`select
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
  and dominance_group = '${$.dom_group.value}'
  and snapshot_year = ${$.dom_year.value}
  and substr(area_code, 1, 4) = '${p.code}'`,te=`select
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
  and dominance_group = '${$.dom_group.value}'
  and snapshot_year = ${$.dom_year.value}
  and substr(area_code, 1, 4) = '${p.code}'`;f.dom_suppressed_count_data&&(f.dom_suppressed_count_data instanceof Error?be.initialError=f.dom_suppressed_count_data:be.initialData=f.dom_suppressed_count_data,f.dom_suppressed_count_columns&&(be.knownColumns=f.dom_suppressed_count_columns));let me,ua=!1;const Ja=Ce.createReactive({callback:B=>{r(6,me=B)},execFn:S},{id:"dom_suppressed_count",...be});Ja(te,{noResolve:ye,...be}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return me}};let ve={initialData:void 0,initialError:void 0},ue=H`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${p.code}'
order by d.hhi desc
limit 15`,Ca=`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${p.code}'
order by d.hhi desc
limit 15`;f.dominance_children_data&&(f.dominance_children_data instanceof Error?ve.initialError=f.dominance_children_data:ve.initialData=f.dominance_children_data,f.dominance_children_columns&&(ve.knownColumns=f.dominance_children_columns));let La,Be=!1;const rt=Ce.createReactive({callback:B=>{r(7,La=B)},execFn:S},{id:"dominance_children",...ve});rt(Ca,{noResolve:ue,...ve}),globalThis[Symbol.for("dominance_children")]={get value(){return La}};let Ke={initialData:void 0,initialError:void 0},fe=H`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by reference_year desc
limit 1`,fa=`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by reference_year desc
limit 1`;f.demographics_data&&(f.demographics_data instanceof Error?Ke.initialError=f.demographics_data:Ke.initialData=f.demographics_data,f.demographics_columns&&(Ke.knownColumns=f.demographics_columns));let We,ja=!1;const Qe=Ce.createReactive({callback:B=>{r(8,We=B)},execFn:S},{id:"demographics",...Ke});Qe(fa,{noResolve:fe,...Ke}),globalThis[Symbol.for("demographics")]={get value(){return We}};let Ge={initialData:void 0,initialError:void 0},$e=H`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by snapshot_year desc
limit 1`,we=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by snapshot_year desc
limit 1`;f.amenities_current_data&&(f.amenities_current_data instanceof Error?Ge.initialError=f.amenities_current_data:Ge.initialData=f.amenities_current_data,f.amenities_current_columns&&(Ge.knownColumns=f.amenities_current_columns));let Ma,ga=!1;const Ze=Ce.createReactive({callback:B=>{r(9,Ma=B)},execFn:S},{id:"amenities_current",...Ge});Ze(we,{noResolve:$e,...Ge}),globalThis[Symbol.for("amenities_current")]={get value(){return Ma}};let Ve={initialData:void 0,initialError:void 0},ge=H`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${p.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(cast(a.n_schools as bigint) as varchar) as area_value, cast(cast(d.n_schools as bigint) as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(cast(a.n_kindergartens as bigint) as varchar), cast(cast(d.n_kindergartens as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(cast(a.n_doctors as bigint) as varchar), cast(cast(d.n_doctors as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(cast(a.n_dentists as bigint) as varchar), cast(cast(d.n_dentists as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(cast(a.n_pharmacies as bigint) as varchar), cast(cast(d.n_pharmacies as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(cast(a.n_supermarkets as bigint) as varchar), cast(cast(d.n_supermarkets as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(cast(a.n_playgrounds as bigint) as varchar), cast(cast(d.n_playgrounds as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(cast(a.n_transit_stops as bigint) as varchar), cast(cast(d.n_transit_stops as bigint) as varchar)
from area_row as a cross join district_row as d
order by sort_order`,Ha=`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${p.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(cast(a.n_schools as bigint) as varchar) as area_value, cast(cast(d.n_schools as bigint) as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(cast(a.n_kindergartens as bigint) as varchar), cast(cast(d.n_kindergartens as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(cast(a.n_doctors as bigint) as varchar), cast(cast(d.n_doctors as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(cast(a.n_dentists as bigint) as varchar), cast(cast(d.n_dentists as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(cast(a.n_pharmacies as bigint) as varchar), cast(cast(d.n_pharmacies as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(cast(a.n_supermarkets as bigint) as varchar), cast(cast(d.n_supermarkets as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(cast(a.n_playgrounds as bigint) as varchar), cast(cast(d.n_playgrounds as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(cast(a.n_transit_stops as bigint) as varchar), cast(cast(d.n_transit_stops as bigint) as varchar)
from area_row as a cross join district_row as d
order by sort_order`;f.amenities_table_data&&(f.amenities_table_data instanceof Error?Ve.initialError=f.amenities_table_data:Ve.initialData=f.amenities_table_data,f.amenities_table_columns&&(Ve.knownColumns=f.amenities_table_columns));let Aa,Se=!1;const nt=Ce.createReactive({callback:B=>{r(10,Aa=B)},execFn:S},{id:"amenities_table",...Ve});nt(Ha,{noResolve:ge,...Ve}),globalThis[Symbol.for("amenities_table")]={get value(){return Aa}};let Je={initialData:void 0,initialError:void 0},ke=H`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${p.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${p.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${p.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ut}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${p.code}'
order by sort_order, area_name`,Re=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${p.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${p.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${p.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ut}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${p.code}'
order by sort_order, area_name`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?Je.initialError=f.minimap_areas_data:Je.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(Je.knownColumns=f.minimap_areas_columns));let Da,Ye=!1;const Fa=Ce.createReactive({callback:B=>{r(11,Da=B)},execFn:S},{id:"minimap_areas",...Je});Fa(Re,{noResolve:ke,...Je}),globalThis[Symbol.for("minimap_areas")]={get value(){return Da}};let pe={initialData:void 0,initialError:void 0},Xe=H`select
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
  and substr(d.area_code, 1, 4) = '${p.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`,ea=`select
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
  and substr(d.area_code, 1, 4) = '${p.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`;f.children_data&&(f.children_data instanceof Error?pe.initialError=f.children_data:pe.initialData=f.children_data,f.children_columns&&(pe.knownColumns=f.children_columns));let Pe,st=!1;const Na=Ce.createReactive({callback:B=>{r(12,Pe=B)},execFn:S},{id:"children",...pe});return Na(ea,{noResolve:Xe,...pe}),globalThis[Symbol.for("children")]={get value(){return Pe}},s.$$set=B=>{"data"in B&&r(16,x=B.data)},s.$$.update=()=>{var B,na;s.$$.dirty[0]&65536&&r(17,{data:f={},customFormattingSettings:M,__db:g}=x,f),s.$$.dirty[0]&131072&&an.set(Object.keys(f).length>0),s.$$.dirty[2]&4096&&r(19,p=u.params),s.$$.dirty[0]&524288&&r(21,ta=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
limit 1`),s.$$.dirty[0]&524288&&r(22,Ee=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
limit 1`),s.$$.dirty[0]&15728640&&(ta||!Ea?ta||(je(Ee,{noResolve:ta,...ze}),r(23,Ea=!0)):je(Ee,{noResolve:ta})),s.$$.dirty[0]&524288&&r(25,ie=H`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${p.code}', 1, 2)`),s.$$.dirty[0]&524288&&r(26,xa=`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${p.code}', 1, 2)`),s.$$.dirty[0]&251658240&&(ie||!He?ie||(at(xa,{noResolve:ie,...Me}),r(27,He=!0)):at(xa,{noResolve:ie})),s.$$.dirty[0]&524288&&r(29,he=H`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${p.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),s.$$.dirty[0]&524288&&r(30,De=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${p.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),s.$$.dirty[0]&1879048192|s.$$.dirty[1]&1&&(he||!de?he||(ca(De,{noResolve:he,...Ae}),r(31,de=!0)):ca(De,{noResolve:he})),s.$$.dirty[0]&524288&&r(33,Fe=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${p.code}'
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
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&524288&&r(34,qe=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${p.code}'
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
from totals as t cross join top cross join advanced as a`),s.$$.dirty[1]&30&&(Fe||!Te?Fe||(tt(qe,{noResolve:Fe,...ce}),r(35,Te=!0)):tt(qe,{noResolve:Fe})),s.$$.dirty[0]&524288&&r(37,oe=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),s.$$.dirty[0]&524288&&r(38,qa=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),s.$$.dirty[1]&480&&(oe||!ma?oe||(Ie(qa,{noResolve:oe,...Ne}),r(39,ma=!0)):Ie(qa,{noResolve:oe})),s.$$.dirty[0]&524288&&r(41,le=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${p.code}'
  )
order by oa_domain desc`),s.$$.dirty[0]&524288&&r(42,Ba=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${p.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${p.code}'
  )
order by oa_domain desc`),s.$$.dirty[1]&7680&&(le||!Ue?le||(Pa(Ba,{noResolve:le,...Oe}),r(43,Ue=!0)):Pa(Ba,{noResolve:le})),s.$$.dirty[0]&786432&&r(45,ye=H`select
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
  and dominance_group = '${$.dom_group.value}'
  and snapshot_year = ${$.dom_year.value}
  and substr(area_code, 1, 4) = '${p.code}'`),s.$$.dirty[0]&786432&&r(46,te=`select
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
  and dominance_group = '${$.dom_group.value}'
  and snapshot_year = ${$.dom_year.value}
  and substr(area_code, 1, 4) = '${p.code}'`),s.$$.dirty[1]&122880&&(ye||!ua?ye||(Ja(te,{noResolve:ye,...be}),r(47,ua=!0)):Ja(te,{noResolve:ye})),s.$$.dirty[0]&786432&&r(49,ue=H`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${p.code}'
order by d.hhi desc
limit 15`),s.$$.dirty[0]&786432&&r(50,Ca=`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 4) = '${p.code}'
order by d.hhi desc
limit 15`),s.$$.dirty[1]&1966080&&(ue||!Be?ue||(rt(Ca,{noResolve:ue,...ve}),r(51,Be=!0)):rt(Ca,{noResolve:ue})),s.$$.dirty[0]&524288&&r(53,fe=H`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by reference_year desc
limit 1`),s.$$.dirty[0]&524288&&r(54,fa=`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by reference_year desc
limit 1`),s.$$.dirty[1]&31457280&&(fe||!ja?fe||(Qe(fa,{noResolve:fe,...Ke}),r(55,ja=!0)):Qe(fa,{noResolve:fe})),s.$$.dirty[0]&524288&&r(57,$e=H`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&524288&&r(58,we=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[1]&503316480&&($e||!ga?$e||(Ze(we,{noResolve:$e,...Ge}),r(59,ga=!0)):Ze(we,{noResolve:$e})),s.$$.dirty[0]&524288&&r(61,ge=H`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${p.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(cast(a.n_schools as bigint) as varchar) as area_value, cast(cast(d.n_schools as bigint) as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(cast(a.n_kindergartens as bigint) as varchar), cast(cast(d.n_kindergartens as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(cast(a.n_doctors as bigint) as varchar), cast(cast(d.n_doctors as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(cast(a.n_dentists as bigint) as varchar), cast(cast(d.n_dentists as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(cast(a.n_pharmacies as bigint) as varchar), cast(cast(d.n_pharmacies as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(cast(a.n_supermarkets as bigint) as varchar), cast(cast(d.n_supermarkets as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(cast(a.n_playgrounds as bigint) as varchar), cast(cast(d.n_playgrounds as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(cast(a.n_transit_stops as bigint) as varchar), cast(cast(d.n_transit_stops as bigint) as varchar)
from area_row as a cross join district_row as d
order by sort_order`),s.$$.dirty[0]&524288&&r(62,Ha=`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${p.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${p.code}', 1, 2)
            and snapshot_year = (select snapshot_year from latest)
    )
select 1 as sort_order, 'Schools' as indicator, cast(cast(a.n_schools as bigint) as varchar) as area_value, cast(cast(d.n_schools as bigint) as varchar) as district_value
from area_row as a cross join district_row as d
union all
select 2, 'Kindergartens', cast(cast(a.n_kindergartens as bigint) as varchar), cast(cast(d.n_kindergartens as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 3, 'Doctors', cast(cast(a.n_doctors as bigint) as varchar), cast(cast(d.n_doctors as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 4, 'Dentists', cast(cast(a.n_dentists as bigint) as varchar), cast(cast(d.n_dentists as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 5, 'Pharmacies', cast(cast(a.n_pharmacies as bigint) as varchar), cast(cast(d.n_pharmacies as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 6, 'Supermarkets', cast(cast(a.n_supermarkets as bigint) as varchar), cast(cast(d.n_supermarkets as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 7, 'Playgrounds', cast(cast(a.n_playgrounds as bigint) as varchar), cast(cast(d.n_playgrounds as bigint) as varchar)
from area_row as a cross join district_row as d
union all
select 8, 'Transit stops', cast(cast(a.n_transit_stops as bigint) as varchar), cast(cast(d.n_transit_stops as bigint) as varchar)
from area_row as a cross join district_row as d
order by sort_order`),s.$$.dirty[1]&1610612736|s.$$.dirty[2]&3&&(ge||!Se?ge||(nt(Ha,{noResolve:ge,...Ve}),r(63,Se=!0)):nt(Ha,{noResolve:ge})),s.$$.dirty[0]&524288&&r(65,ke=H`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${p.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${p.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${p.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ut}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${p.code}'
order by sort_order, area_name`),s.$$.dirty[0]&524288&&r(66,Re=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${p.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${p.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${p.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ut}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${p.code}'
order by sort_order, area_name`),s.$$.dirty[2]&60&&(ke||!Ye?ke||(Fa(Re,{noResolve:ke,...Je}),r(67,Ye=!0)):Fa(Re,{noResolve:ke})),s.$$.dirty[0]&524288&&r(69,Xe=H`select
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
  and substr(d.area_code, 1, 4) = '${p.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`),s.$$.dirty[0]&524288&&r(70,ea=`select
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
  and substr(d.area_code, 1, 4) = '${p.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`),s.$$.dirty[2]&960&&(Xe||!st?Xe||(Na(ea,{noResolve:Xe,...pe}),r(71,st=!0)):Na(ea,{noResolve:Xe})),s.$$.dirty[0]&1&&r(73,a=((B=ba==null?void 0:ba[0])==null?void 0:B.area_name)??null),s.$$.dirty[0]&2|s.$$.dirty[2]&2048&&r(15,n=[{label:"Berlin",href:"/berlin"},{label:"District & area profiles",href:"/berlin/area/bezirk"},...(na=xe==null?void 0:xe[0])!=null&&na.bezirk_code?[{label:xe[0].bezirk_name,href:"/berlin/area/bezirk/"+xe[0].bezirk_code}]:[],{label:a??"Prognoseraum"}]),s.$$.dirty[2]&2048&&r(14,o=a?`${a} — Prognoseraum profile · Berlin`:null),s.$$.dirty[0]&4&&r(72,c=ra==null?void 0:ra[0]),s.$$.dirty[2]&1024&&r(13,_=!c||c.n_total==null||Number(c.n_total)===0?null:(()=>{const ya=Number(c.n_total),it=Number(c.n_advanced||0),aa=c.top_stage_share!=null?Number(c.top_stage_share):null,ot=aa!=null&&aa>.5?`<b>${c.top_stage}</b> is the only stage holding a majority (${Math.round(aa*100)}%)`:"no single stage holds a majority";return`<b>${it}</b> of <b>${ya}</b> neighbourhoods (Planungsräume) here are classified <b>4 · Active gentrification</b> or <b>3 · Pioneer signal</b>; ${ot} — a distribution across this Prognoseraum's own neighbourhoods, never a single re-scored gentrification-index value for the Prognoseraum itself.`})())},[ba,xe,ra,_e,Ta,Sa,me,La,We,Ma,Aa,Da,Pe,_,o,n,x,f,$,p,ze,ta,Ee,Ea,Me,ie,xa,He,Ae,he,De,de,ce,Fe,qe,Te,Ne,oe,qa,ma,Oe,le,Ba,Ue,be,ye,te,ua,ve,ue,Ca,Be,Ke,fe,fa,ja,Ge,$e,we,ga,Ve,ge,Ha,Se,Je,ke,Re,Ye,pe,Xe,ea,st,c,a,u]}class ss extends Ur{constructor(t){super(),Kr(this,t,Dn,An,Mr,{data:16},null,[-1,-1,-1,-1])}}export{ss as component};
