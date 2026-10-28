import{s as X,d,i as m,a as N,b as p,c as y,h as Y,e as $,f as Q,k as J,l as b,m as w,n as U,o as W,p as Z,q as ee,r as te,u as q,g as ae,j as re,t as ie}from"../chunks/scheduler.CmMeO4ay.js";import{S as oe,i as se,d as D,t as j,a as M,c as ne,m as x,b as R,e as G,g as le}from"../chunks/index.bfDa0Uqw.js";import{F as ce}from"../chunks/FooterNav.BbND9dxm.js";import{H as de}from"../chunks/Hero.wYia6TQ0.js";import{D as me,C as B}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{w as _e}from"../chunks/entry.vKQYRLhF.js";import{e as ue,s as fe,Q as pe,p as he,a as L,r as V,C as ge}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as z}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as ye}from"../chunks/stores.CGa44sBH.js";import{Q as be}from"../chunks/QueryViewer.C-CXDbdP.js";import{p as ke}from"../chunks/profile.BW8tN6E9.js";function $e(_){let a,s=l.title+"",e;return{c(){a=w("h1"),e=ie(s),this.h()},l(i){a=$(i,"H1",{class:!0});var t=ae(a);e=re(t,s),t.forEach(d),this.h()},h(){p(a,"class","title")},m(i,t){m(i,a,t),N(a,e)},p:q,d(i){i&&d(a)}}}function we(_){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:q,p:q,d:q}}function ve(_){let a,s,e,i,t;return document.title=a=l.title,{c(){s=b(),e=w("meta"),i=b(),t=w("meta"),this.h()},l(r){s=y(r),e=$(r,"META",{property:!0,content:!0}),i=y(r),t=$(r,"META",{name:!0,content:!0}),this.h()},h(){var r,n;p(e,"property","og:title"),p(e,"content",((r=l.og)==null?void 0:r.title)??l.title),p(t,"name","twitter:title"),p(t,"content",((n=l.og)==null?void 0:n.title)??l.title)},m(r,n){m(r,s,n),m(r,e,n),m(r,i,n),m(r,t,n)},p(r,n){n&0&&a!==(a=l.title)&&(document.title=a)},d(r){r&&(d(s),d(e),d(i),d(t))}}}function He(_){var t,r;let a,s,e=(l.description||((t=l.og)==null?void 0:t.description))&&Te(),i=((r=l.og)==null?void 0:r.image)&&Ee();return{c(){e&&e.c(),a=b(),i&&i.c(),s=Q()},l(n){e&&e.l(n),a=y(n),i&&i.l(n),s=Q()},m(n,u){e&&e.m(n,u),m(n,a,u),i&&i.m(n,u),m(n,s,u)},p(n,u){var C,T;(l.description||(C=l.og)!=null&&C.description)&&e.p(n,u),(T=l.og)!=null&&T.image&&i.p(n,u)},d(n){n&&(d(a),d(s)),e&&e.d(n),i&&i.d(n)}}}function Te(_){let a,s,e,i,t;return{c(){a=w("meta"),s=b(),e=w("meta"),i=b(),t=w("meta"),this.h()},l(r){a=$(r,"META",{name:!0,content:!0}),s=y(r),e=$(r,"META",{property:!0,content:!0}),i=y(r),t=$(r,"META",{name:!0,content:!0}),this.h()},h(){var r,n,u;p(a,"name","description"),p(a,"content",l.description??((r=l.og)==null?void 0:r.description)),p(e,"property","og:description"),p(e,"content",((n=l.og)==null?void 0:n.description)??l.description),p(t,"name","twitter:description"),p(t,"content",((u=l.og)==null?void 0:u.description)??l.description)},m(r,n){m(r,a,n),m(r,s,n),m(r,e,n),m(r,i,n),m(r,t,n)},p:q,d(r){r&&(d(a),d(s),d(e),d(i),d(t))}}}function Ee(_){let a,s,e;return{c(){a=w("meta"),s=b(),e=w("meta"),this.h()},l(i){a=$(i,"META",{property:!0,content:!0}),s=y(i),e=$(i,"META",{name:!0,content:!0}),this.h()},h(){var i,t;p(a,"property","og:image"),p(a,"content",L((i=l.og)==null?void 0:i.image)),p(e,"name","twitter:image"),p(e,"content",L((t=l.og)==null?void 0:t.image))},m(i,t){m(i,a,t),m(i,s,t),m(i,e,t)},p:q,d(i){i&&(d(a),d(s),d(e))}}}function K(_){let a,s;return a=new be({props:{queryID:"districts",queryResult:_[0]}}),{c(){G(a.$$.fragment)},l(e){R(a.$$.fragment,e)},m(e,i){x(a,e,i),s=!0},p(e,i){const t={};i&1&&(t.queryResult=e[0]),a.$set(t)},i(e){s||(M(a.$$.fragment,e),s=!0)},o(e){j(a.$$.fragment,e),s=!1},d(e){D(a,e)}}}function Se(_){let a,s,e,i;return a=new B({props:{id:"area_name",title:"District"}}),e=new B({props:{id:"n_stadtteile",title:"Stadtteile"}}),{c(){G(a.$$.fragment),s=b(),G(e.$$.fragment)},l(t){R(a.$$.fragment,t),s=y(t),R(e.$$.fragment,t)},m(t,r){x(a,t,r),m(t,s,r),x(e,t,r),i=!0},p:q,i(t){i||(M(a.$$.fragment,t),M(e.$$.fragment,t),i=!0)},o(t){j(a.$$.fragment,t),j(e.$$.fragment,t),i=!1},d(t){t&&d(s),D(a,t),D(e,t)}}}function Me(_){let a,s,e,i,t,r,n,u,C=`Each district and Stadtteil page shows how many of its statistische Gebiete currently sit in each
gentrification stage and trajectory type, plus mapped-place counts — never a re-scored index (see
the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for why coarse-grain areas are not re-scored). For a single
Gebiet&#39;s full profile, use the <a href="/gentriduck/hamburg/area-detail" class="markdown">district browse</a> or the
<a href="/gentriduck/hamburg/area" class="markdown">full Gebiet list</a> instead. Hamburg&#39;s 104 <strong class="markdown">Stadtteile</strong> have their own
<a href="/gentriduck/hamburg/area/subarea_l1" class="markdown">Stadtteil list</a>.`,T,E,g,k,v,F,H,A,f=typeof l<"u"&&l.title&&l.hide_title!==!0&&$e();function O(o,c){return typeof l<"u"&&l.title?ve:we}let I=O()(_),S=typeof l=="object"&&He();r=new de({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"District & area profiles",lede:"Hamburg's 7 Bezirke (districts) and its 104 Stadtteile — coarser-grain profiles above the statistisches-Gebiet level, for readers who want the district or Stadtteil picture at a glance."}});let h=_[0]&&K(_);return g=new me({props:{data:_[0],rows:"7",link:"district_link",emptySet:"warn",emptyMessage:"No Hamburg district geometry available.",$$slots:{default:[Se]},$$scope:{ctx:_}}}),H=new ce({}),{c(){f&&f.c(),a=b(),I.c(),s=w("meta"),e=w("meta"),S&&S.c(),i=Q(),t=b(),G(r.$$.fragment),n=b(),u=w("p"),u.innerHTML=C,T=b(),h&&h.c(),E=b(),G(g.$$.fragment),k=b(),v=w("hr"),F=b(),G(H.$$.fragment),this.h()},l(o){f&&f.l(o),a=y(o);const c=Y("svelte-2igo1p",document.head);I.l(c),s=$(c,"META",{name:!0,content:!0}),e=$(c,"META",{name:!0,content:!0}),S&&S.l(c),i=Q(),c.forEach(d),t=y(o),R(r.$$.fragment,o),n=y(o),u=$(o,"P",{class:!0,"data-svelte-h":!0}),J(u)!=="svelte-1cwdud9"&&(u.innerHTML=C),T=y(o),h&&h.l(o),E=y(o),R(g.$$.fragment,o),k=y(o),v=$(o,"HR",{class:!0}),F=y(o),R(H.$$.fragment,o),this.h()},h(){p(s,"name","twitter:card"),p(s,"content","summary_large_image"),p(e,"name","twitter:site"),p(e,"content","@evidence_dev"),p(u,"class","markdown"),p(v,"class","markdown")},m(o,c){f&&f.m(o,c),m(o,a,c),I.m(document.head,null),N(document.head,s),N(document.head,e),S&&S.m(document.head,null),N(document.head,i),m(o,t,c),x(r,o,c),m(o,n,c),m(o,u,c),m(o,T,c),h&&h.m(o,c),m(o,E,c),x(g,o,c),m(o,k,c),m(o,v,c),m(o,F,c),x(H,o,c),A=!0},p(o,[c]){typeof l<"u"&&l.title&&l.hide_title!==!0&&f.p(o,c),I.p(o,c),typeof l=="object"&&S.p(o,c),o[0]?h?(h.p(o,c),c&1&&M(h,1)):(h=K(o),h.c(),M(h,1),h.m(E.parentNode,E)):h&&(le(),j(h,1,1,()=>{h=null}),ne());const P={};c&1&&(P.data=o[0]),c&262144&&(P.$$scope={dirty:c,ctx:o}),g.$set(P)},i(o){A||(M(r.$$.fragment,o),M(h),M(g.$$.fragment,o),M(H.$$.fragment,o),A=!0)},o(o){j(r.$$.fragment,o),j(h),j(g.$$.fragment,o),j(H.$$.fragment,o),A=!1},d(o){o&&(d(a),d(t),d(n),d(u),d(T),d(E),d(k),d(v),d(F)),f&&f.d(o),I.d(o),d(s),d(e),S&&S.d(o),d(i),D(r,o),h&&h.d(o),D(g,o),D(H,o)}}}const l={title:"District & area profiles"};function Ce(_,a,s){let e,i;U(_,ye,f=>s(7,e=f)),U(_,V,f=>s(13,i=f));let{data:t}=a,{data:r={},customFormattingSettings:n,__db:u,inputs:C}=t;W(V,i="660e7262ba8f5144b874e7af1208fb0f",i);let T=ue(_e(C));Z(T.subscribe(f=>C=f)),ee(ge,{getCustomFormats:()=>n.customFormats||[]});const E=(f,O)=>ke(u.query,f,{query_name:O});fe(E),e.params,te(()=>!0);let g={initialData:void 0,initialError:void 0},k=z`select
    d.area_code,
    d.area_name,
    count(h.area_code) as n_stadtteile,
    '/hamburg/area/district/' || d.area_code as district_link
from gentriduck_marts.dim_area_geometry as d
left join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = d.area_code
    -- #334: merged-pair Stadtteil codes have no geometry and no page; not counted.
    and h.area_code not like '%/%'
where d.city_code = 'HH' and d.area_level = 'district'
group by all
order by d.area_name`,v=`select
    d.area_code,
    d.area_name,
    count(h.area_code) as n_stadtteile,
    '/hamburg/area/district/' || d.area_code as district_link
from gentriduck_marts.dim_area_geometry as d
left join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = d.area_code
    -- #334: merged-pair Stadtteil codes have no geometry and no page; not counted.
    and h.area_code not like '%/%'
where d.city_code = 'HH' and d.area_level = 'district'
group by all
order by d.area_name`;r.districts_data&&(r.districts_data instanceof Error?g.initialError=r.districts_data:g.initialData=r.districts_data,r.districts_columns&&(g.knownColumns=r.districts_columns));let F,H=!1;const A=pe.createReactive({callback:f=>{s(0,F=f)},execFn:E},{id:"districts",...g});return A(v,{noResolve:k,...g}),globalThis[Symbol.for("districts")]={get value(){return F}},_.$$set=f=>{"data"in f&&s(1,t=f.data)},_.$$.update=()=>{_.$$.dirty&2&&s(2,{data:r={},customFormattingSettings:n,__db:u}=t,r),_.$$.dirty&4&&he.set(Object.keys(r).length>0),_.$$.dirty&128&&e.params,_.$$.dirty&120&&(k||!H?k||(A(v,{noResolve:k,...g}),s(6,H=!0)):A(v,{noResolve:k}))},s(4,k=z`select
    d.area_code,
    d.area_name,
    count(h.area_code) as n_stadtteile,
    '/hamburg/area/district/' || d.area_code as district_link
from gentriduck_marts.dim_area_geometry as d
left join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = d.area_code
    -- #334: merged-pair Stadtteil codes have no geometry and no page; not counted.
    and h.area_code not like '%/%'
where d.city_code = 'HH' and d.area_level = 'district'
group by all
order by d.area_name`),s(5,v=`select
    d.area_code,
    d.area_name,
    count(h.area_code) as n_stadtteile,
    '/hamburg/area/district/' || d.area_code as district_link
from gentriduck_marts.dim_area_geometry as d
left join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = d.area_code
    -- #334: merged-pair Stadtteil codes have no geometry and no page; not counted.
    and h.area_code not like '%/%'
where d.city_code = 'HH' and d.area_level = 'district'
group by all
order by d.area_name`),[F,t,r,g,k,v,H,e]}class Pe extends oe{constructor(a){super(),se(this,a,Ce,Me,X,{data:1})}}export{Pe as component};
