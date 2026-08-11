import{s as zr,d,i as c,a as de,b as R,c as y,h as qr,e as E,f as Rt,r as va,t as S,g as L,j as v,k as B,u as C,l as ir,m as Tr,o as Sr,n as Cr,p as jr,q as D,v as Lr,H as Hr,w as Va}from"../chunks/scheduler.BopPEjhc.js";import{S as Mr,i as Pr,d as b,t as g,a as p,c as re,m as $,b as w,e as k,g as ne}from"../chunks/index.CYkVJg6_.js";import{A as Dr}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as Fr}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as Ar}from"../chunks/Hero.CRoRGI02.js";import{D as Tt,C as Ke}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as ot,w as Ir}from"../chunks/entry.BMmpG6A7.js";import{A as ya}from"../chunks/Alert.BO8kFSQK.js";import{e as Nr,s as Or,Q as ze,p as Ur,a as or,r as lr,C as Qr}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as H}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as _r,a as ha}from"../chunks/Dropdown.BxlIFH-r.js";import{p as Wr}from"../chunks/stores.Ceyp10jj.js";import{Q as qe}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as Ct}from"../chunks/BarChart.DzrCmZ_r.js";import{B as St}from"../chunks/BigValue.Ck7K9e2S.js";import{p as Zr}from"../chunks/profile.BW8tN6E9.js";function Kr(i){var n;let t,r=(j.title??((n=j.og)==null?void 0:n.title))+"",a;return{c(){t=B("h1"),a=C(r),this.h()},l(_){t=E(_,"H1",{class:!0});var u=va(t);a=S(u,r),u.forEach(d),this.h()},h(){R(t,"class","title")},m(_,u){c(_,t,u),de(t,a)},p:D,d(_){_&&d(t)}}}function Vr(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:D,p:D,d:D}}function Jr(i){var u;let t,r,a,n,_;return document.title=t=j.title??((u=j.og)==null?void 0:u.title),{c(){r=v(),a=B("meta"),n=v(),_=B("meta"),this.h()},l(l){r=y(l),a=E(l,"META",{property:!0,content:!0}),n=y(l),_=E(l,"META",{name:!0,content:!0}),this.h()},h(){var l,o;R(a,"property","og:title"),R(a,"content",((l=j.og)==null?void 0:l.title)??j.title),R(_,"name","twitter:title"),R(_,"content",((o=j.og)==null?void 0:o.title)??j.title)},m(l,o){c(l,r,o),c(l,a,o),c(l,n,o),c(l,_,o)},p(l,o){var h;o&0&&t!==(t=j.title??((h=j.og)==null?void 0:h.title))&&(document.title=t)},d(l){l&&(d(r),d(a),d(n),d(_))}}}function Yr(i){var _,u;let t,r,a=(j.description||((_=j.og)==null?void 0:_.description))&&Gr(),n=((u=j.og)==null?void 0:u.image)&&Xr();return{c(){a&&a.c(),t=v(),n&&n.c(),r=Rt()},l(l){a&&a.l(l),t=y(l),n&&n.l(l),r=Rt()},m(l,o){a&&a.m(l,o),c(l,t,o),n&&n.m(l,o),c(l,r,o)},p(l,o){var h,x;(j.description||(h=j.og)!=null&&h.description)&&a.p(l,o),(x=j.og)!=null&&x.image&&n.p(l,o)},d(l){l&&(d(t),d(r)),a&&a.d(l),n&&n.d(l)}}}function Gr(i){let t,r,a,n,_;return{c(){t=B("meta"),r=v(),a=B("meta"),n=v(),_=B("meta"),this.h()},l(u){t=E(u,"META",{name:!0,content:!0}),r=y(u),a=E(u,"META",{property:!0,content:!0}),n=y(u),_=E(u,"META",{name:!0,content:!0}),this.h()},h(){var u,l,o;R(t,"name","description"),R(t,"content",j.description??((u=j.og)==null?void 0:u.description)),R(a,"property","og:description"),R(a,"content",((l=j.og)==null?void 0:l.description)??j.description),R(_,"name","twitter:description"),R(_,"content",((o=j.og)==null?void 0:o.description)??j.description)},m(u,l){c(u,t,l),c(u,r,l),c(u,a,l),c(u,n,l),c(u,_,l)},p:D,d(u){u&&(d(t),d(r),d(a),d(n),d(_))}}}function Xr(i){let t,r,a;return{c(){t=B("meta"),r=v(),a=B("meta"),this.h()},l(n){t=E(n,"META",{property:!0,content:!0}),r=y(n),a=E(n,"META",{name:!0,content:!0}),this.h()},h(){var n,_;R(t,"property","og:image"),R(t,"content",or((n=j.og)==null?void 0:n.image)),R(a,"name","twitter:image"),R(a,"content",or((_=j.og)==null?void 0:_.image))},m(n,_){c(n,t,_),c(n,r,_),c(n,a,_)},p:D,d(n){n&&(d(t),d(r),d(a))}}}function dr(i){let t,r;return t=new qe({props:{queryID:"bzr_name",queryResult:i[1]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&2&&(_.queryResult=a[1]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function cr(i){let t,r;return t=new qe({props:{queryID:"pgr_name",queryResult:i[2]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&4&&(_.queryResult=a[2]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function en(i){let t,r="Prognoseraum profile";return{c(){t=B("a"),t.textContent=r,this.h()},l(a){t=E(a,"A",{href:!0,"data-svelte-h":!0}),L(t)!=="svelte-1u8s2sp"&&(t.textContent=r),this.h()},h(){R(t,"href","/gentriduck/berlin/area/bezirk")},m(a,n){c(a,t,n)},p:D,d(a){a&&d(t)}}}function an(i){let t,r=i[2][0].area_name+"",a,n;return{c(){t=B("a"),a=C(r),this.h()},l(_){t=E(_,"A",{href:!0});var u=va(t);a=S(u,r),u.forEach(d),this.h()},h(){R(t,"href",n="/gentriduck/berlin/area/pgr/"+i[2][0].area_code)},m(_,u){c(_,t,u),de(t,a)},p(_,u){u[0]&4&&r!==(r=_[2][0].area_name+"")&&Va(a,r),u[0]&4&&n!==(n="/gentriduck/berlin/area/pgr/"+_[2][0].area_code)&&R(t,"href",n)},d(_){_&&d(t)}}}function tn(i){let t,r,a="sums and population-weighted averages",n,_,u="methodology page",l;return{c(){t=C("Figures on this page are "),r=B("b"),r.textContent=a,n=C(` of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  `),_=B("a"),_.textContent=u,l=C(" for why this coarser grain is not re-scored."),this.h()},l(o){t=S(o,"Figures on this page are "),r=E(o,"B",{"data-svelte-h":!0}),L(r)!=="svelte-rhlwxq"&&(r.textContent=a),n=S(o,` of this Bezirksregion's
  neighbourhoods — never a separately re-scored index. Each neighbourhood below has its own full
  profile (index, trajectory, commercial mix) — see the
  `),_=E(o,"A",{href:!0,"data-svelte-h":!0}),L(_)!=="svelte-1l2pw3"&&(_.textContent=u),l=S(o," for why this coarser grain is not re-scored."),this.h()},h(){R(_,"href","/gentriduck/methodology")},m(o,h){c(o,t,h),c(o,r,h),c(o,n,h),c(o,_,h),c(o,l,h)},p:D,d(o){o&&(d(t),d(r),d(n),d(_),d(l))}}}function mr(i){let t,r;return t=new qe({props:{queryID:"stage_mix",queryResult:i[3]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&8&&(_.queryResult=a[3]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function ur(i){let t,r;return t=new qe({props:{queryID:"stage_mix_summary",queryResult:i[0]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&1&&(_.queryResult=a[0]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function rn(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[sn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[2]&1073741824&&(_.$$scope={dirty:n,ctx:a}),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function nn(i){let t,r;return{c(){t=B("p"),r=new Hr(!1),this.h()},l(a){t=E(a,"P",{});var n=va(t);r=Lr(n,!1),n.forEach(d),this.h()},h(){r.a=null},m(a,n){c(a,t,n),r.m(i[13],t)},p(a,n){n[0]&8192&&r.p(a[13])},i:D,o:D,d(a){a&&d(t)}}}function sn(i){let t;return{c(){t=C("No neighbourhood-stage data available for this area.")},l(r){t=S(r,"No neighbourhood-stage data available for this area.")},m(r,a){c(r,t,a)},d(r){r&&d(t)}}}function fr(i){let t,r;return t=new qe({props:{queryID:"poi_mix",queryResult:i[4]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&16&&(_.queryResult=a[4]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function on(i){let t,r="Bezirksregion (BZR) is this project's recommended public headline scale",a,n,_="Offering Advantage decoder",u;return{c(){t=B("b"),t.textContent=r,a=C(` for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  `),n=B("a"),n.textContent=_,u=C(` for the full "dial, not a ladder"
  framing.`),this.h()},l(l){t=E(l,"B",{"data-svelte-h":!0}),L(t)!=="svelte-9u1cbs"&&(t.textContent=r),a=S(l,` for anything
  coarser than a single neighbourhood — stabler than a single Kiez (PLR), and less individually
  identifying, while still keeping meaningfully more resolution than a whole district. See the
  `),n=E(l,"A",{href:!0,"data-svelte-h":!0}),L(n)!=="svelte-168mye8"&&(n.textContent=_),u=S(l,` for the full "dial, not a ladder"
  framing.`),this.h()},h(){R(n,"href","/gentriduck/methodology-oa-modes")},m(l,o){c(l,t,o),c(l,a,o),c(l,n,o),c(l,u,o)},p:D,d(l){l&&(d(t),d(a),d(n),d(u))}}}function pr(i){let t,r;return t=new qe({props:{queryID:"oa_arealevel",queryResult:i[5]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&32&&(_.queryResult=a[5]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function gr(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[ln]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function ln(i){let t,r="MAUP fragility disclosure (always shown at this grain).",a,n,_="Offering Advantage decoder",u;return{c(){t=B("b"),t.textContent=r,a=C(` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=B("a"),n.textContent=_,u=C(" §4/§7 for the full finding."),this.h()},l(l){t=E(l,"B",{"data-svelte-h":!0}),L(t)!=="svelte-1impqbu"&&(t.textContent=r),a=S(l,` PLR-vs-BZR rankings for the
  canonical nested location quotient correlate only moderately (pooled Spearman ρ ≈ 0.66, below this
  project's own 0.7 stability threshold) — this Bezirksregion's apparent rank in a domain can
  genuinely shift depending on the spatial scale read. See the
  `),n=E(l,"A",{href:!0,"data-svelte-h":!0}),L(n)!=="svelte-168mye8"&&(n.textContent=_),u=S(l," §4/§7 for the full finding."),this.h()},h(){R(n,"href","/gentriduck/methodology-oa-modes")},m(l,o){c(l,t,o),c(l,a,o),c(l,n,o),c(l,u,o)},p:D,d(l){l&&(d(t),d(a),d(n),d(u))}}}function _n(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[cn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[2]&1073741824&&(_.$$scope={dirty:n,ctx:a}),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function dn(i){let t,r;return t=new Ct({props:{data:i[5],x:"poi_domain_h",y:"pct_vs_baseline",title:"Offering Advantage vs. Berlin average, by domain",yAxisTitle:"% vs. citywide average",swapXY:"true",emptySet:"warn",emptyMessage:"No Offering Advantage data for this Bezirksregion."}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&32&&(_.data=a[5]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function cn(i){let t;return{c(){t=C("No Offering Advantage data for this Bezirksregion.")},l(r){t=S(r,"No Offering Advantage data for this Bezirksregion.")},m(r,a){c(r,t,a)},d(r){r&&d(t)}}}function hr(i){let t,r;return t=new ya({props:{status:"info",$$slots:{default:[mn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function mn(i){let t;return{c(){t=C(`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},l(r){t=S(r,`Domain(s) with too few mapped places to compute a stable ratio at this grain are omitted from the
  chart above ("too thinly observed to characterize", never "commercially dead") — this rarely
  triggers at BZR grain, since coarser levels pool far more POIs per area than a single
  neighbourhood.`)},m(r,a){c(r,t,a)},d(r){r&&d(t)}}}function un(i){let t,r="Dominance is sign-blind",a,n,_="Offering Advantage decoder",u;return{c(){t=B("b"),t.textContent=r,a=C(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=B("a"),n.textContent=_,u=C(" §5 for the full ethics note."),this.h()},l(l){t=E(l,"B",{"data-svelte-h":!0}),L(t)!=="svelte-1m1shgn"&&(t.textContent=r),a=S(l,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=E(l,"A",{href:!0,"data-svelte-h":!0}),L(n)!=="svelte-168mye8"&&(n.textContent=_),u=S(l," §5 for the full ethics note."),this.h()},h(){R(n,"href","/gentriduck/methodology-oa-modes")},m(l,o){c(l,t,o),c(l,a,o),c(l,n,o),c(l,u,o)},p:D,d(l){l&&(d(t),d(a),d(n),d(u))}}}function fn(i){let t,r,a,n,_,u,l,o;return t=new ha({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),a=new ha({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),_=new ha({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),l=new ha({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(_.$$.fragment),u=v(),k(l.$$.fragment)},l(h){w(t.$$.fragment,h),r=y(h),w(a.$$.fragment,h),n=y(h),w(_.$$.fragment,h),u=y(h),w(l.$$.fragment,h)},m(h,x){$(t,h,x),c(h,r,x),$(a,h,x),c(h,n,x),$(_,h,x),c(h,u,x),$(l,h,x),o=!0},p:D,i(h){o||(p(t.$$.fragment,h),p(a.$$.fragment,h),p(_.$$.fragment,h),p(l.$$.fragment,h),o=!0)},o(h){g(t.$$.fragment,h),g(a.$$.fragment,h),g(_.$$.fragment,h),g(l.$$.fragment,h),o=!1},d(h){h&&(d(r),d(n),d(u)),b(t,h),b(a,h),b(_,h),b(l,h)}}}function pn(i){let t,r,a,n,_,u,l,o,h,x,z,P;return t=new ha({props:{value:"2025",valueLabel:"2025"}}),a=new ha({props:{value:"2024",valueLabel:"2024"}}),_=new ha({props:{value:"2023",valueLabel:"2023"}}),l=new ha({props:{value:"2022",valueLabel:"2022"}}),h=new ha({props:{value:"2021",valueLabel:"2021"}}),z=new ha({props:{value:"2020",valueLabel:"2020"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(_.$$.fragment),u=v(),k(l.$$.fragment),o=v(),k(h.$$.fragment),x=v(),k(z.$$.fragment)},l(m){w(t.$$.fragment,m),r=y(m),w(a.$$.fragment,m),n=y(m),w(_.$$.fragment,m),u=y(m),w(l.$$.fragment,m),o=y(m),w(h.$$.fragment,m),x=y(m),w(z.$$.fragment,m)},m(m,f){$(t,m,f),c(m,r,f),$(a,m,f),c(m,n,f),$(_,m,f),c(m,u,f),$(l,m,f),c(m,o,f),$(h,m,f),c(m,x,f),$(z,m,f),P=!0},p:D,i(m){P||(p(t.$$.fragment,m),p(a.$$.fragment,m),p(_.$$.fragment,m),p(l.$$.fragment,m),p(h.$$.fragment,m),p(z.$$.fragment,m),P=!0)},o(m){g(t.$$.fragment,m),g(a.$$.fragment,m),g(_.$$.fragment,m),g(l.$$.fragment,m),g(h.$$.fragment,m),g(z.$$.fragment,m),P=!1},d(m){m&&(d(r),d(n),d(u),d(o),d(x)),b(t,m),b(a,m),b(_,m),b(l,m),b(h,m),b(z,m)}}}function yr(i){let t,r;return t=new qe({props:{queryID:"dom_suppressed_count",queryResult:i[6]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&64&&(_.queryResult=a[6]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function gn(i){let t,r=(i[6][0]?i[6][0].n_suppressed:0)+"",a,n,_=(i[6][0]?i[6][0].n_suppressed+i[6][0].n_shown:0)+"",u,l,o;return{c(){t=B("b"),a=C(r),n=C(" of "),u=C(_),l=C(" neighbourhoods here are suppressed below as too thinly observed to characterize"),o=C(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(h){t=E(h,"B",{});var x=va(t);a=S(x,r),n=S(x," of "),u=S(x,_),l=S(x," neighbourhoods here are suppressed below as too thinly observed to characterize"),x.forEach(d),o=S(h,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(h,x){c(h,t,x),de(t,a),de(t,n),de(t,u),de(t,l),c(h,o,x)},p(h,x){x[0]&64&&r!==(r=(h[6][0]?h[6][0].n_suppressed:0)+"")&&Va(a,r),x[0]&64&&_!==(_=(h[6][0]?h[6][0].n_suppressed+h[6][0].n_shown:0)+"")&&Va(u,_)},d(h){h&&(d(t),d(o))}}}function vr(i){let t,r;return t=new qe({props:{queryID:"dominance_children",queryResult:i[7]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&128&&(_.queryResult=a[7]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function hn(i){let t,r,a,n,_,u,l,o,h,x,z,P;return t=new Ke({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new Ke({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),_=new Ke({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),l=new Ke({props:{id:"top_child",title:"Leading type"}}),h=new Ke({props:{id:"n_children",title:"Types in this group here"}}),z=new Ke({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(_.$$.fragment),u=v(),k(l.$$.fragment),o=v(),k(h.$$.fragment),x=v(),k(z.$$.fragment)},l(m){w(t.$$.fragment,m),r=y(m),w(a.$$.fragment,m),n=y(m),w(_.$$.fragment,m),u=y(m),w(l.$$.fragment,m),o=y(m),w(h.$$.fragment,m),x=y(m),w(z.$$.fragment,m)},m(m,f){$(t,m,f),c(m,r,f),$(a,m,f),c(m,n,f),$(_,m,f),c(m,u,f),$(l,m,f),c(m,o,f),$(h,m,f),c(m,x,f),$(z,m,f),P=!0},p:D,i(m){P||(p(t.$$.fragment,m),p(a.$$.fragment,m),p(_.$$.fragment,m),p(l.$$.fragment,m),p(h.$$.fragment,m),p(z.$$.fragment,m),P=!0)},o(m){g(t.$$.fragment,m),g(a.$$.fragment,m),g(_.$$.fragment,m),g(l.$$.fragment,m),g(h.$$.fragment,m),g(z.$$.fragment,m),P=!1},d(m){m&&(d(r),d(n),d(u),d(o),d(x)),b(t,m),b(a,m),b(_,m),b(l,m),b(h,m),b(z,m)}}}function br(i){let t,r;return t=new qe({props:{queryID:"demographics",queryResult:i[8]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&256&&(_.queryResult=a[8]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function $r(i){let t,r;return t=new ya({props:{status:"warning",$$slots:{default:[yn]},$$scope:{ctx:i}}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function yn(i){let t;return{c(){t=C(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},l(r){t=S(r,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this area's figures may understate the true total.`)},m(r,a){c(r,t,a)},d(r){r&&d(t)}}}function wr(i){let t,r;return t=new qe({props:{queryID:"amenities_current",queryResult:i[9]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&512&&(_.queryResult=a[9]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function kr(i){let t,r;return t=new qe({props:{queryID:"amenities_table",queryResult:i[10]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&1024&&(_.queryResult=a[10]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function vn(i){let t;return{c(){t=C("No amenity data is available for this area yet.")},l(r){t=S(r,"No amenity data is available for this area yet.")},m(r,a){c(r,t,a)},p:D,d(r){r&&d(t)}}}function bn(i){let t,r,a=i[9][0].snapshot_year+"",n,_;return{c(){t=C("Based on OpenStreetMap tagging as of "),r=B("b"),n=C(a),_=C(`, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(u){t=S(u,"Based on OpenStreetMap tagging as of "),r=E(u,"B",{});var l=va(r);n=S(l,a),l.forEach(d),_=S(u,`, this Bezirksregion
has the everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(u,l){c(u,t,l),c(u,r,l),de(r,n),c(u,_,l)},p(u,l){l[0]&512&&a!==(a=u[9][0].snapshot_year+"")&&Va(n,a)},d(u){u&&(d(t),d(r),d(_))}}}function $n(i){let t,r,a,n,_,u;return t=new Ke({props:{id:"indicator",title:"Infrastructure"}}),a=new Ke({props:{id:"area_value",title:"This Bezirksregion"}}),_=new Ke({props:{id:"district_value",title:"District total"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(_.$$.fragment)},l(l){w(t.$$.fragment,l),r=y(l),w(a.$$.fragment,l),n=y(l),w(_.$$.fragment,l)},m(l,o){$(t,l,o),c(l,r,o),$(a,l,o),c(l,n,o),$(_,l,o),u=!0},p:D,i(l){u||(p(t.$$.fragment,l),p(a.$$.fragment,l),p(_.$$.fragment,l),u=!0)},o(l){g(t.$$.fragment,l),g(a.$$.fragment,l),g(_.$$.fragment,l),u=!1},d(l){l&&(d(r),d(n)),b(t,l),b(a,l),b(_,l)}}}function wn(i){let t,r,a="0",n,_,u="open-data",l;return{c(){t=C("These figures come from OpenStreetMap tagging, not an official registry. A "),r=B("b"),r.textContent=a,n=C(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),_=B("a"),_.textContent=u,l=C(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(o){t=S(o,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=E(o,"B",{"data-svelte-h":!0}),L(r)!=="svelte-12bhsds"&&(r.textContent=a),n=S(o,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),_=E(o,"A",{href:!0,"data-svelte-h":!0}),L(_)!=="svelte-1jijq3i"&&(_.textContent=u),l=S(o,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){R(_,"href","/gentriduck/open-data")},m(o,h){c(o,t,h),c(o,r,h),c(o,n,h),c(o,_,h),c(o,l,h)},p:D,d(o){o&&(d(t),d(r),d(n),d(_),d(l))}}}function kn(i){let t;return{c(){t=C(`There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=S(r,`There isn't enough tagged cuisine data in this Bezirksregion yet to identify a most-common cuisine
(OpenStreetMap tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){c(r,t,a)},p:D,d(r){r&&d(t)}}}function Rn(i){let t,r,a=i[9][0].gastro_poi_with_cuisine_count+"",n,_,u,l="most common cuisine",o,h,x=i[9][0].dominant_cuisine+"",z,P,m=Math.round(i[9][0].dominant_cuisine_share*100)+"",f,ce;return{c(){t=C("Among "),r=B("b"),n=C(a),_=C(` restaurants/cafes with cuisine
data tagged in this Bezirksregion, the `),u=B("b"),u.textContent=l,o=C(` is
`),h=B("b"),z=C(x),P=C(`
(`),f=C(m),ce=C("% of tagged gastronomy POIs).")},l(T){t=S(T,"Among "),r=E(T,"B",{});var M=va(r);n=S(M,a),M.forEach(d),_=S(T,` restaurants/cafes with cuisine
data tagged in this Bezirksregion, the `),u=E(T,"B",{"data-svelte-h":!0}),L(u)!=="svelte-1floooe"&&(u.textContent=l),o=S(T,` is
`),h=E(T,"B",{});var Ve=va(h);z=S(Ve,x),Ve.forEach(d),P=S(T,`
(`),f=S(T,m),ce=S(T,"% of tagged gastronomy POIs).")},m(T,M){c(T,t,M),c(T,r,M),de(r,n),c(T,_,M),c(T,u,M),c(T,o,M),c(T,h,M),de(h,z),c(T,P,M),c(T,f,M),c(T,ce,M)},p(T,M){M[0]&512&&a!==(a=T[9][0].gastro_poi_with_cuisine_count+"")&&Va(n,a),M[0]&512&&x!==(x=T[9][0].dominant_cuisine+"")&&Va(z,x),M[0]&512&&m!==(m=Math.round(T[9][0].dominant_cuisine_share*100)+"")&&Va(f,m)},d(T){T&&(d(t),d(r),d(_),d(u),d(o),d(h),d(P),d(f),d(ce))}}}function Rr(i){let t,r;return t=new qe({props:{queryID:"minimap_areas",queryResult:i[11]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&2048&&(_.queryResult=a[11]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function xr(i){let t,r;return t=new qe({props:{queryID:"children",queryResult:i[12]}}),{c(){k(t.$$.fragment)},l(a){w(t.$$.fragment,a)},m(a,n){$(t,a,n),r=!0},p(a,n){const _={};n[0]&4096&&(_.queryResult=a[12]),t.$set(_)},i(a){r||(p(t.$$.fragment,a),r=!0)},o(a){g(t.$$.fragment,a),r=!1},d(a){b(t,a)}}}function xn(i){let t,r,a,n,_,u;return t=new Ke({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),a=new Ke({props:{id:"stage",title:"Stage"}}),_=new Ke({props:{id:"pressure_trend",title:"Pressure trend"}}),{c(){k(t.$$.fragment),r=v(),k(a.$$.fragment),n=v(),k(_.$$.fragment)},l(l){w(t.$$.fragment,l),r=y(l),w(a.$$.fragment,l),n=y(l),w(_.$$.fragment,l)},m(l,o){$(t,l,o),c(l,r,o),$(a,l,o),c(l,n,o),$(_,l,o),u=!0},p:D,i(l){u||(p(t.$$.fragment,l),p(a.$$.fragment,l),p(_.$$.fragment,l),u=!0)},o(l){g(t.$$.fragment,l),g(a.$$.fragment,l),g(_.$$.fragment,l),u=!1},d(l){l&&(d(r),d(n)),b(t,l),b(a,l),b(_,l)}}}function En(i){var Zt;let t,r,a,n,_,u,l,o,h,x,z,P,m,f="all districts",ce,T,M="full neighbourhood list",Ve,Te,Ba,se,aa='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',ta,Se,Ja=`Every neighbourhood (Planungsraum) in this Bezirksregion is individually classified into one of six
gentrification stages (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This page reports the <strong class="markdown">distribution</strong> of
those neighbourhood-level stages — never a single re-scored index value for the Bezirksregion
itself, since averaging ordinal stage codes across such different neighbourhoods would mask exactly
the neighbourhood-to-neighbourhood heterogeneity gentrification tracking depends on (see &quot;Honest
caveats&quot; below).`,za,ye,ve,te,me,ra,Ce,je,ie,qa='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Je,Ee,Ya='<a href="#mapped-places">Mapped places</a>',Le,be,$e,Ta,Be,Ga='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',He,ue,na,sa,ia,fe,F,we,ba=i[5].some(Er),oa,Me,Xa=`Values shown are the canonical nested location quotient, summed up from constituent
neighbourhoods&#39; counts and re-computed at this grain (never averaged — ADR-0024 D2) — the same
already-published figure this project publishes, not a new statistic. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the other eight calculation methods and the
full roll-up rule.`,Pe,oe,Sa='<a href="#within-group-dominance">Within-group dominance</a>',Ca,De,ja,pe,Fe,ke,La,la,Ae,Ie,Re,xe,Ha,Ne,et=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Oe,le,Ma='<a href="#people--structure">People &amp; structure</a>',Pa,_a,Ue,Qe,ge,da,We,Da,ca,_e,ma='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',ua,fa,pa,Ye,q,Ze,Fa,ga,lt,Wa,_t,Za,jt=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,dt,$a,Lt='<a href="#where-this-area-sits">Where this area sits</a>',ct,at,Aa,mt,wa,Ht='<a href="#neighbourhoods-planungsräume-in-this-bezirksregion">Neighbourhoods (Planungsräume) in this Bezirksregion</a>',ut,tt,Ia,ft,ka,Mt='<a href="#honest-caveats">Honest caveats</a>',pt,Na,Pt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Bezirksregion</strong> —
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,gt,Ra,Dt='<a href="#further-reading">Further reading</a>',ht,Oa,Ft=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a>
for other areas, or drill into any of this Bezirksregion&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,yt,nt,vt,Ka,bt,xa=typeof j<"u"&&(j.title||((Zt=j.og)==null?void 0:Zt.title))&&j.hide_title!==!0&&Kr();function Br(e,s){var he;return typeof j<"u"&&(j.title||(he=j.og)!=null&&he.title)?Jr:Vr}let st=Br()(i),Ea=typeof j=="object"&&Yr(),A=i[1]&&dr(i),I=i[2]&&cr(i);o=new Ar({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(i[1][0]&&i[1][0].area_name)+" — Bezirksregion profile",lede:"Population, composition, and neighbourhood-stage mix for this Bezirksregion, summed and recomputed from its constituent Planungsräume — never a re-scored index at this grain."}});function At(e,s){var he;return(he=e[2][0])!=null&&he.area_code?an:en}let $t=At(i),Ge=$t(i);Te=new ya({props:{status:"info",$$slots:{default:[tn]},$$scope:{ctx:i}}});let N=i[3]&&mr(i),O=i[0]&&ur(i);const It=[nn,rn],Ua=[];function Nt(e,s){return e[13]?0:1}te=Nt(i),me=Ua[te]=It[te](i),Ce=new Ct({props:{data:i[3],x:"stage",y:"n_areas",title:"Neighbourhoods by stage",swapXY:"true"}});let U=i[4]&&fr(i);$e=new Ct({props:{data:i[4],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot)",swapXY:"true"}}),ue=new ya({props:{status:"info",$$slots:{default:[on]},$$scope:{ctx:i}}});let Q=i[5]&&pr(i),X=i[5][0]&&i[5][0].maup_caveat_required&&gr(i);const Ot=[dn,_n],Qa=[];function Ut(e,s){return e[5].length>0?0:1}fe=Ut(i),F=Qa[fe]=Ot[fe](i);let ee=ba&&hr(i);De=new ya({props:{status:"info",$$slots:{default:[un]},$$scope:{ctx:i}}}),pe=new _r({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[fn]},$$scope:{ctx:i}}}),ke=new _r({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[pn]},$$scope:{ctx:i}}});let W=i[6]&&yr(i);Ae=new ya({props:{status:"info",$$slots:{default:[gn]},$$scope:{ctx:i}}});let Z=i[7]&&vr(i);xe=new Tt({props:{data:i[7],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Bezirksregion.",$$slots:{default:[hn]},$$scope:{ctx:i}}});let K=i[8]&&br(i);Ue=new St({props:{data:i[8],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),ge=new St({props:{data:i[8],value:"n_plr",title:"Constituent neighbourhoods (Planungsräume)",emptySet:"warn"}}),We=new St({props:{data:i[8],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let ae=i[8]&&i[8][0]&&i[8][0].any_indicator_suppressed&&$r(i),V=i[9]&&wr(i),J=i[10]&&kr(i);function Qt(e,s){return e[9][0]?bn:vn}let wt=Qt(i),Xe=wt(i);Ze=new Tt({props:{data:i[10],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[$n]},$$scope:{ctx:i}}}),ga=new ya({props:{status:"info",$$slots:{default:[wn]},$$scope:{ctx:i}}});function Wt(e,s){return e[9][0]&&e[9][0].gastro_poi_with_cuisine_count>=8&&e[9][0].dominant_cuisine_share>=.15?Rn:kn}let kt=Wt(i),ea=kt(i),Y=i[11]&&Rr(i);Aa=new Dr({props:{data:i[11],geoJsonUrl:`${ot}/geo/bzr_plr_drilldown.geojson`,title:(i[1][0]?i[1][0].area_name:"This Bezirksregion")+" and its neighbourhoods"}});let G=i[12]&&xr(i);return Ia=new Tt({props:{data:i[12],rows:"20",link:"area_link",$$slots:{default:[xn]},$$scope:{ctx:i}}}),Ka=new Fr({}),{c(){xa&&xa.c(),t=v(),st.c(),r=B("meta"),a=B("meta"),Ea&&Ea.c(),n=Rt(),_=v(),A&&A.c(),u=v(),I&&I.c(),l=v(),k(o.$$.fragment),h=v(),x=B("p"),z=C("Up: "),Ge.c(),P=C(" · "),m=B("a"),m.textContent=f,ce=C(" · "),T=B("a"),T.textContent=M,Ve=v(),k(Te.$$.fragment),Ba=v(),se=B("h2"),se.innerHTML=aa,ta=v(),Se=B("p"),Se.innerHTML=Ja,za=v(),N&&N.c(),ye=v(),O&&O.c(),ve=v(),me.c(),ra=v(),k(Ce.$$.fragment),je=v(),ie=B("h2"),ie.innerHTML=qa,Je=v(),Ee=B("h3"),Ee.innerHTML=Ya,Le=v(),U&&U.c(),be=v(),k($e.$$.fragment),Ta=v(),Be=B("h3"),Be.innerHTML=Ga,He=v(),k(ue.$$.fragment),na=v(),Q&&Q.c(),sa=v(),X&&X.c(),ia=v(),F.c(),we=v(),ee&&ee.c(),oa=v(),Me=B("p"),Me.innerHTML=Xa,Pe=v(),oe=B("h2"),oe.innerHTML=Sa,Ca=v(),k(De.$$.fragment),ja=v(),k(pe.$$.fragment),Fe=v(),k(ke.$$.fragment),La=v(),W&&W.c(),la=v(),k(Ae.$$.fragment),Ie=v(),Z&&Z.c(),Re=v(),k(xe.$$.fragment),Ha=v(),Ne=B("p"),Ne.innerHTML=et,Oe=v(),le=B("h2"),le.innerHTML=Ma,Pa=v(),K&&K.c(),_a=v(),k(Ue.$$.fragment),Qe=v(),k(ge.$$.fragment),da=v(),k(We.$$.fragment),Da=v(),ae&&ae.c(),ca=v(),_e=B("h2"),_e.innerHTML=ma,ua=v(),V&&V.c(),fa=v(),J&&J.c(),pa=v(),Ye=B("p"),Xe.c(),q=v(),k(Ze.$$.fragment),Fa=v(),k(ga.$$.fragment),lt=v(),Wa=B("p"),ea.c(),_t=v(),Za=B("p"),Za.textContent=jt,dt=v(),$a=B("h2"),$a.innerHTML=Lt,ct=v(),Y&&Y.c(),at=v(),k(Aa.$$.fragment),mt=v(),wa=B("h3"),wa.innerHTML=Ht,ut=v(),G&&G.c(),tt=v(),k(Ia.$$.fragment),ft=v(),ka=B("h2"),ka.innerHTML=Mt,pt=v(),Na=B("ul"),Na.innerHTML=Pt,gt=v(),Ra=B("h2"),Ra.innerHTML=Dt,ht=v(),Oa=B("p"),Oa.innerHTML=Ft,yt=v(),nt=B("hr"),vt=v(),k(Ka.$$.fragment),this.h()},l(e){xa&&xa.l(e),t=y(e);const s=qr("svelte-2igo1p",document.head);st.l(s),r=E(s,"META",{name:!0,content:!0}),a=E(s,"META",{name:!0,content:!0}),Ea&&Ea.l(s),n=Rt(),s.forEach(d),_=y(e),A&&A.l(e),u=y(e),I&&I.l(e),l=y(e),w(o.$$.fragment,e),h=y(e),x=E(e,"P",{});var he=va(x);z=S(he,"Up: "),Ge.l(he),P=S(he," · "),m=E(he,"A",{href:!0,"data-svelte-h":!0}),L(m)!=="svelte-6j2qr0"&&(m.textContent=f),ce=S(he," · "),T=E(he,"A",{href:!0,"data-svelte-h":!0}),L(T)!=="svelte-z78e0k"&&(T.textContent=M),he.forEach(d),Ve=y(e),w(Te.$$.fragment,e),Ba=y(e),se=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(se)!=="svelte-14f17uo"&&(se.innerHTML=aa),ta=y(e),Se=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Se)!=="svelte-9cztr0"&&(Se.innerHTML=Ja),za=y(e),N&&N.l(e),ye=y(e),O&&O.l(e),ve=y(e),me.l(e),ra=y(e),w(Ce.$$.fragment,e),je=y(e),ie=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(ie)!=="svelte-1i9w9pn"&&(ie.innerHTML=qa),Je=y(e),Ee=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(Ee)!=="svelte-3hvew3"&&(Ee.innerHTML=Ya),Le=y(e),U&&U.l(e),be=y(e),w($e.$$.fragment,e),Ta=y(e),Be=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(Be)!=="svelte-5mc7pd"&&(Be.innerHTML=Ga),He=y(e),w(ue.$$.fragment,e),na=y(e),Q&&Q.l(e),sa=y(e),X&&X.l(e),ia=y(e),F.l(e),we=y(e),ee&&ee.l(e),oa=y(e),Me=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Me)!=="svelte-1q1lnxb"&&(Me.innerHTML=Xa),Pe=y(e),oe=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(oe)!=="svelte-4kb45v"&&(oe.innerHTML=Sa),Ca=y(e),w(De.$$.fragment,e),ja=y(e),w(pe.$$.fragment,e),Fe=y(e),w(ke.$$.fragment,e),La=y(e),W&&W.l(e),la=y(e),w(Ae.$$.fragment,e),Ie=y(e),Z&&Z.l(e),Re=y(e),w(xe.$$.fragment,e),Ha=y(e),Ne=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Ne)!=="svelte-1xa7bh7"&&(Ne.innerHTML=et),Oe=y(e),le=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(le)!=="svelte-1mdzqzc"&&(le.innerHTML=Ma),Pa=y(e),K&&K.l(e),_a=y(e),w(Ue.$$.fragment,e),Qe=y(e),w(ge.$$.fragment,e),da=y(e),w(We.$$.fragment,e),Da=y(e),ae&&ae.l(e),ca=y(e),_e=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(_e)!=="svelte-12k6lqd"&&(_e.innerHTML=ma),ua=y(e),V&&V.l(e),fa=y(e),J&&J.l(e),pa=y(e),Ye=E(e,"P",{});var it=va(Ye);Xe.l(it),it.forEach(d),q=y(e),w(Ze.$$.fragment,e),Fa=y(e),w(ga.$$.fragment,e),lt=y(e),Wa=E(e,"P",{});var rt=va(Wa);ea.l(rt),rt.forEach(d),_t=y(e),Za=E(e,"P",{"data-svelte-h":!0}),L(Za)!=="svelte-ja6pm6"&&(Za.textContent=jt),dt=y(e),$a=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L($a)!=="svelte-60cjj9"&&($a.innerHTML=Lt),ct=y(e),Y&&Y.l(e),at=y(e),w(Aa.$$.fragment,e),mt=y(e),wa=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(wa)!=="svelte-fqpmt1"&&(wa.innerHTML=Ht),ut=y(e),G&&G.l(e),tt=y(e),w(Ia.$$.fragment,e),ft=y(e),ka=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(ka)!=="svelte-ad0syq"&&(ka.innerHTML=Mt),pt=y(e),Na=E(e,"UL",{class:!0,"data-svelte-h":!0}),L(Na)!=="svelte-1eqtvvm"&&(Na.innerHTML=Pt),gt=y(e),Ra=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(Ra)!=="svelte-oimjns"&&(Ra.innerHTML=Dt),ht=y(e),Oa=E(e,"P",{class:!0,"data-svelte-h":!0}),L(Oa)!=="svelte-4b8jxq"&&(Oa.innerHTML=Ft),yt=y(e),nt=E(e,"HR",{class:!0}),vt=y(e),w(Ka.$$.fragment,e),this.h()},h(){R(r,"name","twitter:card"),R(r,"content","summary_large_image"),R(a,"name","twitter:site"),R(a,"content","@evidence_dev"),R(m,"href","/gentriduck/berlin/area/bezirk"),R(T,"href","/gentriduck/berlin/area"),R(se,"class","markdown"),R(se,"id","social-status--trajectory"),R(Se,"class","markdown"),R(ie,"class","markdown"),R(ie,"id","commercial-mix--offering-advantage"),R(Ee,"class","markdown"),R(Ee,"id","mapped-places"),R(Be,"class","markdown"),R(Be,"id","offering-advantage-across-the-area-hierarchy"),R(Me,"class","markdown"),R(oe,"class","markdown"),R(oe,"id","within-group-dominance"),R(Ne,"class","markdown"),R(le,"class","markdown"),R(le,"id","people--structure"),R(_e,"class","markdown"),R(_e,"id","amenities--everyday-infrastructure"),R($a,"class","markdown"),R($a,"id","where-this-area-sits"),R(wa,"class","markdown"),R(wa,"id","neighbourhoods-planungsräume-in-this-bezirksregion"),R(ka,"class","markdown"),R(ka,"id","honest-caveats"),R(Na,"class","markdown"),R(Ra,"class","markdown"),R(Ra,"id","further-reading"),R(Oa,"class","markdown"),R(nt,"class","markdown")},m(e,s){xa&&xa.m(e,s),c(e,t,s),st.m(document.head,null),de(document.head,r),de(document.head,a),Ea&&Ea.m(document.head,null),de(document.head,n),c(e,_,s),A&&A.m(e,s),c(e,u,s),I&&I.m(e,s),c(e,l,s),$(o,e,s),c(e,h,s),c(e,x,s),de(x,z),Ge.m(x,null),de(x,P),de(x,m),de(x,ce),de(x,T),c(e,Ve,s),$(Te,e,s),c(e,Ba,s),c(e,se,s),c(e,ta,s),c(e,Se,s),c(e,za,s),N&&N.m(e,s),c(e,ye,s),O&&O.m(e,s),c(e,ve,s),Ua[te].m(e,s),c(e,ra,s),$(Ce,e,s),c(e,je,s),c(e,ie,s),c(e,Je,s),c(e,Ee,s),c(e,Le,s),U&&U.m(e,s),c(e,be,s),$($e,e,s),c(e,Ta,s),c(e,Be,s),c(e,He,s),$(ue,e,s),c(e,na,s),Q&&Q.m(e,s),c(e,sa,s),X&&X.m(e,s),c(e,ia,s),Qa[fe].m(e,s),c(e,we,s),ee&&ee.m(e,s),c(e,oa,s),c(e,Me,s),c(e,Pe,s),c(e,oe,s),c(e,Ca,s),$(De,e,s),c(e,ja,s),$(pe,e,s),c(e,Fe,s),$(ke,e,s),c(e,La,s),W&&W.m(e,s),c(e,la,s),$(Ae,e,s),c(e,Ie,s),Z&&Z.m(e,s),c(e,Re,s),$(xe,e,s),c(e,Ha,s),c(e,Ne,s),c(e,Oe,s),c(e,le,s),c(e,Pa,s),K&&K.m(e,s),c(e,_a,s),$(Ue,e,s),c(e,Qe,s),$(ge,e,s),c(e,da,s),$(We,e,s),c(e,Da,s),ae&&ae.m(e,s),c(e,ca,s),c(e,_e,s),c(e,ua,s),V&&V.m(e,s),c(e,fa,s),J&&J.m(e,s),c(e,pa,s),c(e,Ye,s),Xe.m(Ye,null),c(e,q,s),$(Ze,e,s),c(e,Fa,s),$(ga,e,s),c(e,lt,s),c(e,Wa,s),ea.m(Wa,null),c(e,_t,s),c(e,Za,s),c(e,dt,s),c(e,$a,s),c(e,ct,s),Y&&Y.m(e,s),c(e,at,s),$(Aa,e,s),c(e,mt,s),c(e,wa,s),c(e,ut,s),G&&G.m(e,s),c(e,tt,s),$(Ia,e,s),c(e,ft,s),c(e,ka,s),c(e,pt,s),c(e,Na,s),c(e,gt,s),c(e,Ra,s),c(e,ht,s),c(e,Oa,s),c(e,yt,s),c(e,nt,s),c(e,vt,s),$(Ka,e,s),bt=!0},p(e,s){var sr;typeof j<"u"&&(j.title||(sr=j.og)!=null&&sr.title)&&j.hide_title!==!0&&xa.p(e,s),st.p(e,s),typeof j=="object"&&Ea.p(e,s),e[1]?A?(A.p(e,s),s[0]&2&&p(A,1)):(A=dr(e),A.c(),p(A,1),A.m(u.parentNode,u)):A&&(ne(),g(A,1,1,()=>{A=null}),re()),e[2]?I?(I.p(e,s),s[0]&4&&p(I,1)):(I=cr(e),I.c(),p(I,1),I.m(l.parentNode,l)):I&&(ne(),g(I,1,1,()=>{I=null}),re());const he={};s[0]&2&&(he.title=(e[1][0]&&e[1][0].area_name)+" — Bezirksregion profile"),o.$set(he),$t===($t=At(e))&&Ge?Ge.p(e,s):(Ge.d(1),Ge=$t(e),Ge&&(Ge.c(),Ge.m(x,P)));const it={};s[2]&1073741824&&(it.$$scope={dirty:s,ctx:e}),Te.$set(it),e[3]?N?(N.p(e,s),s[0]&8&&p(N,1)):(N=mr(e),N.c(),p(N,1),N.m(ye.parentNode,ye)):N&&(ne(),g(N,1,1,()=>{N=null}),re()),e[0]?O?(O.p(e,s),s[0]&1&&p(O,1)):(O=ur(e),O.c(),p(O,1),O.m(ve.parentNode,ve)):O&&(ne(),g(O,1,1,()=>{O=null}),re());let rt=te;te=Nt(e),te===rt?Ua[te].p(e,s):(ne(),g(Ua[rt],1,1,()=>{Ua[rt]=null}),re(),me=Ua[te],me?me.p(e,s):(me=Ua[te]=It[te](e),me.c()),p(me,1),me.m(ra.parentNode,ra));const Kt={};s[0]&8&&(Kt.data=e[3]),Ce.$set(Kt),e[4]?U?(U.p(e,s),s[0]&16&&p(U,1)):(U=fr(e),U.c(),p(U,1),U.m(be.parentNode,be)):U&&(ne(),g(U,1,1,()=>{U=null}),re());const Vt={};s[0]&16&&(Vt.data=e[4]),$e.$set(Vt);const Jt={};s[2]&1073741824&&(Jt.$$scope={dirty:s,ctx:e}),ue.$set(Jt),e[5]?Q?(Q.p(e,s),s[0]&32&&p(Q,1)):(Q=pr(e),Q.c(),p(Q,1),Q.m(sa.parentNode,sa)):Q&&(ne(),g(Q,1,1,()=>{Q=null}),re()),e[5][0]&&e[5][0].maup_caveat_required?X?s[0]&32&&p(X,1):(X=gr(e),X.c(),p(X,1),X.m(ia.parentNode,ia)):X&&(ne(),g(X,1,1,()=>{X=null}),re());let xt=fe;fe=Ut(e),fe===xt?Qa[fe].p(e,s):(ne(),g(Qa[xt],1,1,()=>{Qa[xt]=null}),re(),F=Qa[fe],F?F.p(e,s):(F=Qa[fe]=Ot[fe](e),F.c()),p(F,1),F.m(we.parentNode,we)),s[0]&32&&(ba=e[5].some(Er)),ba?ee?s[0]&32&&p(ee,1):(ee=hr(e),ee.c(),p(ee,1),ee.m(oa.parentNode,oa)):ee&&(ne(),g(ee,1,1,()=>{ee=null}),re());const Yt={};s[2]&1073741824&&(Yt.$$scope={dirty:s,ctx:e}),De.$set(Yt);const Gt={};s[2]&1073741824&&(Gt.$$scope={dirty:s,ctx:e}),pe.$set(Gt);const Xt={};s[2]&1073741824&&(Xt.$$scope={dirty:s,ctx:e}),ke.$set(Xt),e[6]?W?(W.p(e,s),s[0]&64&&p(W,1)):(W=yr(e),W.c(),p(W,1),W.m(la.parentNode,la)):W&&(ne(),g(W,1,1,()=>{W=null}),re());const er={};s[0]&64|s[2]&1073741824&&(er.$$scope={dirty:s,ctx:e}),Ae.$set(er),e[7]?Z?(Z.p(e,s),s[0]&128&&p(Z,1)):(Z=vr(e),Z.c(),p(Z,1),Z.m(Re.parentNode,Re)):Z&&(ne(),g(Z,1,1,()=>{Z=null}),re());const Et={};s[0]&128&&(Et.data=e[7]),s[2]&1073741824&&(Et.$$scope={dirty:s,ctx:e}),xe.$set(Et),e[8]?K?(K.p(e,s),s[0]&256&&p(K,1)):(K=br(e),K.c(),p(K,1),K.m(_a.parentNode,_a)):K&&(ne(),g(K,1,1,()=>{K=null}),re());const ar={};s[0]&256&&(ar.data=e[8]),Ue.$set(ar);const tr={};s[0]&256&&(tr.data=e[8]),ge.$set(tr);const rr={};s[0]&256&&(rr.data=e[8]),We.$set(rr),e[8]&&e[8][0]&&e[8][0].any_indicator_suppressed?ae?s[0]&256&&p(ae,1):(ae=$r(e),ae.c(),p(ae,1),ae.m(ca.parentNode,ca)):ae&&(ne(),g(ae,1,1,()=>{ae=null}),re()),e[9]?V?(V.p(e,s),s[0]&512&&p(V,1)):(V=wr(e),V.c(),p(V,1),V.m(fa.parentNode,fa)):V&&(ne(),g(V,1,1,()=>{V=null}),re()),e[10]?J?(J.p(e,s),s[0]&1024&&p(J,1)):(J=kr(e),J.c(),p(J,1),J.m(pa.parentNode,pa)):J&&(ne(),g(J,1,1,()=>{J=null}),re()),wt===(wt=Qt(e))&&Xe?Xe.p(e,s):(Xe.d(1),Xe=wt(e),Xe&&(Xe.c(),Xe.m(Ye,null)));const Bt={};s[0]&1024&&(Bt.data=e[10]),s[2]&1073741824&&(Bt.$$scope={dirty:s,ctx:e}),Ze.$set(Bt);const nr={};s[2]&1073741824&&(nr.$$scope={dirty:s,ctx:e}),ga.$set(nr),kt===(kt=Wt(e))&&ea?ea.p(e,s):(ea.d(1),ea=kt(e),ea&&(ea.c(),ea.m(Wa,null))),e[11]?Y?(Y.p(e,s),s[0]&2048&&p(Y,1)):(Y=Rr(e),Y.c(),p(Y,1),Y.m(at.parentNode,at)):Y&&(ne(),g(Y,1,1,()=>{Y=null}),re());const zt={};s[0]&2048&&(zt.data=e[11]),s[0]&2&&(zt.title=(e[1][0]?e[1][0].area_name:"This Bezirksregion")+" and its neighbourhoods"),Aa.$set(zt),e[12]?G?(G.p(e,s),s[0]&4096&&p(G,1)):(G=xr(e),G.c(),p(G,1),G.m(tt.parentNode,tt)):G&&(ne(),g(G,1,1,()=>{G=null}),re());const qt={};s[0]&4096&&(qt.data=e[12]),s[2]&1073741824&&(qt.$$scope={dirty:s,ctx:e}),Ia.$set(qt)},i(e){bt||(p(A),p(I),p(o.$$.fragment,e),p(Te.$$.fragment,e),p(N),p(O),p(me),p(Ce.$$.fragment,e),p(U),p($e.$$.fragment,e),p(ue.$$.fragment,e),p(Q),p(X),p(F),p(ee),p(De.$$.fragment,e),p(pe.$$.fragment,e),p(ke.$$.fragment,e),p(W),p(Ae.$$.fragment,e),p(Z),p(xe.$$.fragment,e),p(K),p(Ue.$$.fragment,e),p(ge.$$.fragment,e),p(We.$$.fragment,e),p(ae),p(V),p(J),p(Ze.$$.fragment,e),p(ga.$$.fragment,e),p(Y),p(Aa.$$.fragment,e),p(G),p(Ia.$$.fragment,e),p(Ka.$$.fragment,e),bt=!0)},o(e){g(A),g(I),g(o.$$.fragment,e),g(Te.$$.fragment,e),g(N),g(O),g(me),g(Ce.$$.fragment,e),g(U),g($e.$$.fragment,e),g(ue.$$.fragment,e),g(Q),g(X),g(F),g(ee),g(De.$$.fragment,e),g(pe.$$.fragment,e),g(ke.$$.fragment,e),g(W),g(Ae.$$.fragment,e),g(Z),g(xe.$$.fragment,e),g(K),g(Ue.$$.fragment,e),g(ge.$$.fragment,e),g(We.$$.fragment,e),g(ae),g(V),g(J),g(Ze.$$.fragment,e),g(ga.$$.fragment,e),g(Y),g(Aa.$$.fragment,e),g(G),g(Ia.$$.fragment,e),g(Ka.$$.fragment,e),bt=!1},d(e){e&&(d(t),d(_),d(u),d(l),d(h),d(x),d(Ve),d(Ba),d(se),d(ta),d(Se),d(za),d(ye),d(ve),d(ra),d(je),d(ie),d(Je),d(Ee),d(Le),d(be),d(Ta),d(Be),d(He),d(na),d(sa),d(ia),d(we),d(oa),d(Me),d(Pe),d(oe),d(Ca),d(ja),d(Fe),d(La),d(la),d(Ie),d(Re),d(Ha),d(Ne),d(Oe),d(le),d(Pa),d(_a),d(Qe),d(da),d(Da),d(ca),d(_e),d(ua),d(fa),d(pa),d(Ye),d(q),d(Fa),d(lt),d(Wa),d(_t),d(Za),d(dt),d($a),d(ct),d(at),d(mt),d(wa),d(ut),d(tt),d(ft),d(ka),d(pt),d(Na),d(gt),d(Ra),d(ht),d(Oa),d(yt),d(nt),d(vt)),xa&&xa.d(e),st.d(e),d(r),d(a),Ea&&Ea.d(e),d(n),A&&A.d(e),I&&I.d(e),b(o,e),Ge.d(),b(Te,e),N&&N.d(e),O&&O.d(e),Ua[te].d(e),b(Ce,e),U&&U.d(e),b($e,e),b(ue,e),Q&&Q.d(e),X&&X.d(e),Qa[fe].d(e),ee&&ee.d(e),b(De,e),b(pe,e),b(ke,e),W&&W.d(e),b(Ae,e),Z&&Z.d(e),b(xe,e),K&&K.d(e),b(Ue,e),b(ge,e),b(We,e),ae&&ae.d(e),V&&V.d(e),J&&J.d(e),Xe.d(),b(Ze,e),b(ga,e),ea.d(),Y&&Y.d(e),b(Aa,e),G&&G.d(e),b(Ia,e),b(Ka,e)}}}const j={},Er=i=>i.oa_domain_min_base_flag;function Bn(i,t,r){let a,n,_,u;ir(i,Wr,q=>r(71,_=q)),ir(i,lr,q=>r(75,u=q));let{data:l}=t,{data:o={},customFormattingSettings:h,__db:x,inputs:z}=l;Tr(lr,u="a84918331b5c343c58cc632906369951",u);let P=Nr(Ir(z));Sr(P.subscribe(q=>r(16,z=q))),Cr(Qr,{getCustomFormats:()=>h.customFormats||[]});const m=(q,Ze)=>Zr(x.query,q,{query_name:Ze});Or(m);let f=_.params;jr(()=>!0);let ce={initialData:void 0,initialError:void 0},T=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
limit 1`,M=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
limit 1`;o.bzr_name_data&&(o.bzr_name_data instanceof Error?ce.initialError=o.bzr_name_data:ce.initialData=o.bzr_name_data,o.bzr_name_columns&&(ce.knownColumns=o.bzr_name_columns));let Ve,Te=!1;const Ba=ze.createReactive({callback:q=>{r(1,Ve=q)},execFn:m},{id:"bzr_name",...ce});Ba(M,{noResolve:T,...ce}),globalThis[Symbol.for("bzr_name")]={get value(){return Ve}};let se={initialData:void 0,initialError:void 0},aa=H`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${f.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`,ta=`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${f.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`;o.pgr_name_data&&(o.pgr_name_data instanceof Error?se.initialError=o.pgr_name_data:se.initialData=o.pgr_name_data,o.pgr_name_columns&&(se.knownColumns=o.pgr_name_columns));let Se,Ja=!1;const za=ze.createReactive({callback:q=>{r(2,Se=q)},execFn:m},{id:"pgr_name",...se});za(ta,{noResolve:aa,...se}),globalThis[Symbol.for("pgr_name")]={get value(){return Se}};let ye={initialData:void 0,initialError:void 0},ve=H`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${f.code}'
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
  and substr(area_code, 1, 6) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`;o.stage_mix_data&&(o.stage_mix_data instanceof Error?ye.initialError=o.stage_mix_data:ye.initialData=o.stage_mix_data,o.stage_mix_columns&&(ye.knownColumns=o.stage_mix_columns));let me,ra=!1;const Ce=ze.createReactive({callback:q=>{r(3,me=q)},execFn:m},{id:"stage_mix",...ye});Ce(te,{noResolve:ve,...ye}),globalThis[Symbol.for("stage_mix")]={get value(){return me}};let je={initialData:void 0,initialError:void 0},ie=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`,qa=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`;o.stage_mix_summary_data&&(o.stage_mix_summary_data instanceof Error?je.initialError=o.stage_mix_summary_data:je.initialData=o.stage_mix_summary_data,o.stage_mix_summary_columns&&(je.knownColumns=o.stage_mix_summary_columns));let Je,Ee=!1;const Ya=ze.createReactive({callback:q=>{r(0,Je=q)},execFn:m},{id:"stage_mix_summary",...je});Ya(qa,{noResolve:ie,...je}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return Je}};let Le={initialData:void 0,initialError:void 0},be=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 6) = '${f.code}'
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
  and substr(area_code, 1, 6) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;o.poi_mix_data&&(o.poi_mix_data instanceof Error?Le.initialError=o.poi_mix_data:Le.initialData=o.poi_mix_data,o.poi_mix_columns&&(Le.knownColumns=o.poi_mix_columns));let Ta,Be=!1;const Ga=ze.createReactive({callback:q=>{r(4,Ta=q)},execFn:m},{id:"poi_mix",...Le});Ga($e,{noResolve:be,...Le}),globalThis[Symbol.for("poi_mix")]={get value(){return Ta}};let He={initialData:void 0,initialError:void 0},ue=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${f.code}'
  )
order by oa_domain desc`,na=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${f.code}'
  )
order by oa_domain desc`;o.oa_arealevel_data&&(o.oa_arealevel_data instanceof Error?He.initialError=o.oa_arealevel_data:He.initialData=o.oa_arealevel_data,o.oa_arealevel_columns&&(He.knownColumns=o.oa_arealevel_columns));let sa,ia=!1;const fe=ze.createReactive({callback:q=>{r(5,sa=q)},execFn:m},{id:"oa_arealevel",...He});fe(na,{noResolve:ue,...He}),globalThis[Symbol.for("oa_arealevel")]={get value(){return sa}};let F={initialData:void 0,initialError:void 0},we=H`select
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
  and dominance_group = '${z.dom_group.value}'
  and snapshot_year = ${z.dom_year.value}
  and substr(area_code, 1, 6) = '${f.code}'`,ba=`select
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
  and dominance_group = '${z.dom_group.value}'
  and snapshot_year = ${z.dom_year.value}
  and substr(area_code, 1, 6) = '${f.code}'`;o.dom_suppressed_count_data&&(o.dom_suppressed_count_data instanceof Error?F.initialError=o.dom_suppressed_count_data:F.initialData=o.dom_suppressed_count_data,o.dom_suppressed_count_columns&&(F.knownColumns=o.dom_suppressed_count_columns));let oa,Me=!1;const Xa=ze.createReactive({callback:q=>{r(6,oa=q)},execFn:m},{id:"dom_suppressed_count",...F});Xa(ba,{noResolve:we,...F}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return oa}};let Pe={initialData:void 0,initialError:void 0},oe=H`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${z.dom_group.value}'
    and d.snapshot_year = ${z.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${f.code}'
order by d.hhi desc
limit 15`,Sa=`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${z.dom_group.value}'
    and d.snapshot_year = ${z.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${f.code}'
order by d.hhi desc
limit 15`;o.dominance_children_data&&(o.dominance_children_data instanceof Error?Pe.initialError=o.dominance_children_data:Pe.initialData=o.dominance_children_data,o.dominance_children_columns&&(Pe.knownColumns=o.dominance_children_columns));let Ca,De=!1;const ja=ze.createReactive({callback:q=>{r(7,Ca=q)},execFn:m},{id:"dominance_children",...Pe});ja(Sa,{noResolve:oe,...Pe}),globalThis[Symbol.for("dominance_children")]={get value(){return Ca}};let pe={initialData:void 0,initialError:void 0},Fe=H`select
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
order by reference_year desc
limit 1`;o.demographics_data&&(o.demographics_data instanceof Error?pe.initialError=o.demographics_data:pe.initialData=o.demographics_data,o.demographics_columns&&(pe.knownColumns=o.demographics_columns));let La,la=!1;const Ae=ze.createReactive({callback:q=>{r(8,La=q)},execFn:m},{id:"demographics",...pe});Ae(ke,{noResolve:Fe,...pe}),globalThis[Symbol.for("demographics")]={get value(){return La}};let Ie={initialData:void 0,initialError:void 0},Re=H`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`,xe=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`;o.amenities_current_data&&(o.amenities_current_data instanceof Error?Ie.initialError=o.amenities_current_data:Ie.initialData=o.amenities_current_data,o.amenities_current_columns&&(Ie.knownColumns=o.amenities_current_columns));let Ha,Ne=!1;const et=ze.createReactive({callback:q=>{r(9,Ha=q)},execFn:m},{id:"amenities_current",...Ie});et(xe,{noResolve:Re,...Ie}),globalThis[Symbol.for("amenities_current")]={get value(){return Ha}};let Oe={initialData:void 0,initialError:void 0},le=H`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
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
order by sort_order`,Ma=`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
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
order by sort_order`;o.amenities_table_data&&(o.amenities_table_data instanceof Error?Oe.initialError=o.amenities_table_data:Oe.initialData=o.amenities_table_data,o.amenities_table_columns&&(Oe.knownColumns=o.amenities_table_columns));let Pa,_a=!1;const Ue=ze.createReactive({callback:q=>{r(10,Pa=q)},execFn:m},{id:"amenities_table",...Oe});Ue(Ma,{noResolve:le,...Oe}),globalThis[Symbol.for("amenities_table")]={get value(){return Pa}};let Qe={initialData:void 0,initialError:void 0},ge=H`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
order by sort_order, area_name`,da=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
order by sort_order, area_name`;o.minimap_areas_data&&(o.minimap_areas_data instanceof Error?Qe.initialError=o.minimap_areas_data:Qe.initialData=o.minimap_areas_data,o.minimap_areas_columns&&(Qe.knownColumns=o.minimap_areas_columns));let We,Da=!1;const ca=ze.createReactive({callback:q=>{r(11,We=q)},execFn:m},{id:"minimap_areas",...Qe});ca(da,{noResolve:ge,...Qe}),globalThis[Symbol.for("minimap_areas")]={get value(){return We}};let _e={initialData:void 0,initialError:void 0},ma=H`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`,ua=`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`;o.children_data&&(o.children_data instanceof Error?_e.initialError=o.children_data:_e.initialData=o.children_data,o.children_columns&&(_e.knownColumns=o.children_columns));let fa,pa=!1;const Ye=ze.createReactive({callback:q=>{r(12,fa=q)},execFn:m},{id:"children",..._e});return Ye(ua,{noResolve:ma,..._e}),globalThis[Symbol.for("children")]={get value(){return fa}},i.$$set=q=>{"data"in q&&r(14,l=q.data)},i.$$.update=()=>{i.$$.dirty[0]&16384&&r(15,{data:o={},customFormattingSettings:h,__db:x}=l,o),i.$$.dirty[0]&32768&&Ur.set(Object.keys(o).length>0),i.$$.dirty[2]&512&&r(17,f=_.params),i.$$.dirty[0]&131072&&r(19,T=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
limit 1`),i.$$.dirty[0]&131072&&r(20,M=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
limit 1`),i.$$.dirty[0]&3932160&&(T||!Te?T||(Ba(M,{noResolve:T,...ce}),r(21,Te=!0)):Ba(M,{noResolve:T})),i.$$.dirty[0]&131072&&r(23,aa=H`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${f.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`),i.$$.dirty[0]&131072&&r(24,ta=`select area_code, area_name, '/berlin/area/pgr/' || area_code as pgr_link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'pgr' and area_code = substr('${f.code}', 1, 4)
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  -- (dim_area_geometry.area_code has no nulls today; this belt-and-suspenders check just makes
  -- sure a future regression there can't feed a null into pgr_link / the Up-link below.)
  and area_code is not null and trim(area_code) <> ''
limit 1`),i.$$.dirty[0]&62914560&&(aa||!Ja?aa||(za(ta,{noResolve:aa,...se}),r(25,Ja=!0)):za(ta,{noResolve:aa})),i.$$.dirty[0]&131072&&r(27,ve=H`select
    coalesce(status_class, 'uninhabited / no data') as stage,
    count(*) as n_areas
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and substr(area_code, 1, 6) = '${f.code}'
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
  and substr(area_code, 1, 6) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
group by all
order by n_areas desc`),i.$$.dirty[0]&1006632960&&(ve||!ra?ve||(Ce(te,{noResolve:ve,...ye}),r(29,ra=!0)):Ce(te,{noResolve:ve})),i.$$.dirty[0]&131072&&r(31,ie=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&131072&&r(32,qa=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale.
with
    mix as (
        select
            coalesce(status_class, 'uninhabited / no data') as stage,
            count(*) as n_areas
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
          and substr(area_code, 1, 6) = '${f.code}'
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
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&1073741824|i.$$.dirty[1]&7&&(ie||!Ee?ie||(Ya(qa,{noResolve:ie,...je}),r(33,Ee=!0)):Ya(qa,{noResolve:ie})),i.$$.dirty[0]&131072&&r(35,be=H`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021'
  and substr(area_code, 1, 6) = '${f.code}'
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
  and substr(area_code, 1, 6) = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),i.$$.dirty[1]&120&&(be||!Be?be||(Ga($e,{noResolve:be,...Le}),r(37,Be=!0)):Ga($e,{noResolve:be})),i.$$.dirty[0]&131072&&r(39,ue=H`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${f.code}'
  )
order by oa_domain desc`),i.$$.dirty[0]&131072&&r(40,na=`select
    poi_domain_h,
    case when oa_domain_min_base_flag then null else oa_domain end as oa_domain,
    case when oa_domain_min_base_flag then null else (oa_domain - 1) * 100 end as pct_vs_baseline,
    oa_domain_min_base_flag,
    maup_caveat_required,
    area_level_publish_tier
from gentriduck_marts.mart_poi_oa_arealevel
where area_level = 'bzr' and area_code = '${f.code}'
  and snapshot_year = (
      select max(snapshot_year)
      from gentriduck_marts.mart_poi_oa_arealevel
      where area_level = 'bzr' and area_code = '${f.code}'
  )
order by oa_domain desc`),i.$$.dirty[1]&1920&&(ue||!ia?ue||(fe(na,{noResolve:ue,...He}),r(41,ia=!0)):fe(na,{noResolve:ue})),i.$$.dirty[0]&196608&&r(43,we=H`select
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
  and dominance_group = '${z.dom_group.value}'
  and snapshot_year = ${z.dom_year.value}
  and substr(area_code, 1, 6) = '${f.code}'`),i.$$.dirty[0]&196608&&r(44,ba=`select
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
  and dominance_group = '${z.dom_group.value}'
  and snapshot_year = ${z.dom_year.value}
  and substr(area_code, 1, 6) = '${f.code}'`),i.$$.dirty[1]&30720&&(we||!Me?we||(Xa(ba,{noResolve:we,...F}),r(45,Me=!0)):Xa(ba,{noResolve:we})),i.$$.dirty[0]&196608&&r(47,oe=H`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${z.dom_group.value}'
    and d.snapshot_year = ${z.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${f.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&196608&&r(48,Sa=`-- This Bezirksregion's own constituent PLRs' already-computed dominance rows (mart_poi_dominance is
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
    and d.dominance_group = '${z.dom_group.value}'
    and d.snapshot_year = ${z.dom_year.value}
    and not d.is_thin_base
    and substr(d.area_code, 1, 6) = '${f.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&491520&&(oe||!De?oe||(ja(Sa,{noResolve:oe,...Pe}),r(49,De=!0)):ja(Sa,{noResolve:oe})),i.$$.dirty[0]&131072&&r(51,Fe=H`select
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
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
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
order by reference_year desc
limit 1`),i.$$.dirty[1]&7864320&&(Fe||!la?Fe||(Ae(ke,{noResolve:Fe,...pe}),r(53,la=!0)):Ae(ke,{noResolve:Fe})),i.$$.dirty[0]&131072&&r(55,Re=H`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[0]&131072&&r(56,xe=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[1]&125829120&&(Re||!Ne?Re||(et(xe,{noResolve:Re,...Ie}),r(57,Ne=!0)):et(xe,{noResolve:Re})),i.$$.dirty[0]&131072&&r(59,le=H`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
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
order by sort_order`),i.$$.dirty[0]&131072&&r(60,Ma=`-- One row per infrastructure fact: this Bezirksregion vs. its district (Bezirk, already summed by
-- the mart's own rollup -- extensive counts, no share-weighting needed). Same structure as the PLR
-- page's amenities_table query, area_level/area_code swapped only.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bzr' and area_code = '${f.code}'
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
order by sort_order`),i.$$.dirty[1]&2013265920&&(le||!_a?le||(Ue(Ma,{noResolve:le,...Oe}),r(61,_a=!0)):Ue(Ma,{noResolve:le})),i.$$.dirty[0]&131072&&r(63,ge=H`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
order by sort_order, area_name`),i.$$.dirty[0]&131072&&r(64,da=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'bzr:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'bzr' and area_vintage = 'lor_2021'
  and area_code = '${f.code}'
union all
select
    'plr:' || area_code as feature_key,
    coalesce(area_name, area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${ot}/berlin/area/' || area_code as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
order by sort_order, area_name`),i.$$.dirty[2]&15&&(ge||!Da?ge||(ca(da,{noResolve:ge,...Qe}),r(65,Da=!0)):ca(da,{noResolve:ge})),i.$$.dirty[0]&131072&&r(67,ma=H`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`),i.$$.dirty[0]&131072&&r(68,ua=`select
    area_code,
    area_name,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  -- #255: defensive guard, see the matching comment in bezirk/[code].md's "children" query.
  and area_code is not null and trim(area_code) <> ''
  and substr(area_code, 1, 6) = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by (dynamism_class_bi = 'negative') desc, dynamism_index desc`),i.$$.dirty[2]&240&&(ma||!pa?ma||(Ye(ua,{noResolve:ma,..._e}),r(69,pa=!0)):Ye(ua,{noResolve:ma})),i.$$.dirty[0]&1&&r(70,a=Je==null?void 0:Je[0]),i.$$.dirty[2]&256&&r(13,n=!a||a.n_total==null||Number(a.n_total)===0?null:(()=>{const q=Number(a.n_total),Ze=Number(a.n_advanced||0),Fa=a.top_stage_share!=null?Number(a.top_stage_share):null,ga=Fa!=null&&Fa>.5?`<b>${a.top_stage}</b> is the only stage holding a majority (${Math.round(Fa*100)}%)`:"no single stage holds a majority";return`<b>${Ze}</b> of <b>${q}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${ga} — a distribution across this Bezirksregion's own neighbourhoods, never a single re-scored gentrification-index value for the Bezirksregion itself.`})())},[Je,Ve,Se,me,Ta,sa,oa,Ca,La,Ha,Pa,We,fa,n,l,o,z,f,ce,T,M,Te,se,aa,ta,Ja,ye,ve,te,ra,je,ie,qa,Ee,Le,be,$e,Be,He,ue,na,ia,F,we,ba,Me,Pe,oe,Sa,De,pe,Fe,ke,la,Ie,Re,xe,Ne,Oe,le,Ma,_a,Qe,ge,da,Da,_e,ma,ua,pa,a,_]}class Qn extends Mr{constructor(t){super(),Pr(this,t,Bn,En,zr,{data:14},null,[-1,-1,-1])}}export{Qn as component};
