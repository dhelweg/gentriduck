import{s as X,d as n,i as u,a as j,b as p,c as h,h as Y,e as $,f as D,g as J,j as k,k as w,l as N,m as W,o as Z,n as ee,p as te,q as z,r as re,t as ae,u as oe}from"../chunks/scheduler.BopPEjhc.js";import{S as ie,i as se,d as A,t as C,a as T,c as le,m as H,b as S,e as q,g as ne}from"../chunks/index.CYkVJg6_.js";import{F as ce}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as me}from"../chunks/Hero.CRoRGI02.js";import{D as _e,C as L}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{w as ue}from"../chunks/entry.BMmpG6A7.js";import{e as fe,s as de,Q as pe,p as ge,a as U,r as G,C as be}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as V}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as he}from"../chunks/stores.Ceyp10jj.js";import{Q as ke}from"../chunks/QueryViewer.CNDqAaoE.js";import{p as ye}from"../chunks/profile.BW8tN6E9.js";function $e(f){let a,l=c.title+"",t;return{c(){a=w("h1"),t=oe(l),this.h()},l(o){a=$(o,"H1",{class:!0});var s=re(a);t=ae(s,l),s.forEach(n),this.h()},h(){p(a,"class","title")},m(o,s){u(o,a,s),j(a,t)},p:z,d(o){o&&n(a)}}}function we(f){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:z,p:z,d:z}}function ve(f){let a,l,t,o,s;return document.title=a=c.title,{c(){l=k(),t=w("meta"),o=k(),s=w("meta"),this.h()},l(r){l=h(r),t=$(r,"META",{property:!0,content:!0}),o=h(r),s=$(r,"META",{name:!0,content:!0}),this.h()},h(){var r,e;p(t,"property","og:title"),p(t,"content",((r=c.og)==null?void 0:r.title)??c.title),p(s,"name","twitter:title"),p(s,"content",((e=c.og)==null?void 0:e.title)??c.title)},m(r,e){u(r,l,e),u(r,t,e),u(r,o,e),u(r,s,e)},p(r,e){e&0&&a!==(a=c.title)&&(document.title=a)},d(r){r&&(n(l),n(t),n(o),n(s))}}}function Ee(f){var s,r;let a,l,t=(c.description||((s=c.og)==null?void 0:s.description))&&Te(),o=((r=c.og)==null?void 0:r.image)&&xe();return{c(){t&&t.c(),a=k(),o&&o.c(),l=D()},l(e){t&&t.l(e),a=h(e),o&&o.l(e),l=D()},m(e,_){t&&t.m(e,_),u(e,a,_),o&&o.m(e,_),u(e,l,_)},p(e,_){var F,x;(c.description||(F=c.og)!=null&&F.description)&&t.p(e,_),(x=c.og)!=null&&x.image&&o.p(e,_)},d(e){e&&(n(a),n(l)),t&&t.d(e),o&&o.d(e)}}}function Te(f){let a,l,t,o,s;return{c(){a=w("meta"),l=k(),t=w("meta"),o=k(),s=w("meta"),this.h()},l(r){a=$(r,"META",{name:!0,content:!0}),l=h(r),t=$(r,"META",{property:!0,content:!0}),o=h(r),s=$(r,"META",{name:!0,content:!0}),this.h()},h(){var r,e,_;p(a,"name","description"),p(a,"content",c.description??((r=c.og)==null?void 0:r.description)),p(t,"property","og:description"),p(t,"content",((e=c.og)==null?void 0:e.description)??c.description),p(s,"name","twitter:description"),p(s,"content",((_=c.og)==null?void 0:_.description)??c.description)},m(r,e){u(r,a,e),u(r,l,e),u(r,t,e),u(r,o,e),u(r,s,e)},p:z,d(r){r&&(n(a),n(l),n(t),n(o),n(s))}}}function xe(f){let a,l,t;return{c(){a=w("meta"),l=k(),t=w("meta"),this.h()},l(o){a=$(o,"META",{property:!0,content:!0}),l=h(o),t=$(o,"META",{name:!0,content:!0}),this.h()},h(){var o,s;p(a,"property","og:image"),p(a,"content",U((o=c.og)==null?void 0:o.image)),p(t,"name","twitter:image"),p(t,"content",U((s=c.og)==null?void 0:s.image))},m(o,s){u(o,a,s),u(o,l,s),u(o,t,s)},p:z,d(o){o&&(n(a),n(l),n(t))}}}function K(f){let a,l;return a=new ke({props:{queryID:"ortsteile",queryResult:f[0]}}),{c(){q(a.$$.fragment)},l(t){S(a.$$.fragment,t)},m(t,o){H(a,t,o),l=!0},p(t,o){const s={};o&1&&(s.queryResult=t[0]),a.$set(s)},i(t){l||(T(a.$$.fragment,t),l=!0)},o(t){C(a.$$.fragment,t),l=!1},d(t){A(a,t)}}}function Re(f){let a,l,t,o,s,r;return a=new L({props:{id:"ortsteil_name",title:"Ortsteil"}}),t=new L({props:{id:"bezirk_code",title:"District code"}}),s=new L({props:{id:"n_plr",title:"Constituent PLRs (dominant assignment)"}}),{c(){q(a.$$.fragment),l=k(),q(t.$$.fragment),o=k(),q(s.$$.fragment)},l(e){S(a.$$.fragment,e),l=h(e),S(t.$$.fragment,e),o=h(e),S(s.$$.fragment,e)},m(e,_){H(a,e,_),u(e,l,_),H(t,e,_),u(e,o,_),H(s,e,_),r=!0},p:z,i(e){r||(T(a.$$.fragment,e),T(t.$$.fragment,e),T(s.$$.fragment,e),r=!0)},o(e){C(a.$$.fragment,e),C(t.$$.fragment,e),C(s.$$.fragment,e),r=!1},d(e){e&&(n(l),n(o)),A(a,e),A(t,e),A(s,e)}}}function Me(f){let a,l,t,o,s,r,e,_,F=`Each Ortsteil page shows population and composition sums (never a re-scored index — see the
<a href="/gentriduck/methodology" class="markdown">methodology page</a>) and how many of its dominantly-assigned constituent neighbourhoods
(Planungsräume) currently sit in each gentrification stage. Two Ortsteile — small enclaves that are
never the largest-share (dominant) assignment for any Planungsraum — show 0 constituent PLRs below
and render an explicit empty state on their own page rather than a misleading zero; see the
<a href="/gentriduck/berlin/area" class="markdown">district &amp; area profiles hub</a> for the Bezirk/Prognoseraum/Bezirksregion ladder, or the
<a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a> for individual Planungsräume.`,x,R,b,y,v,O,E,P,d=typeof c<"u"&&c.title&&c.hide_title!==!0&&$e();function I(i,m){return typeof c<"u"&&c.title?ve:we}let B=I()(f),M=typeof c=="object"&&Ee();r=new me({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Ortsteile (Stadtteile)",lede:"Berlin's 97 Ortsteile — a non-LOR, legally-defined district subdivision distinct from the Planungsraum/Bezirksregion/Prognoseraum ladder used elsewhere on this site."}});let g=f[0]&&K(f);return b=new _e({props:{data:f[0],rows:"97",search:"true",link:"ortsteil_link",$$slots:{default:[Re]},$$scope:{ctx:f}}}),E=new ce({}),{c(){d&&d.c(),a=k(),B.c(),l=w("meta"),t=w("meta"),M&&M.c(),o=D(),s=k(),q(r.$$.fragment),e=k(),_=w("p"),_.innerHTML=F,x=k(),g&&g.c(),R=k(),q(b.$$.fragment),y=k(),v=w("hr"),O=k(),q(E.$$.fragment),this.h()},l(i){d&&d.l(i),a=h(i);const m=Y("svelte-2igo1p",document.head);B.l(m),l=$(m,"META",{name:!0,content:!0}),t=$(m,"META",{name:!0,content:!0}),M&&M.l(m),o=D(),m.forEach(n),s=h(i),S(r.$$.fragment,i),e=h(i),_=$(i,"P",{class:!0,"data-svelte-h":!0}),J(_)!=="svelte-duwztr"&&(_.innerHTML=F),x=h(i),g&&g.l(i),R=h(i),S(b.$$.fragment,i),y=h(i),v=$(i,"HR",{class:!0}),O=h(i),S(E.$$.fragment,i),this.h()},h(){p(l,"name","twitter:card"),p(l,"content","summary_large_image"),p(t,"name","twitter:site"),p(t,"content","@evidence_dev"),p(_,"class","markdown"),p(v,"class","markdown")},m(i,m){d&&d.m(i,m),u(i,a,m),B.m(document.head,null),j(document.head,l),j(document.head,t),M&&M.m(document.head,null),j(document.head,o),u(i,s,m),H(r,i,m),u(i,e,m),u(i,_,m),u(i,x,m),g&&g.m(i,m),u(i,R,m),H(b,i,m),u(i,y,m),u(i,v,m),u(i,O,m),H(E,i,m),P=!0},p(i,[m]){typeof c<"u"&&c.title&&c.hide_title!==!0&&d.p(i,m),B.p(i,m),typeof c=="object"&&M.p(i,m),i[0]?g?(g.p(i,m),m&1&&T(g,1)):(g=K(i),g.c(),T(g,1),g.m(R.parentNode,R)):g&&(ne(),C(g,1,1,()=>{g=null}),le());const Q={};m&1&&(Q.data=i[0]),m&262144&&(Q.$$scope={dirty:m,ctx:i}),b.$set(Q)},i(i){P||(T(r.$$.fragment,i),T(g),T(b.$$.fragment,i),T(E.$$.fragment,i),P=!0)},o(i){C(r.$$.fragment,i),C(g),C(b.$$.fragment,i),C(E.$$.fragment,i),P=!1},d(i){i&&(n(a),n(s),n(e),n(_),n(x),n(R),n(y),n(v),n(O)),d&&d.d(i),B.d(i),n(l),n(t),M&&M.d(i),n(o),A(r,i),g&&g.d(i),A(b,i),A(E,i)}}}const c={title:"Ortsteile (Stadtteile)"};function Ce(f,a,l){let t,o;N(f,he,d=>l(7,t=d)),N(f,G,d=>l(13,o=d));let{data:s}=a,{data:r={},customFormattingSettings:e,__db:_,inputs:F}=s;W(G,o="e2bb9752c7b955b8906c82f88537f137",o);let x=fe(ue(F));Z(x.subscribe(d=>F=d)),ee(be,{getCustomFormats:()=>e.customFormats||[]});const R=(d,I)=>ye(_.query,d,{query_name:I});de(R),t.params,te(()=>!0);let b={initialData:void 0,initialError:void 0},y=V`select
    o.area_code as ortsteil_code,
    o.area_name as ortsteil_name,
    substr(o.area_code, 1, 2) as bezirk_code,
    coalesce(x.n_plr, 0) as n_plr,
    '/berlin/area/ortsteil/' || o.area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry as o
left join
    (
        select ortsteil_area_code, count(*) as n_plr
        from gentriduck_marts.mart_ortsteil_plr_crosswalk
        where is_dominant_ortsteil
        group by ortsteil_area_code
    ) as x
    on x.ortsteil_area_code = o.area_code
where o.city_code = 'BER' and o.area_level = 'ortsteil'
order by o.area_name`,v=`select
    o.area_code as ortsteil_code,
    o.area_name as ortsteil_name,
    substr(o.area_code, 1, 2) as bezirk_code,
    coalesce(x.n_plr, 0) as n_plr,
    '/berlin/area/ortsteil/' || o.area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry as o
left join
    (
        select ortsteil_area_code, count(*) as n_plr
        from gentriduck_marts.mart_ortsteil_plr_crosswalk
        where is_dominant_ortsteil
        group by ortsteil_area_code
    ) as x
    on x.ortsteil_area_code = o.area_code
where o.city_code = 'BER' and o.area_level = 'ortsteil'
order by o.area_name`;r.ortsteile_data&&(r.ortsteile_data instanceof Error?b.initialError=r.ortsteile_data:b.initialData=r.ortsteile_data,r.ortsteile_columns&&(b.knownColumns=r.ortsteile_columns));let O,E=!1;const P=pe.createReactive({callback:d=>{l(0,O=d)},execFn:R},{id:"ortsteile",...b});return P(v,{noResolve:y,...b}),globalThis[Symbol.for("ortsteile")]={get value(){return O}},f.$$set=d=>{"data"in d&&l(1,s=d.data)},f.$$.update=()=>{f.$$.dirty&2&&l(2,{data:r={},customFormattingSettings:e,__db:_}=s,r),f.$$.dirty&4&&ge.set(Object.keys(r).length>0),f.$$.dirty&128&&t.params,f.$$.dirty&120&&(y||!E?y||(P(v,{noResolve:y,...b}),l(6,E=!0)):P(v,{noResolve:y}))},l(4,y=V`select
    o.area_code as ortsteil_code,
    o.area_name as ortsteil_name,
    substr(o.area_code, 1, 2) as bezirk_code,
    coalesce(x.n_plr, 0) as n_plr,
    '/berlin/area/ortsteil/' || o.area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry as o
left join
    (
        select ortsteil_area_code, count(*) as n_plr
        from gentriduck_marts.mart_ortsteil_plr_crosswalk
        where is_dominant_ortsteil
        group by ortsteil_area_code
    ) as x
    on x.ortsteil_area_code = o.area_code
where o.city_code = 'BER' and o.area_level = 'ortsteil'
order by o.area_name`),l(5,v=`select
    o.area_code as ortsteil_code,
    o.area_name as ortsteil_name,
    substr(o.area_code, 1, 2) as bezirk_code,
    coalesce(x.n_plr, 0) as n_plr,
    '/berlin/area/ortsteil/' || o.area_code as ortsteil_link
from gentriduck_marts.dim_area_geometry as o
left join
    (
        select ortsteil_area_code, count(*) as n_plr
        from gentriduck_marts.mart_ortsteil_plr_crosswalk
        where is_dominant_ortsteil
        group by ortsteil_area_code
    ) as x
    on x.ortsteil_area_code = o.area_code
where o.city_code = 'BER' and o.area_level = 'ortsteil'
order by o.area_name`),[O,s,r,b,y,v,E,t]}class Qe extends ie{constructor(a){super(),se(this,a,Ce,Me,X,{data:1})}}export{Qe as component};
