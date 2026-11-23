import{s as Pa,d,i as u,a as _e,b as z,c as $,h as ja,e as T,f as Ft,g as Dt,j as B,k as M,l as w,m as L,t as N,n as ha,o as Fa,p as Da,q as Ia,r as Ua,u as Re,w as Ut,v as Wa,H as Qa}from"../chunks/scheduler.wXRIqz25.js";import{S as Ja,i as Ka,d as x,t as y,a as h,c as re,m as R,b as E,e as C,g as ne}from"../chunks/index.uz5rP6Z2.js";import{A as Ga,P as Ya}from"../chunks/PageTitle.X8fTilZx.js";import{A as Xa}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Va}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Za}from"../chunks/Hero.C0o6T8tj.js";import{S as er}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as tr}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as Ma,C as _t}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as ar,w as rr}from"../chunks/entry.DotynpIs.js";import{A as Xe}from"../chunks/Alert.DFISYc09.js";import{e as nr,s as ir,Q as Ue,p as or,a as ya,r as ba,C as sr}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as H}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as $a,a as dt}from"../chunks/Dropdown.Dl2mephJ.js";import{p as lr}from"../chunks/stores.DJGNasUV.js";import{Q as We}from"../chunks/QueryViewer.RFckNDEV.js";import{B as ea}from"../chunks/BarChart.Cy9nf948.js";import{B as Zt}from"../chunks/BigValue.Bpt9v-UH.js";import{p as _r}from"../chunks/profile.BW8tN6E9.js";function dr(i){var n;let t,a=(O.title??((n=O.og)==null?void 0:n.title))+"",e;return{c(){t=L("h1"),e=N(a),this.h()},l(o){t=T(o,"H1",{class:!0});var p=Dt(t);e=B(p,a),p.forEach(d),this.h()},h(){z(t,"class","title")},m(o,p){u(o,t,p),_e(t,e)},p:Re,d(o){o&&d(t)}}}function cr(i){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:Re,p:Re,d:Re}}function mr(i){var p;let t,a,e,n,o;return document.title=t=O.title??((p=O.og)==null?void 0:p.title),{c(){a=w(),e=L("meta"),n=w(),o=L("meta"),this.h()},l(s){a=$(s),e=T(s,"META",{property:!0,content:!0}),n=$(s),o=T(s,"META",{name:!0,content:!0}),this.h()},h(){var s,m;z(e,"property","og:title"),z(e,"content",((s=O.og)==null?void 0:s.title)??O.title),z(o,"name","twitter:title"),z(o,"content",((m=O.og)==null?void 0:m.title)??O.title)},m(s,m){u(s,a,m),u(s,e,m),u(s,n,m),u(s,o,m)},p(s,m){var _;m&0&&t!==(t=O.title??((_=O.og)==null?void 0:_.title))&&(document.title=t)},d(s){s&&(d(a),d(e),d(n),d(o))}}}function ur(i){var o,p;let t,a,e=(O.description||((o=O.og)==null?void 0:o.description))&&fr(),n=((p=O.og)==null?void 0:p.image)&&pr();return{c(){e&&e.c(),t=w(),n&&n.c(),a=Ft()},l(s){e&&e.l(s),t=$(s),n&&n.l(s),a=Ft()},m(s,m){e&&e.m(s,m),u(s,t,m),n&&n.m(s,m),u(s,a,m)},p(s,m){var _,b;(O.description||(_=O.og)!=null&&_.description)&&e.p(s,m),(b=O.og)!=null&&b.image&&n.p(s,m)},d(s){s&&(d(t),d(a)),e&&e.d(s),n&&n.d(s)}}}function fr(i){let t,a,e,n,o;return{c(){t=L("meta"),a=w(),e=L("meta"),n=w(),o=L("meta"),this.h()},l(p){t=T(p,"META",{name:!0,content:!0}),a=$(p),e=T(p,"META",{property:!0,content:!0}),n=$(p),o=T(p,"META",{name:!0,content:!0}),this.h()},h(){var p,s,m;z(t,"name","description"),z(t,"content",O.description??((p=O.og)==null?void 0:p.description)),z(e,"property","og:description"),z(e,"content",((s=O.og)==null?void 0:s.description)??O.description),z(o,"name","twitter:description"),z(o,"content",((m=O.og)==null?void 0:m.description)??O.description)},m(p,s){u(p,t,s),u(p,a,s),u(p,e,s),u(p,n,s),u(p,o,s)},p:Re,d(p){p&&(d(t),d(a),d(e),d(n),d(o))}}}function pr(i){let t,a,e;return{c(){t=L("meta"),a=w(),e=L("meta"),this.h()},l(n){t=T(n,"META",{property:!0,content:!0}),a=$(n),e=T(n,"META",{name:!0,content:!0}),this.h()},h(){var n,o;z(t,"property","og:image"),z(t,"content",ya((n=O.og)==null?void 0:n.image)),z(e,"name","twitter:image"),z(e,"content",ya((o=O.og)==null?void 0:o.image))},m(n,o){u(n,t,o),u(n,a,o),u(n,e,o)},p:Re,d(n){n&&(d(t),d(a),d(e))}}}function wa(i){let t,a;return t=new We({props:{queryID:"ortsteil_name",queryResult:i[0]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&1&&(o.queryResult=e[0]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function va(i){let t,a;return t=new We({props:{queryID:"bezirk_info",queryResult:i[5]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&32&&(o.queryResult=e[5]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function ka(i){let t,a;return t=new We({props:{queryID:"child_count",queryResult:i[1]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&2&&(o.queryResult=e[1]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function xa(i){let t,a;return t=new We({props:{queryID:"demographics",queryResult:i[6]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&64&&(o.queryResult=e[6]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ra(i){let t,a;return t=new We({props:{queryID:"age_mix",queryResult:i[7]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&128&&(o.queryResult=e[7]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ea(i){let t,a;return t=new We({props:{queryID:"stage_mix",queryResult:i[8]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&256&&(o.queryResult=e[8]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ca(i){let t,a;return t=new We({props:{queryID:"poi_mix",queryResult:i[9]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&512&&(o.queryResult=e[9]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function za(i){let t,a;return t=new We({props:{queryID:"children",queryResult:i[2]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&4&&(o.queryResult=e[2]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ta(i){let t,a;return t=new We({props:{queryID:"dom_suppressed_count",queryResult:i[10]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&1024&&(o.queryResult=e[10]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function La(i){let t,a;return t=new We({props:{queryID:"dominance_children",queryResult:i[11]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&2048&&(o.queryResult=e[11]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function gr(i){let t,a="District profile";return{c(){t=L("a"),t.textContent=a,this.h()},l(e){t=T(e,"A",{href:!0,"data-svelte-h":!0}),M(t)!=="svelte-1trtuzf"&&(t.textContent=a),this.h()},h(){z(t,"href","/gentriduck/berlin/area/bezirk")},m(e,n){u(e,t,n)},p:Re,d(e){e&&d(t)}}}function hr(i){let t,a=i[5][0].bezirk_name+"",e,n;return{c(){t=L("a"),e=N(a),this.h()},l(o){t=T(o,"A",{href:!0});var p=Dt(t);e=B(p,a),p.forEach(d),this.h()},h(){z(t,"href",n="/gentriduck/berlin/area/bezirk/"+i[5][0].bezirk_code)},m(o,p){u(o,t,p),_e(t,e)},p(o,p){p[0]&32&&a!==(a=o[5][0].bezirk_name+"")&&Ut(e,a),p[0]&32&&n!==(n="/gentriduck/berlin/area/bezirk/"+o[5][0].bezirk_code)&&z(t,"href",n)},d(o){o&&d(t)}}}function yr(i){let t,a,e=`dominant area-overlap
  assignment`,n,o,p="sums and population-weighted averages",s,m,_="methodology page",b,f,v="full neighbourhood list",g;return{c(){t=N(`Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a `),a=L("b"),a.textContent=e,n=N(` (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are `),o=L("b"),o.textContent=p,s=N(` under
  that assignment — never a separately re-scored index. See the
  `),m=L("a"),m.textContent=_,b=N(` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),f=L("a"),f.textContent=v,g=N(` for the actual
  gentrification index and trajectory.`),this.h()},l(l){t=B(l,`Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a `),a=T(l,"B",{"data-svelte-h":!0}),M(a)!=="svelte-1bbggmu"&&(a.textContent=e),n=B(l,` (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are `),o=T(l,"B",{"data-svelte-h":!0}),M(o)!=="svelte-rhlwxq"&&(o.textContent=p),s=B(l,` under
  that assignment — never a separately re-scored index. See the
  `),m=T(l,"A",{href:!0,"data-svelte-h":!0}),M(m)!=="svelte-1l2pw3"&&(m.textContent=_),b=B(l,` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),f=T(l,"A",{href:!0,"data-svelte-h":!0}),M(f)!=="svelte-z78e0k"&&(f.textContent=v),g=B(l,` for the actual
  gentrification index and trajectory.`),this.h()},h(){z(m,"href","/gentriduck/methodology"),z(f,"href","/gentriduck/berlin/area")},m(l,S){u(l,t,S),u(l,a,S),u(l,n,S),u(l,o,S),u(l,s,S),u(l,m,S),u(l,b,S),u(l,f,S),u(l,g,S)},p:Re,d(l){l&&(d(t),d(a),d(n),d(o),d(s),d(m),d(b),d(f),d(g))}}}function qa(i){let t,a;return t=new Xe({props:{status:"warning",$$slots:{default:[wr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&33|n[2]&1073741824&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function br(i){let t,a="this Ortsteil's district profile";return{c(){t=L("a"),t.textContent=a,this.h()},l(e){t=T(e,"A",{href:!0,"data-svelte-h":!0}),M(t)!=="svelte-mt7m1r"&&(t.textContent=a),this.h()},h(){z(t,"href","/gentriduck/berlin/area/bezirk")},m(e,n){u(e,t,n)},p:Re,d(e){e&&d(t)}}}function $r(i){let t,a=i[5][0].bezirk_name+"",e,n,o;return{c(){t=L("a"),e=N(a),n=N("'s district profile"),this.h()},l(p){t=T(p,"A",{href:!0});var s=Dt(t);e=B(s,a),n=B(s,"'s district profile"),s.forEach(d),this.h()},h(){z(t,"href",o="/gentriduck/berlin/area/bezirk/"+i[5][0].bezirk_code)},m(p,s){u(p,t,s),_e(t,e),_e(t,n)},p(p,s){s[0]&32&&a!==(a=p[5][0].bezirk_name+"")&&Ut(e,a),s[0]&32&&o!==(o="/gentriduck/berlin/area/bezirk/"+p[5][0].bezirk_code)&&z(t,"href",o)},d(p){p&&d(t)}}}function wr(i){let t,a="No Planungsraum is predominantly within this Ortsteil's boundary.",e,n=(i[0][0]?i[0][0].area_name:"This Ortsteil")+"",o,p,s,m="the full Ortsteil list",_,b;function f(l,S){var j;return(j=l[5][0])!=null&&j.bezirk_code?$r:br}let v=f(i),g=v(i);return{c(){t=L("b"),t.textContent=a,e=w(),o=N(n),p=N(` is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  `),s=L("a"),s.textContent=m,_=N(` for the other 95 Ortsteile, or
  `),g.c(),b=N(`
  for area-level statistics instead.`),this.h()},l(l){t=T(l,"B",{"data-svelte-h":!0}),M(t)!=="svelte-1mtqbjl"&&(t.textContent=a),e=$(l),o=B(l,n),p=B(l,` is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  `),s=T(l,"A",{href:!0,"data-svelte-h":!0}),M(s)!=="svelte-17skhuj"&&(s.textContent=m),_=B(l,` for the other 95 Ortsteile, or
  `),g.l(l),b=B(l,`
  for area-level statistics instead.`),this.h()},h(){z(s,"href","/gentriduck/berlin/area/ortsteil")},m(l,S){u(l,t,S),u(l,e,S),u(l,o,S),u(l,p,S),u(l,s,S),u(l,_,S),g.m(l,S),u(l,b,S)},p(l,S){S[0]&1&&n!==(n=(l[0][0]?l[0][0].area_name:"This Ortsteil")+"")&&Ut(o,n),v===(v=f(l))&&g?g.p(l,S):(g.d(1),g=v(l),g&&(g.c(),g.m(b.parentNode,b)))},d(l){l&&(d(t),d(e),d(o),d(p),d(s),d(_),d(b)),g.d(l)}}}function Sa(i){let t,a;return t=new We({props:{queryID:"stage_mix_summary",queryResult:i[3]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&8&&(o.queryResult=e[3]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function vr(i){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[xr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function kr(i){let t,a,e,n,o,p=i[13]&&Oa(i);return a=new ea({props:{data:i[8],x:"stage",y:"n_areas",title:"Neighbourhoods by stage, "+(i[0][0]?i[0][0].area_name:"this Ortsteil"),swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}}}}),n=new er({}),{c(){p&&p.c(),t=w(),C(a.$$.fragment),e=w(),C(n.$$.fragment)},l(s){p&&p.l(s),t=$(s),E(a.$$.fragment,s),e=$(s),E(n.$$.fragment,s)},m(s,m){p&&p.m(s,m),u(s,t,m),R(a,s,m),u(s,e,m),R(n,s,m),o=!0},p(s,m){s[13]?p?p.p(s,m):(p=Oa(s),p.c(),p.m(t.parentNode,t)):p&&(p.d(1),p=null);const _={};m[0]&256&&(_.data=s[8]),m[0]&1&&(_.title="Neighbourhoods by stage, "+(s[0][0]?s[0][0].area_name:"this Ortsteil")),a.$set(_)},i(s){o||(h(a.$$.fragment,s),h(n.$$.fragment,s),o=!0)},o(s){y(a.$$.fragment,s),y(n.$$.fragment,s),o=!1},d(s){s&&(d(t),d(e)),p&&p.d(s),x(a,s),x(n,s)}}}function xr(i){let t;return{c(){t=N("No neighbourhood-stage mix for this enclave — see the note above.")},l(a){t=B(a,"No neighbourhood-stage mix for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Oa(i){let t,a;return{c(){t=L("p"),a=new Qa(!1),this.h()},l(e){t=T(e,"P",{});var n=Dt(t);a=Wa(n,!1),n.forEach(d),this.h()},h(){a.a=null},m(e,n){u(e,t,n),a.m(i[13],t)},p(e,n){n[0]&8192&&a.p(e[13])},d(e){e&&d(t)}}}function Rr(i){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Cr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Er(i){let t,a;return t=new ea({props:{data:i[9],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(i[0][0]?i[0][0].area_name:"this Ortsteil"),swapXY:"true"}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&512&&(o.data=e[9]),n[0]&1&&(o.title="Mapped places by category (latest snapshot), "+(e[0][0]?e[0][0].area_name:"this Ortsteil")),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Cr(i){let t;return{c(){t=N("No mapped-place breakdown for this enclave — see the note above.")},l(a){t=B(a,"No mapped-place breakdown for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function zr(i){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Lr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Tr(i){let t,a,e,n,o,p,s,m,_,b;return t=new Xe({props:{status:"info",$$slots:{default:[qr]},$$scope:{ctx:i}}}),e=new $a({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[Sr]},$$scope:{ctx:i}}}),o=new $a({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[Or]},$$scope:{ctx:i}}}),s=new Xe({props:{status:"info",$$slots:{default:[Br]},$$scope:{ctx:i}}}),_=new Ma({props:{data:i[11],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Ortsteil.",$$slots:{default:[Nr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(o.$$.fragment),p=w(),C(s.$$.fragment),m=w(),C(_.$$.fragment)},l(f){E(t.$$.fragment,f),a=$(f),E(e.$$.fragment,f),n=$(f),E(o.$$.fragment,f),p=$(f),E(s.$$.fragment,f),m=$(f),E(_.$$.fragment,f)},m(f,v){R(t,f,v),u(f,a,v),R(e,f,v),u(f,n,v),R(o,f,v),u(f,p,v),R(s,f,v),u(f,m,v),R(_,f,v),b=!0},p(f,v){const g={};v[2]&1073741824&&(g.$$scope={dirty:v,ctx:f}),t.$set(g);const l={};v[2]&1073741824&&(l.$$scope={dirty:v,ctx:f}),e.$set(l);const S={};v[2]&1073741824&&(S.$$scope={dirty:v,ctx:f}),o.$set(S);const j={};v[0]&1024|v[2]&1073741824&&(j.$$scope={dirty:v,ctx:f}),s.$set(j);const A={};v[0]&2048&&(A.data=f[11]),v[2]&1073741824&&(A.$$scope={dirty:v,ctx:f}),_.$set(A)},i(f){b||(h(t.$$.fragment,f),h(e.$$.fragment,f),h(o.$$.fragment,f),h(s.$$.fragment,f),h(_.$$.fragment,f),b=!0)},o(f){y(t.$$.fragment,f),y(e.$$.fragment,f),y(o.$$.fragment,f),y(s.$$.fragment,f),y(_.$$.fragment,f),b=!1},d(f){f&&(d(a),d(n),d(p),d(m)),x(t,f),x(e,f),x(o,f),x(s,f),x(_,f)}}}function Lr(i){let t;return{c(){t=N("No within-group dominance figures for this enclave — see the note above.")},l(a){t=B(a,"No within-group dominance figures for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function qr(i){let t,a="Dominance is sign-blind",e,n,o="Offering Advantage decoder",p;return{c(){t=L("b"),t.textContent=a,e=N(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=L("a"),n.textContent=o,p=N(` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},l(s){t=T(s,"B",{"data-svelte-h":!0}),M(t)!=="svelte-1m1shgn"&&(t.textContent=a),e=B(s,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=T(s,"A",{href:!0,"data-svelte-h":!0}),M(n)!=="svelte-168mye8"&&(n.textContent=o),p=B(s,` §5 for the full ethics note.
  Where two or more types have exactly the same top share, the table names the alphabetically
  first one; such a tie means that no single type leads, not that the named type dominates.`),this.h()},h(){z(n,"href","/gentriduck/methodology-oa-modes")},m(s,m){u(s,t,m),u(s,e,m),u(s,n,m),u(s,p,m)},p:Re,d(s){s&&(d(t),d(e),d(n),d(p))}}}function Sr(i){let t,a,e,n,o,p,s,m;return t=new dt({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),e=new dt({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),o=new dt({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),s=new dt({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(o.$$.fragment),p=w(),C(s.$$.fragment)},l(_){E(t.$$.fragment,_),a=$(_),E(e.$$.fragment,_),n=$(_),E(o.$$.fragment,_),p=$(_),E(s.$$.fragment,_)},m(_,b){R(t,_,b),u(_,a,b),R(e,_,b),u(_,n,b),R(o,_,b),u(_,p,b),R(s,_,b),m=!0},p:Re,i(_){m||(h(t.$$.fragment,_),h(e.$$.fragment,_),h(o.$$.fragment,_),h(s.$$.fragment,_),m=!0)},o(_){y(t.$$.fragment,_),y(e.$$.fragment,_),y(o.$$.fragment,_),y(s.$$.fragment,_),m=!1},d(_){_&&(d(a),d(n),d(p)),x(t,_),x(e,_),x(o,_),x(s,_)}}}function Or(i){let t,a,e,n,o,p,s,m,_,b,f,v;return t=new dt({props:{value:"2025",valueLabel:"2025"}}),e=new dt({props:{value:"2024",valueLabel:"2024"}}),o=new dt({props:{value:"2023",valueLabel:"2023"}}),s=new dt({props:{value:"2022",valueLabel:"2022"}}),_=new dt({props:{value:"2021",valueLabel:"2021"}}),f=new dt({props:{value:"2020",valueLabel:"2020"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(o.$$.fragment),p=w(),C(s.$$.fragment),m=w(),C(_.$$.fragment),b=w(),C(f.$$.fragment)},l(g){E(t.$$.fragment,g),a=$(g),E(e.$$.fragment,g),n=$(g),E(o.$$.fragment,g),p=$(g),E(s.$$.fragment,g),m=$(g),E(_.$$.fragment,g),b=$(g),E(f.$$.fragment,g)},m(g,l){R(t,g,l),u(g,a,l),R(e,g,l),u(g,n,l),R(o,g,l),u(g,p,l),R(s,g,l),u(g,m,l),R(_,g,l),u(g,b,l),R(f,g,l),v=!0},p:Re,i(g){v||(h(t.$$.fragment,g),h(e.$$.fragment,g),h(o.$$.fragment,g),h(s.$$.fragment,g),h(_.$$.fragment,g),h(f.$$.fragment,g),v=!0)},o(g){y(t.$$.fragment,g),y(e.$$.fragment,g),y(o.$$.fragment,g),y(s.$$.fragment,g),y(_.$$.fragment,g),y(f.$$.fragment,g),v=!1},d(g){g&&(d(a),d(n),d(p),d(m),d(b)),x(t,g),x(e,g),x(o,g),x(s,g),x(_,g),x(f,g)}}}function Br(i){let t,a=(i[10][0]?i[10][0].n_suppressed:0)+"",e,n,o=(i[10][0]?i[10][0].n_suppressed+i[10][0].n_shown:0)+"",p,s,m;return{c(){t=L("b"),e=N(a),n=N(" of "),p=N(o),s=N(" neighbourhoods here are suppressed below as too thinly observed to characterize"),m=N(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(_){t=T(_,"B",{});var b=Dt(t);e=B(b,a),n=B(b," of "),p=B(b,o),s=B(b," neighbourhoods here are suppressed below as too thinly observed to characterize"),b.forEach(d),m=B(_,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(_,b){u(_,t,b),_e(t,e),_e(t,n),_e(t,p),_e(t,s),u(_,m,b)},p(_,b){b[0]&1024&&a!==(a=(_[10][0]?_[10][0].n_suppressed:0)+"")&&Ut(e,a),b[0]&1024&&o!==(o=(_[10][0]?_[10][0].n_suppressed+_[10][0].n_shown:0)+"")&&Ut(p,o)},d(_){_&&(d(t),d(m))}}}function Nr(i){let t,a,e,n,o,p,s,m,_,b,f,v;return t=new _t({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new _t({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),o=new _t({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),s=new _t({props:{id:"top_child",title:"Leading type"}}),_=new _t({props:{id:"n_children",title:"Types in this group here"}}),f=new _t({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(o.$$.fragment),p=w(),C(s.$$.fragment),m=w(),C(_.$$.fragment),b=w(),C(f.$$.fragment)},l(g){E(t.$$.fragment,g),a=$(g),E(e.$$.fragment,g),n=$(g),E(o.$$.fragment,g),p=$(g),E(s.$$.fragment,g),m=$(g),E(_.$$.fragment,g),b=$(g),E(f.$$.fragment,g)},m(g,l){R(t,g,l),u(g,a,l),R(e,g,l),u(g,n,l),R(o,g,l),u(g,p,l),R(s,g,l),u(g,m,l),R(_,g,l),u(g,b,l),R(f,g,l),v=!0},p:Re,i(g){v||(h(t.$$.fragment,g),h(e.$$.fragment,g),h(o.$$.fragment,g),h(s.$$.fragment,g),h(_.$$.fragment,g),h(f.$$.fragment,g),v=!0)},o(g){y(t.$$.fragment,g),y(e.$$.fragment,g),y(o.$$.fragment,g),y(s.$$.fragment,g),y(_.$$.fragment,g),y(f.$$.fragment,g),v=!1},d(g){g&&(d(a),d(n),d(p),d(m),d(b)),x(t,g),x(e,g),x(o,g),x(s,g),x(_,g),x(f,g)}}}function Ar(i){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Hr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Mr(i){let t,a,e,n,o,p,s,m,_;t=new Zt({props:{data:i[6],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),e=new Zt({props:{data:i[6],value:"n_plr",title:"Constituent neighbourhoods (dominant PLR assignment)",emptySet:"warn"}}),o=new Zt({props:{data:i[6],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let b=i[6]&&i[6][0]&&i[6][0].any_indicator_suppressed&&Ba(i);return m=new ea({props:{data:i[7],x:"age_band",y:"share",title:"Age structure, "+(i[0][0]?i[0][0].area_name:"this Ortsteil"),yFmt:"pct0"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(o.$$.fragment),p=w(),b&&b.c(),s=w(),C(m.$$.fragment)},l(f){E(t.$$.fragment,f),a=$(f),E(e.$$.fragment,f),n=$(f),E(o.$$.fragment,f),p=$(f),b&&b.l(f),s=$(f),E(m.$$.fragment,f)},m(f,v){R(t,f,v),u(f,a,v),R(e,f,v),u(f,n,v),R(o,f,v),u(f,p,v),b&&b.m(f,v),u(f,s,v),R(m,f,v),_=!0},p(f,v){const g={};v[0]&64&&(g.data=f[6]),t.$set(g);const l={};v[0]&64&&(l.data=f[6]),e.$set(l);const S={};v[0]&64&&(S.data=f[6]),o.$set(S),f[6]&&f[6][0]&&f[6][0].any_indicator_suppressed?b?v[0]&64&&h(b,1):(b=Ba(f),b.c(),h(b,1),b.m(s.parentNode,s)):b&&(ne(),y(b,1,1,()=>{b=null}),re());const j={};v[0]&128&&(j.data=f[7]),v[0]&1&&(j.title="Age structure, "+(f[0][0]?f[0][0].area_name:"this Ortsteil")),m.$set(j)},i(f){_||(h(t.$$.fragment,f),h(e.$$.fragment,f),h(o.$$.fragment,f),h(b),h(m.$$.fragment,f),_=!0)},o(f){y(t.$$.fragment,f),y(e.$$.fragment,f),y(o.$$.fragment,f),y(b),y(m.$$.fragment,f),_=!1},d(f){f&&(d(a),d(n),d(p),d(s)),x(t,f),x(e,f),x(o,f),b&&b.d(f),x(m,f)}}}function Hr(i){let t;return{c(){t=N("No population/composition figures for this enclave — see the note above.")},l(a){t=B(a,"No population/composition figures for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Ba(i){let t,a;return t=new Xe({props:{status:"warning",$$slots:{default:[Pr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Pr(i){let t;return{c(){t=N(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.`)},l(a){t=B(a,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.`)},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Na(i){let t,a;return t=new We({props:{queryID:"minimap_areas",queryResult:i[12]}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[0]&4096&&(o.queryResult=e[12]),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function jr(i){let t,a;return t=new Xe({props:{status:"info",$$slots:{default:[Dr]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},p(e,n){const o={};n[2]&1073741824&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Fr(i){let t,a,e,n,o,p;t=new Ma({props:{data:i[2],rows:"20",link:"area_link",$$slots:{default:[Ir]},$$scope:{ctx:i}}}),e=new tr({});let s=i[14]&&Aa(i);return{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),s&&s.c(),o=Ft()},l(m){E(t.$$.fragment,m),a=$(m),E(e.$$.fragment,m),n=$(m),s&&s.l(m),o=Ft()},m(m,_){R(t,m,_),u(m,a,_),R(e,m,_),u(m,n,_),s&&s.m(m,_),u(m,o,_),p=!0},p(m,_){const b={};_[0]&4&&(b.data=m[2]),_[2]&1073741824&&(b.$$scope={dirty:_,ctx:m}),t.$set(b),m[14]?s?_[0]&16384&&h(s,1):(s=Aa(m),s.c(),h(s,1),s.m(o.parentNode,o)):s&&(ne(),y(s,1,1,()=>{s=null}),re())},i(m){p||(h(t.$$.fragment,m),h(e.$$.fragment,m),h(s),p=!0)},o(m){y(t.$$.fragment,m),y(e.$$.fragment,m),y(s),p=!1},d(m){m&&(d(a),d(n),d(o)),x(t,m),x(e,m),s&&s.d(m)}}}function Dr(i){let t;return{c(){t=N("No constituent neighbourhoods for this enclave — see the note above.")},l(a){t=B(a,"No constituent neighbourhoods for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Ir(i){let t,a,e,n,o,p,s,m;return t=new _t({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new _t({props:{id:"stage",title:"Stage",wrap:"true"}}),o=new _t({props:{id:"status_trend",title:"Status trend"}}),s=new _t({props:{id:"overlap_frac_of_plr",title:"% of PLR within this Ortsteil",fmt:"pct0"}}),{c(){C(t.$$.fragment),a=w(),C(e.$$.fragment),n=w(),C(o.$$.fragment),p=w(),C(s.$$.fragment)},l(_){E(t.$$.fragment,_),a=$(_),E(e.$$.fragment,_),n=$(_),E(o.$$.fragment,_),p=$(_),E(s.$$.fragment,_)},m(_,b){R(t,_,b),u(_,a,b),R(e,_,b),u(_,n,b),R(o,_,b),u(_,p,b),R(s,_,b),m=!0},p:Re,i(_){m||(h(t.$$.fragment,_),h(e.$$.fragment,_),h(o.$$.fragment,_),h(s.$$.fragment,_),m=!0)},o(_){y(t.$$.fragment,_),y(e.$$.fragment,_),y(o.$$.fragment,_),y(s.$$.fragment,_),m=!1},d(_){_&&(d(a),d(n),d(p)),x(t,_),x(e,_),x(o,_),x(s,_)}}}function Aa(i){let t,a;return t=new Xe({props:{status:"warning",$$slots:{default:[Ur]},$$scope:{ctx:i}}}),{c(){C(t.$$.fragment)},l(e){E(t.$$.fragment,e)},m(e,n){R(t,e,n),a=!0},i(e){a||(h(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){x(t,e)}}}function Ur(i){let t,a,e="partially",n,o,p="methodology page",s;return{c(){t=N("At least one neighbourhood above is only "),a=L("b"),a.textContent=e,n=N(` (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  `),o=L("a"),o.textContent=p,s=N(` for why a whole-PLR figure, not a fractional split, is
  used.`),this.h()},l(m){t=B(m,"At least one neighbourhood above is only "),a=T(m,"B",{"data-svelte-h":!0}),M(a)!=="svelte-lw0a3u"&&(a.textContent=e),n=B(m,` (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  `),o=T(m,"A",{href:!0,"data-svelte-h":!0}),M(o)!=="svelte-1l2pw3"&&(o.textContent=p),s=B(m,` for why a whole-PLR figure, not a fractional split, is
  used.`),this.h()},h(){z(o,"href","/gentriduck/methodology")},m(m,_){u(m,t,_),u(m,a,_),u(m,n,_),u(m,o,_),u(m,s,_)},p:Re,d(m){m&&(d(t),d(a),d(n),d(o),d(s))}}}function Wr(i){var ma;let t,a,e,n,o,p,s,m,_,b,f,v,g,l,S,j,A,Ve,ie,k,Oe,P,ct,Qe,Je,Bt="all Ortsteile",Ke,ye,ht="all districts",St,Ge,Nt="full neighbourhood list",Be,de,Ze,Ee,Le,At='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Ne,ce,yt=`Every neighbourhood (Planungsraum) dominantly assigned to this Ortsteil, grouped by its current
gentrification stage — a <strong class="markdown">count</strong>, not a re-scored Ortsteil-level index. See the
<a href="/gentriduck/methodology" class="markdown">methodology page</a> for what each stage means; see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code> for
why this project reports a distribution here, never a single re-scored index value, at any grain
coarser than a single Planungsraum.`,bt,et,me,F,Ce,be,Mt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',$t,qe,tt='<a href="#mapped-places">Mapped places</a>',Ae,oe,ue,at,Se,rt='<a href="#within-group-dominance">Within-group dominance</a>',Me,se,fe,nt,He,it=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Pe,$e,mt='<a href="#people--structure">People &amp; structure</a>',wt,pe,D,ze,we,Ht='<a href="#where-this-area-sits">Where this area sits</a>',vt,ot,ge,je,ve,Pt='<a href="#neighbourhoods-planungsräume-dominantly-assigned-to-this-ortsteil">Neighbourhoods (Planungsräume) dominantly assigned to this Ortsteil</a>',kt,he,I,Te,ke,ut='<a href="#honest-caveats">Honest caveats</a>',xt,Fe,st=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Ortsteil</strong> — only
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,De,xe,jt='<a href="#further-reading">Further reading</a>',Rt,Ie,q=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area/ortsteil" class="markdown">the full Ortsteil list</a>
for other Ortsteile, or drill into any of this Ortsteil&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,lt,Ot,Et,ft,Wt,pt=typeof O<"u"&&(O.title||((ma=O.og)==null?void 0:ma.title))&&O.hide_title!==!0&&dr();function Ha(r,c){var le;return typeof O<"u"&&(O.title||(le=O.og)!=null&&le.title)?mr:cr}let It=Ha()(i),gt=typeof O=="object"&&ur(),U=i[0]&&wa(i),W=i[5]&&va(i),Q=i[1]&&ka(i),J=i[6]&&xa(i),K=i[7]&&Ra(i),G=i[8]&&Ea(i),Y=i[9]&&Ca(i),X=i[2]&&za(i),V=i[10]&&Ta(i),Z=i[11]&&La(i);j=new Ga({props:{crumbs:i[16]}}),Ve=new Ya({props:{title:i[15]}}),k=new Za({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(i[0][0]?i[0][0].area_name:"Ortsteil")+" — Ortsteil profile",lede:"Population, composition, and neighbourhood-stage mix for this Ortsteil (Stadtteil), rolled up from its dominantly-assigned constituent Planungsräume — never a re-scored index at this grain."}});function ta(r,c){var le;return(le=r[5][0])!=null&&le.bezirk_code?hr:gr}let Qt=ta(i),Ye=Qt(i);de=new Xe({props:{status:"info",$$slots:{default:[yr]},$$scope:{ctx:i}}});let ee=!i[4]&&qa(i),te=i[3]&&Sa(i);const aa=[kr,vr],Ct=[];function ra(r,c){return r[4]?0:1}me=ra(i),F=Ct[me]=aa[me](i);const na=[Er,Rr],zt=[];function ia(r,c){return r[4]?0:1}oe=ia(i),ue=zt[oe]=na[oe](i);const oa=[Tr,zr],Tt=[];function sa(r,c){return r[4]?0:1}se=sa(i),fe=Tt[se]=oa[se](i);const la=[Mr,Ar],Lt=[];function _a(r,c){return r[4]?0:1}pe=_a(i),D=Lt[pe]=la[pe](i);let ae=i[12]&&Na(i);ge=new Xa({props:{data:i[12],geoJsonUrl:`${ar}/geo/ortsteil_self.geojson`,title:i[0][0]?i[0][0].area_name:"This Ortsteil"}});const da=[Fr,jr],qt=[];function ca(r,c){return r[4]?0:1}return he=ca(i),I=qt[he]=da[he](i),ft=new Va({}),{c(){pt&&pt.c(),t=w(),It.c(),a=L("meta"),e=L("meta"),gt&&gt.c(),n=Ft(),o=w(),U&&U.c(),p=w(),W&&W.c(),s=w(),Q&&Q.c(),m=w(),J&&J.c(),_=w(),K&&K.c(),b=w(),G&&G.c(),f=w(),Y&&Y.c(),v=w(),X&&X.c(),g=w(),V&&V.c(),l=w(),Z&&Z.c(),S=w(),C(j.$$.fragment),A=w(),C(Ve.$$.fragment),ie=w(),C(k.$$.fragment),Oe=w(),P=L("p"),ct=N("Up: "),Ye.c(),Qe=N(" · "),Je=L("a"),Je.textContent=Bt,Ke=N(" · "),ye=L("a"),ye.textContent=ht,St=N(" · "),Ge=L("a"),Ge.textContent=Nt,Be=w(),C(de.$$.fragment),Ze=w(),ee&&ee.c(),Ee=w(),Le=L("h2"),Le.innerHTML=At,Ne=w(),ce=L("p"),ce.innerHTML=yt,bt=w(),te&&te.c(),et=w(),F.c(),Ce=w(),be=L("h2"),be.innerHTML=Mt,$t=w(),qe=L("h3"),qe.innerHTML=tt,Ae=w(),ue.c(),at=w(),Se=L("h2"),Se.innerHTML=rt,Me=w(),fe.c(),nt=w(),He=L("p"),He.innerHTML=it,Pe=w(),$e=L("h2"),$e.innerHTML=mt,wt=w(),D.c(),ze=w(),we=L("h2"),we.innerHTML=Ht,vt=w(),ae&&ae.c(),ot=w(),C(ge.$$.fragment),je=w(),ve=L("h3"),ve.innerHTML=Pt,kt=w(),I.c(),Te=w(),ke=L("h2"),ke.innerHTML=ut,xt=w(),Fe=L("ul"),Fe.innerHTML=st,De=w(),xe=L("h2"),xe.innerHTML=jt,Rt=w(),Ie=L("p"),Ie.innerHTML=q,lt=w(),Ot=L("hr"),Et=w(),C(ft.$$.fragment),this.h()},l(r){pt&&pt.l(r),t=$(r);const c=ja("svelte-2igo1p",document.head);It.l(c),a=T(c,"META",{name:!0,content:!0}),e=T(c,"META",{name:!0,content:!0}),gt&&gt.l(c),n=Ft(),c.forEach(d),o=$(r),U&&U.l(r),p=$(r),W&&W.l(r),s=$(r),Q&&Q.l(r),m=$(r),J&&J.l(r),_=$(r),K&&K.l(r),b=$(r),G&&G.l(r),f=$(r),Y&&Y.l(r),v=$(r),X&&X.l(r),g=$(r),V&&V.l(r),l=$(r),Z&&Z.l(r),S=$(r),E(j.$$.fragment,r),A=$(r),E(Ve.$$.fragment,r),ie=$(r),E(k.$$.fragment,r),Oe=$(r),P=T(r,"P",{});var le=Dt(P);ct=B(le,"Up: "),Ye.l(le),Qe=B(le," · "),Je=T(le,"A",{href:!0,"data-svelte-h":!0}),M(Je)!=="svelte-1eye8e9"&&(Je.textContent=Bt),Ke=B(le," · "),ye=T(le,"A",{href:!0,"data-svelte-h":!0}),M(ye)!=="svelte-6j2qr0"&&(ye.textContent=ht),St=B(le," · "),Ge=T(le,"A",{href:!0,"data-svelte-h":!0}),M(Ge)!=="svelte-z78e0k"&&(Ge.textContent=Nt),le.forEach(d),Be=$(r),E(de.$$.fragment,r),Ze=$(r),ee&&ee.l(r),Ee=$(r),Le=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(Le)!=="svelte-14f17uo"&&(Le.innerHTML=At),Ne=$(r),ce=T(r,"P",{class:!0,"data-svelte-h":!0}),M(ce)!=="svelte-pighte"&&(ce.innerHTML=yt),bt=$(r),te&&te.l(r),et=$(r),F.l(r),Ce=$(r),be=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(be)!=="svelte-1i9w9pn"&&(be.innerHTML=Mt),$t=$(r),qe=T(r,"H3",{class:!0,id:!0,"data-svelte-h":!0}),M(qe)!=="svelte-3hvew3"&&(qe.innerHTML=tt),Ae=$(r),ue.l(r),at=$(r),Se=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(Se)!=="svelte-4kb45v"&&(Se.innerHTML=rt),Me=$(r),fe.l(r),nt=$(r),He=T(r,"P",{class:!0,"data-svelte-h":!0}),M(He)!=="svelte-1xa7bh7"&&(He.innerHTML=it),Pe=$(r),$e=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M($e)!=="svelte-1mdzqzc"&&($e.innerHTML=mt),wt=$(r),D.l(r),ze=$(r),we=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(we)!=="svelte-60cjj9"&&(we.innerHTML=Ht),vt=$(r),ae&&ae.l(r),ot=$(r),E(ge.$$.fragment,r),je=$(r),ve=T(r,"H3",{class:!0,id:!0,"data-svelte-h":!0}),M(ve)!=="svelte-140mx4a"&&(ve.innerHTML=Pt),kt=$(r),I.l(r),Te=$(r),ke=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(ke)!=="svelte-ad0syq"&&(ke.innerHTML=ut),xt=$(r),Fe=T(r,"UL",{class:!0,"data-svelte-h":!0}),M(Fe)!=="svelte-1j76xu"&&(Fe.innerHTML=st),De=$(r),xe=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),M(xe)!=="svelte-oimjns"&&(xe.innerHTML=jt),Rt=$(r),Ie=T(r,"P",{class:!0,"data-svelte-h":!0}),M(Ie)!=="svelte-lhsrox"&&(Ie.innerHTML=q),lt=$(r),Ot=T(r,"HR",{class:!0}),Et=$(r),E(ft.$$.fragment,r),this.h()},h(){z(a,"name","twitter:card"),z(a,"content","summary_large_image"),z(e,"name","twitter:site"),z(e,"content","@evidence_dev"),z(Je,"href","/gentriduck/berlin/area/ortsteil"),z(ye,"href","/gentriduck/berlin/area/bezirk"),z(Ge,"href","/gentriduck/berlin/area"),z(Le,"class","markdown"),z(Le,"id","social-status--trajectory"),z(ce,"class","markdown"),z(be,"class","markdown"),z(be,"id","commercial-mix--offering-advantage"),z(qe,"class","markdown"),z(qe,"id","mapped-places"),z(Se,"class","markdown"),z(Se,"id","within-group-dominance"),z(He,"class","markdown"),z($e,"class","markdown"),z($e,"id","people--structure"),z(we,"class","markdown"),z(we,"id","where-this-area-sits"),z(ve,"class","markdown"),z(ve,"id","neighbourhoods-planungsräume-dominantly-assigned-to-this-ortsteil"),z(ke,"class","markdown"),z(ke,"id","honest-caveats"),z(Fe,"class","markdown"),z(xe,"class","markdown"),z(xe,"id","further-reading"),z(Ie,"class","markdown"),z(Ot,"class","markdown")},m(r,c){pt&&pt.m(r,c),u(r,t,c),It.m(document.head,null),_e(document.head,a),_e(document.head,e),gt&&gt.m(document.head,null),_e(document.head,n),u(r,o,c),U&&U.m(r,c),u(r,p,c),W&&W.m(r,c),u(r,s,c),Q&&Q.m(r,c),u(r,m,c),J&&J.m(r,c),u(r,_,c),K&&K.m(r,c),u(r,b,c),G&&G.m(r,c),u(r,f,c),Y&&Y.m(r,c),u(r,v,c),X&&X.m(r,c),u(r,g,c),V&&V.m(r,c),u(r,l,c),Z&&Z.m(r,c),u(r,S,c),R(j,r,c),u(r,A,c),R(Ve,r,c),u(r,ie,c),R(k,r,c),u(r,Oe,c),u(r,P,c),_e(P,ct),Ye.m(P,null),_e(P,Qe),_e(P,Je),_e(P,Ke),_e(P,ye),_e(P,St),_e(P,Ge),u(r,Be,c),R(de,r,c),u(r,Ze,c),ee&&ee.m(r,c),u(r,Ee,c),u(r,Le,c),u(r,Ne,c),u(r,ce,c),u(r,bt,c),te&&te.m(r,c),u(r,et,c),Ct[me].m(r,c),u(r,Ce,c),u(r,be,c),u(r,$t,c),u(r,qe,c),u(r,Ae,c),zt[oe].m(r,c),u(r,at,c),u(r,Se,c),u(r,Me,c),Tt[se].m(r,c),u(r,nt,c),u(r,He,c),u(r,Pe,c),u(r,$e,c),u(r,wt,c),Lt[pe].m(r,c),u(r,ze,c),u(r,we,c),u(r,vt,c),ae&&ae.m(r,c),u(r,ot,c),R(ge,r,c),u(r,je,c),u(r,ve,c),u(r,kt,c),qt[he].m(r,c),u(r,Te,c),u(r,ke,c),u(r,xt,c),u(r,Fe,c),u(r,De,c),u(r,xe,c),u(r,Rt,c),u(r,Ie,c),u(r,lt,c),u(r,Ot,c),u(r,Et,c),R(ft,r,c),Wt=!0},p(r,c){var ga;typeof O<"u"&&(O.title||(ga=O.og)!=null&&ga.title)&&O.hide_title!==!0&&pt.p(r,c),It.p(r,c),typeof O=="object"&&gt.p(r,c),r[0]?U?(U.p(r,c),c[0]&1&&h(U,1)):(U=wa(r),U.c(),h(U,1),U.m(p.parentNode,p)):U&&(ne(),y(U,1,1,()=>{U=null}),re()),r[5]?W?(W.p(r,c),c[0]&32&&h(W,1)):(W=va(r),W.c(),h(W,1),W.m(s.parentNode,s)):W&&(ne(),y(W,1,1,()=>{W=null}),re()),r[1]?Q?(Q.p(r,c),c[0]&2&&h(Q,1)):(Q=ka(r),Q.c(),h(Q,1),Q.m(m.parentNode,m)):Q&&(ne(),y(Q,1,1,()=>{Q=null}),re()),r[6]?J?(J.p(r,c),c[0]&64&&h(J,1)):(J=xa(r),J.c(),h(J,1),J.m(_.parentNode,_)):J&&(ne(),y(J,1,1,()=>{J=null}),re()),r[7]?K?(K.p(r,c),c[0]&128&&h(K,1)):(K=Ra(r),K.c(),h(K,1),K.m(b.parentNode,b)):K&&(ne(),y(K,1,1,()=>{K=null}),re()),r[8]?G?(G.p(r,c),c[0]&256&&h(G,1)):(G=Ea(r),G.c(),h(G,1),G.m(f.parentNode,f)):G&&(ne(),y(G,1,1,()=>{G=null}),re()),r[9]?Y?(Y.p(r,c),c[0]&512&&h(Y,1)):(Y=Ca(r),Y.c(),h(Y,1),Y.m(v.parentNode,v)):Y&&(ne(),y(Y,1,1,()=>{Y=null}),re()),r[2]?X?(X.p(r,c),c[0]&4&&h(X,1)):(X=za(r),X.c(),h(X,1),X.m(g.parentNode,g)):X&&(ne(),y(X,1,1,()=>{X=null}),re()),r[10]?V?(V.p(r,c),c[0]&1024&&h(V,1)):(V=Ta(r),V.c(),h(V,1),V.m(l.parentNode,l)):V&&(ne(),y(V,1,1,()=>{V=null}),re()),r[11]?Z?(Z.p(r,c),c[0]&2048&&h(Z,1)):(Z=La(r),Z.c(),h(Z,1),Z.m(S.parentNode,S)):Z&&(ne(),y(Z,1,1,()=>{Z=null}),re());const le={};c[0]&65536&&(le.crumbs=r[16]),j.$set(le);const ua={};c[0]&32768&&(ua.title=r[15]),Ve.$set(ua);const fa={};c[0]&1&&(fa.title=(r[0][0]?r[0][0].area_name:"Ortsteil")+" — Ortsteil profile"),k.$set(fa),Qt===(Qt=ta(r))&&Ye?Ye.p(r,c):(Ye.d(1),Ye=Qt(r),Ye&&(Ye.c(),Ye.m(P,Qe)));const pa={};c[2]&1073741824&&(pa.$$scope={dirty:c,ctx:r}),de.$set(pa),r[4]?ee&&(ne(),y(ee,1,1,()=>{ee=null}),re()):ee?(ee.p(r,c),c[0]&16&&h(ee,1)):(ee=qa(r),ee.c(),h(ee,1),ee.m(Ee.parentNode,Ee)),r[3]?te?(te.p(r,c),c[0]&8&&h(te,1)):(te=Sa(r),te.c(),h(te,1),te.m(et.parentNode,et)):te&&(ne(),y(te,1,1,()=>{te=null}),re());let Jt=me;me=ra(r),me===Jt?Ct[me].p(r,c):(ne(),y(Ct[Jt],1,1,()=>{Ct[Jt]=null}),re(),F=Ct[me],F?F.p(r,c):(F=Ct[me]=aa[me](r),F.c()),h(F,1),F.m(Ce.parentNode,Ce));let Kt=oe;oe=ia(r),oe===Kt?zt[oe].p(r,c):(ne(),y(zt[Kt],1,1,()=>{zt[Kt]=null}),re(),ue=zt[oe],ue?ue.p(r,c):(ue=zt[oe]=na[oe](r),ue.c()),h(ue,1),ue.m(at.parentNode,at));let Gt=se;se=sa(r),se===Gt?Tt[se].p(r,c):(ne(),y(Tt[Gt],1,1,()=>{Tt[Gt]=null}),re(),fe=Tt[se],fe?fe.p(r,c):(fe=Tt[se]=oa[se](r),fe.c()),h(fe,1),fe.m(nt.parentNode,nt));let Yt=pe;pe=_a(r),pe===Yt?Lt[pe].p(r,c):(ne(),y(Lt[Yt],1,1,()=>{Lt[Yt]=null}),re(),D=Lt[pe],D?D.p(r,c):(D=Lt[pe]=la[pe](r),D.c()),h(D,1),D.m(ze.parentNode,ze)),r[12]?ae?(ae.p(r,c),c[0]&4096&&h(ae,1)):(ae=Na(r),ae.c(),h(ae,1),ae.m(ot.parentNode,ot)):ae&&(ne(),y(ae,1,1,()=>{ae=null}),re());const Xt={};c[0]&4096&&(Xt.data=r[12]),c[0]&1&&(Xt.title=r[0][0]?r[0][0].area_name:"This Ortsteil"),ge.$set(Xt);let Vt=he;he=ca(r),he===Vt?qt[he].p(r,c):(ne(),y(qt[Vt],1,1,()=>{qt[Vt]=null}),re(),I=qt[he],I?I.p(r,c):(I=qt[he]=da[he](r),I.c()),h(I,1),I.m(Te.parentNode,Te))},i(r){Wt||(h(U),h(W),h(Q),h(J),h(K),h(G),h(Y),h(X),h(V),h(Z),h(j.$$.fragment,r),h(Ve.$$.fragment,r),h(k.$$.fragment,r),h(de.$$.fragment,r),h(ee),h(te),h(F),h(ue),h(fe),h(D),h(ae),h(ge.$$.fragment,r),h(I),h(ft.$$.fragment,r),Wt=!0)},o(r){y(U),y(W),y(Q),y(J),y(K),y(G),y(Y),y(X),y(V),y(Z),y(j.$$.fragment,r),y(Ve.$$.fragment,r),y(k.$$.fragment,r),y(de.$$.fragment,r),y(ee),y(te),y(F),y(ue),y(fe),y(D),y(ae),y(ge.$$.fragment,r),y(I),y(ft.$$.fragment,r),Wt=!1},d(r){r&&(d(t),d(o),d(p),d(s),d(m),d(_),d(b),d(f),d(v),d(g),d(l),d(S),d(A),d(ie),d(Oe),d(P),d(Be),d(Ze),d(Ee),d(Le),d(Ne),d(ce),d(bt),d(et),d(Ce),d(be),d($t),d(qe),d(Ae),d(at),d(Se),d(Me),d(nt),d(He),d(Pe),d($e),d(wt),d(ze),d(we),d(vt),d(ot),d(je),d(ve),d(kt),d(Te),d(ke),d(xt),d(Fe),d(De),d(xe),d(Rt),d(Ie),d(lt),d(Ot),d(Et)),pt&&pt.d(r),It.d(r),d(a),d(e),gt&&gt.d(r),d(n),U&&U.d(r),W&&W.d(r),Q&&Q.d(r),J&&J.d(r),K&&K.d(r),G&&G.d(r),Y&&Y.d(r),X&&X.d(r),V&&V.d(r),Z&&Z.d(r),x(j,r),x(Ve,r),x(k,r),Ye.d(),x(de,r),ee&&ee.d(r),te&&te.d(r),Ct[me].d(r),zt[oe].d(r),Tt[se].d(r),Lt[pe].d(r),ae&&ae.d(r),x(ge,r),qt[he].d(r),x(ft,r)}}}const O={};function Qr(i,t,a){let e,n,o,p,s,m,_,b,f,v;ha(i,lr,q=>a(72,f=q)),ha(i,ba,q=>a(76,v=q));let{data:g}=t,{data:l={},customFormattingSettings:S,__db:j,inputs:A}=g;Fa(ba,v="865e864f193aaf1ad3eb98cb754fbd9d",v);let Ve=nr(rr(A));Da(Ve.subscribe(q=>a(19,A=q))),Ia(sr,{getCustomFormats:()=>S.customFormats||[]});const ie=(q,lt)=>_r(j.query,q,{query_name:lt});ir(ie);let k=f.params;Ua(()=>!0);let Oe={initialData:void 0,initialError:void 0},P=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`,ct=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`;l.ortsteil_name_data&&(l.ortsteil_name_data instanceof Error?Oe.initialError=l.ortsteil_name_data:Oe.initialData=l.ortsteil_name_data,l.ortsteil_name_columns&&(Oe.knownColumns=l.ortsteil_name_columns));let Qe,Je=!1;const Bt=Ue.createReactive({callback:q=>{a(0,Qe=q)},execFn:ie},{id:"ortsteil_name",...Oe});Bt(ct,{noResolve:P,...Oe}),globalThis[Symbol.for("ortsteil_name")]={get value(){return Qe}};let Ke={initialData:void 0,initialError:void 0},ye=H`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`;l.bezirk_info_data&&(l.bezirk_info_data instanceof Error?Ke.initialError=l.bezirk_info_data:Ke.initialData=l.bezirk_info_data,l.bezirk_info_columns&&(Ke.knownColumns=l.bezirk_info_columns));let St,Ge=!1;const Nt=Ue.createReactive({callback:q=>{a(5,St=q)},execFn:ie},{id:"bezirk_info",...Ke});Nt(ht,{noResolve:ye,...Ke}),globalThis[Symbol.for("bezirk_info")]={get value(){return St}};let Be={initialData:void 0,initialError:void 0},de=H`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`,Ze=`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`;l.child_count_data&&(l.child_count_data instanceof Error?Be.initialError=l.child_count_data:Be.initialData=l.child_count_data,l.child_count_columns&&(Be.knownColumns=l.child_count_columns));let Ee,Le=!1;const At=Ue.createReactive({callback:q=>{a(1,Ee=q)},execFn:ie},{id:"child_count",...Be});At(Ze,{noResolve:de,...Be}),globalThis[Symbol.for("child_count")]={get value(){return Ee}};let Ne={initialData:void 0,initialError:void 0},ce=H`select
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
limit 1`;l.demographics_data&&(l.demographics_data instanceof Error?Ne.initialError=l.demographics_data:Ne.initialData=l.demographics_data,l.demographics_columns&&(Ne.knownColumns=l.demographics_columns));let bt,et=!1;const me=Ue.createReactive({callback:q=>{a(6,bt=q)},execFn:ie},{id:"demographics",...Ne});me(yt,{noResolve:ce,...Ne}),globalThis[Symbol.for("demographics")]={get value(){return bt}};let F={initialData:void 0,initialError:void 0},Ce=H`with latest as (
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
order by sort_order`;l.age_mix_data&&(l.age_mix_data instanceof Error?F.initialError=l.age_mix_data:F.initialData=l.age_mix_data,l.age_mix_columns&&(F.knownColumns=l.age_mix_columns));let Mt,$t=!1;const qe=Ue.createReactive({callback:q=>{a(7,Mt=q)},execFn:ie},{id:"age_mix",...F});qe(be,{noResolve:Ce,...F}),globalThis[Symbol.for("age_mix")]={get value(){return Mt}};let tt={initialData:void 0,initialError:void 0},Ae=H`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`,oe=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`;l.stage_mix_data&&(l.stage_mix_data instanceof Error?tt.initialError=l.stage_mix_data:tt.initialData=l.stage_mix_data,l.stage_mix_columns&&(tt.knownColumns=l.stage_mix_columns));let ue,at=!1;const Se=Ue.createReactive({callback:q=>{a(8,ue=q)},execFn:ie},{id:"stage_mix",...tt});Se(oe,{noResolve:Ae,...tt}),globalThis[Symbol.for("stage_mix")]={get value(){return ue}};let rt={initialData:void 0,initialError:void 0},Me=H`select
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
order by poi_count desc`,se=`select
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
order by poi_count desc`;l.poi_mix_data&&(l.poi_mix_data instanceof Error?rt.initialError=l.poi_mix_data:rt.initialData=l.poi_mix_data,l.poi_mix_columns&&(rt.knownColumns=l.poi_mix_columns));let fe,nt=!1;const He=Ue.createReactive({callback:q=>{a(9,fe=q)},execFn:ie},{id:"poi_mix",...rt});He(se,{noResolve:Me,...rt}),globalThis[Symbol.for("poi_mix")]={get value(){return fe}};let it={initialData:void 0,initialError:void 0},Pe=H`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, area_name, area_code`,$e=`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, area_name, area_code`;l.children_data&&(l.children_data instanceof Error?it.initialError=l.children_data:it.initialData=l.children_data,l.children_columns&&(it.knownColumns=l.children_columns));let mt,wt=!1;const pe=Ue.createReactive({callback:q=>{a(2,mt=q)},execFn:ie},{id:"children",...it});pe($e,{noResolve:Pe,...it}),globalThis[Symbol.for("children")]={get value(){return mt}};let D={initialData:void 0,initialError:void 0},ze=H`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${A.dom_group.value}'
  and d.snapshot_year = ${A.dom_year.value}
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
  and d.dominance_group = '${A.dom_group.value}'
  and d.snapshot_year = ${A.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`;l.dom_suppressed_count_data&&(l.dom_suppressed_count_data instanceof Error?D.initialError=l.dom_suppressed_count_data:D.initialData=l.dom_suppressed_count_data,l.dom_suppressed_count_columns&&(D.knownColumns=l.dom_suppressed_count_columns));let Ht,vt=!1;const ot=Ue.createReactive({callback:q=>{a(10,Ht=q)},execFn:ie},{id:"dom_suppressed_count",...D});ot(we,{noResolve:ze,...D}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return Ht}};let ge={initialData:void 0,initialError:void 0},je=H`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${A.dom_group.value}'
    and d.snapshot_year = ${A.dom_year.value}
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
    and d.dominance_group = '${A.dom_group.value}'
    and d.snapshot_year = ${A.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`;l.dominance_children_data&&(l.dominance_children_data instanceof Error?ge.initialError=l.dominance_children_data:ge.initialData=l.dominance_children_data,l.dominance_children_columns&&(ge.knownColumns=l.dominance_children_columns));let Pt,kt=!1;const he=Ue.createReactive({callback:q=>{a(11,Pt=q)},execFn:ie},{id:"dominance_children",...ge});he(ve,{noResolve:je,...ge}),globalThis[Symbol.for("dominance_children")]={get value(){return Pt}};let I={initialData:void 0,initialError:void 0},Te=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
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
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`;l.stage_mix_summary_data&&(l.stage_mix_summary_data instanceof Error?I.initialError=l.stage_mix_summary_data:I.initialData=l.stage_mix_summary_data,l.stage_mix_summary_columns&&(I.knownColumns=l.stage_mix_summary_columns));let ut,xt=!1;const Fe=Ue.createReactive({callback:q=>{a(3,ut=q)},execFn:ie},{id:"stage_mix_summary",...I});Fe(ke,{noResolve:Te,...I}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return ut}};let st={initialData:void 0,initialError:void 0},De=H`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
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
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`;l.minimap_areas_data&&(l.minimap_areas_data instanceof Error?st.initialError=l.minimap_areas_data:st.initialData=l.minimap_areas_data,l.minimap_areas_columns&&(st.knownColumns=l.minimap_areas_columns));let jt,Rt=!1;const Ie=Ue.createReactive({callback:q=>{a(12,jt=q)},execFn:ie},{id:"minimap_areas",...st});return Ie(xe,{noResolve:De,...st}),globalThis[Symbol.for("minimap_areas")]={get value(){return jt}},i.$$set=q=>{"data"in q&&a(17,g=q.data)},i.$$.update=()=>{var q;i.$$.dirty[0]&131072&&a(18,{data:l={},customFormattingSettings:S,__db:j}=g,l),i.$$.dirty[0]&262144&&or.set(Object.keys(l).length>0),i.$$.dirty[2]&1024&&a(20,k=f.params),i.$$.dirty[0]&1048576&&a(22,P=H`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`),i.$$.dirty[0]&1048576&&a(23,ct=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`),i.$$.dirty[0]&31457280&&(P||!Je?P||(Bt(ct,{noResolve:P,...Oe}),a(24,Je=!0)):Bt(ct,{noResolve:P})),i.$$.dirty[0]&1048576&&a(26,ye=H`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`),i.$$.dirty[0]&1048576&&a(27,ht=`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`),i.$$.dirty[0]&503316480&&(ye||!Ge?ye||(Nt(ht,{noResolve:ye,...Ke}),a(28,Ge=!0)):Nt(ht,{noResolve:ye})),i.$$.dirty[0]&1048576&&a(30,de=H`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`),i.$$.dirty[0]&1048576&&a(31,Ze=`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`),i.$$.dirty[0]&1610612736|i.$$.dirty[1]&3&&(de||!Le?de||(At(Ze,{noResolve:de,...Be}),a(32,Le=!0)):At(Ze,{noResolve:de})),i.$$.dirty[0]&1048576&&a(34,ce=H`select
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
limit 1`),i.$$.dirty[0]&1048576&&a(35,yt=`select
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
limit 1`),i.$$.dirty[1]&60&&(ce||!et?ce||(me(yt,{noResolve:ce,...Ne}),a(36,et=!0)):me(yt,{noResolve:ce})),i.$$.dirty[0]&1048576&&a(38,Ce=H`with latest as (
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
order by sort_order`),i.$$.dirty[0]&1048576&&a(39,be=`with latest as (
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
order by sort_order`),i.$$.dirty[1]&960&&(Ce||!$t?Ce||(qe(be,{noResolve:Ce,...F}),a(40,$t=!0)):qe(be,{noResolve:Ce})),i.$$.dirty[0]&1048576&&a(42,Ae=H`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),i.$$.dirty[0]&1048576&&a(43,oe=`-- #358: stage_label/stage_number are the dbt display columns (spec §1); no raw key, NULL
-- and the old 'uninhabited / no data' bucket read "No stage on record".
select
    stage_label as stage,
    stage_number,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),i.$$.dirty[1]&15360&&(Ae||!at?Ae||(Se(oe,{noResolve:Ae,...tt}),a(44,at=!0)):Se(oe,{noResolve:Ae})),i.$$.dirty[0]&1048576&&a(46,Me=H`select
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
order by poi_count desc`),i.$$.dirty[0]&1048576&&a(47,se=`select
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
order by poi_count desc`),i.$$.dirty[1]&245760&&(Me||!nt?Me||(He(se,{noResolve:Me,...rt}),a(48,nt=!0)):He(se,{noResolve:Me})),i.$$.dirty[0]&1048576&&a(50,Pe=H`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, area_name, area_code`),i.$$.dirty[0]&1048576&&a(51,$e=`select
    xw.plr_area_code as area_code,
    coalesce(gi.area_name, xw.plr_area_code) as area_name,
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
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
-- #358 (spec §3): cycle order, then name, then code; user-sortable.
order by gi.stage_number nulls last, area_name, area_code`),i.$$.dirty[1]&3932160&&(Pe||!wt?Pe||(pe($e,{noResolve:Pe,...it}),a(52,wt=!0)):pe($e,{noResolve:Pe})),i.$$.dirty[0]&1572864&&a(54,ze=H`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${A.dom_group.value}'
  and d.snapshot_year = ${A.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`),i.$$.dirty[0]&1572864&&a(55,we=`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${A.dom_group.value}'
  and d.snapshot_year = ${A.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`),i.$$.dirty[1]&62914560&&(ze||!vt?ze||(ot(we,{noResolve:ze,...D}),a(56,vt=!0)):ot(we,{noResolve:ze})),i.$$.dirty[0]&1572864&&a(58,je=H`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${A.dom_group.value}'
    and d.snapshot_year = ${A.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[0]&1572864&&a(59,ve=`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${A.dom_group.value}'
    and d.snapshot_year = ${A.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`),i.$$.dirty[1]&1006632960&&(je||!kt?je||(he(ve,{noResolve:je,...ge}),a(60,kt=!0)):he(ve,{noResolve:je})),i.$$.dirty[0]&1048576&&a(62,Te=H`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[0]&1048576&&a(63,ke=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
-- logic) -- see pages/berlin/area/bezirk/[code].md's matching query for the full rationale. Runs
-- unconditionally (#255 precedent); returns zero rows for the two never-dominant enclaves, gated at
-- display time only (hasChildren, in this page's <script> block).
with
    mix as (
        select
            stage_label as stage,
            stage_number,
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
        where stage_number in (3, 4) -- 3 · Pioneer signal, 4 · Active gentrification
    )
select
    t.n_total,
    top.stage as top_stage,
    top.n_areas as top_stage_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_stage_share,
    a.n_advanced,
    (a.n_advanced::double / nullif(t.n_total, 0)) as advanced_share
from totals as t cross join top cross join advanced as a`),i.$$.dirty[1]&1073741824|i.$$.dirty[2]&7&&(Te||!xt?Te||(Fe(ke,{noResolve:Te,...I}),a(64,xt=!0)):Fe(ke,{noResolve:Te})),i.$$.dirty[0]&1048576&&a(66,De=H`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`),i.$$.dirty[0]&1048576&&a(67,xe=`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`),i.$$.dirty[2]&120&&(De||!Rt?De||(Ie(xe,{noResolve:De,...st}),a(68,Rt=!0)):Ie(xe,{noResolve:De})),i.$$.dirty[0]&1&&a(71,e=((q=Qe==null?void 0:Qe[0])==null?void 0:q.area_name)??null),i.$$.dirty[2]&512&&a(16,n=[{label:"Berlin",href:"/berlin"},{label:"Ortsteile",href:"/berlin/area/ortsteil"},{label:e??"Ortsteil"}]),i.$$.dirty[2]&512&&a(15,o=e?`${e} — Ortsteil profile · Berlin`:null),i.$$.dirty[0]&2&&a(4,p=(Ee==null?void 0:Ee[0])&&Number(Ee[0].n)>0),i.$$.dirty[0]&4&&a(70,s=Array.isArray(mt)?mt:Array.from(mt??[])),i.$$.dirty[2]&256&&a(14,m=s.some(lt=>Number(lt.overlap_frac_of_plr)<.8)),i.$$.dirty[0]&8&&a(69,_=ut==null?void 0:ut[0]),i.$$.dirty[0]&16|i.$$.dirty[2]&128&&a(13,b=!p||!_||_.n_total==null||Number(_.n_total)===0?null:(()=>{const lt=Number(_.n_total),Ot=Number(_.n_advanced||0),Et=_.top_stage_share!=null?Number(_.top_stage_share):null,ft=Et!=null&&Et>.5?`<b>${_.top_stage}</b> is the only stage holding a majority (${Math.round(Et*100)}%)`:"no single stage holds a majority";return`<b>${Ot}</b> of <b>${lt}</b> neighbourhoods (Planungsräume) here are classified <b>4 · Active gentrification</b> or <b>3 · Pioneer signal</b>; ${ft} — a distribution across this Ortsteil's own (dominantly-assigned) neighbourhoods, never a single re-scored gentrification-index value for the Ortsteil itself.`})())},[Qe,Ee,mt,ut,p,St,bt,Mt,ue,fe,Ht,Pt,jt,b,m,o,n,g,l,A,k,Oe,P,ct,Je,Ke,ye,ht,Ge,Be,de,Ze,Le,Ne,ce,yt,et,F,Ce,be,$t,tt,Ae,oe,at,rt,Me,se,nt,it,Pe,$e,wt,D,ze,we,vt,ge,je,ve,kt,I,Te,ke,xt,st,De,xe,Rt,_,s,e,f]}class fn extends Ja{constructor(t){super(),Ka(this,t,Qr,Wr,Pa,{data:17},null,[-1,-1,-1])}}export{fn as component};
