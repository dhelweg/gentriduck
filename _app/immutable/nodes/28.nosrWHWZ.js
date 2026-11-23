import{s as Bi,d as l,x as Fi,w as Le,i as _,a as $,b as w,c as g,h as zi,e as H,f as wr,g as Y,j as b,k as M,l as y,m as k,t as v,n as di,o as Pi,p as Ui,q as Qi,r as Ji,u as De,v as Vi,H as Wi}from"../chunks/scheduler.wXRIqz25.js";import{S as Ki,i as Yi,d as C,t as h,a as m,c as W,m as q,b as G,e as R,g as K}from"../chunks/index.uz5rP6Z2.js";import{e as mi}from"../chunks/each.nHEApTB1.js";import{A as Xi,P as Zi}from"../chunks/PageTitle.X8fTilZx.js";import{A as es}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as as}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as ts}from"../chunks/HamburgTrajectoryNote.D2Jp2F4a.js";import{H as rs}from"../chunks/Hero.C0o6T8tj.js";import{N as vr}from"../chunks/NotYetPublished.Cn65vfa5.js";import{S as is}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as ss}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as os,C as Or}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as ns,w as ls}from"../chunks/entry.DotynpIs.js";import{A as ut}from"../chunks/Alert.DFISYc09.js";import{e as _s,s as cs,Q as ze,p as ds,a as ui,r as fi,C as ms}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as P}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as us}from"../chunks/stores.DJGNasUV.js";import{Q as Pe}from"../chunks/QueryViewer.RFckNDEV.js";import{B as fs,E as hs}from"../chunks/BarChart.Cy9nf948.js";import{B as or}from"../chunks/BigValue.Bpt9v-UH.js";import{p as ps}from"../chunks/profile.BW8tN6E9.js";function hi(i,t,r){const a=i.slice();return a[125]=t[r],a}function gs(i){var n;let t,r=(L.title??((n=L.og)==null?void 0:n.title))+"",a;return{c(){t=k("h1"),a=v(r),this.h()},l(o){t=H(o,"H1",{class:!0});var c=Y(t);a=b(c,r),c.forEach(l),this.h()},h(){w(t,"class","title")},m(o,c){_(o,t,c),$(t,a)},p:De,d(o){o&&l(t)}}}function ys(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:De,p:De,d:De}}function bs(i){var c;let t,r,a,n,o;return document.title=t=L.title??((c=L.og)==null?void 0:c.title),{c(){r=y(),a=k("meta"),n=y(),o=k("meta"),this.h()},l(d){r=g(d),a=H(d,"META",{property:!0,content:!0}),n=g(d),o=H(d,"META",{name:!0,content:!0}),this.h()},h(){var d,p;w(a,"property","og:title"),w(a,"content",((d=L.og)==null?void 0:d.title)??L.title),w(o,"name","twitter:title"),w(o,"content",((p=L.og)==null?void 0:p.title)??L.title)},m(d,p){_(d,r,p),_(d,a,p),_(d,n,p),_(d,o,p)},p(d,p){var j;p&0&&t!==(t=L.title??((j=L.og)==null?void 0:j.title))&&(document.title=t)},d(d){d&&(l(r),l(a),l(n),l(o))}}}function vs(i){var o,c;let t,r,a=(L.description||((o=L.og)==null?void 0:o.description))&&ws(),n=((c=L.og)==null?void 0:c.image)&&Hs();return{c(){a&&a.c(),t=y(),n&&n.c(),r=wr()},l(d){a&&a.l(d),t=g(d),n&&n.l(d),r=wr()},m(d,p){a&&a.m(d,p),_(d,t,p),n&&n.m(d,p),_(d,r,p)},p(d,p){var j,S;(L.description||(j=L.og)!=null&&j.description)&&a.p(d,p),(S=L.og)!=null&&S.image&&n.p(d,p)},d(d){d&&(l(t),l(r)),a&&a.d(d),n&&n.d(d)}}}function ws(i){let t,r,a,n,o;return{c(){t=k("meta"),r=y(),a=k("meta"),n=y(),o=k("meta"),this.h()},l(c){t=H(c,"META",{name:!0,content:!0}),r=g(c),a=H(c,"META",{property:!0,content:!0}),n=g(c),o=H(c,"META",{name:!0,content:!0}),this.h()},h(){var c,d,p;w(t,"name","description"),w(t,"content",L.description??((c=L.og)==null?void 0:c.description)),w(a,"property","og:description"),w(a,"content",((d=L.og)==null?void 0:d.description)??L.description),w(o,"name","twitter:description"),w(o,"content",((p=L.og)==null?void 0:p.description)??L.description)},m(c,d){_(c,t,d),_(c,r,d),_(c,a,d),_(c,n,d),_(c,o,d)},p:De,d(c){c&&(l(t),l(r),l(a),l(n),l(o))}}}function Hs(i){let t,r,a;return{c(){t=k("meta"),r=y(),a=k("meta"),this.h()},l(n){t=H(n,"META",{property:!0,content:!0}),r=g(n),a=H(n,"META",{name:!0,content:!0}),this.h()},h(){var n,o;w(t,"property","og:image"),w(t,"content",ui((n=L.og)==null?void 0:n.image)),w(a,"name","twitter:image"),w(a,"content",ui((o=L.og)==null?void 0:o.image))},m(n,o){_(n,t,o),_(n,r,o),_(n,a,o)},p:De,d(n){n&&(l(t),l(r),l(a))}}}function pi(i){let t,r;return t=new Pe({props:{queryID:"code_info",queryResult:i[0]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function gi(i){let t,r;return t=new Pe({props:{queryID:"area_exists",queryResult:i[15]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&32768&&(o.queryResult=a[15]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function yi(i){let t,r;return t=new Pe({props:{queryID:"name_info",queryResult:i[1]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function bi(i){let t,r;return t=new Pe({props:{queryID:"parent_info",queryResult:i[2]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function vi(i){let t,r;return t=new Pe({props:{queryID:"current_stage",queryResult:i[3]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function wi(i){let t,r;return t=new Pe({props:{queryID:"trajectory_summary",queryResult:i[4]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Hi(i){let t,r;return t=new Pe({props:{queryID:"sibling_trajectory_mix",queryResult:i[5]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function ki(i){let t,r;return t=new Pe({props:{queryID:"gebiet_label_stats",queryResult:i[6]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function ks(i){let t,r="Stadtteil profile";return{c(){t=k("a"),t.textContent=r,this.h()},l(a){t=H(a,"A",{href:!0,"data-svelte-h":!0}),M(t)!=="svelte-220xn5"&&(t.textContent=r),this.h()},h(){w(t,"href","/gentriduck/hamburg/area/subarea_l1")},m(a,n){_(a,t,n)},p:De,d(a){a&&l(t)}}}function $s(i){let t,r=(i[2][0].stadtteil_name??"Stadtteil profile")+"",a,n;return{c(){t=k("a"),a=v(r),this.h()},l(o){t=H(o,"A",{href:!0});var c=Y(t);a=b(c,r),c.forEach(l),this.h()},h(){w(t,"href",n="/gentriduck/hamburg/area/subarea_l1/"+i[2][0].stadtteil_code)},m(o,c){_(o,t,c),$(t,a)},p(o,c){c[0]&4&&r!==(r=(o[2][0].stadtteil_name??"Stadtteil profile")+"")&&Le(a,r),c[0]&4&&n!==(n="/gentriduck/hamburg/area/subarea_l1/"+o[2][0].stadtteil_code)&&w(t,"href",n)},d(o){o&&l(t)}}}function $i(i){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[Ss]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&16384|n[4]&16&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ss(i){let t,r,a,n,o,c="the Gebiet list",d;return{c(){t=v("No Hamburg Gebiet geometry found for code "),r=k("b"),a=v(i[14]),n=v(` —
  this route should only be reachable via a real crawled link from
  `),o=k("a"),o.textContent=c,d=v(`; if you landed here another way, that list is the
  reliable starting point.`),this.h()},l(p){t=b(p,"No Hamburg Gebiet geometry found for code "),r=H(p,"B",{});var j=Y(r);a=b(j,i[14]),j.forEach(l),n=b(p,` —
  this route should only be reachable via a real crawled link from
  `),o=H(p,"A",{href:!0,"data-svelte-h":!0}),M(o)!=="svelte-5vmt59"&&(o.textContent=c),d=b(p,`; if you landed here another way, that list is the
  reliable starting point.`),this.h()},h(){w(o,"href","/gentriduck/hamburg/area")},m(p,j){_(p,t,j),_(p,r,j),$(r,a),_(p,n,j),_(p,o,j),_(p,d,j)},p(p,j){j[0]&16384&&Le(a,p[14])},d(p){p&&(l(t),l(r),l(n),l(o),l(d))}}}function Si(i){let t,r,a=i[125]+"";return{c(){t=k("p"),r=new Wi(!1),this.h()},l(n){t=H(n,"P",{});var o=Y(t);r=Vi(o,!1),o.forEach(l),this.h()},h(){r.a=null},m(n,o){_(n,t,o),r.m(a,t)},p(n,o){o[0]&8388608&&a!==(a=n[125]+"")&&r.p(a)},d(n){n&&l(t)}}}function js(i){let t,r="How to read this section:",a,n,o="1 = least deprived",c,d,p="4 = most deprived",j,S,A="falls",U,F,O="less",J,x,I="methodology & data sources",Q;return{c(){t=k("b"),t.textContent=r,a=v(" Hamburg's official status runs "),n=k("b"),n.textContent=o,c=v(` to
  `),d=k("b"),d.textContent=p,j=v(", so a status that "),S=k("b"),S.textContent=A,U=v(" means the Gebiet became "),F=k("b"),F.textContent=O,J=v(`
  deprived (its status rose) — which is also the signature of gentrification, not automatically good
  news for existing residents. Figures come from Hamburg's own annual Sozialmonitoring —
  see the `),x=k("a"),x.textContent=I,Q=v(` page, §6 for how it differs from
  Berlin's.`),this.h()},l(E){t=H(E,"B",{"data-svelte-h":!0}),M(t)!=="svelte-180tz6y"&&(t.textContent=r),a=b(E," Hamburg's official status runs "),n=H(E,"B",{"data-svelte-h":!0}),M(n)!=="svelte-1bcgix4"&&(n.textContent=o),c=b(E,` to
  `),d=H(E,"B",{"data-svelte-h":!0}),M(d)!=="svelte-1cr3k8t"&&(d.textContent=p),j=b(E,", so a status that "),S=H(E,"B",{"data-svelte-h":!0}),M(S)!=="svelte-c1n766"&&(S.textContent=A),U=b(E," means the Gebiet became "),F=H(E,"B",{"data-svelte-h":!0}),M(F)!=="svelte-u149sn"&&(F.textContent=O),J=b(E,`
  deprived (its status rose) — which is also the signature of gentrification, not automatically good
  news for existing residents. Figures come from Hamburg's own annual Sozialmonitoring —
  see the `),x=H(E,"A",{href:!0,"data-svelte-h":!0}),M(x)!=="svelte-3zcnok"&&(x.textContent=I),Q=b(E,` page, §6 for how it differs from
  Berlin's.`),this.h()},h(){w(x,"href","/gentriduck/methodology")},m(E,N){_(E,t,N),_(E,a,N),_(E,n,N),_(E,c,N),_(E,d,N),_(E,j,N),_(E,S,N),_(E,U,N),_(E,F,N),_(E,J,N),_(E,x,N),_(E,Q,N)},p:De,d(E){E&&(l(t),l(a),l(n),l(c),l(d),l(j),l(S),l(U),l(F),l(J),l(x),l(Q))}}}function xs(i){let t,r;return t=new ut({props:{status:"info",$$slots:{default:[Cs]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[4]&16&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ts(i){let t,r,a,n;return t=new or({props:{data:i[3],value:"stage_label",title:"Current stage"}}),a=new or({props:{data:i[3],value:"status_trend",title:"Status trend"}}),{c(){R(t.$$.fragment),r=y(),R(a.$$.fragment)},l(o){G(t.$$.fragment,o),r=g(o),G(a.$$.fragment,o)},m(o,c){q(t,o,c),_(o,r,c),q(a,o,c),n=!0},p(o,c){const d={};c[0]&8&&(d.data=o[3]),t.$set(d);const p={};c[0]&8&&(p.data=o[3]),a.$set(p)},i(o){n||(m(t.$$.fragment,o),m(a.$$.fragment,o),n=!0)},o(o){h(t.$$.fragment,o),h(a.$$.fragment,o),n=!1},d(o){o&&l(r),C(t,o),C(a,o)}}}function Cs(i){let t;return{c(){t=v(`No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on
  this site, so no current stage applies here.`)},l(r){t=b(r,`No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on
  this site, so no current stage applies here.`)},m(r,a){_(r,t,a)},d(r){r&&l(t)}}}function ji(i){let t,r;return t=new ut({props:{status:"info",$$slots:{default:[qs]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function qs(i){let t;return{c(){t=v(`No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).`)},l(r){t=b(r,`No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).`)},m(r,a){_(r,t,a)},d(r){r&&l(t)}}}function Gs(i){let t,r,a="fct_gentrification_change",n;return{c(){t=v("Berlin's chart reads "),r=k("code"),r.textContent=a,n=v(`, which is kept Berlin-only
  until Hamburg has its own sign-off for it (H3 sign-off, scope-guard condition 4). Hamburg's 13 annual editions are not charted as a time
  series anywhere on this site yet: the Hamburg trajectory sign-off (#314) asks for any long-run
  Hamburg view to be a separately labelled product, not a reuse of the 2019–2025 labels above.`)},l(o){t=b(o,"Berlin's chart reads "),r=H(o,"CODE",{"data-svelte-h":!0}),M(r)!=="svelte-1hzbn8z"&&(r.textContent=a),n=b(o,`, which is kept Berlin-only
  until Hamburg has its own sign-off for it (H3 sign-off, scope-guard condition 4). Hamburg's 13 annual editions are not charted as a time
  series anywhere on this site yet: the Hamburg trajectory sign-off (#314) asks for any long-run
  Hamburg view to be a separately labelled product, not a reuse of the 2019–2025 labels above.`)},m(o,c){_(o,t,c),_(o,r,c),_(o,n,c)},p:De,d(o){o&&(l(t),l(r),l(n))}}}function xi(i){let t,r;return t=new Pe({props:{queryID:"poi_trend",queryResult:i[7]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ti(i){let t,r;return t=new Pe({props:{queryID:"poi_mix_context",queryResult:i[8]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ci(i){var Na;let t,r,a=i[21].snapshot_year+"",n,o,c,d=i[21].area_top_category+"",p,j,S=(((Na=i[25])==null?void 0:Na.stadtteil_name)??"its Stadtteil")+"",A,U,F,O=(i[21].stadtteil_top_category??"—")+"",J,x,I,Q=(i[21].city_top_category??"—")+"",E,N;return{c(){t=k("p"),r=v("The most common kind of mapped place here in "),n=v(a),o=v(" is "),c=k("b"),p=v(d),j=v(`;
across `),A=v(S),U=v(" it's "),F=k("b"),J=v(O),x=v(`, and across
Hamburg as a whole it's `),I=k("b"),E=v(Q),N=v(".")},l(V){t=H(V,"P",{});var B=Y(t);r=b(B,"The most common kind of mapped place here in "),n=b(B,a),o=b(B," is "),c=H(B,"B",{});var Sa=Y(c);p=b(Sa,d),Sa.forEach(l),j=b(B,`;
across `),A=b(B,S),U=b(B," it's "),F=H(B,"B",{});var ja=Y(F);J=b(ja,O),ja.forEach(l),x=b(B,`, and across
Hamburg as a whole it's `),I=H(B,"B",{});var Ue=Y(I);E=b(Ue,Q),Ue.forEach(l),N=b(B,"."),B.forEach(l)},m(V,B){_(V,t,B),$(t,r),$(t,n),$(t,o),$(t,c),$(c,p),$(t,j),$(t,A),$(t,U),$(t,F),$(F,J),$(t,x),$(t,I),$(I,E),$(t,N)},p(V,B){var Sa;B[0]&2097152&&a!==(a=V[21].snapshot_year+"")&&Le(n,a),B[0]&2097152&&d!==(d=V[21].area_top_category+"")&&Le(p,d),B[0]&33554432&&S!==(S=(((Sa=V[25])==null?void 0:Sa.stadtteil_name)??"its Stadtteil")+"")&&Le(A,S),B[0]&2097152&&O!==(O=(V[21].stadtteil_top_category??"—")+"")&&Le(J,O),B[0]&2097152&&Q!==(Q=(V[21].city_top_category??"—")+"")&&Le(E,Q)},d(V){V&&l(t)}}}function Rs(i){let t,r,a="Hamburg POI map",n;return{c(){t=v(`These are OpenStreetMap-derived counts. Mapper coverage grew fastest in Hamburg's earliest years
  (the citywide coverage curve stabilizes only around ~2014–2015, see the
  `),r=k("a"),r.textContent=a,n=v(`), so early-year growth can reflect new mappers
  catching up rather than real commercial change. OSM coverage is also not spatially neutral:
  poorer or peripheral areas tend to be less thoroughly mapped (Haklay 2010), so a low count can be
  a coverage gap rather than a real absence.`),this.h()},l(o){t=b(o,`These are OpenStreetMap-derived counts. Mapper coverage grew fastest in Hamburg's earliest years
  (the citywide coverage curve stabilizes only around ~2014–2015, see the
  `),r=H(o,"A",{href:!0,"data-svelte-h":!0}),M(r)!=="svelte-1s0pubu"&&(r.textContent=a),n=b(o,`), so early-year growth can reflect new mappers
  catching up rather than real commercial change. OSM coverage is also not spatially neutral:
  poorer or peripheral areas tend to be less thoroughly mapped (Haklay 2010), so a low count can be
  a coverage gap rather than a real absence.`),this.h()},h(){w(r,"href","/gentriduck/hamburg/poi-map")},m(o,c){_(o,t,c),_(o,r,c),_(o,n,c)},p:De,d(o){o&&(l(t),l(r),l(n))}}}function qi(i){let t,r;return t=new Pe({props:{queryID:"poi_oa_radar",queryResult:i[9]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&512&&(o.queryResult=a[9]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Gi(i){let t,r;return t=new Pe({props:{queryID:"poi_oa_suppressed",queryResult:i[16]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&65536&&(o.queryResult=a[16]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ms(i){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[Os]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[4]&16&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Es(i){let t,r;return t=new hs({props:{config:i[20],data:i[9],height:"360px",downloadableData:!0,downloadableImage:!0}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&1048576&&(o.config=a[20]),n[0]&512&&(o.data=a[9]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Os(i){let t;return{c(){t=v(`No Offering Advantage value is shown for this Gebiet — too few mapped places are recorded here to
  compute a stable ratio. That means "too thinly observed to characterize", never "commercially
  dead".`)},l(r){t=b(r,`No Offering Advantage value is shown for this Gebiet — too few mapped places are recorded here to
  compute a stable ratio. That means "too thinly observed to characterize", never "commercially
  dead".`)},m(r,a){_(r,t,a)},d(r){r&&l(t)}}}function Ri(i){let t,r;return t=new ut({props:{status:"info",$$slots:{default:[Ls]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ls(i){let t;return{c(){t=v(`Some domains are left out of the chart because this Gebiet has too few mapped places overall for
  a stable ratio in the latest year (the same minimum-base rule the Hamburg POI map uses) — "too
  thinly observed", never "commercially dead".`)},l(r){t=b(r,`Some domains are left out of the chart because this Gebiet has too few mapped places overall for
  a stable ratio in the latest year (the same minimum-base rule the Hamburg POI map uses) — "too
  thinly observed", never "commercially dead".`)},m(r,a){_(r,t,a)},d(r){r&&l(t)}}}function Mi(i){let t,r;return t=new ut({props:{status:"warning",$$slots:{default:[Ds]},$$scope:{ctx:i}}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&1024|n[4]&16&&(o.$$scope={dirty:n,ctx:a}),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ds(i){let t,r,a="†",n,o,c,d=i[10].filter(Ii).map(Ai).join(", ")+"",p,j;return{c(){t=v("Domains marked "),r=k("b"),r.textContent=a,n=v(" are based on very few mapped places here (fewer than "),o=v(Lr),c=v(`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),p=v(d),j=v(".")},l(S){t=b(S,"Domains marked "),r=H(S,"B",{"data-svelte-h":!0}),M(r)!=="svelte-yahvc0"&&(r.textContent=a),n=b(S," are based on very few mapped places here (fewer than "),o=b(S,Lr),c=b(S,`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),p=b(S,d),j=b(S,".")},m(S,A){_(S,t,A),_(S,r,A),_(S,n,A),_(S,o,A),_(S,c,A),_(S,p,A),_(S,j,A)},p(S,A){A[0]&1024&&d!==(d=S[10].filter(Ii).map(Ai).join(", ")+"")&&Le(p,d)},d(S){S&&(l(t),l(r),l(n),l(o),l(c),l(p),l(j))}}}function Is(i){let t,r,a="mart_poi_dominance",n;return{c(){t=v("The underlying mart ("),r=k("code"),r.textContent=a,n=v(`) carries Hamburg rows, but the site's data
  source deliberately restricts it to Berlin, and no sign-off has yet reviewed a Hamburg public view
  of it (the dominance ethics conditions, OA-D0 domain sign-off, were checked for Berlin only).`)},l(o){t=b(o,"The underlying mart ("),r=H(o,"CODE",{"data-svelte-h":!0}),M(r)!=="svelte-1dglync"&&(r.textContent=a),n=b(o,`) carries Hamburg rows, but the site's data
  source deliberately restricts it to Berlin, and no sign-off has yet reviewed a Hamburg public view
  of it (the dominance ethics conditions, OA-D0 domain sign-off, were checked for Berlin only).`)},m(o,c){_(o,t,c),_(o,r,c),_(o,n,c)},p:De,d(o){o&&(l(t),l(r),l(n))}}}function As(i){let t;return{c(){t=v(`Hamburg's population-register figures are only published at Stadtteil and district level, not
  for single Gebiete (methodology §6, point 3). Even at Stadtteil level, the Hamburg demographics
  sign-off (#313) sets conditions that bind a future Hamburg web page of its own, which has not been
  built or reviewed yet.`)},l(r){t=b(r,`Hamburg's population-register figures are only published at Stadtteil and district level, not
  for single Gebiete (methodology §6, point 3). Even at Stadtteil level, the Hamburg demographics
  sign-off (#313) sets conditions that bind a future Hamburg web page of its own, which has not been
  built or reviewed yet.`)},m(r,a){_(r,t,a)},d(r){r&&l(t)}}}function Ei(i){let t,r;return t=new Pe({props:{queryID:"amenities_current",queryResult:i[17]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&131072&&(o.queryResult=a[17]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Oi(i){let t,r;return t=new Pe({props:{queryID:"amenities_table",queryResult:i[18]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&262144&&(o.queryResult=a[18]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Ns(i){let t;return{c(){t=v("No amenity data is available for this area yet.")},l(r){t=b(r,"No amenity data is available for this area yet.")},m(r,a){_(r,t,a)},p:De,d(r){r&&l(t)}}}function Bs(i){let t,r,a=i[17][0].snapshot_year+"",n,o;return{c(){t=v("Based on OpenStreetMap tagging as of "),r=k("b"),n=v(a),o=v(`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(c){t=b(c,"Based on OpenStreetMap tagging as of "),r=H(c,"B",{});var d=Y(r);n=b(d,a),d.forEach(l),o=b(c,`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(c,d){_(c,t,d),_(c,r,d),$(r,n),_(c,o,d)},p(c,d){d[0]&131072&&a!==(a=c[17][0].snapshot_year+"")&&Le(n,a)},d(c){c&&(l(t),l(r),l(o))}}}function Fs(i){let t,r,a,n,o,c;return t=new Or({props:{id:"indicator",title:"Infrastructure"}}),a=new Or({props:{id:"area_value",title:"This area"}}),o=new Or({props:{id:"district_value",title:"District total"}}),{c(){R(t.$$.fragment),r=y(),R(a.$$.fragment),n=y(),R(o.$$.fragment)},l(d){G(t.$$.fragment,d),r=g(d),G(a.$$.fragment,d),n=g(d),G(o.$$.fragment,d)},m(d,p){q(t,d,p),_(d,r,p),q(a,d,p),_(d,n,p),q(o,d,p),c=!0},p:De,i(d){c||(m(t.$$.fragment,d),m(a.$$.fragment,d),m(o.$$.fragment,d),c=!0)},o(d){h(t.$$.fragment,d),h(a.$$.fragment,d),h(o.$$.fragment,d),c=!1},d(d){d&&(l(r),l(n)),C(t,d),C(a,d),C(o,d)}}}function zs(i){let t,r,a="0",n,o,c="open-data",d;return{c(){t=v("These figures come from OpenStreetMap tagging, not an official registry. A "),r=k("b"),r.textContent=a,n=v(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=k("a"),o.textContent=c,d=v(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(p){t=b(p,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=H(p,"B",{"data-svelte-h":!0}),M(r)!=="svelte-12bhsds"&&(r.textContent=a),n=b(p,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=H(p,"A",{href:!0,"data-svelte-h":!0}),M(o)!=="svelte-1jijq3i"&&(o.textContent=c),d=b(p,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){w(o,"href","/gentriduck/open-data")},m(p,j){_(p,t,j),_(p,r,j),_(p,n,j),_(p,o,j),_(p,d,j)},p:De,d(p){p&&(l(t),l(r),l(n),l(o),l(d))}}}function Ps(i){let t;return{c(){t=v(`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=b(r,`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){_(r,t,a)},p:De,d(r){r&&l(t)}}}function Us(i){let t,r,a=i[17][0].gastro_poi_with_cuisine_count+"",n,o;return{c(){t=v("Cuisine is tagged for "),r=k("b"),n=v(a),o=v(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(c){t=b(c,"Cuisine is tagged for "),r=H(c,"B",{});var d=Y(r);n=b(d,a),d.forEach(l),o=b(c,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(c,d){_(c,t,d),_(c,r,d),$(r,n),_(c,o,d)},p(c,d){d[0]&131072&&a!==(a=c[17][0].gastro_poi_with_cuisine_count+"")&&Le(n,a)},d(c){c&&(l(t),l(r),l(o))}}}function Qs(i){let t,r,a=i[17][0].gastro_poi_with_cuisine_count+"",n,o,c,d="most common cuisine",p,j,S=i[17][0].dominant_cuisine+"",A,U,F=Math.round(i[17][0].dominant_cuisine_share*100)+"",O,J;return{c(){t=v("Among "),r=k("b"),n=v(a),o=v(` restaurants/cafes with cuisine
data tagged in this area, the `),c=k("b"),c.textContent=d,p=v(` is
`),j=k("b"),A=v(S),U=v(`
(`),O=v(F),J=v("% of cuisine-tagged restaurants/cafes).")},l(x){t=b(x,"Among "),r=H(x,"B",{});var I=Y(r);n=b(I,a),I.forEach(l),o=b(x,` restaurants/cafes with cuisine
data tagged in this area, the `),c=H(x,"B",{"data-svelte-h":!0}),M(c)!=="svelte-1floooe"&&(c.textContent=d),p=b(x,` is
`),j=H(x,"B",{});var Q=Y(j);A=b(Q,S),Q.forEach(l),U=b(x,`
(`),O=b(x,F),J=b(x,"% of cuisine-tagged restaurants/cafes).")},m(x,I){_(x,t,I),_(x,r,I),$(r,n),_(x,o,I),_(x,c,I),_(x,p,I),_(x,j,I),$(j,A),_(x,U,I),_(x,O,I),_(x,J,I)},p(x,I){I[0]&131072&&a!==(a=x[17][0].gastro_poi_with_cuisine_count+"")&&Le(n,a),I[0]&131072&&S!==(S=x[17][0].dominant_cuisine+"")&&Le(A,S),I[0]&131072&&F!==(F=Math.round(x[17][0].dominant_cuisine_share*100)+"")&&Le(O,F)},d(x){x&&(l(t),l(r),l(o),l(c),l(p),l(j),l(U),l(O),l(J))}}}function Js(i){let t;return{c(){t=v(`Hamburg has no land-value (Bodenrichtwert) series on this site at all. Its rent signal is
  narrower in kind than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at
  Stadtteil level, current state only), and its sign-off (#303) requires a Hamburg-specific
  methodology disclosure before any of it is shown publicly — that has not been done yet.`)},l(r){t=b(r,`Hamburg has no land-value (Bodenrichtwert) series on this site at all. Its rent signal is
  narrower in kind than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at
  Stadtteil level, current state only), and its sign-off (#303) requires a Hamburg-specific
  methodology disclosure before any of it is shown publicly — that has not been done yet.`)},m(r,a){_(r,t,a)},d(r){r&&l(t)}}}function Li(i){let t,r;return t=new Pe({props:{queryID:"minimap_areas",queryResult:i[19]}}),{c(){R(t.$$.fragment)},l(a){G(t.$$.fragment,a)},m(a,n){q(t,a,n),r=!0},p(a,n){const o={};n[0]&524288&&(o.queryResult=a[19]),t.$set(o)},i(a){r||(m(t.$$.fragment,a),r=!0)},o(a){h(t.$$.fragment,a),r=!1},d(a){C(t,a)}}}function Vs(i){let t;return{c(){t=v("linked above")},l(r){t=b(r,"linked above")},m(r,a){_(r,t,a)},p:De,d(r){r&&l(t)}}}function Ws(i){let t,r=(i[2][0].stadtteil_name??i[2][0].stadtteil_code)+"",a,n;return{c(){t=k("a"),a=v(r),this.h()},l(o){t=H(o,"A",{href:!0});var c=Y(t);a=b(c,r),c.forEach(l),this.h()},h(){w(t,"href",n="/gentriduck/hamburg/area/subarea_l1/"+i[2][0].stadtteil_code)},m(o,c){_(o,t,c),$(t,a)},p(o,c){c[0]&4&&r!==(r=(o[2][0].stadtteil_name??o[2][0].stadtteil_code)+"")&&Le(a,r),c[0]&4&&n!==(n="/gentriduck/hamburg/area/subarea_l1/"+o[2][0].stadtteil_code)&&w(t,"href",n)},d(o){o&&l(t)}}}function Ks(i){var ri;let t,r,a,n,o,c,d,p,j,S,A,U,F,O,J,x,I,Q,E,N,Na,V,B,Sa="district browse",ja,Ue,Rt="all districts",u,st,xa,Ba,Pt,X,f,Qe,ve,ft='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Fa,ia,ht,Ie,sa,be,Te,za,oa,na,Ce,Pa,we,pt,Ta,la,Ae,Ua,Ze,_a,Ut=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,ca,qe,Qa,Ge,Qt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',gt,He,Ja='<a href="#how-its-commercial-mix-has-developed">How its commercial mix has developed</a>',Va,Ne,Jt=`Shops, cafés and other businesses tend to <em class="markdown">follow</em> — not lead — social change (see
<a href="/gentriduck/methodology" class="markdown">methodology</a> for the theory). This shows how the mix of mapped places here has
evolved.`,yt,Je,Ve,We,Ca,Wa,da,ma,ke,bt='<a href="#offering-advantage-profile">Offering Advantage profile</a>',qa,ua,Vt=`<strong class="markdown">Offering Advantage (OA)</strong> compares each POI domain&#39;s share of this Gebiet&#39;s mapped places
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
this across all of Hamburg.`,fa,Ke,ha,pe,Re,Ka,Ga=i[16][0]&&Number(i[16][0].n_flagged)>0&&i[10].length>0,Ye,ot=i[10].some(Di),ea,pa,Wt=`Berlin's version of this chart also draws a district-average line. That average has not been
computed or reviewed for Hamburg, so only the citywide baseline is drawn here.`,ga,$e,vt='<a href="#within-group-dominance">Within-group dominance</a>',Ra,ya,wt,Se,Ya='<a href="#people--structure">People &amp; structure</a>',Xa,ba,Ht,aa,Za='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',va,wa,et,Ma,kt,Me,Ha,Xe,$t,Ea,St,Be,at=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,tt,ta,Kt='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',jt,rt,T,D,it='<a href="#where-this-area-sits">Where this area sits</a>',Yt,nt,Oa,Mt,Ee,tr,nr,xt,Dr="area-hierarchy reference",Hr,lr,lt,Ir='<a href="#honest-caveats">Honest caveats</a>',_r,je,ra,Et,Ar="This Gebiet's name is a label, not an official designation (#307, #352).",kr,Ot,Nr="place=neighbourhood",$r,Lt,Br="quarter",Sr,cr,jr,xr,Dt,Fr=`<strong class="markdown">A falling status means the area became <em class="markdown">less</em> deprived</strong> (its status rose) — which is also the
signature of gentrification, not automatically good news for existing residents.`,Tr,It,zr=`<strong class="markdown">Hamburg&#39;s stage is not directly equivalent to a same-named Berlin stage</strong> — Hamburg&#39;s Dynamik
window is 3 years, Berlin&#39;s 2 (<a href="/gentriduck/methodology" class="markdown">methodology §6</a>, point 1 and 4).`,Cr,At,Pr=`<strong class="markdown">The trajectory labels describe a recent ~6-year (2019–2025) window</strong>, not this area&#39;s full
13-edition history, and are a <strong class="markdown">status-only classification</strong>, never a displacement verdict (see
the disclosure above that section).`,qr,Nt,Ur=`<strong class="markdown">Offering Advantage is descriptive, not causal, and multi-signed</strong> — over- or under-representation
in a domain is a mix/specialization signal, never a standalone claim about gentrification.
Domains flagged † above rest on fewer than 5 mapped places here and should be read cautiously.`,Gr,Bt,Qr=`<strong class="markdown">Some Berlin sections are not shown for Hamburg</strong> — the written portrait, the status-over-time
chart, within-group dominance, people &amp; structure, and land value &amp; rent — each with its reason
in its own section above. See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory and
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from Berlin&#39;s.`,dr,_t,Jr='<a href="#further-reading">Further reading</a>',mr,Tt,Vr=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a> for
every Gebiet&#39;s stage at a glance, the <a href="/gentriduck/hamburg/poi-map" class="markdown">POI &amp; Offering Advantage map</a> for the
commercial-mix signal citywide, <a href="/gentriduck/hamburg/area-detail" class="markdown">browse by district</a> for other Gebiete, or
the <a href="/gentriduck/hamburg/time-series" class="markdown">time-series view</a> for how Hamburg&#39;s Gebiete have moved since 2019.`,ur,rr,fr,Ft,Xt,ct=typeof L<"u"&&(L.title||((ri=L.og)==null?void 0:ri.title))&&L.hide_title!==!0&&gs();function Ni(e,s){var z;return typeof L<"u"&&(L.title||(z=L.og)!=null&&z.title)?bs:ys}let ir=Ni()(i),dt=typeof L=="object"&&vs(),Z=i[0]&&pi(i),ee=i[15]&&gi(i),ae=i[1]&&yi(i),te=i[2]&&bi(i),re=i[3]&&vi(i),ie=i[4]&&wi(i),se=i[5]&&Hi(i),oe=i[6]&&ki(i);O=new Xi({props:{crumbs:i[27]}}),x=new Zi({props:{title:i[26]}}),Q=new rs({props:{compact:!0,eyebrow:i[28],title:i[11],lede:"Stage, social-status trajectory, commercial mix, Offering Advantage, and everyday amenities for one Hamburg statistisches Gebiet — Hamburg's finest published small-area grain. It plays the role a Planungsraum plays for Berlin on this site, but a Gebiet is typically smaller."}});function Wr(e,s){var z;return(z=e[2][0])!=null&&z.stadtteil_code?$s:ks}let hr=Wr(i),La=hr(i),ne=i[15].length===0&&$i(i),Zt=mi(i[23]),xe=[];for(let e=0;e<Zt.length;e+=1)xe[e]=Si(hi(i,Zt,e));ia=new ut({props:{status:"info",$$slots:{default:[js]},$$scope:{ctx:i}}}),Ie=new ts({props:{subject:"this Gebiet"}});const Kr=[Ts,xs],Ct=[];function Yr(e,s){return e[13]&&e[13].stage?0:1}be=Yr(i),Te=Ct[be]=Kr[be](i),oa=new or({props:{data:i[4],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),Ce=new or({props:{data:i[4],value:"dominant_stage_label",title:"Most common stage",emptySet:"warn"}}),we=new or({props:{data:i[4],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}}),Ta=new is({}),Ae=new ss({});let ge=!i[12]&&i[4].length===0&&ji(i);qe=new vr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"A status-over-time chart (Berlin's profile pages draw one, with district and city lines)",$$slots:{default:[Gs]},$$scope:{ctx:i}}});let le=i[7]&&xi(i),_e=i[8]&&Ti(i);We=new fs({props:{data:i[7],x:"snapshot_year",y:"poi_count",series:"poi_category_h",seriesOrder:i[22],title:"Mapped places by category, "+i[11]+" (largest segment first)",yAxisTitle:"Number of mapped places",emptySet:"warn"}});let Oe=i[21]&&i[21].area_top_category&&Ci(i);da=new ut({props:{status:"info",$$slots:{default:[Rs]},$$scope:{ctx:i}}});let ce=i[9]&&qi(i),de=i[16]&&Gi(i);const Xr=[Es,Ms],qt=[];function Zr(e,s){return e[10].length>0?0:1}pe=Zr(i),Re=qt[pe]=Xr[pe](i);let ye=Ga&&Ri(i),me=ot&&Mi(i);ya=new vr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Within-group dominance (is one business type crowding out the rest of its group?)",$$slots:{default:[Is]},$$scope:{ctx:i}}}),ba=new vr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"A population and composition table",$$slots:{default:[As]},$$scope:{ctx:i}}});let ue=i[17]&&Ei(i),fe=i[18]&&Oi(i);function ei(e,s){var z;return(z=e[17][0])!=null&&z.snapshot_year?Bs:Ns}let pr=ei(i),Da=pr(i);Me=new os({props:{data:i[18],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Fs]},$$scope:{ctx:i}}}),Xe=new ut({props:{status:"info",$$slots:{default:[zs]},$$scope:{ctx:i}}});function ai(e,s){var z,Gt;return(z=e[17][0])!=null&&z.snapshot_year&&e[17][0].gastro_poi_with_cuisine_count>=8&&e[17][0].dominant_cuisine_share>=.15?Qs:(Gt=e[17][0])!=null&&Gt.snapshot_year&&e[17][0].gastro_poi_with_cuisine_count>=8?Us:Ps}let gr=ai(i),Ia=gr(i);rt=new vr({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Land value and estimated rent",$$slots:{default:[Js]},$$scope:{ctx:i}}});let he=i[19]&&Li(i);Oa=new es({props:{data:i[19],geoJsonUrl:`${ns}/geo/subarea_l1_subarea_l2_drilldown.geojson`,title:i[11]??i[14]}});function ti(e,s){var z;return(z=e[2][0])!=null&&z.stadtteil_code?Ws:Vs}let yr=ti(i),Aa=yr(i);return Ft=new as({}),{c(){ct&&ct.c(),t=y(),ir.c(),r=k("meta"),a=k("meta"),dt&&dt.c(),n=wr(),o=y(),Z&&Z.c(),c=y(),ee&&ee.c(),d=y(),ae&&ae.c(),p=y(),te&&te.c(),j=y(),re&&re.c(),S=y(),ie&&ie.c(),A=y(),se&&se.c(),U=y(),oe&&oe.c(),F=y(),R(O.$$.fragment),J=y(),R(x.$$.fragment),I=y(),R(Q.$$.fragment),E=y(),N=k("p"),Na=v("Up: "),La.c(),V=v(" · "),B=k("a"),B.textContent=Sa,ja=v(" · "),Ue=k("a"),Ue.textContent=Rt,u=y(),ne&&ne.c(),st=y(),xa=k("h2"),Ba=k("a"),Pt=v(i[11]),X=v(" at a glance"),f=y();for(let e=0;e<xe.length;e+=1)xe[e].c();Qe=y(),ve=k("h2"),ve.innerHTML=ft,Fa=y(),R(ia.$$.fragment),ht=y(),R(Ie.$$.fragment),sa=y(),Te.c(),za=y(),R(oa.$$.fragment),na=y(),R(Ce.$$.fragment),Pa=y(),R(we.$$.fragment),pt=y(),R(Ta.$$.fragment),la=y(),R(Ae.$$.fragment),Ua=y(),ge&&ge.c(),Ze=y(),_a=k("p"),_a.innerHTML=Ut,ca=y(),R(qe.$$.fragment),Qa=y(),Ge=k("h2"),Ge.innerHTML=Qt,gt=y(),He=k("h3"),He.innerHTML=Ja,Va=y(),Ne=k("p"),Ne.innerHTML=Jt,yt=y(),le&&le.c(),Je=y(),_e&&_e.c(),Ve=y(),R(We.$$.fragment),Ca=y(),Oe&&Oe.c(),Wa=y(),R(da.$$.fragment),ma=y(),ke=k("h3"),ke.innerHTML=bt,qa=y(),ua=k("p"),ua.innerHTML=Vt,fa=y(),ce&&ce.c(),Ke=y(),de&&de.c(),ha=y(),Re.c(),Ka=y(),ye&&ye.c(),Ye=y(),me&&me.c(),ea=y(),pa=k("p"),pa.textContent=Wt,ga=y(),$e=k("h2"),$e.innerHTML=vt,Ra=y(),R(ya.$$.fragment),wt=y(),Se=k("h2"),Se.innerHTML=Ya,Xa=y(),R(ba.$$.fragment),Ht=y(),aa=k("h2"),aa.innerHTML=Za,va=y(),ue&&ue.c(),wa=y(),fe&&fe.c(),et=y(),Ma=k("p"),Da.c(),kt=y(),R(Me.$$.fragment),Ha=y(),R(Xe.$$.fragment),$t=y(),Ea=k("p"),Ia.c(),St=y(),Be=k("p"),Be.textContent=at,tt=y(),ta=k("h2"),ta.innerHTML=Kt,jt=y(),R(rt.$$.fragment),T=y(),D=k("h2"),D.innerHTML=it,Yt=y(),he&&he.c(),nt=y(),R(Oa.$$.fragment),Mt=y(),Ee=k("p"),tr=v(`This is Hamburg's finest published small-area grain (statistisches Gebiet) — there is no further
level to drill into. Its parent Stadtteil is `),Aa.c(),nr=v(`
(see "Up:" above), resolved by a spatial crosswalk (each Gebiet assigned to the Stadtteil that
contains it; OA-D1b, #240) — see the `),xt=k("a"),xt.textContent=Dr,Hr=v("."),lr=y(),lt=k("h2"),lt.innerHTML=Ir,_r=y(),je=k("ul"),ra=k("li"),Et=k("strong"),Et.textContent=Ar,kr=v(` Hamburg's own
statistisches-Gebiet source has no name field, so the name above is this Gebiet's Stadtteil
plus either an OpenStreetMap `),Ot=k("code"),Ot.textContent=Nr,$r=v("/"),Lt=k("code"),Lt.textContent=Br,Sr=v(` name whose point lies inside the
Gebiet (`),cr=v(i[24]),jr=v(`) or, where there is none, the Gebiet's code. An OSM name marks a
point inside this Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet.`),xr=y(),Dt=k("li"),Dt.innerHTML=Fr,Tr=y(),It=k("li"),It.innerHTML=zr,Cr=y(),At=k("li"),At.innerHTML=Pr,qr=y(),Nt=k("li"),Nt.innerHTML=Ur,Gr=y(),Bt=k("li"),Bt.innerHTML=Qr,dr=y(),_t=k("h2"),_t.innerHTML=Jr,mr=y(),Tt=k("p"),Tt.innerHTML=Vr,ur=y(),rr=k("hr"),fr=y(),R(Ft.$$.fragment),this.h()},l(e){ct&&ct.l(e),t=g(e);const s=zi("svelte-2igo1p",document.head);ir.l(s),r=H(s,"META",{name:!0,content:!0}),a=H(s,"META",{name:!0,content:!0}),dt&&dt.l(s),n=wr(),s.forEach(l),o=g(e),Z&&Z.l(e),c=g(e),ee&&ee.l(e),d=g(e),ae&&ae.l(e),p=g(e),te&&te.l(e),j=g(e),re&&re.l(e),S=g(e),ie&&ie.l(e),A=g(e),se&&se.l(e),U=g(e),oe&&oe.l(e),F=g(e),G(O.$$.fragment,e),J=g(e),G(x.$$.fragment,e),I=g(e),G(Q.$$.fragment,e),E=g(e),N=H(e,"P",{});var z=Y(N);Na=b(z,"Up: "),La.l(z),V=b(z," · "),B=H(z,"A",{href:!0,"data-svelte-h":!0}),M(B)!=="svelte-1wr74xi"&&(B.textContent=Sa),ja=b(z," · "),Ue=H(z,"A",{href:!0,"data-svelte-h":!0}),M(Ue)!=="svelte-46ercb"&&(Ue.textContent=Rt),z.forEach(l),u=g(e),ne&&ne.l(e),st=g(e),xa=H(e,"H2",{class:!0,id:!0});var Gt=Y(xa);Ba=H(Gt,"A",{href:!0});var zt=Y(Ba);Pt=b(zt,i[11]),X=b(zt," at a glance"),zt.forEach(l),Gt.forEach(l),f=g(e);for(let ar=0;ar<xe.length;ar+=1)xe[ar].l(e);Qe=g(e),ve=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(ve)!=="svelte-14f17uo"&&(ve.innerHTML=ft),Fa=g(e),G(ia.$$.fragment,e),ht=g(e),G(Ie.$$.fragment,e),sa=g(e),Te.l(e),za=g(e),G(oa.$$.fragment,e),na=g(e),G(Ce.$$.fragment,e),Pa=g(e),G(we.$$.fragment,e),pt=g(e),G(Ta.$$.fragment,e),la=g(e),G(Ae.$$.fragment,e),Ua=g(e),ge&&ge.l(e),Ze=g(e),_a=H(e,"P",{class:!0,"data-svelte-h":!0}),M(_a)!=="svelte-dvqlbe"&&(_a.innerHTML=Ut),ca=g(e),G(qe.$$.fragment,e),Qa=g(e),Ge=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(Ge)!=="svelte-1i9w9pn"&&(Ge.innerHTML=Qt),gt=g(e),He=H(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),M(He)!=="svelte-yatnem"&&(He.innerHTML=Ja),Va=g(e),Ne=H(e,"P",{class:!0,"data-svelte-h":!0}),M(Ne)!=="svelte-1s6me3w"&&(Ne.innerHTML=Jt),yt=g(e),le&&le.l(e),Je=g(e),_e&&_e.l(e),Ve=g(e),G(We.$$.fragment,e),Ca=g(e),Oe&&Oe.l(e),Wa=g(e),G(da.$$.fragment,e),ma=g(e),ke=H(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),M(ke)!=="svelte-1uvjo0a"&&(ke.innerHTML=bt),qa=g(e),ua=H(e,"P",{class:!0,"data-svelte-h":!0}),M(ua)!=="svelte-uq7p2u"&&(ua.innerHTML=Vt),fa=g(e),ce&&ce.l(e),Ke=g(e),de&&de.l(e),ha=g(e),Re.l(e),Ka=g(e),ye&&ye.l(e),Ye=g(e),me&&me.l(e),ea=g(e),pa=H(e,"P",{class:!0,"data-svelte-h":!0}),M(pa)!=="svelte-1ruaof5"&&(pa.textContent=Wt),ga=g(e),$e=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M($e)!=="svelte-4kb45v"&&($e.innerHTML=vt),Ra=g(e),G(ya.$$.fragment,e),wt=g(e),Se=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(Se)!=="svelte-1mdzqzc"&&(Se.innerHTML=Ya),Xa=g(e),G(ba.$$.fragment,e),Ht=g(e),aa=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(aa)!=="svelte-12k6lqd"&&(aa.innerHTML=Za),va=g(e),ue&&ue.l(e),wa=g(e),fe&&fe.l(e),et=g(e),Ma=H(e,"P",{});var sr=Y(Ma);Da.l(sr),sr.forEach(l),kt=g(e),G(Me.$$.fragment,e),Ha=g(e),G(Xe.$$.fragment,e),$t=g(e),Ea=H(e,"P",{});var er=Y(Ea);Ia.l(er),er.forEach(l),St=g(e),Be=H(e,"P",{"data-svelte-h":!0}),M(Be)!=="svelte-ja6pm6"&&(Be.textContent=at),tt=g(e),ta=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(ta)!=="svelte-13a10dj"&&(ta.innerHTML=Kt),jt=g(e),G(rt.$$.fragment,e),T=g(e),D=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(D)!=="svelte-60cjj9"&&(D.innerHTML=it),Yt=g(e),he&&he.l(e),nt=g(e),G(Oa.$$.fragment,e),Mt=g(e),Ee=H(e,"P",{class:!0});var mt=Y(Ee);tr=b(mt,`This is Hamburg's finest published small-area grain (statistisches Gebiet) — there is no further
level to drill into. Its parent Stadtteil is `),Aa.l(mt),nr=b(mt,`
(see "Up:" above), resolved by a spatial crosswalk (each Gebiet assigned to the Stadtteil that
contains it; OA-D1b, #240) — see the `),xt=H(mt,"A",{href:!0,class:!0,"data-svelte-h":!0}),M(xt)!=="svelte-1xy3j6n"&&(xt.textContent=Dr),Hr=b(mt,"."),mt.forEach(l),lr=g(e),lt=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(lt)!=="svelte-ad0syq"&&(lt.innerHTML=Ir),_r=g(e),je=H(e,"UL",{class:!0});var Fe=Y(je);ra=H(Fe,"LI",{class:!0});var ka=Y(ra);Et=H(ka,"STRONG",{class:!0,"data-svelte-h":!0}),M(Et)!=="svelte-1fqtrmt"&&(Et.textContent=Ar),kr=b(ka,` Hamburg's own
statistisches-Gebiet source has no name field, so the name above is this Gebiet's Stadtteil
plus either an OpenStreetMap `),Ot=H(ka,"CODE",{class:!0,"data-svelte-h":!0}),M(Ot)!=="svelte-15m84of"&&(Ot.textContent=Nr),$r=b(ka,"/"),Lt=H(ka,"CODE",{class:!0,"data-svelte-h":!0}),M(Lt)!=="svelte-130gzfg"&&(Lt.textContent=Br),Sr=b(ka,` name whose point lies inside the
Gebiet (`),cr=b(ka,i[24]),jr=b(ka,`) or, where there is none, the Gebiet's code. An OSM name marks a
point inside this Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet.`),ka.forEach(l),xr=g(Fe),Dt=H(Fe,"LI",{class:!0,"data-svelte-h":!0}),M(Dt)!=="svelte-88jax4"&&(Dt.innerHTML=Fr),Tr=g(Fe),It=H(Fe,"LI",{class:!0,"data-svelte-h":!0}),M(It)!=="svelte-gt4vt1"&&(It.innerHTML=zr),Cr=g(Fe),At=H(Fe,"LI",{class:!0,"data-svelte-h":!0}),M(At)!=="svelte-aln53w"&&(At.innerHTML=Pr),qr=g(Fe),Nt=H(Fe,"LI",{class:!0,"data-svelte-h":!0}),M(Nt)!=="svelte-17ztge1"&&(Nt.innerHTML=Ur),Gr=g(Fe),Bt=H(Fe,"LI",{class:!0,"data-svelte-h":!0}),M(Bt)!=="svelte-190cwc0"&&(Bt.innerHTML=Qr),Fe.forEach(l),dr=g(e),_t=H(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(_t)!=="svelte-oimjns"&&(_t.innerHTML=Jr),mr=g(e),Tt=H(e,"P",{class:!0,"data-svelte-h":!0}),M(Tt)!=="svelte-perq8p"&&(Tt.innerHTML=Vr),ur=g(e),rr=H(e,"HR",{class:!0}),fr=g(e),G(Ft.$$.fragment,e),this.h()},h(){w(r,"name","twitter:card"),w(r,"content","summary_large_image"),w(a,"name","twitter:site"),w(a,"content","@evidence_dev"),w(B,"href","/gentriduck/hamburg/area-detail"),w(Ue,"href","/gentriduck/hamburg/area/district"),w(Ba,"href","#namelabel-at-a-glance"),w(xa,"class","markdown"),w(xa,"id","namelabel-at-a-glance"),w(ve,"class","markdown"),w(ve,"id","social-status--trajectory"),w(_a,"class","markdown"),w(Ge,"class","markdown"),w(Ge,"id","commercial-mix--offering-advantage"),w(He,"class","markdown"),w(He,"id","how-its-commercial-mix-has-developed"),w(Ne,"class","markdown"),w(ke,"class","markdown"),w(ke,"id","offering-advantage-profile"),w(ua,"class","markdown"),w(pa,"class","markdown"),w($e,"class","markdown"),w($e,"id","within-group-dominance"),w(Se,"class","markdown"),w(Se,"id","people--structure"),w(aa,"class","markdown"),w(aa,"id","amenities--everyday-infrastructure"),w(ta,"class","markdown"),w(ta,"id","land-value--estimated-rent"),w(D,"class","markdown"),w(D,"id","where-this-area-sits"),w(xt,"href","/gentriduck/reference/area-hierarchy"),w(xt,"class","markdown"),w(Ee,"class","markdown"),w(lt,"class","markdown"),w(lt,"id","honest-caveats"),w(Et,"class","markdown"),w(Ot,"class","markdown"),w(Lt,"class","markdown"),w(ra,"class","markdown"),w(Dt,"class","markdown"),w(It,"class","markdown"),w(At,"class","markdown"),w(Nt,"class","markdown"),w(Bt,"class","markdown"),w(je,"class","markdown"),w(_t,"class","markdown"),w(_t,"id","further-reading"),w(Tt,"class","markdown"),w(rr,"class","markdown")},m(e,s){ct&&ct.m(e,s),_(e,t,s),ir.m(document.head,null),$(document.head,r),$(document.head,a),dt&&dt.m(document.head,null),$(document.head,n),_(e,o,s),Z&&Z.m(e,s),_(e,c,s),ee&&ee.m(e,s),_(e,d,s),ae&&ae.m(e,s),_(e,p,s),te&&te.m(e,s),_(e,j,s),re&&re.m(e,s),_(e,S,s),ie&&ie.m(e,s),_(e,A,s),se&&se.m(e,s),_(e,U,s),oe&&oe.m(e,s),_(e,F,s),q(O,e,s),_(e,J,s),q(x,e,s),_(e,I,s),q(Q,e,s),_(e,E,s),_(e,N,s),$(N,Na),La.m(N,null),$(N,V),$(N,B),$(N,ja),$(N,Ue),_(e,u,s),ne&&ne.m(e,s),_(e,st,s),_(e,xa,s),$(xa,Ba),$(Ba,Pt),$(Ba,X),_(e,f,s);for(let z=0;z<xe.length;z+=1)xe[z]&&xe[z].m(e,s);_(e,Qe,s),_(e,ve,s),_(e,Fa,s),q(ia,e,s),_(e,ht,s),q(Ie,e,s),_(e,sa,s),Ct[be].m(e,s),_(e,za,s),q(oa,e,s),_(e,na,s),q(Ce,e,s),_(e,Pa,s),q(we,e,s),_(e,pt,s),q(Ta,e,s),_(e,la,s),q(Ae,e,s),_(e,Ua,s),ge&&ge.m(e,s),_(e,Ze,s),_(e,_a,s),_(e,ca,s),q(qe,e,s),_(e,Qa,s),_(e,Ge,s),_(e,gt,s),_(e,He,s),_(e,Va,s),_(e,Ne,s),_(e,yt,s),le&&le.m(e,s),_(e,Je,s),_e&&_e.m(e,s),_(e,Ve,s),q(We,e,s),_(e,Ca,s),Oe&&Oe.m(e,s),_(e,Wa,s),q(da,e,s),_(e,ma,s),_(e,ke,s),_(e,qa,s),_(e,ua,s),_(e,fa,s),ce&&ce.m(e,s),_(e,Ke,s),de&&de.m(e,s),_(e,ha,s),qt[pe].m(e,s),_(e,Ka,s),ye&&ye.m(e,s),_(e,Ye,s),me&&me.m(e,s),_(e,ea,s),_(e,pa,s),_(e,ga,s),_(e,$e,s),_(e,Ra,s),q(ya,e,s),_(e,wt,s),_(e,Se,s),_(e,Xa,s),q(ba,e,s),_(e,Ht,s),_(e,aa,s),_(e,va,s),ue&&ue.m(e,s),_(e,wa,s),fe&&fe.m(e,s),_(e,et,s),_(e,Ma,s),Da.m(Ma,null),_(e,kt,s),q(Me,e,s),_(e,Ha,s),q(Xe,e,s),_(e,$t,s),_(e,Ea,s),Ia.m(Ea,null),_(e,St,s),_(e,Be,s),_(e,tt,s),_(e,ta,s),_(e,jt,s),q(rt,e,s),_(e,T,s),_(e,D,s),_(e,Yt,s),he&&he.m(e,s),_(e,nt,s),q(Oa,e,s),_(e,Mt,s),_(e,Ee,s),$(Ee,tr),Aa.m(Ee,null),$(Ee,nr),$(Ee,xt),$(Ee,Hr),_(e,lr,s),_(e,lt,s),_(e,_r,s),_(e,je,s),$(je,ra),$(ra,Et),$(ra,kr),$(ra,Ot),$(ra,$r),$(ra,Lt),$(ra,Sr),$(ra,cr),$(ra,jr),$(je,xr),$(je,Dt),$(je,Tr),$(je,It),$(je,Cr),$(je,At),$(je,qr),$(je,Nt),$(je,Gr),$(je,Bt),_(e,dr,s),_(e,_t,s),_(e,mr,s),_(e,Tt,s),_(e,ur,s),_(e,rr,s),_(e,fr,s),q(Ft,e,s),Xt=!0},p(e,s){var _i;typeof L<"u"&&(L.title||(_i=L.og)!=null&&_i.title)&&L.hide_title!==!0&&ct.p(e,s),ir.p(e,s),typeof L=="object"&&dt.p(e,s),e[0]?Z?(Z.p(e,s),s[0]&1&&m(Z,1)):(Z=pi(e),Z.c(),m(Z,1),Z.m(c.parentNode,c)):Z&&(K(),h(Z,1,1,()=>{Z=null}),W()),e[15]?ee?(ee.p(e,s),s[0]&32768&&m(ee,1)):(ee=gi(e),ee.c(),m(ee,1),ee.m(d.parentNode,d)):ee&&(K(),h(ee,1,1,()=>{ee=null}),W()),e[1]?ae?(ae.p(e,s),s[0]&2&&m(ae,1)):(ae=yi(e),ae.c(),m(ae,1),ae.m(p.parentNode,p)):ae&&(K(),h(ae,1,1,()=>{ae=null}),W()),e[2]?te?(te.p(e,s),s[0]&4&&m(te,1)):(te=bi(e),te.c(),m(te,1),te.m(j.parentNode,j)):te&&(K(),h(te,1,1,()=>{te=null}),W()),e[3]?re?(re.p(e,s),s[0]&8&&m(re,1)):(re=vi(e),re.c(),m(re,1),re.m(S.parentNode,S)):re&&(K(),h(re,1,1,()=>{re=null}),W()),e[4]?ie?(ie.p(e,s),s[0]&16&&m(ie,1)):(ie=wi(e),ie.c(),m(ie,1),ie.m(A.parentNode,A)):ie&&(K(),h(ie,1,1,()=>{ie=null}),W()),e[5]?se?(se.p(e,s),s[0]&32&&m(se,1)):(se=Hi(e),se.c(),m(se,1),se.m(U.parentNode,U)):se&&(K(),h(se,1,1,()=>{se=null}),W()),e[6]?oe?(oe.p(e,s),s[0]&64&&m(oe,1)):(oe=ki(e),oe.c(),m(oe,1),oe.m(F.parentNode,F)):oe&&(K(),h(oe,1,1,()=>{oe=null}),W());const z={};s[0]&134217728&&(z.crumbs=e[27]),O.$set(z);const Gt={};s[0]&67108864&&(Gt.title=e[26]),x.$set(Gt);const zt={};if(s[0]&268435456&&(zt.eyebrow=e[28]),s[0]&2048&&(zt.title=e[11]),Q.$set(zt),hr===(hr=Wr(e))&&La?La.p(e,s):(La.d(1),La=hr(e),La&&(La.c(),La.m(N,V))),e[15].length===0?ne?(ne.p(e,s),s[0]&32768&&m(ne,1)):(ne=$i(e),ne.c(),m(ne,1),ne.m(st.parentNode,st)):ne&&(K(),h(ne,1,1,()=>{ne=null}),W()),(!Xt||s[0]&2048)&&Le(Pt,e[11]),s[0]&8388608){Zt=mi(e[23]);let $a;for($a=0;$a<Zt.length;$a+=1){const ci=hi(e,Zt,$a);xe[$a]?xe[$a].p(ci,s):(xe[$a]=Si(ci),xe[$a].c(),xe[$a].m(Qe.parentNode,Qe))}for(;$a<xe.length;$a+=1)xe[$a].d(1);xe.length=Zt.length}const sr={};s[4]&16&&(sr.$$scope={dirty:s,ctx:e}),ia.$set(sr);let er=be;be=Yr(e),be===er?Ct[be].p(e,s):(K(),h(Ct[er],1,1,()=>{Ct[er]=null}),W(),Te=Ct[be],Te?Te.p(e,s):(Te=Ct[be]=Kr[be](e),Te.c()),m(Te,1),Te.m(za.parentNode,za));const mt={};s[0]&16&&(mt.data=e[4]),oa.$set(mt);const Fe={};s[0]&16&&(Fe.data=e[4]),Ce.$set(Fe);const ka={};s[0]&16&&(ka.data=e[4]),we.$set(ka),!e[12]&&e[4].length===0?ge?s[0]&4112&&m(ge,1):(ge=ji(e),ge.c(),m(ge,1),ge.m(Ze.parentNode,Ze)):ge&&(K(),h(ge,1,1,()=>{ge=null}),W());const ar={};s[4]&16&&(ar.$$scope={dirty:s,ctx:e}),qe.$set(ar),e[7]?le?(le.p(e,s),s[0]&128&&m(le,1)):(le=xi(e),le.c(),m(le,1),le.m(Je.parentNode,Je)):le&&(K(),h(le,1,1,()=>{le=null}),W()),e[8]?_e?(_e.p(e,s),s[0]&256&&m(_e,1)):(_e=Ti(e),_e.c(),m(_e,1),_e.m(Ve.parentNode,Ve)):_e&&(K(),h(_e,1,1,()=>{_e=null}),W());const br={};s[0]&128&&(br.data=e[7]),s[0]&4194304&&(br.seriesOrder=e[22]),s[0]&2048&&(br.title="Mapped places by category, "+e[11]+" (largest segment first)"),We.$set(br),e[21]&&e[21].area_top_category?Oe?Oe.p(e,s):(Oe=Ci(e),Oe.c(),Oe.m(Wa.parentNode,Wa)):Oe&&(Oe.d(1),Oe=null);const ii={};s[4]&16&&(ii.$$scope={dirty:s,ctx:e}),da.$set(ii),e[9]?ce?(ce.p(e,s),s[0]&512&&m(ce,1)):(ce=qi(e),ce.c(),m(ce,1),ce.m(Ke.parentNode,Ke)):ce&&(K(),h(ce,1,1,()=>{ce=null}),W()),e[16]?de?(de.p(e,s),s[0]&65536&&m(de,1)):(de=Gi(e),de.c(),m(de,1),de.m(ha.parentNode,ha)):de&&(K(),h(de,1,1,()=>{de=null}),W());let Rr=pe;pe=Zr(e),pe===Rr?qt[pe].p(e,s):(K(),h(qt[Rr],1,1,()=>{qt[Rr]=null}),W(),Re=qt[pe],Re?Re.p(e,s):(Re=qt[pe]=Xr[pe](e),Re.c()),m(Re,1),Re.m(Ka.parentNode,Ka)),s[0]&66560&&(Ga=e[16][0]&&Number(e[16][0].n_flagged)>0&&e[10].length>0),Ga?ye?s[0]&66560&&m(ye,1):(ye=Ri(e),ye.c(),m(ye,1),ye.m(Ye.parentNode,Ye)):ye&&(K(),h(ye,1,1,()=>{ye=null}),W()),s[0]&1024&&(ot=e[10].some(Di)),ot?me?(me.p(e,s),s[0]&1024&&m(me,1)):(me=Mi(e),me.c(),m(me,1),me.m(ea.parentNode,ea)):me&&(K(),h(me,1,1,()=>{me=null}),W());const si={};s[4]&16&&(si.$$scope={dirty:s,ctx:e}),ya.$set(si);const oi={};s[4]&16&&(oi.$$scope={dirty:s,ctx:e}),ba.$set(oi),e[17]?ue?(ue.p(e,s),s[0]&131072&&m(ue,1)):(ue=Ei(e),ue.c(),m(ue,1),ue.m(wa.parentNode,wa)):ue&&(K(),h(ue,1,1,()=>{ue=null}),W()),e[18]?fe?(fe.p(e,s),s[0]&262144&&m(fe,1)):(fe=Oi(e),fe.c(),m(fe,1),fe.m(et.parentNode,et)):fe&&(K(),h(fe,1,1,()=>{fe=null}),W()),pr===(pr=ei(e))&&Da?Da.p(e,s):(Da.d(1),Da=pr(e),Da&&(Da.c(),Da.m(Ma,null)));const Mr={};s[0]&262144&&(Mr.data=e[18]),s[4]&16&&(Mr.$$scope={dirty:s,ctx:e}),Me.$set(Mr);const ni={};s[4]&16&&(ni.$$scope={dirty:s,ctx:e}),Xe.$set(ni),gr===(gr=ai(e))&&Ia?Ia.p(e,s):(Ia.d(1),Ia=gr(e),Ia&&(Ia.c(),Ia.m(Ea,null)));const li={};s[4]&16&&(li.$$scope={dirty:s,ctx:e}),rt.$set(li),e[19]?he?(he.p(e,s),s[0]&524288&&m(he,1)):(he=Li(e),he.c(),m(he,1),he.m(nt.parentNode,nt)):he&&(K(),h(he,1,1,()=>{he=null}),W());const Er={};s[0]&524288&&(Er.data=e[19]),s[0]&18432&&(Er.title=e[11]??e[14]),Oa.$set(Er),yr===(yr=ti(e))&&Aa?Aa.p(e,s):(Aa.d(1),Aa=yr(e),Aa&&(Aa.c(),Aa.m(Ee,nr))),(!Xt||s[0]&16777216)&&Le(cr,e[24])},i(e){Xt||(m(Z),m(ee),m(ae),m(te),m(re),m(ie),m(se),m(oe),m(O.$$.fragment,e),m(x.$$.fragment,e),m(Q.$$.fragment,e),m(ne),m(ia.$$.fragment,e),m(Ie.$$.fragment,e),m(Te),m(oa.$$.fragment,e),m(Ce.$$.fragment,e),m(we.$$.fragment,e),m(Ta.$$.fragment,e),m(Ae.$$.fragment,e),m(ge),m(qe.$$.fragment,e),m(le),m(_e),m(We.$$.fragment,e),m(da.$$.fragment,e),m(ce),m(de),m(Re),m(ye),m(me),m(ya.$$.fragment,e),m(ba.$$.fragment,e),m(ue),m(fe),m(Me.$$.fragment,e),m(Xe.$$.fragment,e),m(rt.$$.fragment,e),m(he),m(Oa.$$.fragment,e),m(Ft.$$.fragment,e),Xt=!0)},o(e){h(Z),h(ee),h(ae),h(te),h(re),h(ie),h(se),h(oe),h(O.$$.fragment,e),h(x.$$.fragment,e),h(Q.$$.fragment,e),h(ne),h(ia.$$.fragment,e),h(Ie.$$.fragment,e),h(Te),h(oa.$$.fragment,e),h(Ce.$$.fragment,e),h(we.$$.fragment,e),h(Ta.$$.fragment,e),h(Ae.$$.fragment,e),h(ge),h(qe.$$.fragment,e),h(le),h(_e),h(We.$$.fragment,e),h(da.$$.fragment,e),h(ce),h(de),h(Re),h(ye),h(me),h(ya.$$.fragment,e),h(ba.$$.fragment,e),h(ue),h(fe),h(Me.$$.fragment,e),h(Xe.$$.fragment,e),h(rt.$$.fragment,e),h(he),h(Oa.$$.fragment,e),h(Ft.$$.fragment,e),Xt=!1},d(e){e&&(l(t),l(o),l(c),l(d),l(p),l(j),l(S),l(A),l(U),l(F),l(J),l(I),l(E),l(N),l(u),l(st),l(xa),l(f),l(Qe),l(ve),l(Fa),l(ht),l(sa),l(za),l(na),l(Pa),l(pt),l(la),l(Ua),l(Ze),l(_a),l(ca),l(Qa),l(Ge),l(gt),l(He),l(Va),l(Ne),l(yt),l(Je),l(Ve),l(Ca),l(Wa),l(ma),l(ke),l(qa),l(ua),l(fa),l(Ke),l(ha),l(Ka),l(Ye),l(ea),l(pa),l(ga),l($e),l(Ra),l(wt),l(Se),l(Xa),l(Ht),l(aa),l(va),l(wa),l(et),l(Ma),l(kt),l(Ha),l($t),l(Ea),l(St),l(Be),l(tt),l(ta),l(jt),l(T),l(D),l(Yt),l(nt),l(Mt),l(Ee),l(lr),l(lt),l(_r),l(je),l(dr),l(_t),l(mr),l(Tt),l(ur),l(rr),l(fr)),ct&&ct.d(e),ir.d(e),l(r),l(a),dt&&dt.d(e),l(n),Z&&Z.d(e),ee&&ee.d(e),ae&&ae.d(e),te&&te.d(e),re&&re.d(e),ie&&ie.d(e),se&&se.d(e),oe&&oe.d(e),C(O,e),C(x,e),C(Q,e),La.d(),ne&&ne.d(e),Fi(xe,e),C(ia,e),C(Ie,e),Ct[be].d(e),C(oa,e),C(Ce,e),C(we,e),C(Ta,e),C(Ae,e),ge&&ge.d(e),C(qe,e),le&&le.d(e),_e&&_e.d(e),C(We,e),Oe&&Oe.d(e),C(da,e),ce&&ce.d(e),de&&de.d(e),qt[pe].d(e),ye&&ye.d(e),me&&me.d(e),C(ya,e),C(ba,e),ue&&ue.d(e),fe&&fe.d(e),Da.d(),C(Me,e),C(Xe,e),Ia.d(),C(rt,e),he&&he.d(e),C(Oa,e),Aa.d(),C(Ft,e)}}}const L={},Lr=5,Di=i=>i.lowBase,Ii=i=>i.lowBase,Ai=i=>`${i.domain} (${i.poiCount??0})`;function Ys(i,t,r){let a,n,o,c,d,p,j,S,A,U,F,O,J,x,I,Q,E,N,Na,V,B,Sa,ja,Ue;di(i,us,T=>r(100,ja=T)),di(i,fi,T=>r(105,Ue=T));let{data:Rt}=t,{data:u={},customFormattingSettings:st,__db:xa,inputs:Ba}=Rt;Pi(fi,Ue="89d6a2c7209c2d907e58ae263a74d1a5",Ue);let Pt=_s(ls(Ba));Ui(Pt.subscribe(T=>Ba=T)),Qi(ms,{getCustomFormats:()=>st.customFormats||[]});const X=(T,D)=>ps(xa.query,T,{query_name:D});cs(X);let f=ja.params;Ji(()=>!0);let Qe={initialData:void 0,initialError:void 0},ve=P`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`,ft=`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`;u.code_info_data&&(u.code_info_data instanceof Error?Qe.initialError=u.code_info_data:Qe.initialData=u.code_info_data,u.code_info_columns&&(Qe.knownColumns=u.code_info_columns));let Fa,ia=!1;const ht=ze.createReactive({callback:T=>{r(0,Fa=T)},execFn:X},{id:"code_info",...Qe});ht(ft,{noResolve:ve,...Qe}),globalThis[Symbol.for("code_info")]={get value(){return Fa}};let Ie={initialData:void 0,initialError:void 0},sa=P`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`,be=`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`;u.area_exists_data&&(u.area_exists_data instanceof Error?Ie.initialError=u.area_exists_data:Ie.initialData=u.area_exists_data,u.area_exists_columns&&(Ie.knownColumns=u.area_exists_columns));let Te,za=!1;const oa=ze.createReactive({callback:T=>{r(15,Te=T)},execFn:X},{id:"area_exists",...Ie});oa(be,{noResolve:sa,...Ie}),globalThis[Symbol.for("area_exists")]={get value(){return Te}};let na={initialData:void 0,initialError:void 0},Ce=P`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
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
limit 1`,Pa=`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
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
limit 1`;u.name_info_data&&(u.name_info_data instanceof Error?na.initialError=u.name_info_data:na.initialData=u.name_info_data,u.name_info_columns&&(na.knownColumns=u.name_info_columns));let we,pt=!1;const Ta=ze.createReactive({callback:T=>{r(1,we=T)},execFn:X},{id:"name_info",...na});Ta(Pa,{noResolve:Ce,...na}),globalThis[Symbol.for("name_info")]={get value(){return we}};let la={initialData:void 0,initialError:void 0},Ae=P`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
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
limit 1`,Ua=`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
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
limit 1`;u.parent_info_data&&(u.parent_info_data instanceof Error?la.initialError=u.parent_info_data:la.initialData=u.parent_info_data,u.parent_info_columns&&(la.knownColumns=u.parent_info_columns));let Ze,_a=!1;const Ut=ze.createReactive({callback:T=>{r(2,Ze=T)},execFn:X},{id:"parent_info",...la});Ut(Ua,{noResolve:Ae,...la}),globalThis[Symbol.for("parent_info")]={get value(){return Ze}};let ca={initialData:void 0,initialError:void 0},qe=P`-- #353: this Gebiet's current stage and status trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived. #358: stage_label / status_trend are the dbt display columns.
select
    period_yyyymm,
    status_class as stage,
    status_trend,
    status_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`,Qa=`-- #353: this Gebiet's current stage and status trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived. #358: stage_label / status_trend are the dbt display columns.
select
    period_yyyymm,
    status_class as stage,
    status_trend,
    status_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`;u.current_stage_data&&(u.current_stage_data instanceof Error?ca.initialError=u.current_stage_data:ca.initialData=u.current_stage_data,u.current_stage_columns&&(ca.knownColumns=u.current_stage_columns));let Ge,Qt=!1;const gt=ze.createReactive({callback:T=>{r(3,Ge=T)},execFn:X},{id:"current_stage",...ca});gt(Qa,{noResolve:qe,...ca}),globalThis[Symbol.for("current_stage")]={get value(){return Ge}};let He={initialData:void 0,initialError:void 0},Ja=P`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
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
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`,Va=`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
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
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`;u.trajectory_summary_data&&(u.trajectory_summary_data instanceof Error?He.initialError=u.trajectory_summary_data:He.initialData=u.trajectory_summary_data,u.trajectory_summary_columns&&(He.knownColumns=u.trajectory_summary_columns));let Ne,Jt=!1;const yt=ze.createReactive({callback:T=>{r(4,Ne=T)},execFn:X},{id:"trajectory_summary",...He});yt(Va,{noResolve:Ja,...He}),globalThis[Symbol.for("trajectory_summary")]={get value(){return Ne}};let Je={initialData:void 0,initialError:void 0},Ve=P`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
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
group by all`,We=`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
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
group by all`;u.sibling_trajectory_mix_data&&(u.sibling_trajectory_mix_data instanceof Error?Je.initialError=u.sibling_trajectory_mix_data:Je.initialData=u.sibling_trajectory_mix_data,u.sibling_trajectory_mix_columns&&(Je.knownColumns=u.sibling_trajectory_mix_columns));let Ca,Wa=!1;const da=ze.createReactive({callback:T=>{r(5,Ca=T)},execFn:X},{id:"sibling_trajectory_mix",...Je});da(We,{noResolve:Ve,...Je}),globalThis[Symbol.for("sibling_trajectory_mix")]={get value(){return Ca}};let ma={initialData:void 0,initialError:void 0},ke=P`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`,bt=`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`;u.gebiet_label_stats_data&&(u.gebiet_label_stats_data instanceof Error?ma.initialError=u.gebiet_label_stats_data:ma.initialData=u.gebiet_label_stats_data,u.gebiet_label_stats_columns&&(ma.knownColumns=u.gebiet_label_stats_columns));let qa,ua=!1;const Vt=ze.createReactive({callback:T=>{r(6,qa=T)},execFn:X},{id:"gebiet_label_stats",...ma});Vt(bt,{noResolve:ke,...ma}),globalThis[Symbol.for("gebiet_label_stats")]={get value(){return qa}};let fa={initialData:void 0,initialError:void 0},Ke=P`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`,ha=`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`;u.poi_trend_data&&(u.poi_trend_data instanceof Error?fa.initialError=u.poi_trend_data:fa.initialData=u.poi_trend_data,u.poi_trend_columns&&(fa.knownColumns=u.poi_trend_columns));let pe,Re=!1;const Ka=ze.createReactive({callback:T=>{r(7,pe=T)},execFn:X},{id:"poi_trend",...fa});Ka(ha,{noResolve:Ke,...fa}),globalThis[Symbol.for("poi_trend")]={get value(){return pe}};let Ga={initialData:void 0,initialError:void 0},Ye=P`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`,ot=`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`;u.poi_mix_context_data&&(u.poi_mix_context_data instanceof Error?Ga.initialError=u.poi_mix_context_data:Ga.initialData=u.poi_mix_context_data,u.poi_mix_context_columns&&(Ga.knownColumns=u.poi_mix_context_columns));let ea,pa=!1;const Wt=ze.createReactive({callback:T=>{r(8,ea=T)},execFn:X},{id:"poi_mix_context",...Ga});Wt(ot,{noResolve:Ye,...Ga}),globalThis[Symbol.for("poi_mix_context")]={get value(){return ea}};let ga={initialData:void 0,initialError:void 0},$e=P`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed. #357: the mart's zero-filled rows (no POI of
-- the domain, oa_domain NULL) are excluded here and in poi_oa_suppressed, so both read the same
-- rows as before the zero-fill.
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
    and not is_zero_filled
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
order by oa_domain desc`,vt=`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed. #357: the mart's zero-filled rows (no POI of
-- the domain, oa_domain NULL) are excluded here and in poi_oa_suppressed, so both read the same
-- rows as before the zero-fill.
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
    and not is_zero_filled
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
order by oa_domain desc`;u.poi_oa_radar_data&&(u.poi_oa_radar_data instanceof Error?ga.initialError=u.poi_oa_radar_data:ga.initialData=u.poi_oa_radar_data,u.poi_oa_radar_columns&&(ga.knownColumns=u.poi_oa_radar_columns));let Ra,ya=!1;const wt=ze.createReactive({callback:T=>{r(9,Ra=T)},execFn:X},{id:"poi_oa_radar",...ga});wt(vt,{noResolve:$e,...ga}),globalThis[Symbol.for("poi_oa_radar")]={get value(){return Ra}};let Se={initialData:void 0,initialError:void 0},Ya=P`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not is_zero_filled
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and not is_zero_filled
    )`,Xa=`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not is_zero_filled
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and not is_zero_filled
    )`;u.poi_oa_suppressed_data&&(u.poi_oa_suppressed_data instanceof Error?Se.initialError=u.poi_oa_suppressed_data:Se.initialData=u.poi_oa_suppressed_data,u.poi_oa_suppressed_columns&&(Se.knownColumns=u.poi_oa_suppressed_columns));let ba,Ht=!1;const aa=ze.createReactive({callback:T=>{r(16,ba=T)},execFn:X},{id:"poi_oa_suppressed",...Se});aa(Xa,{noResolve:Ya,...Se}),globalThis[Symbol.for("poi_oa_suppressed")]={get value(){return ba}};let Za={initialData:void 0,initialError:void 0},va=P`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`,wa=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`;u.amenities_current_data&&(u.amenities_current_data instanceof Error?Za.initialError=u.amenities_current_data:Za.initialData=u.amenities_current_data,u.amenities_current_columns&&(Za.knownColumns=u.amenities_current_columns));let et,Ma=!1;const kt=ze.createReactive({callback:T=>{r(17,et=T)},execFn:X},{id:"amenities_current",...Za});kt(wa,{noResolve:va,...Za}),globalThis[Symbol.for("amenities_current")]={get value(){return et}};let Me={initialData:void 0,initialError:void 0},Ha=P`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`,Xe=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`;u.amenities_table_data&&(u.amenities_table_data instanceof Error?Me.initialError=u.amenities_table_data:Me.initialData=u.amenities_table_data,u.amenities_table_columns&&(Me.knownColumns=u.amenities_table_columns));let $t,Ea=!1;const St=ze.createReactive({callback:T=>{r(18,$t=T)},execFn:X},{id:"amenities_table",...Me});St(Xe,{noResolve:Ha,...Me}),globalThis[Symbol.for("amenities_table")]={get value(){return $t}};let Be={initialData:void 0,initialError:void 0},at=P`-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
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
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'`;u.minimap_areas_data&&(u.minimap_areas_data instanceof Error?Be.initialError=u.minimap_areas_data:Be.initialData=u.minimap_areas_data,u.minimap_areas_columns&&(Be.knownColumns=u.minimap_areas_columns));let ta,Kt=!1;const jt=ze.createReactive({callback:T=>{r(19,ta=T)},execFn:X},{id:"minimap_areas",...Be});jt(tt,{noResolve:at,...Be}),globalThis[Symbol.for("minimap_areas")]={get value(){return ta}};const rt=-100;return i.$$set=T=>{"data"in T&&r(29,Rt=T.data)},i.$$.update=()=>{var T;i.$$.dirty[0]&536870912&&r(30,{data:u={},customFormattingSettings:st,__db:xa}=Rt,u),i.$$.dirty[0]&1073741824&&ds.set(Object.keys(u).length>0),i.$$.dirty[3]&128&&r(31,f=ja.params),i.$$.dirty[1]&1&&r(33,ve=P`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`),i.$$.dirty[1]&1&&r(34,ft=`-- Build-time-fixed route parameter, the same \`${f.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${f.code}' as area_code`),i.$$.dirty[1]&30&&(ve||!ia?ve||(ht(ft,{noResolve:ve,...Qe}),r(35,ia=!0)):ht(ft,{noResolve:ve})),i.$$.dirty[1]&1&&r(37,sa=P`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&1&&r(38,be=`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
limit 1`),i.$$.dirty[1]&480&&(sa||!za?sa||(oa(be,{noResolve:sa,...Ie}),r(39,za=!0)):oa(be,{noResolve:sa})),i.$$.dirty[1]&1&&r(41,Ce=P`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
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
limit 1`),i.$$.dirty[1]&1&&r(42,Pa=`-- #307/#352: the Gebiet's display label. The source has no Gebiet names, so
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
limit 1`),i.$$.dirty[1]&7680&&(Ce||!pt?Ce||(Ta(Pa,{noResolve:Ce,...na}),r(43,pt=!0)):Ta(Pa,{noResolve:Ce})),i.$$.dirty[1]&1&&r(45,Ae=P`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
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
limit 1`),i.$$.dirty[1]&1&&r(46,Ua=`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
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
limit 1`),i.$$.dirty[1]&122880&&(Ae||!_a?Ae||(Ut(Ua,{noResolve:Ae,...la}),r(47,_a=!0)):Ut(Ua,{noResolve:Ae})),i.$$.dirty[1]&1&&r(49,qe=P`-- #353: this Gebiet's current stage and status trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived. #358: stage_label / status_trend are the dbt display columns.
select
    period_yyyymm,
    status_class as stage,
    status_trend,
    status_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`),i.$$.dirty[1]&1&&r(50,Qa=`-- #353: this Gebiet's current stage and status trend -- the exact row /hamburg/maps' \`areas_leaf\`
-- query colours this Gebiet by (live_data, subarea_l2, latest Hamburg period; H3/#237). Re-shown
-- here, not re-derived. #358: stage_label / status_trend are the dbt display columns.
select
    period_yyyymm,
    status_class as stage,
    status_trend,
    status_index,
    stage_label
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  and area_code = '${f.code}'
  and period_yyyymm = (
      select max(period_yyyymm)
      from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
  )`),i.$$.dirty[1]&1966080&&(qe||!Qt?qe||(gt(Qa,{noResolve:qe,...ca}),r(51,Qt=!0)):gt(Qa,{noResolve:qe})),i.$$.dirty[1]&1&&r(53,Ja=P`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
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
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`),i.$$.dirty[1]&1&&r(54,Va=`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
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
    -- #358: display label, not the raw key (spec §1).
    dominant_stage_label,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'`),i.$$.dirty[1]&31457280&&(Ja||!Jt?Ja||(yt(Va,{noResolve:Ja,...He}),r(55,Jt=!0)):yt(Va,{noResolve:Ja})),i.$$.dirty[1]&1&&r(57,Ve=P`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
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
group by all`),i.$$.dirty[1]&1&&r(58,We=`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
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
group by all`),i.$$.dirty[1]&503316480&&(Ve||!Wa?Ve||(da(We,{noResolve:Ve,...Je}),r(59,Wa=!0)):da(We,{noResolve:Ve})),i.$$.dirty[1]&1610612736|i.$$.dirty[2]&3&&(ke||!ua?ke||(Vt(bt,{noResolve:ke,...ma}),r(63,ua=!0)):Vt(bt,{noResolve:ke})),i.$$.dirty[1]&1&&r(65,Ke=P`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`),i.$$.dirty[1]&1&&r(66,ha=`-- #353: same query as the Berlin PLR page's poi_trend, Hamburg's single 'current' vintage. The
-- per-Gebiet counts are the ones /hamburg/poi-map's density and tooltip figures are built from.
select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'HH' and area_vintage = 'current' and area_code = '${f.code}'
group by all
order by snapshot_year`),i.$$.dirty[2]&60&&(Ke||!Re?Ke||(Ka(ha,{noResolve:Ke,...fa}),r(67,Re=!0)):Ka(ha,{noResolve:Ke})),i.$$.dirty[1]&1&&r(69,Ye=P`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),i.$$.dirty[1]&1&&r(70,ot=`-- Latest-year top category here vs. this Gebiet's Stadtteil vs. Hamburg -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),i.$$.dirty[2]&960&&(Ye||!pa?Ye||(Wt(ot,{noResolve:Ye,...Ga}),r(71,pa=!0)):Wt(ot,{noResolve:Ye})),i.$$.dirty[1]&1&&r(73,$e=P`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed. #357: the mart's zero-filled rows (no POI of
-- the domain, oa_domain NULL) are excluded here and in poi_oa_suppressed, so both read the same
-- rows as before the zero-fill.
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
    and not is_zero_filled
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
order by oa_domain desc`),i.$$.dirty[1]&1&&r(74,vt=`-- #353: the same mart rows /hamburg/poi-map colours its map by (HH, standard/faithful), this
-- Gebiet, latest snapshot_year with a value. Rows carrying the mart's minimum-base flag are
-- dropped here -- /hamburg/poi-map shows the same Gebiet-years as hatched "No data" -- and their
-- count is disclosed below via poi_oa_suppressed. #357: the mart's zero-filled rows (no POI of
-- the domain, oa_domain NULL) are excluded here and in poi_oa_suppressed, so both read the same
-- rows as before the zero-fill.
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
    and not is_zero_filled
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
order by oa_domain desc`),i.$$.dirty[2]&15360&&($e||!ya?$e||(wt(vt,{noResolve:$e,...ga}),r(75,ya=!0)):wt(vt,{noResolve:$e})),i.$$.dirty[1]&1&&r(77,Ya=P`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not is_zero_filled
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and not is_zero_filled
    )`),i.$$.dirty[1]&1&&r(78,Xa=`select count(*) as n_flagged
from gentriduck_marts.mart_poi_offering_advantage_map
where
    city_code = 'HH'
    and weight_variant = 'standard'
    and methodology_variant = 'faithful'
    and area_code = '${f.code}'
    and not is_zero_filled
    and oa_domain_min_base_flag
    and snapshot_year = (
        select max(snapshot_year)
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'HH'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and area_code = '${f.code}'
            and not is_zero_filled
    )`),i.$$.dirty[2]&245760&&(Ya||!Ht?Ya||(aa(Xa,{noResolve:Ya,...Se}),r(79,Ht=!0)):aa(Xa,{noResolve:Ya})),i.$$.dirty[1]&1&&r(81,va=P`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[1]&1&&r(82,wa=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'
order by snapshot_year desc
limit 1`),i.$$.dirty[2]&3932160&&(va||!Ma?va||(kt(wa,{noResolve:va,...Za}),r(83,Ma=!0)):kt(wa,{noResolve:va})),i.$$.dirty[1]&1&&r(85,Ha=P`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`),i.$$.dirty[1]&1&&r(86,Xe=`-- One row per infrastructure fact: this area vs. its district (already summed by the mart's own
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
order by sort_order`),i.$$.dirty[2]&62914560&&(Ha||!Ea?Ha||(St(Xe,{noResolve:Ha,...Me}),r(87,Ea=!0)):St(Xe,{noResolve:Ha})),i.$$.dirty[1]&1&&r(89,at=P`-- Name resolved directly in SQL (not via a JS-templated string literal) so a label containing an
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
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${f.code}'`),i.$$.dirty[2]&1006632960&&(at||!Kt?at||(jt(tt,{noResolve:at,...Be}),r(91,Kt=!0)):jt(tt,{noResolve:at})),i.$$.dirty[0]&1&&r(14,a=Fa[0]?Fa[0].area_code:""),i.$$.dirty[0]&2&&r(99,n=(T=we==null?void 0:we[0])!=null&&T.area_name?we[0].area_name:null),i.$$.dirty[0]&16384|i.$$.dirty[3]&64&&r(11,o=n??`Statistisches Gebiet ${a}`),i.$$.dirty[0]&16386|i.$$.dirty[3]&64&&r(28,c="Chapter 3 — The Evidence · most granular"+(n&&!we[0].label_has_code?` · Gebiet ${a}`:"")),i.$$.dirty[0]&2048&&r(27,d=[{label:"Hamburg",href:"/hamburg"},{label:"All Gebiete",href:"/hamburg/area"},{label:o}]),i.$$.dirty[3]&64&&r(26,p=n?`${n} — Gebiet profile · Hamburg`:null),i.$$.dirty[0]&4&&r(25,j=Ze==null?void 0:Ze[0]),i.$$.dirty[0]&64&&r(98,S=qa==null?void 0:qa[0]),i.$$.dirty[3]&32&&r(24,A=S?`${S.n_osm_named} of ${S.n_gebiete} Gebiete`:"a minority of Gebiete"),i.$$.dirty[0]&8&&r(13,U=Ge==null?void 0:Ge[0]),i.$$.dirty[0]&8192&&r(95,F=U&&U.stage_label?`In Hamburg's latest Sozialmonitoring edition on this site (${String(U.period_yyyymm).slice(0,4)}), this Gebiet is classified in the stage <b>${U.stage_label}</b>. This is a Hamburg-coded stage: it is <b>not directly equivalent</b> to a Berlin stage of the same name (Hamburg measures Dynamik over 3 years, Berlin over 2, so the same name can mark a different speed of change; see <a href="/gentriduck/methodology">methodology §6</a>).`:"No current Sozialmonitoring stage is on record for this Gebiet in the latest Hamburg edition on this site."),i.$$.dirty[0]&16&&r(96,O=Ne==null?void 0:Ne[0]),i.$$.dirty[0]&32&&r(97,J=Array.isArray(Ca)?Ca:Array.from(Ca??[])),i.$$.dirty[3]&24&&r(12,x=(()=>{if(!O||O.n_editions==null)return null;if(O.n_editions<=1)return"Only one annual Sozialmonitoring reading is on record for this Gebiet within the 2019–2025 window, so its pace of change can't be assessed yet.";const D=O.status_delta!=null?Math.abs(Number(O.status_delta)):null,it=D==null?"at an unclear pace":D<.4?"only gradually":D<1.2?"at a moderate pace":"quickly, moving several status steps",Yt={improving:"become less deprived",declining:"become more deprived","stable-established":"stayed consistently low-deprivation","persistently-deprived":"stayed consistently high-deprivation",mixed:"shown no single clear direction"}[O.trajectory_type]??"shown an unclassified pattern";let nt=`Within the 2019–2025 window (editions ${O.first_edition}–${O.last_edition} on record), it has ${Yt}, ${it} (trajectory confidence: ${O.trajectory_confidence}).`;const Oa=J.reduce((Ee,tr)=>Ee+Number(tr.n||0),0),Mt=J.find(Ee=>Ee.trajectory_type===O.trajectory_type);return Oa>0&&Mt&&(nt+=` ${Mt.n} of ${Oa} other Gebiete in this Stadtteil with a usable trajectory show this same "${O.trajectory_type}" pattern.`),nt})()),i.$$.dirty[0]&4096|i.$$.dirty[3]&4&&r(23,I=[F,x].filter(Boolean)),i.$$.dirty[0]&128&&r(94,Q=Array.isArray(pe)?pe:Array.from(pe??[])),i.$$.dirty[3]&2&&r(22,E=Array.from(Q.reduce((D,it)=>(D.set(it.poi_category_h,(D.get(it.poi_category_h)||0)+Number(it.poi_count||0)),D),new Map)).sort((D,it)=>it[1]-D[1]).map(([D])=>D)),i.$$.dirty[0]&256&&r(21,N=ea==null?void 0:ea[0]),i.$$.dirty[0]&512&&r(93,Na=Array.isArray(Ra)?Ra:Array.from(Ra??[])),i.$$.dirty[3]&1&&r(10,V=Na.map(D=>({domain:D.poi_domain_h,pct:(Number(D.oa_domain)-1)*100,lowBase:Number(D.poi_count||0)<Lr,poiCount:D.poi_count}))),i.$$.dirty[0]&1024&&r(92,B=Math.max(100,...V.map(D=>D.pct))*1.1),i.$$.dirty[0]&3072|i.$$.dirty[2]&1073741824&&r(20,Sa={tooltip:{},radar:{indicator:V.map(D=>({name:D.lowBase?`${D.domain} †`:D.domain,max:B,min:rt})),splitNumber:4,axisName:{fontSize:10}},series:[{type:"radar",data:[{value:V.map(D=>D.pct),name:o,areaStyle:{opacity:.15}},{value:V.map(()=>0),name:"Citywide baseline (0% = Hamburg average)",lineStyle:{type:"dashed",width:1},areaStyle:{opacity:0},symbol:"none"}]}]})},r(61,ke=P`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),r(62,bt=`-- #353 (#352 review follow-up): how many Gebiet labels carry an OSM place name, computed instead of
-- the hard-coded "41 of 943" -- same label_has_code test as name_info above.
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),[Fa,we,Ze,Ge,Ne,Ca,qa,pe,ea,Ra,V,o,x,U,a,Te,ba,et,$t,ta,Sa,N,E,I,A,j,p,d,c,Rt,u,f,Qe,ve,ft,ia,Ie,sa,be,za,na,Ce,Pa,pt,la,Ae,Ua,_a,ca,qe,Qa,Qt,He,Ja,Va,Jt,Je,Ve,We,Wa,ma,ke,bt,ua,fa,Ke,ha,Re,Ga,Ye,ot,pa,ga,$e,vt,ya,Se,Ya,Xa,Ht,Za,va,wa,Ma,Me,Ha,Xe,Ea,Be,at,tt,Kt,B,Na,Q,F,O,J,S,n,ja]}class wo extends Ki{constructor(t){super(),Yi(this,t,Ys,Ks,Bi,{data:29},null,[-1,-1,-1,-1,-1])}}export{wo as component};
