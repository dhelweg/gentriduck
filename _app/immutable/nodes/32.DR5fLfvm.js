import{s as At,d as l,i as h,a as de,b as p,c as m,h as St,e as w,f as Ye,k as $,g as kt,j as Ee,l as b,m as y,t as De,n as bt,o as $t,p as Tt,q as xt,r as Ut,u as q}from"../chunks/scheduler.wXRIqz25.js";import{S as Lt,i as Rt,d as T,t as H,a as f,c as Ne,m as x,b as U,e as L,g as je}from"../chunks/index.uz5rP6Z2.js";import{A as Nt,P as jt}from"../chunks/PageTitle.X8fTilZx.js";import{F as Et}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Dt}from"../chunks/Hero.C0o6T8tj.js";import{D as Mt,C as xe}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{w as Bt}from"../chunks/entry.DotynpIs.js";import{e as Ot,s as Vt,Q as Xe,p as qt,a as ft,r as gt,C as It}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as _e}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as Pt}from"../chunks/stores.DJGNasUV.js";import{D as Ue}from"../chunks/Details.CpBKnllE.js";import{Q as Je}from"../chunks/QueryViewer.RFckNDEV.js";import{V as wt}from"../chunks/Value.CtteLknp.js";import{p as Ft}from"../chunks/profile.BW8tN6E9.js";function Wt(c){let t,n=v.title+"",s;return{c(){t=y("h1"),s=De(n),this.h()},l(i){t=w(i,"H1",{class:!0});var d=kt(t);s=Ee(d,n),d.forEach(l),this.h()},h(){p(t,"class","title")},m(i,d){h(i,t,d),de(t,s)},p:q,d(i){i&&l(t)}}}function zt(c){return{c(){this.h()},l(t){this.h()},h(){document.title="Evidence"},m:q,p:q,d:q}}function Gt(c){let t,n,s,i,d;return document.title=t=v.title,{c(){n=b(),s=y("meta"),i=b(),d=y("meta"),this.h()},l(u){n=m(u),s=w(u,"META",{property:!0,content:!0}),i=m(u),d=w(u,"META",{name:!0,content:!0}),this.h()},h(){var u,o;p(s,"property","og:title"),p(s,"content",((u=v.og)==null?void 0:u.title)??v.title),p(d,"name","twitter:title"),p(d,"content",((o=v.og)==null?void 0:o.title)??v.title)},m(u,o){h(u,n,o),h(u,s,o),h(u,i,o),h(u,d,o)},p(u,o){o&0&&t!==(t=v.title)&&(document.title=t)},d(u){u&&(l(n),l(s),l(i),l(d))}}}function Qt(c){var d,u;let t,n,s=(v.description||((d=v.og)==null?void 0:d.description))&&Kt(),i=((u=v.og)==null?void 0:u.image)&&Xt();return{c(){s&&s.c(),t=b(),i&&i.c(),n=Ye()},l(o){s&&s.l(o),t=m(o),i&&i.l(o),n=Ye()},m(o,_){s&&s.m(o,_),h(o,t,_),i&&i.m(o,_),h(o,n,_)},p(o,_){var k,S;(v.description||(k=v.og)!=null&&k.description)&&s.p(o,_),(S=v.og)!=null&&S.image&&i.p(o,_)},d(o){o&&(l(t),l(n)),s&&s.d(o),i&&i.d(o)}}}function Kt(c){let t,n,s,i,d;return{c(){t=y("meta"),n=b(),s=y("meta"),i=b(),d=y("meta"),this.h()},l(u){t=w(u,"META",{name:!0,content:!0}),n=m(u),s=w(u,"META",{property:!0,content:!0}),i=m(u),d=w(u,"META",{name:!0,content:!0}),this.h()},h(){var u,o,_;p(t,"name","description"),p(t,"content",v.description??((u=v.og)==null?void 0:u.description)),p(s,"property","og:description"),p(s,"content",((o=v.og)==null?void 0:o.description)??v.description),p(d,"name","twitter:description"),p(d,"content",((_=v.og)==null?void 0:_.description)??v.description)},m(u,o){h(u,t,o),h(u,n,o),h(u,s,o),h(u,i,o),h(u,d,o)},p:q,d(u){u&&(l(t),l(n),l(s),l(i),l(d))}}}function Xt(c){let t,n,s;return{c(){t=y("meta"),n=b(),s=y("meta"),this.h()},l(i){t=w(i,"META",{property:!0,content:!0}),n=m(i),s=w(i,"META",{name:!0,content:!0}),this.h()},h(){var i,d;p(t,"property","og:image"),p(t,"content",ft((i=v.og)==null?void 0:i.image)),p(s,"name","twitter:image"),p(s,"content",ft((d=v.og)==null?void 0:d.image))},m(i,d){h(i,t,d),h(i,n,d),h(i,s,d)},p:q,d(i){i&&(l(t),l(n),l(s))}}}function yt(c){let t,n;return t=new Je({props:{queryID:"ber_cells",queryResult:c[1]}}),{c(){L(t.$$.fragment)},l(s){U(t.$$.fragment,s)},m(s,i){x(t,s,i),n=!0},p(s,i){const d={};i[0]&2&&(d.queryResult=s[1]),t.$set(d)},i(s){n||(f(t.$$.fragment,s),n=!0)},o(s){H(t.$$.fragment,s),n=!1},d(s){T(t,s)}}}function Ht(c){let t,n;return t=new Je({props:{queryID:"hh_cells",queryResult:c[2]}}),{c(){L(t.$$.fragment)},l(s){U(t.$$.fragment,s)},m(s,i){x(t,s,i),n=!0},p(s,i){const d={};i[0]&4&&(d.queryResult=s[2]),t.$set(d)},i(s){n||(f(t.$$.fragment,s),n=!0)},o(s){H(t.$$.fragment,s),n=!1},d(s){T(t,s)}}}function _t(c){let t,n;return t=new Je({props:{queryID:"hh_table",queryResult:c[3]}}),{c(){L(t.$$.fragment)},l(s){U(t.$$.fragment,s)},m(s,i){x(t,s,i),n=!0},p(s,i){const d={};i[0]&8&&(d.queryResult=s[3]),t.$set(d)},i(s){n||(f(t.$$.fragment,s),n=!0)},o(s){H(t.$$.fragment,s),n=!1},d(s){T(t,s)}}}function vt(c){let t,n;return t=new Je({props:{queryID:"suite_runs",queryResult:c[0]}}),{c(){L(t.$$.fragment)},l(s){U(t.$$.fragment,s)},m(s,i){x(t,s,i),n=!0},p(s,i){const d={};i[0]&1&&(d.queryResult=s[0]),t.$set(d)},i(s){n||(f(t.$$.fragment,s),n=!0)},o(s){H(t.$$.fragment,s),n=!1},d(s){T(t,s)}}}function Yt(c){let t,n,s,i,d,u,o,_,k,S,R,A;return t=new xe({props:{id:"hypothesis",title:"#"}}),s=new xe({props:{id:"plain",title:"Hypothesis",wrap:"true"}}),d=new xe({props:{id:"thesis_words",title:"2018 thesis (Berlin, its own verdict)",wrap:"true"}}),o=new xe({props:{id:"berlin_today",title:"Berlin today (2019–2025)",wrap:"true"}}),k=new xe({props:{id:"hh_full",title:"Hamburg, full chain 2013–2025: Matches Berlin 2018?",contentType:"html",wrap:"true"}}),R=new xe({props:{id:"hh_modern",title:"Hamburg, 2019–2025 (pivot 2022): Matches Berlin 2018?",contentType:"html",wrap:"true"}}),{c(){L(t.$$.fragment),n=b(),L(s.$$.fragment),i=b(),L(d.$$.fragment),u=b(),L(o.$$.fragment),_=b(),L(k.$$.fragment),S=b(),L(R.$$.fragment)},l(a){U(t.$$.fragment,a),n=m(a),U(s.$$.fragment,a),i=m(a),U(d.$$.fragment,a),u=m(a),U(o.$$.fragment,a),_=m(a),U(k.$$.fragment,a),S=m(a),U(R.$$.fragment,a)},m(a,g){x(t,a,g),h(a,n,g),x(s,a,g),h(a,i,g),x(d,a,g),h(a,u,g),x(o,a,g),h(a,_,g),x(k,a,g),h(a,S,g),x(R,a,g),A=!0},p:q,i(a){A||(f(t.$$.fragment,a),f(s.$$.fragment,a),f(d.$$.fragment,a),f(o.$$.fragment,a),f(k.$$.fragment,a),f(R.$$.fragment,a),A=!0)},o(a){H(t.$$.fragment,a),H(s.$$.fragment,a),H(d.$$.fragment,a),H(o.$$.fragment,a),H(k.$$.fragment,a),H(R.$$.fragment,a),A=!1},d(a){a&&(l(n),l(i),l(u),l(_),l(S)),T(t,a),T(s,a),T(d,a),T(o,a),T(k,a),T(R,a)}}}function Jt(c){let t,n="The per-hypothesis sentences are being updated after a re-run of the Hamburg analysis; the table above shows the current results.";return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-1gd962k"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},i:q,o:q,d(s){s&&l(t)}}}function Zt(c){let t,n,s,i,d,u,o,_,k,S,R,A;return t=new Ue({props:{title:"H1: social status and the local mix",$$slots:{default:[es]},$$scope:{ctx:c}}}),s=new Ue({props:{title:"H1a: cafés",$$slots:{default:[ts]},$$scope:{ctx:c}}}),d=new Ue({props:{title:"H1b: fast food's share of the gastronomy mix",$$slots:{default:[ss]},$$scope:{ctx:c}}}),o=new Ue({props:{title:"H1c: sport and leisure facilities",$$slots:{default:[ns]},$$scope:{ctx:c}}}),k=new Ue({props:{title:"H2: today's mix and the next change",$$slots:{default:[as]},$$scope:{ctx:c}}}),R=new Ue({props:{title:"H3a, H3b, H3c: which comes first?",$$slots:{default:[is]},$$scope:{ctx:c}}}),{c(){L(t.$$.fragment),n=b(),L(s.$$.fragment),i=b(),L(d.$$.fragment),u=b(),L(o.$$.fragment),_=b(),L(k.$$.fragment),S=b(),L(R.$$.fragment)},l(a){U(t.$$.fragment,a),n=m(a),U(s.$$.fragment,a),i=m(a),U(d.$$.fragment,a),u=m(a),U(o.$$.fragment,a),_=m(a),U(k.$$.fragment,a),S=m(a),U(R.$$.fragment,a)},m(a,g){x(t,a,g),h(a,n,g),x(s,a,g),h(a,i,g),x(d,a,g),h(a,u,g),x(o,a,g),h(a,_,g),x(k,a,g),h(a,S,g),x(R,a,g),A=!0},i(a){A||(f(t.$$.fragment,a),f(s.$$.fragment,a),f(d.$$.fragment,a),f(o.$$.fragment,a),f(k.$$.fragment,a),f(R.$$.fragment,a),A=!0)},o(a){H(t.$$.fragment,a),H(s.$$.fragment,a),H(d.$$.fragment,a),H(o.$$.fragment,a),H(k.$$.fragment,a),H(R.$$.fragment,a),A=!1},d(a){a&&(l(n),l(i),l(u),l(_),l(S)),T(t,a),T(s,a),T(d,a),T(o,a),T(k,a),T(R,a)}}}function es(c){let t,n=`Not comparable: no business category can be measured at Hamburg's small-area grain. A test on
transport, public and tourist facilities found no clear link.`;return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-yarcxi"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},p:q,d(s){s&&l(t)}}}function ts(c){let t,n=`Among the roughly one in eight Hamburg statistical areas with at least ten gastronomy outlets, cafés
make up a larger share of the gastronomy mix where the Sozialmonitoring status is better (ρ −0.27, a
small effect). This is significant under the false-discovery-rate correction used for all headline
tests, but not under the stricter family-wise correction. The number of cafés per resident shows no
clear link. Treat it as tentative. Status here is Hamburg's composite index, which includes migration
background and school-leaving outcomes. Berlin's own re-test found no café link, which is not
evidence that the two cities differ.`;return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-xt5z9x"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},p:q,d(s){s&&l(t)}}}function ss(c){let t,n=`Among the roughly one in eight areas with at least ten gastronomy outlets, fast food makes up a
larger share of the gastronomy mix where the Sozialmonitoring status is worse (ρ 0.42, moderate), as
in Berlin; a matching result is not evidence that the same process is at work. Status here is Hamburg's composite index as a whole (seven indicators, including
migration background and school-leaving outcomes), not any single one of its indicators. This is an
area-level pattern, not a statement about any group or business. We could not test whether it
depends on one type of outlet. It is one 2025 cross-section, so it counts once, not once per
Hamburg column.`;return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-tqklqv"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},p:q,d(s){s&&l(t)}}}function ns(c){let t,n=`Opposite direction, small, as in Berlin (a matching result, not evidence of the same process): more
sport and leisure facilities go slightly with a worse Sozialmonitoring status (Hamburg's composite index, which includes migration background and
school-leaving outcomes). In OpenStreetMap these are mostly playgrounds and public table tennis,
provided where many families live.`;return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-1bplhck"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},p:q,d(s){s&&l(t)}}}function as(c){let t,n=`Not comparable: no business category can be measured at Hamburg's small-area grain. A test on
transport and public facilities found no transferable prediction. Over the full chain, prediction
was worse than chance in each of the five held-out groups of districts and in every time window. We
read this as no usable signal, not as an opposite effect.`;return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-4y1p58"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},p:q,d(s){s&&l(t)}}}function is(c){let t,n=`No detectable ordering between commercial change and change in officially measured disadvantage
(Hamburg's Sozialmonitoring Dynamik class), in either direction, over 2013–2025 or since 2022.
Three-year windows and a measure where most areas are 'stable' rule out a strong ordering, not a
small one. Every window contains shocks: refugee arrivals 2015–18 and 2022, the pandemic, and the
2023 benefit reforms.`;return{c(){t=y("p"),t.textContent=n,this.h()},l(s){t=w(s,"P",{class:!0,"data-svelte-h":!0}),$(t)!=="svelte-1pznljp"&&(t.textContent=n),this.h()},h(){p(t,"class","markdown")},m(s,i){h(s,t,i)},p:q,d(s){s&&l(t)}}}function os(c){let t,n,s,i,d,u,o,_,k,S,R,A,a=`This page is the Hamburg counterpart of <a href="/gentriduck/thesis-recheck" class="markdown">the 2018 thesis, re-checked</a>, which
explains how the re-test works and reports Berlin in full. Here every hypothesis was re-tested on
Hamburg&#39;s statistische Gebiete twice: over the full chain of Sozialmonitoring editions (2013–2025,
the main test) and over 2019–2025 only (pivot 2022, an era-matched comparison with its own
correction, not a second confirmation).`,g,O,Ae='<a href="#read-this-first">Read this first</a>',ce,F,Z=`Hamburg measures social status differently. Its Sozialmonitoring combines seven indicators: the
share of children with a migration background, children of single parents, SGB II and asylum-seeker
benefits, unemployment, children and older people on minimum income, and school-leaving outcomes.
It publishes four status classes and three change classes. A Hamburg result is an association with
that composite, not with any one indicator or group. Hamburg is an out-of-sample transfer test,
not a replication. A matching result is not evidence that the same process is at work, and a
different result is not evidence that it isn't. At Hamburg's small statistical areas (about 2,200
residents), shops and services are too sparse to measure the local mix, so Hamburg's H1 and H2 use
transport, public facilities and tourist facilities instead (H2: transport and public facilities
only).`,W,V,Se='<a href="#the-eight-hypotheses-thesis-berlin-today-hamburg">The eight hypotheses: thesis, Berlin today, Hamburg</a>',ue,ee,I,P,z,G,pe,M,X,B,me="results table",te,Q,ve,se,C,$e,be,et=`<strong class="markdown">Reading the labels.</strong> <em class="markdown">Holds</em>: the re-test finds the thesis&#39;s supported result. <em class="markdown">Stronger than
thesis</em>: the thesis was undecided, and the re-test finds a significant link in the hypothesised
direction. <em class="markdown">Opposite direction</em>: a significant link the other way from the hypothesis, which the
thesis had left undecided. <em class="markdown">Still unclear</em>: the thesis was undecided, and the re-test cannot decide
either. <em class="markdown">Rejected, as in 2018</em>: the thesis rejected it, and the re-test finds no effect either. <em class="markdown">Not
reproduced</em>: the thesis&#39;s tentative support does not show up. <em class="markdown">Not comparable</em>: the Hamburg test
cannot measure what the thesis tested. <em class="markdown">Same test</em>: the H1 family uses one 2025 cross-section in
both Hamburg columns, so it is shown once and counts once.`,Me,ne,tt='<a href="#not-like-for-like">Not like-for-like</a>',Be,fe,st=`<li class="markdown"><strong class="markdown">Different monitor.</strong> Hamburg&#39;s seven indicators include migration background and school
leaving; Berlin&#39;s status measure here is built from unemployment, welfare receipt and child
poverty.</li> <li class="markdown"><strong class="markdown">Different change window.</strong> Hamburg&#39;s change classes cover three years, Berlin&#39;s two.</li> <li class="markdown"><strong class="markdown">Different status measure.</strong> Hamburg publishes classes; Berlin&#39;s re-test uses continuous
composites.</li> <li class="markdown"><strong class="markdown">Different grain.</strong> A Hamburg statistisches Gebiet has about 2,200 residents, a Berlin
planning area about 7,000.</li> <li class="markdown"><strong class="markdown">Different era.</strong> The Hamburg full chain covers 2013–2025, Berlin today 2019–2025; the Hamburg
2019–2025 column is the era-matched comparison.</li>`,Oe,ge,nt=`A separate comparison puts both cities on matched areas of similar size, the same three indicators
and the same years: <a href="/gentriduck/berlin-vs-hamburg" class="markdown">Berlin vs Hamburg, like for like</a>.`,Ve,ae,at='<a href="#each-hypothesis-in-a-sentence">Each hypothesis in a sentence</a>',qe,Y,J,Te,ie,it='<a href="#corrections">Corrections</a>',Ie,we,ot=`This replaces an earlier Hamburg timing analysis (E5), which compared overlapping change windows.
Its conclusion, no ordering in either direction, is unchanged; its numbers should no longer be
cited.`,Pe,oe,lt='<a href="#honest-caveats">Honest caveats</a>',Fe,ye,rt=`<li class="markdown">Significance is corrected across the eight main tests of each Hamburg column
(Benjamini–Hochberg); the full chain is the main test, and the 2019–2025 column is a comparison,
not a second confirmation. The many secondary checks in the
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H-thesis-hypothesis-suite-findings.md" rel="nofollow" class="markdown">Hamburg findings</a>
are not corrected, so they are context, not verdicts.</li> <li class="markdown">All analysis is at the aggregate level of the statistisches Gebiet. Nothing here says anything
about an individual person, household, or building.</li> <li class="markdown">These are associations. Nothing here shows that commercial change causes change in officially
measured disadvantage, or that anyone was displaced.</li> <li class="markdown">A fall in officially measured disadvantage is not the same as gentrification: it can come from
jobs, children growing older, new-build residents, refugee accommodation closing, or benefit rule
changes.</li> <li class="markdown">Every result counts places mapped as points in OpenStreetMap, and mapping completeness grew over
the period.</li>`,We,le,ht='<a href="#further-reading">Further reading</a>',ze,He,dt='<li class="markdown"><a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked</a> — the Berlin re-test in full, including how the re-test works</li> <li class="markdown"><a href="/gentriduck/berlin-vs-hamburg" class="markdown">Berlin vs Hamburg, like for like</a> — both cities on matched areas, shared indicators and the same years, with each hypothesis tested for a difference between the cities (#371)</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-h/H-thesis-hypothesis-suite-findings.md" rel="nofollow" class="markdown">Hamburg hypothesis-suite findings (#355)</a> — the full results behind the table above, including every secondary and sensitivity check</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/354-355-hypothesis-suite-preregistration.md" rel="nofollow" class="markdown">Pre-registration</a> — the design fixed before the results were computed, including the Hamburg comparability statement (§4.5) and what the results must not be used to claim (§9)</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/thesis-hypothesis-suite-results.csv" rel="nofollow" class="markdown">Results table (CSV)</a> — every row, machine-readable</li> <li class="markdown"><a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a> — maps, time series and area profiles for Hamburg</li> <li class="markdown"><a href="/gentriduck/methodology" class="markdown">Methodology &amp; data sources, §6</a> — what is different about Hamburg&#39;s data</li>',Ge,Le,Qe,ke,Ke,re=typeof v<"u"&&v.title&&v.hide_title!==!0&&Wt();function Ct(e,r){return typeof v<"u"&&v.title?Gt:zt}let Re=Ct()(c),he=typeof v=="object"&&Qt();u=new Nt({props:{crumbs:c[5]}}),_=new jt({props:{title:"Thesis re-check · Hamburg"}}),S=new Dt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"The 2018 thesis, re-tested on Hamburg",lede:"The eight hypotheses of the 2018 Berlin thesis, re-tested on Hamburg with the same design fixed in advance, and set side by side with the thesis and with Berlin today. This is an out-of-sample transfer test, not a replication."}});let N=c[1]&&yt(c),j=c[2]&&Ht(c),E=c[3]&&_t(c),D=c[0]&&vt(c);G=new Mt({props:{data:c[3],rows:"8",sortable:"false",downloadable:"false",wrapTitles:"true",formatColumnTitles:"false",$$slots:{default:[Yt]},$$scope:{ctx:c}}}),Q=new wt({props:{data:c[0],column:"hh_run_sha"}}),se=new wt({props:{data:c[0],column:"ber_run_sha"}});const ct=[Zt,Jt],Ce=[];function ut(e,r){return e[4]?0:1}return Y=ut(c),J=Ce[Y]=ct[Y](c),ke=new Et({}),{c(){re&&re.c(),t=b(),Re.c(),n=y("meta"),s=y("meta"),he&&he.c(),i=Ye(),d=b(),L(u.$$.fragment),o=b(),L(_.$$.fragment),k=b(),L(S.$$.fragment),R=b(),A=y("p"),A.innerHTML=a,g=b(),O=y("h2"),O.innerHTML=Ae,ce=b(),F=y("p"),F.textContent=Z,W=b(),V=y("h2"),V.innerHTML=Se,ue=b(),N&&N.c(),ee=b(),j&&j.c(),I=b(),E&&E.c(),P=b(),D&&D.c(),z=b(),L(G.$$.fragment),pe=b(),M=y("p"),X=De(`The labels, the estimates and the Berlin column are read directly from the committed
`),B=y("a"),B.textContent=me,te=De(`
(Hamburg run `),L(Q.$$.fragment),ve=De(", Berlin run "),L(se.$$.fragment),C=De(`);
AUC and ρ are the main test's estimate. The thesis column shows words only: the thesis's AUCs come
from coarser areas and a different validation scheme, so they are not set against the re-test's.`),$e=b(),be=y("p"),be.innerHTML=et,Me=b(),ne=y("h3"),ne.innerHTML=tt,Be=b(),fe=y("ul"),fe.innerHTML=st,Oe=b(),ge=y("p"),ge.innerHTML=nt,Ve=b(),ae=y("h3"),ae.innerHTML=at,qe=b(),J.c(),Te=b(),ie=y("h2"),ie.innerHTML=it,Ie=b(),we=y("p"),we.textContent=ot,Pe=b(),oe=y("h2"),oe.innerHTML=lt,Fe=b(),ye=y("ul"),ye.innerHTML=rt,We=b(),le=y("h2"),le.innerHTML=ht,ze=b(),He=y("ul"),He.innerHTML=dt,Ge=b(),Le=y("hr"),Qe=b(),L(ke.$$.fragment),this.h()},l(e){re&&re.l(e),t=m(e);const r=St("svelte-2igo1p",document.head);Re.l(r),n=w(r,"META",{name:!0,content:!0}),s=w(r,"META",{name:!0,content:!0}),he&&he.l(r),i=Ye(),r.forEach(l),d=m(e),U(u.$$.fragment,e),o=m(e),U(_.$$.fragment,e),k=m(e),U(S.$$.fragment,e),R=m(e),A=w(e,"P",{class:!0,"data-svelte-h":!0}),$(A)!=="svelte-cfqm03"&&(A.innerHTML=a),g=m(e),O=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),$(O)!=="svelte-17vlrra"&&(O.innerHTML=Ae),ce=m(e),F=w(e,"P",{class:!0,"data-svelte-h":!0}),$(F)!=="svelte-oa98lv"&&(F.textContent=Z),W=m(e),V=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),$(V)!=="svelte-1ohmz5x"&&(V.innerHTML=Se),ue=m(e),N&&N.l(e),ee=m(e),j&&j.l(e),I=m(e),E&&E.l(e),P=m(e),D&&D.l(e),z=m(e),U(G.$$.fragment,e),pe=m(e),M=w(e,"P",{class:!0});var K=kt(M);X=Ee(K,`The labels, the estimates and the Berlin column are read directly from the committed
`),B=w(K,"A",{href:!0,rel:!0,class:!0,"data-svelte-h":!0}),$(B)!=="svelte-xraf2p"&&(B.textContent=me),te=Ee(K,`
(Hamburg run `),U(Q.$$.fragment,K),ve=Ee(K,", Berlin run "),U(se.$$.fragment,K),C=Ee(K,`);
AUC and ρ are the main test's estimate. The thesis column shows words only: the thesis's AUCs come
from coarser areas and a different validation scheme, so they are not set against the re-test's.`),K.forEach(l),$e=m(e),be=w(e,"P",{class:!0,"data-svelte-h":!0}),$(be)!=="svelte-1al8ar8"&&(be.innerHTML=et),Me=m(e),ne=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),$(ne)!=="svelte-1lfrb52"&&(ne.innerHTML=tt),Be=m(e),fe=w(e,"UL",{class:!0,"data-svelte-h":!0}),$(fe)!=="svelte-1emilog"&&(fe.innerHTML=st),Oe=m(e),ge=w(e,"P",{class:!0,"data-svelte-h":!0}),$(ge)!=="svelte-qi0m54"&&(ge.innerHTML=nt),Ve=m(e),ae=w(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),$(ae)!=="svelte-dciu2y"&&(ae.innerHTML=at),qe=m(e),J.l(e),Te=m(e),ie=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),$(ie)!=="svelte-17jffj3"&&(ie.innerHTML=it),Ie=m(e),we=w(e,"P",{class:!0,"data-svelte-h":!0}),$(we)!=="svelte-1c5a6dd"&&(we.textContent=ot),Pe=m(e),oe=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),$(oe)!=="svelte-ad0syq"&&(oe.innerHTML=lt),Fe=m(e),ye=w(e,"UL",{class:!0,"data-svelte-h":!0}),$(ye)!=="svelte-6lf06j"&&(ye.innerHTML=rt),We=m(e),le=w(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),$(le)!=="svelte-oimjns"&&(le.innerHTML=ht),ze=m(e),He=w(e,"UL",{class:!0,"data-svelte-h":!0}),$(He)!=="svelte-2jplbg"&&(He.innerHTML=dt),Ge=m(e),Le=w(e,"HR",{class:!0}),Qe=m(e),U(ke.$$.fragment,e),this.h()},h(){p(n,"name","twitter:card"),p(n,"content","summary_large_image"),p(s,"name","twitter:site"),p(s,"content","@evidence_dev"),p(A,"class","markdown"),p(O,"class","markdown"),p(O,"id","read-this-first"),p(F,"class","markdown"),p(V,"class","markdown"),p(V,"id","the-eight-hypotheses-thesis-berlin-today-hamburg"),p(B,"href","https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/thesis-hypothesis-suite-results.csv"),p(B,"rel","nofollow"),p(B,"class","markdown"),p(M,"class","markdown"),p(be,"class","markdown"),p(ne,"class","markdown"),p(ne,"id","not-like-for-like"),p(fe,"class","markdown"),p(ge,"class","markdown"),p(ae,"class","markdown"),p(ae,"id","each-hypothesis-in-a-sentence"),p(ie,"class","markdown"),p(ie,"id","corrections"),p(we,"class","markdown"),p(oe,"class","markdown"),p(oe,"id","honest-caveats"),p(ye,"class","markdown"),p(le,"class","markdown"),p(le,"id","further-reading"),p(He,"class","markdown"),p(Le,"class","markdown")},m(e,r){re&&re.m(e,r),h(e,t,r),Re.m(document.head,null),de(document.head,n),de(document.head,s),he&&he.m(document.head,null),de(document.head,i),h(e,d,r),x(u,e,r),h(e,o,r),x(_,e,r),h(e,k,r),x(S,e,r),h(e,R,r),h(e,A,r),h(e,g,r),h(e,O,r),h(e,ce,r),h(e,F,r),h(e,W,r),h(e,V,r),h(e,ue,r),N&&N.m(e,r),h(e,ee,r),j&&j.m(e,r),h(e,I,r),E&&E.m(e,r),h(e,P,r),D&&D.m(e,r),h(e,z,r),x(G,e,r),h(e,pe,r),h(e,M,r),de(M,X),de(M,B),de(M,te),x(Q,M,null),de(M,ve),x(se,M,null),de(M,C),h(e,$e,r),h(e,be,r),h(e,Me,r),h(e,ne,r),h(e,Be,r),h(e,fe,r),h(e,Oe,r),h(e,ge,r),h(e,Ve,r),h(e,ae,r),h(e,qe,r),Ce[Y].m(e,r),h(e,Te,r),h(e,ie,r),h(e,Ie,r),h(e,we,r),h(e,Pe,r),h(e,oe,r),h(e,Fe,r),h(e,ye,r),h(e,We,r),h(e,le,r),h(e,ze,r),h(e,He,r),h(e,Ge,r),h(e,Le,r),h(e,Qe,r),x(ke,e,r),Ke=!0},p(e,r){typeof v<"u"&&v.title&&v.hide_title!==!0&&re.p(e,r),Re.p(e,r),typeof v=="object"&&he.p(e,r),e[1]?N?(N.p(e,r),r[0]&2&&f(N,1)):(N=yt(e),N.c(),f(N,1),N.m(ee.parentNode,ee)):N&&(je(),H(N,1,1,()=>{N=null}),Ne()),e[2]?j?(j.p(e,r),r[0]&4&&f(j,1)):(j=Ht(e),j.c(),f(j,1),j.m(I.parentNode,I)):j&&(je(),H(j,1,1,()=>{j=null}),Ne()),e[3]?E?(E.p(e,r),r[0]&8&&f(E,1)):(E=_t(e),E.c(),f(E,1),E.m(P.parentNode,P)):E&&(je(),H(E,1,1,()=>{E=null}),Ne()),e[0]?D?(D.p(e,r),r[0]&1&&f(D,1)):(D=vt(e),D.c(),f(D,1),D.m(z.parentNode,z)):D&&(je(),H(D,1,1,()=>{D=null}),Ne());const K={};r[0]&8&&(K.data=e[3]),r[1]&128&&(K.$$scope={dirty:r,ctx:e}),G.$set(K);const pt={};r[0]&1&&(pt.data=e[0]),Q.$set(pt);const mt={};r[0]&1&&(mt.data=e[0]),se.$set(mt);let Ze=Y;Y=ut(e),Y!==Ze&&(je(),H(Ce[Ze],1,1,()=>{Ce[Ze]=null}),Ne(),J=Ce[Y],J||(J=Ce[Y]=ct[Y](e),J.c()),f(J,1),J.m(Te.parentNode,Te))},i(e){Ke||(f(u.$$.fragment,e),f(_.$$.fragment,e),f(S.$$.fragment,e),f(N),f(j),f(E),f(D),f(G.$$.fragment,e),f(Q.$$.fragment,e),f(se.$$.fragment,e),f(J),f(ke.$$.fragment,e),Ke=!0)},o(e){H(u.$$.fragment,e),H(_.$$.fragment,e),H(S.$$.fragment,e),H(N),H(j),H(E),H(D),H(G.$$.fragment,e),H(Q.$$.fragment,e),H(se.$$.fragment,e),H(J),H(ke.$$.fragment,e),Ke=!1},d(e){e&&(l(t),l(d),l(o),l(k),l(R),l(A),l(g),l(O),l(ce),l(F),l(W),l(V),l(ue),l(ee),l(I),l(P),l(z),l(pe),l(M),l($e),l(be),l(Me),l(ne),l(Be),l(fe),l(Oe),l(ge),l(Ve),l(ae),l(qe),l(Te),l(ie),l(Ie),l(we),l(Pe),l(oe),l(Fe),l(ye),l(We),l(le),l(ze),l(He),l(Ge),l(Le),l(Qe)),re&&re.d(e),Re.d(e),l(n),l(s),he&&he.d(e),l(i),T(u,e),T(_,e),T(S,e),N&&N.d(e),j&&j.d(e),E&&E.d(e),D&&D.d(e),T(G,e),T(Q),T(se),Ce[Y].d(e),T(ke,e)}}}const v={title:"The 2018 thesis, re-tested on Hamburg"},ls="1ed46268d3ed";function rs(c,t,n){let s,i,d;bt(c,Pt,C=>n(24,i=C)),bt(c,gt,C=>n(30,d=C));let{data:u}=t,{data:o={},customFormattingSettings:_,__db:k,inputs:S}=u;$t(gt,d="fe8d3e6fc78fc3adfc759f298298fd80",d);let R=Ot(Bt(S));Tt(R.subscribe(C=>S=C)),xt(It,{getCustomFormats:()=>_.customFormats||[]});const A=(C,$e)=>Ft(k.query,C,{query_name:$e});Vt(A),i.params,Ut(()=>!0);let a={initialData:void 0,initialError:void 0},g=_e`-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern'`,O=`-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern'`;o.ber_cells_data&&(o.ber_cells_data instanceof Error?a.initialError=o.ber_cells_data:a.initialData=o.ber_cells_data,o.ber_cells_columns&&(a.knownColumns=o.ber_cells_columns));let Ae,ce=!1;const F=Xe.createReactive({callback:C=>{n(1,Ae=C)},execFn:A},{id:"ber_cells",...a});F(O,{noResolve:g,...a}),globalThis[Symbol.for("ber_cells")]={get value(){return Ae}};let Z={initialData:void 0,initialError:void 0},W=_e`-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH'`,V=`-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH'`;o.hh_cells_data&&(o.hh_cells_data instanceof Error?Z.initialError=o.hh_cells_data:Z.initialData=o.hh_cells_data,o.hh_cells_columns&&(Z.knownColumns=o.hh_cells_columns));let Se,ue=!1;const ee=Xe.createReactive({callback:C=>{n(2,Se=C)},execFn:A},{id:"hh_cells",...Z});ee(V,{noResolve:W,...Z}),globalThis[Symbol.for("hh_cells")]={get value(){return Se}};let I={initialData:void 0,initialError:void 0},P=_e`-- Hypothesis wording and the thesis's own verdict (Tabelle 6-16, words only -- never its AUCs)
-- are the domain sign-off 355 §5 Hamburg table text. The H1 family is one 2025 cross-section in
-- both Hamburg panels (findings §1), so the pivot-2022 column shows it once as "Same test" --
-- but only while both panels carry the same label; otherwise it shows its own cell.
with hyp(sort_order, hypothesis, plain, thesis_words) as (
    values
        (1, 'H1',  'Social status is linked to the local mix', 'Supported'),
        (2, 'H1a', 'Many cafés: higher status', 'Undecided'),
        (3, 'H1b', 'Larger fast-food share of the gastronomy mix: lower status', 'Supported'),
        (4, 'H1c', 'Many sport and leisure facilities: higher status', 'Undecided'),
        (5, 'H2',  'Today''s mix is linked to the next change in officially measured disadvantage', 'Unclear'),
        (6, 'H3a', 'Commercial change first', 'Rejected'),
        (7, 'H3b', 'Change in measured disadvantage first', 'Tentatively supported'),
        (8, 'H3c', 'Both in the same period', 'Undecided')
)
select
    h.sort_order,
    h.hypothesis,
    h.plain,
    h.thesis_words,
    be.cell as berlin_today,
    coalesce(fu.cell, '') as hh_full,
    case
        when h.hypothesis in ('H1', 'H1a', 'H1b', 'H1c') and mo.cell = fu.cell
            then '<i>Same test as the full chain (one 2025 cross-section)</i>'
        else coalesce(mo.cell, '')
    end as hh_modern
from hyp h
left join (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern') be on be.hypothesis = h.hypothesis
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') fu on fu.hypothesis = h.hypothesis and fu.panel = 'full'
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') mo on mo.hypothesis = h.hypothesis and mo.panel = 'modern'
order by h.sort_order`,z=`-- Hypothesis wording and the thesis's own verdict (Tabelle 6-16, words only -- never its AUCs)
-- are the domain sign-off 355 §5 Hamburg table text. The H1 family is one 2025 cross-section in
-- both Hamburg panels (findings §1), so the pivot-2022 column shows it once as "Same test" --
-- but only while both panels carry the same label; otherwise it shows its own cell.
with hyp(sort_order, hypothesis, plain, thesis_words) as (
    values
        (1, 'H1',  'Social status is linked to the local mix', 'Supported'),
        (2, 'H1a', 'Many cafés: higher status', 'Undecided'),
        (3, 'H1b', 'Larger fast-food share of the gastronomy mix: lower status', 'Supported'),
        (4, 'H1c', 'Many sport and leisure facilities: higher status', 'Undecided'),
        (5, 'H2',  'Today''s mix is linked to the next change in officially measured disadvantage', 'Unclear'),
        (6, 'H3a', 'Commercial change first', 'Rejected'),
        (7, 'H3b', 'Change in measured disadvantage first', 'Tentatively supported'),
        (8, 'H3c', 'Both in the same period', 'Undecided')
)
select
    h.sort_order,
    h.hypothesis,
    h.plain,
    h.thesis_words,
    be.cell as berlin_today,
    coalesce(fu.cell, '') as hh_full,
    case
        when h.hypothesis in ('H1', 'H1a', 'H1b', 'H1c') and mo.cell = fu.cell
            then '<i>Same test as the full chain (one 2025 cross-section)</i>'
        else coalesce(mo.cell, '')
    end as hh_modern
from hyp h
left join (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern') be on be.hypothesis = h.hypothesis
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') fu on fu.hypothesis = h.hypothesis and fu.panel = 'full'
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') mo on mo.hypothesis = h.hypothesis and mo.panel = 'modern'
order by h.sort_order`;o.hh_table_data&&(o.hh_table_data instanceof Error?I.initialError=o.hh_table_data:I.initialData=o.hh_table_data,o.hh_table_columns&&(I.knownColumns=o.hh_table_columns));let G,pe=!1;const M=Xe.createReactive({callback:C=>{n(3,G=C)},execFn:A},{id:"hh_table",...I});M(z,{noResolve:P,...I}),globalThis[Symbol.for("hh_table")]={get value(){return G}};let X={initialData:void 0,initialError:void 0},B=_e`-- string_agg so a mixed-run CSV shows every run_sha instead of hiding all but one.
select
    (select string_agg(distinct run_sha, ', ') from (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH')) as hh_run_sha,
    (select string_agg(distinct run_sha, ', ') from (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern')) as ber_run_sha`,me=`-- string_agg so a mixed-run CSV shows every run_sha instead of hiding all but one.
select
    (select string_agg(distinct run_sha, ', ') from (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH')) as hh_run_sha,
    (select string_agg(distinct run_sha, ', ') from (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern')) as ber_run_sha`;o.suite_runs_data&&(o.suite_runs_data instanceof Error?X.initialError=o.suite_runs_data:X.initialData=o.suite_runs_data,o.suite_runs_columns&&(X.knownColumns=o.suite_runs_columns));let te,Q=!1;const ve=Xe.createReactive({callback:C=>{n(0,te=C)},execFn:A},{id:"suite_runs",...X});ve(me,{noResolve:B,...X}),globalThis[Symbol.for("suite_runs")]={get value(){return te}};const se=[{label:"Hamburg",href:"/hamburg"},{label:"Thesis re-check"}];return c.$$set=C=>{"data"in C&&n(6,u=C.data)},c.$$.update=()=>{var C;c.$$.dirty[0]&64&&n(7,{data:o={},customFormattingSettings:_,__db:k}=u,o),c.$$.dirty[0]&128&&qt.set(Object.keys(o).length>0),c.$$.dirty[0]&16777216&&i.params,c.$$.dirty[0]&3840&&(g||!ce?g||(F(O,{noResolve:g,...a}),n(11,ce=!0)):F(O,{noResolve:g})),c.$$.dirty[0]&61440&&(W||!ue?W||(ee(V,{noResolve:W,...Z}),n(15,ue=!0)):ee(V,{noResolve:W})),c.$$.dirty[0]&983040&&(P||!pe?P||(M(z,{noResolve:P,...I}),n(19,pe=!0)):M(z,{noResolve:P})),c.$$.dirty[0]&15728640&&(B||!Q?B||(ve(me,{noResolve:B,...X}),n(23,Q=!0)):ve(me,{noResolve:B})),c.$$.dirty[0]&1&&n(4,s=((C=te==null?void 0:te[0])==null?void 0:C.hh_run_sha)===ls)},n(9,g=_e`-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern'`),n(10,O=`-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern'`),n(13,W=_e`-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH'`),n(14,V=`-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH'`),n(17,P=_e`-- Hypothesis wording and the thesis's own verdict (Tabelle 6-16, words only -- never its AUCs)
-- are the domain sign-off 355 §5 Hamburg table text. The H1 family is one 2025 cross-section in
-- both Hamburg panels (findings §1), so the pivot-2022 column shows it once as "Same test" --
-- but only while both panels carry the same label; otherwise it shows its own cell.
with hyp(sort_order, hypothesis, plain, thesis_words) as (
    values
        (1, 'H1',  'Social status is linked to the local mix', 'Supported'),
        (2, 'H1a', 'Many cafés: higher status', 'Undecided'),
        (3, 'H1b', 'Larger fast-food share of the gastronomy mix: lower status', 'Supported'),
        (4, 'H1c', 'Many sport and leisure facilities: higher status', 'Undecided'),
        (5, 'H2',  'Today''s mix is linked to the next change in officially measured disadvantage', 'Unclear'),
        (6, 'H3a', 'Commercial change first', 'Rejected'),
        (7, 'H3b', 'Change in measured disadvantage first', 'Tentatively supported'),
        (8, 'H3c', 'Both in the same period', 'Undecided')
)
select
    h.sort_order,
    h.hypothesis,
    h.plain,
    h.thesis_words,
    be.cell as berlin_today,
    coalesce(fu.cell, '') as hh_full,
    case
        when h.hypothesis in ('H1', 'H1a', 'H1b', 'H1c') and mo.cell = fu.cell
            then '<i>Same test as the full chain (one 2025 cross-section)</i>'
        else coalesce(mo.cell, '')
    end as hh_modern
from hyp h
left join (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern') be on be.hypothesis = h.hypothesis
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') fu on fu.hypothesis = h.hypothesis and fu.panel = 'full'
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') mo on mo.hypothesis = h.hypothesis and mo.panel = 'modern'
order by h.sort_order`),n(18,z=`-- Hypothesis wording and the thesis's own verdict (Tabelle 6-16, words only -- never its AUCs)
-- are the domain sign-off 355 §5 Hamburg table text. The H1 family is one 2025 cross-section in
-- both Hamburg panels (findings §1), so the pivot-2022 column shows it once as "Same test" --
-- but only while both panels carry the same label; otherwise it shows its own cell.
with hyp(sort_order, hypothesis, plain, thesis_words) as (
    values
        (1, 'H1',  'Social status is linked to the local mix', 'Supported'),
        (2, 'H1a', 'Many cafés: higher status', 'Undecided'),
        (3, 'H1b', 'Larger fast-food share of the gastronomy mix: lower status', 'Supported'),
        (4, 'H1c', 'Many sport and leisure facilities: higher status', 'Undecided'),
        (5, 'H2',  'Today''s mix is linked to the next change in officially measured disadvantage', 'Unclear'),
        (6, 'H3a', 'Commercial change first', 'Rejected'),
        (7, 'H3b', 'Change in measured disadvantage first', 'Tentatively supported'),
        (8, 'H3c', 'Both in the same period', 'Undecided')
)
select
    h.sort_order,
    h.hypothesis,
    h.plain,
    h.thesis_words,
    be.cell as berlin_today,
    coalesce(fu.cell, '') as hh_full,
    case
        when h.hypothesis in ('H1', 'H1a', 'H1b', 'H1c') and mo.cell = fu.cell
            then '<i>Same test as the full chain (one 2025 cross-section)</i>'
        else coalesce(mo.cell, '')
    end as hh_modern
from hyp h
left join (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern') be on be.hypothesis = h.hypothesis
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') fu on fu.hypothesis = h.hypothesis and fu.panel = 'full'
left join (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH') mo on mo.hypothesis = h.hypothesis and mo.panel = 'modern'
order by h.sort_order`),n(21,B=_e`-- string_agg so a mixed-run CSV shows every run_sha instead of hiding all but one.
select
    (select string_agg(distinct run_sha, ', ') from (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH')) as hh_run_sha,
    (select string_agg(distinct run_sha, ', ') from (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern')) as ber_run_sha`),n(22,me=`-- string_agg so a mixed-run CSV shows every run_sha instead of hiding all but one.
select
    (select string_agg(distinct run_sha, ', ') from (-- Hamburg = HH/full (2013-2025, the primary family) and HH/modern (2019-2025, pivot 2022, the
-- era-split comparison). Cells are small HTML strings (DataTable contentType=html): a bold label,
-- plus a sub-line where the agreed text has one. Every string below is a fixed literal; the only
-- CSV-derived text is the rounded estimate, so no CSV content is injected as HTML.
--
-- H1 and H2: HARD-CODED from the Addendum reconciliation table (docs/epic-h/355-domain-signoff.md),
-- overriding the CSV label -- see the page header comment. Lead line always; result sub-line only
-- while \`holds\` still equals the value the agreed text was written against.
-- Other rows: holds -> label (pre-registration §5.6 labels, plain words as on /thesis-recheck);
-- H1a gets "(tentative)" per the Addendum. An unrecognised \`holds\` value -> '' (blank cell).
select
    panel,
    hypothesis,
    holds,
    case
        when hypothesis = 'H1' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'not reproduced at the corrected threshold (nominally significant)'
                    then '<br><span style="opacity:0.8">A test on transport, public and tourist facilities found no clear link.</span>'
                else ''
            end
        when hypothesis = 'H2' then
            '<b>Not comparable:</b> no business category can be measured at Hamburg''s small-area grain.'
            || case
                when holds = 'consistent (still unclear)'
                    then '<br><span style="opacity:0.8">A test on transport and public facilities found no transferable prediction.'
                        || case
                            when panel = 'full' and estimate < 0.5
                                then ' Prediction was worse than chance in each of the five held-out groups of districts and in every time window. We read this as no usable signal, not as an opposite effect.'
                            else ''
                        end
                        || '</span>'
                else ''
            end
        else coalesce(
            case
                when holds = 'holds' then
                    '<b>Holds</b> (' || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
                    || printf('%.2f', estimate) || ')'
                when holds = 'stronger than thesis' and hypothesis = 'H1a'
                    then '<b>Stronger than thesis (tentative)</b>'
                when holds = 'stronger than thesis' then '<b>Stronger than thesis</b>'
                when holds like 'opposite direction (thesis: undecided)%'
                    then '<b>Opposite direction</b> (thesis: undecided)'
                when holds = 'consistent (still unclear)' then '<b>Still unclear</b>'
                when holds = 'consistent (rejected)' then '<b>Rejected, as in 2018</b>'
                when holds = 'not reproduced' then '<b>Not reproduced</b>'
            end,
            ''
        )
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'HH')) as hh_run_sha,
    (select string_agg(distinct run_sha, ', ') from (-- Berlin today = BER/modern (2019-2025), same rows and same holds -> label mapping as
-- /thesis-recheck (domain sign-off 354 §5). Unknown holds -> NULL -> blank cell. A compact
-- estimate is appended only to "Holds" rows (AUC for out-of-fold-AUC rows, rho otherwise).
-- #355 page review (web low 2): on THIS page only, Berlin's H1 "Holds" also names "businesses"
-- (domain sign-off 355 C4 / §5 table: "Holds (businesses)"), so it reads against Hamburg's
-- "Not comparable" H1. /thesis-recheck keeps its own unchanged mapping.
select
    hypothesis,
    case
        when holds = 'holds' then 'Holds'
        when holds = 'consistent (still unclear)' then 'Still unclear'
        when holds like 'consistent (still unclear): explained by current status level%'
            then 'Still unclear: explained by the current status level'
        when holds like 'opposite direction (thesis: undecided)%'
            then 'Opposite direction (thesis: undecided)'
        when holds = 'consistent (rejected)' then 'Rejected, as in 2018'
        when holds = 'not reproduced' then 'Not reproduced'
    end
    || case
        when holds = 'holds' then
            ' (' || case when hypothesis = 'H1' then 'businesses, ' else '' end
            || case when estimator = 'oof_auc_logit' then 'AUC ' else 'ρ ' end
            || printf('%.2f', estimate) || ')'
        else ''
    end as cell,
    run_sha
from gentriduck_findings.thesis_hypothesis_suite
where city = 'BER' and panel = 'modern')) as ber_run_sha`),[te,Ae,Se,G,s,se,u,o,a,g,O,ce,Z,W,V,ue,I,P,z,pe,X,B,me,Q,i]}class Cs extends Lt{constructor(t){super(),Rt(this,t,rs,os,At,{data:6},null,[-1,-1])}}export{Cs as component};
