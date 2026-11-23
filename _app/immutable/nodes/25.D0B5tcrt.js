import{s as Rt,d as o,i as l,a as Ia,b as h,c as g,h as Nt,e as w,f as Ba,k as T,l as f,m as k,n as wt,o as Ft,p as At,q as Dt,r as It,u as pe,g as Xa,j as ke,t as He,v as Gt,H as Ct}from"../chunks/scheduler.wXRIqz25.js";import{S as Bt,i as Pt,d as $,t as b,a as d,c as Ee,m as j,b as x,e as S,g as Ge}from"../chunks/index.uz5rP6Z2.js";import{A as Ut,P as Ot}from"../chunks/PageTitle.X8fTilZx.js";import{A as Wt}from"../chunks/AreaDrilldownMap.BX3ziZPk.js";import{F as Qt}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as zt}from"../chunks/HamburgTrajectoryNote.D2Jp2F4a.js";import{H as Jt}from"../chunks/Hero.C0o6T8tj.js";import{N as va}from"../chunks/NotYetPublished.Cn65vfa5.js";import{S as Yt}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{D as Xt,C as Vt}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as wa,w as Kt}from"../chunks/entry.DotynpIs.js";import{A as Va}from"../chunks/Alert.DFISYc09.js";import{e as Zt,s as er,Q as oa,p as ar,a as kt,r as Ht,C as tr}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as Q}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as rr}from"../chunks/stores.DJGNasUV.js";import{Q as la}from"../chunks/QueryViewer.RFckNDEV.js";import{B as Ya}from"../chunks/BarChart.Cy9nf948.js";import{p as ir}from"../chunks/profile.BW8tN6E9.js";function sr(s){var n;let t,r=(v.title??((n=v.og)==null?void 0:n.title))+"",a;return{c(){t=k("h1"),a=He(r),this.h()},l(c){t=w(c,"H1",{class:!0});var y=Xa(t);a=ke(y,r),y.forEach(o),this.h()},h(){h(t,"class","title")},m(c,y){l(c,t,y),Ia(t,a)},p:pe,d(c){c&&o(t)}}}function nr(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:pe,p:pe,d:pe}}function or(s){var y;let t,r,a,n,c;return document.title=t=v.title??((y=v.og)==null?void 0:y.title),{c(){r=f(),a=k("meta"),n=f(),c=k("meta"),this.h()},l(m){r=g(m),a=w(m,"META",{property:!0,content:!0}),n=g(m),c=w(m,"META",{name:!0,content:!0}),this.h()},h(){var m,p;h(a,"property","og:title"),h(a,"content",((m=v.og)==null?void 0:m.title)??v.title),h(c,"name","twitter:title"),h(c,"content",((p=v.og)==null?void 0:p.title)??v.title)},m(m,p){l(m,r,p),l(m,a,p),l(m,n,p),l(m,c,p)},p(m,p){var M;p&0&&t!==(t=v.title??((M=v.og)==null?void 0:M.title))&&(document.title=t)},d(m){m&&(o(r),o(a),o(n),o(c))}}}function lr(s){var c,y;let t,r,a=(v.description||((c=v.og)==null?void 0:c.description))&&cr(),n=((y=v.og)==null?void 0:y.image)&&_r();return{c(){a&&a.c(),t=f(),n&&n.c(),r=Ba()},l(m){a&&a.l(m),t=g(m),n&&n.l(m),r=Ba()},m(m,p){a&&a.m(m,p),l(m,t,p),n&&n.m(m,p),l(m,r,p)},p(m,p){var M,O;(v.description||(M=v.og)!=null&&M.description)&&a.p(m,p),(O=v.og)!=null&&O.image&&n.p(m,p)},d(m){m&&(o(t),o(r)),a&&a.d(m),n&&n.d(m)}}}function cr(s){let t,r,a,n,c;return{c(){t=k("meta"),r=f(),a=k("meta"),n=f(),c=k("meta"),this.h()},l(y){t=w(y,"META",{name:!0,content:!0}),r=g(y),a=w(y,"META",{property:!0,content:!0}),n=g(y),c=w(y,"META",{name:!0,content:!0}),this.h()},h(){var y,m,p;h(t,"name","description"),h(t,"content",v.description??((y=v.og)==null?void 0:y.description)),h(a,"property","og:description"),h(a,"content",((m=v.og)==null?void 0:m.description)??v.description),h(c,"name","twitter:description"),h(c,"content",((p=v.og)==null?void 0:p.description)??v.description)},m(y,m){l(y,t,m),l(y,r,m),l(y,a,m),l(y,n,m),l(y,c,m)},p:pe,d(y){y&&(o(t),o(r),o(a),o(n),o(c))}}}function _r(s){let t,r,a;return{c(){t=k("meta"),r=f(),a=k("meta"),this.h()},l(n){t=w(n,"META",{property:!0,content:!0}),r=g(n),a=w(n,"META",{name:!0,content:!0}),this.h()},h(){var n,c;h(t,"property","og:image"),h(t,"content",kt((n=v.og)==null?void 0:n.image)),h(a,"name","twitter:image"),h(a,"content",kt((c=v.og)==null?void 0:c.image))},m(n,c){l(n,t,c),l(n,r,c),l(n,a,c)},p:pe,d(n){n&&(o(t),o(r),o(a))}}}function $t(s){let t,r;return t=new la({props:{queryID:"district_name",queryResult:s[0]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&1&&(c.queryResult=a[0]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function jt(s){let t,r;return t=new la({props:{queryID:"children",queryResult:s[3]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&8&&(c.queryResult=a[3]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function xt(s){let t,r;return t=new la({props:{queryID:"stage_mix",queryResult:s[4]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&16&&(c.queryResult=a[4]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function St(s){let t,r;return t=new la({props:{queryID:"stage_mix_summary",queryResult:s[1]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&2&&(c.queryResult=a[1]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function dr(s){let t,r,a="counts and sums",n,c,y="methodology page",m;return{c(){t=He("Figures on this page are "),r=k("b"),r.textContent=a,n=He(` over this district's statistische Gebiete —
  never a separately re-scored index. See the `),c=k("a"),c.textContent=y,m=He(` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (via the Stadtteile listed
  further down) for its stage and trajectory.`),this.h()},l(p){t=ke(p,"Figures on this page are "),r=w(p,"B",{"data-svelte-h":!0}),T(r)!=="svelte-1143tv"&&(r.textContent=a),n=ke(p,` over this district's statistische Gebiete —
  never a separately re-scored index. See the `),c=w(p,"A",{href:!0,"data-svelte-h":!0}),T(c)!=="svelte-1l2pw3"&&(c.textContent=y),m=ke(p,` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (via the Stadtteile listed
  further down) for its stage and trajectory.`),this.h()},h(){h(c,"href","/gentriduck/methodology")},m(p,M){l(p,t,M),l(p,r,M),l(p,n,M),l(p,c,M),l(p,m,M)},p:pe,d(p){p&&(o(t),o(r),o(n),o(c),o(m))}}}function mr(s){let t,r;return t=new Va({props:{status:"warning",$$slots:{default:[gr]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[2]&32&&(c.$$scope={dirty:n,ctx:a}),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ur(s){let t,r;return{c(){t=k("p"),r=new Ct(!1),this.h()},l(a){t=w(a,"P",{});var n=Xa(t);r=Gt(n,!1),n.forEach(o),this.h()},h(){r.a=null},m(a,n){l(a,t,n),r.m(s[9],t)},p(a,n){n[0]&512&&r.p(a[9])},i:pe,o:pe,d(a){a&&o(t)}}}function gr(s){let t;return{c(){t=He("No Gebiet stage data available for this district.")},l(r){t=ke(r,"No Gebiet stage data available for this district.")},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function Tt(s){let t,r;return t=new la({props:{queryID:"trajectory_mix",queryResult:s[5]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&32&&(c.queryResult=a[5]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Mt(s){let t,r;return t=new la({props:{queryID:"trajectory_mix_summary",queryResult:s[2]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&4&&(c.queryResult=a[2]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function fr(s){let t,r;return t=new Va({props:{status:"warning",$$slots:{default:[pr]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[2]&32&&(c.$$scope={dirty:n,ctx:a}),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function hr(s){let t,r;return{c(){t=k("p"),r=new Ct(!1),this.h()},l(a){t=w(a,"P",{});var n=Xa(t);r=Gt(n,!1),n.forEach(o),this.h()},h(){r.a=null},m(a,n){l(a,t,n),r.m(s[8],t)},p(a,n){n[0]&256&&r.p(a[8])},i:pe,o:pe,d(a){a&&o(t)}}}function pr(s){let t;return{c(){t=He("No Gebiet trajectory data available for this district within the 2019–2025 window.")},l(r){t=ke(r,"No Gebiet trajectory data available for this district within the 2019–2025 window.")},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function qt(s){let t,r;return t=new la({props:{queryID:"poi_mix",queryResult:s[6]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&64&&(c.queryResult=a[6]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function yr(s){let t;return{c(){t=He(`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page.`)},l(r){t=ke(r,`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function br(s){let t;return{c(){t=He(`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},l(r){t=ke(r,`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function vr(s){let t;return{c(){t=He(`Hamburg's population-register figures do exist at district level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},l(r){t=ke(r,`Hamburg's population-register figures do exist at district level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function wr(s){let t;return{c(){t=He(`This district's totals already appear as the comparison column on each of its Stadtteil and
  Gebiet pages. Berlin's district pages have no amenities section either; a district-level version
  would be new reader-facing copy, which the amenities sign-off asks to have re-checked first.`)},l(r){t=ke(r,`This district's totals already appear as the comparison column on each of its Stadtteil and
  Gebiet pages. Berlin's district pages have no amenities section either; a district-level version
  would be new reader-facing copy, which the amenities sign-off asks to have re-checked first.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function kr(s){let t;return{c(){t=He(`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at Stadtteil level,
  current state only), and its sign-off (#303) requires a Hamburg-specific methodology disclosure
  before any of it is shown publicly — that has not been done yet.`)},l(r){t=ke(r,`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at Stadtteil level,
  current state only), and its sign-off (#303) requires a Hamburg-specific methodology disclosure
  before any of it is shown publicly — that has not been done yet.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function Et(s){let t,r;return t=new la({props:{queryID:"minimap_areas",queryResult:s[7]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&128&&(c.queryResult=a[7]),t.$set(c)},i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Hr(s){let t,r;return t=new Vt({props:{id:"stadtteil_name",title:"Stadtteil"}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p:pe,i(a){r||(d(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function $r(s){var dt;let t,r,a,n,c,y,m,p,M,O,Pe,ee,_,ye,ca,be,ka=`<a href="/gentriduck/hamburg/area/district" class="markdown">All districts</a> · <a href="/gentriduck/hamburg/area" class="markdown">all Gebiete</a> ·
<a href="/gentriduck/hamburg/area-detail" class="markdown">district browse</a>`,Y,u,ne,P,Ue='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',ve,oe,da=`Every statistisches Gebiet in this district is individually classified into one of six
gentrification stages from Hamburg&#39;s own Sozialmonitoring (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This
page reports the <strong class="markdown">distribution</strong> of those Gebiet-level stages — never a single re-scored index
value for the district itself (same rule as Berlin&#39;s district pages;
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code>). Hamburg&#39;s stages are <strong class="markdown">not directly equivalent</strong> to
same-named Berlin stages (Hamburg&#39;s Dynamik window is 3 years, Berlin&#39;s 2;
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>).`,le,q,B,$e,ce,Oe,z,_e,X,ma=`Which Gebiete belong to this district comes from its Stadtteile (a source-provided attribute) and,
one level down, a spatial crosswalk assigning each Gebiet to the Stadtteil that contains it
(OA-D1b, #240).`,We,ae,je='<a href="#trajectory-mix-20192025">Trajectory mix, 2019–2025</a>',de,te,we,xe,Se,E,G,me,ue,Qe,re,Te='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ge,J,Ce='<a href="#mapped-places">Mapped places</a>',ze,Me,W,fe,V,ua=`These are OpenStreetMap-derived counts; OSM coverage is not spatially neutral (poorer or peripheral
areas tend to be less thoroughly mapped, Haklay 2010), so a low count can be a coverage gap rather
than a real absence. See the <a href="/gentriduck/hamburg/poi-map" class="markdown">Hamburg POI map</a> for the per-Gebiet picture.`,Je,ie,qe='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',he,K,Ye,se,ga='<a href="#within-group-dominance">Within-group dominance</a>',H,Z,Xe,U,fa='<a href="#people--structure">People &amp; structure</a>',Ha,Ve,$a,Le,Ka='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',ja,Ke,xa,Re,Za='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',Sa,Ze,Ta,Ne,et='<a href="#where-this-area-sits">Where this area sits</a>',Ma,ha,ea,qa,Fe,at='<a href="#stadtteile-in-this-district">Stadtteile in this district</a>',Ea,aa,Ga,ta,tt=`This table comes from <code>mart_area_hierarchy</code> (#302), a thin pass-through of Hamburg&#39;s
source-provided district attribute on its Stadtteil geodata — published without re-deciding it.`,Ca,Ae,rt='<a href="#honest-caveats">Honest caveats</a>',La,ra,it=`<li class="markdown"><strong class="markdown">District figures are counts and sums of its Gebiete, never a re-scored index</strong> — and this grain
will never show a single gentrification-index value, per the same ruling that governs Berlin&#39;s
district pages (<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code>, DECLINE).</li> <li class="markdown"><strong class="markdown">Hamburg&#39;s stages are not directly equivalent to same-named Berlin stages</strong> — Hamburg&#39;s Dynamik
window is 3 years, Berlin&#39;s 2 (<a href="/gentriduck/methodology" class="markdown">methodology §6</a>, points 1 and 4).</li> <li class="markdown"><strong class="markdown">The trajectory mix describes a recent ~6-year (2019–2025) window</strong>, not full history, and is a
<strong class="markdown">status-only classification</strong>, never a displacement verdict.</li> <li class="markdown"><strong class="markdown">Mapped-place counts come from OpenStreetMap</strong>, whose coverage varies by area and grew over time.</li> <li class="markdown"><strong class="markdown">Some Berlin sections are not shown for Hamburg</strong> — each with its reason in its own section
above. See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory and
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from Berlin&#39;s.</li>`,Ra,De,st='<a href="#further-reading">Further reading</a>',Na,ia,nt=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a>
(switch the area level to Bezirk for this district&#39;s stage mix on the map),
<a href="/gentriduck/hamburg/area-detail" class="markdown">browse by district</a> for this district&#39;s Gebiete ordered by stage, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,Fa,pa,Aa,_a,Da,Ie=typeof v<"u"&&(v.title||((dt=v.og)==null?void 0:dt.title))&&v.hide_title!==!0&&sr();function Lt(e,i){var ba;return typeof v<"u"&&(v.title||(ba=v.og)!=null&&ba.title)?or:nr}let ya=Lt()(s),Be=typeof v=="object"&&lr(),C=s[0]&&$t(s),L=s[3]&&jt(s),R=s[4]&&xt(s),N=s[1]&&St(s);O=new Ut({props:{crumbs:s[11]}}),ee=new Ot({props:{title:s[10]}}),ye=new Jt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]?s[0][0].area_name:"District")+" — district profile",lede:"Neighbourhood-stage mix, trajectory mix, and commercial mix for this district, counted from its constituent statistische Gebiete — never a re-scored index at this grain."}}),u=new Va({props:{status:"info",$$slots:{default:[dr]},$$scope:{ctx:s}}});const ot=[ur,mr],sa=[];function lt(e,i){return e[9]?0:1}q=lt(s),B=sa[q]=ot[q](s),ce=new Ya({props:{data:s[4],x:"stage",y:"n_areas",title:"Gebiete by current stage, "+(s[0][0]?s[0][0].area_name:"this district"),swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}},emptySet:"warn",emptyMessage:"No Gebiet stage data for this district."}}),z=new Yt({}),te=new zt({props:{subject:"each Gebiet"}});let F=s[5]&&Tt(s),A=s[2]&&Mt(s);const ct=[hr,fr],na=[];function _t(e,i){return e[8]?0:1}E=_t(s),G=na[E]=ct[E](s),ue=new Ya({props:{data:s[5],x:"trajectory_type",y:"n_areas",title:"Gebiete by trajectory classification, 2019–2025 ("+(s[0][0]?s[0][0].area_name:"this district")+")",swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet trajectory data for this district."}});let D=s[6]&&qt(s);W=new Ya({props:{data:s[6],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(s[0][0]?s[0][0].area_name:"this district"),swapXY:"true",emptySet:"warn",emptyMessage:"No mapped places recorded for this district."}}),K=new va({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"This district's Offering Advantage roll-up (Berlin's district pages show one per domain)",$$slots:{default:[yr]},$$scope:{ctx:s}}}),Z=new va({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Within-group dominance for this district's Gebiete",$$slots:{default:[br]},$$scope:{ctx:s}}}),Ve=new va({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Population and composition sums for this district",$$slots:{default:[vr]},$$scope:{ctx:s}}}),Ke=new va({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"An amenities table for the district as a whole",$$slots:{default:[wr]},$$scope:{ctx:s}}}),Ze=new va({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Land value and estimated rent for this district",$$slots:{default:[kr]},$$scope:{ctx:s}}});let I=s[7]&&Et(s);return ea=new Wt({props:{data:s[7],geoJsonUrl:`${wa}/geo/district_subarea_l1_drilldown.geojson`,title:(s[0][0]?s[0][0].area_name:"This district")+" and its Stadtteile"}}),aa=new Xt({props:{data:s[3],rows:"25",link:"stadtteil_link",emptySet:"warn",emptyMessage:"No constituent Stadtteile found for this district.",$$slots:{default:[Hr]},$$scope:{ctx:s}}}),_a=new Qt({}),{c(){Ie&&Ie.c(),t=f(),ya.c(),r=k("meta"),a=k("meta"),Be&&Be.c(),n=Ba(),c=f(),C&&C.c(),y=f(),L&&L.c(),m=f(),R&&R.c(),p=f(),N&&N.c(),M=f(),S(O.$$.fragment),Pe=f(),S(ee.$$.fragment),_=f(),S(ye.$$.fragment),ca=f(),be=k("p"),be.innerHTML=ka,Y=f(),S(u.$$.fragment),ne=f(),P=k("h2"),P.innerHTML=Ue,ve=f(),oe=k("p"),oe.innerHTML=da,le=f(),B.c(),$e=f(),S(ce.$$.fragment),Oe=f(),S(z.$$.fragment),_e=f(),X=k("p"),X.textContent=ma,We=f(),ae=k("h3"),ae.innerHTML=je,de=f(),S(te.$$.fragment),we=f(),F&&F.c(),xe=f(),A&&A.c(),Se=f(),G.c(),me=f(),S(ue.$$.fragment),Qe=f(),re=k("h2"),re.innerHTML=Te,ge=f(),J=k("h3"),J.innerHTML=Ce,ze=f(),D&&D.c(),Me=f(),S(W.$$.fragment),fe=f(),V=k("p"),V.innerHTML=ua,Je=f(),ie=k("h3"),ie.innerHTML=qe,he=f(),S(K.$$.fragment),Ye=f(),se=k("h2"),se.innerHTML=ga,H=f(),S(Z.$$.fragment),Xe=f(),U=k("h2"),U.innerHTML=fa,Ha=f(),S(Ve.$$.fragment),$a=f(),Le=k("h2"),Le.innerHTML=Ka,ja=f(),S(Ke.$$.fragment),xa=f(),Re=k("h2"),Re.innerHTML=Za,Sa=f(),S(Ze.$$.fragment),Ta=f(),Ne=k("h2"),Ne.innerHTML=et,Ma=f(),I&&I.c(),ha=f(),S(ea.$$.fragment),qa=f(),Fe=k("h3"),Fe.innerHTML=at,Ea=f(),S(aa.$$.fragment),Ga=f(),ta=k("p"),ta.innerHTML=tt,Ca=f(),Ae=k("h2"),Ae.innerHTML=rt,La=f(),ra=k("ul"),ra.innerHTML=it,Ra=f(),De=k("h2"),De.innerHTML=st,Na=f(),ia=k("p"),ia.innerHTML=nt,Fa=f(),pa=k("hr"),Aa=f(),S(_a.$$.fragment),this.h()},l(e){Ie&&Ie.l(e),t=g(e);const i=Nt("svelte-2igo1p",document.head);ya.l(i),r=w(i,"META",{name:!0,content:!0}),a=w(i,"META",{name:!0,content:!0}),Be&&Be.l(i),n=Ba(),i.forEach(o),c=g(e),C&&C.l(e),y=g(e),L&&L.l(e),m=g(e),R&&R.l(e),p=g(e),N&&N.l(e),M=g(e),x(O.$$.fragment,e),Pe=g(e),x(ee.$$.fragment,e),_=g(e),x(ye.$$.fragment,e),ca=g(e),be=w(e,"P",{class:!0,"data-svelte-h":!0}),T(be)!=="svelte-16m0l3c"&&(be.innerHTML=ka),Y=g(e),x(u.$$.fragment,e),ne=g(e),P=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(P)!=="svelte-14f17uo"&&(P.innerHTML=Ue),ve=g(e),oe=w(e,"P",{class:!0,"data-svelte-h":!0}),T(oe)!=="svelte-12v8cww"&&(oe.innerHTML=da),le=g(e),B.l(e),$e=g(e),x(ce.$$.fragment,e),Oe=g(e),x(z.$$.fragment,e),_e=g(e),X=w(e,"P",{class:!0,"data-svelte-h":!0}),T(X)!=="svelte-hjmoet"&&(X.textContent=ma),We=g(e),ae=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(ae)!=="svelte-1mar2ld"&&(ae.innerHTML=je),de=g(e),x(te.$$.fragment,e),we=g(e),F&&F.l(e),xe=g(e),A&&A.l(e),Se=g(e),G.l(e),me=g(e),x(ue.$$.fragment,e),Qe=g(e),re=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(re)!=="svelte-1i9w9pn"&&(re.innerHTML=Te),ge=g(e),J=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(J)!=="svelte-3hvew3"&&(J.innerHTML=Ce),ze=g(e),D&&D.l(e),Me=g(e),x(W.$$.fragment,e),fe=g(e),V=w(e,"P",{class:!0,"data-svelte-h":!0}),T(V)!=="svelte-bgis0r"&&(V.innerHTML=ua),Je=g(e),ie=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(ie)!=="svelte-5mc7pd"&&(ie.innerHTML=qe),he=g(e),x(K.$$.fragment,e),Ye=g(e),se=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(se)!=="svelte-4kb45v"&&(se.innerHTML=ga),H=g(e),x(Z.$$.fragment,e),Xe=g(e),U=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(U)!=="svelte-1mdzqzc"&&(U.innerHTML=fa),Ha=g(e),x(Ve.$$.fragment,e),$a=g(e),Le=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Le)!=="svelte-12k6lqd"&&(Le.innerHTML=Ka),ja=g(e),x(Ke.$$.fragment,e),xa=g(e),Re=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Re)!=="svelte-13a10dj"&&(Re.innerHTML=Za),Sa=g(e),x(Ze.$$.fragment,e),Ta=g(e),Ne=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Ne)!=="svelte-60cjj9"&&(Ne.innerHTML=et),Ma=g(e),I&&I.l(e),ha=g(e),x(ea.$$.fragment,e),qa=g(e),Fe=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(Fe)!=="svelte-scaxt8"&&(Fe.innerHTML=at),Ea=g(e),x(aa.$$.fragment,e),Ga=g(e),ta=w(e,"P",{class:!0,"data-svelte-h":!0}),T(ta)!=="svelte-31o8ui"&&(ta.innerHTML=tt),Ca=g(e),Ae=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Ae)!=="svelte-ad0syq"&&(Ae.innerHTML=rt),La=g(e),ra=w(e,"UL",{class:!0,"data-svelte-h":!0}),T(ra)!=="svelte-8ltyej"&&(ra.innerHTML=it),Ra=g(e),De=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(De)!=="svelte-oimjns"&&(De.innerHTML=st),Na=g(e),ia=w(e,"P",{class:!0,"data-svelte-h":!0}),T(ia)!=="svelte-15bq7e6"&&(ia.innerHTML=nt),Fa=g(e),pa=w(e,"HR",{class:!0}),Aa=g(e),x(_a.$$.fragment,e),this.h()},h(){h(r,"name","twitter:card"),h(r,"content","summary_large_image"),h(a,"name","twitter:site"),h(a,"content","@evidence_dev"),h(be,"class","markdown"),h(P,"class","markdown"),h(P,"id","social-status--trajectory"),h(oe,"class","markdown"),h(X,"class","markdown"),h(ae,"class","markdown"),h(ae,"id","trajectory-mix-20192025"),h(re,"class","markdown"),h(re,"id","commercial-mix--offering-advantage"),h(J,"class","markdown"),h(J,"id","mapped-places"),h(V,"class","markdown"),h(ie,"class","markdown"),h(ie,"id","offering-advantage-across-the-area-hierarchy"),h(se,"class","markdown"),h(se,"id","within-group-dominance"),h(U,"class","markdown"),h(U,"id","people--structure"),h(Le,"class","markdown"),h(Le,"id","amenities--everyday-infrastructure"),h(Re,"class","markdown"),h(Re,"id","land-value--estimated-rent"),h(Ne,"class","markdown"),h(Ne,"id","where-this-area-sits"),h(Fe,"class","markdown"),h(Fe,"id","stadtteile-in-this-district"),h(ta,"class","markdown"),h(Ae,"class","markdown"),h(Ae,"id","honest-caveats"),h(ra,"class","markdown"),h(De,"class","markdown"),h(De,"id","further-reading"),h(ia,"class","markdown"),h(pa,"class","markdown")},m(e,i){Ie&&Ie.m(e,i),l(e,t,i),ya.m(document.head,null),Ia(document.head,r),Ia(document.head,a),Be&&Be.m(document.head,null),Ia(document.head,n),l(e,c,i),C&&C.m(e,i),l(e,y,i),L&&L.m(e,i),l(e,m,i),R&&R.m(e,i),l(e,p,i),N&&N.m(e,i),l(e,M,i),j(O,e,i),l(e,Pe,i),j(ee,e,i),l(e,_,i),j(ye,e,i),l(e,ca,i),l(e,be,i),l(e,Y,i),j(u,e,i),l(e,ne,i),l(e,P,i),l(e,ve,i),l(e,oe,i),l(e,le,i),sa[q].m(e,i),l(e,$e,i),j(ce,e,i),l(e,Oe,i),j(z,e,i),l(e,_e,i),l(e,X,i),l(e,We,i),l(e,ae,i),l(e,de,i),j(te,e,i),l(e,we,i),F&&F.m(e,i),l(e,xe,i),A&&A.m(e,i),l(e,Se,i),na[E].m(e,i),l(e,me,i),j(ue,e,i),l(e,Qe,i),l(e,re,i),l(e,ge,i),l(e,J,i),l(e,ze,i),D&&D.m(e,i),l(e,Me,i),j(W,e,i),l(e,fe,i),l(e,V,i),l(e,Je,i),l(e,ie,i),l(e,he,i),j(K,e,i),l(e,Ye,i),l(e,se,i),l(e,H,i),j(Z,e,i),l(e,Xe,i),l(e,U,i),l(e,Ha,i),j(Ve,e,i),l(e,$a,i),l(e,Le,i),l(e,ja,i),j(Ke,e,i),l(e,xa,i),l(e,Re,i),l(e,Sa,i),j(Ze,e,i),l(e,Ta,i),l(e,Ne,i),l(e,Ma,i),I&&I.m(e,i),l(e,ha,i),j(ea,e,i),l(e,qa,i),l(e,Fe,i),l(e,Ea,i),j(aa,e,i),l(e,Ga,i),l(e,ta,i),l(e,Ca,i),l(e,Ae,i),l(e,La,i),l(e,ra,i),l(e,Ra,i),l(e,De,i),l(e,Na,i),l(e,ia,i),l(e,Fa,i),l(e,pa,i),l(e,Aa,i),j(_a,e,i),Da=!0},p(e,i){var vt;typeof v<"u"&&(v.title||(vt=v.og)!=null&&vt.title)&&v.hide_title!==!0&&Ie.p(e,i),ya.p(e,i),typeof v=="object"&&Be.p(e,i),e[0]?C?(C.p(e,i),i[0]&1&&d(C,1)):(C=$t(e),C.c(),d(C,1),C.m(y.parentNode,y)):C&&(Ge(),b(C,1,1,()=>{C=null}),Ee()),e[3]?L?(L.p(e,i),i[0]&8&&d(L,1)):(L=jt(e),L.c(),d(L,1),L.m(m.parentNode,m)):L&&(Ge(),b(L,1,1,()=>{L=null}),Ee()),e[4]?R?(R.p(e,i),i[0]&16&&d(R,1)):(R=xt(e),R.c(),d(R,1),R.m(p.parentNode,p)):R&&(Ge(),b(R,1,1,()=>{R=null}),Ee()),e[1]?N?(N.p(e,i),i[0]&2&&d(N,1)):(N=St(e),N.c(),d(N,1),N.m(M.parentNode,M)):N&&(Ge(),b(N,1,1,()=>{N=null}),Ee());const ba={};i[0]&2048&&(ba.crumbs=e[11]),O.$set(ba);const mt={};i[0]&1024&&(mt.title=e[10]),ee.$set(mt);const ut={};i[0]&1&&(ut.title=(e[0][0]?e[0][0].area_name:"District")+" — district profile"),ye.$set(ut);const gt={};i[2]&32&&(gt.$$scope={dirty:i,ctx:e}),u.$set(gt);let Pa=q;q=lt(e),q===Pa?sa[q].p(e,i):(Ge(),b(sa[Pa],1,1,()=>{sa[Pa]=null}),Ee(),B=sa[q],B?B.p(e,i):(B=sa[q]=ot[q](e),B.c()),d(B,1),B.m($e.parentNode,$e));const Ua={};i[0]&16&&(Ua.data=e[4]),i[0]&1&&(Ua.title="Gebiete by current stage, "+(e[0][0]?e[0][0].area_name:"this district")),ce.$set(Ua),e[5]?F?(F.p(e,i),i[0]&32&&d(F,1)):(F=Tt(e),F.c(),d(F,1),F.m(xe.parentNode,xe)):F&&(Ge(),b(F,1,1,()=>{F=null}),Ee()),e[2]?A?(A.p(e,i),i[0]&4&&d(A,1)):(A=Mt(e),A.c(),d(A,1),A.m(Se.parentNode,Se)):A&&(Ge(),b(A,1,1,()=>{A=null}),Ee());let Oa=E;E=_t(e),E===Oa?na[E].p(e,i):(Ge(),b(na[Oa],1,1,()=>{na[Oa]=null}),Ee(),G=na[E],G?G.p(e,i):(G=na[E]=ct[E](e),G.c()),d(G,1),G.m(me.parentNode,me));const Wa={};i[0]&32&&(Wa.data=e[5]),i[0]&1&&(Wa.title="Gebiete by trajectory classification, 2019–2025 ("+(e[0][0]?e[0][0].area_name:"this district")+")"),ue.$set(Wa),e[6]?D?(D.p(e,i),i[0]&64&&d(D,1)):(D=qt(e),D.c(),d(D,1),D.m(Me.parentNode,Me)):D&&(Ge(),b(D,1,1,()=>{D=null}),Ee());const Qa={};i[0]&64&&(Qa.data=e[6]),i[0]&1&&(Qa.title="Mapped places by category (latest snapshot), "+(e[0][0]?e[0][0].area_name:"this district")),W.$set(Qa);const ft={};i[2]&32&&(ft.$$scope={dirty:i,ctx:e}),K.$set(ft);const ht={};i[2]&32&&(ht.$$scope={dirty:i,ctx:e}),Z.$set(ht);const pt={};i[2]&32&&(pt.$$scope={dirty:i,ctx:e}),Ve.$set(pt);const yt={};i[2]&32&&(yt.$$scope={dirty:i,ctx:e}),Ke.$set(yt);const bt={};i[2]&32&&(bt.$$scope={dirty:i,ctx:e}),Ze.$set(bt),e[7]?I?(I.p(e,i),i[0]&128&&d(I,1)):(I=Et(e),I.c(),d(I,1),I.m(ha.parentNode,ha)):I&&(Ge(),b(I,1,1,()=>{I=null}),Ee());const za={};i[0]&128&&(za.data=e[7]),i[0]&1&&(za.title=(e[0][0]?e[0][0].area_name:"This district")+" and its Stadtteile"),ea.$set(za);const Ja={};i[0]&8&&(Ja.data=e[3]),i[2]&32&&(Ja.$$scope={dirty:i,ctx:e}),aa.$set(Ja)},i(e){Da||(d(C),d(L),d(R),d(N),d(O.$$.fragment,e),d(ee.$$.fragment,e),d(ye.$$.fragment,e),d(u.$$.fragment,e),d(B),d(ce.$$.fragment,e),d(z.$$.fragment,e),d(te.$$.fragment,e),d(F),d(A),d(G),d(ue.$$.fragment,e),d(D),d(W.$$.fragment,e),d(K.$$.fragment,e),d(Z.$$.fragment,e),d(Ve.$$.fragment,e),d(Ke.$$.fragment,e),d(Ze.$$.fragment,e),d(I),d(ea.$$.fragment,e),d(aa.$$.fragment,e),d(_a.$$.fragment,e),Da=!0)},o(e){b(C),b(L),b(R),b(N),b(O.$$.fragment,e),b(ee.$$.fragment,e),b(ye.$$.fragment,e),b(u.$$.fragment,e),b(B),b(ce.$$.fragment,e),b(z.$$.fragment,e),b(te.$$.fragment,e),b(F),b(A),b(G),b(ue.$$.fragment,e),b(D),b(W.$$.fragment,e),b(K.$$.fragment,e),b(Z.$$.fragment,e),b(Ve.$$.fragment,e),b(Ke.$$.fragment,e),b(Ze.$$.fragment,e),b(I),b(ea.$$.fragment,e),b(aa.$$.fragment,e),b(_a.$$.fragment,e),Da=!1},d(e){e&&(o(t),o(c),o(y),o(m),o(p),o(M),o(Pe),o(_),o(ca),o(be),o(Y),o(ne),o(P),o(ve),o(oe),o(le),o($e),o(Oe),o(_e),o(X),o(We),o(ae),o(de),o(we),o(xe),o(Se),o(me),o(Qe),o(re),o(ge),o(J),o(ze),o(Me),o(fe),o(V),o(Je),o(ie),o(he),o(Ye),o(se),o(H),o(Xe),o(U),o(Ha),o($a),o(Le),o(ja),o(xa),o(Re),o(Sa),o(Ta),o(Ne),o(Ma),o(ha),o(qa),o(Fe),o(Ea),o(Ga),o(ta),o(Ca),o(Ae),o(La),o(ra),o(Ra),o(De),o(Na),o(ia),o(Fa),o(pa),o(Aa)),Ie&&Ie.d(e),ya.d(e),o(r),o(a),Be&&Be.d(e),o(n),C&&C.d(e),L&&L.d(e),R&&R.d(e),N&&N.d(e),$(O,e),$(ee,e),$(ye,e),$(u,e),sa[q].d(e),$(ce,e),$(z,e),$(te,e),F&&F.d(e),A&&A.d(e),na[E].d(e),$(ue,e),D&&D.d(e),$(W,e),$(K,e),$(Z,e),$(Ve,e),$(Ke,e),$(Ze,e),I&&I.d(e),$(ea,e),$(aa,e),$(_a,e)}}}const v={};function jr(s,t,r){let a,n,c,y,m,p,M,O,Pe;wt(s,rr,H=>r(50,O=H)),wt(s,Ht,H=>r(55,Pe=H));let{data:ee}=t,{data:_={},customFormattingSettings:ye,__db:ca,inputs:be}=ee;Ft(Ht,Pe="d6a6300928ebef6b83290955a7a91efd",Pe);let ka=Zt(Kt(be));At(ka.subscribe(H=>be=H)),Dt(tr,{getCustomFormats:()=>ye.customFormats||[]});const Y=(H,Z)=>ir(ca.query,H,{query_name:Z});er(Y);let u=O.params;It(()=>!0);let ne={initialData:void 0,initialError:void 0},P=Q`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`,Ue=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`;_.district_name_data&&(_.district_name_data instanceof Error?ne.initialError=_.district_name_data:ne.initialData=_.district_name_data,_.district_name_columns&&(ne.knownColumns=_.district_name_columns));let ve,oe=!1;const da=oa.createReactive({callback:H=>{r(0,ve=H)},execFn:Y},{id:"district_name",...ne});da(Ue,{noResolve:P,...ne}),globalThis[Symbol.for("district_name")]={get value(){return ve}};let le={initialData:void 0,initialError:void 0},q=Q`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only.
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    '/hamburg/area/subarea_l1/' || h.area_code as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`,B=`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only.
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    '/hamburg/area/subarea_l1/' || h.area_code as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`;_.children_data&&(_.children_data instanceof Error?le.initialError=_.children_data:le.initialData=_.children_data,_.children_columns&&(le.knownColumns=_.children_columns));let $e,ce=!1;const Oe=oa.createReactive({callback:H=>{r(3,$e=H)},execFn:Y},{id:"children",...le});Oe(B,{noResolve:q,...le}),globalThis[Symbol.for("children")]={get value(){return $e}};let z={initialData:void 0,initialError:void 0},_e=Q`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as g2
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g2.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${u.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`,X=`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as g2
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g2.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${u.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`;_.stage_mix_data&&(_.stage_mix_data instanceof Error?z.initialError=_.stage_mix_data:z.initialData=_.stage_mix_data,_.stage_mix_columns&&(z.knownColumns=_.stage_mix_columns));let ma,We=!1;const ae=oa.createReactive({callback:H=>{r(4,ma=H)},execFn:Y},{id:"stage_mix",...z});ae(X,{noResolve:_e,...z}),globalThis[Symbol.for("stage_mix")]={get value(){return ma}};let je={initialData:void 0,initialError:void 0},de=Q`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = g2.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
            and g1.parent_area_code = '${u.code}' and gi.stage_number is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`,te=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = g2.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
            and g1.parent_area_code = '${u.code}' and gi.stage_number is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`;_.stage_mix_summary_data&&(_.stage_mix_summary_data instanceof Error?je.initialError=_.stage_mix_summary_data:je.initialData=_.stage_mix_summary_data,_.stage_mix_summary_columns&&(je.knownColumns=_.stage_mix_summary_columns));let we,xe=!1;const Se=oa.createReactive({callback:H=>{r(1,we=H)},execFn:Y},{id:"stage_mix_summary",...je});Se(te,{noResolve:de,...je}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return we}};let E={initialData:void 0,initialError:void 0},G=Q`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
-- join (district -> subarea_l1 -> subarea_l2) through mart_area_hierarchy (#302, I21-h) against
-- fct_gentrification_trajectory (Hamburg admitted #314), same distribution-not-point-value
-- discipline as pages/berlin/area/bezirk/[code].md's own stage_mix query, applied to the
-- newly-admitted trajectory mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = t.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${u.code}'
group by all
order by n_areas desc`,me=`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
-- join (district -> subarea_l1 -> subarea_l2) through mart_area_hierarchy (#302, I21-h) against
-- fct_gentrification_trajectory (Hamburg admitted #314), same distribution-not-point-value
-- discipline as pages/berlin/area/bezirk/[code].md's own stage_mix query, applied to the
-- newly-admitted trajectory mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = t.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${u.code}'
group by all
order by n_areas desc`;_.trajectory_mix_data&&(_.trajectory_mix_data instanceof Error?E.initialError=_.trajectory_mix_data:E.initialData=_.trajectory_mix_data,_.trajectory_mix_columns&&(E.knownColumns=_.trajectory_mix_columns));let ue,Qe=!1;const re=oa.createReactive({callback:H=>{r(5,ue=H)},execFn:Y},{id:"trajectory_mix",...E});re(me,{noResolve:G,...E}),globalThis[Symbol.for("trajectory_mix")]={get value(){return ue}};let Te={initialData:void 0,initialError:void 0},ge=Q`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as g2
            on
                g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
                and g2.area_code = t.area_code
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on
                g1.city_code = 'HH' and g1.area_level = 'subarea_l1'
                and g1.area_code = g2.parent_area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and g1.parent_area_code = '${u.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`,J=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as g2
            on
                g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
                and g2.area_code = t.area_code
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on
                g1.city_code = 'HH' and g1.area_level = 'subarea_l1'
                and g1.area_code = g2.parent_area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and g1.parent_area_code = '${u.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`;_.trajectory_mix_summary_data&&(_.trajectory_mix_summary_data instanceof Error?Te.initialError=_.trajectory_mix_summary_data:Te.initialData=_.trajectory_mix_summary_data,_.trajectory_mix_summary_columns&&(Te.knownColumns=_.trajectory_mix_summary_columns));let Ce,ze=!1;const Me=oa.createReactive({callback:H=>{r(2,Ce=H)},execFn:Y},{id:"trajectory_mix_summary",...Te});Me(J,{noResolve:ge,...Te}),globalThis[Symbol.for("trajectory_mix_summary")]={get value(){return Ce}};let W={initialData:void 0,initialError:void 0},fe=Q`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
-- mart_area_hierarchy -- same shape as Berlin's district-page poi_mix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = f.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and g1.parent_area_code = '${u.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`,V=`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
-- mart_area_hierarchy -- same shape as Berlin's district-page poi_mix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = f.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and g1.parent_area_code = '${u.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`;_.poi_mix_data&&(_.poi_mix_data instanceof Error?W.initialError=_.poi_mix_data:W.initialData=_.poi_mix_data,_.poi_mix_columns&&(W.knownColumns=_.poi_mix_columns));let ua,Je=!1;const ie=oa.createReactive({callback:H=>{r(6,ua=H)},execFn:Y},{id:"poi_mix",...W});ie(V,{noResolve:fe,...W}),globalThis[Symbol.for("poi_mix")]={get value(){return ua}};let qe={initialData:void 0,initialError:void 0},he=Q`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${wa}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`,K=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${wa}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`;_.minimap_areas_data&&(_.minimap_areas_data instanceof Error?qe.initialError=_.minimap_areas_data:qe.initialData=_.minimap_areas_data,_.minimap_areas_columns&&(qe.knownColumns=_.minimap_areas_columns));let Ye,se=!1;const ga=oa.createReactive({callback:H=>{r(7,Ye=H)},execFn:Y},{id:"minimap_areas",...qe});return ga(K,{noResolve:he,...qe}),globalThis[Symbol.for("minimap_areas")]={get value(){return Ye}},s.$$set=H=>{"data"in H&&r(12,ee=H.data)},s.$$.update=()=>{var H;s.$$.dirty[0]&4096&&r(13,{data:_={},customFormattingSettings:ye,__db:ca}=ee,_),s.$$.dirty[0]&8192&&ar.set(Object.keys(_).length>0),s.$$.dirty[1]&524288&&r(14,u=O.params),s.$$.dirty[0]&16384&&r(16,P=Q`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`),s.$$.dirty[0]&16384&&r(17,Ue=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`),s.$$.dirty[0]&491520&&(P||!oe?P||(da(Ue,{noResolve:P,...ne}),r(18,oe=!0)):da(Ue,{noResolve:P})),s.$$.dirty[0]&16384&&r(20,q=Q`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only.
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    '/hamburg/area/subarea_l1/' || h.area_code as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`),s.$$.dirty[0]&16384&&r(21,B=`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only.
select
    h.area_code as stadtteil_code,
    coalesce(g.area_name, h.area_code) as stadtteil_name,
    '/hamburg/area/subarea_l1/' || h.area_code as stadtteil_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`),s.$$.dirty[0]&7864320&&(q||!ce?q||(Oe(B,{noResolve:q,...le}),r(22,ce=!0)):Oe(B,{noResolve:q})),s.$$.dirty[0]&16384&&r(24,_e=Q`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as g2
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g2.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${u.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),s.$$.dirty[0]&16384&&r(25,X=`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    -- #358: dbt display label (spec §1); unscored Gebiete read "No stage on record".
    coalesce(gi.stage_label, 'No stage on record') as stage,
    gi.stage_number,
    count(*) as n_areas
from gentriduck_marts.mart_area_hierarchy as g2
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
left join
    gentriduck_marts.gentrification_index as gi
    on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
    and gi.area_code = g2.area_code
    and gi.period_yyyymm = (
        select max(period_yyyymm)
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
    )
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${u.code}'
group by all
-- #358 review (web finding 4): cycle order, rendered unsorted (sort=false).
order by stage_number nulls last`),s.$$.dirty[0]&125829120&&(_e||!We?_e||(ae(X,{noResolve:_e,...z}),r(26,We=!0)):ae(X,{noResolve:_e})),s.$$.dirty[0]&16384&&r(28,de=Q`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = g2.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
            and g1.parent_area_code = '${u.code}' and gi.stage_number is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&16384&&r(29,te=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.stage_label as stage, gi.stage_number, count(*) as n_areas
        from gentriduck_marts.mart_area_hierarchy as g2
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
        join
            gentriduck_marts.gentrification_index as gi
            on gi.city_code = 'HH' and gi.variant = 'live_data' and gi.area_level = 'subarea_l2'
            and gi.area_code = g2.area_code
            and gi.period_yyyymm = (
                select max(period_yyyymm)
                from gentriduck_marts.gentrification_index
                where variant = 'live_data' and area_level = 'subarea_l2' and city_code = 'HH'
            )
        where
            g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
            and g1.parent_area_code = '${u.code}' and gi.stage_number is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&2013265920&&(de||!xe?de||(Se(te,{noResolve:de,...je}),r(30,xe=!0)):Se(te,{noResolve:de})),s.$$.dirty[0]&16384&&r(32,G=Q`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
-- join (district -> subarea_l1 -> subarea_l2) through mart_area_hierarchy (#302, I21-h) against
-- fct_gentrification_trajectory (Hamburg admitted #314), same distribution-not-point-value
-- discipline as pages/berlin/area/bezirk/[code].md's own stage_mix query, applied to the
-- newly-admitted trajectory mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = t.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${u.code}'
group by all
order by n_areas desc`),s.$$.dirty[0]&16384&&r(33,me=`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
-- join (district -> subarea_l1 -> subarea_l2) through mart_area_hierarchy (#302, I21-h) against
-- fct_gentrification_trajectory (Hamburg admitted #314), same distribution-not-point-value
-- discipline as pages/berlin/area/bezirk/[code].md's own stage_mix query, applied to the
-- newly-admitted trajectory mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = t.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${u.code}'
group by all
order by n_areas desc`),s.$$.dirty[1]&15&&(G||!Qe?G||(re(me,{noResolve:G,...E}),r(34,Qe=!0)):re(me,{noResolve:G})),s.$$.dirty[0]&16384&&r(36,ge=Q`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as g2
            on
                g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
                and g2.area_code = t.area_code
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on
                g1.city_code = 'HH' and g1.area_level = 'subarea_l1'
                and g1.area_code = g2.parent_area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and g1.parent_area_code = '${u.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`),s.$$.dirty[0]&16384&&r(37,J=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as g2
            on
                g2.city_code = 'HH' and g2.area_level = 'subarea_l2'
                and g2.area_code = t.area_code
        join
            gentriduck_marts.mart_area_hierarchy as g1
            on
                g1.city_code = 'HH' and g1.area_level = 'subarea_l1'
                and g1.area_code = g2.parent_area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and g1.parent_area_code = '${u.code}'
        group by all
    ),
    totals as (select sum(n_areas) as n_total from mix),
    top as (select trajectory_type, n_areas from mix order by n_areas desc limit 1),
    trending as (
        select coalesce(sum(n_areas), 0) as n_trending
        from mix
        where trajectory_type in ('improving', 'declining')
    )
select
    t.n_total,
    top.trajectory_type as top_type,
    top.n_areas as top_type_n,
    (top.n_areas::double / nullif(t.n_total, 0)) as top_type_share,
    tr.n_trending,
    (tr.n_trending::double / nullif(t.n_total, 0)) as trending_share
from totals as t cross join top cross join trending as tr`),s.$$.dirty[1]&240&&(ge||!ze?ge||(Me(J,{noResolve:ge,...Te}),r(38,ze=!0)):Me(J,{noResolve:ge})),s.$$.dirty[0]&16384&&r(40,fe=Q`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
-- mart_area_hierarchy -- same shape as Berlin's district-page poi_mix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = f.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and g1.parent_area_code = '${u.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`),s.$$.dirty[0]&16384&&r(41,V=`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
-- mart_area_hierarchy -- same shape as Berlin's district-page poi_mix.
select
    f.poi_category_h,
    sum(f.poi_count) as poi_count
from gentriduck_marts.fct_poi_development as f
join
    gentriduck_marts.mart_area_hierarchy as g2
    on g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g2.area_code = f.area_code
join
    gentriduck_marts.mart_area_hierarchy as g1
    on g1.city_code = 'HH' and g1.area_level = 'subarea_l1' and g1.area_code = g2.parent_area_code
where f.city_code = 'HH' and f.area_vintage = 'current'
  and g1.parent_area_code = '${u.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`),s.$$.dirty[1]&3840&&(fe||!Je?fe||(ie(V,{noResolve:fe,...W}),r(42,Je=!0)):ie(V,{noResolve:fe})),s.$$.dirty[0]&16384&&r(44,he=Q`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${wa}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`),s.$$.dirty[0]&16384&&r(45,K=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${wa}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`),s.$$.dirty[1]&61440&&(he||!se?he||(ga(K,{noResolve:he,...qe}),r(46,se=!0)):ga(K,{noResolve:he})),s.$$.dirty[0]&1&&r(49,a=((H=ve==null?void 0:ve[0])==null?void 0:H.area_name)??null),s.$$.dirty[1]&262144&&r(11,n=[{label:"Hamburg",href:"/hamburg"},{label:"District & area profiles",href:"/hamburg/area/district"},{label:a??"District"}]),s.$$.dirty[1]&262144&&r(10,c=a?`${a} — district profile · Hamburg`:null),s.$$.dirty[0]&2&&r(48,y=we==null?void 0:we[0]),s.$$.dirty[1]&131072&&r(9,m=!y||y.n_total==null||Number(y.n_total)===0?null:(()=>{const Z=Number(y.n_total),Xe=Number(y.n_advanced||0),U=y.top_stage_share!=null?Number(y.top_stage_share):null,fa=U!=null&&U>.5?`<b>${y.top_stage}</b> is the only stage holding a majority (${Math.round(U*100)}%)`:"no single stage holds a majority";return`<b>${Xe}</b> of <b>${Z}</b> Gebiete with a current stage here are classified <b>4 · Active gentrification</b> or <b>3 · Pioneer signal</b>; ${fa} — a distribution across this district's own Gebiete, never a single re-scored gentrification-index value for the district itself.`})()),s.$$.dirty[0]&4&&r(47,p=Ce==null?void 0:Ce[0]),s.$$.dirty[1]&65536&&r(8,M=!p||p.n_total==null||Number(p.n_total)===0?null:(()=>{const Z=Number(p.n_total),Xe=Number(p.n_trending||0),U=p.top_type_share!=null?Number(p.top_type_share):null,fa=U!=null&&U>.5?`<b>${p.top_type}</b> is the only trajectory type holding a majority (${Math.round(U*100)}%)`:"no single trajectory type holds a majority";return`<b>${Xe}</b> of <b>${Z}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${fa} — a distribution across this district's own Gebiete, never a single re-scored value for the district itself.`})())},[ve,we,Ce,$e,ma,ue,ua,Ye,M,m,c,n,ee,_,u,ne,P,Ue,oe,le,q,B,ce,z,_e,X,We,je,de,te,xe,E,G,me,Qe,Te,ge,J,ze,W,fe,V,Je,qe,he,K,se,p,y,a,O]}class Wr extends Bt{constructor(t){super(),Pt(this,t,jr,$r,Rt,{data:12},null,[-1,-1,-1])}}export{Wr as component};
