import{s as Va,d as i,w as Xt,i as s,a as C,b as m,c as g,h as Wa,e as h,f as Kt,r as Ne,t as S,g as H,j as v,k as p,u as T,l as Oa,m as Ya,o as Ka,n as Xa,p as Za,q as Fe,v as er,H as tr}from"../chunks/scheduler.BopPEjhc.js";import{S as ar,i as rr,d as R,t as $,a as w,c as et,m as O,b as I,e as D,g as tt}from"../chunks/index.CYkVJg6_.js";import{A as ir}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as nr}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as sr}from"../chunks/Hero.CRoRGI02.js";import{N as wt}from"../chunks/NotYetPublished.DquJtoGu.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as or,w as lr}from"../chunks/entry.BMmpG6A7.js";import{A as ua}from"../chunks/Alert.BO8kFSQK.js";import{e as cr,s as dr,Q as kt,p as _r,a as Ia,r as Da,C as mr}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as we}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as ur}from"../chunks/stores.Ceyp10jj.js";import{Q as $t}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as ma}from"../chunks/BigValue.Ck7K9e2S.js";import{p as fr}from"../chunks/profile.BW8tN6E9.js";function hr(l){var o;let a,r=(j.title??((o=j.og)==null?void 0:o.title))+"",t;return{c(){a=p("h1"),t=T(r),this.h()},l(c){a=h(c,"H1",{class:!0});var _=Ne(a);t=S(_,r),_.forEach(i),this.h()},h(){m(a,"class","title")},m(c,_){s(c,a,_),C(a,t)},p:Fe,d(c){c&&i(a)}}}function pr(l){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:Fe,p:Fe,d:Fe}}function yr(l){var _;let a,r,t,o,c;return document.title=a=j.title??((_=j.og)==null?void 0:_.title),{c(){r=v(),t=p("meta"),o=v(),c=p("meta"),this.h()},l(u){r=g(u),t=h(u,"META",{property:!0,content:!0}),o=g(u),c=h(u,"META",{name:!0,content:!0}),this.h()},h(){var u,b;m(t,"property","og:title"),m(t,"content",((u=j.og)==null?void 0:u.title)??j.title),m(c,"name","twitter:title"),m(c,"content",((b=j.og)==null?void 0:b.title)??j.title)},m(u,b){s(u,r,b),s(u,t,b),s(u,o,b),s(u,c,b)},p(u,b){var q;b&0&&a!==(a=j.title??((q=j.og)==null?void 0:q.title))&&(document.title=a)},d(u){u&&(i(r),i(t),i(o),i(c))}}}function br(l){var c,_;let a,r,t=(j.description||((c=j.og)==null?void 0:c.description))&&gr(),o=((_=j.og)==null?void 0:_.image)&&vr();return{c(){t&&t.c(),a=v(),o&&o.c(),r=Kt()},l(u){t&&t.l(u),a=g(u),o&&o.l(u),r=Kt()},m(u,b){t&&t.m(u,b),s(u,a,b),o&&o.m(u,b),s(u,r,b)},p(u,b){var q,N;(j.description||(q=j.og)!=null&&q.description)&&t.p(u,b),(N=j.og)!=null&&N.image&&o.p(u,b)},d(u){u&&(i(a),i(r)),t&&t.d(u),o&&o.d(u)}}}function gr(l){let a,r,t,o,c;return{c(){a=p("meta"),r=v(),t=p("meta"),o=v(),c=p("meta"),this.h()},l(_){a=h(_,"META",{name:!0,content:!0}),r=g(_),t=h(_,"META",{property:!0,content:!0}),o=g(_),c=h(_,"META",{name:!0,content:!0}),this.h()},h(){var _,u,b;m(a,"name","description"),m(a,"content",j.description??((_=j.og)==null?void 0:_.description)),m(t,"property","og:description"),m(t,"content",((u=j.og)==null?void 0:u.description)??j.description),m(c,"name","twitter:description"),m(c,"content",((b=j.og)==null?void 0:b.description)??j.description)},m(_,u){s(_,a,u),s(_,r,u),s(_,t,u),s(_,o,u),s(_,c,u)},p:Fe,d(_){_&&(i(a),i(r),i(t),i(o),i(c))}}}function vr(l){let a,r,t;return{c(){a=p("meta"),r=v(),t=p("meta"),this.h()},l(o){a=h(o,"META",{property:!0,content:!0}),r=g(o),t=h(o,"META",{name:!0,content:!0}),this.h()},h(){var o,c;m(a,"property","og:image"),m(a,"content",Ia((o=j.og)==null?void 0:o.image)),m(t,"name","twitter:image"),m(t,"content",Ia((c=j.og)==null?void 0:c.image))},m(o,c){s(o,a,c),s(o,r,c),s(o,t,c)},p:Fe,d(o){o&&(i(a),i(r),i(t))}}}function Ga(l){let a,r;return a=new $t({props:{queryID:"code_info",queryResult:l[0]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&1&&(c.queryResult=t[0]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function Na(l){let a,r;return a=new $t({props:{queryID:"area_exists",queryResult:l[5]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&32&&(c.queryResult=t[5]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function Fa(l){let a,r;return a=new $t({props:{queryID:"name_info",queryResult:l[1]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&2&&(c.queryResult=t[1]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function Ba(l){let a,r;return a=new $t({props:{queryID:"parent_info",queryResult:l[6]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&64&&(c.queryResult=t[6]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function wr(l){let a,r="Stadtteil profile";return{c(){a=p("a"),a.textContent=r,this.h()},l(t){a=h(t,"A",{href:!0,"data-svelte-h":!0}),H(a)!=="svelte-220xn5"&&(a.textContent=r),this.h()},h(){m(a,"href","/gentriduck/hamburg/area/subarea_l1")},m(t,o){s(t,a,o)},p:Fe,d(t){t&&i(a)}}}function kr(l){let a,r=(l[6][0].stadtteil_name??"Stadtteil profile")+"",t,o;return{c(){a=p("a"),t=T(r),this.h()},l(c){a=h(c,"A",{href:!0});var _=Ne(a);t=S(_,r),_.forEach(i),this.h()},h(){m(a,"href",o="/gentriduck/hamburg/area/subarea_l1/"+l[6][0].stadtteil_code)},m(c,_){s(c,a,_),C(a,t)},p(c,_){_[0]&64&&r!==(r=(c[6][0].stadtteil_name??"Stadtteil profile")+"")&&Xt(t,r),_[0]&64&&o!==(o="/gentriduck/hamburg/area/subarea_l1/"+c[6][0].stadtteil_code)&&m(a,"href",o)},d(c){c&&i(a)}}}function Pa(l){let a,r;return a=new ua({props:{status:"warning",$$slots:{default:[$r]},$$scope:{ctx:l}}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&16|o[1]&536870912&&(c.$$scope={dirty:o,ctx:t}),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function $r(l){let a,r,t,o,c,_="the Gebiet list",u;return{c(){a=T("No Hamburg Gebiet geometry found for code "),r=p("b"),t=T(l[4]),o=T(` —
  this route should only be reachable via a real crawled link from
  `),c=p("a"),c.textContent=_,u=T(`; if you landed here another way, that list is the
  reliable starting point.`),this.h()},l(b){a=S(b,"No Hamburg Gebiet geometry found for code "),r=h(b,"B",{});var q=Ne(r);t=S(q,l[4]),q.forEach(i),o=S(b,` —
  this route should only be reachable via a real crawled link from
  `),c=h(b,"A",{href:!0,"data-svelte-h":!0}),H(c)!=="svelte-5vmt59"&&(c.textContent=_),u=S(b,`; if you landed here another way, that list is the
  reliable starting point.`),this.h()},h(){m(c,"href","/gentriduck/hamburg/area")},m(b,q){s(b,a,q),s(b,r,q),C(r,t),s(b,o,q),s(b,c,q),s(b,u,q)},p(b,q){q[0]&16&&Xt(t,b[4])},d(b){b&&(i(a),i(r),i(o),i(c),i(u))}}}function Hr(l){let a,r="Two things to know before reading this section (#317):",t,o,c,_="1. Recent window, not full history.",u,b,q=`~6-year window
  (2019–2025)`,N,ee,f="persistently-deprived",Ee,oe,ke="stable-established",Qe,te,y,Z,le="2. Status-only, not a displacement verdict.",ae,G,Ae="stable-established",re,A,ce="persistently-deprived",ye,ne,be="improving",$e,L,He="declining",de,M,Ue="mixed",Ce,E,_e="officially-measured social status",ie,K,me="methodology",je;return{c(){a=p("b"),a.textContent=r,t=p("br"),o=v(),c=p("b"),c.textContent=_,u=T(" These labels describe a bounded "),b=p("b"),b.textContent=q,N=T(` of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series on record — the same cadence-normalized window already used for Berlin
  (H-C2, #159), applied here to Hamburg's annual cadence for the first time (#314). A Gebiet
  classified `),ee=p("b"),ee.textContent=f,Ee=T(" or "),oe=p("b"),oe.textContent=ke,Qe=T(` below reflects only the last
  ~6 years, not necessarily this area's full history — don't read it with the same long-run framing
  Berlin's own multi-decade biennial figures might imply.`),te=p("br"),y=v(),Z=p("b"),Z.textContent=le,ae=v(),G=p("code"),G.textContent=Ae,re=T(`,
  `),A=p("code"),A.textContent=ce,ye=T(", "),ne=p("code"),ne.textContent=be,$e=T(", "),L=p("code"),L.textContent=He,de=T(`, and
  `),M=p("code"),M.textContent=Ue,Ce=T(" describe how this Gebiet's "),E=p("i"),E.textContent=_e,ie=T(` moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  `),K=p("a"),K.textContent=me,je=T(" for what this classification does and doesn't claim."),this.h()},l(d){a=h(d,"B",{"data-svelte-h":!0}),H(a)!=="svelte-f92r3c"&&(a.textContent=r),t=h(d,"BR",{}),o=g(d),c=h(d,"B",{"data-svelte-h":!0}),H(c)!=="svelte-gpn4f2"&&(c.textContent=_),u=S(d," These labels describe a bounded "),b=h(d,"B",{"data-svelte-h":!0}),H(b)!=="svelte-xbdj07"&&(b.textContent=q),N=S(d,` of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series on record — the same cadence-normalized window already used for Berlin
  (H-C2, #159), applied here to Hamburg's annual cadence for the first time (#314). A Gebiet
  classified `),ee=h(d,"B",{"data-svelte-h":!0}),H(ee)!=="svelte-100x5va"&&(ee.textContent=f),Ee=S(d," or "),oe=h(d,"B",{"data-svelte-h":!0}),H(oe)!=="svelte-izdzf8"&&(oe.textContent=ke),Qe=S(d,` below reflects only the last
  ~6 years, not necessarily this area's full history — don't read it with the same long-run framing
  Berlin's own multi-decade biennial figures might imply.`),te=h(d,"BR",{}),y=g(d),Z=h(d,"B",{"data-svelte-h":!0}),H(Z)!=="svelte-1g7f5hr"&&(Z.textContent=le),ae=g(d),G=h(d,"CODE",{"data-svelte-h":!0}),H(G)!=="svelte-177mcp0"&&(G.textContent=Ae),re=S(d,`,
  `),A=h(d,"CODE",{"data-svelte-h":!0}),H(A)!=="svelte-3r4rxk"&&(A.textContent=ce),ye=S(d,", "),ne=h(d,"CODE",{"data-svelte-h":!0}),H(ne)!=="svelte-1y05wir"&&(ne.textContent=be),$e=S(d,", "),L=h(d,"CODE",{"data-svelte-h":!0}),H(L)!=="svelte-wjs7ot"&&(L.textContent=He),de=S(d,`, and
  `),M=h(d,"CODE",{"data-svelte-h":!0}),H(M)!=="svelte-1fwh1wf"&&(M.textContent=Ue),Ce=S(d," describe how this Gebiet's "),E=h(d,"I",{"data-svelte-h":!0}),H(E)!=="svelte-cf0hmg"&&(E.textContent=_e),ie=S(d,` moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  `),K=h(d,"A",{href:!0,"data-svelte-h":!0}),H(K)!=="svelte-pnwl5q"&&(K.textContent=me),je=S(d," for what this classification does and doesn't claim."),this.h()},h(){m(K,"href","/gentriduck/methodology")},m(d,k){s(d,a,k),s(d,t,k),s(d,o,k),s(d,c,k),s(d,u,k),s(d,b,k),s(d,N,k),s(d,ee,k),s(d,Ee,k),s(d,oe,k),s(d,Qe,k),s(d,te,k),s(d,y,k),s(d,Z,k),s(d,ae,k),s(d,G,k),s(d,re,k),s(d,A,k),s(d,ye,k),s(d,ne,k),s(d,$e,k),s(d,L,k),s(d,de,k),s(d,M,k),s(d,Ce,k),s(d,E,k),s(d,ie,k),s(d,K,k),s(d,je,k)},p:Fe,d(d){d&&(i(a),i(t),i(o),i(c),i(u),i(b),i(N),i(ee),i(Ee),i(oe),i(Qe),i(te),i(y),i(Z),i(ae),i(G),i(re),i(A),i(ye),i(ne),i($e),i(L),i(de),i(M),i(Ce),i(E),i(ie),i(K),i(je))}}}function za(l){let a,r;return a=new $t({props:{queryID:"trajectory_summary",queryResult:l[2]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&4&&(c.queryResult=t[2]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function Qa(l){let a,r;return a=new $t({props:{queryID:"sibling_trajectory_mix",queryResult:l[3]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&8&&(c.queryResult=t[3]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function Cr(l){let a,r;return a=new ua({props:{status:"info",$$slots:{default:[xr]},$$scope:{ctx:l}}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[1]&536870912&&(c.$$scope={dirty:o,ctx:t}),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function jr(l){let a,r;return{c(){a=p("p"),r=new tr(!1),this.h()},l(t){a=h(t,"P",{});var o=Ne(a);r=er(o,!1),o.forEach(i),this.h()},h(){r.a=null},m(t,o){s(t,a,o),r.m(l[8],a)},p(t,o){o[0]&256&&r.p(t[8])},i:Fe,o:Fe,d(t){t&&i(a)}}}function xr(l){let a;return{c(){a=T(`No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).`)},l(r){a=S(r,`No trajectory classification is available yet for this Gebiet within the 2019–2025 window (e.g.
  no usable Sozialmonitoring reading on record for this area in that span).`)},m(r,t){s(r,a,t)},d(r){r&&i(a)}}}function Ua(l){let a,r;return a=new $t({props:{queryID:"minimap_areas",queryResult:l[7]}}),{c(){D(a.$$.fragment)},l(t){I(a.$$.fragment,t)},m(t,o){O(a,t,o),r=!0},p(t,o){const c={};o[0]&128&&(c.queryResult=t[7]),a.$set(c)},i(t){r||(w(a.$$.fragment,t),r=!0)},o(t){$(a.$$.fragment,t),r=!1},d(t){R(a,t)}}}function Sr(l){let a;return{c(){a=T("linked above")},l(r){a=S(r,"linked above")},m(r,t){s(r,a,t)},p:Fe,d(r){r&&i(a)}}}function Tr(l){let a,r=(l[6][0].stadtteil_name??l[6][0].stadtteil_code)+"",t,o;return{c(){a=p("a"),t=T(r),this.h()},l(c){a=h(c,"A",{href:!0});var _=Ne(a);t=S(_,r),_.forEach(i),this.h()},h(){m(a,"href",o="/gentriduck/hamburg/area/subarea_l1/"+l[6][0].stadtteil_code)},m(c,_){s(c,a,_),C(a,t)},p(c,_){_[0]&64&&r!==(r=(c[6][0].stadtteil_name??c[6][0].stadtteil_code)+"")&&Xt(t,r),_[0]&64&&o!==(o="/gentriduck/hamburg/area/subarea_l1/"+c[6][0].stadtteil_code)&&m(a,"href",o)},d(c){c&&i(a)}}}function qr(l){var Aa;let a,r,t,o,c,_,u,b,q,N,ee,f,Ee,oe,ke,Qe="all Gebiete",te,y,Z="all Stadtteile",le,ae,G,Ae,re,A,ce,ye,ne,be,$e,L,He=`This area&#39;s current gentrification-stage classification is already public on
<a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a> (hover the Gebiet&#39;s shape or search its code) — this page does not
repeat that figure yet; see the header comment above for why.`,de,M,Ue='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',Ce,E,_e,ie,K,me,je,d,k,ge,Re,F,B,ve,se,at=`Trajectory labels are explained on the <a href="/gentriduck/methodology" class="markdown">methodology page</a> — an &quot;improving&quot; label does
not by itself mean the change was good for existing residents; rising status can reflect
displacement as easily as incumbent social mobility.`,Oe,xe,Ht='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',Me,ue,Be,Se,Ct='<a href="#within-group-dominance">Within-group dominance</a>',rt,x,Pe,Ie,Et='<a href="#people--structure">People &amp; structure</a>',lt,ze,ct,Te,At='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',Rt,dt,Ot,Je,fa='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',It,_t,Dt,Ve,ha='<a href="#where-this-area-sits">Where this area sits</a>',Gt,jt,it,Nt,Le,Zt,Ft,xt,pa="mart_area_hierarchy",ea,Bt,nt,ya="the area-hierarchy reference page",Pt,We,ba='<a href="#honest-caveats">Honest caveats</a>',zt,fe,he,mt,ga=`This Gebiet's name, when shown, is a best-effort OSM match, not an official designation
(#307).`,ta,ut,va="place=neighbourhood",aa,ft,wa="suburb",ra,ht,ka="quarter",ia,$a="{code}",na,sa,oa,pt,Ha=`<strong class="markdown">This page is mostly still a structural scaffold (I21-g, #301).</strong> Every section except &quot;Social
status &amp; trajectory&quot; (below) and the &quot;Up: Stadtteil&quot; link shows a fixed deferred-state placeholder
rather than a real Hamburg figure, even where an underlying mart already has real Hamburg rows for
some other public page (e.g. this Gebiet&#39;s current stage is already shown on
<a href="/gentriduck/hamburg/maps" class="markdown">the map</a>) — publishing the rest of this page&#39;s content is a separately-gated
follow-up (I21-i, #303), not assumed here.`,la,yt,Ca=`<strong class="markdown">The &quot;Social status &amp; trajectory&quot; section above is real, not a placeholder (#317).</strong> It reads
Hamburg&#39;s own admitted rows in <code class="markdown">fct_gentrification_trajectory</code> (#314, dual-signed-off PASS) — a
recent <strong class="markdown">~6-year (2019–2025) window</strong>, not this area&#39;s full 13-edition history, and a
<strong class="markdown">status-only classification</strong>, never a displacement verdict (see the disclosure directly above
that section&#39;s chart).`,ca,bt,ja=`<strong class="markdown">The &quot;Up: Stadtteil&quot; hierarchy link is real, not a placeholder (#302, I21-h).</strong> The underlying
spatial crosswalk was resolved and signed off under OA-D1b/#240; this ticket only publishes it to
the web layer, without re-deciding the method.`,da,gt,xa=`See <a href="/gentriduck/hamburg" class="markdown">Hamburg&#39;s data hub</a> for the full, current inventory of what is and isn&#39;t published
for Hamburg, and <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from
Berlin&#39;s generally.`,Qt,Ye,Sa='<a href="#further-reading">Further reading</a>',Ut,st,Ta=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a> for
this area&#39;s already-public gentrification-stage figure, the
<a href="/gentriduck/hamburg/poi-map" class="markdown">POI &amp; Offering Advantage map</a> for its commercial-mix signal, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,Jt,Tt,Vt,vt,qt,Ke=typeof j<"u"&&(j.title||((Aa=j.og)==null?void 0:Aa.title))&&j.hide_title!==!0&&hr();function Ja(e,n){var X;return typeof j<"u"&&(j.title||(X=j.og)!=null&&X.title)?yr:pr}let Mt=Ja()(l),Xe=typeof j=="object"&&br(),P=l[0]&&Ga(l),z=l[5]&&Na(l),Q=l[1]&&Fa(l),U=l[6]&&Ba(l);N=new sr({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence · most granular",title:l[9],lede:"Hamburg's finest published small-area grain — the same scale Berlin's Planungsraum profile page covers, scaffolded here (I21-g, #301). Its social-status trajectory (2019–2025) is now published below (#317); most other sections remain deferred."}});function qa(e,n){var X;return(X=e[6][0])!=null&&X.stadtteil_code?kr:wr}let Wt=qa(l),De=Wt(l),J=l[5].length===0&&Pa(l);G=new wt({props:{pageLevel:!0,what:"this Gebiet's status, commercial mix, and demographic profile (its social-status trajectory is now published below, #317)"}}),be=new wt({props:{what:"a plain-language portrait for this area (equivalent to the PLR page's 'at a glance' summary)"}}),E=new ua({props:{status:"warning",$$slots:{default:[Hr]},$$scope:{ctx:l}}});let V=l[2]&&za(l),W=l[3]&&Qa(l);me=new ma({props:{data:l[2],value:"trajectory_type",title:"Overall trajectory",emptySet:"warn"}}),d=new ma({props:{data:l[2],value:"dominant_stage",title:"Most common stage",emptySet:"warn"}}),ge=new ma({props:{data:l[2],value:"trajectory_confidence",title:"Confidence",emptySet:"warn"}});const Ma=[jr,Cr],ot=[];function La(e,n){return e[8]?0:e[2].length===0?1:-1}~(F=La(l))&&(B=ot[F]=Ma[F](l)),ue=new wt({props:{what:"this area's commercial-mix breakdown and Offering Advantage profile"}}),x=new wt({props:{what:"within-group dominance figures for this area"}}),ze=new wt({props:{what:"demographic figures for this area"}}),dt=new wt({props:{what:"everyday-infrastructure counts for this area"}}),_t=new wt({props:{what:"land value / estimated rent figures for this area"}});let Y=l[7]&&Ua(l);it=new ir({props:{data:l[7],geoJsonUrl:`${or}/geo/subarea_l1_subarea_l2_drilldown.geojson`,title:l[9]??l[4]}});function Ea(e,n){var X;return(X=e[6][0])!=null&&X.stadtteil_code?Tr:Sr}let Yt=Ea(l),Ge=Yt(l);return vt=new nr({}),{c(){Ke&&Ke.c(),a=v(),Mt.c(),r=p("meta"),t=p("meta"),Xe&&Xe.c(),o=Kt(),c=v(),P&&P.c(),_=v(),z&&z.c(),u=v(),Q&&Q.c(),b=v(),U&&U.c(),q=v(),D(N.$$.fragment),ee=v(),f=p("p"),Ee=T("Up: "),De.c(),oe=T(" · "),ke=p("a"),ke.textContent=Qe,te=T(" · "),y=p("a"),y.textContent=Z,le=v(),J&&J.c(),ae=v(),D(G.$$.fragment),Ae=v(),re=p("h2"),A=p("a"),ce=T(l[9]),ye=T(" at a glance"),ne=v(),D(be.$$.fragment),$e=v(),L=p("p"),L.innerHTML=He,de=v(),M=p("h2"),M.innerHTML=Ue,Ce=v(),D(E.$$.fragment),_e=v(),V&&V.c(),ie=v(),W&&W.c(),K=v(),D(me.$$.fragment),je=v(),D(d.$$.fragment),k=v(),D(ge.$$.fragment),Re=v(),B&&B.c(),ve=v(),se=p("p"),se.innerHTML=at,Oe=v(),xe=p("h2"),xe.innerHTML=Ht,Me=v(),D(ue.$$.fragment),Be=v(),Se=p("h2"),Se.innerHTML=Ct,rt=v(),D(x.$$.fragment),Pe=v(),Ie=p("h2"),Ie.innerHTML=Et,lt=v(),D(ze.$$.fragment),ct=v(),Te=p("h2"),Te.innerHTML=At,Rt=v(),D(dt.$$.fragment),Ot=v(),Je=p("h2"),Je.innerHTML=fa,It=v(),D(_t.$$.fragment),Dt=v(),Ve=p("h2"),Ve.innerHTML=ha,Gt=v(),Y&&Y.c(),jt=v(),D(it.$$.fragment),Nt=v(),Le=p("p"),Zt=T("This Gebiet's parent Stadtteil is "),Ge.c(),Ft=T(`
(see the "Up:" link above) — resolved via the OA-D1b (#240) spatial crosswalk, now published to the
web layer through `),xt=p("code"),xt.textContent=pa,ea=T(" (#302, I21-h). See"),Bt=v(),nt=p("a"),nt.textContent=ya,Pt=T(` for the general concept
(note: that page's own text predates OA-D1b and should be treated as stale on this specific point
until it is refreshed, I21-j).
`),We=p("h2"),We.innerHTML=ba,zt=v(),fe=p("ul"),he=p("li"),mt=p("strong"),mt.textContent=ga,ta=T(` Hamburg's own statistisches-Gebiet source has no name field; where shown, the name
above is derived by matching this Gebiet's polygon against OpenStreetMap
`),ut=p("code"),ut.textContent=va,aa=T("/"),ft=p("code"),ft.textContent=wa,ra=T("/"),ht=p("code"),ht.textContent=ka,ia=T(` points. Coverage is partial by design — many Gebiete
have no OSM match and fall back to the plain numeric code label ("Statistisches Gebiet
`),na=T($a),sa=T('").'),oa=v(),pt=p("li"),pt.innerHTML=Ha,la=v(),yt=p("li"),yt.innerHTML=Ca,ca=v(),bt=p("li"),bt.innerHTML=ja,da=v(),gt=p("li"),gt.innerHTML=xa,Qt=v(),Ye=p("h2"),Ye.innerHTML=Sa,Ut=v(),st=p("p"),st.innerHTML=Ta,Jt=v(),Tt=p("hr"),Vt=v(),D(vt.$$.fragment),this.h()},l(e){Ke&&Ke.l(e),a=g(e);const n=Wa("svelte-2igo1p",document.head);Mt.l(n),r=h(n,"META",{name:!0,content:!0}),t=h(n,"META",{name:!0,content:!0}),Xe&&Xe.l(n),o=Kt(),n.forEach(i),c=g(e),P&&P.l(e),_=g(e),z&&z.l(e),u=g(e),Q&&Q.l(e),b=g(e),U&&U.l(e),q=g(e),I(N.$$.fragment,e),ee=g(e),f=h(e,"P",{});var X=Ne(f);Ee=S(X,"Up: "),De.l(X),oe=S(X," · "),ke=h(X,"A",{href:!0,"data-svelte-h":!0}),H(ke)!=="svelte-1qtzle"&&(ke.textContent=Qe),te=S(X," · "),y=h(X,"A",{href:!0,"data-svelte-h":!0}),H(y)!=="svelte-1wjc2nq"&&(y.textContent=Z),X.forEach(i),le=g(e),J&&J.l(e),ae=g(e),I(G.$$.fragment,e),Ae=g(e),re=h(e,"H2",{class:!0,id:!0});var Lt=Ne(re);A=h(Lt,"A",{href:!0});var St=Ne(A);ce=S(St,l[9]),ye=S(St," at a glance"),St.forEach(i),Lt.forEach(i),ne=g(e),I(be.$$.fragment,e),$e=g(e),L=h(e,"P",{class:!0,"data-svelte-h":!0}),H(L)!=="svelte-1kx8okz"&&(L.innerHTML=He),de=g(e),M=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(M)!=="svelte-14f17uo"&&(M.innerHTML=Ue),Ce=g(e),I(E.$$.fragment,e),_e=g(e),V&&V.l(e),ie=g(e),W&&W.l(e),K=g(e),I(me.$$.fragment,e),je=g(e),I(d.$$.fragment,e),k=g(e),I(ge.$$.fragment,e),Re=g(e),B&&B.l(e),ve=g(e),se=h(e,"P",{class:!0,"data-svelte-h":!0}),H(se)!=="svelte-dvqlbe"&&(se.innerHTML=at),Oe=g(e),xe=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(xe)!=="svelte-1i9w9pn"&&(xe.innerHTML=Ht),Me=g(e),I(ue.$$.fragment,e),Be=g(e),Se=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Se)!=="svelte-4kb45v"&&(Se.innerHTML=Ct),rt=g(e),I(x.$$.fragment,e),Pe=g(e),Ie=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ie)!=="svelte-1mdzqzc"&&(Ie.innerHTML=Et),lt=g(e),I(ze.$$.fragment,e),ct=g(e),Te=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Te)!=="svelte-12k6lqd"&&(Te.innerHTML=At),Rt=g(e),I(dt.$$.fragment,e),Ot=g(e),Je=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Je)!=="svelte-13a10dj"&&(Je.innerHTML=fa),It=g(e),I(_t.$$.fragment,e),Dt=g(e),Ve=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ve)!=="svelte-60cjj9"&&(Ve.innerHTML=ha),Gt=g(e),Y&&Y.l(e),jt=g(e),I(it.$$.fragment,e),Nt=g(e),Le=h(e,"P",{class:!0});var Ze=Ne(Le);Zt=S(Ze,"This Gebiet's parent Stadtteil is "),Ge.l(Ze),Ft=S(Ze,`
(see the "Up:" link above) — resolved via the OA-D1b (#240) spatial crosswalk, now published to the
web layer through `),xt=h(Ze,"CODE",{"data-svelte-h":!0}),H(xt)!=="svelte-1tryhly"&&(xt.textContent=pa),ea=S(Ze," (#302, I21-h). See"),Ze.forEach(i),Bt=g(e),nt=h(e,"A",{href:!0,"data-svelte-h":!0}),H(nt)!=="svelte-1c873cv"&&(nt.textContent=ya),Pt=S(e,` for the general concept
(note: that page's own text predates OA-D1b and should be treated as stale on this specific point
until it is refreshed, I21-j).
`),We=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(We)!=="svelte-ad0syq"&&(We.innerHTML=ba),zt=g(e),fe=h(e,"UL",{class:!0});var qe=Ne(fe);he=h(qe,"LI",{class:!0});var pe=Ne(he);mt=h(pe,"STRONG",{class:!0,"data-svelte-h":!0}),H(mt)!=="svelte-pug0nq"&&(mt.textContent=ga),ta=S(pe,` Hamburg's own statistisches-Gebiet source has no name field; where shown, the name
above is derived by matching this Gebiet's polygon against OpenStreetMap
`),ut=h(pe,"CODE",{class:!0,"data-svelte-h":!0}),H(ut)!=="svelte-15m84of"&&(ut.textContent=va),aa=S(pe,"/"),ft=h(pe,"CODE",{class:!0,"data-svelte-h":!0}),H(ft)!=="svelte-ez40k9"&&(ft.textContent=wa),ra=S(pe,"/"),ht=h(pe,"CODE",{class:!0,"data-svelte-h":!0}),H(ht)!=="svelte-130gzfg"&&(ht.textContent=ka),ia=S(pe,` points. Coverage is partial by design — many Gebiete
have no OSM match and fall back to the plain numeric code label ("Statistisches Gebiet
`),na=S(pe,$a),sa=S(pe,'").'),pe.forEach(i),oa=g(qe),pt=h(qe,"LI",{class:!0,"data-svelte-h":!0}),H(pt)!=="svelte-1qwkczi"&&(pt.innerHTML=Ha),la=g(qe),yt=h(qe,"LI",{class:!0,"data-svelte-h":!0}),H(yt)!=="svelte-1acjjzh"&&(yt.innerHTML=Ca),ca=g(qe),bt=h(qe,"LI",{class:!0,"data-svelte-h":!0}),H(bt)!=="svelte-uw3tog"&&(bt.innerHTML=ja),da=g(qe),gt=h(qe,"LI",{class:!0,"data-svelte-h":!0}),H(gt)!=="svelte-kmx77"&&(gt.innerHTML=xa),qe.forEach(i),Qt=g(e),Ye=h(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),H(Ye)!=="svelte-oimjns"&&(Ye.innerHTML=Sa),Ut=g(e),st=h(e,"P",{class:!0,"data-svelte-h":!0}),H(st)!=="svelte-iql48o"&&(st.innerHTML=Ta),Jt=g(e),Tt=h(e,"HR",{class:!0}),Vt=g(e),I(vt.$$.fragment,e),this.h()},h(){m(r,"name","twitter:card"),m(r,"content","summary_large_image"),m(t,"name","twitter:site"),m(t,"content","@evidence_dev"),m(ke,"href","/gentriduck/hamburg/area"),m(y,"href","/gentriduck/hamburg/area/subarea_l1"),m(A,"href","#namelabel-at-a-glance"),m(re,"class","markdown"),m(re,"id","namelabel-at-a-glance"),m(L,"class","markdown"),m(M,"class","markdown"),m(M,"id","social-status--trajectory"),m(se,"class","markdown"),m(xe,"class","markdown"),m(xe,"id","commercial-mix--offering-advantage"),m(Se,"class","markdown"),m(Se,"id","within-group-dominance"),m(Ie,"class","markdown"),m(Ie,"id","people--structure"),m(Te,"class","markdown"),m(Te,"id","amenities--everyday-infrastructure"),m(Je,"class","markdown"),m(Je,"id","land-value--estimated-rent"),m(Ve,"class","markdown"),m(Ve,"id","where-this-area-sits"),m(Le,"class","markdown"),m(nt,"href","/gentriduck/reference/area-hierarchy"),m(We,"class","markdown"),m(We,"id","honest-caveats"),m(mt,"class","markdown"),m(ut,"class","markdown"),m(ft,"class","markdown"),m(ht,"class","markdown"),m(he,"class","markdown"),m(pt,"class","markdown"),m(yt,"class","markdown"),m(bt,"class","markdown"),m(gt,"class","markdown"),m(fe,"class","markdown"),m(Ye,"class","markdown"),m(Ye,"id","further-reading"),m(st,"class","markdown"),m(Tt,"class","markdown")},m(e,n){Ke&&Ke.m(e,n),s(e,a,n),Mt.m(document.head,null),C(document.head,r),C(document.head,t),Xe&&Xe.m(document.head,null),C(document.head,o),s(e,c,n),P&&P.m(e,n),s(e,_,n),z&&z.m(e,n),s(e,u,n),Q&&Q.m(e,n),s(e,b,n),U&&U.m(e,n),s(e,q,n),O(N,e,n),s(e,ee,n),s(e,f,n),C(f,Ee),De.m(f,null),C(f,oe),C(f,ke),C(f,te),C(f,y),s(e,le,n),J&&J.m(e,n),s(e,ae,n),O(G,e,n),s(e,Ae,n),s(e,re,n),C(re,A),C(A,ce),C(A,ye),s(e,ne,n),O(be,e,n),s(e,$e,n),s(e,L,n),s(e,de,n),s(e,M,n),s(e,Ce,n),O(E,e,n),s(e,_e,n),V&&V.m(e,n),s(e,ie,n),W&&W.m(e,n),s(e,K,n),O(me,e,n),s(e,je,n),O(d,e,n),s(e,k,n),O(ge,e,n),s(e,Re,n),~F&&ot[F].m(e,n),s(e,ve,n),s(e,se,n),s(e,Oe,n),s(e,xe,n),s(e,Me,n),O(ue,e,n),s(e,Be,n),s(e,Se,n),s(e,rt,n),O(x,e,n),s(e,Pe,n),s(e,Ie,n),s(e,lt,n),O(ze,e,n),s(e,ct,n),s(e,Te,n),s(e,Rt,n),O(dt,e,n),s(e,Ot,n),s(e,Je,n),s(e,It,n),O(_t,e,n),s(e,Dt,n),s(e,Ve,n),s(e,Gt,n),Y&&Y.m(e,n),s(e,jt,n),O(it,e,n),s(e,Nt,n),s(e,Le,n),C(Le,Zt),Ge.m(Le,null),C(Le,Ft),C(Le,xt),C(Le,ea),s(e,Bt,n),s(e,nt,n),s(e,Pt,n),s(e,We,n),s(e,zt,n),s(e,fe,n),C(fe,he),C(he,mt),C(he,ta),C(he,ut),C(he,aa),C(he,ft),C(he,ra),C(he,ht),C(he,ia),C(he,na),C(he,sa),C(fe,oa),C(fe,pt),C(fe,la),C(fe,yt),C(fe,ca),C(fe,bt),C(fe,da),C(fe,gt),s(e,Qt,n),s(e,Ye,n),s(e,Ut,n),s(e,st,n),s(e,Jt,n),s(e,Tt,n),s(e,Vt,n),O(vt,e,n),qt=!0},p(e,n){var Ra;typeof j<"u"&&(j.title||(Ra=j.og)!=null&&Ra.title)&&j.hide_title!==!0&&Ke.p(e,n),Mt.p(e,n),typeof j=="object"&&Xe.p(e,n),e[0]?P?(P.p(e,n),n[0]&1&&w(P,1)):(P=Ga(e),P.c(),w(P,1),P.m(_.parentNode,_)):P&&(tt(),$(P,1,1,()=>{P=null}),et()),e[5]?z?(z.p(e,n),n[0]&32&&w(z,1)):(z=Na(e),z.c(),w(z,1),z.m(u.parentNode,u)):z&&(tt(),$(z,1,1,()=>{z=null}),et()),e[1]?Q?(Q.p(e,n),n[0]&2&&w(Q,1)):(Q=Fa(e),Q.c(),w(Q,1),Q.m(b.parentNode,b)):Q&&(tt(),$(Q,1,1,()=>{Q=null}),et()),e[6]?U?(U.p(e,n),n[0]&64&&w(U,1)):(U=Ba(e),U.c(),w(U,1),U.m(q.parentNode,q)):U&&(tt(),$(U,1,1,()=>{U=null}),et());const X={};n[0]&512&&(X.title=e[9]),N.$set(X),Wt===(Wt=qa(e))&&De?De.p(e,n):(De.d(1),De=Wt(e),De&&(De.c(),De.m(f,oe))),e[5].length===0?J?(J.p(e,n),n[0]&32&&w(J,1)):(J=Pa(e),J.c(),w(J,1),J.m(ae.parentNode,ae)):J&&(tt(),$(J,1,1,()=>{J=null}),et()),(!qt||n[0]&512)&&Xt(ce,e[9]);const Lt={};n[1]&536870912&&(Lt.$$scope={dirty:n,ctx:e}),E.$set(Lt),e[2]?V?(V.p(e,n),n[0]&4&&w(V,1)):(V=za(e),V.c(),w(V,1),V.m(ie.parentNode,ie)):V&&(tt(),$(V,1,1,()=>{V=null}),et()),e[3]?W?(W.p(e,n),n[0]&8&&w(W,1)):(W=Qa(e),W.c(),w(W,1),W.m(K.parentNode,K)):W&&(tt(),$(W,1,1,()=>{W=null}),et());const St={};n[0]&4&&(St.data=e[2]),me.$set(St);const Ze={};n[0]&4&&(Ze.data=e[2]),d.$set(Ze);const qe={};n[0]&4&&(qe.data=e[2]),ge.$set(qe);let pe=F;F=La(e),F===pe?~F&&ot[F].p(e,n):(B&&(tt(),$(ot[pe],1,1,()=>{ot[pe]=null}),et()),~F?(B=ot[F],B?B.p(e,n):(B=ot[F]=Ma[F](e),B.c()),w(B,1),B.m(ve.parentNode,ve)):B=null),e[7]?Y?(Y.p(e,n),n[0]&128&&w(Y,1)):(Y=Ua(e),Y.c(),w(Y,1),Y.m(jt.parentNode,jt)):Y&&(tt(),$(Y,1,1,()=>{Y=null}),et());const _a={};n[0]&128&&(_a.data=e[7]),n[0]&528&&(_a.title=e[9]??e[4]),it.$set(_a),Yt===(Yt=Ea(e))&&Ge?Ge.p(e,n):(Ge.d(1),Ge=Yt(e),Ge&&(Ge.c(),Ge.m(Le,Ft)))},i(e){qt||(w(P),w(z),w(Q),w(U),w(N.$$.fragment,e),w(J),w(G.$$.fragment,e),w(be.$$.fragment,e),w(E.$$.fragment,e),w(V),w(W),w(me.$$.fragment,e),w(d.$$.fragment,e),w(ge.$$.fragment,e),w(B),w(ue.$$.fragment,e),w(x.$$.fragment,e),w(ze.$$.fragment,e),w(dt.$$.fragment,e),w(_t.$$.fragment,e),w(Y),w(it.$$.fragment,e),w(vt.$$.fragment,e),qt=!0)},o(e){$(P),$(z),$(Q),$(U),$(N.$$.fragment,e),$(J),$(G.$$.fragment,e),$(be.$$.fragment,e),$(E.$$.fragment,e),$(V),$(W),$(me.$$.fragment,e),$(d.$$.fragment,e),$(ge.$$.fragment,e),$(B),$(ue.$$.fragment,e),$(x.$$.fragment,e),$(ze.$$.fragment,e),$(dt.$$.fragment,e),$(_t.$$.fragment,e),$(Y),$(it.$$.fragment,e),$(vt.$$.fragment,e),qt=!1},d(e){e&&(i(a),i(c),i(_),i(u),i(b),i(q),i(ee),i(f),i(le),i(ae),i(Ae),i(re),i(ne),i($e),i(L),i(de),i(M),i(Ce),i(_e),i(ie),i(K),i(je),i(k),i(Re),i(ve),i(se),i(Oe),i(xe),i(Me),i(Be),i(Se),i(rt),i(Pe),i(Ie),i(lt),i(ct),i(Te),i(Rt),i(Ot),i(Je),i(It),i(Dt),i(Ve),i(Gt),i(jt),i(Nt),i(Le),i(Bt),i(nt),i(Pt),i(We),i(zt),i(fe),i(Qt),i(Ye),i(Ut),i(st),i(Jt),i(Tt),i(Vt)),Ke&&Ke.d(e),Mt.d(e),i(r),i(t),Xe&&Xe.d(e),i(o),P&&P.d(e),z&&z.d(e),Q&&Q.d(e),U&&U.d(e),R(N,e),De.d(),J&&J.d(e),R(G,e),R(be,e),R(E,e),V&&V.d(e),W&&W.d(e),R(me,e),R(d,e),R(ge,e),~F&&ot[F].d(e),R(ue,e),R(x,e),R(ze,e),R(dt,e),R(_t,e),Y&&Y.d(e),R(it,e),Ge.d(),R(vt,e)}}}const j={};function Mr(l,a,r){let t,o,c,_,u,b,q,N;Oa(l,ur,x=>r(44,q=x)),Oa(l,Da,x=>r(49,N=x));let{data:ee}=a,{data:f={},customFormattingSettings:Ee,__db:oe,inputs:ke}=ee;Ya(Da,N="89d6a2c7209c2d907e58ae263a74d1a5",N);let Qe=cr(lr(ke));Ka(Qe.subscribe(x=>ke=x)),Xa(mr,{getCustomFormats:()=>Ee.customFormats||[]});const te=(x,Pe)=>fr(oe.query,x,{query_name:Pe});dr(te);let y=q.params;Za(()=>!0);let Z={initialData:void 0,initialError:void 0},le=we`-- Build-time-fixed route parameter, the same \`${y.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${y.code}' as area_code`,ae=`-- Build-time-fixed route parameter, the same \`${y.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${y.code}' as area_code`;f.code_info_data&&(f.code_info_data instanceof Error?Z.initialError=f.code_info_data:Z.initialData=f.code_info_data,f.code_info_columns&&(Z.knownColumns=f.code_info_columns));let G,Ae=!1;const re=kt.createReactive({callback:x=>{r(0,G=x)},execFn:te},{id:"code_info",...Z});re(ae,{noResolve:le,...Z}),globalThis[Symbol.for("code_info")]={get value(){return G}};let A={initialData:void 0,initialError:void 0},ce=we`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`,ye=`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`;f.area_exists_data&&(f.area_exists_data instanceof Error?A.initialError=f.area_exists_data:A.initialData=f.area_exists_data,f.area_exists_columns&&(A.knownColumns=f.area_exists_columns));let ne,be=!1;const $e=kt.createReactive({callback:x=>{r(5,ne=x)},execFn:te},{id:"area_exists",...A});$e(ye,{noResolve:ce,...A}),globalThis[Symbol.for("area_exists")]={get value(){return ne}};let L={initialData:void 0,initialError:void 0},He=we`-- #307: best-effort OSM-derived Gebiet name, now that this page HAS a name to derive from a mart
-- (unlike when this page was first scaffolded, #301) -- dim_area_geometry.area_name for subarea_l2
-- rows is populated by int_hamburg_gebiet_osm_names' point-in-polygon match against OSM
-- place=neighbourhood|suburb|quarter nodes (see that model's header for the method). Coverage is
-- PARTIAL by design (943 official Gebiete vs informal OSM tagging) -- area_name may be null/blank,
-- which the script fallback below degrades gracefully to the numeric code label for.
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`,de=`-- #307: best-effort OSM-derived Gebiet name, now that this page HAS a name to derive from a mart
-- (unlike when this page was first scaffolded, #301) -- dim_area_geometry.area_name for subarea_l2
-- rows is populated by int_hamburg_gebiet_osm_names' point-in-polygon match against OSM
-- place=neighbourhood|suburb|quarter nodes (see that model's header for the method). Coverage is
-- PARTIAL by design (943 official Gebiete vs informal OSM tagging) -- area_name may be null/blank,
-- which the script fallback below degrades gracefully to the numeric code label for.
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`;f.name_info_data&&(f.name_info_data instanceof Error?L.initialError=f.name_info_data:L.initialData=f.name_info_data,f.name_info_columns&&(L.knownColumns=f.name_info_columns));let M,Ue=!1;const Ce=kt.createReactive({callback:x=>{r(1,M=x)},execFn:te},{id:"name_info",...L});Ce(de,{noResolve:He,...L}),globalThis[Symbol.for("name_info")]={get value(){return M}};let E={initialData:void 0,initialError:void 0},_e=we`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${y.code}'
limit 1`,ie=`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${y.code}'
limit 1`;f.parent_info_data&&(f.parent_info_data instanceof Error?E.initialError=f.parent_info_data:E.initialData=f.parent_info_data,f.parent_info_columns&&(E.knownColumns=f.parent_info_columns));let K,me=!1;const je=kt.createReactive({callback:x=>{r(6,K=x)},execFn:te},{id:"parent_info",...E});je(ie,{noResolve:_e,...E}),globalThis[Symbol.for("parent_info")]={get value(){return K}};let d={initialData:void 0,initialError:void 0},k=we`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${y.code}'`,ge=`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${y.code}'`;f.trajectory_summary_data&&(f.trajectory_summary_data instanceof Error?d.initialError=f.trajectory_summary_data:d.initialData=f.trajectory_summary_data,f.trajectory_summary_columns&&(d.knownColumns=f.trajectory_summary_columns));let Re,F=!1;const B=kt.createReactive({callback:x=>{r(2,Re=x)},execFn:te},{id:"trajectory_summary",...d});B(ge,{noResolve:k,...d}),globalThis[Symbol.for("trajectory_summary")]={get value(){return Re}};let ve={initialData:void 0,initialError:void 0},se=we`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
        limit 1
    )
group by all`,at=`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
        limit 1
    )
group by all`;f.sibling_trajectory_mix_data&&(f.sibling_trajectory_mix_data instanceof Error?ve.initialError=f.sibling_trajectory_mix_data:ve.initialData=f.sibling_trajectory_mix_data,f.sibling_trajectory_mix_columns&&(ve.knownColumns=f.sibling_trajectory_mix_columns));let Oe,xe=!1;const Ht=kt.createReactive({callback:x=>{r(3,Oe=x)},execFn:te},{id:"sibling_trajectory_mix",...ve});Ht(at,{noResolve:se,...ve}),globalThis[Symbol.for("sibling_trajectory_mix")]={get value(){return Oe}};let Me={initialData:void 0,initialError:void 0},ue=we`-- Name resolved directly in SQL (not via a JS-templated string literal) so an OSM-derived name
-- (#307) containing a quote character can never break this query's own SQL syntax -- same
-- coalesce-to-code fallback as name_info/nameLabel above, re-expressed in SQL only.
select
    'subarea_l2:' || '${y.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${y.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'`,Be=`-- Name resolved directly in SQL (not via a JS-templated string literal) so an OSM-derived name
-- (#307) containing a quote character can never break this query's own SQL syntax -- same
-- coalesce-to-code fallback as name_info/nameLabel above, re-expressed in SQL only.
select
    'subarea_l2:' || '${y.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${y.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'`;f.minimap_areas_data&&(f.minimap_areas_data instanceof Error?Me.initialError=f.minimap_areas_data:Me.initialData=f.minimap_areas_data,f.minimap_areas_columns&&(Me.knownColumns=f.minimap_areas_columns));let Se,Ct=!1;const rt=kt.createReactive({callback:x=>{r(7,Se=x)},execFn:te},{id:"minimap_areas",...Me});return rt(Be,{noResolve:ue,...Me}),globalThis[Symbol.for("minimap_areas")]={get value(){return Se}},l.$$set=x=>{"data"in x&&r(10,ee=x.data)},l.$$.update=()=>{var x;l.$$.dirty[0]&1024&&r(11,{data:f={},customFormattingSettings:Ee,__db:oe}=ee,f),l.$$.dirty[0]&2048&&_r.set(Object.keys(f).length>0),l.$$.dirty[1]&8192&&r(12,y=q.params),l.$$.dirty[0]&4096&&r(14,le=we`-- Build-time-fixed route parameter, the same \`${y.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${y.code}' as area_code`),l.$$.dirty[0]&4096&&r(15,ae=`-- Build-time-fixed route parameter, the same \`${y.code}\` interpolation mechanism every
-- templated page on this site uses (see e.g. pages/berlin/area/[code].md's \`area_info\` query) --
-- selected into a plain row so it can be referenced in markup as \`code_info[0].area_code\`.
select '${y.code}' as area_code`),l.$$.dirty[0]&122880&&(le||!Ae?le||(re(ae,{noResolve:le,...Z}),r(16,Ae=!0)):re(ae,{noResolve:le})),l.$$.dirty[0]&4096&&r(18,ce=we`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`),l.$$.dirty[0]&4096&&r(19,ye=`select area_code
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`),l.$$.dirty[0]&1966080&&(ce||!be?ce||($e(ye,{noResolve:ce,...A}),r(20,be=!0)):$e(ye,{noResolve:ce})),l.$$.dirty[0]&4096&&r(22,He=we`-- #307: best-effort OSM-derived Gebiet name, now that this page HAS a name to derive from a mart
-- (unlike when this page was first scaffolded, #301) -- dim_area_geometry.area_name for subarea_l2
-- rows is populated by int_hamburg_gebiet_osm_names' point-in-polygon match against OSM
-- place=neighbourhood|suburb|quarter nodes (see that model's header for the method). Coverage is
-- PARTIAL by design (943 official Gebiete vs informal OSM tagging) -- area_name may be null/blank,
-- which the script fallback below degrades gracefully to the numeric code label for.
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`),l.$$.dirty[0]&4096&&r(23,de=`-- #307: best-effort OSM-derived Gebiet name, now that this page HAS a name to derive from a mart
-- (unlike when this page was first scaffolded, #301) -- dim_area_geometry.area_name for subarea_l2
-- rows is populated by int_hamburg_gebiet_osm_names' point-in-polygon match against OSM
-- place=neighbourhood|suburb|quarter nodes (see that model's header for the method). Coverage is
-- PARTIAL by design (943 official Gebiete vs informal OSM tagging) -- area_name may be null/blank,
-- which the script fallback below degrades gracefully to the numeric code label for.
select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
limit 1`),l.$$.dirty[0]&31457280&&(He||!Ue?He||(Ce(de,{noResolve:He,...L}),r(24,Ue=!0)):Ce(de,{noResolve:He})),l.$$.dirty[0]&4096&&r(26,_e=we`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${y.code}'
limit 1`),l.$$.dirty[0]&4096&&r(27,ie=`-- #302 (I21-h): resolved parent Stadtteil, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l2_to_l1 CTE, the OA-D1b/#240 spatial crosswalk -- see that model's
-- header for the method; this query re-derives nothing). Joined against dim_area_geometry for the
-- display name (structural lookup, not a statistic -- same framing as area_exists above).
select
    h.parent_area_code as stadtteil_code,
    g.area_name as stadtteil_name
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.parent_area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = '${y.code}'
limit 1`),l.$$.dirty[0]&503316480&&(_e||!me?_e||(je(ie,{noResolve:_e,...E}),r(28,me=!0)):je(ie,{noResolve:_e})),l.$$.dirty[0]&4096&&r(30,k=we`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${y.code}'`),l.$$.dirty[0]&4096&&r(31,ge=`-- #317: real Hamburg trajectory data, via fct_gentrification_trajectory (Hamburg admitted #314,
-- H-C2/#159 cadence-normalized trajectory_window_years=6 window, area_vintage='current'). Same
-- shape as pages/berlin/area/[code].md's own trajectory_summary query, area_vintage/city_code
-- swapped -- no new computation, this ticket is display wiring only.
select
    n_editions,
    first_edition,
    last_edition,
    status_index_first,
    status_index_last,
    status_delta,
    trajectory_type,
    dominant_stage,
    trajectory_confidence
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'HH' and area_vintage = 'current' and area_code = '${y.code}'`),l.$$.dirty[0]&1610612736|l.$$.dirty[1]&3&&(k||!F?k||(B(ge,{noResolve:k,...d}),r(32,F=!0)):B(ge,{noResolve:k})),l.$$.dirty[0]&4096&&r(34,se=we`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
        limit 1
    )
group by all`),l.$$.dirty[0]&4096&&r(35,at=`-- Distribution of trajectory_type across this Gebiet's sibling Gebiete (same Stadtteil) -- the same
-- "N of M other areas ... show this pattern" comparison as the PLR page's district_trajectory_mix,
-- resolved via mart_area_hierarchy's already-published subarea_l2 -> subarea_l1 edge (OA-D1b/#240,
-- #302/I21-h), not re-derived here.
select t.trajectory_type, count(*) as n
from gentriduck_marts.fct_gentrification_trajectory as t
join
    gentriduck_marts.mart_area_hierarchy as h
    on h.city_code = 'HH' and h.area_level = 'subarea_l2' and h.area_code = t.area_code
where
    t.city_code = 'HH' and t.area_vintage = 'current'
    and h.parent_area_code = (
        select parent_area_code
        from gentriduck_marts.mart_area_hierarchy
        where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'
        limit 1
    )
group by all`),l.$$.dirty[1]&60&&(se||!xe?se||(Ht(at,{noResolve:se,...ve}),r(36,xe=!0)):Ht(at,{noResolve:se})),l.$$.dirty[0]&4096&&r(38,ue=we`-- Name resolved directly in SQL (not via a JS-templated string literal) so an OSM-derived name
-- (#307) containing a quote character can never break this query's own SQL syntax -- same
-- coalesce-to-code fallback as name_info/nameLabel above, re-expressed in SQL only.
select
    'subarea_l2:' || '${y.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${y.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'`),l.$$.dirty[0]&4096&&r(39,Be=`-- Name resolved directly in SQL (not via a JS-templated string literal) so an OSM-derived name
-- (#307) containing a quote character can never break this query's own SQL syntax -- same
-- coalesce-to-code fallback as name_info/nameLabel above, re-expressed in SQL only.
select
    'subarea_l2:' || '${y.code}' as feature_key,
    coalesce(nullif(area_name, ''), '${y.code}') as area_name,
    'This area' as role,
    cast(null as varchar) as link
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'subarea_l2' and area_code = '${y.code}'`),l.$$.dirty[1]&960&&(ue||!Ct?ue||(rt(Be,{noResolve:ue,...Me}),r(40,Ct=!0)):rt(Be,{noResolve:ue})),l.$$.dirty[0]&1&&r(4,t=G[0]?G[0].area_code:""),l.$$.dirty[0]&2&&r(43,o=(x=M==null?void 0:M[0])!=null&&x.area_name?M[0].area_name:null),l.$$.dirty[0]&16|l.$$.dirty[1]&4096&&r(9,c=o?`${o} (Gebiet ${t})`:`Statistisches Gebiet ${t}`),l.$$.dirty[0]&4&&r(41,_=Re==null?void 0:Re[0]),l.$$.dirty[0]&8&&r(42,u=Array.isArray(Oe)?Oe:Array.from(Oe??[])),l.$$.dirty[1]&3072&&r(8,b=(()=>{if(!_||_.n_editions==null)return null;if(_.n_editions<=1)return"Only one annual Sozialmonitoring reading is on record for this Gebiet within the 2019–2025 window, so its pace of change can't be assessed yet.";const Pe=_.status_delta!=null?Math.abs(Number(_.status_delta)):null,Ie=Pe==null?"at an unclear pace":Pe<.4?"only gradually":Pe<1.2?"at a moderate pace":"quickly, moving several status steps",Et={improving:"become less deprived",declining:"become more deprived","stable-established":"stayed consistently low-deprivation","persistently-deprived":"stayed consistently high-deprivation",mixed:"shown no single clear direction"}[_.trajectory_type]??"shown an unclassified pattern";let lt=`Within the 2019–2025 window (editions ${_.first_edition}–${_.last_edition} on record), it has ${Et}, ${Ie} (trajectory confidence: ${_.trajectory_confidence}).`;const ze=u.reduce((Te,At)=>Te+Number(At.n||0),0),ct=u.find(Te=>Te.trajectory_type===_.trajectory_type);return ze>0&&ct&&(lt+=` ${ct.n} of ${ze} other Gebiete in this Stadtteil with a usable trajectory show this same "${_.trajectory_type}" pattern.`),lt})())},[G,M,Re,Oe,t,ne,K,Se,b,c,ee,f,y,Z,le,ae,Ae,A,ce,ye,be,L,He,de,Ue,E,_e,ie,me,d,k,ge,F,ve,se,at,xe,Me,ue,Be,Ct,_,u,o,q]}class Vr extends ar{constructor(a){super(),rr(this,a,Mr,qr,Va,{data:10},null,[-1,-1])}}export{Vr as component};
