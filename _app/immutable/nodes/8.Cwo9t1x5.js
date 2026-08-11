import{s as Es,d as _,L as js,w as Pe,i as l,a as U,b as j,c as w,h as Bs,e as k,f as wr,r as ve,t as x,g as I,j as v,k as R,u as E,l as Qr,m as Ts,o as Ss,n as Cs,p as qs,q as $e,v as Ms,H as Ds}from"../chunks/scheduler.BopPEjhc.js";import{S as Hs,i as Fs,d as B,t as p,a as m,c as W,m as T,b as S,e as C,g as K}from"../chunks/index.CYkVJg6_.js";import{e as Wr}from"../chunks/each.BHyA9_4D.js";import{A as zs}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as Ls}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as Ns}from"../chunks/Hero.CRoRGI02.js";import{D as gr,C as be}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as Is,w as As}from"../chunks/entry.BMmpG6A7.js";import{A as gt}from"../chunks/Alert.BO8kFSQK.js";import{e as Os,s as Ps,Q as Ee,p as Us,a as Kr,r as Vr,C as Qs}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as P}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Ws}from"../chunks/stores.Ceyp10jj.js";import{Q as je}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as Ks,E as Vs}from"../chunks/BarChart.DzrCmZ_r.js";import{B as yr}from"../chunks/BigValue.Ck7K9e2S.js";import{L as Gr}from"../chunks/LineChart.BThKrpoY.js";import{p as Gs}from"../chunks/profile.BW8tN6E9.js";function Jr(s,t,r){const a=s.slice();return a[139]=t[r],a}function Js(s){var i;let t,r=(A.title??((i=A.og)==null?void 0:i.title))+"",a;return{c(){t=R("h1"),a=E(r),this.h()},l(o){t=k(o,"H1",{class:!0});var u=ve(t);a=x(u,r),u.forEach(_),this.h()},h(){j(t,"class","title")},m(o,u){l(o,t,u),U(t,a)},p:$e,d(o){o&&_(t)}}}function Zs(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:$e,p:$e,d:$e}}function Ys(s){var u;let t,r,a,i,o;return document.title=t=A.title??((u=A.og)==null?void 0:u.title),{c(){r=v(),a=R("meta"),i=v(),o=R("meta"),this.h()},l(c){r=w(c),a=k(c,"META",{property:!0,content:!0}),i=w(c),o=k(c,"META",{name:!0,content:!0}),this.h()},h(){var c,h;j(a,"property","og:title"),j(a,"content",((c=A.og)==null?void 0:c.title)??A.title),j(o,"name","twitter:title"),j(o,"content",((h=A.og)==null?void 0:h.title)??A.title)},m(c,h){l(c,r,h),l(c,a,h),l(c,i,h),l(c,o,h)},p(c,h){var g;h&0&&t!==(t=A.title??((g=A.og)==null?void 0:g.title))&&(document.title=t)},d(c){c&&(_(r),_(a),_(i),_(o))}}}function Xs(s){var o,u;let t,r,a=(A.description||((o=A.og)==null?void 0:o.description))&&ei(),i=((u=A.og)==null?void 0:u.image)&&ai();return{c(){a&&a.c(),t=v(),i&&i.c(),r=wr()},l(c){a&&a.l(c),t=w(c),i&&i.l(c),r=wr()},m(c,h){a&&a.m(c,h),l(c,t,h),i&&i.m(c,h),l(c,r,h)},p(c,h){var g,b;(A.description||(g=A.og)!=null&&g.description)&&a.p(c,h),(b=A.og)!=null&&b.image&&i.p(c,h)},d(c){c&&(_(t),_(r)),a&&a.d(c),i&&i.d(c)}}}function ei(s){let t,r,a,i,o;return{c(){t=R("meta"),r=v(),a=R("meta"),i=v(),o=R("meta"),this.h()},l(u){t=k(u,"META",{name:!0,content:!0}),r=w(u),a=k(u,"META",{property:!0,content:!0}),i=w(u),o=k(u,"META",{name:!0,content:!0}),this.h()},h(){var u,c,h;j(t,"name","description"),j(t,"content",A.description??((u=A.og)==null?void 0:u.description)),j(a,"property","og:description"),j(a,"content",((c=A.og)==null?void 0:c.description)??A.description),j(o,"name","twitter:description"),j(o,"content",((h=A.og)==null?void 0:h.description)??A.description)},m(u,c){l(u,t,c),l(u,r,c),l(u,a,c),l(u,i,c),l(u,o,c)},p:$e,d(u){u&&(_(t),_(r),_(a),_(i),_(o))}}}function ai(s){let t,r,a;return{c(){t=R("meta"),r=v(),a=R("meta"),this.h()},l(i){t=k(i,"META",{property:!0,content:!0}),r=w(i),a=k(i,"META",{name:!0,content:!0}),this.h()},h(){var i,o;j(t,"property","og:image"),j(t,"content",Kr((i=A.og)==null?void 0:i.image)),j(a,"name","twitter:image"),j(a,"content",Kr((o=A.og)==null?void 0:o.image))},m(i,o){l(i,t,o),l(i,r,o),l(i,a,o)},p:$e,d(i){i&&(_(t),_(r),_(a))}}}function Zr(s){let t,r;return t=new je({props:{queryID:"area_info",queryResult:s[11]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&2048&&(o.queryResult=a[11]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Yr(s){let t,r;return t=new je({props:{queryID:"district_info",queryResult:s[0]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Xr(s){let t,r;return t=new je({props:{queryID:"context_current",queryResult:s[1]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ti(s){let t,r="Bezirksregion profile";return{c(){t=R("a"),t.textContent=r,this.h()},l(a){t=k(a,"A",{href:!0,"data-svelte-h":!0}),I(t)!=="svelte-9htoed"&&(t.textContent=r),this.h()},h(){j(t,"href","/gentriduck/berlin/area/bezirk")},m(a,i){l(a,t,i)},p:$e,d(a){a&&_(t)}}}function ri(s){let t,r,a;return{c(){t=R("a"),r=E("Bezirksregion profile"),this.h()},l(i){t=k(i,"A",{href:!0});var o=ve(t);r=x(o,"Bezirksregion profile"),o.forEach(_),this.h()},h(){j(t,"href",a="/gentriduck/berlin/area/bzr/"+s[11][0].bzr_code)},m(i,o){l(i,t,o),U(t,r)},p(i,o){o[0]&2048&&a!==(a="/gentriduck/berlin/area/bzr/"+i[11][0].bzr_code)&&j(t,"href",a)},d(i){i&&_(t)}}}function es(s){let t,r,a=s[139]+"";return{c(){t=R("p"),r=new Ds(!1),this.h()},l(i){t=k(i,"P",{});var o=ve(t);r=Ms(o,!1),o.forEach(_),this.h()},h(){r.a=null},m(i,o){l(i,t,o),r.m(a,t)},p(i,o){o[0]&8388608&&a!==(a=i[139]+"")&&r.p(a)},d(i){i&&_(t)}}}function si(s){let t,r="How to read the charts:",a,i,o="1 = least deprived",u,c,h="4 = most deprived",g,b,y="falling",M,$,z="less",he,H,O="methodology & data sources",we;return{c(){t=R("b"),t.textContent=r,a=E(" official status runs "),i=R("b"),i.textContent=o,u=E(` to
  `),c=R("b"),c.textContent=h,g=E(", so a "),b=R("b"),b.textContent=y,M=E(" status line means the area became "),$=R("b"),$.textContent=z,he=E(` deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the `),H=R("a"),H.textContent=O,we=E(` page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).`),this.h()},l(F){t=k(F,"B",{"data-svelte-h":!0}),I(t)!=="svelte-js88l3"&&(t.textContent=r),a=x(F," official status runs "),i=k(F,"B",{"data-svelte-h":!0}),I(i)!=="svelte-1bcgix4"&&(i.textContent=o),u=x(F,` to
  `),c=k(F,"B",{"data-svelte-h":!0}),I(c)!=="svelte-1cr3k8t"&&(c.textContent=h),g=x(F,", so a "),b=k(F,"B",{"data-svelte-h":!0}),I(b)!=="svelte-164rnor"&&(b.textContent=y),M=x(F," status line means the area became "),$=k(F,"B",{"data-svelte-h":!0}),I($)!=="svelte-u149sn"&&($.textContent=z),he=x(F,` deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the `),H=k(F,"A",{href:!0,"data-svelte-h":!0}),I(H)!=="svelte-3zcnok"&&(H.textContent=O),we=x(F,` page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).`),this.h()},h(){j(H,"href","/gentriduck/methodology")},m(F,L){l(F,t,L),l(F,a,L),l(F,i,L),l(F,u,L),l(F,c,L),l(F,g,L),l(F,b,L),l(F,M,L),l(F,$,L),l(F,he,L),l(F,H,L),l(F,we,L)},p:$e,d(F){F&&(_(t),_(a),_(i),_(u),_(c),_(g),_(b),_(M),_($),_(he),_(H),_(we))}}}function as(s){let t,r;return t=new je({props:{queryID:"area_trend",queryResult:s[12]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&4096&&(o.queryResult=a[12]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ts(s){let t,r;return t=new je({props:{queryID:"trajectory_summary",queryResult:s[2]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function rs(s){let t,r;return t=new je({props:{queryID:"district_trajectory_mix",queryResult:s[3]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ii(s){let t,r;return t=new gt({props:{status:"info",$$slots:{default:[oi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[4]&262144&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ni(s){let t,r;return t=new yr({props:{data:s[1],value:"stage",title:"Current stage"}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&2&&(o.data=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function oi(s){let t;return{c(){t=E(`This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.`)},l(r){t=x(r,`This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function ss(s){let t,r;return t=new je({props:{queryID:"poi_trend",queryResult:s[4]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function is(s){let t,r;return t=new je({props:{queryID:"poi_mix_context",queryResult:s[5]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ns(s){let t,r,a=s[21].snapshot_year+"",i,o,u,c=s[21].area_top_category+"",h,g,b,y,M,$=(s[21].district_top_category??"—")+"",z,he,H,O=(s[21].city_top_category??"—")+"",we,F;return{c(){t=R("p"),r=E("The most common kind of mapped place here in "),i=E(a),o=E(" is "),u=R("b"),h=E(c),g=E(`;
across `),b=E(s[9]),y=E(" it's "),M=R("b"),z=E($),he=E(`, and across Berlin as a whole
it's `),H=R("b"),we=E(O),F=E(".")},l(L){t=k(L,"P",{});var N=ve(t);r=x(N,"The most common kind of mapped place here in "),i=x(N,a),o=x(N," is "),u=k(N,"B",{});var da=ve(u);h=x(da,c),da.forEach(_),g=x(N,`;
across `),b=x(N,s[9]),y=x(N," it's "),M=k(N,"B",{});var Fa=ve(M);z=x(Fa,$),Fa.forEach(_),he=x(N,`, and across Berlin as a whole
it's `),H=k(N,"B",{});var ct=ve(H);we=x(ct,O),ct.forEach(_),F=x(N,"."),N.forEach(_)},m(L,N){l(L,t,N),U(t,r),U(t,i),U(t,o),U(t,u),U(u,h),U(t,g),U(t,b),U(t,y),U(t,M),U(M,z),U(t,he),U(t,H),U(H,we),U(t,F)},p(L,N){N[0]&2097152&&a!==(a=L[21].snapshot_year+"")&&Pe(i,a),N[0]&2097152&&c!==(c=L[21].area_top_category+"")&&Pe(h,c),N[0]&512&&Pe(b,L[9]),N[0]&2097152&&$!==($=(L[21].district_top_category??"—")+"")&&Pe(z,$),N[0]&2097152&&O!==(O=(L[21].city_top_category??"—")+"")&&Pe(we,O)},d(L){L&&_(t)}}}function os(s){let t,r;return t=new je({props:{queryID:"poi_oa_radar",queryResult:s[6]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function _s(s){let t,r;return t=new je({props:{queryID:"poi_oa_radar_district",queryResult:s[7]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function _i(s){let t,r;return t=new gt({props:{status:"warning",$$slots:{default:[ci]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[4]&262144&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function li(s){let t,r;return t=new Vs({props:{config:s[20],data:s[6],height:"360px",downloadableData:!0,downloadableImage:!0}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&1048576&&(o.config=a[20]),i[0]&64&&(o.data=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ci(s){let t;return{c(){t=E(`No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).`)},l(r){t=x(r,`No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function ls(s){let t,r;return t=new gt({props:{status:"warning",$$slots:{default:[di]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&256|i[4]&262144&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function di(s){let t,r,a="†",i,o,u,c=s[8].filter(bs).map($s).join(", ")+"",h,g;return{c(){t=E("Domains marked "),r=R("b"),r.textContent=a,i=E(" are based on very few mapped places here (fewer than "),o=E(jr),u=E(`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),h=E(c),g=E(".")},l(b){t=x(b,"Domains marked "),r=k(b,"B",{"data-svelte-h":!0}),I(r)!=="svelte-yahvc0"&&(r.textContent=a),i=x(b," are based on very few mapped places here (fewer than "),o=x(b,jr),u=x(b,`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),h=x(b,c),g=x(b,".")},m(b,y){l(b,t,y),l(b,r,y),l(b,i,y),l(b,o,y),l(b,u,y),l(b,h,y),l(b,g,y)},p(b,y){y[0]&256&&c!==(c=b[8].filter(bs).map($s).join(", ")+"")&&Pe(h,c)},d(b){b&&(_(t),_(r),_(i),_(o),_(u),_(h),_(g))}}}function cs(s){let t,r;return t=new je({props:{queryID:"dominance_area",queryResult:s[13]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8192&&(o.queryResult=a[13]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function mi(s){let t,r;return t=new gt({props:{status:"warning",$$slots:{default:[fi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[4]&262144&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ui(s){let t,r;return t=new gr({props:{data:s[13].filter(ks),rows:"4",emptySet:"warn",emptyMessage:"No within-group dominance data for this area.",$$slots:{default:[pi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8192&&(o.data=a[13].filter(ks)),i[4]&262144&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function fi(s){let t;return{c(){t=E(`No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).`)},l(r){t=x(r,`No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function pi(s){let t,r,a,i,o,u,c,h,g,b,y,M;return t=new be({props:{id:"group_label",title:"Business group"}}),a=new be({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new be({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),c=new be({props:{id:"top_child",title:"Leading type"}}),g=new be({props:{id:"n_children",title:"Types in this group here"}}),y=new be({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment),u=v(),C(c.$$.fragment),h=v(),C(g.$$.fragment),b=v(),C(y.$$.fragment)},l($){S(t.$$.fragment,$),r=w($),S(a.$$.fragment,$),i=w($),S(o.$$.fragment,$),u=w($),S(c.$$.fragment,$),h=w($),S(g.$$.fragment,$),b=w($),S(y.$$.fragment,$)},m($,z){T(t,$,z),l($,r,z),T(a,$,z),l($,i,z),T(o,$,z),l($,u,z),T(c,$,z),l($,h,z),T(g,$,z),l($,b,z),T(y,$,z),M=!0},p:$e,i($){M||(m(t.$$.fragment,$),m(a.$$.fragment,$),m(o.$$.fragment,$),m(c.$$.fragment,$),m(g.$$.fragment,$),m(y.$$.fragment,$),M=!0)},o($){p(t.$$.fragment,$),p(a.$$.fragment,$),p(o.$$.fragment,$),p(c.$$.fragment,$),p(g.$$.fragment,$),p(y.$$.fragment,$),M=!1},d($){$&&(_(r),_(i),_(u),_(h),_(b)),B(t,$),B(a,$),B(o,$),B(c,$),B(g,$),B(y,$)}}}function ds(s){let t,r;return t=new gt({props:{status:"info",$$slots:{default:[hi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8192|i[4]&262144&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function hi(s){let t=s[13].filter(Rs).length+"",r,a,i=s[13].length+"",o,u;return{c(){r=E(t),a=E(" of "),o=E(i),u=E(` business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."`)},l(c){r=x(c,t),a=x(c," of "),o=x(c,i),u=x(c,` business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."`)},m(c,h){l(c,r,h),l(c,a,h),l(c,o,h),l(c,u,h)},p(c,h){h[0]&8192&&t!==(t=c[13].filter(Rs).length+"")&&Pe(r,t),h[0]&8192&&i!==(i=c[13].length+"")&&Pe(o,i)},d(c){c&&(_(r),_(a),_(o),_(u))}}}function ms(s){let t,r;return t=new je({props:{queryID:"demographics_current",queryResult:s[14]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&16384&&(o.queryResult=a[14]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function us(s){let t,r;return t=new je({props:{queryID:"demographics_table",queryResult:s[15]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&32768&&(o.queryResult=a[15]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function gi(s){let t;return{c(){t=E("No population-register data is available for this area yet.")},l(r){t=x(r,"No population-register data is available for this area yet.")},m(r,a){l(r,t,a)},p:$e,d(r){r&&_(t)}}}function yi(s){let t,r,a=s[14][0].reference_year+"",i,o,u,c=(s[14][0].residents_total!=null?Math.round(s[14][0].residents_total).toLocaleString():"—")+"",h,g;return{c(){t=E("As of the "),r=R("b"),i=E(a),o=E(` EWR register (population statistics), this area has
`),u=R("b"),h=E(c),g=E(` registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.`)},l(b){t=x(b,"As of the "),r=k(b,"B",{});var y=ve(r);i=x(y,a),y.forEach(_),o=x(b,` EWR register (population statistics), this area has
`),u=k(b,"B",{});var M=ve(u);h=x(M,c),M.forEach(_),g=x(b,` registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.`)},m(b,y){l(b,t,y),l(b,r,y),U(r,i),l(b,o,y),l(b,u,y),U(u,h),l(b,g,y)},p(b,y){y[0]&16384&&a!==(a=b[14][0].reference_year+"")&&Pe(i,a),y[0]&16384&&c!==(c=(b[14][0].residents_total!=null?Math.round(b[14][0].residents_total).toLocaleString():"—")+"")&&Pe(h,c)},d(b){b&&(_(t),_(r),_(o),_(u),_(g))}}}function fs(s){let t,r;return t=new gt({props:{status:"warning",$$slots:{default:[wi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function wi(s){let t,r,a="approximate",i;return{c(){t=E(`One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as `),r=R("b"),r.textContent=a,i=E(`,
  not exact counts.`)},l(o){t=x(o,`One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as `),r=k(o,"B",{"data-svelte-h":!0}),I(r)!=="svelte-1ajqvq2"&&(r.textContent=a),i=x(o,`,
  not exact counts.`)},m(o,u){l(o,t,u),l(o,r,u),l(o,i,u)},p:$e,d(o){o&&(_(t),_(r),_(i))}}}function vi(s){let t,r,a,i,o,u,c,h;return t=new be({props:{id:"indicator",title:"Indicator"}}),a=new be({props:{id:"area_value",title:"This area"}}),o=new be({props:{id:"district_value",title:"District average"}}),c=new be({props:{id:"city_value",title:"Berlin average"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment),u=v(),C(c.$$.fragment)},l(g){S(t.$$.fragment,g),r=w(g),S(a.$$.fragment,g),i=w(g),S(o.$$.fragment,g),u=w(g),S(c.$$.fragment,g)},m(g,b){T(t,g,b),l(g,r,b),T(a,g,b),l(g,i,b),T(o,g,b),l(g,u,b),T(c,g,b),h=!0},p:$e,i(g){h||(m(t.$$.fragment,g),m(a.$$.fragment,g),m(o.$$.fragment,g),m(c.$$.fragment,g),h=!0)},o(g){p(t.$$.fragment,g),p(a.$$.fragment,g),p(o.$$.fragment,g),p(c.$$.fragment,g),h=!1},d(g){g&&(_(r),_(i),_(u)),B(t,g),B(a,g),B(o,g),B(c,g)}}}function ps(s){let t,r;return t=new je({props:{queryID:"amenities_current",queryResult:s[16]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&65536&&(o.queryResult=a[16]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function hs(s){let t,r;return t=new je({props:{queryID:"amenities_table",queryResult:s[17]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&131072&&(o.queryResult=a[17]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function bi(s){let t;return{c(){t=E("No amenity data is available for this area yet.")},l(r){t=x(r,"No amenity data is available for this area yet.")},m(r,a){l(r,t,a)},p:$e,d(r){r&&_(t)}}}function $i(s){let t,r,a=s[16][0].snapshot_year+"",i,o;return{c(){t=E("Based on OpenStreetMap tagging as of "),r=R("b"),i=E(a),o=E(`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(u){t=x(u,"Based on OpenStreetMap tagging as of "),r=k(u,"B",{});var c=ve(r);i=x(c,a),c.forEach(_),o=x(u,`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(u,c){l(u,t,c),l(u,r,c),U(r,i),l(u,o,c)},p(u,c){c[0]&65536&&a!==(a=u[16][0].snapshot_year+"")&&Pe(i,a)},d(u){u&&(_(t),_(r),_(o))}}}function ki(s){let t,r,a,i,o,u;return t=new be({props:{id:"indicator",title:"Infrastructure"}}),a=new be({props:{id:"area_value",title:"This area"}}),o=new be({props:{id:"district_value",title:"District total"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment)},l(c){S(t.$$.fragment,c),r=w(c),S(a.$$.fragment,c),i=w(c),S(o.$$.fragment,c)},m(c,h){T(t,c,h),l(c,r,h),T(a,c,h),l(c,i,h),T(o,c,h),u=!0},p:$e,i(c){u||(m(t.$$.fragment,c),m(a.$$.fragment,c),m(o.$$.fragment,c),u=!0)},o(c){p(t.$$.fragment,c),p(a.$$.fragment,c),p(o.$$.fragment,c),u=!1},d(c){c&&(_(r),_(i)),B(t,c),B(a,c),B(o,c)}}}function Ri(s){let t,r,a="0",i,o,u="open-data",c;return{c(){t=E("These figures come from OpenStreetMap tagging, not an official registry. A "),r=R("b"),r.textContent=a,i=E(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=R("a"),o.textContent=u,c=E(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(h){t=x(h,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=k(h,"B",{"data-svelte-h":!0}),I(r)!=="svelte-12bhsds"&&(r.textContent=a),i=x(h,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=k(h,"A",{href:!0,"data-svelte-h":!0}),I(o)!=="svelte-1jijq3i"&&(o.textContent=u),c=x(h,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){j(o,"href","/gentriduck/open-data")},m(h,g){l(h,t,g),l(h,r,g),l(h,i,g),l(h,o,g),l(h,c,g)},p:$e,d(h){h&&(_(t),_(r),_(i),_(o),_(c))}}}function xi(s){let t;return{c(){t=E(`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=x(r,`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){l(r,t,a)},p:$e,d(r){r&&_(t)}}}function Ei(s){let t,r,a=s[16][0].gastro_poi_with_cuisine_count+"",i,o,u,c="most common cuisine",h,g,b=s[16][0].dominant_cuisine+"",y,M,$=Math.round(s[16][0].dominant_cuisine_share*100)+"",z,he;return{c(){t=E("Among "),r=R("b"),i=E(a),o=E(` restaurants/cafes with cuisine
data tagged in this area, the `),u=R("b"),u.textContent=c,h=E(` is
`),g=R("b"),y=E(b),M=E(`
(`),z=E($),he=E("% of tagged gastronomy POIs).")},l(H){t=x(H,"Among "),r=k(H,"B",{});var O=ve(r);i=x(O,a),O.forEach(_),o=x(H,` restaurants/cafes with cuisine
data tagged in this area, the `),u=k(H,"B",{"data-svelte-h":!0}),I(u)!=="svelte-1floooe"&&(u.textContent=c),h=x(H,` is
`),g=k(H,"B",{});var we=ve(g);y=x(we,b),we.forEach(_),M=x(H,`
(`),z=x(H,$),he=x(H,"% of tagged gastronomy POIs).")},m(H,O){l(H,t,O),l(H,r,O),U(r,i),l(H,o,O),l(H,u,O),l(H,h,O),l(H,g,O),U(g,y),l(H,M,O),l(H,z,O),l(H,he,O)},p(H,O){O[0]&65536&&a!==(a=H[16][0].gastro_poi_with_cuisine_count+"")&&Pe(i,a),O[0]&65536&&b!==(b=H[16][0].dominant_cuisine+"")&&Pe(y,b),O[0]&65536&&$!==($=Math.round(H[16][0].dominant_cuisine_share*100)+"")&&Pe(z,$)},d(H){H&&(_(t),_(r),_(o),_(u),_(h),_(g),_(M),_(z),_(he))}}}function ji(s){let t,r,a="methodology page",i;return{c(){t=E(`These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  `),r=R("a"),r.textContent=a,i=E(" for what they measure and their caveats."),this.h()},l(o){t=x(o,`These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  `),r=k(o,"A",{href:!0,"data-svelte-h":!0}),I(r)!=="svelte-1l2pw3"&&(r.textContent=a),i=x(o," for what they measure and their caveats."),this.h()},h(){j(r,"href","/gentriduck/methodology")},m(o,u){l(o,t,u),l(o,r,u),l(o,i,u)},p:$e,d(o){o&&(_(t),_(r),_(i))}}}function gs(s){let t,r;return t=new je({props:{queryID:"price_rent",queryResult:s[18]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&262144&&(o.queryResult=a[18]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Bi(s){let t,r,a,i,o,u,c,h,g,b;return t=new be({props:{id:"snapshot_year",title:"Year"}}),a=new be({props:{id:"brw_weighted_avg_eur_m2",title:"Land value, EUR/m² (Bodenrichtwert)"}}),o=new be({props:{id:"est_rent_mid",title:"Estimated rent, typical (EUR/m²)"}}),c=new be({props:{id:"est_rent_low",title:"Estimated rent, low (EUR/m²)"}}),g=new be({props:{id:"est_rent_high",title:"Estimated rent, high (EUR/m²)"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment),u=v(),C(c.$$.fragment),h=v(),C(g.$$.fragment)},l(y){S(t.$$.fragment,y),r=w(y),S(a.$$.fragment,y),i=w(y),S(o.$$.fragment,y),u=w(y),S(c.$$.fragment,y),h=w(y),S(g.$$.fragment,y)},m(y,M){T(t,y,M),l(y,r,M),T(a,y,M),l(y,i,M),T(o,y,M),l(y,u,M),T(c,y,M),l(y,h,M),T(g,y,M),b=!0},p:$e,i(y){b||(m(t.$$.fragment,y),m(a.$$.fragment,y),m(o.$$.fragment,y),m(c.$$.fragment,y),m(g.$$.fragment,y),b=!0)},o(y){p(t.$$.fragment,y),p(a.$$.fragment,y),p(o.$$.fragment,y),p(c.$$.fragment,y),p(g.$$.fragment,y),b=!1},d(y){y&&(_(r),_(i),_(u),_(h)),B(t,y),B(a,y),B(o,y),B(c,y),B(g,y)}}}function ys(s){let t,r;return t=new je({props:{queryID:"minimap_areas",queryResult:s[19]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&524288&&(o.queryResult=a[19]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Ti(s){var Ir;let t,r,a,i,o,u,c,h,g,b,y,M,$,z,he="district browse",H,O,we="all districts",F,L,N,da=(s[11][0]?s[11][0].area_name:"This area")+"",Fa,ct,dt,Ka,Ue,f='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',At,za,Ot,yt,Q,d,Be,Va=`District and city lines are the simple average across all Planungsräume in the same Bezirk /
across Berlin at each edition — context, not a target.`,Ga,Qe,Ja,Te,J,We,Ke,La,ma,wt,Se,ua,Ve,mt=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,vt,ia,Za='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',fa,ze,Qt='<a href="#how-its-commercial-mix-has-developed">How its commercial mix has developed</a>',bt,pa,Ya=`Shops, cafés and other businesses tend to <em class="markdown">follow</em> — not lead — social change (see
<a href="/gentriduck/methodology" class="markdown">methodology</a> for the theory). This shows how the mix of mapped places here has
evolved.`,ha,ga,na,ya,$t,Ge,ke,kt='<a href="#offering-advantage-profile">Offering Advantage profile</a>',Na,wa,Wt=`<strong class="markdown">Offering Advantage (OA)</strong> compares each POI domain&#39;s share of this area&#39;s mapped places (shops,
cafés, and other points of interest) to that domain&#39;s share across Berlin as a whole — a
compositional read on the local place <em class="markdown">mix</em>, not a count, and not a value judgment: being
over-represented in a domain doesn&#39;t mean an area is &quot;better&quot; or &quot;worse,&quot; only that its commercial
mix is more specialised in that direction than the city as a whole. The chart below shows each
domain as a <strong class="markdown">percentage above or below Berlin&#39;s citywide average share</strong> for that domain — e.g.
&quot;+30%&quot; means this domain makes up about 30% more of the local mix here than it does citywide on
average; a <strong class="markdown">negative</strong> percentage means the opposite, under-representation, shown the same way.
OA is one input among several into the governed index (see <a href="/gentriduck/methodology" class="markdown">methodology</a>), never a
standalone gentrification score on its own — and vacancy (if shown) marks the <em class="markdown">opposite</em> pole from
the others, a pre-reinvestment signal, not a &quot;more OA is more pressure&quot; reading. See the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> to explore this across all of Berlin.`,va,Je,ba,ge,Ce,Xa,Ia=s[8].some(vs),Ze,Le,ut='<a href="#within-group-dominance">Within-group dominance</a>',Rt,$a,et=`<strong class="markdown">Within-group dominance</strong> asks a different question from Offering Advantage: within a curated
group of businesses, is one type dominating, or is the mix diverse? (&quot;Are fast-food places crowding
out sit-down restaurants within gastronomy?&quot;) The figures below are <strong class="markdown">sign-blind</strong> — a high
concentration reading says only that this area&#39;s mix is concentrated in the named leading type,
never whether that is an up-market or down-market shift; read it alongside the status/trajectory
section above, never in isolation. See the <a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> §5
for the full methodology, ethics note, and why cuisine-typed dominance never appears on any public
page (this table included).`,ka,Ra,Ye,qe,Me,Xe,Aa=s[13].some(ws),xa,De,Kt='<a href="#people--structure">People &amp; structure</a>',xt,ea,aa,oa,Et,at,Ea,ja,Ne,jt=`† <b>Migration-background share</b> uses a Mikrozensus definition that changed around 2017 —
figures from before 2017 are present in the underlying data but are <b>not directly comparable</b>
to 2017-and-later figures. This page shows only the current-vintage snapshot above; do not compare
this row across years without checking the vintage.`,Bt,Oa,Vt=`Both the foreign-national and migration-background shares above are shown only as plain rows in
this table, alongside the area's full age and residence-duration profile — this page never ranks
or sorts areas by either figure, and makes no claim about whether a change in either is good or bad
for the neighbourhood.`,Ba,Re,Tt='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',St,tt,rt,Ie,Ta,ta,Ct,Sa,qt,Ae,Ca,_a,Gt=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,Mt,la,st='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',qa,ra,Dt,it,Ma,Da,He,nt,ca,Jt='<a href="#where-this-area-sits">Where this area sits</a>',Ht,ot,_t,Zt,q,D=`This is Berlin's finest published small-area grain (Planungsraum) — there is no further level to
drill into. See the Bezirksregion link above ("Up:") to zoom back out.`,V,Oe,Ft='<a href="#honest-caveats">Honest caveats</a>',lt,sa,Yt=`<li class="markdown"><strong class="markdown">A falling status line means the area became <em class="markdown">less</em> deprived</strong> (its status rose) — which is
also the signature of gentrification, not automatically good news for existing residents.</li> <li class="markdown"><strong class="markdown">The portrait&#39;s stage, comparison, and pace sentences are display-layer wording over already-
published mart figures</strong> — no new indicator, weight, or normalization is introduced by this page.</li> <li class="markdown"><strong class="markdown">Offering Advantage is descriptive, not causal, and multi-signed</strong> — over- or under-representation
in a domain is a mix/specialization signal, never a standalone claim about gentrification, and
domains do not all point the same direction (vacancy is the opposite pole from amenity domains).</li> <li class="markdown"><strong class="markdown">Very small POI bases produce noisy percentages</strong> — domains flagged † above are based on fewer
than 5 mapped places in this area and should be read cautiously.</li> <li class="markdown"><strong class="markdown">Land value and estimated rent are official reference values, not observed transaction prices.</strong></li> <li class="markdown">Figures are on Berlin&#39;s <strong class="markdown">current (2021+) boundaries</strong> and the live social-monitoring editions
(2021–2025) only — this page does not show the pre-2021 <code class="markdown">standard</code> variant.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,Xt,ft,Br='<a href="#further-reading">Further reading</a>',lr,zt,Tr=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means, the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> for this area&#39;s commercial-mix signal citywide
(including a &quot;citywide context&quot; section for these same signals across all of Berlin),
<a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a> for other neighbourhoods, or the
<a href="/gentriduck/berlin/time-series" class="markdown">time-series view</a> for how the whole city has moved.`,cr,rr,dr,Pt,sr,pt=typeof A<"u"&&(A.title||((Ir=A.og)==null?void 0:Ir.title))&&A.hide_title!==!0&&Js();function xs(e,n){var G;return typeof A<"u"&&(A.title||(G=A.og)!=null&&G.title)?Ys:Zs}let ir=xs()(s),ht=typeof A=="object"&&Xs(),Z=s[11]&&Zr(s),Y=s[0]&&Yr(s),X=s[1]&&Xr(s);g=new Ns({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence · most granular",title:s[11][0]?s[11][0].area_name:"Neighbourhood",lede:"Status trajectory, commercial-mix development, Offering Advantage, and land value/rent for one Berlin Planungsraum."}});function Sr(e,n){var G;return(G=e[11][0])!=null&&G.bzr_code?ri:ti}let mr=Sr(s),Pa=mr(s),er=Wr(s[23]),xe=[];for(let e=0;e<er.length;e+=1)xe[e]=es(Jr(s,er,e));za=new gt({props:{status:"info",$$slots:{default:[si]},$$scope:{ctx:s}}});let ee=s[12]&&as(s);Q=new Gr({props:{data:s[12],x:"snapshot_year",y:["This area","District average","Berlin average"],title:"Social status over time, "+(s[11][0]?s[11][0].area_name:"this area")+" (1 = least deprived … 4 = most deprived)",yAxisTitle:"Status class",yMin:"1",yMax:"4",emptySet:"warn",emptyMessage:"No time series for this area."}});let ae=s[2]&&ts(s),te=s[3]&&rs(s);const Cr=[ni,ii],Lt=[];function qr(e,n){return e[10]?0:1}Te=qr(s),J=Lt[Te]=Cr[Te](s),Ke=new yr({props:{data:s[2],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),ma=new yr({props:{data:s[2],value:"dominant_stage",title:"Most common stage",emptySet:"warn"}}),Se=new yr({props:{data:s[2],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}});let re=s[4]&&ss(s),se=s[5]&&is(s);ya=new Ks({props:{data:s[4],x:"snapshot_year",y:"poi_count",series:"poi_category_h",seriesOrder:s[22],title:"Mapped places by category, "+(s[11][0]?s[11][0].area_name:"this area")+" (largest segment first)",yAxisTitle:"Number of mapped places",emptySet:"warn"}});let Fe=s[21]&&s[21].area_top_category&&ns(s),ie=s[6]&&os(s),ne=s[7]&&_s(s);const Mr=[li,_i],Nt=[];function Dr(e,n){return e[8].length>0?0:1}ge=Dr(s),Ce=Nt[ge]=Mr[ge](s);let oe=Ia&&ls(s),_e=s[13]&&cs(s);const Hr=[ui,mi],It=[];function Fr(e,n){return n[0]&8192&&(Ye=null),Ye==null&&(Ye=e[13].filter(Ci).length>0),Ye?0:1}qe=Fr(s,[-1,-1,-1,-1,-1]),Me=It[qe]=Hr[qe](s);let le=Aa&&ds(s),ce=s[14]&&ms(s),de=s[15]&&us(s);function zr(e,n){return e[14][0]?yi:gi}let ur=zr(s),Ua=ur(s),ye=s[14][0]&&s[14][0].any_indicator_suppressed&&fs(s);Ea=new gr({props:{data:s[15],rows:"12",emptySet:"warn",emptyMessage:"No population-register data for this area.",$$slots:{default:[vi]},$$scope:{ctx:s}}});let me=s[16]&&ps(s),ue=s[17]&&hs(s);function Lr(e,n){return e[16][0]?$i:bi}let fr=Lr(s),Qa=fr(s);ta=new gr({props:{data:s[17],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[ki]},$$scope:{ctx:s}}}),Sa=new gt({props:{status:"info",$$slots:{default:[Ri]},$$scope:{ctx:s}}});function Nr(e,n){return e[16][0]&&e[16][0].gastro_poi_with_cuisine_count>=8&&e[16][0].dominant_cuisine_share>=.15?Ei:xi}let pr=Nr(s),Wa=pr(s);ra=new gt({props:{status:"info",$$slots:{default:[ji]},$$scope:{ctx:s}}});let fe=s[18]&&gs(s);Ma=new Gr({props:{data:s[18],x:"snapshot_year",y:["est_rent_low","est_rent_mid","est_rent_high","District average (typical)","Berlin average (typical)"],title:"Estimated rent range (EUR/m²), "+(s[11][0]?s[11][0].area_name:"this area"),yAxisTitle:"EUR/m²",emptySet:"warn",emptyMessage:"No price/rent estimate for this area."}}),He=new gr({props:{data:s[18],rows:"10",emptySet:"warn",emptyMessage:"No price/rent estimate for this area.",$$slots:{default:[Bi]},$$scope:{ctx:s}}});let pe=s[19]&&ys(s);return _t=new zs({props:{data:s[19],geoJsonUrl:`${Is}/geo/bzr_plr_drilldown.geojson`,title:s[11][0]?s[11][0].area_name:"This area"}}),Pt=new Ls({}),{c(){pt&&pt.c(),t=v(),ir.c(),r=R("meta"),a=R("meta"),ht&&ht.c(),i=wr(),o=v(),Z&&Z.c(),u=v(),Y&&Y.c(),c=v(),X&&X.c(),h=v(),C(g.$$.fragment),b=v(),y=R("p"),M=E("Up: "),Pa.c(),$=E(" · "),z=R("a"),z.textContent=he,H=E(" · "),O=R("a"),O.textContent=we,F=v(),L=R("h2"),N=R("a"),Fa=E(da),ct=E(" at a glance"),dt=v();for(let e=0;e<xe.length;e+=1)xe[e].c();Ka=v(),Ue=R("h2"),Ue.innerHTML=f,At=v(),C(za.$$.fragment),Ot=v(),ee&&ee.c(),yt=v(),C(Q.$$.fragment),d=v(),Be=R("p"),Be.textContent=Va,Ga=v(),ae&&ae.c(),Qe=v(),te&&te.c(),Ja=v(),J.c(),We=v(),C(Ke.$$.fragment),La=v(),C(ma.$$.fragment),wt=v(),C(Se.$$.fragment),ua=v(),Ve=R("p"),Ve.innerHTML=mt,vt=v(),ia=R("h2"),ia.innerHTML=Za,fa=v(),ze=R("h3"),ze.innerHTML=Qt,bt=v(),pa=R("p"),pa.innerHTML=Ya,ha=v(),re&&re.c(),ga=v(),se&&se.c(),na=v(),C(ya.$$.fragment),$t=v(),Fe&&Fe.c(),Ge=v(),ke=R("h3"),ke.innerHTML=kt,Na=v(),wa=R("p"),wa.innerHTML=Wt,va=v(),ie&&ie.c(),Je=v(),ne&&ne.c(),ba=v(),Ce.c(),Xa=v(),oe&&oe.c(),Ze=v(),Le=R("h2"),Le.innerHTML=ut,Rt=v(),$a=R("p"),$a.innerHTML=et,ka=v(),_e&&_e.c(),Ra=v(),Me.c(),Xe=v(),le&&le.c(),xa=v(),De=R("h2"),De.innerHTML=Kt,xt=v(),ce&&ce.c(),ea=v(),de&&de.c(),aa=v(),oa=R("p"),Ua.c(),Et=v(),ye&&ye.c(),at=v(),C(Ea.$$.fragment),ja=v(),Ne=R("p"),Ne.innerHTML=jt,Bt=v(),Oa=R("p"),Oa.textContent=Vt,Ba=v(),Re=R("h2"),Re.innerHTML=Tt,St=v(),me&&me.c(),tt=v(),ue&&ue.c(),rt=v(),Ie=R("p"),Qa.c(),Ta=v(),C(ta.$$.fragment),Ct=v(),C(Sa.$$.fragment),qt=v(),Ae=R("p"),Wa.c(),Ca=v(),_a=R("p"),_a.textContent=Gt,Mt=v(),la=R("h2"),la.innerHTML=st,qa=v(),C(ra.$$.fragment),Dt=v(),fe&&fe.c(),it=v(),C(Ma.$$.fragment),Da=v(),C(He.$$.fragment),nt=v(),ca=R("h2"),ca.innerHTML=Jt,Ht=v(),pe&&pe.c(),ot=v(),C(_t.$$.fragment),Zt=v(),q=R("p"),q.textContent=D,V=v(),Oe=R("h2"),Oe.innerHTML=Ft,lt=v(),sa=R("ul"),sa.innerHTML=Yt,Xt=v(),ft=R("h2"),ft.innerHTML=Br,lr=v(),zt=R("p"),zt.innerHTML=Tr,cr=v(),rr=R("hr"),dr=v(),C(Pt.$$.fragment),this.h()},l(e){pt&&pt.l(e),t=w(e);const n=Bs("svelte-2igo1p",document.head);ir.l(n),r=k(n,"META",{name:!0,content:!0}),a=k(n,"META",{name:!0,content:!0}),ht&&ht.l(n),i=wr(),n.forEach(_),o=w(e),Z&&Z.l(e),u=w(e),Y&&Y.l(e),c=w(e),X&&X.l(e),h=w(e),S(g.$$.fragment,e),b=w(e),y=k(e,"P",{});var G=ve(y);M=x(G,"Up: "),Pa.l(G),$=x(G," · "),z=k(G,"A",{href:!0,"data-svelte-h":!0}),I(z)!=="svelte-1i43n98"&&(z.textContent=he),H=x(G," · "),O=k(G,"A",{href:!0,"data-svelte-h":!0}),I(O)!=="svelte-6j2qr0"&&(O.textContent=we),G.forEach(_),F=w(e),L=k(e,"H2",{class:!0,id:!0});var nr=ve(L);N=k(nr,"A",{href:!0});var Ut=ve(N);Fa=x(Ut,da),ct=x(Ut," at a glance"),Ut.forEach(_),nr.forEach(_),dt=w(e);for(let tr=0;tr<xe.length;tr+=1)xe[tr].l(e);Ka=w(e),Ue=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(Ue)!=="svelte-14f17uo"&&(Ue.innerHTML=f),At=w(e),S(za.$$.fragment,e),Ot=w(e),ee&&ee.l(e),yt=w(e),S(Q.$$.fragment,e),d=w(e),Be=k(e,"P",{class:!0,"data-svelte-h":!0}),I(Be)!=="svelte-11i1u0l"&&(Be.textContent=Va),Ga=w(e),ae&&ae.l(e),Qe=w(e),te&&te.l(e),Ja=w(e),J.l(e),We=w(e),S(Ke.$$.fragment,e),La=w(e),S(ma.$$.fragment,e),wt=w(e),S(Se.$$.fragment,e),ua=w(e),Ve=k(e,"P",{class:!0,"data-svelte-h":!0}),I(Ve)!=="svelte-dvqlbe"&&(Ve.innerHTML=mt),vt=w(e),ia=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(ia)!=="svelte-1i9w9pn"&&(ia.innerHTML=Za),fa=w(e),ze=k(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),I(ze)!=="svelte-yatnem"&&(ze.innerHTML=Qt),bt=w(e),pa=k(e,"P",{class:!0,"data-svelte-h":!0}),I(pa)!=="svelte-1s6me3w"&&(pa.innerHTML=Ya),ha=w(e),re&&re.l(e),ga=w(e),se&&se.l(e),na=w(e),S(ya.$$.fragment,e),$t=w(e),Fe&&Fe.l(e),Ge=w(e),ke=k(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),I(ke)!=="svelte-1uvjo0a"&&(ke.innerHTML=kt),Na=w(e),wa=k(e,"P",{class:!0,"data-svelte-h":!0}),I(wa)!=="svelte-jskapw"&&(wa.innerHTML=Wt),va=w(e),ie&&ie.l(e),Je=w(e),ne&&ne.l(e),ba=w(e),Ce.l(e),Xa=w(e),oe&&oe.l(e),Ze=w(e),Le=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(Le)!=="svelte-4kb45v"&&(Le.innerHTML=ut),Rt=w(e),$a=k(e,"P",{class:!0,"data-svelte-h":!0}),I($a)!=="svelte-fdg2k9"&&($a.innerHTML=et),ka=w(e),_e&&_e.l(e),Ra=w(e),Me.l(e),Xe=w(e),le&&le.l(e),xa=w(e),De=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(De)!=="svelte-1mdzqzc"&&(De.innerHTML=Kt),xt=w(e),ce&&ce.l(e),ea=w(e),de&&de.l(e),aa=w(e),oa=k(e,"P",{});var ar=ve(oa);Ua.l(ar),ar.forEach(_),Et=w(e),ye&&ye.l(e),at=w(e),S(Ea.$$.fragment,e),ja=w(e),Ne=k(e,"P",{"data-svelte-h":!0}),I(Ne)!=="svelte-1bydfby"&&(Ne.innerHTML=jt),Bt=w(e),Oa=k(e,"P",{"data-svelte-h":!0}),I(Oa)!=="svelte-1yv6nzw"&&(Oa.textContent=Vt),Ba=w(e),Re=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(Re)!=="svelte-12k6lqd"&&(Re.innerHTML=Tt),St=w(e),me&&me.l(e),tt=w(e),ue&&ue.l(e),rt=w(e),Ie=k(e,"P",{});var or=ve(Ie);Qa.l(or),or.forEach(_),Ta=w(e),S(ta.$$.fragment,e),Ct=w(e),S(Sa.$$.fragment,e),qt=w(e),Ae=k(e,"P",{});var _r=ve(Ae);Wa.l(_r),_r.forEach(_),Ca=w(e),_a=k(e,"P",{"data-svelte-h":!0}),I(_a)!=="svelte-ja6pm6"&&(_a.textContent=Gt),Mt=w(e),la=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(la)!=="svelte-13a10dj"&&(la.innerHTML=st),qa=w(e),S(ra.$$.fragment,e),Dt=w(e),fe&&fe.l(e),it=w(e),S(Ma.$$.fragment,e),Da=w(e),S(He.$$.fragment,e),nt=w(e),ca=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(ca)!=="svelte-60cjj9"&&(ca.innerHTML=Jt),Ht=w(e),pe&&pe.l(e),ot=w(e),S(_t.$$.fragment,e),Zt=w(e),q=k(e,"P",{class:!0,"data-svelte-h":!0}),I(q)!=="svelte-kz3w0c"&&(q.textContent=D),V=w(e),Oe=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(Oe)!=="svelte-ad0syq"&&(Oe.innerHTML=Ft),lt=w(e),sa=k(e,"UL",{class:!0,"data-svelte-h":!0}),I(sa)!=="svelte-hyrhc3"&&(sa.innerHTML=Yt),Xt=w(e),ft=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),I(ft)!=="svelte-oimjns"&&(ft.innerHTML=Br),lr=w(e),zt=k(e,"P",{class:!0,"data-svelte-h":!0}),I(zt)!=="svelte-k1wi1g"&&(zt.innerHTML=Tr),cr=w(e),rr=k(e,"HR",{class:!0}),dr=w(e),S(Pt.$$.fragment,e),this.h()},h(){j(r,"name","twitter:card"),j(r,"content","summary_large_image"),j(a,"name","twitter:site"),j(a,"content","@evidence_dev"),j(z,"href","/gentriduck/berlin/area-detail"),j(O,"href","/gentriduck/berlin/area/bezirk"),j(N,"href","#area_info0--area_info0area_name--this-area-at-a-glance"),j(L,"class","markdown"),j(L,"id","area_info0--area_info0area_name--this-area-at-a-glance"),j(Ue,"class","markdown"),j(Ue,"id","social-status--trajectory"),j(Be,"class","markdown"),j(Ve,"class","markdown"),j(ia,"class","markdown"),j(ia,"id","commercial-mix--offering-advantage"),j(ze,"class","markdown"),j(ze,"id","how-its-commercial-mix-has-developed"),j(pa,"class","markdown"),j(ke,"class","markdown"),j(ke,"id","offering-advantage-profile"),j(wa,"class","markdown"),j(Le,"class","markdown"),j(Le,"id","within-group-dominance"),j($a,"class","markdown"),j(De,"class","markdown"),j(De,"id","people--structure"),j(Re,"class","markdown"),j(Re,"id","amenities--everyday-infrastructure"),j(la,"class","markdown"),j(la,"id","land-value--estimated-rent"),j(ca,"class","markdown"),j(ca,"id","where-this-area-sits"),j(q,"class","markdown"),j(Oe,"class","markdown"),j(Oe,"id","honest-caveats"),j(sa,"class","markdown"),j(ft,"class","markdown"),j(ft,"id","further-reading"),j(zt,"class","markdown"),j(rr,"class","markdown")},m(e,n){pt&&pt.m(e,n),l(e,t,n),ir.m(document.head,null),U(document.head,r),U(document.head,a),ht&&ht.m(document.head,null),U(document.head,i),l(e,o,n),Z&&Z.m(e,n),l(e,u,n),Y&&Y.m(e,n),l(e,c,n),X&&X.m(e,n),l(e,h,n),T(g,e,n),l(e,b,n),l(e,y,n),U(y,M),Pa.m(y,null),U(y,$),U(y,z),U(y,H),U(y,O),l(e,F,n),l(e,L,n),U(L,N),U(N,Fa),U(N,ct),l(e,dt,n);for(let G=0;G<xe.length;G+=1)xe[G]&&xe[G].m(e,n);l(e,Ka,n),l(e,Ue,n),l(e,At,n),T(za,e,n),l(e,Ot,n),ee&&ee.m(e,n),l(e,yt,n),T(Q,e,n),l(e,d,n),l(e,Be,n),l(e,Ga,n),ae&&ae.m(e,n),l(e,Qe,n),te&&te.m(e,n),l(e,Ja,n),Lt[Te].m(e,n),l(e,We,n),T(Ke,e,n),l(e,La,n),T(ma,e,n),l(e,wt,n),T(Se,e,n),l(e,ua,n),l(e,Ve,n),l(e,vt,n),l(e,ia,n),l(e,fa,n),l(e,ze,n),l(e,bt,n),l(e,pa,n),l(e,ha,n),re&&re.m(e,n),l(e,ga,n),se&&se.m(e,n),l(e,na,n),T(ya,e,n),l(e,$t,n),Fe&&Fe.m(e,n),l(e,Ge,n),l(e,ke,n),l(e,Na,n),l(e,wa,n),l(e,va,n),ie&&ie.m(e,n),l(e,Je,n),ne&&ne.m(e,n),l(e,ba,n),Nt[ge].m(e,n),l(e,Xa,n),oe&&oe.m(e,n),l(e,Ze,n),l(e,Le,n),l(e,Rt,n),l(e,$a,n),l(e,ka,n),_e&&_e.m(e,n),l(e,Ra,n),It[qe].m(e,n),l(e,Xe,n),le&&le.m(e,n),l(e,xa,n),l(e,De,n),l(e,xt,n),ce&&ce.m(e,n),l(e,ea,n),de&&de.m(e,n),l(e,aa,n),l(e,oa,n),Ua.m(oa,null),l(e,Et,n),ye&&ye.m(e,n),l(e,at,n),T(Ea,e,n),l(e,ja,n),l(e,Ne,n),l(e,Bt,n),l(e,Oa,n),l(e,Ba,n),l(e,Re,n),l(e,St,n),me&&me.m(e,n),l(e,tt,n),ue&&ue.m(e,n),l(e,rt,n),l(e,Ie,n),Qa.m(Ie,null),l(e,Ta,n),T(ta,e,n),l(e,Ct,n),T(Sa,e,n),l(e,qt,n),l(e,Ae,n),Wa.m(Ae,null),l(e,Ca,n),l(e,_a,n),l(e,Mt,n),l(e,la,n),l(e,qa,n),T(ra,e,n),l(e,Dt,n),fe&&fe.m(e,n),l(e,it,n),T(Ma,e,n),l(e,Da,n),T(He,e,n),l(e,nt,n),l(e,ca,n),l(e,Ht,n),pe&&pe.m(e,n),l(e,ot,n),T(_t,e,n),l(e,Zt,n),l(e,q,n),l(e,V,n),l(e,Oe,n),l(e,lt,n),l(e,sa,n),l(e,Xt,n),l(e,ft,n),l(e,lr,n),l(e,zt,n),l(e,cr,n),l(e,rr,n),l(e,dr,n),T(Pt,e,n),sr=!0},p(e,n){var Pr;typeof A<"u"&&(A.title||(Pr=A.og)!=null&&Pr.title)&&A.hide_title!==!0&&pt.p(e,n),ir.p(e,n),typeof A=="object"&&ht.p(e,n),e[11]?Z?(Z.p(e,n),n[0]&2048&&m(Z,1)):(Z=Zr(e),Z.c(),m(Z,1),Z.m(u.parentNode,u)):Z&&(K(),p(Z,1,1,()=>{Z=null}),W()),e[0]?Y?(Y.p(e,n),n[0]&1&&m(Y,1)):(Y=Yr(e),Y.c(),m(Y,1),Y.m(c.parentNode,c)):Y&&(K(),p(Y,1,1,()=>{Y=null}),W()),e[1]?X?(X.p(e,n),n[0]&2&&m(X,1)):(X=Xr(e),X.c(),m(X,1),X.m(h.parentNode,h)):X&&(K(),p(X,1,1,()=>{X=null}),W());const G={};if(n[0]&2048&&(G.title=e[11][0]?e[11][0].area_name:"Neighbourhood"),g.$set(G),mr===(mr=Sr(e))&&Pa?Pa.p(e,n):(Pa.d(1),Pa=mr(e),Pa&&(Pa.c(),Pa.m(y,$))),(!sr||n[0]&2048)&&da!==(da=(e[11][0]?e[11][0].area_name:"This area")+"")&&Pe(Fa,da),n[0]&8388608){er=Wr(e[23]);let Ha;for(Ha=0;Ha<er.length;Ha+=1){const Ur=Jr(e,er,Ha);xe[Ha]?xe[Ha].p(Ur,n):(xe[Ha]=es(Ur),xe[Ha].c(),xe[Ha].m(Ka.parentNode,Ka))}for(;Ha<xe.length;Ha+=1)xe[Ha].d(1);xe.length=er.length}const nr={};n[4]&262144&&(nr.$$scope={dirty:n,ctx:e}),za.$set(nr),e[12]?ee?(ee.p(e,n),n[0]&4096&&m(ee,1)):(ee=as(e),ee.c(),m(ee,1),ee.m(yt.parentNode,yt)):ee&&(K(),p(ee,1,1,()=>{ee=null}),W());const Ut={};n[0]&4096&&(Ut.data=e[12]),n[0]&2048&&(Ut.title="Social status over time, "+(e[11][0]?e[11][0].area_name:"this area")+" (1 = least deprived … 4 = most deprived)"),Q.$set(Ut),e[2]?ae?(ae.p(e,n),n[0]&4&&m(ae,1)):(ae=ts(e),ae.c(),m(ae,1),ae.m(Qe.parentNode,Qe)):ae&&(K(),p(ae,1,1,()=>{ae=null}),W()),e[3]?te?(te.p(e,n),n[0]&8&&m(te,1)):(te=rs(e),te.c(),m(te,1),te.m(Ja.parentNode,Ja)):te&&(K(),p(te,1,1,()=>{te=null}),W());let ar=Te;Te=qr(e),Te===ar?Lt[Te].p(e,n):(K(),p(Lt[ar],1,1,()=>{Lt[ar]=null}),W(),J=Lt[Te],J?J.p(e,n):(J=Lt[Te]=Cr[Te](e),J.c()),m(J,1),J.m(We.parentNode,We));const or={};n[0]&4&&(or.data=e[2]),Ke.$set(or);const _r={};n[0]&4&&(_r.data=e[2]),ma.$set(_r);const tr={};n[0]&4&&(tr.data=e[2]),Se.$set(tr),e[4]?re?(re.p(e,n),n[0]&16&&m(re,1)):(re=ss(e),re.c(),m(re,1),re.m(ga.parentNode,ga)):re&&(K(),p(re,1,1,()=>{re=null}),W()),e[5]?se?(se.p(e,n),n[0]&32&&m(se,1)):(se=is(e),se.c(),m(se,1),se.m(na.parentNode,na)):se&&(K(),p(se,1,1,()=>{se=null}),W());const hr={};n[0]&16&&(hr.data=e[4]),n[0]&4194304&&(hr.seriesOrder=e[22]),n[0]&2048&&(hr.title="Mapped places by category, "+(e[11][0]?e[11][0].area_name:"this area")+" (largest segment first)"),ya.$set(hr),e[21]&&e[21].area_top_category?Fe?Fe.p(e,n):(Fe=ns(e),Fe.c(),Fe.m(Ge.parentNode,Ge)):Fe&&(Fe.d(1),Fe=null),e[6]?ie?(ie.p(e,n),n[0]&64&&m(ie,1)):(ie=os(e),ie.c(),m(ie,1),ie.m(Je.parentNode,Je)):ie&&(K(),p(ie,1,1,()=>{ie=null}),W()),e[7]?ne?(ne.p(e,n),n[0]&128&&m(ne,1)):(ne=_s(e),ne.c(),m(ne,1),ne.m(ba.parentNode,ba)):ne&&(K(),p(ne,1,1,()=>{ne=null}),W());let vr=ge;ge=Dr(e),ge===vr?Nt[ge].p(e,n):(K(),p(Nt[vr],1,1,()=>{Nt[vr]=null}),W(),Ce=Nt[ge],Ce?Ce.p(e,n):(Ce=Nt[ge]=Mr[ge](e),Ce.c()),m(Ce,1),Ce.m(Xa.parentNode,Xa)),n[0]&256&&(Ia=e[8].some(vs)),Ia?oe?(oe.p(e,n),n[0]&256&&m(oe,1)):(oe=ls(e),oe.c(),m(oe,1),oe.m(Ze.parentNode,Ze)):oe&&(K(),p(oe,1,1,()=>{oe=null}),W()),e[13]?_e?(_e.p(e,n),n[0]&8192&&m(_e,1)):(_e=cs(e),_e.c(),m(_e,1),_e.m(Ra.parentNode,Ra)):_e&&(K(),p(_e,1,1,()=>{_e=null}),W());let br=qe;qe=Fr(e,n),qe===br?It[qe].p(e,n):(K(),p(It[br],1,1,()=>{It[br]=null}),W(),Me=It[qe],Me?Me.p(e,n):(Me=It[qe]=Hr[qe](e),Me.c()),m(Me,1),Me.m(Xe.parentNode,Xe)),n[0]&8192&&(Aa=e[13].some(ws)),Aa?le?(le.p(e,n),n[0]&8192&&m(le,1)):(le=ds(e),le.c(),m(le,1),le.m(xa.parentNode,xa)):le&&(K(),p(le,1,1,()=>{le=null}),W()),e[14]?ce?(ce.p(e,n),n[0]&16384&&m(ce,1)):(ce=ms(e),ce.c(),m(ce,1),ce.m(ea.parentNode,ea)):ce&&(K(),p(ce,1,1,()=>{ce=null}),W()),e[15]?de?(de.p(e,n),n[0]&32768&&m(de,1)):(de=us(e),de.c(),m(de,1),de.m(aa.parentNode,aa)):de&&(K(),p(de,1,1,()=>{de=null}),W()),ur===(ur=zr(e))&&Ua?Ua.p(e,n):(Ua.d(1),Ua=ur(e),Ua&&(Ua.c(),Ua.m(oa,null))),e[14][0]&&e[14][0].any_indicator_suppressed?ye?n[0]&16384&&m(ye,1):(ye=fs(e),ye.c(),m(ye,1),ye.m(at.parentNode,at)):ye&&(K(),p(ye,1,1,()=>{ye=null}),W());const $r={};n[0]&32768&&($r.data=e[15]),n[4]&262144&&($r.$$scope={dirty:n,ctx:e}),Ea.$set($r),e[16]?me?(me.p(e,n),n[0]&65536&&m(me,1)):(me=ps(e),me.c(),m(me,1),me.m(tt.parentNode,tt)):me&&(K(),p(me,1,1,()=>{me=null}),W()),e[17]?ue?(ue.p(e,n),n[0]&131072&&m(ue,1)):(ue=hs(e),ue.c(),m(ue,1),ue.m(rt.parentNode,rt)):ue&&(K(),p(ue,1,1,()=>{ue=null}),W()),fr===(fr=Lr(e))&&Qa?Qa.p(e,n):(Qa.d(1),Qa=fr(e),Qa&&(Qa.c(),Qa.m(Ie,null)));const kr={};n[0]&131072&&(kr.data=e[17]),n[4]&262144&&(kr.$$scope={dirty:n,ctx:e}),ta.$set(kr);const Ar={};n[4]&262144&&(Ar.$$scope={dirty:n,ctx:e}),Sa.$set(Ar),pr===(pr=Nr(e))&&Wa?Wa.p(e,n):(Wa.d(1),Wa=pr(e),Wa&&(Wa.c(),Wa.m(Ae,null)));const Or={};n[4]&262144&&(Or.$$scope={dirty:n,ctx:e}),ra.$set(Or),e[18]?fe?(fe.p(e,n),n[0]&262144&&m(fe,1)):(fe=gs(e),fe.c(),m(fe,1),fe.m(it.parentNode,it)):fe&&(K(),p(fe,1,1,()=>{fe=null}),W());const Rr={};n[0]&262144&&(Rr.data=e[18]),n[0]&2048&&(Rr.title="Estimated rent range (EUR/m²), "+(e[11][0]?e[11][0].area_name:"this area")),Ma.$set(Rr);const xr={};n[0]&262144&&(xr.data=e[18]),n[4]&262144&&(xr.$$scope={dirty:n,ctx:e}),He.$set(xr),e[19]?pe?(pe.p(e,n),n[0]&524288&&m(pe,1)):(pe=ys(e),pe.c(),m(pe,1),pe.m(ot.parentNode,ot)):pe&&(K(),p(pe,1,1,()=>{pe=null}),W());const Er={};n[0]&524288&&(Er.data=e[19]),n[0]&2048&&(Er.title=e[11][0]?e[11][0].area_name:"This area"),_t.$set(Er)},i(e){sr||(m(Z),m(Y),m(X),m(g.$$.fragment,e),m(za.$$.fragment,e),m(ee),m(Q.$$.fragment,e),m(ae),m(te),m(J),m(Ke.$$.fragment,e),m(ma.$$.fragment,e),m(Se.$$.fragment,e),m(re),m(se),m(ya.$$.fragment,e),m(ie),m(ne),m(Ce),m(oe),m(_e),m(Me),m(le),m(ce),m(de),m(ye),m(Ea.$$.fragment,e),m(me),m(ue),m(ta.$$.fragment,e),m(Sa.$$.fragment,e),m(ra.$$.fragment,e),m(fe),m(Ma.$$.fragment,e),m(He.$$.fragment,e),m(pe),m(_t.$$.fragment,e),m(Pt.$$.fragment,e),sr=!0)},o(e){p(Z),p(Y),p(X),p(g.$$.fragment,e),p(za.$$.fragment,e),p(ee),p(Q.$$.fragment,e),p(ae),p(te),p(J),p(Ke.$$.fragment,e),p(ma.$$.fragment,e),p(Se.$$.fragment,e),p(re),p(se),p(ya.$$.fragment,e),p(ie),p(ne),p(Ce),p(oe),p(_e),p(Me),p(le),p(ce),p(de),p(ye),p(Ea.$$.fragment,e),p(me),p(ue),p(ta.$$.fragment,e),p(Sa.$$.fragment,e),p(ra.$$.fragment,e),p(fe),p(Ma.$$.fragment,e),p(He.$$.fragment,e),p(pe),p(_t.$$.fragment,e),p(Pt.$$.fragment,e),sr=!1},d(e){e&&(_(t),_(o),_(u),_(c),_(h),_(b),_(y),_(F),_(L),_(dt),_(Ka),_(Ue),_(At),_(Ot),_(yt),_(d),_(Be),_(Ga),_(Qe),_(Ja),_(We),_(La),_(wt),_(ua),_(Ve),_(vt),_(ia),_(fa),_(ze),_(bt),_(pa),_(ha),_(ga),_(na),_($t),_(Ge),_(ke),_(Na),_(wa),_(va),_(Je),_(ba),_(Xa),_(Ze),_(Le),_(Rt),_($a),_(ka),_(Ra),_(Xe),_(xa),_(De),_(xt),_(ea),_(aa),_(oa),_(Et),_(at),_(ja),_(Ne),_(Bt),_(Oa),_(Ba),_(Re),_(St),_(tt),_(rt),_(Ie),_(Ta),_(Ct),_(qt),_(Ae),_(Ca),_(_a),_(Mt),_(la),_(qa),_(Dt),_(it),_(Da),_(nt),_(ca),_(Ht),_(ot),_(Zt),_(q),_(V),_(Oe),_(lt),_(sa),_(Xt),_(ft),_(lr),_(zt),_(cr),_(rr),_(dr)),pt&&pt.d(e),ir.d(e),_(r),_(a),ht&&ht.d(e),_(i),Z&&Z.d(e),Y&&Y.d(e),X&&X.d(e),B(g,e),Pa.d(),js(xe,e),B(za,e),ee&&ee.d(e),B(Q,e),ae&&ae.d(e),te&&te.d(e),Lt[Te].d(e),B(Ke,e),B(ma,e),B(Se,e),re&&re.d(e),se&&se.d(e),B(ya,e),Fe&&Fe.d(e),ie&&ie.d(e),ne&&ne.d(e),Nt[ge].d(e),oe&&oe.d(e),_e&&_e.d(e),It[qe].d(e),le&&le.d(e),ce&&ce.d(e),de&&de.d(e),Ua.d(),ye&&ye.d(e),B(Ea,e),me&&me.d(e),ue&&ue.d(e),Qa.d(),B(ta,e),B(Sa,e),Wa.d(),B(ra,e),fe&&fe.d(e),B(Ma,e),B(He,e),pe&&pe.d(e),B(_t,e),B(Pt,e)}}}const A={},Si=5,jr=5,ws=s=>s.is_thin_base,Ci=s=>!s.is_thin_base,vs=s=>s.lowBase,bs=s=>s.lowBase,$s=s=>`${s.domain} (${s.poiCount??0})`,ks=s=>!s.is_thin_base,Rs=s=>s.is_thin_base;function qi(s,t,r){let a,i,o,u,c,h,g,b,y,M,$,z,he,H,O,we,F,L,N,da,Fa,ct,dt,Ka;Qr(s,Ws,q=>r(110,dt=q)),Qr(s,Vr,q=>r(115,Ka=q));let{data:Ue}=t,{data:f={},customFormattingSettings:At,__db:za,inputs:Ot}=Ue;Ts(Vr,Ka="40c65ae01ec9f4363d3b5188faa4d064",Ka);let yt=Os(As(Ot));Ss(yt.subscribe(q=>Ot=q)),Cs(Qs,{getCustomFormats:()=>At.customFormats||[]});const Q=(q,D)=>Gs(za.query,q,{query_name:D});Ps(Q);let d=dt.params;qs(()=>!0);let Be={initialData:void 0,initialError:void 0},Va=P`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`,Ga=`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`;f.area_info_data&&(f.area_info_data instanceof Error?Be.initialError=f.area_info_data:Be.initialData=f.area_info_data,f.area_info_columns&&(Be.knownColumns=f.area_info_columns));let Qe,Ja=!1;const Te=Ee.createReactive({callback:q=>{r(11,Qe=q)},execFn:Q},{id:"area_info",...Be});Te(Ga,{noResolve:Va,...Be}),globalThis[Symbol.for("area_info")]={get value(){return Qe}};let J={initialData:void 0,initialError:void 0},We=P`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${d.code}', 1, 2) as bezirk_code,
    case substr('${d.code}', 1, 2)
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
        else 'its district'
    end as bezirk_name`,Ke=`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${d.code}', 1, 2) as bezirk_code,
    case substr('${d.code}', 1, 2)
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
        else 'its district'
    end as bezirk_name`;f.district_info_data&&(f.district_info_data instanceof Error?J.initialError=f.district_info_data:J.initialData=f.district_info_data,f.district_info_columns&&(J.knownColumns=f.district_info_columns));let La,ma=!1;const wt=Ee.createReactive({callback:q=>{r(0,La=q)},execFn:Q},{id:"district_info",...J});wt(Ke,{noResolve:We,...J}),globalThis[Symbol.for("district_info")]={get value(){return La}};let Se={initialData:void 0,initialError:void 0},ua=P`-- Current (latest published period) status/pressure for this area, plus the simple district and
-- citywide averages at that same period -- for the portrait's "compared to district/city" claim
-- and the status chart's context lines' current-value anchor. Unweighted means, same style as the
-- citywide averages already used on /berlin/poi-map's "Citywide context" section.
with
    latest_period as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    ),
    district_now as (
        select
            avg(status_index) as district_avg_status_index,
            avg(dynamism_index) as district_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    ),
    city_now as (
        select
            avg(status_index) as city_avg_status_index,
            avg(dynamism_index) as city_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
    )
select
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    gi.status_index,
    gi.dynamism_index,
    d.district_avg_status_index,
    d.district_avg_dynamism_index,
    c.city_avg_status_index,
    c.city_avg_dynamism_index
from gentriduck_marts.gentrification_index as gi
cross join district_now as d
cross join city_now as c
where
    gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
    and gi.area_code = '${d.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`,Ve=`-- Current (latest published period) status/pressure for this area, plus the simple district and
-- citywide averages at that same period -- for the portrait's "compared to district/city" claim
-- and the status chart's context lines' current-value anchor. Unweighted means, same style as the
-- citywide averages already used on /berlin/poi-map's "Citywide context" section.
with
    latest_period as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    ),
    district_now as (
        select
            avg(status_index) as district_avg_status_index,
            avg(dynamism_index) as district_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    ),
    city_now as (
        select
            avg(status_index) as city_avg_status_index,
            avg(dynamism_index) as city_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
    )
select
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    gi.status_index,
    gi.dynamism_index,
    d.district_avg_status_index,
    d.district_avg_dynamism_index,
    c.city_avg_status_index,
    c.city_avg_dynamism_index
from gentriduck_marts.gentrification_index as gi
cross join district_now as d
cross join city_now as c
where
    gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
    and gi.area_code = '${d.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`;f.context_current_data&&(f.context_current_data instanceof Error?Se.initialError=f.context_current_data:Se.initialData=f.context_current_data,f.context_current_columns&&(Se.knownColumns=f.context_current_columns));let mt,vt=!1;const ia=Ee.createReactive({callback:q=>{r(1,mt=q)},execFn:Q},{id:"context_current",...Se});ia(Ve,{noResolve:ua,...Se}),globalThis[Symbol.for("context_current")]={get value(){return mt}};let Za={initialData:void 0,initialError:void 0},fa=P`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_year as (
        select snapshot_year, avg(status_index) as city_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
        group by snapshot_year
    )
select
    a.snapshot_year,
    a.status_index as "This area",
    d.district_avg_status_index as "District average",
    c.city_avg_status_index as "Berlin average",
    a.typology_stage
from gentriduck_marts.fct_gentrification_change as a
left join district_year as d on d.snapshot_year = a.snapshot_year
left join city_year as c on c.snapshot_year = a.snapshot_year
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
order by a.snapshot_year`,ze=`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_year as (
        select snapshot_year, avg(status_index) as city_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
        group by snapshot_year
    )
select
    a.snapshot_year,
    a.status_index as "This area",
    d.district_avg_status_index as "District average",
    c.city_avg_status_index as "Berlin average",
    a.typology_stage
from gentriduck_marts.fct_gentrification_change as a
left join district_year as d on d.snapshot_year = a.snapshot_year
left join city_year as c on c.snapshot_year = a.snapshot_year
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
order by a.snapshot_year`;f.area_trend_data&&(f.area_trend_data instanceof Error?Za.initialError=f.area_trend_data:Za.initialData=f.area_trend_data,f.area_trend_columns&&(Za.knownColumns=f.area_trend_columns));let Qt,bt=!1;const pa=Ee.createReactive({callback:q=>{r(12,Qt=q)},execFn:Q},{id:"area_trend",...Za});pa(ze,{noResolve:fa,...Za}),globalThis[Symbol.for("area_trend")]={get value(){return Qt}};let Ya={initialData:void 0,initialError:void 0},ha=P`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`,ga=`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`;f.trajectory_summary_data&&(f.trajectory_summary_data instanceof Error?Ya.initialError=f.trajectory_summary_data:Ya.initialData=f.trajectory_summary_data,f.trajectory_summary_columns&&(Ya.knownColumns=f.trajectory_summary_columns));let na,ya=!1;const $t=Ee.createReactive({callback:q=>{r(2,na=q)},execFn:Q},{id:"trajectory_summary",...Ya});$t(ga,{noResolve:ha,...Ya}),globalThis[Symbol.for("trajectory_summary")]={get value(){return na}};let Ge={initialData:void 0,initialError:void 0},ke=P`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`,kt=`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`;f.district_trajectory_mix_data&&(f.district_trajectory_mix_data instanceof Error?Ge.initialError=f.district_trajectory_mix_data:Ge.initialData=f.district_trajectory_mix_data,f.district_trajectory_mix_columns&&(Ge.knownColumns=f.district_trajectory_mix_columns));let Na,wa=!1;const Wt=Ee.createReactive({callback:q=>{r(3,Na=q)},execFn:Q},{id:"district_trajectory_mix",...Ge});Wt(kt,{noResolve:ke,...Ge}),globalThis[Symbol.for("district_trajectory_mix")]={get value(){return Na}};let va={initialData:void 0,initialError:void 0},Je=P`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`,ba=`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`;f.poi_trend_data&&(f.poi_trend_data instanceof Error?va.initialError=f.poi_trend_data:va.initialData=f.poi_trend_data,f.poi_trend_columns&&(va.knownColumns=f.poi_trend_columns));let ge,Ce=!1;const Xa=Ee.createReactive({callback:q=>{r(4,ge=q)},execFn:Q},{id:"poi_trend",...va});Xa(ba,{noResolve:Je,...va}),globalThis[Symbol.for("poi_trend")]={get value(){return ge}};let Ia={initialData:void 0,initialError:void 0},Ze=P`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from district_mix order by poi_count desc limit 1) as district_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`,Le=`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from district_mix order by poi_count desc limit 1) as district_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`;f.poi_mix_context_data&&(f.poi_mix_context_data instanceof Error?Ia.initialError=f.poi_mix_context_data:Ia.initialData=f.poi_mix_context_data,f.poi_mix_context_columns&&(Ia.knownColumns=f.poi_mix_context_columns));let ut,Rt=!1;const $a=Ee.createReactive({callback:q=>{r(5,ut=q)},execFn:Q},{id:"poi_mix_context",...Ia});$a(Le,{noResolve:Ze,...Ia}),globalThis[Symbol.for("poi_mix_context")]={get value(){return ut}};let et={initialData:void 0,initialError:void 0},ka=P`select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
order by oa_domain desc`,Ra=`select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
order by oa_domain desc`;f.poi_oa_radar_data&&(f.poi_oa_radar_data instanceof Error?et.initialError=f.poi_oa_radar_data:et.initialData=f.poi_oa_radar_data,f.poi_oa_radar_columns&&(et.knownColumns=f.poi_oa_radar_columns));let Ye,qe=!1;const Me=Ee.createReactive({callback:q=>{r(6,Ye=q)},execFn:Q},{id:"poi_oa_radar",...et});Me(Ra,{noResolve:ka,...et}),globalThis[Symbol.for("poi_oa_radar")]={get value(){return Ye}};let Xe={initialData:void 0,initialError:void 0},Aa=P`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
group by poi_domain_h`,xa=`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
group by poi_domain_h`;f.poi_oa_radar_district_data&&(f.poi_oa_radar_district_data instanceof Error?Xe.initialError=f.poi_oa_radar_district_data:Xe.initialData=f.poi_oa_radar_district_data,f.poi_oa_radar_district_columns&&(Xe.knownColumns=f.poi_oa_radar_district_columns));let De,Kt=!1;const xt=Ee.createReactive({callback:q=>{r(7,De=q)},execFn:Q},{id:"poi_oa_radar_district",...Xe});xt(xa,{noResolve:Aa,...Xe}),globalThis[Symbol.for("poi_oa_radar_district")]={get value(){return De}};let ea={initialData:void 0,initialError:void 0},aa=P`select
    dominance_group,
    case dominance_group
        when 'gastronomy_category' then 'Gastronomy (Café / Restaurant / Fast Food)'
        when 'retail_category' then 'Retail (12 categories)'
        when 'entertainment_category' then 'Entertainment (Bar / Nightlife / Culture / Leisure)'
        when 'wellness_curated' then 'Wellness / fitness (curated cross-domain group)'
        else dominance_group
    end as group_label,
    hhi,
    top_share,
    top_child,
    top_child_offering_tier,
    n_children,
    group_stock_local,
    is_thin_base
from gentriduck_marts.mart_poi_dominance
where
    city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this section relocates from.
    and is_public_safe = true
    -- area_vintage/weight_variant pinned to avoid returning up to 4 rows per business group
    -- (mart_poi_dominance's own grain includes both) -- same current-boundary, unweighted
    -- convention used everywhere else on this site; see pages/berlin/area/bezirk/[code].md's
    -- header comment for the #298 finding this fixes (the pre-relocation /methodology-oa-modes
    -- widget did not filter either, and silently mixed vintages/weightings into one ranking).
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${d.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`,oa=`select
    dominance_group,
    case dominance_group
        when 'gastronomy_category' then 'Gastronomy (Café / Restaurant / Fast Food)'
        when 'retail_category' then 'Retail (12 categories)'
        when 'entertainment_category' then 'Entertainment (Bar / Nightlife / Culture / Leisure)'
        when 'wellness_curated' then 'Wellness / fitness (curated cross-domain group)'
        else dominance_group
    end as group_label,
    hhi,
    top_share,
    top_child,
    top_child_offering_tier,
    n_children,
    group_stock_local,
    is_thin_base
from gentriduck_marts.mart_poi_dominance
where
    city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this section relocates from.
    and is_public_safe = true
    -- area_vintage/weight_variant pinned to avoid returning up to 4 rows per business group
    -- (mart_poi_dominance's own grain includes both) -- same current-boundary, unweighted
    -- convention used everywhere else on this site; see pages/berlin/area/bezirk/[code].md's
    -- header comment for the #298 finding this fixes (the pre-relocation /methodology-oa-modes
    -- widget did not filter either, and silently mixed vintages/weightings into one ranking).
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${d.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`;f.dominance_area_data&&(f.dominance_area_data instanceof Error?ea.initialError=f.dominance_area_data:ea.initialData=f.dominance_area_data,f.dominance_area_columns&&(ea.knownColumns=f.dominance_area_columns));let Et,at=!1;const Ea=Ee.createReactive({callback:q=>{r(13,Et=q)},execFn:Q},{id:"dominance_area",...ea});Ea(oa,{noResolve:aa,...ea}),globalThis[Symbol.for("dominance_area")]={get value(){return Et}};let ja={initialData:void 0,initialError:void 0},Ne=P`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`,jt=`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`;f.demographics_current_data&&(f.demographics_current_data instanceof Error?ja.initialError=f.demographics_current_data:ja.initialData=f.demographics_current_data,f.demographics_current_columns&&(ja.knownColumns=f.demographics_current_columns));let Bt,Oa=!1;const Vt=Ee.createReactive({callback:q=>{r(14,Bt=q)},execFn:Q},{id:"demographics_current",...ja});Vt(jt,{noResolve:Ne,...ja}),globalThis[Symbol.for("demographics_current")]={get value(){return Bt}};let Ba={initialData:void 0,initialError:void 0},Re=P`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
            and reference_year = (select reference_year from latest)
    ),
    city_row as (
        select
            reference_year,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'bezirk'
            and reference_year = (select reference_year from latest)
        group by reference_year
    )
select 1 as sort_order, 'Residents (Einwohner)' as indicator, cast(a.residents_total as varchar) as area_value,
    cast(round(d.residents_total) as varchar) as district_value, cast(round(c.residents_total) as varchar) as city_value
from area_row as a cross join district_row as d cross join city_row as c
union all
select 2, 'Mean age', round(a.mean_age_years, 1) || ' yrs', round(d.mean_age_years, 1) || ' yrs', round(c.mean_age_years, 1) || ' yrs'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 3, 'Female share', round(a.residents_female_share * 100, 1) || '%', round(d.residents_female_share * 100, 1) || '%', round(c.residents_female_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 4, 'Under 18', round(a.age_under18_share * 100, 1) || '%', round(d.age_under18_share * 100, 1) || '%', round(c.age_under18_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 5, '18 to under 27', round(a.age_18_27_share * 100, 1) || '%', round(d.age_18_27_share * 100, 1) || '%', round(c.age_18_27_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 6, '27 to under 45', round(a.age_27_45_share * 100, 1) || '%', round(d.age_27_45_share * 100, 1) || '%', round(c.age_27_45_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 7, '45 to under 65', round(a.age_45_65_share * 100, 1) || '%', round(d.age_45_65_share * 100, 1) || '%', round(c.age_45_65_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 8, '65 and over', round(a.age_65plus_share * 100, 1) || '%', round(d.age_65plus_share * 100, 1) || '%', round(c.age_65plus_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 9, 'Resident 5+ years at address', round(a.residence_duration_5y_share * 100, 1) || '%', round(d.residence_duration_5y_share * 100, 1) || '%', round(c.residence_duration_5y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 10, 'Resident 10+ years at address', round(a.residence_duration_10y_share * 100, 1) || '%', round(d.residence_duration_10y_share * 100, 1) || '%', round(c.residence_duration_10y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 11, 'Foreign-national share', round(a.foreigners_share * 100, 1) || '%', round(d.foreigners_share * 100, 1) || '%', round(c.foreigners_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 12, 'Migration-background share †', round(a.migration_background_share * 100, 1) || '%', round(d.migration_background_share * 100, 1) || '%', round(c.migration_background_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
order by sort_order`,Tt=`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
            and reference_year = (select reference_year from latest)
    ),
    city_row as (
        select
            reference_year,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'bezirk'
            and reference_year = (select reference_year from latest)
        group by reference_year
    )
select 1 as sort_order, 'Residents (Einwohner)' as indicator, cast(a.residents_total as varchar) as area_value,
    cast(round(d.residents_total) as varchar) as district_value, cast(round(c.residents_total) as varchar) as city_value
from area_row as a cross join district_row as d cross join city_row as c
union all
select 2, 'Mean age', round(a.mean_age_years, 1) || ' yrs', round(d.mean_age_years, 1) || ' yrs', round(c.mean_age_years, 1) || ' yrs'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 3, 'Female share', round(a.residents_female_share * 100, 1) || '%', round(d.residents_female_share * 100, 1) || '%', round(c.residents_female_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 4, 'Under 18', round(a.age_under18_share * 100, 1) || '%', round(d.age_under18_share * 100, 1) || '%', round(c.age_under18_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 5, '18 to under 27', round(a.age_18_27_share * 100, 1) || '%', round(d.age_18_27_share * 100, 1) || '%', round(c.age_18_27_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 6, '27 to under 45', round(a.age_27_45_share * 100, 1) || '%', round(d.age_27_45_share * 100, 1) || '%', round(c.age_27_45_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 7, '45 to under 65', round(a.age_45_65_share * 100, 1) || '%', round(d.age_45_65_share * 100, 1) || '%', round(c.age_45_65_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 8, '65 and over', round(a.age_65plus_share * 100, 1) || '%', round(d.age_65plus_share * 100, 1) || '%', round(c.age_65plus_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 9, 'Resident 5+ years at address', round(a.residence_duration_5y_share * 100, 1) || '%', round(d.residence_duration_5y_share * 100, 1) || '%', round(c.residence_duration_5y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 10, 'Resident 10+ years at address', round(a.residence_duration_10y_share * 100, 1) || '%', round(d.residence_duration_10y_share * 100, 1) || '%', round(c.residence_duration_10y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 11, 'Foreign-national share', round(a.foreigners_share * 100, 1) || '%', round(d.foreigners_share * 100, 1) || '%', round(c.foreigners_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 12, 'Migration-background share †', round(a.migration_background_share * 100, 1) || '%', round(d.migration_background_share * 100, 1) || '%', round(c.migration_background_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
order by sort_order`;f.demographics_table_data&&(f.demographics_table_data instanceof Error?Ba.initialError=f.demographics_table_data:Ba.initialData=f.demographics_table_data,f.demographics_table_columns&&(Ba.knownColumns=f.demographics_table_columns));let St,tt=!1;const rt=Ee.createReactive({callback:q=>{r(15,St=q)},execFn:Q},{id:"demographics_table",...Ba});rt(Tt,{noResolve:Re,...Ba}),globalThis[Symbol.for("demographics_table")]={get value(){return St}};let Ie={initialData:void 0,initialError:void 0},Ta=P`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`,ta=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`;f.amenities_current_data&&(f.amenities_current_data instanceof Error?Ie.initialError=f.amenities_current_data:Ie.initialData=f.amenities_current_data,f.amenities_current_columns&&(Ie.knownColumns=f.amenities_current_columns));let Ct,Sa=!1;const qt=Ee.createReactive({callback:q=>{r(16,Ct=q)},execFn:Q},{id:"amenities_current",...Ie});qt(ta,{noResolve:Ta,...Ie}),globalThis[Symbol.for("amenities_current")]={get value(){return Ct}};let Ae={initialData:void 0,initialError:void 0},Ca=P`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
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
order by sort_order`,_a=`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
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
order by sort_order`;f.amenities_table_data&&(f.amenities_table_data instanceof Error?Ae.initialError=f.amenities_table_data:Ae.initialData=f.amenities_table_data,f.amenities_table_columns&&(Ae.knownColumns=f.amenities_table_columns));let Gt,Mt=!1;const la=Ee.createReactive({callback:q=>{r(17,Gt=q)},execFn:Q},{id:"amenities_table",...Ae});la(_a,{noResolve:Ca,...Ae}),globalThis[Symbol.for("amenities_table")]={get value(){return Gt}};let st={initialData:void 0,initialError:void 0},qa=P`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_rent as (
        select snapshot_year, avg(est_rent_mid) as city_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER'
        group by snapshot_year
    )
select
    p.snapshot_year,
    p.brw_weighted_avg_eur_m2,
    p.est_rent_mid,
    p.est_rent_low,
    p.est_rent_high,
    d.district_avg_est_rent_mid as "District average (typical)",
    c.city_avg_est_rent_mid as "Berlin average (typical)"
from gentriduck_marts.mart_price_rent_dimension as p
left join district_rent as d on d.snapshot_year = p.snapshot_year
left join city_rent as c on c.snapshot_year = p.snapshot_year
where p.city_code = 'BER' and p.area_code = '${d.code}'
order by p.snapshot_year`,ra=`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_rent as (
        select snapshot_year, avg(est_rent_mid) as city_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER'
        group by snapshot_year
    )
select
    p.snapshot_year,
    p.brw_weighted_avg_eur_m2,
    p.est_rent_mid,
    p.est_rent_low,
    p.est_rent_high,
    d.district_avg_est_rent_mid as "District average (typical)",
    c.city_avg_est_rent_mid as "Berlin average (typical)"
from gentriduck_marts.mart_price_rent_dimension as p
left join district_rent as d on d.snapshot_year = p.snapshot_year
left join city_rent as c on c.snapshot_year = p.snapshot_year
where p.city_code = 'BER' and p.area_code = '${d.code}'
order by p.snapshot_year`;f.price_rent_data&&(f.price_rent_data instanceof Error?st.initialError=f.price_rent_data:st.initialData=f.price_rent_data,f.price_rent_columns&&(st.knownColumns=f.price_rent_columns));let Dt,it=!1;const Ma=Ee.createReactive({callback:q=>{r(18,Dt=q)},execFn:Q},{id:"price_rent",...st});Ma(ra,{noResolve:qa,...st}),globalThis[Symbol.for("price_rent")]={get value(){return Dt}};let Da={initialData:void 0,initialError:void 0},He=P`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`,nt=`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?Da.initialError=f.minimap_areas_data:Da.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(Da.knownColumns=f.minimap_areas_columns));let ca,Jt=!1;const Ht=Ee.createReactive({callback:q=>{r(19,ca=q)},execFn:Q},{id:"minimap_areas",...Da});Ht(nt,{noResolve:He,...Da}),globalThis[Symbol.for("minimap_areas")]={get value(){return ca}};const ot=()=>Qe!=null&&Qe[0]?Qe[0].area_name:"This area",_t={"stable-established":"classified **stable-established** — consistently low deprivation, with no sign of an active gentrification-type process","pre-gentrification":"classified **pre-gentrification** — still comparatively deprived, and not yet showing the upward status movement that would signal an active process","pioneer-signal":"showing a **pioneer signal** — an early, small-scale upward shift in status, the kind of movement that sometimes precedes wider gentrification pressure","active-gentrification":"in **active-gentrification** — the strongest form of the upward-status pressure this site tracks","consolidation-pressure":"under **consolidation pressure** — status is already comparatively high and continuing to firm up, consistent with a later stage of the process","improving-vulnerable":'a named, deliberately ambiguous **"improving-vulnerable"** case — status is improving even though the area remains comparatively deprived; the site reports this combination without resolving it (see methodology)'},Zt=-100;return s.$$set=q=>{"data"in q&&r(24,Ue=q.data)},s.$$.update=()=>{var q;s.$$.dirty[0]&16777216&&r(25,{data:f={},customFormattingSettings:At,__db:za}=Ue,f),s.$$.dirty[0]&33554432&&Us.set(Object.keys(f).length>0),s.$$.dirty[3]&131072&&r(26,d=dt.params),s.$$.dirty[0]&67108864&&r(28,Va=P`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`),s.$$.dirty[0]&67108864&&r(29,Ga=`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`),s.$$.dirty[0]&2013265920&&(Va||!Ja?Va||(Te(Ga,{noResolve:Va,...Be}),r(30,Ja=!0)):Te(Ga,{noResolve:Va})),s.$$.dirty[0]&67108864&&r(32,We=P`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${d.code}', 1, 2) as bezirk_code,
    case substr('${d.code}', 1, 2)
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
        else 'its district'
    end as bezirk_name`),s.$$.dirty[0]&67108864&&r(33,Ke=`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${d.code}', 1, 2) as bezirk_code,
    case substr('${d.code}', 1, 2)
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
        else 'its district'
    end as bezirk_name`),s.$$.dirty[1]&15&&(We||!ma?We||(wt(Ke,{noResolve:We,...J}),r(34,ma=!0)):wt(Ke,{noResolve:We})),s.$$.dirty[0]&67108864&&r(36,ua=P`-- Current (latest published period) status/pressure for this area, plus the simple district and
-- citywide averages at that same period -- for the portrait's "compared to district/city" claim
-- and the status chart's context lines' current-value anchor. Unweighted means, same style as the
-- citywide averages already used on /berlin/poi-map's "Citywide context" section.
with
    latest_period as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    ),
    district_now as (
        select
            avg(status_index) as district_avg_status_index,
            avg(dynamism_index) as district_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    ),
    city_now as (
        select
            avg(status_index) as city_avg_status_index,
            avg(dynamism_index) as city_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
    )
select
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    gi.status_index,
    gi.dynamism_index,
    d.district_avg_status_index,
    d.district_avg_dynamism_index,
    c.city_avg_status_index,
    c.city_avg_dynamism_index
from gentriduck_marts.gentrification_index as gi
cross join district_now as d
cross join city_now as c
where
    gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
    and gi.area_code = '${d.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`),s.$$.dirty[0]&67108864&&r(37,Ve=`-- Current (latest published period) status/pressure for this area, plus the simple district and
-- citywide averages at that same period -- for the portrait's "compared to district/city" claim
-- and the status chart's context lines' current-value anchor. Unweighted means, same style as the
-- citywide averages already used on /berlin/poi-map's "Citywide context" section.
with
    latest_period as (
        select max(period_yyyymm) as period_yyyymm
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr'
    ),
    district_now as (
        select
            avg(status_index) as district_avg_status_index,
            avg(dynamism_index) as district_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    ),
    city_now as (
        select
            avg(status_index) as city_avg_status_index,
            avg(dynamism_index) as city_avg_dynamism_index
        from gentriduck_marts.gentrification_index
        where
            variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
            and period_yyyymm = (select period_yyyymm from latest_period)
            and status_index is not null
    )
select
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    gi.status_index,
    gi.dynamism_index,
    d.district_avg_status_index,
    d.district_avg_dynamism_index,
    c.city_avg_status_index,
    c.city_avg_dynamism_index
from gentriduck_marts.gentrification_index as gi
cross join district_now as d
cross join city_now as c
where
    gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
    and gi.area_code = '${d.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`),s.$$.dirty[1]&240&&(ua||!vt?ua||(ia(Ve,{noResolve:ua,...Se}),r(38,vt=!0)):ia(Ve,{noResolve:ua})),s.$$.dirty[0]&67108864&&r(40,fa=P`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_year as (
        select snapshot_year, avg(status_index) as city_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
        group by snapshot_year
    )
select
    a.snapshot_year,
    a.status_index as "This area",
    d.district_avg_status_index as "District average",
    c.city_avg_status_index as "Berlin average",
    a.typology_stage
from gentriduck_marts.fct_gentrification_change as a
left join district_year as d on d.snapshot_year = a.snapshot_year
left join city_year as c on c.snapshot_year = a.snapshot_year
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
order by a.snapshot_year`),s.$$.dirty[0]&67108864&&r(41,ze=`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_year as (
        select snapshot_year, avg(status_index) as city_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
        group by snapshot_year
    )
select
    a.snapshot_year,
    a.status_index as "This area",
    d.district_avg_status_index as "District average",
    c.city_avg_status_index as "Berlin average",
    a.typology_stage
from gentriduck_marts.fct_gentrification_change as a
left join district_year as d on d.snapshot_year = a.snapshot_year
left join city_year as c on c.snapshot_year = a.snapshot_year
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
order by a.snapshot_year`),s.$$.dirty[1]&3840&&(fa||!bt?fa||(pa(ze,{noResolve:fa,...Za}),r(42,bt=!0)):pa(ze,{noResolve:fa})),s.$$.dirty[0]&67108864&&r(44,ha=P`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`),s.$$.dirty[0]&67108864&&r(45,ga=`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`),s.$$.dirty[1]&61440&&(ha||!ya?ha||($t(ga,{noResolve:ha,...Ya}),r(46,ya=!0)):$t(ga,{noResolve:ha})),s.$$.dirty[0]&67108864&&r(48,ke=P`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`),s.$$.dirty[0]&67108864&&r(49,kt=`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`),s.$$.dirty[1]&983040&&(ke||!wa?ke||(Wt(kt,{noResolve:ke,...Ge}),r(50,wa=!0)):Wt(kt,{noResolve:ke})),s.$$.dirty[0]&67108864&&r(52,Je=P`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`),s.$$.dirty[0]&67108864&&r(53,ba=`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`),s.$$.dirty[1]&15728640&&(Je||!Ce?Je||(Xa(ba,{noResolve:Je,...va}),r(54,Ce=!0)):Xa(ba,{noResolve:Je})),s.$$.dirty[0]&67108864&&r(56,Ze=P`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from district_mix order by poi_count desc limit 1) as district_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),s.$$.dirty[0]&67108864&&r(57,Le=`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from district_mix order by poi_count desc limit 1) as district_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),s.$$.dirty[1]&251658240&&(Ze||!Rt?Ze||($a(Le,{noResolve:Ze,...Ia}),r(58,Rt=!0)):$a(Le,{noResolve:Ze})),s.$$.dirty[0]&67108864&&r(60,ka=P`select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
order by oa_domain desc`),s.$$.dirty[0]&67108864&&r(61,Ra=`select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
order by oa_domain desc`),s.$$.dirty[1]&1879048192|s.$$.dirty[2]&1&&(ka||!qe?ka||(Me(Ra,{noResolve:ka,...et}),r(62,qe=!0)):Me(Ra,{noResolve:ka})),s.$$.dirty[0]&67108864&&r(64,Aa=P`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
group by poi_domain_h`),s.$$.dirty[0]&67108864&&r(65,xa=`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${d.code}'
            and oa_domain is not null
    )
group by poi_domain_h`),s.$$.dirty[2]&30&&(Aa||!Kt?Aa||(xt(xa,{noResolve:Aa,...Xe}),r(66,Kt=!0)):xt(xa,{noResolve:Aa})),s.$$.dirty[0]&67108864&&r(68,aa=P`select
    dominance_group,
    case dominance_group
        when 'gastronomy_category' then 'Gastronomy (Café / Restaurant / Fast Food)'
        when 'retail_category' then 'Retail (12 categories)'
        when 'entertainment_category' then 'Entertainment (Bar / Nightlife / Culture / Leisure)'
        when 'wellness_curated' then 'Wellness / fitness (curated cross-domain group)'
        else dominance_group
    end as group_label,
    hhi,
    top_share,
    top_child,
    top_child_offering_tier,
    n_children,
    group_stock_local,
    is_thin_base
from gentriduck_marts.mart_poi_dominance
where
    city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this section relocates from.
    and is_public_safe = true
    -- area_vintage/weight_variant pinned to avoid returning up to 4 rows per business group
    -- (mart_poi_dominance's own grain includes both) -- same current-boundary, unweighted
    -- convention used everywhere else on this site; see pages/berlin/area/bezirk/[code].md's
    -- header comment for the #298 finding this fixes (the pre-relocation /methodology-oa-modes
    -- widget did not filter either, and silently mixed vintages/weightings into one ranking).
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${d.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`),s.$$.dirty[0]&67108864&&r(69,oa=`select
    dominance_group,
    case dominance_group
        when 'gastronomy_category' then 'Gastronomy (Café / Restaurant / Fast Food)'
        when 'retail_category' then 'Retail (12 categories)'
        when 'entertainment_category' then 'Entertainment (Bar / Nightlife / Culture / Leisure)'
        when 'wellness_curated' then 'Wellness / fitness (curated cross-domain group)'
        else dominance_group
    end as group_label,
    hhi,
    top_share,
    top_child,
    top_child_offering_tier,
    n_children,
    group_stock_local,
    is_thin_base
from gentriduck_marts.mart_poi_dominance
where
    city_code = 'BER'
    -- Defence-in-depth restatement of the source-layer filter (mart_poi_dominance.sql already
    -- filters is_public_safe = true and city_code = 'BER') -- same pattern as the
    -- /methodology-oa-modes original this section relocates from.
    and is_public_safe = true
    -- area_vintage/weight_variant pinned to avoid returning up to 4 rows per business group
    -- (mart_poi_dominance's own grain includes both) -- same current-boundary, unweighted
    -- convention used everywhere else on this site; see pages/berlin/area/bezirk/[code].md's
    -- header comment for the #298 finding this fixes (the pre-relocation /methodology-oa-modes
    -- widget did not filter either, and silently mixed vintages/weightings into one ranking).
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and area_code = '${d.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${d.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`),s.$$.dirty[2]&480&&(aa||!at?aa||(Ea(oa,{noResolve:aa,...ea}),r(70,at=!0)):Ea(oa,{noResolve:aa})),s.$$.dirty[0]&67108864&&r(72,Ne=P`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`),s.$$.dirty[0]&67108864&&r(73,jt=`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`),s.$$.dirty[2]&7680&&(Ne||!Oa?Ne||(Vt(jt,{noResolve:Ne,...ja}),r(74,Oa=!0)):Vt(jt,{noResolve:Ne})),s.$$.dirty[0]&67108864&&r(76,Re=P`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
            and reference_year = (select reference_year from latest)
    ),
    city_row as (
        select
            reference_year,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'bezirk'
            and reference_year = (select reference_year from latest)
        group by reference_year
    )
select 1 as sort_order, 'Residents (Einwohner)' as indicator, cast(a.residents_total as varchar) as area_value,
    cast(round(d.residents_total) as varchar) as district_value, cast(round(c.residents_total) as varchar) as city_value
from area_row as a cross join district_row as d cross join city_row as c
union all
select 2, 'Mean age', round(a.mean_age_years, 1) || ' yrs', round(d.mean_age_years, 1) || ' yrs', round(c.mean_age_years, 1) || ' yrs'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 3, 'Female share', round(a.residents_female_share * 100, 1) || '%', round(d.residents_female_share * 100, 1) || '%', round(c.residents_female_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 4, 'Under 18', round(a.age_under18_share * 100, 1) || '%', round(d.age_under18_share * 100, 1) || '%', round(c.age_under18_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 5, '18 to under 27', round(a.age_18_27_share * 100, 1) || '%', round(d.age_18_27_share * 100, 1) || '%', round(c.age_18_27_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 6, '27 to under 45', round(a.age_27_45_share * 100, 1) || '%', round(d.age_27_45_share * 100, 1) || '%', round(c.age_27_45_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 7, '45 to under 65', round(a.age_45_65_share * 100, 1) || '%', round(d.age_45_65_share * 100, 1) || '%', round(c.age_45_65_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 8, '65 and over', round(a.age_65plus_share * 100, 1) || '%', round(d.age_65plus_share * 100, 1) || '%', round(c.age_65plus_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 9, 'Resident 5+ years at address', round(a.residence_duration_5y_share * 100, 1) || '%', round(d.residence_duration_5y_share * 100, 1) || '%', round(c.residence_duration_5y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 10, 'Resident 10+ years at address', round(a.residence_duration_10y_share * 100, 1) || '%', round(d.residence_duration_10y_share * 100, 1) || '%', round(c.residence_duration_10y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 11, 'Foreign-national share', round(a.foreigners_share * 100, 1) || '%', round(d.foreigners_share * 100, 1) || '%', round(c.foreigners_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 12, 'Migration-background share †', round(a.migration_background_share * 100, 1) || '%', round(d.migration_background_share * 100, 1) || '%', round(c.migration_background_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
order by sort_order`),s.$$.dirty[0]&67108864&&r(77,Tt=`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
            and reference_year = (select reference_year from latest)
    ),
    city_row as (
        select
            reference_year,
            sum(residents_total) as residents_total,
            sum(residents_male_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_male_share,
            sum(residents_female_share * residents_total)
            / nullif(sum(residents_total), 0) as residents_female_share,
            sum(age_under18_share * residents_total)
            / nullif(sum(residents_total), 0) as age_under18_share,
            sum(age_18_27_share * residents_total)
            / nullif(sum(residents_total), 0) as age_18_27_share,
            sum(age_27_45_share * residents_total)
            / nullif(sum(residents_total), 0) as age_27_45_share,
            sum(age_45_65_share * residents_total)
            / nullif(sum(residents_total), 0) as age_45_65_share,
            sum(age_65plus_share * residents_total)
            / nullif(sum(residents_total), 0) as age_65plus_share,
            sum(mean_age_years * residents_total)
            / nullif(sum(residents_total), 0) as mean_age_years,
            sum(foreigners_share * residents_total)
            / nullif(sum(residents_total), 0) as foreigners_share,
            sum(migration_background_share * residents_total)
            / nullif(sum(residents_total), 0) as migration_background_share,
            sum(residence_duration_5y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_5y_share,
            sum(residence_duration_10y_share * residents_total)
            / nullif(sum(residents_total), 0) as residence_duration_10y_share
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'bezirk'
            and reference_year = (select reference_year from latest)
        group by reference_year
    )
select 1 as sort_order, 'Residents (Einwohner)' as indicator, cast(a.residents_total as varchar) as area_value,
    cast(round(d.residents_total) as varchar) as district_value, cast(round(c.residents_total) as varchar) as city_value
from area_row as a cross join district_row as d cross join city_row as c
union all
select 2, 'Mean age', round(a.mean_age_years, 1) || ' yrs', round(d.mean_age_years, 1) || ' yrs', round(c.mean_age_years, 1) || ' yrs'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 3, 'Female share', round(a.residents_female_share * 100, 1) || '%', round(d.residents_female_share * 100, 1) || '%', round(c.residents_female_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 4, 'Under 18', round(a.age_under18_share * 100, 1) || '%', round(d.age_under18_share * 100, 1) || '%', round(c.age_under18_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 5, '18 to under 27', round(a.age_18_27_share * 100, 1) || '%', round(d.age_18_27_share * 100, 1) || '%', round(c.age_18_27_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 6, '27 to under 45', round(a.age_27_45_share * 100, 1) || '%', round(d.age_27_45_share * 100, 1) || '%', round(c.age_27_45_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 7, '45 to under 65', round(a.age_45_65_share * 100, 1) || '%', round(d.age_45_65_share * 100, 1) || '%', round(c.age_45_65_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 8, '65 and over', round(a.age_65plus_share * 100, 1) || '%', round(d.age_65plus_share * 100, 1) || '%', round(c.age_65plus_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 9, 'Resident 5+ years at address', round(a.residence_duration_5y_share * 100, 1) || '%', round(d.residence_duration_5y_share * 100, 1) || '%', round(c.residence_duration_5y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 10, 'Resident 10+ years at address', round(a.residence_duration_10y_share * 100, 1) || '%', round(d.residence_duration_10y_share * 100, 1) || '%', round(c.residence_duration_10y_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 11, 'Foreign-national share', round(a.foreigners_share * 100, 1) || '%', round(d.foreigners_share * 100, 1) || '%', round(c.foreigners_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
union all
select 12, 'Migration-background share †', round(a.migration_background_share * 100, 1) || '%', round(d.migration_background_share * 100, 1) || '%', round(c.migration_background_share * 100, 1) || '%'
from area_row as a cross join district_row as d cross join city_row as c
order by sort_order`),s.$$.dirty[2]&122880&&(Re||!tt?Re||(rt(Tt,{noResolve:Re,...Ba}),r(78,tt=!0)):rt(Tt,{noResolve:Re})),s.$$.dirty[0]&67108864&&r(80,Ta=P`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&67108864&&r(81,ta=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    dominant_cuisine, dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[2]&1966080&&(Ta||!Sa?Ta||(qt(ta,{noResolve:Ta,...Ie}),r(82,Sa=!0)):qt(ta,{noResolve:Ta})),s.$$.dirty[0]&67108864&&r(84,Ca=P`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[0]&67108864&&r(85,_a=`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${d.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[2]&31457280&&(Ca||!Mt?Ca||(la(_a,{noResolve:Ca,...Ae}),r(86,Mt=!0)):la(_a,{noResolve:Ca})),s.$$.dirty[0]&67108864&&r(88,qa=P`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_rent as (
        select snapshot_year, avg(est_rent_mid) as city_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER'
        group by snapshot_year
    )
select
    p.snapshot_year,
    p.brw_weighted_avg_eur_m2,
    p.est_rent_mid,
    p.est_rent_low,
    p.est_rent_high,
    d.district_avg_est_rent_mid as "District average (typical)",
    c.city_avg_est_rent_mid as "Berlin average (typical)"
from gentriduck_marts.mart_price_rent_dimension as p
left join district_rent as d on d.snapshot_year = p.snapshot_year
left join city_rent as c on c.snapshot_year = p.snapshot_year
where p.city_code = 'BER' and p.area_code = '${d.code}'
order by p.snapshot_year`),s.$$.dirty[0]&67108864&&r(89,ra=`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
        group by snapshot_year
    ),
    city_rent as (
        select snapshot_year, avg(est_rent_mid) as city_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER'
        group by snapshot_year
    )
select
    p.snapshot_year,
    p.brw_weighted_avg_eur_m2,
    p.est_rent_mid,
    p.est_rent_low,
    p.est_rent_high,
    d.district_avg_est_rent_mid as "District average (typical)",
    c.city_avg_est_rent_mid as "Berlin average (typical)"
from gentriduck_marts.mart_price_rent_dimension as p
left join district_rent as d on d.snapshot_year = p.snapshot_year
left join city_rent as c on c.snapshot_year = p.snapshot_year
where p.city_code = 'BER' and p.area_code = '${d.code}'
order by p.snapshot_year`),s.$$.dirty[2]&503316480&&(qa||!it?qa||(Ma(ra,{noResolve:qa,...st}),r(90,it=!0)):Ma(ra,{noResolve:qa})),s.$$.dirty[0]&67108864&&r(92,He=P`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`),s.$$.dirty[0]&67108864&&r(93,nt=`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`),s.$$.dirty[2]&1610612736|s.$$.dirty[3]&3&&(He||!Jt?He||(Ht(nt,{noResolve:He,...Da}),r(94,Jt=!0)):Ht(nt,{noResolve:He})),s.$$.dirty[0]&1&&r(9,a=((q=La==null?void 0:La[0])==null?void 0:q.bezirk_name)??"its district"),s.$$.dirty[0]&2&&r(109,i=mt==null?void 0:mt[0]),s.$$.dirty[3]&65536&&r(10,o=i&&i.status_index!==null&&i.status_index!==void 0),s.$$.dirty[0]&1024|s.$$.dirty[3]&65536&&r(103,u=o?`${ot()} is currently ${_t[i.stage]??`classified **${i.stage??"unclassified"}**`} ([what this does and doesn't mean](/methodology)).`:`${ot()} is classified as **uninhabited** in Berlin's official population register (no resident population) — the social-status figures on this page do not apply here.`),s.$$.dirty[0]&1536|s.$$.dirty[3]&65536&&r(102,c=(()=>{if(!o||i.district_avg_status_index==null||i.city_avg_status_index==null)return"";const D=Number(i.status_index),V=Number(i.district_avg_status_index),Oe=Number(i.city_avg_status_index),Ft=(lt,sa)=>lt<sa-.1?"less deprived than":lt>sa+.1?"more deprived than":"about the same as";return`Its social status is currently ${Ft(D,V)} the ${a} average, and ${Ft(D,Oe)} Berlin as a whole.`})()),s.$$.dirty[0]&64&&r(107,h=Array.isArray(Ye)?Ye:Array.from(Ye??[])),s.$$.dirty[3]&16384&&r(108,g=h.filter(D=>Number(D.poi_count||0)>=Si)),s.$$.dirty[3]&32768&&r(106,b=[...g].sort((D,V)=>Number(V.oa_domain)-Number(D.oa_domain)).filter(D=>Number(D.oa_domain)>=1.15).slice(0,2)),s.$$.dirty[3]&24576&&r(101,y=(()=>{if(h.length===0)return"Too few mapped places (shops, cafés, and other points of interest) are recorded here yet to describe a commercial mix.";if(b.length===0)return"Its commercial mix — the shops, cafés, and other mapped places here — doesn't lean strongly toward any particular kind, compared to Berlin as a whole.";const D=b.map(Oe=>Oe.poi_domain_h);return`Its commercial mix leans toward ${D.length===1?D[0]:`${D[0]} and ${D[1]}`} — both make up a larger share of the local mix here than they do citywide (see the Offering Advantage profile below).`})()),s.$$.dirty[0]&4&&r(104,M=na==null?void 0:na[0]),s.$$.dirty[0]&8&&r(105,$=Array.isArray(Na)?Na:Array.from(Na??[])),s.$$.dirty[0]&512|s.$$.dirty[3]&6144&&r(100,z=(()=>{if(!M||M.n_editions==null)return"No multi-edition trajectory is available yet for this area.";if(M.n_editions<=1)return"Only one social-status reading is on record for this area so far, so its pace of change can't be assessed yet.";const D=M.status_delta!=null?Math.abs(Number(M.status_delta)):null,V=D==null?"at an unclear pace":D<.4?"only gradually":D<1.2?"at a moderate pace":"quickly, moving several status steps",Oe={improving:"become less deprived",declining:"become more deprived","stable-established":"stayed consistently low-deprivation","persistently-deprived":"stayed consistently high-deprivation",mixed:"shown no single clear direction"}[M.trajectory_type]??"shown an unclassified pattern";let Ft=`Across the ${M.first_edition}–${M.last_edition} editions on record, it has ${Oe}, ${V} (trajectory confidence: ${M.trajectory_confidence}).`;const lt=$.reduce((Yt,Xt)=>Yt+Number(Xt.n||0),0),sa=$.find(Yt=>Yt.trajectory_type===M.trajectory_type);return lt>0&&sa&&(Ft+=` ${sa.n} of ${lt} other areas in ${a} with a usable trajectory show this same "${M.trajectory_type}" pattern.`),Ft})()),s.$$.dirty[3]&1920&&r(23,he=[u,c,y,z].filter(Boolean)),s.$$.dirty[0]&16&&r(99,H=Array.isArray(ge)?ge:Array.from(ge??[])),s.$$.dirty[3]&64&&r(22,O=Array.from(H.reduce((D,V)=>(D.set(V.poi_category_h,(D.get(V.poi_category_h)||0)+Number(V.poi_count||0)),D),new Map)).sort((D,V)=>V[1]-D[1]).map(([D])=>D)),s.$$.dirty[0]&32&&r(21,we=ut==null?void 0:ut[0]),s.$$.dirty[0]&64&&r(98,F=Array.isArray(Ye)?Ye:Array.from(Ye??[])),s.$$.dirty[0]&128&&r(97,L=new Map((Array.isArray(De)?De:Array.from(De??[])).map(D=>[D.poi_domain_h,Number(D.district_avg_oa_domain)]))),s.$$.dirty[3]&48&&r(8,N=F.map(D=>{const V=L.get(D.poi_domain_h);return{domain:D.poi_domain_h,pct:(Number(D.oa_domain)-1)*100,districtPct:V!=null&&!Number.isNaN(V)?(V-1)*100:null,lowBase:Number(D.poi_count||0)<jr,poiCount:D.poi_count}})),s.$$.dirty[0]&256&&r(96,da=Math.max(100,...N.map(D=>D.pct),...N.map(D=>D.districtPct??0))*1.1),s.$$.dirty[0]&256|s.$$.dirty[3]&8&&r(95,Fa=N.map(D=>({name:D.lowBase?`${D.domain} †`:D.domain,max:da,min:Zt}))),s.$$.dirty[0]&768|s.$$.dirty[3]&4&&r(20,ct={tooltip:{},radar:{indicator:Fa,splitNumber:4,axisName:{fontSize:10}},series:[{type:"radar",data:[{value:N.map(D=>D.pct),name:ot(),areaStyle:{opacity:.15}},{value:N.map(D=>D.districtPct),name:`${a} average`,lineStyle:{type:"solid",width:1},areaStyle:{opacity:0},symbol:"none"},{value:N.map(()=>0),name:"Citywide baseline (0% = Berlin average)",lineStyle:{type:"dashed",width:1},areaStyle:{opacity:0},symbol:"none"}]}]})},[La,mt,na,Na,ge,ut,Ye,De,N,a,o,Qe,Qt,Et,Bt,St,Ct,Gt,Dt,ca,ct,we,O,he,Ue,f,d,Be,Va,Ga,Ja,J,We,Ke,ma,Se,ua,Ve,vt,Za,fa,ze,bt,Ya,ha,ga,ya,Ge,ke,kt,wa,va,Je,ba,Ce,Ia,Ze,Le,Rt,et,ka,Ra,qe,Xe,Aa,xa,Kt,ea,aa,oa,at,ja,Ne,jt,Oa,Ba,Re,Tt,tt,Ie,Ta,ta,Sa,Ae,Ca,_a,Mt,st,qa,ra,it,Da,He,nt,Jt,Fa,da,L,F,H,z,y,c,u,M,$,b,h,g,i,dt]}class Zi extends Hs{constructor(t){super(),Fs(this,t,qi,Ti,Es,{data:24},null,[-1,-1,-1,-1,-1])}}export{Zi as component};
