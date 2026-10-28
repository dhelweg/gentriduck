import{s as Lr,d as l,i as d,a as ie,b as E,c as y,h as jr,e as q,f as qt,g as na,j as P,k as j,l as v,m as T,t as C,n as mr,o as Mr,p as Hr,q as Dr,r as Fr,u as F,v as Ar,H as Ir,w as Ja}from"../chunks/scheduler.CmMeO4ay.js";import{S as Nr,i as Or,d as w,t as h,a as m,c as ne,m as k,b as R,e as z,g as se}from"../chunks/index.bfDa0Uqw.js";import{A as Ur,P as Kr,a as Qr}from"../chunks/PageTitle.nASIZfTP.js";import{F as Wr}from"../chunks/FooterNav.BbND9dxm.js";import{H as Gr}from"../chunks/Hero.wYia6TQ0.js";import{D as jt,C as ra}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as mt,w as Zr}from"../chunks/entry.vKQYRLhF.js";import{A as $a}from"../chunks/Alert.BNZjDqvU.js";import{e as Vr,s as Jr,Q as xe,p as Yr,a as ur,r as fr,C as Xr}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as H}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as pr,a as va}from"../chunks/Dropdown.zhownQxu.js";import{p as en}from"../chunks/stores.CGa44sBH.js";import{Q as qe}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as Ht}from"../chunks/BarChart.BZFK7Gke.js";import{B as Mt}from"../chunks/BigValue.Cf_smc5N.js";import{p as an}from"../chunks/profile.BW8tN6E9.js";function tn(s){var n;let t,r=(L.title??((n=L.og)==null?void 0:n.title))+"",a;return{c(){t=T("h1"),a=C(r),this.h()},l(o){t=q(o,"H1",{class:!0});var c=na(t);a=P(c,r),c.forEach(l),this.h()},h(){E(t,"class","title")},m(o,c){d(o,t,c),ie(t,a)},p:F,d(o){o&&l(t)}}}function rn(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:F,p:F,d:F}}function nn(s){var c;let t,r,a,n,o;return document.title=t=L.title??((c=L.og)==null?void 0:c.title),{c(){r=v(),a=T("meta"),n=v(),o=T("meta"),this.h()},l(_){r=y(_),a=q(_,"META",{property:!0,content:!0}),n=y(_),o=q(_,"META",{name:!0,content:!0}),this.h()},h(){var _,u;E(a,"property","og:title"),E(a,"content",((_=L.og)==null?void 0:_.title)??L.title),E(o,"name","twitter:title"),E(o,"content",((u=L.og)==null?void 0:u.title)??L.title)},m(_,u){d(_,r,u),d(_,a,u),d(_,n,u),d(_,o,u)},p(_,u){var b;u&0&&t!==(t=L.title??((b=L.og)==null?void 0:b.title))&&(document.title=t)},d(_){_&&(l(r),l(a),l(n),l(o))}}}function sn(s){var o,c;let t,r,a=(L.description||((o=L.og)==null?void 0:o.description))&&on(),n=((c=L.og)==null?void 0:c.image)&&ln();return{c(){a&&a.c(),t=v(),n&&n.c(),r=qt()},l(_){a&&a.l(_),t=y(_),n&&n.l(_),r=qt()},m(_,u){a&&a.m(_,u),d(_,t,u),n&&n.m(_,u),d(_,r,u)},p(_,u){var b,x;(L.description||(b=L.og)!=null&&b.description)&&a.p(_,u),(x=L.og)!=null&&x.image&&n.p(_,u)},d(_){_&&(l(t),l(r)),a&&a.d(_),n&&n.d(_)}}}function on(s){let t,r,a,n,o;return{c(){t=T("meta"),r=v(),a=T("meta"),n=v(),o=T("meta"),this.h()},l(c){t=q(c,"META",{name:!0,content:!0}),r=y(c),a=q(c,"META",{property:!0,content:!0}),n=y(c),o=q(c,"META",{name:!0,content:!0}),this.h()},h(){var c,_,u;E(t,"name","description"),E(t,"content",L.description??((c=L.og)==null?void 0:c.description)),E(a,"property","og:description"),E(a,"content",((_=L.og)==null?void 0:_.description)??L.description),E(o,"name","twitter:description"),E(o,"content",((u=L.og)==null?void 0:u.description)??L.description)},m(c,_){d(c,t,_),d(c,r,_),d(c,a,_),d(c,n,_),d(c,o,_)},p:F,d(c){c&&(l(t),l(r),l(a),l(n),l(o))}}}function ln(s){let t,r,a;return{c(){t=T("meta"),r=v(),a=T("meta"),this.h()},l(n){t=q(n,"META",{property:!0,content:!0}),r=y(n),a=q(n,"META",{name:!0,content:!0}),this.h()},h(){var n,o;E(t,"property","og:image"),E(t,"content",ur((n=L.og)==null?void 0:n.image)),E(a,"name","twitter:image"),E(a,"content",ur((o=L.og)==null?void 0:o.image))},m(n,o){d(n,t,o),d(n,r,o),d(n,a,o)},p:F,d(n){n&&(l(t),l(r),l(a))}}}function gr(s){let t,r;return t=new qe({props:{queryID:"pgr_name",queryResult:s[0]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function hr(s){let t,r;return t=new qe({props:{queryID:"bezirk_name",queryResult:s[1]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function _n(s){let t,r="District profile";return{c(){t=T("a"),t.textContent=r,this.h()},l(a){t=q(a,"A",{href:!0,"data-svelte-h":!0}),j(t)!=="svelte-1trtuzf"&&(t.textContent=r),this.h()},h(){E(t,"href","/gentriduck/berlin/area/bezirk")},m(a,n){d(a,t,n)},p:F,d(a){a&&l(t)}}}function dn(s){let t,r=s[1][0].bezirk_name+"",a,n;return{c(){t=T("a"),a=C(r),this.h()},l(o){t=q(o,"A",{href:!0});var c=na(t);a=P(c,r),c.forEach(l),this.h()},h(){E(t,"href",n="/gentriduck/berlin/area/bezirk/"+s[1][0].bezirk_code)},m(o,c){d(o,t,c),ie(t,a)},p(o,c){c[0]&2&&r!==(r=o[1][0].bezirk_name+"")&&Ja(a,r),c[0]&2&&n!==(n="/gentriduck/berlin/area/bezirk/"+o[1][0].bezirk_code)&&E(t,"href",n)},d(o){o&&l(t)}}}function cn(s){let t,r,a="sums and population-weighted averages",n,o,c="methodology page",_;return{c(){t=C("Figures on this page are "),r=T("b"),r.textContent=a,n=C(` of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  `),o=T("a"),o.textContent=c,_=C(" for why coarse-grain areas are not re-scored."),this.h()},l(u){t=P(u,"Figures on this page are "),r=q(u,"B",{"data-svelte-h":!0}),j(r)!=="svelte-rhlwxq"&&(r.textContent=a),n=P(u,` of this Prognoseraum's
  neighbourhoods — never a separately re-scored index. See the
  `),o=q(u,"A",{href:!0,"data-svelte-h":!0}),j(o)!=="svelte-1l2pw3"&&(o.textContent=c),_=P(u," for why coarse-grain areas are not re-scored."),this.h()},h(){E(o,"href","/gentriduck/methodology")},m(u,b){d(u,t,b),d(u,r,b),d(u,n,b),d(u,o,b),d(u,_,b)},p:F,d(u){u&&(l(t),l(r),l(n),l(o),l(_))}}}function br(s){let t,r;return t=new qe({props:{queryID:"stage_mix",queryResult:s[3]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function yr(s){let t,r;return t=new qe({props:{queryID:"stage_mix_summary",queryResult:s[2]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function mn(s){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[fn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[3]&4&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function un(s){let t,r;return{c(){t=T("p"),r=new Ir(!1),this.h()},l(a){t=q(a,"P",{});var n=na(t);r=Ar(n,!1),n.forEach(l),this.h()},h(){r.a=null},m(a,n){d(a,t,n),r.m(s[13],t)},p(a,n){n[0]&8192&&r.p(a[13])},i:F,o:F,d(a){a&&l(t)}}}function fn(s){let t;return{c(){t=C("No neighbourhood-stage data available for this area.")},l(r){t=P(r,"No neighbourhood-stage data available for this area.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function vr(s){let t,r;return t=new qe({props:{queryID:"poi_mix",queryResult:s[4]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function pn(s){let t,r="Context only — never a Kiez-level claim.",a,n,o="Offering Advantage decoder",c;return{c(){t=T("b"),t.textContent=r,a=C(` A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  `),n=T("a"),n.textContent=o,c=C(` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),j(t)!=="svelte-a7l1s8"&&(t.textContent=r),a=P(_,` A Prognoseraum pools several very different
  neighbourhoods into one number; that this area reads as "up-market" or "under-represented" in a
  domain says nothing about any one Kiez inside it. The Bezirksregionen listed further down this
  page sit closer to the neighbourhood grain — the
  `),n=q(_,"A",{href:!0,"data-svelte-h":!0}),j(n)!=="svelte-168mye8"&&(n.textContent=o),c=P(_,` recommends Bezirksregion (BZR) as
  this project's public headline scale for anything coarser than a single neighbourhood.`),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(_,u){d(_,t,u),d(_,a,u),d(_,n,u),d(_,c,u)},p:F,d(_){_&&(l(t),l(a),l(n),l(c))}}}function $r(s){let t,r;return t=new qe({props:{queryID:"oa_arealevel",queryResult:s[5]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function wr(s){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[gn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function gn(s){let t,r="MAUP fragility disclosure (always shown at this grain).",a,n,o="Offering Advantage decoder",c;return{c(){t=T("b"),t.textContent=r,a=C(` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=T("a"),n.textContent=o,c=C(" §4/§7 for the full finding."),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),j(t)!=="svelte-1impqbu"&&(t.textContent=r),a=P(_,` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Prognoseraum's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=q(_,"A",{href:!0,"data-svelte-h":!0}),j(n)!=="svelte-168mye8"&&(n.textContent=o),c=P(_," §4/§7 for the full finding."),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(_,u){d(_,t,u),d(_,a,u),d(_,n,u),d(_,c,u)},p:F,d(_){_&&(l(t),l(a),l(n),l(c))}}}function hn(s){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[yn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[3]&4&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function bn(s){let t,r;return t=new Ht({props:{data:s[5],x:"poi_domain_h",y:"pct_vs_baseline",title:"Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this Prognoseraum."}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.data=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function yn(s){let t;return{c(){t=C("No Offering Advantage data for this Prognoseraum.")},l(r){t=P(r,"No Offering Advantage data for this Prognoseraum.")},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function kr(s){let t,r;return t=new $a({props:{status:"info",$$slots:{default:[vn]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function vn(s){let t;return{c(){t=C(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=P(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at PGR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function $n(s){let t,r="Dominance is sign-blind",a,n,o="Offering Advantage decoder",c;return{c(){t=T("b"),t.textContent=r,a=C(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=T("a"),n.textContent=o,c=C(" §5 for the full ethics note."),this.h()},l(_){t=q(_,"B",{"data-svelte-h":!0}),j(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=P(_,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=q(_,"A",{href:!0,"data-svelte-h":!0}),j(n)!=="svelte-168mye8"&&(n.textContent=o),c=P(_," §5 for the full ethics note."),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(_,u){d(_,t,u),d(_,a,u),d(_,n,u),d(_,c,u)},p:F,d(_){_&&(l(t),l(a),l(n),l(c))}}}function wn(s){let t,r,a,n,o,c,_,u;return t=new va({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new va({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new va({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),_=new va({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment),c=v(),z(_.$$.fragment)},l(b){R(t.$$.fragment,b),r=y(b),R(a.$$.fragment,b),n=y(b),R(o.$$.fragment,b),c=y(b),R(_.$$.fragment,b)},m(b,x){k(t,b,x),d(b,r,x),k(a,b,x),d(b,n,x),k(o,b,x),d(b,c,x),k(_,b,x),u=!0},p:F,i(b){u||(m(t.$$.fragment,b),m(a.$$.fragment,b),m(o.$$.fragment,b),m(_.$$.fragment,b),u=!0)},o(b){h(t.$$.fragment,b),h(a.$$.fragment,b),h(o.$$.fragment,b),h(_.$$.fragment,b),u=!1},d(b){b&&(l(r),l(n),l(c)),w(t,b),w(a,b),w(o,b),w(_,b)}}}function kn(s){let t,r,a,n,o,c,_,u,b,x,f,M;return t=new va({props:{value:"2025",valueLabel:"2025"}}),a=new va({props:{value:"2024",valueLabel:"2024"}}),o=new va({props:{value:"2023",valueLabel:"2023"}}),_=new va({props:{value:"2022",valueLabel:"2022"}}),b=new va({props:{value:"2021",valueLabel:"2021"}}),f=new va({props:{value:"2020",valueLabel:"2020"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment),c=v(),z(_.$$.fragment),u=v(),z(b.$$.fragment),x=v(),z(f.$$.fragment)},l(p){R(t.$$.fragment,p),r=y(p),R(a.$$.fragment,p),n=y(p),R(o.$$.fragment,p),c=y(p),R(_.$$.fragment,p),u=y(p),R(b.$$.fragment,p),x=y(p),R(f.$$.fragment,p)},m(p,$){k(t,p,$),d(p,r,$),k(a,p,$),d(p,n,$),k(o,p,$),d(p,c,$),k(_,p,$),d(p,u,$),k(b,p,$),d(p,x,$),k(f,p,$),M=!0},p:F,i(p){M||(m(t.$$.fragment,p),m(a.$$.fragment,p),m(o.$$.fragment,p),m(_.$$.fragment,p),m(b.$$.fragment,p),m(f.$$.fragment,p),M=!0)},o(p){h(t.$$.fragment,p),h(a.$$.fragment,p),h(o.$$.fragment,p),h(_.$$.fragment,p),h(b.$$.fragment,p),h(f.$$.fragment,p),M=!1},d(p){p&&(l(r),l(n),l(c),l(u),l(x)),w(t,p),w(a,p),w(o,p),w(_,p),w(b,p),w(f,p)}}}function Rr(s){let t,r;return t=new qe({props:{queryID:"dom_suppressed_count",queryResult:s[6]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Rn(s){let t,r=(s[6][0]?s[6][0].n_suppressed:0)+"",a,n,o=(s[6][0]?s[6][0].n_suppressed+s[6][0].n_shown:0)+"",c,_,u;return{c(){t=T("b"),a=C(r),n=C(" of "),c=C(o),_=C(" neighbourhoods here are suppressed below as too thinly observed to characterize"),u=C(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(b){t=q(b,"B",{});var x=na(t);a=P(x,r),n=P(x," of "),c=P(x,o),_=P(x," neighbourhoods here are suppressed below as too thinly observed to characterize"),x.forEach(l),u=P(b,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(b,x){d(b,t,x),ie(t,a),ie(t,n),ie(t,c),ie(t,_),d(b,u,x)},p(b,x){x[0]&64&&r!==(r=(b[6][0]?b[6][0].n_suppressed:0)+"")&&Ja(a,r),x[0]&64&&o!==(o=(b[6][0]?b[6][0].n_suppressed+b[6][0].n_shown:0)+"")&&Ja(c,o)},d(b){b&&(l(t),l(u))}}}function zr(s){let t,r;return t=new qe({props:{queryID:"dominance_children",queryResult:s[7]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function zn(s){let t,r,a,n,o,c,_,u,b,x,f,M;return t=new ra({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new ra({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new ra({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),_=new ra({props:{id:"top_child",title:"Leading type"}}),b=new ra({props:{id:"n_children",title:"Types in this group here"}}),f=new ra({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment),c=v(),z(_.$$.fragment),u=v(),z(b.$$.fragment),x=v(),z(f.$$.fragment)},l(p){R(t.$$.fragment,p),r=y(p),R(a.$$.fragment,p),n=y(p),R(o.$$.fragment,p),c=y(p),R(_.$$.fragment,p),u=y(p),R(b.$$.fragment,p),x=y(p),R(f.$$.fragment,p)},m(p,$){k(t,p,$),d(p,r,$),k(a,p,$),d(p,n,$),k(o,p,$),d(p,c,$),k(_,p,$),d(p,u,$),k(b,p,$),d(p,x,$),k(f,p,$),M=!0},p:F,i(p){M||(m(t.$$.fragment,p),m(a.$$.fragment,p),m(o.$$.fragment,p),m(_.$$.fragment,p),m(b.$$.fragment,p),m(f.$$.fragment,p),M=!0)},o(p){h(t.$$.fragment,p),h(a.$$.fragment,p),h(o.$$.fragment,p),h(_.$$.fragment,p),h(b.$$.fragment,p),h(f.$$.fragment,p),M=!1},d(p){p&&(l(r),l(n),l(c),l(u),l(x)),w(t,p),w(a,p),w(o,p),w(_,p),w(b,p),w(f,p)}}}function Er(s){let t,r;return t=new qe({props:{queryID:"demographics",queryResult:s[8]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function xr(s){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[En]},$$scope:{ctx:s}}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function En(s){let t;return{c(){t=C(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},l(r){t=P(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},m(r,a){d(r,t,a)},d(r){r&&l(t)}}}function qr(s){let t,r;return t=new qe({props:{queryID:"amenities_current",queryResult:s[9]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Tr(s){let t,r;return t=new qe({props:{queryID:"amenities_table",queryResult:s[10]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&1024&&(o.queryResult=a[10]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function xn(s){let t;return{c(){t=C("No amenity data is available for this area yet.")},l(r){t=P(r,"No amenity data is available for this area yet.")},m(r,a){d(r,t,a)},p:F,d(r){r&&l(t)}}}function qn(s){let t,r,a=s[9][0].snapshot_year+"",n,o;return{c(){t=C("Based on OpenStreetMap tagging as of "),r=T("b"),n=C(a),o=C(`, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(c){t=P(c,"Based on OpenStreetMap tagging as of "),r=q(c,"B",{});var _=na(r);n=P(_,a),_.forEach(l),o=P(c,`, this Prognoseraum
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(c,_){d(c,t,_),d(c,r,_),ie(r,n),d(c,o,_)},p(c,_){_[0]&512&&a!==(a=c[9][0].snapshot_year+"")&&Ja(n,a)},d(c){c&&(l(t),l(r),l(o))}}}function Tn(s){let t,r,a,n,o,c;return t=new ra({props:{id:"indicator",title:"Infrastructure"}}),a=new ra({props:{id:"area_value",title:"This Prognoseraum"}}),o=new ra({props:{id:"district_value",title:"District total"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment),n=v(),z(o.$$.fragment)},l(_){R(t.$$.fragment,_),r=y(_),R(a.$$.fragment,_),n=y(_),R(o.$$.fragment,_)},m(_,u){k(t,_,u),d(_,r,u),k(a,_,u),d(_,n,u),k(o,_,u),c=!0},p:F,i(_){c||(m(t.$$.fragment,_),m(a.$$.fragment,_),m(o.$$.fragment,_),c=!0)},o(_){h(t.$$.fragment,_),h(a.$$.fragment,_),h(o.$$.fragment,_),c=!1},d(_){_&&(l(r),l(n)),w(t,_),w(a,_),w(o,_)}}}function Bn(s){let t,r,a="0",n,o,c="open-data",_;return{c(){t=C("These figures come from OpenStreetMap tagging, not an official registry. A "),r=T("b"),r.textContent=a,n=C(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=T("a"),o.textContent=c,_=C(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(u){t=P(u,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=q(u,"B",{"data-svelte-h":!0}),j(r)!=="svelte-12bhsds"&&(r.textContent=a),n=P(u,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=q(u,"A",{href:!0,"data-svelte-h":!0}),j(o)!=="svelte-1jijq3i"&&(o.textContent=c),_=P(u,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){E(o,"href","/gentriduck/open-data")},m(u,b){d(u,t,b),d(u,r,b),d(u,n,b),d(u,o,b),d(u,_,b)},p:F,d(u){u&&(l(t),l(r),l(n),l(o),l(_))}}}function Sn(s){let t;return{c(){t=C(`There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=P(r,`There isn't enough tagged cuisine data in this Prognoseraum yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){d(r,t,a)},p:F,d(r){r&&l(t)}}}function Pn(s){let t,r,a=s[9][0].gastro_poi_with_cuisine_count+"",n,o;return{c(){t=C("Cuisine is tagged for "),r=T("b"),n=C(a),o=C(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(c){t=P(c,"Cuisine is tagged for "),r=q(c,"B",{});var _=na(r);n=P(_,a),_.forEach(l),o=P(c,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(c,_){d(c,t,_),d(c,r,_),ie(r,n),d(c,o,_)},p(c,_){_[0]&512&&a!==(a=c[9][0].gastro_poi_with_cuisine_count+"")&&Ja(n,a)},d(c){c&&(l(t),l(r),l(o))}}}function Cn(s){let t,r,a=s[9][0].gastro_poi_with_cuisine_count+"",n,o,c,_="most common cuisine",u,b,x=s[9][0].dominant_cuisine+"",f,M,p=Math.round(s[9][0].dominant_cuisine_share*100)+"",$,sa;return{c(){t=C("Among "),r=T("b"),n=C(a),o=C(` restaurants/cafes with cuisine
data tagged in this Prognoseraum, the `),c=T("b"),c.textContent=_,u=C(` is
`),b=T("b"),f=C(x),M=C(`
(`),$=C(p),sa=C("% of cuisine-tagged restaurants/cafes).")},l(S){t=P(S,"Among "),r=q(S,"B",{});var g=na(r);n=P(g,a),g.forEach(l),o=P(S,` restaurants/cafes with cuisine
data tagged in this Prognoseraum, the `),c=q(S,"B",{"data-svelte-h":!0}),j(c)!=="svelte-1floooe"&&(c.textContent=_),u=P(S,` is
`),b=q(S,"B",{});var we=na(b);f=P(we,x),we.forEach(l),M=P(S,`
(`),$=P(S,p),sa=P(S,"% of cuisine-tagged restaurants/cafes).")},m(S,g){d(S,t,g),d(S,r,g),ie(r,n),d(S,o,g),d(S,c,g),d(S,u,g),d(S,b,g),ie(b,f),d(S,M,g),d(S,$,g),d(S,sa,g)},p(S,g){g[0]&512&&a!==(a=S[9][0].gastro_poi_with_cuisine_count+"")&&Ja(n,a),g[0]&512&&x!==(x=S[9][0].dominant_cuisine+"")&&Ja(f,x),g[0]&512&&p!==(p=Math.round(S[9][0].dominant_cuisine_share*100)+"")&&Ja($,p)},d(S){S&&(l(t),l(r),l(o),l(c),l(u),l(b),l(M),l($),l(sa))}}}function Br(s){let t,r;return t=new qe({props:{queryID:"minimap_areas",queryResult:s[11]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Sr(s){let t,r;return t=new qe({props:{queryID:"children",queryResult:s[12]}}),{c(){z(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const o={};n[0]&4096&&(o.queryResult=a[12]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Ln(s){let t,r,a,n;return t=new ra({props:{id:"area_name",title:"Bezirksregion"}}),a=new ra({props:{id:"residents_total",title:"Residents",fmt:"num0"}}),{c(){z(t.$$.fragment),r=v(),z(a.$$.fragment)},l(o){R(t.$$.fragment,o),r=y(o),R(a.$$.fragment,o)},m(o,c){k(t,o,c),d(o,r,c),k(a,o,c),n=!0},p:F,i(o){n||(m(t.$$.fragment,o),m(a.$$.fragment,o),n=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),n=!1},d(o){o&&l(r),w(t,o),w(a,o)}}}function jn(s){var Yt;let t,r,a,n,o,c,_,u,b,x,f,M,p,$,sa,S,g,we="all districts",Xe,ke,wa="full neighbourhood list",Sa,Te,Be,oe,Pa='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Re,Se,tt=`Every neighbourhood (Planungsraum) in this Prognoseraum is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This page reports the <strong class="markdown">distribution</strong> of
those neighbourhood-level stages — never a single re-scored index value for the Prognoseraum itself,
since averaging ordinal stage codes across such different neighbourhoods would mask exactly the
neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see &quot;Honest
caveats&quot; below).`,Pe,be,Ce,_e,de,ia,ce,Le,pe,ka='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Ca,ze,oa='<a href="#mapped-places">Mapped places</a>',je,Me,He,La,Ee,la='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',De,ye,ja,_a,da,A,I,Fe,Ya=s[5].some(Pr),ca,Ae,ma=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule.`,Ie,ge,rt='<a href="#within-group-dominance">Within-group dominance</a>',Ma,Ne,Oe,me,ua,Ue,Ha,fa,ue,Ke,Qe,We,Da,Ge,pa=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Ze,he,nt='<a href="#people--structure">People &amp; structure</a>',Fa,ga,fe,Ve,ve,Aa,Je,Ia,$e,le,Na='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Oa,ha,ba,B,Ra,ya,st,Ye,it,Xa,ut,et,Dt=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,ft,za,Ft='<a href="#where-this-area-sits">Where this area sits</a>',pt,ot,Ua,gt,Ea,At='<a href="#bezirksregionen-in-this-prognoseraum">Bezirksregionen in this Prognoseraum</a>',ht,lt,Ka,bt,xa,It='<a href="#honest-caveats">Honest caveats</a>',yt,Qa,Nt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Prognoseraum</strong> —
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,vt,qa,Ot='<a href="#further-reading">Further reading</a>',$t,Wa,Ut=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other areas, or drill into any of this Prognoseraum&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,wt,_t,kt,at,Rt,Ta=typeof L<"u"&&(L.title||((Yt=L.og)==null?void 0:Yt.title))&&L.hide_title!==!0&&tn();function Cr(e,i){var D;return typeof L<"u"&&(L.title||(D=L.og)!=null&&D.title)?nn:rn}let dt=Cr()(s),Ba=typeof L=="object"&&sn(),N=s[0]&&gr(s),O=s[1]&&hr(s);u=new Ur({props:{crumbs:s[15]}}),x=new Kr({props:{title:s[14]}}),M=new Gr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]&&s[0][0].area_name)+" — Prognoseraum profile",lede:"Population, composition, and neighbourhood-stage mix for this Prognoseraum, summed and recomputed from its constituent Bezirksregionen — never a re-scored index at this grain."}});function Kt(e,i){var D;return(D=e[1][0])!=null&&D.bezirk_code?dn:_n}let zt=Kt(s),ea=zt(s);Te=new $a({props:{status:"info",$$slots:{default:[cn]},$$scope:{ctx:s}}});let U=s[3]&&br(s),K=s[2]&&yr(s);const Qt=[un,mn],Ga=[];function Wt(e,i){return e[13]?0:1}_e=Wt(s),de=Ga[_e]=Qt[_e](s),ce=new Ht({props:{data:s[3],x:"stage",y:"n_areas",title:"Neighbourhoods by stage",swapXY:"true"}});let Q=s[4]&&vr(s);He=new Ht({props:{data:s[4],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot)",swapXY:"true"}}),ye=new $a({props:{status:"warning",$$slots:{default:[pn]},$$scope:{ctx:s}}});let W=s[5]&&$r(s),ae=s[5][0]&&s[5][0].maup_caveat_required&&wr(s);const Gt=[bn,hn],Za=[];function Zt(e,i){return e[5].length>0?0:1}A=Zt(s),I=Za[A]=Gt[A](s);let te=Ya&&kr(s);Ne=new $a({props:{status:"info",$$slots:{default:[$n]},$$scope:{ctx:s}}}),me=new pr({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[wn]},$$scope:{ctx:s}}}),Ue=new pr({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[kn]},$$scope:{ctx:s}}});let G=s[6]&&Rr(s);ue=new $a({props:{status:"info",$$slots:{default:[Rn]},$$scope:{ctx:s}}});let Z=s[7]&&zr(s);We=new jt({props:{data:s[7],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Prognoseraum.",$$slots:{default:[zn]},$$scope:{ctx:s}}});let V=s[8]&&Er(s);fe=new Mt({props:{data:s[8],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),ve=new Mt({props:{data:s[8],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),Je=new Mt({props:{data:s[8],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let re=s[8]&&s[8][0]&&s[8][0].any_indicator_suppressed&&xr(s),J=s[9]&&qr(s),Y=s[10]&&Tr(s);function Vt(e,i){var D;return(D=e[9][0])!=null&&D.snapshot_year?qn:xn}let Et=Vt(s),aa=Et(s);ya=new jt({props:{data:s[10],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Tn]},$$scope:{ctx:s}}}),Ye=new $a({props:{status:"info",$$slots:{default:[Bn]},$$scope:{ctx:s}}});function Jt(e,i){var D,Va;return(D=e[9][0])!=null&&D.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8&&e[9][0].dominant_cuisine_share>=.15?Cn:(Va=e[9][0])!=null&&Va.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8?Pn:Sn}let xt=Jt(s),ta=xt(s),X=s[11]&&Br(s);Ua=new Qr({props:{data:s[11],geoJsonUrl:`${mt}/geo/pgr_bzr_drilldown.geojson`,title:(s[0][0]?s[0][0].area_name:"This Prognoseraum")+" and its Bezirksregionen"}});let ee=s[12]&&Sr(s);return Ka=new jt({props:{data:s[12],rows:"20",link:"bzr_link",$$slots:{default:[Ln]},$$scope:{ctx:s}}}),at=new Wr({}),{c(){Ta&&Ta.c(),t=v(),dt.c(),r=T("meta"),a=T("meta"),Ba&&Ba.c(),n=qt(),o=v(),N&&N.c(),c=v(),O&&O.c(),_=v(),z(u.$$.fragment),b=v(),z(x.$$.fragment),f=v(),z(M.$$.fragment),p=v(),$=T("p"),sa=C("Up: "),ea.c(),S=C(" · "),g=T("a"),g.textContent=we,Xe=C(" · "),ke=T("a"),ke.textContent=wa,Sa=v(),z(Te.$$.fragment),Be=v(),oe=T("h2"),oe.innerHTML=Pa,Re=v(),Se=T("p"),Se.innerHTML=tt,Pe=v(),U&&U.c(),be=v(),K&&K.c(),Ce=v(),de.c(),ia=v(),z(ce.$$.fragment),Le=v(),pe=T("h2"),pe.innerHTML=ka,Ca=v(),ze=T("h3"),ze.innerHTML=oa,je=v(),Q&&Q.c(),Me=v(),z(He.$$.fragment),La=v(),Ee=T("h3"),Ee.innerHTML=la,De=v(),z(ye.$$.fragment),ja=v(),W&&W.c(),_a=v(),ae&&ae.c(),da=v(),I.c(),Fe=v(),te&&te.c(),ca=v(),Ae=T("p"),Ae.innerHTML=ma,Ie=v(),ge=T("h2"),ge.innerHTML=rt,Ma=v(),z(Ne.$$.fragment),Oe=v(),z(me.$$.fragment),ua=v(),z(Ue.$$.fragment),Ha=v(),G&&G.c(),fa=v(),z(ue.$$.fragment),Ke=v(),Z&&Z.c(),Qe=v(),z(We.$$.fragment),Da=v(),Ge=T("p"),Ge.innerHTML=pa,Ze=v(),he=T("h2"),he.innerHTML=nt,Fa=v(),V&&V.c(),ga=v(),z(fe.$$.fragment),Ve=v(),z(ve.$$.fragment),Aa=v(),z(Je.$$.fragment),Ia=v(),re&&re.c(),$e=v(),le=T("h2"),le.innerHTML=Na,Oa=v(),J&&J.c(),ha=v(),Y&&Y.c(),ba=v(),B=T("p"),aa.c(),Ra=v(),z(ya.$$.fragment),st=v(),z(Ye.$$.fragment),it=v(),Xa=T("p"),ta.c(),ut=v(),et=T("p"),et.textContent=Dt,ft=v(),za=T("h2"),za.innerHTML=Ft,pt=v(),X&&X.c(),ot=v(),z(Ua.$$.fragment),gt=v(),Ea=T("h3"),Ea.innerHTML=At,ht=v(),ee&&ee.c(),lt=v(),z(Ka.$$.fragment),bt=v(),xa=T("h2"),xa.innerHTML=It,yt=v(),Qa=T("ul"),Qa.innerHTML=Nt,vt=v(),qa=T("h2"),qa.innerHTML=Ot,$t=v(),Wa=T("p"),Wa.innerHTML=Ut,wt=v(),_t=T("hr"),kt=v(),z(at.$$.fragment),this.h()},l(e){Ta&&Ta.l(e),t=y(e);const i=jr("svelte-2igo1p",document.head);dt.l(i),r=q(i,"META",{name:!0,content:!0}),a=q(i,"META",{name:!0,content:!0}),Ba&&Ba.l(i),n=qt(),i.forEach(l),o=y(e),N&&N.l(e),c=y(e),O&&O.l(e),_=y(e),R(u.$$.fragment,e),b=y(e),R(x.$$.fragment,e),f=y(e),R(M.$$.fragment,e),p=y(e),$=q(e,"P",{});var D=na($);sa=P(D,"Up: "),ea.l(D),S=P(D," · "),g=q(D,"A",{href:!0,"data-svelte-h":!0}),j(g)!=="svelte-6j2qr0"&&(g.textContent=we),Xe=P(D," · "),ke=q(D,"A",{href:!0,"data-svelte-h":!0}),j(ke)!=="svelte-z78e0k"&&(ke.textContent=wa),D.forEach(l),Sa=y(e),R(Te.$$.fragment,e),Be=y(e),oe=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(oe)!=="svelte-14f17uo"&&(oe.innerHTML=Pa),Re=y(e),Se=q(e,"P",{class:!0,"data-svelte-h":!0}),j(Se)!=="svelte-qdtmcq"&&(Se.innerHTML=tt),Pe=y(e),U&&U.l(e),be=y(e),K&&K.l(e),Ce=y(e),de.l(e),ia=y(e),R(ce.$$.fragment,e),Le=y(e),pe=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(pe)!=="svelte-1i9w9pn"&&(pe.innerHTML=ka),Ca=y(e),ze=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j(ze)!=="svelte-3hvew3"&&(ze.innerHTML=oa),je=y(e),Q&&Q.l(e),Me=y(e),R(He.$$.fragment,e),La=y(e),Ee=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j(Ee)!=="svelte-5mc7pd"&&(Ee.innerHTML=la),De=y(e),R(ye.$$.fragment,e),ja=y(e),W&&W.l(e),_a=y(e),ae&&ae.l(e),da=y(e),I.l(e),Fe=y(e),te&&te.l(e),ca=y(e),Ae=q(e,"P",{class:!0,"data-svelte-h":!0}),j(Ae)!=="svelte-1q1lnxb"&&(Ae.innerHTML=ma),Ie=y(e),ge=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(ge)!=="svelte-4kb45v"&&(ge.innerHTML=rt),Ma=y(e),R(Ne.$$.fragment,e),Oe=y(e),R(me.$$.fragment,e),ua=y(e),R(Ue.$$.fragment,e),Ha=y(e),G&&G.l(e),fa=y(e),R(ue.$$.fragment,e),Ke=y(e),Z&&Z.l(e),Qe=y(e),R(We.$$.fragment,e),Da=y(e),Ge=q(e,"P",{class:!0,"data-svelte-h":!0}),j(Ge)!=="svelte-1xa7bh7"&&(Ge.innerHTML=pa),Ze=y(e),he=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(he)!=="svelte-1mdzqzc"&&(he.innerHTML=nt),Fa=y(e),V&&V.l(e),ga=y(e),R(fe.$$.fragment,e),Ve=y(e),R(ve.$$.fragment,e),Aa=y(e),R(Je.$$.fragment,e),Ia=y(e),re&&re.l(e),$e=y(e),le=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(le)!=="svelte-12k6lqd"&&(le.innerHTML=Na),Oa=y(e),J&&J.l(e),ha=y(e),Y&&Y.l(e),ba=y(e),B=q(e,"P",{});var Va=na(B);aa.l(Va),Va.forEach(l),Ra=y(e),R(ya.$$.fragment,e),st=y(e),R(Ye.$$.fragment,e),it=y(e),Xa=q(e,"P",{});var ct=na(Xa);ta.l(ct),ct.forEach(l),ut=y(e),et=q(e,"P",{"data-svelte-h":!0}),j(et)!=="svelte-ja6pm6"&&(et.textContent=Dt),ft=y(e),za=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(za)!=="svelte-60cjj9"&&(za.innerHTML=Ft),pt=y(e),X&&X.l(e),ot=y(e),R(Ua.$$.fragment,e),gt=y(e),Ea=q(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j(Ea)!=="svelte-efyvo4"&&(Ea.innerHTML=At),ht=y(e),ee&&ee.l(e),lt=y(e),R(Ka.$$.fragment,e),bt=y(e),xa=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(xa)!=="svelte-ad0syq"&&(xa.innerHTML=It),yt=y(e),Qa=q(e,"UL",{class:!0,"data-svelte-h":!0}),j(Qa)!=="svelte-1vxfhvh"&&(Qa.innerHTML=Nt),vt=y(e),qa=q(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(qa)!=="svelte-oimjns"&&(qa.innerHTML=Ot),$t=y(e),Wa=q(e,"P",{class:!0,"data-svelte-h":!0}),j(Wa)!=="svelte-1iuzmnk"&&(Wa.innerHTML=Ut),wt=y(e),_t=q(e,"HR",{class:!0}),kt=y(e),R(at.$$.fragment,e),this.h()},h(){E(r,"name","twitter:card"),E(r,"content","summary_large_image"),E(a,"name","twitter:site"),E(a,"content","@evidence_dev"),E(g,"href","/gentriduck/berlin/area/bezirk"),E(ke,"href","/gentriduck/berlin/area"),E(oe,"class","markdown"),E(oe,"id","social-status--trajectory"),E(Se,"class","markdown"),E(pe,"class","markdown"),E(pe,"id","commercial-mix--offering-advantage"),E(ze,"class","markdown"),E(ze,"id","mapped-places"),E(Ee,"class","markdown"),E(Ee,"id","offering-advantage-across-the-area-hierarchy"),E(Ae,"class","markdown"),E(ge,"class","markdown"),E(ge,"id","within-group-dominance"),E(Ge,"class","markdown"),E(he,"class","markdown"),E(he,"id","people--structure"),E(le,"class","markdown"),E(le,"id","amenities--everyday-infrastructure"),E(za,"class","markdown"),E(za,"id","where-this-area-sits"),E(Ea,"class","markdown"),E(Ea,"id","bezirksregionen-in-this-prognoseraum"),E(xa,"class","markdown"),E(xa,"id","honest-caveats"),E(Qa,"class","markdown"),E(qa,"class","markdown"),E(qa,"id","further-reading"),E(Wa,"class","markdown"),E(_t,"class","markdown")},m(e,i){Ta&&Ta.m(e,i),d(e,t,i),dt.m(document.head,null),ie(document.head,r),ie(document.head,a),Ba&&Ba.m(document.head,null),ie(document.head,n),d(e,o,i),N&&N.m(e,i),d(e,c,i),O&&O.m(e,i),d(e,_,i),k(u,e,i),d(e,b,i),k(x,e,i),d(e,f,i),k(M,e,i),d(e,p,i),d(e,$,i),ie($,sa),ea.m($,null),ie($,S),ie($,g),ie($,Xe),ie($,ke),d(e,Sa,i),k(Te,e,i),d(e,Be,i),d(e,oe,i),d(e,Re,i),d(e,Se,i),d(e,Pe,i),U&&U.m(e,i),d(e,be,i),K&&K.m(e,i),d(e,Ce,i),Ga[_e].m(e,i),d(e,ia,i),k(ce,e,i),d(e,Le,i),d(e,pe,i),d(e,Ca,i),d(e,ze,i),d(e,je,i),Q&&Q.m(e,i),d(e,Me,i),k(He,e,i),d(e,La,i),d(e,Ee,i),d(e,De,i),k(ye,e,i),d(e,ja,i),W&&W.m(e,i),d(e,_a,i),ae&&ae.m(e,i),d(e,da,i),Za[A].m(e,i),d(e,Fe,i),te&&te.m(e,i),d(e,ca,i),d(e,Ae,i),d(e,Ie,i),d(e,ge,i),d(e,Ma,i),k(Ne,e,i),d(e,Oe,i),k(me,e,i),d(e,ua,i),k(Ue,e,i),d(e,Ha,i),G&&G.m(e,i),d(e,fa,i),k(ue,e,i),d(e,Ke,i),Z&&Z.m(e,i),d(e,Qe,i),k(We,e,i),d(e,Da,i),d(e,Ge,i),d(e,Ze,i),d(e,he,i),d(e,Fa,i),V&&V.m(e,i),d(e,ga,i),k(fe,e,i),d(e,Ve,i),k(ve,e,i),d(e,Aa,i),k(Je,e,i),d(e,Ia,i),re&&re.m(e,i),d(e,$e,i),d(e,le,i),d(e,Oa,i),J&&J.m(e,i),d(e,ha,i),Y&&Y.m(e,i),d(e,ba,i),d(e,B,i),aa.m(B,null),d(e,Ra,i),k(ya,e,i),d(e,st,i),k(Ye,e,i),d(e,it,i),d(e,Xa,i),ta.m(Xa,null),d(e,ut,i),d(e,et,i),d(e,ft,i),d(e,za,i),d(e,pt,i),X&&X.m(e,i),d(e,ot,i),k(Ua,e,i),d(e,gt,i),d(e,Ea,i),d(e,ht,i),ee&&ee.m(e,i),d(e,lt,i),k(Ka,e,i),d(e,bt,i),d(e,xa,i),d(e,yt,i),d(e,Qa,i),d(e,vt,i),d(e,qa,i),d(e,$t,i),d(e,Wa,i),d(e,wt,i),d(e,_t,i),d(e,kt,i),k(at,e,i),Rt=!0},p(e,i){var cr;typeof L<"u"&&(L.title||(cr=L.og)!=null&&cr.title)&&L.hide_title!==!0&&Ta.p(e,i),dt.p(e,i),typeof L=="object"&&Ba.p(e,i),e[0]?N?(N.p(e,i),i[0]&1&&m(N,1)):(N=gr(e),N.c(),m(N,1),N.m(c.parentNode,c)):N&&(se(),h(N,1,1,()=>{N=null}),ne()),e[1]?O?(O.p(e,i),i[0]&2&&m(O,1)):(O=hr(e),O.c(),m(O,1),O.m(_.parentNode,_)):O&&(se(),h(O,1,1,()=>{O=null}),ne());const D={};i[0]&32768&&(D.crumbs=e[15]),u.$set(D);const Va={};i[0]&16384&&(Va.title=e[14]),x.$set(Va);const ct={};i[0]&1&&(ct.title=(e[0][0]&&e[0][0].area_name)+" — Prognoseraum profile"),M.$set(ct),zt===(zt=Kt(e))&&ea?ea.p(e,i):(ea.d(1),ea=zt(e),ea&&(ea.c(),ea.m($,S)));const Xt={};i[3]&4&&(Xt.$$scope={dirty:i,ctx:e}),Te.$set(Xt),e[3]?U?(U.p(e,i),i[0]&8&&m(U,1)):(U=br(e),U.c(),m(U,1),U.m(be.parentNode,be)):U&&(se(),h(U,1,1,()=>{U=null}),ne()),e[2]?K?(K.p(e,i),i[0]&4&&m(K,1)):(K=yr(e),K.c(),m(K,1),K.m(Ce.parentNode,Ce)):K&&(se(),h(K,1,1,()=>{K=null}),ne());let Tt=_e;_e=Wt(e),_e===Tt?Ga[_e].p(e,i):(se(),h(Ga[Tt],1,1,()=>{Ga[Tt]=null}),ne(),de=Ga[_e],de?de.p(e,i):(de=Ga[_e]=Qt[_e](e),de.c()),m(de,1),de.m(ia.parentNode,ia));const er={};i[0]&8&&(er.data=e[3]),ce.$set(er),e[4]?Q?(Q.p(e,i),i[0]&16&&m(Q,1)):(Q=vr(e),Q.c(),m(Q,1),Q.m(Me.parentNode,Me)):Q&&(se(),h(Q,1,1,()=>{Q=null}),ne());const ar={};i[0]&16&&(ar.data=e[4]),He.$set(ar);const tr={};i[3]&4&&(tr.$$scope={dirty:i,ctx:e}),ye.$set(tr),e[5]?W?(W.p(e,i),i[0]&32&&m(W,1)):(W=$r(e),W.c(),m(W,1),W.m(_a.parentNode,_a)):W&&(se(),h(W,1,1,()=>{W=null}),ne()),e[5][0]&&e[5][0].maup_caveat_required?ae?i[0]&32&&m(ae,1):(ae=wr(e),ae.c(),m(ae,1),ae.m(da.parentNode,da)):ae&&(se(),h(ae,1,1,()=>{ae=null}),ne());let Bt=A;A=Zt(e),A===Bt?Za[A].p(e,i):(se(),h(Za[Bt],1,1,()=>{Za[Bt]=null}),ne(),I=Za[A],I?I.p(e,i):(I=Za[A]=Gt[A](e),I.c()),m(I,1),I.m(Fe.parentNode,Fe)),i[0]&32&&(Ya=e[5].some(Pr)),Ya?te?i[0]&32&&m(te,1):(te=kr(e),te.c(),m(te,1),te.m(ca.parentNode,ca)):te&&(se(),h(te,1,1,()=>{te=null}),ne());const rr={};i[3]&4&&(rr.$$scope={dirty:i,ctx:e}),Ne.$set(rr);const nr={};i[3]&4&&(nr.$$scope={dirty:i,ctx:e}),me.$set(nr);const sr={};i[3]&4&&(sr.$$scope={dirty:i,ctx:e}),Ue.$set(sr),e[6]?G?(G.p(e,i),i[0]&64&&m(G,1)):(G=Rr(e),G.c(),m(G,1),G.m(fa.parentNode,fa)):G&&(se(),h(G,1,1,()=>{G=null}),ne());const ir={};i[0]&64|i[3]&4&&(ir.$$scope={dirty:i,ctx:e}),ue.$set(ir),e[7]?Z?(Z.p(e,i),i[0]&128&&m(Z,1)):(Z=zr(e),Z.c(),m(Z,1),Z.m(Qe.parentNode,Qe)):Z&&(se(),h(Z,1,1,()=>{Z=null}),ne());const St={};i[0]&128&&(St.data=e[7]),i[3]&4&&(St.$$scope={dirty:i,ctx:e}),We.$set(St),e[8]?V?(V.p(e,i),i[0]&256&&m(V,1)):(V=Er(e),V.c(),m(V,1),V.m(ga.parentNode,ga)):V&&(se(),h(V,1,1,()=>{V=null}),ne());const or={};i[0]&256&&(or.data=e[8]),fe.$set(or);const lr={};i[0]&256&&(lr.data=e[8]),ve.$set(lr);const _r={};i[0]&256&&(_r.data=e[8]),Je.$set(_r),e[8]&&e[8][0]&&e[8][0].any_indicator_suppressed?re?i[0]&256&&m(re,1):(re=xr(e),re.c(),m(re,1),re.m($e.parentNode,$e)):re&&(se(),h(re,1,1,()=>{re=null}),ne()),e[9]?J?(J.p(e,i),i[0]&512&&m(J,1)):(J=qr(e),J.c(),m(J,1),J.m(ha.parentNode,ha)):J&&(se(),h(J,1,1,()=>{J=null}),ne()),e[10]?Y?(Y.p(e,i),i[0]&1024&&m(Y,1)):(Y=Tr(e),Y.c(),m(Y,1),Y.m(ba.parentNode,ba)):Y&&(se(),h(Y,1,1,()=>{Y=null}),ne()),Et===(Et=Vt(e))&&aa?aa.p(e,i):(aa.d(1),aa=Et(e),aa&&(aa.c(),aa.m(B,null)));const Pt={};i[0]&1024&&(Pt.data=e[10]),i[3]&4&&(Pt.$$scope={dirty:i,ctx:e}),ya.$set(Pt);const dr={};i[3]&4&&(dr.$$scope={dirty:i,ctx:e}),Ye.$set(dr),xt===(xt=Jt(e))&&ta?ta.p(e,i):(ta.d(1),ta=xt(e),ta&&(ta.c(),ta.m(Xa,null))),e[11]?X?(X.p(e,i),i[0]&2048&&m(X,1)):(X=Br(e),X.c(),m(X,1),X.m(ot.parentNode,ot)):X&&(se(),h(X,1,1,()=>{X=null}),ne());const Ct={};i[0]&2048&&(Ct.data=e[11]),i[0]&1&&(Ct.title=(e[0][0]?e[0][0].area_name:"This Prognoseraum")+" and its Bezirksregionen"),Ua.$set(Ct),e[12]?ee?(ee.p(e,i),i[0]&4096&&m(ee,1)):(ee=Sr(e),ee.c(),m(ee,1),ee.m(lt.parentNode,lt)):ee&&(se(),h(ee,1,1,()=>{ee=null}),ne());const Lt={};i[0]&4096&&(Lt.data=e[12]),i[3]&4&&(Lt.$$scope={dirty:i,ctx:e}),Ka.$set(Lt)},i(e){Rt||(m(N),m(O),m(u.$$.fragment,e),m(x.$$.fragment,e),m(M.$$.fragment,e),m(Te.$$.fragment,e),m(U),m(K),m(de),m(ce.$$.fragment,e),m(Q),m(He.$$.fragment,e),m(ye.$$.fragment,e),m(W),m(ae),m(I),m(te),m(Ne.$$.fragment,e),m(me.$$.fragment,e),m(Ue.$$.fragment,e),m(G),m(ue.$$.fragment,e),m(Z),m(We.$$.fragment,e),m(V),m(fe.$$.fragment,e),m(ve.$$.fragment,e),m(Je.$$.fragment,e),m(re),m(J),m(Y),m(ya.$$.fragment,e),m(Ye.$$.fragment,e),m(X),m(Ua.$$.fragment,e),m(ee),m(Ka.$$.fragment,e),m(at.$$.fragment,e),Rt=!0)},o(e){h(N),h(O),h(u.$$.fragment,e),h(x.$$.fragment,e),h(M.$$.fragment,e),h(Te.$$.fragment,e),h(U),h(K),h(de),h(ce.$$.fragment,e),h(Q),h(He.$$.fragment,e),h(ye.$$.fragment,e),h(W),h(ae),h(I),h(te),h(Ne.$$.fragment,e),h(me.$$.fragment,e),h(Ue.$$.fragment,e),h(G),h(ue.$$.fragment,e),h(Z),h(We.$$.fragment,e),h(V),h(fe.$$.fragment,e),h(ve.$$.fragment,e),h(Je.$$.fragment,e),h(re),h(J),h(Y),h(ya.$$.fragment,e),h(Ye.$$.fragment,e),h(X),h(Ua.$$.fragment,e),h(ee),h(Ka.$$.fragment,e),h(at.$$.fragment,e),Rt=!1},d(e){e&&(l(t),l(o),l(c),l(_),l(b),l(f),l(p),l($),l(Sa),l(Be),l(oe),l(Re),l(Se),l(Pe),l(be),l(Ce),l(ia),l(Le),l(pe),l(Ca),l(ze),l(je),l(Me),l(La),l(Ee),l(De),l(ja),l(_a),l(da),l(Fe),l(ca),l(Ae),l(Ie),l(ge),l(Ma),l(Oe),l(ua),l(Ha),l(fa),l(Ke),l(Qe),l(Da),l(Ge),l(Ze),l(he),l(Fa),l(ga),l(Ve),l(Aa),l(Ia),l($e),l(le),l(Oa),l(ha),l(ba),l(B),l(Ra),l(st),l(it),l(Xa),l(ut),l(et),l(ft),l(za),l(pt),l(ot),l(gt),l(Ea),l(ht),l(lt),l(bt),l(xa),l(yt),l(Qa),l(vt),l(qa),l($t),l(Wa),l(wt),l(_t),l(kt)),Ta&&Ta.d(e),dt.d(e),l(r),l(a),Ba&&Ba.d(e),l(n),N&&N.d(e),O&&O.d(e),w(u,e),w(x,e),w(M,e),ea.d(),w(Te,e),U&&U.d(e),K&&K.d(e),Ga[_e].d(e),w(ce,e),Q&&Q.d(e),w(He,e),w(ye,e),W&&W.d(e),ae&&ae.d(e),Za[A].d(e),te&&te.d(e),w(Ne,e),w(me,e),w(Ue,e),G&&G.d(e),w(ue,e),Z&&Z.d(e),w(We,e),V&&V.d(e),w(fe,e),w(ve,e),w(Je,e),re&&re.d(e),J&&J.d(e),Y&&Y.d(e),aa.d(),w(ya,e),w(Ye,e),ta.d(),X&&X.d(e),w(Ua,e),ee&&ee.d(e),w(Ka,e),w(at,e)}}}const L={},Pr=s=>s.oa_domain_min_base_flag;function Mn(s,t,r){let a,n,o,c,_,u,b;mr(s,en,B=>r(74,u=B)),mr(s,fr,B=>r(78,b=B));let{data:x}=t,{data:f={},customFormattingSettings:M,__db:p,inputs:$}=x;Mr(fr,b="f470234fb75d0fe1491483e9932ff021",b);let sa=Vr(Zr($));Hr(sa.subscribe(B=>r(18,$=B))),Dr(Xr,{getCustomFormats:()=>M.customFormats||[]});const S=(B,Ra)=>an(p.query,B,{query_name:Ra});Jr(S);let g=u.params;Fr(()=>!0);let we={initialData:void 0,initialError:void 0},Xe=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
limit 1`,ke=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
limit 1`;f.pgr_name_data&&(f.pgr_name_data instanceof Error?we.initialError=f.pgr_name_data:we.initialData=f.pgr_name_data,f.pgr_name_columns&&(we.knownColumns=f.pgr_name_columns));let wa,Sa=!1;const Te=xe.createReactive({callback:B=>{r(0,wa=B)},execFn:S},{id:"pgr_name",...we});Te(ke,{noResolve:Xe,...we}),globalThis[Symbol.for("pgr_name")]={get value(){return wa}};let Be={initialData:void 0,initialError:void 0},oe=H`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${g.code}', 1, 2)`,Pa=`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${g.code}', 1, 2)`;f.bezirk_name_data&&(f.bezirk_name_data instanceof Error?Be.initialError=f.bezirk_name_data:Be.initialData=f.bezirk_name_data,f.bezirk_name_columns&&(Be.knownColumns=f.bezirk_name_columns));let Re,Se=!1;const tt=xe.createReactive({callback:B=>{r(1,Re=B)},execFn:S},{id:"bezirk_name",...Be});tt(Pa,{noResolve:oe,...Be}),globalThis[Symbol.for("bezirk_name")]={get value(){return Re}};let Pe={initialData:void 0,initialError:void 0},be=H`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`,Ce=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`;f.stage_mix_data&&(f.stage_mix_data instanceof Error?Pe.initialError=f.stage_mix_data:Pe.initialData=f.stage_mix_data,f.stage_mix_columns&&(Pe.knownColumns=f.stage_mix_columns));let _e,de=!1;const ia=xe.createReactive({callback:B=>{r(3,_e=B)},execFn:S},{id:"stage_mix",...Pe});ia(Ce,{noResolve:be,...Pe}),globalThis[Symbol.for("stage_mix")]={get value(){return _e}};let ce={initialData:void 0,initialError:void 0},Le=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`,pe=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`;f.stage_mix_summary_data&&(f.stage_mix_summary_data instanceof Error?ce.initialError=f.stage_mix_summary_data:ce.initialData=f.stage_mix_summary_data,f.stage_mix_summary_columns&&(ce.knownColumns=f.stage_mix_summary_columns));let ka,Ca=!1;const ze=xe.createReactive({callback:B=>{r(2,ka=B)},execFn:S},{id:"stage_mix_summary",...ce});ze(pe,{noResolve:Le,...ce}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return ka}};let oa={initialData:void 0,initialError:void 0},je=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`,Me=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;f.poi_mix_data&&(f.poi_mix_data instanceof Error?oa.initialError=f.poi_mix_data:oa.initialData=f.poi_mix_data,f.poi_mix_columns&&(oa.knownColumns=f.poi_mix_columns));let He,La=!1;const Ee=xe.createReactive({callback:B=>{r(4,He=B)},execFn:S},{id:"poi_mix",...oa});Ee(Me,{noResolve:je,...oa}),globalThis[Symbol.for("poi_mix")]={get value(){return He}};let la={initialData:void 0,initialError:void 0},De=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${g.code}'
  )
order by oa_domain desc`,ye=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${g.code}'
  )
order by oa_domain desc`;f.oa_arealevel_data&&(f.oa_arealevel_data instanceof Error?la.initialError=f.oa_arealevel_data:la.initialData=f.oa_arealevel_data,f.oa_arealevel_columns&&(la.knownColumns=f.oa_arealevel_columns));let ja,_a=!1;const da=xe.createReactive({callback:B=>{r(5,ja=B)},execFn:S},{id:"oa_arealevel",...la});da(ye,{noResolve:De,...la}),globalThis[Symbol.for("oa_arealevel")]={get value(){return ja}};let A={initialData:void 0,initialError:void 0},I=H`select
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
  and substr(area_code, 1, 4) = '${g.code}'`,Fe=`select
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
  and substr(area_code, 1, 4) = '${g.code}'`;f.dom_suppressed_count_data&&(f.dom_suppressed_count_data instanceof Error?A.initialError=f.dom_suppressed_count_data:A.initialData=f.dom_suppressed_count_data,f.dom_suppressed_count_columns&&(A.knownColumns=f.dom_suppressed_count_columns));let Ya,ca=!1;const Ae=xe.createReactive({callback:B=>{r(6,Ya=B)},execFn:S},{id:"dom_suppressed_count",...A});Ae(Fe,{noResolve:I,...A}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return Ya}};let ma={initialData:void 0,initialError:void 0},Ie=H`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and substr(d.area_code, 1, 4) = '${g.code}'
order by d.hhi desc
limit 15`,ge=`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and substr(d.area_code, 1, 4) = '${g.code}'
order by d.hhi desc
limit 15`;f.dominance_children_data&&(f.dominance_children_data instanceof Error?ma.initialError=f.dominance_children_data:ma.initialData=f.dominance_children_data,f.dominance_children_columns&&(ma.knownColumns=f.dominance_children_columns));let rt,Ma=!1;const Ne=xe.createReactive({callback:B=>{r(7,rt=B)},execFn:S},{id:"dominance_children",...ma});Ne(ge,{noResolve:Ie,...ma}),globalThis[Symbol.for("dominance_children")]={get value(){return rt}};let Oe={initialData:void 0,initialError:void 0},me=H`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by reference_year desc
limit 1`,ua=`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by reference_year desc
limit 1`;f.demographics_data&&(f.demographics_data instanceof Error?Oe.initialError=f.demographics_data:Oe.initialData=f.demographics_data,f.demographics_columns&&(Oe.knownColumns=f.demographics_columns));let Ue,Ha=!1;const fa=xe.createReactive({callback:B=>{r(8,Ue=B)},execFn:S},{id:"demographics",...Oe});fa(ua,{noResolve:me,...Oe}),globalThis[Symbol.for("demographics")]={get value(){return Ue}};let ue={initialData:void 0,initialError:void 0},Ke=H`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`,Qe=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`;f.amenities_current_data&&(f.amenities_current_data instanceof Error?ue.initialError=f.amenities_current_data:ue.initialData=f.amenities_current_data,f.amenities_current_columns&&(ue.knownColumns=f.amenities_current_columns));let We,Da=!1;const Ge=xe.createReactive({callback:B=>{r(9,We=B)},execFn:S},{id:"amenities_current",...ue});Ge(Qe,{noResolve:Ke,...ue}),globalThis[Symbol.for("amenities_current")]={get value(){return We}};let pa={initialData:void 0,initialError:void 0},Ze=H`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${g.code}', 1, 2)
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
order by sort_order`,he=`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${g.code}', 1, 2)
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
order by sort_order`;f.amenities_table_data&&(f.amenities_table_data instanceof Error?pa.initialError=f.amenities_table_data:pa.initialData=f.amenities_table_data,f.amenities_table_columns&&(pa.knownColumns=f.amenities_table_columns));let nt,Fa=!1;const ga=xe.createReactive({callback:B=>{r(10,nt=B)},execFn:S},{id:"amenities_table",...pa});ga(he,{noResolve:Ze,...pa}),globalThis[Symbol.for("amenities_table")]={get value(){return nt}};let fe={initialData:void 0,initialError:void 0},Ve=H`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${g.code}'
order by sort_order, area_name`,ve=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${g.code}'
order by sort_order, area_name`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?fe.initialError=f.minimap_areas_data:fe.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(fe.knownColumns=f.minimap_areas_columns));let Aa,Je=!1;const Ia=xe.createReactive({callback:B=>{r(11,Aa=B)},execFn:S},{id:"minimap_areas",...fe});Ia(ve,{noResolve:Ve,...fe}),globalThis[Symbol.for("minimap_areas")]={get value(){return Aa}};let $e={initialData:void 0,initialError:void 0},le=H`select
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
  and substr(d.area_code, 1, 4) = '${g.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`,Na=`select
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
  and substr(d.area_code, 1, 4) = '${g.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`;f.children_data&&(f.children_data instanceof Error?$e.initialError=f.children_data:$e.initialData=f.children_data,f.children_columns&&($e.knownColumns=f.children_columns));let Oa,ha=!1;const ba=xe.createReactive({callback:B=>{r(12,Oa=B)},execFn:S},{id:"children",...$e});return ba(Na,{noResolve:le,...$e}),globalThis[Symbol.for("children")]={get value(){return Oa}},s.$$set=B=>{"data"in B&&r(16,x=B.data)},s.$$.update=()=>{var B,Ra;s.$$.dirty[0]&65536&&r(17,{data:f={},customFormattingSettings:M,__db:p}=x,f),s.$$.dirty[0]&131072&&Yr.set(Object.keys(f).length>0),s.$$.dirty[2]&4096&&r(19,g=u.params),s.$$.dirty[0]&524288&&r(21,Xe=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
limit 1`),s.$$.dirty[0]&524288&&r(22,ke=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
limit 1`),s.$$.dirty[0]&15728640&&(Xe||!Sa?Xe||(Te(ke,{noResolve:Xe,...we}),r(23,Sa=!0)):Te(ke,{noResolve:Xe})),s.$$.dirty[0]&524288&&r(25,oe=H`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${g.code}', 1, 2)`),s.$$.dirty[0]&524288&&r(26,Pa=`select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
where bezirk_code = substr('${g.code}', 1, 2)`),s.$$.dirty[0]&251658240&&(oe||!Se?oe||(tt(Pa,{noResolve:oe,...Be}),r(27,Se=!0)):tt(Pa,{noResolve:oe})),s.$$.dirty[0]&524288&&r(29,be=H`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),s.$$.dirty[0]&524288&&r(30,Ce=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 4) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),s.$$.dirty[0]&1879048192|s.$$.dirty[1]&1&&(be||!de?be||(ia(Ce,{noResolve:be,...Pe}),r(31,de=!0)):ia(Ce,{noResolve:be})),s.$$.dirty[0]&524288&&r(33,Le=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&524288&&r(34,pe=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 4) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`),s.$$.dirty[1]&30&&(Le||!Ca?Le||(ze(pe,{noResolve:Le,...ce}),r(35,Ca=!0)):ze(pe,{noResolve:Le})),s.$$.dirty[0]&524288&&r(37,je=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),s.$$.dirty[0]&524288&&r(38,Me=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 4) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),s.$$.dirty[1]&480&&(je||!La?je||(Ee(Me,{noResolve:je,...oa}),r(39,La=!0)):Ee(Me,{noResolve:je})),s.$$.dirty[0]&524288&&r(41,De=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${g.code}'
  )
order by oa_domain desc`),s.$$.dirty[0]&524288&&r(42,ye=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'pgr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'pgr' and area_code = '${g.code}'
  )
order by oa_domain desc`),s.$$.dirty[1]&7680&&(De||!_a?De||(da(ye,{noResolve:De,...la}),r(43,_a=!0)):da(ye,{noResolve:De})),s.$$.dirty[0]&786432&&r(45,I=H`select
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
  and substr(area_code, 1, 4) = '${g.code}'`),s.$$.dirty[0]&786432&&r(46,Fe=`select
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
  and substr(area_code, 1, 4) = '${g.code}'`),s.$$.dirty[1]&122880&&(I||!ca?I||(Ae(Fe,{noResolve:I,...A}),r(47,ca=!0)):Ae(Fe,{noResolve:I})),s.$$.dirty[0]&786432&&r(49,Ie=H`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and substr(d.area_code, 1, 4) = '${g.code}'
order by d.hhi desc
limit 15`),s.$$.dirty[0]&786432&&r(50,ge=`-- This Prognoseraum's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and substr(d.area_code, 1, 4) = '${g.code}'
order by d.hhi desc
limit 15`),s.$$.dirty[1]&1966080&&(Ie||!Ma?Ie||(Ne(ge,{noResolve:Ie,...ma}),r(51,Ma=!0)):Ne(ge,{noResolve:Ie})),s.$$.dirty[0]&524288&&r(53,me=H`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by reference_year desc
limit 1`),s.$$.dirty[0]&524288&&r(54,ua=`select
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
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by reference_year desc
limit 1`),s.$$.dirty[1]&31457280&&(me||!Ha?me||(fa(ua,{noResolve:me,...Oe}),r(55,Ha=!0)):fa(ua,{noResolve:me})),s.$$.dirty[0]&524288&&r(57,Ke=H`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&524288&&r(58,Qe=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[1]&503316480&&(Ke||!Da?Ke||(Ge(Qe,{noResolve:Ke,...ue}),r(59,Da=!0)):Ge(Qe,{noResolve:Ke})),s.$$.dirty[0]&524288&&r(61,Ze=H`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${g.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[0]&524288&&r(62,he=`-- One row per infrastructure fact: this Prognoseraum vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'pgr' and area_code = '${g.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${g.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[1]&1610612736|s.$$.dirty[2]&3&&(Ze||!Fa?Ze||(ga(he,{noResolve:Ze,...pa}),r(63,Fa=!0)):ga(he,{noResolve:Ze})),s.$$.dirty[0]&524288&&r(65,Ve=H`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${g.code}'
order by sort_order, area_name`),s.$$.dirty[0]&524288&&r(66,ve=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'pgr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'bzr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/bzr/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 4) = '${g.code}'
order by sort_order, area_name`),s.$$.dirty[2]&60&&(Ve||!Je?Ve||(Ia(ve,{noResolve:Ve,...fe}),r(67,Je=!0)):Ia(ve,{noResolve:Ve})),s.$$.dirty[0]&524288&&r(69,le=H`select
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
  and substr(d.area_code, 1, 4) = '${g.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`),s.$$.dirty[0]&524288&&r(70,Na=`select
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
  and substr(d.area_code, 1, 4) = '${g.code}'
  and d.reference_year = (
      select max(reference_year) from gentriduck_marts.mart_area_demographics
      where city_code = 'BER' and area_level = 'bzr'
  )
order by d.residents_total desc nulls last`),s.$$.dirty[2]&960&&(le||!ha?le||(ba(Na,{noResolve:le,...$e}),r(71,ha=!0)):ba(Na,{noResolve:le})),s.$$.dirty[0]&1&&r(73,a=((B=wa==null?void 0:wa[0])==null?void 0:B.area_name)??null),s.$$.dirty[0]&2|s.$$.dirty[2]&2048&&r(15,n=[{label:"Berlin",href:"/berlin"},{label:"District & area profiles",href:"/berlin/area/bezirk"},...(Ra=Re==null?void 0:Re[0])!=null&&Ra.bezirk_code?[{label:Re[0].bezirk_name,href:"/berlin/area/bezirk/"+Re[0].bezirk_code}]:[],{label:a??"Prognoseraum"}]),s.$$.dirty[2]&2048&&r(14,o=a?`${a} — Prognoseraum profile · Berlin`:null),s.$$.dirty[0]&4&&r(72,c=ka==null?void 0:ka[0]),s.$$.dirty[2]&1024&&r(13,_=!c||c.n_total==null||Number(c.n_total)===0?null:(()=>{const ya=Number(c.n_total),st=Number(c.n_advanced||0),Ye=c.top_stage_share!=null?Number(c.top_stage_share):null,it=Ye!=null&&Ye>.5?`<b>${c.top_stage}</b> is the only stage holding a majority (${Math.round(Ye*100)}%)`:"no single stage holds a majority";return`<b>${st}</b> of <b>${ya}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${it} — a distribution across this Prognoseraum's own neighbourhoods, never a single re-scored gentrification-index value for the Prognoseraum itself.`})())},[wa,Re,ka,_e,He,ja,Ya,rt,Ue,We,nt,Aa,Oa,_,o,n,x,f,$,g,we,Xe,ke,Sa,Be,oe,Pa,Se,Pe,be,Ce,de,ce,Le,pe,Ca,oa,je,Me,La,la,De,ye,_a,A,I,Fe,ca,ma,Ie,ge,Ma,Oe,me,ua,Ha,ue,Ke,Qe,Da,pa,Ze,he,Fa,fe,Ve,ve,Je,$e,le,Na,ha,c,a,u]}class es extends Nr{constructor(t){super(),Or(this,t,Mn,jn,Lr,{data:16},null,[-1,-1,-1,-1])}}export{es as component};
