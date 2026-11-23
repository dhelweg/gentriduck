import{s as Ar,d as _,i as d,a as se,b as E,c as b,h as Dr,e as z,f as Ct,g as _a,j as C,k as H,l as v,m as q,t as L,n as gr,o as Fr,p as Ir,q as Nr,r as Or,u as D,v as Ur,H as Qr,w as Ja}from"../chunks/scheduler.wXRIqz25.js";import{S as Wr,i as Zr,d as $,t as h,a as m,c as re,m as w,b as k,e as R,g as ne}from"../chunks/index.uz5rP6Z2.js";import{A as Kr,P as Vr}from"../chunks/PageTitle.X8fTilZx.js";import{A as Jr}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Yr}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Gr}from"../chunks/Hero.C0o6T8tj.js";import{S as Xr}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as en}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as Dt,C as ta}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as ft,w as an}from"../chunks/entry.DotynpIs.js";import{A as ha}from"../chunks/Alert.DFISYc09.js";import{e as tn,s as rn,Q as Le,p as nn,a as hr,r as yr,C as sn}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as P}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as br,a as ga}from"../chunks/Dropdown.Dl2mephJ.js";import{p as on}from"../chunks/stores.DJGNasUV.js";import{Q as je}from"../chunks/QueryViewer.RFckNDEV.js";import{B as It}from"../chunks/BarChart.Cy9nf948.js";import{B as Ft}from"../chunks/BigValue.Bpt9v-UH.js";import{p as ln}from"../chunks/profile.BW8tN6E9.js";function _n(i){var s;let t,r=(j.title??((s=j.og)==null?void 0:s.title))+"",a;return{c(){t=q("h1"),a=L(r),this.h()},l(l){t=z(l,"H1",{class:!0});var c=_a(t);a=C(c,r),c.forEach(_),this.h()},h(){E(t,"class","title")},m(l,c){d(l,t,c),se(t,a)},p:D,d(l){l&&_(t)}}}function dn(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:D,p:D,d:D}}function cn(i){var c;let t,r,a,s,l;return document.title=t=j.title??((c=j.og)==null?void 0:c.title),{c(){r=v(),a=q("meta"),s=v(),l=q("meta"),this.h()},l(o){r=b(o),a=z(o,"META",{property:!0,content:!0}),s=b(o),l=z(o,"META",{name:!0,content:!0}),this.h()},h(){var o,u;E(a,"property","og:title"),E(a,"content",((o=j.og)==null?void 0:o.title)??j.title),E(l,"name","twitter:title"),E(l,"content",((u=j.og)==null?void 0:u.title)??j.title)},m(o,u){d(o,r,u),d(o,a,u),d(o,s,u),d(o,l,u)},p(o,u){var y;u&0&&t!==(t=j.title??((y=j.og)==null?void 0:y.title))&&(document.title=t)},d(o){o&&(_(r),_(a),_(s),_(l))}}}function mn(i){var l,c;let t,r,a=(j.description||((l=j.og)==null?void 0:l.description))&&un(),s=((c=j.og)==null?void 0:c.image)&&fn();return{c(){a&&a.c(),t=v(),s&&s.c(),r=Ct()},l(o){a&&a.l(o),t=b(o),s&&s.l(o),r=Ct()},m(o,u){a&&a.m(o,u),d(o,t,u),s&&s.m(o,u),d(o,r,u)},p(o,u){var y,x;(j.description||(y=j.og)!=null&&y.description)&&a.p(o,u),(x=j.og)!=null&&x.image&&s.p(o,u)},d(o){o&&(_(t),_(r)),a&&a.d(o),s&&s.d(o)}}}function un(i){let t,r,a,s,l;return{c(){t=q("meta"),r=v(),a=q("meta"),s=v(),l=q("meta"),this.h()},l(c){t=z(c,"META",{name:!0,content:!0}),r=b(c),a=z(c,"META",{property:!0,content:!0}),s=b(c),l=z(c,"META",{name:!0,content:!0}),this.h()},h(){var c,o,u;E(t,"name","description"),E(t,"content",j.description??((c=j.og)==null?void 0:c.description)),E(a,"property","og:description"),E(a,"content",((o=j.og)==null?void 0:o.description)??j.description),E(l,"name","twitter:description"),E(l,"content",((u=j.og)==null?void 0:u.description)??j.description)},m(c,o){d(c,t,o),d(c,r,o),d(c,a,o),d(c,s,o),d(c,l,o)},p:D,d(c){c&&(_(t),_(r),_(a),_(s),_(l))}}}function fn(i){let t,r,a;return{c(){t=q("meta"),r=v(),a=q("meta"),this.h()},l(s){t=z(s,"META",{property:!0,content:!0}),r=b(s),a=z(s,"META",{name:!0,content:!0}),this.h()},h(){var s,l;E(t,"property","og:image"),E(t,"content",hr((s=j.og)==null?void 0:s.image)),E(a,"name","twitter:image"),E(a,"content",hr((l=j.og)==null?void 0:l.image))},m(s,l){d(s,t,l),d(s,r,l),d(s,a,l)},p:D,d(s){s&&(_(t),_(r),_(a))}}}function vr(i){let t,r;return t=new je({props:{queryID:"bzr_name",queryResult:i[0]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&1&&(l.queryResult=a[0]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function $r(i){let t,r;return t=new je({props:{queryID:"pgr_name",queryResult:i[1]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&2&&(l.queryResult=a[1]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function pn(i){let t,r="Prognoseraum profile";return{c(){t=q("a"),t.textContent=r,this.h()},l(a){t=z(a,"A",{href:!0,"data-svelte-h":!0}),H(t)!=="svelte-1u8s2sp"&&(t.textContent=r),this.h()},h(){E(t,"href","/gentriduck/berlin/area/bezirk")},m(a,s){d(a,t,s)},p:D,d(a){a&&_(t)}}}function gn(i){let t,r=i[1][0].area_name+"",a,s;return{c(){t=q("a"),a=L(r),this.h()},l(l){t=z(l,"A",{href:!0});var c=_a(t);a=C(c,r),c.forEach(_),this.h()},h(){E(t,"href",s="/gentriduck/berlin/area/pgr/"+i[1][0].area_code)},m(l,c){d(l,t,c),se(t,a)},p(l,c){c[0]&2&&r!==(r=l[1][0].area_name+"")&&Ja(a,r),c[0]&2&&s!==(s="/gentriduck/berlin/area/pgr/"+l[1][0].area_code)&&E(t,"href",s)},d(l){l&&_(t)}}}function hn(i){let t,r,a="sums and population-weighted averages",s,l,c="methodology page",o;return{c(){t=L("Figures on this page are "),r=q("b"),r.textContent=a,s=L(` of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  `),l=q("a"),l.textContent=c,o=L(" for why this coarser grain is not re-scored."),this.h()},l(u){t=C(u,"Figures on this page are "),r=z(u,"B",{"data-svelte-h":!0}),H(r)!=="svelte-rhlwxq"&&(r.textContent=a),s=C(u,` of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  `),l=z(u,"A",{href:!0,"data-svelte-h":!0}),H(l)!=="svelte-1l2pw3"&&(l.textContent=c),o=C(u," for why this coarser grain is not re-scored."),this.h()},h(){E(l,"href","/gentriduck/methodology")},m(u,y){d(u,t,y),d(u,r,y),d(u,s,y),d(u,l,y),d(u,o,y)},p:D,d(u){u&&(_(t),_(r),_(s),_(l),_(o))}}}function wr(i){let t,r;return t=new je({props:{queryID:"stage_mix",queryResult:i[3]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&8&&(l.queryResult=a[3]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function kr(i){let t,r;return t=new je({props:{queryID:"stage_mix_summary",queryResult:i[2]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&4&&(l.queryResult=a[2]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function yn(i){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[vn]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[3]&4&&(l.$$scope={dirty:s,ctx:a}),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function bn(i){let t,r;return{c(){t=q("p"),r=new Qr(!1),this.h()},l(a){t=z(a,"P",{});var s=_a(t);r=Ur(s,!1),s.forEach(_),this.h()},h(){r.a=null},m(a,s){d(a,t,s),r.m(i[13],t)},p(a,s){s[0]&8192&&r.p(a[13])},i:D,o:D,d(a){a&&_(t)}}}function vn(i){let t;return{c(){t=L("No neighbourhood-stage data available for this area.")},l(r){t=C(r,"No neighbourhood-stage data available for this area.")},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function Rr(i){let t,r;return t=new je({props:{queryID:"poi_mix",queryResult:i[4]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&16&&(l.queryResult=a[4]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function $n(i){let t,r="Bezirksregion (BZR) is this project's recommended public headline scale",a,s,l="Offering Advantage decoder",c;return{c(){t=q("b"),t.textContent=r,a=L(` for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  `),s=q("a"),s.textContent=l,c=L(` for the full "dial, not a ladder"
  framing.`),this.h()},l(o){t=z(o,"B",{"data-svelte-h":!0}),H(t)!=="svelte-9u1cbs"&&(t.textContent=r),a=C(o,` for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  `),s=z(o,"A",{href:!0,"data-svelte-h":!0}),H(s)!=="svelte-168mye8"&&(s.textContent=l),c=C(o,` for the full "dial, not a ladder"
  framing.`),this.h()},h(){E(s,"href","/gentriduck/methodology-oa-modes")},m(o,u){d(o,t,u),d(o,a,u),d(o,s,u),d(o,c,u)},p:D,d(o){o&&(_(t),_(a),_(s),_(c))}}}function Br(i){let t,r;return t=new je({props:{queryID:"oa_arealevel",queryResult:i[5]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&32&&(l.queryResult=a[5]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Er(i){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[wn]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function wn(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,s,l="Offering Advantage decoder",c;return{c(){t=q("b"),t.textContent=r,a=L(` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),s=q("a"),s.textContent=l,c=L(" §4/§7 for the full finding."),this.h()},l(o){t=z(o,"B",{"data-svelte-h":!0}),H(t)!=="svelte-1impqbu"&&(t.textContent=r),a=C(o,` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),s=z(o,"A",{href:!0,"data-svelte-h":!0}),H(s)!=="svelte-168mye8"&&(s.textContent=l),c=C(o," §4/§7 for the full finding."),this.h()},h(){E(s,"href","/gentriduck/methodology-oa-modes")},m(o,u){d(o,t,u),d(o,a,u),d(o,s,u),d(o,c,u)},p:D,d(o){o&&(_(t),_(a),_(s),_(c))}}}function kn(i){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[Bn]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[3]&4&&(l.$$scope={dirty:s,ctx:a}),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Rn(i){let t,r;return t=new It({props:{data:i[5],x:"poi_domain_h",y:"pct_vs_baseline",title:"Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this Bezirksregion."}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&32&&(l.data=a[5]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Bn(i){let t;return{c(){t=L("No Offering Advantage data for this Bezirksregion.")},l(r){t=C(r,"No Offering Advantage data for this Bezirksregion.")},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function xr(i){let t,r;return t=new ha({props:{status:"info",$$slots:{default:[En]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function En(i){let t;return{c(){t=L(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=C(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function xn(i){let t,r="Dominance is sign-blind",a,s,l="Offering Advantage decoder",c;return{c(){t=q("b"),t.textContent=r,a=L(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=q("a"),s.textContent=l,c=L(` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},l(o){t=z(o,"B",{"data-svelte-h":!0}),H(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=C(o,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),s=z(o,"A",{href:!0,"data-svelte-h":!0}),H(s)!=="svelte-168mye8"&&(s.textContent=l),c=C(o,` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},h(){E(s,"href","/gentriduck/methodology-oa-modes")},m(o,u){d(o,t,u),d(o,a,u),d(o,s,u),d(o,c,u)},p:D,d(o){o&&(_(t),_(a),_(s),_(c))}}}function zn(i){let t,r,a,s,l,c,o,u;return t=new ga({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new ga({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),l=new ga({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),o=new ga({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){R(t.$$.fragment),r=v(),R(a.$$.fragment),s=v(),R(l.$$.fragment),c=v(),R(o.$$.fragment)},l(y){k(t.$$.fragment,y),r=b(y),k(a.$$.fragment,y),s=b(y),k(l.$$.fragment,y),c=b(y),k(o.$$.fragment,y)},m(y,x){w(t,y,x),d(y,r,x),w(a,y,x),d(y,s,x),w(l,y,x),d(y,c,x),w(o,y,x),u=!0},p:D,i(y){u||(m(t.$$.fragment,y),m(a.$$.fragment,y),m(l.$$.fragment,y),m(o.$$.fragment,y),u=!0)},o(y){h(t.$$.fragment,y),h(a.$$.fragment,y),h(l.$$.fragment,y),h(o.$$.fragment,y),u=!1},d(y){y&&(_(r),_(s),_(c)),$(t,y),$(a,y),$(l,y),$(o,y)}}}function qn(i){let t,r,a,s,l,c,o,u,y,x,f,M;return t=new ga({props:{value:"2025",valueLabel:"2025"}}),a=new ga({props:{value:"2024",valueLabel:"2024"}}),l=new ga({props:{value:"2023",valueLabel:"2023"}}),o=new ga({props:{value:"2022",valueLabel:"2022"}}),y=new ga({props:{value:"2021",valueLabel:"2021"}}),f=new ga({props:{value:"2020",valueLabel:"2020"}}),{c(){R(t.$$.fragment),r=v(),R(a.$$.fragment),s=v(),R(l.$$.fragment),c=v(),R(o.$$.fragment),u=v(),R(y.$$.fragment),x=v(),R(f.$$.fragment)},l(p){k(t.$$.fragment,p),r=b(p),k(a.$$.fragment,p),s=b(p),k(l.$$.fragment,p),c=b(p),k(o.$$.fragment,p),u=b(p),k(y.$$.fragment,p),x=b(p),k(f.$$.fragment,p)},m(p,B){w(t,p,B),d(p,r,B),w(a,p,B),d(p,s,B),w(l,p,B),d(p,c,B),w(o,p,B),d(p,u,B),w(y,p,B),d(p,x,B),w(f,p,B),M=!0},p:D,i(p){M||(m(t.$$.fragment,p),m(a.$$.fragment,p),m(l.$$.fragment,p),m(o.$$.fragment,p),m(y.$$.fragment,p),m(f.$$.fragment,p),M=!0)},o(p){h(t.$$.fragment,p),h(a.$$.fragment,p),h(l.$$.fragment,p),h(o.$$.fragment,p),h(y.$$.fragment,p),h(f.$$.fragment,p),M=!1},d(p){p&&(_(r),_(s),_(c),_(u),_(x)),$(t,p),$(a,p),$(l,p),$(o,p),$(y,p),$(f,p)}}}function zr(i){let t,r;return t=new je({props:{queryID:"dom_suppressed_count",queryResult:i[6]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&64&&(l.queryResult=a[6]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Tn(i){let t,r=(i[6][0]?i[6][0].n_suppressed:0)+"",a,s,l=(i[6][0]?i[6][0].n_suppressed+i[6][0].n_shown:0)+"",c,o,u;return{c(){t=q("b"),a=L(r),s=L(" of "),c=L(l),o=L(" neighbourhoods here are suppressed below as too thinly observed to characterize"),u=L(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(y){t=z(y,"B",{});var x=_a(t);a=C(x,r),s=C(x," of "),c=C(x,l),o=C(x," neighbourhoods here are suppressed below as too thinly observed to characterize"),x.forEach(_),u=C(y,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(y,x){d(y,t,x),se(t,a),se(t,s),se(t,c),se(t,o),d(y,u,x)},p(y,x){x[0]&64&&r!==(r=(y[6][0]?y[6][0].n_suppressed:0)+"")&&Ja(a,r),x[0]&64&&l!==(l=(y[6][0]?y[6][0].n_suppressed+y[6][0].n_shown:0)+"")&&Ja(c,l)},d(y){y&&(_(t),_(u))}}}function qr(i){let t,r;return t=new je({props:{queryID:"dominance_children",queryResult:i[7]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&128&&(l.queryResult=a[7]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Sn(i){let t,r,a,s,l,c,o,u,y,x,f,M;return t=new ta({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new ta({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),l=new ta({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),o=new ta({props:{id:"top_child",title:"Leading type"}}),y=new ta({props:{id:"n_children",title:"Types in this group here"}}),f=new ta({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){R(t.$$.fragment),r=v(),R(a.$$.fragment),s=v(),R(l.$$.fragment),c=v(),R(o.$$.fragment),u=v(),R(y.$$.fragment),x=v(),R(f.$$.fragment)},l(p){k(t.$$.fragment,p),r=b(p),k(a.$$.fragment,p),s=b(p),k(l.$$.fragment,p),c=b(p),k(o.$$.fragment,p),u=b(p),k(y.$$.fragment,p),x=b(p),k(f.$$.fragment,p)},m(p,B){w(t,p,B),d(p,r,B),w(a,p,B),d(p,s,B),w(l,p,B),d(p,c,B),w(o,p,B),d(p,u,B),w(y,p,B),d(p,x,B),w(f,p,B),M=!0},p:D,i(p){M||(m(t.$$.fragment,p),m(a.$$.fragment,p),m(l.$$.fragment,p),m(o.$$.fragment,p),m(y.$$.fragment,p),m(f.$$.fragment,p),M=!0)},o(p){h(t.$$.fragment,p),h(a.$$.fragment,p),h(l.$$.fragment,p),h(o.$$.fragment,p),h(y.$$.fragment,p),h(f.$$.fragment,p),M=!1},d(p){p&&(_(r),_(s),_(c),_(u),_(x)),$(t,p),$(a,p),$(l,p),$(o,p),$(y,p),$(f,p)}}}function Tr(i){let t,r;return t=new je({props:{queryID:"demographics",queryResult:i[8]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&256&&(l.queryResult=a[8]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Sr(i){let t,r;return t=new ha({props:{status:"warning",$$slots:{default:[Cn]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Cn(i){let t;return{c(){t=L(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},l(r){t=C(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},m(r,a){d(r,t,a)},d(r){r&&_(t)}}}function Cr(i){let t,r;return t=new je({props:{queryID:"amenities_current",queryResult:i[9]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&512&&(l.queryResult=a[9]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Lr(i){let t,r;return t=new je({props:{queryID:"amenities_table",queryResult:i[10]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&1024&&(l.queryResult=a[10]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Ln(i){let t;return{c(){t=L("No amenity data is available for this area yet.")},l(r){t=C(r,"No amenity data is available for this area yet.")},m(r,a){d(r,t,a)},p:D,d(r){r&&_(t)}}}function jn(i){let t,r,a=i[9][0].snapshot_year+"",s,l;return{c(){t=L("Based on OpenStreetMap tagging as of "),r=q("b"),s=L(a),l=L(`, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(c){t=C(c,"Based on OpenStreetMap tagging as of "),r=z(c,"B",{});var o=_a(r);s=C(o,a),o.forEach(_),l=C(c,`, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(c,o){d(c,t,o),d(c,r,o),se(r,s),d(c,l,o)},p(c,o){o[0]&512&&a!==(a=c[9][0].snapshot_year+"")&&Ja(s,a)},d(c){c&&(_(t),_(r),_(l))}}}function Hn(i){let t,r,a,s,l,c;return t=new ta({props:{id:"indicator",title:"Infrastructure"}}),a=new ta({props:{id:"area_value",title:"This Bezirksregion"}}),l=new ta({props:{id:"district_value",title:"District total"}}),{c(){R(t.$$.fragment),r=v(),R(a.$$.fragment),s=v(),R(l.$$.fragment)},l(o){k(t.$$.fragment,o),r=b(o),k(a.$$.fragment,o),s=b(o),k(l.$$.fragment,o)},m(o,u){w(t,o,u),d(o,r,u),w(a,o,u),d(o,s,u),w(l,o,u),c=!0},p:D,i(o){c||(m(t.$$.fragment,o),m(a.$$.fragment,o),m(l.$$.fragment,o),c=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),h(l.$$.fragment,o),c=!1},d(o){o&&(_(r),_(s)),$(t,o),$(a,o),$(l,o)}}}function Mn(i){let t,r,a="0",s,l,c="open-data",o;return{c(){t=L("These figures come from OpenStreetMap tagging, not an official registry. A "),r=q("b"),r.textContent=a,s=L(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),l=q("a"),l.textContent=c,o=L(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(u){t=C(u,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=z(u,"B",{"data-svelte-h":!0}),H(r)!=="svelte-12bhsds"&&(r.textContent=a),s=C(u,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),l=z(u,"A",{href:!0,"data-svelte-h":!0}),H(l)!=="svelte-1jijq3i"&&(l.textContent=c),o=C(u,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){E(l,"href","/gentriduck/open-data")},m(u,y){d(u,t,y),d(u,r,y),d(u,s,y),d(u,l,y),d(u,o,y)},p:D,d(u){u&&(_(t),_(r),_(s),_(l),_(o))}}}function Pn(i){let t;return{c(){t=L(`There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=C(r,`There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){d(r,t,a)},p:D,d(r){r&&_(t)}}}function An(i){let t,r,a=i[9][0].gastro_poi_with_cuisine_count+"",s,l;return{c(){t=L("Cuisine is tagged for "),r=q("b"),s=L(a),l=L(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(c){t=C(c,"Cuisine is tagged for "),r=z(c,"B",{});var o=_a(r);s=C(o,a),o.forEach(_),l=C(c,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(c,o){d(c,t,o),d(c,r,o),se(r,s),d(c,l,o)},p(c,o){o[0]&512&&a!==(a=c[9][0].gastro_poi_with_cuisine_count+"")&&Ja(s,a)},d(c){c&&(_(t),_(r),_(l))}}}function Dn(i){let t,r,a=i[9][0].gastro_poi_with_cuisine_count+"",s,l,c,o="most common cuisine",u,y,x=i[9][0].dominant_cuisine+"",f,M,p=Math.round(i[9][0].dominant_cuisine_share*100)+"",B,da;return{c(){t=L("Among "),r=q("b"),s=L(a),l=L(` restaurants/cafes with cuisine
data tagged in this Bezirksregion, the `),c=q("b"),c.textContent=o,u=L(` is
`),y=q("b"),f=L(x),M=L(`
(`),B=L(p),da=L("% of cuisine-tagged restaurants/cafes).")},l(S){t=C(S,"Among "),r=z(S,"B",{});var g=_a(r);s=C(g,a),g.forEach(_),l=C(S,` restaurants/cafes with cuisine
data tagged in this Bezirksregion, the `),c=z(S,"B",{"data-svelte-h":!0}),H(c)!=="svelte-1floooe"&&(c.textContent=o),u=C(S,` is
`),y=z(S,"B",{});var Be=_a(y);f=C(Be,x),Be.forEach(_),M=C(S,`
(`),B=C(S,p),da=C(S,"% of cuisine-tagged restaurants/cafes).")},m(S,g){d(S,t,g),d(S,r,g),se(r,s),d(S,l,g),d(S,c,g),d(S,u,g),d(S,y,g),se(y,f),d(S,M,g),d(S,B,g),d(S,da,g)},p(S,g){g[0]&512&&a!==(a=S[9][0].gastro_poi_with_cuisine_count+"")&&Ja(s,a),g[0]&512&&x!==(x=S[9][0].dominant_cuisine+"")&&Ja(f,x),g[0]&512&&p!==(p=Math.round(S[9][0].dominant_cuisine_share*100)+"")&&Ja(B,p)},d(S){S&&(_(t),_(r),_(l),_(c),_(u),_(y),_(M),_(B),_(da))}}}function jr(i){let t,r;return t=new je({props:{queryID:"minimap_areas",queryResult:i[11]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&2048&&(l.queryResult=a[11]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Hr(i){let t,r;return t=new je({props:{queryID:"children",queryResult:i[12]}}),{c(){R(t.$$.fragment)},l(a){k(t.$$.fragment,a)},m(a,s){w(t,a,s),r=!0},p(a,s){const l={};s[0]&4096&&(l.queryResult=a[12]),t.$set(l)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Fn(i){let t,r,a,s,l,c;return t=new ta({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new ta({props:{id:"stage",title:"Stage",wrap:"true"}}),l=new ta({props:{id:"status_trend",title:"Status trend"}}),{c(){R(t.$$.fragment),r=v(),R(a.$$.fragment),s=v(),R(l.$$.fragment)},l(o){k(t.$$.fragment,o),r=b(o),k(a.$$.fragment,o),s=b(o),k(l.$$.fragment,o)},m(o,u){w(t,o,u),d(o,r,u),w(a,o,u),d(o,s,u),w(l,o,u),c=!0},p:D,i(o){c||(m(t.$$.fragment,o),m(a.$$.fragment,o),m(l.$$.fragment,o),c=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),h(l.$$.fragment,o),c=!1},d(o){o&&(_(r),_(s)),$(t,o),$(a,o),$(l,o)}}}function In(i){var tr;let t,r,a,s,l,c,o,u,y,x,f,M,p,B,da,S,g,Be="all districts",ra,Ee,ya="full neighbourhood list",Ea,He,Me,ie,xa='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',xe,Pe,tt=`Every neighbourhood (Planungsraum) in this Bezirksregion is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This page reports the <strong class="markdown">distribution</strong> of
those neighbourhood-level stages — never a single re-scored index value for the Bezirksregion
itself, since averaging ordinal stage codes across such different neighbourhoods would mask exactly
the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see &quot;Honest
caveats&quot; below).`,Ae,he,De,_e,de,ca,ce,Fe,ze,na,qe,rt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Ie,oe,za='<a href="#mapped-places">Mapped places</a>',qa,ma,Ne,Oe,le,Ta='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',Sa,Ue,Ca,ye,be,te,me,ua,Ya=i[5].some(Mr),ve,ue,La=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule.`,ja,Te,nt='<a href="#within-group-dominance">Within-group dominance</a>',Qe,fe,fa,We,Ha,Ze,Ke,$e,we,Ma,pa,Ve,Je,pe,Pa=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Aa,Se,st='<a href="#people--structure">People &amp; structure</a>',Ye,ke,Re,Da,Ge,Fa,ge,Xe,ea,Ce,it='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Ia,T,sa,ba,ot,aa,lt,Na,pt,Ga,gt,Xa,Nt=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,ht,va,Ot='<a href="#where-this-area-sits">Where this area sits</a>',yt,_t,Oa,bt,$a,Ut='<a href="#neighbourhoods-planungsräume-in-this-bezirksregion">Neighbourhoods (Planungsräume) in this Bezirksregion</a>',vt,dt,Ua,$t,et,wt,wa,Qt='<a href="#honest-caveats">Honest caveats</a>',kt,Qa,Wt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Bezirksregion</strong> —
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,Rt,ka,Zt='<a href="#further-reading">Further reading</a>',Bt,Wa,Kt=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other areas, or drill into any of this Bezirksregion&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,Et,ct,xt,at,zt,Ra=typeof j<"u"&&(j.title||((tr=j.og)==null?void 0:tr.title))&&j.hide_title!==!0&&_n();function Pr(e,n){var A;return typeof j<"u"&&(j.title||(A=j.og)!=null&&A.title)?cn:dn}let mt=Pr()(i),Ba=typeof j=="object"&&mn(),F=i[0]&&vr(i),I=i[1]&&$r(i);u=new Kr({props:{crumbs:i[15]}}),x=new Vr({props:{title:i[14]}}),M=new Gr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(i[0][0]&&i[0][0].area_name)+" — Bezirksregion profile",lede:"Population, composition, and neighbourhood-stage mix for this Bezirksregion, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain."}});function Vt(e,n){var A;return(A=e[1][0])!=null&&A.area_code?gn:pn}let qt=Vt(i),ia=qt(i);He=new ha({props:{status:"info",$$slots:{default:[hn]},$$scope:{ctx:i}}});let N=i[3]&&wr(i),O=i[2]&&kr(i);const Jt=[bn,yn],Za=[];function Yt(e,n){return e[13]?0:1}_e=Yt(i),de=Za[_e]=Jt[_e](i),ce=new It({props:{data:i[3],x:"stage",y:"n_areas",title:"Neighbourhoods by stage",swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}}}}),ze=new Xr({});let U=i[4]&&Rr(i);Ne=new It({props:{data:i[4],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot)",swapXY:"true"}}),Ue=new ha({props:{status:"info",$$slots:{default:[$n]},$$scope:{ctx:i}}});let Q=i[5]&&Br(i),X=i[5][0]&&i[5][0].maup_caveat_required&&Er(i);const Gt=[Rn,kn],Ka=[];function Xt(e,n){return e[5].length>0?0:1}te=Xt(i),me=Ka[te]=Gt[te](i);let ee=Ya&&xr(i);fe=new ha({props:{status:"info",$$slots:{default:[xn]},$$scope:{ctx:i}}}),We=new br({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[zn]},$$scope:{ctx:i}}}),Ze=new br({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[qn]},$$scope:{ctx:i}}});let W=i[6]&&zr(i);we=new ha({props:{status:"info",$$slots:{default:[Tn]},$$scope:{ctx:i}}});let Z=i[7]&&qr(i);Ve=new Dt({props:{data:i[7],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Bezirksregion.",$$slots:{default:[Sn]},$$scope:{ctx:i}}});let K=i[8]&&Tr(i);Re=new Ft({props:{data:i[8],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),Ge=new Ft({props:{data:i[8],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),ge=new Ft({props:{data:i[8],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let ae=i[8]&&i[8][0]&&i[8][0].any_indicator_suppressed&&Sr(i),V=i[9]&&Cr(i),J=i[10]&&Lr(i);function er(e,n){var A;return(A=e[9][0])!=null&&A.snapshot_year?jn:Ln}let Tt=er(i),oa=Tt(i);aa=new Dt({props:{data:i[10],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Hn]},$$scope:{ctx:i}}}),Na=new ha({props:{status:"info",$$slots:{default:[Mn]},$$scope:{ctx:i}}});function ar(e,n){var A,Va;return(A=e[9][0])!=null&&A.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8&&e[9][0].dominant_cuisine_share>=.15?Dn:(Va=e[9][0])!=null&&Va.snapshot_year&&e[9][0].gastro_poi_with_cuisine_count>=8?An:Pn}let St=ar(i),la=St(i),Y=i[11]&&jr(i);Oa=new Jr({props:{data:i[11],geoJsonUrl:`${ft}/geo/bzr_plr_drilldown.geojson`,title:(i[0][0]?i[0][0].area_name:"This Bezirksregion")+" and its neighbourhoods"}});let G=i[12]&&Hr(i);return Ua=new Dt({props:{data:i[12],rows:"20",link:"area_link",$$slots:{default:[Fn]},$$scope:{ctx:i}}}),et=new en({}),at=new Yr({}),{c(){Ra&&Ra.c(),t=v(),mt.c(),r=q("meta"),a=q("meta"),Ba&&Ba.c(),s=Ct(),l=v(),F&&F.c(),c=v(),I&&I.c(),o=v(),R(u.$$.fragment),y=v(),R(x.$$.fragment),f=v(),R(M.$$.fragment),p=v(),B=q("p"),da=L("Up: "),ia.c(),S=L(" · "),g=q("a"),g.textContent=Be,ra=L(" · "),Ee=q("a"),Ee.textContent=ya,Ea=v(),R(He.$$.fragment),Me=v(),ie=q("h2"),ie.innerHTML=xa,xe=v(),Pe=q("p"),Pe.innerHTML=tt,Ae=v(),N&&N.c(),he=v(),O&&O.c(),De=v(),de.c(),ca=v(),R(ce.$$.fragment),Fe=v(),R(ze.$$.fragment),na=v(),qe=q("h2"),qe.innerHTML=rt,Ie=v(),oe=q("h3"),oe.innerHTML=za,qa=v(),U&&U.c(),ma=v(),R(Ne.$$.fragment),Oe=v(),le=q("h3"),le.innerHTML=Ta,Sa=v(),R(Ue.$$.fragment),Ca=v(),Q&&Q.c(),ye=v(),X&&X.c(),be=v(),me.c(),ua=v(),ee&&ee.c(),ve=v(),ue=q("p"),ue.innerHTML=La,ja=v(),Te=q("h2"),Te.innerHTML=nt,Qe=v(),R(fe.$$.fragment),fa=v(),R(We.$$.fragment),Ha=v(),R(Ze.$$.fragment),Ke=v(),W&&W.c(),$e=v(),R(we.$$.fragment),Ma=v(),Z&&Z.c(),pa=v(),R(Ve.$$.fragment),Je=v(),pe=q("p"),pe.innerHTML=Pa,Aa=v(),Se=q("h2"),Se.innerHTML=st,Ye=v(),K&&K.c(),ke=v(),R(Re.$$.fragment),Da=v(),R(Ge.$$.fragment),Fa=v(),R(ge.$$.fragment),Xe=v(),ae&&ae.c(),ea=v(),Ce=q("h2"),Ce.innerHTML=it,Ia=v(),V&&V.c(),T=v(),J&&J.c(),sa=v(),ba=q("p"),oa.c(),ot=v(),R(aa.$$.fragment),lt=v(),R(Na.$$.fragment),pt=v(),Ga=q("p"),la.c(),gt=v(),Xa=q("p"),Xa.textContent=Nt,ht=v(),va=q("h2"),va.innerHTML=Ot,yt=v(),Y&&Y.c(),_t=v(),R(Oa.$$.fragment),bt=v(),$a=q("h3"),$a.innerHTML=Ut,vt=v(),G&&G.c(),dt=v(),R(Ua.$$.fragment),$t=v(),R(et.$$.fragment),wt=v(),wa=q("h2"),wa.innerHTML=Qt,kt=v(),Qa=q("ul"),Qa.innerHTML=Wt,Rt=v(),ka=q("h2"),ka.innerHTML=Zt,Bt=v(),Wa=q("p"),Wa.innerHTML=Kt,Et=v(),ct=q("hr"),xt=v(),R(at.$$.fragment),this.h()},l(e){Ra&&Ra.l(e),t=b(e);const n=Dr("svelte-2igo1p",document.head);mt.l(n),r=z(n,"META",{name:!0,content:!0}),a=z(n,"META",{name:!0,content:!0}),Ba&&Ba.l(n),s=Ct(),n.forEach(_),l=b(e),F&&F.l(e),c=b(e),I&&I.l(e),o=b(e),k(u.$$.fragment,e),y=b(e),k(x.$$.fragment,e),f=b(e),k(M.$$.fragment,e),p=b(e),B=z(e,"P",{});var A=_a(B);da=C(A,"Up: "),ia.l(A),S=C(A," · "),g=z(A,"A",{href:!0,"data-svelte-h":!0}),H(g)!=="svelte-6j2qr0"&&(g.textContent=Be),ra=C(A," · "),Ee=z(A,"A",{href:!0,"data-svelte-h":!0}),H(Ee)!=="svelte-z78e0k"&&(Ee.textContent=ya),A.forEach(_),Ea=b(e),k(He.$$.fragment,e),Me=b(e),ie=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(ie)!=="svelte-14f17uo"&&(ie.innerHTML=xa),xe=b(e),Pe=z(e,"P",{class:!0,"data-svelte-h":!0}),H(Pe)!=="svelte-9cztr0"&&(Pe.innerHTML=tt),Ae=b(e),N&&N.l(e),he=b(e),O&&O.l(e),De=b(e),de.l(e),ca=b(e),k(ce.$$.fragment,e),Fe=b(e),k(ze.$$.fragment,e),na=b(e),qe=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(qe)!=="svelte-1i9w9pn"&&(qe.innerHTML=rt),Ie=b(e),oe=z(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H(oe)!=="svelte-3hvew3"&&(oe.innerHTML=za),qa=b(e),U&&U.l(e),ma=b(e),k(Ne.$$.fragment,e),Oe=b(e),le=z(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H(le)!=="svelte-5mc7pd"&&(le.innerHTML=Ta),Sa=b(e),k(Ue.$$.fragment,e),Ca=b(e),Q&&Q.l(e),ye=b(e),X&&X.l(e),be=b(e),me.l(e),ua=b(e),ee&&ee.l(e),ve=b(e),ue=z(e,"P",{class:!0,"data-svelte-h":!0}),H(ue)!=="svelte-1q1lnxb"&&(ue.innerHTML=La),ja=b(e),Te=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Te)!=="svelte-4kb45v"&&(Te.innerHTML=nt),Qe=b(e),k(fe.$$.fragment,e),fa=b(e),k(We.$$.fragment,e),Ha=b(e),k(Ze.$$.fragment,e),Ke=b(e),W&&W.l(e),$e=b(e),k(we.$$.fragment,e),Ma=b(e),Z&&Z.l(e),pa=b(e),k(Ve.$$.fragment,e),Je=b(e),pe=z(e,"P",{class:!0,"data-svelte-h":!0}),H(pe)!=="svelte-1xa7bh7"&&(pe.innerHTML=Pa),Aa=b(e),Se=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Se)!=="svelte-1mdzqzc"&&(Se.innerHTML=st),Ye=b(e),K&&K.l(e),ke=b(e),k(Re.$$.fragment,e),Da=b(e),k(Ge.$$.fragment,e),Fa=b(e),k(ge.$$.fragment,e),Xe=b(e),ae&&ae.l(e),ea=b(e),Ce=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ce)!=="svelte-12k6lqd"&&(Ce.innerHTML=it),Ia=b(e),V&&V.l(e),T=b(e),J&&J.l(e),sa=b(e),ba=z(e,"P",{});var Va=_a(ba);oa.l(Va),Va.forEach(_),ot=b(e),k(aa.$$.fragment,e),lt=b(e),k(Na.$$.fragment,e),pt=b(e),Ga=z(e,"P",{});var ut=_a(Ga);la.l(ut),ut.forEach(_),gt=b(e),Xa=z(e,"P",{"data-svelte-h":!0}),H(Xa)!=="svelte-ja6pm6"&&(Xa.textContent=Nt),ht=b(e),va=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(va)!=="svelte-60cjj9"&&(va.innerHTML=Ot),yt=b(e),Y&&Y.l(e),_t=b(e),k(Oa.$$.fragment,e),bt=b(e),$a=z(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H($a)!=="svelte-fqpmt1"&&($a.innerHTML=Ut),vt=b(e),G&&G.l(e),dt=b(e),k(Ua.$$.fragment,e),$t=b(e),k(et.$$.fragment,e),wt=b(e),wa=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(wa)!=="svelte-ad0syq"&&(wa.innerHTML=Qt),kt=b(e),Qa=z(e,"UL",{class:!0,"data-svelte-h":!0}),H(Qa)!=="svelte-1eqtvvm"&&(Qa.innerHTML=Wt),Rt=b(e),ka=z(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(ka)!=="svelte-oimjns"&&(ka.innerHTML=Zt),Bt=b(e),Wa=z(e,"P",{class:!0,"data-svelte-h":!0}),H(Wa)!=="svelte-4b8jxq"&&(Wa.innerHTML=Kt),Et=b(e),ct=z(e,"HR",{class:!0}),xt=b(e),k(at.$$.fragment,e),this.h()},h(){E(r,"name","twitter:card"),E(r,"content","summary_large_image"),E(a,"name","twitter:site"),E(a,"content","@evidence_dev"),E(g,"href","/gentriduck/berlin/area/bezirk"),E(Ee,"href","/gentriduck/berlin/area"),E(ie,"class","markdown"),E(ie,"id","social-status--trajectory"),E(Pe,"class","markdown"),E(qe,"class","markdown"),E(qe,"id","commercial-mix--offering-advantage"),E(oe,"class","markdown"),E(oe,"id","mapped-places"),E(le,"class","markdown"),E(le,"id","offering-advantage-across-the-area-hierarchy"),E(ue,"class","markdown"),E(Te,"class","markdown"),E(Te,"id","within-group-dominance"),E(pe,"class","markdown"),E(Se,"class","markdown"),E(Se,"id","people--structure"),E(Ce,"class","markdown"),E(Ce,"id","amenities--everyday-infrastructure"),E(va,"class","markdown"),E(va,"id","where-this-area-sits"),E($a,"class","markdown"),E($a,"id","neighbourhoods-planungsräume-in-this-bezirksregion"),E(wa,"class","markdown"),E(wa,"id","honest-caveats"),E(Qa,"class","markdown"),E(ka,"class","markdown"),E(ka,"id","further-reading"),E(Wa,"class","markdown"),E(ct,"class","markdown")},m(e,n){Ra&&Ra.m(e,n),d(e,t,n),mt.m(document.head,null),se(document.head,r),se(document.head,a),Ba&&Ba.m(document.head,null),se(document.head,s),d(e,l,n),F&&F.m(e,n),d(e,c,n),I&&I.m(e,n),d(e,o,n),w(u,e,n),d(e,y,n),w(x,e,n),d(e,f,n),w(M,e,n),d(e,p,n),d(e,B,n),se(B,da),ia.m(B,null),se(B,S),se(B,g),se(B,ra),se(B,Ee),d(e,Ea,n),w(He,e,n),d(e,Me,n),d(e,ie,n),d(e,xe,n),d(e,Pe,n),d(e,Ae,n),N&&N.m(e,n),d(e,he,n),O&&O.m(e,n),d(e,De,n),Za[_e].m(e,n),d(e,ca,n),w(ce,e,n),d(e,Fe,n),w(ze,e,n),d(e,na,n),d(e,qe,n),d(e,Ie,n),d(e,oe,n),d(e,qa,n),U&&U.m(e,n),d(e,ma,n),w(Ne,e,n),d(e,Oe,n),d(e,le,n),d(e,Sa,n),w(Ue,e,n),d(e,Ca,n),Q&&Q.m(e,n),d(e,ye,n),X&&X.m(e,n),d(e,be,n),Ka[te].m(e,n),d(e,ua,n),ee&&ee.m(e,n),d(e,ve,n),d(e,ue,n),d(e,ja,n),d(e,Te,n),d(e,Qe,n),w(fe,e,n),d(e,fa,n),w(We,e,n),d(e,Ha,n),w(Ze,e,n),d(e,Ke,n),W&&W.m(e,n),d(e,$e,n),w(we,e,n),d(e,Ma,n),Z&&Z.m(e,n),d(e,pa,n),w(Ve,e,n),d(e,Je,n),d(e,pe,n),d(e,Aa,n),d(e,Se,n),d(e,Ye,n),K&&K.m(e,n),d(e,ke,n),w(Re,e,n),d(e,Da,n),w(Ge,e,n),d(e,Fa,n),w(ge,e,n),d(e,Xe,n),ae&&ae.m(e,n),d(e,ea,n),d(e,Ce,n),d(e,Ia,n),V&&V.m(e,n),d(e,T,n),J&&J.m(e,n),d(e,sa,n),d(e,ba,n),oa.m(ba,null),d(e,ot,n),w(aa,e,n),d(e,lt,n),w(Na,e,n),d(e,pt,n),d(e,Ga,n),la.m(Ga,null),d(e,gt,n),d(e,Xa,n),d(e,ht,n),d(e,va,n),d(e,yt,n),Y&&Y.m(e,n),d(e,_t,n),w(Oa,e,n),d(e,bt,n),d(e,$a,n),d(e,vt,n),G&&G.m(e,n),d(e,dt,n),w(Ua,e,n),d(e,$t,n),w(et,e,n),d(e,wt,n),d(e,wa,n),d(e,kt,n),d(e,Qa,n),d(e,Rt,n),d(e,ka,n),d(e,Bt,n),d(e,Wa,n),d(e,Et,n),d(e,ct,n),d(e,xt,n),w(at,e,n),zt=!0},p(e,n){var pr;typeof j<"u"&&(j.title||(pr=j.og)!=null&&pr.title)&&j.hide_title!==!0&&Ra.p(e,n),mt.p(e,n),typeof j=="object"&&Ba.p(e,n),e[0]?F?(F.p(e,n),n[0]&1&&m(F,1)):(F=vr(e),F.c(),m(F,1),F.m(c.parentNode,c)):F&&(ne(),h(F,1,1,()=>{F=null}),re()),e[1]?I?(I.p(e,n),n[0]&2&&m(I,1)):(I=$r(e),I.c(),m(I,1),I.m(o.parentNode,o)):I&&(ne(),h(I,1,1,()=>{I=null}),re());const A={};n[0]&32768&&(A.crumbs=e[15]),u.$set(A);const Va={};n[0]&16384&&(Va.title=e[14]),x.$set(Va);const ut={};n[0]&1&&(ut.title=(e[0][0]&&e[0][0].area_name)+" — Bezirksregion profile"),M.$set(ut),qt===(qt=Vt(e))&&ia?ia.p(e,n):(ia.d(1),ia=qt(e),ia&&(ia.c(),ia.m(B,S)));const rr={};n[3]&4&&(rr.$$scope={dirty:n,ctx:e}),He.$set(rr),e[3]?N?(N.p(e,n),n[0]&8&&m(N,1)):(N=wr(e),N.c(),m(N,1),N.m(he.parentNode,he)):N&&(ne(),h(N,1,1,()=>{N=null}),re()),e[2]?O?(O.p(e,n),n[0]&4&&m(O,1)):(O=kr(e),O.c(),m(O,1),O.m(De.parentNode,De)):O&&(ne(),h(O,1,1,()=>{O=null}),re());let Lt=_e;_e=Yt(e),_e===Lt?Za[_e].p(e,n):(ne(),h(Za[Lt],1,1,()=>{Za[Lt]=null}),re(),de=Za[_e],de?de.p(e,n):(de=Za[_e]=Jt[_e](e),de.c()),m(de,1),de.m(ca.parentNode,ca));const nr={};n[0]&8&&(nr.data=e[3]),ce.$set(nr),e[4]?U?(U.p(e,n),n[0]&16&&m(U,1)):(U=Rr(e),U.c(),m(U,1),U.m(ma.parentNode,ma)):U&&(ne(),h(U,1,1,()=>{U=null}),re());const sr={};n[0]&16&&(sr.data=e[4]),Ne.$set(sr);const ir={};n[3]&4&&(ir.$$scope={dirty:n,ctx:e}),Ue.$set(ir),e[5]?Q?(Q.p(e,n),n[0]&32&&m(Q,1)):(Q=Br(e),Q.c(),m(Q,1),Q.m(ye.parentNode,ye)):Q&&(ne(),h(Q,1,1,()=>{Q=null}),re()),e[5][0]&&e[5][0].maup_caveat_required?X?n[0]&32&&m(X,1):(X=Er(e),X.c(),m(X,1),X.m(be.parentNode,be)):X&&(ne(),h(X,1,1,()=>{X=null}),re());let jt=te;te=Xt(e),te===jt?Ka[te].p(e,n):(ne(),h(Ka[jt],1,1,()=>{Ka[jt]=null}),re(),me=Ka[te],me?me.p(e,n):(me=Ka[te]=Gt[te](e),me.c()),m(me,1),me.m(ua.parentNode,ua)),n[0]&32&&(Ya=e[5].some(Mr)),Ya?ee?n[0]&32&&m(ee,1):(ee=xr(e),ee.c(),m(ee,1),ee.m(ve.parentNode,ve)):ee&&(ne(),h(ee,1,1,()=>{ee=null}),re());const or={};n[3]&4&&(or.$$scope={dirty:n,ctx:e}),fe.$set(or);const lr={};n[3]&4&&(lr.$$scope={dirty:n,ctx:e}),We.$set(lr);const _r={};n[3]&4&&(_r.$$scope={dirty:n,ctx:e}),Ze.$set(_r),e[6]?W?(W.p(e,n),n[0]&64&&m(W,1)):(W=zr(e),W.c(),m(W,1),W.m($e.parentNode,$e)):W&&(ne(),h(W,1,1,()=>{W=null}),re());const dr={};n[0]&64|n[3]&4&&(dr.$$scope={dirty:n,ctx:e}),we.$set(dr),e[7]?Z?(Z.p(e,n),n[0]&128&&m(Z,1)):(Z=qr(e),Z.c(),m(Z,1),Z.m(pa.parentNode,pa)):Z&&(ne(),h(Z,1,1,()=>{Z=null}),re());const Ht={};n[0]&128&&(Ht.data=e[7]),n[3]&4&&(Ht.$$scope={dirty:n,ctx:e}),Ve.$set(Ht),e[8]?K?(K.p(e,n),n[0]&256&&m(K,1)):(K=Tr(e),K.c(),m(K,1),K.m(ke.parentNode,ke)):K&&(ne(),h(K,1,1,()=>{K=null}),re());const cr={};n[0]&256&&(cr.data=e[8]),Re.$set(cr);const mr={};n[0]&256&&(mr.data=e[8]),Ge.$set(mr);const ur={};n[0]&256&&(ur.data=e[8]),ge.$set(ur),e[8]&&e[8][0]&&e[8][0].any_indicator_suppressed?ae?n[0]&256&&m(ae,1):(ae=Sr(e),ae.c(),m(ae,1),ae.m(ea.parentNode,ea)):ae&&(ne(),h(ae,1,1,()=>{ae=null}),re()),e[9]?V?(V.p(e,n),n[0]&512&&m(V,1)):(V=Cr(e),V.c(),m(V,1),V.m(T.parentNode,T)):V&&(ne(),h(V,1,1,()=>{V=null}),re()),e[10]?J?(J.p(e,n),n[0]&1024&&m(J,1)):(J=Lr(e),J.c(),m(J,1),J.m(sa.parentNode,sa)):J&&(ne(),h(J,1,1,()=>{J=null}),re()),Tt===(Tt=er(e))&&oa?oa.p(e,n):(oa.d(1),oa=Tt(e),oa&&(oa.c(),oa.m(ba,null)));const Mt={};n[0]&1024&&(Mt.data=e[10]),n[3]&4&&(Mt.$$scope={dirty:n,ctx:e}),aa.$set(Mt);const fr={};n[3]&4&&(fr.$$scope={dirty:n,ctx:e}),Na.$set(fr),St===(St=ar(e))&&la?la.p(e,n):(la.d(1),la=St(e),la&&(la.c(),la.m(Ga,null))),e[11]?Y?(Y.p(e,n),n[0]&2048&&m(Y,1)):(Y=jr(e),Y.c(),m(Y,1),Y.m(_t.parentNode,_t)):Y&&(ne(),h(Y,1,1,()=>{Y=null}),re());const Pt={};n[0]&2048&&(Pt.data=e[11]),n[0]&1&&(Pt.title=(e[0][0]?e[0][0].area_name:"This Bezirksregion")+" and its neighbourhoods"),Oa.$set(Pt),e[12]?G?(G.p(e,n),n[0]&4096&&m(G,1)):(G=Hr(e),G.c(),m(G,1),G.m(dt.parentNode,dt)):G&&(ne(),h(G,1,1,()=>{G=null}),re());const At={};n[0]&4096&&(At.data=e[12]),n[3]&4&&(At.$$scope={dirty:n,ctx:e}),Ua.$set(At)},i(e){zt||(m(F),m(I),m(u.$$.fragment,e),m(x.$$.fragment,e),m(M.$$.fragment,e),m(He.$$.fragment,e),m(N),m(O),m(de),m(ce.$$.fragment,e),m(ze.$$.fragment,e),m(U),m(Ne.$$.fragment,e),m(Ue.$$.fragment,e),m(Q),m(X),m(me),m(ee),m(fe.$$.fragment,e),m(We.$$.fragment,e),m(Ze.$$.fragment,e),m(W),m(we.$$.fragment,e),m(Z),m(Ve.$$.fragment,e),m(K),m(Re.$$.fragment,e),m(Ge.$$.fragment,e),m(ge.$$.fragment,e),m(ae),m(V),m(J),m(aa.$$.fragment,e),m(Na.$$.fragment,e),m(Y),m(Oa.$$.fragment,e),m(G),m(Ua.$$.fragment,e),m(et.$$.fragment,e),m(at.$$.fragment,e),zt=!0)},o(e){h(F),h(I),h(u.$$.fragment,e),h(x.$$.fragment,e),h(M.$$.fragment,e),h(He.$$.fragment,e),h(N),h(O),h(de),h(ce.$$.fragment,e),h(ze.$$.fragment,e),h(U),h(Ne.$$.fragment,e),h(Ue.$$.fragment,e),h(Q),h(X),h(me),h(ee),h(fe.$$.fragment,e),h(We.$$.fragment,e),h(Ze.$$.fragment,e),h(W),h(we.$$.fragment,e),h(Z),h(Ve.$$.fragment,e),h(K),h(Re.$$.fragment,e),h(Ge.$$.fragment,e),h(ge.$$.fragment,e),h(ae),h(V),h(J),h(aa.$$.fragment,e),h(Na.$$.fragment,e),h(Y),h(Oa.$$.fragment,e),h(G),h(Ua.$$.fragment,e),h(et.$$.fragment,e),h(at.$$.fragment,e),zt=!1},d(e){e&&(_(t),_(l),_(c),_(o),_(y),_(f),_(p),_(B),_(Ea),_(Me),_(ie),_(xe),_(Pe),_(Ae),_(he),_(De),_(ca),_(Fe),_(na),_(qe),_(Ie),_(oe),_(qa),_(ma),_(Oe),_(le),_(Sa),_(Ca),_(ye),_(be),_(ua),_(ve),_(ue),_(ja),_(Te),_(Qe),_(fa),_(Ha),_(Ke),_($e),_(Ma),_(pa),_(Je),_(pe),_(Aa),_(Se),_(Ye),_(ke),_(Da),_(Fa),_(Xe),_(ea),_(Ce),_(Ia),_(T),_(sa),_(ba),_(ot),_(lt),_(pt),_(Ga),_(gt),_(Xa),_(ht),_(va),_(yt),_(_t),_(bt),_($a),_(vt),_(dt),_($t),_(wt),_(wa),_(kt),_(Qa),_(Rt),_(ka),_(Bt),_(Wa),_(Et),_(ct),_(xt)),Ra&&Ra.d(e),mt.d(e),_(r),_(a),Ba&&Ba.d(e),_(s),F&&F.d(e),I&&I.d(e),$(u,e),$(x,e),$(M,e),ia.d(),$(He,e),N&&N.d(e),O&&O.d(e),Za[_e].d(e),$(ce,e),$(ze,e),U&&U.d(e),$(Ne,e),$(Ue,e),Q&&Q.d(e),X&&X.d(e),Ka[te].d(e),ee&&ee.d(e),$(fe,e),$(We,e),$(Ze,e),W&&W.d(e),$(we,e),Z&&Z.d(e),$(Ve,e),K&&K.d(e),$(Re,e),$(Ge,e),$(ge,e),ae&&ae.d(e),V&&V.d(e),J&&J.d(e),oa.d(),$(aa,e),$(Na,e),la.d(),Y&&Y.d(e),$(Oa,e),G&&G.d(e),$(Ua,e),$(et,e),$(at,e)}}}const j={},Mr=i=>i.oa_domain_min_base_flag;function Nn(i,t,r){let a,s,l,c,o,u,y;gr(i,on,T=>r(74,u=T)),gr(i,yr,T=>r(78,y=T));let{data:x}=t,{data:f={},customFormattingSettings:M,__db:p,inputs:B}=x;Fr(yr,y="a84918331b5c343c58cc632906369951",y);let da=tn(an(B));Ir(da.subscribe(T=>r(18,B=T))),Nr(sn,{getCustomFormats:()=>M.customFormats||[]});const S=(T,sa)=>ln(p.query,T,{query_name:sa});rn(S);let g=u.params;Or(()=>!0);let Be={initialData:void 0,initialError:void 0},ra=P`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`,Ee=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`;f.bzr_name_data&&(f.bzr_name_data instanceof Error?Be.initialError=f.bzr_name_data:Be.initialData=f.bzr_name_data,f.bzr_name_columns&&(Be.knownColumns=f.bzr_name_columns));let ya,Ea=!1;const He=Le.createReactive({callback:T=>{r(0,ya=T)},execFn:S},{id:"bzr_name",...Be});He(Ee,{noResolve:ra,...Be}),globalThis[Symbol.for("bzr_name")]={get value(){return ya}};let Me={initialData:void 0,initialError:void 0},ie=P`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`,xa=`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`;f.pgr_name_data&&(f.pgr_name_data instanceof Error?Me.initialError=f.pgr_name_data:Me.initialData=f.pgr_name_data,f.pgr_name_columns&&(Me.knownColumns=f.pgr_name_columns));let xe,Pe=!1;const tt=Le.createReactive({callback:T=>{r(1,xe=T)},execFn:S},{id:"pgr_name",...Me});tt(xa,{noResolve:ie,...Me}),globalThis[Symbol.for("pgr_name")]={get value(){return xe}};let Ae={initialData:void 0,initialError:void 0},he=P`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
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
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`;f.stage_mix_data&&(f.stage_mix_data instanceof Error?Ae.initialError=f.stage_mix_data:Ae.initialData=f.stage_mix_data,f.stage_mix_columns&&(Ae.knownColumns=f.stage_mix_columns));let _e,de=!1;const ca=Le.createReactive({callback:T=>{r(3,_e=T)},execFn:S},{id:"stage_mix",...Ae});ca(De,{noResolve:he,...Ae}),globalThis[Symbol.for("stage_mix")]={get value(){return _e}};let ce={initialData:void 0,initialError:void 0},Fe=P`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`,ze=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`;f.stage_mix_summary_data&&(f.stage_mix_summary_data instanceof Error?ce.initialError=f.stage_mix_summary_data:ce.initialData=f.stage_mix_summary_data,f.stage_mix_summary_columns&&(ce.knownColumns=f.stage_mix_summary_columns));let na,qe=!1;const rt=Le.createReactive({callback:T=>{r(2,na=T)},execFn:S},{id:"stage_mix_summary",...ce});rt(ze,{noResolve:Fe,...ce}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return na}};let Ie={initialData:void 0,initialError:void 0},oe=P`select
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
order by poi_count desc`,za=`select
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
order by poi_count desc`;f.poi_mix_data&&(f.poi_mix_data instanceof Error?Ie.initialError=f.poi_mix_data:Ie.initialData=f.poi_mix_data,f.poi_mix_columns&&(Ie.knownColumns=f.poi_mix_columns));let qa,ma=!1;const Ne=Le.createReactive({callback:T=>{r(4,qa=T)},execFn:S},{id:"poi_mix",...Ie});Ne(za,{noResolve:oe,...Ie}),globalThis[Symbol.for("poi_mix")]={get value(){return qa}};let Oe={initialData:void 0,initialError:void 0},le=P`select
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
order by oa_domain desc`,Ta=`select
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
order by oa_domain desc`;f.oa_arealevel_data&&(f.oa_arealevel_data instanceof Error?Oe.initialError=f.oa_arealevel_data:Oe.initialData=f.oa_arealevel_data,f.oa_arealevel_columns&&(Oe.knownColumns=f.oa_arealevel_columns));let Sa,Ue=!1;const Ca=Le.createReactive({callback:T=>{r(5,Sa=T)},execFn:S},{id:"oa_arealevel",...Oe});Ca(Ta,{noResolve:le,...Oe}),globalThis[Symbol.for("oa_arealevel")]={get value(){return Sa}};let ye={initialData:void 0,initialError:void 0},be=P`select
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
  and dominance_group = '${B.dom_group.value}'
  and snapshot_year = ${B.dom_year.value}
  and substr(area_code, 1, 6) = '${g.code}'`,te=`select
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
  and dominance_group = '${B.dom_group.value}'
  and snapshot_year = ${B.dom_year.value}
  and substr(area_code, 1, 6) = '${g.code}'`;f.dom_suppressed_count_data&&(f.dom_suppressed_count_data instanceof Error?ye.initialError=f.dom_suppressed_count_data:ye.initialData=f.dom_suppressed_count_data,f.dom_suppressed_count_columns&&(ye.knownColumns=f.dom_suppressed_count_columns));let me,ua=!1;const Ya=Le.createReactive({callback:T=>{r(6,me=T)},execFn:S},{id:"dom_suppressed_count",...ye});Ya(te,{noResolve:be,...ye}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return me}};let ve={initialData:void 0,initialError:void 0},ue=P`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${B.dom_group.value}'
    and d.snapshot_year = ${B.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`,La=`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${B.dom_group.value}'
    and d.snapshot_year = ${B.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`;f.dominance_children_data&&(f.dominance_children_data instanceof Error?ve.initialError=f.dominance_children_data:ve.initialData=f.dominance_children_data,f.dominance_children_columns&&(ve.knownColumns=f.dominance_children_columns));let ja,Te=!1;const nt=Le.createReactive({callback:T=>{r(7,ja=T)},execFn:S},{id:"dominance_children",...ve});nt(La,{noResolve:ue,...ve}),globalThis[Symbol.for("dominance_children")]={get value(){return ja}};let Qe={initialData:void 0,initialError:void 0},fe=P`select
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by reference_year desc
limit 1`;f.demographics_data&&(f.demographics_data instanceof Error?Qe.initialError=f.demographics_data:Qe.initialData=f.demographics_data,f.demographics_columns&&(Qe.knownColumns=f.demographics_columns));let We,Ha=!1;const Ze=Le.createReactive({callback:T=>{r(8,We=T)},execFn:S},{id:"demographics",...Qe});Ze(fa,{noResolve:fe,...Qe}),globalThis[Symbol.for("demographics")]={get value(){return We}};let Ke={initialData:void 0,initialError:void 0},$e=P`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`,we=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`;f.amenities_current_data&&(f.amenities_current_data instanceof Error?Ke.initialError=f.amenities_current_data:Ke.initialData=f.amenities_current_data,f.amenities_current_columns&&(Ke.knownColumns=f.amenities_current_columns));let Ma,pa=!1;const Ve=Le.createReactive({callback:T=>{r(9,Ma=T)},execFn:S},{id:"amenities_current",...Ke});Ve(we,{noResolve:$e,...Ke}),globalThis[Symbol.for("amenities_current")]={get value(){return Ma}};let Je={initialData:void 0,initialError:void 0},pe=P`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
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
order by sort_order`,Pa=`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
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
order by sort_order`;f.amenities_table_data&&(f.amenities_table_data instanceof Error?Je.initialError=f.amenities_table_data:Je.initialData=f.amenities_table_data,f.amenities_table_columns&&(Je.knownColumns=f.amenities_table_columns));let Aa,Se=!1;const st=Le.createReactive({callback:T=>{r(10,Aa=T)},execFn:S},{id:"amenities_table",...Je});st(Pa,{noResolve:pe,...Je}),globalThis[Symbol.for("amenities_table")]={get value(){return Aa}};let Ye={initialData:void 0,initialError:void 0},ke=P`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${ft}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`,Re=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${ft}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?Ye.initialError=f.minimap_areas_data:Ye.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(Ye.knownColumns=f.minimap_areas_columns));let Da,Ge=!1;const Fa=Le.createReactive({callback:T=>{r(11,Da=T)},execFn:S},{id:"minimap_areas",...Ye});Fa(Re,{noResolve:ke,...Ye}),globalThis[Symbol.for("minimap_areas")]={get value(){return Da}};let ge={initialData:void 0,initialError:void 0},Xe=P`select
    area_code,
    area_name,
    stage_label as stage,
    status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by stage_number nulls last, area_name, area_code`,ea=`select
    area_code,
    area_name,
    stage_label as stage,
    status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by stage_number nulls last, area_name, area_code`;f.children_data&&(f.children_data instanceof Error?ge.initialError=f.children_data:ge.initialData=f.children_data,f.children_columns&&(ge.knownColumns=f.children_columns));let Ce,it=!1;const Ia=Le.createReactive({callback:T=>{r(12,Ce=T)},execFn:S},{id:"children",...ge});return Ia(ea,{noResolve:Xe,...ge}),globalThis[Symbol.for("children")]={get value(){return Ce}},i.$$set=T=>{"data"in T&&r(16,x=T.data)},i.$$.update=()=>{var T,sa;i.$$.dirty[0]&65536&&r(17,{data:f={},customFormattingSettings:M,__db:p}=x,f),i.$$.dirty[0]&131072&&nn.set(Object.keys(f).length>0),i.$$.dirty[2]&4096&&r(19,g=u.params),i.$$.dirty[0]&524288&&r(21,ra=P`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`),i.$$.dirty[0]&524288&&r(22,Ee=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
limit 1`),i.$$.dirty[0]&15728640&&(ra||!Ea?ra||(He(Ee,{noResolve:ra,...Be}),r(23,Ea=!0)):He(Ee,{noResolve:ra})),i.$$.dirty[0]&524288&&r(25,ie=P`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`),i.$$.dirty[0]&524288&&r(26,xa=`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${g.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`),i.$$.dirty[0]&251658240&&(ie||!Pe?ie||(tt(xa,{noResolve:ie,...Me}),r(27,Pe=!0)):tt(xa,{noResolve:ie})),i.$$.dirty[0]&524288&&r(29,he=P`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),i.$$.dirty[0]&524288&&r(30,De=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${g.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),i.$$.dirty[0]&1879048192|i.$$.dirty[1]&1&&(he||!de?he||(ca(De,{noResolve:he,...Ae}),r(31,de=!0)):ca(De,{noResolve:he})),i.$$.dirty[0]&524288&&r(33,Fe=P`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&524288&&r(34,ze=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[1]&30&&(Fe||!qe?Fe||(rt(ze,{noResolve:Fe,...ce}),r(35,qe=!0)):rt(ze,{noResolve:Fe})),i.$$.dirty[0]&524288&&r(37,oe=P`select
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
order by poi_count desc`),i.$$.dirty[0]&524288&&r(38,za=`select
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
order by poi_count desc`),i.$$.dirty[1]&480&&(oe||!ma?oe||(Ne(za,{noResolve:oe,...Ie}),r(39,ma=!0)):Ne(za,{noResolve:oe})),i.$$.dirty[0]&524288&&r(41,le=P`select
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
order by oa_domain desc`),i.$$.dirty[0]&524288&&r(42,Ta=`select
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
order by oa_domain desc`),i.$$.dirty[1]&7680&&(le||!Ue?le||(Ca(Ta,{noResolve:le,...Oe}),r(43,Ue=!0)):Ca(Ta,{noResolve:le})),i.$$.dirty[0]&786432&&r(45,be=P`select
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
  and dominance_group = '${B.dom_group.value}'
  and snapshot_year = ${B.dom_year.value}
  and substr(area_code, 1, 6) = '${g.code}'`),i.$$.dirty[0]&786432&&r(46,te=`select
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
  and dominance_group = '${B.dom_group.value}'
  and snapshot_year = ${B.dom_year.value}
  and substr(area_code, 1, 6) = '${g.code}'`),i.$$.dirty[1]&122880&&(be||!ua?be||(Ya(te,{noResolve:be,...ye}),r(47,ua=!0)):Ya(te,{noResolve:be})),i.$$.dirty[0]&786432&&r(49,ue=P`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${B.dom_group.value}'
    and d.snapshot_year = ${B.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&786432&&r(50,La=`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${B.dom_group.value}'
    and d.snapshot_year = ${B.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${g.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&1966080&&(ue||!Te?ue||(nt(La,{noResolve:ue,...ve}),r(51,Te=!0)):nt(La,{noResolve:ue})),i.$$.dirty[0]&524288&&r(53,fe=P`select
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
limit 1`),i.$$.dirty[0]&524288&&r(54,fa=`select
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
limit 1`),i.$$.dirty[1]&31457280&&(fe||!Ha?fe||(Ze(fa,{noResolve:fe,...Qe}),r(55,Ha=!0)):Ze(fa,{noResolve:fe})),i.$$.dirty[0]&524288&&r(57,$e=P`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[0]&524288&&r(58,we=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${g.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[1]&503316480&&($e||!pa?$e||(Ve(we,{noResolve:$e,...Ke}),r(59,pa=!0)):Ve(we,{noResolve:$e})),i.$$.dirty[0]&524288&&r(61,pe=P`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
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
order by sort_order`),i.$$.dirty[0]&524288&&r(62,Pa=`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
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
order by sort_order`),i.$$.dirty[1]&1610612736|i.$$.dirty[2]&3&&(pe||!Se?pe||(st(Pa,{noResolve:pe,...Je}),r(63,Se=!0)):st(Pa,{noResolve:pe})),i.$$.dirty[0]&524288&&r(65,ke=P`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${ft}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`),i.$$.dirty[0]&524288&&r(66,Re=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${ft}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${g.code}'
order by sort_order, area_name`),i.$$.dirty[2]&60&&(ke||!Ge?ke||(Fa(Re,{noResolve:ke,...Ye}),r(67,Ge=!0)):Fa(Re,{noResolve:ke})),i.$$.dirty[0]&524288&&r(69,Xe=P`select
    area_code,
    area_name,
    stage_label as stage,
    status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by stage_number nulls last, area_name, area_code`),i.$$.dirty[0]&524288&&r(70,ea=`select
    area_code,
    area_name,
    stage_label as stage,
    status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by stage_number nulls last, area_name, area_code`),i.$$.dirty[2]&960&&(Xe||!it?Xe||(Ia(ea,{noResolve:Xe,...ge}),r(71,it=!0)):Ia(ea,{noResolve:Xe})),i.$$.dirty[0]&1&&r(73,a=((T=ya==null?void 0:ya[0])==null?void 0:T.area_name)??null),i.$$.dirty[0]&2|i.$$.dirty[2]&2048&&r(15,s=[{label:"Berlin",href:"/berlin"},{label:"District & area profiles",href:"/berlin/area/bezirk"},...(sa=xe==null?void 0:xe[0])!=null&&sa.area_code?[{label:xe[0].area_name,href:"/berlin/area/pgr/"+xe[0].area_code}]:[],{label:a??"Bezirksregion"}]),i.$$.dirty[2]&2048&&r(14,l=a?`${a} — Bezirksregion profile · Berlin`:null),i.$$.dirty[0]&4&&r(72,c=na==null?void 0:na[0]),i.$$.dirty[2]&1024&&r(13,o=!c||c.n_total==null||Number(c.n_total)===0?null:(()=>{const ba=Number(c.n_total),ot=Number(c.n_advanced||0),aa=c.top_stage_share!=null?Number(c.top_stage_share):null,lt=aa!=null&&aa>.5?`<b>${c.top_stage}</b> is the only stage holding a majority (${Math.round(aa*100)}%)`:"no single stage holds a majority";return`<b>${ot}</b> of <b>${ba}</b> neighbourhoods (Planungsräume) here are classified <b>4 · Active gentrification</b> or <b>3 · Pioneer signal</b>; ${lt} — a distribution across this Bezirksregion's own neighbourhoods, never a single re-scored gentrification-index value for the Bezirksregion itself.`})())},[ya,xe,na,_e,qa,Sa,me,ja,We,Ma,Aa,Da,Ce,o,l,s,x,f,B,g,Be,ra,Ee,Ea,Me,ie,xa,Pe,Ae,he,De,de,ce,Fe,ze,qe,Ie,oe,za,ma,Oe,le,Ta,Ue,ye,be,te,ua,ve,ue,La,Te,Qe,fe,fa,Ha,Ke,$e,we,pa,Je,pe,Pa,Se,Ye,ke,Re,Ge,ge,Xe,ea,it,c,a,u]}class _s extends Wr{constructor(t){super(),Zr(this,t,Nn,In,Ar,{data:16},null,[-1,-1,-1,-1])}}export{_s as component};
