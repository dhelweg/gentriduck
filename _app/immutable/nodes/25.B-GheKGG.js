import{s as Pt,d as n,i as s,a as ct,b as f,c as h,h as Wt,e as p,f as _t,g as j,t as re,j as g,k as y,u as ie,l as Mt,m as zt,o as Qt,n as Ot,p as Ut,q as ge,r as Bt,v as Jt,H as Yt}from"../chunks/scheduler.BopPEjhc.js";import{S as Vt,i as Xt,d as W,t as $,a as k,c as Be,m as z,b as Q,e as O,g as Ae}from"../chunks/index.CYkVJg6_.js";import{A as Zt}from"../chunks/AreaDrilldownMap.CfCM6Ax2.js";import{F as Kt}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as ea}from"../chunks/Hero.CRoRGI02.js";import{N as Ne}from"../chunks/NotYetPublished.DquJtoGu.js";import{D as ta,C as aa}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as Oe,w as ra}from"../chunks/entry.BMmpG6A7.js";import{A as At}from"../chunks/Alert.BO8kFSQK.js";import{e as ia,s as na,Q as Qe,p as sa,a as Et,r as Rt,C as oa}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as he}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as la}from"../chunks/stores.Ceyp10jj.js";import{Q as Ue}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as da}from"../chunks/BarChart.DzrCmZ_r.js";import{p as ca}from"../chunks/profile.BW8tN6E9.js";function _a(l){var o;let a,i=(v.title??((o=v.og)==null?void 0:o.title))+"",t;return{c(){a=y("h1"),t=ie(i),this.h()},l(_){a=p(_,"H1",{class:!0});var b=Bt(a);t=re(b,i),b.forEach(n),this.h()},h(){f(a,"class","title")},m(_,b){s(_,a,b),ct(a,t)},p:ge,d(_){_&&n(a)}}}function ma(l){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:ge,p:ge,d:ge}}function ua(l){var b;let a,i,t,o,_;return document.title=a=v.title??((b=v.og)==null?void 0:b.title),{c(){i=g(),t=y("meta"),o=g(),_=y("meta"),this.h()},l(m){i=h(m),t=p(m,"META",{property:!0,content:!0}),o=h(m),_=p(m,"META",{name:!0,content:!0}),this.h()},h(){var m,c;f(t,"property","og:title"),f(t,"content",((m=v.og)==null?void 0:m.title)??v.title),f(_,"name","twitter:title"),f(_,"content",((c=v.og)==null?void 0:c.title)??v.title)},m(m,c){s(m,i,c),s(m,t,c),s(m,o,c),s(m,_,c)},p(m,c){var X;c&0&&a!==(a=v.title??((X=v.og)==null?void 0:X.title))&&(document.title=a)},d(m){m&&(n(i),n(t),n(o),n(_))}}}function fa(l){var _,b;let a,i,t=(v.description||((_=v.og)==null?void 0:_.description))&&ha(),o=((b=v.og)==null?void 0:b.image)&&ga();return{c(){t&&t.c(),a=g(),o&&o.c(),i=_t()},l(m){t&&t.l(m),a=h(m),o&&o.l(m),i=_t()},m(m,c){t&&t.m(m,c),s(m,a,c),o&&o.m(m,c),s(m,i,c)},p(m,c){var X,B;(v.description||(X=v.og)!=null&&X.description)&&t.p(m,c),(B=v.og)!=null&&B.image&&o.p(m,c)},d(m){m&&(n(a),n(i)),t&&t.d(m),o&&o.d(m)}}}function ha(l){let a,i,t,o,_;return{c(){a=y("meta"),i=g(),t=y("meta"),o=g(),_=y("meta"),this.h()},l(b){a=p(b,"META",{name:!0,content:!0}),i=h(b),t=p(b,"META",{property:!0,content:!0}),o=h(b),_=p(b,"META",{name:!0,content:!0}),this.h()},h(){var b,m,c;f(a,"name","description"),f(a,"content",v.description??((b=v.og)==null?void 0:b.description)),f(t,"property","og:description"),f(t,"content",((m=v.og)==null?void 0:m.description)??v.description),f(_,"name","twitter:description"),f(_,"content",((c=v.og)==null?void 0:c.description)??v.description)},m(b,m){s(b,a,m),s(b,i,m),s(b,t,m),s(b,o,m),s(b,_,m)},p:ge,d(b){b&&(n(a),n(i),n(t),n(o),n(_))}}}function ga(l){let a,i,t;return{c(){a=y("meta"),i=g(),t=y("meta"),this.h()},l(o){a=p(o,"META",{property:!0,content:!0}),i=h(o),t=p(o,"META",{name:!0,content:!0}),this.h()},h(){var o,_;f(a,"property","og:image"),f(a,"content",Et((o=v.og)==null?void 0:o.image)),f(t,"name","twitter:image"),f(t,"content",Et((_=v.og)==null?void 0:_.image))},m(o,_){s(o,a,_),s(o,i,_),s(o,t,_)},p:ge,d(o){o&&(n(a),n(i),n(t))}}}function Lt(l){let a,i;return a=new Ue({props:{queryID:"district_name",queryResult:l[1]}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p(t,o){const _={};o[0]&2&&(_.queryResult=t[1]),a.$set(_)},i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function It(l){let a,i;return a=new Ue({props:{queryID:"children",queryResult:l[2]}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p(t,o){const _={};o[0]&4&&(_.queryResult=t[2]),a.$set(_)},i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function pa(l){let a,i="Two things to know before reading this section (#317):",t,o,_,b="1. Recent window, not full history.",m,c,X=`~6-year window
  (2019–2025)`,B,de,pe="persistently-deprived",A,u,q="stable-established",K,ee,Y,ne,me="2. Status-only, not a displacement verdict.",S,M,te="stable-established",ae,C,N="persistently-deprived",P,T,ce="improving",U,se,ue="declining",E,R,J="mixed",oe,Z,le="officially-measured social status",V,x,fe="methodology",_e;return{c(){a=y("b"),a.textContent=i,t=y("br"),o=g(),_=y("b"),_.textContent=b,m=ie(" These labels describe a bounded "),c=y("b"),c.textContent=X,B=ie(` of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series — the same cadence-normalized window already used for Berlin (H-C2, #159),
  applied here to Hamburg's annual cadence for the first time (#314). A Gebiet classified
  `),de=y("b"),de.textContent=pe,A=ie(" or "),u=y("b"),u.textContent=q,K=ie(` below reflects only the last ~6 years,
  not necessarily its full history — don't read it with the same long-run framing Berlin's own
  multi-decade biennial figures might imply.`),ee=y("br"),Y=g(),ne=y("b"),ne.textContent=me,S=g(),M=y("code"),M.textContent=te,ae=ie(`,
  `),C=y("code"),C.textContent=N,P=ie(", "),T=y("code"),T.textContent=ce,U=ie(", "),se=y("code"),se.textContent=ue,E=ie(`, and
  `),R=y("code"),R.textContent=J,oe=ie(" describe how each Gebiet's "),Z=y("i"),Z.textContent=le,V=ie(` moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  `),x=y("a"),x.textContent=fe,_e=ie(" for what this classification does and doesn't claim."),this.h()},l(d){a=p(d,"B",{"data-svelte-h":!0}),j(a)!=="svelte-f92r3c"&&(a.textContent=i),t=p(d,"BR",{}),o=h(d),_=p(d,"B",{"data-svelte-h":!0}),j(_)!=="svelte-gpn4f2"&&(_.textContent=b),m=re(d," These labels describe a bounded "),c=p(d,"B",{"data-svelte-h":!0}),j(c)!=="svelte-xbdj07"&&(c.textContent=X),B=re(d,` of Hamburg's own annual Sozialmonitoring panel, not the full 13-edition
  (2013–2025) series — the same cadence-normalized window already used for Berlin (H-C2, #159),
  applied here to Hamburg's annual cadence for the first time (#314). A Gebiet classified
  `),de=p(d,"B",{"data-svelte-h":!0}),j(de)!=="svelte-100x5va"&&(de.textContent=pe),A=re(d," or "),u=p(d,"B",{"data-svelte-h":!0}),j(u)!=="svelte-izdzf8"&&(u.textContent=q),K=re(d,` below reflects only the last ~6 years,
  not necessarily its full history — don't read it with the same long-run framing Berlin's own
  multi-decade biennial figures might imply.`),ee=p(d,"BR",{}),Y=h(d),ne=p(d,"B",{"data-svelte-h":!0}),j(ne)!=="svelte-1g7f5hr"&&(ne.textContent=me),S=h(d),M=p(d,"CODE",{"data-svelte-h":!0}),j(M)!=="svelte-177mcp0"&&(M.textContent=te),ae=re(d,`,
  `),C=p(d,"CODE",{"data-svelte-h":!0}),j(C)!=="svelte-3r4rxk"&&(C.textContent=N),P=re(d,", "),T=p(d,"CODE",{"data-svelte-h":!0}),j(T)!=="svelte-1y05wir"&&(T.textContent=ce),U=re(d,", "),se=p(d,"CODE",{"data-svelte-h":!0}),j(se)!=="svelte-wjs7ot"&&(se.textContent=ue),E=re(d,`, and
  `),R=p(d,"CODE",{"data-svelte-h":!0}),j(R)!=="svelte-1fwh1wf"&&(R.textContent=J),oe=re(d," describe how each Gebiet's "),Z=p(d,"I",{"data-svelte-h":!0}),j(Z)!=="svelte-cf0hmg"&&(Z.textContent=le),V=re(d,` moved over
  that window — never a claim about who moved, why, or whether any resident was displaced. See
  `),x=p(d,"A",{href:!0,"data-svelte-h":!0}),j(x)!=="svelte-pnwl5q"&&(x.textContent=fe),_e=re(d," for what this classification does and doesn't claim."),this.h()},h(){f(x,"href","/gentriduck/methodology")},m(d,w){s(d,a,w),s(d,t,w),s(d,o,w),s(d,_,w),s(d,m,w),s(d,c,w),s(d,B,w),s(d,de,w),s(d,A,w),s(d,u,w),s(d,K,w),s(d,ee,w),s(d,Y,w),s(d,ne,w),s(d,S,w),s(d,M,w),s(d,ae,w),s(d,C,w),s(d,P,w),s(d,T,w),s(d,U,w),s(d,se,w),s(d,E,w),s(d,R,w),s(d,oe,w),s(d,Z,w),s(d,V,w),s(d,x,w),s(d,_e,w)},p:ge,d(d){d&&(n(a),n(t),n(o),n(_),n(m),n(c),n(B),n(de),n(A),n(u),n(K),n(ee),n(Y),n(ne),n(S),n(M),n(ae),n(C),n(P),n(T),n(U),n(se),n(E),n(R),n(oe),n(Z),n(V),n(x),n(_e))}}}function Ft(l){let a,i;return a=new Ue({props:{queryID:"trajectory_mix",queryResult:l[3]}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p(t,o){const _={};o[0]&8&&(_.queryResult=t[3]),a.$set(_)},i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function Gt(l){let a,i;return a=new Ue({props:{queryID:"trajectory_mix_summary",queryResult:l[0]}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p(t,o){const _={};o[0]&1&&(_.queryResult=t[0]),a.$set(_)},i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function ya(l){let a,i;return a=new At({props:{status:"warning",$$slots:{default:[wa]},$$scope:{ctx:l}}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p(t,o){const _={};o[1]&8192&&(_.$$scope={dirty:o,ctx:t}),a.$set(_)},i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function ba(l){let a,i;return{c(){a=y("p"),i=new Yt(!1),this.h()},l(t){a=p(t,"P",{});var o=Bt(a);i=Jt(o,!1),o.forEach(n),this.h()},h(){i.a=null},m(t,o){s(t,a,o),i.m(l[5],a)},p(t,o){o[0]&32&&i.p(t[5])},i:ge,o:ge,d(t){t&&n(a)}}}function wa(l){let a;return{c(){a=ie("No Gebiet trajectory data available for this district within the 2019–2025 window.")},l(i){a=re(i,"No Gebiet trajectory data available for this district within the 2019–2025 window.")},m(i,t){s(i,a,t)},d(i){i&&n(a)}}}function Dt(l){let a,i;return a=new Ue({props:{queryID:"minimap_areas",queryResult:l[4]}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p(t,o){const _={};o[0]&16&&(_.queryResult=t[4]),a.$set(_)},i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function va(l){let a,i;return a=new aa({props:{id:"stadtteil_name",title:"Stadtteil"}}),{c(){O(a.$$.fragment)},l(t){Q(a.$$.fragment,t)},m(t,o){z(a,t,o),i=!0},p:ge,i(t){i||(k(a.$$.fragment,t),i=!0)},o(t){$(a.$$.fragment,t),i=!1},d(t){W(a,t)}}}function ka(l){var Tt;let a,i,t,o,_,b,m,c,X,B,de='<a href="/gentriduck/hamburg/area/district" class="markdown">All districts</a> · <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a>',pe,A,u,q,K='<a href="#social-status--trajectory">Social status &amp; trajectory</a>',ee,Y,ne=`This section shows the <strong class="markdown">distribution</strong> of this district&#39;s constituent Gebiete&#39;s own trajectory
classifications — never a single re-scored index value for the district itself (same rule already
governing Berlin&#39;s Bezirk/PGR/BZR pages; see <a href="/gentriduck/methodology" class="markdown">methodology</a> and
<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code>).`,me,S,M,te,ae,C,N,P,T,ce,U,se='<a href="#commercial-mix--offering-advantage">Commercial mix &amp; Offering Advantage</a>',ue,E,R,J,oe='<a href="#within-group-dominance">Within-group dominance</a>',Z,le,V,x,fe='<a href="#people--structure">People &amp; structure</a>',_e,d,w,H,Ge='<a href="#amenities--everyday-infrastructure">Amenities &amp; everyday infrastructure</a>',xe,ye,Je,be,gt='<a href="#land-value--estimated-rent">Land value &amp; estimated rent</a>',Ye,Re,Ve,we,pt='<a href="#where-this-area-sits">Where this area sits</a>',Xe,De,Ce,Ze,ve,yt='<a href="#stadtteile-in-this-district">Stadtteile in this district</a>',Ke,Te,et,Se,bt="This table comes from <code>mart_area_hierarchy</code> (#302, I21-h), a thin pass-through of",tt,Le,wt="dim_area_hierarchy.sql",at,Ie,vt="hh_l1_to_district",rt,ke,kt='<a href="#honest-caveats">Honest caveats</a>',it,qe,Ht=`<li class="markdown"><strong class="markdown">This page is mostly still a structural scaffold (I21-g, #301).</strong> Every section except &quot;Social
status &amp; trajectory&quot; (below) and the &quot;Stadtteile in this district&quot; table shows a fixed
deferred-state placeholder rather than a real Hamburg figure — publishing the rest of this page&#39;s
content is a separately-gated follow-up (I21-i, #303).</li> <li class="markdown"><strong class="markdown">The &quot;Social status &amp; trajectory&quot; distribution above is real, not a placeholder (#317).</strong> It
reads Hamburg&#39;s own admitted rows in <code class="markdown">fct_gentrification_trajectory</code> (#314, dual-signed-off PASS)
— a recent <strong class="markdown">~6-year (2019–2025) window</strong>, not full history, and a <strong class="markdown">status-only classification</strong>,
never a displacement verdict (see the disclosure directly above that section&#39;s chart).</li> <li class="markdown"><strong class="markdown">This grain will never show a single re-scored gentrification-index value, even once fully
published</strong> — only a distribution of its constituent areas&#39; own trajectory classifications, per
the same ruling already governing Berlin&#39;s Bezirk/PGR/BZR pages
(<code class="markdown">docs/epic-i/I-coarse-index-geo-decision.md</code>, DECLINE).</li> <li class="markdown"><strong class="markdown">The &quot;Stadtteile in this district&quot; table is real, not a placeholder (#302, I21-h).</strong> The
underlying parent link is source-provided and was already resolved in the data layer; this ticket
only publishes it to the web layer.</li> <li class="markdown">See <a href="/gentriduck/hamburg" class="markdown">Hamburg&#39;s data hub</a> for the full, current inventory of what is and isn&#39;t published
for Hamburg, and <a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources §6</a> for how Hamburg&#39;s data differs from
Berlin&#39;s generally.</li>`,nt,He,$t='<a href="#further-reading">Further reading</a>',st,Me,jt=`See the <a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> for what&#39;s published today, <a href="/gentriduck/hamburg/maps" class="markdown">Hamburg&#39;s map</a> for
this district&#39;s constituent areas&#39; already-public gentrification-stage figures, or
<a href="/gentriduck/reference/area-hierarchy" class="markdown">the area-hierarchy reference</a> for how Hamburg&#39;s small-area geography is
structured.`,ot,Pe,lt,Fe,dt,$e=typeof v<"u"&&(v.title||((Tt=v.og)==null?void 0:Tt.title))&&v.hide_title!==!0&&_a();function Nt(e,r){var ze;return typeof v<"u"&&(v.title||(ze=v.og)!=null&&ze.title)?ua:ma}let We=Nt()(l),je=typeof v=="object"&&fa(),L=l[1]&&Lt(l),I=l[2]&&It(l);c=new ea({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:(l[1][0]?l[1][0].area_name:"District")+" — district profile",lede:"Hamburg's district-level (Bezirk-equivalent) scaffold — the coarsest grain in Hamburg's area hierarchy (I21-g, #301). Most sections are still deferred; the Stadtteile table (#302) and the Gebiet trajectory distribution below (#317) are real."}}),A=new Ne({props:{pageLevel:!0,what:"this district's population, commercial mix, and demographic sums (its Gebiet-level trajectory distribution is now published below, #317)"}}),S=new At({props:{status:"warning",$$slots:{default:[pa]},$$scope:{ctx:l}}});let F=l[3]&&Ft(l),G=l[0]&&Gt(l);const xt=[ba,ya],Ee=[];function Ct(e,r){return e[5]?0:1}C=Ct(l),N=Ee[C]=xt[C](l),T=new da({props:{data:l[3],x:"trajectory_type",y:"n_areas",title:"Gebiete by trajectory classification, 2019–2025 ("+(l[1][0]?l[1][0].area_name:"this district")+")",swapXY:"true",emptySet:"warn",emptyMessage:"No Gebiet trajectory data for this district."}}),E=new Ne({props:{what:"this district's commercial-mix breakdown and Offering Advantage roll-up"}}),le=new Ne({props:{what:"within-group dominance figures for this district"}}),d=new Ne({props:{what:"demographic sums for this district"}}),ye=new Ne({props:{what:"everyday-infrastructure sums for this district"}}),Re=new Ne({props:{what:"land value / estimated rent figures for this district"}});let D=l[4]&&Dt(l);return Ce=new Zt({props:{data:l[4],geoJsonUrl:`${Oe}/geo/district_subarea_l1_drilldown.geojson`,title:(l[1][0]?l[1][0].area_name:"This district")+" and its Stadtteile"}}),Te=new ta({props:{data:l[2],rows:"20",link:"stadtteil_link",emptySet:"warn",emptyMessage:"No constituent Stadtteile found for this district.",$$slots:{default:[va]},$$scope:{ctx:l}}}),Fe=new Kt({}),{c(){$e&&$e.c(),a=g(),We.c(),i=y("meta"),t=y("meta"),je&&je.c(),o=_t(),_=g(),L&&L.c(),b=g(),I&&I.c(),m=g(),O(c.$$.fragment),X=g(),B=y("p"),B.innerHTML=de,pe=g(),O(A.$$.fragment),u=g(),q=y("h2"),q.innerHTML=K,ee=g(),Y=y("p"),Y.innerHTML=ne,me=g(),O(S.$$.fragment),M=g(),F&&F.c(),te=g(),G&&G.c(),ae=g(),N.c(),P=g(),O(T.$$.fragment),ce=g(),U=y("h2"),U.innerHTML=se,ue=g(),O(E.$$.fragment),R=g(),J=y("h2"),J.innerHTML=oe,Z=g(),O(le.$$.fragment),V=g(),x=y("h2"),x.innerHTML=fe,_e=g(),O(d.$$.fragment),w=g(),H=y("h2"),H.innerHTML=Ge,xe=g(),O(ye.$$.fragment),Je=g(),be=y("h2"),be.innerHTML=gt,Ye=g(),O(Re.$$.fragment),Ve=g(),we=y("h2"),we.innerHTML=pt,Xe=g(),D&&D.c(),De=g(),O(Ce.$$.fragment),Ze=g(),ve=y("h3"),ve.innerHTML=yt,Ke=g(),O(Te.$$.fragment),et=g(),Se=y("p"),Se.innerHTML=bt,tt=g(),Le=y("code"),Le.textContent=wt,at=ie("'s "),Ie=y("code"),Ie.textContent=vt,rt=ie(` edge (source-provided, the
Hamburg WFS district attribute) — this ticket publishes that already-resolved edge to the web layer
without re-deciding it.
`),ke=y("h2"),ke.innerHTML=kt,it=g(),qe=y("ul"),qe.innerHTML=Ht,nt=g(),He=y("h2"),He.innerHTML=$t,st=g(),Me=y("p"),Me.innerHTML=jt,ot=g(),Pe=y("hr"),lt=g(),O(Fe.$$.fragment),this.h()},l(e){$e&&$e.l(e),a=h(e);const r=Wt("svelte-2igo1p",document.head);We.l(r),i=p(r,"META",{name:!0,content:!0}),t=p(r,"META",{name:!0,content:!0}),je&&je.l(r),o=_t(),r.forEach(n),_=h(e),L&&L.l(e),b=h(e),I&&I.l(e),m=h(e),Q(c.$$.fragment,e),X=h(e),B=p(e,"P",{class:!0,"data-svelte-h":!0}),j(B)!=="svelte-n3uvgv"&&(B.innerHTML=de),pe=h(e),Q(A.$$.fragment,e),u=h(e),q=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(q)!=="svelte-14f17uo"&&(q.innerHTML=K),ee=h(e),Y=p(e,"P",{class:!0,"data-svelte-h":!0}),j(Y)!=="svelte-54b13x"&&(Y.innerHTML=ne),me=h(e),Q(S.$$.fragment,e),M=h(e),F&&F.l(e),te=h(e),G&&G.l(e),ae=h(e),N.l(e),P=h(e),Q(T.$$.fragment,e),ce=h(e),U=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(U)!=="svelte-1i9w9pn"&&(U.innerHTML=se),ue=h(e),Q(E.$$.fragment,e),R=h(e),J=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(J)!=="svelte-4kb45v"&&(J.innerHTML=oe),Z=h(e),Q(le.$$.fragment,e),V=h(e),x=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(x)!=="svelte-1mdzqzc"&&(x.innerHTML=fe),_e=h(e),Q(d.$$.fragment,e),w=h(e),H=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(H)!=="svelte-12k6lqd"&&(H.innerHTML=Ge),xe=h(e),Q(ye.$$.fragment,e),Je=h(e),be=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(be)!=="svelte-13a10dj"&&(be.innerHTML=gt),Ye=h(e),Q(Re.$$.fragment,e),Ve=h(e),we=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(we)!=="svelte-60cjj9"&&(we.innerHTML=pt),Xe=h(e),D&&D.l(e),De=h(e),Q(Ce.$$.fragment,e),Ze=h(e),ve=p(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),j(ve)!=="svelte-scaxt8"&&(ve.innerHTML=yt),Ke=h(e),Q(Te.$$.fragment,e),et=h(e),Se=p(e,"P",{class:!0,"data-svelte-h":!0}),j(Se)!=="svelte-1kfnnk4"&&(Se.innerHTML=bt),tt=h(e),Le=p(e,"CODE",{"data-svelte-h":!0}),j(Le)!=="svelte-4site0"&&(Le.textContent=wt),at=re(e,"'s "),Ie=p(e,"CODE",{"data-svelte-h":!0}),j(Ie)!=="svelte-1gtkyfp"&&(Ie.textContent=vt),rt=re(e,` edge (source-provided, the
Hamburg WFS district attribute) — this ticket publishes that already-resolved edge to the web layer
without re-deciding it.
`),ke=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(ke)!=="svelte-ad0syq"&&(ke.innerHTML=kt),it=h(e),qe=p(e,"UL",{class:!0,"data-svelte-h":!0}),j(qe)!=="svelte-1th5cqy"&&(qe.innerHTML=Ht),nt=h(e),He=p(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),j(He)!=="svelte-oimjns"&&(He.innerHTML=$t),st=h(e),Me=p(e,"P",{class:!0,"data-svelte-h":!0}),j(Me)!=="svelte-a8i8r4"&&(Me.innerHTML=jt),ot=h(e),Pe=p(e,"HR",{class:!0}),lt=h(e),Q(Fe.$$.fragment,e),this.h()},h(){f(i,"name","twitter:card"),f(i,"content","summary_large_image"),f(t,"name","twitter:site"),f(t,"content","@evidence_dev"),f(B,"class","markdown"),f(q,"class","markdown"),f(q,"id","social-status--trajectory"),f(Y,"class","markdown"),f(U,"class","markdown"),f(U,"id","commercial-mix--offering-advantage"),f(J,"class","markdown"),f(J,"id","within-group-dominance"),f(x,"class","markdown"),f(x,"id","people--structure"),f(H,"class","markdown"),f(H,"id","amenities--everyday-infrastructure"),f(be,"class","markdown"),f(be,"id","land-value--estimated-rent"),f(we,"class","markdown"),f(we,"id","where-this-area-sits"),f(ve,"class","markdown"),f(ve,"id","stadtteile-in-this-district"),f(Se,"class","markdown"),f(ke,"class","markdown"),f(ke,"id","honest-caveats"),f(qe,"class","markdown"),f(He,"class","markdown"),f(He,"id","further-reading"),f(Me,"class","markdown"),f(Pe,"class","markdown")},m(e,r){$e&&$e.m(e,r),s(e,a,r),We.m(document.head,null),ct(document.head,i),ct(document.head,t),je&&je.m(document.head,null),ct(document.head,o),s(e,_,r),L&&L.m(e,r),s(e,b,r),I&&I.m(e,r),s(e,m,r),z(c,e,r),s(e,X,r),s(e,B,r),s(e,pe,r),z(A,e,r),s(e,u,r),s(e,q,r),s(e,ee,r),s(e,Y,r),s(e,me,r),z(S,e,r),s(e,M,r),F&&F.m(e,r),s(e,te,r),G&&G.m(e,r),s(e,ae,r),Ee[C].m(e,r),s(e,P,r),z(T,e,r),s(e,ce,r),s(e,U,r),s(e,ue,r),z(E,e,r),s(e,R,r),s(e,J,r),s(e,Z,r),z(le,e,r),s(e,V,r),s(e,x,r),s(e,_e,r),z(d,e,r),s(e,w,r),s(e,H,r),s(e,xe,r),z(ye,e,r),s(e,Je,r),s(e,be,r),s(e,Ye,r),z(Re,e,r),s(e,Ve,r),s(e,we,r),s(e,Xe,r),D&&D.m(e,r),s(e,De,r),z(Ce,e,r),s(e,Ze,r),s(e,ve,r),s(e,Ke,r),z(Te,e,r),s(e,et,r),s(e,Se,r),s(e,tt,r),s(e,Le,r),s(e,at,r),s(e,Ie,r),s(e,rt,r),s(e,ke,r),s(e,it,r),s(e,qe,r),s(e,nt,r),s(e,He,r),s(e,st,r),s(e,Me,r),s(e,ot,r),s(e,Pe,r),s(e,lt,r),z(Fe,e,r),dt=!0},p(e,r){var qt;typeof v<"u"&&(v.title||(qt=v.og)!=null&&qt.title)&&v.hide_title!==!0&&$e.p(e,r),We.p(e,r),typeof v=="object"&&je.p(e,r),e[1]?L?(L.p(e,r),r[0]&2&&k(L,1)):(L=Lt(e),L.c(),k(L,1),L.m(b.parentNode,b)):L&&(Ae(),$(L,1,1,()=>{L=null}),Be()),e[2]?I?(I.p(e,r),r[0]&4&&k(I,1)):(I=It(e),I.c(),k(I,1),I.m(m.parentNode,m)):I&&(Ae(),$(I,1,1,()=>{I=null}),Be());const ze={};r[0]&2&&(ze.title=(e[1][0]?e[1][0].area_name:"District")+" — district profile"),c.$set(ze);const St={};r[1]&8192&&(St.$$scope={dirty:r,ctx:e}),S.$set(St),e[3]?F?(F.p(e,r),r[0]&8&&k(F,1)):(F=Ft(e),F.c(),k(F,1),F.m(te.parentNode,te)):F&&(Ae(),$(F,1,1,()=>{F=null}),Be()),e[0]?G?(G.p(e,r),r[0]&1&&k(G,1)):(G=Gt(e),G.c(),k(G,1),G.m(ae.parentNode,ae)):G&&(Ae(),$(G,1,1,()=>{G=null}),Be());let mt=C;C=Ct(e),C===mt?Ee[C].p(e,r):(Ae(),$(Ee[mt],1,1,()=>{Ee[mt]=null}),Be(),N=Ee[C],N?N.p(e,r):(N=Ee[C]=xt[C](e),N.c()),k(N,1),N.m(P.parentNode,P));const ut={};r[0]&8&&(ut.data=e[3]),r[0]&2&&(ut.title="Gebiete by trajectory classification, 2019–2025 ("+(e[1][0]?e[1][0].area_name:"this district")+")"),T.$set(ut),e[4]?D?(D.p(e,r),r[0]&16&&k(D,1)):(D=Dt(e),D.c(),k(D,1),D.m(De.parentNode,De)):D&&(Ae(),$(D,1,1,()=>{D=null}),Be());const ft={};r[0]&16&&(ft.data=e[4]),r[0]&2&&(ft.title=(e[1][0]?e[1][0].area_name:"This district")+" and its Stadtteile"),Ce.$set(ft);const ht={};r[0]&4&&(ht.data=e[2]),r[1]&8192&&(ht.$$scope={dirty:r,ctx:e}),Te.$set(ht)},i(e){dt||(k(L),k(I),k(c.$$.fragment,e),k(A.$$.fragment,e),k(S.$$.fragment,e),k(F),k(G),k(N),k(T.$$.fragment,e),k(E.$$.fragment,e),k(le.$$.fragment,e),k(d.$$.fragment,e),k(ye.$$.fragment,e),k(Re.$$.fragment,e),k(D),k(Ce.$$.fragment,e),k(Te.$$.fragment,e),k(Fe.$$.fragment,e),dt=!0)},o(e){$(L),$(I),$(c.$$.fragment,e),$(A.$$.fragment,e),$(S.$$.fragment,e),$(F),$(G),$(N),$(T.$$.fragment,e),$(E.$$.fragment,e),$(le.$$.fragment,e),$(d.$$.fragment,e),$(ye.$$.fragment,e),$(Re.$$.fragment,e),$(D),$(Ce.$$.fragment,e),$(Te.$$.fragment,e),$(Fe.$$.fragment,e),dt=!1},d(e){e&&(n(a),n(_),n(b),n(m),n(X),n(B),n(pe),n(u),n(q),n(ee),n(Y),n(me),n(M),n(te),n(ae),n(P),n(ce),n(U),n(ue),n(R),n(J),n(Z),n(V),n(x),n(_e),n(w),n(H),n(xe),n(Je),n(be),n(Ye),n(Ve),n(we),n(Xe),n(De),n(Ze),n(ve),n(Ke),n(et),n(Se),n(tt),n(Le),n(at),n(Ie),n(rt),n(ke),n(it),n(qe),n(nt),n(He),n(st),n(Me),n(ot),n(Pe),n(lt)),$e&&$e.d(e),We.d(e),n(i),n(t),je&&je.d(e),n(o),L&&L.d(e),I&&I.d(e),W(c,e),W(A,e),W(S,e),F&&F.d(e),G&&G.d(e),Ee[C].d(e),W(T,e),W(E,e),W(le,e),W(d,e),W(ye,e),W(Re,e),D&&D.d(e),W(Ce,e),W(Te,e),W(Fe,e)}}}const v={};function Ha(l,a,i){let t,o,_,b;Mt(l,la,H=>i(30,_=H)),Mt(l,Rt,H=>i(35,b=H));let{data:m}=a,{data:c={},customFormattingSettings:X,__db:B,inputs:de}=m;zt(Rt,b="d6a6300928ebef6b83290955a7a91efd",b);let pe=ia(ra(de));Qt(pe.subscribe(H=>de=H)),Ot(oa,{getCustomFormats:()=>X.customFormats||[]});const A=(H,Ge)=>ca(B.query,H,{query_name:Ge});na(A);let u=_.params;Ut(()=>!0);let q={initialData:void 0,initialError:void 0},K=he`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`,ee=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`;c.district_name_data&&(c.district_name_data instanceof Error?q.initialError=c.district_name_data:q.initialData=c.district_name_data,c.district_name_columns&&(q.knownColumns=c.district_name_columns));let Y,ne=!1;const me=Qe.createReactive({callback:H=>{i(1,Y=H)},execFn:A},{id:"district_name",...q});me(ee,{noResolve:K,...q}),globalThis[Symbol.for("district_name")]={get value(){return Y}};let S={initialData:void 0,initialError:void 0},M=he`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only, no
-- statistic (I21-i, #303, publishes real figures).
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
order by stadtteil_name`,te=`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only, no
-- statistic (I21-i, #303, publishes real figures).
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
order by stadtteil_name`;c.children_data&&(c.children_data instanceof Error?S.initialError=c.children_data:S.initialData=c.children_data,c.children_columns&&(S.knownColumns=c.children_columns));let ae,C=!1;const N=Qe.createReactive({callback:H=>{i(2,ae=H)},execFn:A},{id:"children",...S});N(te,{noResolve:M,...S}),globalThis[Symbol.for("children")]={get value(){return ae}};let P={initialData:void 0,initialError:void 0},T=he`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
order by n_areas desc`,ce=`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
order by n_areas desc`;c.trajectory_mix_data&&(c.trajectory_mix_data instanceof Error?P.initialError=c.trajectory_mix_data:P.initialData=c.trajectory_mix_data,c.trajectory_mix_columns&&(P.knownColumns=c.trajectory_mix_columns));let U,se=!1;const ue=Qe.createReactive({callback:H=>{i(3,U=H)},execFn:A},{id:"trajectory_mix",...P});ue(ce,{noResolve:T,...P}),globalThis[Symbol.for("trajectory_mix")]={get value(){return U}};let E={initialData:void 0,initialError:void 0},R=he`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`;c.trajectory_mix_summary_data&&(c.trajectory_mix_summary_data instanceof Error?E.initialError=c.trajectory_mix_summary_data:E.initialData=c.trajectory_mix_summary_data,c.trajectory_mix_summary_columns&&(E.knownColumns=c.trajectory_mix_summary_columns));let oe,Z=!1;const le=Qe.createReactive({callback:H=>{i(0,oe=H)},execFn:A},{id:"trajectory_mix_summary",...E});le(J,{noResolve:R,...E}),globalThis[Symbol.for("trajectory_mix_summary")]={get value(){return oe}};let V={initialData:void 0,initialError:void 0},x=he`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Oe}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`,fe=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Oe}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`;c.minimap_areas_data&&(c.minimap_areas_data instanceof Error?V.initialError=c.minimap_areas_data:V.initialData=c.minimap_areas_data,c.minimap_areas_columns&&(V.knownColumns=c.minimap_areas_columns));let _e,d=!1;const w=Qe.createReactive({callback:H=>{i(4,_e=H)},execFn:A},{id:"minimap_areas",...V});return w(fe,{noResolve:x,...V}),globalThis[Symbol.for("minimap_areas")]={get value(){return _e}},l.$$set=H=>{"data"in H&&i(6,m=H.data)},l.$$.update=()=>{l.$$.dirty[0]&64&&i(7,{data:c={},customFormattingSettings:X,__db:B}=m,c),l.$$.dirty[0]&128&&sa.set(Object.keys(c).length>0),l.$$.dirty[0]&1073741824&&i(8,u=_.params),l.$$.dirty[0]&256&&i(10,K=he`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`),l.$$.dirty[0]&256&&i(11,ee=`select area_name
from gentriduck_marts.dim_area_geometry
where city_code = 'HH' and area_level = 'district' and area_code = '${u.code}'
limit 1`),l.$$.dirty[0]&7680&&(K||!ne?K||(me(ee,{noResolve:K,...q}),i(12,ne=!0)):me(ee,{noResolve:K})),l.$$.dirty[0]&256&&i(14,M=he`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only, no
-- statistic (I21-i, #303, publishes real figures).
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
order by stadtteil_name`),l.$$.dirty[0]&256&&i(15,te=`-- #302 (I21-h): constituent Stadtteile, via mart_area_hierarchy (thin pass-through of
-- dim_area_hierarchy's hh_l1_to_district CTE, a source-provided WFS attribute -- see that model's
-- header). Joined against dim_area_geometry for the display name -- structural links only, no
-- statistic (I21-i, #303, publishes real figures).
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
order by stadtteil_name`),l.$$.dirty[0]&122880&&(M||!C?M||(N(te,{noResolve:M,...S}),i(16,C=!0)):N(te,{noResolve:M})),l.$$.dirty[0]&256&&i(18,T=he`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
order by n_areas desc`),l.$$.dirty[0]&256&&i(19,ce=`-- #317: distribution of trajectory_type across this district's constituent Gebiete -- a two-hop
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
order by n_areas desc`),l.$$.dirty[0]&1966080&&(T||!se?T||(ue(ce,{noResolve:T,...P}),i(20,se=!0)):ue(ce,{noResolve:T})),l.$$.dirty[0]&256&&i(22,R=he`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`),l.$$.dirty[0]&256&&i(23,J=`-- Modal trajectory type + "trending" (improving/declining) share, computed from the SAME
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
from totals as t cross join top cross join trending as tr`),l.$$.dirty[0]&31457280&&(R||!Z?R||(le(J,{noResolve:R,...E}),i(24,Z=!0)):le(J,{noResolve:R})),l.$$.dirty[0]&256&&i(26,x=he`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Oe}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`),l.$$.dirty[0]&256&&i(27,fe=`-- Self row's name resolved directly in SQL (not a JS-templated string literal) so a WFS-sourced
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
    '${Oe}/hamburg/area/subarea_l1/' || h.area_code as link
from gentriduck_marts.mart_area_hierarchy as h
left join
    gentriduck_marts.dim_area_geometry as g
    on g.city_code = 'HH' and g.area_level = 'subarea_l1' and g.area_code = h.area_code
where h.city_code = 'HH' and h.area_level = 'subarea_l1' and h.parent_area_code = '${u.code}'
    -- #334: see the \`children\` query above -- merged-pair composite codes have no geometry (so
    -- no drilldown map feature either) and no dead-end page worth linking to.
    and h.area_code not like '%/%'
order by sort_order, area_name`),l.$$.dirty[0]&503316480&&(x||!d?x||(w(fe,{noResolve:x,...V}),i(28,d=!0)):w(fe,{noResolve:x})),l.$$.dirty[0]&1&&i(29,t=oe==null?void 0:oe[0]),l.$$.dirty[0]&536870912&&i(5,o=!t||t.n_total==null||Number(t.n_total)===0?null:(()=>{const H=Number(t.n_total),Ge=Number(t.n_trending||0),xe=t.top_type_share!=null?Number(t.top_type_share):null,ye=xe!=null&&xe>.5?`<b>${t.top_type}</b> is the only trajectory type holding a majority (${Math.round(xe*100)}%)`:"no single trajectory type holds a majority";return`<b>${Ge}</b> of <b>${H}</b> Gebiete here show a clear <b>improving</b> or <b>declining</b> trajectory over the 2019–2025 window; ${ye} — a distribution across this district's own Gebiete, never a single re-scored value for the district itself.`})())},[oe,Y,ae,U,_e,o,m,c,u,q,K,ee,ne,S,M,te,C,P,T,ce,se,E,R,J,Z,V,x,fe,d,t,_]}class Aa extends Vt{constructor(a){super(),Xt(this,a,Ha,ka,Pt,{data:6},null,[-1,-1])}}export{Aa as component};
