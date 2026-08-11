import{s as X,d as m,i as f,a as Q,b as y,c as $,h as Y,e as w,f as j,g as J,j as k,k as E,l as L,m as W,o as Z,n as ee,p as te,q as B,r as ae,t as re,u as ie}from"../chunks/scheduler.BopPEjhc.js";import{S as ne,i as se,d as S,t as R,a as M,c as le,m as q,b as P,e as D,g as oe}from"../chunks/index.CYkVJg6_.js";import{F as me}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as _e}from"../chunks/Hero.CRoRGI02.js";import{D as ce,C as N}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{w as ue}from"../chunks/entry.BMmpG6A7.js";import{e as fe,s as de,Q as pe,p as ye,a as U,r as G,C as be}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as V}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as ge}from"../chunks/stores.Ceyp10jj.js";import{Q as he}from"../chunks/QueryViewer.CNDqAaoE.js";import{p as $e}from"../chunks/profile.BW8tN6E9.js";function ke(d){let a,l=_.title+"",e;return{c(){a=E("h1"),e=ie(l),this.h()},l(r){a=w(r,"H1",{class:!0});var s=ae(a);e=re(s,l),s.forEach(m),this.h()},h(){y(a,"class","title")},m(r,s){f(r,a,s),Q(a,e)},p:B,d(r){r&&m(a)}}}function ve(d){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:B,p:B,d:B}}function we(d){let a,l,e,r,s;return document.title=a=_.title,{c(){l=k(),e=E("meta"),r=k(),s=E("meta"),this.h()},l(t){l=$(t),e=w(t,"META",{property:!0,content:!0}),r=$(t),s=w(t,"META",{name:!0,content:!0}),this.h()},h(){var t,n;y(e,"property","og:title"),y(e,"content",((t=_.og)==null?void 0:t.title)??_.title),y(s,"name","twitter:title"),y(s,"content",((n=_.og)==null?void 0:n.title)??_.title)},m(t,n){f(t,l,n),f(t,e,n),f(t,r,n),f(t,s,n)},p(t,n){n&0&&a!==(a=_.title)&&(document.title=a)},d(t){t&&(m(l),m(e),m(r),m(s))}}}function Ee(d){var s,t;let a,l,e=(_.description||((s=_.og)==null?void 0:s.description))&&Te(),r=((t=_.og)==null?void 0:t.image)&&xe();return{c(){e&&e.c(),a=k(),r&&r.c(),l=j()},l(n){e&&e.l(n),a=$(n),r&&r.l(n),l=j()},m(n,u){e&&e.m(n,u),f(n,a,u),r&&r.m(n,u),f(n,l,u)},p(n,u){var o,g;(_.description||(o=_.og)!=null&&o.description)&&e.p(n,u),(g=_.og)!=null&&g.image&&r.p(n,u)},d(n){n&&(m(a),m(l)),e&&e.d(n),r&&r.d(n)}}}function Te(d){let a,l,e,r,s;return{c(){a=E("meta"),l=k(),e=E("meta"),r=k(),s=E("meta"),this.h()},l(t){a=w(t,"META",{name:!0,content:!0}),l=$(t),e=w(t,"META",{property:!0,content:!0}),r=$(t),s=w(t,"META",{name:!0,content:!0}),this.h()},h(){var t,n,u;y(a,"name","description"),y(a,"content",_.description??((t=_.og)==null?void 0:t.description)),y(e,"property","og:description"),y(e,"content",((n=_.og)==null?void 0:n.description)??_.description),y(s,"name","twitter:description"),y(s,"content",((u=_.og)==null?void 0:u.description)??_.description)},m(t,n){f(t,a,n),f(t,l,n),f(t,e,n),f(t,r,n),f(t,s,n)},p:B,d(t){t&&(m(a),m(l),m(e),m(r),m(s))}}}function xe(d){let a,l,e;return{c(){a=E("meta"),l=k(),e=E("meta"),this.h()},l(r){a=w(r,"META",{property:!0,content:!0}),l=$(r),e=w(r,"META",{name:!0,content:!0}),this.h()},h(){var r,s;y(a,"property","og:image"),y(a,"content",U((r=_.og)==null?void 0:r.image)),y(e,"name","twitter:image"),y(e,"content",U((s=_.og)==null?void 0:s.image))},m(r,s){f(r,a,s),f(r,l,s),f(r,e,s)},p:B,d(r){r&&(m(a),m(l),m(e))}}}function K(d){let a,l;return a=new he({props:{queryID:"all_areas",queryResult:d[0]}}),{c(){D(a.$$.fragment)},l(e){P(a.$$.fragment,e)},m(e,r){q(a,e,r),l=!0},p(e,r){const s={};r&1&&(s.queryResult=e[0]),a.$set(s)},i(e){l||(M(a.$$.fragment,e),l=!0)},o(e){R(a.$$.fragment,e),l=!1},d(e){S(a,e)}}}function Me(d){let a,l,e,r,s,t,n,u;return a=new N({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),e=new N({props:{id:"bezirk",title:"District code"}}),s=new N({props:{id:"stage",title:"Stage"}}),n=new N({props:{id:"pressure_trend",title:"Pressure trend"}}),{c(){D(a.$$.fragment),l=k(),D(e.$$.fragment),r=k(),D(s.$$.fragment),t=k(),D(n.$$.fragment)},l(o){P(a.$$.fragment,o),l=$(o),P(e.$$.fragment,o),r=$(o),P(s.$$.fragment,o),t=$(o),P(n.$$.fragment,o)},m(o,g){q(a,o,g),f(o,l,g),q(e,o,g),f(o,r,g),q(s,o,g),f(o,t,g),q(n,o,g),u=!0},p:B,i(o){u||(M(a.$$.fragment,o),M(e.$$.fragment,o),M(s.$$.fragment,o),M(n.$$.fragment,o),u=!0)},o(o){R(a.$$.fragment,o),R(e.$$.fragment,o),R(s.$$.fragment,o),R(n.$$.fragment,o),u=!1},d(o){o&&(m(l),m(r),m(t)),S(a,o),S(e,o),S(s,o),S(n,o)}}}function Re(d){let a,l,e,r,s,t,n,u,o=`Search or sort the table, or use the <a href="/gentriduck/berlin/area-detail" class="markdown">district browse</a> / <a href="/gentriduck/berlin/maps" class="markdown">map</a>
instead — that district browse is the primary way in for most readers; this page exists mainly so
every neighbourhood has a real, findable page (see this file&#39;s header comment).`,g,A,h,v,T,F,x,H,p=typeof _<"u"&&_.title&&_.hide_title!==!0&&ke();function z(i,c){return typeof _<"u"&&_.title?we:ve}let I=z()(d),C=typeof _=="object"&&Ee();t=new _e({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"All neighbourhoods (Planungsräume)",lede:"Every Berlin neighbourhood (Planungsraum) on its current (2021+) boundaries — a full-text search, secondary to the district browse for most readers."}});let b=d[0]&&K(d);return h=new ce({props:{data:d[0],rows:"542",search:"true",link:"area_link",$$slots:{default:[Me]},$$scope:{ctx:d}}}),x=new me({}),{c(){p&&p.c(),a=k(),I.c(),l=E("meta"),e=E("meta"),C&&C.c(),r=j(),s=k(),D(t.$$.fragment),n=k(),u=E("p"),u.innerHTML=o,g=k(),b&&b.c(),A=k(),D(h.$$.fragment),v=k(),T=E("hr"),F=k(),D(x.$$.fragment),this.h()},l(i){p&&p.l(i),a=$(i);const c=Y("svelte-2igo1p",document.head);I.l(c),l=w(c,"META",{name:!0,content:!0}),e=w(c,"META",{name:!0,content:!0}),C&&C.l(c),r=j(),c.forEach(m),s=$(i),P(t.$$.fragment,i),n=$(i),u=w(i,"P",{class:!0,"data-svelte-h":!0}),J(u)!=="svelte-1sjoh5v"&&(u.innerHTML=o),g=$(i),b&&b.l(i),A=$(i),P(h.$$.fragment,i),v=$(i),T=w(i,"HR",{class:!0}),F=$(i),P(x.$$.fragment,i),this.h()},h(){y(l,"name","twitter:card"),y(l,"content","summary_large_image"),y(e,"name","twitter:site"),y(e,"content","@evidence_dev"),y(u,"class","markdown"),y(T,"class","markdown")},m(i,c){p&&p.m(i,c),f(i,a,c),I.m(document.head,null),Q(document.head,l),Q(document.head,e),C&&C.m(document.head,null),Q(document.head,r),f(i,s,c),q(t,i,c),f(i,n,c),f(i,u,c),f(i,g,c),b&&b.m(i,c),f(i,A,c),q(h,i,c),f(i,v,c),f(i,T,c),f(i,F,c),q(x,i,c),H=!0},p(i,[c]){typeof _<"u"&&_.title&&_.hide_title!==!0&&p.p(i,c),I.p(i,c),typeof _=="object"&&C.p(i,c),i[0]?b?(b.p(i,c),c&1&&M(b,1)):(b=K(i),b.c(),M(b,1),b.m(A.parentNode,A)):b&&(oe(),R(b,1,1,()=>{b=null}),le());const O={};c&1&&(O.data=i[0]),c&262144&&(O.$$scope={dirty:c,ctx:i}),h.$set(O)},i(i){H||(M(t.$$.fragment,i),M(b),M(h.$$.fragment,i),M(x.$$.fragment,i),H=!0)},o(i){R(t.$$.fragment,i),R(b),R(h.$$.fragment,i),R(x.$$.fragment,i),H=!1},d(i){i&&(m(a),m(s),m(n),m(u),m(g),m(A),m(v),m(T),m(F)),p&&p.d(i),I.d(i),m(l),m(e),C&&C.d(i),m(r),S(t,i),b&&b.d(i),S(h,i),S(x,i)}}}const _={title:"All neighbourhoods (Planungsräume)"};function Ae(d,a,l){let e,r;L(d,ge,p=>l(7,e=p)),L(d,G,p=>l(13,r=p));let{data:s}=a,{data:t={},customFormattingSettings:n,__db:u,inputs:o}=s;W(G,r="f325ca2434180fc4e12b84cff848e07a",r);let g=fe(ue(o));Z(g.subscribe(p=>o=p)),ee(be,{getCustomFormats:()=>n.customFormats||[]});const A=(p,z)=>$e(u.query,p,{query_name:z});de(A),e.params,te(()=>!0);let h={initialData:void 0,initialError:void 0},v=V`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`,T=`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`;t.all_areas_data&&(t.all_areas_data instanceof Error?h.initialError=t.all_areas_data:h.initialData=t.all_areas_data,t.all_areas_columns&&(h.knownColumns=t.all_areas_columns));let F,x=!1;const H=pe.createReactive({callback:p=>{l(0,F=p)},execFn:A},{id:"all_areas",...h});return H(T,{noResolve:v,...h}),globalThis[Symbol.for("all_areas")]={get value(){return F}},d.$$set=p=>{"data"in p&&l(1,s=p.data)},d.$$.update=()=>{d.$$.dirty&2&&l(2,{data:t={},customFormattingSettings:n,__db:u}=s,t),d.$$.dirty&4&&ye.set(Object.keys(t).length>0),d.$$.dirty&128&&e.params,d.$$.dirty&120&&(v||!x?v||(H(T,{noResolve:v,...h}),l(6,x=!0)):H(T,{noResolve:v}))},l(4,v=V`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`),l(5,T=`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    status_class as stage,
    dynamism_class as pressure_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`),[F,s,t,h,v,T,x,e]}class ze extends ne{constructor(a){super(),se(this,a,Ae,Re,X,{data:1})}}export{ze as component};
