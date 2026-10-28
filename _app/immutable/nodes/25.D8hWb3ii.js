import{s as X,d as l,i as m,a as N,b as p,c as h,h as Y,e as v,f as Q,k as z,l as b,m as $,n as U,o as J,p as Z,q as ee,r as te,u as A,g as ae,j as re,t as ie}from"../chunks/scheduler.CmMeO4ay.js";import{S as se,i as oe,d as x,t as F,a as S,c as ne,m as R,b as D,e as G,g as le}from"../chunks/index.bfDa0Uqw.js";import{F as de}from"../chunks/FooterNav.BbND9dxm.js";import{H as ce}from"../chunks/Hero.wYia6TQ0.js";import{D as _e,C as P}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{w as me}from"../chunks/entry.vKQYRLhF.js";import{e as ue,s as fe,Q as pe,p as ge,a as L,r as V,C as ye}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as B}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as he}from"../chunks/stores.CGa44sBH.js";import{Q as be}from"../chunks/QueryViewer.C-CXDbdP.js";import{p as ke}from"../chunks/profile.BW8tN6E9.js";function ve(u){let r,n=d.title+"",t;return{c(){r=$("h1"),t=ie(n),this.h()},l(i){r=v(i,"H1",{class:!0});var o=ae(r);t=re(o,n),o.forEach(l),this.h()},h(){p(r,"class","title")},m(i,o){m(i,r,o),N(r,t)},p:A,d(i){i&&l(r)}}}function $e(u){return{c(){this.h()},l(r){this.h()},h(){document.title="Evidence"},m:A,p:A,d:A}}function He(u){let r,n,t,i,o;return document.title=r=d.title,{c(){n=b(),t=$("meta"),i=b(),o=$("meta"),this.h()},l(a){n=h(a),t=v(a,"META",{property:!0,content:!0}),i=h(a),o=v(a,"META",{name:!0,content:!0}),this.h()},h(){var a,e;p(t,"property","og:title"),p(t,"content",((a=d.og)==null?void 0:a.title)??d.title),p(o,"name","twitter:title"),p(o,"content",((e=d.og)==null?void 0:e.title)??d.title)},m(a,e){m(a,n,e),m(a,t,e),m(a,i,e),m(a,o,e)},p(a,e){e&0&&r!==(r=d.title)&&(document.title=r)},d(a){a&&(l(n),l(t),l(i),l(o))}}}function we(u){var o,a;let r,n,t=(d.description||((o=d.og)==null?void 0:o.description))&&Se(),i=((a=d.og)==null?void 0:a.image)&&Te();return{c(){t&&t.c(),r=b(),i&&i.c(),n=Q()},l(e){t&&t.l(e),r=h(e),i&&i.l(e),n=Q()},m(e,_){t&&t.m(e,_),m(e,r,_),i&&i.m(e,_),m(e,n,_)},p(e,_){var M,T;(d.description||(M=d.og)!=null&&M.description)&&t.p(e,_),(T=d.og)!=null&&T.image&&i.p(e,_)},d(e){e&&(l(r),l(n)),t&&t.d(e),i&&i.d(e)}}}function Se(u){let r,n,t,i,o;return{c(){r=$("meta"),n=b(),t=$("meta"),i=b(),o=$("meta"),this.h()},l(a){r=v(a,"META",{name:!0,content:!0}),n=h(a),t=v(a,"META",{property:!0,content:!0}),i=h(a),o=v(a,"META",{name:!0,content:!0}),this.h()},h(){var a,e,_;p(r,"name","description"),p(r,"content",d.description??((a=d.og)==null?void 0:a.description)),p(t,"property","og:description"),p(t,"content",((e=d.og)==null?void 0:e.description)??d.description),p(o,"name","twitter:description"),p(o,"content",((_=d.og)==null?void 0:_.description)??d.description)},m(a,e){m(a,r,e),m(a,n,e),m(a,t,e),m(a,i,e),m(a,o,e)},p:A,d(a){a&&(l(r),l(n),l(t),l(i),l(o))}}}function Te(u){let r,n,t;return{c(){r=$("meta"),n=b(),t=$("meta"),this.h()},l(i){r=v(i,"META",{property:!0,content:!0}),n=h(i),t=v(i,"META",{name:!0,content:!0}),this.h()},h(){var i,o;p(r,"property","og:image"),p(r,"content",L((i=d.og)==null?void 0:i.image)),p(t,"name","twitter:image"),p(t,"content",L((o=d.og)==null?void 0:o.image))},m(i,o){m(i,r,o),m(i,n,o),m(i,t,o)},p:A,d(i){i&&(l(r),l(n),l(t))}}}function K(u){let r,n;return r=new be({props:{queryID:"stadtteile",queryResult:u[0]}}),{c(){G(r.$$.fragment)},l(t){D(r.$$.fragment,t)},m(t,i){R(r,t,i),n=!0},p(t,i){const o={};i&1&&(o.queryResult=t[0]),r.$set(o)},i(t){n||(S(r.$$.fragment,t),n=!0)},o(t){F(r.$$.fragment,t),n=!1},d(t){x(r,t)}}}function je(u){let r,n,t,i,o,a;return r=new P({props:{id:"area_name",title:"Stadtteil"}}),t=new P({props:{id:"district",title:"District"}}),o=new P({props:{id:"n_gebiete",title:"Statistische Gebiete"}}),{c(){G(r.$$.fragment),n=b(),G(t.$$.fragment),i=b(),G(o.$$.fragment)},l(e){D(r.$$.fragment,e),n=h(e),D(t.$$.fragment,e),i=h(e),D(o.$$.fragment,e)},m(e,_){R(r,e,_),m(e,n,_),R(t,e,_),m(e,i,_),R(o,e,_),a=!0},p:A,i(e){a||(S(r.$$.fragment,e),S(t.$$.fragment,e),S(o.$$.fragment,e),a=!0)},o(e){F(r.$$.fragment,e),F(t.$$.fragment,e),F(o.$$.fragment,e),a=!1},d(e){e&&(l(n),l(i)),x(r,e),x(t,e),x(o,e)}}}function Ee(u){let r,n,t,i,o,a,e,_,M=`Each Stadtteil page shows how many of its statistische Gebiete currently sit in each
gentrification stage and trajectory type, plus mapped-place counts and everyday amenities — never
a re-scored index (see the <a href="/gentriduck/methodology" class="markdown">methodology page</a>). See the
<a href="/gentriduck/hamburg/area/district" class="markdown">district &amp; area profiles hub</a> for the 7 districts, or the
<a href="/gentriduck/hamburg/area" class="markdown">full Gebiet list</a> for individual statistische Gebiete.`,T,j,y,k,H,q,w,C,f=typeof d<"u"&&d.title&&d.hide_title!==!0&&ve();function O(s,c){return typeof d<"u"&&d.title?He:$e}let I=O()(u),E=typeof d=="object"&&we();a=new ce({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Stadtteile",lede:"Hamburg's 104 Stadtteile — the named, official scale between district and statistisches Gebiet."}});let g=u[0]&&K(u);return y=new _e({props:{data:u[0],rows:"20",search:"true",link:"stadtteil_link",emptySet:"warn",emptyMessage:"No Hamburg Stadtteil geometry available.",$$slots:{default:[je]},$$scope:{ctx:u}}}),w=new de({}),{c(){f&&f.c(),r=b(),I.c(),n=$("meta"),t=$("meta"),E&&E.c(),i=Q(),o=b(),G(a.$$.fragment),e=b(),_=$("p"),_.innerHTML=M,T=b(),g&&g.c(),j=b(),G(y.$$.fragment),k=b(),H=$("hr"),q=b(),G(w.$$.fragment),this.h()},l(s){f&&f.l(s),r=h(s);const c=Y("svelte-2igo1p",document.head);I.l(c),n=v(c,"META",{name:!0,content:!0}),t=v(c,"META",{name:!0,content:!0}),E&&E.l(c),i=Q(),c.forEach(l),o=h(s),D(a.$$.fragment,s),e=h(s),_=v(s,"P",{class:!0,"data-svelte-h":!0}),z(_)!=="svelte-8a7vpm"&&(_.innerHTML=M),T=h(s),g&&g.l(s),j=h(s),D(y.$$.fragment,s),k=h(s),H=v(s,"HR",{class:!0}),q=h(s),D(w.$$.fragment,s),this.h()},h(){p(n,"name","twitter:card"),p(n,"content","summary_large_image"),p(t,"name","twitter:site"),p(t,"content","@evidence_dev"),p(_,"class","markdown"),p(H,"class","markdown")},m(s,c){f&&f.m(s,c),m(s,r,c),I.m(document.head,null),N(document.head,n),N(document.head,t),E&&E.m(document.head,null),N(document.head,i),m(s,o,c),R(a,s,c),m(s,e,c),m(s,_,c),m(s,T,c),g&&g.m(s,c),m(s,j,c),R(y,s,c),m(s,k,c),m(s,H,c),m(s,q,c),R(w,s,c),C=!0},p(s,[c]){typeof d<"u"&&d.title&&d.hide_title!==!0&&f.p(s,c),I.p(s,c),typeof d=="object"&&E.p(s,c),s[0]?g?(g.p(s,c),c&1&&S(g,1)):(g=K(s),g.c(),S(g,1),g.m(j.parentNode,j)):g&&(le(),F(g,1,1,()=>{g=null}),ne());const W={};c&1&&(W.data=s[0]),c&262144&&(W.$$scope={dirty:c,ctx:s}),y.$set(W)},i(s){C||(S(a.$$.fragment,s),S(g),S(y.$$.fragment,s),S(w.$$.fragment,s),C=!0)},o(s){F(a.$$.fragment,s),F(g),F(y.$$.fragment,s),F(w.$$.fragment,s),C=!1},d(s){s&&(l(r),l(o),l(e),l(_),l(T),l(j),l(k),l(H),l(q)),f&&f.d(s),I.d(s),l(n),l(t),E&&E.d(s),l(i),x(a,s),g&&g.d(s),x(y,s),x(w,s)}}}const d={title:"Stadtteile"};function Fe(u,r,n){let t,i;U(u,he,f=>n(7,t=f)),U(u,V,f=>n(13,i=f));let{data:o}=r,{data:a={},customFormattingSettings:e,__db:_,inputs:M}=o;J(V,i="d75b3149f79219c2598beabe6b55f705",i);let T=ue(me(M));Z(T.subscribe(f=>M=f)),ee(ye,{getCustomFormats:()=>e.customFormats||[]});const j=(f,O)=>ke(_.query,f,{query_name:O});fe(j),t.params,te(()=>!0);let y={initialData:void 0,initialError:void 0},k=B`select
    s.area_code,
    s.area_name,
    d.area_name as district,
    count(c.area_code) as n_gebiete,
    '/hamburg/area/subarea_l1/' || s.area_code as stadtteil_link
from gentriduck_marts.dim_area_geometry as s
left join
    gentriduck_marts.mart_area_hierarchy as p
    on p.city_code = 'HH' and p.area_level = 'subarea_l1' and p.area_code = s.area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = p.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as c
    on c.city_code = 'HH' and c.area_level = 'subarea_l2' and c.parent_area_code = s.area_code
where s.city_code = 'HH' and s.area_level = 'subarea_l1'
    -- #334: defensive guard, currently a no-op -- verified none of the 4 disclosure-control
    -- merged-pair Stadtteile (slash-joined area_code, e.g. "02117/118") have a dim_area_geometry
    -- row (no WFS geometry for a merged pair), so this table never lists one today. See
    -- district/[code].md's \`children\` query for why a slash-bearing code must never be linked.
    and s.area_code not like '%/%'
group by all
order by s.area_name`,H=`select
    s.area_code,
    s.area_name,
    d.area_name as district,
    count(c.area_code) as n_gebiete,
    '/hamburg/area/subarea_l1/' || s.area_code as stadtteil_link
from gentriduck_marts.dim_area_geometry as s
left join
    gentriduck_marts.mart_area_hierarchy as p
    on p.city_code = 'HH' and p.area_level = 'subarea_l1' and p.area_code = s.area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = p.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as c
    on c.city_code = 'HH' and c.area_level = 'subarea_l2' and c.parent_area_code = s.area_code
where s.city_code = 'HH' and s.area_level = 'subarea_l1'
    -- #334: defensive guard, currently a no-op -- verified none of the 4 disclosure-control
    -- merged-pair Stadtteile (slash-joined area_code, e.g. "02117/118") have a dim_area_geometry
    -- row (no WFS geometry for a merged pair), so this table never lists one today. See
    -- district/[code].md's \`children\` query for why a slash-bearing code must never be linked.
    and s.area_code not like '%/%'
group by all
order by s.area_name`;a.stadtteile_data&&(a.stadtteile_data instanceof Error?y.initialError=a.stadtteile_data:y.initialData=a.stadtteile_data,a.stadtteile_columns&&(y.knownColumns=a.stadtteile_columns));let q,w=!1;const C=pe.createReactive({callback:f=>{n(0,q=f)},execFn:j},{id:"stadtteile",...y});return C(H,{noResolve:k,...y}),globalThis[Symbol.for("stadtteile")]={get value(){return q}},u.$$set=f=>{"data"in f&&n(1,o=f.data)},u.$$.update=()=>{u.$$.dirty&2&&n(2,{data:a={},customFormattingSettings:e,__db:_}=o,a),u.$$.dirty&4&&ge.set(Object.keys(a).length>0),u.$$.dirty&128&&t.params,u.$$.dirty&120&&(k||!w?k||(C(H,{noResolve:k,...y}),n(6,w=!0)):C(H,{noResolve:k}))},n(4,k=B`select
    s.area_code,
    s.area_name,
    d.area_name as district,
    count(c.area_code) as n_gebiete,
    '/hamburg/area/subarea_l1/' || s.area_code as stadtteil_link
from gentriduck_marts.dim_area_geometry as s
left join
    gentriduck_marts.mart_area_hierarchy as p
    on p.city_code = 'HH' and p.area_level = 'subarea_l1' and p.area_code = s.area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = p.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as c
    on c.city_code = 'HH' and c.area_level = 'subarea_l2' and c.parent_area_code = s.area_code
where s.city_code = 'HH' and s.area_level = 'subarea_l1'
    -- #334: defensive guard, currently a no-op -- verified none of the 4 disclosure-control
    -- merged-pair Stadtteile (slash-joined area_code, e.g. "02117/118") have a dim_area_geometry
    -- row (no WFS geometry for a merged pair), so this table never lists one today. See
    -- district/[code].md's \`children\` query for why a slash-bearing code must never be linked.
    and s.area_code not like '%/%'
group by all
order by s.area_name`),n(5,H=`select
    s.area_code,
    s.area_name,
    d.area_name as district,
    count(c.area_code) as n_gebiete,
    '/hamburg/area/subarea_l1/' || s.area_code as stadtteil_link
from gentriduck_marts.dim_area_geometry as s
left join
    gentriduck_marts.mart_area_hierarchy as p
    on p.city_code = 'HH' and p.area_level = 'subarea_l1' and p.area_code = s.area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = p.parent_area_code
left join
    gentriduck_marts.mart_area_hierarchy as c
    on c.city_code = 'HH' and c.area_level = 'subarea_l2' and c.parent_area_code = s.area_code
where s.city_code = 'HH' and s.area_level = 'subarea_l1'
    -- #334: defensive guard, currently a no-op -- verified none of the 4 disclosure-control
    -- merged-pair Stadtteile (slash-joined area_code, e.g. "02117/118") have a dim_area_geometry
    -- row (no WFS geometry for a merged pair), so this table never lists one today. See
    -- district/[code].md's \`children\` query for why a slash-bearing code must never be linked.
    and s.area_code not like '%/%'
group by all
order by s.area_name`),[q,o,a,y,k,H,w,t]}class We extends se{constructor(r){super(),oe(this,r,Fe,Ee,X,{data:1})}}export{We as component};
