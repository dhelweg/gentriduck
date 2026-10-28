import{s as Ai,d as l,x as Li,w as Ie,i as _,a as $,b as k,c as g,h as Ii,e as w,f as br,g as X,j as b,k as q,l as y,m as H,t as v,n as oi,o as Bi,p as Ni,q as Fi,r as Pi,u as Be,v as zi,H as Ui}from"../chunks/scheduler.CmMeO4ay.js";import{S as Qi,i as Ji,d as G,t as h,a as m,c as K,m as R,b as E,e as M,g as Y}from"../chunks/index.bfDa0Uqw.js";import{e as li}from"../chunks/each.B24DDXJR.js";import{A as Vi,P as Wi,a as Ki}from"../chunks/PageTitle.nASIZfTP.js";import{F as Yi}from"../chunks/FooterNav.BbND9dxm.js";import{H as Xi}from"../chunks/HamburgTrajectoryNote.BKIaPPmK.js";import{H as Zi}from"../chunks/Hero.wYia6TQ0.js";import{N as gr}from"../chunks/NotYetPublished.BlNA0MP2.js";import{D as es,C as Rr}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as ts,w as as}from"../chunks/entry.vKQYRLhF.js";import{A as ca}from"../chunks/Alert.BNZjDqvU.js";import{e as rs,s as is,Q as We,p as ss,a as _i,r as ci,C as ns}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as U}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as os}from"../chunks/stores.CGa44sBH.js";import{Q as Ke}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as ls,E as _s}from"../chunks/BarChart.BZFK7Gke.js";import{B as yr}from"../chunks/BigValue.Cf_smc5N.js";import{p as cs}from"../chunks/profile.BW8tN6E9.js";function di(i,a,r){const t=i.slice();return t[125]=a[r],t}function ds(i){var n;let a,r=(D.title??((n=D.og)==null?void 0:n.title))+"",t;return{c(){a=H("h1"),t=v(r),this.h()},l(o){a=w(o,"H1",{class:!0});var d=X(a);t=b(d,r),d.forEach(l),this.h()},h(){k(a,"class","title")},m(o,d){_(o,a,d),$(a,t)},p:Be,d(o){o&&l(a)}}}function ms(i){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:Be,p:Be,d:Be}}function us(i){var d;let a,r,t,n,o;return document.title=a=D.title??((d=D.og)==null?void 0:d.title),{c(){r=y(),t=H("meta"),n=y(),o=H("meta"),this.h()},l(c){r=g(c),t=w(c,"META",{property:!0,content:!0}),n=g(c),o=w(c,"META",{name:!0,content:!0}),this.h()},h(){var c,p;k(t,"property","og:title"),k(t,"content",((c=D.og)==null?void 0:c.title)??D.title),k(o,"name","twitter:title"),k(o,"content",((p=D.og)==null?void 0:p.title)??D.title)},m(c,p){_(c,r,p),_(c,t,p),_(c,n,p),_(c,o,p)},p(c,p){var j;p&0&&a!==(a=D.title??((j=D.og)==null?void 0:j.title))&&(document.title=a)},d(c){c&&(l(r),l(t),l(n),l(o))}}}function fs(i){var o,d;let a,r,t=(D.description||((o=D.og)==null?void 0:o.description))&&hs(),n=((d=D.og)==null?void 0:d.image)&&ps();return{c(){t&&t.c(),a=y(),n&&n.c(),r=br()},l(c){t&&t.l(c),a=g(c),n&&n.l(c),r=br()},m(c,p){t&&t.m(c,p),_(c,a,p),n&&n.m(c,p),_(c,r,p)},p(c,p){var j,S;(D.description||(j=D.og)!=null&&j.description)&&t.p(c,p),(S=D.og)!=null&&S.image&&n.p(c,p)},d(c){c&&(l(a),l(r)),t&&t.d(c),n&&n.d(c)}}}function hs(i){let a,r,t,n,o;return{c(){a=H("meta"),r=y(),t=H("meta"),n=y(),o=H("meta"),this.h()},l(d){a=w(d,"META",{name:!0,content:!0}),r=g(d),t=w(d,"META",{property:!0,content:!0}),n=g(d),o=w(d,"META",{name:!0,content:!0}),this.h()},h(){var d,c,p;k(a,"name","description"),k(a,"content",D.description??((d=D.og)==null?void 0:d.description)),k(t,"property","og:description"),k(t,"content",((c=D.og)==null?void 0:c.description)??D.description),k(o,"name","twitter:description"),k(o,"content",((p=D.og)==null?void 0:p.description)??D.description)},m(d,c){_(d,a,c),_(d,r,c),_(d,t,c),_(d,n,c),_(d,o,c)},p:Be,d(d){d&&(l(a),l(r),l(t),l(n),l(o))}}}function ps(i){let a,r,t;return{c(){a=H("meta"),r=y(),t=H("meta"),this.h()},l(n){a=w(n,"META",{property:!0,content:!0}),r=g(n),t=w(n,"META",{name:!0,content:!0}),this.h()},h(){var n,o;k(a,"property","og:image"),k(a,"content",_i((n=D.og)==null?void 0:n.image)),k(t,"name","twitter:image"),k(t,"content",_i((o=D.og)==null?void 0:o.image))},m(n,o){_(n,a,o),_(n,r,o),_(n,t,o)},p:Be,d(n){n&&(l(a),l(r),l(t))}}}function mi(i){let a,r;return a=new Ke({props:{queryID:"code_info",queryResult:i[0]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&1&&(o.queryResult=t[0]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function ui(i){let a,r;return a=new Ke({props:{queryID:"area_exists",queryResult:i[15]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&32768&&(o.queryResult=t[15]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function fi(i){let a,r;return a=new Ke({props:{queryID:"name_info",queryResult:i[1]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&2&&(o.queryResult=t[1]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function hi(i){let a,r;return a=new Ke({props:{queryID:"parent_info",queryResult:i[2]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&4&&(o.queryResult=t[2]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function pi(i){let a,r;return a=new Ke({props:{queryID:"current_stage",queryResult:i[3]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&8&&(o.queryResult=t[3]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function gi(i){let a,r;return a=new Ke({props:{queryID:"trajectory_summary",queryResult:i[4]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&16&&(o.queryResult=t[4]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function yi(i){let a,r;return a=new Ke({props:{queryID:"sibling_trajectory_mix",queryResult:i[5]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&32&&(o.queryResult=t[5]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function bi(i){let a,r;return a=new Ke({props:{queryID:"gebiet_label_stats",queryResult:i[6]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&64&&(o.queryResult=t[6]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function gs(i){let a,r="Stadtteil profile";return{c(){a=H("a"),a.textContent=r,this.h()},l(t){a=w(t,"A",{href:!0,"data-svelte-h":!0}),q(a)!=="svelte-220xn5"&&(a.textContent=r),this.h()},h(){k(a,"href","/gentriduck/hamburg/area/subarea_l1")},m(t,n){_(t,a,n)},p:Be,d(t){t&&l(a)}}}function ys(i){let a,r=(i[2][0].stadtteil_name??"Stadtteil profile")+"",t,n;return{c(){a=H("a"),t=v(r),this.h()},l(o){a=w(o,"A",{href:!0});var d=X(a);t=b(d,r),d.forEach(l),this.h()},h(){k(a,"href",n="/gentriduck/hamburg/area/subarea_l1/"+i[2][0].stadtteil_code)},m(o,d){_(o,a,d),$(a,t)},p(o,d){d[0]&4&&r!==(r=(o[2][0].stadtteil_name??"Stadtteil profile")+"")&&Ie(t,r),d[0]&4&&n!==(n="/gentriduck/hamburg/area/subarea_l1/"+o[2][0].stadtteil_code)&&k(a,"href",n)},d(o){o&&l(a)}}}function vi(i){let a,r;return a=new ca({props:{status:"warning",$$slots:{default:[bs]},$$scope:{ctx:i}}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&16384|n[4]&16&&(o.$$scope={dirty:n,ctx:t}),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function bs(i){let a,r,t,n,o,d="the Gebiet list",c;return{c(){a=v("No Hamburg Gebiet geometry found for code "),r=H("b"),t=v(i[14]),n=v(` —
  this route should only be reachable via a real crawled link from
  `),o=H("a"),o.textContent=d,c=v(`; if you landed here another way, that list is the
  reliable starting point.`),this.h()},l(p){a=b(p,"No Hamburg Gebiet geometry found for code "),r=w(p,"B",{});var j=X(r);t=b(j,i[14]),j.forEach(l),n=b(p,` —
  this route should only be reachable via a real crawled link from
  `),o=w(p,"A",{href:!0,"data-svelte-h":!0}),q(o)!=="svelte-5vmt59"&&(o.textContent=d),c=b(p,`; if you landed here another way, that list is the
  reliable starting point.`),this.h()},h(){k(o,"href","/gentriduck/hamburg/area")},m(p,j){_(p,a,j),_(p,r,j),$(r,t),_(p,n,j),_(p,o,j),_(p,c,j)},p(p,j){j[0]&16384&&Ie(t,p[14])},d(p){p&&(l(a),l(r),l(n),l(o),l(c))}}}function wi(i){let a,r,t=i[125]+"";return{c(){a=H("p"),r=new Ui(!1),this.h()},l(n){a=w(n,"P",{});var o=X(a);r=zi(o,!1),o.forEach(l),this.h()},h(){r.a=null},m(n,o){_(n,a,o),r.m(t,a)},p(n,o){o[0]&8388608&&t!==(t=n[125]+"")&&r.p(t)},d(n){n&&l(a)}}}function vs(i){let a,r="How to read this section:",t,n,o="1 = least deprived",d,c,p="4 = most deprived",j,S,B="falls",Q,P,O="less",V,x,I="negative",J,Z,W="higher",Ne,N,A="methodology & data sources",xe;return{c(){a=H("b"),a.textContent=r,t=v(" Hamburg's official status runs "),n=H("b"),n.textContent=o,d=v(` to
  `),c=H("b"),c.textContent=p,j=v(", so a status that "),S=H("b"),S.textContent=B,Q=v(" means the Gebiet became "),P=H("b"),P.textContent=O,V=v(`
  deprived (its status rose) — which is also the signature of gentrification, not automatically good
  news for existing residents. A `),x=H("b"),x.textContent=I,J=v(` pressure trend is the reading this project treats as
  `),Z=H("b"),Z.textContent=W,Ne=v(` gentrification pressure. Figures come from Hamburg's own annual Sozialmonitoring —
  see the `),N=H("a"),N.textContent=A,xe=v(` page, §6 for how it differs from
  Berlin's.`),this.h()},l(T){a=w(T,"B",{"data-svelte-h":!0}),q(a)!=="svelte-180tz6y"&&(a.textContent=r),t=b(T," Hamburg's official status runs "),n=w(T,"B",{"data-svelte-h":!0}),q(n)!=="svelte-1bcgix4"&&(n.textContent=o),d=b(T,` to
  `),c=w(T,"B",{"data-svelte-h":!0}),q(c)!=="svelte-1cr3k8t"&&(c.textContent=p),j=b(T,", so a status that "),S=w(T,"B",{"data-svelte-h":!0}),q(S)!=="svelte-c1n766"&&(S.textContent=B),Q=b(T," means the Gebiet became "),P=w(T,"B",{"data-svelte-h":!0}),q(P)!=="svelte-u149sn"&&(P.textContent=O),V=b(T,`
  deprived (its status rose) — which is also the signature of gentrification, not automatically good
  news for existing residents. A `),x=w(T,"B",{"data-svelte-h":!0}),q(x)!=="svelte-1kmedgd"&&(x.textContent=I),J=b(T,` pressure trend is the reading this project treats as
  `),Z=w(T,"B",{"data-svelte-h":!0}),q(Z)!=="svelte-1o5dtrd"&&(Z.textContent=W),Ne=b(T,` gentrification pressure. Figures come from Hamburg's own annual Sozialmonitoring —
  see the `),N=w(T,"A",{href:!0,"data-svelte-h":!0}),q(N)!=="svelte-3zcnok"&&(N.textContent=A),xe=b(T,` page, §6 for how it differs from
  Berlin's.`),this.h()},h(){k(N,"href","/gentriduck/methodology")},m(T,F){_(T,a,F),_(T,t,F),_(T,n,F),_(T,d,F),_(T,c,F),_(T,j,F),_(T,S,F),_(T,Q,F),_(T,P,F),_(T,V,F),_(T,x,F),_(T,J,F),_(T,Z,F),_(T,Ne,F),_(T,N,F),_(T,xe,F)},p:Be,d(T){T&&(l(a),l(t),l(n),l(d),l(c),l(j),l(S),l(Q),l(P),l(V),l(x),l(J),l(Z),l(Ne),l(N),l(xe))}}}function ws(i){let a,r;return a=new ca({props:{status:"info",$$slots:{default:[ks]},$$scope:{ctx:i}}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[4]&16&&(o.$$scope={dirty:n,ctx:t}),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Hs(i){let a,r;return a=new yr({props:{data:i[3],value:"stage_label",title:"Current stage"}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&8&&(o.data=t[3]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function ks(i){let a;return{c(){a=v(`No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on
  this site, so no current stage applies here.`)},l(r){a=b(r,`No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on
  this site, so no current stage applies here.`)},m(r,t){_(r,a,t)},d(r){r&&l(a)}}}function Hi(i){let a,r;return a=new ca({props:{status:"info",$$slots:{default:[$s]},$$scope:{ctx:i}}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function $s(i){let a;return{c(){a=v(`No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).`)},l(r){a=b(r,`No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).`)},m(r,t){_(r,a,t)},d(r){r&&l(a)}}}function Ss(i){let a,r,t="fct_gentrification_change",n;return{c(){a=v("Berlin's chart reads "),r=H("code"),r.textContent=t,n=v(`, which is kept Berlin-only
  until Hamburg has its own sign-off for it (H3 sign-off, scope-guard condition 4). Hamburg's 13 annual editions are not charted as a time
  series anywhere on this site yet: the Hamburg trajectory sign-off (#314) asks for any long-run
  Hamburg view to be a separately labelled product, not a reuse of the 2019–2025 labels above.`)},l(o){a=b(o,"Berlin's chart reads "),r=w(o,"CODE",{"data-svelte-h":!0}),q(r)!=="svelte-1hzbn8z"&&(r.textContent=t),n=b(o,`, which is kept Berlin-only
  until Hamburg has its own sign-off for it (H3 sign-off, scope-guard condition 4). Hamburg's 13 annual editions are not charted as a time
  series anywhere on this site yet: the Hamburg trajectory sign-off (#314) asks for any long-run
  Hamburg view to be a separately labelled product, not a reuse of the 2019–2025 labels above.`)},m(o,d){_(o,a,d),_(o,r,d),_(o,n,d)},p:Be,d(o){o&&(l(a),l(r),l(n))}}}function ki(i){let a,r;return a=new Ke({props:{queryID:"poi_trend",queryResult:i[7]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&128&&(o.queryResult=t[7]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function $i(i){let a,r;return a=new Ke({props:{queryID:"poi_mix_context",queryResult:i[8]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&256&&(o.queryResult=t[8]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Si(i){var Ne;let a,r,t=i[21].snapshot_year+"",n,o,d,c=i[21].area_top_category+"",p,j,S=(((Ne=i[25])==null?void 0:Ne.stadtteil_name)??"its Stadtteil")+"",B,Q,P,O=(i[21].stadtteil_top_category??"—")+"",V,x,I,J=(i[21].city_top_category??"—")+"",Z,W;return{c(){a=H("p"),r=v("The most common kind of mapped place here in "),n=v(t),o=v(" is "),d=H("b"),p=v(c),j=v(`;
across `),B=v(S),Q=v(" it's "),P=H("b"),V=v(O),x=v(`, and across
Hamburg as a whole it's `),I=H("b"),Z=v(J),W=v(".")},l(N){a=w(N,"P",{});var A=X(a);r=b(A,"The most common kind of mapped place here in "),n=b(A,t),o=b(A," is "),d=w(A,"B",{});var xe=X(d);p=b(xe,c),xe.forEach(l),j=b(A,`;
across `),B=b(A,S),Q=b(A," it's "),P=w(A,"B",{});var T=X(P);V=b(T,O),T.forEach(l),x=b(A,`, and across
Hamburg as a whole it's `),I=w(A,"B",{});var F=X(I);Z=b(F,J),F.forEach(l),W=b(A,"."),A.forEach(l)},m(N,A){_(N,a,A),$(a,r),$(a,n),$(a,o),$(a,d),$(d,p),$(a,j),$(a,B),$(a,Q),$(a,P),$(P,V),$(a,x),$(a,I),$(I,Z),$(a,W)},p(N,A){var xe;A[0]&2097152&&t!==(t=N[21].snapshot_year+"")&&Ie(n,t),A[0]&2097152&&c!==(c=N[21].area_top_category+"")&&Ie(p,c),A[0]&33554432&&S!==(S=(((xe=N[25])==null?void 0:xe.stadtteil_name)??"its Stadtteil")+"")&&Ie(B,S),A[0]&2097152&&O!==(O=(N[21].stadtteil_top_category??"—")+"")&&Ie(V,O),A[0]&2097152&&J!==(J=(N[21].city_top_category??"—")+"")&&Ie(Z,J)},d(N){N&&l(a)}}}function js(i){let a,r,t="Hamburg POI map",n;return{c(){a=v(`These are OpenStreetMap-derived counts. Mapper coverage grew fastest in Hamburg's earliest years
  (the citywide coverage curve stabilizes only around ~2014–2015, see the
  `),r=H("a"),r.textContent=t,n=v(`), so early-year growth can reflect new mappers
  catching up rather than real commercial change. OSM coverage is also not spatially neutral:
  poorer or peripheral areas tend to be less thoroughly mapped (Haklay 2010), so a low count can be
  a coverage gap rather than a real absence.`),this.h()},l(o){a=b(o,`These are OpenStreetMap-derived counts. Mapper coverage grew fastest in Hamburg's earliest years
  (the citywide coverage curve stabilizes only around ~2014–2015, see the
  `),r=w(o,"A",{href:!0,"data-svelte-h":!0}),q(r)!=="svelte-1s0pubu"&&(r.textContent=t),n=b(o,`), so early-year growth can reflect new mappers
  catching up rather than real commercial change. OSM coverage is also not spatially neutral:
  poorer or peripheral areas tend to be less thoroughly mapped (Haklay 2010), so a low count can be
  a coverage gap rather than a real absence.`),this.h()},h(){k(r,"href","/gentriduck/hamburg/poi-map")},m(o,d){_(o,a,d),_(o,r,d),_(o,n,d)},p:Be,d(o){o&&(l(a),l(r),l(n))}}}function ji(i){let a,r;return a=new Ke({props:{queryID:"poi_oa_radar",queryResult:i[9]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&512&&(o.queryResult=t[9]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function xi(i){let a,r;return a=new Ke({props:{queryID:"poi_oa_suppressed",queryResult:i[16]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&65536&&(o.queryResult=t[16]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function xs(i){let a,r;return a=new ca({props:{status:"warning",$$slots:{default:[Ts]},$$scope:{ctx:i}}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[4]&16&&(o.$$scope={dirty:n,ctx:t}),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Cs(i){let a,r;return a=new _s({props:{config:i[20],data:i[9],height:"360px",downloadableData:!0,downloadableImage:!0}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&1048576&&(o.config=t[20]),n[0]&512&&(o.data=t[9]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Ts(i){let a;return{c(){a=v(`No Offering Advantage value is shown for this Gebiet — too few mapped places are recorded here to
  compute a stable ratio. That means "too thinly observed to characterize", never "commercially
  dead".`)},l(r){a=b(r,`No Offering Advantage value is shown for this Gebiet — too few mapped places are recorded here to
  compute a stable ratio. That means "too thinly observed to characterize", never "commercially
  dead".`)},m(r,t){_(r,a,t)},d(r){r&&l(a)}}}function Ci(i){let a,r;return a=new ca({props:{status:"info",$$slots:{default:[qs]},$$scope:{ctx:i}}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function qs(i){let a;return{c(){a=v(`Some domains are left out of the chart because this Gebiet has too few mapped places overall for
  a stable ratio in the latest year (the same minimum-base rule the Hamburg POI map uses) — "too
  thinly observed", never "commercially dead".`)},l(r){a=b(r,`Some domains are left out of the chart because this Gebiet has too few mapped places overall for
  a stable ratio in the latest year (the same minimum-base rule the Hamburg POI map uses) — "too
  thinly observed", never "commercially dead".`)},m(r,t){_(r,a,t)},d(r){r&&l(a)}}}function Ti(i){let a,r;return a=new ca({props:{status:"warning",$$slots:{default:[Gs]},$$scope:{ctx:i}}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&1024|n[4]&16&&(o.$$scope={dirty:n,ctx:t}),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Gs(i){let a,r,t="†",n,o,d,c=i[10].filter(Mi).map(Oi).join(", ")+"",p,j;return{c(){a=v("Domains marked "),r=H("b"),r.textContent=t,n=v(" are based on very few mapped places here (fewer than "),o=v(Er),d=v(`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),p=v(c),j=v(".")},l(S){a=b(S,"Domains marked "),r=w(S,"B",{"data-svelte-h":!0}),q(r)!=="svelte-yahvc0"&&(r.textContent=t),n=b(S," are based on very few mapped places here (fewer than "),o=b(S,Er),d=b(S,`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),p=b(S,c),j=b(S,".")},m(S,B){_(S,a,B),_(S,r,B),_(S,n,B),_(S,o,B),_(S,d,B),_(S,p,B),_(S,j,B)},p(S,B){B[0]&1024&&c!==(c=S[10].filter(Mi).map(Oi).join(", ")+"")&&Ie(p,c)},d(S){S&&(l(a),l(r),l(n),l(o),l(d),l(p),l(j))}}}function Rs(i){let a,r,t="mart_poi_dominance",n;return{c(){a=v("The underlying mart ("),r=H("code"),r.textContent=t,n=v(`) carries Hamburg rows, but the site's data
  source deliberately restricts it to Berlin, and no sign-off has yet reviewed a Hamburg public view
  of it (the dominance ethics conditions, OA-D0 domain sign-off, were checked for Berlin only).`)},l(o){a=b(o,"The underlying mart ("),r=w(o,"CODE",{"data-svelte-h":!0}),q(r)!=="svelte-1dglync"&&(r.textContent=t),n=b(o,`) carries Hamburg rows, but the site's data
  source deliberately restricts it to Berlin, and no sign-off has yet reviewed a Hamburg public view
  of it (the dominance ethics conditions, OA-D0 domain sign-off, were checked for Berlin only).`)},m(o,d){_(o,a,d),_(o,r,d),_(o,n,d)},p:Be,d(o){o&&(l(a),l(r),l(n))}}}function Es(i){let a;return{c(){a=v(`Hamburg's population-register figures are only published at Stadtteil and district level, not
  for single Gebiete (methodology §6, point 3). Even at Stadtteil level, the Hamburg demographics
  sign-off (#313) sets conditions that bind a future Hamburg web page of its own, which has not been
  built or reviewed yet.`)},l(r){a=b(r,`Hamburg's population-register figures are only published at Stadtteil and district level, not
  for single Gebiete (methodology §6, point 3). Even at Stadtteil level, the Hamburg demographics
  sign-off (#313) sets conditions that bind a future Hamburg web page of its own, which has not been
  built or reviewed yet.`)},m(r,t){_(r,a,t)},d(r){r&&l(a)}}}function qi(i){let a,r;return a=new Ke({props:{queryID:"amenities_current",queryResult:i[17]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&131072&&(o.queryResult=t[17]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Gi(i){let a,r;return a=new Ke({props:{queryID:"amenities_table",queryResult:i[18]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&262144&&(o.queryResult=t[18]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Ms(i){let a;return{c(){a=v("No amenity data is available for this area yet.")},l(r){a=b(r,"No amenity data is available for this area yet.")},m(r,t){_(r,a,t)},p:Be,d(r){r&&l(a)}}}function Os(i){let a,r,t=i[17][0].snapshot_year+"",n,o;return{c(){a=v("Based on OpenStreetMap tagging as of "),r=H("b"),n=v(t),o=v(`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(d){a=b(d,"Based on OpenStreetMap tagging as of "),r=w(d,"B",{});var c=X(r);n=b(c,t),c.forEach(l),o=b(d,`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(d,c){_(d,a,c),_(d,r,c),$(r,n),_(d,o,c)},p(d,c){c[0]&131072&&t!==(t=d[17][0].snapshot_year+"")&&Ie(n,t)},d(d){d&&(l(a),l(r),l(o))}}}function Ds(i){let a,r,t,n,o,d;return a=new Rr({props:{id:"indicator",title:"Infrastructure"}}),t=new Rr({props:{id:"area_value",title:"This area"}}),o=new Rr({props:{id:"district_value",title:"District total"}}),{c(){M(a.$$.fragment),r=y(),M(t.$$.fragment),n=y(),M(o.$$.fragment)},l(c){E(a.$$.fragment,c),r=g(c),E(t.$$.fragment,c),n=g(c),E(o.$$.fragment,c)},m(c,p){R(a,c,p),_(c,r,p),R(t,c,p),_(c,n,p),R(o,c,p),d=!0},p:Be,i(c){d||(m(a.$$.fragment,c),m(t.$$.fragment,c),m(o.$$.fragment,c),d=!0)},o(c){h(a.$$.fragment,c),h(t.$$.fragment,c),h(o.$$.fragment,c),d=!1},d(c){c&&(l(r),l(n)),G(a,c),G(t,c),G(o,c)}}}function As(i){let a,r,t="0",n,o,d="open-data",c;return{c(){a=v("These figures come from OpenStreetMap tagging, not an official registry. A "),r=H("b"),r.textContent=t,n=v(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=H("a"),o.textContent=d,c=v(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(p){a=b(p,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=w(p,"B",{"data-svelte-h":!0}),q(r)!=="svelte-12bhsds"&&(r.textContent=t),n=b(p,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=w(p,"A",{href:!0,"data-svelte-h":!0}),q(o)!=="svelte-1jijq3i"&&(o.textContent=d),c=b(p,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){k(o,"href","/gentriduck/open-data")},m(p,j){_(p,a,j),_(p,r,j),_(p,n,j),_(p,o,j),_(p,c,j)},p:Be,d(p){p&&(l(a),l(r),l(n),l(o),l(c))}}}function Ls(i){let a;return{c(){a=v(`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){a=b(r,`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,t){_(r,a,t)},p:Be,d(r){r&&l(a)}}}function Is(i){let a,r,t=i[17][0].gastro_poi_with_cuisine_count+"",n,o;return{c(){a=v("Cuisine is tagged for "),r=H("b"),n=v(t),o=v(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(d){a=b(d,"Cuisine is tagged for "),r=w(d,"B",{});var c=X(r);n=b(c,t),c.forEach(l),o=b(d,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(d,c){_(d,a,c),_(d,r,c),$(r,n),_(d,o,c)},p(d,c){c[0]&131072&&t!==(t=d[17][0].gastro_poi_with_cuisine_count+"")&&Ie(n,t)},d(d){d&&(l(a),l(r),l(o))}}}function Bs(i){let a,r,t=i[17][0].gastro_poi_with_cuisine_count+"",n,o,d,c="most common cuisine",p,j,S=i[17][0].dominant_cuisine+"",B,Q,P=Math.round(i[17][0].dominant_cuisine_share*100)+"",O,V;return{c(){a=v("Among "),r=H("b"),n=v(t),o=v(` restaurants/cafes with cuisine
data tagged in this area, the `),d=H("b"),d.textContent=c,p=v(` is
`),j=H("b"),B=v(S),Q=v(`
(`),O=v(P),V=v("% of cuisine-tagged restaurants/cafes).")},l(x){a=b(x,"Among "),r=w(x,"B",{});var I=X(r);n=b(I,t),I.forEach(l),o=b(x,` restaurants/cafes with cuisine
data tagged in this area, the `),d=w(x,"B",{"data-svelte-h":!0}),q(d)!=="svelte-1floooe"&&(d.textContent=c),p=b(x,` is
`),j=w(x,"B",{});var J=X(j);B=b(J,S),J.forEach(l),Q=b(x,`
(`),O=b(x,P),V=b(x,"% of cuisine-tagged restaurants/cafes).")},m(x,I){_(x,a,I),_(x,r,I),$(r,n),_(x,o,I),_(x,d,I),_(x,p,I),_(x,j,I),$(j,B),_(x,Q,I),_(x,O,I),_(x,V,I)},p(x,I){I[0]&131072&&t!==(t=x[17][0].gastro_poi_with_cuisine_count+"")&&Ie(n,t),I[0]&131072&&S!==(S=x[17][0].dominant_cuisine+"")&&Ie(B,S),I[0]&131072&&P!==(P=Math.round(x[17][0].dominant_cuisine_share*100)+"")&&Ie(O,P)},d(x){x&&(l(a),l(r),l(o),l(d),l(p),l(j),l(Q),l(O),l(V))}}}function Ns(i){let a;return{c(){a=v(`Hamburg has no land-value (Bodenrichtwert) series on this site at all. Its rent signal is
  narrower in kind than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at
  Stadtteil level, current state only), and its sign-off (#303) requires a Hamburg-specific
  methodology disclosure before any of it is shown publicly — that has not been done yet.`)},l(r){a=b(r,`Hamburg has no land-value (Bodenrichtwert) series on this site at all. Its rent signal is
  narrower in kind than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at
  Stadtteil level, current state only), and its sign-off (#303) requires a Hamburg-specific
  methodology disclosure before any of it is shown publicly — that has not been done yet.`)},m(r,t){_(r,a,t)},d(r){r&&l(a)}}}function Ri(i){let a,r;return a=new Ke({props:{queryID:"minimap_areas",queryResult:i[19]}}),{c(){M(a.$$.fragment)},l(t){E(a.$$.fragment,t)},m(t,n){R(a,t,n),r=!0},p(t,n){const o={};n[0]&524288&&(o.queryResult=t[19]),a.$set(o)},i(t){r||(m(a.$$.fragment,t),r=!0)},o(t){h(a.$$.fragment,t),r=!1},d(t){G(a,t)}}}function Fs(i){let a;return{c(){a=v("linked above")},l(r){a=b(r,"linked above")},m(r,t){_(r,a,t)},p:Be,d(r){r&&l(a)}}}function Ps(i){let a,r=(i[2][0].stadtteil_name??i[2][0].stadtteil_code)+"",t,n;return{c(){a=H("a"),t=v(r),this.h()},l(o){a=w(o,"A",{href:!0});var d=X(a);t=b(d,r),d.forEach(l),this.h()},h(){k(a,"href",n="/gentriduck/hamburg/area/subarea_l1/"+i[2][0].stadtteil_code)},m(o,d){_(o,a,d),$(a,t)},p(o,d){d[0]&4&&r!==(r=(o[2][0].stadtteil_name??o[2][0].stadtteil_code)+"")&&Ie(t,r),d[0]&4&&n!==(n="/gentriduck/hamburg/area/subarea_l1/"+o[2][0].stadtteil_code)&&k(a,"href",n)},d(o){o&&l(a)}}}function zs(i){var Zr;let a,r,t,n,o,d,c,p,j,S,B,Q,P,O,V,x,I,J,Z,W,Ne,N,A,xe="district browse",T,F,qa="all districts",u,ta,qt,Dt,Pa,ee,f,Ye,He,da='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',At,dt,ma,Fe,mt,we,Ce,Lt,ut,ft,Te,It,ke,ua,Bt,qe,Nt=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,Ft,Pe,fa,rt,Pt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ht,ze,aa='<a href="#how-its-commercial-mix-has-developed">How its commercial mix has developed</a>',ha,pt,zt=`Shops, cafés and other businesses tend to <em class="markdown">follow</em> — not lead — social change (see
<a href="/gentriduck/methodology" class="markdown">methodology</a> for the theory). This shows how the mix of mapped places here has
evolved.`,gt,yt,it,bt,pa,Xe,Ge,Ut,Re,za='<a href="#offering-advantage-profile">Offering Advantage profile</a>',ga,Ee,Qt=`<strong class="markdown">Offering Advantage (OA)</strong> compares each POI domain&#39;s share of this Gebiet&#39;s mapped places
(shops, cafés, and other points of interest) to that domain&#39;s share across Hamburg as a whole — a
compositional read on the local place <em class="markdown">mix</em>, not a count, and not a value judgment: being
over-represented in a domain doesn&#39;t mean an area is &quot;better&quot; or &quot;worse,&quot; only that its commercial
mix is more specialised in that direction than the city as a whole. The chart below shows each
domain as a <strong class="markdown">percentage above or below Hamburg&#39;s citywide average share</strong> for that domain — e.g.
&quot;+30%&quot; means this domain makes up about 30% more of the local mix here than it does citywide on
average; a <strong class="markdown">negative</strong> percentage means the opposite, under-representation, shown the same way.
The baseline is Hamburg&#39;s own, never pooled with Berlin&#39;s. For Hamburg, OA is commercial-side
context only: Hamburg&#39;s published stage above comes from its own Sozialmonitoring, not from OA (see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>). See the <a href="/gentriduck/hamburg/poi-map" class="markdown">POI &amp; Offering Advantage map</a> to explore
this across all of Hamburg.`,Jt,st,Vt,Me,te,Ze,ra=i[16][0]&&Number(i[16][0].n_flagged)>0&&i[10].length>0,nt,Ga=i[10].some(Ei),Wt,Oe,Kt=`Berlin's version of this chart also draws a district-average line. That average has not been
computed or reviewed for Hamburg, so only the citywide baseline is drawn here.`,Yt,De,Ua='<a href="#within-group-dominance">Within-group dominance</a>',ya,Ae,vt,Ue,ia='<a href="#people--structure">People &amp; structure</a>',ba,wt,Ht,$e,va='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',wa,Xt,Zt,Qe,kt,et,Ha,$t,ka,Je,St,ot,Qa=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,$a,lt,ea='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',jt,tt,Sa,_t,Ja='<a href="#where-this-area-sits">Where this area sits</a>',Va,C,L,xt,at,Wa,Ra,Gt,Ka="area-hierarchy reference",tr,sr,sa,Mr='<a href="#honest-caveats">Honest caveats</a>',nr,Se,ct,Ea,Or="This Gebiet's name is a label, not an official designation (#307, #352).",vr,Ma,Dr="place=neighbourhood",wr,Oa,Ar="quarter",Hr,or,kr,$r,Da,Lr=`<strong class="markdown">A falling status means the area became <em class="markdown">less</em> deprived</strong> (its status rose) — which is also the
signature of gentrification, not automatically good news for existing residents.`,Sr,Aa,Ir=`<strong class="markdown">Hamburg&#39;s stage is not directly equivalent to a same-named Berlin stage</strong> — Hamburg&#39;s Dynamik
window is 3 years, Berlin&#39;s 2 (<a href="/gentriduck/methodology" class="markdown">methodology §6</a>, point 1 and 4).`,jr,La,Br=`<strong class="markdown">The trajectory labels describe a recent ~6-year (2019–2025) window</strong>, not this area&#39;s full
13-edition history, and are a <strong class="markdown">status-only classification</strong>, never a displacement verdict (see
the disclosure above that section).`,xr,Ia,Nr=`<strong class="markdown">Offering Advantage is descriptive, not causal, and multi-signed</strong> — over- or under-representation
in a domain is a mix/specialization signal, never a standalone claim about gentrification.
Domains flagged † above rest on fewer than 5 mapped places here and should be read cautiously.`,Cr,Ba,Fr=`<strong class="markdown">Some Berlin sections are not shown for Hamburg</strong> — the written portrait, the status-over-time
chart, within-group dominance, people &amp; structure, and land value &amp; rent — each with its reason
in its own section above. See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory and
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from Berlin&#39;s.`,lr,na,Pr='<a href="#further-reading">Further reading</a>',_r,ja,zr=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a> for
every Gebiet&#39;s stage at a glance, the <a href="/gentriduck/hamburg/poi-map" class="markdown">POI &amp; Offering Advantage map</a> for the
commercial-mix signal citywide, <a href="/gentriduck/hamburg/area-detail" class="markdown">browse by district</a> for other Gebiete, or
the <a href="/gentriduck/hamburg/time-series" class="markdown">time-series view</a> for how Hamburg&#39;s Gebiete have moved since 2019.`,cr,ar,dr,Na,Ya,oa=typeof D<"u"&&(D.title||((Zr=D.og)==null?void 0:Zr.title))&&D.hide_title!==!0&&ds();function Di(e,s){var z;return typeof D<"u"&&(D.title||(z=D.og)!=null&&z.title)?us:ms}let rr=Di()(i),la=typeof D=="object"&&fs(),ae=i[0]&&mi(i),re=i[15]&&ui(i),ie=i[1]&&fi(i),se=i[2]&&hi(i),ne=i[3]&&pi(i),oe=i[4]&&gi(i),le=i[5]&&yi(i),_e=i[6]&&bi(i);O=new Vi({props:{crumbs:i[27]}}),x=new Wi({props:{title:i[26]}}),J=new Zi({props:{compact:!0,eyebrow:i[28],title:i[11],lede:"Stage, social-status trajectory, commercial mix, Offering Advantage, and everyday amenities for one Hamburg statistisches Gebiet — Hamburg's finest published small-area grain. It plays the role a Planungsraum plays for Berlin on this site, but a Gebiet is typically smaller."}});function Ur(e,s){var z;return(z=e[2][0])!=null&&z.stadtteil_code?ys:gs}let mr=Ur(i),Rt=mr(i),ce=i[15].length===0&&vi(i),Xa=li(i[23]),je=[];for(let e=0;e<Xa.length;e+=1)je[e]=wi(di(i,Xa,e));dt=new ca({props:{status:"info",$$slots:{default:[vs]},$$scope:{ctx:i}}}),Fe=new Xi({props:{subject:"this Gebiet"}});const Qr=[Hs,ws],xa=[];function Jr(e,s){return e[13]&&e[13].stage?0:1}we=Jr(i),Ce=xa[we]=Qr[we](i),ut=new yr({props:{data:i[4],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),Te=new yr({props:{data:i[4],value:"dominant_stage",title:"Most common stage",emptySet:"warn"}}),ke=new yr({props:{data:i[4],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}});let be=!i[12]&&i[4].length===0&&Hi(i);Pe=new gr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"A status-over-time chart (Berlin's profile pages draw one, with district and city lines)",$$slots:{default:[Ss]},$$scope:{ctx:i}}});let de=i[7]&&ki(i),me=i[8]&&$i(i);bt=new ls({props:{data:i[7],x:"snapshot_year",y:"poi_count",series:"poi_category_h",seriesOrder:i[22],title:"Mapped places by category, "+i[11]+" (largest segment first)",yAxisTitle:"Number of mapped places",emptySet:"warn"}});let Le=i[21]&&i[21].area_top_category&&Si(i);Ge=new ca({props:{status:"info",$$slots:{default:[js]},$$scope:{ctx:i}}});let ue=i[9]&&ji(i),fe=i[16]&&xi(i);const Vr=[Cs,xs],Ca=[];function Wr(e,s){return e[10].length>0?0:1}Me=Wr(i),te=Ca[Me]=Vr[Me](i);let ve=ra&&Ci(i),he=Ga&&Ti(i);Ae=new gr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Within-group dominance (is one business type crowding out the rest of its group?)",$$slots:{default:[Rs]},$$scope:{ctx:i}}}),wt=new gr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"A population and composition table",$$slots:{default:[Es]},$$scope:{ctx:i}}});let pe=i[17]&&qi(i),ge=i[18]&&Gi(i);function Kr(e,s){var z;return(z=e[17][0])!=null&&z.snapshot_year?Os:Ms}let ur=Kr(i),Et=ur(i);et=new es({props:{data:i[18],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Ds]},$$scope:{ctx:i}}}),$t=new ca({props:{status:"info",$$slots:{default:[As]},$$scope:{ctx:i}}});function Yr(e,s){var z,Ta;return(z=e[17][0])!=null&&z.snapshot_year&&e[17][0].gastro_poi_with_cuisine_count>=8&&e[17][0].dominant_cuisine_share>=.15?Bs:(Ta=e[17][0])!=null&&Ta.snapshot_year&&e[17][0].gastro_poi_with_cuisine_count>=8?Is:Ls}let fr=Yr(i),Mt=fr(i);tt=new gr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Land value and estimated rent",$$slots:{default:[Ns]},$$scope:{ctx:i}}});let ye=i[19]&&Ri(i);L=new Ki({props:{data:i[19],geoJsonUrl:`${ts}/geo/subarea_l1_subarea_l2_drilldown.geojson`,title:i[11]??i[14]}});function Xr(e,s){var z;return(z=e[2][0])!=null&&z.stadtteil_code?Ps:Fs}let hr=Xr(i),Ot=hr(i);return Na=new Yi({}),{c(){oa&&oa.c(),a=y(),rr.c(),r=H("meta"),t=H("meta"),la&&la.c(),n=br(),o=y(),ae&&ae.c(),d=y(),re&&re.c(),c=y(),ie&&ie.c(),p=y(),se&&se.c(),j=y(),ne&&ne.c(),S=y(),oe&&oe.c(),B=y(),le&&le.c(),Q=y(),_e&&_e.c(),P=y(),M(O.$$.fragment),V=y(),M(x.$$.fragment),I=y(),M(J.$$.fragment),Z=y(),W=H("p"),Ne=v("Up: "),Rt.c(),N=v(" · "),A=H("a"),A.textContent=xe,T=v(" · "),F=H("a"),F.textContent=qa,u=y(),ce&&ce.c(),ta=y(),qt=H("h2"),Dt=H("a"),Pa=v(i[11]),ee=v(" at a glance"),f=y();for(let e=0;e<je.length;e+=1)je[e].c();Ye=y(),He=H("h2"),He.innerHTML=da,At=y(),M(dt.$$.fragment),ma=y(),M(Fe.$$.fragment),mt=y(),Ce.c(),Lt=y(),M(ut.$$.fragment),ft=y(),M(Te.$$.fragment),It=y(),M(ke.$$.fragment),ua=y(),be&&be.c(),Bt=y(),qe=H("p"),qe.innerHTML=Nt,Ft=y(),M(Pe.$$.fragment),fa=y(),rt=H("h2"),rt.innerHTML=Pt,ht=y(),ze=H("h3"),ze.innerHTML=aa,ha=y(),pt=H("p"),pt.innerHTML=zt,gt=y(),de&&de.c(),yt=y(),me&&me.c(),it=y(),M(bt.$$.fragment),pa=y(),Le&&Le.c(),Xe=y(),M(Ge.$$.fragment),Ut=y(),Re=H("h3"),Re.innerHTML=za,ga=y(),Ee=H("p"),Ee.innerHTML=Qt,Jt=y(),ue&&ue.c(),st=y(),fe&&fe.c(),Vt=y(),te.c(),Ze=y(),ve&&ve.c(),nt=y(),he&&he.c(),Wt=y(),Oe=H("p"),Oe.textContent=Kt,Yt=y(),De=H("h2"),De.innerHTML=Ua,ya=y(),M(Ae.$$.fragment),vt=y(),Ue=H("h2"),Ue.innerHTML=ia,ba=y(),M(wt.$$.fragment),Ht=y(),$e=H("h2"),$e.innerHTML=va,wa=y(),pe&&pe.c(),Xt=y(),ge&&ge.c(),Zt=y(),Qe=H("p"),Et.c(),kt=y(),M(et.$$.fragment),Ha=y(),M($t.$$.fragment),ka=y(),Je=H("p"),Mt.c(),St=y(),ot=H("p"),ot.textContent=Qa,$a=y(),lt=H("h2"),lt.innerHTML=ea,jt=y(),M(tt.$$.fragment),Sa=y(),_t=H("h2"),_t.innerHTML=Ja,Va=y(),ye&&ye.c(),C=y(),M(L.$$.fragment),xt=y(),at=H("p"),Wa=v(`This is Hamburg's finest published small-area grain (statistisches Gebiet) — there is no further
level to drill into. Its parent Stadtteil is `),Ot.c(),Ra=v(`
(see "Up:" above), resolved by a spatial crosswalk (each Gebiet assigned to the Stadtteil that
contains it; OA-D1b, #240) — see the `),Gt=H("a"),Gt.textContent=Ka,tr=v("."),sr=y(),sa=H("h2"),sa.innerHTML=Mr,nr=y(),Se=H("ul"),ct=H("li"),Ea=H("strong"),Ea.textContent=Or,vr=v(` Hamburg's own
statistisches-Gebiet source has no name field, so the name above is this Gebiet's Stadtteil
plus either an OpenStreetMap `),Ma=H("code"),Ma.textContent=Dr,wr=v("/"),Oa=H("code"),Oa.textContent=Ar,Hr=v(` name whose point lies inside the
Gebiet (`),or=v(i[24]),kr=v(`) or, where there is none, the Gebiet's code. An OSM name marks a
point inside this Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet.`),$r=y(),Da=H("li"),Da.innerHTML=Lr,Sr=y(),Aa=H("li"),Aa.innerHTML=Ir,jr=y(),La=H("li"),La.innerHTML=Br,xr=y(),Ia=H("li"),Ia.innerHTML=Nr,Cr=y(),Ba=H("li"),Ba.innerHTML=Fr,lr=y(),na=H("h2"),na.innerHTML=Pr,_r=y(),ja=H("p"),ja.innerHTML=zr,cr=y(),ar=H("hr"),dr=y(),M(Na.$$.fragment),this.h()},l(e){oa&&oa.l(e),a=g(e);const s=Ii("svelte-2igo1p",document.head);rr.l(s),r=w(s,"META",{name:!0,content:!0}),t=w(s,"META",{name:!0,content:!0}),la&&la.l(s),n=br(),s.forEach(l),o=g(e),ae&&ae.l(e),d=g(e),re&&re.l(e),c=g(e),ie&&ie.l(e),p=g(e),se&&se.l(e),j=g(e),ne&&ne.l(e),S=g(e),oe&&oe.l(e),B=g(e),le&&le.l(e),Q=g(e),_e&&_e.l(e),P=g(e),E(O.$$.fragment,e),V=g(e),E(x.$$.fragment,e),I=g(e),E(J.$$.fragment,e),Z=g(e),W=w(e,"P",{});var z=X(W);Ne=b(z,"Up: "),Rt.l(z),N=b(z," · "),A=w(z,"A",{href:!0,"data-svelte-h":!0}),q(A)!=="svelte-1wr74xi"&&(A.textContent=xe),T=b(z," · "),F=w(z,"A",{href:!0,"data-svelte-h":!0}),q(F)!=="svelte-46ercb"&&(F.textContent=qa),z.forEach(l),u=g(e),ce&&ce.l(e),ta=g(e),qt=w(e,"H2",{class:!0,id:!0});var Ta=X(qt);Dt=w(Ta,"A",{href:!0});var Fa=X(Dt);Pa=b(Fa,i[11]),ee=b(Fa," at a glance"),Fa.forEach(l),Ta.forEach(l),f=g(e);for(let er=0;er<je.length;er+=1)je[er].l(e);Ye=g(e),He=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(He)!=="svelte-14f17uo"&&(He.innerHTML=da),At=g(e),E(dt.$$.fragment,e),ma=g(e),E(Fe.$$.fragment,e),mt=g(e),Ce.l(e),Lt=g(e),E(ut.$$.fragment,e),ft=g(e),E(Te.$$.fragment,e),It=g(e),E(ke.$$.fragment,e),ua=g(e),be&&be.l(e),Bt=g(e),qe=w(e,"P",{class:!0,"data-svelte-h":!0}),q(qe)!=="svelte-dvqlbe"&&(qe.innerHTML=Nt),Ft=g(e),E(Pe.$$.fragment,e),fa=g(e),rt=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(rt)!=="svelte-1i9w9pn"&&(rt.innerHTML=Pt),ht=g(e),ze=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),q(ze)!=="svelte-yatnem"&&(ze.innerHTML=aa),ha=g(e),pt=w(e,"P",{class:!0,"data-svelte-h":!0}),q(pt)!=="svelte-1s6me3w"&&(pt.innerHTML=zt),gt=g(e),de&&de.l(e),yt=g(e),me&&me.l(e),it=g(e),E(bt.$$.fragment,e),pa=g(e),Le&&Le.l(e),Xe=g(e),E(Ge.$$.fragment,e),Ut=g(e),Re=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),q(Re)!=="svelte-1uvjo0a"&&(Re.innerHTML=za),ga=g(e),Ee=w(e,"P",{class:!0,"data-svelte-h":!0}),q(Ee)!=="svelte-uq7p2u"&&(Ee.innerHTML=Qt),Jt=g(e),ue&&ue.l(e),st=g(e),fe&&fe.l(e),Vt=g(e),te.l(e),Ze=g(e),ve&&ve.l(e),nt=g(e),he&&he.l(e),Wt=g(e),Oe=w(e,"P",{class:!0,"data-svelte-h":!0}),q(Oe)!=="svelte-1ruaof5"&&(Oe.textContent=Kt),Yt=g(e),De=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(De)!=="svelte-4kb45v"&&(De.innerHTML=Ua),ya=g(e),E(Ae.$$.fragment,e),vt=g(e),Ue=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(Ue)!=="svelte-1mdzqzc"&&(Ue.innerHTML=ia),ba=g(e),E(wt.$$.fragment,e),Ht=g(e),$e=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q($e)!=="svelte-12k6lqd"&&($e.innerHTML=va),wa=g(e),pe&&pe.l(e),Xt=g(e),ge&&ge.l(e),Zt=g(e),Qe=w(e,"P",{});var ir=X(Qe);Et.l(ir),ir.forEach(l),kt=g(e),E(et.$$.fragment,e),Ha=g(e),E($t.$$.fragment,e),ka=g(e),Je=w(e,"P",{});var Za=X(Je);Mt.l(Za),Za.forEach(l),St=g(e),ot=w(e,"P",{"data-svelte-h":!0}),q(ot)!=="svelte-ja6pm6"&&(ot.textContent=Qa),$a=g(e),lt=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(lt)!=="svelte-13a10dj"&&(lt.innerHTML=ea),jt=g(e),E(tt.$$.fragment,e),Sa=g(e),_t=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(_t)!=="svelte-60cjj9"&&(_t.innerHTML=Ja),Va=g(e),ye&&ye.l(e),C=g(e),E(L.$$.fragment,e),xt=g(e),at=w(e,"P",{class:!0});var _a=X(at);Wa=b(_a,`This is Hamburg's finest published small-area grain (statistisches Gebiet) — there is no further
level to drill into. Its parent Stadtteil is `),Ot.l(_a),Ra=b(_a,`
(see "Up:" above), resolved by a spatial crosswalk (each Gebiet assigned to the Stadtteil that
contains it; OA-D1b, #240) — see the `),Gt=w(_a,"A",{href:!0,class:!0,"data-svelte-h":!0}),q(Gt)!=="svelte-1xy3j6n"&&(Gt.textContent=Ka),tr=b(_a,"."),_a.forEach(l),sr=g(e),sa=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(sa)!=="svelte-ad0syq"&&(sa.innerHTML=Mr),nr=g(e),Se=w(e,"UL",{class:!0});var Ve=X(Se);ct=w(Ve,"LI",{class:!0});var Ct=X(ct);Ea=w(Ct,"STRONG",{class:!0,"data-svelte-h":!0}),q(Ea)!=="svelte-1fqtrmt"&&(Ea.textContent=Or),vr=b(Ct,` Hamburg's own
statistisches-Gebiet source has no name field, so the name above is this Gebiet's Stadtteil
plus either an OpenStreetMap `),Ma=w(Ct,"CODE",{class:!0,"data-svelte-h":!0}),q(Ma)!=="svelte-15m84of"&&(Ma.textContent=Dr),wr=b(Ct,"/"),Oa=w(Ct,"CODE",{class:!0,"data-svelte-h":!0}),q(Oa)!=="svelte-130gzfg"&&(Oa.textContent=Ar),Hr=b(Ct,` name whose point lies inside the
Gebiet (`),or=b(Ct,i[24]),kr=b(Ct,`) or, where there is none, the Gebiet's code. An OSM name marks a
point inside this Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet.`),Ct.forEach(l),$r=g(Ve),Da=w(Ve,"LI",{class:!0,"data-svelte-h":!0}),q(Da)!=="svelte-88jax4"&&(Da.innerHTML=Lr),Sr=g(Ve),Aa=w(Ve,"LI",{class:!0,"data-svelte-h":!0}),q(Aa)!=="svelte-gt4vt1"&&(Aa.innerHTML=Ir),jr=g(Ve),La=w(Ve,"LI",{class:!0,"data-svelte-h":!0}),q(La)!=="svelte-aln53w"&&(La.innerHTML=Br),xr=g(Ve),Ia=w(Ve,"LI",{class:!0,"data-svelte-h":!0}),q(Ia)!=="svelte-17ztge1"&&(Ia.innerHTML=Nr),Cr=g(Ve),Ba=w(Ve,"LI",{class:!0,"data-svelte-h":!0}),q(Ba)!=="svelte-190cwc0"&&(Ba.innerHTML=Fr),Ve.forEach(l),lr=g(e),na=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),q(na)!=="svelte-oimjns"&&(na.innerHTML=Pr),_r=g(e),ja=w(e,"P",{class:!0,"data-svelte-h":!0}),q(ja)!=="svelte-perq8p"&&(ja.innerHTML=zr),cr=g(e),ar=w(e,"HR",{class:!0}),dr=g(e),E(Na.$$.fragment,e),this.h()},h(){k(r,"name","twitter:card"),k(r,"content","summary_large_image"),k(t,"name","twitter:site"),k(t,"content","@evidence_dev"),k(A,"href","/gentriduck/hamburg/area-detail"),k(F,"href","/gentriduck/hamburg/area/district"),k(Dt,"href","#namelabel-at-a-glance"),k(qt,"class","markdown"),k(qt,"id","namelabel-at-a-glance"),k(He,"class","markdown"),k(He,"id","social-status--trajectory"),k(qe,"class","markdown"),k(rt,"class","markdown"),k(rt,"id","commercial-mix--offering-advantage"),k(ze,"class","markdown"),k(ze,"id","how-its-commercial-mix-has-developed"),k(pt,"class","markdown"),k(Re,"class","markdown"),k(Re,"id","offering-advantage-profile"),k(Ee,"class","markdown"),k(Oe,"class","markdown"),k(De,"class","markdown"),k(De,"id","within-group-dominance"),k(Ue,"class","markdown"),k(Ue,"id","people--structure"),k($e,"class","markdown"),k($e,"id","amenities--everyday-infrastructure"),k(lt,"class","markdown"),k(lt,"id","land-value--estimated-rent"),k(_t,"class","markdown"),k(_t,"id","where-this-area-sits"),k(Gt,"href","/gentriduck/reference/area-hierarchy"),k(Gt,"class","markdown"),k(at,"class","markdown"),k(sa,"class","markdown"),k(sa,"id","honest-caveats"),k(Ea,"class","markdown"),k(Ma,"class","markdown"),k(Oa,"class","markdown"),k(ct,"class","markdown"),k(Da,"class","markdown"),k(Aa,"class","markdown"),k(La,"class","markdown"),k(Ia,"class","markdown"),k(Ba,"class","markdown"),k(Se,"class","markdown"),k(na,"class","markdown"),k(na,"id","further-reading"),k(ja,"class","markdown"),k(ar,"class","markdown")},m(e,s){oa&&oa.m(e,s),_(e,a,s),rr.m(document.head,null),$(document.head,r),$(document.head,t),la&&la.m(document.head,null),$(document.head,n),_(e,o,s),ae&&ae.m(e,s),_(e,d,s),re&&re.m(e,s),_(e,c,s),ie&&ie.m(e,s),_(e,p,s),se&&se.m(e,s),_(e,j,s),ne&&ne.m(e,s),_(e,S,s),oe&&oe.m(e,s),_(e,B,s),le&&le.m(e,s),_(e,Q,s),_e&&_e.m(e,s),_(e,P,s),R(O,e,s),_(e,V,s),R(x,e,s),_(e,I,s),R(J,e,s),_(e,Z,s),_(e,W,s),$(W,Ne),Rt.m(W,null),$(W,N),$(W,A),$(W,T),$(W,F),_(e,u,s),ce&&ce.m(e,s),_(e,ta,s),_(e,qt,s),$(qt,Dt),$(Dt,Pa),$(Dt,ee),_(e,f,s);for(let z=0;z<je.length;z+=1)je[z]&&je[z].m(e,s);_(e,Ye,s),_(e,He,s),_(e,At,s),R(dt,e,s),_(e,ma,s),R(Fe,e,s),_(e,mt,s),xa[we].m(e,s),_(e,Lt,s),R(ut,e,s),_(e,ft,s),R(Te,e,s),_(e,It,s),R(ke,e,s),_(e,ua,s),be&&be.m(e,s),_(e,Bt,s),_(e,qe,s),_(e,Ft,s),R(Pe,e,s),_(e,fa,s),_(e,rt,s),_(e,ht,s),_(e,ze,s),_(e,ha,s),_(e,pt,s),_(e,gt,s),de&&de.m(e,s),_(e,yt,s),me&&me.m(e,s),_(e,it,s),R(bt,e,s),_(e,pa,s),Le&&Le.m(e,s),_(e,Xe,s),R(Ge,e,s),_(e,Ut,s),_(e,Re,s),_(e,ga,s),_(e,Ee,s),_(e,Jt,s),ue&&ue.m(e,s),_(e,st,s),fe&&fe.m(e,s),_(e,Vt,s),Ca[Me].m(e,s),_(e,Ze,s),ve&&ve.m(e,s),_(e,nt,s),he&&he.m(e,s),_(e,Wt,s),_(e,Oe,s),_(e,Yt,s),_(e,De,s),_(e,ya,s),R(Ae,e,s),_(e,vt,s),_(e,Ue,s),_(e,ba,s),R(wt,e,s),_(e,Ht,s),_(e,$e,s),_(e,wa,s),pe&&pe.m(e,s),_(e,Xt,s),ge&&ge.m(e,s),_(e,Zt,s),_(e,Qe,s),Et.m(Qe,null),_(e,kt,s),R(et,e,s),_(e,Ha,s),R($t,e,s),_(e,ka,s),_(e,Je,s),Mt.m(Je,null),_(e,St,s),_(e,ot,s),_(e,$a,s),_(e,lt,s),_(e,jt,s),R(tt,e,s),_(e,Sa,s),_(e,_t,s),_(e,Va,s),ye&&ye.m(e,s),_(e,C,s),R(L,e,s),_(e,xt,s),_(e,at,s),$(at,Wa),Ot.m(at,null),$(at,Ra),$(at,Gt),$(at,tr),_(e,sr,s),_(e,sa,s),_(e,nr,s),_(e,Se,s),$(Se,ct),$(ct,Ea),$(ct,vr),$(ct,Ma),$(ct,wr),$(ct,Oa),$(ct,Hr),$(ct,or),$(ct,kr),$(Se,$r),$(Se,Da),$(Se,Sr),$(Se,Aa),$(Se,jr),$(Se,La),$(Se,xr),$(Se,Ia),$(Se,Cr),$(Se,Ba),_(e,lr,s),_(e,na,s),_(e,_r,s),_(e,ja,s),_(e,cr,s),_(e,ar,s),_(e,dr,s),R(Na,e,s),Ya=!0},p(e,s){var si;typeof D<"u"&&(D.title||(si=D.og)!=null&&si.title)&&D.hide_title!==!0&&oa.p(e,s),rr.p(e,s),typeof D=="object"&&la.p(e,s),e[0]?ae?(ae.p(e,s),s[0]&1&&m(ae,1)):(ae=mi(e),ae.c(),m(ae,1),ae.m(d.parentNode,d)):ae&&(Y(),h(ae,1,1,()=>{ae=null}),K()),e[15]?re?(re.p(e,s),s[0]&32768&&m(re,1)):(re=ui(e),re.c(),m(re,1),re.m(c.parentNode,c)):re&&(Y(),h(re,1,1,()=>{re=null}),K()),e[1]?ie?(ie.p(e,s),s[0]&2&&m(ie,1)):(ie=fi(e),ie.c(),m(ie,1),ie.m(p.parentNode,p)):ie&&(Y(),h(ie,1,1,()=>{ie=null}),K()),e[2]?se?(se.p(e,s),s[0]&4&&m(se,1)):(se=hi(e),se.c(),m(se,1),se.m(j.parentNode,j)):se&&(Y(),h(se,1,1,()=>{se=null}),K()),e[3]?ne?(ne.p(e,s),s[0]&8&&m(ne,1)):(ne=pi(e),ne.c(),m(ne,1),ne.m(S.parentNode,S)):ne&&(Y(),h(ne,1,1,()=>{ne=null}),K()),e[4]?oe?(oe.p(e,s),s[0]&16&&m(oe,1)):(oe=gi(e),oe.c(),m(oe,1),oe.m(B.parentNode,B)):oe&&(Y(),h(oe,1,1,()=>{oe=null}),K()),e[5]?le?(le.p(e,s),s[0]&32&&m(le,1)):(le=yi(e),le.c(),m(le,1),le.m(Q.parentNode,Q)):le&&(Y(),h(le,1,1,()=>{le=null}),K()),e[6]?_e?(_e.p(e,s),s[0]&64&&m(_e,1)):(_e=bi(e),_e.c(),m(_e,1),_e.m(P.parentNode,P)):_e&&(Y(),h(_e,1,1,()=>{_e=null}),K());const z={};s[0]&134217728&&(z.crumbs=e[27]),O.$set(z);const Ta={};s[0]&67108864&&(Ta.title=e[26]),x.$set(Ta);const Fa={};if(s[0]&268435456&&(Fa.eyebrow=e[28]),s[0]&2048&&(Fa.title=e[11]),J.$set(Fa),mr===(mr=Ur(e))&&Rt?Rt.p(e,s):(Rt.d(1),Rt=mr(e),Rt&&(Rt.c(),Rt.m(W,N))),e[15].length===0?ce?(ce.p(e,s),s[0]&32768&&m(ce,1)):(ce=vi(e),ce.c(),m(ce,1),ce.m(ta.parentNode,ta)):ce&&(Y(),h(ce,1,1,()=>{ce=null}),K()),(!Ya||s[0]&2048)&&Ie(Pa,e[11]),s[0]&8388608){Xa=li(e[23]);let Tt;for(Tt=0;Tt<Xa.length;Tt+=1){const ni=di(e,Xa,Tt);je[Tt]?je[Tt].p(ni,s):(je[Tt]=wi(ni),je[Tt].c(),je[Tt].m(Ye.parentNode,Ye))}for(;Tt<je.length;Tt+=1)je[Tt].d(1);je.length=Xa.length}const ir={};s[4]&16&&(ir.$$scope={dirty:s,ctx:e}),dt.$set(ir);let Za=we;we=Jr(e),we===Za?xa[we].p(e,s):(Y(),h(xa[Za],1,1,()=>{xa[Za]=null}),K(),Ce=xa[we],Ce?Ce.p(e,s):(Ce=xa[we]=Qr[we](e),Ce.c()),m(Ce,1),Ce.m(Lt.parentNode,Lt));const _a={};s[0]&16&&(_a.data=e[4]),ut.$set(_a);const Ve={};s[0]&16&&(Ve.data=e[4]),Te.$set(Ve);const Ct={};s[0]&16&&(Ct.data=e[4]),ke.$set(Ct),!e[12]&&e[4].length===0?be?s[0]&4112&&m(be,1):(be=Hi(e),be.c(),m(be,1),be.m(Bt.parentNode,Bt)):be&&(Y(),h(be,1,1,()=>{be=null}),K());const er={};s[4]&16&&(er.$$scope={dirty:s,ctx:e}),Pe.$set(er),e[7]?de?(de.p(e,s),s[0]&128&&m(de,1)):(de=ki(e),de.c(),m(de,1),de.m(yt.parentNode,yt)):de&&(Y(),h(de,1,1,()=>{de=null}),K()),e[8]?me?(me.p(e,s),s[0]&256&&m(me,1)):(me=$i(e),me.c(),m(me,1),me.m(it.parentNode,it)):me&&(Y(),h(me,1,1,()=>{me=null}),K());const pr={};s[0]&128&&(pr.data=e[7]),s[0]&4194304&&(pr.seriesOrder=e[22]),s[0]&2048&&(pr.title="Mapped places by category, "+e[11]+" (largest segment first)"),bt.$set(pr),e[21]&&e[21].area_top_category?Le?Le.p(e,s):(Le=Si(e),Le.c(),Le.m(Xe.parentNode,Xe)):Le&&(Le.d(1),Le=null);const ei={};s[4]&16&&(ei.$$scope={dirty:s,ctx:e}),Ge.$set(ei),e[9]?ue?(ue.p(e,s),s[0]&512&&m(ue,1)):(ue=ji(e),ue.c(),m(ue,1),ue.m(st.parentNode,st)):ue&&(Y(),h(ue,1,1,()=>{ue=null}),K()),e[16]?fe?(fe.p(e,s),s[0]&65536&&m(fe,1)):(fe=xi(e),fe.c(),m(fe,1),fe.m(Vt.parentNode,Vt)):fe&&(Y(),h(fe,1,1,()=>{fe=null}),K());let Tr=Me;Me=Wr(e),Me===Tr?Ca[Me].p(e,s):(Y(),h(Ca[Tr],1,1,()=>{Ca[Tr]=null}),K(),te=Ca[Me],te?te.p(e,s):(te=Ca[Me]=Vr[Me](e),te.c()),m(te,1),te.m(Ze.parentNode,Ze)),s[0]&66560&&(ra=e[16][0]&&Number(e[16][0].n_flagged)>0&&e[10].length>0),ra?ve?s[0]&66560&&m(ve,1):(ve=Ci(e),ve.c(),m(ve,1),ve.m(nt.parentNode,nt)):ve&&(Y(),h(ve,1,1,()=>{ve=null}),K()),s[0]&1024&&(Ga=e[10].some(Ei)),Ga?he?(he.p(e,s),s[0]&1024&&m(he,1)):(he=Ti(e),he.c(),m(he,1),he.m(Wt.parentNode,Wt)):he&&(Y(),h(he,1,1,()=>{he=null}),K());const ti={};s[4]&16&&(ti.$$scope={dirty:s,ctx:e}),Ae.$set(ti);const ai={};s[4]&16&&(ai.$$scope={dirty:s,ctx:e}),wt.$set(ai),e[17]?pe?(pe.p(e,s),s[0]&131072&&m(pe,1)):(pe=qi(e),pe.c(),m(pe,1),pe.m(Xt.parentNode,Xt)):pe&&(Y(),h(pe,1,1,()=>{pe=null}),K()),e[18]?ge?(ge.p(e,s),s[0]&262144&&m(ge,1)):(ge=Gi(e),ge.c(),m(ge,1),ge.m(Zt.parentNode,Zt)):ge&&(Y(),h(ge,1,1,()=>{ge=null}),K()),ur===(ur=Kr(e))&&Et?Et.p(e,s):(Et.d(1),Et=ur(e),Et&&(Et.c(),Et.m(Qe,null)));const qr={};s[0]&262144&&(qr.data=e[18]),s[4]&16&&(qr.$$scope={dirty:s,ctx:e}),et.$set(qr);const ri={};s[4]&16&&(ri.$$scope={dirty:s,ctx:e}),$t.$set(ri),fr===(fr=Yr(e))&&Mt?Mt.p(e,s):(Mt.d(1),Mt=fr(e),Mt&&(Mt.c(),Mt.m(Je,null)));const ii={};s[4]&16&&(ii.$$scope={dirty:s,ctx:e}),tt.$set(ii),e[19]?ye?(ye.p(e,s),s[0]&524288&&m(ye,1)):(ye=Ri(e),ye.c(),m(ye,1),ye.m(C.parentNode,C)):ye&&(Y(),h(ye,1,1,()=>{ye=null}),K());const Gr={};s[0]&524288&&(Gr.data=e[19]),s[0]&18432&&(Gr.title=e[11]??e[14]),L.$set(Gr),hr===(hr=Xr(e))&&Ot?Ot.p(e,s):(Ot.d(1),Ot=hr(e),Ot&&(Ot.c(),Ot.m(at,Ra))),(!Ya||s[0]&16777216)&&Ie(or,e[24])},i(e){Ya||(m(ae),m(re),m(ie),m(se),m(ne),m(oe),m(le),m(_e),m(O.$$.fragment,e),m(x.$$.fragment,e),m(J.$$.fragment,e),m(ce),m(dt.$$.fragment,e),m(Fe.$$.fragment,e),m(Ce),m(ut.$$.fragment,e),m(Te.$$.fragment,e),m(ke.$$.fragment,e),m(be),m(Pe.$$.fragment,e),m(de),m(me),m(bt.$$.fragment,e),m(Ge.$$.fragment,e),m(ue),m(fe),m(te),m(ve),m(he),m(Ae.$$.fragment,e),m(wt.$$.fragment,e),m(pe),m(ge),m(et.$$.fragment,e),m($t.$$.fragment,e),m(tt.$$.fragment,e),m(ye),m(L.$$.fragment,e),m(Na.$$.fragment,e),Ya=!0)},o(e){h(ae),h(re),h(ie),h(se),h(ne),h(oe),h(le),h(_e),h(O.$$.fragment,e),h(x.$$.fragment,e),h(J.$$.fragment,e),h(ce),h(dt.$$.fragment,e),h(Fe.$$.fragment,e),h(Ce),h(ut.$$.fragment,e),h(Te.$$.fragment,e),h(ke.$$.fragment,e),h(be),h(Pe.$$.fragment,e),h(de),h(me),h(bt.$$.fragment,e),h(Ge.$$.fragment,e),h(ue),h(fe),h(te),h(ve),h(he),h(Ae.$$.fragment,e),h(wt.$$.fragment,e),h(pe),h(ge),h(et.$$.fragment,e),h($t.$$.fragment,e),h(tt.$$.fragment,e),h(ye),h(L.$$.fragment,e),h(Na.$$.fragment,e),Ya=!1},d(e){e&&(l(a),l(o),l(d),l(c),l(p),l(j),l(S),l(B),l(Q),l(P),l(V),l(I),l(Z),l(W),l(u),l(ta),l(qt),l(f),l(Ye),l(He),l(At),l(ma),l(mt),l(Lt),l(ft),l(It),l(ua),l(Bt),l(qe),l(Ft),l(fa),l(rt),l(ht),l(ze),l(ha),l(pt),l(gt),l(yt),l(it),l(pa),l(Xe),l(Ut),l(Re),l(ga),l(Ee),l(Jt),l(st),l(Vt),l(Ze),l(nt),l(Wt),l(Oe),l(Yt),l(De),l(ya),l(vt),l(Ue),l(ba),l(Ht),l($e),l(wa),l(Xt),l(Zt),l(Qe),l(kt),l(Ha),l(ka),l(Je),l(St),l(ot),l($a),l(lt),l(jt),l(Sa),l(_t),l(Va),l(C),l(xt),l(at),l(sr),l(sa),l(nr),l(Se),l(lr),l(na),l(_r),l(ja),l(cr),l(ar),l(dr)),oa&&oa.d(e),rr.d(e),l(r),l(t),la&&la.d(e),l(n),ae&&ae.d(e),re&&re.d(e),ie&&ie.d(e),se&&se.d(e),ne&&ne.d(e),oe&&oe.d(e),le&&le.d(e),_e&&_e.d(e),G(O,e),G(x,e),G(J,e),Rt.d(),ce&&ce.d(e),Li(je,e),G(dt,e),G(Fe,e),xa[we].d(e),G(ut,e),G(Te,e),G(ke,e),be&&be.d(e),G(Pe,e),de&&de.d(e),me&&me.d(e),G(bt,e),Le&&Le.d(e),G(Ge,e),ue&&ue.d(e),fe&&fe.d(e),Ca[Me].d(e),ve&&ve.d(e),he&&he.d(e),G(Ae,e),G(wt,e),pe&&pe.d(e),ge&&ge.d(e),Et.d(),G(et,e),G($t,e),Mt.d(),G(tt,e),ye&&ye.d(e),G(L,e),Ot.d(),G(Na,e)}}}const D={},Er=5,Ei=i=>i.lowBase,Mi=i=>i.lowBase,Oi=i=>`${i.domain} (${i.poiCount??0})`;function Us(i,a,r){let t,n,o,d,c,p,j,S,B,Q,P,O,V,x,I,J,Z,W,Ne,N,A,xe,T,F;oi(i,os,C=>r(100,T=C)),oi(i,ci,C=>r(105,F=C));let{data:qa}=a,{data:u={},customFormattingSettings:ta,__db:qt,inputs:Dt}=qa;Bi(ci,F="89d6a2c7209c2d907e58ae263a74d1a5",F);let Pa=rs(as(Dt));Ni(Pa.subscribe(C=>Dt=C)),Fi(ns,{getCustomFormats:()=>ta.customFormats||[]});const ee=(C,L)=>cs(qt.query,C,{query_name:L});is(ee);let f=T.params;Pi(()=>!0);let Ye={initialData:void 0,initialError:void 0},He=U`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`,da=`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`;u.code_info_data&&(u.code_info_data instanceof Error?Ye.initialError=u.code_info_data:Ye.initialData=u.code_info_data,u.code_info_columns&&(Ye.knownColumns=u.code_info_columns));let At,dt=!1;const ma=We.createReactive({callback:C=>{r(0,At=C)},execFn:ee},{id:"code_info",...Ye});ma(da,{noResolve:He,...Ye}),globalThis[Symbol.for("code_info")]={get value(){return At}};let Fe={initialData:void 0,initialError:void 0},mt=U`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`,we=`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`;u.area_exists_data&&(u.area_exists_data instanceof Error?Fe.initialError=u.area_exists_data:Fe.initialData=u.area_exists_data,u.area_exists_columns&&(Fe.knownColumns=u.area_exists_columns));let Ce,Lt=!1;const ut=We.createReactive({callback:C=>{r(15,Ce=C)},execFn:ee},{id:"area_exists",...Fe});ut(we,{noResolve:mt,...Fe}),globalThis[Symbol.for("area_exists")]={get value(){return Ce}};let ft={initialData:void 0,initialError:void 0},Te=U`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
-- dim_area_geometry.area_name for subarea_l2 is derived (int_hamburg_gebiet_names):
-- '<Stadtteil> · <OSM place name>' where an OSM neighbourhood/quarter point lies inside the
-- Gebiet, else '<Stadtteil> · Gebiet <code>'. Every Gebiet has one; the script fallback below
-- only covers a route with no geometry row at all.
-- #353 (#352 review follow-up): \`label_has_code\` is the ONE label-contains-code test used site-wide
-- (same expression as the code_note columns on /hamburg/maps, /hamburg/poi-map and the Gebiet
-- lists), replacing a JS \`areaName.includes(code)\` check that could also match a code appearing
-- inside an OSM name.
select area_name, strpos(area_name, 'Gebiet ' || area_code) > 0 as label_has_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`,It=`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
-- dim_area_geometry.area_name for subarea_l2 is derived (int_hamburg_gebiet_names):
-- '<Stadtteil> · <OSM place name>' where an OSM neighbourhood/quarter point lies inside the
-- Gebiet, else '<Stadtteil> · Gebiet <code>'. Every Gebiet has one; the script fallback below
-- only covers a route with no geometry row at all.
-- #353 (#352 review follow-up): \`label_has_code\` is the ONE label-contains-code test used site-wide
-- (same expression as the code_note columns on /hamburg/maps, /hamburg/poi-map and the Gebiet
-- lists), replacing a JS \`areaName.includes(code)\` check that could also match a code appearing
-- inside an OSM name.
select area_name, strpos(area_name, 'Gebiet ' || area_code) > 0 as label_has_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`;u.name_info_data&&(u.name_info_data instanceof Error?ft.initialError=u.name_info_data:ft.initialData=u.name_info_data,u.name_info_columns&&(ft.knownColumns=u.name_info_columns));let ke,ua=!1;const Bt=We.createReactive({callback:C=>{r(1,ke=C)},execFn:ee},{id:"name_info",...ft});Bt(It,{noResolve:Te,...ft}),globalThis[Symbol.for("name_info")]={get value(){return ke}};let qe={initialData:void 0,initialError:void 0},Nt=U`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
-- #353: plus the Stadtteil's own parent district (hh_l1_to_district, source-provided), for the
-- breadcrumb/Up line and the district-total amenity column's label.
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name,
    h2.parent_area_code as district_code,
    gd.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1' and h2.area_code = h.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as gd
    on gd.city_code = 'HH' and gd.area_level = 'district' and gd.area_code = h2.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${f.code}'
limit 1`,Ft=`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
-- #353: plus the Stadtteil's own parent district (hh_l1_to_district, source-provided), for the
-- breadcrumb/Up line and the district-total amenity column's label.
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name,
    h2.parent_area_code as district_code,
    gd.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1' and h2.area_code = h.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as gd
    on gd.city_code = 'HH' and gd.area_level = 'district' and gd.area_code = h2.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${f.code}'
limit 1`;u.parent_info_data&&(u.parent_info_data instanceof Error?qe.initialError=u.parent_info_data:qe.initialData=u.parent_info_data,u.parent_info_columns&&(qe.knownColumns=u.parent_info_columns));let Pe,fa=!1;const rt=We.createReactive({callback:C=>{r(2,Pe=C)},execFn:ee},{id:"parent_info",...qe});rt(Ft,{noResolve:Nt,...qe}),globalThis[Symbol.for("parent_info")]={get value(){return Pe}};let Pt={initialData:void 0,initialError:void 0},ht=U`-- #353: this Gebiet's current stage and pressure trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived.
select
    period_yyyymm,
    status_class as stage,
    dynamism_class as pressure_trend,
    status_index,
    case status_class
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`,ze=`-- #353: this Gebiet's current stage and pressure trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived.
select
    period_yyyymm,
    status_class as stage,
    dynamism_class as pressure_trend,
    status_index,
    case status_class
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`;u.current_stage_data&&(u.current_stage_data instanceof Error?Pt.initialError=u.current_stage_data:Pt.initialData=u.current_stage_data,u.current_stage_columns&&(Pt.knownColumns=u.current_stage_columns));let aa,ha=!1;const pt=We.createReactive({callback:C=>{r(3,aa=C)},execFn:ee},{id:"current_stage",...Pt});pt(ze,{noResolve:ht,...Pt}),globalThis[Symbol.for("current_stage")]={get value(){return aa}};let zt={initialData:void 0,initialError:void 0},gt=U`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
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
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`,yt=`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
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
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`;u.trajectory_summary_data&&(u.trajectory_summary_data instanceof Error?zt.initialError=u.trajectory_summary_data:zt.initialData=u.trajectory_summary_data,u.trajectory_summary_columns&&(zt.knownColumns=u.trajectory_summary_columns));let it,bt=!1;const pa=We.createReactive({callback:C=>{r(4,it=C)},execFn:ee},{id:"trajectory_summary",...zt});pa(yt,{noResolve:gt,...zt}),globalThis[Symbol.for("trajectory_summary")]={get value(){return it}};let Xe={initialData:void 0,initialError:void 0},Ge=U`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
        limit 1
    )
group by all`,Ut=`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
        limit 1
    )
group by all`;u.sibling_trajectory_mix_data&&(u.sibling_trajectory_mix_data instanceof Error?Xe.initialError=u.sibling_trajectory_mix_data:Xe.initialData=u.sibling_trajectory_mix_data,u.sibling_trajectory_mix_columns&&(Xe.knownColumns=u.sibling_trajectory_mix_columns));let Re,za=!1;const ga=We.createReactive({callback:C=>{r(5,Re=C)},execFn:ee},{id:"sibling_trajectory_mix",...Xe});ga(Ut,{noResolve:Ge,...Xe}),globalThis[Symbol.for("sibling_trajectory_mix")]={get value(){return Re}};let Ee={initialData:void 0,initialError:void 0},Qt=U`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`,Jt=`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`;u.gebiet_label_stats_data&&(u.gebiet_label_stats_data instanceof Error?Ee.initialError=u.gebiet_label_stats_data:Ee.initialData=u.gebiet_label_stats_data,u.gebiet_label_stats_columns&&(Ee.knownColumns=u.gebiet_label_stats_columns));let st,Vt=!1;const Me=We.createReactive({callback:C=>{r(6,st=C)},execFn:ee},{id:"gebiet_label_stats",...Ee});Me(Jt,{noResolve:Qt,...Ee}),globalThis[Symbol.for("gebiet_label_stats")]={get value(){return st}};let te={initialData:void 0,initialError:void 0},Ze=U`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`,ra=`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`;u.poi_trend_data&&(u.poi_trend_data instanceof Error?te.initialError=u.poi_trend_data:te.initialData=u.poi_trend_data,u.poi_trend_columns&&(te.knownColumns=u.poi_trend_columns));let nt,Ga=!1;const Wt=We.createReactive({callback:C=>{r(7,nt=C)},execFn:ee},{id:"poi_trend",...te});Wt(ra,{noResolve:Ze,...te}),globalThis[Symbol.for("poi_trend")]={get value(){return nt}};let Oe={initialData:void 0,initialError:void 0},Kt=U`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
-- stacked bar below, same shape as the Berlin PLR page's poi_mix_context (plain sums of counts;
-- the Stadtteil set is the mart_area_hierarchy subarea_l2 -> subarea_l1 edge, OA-D1b/#240).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    stadtteil_mix as (
        select f.poi_category_h, sum(f.poi_count) as poi_count
        from gentriduck_marts.fct_poi_development as f
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
        where
            f.city_code = 'HH' and f.area_vintage = 'current'
            and h.parent_area_code = (
                select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
                limit 1
            )
            and f.snapshot_year = (select snapshot_year from area_latest)
        group by f.poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from stadtteil_mix order by poi_count desc limit 1) as stadtteil_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`,Yt=`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
-- stacked bar below, same shape as the Berlin PLR page's poi_mix_context (plain sums of counts;
-- the Stadtteil set is the mart_area_hierarchy subarea_l2 -> subarea_l1 edge, OA-D1b/#240).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    stadtteil_mix as (
        select f.poi_category_h, sum(f.poi_count) as poi_count
        from gentriduck_marts.fct_poi_development as f
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
        where
            f.city_code = 'HH' and f.area_vintage = 'current'
            and h.parent_area_code = (
                select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
                limit 1
            )
            and f.snapshot_year = (select snapshot_year from area_latest)
        group by f.poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from stadtteil_mix order by poi_count desc limit 1) as stadtteil_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`;u.poi_mix_context_data&&(u.poi_mix_context_data instanceof Error?Oe.initialError=u.poi_mix_context_data:Oe.initialData=u.poi_mix_context_data,u.poi_mix_context_columns&&(Oe.knownColumns=u.poi_mix_context_columns));let De,Ua=!1;const ya=We.createReactive({callback:C=>{r(8,De=C)},execFn:ee},{id:"poi_mix_context",...Oe});ya(Yt,{noResolve:Kt,...Oe}),globalThis[Symbol.for("poi_mix_context")]={get value(){return De}};let Ae={initialData:void 0,initialError:void 0},vt=U`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and oa_domain is not null
    )
order by oa_domain desc`,Ue=`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and oa_domain is not null
    )
order by oa_domain desc`;u.poi_oa_radar_data&&(u.poi_oa_radar_data instanceof Error?Ae.initialError=u.poi_oa_radar_data:Ae.initialData=u.poi_oa_radar_data,u.poi_oa_radar_columns&&(Ae.knownColumns=u.poi_oa_radar_columns));let ia,ba=!1;const wt=We.createReactive({callback:C=>{r(9,ia=C)},execFn:ee},{id:"poi_oa_radar",...Ae});wt(Ue,{noResolve:vt,...Ae}),globalThis[Symbol.for("poi_oa_radar")]={get value(){return ia}};let Ht={initialData:void 0,initialError:void 0},$e=U`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
    )`,va=`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
    )`;u.poi_oa_suppressed_data&&(u.poi_oa_suppressed_data instanceof Error?Ht.initialError=u.poi_oa_suppressed_data:Ht.initialData=u.poi_oa_suppressed_data,u.poi_oa_suppressed_columns&&(Ht.knownColumns=u.poi_oa_suppressed_columns));let wa,Xt=!1;const Zt=We.createReactive({callback:C=>{r(16,wa=C)},execFn:ee},{id:"poi_oa_suppressed",...Ht});Zt(va,{noResolve:$e,...Ht}),globalThis[Symbol.for("poi_oa_suppressed")]={get value(){return wa}};let Qe={initialData:void 0,initialError:void 0},kt=U`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`,et=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`;u.amenities_current_data&&(u.amenities_current_data instanceof Error?Qe.initialError=u.amenities_current_data:Qe.initialData=u.amenities_current_data,u.amenities_current_columns&&(Qe.knownColumns=u.amenities_current_columns));let Ha,$t=!1;const ka=We.createReactive({callback:C=>{r(17,Ha=C)},execFn:ee},{id:"amenities_current",...Qe});ka(et,{noResolve:kt,...Qe}),globalThis[Symbol.for("amenities_current")]={get value(){return Ha}};let Je={initialData:void 0,initialError:void 0},St=U`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select h2.parent_area_code
                from gentriduck_marts.mart_area_hierarchy as h1
                join gentriduck_marts.mart_area_hierarchy as h2
                    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1'
                    and h2.area_code = h1.parent_area_code
                where h1.city_code = 'HH' and h1.area_level = 'subarea_l2'
                    and h1.area_code = '${f.code}'
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
order by sort_order`,ot=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select h2.parent_area_code
                from gentriduck_marts.mart_area_hierarchy as h1
                join gentriduck_marts.mart_area_hierarchy as h2
                    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1'
                    and h2.area_code = h1.parent_area_code
                where h1.city_code = 'HH' and h1.area_level = 'subarea_l2'
                    and h1.area_code = '${f.code}'
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
order by sort_order`;u.amenities_table_data&&(u.amenities_table_data instanceof Error?Je.initialError=u.amenities_table_data:Je.initialData=u.amenities_table_data,u.amenities_table_columns&&(Je.knownColumns=u.amenities_table_columns));let Qa,$a=!1;const lt=We.createReactive({callback:C=>{r(18,Qa=C)},execFn:ee},{id:"amenities_table",...Je});lt(ot,{noResolve:St,...Je}),globalThis[Symbol.for("amenities_table")]={get value(){return Qa}};let ea={initialData:void 0,initialError:void 0},jt=U`-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
-- OSM name (#307/#352) with a quote character can never break this query's own SQL syntax. The
-- coalesce-to-code is a no-op since #352 (every Gebiet has a label), kept as a guard.
select
    'subarea_l2:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'`,tt=`-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
-- OSM name (#307/#352) with a quote character can never break this query's own SQL syntax. The
-- coalesce-to-code is a no-op since #352 (every Gebiet has a label), kept as a guard.
select
    'subarea_l2:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'`;u.minimap_areas_data&&(u.minimap_areas_data instanceof Error?ea.initialError=u.minimap_areas_data:ea.initialData=u.minimap_areas_data,u.minimap_areas_columns&&(ea.knownColumns=u.minimap_areas_columns));let Sa,_t=!1;const Ja=We.createReactive({callback:C=>{r(19,Sa=C)},execFn:ee},{id:"minimap_areas",...ea});Ja(tt,{noResolve:jt,...ea}),globalThis[Symbol.for("minimap_areas")]={get value(){return Sa}};const Va=-100;return i.$$set=C=>{"data"in C&&r(29,qa=C.data)},i.$$.update=()=>{var C;i.$$.dirty[0]&536870912&&r(30,{data:u={},customFormattingSettings:ta,__db:qt}=qa,u),i.$$.dirty[0]&1073741824&&ss.set(Object.keys(u).length>0),i.$$.dirty[3]&128&&r(31,f=T.params),i.$$.dirty[1]&1&&r(33,He=U`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`),i.$$.dirty[1]&1&&r(34,da=`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`),i.$$.dirty[1]&30&&(He||!dt?He||(ma(da,{noResolve:He,...Ye}),r(35,dt=!0)):ma(da,{noResolve:He})),i.$$.dirty[1]&1&&r(37,mt=U`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&1&&r(38,we=`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&480&&(mt||!Lt?mt||(ut(we,{noResolve:mt,...Fe}),r(39,Lt=!0)):ut(we,{noResolve:mt})),i.$$.dirty[1]&1&&r(41,Te=U`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
-- dim_area_geometry.area_name for subarea_l2 is derived (int_hamburg_gebiet_names):
-- '<Stadtteil> · <OSM place name>' where an OSM neighbourhood/quarter point lies inside the
-- Gebiet, else '<Stadtteil> · Gebiet <code>'. Every Gebiet has one; the script fallback below
-- only covers a route with no geometry row at all.
-- #353 (#352 review follow-up): \`label_has_code\` is the ONE label-contains-code test used site-wide
-- (same expression as the code_note columns on /hamburg/maps, /hamburg/poi-map and the Gebiet
-- lists), replacing a JS \`areaName.includes(code)\` check that could also match a code appearing
-- inside an OSM name.
select area_name, strpos(area_name, 'Gebiet ' || area_code) > 0 as label_has_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&1&&r(42,It=`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
-- dim_area_geometry.area_name for subarea_l2 is derived (int_hamburg_gebiet_names):
-- '<Stadtteil> · <OSM place name>' where an OSM neighbourhood/quarter point lies inside the
-- Gebiet, else '<Stadtteil> · Gebiet <code>'. Every Gebiet has one; the script fallback below
-- only covers a route with no geometry row at all.
-- #353 (#352 review follow-up): \`label_has_code\` is the ONE label-contains-code test used site-wide
-- (same expression as the code_note columns on /hamburg/maps, /hamburg/poi-map and the Gebiet
-- lists), replacing a JS \`areaName.includes(code)\` check that could also match a code appearing
-- inside an OSM name.
select area_name, strpos(area_name, 'Gebiet ' || area_code) > 0 as label_has_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&7680&&(Te||!ua?Te||(Bt(It,{noResolve:Te,...ft}),r(43,ua=!0)):Bt(It,{noResolve:Te})),i.$$.dirty[1]&1&&r(45,Nt=U`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
-- #353: plus the Stadtteil's own parent district (hh_l1_to_district, source-provided), for the
-- breadcrumb/Up line and the district-total amenity column's label.
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name,
    h2.parent_area_code as district_code,
    gd.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1' and h2.area_code = h.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as gd
    on gd.city_code = 'HH' and gd.area_level = 'district' and gd.area_code = h2.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&1&&r(46,Ft=`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
-- #353: plus the Stadtteil's own parent district (hh_l1_to_district, source-provided), for the
-- breadcrumb/Up line and the district-total amenity column's label.
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name,
    h2.parent_area_code as district_code,
    gd.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1' and h2.area_code = h.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as gd
    on gd.city_code = 'HH' and gd.area_level = 'district' and gd.area_code = h2.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&122880&&(Nt||!fa?Nt||(rt(Ft,{noResolve:Nt,...qe}),r(47,fa=!0)):rt(Ft,{noResolve:Nt})),i.$$.dirty[1]&1&&r(49,ht=U`-- #353: this Gebiet's current stage and pressure trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived.
select
    period_yyyymm,
    status_class as stage,
    dynamism_class as pressure_trend,
    status_index,
    case status_class
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`),i.$$.dirty[1]&1&&r(50,ze=`-- #353: this Gebiet's current stage and pressure trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived.
select
    period_yyyymm,
    status_class as stage,
    dynamism_class as pressure_trend,
    status_index,
    case status_class
        when 'active-gentrification' then 'Active gentrification'
        when 'pioneer-signal' then 'Early pioneer signal'
        when 'improving-vulnerable' then 'Improving, vulnerable area'
        when 'pre-gentrification' then 'Pre-gentrification watch'
        when 'consolidation-pressure' then 'Consolidated, still intensifying'
        when 'stable-established' then 'Stable, established'
    end as stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`),i.$$.dirty[1]&1966080&&(ht||!ha?ht||(pt(ze,{noResolve:ht,...Pt}),r(51,ha=!0)):pt(ze,{noResolve:ht})),i.$$.dirty[1]&1&&r(53,gt=U`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
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
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`),i.$$.dirty[1]&1&&r(54,yt=`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
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
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`),i.$$.dirty[1]&31457280&&(gt||!bt?gt||(pa(yt,{noResolve:gt,...zt}),r(55,bt=!0)):pa(yt,{noResolve:gt})),i.$$.dirty[1]&1&&r(57,Ge=U`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
        limit 1
    )
group by all`),i.$$.dirty[1]&1&&r(58,Ut=`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
        limit 1
    )
group by all`),i.$$.dirty[1]&503316480&&(Ge||!za?Ge||(ga(Ut,{noResolve:Ge,...Xe}),r(59,za=!0)):ga(Ut,{noResolve:Ge})),i.$$.dirty[1]&1610612736|i.$$.dirty[2]&3&&(Qt||!Vt?Qt||(Me(Jt,{noResolve:Qt,...Ee}),r(63,Vt=!0)):Me(Jt,{noResolve:Qt})),i.$$.dirty[1]&1&&r(65,Ze=U`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`),i.$$.dirty[1]&1&&r(66,ra=`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`),i.$$.dirty[2]&60&&(Ze||!Ga?Ze||(Wt(ra,{noResolve:Ze,...te}),r(67,Ga=!0)):Wt(ra,{noResolve:Ze})),i.$$.dirty[1]&1&&r(69,Kt=U`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
-- stacked bar below, same shape as the Berlin PLR page's poi_mix_context (plain sums of counts;
-- the Stadtteil set is the mart_area_hierarchy subarea_l2 -> subarea_l1 edge, OA-D1b/#240).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    stadtteil_mix as (
        select f.poi_category_h, sum(f.poi_count) as poi_count
        from gentriduck_marts.fct_poi_development as f
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
        where
            f.city_code = 'HH' and f.area_vintage = 'current'
            and h.parent_area_code = (
                select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
                limit 1
            )
            and f.snapshot_year = (select snapshot_year from area_latest)
        group by f.poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from stadtteil_mix order by poi_count desc limit 1) as stadtteil_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),i.$$.dirty[1]&1&&r(70,Yt=`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
-- stacked bar below, same shape as the Berlin PLR page's poi_mix_context (plain sums of counts;
-- the Stadtteil set is the mart_area_hierarchy subarea_l2 -> subarea_l1 edge, OA-D1b/#240).
with
    area_latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.fct_poi_development
        where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
    ),
    area_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    ),
    stadtteil_mix as (
        select f.poi_category_h, sum(f.poi_count) as poi_count
        from gentriduck_marts.fct_poi_development as f
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = f.area_code
        where
            f.city_code = 'HH' and f.area_vintage = 'current'
            and h.parent_area_code = (
                select parent_area_code
                from gentriduck_marts.mart_area_hierarchy
                where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
                limit 1
            )
            and f.snapshot_year = (select snapshot_year from area_latest)
        group by f.poi_category_h
    ),
    city_mix as (
        select poi_category_h, sum(poi_count) as poi_count
        from gentriduck_marts.fct_poi_development
        where
            city_code = 'HH' and area_vintage = 'current'
            and snapshot_year = (select snapshot_year from area_latest)
        group by poi_category_h
    )
select
    (select snapshot_year from area_latest) as snapshot_year,
    (select poi_category_h from area_mix order by poi_count desc limit 1) as area_top_category,
    (select poi_category_h from stadtteil_mix order by poi_count desc limit 1) as stadtteil_top_category,
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),i.$$.dirty[2]&960&&(Kt||!Ua?Kt||(ya(Yt,{noResolve:Kt,...Oe}),r(71,Ua=!0)):ya(Yt,{noResolve:Kt})),i.$$.dirty[1]&1&&r(73,vt=U`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and oa_domain is not null
    )
order by oa_domain desc`),i.$$.dirty[1]&1&&r(74,Ue=`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed.
select
    poi_domain_h,
    oa_domain,
    poi_count
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and oa_domain is not null
    )
order by oa_domain desc`),i.$$.dirty[2]&15360&&(vt||!ba?vt||(wt(Ue,{noResolve:vt,...Ae}),r(75,ba=!0)):wt(Ue,{noResolve:vt})),i.$$.dirty[1]&1&&r(77,$e=U`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
    )`),i.$$.dirty[1]&1&&r(78,va=`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
    )`),i.$$.dirty[2]&245760&&($e||!Xt?$e||(Zt(va,{noResolve:$e,...Ht}),r(79,Xt=!0)):Zt(va,{noResolve:$e})),i.$$.dirty[1]&1&&r(81,kt=U`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[1]&1&&r(82,et=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[2]&3932160&&(kt||!$t?kt||(ka(et,{noResolve:kt,...Qe}),r(83,$t=!0)):ka(et,{noResolve:kt})),i.$$.dirty[1]&1&&r(85,St=U`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select h2.parent_area_code
                from gentriduck_marts.mart_area_hierarchy as h1
                join gentriduck_marts.mart_area_hierarchy as h2
                    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1'
                    and h2.area_code = h1.parent_area_code
                where h1.city_code = 'HH' and h1.area_level = 'subarea_l2'
                    and h1.area_code = '${f.code}'
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
order by sort_order`),i.$$.dirty[1]&1&&r(86,ot=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
-- rollup -- extensive counts). Values pre-formatted as text, as on the Berlin page.
with
    latest as (
        select max(snapshot_year) as snapshot_year
        from gentriduck_marts.mart_area_amenities
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
    ),
    area_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
            and snapshot_year = (select snapshot_year from latest)
    ),
    district_row as (
        select *
        from gentriduck_marts.mart_area_amenities
        where
            city_code = 'HH' and area_level = 'district'
            and area_code = (select h2.parent_area_code
                from gentriduck_marts.mart_area_hierarchy as h1
                join gentriduck_marts.mart_area_hierarchy as h2
                    on h2.city_code = 'HH' and h2.area_level = 'subarea_l1'
                    and h2.area_code = h1.parent_area_code
                where h1.city_code = 'HH' and h1.area_level = 'subarea_l2'
                    and h1.area_code = '${f.code}'
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
order by sort_order`),i.$$.dirty[2]&62914560&&(St||!$a?St||(lt(ot,{noResolve:St,...Je}),r(87,$a=!0)):lt(ot,{noResolve:St})),i.$$.dirty[1]&1&&r(89,jt=U`-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
-- OSM name (#307/#352) with a quote character can never break this query's own SQL syntax. The
-- coalesce-to-code is a no-op since #352 (every Gebiet has a label), kept as a guard.
select
    'subarea_l2:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'`),i.$$.dirty[1]&1&&r(90,tt=`-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
-- OSM name (#307/#352) with a quote character can never break this query's own SQL syntax. The
-- coalesce-to-code is a no-op since #352 (every Gebiet has a label), kept as a guard.
select
    'subarea_l2:' || '${f.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${f.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'`),i.$$.dirty[2]&1006632960&&(jt||!_t?jt||(Ja(tt,{noResolve:jt,...ea}),r(91,_t=!0)):Ja(tt,{noResolve:jt})),i.$$.dirty[0]&1&&r(14,t=At[0]?At[0].area_code:""),i.$$.dirty[0]&2&&r(99,n=(C=ke==null?void 0:ke[0])!=null&&C.area_name?ke[0].area_name:null),i.$$.dirty[0]&16384|i.$$.dirty[3]&64&&r(11,o=n??`Statistisches Gebiet ${t}`),i.$$.dirty[0]&16386|i.$$.dirty[3]&64&&r(28,d="Chapter 3 — The Evidence · most granular"+(n&&!ke[0].label_has_code?` · Gebiet ${t}`:"")),i.$$.dirty[0]&2048&&r(27,c=[{label:"Hamburg",href:"/hamburg"},{label:"All Gebiete",href:"/hamburg/area"},{label:o}]),i.$$.dirty[3]&64&&r(26,p=n?`${n} — Gebiet profile · Hamburg`:null),i.$$.dirty[0]&4&&r(25,j=Pe==null?void 0:Pe[0]),i.$$.dirty[0]&64&&r(98,S=st==null?void 0:st[0]),i.$$.dirty[3]&32&&r(24,B=S?`${S.n_osm_named} of ${S.n_gebiete} Gebiete`:"a minority of Gebiete"),i.$$.dirty[0]&8&&r(13,Q=aa==null?void 0:aa[0]),i.$$.dirty[0]&8192&&r(95,P=Q&&Q.stage_label?`In Hamburg's latest Sozialmonitoring edition on this site (${String(Q.period_yyyymm).slice(0,4)}), this Gebiet is classified in the stage <b>${Q.stage_label}</b>. This is a Hamburg-coded stage: it is <b>not directly equivalent</b> to a Berlin stage of the same name (Hamburg measures Dynamik over 3 years, Berlin over 2, so the same name can mark a different speed of change; see <a href="/gentriduck/methodology">methodology §6</a>).`:"No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on this site."),i.$$.dirty[0]&16&&r(96,O=it==null?void 0:it[0]),i.$$.dirty[0]&32&&r(97,V=Array.isArray(Re)?Re:Array.from(Re??[])),i.$$.dirty[3]&24&&r(12,x=(()=>{if(!O||O.n_editions==null)return null;if(O.n_editions<=1)return"Only one annual Sozialmonitoring reading is on record for this Gebiet within the 2019–2025 window, so its pace of change can't be assessed yet.";const L=O.status_delta!=null?Math.abs(Number(O.status_delta)):null,xt=L==null?"at an unclear pace":L<.4?"only gradually":L<1.2?"at a moderate pace":"quickly, moving several status steps",at={improving:"become less deprived",declining:"become more deprived","stable-established":"stayed consistently low-deprivation","persistently-deprived":"stayed consistently high-deprivation",mixed:"shown no single clear direction"}[O.trajectory_type]??"shown an unclassified pattern";let Wa=`Within the 2019–2025 window (editions ${O.first_edition}–${O.last_edition} on record), it has ${at}, ${xt} (trajectory confidence: ${O.trajectory_confidence}).`;const Ra=V.reduce((Ka,tr)=>Ka+Number(tr.n||0),0),Gt=V.find(Ka=>Ka.trajectory_type===O.trajectory_type);return Ra>0&&Gt&&(Wa+=` ${Gt.n} of ${Ra} other Gebiete in this Stadtteil with a usable trajectory show this same "${O.trajectory_type}" pattern.`),Wa})()),i.$$.dirty[0]&4096|i.$$.dirty[3]&4&&r(23,I=[P,x].filter(Boolean)),i.$$.dirty[0]&128&&r(94,J=Array.isArray(nt)?nt:Array.from(nt??[])),i.$$.dirty[3]&2&&r(22,Z=Array.from(J.reduce((L,xt)=>(L.set(xt.poi_category_h,(L.get(xt.poi_category_h)||0)+Number(xt.poi_count||0)),L),new Map)).sort((L,xt)=>xt[1]-L[1]).map(([L])=>L)),i.$$.dirty[0]&256&&r(21,W=De==null?void 0:De[0]),i.$$.dirty[0]&512&&r(93,Ne=Array.isArray(ia)?ia:Array.from(ia??[])),i.$$.dirty[3]&1&&r(10,N=Ne.map(L=>({domain:L.poi_domain_h,pct:(Number(L.oa_domain)-1)*100,lowBase:Number(L.poi_count||0)<Er,poiCount:L.poi_count}))),i.$$.dirty[0]&1024&&r(92,A=Math.max(100,...N.map(L=>L.pct))*1.1),i.$$.dirty[0]&3072|i.$$.dirty[2]&1073741824&&r(20,xe={tooltip:{},radar:{indicator:N.map(L=>({name:L.lowBase?`${L.domain} †`:L.domain,max:A,min:Va})),splitNumber:4,axisName:{fontSize:10}},series:[{type:"radar",data:[{value:N.map(L=>L.pct),name:o,areaStyle:{opacity:.15}},{value:N.map(()=>0),name:"Citywide baseline (0% = Hamburg average)",lineStyle:{type:"dashed",width:1},areaStyle:{opacity:0},symbol:"none"}]}]})},r(61,Qt=U`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),r(62,Jt=`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),[At,ke,Pe,aa,it,Re,st,nt,De,ia,N,o,x,Q,t,Ce,wa,Ha,Qa,Sa,xe,W,Z,I,B,j,p,c,d,qa,u,f,Ye,He,da,dt,Fe,mt,we,Lt,ft,Te,It,ua,qe,Nt,Ft,fa,Pt,ht,ze,ha,zt,gt,yt,bt,Xe,Ge,Ut,za,Ee,Qt,Jt,Vt,te,Ze,ra,Ga,Oe,Kt,Yt,Ua,Ae,vt,Ue,ba,Ht,$e,va,Xt,Qe,kt,et,$t,Je,St,ot,$a,ea,jt,tt,_t,A,Ne,J,P,O,V,S,n,T]}class mn extends Qi{constructor(a){super(),Ji(this,a,Us,zs,Ai,{data:29},null,[-1,-1,-1,-1,-1])}}export{mn as component};
