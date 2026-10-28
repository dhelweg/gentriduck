import{s as Lr,d as _,i as d,a as se,b as E,c as b,h as Hr,e as z,f as zt,g as na,j as C,k as H,l as v,m as q,t as j,n as mr,o as Mr,p as Dr,q as Pr,r as Fr,u as F,v as Ar,H as Ir,w as Ya}from"../chunks/scheduler.CmMeO4ay.js";import{S as Nr,i as Or,d as w,t as h,a as u,c as ne,m as k,b as R,e as B,g as ie}from"../chunks/index.bfDa0Uqw.js";import{A as Ur,P as Qr,a as Wr}from"../chunks/PageTitle.nASIZfTP.js";import{F as Zr}from"../chunks/FooterNav.BbND9dxm.js";import{H as Kr}from"../chunks/Hero.wYia6TQ0.js";import{D as Ht,C as Xe}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as mt,w as Vr}from"../chunks/entry.vKQYRLhF.js";import{A as $a}from"../chunks/Alert.BNZjDqvU.js";import{e as Jr,s as Yr,Q as xe,p as Gr,a as ur,r as fr,C as Xr}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as D}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as pr,a as va}from"../chunks/Dropdown.zhownQxu.js";import{p as en}from"../chunks/stores.CGa44sBH.js";import{Q as ze}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as Dt}from"../chunks/BarChart.BZFK7Gke.js";import{B as Mt}from"../chunks/BigValue.Cf_smc5N.js";import{p as an}from"../chunks/profile.BW8tN6E9.js";function tn(i){var n;let t,r=(L.title??((n=L.og)==null?void 0:n.title))+"",a;return{c(){t=q("h1"),a=j(r),this.h()},l(l){t=z(l,"H1",{class:!0});var c=na(t);a=C(c,r),c.forEach(_),this.h()},h(){E(t,"class","title")},m(l,c){d(l,t,c),se(t,a)},p:F,d(l){l&&_(t)}}}function rn(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:F,p:F,d:F}}function nn(i){var c;let t,r,a,n,l;return document.title=t=L.title??((c=L.og)==null?void 0:c.title),{c(){r=v(),a=q("meta"),n=v(),l=q("meta"),this.h()},l(o){r=b(o),a=z(o,"META",{property:!0,content:!0}),n=b(o),l=z(o,"META",{name:!0,content:!0}),this.h()},h(){var o,m;E(a,"property","og:title"),E(a,"content",((o=L.og)==null?void 0:o.title)??L.title),E(l,"name","twitter:title"),E(l,"content",((m=L.og)==null?void 0:m.title)??L.title)},m(o,m){d(o,r,m),d(o,a,m),d(o,n,m),d(o,l,m)},p(o,m){var y;m&0&&t!==(t=L.title??((y=L.og)==null?void 0:y.title))&&(document.title=t)},d(o){o&&(_(r),_(a),_(n),_(l))}}}function sn(i){var l,c;let t,r,a=(L.description||((l=L.og)==null?void 0:l.description))&&on(),n=((c=L.og)==null?void 0:c.image)&&ln();return{c(){a&&a.c(),t=v(),n&&n.c(),r=zt()},l(o){a&&a.l(o),t=b(o),n&&n.l(o),r=zt()},m(o,m){a&&a.m(o,m),d(o,t,m),n&&n.m(o,m),d(o,r,m)},p(o,m){var y,x;(L.description||(y=L.og)!=null&&y.description)&&a.p(o,m),(x=L.og)!=null&&x.image&&n.p(o,m)},d(o){o&&(_(t),_(r)),a&&a.d(o),n&&n.d(o)}}}function on(i){let t,r,a,n,l;return{c(){t=q("meta"),r=v(),a=q("meta"),n=v(),l=q("meta"),this.h()},l(c){t=z(c,"META",{name:!0,content:!0}),r=b(c),a=z(c,"META",{property:!0,content:!0}),n=b(c),l=z(c,"META",{name:!0,content:!0}),this.h()},h(){var c,o,m;E(t,"name","description"),E(t,"content",L.description??((c=L.og)==null?void 0:c.description)),E(a,"property","og:description"),E(a,"content",((o=L.og)==null?void 0:o.description)??L.description),E(l,"name","twitter:description"),E(l,"content",((m=L.og)==null?void 0:m.description)??L.description)},m(c,o){d(c,t,o),d(c,r,o),d(c,a,o),d(c,n,o),d(c,l,o)},p:F,d(c){c&&(_(t),_(r),_(a),_(n),_(l))}}}function ln(i){let t,r,a;return{c(){t=q("meta"),r=v(),a=q("meta"),this.h()},l(n){t=z(n,"META",{property:!0,content:!0}),r=b(n),a=z(n,"META",{name:!0,content:!0}),this.h()},h(){var n,l;E(t,"property","og:image"),E(t,"content",ur((n=L.og)==null?void 0:n.image)),E(a,"name","twitter:image"),E(a,"content",ur((l=L.og)==null?void 0:l.image))},m(n,l){d(n,t,l),d(n,r,l),d(n,a,l)},p:F,d(n){n&&(_(t),_(r),_(a))}}}function gr(i){let t,r;return t=new ze({props:{queryID:"bzr_name",queryResult:i[0]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&1&&(l.queryResult=a[0]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function hr(i){let t,r;return t=new ze({props:{queryID:"pgr_name",queryResult:i[1]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&2&&(l.queryResult=a[1]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function _n(i){let t,r="Prognoseraum profile";return{c(){t=q("a"),t.textContent=r,this.h()},l(a){t=z(a,"A",{href:!0,"data-svelte-h":!0}),H(t)!=="svelte-1u8s2sp"&&(t.textContent=r),this.h()},h(){E(t,"href","/gentriduck/berlin/area/bezirk")},m(a,n){d(a,t,n)},p:F,d(a){a&&_(t)}}}function dn(i){let t,r=i[1][0].area_name+"",a,n;return{c(){t=q("a"),a=j(r),this.h()},l(l){t=z(l,"A",{href:!0});var c=na(t);a=C(c,r),c.forEach(_),this.h()},h(){E(t,"href",n="/gentriduck/berlin/area/pgr/"+i[1][0].area_code)},m(l,c){d(l,t,c),se(t,a)},p(l,c){c[0]&2&&r!==(r=l[1][0].area_name+"")&&Ya(a,r),c[0]&2&&n!==(n="/gentriduck/berlin/area/pgr/"+l[1][0].area_code)&&E(t,"href",n)},d(l){l&&_(t)}}}function cn(i){let t,r,a="sums and population-weighted averages",n,l,c="methodology page",o;return{c(){t=j("Figures on this page are "),r=q("b"),r.textContent=a,n=j(` of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  `),l=q("a"),l.textContent=c,o=j(" for why this coarser grain is not re-scored."),this.h()},l(m){t=C(m,"Figures on this page are "),r=z(m,"B",{"data-svelte-h":!0}),H(r)!=="svelte-rhlwxq"&&(r.textContent=a),n=C(m,` of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  `),l=z(m,"A",{href:!0,"data-svelte-h":!0}),H(l)!=="svelte-1l2pw3"&&(l.textContent=c),o=C(m," for why this coarser grain is not re-scored."),this.h()},h(){E(l,"href","/gentriduck/methodology")},m(m,y){d(m,t,y),d(m,r,y),d(m,n,y),d(m,l,y),d(m,o,y)},p:F,d(m){m&&(_(t),_(r),_(n),_(l),_(o))}}}function yr(i){let t,r;return t=new ze({props:{queryID:"stage_mix",queryResult:i[3]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&8&&(l.queryResult=a[3]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function br(i){let t,r;return t=new ze({props:{queryID:"stage_mix_summary",queryResult:i[2]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&4&&(l.queryResult=a[2]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function mn(i){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[fn]},$$scope:{ctx:i}}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[3]&4&&(l.$$scope={dirty:n,ctx:a}),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function un(i){let t,r;return{c(){t=q("p"),r=new Ir(!1),this.h()},l(a){t=z(a,"P",{});var n=na(t);r=Ar(n,!1),n.forEach(_),this.h()},h(){r.a=null},m(a,n){d(a,t,n),r.m(i[13],t)},p(a,n){n[0]&8192&&r.p(a[13])},i:F,o:F,d(a){a&&_(t)}}}function fn(i){let t;return{c(){t=j("No neighbourhood-stage data available for this area.")},l(r){t=C(r,"No neighbourhood-stage data available for this area.")},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function vr(i){let t,r;return t=new ze({props:{queryID:"poi_mix",queryResult:i[4]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&16&&(l.queryResult=a[4]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function pn(i){let t,r="Bezirksregion (BZR) is this project's recommended public headline scale",a,n,l="Offering Advantage decoder",c;return{c(){t=q("b"),t.textContent=r,a=j(` for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  `),n=q("a"),n.textContent=l,c=j(` for the full "dial, not a ladder"
  framing.`),this.h()},l(o){t=z(o,"B",{"data-svelte-h":!0}),H(t)!=="svelte-9u1cbs"&&(t.textContent=r),a=C(o,` for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  `),n=z(o,"A",{href:!0,"data-svelte-h":!0}),H(n)!=="svelte-168mye8"&&(n.textContent=l),c=C(o,` for the full "dial, not a ladder"
  framing.`),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(o,m){d(o,t,m),d(o,a,m),d(o,n,m),d(o,c,m)},p:F,d(o){o&&(_(t),_(a),_(n),_(c))}}}function $r(i){let t,r;return t=new ze({props:{queryID:"oa_arealevel",queryResult:i[5]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&32&&(l.queryResult=a[5]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function wr(i){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[gn]},$$scope:{ctx:i}}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function gn(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,n,l="Offering Advantage decoder",c;return{c(){t=q("b"),t.textContent=r,a=j(` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=q("a"),n.textContent=l,c=j(" §4/§7 for the full finding."),this.h()},l(o){t=z(o,"B",{"data-svelte-h":!0}),H(t)!=="svelte-1impqbu"&&(t.textContent=r),a=C(o,` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=z(o,"A",{href:!0,"data-svelte-h":!0}),H(n)!=="svelte-168mye8"&&(n.textContent=l),c=C(o," §4/§7 for the full finding."),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(o,m){d(o,t,m),d(o,a,m),d(o,n,m),d(o,c,m)},p:F,d(o){o&&(_(t),_(a),_(n),_(c))}}}function hn(i){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[bn]},$$scope:{ctx:i}}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[3]&4&&(l.$$scope={dirty:n,ctx:a}),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function yn(i){let t,r;return t=new Dt({props:{data:i[5],x:"poi_domain_h",y:"pct_vs_baseline",title:"Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this Bezirksregion."}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&32&&(l.data=a[5]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function bn(i){let t;return{c(){t=j("No Offering Advantage data for this Bezirksregion.")},l(r){t=C(r,"No Offering Advantage data for this Bezirksregion.")},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function kr(i){let t,r;return t=new $a({props:{status:"info",$$slots:{default:[vn]},$$scope:{ctx:i}}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function vn(i){let t;return{c(){t=j(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=C(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function $n(i){let t,r="Dominance is sign-blind",a,n,l="Offering Advantage decoder",c;return{c(){t=q("b"),t.textContent=r,a=j(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=q("a"),n.textContent=l,c=j(" §5 for the full ethics note."),this.h()},l(o){t=z(o,"B",{"data-svelte-h":!0}),H(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=C(o,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=z(o,"A",{href:!0,"data-svelte-h":!0}),H(n)!=="svelte-168mye8"&&(n.textContent=l),c=C(o," §5 for the full ethics note."),this.h()},h(){E(n,"href","/gentriduck/methodology-oa-modes")},m(o,m){d(o,t,m),d(o,a,m),d(o,n,m),d(o,c,m)},p:F,d(o){o&&(_(t),_(a),_(n),_(c))}}}function wn(i){let t,r,a,n,l,c,o,m;return t=new va({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new va({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),l=new va({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),o=new va({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){B(t.$$.fragment),r=v(),B(a.$$.fragment),n=v(),B(l.$$.fragment),c=v(),B(o.$$.fragment)},l(y){R(t.$$.fragment,y),r=b(y),R(a.$$.fragment,y),n=b(y),R(l.$$.fragment,y),c=b(y),R(o.$$.fragment,y)},m(y,x){k(t,y,x),d(y,r,x),k(a,y,x),d(y,n,x),k(l,y,x),d(y,c,x),k(o,y,x),m=!0},p:F,i(y){m||(u(t.$$.fragment,y),u(a.$$.fragment,y),u(l.$$.fragment,y),u(o.$$.fragment,y),m=!0)},o(y){h(t.$$.fragment,y),h(a.$$.fragment,y),h(l.$$.fragment,y),h(o.$$.fragment,y),m=!1},d(y){y&&(_(r),_(n),_(c)),w(t,y),w(a,y),w(l,y),w(o,y)}}}function kn(i){let t,r,a,n,l,c,o,m,y,x,f,M;return t=new va({props:{value:"2025",valueLabel:"2025"}}),a=new va({props:{value:"2024",valueLabel:"2024"}}),l=new va({props:{value:"2023",valueLabel:"2023"}}),o=new va({props:{value:"2022",valueLabel:"2022"}}),y=new va({props:{value:"2021",valueLabel:"2021"}}),f=new va({props:{value:"2020",valueLabel:"2020"}}),{c(){B(t.$$.fragment),r=v(),B(a.$$.fragment),n=v(),B(l.$$.fragment),c=v(),B(o.$$.fragment),m=v(),B(y.$$.fragment),x=v(),B(f.$$.fragment)},l(p){R(t.$$.fragment,p),r=b(p),R(a.$$.fragment,p),n=b(p),R(l.$$.fragment,p),c=b(p),R(o.$$.fragment,p),m=b(p),R(y.$$.fragment,p),x=b(p),R(f.$$.fragment,p)},m(p,$){k(t,p,$),d(p,r,$),k(a,p,$),d(p,n,$),k(l,p,$),d(p,c,$),k(o,p,$),d(p,m,$),k(y,p,$),d(p,x,$),k(f,p,$),M=!0},p:F,i(p){M||(u(t.$$.fragment,p),u(a.$$.fragment,p),u(l.$$.fragment,p),u(o.$$.fragment,p),u(y.$$.fragment,p),u(f.$$.fragment,p),M=!0)},o(p){h(t.$$.fragment,p),h(a.$$.fragment,p),h(l.$$.fragment,p),h(o.$$.fragment,p),h(y.$$.fragment,p),h(f.$$.fragment,p),M=!1},d(p){p&&(_(r),_(n),_(c),_(m),_(x)),w(t,p),w(a,p),w(l,p),w(o,p),w(y,p),w(f,p)}}}function Rr(i){let t,r;return t=new ze({props:{queryID:"dom_suppressed_count",queryResult:i[6]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&64&&(l.queryResult=a[6]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Rn(i){let t,r=(i[6][0]?i[6][0].n_suppressed:0)+"",a,n,l=(i[6][0]?i[6][0].n_suppressed+i[6][0].n_shown:0)+"",c,o,m;return{c(){t=q("b"),a=j(r),n=j(" of "),c=j(l),o=j(" neighbourhoods here are suppressed below as too thinly observed to characterize"),m=j(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(y){t=z(y,"B",{});var x=na(t);a=C(x,r),n=C(x," of "),c=C(x,l),o=C(x," neighbourhoods here are suppressed below as too thinly observed to characterize"),x.forEach(_),m=C(y,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(y,x){d(y,t,x),se(t,a),se(t,n),se(t,c),se(t,o),d(y,m,x)},p(y,x){x[0]&64&&r!==(r=(y[6][0]?y[6][0].n_suppressed:0)+"")&&Ya(a,r),x[0]&64&&l!==(l=(y[6][0]?y[6][0].n_suppressed+y[6][0].n_shown:0)+"")&&Ya(c,l)},d(y){y&&(_(t),_(m))}}}function Br(i){let t,r;return t=new ze({props:{queryID:"dominance_children",queryResult:i[7]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&128&&(l.queryResult=a[7]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Bn(i){let t,r,a,n,l,c,o,m,y,x,f,M;return t=new Xe({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new Xe({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),l=new Xe({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),o=new Xe({props:{id:"top_child",title:"Leading type"}}),y=new Xe({props:{id:"n_children",title:"Types in this group here"}}),f=new Xe({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){B(t.$$.fragment),r=v(),B(a.$$.fragment),n=v(),B(l.$$.fragment),c=v(),B(o.$$.fragment),m=v(),B(y.$$.fragment),x=v(),B(f.$$.fragment)},l(p){R(t.$$.fragment,p),r=b(p),R(a.$$.fragment,p),n=b(p),R(l.$$.fragment,p),c=b(p),R(o.$$.fragment,p),m=b(p),R(y.$$.fragment,p),x=b(p),R(f.$$.fragment,p)},m(p,$){k(t,p,$),d(p,r,$),k(a,p,$),d(p,n,$),k(l,p,$),d(p,c,$),k(o,p,$),d(p,m,$),k(y,p,$),d(p,x,$),k(f,p,$),M=!0},p:F,i(p){M||(u(t.$$.fragment,p),u(a.$$.fragment,p),u(l.$$.fragment,p),u(o.$$.fragment,p),u(y.$$.fragment,p),u(f.$$.fragment,p),M=!0)},o(p){h(t.$$.fragment,p),h(a.$$.fragment,p),h(l.$$.fragment,p),h(o.$$.fragment,p),h(y.$$.fragment,p),h(f.$$.fragment,p),M=!1},d(p){p&&(_(r),_(n),_(c),_(m),_(x)),w(t,p),w(a,p),w(l,p),w(o,p),w(y,p),w(f,p)}}}function Er(i){let t,r;return t=new ze({props:{queryID:"demographics",queryResult:i[8]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&256&&(l.queryResult=a[8]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function xr(i){let t,r;return t=new $a({props:{status:"warning",$$slots:{default:[En]},$$scope:{ctx:i}}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function En(i){let t;return{c(){t=j(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},l(r){t=C(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function zr(i){let t,r;return t=new ze({props:{queryID:"amenities_current",queryResult:i[9]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&512&&(l.queryResult=a[9]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function qr(i){let t,r;return t=new ze({props:{queryID:"amenities_table",queryResult:i[10]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&1024&&(l.queryResult=a[10]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function xn(i){let t;return{c(){t=j("No amenity data is available for this area yet.")},l(r){t=C(r,"No amenity data is available for this area yet.")},m(r,a){d(r,t,a)},p:F,d(r){r&&_(t)}}}function zn(i){let t,r,a=i[9][0].snapshot_year+"",n,l;return{c(){t=j("Based on OpenStreetMap tagging as of "),r=q("b"),n=j(a),l=j(`, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(c){t=C(c,"Based on OpenStreetMap tagging as of "),r=z(c,"B",{});var o=na(r);n=C(o,a),o.forEach(_),l=C(c,`, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(c,o){d(c,t,o),d(c,r,o),se(r,n),d(c,l,o)},p(c,o){o[0]&512&&a!==(a=c[9][0].snapshot_year+"")&&Ya(n,a)},d(c){c&&(_(t),_(r),_(l))}}}function qn(i){let t,r,a,n,l,c;return t=new Xe({props:{id:"indicator",title:"Infrastructure"}}),a=new Xe({props:{id:"area_value",title:"This Bezirksregion"}}),l=new Xe({props:{id:"district_value",title:"District total"}}),{c(){B(t.$$.fragment),r=v(),B(a.$$.fragment),n=v(),B(l.$$.fragment)},l(o){R(t.$$.fragment,o),r=b(o),R(a.$$.fragment,o),n=b(o),R(l.$$.fragment,o)},m(o,m){k(t,o,m),d(o,r,m),k(a,o,m),d(o,n,m),k(l,o,m),c=!0},p:F,i(o){c||(u(t.$$.fragment,o),u(a.$$.fragment,o),u(l.$$.fragment,o),c=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),h(l.$$.fragment,o),c=!1},d(o){o&&(_(r),_(n)),w(t,o),w(a,o),w(l,o)}}}function Tn(i){let t,r,a="0",n,l,c="open-data",o;return{c(){t=j("These figures come from OpenStreetMap tagging, not an official registry. A "),r=q("b"),r.textContent=a,n=j(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),l=q("a"),l.textContent=c,o=j(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(m){t=C(m,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=z(m,"B",{"data-svelte-h":!0}),H(r)!=="svelte-12bhsds"&&(r.textContent=a),n=C(m,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),l=z(m,"A",{href:!0,"data-svelte-h":!0}),H(l)!=="svelte-1jijq3i"&&(l.textContent=c),o=C(m,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){E(l,"href","/gentriduck/open-data")},m(m,y){d(m,t,y),d(m,r,y),d(m,n,y),d(m,l,y),d(m,o,y)},p:F,d(m){m&&(_(t),_(r),_(n),_(l),_(o))}}}function Sn(i){let t;return{c(){t=j(`There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=C(r,`There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){d(r,t,a)},p:F,d(r){r&&_(t)}}}function Cn(i){let t,r,a=i[9][0].gastro_poi_with_cuisine_count+"",n,l;return{c(){t=j("Cuisine is tagged for "),r=q("b"),n=j(a),l=j(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(c){t=C(c,"Cuisine is tagged for "),r=z(c,"B",{});var o=na(r);n=C(o,a),o.forEach(_),l=C(c,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(c,o){d(c,t,o),d(c,r,o),se(r,n),d(c,l,o)},p(c,o){o[0]&512&&a!==(a=c[9][0].gastro_poi_with_cuisine_count+"")&&Ya(n,a)},d(c){c&&(_(t),_(r),_(l))}}}function jn(i){let t,r,a=i[9][0].gastro_poi_with_cuisine_count+"",n,l,c,o="most common cuisine",m,y,x=i[9][0].dominant_cuisine+"",f,M,p=Math.round(i[9][0].dominant_cuisine_share*100)+"",$,ia;return{c(){t=j("Among "),r=q("b"),n=j(a),l=j(` restaurants/cafes with cuisine
data tagged in this Bezirksregion, the `),c=q("b"),c.textContent=o,m=j(` is
`),y=q("b"),f=j(x),M=j(`
(`),$=j(p),ia=j("% of cuisine-tagged restaurants/cafes).")},l(S){t=C(S,"Among "),r=z(S,"B",{});var g=na(r);n=C(g,a),g.forEach(_),l=C(S,` restaurants/cafes with cuisine
data tagged in this Bezirksregion, the `),c=z(S,"B",{"data-svelte-h":!0}),H(c)!=="svelte-1floooe"&&(c.textContent=o),m=C(S,` is
`),y=z(S,"B",{});var we=na(y);f=C(we,x),we.forEach(_),M=C(S,`
(`),$=C(S,p),ia=C(S,"% of cuisine-tagged restaurants/cafes).")},m(S,g){d(S,t,g),d(S,r,g),se(r,n),d(S,l,g),d(S,c,g),d(S,m,g),d(S,y,g),se(y,f),d(S,M,g),d(S,$,g),d(S,ia,g)},p(S,g){g[0]&512&&a!==(a=S[9][0].gastro_poi_with_cuisine_count+"")&&Ya(n,a),g[0]&512&&x!==(x=S[9][0].dominant_cuisine+"")&&Ya(f,x),g[0]&512&&p!==(p=Math.round(S[9][0].dominant_cuisine_share*100)+"")&&Ya($,p)},d(S){S&&(_(t),_(r),_(l),_(c),_(m),_(y),_(M),_($),_(ia))}}}function Tr(i){let t,r;return t=new ze({props:{queryID:"minimap_areas",queryResult:i[11]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&2048&&(l.queryResult=a[11]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Sr(i){let t,r;return t=new ze({props:{queryID:"children",queryResult:i[12]}}),{c(){B(t.$$.fragment)},l(a){R(t.$$.fragment,a)},m(a,n){k(t,a,n),r=!0},p(a,n){const l={};n[0]&4096&&(l.queryResult=a[12]),t.$set(l)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){w(t,a)}}}function Ln(i){let t,r,a,n,l,c;return t=new Xe({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new Xe({props:{id:"stage",title:"Stage"}}),l=new Xe({props:{id:"pressure_trend",title:"Pressure trend"}}),{c(){B(t.$$.fragment),r=v(),B(a.$$.fragment),n=v(),B(l.$$.fragment)},l(o){R(t.$$.fragment,o),r=b(o),R(a.$$.fragment,o),n=b(o),R(l.$$.fragment,o)},m(o,m){k(t,o,m),d(o,r,m),k(a,o,m),d(o,n,m),k(l,o,m),c=!0},p:F,i(o){c||(u(t.$$.fragment,o),u(a.$$.fragment,o),u(l.$$.fragment,o),c=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),h(l.$$.fragment,o),c=!1},d(o){o&&(_(r),_(n)),w(t,o),w(a,o),w(l,o)}}}function Hn(i){var Gt;let t,r,a,n,l,c,o,m,y,x,f,M,p,$,ia,S,g,we="all districts",ea,ke,wa="full neighbourhood list",Sa,qe,Te,oe,Ca='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Re,Se,tt=`Every neighbourhood (Planungsraum) in this Bezirksregion is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This page reports the <strong class="markdown">distribution</strong> of
those neighbourhood-level stages — never a single re-scored index value for the Bezirksregion
itself, since averaging ordinal stage codes across such different neighbourhoods would mask exactly
the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see &quot;Honest
caveats&quot; below).`,Ce,ye,je,_e,de,sa,ce,Le,pe,ka='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ja,Be,oa='<a href="#mapped-places">Mapped places</a>',He,Me,De,La,Ee,la='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',Pe,be,Ha,_a,da,A,I,Fe,Ga=i[5].some(Cr),ca,Ae,ma=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule.`,Ie,ge,rt='<a href="#within-group-dominance">Within-group dominance</a>',Ma,Ne,Oe,me,ua,Ue,Da,fa,ue,Qe,We,Ze,Pa,Ke,pa=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Ve,he,nt='<a href="#people--structure">People &amp; structure</a>',Fa,ga,fe,Je,ve,Aa,Ye,Ia,$e,le,Na='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Oa,ha,ya,T,Ra,ba,it,Ge,st,Xa,ut,et,Pt=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,ft,Ba,Ft='<a href="#where-this-area-sits">Where this area sits</a>',pt,ot,Ua,gt,Ea,At='<a href="#neighbourhoods-planungsräume-in-this-bezirksregion">Neighbourhoods (Planungsräume) in this Bezirksregion</a>',ht,lt,Qa,yt,xa,It='<a href="#honest-caveats">Honest caveats</a>',bt,Wa,Nt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Bezirksregion</strong> —
only the distribution of its constituent neighbourhoods&#39; (Planungsräume) own stages. A population-
weighted average of ordinal stage/Dynamik classes would violate this project&#39;s own &quot;never average
ordinal class codes&quot; rule and would describe no actual neighbourhood while masking exactly the
frontier heterogeneity gentrification tracking depends on (see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code>,
both <strong class="markdown">decline</strong> the coarse-grain point value).</li> <li class="markdown"><strong class="markdown">Offering Advantage and within-group dominance figures on this page describe the whole pooled
Bezirksregion, not any one neighbourhood inside it</strong> — see the MAUP fragility disclosure above, and
the <a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> before comparing areas.</li> <li class="markdown">Figures on this page are <strong class="markdown">sums and population-weighted averages</strong> of this Bezirksregion&#39;s
neighbourhoods, never observed at the Bezirksregion level itself. Land value and estimated rent
are only published at the individual-neighbourhood grain — see any neighbourhood&#39;s own page
(linked above) for those figures.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,vt,za,Ot='<a href="#further-reading">Further reading</a>',$t,Za,Ut=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other areas, or drill into any of this Bezirksregion&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,wt,_t,kt,at,Rt,qa=typeof L<"u"&&(L.title||((Gt=L.og)==null?void 0:Gt.title))&&L.hide_title!==!0&&tn();function jr(e,s){var P;return typeof L<"u"&&(L.title||(P=L.og)!=null&&P.title)?nn:rn}let dt=jr()(i),Ta=typeof L=="object"&&sn(),N=i[0]&&gr(i),O=i[1]&&hr(i);m=new Ur({props:{crumbs:i[15]}}),x=new Qr({props:{title:i[14]}}),M=new Kr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(i[0][0]&&i[0][0].area_name)+" — Bezirksregion profile",lede:"Population, composition, and neighbourhood-stage mix for this Bezirksregion, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain."}});function Qt(e,s){var P;return(P=e[1][0])!=null&&P.area_code?dn:_n}let Bt=Qt(i),aa=Bt(i);qe=new $a({props:{status:"info",$$slots:{default:[cn]},$$scope:{ctx:i}}});let U=i[3]&&yr(i),Q=i[2]&&br(i);const Wt=[un,mn],Ka=[];function Zt(e,s){return e[13]?0:1}_e=Zt(i),de=Ka[_e]=Wt[_e](i),ce=new Dt({props:{data:i[3],x:"stage",y:"n_areas",title:"Neighbourhoods by stage",swapXY:"true"}});let W=i[4]&&vr(i);De=new Dt({props:{data:i[4],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot)",swapXY:"true"}}),be=new $a({props:{status:"info",$$slots:{default:[pn]},$$scope:{ctx:i}}});let Z=i[5]&&$r(i),ae=i[5][0]&&i[5][0].maup_caveat_required&&wr(i);const Kt=[yn,hn],Va=[];function Vt(e,s){return e[5].length>0?0:1}A=Vt(i),I=Va[A]=Kt[A](i);let te=Ga&&kr(i);Ne=new $a({props:{status:"info",$$slots:{default:[$n]},$$scope:{ctx:i}}}),me=new pr({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[wn]},$$scope:{ctx:i}}}),Ue=new pr({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[kn]},$$scope:{ctx:i}}});let K=i[6]&&Rr(i);ue=new $a({props:{status:"info",$$slots:{default:[Rn]},$$scope:{ctx:i}}});let V=i[7]&&Br(i);Ze=new Ht({props:{data:i[7],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Bezirksregion.",$$slots:{default:[Bn]},$$scope:{ctx:i}}});let J=i[8]&&Er(i);fe=new Mt({props:{data:i[8],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),ve=new Mt({props:{data:i[8],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),Ye=new Mt({props:{data:i[8],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let re=i[8]&&i[8][0]&&i[8][0].any_indicator_suppressed&&xr(i),Y=i[9]&&zr(i),G=i[10]&&qr(i);function Jt(e,s){var P;return(P=e[9][0])!=null&&P.snapshot_year?zn:xn}let Et=Jt(i),ta=Et(i);ba=new Ht({props:{data:i[10],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[qn]},$$scope:{ctx:i}}}),Ge=new $a({props:{status:"info",$$slots:{default:[Tn]},$$scope:{ctx:i}}});function Yt(e,s){var P,Ja;return(P=e[9][0])!=null&&P.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8&&e[9][0].dominant_cuisine_share>=.15?jn:(Ja=e[9][0])!=null&&Ja.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8?Cn:Sn}let xt=Yt(i),ra=xt(i),X=i[11]&&Tr(i);Ua=new Wr({props:{data:i[11],geoJsonUrl:`${mt}/geo/bzr_plr_drilldown.geojson`,title:(i[0][0]?i[0][0].area_name:"This Bezirksregion")+" and its neighbourhoods"}});let ee=i[12]&&Sr(i);return Qa=new Ht({props:{data:i[12],rows:"20",link:"area_link",$$slots:{default:[Ln]},$$scope:{ctx:i}}}),at=new Zr({}),{c(){qa&&qa.c(),t=v(),dt.c(),r=q("meta"),a=q("meta"),Ta&&Ta.c(),n=zt(),l=v(),N&&N.c(),c=v(),O&&O.c(),o=v(),B(m.$$.fragment),y=v(),B(x.$$.fragment),f=v(),B(M.$$.fragment),p=v(),$=q("p"),ia=j("Up: "),aa.c(),S=j(" · "),g=q("a"),g.textContent=we,ea=j(" · "),ke=q("a"),ke.textContent=wa,Sa=v(),B(qe.$$.fragment),Te=v(),oe=q("h2"),oe.innerHTML=Ca,Re=v(),Se=q("p"),Se.innerHTML=tt,Ce=v(),U&&U.c(),ye=v(),Q&&Q.c(),je=v(),de.c(),sa=v(),B(ce.$$.fragment),Le=v(),pe=q("h2"),pe.innerHTML=ka,ja=v(),Be=q("h3"),Be.innerHTML=oa,He=v(),W&&W.c(),Me=v(),B(De.$$.fragment),La=v(),Ee=q("h3"),Ee.innerHTML=la,Pe=v(),B(be.$$.fragment),Ha=v(),Z&&Z.c(),_a=v(),ae&&ae.c(),da=v(),I.c(),Fe=v(),te&&te.c(),ca=v(),Ae=q("p"),Ae.innerHTML=ma,Ie=v(),ge=q("h2"),ge.innerHTML=rt,Ma=v(),B(Ne.$$.fragment),Oe=v(),B(me.$$.fragment),ua=v(),B(Ue.$$.fragment),Da=v(),K&&K.c(),fa=v(),B(ue.$$.fragment),Qe=v(),V&&V.c(),We=v(),B(Ze.$$.fragment),Pa=v(),Ke=q("p"),Ke.innerHTML=pa,Ve=v(),he=q("h2"),he.innerHTML=nt,Fa=v(),J&&J.c(),ga=v(),B(fe.$$.fragment),Je=v(),B(ve.$$.fragment),Aa=v(),B(Ye.$$.fragment),Ia=v(),re&&re.c(),$e=v(),le=q("h2"),le.innerHTML=Na,Oa=v(),Y&&Y.c(),ha=v(),G&&G.c(),ya=v(),T=q("p"),ta.c(),Ra=v(),B(ba.$$.fragment),it=v(),B(Ge.$$.fragment),st=v(),Xa=q("p"),ra.c(),ut=v(),et=q("p"),et.textContent=Pt,ft=v(),Ba=q("h2"),Ba.innerHTML=Ft,pt=v(),X&&X.c(),ot=v(),B(Ua.$$.fragment),gt=v(),Ea=q("h3"),Ea.innerHTML=At,ht=v(),ee&&ee.c(),lt=v(),B(Qa.$$.fragment),yt=v(),xa=q("h2"),xa.innerHTML=It,bt=v(),Wa=q("ul"),Wa.innerHTML=Nt,vt=v(),za=q("h2"),za.innerHTML=Ot,$t=v(),Za=q("p"),Za.innerHTML=Ut,wt=v(),_t=q("hr"),kt=v(),B(at.$$.fragment),this.h()},l(e){qa&&qa.l(e),t=b(e);const s=Hr("svelte-2igo1p",document.head);dt.l(s),r=z(s,"META",{name:!0,content:!0}),a=z(s,"META",{name:!0,content:!0}),Ta&&Ta.l(s),n=zt(),s.forEach(_),l=b(e),N&&N.l(e),c=b(e),O&&O.l(e),o=b(e),R(m.$$.fragment,e),y=b(e),R(x.$$.fragment,e),f=b(e),R(M.$$.fragment,e),p=b(e),$=z(e,"P",{});var P=na($);ia=C(P,"Up: "),aa.l(P),S=C(P," · "),g=z(P,"A",{href:!0,"data-svelte-h":!0}),H(g)!=="svelte-6j2qr0"&&(g.textContent=we),ea=C(P," · "),ke=z(P,"A",{href:!0,"data-svelte-h":!0}),H(ke)!=="svelte-z78e0k"&&(ke.textContent=wa),P.forEach(_),Sa=b(e),R(qe.$$.fragment,e),Te=b(e),oe=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(oe)!=="svelte-14f17uo"&&(oe.innerHTML=Ca),Re=b(e),Se=z(e,"P",{class:!0,"data-svelte-h":!0}),H(Se)!=="svelte-9cztr0"&&(Se.innerHTML=tt),Ce=b(e),U&&U.l(e),ye=b(e),Q&&Q.l(e),je=b(e),de.l(e),sa=b(e),R(ce.$$.fragment,e),Le=b(e),pe=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(pe)!=="svelte-1i9w9pn"&&(pe.innerHTML=ka),ja=b(e),Be=z(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H(Be)!=="svelte-3hvew3"&&(Be.innerHTML=oa),He=b(e),W&&W.l(e),Me=b(e),R(De.$$.fragment,e),La=b(e),Ee=z(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H(Ee)!=="svelte-5mc7pd"&&(Ee.innerHTML=la),Pe=b(e),R(be.$$.fragment,e),Ha=b(e),Z&&Z.l(e),_a=b(e),ae&&ae.l(e),da=b(e),I.l(e),Fe=b(e),te&&te.l(e),ca=b(e),Ae=z(e,"P",{class:!0,"data-svelte-h":!0}),H(Ae)!=="svelte-1q1lnxb"&&(Ae.innerHTML=ma),Ie=b(e),ge=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(ge)!=="svelte-4kb45v"&&(ge.innerHTML=rt),Ma=b(e),R(Ne.$$.fragment,e),Oe=b(e),R(me.$$.fragment,e),ua=b(e),R(Ue.$$.fragment,e),Da=b(e),K&&K.l(e),fa=b(e),R(ue.$$.fragment,e),Qe=b(e),V&&V.l(e),We=b(e),R(Ze.$$.fragment,e),Pa=b(e),Ke=z(e,"P",{class:!0,"data-svelte-h":!0}),H(Ke)!=="svelte-1xa7bh7"&&(Ke.innerHTML=pa),Ve=b(e),he=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(he)!=="svelte-1mdzqzc"&&(he.innerHTML=nt),Fa=b(e),J&&J.l(e),ga=b(e),R(fe.$$.fragment,e),Je=b(e),R(ve.$$.fragment,e),Aa=b(e),R(Ye.$$.fragment,e),Ia=b(e),re&&re.l(e),$e=b(e),le=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(le)!=="svelte-12k6lqd"&&(le.innerHTML=Na),Oa=b(e),Y&&Y.l(e),ha=b(e),G&&G.l(e),ya=b(e),T=z(e,"P",{});var Ja=na(T);ta.l(Ja),Ja.forEach(_),Ra=b(e),R(ba.$$.fragment,e),it=b(e),R(Ge.$$.fragment,e),st=b(e),Xa=z(e,"P",{});var ct=na(Xa);ra.l(ct),ct.forEach(_),ut=b(e),et=z(e,"P",{"data-svelte-h":!0}),H(et)!=="svelte-ja6pm6"&&(et.textContent=Pt),ft=b(e),Ba=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ba)!=="svelte-60cjj9"&&(Ba.innerHTML=Ft),pt=b(e),X&&X.l(e),ot=b(e),R(Ua.$$.fragment,e),gt=b(e),Ea=z(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H(Ea)!=="svelte-fqpmt1"&&(Ea.innerHTML=At),ht=b(e),ee&&ee.l(e),lt=b(e),R(Qa.$$.fragment,e),yt=b(e),xa=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(xa)!=="svelte-ad0syq"&&(xa.innerHTML=It),bt=b(e),Wa=z(e,"UL",{class:!0,"data-svelte-h":!0}),H(Wa)!=="svelte-1eqtvvm"&&(Wa.innerHTML=Nt),vt=b(e),za=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(za)!=="svelte-oimjns"&&(za.innerHTML=Ot),$t=b(e),Za=z(e,"P",{class:!0,"data-svelte-h":!0}),H(Za)!=="svelte-4b8jxq"&&(Za.innerHTML=Ut),wt=b(e),_t=z(e,"HR",{class:!0}),kt=b(e),R(at.$$.fragment,e),this.h()},h(){E(r,"name","twitter:card"),E(r,"content","summary_large_image"),E(a,"name","twitter:site"),E(a,"content","@evidence_dev"),E(g,"href","/gentriduck/berlin/area/bezirk"),E(ke,"href","/gentriduck/berlin/area"),E(oe,"class","markdown"),E(oe,"id","social-status--trajectory"),E(Se,"class","markdown"),E(pe,"class","markdown"),E(pe,"id","commercial-mix--offering-advantage"),E(Be,"class","markdown"),E(Be,"id","mapped-places"),E(Ee,"class","markdown"),E(Ee,"id","offering-advantage-across-the-area-hierarchy"),E(Ae,"class","markdown"),E(ge,"class","markdown"),E(ge,"id","within-group-dominance"),E(Ke,"class","markdown"),E(he,"class","markdown"),E(he,"id","people--structure"),E(le,"class","markdown"),E(le,"id","amenities--everyday-infrastructure"),E(Ba,"class","markdown"),E(Ba,"id","where-this-area-sits"),E(Ea,"class","markdown"),E(Ea,"id","neighbourhoods-planungsräume-in-this-bezirksregion"),E(xa,"class","markdown"),E(xa,"id","honest-caveats"),E(Wa,"class","markdown"),E(za,"class","markdown"),E(za,"id","further-reading"),E(Za,"class","markdown"),E(_t,"class","markdown")},m(e,s){qa&&qa.m(e,s),d(e,t,s),dt.m(document.head,null),se(document.head,r),se(document.head,a),Ta&&Ta.m(document.head,null),se(document.head,n),d(e,l,s),N&&N.m(e,s),d(e,c,s),O&&O.m(e,s),d(e,o,s),k(m,e,s),d(e,y,s),k(x,e,s),d(e,f,s),k(M,e,s),d(e,p,s),d(e,$,s),se($,ia),aa.m($,null),se($,S),se($,g),se($,ea),se($,ke),d(e,Sa,s),k(qe,e,s),d(e,Te,s),d(e,oe,s),d(e,Re,s),d(e,Se,s),d(e,Ce,s),U&&U.m(e,s),d(e,ye,s),Q&&Q.m(e,s),d(e,je,s),Ka[_e].m(e,s),d(e,sa,s),k(ce,e,s),d(e,Le,s),d(e,pe,s),d(e,ja,s),d(e,Be,s),d(e,He,s),W&&W.m(e,s),d(e,Me,s),k(De,e,s),d(e,La,s),d(e,Ee,s),d(e,Pe,s),k(be,e,s),d(e,Ha,s),Z&&Z.m(e,s),d(e,_a,s),ae&&ae.m(e,s),d(e,da,s),Va[A].m(e,s),d(e,Fe,s),te&&te.m(e,s),d(e,ca,s),d(e,Ae,s),d(e,Ie,s),d(e,ge,s),d(e,Ma,s),k(Ne,e,s),d(e,Oe,s),k(me,e,s),d(e,ua,s),k(Ue,e,s),d(e,Da,s),K&&K.m(e,s),d(e,fa,s),k(ue,e,s),d(e,Qe,s),V&&V.m(e,s),d(e,We,s),k(Ze,e,s),d(e,Pa,s),d(e,Ke,s),d(e,Ve,s),d(e,he,s),d(e,Fa,s),J&&J.m(e,s),d(e,ga,s),k(fe,e,s),d(e,Je,s),k(ve,e,s),d(e,Aa,s),k(Ye,e,s),d(e,Ia,s),re&&re.m(e,s),d(e,$e,s),d(e,le,s),d(e,Oa,s),Y&&Y.m(e,s),d(e,ha,s),G&&G.m(e,s),d(e,ya,s),d(e,T,s),ta.m(T,null),d(e,Ra,s),k(ba,e,s),d(e,it,s),k(Ge,e,s),d(e,st,s),d(e,Xa,s),ra.m(Xa,null),d(e,ut,s),d(e,et,s),d(e,ft,s),d(e,Ba,s),d(e,pt,s),X&&X.m(e,s),d(e,ot,s),k(Ua,e,s),d(e,gt,s),d(e,Ea,s),d(e,ht,s),ee&&ee.m(e,s),d(e,lt,s),k(Qa,e,s),d(e,yt,s),d(e,xa,s),d(e,bt,s),d(e,Wa,s),d(e,vt,s),d(e,za,s),d(e,$t,s),d(e,Za,s),d(e,wt,s),d(e,_t,s),d(e,kt,s),k(at,e,s),Rt=!0},p(e,s){var cr;typeof L<"u"&&(L.title||(cr=L.og)!=null&&cr.title)&&L.hide_title!==!0&&qa.p(e,s),dt.p(e,s),typeof L=="object"&&Ta.p(e,s),e[0]?N?(N.p(e,s),s[0]&1&&u(N,1)):(N=gr(e),N.c(),u(N,1),N.m(c.parentNode,c)):N&&(ie(),h(N,1,1,()=>{N=null}),ne()),e[1]?O?(O.p(e,s),s[0]&2&&u(O,1)):(O=hr(e),O.c(),u(O,1),O.m(o.parentNode,o)):O&&(ie(),h(O,1,1,()=>{O=null}),ne());const P={};s[0]&32768&&(P.crumbs=e[15]),m.$set(P);const Ja={};s[0]&16384&&(Ja.title=e[14]),x.$set(Ja);const ct={};s[0]&1&&(ct.title=(e[0][0]&&e[0][0].area_name)+" — Bezirksregion profile"),M.$set(ct),Bt===(Bt=Qt(e))&&aa?aa.p(e,s):(aa.d(1),aa=Bt(e),aa&&(aa.c(),aa.m($,S)));const Xt={};s[3]&4&&(Xt.$$scope={dirty:s,ctx:e}),qe.$set(Xt),e[3]?U?(U.p(e,s),s[0]&8&&u(U,1)):(U=yr(e),U.c(),u(U,1),U.m(ye.parentNode,ye)):U&&(ie(),h(U,1,1,()=>{U=null}),ne()),e[2]?Q?(Q.p(e,s),s[0]&4&&u(Q,1)):(Q=br(e),Q.c(),u(Q,1),Q.m(je.parentNode,je)):Q&&(ie(),h(Q,1,1,()=>{Q=null}),ne());let qt=_e;_e=Zt(e),_e===qt?Ka[_e].p(e,s):(ie(),h(Ka[qt],1,1,()=>{Ka[qt]=null}),ne(),de=Ka[_e],de?de.p(e,s):(de=Ka[_e]=Wt[_e](e),de.c()),u(de,1),de.m(sa.parentNode,sa));const er={};s[0]&8&&(er.data=e[3]),ce.$set(er),e[4]?W?(W.p(e,s),s[0]&16&&u(W,1)):(W=vr(e),W.c(),u(W,1),W.m(Me.parentNode,Me)):W&&(ie(),h(W,1,1,()=>{W=null}),ne());const ar={};s[0]&16&&(ar.data=e[4]),De.$set(ar);const tr={};s[3]&4&&(tr.$$scope={dirty:s,ctx:e}),be.$set(tr),e[5]?Z?(Z.p(e,s),s[0]&32&&u(Z,1)):(Z=$r(e),Z.c(),u(Z,1),Z.m(_a.parentNode,_a)):Z&&(ie(),h(Z,1,1,()=>{Z=null}),ne()),e[5][0]&&e[5][0].maup_caveat_required?ae?s[0]&32&&u(ae,1):(ae=wr(e),ae.c(),u(ae,1),ae.m(da.parentNode,da)):ae&&(ie(),h(ae,1,1,()=>{ae=null}),ne());let Tt=A;A=Vt(e),A===Tt?Va[A].p(e,s):(ie(),h(Va[Tt],1,1,()=>{Va[Tt]=null}),ne(),I=Va[A],I?I.p(e,s):(I=Va[A]=Kt[A](e),I.c()),u(I,1),I.m(Fe.parentNode,Fe)),s[0]&32&&(Ga=e[5].some(Cr)),Ga?te?s[0]&32&&u(te,1):(te=kr(e),te.c(),u(te,1),te.m(ca.parentNode,ca)):te&&(ie(),h(te,1,1,()=>{te=null}),ne());const rr={};s[3]&4&&(rr.$$scope={dirty:s,ctx:e}),Ne.$set(rr);const nr={};s[3]&4&&(nr.$$scope={dirty:s,ctx:e}),me.$set(nr);const ir={};s[3]&4&&(ir.$$scope={dirty:s,ctx:e}),Ue.$set(ir),e[6]?K?(K.p(e,s),s[0]&64&&u(K,1)):(K=Rr(e),K.c(),u(K,1),K.m(fa.parentNode,fa)):K&&(ie(),h(K,1,1,()=>{K=null}),ne());const sr={};s[0]&64|s[3]&4&&(sr.$$scope={dirty:s,ctx:e}),ue.$set(sr),e[7]?V?(V.p(e,s),s[0]&128&&u(V,1)):(V=Br(e),V.c(),u(V,1),V.m(We.parentNode,We)):V&&(ie(),h(V,1,1,()=>{V=null}),ne());const St={};s[0]&128&&(St.data=e[7]),s[3]&4&&(St.$$scope={dirty:s,ctx:e}),Ze.$set(St),e[8]?J?(J.p(e,s),s[0]&256&&u(J,1)):(J=Er(e),J.c(),u(J,1),J.m(ga.parentNode,ga)):J&&(ie(),h(J,1,1,()=>{J=null}),ne());const or={};s[0]&256&&(or.data=e[8]),fe.$set(or);const lr={};s[0]&256&&(lr.data=e[8]),ve.$set(lr);const _r={};s[0]&256&&(_r.data=e[8]),Ye.$set(_r),e[8]&&e[8][0]&&e[8][0].any_indicator_suppressed?re?s[0]&256&&u(re,1):(re=xr(e),re.c(),u(re,1),re.m($e.parentNode,$e)):re&&(ie(),h(re,1,1,()=>{re=null}),ne()),e[9]?Y?(Y.p(e,s),s[0]&512&&u(Y,1)):(Y=zr(e),Y.c(),u(Y,1),Y.m(ha.parentNode,ha)):Y&&(ie(),h(Y,1,1,()=>{Y=null}),ne()),e[10]?G?(G.p(e,s),s[0]&1024&&u(G,1)):(G=qr(e),G.c(),u(G,1),G.m(ya.parentNode,ya)):G&&(ie(),h(G,1,1,()=>{G=null}),ne()),Et===(Et=Jt(e))&&ta?ta.p(e,s):(ta.d(1),ta=Et(e),ta&&(ta.c(),ta.m(T,null)));const Ct={};s[0]&1024&&(Ct.data=e[10]),s[3]&4&&(Ct.$$scope={dirty:s,ctx:e}),ba.$set(Ct);const dr={};s[3]&4&&(dr.$$scope={dirty:s,ctx:e}),Ge.$set(dr),xt===(xt=Yt(e))&&ra?ra.p(e,s):(ra.d(1),ra=xt(e),ra&&(ra.c(),ra.m(Xa,null))),e[11]?X?(X.p(e,s),s[0]&2048&&u(X,1)):(X=Tr(e),X.c(),u(X,1),X.m(ot.parentNode,ot)):X&&(ie(),h(X,1,1,()=>{X=null}),ne());const jt={};s[0]&2048&&(jt.data=e[11]),s[0]&1&&(jt.title=(e[0][0]?e[0][0].area_name:"This Bezirksregion")+" and its neighbourhoods"),Ua.$set(jt),e[12]?ee?(ee.p(e,s),s[0]&4096&&u(ee,1)):(ee=Sr(e),ee.c(),u(ee,1),ee.m(lt.parentNode,lt)):ee&&(ie(),h(ee,1,1,()=>{ee=null}),ne());const Lt={};s[0]&4096&&(Lt.data=e[12]),s[3]&4&&(Lt.$$scope={dirty:s,ctx:e}),Qa.$set(Lt)},i(e){Rt||(u(N),u(O),u(m.$$.fragment,e),u(x.$$.fragment,e),u(M.$$.fragment,e),u(qe.$$.fragment,e),u(U),u(Q),u(de),u(ce.$$.fragment,e),u(W),u(De.$$.fragment,e),u(be.$$.fragment,e),u(Z),u(ae),u(I),u(te),u(Ne.$$.fragment,e),u(me.$$.fragment,e),u(Ue.$$.fragment,e),u(K),u(ue.$$.fragment,e),u(V),u(Ze.$$.fragment,e),u(J),u(fe.$$.fragment,e),u(ve.$$.fragment,e),u(Ye.$$.fragment,e),u(re),u(Y),u(G),u(ba.$$.fragment,e),u(Ge.$$.fragment,e),u(X),u(Ua.$$.fragment,e),u(ee),u(Qa.$$.fragment,e),u(at.$$.fragment,e),Rt=!0)},o(e){h(N),h(O),h(m.$$.fragment,e),h(x.$$.fragment,e),h(M.$$.fragment,e),h(qe.$$.fragment,e),h(U),h(Q),h(de),h(ce.$$.fragment,e),h(W),h(De.$$.fragment,e),h(be.$$.fragment,e),h(Z),h(ae),h(I),h(te),h(Ne.$$.fragment,e),h(me.$$.fragment,e),h(Ue.$$.fragment,e),h(K),h(ue.$$.fragment,e),h(V),h(Ze.$$.fragment,e),h(J),h(fe.$$.fragment,e),h(ve.$$.fragment,e),h(Ye.$$.fragment,e),h(re),h(Y),h(G),h(ba.$$.fragment,e),h(Ge.$$.fragment,e),h(X),h(Ua.$$.fragment,e),h(ee),h(Qa.$$.fragment,e),h(at.$$.fragment,e),Rt=!1},d(e){e&&(_(t),_(l),_(c),_(o),_(y),_(f),_(p),_($),_(Sa),_(Te),_(oe),_(Re),_(Se),_(Ce),_(ye),_(je),_(sa),_(Le),_(pe),_(ja),_(Be),_(He),_(Me),_(La),_(Ee),_(Pe),_(Ha),_(_a),_(da),_(Fe),_(ca),_(Ae),_(Ie),_(ge),_(Ma),_(Oe),_(ua),_(Da),_(fa),_(Qe),_(We),_(Pa),_(Ke),_(Ve),_(he),_(Fa),_(ga),_(Je),_(Aa),_(Ia),_($e),_(le),_(Oa),_(ha),_(ya),_(T),_(Ra),_(it),_(st),_(Xa),_(ut),_(et),_(ft),_(Ba),_(pt),_(ot),_(gt),_(Ea),_(ht),_(lt),_(yt),_(xa),_(bt),_(Wa),_(vt),_(za),_($t),_(Za),_(wt),_(_t),_(kt)),qa&&qa.d(e),dt.d(e),_(r),_(a),Ta&&Ta.d(e),_(n),N&&N.d(e),O&&O.d(e),w(m,e),w(x,e),w(M,e),aa.d(),w(qe,e),U&&U.d(e),Q&&Q.d(e),Ka[_e].d(e),w(ce,e),W&&W.d(e),w(De,e),w(be,e),Z&&Z.d(e),ae&&ae.d(e),Va[A].d(e),te&&te.d(e),w(Ne,e),w(me,e),w(Ue,e),K&&K.d(e),w(ue,e),V&&V.d(e),w(Ze,e),J&&J.d(e),w(fe,e),w(ve,e),w(Ye,e),re&&re.d(e),Y&&Y.d(e),G&&G.d(e),ta.d(),w(ba,e),w(Ge,e),ra.d(),X&&X.d(e),w(Ua,e),ee&&ee.d(e),w(Qa,e),w(at,e)}}}const L={},Cr=i=>i.oa_domain_min_base_flag;function Mn(i,t,r){let a,n,l,c,o,m,y;mr(i,en,T=>r(74,m=T)),mr(i,fr,T=>r(78,y=T));let{data:x}=t,{data:f={},customFormattingSettings:M,__db:p,inputs:$}=x;Mr(fr,y="a84918331b5c343c58cc632906369951",y);let ia=Jr(Vr($));Dr(ia.subscribe(T=>r(18,$=T))),Pr(Xr,{getCustomFormats:()=>M.customFormats||[]});const S=(T,Ra)=>an(p.query,T,{query_name:Ra});Yr(S);let g=m.params;Fr(()=>!0);let we={initialData:void 0,initialError:void 0},ea=D`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`,ke=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`;f.bzr_name_data&&(f.bzr_name_data instanceof Error?we.initialError=f.bzr_name_data:we.initialData=f.bzr_name_data,f.bzr_name_columns&&(we.knownColumns=f.bzr_name_columns));let wa,Sa=!1;const qe=xe.createReactive({callback:T=>{r(0,wa=T)},execFn:S},{id:"bzr_name",...we});qe(ke,{noResolve:ea,...we}),globalThis[Symbol.for("bzr_name")]={get value(){return wa}};let Te={initialData:void 0,initialError:void 0},oe=D`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`,Ca=`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`;f.pgr_name_data&&(f.pgr_name_data instanceof Error?Te.initialError=f.pgr_name_data:Te.initialData=f.pgr_name_data,f.pgr_name_columns&&(Te.knownColumns=f.pgr_name_columns));let Re,Se=!1;const tt=xe.createReactive({callback:T=>{r(1,Re=T)},execFn:S},{id:"pgr_name",...Te});tt(Ca,{noResolve:oe,...Te}),globalThis[Symbol.for("pgr_name")]={get value(){return Re}};let Ce={initialData:void 0,initialError:void 0},ye=D`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`,je=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`;f.stage_mix_data&&(f.stage_mix_data instanceof Error?Ce.initialError=f.stage_mix_data:Ce.initialData=f.stage_mix_data,f.stage_mix_columns&&(Ce.knownColumns=f.stage_mix_columns));let _e,de=!1;const sa=xe.createReactive({callback:T=>{r(3,_e=T)},execFn:S},{id:"stage_mix",...Ce});sa(je,{noResolve:ye,...Ce}),globalThis[Symbol.for("stage_mix")]={get value(){return _e}};let ce={initialData:void 0,initialError:void 0},Le=D`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${g.code}'
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
          and substr(area_code, 1, 6) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`;f.stage_mix_summary_data&&(f.stage_mix_summary_data instanceof Error?ce.initialError=f.stage_mix_summary_data:ce.initialData=f.stage_mix_summary_data,f.stage_mix_summary_columns&&(ce.knownColumns=f.stage_mix_summary_columns));let ka,ja=!1;const Be=xe.createReactive({callback:T=>{r(2,ka=T)},execFn:S},{id:"stage_mix_summary",...ce});Be(pe,{noResolve:Le,...ce}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return ka}};let oa={initialData:void 0,initialError:void 0},He=D`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 6) = '${g.code}'
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
  and substr(area_code, 1, 6) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;f.poi_mix_data&&(f.poi_mix_data instanceof Error?oa.initialError=f.poi_mix_data:oa.initialData=f.poi_mix_data,f.poi_mix_columns&&(oa.knownColumns=f.poi_mix_columns));let De,La=!1;const Ee=xe.createReactive({callback:T=>{r(4,De=T)},execFn:S},{id:"poi_mix",...oa});Ee(Me,{noResolve:He,...oa}),globalThis[Symbol.for("poi_mix")]={get value(){return De}};let la={initialData:void 0,initialError:void 0},Pe=D`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${g.code}'
  )
order by oa_domain desc`,be=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${g.code}'
  )
order by oa_domain desc`;f.oa_arealevel_data&&(f.oa_arealevel_data instanceof Error?la.initialError=f.oa_arealevel_data:la.initialData=f.oa_arealevel_data,f.oa_arealevel_columns&&(la.knownColumns=f.oa_arealevel_columns));let Ha,_a=!1;const da=xe.createReactive({callback:T=>{r(5,Ha=T)},execFn:S},{id:"oa_arealevel",...la});da(be,{noResolve:Pe,...la}),globalThis[Symbol.for("oa_arealevel")]={get value(){return Ha}};let A={initialData:void 0,initialError:void 0},I=D`select
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
  and substr(area_code, 1, 6) = '${g.code}'`,Fe=`select
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
  and substr(area_code, 1, 6) = '${g.code}'`;f.dom_suppressed_count_data&&(f.dom_suppressed_count_data instanceof Error?A.initialError=f.dom_suppressed_count_data:A.initialData=f.dom_suppressed_count_data,f.dom_suppressed_count_columns&&(A.knownColumns=f.dom_suppressed_count_columns));let Ga,ca=!1;const Ae=xe.createReactive({callback:T=>{r(6,Ga=T)},execFn:S},{id:"dom_suppressed_count",...A});Ae(Fe,{noResolve:I,...A}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return Ga}};let ma={initialData:void 0,initialError:void 0},Ie=D`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no BZR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,6) prefix filter this page already uses for every other
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`,ge=`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no BZR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,6) prefix filter this page already uses for every other
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`;f.dominance_children_data&&(f.dominance_children_data instanceof Error?ma.initialError=f.dominance_children_data:ma.initialData=f.dominance_children_data,f.dominance_children_columns&&(ma.knownColumns=f.dominance_children_columns));let rt,Ma=!1;const Ne=xe.createReactive({callback:T=>{r(7,rt=T)},execFn:S},{id:"dominance_children",...ma});Ne(ge,{noResolve:Ie,...ma}),globalThis[Symbol.for("dominance_children")]={get value(){return rt}};let Oe={initialData:void 0,initialError:void 0},me=D`select
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by reference_year desc
limit 1`;f.demographics_data&&(f.demographics_data instanceof Error?Oe.initialError=f.demographics_data:Oe.initialData=f.demographics_data,f.demographics_columns&&(Oe.knownColumns=f.demographics_columns));let Ue,Da=!1;const fa=xe.createReactive({callback:T=>{r(8,Ue=T)},execFn:S},{id:"demographics",...Oe});fa(ua,{noResolve:me,...Oe}),globalThis[Symbol.for("demographics")]={get value(){return Ue}};let ue={initialData:void 0,initialError:void 0},Qe=D`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`,We=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`;f.amenities_current_data&&(f.amenities_current_data instanceof Error?ue.initialError=f.amenities_current_data:ue.initialData=f.amenities_current_data,f.amenities_current_columns&&(ue.knownColumns=f.amenities_current_columns));let Ze,Pa=!1;const Ke=xe.createReactive({callback:T=>{r(9,Ze=T)},execFn:S},{id:"amenities_current",...ue});Ke(We,{noResolve:Qe,...ue}),globalThis[Symbol.for("amenities_current")]={get value(){return Ze}};let pa={initialData:void 0,initialError:void 0},Ve=D`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
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
order by sort_order`,he=`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
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
order by sort_order`;f.amenities_table_data&&(f.amenities_table_data instanceof Error?pa.initialError=f.amenities_table_data:pa.initialData=f.amenities_table_data,f.amenities_table_columns&&(pa.knownColumns=f.amenities_table_columns));let nt,Fa=!1;const ga=xe.createReactive({callback:T=>{r(10,nt=T)},execFn:S},{id:"amenities_table",...pa});ga(he,{noResolve:Ve,...pa}),globalThis[Symbol.for("amenities_table")]={get value(){return nt}};let fe={initialData:void 0,initialError:void 0},Je=D`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`,ve=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?fe.initialError=f.minimap_areas_data:fe.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(fe.knownColumns=f.minimap_areas_columns));let Aa,Ye=!1;const Ia=xe.createReactive({callback:T=>{r(11,Aa=T)},execFn:S},{id:"minimap_areas",...fe});Ia(ve,{noResolve:Je,...fe}),globalThis[Symbol.for("minimap_areas")]={get value(){return Aa}};let $e={initialData:void 0,initialError:void 0},le=D`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`,Na=`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`;f.children_data&&(f.children_data instanceof Error?$e.initialError=f.children_data:$e.initialData=f.children_data,f.children_columns&&($e.knownColumns=f.children_columns));let Oa,ha=!1;const ya=xe.createReactive({callback:T=>{r(12,Oa=T)},execFn:S},{id:"children",...$e});return ya(Na,{noResolve:le,...$e}),globalThis[Symbol.for("children")]={get value(){return Oa}},i.$$set=T=>{"data"in T&&r(16,x=T.data)},i.$$.update=()=>{var T,Ra;i.$$.dirty[0]&65536&&r(17,{data:f={},customFormattingSettings:M,__db:p}=x,f),i.$$.dirty[0]&131072&&Gr.set(Object.keys(f).length>0),i.$$.dirty[2]&4096&&r(19,g=m.params),i.$$.dirty[0]&524288&&r(21,ea=D`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`),i.$$.dirty[0]&524288&&r(22,ke=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`),i.$$.dirty[0]&15728640&&(ea||!Sa?ea||(qe(ke,{noResolve:ea,...we}),r(23,Sa=!0)):qe(ke,{noResolve:ea})),i.$$.dirty[0]&524288&&r(25,oe=D`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`),i.$$.dirty[0]&524288&&r(26,Ca=`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`),i.$$.dirty[0]&251658240&&(oe||!Se?oe||(tt(Ca,{noResolve:oe,...Te}),r(27,Se=!0)):tt(Ca,{noResolve:oe})),i.$$.dirty[0]&524288&&r(29,ye=D`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&524288&&r(30,je=`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&1879048192|i.$$.dirty[1]&1&&(ye||!de?ye||(sa(je,{noResolve:ye,...Ce}),r(31,de=!0)):sa(je,{noResolve:ye})),i.$$.dirty[0]&524288&&r(33,Le=D`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&524288&&r(34,pe=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${g.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[1]&30&&(Le||!ja?Le||(Be(pe,{noResolve:Le,...ce}),r(35,ja=!0)):Be(pe,{noResolve:Le})),i.$$.dirty[0]&524288&&r(37,He=D`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 6) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[0]&524288&&r(38,Me=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 6) = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[1]&480&&(He||!La?He||(Ee(Me,{noResolve:He,...oa}),r(39,La=!0)):Ee(Me,{noResolve:He})),i.$$.dirty[0]&524288&&r(41,Pe=D`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${g.code}'
  )
order by oa_domain desc`),i.$$.dirty[0]&524288&&r(42,be=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${g.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${g.code}'
  )
order by oa_domain desc`),i.$$.dirty[1]&7680&&(Pe||!_a?Pe||(da(be,{noResolve:Pe,...la}),r(43,_a=!0)):da(be,{noResolve:Pe})),i.$$.dirty[0]&786432&&r(45,I=D`select
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
  and substr(area_code, 1, 6) = '${g.code}'`),i.$$.dirty[0]&786432&&r(46,Fe=`select
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
  and substr(area_code, 1, 6) = '${g.code}'`),i.$$.dirty[1]&122880&&(I||!ca?I||(Ae(Fe,{noResolve:I,...A}),r(47,ca=!0)):Ae(Fe,{noResolve:I})),i.$$.dirty[0]&786432&&r(49,Ie=D`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no BZR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,6) prefix filter this page already uses for every other
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&786432&&r(50,ge=`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
-- PLR-grain only -- no BZR-level dominance figure exists to relocate; see this file's header
-- comment). Same substr(area_code,1,6) prefix filter this page already uses for every other
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
    and d.is_public_safe = true
    -- area_vintage/weight_variant pinned (#298 finding, see pages/berlin/area/bezirk/[code].md's
    -- header comment) -- without this, the same PLR resurfaces once per boundary vintage x
    -- weighting scheme.
    and d.area_vintage = 'lor_2021'
    and d.weight_variant = 'standard'
    and d.dominance_group = '${$.dom_group.value}'
    and d.snapshot_year = ${$.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&1966080&&(Ie||!Ma?Ie||(Ne(ge,{noResolve:Ie,...ma}),r(51,Ma=!0)):Ne(ge,{noResolve:Ie})),i.$$.dirty[0]&524288&&r(53,me=D`select
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by reference_year desc
limit 1`),i.$$.dirty[0]&524288&&r(54,ua=`select
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by reference_year desc
limit 1`),i.$$.dirty[1]&31457280&&(me||!Da?me||(fa(ua,{noResolve:me,...Oe}),r(55,Da=!0)):fa(ua,{noResolve:me})),i.$$.dirty[0]&524288&&r(57,Qe=D`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[0]&524288&&r(58,We=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[1]&503316480&&(Qe||!Pa?Qe||(Ke(We,{noResolve:Qe,...ue}),r(59,Pa=!0)):Ke(We,{noResolve:Qe})),i.$$.dirty[0]&524288&&r(61,Ve=D`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
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
order by sort_order`),i.$$.dirty[0]&524288&&r(62,he=`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
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
order by sort_order`),i.$$.dirty[1]&1610612736|i.$$.dirty[2]&3&&(Ve||!Fa?Ve||(ga(he,{noResolve:Ve,...pa}),r(63,Fa=!0)):ga(he,{noResolve:Ve})),i.$$.dirty[0]&524288&&r(65,Je=D`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`),i.$$.dirty[0]&524288&&r(66,ve=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${g.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${g.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${g.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${mt}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`),i.$$.dirty[2]&60&&(Je||!Ye?Je||(Ia(ve,{noResolve:Je,...fe}),r(67,Ye=!0)):Ia(ve,{noResolve:Je})),i.$$.dirty[0]&524288&&r(69,le=D`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`),i.$$.dirty[0]&524288&&r(70,Na=`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`),i.$$.dirty[2]&960&&(le||!ha?le||(ya(Na,{noResolve:le,...$e}),r(71,ha=!0)):ya(Na,{noResolve:le})),i.$$.dirty[0]&1&&r(73,a=((T=wa==null?void 0:wa[0])==null?void 0:T.area_name)??null),i.$$.dirty[0]&2|i.$$.dirty[2]&2048&&r(15,n=[{label:"Berlin",href:"/berlin"},{label:"District & area profiles",href:"/berlin/area/bezirk"},...(Ra=Re==null?void 0:Re[0])!=null&&Ra.area_code?[{label:Re[0].area_name,href:"/berlin/area/pgr/"+Re[0].area_code}]:[],{label:a??"Bezirksregion"}]),i.$$.dirty[2]&2048&&r(14,l=a?`${a} — Bezirksregion profile · Berlin`:null),i.$$.dirty[0]&4&&r(72,c=ka==null?void 0:ka[0]),i.$$.dirty[2]&1024&&r(13,o=!c||c.n_total==null||Number(c.n_total)===0?null:(()=>{const ba=Number(c.n_total),it=Number(c.n_advanced||0),Ge=c.top_stage_share!=null?Number(c.top_stage_share):null,st=Ge!=null&&Ge>.5?`<b>${c.top_stage}</b> is the only stage holding a majority (${Math.round(Ge*100)}%)`:"no single stage holds a majority";return`<b>${it}</b> of <b>${ba}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${st} — a distribution across this Bezirksregion's own neighbourhoods, never a single re-scored gentrification-index value for the Bezirksregion itself.`})())},[wa,Re,ka,_e,De,Ha,Ga,rt,Ue,Ze,nt,Aa,Oa,o,l,n,x,f,$,g,we,ea,ke,Sa,Te,oe,Ca,Se,Ce,ye,je,de,ce,Le,pe,ja,oa,He,Me,La,la,Pe,be,_a,A,I,Fe,ca,ma,Ie,ge,Ma,Oe,me,ua,Da,ue,Qe,We,Pa,pa,Ve,he,Fa,fe,Je,ve,Ye,$e,le,Na,ha,c,a,m]}class ei extends Nr{constructor(t){super(),Or(this,t,Mn,Hn,Lr,{data:16},null,[-1,-1,-1,-1])}}export{ei as component};
