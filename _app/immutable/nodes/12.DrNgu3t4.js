import{s as Pa,d,i as u,a as _e,b as z,c as $,h as Fa,e as T,f as Nt,g as Dt,j as O,k as A,l as w,m as q,t as M,n as ha,o as Na,p as Da,q as Ia,r as Ua,u as Re,w as Ut,v as Qa,H as Wa}from"../chunks/scheduler.CmMeO4ay.js";import{S as Ja,i as Ka,d as x,t as y,a as g,c as re,m as R,b as E,e as C,g as ie}from"../chunks/index.bfDa0Uqw.js";import{A as Ga,P as Ya,a as Xa}from"../chunks/PageTitle.nASIZfTP.js";import{F as Va}from"../chunks/FooterNav.BbND9dxm.js";import{H as Za}from"../chunks/Hero.wYia6TQ0.js";import{D as Aa,C as _t}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as er,w as tr}from"../chunks/entry.vKQYRLhF.js";import{A as Xe}from"../chunks/Alert.BNZjDqvU.js";import{e as ar,s as rr,Q as Ue,p as ir,a as ya,r as ba,C as nr}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as j}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as $a,a as dt}from"../chunks/Dropdown.zhownQxu.js";import{p as sr}from"../chunks/stores.CGa44sBH.js";import{Q as Qe}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as ea}from"../chunks/BarChart.BZFK7Gke.js";import{B as Zt}from"../chunks/BigValue.Cf_smc5N.js";import{p as or}from"../chunks/profile.BW8tN6E9.js";function lr(s){var n;let t,a=(B.title??((n=B.og)==null?void 0:n.title))+"",e;return{c(){t=q("h1"),e=M(a),this.h()},l(i){t=T(i,"H1",{class:!0});var m=Dt(t);e=O(m,a),m.forEach(d),this.h()},h(){z(t,"class","title")},m(i,m){u(i,t,m),_e(t,e)},p:Re,d(i){i&&d(t)}}}function _r(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:Re,p:Re,d:Re}}function dr(s){var m;let t,a,e,n,i;return document.title=t=B.title??((m=B.og)==null?void 0:m.title),{c(){a=w(),e=q("meta"),n=w(),i=q("meta"),this.h()},l(l){a=$(l),e=T(l,"META",{property:!0,content:!0}),n=$(l),i=T(l,"META",{name:!0,content:!0}),this.h()},h(){var l,h;z(e,"property","og:title"),z(e,"content",((l=B.og)==null?void 0:l.title)??B.title),z(i,"name","twitter:title"),z(i,"content",((h=B.og)==null?void 0:h.title)??B.title)},m(l,h){u(l,a,h),u(l,e,h),u(l,n,h),u(l,i,h)},p(l,h){var _;h&0&&t!==(t=B.title??((_=B.og)==null?void 0:_.title))&&(document.title=t)},d(l){l&&(d(a),d(e),d(n),d(i))}}}function cr(s){var i,m;let t,a,e=(B.description||((i=B.og)==null?void 0:i.description))&&mr(),n=((m=B.og)==null?void 0:m.image)&&ur();return{c(){e&&e.c(),t=w(),n&&n.c(),a=Nt()},l(l){e&&e.l(l),t=$(l),n&&n.l(l),a=Nt()},m(l,h){e&&e.m(l,h),u(l,t,h),n&&n.m(l,h),u(l,a,h)},p(l,h){var _,b;(B.description||(_=B.og)!=null&&_.description)&&e.p(l,h),(b=B.og)!=null&&b.image&&n.p(l,h)},d(l){l&&(d(t),d(a)),e&&e.d(l),n&&n.d(l)}}}function mr(s){let t,a,e,n,i;return{c(){t=q("meta"),a=w(),e=q("meta"),n=w(),i=q("meta"),this.h()},l(m){t=T(m,"META",{name:!0,content:!0}),a=$(m),e=T(m,"META",{property:!0,content:!0}),n=$(m),i=T(m,"META",{name:!0,content:!0}),this.h()},h(){var m,l,h;z(t,"name","description"),z(t,"content",B.description??((m=B.og)==null?void 0:m.description)),z(e,"property","og:description"),z(e,"content",((l=B.og)==null?void 0:l.description)??B.description),z(i,"name","twitter:description"),z(i,"content",((h=B.og)==null?void 0:h.description)??B.description)},m(m,l){u(m,t,l),u(m,a,l),u(m,e,l),u(m,n,l),u(m,i,l)},p:Re,d(m){m&&(d(t),d(a),d(e),d(n),d(i))}}}function ur(s){let t,a,e;return{c(){t=q("meta"),a=w(),e=q("meta"),this.h()},l(n){t=T(n,"META",{property:!0,content:!0}),a=$(n),e=T(n,"META",{name:!0,content:!0}),this.h()},h(){var n,i;z(t,"property","og:image"),z(t,"content",ya((n=B.og)==null?void 0:n.image)),z(e,"name","twitter:image"),z(e,"content",ya((i=B.og)==null?void 0:i.image))},m(n,i){u(n,t,i),u(n,a,i),u(n,e,i)},p:Re,d(n){n&&(d(t),d(a),d(e))}}}function wa(s){let t,a;return t=new Qe({props:{queryID:"ortsteil_name",queryResult:s[0]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&1&&(i.queryResult=e[0]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function va(s){let t,a;return t=new Qe({props:{queryID:"bezirk_info",queryResult:s[5]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&32&&(i.queryResult=e[5]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function ka(s){let t,a;return t=new Qe({props:{queryID:"child_count",queryResult:s[1]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&2&&(i.queryResult=e[1]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function xa(s){let t,a;return t=new Qe({props:{queryID:"demographics",queryResult:s[6]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&64&&(i.queryResult=e[6]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ra(s){let t,a;return t=new Qe({props:{queryID:"age_mix",queryResult:s[7]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&128&&(i.queryResult=e[7]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ea(s){let t,a;return t=new Qe({props:{queryID:"stage_mix",queryResult:s[8]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&256&&(i.queryResult=e[8]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ca(s){let t,a;return t=new Qe({props:{queryID:"poi_mix",queryResult:s[9]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&512&&(i.queryResult=e[9]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function za(s){let t,a;return t=new Qe({props:{queryID:"children",queryResult:s[2]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&4&&(i.queryResult=e[2]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ta(s){let t,a;return t=new Qe({props:{queryID:"dom_suppressed_count",queryResult:s[10]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&1024&&(i.queryResult=e[10]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function qa(s){let t,a;return t=new Qe({props:{queryID:"dominance_children",queryResult:s[11]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&2048&&(i.queryResult=e[11]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function fr(s){let t,a="District profile";return{c(){t=q("a"),t.textContent=a,this.h()},l(e){t=T(e,"A",{href:!0,"data-svelte-h":!0}),A(t)!=="svelte-1trtuzf"&&(t.textContent=a),this.h()},h(){z(t,"href","/gentriduck/berlin/area/bezirk")},m(e,n){u(e,t,n)},p:Re,d(e){e&&d(t)}}}function pr(s){let t,a=s[5][0].bezirk_name+"",e,n;return{c(){t=q("a"),e=M(a),this.h()},l(i){t=T(i,"A",{href:!0});var m=Dt(t);e=O(m,a),m.forEach(d),this.h()},h(){z(t,"href",n="/gentriduck/berlin/area/bezirk/"+s[5][0].bezirk_code)},m(i,m){u(i,t,m),_e(t,e)},p(i,m){m[0]&32&&a!==(a=i[5][0].bezirk_name+"")&&Ut(e,a),m[0]&32&&n!==(n="/gentriduck/berlin/area/bezirk/"+i[5][0].bezirk_code)&&z(t,"href",n)},d(i){i&&d(t)}}}function gr(s){let t,a,e=`dominant area-overlap
  assignment`,n,i,m="sums and population-weighted averages",l,h,_="methodology page",b,f,v="full neighbourhood list",p;return{c(){t=M(`Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a `),a=q("b"),a.textContent=e,n=M(` (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are `),i=q("b"),i.textContent=m,l=M(` under
  that assignment — never a separately re-scored index. See the
  `),h=q("a"),h.textContent=_,b=M(` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),f=q("a"),f.textContent=v,p=M(` for the actual
  gentrification index and trajectory.`),this.h()},l(o){t=O(o,`Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a `),a=T(o,"B",{"data-svelte-h":!0}),A(a)!=="svelte-1bbggmu"&&(a.textContent=e),n=O(o,` (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are `),i=T(o,"B",{"data-svelte-h":!0}),A(i)!=="svelte-rhlwxq"&&(i.textContent=m),l=O(o,` under
  that assignment — never a separately re-scored index. See the
  `),h=T(o,"A",{href:!0,"data-svelte-h":!0}),A(h)!=="svelte-1l2pw3"&&(h.textContent=_),b=O(o,` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),f=T(o,"A",{href:!0,"data-svelte-h":!0}),A(f)!=="svelte-z78e0k"&&(f.textContent=v),p=O(o,` for the actual
  gentrification index and trajectory.`),this.h()},h(){z(h,"href","/gentriduck/methodology"),z(f,"href","/gentriduck/berlin/area")},m(o,S){u(o,t,S),u(o,a,S),u(o,n,S),u(o,i,S),u(o,l,S),u(o,h,S),u(o,b,S),u(o,f,S),u(o,p,S)},p:Re,d(o){o&&(d(t),d(a),d(n),d(i),d(l),d(h),d(b),d(f),d(p))}}}function La(s){let t,a;return t=new Xe({props:{status:"warning",$$slots:{default:[br]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&33|n[2]&1073741824&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function hr(s){let t,a="this Ortsteil's district profile";return{c(){t=q("a"),t.textContent=a,this.h()},l(e){t=T(e,"A",{href:!0,"data-svelte-h":!0}),A(t)!=="svelte-mt7m1r"&&(t.textContent=a),this.h()},h(){z(t,"href","/gentriduck/berlin/area/bezirk")},m(e,n){u(e,t,n)},p:Re,d(e){e&&d(t)}}}function yr(s){let t,a=s[5][0].bezirk_name+"",e,n,i;return{c(){t=q("a"),e=M(a),n=M("'s district profile"),this.h()},l(m){t=T(m,"A",{href:!0});var l=Dt(t);e=O(l,a),n=O(l,"'s district profile"),l.forEach(d),this.h()},h(){z(t,"href",i="/gentriduck/berlin/area/bezirk/"+s[5][0].bezirk_code)},m(m,l){u(m,t,l),_e(t,e),_e(t,n)},p(m,l){l[0]&32&&a!==(a=m[5][0].bezirk_name+"")&&Ut(e,a),l[0]&32&&i!==(i="/gentriduck/berlin/area/bezirk/"+m[5][0].bezirk_code)&&z(t,"href",i)},d(m){m&&d(t)}}}function br(s){let t,a="No Planungsraum is predominantly within this Ortsteil's boundary.",e,n=(s[0][0]?s[0][0].area_name:"This Ortsteil")+"",i,m,l,h="the full Ortsteil list",_,b;function f(o,S){var F;return(F=o[5][0])!=null&&F.bezirk_code?yr:hr}let v=f(s),p=v(s);return{c(){t=q("b"),t.textContent=a,e=w(),i=M(n),m=M(` is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  `),l=q("a"),l.textContent=h,_=M(` for the other 95 Ortsteile, or
  `),p.c(),b=M(`
  for area-level statistics instead.`),this.h()},l(o){t=T(o,"B",{"data-svelte-h":!0}),A(t)!=="svelte-1mtqbjl"&&(t.textContent=a),e=$(o),i=O(o,n),m=O(o,` is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  `),l=T(o,"A",{href:!0,"data-svelte-h":!0}),A(l)!=="svelte-17skhuj"&&(l.textContent=h),_=O(o,` for the other 95 Ortsteile, or
  `),p.l(o),b=O(o,`
  for area-level statistics instead.`),this.h()},h(){z(l,"href","/gentriduck/berlin/area/ortsteil")},m(o,S){u(o,t,S),u(o,e,S),u(o,i,S),u(o,m,S),u(o,l,S),u(o,_,S),p.m(o,S),u(o,b,S)},p(o,S){S[0]&1&&n!==(n=(o[0][0]?o[0][0].area_name:"This Ortsteil")+"")&&Ut(i,n),v===(v=f(o))&&p?p.p(o,S):(p.d(1),p=v(o),p&&(p.c(),p.m(b.parentNode,b)))},d(o){o&&(d(t),d(e),d(i),d(m),d(l),d(_),d(b)),p.d(o)}}}function Sa(s){let t,a;return t=new Qe({props:{queryID:"stage_mix_summary",queryResult:s[3]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&8&&(i.queryResult=e[3]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function $r(s){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[vr]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[2]&1073741824&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function wr(s){let t,a,e,n=s[13]&&Ba(s);return a=new ea({props:{data:s[8],x:"stage",y:"n_areas",title:"Neighbourhoods by stage, "+(s[0][0]?s[0][0].area_name:"this Ortsteil"),swapXY:"true"}}),{c(){n&&n.c(),t=w(),C(a.$$.fragment)},l(i){n&&n.l(i),t=$(i),E(a.$$.fragment,i)},m(i,m){n&&n.m(i,m),u(i,t,m),R(a,i,m),e=!0},p(i,m){i[13]?n?n.p(i,m):(n=Ba(i),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null);const l={};m[0]&256&&(l.data=i[8]),m[0]&1&&(l.title="Neighbourhoods by stage, "+(i[0][0]?i[0][0].area_name:"this Ortsteil")),a.$set(l)},i(i){e||(g(a.$$.fragment,i),e=!0)},o(i){y(a.$$.fragment,i),e=!1},d(i){i&&d(t),n&&n.d(i),x(a,i)}}}function vr(s){let t;return{c(){t=M("No neighbourhood-stage mix for this enclave — see the note above.")},l(a){t=O(a,"No neighbourhood-stage mix for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Ba(s){let t,a;return{c(){t=q("p"),a=new Wa(!1),this.h()},l(e){t=T(e,"P",{});var n=Dt(t);a=Qa(n,!1),n.forEach(d),this.h()},h(){a.a=null},m(e,n){u(e,t,n),a.m(s[13],t)},p(e,n){n[0]&8192&&a.p(e[13])},d(e){e&&d(t)}}}function kr(s){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Rr]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[2]&1073741824&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function xr(s){let t,a;return t=new ea({props:{data:s[9],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(s[0][0]?s[0][0].area_name:"this Ortsteil"),swapXY:"true"}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&512&&(i.data=e[9]),n[0]&1&&(i.title="Mapped places by category (latest snapshot), "+(e[0][0]?e[0][0].area_name:"this Ortsteil")),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Rr(s){let t;return{c(){t=M("No mapped-place breakdown for this enclave — see the note above.")},l(a){t=O(a,"No mapped-place breakdown for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Er(s){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[zr]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[2]&1073741824&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Cr(s){let t,a,e,n,i,m,l,h,_,b;return t=new Xe({props:{status:"info",$$slots:{default:[Tr]},$$scope:{ctx:s}}}),e=new $a({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[qr]},$$scope:{ctx:s}}}),i=new $a({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[Lr]},$$scope:{ctx:s}}}),l=new Xe({props:{status:"info",$$slots:{default:[Sr]},$$scope:{ctx:s}}}),_=new Aa({props:{data:s[11],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Ortsteil.",$$slots:{default:[Br]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(i.$$.fragment),m=w(),C(l.$$.fragment),h=w(),C(_.$$.fragment)},l(f){E(t.$$.fragment,f),a=$(f),E(e.$$.fragment,f),n=$(f),E(i.$$.fragment,f),m=$(f),E(l.$$.fragment,f),h=$(f),E(_.$$.fragment,f)},m(f,v){R(t,f,v),u(f,a,v),R(e,f,v),u(f,n,v),R(i,f,v),u(f,m,v),R(l,f,v),u(f,h,v),R(_,f,v),b=!0},p(f,v){const p={};v[2]&1073741824&&(p.$$scope={dirty:v,ctx:f}),t.$set(p);const o={};v[2]&1073741824&&(o.$$scope={dirty:v,ctx:f}),e.$set(o);const S={};v[2]&1073741824&&(S.$$scope={dirty:v,ctx:f}),i.$set(S);const F={};v[0]&1024|v[2]&1073741824&&(F.$$scope={dirty:v,ctx:f}),l.$set(F);const H={};v[0]&2048&&(H.data=f[11]),v[2]&1073741824&&(H.$$scope={dirty:v,ctx:f}),_.$set(H)},i(f){b||(g(t.$$.fragment,f),g(e.$$.fragment,f),g(i.$$.fragment,f),g(l.$$.fragment,f),g(_.$$.fragment,f),b=!0)},o(f){y(t.$$.fragment,f),y(e.$$.fragment,f),y(i.$$.fragment,f),y(l.$$.fragment,f),y(_.$$.fragment,f),b=!1},d(f){f&&(d(a),d(n),d(m),d(h)),x(t,f),x(e,f),x(i,f),x(l,f),x(_,f)}}}function zr(s){let t;return{c(){t=M("No within-group dominance figures for this enclave — see the note above.")},l(a){t=O(a,"No within-group dominance figures for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Tr(s){let t,a="Dominance is sign-blind",e,n,i="Offering Advantage decoder",m;return{c(){t=q("b"),t.textContent=a,e=M(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=q("a"),n.textContent=i,m=M(" §5 for the full ethics note."),this.h()},l(l){t=T(l,"B",{"data-svelte-h":!0}),A(t)!=="svelte-1m1shgn"&&(t.textContent=a),e=O(l,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=T(l,"A",{href:!0,"data-svelte-h":!0}),A(n)!=="svelte-168mye8"&&(n.textContent=i),m=O(l," §5 for the full ethics note."),this.h()},h(){z(n,"href","/gentriduck/methodology-oa-modes")},m(l,h){u(l,t,h),u(l,e,h),u(l,n,h),u(l,m,h)},p:Re,d(l){l&&(d(t),d(e),d(n),d(m))}}}function qr(s){let t,a,e,n,i,m,l,h;return t=new dt({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),e=new dt({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),i=new dt({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),l=new dt({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(i.$$.fragment),m=w(),C(l.$$.fragment)},l(_){E(t.$$.fragment,_),a=$(_),E(e.$$.fragment,_),n=$(_),E(i.$$.fragment,_),m=$(_),E(l.$$.fragment,_)},m(_,b){R(t,_,b),u(_,a,b),R(e,_,b),u(_,n,b),R(i,_,b),u(_,m,b),R(l,_,b),h=!0},p:Re,i(_){h||(g(t.$$.fragment,_),g(e.$$.fragment,_),g(i.$$.fragment,_),g(l.$$.fragment,_),h=!0)},o(_){y(t.$$.fragment,_),y(e.$$.fragment,_),y(i.$$.fragment,_),y(l.$$.fragment,_),h=!1},d(_){_&&(d(a),d(n),d(m)),x(t,_),x(e,_),x(i,_),x(l,_)}}}function Lr(s){let t,a,e,n,i,m,l,h,_,b,f,v;return t=new dt({props:{value:"2025",valueLabel:"2025"}}),e=new dt({props:{value:"2024",valueLabel:"2024"}}),i=new dt({props:{value:"2023",valueLabel:"2023"}}),l=new dt({props:{value:"2022",valueLabel:"2022"}}),_=new dt({props:{value:"2021",valueLabel:"2021"}}),f=new dt({props:{value:"2020",valueLabel:"2020"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(i.$$.fragment),m=w(),C(l.$$.fragment),h=w(),C(_.$$.fragment),b=w(),C(f.$$.fragment)},l(p){E(t.$$.fragment,p),a=$(p),E(e.$$.fragment,p),n=$(p),E(i.$$.fragment,p),m=$(p),E(l.$$.fragment,p),h=$(p),E(_.$$.fragment,p),b=$(p),E(f.$$.fragment,p)},m(p,o){R(t,p,o),u(p,a,o),R(e,p,o),u(p,n,o),R(i,p,o),u(p,m,o),R(l,p,o),u(p,h,o),R(_,p,o),u(p,b,o),R(f,p,o),v=!0},p:Re,i(p){v||(g(t.$$.fragment,p),g(e.$$.fragment,p),g(i.$$.fragment,p),g(l.$$.fragment,p),g(_.$$.fragment,p),g(f.$$.fragment,p),v=!0)},o(p){y(t.$$.fragment,p),y(e.$$.fragment,p),y(i.$$.fragment,p),y(l.$$.fragment,p),y(_.$$.fragment,p),y(f.$$.fragment,p),v=!1},d(p){p&&(d(a),d(n),d(m),d(h),d(b)),x(t,p),x(e,p),x(i,p),x(l,p),x(_,p),x(f,p)}}}function Sr(s){let t,a=(s[10][0]?s[10][0].n_suppressed:0)+"",e,n,i=(s[10][0]?s[10][0].n_suppressed+s[10][0].n_shown:0)+"",m,l,h;return{c(){t=q("b"),e=M(a),n=M(" of "),m=M(i),l=M(" neighbourhoods here are suppressed below as too thinly observed to characterize"),h=M(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(_){t=T(_,"B",{});var b=Dt(t);e=O(b,a),n=O(b," of "),m=O(b,i),l=O(b," neighbourhoods here are suppressed below as too thinly observed to characterize"),b.forEach(d),h=O(_,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(_,b){u(_,t,b),_e(t,e),_e(t,n),_e(t,m),_e(t,l),u(_,h,b)},p(_,b){b[0]&1024&&a!==(a=(_[10][0]?_[10][0].n_suppressed:0)+"")&&Ut(e,a),b[0]&1024&&i!==(i=(_[10][0]?_[10][0].n_suppressed+_[10][0].n_shown:0)+"")&&Ut(m,i)},d(_){_&&(d(t),d(h))}}}function Br(s){let t,a,e,n,i,m,l,h,_,b,f,v;return t=new _t({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new _t({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),i=new _t({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),l=new _t({props:{id:"top_child",title:"Leading type"}}),_=new _t({props:{id:"n_children",title:"Types in this group here"}}),f=new _t({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(i.$$.fragment),m=w(),C(l.$$.fragment),h=w(),C(_.$$.fragment),b=w(),C(f.$$.fragment)},l(p){E(t.$$.fragment,p),a=$(p),E(e.$$.fragment,p),n=$(p),E(i.$$.fragment,p),m=$(p),E(l.$$.fragment,p),h=$(p),E(_.$$.fragment,p),b=$(p),E(f.$$.fragment,p)},m(p,o){R(t,p,o),u(p,a,o),R(e,p,o),u(p,n,o),R(i,p,o),u(p,m,o),R(l,p,o),u(p,h,o),R(_,p,o),u(p,b,o),R(f,p,o),v=!0},p:Re,i(p){v||(g(t.$$.fragment,p),g(e.$$.fragment,p),g(i.$$.fragment,p),g(l.$$.fragment,p),g(_.$$.fragment,p),g(f.$$.fragment,p),v=!0)},o(p){y(t.$$.fragment,p),y(e.$$.fragment,p),y(i.$$.fragment,p),y(l.$$.fragment,p),y(_.$$.fragment,p),y(f.$$.fragment,p),v=!1},d(p){p&&(d(a),d(n),d(m),d(h),d(b)),x(t,p),x(e,p),x(i,p),x(l,p),x(_,p),x(f,p)}}}function Or(s){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Hr]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[2]&1073741824&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Mr(s){let t,a,e,n,i,m,l,h,_;t=new Zt({props:{data:s[6],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),e=new Zt({props:{data:s[6],value:"n_plr",title:"Constituent neighbourhoods (dominant PLR assignment)",emptySet:"warn"}}),i=new Zt({props:{data:s[6],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let b=s[6]&&s[6][0]&&s[6][0].any_indicator_suppressed&&Oa(s);return h=new ea({props:{data:s[7],x:"age_band",y:"share",title:"Age structure, "+(s[0][0]?s[0][0].area_name:"this Ortsteil"),yFmt:"pct0"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(i.$$.fragment),m=w(),b&&b.c(),l=w(),C(h.$$.fragment)},l(f){E(t.$$.fragment,f),a=$(f),E(e.$$.fragment,f),n=$(f),E(i.$$.fragment,f),m=$(f),b&&b.l(f),l=$(f),E(h.$$.fragment,f)},m(f,v){R(t,f,v),u(f,a,v),R(e,f,v),u(f,n,v),R(i,f,v),u(f,m,v),b&&b.m(f,v),u(f,l,v),R(h,f,v),_=!0},p(f,v){const p={};v[0]&64&&(p.data=f[6]),t.$set(p);const o={};v[0]&64&&(o.data=f[6]),e.$set(o);const S={};v[0]&64&&(S.data=f[6]),i.$set(S),f[6]&&f[6][0]&&f[6][0].any_indicator_suppressed?b?v[0]&64&&g(b,1):(b=Oa(f),b.c(),g(b,1),b.m(l.parentNode,l)):b&&(ie(),y(b,1,1,()=>{b=null}),re());const F={};v[0]&128&&(F.data=f[7]),v[0]&1&&(F.title="Age structure, "+(f[0][0]?f[0][0].area_name:"this Ortsteil")),h.$set(F)},i(f){_||(g(t.$$.fragment,f),g(e.$$.fragment,f),g(i.$$.fragment,f),g(b),g(h.$$.fragment,f),_=!0)},o(f){y(t.$$.fragment,f),y(e.$$.fragment,f),y(i.$$.fragment,f),y(b),y(h.$$.fragment,f),_=!1},d(f){f&&(d(a),d(n),d(m),d(l)),x(t,f),x(e,f),x(i,f),b&&b.d(f),x(h,f)}}}function Hr(s){let t;return{c(){t=M("No population/composition figures for this enclave — see the note above.")},l(a){t=O(a,"No population/composition figures for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Oa(s){let t,a;return t=new Xe({props:{status:"warning",$$slots:{default:[Ar]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ar(s){let t;return{c(){t=M(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.`)},l(a){t=O(a,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.`)},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Ma(s){let t,a;return t=new Qe({props:{queryID:"minimap_areas",queryResult:s[12]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[0]&4096&&(i.queryResult=e[12]),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function jr(s){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Fr]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const i={};n[2]&1073741824&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Pr(s){let t,a,e,n;t=new Aa({props:{data:s[2],rows:"20",link:"area_link",$$slots:{default:[Nr]},$$scope:{ctx:s}}});let i=s[14]&&Ha(s);return{c(){C(t.$$.fragment),a=w(),i&&i.c(),e=Nt()},l(m){E(t.$$.fragment,m),a=$(m),i&&i.l(m),e=Nt()},m(m,l){R(t,m,l),u(m,a,l),i&&i.m(m,l),u(m,e,l),n=!0},p(m,l){const h={};l[0]&4&&(h.data=m[2]),l[2]&1073741824&&(h.$$scope={dirty:l,ctx:m}),t.$set(h),m[14]?i?l[0]&16384&&g(i,1):(i=Ha(m),i.c(),g(i,1),i.m(e.parentNode,e)):i&&(ie(),y(i,1,1,()=>{i=null}),re())},i(m){n||(g(t.$$.fragment,m),g(i),n=!0)},o(m){y(t.$$.fragment,m),y(i),n=!1},d(m){m&&(d(a),d(e)),x(t,m),i&&i.d(m)}}}function Fr(s){let t;return{c(){t=M("No constituent neighbourhoods for this enclave — see the note above.")},l(a){t=O(a,"No constituent neighbourhoods for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Nr(s){let t,a,e,n,i,m,l,h;return t=new _t({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new _t({props:{id:"stage",title:"Stage"}}),i=new _t({props:{id:"pressure_trend",title:"Pressure trend"}}),l=new _t({props:{id:"overlap_frac_of_plr",title:"% of PLR within this Ortsteil",fmt:"pct0"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(i.$$.fragment),m=w(),C(l.$$.fragment)},l(_){E(t.$$.fragment,_),a=$(_),E(e.$$.fragment,_),n=$(_),E(i.$$.fragment,_),m=$(_),E(l.$$.fragment,_)},m(_,b){R(t,_,b),u(_,a,b),R(e,_,b),u(_,n,b),R(i,_,b),u(_,m,b),R(l,_,b),h=!0},p:Re,i(_){h||(g(t.$$.fragment,_),g(e.$$.fragment,_),g(i.$$.fragment,_),g(l.$$.fragment,_),h=!0)},o(_){y(t.$$.fragment,_),y(e.$$.fragment,_),y(i.$$.fragment,_),y(l.$$.fragment,_),h=!1},d(_){_&&(d(a),d(n),d(m)),x(t,_),x(e,_),x(i,_),x(l,_)}}}function Ha(s){let t,a;return t=new Xe({props:{status:"warning",$$slots:{default:[Dr]},$$scope:{ctx:s}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},i(e){a||(g(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Dr(s){let t,a,e="partially",n,i,m="methodology page",l;return{c(){t=M("At least one neighbourhood above is only "),a=q("b"),a.textContent=e,n=M(` (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  `),i=q("a"),i.textContent=m,l=M(` for why a whole-PLR figure, not a fractional split, is
  used.`),this.h()},l(h){t=O(h,"At least one neighbourhood above is only "),a=T(h,"B",{"data-svelte-h":!0}),A(a)!=="svelte-lw0a3u"&&(a.textContent=e),n=O(h,` (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  `),i=T(h,"A",{href:!0,"data-svelte-h":!0}),A(i)!=="svelte-1l2pw3"&&(i.textContent=m),l=O(h,` for why a whole-PLR figure, not a fractional split, is
  used.`),this.h()},h(){z(i,"href","/gentriduck/methodology")},m(h,_){u(h,t,_),u(h,a,_),u(h,n,_),u(h,i,_),u(h,l,_)},p:Re,d(h){h&&(d(t),d(a),d(n),d(i),d(l))}}}function Ir(s){var ma;let t,a,e,n,i,m,l,h,_,b,f,v,p,o,S,F,H,Ve,ne,k,Be,P,ct,We,Je,Ot="all Ortsteile",Ke,ye,ht="all districts",St,Ge,Mt="full neighbourhood list",Oe,de,Ze,Ee,qe,Ht='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Me,ce,yt=`Every neighbourhood (Planungsraum) dominantly assigned to this Ortsteil, grouped by its current
gentrification stage — a <strong class="markdown">count</strong>, not a re-scored Ortsteil-level index. See the
<a href="/gentriduck/methodology" class="markdown">methodology page</a> for what each stage means; see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code> for
why this project reports a distribution here, never a single re-scored index value, at any grain
coarser than a single Planungsraum.`,bt,et,me,N,Ce,be,At='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',$t,Le,tt='<a href="#mapped-places">Mapped places</a>',He,se,ue,at,Se,rt='<a href="#within-group-dominance">Within-group dominance</a>',Ae,oe,fe,it,je,nt=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Pe,$e,mt='<a href="#people--structure">People &amp; structure</a>',wt,pe,D,ze,we,jt='<a href="#where-this-area-sits">Where this area sits</a>',vt,st,ge,Fe,ve,Pt='<a href="#neighbourhoods-planungsräume-dominantly-assigned-to-this-ortsteil">Neighbourhoods (Planungsräume) dominantly assigned to this Ortsteil</a>',kt,he,I,Te,ke,ut='<a href="#honest-caveats">Honest caveats</a>',xt,Ne,ot=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Ortsteil</strong> — only
the distribution of its dominantly-assigned constituent neighbourhoods&#39; (Planungsräume) own
stages. A population-weighted average of ordinal stage/Dynamik classes would violate this
project&#39;s own &quot;never average ordinal class codes&quot; rule and would describe no actual neighbourhood
while masking exactly the frontier heterogeneity gentrification tracking depends on (see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code>,
both <strong class="markdown">decline</strong> the coarse-grain point value).</li> <li class="markdown"><strong class="markdown">Ortsteil rollups use a dominant area-overlap assignment, not a code-prefix match</strong> — a
Planungsraum rolls entirely into the one Ortsteil holding the largest share of its area, so a
neighbourhood only partially within this Ortsteil&#39;s boundary can still appear here in full (see
the confidence disclosure above whenever it renders).</li> <li class="markdown"><strong class="markdown">No Offering Advantage or MSS status/Dynamik estimate is published at Ortsteil grain</strong> —
<code class="markdown">mart_poi_oa_arealevel</code>/<code class="markdown">mart_mss_area_aggregate</code> do not cover this non-LOR geography (see this
page&#39;s own header comment). See any constituent neighbourhood&#39;s own page for those figures.</li> <li class="markdown">Figures on this page are <strong class="markdown">sums and population-weighted averages</strong> under the dominant-overlap
assignment, never observed at the Ortsteil level itself. Land value and estimated rent are only
published at the individual-neighbourhood grain.</li> <li class="markdown">See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for the full list of project-wide limitations
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,De,xe,Ft='<a href="#further-reading">Further reading</a>',Rt,Ie,L=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area/ortsteil" class="markdown">the full Ortsteil list</a>
for other Ortsteile, or drill into any of this Ortsteil&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,lt,Bt,Et,ft,Qt,pt=typeof B<"u"&&(B.title||((ma=B.og)==null?void 0:ma.title))&&B.hide_title!==!0&&lr();function ja(r,c){var le;return typeof B<"u"&&(B.title||(le=B.og)!=null&&le.title)?dr:_r}let It=ja()(s),gt=typeof B=="object"&&cr(),U=s[0]&&wa(s),Q=s[5]&&va(s),W=s[1]&&ka(s),J=s[6]&&xa(s),K=s[7]&&Ra(s),G=s[8]&&Ea(s),Y=s[9]&&Ca(s),X=s[2]&&za(s),V=s[10]&&Ta(s),Z=s[11]&&qa(s);F=new Ga({props:{crumbs:s[16]}}),Ve=new Ya({props:{title:s[15]}}),k=new Za({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]?s[0][0].area_name:"Ortsteil")+" — Ortsteil profile",lede:"Population, composition, and neighbourhood-stage mix for this Ortsteil (Stadtteil), rolled up from its dominantly-assigned constituent Planungsräume — never a re-scored index at this grain."}});function ta(r,c){var le;return(le=r[5][0])!=null&&le.bezirk_code?pr:fr}let Wt=ta(s),Ye=Wt(s);de=new Xe({props:{status:"info",$$slots:{default:[gr]},$$scope:{ctx:s}}});let ee=!s[4]&&La(s),te=s[3]&&Sa(s);const aa=[wr,$r],Ct=[];function ra(r,c){return r[4]?0:1}me=ra(s),N=Ct[me]=aa[me](s);const ia=[xr,kr],zt=[];function na(r,c){return r[4]?0:1}se=na(s),ue=zt[se]=ia[se](s);const sa=[Cr,Er],Tt=[];function oa(r,c){return r[4]?0:1}oe=oa(s),fe=Tt[oe]=sa[oe](s);const la=[Mr,Or],qt=[];function _a(r,c){return r[4]?0:1}pe=_a(s),D=qt[pe]=la[pe](s);let ae=s[12]&&Ma(s);ge=new Xa({props:{data:s[12],geoJsonUrl:`${er}/geo/ortsteil_self.geojson`,title:s[0][0]?s[0][0].area_name:"This Ortsteil"}});const da=[Pr,jr],Lt=[];function ca(r,c){return r[4]?0:1}return he=ca(s),I=Lt[he]=da[he](s),ft=new Va({}),{c(){pt&&pt.c(),t=w(),It.c(),a=q("meta"),e=q("meta"),gt&&gt.c(),n=Nt(),i=w(),U&&U.c(),m=w(),Q&&Q.c(),l=w(),W&&W.c(),h=w(),J&&J.c(),_=w(),K&&K.c(),b=w(),G&&G.c(),f=w(),Y&&Y.c(),v=w(),X&&X.c(),p=w(),V&&V.c(),o=w(),Z&&Z.c(),S=w(),C(F.$$.fragment),H=w(),C(Ve.$$.fragment),ne=w(),C(k.$$.fragment),Be=w(),P=q("p"),ct=M("Up: "),Ye.c(),We=M(" · "),Je=q("a"),Je.textContent=Ot,Ke=M(" · "),ye=q("a"),ye.textContent=ht,St=M(" · "),Ge=q("a"),Ge.textContent=Mt,Oe=w(),C(de.$$.fragment),Ze=w(),ee&&ee.c(),Ee=w(),qe=q("h2"),qe.innerHTML=Ht,Me=w(),ce=q("p"),ce.innerHTML=yt,bt=w(),te&&te.c(),et=w(),N.c(),Ce=w(),be=q("h2"),be.innerHTML=At,$t=w(),Le=q("h3"),Le.innerHTML=tt,He=w(),ue.c(),at=w(),Se=q("h2"),Se.innerHTML=rt,Ae=w(),fe.c(),it=w(),je=q("p"),je.innerHTML=nt,Pe=w(),$e=q("h2"),$e.innerHTML=mt,wt=w(),D.c(),ze=w(),we=q("h2"),we.innerHTML=jt,vt=w(),ae&&ae.c(),st=w(),C(ge.$$.fragment),Fe=w(),ve=q("h3"),ve.innerHTML=Pt,kt=w(),I.c(),Te=w(),ke=q("h2"),ke.innerHTML=ut,xt=w(),Ne=q("ul"),Ne.innerHTML=ot,De=w(),xe=q("h2"),xe.innerHTML=Ft,Rt=w(),Ie=q("p"),Ie.innerHTML=L,lt=w(),Bt=q("hr"),Et=w(),C(ft.$$.fragment),this.h()},l(r){pt&&pt.l(r),t=$(r);const c=Fa("svelte-2igo1p",document.head);It.l(c),a=T(c,"META",{name:!0,content:!0}),e=T(c,"META",{name:!0,content:!0}),gt&&gt.l(c),n=Nt(),c.forEach(d),i=$(r),U&&U.l(r),m=$(r),Q&&Q.l(r),l=$(r),W&&W.l(r),h=$(r),J&&J.l(r),_=$(r),K&&K.l(r),b=$(r),G&&G.l(r),f=$(r),Y&&Y.l(r),v=$(r),X&&X.l(r),p=$(r),V&&V.l(r),o=$(r),Z&&Z.l(r),S=$(r),E(F.$$.fragment,r),H=$(r),E(Ve.$$.fragment,r),ne=$(r),E(k.$$.fragment,r),Be=$(r),P=T(r,"P",{});var le=Dt(P);ct=O(le,"Up: "),Ye.l(le),We=O(le," · "),Je=T(le,"A",{href:!0,"data-svelte-h":!0}),A(Je)!=="svelte-1eye8e9"&&(Je.textContent=Ot),Ke=O(le," · "),ye=T(le,"A",{href:!0,"data-svelte-h":!0}),A(ye)!=="svelte-6j2qr0"&&(ye.textContent=ht),St=O(le," · "),Ge=T(le,"A",{href:!0,"data-svelte-h":!0}),A(Ge)!=="svelte-z78e0k"&&(Ge.textContent=Mt),le.forEach(d),Oe=$(r),E(de.$$.fragment,r),Ze=$(r),ee&&ee.l(r),Ee=$(r),qe=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(qe)!=="svelte-14f17uo"&&(qe.innerHTML=Ht),Me=$(r),ce=T(r,"P",{class:!0,"data-svelte-h":!0}),A(ce)!=="svelte-pighte"&&(ce.innerHTML=yt),bt=$(r),te&&te.l(r),et=$(r),N.l(r),Ce=$(r),be=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(be)!=="svelte-1i9w9pn"&&(be.innerHTML=At),$t=$(r),Le=T(r,"H3",{class:!0,id:!0,"data-svelte-h":!0}),A(Le)!=="svelte-3hvew3"&&(Le.innerHTML=tt),He=$(r),ue.l(r),at=$(r),Se=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(Se)!=="svelte-4kb45v"&&(Se.innerHTML=rt),Ae=$(r),fe.l(r),it=$(r),je=T(r,"P",{class:!0,"data-svelte-h":!0}),A(je)!=="svelte-1xa7bh7"&&(je.innerHTML=nt),Pe=$(r),$e=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A($e)!=="svelte-1mdzqzc"&&($e.innerHTML=mt),wt=$(r),D.l(r),ze=$(r),we=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(we)!=="svelte-60cjj9"&&(we.innerHTML=jt),vt=$(r),ae&&ae.l(r),st=$(r),E(ge.$$.fragment,r),Fe=$(r),ve=T(r,"H3",{class:!0,id:!0,"data-svelte-h":!0}),A(ve)!=="svelte-140mx4a"&&(ve.innerHTML=Pt),kt=$(r),I.l(r),Te=$(r),ke=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(ke)!=="svelte-ad0syq"&&(ke.innerHTML=ut),xt=$(r),Ne=T(r,"UL",{class:!0,"data-svelte-h":!0}),A(Ne)!=="svelte-1j76xu"&&(Ne.innerHTML=ot),De=$(r),xe=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(xe)!=="svelte-oimjns"&&(xe.innerHTML=Ft),Rt=$(r),Ie=T(r,"P",{class:!0,"data-svelte-h":!0}),A(Ie)!=="svelte-lhsrox"&&(Ie.innerHTML=L),lt=$(r),Bt=T(r,"HR",{class:!0}),Et=$(r),E(ft.$$.fragment,r),this.h()},h(){z(a,"name","twitter:card"),z(a,"content","summary_large_image"),z(e,"name","twitter:site"),z(e,"content","@evidence_dev"),z(Je,"href","/gentriduck/berlin/area/ortsteil"),z(ye,"href","/gentriduck/berlin/area/bezirk"),z(Ge,"href","/gentriduck/berlin/area"),z(qe,"class","markdown"),z(qe,"id","social-status--trajectory"),z(ce,"class","markdown"),z(be,"class","markdown"),z(be,"id","commercial-mix--offering-advantage"),z(Le,"class","markdown"),z(Le,"id","mapped-places"),z(Se,"class","markdown"),z(Se,"id","within-group-dominance"),z(je,"class","markdown"),z($e,"class","markdown"),z($e,"id","people--structure"),z(we,"class","markdown"),z(we,"id","where-this-area-sits"),z(ve,"class","markdown"),z(ve,"id","neighbourhoods-planungsräume-dominantly-assigned-to-this-ortsteil"),z(ke,"class","markdown"),z(ke,"id","honest-caveats"),z(Ne,"class","markdown"),z(xe,"class","markdown"),z(xe,"id","further-reading"),z(Ie,"class","markdown"),z(Bt,"class","markdown")},m(r,c){pt&&pt.m(r,c),u(r,t,c),It.m(document.head,null),_e(document.head,a),_e(document.head,e),gt&&gt.m(document.head,null),_e(document.head,n),u(r,i,c),U&&U.m(r,c),u(r,m,c),Q&&Q.m(r,c),u(r,l,c),W&&W.m(r,c),u(r,h,c),J&&J.m(r,c),u(r,_,c),K&&K.m(r,c),u(r,b,c),G&&G.m(r,c),u(r,f,c),Y&&Y.m(r,c),u(r,v,c),X&&X.m(r,c),u(r,p,c),V&&V.m(r,c),u(r,o,c),Z&&Z.m(r,c),u(r,S,c),R(F,r,c),u(r,H,c),R(Ve,r,c),u(r,ne,c),R(k,r,c),u(r,Be,c),u(r,P,c),_e(P,ct),Ye.m(P,null),_e(P,We),_e(P,Je),_e(P,Ke),_e(P,ye),_e(P,St),_e(P,Ge),u(r,Oe,c),R(de,r,c),u(r,Ze,c),ee&&ee.m(r,c),u(r,Ee,c),u(r,qe,c),u(r,Me,c),u(r,ce,c),u(r,bt,c),te&&te.m(r,c),u(r,et,c),Ct[me].m(r,c),u(r,Ce,c),u(r,be,c),u(r,$t,c),u(r,Le,c),u(r,He,c),zt[se].m(r,c),u(r,at,c),u(r,Se,c),u(r,Ae,c),Tt[oe].m(r,c),u(r,it,c),u(r,je,c),u(r,Pe,c),u(r,$e,c),u(r,wt,c),qt[pe].m(r,c),u(r,ze,c),u(r,we,c),u(r,vt,c),ae&&ae.m(r,c),u(r,st,c),R(ge,r,c),u(r,Fe,c),u(r,ve,c),u(r,kt,c),Lt[he].m(r,c),u(r,Te,c),u(r,ke,c),u(r,xt,c),u(r,Ne,c),u(r,De,c),u(r,xe,c),u(r,Rt,c),u(r,Ie,c),u(r,lt,c),u(r,Bt,c),u(r,Et,c),R(ft,r,c),Qt=!0},p(r,c){var ga;typeof B<"u"&&(B.title||(ga=B.og)!=null&&ga.title)&&B.hide_title!==!0&&pt.p(r,c),It.p(r,c),typeof B=="object"&&gt.p(r,c),r[0]?U?(U.p(r,c),c[0]&1&&g(U,1)):(U=wa(r),U.c(),g(U,1),U.m(m.parentNode,m)):U&&(ie(),y(U,1,1,()=>{U=null}),re()),r[5]?Q?(Q.p(r,c),c[0]&32&&g(Q,1)):(Q=va(r),Q.c(),g(Q,1),Q.m(l.parentNode,l)):Q&&(ie(),y(Q,1,1,()=>{Q=null}),re()),r[1]?W?(W.p(r,c),c[0]&2&&g(W,1)):(W=ka(r),W.c(),g(W,1),W.m(h.parentNode,h)):W&&(ie(),y(W,1,1,()=>{W=null}),re()),r[6]?J?(J.p(r,c),c[0]&64&&g(J,1)):(J=xa(r),J.c(),g(J,1),J.m(_.parentNode,_)):J&&(ie(),y(J,1,1,()=>{J=null}),re()),r[7]?K?(K.p(r,c),c[0]&128&&g(K,1)):(K=Ra(r),K.c(),g(K,1),K.m(b.parentNode,b)):K&&(ie(),y(K,1,1,()=>{K=null}),re()),r[8]?G?(G.p(r,c),c[0]&256&&g(G,1)):(G=Ea(r),G.c(),g(G,1),G.m(f.parentNode,f)):G&&(ie(),y(G,1,1,()=>{G=null}),re()),r[9]?Y?(Y.p(r,c),c[0]&512&&g(Y,1)):(Y=Ca(r),Y.c(),g(Y,1),Y.m(v.parentNode,v)):Y&&(ie(),y(Y,1,1,()=>{Y=null}),re()),r[2]?X?(X.p(r,c),c[0]&4&&g(X,1)):(X=za(r),X.c(),g(X,1),X.m(p.parentNode,p)):X&&(ie(),y(X,1,1,()=>{X=null}),re()),r[10]?V?(V.p(r,c),c[0]&1024&&g(V,1)):(V=Ta(r),V.c(),g(V,1),V.m(o.parentNode,o)):V&&(ie(),y(V,1,1,()=>{V=null}),re()),r[11]?Z?(Z.p(r,c),c[0]&2048&&g(Z,1)):(Z=qa(r),Z.c(),g(Z,1),Z.m(S.parentNode,S)):Z&&(ie(),y(Z,1,1,()=>{Z=null}),re());const le={};c[0]&65536&&(le.crumbs=r[16]),F.$set(le);const ua={};c[0]&32768&&(ua.title=r[15]),Ve.$set(ua);const fa={};c[0]&1&&(fa.title=(r[0][0]?r[0][0].area_name:"Ortsteil")+" — Ortsteil profile"),k.$set(fa),Wt===(Wt=ta(r))&&Ye?Ye.p(r,c):(Ye.d(1),Ye=Wt(r),Ye&&(Ye.c(),Ye.m(P,We)));const pa={};c[2]&1073741824&&(pa.$$scope={dirty:c,ctx:r}),de.$set(pa),r[4]?ee&&(ie(),y(ee,1,1,()=>{ee=null}),re()):ee?(ee.p(r,c),c[0]&16&&g(ee,1)):(ee=La(r),ee.c(),g(ee,1),ee.m(Ee.parentNode,Ee)),r[3]?te?(te.p(r,c),c[0]&8&&g(te,1)):(te=Sa(r),te.c(),g(te,1),te.m(et.parentNode,et)):te&&(ie(),y(te,1,1,()=>{te=null}),re());let Jt=me;me=ra(r),me===Jt?Ct[me].p(r,c):(ie(),y(Ct[Jt],1,1,()=>{Ct[Jt]=null}),re(),N=Ct[me],N?N.p(r,c):(N=Ct[me]=aa[me](r),N.c()),g(N,1),N.m(Ce.parentNode,Ce));let Kt=se;se=na(r),se===Kt?zt[se].p(r,c):(ie(),y(zt[Kt],1,1,()=>{zt[Kt]=null}),re(),ue=zt[se],ue?ue.p(r,c):(ue=zt[se]=ia[se](r),ue.c()),g(ue,1),ue.m(at.parentNode,at));let Gt=oe;oe=oa(r),oe===Gt?Tt[oe].p(r,c):(ie(),y(Tt[Gt],1,1,()=>{Tt[Gt]=null}),re(),fe=Tt[oe],fe?fe.p(r,c):(fe=Tt[oe]=sa[oe](r),fe.c()),g(fe,1),fe.m(it.parentNode,it));let Yt=pe;pe=_a(r),pe===Yt?qt[pe].p(r,c):(ie(),y(qt[Yt],1,1,()=>{qt[Yt]=null}),re(),D=qt[pe],D?D.p(r,c):(D=qt[pe]=la[pe](r),D.c()),g(D,1),D.m(ze.parentNode,ze)),r[12]?ae?(ae.p(r,c),c[0]&4096&&g(ae,1)):(ae=Ma(r),ae.c(),g(ae,1),ae.m(st.parentNode,st)):ae&&(ie(),y(ae,1,1,()=>{ae=null}),re());const Xt={};c[0]&4096&&(Xt.data=r[12]),c[0]&1&&(Xt.title=r[0][0]?r[0][0].area_name:"This Ortsteil"),ge.$set(Xt);let Vt=he;he=ca(r),he===Vt?Lt[he].p(r,c):(ie(),y(Lt[Vt],1,1,()=>{Lt[Vt]=null}),re(),I=Lt[he],I?I.p(r,c):(I=Lt[he]=da[he](r),I.c()),g(I,1),I.m(Te.parentNode,Te))},i(r){Qt||(g(U),g(Q),g(W),g(J),g(K),g(G),g(Y),g(X),g(V),g(Z),g(F.$$.fragment,r),g(Ve.$$.fragment,r),g(k.$$.fragment,r),g(de.$$.fragment,r),g(ee),g(te),g(N),g(ue),g(fe),g(D),g(ae),g(ge.$$.fragment,r),g(I),g(ft.$$.fragment,r),Qt=!0)},o(r){y(U),y(Q),y(W),y(J),y(K),y(G),y(Y),y(X),y(V),y(Z),y(F.$$.fragment,r),y(Ve.$$.fragment,r),y(k.$$.fragment,r),y(de.$$.fragment,r),y(ee),y(te),y(N),y(ue),y(fe),y(D),y(ae),y(ge.$$.fragment,r),y(I),y(ft.$$.fragment,r),Qt=!1},d(r){r&&(d(t),d(i),d(m),d(l),d(h),d(_),d(b),d(f),d(v),d(p),d(o),d(S),d(H),d(ne),d(Be),d(P),d(Oe),d(Ze),d(Ee),d(qe),d(Me),d(ce),d(bt),d(et),d(Ce),d(be),d($t),d(Le),d(He),d(at),d(Se),d(Ae),d(it),d(je),d(Pe),d($e),d(wt),d(ze),d(we),d(vt),d(st),d(Fe),d(ve),d(kt),d(Te),d(ke),d(xt),d(Ne),d(De),d(xe),d(Rt),d(Ie),d(lt),d(Bt),d(Et)),pt&&pt.d(r),It.d(r),d(a),d(e),gt&&gt.d(r),d(n),U&&U.d(r),Q&&Q.d(r),W&&W.d(r),J&&J.d(r),K&&K.d(r),G&&G.d(r),Y&&Y.d(r),X&&X.d(r),V&&V.d(r),Z&&Z.d(r),x(F,r),x(Ve,r),x(k,r),Ye.d(),x(de,r),ee&&ee.d(r),te&&te.d(r),Ct[me].d(r),zt[se].d(r),Tt[oe].d(r),qt[pe].d(r),ae&&ae.d(r),x(ge,r),Lt[he].d(r),x(ft,r)}}}const B={};function Ur(s,t,a){let e,n,i,m,l,h,_,b,f,v;ha(s,sr,L=>a(72,f=L)),ha(s,ba,L=>a(76,v=L));let{data:p}=t,{data:o={},customFormattingSettings:S,__db:F,inputs:H}=p;Na(ba,v="865e864f193aaf1ad3eb98cb754fbd9d",v);let Ve=ar(tr(H));Da(Ve.subscribe(L=>a(19,H=L))),Ia(nr,{getCustomFormats:()=>S.customFormats||[]});const ne=(L,lt)=>or(F.query,L,{query_name:lt});rr(ne);let k=f.params;Ua(()=>!0);let Be={initialData:void 0,initialError:void 0},P=j`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`,ct=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`;o.ortsteil_name_data&&(o.ortsteil_name_data instanceof Error?Be.initialError=o.ortsteil_name_data:Be.initialData=o.ortsteil_name_data,o.ortsteil_name_columns&&(Be.knownColumns=o.ortsteil_name_columns));let We,Je=!1;const Ot=Ue.createReactive({callback:L=>{a(0,We=L)},execFn:ne},{id:"ortsteil_name",...Be});Ot(ct,{noResolve:P,...Be}),globalThis[Symbol.for("ortsteil_name")]={get value(){return We}};let Ke={initialData:void 0,initialError:void 0},ye=j`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
-- via substr(), same fixed 12-entry lookup already used by every other area-level page.
select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = substr('${k.code}', 1, 2)`,ht=`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
-- via substr(), same fixed 12-entry lookup already used by every other area-level page.
select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = substr('${k.code}', 1, 2)`;o.bezirk_info_data&&(o.bezirk_info_data instanceof Error?Ke.initialError=o.bezirk_info_data:Ke.initialData=o.bezirk_info_data,o.bezirk_info_columns&&(Ke.knownColumns=o.bezirk_info_columns));let St,Ge=!1;const Mt=Ue.createReactive({callback:L=>{a(5,St=L)},execFn:ne},{id:"bezirk_info",...Ke});Mt(ht,{noResolve:ye,...Ke}),globalThis[Symbol.for("bezirk_info")]={get value(){return St}};let Oe={initialData:void 0,initialError:void 0},de=j`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`,Ze=`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`;o.child_count_data&&(o.child_count_data instanceof Error?Oe.initialError=o.child_count_data:Oe.initialData=o.child_count_data,o.child_count_columns&&(Oe.knownColumns=o.child_count_columns));let Ee,qe=!1;const Ht=Ue.createReactive({callback:L=>{a(1,Ee=L)},execFn:ne},{id:"child_count",...Oe});Ht(Ze,{noResolve:de,...Oe}),globalThis[Symbol.for("child_count")]={get value(){return Ee}};let Me={initialData:void 0,initialError:void 0},ce=j`select
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
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
order by reference_year desc
limit 1`,yt=`select
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
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
order by reference_year desc
limit 1`;o.demographics_data&&(o.demographics_data instanceof Error?Me.initialError=o.demographics_data:Me.initialData=o.demographics_data,o.demographics_columns&&(Me.knownColumns=o.demographics_columns));let bt,et=!1;const me=Ue.createReactive({callback:L=>{a(6,bt=L)},execFn:ne},{id:"demographics",...Me});me(yt,{noResolve:ce,...Me}),globalThis[Symbol.for("demographics")]={get value(){return bt}};let N={initialData:void 0,initialError:void 0},Ce=j`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`,be=`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`;o.age_mix_data&&(o.age_mix_data instanceof Error?N.initialError=o.age_mix_data:N.initialData=o.age_mix_data,o.age_mix_columns&&(N.knownColumns=o.age_mix_columns));let At,$t=!1;const Le=Ue.createReactive({callback:L=>{a(7,At=L)},execFn:ne},{id:"age_mix",...N});Le(be,{noResolve:Ce,...N}),globalThis[Symbol.for("age_mix")]={get value(){return At}};let tt={initialData:void 0,initialError:void 0},He=j`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`,se=`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`;o.stage_mix_data&&(o.stage_mix_data instanceof Error?tt.initialError=o.stage_mix_data:tt.initialData=o.stage_mix_data,o.stage_mix_columns&&(tt.knownColumns=o.stage_mix_columns));let ue,at=!1;const Se=Ue.createReactive({callback:L=>{a(8,ue=L)},execFn:ne},{id:"stage_mix",...tt});Se(se,{noResolve:He,...tt}),globalThis[Symbol.for("stage_mix")]={get value(){return ue}};let rt={initialData:void 0,initialError:void 0},Ae=j`select
    poi.poi_category_h,
    sum(poi.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as poi
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = poi.area_code and xw.is_dominant_ortsteil
where poi.city_code = 'BER' and poi.area_vintage = 'lor_2021'
  and xw.ortsteil_area_code = '${k.code}'
  and poi.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`,oe=`select
    poi.poi_category_h,
    sum(poi.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as poi
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = poi.area_code and xw.is_dominant_ortsteil
where poi.city_code = 'BER' and poi.area_vintage = 'lor_2021'
  and xw.ortsteil_area_code = '${k.code}'
  and poi.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`;o.poi_mix_data&&(o.poi_mix_data instanceof Error?rt.initialError=o.poi_mix_data:rt.initialData=o.poi_mix_data,o.poi_mix_columns&&(rt.knownColumns=o.poi_mix_columns));let fe,it=!1;const je=Ue.createReactive({callback:L=>{a(9,fe=L)},execFn:ne},{id:"poi_mix",...rt});je(oe,{noResolve:Ae,...rt}),globalThis[Symbol.for("poi_mix")]={get value(){return fe}};let nt={initialData:void 0,initialError:void 0},Pe=j`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    xw.overlap_frac_of_plr,
    '/berlin/area/' || xw.plr_area_code as area_link
from gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
left join
    gentriduck_marts.gentrification_index as gi
    on
        gi.area_code = xw.plr_area_code
        and gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
        and gi.period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
where xw.ortsteil_area_code = '${k.code}' and xw.is_dominant_ortsteil
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`,$e=`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    xw.overlap_frac_of_plr,
    '/berlin/area/' || xw.plr_area_code as area_link
from gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
left join
    gentriduck_marts.gentrification_index as gi
    on
        gi.area_code = xw.plr_area_code
        and gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
        and gi.period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
where xw.ortsteil_area_code = '${k.code}' and xw.is_dominant_ortsteil
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`;o.children_data&&(o.children_data instanceof Error?nt.initialError=o.children_data:nt.initialData=o.children_data,o.children_columns&&(nt.knownColumns=o.children_columns));let mt,wt=!1;const pe=Ue.createReactive({callback:L=>{a(2,mt=L)},execFn:ne},{id:"children",...nt});pe($e,{noResolve:Pe,...nt}),globalThis[Symbol.for("children")]={get value(){return mt}};let D={initialData:void 0,initialError:void 0},ze=j`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
-- discipline as the /methodology-oa-modes original this table relocates from. Runs unconditionally
-- (#255 precedent) -- returns 0/0 for the two never-dominant enclaves, gated at display time only.
select
    count(*) filter (where d.is_thin_base) as n_suppressed,
    count(*) filter (where not d.is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance as d
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
where d.city_code = 'BER'
  and d.is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and d.area_vintage = 'lor_2021'
  and d.weight_variant = 'standard'
  and d.dominance_group = '${H.dom_group.value}'
  and d.snapshot_year = ${H.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`,we=`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
-- discipline as the /methodology-oa-modes original this table relocates from. Runs unconditionally
-- (#255 precedent) -- returns 0/0 for the two never-dominant enclaves, gated at display time only.
select
    count(*) filter (where d.is_thin_base) as n_suppressed,
    count(*) filter (where not d.is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance as d
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
where d.city_code = 'BER'
  and d.is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and d.area_vintage = 'lor_2021'
  and d.weight_variant = 'standard'
  and d.dominance_group = '${H.dom_group.value}'
  and d.snapshot_year = ${H.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`;o.dom_suppressed_count_data&&(o.dom_suppressed_count_data instanceof Error?D.initialError=o.dom_suppressed_count_data:D.initialData=o.dom_suppressed_count_data,o.dom_suppressed_count_columns&&(D.knownColumns=o.dom_suppressed_count_columns));let jt,vt=!1;const st=Ue.createReactive({callback:L=>{a(10,jt=L)},execFn:ne},{id:"dom_suppressed_count",...D});st(we,{noResolve:ze,...D}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return jt}};let ge={initialData:void 0,initialError:void 0},Fe=j`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
-- (mart_poi_dominance is PLR-grain only -- no Ortsteil-level dominance figure exists to relocate).
-- Joined through the SAME dominant-overlap crosswalk (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil)
-- the poi_mix/children queries above already use -- a filter/join, not a new aggregation.
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
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
left join
    gentriduck_marts.gentrification_index as gi
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
    and d.dominance_group = '${H.dom_group.value}'
    and d.snapshot_year = ${H.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`,ve=`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
-- (mart_poi_dominance is PLR-grain only -- no Ortsteil-level dominance figure exists to relocate).
-- Joined through the SAME dominant-overlap crosswalk (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil)
-- the poi_mix/children queries above already use -- a filter/join, not a new aggregation.
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
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
left join
    gentriduck_marts.gentrification_index as gi
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
    and d.dominance_group = '${H.dom_group.value}'
    and d.snapshot_year = ${H.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`;o.dominance_children_data&&(o.dominance_children_data instanceof Error?ge.initialError=o.dominance_children_data:ge.initialData=o.dominance_children_data,o.dominance_children_columns&&(ge.knownColumns=o.dominance_children_columns));let Pt,kt=!1;const he=Ue.createReactive({callback:L=>{a(11,Pt=L)},execFn:ne},{id:"dominance_children",...ge});he(ve,{noResolve:Fe,...ge}),globalThis[Symbol.for("dominance_children")]={get value(){return Pt}};let I={initialData:void 0,initialError:void 0},Te=j`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            typology_stage as stage,
            n_plr as n_areas
        from gentriduck_marts.mart_ortsteil_plr_stage_mix
        where city_code = 'BER' and ortsteil_area_code = '${k.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
              where city_code = 'BER'
          )
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
from totals as t cross join top cross join advanced as a`,ke=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            typology_stage as stage,
            n_plr as n_areas
        from gentriduck_marts.mart_ortsteil_plr_stage_mix
        where city_code = 'BER' and ortsteil_area_code = '${k.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
              where city_code = 'BER'
          )
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
from totals as t cross join top cross join advanced as a`;o.stage_mix_summary_data&&(o.stage_mix_summary_data instanceof Error?I.initialError=o.stage_mix_summary_data:I.initialData=o.stage_mix_summary_data,o.stage_mix_summary_columns&&(I.knownColumns=o.stage_mix_summary_columns));let ut,xt=!1;const Ne=Ue.createReactive({callback:L=>{a(3,ut=L)},execFn:ne},{id:"stage_mix_summary",...I});Ne(ke,{noResolve:Te,...I}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return ut}};let ot={initialData:void 0,initialError:void 0},De=j`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`,xe=`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`;o.minimap_areas_data&&(o.minimap_areas_data instanceof Error?ot.initialError=o.minimap_areas_data:ot.initialData=o.minimap_areas_data,o.minimap_areas_columns&&(ot.knownColumns=o.minimap_areas_columns));let Ft,Rt=!1;const Ie=Ue.createReactive({callback:L=>{a(12,Ft=L)},execFn:ne},{id:"minimap_areas",...ot});return Ie(xe,{noResolve:De,...ot}),globalThis[Symbol.for("minimap_areas")]={get value(){return Ft}},s.$$set=L=>{"data"in L&&a(17,p=L.data)},s.$$.update=()=>{var L;s.$$.dirty[0]&131072&&a(18,{data:o={},customFormattingSettings:S,__db:F}=p,o),s.$$.dirty[0]&262144&&ir.set(Object.keys(o).length>0),s.$$.dirty[2]&1024&&a(20,k=f.params),s.$$.dirty[0]&1048576&&a(22,P=j`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`),s.$$.dirty[0]&1048576&&a(23,ct=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`),s.$$.dirty[0]&31457280&&(P||!Je?P||(Ot(ct,{noResolve:P,...Be}),a(24,Je=!0)):Ot(ct,{noResolve:P})),s.$$.dirty[0]&1048576&&a(26,ye=j`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
-- via substr(), same fixed 12-entry lookup already used by every other area-level page.
select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = substr('${k.code}', 1, 2)`),s.$$.dirty[0]&1048576&&a(27,ht=`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
-- via substr(), same fixed 12-entry lookup already used by every other area-level page.
select bezirk_code, bezirk_name, '/berlin/area/bezirk/' || bezirk_code as bezirk_link
from (
    select '01' as bezirk_code, 'Mitte' as bezirk_name
    union all select '02', 'Friedrichshain-Kreuzberg'
    union all select '03', 'Pankow'
    union all select '04', 'Charlottenburg-Wilmersdorf'
    union all select '05', 'Spandau'
    union all select '06', 'Steglitz-Zehlendorf'
    union all select '07', 'Tempelhof-Schöneberg'
    union all select '08', 'Neukölln'
    union all select '09', 'Treptow-Köpenick'
    union all select '10', 'Marzahn-Hellersdorf'
    union all select '11', 'Lichtenberg'
    union all select '12', 'Reinickendorf'
) t
where bezirk_code = substr('${k.code}', 1, 2)`),s.$$.dirty[0]&503316480&&(ye||!Ge?ye||(Mt(ht,{noResolve:ye,...Ke}),a(28,Ge=!0)):Mt(ht,{noResolve:ye})),s.$$.dirty[0]&1048576&&a(30,de=j`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`),s.$$.dirty[0]&1048576&&a(31,Ze=`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`),s.$$.dirty[0]&1610612736|s.$$.dirty[1]&3&&(de||!qe?de||(Ht(Ze,{noResolve:de,...Oe}),a(32,qe=!0)):Ht(Ze,{noResolve:de})),s.$$.dirty[0]&1048576&&a(34,ce=j`select
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
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
order by reference_year desc
limit 1`),s.$$.dirty[0]&1048576&&a(35,yt=`select
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
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
order by reference_year desc
limit 1`),s.$$.dirty[1]&60&&(ce||!et?ce||(me(yt,{noResolve:ce,...Me}),a(36,et=!0)):me(yt,{noResolve:ce})),s.$$.dirty[0]&1048576&&a(38,Ce=j`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`),s.$$.dirty[0]&1048576&&a(39,be=`with latest as (
    select age_under18_share, age_18_27_share, age_27_45_share, age_45_65_share, age_65plus_share
    from gentriduck_marts.mart_area_demographics
    where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
    order by reference_year desc
    limit 1
)
select 'Under 18' as age_band, age_under18_share as share, 1 as sort_order from latest
union all
select '18–27', age_18_27_share, 2 from latest
union all
select '27–45', age_27_45_share, 3 from latest
union all
select '45–65', age_45_65_share, 4 from latest
union all
select '65+', age_65plus_share, 5 from latest
order by sort_order`),s.$$.dirty[1]&960&&(Ce||!$t?Ce||(Le(be,{noResolve:Ce,...N}),a(40,$t=!0)):Le(be,{noResolve:Ce})),s.$$.dirty[0]&1048576&&a(42,He=j`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`),s.$$.dirty[0]&1048576&&a(43,se=`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`),s.$$.dirty[1]&15360&&(He||!at?He||(Se(se,{noResolve:He,...tt}),a(44,at=!0)):Se(se,{noResolve:He})),s.$$.dirty[0]&1048576&&a(46,Ae=j`select
    poi.poi_category_h,
    sum(poi.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as poi
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = poi.area_code and xw.is_dominant_ortsteil
where poi.city_code = 'BER' and poi.area_vintage = 'lor_2021'
  and xw.ortsteil_area_code = '${k.code}'
  and poi.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),s.$$.dirty[0]&1048576&&a(47,oe=`select
    poi.poi_category_h,
    sum(poi.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as poi
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = poi.area_code and xw.is_dominant_ortsteil
where poi.city_code = 'BER' and poi.area_vintage = 'lor_2021'
  and xw.ortsteil_area_code = '${k.code}'
  and poi.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'BER' and area_vintage = 'lor_2021'
  )
group by all
order by poi_count desc`),s.$$.dirty[1]&245760&&(Ae||!it?Ae||(je(oe,{noResolve:Ae,...rt}),a(48,it=!0)):je(oe,{noResolve:Ae})),s.$$.dirty[0]&1048576&&a(50,Pe=j`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    xw.overlap_frac_of_plr,
    '/berlin/area/' || xw.plr_area_code as area_link
from gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
left join
    gentriduck_marts.gentrification_index as gi
    on
        gi.area_code = xw.plr_area_code
        and gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
        and gi.period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
where xw.ortsteil_area_code = '${k.code}' and xw.is_dominant_ortsteil
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`),s.$$.dirty[0]&1048576&&a(51,$e=`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
    xw.overlap_frac_of_plr,
    '/berlin/area/' || xw.plr_area_code as area_link
from gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
left join
    gentriduck_marts.gentrification_index as gi
    on
        gi.area_code = xw.plr_area_code
        and gi.variant = 'live_data' and gi.area_level = 'plr' and gi.city_code = 'BER'
        and gi.period_yyyymm = (
            select max(period_yyyymm) from gentriduck_marts.gentrification_index
            where variant = 'live_data' and area_level = 'plr'
        )
where xw.ortsteil_area_code = '${k.code}' and xw.is_dominant_ortsteil
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`),s.$$.dirty[1]&3932160&&(Pe||!wt?Pe||(pe($e,{noResolve:Pe,...nt}),a(52,wt=!0)):pe($e,{noResolve:Pe})),s.$$.dirty[0]&1572864&&a(54,ze=j`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
-- discipline as the /methodology-oa-modes original this table relocates from. Runs unconditionally
-- (#255 precedent) -- returns 0/0 for the two never-dominant enclaves, gated at display time only.
select
    count(*) filter (where d.is_thin_base) as n_suppressed,
    count(*) filter (where not d.is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance as d
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
where d.city_code = 'BER'
  and d.is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and d.area_vintage = 'lor_2021'
  and d.weight_variant = 'standard'
  and d.dominance_group = '${H.dom_group.value}'
  and d.snapshot_year = ${H.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`),s.$$.dirty[0]&1572864&&a(55,we=`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
-- discipline as the /methodology-oa-modes original this table relocates from. Runs unconditionally
-- (#255 precedent) -- returns 0/0 for the two never-dominant enclaves, gated at display time only.
select
    count(*) filter (where d.is_thin_base) as n_suppressed,
    count(*) filter (where not d.is_thin_base) as n_shown
from gentriduck_marts.mart_poi_dominance as d
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
where d.city_code = 'BER'
  and d.is_public_safe = true
  -- area_vintage/weight_variant pinned to avoid double-counting the same PLR across boundary
  -- vintages and weighting schemes -- see pages/berlin/area/bezirk/[code].md's header comment
  -- (#298 finding).
  and d.area_vintage = 'lor_2021'
  and d.weight_variant = 'standard'
  and d.dominance_group = '${H.dom_group.value}'
  and d.snapshot_year = ${H.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`),s.$$.dirty[1]&62914560&&(ze||!vt?ze||(st(we,{noResolve:ze,...D}),a(56,vt=!0)):st(we,{noResolve:ze})),s.$$.dirty[0]&1572864&&a(58,Fe=j`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
-- (mart_poi_dominance is PLR-grain only -- no Ortsteil-level dominance figure exists to relocate).
-- Joined through the SAME dominant-overlap crosswalk (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil)
-- the poi_mix/children queries above already use -- a filter/join, not a new aggregation.
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
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
left join
    gentriduck_marts.gentrification_index as gi
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
    and d.dominance_group = '${H.dom_group.value}'
    and d.snapshot_year = ${H.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`),s.$$.dirty[0]&1572864&&a(59,ve=`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
-- (mart_poi_dominance is PLR-grain only -- no Ortsteil-level dominance figure exists to relocate).
-- Joined through the SAME dominant-overlap crosswalk (mart_ortsteil_plr_crosswalk.is_dominant_ortsteil)
-- the poi_mix/children queries above already use -- a filter/join, not a new aggregation.
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
inner join
    gentriduck_marts.mart_ortsteil_plr_crosswalk as xw
    on xw.plr_area_code = d.area_code and xw.is_dominant_ortsteil
left join
    gentriduck_marts.gentrification_index as gi
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
    and d.dominance_group = '${H.dom_group.value}'
    and d.snapshot_year = ${H.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`),s.$$.dirty[1]&1006632960&&(Fe||!kt?Fe||(he(ve,{noResolve:Fe,...ge}),a(60,kt=!0)):he(ve,{noResolve:Fe})),s.$$.dirty[0]&1048576&&a(62,Te=j`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            typology_stage as stage,
            n_plr as n_areas
        from gentriduck_marts.mart_ortsteil_plr_stage_mix
        where city_code = 'BER' and ortsteil_area_code = '${k.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
              where city_code = 'BER'
          )
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
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&1048576&&a(63,ke=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            typology_stage as stage,
            n_plr as n_areas
        from gentriduck_marts.mart_ortsteil_plr_stage_mix
        where city_code = 'BER' and ortsteil_area_code = '${k.code}'
          and period_yyyymm = (
              select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
              where city_code = 'BER'
          )
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
from totals as t cross join top cross join advanced as a`),s.$$.dirty[1]&1073741824|s.$$.dirty[2]&7&&(Te||!xt?Te||(Ne(ke,{noResolve:Te,...I}),a(64,xt=!0)):Ne(ke,{noResolve:Te})),s.$$.dirty[0]&1048576&&a(66,De=j`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`),s.$$.dirty[0]&1048576&&a(67,xe=`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`),s.$$.dirty[2]&120&&(De||!Rt?De||(Ie(xe,{noResolve:De,...ot}),a(68,Rt=!0)):Ie(xe,{noResolve:De})),s.$$.dirty[0]&1&&a(71,e=((L=We==null?void 0:We[0])==null?void 0:L.area_name)??null),s.$$.dirty[2]&512&&a(16,n=[{label:"Berlin",href:"/berlin"},{label:"Ortsteile",href:"/berlin/area/ortsteil"},{label:e??"Ortsteil"}]),s.$$.dirty[2]&512&&a(15,i=e?`${e} — Ortsteil profile · Berlin`:null),s.$$.dirty[0]&2&&a(4,m=(Ee==null?void 0:Ee[0])&&Number(Ee[0].n)>0),s.$$.dirty[0]&4&&a(70,l=Array.isArray(mt)?mt:Array.from(mt??[])),s.$$.dirty[2]&256&&a(14,h=l.some(lt=>Number(lt.overlap_frac_of_plr)<.8)),s.$$.dirty[0]&8&&a(69,_=ut==null?void 0:ut[0]),s.$$.dirty[0]&16|s.$$.dirty[2]&128&&a(13,b=!m||!_||_.n_total==null||Number(_.n_total)===0?null:(()=>{const lt=Number(_.n_total),Bt=Number(_.n_advanced||0),Et=_.top_stage_share!=null?Number(_.top_stage_share):null,ft=Et!=null&&Et>.5?`<b>${_.top_stage}</b> is the only stage holding a majority (${Math.round(Et*100)}%)`:"no single stage holds a majority";return`<b>${Bt}</b> of <b>${lt}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${ft} — a distribution across this Ortsteil's own (dominantly-assigned) neighbourhoods, never a single re-scored gentrification-index value for the Ortsteil itself.`})())},[We,Ee,mt,ut,m,St,bt,At,ue,fe,jt,Pt,Ft,b,h,i,n,p,o,H,k,Be,P,ct,Je,Ke,ye,ht,Ge,Oe,de,Ze,qe,Me,ce,yt,et,N,Ce,be,$t,tt,He,se,at,rt,Ae,oe,it,nt,Pe,$e,wt,D,ze,we,vt,ge,Fe,ve,kt,I,Te,ke,xt,ot,De,xe,Rt,_,l,e,f]}class li extends Ja{constructor(t){super(),Ka(this,t,Ur,Ir,Pa,{data:17},null,[-1,-1,-1])}}export{li as component};
