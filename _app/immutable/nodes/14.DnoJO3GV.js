import{s as Ds,d as _,x as Hs,w as Oe,i as l,a as O,b as C,c as y,h as Fs,e as x,f as Er,g as be,j as k,k as D,l as w,m as E,t as R,n as as,o as As,p as Is,q as Os,r as Ps,u as Ee,v as Us,H as Qs}from"../chunks/scheduler.wXRIqz25.js";import{S as Ws,i as Ks,d as j,t as f,a as u,c as J,m as B,b as T,e as S,g as Z}from"../chunks/index.uz5rP6Z2.js";import{e as ts}from"../chunks/each.nHEApTB1.js";import{A as Vs,P as Gs}from"../chunks/PageTitle.X8fTilZx.js";import{A as Js}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Zs}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Ys}from"../chunks/Hero.C0o6T8tj.js";import{S as Xs}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as ei}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as xr,C as xe}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as Ms,w as ai}from"../chunks/entry.DotynpIs.js";import{A as ut}from"../chunks/Alert.DFISYc09.js";import{e as ti,s as ri,Q as qe,p as si,a as rs,r as ss,C as ii}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as I}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as ni}from"../chunks/stores.DJGNasUV.js";import{Q as Le}from"../chunks/QueryViewer.RFckNDEV.js";import{B as oi,E as _i}from"../chunks/BarChart.Cy9nf948.js";import{B as fr}from"../chunks/BigValue.Bpt9v-UH.js";import{L as is}from"../chunks/LineChart.DDKWAAFN.js";import{p as li}from"../chunks/profile.BW8tN6E9.js";function ns(s,t,r){const a=s.slice();return a[144]=t[r],a}function ci(s){var i;let t,r=(H.title??((i=H.og)==null?void 0:i.title))+"",a;return{c(){t=E("h1"),a=R(r),this.h()},l(o){t=x(o,"H1",{class:!0});var d=be(t);a=k(d,r),d.forEach(_),this.h()},h(){C(t,"class","title")},m(o,d){l(o,t,d),O(t,a)},p:Ee,d(o){o&&_(t)}}}function di(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:Ee,p:Ee,d:Ee}}function mi(s){var d;let t,r,a,i,o;return document.title=t=H.title??((d=H.og)==null?void 0:d.title),{c(){r=w(),a=E("meta"),i=w(),o=E("meta"),this.h()},l(c){r=y(c),a=x(c,"META",{property:!0,content:!0}),i=y(c),o=x(c,"META",{name:!0,content:!0}),this.h()},h(){var c,h;C(a,"property","og:title"),C(a,"content",((c=H.og)==null?void 0:c.title)??H.title),C(o,"name","twitter:title"),C(o,"content",((h=H.og)==null?void 0:h.title)??H.title)},m(c,h){l(c,r,h),l(c,a,h),l(c,i,h),l(c,o,h)},p(c,h){var g;h&0&&t!==(t=H.title??((g=H.og)==null?void 0:g.title))&&(document.title=t)},d(c){c&&(_(r),_(a),_(i),_(o))}}}function ui(s){var o,d;let t,r,a=(H.description||((o=H.og)==null?void 0:o.description))&&fi(),i=((d=H.og)==null?void 0:d.image)&&pi();return{c(){a&&a.c(),t=w(),i&&i.c(),r=Er()},l(c){a&&a.l(c),t=y(c),i&&i.l(c),r=Er()},m(c,h){a&&a.m(c,h),l(c,t,h),i&&i.m(c,h),l(c,r,h)},p(c,h){var g,b;(H.description||(g=H.og)!=null&&g.description)&&a.p(c,h),(b=H.og)!=null&&b.image&&i.p(c,h)},d(c){c&&(_(t),_(r)),a&&a.d(c),i&&i.d(c)}}}function fi(s){let t,r,a,i,o;return{c(){t=E("meta"),r=w(),a=E("meta"),i=w(),o=E("meta"),this.h()},l(d){t=x(d,"META",{name:!0,content:!0}),r=y(d),a=x(d,"META",{property:!0,content:!0}),i=y(d),o=x(d,"META",{name:!0,content:!0}),this.h()},h(){var d,c,h;C(t,"name","description"),C(t,"content",H.description??((d=H.og)==null?void 0:d.description)),C(a,"property","og:description"),C(a,"content",((c=H.og)==null?void 0:c.description)??H.description),C(o,"name","twitter:description"),C(o,"content",((h=H.og)==null?void 0:h.description)??H.description)},m(d,c){l(d,t,c),l(d,r,c),l(d,a,c),l(d,i,c),l(d,o,c)},p:Ee,d(d){d&&(_(t),_(r),_(a),_(i),_(o))}}}function pi(s){let t,r,a;return{c(){t=E("meta"),r=w(),a=E("meta"),this.h()},l(i){t=x(i,"META",{property:!0,content:!0}),r=y(i),a=x(i,"META",{name:!0,content:!0}),this.h()},h(){var i,o;C(t,"property","og:image"),C(t,"content",rs((i=H.og)==null?void 0:i.image)),C(a,"name","twitter:image"),C(a,"content",rs((o=H.og)==null?void 0:o.image))},m(i,o){l(i,t,o),l(i,r,o),l(i,a,o)},p:Ee,d(i){i&&(_(t),_(r),_(a))}}}function os(s){let t,r;return t=new Le({props:{queryID:"area_info",queryResult:s[0]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function _s(s){let t,r;return t=new Le({props:{queryID:"district_info",queryResult:s[1]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function ls(s){let t,r;return t=new Le({props:{queryID:"context_current",queryResult:s[2]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function hi(s){let t,r="Bezirksregion profile";return{c(){t=E("a"),t.textContent=r,this.h()},l(a){t=x(a,"A",{href:!0,"data-svelte-h":!0}),D(t)!=="svelte-9htoed"&&(t.textContent=r),this.h()},h(){C(t,"href","/gentriduck/berlin/area/bezirk")},m(a,i){l(a,t,i)},p:Ee,d(a){a&&_(t)}}}function gi(s){let t,r,a;return{c(){t=E("a"),r=R("Bezirksregion profile"),this.h()},l(i){t=x(i,"A",{href:!0});var o=be(t);r=k(o,"Bezirksregion profile"),o.forEach(_),this.h()},h(){C(t,"href",a="/gentriduck/berlin/area/bzr/"+s[0][0].bzr_code)},m(i,o){l(i,t,o),O(t,r)},p(i,o){o[0]&1&&a!==(a="/gentriduck/berlin/area/bzr/"+i[0][0].bzr_code)&&C(t,"href",a)},d(i){i&&_(t)}}}function cs(s){let t,r,a=s[144]+"";return{c(){t=E("p"),r=new Qs(!1),this.h()},l(i){t=x(i,"P",{});var o=be(t);r=Us(o,!1),o.forEach(_),this.h()},h(){r.a=null},m(i,o){l(i,t,o),r.m(a,t)},p(i,o){o[0]&16777216&&a!==(a=i[144]+"")&&r.p(a)},d(i){i&&_(t)}}}function yi(s){let t,r="How to read the charts:",a,i,o="1 = least deprived",d,c,h="4 = most deprived",g,b,v="falling",M,$,F="less",Q,q,A="methodology & data sources",G;return{c(){t=E("b"),t.textContent=r,a=R(" official status runs "),i=E("b"),i.textContent=o,d=R(` to
  `),c=E("b"),c.textContent=h,g=R(", so a "),b=E("b"),b.textContent=v,M=R(" status line means the area became "),$=E("b"),$.textContent=F,Q=R(` deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the `),q=E("a"),q.textContent=A,G=R(` page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).`),this.h()},l(N){t=x(N,"B",{"data-svelte-h":!0}),D(t)!=="svelte-js88l3"&&(t.textContent=r),a=k(N," official status runs "),i=x(N,"B",{"data-svelte-h":!0}),D(i)!=="svelte-1bcgix4"&&(i.textContent=o),d=k(N,` to
  `),c=x(N,"B",{"data-svelte-h":!0}),D(c)!=="svelte-1cr3k8t"&&(c.textContent=h),g=k(N,", so a "),b=x(N,"B",{"data-svelte-h":!0}),D(b)!=="svelte-164rnor"&&(b.textContent=v),M=k(N," status line means the area became "),$=x(N,"B",{"data-svelte-h":!0}),D($)!=="svelte-u149sn"&&($.textContent=F),Q=k(N,` deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the `),q=x(N,"A",{href:!0,"data-svelte-h":!0}),D(q)!=="svelte-3zcnok"&&(q.textContent=A),G=k(N,` page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).`),this.h()},h(){C(q,"href","/gentriduck/methodology")},m(N,P){l(N,t,P),l(N,a,P),l(N,i,P),l(N,d,P),l(N,c,P),l(N,g,P),l(N,b,P),l(N,M,P),l(N,$,P),l(N,Q,P),l(N,q,P),l(N,G,P)},p:Ee,d(N){N&&(_(t),_(a),_(i),_(d),_(c),_(g),_(b),_(M),_($),_(Q),_(q),_(G))}}}function ds(s){let t,r;return t=new Le({props:{queryID:"area_trend",queryResult:s[13]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&8192&&(o.queryResult=a[13]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function ms(s){let t,r;return t=new Le({props:{queryID:"trajectory_summary",queryResult:s[3]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function us(s){let t,r;return t=new Le({props:{queryID:"district_trajectory_mix",queryResult:s[4]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function wi(s){let t,r;return t=new ut({props:{status:"info",$$slots:{default:[$i]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function vi(s){let t,r;return t=new ut({props:{status:"info",$$slots:{default:[ki]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function bi(s){let t,r,a,i;return t=new fr({props:{data:s[2],value:"stage_label",title:"Current stage"}}),a=new fr({props:{data:s[2],value:"status_trend",title:"Status trend"}}),{c(){S(t.$$.fragment),r=w(),S(a.$$.fragment)},l(o){T(t.$$.fragment,o),r=y(o),T(a.$$.fragment,o)},m(o,d){B(t,o,d),l(o,r,d),B(a,o,d),i=!0},p(o,d){const c={};d[0]&4&&(c.data=o[2]),t.$set(c);const h={};d[0]&4&&(h.data=o[2]),a.$set(h)},i(o){i||(u(t.$$.fragment,o),u(a.$$.fragment,o),i=!0)},o(o){f(t.$$.fragment,o),f(a.$$.fragment,o),i=!1},d(o){o&&_(r),j(t,o),j(a,o)}}}function $i(s){let t;return{c(){t=R(`No stage on record: Berlin's latest social-monitoring edition gives this planning area no status
  classification, so no current stage applies here.`)},l(r){t=k(r,`No stage on record: Berlin's latest social-monitoring edition gives this planning area no status
  classification, so no current stage applies here.`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function ki(s){let t;return{c(){t=R(`This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.`)},l(r){t=k(r,`This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function fs(s){let t,r;return t=new Le({props:{queryID:"poi_trend",queryResult:s[5]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function ps(s){let t,r;return t=new Le({props:{queryID:"poi_mix_context",queryResult:s[6]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function hs(s){let t,r,a=s[22].snapshot_year+"",i,o,d,c=s[22].area_top_category+"",h,g,b,v,M,$=(s[22].district_top_category??"—")+"",F,Q,q,A=(s[22].city_top_category??"—")+"",G,N;return{c(){t=E("p"),r=R("The most common kind of mapped place here in "),i=R(a),o=R(" is "),d=E("b"),h=R(c),g=R(`;
across `),b=R(s[10]),v=R(" it's "),M=E("b"),F=R($),Q=R(`, and across Berlin as a whole
it's `),q=E("b"),G=R(A),N=R(".")},l(P){t=x(P,"P",{});var U=be(t);r=k(U,"The most common kind of mapped place here in "),i=k(U,a),o=k(U," is "),d=x(U,"B",{});var bt=be(d);h=k(bt,c),bt.forEach(_),g=k(U,`;
across `),b=k(U,s[10]),v=k(U," it's "),M=x(U,"B",{});var Ta=be(M);F=k(Ta,$),Ta.forEach(_),Q=k(U,`, and across Berlin as a whole
it's `),q=x(U,"B",{});var Pe=be(q);G=k(Pe,A),Pe.forEach(_),N=k(U,"."),U.forEach(_)},m(P,U){l(P,t,U),O(t,r),O(t,i),O(t,o),O(t,d),O(d,h),O(t,g),O(t,b),O(t,v),O(t,M),O(M,F),O(t,Q),O(t,q),O(q,G),O(t,N)},p(P,U){U[0]&4194304&&a!==(a=P[22].snapshot_year+"")&&Oe(i,a),U[0]&4194304&&c!==(c=P[22].area_top_category+"")&&Oe(h,c),U[0]&1024&&Oe(b,P[10]),U[0]&4194304&&$!==($=(P[22].district_top_category??"—")+"")&&Oe(F,$),U[0]&4194304&&A!==(A=(P[22].city_top_category??"—")+"")&&Oe(G,A)},d(P){P&&_(t)}}}function gs(s){let t,r;return t=new Le({props:{queryID:"poi_oa_radar",queryResult:s[7]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function ys(s){let t,r;return t=new Le({props:{queryID:"poi_oa_radar_district",queryResult:s[8]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Ri(s){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[Ei]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function xi(s){let t,r;return t=new _i({props:{config:s[21],data:s[7],height:"360px",downloadableData:!0,downloadableImage:!0}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&2097152&&(o.config=a[21]),i[0]&128&&(o.data=a[7]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Ei(s){let t;return{c(){t=R(`No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).`)},l(r){t=k(r,`No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function ws(s){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[ji]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&512|i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function ji(s){let t,r,a="†",i,o,d,c=s[9].filter(Cs).map(qs).join(", ")+"",h,g;return{c(){t=R("Domains marked "),r=E("b"),r.textContent=a,i=R(" are based on very few mapped places here (fewer than "),o=R(zr),d=R(`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),h=R(c),g=R(".")},l(b){t=k(b,"Domains marked "),r=x(b,"B",{"data-svelte-h":!0}),D(r)!=="svelte-yahvc0"&&(r.textContent=a),i=k(b," are based on very few mapped places here (fewer than "),o=k(b,zr),d=k(b,`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),h=k(b,c),g=k(b,".")},m(b,v){l(b,t,v),l(b,r,v),l(b,i,v),l(b,o,v),l(b,d,v),l(b,h,v),l(b,g,v)},p(b,v){v[0]&512&&c!==(c=b[9].filter(Cs).map(qs).join(", ")+"")&&Oe(h,c)},d(b){b&&(_(t),_(r),_(i),_(o),_(d),_(h),_(g))}}}function vs(s){let t,r;return t=new Le({props:{queryID:"dominance_area",queryResult:s[14]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&16384&&(o.queryResult=a[14]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Bi(s){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[Si]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Ti(s){let t,r;return t=new xr({props:{data:s[14].filter(Ls),rows:"4",emptySet:"warn",emptyMessage:"No within-group dominance data for this area.",$$slots:{default:[Ci]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&16384&&(o.data=a[14].filter(Ls)),i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Si(s){let t;return{c(){t=R(`No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).`)},l(r){t=k(r,`No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).`)},m(r,a){l(r,t,a)},d(r){r&&_(t)}}}function Ci(s){let t,r,a,i,o,d,c,h,g,b,v,M;return t=new xe({props:{id:"group_label",title:"Business group"}}),a=new xe({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new xe({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),c=new xe({props:{id:"top_child",title:"Leading type"}}),g=new xe({props:{id:"n_children",title:"Types in this group here"}}),v=new xe({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){S(t.$$.fragment),r=w(),S(a.$$.fragment),i=w(),S(o.$$.fragment),d=w(),S(c.$$.fragment),h=w(),S(g.$$.fragment),b=w(),S(v.$$.fragment)},l($){T(t.$$.fragment,$),r=y($),T(a.$$.fragment,$),i=y($),T(o.$$.fragment,$),d=y($),T(c.$$.fragment,$),h=y($),T(g.$$.fragment,$),b=y($),T(v.$$.fragment,$)},m($,F){B(t,$,F),l($,r,F),B(a,$,F),l($,i,F),B(o,$,F),l($,d,F),B(c,$,F),l($,h,F),B(g,$,F),l($,b,F),B(v,$,F),M=!0},p:Ee,i($){M||(u(t.$$.fragment,$),u(a.$$.fragment,$),u(o.$$.fragment,$),u(c.$$.fragment,$),u(g.$$.fragment,$),u(v.$$.fragment,$),M=!0)},o($){f(t.$$.fragment,$),f(a.$$.fragment,$),f(o.$$.fragment,$),f(c.$$.fragment,$),f(g.$$.fragment,$),f(v.$$.fragment,$),M=!1},d($){$&&(_(r),_(i),_(d),_(h),_(b)),j(t,$),j(a,$),j(o,$),j(c,$),j(g,$),j(v,$)}}}function bs(s){let t,r;return t=new ut({props:{status:"info",$$slots:{default:[qi]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&16384|i[4]&8388608&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function qi(s){let t=s[14].filter(zs).length+"",r,a,i=s[14].length+"",o,d;return{c(){r=R(t),a=R(" of "),o=R(i),d=R(` business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."`)},l(c){r=k(c,t),a=k(c," of "),o=k(c,i),d=k(c,` business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."`)},m(c,h){l(c,r,h),l(c,a,h),l(c,o,h),l(c,d,h)},p(c,h){h[0]&16384&&t!==(t=c[14].filter(zs).length+"")&&Oe(r,t),h[0]&16384&&i!==(i=c[14].length+"")&&Oe(o,i)},d(c){c&&(_(r),_(a),_(o),_(d))}}}function $s(s){let t,r;return t=new Le({props:{queryID:"demographics_current",queryResult:s[15]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&32768&&(o.queryResult=a[15]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function ks(s){let t,r;return t=new Le({props:{queryID:"demographics_table",queryResult:s[16]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&65536&&(o.queryResult=a[16]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Li(s){let t;return{c(){t=R("No population-register data is available for this area yet.")},l(r){t=k(r,"No population-register data is available for this area yet.")},m(r,a){l(r,t,a)},p:Ee,d(r){r&&_(t)}}}function zi(s){let t,r,a=s[15][0].reference_year+"",i,o,d,c=(s[15][0].residents_total!=null?Math.round(s[15][0].residents_total).toLocaleString():"—")+"",h,g;return{c(){t=R("As of the "),r=E("b"),i=R(a),o=R(` EWR register (population statistics), this area has
`),d=E("b"),h=R(c),g=R(` registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.`)},l(b){t=k(b,"As of the "),r=x(b,"B",{});var v=be(r);i=k(v,a),v.forEach(_),o=k(b,` EWR register (population statistics), this area has
`),d=x(b,"B",{});var M=be(d);h=k(M,c),M.forEach(_),g=k(b,` registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.`)},m(b,v){l(b,t,v),l(b,r,v),O(r,i),l(b,o,v),l(b,d,v),O(d,h),l(b,g,v)},p(b,v){v[0]&32768&&a!==(a=b[15][0].reference_year+"")&&Oe(i,a),v[0]&32768&&c!==(c=(b[15][0].residents_total!=null?Math.round(b[15][0].residents_total).toLocaleString():"—")+"")&&Oe(h,c)},d(b){b&&(_(t),_(r),_(o),_(d),_(g))}}}function Rs(s){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[Mi]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Mi(s){let t,r,a="approximate",i;return{c(){t=R(`One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as `),r=E("b"),r.textContent=a,i=R(`,
  not exact counts.`)},l(o){t=k(o,`One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as `),r=x(o,"B",{"data-svelte-h":!0}),D(r)!=="svelte-1ajqvq2"&&(r.textContent=a),i=k(o,`,
  not exact counts.`)},m(o,d){l(o,t,d),l(o,r,d),l(o,i,d)},p:Ee,d(o){o&&(_(t),_(r),_(i))}}}function Ni(s){let t,r,a,i,o,d,c,h;return t=new xe({props:{id:"indicator",title:"Indicator"}}),a=new xe({props:{id:"area_value",title:"This area"}}),o=new xe({props:{id:"district_value",title:"District average"}}),c=new xe({props:{id:"city_value",title:"Berlin average"}}),{c(){S(t.$$.fragment),r=w(),S(a.$$.fragment),i=w(),S(o.$$.fragment),d=w(),S(c.$$.fragment)},l(g){T(t.$$.fragment,g),r=y(g),T(a.$$.fragment,g),i=y(g),T(o.$$.fragment,g),d=y(g),T(c.$$.fragment,g)},m(g,b){B(t,g,b),l(g,r,b),B(a,g,b),l(g,i,b),B(o,g,b),l(g,d,b),B(c,g,b),h=!0},p:Ee,i(g){h||(u(t.$$.fragment,g),u(a.$$.fragment,g),u(o.$$.fragment,g),u(c.$$.fragment,g),h=!0)},o(g){f(t.$$.fragment,g),f(a.$$.fragment,g),f(o.$$.fragment,g),f(c.$$.fragment,g),h=!1},d(g){g&&(_(r),_(i),_(d)),j(t,g),j(a,g),j(o,g),j(c,g)}}}function xs(s){let t,r;return t=new Le({props:{queryID:"amenities_current",queryResult:s[17]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&131072&&(o.queryResult=a[17]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Es(s){let t,r;return t=new Le({props:{queryID:"amenities_table",queryResult:s[18]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&262144&&(o.queryResult=a[18]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Di(s){let t;return{c(){t=R("No amenity data is available for this area yet.")},l(r){t=k(r,"No amenity data is available for this area yet.")},m(r,a){l(r,t,a)},p:Ee,d(r){r&&_(t)}}}function Hi(s){let t,r,a=s[17][0].snapshot_year+"",i,o;return{c(){t=R("Based on OpenStreetMap tagging as of "),r=E("b"),i=R(a),o=R(`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(d){t=k(d,"Based on OpenStreetMap tagging as of "),r=x(d,"B",{});var c=be(r);i=k(c,a),c.forEach(_),o=k(d,`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(d,c){l(d,t,c),l(d,r,c),O(r,i),l(d,o,c)},p(d,c){c[0]&131072&&a!==(a=d[17][0].snapshot_year+"")&&Oe(i,a)},d(d){d&&(_(t),_(r),_(o))}}}function Fi(s){let t,r,a,i,o,d;return t=new xe({props:{id:"indicator",title:"Infrastructure"}}),a=new xe({props:{id:"area_value",title:"This area"}}),o=new xe({props:{id:"district_value",title:"District total"}}),{c(){S(t.$$.fragment),r=w(),S(a.$$.fragment),i=w(),S(o.$$.fragment)},l(c){T(t.$$.fragment,c),r=y(c),T(a.$$.fragment,c),i=y(c),T(o.$$.fragment,c)},m(c,h){B(t,c,h),l(c,r,h),B(a,c,h),l(c,i,h),B(o,c,h),d=!0},p:Ee,i(c){d||(u(t.$$.fragment,c),u(a.$$.fragment,c),u(o.$$.fragment,c),d=!0)},o(c){f(t.$$.fragment,c),f(a.$$.fragment,c),f(o.$$.fragment,c),d=!1},d(c){c&&(_(r),_(i)),j(t,c),j(a,c),j(o,c)}}}function Ai(s){let t,r,a="0",i,o,d="open-data",c;return{c(){t=R("These figures come from OpenStreetMap tagging, not an official registry. A "),r=E("b"),r.textContent=a,i=R(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=E("a"),o.textContent=d,c=R(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(h){t=k(h,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=x(h,"B",{"data-svelte-h":!0}),D(r)!=="svelte-12bhsds"&&(r.textContent=a),i=k(h,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=x(h,"A",{href:!0,"data-svelte-h":!0}),D(o)!=="svelte-1jijq3i"&&(o.textContent=d),c=k(h,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){C(o,"href","/gentriduck/open-data")},m(h,g){l(h,t,g),l(h,r,g),l(h,i,g),l(h,o,g),l(h,c,g)},p:Ee,d(h){h&&(_(t),_(r),_(i),_(o),_(c))}}}function Ii(s){let t;return{c(){t=R(`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=k(r,`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){l(r,t,a)},p:Ee,d(r){r&&_(t)}}}function Oi(s){let t,r,a=s[17][0].gastro_poi_with_cuisine_count+"",i,o;return{c(){t=R("Cuisine is tagged for "),r=E("b"),i=R(a),o=R(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(d){t=k(d,"Cuisine is tagged for "),r=x(d,"B",{});var c=be(r);i=k(c,a),c.forEach(_),o=k(d,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(d,c){l(d,t,c),l(d,r,c),O(r,i),l(d,o,c)},p(d,c){c[0]&131072&&a!==(a=d[17][0].gastro_poi_with_cuisine_count+"")&&Oe(i,a)},d(d){d&&(_(t),_(r),_(o))}}}function Pi(s){let t,r,a=s[17][0].gastro_poi_with_cuisine_count+"",i,o,d,c="most common cuisine",h,g,b=s[17][0].dominant_cuisine+"",v,M,$=Math.round(s[17][0].dominant_cuisine_share*100)+"",F,Q;return{c(){t=R("Among "),r=E("b"),i=R(a),o=R(` restaurants/cafes with cuisine
data tagged in this area, the `),d=E("b"),d.textContent=c,h=R(` is
`),g=E("b"),v=R(b),M=R(`
(`),F=R($),Q=R("% of cuisine-tagged restaurants/cafes).")},l(q){t=k(q,"Among "),r=x(q,"B",{});var A=be(r);i=k(A,a),A.forEach(_),o=k(q,` restaurants/cafes with cuisine
data tagged in this area, the `),d=x(q,"B",{"data-svelte-h":!0}),D(d)!=="svelte-1floooe"&&(d.textContent=c),h=k(q,` is
`),g=x(q,"B",{});var G=be(g);v=k(G,b),G.forEach(_),M=k(q,`
(`),F=k(q,$),Q=k(q,"% of cuisine-tagged restaurants/cafes).")},m(q,A){l(q,t,A),l(q,r,A),O(r,i),l(q,o,A),l(q,d,A),l(q,h,A),l(q,g,A),O(g,v),l(q,M,A),l(q,F,A),l(q,Q,A)},p(q,A){A[0]&131072&&a!==(a=q[17][0].gastro_poi_with_cuisine_count+"")&&Oe(i,a),A[0]&131072&&b!==(b=q[17][0].dominant_cuisine+"")&&Oe(v,b),A[0]&131072&&$!==($=Math.round(q[17][0].dominant_cuisine_share*100)+"")&&Oe(F,$)},d(q){q&&(_(t),_(r),_(o),_(d),_(h),_(g),_(M),_(F),_(Q))}}}function Ui(s){let t,r,a="methodology page",i;return{c(){t=R(`These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  `),r=E("a"),r.textContent=a,i=R(" for what they measure and their caveats."),this.h()},l(o){t=k(o,`These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  `),r=x(o,"A",{href:!0,"data-svelte-h":!0}),D(r)!=="svelte-1l2pw3"&&(r.textContent=a),i=k(o," for what they measure and their caveats."),this.h()},h(){C(r,"href","/gentriduck/methodology")},m(o,d){l(o,t,d),l(o,r,d),l(o,i,d)},p:Ee,d(o){o&&(_(t),_(r),_(i))}}}function js(s){let t,r;return t=new Le({props:{queryID:"price_rent",queryResult:s[19]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&524288&&(o.queryResult=a[19]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Qi(s){let t,r,a,i,o,d,c,h,g,b;return t=new xe({props:{id:"snapshot_year",title:"Year"}}),a=new xe({props:{id:"brw_weighted_avg_eur_m2",title:"Land value, EUR/m² (Bodenrichtwert)"}}),o=new xe({props:{id:"est_rent_mid",title:"Estimated rent, typical (EUR/m²)"}}),c=new xe({props:{id:"est_rent_low",title:"Estimated rent, low (EUR/m²)"}}),g=new xe({props:{id:"est_rent_high",title:"Estimated rent, high (EUR/m²)"}}),{c(){S(t.$$.fragment),r=w(),S(a.$$.fragment),i=w(),S(o.$$.fragment),d=w(),S(c.$$.fragment),h=w(),S(g.$$.fragment)},l(v){T(t.$$.fragment,v),r=y(v),T(a.$$.fragment,v),i=y(v),T(o.$$.fragment,v),d=y(v),T(c.$$.fragment,v),h=y(v),T(g.$$.fragment,v)},m(v,M){B(t,v,M),l(v,r,M),B(a,v,M),l(v,i,M),B(o,v,M),l(v,d,M),B(c,v,M),l(v,h,M),B(g,v,M),b=!0},p:Ee,i(v){b||(u(t.$$.fragment,v),u(a.$$.fragment,v),u(o.$$.fragment,v),u(c.$$.fragment,v),u(g.$$.fragment,v),b=!0)},o(v){f(t.$$.fragment,v),f(a.$$.fragment,v),f(o.$$.fragment,v),f(c.$$.fragment,v),f(g.$$.fragment,v),b=!1},d(v){v&&(_(r),_(i),_(d),_(h)),j(t,v),j(a,v),j(o,v),j(c,v),j(g,v)}}}function Bs(s){let t,r;return t=new Le({props:{queryID:"minimap_areas",queryResult:s[20]}}),{c(){S(t.$$.fragment)},l(a){T(t.$$.fragment,a)},m(a,i){B(t,a,i),r=!0},p(a,i){const o={};i[0]&1048576&&(o.queryResult=a[20]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){f(t.$$.fragment,a),r=!1},d(a){j(t,a)}}}function Wi(s){var Vr;let t,r,a,i,o,d,c,h,g,b,v,M,$,F,Q,q,A,G,N="district browse",P,U,bt="all districts",Ta,Pe,ze,ft=(s[0][0]?s[0][0].area_name:"This area")+"",$t,Yt,pt,Pa,Ve,p='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Kt,Sa,Vt,kt,W,m,Me,Ua=`District and city lines are the simple average across all Planungsräume in the same Bezirk /
across Berlin at each edition — context, not a target.`,Qa,je,Wa,Ne,Y,Ge,Je,Ca,ua,Rt,De,fa,na,qa,La,xt,He,Ka=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,Va,oa,Xt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Et,Be,Ga='<a href="#how-its-commercial-mix-has-developed">How its commercial mix has developed</a>',Ja,Ue,er=`Shops, cafés and other businesses tend to <em class="markdown">follow</em> — not lead — social change (see
<a href="/gentriduck/methodology" class="markdown">methodology</a> for the theory). This shows how the mix of mapped places here has
evolved.`,jt,Ze,Ye,Xe,za,Za,_a,Ya='<a href="#offering-advantage-profile">Offering Advantage profile</a>',pa,ea,ht=`<strong class="markdown">Offering Advantage (OA)</strong> compares each POI domain&#39;s share of this area&#39;s mapped places (shops,
cafés, and other points of interest) to that domain&#39;s share across Berlin as a whole — a
compositional read on the local place <em class="markdown">mix</em>, not a count, and not a value judgment: being
over-represented in a domain doesn&#39;t mean an area is &quot;better&quot; or &quot;worse,&quot; only that its commercial
mix is more specialised in that direction than the city as a whole. The chart below shows each
domain as a <strong class="markdown">percentage above or below Berlin&#39;s citywide average share</strong> for that domain — e.g.
&quot;+30%&quot; means this domain makes up about 30% more of the local mix here than it does citywide on
average; a <strong class="markdown">negative</strong> percentage means the opposite, under-representation, shown the same way.
OA is one input among several into the governed index (see <a href="/gentriduck/methodology" class="markdown">methodology</a>), never a
standalone gentrification score on its own — and vacancy (if shown) marks the <em class="markdown">opposite</em> pole from
the others, a pre-reinvestment signal. A higher Offering Advantage value is not, on its own, a sign
of more gentrification. See the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> to explore this across all of Berlin.`,Bt,Xa,aa,X,$e,la,Gt=s[9].some(Ss),et,Te,at='<a href="#within-group-dominance">Within-group dominance</a>',tt,ke,ar=`<strong class="markdown">Within-group dominance</strong> asks a different question from Offering Advantage: within a curated
group of businesses, is one type dominating, or is the mix diverse? (&quot;Are fast-food places crowding
out sit-down restaurants within gastronomy?&quot;) The figures below are <strong class="markdown">sign-blind</strong> — a high
concentration reading says only that this area&#39;s mix is concentrated in the named leading type,
never whether that is an up-market or down-market shift; read it alongside the status/trajectory
section above, never in isolation. See the <a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> §5
for the full methodology, ethics note, and why cuisine-typed dominance never appears on any public
page (this table included). Where two or more types have exactly the same top share, the table
names the alphabetically first one; such a tie means that no single type leads, not that the named
type dominates.`,Tt,ta,ha,Re,we,rt,Jt=s[14].some(Ts),ra,Se,St='<a href="#people--structure">People &amp; structure</a>',Ct,st,it,Qe,ga,ya,wa,qt,Ma,nt=`† <b>Migration-background share</b> uses a Mikrozensus definition that changed around 2017 —
figures from before 2017 are present in the underlying data but are <b>not directly comparable</b>
to 2017-and-later figures. This page shows only the current-vintage snapshot above; do not compare
this row across years without checking the vintage.`,va,ca,tr=`Both the foreign-national and migration-background shares above are shown only as plain rows in
this table, alongside the area's full age and residence-duration profile — this page never ranks
or sorts areas by either figure, and makes no claim about whether a change in either is good or bad
for the neighbourhood.`,Lt,da,ot='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',ba,$a,_t,Na,zt,Fe,ka,sa,Mt,Da,Nt,We,lt=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,ct,ma,rr='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',Dt,Ae,Ra,xa,Ea,Ht,ja,gt,Ha,pr='<a href="#where-this-area-sits">Where this area sits</a>',sr,L,ia,z,K,Ft=`This is Berlin's finest published small-area grain (Planungsraum) — there is no further level to
drill into. See the Bezirksregion link above ("Up:") to zoom back out.`,dt,Ke,At='<a href="#honest-caveats">Honest caveats</a>',It,mt,Mr=`<li class="markdown"><strong class="markdown">A falling status line means the area became <em class="markdown">less</em> deprived</strong> (its status rose) — which is
also the signature of gentrification, not automatically good news for existing residents.</li> <li class="markdown"><strong class="markdown">The portrait&#39;s stage, comparison, and pace sentences are display-layer wording over already-
published mart figures</strong> — no new indicator, weight, or normalization is introduced by this page.</li> <li class="markdown"><strong class="markdown">Offering Advantage is descriptive, not causal, and multi-signed</strong> — over- or under-representation
in a domain is a mix/specialization signal, never a standalone claim about gentrification, and
domains do not all point the same direction (vacancy is the opposite pole from amenity domains).</li> <li class="markdown"><strong class="markdown">Very small POI bases produce noisy percentages</strong> — domains flagged † above are based on fewer
than 5 mapped places in this area and should be read cautiously.</li> <li class="markdown"><strong class="markdown">Land value and estimated rent are official reference values, not observed transaction prices.</strong></li> <li class="markdown">Figures are on Berlin&#39;s <strong class="markdown">current (2021+) boundaries</strong> and the live social-monitoring editions
(2021–2025) only — this page does not show the pre-2021 <code class="markdown">standard</code> variant.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,hr,yt,Nr='<a href="#further-reading">Further reading</a>',gr,Ot,Dr=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means, the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> for this area&#39;s commercial-mix signal citywide
(including a &quot;citywide context&quot; section for these same signals across all of Berlin),
<a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a> for other neighbourhoods, or the
<a href="/gentriduck/berlin/time-series" class="markdown">time-series view</a> for how the whole city has moved.`,yr,cr,wr,Zt,dr,wt=typeof H<"u"&&(H.title||((Vr=H.og)==null?void 0:Vr.title))&&H.hide_title!==!0&&ci();function Ns(e,n){var V;return typeof H<"u"&&(H.title||(V=H.og)!=null&&V.title)?mi:di}let mr=Ns()(s),vt=typeof H=="object"&&ui(),ee=s[0]&&os(s),ae=s[1]&&_s(s),te=s[2]&&ls(s);g=new Vs({props:{crumbs:s[26]}}),v=new Gs({props:{title:s[25]}}),$=new Ys({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence · most granular",title:s[0][0]?s[0][0].area_name:"Neighbourhood",lede:"Status trajectory, commercial-mix development, Offering Advantage, and land value/rent for one Berlin Planungsraum."}});function Hr(e,n){var V;return(V=e[0][0])!=null&&V.bzr_code?gi:hi}let vr=Hr(s),Fa=vr(s),ir=ts(s[24]),Ce=[];for(let e=0;e<ir.length;e+=1)Ce[e]=cs(ns(s,ir,e));Sa=new ut({props:{status:"info",$$slots:{default:[yi]},$$scope:{ctx:s}}});let re=s[13]&&ds(s);W=new is({props:{data:s[13],x:"snapshot_year",y:["This area","District average","Berlin average"],title:"Social status over time, "+(s[0][0]?s[0][0].area_name:"this area")+" (1 = least deprived … 4 = most deprived)",yAxisTitle:"Status class",yMin:"1",yMax:"4",emptySet:"warn",emptyMessage:"No time series for this area."}});let se=s[3]&&ms(s),ie=s[4]&&us(s);const Fr=[bi,vi,wi],Pt=[];function Ar(e,n){return e[11]?0:e[12]?1:2}Ne=Ar(s),Y=Pt[Ne]=Fr[Ne](s),Je=new fr({props:{data:s[3],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),ua=new fr({props:{data:s[3],value:"dominant_stage_label",title:"Most common stage",emptySet:"warn"}}),De=new fr({props:{data:s[3],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}}),na=new Xs({}),La=new ei({});let ne=s[5]&&fs(s),oe=s[6]&&ps(s);Xe=new oi({props:{data:s[5],x:"snapshot_year",y:"poi_count",series:"poi_category_h",seriesOrder:s[23],title:"Mapped places by category, "+(s[0][0]?s[0][0].area_name:"this area")+" (largest segment first)",yAxisTitle:"Number of mapped places",emptySet:"warn"}});let Ie=s[22]&&s[22].area_top_category&&hs(s),_e=s[7]&&gs(s),le=s[8]&&ys(s);const Ir=[xi,Ri],Ut=[];function Or(e,n){return e[9].length>0?0:1}X=Or(s),$e=Ut[X]=Ir[X](s);let ce=Gt&&ws(s),de=s[14]&&vs(s);const Pr=[Ti,Bi],Qt=[];function Ur(e,n){return n[0]&16384&&(ha=null),ha==null&&(ha=e[14].filter(Vi).length>0),ha?0:1}Re=Ur(s,[-1,-1,-1,-1,-1]),we=Qt[Re]=Pr[Re](s);let me=Jt&&bs(s),ue=s[15]&&$s(s),fe=s[16]&&ks(s);function Qr(e,n){return e[15][0]?zi:Li}let br=Qr(s),Aa=br(s),ve=s[15][0]&&s[15][0].any_indicator_suppressed&&Rs(s);wa=new xr({props:{data:s[16],rows:"12",emptySet:"warn",emptyMessage:"No population-register data for this area.",$$slots:{default:[Ni]},$$scope:{ctx:s}}});let pe=s[17]&&xs(s),he=s[18]&&Es(s);function Wr(e,n){var V;return(V=e[17][0])!=null&&V.snapshot_year?Hi:Di}let $r=Wr(s),Ia=$r(s);Fe=new xr({props:{data:s[18],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Fi]},$$scope:{ctx:s}}}),sa=new ut({props:{status:"info",$$slots:{default:[Ai]},$$scope:{ctx:s}}});function Kr(e,n){var V,Wt;return(V=e[17][0])!=null&&V.snapshot_year&&e[17][0].gastro_poi_with_cuisine_count>=8&&e[17][0].dominant_cuisine_share>=.15?Pi:(Wt=e[17][0])!=null&&Wt.snapshot_year&&e[17][0].gastro_poi_with_cuisine_count>=8?Oi:Ii}let kr=Kr(s),Oa=kr(s);Ae=new ut({props:{status:"info",$$slots:{default:[Ui]},$$scope:{ctx:s}}});let ge=s[19]&&js(s);Ea=new is({props:{data:s[19],x:"snapshot_year",y:["est_rent_low","est_rent_mid","est_rent_high","District average (typical)","Berlin average (typical)"],title:"Estimated rent range (EUR/m²), "+(s[0][0]?s[0][0].area_name:"this area"),yAxisTitle:"EUR/m²",emptySet:"warn",emptyMessage:"No price/rent estimate for this area."}}),ja=new xr({props:{data:s[19],rows:"10",emptySet:"warn",emptyMessage:"No price/rent estimate for this area.",$$slots:{default:[Qi]},$$scope:{ctx:s}}});let ye=s[20]&&Bs(s);return ia=new Js({props:{data:s[20],geoJsonUrl:`${Ms}/geo/bzr_plr_drilldown.geojson`,title:s[0][0]?s[0][0].area_name:"This area"}}),Zt=new Zs({}),{c(){wt&&wt.c(),t=w(),mr.c(),r=E("meta"),a=E("meta"),vt&&vt.c(),i=Er(),o=w(),ee&&ee.c(),d=w(),ae&&ae.c(),c=w(),te&&te.c(),h=w(),S(g.$$.fragment),b=w(),S(v.$$.fragment),M=w(),S($.$$.fragment),F=w(),Q=E("p"),q=R("Up: "),Fa.c(),A=R(" · "),G=E("a"),G.textContent=N,P=R(" · "),U=E("a"),U.textContent=bt,Ta=w(),Pe=E("h2"),ze=E("a"),$t=R(ft),Yt=R(" at a glance"),pt=w();for(let e=0;e<Ce.length;e+=1)Ce[e].c();Pa=w(),Ve=E("h2"),Ve.innerHTML=p,Kt=w(),S(Sa.$$.fragment),Vt=w(),re&&re.c(),kt=w(),S(W.$$.fragment),m=w(),Me=E("p"),Me.textContent=Ua,Qa=w(),se&&se.c(),je=w(),ie&&ie.c(),Wa=w(),Y.c(),Ge=w(),S(Je.$$.fragment),Ca=w(),S(ua.$$.fragment),Rt=w(),S(De.$$.fragment),fa=w(),S(na.$$.fragment),qa=w(),S(La.$$.fragment),xt=w(),He=E("p"),He.innerHTML=Ka,Va=w(),oa=E("h2"),oa.innerHTML=Xt,Et=w(),Be=E("h3"),Be.innerHTML=Ga,Ja=w(),Ue=E("p"),Ue.innerHTML=er,jt=w(),ne&&ne.c(),Ze=w(),oe&&oe.c(),Ye=w(),S(Xe.$$.fragment),za=w(),Ie&&Ie.c(),Za=w(),_a=E("h3"),_a.innerHTML=Ya,pa=w(),ea=E("p"),ea.innerHTML=ht,Bt=w(),_e&&_e.c(),Xa=w(),le&&le.c(),aa=w(),$e.c(),la=w(),ce&&ce.c(),et=w(),Te=E("h2"),Te.innerHTML=at,tt=w(),ke=E("p"),ke.innerHTML=ar,Tt=w(),de&&de.c(),ta=w(),we.c(),rt=w(),me&&me.c(),ra=w(),Se=E("h2"),Se.innerHTML=St,Ct=w(),ue&&ue.c(),st=w(),fe&&fe.c(),it=w(),Qe=E("p"),Aa.c(),ga=w(),ve&&ve.c(),ya=w(),S(wa.$$.fragment),qt=w(),Ma=E("p"),Ma.innerHTML=nt,va=w(),ca=E("p"),ca.textContent=tr,Lt=w(),da=E("h2"),da.innerHTML=ot,ba=w(),pe&&pe.c(),$a=w(),he&&he.c(),_t=w(),Na=E("p"),Ia.c(),zt=w(),S(Fe.$$.fragment),ka=w(),S(sa.$$.fragment),Mt=w(),Da=E("p"),Oa.c(),Nt=w(),We=E("p"),We.textContent=lt,ct=w(),ma=E("h2"),ma.innerHTML=rr,Dt=w(),S(Ae.$$.fragment),Ra=w(),ge&&ge.c(),xa=w(),S(Ea.$$.fragment),Ht=w(),S(ja.$$.fragment),gt=w(),Ha=E("h2"),Ha.innerHTML=pr,sr=w(),ye&&ye.c(),L=w(),S(ia.$$.fragment),z=w(),K=E("p"),K.textContent=Ft,dt=w(),Ke=E("h2"),Ke.innerHTML=At,It=w(),mt=E("ul"),mt.innerHTML=Mr,hr=w(),yt=E("h2"),yt.innerHTML=Nr,gr=w(),Ot=E("p"),Ot.innerHTML=Dr,yr=w(),cr=E("hr"),wr=w(),S(Zt.$$.fragment),this.h()},l(e){wt&&wt.l(e),t=y(e);const n=Fs("svelte-2igo1p",document.head);mr.l(n),r=x(n,"META",{name:!0,content:!0}),a=x(n,"META",{name:!0,content:!0}),vt&&vt.l(n),i=Er(),n.forEach(_),o=y(e),ee&&ee.l(e),d=y(e),ae&&ae.l(e),c=y(e),te&&te.l(e),h=y(e),T(g.$$.fragment,e),b=y(e),T(v.$$.fragment,e),M=y(e),T($.$$.fragment,e),F=y(e),Q=x(e,"P",{});var V=be(Q);q=k(V,"Up: "),Fa.l(V),A=k(V," · "),G=x(V,"A",{href:!0,"data-svelte-h":!0}),D(G)!=="svelte-1i43n98"&&(G.textContent=N),P=k(V," · "),U=x(V,"A",{href:!0,"data-svelte-h":!0}),D(U)!=="svelte-6j2qr0"&&(U.textContent=bt),V.forEach(_),Ta=y(e),Pe=x(e,"H2",{class:!0,id:!0});var Wt=be(Pe);ze=x(Wt,"A",{href:!0});var nr=be(ze);$t=k(nr,ft),Yt=k(nr," at a glance"),nr.forEach(_),Wt.forEach(_),pt=y(e);for(let lr=0;lr<Ce.length;lr+=1)Ce[lr].l(e);Pa=y(e),Ve=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(Ve)!=="svelte-14f17uo"&&(Ve.innerHTML=p),Kt=y(e),T(Sa.$$.fragment,e),Vt=y(e),re&&re.l(e),kt=y(e),T(W.$$.fragment,e),m=y(e),Me=x(e,"P",{class:!0,"data-svelte-h":!0}),D(Me)!=="svelte-11i1u0l"&&(Me.textContent=Ua),Qa=y(e),se&&se.l(e),je=y(e),ie&&ie.l(e),Wa=y(e),Y.l(e),Ge=y(e),T(Je.$$.fragment,e),Ca=y(e),T(ua.$$.fragment,e),Rt=y(e),T(De.$$.fragment,e),fa=y(e),T(na.$$.fragment,e),qa=y(e),T(La.$$.fragment,e),xt=y(e),He=x(e,"P",{class:!0,"data-svelte-h":!0}),D(He)!=="svelte-dvqlbe"&&(He.innerHTML=Ka),Va=y(e),oa=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(oa)!=="svelte-1i9w9pn"&&(oa.innerHTML=Xt),Et=y(e),Be=x(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),D(Be)!=="svelte-yatnem"&&(Be.innerHTML=Ga),Ja=y(e),Ue=x(e,"P",{class:!0,"data-svelte-h":!0}),D(Ue)!=="svelte-1s6me3w"&&(Ue.innerHTML=er),jt=y(e),ne&&ne.l(e),Ze=y(e),oe&&oe.l(e),Ye=y(e),T(Xe.$$.fragment,e),za=y(e),Ie&&Ie.l(e),Za=y(e),_a=x(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),D(_a)!=="svelte-1uvjo0a"&&(_a.innerHTML=Ya),pa=y(e),ea=x(e,"P",{class:!0,"data-svelte-h":!0}),D(ea)!=="svelte-1j0xj8j"&&(ea.innerHTML=ht),Bt=y(e),_e&&_e.l(e),Xa=y(e),le&&le.l(e),aa=y(e),$e.l(e),la=y(e),ce&&ce.l(e),et=y(e),Te=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(Te)!=="svelte-4kb45v"&&(Te.innerHTML=at),tt=y(e),ke=x(e,"P",{class:!0,"data-svelte-h":!0}),D(ke)!=="svelte-1jj40r9"&&(ke.innerHTML=ar),Tt=y(e),de&&de.l(e),ta=y(e),we.l(e),rt=y(e),me&&me.l(e),ra=y(e),Se=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(Se)!=="svelte-1mdzqzc"&&(Se.innerHTML=St),Ct=y(e),ue&&ue.l(e),st=y(e),fe&&fe.l(e),it=y(e),Qe=x(e,"P",{});var ur=be(Qe);Aa.l(ur),ur.forEach(_),ga=y(e),ve&&ve.l(e),ya=y(e),T(wa.$$.fragment,e),qt=y(e),Ma=x(e,"P",{"data-svelte-h":!0}),D(Ma)!=="svelte-1bydfby"&&(Ma.innerHTML=nt),va=y(e),ca=x(e,"P",{"data-svelte-h":!0}),D(ca)!=="svelte-1yv6nzw"&&(ca.textContent=tr),Lt=y(e),da=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(da)!=="svelte-12k6lqd"&&(da.innerHTML=ot),ba=y(e),pe&&pe.l(e),$a=y(e),he&&he.l(e),_t=y(e),Na=x(e,"P",{});var or=be(Na);Ia.l(or),or.forEach(_),zt=y(e),T(Fe.$$.fragment,e),ka=y(e),T(sa.$$.fragment,e),Mt=y(e),Da=x(e,"P",{});var _r=be(Da);Oa.l(_r),_r.forEach(_),Nt=y(e),We=x(e,"P",{"data-svelte-h":!0}),D(We)!=="svelte-ja6pm6"&&(We.textContent=lt),ct=y(e),ma=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(ma)!=="svelte-13a10dj"&&(ma.innerHTML=rr),Dt=y(e),T(Ae.$$.fragment,e),Ra=y(e),ge&&ge.l(e),xa=y(e),T(Ea.$$.fragment,e),Ht=y(e),T(ja.$$.fragment,e),gt=y(e),Ha=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(Ha)!=="svelte-60cjj9"&&(Ha.innerHTML=pr),sr=y(e),ye&&ye.l(e),L=y(e),T(ia.$$.fragment,e),z=y(e),K=x(e,"P",{class:!0,"data-svelte-h":!0}),D(K)!=="svelte-kz3w0c"&&(K.textContent=Ft),dt=y(e),Ke=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(Ke)!=="svelte-ad0syq"&&(Ke.innerHTML=At),It=y(e),mt=x(e,"UL",{class:!0,"data-svelte-h":!0}),D(mt)!=="svelte-hyrhc3"&&(mt.innerHTML=Mr),hr=y(e),yt=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(yt)!=="svelte-oimjns"&&(yt.innerHTML=Nr),gr=y(e),Ot=x(e,"P",{class:!0,"data-svelte-h":!0}),D(Ot)!=="svelte-k1wi1g"&&(Ot.innerHTML=Dr),yr=y(e),cr=x(e,"HR",{class:!0}),wr=y(e),T(Zt.$$.fragment,e),this.h()},h(){C(r,"name","twitter:card"),C(r,"content","summary_large_image"),C(a,"name","twitter:site"),C(a,"content","@evidence_dev"),C(G,"href","/gentriduck/berlin/area-detail"),C(U,"href","/gentriduck/berlin/area/bezirk"),C(ze,"href","#area_info0--area_info0area_name--this-area-at-a-glance"),C(Pe,"class","markdown"),C(Pe,"id","area_info0--area_info0area_name--this-area-at-a-glance"),C(Ve,"class","markdown"),C(Ve,"id","social-status--trajectory"),C(Me,"class","markdown"),C(He,"class","markdown"),C(oa,"class","markdown"),C(oa,"id","commercial-mix--offering-advantage"),C(Be,"class","markdown"),C(Be,"id","how-its-commercial-mix-has-developed"),C(Ue,"class","markdown"),C(_a,"class","markdown"),C(_a,"id","offering-advantage-profile"),C(ea,"class","markdown"),C(Te,"class","markdown"),C(Te,"id","within-group-dominance"),C(ke,"class","markdown"),C(Se,"class","markdown"),C(Se,"id","people--structure"),C(da,"class","markdown"),C(da,"id","amenities--everyday-infrastructure"),C(ma,"class","markdown"),C(ma,"id","land-value--estimated-rent"),C(Ha,"class","markdown"),C(Ha,"id","where-this-area-sits"),C(K,"class","markdown"),C(Ke,"class","markdown"),C(Ke,"id","honest-caveats"),C(mt,"class","markdown"),C(yt,"class","markdown"),C(yt,"id","further-reading"),C(Ot,"class","markdown"),C(cr,"class","markdown")},m(e,n){wt&&wt.m(e,n),l(e,t,n),mr.m(document.head,null),O(document.head,r),O(document.head,a),vt&&vt.m(document.head,null),O(document.head,i),l(e,o,n),ee&&ee.m(e,n),l(e,d,n),ae&&ae.m(e,n),l(e,c,n),te&&te.m(e,n),l(e,h,n),B(g,e,n),l(e,b,n),B(v,e,n),l(e,M,n),B($,e,n),l(e,F,n),l(e,Q,n),O(Q,q),Fa.m(Q,null),O(Q,A),O(Q,G),O(Q,P),O(Q,U),l(e,Ta,n),l(e,Pe,n),O(Pe,ze),O(ze,$t),O(ze,Yt),l(e,pt,n);for(let V=0;V<Ce.length;V+=1)Ce[V]&&Ce[V].m(e,n);l(e,Pa,n),l(e,Ve,n),l(e,Kt,n),B(Sa,e,n),l(e,Vt,n),re&&re.m(e,n),l(e,kt,n),B(W,e,n),l(e,m,n),l(e,Me,n),l(e,Qa,n),se&&se.m(e,n),l(e,je,n),ie&&ie.m(e,n),l(e,Wa,n),Pt[Ne].m(e,n),l(e,Ge,n),B(Je,e,n),l(e,Ca,n),B(ua,e,n),l(e,Rt,n),B(De,e,n),l(e,fa,n),B(na,e,n),l(e,qa,n),B(La,e,n),l(e,xt,n),l(e,He,n),l(e,Va,n),l(e,oa,n),l(e,Et,n),l(e,Be,n),l(e,Ja,n),l(e,Ue,n),l(e,jt,n),ne&&ne.m(e,n),l(e,Ze,n),oe&&oe.m(e,n),l(e,Ye,n),B(Xe,e,n),l(e,za,n),Ie&&Ie.m(e,n),l(e,Za,n),l(e,_a,n),l(e,pa,n),l(e,ea,n),l(e,Bt,n),_e&&_e.m(e,n),l(e,Xa,n),le&&le.m(e,n),l(e,aa,n),Ut[X].m(e,n),l(e,la,n),ce&&ce.m(e,n),l(e,et,n),l(e,Te,n),l(e,tt,n),l(e,ke,n),l(e,Tt,n),de&&de.m(e,n),l(e,ta,n),Qt[Re].m(e,n),l(e,rt,n),me&&me.m(e,n),l(e,ra,n),l(e,Se,n),l(e,Ct,n),ue&&ue.m(e,n),l(e,st,n),fe&&fe.m(e,n),l(e,it,n),l(e,Qe,n),Aa.m(Qe,null),l(e,ga,n),ve&&ve.m(e,n),l(e,ya,n),B(wa,e,n),l(e,qt,n),l(e,Ma,n),l(e,va,n),l(e,ca,n),l(e,Lt,n),l(e,da,n),l(e,ba,n),pe&&pe.m(e,n),l(e,$a,n),he&&he.m(e,n),l(e,_t,n),l(e,Na,n),Ia.m(Na,null),l(e,zt,n),B(Fe,e,n),l(e,ka,n),B(sa,e,n),l(e,Mt,n),l(e,Da,n),Oa.m(Da,null),l(e,Nt,n),l(e,We,n),l(e,ct,n),l(e,ma,n),l(e,Dt,n),B(Ae,e,n),l(e,Ra,n),ge&&ge.m(e,n),l(e,xa,n),B(Ea,e,n),l(e,Ht,n),B(ja,e,n),l(e,gt,n),l(e,Ha,n),l(e,sr,n),ye&&ye.m(e,n),l(e,L,n),B(ia,e,n),l(e,z,n),l(e,K,n),l(e,dt,n),l(e,Ke,n),l(e,It,n),l(e,mt,n),l(e,hr,n),l(e,yt,n),l(e,gr,n),l(e,Ot,n),l(e,yr,n),l(e,cr,n),l(e,wr,n),B(Zt,e,n),dr=!0},p(e,n){var Xr;typeof H<"u"&&(H.title||(Xr=H.og)!=null&&Xr.title)&&H.hide_title!==!0&&wt.p(e,n),mr.p(e,n),typeof H=="object"&&vt.p(e,n),e[0]?ee?(ee.p(e,n),n[0]&1&&u(ee,1)):(ee=os(e),ee.c(),u(ee,1),ee.m(d.parentNode,d)):ee&&(Z(),f(ee,1,1,()=>{ee=null}),J()),e[1]?ae?(ae.p(e,n),n[0]&2&&u(ae,1)):(ae=_s(e),ae.c(),u(ae,1),ae.m(c.parentNode,c)):ae&&(Z(),f(ae,1,1,()=>{ae=null}),J()),e[2]?te?(te.p(e,n),n[0]&4&&u(te,1)):(te=ls(e),te.c(),u(te,1),te.m(h.parentNode,h)):te&&(Z(),f(te,1,1,()=>{te=null}),J());const V={};n[0]&67108864&&(V.crumbs=e[26]),g.$set(V);const Wt={};n[0]&33554432&&(Wt.title=e[25]),v.$set(Wt);const nr={};if(n[0]&1&&(nr.title=e[0][0]?e[0][0].area_name:"Neighbourhood"),$.$set(nr),vr===(vr=Hr(e))&&Fa?Fa.p(e,n):(Fa.d(1),Fa=vr(e),Fa&&(Fa.c(),Fa.m(Q,A))),(!dr||n[0]&1)&&ft!==(ft=(e[0][0]?e[0][0].area_name:"This area")+"")&&Oe($t,ft),n[0]&16777216){ir=ts(e[24]);let Ba;for(Ba=0;Ba<ir.length;Ba+=1){const es=ns(e,ir,Ba);Ce[Ba]?Ce[Ba].p(es,n):(Ce[Ba]=cs(es),Ce[Ba].c(),Ce[Ba].m(Pa.parentNode,Pa))}for(;Ba<Ce.length;Ba+=1)Ce[Ba].d(1);Ce.length=ir.length}const ur={};n[4]&8388608&&(ur.$$scope={dirty:n,ctx:e}),Sa.$set(ur),e[13]?re?(re.p(e,n),n[0]&8192&&u(re,1)):(re=ds(e),re.c(),u(re,1),re.m(kt.parentNode,kt)):re&&(Z(),f(re,1,1,()=>{re=null}),J());const or={};n[0]&8192&&(or.data=e[13]),n[0]&1&&(or.title="Social status over time, "+(e[0][0]?e[0][0].area_name:"this area")+" (1 = least deprived … 4 = most deprived)"),W.$set(or),e[3]?se?(se.p(e,n),n[0]&8&&u(se,1)):(se=ms(e),se.c(),u(se,1),se.m(je.parentNode,je)):se&&(Z(),f(se,1,1,()=>{se=null}),J()),e[4]?ie?(ie.p(e,n),n[0]&16&&u(ie,1)):(ie=us(e),ie.c(),u(ie,1),ie.m(Wa.parentNode,Wa)):ie&&(Z(),f(ie,1,1,()=>{ie=null}),J());let _r=Ne;Ne=Ar(e),Ne===_r?Pt[Ne].p(e,n):(Z(),f(Pt[_r],1,1,()=>{Pt[_r]=null}),J(),Y=Pt[Ne],Y?Y.p(e,n):(Y=Pt[Ne]=Fr[Ne](e),Y.c()),u(Y,1),Y.m(Ge.parentNode,Ge));const lr={};n[0]&8&&(lr.data=e[3]),Je.$set(lr);const Gr={};n[0]&8&&(Gr.data=e[3]),ua.$set(Gr);const Jr={};n[0]&8&&(Jr.data=e[3]),De.$set(Jr),e[5]?ne?(ne.p(e,n),n[0]&32&&u(ne,1)):(ne=fs(e),ne.c(),u(ne,1),ne.m(Ze.parentNode,Ze)):ne&&(Z(),f(ne,1,1,()=>{ne=null}),J()),e[6]?oe?(oe.p(e,n),n[0]&64&&u(oe,1)):(oe=ps(e),oe.c(),u(oe,1),oe.m(Ye.parentNode,Ye)):oe&&(Z(),f(oe,1,1,()=>{oe=null}),J());const Rr={};n[0]&32&&(Rr.data=e[5]),n[0]&8388608&&(Rr.seriesOrder=e[23]),n[0]&1&&(Rr.title="Mapped places by category, "+(e[0][0]?e[0][0].area_name:"this area")+" (largest segment first)"),Xe.$set(Rr),e[22]&&e[22].area_top_category?Ie?Ie.p(e,n):(Ie=hs(e),Ie.c(),Ie.m(Za.parentNode,Za)):Ie&&(Ie.d(1),Ie=null),e[7]?_e?(_e.p(e,n),n[0]&128&&u(_e,1)):(_e=gs(e),_e.c(),u(_e,1),_e.m(Xa.parentNode,Xa)):_e&&(Z(),f(_e,1,1,()=>{_e=null}),J()),e[8]?le?(le.p(e,n),n[0]&256&&u(le,1)):(le=ys(e),le.c(),u(le,1),le.m(aa.parentNode,aa)):le&&(Z(),f(le,1,1,()=>{le=null}),J());let jr=X;X=Or(e),X===jr?Ut[X].p(e,n):(Z(),f(Ut[jr],1,1,()=>{Ut[jr]=null}),J(),$e=Ut[X],$e?$e.p(e,n):($e=Ut[X]=Ir[X](e),$e.c()),u($e,1),$e.m(la.parentNode,la)),n[0]&512&&(Gt=e[9].some(Ss)),Gt?ce?(ce.p(e,n),n[0]&512&&u(ce,1)):(ce=ws(e),ce.c(),u(ce,1),ce.m(et.parentNode,et)):ce&&(Z(),f(ce,1,1,()=>{ce=null}),J()),e[14]?de?(de.p(e,n),n[0]&16384&&u(de,1)):(de=vs(e),de.c(),u(de,1),de.m(ta.parentNode,ta)):de&&(Z(),f(de,1,1,()=>{de=null}),J());let Br=Re;Re=Ur(e,n),Re===Br?Qt[Re].p(e,n):(Z(),f(Qt[Br],1,1,()=>{Qt[Br]=null}),J(),we=Qt[Re],we?we.p(e,n):(we=Qt[Re]=Pr[Re](e),we.c()),u(we,1),we.m(rt.parentNode,rt)),n[0]&16384&&(Jt=e[14].some(Ts)),Jt?me?(me.p(e,n),n[0]&16384&&u(me,1)):(me=bs(e),me.c(),u(me,1),me.m(ra.parentNode,ra)):me&&(Z(),f(me,1,1,()=>{me=null}),J()),e[15]?ue?(ue.p(e,n),n[0]&32768&&u(ue,1)):(ue=$s(e),ue.c(),u(ue,1),ue.m(st.parentNode,st)):ue&&(Z(),f(ue,1,1,()=>{ue=null}),J()),e[16]?fe?(fe.p(e,n),n[0]&65536&&u(fe,1)):(fe=ks(e),fe.c(),u(fe,1),fe.m(it.parentNode,it)):fe&&(Z(),f(fe,1,1,()=>{fe=null}),J()),br===(br=Qr(e))&&Aa?Aa.p(e,n):(Aa.d(1),Aa=br(e),Aa&&(Aa.c(),Aa.m(Qe,null))),e[15][0]&&e[15][0].any_indicator_suppressed?ve?n[0]&32768&&u(ve,1):(ve=Rs(e),ve.c(),u(ve,1),ve.m(ya.parentNode,ya)):ve&&(Z(),f(ve,1,1,()=>{ve=null}),J());const Tr={};n[0]&65536&&(Tr.data=e[16]),n[4]&8388608&&(Tr.$$scope={dirty:n,ctx:e}),wa.$set(Tr),e[17]?pe?(pe.p(e,n),n[0]&131072&&u(pe,1)):(pe=xs(e),pe.c(),u(pe,1),pe.m($a.parentNode,$a)):pe&&(Z(),f(pe,1,1,()=>{pe=null}),J()),e[18]?he?(he.p(e,n),n[0]&262144&&u(he,1)):(he=Es(e),he.c(),u(he,1),he.m(_t.parentNode,_t)):he&&(Z(),f(he,1,1,()=>{he=null}),J()),$r===($r=Wr(e))&&Ia?Ia.p(e,n):(Ia.d(1),Ia=$r(e),Ia&&(Ia.c(),Ia.m(Na,null)));const Sr={};n[0]&262144&&(Sr.data=e[18]),n[4]&8388608&&(Sr.$$scope={dirty:n,ctx:e}),Fe.$set(Sr);const Zr={};n[4]&8388608&&(Zr.$$scope={dirty:n,ctx:e}),sa.$set(Zr),kr===(kr=Kr(e))&&Oa?Oa.p(e,n):(Oa.d(1),Oa=kr(e),Oa&&(Oa.c(),Oa.m(Da,null)));const Yr={};n[4]&8388608&&(Yr.$$scope={dirty:n,ctx:e}),Ae.$set(Yr),e[19]?ge?(ge.p(e,n),n[0]&524288&&u(ge,1)):(ge=js(e),ge.c(),u(ge,1),ge.m(xa.parentNode,xa)):ge&&(Z(),f(ge,1,1,()=>{ge=null}),J());const Cr={};n[0]&524288&&(Cr.data=e[19]),n[0]&1&&(Cr.title="Estimated rent range (EUR/m²), "+(e[0][0]?e[0][0].area_name:"this area")),Ea.$set(Cr);const qr={};n[0]&524288&&(qr.data=e[19]),n[4]&8388608&&(qr.$$scope={dirty:n,ctx:e}),ja.$set(qr),e[20]?ye?(ye.p(e,n),n[0]&1048576&&u(ye,1)):(ye=Bs(e),ye.c(),u(ye,1),ye.m(L.parentNode,L)):ye&&(Z(),f(ye,1,1,()=>{ye=null}),J());const Lr={};n[0]&1048576&&(Lr.data=e[20]),n[0]&1&&(Lr.title=e[0][0]?e[0][0].area_name:"This area"),ia.$set(Lr)},i(e){dr||(u(ee),u(ae),u(te),u(g.$$.fragment,e),u(v.$$.fragment,e),u($.$$.fragment,e),u(Sa.$$.fragment,e),u(re),u(W.$$.fragment,e),u(se),u(ie),u(Y),u(Je.$$.fragment,e),u(ua.$$.fragment,e),u(De.$$.fragment,e),u(na.$$.fragment,e),u(La.$$.fragment,e),u(ne),u(oe),u(Xe.$$.fragment,e),u(_e),u(le),u($e),u(ce),u(de),u(we),u(me),u(ue),u(fe),u(ve),u(wa.$$.fragment,e),u(pe),u(he),u(Fe.$$.fragment,e),u(sa.$$.fragment,e),u(Ae.$$.fragment,e),u(ge),u(Ea.$$.fragment,e),u(ja.$$.fragment,e),u(ye),u(ia.$$.fragment,e),u(Zt.$$.fragment,e),dr=!0)},o(e){f(ee),f(ae),f(te),f(g.$$.fragment,e),f(v.$$.fragment,e),f($.$$.fragment,e),f(Sa.$$.fragment,e),f(re),f(W.$$.fragment,e),f(se),f(ie),f(Y),f(Je.$$.fragment,e),f(ua.$$.fragment,e),f(De.$$.fragment,e),f(na.$$.fragment,e),f(La.$$.fragment,e),f(ne),f(oe),f(Xe.$$.fragment,e),f(_e),f(le),f($e),f(ce),f(de),f(we),f(me),f(ue),f(fe),f(ve),f(wa.$$.fragment,e),f(pe),f(he),f(Fe.$$.fragment,e),f(sa.$$.fragment,e),f(Ae.$$.fragment,e),f(ge),f(Ea.$$.fragment,e),f(ja.$$.fragment,e),f(ye),f(ia.$$.fragment,e),f(Zt.$$.fragment,e),dr=!1},d(e){e&&(_(t),_(o),_(d),_(c),_(h),_(b),_(M),_(F),_(Q),_(Ta),_(Pe),_(pt),_(Pa),_(Ve),_(Kt),_(Vt),_(kt),_(m),_(Me),_(Qa),_(je),_(Wa),_(Ge),_(Ca),_(Rt),_(fa),_(qa),_(xt),_(He),_(Va),_(oa),_(Et),_(Be),_(Ja),_(Ue),_(jt),_(Ze),_(Ye),_(za),_(Za),_(_a),_(pa),_(ea),_(Bt),_(Xa),_(aa),_(la),_(et),_(Te),_(tt),_(ke),_(Tt),_(ta),_(rt),_(ra),_(Se),_(Ct),_(st),_(it),_(Qe),_(ga),_(ya),_(qt),_(Ma),_(va),_(ca),_(Lt),_(da),_(ba),_($a),_(_t),_(Na),_(zt),_(ka),_(Mt),_(Da),_(Nt),_(We),_(ct),_(ma),_(Dt),_(Ra),_(xa),_(Ht),_(gt),_(Ha),_(sr),_(L),_(z),_(K),_(dt),_(Ke),_(It),_(mt),_(hr),_(yt),_(gr),_(Ot),_(yr),_(cr),_(wr)),wt&&wt.d(e),mr.d(e),_(r),_(a),vt&&vt.d(e),_(i),ee&&ee.d(e),ae&&ae.d(e),te&&te.d(e),j(g,e),j(v,e),j($,e),Fa.d(),Hs(Ce,e),j(Sa,e),re&&re.d(e),j(W,e),se&&se.d(e),ie&&ie.d(e),Pt[Ne].d(e),j(Je,e),j(ua,e),j(De,e),j(na,e),j(La,e),ne&&ne.d(e),oe&&oe.d(e),j(Xe,e),Ie&&Ie.d(e),_e&&_e.d(e),le&&le.d(e),Ut[X].d(e),ce&&ce.d(e),de&&de.d(e),Qt[Re].d(e),me&&me.d(e),ue&&ue.d(e),fe&&fe.d(e),Aa.d(),ve&&ve.d(e),j(wa,e),pe&&pe.d(e),he&&he.d(e),Ia.d(),j(Fe,e),j(sa,e),Oa.d(),j(Ae,e),ge&&ge.d(e),j(Ea,e),j(ja,e),ye&&ye.d(e),j(ia,e),j(Zt,e)}}}const H={},Ki=5,zr=5,Ts=s=>s.is_thin_base,Vi=s=>!s.is_thin_base,Ss=s=>s.lowBase,Cs=s=>s.lowBase,qs=s=>`${s.domain} (${s.poiCount??0})`,Ls=s=>!s.is_thin_base,zs=s=>s.is_thin_base;function Gi(s,t,r){let a,i,o,d,c,h,g,b,v,M,$,F,Q,q,A,G,N,P,U,bt,Ta,Pe,ze,ft,$t,Yt,pt,Pa;as(s,ni,L=>r(114,pt=L)),as(s,ss,L=>r(119,Pa=L));let{data:Ve}=t,{data:p={},customFormattingSettings:Kt,__db:Sa,inputs:Vt}=Ve;As(ss,Pa="40c65ae01ec9f4363d3b5188faa4d064",Pa);let kt=ti(ai(Vt));Is(kt.subscribe(L=>Vt=L)),Os(ii,{getCustomFormats:()=>Kt.customFormats||[]});const W=(L,ia)=>li(Sa.query,L,{query_name:ia});ri(W);let m=pt.params;Ps(()=>!0);let Me={initialData:void 0,initialError:void 0},Ua=I`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${m.code}'
order by period_yyyymm desc
limit 1`,Qa=`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${m.code}'
order by period_yyyymm desc
limit 1`;p.area_info_data&&(p.area_info_data instanceof Error?Me.initialError=p.area_info_data:Me.initialData=p.area_info_data,p.area_info_columns&&(Me.knownColumns=p.area_info_columns));let je,Wa=!1;const Ne=qe.createReactive({callback:L=>{r(0,je=L)},execFn:W},{id:"area_info",...Me});Ne(Qa,{noResolve:Ua,...Me}),globalThis[Symbol.for("area_info")]={get value(){return je}};let Y={initialData:void 0,initialError:void 0},Ge=I`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${m.code}', 1, 2) as bezirk_code,
    case substr('${m.code}', 1, 2)
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
    end as bezirk_name`,Je=`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${m.code}', 1, 2) as bezirk_code,
    case substr('${m.code}', 1, 2)
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
    end as bezirk_name`;p.district_info_data&&(p.district_info_data instanceof Error?Y.initialError=p.district_info_data:Y.initialData=p.district_info_data,p.district_info_columns&&(Y.knownColumns=p.district_info_columns));let Ca,ua=!1;const Rt=qe.createReactive({callback:L=>{r(1,Ca=L)},execFn:W},{id:"district_info",...Y});Rt(Je,{noResolve:Ge,...Y}),globalThis[Symbol.for("district_info")]={get value(){return Ca}};let De={initialData:void 0,initialError:void 0},fa=I`-- Current (latest published period) stage/status trend for this area, plus the simple district and
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
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    -- #358: display label + official status trend from dbt (spec §1-§2); population drives the
    -- C2 "uninhabited only where population = 0" wording below.
    gi.stage_label,
    gi.status_trend,
    gi.population,
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
    and gi.area_code = '${m.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`,na=`-- Current (latest published period) stage/status trend for this area, plus the simple district and
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
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    -- #358: display label + official status trend from dbt (spec §1-§2); population drives the
    -- C2 "uninhabited only where population = 0" wording below.
    gi.stage_label,
    gi.status_trend,
    gi.population,
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
    and gi.area_code = '${m.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`;p.context_current_data&&(p.context_current_data instanceof Error?De.initialError=p.context_current_data:De.initialData=p.context_current_data,p.context_current_columns&&(De.knownColumns=p.context_current_columns));let qa,La=!1;const xt=qe.createReactive({callback:L=>{r(2,qa=L)},execFn:W},{id:"context_current",...De});xt(na,{noResolve:fa,...De}),globalThis[Symbol.for("context_current")]={get value(){return qa}};let He={initialData:void 0,initialError:void 0},Ka=I`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
order by a.snapshot_year`,Va=`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
order by a.snapshot_year`;p.area_trend_data&&(p.area_trend_data instanceof Error?He.initialError=p.area_trend_data:He.initialData=p.area_trend_data,p.area_trend_columns&&(He.knownColumns=p.area_trend_columns));let oa,Xt=!1;const Et=qe.createReactive({callback:L=>{r(13,oa=L)},execFn:W},{id:"area_trend",...He});Et(Va,{noResolve:Ka,...He}),globalThis[Symbol.for("area_trend")]={get value(){return oa}};let Be={initialData:void 0,initialError:void 0},Ga=I`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'`,Ja=`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'`;p.trajectory_summary_data&&(p.trajectory_summary_data instanceof Error?Be.initialError=p.trajectory_summary_data:Be.initialData=p.trajectory_summary_data,p.trajectory_summary_columns&&(Be.knownColumns=p.trajectory_summary_columns));let Ue,er=!1;const jt=qe.createReactive({callback:L=>{r(3,Ue=L)},execFn:W},{id:"trajectory_summary",...Be});jt(Ja,{noResolve:Ga,...Be}),globalThis[Symbol.for("trajectory_summary")]={get value(){return Ue}};let Ze={initialData:void 0,initialError:void 0},Ye=I`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
group by trajectory_type`,Xe=`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
group by trajectory_type`;p.district_trajectory_mix_data&&(p.district_trajectory_mix_data instanceof Error?Ze.initialError=p.district_trajectory_mix_data:Ze.initialData=p.district_trajectory_mix_data,p.district_trajectory_mix_columns&&(Ze.knownColumns=p.district_trajectory_mix_columns));let za,Za=!1;const _a=qe.createReactive({callback:L=>{r(4,za=L)},execFn:W},{id:"district_trajectory_mix",...Ze});_a(Xe,{noResolve:Ye,...Ze}),globalThis[Symbol.for("district_trajectory_mix")]={get value(){return za}};let Ya={initialData:void 0,initialError:void 0},pa=I`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
group by all
order by snapshot_year`,ea=`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
group by all
order by snapshot_year`;p.poi_trend_data&&(p.poi_trend_data instanceof Error?Ya.initialError=p.poi_trend_data:Ya.initialData=p.poi_trend_data,p.poi_trend_columns&&(Ya.knownColumns=p.poi_trend_columns));let ht,Bt=!1;const Xa=qe.createReactive({callback:L=>{r(5,ht=L)},execFn:W},{id:"poi_trend",...Ya});Xa(ea,{noResolve:pa,...Ya}),globalThis[Symbol.for("poi_trend")]={get value(){return ht}};let aa={initialData:void 0,initialError:void 0},X=I`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`,$e=`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`;p.poi_mix_context_data&&(p.poi_mix_context_data instanceof Error?aa.initialError=p.poi_mix_context_data:aa.initialData=p.poi_mix_context_data,p.poi_mix_context_columns&&(aa.knownColumns=p.poi_mix_context_columns));let la,Gt=!1;const et=qe.createReactive({callback:L=>{r(6,la=L)},execFn:W},{id:"poi_mix_context",...aa});et($e,{noResolve:X,...aa}),globalThis[Symbol.for("poi_mix_context")]={get value(){return la}};let Te={initialData:void 0,initialError:void 0},at=I`-- #357: the mart now zero-fills domains with no POI (is_zero_filled, oa_domain NULL); the radar
-- keeps only domains with an OA value, as before.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${m.code}'
    and not is_zero_filled
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
order by oa_domain desc`,tt=`-- #357: the mart now zero-fills domains with no POI (is_zero_filled, oa_domain NULL); the radar
-- keeps only domains with an OA value, as before.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${m.code}'
    and not is_zero_filled
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
order by oa_domain desc`;p.poi_oa_radar_data&&(p.poi_oa_radar_data instanceof Error?Te.initialError=p.poi_oa_radar_data:Te.initialData=p.poi_oa_radar_data,p.poi_oa_radar_columns&&(Te.knownColumns=p.poi_oa_radar_columns));let ke,ar=!1;const Tt=qe.createReactive({callback:L=>{r(7,ke=L)},execFn:W},{id:"poi_oa_radar",...Te});Tt(tt,{noResolve:at,...Te}),globalThis[Symbol.for("poi_oa_radar")]={get value(){return ke}};let ta={initialData:void 0,initialError:void 0},ha=I`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series. #357: zero-filled rows (oa_domain NULL)
-- excluded explicitly; avg() would skip their NULL anyway, so the average is unchanged.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and not is_zero_filled
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
group by poi_domain_h`,Re=`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series. #357: zero-filled rows (oa_domain NULL)
-- excluded explicitly; avg() would skip their NULL anyway, so the average is unchanged.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and not is_zero_filled
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
group by poi_domain_h`;p.poi_oa_radar_district_data&&(p.poi_oa_radar_district_data instanceof Error?ta.initialError=p.poi_oa_radar_district_data:ta.initialData=p.poi_oa_radar_district_data,p.poi_oa_radar_district_columns&&(ta.knownColumns=p.poi_oa_radar_district_columns));let we,rt=!1;const Jt=qe.createReactive({callback:L=>{r(8,we=L)},execFn:W},{id:"poi_oa_radar_district",...ta});Jt(Re,{noResolve:ha,...ta}),globalThis[Symbol.for("poi_oa_radar_district")]={get value(){return we}};let ra={initialData:void 0,initialError:void 0},Se=I`select
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
    and area_code = '${m.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${m.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`,St=`select
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
    and area_code = '${m.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${m.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`;p.dominance_area_data&&(p.dominance_area_data instanceof Error?ra.initialError=p.dominance_area_data:ra.initialData=p.dominance_area_data,p.dominance_area_columns&&(ra.knownColumns=p.dominance_area_columns));let Ct,st=!1;const it=qe.createReactive({callback:L=>{r(14,Ct=L)},execFn:W},{id:"dominance_area",...ra});it(St,{noResolve:Se,...ra}),globalThis[Symbol.for("dominance_area")]={get value(){return Ct}};let Qe={initialData:void 0,initialError:void 0},ga=I`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by reference_year desc
limit 1`,ya=`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by reference_year desc
limit 1`;p.demographics_current_data&&(p.demographics_current_data instanceof Error?Qe.initialError=p.demographics_current_data:Qe.initialData=p.demographics_current_data,p.demographics_current_columns&&(Qe.knownColumns=p.demographics_current_columns));let wa,qt=!1;const Ma=qe.createReactive({callback:L=>{r(15,wa=L)},execFn:W},{id:"demographics_current",...Qe});Ma(ya,{noResolve:ga,...Qe}),globalThis[Symbol.for("demographics_current")]={get value(){return wa}};let nt={initialData:void 0,initialError:void 0},va=I`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`,ca=`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`;p.demographics_table_data&&(p.demographics_table_data instanceof Error?nt.initialError=p.demographics_table_data:nt.initialData=p.demographics_table_data,p.demographics_table_columns&&(nt.knownColumns=p.demographics_table_columns));let tr,Lt=!1;const da=qe.createReactive({callback:L=>{r(16,tr=L)},execFn:W},{id:"demographics_table",...nt});da(ca,{noResolve:va,...nt}),globalThis[Symbol.for("demographics_table")]={get value(){return tr}};let ot={initialData:void 0,initialError:void 0},ba=I`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by snapshot_year desc
limit 1`,$a=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by snapshot_year desc
limit 1`;p.amenities_current_data&&(p.amenities_current_data instanceof Error?ot.initialError=p.amenities_current_data:ot.initialData=p.amenities_current_data,p.amenities_current_columns&&(ot.knownColumns=p.amenities_current_columns));let _t,Na=!1;const zt=qe.createReactive({callback:L=>{r(17,_t=L)},execFn:W},{id:"amenities_current",...ot});zt($a,{noResolve:ba,...ot}),globalThis[Symbol.for("amenities_current")]={get value(){return _t}};let Fe={initialData:void 0,initialError:void 0},ka=I`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`,sa=`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`;p.amenities_table_data&&(p.amenities_table_data instanceof Error?Fe.initialError=p.amenities_table_data:Fe.initialData=p.amenities_table_data,p.amenities_table_columns&&(Fe.knownColumns=p.amenities_table_columns));let Mt,Da=!1;const Nt=qe.createReactive({callback:L=>{r(18,Mt=L)},execFn:W},{id:"amenities_table",...Fe});Nt(sa,{noResolve:ka,...Fe}),globalThis[Symbol.for("amenities_table")]={get value(){return Mt}};let We={initialData:void 0,initialError:void 0},lt=I`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where p.city_code = 'BER' and p.area_code = '${m.code}'
order by p.snapshot_year`,ct=`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where p.city_code = 'BER' and p.area_code = '${m.code}'
order by p.snapshot_year`;p.price_rent_data&&(p.price_rent_data instanceof Error?We.initialError=p.price_rent_data:We.initialData=p.price_rent_data,p.price_rent_columns&&(We.knownColumns=p.price_rent_columns));let ma,rr=!1;const Dt=qe.createReactive({callback:L=>{r(19,ma=L)},execFn:W},{id:"price_rent",...We});Dt(ct,{noResolve:lt,...We}),globalThis[Symbol.for("price_rent")]={get value(){return ma}};let Ae={initialData:void 0,initialError:void 0},Ra=I`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${m.code}'`,xa=`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${m.code}'`;p.minimap_areas_data&&(p.minimap_areas_data instanceof Error?Ae.initialError=p.minimap_areas_data:Ae.initialData=p.minimap_areas_data,p.minimap_areas_columns&&(Ae.knownColumns=p.minimap_areas_columns));let Ea,Ht=!1;const ja=qe.createReactive({callback:L=>{r(20,Ea=L)},execFn:W},{id:"minimap_areas",...Ae});ja(xa,{noResolve:Ra,...Ae}),globalThis[Symbol.for("minimap_areas")]={get value(){return Ea}};const gt=()=>je!=null&&je[0]?je[0].area_name:"This area",Ha={"stable-established":"classified **6 · Stable / established** — consistently low deprivation, with no sign of an active gentrification-type process","pre-gentrification":"classified **1 · Pre-gentrification** — still comparatively deprived, and not yet showing the upward status movement that would signal an active process","pioneer-signal":"showing a **3 · Pioneer signal** — an early, small-scale upward shift in status, the kind of movement that sometimes precedes wider gentrification","active-gentrification":"in **4 · Active gentrification**: a middle-status area whose official status is still improving, the core of the upgrading process this site tracks","consolidation-pressure":"in **5 · Consolidation**: status is already comparatively high and still improving, consistent with a later stage of the cycle","improving-vulnerable":"in the deliberately ambiguous **2 · Improving from very low status (ambiguous)** — status is improving even though the area remains comparatively deprived; the site reports this combination without resolving it (see methodology)"},pr=L=>L.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\[([^\]]+)\]\((\/[^)]*)\)/g,(ia,z,K)=>'<a href="'+Ms+K+'">'+z+"</a>"),sr=-100;return s.$$set=L=>{"data"in L&&r(27,Ve=L.data)},s.$$.update=()=>{var L,ia;s.$$.dirty[0]&134217728&&r(28,{data:p={},customFormattingSettings:Kt,__db:Sa}=Ve,p),s.$$.dirty[0]&268435456&&si.set(Object.keys(p).length>0),s.$$.dirty[3]&2097152&&r(29,m=pt.params),s.$$.dirty[0]&536870912&&r(31,Ua=I`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${m.code}'
order by period_yyyymm desc
limit 1`),s.$$.dirty[0]&536870912&&r(32,Qa=`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${m.code}'
order by period_yyyymm desc
limit 1`),s.$$.dirty[0]&1073741824|s.$$.dirty[1]&7&&(Ua||!Wa?Ua||(Ne(Qa,{noResolve:Ua,...Me}),r(33,Wa=!0)):Ne(Qa,{noResolve:Ua})),s.$$.dirty[0]&536870912&&r(35,Ge=I`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${m.code}', 1, 2) as bezirk_code,
    case substr('${m.code}', 1, 2)
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
    end as bezirk_name`),s.$$.dirty[0]&536870912&&r(36,Je=`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
-- /berlin/area-detail's <Dropdown> (presentation only, not a new dim table/mart column).
select
    substr('${m.code}', 1, 2) as bezirk_code,
    case substr('${m.code}', 1, 2)
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
    end as bezirk_name`),s.$$.dirty[1]&120&&(Ge||!ua?Ge||(Rt(Je,{noResolve:Ge,...Y}),r(37,ua=!0)):Rt(Je,{noResolve:Ge})),s.$$.dirty[0]&536870912&&r(39,fa=I`-- Current (latest published period) stage/status trend for this area, plus the simple district and
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
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    -- #358: display label + official status trend from dbt (spec §1-§2); population drives the
    -- C2 "uninhabited only where population = 0" wording below.
    gi.stage_label,
    gi.status_trend,
    gi.population,
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
    and gi.area_code = '${m.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`),s.$$.dirty[0]&536870912&&r(40,na=`-- Current (latest published period) stage/status trend for this area, plus the simple district and
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
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    -- #358: display label + official status trend from dbt (spec §1-§2); population drives the
    -- C2 "uninhabited only where population = 0" wording below.
    gi.stage_label,
    gi.status_trend,
    gi.population,
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
    and gi.area_code = '${m.code}'
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`),s.$$.dirty[1]&1920&&(fa||!La?fa||(xt(na,{noResolve:fa,...De}),r(41,La=!0)):xt(na,{noResolve:fa})),s.$$.dirty[0]&536870912&&r(43,Ka=I`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
order by a.snapshot_year`),s.$$.dirty[0]&536870912&&r(44,Va=`with
    district_year as (
        select snapshot_year, avg(status_index) as district_avg_status_index
        from gentriduck_marts.fct_gentrification_change
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and status_index is not null
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
order by a.snapshot_year`),s.$$.dirty[1]&30720&&(Ka||!Xt?Ka||(Et(Va,{noResolve:Ka,...He}),r(45,Xt=!0)):Et(Va,{noResolve:Ka})),s.$$.dirty[0]&536870912&&r(47,Ga=I`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'`),s.$$.dirty[0]&536870912&&r(48,Ja=`select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'`),s.$$.dirty[1]&491520&&(Ga||!er?Ga||(jt(Ja,{noResolve:Ga,...Be}),r(49,er=!0)):jt(Ja,{noResolve:Ga})),s.$$.dirty[0]&536870912&&r(51,Ye=I`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
group by trajectory_type`),s.$$.dirty[0]&536870912&&r(52,Xe=`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
group by trajectory_type`),s.$$.dirty[1]&7864320&&(Ye||!Za?Ye||(_a(Xe,{noResolve:Ye,...Ze}),r(53,Za=!0)):_a(Xe,{noResolve:Ye})),s.$$.dirty[0]&536870912&&r(55,pa=I`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
group by all
order by snapshot_year`),s.$$.dirty[0]&536870912&&r(56,ea=`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
group by all
order by snapshot_year`),s.$$.dirty[1]&125829120&&(pa||!Bt?pa||(Xa(ea,{noResolve:pa,...Ya}),r(57,Bt=!0)):Xa(ea,{noResolve:pa})),s.$$.dirty[0]&536870912&&r(59,X=I`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),s.$$.dirty[0]&536870912&&r(60,$e=`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
-- stacked bar below (a second stacked bar over the same categories was judged harder to read, not
-- more informative, for a segment-count comparison).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    district_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'BER' and area_vintage = 'lor_2021'
            and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),s.$$.dirty[1]&2013265920&&(X||!Gt?X||(et($e,{noResolve:X,...aa}),r(61,Gt=!0)):et($e,{noResolve:X})),s.$$.dirty[0]&536870912&&r(63,at=I`-- #357: the mart now zero-fills domains with no POI (is_zero_filled, oa_domain NULL); the radar
-- keeps only domains with an OA value, as before.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${m.code}'
    and not is_zero_filled
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
order by oa_domain desc`),s.$$.dirty[0]&536870912&&r(64,tt=`-- #357: the mart now zero-fills domains with no POI (is_zero_filled, oa_domain NULL); the radar
-- keeps only domains with an OA value, as before.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${m.code}'
    and not is_zero_filled
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
order by oa_domain desc`),s.$$.dirty[2]&15&&(at||!ar?at||(Tt(tt,{noResolve:at,...Te}),r(65,ar=!0)):Tt(tt,{noResolve:at})),s.$$.dirty[0]&536870912&&r(67,ha=I`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series. #357: zero-filled rows (oa_domain NULL)
-- excluded explicitly; avg() would skip their NULL anyway, so the average is unchanged.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and not is_zero_filled
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
group by poi_domain_h`),s.$$.dirty[0]&536870912&&r(68,Re=`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
-- snapshot_year, for the radar's district-context series. #357: zero-filled rows (oa_domain NULL)
-- excluded explicitly; avg() would skip their NULL anyway, so the average is unchanged.
select poi_domain_h, avg(oa_domain) as district_avg_oa_domain
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'BER'
    and area_vintage = 'lor_2021'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and not is_zero_filled
    and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${m.code}'
            and oa_domain is not null
    )
group by poi_domain_h`),s.$$.dirty[2]&240&&(ha||!rt?ha||(Jt(Re,{noResolve:ha,...ta}),r(69,rt=!0)):Jt(Re,{noResolve:ha})),s.$$.dirty[0]&536870912&&r(71,Se=I`select
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
    and area_code = '${m.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${m.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`),s.$$.dirty[0]&536870912&&r(72,St=`select
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
    and area_code = '${m.code}'
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_dominance
        where
            city_code = 'BER' and is_public_safe = true and area_code = '${m.code}'
            and area_vintage = 'lor_2021' and weight_variant = 'standard'
    )
order by hhi desc`),s.$$.dirty[2]&3840&&(Se||!st?Se||(it(St,{noResolve:Se,...ra}),r(73,st=!0)):it(St,{noResolve:Se})),s.$$.dirty[0]&536870912&&r(75,ga=I`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by reference_year desc
limit 1`),s.$$.dirty[0]&536870912&&r(76,ya=`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by reference_year desc
limit 1`),s.$$.dirty[2]&61440&&(ga||!qt?ga||(Ma(ya,{noResolve:ga,...Qe}),r(77,qt=!0)):Ma(ya,{noResolve:ga})),s.$$.dirty[0]&536870912&&r(79,va=I`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[0]&536870912&&r(80,ca=`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
-- mart's own rollup) vs. Berlin as a whole (same sum-then-recompute rule, applied here one level
-- further -- display layer only, see header comment). Values pre-formatted as text in SQL (mixed
-- units -- counts, years, shares -- in one comparison column) rather than via a per-column Evidence
-- \`fmt\`, since a single DataTable column can't carry three different numeric formats.
with
    latest as (
        select max(reference_year) as reference_year
        from gentriduck_marts.mart_area_demographics
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and reference_year = (select reference_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_demographics
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[2]&983040&&(va||!Lt?va||(da(ca,{noResolve:va,...nt}),r(81,Lt=!0)):da(ca,{noResolve:va})),s.$$.dirty[0]&536870912&&r(83,ba=I`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&536870912&&r(84,$a=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[2]&15728640&&(ba||!Na?ba||(zt($a,{noResolve:ba,...ot}),r(85,Na=!0)):zt($a,{noResolve:ba})),s.$$.dirty[0]&536870912&&r(87,ka=I`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[0]&536870912&&r(88,sa=`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
-- mart's own rollup -- extensive counts, no share-weighting needed). Values pre-formatted as text
-- in SQL since some rows are plain integers and the gastro row is a percentage-bearing sentence.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'plr' and area_code = '${m.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'BER' and area_level = 'bezirk'
            and area_code = substr('${m.code}', 1, 2)
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
order by sort_order`),s.$$.dirty[2]&251658240&&(ka||!Da?ka||(Nt(sa,{noResolve:ka,...Fe}),r(89,Da=!0)):Nt(sa,{noResolve:ka})),s.$$.dirty[0]&536870912&&r(91,lt=I`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where p.city_code = 'BER' and p.area_code = '${m.code}'
order by p.snapshot_year`),s.$$.dirty[0]&536870912&&r(92,ct=`with
    district_rent as (
        select snapshot_year, avg(est_rent_mid) as district_avg_est_rent_mid
        from gentriduck_marts.mart_price_rent_dimension
        where city_code = 'BER' and substr(area_code, 1, 2) = substr('${m.code}', 1, 2)
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
where p.city_code = 'BER' and p.area_code = '${m.code}'
order by p.snapshot_year`),s.$$.dirty[2]&1879048192|s.$$.dirty[3]&1&&(lt||!rr?lt||(Dt(ct,{noResolve:lt,...We}),r(93,rr=!0)):Dt(ct,{noResolve:lt})),s.$$.dirty[0]&536870912&&r(95,Ra=I`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${m.code}'`),s.$$.dirty[0]&536870912&&r(96,xa=`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${m.code}'`),s.$$.dirty[3]&30&&(Ra||!Ht?Ra||(ja(xa,{noResolve:Ra,...Ae}),r(97,Ht=!0)):ja(xa,{noResolve:Ra})),s.$$.dirty[0]&2&&r(10,a=((L=Ca==null?void 0:Ca[0])==null?void 0:L.bezirk_name)??"its district"),s.$$.dirty[0]&1&&r(113,i=((ia=je==null?void 0:je[0])==null?void 0:ia.area_name)??null),s.$$.dirty[3]&1048576&&r(26,o=[{label:"Berlin",href:"/berlin"},{label:"All neighbourhoods",href:"/berlin/area"},{label:i??"Neighbourhood"}]),s.$$.dirty[3]&1048576&&r(25,d=i?`${i} — neighbourhood profile · Berlin`:null),s.$$.dirty[0]&4&&r(112,c=qa==null?void 0:qa[0]),s.$$.dirty[3]&524288&&r(11,h=c&&c.status_index!==null&&c.status_index!==void 0),s.$$.dirty[3]&524288&&r(12,g=(c==null?void 0:c.population)!=null&&Number(c.population)===0),s.$$.dirty[0]&6144|s.$$.dirty[3]&524288&&r(106,b=h?`${gt()} is currently ${Ha[c.stage]??`classified **${c.stage_label??"No stage on record"}**`} ([what this does and doesn't mean](/methodology)).`:g?`${gt()} is classified as **uninhabited** in Berlin's official population register (no resident population) — the social-status figures on this page do not apply here.`:`${gt()} has **no stage on record**: Berlin's latest social-monitoring edition gives it no status classification, so the social-status figures on this page do not apply here.`),s.$$.dirty[0]&3072|s.$$.dirty[3]&524288&&r(105,v=(()=>{if(!h||c.district_avg_status_index==null||c.city_avg_status_index==null)return"";const z=Number(c.status_index),K=Number(c.district_avg_status_index),Ft=Number(c.city_avg_status_index),dt=(Ke,At)=>Ke<At-.1?"less deprived than":Ke>At+.1?"more deprived than":"about the same as";return`Its social status is currently ${dt(z,K)} the ${a} average, and ${dt(z,Ft)} Berlin as a whole.`})()),s.$$.dirty[0]&128&&r(110,M=Array.isArray(ke)?ke:Array.from(ke??[])),s.$$.dirty[3]&131072&&r(111,$=M.filter(z=>Number(z.poi_count||0)>=Ki)),s.$$.dirty[3]&262144&&r(109,F=[...$].sort((z,K)=>Number(K.oa_domain)-Number(z.oa_domain)).filter(z=>Number(z.oa_domain)>=1.15).slice(0,2)),s.$$.dirty[3]&196608&&r(104,Q=(()=>{if(M.length===0)return"Too few mapped places (shops, cafés, and other points of interest) are recorded here yet to describe a commercial mix.";if(F.length===0)return"Its commercial mix — the shops, cafés, and other mapped places here — doesn't lean strongly toward any particular kind, compared to Berlin as a whole.";const z=F.map(Ft=>Ft.poi_domain_h);return`Its commercial mix leans toward ${z.length===1?z[0]:`${z[0]} and ${z[1]}`} — both make up a larger share of the local mix here than they do citywide (see the Offering Advantage profile below).`})()),s.$$.dirty[0]&8&&r(107,q=Ue==null?void 0:Ue[0]),s.$$.dirty[0]&16&&r(108,A=Array.isArray(za)?za:Array.from(za??[])),s.$$.dirty[0]&1024|s.$$.dirty[3]&49152&&r(103,G=(()=>{if(!q||q.n_editions==null)return"No multi-edition trajectory is available yet for this area.";if(q.n_editions<=1)return"Only one social-status reading is on record for this area so far, so its pace of change can't be assessed yet.";const z=q.status_delta!=null?Math.abs(Number(q.status_delta)):null,K=z==null?"at an unclear pace":z<.4?"only gradually":z<1.2?"at a moderate pace":"quickly, moving several status steps",Ft={improving:"become less deprived",declining:"become more deprived","stable-established":"stayed consistently low-deprivation","persistently-deprived":"stayed consistently high-deprivation",mixed:"shown no single clear direction"}[q.trajectory_type]??"shown an unclassified pattern";let dt=`Across the ${q.first_edition}–${q.last_edition} editions on record, it has ${Ft}, ${K} (trajectory confidence: ${q.trajectory_confidence}).`;const Ke=A.reduce((It,mt)=>It+Number(mt.n||0),0),At=A.find(It=>It.trajectory_type===q.trajectory_type);return Ke>0&&At&&(dt+=` ${At.n} of ${Ke} other areas in ${a} with a usable trajectory show this same "${q.trajectory_type}" pattern.`),dt})()),s.$$.dirty[3]&15360&&r(24,N=[b,v,Q,G].filter(Boolean).map(pr)),s.$$.dirty[0]&32&&r(102,P=Array.isArray(ht)?ht:Array.from(ht??[])),s.$$.dirty[3]&512&&r(23,U=Array.from(P.reduce((z,K)=>(z.set(K.poi_category_h,(z.get(K.poi_category_h)||0)+Number(K.poi_count||0)),z),new Map)).sort((z,K)=>K[1]-z[1]).map(([z])=>z)),s.$$.dirty[0]&64&&r(22,bt=la==null?void 0:la[0]),s.$$.dirty[0]&128&&r(101,Ta=Array.isArray(ke)?ke:Array.from(ke??[])),s.$$.dirty[0]&256&&r(100,Pe=new Map((Array.isArray(we)?we:Array.from(we??[])).map(z=>[z.poi_domain_h,Number(z.district_avg_oa_domain)]))),s.$$.dirty[3]&384&&r(9,ze=Ta.map(z=>{const K=Pe.get(z.poi_domain_h);return{domain:z.poi_domain_h,pct:(Number(z.oa_domain)-1)*100,districtPct:K!=null&&!Number.isNaN(K)?(K-1)*100:null,lowBase:Number(z.poi_count||0)<zr,poiCount:z.poi_count}})),s.$$.dirty[0]&512&&r(99,ft=Math.max(100,...ze.map(z=>z.pct),...ze.map(z=>z.districtPct??0))*1.1),s.$$.dirty[0]&512|s.$$.dirty[3]&64&&r(98,$t=ze.map(z=>({name:z.lowBase?`${z.domain} †`:z.domain,max:ft,min:sr}))),s.$$.dirty[0]&1536|s.$$.dirty[3]&32&&r(21,Yt={tooltip:{},radar:{indicator:$t,splitNumber:4,axisName:{fontSize:10}},series:[{type:"radar",data:[{value:ze.map(z=>z.pct),name:gt(),areaStyle:{opacity:.15}},{value:ze.map(z=>z.districtPct),name:`${a} average`,lineStyle:{type:"solid",width:1},areaStyle:{opacity:0},symbol:"none"},{value:ze.map(()=>0),name:"Citywide baseline (0% = Berlin average)",lineStyle:{type:"dashed",width:1},areaStyle:{opacity:0},symbol:"none"}]}]})},[je,Ca,qa,Ue,za,ht,la,ke,we,ze,a,h,g,oa,Ct,wa,tr,_t,Mt,ma,Ea,Yt,bt,U,N,d,o,Ve,p,m,Me,Ua,Qa,Wa,Y,Ge,Je,ua,De,fa,na,La,He,Ka,Va,Xt,Be,Ga,Ja,er,Ze,Ye,Xe,Za,Ya,pa,ea,Bt,aa,X,$e,Gt,Te,at,tt,ar,ta,ha,Re,rt,ra,Se,St,st,Qe,ga,ya,qt,nt,va,ca,Lt,ot,ba,$a,Na,Fe,ka,sa,Da,We,lt,ct,rr,Ae,Ra,xa,Ht,$t,ft,Pe,Ta,P,G,Q,v,b,q,A,F,M,$,c,i,pt]}class yn extends Ws{constructor(t){super(),Ks(this,t,Gi,Wi,Ds,{data:27},null,[-1,-1,-1,-1,-1])}}export{yn as component};
