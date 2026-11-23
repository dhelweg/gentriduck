import{s as Z,d as _,i as f,a as O,b as p,c as g,h as ee,e as x,f as U,k as te,l as $,m as S,n as V,o as ae,p as re,q as ie,r as ne,u as I,g as le,j as se,t as oe}from"../chunks/scheduler.wXRIqz25.js";import{S as me,i as _e,d as R,t as T,a as w,c as ue,m as A,b as C,e as F,g as fe}from"../chunks/index.uz5rP6Z2.js";import{F as ce}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as de}from"../chunks/Hero.C0o6T8tj.js";import{S as pe}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as ye}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as be,C as L}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{w as ge}from"../chunks/entry.DotynpIs.js";import{e as $e,s as he,Q as ke,p as ve,a as K,r as X,C as we}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as Y}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Ee}from"../chunks/stores.DJGNasUV.js";import{Q as Te}from"../chunks/QueryViewer.RFckNDEV.js";import{p as xe}from"../chunks/profile.BW8tN6E9.js";function Se(d){let r,s=u.title+"",t;return{c(){r=S("h1"),t=oe(s),this.h()},l(i){r=x(i,"H1",{class:!0});var l=le(r);t=se(l,s),l.forEach(_),this.h()},h(){p(r,"class","title")},m(i,l){f(i,r,l),O(r,t)},p:I,d(i){i&&_(r)}}}function Me(d){return{c(){this.h()},l(r){this.h()},h(){document.title="Evidence"},m:I,p:I,d:I}}function Re(d){let r,s,t,i,l;return document.title=r=u.title,{c(){s=$(),t=S("meta"),i=$(),l=S("meta"),this.h()},l(a){s=g(a),t=x(a,"META",{property:!0,content:!0}),i=g(a),l=x(a,"META",{name:!0,content:!0}),this.h()},h(){var a,n;p(t,"property","og:title"),p(t,"content",((a=u.og)==null?void 0:a.title)??u.title),p(l,"name","twitter:title"),p(l,"content",((n=u.og)==null?void 0:n.title)??u.title)},m(a,n){f(a,s,n),f(a,t,n),f(a,i,n),f(a,l,n)},p(a,n){n&0&&r!==(r=u.title)&&(document.title=r)},d(a){a&&(_(s),_(t),_(i),_(l))}}}function Ae(d){var l,a;let r,s,t=(u.description||((l=u.og)==null?void 0:l.description))&&Ce(),i=((a=u.og)==null?void 0:a.image)&&Fe();return{c(){t&&t.c(),r=$(),i&&i.c(),s=U()},l(n){t&&t.l(n),r=g(n),i&&i.l(n),s=U()},m(n,c){t&&t.m(n,c),f(n,r,c),i&&i.m(n,c),f(n,s,c)},p(n,c){var o,h;(u.description||(o=u.og)!=null&&o.description)&&t.p(n,c),(h=u.og)!=null&&h.image&&i.p(n,c)},d(n){n&&(_(r),_(s)),t&&t.d(n),i&&i.d(n)}}}function Ce(d){let r,s,t,i,l;return{c(){r=S("meta"),s=$(),t=S("meta"),i=$(),l=S("meta"),this.h()},l(a){r=x(a,"META",{name:!0,content:!0}),s=g(a),t=x(a,"META",{property:!0,content:!0}),i=g(a),l=x(a,"META",{name:!0,content:!0}),this.h()},h(){var a,n,c;p(r,"name","description"),p(r,"content",u.description??((a=u.og)==null?void 0:a.description)),p(t,"property","og:description"),p(t,"content",((n=u.og)==null?void 0:n.description)??u.description),p(l,"name","twitter:description"),p(l,"content",((c=u.og)==null?void 0:c.description)??u.description)},m(a,n){f(a,r,n),f(a,s,n),f(a,t,n),f(a,i,n),f(a,l,n)},p:I,d(a){a&&(_(r),_(s),_(t),_(i),_(l))}}}function Fe(d){let r,s,t;return{c(){r=S("meta"),s=$(),t=S("meta"),this.h()},l(i){r=x(i,"META",{property:!0,content:!0}),s=g(i),t=x(i,"META",{name:!0,content:!0}),this.h()},h(){var i,l;p(r,"property","og:image"),p(r,"content",K((i=u.og)==null?void 0:i.image)),p(t,"name","twitter:image"),p(t,"content",K((l=u.og)==null?void 0:l.image))},m(i,l){f(i,r,l),f(i,s,l),f(i,t,l)},p:I,d(i){i&&(_(r),_(s),_(t))}}}function J(d){let r,s;return r=new Te({props:{queryID:"all_areas",queryResult:d[0]}}),{c(){F(r.$$.fragment)},l(t){C(r.$$.fragment,t)},m(t,i){A(r,t,i),s=!0},p(t,i){const l={};i&1&&(l.queryResult=t[0]),r.$set(l)},i(t){s||(w(r.$$.fragment,t),s=!0)},o(t){T(r.$$.fragment,t),s=!1},d(t){R(r,t)}}}function He(d){let r,s,t,i,l,a,n,c;return r=new L({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),t=new L({props:{id:"bezirk",title:"District code"}}),l=new L({props:{id:"stage",title:"Stage"}}),n=new L({props:{id:"status_trend",title:"Status trend"}}),{c(){F(r.$$.fragment),s=$(),F(t.$$.fragment),i=$(),F(l.$$.fragment),a=$(),F(n.$$.fragment)},l(o){C(r.$$.fragment,o),s=g(o),C(t.$$.fragment,o),i=g(o),C(l.$$.fragment,o),a=g(o),C(n.$$.fragment,o)},m(o,h){A(r,o,h),f(o,s,h),A(t,o,h),f(o,i,h),A(l,o,h),f(o,a,h),A(n,o,h),c=!0},p:I,i(o){c||(w(r.$$.fragment,o),w(t.$$.fragment,o),w(l.$$.fragment,o),w(n.$$.fragment,o),c=!0)},o(o){T(r.$$.fragment,o),T(t.$$.fragment,o),T(l.$$.fragment,o),T(n.$$.fragment,o),c=!1},d(o){o&&(_(s),_(i),_(a)),R(r,o),R(t,o),R(l,o),R(n,o)}}}function qe(d){let r,s,t,i,l,a,n,c,o=`Search or sort the table, or use the <a href="/gentriduck/berlin/area-detail" class="markdown">district browse</a> / <a href="/gentriduck/berlin/maps" class="markdown">map</a>
instead — that district browse is the primary way in for most readers; this page exists mainly so
every neighbourhood has a real, findable page (see this file&#39;s header comment).`,h,H,k,E,v,N,M,P,b,Q,B,z,q=typeof u<"u"&&u.title&&u.hide_title!==!0&&Se();function W(e,m){return typeof u<"u"&&u.title?Re:Me}let j=W()(d),D=typeof u=="object"&&Ae();a=new de({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"All neighbourhoods (Planungsräume)",lede:"Every Berlin neighbourhood (Planungsraum) on its current (2021+) boundaries — a full-text search, secondary to the district browse for most readers."}});let y=d[0]&&J(d);return k=new be({props:{data:d[0],rows:"542",search:"true",link:"area_link",$$slots:{default:[He]},$$scope:{ctx:d}}}),v=new pe({}),M=new ye({}),B=new ce({}),{c(){q&&q.c(),r=$(),j.c(),s=S("meta"),t=S("meta"),D&&D.c(),i=U(),l=$(),F(a.$$.fragment),n=$(),c=S("p"),c.innerHTML=o,h=$(),y&&y.c(),H=$(),F(k.$$.fragment),E=$(),F(v.$$.fragment),N=$(),F(M.$$.fragment),P=$(),b=S("hr"),Q=$(),F(B.$$.fragment),this.h()},l(e){q&&q.l(e),r=g(e);const m=ee("svelte-2igo1p",document.head);j.l(m),s=x(m,"META",{name:!0,content:!0}),t=x(m,"META",{name:!0,content:!0}),D&&D.l(m),i=U(),m.forEach(_),l=g(e),C(a.$$.fragment,e),n=g(e),c=x(e,"P",{class:!0,"data-svelte-h":!0}),te(c)!=="svelte-1sjoh5v"&&(c.innerHTML=o),h=g(e),y&&y.l(e),H=g(e),C(k.$$.fragment,e),E=g(e),C(v.$$.fragment,e),N=g(e),C(M.$$.fragment,e),P=g(e),b=x(e,"HR",{class:!0}),Q=g(e),C(B.$$.fragment,e),this.h()},h(){p(s,"name","twitter:card"),p(s,"content","summary_large_image"),p(t,"name","twitter:site"),p(t,"content","@evidence_dev"),p(c,"class","markdown"),p(b,"class","markdown")},m(e,m){q&&q.m(e,m),f(e,r,m),j.m(document.head,null),O(document.head,s),O(document.head,t),D&&D.m(document.head,null),O(document.head,i),f(e,l,m),A(a,e,m),f(e,n,m),f(e,c,m),f(e,h,m),y&&y.m(e,m),f(e,H,m),A(k,e,m),f(e,E,m),A(v,e,m),f(e,N,m),A(M,e,m),f(e,P,m),f(e,b,m),f(e,Q,m),A(B,e,m),z=!0},p(e,[m]){typeof u<"u"&&u.title&&u.hide_title!==!0&&q.p(e,m),j.p(e,m),typeof u=="object"&&D.p(e,m),e[0]?y?(y.p(e,m),m&1&&w(y,1)):(y=J(e),y.c(),w(y,1),y.m(H.parentNode,H)):y&&(fe(),T(y,1,1,()=>{y=null}),ue());const G={};m&1&&(G.data=e[0]),m&262144&&(G.$$scope={dirty:m,ctx:e}),k.$set(G)},i(e){z||(w(a.$$.fragment,e),w(y),w(k.$$.fragment,e),w(v.$$.fragment,e),w(M.$$.fragment,e),w(B.$$.fragment,e),z=!0)},o(e){T(a.$$.fragment,e),T(y),T(k.$$.fragment,e),T(v.$$.fragment,e),T(M.$$.fragment,e),T(B.$$.fragment,e),z=!1},d(e){e&&(_(r),_(l),_(n),_(c),_(h),_(H),_(E),_(N),_(P),_(b),_(Q)),q&&q.d(e),j.d(e),_(s),_(t),D&&D.d(e),_(i),R(a,e),y&&y.d(e),R(k,e),R(v,e),R(M,e),R(B,e)}}}const u={title:"All neighbourhoods (Planungsräume)"};function De(d,r,s){let t,i;V(d,Ee,b=>s(7,t=b)),V(d,X,b=>s(13,i=b));let{data:l}=r,{data:a={},customFormattingSettings:n,__db:c,inputs:o}=l;ae(X,i="f325ca2434180fc4e12b84cff848e07a",i);let h=$e(ge(o));re(h.subscribe(b=>o=b)),ie(we,{getCustomFormats:()=>n.customFormats||[]});const H=(b,Q)=>xe(c.query,b,{query_name:Q});he(H),t.params,ne(()=>!0);let k={initialData:void 0,initialError:void 0},E=Y`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    stage_label as stage,
    status_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`,v=`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    stage_label as stage,
    status_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`;a.all_areas_data&&(a.all_areas_data instanceof Error?k.initialError=a.all_areas_data:k.initialData=a.all_areas_data,a.all_areas_columns&&(k.knownColumns=a.all_areas_columns));let N,M=!1;const P=ke.createReactive({callback:b=>{s(0,N=b)},execFn:H},{id:"all_areas",...k});return P(v,{noResolve:E,...k}),globalThis[Symbol.for("all_areas")]={get value(){return N}},d.$$set=b=>{"data"in b&&s(1,l=b.data)},d.$$.update=()=>{d.$$.dirty&2&&s(2,{data:a={},customFormattingSettings:n,__db:c}=l,a),d.$$.dirty&4&&ve.set(Object.keys(a).length>0),d.$$.dirty&128&&t.params,d.$$.dirty&120&&(E||!M?E||(P(v,{noResolve:E,...k}),s(6,M=!0)):P(v,{noResolve:E}))},s(4,E=Y`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    stage_label as stage,
    status_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`),s(5,v=`select
    area_name,
    substr(area_code, 1, 2) as bezirk,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    stage_label as stage,
    status_trend,
    '/berlin/area/' || area_code as area_link
from gentriduck_marts.gentrification_index
where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and area_level = 'plr'
  )
order by area_name`),[N,l,a,k,E,v,M,t]}class Ye extends me{constructor(r){super(),_e(this,r,De,qe,Z,{data:1})}}export{Ye as component};
