import{s as sa,d as n,i as s,a as je,b as h,c as g,h as oa,e as f,f as jt,r as xt,t as J,g as H,j as b,k as y,u as P,l as Yt,m as la,o as ca,n as _a,p as da,q as ke,v as ma,H as ua,w as ha}from"../chunks/scheduler.BopPEjhc.js";import{S as fa,i as ya,d as B,t as $,a as v,c as Ve,m as U,b as Q,e as z,g as Xe}from"../chunks/index.CYkVJg6_.js";import{A as pa}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as ga}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as ba}from"../chunks/Hero.CRoRGI02.js";import{N as et}from"../chunks/NotYetPublished.DquJtoGu.js";import{D as va,C as wa}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as nt,w as ka}from"../chunks/entry.BMmpG6A7.js";import{A as ia}from"../chunks/Alert.BO8kFSQK.js";import{e as $a,s as Ha,Q as tt,p as ja,a as Vt,r as Xt,C as xa}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as he}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Ca}from"../chunks/stores.Ceyp10jj.js";import{Q as at}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as Sa}from"../chunks/BarChart.DzrCmZ_r.js";import{p as Ta}from"../chunks/profile.BW8tN6E9.js";function qa(l){var o;let a,r=(k.title??((o=k.og)==null?void 0:o.title))+"",t;return{c(){a=y("h1"),t=P(r),this.h()},l(c){a=f(c,"H1",{class:!0});var p=xt(a);t=J(p,r),p.forEach(n),this.h()},h(){h(a,"class","title")},m(c,p){s(c,a,p),je(a,t)},p:ke,d(c){c&&n(a)}}}function Ma(l){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:ke,p:ke,d:ke}}function Ea(l){var p;let a,r,t,o,c;return document.title=a=k.title??((p=k.og)==null?void 0:p.title),{c(){r=b(),t=y("meta"),o=b(),c=y("meta"),this.h()},l(m){r=g(m),t=f(m,"META",{property:!0,content:!0}),o=g(m),c=f(m,"META",{name:!0,content:!0}),this.h()},h(){var m,_;h(t,"property","og:title"),h(t,"content",((m=k.og)==null?void 0:m.title)??k.title),h(c,"name","twitter:title"),h(c,"content",((_=k.og)==null?void 0:_.title)??k.title)},m(m,_){s(m,r,_),s(m,t,_),s(m,o,_),s(m,c,_)},p(m,_){var I;_&0&&a!==(a=k.title??((I=k.og)==null?void 0:I.title))&&(document.title=a)},d(m){m&&(n(r),n(t),n(o),n(c))}}}function Ia(l){var c,p;let a,r,t=(k.description||((c=k.og)==null?void 0:c.description))&&Da(),o=((p=k.og)==null?void 0:p.image)&&La();return{c(){t&&t.c(),a=b(),o&&o.c(),r=jt()},l(m){t&&t.l(m),a=g(m),o&&o.l(m),r=jt()},m(m,_){t&&t.m(m,_),s(m,a,_),o&&o.m(m,_),s(m,r,_)},p(m,_){var I,se;(k.description||(I=k.og)!=null&&I.description)&&t.p(m,_),(se=k.og)!=null&&se.image&&o.p(m,_)},d(m){m&&(n(a),n(r)),t&&t.d(m),o&&o.d(m)}}}function Da(l){let a,r,t,o,c;return{c(){a=y("meta"),r=b(),t=y("meta"),o=b(),c=y("meta"),this.h()},l(p){a=f(p,"META",{name:!0,content:!0}),r=g(p),t=f(p,"META",{property:!0,content:!0}),o=g(p),c=f(p,"META",{name:!0,content:!0}),this.h()},h(){var p,m,_;h(a,"name","description"),h(a,"content",k.description??((p=k.og)==null?void 0:p.description)),h(t,"property","og:description"),h(t,"content",((m=k.og)==null?void 0:m.description)??k.description),h(c,"name","twitter:description"),h(c,"content",((_=k.og)==null?void 0:_.description)??k.description)},m(p,m){s(p,a,m),s(p,r,m),s(p,t,m),s(p,o,m),s(p,c,m)},p:ke,d(p){p&&(n(a),n(r),n(t),n(o),n(c))}}}function La(l){let a,r,t;return{c(){a=y("meta"),r=b(),t=y("meta"),this.h()},l(o){a=f(o,"META",{property:!0,content:!0}),r=g(o),t=f(o,"META",{name:!0,content:!0}),this.h()},h(){var o,c;h(a,"property","og:image"),h(a,"content",Vt((o=k.og)==null?void 0:o.image)),h(t,"name","twitter:image"),h(t,"content",Vt((c=k.og)==null?void 0:c.image))},m(o,c){s(o,a,c),s(o,r,c),s(o,t,c)},p:ke,d(o){o&&(n(a),n(r),n(t))}}}function Kt(l){let a,r;return a=new at({props:{queryID:"stadtteil_name",queryResult:l[1]}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[0]&2&&(c.queryResult=t[1]),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function Zt(l){let a,r;return a=new at({props:{queryID:"parent_info",queryResult:l[2]}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[0]&4&&(c.queryResult=t[2]),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function ea(l){let a,r;return a=new at({props:{queryID:"children",queryResult:l[3]}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[0]&8&&(c.queryResult=t[3]),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function Ra(l){let a,r="District profile";return{c(){a=y("a"),a.textContent=r,this.h()},l(t){a=f(t,"A",{href:!0,"data-svelte-h":!0}),H(a)!=="svelte-5v523a"&&(a.textContent=r),this.h()},h(){h(a,"href","/gentriduck/hamburg/area/district")},m(t,o){s(t,a,o)},p:ke,d(t){t&&n(a)}}}function Aa(l){let a,r=(l[2][0].district_name??"District profile")+"",t,o;return{c(){a=y("a"),t=P(r),this.h()},l(c){a=f(c,"A",{href:!0});var p=xt(a);t=J(p,r),p.forEach(n),this.h()},h(){h(a,"href",o="/gentriduck/hamburg/area/district/"+l[2][0].district_code)},m(c,p){s(c,a,p),je(a,t)},p(c,p){p[0]&4&&r!==(r=(c[2][0].district_name??"District profile")+"")&&ha(t,r),p[0]&4&&o!==(o="/gentriduck/hamburg/area/district/"+c[2][0].district_code)&&h(a,"href",o)},d(c){c&&n(a)}}}function Ga(l){let a,r="Two things to know before reading this section (#317):",t,o,c,p="1. Recent window, not full history.",m,_,I=`~6-year window
  (2019–2025)`,se,S,Le="persistently-deprived",X,u,_e="stable-established",te,Y,fe,ae,oe="2. Status-only, not a displacement verdict.",le,D,re="stable-established",de,q,xe="persistently-deprived",K,C,ye="improving",me,L,pe="declining",W,T,M="mixed",E,V,ce="officially-measured social status",Z,x,ge="methodology",ie;return{c(){a=y("b"),a.textContent=r,t=y("br"),o=b(),c=y("b"),c.textContent=p,m=P(" These labels describe a bounded "),_=y("b"),_.textContent=I,se=P(` of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series — the same cadence-normalized window already used for Berlin (H-C2, #159),
  applied here to Hamburg's annual cadence for the first time (#314). A Gebiet classified
  `),S=y("b"),S.textContent=Le,X=P(" or "),u=y("b"),u.textContent=_e,te=P(` below reflects only the last ~6 years,
  not necessarily its full history — don't read it with the same long-run framing Berlin's own
  multi-decade biennial figures might imply.`),Y=y("br"),fe=b(),ae=y("b"),ae.textContent=oe,le=b(),D=y("code"),D.textContent=re,de=P(`,
  `),q=y("code"),q.textContent=xe,K=P(", "),C=y("code"),C.textContent=ye,me=P(", "),L=y("code"),L.textContent=pe,W=P(`, and
  `),T=y("code"),T.textContent=M,E=P(" describe how each Gebiet's "),V=y("i"),V.textContent=ce,Z=P(` moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  `),x=y("a"),x.textContent=ge,ie=P(" for what this classification does and doesn't claim."),this.h()},l(d){a=f(d,"B",{"data-svelte-h":!0}),H(a)!=="svelte-f92r3c"&&(a.textContent=r),t=f(d,"BR",{}),o=g(d),c=f(d,"B",{"data-svelte-h":!0}),H(c)!=="svelte-gpn4f2"&&(c.textContent=p),m=J(d," These labels describe a bounded "),_=f(d,"B",{"data-svelte-h":!0}),H(_)!=="svelte-xbdj07"&&(_.textContent=I),se=J(d,` of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series — the same cadence-normalized window already used for Berlin (H-C2, #159),
  applied here to Hamburg's annual cadence for the first time (#314). A Gebiet classified
  `),S=f(d,"B",{"data-svelte-h":!0}),H(S)!=="svelte-100x5va"&&(S.textContent=Le),X=J(d," or "),u=f(d,"B",{"data-svelte-h":!0}),H(u)!=="svelte-izdzf8"&&(u.textContent=_e),te=J(d,` below reflects only the last ~6 years,
  not necessarily its full history — don't read it with the same long-run framing Berlin's own
  multi-decade biennial figures might imply.`),Y=f(d,"BR",{}),fe=g(d),ae=f(d,"B",{"data-svelte-h":!0}),H(ae)!=="svelte-1g7f5hr"&&(ae.textContent=oe),le=g(d),D=f(d,"CODE",{"data-svelte-h":!0}),H(D)!=="svelte-177mcp0"&&(D.textContent=re),de=J(d,`,
  `),q=f(d,"CODE",{"data-svelte-h":!0}),H(q)!=="svelte-3r4rxk"&&(q.textContent=xe),K=J(d,", "),C=f(d,"CODE",{"data-svelte-h":!0}),H(C)!=="svelte-1y05wir"&&(C.textContent=ye),me=J(d,", "),L=f(d,"CODE",{"data-svelte-h":!0}),H(L)!=="svelte-wjs7ot"&&(L.textContent=pe),W=J(d,`, and
  `),T=f(d,"CODE",{"data-svelte-h":!0}),H(T)!=="svelte-1fwh1wf"&&(T.textContent=M),E=J(d," describe how each Gebiet's "),V=f(d,"I",{"data-svelte-h":!0}),H(V)!=="svelte-cf0hmg"&&(V.textContent=ce),Z=J(d,` moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  `),x=f(d,"A",{href:!0,"data-svelte-h":!0}),H(x)!=="svelte-pnwl5q"&&(x.textContent=ge),ie=J(d," for what this classification does and doesn't claim."),this.h()},h(){h(x,"href","/gentriduck/methodology")},m(d,w){s(d,a,w),s(d,t,w),s(d,o,w),s(d,c,w),s(d,m,w),s(d,_,w),s(d,se,w),s(d,S,w),s(d,X,w),s(d,u,w),s(d,te,w),s(d,Y,w),s(d,fe,w),s(d,ae,w),s(d,le,w),s(d,D,w),s(d,de,w),s(d,q,w),s(d,K,w),s(d,C,w),s(d,me,w),s(d,L,w),s(d,W,w),s(d,T,w),s(d,E,w),s(d,V,w),s(d,Z,w),s(d,x,w),s(d,ie,w)},p:ke,d(d){d&&(n(a),n(t),n(o),n(c),n(m),n(_),n(se),n(S),n(X),n(u),n(te),n(Y),n(fe),n(ae),n(le),n(D),n(de),n(q),n(K),n(C),n(me),n(L),n(W),n(T),n(E),n(V),n(Z),n(x),n(ie))}}}function ta(l){let a,r;return a=new at({props:{queryID:"trajectory_mix",queryResult:l[4]}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[0]&16&&(c.queryResult=t[4]),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function aa(l){let a,r;return a=new at({props:{queryID:"trajectory_mix_summary",queryResult:l[0]}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[0]&1&&(c.queryResult=t[0]),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function Fa(l){let a,r;return a=new ia({props:{status:"warning",$$slots:{default:[Na]},$$scope:{ctx:l}}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[1]&524288&&(c.$$scope={dirty:o,ctx:t}),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function Oa(l){let a,r;return{c(){a=y("p"),r=new ua(!1),this.h()},l(t){a=f(t,"P",{});var o=xt(a);r=ma(o,!1),o.forEach(n),this.h()},h(){r.a=null},m(t,o){s(t,a,o),r.m(l[6],a)},p(t,o){o[0]&64&&r.p(t[6])},i:ke,o:ke,d(t){t&&n(a)}}}function Na(l){let a;return{c(){a=P("No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.")},l(r){a=J(r,"No Gebiet trajectory data available for this Stadtteil within the 2019–2025 window.")},m(r,t){s(r,a,t)},d(r){r&&n(a)}}}function ra(l){let a,r;return a=new at({props:{queryID:"minimap_areas",queryResult:l[5]}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p(t,o){const c={};o[0]&32&&(c.queryResult=t[5]),a.$set(c)},i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function Ba(l){let a,r;return a=new wa({props:{id:"gebiet_name",title:"Statistisches Gebiet"}}),{c(){z(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){U(a,t,o),r=!0},p:ke,i(t){r||(v(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){B(a,t)}}}function Ua(l){var Jt;let a,r,t,o,c,p,m,_,I,se,S,Le,X,u,_e="all Stadtteile",te,Y,fe="all districts",ae,oe,le=`<a href="/gentriduck/hamburg/area/subarea_l1" class="markdown">All Stadtteile</a> · <a href="/gentriduck/hamburg/area/district" class="markdown">Districts</a> ·
<a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a>`,D,re,de,q,xe='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',K,C,ye=`This section shows the <strong class="markdown">distribution</strong> of this Stadtteil&#39;s constituent Gebiete&#39;s own trajectory
classifications — never a single re-scored index value for the Stadtteil itself, unless a future
ticket promotes this grain to primary-equivalent scoring (currently out of scope; see
<code class="markdown">docs/epic-i/I21-ia-restructure-scoping.md</code> §2.2&#39;s <code class="markdown">headline</code> row).`,me,L,pe,W,T,M,E,V,ce,Z,x,ge='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ie,d,w,ee,$e='<a href="#within-group-dominance">Within-group dominance</a>',He,be,Re,ue,j='<a href="#people--structure">People &amp; structure</a>',Ae,ve,Ke,Ce,Mt='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',st,Qe,ot,Se,Et='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',lt,ze,ct,Te,It='<a href="#where-this-area-sits">Where this area sits</a>',_t,Ze,Ge,dt,qe,Dt='<a href="#gebiete-in-this-stadtteil">Gebiete in this Stadtteil</a>',mt,Fe,ut,Oe,Lt=`This Stadtteil&#39;s parent district is linked above (&quot;Up:&quot;) and this list of constituent Gebiete both
come from <code>mart_area_hierarchy</code> (#302, I21-h), a thin pass-through of`,ht,Je,Rt="dim_area_hierarchy.sql",ft,Pe,At="hh_l1_to_district",yt,We,Gt="hh_l2_to_l1",pt,Me,Ft='<a href="#honest-caveats">Honest caveats</a>',gt,Ne,Ot=`<li class="markdown"><strong class="markdown">This page is mostly still a structural scaffold (I21-g, #301).</strong> Every section except &quot;Social
status &amp; trajectory&quot; (below), the &quot;Up&quot; link, and the &quot;Gebiete in this Stadtteil&quot; table shows a
fixed deferred-state placeholder rather than a real Hamburg figure — publishing the rest of this
page&#39;s content is a separately-gated follow-up (I21-i, #303).</li> <li class="markdown"><strong class="markdown">The &quot;Social status &amp; trajectory&quot; distribution above is real, not a placeholder (#317).</strong> It
reads Hamburg&#39;s own admitted rows in <code class="markdown">fct_gentrification_trajectory</code> (#314, dual-signed-off PASS)
— a recent <strong class="markdown">~6-year (2019–2025) window</strong>, not full history, and a <strong class="markdown">status-only classification</strong>,
never a displacement verdict (see the disclosure directly above that section&#39;s chart).</li> <li class="markdown"><strong class="markdown">The &quot;Up&quot; link and &quot;Gebiete in this Stadtteil&quot; table are real, not placeholders (#302, I21-h).</strong>
The underlying parent/child links were resolved and signed off earlier (one source-provided, one
the OA-D1b/#240 spatial crosswalk); this ticket only publishes them to the web layer.</li> <li class="markdown">See <a href="/gentriduck/hamburg" class="markdown">Hamburg&#39;s data hub</a> for the full, current inventory of what is and isn&#39;t published
for Hamburg, and <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from
Berlin&#39;s generally.</li>`,bt,Ee,Nt='<a href="#further-reading">Further reading</a>',vt,Be,Bt=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a> for
this Stadtteil&#39;s constituent areas&#39; already-public gentrification-stage figures, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,wt,rt,kt,Ye,$t,Ie=typeof k<"u"&&(k.title||((Jt=k.og)==null?void 0:Jt.title))&&k.hide_title!==!0&&qa();function na(e,i){var ne;return typeof k<"u"&&(k.title||(ne=k.og)!=null&&ne.title)?Ea:Ma}let it=na()(l),De=typeof k=="object"&&Ia(),R=l[1]&&Kt(l),A=l[2]&&Zt(l),G=l[3]&&ea(l);I=new ba({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:l[1][0]?l[1][0].area_name:"Stadtteil",lede:"Hamburg's Stadtteil-level (Bezirksregion-equivalent) scaffold — the headline scale between district and statistisches Gebiet (I21-g, #301). Most sections are still deferred; the Up/children links (#302) and the Gebiet trajectory distribution below (#317) are real."}});function Ut(e,i){var ne;return(ne=e[2][0])!=null&&ne.district_code?Aa:Ra}let Ht=Ut(l),we=Ht(l);re=new et({props:{pageLevel:!0,what:"this Stadtteil's status, commercial mix, and demographic profile (its Gebiet-level trajectory distribution is now published below, #317)"}}),L=new ia({props:{status:"warning",$$slots:{default:[Ga]},$$scope:{ctx:l}}});let F=l[4]&&ta(l),O=l[0]&&aa(l);const Qt=[Oa,Fa],Ue=[];function zt(e,i){return e[6]?0:1}M=zt(l),E=Ue[M]=Qt[M](l),ce=new Sa({props:{data:l[4],x:"trajectory_type",y:"n_areas",title:"Gebiete by trajectory classification, 2019–2025 ("+(l[1][0]?l[1][0].area_name:"this Stadtteil")+")",swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet trajectory data for this Stadtteil."}}),d=new et({props:{what:"this Stadtteil's commercial-mix breakdown and Offering Advantage roll-up"}}),be=new et({props:{what:"within-group dominance figures for this Stadtteil"}}),ve=new et({props:{what:"demographic sums for this Stadtteil"}}),Qe=new et({props:{what:"everyday-infrastructure sums for this Stadtteil"}}),ze=new et({props:{what:"land value / estimated rent figures for this Stadtteil"}});let N=l[5]&&ra(l);return Ge=new pa({props:{data:l[5],geoJsonUrl:`${nt}/geo/subarea_l1_subarea_l2_drilldown.geojson`,title:(l[1][0]?l[1][0].area_name:"This Stadtteil")+" and its statistische Gebiete"}}),Fe=new va({props:{data:l[3],rows:"20",link:"gebiet_link",emptySet:"warn",emptyMessage:"No constituent Gebiete found for this Stadtteil.",$$slots:{default:[Ba]},$$scope:{ctx:l}}}),Ye=new ga({}),{c(){Ie&&Ie.c(),a=b(),it.c(),r=y("meta"),t=y("meta"),De&&De.c(),o=jt(),c=b(),R&&R.c(),p=b(),A&&A.c(),m=b(),G&&G.c(),_=b(),z(I.$$.fragment),se=b(),S=y("p"),Le=P("Up: "),we.c(),X=P(" · "),u=y("a"),u.textContent=_e,te=P(" · "),Y=y("a"),Y.textContent=fe,ae=b(),oe=y("p"),oe.innerHTML=le,D=b(),z(re.$$.fragment),de=b(),q=y("h2"),q.innerHTML=xe,K=b(),C=y("p"),C.innerHTML=ye,me=b(),z(L.$$.fragment),pe=b(),F&&F.c(),W=b(),O&&O.c(),T=b(),E.c(),V=b(),z(ce.$$.fragment),Z=b(),x=y("h2"),x.innerHTML=ge,ie=b(),z(d.$$.fragment),w=b(),ee=y("h2"),ee.innerHTML=$e,He=b(),z(be.$$.fragment),Re=b(),ue=y("h2"),ue.innerHTML=j,Ae=b(),z(ve.$$.fragment),Ke=b(),Ce=y("h2"),Ce.innerHTML=Mt,st=b(),z(Qe.$$.fragment),ot=b(),Se=y("h2"),Se.innerHTML=Et,lt=b(),z(ze.$$.fragment),ct=b(),Te=y("h2"),Te.innerHTML=It,_t=b(),N&&N.c(),Ze=b(),z(Ge.$$.fragment),dt=b(),qe=y("h3"),qe.innerHTML=Dt,mt=b(),z(Fe.$$.fragment),ut=b(),Oe=y("p"),Oe.innerHTML=Lt,ht=b(),Je=y("code"),Je.textContent=Rt,ft=P("'s "),Pe=y("code"),Pe.textContent=At,yt=P(` (source-provided) and
`),We=y("code"),We.textContent=Gt,pt=P(` (OA-D1b/#240 spatial crosswalk, geo-DS + domain-expert PASS) edges — this
ticket publishes those already-resolved edges to the web layer without re-deciding either method.
`),Me=y("h2"),Me.innerHTML=Ft,gt=b(),Ne=y("ul"),Ne.innerHTML=Ot,bt=b(),Ee=y("h2"),Ee.innerHTML=Nt,vt=b(),Be=y("p"),Be.innerHTML=Bt,wt=b(),rt=y("hr"),kt=b(),z(Ye.$$.fragment),this.h()},l(e){Ie&&Ie.l(e),a=g(e);const i=oa("svelte-2igo1p",document.head);it.l(i),r=f(i,"META",{name:!0,content:!0}),t=f(i,"META",{name:!0,content:!0}),De&&De.l(i),o=jt(),i.forEach(n),c=g(e),R&&R.l(e),p=g(e),A&&A.l(e),m=g(e),G&&G.l(e),_=g(e),Q(I.$$.fragment,e),se=g(e),S=f(e,"P",{});var ne=xt(S);Le=J(ne,"Up: "),we.l(ne),X=J(ne," · "),u=f(ne,"A",{href:!0,"data-svelte-h":!0}),H(u)!=="svelte-1wjc2nq"&&(u.textContent=_e),te=J(ne," · "),Y=f(ne,"A",{href:!0,"data-svelte-h":!0}),H(Y)!=="svelte-46ercb"&&(Y.textContent=fe),ne.forEach(n),ae=g(e),oe=f(e,"P",{class:!0,"data-svelte-h":!0}),H(oe)!=="svelte-doq5ve"&&(oe.innerHTML=le),D=g(e),Q(re.$$.fragment,e),de=g(e),q=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(q)!=="svelte-14f17uo"&&(q.innerHTML=xe),K=g(e),C=f(e,"P",{class:!0,"data-svelte-h":!0}),H(C)!=="svelte-1koji09"&&(C.innerHTML=ye),me=g(e),Q(L.$$.fragment,e),pe=g(e),F&&F.l(e),W=g(e),O&&O.l(e),T=g(e),E.l(e),V=g(e),Q(ce.$$.fragment,e),Z=g(e),x=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(x)!=="svelte-1i9w9pn"&&(x.innerHTML=ge),ie=g(e),Q(d.$$.fragment,e),w=g(e),ee=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(ee)!=="svelte-4kb45v"&&(ee.innerHTML=$e),He=g(e),Q(be.$$.fragment,e),Re=g(e),ue=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(ue)!=="svelte-1mdzqzc"&&(ue.innerHTML=j),Ae=g(e),Q(ve.$$.fragment,e),Ke=g(e),Ce=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ce)!=="svelte-12k6lqd"&&(Ce.innerHTML=Mt),st=g(e),Q(Qe.$$.fragment,e),ot=g(e),Se=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Se)!=="svelte-13a10dj"&&(Se.innerHTML=Et),lt=g(e),Q(ze.$$.fragment,e),ct=g(e),Te=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Te)!=="svelte-60cjj9"&&(Te.innerHTML=It),_t=g(e),N&&N.l(e),Ze=g(e),Q(Ge.$$.fragment,e),dt=g(e),qe=f(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),H(qe)!=="svelte-eb6276"&&(qe.innerHTML=Dt),mt=g(e),Q(Fe.$$.fragment,e),ut=g(e),Oe=f(e,"P",{class:!0,"data-svelte-h":!0}),H(Oe)!=="svelte-1o9dgf"&&(Oe.innerHTML=Lt),ht=g(e),Je=f(e,"CODE",{"data-svelte-h":!0}),H(Je)!=="svelte-4site0"&&(Je.textContent=Rt),ft=J(e,"'s "),Pe=f(e,"CODE",{"data-svelte-h":!0}),H(Pe)!=="svelte-1gtkyfp"&&(Pe.textContent=At),yt=J(e,` (source-provided) and
`),We=f(e,"CODE",{"data-svelte-h":!0}),H(We)!=="svelte-13l6qup"&&(We.textContent=Gt),pt=J(e,` (OA-D1b/#240 spatial crosswalk, geo-DS + domain-expert PASS) edges — this
ticket publishes those already-resolved edges to the web layer without re-deciding either method.
`),Me=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Me)!=="svelte-ad0syq"&&(Me.innerHTML=Ft),gt=g(e),Ne=f(e,"UL",{class:!0,"data-svelte-h":!0}),H(Ne)!=="svelte-wrn7c5"&&(Ne.innerHTML=Ot),bt=g(e),Ee=f(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ee)!=="svelte-oimjns"&&(Ee.innerHTML=Nt),vt=g(e),Be=f(e,"P",{class:!0,"data-svelte-h":!0}),H(Be)!=="svelte-1ejtis6"&&(Be.innerHTML=Bt),wt=g(e),rt=f(e,"HR",{class:!0}),kt=g(e),Q(Ye.$$.fragment,e),this.h()},h(){h(r,"name","twitter:card"),h(r,"content","summary_large_image"),h(t,"name","twitter:site"),h(t,"content","@evidence_dev"),h(u,"href","/gentriduck/hamburg/area/subarea_l1"),h(Y,"href","/gentriduck/hamburg/area/district"),h(oe,"class","markdown"),h(q,"class","markdown"),h(q,"id","social-status--trajectory"),h(C,"class","markdown"),h(x,"class","markdown"),h(x,"id","commercial-mix--offering-advantage"),h(ee,"class","markdown"),h(ee,"id","within-group-dominance"),h(ue,"class","markdown"),h(ue,"id","people--structure"),h(Ce,"class","markdown"),h(Ce,"id","amenities--everyday-infrastructure"),h(Se,"class","markdown"),h(Se,"id","land-value--estimated-rent"),h(Te,"class","markdown"),h(Te,"id","where-this-area-sits"),h(qe,"class","markdown"),h(qe,"id","gebiete-in-this-stadtteil"),h(Oe,"class","markdown"),h(Me,"class","markdown"),h(Me,"id","honest-caveats"),h(Ne,"class","markdown"),h(Ee,"class","markdown"),h(Ee,"id","further-reading"),h(Be,"class","markdown"),h(rt,"class","markdown")},m(e,i){Ie&&Ie.m(e,i),s(e,a,i),it.m(document.head,null),je(document.head,r),je(document.head,t),De&&De.m(document.head,null),je(document.head,o),s(e,c,i),R&&R.m(e,i),s(e,p,i),A&&A.m(e,i),s(e,m,i),G&&G.m(e,i),s(e,_,i),U(I,e,i),s(e,se,i),s(e,S,i),je(S,Le),we.m(S,null),je(S,X),je(S,u),je(S,te),je(S,Y),s(e,ae,i),s(e,oe,i),s(e,D,i),U(re,e,i),s(e,de,i),s(e,q,i),s(e,K,i),s(e,C,i),s(e,me,i),U(L,e,i),s(e,pe,i),F&&F.m(e,i),s(e,W,i),O&&O.m(e,i),s(e,T,i),Ue[M].m(e,i),s(e,V,i),U(ce,e,i),s(e,Z,i),s(e,x,i),s(e,ie,i),U(d,e,i),s(e,w,i),s(e,ee,i),s(e,He,i),U(be,e,i),s(e,Re,i),s(e,ue,i),s(e,Ae,i),U(ve,e,i),s(e,Ke,i),s(e,Ce,i),s(e,st,i),U(Qe,e,i),s(e,ot,i),s(e,Se,i),s(e,lt,i),U(ze,e,i),s(e,ct,i),s(e,Te,i),s(e,_t,i),N&&N.m(e,i),s(e,Ze,i),U(Ge,e,i),s(e,dt,i),s(e,qe,i),s(e,mt,i),U(Fe,e,i),s(e,ut,i),s(e,Oe,i),s(e,ht,i),s(e,Je,i),s(e,ft,i),s(e,Pe,i),s(e,yt,i),s(e,We,i),s(e,pt,i),s(e,Me,i),s(e,gt,i),s(e,Ne,i),s(e,bt,i),s(e,Ee,i),s(e,vt,i),s(e,Be,i),s(e,wt,i),s(e,rt,i),s(e,kt,i),U(Ye,e,i),$t=!0},p(e,i){var Wt;typeof k<"u"&&(k.title||(Wt=k.og)!=null&&Wt.title)&&k.hide_title!==!0&&Ie.p(e,i),it.p(e,i),typeof k=="object"&&De.p(e,i),e[1]?R?(R.p(e,i),i[0]&2&&v(R,1)):(R=Kt(e),R.c(),v(R,1),R.m(p.parentNode,p)):R&&(Xe(),$(R,1,1,()=>{R=null}),Ve()),e[2]?A?(A.p(e,i),i[0]&4&&v(A,1)):(A=Zt(e),A.c(),v(A,1),A.m(m.parentNode,m)):A&&(Xe(),$(A,1,1,()=>{A=null}),Ve()),e[3]?G?(G.p(e,i),i[0]&8&&v(G,1)):(G=ea(e),G.c(),v(G,1),G.m(_.parentNode,_)):G&&(Xe(),$(G,1,1,()=>{G=null}),Ve());const ne={};i[0]&2&&(ne.title=e[1][0]?e[1][0].area_name:"Stadtteil"),I.$set(ne),Ht===(Ht=Ut(e))&&we?we.p(e,i):(we.d(1),we=Ht(e),we&&(we.c(),we.m(S,X)));const Pt={};i[1]&524288&&(Pt.$$scope={dirty:i,ctx:e}),L.$set(Pt),e[4]?F?(F.p(e,i),i[0]&16&&v(F,1)):(F=ta(e),F.c(),v(F,1),F.m(W.parentNode,W)):F&&(Xe(),$(F,1,1,()=>{F=null}),Ve()),e[0]?O?(O.p(e,i),i[0]&1&&v(O,1)):(O=aa(e),O.c(),v(O,1),O.m(T.parentNode,T)):O&&(Xe(),$(O,1,1,()=>{O=null}),Ve());let Ct=M;M=zt(e),M===Ct?Ue[M].p(e,i):(Xe(),$(Ue[Ct],1,1,()=>{Ue[Ct]=null}),Ve(),E=Ue[M],E?E.p(e,i):(E=Ue[M]=Qt[M](e),E.c()),v(E,1),E.m(V.parentNode,V));const St={};i[0]&16&&(St.data=e[4]),i[0]&2&&(St.title="Gebiete by trajectory classification, 2019–2025 ("+(e[1][0]?e[1][0].area_name:"this Stadtteil")+")"),ce.$set(St),e[5]?N?(N.p(e,i),i[0]&32&&v(N,1)):(N=ra(e),N.c(),v(N,1),N.m(Ze.parentNode,Ze)):N&&(Xe(),$(N,1,1,()=>{N=null}),Ve());const Tt={};i[0]&32&&(Tt.data=e[5]),i[0]&2&&(Tt.title=(e[1][0]?e[1][0].area_name:"This Stadtteil")+" and its statistische Gebiete"),Ge.$set(Tt);const qt={};i[0]&8&&(qt.data=e[3]),i[1]&524288&&(qt.$$scope={dirty:i,ctx:e}),Fe.$set(qt)},i(e){$t||(v(R),v(A),v(G),v(I.$$.fragment,e),v(re.$$.fragment,e),v(L.$$.fragment,e),v(F),v(O),v(E),v(ce.$$.fragment,e),v(d.$$.fragment,e),v(be.$$.fragment,e),v(ve.$$.fragment,e),v(Qe.$$.fragment,e),v(ze.$$.fragment,e),v(N),v(Ge.$$.fragment,e),v(Fe.$$.fragment,e),v(Ye.$$.fragment,e),$t=!0)},o(e){$(R),$(A),$(G),$(I.$$.fragment,e),$(re.$$.fragment,e),$(L.$$.fragment,e),$(F),$(O),$(E),$(ce.$$.fragment,e),$(d.$$.fragment,e),$(be.$$.fragment,e),$(ve.$$.fragment,e),$(Qe.$$.fragment,e),$(ze.$$.fragment,e),$(N),$(Ge.$$.fragment,e),$(Fe.$$.fragment,e),$(Ye.$$.fragment,e),$t=!1},d(e){e&&(n(a),n(c),n(p),n(m),n(_),n(se),n(S),n(ae),n(oe),n(D),n(de),n(q),n(K),n(C),n(me),n(pe),n(W),n(T),n(V),n(Z),n(x),n(ie),n(w),n(ee),n(He),n(Re),n(ue),n(Ae),n(Ke),n(Ce),n(st),n(ot),n(Se),n(lt),n(ct),n(Te),n(_t),n(Ze),n(dt),n(qe),n(mt),n(ut),n(Oe),n(ht),n(Je),n(ft),n(Pe),n(yt),n(We),n(pt),n(Me),n(gt),n(Ne),n(bt),n(Ee),n(vt),n(Be),n(wt),n(rt),n(kt)),Ie&&Ie.d(e),it.d(e),n(r),n(t),De&&De.d(e),n(o),R&&R.d(e),A&&A.d(e),G&&G.d(e),B(I,e),we.d(),B(re,e),B(L,e),F&&F.d(e),O&&O.d(e),Ue[M].d(e),B(ce,e),B(d,e),B(be,e),B(ve,e),B(Qe,e),B(ze,e),N&&N.d(e),B(Ge,e),B(Fe,e),B(Ye,e)}}}const k={};function Qa(l,a,r){let t,o,c,p;Yt(l,Ca,j=>r(35,c=j)),Yt(l,Xt,j=>r(40,p=j));let{data:m}=a,{data:_={},customFormattingSettings:I,__db:se,inputs:S}=m;la(Xt,p="942e554bfdff103e6542015d14f614c7",p);let Le=$a(ka(S));ca(Le.subscribe(j=>S=j)),_a(xa,{getCustomFormats:()=>I.customFormats||[]});const X=(j,Ae)=>Ta(se.query,j,{query_name:Ae});Ha(X);let u=c.params;da(()=>!0);let _e={initialData:void 0,initialError:void 0},te=he`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
limit 1`,Y=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
limit 1`;_.stadtteil_name_data&&(_.stadtteil_name_data instanceof Error?_e.initialError=_.stadtteil_name_data:_e.initialData=_.stadtteil_name_data,_.stadtteil_name_columns&&(_e.knownColumns=_.stadtteil_name_columns));let fe,ae=!1;const oe=tt.createReactive({callback:j=>{r(1,fe=j)},execFn:X},{id:"stadtteil_name",..._e});oe(Y,{noResolve:te,..._e}),globalThis[Symbol.for("stadtteil_name")]={get value(){return fe}};let le={initialData:void 0,initialError:void 0},D=he`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${u.code}'
limit 1`,re=`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${u.code}'
limit 1`;_.parent_info_data&&(_.parent_info_data instanceof Error?le.initialError=_.parent_info_data:le.initialData=_.parent_info_data,_.parent_info_columns&&(le.knownColumns=_.parent_info_columns));let de,q=!1;const xe=tt.createReactive({callback:j=>{r(2,de=j)},execFn:X},{id:"parent_info",...le});xe(re,{noResolve:D,...le}),globalThis[Symbol.for("parent_info")]={get value(){return de}};let K={initialData:void 0,initialError:void 0},C=he`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name -- structural links only, no statistic (I21-i, #303, publishes real figures).
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by gebiet_name`,ye=`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name -- structural links only, no statistic (I21-i, #303, publishes real figures).
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by gebiet_name`;_.children_data&&(_.children_data instanceof Error?K.initialError=_.children_data:K.initialData=_.children_data,_.children_columns&&(K.knownColumns=_.children_columns));let me,L=!1;const pe=tt.createReactive({callback:j=>{r(3,me=j)},execFn:X},{id:"children",...K});pe(ye,{noResolve:C,...K}),globalThis[Symbol.for("children")]={get value(){return me}};let W={initialData:void 0,initialError:void 0},T=he`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${u.code}'
group by all
order by n_areas desc`,M=`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${u.code}'
group by all
order by n_areas desc`;_.trajectory_mix_data&&(_.trajectory_mix_data instanceof Error?W.initialError=_.trajectory_mix_data:W.initialData=_.trajectory_mix_data,_.trajectory_mix_columns&&(W.knownColumns=_.trajectory_mix_columns));let E,V=!1;const ce=tt.createReactive({callback:j=>{r(4,E=j)},execFn:X},{id:"trajectory_mix",...W});ce(M,{noResolve:T,...W}),globalThis[Symbol.for("trajectory_mix")]={get value(){return E}};let Z={initialData:void 0,initialError:void 0},x=he`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${u.code}'
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
from totals as t cross join top cross join trending as tr`,ge=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${u.code}'
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
from totals as t cross join top cross join trending as tr`;_.trajectory_mix_summary_data&&(_.trajectory_mix_summary_data instanceof Error?Z.initialError=_.trajectory_mix_summary_data:Z.initialData=_.trajectory_mix_summary_data,_.trajectory_mix_summary_columns&&(Z.knownColumns=_.trajectory_mix_summary_columns));let ie,d=!1;const w=tt.createReactive({callback:j=>{r(0,ie=j)},execFn:X},{id:"trajectory_mix_summary",...Z});w(ge,{noResolve:x,...Z}),globalThis[Symbol.for("trajectory_mix_summary")]={get value(){return ie}};let ee={initialData:void 0,initialError:void 0},$e=he`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307: OSM-derived Gebiet name where matched, falling back to the numeric code where OSM's
    -- informal tagging has no coverage -- same coalesce already used by this page's own \`children\`
    -- query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${nt}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by sort_order, area_name`,He=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307: OSM-derived Gebiet name where matched, falling back to the numeric code where OSM's
    -- informal tagging has no coverage -- same coalesce already used by this page's own \`children\`
    -- query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${nt}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by sort_order, area_name`;_.minimap_areas_data&&(_.minimap_areas_data instanceof Error?ee.initialError=_.minimap_areas_data:ee.initialData=_.minimap_areas_data,_.minimap_areas_columns&&(ee.knownColumns=_.minimap_areas_columns));let be,Re=!1;const ue=tt.createReactive({callback:j=>{r(5,be=j)},execFn:X},{id:"minimap_areas",...ee});return ue(He,{noResolve:$e,...ee}),globalThis[Symbol.for("minimap_areas")]={get value(){return be}},l.$$set=j=>{"data"in j&&r(7,m=j.data)},l.$$.update=()=>{l.$$.dirty[0]&128&&r(8,{data:_={},customFormattingSettings:I,__db:se}=m,_),l.$$.dirty[0]&256&&ja.set(Object.keys(_).length>0),l.$$.dirty[1]&16&&r(9,u=c.params),l.$$.dirty[0]&512&&r(11,te=he`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
limit 1`),l.$$.dirty[0]&512&&r(12,Y=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
limit 1`),l.$$.dirty[0]&15360&&(te||!ae?te||(oe(Y,{noResolve:te,..._e}),r(13,ae=!0)):oe(Y,{noResolve:te})),l.$$.dirty[0]&512&&r(15,D=he`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${u.code}'
limit 1`),l.$$.dirty[0]&512&&r(16,re=`-- #302 (I21-h): resolved parent district, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name.
select
    h.parent_area_code as district_code,
    g.area_name as district_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'district' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.area_code = '${u.code}'
limit 1`),l.$$.dirty[0]&245760&&(D||!q?D||(xe(re,{noResolve:D,...le}),r(17,q=!0)):xe(re,{noResolve:D})),l.$$.dirty[0]&512&&r(19,C=he`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name -- structural links only, no statistic (I21-i, #303, publishes real figures).
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by gebiet_name`),l.$$.dirty[0]&512&&r(20,ye=`-- #302 (I21-h): constituent Gebiete, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name -- structural links only, no statistic (I21-i, #303, publishes real figures).
select
    h.area_code as gebiet_code,
    coalesce(g.area_name, h.area_code) as gebiet_name,
    '/hamburg/area/' || h.area_code as gebiet_link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by gebiet_name`),l.$$.dirty[0]&3932160&&(C||!L?C||(pe(ye,{noResolve:C,...K}),r(21,L=!0)):pe(ye,{noResolve:C})),l.$$.dirty[0]&512&&r(23,T=he`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${u.code}'
group by all
order by n_areas desc`),l.$$.dirty[0]&512&&r(24,M=`-- #317: distribution of trajectory_type across this Stadtteil's constituent Gebiete -- a one-hop
-- join through mart_area_hierarchy (#302, I21-h) against fct_gentrification_trajectory (Hamburg
-- admitted #314), same distribution-not-point-value discipline as
-- pages/berlin/area/bzr/[code].md's own stage_mix query, applied to the newly-admitted trajectory
-- mart instead of gentrification_index's current-stage column.
select t.trajectory_type, count(*) as n_areas
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where t.city_code = 'HH' and t.area_vintage = 'current' and h.parent_area_code = '${u.code}'
group by all
order by n_areas desc`),l.$$.dirty[0]&62914560&&(T||!V?T||(ce(M,{noResolve:T,...W}),r(25,V=!0)):ce(M,{noResolve:T})),l.$$.dirty[0]&512&&r(27,x=he`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${u.code}'
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
from totals as t cross join top cross join trending as tr`),l.$$.dirty[0]&512&&r(28,ge=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
-- trajectory_mix rows above (no new query logic) -- same "N of M ... no single type holds a
-- majority" distributional takeaway pattern as Berlin's own stage_mix_summary query.
with
    mix as (
        select t.trajectory_type, count(*) as n_areas
        from gentriduck_marts.fct_gentrification_trajectory as t
        join
            gentriduck_marts.mart_area_hierarchy as h
            on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
        where
            t.city_code = 'HH' and t.area_vintage = 'current'
            and h.parent_area_code = '${u.code}'
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
from totals as t cross join top cross join trending as tr`),l.$$.dirty[0]&1006632960&&(x||!d?x||(w(ge,{noResolve:x,...Z}),r(29,d=!0)):w(ge,{noResolve:x})),l.$$.dirty[0]&512&&r(31,$e=he`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307: OSM-derived Gebiet name where matched, falling back to the numeric code where OSM's
    -- informal tagging has no coverage -- same coalesce already used by this page's own \`children\`
    -- query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${nt}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by sort_order, area_name`),l.$$.dirty[0]&512&&r(32,He=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
-- name containing a quote character can never break this query's own SQL syntax.
select
    'subarea_l1:' || '${u.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${u.code}') as area_name,
    'This area' as role,
    1 as sort_order,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l1' and area_code = '${u.code}'
union all
select
    'subarea_l2:' || h.area_code as feature_key,
    -- #307: OSM-derived Gebiet name where matched, falling back to the numeric code where OSM's
    -- informal tagging has no coverage -- same coalesce already used by this page's own \`children\`
    -- query above (gebiet_name).
    coalesce(nullif(g.area_name, ''), h.area_code) as area_name,
    'Click to explore' as role,
    2 as sort_order,
    '${nt}/hamburg/area/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l2' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.parent_area_code = '${u.code}'
order by sort_order, area_name`),l.$$.dirty[0]&1073741824|l.$$.dirty[1]&7&&($e||!Re?$e||(ue(He,{noResolve:$e,...ee}),r(33,Re=!0)):ue(He,{noResolve:$e})),l.$$.dirty[0]&1&&r(34,t=ie==null?void 0:ie[0]),l.$$.dirty[1]&8&&r(6,o=!t||t.n_total==null||Number(t.n_total)===0?null:(()=>{const j=Number(t.n_total),Ae=Number(t.n_trending||0),ve=t.top_type_share!=null?Number(t.top_type_share):null,Ke=ve!=null&&ve>.5?`<b>${t.top_type}</b> is the only trajectory type holding a majority (${Math.round(ve*100)}%)`:"no single trajectory type holds a majority";return`<b>${Ae}</b> of <b>${j}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${Ke} — a distribution across this Stadtteil's own Gebiete, never a single re-scored value for the Stadtteil itself.`})())},[ie,fe,de,me,E,be,o,m,_,u,_e,te,Y,ae,le,D,re,q,K,C,ye,L,W,T,M,V,Z,x,ge,d,ee,$e,He,Re,t,c]}class or extends fa{constructor(a){super(),ya(this,a,Qa,Ua,sa,{data:7},null,[-1,-1])}}export{or as component};
