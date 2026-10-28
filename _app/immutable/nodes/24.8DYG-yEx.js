import{s as Gt,d as o,i as l,a as Da,b as h,c as g,h as Lt,e as w,f as Ia,k as T,l as f,m as k,n as bt,o as Rt,p as Ft,q as Nt,r as Dt,u as ye,g as Ja,j as ke,t as He,v as qt,H as Et}from"../chunks/scheduler.CmMeO4ay.js";import{S as It,i as At,d as $,t as b,a as u,c as Ce,m as j,b as x,e as S,g as Ge}from"../chunks/index.bfDa0Uqw.js";import{A as Bt,P as Ut,a as Pt}from"../chunks/PageTitle.nASIZfTP.js";import{F as Ot}from"../chunks/FooterNav.BbND9dxm.js";import{H as Wt}from"../chunks/HamburgTrajectoryNote.BKIaPPmK.js";import{H as Qt}from"../chunks/Hero.wYia6TQ0.js";import{N as ba}from"../chunks/NotYetPublished.BlNA0MP2.js";import{D as zt,C as Jt}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as va,w as Yt}from"../chunks/entry.vKQYRLhF.js";import{A as Ya}from"../chunks/Alert.BNZjDqvU.js";import{e as Xt,s as Vt,Q as sa,p as Kt,a as vt,r as wt,C as Zt}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as Y}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as er}from"../chunks/stores.CGa44sBH.js";import{Q as na}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as za}from"../chunks/BarChart.BZFK7Gke.js";import{p as ar}from"../chunks/profile.BW8tN6E9.js";function tr(s){var n;let t,r=(v.title??((n=v.og)==null?void 0:n.title))+"",a;return{c(){t=k("h1"),a=He(r),this.h()},l(c){t=w(c,"H1",{class:!0});var y=Ja(t);a=ke(y,r),y.forEach(o),this.h()},h(){h(t,"class","title")},m(c,y){l(c,t,y),Da(t,a)},p:ye,d(c){c&&o(t)}}}function rr(s){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:ye,p:ye,d:ye}}function ir(s){var y;let t,r,a,n,c;return document.title=t=v.title??((y=v.og)==null?void 0:y.title),{c(){r=f(),a=k("meta"),n=f(),c=k("meta"),this.h()},l(d){r=g(d),a=w(d,"META",{property:!0,content:!0}),n=g(d),c=w(d,"META",{name:!0,content:!0}),this.h()},h(){var d,p;h(a,"property","og:title"),h(a,"content",((d=v.og)==null?void 0:d.title)??v.title),h(c,"name","twitter:title"),h(c,"content",((p=v.og)==null?void 0:p.title)??v.title)},m(d,p){l(d,r,p),l(d,a,p),l(d,n,p),l(d,c,p)},p(d,p){var M;p&0&&t!==(t=v.title??((M=v.og)==null?void 0:M.title))&&(document.title=t)},d(d){d&&(o(r),o(a),o(n),o(c))}}}function sr(s){var c,y;let t,r,a=(v.description||((c=v.og)==null?void 0:c.description))&&nr(),n=((y=v.og)==null?void 0:y.image)&&or();return{c(){a&&a.c(),t=f(),n&&n.c(),r=Ia()},l(d){a&&a.l(d),t=g(d),n&&n.l(d),r=Ia()},m(d,p){a&&a.m(d,p),l(d,t,p),n&&n.m(d,p),l(d,r,p)},p(d,p){var M,U;(v.description||(M=v.og)!=null&&M.description)&&a.p(d,p),(U=v.og)!=null&&U.image&&n.p(d,p)},d(d){d&&(o(t),o(r)),a&&a.d(d),n&&n.d(d)}}}function nr(s){let t,r,a,n,c;return{c(){t=k("meta"),r=f(),a=k("meta"),n=f(),c=k("meta"),this.h()},l(y){t=w(y,"META",{name:!0,content:!0}),r=g(y),a=w(y,"META",{property:!0,content:!0}),n=g(y),c=w(y,"META",{name:!0,content:!0}),this.h()},h(){var y,d,p;h(t,"name","description"),h(t,"content",v.description??((y=v.og)==null?void 0:y.description)),h(a,"property","og:description"),h(a,"content",((d=v.og)==null?void 0:d.description)??v.description),h(c,"name","twitter:description"),h(c,"content",((p=v.og)==null?void 0:p.description)??v.description)},m(y,d){l(y,t,d),l(y,r,d),l(y,a,d),l(y,n,d),l(y,c,d)},p:ye,d(y){y&&(o(t),o(r),o(a),o(n),o(c))}}}function or(s){let t,r,a;return{c(){t=k("meta"),r=f(),a=k("meta"),this.h()},l(n){t=w(n,"META",{property:!0,content:!0}),r=g(n),a=w(n,"META",{name:!0,content:!0}),this.h()},h(){var n,c;h(t,"property","og:image"),h(t,"content",vt((n=v.og)==null?void 0:n.image)),h(a,"name","twitter:image"),h(a,"content",vt((c=v.og)==null?void 0:c.image))},m(n,c){l(n,t,c),l(n,r,c),l(n,a,c)},p:ye,d(n){n&&(o(t),o(r),o(a))}}}function kt(s){let t,r;return t=new na({props:{queryID:"district_name",queryResult:s[0]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&1&&(c.queryResult=a[0]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function Ht(s){let t,r;return t=new na({props:{queryID:"children",queryResult:s[3]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&8&&(c.queryResult=a[3]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function $t(s){let t,r;return t=new na({props:{queryID:"stage_mix",queryResult:s[4]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&16&&(c.queryResult=a[4]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function jt(s){let t,r;return t=new na({props:{queryID:"stage_mix_summary",queryResult:s[1]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&2&&(c.queryResult=a[1]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function lr(s){let t,r,a="counts and sums",n,c,y="methodology page",d;return{c(){t=He("Figures on this page are "),r=k("b"),r.textContent=a,n=He(` over this district's statistische Gebiete —
  never a separately re-scored index. See the `),c=k("a"),c.textContent=y,d=He(` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (via the Stadtteile listed
  further down) for its stage and trajectory.`),this.h()},l(p){t=ke(p,"Figures on this page are "),r=w(p,"B",{"data-svelte-h":!0}),T(r)!=="svelte-1143tv"&&(r.textContent=a),n=ke(p,` over this district's statistische Gebiete —
  never a separately re-scored index. See the `),c=w(p,"A",{href:!0,"data-svelte-h":!0}),T(c)!=="svelte-1l2pw3"&&(c.textContent=y),d=ke(p,` for why
  coarse-grain areas are not re-scored, and any Gebiet's own page (via the Stadtteile listed
  further down) for its stage and trajectory.`),this.h()},h(){h(c,"href","/gentriduck/methodology")},m(p,M){l(p,t,M),l(p,r,M),l(p,n,M),l(p,c,M),l(p,d,M)},p:ye,d(p){p&&(o(t),o(r),o(n),o(c),o(d))}}}function cr(s){let t,r;return t=new Ya({props:{status:"warning",$$slots:{default:[dr]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[2]&32&&(c.$$scope={dirty:n,ctx:a}),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function _r(s){let t,r;return{c(){t=k("p"),r=new Et(!1),this.h()},l(a){t=w(a,"P",{});var n=Ja(t);r=qt(n,!1),n.forEach(o),this.h()},h(){r.a=null},m(a,n){l(a,t,n),r.m(s[9],t)},p(a,n){n[0]&512&&r.p(a[9])},i:ye,o:ye,d(a){a&&o(t)}}}function dr(s){let t;return{c(){t=He("No Gebiet stage data available for this district.")},l(r){t=ke(r,"No Gebiet stage data available for this district.")},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function xt(s){let t,r;return t=new na({props:{queryID:"trajectory_mix",queryResult:s[5]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&32&&(c.queryResult=a[5]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function St(s){let t,r;return t=new na({props:{queryID:"trajectory_mix_summary",queryResult:s[2]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&4&&(c.queryResult=a[2]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function mr(s){let t,r;return t=new Ya({props:{status:"warning",$$slots:{default:[gr]},$$scope:{ctx:s}}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[2]&32&&(c.$$scope={dirty:n,ctx:a}),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function ur(s){let t,r;return{c(){t=k("p"),r=new Et(!1),this.h()},l(a){t=w(a,"P",{});var n=Ja(t);r=qt(n,!1),n.forEach(o),this.h()},h(){r.a=null},m(a,n){l(a,t,n),r.m(s[8],t)},p(a,n){n[0]&256&&r.p(a[8])},i:ye,o:ye,d(a){a&&o(t)}}}function gr(s){let t;return{c(){t=He("No Gebiet trajectory data available for this district within the 2019–2025 window.")},l(r){t=ke(r,"No Gebiet trajectory data available for this district within the 2019–2025 window.")},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function Tt(s){let t,r;return t=new na({props:{queryID:"poi_mix",queryResult:s[6]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&64&&(c.queryResult=a[6]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function fr(s){let t;return{c(){t=He(`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page.`)},l(r){t=ke(r,`The roll-up is computed for Hamburg in the data layer, but the site's data source keeps only
  Berlin's rows, and the scale-sensitivity (MAUP) disclosure that must accompany a roll-up has only
  been checked for Berlin. Each Gebiet's own Offering Advantage profile is on its page.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function hr(s){let t;return{c(){t=He(`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},l(r){t=ke(r,`The underlying mart carries Hamburg rows, but the site's data source deliberately restricts it to
  Berlin, and no sign-off has yet reviewed a Hamburg public view of it.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function pr(s){let t;return{c(){t=He(`Hamburg's population-register figures do exist at district level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},l(r){t=ke(r,`Hamburg's population-register figures do exist at district level, but the Hamburg demographics
  sign-off (#313) sets conditions for a Hamburg web page of its own (wording, no ranking, how merged
  Stadtteile and missing values are explained), and that page has not been built or reviewed yet.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function yr(s){let t;return{c(){t=He(`This district's totals already appear as the comparison column on each of its Stadtteil and
  Gebiet pages. Berlin's district pages have no amenities section either; a district-level version
  would be new reader-facing copy, which the amenities sign-off asks to have re-checked first.`)},l(r){t=ke(r,`This district's totals already appear as the comparison column on each of its Stadtteil and
  Gebiet pages. Berlin's district pages have no amenities section either; a district-level version
  would be new reader-facing copy, which the amenities sign-off asks to have re-checked first.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function br(s){let t;return{c(){t=He(`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at Stadtteil level,
  current state only), and its sign-off (#303) requires a Hamburg-specific methodology disclosure
  before any of it is shown publicly — that has not been done yet.`)},l(r){t=ke(r,`Hamburg has no land-value (Bodenrichtwert) series on this site. Its rent signal is narrower in kind
  than Berlin's (Wohnlage tier composition plus a modelled Mietenspiegel rent, at Stadtteil level,
  current state only), and its sign-off (#303) requires a Hamburg-specific methodology disclosure
  before any of it is shown publicly — that has not been done yet.`)},m(r,a){l(r,t,a)},d(r){r&&o(t)}}}function Mt(s){let t,r;return t=new na({props:{queryID:"minimap_areas",queryResult:s[7]}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p(a,n){const c={};n[0]&128&&(c.queryResult=a[7]),t.$set(c)},i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function vr(s){let t,r;return t=new Jt({props:{id:"stadtteil_name",title:"Stadtteil"}}),{c(){S(t.$$.fragment)},l(a){x(t.$$.fragment,a)},m(a,n){j(t,a,n),r=!0},p:ye,i(a){r||(u(t.$$.fragment,a),r=!0)},o(a){b(t.$$.fragment,a),r=!1},d(a){$(t,a)}}}function wr(s){var ct;let t,r,a,n,c,y,d,p,M,U,Ue,ae,_,be,oa,ve,wa=`<a href="/gentriduck/hamburg/area/district" class="markdown">All districts</a> · <a href="/gentriduck/hamburg/area" class="markdown">all Gebiete</a> ·
<a href="/gentriduck/hamburg/area-detail" class="markdown">district browse</a>`,Z,m,oe,A,Pe='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',we,le,ca=`Every statistisches Gebiet in this district is individually classified into one of six
gentrification stages from Hamburg&#39;s own Sozialmonitoring (see <a href="/gentriduck/methodology" class="markdown">methodology</a>). This
page reports the <strong class="markdown">distribution</strong> of those Gebiet-level stages — never a single re-scored index
value for the district itself (same rule as Berlin&#39;s district pages;
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code>). Hamburg&#39;s stages are <strong class="markdown">not directly equivalent</strong> to
same-named Berlin stages (Hamburg&#39;s Dynamik window is 3 years, Berlin&#39;s 2;
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>).`,ce,q,I,$e,_e,Oe,P,je=`Which Gebiete belong to this district comes from its Stadtteile (a source-provided attribute) and,
one level down, a spatial crosswalk assigning each Gebiet to the Stadtteil that contains it
(OA-D1b, #240).`,xe,te,_a='<a href="#trajectory-mix-20192025">Trajectory mix, 2019–2025</a>',We,X,de,me,re,O,W,ee,Q,Se,ie,da='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Qe,B,Te='<a href="#mapped-places">Mapped places</a>',Me,se,ue,ze,z,qe=`These are OpenStreetMap-derived counts; OSM coverage is not spatially neutral (poorer or peripheral
areas tend to be less thoroughly mapped, Haklay 2010), so a low count can be a coverage gap rather
than a real absence. See the <a href="/gentriduck/hamburg/poi-map" class="markdown">Hamburg POI map</a> for the per-Gebiet picture.`,Ee,ne,ma='<a href="#offering-advantage-across-the-area-hierarchy">Offering Advantage across the area hierarchy</a>',Je,J,ge,V,ua='<a href="#within-group-dominance">Within-group dominance</a>',Ye,fe,H,K,ga='<a href="#people--structure">People &amp; structure</a>',he,pe,ka,Le,Xa='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Ha,Xe,$a,Re,Va='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',ja,Ve,xa,Fe,Ka='<a href="#where-this-area-sits">Where this area sits</a>',Sa,fa,Ke,Ta,Ne,Za='<a href="#stadtteile-in-this-district">Stadtteile in this district</a>',Ma,Ze,qa,ea,et=`This table comes from <code>mart_area_hierarchy</code> (#302), a thin pass-through of Hamburg&#39;s
source-provided district attribute on its Stadtteil geodata — published without re-deciding it.`,Ea,De,at='<a href="#honest-caveats">Honest caveats</a>',Ca,aa,tt=`<li class="markdown"><strong class="markdown">District figures are counts and sums of its Gebiete, never a re-scored index</strong> — and this grain
will never show a single gentrification-index value, per the same ruling that governs Berlin&#39;s
district pages (<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code>, DECLINE).</li> <li class="markdown"><strong class="markdown">Hamburg&#39;s stages are not directly equivalent to same-named Berlin stages</strong> — Hamburg&#39;s Dynamik
window is 3 years, Berlin&#39;s 2 (<a href="/gentriduck/methodology" class="markdown">methodology §6</a>, points 1 and 4).</li> <li class="markdown"><strong class="markdown">The trajectory mix describes a recent ~6-year (2019–2025) window</strong>, not full history, and is a
<strong class="markdown">status-only classification</strong>, never a displacement verdict.</li> <li class="markdown"><strong class="markdown">Mapped-place counts come from OpenStreetMap</strong>, whose coverage varies by area and grew over time.</li> <li class="markdown"><strong class="markdown">Some Berlin sections are not shown for Hamburg</strong> — each with its reason in its own section
above. See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for the full inventory and
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from Berlin&#39;s.</li>`,Ga,Ie,rt='<a href="#further-reading">Further reading</a>',La,ta,it=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a>
(switch the area level to Bezirk for this district&#39;s stage mix on the map),
<a href="/gentriduck/hamburg/area-detail" class="markdown">browse by district</a> for this district&#39;s Gebiete ordered by their pressure reading, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,Ra,ha,Fa,la,Na,Ae=typeof v<"u"&&(v.title||((ct=v.og)==null?void 0:ct.title))&&v.hide_title!==!0&&tr();function Ct(e,i){var ya;return typeof v<"u"&&(v.title||(ya=v.og)!=null&&ya.title)?ir:rr}let pa=Ct()(s),Be=typeof v=="object"&&sr(),E=s[0]&&kt(s),C=s[3]&&Ht(s),G=s[4]&&$t(s),L=s[1]&&jt(s);U=new Bt({props:{crumbs:s[11]}}),ae=new Ut({props:{title:s[10]}}),be=new Qt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(s[0][0]?s[0][0].area_name:"District")+" — district profile",lede:"Neighbourhood-stage mix, trajectory mix, and commercial mix for this district, counted from its constituent statistische Gebiete — never a re-scored index at this grain."}}),m=new Ya({props:{status:"info",$$slots:{default:[lr]},$$scope:{ctx:s}}});const st=[_r,cr],ra=[];function nt(e,i){return e[9]?0:1}q=nt(s),I=ra[q]=st[q](s),_e=new za({props:{data:s[4],x:"stage",y:"n_areas",title:"Gebiete by current stage, "+(s[0][0]?s[0][0].area_name:"this district"),swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet stage data for this district."}}),X=new Wt({props:{subject:"each Gebiet"}});let R=s[5]&&xt(s),F=s[2]&&St(s);const ot=[ur,mr],ia=[];function lt(e,i){return e[8]?0:1}O=lt(s),W=ia[O]=ot[O](s),Q=new za({props:{data:s[5],x:"trajectory_type",y:"n_areas",title:"Gebiete by trajectory classification, 2019–2025 ("+(s[0][0]?s[0][0].area_name:"this district")+")",swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet trajectory data for this district."}});let N=s[6]&&Tt(s);ue=new za({props:{data:s[6],x:"poi_category_h",y:"poi_count",title:"Mapped places by category (latest snapshot), "+(s[0][0]?s[0][0].area_name:"this district"),swapXY:"true",emptySet:"warn",emptyMessage:"No mapped places recorded for this district."}}),J=new ba({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"This district's Offering Advantage roll-up (Berlin's district pages show one per domain)",$$slots:{default:[fr]},$$scope:{ctx:s}}}),fe=new ba({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Within-group dominance for this district's Gebiete",$$slots:{default:[hr]},$$scope:{ctx:s}}}),pe=new ba({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Population and composition sums for this district",$$slots:{default:[pr]},$$scope:{ctx:s}}}),Xe=new ba({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"An amenities table for the district as a whole",$$slots:{default:[yr]},$$scope:{ctx:s}}}),Ve=new ba({props:{cityLabel:"Hamburg",cityHub:"/hamburg",what:"Land value and estimated rent for this district",$$slots:{default:[br]},$$scope:{ctx:s}}});let D=s[7]&&Mt(s);return Ke=new Pt({props:{data:s[7],geoJsonUrl:`${va}/geo/district_subarea_l1_drilldown.geojson`,title:(s[0][0]?s[0][0].area_name:"This district")+" and its Stadtteile"}}),Ze=new zt({props:{data:s[3],rows:"25",link:"stadtteil_link",emptySet:"warn",emptyMessage:"No constituent Stadtteile found for this district.",$$slots:{default:[vr]},$$scope:{ctx:s}}}),la=new Ot({}),{c(){Ae&&Ae.c(),t=f(),pa.c(),r=k("meta"),a=k("meta"),Be&&Be.c(),n=Ia(),c=f(),E&&E.c(),y=f(),C&&C.c(),d=f(),G&&G.c(),p=f(),L&&L.c(),M=f(),S(U.$$.fragment),Ue=f(),S(ae.$$.fragment),_=f(),S(be.$$.fragment),oa=f(),ve=k("p"),ve.innerHTML=wa,Z=f(),S(m.$$.fragment),oe=f(),A=k("h2"),A.innerHTML=Pe,we=f(),le=k("p"),le.innerHTML=ca,ce=f(),I.c(),$e=f(),S(_e.$$.fragment),Oe=f(),P=k("p"),P.textContent=je,xe=f(),te=k("h3"),te.innerHTML=_a,We=f(),S(X.$$.fragment),de=f(),R&&R.c(),me=f(),F&&F.c(),re=f(),W.c(),ee=f(),S(Q.$$.fragment),Se=f(),ie=k("h2"),ie.innerHTML=da,Qe=f(),B=k("h3"),B.innerHTML=Te,Me=f(),N&&N.c(),se=f(),S(ue.$$.fragment),ze=f(),z=k("p"),z.innerHTML=qe,Ee=f(),ne=k("h3"),ne.innerHTML=ma,Je=f(),S(J.$$.fragment),ge=f(),V=k("h2"),V.innerHTML=ua,Ye=f(),S(fe.$$.fragment),H=f(),K=k("h2"),K.innerHTML=ga,he=f(),S(pe.$$.fragment),ka=f(),Le=k("h2"),Le.innerHTML=Xa,Ha=f(),S(Xe.$$.fragment),$a=f(),Re=k("h2"),Re.innerHTML=Va,ja=f(),S(Ve.$$.fragment),xa=f(),Fe=k("h2"),Fe.innerHTML=Ka,Sa=f(),D&&D.c(),fa=f(),S(Ke.$$.fragment),Ta=f(),Ne=k("h3"),Ne.innerHTML=Za,Ma=f(),S(Ze.$$.fragment),qa=f(),ea=k("p"),ea.innerHTML=et,Ea=f(),De=k("h2"),De.innerHTML=at,Ca=f(),aa=k("ul"),aa.innerHTML=tt,Ga=f(),Ie=k("h2"),Ie.innerHTML=rt,La=f(),ta=k("p"),ta.innerHTML=it,Ra=f(),ha=k("hr"),Fa=f(),S(la.$$.fragment),this.h()},l(e){Ae&&Ae.l(e),t=g(e);const i=Lt("svelte-2igo1p",document.head);pa.l(i),r=w(i,"META",{name:!0,content:!0}),a=w(i,"META",{name:!0,content:!0}),Be&&Be.l(i),n=Ia(),i.forEach(o),c=g(e),E&&E.l(e),y=g(e),C&&C.l(e),d=g(e),G&&G.l(e),p=g(e),L&&L.l(e),M=g(e),x(U.$$.fragment,e),Ue=g(e),x(ae.$$.fragment,e),_=g(e),x(be.$$.fragment,e),oa=g(e),ve=w(e,"P",{class:!0,"data-svelte-h":!0}),T(ve)!=="svelte-16m0l3c"&&(ve.innerHTML=wa),Z=g(e),x(m.$$.fragment,e),oe=g(e),A=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(A)!=="svelte-14f17uo"&&(A.innerHTML=Pe),we=g(e),le=w(e,"P",{class:!0,"data-svelte-h":!0}),T(le)!=="svelte-12v8cww"&&(le.innerHTML=ca),ce=g(e),I.l(e),$e=g(e),x(_e.$$.fragment,e),Oe=g(e),P=w(e,"P",{class:!0,"data-svelte-h":!0}),T(P)!=="svelte-hjmoet"&&(P.textContent=je),xe=g(e),te=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(te)!=="svelte-1mar2ld"&&(te.innerHTML=_a),We=g(e),x(X.$$.fragment,e),de=g(e),R&&R.l(e),me=g(e),F&&F.l(e),re=g(e),W.l(e),ee=g(e),x(Q.$$.fragment,e),Se=g(e),ie=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(ie)!=="svelte-1i9w9pn"&&(ie.innerHTML=da),Qe=g(e),B=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(B)!=="svelte-3hvew3"&&(B.innerHTML=Te),Me=g(e),N&&N.l(e),se=g(e),x(ue.$$.fragment,e),ze=g(e),z=w(e,"P",{class:!0,"data-svelte-h":!0}),T(z)!=="svelte-bgis0r"&&(z.innerHTML=qe),Ee=g(e),ne=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(ne)!=="svelte-5mc7pd"&&(ne.innerHTML=ma),Je=g(e),x(J.$$.fragment,e),ge=g(e),V=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(V)!=="svelte-4kb45v"&&(V.innerHTML=ua),Ye=g(e),x(fe.$$.fragment,e),H=g(e),K=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(K)!=="svelte-1mdzqzc"&&(K.innerHTML=ga),he=g(e),x(pe.$$.fragment,e),ka=g(e),Le=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Le)!=="svelte-12k6lqd"&&(Le.innerHTML=Xa),Ha=g(e),x(Xe.$$.fragment,e),$a=g(e),Re=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Re)!=="svelte-13a10dj"&&(Re.innerHTML=Va),ja=g(e),x(Ve.$$.fragment,e),xa=g(e),Fe=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Fe)!=="svelte-60cjj9"&&(Fe.innerHTML=Ka),Sa=g(e),D&&D.l(e),fa=g(e),x(Ke.$$.fragment,e),Ta=g(e),Ne=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),T(Ne)!=="svelte-scaxt8"&&(Ne.innerHTML=Za),Ma=g(e),x(Ze.$$.fragment,e),qa=g(e),ea=w(e,"P",{class:!0,"data-svelte-h":!0}),T(ea)!=="svelte-31o8ui"&&(ea.innerHTML=et),Ea=g(e),De=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(De)!=="svelte-ad0syq"&&(De.innerHTML=at),Ca=g(e),aa=w(e,"UL",{class:!0,"data-svelte-h":!0}),T(aa)!=="svelte-8ltyej"&&(aa.innerHTML=tt),Ga=g(e),Ie=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),T(Ie)!=="svelte-oimjns"&&(Ie.innerHTML=rt),La=g(e),ta=w(e,"P",{class:!0,"data-svelte-h":!0}),T(ta)!=="svelte-1d4fsrz"&&(ta.innerHTML=it),Ra=g(e),ha=w(e,"HR",{class:!0}),Fa=g(e),x(la.$$.fragment,e),this.h()},h(){h(r,"name","twitter:card"),h(r,"content","summary_large_image"),h(a,"name","twitter:site"),h(a,"content","@evidence_dev"),h(ve,"class","markdown"),h(A,"class","markdown"),h(A,"id","social-status--trajectory"),h(le,"class","markdown"),h(P,"class","markdown"),h(te,"class","markdown"),h(te,"id","trajectory-mix-20192025"),h(ie,"class","markdown"),h(ie,"id","commercial-mix--offering-advantage"),h(B,"class","markdown"),h(B,"id","mapped-places"),h(z,"class","markdown"),h(ne,"class","markdown"),h(ne,"id","offering-advantage-across-the-area-hierarchy"),h(V,"class","markdown"),h(V,"id","within-group-dominance"),h(K,"class","markdown"),h(K,"id","people--structure"),h(Le,"class","markdown"),h(Le,"id","amenities--everyday-infrastructure"),h(Re,"class","markdown"),h(Re,"id","land-value--estimated-rent"),h(Fe,"class","markdown"),h(Fe,"id","where-this-area-sits"),h(Ne,"class","markdown"),h(Ne,"id","stadtteile-in-this-district"),h(ea,"class","markdown"),h(De,"class","markdown"),h(De,"id","honest-caveats"),h(aa,"class","markdown"),h(Ie,"class","markdown"),h(Ie,"id","further-reading"),h(ta,"class","markdown"),h(ha,"class","markdown")},m(e,i){Ae&&Ae.m(e,i),l(e,t,i),pa.m(document.head,null),Da(document.head,r),Da(document.head,a),Be&&Be.m(document.head,null),Da(document.head,n),l(e,c,i),E&&E.m(e,i),l(e,y,i),C&&C.m(e,i),l(e,d,i),G&&G.m(e,i),l(e,p,i),L&&L.m(e,i),l(e,M,i),j(U,e,i),l(e,Ue,i),j(ae,e,i),l(e,_,i),j(be,e,i),l(e,oa,i),l(e,ve,i),l(e,Z,i),j(m,e,i),l(e,oe,i),l(e,A,i),l(e,we,i),l(e,le,i),l(e,ce,i),ra[q].m(e,i),l(e,$e,i),j(_e,e,i),l(e,Oe,i),l(e,P,i),l(e,xe,i),l(e,te,i),l(e,We,i),j(X,e,i),l(e,de,i),R&&R.m(e,i),l(e,me,i),F&&F.m(e,i),l(e,re,i),ia[O].m(e,i),l(e,ee,i),j(Q,e,i),l(e,Se,i),l(e,ie,i),l(e,Qe,i),l(e,B,i),l(e,Me,i),N&&N.m(e,i),l(e,se,i),j(ue,e,i),l(e,ze,i),l(e,z,i),l(e,Ee,i),l(e,ne,i),l(e,Je,i),j(J,e,i),l(e,ge,i),l(e,V,i),l(e,Ye,i),j(fe,e,i),l(e,H,i),l(e,K,i),l(e,he,i),j(pe,e,i),l(e,ka,i),l(e,Le,i),l(e,Ha,i),j(Xe,e,i),l(e,$a,i),l(e,Re,i),l(e,ja,i),j(Ve,e,i),l(e,xa,i),l(e,Fe,i),l(e,Sa,i),D&&D.m(e,i),l(e,fa,i),j(Ke,e,i),l(e,Ta,i),l(e,Ne,i),l(e,Ma,i),j(Ze,e,i),l(e,qa,i),l(e,ea,i),l(e,Ea,i),l(e,De,i),l(e,Ca,i),l(e,aa,i),l(e,Ga,i),l(e,Ie,i),l(e,La,i),l(e,ta,i),l(e,Ra,i),l(e,ha,i),l(e,Fa,i),j(la,e,i),Na=!0},p(e,i){var yt;typeof v<"u"&&(v.title||(yt=v.og)!=null&&yt.title)&&v.hide_title!==!0&&Ae.p(e,i),pa.p(e,i),typeof v=="object"&&Be.p(e,i),e[0]?E?(E.p(e,i),i[0]&1&&u(E,1)):(E=kt(e),E.c(),u(E,1),E.m(y.parentNode,y)):E&&(Ge(),b(E,1,1,()=>{E=null}),Ce()),e[3]?C?(C.p(e,i),i[0]&8&&u(C,1)):(C=Ht(e),C.c(),u(C,1),C.m(d.parentNode,d)):C&&(Ge(),b(C,1,1,()=>{C=null}),Ce()),e[4]?G?(G.p(e,i),i[0]&16&&u(G,1)):(G=$t(e),G.c(),u(G,1),G.m(p.parentNode,p)):G&&(Ge(),b(G,1,1,()=>{G=null}),Ce()),e[1]?L?(L.p(e,i),i[0]&2&&u(L,1)):(L=jt(e),L.c(),u(L,1),L.m(M.parentNode,M)):L&&(Ge(),b(L,1,1,()=>{L=null}),Ce());const ya={};i[0]&2048&&(ya.crumbs=e[11]),U.$set(ya);const _t={};i[0]&1024&&(_t.title=e[10]),ae.$set(_t);const dt={};i[0]&1&&(dt.title=(e[0][0]?e[0][0].area_name:"District")+" — district profile"),be.$set(dt);const mt={};i[2]&32&&(mt.$$scope={dirty:i,ctx:e}),m.$set(mt);let Aa=q;q=nt(e),q===Aa?ra[q].p(e,i):(Ge(),b(ra[Aa],1,1,()=>{ra[Aa]=null}),Ce(),I=ra[q],I?I.p(e,i):(I=ra[q]=st[q](e),I.c()),u(I,1),I.m($e.parentNode,$e));const Ba={};i[0]&16&&(Ba.data=e[4]),i[0]&1&&(Ba.title="Gebiete by current stage, "+(e[0][0]?e[0][0].area_name:"this district")),_e.$set(Ba),e[5]?R?(R.p(e,i),i[0]&32&&u(R,1)):(R=xt(e),R.c(),u(R,1),R.m(me.parentNode,me)):R&&(Ge(),b(R,1,1,()=>{R=null}),Ce()),e[2]?F?(F.p(e,i),i[0]&4&&u(F,1)):(F=St(e),F.c(),u(F,1),F.m(re.parentNode,re)):F&&(Ge(),b(F,1,1,()=>{F=null}),Ce());let Ua=O;O=lt(e),O===Ua?ia[O].p(e,i):(Ge(),b(ia[Ua],1,1,()=>{ia[Ua]=null}),Ce(),W=ia[O],W?W.p(e,i):(W=ia[O]=ot[O](e),W.c()),u(W,1),W.m(ee.parentNode,ee));const Pa={};i[0]&32&&(Pa.data=e[5]),i[0]&1&&(Pa.title="Gebiete by trajectory classification, 2019–2025 ("+(e[0][0]?e[0][0].area_name:"this district")+")"),Q.$set(Pa),e[6]?N?(N.p(e,i),i[0]&64&&u(N,1)):(N=Tt(e),N.c(),u(N,1),N.m(se.parentNode,se)):N&&(Ge(),b(N,1,1,()=>{N=null}),Ce());const Oa={};i[0]&64&&(Oa.data=e[6]),i[0]&1&&(Oa.title="Mapped places by category (latest snapshot), "+(e[0][0]?e[0][0].area_name:"this district")),ue.$set(Oa);const ut={};i[2]&32&&(ut.$$scope={dirty:i,ctx:e}),J.$set(ut);const gt={};i[2]&32&&(gt.$$scope={dirty:i,ctx:e}),fe.$set(gt);const ft={};i[2]&32&&(ft.$$scope={dirty:i,ctx:e}),pe.$set(ft);const ht={};i[2]&32&&(ht.$$scope={dirty:i,ctx:e}),Xe.$set(ht);const pt={};i[2]&32&&(pt.$$scope={dirty:i,ctx:e}),Ve.$set(pt),e[7]?D?(D.p(e,i),i[0]&128&&u(D,1)):(D=Mt(e),D.c(),u(D,1),D.m(fa.parentNode,fa)):D&&(Ge(),b(D,1,1,()=>{D=null}),Ce());const Wa={};i[0]&128&&(Wa.data=e[7]),i[0]&1&&(Wa.title=(e[0][0]?e[0][0].area_name:"This district")+" and its Stadtteile"),Ke.$set(Wa);const Qa={};i[0]&8&&(Qa.data=e[3]),i[2]&32&&(Qa.$$scope={dirty:i,ctx:e}),Ze.$set(Qa)},i(e){Na||(u(E),u(C),u(G),u(L),u(U.$$.fragment,e),u(ae.$$.fragment,e),u(be.$$.fragment,e),u(m.$$.fragment,e),u(I),u(_e.$$.fragment,e),u(X.$$.fragment,e),u(R),u(F),u(W),u(Q.$$.fragment,e),u(N),u(ue.$$.fragment,e),u(J.$$.fragment,e),u(fe.$$.fragment,e),u(pe.$$.fragment,e),u(Xe.$$.fragment,e),u(Ve.$$.fragment,e),u(D),u(Ke.$$.fragment,e),u(Ze.$$.fragment,e),u(la.$$.fragment,e),Na=!0)},o(e){b(E),b(C),b(G),b(L),b(U.$$.fragment,e),b(ae.$$.fragment,e),b(be.$$.fragment,e),b(m.$$.fragment,e),b(I),b(_e.$$.fragment,e),b(X.$$.fragment,e),b(R),b(F),b(W),b(Q.$$.fragment,e),b(N),b(ue.$$.fragment,e),b(J.$$.fragment,e),b(fe.$$.fragment,e),b(pe.$$.fragment,e),b(Xe.$$.fragment,e),b(Ve.$$.fragment,e),b(D),b(Ke.$$.fragment,e),b(Ze.$$.fragment,e),b(la.$$.fragment,e),Na=!1},d(e){e&&(o(t),o(c),o(y),o(d),o(p),o(M),o(Ue),o(_),o(oa),o(ve),o(Z),o(oe),o(A),o(we),o(le),o(ce),o($e),o(Oe),o(P),o(xe),o(te),o(We),o(de),o(me),o(re),o(ee),o(Se),o(ie),o(Qe),o(B),o(Me),o(se),o(ze),o(z),o(Ee),o(ne),o(Je),o(ge),o(V),o(Ye),o(H),o(K),o(he),o(ka),o(Le),o(Ha),o($a),o(Re),o(ja),o(xa),o(Fe),o(Sa),o(fa),o(Ta),o(Ne),o(Ma),o(qa),o(ea),o(Ea),o(De),o(Ca),o(aa),o(Ga),o(Ie),o(La),o(ta),o(Ra),o(ha),o(Fa)),Ae&&Ae.d(e),pa.d(e),o(r),o(a),Be&&Be.d(e),o(n),E&&E.d(e),C&&C.d(e),G&&G.d(e),L&&L.d(e),$(U,e),$(ae,e),$(be,e),$(m,e),ra[q].d(e),$(_e,e),$(X,e),R&&R.d(e),F&&F.d(e),ia[O].d(e),$(Q,e),N&&N.d(e),$(ue,e),$(J,e),$(fe,e),$(pe,e),$(Xe,e),$(Ve,e),D&&D.d(e),$(Ke,e),$(Ze,e),$(la,e)}}}const v={};function kr(s,t,r){let a,n,c,y,d,p,M,U,Ue;bt(s,er,H=>r(50,U=H)),bt(s,wt,H=>r(55,Ue=H));let{data:ae}=t,{data:_={},customFormattingSettings:be,__db:oa,inputs:ve}=ae;Rt(wt,Ue="d6a6300928ebef6b83290955a7a91efd",Ue);let wa=Xt(Yt(ve));Ft(wa.subscribe(H=>ve=H)),Nt(Zt,{getCustomFormats:()=>be.customFormats||[]});const Z=(H,K)=>ar(oa.query,H,{query_name:K});Vt(Z);let m=U.params;Dt(()=>!0);let oe={initialData:void 0,initialError:void 0},A=Y`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
limit 1`,Pe=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
limit 1`;_.district_name_data&&(_.district_name_data instanceof Error?oe.initialError=_.district_name_data:oe.initialData=_.district_name_data,_.district_name_columns&&(oe.knownColumns=_.district_name_columns));let we,le=!1;const ca=sa.createReactive({callback:H=>{r(0,we=H)},execFn:Z},{id:"district_name",...oe});ca(Pe,{noResolve:A,...oe}),globalThis[Symbol.for("district_name")]={get value(){return we}};let ce={initialData:void 0,initialError:void 0},q=Y`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
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
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`,I=`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
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
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`;_.children_data&&(_.children_data instanceof Error?ce.initialError=_.children_data:ce.initialData=_.children_data,_.children_columns&&(ce.knownColumns=_.children_columns));let $e,_e=!1;const Oe=sa.createReactive({callback:H=>{r(3,$e=H)},execFn:Z},{id:"children",...ce});Oe(I,{noResolve:q,...ce}),globalThis[Symbol.for("children")]={get value(){return $e}};let P={initialData:void 0,initialError:void 0},je=Y`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`,xe=`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`;_.stage_mix_data&&(_.stage_mix_data instanceof Error?P.initialError=_.stage_mix_data:P.initialData=_.stage_mix_data,_.stage_mix_columns&&(P.knownColumns=_.stage_mix_columns));let te,_a=!1;const We=sa.createReactive({callback:H=>{r(4,te=H)},execFn:Z},{id:"stage_mix",...P});We(xe,{noResolve:je,...P}),globalThis[Symbol.for("stage_mix")]={get value(){return te}};let X={initialData:void 0,initialError:void 0},de=Y`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and g1.parent_area_code = '${m.code}' and gi.status_class is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`,me=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and g1.parent_area_code = '${m.code}' and gi.status_class is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`;_.stage_mix_summary_data&&(_.stage_mix_summary_data instanceof Error?X.initialError=_.stage_mix_summary_data:X.initialData=_.stage_mix_summary_data,_.stage_mix_summary_columns&&(X.knownColumns=_.stage_mix_summary_columns));let re,O=!1;const W=sa.createReactive({callback:H=>{r(1,re=H)},execFn:Z},{id:"stage_mix_summary",...X});W(me,{noResolve:de,...X}),globalThis[Symbol.for("stage_mix_summary")]={get value(){return re}};let ee={initialData:void 0,initialError:void 0},Q=Y`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`,Se=`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`;_.trajectory_mix_data&&(_.trajectory_mix_data instanceof Error?ee.initialError=_.trajectory_mix_data:ee.initialData=_.trajectory_mix_data,_.trajectory_mix_columns&&(ee.knownColumns=_.trajectory_mix_columns));let ie,da=!1;const Qe=sa.createReactive({callback:H=>{r(5,ie=H)},execFn:Z},{id:"trajectory_mix",...ee});Qe(Se,{noResolve:Q,...ee}),globalThis[Symbol.for("trajectory_mix")]={get value(){return ie}};let B={initialData:void 0,initialError:void 0},Te=Y`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
            and g1.parent_area_code = '${m.code}'
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
from totals as t cross join top cross join trending as tr`,Me=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
            and g1.parent_area_code = '${m.code}'
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
from totals as t cross join top cross join trending as tr`;_.trajectory_mix_summary_data&&(_.trajectory_mix_summary_data instanceof Error?B.initialError=_.trajectory_mix_summary_data:B.initialData=_.trajectory_mix_summary_data,_.trajectory_mix_summary_columns&&(B.knownColumns=_.trajectory_mix_summary_columns));let se,ue=!1;const ze=sa.createReactive({callback:H=>{r(2,se=H)},execFn:Z},{id:"trajectory_mix_summary",...B});ze(Me,{noResolve:Te,...B}),globalThis[Symbol.for("trajectory_mix_summary")]={get value(){return se}};let z={initialData:void 0,initialError:void 0},qe=Y`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
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
  and g1.parent_area_code = '${m.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`,Ee=`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
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
  and g1.parent_area_code = '${m.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`;_.poi_mix_data&&(_.poi_mix_data instanceof Error?z.initialError=_.poi_mix_data:z.initialData=_.poi_mix_data,_.poi_mix_columns&&(z.knownColumns=_.poi_mix_columns));let ne,ma=!1;const Je=sa.createReactive({callback:H=>{r(6,ne=H)},execFn:Z},{id:"poi_mix",...z});Je(Ee,{noResolve:qe,...z}),globalThis[Symbol.for("poi_mix")]={get value(){return ne}};let J={initialData:void 0,initialError:void 0},ge=Y`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${va}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`,V=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${va}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`;_.minimap_areas_data&&(_.minimap_areas_data instanceof Error?J.initialError=_.minimap_areas_data:J.initialData=_.minimap_areas_data,_.minimap_areas_columns&&(J.knownColumns=_.minimap_areas_columns));let ua,Ye=!1;const fe=sa.createReactive({callback:H=>{r(7,ua=H)},execFn:Z},{id:"minimap_areas",...J});return fe(V,{noResolve:ge,...J}),globalThis[Symbol.for("minimap_areas")]={get value(){return ua}},s.$$set=H=>{"data"in H&&r(12,ae=H.data)},s.$$.update=()=>{var H;s.$$.dirty[0]&4096&&r(13,{data:_={},customFormattingSettings:be,__db:oa}=ae,_),s.$$.dirty[0]&8192&&Kt.set(Object.keys(_).length>0),s.$$.dirty[1]&524288&&r(14,m=U.params),s.$$.dirty[0]&16384&&r(16,A=Y`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
limit 1`),s.$$.dirty[0]&16384&&r(17,Pe=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
limit 1`),s.$$.dirty[0]&491520&&(A||!le?A||(ca(Pe,{noResolve:A,...oe}),r(18,le=!0)):ca(Pe,{noResolve:A})),s.$$.dirty[0]&16384&&r(20,q=Y`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
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
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`),s.$$.dirty[0]&16384&&r(21,I=`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
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
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: 4 Hamburg Stadtteile are disclosure-control MERGED pairs whose area_code is itself
    -- slash-joined (e.g. "02117/118", see ingest_hamburg_ewr_stadtteil.py's docstring). They have
    -- no dim_area_geometry row (no WFS geometry for a merged pair) and no children of their own
    -- (no Gebiet has a merged code as parent_area_code), so linking to them ships a dead-end,
    -- unnamed profile page -- and the raw "/" 404s during prerender besides (an earlier version of
    -- this fix percent-encoded it, but that only fools the prerender crawler: GitHub Pages decodes
    -- the URL once before file lookup, so the encoded link still 404s for real visitors). Simplest
    -- correct fix: don't list/link them here at all.
    and h.area_code not like '%/%'
order by stadtteil_name`),s.$$.dirty[0]&7864320&&(q||!_e?q||(Oe(I,{noResolve:q,...ce}),r(22,_e=!0)):Oe(I,{noResolve:q})),s.$$.dirty[0]&16384&&r(24,je=Y`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`),s.$$.dirty[0]&16384&&r(25,xe=`-- #353: COUNT of this district's Gebiete by current stage -- two hops through mart_area_hierarchy
-- (see header note). Same shape as pages/berlin/area/bezirk/[code].md's stage_mix.
select
    -- Not 'uninhabited': see pages/hamburg/area/subarea_l1/[code].md's stage_mix comment.
    coalesce(gi.status_class, 'no stage on record') as stage,
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
where g2.city_code = 'HH' and g2.area_level = 'subarea_l2' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`),s.$$.dirty[0]&125829120&&(je||!_a?je||(We(xe,{noResolve:je,...P}),r(26,_a=!0)):We(xe,{noResolve:je})),s.$$.dirty[0]&16384&&r(28,de=Y`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and g1.parent_area_code = '${m.code}' and gi.status_class is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&16384&&r(29,me=`-- Modal stage + heterogeneity flag from the SAME rows as stage_mix (Gebiete with a stage only).
with
    mix as (
        select gi.status_class as stage, count(*) as n_areas
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
            and g1.parent_area_code = '${m.code}' and gi.status_class is not null
        group by all
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
    a.n_advanced
from totals as t cross join top cross join advanced as a`),s.$$.dirty[0]&2013265920&&(de||!O?de||(W(me,{noResolve:de,...X}),r(30,O=!0)):W(me,{noResolve:de})),s.$$.dirty[0]&16384&&r(32,Q=Y`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`),s.$$.dirty[0]&16384&&r(33,Se=`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
where t.city_code = 'HH' and t.area_vintage = 'current' and g1.parent_area_code = '${m.code}'
group by all
order by n_areas desc`),s.$$.dirty[1]&15&&(Q||!da?Q||(Qe(Se,{noResolve:Q,...ee}),r(34,da=!0)):Qe(Se,{noResolve:Q})),s.$$.dirty[0]&16384&&r(36,Te=Y`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
            and g1.parent_area_code = '${m.code}'
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
from totals as t cross join top cross join trending as tr`),s.$$.dirty[0]&16384&&r(37,Me=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
            and g1.parent_area_code = '${m.code}'
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
from totals as t cross join top cross join trending as tr`),s.$$.dirty[1]&240&&(Te||!ue?Te||(ze(Me,{noResolve:Te,...B}),r(38,ue=!0)):ze(Me,{noResolve:Te})),s.$$.dirty[0]&16384&&r(40,qe=Y`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
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
  and g1.parent_area_code = '${m.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`),s.$$.dirty[0]&16384&&r(41,Ee=`-- #353: SUM of this district's Gebiete' latest-snapshot counts, two hops through
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
  and g1.parent_area_code = '${m.code}'
  and f.snapshot_year = (
      select max(snapshot_year) from gentriduck_marts.fct_poi_development
      where city_code = 'HH' and area_vintage = 'current'
  )
group by all
order by poi_count desc`),s.$$.dirty[1]&3840&&(qe||!ma?qe||(Je(Ee,{noResolve:qe,...z}),r(42,ma=!0)):Je(Ee,{noResolve:qe})),s.$$.dirty[0]&16384&&r(44,ge=Y`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${va}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`),s.$$.dirty[0]&16384&&r(45,V=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'district:' || '${m.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${m.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${m.code}'
union all
select
    'subarea_l1:' || h.area_code as feature_key,
    coalesce(g.area_name, h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${va}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${m.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`),s.$$.dirty[1]&61440&&(ge||!Ye?ge||(fe(V,{noResolve:ge,...J}),r(46,Ye=!0)):fe(V,{noResolve:ge})),s.$$.dirty[0]&1&&r(49,a=((H=we==null?void 0:we[0])==null?void 0:H.area_name)??null),s.$$.dirty[1]&262144&&r(11,n=[{label:"Hamburg",href:"/hamburg"},{label:"District & area profiles",href:"/hamburg/area/district"},{label:a??"District"}]),s.$$.dirty[1]&262144&&r(10,c=a?`${a} — district profile · Hamburg`:null),s.$$.dirty[0]&2&&r(48,y=re==null?void 0:re[0]),s.$$.dirty[1]&131072&&r(9,d=!y||y.n_total==null||Number(y.n_total)===0?null:(()=>{const K=Number(y.n_total),ga=Number(y.n_advanced||0),he=y.top_stage_share!=null?Number(y.top_stage_share):null,pe=he!=null&&he>.5?`<b>${y.top_stage}</b> is the only stage holding a majority (${Math.round(he*100)}%)`:"no single stage holds a majority";return`<b>${ga}</b> of <b>${K}</b> Gebiete with a current stage here are classified <b>active-gentrification</b> or <b>pioneer-signal</b>; ${pe} — a distribution across this district's own Gebiete, never a single re-scored gentrification-index value for the district itself.`})()),s.$$.dirty[0]&4&&r(47,p=se==null?void 0:se[0]),s.$$.dirty[1]&65536&&r(8,M=!p||p.n_total==null||Number(p.n_total)===0?null:(()=>{const K=Number(p.n_total),ga=Number(p.n_trending||0),he=p.top_type_share!=null?Number(p.top_type_share):null,pe=he!=null&&he>.5?`<b>${p.top_type}</b> is the only trajectory type holding a majority (${Math.round(he*100)}%)`:"no single trajectory type holds a majority";return`<b>${ga}</b> of <b>${K}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${pe} — a distribution across this district's own Gebiete, never a single re-scored value for the district itself.`})())},[we,re,se,$e,te,ie,ne,ua,M,d,c,n,ae,_,m,oe,A,Pe,le,ce,q,I,_e,P,je,xe,_a,X,de,me,O,ee,Q,Se,da,B,Te,Me,ue,z,qe,Ee,ma,J,ge,V,Ye,p,y,a,U]}class Ar extends It{constructor(t){super(),At(this,t,kr,wr,Gt,{data:12},null,[-1,-1,-1])}}export{Ar as component};
