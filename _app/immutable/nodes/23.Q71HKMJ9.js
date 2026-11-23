import{s as pe,d as _,i as m,a as ee,b as h,c as y,h as be,e as C,f as te,k as ae,l as $,m as M,n as ne,o as he,p as ye,q as $e,r as ve,w as se,j as V,t as z,u as K,g as we}from"../chunks/scheduler.wXRIqz25.js";import{S as ke,i as He,d as N,t as T,a as S,c as oe,m as F,b as R,e as D,g as le}from"../chunks/index.uz5rP6Z2.js";import{F as Ge}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Se}from"../chunks/Hero.C0o6T8tj.js";import{S as Te}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as Ee}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import{D as xe,C as J}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{w as je}from"../chunks/entry.DotynpIs.js";import{A as Ce}from"../chunks/Alert.DFISYc09.js";import{e as Me,s as qe,Q as _e,p as Ae,a as de,r as me,C as Ne}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as Z}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Fe}from"../chunks/stores.DJGNasUV.js";import{Q as fe}from"../chunks/QueryViewer.RFckNDEV.js";import{p as Re}from"../chunks/profile.BW8tN6E9.js";function De(u){let a,n=p.title+"",t;return{c(){a=M("h1"),t=z(n),this.h()},l(i){a=C(i,"H1",{class:!0});var s=we(a);t=V(s,n),s.forEach(_),this.h()},h(){h(a,"class","title")},m(i,s){m(i,a,s),ee(a,t)},p:K,d(i){i&&_(a)}}}function Ie(u){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:K,p:K,d:K}}function Oe(u){let a,n,t,i,s;return document.title=a=p.title,{c(){n=$(),t=M("meta"),i=$(),s=M("meta"),this.h()},l(r){n=y(r),t=C(r,"META",{property:!0,content:!0}),i=y(r),s=C(r,"META",{name:!0,content:!0}),this.h()},h(){var r,o;h(t,"property","og:title"),h(t,"content",((r=p.og)==null?void 0:r.title)??p.title),h(s,"name","twitter:title"),h(s,"content",((o=p.og)==null?void 0:o.title)??p.title)},m(r,o){m(r,n,o),m(r,t,o),m(r,i,o),m(r,s,o)},p(r,o){o&0&&a!==(a=p.title)&&(document.title=a)},d(r){r&&(_(n),_(t),_(i),_(s))}}}function Le(u){var s,r;let a,n,t=(p.description||((s=p.og)==null?void 0:s.description))&&Qe(),i=((r=p.og)==null?void 0:r.image)&&Be();return{c(){t&&t.c(),a=$(),i&&i.c(),n=te()},l(o){t&&t.l(o),a=y(o),i&&i.l(o),n=te()},m(o,f){t&&t.m(o,f),m(o,a,f),i&&i.m(o,f),m(o,n,f)},p(o,f){var v,b;(p.description||(v=p.og)!=null&&v.description)&&t.p(o,f),(b=p.og)!=null&&b.image&&i.p(o,f)},d(o){o&&(_(a),_(n)),t&&t.d(o),i&&i.d(o)}}}function Qe(u){let a,n,t,i,s;return{c(){a=M("meta"),n=$(),t=M("meta"),i=$(),s=M("meta"),this.h()},l(r){a=C(r,"META",{name:!0,content:!0}),n=y(r),t=C(r,"META",{property:!0,content:!0}),i=y(r),s=C(r,"META",{name:!0,content:!0}),this.h()},h(){var r,o,f;h(a,"name","description"),h(a,"content",p.description??((r=p.og)==null?void 0:r.description)),h(t,"property","og:description"),h(t,"content",((o=p.og)==null?void 0:o.description)??p.description),h(s,"name","twitter:description"),h(s,"content",((f=p.og)==null?void 0:f.description)??p.description)},m(r,o){m(r,a,o),m(r,n,o),m(r,t,o),m(r,i,o),m(r,s,o)},p:K,d(r){r&&(_(a),_(n),_(t),_(i),_(s))}}}function Be(u){let a,n,t;return{c(){a=M("meta"),n=$(),t=M("meta"),this.h()},l(i){a=C(i,"META",{property:!0,content:!0}),n=y(i),t=C(i,"META",{name:!0,content:!0}),this.h()},h(){var i,s;h(a,"property","og:image"),h(a,"content",de((i=p.og)==null?void 0:i.image)),h(t,"name","twitter:image"),h(t,"content",de((s=p.og)==null?void 0:s.image))},m(i,s){m(i,a,s),m(i,n,s),m(i,t,s)},p:K,d(i){i&&(_(a),_(n),_(t))}}}function ce(u){let a,n;return a=new fe({props:{queryID:"label_stats",queryResult:u[0]}}),{c(){D(a.$$.fragment)},l(t){R(a.$$.fragment,t)},m(t,i){F(a,t,i),n=!0},p(t,i){const s={};i&1&&(s.queryResult=t[0]),a.$set(s)},i(t){n||(S(a.$$.fragment,t),n=!0)},o(t){T(a.$$.fragment,t),n=!1},d(t){N(a,t)}}}function Pe(u){var E,x;let a,n="Gebiet names are labels, not official names.",t,i=(((E=u[0][0])==null?void 0:E.n_osm_named)??"—")+"",s,r,o=(((x=u[0][0])==null?void 0:x.n_gebiete)??"—")+"",f,v,b,l="Hamburg data hub",g;return{c(){a=M("b"),a.textContent=n,t=z(` Hamburg's statistische Gebiete carry only a
  numeric code in the source geodata, so each one is listed as its Stadtteil plus an
  OpenStreetMap neighbourhood or quarter name that lies inside it
  (`),s=z(i),r=z(" of "),f=z(o),v=z(` Gebiete), or its code
  where there is none (e.g. "Eimsbüttel · Gebiet 35001"). An OSM name marks a point inside the
  Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet. See the
  `),b=M("a"),b.textContent=l,g=z(" for the full data inventory."),this.h()},l(c){a=C(c,"B",{"data-svelte-h":!0}),ae(a)!=="svelte-123ftxh"&&(a.textContent=n),t=V(c,` Hamburg's statistische Gebiete carry only a
  numeric code in the source geodata, so each one is listed as its Stadtteil plus an
  OpenStreetMap neighbourhood or quarter name that lies inside it
  (`),s=V(c,i),r=V(c," of "),f=V(c,o),v=V(c,` Gebiete), or its code
  where there is none (e.g. "Eimsbüttel · Gebiet 35001"). An OSM name marks a point inside the
  Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet. See the
  `),b=C(c,"A",{href:!0,"data-svelte-h":!0}),ae(b)!=="svelte-j8flwl"&&(b.textContent=l),g=V(c," for the full data inventory."),this.h()},h(){h(b,"href","/gentriduck/hamburg")},m(c,w){m(c,a,w),m(c,t,w),m(c,s,w),m(c,r,w),m(c,f,w),m(c,v,w),m(c,b,w),m(c,g,w)},p(c,w){var j,q;w&1&&i!==(i=(((j=c[0][0])==null?void 0:j.n_osm_named)??"—")+"")&&se(s,i),w&1&&o!==(o=(((q=c[0][0])==null?void 0:q.n_gebiete)??"—")+"")&&se(f,o)},d(c){c&&(_(a),_(t),_(s),_(r),_(f),_(v),_(b),_(g))}}}function ue(u){let a,n;return a=new fe({props:{queryID:"gebiete",queryResult:u[1]}}),{c(){D(a.$$.fragment)},l(t){R(a.$$.fragment,t)},m(t,i){F(a,t,i),n=!0},p(t,i){const s={};i&2&&(s.queryResult=t[1]),a.$set(s)},i(t){n||(S(a.$$.fragment,t),n=!0)},o(t){T(a.$$.fragment,t),n=!1},d(t){N(a,t)}}}function Ue(u){let a,n,t,i,s,r,o,f,v,b;return a=new J({props:{id:"area_name",title:"Statistisches Gebiet"}}),t=new J({props:{id:"district",title:"District"}}),s=new J({props:{id:"stage",title:"Stage"}}),o=new J({props:{id:"status_trend",title:"Status trend"}}),v=new J({props:{id:"code_note",title:"Code (if not in the name)"}}),{c(){D(a.$$.fragment),n=$(),D(t.$$.fragment),i=$(),D(s.$$.fragment),r=$(),D(o.$$.fragment),f=$(),D(v.$$.fragment)},l(l){R(a.$$.fragment,l),n=y(l),R(t.$$.fragment,l),i=y(l),R(s.$$.fragment,l),r=y(l),R(o.$$.fragment,l),f=y(l),R(v.$$.fragment,l)},m(l,g){F(a,l,g),m(l,n,g),F(t,l,g),m(l,i,g),F(s,l,g),m(l,r,g),F(o,l,g),m(l,f,g),F(v,l,g),b=!0},p:K,i(l){b||(S(a.$$.fragment,l),S(t.$$.fragment,l),S(s.$$.fragment,l),S(o.$$.fragment,l),S(v.$$.fragment,l),b=!0)},o(l){T(a.$$.fragment,l),T(t.$$.fragment,l),T(s.$$.fragment,l),T(o.$$.fragment,l),T(v.$$.fragment,l),b=!1},d(l){l&&(_(n),_(i),_(r),_(f)),N(a,l),N(t,l),N(s,l),N(o,l),N(v,l)}}}function Ve(u){let a,n,t,i,s,r,o,f,v=`Search or sort the table, or use the <a href="/gentriduck/hamburg/area-detail" class="markdown">district browse</a> / <a href="/gentriduck/hamburg/maps" class="markdown">map</a>
instead — that district browse is the primary way in for most readers; this page exists mainly so
every Gebiet has a real, findable page.`,b,l,g,E,x,c,w,j,q=`Hamburg&#39;s stages are not directly equivalent to same-named Berlin stages (Hamburg&#39;s Dynamik window
is 3 years, Berlin&#39;s 2; see <a href="/gentriduck/methodology" class="markdown">methodology §6</a>). Gebiete without a stage have no
Sozialmonitoring classification in the latest Hamburg edition on this site.`,I,A,B,O,P,k,X,U,W,L=typeof p<"u"&&p.title&&p.hide_title!==!0&&De();function ge(e,d){return typeof p<"u"&&p.title?Oe:Ie}let Y=ge()(u),Q=typeof p=="object"&&Le();r=new Se({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"All Gebiete (statistische Gebiete)",lede:"Every Hamburg statistisches Gebiet — a full-text search, secondary to the district browse for most readers."}});let H=u[0]&&ce(u);g=new Ce({props:{status:"info",$$slots:{default:[Pe]},$$scope:{ctx:u}}});let G=u[1]&&ue(u);return c=new xe({props:{data:u[1],rows:"20",search:"true",link:"area_link",emptySet:"warn",emptyMessage:"No Hamburg Gebiet geometry available.",$$slots:{default:[Ue]},$$scope:{ctx:u}}}),A=new Te({}),O=new Ee({}),U=new Ge({}),{c(){L&&L.c(),a=$(),Y.c(),n=M("meta"),t=M("meta"),Q&&Q.c(),i=te(),s=$(),D(r.$$.fragment),o=$(),f=M("p"),f.innerHTML=v,b=$(),H&&H.c(),l=$(),D(g.$$.fragment),E=$(),G&&G.c(),x=$(),D(c.$$.fragment),w=$(),j=M("p"),j.innerHTML=q,I=$(),D(A.$$.fragment),B=$(),D(O.$$.fragment),P=$(),k=M("hr"),X=$(),D(U.$$.fragment),this.h()},l(e){L&&L.l(e),a=y(e);const d=be("svelte-2igo1p",document.head);Y.l(d),n=C(d,"META",{name:!0,content:!0}),t=C(d,"META",{name:!0,content:!0}),Q&&Q.l(d),i=te(),d.forEach(_),s=y(e),R(r.$$.fragment,e),o=y(e),f=C(e,"P",{class:!0,"data-svelte-h":!0}),ae(f)!=="svelte-1xj78wc"&&(f.innerHTML=v),b=y(e),H&&H.l(e),l=y(e),R(g.$$.fragment,e),E=y(e),G&&G.l(e),x=y(e),R(c.$$.fragment,e),w=y(e),j=C(e,"P",{class:!0,"data-svelte-h":!0}),ae(j)!=="svelte-1lyaevn"&&(j.innerHTML=q),I=y(e),R(A.$$.fragment,e),B=y(e),R(O.$$.fragment,e),P=y(e),k=C(e,"HR",{class:!0}),X=y(e),R(U.$$.fragment,e),this.h()},h(){h(n,"name","twitter:card"),h(n,"content","summary_large_image"),h(t,"name","twitter:site"),h(t,"content","@evidence_dev"),h(f,"class","markdown"),h(j,"class","markdown"),h(k,"class","markdown")},m(e,d){L&&L.m(e,d),m(e,a,d),Y.m(document.head,null),ee(document.head,n),ee(document.head,t),Q&&Q.m(document.head,null),ee(document.head,i),m(e,s,d),F(r,e,d),m(e,o,d),m(e,f,d),m(e,b,d),H&&H.m(e,d),m(e,l,d),F(g,e,d),m(e,E,d),G&&G.m(e,d),m(e,x,d),F(c,e,d),m(e,w,d),m(e,j,d),m(e,I,d),F(A,e,d),m(e,B,d),F(O,e,d),m(e,P,d),m(e,k,d),m(e,X,d),F(U,e,d),W=!0},p(e,[d]){typeof p<"u"&&p.title&&p.hide_title!==!0&&L.p(e,d),Y.p(e,d),typeof p=="object"&&Q.p(e,d),e[0]?H?(H.p(e,d),d&1&&S(H,1)):(H=ce(e),H.c(),S(H,1),H.m(l.parentNode,l)):H&&(le(),T(H,1,1,()=>{H=null}),oe());const ie={};d&16777217&&(ie.$$scope={dirty:d,ctx:e}),g.$set(ie),e[1]?G?(G.p(e,d),d&2&&S(G,1)):(G=ue(e),G.c(),S(G,1),G.m(x.parentNode,x)):G&&(le(),T(G,1,1,()=>{G=null}),oe());const re={};d&2&&(re.data=e[1]),d&16777216&&(re.$$scope={dirty:d,ctx:e}),c.$set(re)},i(e){W||(S(r.$$.fragment,e),S(H),S(g.$$.fragment,e),S(G),S(c.$$.fragment,e),S(A.$$.fragment,e),S(O.$$.fragment,e),S(U.$$.fragment,e),W=!0)},o(e){T(r.$$.fragment,e),T(H),T(g.$$.fragment,e),T(G),T(c.$$.fragment,e),T(A.$$.fragment,e),T(O.$$.fragment,e),T(U.$$.fragment,e),W=!1},d(e){e&&(_(a),_(s),_(o),_(f),_(b),_(l),_(E),_(x),_(w),_(j),_(I),_(B),_(P),_(k),_(X)),L&&L.d(e),Y.d(e),_(n),_(t),Q&&Q.d(e),_(i),N(r,e),H&&H.d(e),N(g,e),G&&G.d(e),N(c,e),N(A,e),N(O,e),N(U,e)}}}const p={title:"All Gebiete (statistische Gebiete)"};function ze(u,a,n){let t,i;ne(u,Fe,k=>n(12,t=k)),ne(u,me,k=>n(18,i=k));let{data:s}=a,{data:r={},customFormattingSettings:o,__db:f,inputs:v}=s;he(me,i="ad1ffa490e8b4e60d7239752eaada54b",i);let b=Me(je(v));ye(b.subscribe(k=>v=k)),$e(Ne,{getCustomFormats:()=>o.customFormats||[]});const l=(k,X)=>Re(f.query,k,{query_name:X});qe(l),t.params,ve(()=>!0);let g={initialData:void 0,initialError:void 0},E=Z`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`,x=`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`;r.label_stats_data&&(r.label_stats_data instanceof Error?g.initialError=r.label_stats_data:g.initialData=r.label_stats_data,r.label_stats_columns&&(g.knownColumns=r.label_stats_columns));let c,w=!1;const j=_e.createReactive({callback:k=>{n(0,c=k)},execFn:l},{id:"label_stats",...g});j(x,{noResolve:E,...g}),globalThis[Symbol.for("label_stats")]={get value(){return c}};let q={initialData:void 0,initialError:void 0},I=Z`select
    g.area_name,
    d.area_name as district,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    case when strpos(g.area_name, 'Gebiet ' || g.area_code) > 0 then null else g.area_code end
        as code_note,
    '/hamburg/area/' || g.area_code as area_link
from gentriduck_marts.dim_area_geometry as g
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l2' and h2.area_code = g.area_code
left join
    gentriduck_marts.mart_area_hierarchy as h1
    on h1.city_code = 'HH' and h1.area_level = 'subarea_l1' and h1.area_code = h2.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = h1.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g.city_code = 'HH' and g.area_level = 'subarea_l2'
order by g.area_name`,A=`select
    g.area_name,
    d.area_name as district,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    case when strpos(g.area_name, 'Gebiet ' || g.area_code) > 0 then null else g.area_code end
        as code_note,
    '/hamburg/area/' || g.area_code as area_link
from gentriduck_marts.dim_area_geometry as g
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l2' and h2.area_code = g.area_code
left join
    gentriduck_marts.mart_area_hierarchy as h1
    on h1.city_code = 'HH' and h1.area_level = 'subarea_l1' and h1.area_code = h2.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = h1.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g.city_code = 'HH' and g.area_level = 'subarea_l2'
order by g.area_name`;r.gebiete_data&&(r.gebiete_data instanceof Error?q.initialError=r.gebiete_data:q.initialData=r.gebiete_data,r.gebiete_columns&&(q.knownColumns=r.gebiete_columns));let B,O=!1;const P=_e.createReactive({callback:k=>{n(1,B=k)},execFn:l},{id:"gebiete",...q});return P(A,{noResolve:I,...q}),globalThis[Symbol.for("gebiete")]={get value(){return B}},u.$$set=k=>{"data"in k&&n(2,s=k.data)},u.$$.update=()=>{u.$$.dirty&4&&n(3,{data:r={},customFormattingSettings:o,__db:f}=s,r),u.$$.dirty&8&&Ae.set(Object.keys(r).length>0),u.$$.dirty&4096&&t.params,u.$$.dirty&240&&(E||!w?E||(j(x,{noResolve:E,...g}),n(7,w=!0)):j(x,{noResolve:E})),u.$$.dirty&3840&&(I||!O?I||(P(A,{noResolve:I,...q}),n(11,O=!0)):P(A,{noResolve:I}))},n(5,E=Z`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),n(6,x=`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),n(9,I=Z`select
    g.area_name,
    d.area_name as district,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    case when strpos(g.area_name, 'Gebiet ' || g.area_code) > 0 then null else g.area_code end
        as code_note,
    '/hamburg/area/' || g.area_code as area_link
from gentriduck_marts.dim_area_geometry as g
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l2' and h2.area_code = g.area_code
left join
    gentriduck_marts.mart_area_hierarchy as h1
    on h1.city_code = 'HH' and h1.area_level = 'subarea_l1' and h1.area_code = h2.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = h1.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g.city_code = 'HH' and g.area_level = 'subarea_l2'
order by g.area_name`),n(10,A=`select
    g.area_name,
    d.area_name as district,
    -- #358: dbt display columns (spec §1-§2), never the raw key.
    coalesce(gi.stage_label, 'No stage on record') as stage,
    coalesce(gi.status_trend, 'No trend on record') as status_trend,
    case when strpos(g.area_name, 'Gebiet ' || g.area_code) > 0 then null else g.area_code end
        as code_note,
    '/hamburg/area/' || g.area_code as area_link
from gentriduck_marts.dim_area_geometry as g
left join
    gentriduck_marts.mart_area_hierarchy as h2
    on h2.city_code = 'HH' and h2.area_level = 'subarea_l2' and h2.area_code = g.area_code
left join
    gentriduck_marts.mart_area_hierarchy as h1
    on h1.city_code = 'HH' and h1.area_level = 'subarea_l1' and h1.area_code = h2.parent_area_code
left join
    gentriduck_marts.dim_area_geometry as d
    on d.city_code = 'HH' and d.area_level = 'district' and d.area_code = h1.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g.city_code = 'HH' and g.area_level = 'subarea_l2'
order by g.area_name`),[c,B,s,r,g,E,x,w,q,I,A,O,t]}class _t extends ke{constructor(a){super(),He(this,a,ze,Ve,pe,{data:2})}}export{_t as component};
