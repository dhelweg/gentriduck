import{s as Ba,d,i as u,a as oe,b as x,c as $,h as Oa,e as T,f as At,r as jt,t as O,g as A,j as w,k as q,u as M,l as ca,m as Ma,o as Ha,n as Aa,p as ja,q as ke,w as Nt,v as Fa,H as Na}from"../chunks/scheduler.BopPEjhc.js";import{S as Pa,i as Da,d as R,t as y,a as p,c as te,m as E,b as C,e as z,g as ae}from"../chunks/index.CYkVJg6_.js";import{A as Ia}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as Ua}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as Qa}from"../chunks/Hero.CRoRGI02.js";import{D as La,C as rt}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as Wa,w as Ja}from"../chunks/entry.BMmpG6A7.js";import{A as Ke}from"../chunks/Alert.BO8kFSQK.js";import{e as Ka,s as Ga,Q as Ne,p as Ya,a as ma,r as ua,C as Xa}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as j}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as fa,a as it}from"../chunks/Dropdown.BxlIFH-r.js";import{p as Va}from"../chunks/stores.Ceyp10jj.js";import{Q as Pe}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as Yt}from"../chunks/BarChart.DzrCmZ_r.js";import{B as Gt}from"../chunks/BigValue.Ck7K9e2S.js";import{p as Za}from"../chunks/profile.BW8tN6E9.js";function er(o){var n;let t,a=(B.title??((n=B.og)==null?void 0:n.title))+"",e;return{c(){t=q("h1"),e=M(a),this.h()},l(i){t=T(i,"H1",{class:!0});var _=jt(t);e=O(_,a),_.forEach(d),this.h()},h(){x(t,"class","title")},m(i,_){u(i,t,_),oe(t,e)},p:ke,d(i){i&&d(t)}}}function tr(o){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:ke,p:ke,d:ke}}function ar(o){var _;let t,a,e,n,i;return document.title=t=B.title??((_=B.og)==null?void 0:_.title),{c(){a=w(),e=q("meta"),n=w(),i=q("meta"),this.h()},l(l){a=$(l),e=T(l,"META",{property:!0,content:!0}),n=$(l),i=T(l,"META",{name:!0,content:!0}),this.h()},h(){var l,h;x(e,"property","og:title"),x(e,"content",((l=B.og)==null?void 0:l.title)??B.title),x(i,"name","twitter:title"),x(i,"content",((h=B.og)==null?void 0:h.title)??B.title)},m(l,h){u(l,a,h),u(l,e,h),u(l,n,h),u(l,i,h)},p(l,h){var c;h&0&&t!==(t=B.title??((c=B.og)==null?void 0:c.title))&&(document.title=t)},d(l){l&&(d(a),d(e),d(n),d(i))}}}function rr(o){var i,_;let t,a,e=(B.description||((i=B.og)==null?void 0:i.description))&&ir(),n=((_=B.og)==null?void 0:_.image)&&nr();return{c(){e&&e.c(),t=w(),n&&n.c(),a=At()},l(l){e&&e.l(l),t=$(l),n&&n.l(l),a=At()},m(l,h){e&&e.m(l,h),u(l,t,h),n&&n.m(l,h),u(l,a,h)},p(l,h){var c,b;(B.description||(c=B.og)!=null&&c.description)&&e.p(l,h),(b=B.og)!=null&&b.image&&n.p(l,h)},d(l){l&&(d(t),d(a)),e&&e.d(l),n&&n.d(l)}}}function ir(o){let t,a,e,n,i;return{c(){t=q("meta"),a=w(),e=q("meta"),n=w(),i=q("meta"),this.h()},l(_){t=T(_,"META",{name:!0,content:!0}),a=$(_),e=T(_,"META",{property:!0,content:!0}),n=$(_),i=T(_,"META",{name:!0,content:!0}),this.h()},h(){var _,l,h;x(t,"name","description"),x(t,"content",B.description??((_=B.og)==null?void 0:_.description)),x(e,"property","og:description"),x(e,"content",((l=B.og)==null?void 0:l.description)??B.description),x(i,"name","twitter:description"),x(i,"content",((h=B.og)==null?void 0:h.description)??B.description)},m(_,l){u(_,t,l),u(_,a,l),u(_,e,l),u(_,n,l),u(_,i,l)},p:ke,d(_){_&&(d(t),d(a),d(e),d(n),d(i))}}}function nr(o){let t,a,e;return{c(){t=q("meta"),a=w(),e=q("meta"),this.h()},l(n){t=T(n,"META",{property:!0,content:!0}),a=$(n),e=T(n,"META",{name:!0,content:!0}),this.h()},h(){var n,i;x(t,"property","og:image"),x(t,"content",ma((n=B.og)==null?void 0:n.image)),x(e,"name","twitter:image"),x(e,"content",ma((i=B.og)==null?void 0:i.image))},m(n,i){u(n,t,i),u(n,a,i),u(n,e,i)},p:ke,d(n){n&&(d(t),d(a),d(e))}}}function pa(o){let t,a;return t=new Pe({props:{queryID:"ortsteil_name",queryResult:o[4]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&16&&(i.queryResult=e[4]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function ga(o){let t,a;return t=new Pe({props:{queryID:"bezirk_info",queryResult:o[5]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&32&&(i.queryResult=e[5]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function ha(o){let t,a;return t=new Pe({props:{queryID:"child_count",queryResult:o[0]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&1&&(i.queryResult=e[0]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function ya(o){let t,a;return t=new Pe({props:{queryID:"demographics",queryResult:o[6]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&64&&(i.queryResult=e[6]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function ba(o){let t,a;return t=new Pe({props:{queryID:"age_mix",queryResult:o[7]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&128&&(i.queryResult=e[7]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function $a(o){let t,a;return t=new Pe({props:{queryID:"stage_mix",queryResult:o[8]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&256&&(i.queryResult=e[8]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function wa(o){let t,a;return t=new Pe({props:{queryID:"poi_mix",queryResult:o[9]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&512&&(i.queryResult=e[9]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function va(o){let t,a;return t=new Pe({props:{queryID:"children",queryResult:o[1]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&2&&(i.queryResult=e[1]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function ka(o){let t,a;return t=new Pe({props:{queryID:"dom_suppressed_count",queryResult:o[10]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&1024&&(i.queryResult=e[10]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function xa(o){let t,a;return t=new Pe({props:{queryID:"dominance_children",queryResult:o[11]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&2048&&(i.queryResult=e[11]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function or(o){let t,a="District profile";return{c(){t=q("a"),t.textContent=a,this.h()},l(e){t=T(e,"A",{href:!0,"data-svelte-h":!0}),A(t)!=="svelte-1trtuzf"&&(t.textContent=a),this.h()},h(){x(t,"href","/gentriduck/berlin/area/bezirk")},m(e,n){u(e,t,n)},p:ke,d(e){e&&d(t)}}}function sr(o){let t,a=o[5][0].bezirk_name+"",e,n;return{c(){t=q("a"),e=M(a),this.h()},l(i){t=T(i,"A",{href:!0});var _=jt(t);e=O(_,a),_.forEach(d),this.h()},h(){x(t,"href",n="/gentriduck/berlin/area/bezirk/"+o[5][0].bezirk_code)},m(i,_){u(i,t,_),oe(t,e)},p(i,_){_[0]&32&&a!==(a=i[5][0].bezirk_name+"")&&Nt(e,a),_[0]&32&&n!==(n="/gentriduck/berlin/area/bezirk/"+i[5][0].bezirk_code)&&x(t,"href",n)},d(i){i&&d(t)}}}function lr(o){let t,a,e=`dominant area-overlap
  assignment`,n,i,_="sums and population-weighted averages",l,h,c="methodology page",b,s,v="full neighbourhood list",f;return{c(){t=M(`Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a `),a=q("b"),a.textContent=e,n=M(` (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are `),i=q("b"),i.textContent=_,l=M(` under
  that assignment — never a separately re-scored index. See the
  `),h=q("a"),h.textContent=c,b=M(` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),s=q("a"),s.textContent=v,f=M(` for the actual
  gentrification index and trajectory.`),this.h()},l(g){t=O(g,`Ortsteil is a different (non-LOR) Berlin geography from the Planungsraum/Bezirksregion/
  Prognoseraum ladder used elsewhere on this site — it does not nest cleanly into Planungsräume, so
  its constituent-neighbourhood figures below are built from a `),a=T(g,"B",{"data-svelte-h":!0}),A(a)!=="svelte-1bbggmu"&&(a.textContent=e),n=O(g,` (each Planungsraum rolls into the one Ortsteil containing the largest share of its
  area), not a code-prefix match. Figures are `),i=T(g,"B",{"data-svelte-h":!0}),A(i)!=="svelte-rhlwxq"&&(i.textContent=_),l=O(g,` under
  that assignment — never a separately re-scored index. See the
  `),h=T(g,"A",{href:!0,"data-svelte-h":!0}),A(h)!=="svelte-1l2pw3"&&(h.textContent=c),b=O(g,` for why coarse-grain areas are not re-scored, and any
  neighbourhood's own page in the `),s=T(g,"A",{href:!0,"data-svelte-h":!0}),A(s)!=="svelte-z78e0k"&&(s.textContent=v),f=O(g,` for the actual
  gentrification index and trajectory.`),this.h()},h(){x(h,"href","/gentriduck/methodology"),x(s,"href","/gentriduck/berlin/area")},m(g,S){u(g,t,S),u(g,a,S),u(g,n,S),u(g,i,S),u(g,l,S),u(g,h,S),u(g,b,S),u(g,s,S),u(g,f,S)},p:ke,d(g){g&&(d(t),d(a),d(n),d(i),d(l),d(h),d(b),d(s),d(f))}}}function Ra(o){let t,a;return t=new Ke({props:{status:"warning",$$slots:{default:[cr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&48|n[2]&134217728&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function _r(o){let t,a="this Ortsteil's district profile";return{c(){t=q("a"),t.textContent=a,this.h()},l(e){t=T(e,"A",{href:!0,"data-svelte-h":!0}),A(t)!=="svelte-mt7m1r"&&(t.textContent=a),this.h()},h(){x(t,"href","/gentriduck/berlin/area/bezirk")},m(e,n){u(e,t,n)},p:ke,d(e){e&&d(t)}}}function dr(o){let t,a=o[5][0].bezirk_name+"",e,n,i;return{c(){t=q("a"),e=M(a),n=M("'s district profile"),this.h()},l(_){t=T(_,"A",{href:!0});var l=jt(t);e=O(l,a),n=O(l,"'s district profile"),l.forEach(d),this.h()},h(){x(t,"href",i="/gentriduck/berlin/area/bezirk/"+o[5][0].bezirk_code)},m(_,l){u(_,t,l),oe(t,e),oe(t,n)},p(_,l){l[0]&32&&a!==(a=_[5][0].bezirk_name+"")&&Nt(e,a),l[0]&32&&i!==(i="/gentriduck/berlin/area/bezirk/"+_[5][0].bezirk_code)&&x(t,"href",i)},d(_){_&&d(t)}}}function cr(o){let t,a="No Planungsraum is predominantly within this Ortsteil's boundary.",e,n=(o[4][0]?o[4][0].area_name:"This Ortsteil")+"",i,_,l,h="the full Ortsteil list",c,b;function s(g,S){var H;return(H=g[5][0])!=null&&H.bezirk_code?dr:_r}let v=s(o),f=v(o);return{c(){t=q("b"),t.textContent=a,e=w(),i=M(n),_=M(` is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  `),l=q("a"),l.textContent=h,c=M(` for the other 95 Ortsteile, or
  `),f.c(),b=M(`
  for area-level statistics instead.`),this.h()},l(g){t=T(g,"B",{"data-svelte-h":!0}),A(t)!=="svelte-1mtqbjl"&&(t.textContent=a),e=$(g),i=O(g,n),_=O(g,` is a small enclave whose area is split across
  neighbouring Planungsräume, each of which has a larger share held by an adjacent Ortsteil — a
  genuine, disclosed consequence of the dominant area-overlap assignment used to build this site's
  Ortsteil rollups (not missing data). See
  `),l=T(g,"A",{href:!0,"data-svelte-h":!0}),A(l)!=="svelte-17skhuj"&&(l.textContent=h),c=O(g,` for the other 95 Ortsteile, or
  `),f.l(g),b=O(g,`
  for area-level statistics instead.`),this.h()},h(){x(l,"href","/gentriduck/berlin/area/ortsteil")},m(g,S){u(g,t,S),u(g,e,S),u(g,i,S),u(g,_,S),u(g,l,S),u(g,c,S),f.m(g,S),u(g,b,S)},p(g,S){S[0]&16&&n!==(n=(g[4][0]?g[4][0].area_name:"This Ortsteil")+"")&&Nt(i,n),v===(v=s(g))&&f?f.p(g,S):(f.d(1),f=v(g),f&&(f.c(),f.m(b.parentNode,b)))},d(g){g&&(d(t),d(e),d(i),d(_),d(l),d(c),d(b)),f.d(g)}}}function Ea(o){let t,a;return t=new Pe({props:{queryID:"stage_mix_summary",queryResult:o[2]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&4&&(i.queryResult=e[2]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function mr(o){let t,a;return t=new Ke({props:{status:"info",$$slots:{default:[fr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[2]&134217728&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function ur(o){let t,a,e,n=o[13]&&Ca(o);return a=new Yt({props:{data:o[8],x:"stage",y:"n_areas",title:"Neighbourhoods by stage, "+(o[4][0]?o[4][0].area_name:"this Ortsteil"),swapXY:"true"}}),{c(){n&&n.c(),t=w(),z(a.$$.fragment)},l(i){n&&n.l(i),t=$(i),C(a.$$.fragment,i)},m(i,_){n&&n.m(i,_),u(i,t,_),E(a,i,_),e=!0},p(i,_){i[13]?n?n.p(i,_):(n=Ca(i),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null);const l={};_[0]&256&&(l.data=i[8]),_[0]&16&&(l.title="Neighbourhoods by stage, "+(i[4][0]?i[4][0].area_name:"this Ortsteil")),a.$set(l)},i(i){e||(p(a.$$.fragment,i),e=!0)},o(i){y(a.$$.fragment,i),e=!1},d(i){i&&d(t),n&&n.d(i),R(a,i)}}}function fr(o){let t;return{c(){t=M("No neighbourhood-stage mix for this enclave — see the note above.")},l(a){t=O(a,"No neighbourhood-stage mix for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Ca(o){let t,a;return{c(){t=q("p"),a=new Na(!1),this.h()},l(e){t=T(e,"P",{});var n=jt(t);a=Fa(n,!1),n.forEach(d),this.h()},h(){a.a=null},m(e,n){u(e,t,n),a.m(o[13],t)},p(e,n){n[0]&8192&&a.p(e[13])},d(e){e&&d(t)}}}function pr(o){let t,a;return t=new Ke({props:{status:"info",$$slots:{default:[hr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[2]&134217728&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function gr(o){let t,a;return t=new Yt({props:{data:o[9],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(o[4][0]?o[4][0].area_name:"this Ortsteil"),swapXY:"true"}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&512&&(i.data=e[9]),n[0]&16&&(i.title="Mapped places by category (latest snapshot), "+(e[4][0]?e[4][0].area_name:"this Ortsteil")),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function hr(o){let t;return{c(){t=M("No mapped-place breakdown for this enclave — see the note above.")},l(a){t=O(a,"No mapped-place breakdown for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function yr(o){let t,a;return t=new Ke({props:{status:"info",$$slots:{default:[$r]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[2]&134217728&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function br(o){let t,a,e,n,i,_,l,h,c,b;return t=new Ke({props:{status:"info",$$slots:{default:[wr]},$$scope:{ctx:o}}}),e=new fa({props:{name:"dom_group",title:"Business group",defaultValue:"gastronomy_category",$$slots:{default:[vr]},$$scope:{ctx:o}}}),i=new fa({props:{name:"dom_year",title:"Year",defaultValue:"2025",$$slots:{default:[kr]},$$scope:{ctx:o}}}),l=new Ke({props:{status:"info",$$slots:{default:[xr]},$$scope:{ctx:o}}}),c=new La({props:{data:o[11],rows:"15",link:"area_link",emptySet:"warn",emptyMessage:"No non-suppressed neighbourhoods for this group/year in this Ortsteil.",$$slots:{default:[Rr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment),a=w(),z(e.$$.fragment),n=w(),z(i.$$.fragment),_=w(),z(l.$$.fragment),h=w(),z(c.$$.fragment)},l(s){C(t.$$.fragment,s),a=$(s),C(e.$$.fragment,s),n=$(s),C(i.$$.fragment,s),_=$(s),C(l.$$.fragment,s),h=$(s),C(c.$$.fragment,s)},m(s,v){E(t,s,v),u(s,a,v),E(e,s,v),u(s,n,v),E(i,s,v),u(s,_,v),E(l,s,v),u(s,h,v),E(c,s,v),b=!0},p(s,v){const f={};v[2]&134217728&&(f.$$scope={dirty:v,ctx:s}),t.$set(f);const g={};v[2]&134217728&&(g.$$scope={dirty:v,ctx:s}),e.$set(g);const S={};v[2]&134217728&&(S.$$scope={dirty:v,ctx:s}),i.$set(S);const H={};v[0]&1024|v[2]&134217728&&(H.$$scope={dirty:v,ctx:s}),l.$set(H);const k={};v[0]&2048&&(k.data=s[11]),v[2]&134217728&&(k.$$scope={dirty:v,ctx:s}),c.$set(k)},i(s){b||(p(t.$$.fragment,s),p(e.$$.fragment,s),p(i.$$.fragment,s),p(l.$$.fragment,s),p(c.$$.fragment,s),b=!0)},o(s){y(t.$$.fragment,s),y(e.$$.fragment,s),y(i.$$.fragment,s),y(l.$$.fragment,s),y(c.$$.fragment,s),b=!1},d(s){s&&(d(a),d(n),d(_),d(h)),R(t,s),R(e,s),R(i,s),R(l,s),R(c,s)}}}function $r(o){let t;return{c(){t=M("No within-group dominance figures for this enclave — see the note above.")},l(a){t=O(a,"No within-group dominance figures for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function wr(o){let t,a="Dominance is sign-blind",e,n,i="Offering Advantage decoder",_;return{c(){t=q("b"),t.textContent=a,e=M(` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=q("a"),n.textContent=i,_=M(" §5 for the full ethics note."),this.h()},l(l){t=T(l,"B",{"data-svelte-h":!0}),A(t)!=="svelte-1m1shgn"&&(t.textContent=a),e=O(l,` — a high concentration figure says only that a group's mix is
  concentrated in the named leading type, never whether that is an up-market or down-market shift.
  Read it alongside each neighbourhood's own status/dynamism trajectory. Cuisine-typed dominance is
  barred from this table (public-safe groups only); see the
  `),n=T(l,"A",{href:!0,"data-svelte-h":!0}),A(n)!=="svelte-168mye8"&&(n.textContent=i),_=O(l," §5 for the full ethics note."),this.h()},h(){x(n,"href","/gentriduck/methodology-oa-modes")},m(l,h){u(l,t,h),u(l,e,h),u(l,n,h),u(l,_,h)},p:ke,d(l){l&&(d(t),d(e),d(n),d(_))}}}function vr(o){let t,a,e,n,i,_,l,h;return t=new it({props:{value:"gastronomy_category",valueLabel:"Gastronomy (Café / Restaurant / Fast Food)"}}),e=new it({props:{value:"retail_category",valueLabel:"Retail (12 categories)"}}),i=new it({props:{value:"entertainment_category",valueLabel:"Entertainment (Bar / Nightlife / Culture / Leisure)"}}),l=new it({props:{value:"wellness_curated",valueLabel:"Wellness / fitness (curated cross-domain group)"}}),{c(){z(t.$$.fragment),a=w(),z(e.$$.fragment),n=w(),z(i.$$.fragment),_=w(),z(l.$$.fragment)},l(c){C(t.$$.fragment,c),a=$(c),C(e.$$.fragment,c),n=$(c),C(i.$$.fragment,c),_=$(c),C(l.$$.fragment,c)},m(c,b){E(t,c,b),u(c,a,b),E(e,c,b),u(c,n,b),E(i,c,b),u(c,_,b),E(l,c,b),h=!0},p:ke,i(c){h||(p(t.$$.fragment,c),p(e.$$.fragment,c),p(i.$$.fragment,c),p(l.$$.fragment,c),h=!0)},o(c){y(t.$$.fragment,c),y(e.$$.fragment,c),y(i.$$.fragment,c),y(l.$$.fragment,c),h=!1},d(c){c&&(d(a),d(n),d(_)),R(t,c),R(e,c),R(i,c),R(l,c)}}}function kr(o){let t,a,e,n,i,_,l,h,c,b,s,v;return t=new it({props:{value:"2025",valueLabel:"2025"}}),e=new it({props:{value:"2024",valueLabel:"2024"}}),i=new it({props:{value:"2023",valueLabel:"2023"}}),l=new it({props:{value:"2022",valueLabel:"2022"}}),c=new it({props:{value:"2021",valueLabel:"2021"}}),s=new it({props:{value:"2020",valueLabel:"2020"}}),{c(){z(t.$$.fragment),a=w(),z(e.$$.fragment),n=w(),z(i.$$.fragment),_=w(),z(l.$$.fragment),h=w(),z(c.$$.fragment),b=w(),z(s.$$.fragment)},l(f){C(t.$$.fragment,f),a=$(f),C(e.$$.fragment,f),n=$(f),C(i.$$.fragment,f),_=$(f),C(l.$$.fragment,f),h=$(f),C(c.$$.fragment,f),b=$(f),C(s.$$.fragment,f)},m(f,g){E(t,f,g),u(f,a,g),E(e,f,g),u(f,n,g),E(i,f,g),u(f,_,g),E(l,f,g),u(f,h,g),E(c,f,g),u(f,b,g),E(s,f,g),v=!0},p:ke,i(f){v||(p(t.$$.fragment,f),p(e.$$.fragment,f),p(i.$$.fragment,f),p(l.$$.fragment,f),p(c.$$.fragment,f),p(s.$$.fragment,f),v=!0)},o(f){y(t.$$.fragment,f),y(e.$$.fragment,f),y(i.$$.fragment,f),y(l.$$.fragment,f),y(c.$$.fragment,f),y(s.$$.fragment,f),v=!1},d(f){f&&(d(a),d(n),d(_),d(h),d(b)),R(t,f),R(e,f),R(i,f),R(l,f),R(c,f),R(s,f)}}}function xr(o){let t,a=(o[10][0]?o[10][0].n_suppressed:0)+"",e,n,i=(o[10][0]?o[10][0].n_suppressed+o[10][0].n_shown:0)+"",_,l,h;return{c(){t=q("b"),e=M(a),n=M(" of "),_=M(i),l=M(" neighbourhoods here are suppressed below as too thinly observed to characterize"),h=M(' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},l(c){t=T(c,"B",{});var b=jt(t);e=O(b,a),n=O(b," of "),_=O(b,i),l=O(b," neighbourhoods here are suppressed below as too thinly observed to characterize"),b.forEach(d),h=O(c,' — never read that as "commercially dead," only as "too few businesses in this group here to say anything about the mix."')},m(c,b){u(c,t,b),oe(t,e),oe(t,n),oe(t,_),oe(t,l),u(c,h,b)},p(c,b){b[0]&1024&&a!==(a=(c[10][0]?c[10][0].n_suppressed:0)+"")&&Nt(e,a),b[0]&1024&&i!==(i=(c[10][0]?c[10][0].n_suppressed+c[10][0].n_shown:0)+"")&&Nt(_,i)},d(c){c&&(d(t),d(h))}}}function Rr(o){let t,a,e,n,i,_,l,h,c,b,s,v;return t=new rt({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new rt({props:{id:"hhi",title:"HHI (higher = more concentrated)",fmt:"num2"}}),i=new rt({props:{id:"top_share",title:"Top-share",fmt:"pct1"}}),l=new rt({props:{id:"top_child",title:"Leading type"}}),c=new rt({props:{id:"n_children",title:"Types in this group here"}}),s=new rt({props:{id:"group_stock_local",title:"Group's total POI count here",fmt:"num0"}}),{c(){z(t.$$.fragment),a=w(),z(e.$$.fragment),n=w(),z(i.$$.fragment),_=w(),z(l.$$.fragment),h=w(),z(c.$$.fragment),b=w(),z(s.$$.fragment)},l(f){C(t.$$.fragment,f),a=$(f),C(e.$$.fragment,f),n=$(f),C(i.$$.fragment,f),_=$(f),C(l.$$.fragment,f),h=$(f),C(c.$$.fragment,f),b=$(f),C(s.$$.fragment,f)},m(f,g){E(t,f,g),u(f,a,g),E(e,f,g),u(f,n,g),E(i,f,g),u(f,_,g),E(l,f,g),u(f,h,g),E(c,f,g),u(f,b,g),E(s,f,g),v=!0},p:ke,i(f){v||(p(t.$$.fragment,f),p(e.$$.fragment,f),p(i.$$.fragment,f),p(l.$$.fragment,f),p(c.$$.fragment,f),p(s.$$.fragment,f),v=!0)},o(f){y(t.$$.fragment,f),y(e.$$.fragment,f),y(i.$$.fragment,f),y(l.$$.fragment,f),y(c.$$.fragment,f),y(s.$$.fragment,f),v=!1},d(f){f&&(d(a),d(n),d(_),d(h),d(b)),R(t,f),R(e,f),R(i,f),R(l,f),R(c,f),R(s,f)}}}function Er(o){let t,a;return t=new Ke({props:{status:"info",$$slots:{default:[zr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[2]&134217728&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function Cr(o){let t,a,e,n,i,_,l,h,c;t=new Gt({props:{data:o[6],value:"residents_total",title:"Residents (latest EWR year)",fmt:"num0",emptySet:"warn"}}),e=new Gt({props:{data:o[6],value:"n_plr",title:"Constituent neighbourhoods (dominant PLR assignment)",emptySet:"warn"}}),i=new Gt({props:{data:o[6],value:"mean_age_years",title:"Mean age (years)",fmt:"num1",emptySet:"warn"}});let b=o[6]&&o[6][0]&&o[6][0].any_indicator_suppressed&&za(o);return h=new Yt({props:{data:o[7],x:"age_band",y:"share",title:"Age structure, "+(o[4][0]?o[4][0].area_name:"this Ortsteil"),yFmt:"pct0"}}),{c(){z(t.$$.fragment),a=w(),z(e.$$.fragment),n=w(),z(i.$$.fragment),_=w(),b&&b.c(),l=w(),z(h.$$.fragment)},l(s){C(t.$$.fragment,s),a=$(s),C(e.$$.fragment,s),n=$(s),C(i.$$.fragment,s),_=$(s),b&&b.l(s),l=$(s),C(h.$$.fragment,s)},m(s,v){E(t,s,v),u(s,a,v),E(e,s,v),u(s,n,v),E(i,s,v),u(s,_,v),b&&b.m(s,v),u(s,l,v),E(h,s,v),c=!0},p(s,v){const f={};v[0]&64&&(f.data=s[6]),t.$set(f);const g={};v[0]&64&&(g.data=s[6]),e.$set(g);const S={};v[0]&64&&(S.data=s[6]),i.$set(S),s[6]&&s[6][0]&&s[6][0].any_indicator_suppressed?b?v[0]&64&&p(b,1):(b=za(s),b.c(),p(b,1),b.m(l.parentNode,l)):b&&(ae(),y(b,1,1,()=>{b=null}),te());const H={};v[0]&128&&(H.data=s[7]),v[0]&16&&(H.title="Age structure, "+(s[4][0]?s[4][0].area_name:"this Ortsteil")),h.$set(H)},i(s){c||(p(t.$$.fragment,s),p(e.$$.fragment,s),p(i.$$.fragment,s),p(b),p(h.$$.fragment,s),c=!0)},o(s){y(t.$$.fragment,s),y(e.$$.fragment,s),y(i.$$.fragment,s),y(b),y(h.$$.fragment,s),c=!1},d(s){s&&(d(a),d(n),d(_),d(l)),R(t,s),R(e,s),R(i,s),b&&b.d(s),R(h,s)}}}function zr(o){let t;return{c(){t=M("No population/composition figures for this enclave — see the note above.")},l(a){t=O(a,"No population/composition figures for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function za(o){let t,a;return t=new Ke({props:{status:"warning",$$slots:{default:[Tr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function Tr(o){let t;return{c(){t=M(`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.`)},l(a){t=O(a,`At least one constituent neighbourhood had a suppressed EWR cell (small-count privacy rule) —
  this Ortsteil's figures may understate the true total.`)},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Ta(o){let t,a;return t=new Pe({props:{queryID:"minimap_areas",queryResult:o[12]}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[0]&4096&&(i.queryResult=e[12]),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function qr(o){let t,a;return t=new Ke({props:{status:"info",$$slots:{default:[Sr]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},p(e,n){const i={};n[2]&134217728&&(i.$$scope={dirty:n,ctx:e}),t.$set(i)},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function Lr(o){let t,a,e,n;t=new La({props:{data:o[1],rows:"20",link:"area_link",$$slots:{default:[Br]},$$scope:{ctx:o}}});let i=o[14]&&qa(o);return{c(){z(t.$$.fragment),a=w(),i&&i.c(),e=At()},l(_){C(t.$$.fragment,_),a=$(_),i&&i.l(_),e=At()},m(_,l){E(t,_,l),u(_,a,l),i&&i.m(_,l),u(_,e,l),n=!0},p(_,l){const h={};l[0]&2&&(h.data=_[1]),l[2]&134217728&&(h.$$scope={dirty:l,ctx:_}),t.$set(h),_[14]?i?l[0]&16384&&p(i,1):(i=qa(_),i.c(),p(i,1),i.m(e.parentNode,e)):i&&(ae(),y(i,1,1,()=>{i=null}),te())},i(_){n||(p(t.$$.fragment,_),p(i),n=!0)},o(_){y(t.$$.fragment,_),y(i),n=!1},d(_){_&&(d(a),d(e)),R(t,_),i&&i.d(_)}}}function Sr(o){let t;return{c(){t=M("No constituent neighbourhoods for this enclave — see the note above.")},l(a){t=O(a,"No constituent neighbourhoods for this enclave — see the note above.")},m(a,e){u(a,t,e)},d(a){a&&d(t)}}}function Br(o){let t,a,e,n,i,_,l,h;return t=new rt({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new rt({props:{id:"stage",title:"Stage"}}),i=new rt({props:{id:"pressure_trend",title:"Pressure trend"}}),l=new rt({props:{id:"overlap_frac_of_plr",title:"% of PLR within this Ortsteil",fmt:"pct0"}}),{c(){z(t.$$.fragment),a=w(),z(e.$$.fragment),n=w(),z(i.$$.fragment),_=w(),z(l.$$.fragment)},l(c){C(t.$$.fragment,c),a=$(c),C(e.$$.fragment,c),n=$(c),C(i.$$.fragment,c),_=$(c),C(l.$$.fragment,c)},m(c,b){E(t,c,b),u(c,a,b),E(e,c,b),u(c,n,b),E(i,c,b),u(c,_,b),E(l,c,b),h=!0},p:ke,i(c){h||(p(t.$$.fragment,c),p(e.$$.fragment,c),p(i.$$.fragment,c),p(l.$$.fragment,c),h=!0)},o(c){y(t.$$.fragment,c),y(e.$$.fragment,c),y(i.$$.fragment,c),y(l.$$.fragment,c),h=!1},d(c){c&&(d(a),d(n),d(_)),R(t,c),R(e,c),R(i,c),R(l,c)}}}function qa(o){let t,a;return t=new Ke({props:{status:"warning",$$slots:{default:[Or]},$$scope:{ctx:o}}}),{c(){z(t.$$.fragment)},l(e){C(t.$$.fragment,e)},m(e,n){E(t,e,n),a=!0},i(e){a||(p(t.$$.fragment,e),a=!0)},o(e){y(t.$$.fragment,e),a=!1},d(e){R(t,e)}}}function Or(o){let t,a,e="partially",n,i,_="methodology page",l;return{c(){t=M("At least one neighbourhood above is only "),a=q("b"),a.textContent=e,n=M(` (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  `),i=q("a"),i.textContent=_,l=M(` for why a whole-PLR figure, not a fractional split, is
  used.`),this.h()},l(h){t=O(h,"At least one neighbourhood above is only "),a=T(h,"B",{"data-svelte-h":!0}),A(a)!=="svelte-lw0a3u"&&(a.textContent=e),n=O(h,` (under 80% of its own area) within this
  Ortsteil's boundary, but rolls into it entirely under the dominant-assignment rule (its largest
  single-Ortsteil share happens to be here) — see the
  `),i=T(h,"A",{href:!0,"data-svelte-h":!0}),A(i)!=="svelte-1l2pw3"&&(i.textContent=_),l=O(h,` for why a whole-PLR figure, not a fractional split, is
  used.`),this.h()},h(){x(i,"href","/gentriduck/methodology")},m(h,c){u(h,t,c),u(h,a,c),u(h,n,c),u(h,i,c),u(h,l,c)},p:ke,d(h){h&&(d(t),d(a),d(n),d(i),d(l))}}}function Mr(o){var la;let t,a,e,n,i,_,l,h,c,b,s,v,f,g,S,H,k,F,De,Ge,Ie,Tt="all Ortsteile",zt,ve,Ye="all districts",nt,Ue,qt="full neighbourhood list",dt,fe,Te,qe,se,Lt='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',ct,pe,Xe=`Every neighbourhood (Planungsraum) dominantly assigned to this Ortsteil, grouped by its current
gentrification stage — a <strong class="markdown">count</strong>, not a re-scored Ortsteil-level index. See the
<a href="/gentriduck/methodology" class="markdown">methodology page</a> for what each stage means; see
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code> / <code class="markdown">docs/epic-i/I-coarse-index-domain-decision.md</code> for
why this project reports a distribution here, never a single re-scored index value, at any grain
coarser than a single Planungsraum.`,Ve,Ze,ge,he,xe,le,mt='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ut,Ce,St='<a href="#mapped-places">Mapped places</a>',Le,N,re,et,ze,Bt='<a href="#within-group-dominance">Within-group dominance</a>',Se,P,ie,tt,Be,Ot=`A high HHI/top-share here says only that a neighbourhood&#39;s mix is concentrated in the named leading
type — never, by itself, whether that concentration is an up-market or down-market signal. Compare
against each neighbourhood&#39;s own status/dynamism trajectory before drawing any conclusion. See the
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage decoder</a> for the full dominance methodology.`,Oe,_e,ft='<a href="#people--structure">People &amp; structure</a>',Qe,ye,be,Re,de,pt='<a href="#where-this-area-sits">Where this area sits</a>',gt,at,Me,He,ce,ht='<a href="#neighbourhoods-planungsräume-dominantly-assigned-to-this-ortsteil">Neighbourhoods (Planungsräume) dominantly assigned to this Ortsteil</a>',yt,$e,we,Ee,me,bt='<a href="#honest-caveats">Honest caveats</a>',We,Ae,Mt=`<li class="markdown"><strong class="markdown">This page never shows a single re-scored gentrification-index value for this Ortsteil</strong> — only
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
(ecological fallacy, no displacement measurement, OSM completeness bias, and more).</li>`,je,ue,$t='<a href="#further-reading">Further reading</a>',wt,Fe,Ht=`See <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> for what the index means and why coarser grains are
reported as distributions rather than a re-scored value, <a href="/gentriduck/berlin/area/ortsteil" class="markdown">the full Ortsteil list</a>
for other Ortsteile, or drill into any of this Ortsteil&#39;s own neighbourhoods above for the full
profile, index, and trajectory.`,L,ot,vt,st,Pt,lt=typeof B<"u"&&(B.title||((la=B.og)==null?void 0:la.title))&&B.hide_title!==!0&&er();function Sa(r,m){var ne;return typeof B<"u"&&(B.title||(ne=B.og)!=null&&ne.title)?ar:tr}let Ft=Sa()(o),_t=typeof B=="object"&&rr(),D=o[4]&&pa(o),I=o[5]&&ga(o),U=o[0]&&ha(o),Q=o[6]&&ya(o),W=o[7]&&ba(o),J=o[8]&&$a(o),K=o[9]&&wa(o),G=o[1]&&va(o),Y=o[10]&&ka(o),X=o[11]&&xa(o);H=new Qa({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(o[4][0]?o[4][0].area_name:"Ortsteil")+" — Ortsteil profile",lede:"Population, composition, and neighbourhood-stage mix for this Ortsteil (Stadtteil), rolled up from its dominantly-assigned constituent Planungsräume — never a re-scored index at this grain."}});function Xt(r,m){var ne;return(ne=r[5][0])!=null&&ne.bezirk_code?sr:or}let Dt=Xt(o),Je=Dt(o);fe=new Ke({props:{status:"info",$$slots:{default:[lr]},$$scope:{ctx:o}}});let V=!o[3]&&Ra(o),Z=o[2]&&Ea(o);const Vt=[ur,mr],kt=[];function Zt(r,m){return r[3]?0:1}ge=Zt(o),he=kt[ge]=Vt[ge](o);const ea=[gr,pr],xt=[];function ta(r,m){return r[3]?0:1}N=ta(o),re=xt[N]=ea[N](o);const aa=[br,yr],Rt=[];function ra(r,m){return r[3]?0:1}P=ra(o),ie=Rt[P]=aa[P](o);const ia=[Cr,Er],Et=[];function na(r,m){return r[3]?0:1}ye=na(o),be=Et[ye]=ia[ye](o);let ee=o[12]&&Ta(o);Me=new Ia({props:{data:o[12],geoJsonUrl:`${Wa}/geo/ortsteil_self.geojson`,title:o[4][0]?o[4][0].area_name:"This Ortsteil"}});const oa=[Lr,qr],Ct=[];function sa(r,m){return r[3]?0:1}return $e=sa(o),we=Ct[$e]=oa[$e](o),st=new Ua({}),{c(){lt&&lt.c(),t=w(),Ft.c(),a=q("meta"),e=q("meta"),_t&&_t.c(),n=At(),i=w(),D&&D.c(),_=w(),I&&I.c(),l=w(),U&&U.c(),h=w(),Q&&Q.c(),c=w(),W&&W.c(),b=w(),J&&J.c(),s=w(),K&&K.c(),v=w(),G&&G.c(),f=w(),Y&&Y.c(),g=w(),X&&X.c(),S=w(),z(H.$$.fragment),k=w(),F=q("p"),De=M("Up: "),Je.c(),Ge=M(" · "),Ie=q("a"),Ie.textContent=Tt,zt=M(" · "),ve=q("a"),ve.textContent=Ye,nt=M(" · "),Ue=q("a"),Ue.textContent=qt,dt=w(),z(fe.$$.fragment),Te=w(),V&&V.c(),qe=w(),se=q("h2"),se.innerHTML=Lt,ct=w(),pe=q("p"),pe.innerHTML=Xe,Ve=w(),Z&&Z.c(),Ze=w(),he.c(),xe=w(),le=q("h2"),le.innerHTML=mt,ut=w(),Ce=q("h3"),Ce.innerHTML=St,Le=w(),re.c(),et=w(),ze=q("h2"),ze.innerHTML=Bt,Se=w(),ie.c(),tt=w(),Be=q("p"),Be.innerHTML=Ot,Oe=w(),_e=q("h2"),_e.innerHTML=ft,Qe=w(),be.c(),Re=w(),de=q("h2"),de.innerHTML=pt,gt=w(),ee&&ee.c(),at=w(),z(Me.$$.fragment),He=w(),ce=q("h3"),ce.innerHTML=ht,yt=w(),we.c(),Ee=w(),me=q("h2"),me.innerHTML=bt,We=w(),Ae=q("ul"),Ae.innerHTML=Mt,je=w(),ue=q("h2"),ue.innerHTML=$t,wt=w(),Fe=q("p"),Fe.innerHTML=Ht,L=w(),ot=q("hr"),vt=w(),z(st.$$.fragment),this.h()},l(r){lt&&lt.l(r),t=$(r);const m=Oa("svelte-2igo1p",document.head);Ft.l(m),a=T(m,"META",{name:!0,content:!0}),e=T(m,"META",{name:!0,content:!0}),_t&&_t.l(m),n=At(),m.forEach(d),i=$(r),D&&D.l(r),_=$(r),I&&I.l(r),l=$(r),U&&U.l(r),h=$(r),Q&&Q.l(r),c=$(r),W&&W.l(r),b=$(r),J&&J.l(r),s=$(r),K&&K.l(r),v=$(r),G&&G.l(r),f=$(r),Y&&Y.l(r),g=$(r),X&&X.l(r),S=$(r),C(H.$$.fragment,r),k=$(r),F=T(r,"P",{});var ne=jt(F);De=O(ne,"Up: "),Je.l(ne),Ge=O(ne," · "),Ie=T(ne,"A",{href:!0,"data-svelte-h":!0}),A(Ie)!=="svelte-1eye8e9"&&(Ie.textContent=Tt),zt=O(ne," · "),ve=T(ne,"A",{href:!0,"data-svelte-h":!0}),A(ve)!=="svelte-6j2qr0"&&(ve.textContent=Ye),nt=O(ne," · "),Ue=T(ne,"A",{href:!0,"data-svelte-h":!0}),A(Ue)!=="svelte-z78e0k"&&(Ue.textContent=qt),ne.forEach(d),dt=$(r),C(fe.$$.fragment,r),Te=$(r),V&&V.l(r),qe=$(r),se=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(se)!=="svelte-14f17uo"&&(se.innerHTML=Lt),ct=$(r),pe=T(r,"P",{class:!0,"data-svelte-h":!0}),A(pe)!=="svelte-pighte"&&(pe.innerHTML=Xe),Ve=$(r),Z&&Z.l(r),Ze=$(r),he.l(r),xe=$(r),le=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(le)!=="svelte-1i9w9pn"&&(le.innerHTML=mt),ut=$(r),Ce=T(r,"H3",{class:!0,id:!0,"data-svelte-h":!0}),A(Ce)!=="svelte-3hvew3"&&(Ce.innerHTML=St),Le=$(r),re.l(r),et=$(r),ze=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(ze)!=="svelte-4kb45v"&&(ze.innerHTML=Bt),Se=$(r),ie.l(r),tt=$(r),Be=T(r,"P",{class:!0,"data-svelte-h":!0}),A(Be)!=="svelte-1xa7bh7"&&(Be.innerHTML=Ot),Oe=$(r),_e=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(_e)!=="svelte-1mdzqzc"&&(_e.innerHTML=ft),Qe=$(r),be.l(r),Re=$(r),de=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(de)!=="svelte-60cjj9"&&(de.innerHTML=pt),gt=$(r),ee&&ee.l(r),at=$(r),C(Me.$$.fragment,r),He=$(r),ce=T(r,"H3",{class:!0,id:!0,"data-svelte-h":!0}),A(ce)!=="svelte-140mx4a"&&(ce.innerHTML=ht),yt=$(r),we.l(r),Ee=$(r),me=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(me)!=="svelte-ad0syq"&&(me.innerHTML=bt),We=$(r),Ae=T(r,"UL",{class:!0,"data-svelte-h":!0}),A(Ae)!=="svelte-1j76xu"&&(Ae.innerHTML=Mt),je=$(r),ue=T(r,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(ue)!=="svelte-oimjns"&&(ue.innerHTML=$t),wt=$(r),Fe=T(r,"P",{class:!0,"data-svelte-h":!0}),A(Fe)!=="svelte-lhsrox"&&(Fe.innerHTML=Ht),L=$(r),ot=T(r,"HR",{class:!0}),vt=$(r),C(st.$$.fragment,r),this.h()},h(){x(a,"name","twitter:card"),x(a,"content","summary_large_image"),x(e,"name","twitter:site"),x(e,"content","@evidence_dev"),x(Ie,"href","/gentriduck/berlin/area/ortsteil"),x(ve,"href","/gentriduck/berlin/area/bezirk"),x(Ue,"href","/gentriduck/berlin/area"),x(se,"class","markdown"),x(se,"id","social-status--trajectory"),x(pe,"class","markdown"),x(le,"class","markdown"),x(le,"id","commercial-mix--offering-advantage"),x(Ce,"class","markdown"),x(Ce,"id","mapped-places"),x(ze,"class","markdown"),x(ze,"id","within-group-dominance"),x(Be,"class","markdown"),x(_e,"class","markdown"),x(_e,"id","people--structure"),x(de,"class","markdown"),x(de,"id","where-this-area-sits"),x(ce,"class","markdown"),x(ce,"id","neighbourhoods-planungsräume-dominantly-assigned-to-this-ortsteil"),x(me,"class","markdown"),x(me,"id","honest-caveats"),x(Ae,"class","markdown"),x(ue,"class","markdown"),x(ue,"id","further-reading"),x(Fe,"class","markdown"),x(ot,"class","markdown")},m(r,m){lt&&lt.m(r,m),u(r,t,m),Ft.m(document.head,null),oe(document.head,a),oe(document.head,e),_t&&_t.m(document.head,null),oe(document.head,n),u(r,i,m),D&&D.m(r,m),u(r,_,m),I&&I.m(r,m),u(r,l,m),U&&U.m(r,m),u(r,h,m),Q&&Q.m(r,m),u(r,c,m),W&&W.m(r,m),u(r,b,m),J&&J.m(r,m),u(r,s,m),K&&K.m(r,m),u(r,v,m),G&&G.m(r,m),u(r,f,m),Y&&Y.m(r,m),u(r,g,m),X&&X.m(r,m),u(r,S,m),E(H,r,m),u(r,k,m),u(r,F,m),oe(F,De),Je.m(F,null),oe(F,Ge),oe(F,Ie),oe(F,zt),oe(F,ve),oe(F,nt),oe(F,Ue),u(r,dt,m),E(fe,r,m),u(r,Te,m),V&&V.m(r,m),u(r,qe,m),u(r,se,m),u(r,ct,m),u(r,pe,m),u(r,Ve,m),Z&&Z.m(r,m),u(r,Ze,m),kt[ge].m(r,m),u(r,xe,m),u(r,le,m),u(r,ut,m),u(r,Ce,m),u(r,Le,m),xt[N].m(r,m),u(r,et,m),u(r,ze,m),u(r,Se,m),Rt[P].m(r,m),u(r,tt,m),u(r,Be,m),u(r,Oe,m),u(r,_e,m),u(r,Qe,m),Et[ye].m(r,m),u(r,Re,m),u(r,de,m),u(r,gt,m),ee&&ee.m(r,m),u(r,at,m),E(Me,r,m),u(r,He,m),u(r,ce,m),u(r,yt,m),Ct[$e].m(r,m),u(r,Ee,m),u(r,me,m),u(r,We,m),u(r,Ae,m),u(r,je,m),u(r,ue,m),u(r,wt,m),u(r,Fe,m),u(r,L,m),u(r,ot,m),u(r,vt,m),E(st,r,m),Pt=!0},p(r,m){var da;typeof B<"u"&&(B.title||(da=B.og)!=null&&da.title)&&B.hide_title!==!0&&lt.p(r,m),Ft.p(r,m),typeof B=="object"&&_t.p(r,m),r[4]?D?(D.p(r,m),m[0]&16&&p(D,1)):(D=pa(r),D.c(),p(D,1),D.m(_.parentNode,_)):D&&(ae(),y(D,1,1,()=>{D=null}),te()),r[5]?I?(I.p(r,m),m[0]&32&&p(I,1)):(I=ga(r),I.c(),p(I,1),I.m(l.parentNode,l)):I&&(ae(),y(I,1,1,()=>{I=null}),te()),r[0]?U?(U.p(r,m),m[0]&1&&p(U,1)):(U=ha(r),U.c(),p(U,1),U.m(h.parentNode,h)):U&&(ae(),y(U,1,1,()=>{U=null}),te()),r[6]?Q?(Q.p(r,m),m[0]&64&&p(Q,1)):(Q=ya(r),Q.c(),p(Q,1),Q.m(c.parentNode,c)):Q&&(ae(),y(Q,1,1,()=>{Q=null}),te()),r[7]?W?(W.p(r,m),m[0]&128&&p(W,1)):(W=ba(r),W.c(),p(W,1),W.m(b.parentNode,b)):W&&(ae(),y(W,1,1,()=>{W=null}),te()),r[8]?J?(J.p(r,m),m[0]&256&&p(J,1)):(J=$a(r),J.c(),p(J,1),J.m(s.parentNode,s)):J&&(ae(),y(J,1,1,()=>{J=null}),te()),r[9]?K?(K.p(r,m),m[0]&512&&p(K,1)):(K=wa(r),K.c(),p(K,1),K.m(v.parentNode,v)):K&&(ae(),y(K,1,1,()=>{K=null}),te()),r[1]?G?(G.p(r,m),m[0]&2&&p(G,1)):(G=va(r),G.c(),p(G,1),G.m(f.parentNode,f)):G&&(ae(),y(G,1,1,()=>{G=null}),te()),r[10]?Y?(Y.p(r,m),m[0]&1024&&p(Y,1)):(Y=ka(r),Y.c(),p(Y,1),Y.m(g.parentNode,g)):Y&&(ae(),y(Y,1,1,()=>{Y=null}),te()),r[11]?X?(X.p(r,m),m[0]&2048&&p(X,1)):(X=xa(r),X.c(),p(X,1),X.m(S.parentNode,S)):X&&(ae(),y(X,1,1,()=>{X=null}),te());const ne={};m[0]&16&&(ne.title=(r[4][0]?r[4][0].area_name:"Ortsteil")+" — Ortsteil profile"),H.$set(ne),Dt===(Dt=Xt(r))&&Je?Je.p(r,m):(Je.d(1),Je=Dt(r),Je&&(Je.c(),Je.m(F,Ge)));const _a={};m[2]&134217728&&(_a.$$scope={dirty:m,ctx:r}),fe.$set(_a),r[3]?V&&(ae(),y(V,1,1,()=>{V=null}),te()):V?(V.p(r,m),m[0]&8&&p(V,1)):(V=Ra(r),V.c(),p(V,1),V.m(qe.parentNode,qe)),r[2]?Z?(Z.p(r,m),m[0]&4&&p(Z,1)):(Z=Ea(r),Z.c(),p(Z,1),Z.m(Ze.parentNode,Ze)):Z&&(ae(),y(Z,1,1,()=>{Z=null}),te());let It=ge;ge=Zt(r),ge===It?kt[ge].p(r,m):(ae(),y(kt[It],1,1,()=>{kt[It]=null}),te(),he=kt[ge],he?he.p(r,m):(he=kt[ge]=Vt[ge](r),he.c()),p(he,1),he.m(xe.parentNode,xe));let Ut=N;N=ta(r),N===Ut?xt[N].p(r,m):(ae(),y(xt[Ut],1,1,()=>{xt[Ut]=null}),te(),re=xt[N],re?re.p(r,m):(re=xt[N]=ea[N](r),re.c()),p(re,1),re.m(et.parentNode,et));let Qt=P;P=ra(r),P===Qt?Rt[P].p(r,m):(ae(),y(Rt[Qt],1,1,()=>{Rt[Qt]=null}),te(),ie=Rt[P],ie?ie.p(r,m):(ie=Rt[P]=aa[P](r),ie.c()),p(ie,1),ie.m(tt.parentNode,tt));let Wt=ye;ye=na(r),ye===Wt?Et[ye].p(r,m):(ae(),y(Et[Wt],1,1,()=>{Et[Wt]=null}),te(),be=Et[ye],be?be.p(r,m):(be=Et[ye]=ia[ye](r),be.c()),p(be,1),be.m(Re.parentNode,Re)),r[12]?ee?(ee.p(r,m),m[0]&4096&&p(ee,1)):(ee=Ta(r),ee.c(),p(ee,1),ee.m(at.parentNode,at)):ee&&(ae(),y(ee,1,1,()=>{ee=null}),te());const Jt={};m[0]&4096&&(Jt.data=r[12]),m[0]&16&&(Jt.title=r[4][0]?r[4][0].area_name:"This Ortsteil"),Me.$set(Jt);let Kt=$e;$e=sa(r),$e===Kt?Ct[$e].p(r,m):(ae(),y(Ct[Kt],1,1,()=>{Ct[Kt]=null}),te(),we=Ct[$e],we?we.p(r,m):(we=Ct[$e]=oa[$e](r),we.c()),p(we,1),we.m(Ee.parentNode,Ee))},i(r){Pt||(p(D),p(I),p(U),p(Q),p(W),p(J),p(K),p(G),p(Y),p(X),p(H.$$.fragment,r),p(fe.$$.fragment,r),p(V),p(Z),p(he),p(re),p(ie),p(be),p(ee),p(Me.$$.fragment,r),p(we),p(st.$$.fragment,r),Pt=!0)},o(r){y(D),y(I),y(U),y(Q),y(W),y(J),y(K),y(G),y(Y),y(X),y(H.$$.fragment,r),y(fe.$$.fragment,r),y(V),y(Z),y(he),y(re),y(ie),y(be),y(ee),y(Me.$$.fragment,r),y(we),y(st.$$.fragment,r),Pt=!1},d(r){r&&(d(t),d(i),d(_),d(l),d(h),d(c),d(b),d(s),d(v),d(f),d(g),d(S),d(k),d(F),d(dt),d(Te),d(qe),d(se),d(ct),d(pe),d(Ve),d(Ze),d(xe),d(le),d(ut),d(Ce),d(Le),d(et),d(ze),d(Se),d(tt),d(Be),d(Oe),d(_e),d(Qe),d(Re),d(de),d(gt),d(at),d(He),d(ce),d(yt),d(Ee),d(me),d(We),d(Ae),d(je),d(ue),d(wt),d(Fe),d(L),d(ot),d(vt)),lt&&lt.d(r),Ft.d(r),d(a),d(e),_t&&_t.d(r),d(n),D&&D.d(r),I&&I.d(r),U&&U.d(r),Q&&Q.d(r),W&&W.d(r),J&&J.d(r),K&&K.d(r),G&&G.d(r),Y&&Y.d(r),X&&X.d(r),R(H,r),Je.d(),R(fe,r),V&&V.d(r),Z&&Z.d(r),kt[ge].d(r),xt[N].d(r),Rt[P].d(r),Et[ye].d(r),ee&&ee.d(r),R(Me,r),Ct[$e].d(r),R(st,r)}}}const B={};function Hr(o,t,a){let e,n,i,_,l,h,c;ca(o,Va,L=>a(69,h=L)),ca(o,ua,L=>a(73,c=L));let{data:b}=t,{data:s={},customFormattingSettings:v,__db:f,inputs:g}=b;Ma(ua,c="865e864f193aaf1ad3eb98cb754fbd9d",c);let S=Ka(Ja(g));Ha(S.subscribe(L=>a(17,g=L))),Aa(Xa,{getCustomFormats:()=>v.customFormats||[]});const H=(L,ot)=>Za(f.query,L,{query_name:ot});Ga(H);let k=h.params;ja(()=>!0);let F={initialData:void 0,initialError:void 0},De=j`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`,Ge=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`;s.ortsteil_name_data&&(s.ortsteil_name_data instanceof Error?F.initialError=s.ortsteil_name_data:F.initialData=s.ortsteil_name_data,s.ortsteil_name_columns&&(F.knownColumns=s.ortsteil_name_columns));let Ie,Tt=!1;const zt=Ne.createReactive({callback:L=>{a(4,Ie=L)},execFn:H},{id:"ortsteil_name",...F});zt(Ge,{noResolve:De,...F}),globalThis[Symbol.for("ortsteil_name")]={get value(){return Ie}};let ve={initialData:void 0,initialError:void 0},Ye=j`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`,nt=`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`;s.bezirk_info_data&&(s.bezirk_info_data instanceof Error?ve.initialError=s.bezirk_info_data:ve.initialData=s.bezirk_info_data,s.bezirk_info_columns&&(ve.knownColumns=s.bezirk_info_columns));let Ue,qt=!1;const dt=Ne.createReactive({callback:L=>{a(5,Ue=L)},execFn:H},{id:"bezirk_info",...ve});dt(nt,{noResolve:Ye,...ve}),globalThis[Symbol.for("bezirk_info")]={get value(){return Ue}};let fe={initialData:void 0,initialError:void 0},Te=j`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`,qe=`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`;s.child_count_data&&(s.child_count_data instanceof Error?fe.initialError=s.child_count_data:fe.initialData=s.child_count_data,s.child_count_columns&&(fe.knownColumns=s.child_count_columns));let se,Lt=!1;const ct=Ne.createReactive({callback:L=>{a(0,se=L)},execFn:H},{id:"child_count",...fe});ct(qe,{noResolve:Te,...fe}),globalThis[Symbol.for("child_count")]={get value(){return se}};let pe={initialData:void 0,initialError:void 0},Xe=j`select
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
limit 1`,Ve=`select
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
limit 1`;s.demographics_data&&(s.demographics_data instanceof Error?pe.initialError=s.demographics_data:pe.initialData=s.demographics_data,s.demographics_columns&&(pe.knownColumns=s.demographics_columns));let Ze,ge=!1;const he=Ne.createReactive({callback:L=>{a(6,Ze=L)},execFn:H},{id:"demographics",...pe});he(Ve,{noResolve:Xe,...pe}),globalThis[Symbol.for("demographics")]={get value(){return Ze}};let xe={initialData:void 0,initialError:void 0},le=j`with latest as (
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
order by sort_order`,mt=`with latest as (
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
order by sort_order`;s.age_mix_data&&(s.age_mix_data instanceof Error?xe.initialError=s.age_mix_data:xe.initialData=s.age_mix_data,s.age_mix_columns&&(xe.knownColumns=s.age_mix_columns));let ut,Ce=!1;const St=Ne.createReactive({callback:L=>{a(7,ut=L)},execFn:H},{id:"age_mix",...xe});St(mt,{noResolve:le,...xe}),globalThis[Symbol.for("age_mix")]={get value(){return ut}};let Le={initialData:void 0,initialError:void 0},N=j`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`,re=`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`;s.stage_mix_data&&(s.stage_mix_data instanceof Error?Le.initialError=s.stage_mix_data:Le.initialData=s.stage_mix_data,s.stage_mix_columns&&(Le.knownColumns=s.stage_mix_columns));let et,ze=!1;const Bt=Ne.createReactive({callback:L=>{a(8,et=L)},execFn:H},{id:"stage_mix",...Le});Bt(re,{noResolve:N,...Le}),globalThis[Symbol.for("stage_mix")]={get value(){return et}};let Se={initialData:void 0,initialError:void 0},P=j`select
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
order by poi_count desc`,ie=`select
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
order by poi_count desc`;s.poi_mix_data&&(s.poi_mix_data instanceof Error?Se.initialError=s.poi_mix_data:Se.initialData=s.poi_mix_data,s.poi_mix_columns&&(Se.knownColumns=s.poi_mix_columns));let tt,Be=!1;const Ot=Ne.createReactive({callback:L=>{a(9,tt=L)},execFn:H},{id:"poi_mix",...Se});Ot(ie,{noResolve:P,...Se}),globalThis[Symbol.for("poi_mix")]={get value(){return tt}};let Oe={initialData:void 0,initialError:void 0},_e=j`select
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
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`,ft=`select
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
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`;s.children_data&&(s.children_data instanceof Error?Oe.initialError=s.children_data:Oe.initialData=s.children_data,s.children_columns&&(Oe.knownColumns=s.children_columns));let Qe,ye=!1;const be=Ne.createReactive({callback:L=>{a(1,Qe=L)},execFn:H},{id:"children",...Oe});be(ft,{noResolve:_e,...Oe}),globalThis[Symbol.for("children")]={get value(){return Qe}};let Re={initialData:void 0,initialError:void 0},de=j`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${g.dom_group.value}'
  and d.snapshot_year = ${g.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`,pt=`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${g.dom_group.value}'
  and d.snapshot_year = ${g.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`;s.dom_suppressed_count_data&&(s.dom_suppressed_count_data instanceof Error?Re.initialError=s.dom_suppressed_count_data:Re.initialData=s.dom_suppressed_count_data,s.dom_suppressed_count_columns&&(Re.knownColumns=s.dom_suppressed_count_columns));let gt,at=!1;const Me=Ne.createReactive({callback:L=>{a(10,gt=L)},execFn:H},{id:"dom_suppressed_count",...Re});Me(pt,{noResolve:de,...Re}),globalThis[Symbol.for("dom_suppressed_count")]={get value(){return gt}};let He={initialData:void 0,initialError:void 0},ce=j`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${g.dom_group.value}'
    and d.snapshot_year = ${g.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`,ht=`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${g.dom_group.value}'
    and d.snapshot_year = ${g.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`;s.dominance_children_data&&(s.dominance_children_data instanceof Error?He.initialError=s.dominance_children_data:He.initialData=s.dominance_children_data,s.dominance_children_columns&&(He.knownColumns=s.dominance_children_columns));let yt,$e=!1;const we=Ne.createReactive({callback:L=>{a(11,yt=L)},execFn:H},{id:"dominance_children",...He});we(ht,{noResolve:ce,...He}),globalThis[Symbol.for("dominance_children")]={get value(){return yt}};let Ee={initialData:void 0,initialError:void 0},me=j`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
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
from totals as t cross join top cross join advanced as a`,bt=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
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
from totals as t cross join top cross join advanced as a`;s.stage_mix_summary_data&&(s.stage_mix_summary_data instanceof Error?Ee.initialError=s.stage_mix_summary_data:Ee.initialData=s.stage_mix_summary_data,s.stage_mix_summary_columns&&(Ee.knownColumns=s.stage_mix_summary_columns));let We,Ae=!1;const Mt=Ne.createReactive({callback:L=>{a(2,We=L)},execFn:H},{id:"stage_mix_summary",...Ee});Mt(bt,{noResolve:me,...Ee}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return We}};let je={initialData:void 0,initialError:void 0},ue=j`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`,$t=`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`;s.minimap_areas_data&&(s.minimap_areas_data instanceof Error?je.initialError=s.minimap_areas_data:je.initialData=s.minimap_areas_data,s.minimap_areas_columns&&(je.knownColumns=s.minimap_areas_columns));let wt,Fe=!1;const Ht=Ne.createReactive({callback:L=>{a(12,wt=L)},execFn:H},{id:"minimap_areas",...je});return Ht($t,{noResolve:ue,...je}),globalThis[Symbol.for("minimap_areas")]={get value(){return wt}},o.$$set=L=>{"data"in L&&a(15,b=L.data)},o.$$.update=()=>{o.$$.dirty[0]&32768&&a(16,{data:s={},customFormattingSettings:v,__db:f}=b,s),o.$$.dirty[0]&65536&&Ya.set(Object.keys(s).length>0),o.$$.dirty[2]&128&&a(18,k=h.params),o.$$.dirty[0]&262144&&a(20,De=j`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`),o.$$.dirty[0]&262144&&a(21,Ge=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'
limit 1`),o.$$.dirty[0]&7864320&&(De||!Tt?De||(zt(Ge,{noResolve:De,...F}),a(22,Tt=!0)):zt(Ge,{noResolve:De})),o.$$.dirty[0]&262144&&a(24,Ye=j`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`),o.$$.dirty[0]&262144&&a(25,nt=`-- Ortsteil -> Bezirk nests EXACTLY (source-provided fact, see header comment) -- safe to derive
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
where bezirk_code = substr('${k.code}', 1, 2)`),o.$$.dirty[0]&125829120&&(Ye||!qt?Ye||(dt(nt,{noResolve:Ye,...ve}),a(26,qt=!0)):dt(nt,{noResolve:Ye})),o.$$.dirty[0]&262144&&a(28,Te=j`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`),o.$$.dirty[0]&262144&&a(29,qe=`-- Gates every PLR-rollup section below. A live count, not a hardcoded 2-code enclave list --
-- see this file's header comment.
select count(*) as n
from gentriduck_marts.mart_ortsteil_plr_crosswalk
where ortsteil_area_code = '${k.code}' and is_dominant_ortsteil`),o.$$.dirty[0]&2013265920&&(Te||!Lt?Te||(ct(qe,{noResolve:Te,...fe}),a(30,Lt=!0)):ct(qe,{noResolve:Te})),o.$$.dirty[0]&262144&&a(32,Xe=j`select
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
limit 1`),o.$$.dirty[0]&262144&&a(33,Ve=`select
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
limit 1`),o.$$.dirty[1]&15&&(Xe||!ge?Xe||(he(Ve,{noResolve:Xe,...pe}),a(34,ge=!0)):he(Ve,{noResolve:Xe})),o.$$.dirty[0]&262144&&a(36,le=j`with latest as (
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
order by sort_order`),o.$$.dirty[0]&262144&&a(37,mt=`with latest as (
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
order by sort_order`),o.$$.dirty[1]&240&&(le||!Ce?le||(St(mt,{noResolve:le,...xe}),a(38,Ce=!0)):St(mt,{noResolve:le})),o.$$.dirty[0]&262144&&a(40,N=j`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`),o.$$.dirty[0]&262144&&a(41,re=`select
    typology_stage as stage,
    n_plr as n_areas
from gentriduck_marts.mart_ortsteil_plr_stage_mix
where city_code = 'BER' and ortsteil_area_code = '${k.code}'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.mart_ortsteil_plr_stage_mix
      where city_code = 'BER'
  )
order by n_areas desc`),o.$$.dirty[1]&3840&&(N||!ze?N||(Bt(re,{noResolve:N,...Le}),a(42,ze=!0)):Bt(re,{noResolve:N})),o.$$.dirty[0]&262144&&a(44,P=j`select
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
order by poi_count desc`),o.$$.dirty[0]&262144&&a(45,ie=`select
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
order by poi_count desc`),o.$$.dirty[1]&61440&&(P||!Be?P||(Ot(ie,{noResolve:P,...Se}),a(46,Be=!0)):Ot(ie,{noResolve:P})),o.$$.dirty[0]&262144&&a(48,_e=j`select
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
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`),o.$$.dirty[0]&262144&&a(49,ft=`select
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
order by (gi.dynamism_class_bi = 'negative') desc, gi.dynamism_index desc`),o.$$.dirty[1]&983040&&(_e||!ye?_e||(be(ft,{noResolve:_e,...Oe}),a(50,ye=!0)):be(ft,{noResolve:_e})),o.$$.dirty[0]&393216&&a(52,de=j`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${g.dom_group.value}'
  and d.snapshot_year = ${g.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`),o.$$.dirty[0]&393216&&a(53,pt=`-- #298 (I21-d): disclosed, not silently dropped (OA-D0 domain sign-off Condition B.4) -- same
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
  and d.dominance_group = '${g.dom_group.value}'
  and d.snapshot_year = ${g.dom_year.value}
  and xw.ortsteil_area_code = '${k.code}'`),o.$$.dirty[1]&15728640&&(de||!at?de||(Me(pt,{noResolve:de,...Re}),a(54,at=!0)):Me(pt,{noResolve:de})),o.$$.dirty[0]&393216&&a(56,ce=j`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${g.dom_group.value}'
    and d.snapshot_year = ${g.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`),o.$$.dirty[0]&393216&&a(57,ht=`-- This Ortsteil's dominantly-assigned constituent PLRs' already-computed dominance rows
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
    and d.dominance_group = '${g.dom_group.value}'
    and d.snapshot_year = ${g.dom_year.value}
    and not d.is_thin_base
    and xw.ortsteil_area_code = '${k.code}'
order by d.hhi desc
limit 15`),o.$$.dirty[1]&251658240&&(ce||!$e?ce||(we(ht,{noResolve:ce,...He}),a(58,$e=!0)):we(ht,{noResolve:ce})),o.$$.dirty[0]&262144&&a(60,me=j`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
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
from totals as t cross join top cross join advanced as a`),o.$$.dirty[0]&262144&&a(61,bt=`-- Modal stage + heterogeneity flag, computed from the SAME stage_mix rows above (no new query
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
from totals as t cross join top cross join advanced as a`),o.$$.dirty[1]&1879048192|o.$$.dirty[2]&1&&(me||!Ae?me||(Mt(bt,{noResolve:me,...Ee}),a(62,Ae=!0)):Mt(bt,{noResolve:me})),o.$$.dirty[0]&262144&&a(64,ue=j`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`),o.$$.dirty[0]&262144&&a(65,$t=`-- Name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced name
-- containing a quote character can never break this query's own SQL syntax.
select
    'ortsteil:' || '${k.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${k.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'BER' and area_level = 'ortsteil' and area_code = '${k.code}'`),o.$$.dirty[2]&30&&(ue||!Fe?ue||(Ht($t,{noResolve:ue,...je}),a(66,Fe=!0)):Ht($t,{noResolve:ue})),o.$$.dirty[0]&1&&a(3,e=(se==null?void 0:se[0])&&Number(se[0].n)>0),o.$$.dirty[0]&2&&a(68,n=Array.isArray(Qe)?Qe:Array.from(Qe??[])),o.$$.dirty[2]&64&&a(14,i=n.some(L=>Number(L.overlap_frac_of_plr)<.8)),o.$$.dirty[0]&4&&a(67,_=We==null?void 0:We[0]),o.$$.dirty[0]&8|o.$$.dirty[2]&32&&a(13,l=!e||!_||_.n_total==null||Number(_.n_total)===0?null:(()=>{const L=Number(_.n_total),ot=Number(_.n_advanced||0),vt=_.top_stage_share!=null?Number(_.top_stage_share):null,st=vt!=null&&vt>.5?`<b>${_.top_stage}</b> is the only stage holding a majority (${Math.round(vt*100)}%)`:"no single stage holds a majority";return`<b>${ot}</b> of <b>${L}</b> neighbourhoods (Planungsräume) here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${st} — a distribution across this Ortsteil's own (dominantly-assigned) neighbourhoods, never a single re-scored gentrification-index value for the Ortsteil itself.`})())},[se,Qe,We,e,Ie,Ue,Ze,ut,et,tt,gt,yt,wt,l,i,b,s,g,k,F,De,Ge,Tt,ve,Ye,nt,qt,fe,Te,qe,Lt,pe,Xe,Ve,ge,xe,le,mt,Ce,Le,N,re,ze,Se,P,ie,Be,Oe,_e,ft,ye,Re,de,pt,at,He,ce,ht,$e,Ee,me,bt,Ae,je,ue,$t,Fe,_,n,h]}class ei extends Pa{constructor(t){super(),Da(this,t,Hr,Mr,Ba,{data:15},null,[-1,-1,-1])}}export{ei as component};
