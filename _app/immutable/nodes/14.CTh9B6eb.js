import{s as Ms,d as _,x as Ds,w as Oe,i as c,a as P,b as j,c as w,h as Hs,e as k,f as kr,g as $e,j as x,k as L,l as v,m as R,t as E,n as Zr,o as Fs,p as zs,q as Ls,r as Ns,u as Re,v as As,H as Is}from"../chunks/scheduler.CmMeO4ay.js";import{S as Os,i as Ps,d as B,t as p,a as u,c as J,m as T,b as S,e as C,g as Z}from"../chunks/index.bfDa0Uqw.js";import{e as Yr}from"../chunks/each.B24DDXJR.js";import{A as Us,P as Qs,a as Ws}from"../chunks/PageTitle.nASIZfTP.js";import{F as Ks}from"../chunks/FooterNav.BbND9dxm.js";import{H as Vs}from"../chunks/Hero.wYia6TQ0.js";import{D as br,C as ke}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as Cs,w as Gs}from"../chunks/entry.vKQYRLhF.js";import{A as ht}from"../chunks/Alert.BNZjDqvU.js";import{e as Js,s as Zs,Q as Be,p as Ys,a as Xr,r as es,C as Xs}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as O}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as ei}from"../chunks/stores.CGa44sBH.js";import{Q as Te}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as ai,E as ti}from"../chunks/BarChart.BZFK7Gke.js";import{B as $r}from"../chunks/BigValue.Cf_smc5N.js";import{L as as}from"../chunks/LineChart.Dkgv3PwH.js";import{p as ri}from"../chunks/profile.BW8tN6E9.js";function ts(s,t,r){const a=s.slice();return a[143]=t[r],a}function si(s){var i;let t,r=(N.title??((i=N.og)==null?void 0:i.title))+"",a;return{c(){t=R("h1"),a=E(r),this.h()},l(o){t=k(o,"H1",{class:!0});var m=$e(t);a=x(m,r),m.forEach(_),this.h()},h(){j(t,"class","title")},m(o,m){c(o,t,m),P(t,a)},p:Re,d(o){o&&_(t)}}}function ii(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:Re,p:Re,d:Re}}function ni(s){var m;let t,r,a,i,o;return document.title=t=N.title??((m=N.og)==null?void 0:m.title),{c(){r=v(),a=R("meta"),i=v(),o=R("meta"),this.h()},l(l){r=w(l),a=k(l,"META",{property:!0,content:!0}),i=w(l),o=k(l,"META",{name:!0,content:!0}),this.h()},h(){var l,h;j(a,"property","og:title"),j(a,"content",((l=N.og)==null?void 0:l.title)??N.title),j(o,"name","twitter:title"),j(o,"content",((h=N.og)==null?void 0:h.title)??N.title)},m(l,h){c(l,r,h),c(l,a,h),c(l,i,h),c(l,o,h)},p(l,h){var g;h&0&&t!==(t=N.title??((g=N.og)==null?void 0:g.title))&&(document.title=t)},d(l){l&&(_(r),_(a),_(i),_(o))}}}function oi(s){var o,m;let t,r,a=(N.description||((o=N.og)==null?void 0:o.description))&&_i(),i=((m=N.og)==null?void 0:m.image)&&ci();return{c(){a&&a.c(),t=v(),i&&i.c(),r=kr()},l(l){a&&a.l(l),t=w(l),i&&i.l(l),r=kr()},m(l,h){a&&a.m(l,h),c(l,t,h),i&&i.m(l,h),c(l,r,h)},p(l,h){var g,b;(N.description||(g=N.og)!=null&&g.description)&&a.p(l,h),(b=N.og)!=null&&b.image&&i.p(l,h)},d(l){l&&(_(t),_(r)),a&&a.d(l),i&&i.d(l)}}}function _i(s){let t,r,a,i,o;return{c(){t=R("meta"),r=v(),a=R("meta"),i=v(),o=R("meta"),this.h()},l(m){t=k(m,"META",{name:!0,content:!0}),r=w(m),a=k(m,"META",{property:!0,content:!0}),i=w(m),o=k(m,"META",{name:!0,content:!0}),this.h()},h(){var m,l,h;j(t,"name","description"),j(t,"content",N.description??((m=N.og)==null?void 0:m.description)),j(a,"property","og:description"),j(a,"content",((l=N.og)==null?void 0:l.description)??N.description),j(o,"name","twitter:description"),j(o,"content",((h=N.og)==null?void 0:h.description)??N.description)},m(m,l){c(m,t,l),c(m,r,l),c(m,a,l),c(m,i,l),c(m,o,l)},p:Re,d(m){m&&(_(t),_(r),_(a),_(i),_(o))}}}function ci(s){let t,r,a;return{c(){t=R("meta"),r=v(),a=R("meta"),this.h()},l(i){t=k(i,"META",{property:!0,content:!0}),r=w(i),a=k(i,"META",{name:!0,content:!0}),this.h()},h(){var i,o;j(t,"property","og:image"),j(t,"content",Xr((i=N.og)==null?void 0:i.image)),j(a,"name","twitter:image"),j(a,"content",Xr((o=N.og)==null?void 0:o.image))},m(i,o){c(i,t,o),c(i,r,o),c(i,a,o)},p:Re,d(i){i&&(_(t),_(r),_(a))}}}function rs(s){let t,r;return t=new Te({props:{queryID:"area_info",queryResult:s[0]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&1&&(o.queryResult=a[0]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ss(s){let t,r;return t=new Te({props:{queryID:"district_info",queryResult:s[1]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&2&&(o.queryResult=a[1]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function is(s){let t,r;return t=new Te({props:{queryID:"context_current",queryResult:s[2]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&4&&(o.queryResult=a[2]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function li(s){let t,r="Bezirksregion profile";return{c(){t=R("a"),t.textContent=r,this.h()},l(a){t=k(a,"A",{href:!0,"data-svelte-h":!0}),L(t)!=="svelte-9htoed"&&(t.textContent=r),this.h()},h(){j(t,"href","/gentriduck/berlin/area/bezirk")},m(a,i){c(a,t,i)},p:Re,d(a){a&&_(t)}}}function di(s){let t,r,a;return{c(){t=R("a"),r=E("Bezirksregion profile"),this.h()},l(i){t=k(i,"A",{href:!0});var o=$e(t);r=x(o,"Bezirksregion profile"),o.forEach(_),this.h()},h(){j(t,"href",a="/gentriduck/berlin/area/bzr/"+s[0][0].bzr_code)},m(i,o){c(i,t,o),P(t,r)},p(i,o){o[0]&1&&a!==(a="/gentriduck/berlin/area/bzr/"+i[0][0].bzr_code)&&j(t,"href",a)},d(i){i&&_(t)}}}function ns(s){let t,r,a=s[143]+"";return{c(){t=R("p"),r=new Is(!1),this.h()},l(i){t=k(i,"P",{});var o=$e(t);r=As(o,!1),o.forEach(_),this.h()},h(){r.a=null},m(i,o){c(i,t,o),r.m(a,t)},p(i,o){o[0]&8388608&&a!==(a=i[143]+"")&&r.p(a)},d(i){i&&_(t)}}}function mi(s){let t,r="How to read the charts:",a,i,o="1 = least deprived",m,l,h="4 = most deprived",g,b,y="falling",H,$,A="less",F,D,I="methodology & data sources",G;return{c(){t=R("b"),t.textContent=r,a=E(" official status runs "),i=R("b"),i.textContent=o,m=E(` to
  `),l=R("b"),l.textContent=h,g=E(", so a "),b=R("b"),b.textContent=y,H=E(" status line means the area became "),$=R("b"),$.textContent=A,F=E(` deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the `),D=R("a"),D.textContent=I,G=E(` page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).`),this.h()},l(z){t=k(z,"B",{"data-svelte-h":!0}),L(t)!=="svelte-js88l3"&&(t.textContent=r),a=x(z," official status runs "),i=k(z,"B",{"data-svelte-h":!0}),L(i)!=="svelte-1bcgix4"&&(i.textContent=o),m=x(z,` to
  `),l=k(z,"B",{"data-svelte-h":!0}),L(l)!=="svelte-1cr3k8t"&&(l.textContent=h),g=x(z,", so a "),b=k(z,"B",{"data-svelte-h":!0}),L(b)!=="svelte-164rnor"&&(b.textContent=y),H=x(z," status line means the area became "),$=k(z,"B",{"data-svelte-h":!0}),L($)!=="svelte-u149sn"&&($.textContent=A),F=x(z,` deprived
  (its status rose) — which is also the signature of gentrification, not automatically good news for
  existing residents. See the `),D=k(z,"A",{href:!0,"data-svelte-h":!0}),L(D)!=="svelte-3zcnok"&&(D.textContent=I),G=x(z,` page for a full
  walkthrough. Figures are on Berlin's current (2021+) boundaries and the live social-monitoring
  editions (2021–2025).`),this.h()},h(){j(D,"href","/gentriduck/methodology")},m(z,U){c(z,t,U),c(z,a,U),c(z,i,U),c(z,m,U),c(z,l,U),c(z,g,U),c(z,b,U),c(z,H,U),c(z,$,U),c(z,F,U),c(z,D,U),c(z,G,U)},p:Re,d(z){z&&(_(t),_(a),_(i),_(m),_(l),_(g),_(b),_(H),_($),_(F),_(D),_(G))}}}function os(s){let t,r;return t=new Te({props:{queryID:"area_trend",queryResult:s[12]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&4096&&(o.queryResult=a[12]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function _s(s){let t,r;return t=new Te({props:{queryID:"trajectory_summary",queryResult:s[3]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8&&(o.queryResult=a[3]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function cs(s){let t,r;return t=new Te({props:{queryID:"district_trajectory_mix",queryResult:s[4]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&16&&(o.queryResult=a[4]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ui(s){let t,r;return t=new ht({props:{status:"info",$$slots:{default:[pi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[4]&4194304&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function fi(s){let t,r;return t=new $r({props:{data:s[2],value:"stage",title:"Current stage"}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&4&&(o.data=a[2]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function pi(s){let t;return{c(){t=E(`This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.`)},l(r){t=x(r,`This is an uninhabited planning area in Berlin's official population register (e.g. a park,
  development site, or similar) — no current stage applies here.`)},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function ls(s){let t,r;return t=new Te({props:{queryID:"poi_trend",queryResult:s[5]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&32&&(o.queryResult=a[5]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ds(s){let t,r;return t=new Te({props:{queryID:"poi_mix_context",queryResult:s[6]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&64&&(o.queryResult=a[6]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ms(s){let t,r,a=s[21].snapshot_year+"",i,o,m,l=s[21].area_top_category+"",h,g,b,y,H,$=(s[21].district_top_category??"—")+"",A,F,D,I=(s[21].city_top_category??"—")+"",G,z;return{c(){t=R("p"),r=E("The most common kind of mapped place here in "),i=E(a),o=E(" is "),m=R("b"),h=E(l),g=E(`;
across `),b=E(s[10]),y=E(" it's "),H=R("b"),A=E($),F=E(`, and across Berlin as a whole
it's `),D=R("b"),G=E(I),z=E(".")},l(U){t=k(U,"P",{});var Q=$e(t);r=x(Q,"The most common kind of mapped place here in "),i=x(Q,a),o=x(Q," is "),m=k(Q,"B",{});var lt=$e(m);h=x(lt,l),lt.forEach(_),g=x(Q,`;
across `),b=x(Q,s[10]),y=x(Q," it's "),H=k(Q,"B",{});var Sa=$e(H);A=x(Sa,$),Sa.forEach(_),F=x(Q,`, and across Berlin as a whole
it's `),D=k(Q,"B",{});var Y=$e(D);G=x(Y,I),Y.forEach(_),z=x(Q,"."),Q.forEach(_)},m(U,Q){c(U,t,Q),P(t,r),P(t,i),P(t,o),P(t,m),P(m,h),P(t,g),P(t,b),P(t,y),P(t,H),P(H,A),P(t,F),P(t,D),P(D,G),P(t,z)},p(U,Q){Q[0]&2097152&&a!==(a=U[21].snapshot_year+"")&&Oe(i,a),Q[0]&2097152&&l!==(l=U[21].area_top_category+"")&&Oe(h,l),Q[0]&1024&&Oe(b,U[10]),Q[0]&2097152&&$!==($=(U[21].district_top_category??"—")+"")&&Oe(A,$),Q[0]&2097152&&I!==(I=(U[21].city_top_category??"—")+"")&&Oe(G,I)},d(U){U&&_(t)}}}function us(s){let t,r;return t=new Te({props:{queryID:"poi_oa_radar",queryResult:s[7]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&128&&(o.queryResult=a[7]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function fs(s){let t,r;return t=new Te({props:{queryID:"poi_oa_radar_district",queryResult:s[8]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&256&&(o.queryResult=a[8]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function hi(s){let t,r;return t=new ht({props:{status:"warning",$$slots:{default:[yi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[4]&4194304&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function gi(s){let t,r;return t=new ti({props:{config:s[20],data:s[7],height:"360px",downloadableData:!0,downloadableImage:!0}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&1048576&&(o.config=a[20]),i[0]&128&&(o.data=a[7]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function yi(s){let t;return{c(){t=E(`No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).`)},l(r){t=x(r,`No Offering Advantage data for this area (e.g. an uninhabited planning area, or no POIs mapped
  for any domain here yet).`)},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function ps(s){let t,r;return t=new ht({props:{status:"warning",$$slots:{default:[wi]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&512|i[4]&4194304&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function wi(s){let t,r,a="†",i,o,m,l=s[9].filter(js).map(Bs).join(", ")+"",h,g;return{c(){t=E("Domains marked "),r=R("b"),r.textContent=a,i=E(" are based on very few mapped places here (fewer than "),o=E(Cr),m=E(`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),h=E(l),g=E(".")},l(b){t=x(b,"Domains marked "),r=k(b,"B",{"data-svelte-h":!0}),L(r)!=="svelte-yahvc0"&&(r.textContent=a),i=x(b," are based on very few mapped places here (fewer than "),o=x(b,Cr),m=x(b,`) —
  treat their percentage cautiously, since a single new or closed business can swing a small base
  sharply. Counts: `),h=x(b,l),g=x(b,".")},m(b,y){c(b,t,y),c(b,r,y),c(b,i,y),c(b,o,y),c(b,m,y),c(b,h,y),c(b,g,y)},p(b,y){y[0]&512&&l!==(l=b[9].filter(js).map(Bs).join(", ")+"")&&Oe(h,l)},d(b){b&&(_(t),_(r),_(i),_(o),_(m),_(h),_(g))}}}function hs(s){let t,r;return t=new Te({props:{queryID:"dominance_area",queryResult:s[13]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8192&&(o.queryResult=a[13]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function vi(s){let t,r;return t=new ht({props:{status:"warning",$$slots:{default:[$i]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[4]&4194304&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function bi(s){let t,r;return t=new br({props:{data:s[13].filter(Ts),rows:"4",emptySet:"warn",emptyMessage:"No within-group dominance data for this area.",$$slots:{default:[ki]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8192&&(o.data=a[13].filter(Ts)),i[4]&4194304&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function $i(s){let t;return{c(){t=E(`No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).`)},l(r){t=x(r,`No within-group dominance data for this area (e.g. an uninhabited planning
area, or too few mapped places in every curated group here).`)},m(r,a){c(r,t,a)},d(r){r&&_(t)}}}function ki(s){let t,r,a,i,o,m,l,h,g,b,y,H;return t=new ke({props:{id:"group_label",title:"Business group"}}),a=new ke({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new ke({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),l=new ke({props:{id:"top_child",title:"Leading type"}}),g=new ke({props:{id:"n_children",title:"Types in this group here"}}),y=new ke({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment),m=v(),C(l.$$.fragment),h=v(),C(g.$$.fragment),b=v(),C(y.$$.fragment)},l($){S(t.$$.fragment,$),r=w($),S(a.$$.fragment,$),i=w($),S(o.$$.fragment,$),m=w($),S(l.$$.fragment,$),h=w($),S(g.$$.fragment,$),b=w($),S(y.$$.fragment,$)},m($,A){T(t,$,A),c($,r,A),T(a,$,A),c($,i,A),T(o,$,A),c($,m,A),T(l,$,A),c($,h,A),T(g,$,A),c($,b,A),T(y,$,A),H=!0},p:Re,i($){H||(u(t.$$.fragment,$),u(a.$$.fragment,$),u(o.$$.fragment,$),u(l.$$.fragment,$),u(g.$$.fragment,$),u(y.$$.fragment,$),H=!0)},o($){p(t.$$.fragment,$),p(a.$$.fragment,$),p(o.$$.fragment,$),p(l.$$.fragment,$),p(g.$$.fragment,$),p(y.$$.fragment,$),H=!1},d($){$&&(_(r),_(i),_(m),_(h),_(b)),B(t,$),B(a,$),B(o,$),B(l,$),B(g,$),B(y,$)}}}function gs(s){let t,r;return t=new ht({props:{status:"info",$$slots:{default:[Ri]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&8192|i[4]&4194304&&(o.$$scope={dirty:i,ctx:a}),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Ri(s){let t=s[13].filter(Ss).length+"",r,a,i=s[13].length+"",o,m;return{c(){r=E(t),a=E(" of "),o=E(i),m=E(` business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."`)},l(l){r=x(l,t),a=x(l," of "),o=x(l,i),m=x(l,` business group(s)
  here are too thinly observed to characterize their mix confidently (fewer mapped places than this
  group's own minimum-base rule) — omitted from the table above, never shown as "commercially dead."`)},m(l,h){c(l,r,h),c(l,a,h),c(l,o,h),c(l,m,h)},p(l,h){h[0]&8192&&t!==(t=l[13].filter(Ss).length+"")&&Oe(r,t),h[0]&8192&&i!==(i=l[13].length+"")&&Oe(o,i)},d(l){l&&(_(r),_(a),_(o),_(m))}}}function ys(s){let t,r;return t=new Te({props:{queryID:"demographics_current",queryResult:s[14]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&16384&&(o.queryResult=a[14]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ws(s){let t,r;return t=new Te({props:{queryID:"demographics_table",queryResult:s[15]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&32768&&(o.queryResult=a[15]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function xi(s){let t;return{c(){t=E("No population-register data is available for this area yet.")},l(r){t=x(r,"No population-register data is available for this area yet.")},m(r,a){c(r,t,a)},p:Re,d(r){r&&_(t)}}}function Ei(s){let t,r,a=s[14][0].reference_year+"",i,o,m,l=(s[14][0].residents_total!=null?Math.round(s[14][0].residents_total).toLocaleString():"—")+"",h,g;return{c(){t=E("As of the "),r=R("b"),i=E(a),o=E(` EWR register (population statistics), this area has
`),m=R("b"),h=E(l),g=E(` registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.`)},l(b){t=x(b,"As of the "),r=k(b,"B",{});var y=$e(r);i=x(y,a),y.forEach(_),o=x(b,` EWR register (population statistics), this area has
`),m=k(b,"B",{});var H=$e(m);h=x(H,l),H.forEach(_),g=x(b,` registered
residents. The table below is purely descriptive — dated and sourced from Berlin's official
population register (EWR) — and always shown alongside its full demographic context, never as an
isolated figure.`)},m(b,y){c(b,t,y),c(b,r,y),P(r,i),c(b,o,y),c(b,m,y),P(m,h),c(b,g,y)},p(b,y){y[0]&16384&&a!==(a=b[14][0].reference_year+"")&&Oe(i,a),y[0]&16384&&l!==(l=(b[14][0].residents_total!=null?Math.round(b[14][0].residents_total).toLocaleString():"—")+"")&&Oe(h,l)},d(b){b&&(_(t),_(r),_(o),_(m),_(g))}}}function vs(s){let t,r;return t=new ht({props:{status:"warning",$$slots:{default:[ji]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function ji(s){let t,r,a="approximate",i;return{c(){t=E(`One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as `),r=R("b"),r.textContent=a,i=E(`,
  not exact counts.`)},l(o){t=x(o,`One or more figures below are based on a small or privacy-suppressed population cell for this
  area (per Berlin's EWR disclosure rules) — treat the values in this table as `),r=k(o,"B",{"data-svelte-h":!0}),L(r)!=="svelte-1ajqvq2"&&(r.textContent=a),i=x(o,`,
  not exact counts.`)},m(o,m){c(o,t,m),c(o,r,m),c(o,i,m)},p:Re,d(o){o&&(_(t),_(r),_(i))}}}function Bi(s){let t,r,a,i,o,m,l,h;return t=new ke({props:{id:"indicator",title:"Indicator"}}),a=new ke({props:{id:"area_value",title:"This area"}}),o=new ke({props:{id:"district_value",title:"District average"}}),l=new ke({props:{id:"city_value",title:"Berlin average"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment),m=v(),C(l.$$.fragment)},l(g){S(t.$$.fragment,g),r=w(g),S(a.$$.fragment,g),i=w(g),S(o.$$.fragment,g),m=w(g),S(l.$$.fragment,g)},m(g,b){T(t,g,b),c(g,r,b),T(a,g,b),c(g,i,b),T(o,g,b),c(g,m,b),T(l,g,b),h=!0},p:Re,i(g){h||(u(t.$$.fragment,g),u(a.$$.fragment,g),u(o.$$.fragment,g),u(l.$$.fragment,g),h=!0)},o(g){p(t.$$.fragment,g),p(a.$$.fragment,g),p(o.$$.fragment,g),p(l.$$.fragment,g),h=!1},d(g){g&&(_(r),_(i),_(m)),B(t,g),B(a,g),B(o,g),B(l,g)}}}function bs(s){let t,r;return t=new Te({props:{queryID:"amenities_current",queryResult:s[16]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&65536&&(o.queryResult=a[16]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function $s(s){let t,r;return t=new Te({props:{queryID:"amenities_table",queryResult:s[17]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&131072&&(o.queryResult=a[17]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Ti(s){let t;return{c(){t=E("No amenity data is available for this area yet.")},l(r){t=x(r,"No amenity data is available for this area yet.")},m(r,a){c(r,t,a)},p:Re,d(r){r&&_(t)}}}function Si(s){let t,r,a=s[16][0].snapshot_year+"",i,o;return{c(){t=E("Based on OpenStreetMap tagging as of "),r=R("b"),i=E(a),o=E(`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},l(m){t=x(m,"Based on OpenStreetMap tagging as of "),r=k(m,"B",{});var l=$e(r);i=x(l,a),l.forEach(_),o=x(m,`, this area has the
everyday-infrastructure counts below, shown alongside its district (Bezirk) total for context.`)},m(m,l){c(m,t,l),c(m,r,l),P(r,i),c(m,o,l)},p(m,l){l[0]&65536&&a!==(a=m[16][0].snapshot_year+"")&&Oe(i,a)},d(m){m&&(_(t),_(r),_(o))}}}function Ci(s){let t,r,a,i,o,m;return t=new ke({props:{id:"indicator",title:"Infrastructure"}}),a=new ke({props:{id:"area_value",title:"This area"}}),o=new ke({props:{id:"district_value",title:"District total"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment)},l(l){S(t.$$.fragment,l),r=w(l),S(a.$$.fragment,l),i=w(l),S(o.$$.fragment,l)},m(l,h){T(t,l,h),c(l,r,h),T(a,l,h),c(l,i,h),T(o,l,h),m=!0},p:Re,i(l){m||(u(t.$$.fragment,l),u(a.$$.fragment,l),u(o.$$.fragment,l),m=!0)},o(l){p(t.$$.fragment,l),p(a.$$.fragment,l),p(o.$$.fragment,l),m=!1},d(l){l&&(_(r),_(i)),B(t,l),B(a,l),B(o,l)}}}function qi(s){let t,r,a="0",i,o,m="open-data",l;return{c(){t=E("These figures come from OpenStreetMap tagging, not an official registry. A "),r=R("b"),r.textContent=a,i=E(` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=R("a"),o.textContent=m,l=E(` page for
  more on this project's data-completeness caveats generally.`),this.h()},l(h){t=x(h,"These figures come from OpenStreetMap tagging, not an official registry. A "),r=k(h,"B",{"data-svelte-h":!0}),L(r)!=="svelte-12bhsds"&&(r.textContent=a),i=x(h,` may mean
  "none here" or "not yet mapped" — better-mapped areas (typically denser, more central) will show
  more complete counts than less-mapped ones. See the `),o=k(h,"A",{href:!0,"data-svelte-h":!0}),L(o)!=="svelte-1jijq3i"&&(o.textContent=m),l=x(h,` page for
  more on this project's data-completeness caveats generally.`),this.h()},h(){j(o,"href","/gentriduck/open-data")},m(h,g){c(h,t,g),c(h,r,g),c(h,i,g),c(h,o,g),c(h,l,g)},p:Re,d(h){h&&(_(t),_(r),_(i),_(o),_(l))}}}function Mi(s){let t;return{c(){t=E(`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},l(r){t=x(r,`There isn't enough tagged cuisine data in this area yet to identify a most-common cuisine (OpenStreetMap
tagging of restaurant/cafe cuisine is incomplete for smaller or less-mapped areas).`)},m(r,a){c(r,t,a)},p:Re,d(r){r&&_(t)}}}function Di(s){let t,r,a=s[16][0].gastro_poi_with_cuisine_count+"",i,o;return{c(){t=E("Cuisine is tagged for "),r=R("b"),i=E(a),o=E(` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},l(m){t=x(m,"Cuisine is tagged for "),r=k(m,"B",{});var l=$e(r);i=x(l,a),l.forEach(_),o=x(m,` restaurants/cafes
here, but no single cuisine reaches 15% of them, so none is named.`)},m(m,l){c(m,t,l),c(m,r,l),P(r,i),c(m,o,l)},p(m,l){l[0]&65536&&a!==(a=m[16][0].gastro_poi_with_cuisine_count+"")&&Oe(i,a)},d(m){m&&(_(t),_(r),_(o))}}}function Hi(s){let t,r,a=s[16][0].gastro_poi_with_cuisine_count+"",i,o,m,l="most common cuisine",h,g,b=s[16][0].dominant_cuisine+"",y,H,$=Math.round(s[16][0].dominant_cuisine_share*100)+"",A,F;return{c(){t=E("Among "),r=R("b"),i=E(a),o=E(` restaurants/cafes with cuisine
data tagged in this area, the `),m=R("b"),m.textContent=l,h=E(` is
`),g=R("b"),y=E(b),H=E(`
(`),A=E($),F=E("% of cuisine-tagged restaurants/cafes).")},l(D){t=x(D,"Among "),r=k(D,"B",{});var I=$e(r);i=x(I,a),I.forEach(_),o=x(D,` restaurants/cafes with cuisine
data tagged in this area, the `),m=k(D,"B",{"data-svelte-h":!0}),L(m)!=="svelte-1floooe"&&(m.textContent=l),h=x(D,` is
`),g=k(D,"B",{});var G=$e(g);y=x(G,b),G.forEach(_),H=x(D,`
(`),A=x(D,$),F=x(D,"% of cuisine-tagged restaurants/cafes).")},m(D,I){c(D,t,I),c(D,r,I),P(r,i),c(D,o,I),c(D,m,I),c(D,h,I),c(D,g,I),P(g,y),c(D,H,I),c(D,A,I),c(D,F,I)},p(D,I){I[0]&65536&&a!==(a=D[16][0].gastro_poi_with_cuisine_count+"")&&Oe(i,a),I[0]&65536&&b!==(b=D[16][0].dominant_cuisine+"")&&Oe(y,b),I[0]&65536&&$!==($=Math.round(D[16][0].dominant_cuisine_share*100)+"")&&Oe(A,$)},d(D){D&&(_(t),_(r),_(o),_(m),_(h),_(g),_(H),_(A),_(F))}}}function Fi(s){let t,r,a="methodology page",i;return{c(){t=E(`These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  `),r=R("a"),r.textContent=a,i=E(" for what they measure and their caveats."),this.h()},l(o){t=x(o,`These are official reference values (Bodenrichtwert land value and Mietspiegel-derived estimated
  rent), not observed transaction prices — see the
  `),r=k(o,"A",{href:!0,"data-svelte-h":!0}),L(r)!=="svelte-1l2pw3"&&(r.textContent=a),i=x(o," for what they measure and their caveats."),this.h()},h(){j(r,"href","/gentriduck/methodology")},m(o,m){c(o,t,m),c(o,r,m),c(o,i,m)},p:Re,d(o){o&&(_(t),_(r),_(i))}}}function ks(s){let t,r;return t=new Te({props:{queryID:"price_rent",queryResult:s[18]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&262144&&(o.queryResult=a[18]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function zi(s){let t,r,a,i,o,m,l,h,g,b;return t=new ke({props:{id:"snapshot_year",title:"Year"}}),a=new ke({props:{id:"brw_weighted_avg_eur_m2",title:"Land value, EUR/m² (Bodenrichtwert)"}}),o=new ke({props:{id:"est_rent_mid",title:"Estimated rent, typical (EUR/m²)"}}),l=new ke({props:{id:"est_rent_low",title:"Estimated rent, low (EUR/m²)"}}),g=new ke({props:{id:"est_rent_high",title:"Estimated rent, high (EUR/m²)"}}),{c(){C(t.$$.fragment),r=v(),C(a.$$.fragment),i=v(),C(o.$$.fragment),m=v(),C(l.$$.fragment),h=v(),C(g.$$.fragment)},l(y){S(t.$$.fragment,y),r=w(y),S(a.$$.fragment,y),i=w(y),S(o.$$.fragment,y),m=w(y),S(l.$$.fragment,y),h=w(y),S(g.$$.fragment,y)},m(y,H){T(t,y,H),c(y,r,H),T(a,y,H),c(y,i,H),T(o,y,H),c(y,m,H),T(l,y,H),c(y,h,H),T(g,y,H),b=!0},p:Re,i(y){b||(u(t.$$.fragment,y),u(a.$$.fragment,y),u(o.$$.fragment,y),u(l.$$.fragment,y),u(g.$$.fragment,y),b=!0)},o(y){p(t.$$.fragment,y),p(a.$$.fragment,y),p(o.$$.fragment,y),p(l.$$.fragment,y),p(g.$$.fragment,y),b=!1},d(y){y&&(_(r),_(i),_(m),_(h)),B(t,y),B(a,y),B(o,y),B(l,y),B(g,y)}}}function Rs(s){let t,r;return t=new Te({props:{queryID:"minimap_areas",queryResult:s[19]}}),{c(){C(t.$$.fragment)},l(a){S(t.$$.fragment,a)},m(a,i){T(t,a,i),r=!0},p(a,i){const o={};i[0]&524288&&(o.queryResult=a[19]),t.$set(o)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){p(t.$$.fragment,a),r=!1},d(a){B(t,a)}}}function Li(s){var Ur;let t,r,a,i,o,m,l,h,g,b,y,H,$,A,F,D,I,G,z="district browse",U,Q,lt="all districts",Sa,Y,Ca,dt=(s[0][0]?s[0][0].area_name:"This area")+"",Ut,gt,yt,qa,f,_r='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Qt,Ma,Kt,V,d,la,Se,wt=`District and city lines are the simple average across all Planungsräume in the same Bezirk /
across Berlin at each edition — context, not a target.`,Pe,Pa,Ua,X,ee,da,Ue,vt,ma,ua,Ce,Qa,Qe,Vt=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,bt,xe,Wa='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Ka,ra,Gt='<a href="#how-its-commercial-mix-has-developed">How its commercial mix has developed</a>',$t,qe,Va=`Shops, cafés and other businesses tend to <em class="markdown">follow</em> — not lead — social change (see
<a href="/gentriduck/methodology" class="markdown">methodology</a> for the theory). This shows how the mix of mapped places here has
evolved.`,Ga,sa,Ja,fa,pa,Je,We,mt='<a href="#offering-advantage-profile">Offering Advantage profile</a>',kt,ha,Za=`<strong class="markdown">Offering Advantage (OA)</strong> compares each POI domain&#39;s share of this area&#39;s mapped places (shops,
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
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> to explore this across all of Berlin.`,ga,ya,ia,Me,De,Ze,Da=s[9].some(Es),wa,He,Jt='<a href="#within-group-dominance">Within-group dominance</a>',Rt,Fe,Ya=`<strong class="markdown">Within-group dominance</strong> asks a different question from Offering Advantage: within a curated
group of businesses, is one type dominating, or is the mix diverse? (&quot;Are fast-food places crowding
out sit-down restaurants within gastronomy?&quot;) The figures below are <strong class="markdown">sign-blind</strong> — a high
concentration reading says only that this area&#39;s mix is concentrated in the named leading type,
never whether that is an up-market or down-market shift; read it alongside the status/trajectory
section above, never in isolation. See the <a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> §5
for the full methodology, ethics note, and why cuisine-typed dominance never appears on any public
page (this table included).`,Xa,ze,xt,Le,ae,Ye,ut=s[13].some(xs),na,oa,Zt='<a href="#people--structure">People &amp; structure</a>',va,Xe,ba,Ha,Et,et,Ne,$a,_a,Yt=`† <b>Migration-background share</b> uses a Mikrozensus definition that changed around 2017 —
figures from before 2017 are present in the underlying data but are <b>not directly comparable</b>
to 2017-and-later figures. This page shows only the current-vintage snapshot above; do not compare
this row across years without checking the vintage.`,jt,Fa,at=`Both the foreign-national and migration-background shares above are shown only as plain rows in
this table, alongside the area's full age and residence-duration profile — this page never ranks
or sorts areas by either figure, and makes no claim about whether a change in either is good or bad
for the neighbourhood.`,ka,Ke,Xt='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Bt,tt,ea,Ve,rt,Ra,Tt,xa,Ea,Ge,st,za,er=`This block is a plain inventory, not a recommendation — it never ranks or scores this area against
others, and makes no claim about whether it is a good or bad place to live.`,St,Ee,it='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',nt,ja,Ct,ot,Ae,Ba,aa,qt,ca,ar='<a href="#where-this-area-sits">Where this area sits</a>',Mt,Dt,_t,tr,q,Ht=`This is Berlin's finest published small-area grain (Planungsraum) — there is no further level to
drill into. See the Bezirksregion link above ("Up:") to zoom back out.`,M,W,Ft='<a href="#honest-caveats">Honest caveats</a>',ct,ta,zt=`<li class="markdown"><strong class="markdown">A falling status line means the area became <em class="markdown">less</em> deprived</strong> (its status rose) — which is
also the signature of gentrification, not automatically good news for existing residents.</li> <li class="markdown"><strong class="markdown">The portrait&#39;s stage, comparison, and pace sentences are display-layer wording over already-
published mart figures</strong> — no new indicator, weight, or normalization is introduced by this page.</li> <li class="markdown"><strong class="markdown">Offering Advantage is descriptive, not causal, and multi-signed</strong> — over- or under-representation
in a domain is a mix/specialization signal, never a standalone claim about gentrification, and
domains do not all point the same direction (vacancy is the opposite pole from amenity domains).</li> <li class="markdown"><strong class="markdown">Very small POI bases produce noisy percentages</strong> — domains flagged † above are based on fewer
than 5 mapped places in this area and should be read cautiously.</li> <li class="markdown"><strong class="markdown">Land value and estimated rent are official reference values, not observed transaction prices.</strong></li> <li class="markdown">Figures are on Berlin&#39;s <strong class="markdown">current (2021+) boundaries</strong> and the live social-monitoring editions
(2021–2025) only — this page does not show the pre-2021 <code class="markdown">standard</code> variant.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,Lt,La,qr='<a href="#further-reading">Further reading</a>',ur,Nt,Mr=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means, the
<a href="/gentriduck/berlin/poi-map" class="markdown">POI &amp; Offering Advantage map</a> for this area&#39;s commercial-mix signal citywide
(including a &quot;citywide context&quot; section for these same signals across all of Berlin),
<a href="/gentriduck/berlin/area-detail" class="markdown">browse by district</a> for other neighbourhoods, or the
<a href="/gentriduck/berlin/time-series" class="markdown">time-series view</a> for how the whole city has moved.`,fr,cr,pr,Wt,lr,ft=typeof N<"u"&&(N.title||((Ur=N.og)==null?void 0:Ur.title))&&N.hide_title!==!0&&si();function qs(e,n){var K;return typeof N<"u"&&(N.title||(K=N.og)!=null&&K.title)?ni:ii}let dr=qs()(s),pt=typeof N=="object"&&oi(),te=s[0]&&rs(s),re=s[1]&&ss(s),se=s[2]&&is(s);g=new Us({props:{crumbs:s[25]}}),y=new Qs({props:{title:s[24]}}),$=new Vs({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence · most granular",title:s[0][0]?s[0][0].area_name:"Neighbourhood",lede:"Status trajectory, commercial-mix development, Offering Advantage, and land value/rent for one Berlin Planungsraum."}});function Dr(e,n){var K;return(K=e[0][0])!=null&&K.bzr_code?di:li}let hr=Dr(s),Na=hr(s),rr=Yr(s[23]),je=[];for(let e=0;e<rr.length;e+=1)je[e]=ns(ts(s,rr,e));Ma=new ht({props:{status:"info",$$slots:{default:[mi]},$$scope:{ctx:s}}});let ie=s[12]&&os(s);d=new as({props:{data:s[12],x:"snapshot_year",y:["This area","District average","Berlin average"],title:"Social status over time, "+(s[0][0]?s[0][0].area_name:"this area")+" (1 = least deprived … 4 = most deprived)",yAxisTitle:"Status class",yMin:"1",yMax:"4",emptySet:"warn",emptyMessage:"No time series for this area."}});let ne=s[3]&&_s(s),oe=s[4]&&cs(s);const Hr=[fi,ui],At=[];function Fr(e,n){return e[11]?0:1}X=Fr(s),ee=At[X]=Hr[X](s),Ue=new $r({props:{data:s[3],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),ma=new $r({props:{data:s[3],value:"dominant_stage",title:"Most common stage",emptySet:"warn"}}),Ce=new $r({props:{data:s[3],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}});let _e=s[5]&&ls(s),ce=s[6]&&ds(s);fa=new ai({props:{data:s[5],x:"snapshot_year",y:"poi_count",series:"poi_category_h",seriesOrder:s[22],title:"Mapped places by category, "+(s[0][0]?s[0][0].area_name:"this area")+" (largest segment first)",yAxisTitle:"Number of mapped places",emptySet:"warn"}});let Ie=s[21]&&s[21].area_top_category&&ms(s),le=s[7]&&us(s),de=s[8]&&fs(s);const zr=[gi,hi],It=[];function Lr(e,n){return e[9].length>0?0:1}Me=Lr(s),De=It[Me]=zr[Me](s);let me=Da&&ps(s),ue=s[13]&&hs(s);const Nr=[bi,vi],Ot=[];function Ar(e,n){return n[0]&8192&&(xt=null),xt==null&&(xt=e[13].filter(Ai).length>0),xt?0:1}Le=Ar(s,[-1,-1,-1,-1,-1]),ae=Ot[Le]=Nr[Le](s);let fe=ut&&gs(s),pe=s[14]&&ys(s),he=s[15]&&ws(s);function Ir(e,n){return e[14][0]?Ei:xi}let gr=Ir(s),Aa=gr(s),be=s[14][0]&&s[14][0].any_indicator_suppressed&&vs(s);Ne=new br({props:{data:s[15],rows:"12",emptySet:"warn",emptyMessage:"No population-register data for this area.",$$slots:{default:[Bi]},$$scope:{ctx:s}}});let ge=s[16]&&bs(s),ye=s[17]&&$s(s);function Or(e,n){var K;return(K=e[16][0])!=null&&K.snapshot_year?Si:Ti}let yr=Or(s),Ia=yr(s);Ra=new br({props:{data:s[17],rows:"8",emptySet:"warn",emptyMessage:"No amenity data for this area.",$$slots:{default:[Ci]},$$scope:{ctx:s}}}),xa=new ht({props:{status:"info",$$slots:{default:[qi]},$$scope:{ctx:s}}});function Pr(e,n){var K,Pt;return(K=e[16][0])!=null&&K.snapshot_year&&e[16][0].gastro_poi_with_cuisine_count>=8&&e[16][0].dominant_cuisine_share>=.15?Hi:(Pt=e[16][0])!=null&&Pt.snapshot_year&&e[16][0].gastro_poi_with_cuisine_count>=8?Di:Mi}let wr=Pr(s),Oa=wr(s);ja=new ht({props:{status:"info",$$slots:{default:[Fi]},$$scope:{ctx:s}}});let we=s[18]&&ks(s);Ae=new as({props:{data:s[18],x:"snapshot_year",y:["est_rent_low","est_rent_mid","est_rent_high","District average (typical)","Berlin average (typical)"],title:"Estimated rent range (EUR/m²), "+(s[0][0]?s[0][0].area_name:"this area"),yAxisTitle:"EUR/m²",emptySet:"warn",emptyMessage:"No price/rent estimate for this area."}}),aa=new br({props:{data:s[18],rows:"10",emptySet:"warn",emptyMessage:"No price/rent estimate for this area.",$$slots:{default:[zi]},$$scope:{ctx:s}}});let ve=s[19]&&Rs(s);return _t=new Ws({props:{data:s[19],geoJsonUrl:`${Cs}/geo/bzr_plr_drilldown.geojson`,title:s[0][0]?s[0][0].area_name:"This area"}}),Wt=new Ks({}),{c(){ft&&ft.c(),t=v(),dr.c(),r=R("meta"),a=R("meta"),pt&&pt.c(),i=kr(),o=v(),te&&te.c(),m=v(),re&&re.c(),l=v(),se&&se.c(),h=v(),C(g.$$.fragment),b=v(),C(y.$$.fragment),H=v(),C($.$$.fragment),A=v(),F=R("p"),D=E("Up: "),Na.c(),I=E(" · "),G=R("a"),G.textContent=z,U=E(" · "),Q=R("a"),Q.textContent=lt,Sa=v(),Y=R("h2"),Ca=R("a"),Ut=E(dt),gt=E(" at a glance"),yt=v();for(let e=0;e<je.length;e+=1)je[e].c();qa=v(),f=R("h2"),f.innerHTML=_r,Qt=v(),C(Ma.$$.fragment),Kt=v(),ie&&ie.c(),V=v(),C(d.$$.fragment),la=v(),Se=R("p"),Se.textContent=wt,Pe=v(),ne&&ne.c(),Pa=v(),oe&&oe.c(),Ua=v(),ee.c(),da=v(),C(Ue.$$.fragment),vt=v(),C(ma.$$.fragment),ua=v(),C(Ce.$$.fragment),Qa=v(),Qe=R("p"),Qe.innerHTML=Vt,bt=v(),xe=R("h2"),xe.innerHTML=Wa,Ka=v(),ra=R("h3"),ra.innerHTML=Gt,$t=v(),qe=R("p"),qe.innerHTML=Va,Ga=v(),_e&&_e.c(),sa=v(),ce&&ce.c(),Ja=v(),C(fa.$$.fragment),pa=v(),Ie&&Ie.c(),Je=v(),We=R("h3"),We.innerHTML=mt,kt=v(),ha=R("p"),ha.innerHTML=Za,ga=v(),le&&le.c(),ya=v(),de&&de.c(),ia=v(),De.c(),Ze=v(),me&&me.c(),wa=v(),He=R("h2"),He.innerHTML=Jt,Rt=v(),Fe=R("p"),Fe.innerHTML=Ya,Xa=v(),ue&&ue.c(),ze=v(),ae.c(),Ye=v(),fe&&fe.c(),na=v(),oa=R("h2"),oa.innerHTML=Zt,va=v(),pe&&pe.c(),Xe=v(),he&&he.c(),ba=v(),Ha=R("p"),Aa.c(),Et=v(),be&&be.c(),et=v(),C(Ne.$$.fragment),$a=v(),_a=R("p"),_a.innerHTML=Yt,jt=v(),Fa=R("p"),Fa.textContent=at,ka=v(),Ke=R("h2"),Ke.innerHTML=Xt,Bt=v(),ge&&ge.c(),tt=v(),ye&&ye.c(),ea=v(),Ve=R("p"),Ia.c(),rt=v(),C(Ra.$$.fragment),Tt=v(),C(xa.$$.fragment),Ea=v(),Ge=R("p"),Oa.c(),st=v(),za=R("p"),za.textContent=er,St=v(),Ee=R("h2"),Ee.innerHTML=it,nt=v(),C(ja.$$.fragment),Ct=v(),we&&we.c(),ot=v(),C(Ae.$$.fragment),Ba=v(),C(aa.$$.fragment),qt=v(),ca=R("h2"),ca.innerHTML=ar,Mt=v(),ve&&ve.c(),Dt=v(),C(_t.$$.fragment),tr=v(),q=R("p"),q.textContent=Ht,M=v(),W=R("h2"),W.innerHTML=Ft,ct=v(),ta=R("ul"),ta.innerHTML=zt,Lt=v(),La=R("h2"),La.innerHTML=qr,ur=v(),Nt=R("p"),Nt.innerHTML=Mr,fr=v(),cr=R("hr"),pr=v(),C(Wt.$$.fragment),this.h()},l(e){ft&&ft.l(e),t=w(e);const n=Hs("svelte-2igo1p",document.head);dr.l(n),r=k(n,"META",{name:!0,content:!0}),a=k(n,"META",{name:!0,content:!0}),pt&&pt.l(n),i=kr(),n.forEach(_),o=w(e),te&&te.l(e),m=w(e),re&&re.l(e),l=w(e),se&&se.l(e),h=w(e),S(g.$$.fragment,e),b=w(e),S(y.$$.fragment,e),H=w(e),S($.$$.fragment,e),A=w(e),F=k(e,"P",{});var K=$e(F);D=x(K,"Up: "),Na.l(K),I=x(K," · "),G=k(K,"A",{href:!0,"data-svelte-h":!0}),L(G)!=="svelte-1i43n98"&&(G.textContent=z),U=x(K," · "),Q=k(K,"A",{href:!0,"data-svelte-h":!0}),L(Q)!=="svelte-6j2qr0"&&(Q.textContent=lt),K.forEach(_),Sa=w(e),Y=k(e,"H2",{class:!0,id:!0});var Pt=$e(Y);Ca=k(Pt,"A",{href:!0});var sr=$e(Ca);Ut=x(sr,dt),gt=x(sr," at a glance"),sr.forEach(_),Pt.forEach(_),yt=w(e);for(let or=0;or<je.length;or+=1)je[or].l(e);qa=w(e),f=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(f)!=="svelte-14f17uo"&&(f.innerHTML=_r),Qt=w(e),S(Ma.$$.fragment,e),Kt=w(e),ie&&ie.l(e),V=w(e),S(d.$$.fragment,e),la=w(e),Se=k(e,"P",{class:!0,"data-svelte-h":!0}),L(Se)!=="svelte-11i1u0l"&&(Se.textContent=wt),Pe=w(e),ne&&ne.l(e),Pa=w(e),oe&&oe.l(e),Ua=w(e),ee.l(e),da=w(e),S(Ue.$$.fragment,e),vt=w(e),S(ma.$$.fragment,e),ua=w(e),S(Ce.$$.fragment,e),Qa=w(e),Qe=k(e,"P",{class:!0,"data-svelte-h":!0}),L(Qe)!=="svelte-dvqlbe"&&(Qe.innerHTML=Vt),bt=w(e),xe=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(xe)!=="svelte-1i9w9pn"&&(xe.innerHTML=Wa),Ka=w(e),ra=k(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(ra)!=="svelte-yatnem"&&(ra.innerHTML=Gt),$t=w(e),qe=k(e,"P",{class:!0,"data-svelte-h":!0}),L(qe)!=="svelte-1s6me3w"&&(qe.innerHTML=Va),Ga=w(e),_e&&_e.l(e),sa=w(e),ce&&ce.l(e),Ja=w(e),S(fa.$$.fragment,e),pa=w(e),Ie&&Ie.l(e),Je=w(e),We=k(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),L(We)!=="svelte-1uvjo0a"&&(We.innerHTML=mt),kt=w(e),ha=k(e,"P",{class:!0,"data-svelte-h":!0}),L(ha)!=="svelte-jskapw"&&(ha.innerHTML=Za),ga=w(e),le&&le.l(e),ya=w(e),de&&de.l(e),ia=w(e),De.l(e),Ze=w(e),me&&me.l(e),wa=w(e),He=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(He)!=="svelte-4kb45v"&&(He.innerHTML=Jt),Rt=w(e),Fe=k(e,"P",{class:!0,"data-svelte-h":!0}),L(Fe)!=="svelte-fdg2k9"&&(Fe.innerHTML=Ya),Xa=w(e),ue&&ue.l(e),ze=w(e),ae.l(e),Ye=w(e),fe&&fe.l(e),na=w(e),oa=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(oa)!=="svelte-1mdzqzc"&&(oa.innerHTML=Zt),va=w(e),pe&&pe.l(e),Xe=w(e),he&&he.l(e),ba=w(e),Ha=k(e,"P",{});var mr=$e(Ha);Aa.l(mr),mr.forEach(_),Et=w(e),be&&be.l(e),et=w(e),S(Ne.$$.fragment,e),$a=w(e),_a=k(e,"P",{"data-svelte-h":!0}),L(_a)!=="svelte-1bydfby"&&(_a.innerHTML=Yt),jt=w(e),Fa=k(e,"P",{"data-svelte-h":!0}),L(Fa)!=="svelte-1yv6nzw"&&(Fa.textContent=at),ka=w(e),Ke=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(Ke)!=="svelte-12k6lqd"&&(Ke.innerHTML=Xt),Bt=w(e),ge&&ge.l(e),tt=w(e),ye&&ye.l(e),ea=w(e),Ve=k(e,"P",{});var ir=$e(Ve);Ia.l(ir),ir.forEach(_),rt=w(e),S(Ra.$$.fragment,e),Tt=w(e),S(xa.$$.fragment,e),Ea=w(e),Ge=k(e,"P",{});var nr=$e(Ge);Oa.l(nr),nr.forEach(_),st=w(e),za=k(e,"P",{"data-svelte-h":!0}),L(za)!=="svelte-ja6pm6"&&(za.textContent=er),St=w(e),Ee=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(Ee)!=="svelte-13a10dj"&&(Ee.innerHTML=it),nt=w(e),S(ja.$$.fragment,e),Ct=w(e),we&&we.l(e),ot=w(e),S(Ae.$$.fragment,e),Ba=w(e),S(aa.$$.fragment,e),qt=w(e),ca=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(ca)!=="svelte-60cjj9"&&(ca.innerHTML=ar),Mt=w(e),ve&&ve.l(e),Dt=w(e),S(_t.$$.fragment,e),tr=w(e),q=k(e,"P",{class:!0,"data-svelte-h":!0}),L(q)!=="svelte-kz3w0c"&&(q.textContent=Ht),M=w(e),W=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(W)!=="svelte-ad0syq"&&(W.innerHTML=Ft),ct=w(e),ta=k(e,"UL",{class:!0,"data-svelte-h":!0}),L(ta)!=="svelte-hyrhc3"&&(ta.innerHTML=zt),Lt=w(e),La=k(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),L(La)!=="svelte-oimjns"&&(La.innerHTML=qr),ur=w(e),Nt=k(e,"P",{class:!0,"data-svelte-h":!0}),L(Nt)!=="svelte-k1wi1g"&&(Nt.innerHTML=Mr),fr=w(e),cr=k(e,"HR",{class:!0}),pr=w(e),S(Wt.$$.fragment,e),this.h()},h(){j(r,"name","twitter:card"),j(r,"content","summary_large_image"),j(a,"name","twitter:site"),j(a,"content","@evidence_dev"),j(G,"href","/gentriduck/berlin/area-detail"),j(Q,"href","/gentriduck/berlin/area/bezirk"),j(Ca,"href","#area_info0--area_info0area_name--this-area-at-a-glance"),j(Y,"class","markdown"),j(Y,"id","area_info0--area_info0area_name--this-area-at-a-glance"),j(f,"class","markdown"),j(f,"id","social-status--trajectory"),j(Se,"class","markdown"),j(Qe,"class","markdown"),j(xe,"class","markdown"),j(xe,"id","commercial-mix--offering-advantage"),j(ra,"class","markdown"),j(ra,"id","how-its-commercial-mix-has-developed"),j(qe,"class","markdown"),j(We,"class","markdown"),j(We,"id","offering-advantage-profile"),j(ha,"class","markdown"),j(He,"class","markdown"),j(He,"id","within-group-dominance"),j(Fe,"class","markdown"),j(oa,"class","markdown"),j(oa,"id","people--structure"),j(Ke,"class","markdown"),j(Ke,"id","amenities--everyday-infrastructure"),j(Ee,"class","markdown"),j(Ee,"id","land-value--estimated-rent"),j(ca,"class","markdown"),j(ca,"id","where-this-area-sits"),j(q,"class","markdown"),j(W,"class","markdown"),j(W,"id","honest-caveats"),j(ta,"class","markdown"),j(La,"class","markdown"),j(La,"id","further-reading"),j(Nt,"class","markdown"),j(cr,"class","markdown")},m(e,n){ft&&ft.m(e,n),c(e,t,n),dr.m(document.head,null),P(document.head,r),P(document.head,a),pt&&pt.m(document.head,null),P(document.head,i),c(e,o,n),te&&te.m(e,n),c(e,m,n),re&&re.m(e,n),c(e,l,n),se&&se.m(e,n),c(e,h,n),T(g,e,n),c(e,b,n),T(y,e,n),c(e,H,n),T($,e,n),c(e,A,n),c(e,F,n),P(F,D),Na.m(F,null),P(F,I),P(F,G),P(F,U),P(F,Q),c(e,Sa,n),c(e,Y,n),P(Y,Ca),P(Ca,Ut),P(Ca,gt),c(e,yt,n);for(let K=0;K<je.length;K+=1)je[K]&&je[K].m(e,n);c(e,qa,n),c(e,f,n),c(e,Qt,n),T(Ma,e,n),c(e,Kt,n),ie&&ie.m(e,n),c(e,V,n),T(d,e,n),c(e,la,n),c(e,Se,n),c(e,Pe,n),ne&&ne.m(e,n),c(e,Pa,n),oe&&oe.m(e,n),c(e,Ua,n),At[X].m(e,n),c(e,da,n),T(Ue,e,n),c(e,vt,n),T(ma,e,n),c(e,ua,n),T(Ce,e,n),c(e,Qa,n),c(e,Qe,n),c(e,bt,n),c(e,xe,n),c(e,Ka,n),c(e,ra,n),c(e,$t,n),c(e,qe,n),c(e,Ga,n),_e&&_e.m(e,n),c(e,sa,n),ce&&ce.m(e,n),c(e,Ja,n),T(fa,e,n),c(e,pa,n),Ie&&Ie.m(e,n),c(e,Je,n),c(e,We,n),c(e,kt,n),c(e,ha,n),c(e,ga,n),le&&le.m(e,n),c(e,ya,n),de&&de.m(e,n),c(e,ia,n),It[Me].m(e,n),c(e,Ze,n),me&&me.m(e,n),c(e,wa,n),c(e,He,n),c(e,Rt,n),c(e,Fe,n),c(e,Xa,n),ue&&ue.m(e,n),c(e,ze,n),Ot[Le].m(e,n),c(e,Ye,n),fe&&fe.m(e,n),c(e,na,n),c(e,oa,n),c(e,va,n),pe&&pe.m(e,n),c(e,Xe,n),he&&he.m(e,n),c(e,ba,n),c(e,Ha,n),Aa.m(Ha,null),c(e,Et,n),be&&be.m(e,n),c(e,et,n),T(Ne,e,n),c(e,$a,n),c(e,_a,n),c(e,jt,n),c(e,Fa,n),c(e,ka,n),c(e,Ke,n),c(e,Bt,n),ge&&ge.m(e,n),c(e,tt,n),ye&&ye.m(e,n),c(e,ea,n),c(e,Ve,n),Ia.m(Ve,null),c(e,rt,n),T(Ra,e,n),c(e,Tt,n),T(xa,e,n),c(e,Ea,n),c(e,Ge,n),Oa.m(Ge,null),c(e,st,n),c(e,za,n),c(e,St,n),c(e,Ee,n),c(e,nt,n),T(ja,e,n),c(e,Ct,n),we&&we.m(e,n),c(e,ot,n),T(Ae,e,n),c(e,Ba,n),T(aa,e,n),c(e,qt,n),c(e,ca,n),c(e,Mt,n),ve&&ve.m(e,n),c(e,Dt,n),T(_t,e,n),c(e,tr,n),c(e,q,n),c(e,M,n),c(e,W,n),c(e,ct,n),c(e,ta,n),c(e,Lt,n),c(e,La,n),c(e,ur,n),c(e,Nt,n),c(e,fr,n),c(e,cr,n),c(e,pr,n),T(Wt,e,n),lr=!0},p(e,n){var Gr;typeof N<"u"&&(N.title||(Gr=N.og)!=null&&Gr.title)&&N.hide_title!==!0&&ft.p(e,n),dr.p(e,n),typeof N=="object"&&pt.p(e,n),e[0]?te?(te.p(e,n),n[0]&1&&u(te,1)):(te=rs(e),te.c(),u(te,1),te.m(m.parentNode,m)):te&&(Z(),p(te,1,1,()=>{te=null}),J()),e[1]?re?(re.p(e,n),n[0]&2&&u(re,1)):(re=ss(e),re.c(),u(re,1),re.m(l.parentNode,l)):re&&(Z(),p(re,1,1,()=>{re=null}),J()),e[2]?se?(se.p(e,n),n[0]&4&&u(se,1)):(se=is(e),se.c(),u(se,1),se.m(h.parentNode,h)):se&&(Z(),p(se,1,1,()=>{se=null}),J());const K={};n[0]&33554432&&(K.crumbs=e[25]),g.$set(K);const Pt={};n[0]&16777216&&(Pt.title=e[24]),y.$set(Pt);const sr={};if(n[0]&1&&(sr.title=e[0][0]?e[0][0].area_name:"Neighbourhood"),$.$set(sr),hr===(hr=Dr(e))&&Na?Na.p(e,n):(Na.d(1),Na=hr(e),Na&&(Na.c(),Na.m(F,I))),(!lr||n[0]&1)&&dt!==(dt=(e[0][0]?e[0][0].area_name:"This area")+"")&&Oe(Ut,dt),n[0]&8388608){rr=Yr(e[23]);let Ta;for(Ta=0;Ta<rr.length;Ta+=1){const Jr=ts(e,rr,Ta);je[Ta]?je[Ta].p(Jr,n):(je[Ta]=ns(Jr),je[Ta].c(),je[Ta].m(qa.parentNode,qa))}for(;Ta<je.length;Ta+=1)je[Ta].d(1);je.length=rr.length}const mr={};n[4]&4194304&&(mr.$$scope={dirty:n,ctx:e}),Ma.$set(mr),e[12]?ie?(ie.p(e,n),n[0]&4096&&u(ie,1)):(ie=os(e),ie.c(),u(ie,1),ie.m(V.parentNode,V)):ie&&(Z(),p(ie,1,1,()=>{ie=null}),J());const ir={};n[0]&4096&&(ir.data=e[12]),n[0]&1&&(ir.title="Social status over time, "+(e[0][0]?e[0][0].area_name:"this area")+" (1 = least deprived … 4 = most deprived)"),d.$set(ir),e[3]?ne?(ne.p(e,n),n[0]&8&&u(ne,1)):(ne=_s(e),ne.c(),u(ne,1),ne.m(Pa.parentNode,Pa)):ne&&(Z(),p(ne,1,1,()=>{ne=null}),J()),e[4]?oe?(oe.p(e,n),n[0]&16&&u(oe,1)):(oe=cs(e),oe.c(),u(oe,1),oe.m(Ua.parentNode,Ua)):oe&&(Z(),p(oe,1,1,()=>{oe=null}),J());let nr=X;X=Fr(e),X===nr?At[X].p(e,n):(Z(),p(At[nr],1,1,()=>{At[nr]=null}),J(),ee=At[X],ee?ee.p(e,n):(ee=At[X]=Hr[X](e),ee.c()),u(ee,1),ee.m(da.parentNode,da));const or={};n[0]&8&&(or.data=e[3]),Ue.$set(or);const Qr={};n[0]&8&&(Qr.data=e[3]),ma.$set(Qr);const Wr={};n[0]&8&&(Wr.data=e[3]),Ce.$set(Wr),e[5]?_e?(_e.p(e,n),n[0]&32&&u(_e,1)):(_e=ls(e),_e.c(),u(_e,1),_e.m(sa.parentNode,sa)):_e&&(Z(),p(_e,1,1,()=>{_e=null}),J()),e[6]?ce?(ce.p(e,n),n[0]&64&&u(ce,1)):(ce=ds(e),ce.c(),u(ce,1),ce.m(Ja.parentNode,Ja)):ce&&(Z(),p(ce,1,1,()=>{ce=null}),J());const vr={};n[0]&32&&(vr.data=e[5]),n[0]&4194304&&(vr.seriesOrder=e[22]),n[0]&1&&(vr.title="Mapped places by category, "+(e[0][0]?e[0][0].area_name:"this area")+" (largest segment first)"),fa.$set(vr),e[21]&&e[21].area_top_category?Ie?Ie.p(e,n):(Ie=ms(e),Ie.c(),Ie.m(Je.parentNode,Je)):Ie&&(Ie.d(1),Ie=null),e[7]?le?(le.p(e,n),n[0]&128&&u(le,1)):(le=us(e),le.c(),u(le,1),le.m(ya.parentNode,ya)):le&&(Z(),p(le,1,1,()=>{le=null}),J()),e[8]?de?(de.p(e,n),n[0]&256&&u(de,1)):(de=fs(e),de.c(),u(de,1),de.m(ia.parentNode,ia)):de&&(Z(),p(de,1,1,()=>{de=null}),J());let Rr=Me;Me=Lr(e),Me===Rr?It[Me].p(e,n):(Z(),p(It[Rr],1,1,()=>{It[Rr]=null}),J(),De=It[Me],De?De.p(e,n):(De=It[Me]=zr[Me](e),De.c()),u(De,1),De.m(Ze.parentNode,Ze)),n[0]&512&&(Da=e[9].some(Es)),Da?me?(me.p(e,n),n[0]&512&&u(me,1)):(me=ps(e),me.c(),u(me,1),me.m(wa.parentNode,wa)):me&&(Z(),p(me,1,1,()=>{me=null}),J()),e[13]?ue?(ue.p(e,n),n[0]&8192&&u(ue,1)):(ue=hs(e),ue.c(),u(ue,1),ue.m(ze.parentNode,ze)):ue&&(Z(),p(ue,1,1,()=>{ue=null}),J());let xr=Le;Le=Ar(e,n),Le===xr?Ot[Le].p(e,n):(Z(),p(Ot[xr],1,1,()=>{Ot[xr]=null}),J(),ae=Ot[Le],ae?ae.p(e,n):(ae=Ot[Le]=Nr[Le](e),ae.c()),u(ae,1),ae.m(Ye.parentNode,Ye)),n[0]&8192&&(ut=e[13].some(xs)),ut?fe?(fe.p(e,n),n[0]&8192&&u(fe,1)):(fe=gs(e),fe.c(),u(fe,1),fe.m(na.parentNode,na)):fe&&(Z(),p(fe,1,1,()=>{fe=null}),J()),e[14]?pe?(pe.p(e,n),n[0]&16384&&u(pe,1)):(pe=ys(e),pe.c(),u(pe,1),pe.m(Xe.parentNode,Xe)):pe&&(Z(),p(pe,1,1,()=>{pe=null}),J()),e[15]?he?(he.p(e,n),n[0]&32768&&u(he,1)):(he=ws(e),he.c(),u(he,1),he.m(ba.parentNode,ba)):he&&(Z(),p(he,1,1,()=>{he=null}),J()),gr===(gr=Ir(e))&&Aa?Aa.p(e,n):(Aa.d(1),Aa=gr(e),Aa&&(Aa.c(),Aa.m(Ha,null))),e[14][0]&&e[14][0].any_indicator_suppressed?be?n[0]&16384&&u(be,1):(be=vs(e),be.c(),u(be,1),be.m(et.parentNode,et)):be&&(Z(),p(be,1,1,()=>{be=null}),J());const Er={};n[0]&32768&&(Er.data=e[15]),n[4]&4194304&&(Er.$$scope={dirty:n,ctx:e}),Ne.$set(Er),e[16]?ge?(ge.p(e,n),n[0]&65536&&u(ge,1)):(ge=bs(e),ge.c(),u(ge,1),ge.m(tt.parentNode,tt)):ge&&(Z(),p(ge,1,1,()=>{ge=null}),J()),e[17]?ye?(ye.p(e,n),n[0]&131072&&u(ye,1)):(ye=$s(e),ye.c(),u(ye,1),ye.m(ea.parentNode,ea)):ye&&(Z(),p(ye,1,1,()=>{ye=null}),J()),yr===(yr=Or(e))&&Ia?Ia.p(e,n):(Ia.d(1),Ia=yr(e),Ia&&(Ia.c(),Ia.m(Ve,null)));const jr={};n[0]&131072&&(jr.data=e[17]),n[4]&4194304&&(jr.$$scope={dirty:n,ctx:e}),Ra.$set(jr);const Kr={};n[4]&4194304&&(Kr.$$scope={dirty:n,ctx:e}),xa.$set(Kr),wr===(wr=Pr(e))&&Oa?Oa.p(e,n):(Oa.d(1),Oa=wr(e),Oa&&(Oa.c(),Oa.m(Ge,null)));const Vr={};n[4]&4194304&&(Vr.$$scope={dirty:n,ctx:e}),ja.$set(Vr),e[18]?we?(we.p(e,n),n[0]&262144&&u(we,1)):(we=ks(e),we.c(),u(we,1),we.m(ot.parentNode,ot)):we&&(Z(),p(we,1,1,()=>{we=null}),J());const Br={};n[0]&262144&&(Br.data=e[18]),n[0]&1&&(Br.title="Estimated rent range (EUR/m²), "+(e[0][0]?e[0][0].area_name:"this area")),Ae.$set(Br);const Tr={};n[0]&262144&&(Tr.data=e[18]),n[4]&4194304&&(Tr.$$scope={dirty:n,ctx:e}),aa.$set(Tr),e[19]?ve?(ve.p(e,n),n[0]&524288&&u(ve,1)):(ve=Rs(e),ve.c(),u(ve,1),ve.m(Dt.parentNode,Dt)):ve&&(Z(),p(ve,1,1,()=>{ve=null}),J());const Sr={};n[0]&524288&&(Sr.data=e[19]),n[0]&1&&(Sr.title=e[0][0]?e[0][0].area_name:"This area"),_t.$set(Sr)},i(e){lr||(u(te),u(re),u(se),u(g.$$.fragment,e),u(y.$$.fragment,e),u($.$$.fragment,e),u(Ma.$$.fragment,e),u(ie),u(d.$$.fragment,e),u(ne),u(oe),u(ee),u(Ue.$$.fragment,e),u(ma.$$.fragment,e),u(Ce.$$.fragment,e),u(_e),u(ce),u(fa.$$.fragment,e),u(le),u(de),u(De),u(me),u(ue),u(ae),u(fe),u(pe),u(he),u(be),u(Ne.$$.fragment,e),u(ge),u(ye),u(Ra.$$.fragment,e),u(xa.$$.fragment,e),u(ja.$$.fragment,e),u(we),u(Ae.$$.fragment,e),u(aa.$$.fragment,e),u(ve),u(_t.$$.fragment,e),u(Wt.$$.fragment,e),lr=!0)},o(e){p(te),p(re),p(se),p(g.$$.fragment,e),p(y.$$.fragment,e),p($.$$.fragment,e),p(Ma.$$.fragment,e),p(ie),p(d.$$.fragment,e),p(ne),p(oe),p(ee),p(Ue.$$.fragment,e),p(ma.$$.fragment,e),p(Ce.$$.fragment,e),p(_e),p(ce),p(fa.$$.fragment,e),p(le),p(de),p(De),p(me),p(ue),p(ae),p(fe),p(pe),p(he),p(be),p(Ne.$$.fragment,e),p(ge),p(ye),p(Ra.$$.fragment,e),p(xa.$$.fragment,e),p(ja.$$.fragment,e),p(we),p(Ae.$$.fragment,e),p(aa.$$.fragment,e),p(ve),p(_t.$$.fragment,e),p(Wt.$$.fragment,e),lr=!1},d(e){e&&(_(t),_(o),_(m),_(l),_(h),_(b),_(H),_(A),_(F),_(Sa),_(Y),_(yt),_(qa),_(f),_(Qt),_(Kt),_(V),_(la),_(Se),_(Pe),_(Pa),_(Ua),_(da),_(vt),_(ua),_(Qa),_(Qe),_(bt),_(xe),_(Ka),_(ra),_($t),_(qe),_(Ga),_(sa),_(Ja),_(pa),_(Je),_(We),_(kt),_(ha),_(ga),_(ya),_(ia),_(Ze),_(wa),_(He),_(Rt),_(Fe),_(Xa),_(ze),_(Ye),_(na),_(oa),_(va),_(Xe),_(ba),_(Ha),_(Et),_(et),_($a),_(_a),_(jt),_(Fa),_(ka),_(Ke),_(Bt),_(tt),_(ea),_(Ve),_(rt),_(Tt),_(Ea),_(Ge),_(st),_(za),_(St),_(Ee),_(nt),_(Ct),_(ot),_(Ba),_(qt),_(ca),_(Mt),_(Dt),_(tr),_(q),_(M),_(W),_(ct),_(ta),_(Lt),_(La),_(ur),_(Nt),_(fr),_(cr),_(pr)),ft&&ft.d(e),dr.d(e),_(r),_(a),pt&&pt.d(e),_(i),te&&te.d(e),re&&re.d(e),se&&se.d(e),B(g,e),B(y,e),B($,e),Na.d(),Ds(je,e),B(Ma,e),ie&&ie.d(e),B(d,e),ne&&ne.d(e),oe&&oe.d(e),At[X].d(e),B(Ue,e),B(ma,e),B(Ce,e),_e&&_e.d(e),ce&&ce.d(e),B(fa,e),Ie&&Ie.d(e),le&&le.d(e),de&&de.d(e),It[Me].d(e),me&&me.d(e),ue&&ue.d(e),Ot[Le].d(e),fe&&fe.d(e),pe&&pe.d(e),he&&he.d(e),Aa.d(),be&&be.d(e),B(Ne,e),ge&&ge.d(e),ye&&ye.d(e),Ia.d(),B(Ra,e),B(xa,e),Oa.d(),B(ja,e),we&&we.d(e),B(Ae,e),B(aa,e),ve&&ve.d(e),B(_t,e),B(Wt,e)}}}const N={},Ni=5,Cr=5,xs=s=>s.is_thin_base,Ai=s=>!s.is_thin_base,Es=s=>s.lowBase,js=s=>s.lowBase,Bs=s=>`${s.domain} (${s.poiCount??0})`,Ts=s=>!s.is_thin_base,Ss=s=>s.is_thin_base;function Ii(s,t,r){let a,i,o,m,l,h,g,b,y,H,$,A,F,D,I,G,z,U,Q,lt,Sa,Y,Ca,dt,Ut,gt,yt;Zr(s,ei,q=>r(113,gt=q)),Zr(s,es,q=>r(118,yt=q));let{data:qa}=t,{data:f={},customFormattingSettings:_r,__db:Qt,inputs:Ma}=qa;Fs(es,yt="40c65ae01ec9f4363d3b5188faa4d064",yt);let Kt=Js(Gs(Ma));zs(Kt.subscribe(q=>Ma=q)),Ls(Xs,{getCustomFormats:()=>_r.customFormats||[]});const V=(q,Ht)=>ri(Qt.query,q,{query_name:Ht});Zs(V);let d=gt.params;Ns(()=>!0);let la={initialData:void 0,initialError:void 0},Se=O`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`,wt=`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`;f.area_info_data&&(f.area_info_data instanceof Error?la.initialError=f.area_info_data:la.initialData=f.area_info_data,f.area_info_columns&&(la.knownColumns=f.area_info_columns));let Pe,Pa=!1;const Ua=Be.createReactive({callback:q=>{r(0,Pe=q)},execFn:V},{id:"area_info",...la});Ua(wt,{noResolve:Se,...la}),globalThis[Symbol.for("area_info")]={get value(){return Pe}};let X={initialData:void 0,initialError:void 0},ee=O`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
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
    end as bezirk_name`,da=`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
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
    end as bezirk_name`;f.district_info_data&&(f.district_info_data instanceof Error?X.initialError=f.district_info_data:X.initialData=f.district_info_data,f.district_info_columns&&(X.knownColumns=f.district_info_columns));let Ue,vt=!1;const ma=Be.createReactive({callback:q=>{r(1,Ue=q)},execFn:V},{id:"district_info",...X});ma(da,{noResolve:ee,...X}),globalThis[Symbol.for("district_info")]={get value(){return Ue}};let ua={initialData:void 0,initialError:void 0},Ce=O`-- Current (latest published period) status/pressure for this area, plus the simple district and
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
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`,Qa=`-- Current (latest published period) status/pressure for this area, plus the simple district and
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
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`;f.context_current_data&&(f.context_current_data instanceof Error?ua.initialError=f.context_current_data:ua.initialData=f.context_current_data,f.context_current_columns&&(ua.knownColumns=f.context_current_columns));let Qe,Vt=!1;const bt=Be.createReactive({callback:q=>{r(2,Qe=q)},execFn:V},{id:"context_current",...ua});bt(Qa,{noResolve:Ce,...ua}),globalThis[Symbol.for("context_current")]={get value(){return Qe}};let xe={initialData:void 0,initialError:void 0},Wa=O`with
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
order by a.snapshot_year`,Ka=`with
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
order by a.snapshot_year`;f.area_trend_data&&(f.area_trend_data instanceof Error?xe.initialError=f.area_trend_data:xe.initialData=f.area_trend_data,f.area_trend_columns&&(xe.knownColumns=f.area_trend_columns));let ra,Gt=!1;const $t=Be.createReactive({callback:q=>{r(12,ra=q)},execFn:V},{id:"area_trend",...xe});$t(Ka,{noResolve:Wa,...xe}),globalThis[Symbol.for("area_trend")]={get value(){return ra}};let qe={initialData:void 0,initialError:void 0},Va=O`select
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`,Ga=`select
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`;f.trajectory_summary_data&&(f.trajectory_summary_data instanceof Error?qe.initialError=f.trajectory_summary_data:qe.initialData=f.trajectory_summary_data,f.trajectory_summary_columns&&(qe.knownColumns=f.trajectory_summary_columns));let sa,Ja=!1;const fa=Be.createReactive({callback:q=>{r(3,sa=q)},execFn:V},{id:"trajectory_summary",...qe});fa(Ga,{noResolve:Va,...qe}),globalThis[Symbol.for("trajectory_summary")]={get value(){return sa}};let pa={initialData:void 0,initialError:void 0},Je=O`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`,We=`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`;f.district_trajectory_mix_data&&(f.district_trajectory_mix_data instanceof Error?pa.initialError=f.district_trajectory_mix_data:pa.initialData=f.district_trajectory_mix_data,f.district_trajectory_mix_columns&&(pa.knownColumns=f.district_trajectory_mix_columns));let mt,kt=!1;const ha=Be.createReactive({callback:q=>{r(4,mt=q)},execFn:V},{id:"district_trajectory_mix",...pa});ha(We,{noResolve:Je,...pa}),globalThis[Symbol.for("district_trajectory_mix")]={get value(){return mt}};let Za={initialData:void 0,initialError:void 0},ga=O`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`,ya=`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`;f.poi_trend_data&&(f.poi_trend_data instanceof Error?Za.initialError=f.poi_trend_data:Za.initialData=f.poi_trend_data,f.poi_trend_columns&&(Za.knownColumns=f.poi_trend_columns));let ia,Me=!1;const De=Be.createReactive({callback:q=>{r(5,ia=q)},execFn:V},{id:"poi_trend",...Za});De(ya,{noResolve:ga,...Za}),globalThis[Symbol.for("poi_trend")]={get value(){return ia}};let Ze={initialData:void 0,initialError:void 0},Da=O`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`,wa=`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`;f.poi_mix_context_data&&(f.poi_mix_context_data instanceof Error?Ze.initialError=f.poi_mix_context_data:Ze.initialData=f.poi_mix_context_data,f.poi_mix_context_columns&&(Ze.knownColumns=f.poi_mix_context_columns));let He,Jt=!1;const Rt=Be.createReactive({callback:q=>{r(6,He=q)},execFn:V},{id:"poi_mix_context",...Ze});Rt(wa,{noResolve:Da,...Ze}),globalThis[Symbol.for("poi_mix_context")]={get value(){return He}};let Fe={initialData:void 0,initialError:void 0},Ya=O`select
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
order by oa_domain desc`,Xa=`select
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
order by oa_domain desc`;f.poi_oa_radar_data&&(f.poi_oa_radar_data instanceof Error?Fe.initialError=f.poi_oa_radar_data:Fe.initialData=f.poi_oa_radar_data,f.poi_oa_radar_columns&&(Fe.knownColumns=f.poi_oa_radar_columns));let ze,xt=!1;const Le=Be.createReactive({callback:q=>{r(7,ze=q)},execFn:V},{id:"poi_oa_radar",...Fe});Le(Xa,{noResolve:Ya,...Fe}),globalThis[Symbol.for("poi_oa_radar")]={get value(){return ze}};let ae={initialData:void 0,initialError:void 0},Ye=O`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
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
group by poi_domain_h`,ut=`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
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
group by poi_domain_h`;f.poi_oa_radar_district_data&&(f.poi_oa_radar_district_data instanceof Error?ae.initialError=f.poi_oa_radar_district_data:ae.initialData=f.poi_oa_radar_district_data,f.poi_oa_radar_district_columns&&(ae.knownColumns=f.poi_oa_radar_district_columns));let na,oa=!1;const Zt=Be.createReactive({callback:q=>{r(8,na=q)},execFn:V},{id:"poi_oa_radar_district",...ae});Zt(ut,{noResolve:Ye,...ae}),globalThis[Symbol.for("poi_oa_radar_district")]={get value(){return na}};let va={initialData:void 0,initialError:void 0},Xe=O`select
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
order by hhi desc`,ba=`select
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
order by hhi desc`;f.dominance_area_data&&(f.dominance_area_data instanceof Error?va.initialError=f.dominance_area_data:va.initialData=f.dominance_area_data,f.dominance_area_columns&&(va.knownColumns=f.dominance_area_columns));let Ha,Et=!1;const et=Be.createReactive({callback:q=>{r(13,Ha=q)},execFn:V},{id:"dominance_area",...va});et(ba,{noResolve:Xe,...va}),globalThis[Symbol.for("dominance_area")]={get value(){return Ha}};let Ne={initialData:void 0,initialError:void 0},$a=O`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`,_a=`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`;f.demographics_current_data&&(f.demographics_current_data instanceof Error?Ne.initialError=f.demographics_current_data:Ne.initialData=f.demographics_current_data,f.demographics_current_columns&&(Ne.knownColumns=f.demographics_current_columns));let Yt,jt=!1;const Fa=Be.createReactive({callback:q=>{r(14,Yt=q)},execFn:V},{id:"demographics_current",...Ne});Fa(_a,{noResolve:$a,...Ne}),globalThis[Symbol.for("demographics_current")]={get value(){return Yt}};let at={initialData:void 0,initialError:void 0},ka=O`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
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
order by sort_order`,Ke=`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
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
order by sort_order`;f.demographics_table_data&&(f.demographics_table_data instanceof Error?at.initialError=f.demographics_table_data:at.initialData=f.demographics_table_data,f.demographics_table_columns&&(at.knownColumns=f.demographics_table_columns));let Xt,Bt=!1;const tt=Be.createReactive({callback:q=>{r(15,Xt=q)},execFn:V},{id:"demographics_table",...at});tt(Ke,{noResolve:ka,...at}),globalThis[Symbol.for("demographics_table")]={get value(){return Xt}};let ea={initialData:void 0,initialError:void 0},Ve=O`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`,rt=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`;f.amenities_current_data&&(f.amenities_current_data instanceof Error?ea.initialError=f.amenities_current_data:ea.initialData=f.amenities_current_data,f.amenities_current_columns&&(ea.knownColumns=f.amenities_current_columns));let Ra,Tt=!1;const xa=Be.createReactive({callback:q=>{r(16,Ra=q)},execFn:V},{id:"amenities_current",...ea});xa(rt,{noResolve:Ve,...ea}),globalThis[Symbol.for("amenities_current")]={get value(){return Ra}};let Ea={initialData:void 0,initialError:void 0},Ge=O`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
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
order by sort_order`,st=`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
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
order by sort_order`;f.amenities_table_data&&(f.amenities_table_data instanceof Error?Ea.initialError=f.amenities_table_data:Ea.initialData=f.amenities_table_data,f.amenities_table_columns&&(Ea.knownColumns=f.amenities_table_columns));let za,er=!1;const St=Be.createReactive({callback:q=>{r(17,za=q)},execFn:V},{id:"amenities_table",...Ea});St(st,{noResolve:Ge,...Ea}),globalThis[Symbol.for("amenities_table")]={get value(){return za}};let Ee={initialData:void 0,initialError:void 0},it=O`with
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
order by p.snapshot_year`,nt=`with
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
order by p.snapshot_year`;f.price_rent_data&&(f.price_rent_data instanceof Error?Ee.initialError=f.price_rent_data:Ee.initialData=f.price_rent_data,f.price_rent_columns&&(Ee.knownColumns=f.price_rent_columns));let ja,Ct=!1;const ot=Be.createReactive({callback:q=>{r(18,ja=q)},execFn:V},{id:"price_rent",...Ee});ot(nt,{noResolve:it,...Ee}),globalThis[Symbol.for("price_rent")]={get value(){return ja}};let Ae={initialData:void 0,initialError:void 0},Ba=O`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`,aa=`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?Ae.initialError=f.minimap_areas_data:Ae.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(Ae.knownColumns=f.minimap_areas_columns));let qt,ca=!1;const ar=Be.createReactive({callback:q=>{r(19,qt=q)},execFn:V},{id:"minimap_areas",...Ae});ar(aa,{noResolve:Ba,...Ae}),globalThis[Symbol.for("minimap_areas")]={get value(){return qt}};const Mt=()=>Pe!=null&&Pe[0]?Pe[0].area_name:"This area",Dt={"stable-established":"classified **stable-established** — consistently low deprivation, with no sign of an active gentrification-type process","pre-gentrification":"classified **pre-gentrification** — still comparatively deprived, and not yet showing the upward status movement that would signal an active process","pioneer-signal":"showing a **pioneer signal** — an early, small-scale upward shift in status, the kind of movement that sometimes precedes wider gentrification pressure","active-gentrification":"in **active-gentrification** — the strongest form of the upward-status pressure this site tracks","consolidation-pressure":"under **consolidation pressure** — status is already comparatively high and continuing to firm up, consistent with a later stage of the process","improving-vulnerable":'a named, deliberately ambiguous **"improving-vulnerable"** case — status is improving even though the area remains comparatively deprived; the site reports this combination without resolving it (see methodology)'},_t=q=>q.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\[([^\]]+)\]\((\/[^)]*)\)/g,(Ht,M,W)=>'<a href="'+Cs+W+'">'+M+"</a>"),tr=-100;return s.$$set=q=>{"data"in q&&r(26,qa=q.data)},s.$$.update=()=>{var q,Ht;s.$$.dirty[0]&67108864&&r(27,{data:f={},customFormattingSettings:_r,__db:Qt}=qa,f),s.$$.dirty[0]&134217728&&Ys.set(Object.keys(f).length>0),s.$$.dirty[3]&1048576&&r(28,d=gt.params),s.$$.dirty[0]&268435456&&r(30,Se=O`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`),s.$$.dirty[0]&268435456&&r(31,wt=`select area_name, city_code, substr(area_code, 1, 6) as bzr_code
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and area_code = '${d.code}'
order by period_yyyymm desc
limit 1`),s.$$.dirty[0]&1610612736|s.$$.dirty[1]&3&&(Se||!Pa?Se||(Ua(wt,{noResolve:Se,...la}),r(32,Pa=!0)):Ua(wt,{noResolve:Se})),s.$$.dirty[0]&268435456&&r(34,ee=O`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
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
    end as bezirk_name`),s.$$.dirty[0]&268435456&&r(35,da=`-- Fixed 12-entry Bezirk-code -> name lookup, mirroring the labels already hardcoded in
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
    end as bezirk_name`),s.$$.dirty[1]&60&&(ee||!vt?ee||(ma(da,{noResolve:ee,...X}),r(36,vt=!0)):ma(da,{noResolve:ee})),s.$$.dirty[0]&268435456&&r(38,Ce=O`-- Current (latest published period) status/pressure for this area, plus the simple district and
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
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`),s.$$.dirty[0]&268435456&&r(39,Qa=`-- Current (latest published period) status/pressure for this area, plus the simple district and
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
    and gi.period_yyyymm = (select period_yyyymm from latest_period)`),s.$$.dirty[1]&960&&(Ce||!Vt?Ce||(bt(Qa,{noResolve:Ce,...ua}),r(40,Vt=!0)):bt(Qa,{noResolve:Ce})),s.$$.dirty[0]&268435456&&r(42,Wa=O`with
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
order by a.snapshot_year`),s.$$.dirty[0]&268435456&&r(43,Ka=`with
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
order by a.snapshot_year`),s.$$.dirty[1]&15360&&(Wa||!Gt?Wa||($t(Ka,{noResolve:Wa,...xe}),r(44,Gt=!0)):$t(Ka,{noResolve:Wa})),s.$$.dirty[0]&268435456&&r(46,Va=O`select
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`),s.$$.dirty[0]&268435456&&r(47,Ga=`select
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
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'`),s.$$.dirty[1]&245760&&(Va||!Ja?Va||(fa(Ga,{noResolve:Va,...qe}),r(48,Ja=!0)):fa(Ga,{noResolve:Va})),s.$$.dirty[0]&268435456&&r(50,Je=O`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`),s.$$.dirty[0]&268435456&&r(51,We=`select trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory
where
    city_code = 'BER' and area_vintage = 'lor_2021'
    and substr(area_code, 1, 2) = substr('${d.code}', 1, 2)
group by trajectory_type`),s.$$.dirty[1]&3932160&&(Je||!kt?Je||(ha(We,{noResolve:Je,...pa}),r(52,kt=!0)):ha(We,{noResolve:Je})),s.$$.dirty[0]&268435456&&r(54,ga=O`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`),s.$$.dirty[0]&268435456&&r(55,ya=`select
    snapshot_year,
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER' and area_vintage = 'lor_2021' and area_code = '${d.code}'
group by all
order by snapshot_year`),s.$$.dirty[1]&62914560&&(ga||!Me?ga||(De(ya,{noResolve:ga,...Za}),r(56,Me=!0)):De(ya,{noResolve:ga})),s.$$.dirty[0]&268435456&&r(58,Da=O`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),s.$$.dirty[0]&268435456&&r(59,wa=`-- Latest-year top category here vs. this area's district vs. citywide -- textual context for the
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
    (select poi_category_h from city_mix order by poi_count desc limit 1) as city_top_category`),s.$$.dirty[1]&1006632960&&(Da||!Jt?Da||(Rt(wa,{noResolve:Da,...Ze}),r(60,Jt=!0)):Rt(wa,{noResolve:Da})),s.$$.dirty[0]&268435456&&r(62,Ya=O`select
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
order by oa_domain desc`),s.$$.dirty[0]&268435456&&r(63,Xa=`select
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
order by oa_domain desc`),s.$$.dirty[1]&1073741824|s.$$.dirty[2]&7&&(Ya||!xt?Ya||(Le(Xa,{noResolve:Ya,...Fe}),r(64,xt=!0)):Le(Xa,{noResolve:Ya})),s.$$.dirty[0]&268435456&&r(66,Ye=O`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
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
group by poi_domain_h`),s.$$.dirty[0]&268435456&&r(67,ut=`-- Same domain-grain mart, averaged (unweighted) across every PLR in this area's Bezirk at the same
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
group by poi_domain_h`),s.$$.dirty[2]&120&&(Ye||!oa?Ye||(Zt(ut,{noResolve:Ye,...ae}),r(68,oa=!0)):Zt(ut,{noResolve:Ye})),s.$$.dirty[0]&268435456&&r(70,Xe=O`select
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
order by hhi desc`),s.$$.dirty[0]&268435456&&r(71,ba=`select
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
order by hhi desc`),s.$$.dirty[2]&1920&&(Xe||!Et?Xe||(et(ba,{noResolve:Xe,...va}),r(72,Et=!0)):et(ba,{noResolve:Xe})),s.$$.dirty[0]&268435456&&r(74,$a=O`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`),s.$$.dirty[0]&268435456&&r(75,_a=`select
    reference_year,
    reference_date,
    residents_total,
    mean_age_years,
    any_indicator_suppressed
from gentriduck_marts.mart_area_demographics
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by reference_year desc
limit 1`),s.$$.dirty[2]&30720&&($a||!jt?$a||(Fa(_a,{noResolve:$a,...Ne}),r(76,jt=!0)):Fa(_a,{noResolve:$a})),s.$$.dirty[0]&268435456&&r(78,ka=O`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
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
order by sort_order`),s.$$.dirty[0]&268435456&&r(79,Ke=`-- One row per indicator: this area vs. its district (Bezirk, already population-weighted by the
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
order by sort_order`),s.$$.dirty[2]&491520&&(ka||!Bt?ka||(tt(Ke,{noResolve:ka,...at}),r(80,Bt=!0)):tt(Ke,{noResolve:ka})),s.$$.dirty[0]&268435456&&r(82,Ve=O`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[0]&268435456&&r(83,rt=`select
    snapshot_year,
    n_schools, n_kindergartens, n_doctors, n_dentists, n_pharmacies, n_supermarkets,
    n_playgrounds, n_transit_stops,
    gastro_poi_count, gastro_poi_with_cuisine_count,
    replace(replace(dominant_cuisine, chr(59), ' / '), '_', ' ') as dominant_cuisine,
    dominant_cuisine_share
from gentriduck_marts.mart_area_amenities
where city_code = 'BER' and area_level = 'plr' and area_code = '${d.code}'
order by snapshot_year desc
limit 1`),s.$$.dirty[2]&7864320&&(Ve||!Tt?Ve||(xa(rt,{noResolve:Ve,...ea}),r(84,Tt=!0)):xa(rt,{noResolve:Ve})),s.$$.dirty[0]&268435456&&r(86,Ge=O`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
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
order by sort_order`),s.$$.dirty[0]&268435456&&r(87,st=`-- One row per infrastructure fact: this area vs. its district (Bezirk, already summed by the
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
order by sort_order`),s.$$.dirty[2]&125829120&&(Ge||!er?Ge||(St(st,{noResolve:Ge,...Ea}),r(88,er=!0)):St(st,{noResolve:Ge})),s.$$.dirty[0]&268435456&&r(90,it=O`with
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
order by p.snapshot_year`),s.$$.dirty[0]&268435456&&r(91,nt=`with
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
order by p.snapshot_year`),s.$$.dirty[2]&2013265920&&(it||!Ct?it||(ot(nt,{noResolve:it,...Ee}),r(92,Ct=!0)):ot(nt,{noResolve:it})),s.$$.dirty[0]&268435456&&r(94,Ba=O`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`),s.$$.dirty[0]&268435456&&r(95,aa=`-- Name resolved directly in SQL (not a JS-templated string literal) so a source-derived name
-- containing a quote character can never break this query's own SQL syntax.
select
    'plr:' || '${d.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${d.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'plr' and area_vintage = 'lor_2021'
  and area_code = '${d.code}'`),s.$$.dirty[3]&15&&(Ba||!ca?Ba||(ar(aa,{noResolve:Ba,...Ae}),r(96,ca=!0)):ar(aa,{noResolve:Ba})),s.$$.dirty[0]&2&&r(10,a=((q=Ue==null?void 0:Ue[0])==null?void 0:q.bezirk_name)??"its district"),s.$$.dirty[0]&1&&r(112,i=((Ht=Pe==null?void 0:Pe[0])==null?void 0:Ht.area_name)??null),s.$$.dirty[3]&524288&&r(25,o=[{label:"Berlin",href:"/berlin"},{label:"All neighbourhoods",href:"/berlin/area"},{label:i??"Neighbourhood"}]),s.$$.dirty[3]&524288&&r(24,m=i?`${i} — neighbourhood profile · Berlin`:null),s.$$.dirty[0]&4&&r(111,l=Qe==null?void 0:Qe[0]),s.$$.dirty[3]&262144&&r(11,h=l&&l.status_index!==null&&l.status_index!==void 0),s.$$.dirty[0]&2048|s.$$.dirty[3]&262144&&r(105,g=h?`${Mt()} is currently ${Dt[l.stage]??`classified **${l.stage??"unclassified"}**`} ([what this does and doesn't mean](/methodology)).`:`${Mt()} is classified as **uninhabited** in Berlin's official population register (no resident population) — the social-status figures on this page do not apply here.`),s.$$.dirty[0]&3072|s.$$.dirty[3]&262144&&r(104,b=(()=>{if(!h||l.district_avg_status_index==null||l.city_avg_status_index==null)return"";const M=Number(l.status_index),W=Number(l.district_avg_status_index),Ft=Number(l.city_avg_status_index),ct=(ta,zt)=>ta<zt-.1?"less deprived than":ta>zt+.1?"more deprived than":"about the same as";return`Its social status is currently ${ct(M,W)} the ${a} average, and ${ct(M,Ft)} Berlin as a whole.`})()),s.$$.dirty[0]&128&&r(109,y=Array.isArray(ze)?ze:Array.from(ze??[])),s.$$.dirty[3]&65536&&r(110,H=y.filter(M=>Number(M.poi_count||0)>=Ni)),s.$$.dirty[3]&131072&&r(108,$=[...H].sort((M,W)=>Number(W.oa_domain)-Number(M.oa_domain)).filter(M=>Number(M.oa_domain)>=1.15).slice(0,2)),s.$$.dirty[3]&98304&&r(103,A=(()=>{if(y.length===0)return"Too few mapped places (shops, cafés, and other points of interest) are recorded here yet to describe a commercial mix.";if($.length===0)return"Its commercial mix — the shops, cafés, and other mapped places here — doesn't lean strongly toward any particular kind, compared to Berlin as a whole.";const M=$.map(Ft=>Ft.poi_domain_h);return`Its commercial mix leans toward ${M.length===1?M[0]:`${M[0]} and ${M[1]}`} — both make up a larger share of the local mix here than they do citywide (see the Offering Advantage profile below).`})()),s.$$.dirty[0]&8&&r(106,F=sa==null?void 0:sa[0]),s.$$.dirty[0]&16&&r(107,D=Array.isArray(mt)?mt:Array.from(mt??[])),s.$$.dirty[0]&1024|s.$$.dirty[3]&24576&&r(102,I=(()=>{if(!F||F.n_editions==null)return"No multi-edition trajectory is available yet for this area.";if(F.n_editions<=1)return"Only one social-status reading is on record for this area so far, so its pace of change can't be assessed yet.";const M=F.status_delta!=null?Math.abs(Number(F.status_delta)):null,W=M==null?"at an unclear pace":M<.4?"only gradually":M<1.2?"at a moderate pace":"quickly, moving several status steps",Ft={improving:"become less deprived",declining:"become more deprived","stable-established":"stayed consistently low-deprivation","persistently-deprived":"stayed consistently high-deprivation",mixed:"shown no single clear direction"}[F.trajectory_type]??"shown an unclassified pattern";let ct=`Across the ${F.first_edition}–${F.last_edition} editions on record, it has ${Ft}, ${W} (trajectory confidence: ${F.trajectory_confidence}).`;const ta=D.reduce((Lt,La)=>Lt+Number(La.n||0),0),zt=D.find(Lt=>Lt.trajectory_type===F.trajectory_type);return ta>0&&zt&&(ct+=` ${zt.n} of ${ta} other areas in ${a} with a usable trajectory show this same "${F.trajectory_type}" pattern.`),ct})()),s.$$.dirty[3]&7680&&r(23,G=[g,b,A,I].filter(Boolean).map(_t)),s.$$.dirty[0]&32&&r(101,z=Array.isArray(ia)?ia:Array.from(ia??[])),s.$$.dirty[3]&256&&r(22,U=Array.from(z.reduce((M,W)=>(M.set(W.poi_category_h,(M.get(W.poi_category_h)||0)+Number(W.poi_count||0)),M),new Map)).sort((M,W)=>W[1]-M[1]).map(([M])=>M)),s.$$.dirty[0]&64&&r(21,Q=He==null?void 0:He[0]),s.$$.dirty[0]&128&&r(100,lt=Array.isArray(ze)?ze:Array.from(ze??[])),s.$$.dirty[0]&256&&r(99,Sa=new Map((Array.isArray(na)?na:Array.from(na??[])).map(M=>[M.poi_domain_h,Number(M.district_avg_oa_domain)]))),s.$$.dirty[3]&192&&r(9,Y=lt.map(M=>{const W=Sa.get(M.poi_domain_h);return{domain:M.poi_domain_h,pct:(Number(M.oa_domain)-1)*100,districtPct:W!=null&&!Number.isNaN(W)?(W-1)*100:null,lowBase:Number(M.poi_count||0)<Cr,poiCount:M.poi_count}})),s.$$.dirty[0]&512&&r(98,Ca=Math.max(100,...Y.map(M=>M.pct),...Y.map(M=>M.districtPct??0))*1.1),s.$$.dirty[0]&512|s.$$.dirty[3]&32&&r(97,dt=Y.map(M=>({name:M.lowBase?`${M.domain} †`:M.domain,max:Ca,min:tr}))),s.$$.dirty[0]&1536|s.$$.dirty[3]&16&&r(20,Ut={tooltip:{},radar:{indicator:dt,splitNumber:4,axisName:{fontSize:10}},series:[{type:"radar",data:[{value:Y.map(M=>M.pct),name:Mt(),areaStyle:{opacity:.15}},{value:Y.map(M=>M.districtPct),name:`${a} average`,lineStyle:{type:"solid",width:1},areaStyle:{opacity:0},symbol:"none"},{value:Y.map(()=>0),name:"Citywide baseline (0% = Berlin average)",lineStyle:{type:"dashed",width:1},areaStyle:{opacity:0},symbol:"none"}]}]})},[Pe,Ue,Qe,sa,mt,ia,He,ze,na,Y,a,h,ra,Ha,Yt,Xt,Ra,za,ja,qt,Ut,Q,U,G,m,o,qa,f,d,la,Se,wt,Pa,X,ee,da,vt,ua,Ce,Qa,Vt,xe,Wa,Ka,Gt,qe,Va,Ga,Ja,pa,Je,We,kt,Za,ga,ya,Me,Ze,Da,wa,Jt,Fe,Ya,Xa,xt,ae,Ye,ut,oa,va,Xe,ba,Et,Ne,$a,_a,jt,at,ka,Ke,Bt,ea,Ve,rt,Tt,Ea,Ge,st,er,Ee,it,nt,Ct,Ae,Ba,aa,ca,dt,Ca,Sa,lt,z,I,A,b,g,F,D,$,y,H,l,i,gt]}class on extends Os{constructor(t){super(),Ps(this,t,Ii,Li,Ms,{data:26},null,[-1,-1,-1,-1,-1])}}export{on as component};
