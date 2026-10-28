import{s as kr,d as o,i as l,a as ne,b,c as g,h as Hr,e as v,f as kt,g as We,j as T,k as E,l as p,m as w,t as C,n as ir,o as $r,p as jr,q as xr,r as Sr,u as te,v as br,H as vr,w as Ja}from"../chunks/scheduler.CmMeO4ay.js";import{S as Tr,i as Cr,d as $,t as y,a as f,c as je,m as j,b as x,e as S,g as xe}from"../chunks/index.bfDa0Uqw.js";import{A as qr,P as Mr,a as Gr}from"../chunks/PageTitle.nASIZfTP.js";import{F as Er}from"../chunks/FooterNav.BbND9dxm.js";import{H as Rr}from"../chunks/HamburgTrajectoryNote.BKIaPPmK.js";import{H as Dr}from"../chunks/Hero.wYia6TQ0.js";import{N as wt}from"../chunks/NotYetPublished.BlNA0MP2.js";import{D as sr,C as Va}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as Za,w as Ar}from"../chunks/entry.vKQYRLhF.js";import{A as Ht}from"../chunks/Alert.BNZjDqvU.js";import{e as Br,s as Fr,Q as Qe,p as Ir,a as nr,r as or,C as Nr}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as D}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Lr}from"../chunks/stores.CGa44sBH.js";import{Q as Je}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as Gt}from"../chunks/BarChart.BZFK7Gke.js";import{p as Or}from"../chunks/profile.BW8tN6E9.js";function Pr(s){var n;let t,r=(H.title??((n=H.og)==null?void 0:n.title))+"",a;return{c(){t=w("h1"),a=C(r),this.h()},l(_){t=v(_,"H1",{class:!0});var d=We(t);a=T(d,r),d.forEach(o),this.h()},h(){b(t,"class","title")},m(_,d){l(_,t,d),ne(t,a)},p:te,d(_){_&&o(t)}}}function Ur(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:te,p:te,d:te}}function zr(s){var d;let t,r,a,n,_;return document.title=t=H.title??((d=H.og)==null?void 0:d.title),{c(){r=p(),a=w("meta"),n=p(),_=w("meta"),this.h()},l(c){r=g(c),a=v(c,"META",{property:!0,content:!0}),n=g(c),_=v(c,"META",{name:!0,content:!0}),this.h()},h(){var c,u;b(a,"property","og:title"),b(a,"content",((c=H.og)==null?void 0:c.title)??H.title),b(_,"name","twitter:title"),b(_,"content",((u=H.og)==null?void 0:u.title)??H.title)},m(c,u){l(c,r,u),l(c,a,u),l(c,n,u),l(c,_,u)},p(c,u){var q;u&0&&t!==(t=H.title??((q=H.og)==null?void 0:q.title))&&(document.title=t)},d(c){c&&(o(r),o(a),o(n),o(_))}}}function Qr(s){var _,d;let t,r,a=(H.description||((_=H.og)==null?void 0:_.description))&&Wr(),n=((d=H.og)==null?void 0:d.image)&&Jr();return{c(){a&&a.c(),t=p(),n&&n.c(),r=kt()},l(c){a&&a.l(c),t=g(c),n&&n.l(c),r=kt()},m(c,u){a&&a.m(c,u),l(c,t,u),n&&n.m(c,u),l(c,r,u)},p(c,u){var q,A;(H.description||(q=H.og)!=null&&q.description)&&a.p(c,u),(A=H.og)!=null&&A.image&&n.p(c,u)},d(c){c&&(o(t),o(r)),a&&a.d(c),n&&n.d(c)}}}function Wr(s){let t,r,a,n,_;return{c(){t=w("meta"),r=p(),a=w("meta"),n=p(),_=w("meta"),this.h()},l(d){t=v(d,"META",{name:!0,content:!0}),r=g(d),a=v(d,"META",{property:!0,content:!0}),n=g(d),_=v(d,"META",{name:!0,content:!0}),this.h()},h(){var d,c,u;b(t,"name","description"),b(t,"content",H.description??((d=H.og)==null?void 0:d.description)),b(a,"property","og:description"),b(a,"content",((c=H.og)==null?void 0:c.description)??H.description),b(_,"name","twitter:description"),b(_,"content",((u=H.og)==null?void 0:u.description)??H.description)},m(d,c){l(d,t,c),l(d,r,c),l(d,a,c),l(d,n,c),l(d,_,c)},p:te,d(d){d&&(o(t),o(r),o(a),o(n),o(_))}}}function Jr(s){let t,r,a;return{c(){t=w("meta"),r=p(),a=w("meta"),this.h()},l(n){t=v(n,"META",{property:!0,content:!0}),r=g(n),a=v(n,"META",{name:!0,content:!0}),this.h()},h(){var n,_;b(t,"property","og:image"),b(t,"content",nr((n=H.og)==null?void 0:n.image)),b(a,"name","twitter:image"),b(a,"content",nr((_=H.og)==null?void 0:_.image))},m(n,_){l(n,t,_),l(n,r,_),l(n,a,_)},p:te,d(n){n&&(o(t),o(r),o(a))}}}function lr(s){let t,r;return t=new Je({props:{queryID:"stadtteil_name",queryResult:s[0]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&1&&(_.queryResult=a[0]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function _r(s){let t,r;return t=new Je({props:{queryID:"parent_info",queryResult:s[3]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&8&&(_.queryResult=a[3]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function cr(s){let t,r;return t=new Je({props:{queryID:"children",queryResult:s[4]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&16&&(_.queryResult=a[4]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function dr(s){let t,r;return t=new Je({props:{queryID:"stage_mix",queryResult:s[5]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&32&&(_.queryResult=a[5]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function mr(s){let t,r;return t=new Je({props:{queryID:"stage_mix_summary",queryResult:s[1]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&2&&(_.queryResult=a[1]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Vr(s){let t,r="District profile";return{c(){t=w("a"),t.textContent=r,this.h()},l(a){t=v(a,"A",{href:!0,"data-svelte-h":!0}),E(t)!=="svelte-5v523a"&&(t.textContent=r),this.h()},h(){b(t,"href","/gentriduck/hamburg/area/district")},m(a,n){l(a,t,n)},p:te,d(a){a&&o(t)}}}function Kr(s){let t,r=(s[3][0].district_name??"District profile")+"",a,n;return{c(){t=w("a"),a=C(r),this.h()},l(_){t=v(_,"A",{href:!0});var d=We(t);a=T(d,r),d.forEach(o),this.h()},h(){b(t,"href",n="/gentriduck/hamburg/area/district/"+s[3][0].district_code)},m(_,d){l(_,t,d),ne(t,a)},p(_,d){d[0]&8&&r!==(r=(_[3][0].district_name??"District profile")+"")&&Ja(a,r),d[0]&8&&n!==(n="/gentriduck/hamburg/area/district/"+_[3][0].district_code)&&b(t,"href",n)},d(_){_&&o(t)}}}function Yr(s){let t,r,a="counts and sums",n,_,d="methodology page",c;return{c(){t=C("Figures on this page are "),r=w("b"),r.textContent=a,n=C(` over this Stadtteil's statistische Gebiete —
  never a separately re-scored index. See the `),_=w("a"),_.textContent=d,c=C(` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (listed further down) for its
  stage and trajectory.`),this.h()},l(u){t=T(u,"Figures on this page are "),r=v(u,"B",{"data-svelte-h":!0}),E(r)!=="svelte-1143tv"&&(r.textContent=a),n=T(u,` over this Stadtteil's statistische Gebiete —
  never a separately re-scored index. See the `),_=v(u,"A",{href:!0,"data-svelte-h":!0}),E(_)!=="svelte-1l2pw3"&&(_.textContent=d),c=T(u,` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (listed further down) for its
  stage and trajectory.`),this.h()},h(){b(_,"href","/gentriduck/methodology")},m(u,q){l(u,t,q),l(u,r,q),l(u,n,q),l(u,_,q),l(u,c,q)},p:te,d(u){u&&(o(t),o(r),o(n),o(_),o(c))}}}function Xr(s){let t,r;return t=new Ht({props:{status:"warning",$$slots:{default:[ei]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[2]&8388608&&(_.$$scope={dirty:n,ctx:a}),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Zr(s){let t,r;return{c(){t=w("p"),r=new vr(!1),this.h()},l(a){t=v(a,"P",{});var n=We(t);r=br(n,!1),n.forEach(o),this.h()},h(){r.a=null},m(a,n){l(a,t,n),r.m(s[12],t)},p(a,n){n[0]&4096&&r.p(a[12])},i:te,o:te,d(a){a&&o(t)}}}function ei(s){let t;return{c(){t=C("No Gebiet stage data available for this Stadtteil.")},l(r){t=T(r,"No Gebiet stage data available for this Stadtteil.")},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function ur(s){let t,r;return t=new Je({props:{queryID:"trajectory_mix",queryResult:s[6]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&64&&(_.queryResult=a[6]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function fr(s){let t,r;return t=new Je({props:{queryID:"trajectory_mix_summary",queryResult:s[2]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&4&&(_.queryResult=a[2]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ai(s){let t,r;return t=new Ht({props:{status:"warning",$$slots:{default:[ri]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[2]&8388608&&(_.$$scope={dirty:n,ctx:a}),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ti(s){let t,r;return{c(){t=w("p"),r=new vr(!1),this.h()},l(a){t=v(a,"P",{});var n=We(t);r=br(n,!1),n.forEach(o),this.h()},h(){r.a=null},m(a,n){l(a,t,n),r.m(s[11],t)},p(a,n){n[0]&2048&&r.p(a[11])},i:te,o:te,d(a){a&&o(t)}}}function ri(s){let t;return{c(){t=C("No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.")},l(r){t=T(r,"No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.")},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function hr(s){let t,r;return t=new Je({props:{queryID:"poi_mix",queryResult:s[7]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&128&&(_.queryResult=a[7]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ii(s){let t;return{c(){t=C(`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page, linked below.`)},l(r){t=T(r,`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page, linked below.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function si(s){let t;return{c(){t=C(`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},l(r){t=T(r,`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function ni(s){let t;return{c(){t=C(`Hamburg's population-register figures do exist at Stadtteil level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},l(r){t=T(r,`Hamburg's population-register figures do exist at Stadtteil level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function gr(s){let t,r;return t=new Je({props:{queryID:"amenities_current",queryResult:s[8]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&256&&(_.queryResult=a[8]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function pr(s){let t,r;return t=new Je({props:{queryID:"amenities_table",queryResult:s[9]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&512&&(_.queryResult=a[9]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function oi(s){let t;return{c(){t=C("No amenity data is available for this Stadtteil yet.")},l(r){t=T(r,"No amenity data is available for this Stadtteil yet.")},m(r,a){l(r,t,a)},p:te,d(r){r&&o(t)}}}function li(s){let t,r,a=s[8][0].snapshot_year+"",n,_;return{c(){t=C("Based on OpenStreetMap tagging as of "),r=w("b"),n=C(a),_=C(`, this Stadtteil has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(d){t=T(d,"Based on OpenStreetMap tagging as of "),r=v(d,"B",{});var c=We(r);n=T(c,a),c.forEach(o),_=T(d,`, this Stadtteil has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(d,c){l(d,t,c),l(d,r,c),ne(r,n),l(d,_,c)},p(d,c){c[0]&256&&a!==(a=d[8][0].snapshot_year+"")&&Ja(n,a)},d(d){d&&(o(t),o(r),o(_))}}}function _i(s){let t,r,a,n,_,d;return t=new Va({props:{id:"indicator",title:"Infrastructure"}}),a=new Va({props:{id:"area_value",title:"This area"}}),_=new Va({props:{id:"district_value",title:"District total"}}),{c(){S(t.$$.fragment),r=p(),S(a.$$.fragment),n=p(),S(_.$$.fragment)},l(c){x(t.$$.fragment,c),r=g(c),x(a.$$.fragment,c),n=g(c),x(_.$$.fragment,c)},m(c,u){j(t,c,u),l(c,r,u),j(a,c,u),l(c,n,u),j(_,c,u),d=!0},p:te,i(c){d||(f(t.$$.fragment,c),f(a.$$.fragment,c),f(_.$$.fragment,c),d=!0)},o(c){y(t.$$.fragment,c),y(a.$$.fragment,c),y(_.$$.fragment,c),d=!1},d(c){c&&(o(r),o(n)),$(t,c),$(a,c),$(_,c)}}}function ci(s){let t,r,a="0",n,_,d="open-data",c;return{c(){t=C("These figures come from OpenStreetMap tagging, not an official registry. A "),r=w("b"),r.textContent=a,n=C(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),_=w("a"),_.textContent=d,c=C(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(u){t=T(u,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=v(u,"B",{"data-svelte-h":!0}),E(r)!=="svelte-12bhsds"&&(r.textContent=a),n=T(u,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),_=v(u,"A",{href:!0,"data-svelte-h":!0}),E(_)!=="svelte-1jijq3i"&&(_.textContent=d),c=T(u,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){b(_,"href","/gentriduck/open-data")},m(u,q){l(u,t,q),l(u,r,q),l(u,n,q),l(u,_,q),l(u,c,q)},p:te,d(u){u&&(o(t),o(r),o(n),o(_),o(c))}}}function di(s){let t;return{c(){t=C(`There isn't enough tagged cuisine data in this Stadtteil yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=T(r,`There isn't enough tagged cuisine data in this Stadtteil yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){l(r,t,a)},p:te,d(r){r&&o(t)}}}function mi(s){let t,r,a=s[8][0].gastro_poi_with_cuisine_count+"",n,_;return{c(){t=C("Cuisine is tagged for "),r=w("b"),n=C(a),_=C(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(d){t=T(d,"Cuisine is tagged for "),r=v(d,"B",{});var c=We(r);n=T(c,a),c.forEach(o),_=T(d,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(d,c){l(d,t,c),l(d,r,c),ne(r,n),l(d,_,c)},p(d,c){c[0]&256&&a!==(a=d[8][0].gastro_poi_with_cuisine_count+"")&&Ja(n,a)},d(d){d&&(o(t),o(r),o(_))}}}function ui(s){let t,r,a=s[8][0].gastro_poi_with_cuisine_count+"",n,_,d,c="most common cuisine",u,q,A=s[8][0].dominant_cuisine+"",Y,ce,m=Math.round(s[8][0].dominant_cuisine_share*100)+"",ve,re;return{c(){t=C("Among "),r=w("b"),n=C(a),_=C(` restaurants/cafes with cuisine
data tagged in this Stadtteil, the `),d=w("b"),d.textContent=c,u=C(` is
`),q=w("b"),Y=C(A),ce=C(`
(`),ve=C(m),re=C("% of cuisine-tagged restaurants/cafes).")},l(M){t=T(M,"Among "),r=v(M,"B",{});var G=We(r);n=T(G,a),G.forEach(o),_=T(M,` restaurants/cafes with cuisine
data tagged in this Stadtteil, the `),d=v(M,"B",{"data-svelte-h":!0}),E(d)!=="svelte-1floooe"&&(d.textContent=c),u=T(M,` is
`),q=v(M,"B",{});var V=We(q);Y=T(V,A),V.forEach(o),ce=T(M,`
(`),ve=T(M,m),re=T(M,"% of cuisine-tagged restaurants/cafes).")},m(M,G){l(M,t,G),l(M,r,G),ne(r,n),l(M,_,G),l(M,d,G),l(M,u,G),l(M,q,G),ne(q,Y),l(M,ce,G),l(M,ve,G),l(M,re,G)},p(M,G){G[0]&256&&a!==(a=M[8][0].gastro_poi_with_cuisine_count+"")&&Ja(n,a),G[0]&256&&A!==(A=M[8][0].dominant_cuisine+"")&&Ja(Y,A),G[0]&256&&m!==(m=Math.round(M[8][0].dominant_cuisine_share*100)+"")&&Ja(ve,m)},d(M){M&&(o(t),o(r),o(_),o(d),o(u),o(q),o(ce),o(ve),o(re))}}}function fi(s){let t;return{c(){t=C(`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, current state only),
  and its sign-off (#303) requires a Hamburg-specific methodology disclosure before any of it is
  shown publicly — that has not been done yet.`)},l(r){t=T(r,`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, current state only),
  and its sign-off (#303) requires a Hamburg-specific methodology disclosure before any of it is
  shown publicly — that has not been done yet.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function yr(s){let t,r;return t=new Je({props:{queryID:"minimap_areas",queryResult:s[10]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const _={};n[0]&1024&&(_.queryResult=a[10]),t.$set(_)},i(a){r||(f(t.$$.fragment,a),r=!0)},o(a){y(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function hi(s){let t,r,a,n,_,d;return t=new Va({props:{id:"gebiet_name",title:"Statistisches Gebiet"}}),a=new Va({props:{id:"stage",title:"Stage"}}),_=new Va({props:{id:"pressure_trend",title:"Pressure trend"}}),{c(){S(t.$$.fragment),r=p(),S(a.$$.fragment),n=p(),S(_.$$.fragment)},l(c){x(t.$$.fragment,c),r=g(c),x(a.$$.fragment,c),n=g(c),x(_.$$.fragment,c)},m(c,u){j(t,c,u),l(c,r,u),j(a,c,u),l(c,n,u),j(_,c,u),d=!0},p:te,i(c){d||(f(t.$$.fragment,c),f(a.$$.fragment,c),f(_.$$.fragment,c),d=!0)},o(c){y(t.$$.fragment,c),y(a.$$.fragment,c),y(_.$$.fragment,c),d=!1},d(c){c&&(o(r),o(n)),$(t,c),$(a,c),$(_,c)}}}function gi(s){var Kt;let t,r,a,n,_,d,c,u,q,A,Y,ce,m,ve,re,M,G,V,h,oe,Ve="all Stadtteile",ia,de,La="all districts",Aa,le,Ke="all Gebiete",Ye,Se,ma,we,Xe='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Te,me,Oa=`Every statistisches Gebiet in this Stadtteil is individually classified into one of six
gentrification stages from Hamburg&#39;s own Sozialmonitoring (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This
page reports the <strong class="markdown">distribution</strong> of those Gebiet-level stages — never a single re-scored index
value for the Stadtteil itself. Hamburg&#39;s stages are <strong class="markdown">not directly equivalent</strong> to same-named
Berlin stages (Hamburg&#39;s Dynamik window is 3 years, Berlin&#39;s 2; <a href="/gentriduck/methodology" class="markdown">methodology §6</a>).`,ua,ie,B,ue,fe,fa,Ce,Pa=`Which Gebiete belong to this Stadtteil comes from a spatial crosswalk (each Gebiet assigned to the
Stadtteil that contains it; OA-D1b, #240), not from the Gebiet codes themselves.`,qe,X,ha='<a href="#trajectory-mix-20192025">Trajectory mix, 2019–2025</a>',Ne,Le,ga,he,ge,K,se,Ze,Me,Ge,Z,pa='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Oe,ke,Ua='<a href="#mapped-places">Mapped places</a>',Ee,pe,ye,ya,Re,za=`These are OpenStreetMap-derived counts; OSM coverage is not spatially neutral (poorer or peripheral
areas tend to be less thoroughly mapped, Haklay 2010), so a low count can be a coverage gap rather
than a real absence. See the <a href="/gentriduck/hamburg/poi-map" class="markdown">Hamburg POI map</a> for the per-Gebiet picture.`,De,ee,ba='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',va,Ae,wa,ae,ea='<a href="#within-group-dominance">Within-group dominance</a>',aa,Be,ka,He,ta='<a href="#people--structure">People &amp; structure</a>',Fe,be,Ha,$e,Qa='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',k,Ie,ra,_e,$a,ja,et,xa,at,Ba,tt,Fa,Et=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,rt,sa,Rt='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',it,Sa,st,na,Dt='<a href="#where-this-area-sits">Where this area sits</a>',nt,Wa,Ta,ot,oa,At='<a href="#gebiete-in-this-stadtteil">Gebiete in this Stadtteil</a>',lt,Ca,_t,qa,Bt=`The parent district ("Up:" above) is a source-provided attribute of Hamburg's Stadtteil geodata;
the Gebiet list comes from the OA-D1b (#240) spatial crosswalk. Both are published through`,ct,Ia,Ft="mart_area_hierarchy",dt,la,It='<a href="#honest-caveats">Honest caveats</a>',mt,Ma,Nt=`<li class="markdown"><strong class="markdown">Stadtteil figures are counts and sums of its Gebiete, never a re-scored index</strong> — the stage and
trajectory sections show how this Stadtteil&#39;s Gebiete are distributed, not a single value for
the Stadtteil.</li> <li class="markdown"><strong class="markdown">Hamburg&#39;s stages are not directly equivalent to same-named Berlin stages</strong> — Hamburg&#39;s Dynamik
window is 3 years, Berlin&#39;s 2 (<a href="/gentriduck/methodology" class="markdown">methodology §6</a>, points 1 and 4).</li> <li class="markdown"><strong class="markdown">The trajectory mix describes a recent ~6-year (2019–2025) window</strong>, not full history, and is a
<strong class="markdown">status-only classification</strong>, never a displacement verdict.</li> <li class="markdown"><strong class="markdown">Mapped-place counts come from OpenStreetMap</strong>, whose coverage varies by area and grew over time.</li> <li class="markdown"><strong class="markdown">Some Berlin sections are not shown for Hamburg</strong> — the Offering Advantage roll-up, within-group
dominance, people &amp; structure, and land value &amp; rent — each with its reason in its own section
above. See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory and
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from Berlin&#39;s.</li>`,ut,_a,Lt='<a href="#further-reading">Further reading</a>',ft,Ga,Ot=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a>
(switch the area level to Stadtteil for this Stadtteil&#39;s stage mix on the map),
<a href="/gentriduck/hamburg/area-detail" class="markdown">browse by district</a> for other areas, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,ht,Ka,gt,Na,pt,ca=typeof H<"u"&&(H.title||((Kt=H.og)==null?void 0:Kt.title))&&H.hide_title!==!0&&Pr();function wr(e,i){var R;return typeof H<"u"&&(H.title||(R=H.og)!=null&&R.title)?zr:Ur}let Ya=wr()(s),da=typeof H=="object"&&Qr(),F=s[0]&&lr(s),I=s[3]&&_r(s),N=s[4]&&cr(s),L=s[5]&&dr(s),O=s[1]&&mr(s);Y=new qr({props:{crumbs:s[14]}}),m=new Mr({props:{title:s[13]}}),re=new Dr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]?s[0][0].area_name:"Stadtteil")+" — Stadtteil profile",lede:"Neighbourhood-stage mix, trajectory mix, commercial mix, and everyday amenities for this Stadtteil, counted from its constituent statistische Gebiete — never a re-scored index at this grain."}});function Pt(e,i){var R;return(R=e[3][0])!=null&&R.district_code?Kr:Vr}let yt=Pt(s),Pe=yt(s);Se=new Ht({props:{status:"info",$$slots:{default:[Yr]},$$scope:{ctx:s}}});const Ut=[Zr,Xr],Ea=[];function zt(e,i){return e[12]?0:1}ie=zt(s),B=Ea[ie]=Ut[ie](s),fe=new Gt({props:{data:s[5],x:"stage",y:"n_areas",title:"Gebiete by current stage, "+(s[0][0]?s[0][0].area_name:"this Stadtteil"),swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet stage data for this Stadtteil."}}),Le=new Rr({props:{subject:"each Gebiet"}});let P=s[6]&&ur(s),U=s[2]&&fr(s);const Qt=[ti,ai],Ra=[];function Wt(e,i){return e[11]?0:1}K=Wt(s),se=Ra[K]=Qt[K](s),Me=new Gt({props:{data:s[6],x:"trajectory_type",y:"n_areas",title:"Gebiete by trajectory classification, 2019–2025 ("+(s[0][0]?s[0][0].area_name:"this Stadtteil")+")",swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet trajectory data for this Stadtteil."}});let z=s[7]&&hr(s);ye=new Gt({props:{data:s[7],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(s[0][0]?s[0][0].area_name:"this Stadtteil"),swapXY:"true",emptySet:"warn",emptyMessage:"No mapped places recorded for this Stadtteil."}}),Ae=new wt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"This Stadtteil's Offering Advantage roll-up (Berlin's coarse pages show one per domain)",$$slots:{default:[ii]},$$scope:{ctx:s}}}),Be=new wt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Within-group dominance for this Stadtteil's Gebiete",$$slots:{default:[si]},$$scope:{ctx:s}}}),be=new wt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Population and composition sums for this Stadtteil",$$slots:{default:[ni]},$$scope:{ctx:s}}});let Q=s[8]&&gr(s),W=s[9]&&pr(s);function Jt(e,i){var R;return(R=e[8][0])!=null&&R.snapshot_year?li:oi}let bt=Jt(s),Ue=bt(s);ja=new sr({props:{data:s[9],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[_i]},$$scope:{ctx:s}}}),xa=new Ht({props:{status:"info",$$slots:{default:[ci]},$$scope:{ctx:s}}});function Vt(e,i){var R,Da;return(R=e[8][0])!=null&&R.snapshot_year&&e[8][0].gastro_poi_with_cuisine_count>=8&&e[8][0].dominant_cuisine_share>=.15?ui:(Da=e[8][0])!=null&&Da.snapshot_year&&e[8][0].gastro_poi_with_cuisine_count>=8?mi:di}let vt=Vt(s),ze=vt(s);Sa=new wt({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Land value and estimated rent for this Stadtteil",$$slots:{default:[fi]},$$scope:{ctx:s}}});let J=s[10]&&yr(s);return Ta=new Gr({props:{data:s[10],geoJsonUrl:`${Za}/geo/subarea_l1_subarea_l2_drilldown.geojson`,title:(s[0][0]?s[0][0].area_name:"This Stadtteil")+" and its statistische Gebiete"}}),Ca=new sr({props:{data:s[4],rows:"20",link:"gebiet_link",emptySet:"warn",emptyMessage:"No constituent Gebiete found for this Stadtteil.",$$slots:{default:[hi]},$$scope:{ctx:s}}}),Na=new Er({}),{c(){ca&&ca.c(),t=p(),Ya.c(),r=w("meta"),a=w("meta"),da&&da.c(),n=kt(),_=p(),F&&F.c(),d=p(),I&&I.c(),c=p(),N&&N.c(),u=p(),L&&L.c(),q=p(),O&&O.c(),A=p(),S(Y.$$.fragment),ce=p(),S(m.$$.fragment),ve=p(),S(re.$$.fragment),M=p(),G=w("p"),V=C("Up: "),Pe.c(),h=C(" · "),oe=w("a"),oe.textContent=Ve,ia=C(" · "),de=w("a"),de.textContent=La,Aa=C(" · "),le=w("a"),le.textContent=Ke,Ye=p(),S(Se.$$.fragment),ma=p(),we=w("h2"),we.innerHTML=Xe,Te=p(),me=w("p"),me.innerHTML=Oa,ua=p(),B.c(),ue=p(),S(fe.$$.fragment),fa=p(),Ce=w("p"),Ce.textContent=Pa,qe=p(),X=w("h3"),X.innerHTML=ha,Ne=p(),S(Le.$$.fragment),ga=p(),P&&P.c(),he=p(),U&&U.c(),ge=p(),se.c(),Ze=p(),S(Me.$$.fragment),Ge=p(),Z=w("h2"),Z.innerHTML=pa,Oe=p(),ke=w("h3"),ke.innerHTML=Ua,Ee=p(),z&&z.c(),pe=p(),S(ye.$$.fragment),ya=p(),Re=w("p"),Re.innerHTML=za,De=p(),ee=w("h3"),ee.innerHTML=ba,va=p(),S(Ae.$$.fragment),wa=p(),ae=w("h2"),ae.innerHTML=ea,aa=p(),S(Be.$$.fragment),ka=p(),He=w("h2"),He.innerHTML=ta,Fe=p(),S(be.$$.fragment),Ha=p(),$e=w("h2"),$e.innerHTML=Qa,k=p(),Q&&Q.c(),Ie=p(),W&&W.c(),ra=p(),_e=w("p"),Ue.c(),$a=p(),S(ja.$$.fragment),et=p(),S(xa.$$.fragment),at=p(),Ba=w("p"),ze.c(),tt=p(),Fa=w("p"),Fa.textContent=Et,rt=p(),sa=w("h2"),sa.innerHTML=Rt,it=p(),S(Sa.$$.fragment),st=p(),na=w("h2"),na.innerHTML=Dt,nt=p(),J&&J.c(),Wa=p(),S(Ta.$$.fragment),ot=p(),oa=w("h3"),oa.innerHTML=At,lt=p(),S(Ca.$$.fragment),_t=p(),qa=w("p"),qa.textContent=Bt,ct=p(),Ia=w("code"),Ia.textContent=Ft,dt=C(` (#302) without re-deciding either method.
`),la=w("h2"),la.innerHTML=It,mt=p(),Ma=w("ul"),Ma.innerHTML=Nt,ut=p(),_a=w("h2"),_a.innerHTML=Lt,ft=p(),Ga=w("p"),Ga.innerHTML=Ot,ht=p(),Ka=w("hr"),gt=p(),S(Na.$$.fragment),this.h()},l(e){ca&&ca.l(e),t=g(e);const i=Hr("svelte-2igo1p",document.head);Ya.l(i),r=v(i,"META",{name:!0,content:!0}),a=v(i,"META",{name:!0,content:!0}),da&&da.l(i),n=kt(),i.forEach(o),_=g(e),F&&F.l(e),d=g(e),I&&I.l(e),c=g(e),N&&N.l(e),u=g(e),L&&L.l(e),q=g(e),O&&O.l(e),A=g(e),x(Y.$$.fragment,e),ce=g(e),x(m.$$.fragment,e),ve=g(e),x(re.$$.fragment,e),M=g(e),G=v(e,"P",{});var R=We(G);V=T(R,"Up: "),Pe.l(R),h=T(R," · "),oe=v(R,"A",{href:!0,"data-svelte-h":!0}),E(oe)!=="svelte-1wjc2nq"&&(oe.textContent=Ve),ia=T(R," · "),de=v(R,"A",{href:!0,"data-svelte-h":!0}),E(de)!=="svelte-46ercb"&&(de.textContent=La),Aa=T(R," · "),le=v(R,"A",{href:!0,"data-svelte-h":!0}),E(le)!=="svelte-1qtzle"&&(le.textContent=Ke),R.forEach(o),Ye=g(e),x(Se.$$.fragment,e),ma=g(e),we=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(we)!=="svelte-14f17uo"&&(we.innerHTML=Xe),Te=g(e),me=v(e,"P",{class:!0,"data-svelte-h":!0}),E(me)!=="svelte-c9hxsx"&&(me.innerHTML=Oa),ua=g(e),B.l(e),ue=g(e),x(fe.$$.fragment,e),fa=g(e),Ce=v(e,"P",{class:!0,"data-svelte-h":!0}),E(Ce)!=="svelte-7ydgxc"&&(Ce.textContent=Pa),qe=g(e),X=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(X)!=="svelte-1mar2ld"&&(X.innerHTML=ha),Ne=g(e),x(Le.$$.fragment,e),ga=g(e),P&&P.l(e),he=g(e),U&&U.l(e),ge=g(e),se.l(e),Ze=g(e),x(Me.$$.fragment,e),Ge=g(e),Z=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(Z)!=="svelte-1i9w9pn"&&(Z.innerHTML=pa),Oe=g(e),ke=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(ke)!=="svelte-3hvew3"&&(ke.innerHTML=Ua),Ee=g(e),z&&z.l(e),pe=g(e),x(ye.$$.fragment,e),ya=g(e),Re=v(e,"P",{class:!0,"data-svelte-h":!0}),E(Re)!=="svelte-bgis0r"&&(Re.innerHTML=za),De=g(e),ee=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(ee)!=="svelte-5mc7pd"&&(ee.innerHTML=ba),va=g(e),x(Ae.$$.fragment,e),wa=g(e),ae=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(ae)!=="svelte-4kb45v"&&(ae.innerHTML=ea),aa=g(e),x(Be.$$.fragment,e),ka=g(e),He=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(He)!=="svelte-1mdzqzc"&&(He.innerHTML=ta),Fe=g(e),x(be.$$.fragment,e),Ha=g(e),$e=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E($e)!=="svelte-12k6lqd"&&($e.innerHTML=Qa),k=g(e),Q&&Q.l(e),Ie=g(e),W&&W.l(e),ra=g(e),_e=v(e,"P",{});var Da=We(_e);Ue.l(Da),Da.forEach(o),$a=g(e),x(ja.$$.fragment,e),et=g(e),x(xa.$$.fragment,e),at=g(e),Ba=v(e,"P",{});var Xa=We(Ba);ze.l(Xa),Xa.forEach(o),tt=g(e),Fa=v(e,"P",{"data-svelte-h":!0}),E(Fa)!=="svelte-ja6pm6"&&(Fa.textContent=Et),rt=g(e),sa=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(sa)!=="svelte-13a10dj"&&(sa.innerHTML=Rt),it=g(e),x(Sa.$$.fragment,e),st=g(e),na=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(na)!=="svelte-60cjj9"&&(na.innerHTML=Dt),nt=g(e),J&&J.l(e),Wa=g(e),x(Ta.$$.fragment,e),ot=g(e),oa=v(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),E(oa)!=="svelte-eb6276"&&(oa.innerHTML=At),lt=g(e),x(Ca.$$.fragment,e),_t=g(e),qa=v(e,"P",{class:!0,"data-svelte-h":!0}),E(qa)!=="svelte-mfbbhh"&&(qa.textContent=Bt),ct=g(e),Ia=v(e,"CODE",{"data-svelte-h":!0}),E(Ia)!=="svelte-1tryhly"&&(Ia.textContent=Ft),dt=T(e,` (#302) without re-deciding either method.
`),la=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(la)!=="svelte-ad0syq"&&(la.innerHTML=It),mt=g(e),Ma=v(e,"UL",{class:!0,"data-svelte-h":!0}),E(Ma)!=="svelte-1a4lwq8"&&(Ma.innerHTML=Nt),ut=g(e),_a=v(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),E(_a)!=="svelte-oimjns"&&(_a.innerHTML=Lt),ft=g(e),Ga=v(e,"P",{class:!0,"data-svelte-h":!0}),E(Ga)!=="svelte-1q7n514"&&(Ga.innerHTML=Ot),ht=g(e),Ka=v(e,"HR",{class:!0}),gt=g(e),x(Na.$$.fragment,e),this.h()},h(){b(r,"name","twitter:card"),b(r,"content","summary_large_image"),b(a,"name","twitter:site"),b(a,"content","@evidence_dev"),b(oe,"href","/gentriduck/hamburg/area/subarea_l1"),b(de,"href","/gentriduck/hamburg/area/district"),b(le,"href","/gentriduck/hamburg/area"),b(we,"class","markdown"),b(we,"id","social-status--trajectory"),b(me,"class","markdown"),b(Ce,"class","markdown"),b(X,"class","markdown"),b(X,"id","trajectory-mix-20192025"),b(Z,"class","markdown"),b(Z,"id","commercial-mix--offering-advantage"),b(ke,"class","markdown"),b(ke,"id","mapped-places"),b(Re,"class","markdown"),b(ee,"class","markdown"),b(ee,"id","offering-advantage-across-the-area-hierarchy"),b(ae,"class","markdown"),b(ae,"id","within-group-dominance"),b(He,"class","markdown"),b(He,"id","people--structure"),b($e,"class","markdown"),b($e,"id","amenities--everyday-infrastructure"),b(sa,"class","markdown"),b(sa,"id","land-value--estimated-rent"),b(na,"class","markdown"),b(na,"id","where-this-area-sits"),b(oa,"class","markdown"),b(oa,"id","gebiete-in-this-stadtteil"),b(qa,"class","markdown"),b(la,"class","markdown"),b(la,"id","honest-caveats"),b(Ma,"class","markdown"),b(_a,"class","markdown"),b(_a,"id","further-reading"),b(Ga,"class","markdown"),b(Ka,"class","markdown")},m(e,i){ca&&ca.m(e,i),l(e,t,i),Ya.m(document.head,null),ne(document.head,r),ne(document.head,a),da&&da.m(document.head,null),ne(document.head,n),l(e,_,i),F&&F.m(e,i),l(e,d,i),I&&I.m(e,i),l(e,c,i),N&&N.m(e,i),l(e,u,i),L&&L.m(e,i),l(e,q,i),O&&O.m(e,i),l(e,A,i),j(Y,e,i),l(e,ce,i),j(m,e,i),l(e,ve,i),j(re,e,i),l(e,M,i),l(e,G,i),ne(G,V),Pe.m(G,null),ne(G,h),ne(G,oe),ne(G,ia),ne(G,de),ne(G,Aa),ne(G,le),l(e,Ye,i),j(Se,e,i),l(e,ma,i),l(e,we,i),l(e,Te,i),l(e,me,i),l(e,ua,i),Ea[ie].m(e,i),l(e,ue,i),j(fe,e,i),l(e,fa,i),l(e,Ce,i),l(e,qe,i),l(e,X,i),l(e,Ne,i),j(Le,e,i),l(e,ga,i),P&&P.m(e,i),l(e,he,i),U&&U.m(e,i),l(e,ge,i),Ra[K].m(e,i),l(e,Ze,i),j(Me,e,i),l(e,Ge,i),l(e,Z,i),l(e,Oe,i),l(e,ke,i),l(e,Ee,i),z&&z.m(e,i),l(e,pe,i),j(ye,e,i),l(e,ya,i),l(e,Re,i),l(e,De,i),l(e,ee,i),l(e,va,i),j(Ae,e,i),l(e,wa,i),l(e,ae,i),l(e,aa,i),j(Be,e,i),l(e,ka,i),l(e,He,i),l(e,Fe,i),j(be,e,i),l(e,Ha,i),l(e,$e,i),l(e,k,i),Q&&Q.m(e,i),l(e,Ie,i),W&&W.m(e,i),l(e,ra,i),l(e,_e,i),Ue.m(_e,null),l(e,$a,i),j(ja,e,i),l(e,et,i),j(xa,e,i),l(e,at,i),l(e,Ba,i),ze.m(Ba,null),l(e,tt,i),l(e,Fa,i),l(e,rt,i),l(e,sa,i),l(e,it,i),j(Sa,e,i),l(e,st,i),l(e,na,i),l(e,nt,i),J&&J.m(e,i),l(e,Wa,i),j(Ta,e,i),l(e,ot,i),l(e,oa,i),l(e,lt,i),j(Ca,e,i),l(e,_t,i),l(e,qa,i),l(e,ct,i),l(e,Ia,i),l(e,dt,i),l(e,la,i),l(e,mt,i),l(e,Ma,i),l(e,ut,i),l(e,_a,i),l(e,ft,i),l(e,Ga,i),l(e,ht,i),l(e,Ka,i),l(e,gt,i),j(Na,e,i),pt=!0},p(e,i){var rr;typeof H<"u"&&(H.title||(rr=H.og)!=null&&rr.title)&&H.hide_title!==!0&&ca.p(e,i),Ya.p(e,i),typeof H=="object"&&da.p(e,i),e[0]?F?(F.p(e,i),i[0]&1&&f(F,1)):(F=lr(e),F.c(),f(F,1),F.m(d.parentNode,d)):F&&(xe(),y(F,1,1,()=>{F=null}),je()),e[3]?I?(I.p(e,i),i[0]&8&&f(I,1)):(I=_r(e),I.c(),f(I,1),I.m(c.parentNode,c)):I&&(xe(),y(I,1,1,()=>{I=null}),je()),e[4]?N?(N.p(e,i),i[0]&16&&f(N,1)):(N=cr(e),N.c(),f(N,1),N.m(u.parentNode,u)):N&&(xe(),y(N,1,1,()=>{N=null}),je()),e[5]?L?(L.p(e,i),i[0]&32&&f(L,1)):(L=dr(e),L.c(),f(L,1),L.m(q.parentNode,q)):L&&(xe(),y(L,1,1,()=>{L=null}),je()),e[1]?O?(O.p(e,i),i[0]&2&&f(O,1)):(O=mr(e),O.c(),f(O,1),O.m(A.parentNode,A)):O&&(xe(),y(O,1,1,()=>{O=null}),je());const R={};i[0]&16384&&(R.crumbs=e[14]),Y.$set(R);const Da={};i[0]&8192&&(Da.title=e[13]),m.$set(Da);const Xa={};i[0]&1&&(Xa.title=(e[0][0]?e[0][0].area_name:"Stadtteil")+" — Stadtteil profile"),re.$set(Xa),yt===(yt=Pt(e))&&Pe?Pe.p(e,i):(Pe.d(1),Pe=yt(e),Pe&&(Pe.c(),Pe.m(G,h)));const Yt={};i[2]&8388608&&(Yt.$$scope={dirty:i,ctx:e}),Se.$set(Yt);let $t=ie;ie=zt(e),ie===$t?Ea[ie].p(e,i):(xe(),y(Ea[$t],1,1,()=>{Ea[$t]=null}),je(),B=Ea[ie],B?B.p(e,i):(B=Ea[ie]=Ut[ie](e),B.c()),f(B,1),B.m(ue.parentNode,ue));const jt={};i[0]&32&&(jt.data=e[5]),i[0]&1&&(jt.title="Gebiete by current stage, "+(e[0][0]?e[0][0].area_name:"this Stadtteil")),fe.$set(jt),e[6]?P?(P.p(e,i),i[0]&64&&f(P,1)):(P=ur(e),P.c(),f(P,1),P.m(he.parentNode,he)):P&&(xe(),y(P,1,1,()=>{P=null}),je()),e[2]?U?(U.p(e,i),i[0]&4&&f(U,1)):(U=fr(e),U.c(),f(U,1),U.m(ge.parentNode,ge)):U&&(xe(),y(U,1,1,()=>{U=null}),je());let xt=K;K=Wt(e),K===xt?Ra[K].p(e,i):(xe(),y(Ra[xt],1,1,()=>{Ra[xt]=null}),je(),se=Ra[K],se?se.p(e,i):(se=Ra[K]=Qt[K](e),se.c()),f(se,1),se.m(Ze.parentNode,Ze));const St={};i[0]&64&&(St.data=e[6]),i[0]&1&&(St.title="Gebiete by trajectory classification, 2019–2025 ("+(e[0][0]?e[0][0].area_name:"this Stadtteil")+")"),Me.$set(St),e[7]?z?(z.p(e,i),i[0]&128&&f(z,1)):(z=hr(e),z.c(),f(z,1),z.m(pe.parentNode,pe)):z&&(xe(),y(z,1,1,()=>{z=null}),je());const Tt={};i[0]&128&&(Tt.data=e[7]),i[0]&1&&(Tt.title="Mapped places by category (latest snapshot), "+(e[0][0]?e[0][0].area_name:"this Stadtteil")),ye.$set(Tt);const Xt={};i[2]&8388608&&(Xt.$$scope={dirty:i,ctx:e}),Ae.$set(Xt);const Zt={};i[2]&8388608&&(Zt.$$scope={dirty:i,ctx:e}),Be.$set(Zt);const er={};i[2]&8388608&&(er.$$scope={dirty:i,ctx:e}),be.$set(er),e[8]?Q?(Q.p(e,i),i[0]&256&&f(Q,1)):(Q=gr(e),Q.c(),f(Q,1),Q.m(Ie.parentNode,Ie)):Q&&(xe(),y(Q,1,1,()=>{Q=null}),je()),e[9]?W?(W.p(e,i),i[0]&512&&f(W,1)):(W=pr(e),W.c(),f(W,1),W.m(ra.parentNode,ra)):W&&(xe(),y(W,1,1,()=>{W=null}),je()),bt===(bt=Jt(e))&&Ue?Ue.p(e,i):(Ue.d(1),Ue=bt(e),Ue&&(Ue.c(),Ue.m(_e,null)));const Ct={};i[0]&512&&(Ct.data=e[9]),i[2]&8388608&&(Ct.$$scope={dirty:i,ctx:e}),ja.$set(Ct);const ar={};i[2]&8388608&&(ar.$$scope={dirty:i,ctx:e}),xa.$set(ar),vt===(vt=Vt(e))&&ze?ze.p(e,i):(ze.d(1),ze=vt(e),ze&&(ze.c(),ze.m(Ba,null)));const tr={};i[2]&8388608&&(tr.$$scope={dirty:i,ctx:e}),Sa.$set(tr),e[10]?J?(J.p(e,i),i[0]&1024&&f(J,1)):(J=yr(e),J.c(),f(J,1),J.m(Wa.parentNode,Wa)):J&&(xe(),y(J,1,1,()=>{J=null}),je());const qt={};i[0]&1024&&(qt.data=e[10]),i[0]&1&&(qt.title=(e[0][0]?e[0][0].area_name:"This Stadtteil")+" and its statistische Gebiete"),Ta.$set(qt);const Mt={};i[0]&16&&(Mt.data=e[4]),i[2]&8388608&&(Mt.$$scope={dirty:i,ctx:e}),Ca.$set(Mt)},i(e){pt||(f(F),f(I),f(N),f(L),f(O),f(Y.$$.fragment,e),f(m.$$.fragment,e),f(re.$$.fragment,e),f(Se.$$.fragment,e),f(B),f(fe.$$.fragment,e),f(Le.$$.fragment,e),f(P),f(U),f(se),f(Me.$$.fragment,e),f(z),f(ye.$$.fragment,e),f(Ae.$$.fragment,e),f(Be.$$.fragment,e),f(be.$$.fragment,e),f(Q),f(W),f(ja.$$.fragment,e),f(xa.$$.fragment,e),f(Sa.$$.fragment,e),f(J),f(Ta.$$.fragment,e),f(Ca.$$.fragment,e),f(Na.$$.fragment,e),pt=!0)},o(e){y(F),y(I),y(N),y(L),y(O),y(Y.$$.fragment,e),y(m.$$.fragment,e),y(re.$$.fragment,e),y(Se.$$.fragment,e),y(B),y(fe.$$.fragment,e),y(Le.$$.fragment,e),y(P),y(U),y(se),y(Me.$$.fragment,e),y(z),y(ye.$$.fragment,e),y(Ae.$$.fragment,e),y(Be.$$.fragment,e),y(be.$$.fragment,e),y(Q),y(W),y(ja.$$.fragment,e),y(xa.$$.fragment,e),y(Sa.$$.fragment,e),y(J),y(Ta.$$.fragment,e),y(Ca.$$.fragment,e),y(Na.$$.fragment,e),pt=!1},d(e){e&&(o(t),o(_),o(d),o(c),o(u),o(q),o(A),o(ce),o(ve),o(M),o(G),o(Ye),o(ma),o(we),o(Te),o(me),o(ua),o(ue),o(fa),o(Ce),o(qe),o(X),o(Ne),o(ga),o(he),o(ge),o(Ze),o(Ge),o(Z),o(Oe),o(ke),o(Ee),o(pe),o(ya),o(Re),o(De),o(ee),o(va),o(wa),o(ae),o(aa),o(ka),o(He),o(Fe),o(Ha),o($e),o(k),o(Ie),o(ra),o(_e),o($a),o(et),o(at),o(Ba),o(tt),o(Fa),o(rt),o(sa),o(it),o(st),o(na),o(nt),o(Wa),o(ot),o(oa),o(lt),o(_t),o(qa),o(ct),o(Ia),o(dt),o(la),o(mt),o(Ma),o(ut),o(_a),o(ft),o(Ga),o(ht),o(Ka),o(gt)),ca&&ca.d(e),Ya.d(e),o(r),o(a),da&&da.d(e),o(n),F&&F.d(e),I&&I.d(e),N&&N.d(e),L&&L.d(e),O&&O.d(e),$(Y,e),$(m,e),$(re,e),Pe.d(),$(Se,e),Ea[ie].d(e),$(fe,e),$(Le,e),P&&P.d(e),U&&U.d(e),Ra[K].d(e),$(Me,e),z&&z.d(e),$(ye,e),$(Ae,e),$(Be,e),$(be,e),Q&&Q.d(e),W&&W.d(e),Ue.d(),$(ja,e),$(xa,e),ze.d(),$(Sa,e),J&&J.d(e),$(Ta,e),$(Ca,e),$(Na,e)}}}const H={};function pi(s,t,r){let a,n,_,d,c,u,q,A,Y;ir(s,Lr,k=>r(65,A=k)),ir(s,or,k=>r(70,Y=k));let{data:ce}=t,{data:m={},customFormattingSettings:ve,__db:re,inputs:M}=ce;$r(or,Y="942e554bfdff103e6542015d14f614c7",Y);let G=Br(Ar(M));jr(G.subscribe(k=>M=k)),xr(Nr,{getCustomFormats:()=>ve.customFormats||[]});const V=(k,Ie)=>Or(re.query,k,{query_name:Ie});Fr(V);let h=A.params;Sr(()=>!0);let oe={initialData:void 0,initialError:void 0},Ve=D`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`,ia=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`;m.stadtteil_name_data&&(m.stadtteil_name_data instanceof Error?oe.initialError=m.stadtteil_name_data:oe.initialData=m.stadtteil_name_data,m.stadtteil_name_columns&&(oe.knownColumns=m.stadtteil_name_columns));let de,La=!1;const Aa=Qe.createReactive({callback:k=>{r(0,de=k)},execFn:V},{id:"stadtteil_name",...oe});Aa(ia,{noResolve:Ve,...oe}),globalThis[Symbol.for("stadtteil_name")]={get value(){return de}};let le={initialData:void 0,initialError:void 0},Ke=D`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
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
limit 1`,Ye=`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
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
limit 1`;m.parent_info_data&&(m.parent_info_data instanceof Error?le.initialError=m.parent_info_data:le.initialData=m.parent_info_data,m.parent_info_columns&&(le.knownColumns=m.parent_info_columns));let Se,ma=!1;const we=Qe.createReactive({callback:k=>{r(3,Se=k)},execFn:V},{id:"parent_info",...le});we(Ye,{noResolve:Ke,...le}),globalThis[Symbol.for("parent_info")]={get value(){return Se}};let Xe={initialData:void 0,initialError:void 0},Te=D`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by gebiet_name`,me=`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by gebiet_name`;m.children_data&&(m.children_data instanceof Error?Xe.initialError=m.children_data:Xe.initialData=m.children_data,m.children_columns&&(Xe.knownColumns=m.children_columns));let Oa,ua=!1;const ie=Qe.createReactive({callback:k=>{r(4,Oa=k)},execFn:V},{id:"children",...Xe});ie(me,{noResolve:Te,...Xe}),globalThis[Symbol.for("children")]={get value(){return Oa}};let B={initialData:void 0,initialError:void 0},ue=D`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
order by n_areas desc`,fe=`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
order by n_areas desc`;m.stage_mix_data&&(m.stage_mix_data instanceof Error?B.initialError=m.stage_mix_data:B.initialData=m.stage_mix_data,m.stage_mix_columns&&(B.knownColumns=m.stage_mix_columns));let fa,Ce=!1;const Pa=Qe.createReactive({callback:k=>{r(5,fa=k)},execFn:V},{id:"stage_mix",...B});Pa(fe,{noResolve:ue,...B}),globalThis[Symbol.for("stage_mix")]={get value(){return fa}};let qe={initialData:void 0,initialError:void 0},X=D`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and h.parent_area_code = '${h.code}' and gi.status_class is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`,ha=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and h.parent_area_code = '${h.code}' and gi.status_class is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`;m.stage_mix_summary_data&&(m.stage_mix_summary_data instanceof Error?qe.initialError=m.stage_mix_summary_data:qe.initialData=m.stage_mix_summary_data,m.stage_mix_summary_columns&&(qe.knownColumns=m.stage_mix_summary_columns));let Ne,Le=!1;const ga=Qe.createReactive({callback:k=>{r(1,Ne=k)},execFn:V},{id:"stage_mix_summary",...qe});ga(ha,{noResolve:X,...qe}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return Ne}};let he={initialData:void 0,initialError:void 0},ge=D`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
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
order by n_areas desc`,K=`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
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
order by n_areas desc`;m.trajectory_mix_data&&(m.trajectory_mix_data instanceof Error?he.initialError=m.trajectory_mix_data:he.initialData=m.trajectory_mix_data,m.trajectory_mix_columns&&(he.knownColumns=m.trajectory_mix_columns));let se,Ze=!1;const Me=Qe.createReactive({callback:k=>{r(6,se=k)},execFn:V},{id:"trajectory_mix",...he});Me(K,{noResolve:ge,...he}),globalThis[Symbol.for("trajectory_mix")]={get value(){return se}};let Ge={initialData:void 0,initialError:void 0},Z=D`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`,pa=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`;m.trajectory_mix_summary_data&&(m.trajectory_mix_summary_data instanceof Error?Ge.initialError=m.trajectory_mix_summary_data:Ge.initialData=m.trajectory_mix_summary_data,m.trajectory_mix_summary_columns&&(Ge.knownColumns=m.trajectory_mix_summary_columns));let Oe,ke=!1;const Ua=Qe.createReactive({callback:k=>{r(2,Oe=k)},execFn:V},{id:"trajectory_mix_summary",...Ge});Ua(pa,{noResolve:Z,...Ge}),globalThis[Symbol.for("trajectory_mix_summary")]={get value(){return Oe}};let Ee={initialData:void 0,initialError:void 0},pe=D`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
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
order by poi_count desc`,ye=`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
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
order by poi_count desc`;m.poi_mix_data&&(m.poi_mix_data instanceof Error?Ee.initialError=m.poi_mix_data:Ee.initialData=m.poi_mix_data,m.poi_mix_columns&&(Ee.knownColumns=m.poi_mix_columns));let ya,Re=!1;const za=Qe.createReactive({callback:k=>{r(7,ya=k)},execFn:V},{id:"poi_mix",...Ee});za(ye,{noResolve:pe,...Ee}),globalThis[Symbol.for("poi_mix")]={get value(){return ya}};let De={initialData:void 0,initialError:void 0},ee=D`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`,ba=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`;m.amenities_current_data&&(m.amenities_current_data instanceof Error?De.initialError=m.amenities_current_data:De.initialData=m.amenities_current_data,m.amenities_current_columns&&(De.knownColumns=m.amenities_current_columns));let va,Ae=!1;const wa=Qe.createReactive({callback:k=>{r(8,va=k)},execFn:V},{id:"amenities_current",...De});wa(ba,{noResolve:ee,...De}),globalThis[Symbol.for("amenities_current")]={get value(){return va}};let ae={initialData:void 0,initialError:void 0},ea=D`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`,aa=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`;m.amenities_table_data&&(m.amenities_table_data instanceof Error?ae.initialError=m.amenities_table_data:ae.initialData=m.amenities_table_data,m.amenities_table_columns&&(ae.knownColumns=m.amenities_table_columns));let Be,ka=!1;const He=Qe.createReactive({callback:k=>{r(9,Be=k)},execFn:V},{id:"amenities_table",...ae});He(aa,{noResolve:ea,...ae}),globalThis[Symbol.for("amenities_table")]={get value(){return Be}};let ta={initialData:void 0,initialError:void 0},Fe=D`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Za}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`,be=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Za}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`;m.minimap_areas_data&&(m.minimap_areas_data instanceof Error?ta.initialError=m.minimap_areas_data:ta.initialData=m.minimap_areas_data,m.minimap_areas_columns&&(ta.knownColumns=m.minimap_areas_columns));let Ha,$e=!1;const Qa=Qe.createReactive({callback:k=>{r(10,Ha=k)},execFn:V},{id:"minimap_areas",...ta});return Qa(be,{noResolve:Fe,...ta}),globalThis[Symbol.for("minimap_areas")]={get value(){return Ha}},s.$$set=k=>{"data"in k&&r(15,ce=k.data)},s.$$.update=()=>{var k;s.$$.dirty[0]&32768&&r(16,{data:m={},customFormattingSettings:ve,__db:re}=ce,m),s.$$.dirty[0]&65536&&Ir.set(Object.keys(m).length>0),s.$$.dirty[2]&8&&r(17,h=A.params),s.$$.dirty[0]&131072&&r(19,Ve=D`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`),s.$$.dirty[0]&131072&&r(20,ia=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
limit 1`),s.$$.dirty[0]&3932160&&(Ve||!La?Ve||(Aa(ia,{noResolve:Ve,...oe}),r(21,La=!0)):Aa(ia,{noResolve:Ve})),s.$$.dirty[0]&131072&&r(23,Ke=D`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
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
limit 1`),s.$$.dirty[0]&131072&&r(24,Ye=`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
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
limit 1`),s.$$.dirty[0]&62914560&&(Ke||!ma?Ke||(we(Ye,{noResolve:Ke,...le}),r(25,ma=!0)):we(Ye,{noResolve:Ke})),s.$$.dirty[0]&131072&&r(27,Te=D`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by gebiet_name`),s.$$.dirty[0]&131072&&r(28,me=`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name. #353: plus each Gebiet's current stage (the same per-Gebiet row /hamburg/maps
-- shows), mirroring the stage column on Berlin's coarse-page children tables.
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by gebiet_name`),s.$$.dirty[0]&1006632960&&(Te||!ua?Te||(ie(me,{noResolve:Te,...Xe}),r(29,ua=!0)):ie(me,{noResolve:Te})),s.$$.dirty[0]&131072&&r(31,ue=D`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
order by n_areas desc`),s.$$.dirty[0]&131072&&r(32,fe=`-- #353: COUNT of this Stadtteil's Gebiete by current stage (see header note) -- same shape as
-- pages/berlin/area/bzr/[code].md's stage_mix, grouped through mart_area_hierarchy instead of a
-- code prefix (Hamburg codes don't nest).
select
    -- Not 'uninhabited': a Gebiet without a stage may simply be below Hamburg's own reporting
    -- threshold, so the label only says what is known (no stage on record). Cf. the #313 domain
    -- sign-off's D-7 finding about an unconditional 'uninhabited' label.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
order by n_areas desc`),s.$$.dirty[0]&1073741824|s.$$.dirty[1]&7&&(ue||!Ce?ue||(Pa(fe,{noResolve:ue,...B}),r(33,Ce=!0)):Pa(fe,{noResolve:ue})),s.$$.dirty[0]&131072&&r(35,X=D`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and h.parent_area_code = '${h.code}' and gi.status_class is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&131072&&r(36,ha=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix -- Berlin's stage_mix_summary
-- pattern. Gebiete with no stage in the latest edition are excluded from the
-- total, so the sentence only counts Gebiete that actually carry a stage.
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and h.parent_area_code = '${h.code}' and gi.status_class is not null
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[1]&120&&(X||!Le?X||(ga(ha,{noResolve:X,...qe}),r(37,Le=!0)):ga(ha,{noResolve:X})),s.$$.dirty[0]&131072&&r(39,ge=D`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
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
order by n_areas desc`),s.$$.dirty[0]&131072&&r(40,K=`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
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
order by n_areas desc`),s.$$.dirty[1]&1920&&(ge||!Ze?ge||(Me(K,{noResolve:ge,...he}),r(41,Ze=!0)):Me(K,{noResolve:ge})),s.$$.dirty[0]&131072&&r(43,Z=D`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`),s.$$.dirty[0]&131072&&r(44,pa=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`),s.$$.dirty[1]&30720&&(Z||!ke?Z||(Ua(pa,{noResolve:Z,...Ge}),r(45,ke=!0)):Ua(pa,{noResolve:Z})),s.$$.dirty[0]&131072&&r(47,pe=D`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
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
order by poi_count desc`),s.$$.dirty[0]&131072&&r(48,ye=`-- #353: SUM of this Stadtteil's Gebiete' latest-snapshot counts -- same shape as Berlin's
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
order by poi_count desc`),s.$$.dirty[1]&491520&&(pe||!Re?pe||(za(ye,{noResolve:pe,...Ee}),r(49,Re=!0)):za(ye,{noResolve:pe})),s.$$.dirty[0]&131072&&r(51,ee=D`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&131072&&r(52,ba=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${h.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[1]&7864320&&(ee||!Ae?ee||(wa(ba,{noResolve:ee,...De}),r(53,Ae=!0)):wa(ba,{noResolve:ee})),s.$$.dirty[0]&131072&&r(55,ea=D`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`),s.$$.dirty[0]&131072&&r(56,aa=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`),s.$$.dirty[1]&125829120&&(ea||!ka?ea||(He(aa,{noResolve:ea,...ae}),r(57,ka=!0)):He(aa,{noResolve:ea})),s.$$.dirty[0]&131072&&r(59,Fe=D`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Za}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`),s.$$.dirty[0]&131072&&r(60,be=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Za}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${h.code}'
order by sort_order, area_name`),s.$$.dirty[1]&2013265920&&(Fe||!$e?Fe||(Qa(be,{noResolve:Fe,...ta}),r(61,$e=!0)):Qa(be,{noResolve:Fe})),s.$$.dirty[0]&1&&r(64,a=((k=de==null?void 0:de[0])==null?void 0:k.area_name)??null),s.$$.dirty[2]&4&&r(14,n=[{label:"Hamburg",href:"/hamburg"},{label:"Stadtteile",href:"/hamburg/area/subarea_l1"},{label:a??"Stadtteil"}]),s.$$.dirty[2]&4&&r(13,_=a?`${a} — Stadtteil profile · Hamburg`:null),s.$$.dirty[0]&2&&r(63,d=Ne==null?void 0:Ne[0]),s.$$.dirty[2]&2&&r(12,c=!d||d.n_total==null||Number(d.n_total)===0?null:(()=>{const Ie=Number(d.n_total),ra=Number(d.n_advanced||0),_e=d.top_stage_share!=null?Number(d.top_stage_share):null,$a=_e!=null&&_e>.5?`<b>${d.top_stage}</b> is the only stage holding a majority (${Math.round(_e*100)}%)`:"no single stage holds a majority";return`<b>${ra}</b> of <b>${Ie}</b> Gebiete with a current stage here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${$a} — a distribution across this Stadtteil's own Gebiete, never a single re-scored gentrification-index value for the Stadtteil itself.`})()),s.$$.dirty[0]&4&&r(62,u=Oe==null?void 0:Oe[0]),s.$$.dirty[2]&1&&r(11,q=!u||u.n_total==null||Number(u.n_total)===0?null:(()=>{const Ie=Number(u.n_total),ra=Number(u.n_trending||0),_e=u.top_type_share!=null?Number(u.top_type_share):null,$a=_e!=null&&_e>.5?`<b>${u.top_type}</b> is the only trajectory type holding a majority (${Math.round(_e*100)}%)`:"no single trajectory type holds a majority";return`<b>${ra}</b> of <b>${Ie}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${$a} — a distribution across this Stadtteil's own Gebiete, never a single re-scored value for the Stadtteil itself.`})())},[de,Ne,Oe,Se,Oa,fa,se,ya,va,Be,Ha,q,c,_,n,ce,m,h,oe,Ve,ia,La,le,Ke,Ye,ma,Xe,Te,me,ua,B,ue,fe,Ce,qe,X,ha,Le,he,ge,K,Ze,Ge,Z,pa,ke,Ee,pe,ye,Re,De,ee,ba,Ae,ae,ea,aa,ka,ta,Fe,be,$e,u,d,a,A]}class Di extends Tr{constructor(t){super(),Cr(this,t,pi,gi,kr,{data:15},null,[-1,-1,-1])}}export{Di as component};
