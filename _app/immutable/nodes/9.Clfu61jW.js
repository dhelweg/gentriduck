import{s as G,d as u,i as m,a as x,b as _,c as h,h as V,e as y,f as L,g as X,j as g,k as w,l as Q,m as Y,o as J,n as ee,p as te,q as A,r as ie,t as re,u as le}from"../chunks/scheduler.BopPEjhc.js";import{S as ne,i as ae,d as q,t as R,a as E,c as oe,m as D,b as K,e as N,g as se}from"../chunks/index.CYkVJg6_.js";import{F as ce}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as ue}from"../chunks/Hero.CRoRGI02.js";import{D as me,C as B}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{w as fe}from"../chunks/entry.BMmpG6A7.js";import{e as de,s as pe,Q as _e,p as be,a as j,r as W,C as ke}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as Z}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as he}from"../chunks/stores.Ceyp10jj.js";import{Q as ge}from"../chunks/QueryViewer.CNDqAaoE.js";import{p as ze}from"../chunks/profile.BW8tN6E9.js";function ye(f){let i,a=s.title+"",e;return{c(){i=w("h1"),e=le(a),this.h()},l(l){i=y(l,"H1",{class:!0});var t=ie(i);e=re(t,a),t.forEach(u),this.h()},h(){_(i,"class","title")},m(l,t){m(l,i,t),x(i,e)},p:A,d(l){l&&u(i)}}}function we(f){return{c(){this.h()},l(i){this.h()},h(){document.title="Evidence"},m:A,p:A,d:A}}function $e(f){let i,a,e,l,t;return document.title=i=s.title,{c(){a=g(),e=w("meta"),l=g(),t=w("meta"),this.h()},l(r){a=h(r),e=y(r,"META",{property:!0,content:!0}),l=h(r),t=y(r,"META",{name:!0,content:!0}),this.h()},h(){var r,o;_(e,"property","og:title"),_(e,"content",((r=s.og)==null?void 0:r.title)??s.title),_(t,"name","twitter:title"),_(t,"content",((o=s.og)==null?void 0:o.title)??s.title)},m(r,o){m(r,a,o),m(r,e,o),m(r,l,o),m(r,t,o)},p(r,o){o&0&&i!==(i=s.title)&&(document.title=i)},d(r){r&&(u(a),u(e),u(l),u(t))}}}function Te(f){var t,r;let i,a,e=(s.description||((t=s.og)==null?void 0:t.description))&&ve(),l=((r=s.og)==null?void 0:r.image)&&Me();return{c(){e&&e.c(),i=g(),l&&l.c(),a=L()},l(o){e&&e.l(o),i=h(o),l&&l.l(o),a=L()},m(o,d){e&&e.m(o,d),m(o,i,d),l&&l.m(o,d),m(o,a,d)},p(o,d){var C,v;(s.description||(C=s.og)!=null&&C.description)&&e.p(o,d),(v=s.og)!=null&&v.image&&l.p(o,d)},d(o){o&&(u(i),u(a)),e&&e.d(o),l&&l.d(o)}}}function ve(f){let i,a,e,l,t;return{c(){i=w("meta"),a=g(),e=w("meta"),l=g(),t=w("meta"),this.h()},l(r){i=y(r,"META",{name:!0,content:!0}),a=h(r),e=y(r,"META",{property:!0,content:!0}),l=h(r),t=y(r,"META",{name:!0,content:!0}),this.h()},h(){var r,o,d;_(i,"name","description"),_(i,"content",s.description??((r=s.og)==null?void 0:r.description)),_(e,"property","og:description"),_(e,"content",((o=s.og)==null?void 0:o.description)??s.description),_(t,"name","twitter:description"),_(t,"content",((d=s.og)==null?void 0:d.description)??s.description)},m(r,o){m(r,i,o),m(r,a,o),m(r,e,o),m(r,l,o),m(r,t,o)},p:A,d(r){r&&(u(i),u(a),u(e),u(l),u(t))}}}function Me(f){let i,a,e;return{c(){i=w("meta"),a=g(),e=w("meta"),this.h()},l(l){i=y(l,"META",{property:!0,content:!0}),a=h(l),e=y(l,"META",{name:!0,content:!0}),this.h()},h(){var l,t;_(i,"property","og:image"),_(i,"content",j((l=s.og)==null?void 0:l.image)),_(e,"name","twitter:image"),_(e,"content",j((t=s.og)==null?void 0:t.image))},m(l,t){m(l,i,t),m(l,a,t),m(l,e,t)},p:A,d(l){l&&(u(i),u(a),u(e))}}}function U(f){let i,a;return i=new ge({props:{queryID:"bezirke",queryResult:f[0]}}),{c(){N(i.$$.fragment)},l(e){K(i.$$.fragment,e)},m(e,l){D(i,e,l),a=!0},p(e,l){const t={};l&1&&(t.queryResult=e[0]),i.$set(t)},i(e){a||(E(i.$$.fragment,e),a=!0)},o(e){R(i.$$.fragment,e),a=!1},d(e){q(i,e)}}}function Se(f){let i,a,e,l;return i=new B({props:{id:"bezirk_code",title:"Code"}}),e=new B({props:{id:"bezirk_name",title:"District"}}),{c(){N(i.$$.fragment),a=g(),N(e.$$.fragment)},l(t){K(i.$$.fragment,t),a=h(t),K(e.$$.fragment,t)},m(t,r){D(i,t,r),m(t,a,r),D(e,t,r),l=!0},p:A,i(t){l||(E(i.$$.fragment,t),E(e.$$.fragment,t),l=!0)},o(t){R(i.$$.fragment,t),R(e.$$.fragment,t),l=!1},d(t){t&&u(a),q(i,t),q(e,t)}}}function Ee(f){let i,a,e,l,t,r,o,d,C=`Each level shows population and composition sums (never a re-scored index — see the
<a href="/gentriduck/methodology" class="markdown">methodology page</a> for why coarse-grain areas are not re-scored) and how many of
their constituent neighbourhoods currently sit in each gentrification stage. For a single
neighbourhood&#39;s full profile, use the <a href="/gentriduck/berlin/area-detail" class="markdown">district browse</a> or
<a href="/gentriduck/berlin/area" class="markdown">full neighbourhood list</a> instead. Berlin&#39;s 97 <strong class="markdown">Ortsteile</strong> (Stadtteile) — a
different, non-LOR district geography — have their own <a href="/gentriduck/berlin/area/ortsteil" class="markdown">Ortsteil list</a>.`,v,M,k,z,$,F,T,H,p=typeof s<"u"&&s.title&&s.hide_title!==!0&&ye();function O(n,c){return typeof s<"u"&&s.title?$e:we}let P=O()(f),S=typeof s=="object"&&Te();r=new ue({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"District & area profiles",lede:"Berlin's Bezirke (districts), Prognoseräume, and Bezirksregionen — coarser-grain profiles above the neighbourhood (Planungsraum) level, for readers who want the district or sub-district picture at a glance."}});let b=f[0]&&U(f);return k=new me({props:{data:f[0],rows:"12",link:"bezirk_link",$$slots:{default:[Se]},$$scope:{ctx:f}}}),T=new ce({}),{c(){p&&p.c(),i=g(),P.c(),a=w("meta"),e=w("meta"),S&&S.c(),l=L(),t=g(),N(r.$$.fragment),o=g(),d=w("p"),d.innerHTML=C,v=g(),b&&b.c(),M=g(),N(k.$$.fragment),z=g(),$=w("hr"),F=g(),N(T.$$.fragment),this.h()},l(n){p&&p.l(n),i=h(n);const c=V("svelte-2igo1p",document.head);P.l(c),a=y(c,"META",{name:!0,content:!0}),e=y(c,"META",{name:!0,content:!0}),S&&S.l(c),l=L(),c.forEach(u),t=h(n),K(r.$$.fragment,n),o=h(n),d=y(n,"P",{class:!0,"data-svelte-h":!0}),X(d)!=="svelte-8byrsi"&&(d.innerHTML=C),v=h(n),b&&b.l(n),M=h(n),K(k.$$.fragment,n),z=h(n),$=y(n,"HR",{class:!0}),F=h(n),K(T.$$.fragment,n),this.h()},h(){_(a,"name","twitter:card"),_(a,"content","summary_large_image"),_(e,"name","twitter:site"),_(e,"content","@evidence_dev"),_(d,"class","markdown"),_($,"class","markdown")},m(n,c){p&&p.m(n,c),m(n,i,c),P.m(document.head,null),x(document.head,a),x(document.head,e),S&&S.m(document.head,null),x(document.head,l),m(n,t,c),D(r,n,c),m(n,o,c),m(n,d,c),m(n,v,c),b&&b.m(n,c),m(n,M,c),D(k,n,c),m(n,z,c),m(n,$,c),m(n,F,c),D(T,n,c),H=!0},p(n,[c]){typeof s<"u"&&s.title&&s.hide_title!==!0&&p.p(n,c),P.p(n,c),typeof s=="object"&&S.p(n,c),n[0]?b?(b.p(n,c),c&1&&E(b,1)):(b=U(n),b.c(),E(b,1),b.m(M.parentNode,M)):b&&(se(),R(b,1,1,()=>{b=null}),oe());const I={};c&1&&(I.data=n[0]),c&262144&&(I.$$scope={dirty:c,ctx:n}),k.$set(I)},i(n){H||(E(r.$$.fragment,n),E(b),E(k.$$.fragment,n),E(T.$$.fragment,n),H=!0)},o(n){R(r.$$.fragment,n),R(b),R(k.$$.fragment,n),R(T.$$.fragment,n),H=!1},d(n){n&&(u(i),u(t),u(o),u(d),u(v),u(M),u(z),u($),u(F)),p&&p.d(n),P.d(n),u(a),u(e),S&&S.d(n),u(l),q(r,n),b&&b.d(n),q(k,n),q(T,n)}}}const s={title:"District & area profiles"};function Ce(f,i,a){let e,l;Q(f,he,p=>a(7,e=p)),Q(f,W,p=>a(13,l=p));let{data:t}=i,{data:r={},customFormattingSettings:o,__db:d,inputs:C}=t;Y(W,l="7de905353d4d20344986d81fb1642355",l);let v=de(fe(C));J(v.subscribe(p=>C=p)),ee(ke,{getCustomFormats:()=>o.customFormats||[]});const M=(p,O)=>ze(d.query,p,{query_name:O});pe(M),e.params,te(()=>!0);let k={initialData:void 0,initialError:void 0},z=Z`select
    bezirk_code,
    bezirk_name,
    '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
order by bezirk_code`,$=`select
    bezirk_code,
    bezirk_name,
    '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
order by bezirk_code`;r.bezirke_data&&(r.bezirke_data instanceof Error?k.initialError=r.bezirke_data:k.initialData=r.bezirke_data,r.bezirke_columns&&(k.knownColumns=r.bezirke_columns));let F,T=!1;const H=_e.createReactive({callback:p=>{a(0,F=p)},execFn:M},{id:"bezirke",...k});return H($,{noResolve:z,...k}),globalThis[Symbol.for("bezirke")]={get value(){return F}},f.$$set=p=>{"data"in p&&a(1,t=p.data)},f.$$.update=()=>{f.$$.dirty&2&&a(2,{data:r={},customFormattingSettings:o,__db:d}=t,r),f.$$.dirty&4&&be.set(Object.keys(r).length>0),f.$$.dirty&128&&e.params,f.$$.dirty&120&&(z||!T?z||(H($,{noResolve:z,...k}),a(6,T=!0)):H($,{noResolve:z}))},a(4,z=Z`select
    bezirk_code,
    bezirk_name,
    '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
order by bezirk_code`),a(5,$=`select
    bezirk_code,
    bezirk_name,
    '/berlin/area/bezirk/' || bezirk_code as bezirk_link
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
order by bezirk_code`),[F,t,r,k,z,$,T,e]}class Ie extends ne{constructor(i){super(),ae(this,i,Ce,Ee,G,{data:1})}}export{Ie as component};
