import{s as xr,d as n,i as l,a as ce,b,c as g,h as Sr,e as v,f as xt,g as Ie,j as T,k as E,l as p,m as w,t as C,n as lr,o as Tr,p as Cr,q as qr,r as Mr,u as Z,v as $r,H as Hr,w as Ka}from"../chunks/scheduler.wXRIqz25.js";import{S as Gr,i as Er,d as $,t as y,a as f,c as je,m as H,b as j,e as x,g as xe}from"../chunks/index.uz5rP6Z2.js";import{A as Nr,P as Rr}from"../chunks/PageTitle.X8fTilZx.js";import{A as Dr}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Ar}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Lr}from"../chunks/HamburgTrajectoryNote.D2Jp2F4a.js";import{H as Br}from"../chunks/Hero.C0o6T8tj.js";import{N as jt}from"../chunks/NotYetPublished.Cn65vfa5.js";import{S as Fr}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as Ir}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as _r,C as Ya}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as at,w as Or}from"../chunks/entry.DotynpIs.js";import{A as St}from"../chunks/Alert.DFISYc09.js";import{e as Pr,s as Ur,Q as Fe,p as zr,a as cr,r as dr,C as Qr}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as R}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Wr}from"../chunks/stores.DJGNasUV.js";import{Q as Oe}from"../chunks/QueryViewer.RFckNDEV.js";import{B as Dt}from"../chunks/BarChart.Cy9nf948.js";import{p as Jr}from"../chunks/profile.BW8tN6E9.js";function Vr(s){var o;let t,r=(S.title??((o=S.og)==null?void 0:o.title))+"",a;return{c(){t=w("h1"),a=C(r),this.h()},l(_){t=v(_,"H1",{class:!0});var d=Ie(t);a=T(d,r),d.forEach(n),this.h()},h(){b(t,"class","title")},m(_,d){l(_,t,d),ce(t,a)},p:Z,d(_){_&&n(t)}}}function Kr(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:Z,p:Z,d:Z}}function Yr(s){var d;let t,r,a,o,_;return document.title=t=S.title??((d=S.og)==null?void 0:d.title),{c(){r=p(),a=w("meta"),o=p(),_=w("meta"),this.h()},l(c){r=g(c),a=v(c,"META",{property:!0,content:!0}),o=g(c),_=v(c,"META",{name:!0,content:!0}),this.h()},h(){var c,u;b(a,"property","og:title"),b(a,"content",((c=S.og)==null?void 0:c.title)??S.title),b(_,"name","twitter:title"),b(_,"content",((u=S.og)==null?void 0:u.title)??S.title)},m(c,u){l(c,r,u),l(c,a,u),l(c,o,u),l(c,_,u)},p(c,u){var q;u&0&&t!==(t=S.title??((q=S.og)==null?void 0:q.title))&&(document.title=t)},d(c){c&&(n(r),n(a),n(o),n(_))}}}function Xr(s){var _,d;let t,r,a=(S.description||((_=S.og)==null?void 0:_.description))&&Zr(),o=((d=S.og)==null?void 0:d.image)&&ei();return{c(){a&&a.c(),t=p(),o&&o.c(),r=xt()},l(c){a&&a.l(c),t=g(c),o&&o.l(c),r=xt()},m(c,u){a&&a.m(c,u),l(c,t,u),o&&o.m(c,u),l(c,r,u)},p(c,u){var q,D;(S.description||(q=S.og)!=null&&q.description)&&a.p(c,u),(D=S.og)!=null&&D.image&&o.p(c,u)},d(c){c&&(n(t),n(r)),a&&a.d(c),o&&o.d(c)}}}function Zr(s){let t,r,a,o,_;return{c(){t=w("meta"),r=p(),a=w("meta"),o=p(),_=w("meta"),this.h()},l(d){t=v(d,"META",{name:!0,content:!0}),r=g(d),a=v(d,"META",{property:!0,content:!0}),o=g(d),_=v(d,"META",{name:!0,content:!0}),this.h()},h(){var d,c,u;b(t,"name","description"),b(t,"content",S.description??((d=S.og)==null?void 0:d.description)),b(a,"property","og:description"),b(a,"content",((c=S.og)==null?void 0:c.description)??S.description),b(_,"name","twitter:description"),b(_,"content",((u=S.og)==null?void 0:u.description)??S.description)},m(d,c){l(d,t,c),l(d,r,c),l(d,a,c),l(d,o,c),l(d,_,c)},p:Z,d(d){d&&(n(t),n(r),n(a),n(o),n(_))}}}function ei(s){let t,r,a;return{c(){t=w("meta"),r=p(),a=w("meta"),this.h()},l(o){t=v(o,"META",{property:!0,content:!0}),r=g(o),a=v(o,"META",{name:!0,content:!0}),this.h()},h(){var o,_;b(t,"property","og:image"),b(t,"content",cr((o=S.og)==null?void 0:o.image)),b(a,"name","twitter:image"),b(a,"content",cr((_=S.og)==null?void 0:_.image))},m(o,_){l(o,t,_),l(o,r,_),l(o,a,_)},p:Z,d(o){o&&(n(t),n(r),n(a))}}}function mr(s){let t,r;return t=new Oe({props:{queryID:"stadtteil_name",queryResult:s[0]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&1&&(_.queryResult=a[0]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ur(s){let t,r;return t=new Oe({props:{queryID:"parent_info",queryResult:s[3]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&8&&(_.queryResult=a[3]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function fr(s){let t,r;return t=new Oe({props:{queryID:"children",queryResult:s[4]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&16&&(_.queryResult=a[4]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function hr(s){let t,r;return t=new Oe({props:{queryID:"stage_mix",queryResult:s[5]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&32&&(_.queryResult=a[5]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function gr(s){let t,r;return t=new Oe({props:{queryID:"stage_mix_summary",queryResult:s[1]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&2&&(_.queryResult=a[1]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ai(s){let t,r="District profile";return{c(){t=w("a"),t.textContent=r,this.h()},l(a){t=v(a,"A",{href:!0,"data-svelte-h":!0}),E(t)!=="svelte-5v523a"&&(t.textContent=r),this.h()},h(){b(t,"href","/gentriduck/hamburg/area/district")},m(a,o){l(a,t,o)},p:Z,d(a){a&&n(t)}}}function ti(s){let t,r=(s[3][0].district_name??"District profile")+"",a,o;return{c(){t=w("a"),a=C(r),this.h()},l(_){t=v(_,"A",{href:!0});var d=Ie(t);a=T(d,r),d.forEach(n),this.h()},h(){b(t,"href",o="/gentriduck/hamburg/area/district/"+s[3][0].district_code)},m(_,d){l(_,t,d),ce(t,a)},p(_,d){d[0]&8&&r!==(r=(_[3][0].district_name??"District profile")+"")&&Ka(a,r),d[0]&8&&o!==(o="/gentriduck/hamburg/area/district/"+_[3][0].district_code)&&b(t,"href",o)},d(_){_&&n(t)}}}function ri(s){let t,r,a="counts and sums",o,_,d="methodology page",c;return{c(){t=C("Figures on this page are "),r=w("b"),r.textContent=a,o=C(` over this Stadtteil's statistische Gebiete —
  never a separately re-scored index. See the `),_=w("a"),_.textContent=d,c=C(` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (listed further down) for its
  stage and trajectory.`),this.h()},l(u){t=T(u,"Figures on this page are "),r=v(u,"B",{"data-svelte-h":!0}),E(r)!=="svelte-1143tv"&&(r.textContent=a),o=T(u,` over this Stadtteil's statistische Gebiete —
  never a separately re-scored index. See the `),_=v(u,"A",{href:!0,"data-svelte-h":!0}),E(_)!=="svelte-1l2pw3"&&(_.textContent=d),c=T(u,` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (listed further down) for its
  stage and trajectory.`),this.h()},h(){b(_,"href","/gentriduck/methodology")},m(u,q){l(u,t,q),l(u,r,q),l(u,o,q),l(u,_,q),l(u,c,q)},p:Z,d(u){u&&(n(t),n(r),n(o),n(_),n(c))}}}function ii(s){let t,r;return t=new St({props:{status:"warning",$$slots:{default:[ni]},$$scope:{ctx:s}}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[2]&8388608&&(_.$$scope={dirty:o,ctx:a}),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function si(s){let t,r;return{c(){t=w("p"),r=new Hr(!1),this.h()},l(a){t=v(a,"P",{});var o=Ie(t);r=$r(o,!1),o.forEach(n),this.h()},h(){r.a=null},m(a,o){l(a,t,o),r.m(s[12],t)},p(a,o){o[0]&4096&&r.p(a[12])},i:Z,o:Z,d(a){a&&n(t)}}}function ni(s){let t;return{c(){t=C("No Gebiet stage data available for this Stadtteil.")},l(r){t=T(r,"No Gebiet stage data available for this Stadtteil.")},m(r,a){l(r,t,a)},d(r){r&&n(t)}}}function pr(s){let t,r;return t=new Oe({props:{queryID:"trajectory_mix",queryResult:s[6]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&64&&(_.queryResult=a[6]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function yr(s){let t,r;return t=new Oe({props:{queryID:"trajectory_mix_summary",queryResult:s[2]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&4&&(_.queryResult=a[2]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function oi(s){let t,r;return t=new St({props:{status:"warning",$$slots:{default:[_i]},$$scope:{ctx:s}}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[2]&8388608&&(_.$$scope={dirty:o,ctx:a}),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function li(s){let t,r;return{c(){t=w("p"),r=new Hr(!1),this.h()},l(a){t=v(a,"P",{});var o=Ie(t);r=$r(o,!1),o.forEach(n),this.h()},h(){r.a=null},m(a,o){l(a,t,o),r.m(s[11],t)},p(a,o){o[0]&2048&&r.p(a[11])},i:Z,o:Z,d(a){a&&n(t)}}}function _i(s){let t;return{c(){t=C("No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.")},l(r){t=T(r,"No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.")},m(r,a){l(r,t,a)},d(r){r&&n(t)}}}function br(s){let t,r;return t=new Oe({props:{queryID:"poi_mix",queryResult:s[7]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&128&&(_.queryResult=a[7]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ci(s){let t;return{c(){t=C(`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page, linked below.`)},l(r){t=T(r,`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page, linked below.`)},m(r,a){l(r,t,a)},d(r){r&&n(t)}}}function di(s){let t;return{c(){t=C(`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},l(r){t=T(r,`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},m(r,a){l(r,t,a)},d(r){r&&n(t)}}}function mi(s){let t;return{c(){t=C(`Hamburg's population-register figures do exist at Stadtteil level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},l(r){t=T(r,`Hamburg's population-register figures do exist at Stadtteil level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},m(r,a){l(r,t,a)},d(r){r&&n(t)}}}function vr(s){let t,r;return t=new Oe({props:{queryID:"amenities_current",queryResult:s[8]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&256&&(_.queryResult=a[8]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function wr(s){let t,r;return t=new Oe({props:{queryID:"amenities_table",queryResult:s[9]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&512&&(_.queryResult=a[9]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ui(s){let t;return{c(){t=C("No amenity data is available for this Stadtteil yet.")},l(r){t=T(r,"No amenity data is available for this Stadtteil yet.")},m(r,a){l(r,t,a)},p:Z,d(r){r&&n(t)}}}function fi(s){let t,r,a=s[8][0].snapshot_year+"",o,_;return{c(){t=C("Based on OpenStreetMap tagging as of "),r=w("b"),o=C(a),_=C(`, this Stadtteil has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(d){t=T(d,"Based on OpenStreetMap tagging as of "),r=v(d,"B",{});var c=Ie(r);o=T(c,a),c.forEach(n),_=T(d,`, this Stadtteil has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(d,c){l(d,t,c),l(d,r,c),ce(r,o),l(d,_,c)},p(d,c){c[0]&256&&a!==(a=d[8][0].snapshot_year+"")&&Ka(o,a)},d(d){d&&(n(t),n(r),n(_))}}}function hi(s){let t,r,a,o,_,d;return t=new Ya({props:{id:"indicator",title:"Infrastructure"}}),a=new Ya({props:{id:"area_value",title:"This area"}}),_=new Ya({props:{id:"district_value",title:"District total"}}),{c(){x(t.$$.fragment),r=p(),x(a.$$.fragment),o=p(),x(_.$$.fragment)},l(c){j(t.$$.fragment,c),r=g(c),j(a.$$.fragment,c),o=g(c),j(_.$$.fragment,c)},m(c,u){H(t,c,u),l(c,r,u),H(a,c,u),l(c,o,u),H(_,c,u),d=!0},p:Z,i(c){d||(f(t.$$.fragment,c),f(a.$$.fragment,c),f(_.$$.fragment,c),d=!0)},o(c){y(t.$$.fragment,c),y(a.$$.fragment,c),y(_.$$.fragment,c),d=!1},d(c){c&&(n(r),n(o)),$(t,c),$(a,c),$(_,c)}}}function gi(s){let t,r,a="0",o,_,d="open-data",c;return{c(){t=C("These figures come from OpenStreetMap tagging, not an official registry. A "),r=w("b"),r.textContent=a,o=C(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),_=w("a"),_.textContent=d,c=C(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(u){t=T(u,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=v(u,"B",{"data-svelte-h":!0}),E(r)!=="svelte-12bhsds"&&(r.textContent=a),o=T(u,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),_=v(u,"A",{href:!0,"data-svelte-h":!0}),E(_)!=="svelte-1jijq3i"&&(_.textContent=d),c=T(u,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){b(_,"href","/gentriduck/open-data")},m(u,q){l(u,t,q),l(u,r,q),l(u,o,q),l(u,_,q),l(u,c,q)},p:Z,d(u){u&&(n(t),n(r),n(o),n(_),n(c))}}}function pi(s){let t;return{c(){t=C(`There isn't enough tagged cuisine data in this Stadtteil yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=T(r,`There isn't enough tagged cuisine data in this Stadtteil yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){l(r,t,a)},p:Z,d(r){r&&n(t)}}}function yi(s){let t,r,a=s[8][0].gastro_poi_with_cuisine_count+"",o,_;return{c(){t=C("Cuisine is tagged for "),r=w("b"),o=C(a),_=C(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(d){t=T(d,"Cuisine is tagged for "),r=v(d,"B",{});var c=Ie(r);o=T(c,a),c.forEach(n),_=T(d,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(d,c){l(d,t,c),l(d,r,c),ce(r,o),l(d,_,c)},p(d,c){c[0]&256&&a!==(a=d[8][0].gastro_poi_with_cuisine_count+"")&&Ka(o,a)},d(d){d&&(n(t),n(r),n(_))}}}function bi(s){let t,r,a=s[8][0].gastro_poi_with_cuisine_count+"",o,_,d,c="most common cuisine",u,q,D=s[8][0].dominant_cuisine+"",K,he,m=Math.round(s[8][0].dominant_cuisine_share*100)+"",ke,ee;return{c(){t=C("Among "),r=w("b"),o=C(a),_=C(` restaurants/cafes with cuisine
data tagged in this Stadtteil, the `),d=w("b"),d.textContent=c,u=C(` is
`),q=w("b"),K=C(D),he=C(`
(`),ke=C(m),ee=C("% of cuisine-tagged restaurants/cafes).")},l(M){t=T(M,"Among "),r=v(M,"B",{});var G=Ie(r);o=T(G,a),G.forEach(n),_=T(M,` restaurants/cafes with cuisine
data tagged in this Stadtteil, the `),d=v(M,"B",{"data-svelte-h":!0}),E(d)!=="svelte-1floooe"&&(d.textContent=c),u=T(M,` is
`),q=v(M,"B",{});var V=Ie(q);K=T(V,D),V.forEach(n),he=T(M,`
(`),ke=T(M,m),ee=T(M,"% of cuisine-tagged restaurants/cafes).")},m(M,G){l(M,t,G),l(M,r,G),ce(r,o),l(M,_,G),l(M,d,G),l(M,u,G),l(M,q,G),ce(q,K),l(M,he,G),l(M,ke,G),l(M,ee,G)},p(M,G){G[0]&256&&a!==(a=M[8][0].gastro_poi_with_cuisine_count+"")&&Ka(o,a),G[0]&256&&D!==(D=M[8][0].dominant_cuisine+"")&&Ka(K,D),G[0]&256&&m!==(m=Math.round(M[8][0].dominant_cuisine_share*100)+"")&&Ka(ke,m)},d(M){M&&(n(t),n(r),n(_),n(d),n(u),n(q),n(he),n(ke),n(ee))}}}function vi(s){let t;return{c(){t=C(`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, current state only),
  and its sign-off (#303) requires a Hamburg-specific methodology disclosure before any of it is
  shown publicly — that has not been done yet.`)},l(r){t=T(r,`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, current state only),
  and its sign-off (#303) requires a Hamburg-specific methodology disclosure before any of it is
  shown publicly — that has not been done yet.`)},m(r,a){l(r,t,a)},d(r){r&&n(t)}}}function kr(s){let t,r;return t=new Oe({props:{queryID:"minimap_areas",queryResult:s[10]}}),{c(){x(t.$$.fragment)},l(a){j(t.$$.fragment,a)},m(a,o){H(t,a,o),r=!0},p(a,o){const _={};o[0]&1024&&(_.queryResult=a[10]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function wi(s){let t,r,a,o,_,d;return t=new Ya({props:{id:"gebiet_name",title:"Statistisches Gebiet"}}),a=new Ya({props:{id:"stage",title:"Stage",wrap:"true"}}),_=new Ya({props:{id:"status_trend",title:"Status trend"}}),{c(){x(t.$$.fragment),r=p(),x(a.$$.fragment),o=p(),x(_.$$.fragment)},l(c){j(t.$$.fragment,c),r=g(c),j(a.$$.fragment,c),o=g(c),j(_.$$.fragment,c)},m(c,u){H(t,c,u),l(c,r,u),H(a,c,u),l(c,o,u),H(_,c,u),d=!0},p:Z,i(c){d||(f(t.$$.fragment,c),f(a.$$.fragment,c),f(_.$$.fragment,c),d=!0)},o(c){y(t.$$.fragment,c),y(a.$$.fragment,c),y(_.$$.fragment,c),d=!1},d(c){c&&(n(r),n(o)),$(t,c),$(a,c),$(_,c)}}}function ki(s){var er;let t,r,a,o,_,d,c,u,q,D,K,he,m,ke,ee,M,G,V,h,de,Pe="all Stadtteile",ra,ge,Pa="all districts",Da,me,Ue="all Gebiete",ze,Se,da,$e,Qe='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Te,pe,Ua=`Every statistisches Gebiet in this Stadtteil is individually classified into one of six
gentrification stages from Hamburg&#39;s own Sozialmonitoring (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This
page reports the <strong class="markdown">distribution</strong> of those Gebiet-level stages — never a single re-scored index
value for the Stadtteil itself. Hamburg&#39;s stages are <strong class="markdown">not directly equivalent</strong> to same-named
Berlin stages (Hamburg&#39;s Dynamik window is 3 years, Berlin&#39;s 2; <a href="/gentriduck/methodology" class="markdown">methodology §6</a>).`,ma,ae,A,ye,be,ua,De,fa,te,We=`Which Gebiete belong to this Stadtteil comes from a spatial crosswalk (each Gebiet assigned to the
Stadtteil that contains it; OA-D1b, #240), not from the Gebiet codes themselves.`,Je,re,za='<a href="#trajectory-mix-20192025">Trajectory mix, 2019–2025</a>',ha,ue,Ce,qe,Ve,ie,se,ve,ne,Ke,oe,Qa='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ga,Y,Ye='<a href="#mapped-places">Mapped places</a>',Xe,Ze,Me,pa,le,ea=`These are OpenStreetMap-derived counts; OSM coverage is not spatially neutral (poorer or peripheral
areas tend to be less thoroughly mapped, Haklay 2010), so a low count can be a coverage gap rather
than a real absence. See the <a href="/gentriduck/hamburg/poi-map" class="markdown">Hamburg POI map</a> for the per-Gebiet picture.`,aa,He,Wa='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',ya,_e,Ge,fe,Ja='<a href="#within-group-dominance">Within-group dominance</a>',ba,Ee,Ne,X,va='<a href="#people--structure">People &amp; structure</a>',wa,Re,ka,k,$a='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Ha,we,ta,Aa,tt,ja,rt,xa,it,La,st,Ba,At=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,nt,ia,Lt='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',ot,Sa,lt,sa,Bt='<a href="#where-this-area-sits">Where this area sits</a>',_t,Va,Ta,ct,na,Ft='<a href="#gebiete-in-this-stadtteil">Gebiete in this Stadtteil</a>',dt,Ca,mt,Fa,ut,qa,It=`The parent district ("Up:" above) is a source-provided attribute of Hamburg's Stadtteil geodata;
the Gebiet list comes from the OA-D1b (#240) spatial crosswalk. Both are published through`,ft,Ia,Ot="mart_area_hierarchy",ht,oa,Pt='<a href="#honest-caveats">Honest caveats</a>',gt,Ma,Ut=`<li class="markdown"><strong class="markdown">Stadtteil figures are counts and sums of its Gebiete, never a re-scored index</strong> — the stage and
trajectory sections show how this Stadtteil&#39;s Gebiete are distributed, not a single value for
the Stadtteil.</li> <li class="markdown"><strong class="markdown">Hamburg&#39;s stages are not directly equivalent to same-named Berlin stages</strong> — Hamburg&#39;s Dynamik
window is 3 years, Berlin&#39;s 2 (<a href="/gentriduck/methodology" class="markdown">methodology §6</a>, points 1 and 4).</li> <li class="markdown"><strong class="markdown">The trajectory mix describes a recent ~6-year (2019–2025) window</strong>, not full history, and is a
<strong class="markdown">status-only classification</strong>, never a displacement verdict.</li> <li class="markdown"><strong class="markdown">Mapped-place counts come from OpenStreetMap</strong>, whose coverage varies by area and grew over time.</li> <li class="markdown"><strong class="markdown">Some Berlin sections are not shown for Hamburg</strong> — the Offering Advantage roll-up, within-group
dominance, people &amp; structure, and land value &amp; rent — each with its reason in its own section
above. See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory and
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from Berlin&#39;s.</li>`,pt,la,zt='<a href="#further-reading">Further reading</a>',yt,Ga,Qt=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a>
(switch the area level to Stadtteil for this Stadtteil&#39;s stage mix on the map),
<a href="/gentriduck/hamburg/area-detail" class="markdown">browse by district</a> for other areas, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,bt,Xa,vt,Oa,wt,_a=typeof S<"u"&&(S.title||((er=S.og)==null?void 0:er.title))&&S.hide_title!==!0&&Vr();function jr(e,i){var N;return typeof S<"u"&&(S.title||(N=S.og)!=null&&N.title)?Yr:Kr}let Za=jr()(s),ca=typeof S=="object"&&Xr(),L=s[0]&&mr(s),B=s[3]&&ur(s),F=s[4]&&fr(s),I=s[5]&&hr(s),O=s[1]&&gr(s);K=new Nr({props:{crumbs:s[14]}}),m=new Rr({props:{title:s[13]}}),ee=new Br({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]?s[0][0].area_name:"Stadtteil")+" — Stadtteil profile",lede:"Neighbourhood-stage mix, trajectory mix, commercial mix, and everyday amenities for this Stadtteil, counted from its constituent statistische Gebiete — never a re-scored index at this grain."}});function Wt(e,i){var N;return(N=e[3][0])!=null&&N.district_code?ti:ai}let kt=Wt(s),Ae=kt(s);Se=new St({props:{status:"info",$$slots:{default:[ri]},$$scope:{ctx:s}}});const Jt=[si,ii],Ea=[];function Vt(e,i){return e[12]?0:1}ae=Vt(s),A=Ea[ae]=Jt[ae](s),be=new Dt({props:{data:s[5],x:"stage",y:"n_areas",title:"Gebiete by current stage, "+(s[0][0]?s[0][0].area_name:"this Stadtteil"),swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}},emptySet:"warn",emptyMessage:"No Gebiet stage data for this Stadtteil."}}),De=new Fr({}),ue=new Lr({props:{subject:"each Gebiet"}});let P=s[6]&&pr(s),U=s[2]&&yr(s);const Kt=[li,oi],Na=[];function Yt(e,i){return e[11]?0:1}ie=Yt(s),se=Na[ie]=Kt[ie](s),ne=new Dt({props:{data:s[6],x:"trajectory_type",y:"n_areas",title:"Gebiete by trajectory classification, 2019–2025 ("+(s[0][0]?s[0][0].area_name:"this Stadtteil")+")",swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet trajectory data for this Stadtteil."}});let z=s[7]&&br(s);Me=new Dt({props:{data:s[7],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(s[0][0]?s[0][0].area_name:"this Stadtteil"),swapXY:"true",emptySet:"warn",emptyMessage:"No mapped places recorded for this Stadtteil."}}),_e=new jt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"This Stadtteil's Offering Advantage roll-up (Berlin's coarse pages show one per domain)",$$slots:{default:[ci]},$$scope:{ctx:s}}}),Ee=new jt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Within-group dominance for this Stadtteil's Gebiete",$$slots:{default:[di]},$$scope:{ctx:s}}}),Re=new jt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Population and composition sums for this Stadtteil",$$slots:{default:[mi]},$$scope:{ctx:s}}});let Q=s[8]&&vr(s),W=s[9]&&wr(s);function Xt(e,i){var N;return(N=e[8][0])!=null&&N.snapshot_year?fi:ui}let $t=Xt(s),Le=$t(s);ja=new _r({props:{data:s[9],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[hi]},$$scope:{ctx:s}}}),xa=new St({props:{status:"info",$$slots:{default:[gi]},$$scope:{ctx:s}}});function Zt(e,i){var N,Ra;return(N=e[8][0])!=null&&N.snapshot_year&&e[8][0].gastro_poi_with_cuisine_count>=8&&e[8][0].dominant_cuisine_share>=.15?bi:(Ra=e[8][0])!=null&&Ra.snapshot_year&&e[8][0].gastro_poi_with_cuisine_count>=8?yi:pi}let Ht=Zt(s),Be=Ht(s);Sa=new jt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Land value and estimated rent for this Stadtteil",$$slots:{default:[vi]},$$scope:{ctx:s}}});let J=s[10]&&kr(s);return Ta=new Dr({props:{data:s[10],geoJsonUrl:`${at}/geo/subarea_l1_subarea_l2_drilldown.geojson`,title:(s[0][0]?s[0][0].area_name:"This Stadtteil")+" and its statistische Gebiete"}}),Ca=new _r({props:{data:s[4],rows:"20",link:"gebiet_link",emptySet:"warn",emptyMessage:"No constituent Gebiete found for this Stadtteil.",$$slots:{default:[wi]},$$scope:{ctx:s}}}),Fa=new Ir({}),Oa=new Ar({}),{c(){_a&&_a.c(),t=p(),Za.c(),r=w("meta"),a=w("meta"),ca&&ca.c(),o=xt(),_=p(),L&&L.c(),d=p(),B&&B.c(),c=p(),F&&F.c(),u=p(),I&&I.c(),q=p(),O&&O.c(),D=p(),x(K.$$.fragment),he=p(),x(m.$$.fragment),ke=p(),x(ee.$$.fragment),M=p(),G=w("p"),V=C("Up: "),Ae.c(),h=C(" · "),de=w("a"),de.textContent=Pe,ra=C(" · "),ge=w("a"),ge.textContent=Pa,Da=C(" · "),me=w("a"),me.textContent=Ue,ze=p(),x(Se.$$.fragment),da=p(),$e=w("h2"),$e.innerHTML=Qe,Te=p(),pe=w("p"),pe.innerHTML=Ua,ma=p(),A.c(),ye=p(),x(be.$$.fragment),ua=p(),x(De.$$.fragment),fa=p(),te=w("p"),te.textContent=We,Je=p(),re=w("h3"),re.innerHTML=za,ha=p(),x(ue.$$.fragment),Ce=p(),P&&P.c(),qe=p(),U&&U.c(),Ve=p(),se.c(),ve=p(),x(ne.$$.fragment),Ke=p(),oe=w("h2"),oe.innerHTML=Qa,ga=p(),Y=w("h3"),Y.innerHTML=Ye,Xe=p(),z&&z.c(),Ze=p(),x(Me.$$.fragment),pa=p(),le=w("p"),le.innerHTML=ea,aa=p(),He=w("h3"),He.innerHTML=Wa,ya=p(),x(_e.$$.fragment),Ge=p(),fe=w("h2"),fe.innerHTML=Ja,ba=p(),x(Ee.$$.fragment),Ne=p(),X=w("h2"),X.innerHTML=va,wa=p(),x(Re.$$.fragment),ka=p(),k=w("h2"),k.innerHTML=$a,Ha=p(),Q&&Q.c(),we=p(),W&&W.c(),ta=p(),Aa=w("p"),Le.c(),tt=p(),x(ja.$$.fragment),rt=p(),x(xa.$$.fragment),it=p(),La=w("p"),Be.c(),st=p(),Ba=w("p"),Ba.textContent=At,nt=p(),ia=w("h2"),ia.innerHTML=Lt,ot=p(),x(Sa.$$.fragment),lt=p(),sa=w("h2"),sa.innerHTML=Bt,_t=p(),J&&J.c(),Va=p(),x(Ta.$$.fragment),ct=p(),na=w("h3"),na.innerHTML=Ft,dt=p(),x(Ca.$$.fragment),mt=p(),x(Fa.$$.fragment),ut=p(),qa=w("p"),qa.textContent=It,ft=p(),Ia=w("code"),Ia.textContent=Ot,ht=C(` (#302) without re-deciding either method.
`),oa=w("h2"),oa.innerHTML=Pt,gt=p(),Ma=w("ul"),Ma.innerHTML=Ut,pt=p(),la=w("h2"),la.innerHTML=zt,yt=p(),Ga=w("p"),Ga.innerHTML=Qt,bt=p(),Xa=w("hr"),vt=p(),x(Oa.$$.fragment),this.h()},l(e){_a&&_a.l(e),t=g(e);const i=Sr("svelte-2igo1p",document.head);Za.l(i),r=v(i,"META",{name:!0,content:!0}),a=v(i,"META",{name:!0,content:!0}),ca&&ca.l(i),o=xt(),i.forEach(n),_=g(e),L&&L.l(e),d=g(e),B&&B.l(e),c=g(e),F&&F.l(e),u=g(e),I&&I.l(e),q=g(e),O&&O.l(e),D=g(e),j(K.$$.fragment,e),he=g(e),j(m.$$.fragment,e),ke=g(e),j(ee.$$.fragment,e),M=g(e),G=v(e,"P",{});var N=Ie(G);V=T(N,"Up: "),Ae.l(N),h=T(N," · "),de=v(N,"A",{href:!0,"data-svelte-h":!0}),E(de)!=="svelte-1wjc2nq"&&(de.textContent=Pe),ra=T(N," · "),ge=v(N,"A",{href:!0,"data-svelte-h":!0}),E(ge)!=="svelte-46ercb"&&(ge.textContent=Pa),Da=T(N," · "),me=v(N,"A",{href:!0,"data-svelte-h":!0}),E(me)!=="svelte-1qtzle"&&(me.textContent=Ue),N.forEach(n),ze=g(e),j(Se.$$.fragment,e),da=g(e),$e=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E($e)!=="svelte-14f17uo"&&($e.innerHTML=Qe),Te=g(e),pe=v(e,"P",{class:!0,"data-svelte-h":!0}),E(pe)!=="svelte-c9hxsx"&&(pe.innerHTML=Ua),ma=g(e),A.l(e),ye=g(e),j(be.$$.fragment,e),ua=g(e),j(De.$$.fragment,e),fa=g(e),te=v(e,"P",{class:!0,"data-svelte-h":!0}),E(te)!=="svelte-7ydgxc"&&(te.textContent=We),Je=g(e),re=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(re)!=="svelte-1mar2ld"&&(re.innerHTML=za),ha=g(e),j(ue.$$.fragment,e),Ce=g(e),P&&P.l(e),qe=g(e),U&&U.l(e),Ve=g(e),se.l(e),ve=g(e),j(ne.$$.fragment,e),Ke=g(e),oe=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(oe)!=="svelte-1i9w9pn"&&(oe.innerHTML=Qa),ga=g(e),Y=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(Y)!=="svelte-3hvew3"&&(Y.innerHTML=Ye),Xe=g(e),z&&z.l(e),Ze=g(e),j(Me.$$.fragment,e),pa=g(e),le=v(e,"P",{class:!0,"data-svelte-h":!0}),E(le)!=="svelte-bgis0r"&&(le.innerHTML=ea),aa=g(e),He=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(He)!=="svelte-5mc7pd"&&(He.innerHTML=Wa),ya=g(e),j(_e.$$.fragment,e),Ge=g(e),fe=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(fe)!=="svelte-4kb45v"&&(fe.innerHTML=Ja),ba=g(e),j(Ee.$$.fragment,e),Ne=g(e),X=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(X)!=="svelte-1mdzqzc"&&(X.innerHTML=va),wa=g(e),j(Re.$$.fragment,e),ka=g(e),k=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(k)!=="svelte-12k6lqd"&&(k.innerHTML=$a),Ha=g(e),Q&&Q.l(e),we=g(e),W&&W.l(e),ta=g(e),Aa=v(e,"P",{});var Ra=Ie(Aa);Le.l(Ra),Ra.forEach(n),tt=g(e),j(ja.$$.fragment,e),rt=g(e),j(xa.$$.fragment,e),it=g(e),La=v(e,"P",{});var et=Ie(La);Be.l(et),et.forEach(n),st=g(e),Ba=v(e,"P",{"data-svelte-h":!0}),E(Ba)!=="svelte-ja6pm6"&&(Ba.textContent=At),nt=g(e),ia=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(ia)!=="svelte-13a10dj"&&(ia.innerHTML=Lt),ot=g(e),j(Sa.$$.fragment,e),lt=g(e),sa=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(sa)!=="svelte-60cjj9"&&(sa.innerHTML=Bt),_t=g(e),J&&J.l(e),Va=g(e),j(Ta.$$.fragment,e),ct=g(e),na=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(na)!=="svelte-eb6276"&&(na.innerHTML=Ft),dt=g(e),j(Ca.$$.fragment,e),mt=g(e),j(Fa.$$.fragment,e),ut=g(e),qa=v(e,"P",{class:!0,"data-svelte-h":!0}),E(qa)!=="svelte-mfbbhh"&&(qa.textContent=It),ft=g(e),Ia=v(e,"CODE",{"data-svelte-h":!0}),E(Ia)!=="svelte-1tryhly"&&(Ia.textContent=Ot),ht=T(e,` (#302) without re-deciding either method.
`),oa=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(oa)!=="svelte-ad0syq"&&(oa.innerHTML=Pt),gt=g(e),Ma=v(e,"UL",{class:!0,"data-svelte-h":!0}),E(Ma)!=="svelte-1a4lwq8"&&(Ma.innerHTML=Ut),pt=g(e),la=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(la)!=="svelte-oimjns"&&(la.innerHTML=zt),yt=g(e),Ga=v(e,"P",{class:!0,"data-svelte-h":!0}),E(Ga)!=="svelte-1q7n514"&&(Ga.innerHTML=Qt),bt=g(e),Xa=v(e,"HR",{class:!0}),vt=g(e),j(Oa.$$.fragment,e),this.h()},h(){b(r,"name","twitter:card"),b(r,"content","summary_large_image"),b(a,"name","twitter:site"),b(a,"content","@evidence_dev"),b(de,"href","/gentriduck/hamburg/area/subarea_l1"),b(ge,"href","/gentriduck/hamburg/area/district"),b(me,"href","/gentriduck/hamburg/area"),b($e,"class","markdown"),b($e,"id","social-status--trajectory"),b(pe,"class","markdown"),b(te,"class","markdown"),b(re,"class","markdown"),b(re,"id","trajectory-mix-20192025"),b(oe,"class","markdown"),b(oe,"id","commercial-mix--offering-advantage"),b(Y,"class","markdown"),b(Y,"id","mapped-places"),b(le,"class","markdown"),b(He,"class","markdown"),b(He,"id","offering-advantage-across-the-area-hierarchy"),b(fe,"class","markdown"),b(fe,"id","within-group-dominance"),b(X,"class","markdown"),b(X,"id","people--structure"),b(k,"class","markdown"),b(k,"id","amenities--everyday-infrastructure"),b(ia,"class","markdown"),b(ia,"id","land-value--estimated-rent"),b(sa,"class","markdown"),b(sa,"id","where-this-area-sits"),b(na,"class","markdown"),b(na,"id","gebiete-in-this-stadtteil"),b(qa,"class","markdown"),b(oa,"class","markdown"),b(oa,"id","honest-caveats"),b(Ma,"class","markdown"),b(la,"class","markdown"),b(la,"id","further-reading"),b(Ga,"class","markdown"),b(Xa,"class","markdown")},m(e,i){_a&&_a.m(e,i),l(e,t,i),Za.m(document.head,null),ce(document.head,r),ce(document.head,a),ca&&ca.m(document.head,null),ce(document.head,o),l(e,_,i),L&&L.m(e,i),l(e,d,i),B&&B.m(e,i),l(e,c,i),F&&F.m(e,i),l(e,u,i),I&&I.m(e,i),l(e,q,i),O&&O.m(e,i),l(e,D,i),H(K,e,i),l(e,he,i),H(m,e,i),l(e,ke,i),H(ee,e,i),l(e,M,i),l(e,G,i),ce(G,V),Ae.m(G,null),ce(G,h),ce(G,de),ce(G,ra),ce(G,ge),ce(G,Da),ce(G,me),l(e,ze,i),H(Se,e,i),l(e,da,i),l(e,$e,i),l(e,Te,i),l(e,pe,i),l(e,ma,i),Ea[ae].m(e,i),l(e,ye,i),H(be,e,i),l(e,ua,i),H(De,e,i),l(e,fa,i),l(e,te,i),l(e,Je,i),l(e,re,i),l(e,ha,i),H(ue,e,i),l(e,Ce,i),P&&P.m(e,i),l(e,qe,i),U&&U.m(e,i),l(e,Ve,i),Na[ie].m(e,i),l(e,ve,i),H(ne,e,i),l(e,Ke,i),l(e,oe,i),l(e,ga,i),l(e,Y,i),l(e,Xe,i),z&&z.m(e,i),l(e,Ze,i),H(Me,e,i),l(e,pa,i),l(e,le,i),l(e,aa,i),l(e,He,i),l(e,ya,i),H(_e,e,i),l(e,Ge,i),l(e,fe,i),l(e,ba,i),H(Ee,e,i),l(e,Ne,i),l(e,X,i),l(e,wa,i),H(Re,e,i),l(e,ka,i),l(e,k,i),l(e,Ha,i),Q&&Q.m(e,i),l(e,we,i),W&&W.m(e,i),l(e,ta,i),l(e,Aa,i),Le.m(Aa,null),l(e,tt,i),H(ja,e,i),l(e,rt,i),H(xa,e,i),l(e,it,i),l(e,La,i),Be.m(La,null),l(e,st,i),l(e,Ba,i),l(e,nt,i),l(e,ia,i),l(e,ot,i),H(Sa,e,i),l(e,lt,i),l(e,sa,i),l(e,_t,i),J&&J.m(e,i),l(e,Va,i),H(Ta,e,i),l(e,ct,i),l(e,na,i),l(e,dt,i),H(Ca,e,i),l(e,mt,i),H(Fa,e,i),l(e,ut,i),l(e,qa,i),l(e,ft,i),l(e,Ia,i),l(e,ht,i),l(e,oa,i),l(e,gt,i),l(e,Ma,i),l(e,pt,i),l(e,la,i),l(e,yt,i),l(e,Ga,i),l(e,bt,i),l(e,Xa,i),l(e,vt,i),H(Oa,e,i),wt=!0},p(e,i){var or;typeof S<"u"&&(S.title||(or=S.og)!=null&&or.title)&&S.hide_title!==!0&&_a.p(e,i),Za.p(e,i),typeof S=="object"&&ca.p(e,i),e[0]?L?(L.p(e,i),i[0]&1&&f(L,1)):(L=mr(e),L.c(),f(L,1),L.m(d.parentNode,d)):L&&(xe(),y(L,1,1,()=>{L=null}),je()),e[3]?B?(B.p(e,i),i[0]&8&&f(B,1)):(B=ur(e),B.c(),f(B,1),B.m(c.parentNode,c)):B&&(xe(),y(B,1,1,()=>{B=null}),je()),e[4]?F?(F.p(e,i),i[0]&16&&f(F,1)):(F=fr(e),F.c(),f(F,1),F.m(u.parentNode,u)):F&&(xe(),y(F,1,1,()=>{F=null}),je()),e[5]?I?(I.p(e,i),i[0]&32&&f(I,1)):(I=hr(e),I.c(),f(I,1),I.m(q.parentNode,q)):I&&(xe(),y(I,1,1,()=>{I=null}),je()),e[1]?O?(O.p(e,i),i[0]&2&&f(O,1)):(O=gr(e),O.c(),f(O,1),O.m(D.parentNode,D)):O&&(xe(),y(O,1,1,()=>{O=null}),je());const N={};i[0]&16384&&(N.crumbs=e[14]),K.$set(N);const Ra={};i[0]&8192&&(Ra.title=e[13]),m.$set(Ra);const et={};i[0]&1&&(et.title=(e[0][0]?e[0][0].area_name:"Stadtteil")+" — Stadtteil profile"),ee.$set(et),kt===(kt=Wt(e))&&Ae?Ae.p(e,i):(Ae.d(1),Ae=kt(e),Ae&&(Ae.c(),Ae.m(G,h)));const ar={};i[2]&8388608&&(ar.$$scope={dirty:i,ctx:e}),Se.$set(ar);let Tt=ae;ae=Vt(e),ae===Tt?Ea[ae].p(e,i):(xe(),y(Ea[Tt],1,1,()=>{Ea[Tt]=null}),je(),A=Ea[ae],A?A.p(e,i):(A=Ea[ae]=Jt[ae](e),A.c()),f(A,1),A.m(ye.parentNode,ye));const Ct={};i[0]&32&&(Ct.data=e[5]),i[0]&1&&(Ct.title="Gebiete by current stage, "+(e[0][0]?e[0][0].area_name:"this Stadtteil")),be.$set(Ct),e[6]?P?(P.p(e,i),i[0]&64&&f(P,1)):(P=pr(e),P.c(),f(P,1),P.m(qe.parentNode,qe)):P&&(xe(),y(P,1,1,()=>{P=null}),je()),e[2]?U?(U.p(e,i),i[0]&4&&f(U,1)):(U=yr(e),U.c(),f(U,1),U.m(Ve.parentNode,Ve)):U&&(xe(),y(U,1,1,()=>{U=null}),je());let qt=ie;ie=Yt(e),ie===qt?Na[ie].p(e,i):(xe(),y(Na[qt],1,1,()=>{Na[qt]=null}),je(),se=Na[ie],se?se.p(e,i):(se=Na[ie]=Kt[ie](e),se.c()),f(se,1),se.m(ve.parentNode,ve));const Mt={};i[0]&64&&(Mt.data=e[6]),i[0]&1&&(Mt.title="Gebiete by trajectory classification, 2019–2025 ("+(e[0][0]?e[0][0].area_name:"this Stadtteil")+")"),ne.$set(Mt),e[7]?z?(z.p(e,i),i[0]&128&&f(z,1)):(z=br(e),z.c(),f(z,1),z.m(Ze.parentNode,Ze)):z&&(xe(),y(z,1,1,()=>{z=null}),je());const Gt={};i[0]&128&&(Gt.data=e[7]),i[0]&1&&(Gt.title="Mapped places by category (latest snapshot), "+(e[0][0]?e[0][0].area_name:"this Stadtteil")),Me.$set(Gt);const tr={};i[2]&8388608&&(tr.$$scope={dirty:i,ctx:e}),_e.$set(tr);const rr={};i[2]&8388608&&(rr.$$scope={dirty:i,ctx:e}),Ee.$set(rr);const ir={};i[2]&8388608&&(ir.$$scope={dirty:i,ctx:e}),Re.$set(ir),e[8]?Q?(Q.p(e,i),i[0]&256&&f(Q,1)):(Q=vr(e),Q.c(),f(Q,1),Q.m(we.parentNode,we)):Q&&(xe(),y(Q,1,1,()=>{Q=null}),je()),e[9]?W?(W.p(e,i),i[0]&512&&f(W,1)):(W=wr(e),W.c(),f(W,1),W.m(ta.parentNode,ta)):W&&(xe(),y(W,1,1,()=>{W=null}),je()),$t===($t=Xt(e))&&Le?Le.p(e,i):(Le.d(1),Le=$t(e),Le&&(Le.c(),Le.m(Aa,null)));const Et={};i[0]&512&&(Et.data=e[9]),i[2]&8388608&&(Et.$$scope={dirty:i,ctx:e}),ja.$set(Et);const sr={};i[2]&8388608&&(sr.$$scope={dirty:i,ctx:e}),xa.$set(sr),Ht===(Ht=Zt(e))&&Be?Be.p(e,i):(Be.d(1),Be=Ht(e),Be&&(Be.c(),Be.m(La,null)));const nr={};i[2]&8388608&&(nr.$$scope={dirty:i,ctx:e}),Sa.$set(nr),e[10]?J?(J.p(e,i),i[0]&1024&&f(J,1)):(J=kr(e),J.c(),f(J,1),J.m(Va.parentNode,Va)):J&&(xe(),y(J,1,1,()=>{J=null}),je());const Nt={};i[0]&1024&&(Nt.data=e[10]),i[0]&1&&(Nt.title=(e[0][0]?e[0][0].area_name:"This Stadtteil")+" and its statistische Gebiete"),Ta.$set(Nt);const Rt={};i[0]&16&&(Rt.data=e[4]),i[2]&8388608&&(Rt.$$scope={dirty:i,ctx:e}),Ca.$set(Rt)},i(e){wt||(f(L),f(B),f(F),f(I),f(O),f(K.$$.fragment,e),f(m.$$.fragment,e),f(ee.$$.fragment,e),f(Se.$$.fragment,e),f(A),f(be.$$.fragment,e),f(De.$$.fragment,e),f(ue.$$.fragment,e),f(P),f(U),f(se),f(ne.$$.fragment,e),f(z),f(Me.$$.fragment,e),f(_e.$$.fragment,e),f(Ee.$$.fragment,e),f(Re.$$.fragment,e),f(Q),f(W),f(ja.$$.fragment,e),f(xa.$$.fragment,e),f(Sa.$$.fragment,e),f(J),f(Ta.$$.fragment,e),f(Ca.$$.fragment,e),f(Fa.$$.fragment,e),f(Oa.$$.fragment,e),wt=!0)},o(e){y(L),y(B),y(F),y(I),y(O),y(K.$$.fragment,e),y(m.$$.fragment,e),y(ee.$$.fragment,e),y(Se.$$.fragment,e),y(A),y(be.$$.fragment,e),y(De.$$.fragment,e),y(ue.$$.fragment,e),y(P),y(U),y(se),y(ne.$$.fragment,e),y(z),y(Me.$$.fragment,e),y(_e.$$.fragment,e),y(Ee.$$.fragment,e),y(Re.$$.fragment,e),y(Q),y(W),y(ja.$$.fragment,e),y(xa.$$.fragment,e),y(Sa.$$.fragment,e),y(J),y(Ta.$$.fragment,e),y(Ca.$$.fragment,e),y(Fa.$$.fragment,e),y(Oa.$$.fragment,e),wt=!1},d(e){e&&(n(t),n(_),n(d),n(c),n(u),n(q),n(D),n(he),n(ke),n(M),n(G),n(ze),n(da),n($e),n(Te),n(pe),n(ma),n(ye),n(ua),n(fa),n(te),n(Je),n(re),n(ha),n(Ce),n(qe),n(Ve),n(ve),n(Ke),n(oe),n(ga),n(Y),n(Xe),n(Ze),n(pa),n(le),n(aa),n(He),n(ya),n(Ge),n(fe),n(ba),n(Ne),n(X),n(wa),n(ka),n(k),n(Ha),n(we),n(ta),n(Aa),n(tt),n(rt),n(it),n(La),n(st),n(Ba),n(nt),n(ia),n(ot),n(lt),n(sa),n(_t),n(Va),n(ct),n(na),n(dt),n(mt),n(ut),n(qa),n(ft),n(Ia),n(ht),n(oa),n(gt),n(Ma),n(pt),n(la),n(yt),n(Ga),n(bt),n(Xa),n(vt)),_a&&_a.d(e),Za.d(e),n(r),n(a),ca&&ca.d(e),n(o),L&&L.d(e),B&&B.d(e),F&&F.d(e),I&&I.d(e),O&&O.d(e),$(K,e),$(m,e),$(ee,e),Ae.d(),$(Se,e),Ea[ae].d(e),$(be,e),$(De,e),$(ue,e),P&&P.d(e),U&&U.d(e),Na[ie].d(e),$(ne,e),z&&z.d(e),$(Me,e),$(_e,e),$(Ee,e),$(Re,e),Q&&Q.d(e),W&&W.d(e),Le.d(),$(ja,e),$(xa,e),Be.d(),$(Sa,e),J&&J.d(e),$(Ta,e),$(Ca,e),$(Fa,e),$(Oa,e)}}}const S={};function $i(s,t,r){let a,o,_,d,c,u,q,D,K;lr(s,Wr,k=>r(65,D=k)),lr(s,dr,k=>r(70,K=k));let{data:he}=t,{data:m={},customFormattingSettings:ke,__db:ee,inputs:M}=he;Tr(dr,K="942e554bfdff103e6542015d14f614c7",K);let G=Pr(Or(M));Cr(G.subscribe(k=>M=k)),qr(Qr,{getCustomFormats:()=>ke.customFormats||[]});const V=(k,$a)=>Jr(ee.query,k,{query_name:$a});Ur(V);let h=D.params;Mr(()=>!0);let de={initialData:void 0,initialError:void 0},Pe=R`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`,ra=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`;m.stadtteil_name_data&&(m.stadtteil_name_data instanceof Error?de.initialError=m.stadtteil_name_data:de.initialData=m.stadtteil_name_data,m.stadtteil_name_columns&&(de.knownColumns=m.stadtteil_name_columns));let ge,Pa=!1;const Da=Fe.createReactive({callback:k=>{r(0,ge=k)},execFn:V},{id:"stadtteil_name",...de});Da(ra,{noResolve:Pe,...de}),globalThis[Symbol.for("stadtteil_name")]={get value(){return ge}};let me={initialData:void 0,initialError:void 0},Ue=R`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${h.code}'
limit 1`,ze=`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${h.code}'
limit 1`;m.parent_info_data&&(m.parent_info_data instanceof Error?me.initialError=m.parent_info_data:me.initialData=m.parent_info_data,m.parent_info_columns&&(me.knownColumns=m.parent_info_columns));let Se,da=!1;const $e=Fe.createReactive({callback:k=>{r(3,Se=k)},execFn:V},{id:"parent_info",...me});$e(ze,{noResolve:Ue,...me}),globalThis[Symbol.for("parent_info")]={get value(){return Se}};let Qe={initialData:void 0,initialError:void 0},Te=R`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, gebiet_name, gebiet_code`,pe=`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, gebiet_name, gebiet_code`;m.children_data&&(m.children_data instanceof Error?Qe.initialError=m.children_data:Qe.initialData=m.children_data,m.children_columns&&(Qe.knownColumns=m.children_columns));let Ua,ma=!1;const ae=Fe.createReactive({callback:k=>{r(4,Ua=k)},execFn:V},{id:"children",...Qe});ae(pe,{noResolve:Te,...Qe}),globalThis[Symbol.for("children")]={get value(){return Ua}};let A={initialData:void 0,initialError:void 0},ye=R`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`,be=`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`;m.stage_mix_data&&(m.stage_mix_data instanceof Error?A.initialError=m.stage_mix_data:A.initialData=m.stage_mix_data,m.stage_mix_columns&&(A.knownColumns=m.stage_mix_columns));let ua,De=!1;const fa=Fe.createReactive({callback:k=>{r(5,ua=k)},execFn:V},{id:"stage_mix",...A});fa(be,{noResolve:ye,...A}),globalThis[Symbol.for("stage_mix")]={get value(){return ua}};let te={initialData:void 0,initialError:void 0},We=R`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as h
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = h.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            h.city_code = 'HH' and h.area_level = 'subarea_l2'
            and h.parent_area_code = '${h.code}' and gi.stage_number is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`,Je=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as h
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = h.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            h.city_code = 'HH' and h.area_level = 'subarea_l2'
            and h.parent_area_code = '${h.code}' and gi.stage_number is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`;m.stage_mix_summary_data&&(m.stage_mix_summary_data instanceof Error?te.initialError=m.stage_mix_summary_data:te.initialData=m.stage_mix_summary_data,m.stage_mix_summary_columns&&(te.knownColumns=m.stage_mix_summary_columns));let re,za=!1;const ha=Fe.createReactive({callback:k=>{r(1,re=k)},execFn:V},{id:"stage_mix_summary",...te});ha(Je,{noResolve:We,...te}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return re}};let ue={initialData:void 0,initialError:void 0},Ce=R`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${h.code}'
group by all
order by n_areas desc`,qe=`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${h.code}'
group by all
order by n_areas desc`;m.trajectory_mix_data&&(m.trajectory_mix_data instanceof Error?ue.initialError=m.trajectory_mix_data:ue.initialData=m.trajectory_mix_data,m.trajectory_mix_columns&&(ue.knownColumns=m.trajectory_mix_columns));let Ve,ie=!1;const se=Fe.createReactive({callback:k=>{r(6,Ve=k)},execFn:V},{id:"trajectory_mix",...ue});se(qe,{noResolve:Ce,...ue}),globalThis[Symbol.for("trajectory_mix")]={get value(){return Ve}};let ve={initialData:void 0,initialError:void 0},ne=R`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${h.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`,Ke=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${h.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`;m.trajectory_mix_summary_data&&(m.trajectory_mix_summary_data instanceof Error?ve.initialError=m.trajectory_mix_summary_data:ve.initialData=m.trajectory_mix_summary_data,m.trajectory_mix_summary_columns&&(ve.knownColumns=m.trajectory_mix_summary_columns));let oe,Qa=!1;const ga=Fe.createReactive({callback:k=>{r(2,oe=k)},execFn:V},{id:"trajectory_mix_summary",...ve});ga(Ke,{noResolve:ne,...ve}),globalThis[Symbol.for("trajectory_mix_summary")]={get value(){return oe}};let Y={initialData:void 0,initialError:void 0},Ye=R`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
-- coarse-page poi_mix, grouped through mart_area_hierarchy (OA-D1b/#240) instead of a code prefix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and h.parent_area_code = '${h.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`,Xe=`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
-- coarse-page poi_mix, grouped through mart_area_hierarchy (OA-D1b/#240) instead of a code prefix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and h.parent_area_code = '${h.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`;m.poi_mix_data&&(m.poi_mix_data instanceof Error?Y.initialError=m.poi_mix_data:Y.initialData=m.poi_mix_data,m.poi_mix_columns&&(Y.knownColumns=m.poi_mix_columns));let Ze,Me=!1;const pa=Fe.createReactive({callback:k=>{r(7,Ze=k)},execFn:V},{id:"poi_mix",...Y});pa(Xe,{noResolve:Ye,...Y}),globalThis[Symbol.for("poi_mix")]={get value(){return Ze}};let le={initialData:void 0,initialError:void 0},ea=R`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`,aa=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`;m.amenities_current_data&&(m.amenities_current_data instanceof Error?le.initialError=m.amenities_current_data:le.initialData=m.amenities_current_data,m.amenities_current_columns&&(le.knownColumns=m.amenities_current_columns));let He,Wa=!1;const ya=Fe.createReactive({callback:k=>{r(8,He=k)},execFn:V},{id:"amenities_current",...le});ya(aa,{noResolve:ea,...le}),globalThis[Symbol.for("amenities_current")]={get value(){return He}};let _e={initialData:void 0,initialError:void 0},Ge=R`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l1'
                    and area_code = '${h.code}'
                limit 1)
            and snapshot_year = (select snapshot_year from latest)
    ),
    facts as (
        select 1 as sort_order, 'Schools' as indicator, a.n_schools as area_n, d.n_schools as district_n
        from area_row as a left join district_row as d on true
        union all
        select 2, 'Kindergartens', a.n_kindergartens, d.n_kindergartens
        from area_row as a left join district_row as d on true
        union all
        select 3, 'Doctors', a.n_doctors, d.n_doctors
        from area_row as a left join district_row as d on true
        union all
        select 4, 'Dentists', a.n_dentists, d.n_dentists
        from area_row as a left join district_row as d on true
        union all
        select 5, 'Pharmacies', a.n_pharmacies, d.n_pharmacies
        from area_row as a left join district_row as d on true
        union all
        select 6, 'Supermarkets', a.n_supermarkets, d.n_supermarkets
        from area_row as a left join district_row as d on true
        union all
        select 7, 'Playgrounds', a.n_playgrounds, d.n_playgrounds
        from area_row as a left join district_row as d on true
        union all
        select 8, 'Transit stops', a.n_transit_stops, d.n_transit_stops
        from area_row as a left join district_row as d on true
    )
select sort_order, indicator, cast(cast(area_n as bigint) as varchar) as area_value, cast(cast(district_n as bigint) as varchar) as district_value
from facts
order by sort_order`,fe=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l1'
                    and area_code = '${h.code}'
                limit 1)
            and snapshot_year = (select snapshot_year from latest)
    ),
    facts as (
        select 1 as sort_order, 'Schools' as indicator, a.n_schools as area_n, d.n_schools as district_n
        from area_row as a left join district_row as d on true
        union all
        select 2, 'Kindergartens', a.n_kindergartens, d.n_kindergartens
        from area_row as a left join district_row as d on true
        union all
        select 3, 'Doctors', a.n_doctors, d.n_doctors
        from area_row as a left join district_row as d on true
        union all
        select 4, 'Dentists', a.n_dentists, d.n_dentists
        from area_row as a left join district_row as d on true
        union all
        select 5, 'Pharmacies', a.n_pharmacies, d.n_pharmacies
        from area_row as a left join district_row as d on true
        union all
        select 6, 'Supermarkets', a.n_supermarkets, d.n_supermarkets
        from area_row as a left join district_row as d on true
        union all
        select 7, 'Playgrounds', a.n_playgrounds, d.n_playgrounds
        from area_row as a left join district_row as d on true
        union all
        select 8, 'Transit stops', a.n_transit_stops, d.n_transit_stops
        from area_row as a left join district_row as d on true
    )
select sort_order, indicator, cast(cast(area_n as bigint) as varchar) as area_value, cast(cast(district_n as bigint) as varchar) as district_value
from facts
order by sort_order`;m.amenities_table_data&&(m.amenities_table_data instanceof Error?_e.initialError=m.amenities_table_data:_e.initialData=m.amenities_table_data,m.amenities_table_columns&&(_e.knownColumns=m.amenities_table_columns));let Ja,ba=!1;const Ee=Fe.createReactive({callback:k=>{r(9,Ja=k)},execFn:V},{id:"amenities_table",..._e});Ee(fe,{noResolve:Ge,..._e}),globalThis[Symbol.for("amenities_table")]={get value(){return Ja}};let Ne={initialData:void 0,initialError:void 0},X=R`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${h.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${h.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307/#352: the derived Gebiet label (every Gebiet has one); the coalesce-to-code is a
    -- guard only -- same coalesce as this page's own \`children\` query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${at}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`,va=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${h.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${h.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307/#352: the derived Gebiet label (every Gebiet has one); the coalesce-to-code is a
    -- guard only -- same coalesce as this page's own \`children\` query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${at}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`;m.minimap_areas_data&&(m.minimap_areas_data instanceof Error?Ne.initialError=m.minimap_areas_data:Ne.initialData=m.minimap_areas_data,m.minimap_areas_columns&&(Ne.knownColumns=m.minimap_areas_columns));let wa,Re=!1;const ka=Fe.createReactive({callback:k=>{r(10,wa=k)},execFn:V},{id:"minimap_areas",...Ne});return ka(va,{noResolve:X,...Ne}),globalThis[Symbol.for("minimap_areas")]={get value(){return wa}},s.$$set=k=>{"data"in k&&r(15,he=k.data)},s.$$.update=()=>{var k;s.$$.dirty[0]&32768&&r(16,{data:m={},customFormattingSettings:ke,__db:ee}=he,m),s.$$.dirty[0]&65536&&zr.set(Object.keys(m).length>0),s.$$.dirty[2]&8&&r(17,h=D.params),s.$$.dirty[0]&131072&&r(19,Pe=R`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`),s.$$.dirty[0]&131072&&r(20,ra=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`),s.$$.dirty[0]&3932160&&(Pe||!Pa?Pe||(Da(ra,{noResolve:Pe,...de}),r(21,Pa=!0)):Da(ra,{noResolve:Pe})),s.$$.dirty[0]&131072&&r(23,Ue=R`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${h.code}'
limit 1`),s.$$.dirty[0]&131072&&r(24,ze=`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${h.code}'
limit 1`),s.$$.dirty[0]&62914560&&(Ue||!da?Ue||($e(ze,{noResolve:Ue,...me}),r(25,da=!0)):$e(ze,{noResolve:Ue})),s.$$.dirty[0]&131072&&r(27,Te=R`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, gebiet_name, gebiet_code`),s.$$.dirty[0]&131072&&r(28,pe=`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, gebiet_name, gebiet_code`),s.$$.dirty[0]&1006632960&&(Te||!ma?Te||(ae(pe,{noResolve:Te,...Qe}),r(29,ma=!0)):ae(pe,{noResolve:Te})),s.$$.dirty[0]&131072&&r(31,ye=R`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),s.$$.dirty[0]&131072&&r(32,be=`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = h.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),s.$$.dirty[0]&1073741824|s.$$.dirty[1]&7&&(ye||!De?ye||(fa(be,{noResolve:ye,...A}),r(33,De=!0)):fa(be,{noResolve:ye})),s.$$.dirty[0]&131072&&r(35,We=R`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as h
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = h.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            h.city_code = 'HH' and h.area_level = 'subarea_l2'
            and h.parent_area_code = '${h.code}' and gi.stage_number is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&131072&&r(36,Je=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as h
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = h.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            h.city_code = 'HH' and h.area_level = 'subarea_l2'
            and h.parent_area_code = '${h.code}' and gi.stage_number is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[1]&120&&(We||!za?We||(ha(Je,{noResolve:We,...te}),r(37,za=!0)):ha(Je,{noResolve:We})),s.$$.dirty[0]&131072&&r(39,Ce=R`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${h.code}'
group by all
order by n_areas desc`),s.$$.dirty[0]&131072&&r(40,qe=`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${h.code}'
group by all
order by n_areas desc`),s.$$.dirty[1]&1920&&(Ce||!ie?Ce||(se(qe,{noResolve:Ce,...ue}),r(41,ie=!0)):se(qe,{noResolve:Ce})),s.$$.dirty[0]&131072&&r(43,ne=R`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${h.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`),s.$$.dirty[0]&131072&&r(44,Ke=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${h.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`),s.$$.dirty[1]&30720&&(ne||!Qa?ne||(ga(Ke,{noResolve:ne,...ve}),r(45,Qa=!0)):ga(Ke,{noResolve:ne})),s.$$.dirty[0]&131072&&r(47,Ye=R`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
-- coarse-page poi_mix, grouped through mart_area_hierarchy (OA-D1b/#240) instead of a code prefix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and h.parent_area_code = '${h.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`),s.$$.dirty[0]&131072&&r(48,Xe=`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
-- coarse-page poi_mix, grouped through mart_area_hierarchy (OA-D1b/#240) instead of a code prefix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and h.parent_area_code = '${h.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`),s.$$.dirty[1]&491520&&(Ye||!Me?Ye||(pa(Xe,{noResolve:Ye,...Y}),r(49,Me=!0)):pa(Xe,{noResolve:Ye})),s.$$.dirty[0]&131072&&r(51,ea=R`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&131072&&r(52,aa=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[1]&7864320&&(ea||!Wa?ea||(ya(aa,{noResolve:ea,...le}),r(53,Wa=!0)):ya(aa,{noResolve:ea})),s.$$.dirty[0]&131072&&r(55,Ge=R`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l1'
                    and area_code = '${h.code}'
                limit 1)
            and snapshot_year = (select snapshot_year from latest)
    ),
    facts as (
        select 1 as sort_order, 'Schools' as indicator, a.n_schools as area_n, d.n_schools as district_n
        from area_row as a left join district_row as d on true
        union all
        select 2, 'Kindergartens', a.n_kindergartens, d.n_kindergartens
        from area_row as a left join district_row as d on true
        union all
        select 3, 'Doctors', a.n_doctors, d.n_doctors
        from area_row as a left join district_row as d on true
        union all
        select 4, 'Dentists', a.n_dentists, d.n_dentists
        from area_row as a left join district_row as d on true
        union all
        select 5, 'Pharmacies', a.n_pharmacies, d.n_pharmacies
        from area_row as a left join district_row as d on true
        union all
        select 6, 'Supermarkets', a.n_supermarkets, d.n_supermarkets
        from area_row as a left join district_row as d on true
        union all
        select 7, 'Playgrounds', a.n_playgrounds, d.n_playgrounds
        from area_row as a left join district_row as d on true
        union all
        select 8, 'Transit stops', a.n_transit_stops, d.n_transit_stops
        from area_row as a left join district_row as d on true
    )
select sort_order, indicator, cast(cast(area_n as bigint) as varchar) as area_value, cast(cast(district_n as bigint) as varchar) as district_value
from facts
order by sort_order`),s.$$.dirty[0]&131072&&r(56,fe=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l1'
                    and area_code = '${h.code}'
                limit 1)
            and snapshot_year = (select snapshot_year from latest)
    ),
    facts as (
        select 1 as sort_order, 'Schools' as indicator, a.n_schools as area_n, d.n_schools as district_n
        from area_row as a left join district_row as d on true
        union all
        select 2, 'Kindergartens', a.n_kindergartens, d.n_kindergartens
        from area_row as a left join district_row as d on true
        union all
        select 3, 'Doctors', a.n_doctors, d.n_doctors
        from area_row as a left join district_row as d on true
        union all
        select 4, 'Dentists', a.n_dentists, d.n_dentists
        from area_row as a left join district_row as d on true
        union all
        select 5, 'Pharmacies', a.n_pharmacies, d.n_pharmacies
        from area_row as a left join district_row as d on true
        union all
        select 6, 'Supermarkets', a.n_supermarkets, d.n_supermarkets
        from area_row as a left join district_row as d on true
        union all
        select 7, 'Playgrounds', a.n_playgrounds, d.n_playgrounds
        from area_row as a left join district_row as d on true
        union all
        select 8, 'Transit stops', a.n_transit_stops, d.n_transit_stops
        from area_row as a left join district_row as d on true
    )
select sort_order, indicator, cast(cast(area_n as bigint) as varchar) as area_value, cast(cast(district_n as bigint) as varchar) as district_value
from facts
order by sort_order`),s.$$.dirty[1]&125829120&&(Ge||!ba?Ge||(Ee(fe,{noResolve:Ge,..._e}),r(57,ba=!0)):Ee(fe,{noResolve:Ge})),s.$$.dirty[0]&131072&&r(59,X=R`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${h.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${h.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307/#352: the derived Gebiet label (every Gebiet has one); the coalesce-to-code is a
    -- guard only -- same coalesce as this page's own \`children\` query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${at}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`),s.$$.dirty[0]&131072&&r(60,va=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${h.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${h.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307/#352: the derived Gebiet label (every Gebiet has one); the coalesce-to-code is a
    -- guard only -- same coalesce as this page's own \`children\` query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${at}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`),s.$$.dirty[1]&2013265920&&(X||!Re?X||(ka(va,{noResolve:X,...Ne}),r(61,Re=!0)):ka(va,{noResolve:X})),s.$$.dirty[0]&1&&r(64,a=((k=ge==null?void 0:ge[0])==null?void 0:k.area_name)??null),s.$$.dirty[2]&4&&r(14,o=[{label:"Hamburg",href:"/hamburg"},{label:"Stadtteile",href:"/hamburg/area/subarea_l1"},{label:a??"Stadtteil"}]),s.$$.dirty[2]&4&&r(13,_=a?`${a} — Stadtteil profile · Hamburg`:null),s.$$.dirty[0]&2&&r(63,d=re==null?void 0:re[0]),s.$$.dirty[2]&2&&r(12,c=!d||d.n_total==null||Number(d.n_total)===0?null:(()=>{const $a=Number(d.n_total),Ha=Number(d.n_advanced||0),we=d.top_stage_share!=null?Number(d.top_stage_share):null,ta=we!=null&&we>.5?`<b>${d.top_stage}</b> is the only stage holding a majority (${Math.round(we*100)}%)`:"no single stage holds a majority";return`<b>${Ha}</b> of <b>${$a}</b> Gebiete with a current stage here are classified <b>4 · Active gentrification</b> or <b>3 · Pioneer signal</b>; ${ta} — a distribution across this Stadtteil's own Gebiete, never a single re-scored gentrification-index value for the Stadtteil itself.`})()),s.$$.dirty[0]&4&&r(62,u=oe==null?void 0:oe[0]),s.$$.dirty[2]&1&&r(11,q=!u||u.n_total==null||Number(u.n_total)===0?null:(()=>{const $a=Number(u.n_total),Ha=Number(u.n_trending||0),we=u.top_type_share!=null?Number(u.top_type_share):null,ta=we!=null&&we>.5?`<b>${u.top_type}</b> is the only trajectory type holding a majority (${Math.round(we*100)}%)`:"no single trajectory type holds a majority";return`<b>${Ha}</b> of <b>${$a}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${ta} — a distribution across this Stadtteil's own Gebiete, never a single re-scored value for the Stadtteil itself.`})())},[ge,re,oe,Se,Ua,ua,Ve,Ze,He,Ja,wa,q,c,_,o,he,m,h,de,Pe,ra,Pa,me,Ue,ze,da,Qe,Te,pe,ma,A,ye,be,De,te,We,Je,za,ue,Ce,qe,ie,ve,ne,Ke,Qa,Y,Ye,Xe,Me,le,ea,aa,Wa,_e,Ge,fe,ba,Ne,X,va,Re,u,d,a,D]}class Ui extends Gr{constructor(t){super(),Er(this,t,$i,ki,xr,{data:15},null,[-1,-1,-1])}}export{Ui as component};
