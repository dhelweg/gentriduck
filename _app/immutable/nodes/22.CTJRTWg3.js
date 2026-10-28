import{s as ce,d as _,i as d,a as Y,b as y,c as w,h as ue,e as C,f as J,k as W,l as G,m as M,n as ae,o as fe,p as ge,q as pe,r as he,w as re,j as L,t as U,u as V,g as be}from"../chunks/scheduler.CmMeO4ay.js";import{S as ye,i as ve,d as D,t as j,a as T,c as ie,m as I,b as O,e as N,g as ne}from"../chunks/index.bfDa0Uqw.js";import{F as $e}from"../chunks/FooterNav.BbND9dxm.js";import{H as He}from"../chunks/Hero.wYia6TQ0.js";import{D as ke,C as K}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{w as we}from"../chunks/entry.vKQYRLhF.js";import{A as Ge}from"../chunks/Alert.BNZjDqvU.js";import{e as Te,s as Ee,Q as se,p as xe,a as oe,r as le,C as Se}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as X}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as je}from"../chunks/stores.CGa44sBH.js";import{Q as de}from"../chunks/QueryViewer.C-CXDbdP.js";import{p as Ce}from"../chunks/profile.BW8tN6E9.js";function Me(u){let a,n=p.title+"",e;return{c(){a=M("h1"),e=U(n),this.h()},l(i){a=C(i,"H1",{class:!0});var s=be(a);e=L(s,n),s.forEach(_),this.h()},h(){y(a,"class","title")},m(i,s){d(i,a,s),Y(a,e)},p:V,d(i){i&&_(a)}}}function qe(u){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:V,p:V,d:V}}function Ae(u){let a,n,e,i,s;return document.title=a=p.title,{c(){n=G(),e=M("meta"),i=G(),s=M("meta"),this.h()},l(r){n=w(r),e=C(r,"META",{property:!0,content:!0}),i=w(r),s=C(r,"META",{name:!0,content:!0}),this.h()},h(){var r,o;y(e,"property","og:title"),y(e,"content",((r=p.og)==null?void 0:r.title)??p.title),y(s,"name","twitter:title"),y(s,"content",((o=p.og)==null?void 0:o.title)??p.title)},m(r,o){d(r,n,o),d(r,e,o),d(r,i,o),d(r,s,o)},p(r,o){o&0&&a!==(a=p.title)&&(document.title=a)},d(r){r&&(_(n),_(e),_(i),_(s))}}}function Fe(u){var s,r;let a,n,e=(p.description||((s=p.og)==null?void 0:s.description))&&Re(),i=((r=p.og)==null?void 0:r.image)&&De();return{c(){e&&e.c(),a=G(),i&&i.c(),n=J()},l(o){e&&e.l(o),a=w(o),i&&i.l(o),n=J()},m(o,f){e&&e.m(o,f),d(o,a,f),i&&i.m(o,f),d(o,n,f)},p(o,f){var v,b;(p.description||(v=p.og)!=null&&v.description)&&e.p(o,f),(b=p.og)!=null&&b.image&&i.p(o,f)},d(o){o&&(_(a),_(n)),e&&e.d(o),i&&i.d(o)}}}function Re(u){let a,n,e,i,s;return{c(){a=M("meta"),n=G(),e=M("meta"),i=G(),s=M("meta"),this.h()},l(r){a=C(r,"META",{name:!0,content:!0}),n=w(r),e=C(r,"META",{property:!0,content:!0}),i=w(r),s=C(r,"META",{name:!0,content:!0}),this.h()},h(){var r,o,f;y(a,"name","description"),y(a,"content",p.description??((r=p.og)==null?void 0:r.description)),y(e,"property","og:description"),y(e,"content",((o=p.og)==null?void 0:o.description)??p.description),y(s,"name","twitter:description"),y(s,"content",((f=p.og)==null?void 0:f.description)??p.description)},m(r,o){d(r,a,o),d(r,n,o),d(r,e,o),d(r,i,o),d(r,s,o)},p:V,d(r){r&&(_(a),_(n),_(e),_(i),_(s))}}}function De(u){let a,n,e;return{c(){a=M("meta"),n=G(),e=M("meta"),this.h()},l(i){a=C(i,"META",{property:!0,content:!0}),n=w(i),e=C(i,"META",{name:!0,content:!0}),this.h()},h(){var i,s;y(a,"property","og:image"),y(a,"content",oe((i=p.og)==null?void 0:i.image)),y(e,"name","twitter:image"),y(e,"content",oe((s=p.og)==null?void 0:s.image))},m(i,s){d(i,a,s),d(i,n,s),d(i,e,s)},p:V,d(i){i&&(_(a),_(n),_(e))}}}function _e(u){let a,n;return a=new de({props:{queryID:"label_stats",queryResult:u[0]}}),{c(){N(a.$$.fragment)},l(e){O(a.$$.fragment,e)},m(e,i){I(a,e,i),n=!0},p(e,i){const s={};i&1&&(s.queryResult=e[0]),a.$set(s)},i(e){n||(T(a.$$.fragment,e),n=!0)},o(e){j(a.$$.fragment,e),n=!1},d(e){D(a,e)}}}function Ie(u){var E,x;let a,n="Gebiet names are labels, not official names.",e,i=(((E=u[0][0])==null?void 0:E.n_osm_named)??"—")+"",s,r,o=(((x=u[0][0])==null?void 0:x.n_gebiete)??"—")+"",f,v,b,l="Hamburg data hub",g;return{c(){a=M("b"),a.textContent=n,e=U(` Hamburg's statistische Gebiete carry only a
  numeric code in the source geodata, so each one is listed as its Stadtteil plus an
  OpenStreetMap neighbourhood or quarter name that lies inside it
  (`),s=U(i),r=U(" of "),f=U(o),v=U(` Gebiete), or its code
  where there is none (e.g. "Eimsbüttel · Gebiet 35001"). An OSM name marks a point inside the
  Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet. See the
  `),b=M("a"),b.textContent=l,g=U(" for the full data inventory."),this.h()},l(c){a=C(c,"B",{"data-svelte-h":!0}),W(a)!=="svelte-123ftxh"&&(a.textContent=n),e=L(c,` Hamburg's statistische Gebiete carry only a
  numeric code in the source geodata, so each one is listed as its Stadtteil plus an
  OpenStreetMap neighbourhood or quarter name that lies inside it
  (`),s=L(c,i),r=L(c," of "),f=L(c,o),v=L(c,` Gebiete), or its code
  where there is none (e.g. "Eimsbüttel · Gebiet 35001"). An OSM name marks a point inside the
  Gebiet; the neighbourhood it names may be larger or smaller than the Gebiet. See the
  `),b=C(c,"A",{href:!0,"data-svelte-h":!0}),W(b)!=="svelte-j8flwl"&&(b.textContent=l),g=L(c," for the full data inventory."),this.h()},h(){y(b,"href","/gentriduck/hamburg")},m(c,$){d(c,a,$),d(c,e,$),d(c,s,$),d(c,r,$),d(c,f,$),d(c,v,$),d(c,b,$),d(c,g,$)},p(c,$){var S,q;$&1&&i!==(i=(((S=c[0][0])==null?void 0:S.n_osm_named)??"—")+"")&&re(s,i),$&1&&o!==(o=(((q=c[0][0])==null?void 0:q.n_gebiete)??"—")+"")&&re(f,o)},d(c){c&&(_(a),_(e),_(s),_(r),_(f),_(v),_(b),_(g))}}}function me(u){let a,n;return a=new de({props:{queryID:"gebiete",queryResult:u[1]}}),{c(){N(a.$$.fragment)},l(e){O(a.$$.fragment,e)},m(e,i){I(a,e,i),n=!0},p(e,i){const s={};i&2&&(s.queryResult=e[1]),a.$set(s)},i(e){n||(T(a.$$.fragment,e),n=!0)},o(e){j(a.$$.fragment,e),n=!1},d(e){D(a,e)}}}function Oe(u){let a,n,e,i,s,r,o,f,v,b;return a=new K({props:{id:"area_name",title:"Statistisches Gebiet"}}),e=new K({props:{id:"district",title:"District"}}),s=new K({props:{id:"stage",title:"Stage"}}),o=new K({props:{id:"pressure_trend",title:"Pressure trend"}}),v=new K({props:{id:"code_note",title:"Code (if not in the name)"}}),{c(){N(a.$$.fragment),n=G(),N(e.$$.fragment),i=G(),N(s.$$.fragment),r=G(),N(o.$$.fragment),f=G(),N(v.$$.fragment)},l(l){O(a.$$.fragment,l),n=w(l),O(e.$$.fragment,l),i=w(l),O(s.$$.fragment,l),r=w(l),O(o.$$.fragment,l),f=w(l),O(v.$$.fragment,l)},m(l,g){I(a,l,g),d(l,n,g),I(e,l,g),d(l,i,g),I(s,l,g),d(l,r,g),I(o,l,g),d(l,f,g),I(v,l,g),b=!0},p:V,i(l){b||(T(a.$$.fragment,l),T(e.$$.fragment,l),T(s.$$.fragment,l),T(o.$$.fragment,l),T(v.$$.fragment,l),b=!0)},o(l){j(a.$$.fragment,l),j(e.$$.fragment,l),j(s.$$.fragment,l),j(o.$$.fragment,l),j(v.$$.fragment,l),b=!1},d(l){l&&(_(n),_(i),_(r),_(f)),D(a,l),D(e,l),D(s,l),D(o,l),D(v,l)}}}function Ne(u){let a,n,e,i,s,r,o,f,v=`Search or sort the table, or use the <a href="/gentriduck/hamburg/area-detail" class="markdown">district browse</a> / <a href="/gentriduck/hamburg/maps" class="markdown">map</a>
instead — that district browse is the primary way in for most readers; this page exists mainly so
every Gebiet has a real, findable page.`,b,l,g,E,x,c,$,S,q=`Hamburg&#39;s stages are not directly equivalent to same-named Berlin stages (Hamburg&#39;s Dynamik window
is 3 years, Berlin&#39;s 2; see <a href="/gentriduck/methodology" class="markdown">methodology §6</a>). Gebiete without a stage have no
Sozialmonitoring classification in the latest Hamburg edition on this site.`,A,F,P,R,B,h=typeof p<"u"&&p.title&&p.hide_title!==!0&&Me();function Z(t,m){return typeof p<"u"&&p.title?Ae:qe}let z=Z()(u),Q=typeof p=="object"&&Fe();r=new He({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"All Gebiete (statistische Gebiete)",lede:"Every Hamburg statistisches Gebiet — a full-text search, secondary to the district browse for most readers."}});let H=u[0]&&_e(u);g=new Ge({props:{status:"info",$$slots:{default:[Ie]},$$scope:{ctx:u}}});let k=u[1]&&me(u);return c=new ke({props:{data:u[1],rows:"20",search:"true",link:"area_link",emptySet:"warn",emptyMessage:"No Hamburg Gebiet geometry available.",$$slots:{default:[Oe]},$$scope:{ctx:u}}}),R=new $e({}),{c(){h&&h.c(),a=G(),z.c(),n=M("meta"),e=M("meta"),Q&&Q.c(),i=J(),s=G(),N(r.$$.fragment),o=G(),f=M("p"),f.innerHTML=v,b=G(),H&&H.c(),l=G(),N(g.$$.fragment),E=G(),k&&k.c(),x=G(),N(c.$$.fragment),$=G(),S=M("p"),S.innerHTML=q,A=G(),F=M("hr"),P=G(),N(R.$$.fragment),this.h()},l(t){h&&h.l(t),a=w(t);const m=ue("svelte-2igo1p",document.head);z.l(m),n=C(m,"META",{name:!0,content:!0}),e=C(m,"META",{name:!0,content:!0}),Q&&Q.l(m),i=J(),m.forEach(_),s=w(t),O(r.$$.fragment,t),o=w(t),f=C(t,"P",{class:!0,"data-svelte-h":!0}),W(f)!=="svelte-1xj78wc"&&(f.innerHTML=v),b=w(t),H&&H.l(t),l=w(t),O(g.$$.fragment,t),E=w(t),k&&k.l(t),x=w(t),O(c.$$.fragment,t),$=w(t),S=C(t,"P",{class:!0,"data-svelte-h":!0}),W(S)!=="svelte-1lyaevn"&&(S.innerHTML=q),A=w(t),F=C(t,"HR",{class:!0}),P=w(t),O(R.$$.fragment,t),this.h()},h(){y(n,"name","twitter:card"),y(n,"content","summary_large_image"),y(e,"name","twitter:site"),y(e,"content","@evidence_dev"),y(f,"class","markdown"),y(S,"class","markdown"),y(F,"class","markdown")},m(t,m){h&&h.m(t,m),d(t,a,m),z.m(document.head,null),Y(document.head,n),Y(document.head,e),Q&&Q.m(document.head,null),Y(document.head,i),d(t,s,m),I(r,t,m),d(t,o,m),d(t,f,m),d(t,b,m),H&&H.m(t,m),d(t,l,m),I(g,t,m),d(t,E,m),k&&k.m(t,m),d(t,x,m),I(c,t,m),d(t,$,m),d(t,S,m),d(t,A,m),d(t,F,m),d(t,P,m),I(R,t,m),B=!0},p(t,[m]){typeof p<"u"&&p.title&&p.hide_title!==!0&&h.p(t,m),z.p(t,m),typeof p=="object"&&Q.p(t,m),t[0]?H?(H.p(t,m),m&1&&T(H,1)):(H=_e(t),H.c(),T(H,1),H.m(l.parentNode,l)):H&&(ne(),j(H,1,1,()=>{H=null}),ie());const te={};m&16777217&&(te.$$scope={dirty:m,ctx:t}),g.$set(te),t[1]?k?(k.p(t,m),m&2&&T(k,1)):(k=me(t),k.c(),T(k,1),k.m(x.parentNode,x)):k&&(ne(),j(k,1,1,()=>{k=null}),ie());const ee={};m&2&&(ee.data=t[1]),m&16777216&&(ee.$$scope={dirty:m,ctx:t}),c.$set(ee)},i(t){B||(T(r.$$.fragment,t),T(H),T(g.$$.fragment,t),T(k),T(c.$$.fragment,t),T(R.$$.fragment,t),B=!0)},o(t){j(r.$$.fragment,t),j(H),j(g.$$.fragment,t),j(k),j(c.$$.fragment,t),j(R.$$.fragment,t),B=!1},d(t){t&&(_(a),_(s),_(o),_(f),_(b),_(l),_(E),_(x),_($),_(S),_(A),_(F),_(P)),h&&h.d(t),z.d(t),_(n),_(e),Q&&Q.d(t),_(i),D(r,t),H&&H.d(t),D(g,t),k&&k.d(t),D(c,t),D(R,t)}}}const p={title:"All Gebiete (statistische Gebiete)"};function Qe(u,a,n){let e,i;ae(u,je,h=>n(12,e=h)),ae(u,le,h=>n(18,i=h));let{data:s}=a,{data:r={},customFormattingSettings:o,__db:f,inputs:v}=s;fe(le,i="ad1ffa490e8b4e60d7239752eaada54b",i);let b=Te(we(v));ge(b.subscribe(h=>v=h)),pe(Se,{getCustomFormats:()=>o.customFormats||[]});const l=(h,Z)=>Ce(f.query,h,{query_name:Z});Ee(l),e.params,he(()=>!0);let g={initialData:void 0,initialError:void 0},E=X`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`,x=`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`;r.label_stats_data&&(r.label_stats_data instanceof Error?g.initialError=r.label_stats_data:g.initialData=r.label_stats_data,r.label_stats_columns&&(g.knownColumns=r.label_stats_columns));let c,$=!1;const S=se.createReactive({callback:h=>{n(0,c=h)},execFn:l},{id:"label_stats",...g});S(x,{noResolve:E,...g}),globalThis[Symbol.for("label_stats")]={get value(){return c}};let q={initialData:void 0,initialError:void 0},A=X`select
    g.area_name,
    d.area_name as district,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by g.area_name`,F=`select
    g.area_name,
    d.area_name as district,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by g.area_name`;r.gebiete_data&&(r.gebiete_data instanceof Error?q.initialError=r.gebiete_data:q.initialData=r.gebiete_data,r.gebiete_columns&&(q.knownColumns=r.gebiete_columns));let P,R=!1;const B=se.createReactive({callback:h=>{n(1,P=h)},execFn:l},{id:"gebiete",...q});return B(F,{noResolve:A,...q}),globalThis[Symbol.for("gebiete")]={get value(){return P}},u.$$set=h=>{"data"in h&&n(2,s=h.data)},u.$$.update=()=>{u.$$.dirty&4&&n(3,{data:r={},customFormattingSettings:o,__db:f}=s,r),u.$$.dirty&8&&xe.set(Object.keys(r).length>0),u.$$.dirty&4096&&e.params,u.$$.dirty&240&&(E||!$?E||(S(x,{noResolve:E,...g}),n(7,$=!0)):S(x,{noResolve:E})),u.$$.dirty&3840&&(A||!R?A||(B(F,{noResolve:A,...q}),n(11,R=!0)):B(F,{noResolve:A}))},n(5,E=X`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),n(6,x=`-- #353 (#352 review follow-up): computed instead of a hard-coded "41 of 943".
select
    count(*) filter (where strpos(area_name, 'Gebiet ' || area_code) = 0) as n_osm_named,
    count(*) as n_gebiete
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2'`),n(9,A=X`select
    g.area_name,
    d.area_name as district,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by g.area_name`),n(10,F=`select
    g.area_name,
    d.area_name as district,
    gi.status_class as stage,
    gi.dynamism_class as pressure_trend,
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
order by g.area_name`),[c,P,s,r,g,E,x,$,q,A,F,R,e]}class tt extends ye{constructor(a){super(),ve(this,a,Qe,Ne,ce,{data:2})}}export{tt as component};
