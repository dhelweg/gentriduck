import{s as Gt,d as r,i as s,a as rt,b as M,c as u,h as jt,e as S,f as st,k as V,l as c,m as x,n as Tt,o as Nt,p as Ut,q as Vt,r as Qt,u as me,j as ae,t as ne,g as zt}from"../chunks/scheduler.CmMeO4ay.js";import{S as Wt,i as Kt,d as v,t as w,a as h,c as Ne,m as b,b as $,e as k,g as Ue}from"../chunks/index.bfDa0Uqw.js";import{F as Yt}from"../chunks/FooterNav.BbND9dxm.js";import{H as Xt}from"../chunks/Hero.wYia6TQ0.js";import{P as Jt}from"../chunks/PolygonMap.CTN86heI.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang.DJJX2ZzV.js";import{b as ke,w as Zt}from"../chunks/entry.vKQYRLhF.js";import{A as Fe}from"../chunks/Alert.BNZjDqvU.js";import{e as ea,s as ta,Q as Ve,p as aa,a as Pt,r as Et,C as na}from"../chunks/inferColumnTypes.CZLqQWom.js";import{h as he}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as dt,a as I}from"../chunks/Dropdown.zhownQxu.js";import{B as ia,a as Mt}from"../chunks/ButtonGroup.pUeJH1df.js";import{p as oa}from"../chunks/stores.CGa44sBH.js";import{Q as Qe}from"../chunks/QueryViewer.C-CXDbdP.js";import{B as St}from"../chunks/BarChart.BZFK7Gke.js";import{L as xt}from"../chunks/LineChart.Dkgv3PwH.js";import{p as ra}from"../chunks/profile.BW8tN6E9.js";function sa(p){let a,o=G.title+"",t;return{c(){a=x("h1"),t=ne(o),this.h()},l(d){a=S(d,"H1",{class:!0});var i=zt(a);t=ae(i,o),i.forEach(r),this.h()},h(){M(a,"class","title")},m(d,i){s(d,a,i),rt(a,t)},p:me,d(d){d&&r(a)}}}function la(p){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:me,p:me,d:me}}function da(p){let a,o,t,d,i;return document.title=a=G.title,{c(){o=c(),t=x("meta"),d=c(),i=x("meta"),this.h()},l(_){o=u(_),t=S(_,"META",{property:!0,content:!0}),d=u(_),i=S(_,"META",{name:!0,content:!0}),this.h()},h(){var _,f;M(t,"property","og:title"),M(t,"content",((_=G.og)==null?void 0:_.title)??G.title),M(i,"name","twitter:title"),M(i,"content",((f=G.og)==null?void 0:f.title)??G.title)},m(_,f){s(_,o,f),s(_,t,f),s(_,d,f),s(_,i,f)},p(_,f){f&0&&a!==(a=G.title)&&(document.title=a)},d(_){_&&(r(o),r(t),r(d),r(i))}}}function ma(p){var i,_;let a,o,t=(G.description||((i=G.og)==null?void 0:i.description))&&pa(),d=((_=G.og)==null?void 0:_.image)&&_a();return{c(){t&&t.c(),a=c(),d&&d.c(),o=st()},l(f){t&&t.l(f),a=u(f),d&&d.l(f),o=st()},m(f,g){t&&t.m(f,g),s(f,a,g),d&&d.m(f,g),s(f,o,g)},p(f,g){var B,q;(G.description||(B=G.og)!=null&&B.description)&&t.p(f,g),(q=G.og)!=null&&q.image&&d.p(f,g)},d(f){f&&(r(a),r(o)),t&&t.d(f),d&&d.d(f)}}}function pa(p){let a,o,t,d,i;return{c(){a=x("meta"),o=c(),t=x("meta"),d=c(),i=x("meta"),this.h()},l(_){a=S(_,"META",{name:!0,content:!0}),o=u(_),t=S(_,"META",{property:!0,content:!0}),d=u(_),i=S(_,"META",{name:!0,content:!0}),this.h()},h(){var _,f,g;M(a,"name","description"),M(a,"content",G.description??((_=G.og)==null?void 0:_.description)),M(t,"property","og:description"),M(t,"content",((f=G.og)==null?void 0:f.description)??G.description),M(i,"name","twitter:description"),M(i,"content",((g=G.og)==null?void 0:g.description)??G.description)},m(_,f){s(_,a,f),s(_,o,f),s(_,t,f),s(_,d,f),s(_,i,f)},p:me,d(_){_&&(r(a),r(o),r(t),r(d),r(i))}}}function _a(p){let a,o,t;return{c(){a=x("meta"),o=c(),t=x("meta"),this.h()},l(d){a=S(d,"META",{property:!0,content:!0}),o=u(d),t=S(d,"META",{name:!0,content:!0}),this.h()},h(){var d,i;M(a,"property","og:image"),M(a,"content",Pt((d=G.og)==null?void 0:d.image)),M(t,"name","twitter:image"),M(t,"content",Pt((i=G.og)==null?void 0:i.image))},m(d,i){s(d,a,i),s(d,o,i),s(d,t,i)},p:me,d(d){d&&(r(a),r(o),r(t))}}}function fa(p){let a,o="How to read this:",t,d,i="OA = 1.0",_,f,g="above 1.0",B,q,A="below 1.0",Q,R,N="Density",P,C,E='"Stock vs. development"',K,H,z='"Change since previous year"',D,U,F="two-colour (diverging) legend",Y;return{c(){a=x("b"),a.textContent=o,t=c(),d=x("b"),d.textContent=i,_=ne(` means an area has exactly the citywide-average share of
  a POI domain; `),f=x("b"),f.textContent=g,B=ne(` means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), `),q=x("b"),q.textContent=A,Q=ne(` means under-represented.
  `),R=x("b"),R.textContent=N,P=ne(" is simply mapped-place count per km². Switch "),C=x("b"),C.textContent=E,K=ne(` to
  `),H=x("b"),H.textContent=z,D=ne(` to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. Offering Advantage
  and any "Change since previous year" view use a `),U=x("b"),U.textContent=F,Y=ne(` centred on
  that neutral point (1.0 for Offering Advantage, 0 for a year-over-year change) -- one hue means
  above it, the other means below; plain POI-density "stock" values use a single-colour scale
  instead, since there's no natural centre to diverge around. This map covers Berlin only for now;
  Hamburg's underlying gentrification index isn't signed off yet
  ([#125](https://github.com/dhelweg/gentriduck/issues/125)).`)},l(y){a=S(y,"B",{"data-svelte-h":!0}),V(a)!=="svelte-1d2ahpj"&&(a.textContent=o),t=u(y),d=S(y,"B",{"data-svelte-h":!0}),V(d)!=="svelte-17c8v7u"&&(d.textContent=i),_=ae(y,` means an area has exactly the citywide-average share of
  a POI domain; `),f=S(y,"B",{"data-svelte-h":!0}),V(f)!=="svelte-11ia4c8"&&(f.textContent=g),B=ae(y,` means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), `),q=S(y,"B",{"data-svelte-h":!0}),V(q)!=="svelte-1m0m3gk"&&(q.textContent=A),Q=ae(y,` means under-represented.
  `),R=S(y,"B",{"data-svelte-h":!0}),V(R)!=="svelte-uzvr2g"&&(R.textContent=N),P=ae(y," is simply mapped-place count per km². Switch "),C=S(y,"B",{"data-svelte-h":!0}),V(C)!=="svelte-17y0108"&&(C.textContent=E),K=ae(y,` to
  `),H=S(y,"B",{"data-svelte-h":!0}),V(H)!=="svelte-t4tx04"&&(H.textContent=z),D=ae(y,` to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. Offering Advantage
  and any "Change since previous year" view use a `),U=S(y,"B",{"data-svelte-h":!0}),V(U)!=="svelte-qnoy8c"&&(U.textContent=F),Y=ae(y,` centred on
  that neutral point (1.0 for Offering Advantage, 0 for a year-over-year change) -- one hue means
  above it, the other means below; plain POI-density "stock" values use a single-colour scale
  instead, since there's no natural centre to diverge around. This map covers Berlin only for now;
  Hamburg's underlying gentrification index isn't signed off yet
  ([#125](https://github.com/dhelweg/gentriduck/issues/125)).`)},m(y,T){s(y,a,T),s(y,t,T),s(y,d,T),s(y,_,T),s(y,f,T),s(y,B,T),s(y,q,T),s(y,Q,T),s(y,R,T),s(y,P,T),s(y,C,T),s(y,K,T),s(y,H,T),s(y,D,T),s(y,U,T),s(y,Y,T)},p:me,d(y){y&&(r(a),r(t),r(d),r(_),r(f),r(B),r(q),r(Q),r(R),r(P),r(C),r(K),r(H),r(D),r(U),r(Y))}}}function ua(p){let a,o="Thinly-mapped PLRs are hatched grey.",t,d,i=`A hatched
  area means only "too thinly observed to compute a stable ratio" -- never "commercially dead."`,_,f,g=`A
  bandwidth sweep found the Gaussian-weighted Offering Advantage construct bandwidth-sensitive at
  wide catchments`,B,q,A=`The map above does not use
  that weighted construct`,Q,R,N="methodology page §7",P;return{c(){a=x("b"),a.textContent=o,t=ne(` Offering Advantage is a compositional ratio (a location
  quotient) -- in a PLR-year with very few mapped places overall, a single new or removed business
  can swing its Offering Advantage value disproportionately. PLR-years with fewer than 10 total
  mapped places (across every domain) are shown as a hatched grey "No data" area on the map rather than a
  potentially misleading Offering Advantage value; the raw mapped-place count for the selected
  domain is always visible in the tooltip so you can judge borderline cases yourself. `),d=x("b"),d.textContent=i,_=ne(`
  OSM's mapping coverage is not spatially neutral: besides the early-year effect on the citywide
  chart below, completeness also varies *within* a given year and tends to correlate with area
  advantage -- poorer/peripheral areas are typically less thoroughly mapped than richer/central ones
  (Haklay, M. 2010, "How Good is Volunteered Geographical Information?", *Environment and Planning
  B*). So a low mapped-place count -- and the blank cell it produces -- can reflect an OSM coverage
  gap rather than a real absence of commercial activity; please don't read a blank PLR as evidence
  that nothing is happening there. `),f=x("b"),f.textContent=g,B=ne(`: it is stable close to its 1000 m headline catchment (500m vs 1000m and 1000m
  vs 1500m both rank-correlate above 0.7 across every year 2008-2026), but re-ranks meaningfully
  across the full 500 m to 1500 m sweep (pooled Spearman r = 0.68). `),q=x("b"),q.textContent=A,Q=ne(` -- it uses the hard point-in-polygon variant, which has no bandwidth
  parameter and is therefore bandwidth-invariant by construction -- meaning only that it makes no
  bandwidth choice, not that it has been tested and found spatially robust: it remains untested for
  this exact fragility and sits at the sharp/narrow end of the same spatial-grain family swept above
  (the 500 m end was the more volatile side of the fragile pair); the sweep is disclosed here as
  relevant context for a separate, still-open question
  ([#174](https://github.com/dhelweg/gentriduck/issues/174)) about whether the published headline
  should switch to the bandwidth-weighted construct, not as a characterization of the numbers shown
  above. See the `),R=x("a"),R.textContent=N,P=ne(` and
  [the bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail.`),this.h()},l(C){a=S(C,"B",{"data-svelte-h":!0}),V(a)!=="svelte-11zgs0r"&&(a.textContent=o),t=ae(C,` Offering Advantage is a compositional ratio (a location
  quotient) -- in a PLR-year with very few mapped places overall, a single new or removed business
  can swing its Offering Advantage value disproportionately. PLR-years with fewer than 10 total
  mapped places (across every domain) are shown as a hatched grey "No data" area on the map rather than a
  potentially misleading Offering Advantage value; the raw mapped-place count for the selected
  domain is always visible in the tooltip so you can judge borderline cases yourself. `),d=S(C,"B",{"data-svelte-h":!0}),V(d)!=="svelte-wlo1p3"&&(d.textContent=i),_=ae(C,`
  OSM's mapping coverage is not spatially neutral: besides the early-year effect on the citywide
  chart below, completeness also varies *within* a given year and tends to correlate with area
  advantage -- poorer/peripheral areas are typically less thoroughly mapped than richer/central ones
  (Haklay, M. 2010, "How Good is Volunteered Geographical Information?", *Environment and Planning
  B*). So a low mapped-place count -- and the blank cell it produces -- can reflect an OSM coverage
  gap rather than a real absence of commercial activity; please don't read a blank PLR as evidence
  that nothing is happening there. `),f=S(C,"B",{"data-svelte-h":!0}),V(f)!=="svelte-7jvz40"&&(f.textContent=g),B=ae(C,`: it is stable close to its 1000 m headline catchment (500m vs 1000m and 1000m
  vs 1500m both rank-correlate above 0.7 across every year 2008-2026), but re-ranks meaningfully
  across the full 500 m to 1500 m sweep (pooled Spearman r = 0.68). `),q=S(C,"B",{"data-svelte-h":!0}),V(q)!=="svelte-1hpn7q2"&&(q.textContent=A),Q=ae(C,` -- it uses the hard point-in-polygon variant, which has no bandwidth
  parameter and is therefore bandwidth-invariant by construction -- meaning only that it makes no
  bandwidth choice, not that it has been tested and found spatially robust: it remains untested for
  this exact fragility and sits at the sharp/narrow end of the same spatial-grain family swept above
  (the 500 m end was the more volatile side of the fragile pair); the sweep is disclosed here as
  relevant context for a separate, still-open question
  ([#174](https://github.com/dhelweg/gentriduck/issues/174)) about whether the published headline
  should switch to the bandwidth-weighted construct, not as a characterization of the numbers shown
  above. See the `),R=S(C,"A",{href:!0,"data-svelte-h":!0}),V(R)!=="svelte-db3vh3"&&(R.textContent=N),P=ae(C,` and
  [the bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail.`),this.h()},h(){M(R,"href","/gentriduck/methodology")},m(C,E){s(C,a,E),s(C,t,E),s(C,d,E),s(C,_,E),s(C,f,E),s(C,B,E),s(C,q,E),s(C,Q,E),s(C,R,E),s(C,P,E)},p:me,d(C){C&&(r(a),r(t),r(d),r(_),r(f),r(B),r(q),r(Q),r(R),r(P))}}}function ca(p){let a,o,t,d;return a=new I({props:{value:"density",valueLabel:"POI density (mapped places per km²)"}}),t=new I({props:{value:"oa",valueLabel:"Offering Advantage (location quotient vs. citywide)"}}),{c(){k(a.$$.fragment),o=c(),k(t.$$.fragment)},l(i){$(a.$$.fragment,i),o=u(i),$(t.$$.fragment,i)},m(i,_){b(a,i,_),s(i,o,_),b(t,i,_),d=!0},p:me,i(i){d||(h(a.$$.fragment,i),h(t.$$.fragment,i),d=!0)},o(i){w(a.$$.fragment,i),w(t.$$.fragment,i),d=!1},d(i){i&&r(o),v(a,i),v(t,i)}}}function ha(p){let a,o,t,d,i,_,f,g,B,q,A,Q,R,N,P,C,E,K,H,z,D,U,F,Y,y,T;return a=new I({props:{value:"Entertainment",valueLabel:"Entertainment"}}),t=new I({props:{value:"Gastronomy",valueLabel:"Gastronomy"}}),i=new I({props:{value:"Mobility",valueLabel:"Mobility"}}),f=new I({props:{value:"Office",valueLabel:"Office"}}),B=new I({props:{value:"Other",valueLabel:"Other"}}),A=new I({props:{value:"Public Service",valueLabel:"Public Service"}}),R=new I({props:{value:"Public Space",valueLabel:"Public Space"}}),P=new I({props:{value:"Religion",valueLabel:"Religion"}}),E=new I({props:{value:"Retail",valueLabel:"Retail"}}),H=new I({props:{value:"Services",valueLabel:"Services"}}),D=new I({props:{value:"Sports and Recreation",valueLabel:"Sports and Recreation"}}),F=new I({props:{value:"Tourism",valueLabel:"Tourism"}}),y=new I({props:{value:"Vacancy",valueLabel:"Vacancy"}}),{c(){k(a.$$.fragment),o=c(),k(t.$$.fragment),d=c(),k(i.$$.fragment),_=c(),k(f.$$.fragment),g=c(),k(B.$$.fragment),q=c(),k(A.$$.fragment),Q=c(),k(R.$$.fragment),N=c(),k(P.$$.fragment),C=c(),k(E.$$.fragment),K=c(),k(H.$$.fragment),z=c(),k(D.$$.fragment),U=c(),k(F.$$.fragment),Y=c(),k(y.$$.fragment)},l(m){$(a.$$.fragment,m),o=u(m),$(t.$$.fragment,m),d=u(m),$(i.$$.fragment,m),_=u(m),$(f.$$.fragment,m),g=u(m),$(B.$$.fragment,m),q=u(m),$(A.$$.fragment,m),Q=u(m),$(R.$$.fragment,m),N=u(m),$(P.$$.fragment,m),C=u(m),$(E.$$.fragment,m),K=u(m),$(H.$$.fragment,m),z=u(m),$(D.$$.fragment,m),U=u(m),$(F.$$.fragment,m),Y=u(m),$(y.$$.fragment,m)},m(m,O){b(a,m,O),s(m,o,O),b(t,m,O),s(m,d,O),b(i,m,O),s(m,_,O),b(f,m,O),s(m,g,O),b(B,m,O),s(m,q,O),b(A,m,O),s(m,Q,O),b(R,m,O),s(m,N,O),b(P,m,O),s(m,C,O),b(E,m,O),s(m,K,O),b(H,m,O),s(m,z,O),b(D,m,O),s(m,U,O),b(F,m,O),s(m,Y,O),b(y,m,O),T=!0},p:me,i(m){T||(h(a.$$.fragment,m),h(t.$$.fragment,m),h(i.$$.fragment,m),h(f.$$.fragment,m),h(B.$$.fragment,m),h(A.$$.fragment,m),h(R.$$.fragment,m),h(P.$$.fragment,m),h(E.$$.fragment,m),h(H.$$.fragment,m),h(D.$$.fragment,m),h(F.$$.fragment,m),h(y.$$.fragment,m),T=!0)},o(m){w(a.$$.fragment,m),w(t.$$.fragment,m),w(i.$$.fragment,m),w(f.$$.fragment,m),w(B.$$.fragment,m),w(A.$$.fragment,m),w(R.$$.fragment,m),w(P.$$.fragment,m),w(E.$$.fragment,m),w(H.$$.fragment,m),w(D.$$.fragment,m),w(F.$$.fragment,m),w(y.$$.fragment,m),T=!1},d(m){m&&(r(o),r(d),r(_),r(g),r(q),r(Q),r(N),r(C),r(K),r(z),r(U),r(Y)),v(a,m),v(t,m),v(i,m),v(f,m),v(B,m),v(A,m),v(R,m),v(P,m),v(E,m),v(H,m),v(D,m),v(F,m),v(y,m)}}}function ga(p){let a,o,t,d,i,_,f,g,B,q,A,Q,R,N,P,C,E,K,H,z,D,U,F,Y,y,T,m,O,ie,_e,oe,re,W,fe,de,se,pe,le;return a=new I({props:{value:"2008",valueLabel:"2008"}}),t=new I({props:{value:"2009",valueLabel:"2009"}}),i=new I({props:{value:"2010",valueLabel:"2010"}}),f=new I({props:{value:"2011",valueLabel:"2011"}}),B=new I({props:{value:"2012",valueLabel:"2012"}}),A=new I({props:{value:"2013",valueLabel:"2013"}}),R=new I({props:{value:"2014",valueLabel:"2014"}}),P=new I({props:{value:"2015",valueLabel:"2015"}}),E=new I({props:{value:"2016",valueLabel:"2016"}}),H=new I({props:{value:"2017",valueLabel:"2017"}}),D=new I({props:{value:"2018",valueLabel:"2018"}}),F=new I({props:{value:"2019",valueLabel:"2019"}}),y=new I({props:{value:"2020",valueLabel:"2020"}}),m=new I({props:{value:"2021",valueLabel:"2021"}}),ie=new I({props:{value:"2022",valueLabel:"2022"}}),oe=new I({props:{value:"2023",valueLabel:"2023"}}),W=new I({props:{value:"2024",valueLabel:"2024"}}),de=new I({props:{value:"2025",valueLabel:"2025"}}),pe=new I({props:{value:"2026",valueLabel:"2026"}}),{c(){k(a.$$.fragment),o=c(),k(t.$$.fragment),d=c(),k(i.$$.fragment),_=c(),k(f.$$.fragment),g=c(),k(B.$$.fragment),q=c(),k(A.$$.fragment),Q=c(),k(R.$$.fragment),N=c(),k(P.$$.fragment),C=c(),k(E.$$.fragment),K=c(),k(H.$$.fragment),z=c(),k(D.$$.fragment),U=c(),k(F.$$.fragment),Y=c(),k(y.$$.fragment),T=c(),k(m.$$.fragment),O=c(),k(ie.$$.fragment),_e=c(),k(oe.$$.fragment),re=c(),k(W.$$.fragment),fe=c(),k(de.$$.fragment),se=c(),k(pe.$$.fragment)},l(n){$(a.$$.fragment,n),o=u(n),$(t.$$.fragment,n),d=u(n),$(i.$$.fragment,n),_=u(n),$(f.$$.fragment,n),g=u(n),$(B.$$.fragment,n),q=u(n),$(A.$$.fragment,n),Q=u(n),$(R.$$.fragment,n),N=u(n),$(P.$$.fragment,n),C=u(n),$(E.$$.fragment,n),K=u(n),$(H.$$.fragment,n),z=u(n),$(D.$$.fragment,n),U=u(n),$(F.$$.fragment,n),Y=u(n),$(y.$$.fragment,n),T=u(n),$(m.$$.fragment,n),O=u(n),$(ie.$$.fragment,n),_e=u(n),$(oe.$$.fragment,n),re=u(n),$(W.$$.fragment,n),fe=u(n),$(de.$$.fragment,n),se=u(n),$(pe.$$.fragment,n)},m(n,L){b(a,n,L),s(n,o,L),b(t,n,L),s(n,d,L),b(i,n,L),s(n,_,L),b(f,n,L),s(n,g,L),b(B,n,L),s(n,q,L),b(A,n,L),s(n,Q,L),b(R,n,L),s(n,N,L),b(P,n,L),s(n,C,L),b(E,n,L),s(n,K,L),b(H,n,L),s(n,z,L),b(D,n,L),s(n,U,L),b(F,n,L),s(n,Y,L),b(y,n,L),s(n,T,L),b(m,n,L),s(n,O,L),b(ie,n,L),s(n,_e,L),b(oe,n,L),s(n,re,L),b(W,n,L),s(n,fe,L),b(de,n,L),s(n,se,L),b(pe,n,L),le=!0},p:me,i(n){le||(h(a.$$.fragment,n),h(t.$$.fragment,n),h(i.$$.fragment,n),h(f.$$.fragment,n),h(B.$$.fragment,n),h(A.$$.fragment,n),h(R.$$.fragment,n),h(P.$$.fragment,n),h(E.$$.fragment,n),h(H.$$.fragment,n),h(D.$$.fragment,n),h(F.$$.fragment,n),h(y.$$.fragment,n),h(m.$$.fragment,n),h(ie.$$.fragment,n),h(oe.$$.fragment,n),h(W.$$.fragment,n),h(de.$$.fragment,n),h(pe.$$.fragment,n),le=!0)},o(n){w(a.$$.fragment,n),w(t.$$.fragment,n),w(i.$$.fragment,n),w(f.$$.fragment,n),w(B.$$.fragment,n),w(A.$$.fragment,n),w(R.$$.fragment,n),w(P.$$.fragment,n),w(E.$$.fragment,n),w(H.$$.fragment,n),w(D.$$.fragment,n),w(F.$$.fragment,n),w(y.$$.fragment,n),w(m.$$.fragment,n),w(ie.$$.fragment,n),w(oe.$$.fragment,n),w(W.$$.fragment,n),w(de.$$.fragment,n),w(pe.$$.fragment,n),le=!1},d(n){n&&(r(o),r(d),r(_),r(g),r(q),r(Q),r(N),r(C),r(K),r(z),r(U),r(Y),r(T),r(O),r(_e),r(re),r(fe),r(se)),v(a,n),v(t,n),v(i,n),v(f,n),v(B,n),v(A,n),v(R,n),v(P,n),v(E,n),v(H,n),v(D,n),v(F,n),v(y,n),v(m,n),v(ie,n),v(oe,n),v(W,n),v(de,n),v(pe,n)}}}function wa(p){let a,o,t,d;return a=new Mt({props:{value:"stock",valueLabel:"Stock (this year's value)",default:!0}}),t=new Mt({props:{value:"development",valueLabel:"Change since previous year"}}),{c(){k(a.$$.fragment),o=c(),k(t.$$.fragment)},l(i){$(a.$$.fragment,i),o=u(i),$(t.$$.fragment,i)},m(i,_){b(a,i,_),s(i,o,_),b(t,i,_),d=!0},p:me,i(i){d||(h(a.$$.fragment,i),h(t.$$.fragment,i),d=!0)},o(i){w(a.$$.fragment,i),w(t.$$.fragment,i),d=!1},d(i){i&&r(o),v(a,i),v(t,i)}}}function ya(p){let a,o='"Change since previous year" for POI density is not adjusted for growing OSM coverage.',t;return{c(){a=x("b"),a.textContent=o,t=ne(`
  Growing OpenStreetMap contributor coverage over time inflates early-year counts on its own,
  independent of real-world change (see the citywide growth chart further down this page for the
  shape of that coverage growth), so an early-year density delta can reflect new OSM contributors
  catching up rather than real commercial change. Offering Advantage's "change" view is less
  exposed to this: it is a same-year ratio to the citywide average, so an area-uniform coverage
  shift cancels out; density's raw count carries no such protection. Read early-year density
  deltas cautiously.`)},l(d){a=S(d,"B",{"data-svelte-h":!0}),V(a)!=="svelte-b5xv1v"&&(a.textContent=o),t=ae(d,`
  Growing OpenStreetMap contributor coverage over time inflates early-year counts on its own,
  independent of real-world change (see the citywide growth chart further down this page for the
  shape of that coverage growth), so an early-year density delta can reflect new OSM contributors
  catching up rather than real commercial change. Offering Advantage's "change" view is less
  exposed to this: it is a same-year ratio to the citywide average, so an area-uniform coverage
  shift cancels out; density's raw count carries no such protection. Read early-year density
  deltas cautiously.`)},m(d,i){s(d,a,i),s(d,t,i)},p:me,d(d){d&&(r(a),r(t))}}}function Dt(p){let a,o;return a=new Qe({props:{queryID:"poi_map_data",queryResult:p[3]}}),{c(){k(a.$$.fragment)},l(t){$(a.$$.fragment,t)},m(t,d){b(a,t,d),o=!0},p(t,d){const i={};d[0]&8&&(i.queryResult=t[3]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){w(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function va(p){let a;return{c(){a=ne(`These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.`)},l(o){a=ae(o,`These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.`)},m(o,t){s(o,a,t)},d(o){o&&r(a)}}}function qt(p){let a,o;return a=new Qe({props:{queryID:"poi_citywide",queryResult:p[4]}}),{c(){k(a.$$.fragment)},l(t){$(a.$$.fragment,t)},m(t,d){b(a,t,d),o=!0},p(t,d){const i={};d[0]&16&&(i.queryResult=t[4]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){w(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function ba(p){let a,o,t="completeness-bias correction write-up",d;return{c(){a=ne(`Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  `),o=x("a"),o.textContent=t,d=ne(`
  for how the index itself corrects for this).`),this.h()},l(i){a=ae(i,`Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  `),o=S(i,"A",{href:!0,"data-svelte-h":!0}),V(o)!=="svelte-2rwr8v"&&(o.textContent=t),d=ae(i,`
  for how the index itself corrects for this).`),this.h()},h(){M(o,"href","https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md")},m(i,_){s(i,a,_),s(i,o,_),s(i,d,_)},p:me,d(i){i&&(r(a),r(o),r(d))}}}function Ht(p){let a,o;return a=new Qe({props:{queryID:"poi_latest_year",queryResult:p[1]}}),{c(){k(a.$$.fragment)},l(t){$(a.$$.fragment,t)},m(t,d){b(a,t,d),o=!0},p(t,d){const i={};d[0]&2&&(i.queryResult=t[1]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){w(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function Bt(p){let a,o;return a=new Qe({props:{queryID:"poi_mix_latest",queryResult:p[5]}}),{c(){k(a.$$.fragment)},l(t){$(a.$$.fragment,t)},m(t,d){b(a,t,d),o=!0},p(t,d){const i={};d[0]&32&&(i.queryResult=t[5]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){w(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function It(p){let a,o;return a=new Qe({props:{queryID:"price_rent_citywide",queryResult:p[6]}}),{c(){k(a.$$.fragment)},l(t){$(a.$$.fragment,t)},m(t,d){b(a,t,d),o=!0},p(t,d){const i={};d[0]&64&&(i.queryResult=t[6]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){w(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function $a(p){let a,o,t="n_areas_with_brw",d;return{c(){a=ne(`These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see `),o=x("code"),o.textContent=t,d=ne(` in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.`)},l(i){a=ae(i,`These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see `),o=S(i,"CODE",{"data-svelte-h":!0}),V(o)!=="svelte-134q9ci"&&(o.textContent=t),d=ae(i,` in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.`)},m(i,_){s(i,a,_),s(i,o,_),s(i,d,_)},p:me,d(i){i&&(r(a),r(o),r(d))}}}function ka(p){let a,o,t,d,i,_,f,g,B=`This map shows where different kinds of shops, cafés, and other mapped places (&quot;points of
interest,&quot; or POIs) are concentrated across Berlin – either as raw density, or as
<strong class="markdown">Offering Advantage (OA)</strong>: how over- or under-represented a POI domain is in an area compared
to the citywide average for that domain (a location quotient). OA already feeds the governed
gentrification index as one input among several; this page surfaces it directly, then (further
down) zooms out to the same signal added up across the whole city, alongside land value &amp; rent.
See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
and <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md" rel="nofollow" class="markdown">ADR-0018</a>
for the full method, or the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for a plain-language walkthrough.`,q,A,Q,R,N,P,C,E,K,H,z,D,U,F,Y,y,T,m,O,ie=`Click a Planungsraum on the map to open its exact neighbourhood page, which also shows the
area's full OA-by-domain profile as a radar chart.`,_e,oe,re,W,fe='<a href="#citywide-context-poi-growth-land-value--rent">Citywide context: POI growth, land value &amp; rent</a>',de,se,pe=`Two more contextual signals, added up across the whole city rather than one neighbourhood at a
time: how the mix of mapped shops, cafés, and other amenities has grown, and how land value and
estimated rent have moved. Neither feeds the governed index directly — they&#39;re both context, not
predictors — but they&#39;re the same underlying data as the map above. Looking at the whole city
lets you see the citywide trend without already knowing which neighbourhood to check; for a
single-neighbourhood breakdown, see the <a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a>.`,le,n,L,ue,De='<a href="#shops-cafés--amenities-citywide">Shops, cafés &amp; amenities, citywide</a>',Ce,Re,j,qe,Le,ze,ge,mt='<a href="#what-kinds-of-places-make-up-that-total-latest-year">What kinds of places make up that total? (latest year)</a>',We,He,Be,Ae,Ke,we,pt='<a href="#land-value--estimated-rent-citywide">Land value &amp; estimated rent, citywide</a>',Ye,Ie,Oe,Xe,Te,Je,Pe,Ze,ye,_t='<a href="#honest-caveats">Honest caveats</a>',et,Ee,ft=`<li class="markdown"><strong class="markdown">OSM early-year completeness bias.</strong> The citywide POI-growth chart&#39;s early years should be read
cautiously — growing OpenStreetMap contributor coverage over time inflates early-year counts
independent of real change; the governed index corrects for this at the area level (see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>), but the simple citywide totals above do not.</li> <li class="markdown"><strong class="markdown">Land value and estimated rent are reference values, not transaction prices</strong>, and their
<em class="markdown">level</em> is a context/desirability signal, not a vulnerability score — only their <em class="markdown">change</em> over
time carries any displacement-pressure reading, and even that is not yet part of the governed
index (see <a href="/gentriduck/methodology" class="markdown">methodology §2/§6</a>).</li> <li class="markdown"><strong class="markdown">Offering Advantage and POI density are commercial-side signals, not the outcome variable.</strong>
A high OA or fast-growing POI count is read as a signal of commercial succession, never as a
standalone claim that an area is gentrifying — see <a href="/gentriduck/methodology" class="markdown">methodology §1</a> for the
double invasion-succession model this reads into.</li> <li class="markdown"><strong class="markdown">Offering Advantage is unstable in thinly-mapped PLRs — now suppressed, not just flagged.</strong> It
is a compositional ratio (a location quotient), so in a PLR-year with very few mapped businesses
a single new or removed business can swing its OA value disproportionately (#274, ADR-0017 D5
D-3). PLR-years with fewer than 10 total mapped places are shown as a blank/unshaded gap on the
map above rather than a potentially misleading value; the raw mapped-place count is always in
the tooltip so you can judge near-threshold cases yourself. <strong class="markdown">A blank/low cell means &quot;too thinly
observed to compute a stable ratio,&quot; never &quot;commercially dead.&quot;</strong> OSM coverage is not spatially
neutral — beyond the early-year completeness bias noted above, mapping completeness also varies
<em class="markdown">within</em> a given year and tends to correlate with area advantage, with poorer/peripheral areas
typically less thoroughly mapped than richer/central ones (Haklay, M. 2010, &quot;How Good is
Volunteered Geographical Information?&quot;, <em class="markdown">Environment and Planning B</em>). A low mapped-place count
can therefore reflect an OSM coverage gap rather than a real absence of commercial activity —
a blank PLR should not be read as evidence that nothing is happening there.</li> <li class="markdown"><strong class="markdown">The Gaussian-weighted Offering Advantage construct is bandwidth-sensitive at the edges of its
sweep — but that is not the construct shown on the map above</strong> (#274, ADR-0017 D5 C-4). A
dedicated 500 m, 1000 m, and 1500 m bandwidth sweep (<code class="markdown">analysis/oa_bandwidth_sweep.py</code>) found the
Gaussian-weighted variant&#39;s OA rankings <strong class="markdown">stable</strong> close to the 1000 m headline catchment
(500m↔1000m and 1000m↔1500m both rank-correlate above 0.7, Spearman, every year 2008–2026) but
<strong class="markdown">re-ranked meaningfully</strong> across the sweep&#39;s full 500 m to 1500 m span (pooled Spearman r = 0.68,
below the 0.7 publish-gate threshold in 17 of 19 years) — see the
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md" rel="nofollow" class="markdown">full findings</a>.
The map above uses the <strong class="markdown">hard point-in-polygon variant</strong> instead, which has no bandwidth
parameter and is therefore bandwidth-invariant by construction — meaning it makes no bandwidth
choice, not that it has been tested and found spatially robust: it remains untested for this
fragility and sits at the sharp/narrow end of the spatial-grain family swept above — this finding
does not describe the values shown here; it is disclosed because it bears on a separate, still-open question
(<a href="https://github.com/dhelweg/gentriduck/issues/174" rel="nofollow" class="markdown">OA-C.1, #174</a>) about whether the published
headline should ever switch to the bandwidth-weighted construct. Read the exact catchment radius,
where one is actually in use, as a real methodological choice, not an arbitrary implementation
detail.</li>`,tt,ve,ut='<a href="#further-reading">Further reading</a>',at,Me,ct=`See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
for how Offering Advantage is computed, the
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md" rel="nofollow" class="markdown">bandwidth-sweep findings</a>
for the C-4 discharge detail, the <a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a> for a
single-neighbourhood breakdown of these same signals alongside the governed index, the
<a href="/gentriduck/berlin/maps" class="markdown">gentrification-pressure map</a> for the governed index itself, or
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage — modes, scales &amp; dominance</a> for the other eight
calculation methods, the area-hierarchy scale switch, and the within-group dominance construct
this map does not yet surface (this map shows only the canonical nested-LQ method at PLR grain).`,nt,Ge,it,xe,ot,be=typeof G<"u"&&G.title&&G.hide_title!==!0&&sa();function Ft(e,l){return typeof G<"u"&&G.title?da:la}let je=Ft()(p),$e=typeof G=="object"&&ma();_=new Xt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"POI & Offering Advantage map",lede:"Where shops, cafés, and other mapped places are concentrated across Berlin, and how that commercial mix has grown over time — the commercial half of the double invasion-succession model this project's index is built on."}}),A=new Fe({props:{status:"info",$$slots:{default:[fa]},$$scope:{ctx:p}}}),R=new Fe({props:{status:"warning",$$slots:{default:[ua]},$$scope:{ctx:p}}}),P=new dt({props:{name:"metric",title:"Metric",defaultValue:"density",$$slots:{default:[ca]},$$scope:{ctx:p}}}),E=new dt({props:{name:"domain",title:"POI domain",defaultValue:"Retail",$$slots:{default:[ha]},$$scope:{ctx:p}}}),H=new dt({props:{name:"year",title:"Year",defaultValue:"2025",$$slots:{default:[ga]},$$scope:{ctx:p}}}),D=new ia({props:{name:"view",title:"Stock vs. development",display:"tabs",defaultValue:"stock",$$slots:{default:[wa]},$$scope:{ctx:p}}}),F=new Fe({props:{status:"warning",$$slots:{default:[ya]},$$scope:{ctx:p}}});let X=p[3]&&Dt(p);T=new Jt({props:{data:p[3],geoJsonUrl:`${ke}/geo/plr_live_data.geojson`,geoId:"area_code",areaCol:"area_code",value:p[0].metric.value==="density"?p[2]==="stock"?"poi_density_per_km2":"density_delta":p[2]==="stock"?"oa_domain":"oa_delta",legendType:"scalar",colorPalette:p[0].metric.value==="density"&&p[2]==="stock"?void 0:p[8],min:p[0].metric.value==="oa"?p[2]==="stock"?ce(p[3],"oa_domain",1)[0]:ce(p[3],"oa_delta",0)[0]:p[2]==="development"?ce(p[3],"density_delta",0)[0]:void 0,max:p[0].metric.value==="oa"?p[2]==="stock"?ce(p[3],"oa_domain",1)[1]:ce(p[3],"oa_delta",0)[1]:p[2]==="development"?ce(p[3],"density_delta",0)[1]:void 0,title:"Berlin Planungsraum (PLR) — "+(p[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+p[0].domain.value+", "+p[0].year.value+(p[2]==="development"?" (change vs. previous year)":""),link:"link",tooltip:p[7],emptyMessage:"No data for this domain/year combination."}}),n=new Fe({props:{status:"info",$$slots:{default:[va]},$$scope:{ctx:p}}});let J=p[4]&&qt(p);j=new Fe({props:{status:"info",$$slots:{default:[ba]},$$scope:{ctx:p}}}),Le=new xt({props:{data:p[4],x:"snapshot_year",y:"poi_count",title:"Total mapped shops, cafés & amenities, city of Berlin",yAxisTitle:"Number of mapped places"}});let Z=p[1]&&Ht(p),ee=p[5]&&Bt(p);Ae=new St({props:{data:p[5],x:"poi_category_h",y:"poi_count",title:"Top 15 categories of mapped places, "+p[1][0].year,yAxisTitle:"Number of mapped places",swapXY:"true"}});let te=p[6]&&It(p);return Oe=new Fe({props:{status:"info",$$slots:{default:[$a]},$$scope:{ctx:p}}}),Te=new xt({props:{data:p[6],x:"snapshot_year",y:["avg_est_rent_low","avg_est_rent_mid","avg_est_rent_high"],title:"Citywide estimated rent range (EUR/m²), by year",yAxisTitle:"EUR/m²"}}),Pe=new St({props:{data:p[6],x:"snapshot_year",y:"avg_brw_eur_m2",title:"Citywide average land value (Bodenrichtwert), residential zones (EUR/m²)",yAxisTitle:"EUR/m²",emptyMessage:"No residential land-value zones matched for any year."}}),xe=new Yt({}),{c(){be&&be.c(),a=c(),je.c(),o=x("meta"),t=x("meta"),$e&&$e.c(),d=st(),i=c(),k(_.$$.fragment),f=c(),g=x("p"),g.innerHTML=B,q=c(),k(A.$$.fragment),Q=c(),k(R.$$.fragment),N=c(),k(P.$$.fragment),C=c(),k(E.$$.fragment),K=c(),k(H.$$.fragment),z=c(),k(D.$$.fragment),U=c(),k(F.$$.fragment),Y=c(),X&&X.c(),y=c(),k(T.$$.fragment),m=c(),O=x("p"),O.textContent=ie,_e=c(),oe=x("hr"),re=c(),W=x("h2"),W.innerHTML=fe,de=c(),se=x("p"),se.innerHTML=pe,le=c(),k(n.$$.fragment),L=c(),ue=x("h3"),ue.innerHTML=De,Ce=c(),J&&J.c(),Re=c(),k(j.$$.fragment),qe=c(),k(Le.$$.fragment),ze=c(),ge=x("h4"),ge.innerHTML=mt,We=c(),Z&&Z.c(),He=c(),ee&&ee.c(),Be=c(),k(Ae.$$.fragment),Ke=c(),we=x("h3"),we.innerHTML=pt,Ye=c(),te&&te.c(),Ie=c(),k(Oe.$$.fragment),Xe=c(),k(Te.$$.fragment),Je=c(),k(Pe.$$.fragment),Ze=c(),ye=x("h2"),ye.innerHTML=_t,et=c(),Ee=x("ul"),Ee.innerHTML=ft,tt=c(),ve=x("h2"),ve.innerHTML=ut,at=c(),Me=x("p"),Me.innerHTML=ct,nt=c(),Ge=x("hr"),it=c(),k(xe.$$.fragment),this.h()},l(e){be&&be.l(e),a=u(e);const l=jt("svelte-2igo1p",document.head);je.l(l),o=S(l,"META",{name:!0,content:!0}),t=S(l,"META",{name:!0,content:!0}),$e&&$e.l(l),d=st(),l.forEach(r),i=u(e),$(_.$$.fragment,e),f=u(e),g=S(e,"P",{class:!0,"data-svelte-h":!0}),V(g)!=="svelte-rlyga1"&&(g.innerHTML=B),q=u(e),$(A.$$.fragment,e),Q=u(e),$(R.$$.fragment,e),N=u(e),$(P.$$.fragment,e),C=u(e),$(E.$$.fragment,e),K=u(e),$(H.$$.fragment,e),z=u(e),$(D.$$.fragment,e),U=u(e),$(F.$$.fragment,e),Y=u(e),X&&X.l(e),y=u(e),$(T.$$.fragment,e),m=u(e),O=S(e,"P",{class:!0,"data-svelte-h":!0}),V(O)!=="svelte-1gvsp54"&&(O.textContent=ie),_e=u(e),oe=S(e,"HR",{class:!0}),re=u(e),W=S(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),V(W)!=="svelte-1o83ktl"&&(W.innerHTML=fe),de=u(e),se=S(e,"P",{class:!0,"data-svelte-h":!0}),V(se)!=="svelte-wcr46p"&&(se.innerHTML=pe),le=u(e),$(n.$$.fragment,e),L=u(e),ue=S(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),V(ue)!=="svelte-1pe5ai8"&&(ue.innerHTML=De),Ce=u(e),J&&J.l(e),Re=u(e),$(j.$$.fragment,e),qe=u(e),$(Le.$$.fragment,e),ze=u(e),ge=S(e,"H4",{class:!0,id:!0,"data-svelte-h":!0}),V(ge)!=="svelte-1mnfgmg"&&(ge.innerHTML=mt),We=u(e),Z&&Z.l(e),He=u(e),ee&&ee.l(e),Be=u(e),$(Ae.$$.fragment,e),Ke=u(e),we=S(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),V(we)!=="svelte-9thoit"&&(we.innerHTML=pt),Ye=u(e),te&&te.l(e),Ie=u(e),$(Oe.$$.fragment,e),Xe=u(e),$(Te.$$.fragment,e),Je=u(e),$(Pe.$$.fragment,e),Ze=u(e),ye=S(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),V(ye)!=="svelte-ad0syq"&&(ye.innerHTML=_t),et=u(e),Ee=S(e,"UL",{class:!0,"data-svelte-h":!0}),V(Ee)!=="svelte-1mdj6eh"&&(Ee.innerHTML=ft),tt=u(e),ve=S(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),V(ve)!=="svelte-oimjns"&&(ve.innerHTML=ut),at=u(e),Me=S(e,"P",{class:!0,"data-svelte-h":!0}),V(Me)!=="svelte-1ok57l7"&&(Me.innerHTML=ct),nt=u(e),Ge=S(e,"HR",{class:!0}),it=u(e),$(xe.$$.fragment,e),this.h()},h(){M(o,"name","twitter:card"),M(o,"content","summary_large_image"),M(t,"name","twitter:site"),M(t,"content","@evidence_dev"),M(g,"class","markdown"),M(O,"class","markdown"),M(oe,"class","markdown"),M(W,"class","markdown"),M(W,"id","citywide-context-poi-growth-land-value--rent"),M(se,"class","markdown"),M(ue,"class","markdown"),M(ue,"id","shops-cafés--amenities-citywide"),M(ge,"class","markdown"),M(ge,"id","what-kinds-of-places-make-up-that-total-latest-year"),M(we,"class","markdown"),M(we,"id","land-value--estimated-rent-citywide"),M(ye,"class","markdown"),M(ye,"id","honest-caveats"),M(Ee,"class","markdown"),M(ve,"class","markdown"),M(ve,"id","further-reading"),M(Me,"class","markdown"),M(Ge,"class","markdown")},m(e,l){be&&be.m(e,l),s(e,a,l),je.m(document.head,null),rt(document.head,o),rt(document.head,t),$e&&$e.m(document.head,null),rt(document.head,d),s(e,i,l),b(_,e,l),s(e,f,l),s(e,g,l),s(e,q,l),b(A,e,l),s(e,Q,l),b(R,e,l),s(e,N,l),b(P,e,l),s(e,C,l),b(E,e,l),s(e,K,l),b(H,e,l),s(e,z,l),b(D,e,l),s(e,U,l),b(F,e,l),s(e,Y,l),X&&X.m(e,l),s(e,y,l),b(T,e,l),s(e,m,l),s(e,O,l),s(e,_e,l),s(e,oe,l),s(e,re,l),s(e,W,l),s(e,de,l),s(e,se,l),s(e,le,l),b(n,e,l),s(e,L,l),s(e,ue,l),s(e,Ce,l),J&&J.m(e,l),s(e,Re,l),b(j,e,l),s(e,qe,l),b(Le,e,l),s(e,ze,l),s(e,ge,l),s(e,We,l),Z&&Z.m(e,l),s(e,He,l),ee&&ee.m(e,l),s(e,Be,l),b(Ae,e,l),s(e,Ke,l),s(e,we,l),s(e,Ye,l),te&&te.m(e,l),s(e,Ie,l),b(Oe,e,l),s(e,Xe,l),b(Te,e,l),s(e,Je,l),b(Pe,e,l),s(e,Ze,l),s(e,ye,l),s(e,et,l),s(e,Ee,l),s(e,tt,l),s(e,ve,l),s(e,at,l),s(e,Me,l),s(e,nt,l),s(e,Ge,l),s(e,it,l),b(xe,e,l),ot=!0},p(e,l){typeof G<"u"&&G.title&&G.hide_title!==!0&&be.p(e,l),je.p(e,l),typeof G=="object"&&$e.p(e,l);const ht={};l[1]&16384&&(ht.$$scope={dirty:l,ctx:e}),A.$set(ht);const gt={};l[1]&16384&&(gt.$$scope={dirty:l,ctx:e}),R.$set(gt);const wt={};l[1]&16384&&(wt.$$scope={dirty:l,ctx:e}),P.$set(wt);const yt={};l[1]&16384&&(yt.$$scope={dirty:l,ctx:e}),E.$set(yt);const vt={};l[1]&16384&&(vt.$$scope={dirty:l,ctx:e}),H.$set(vt);const bt={};l[1]&16384&&(bt.$$scope={dirty:l,ctx:e}),D.$set(bt);const $t={};l[1]&16384&&($t.$$scope={dirty:l,ctx:e}),F.$set($t),e[3]?X?(X.p(e,l),l[0]&8&&h(X,1)):(X=Dt(e),X.c(),h(X,1),X.m(y.parentNode,y)):X&&(Ue(),w(X,1,1,()=>{X=null}),Ne());const Se={};l[0]&8&&(Se.data=e[3]),l[0]&5&&(Se.value=e[0].metric.value==="density"?e[2]==="stock"?"poi_density_per_km2":"density_delta":e[2]==="stock"?"oa_domain":"oa_delta"),l[0]&5&&(Se.colorPalette=e[0].metric.value==="density"&&e[2]==="stock"?void 0:e[8]),l[0]&13&&(Se.min=e[0].metric.value==="oa"?e[2]==="stock"?ce(e[3],"oa_domain",1)[0]:ce(e[3],"oa_delta",0)[0]:e[2]==="development"?ce(e[3],"density_delta",0)[0]:void 0),l[0]&13&&(Se.max=e[0].metric.value==="oa"?e[2]==="stock"?ce(e[3],"oa_domain",1)[1]:ce(e[3],"oa_delta",0)[1]:e[2]==="development"?ce(e[3],"density_delta",0)[1]:void 0),l[0]&5&&(Se.title="Berlin Planungsraum (PLR) — "+(e[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+e[0].domain.value+", "+e[0].year.value+(e[2]==="development"?" (change vs. previous year)":"")),l[0]&128&&(Se.tooltip=e[7]),T.$set(Se);const kt={};l[1]&16384&&(kt.$$scope={dirty:l,ctx:e}),n.$set(kt),e[4]?J?(J.p(e,l),l[0]&16&&h(J,1)):(J=qt(e),J.c(),h(J,1),J.m(Re.parentNode,Re)):J&&(Ue(),w(J,1,1,()=>{J=null}),Ne());const Ct={};l[1]&16384&&(Ct.$$scope={dirty:l,ctx:e}),j.$set(Ct);const Rt={};l[0]&16&&(Rt.data=e[4]),Le.$set(Rt),e[1]?Z?(Z.p(e,l),l[0]&2&&h(Z,1)):(Z=Ht(e),Z.c(),h(Z,1),Z.m(He.parentNode,He)):Z&&(Ue(),w(Z,1,1,()=>{Z=null}),Ne()),e[5]?ee?(ee.p(e,l),l[0]&32&&h(ee,1)):(ee=Bt(e),ee.c(),h(ee,1),ee.m(Be.parentNode,Be)):ee&&(Ue(),w(ee,1,1,()=>{ee=null}),Ne());const lt={};l[0]&32&&(lt.data=e[5]),l[0]&2&&(lt.title="Top 15 categories of mapped places, "+e[1][0].year),Ae.$set(lt),e[6]?te?(te.p(e,l),l[0]&64&&h(te,1)):(te=It(e),te.c(),h(te,1),te.m(Ie.parentNode,Ie)):te&&(Ue(),w(te,1,1,()=>{te=null}),Ne());const Lt={};l[1]&16384&&(Lt.$$scope={dirty:l,ctx:e}),Oe.$set(Lt);const At={};l[0]&64&&(At.data=e[6]),Te.$set(At);const Ot={};l[0]&64&&(Ot.data=e[6]),Pe.$set(Ot)},i(e){ot||(h(_.$$.fragment,e),h(A.$$.fragment,e),h(R.$$.fragment,e),h(P.$$.fragment,e),h(E.$$.fragment,e),h(H.$$.fragment,e),h(D.$$.fragment,e),h(F.$$.fragment,e),h(X),h(T.$$.fragment,e),h(n.$$.fragment,e),h(J),h(j.$$.fragment,e),h(Le.$$.fragment,e),h(Z),h(ee),h(Ae.$$.fragment,e),h(te),h(Oe.$$.fragment,e),h(Te.$$.fragment,e),h(Pe.$$.fragment,e),h(xe.$$.fragment,e),ot=!0)},o(e){w(_.$$.fragment,e),w(A.$$.fragment,e),w(R.$$.fragment,e),w(P.$$.fragment,e),w(E.$$.fragment,e),w(H.$$.fragment,e),w(D.$$.fragment,e),w(F.$$.fragment,e),w(X),w(T.$$.fragment,e),w(n.$$.fragment,e),w(J),w(j.$$.fragment,e),w(Le.$$.fragment,e),w(Z),w(ee),w(Ae.$$.fragment,e),w(te),w(Oe.$$.fragment,e),w(Te.$$.fragment,e),w(Pe.$$.fragment,e),w(xe.$$.fragment,e),ot=!1},d(e){e&&(r(a),r(i),r(f),r(g),r(q),r(Q),r(N),r(C),r(K),r(z),r(U),r(Y),r(y),r(m),r(O),r(_e),r(oe),r(re),r(W),r(de),r(se),r(le),r(L),r(ue),r(Ce),r(Re),r(qe),r(ze),r(ge),r(We),r(He),r(Be),r(Ke),r(we),r(Ye),r(Ie),r(Xe),r(Je),r(Ze),r(ye),r(et),r(Ee),r(tt),r(ve),r(at),r(Me),r(nt),r(Ge),r(it)),be&&be.d(e),je.d(e),r(o),r(t),$e&&$e.d(e),r(d),v(_,e),v(A,e),v(R,e),v(P,e),v(E,e),v(H,e),v(D,e),v(F,e),X&&X.d(e),v(T,e),v(n,e),J&&J.d(e),v(j,e),v(Le,e),Z&&Z.d(e),ee&&ee.d(e),v(Ae,e),te&&te.d(e),v(Oe,e),v(Te,e),v(Pe,e),v(xe,e)}}}const G={title:"POI & Offering Advantage map"};function ce(p,a,o){const d=p.map(i=>i[a]).filter(i=>i!=null&&!isNaN(i)).reduce((i,_)=>Math.max(i,Math.abs(_-o)),0)||1;return[o-d,o+d]}function Ca(p,a,o){let t,d,i,_;Tt(p,oa,j=>o(31,i=j)),Tt(p,Et,j=>o(36,_=j));let{data:f}=a,{data:g={},customFormattingSettings:B,__db:q,inputs:A}=f;Nt(Et,_="68035a6698e6e61c5a0a6fe031efcb76",_);let Q=ea(Zt(A));Ut(Q.subscribe(j=>o(0,A=j))),Vt(na,{getCustomFormats:()=>B.customFormats||[]});const R=(j,qe)=>ra(q.query,j,{query_name:qe});ta(R),i.params,Qt(()=>!0);let N={initialData:void 0,initialError:void 0},P=he`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change vs. the immediately preceding snapshot_year
-- present in the mart for the same area + domain (window function over the full series, before
-- the year filter below) -- "development" = movement, not a re-derived indicator. Computed on
-- the RAW (pre-suppression) oa_domain_raw so a suppressed neighbouring year doesn't break the
-- lag chain; suppression (#274, ADR-0017 D5 D-3) is applied once, at the very end, based on
-- THIS row's own oa_domain_min_base_flag (see final select below).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${A.domain.value}'
    ),
    names as (
        select distinct area_code, area_name
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    )
select
    b.area_code,
    n.area_name,
    b.poi_density_per_km2,
    b.poi_count,
    -- #274 (ADR-0017 D5 D-3 discharge): suppress oa_domain/oa_delta to NULL for
    -- thinly-mapped PLR-years (< oa_min_poi_base_n total mapped POIs, default 10 --
    -- int_poi_offering_advantage.sql) -- renders as an unshaded gap on the choropleth
    -- rather than a compositional-LQ value a single POI could have swung. poi_density
    -- is UNAFFECTED (it is not a compositional ratio, so it is not subject to the
    -- same small-denominator instability -- D-3 only names the LQ).
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): the map's link
    -- column is rendered as a plain SVG <a href> by PolygonMap (#351; AreaMap did a raw window.location.href), unlike Evidence's own
    -- nav/DataTable links, so \`${ke}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${ke}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${A.year.value}`,C=`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change vs. the immediately preceding snapshot_year
-- present in the mart for the same area + domain (window function over the full series, before
-- the year filter below) -- "development" = movement, not a re-derived indicator. Computed on
-- the RAW (pre-suppression) oa_domain_raw so a suppressed neighbouring year doesn't break the
-- lag chain; suppression (#274, ADR-0017 D5 D-3) is applied once, at the very end, based on
-- THIS row's own oa_domain_min_base_flag (see final select below).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${A.domain.value}'
    ),
    names as (
        select distinct area_code, area_name
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    )
select
    b.area_code,
    n.area_name,
    b.poi_density_per_km2,
    b.poi_count,
    -- #274 (ADR-0017 D5 D-3 discharge): suppress oa_domain/oa_delta to NULL for
    -- thinly-mapped PLR-years (< oa_min_poi_base_n total mapped POIs, default 10 --
    -- int_poi_offering_advantage.sql) -- renders as an unshaded gap on the choropleth
    -- rather than a compositional-LQ value a single POI could have swung. poi_density
    -- is UNAFFECTED (it is not a compositional ratio, so it is not subject to the
    -- same small-denominator instability -- D-3 only names the LQ).
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): the map's link
    -- column is rendered as a plain SVG <a href> by PolygonMap (#351; AreaMap did a raw window.location.href), unlike Evidence's own
    -- nav/DataTable links, so \`${ke}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${ke}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${A.year.value}`;g.poi_map_data_data&&(g.poi_map_data_data instanceof Error?N.initialError=g.poi_map_data_data:N.initialData=g.poi_map_data_data,g.poi_map_data_columns&&(N.knownColumns=g.poi_map_data_columns));let E,K=!1;const H=Ve.createReactive({callback:j=>{o(3,E=j)},execFn:R},{id:"poi_map_data",...N});H(C,{noResolve:P,...N}),globalThis[Symbol.for("poi_map_data")]={get value(){return E}};let z={initialData:void 0,initialError:void 0},D=he`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`,U=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`;g.poi_citywide_data&&(g.poi_citywide_data instanceof Error?z.initialError=g.poi_citywide_data:z.initialData=g.poi_citywide_data,g.poi_citywide_columns&&(z.knownColumns=g.poi_citywide_columns));let F,Y=!1;const y=Ve.createReactive({callback:j=>{o(4,F=j)},execFn:R},{id:"poi_citywide",...z});y(U,{noResolve:D,...z}),globalThis[Symbol.for("poi_citywide")]={get value(){return F}};let T={initialData:void 0,initialError:void 0},m=he`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`,O=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`;g.poi_latest_year_data&&(g.poi_latest_year_data instanceof Error?T.initialError=g.poi_latest_year_data:T.initialData=g.poi_latest_year_data,g.poi_latest_year_columns&&(T.knownColumns=g.poi_latest_year_columns));let ie,_e=!1;const oe=Ve.createReactive({callback:j=>{o(1,ie=j)},execFn:R},{id:"poi_latest_year",...T});oe(O,{noResolve:m,...T}),globalThis[Symbol.for("poi_latest_year")]={get value(){return ie}};let re={initialData:void 0,initialError:void 0},W=he`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${ie[0].year}
group by all
order by poi_count desc
limit 15`,fe=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${ie[0].year}
group by all
order by poi_count desc
limit 15`;g.poi_mix_latest_data&&(g.poi_mix_latest_data instanceof Error?re.initialError=g.poi_mix_latest_data:re.initialData=g.poi_mix_latest_data,g.poi_mix_latest_columns&&(re.knownColumns=g.poi_mix_latest_columns));let de,se=!1;const pe=Ve.createReactive({callback:j=>{o(5,de=j)},execFn:R},{id:"poi_mix_latest",...re});pe(fe,{noResolve:W,...re}),globalThis[Symbol.for("poi_mix_latest")]={get value(){return de}};let le={initialData:void 0,initialError:void 0},n=he`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`,L=`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`;g.price_rent_citywide_data&&(g.price_rent_citywide_data instanceof Error?le.initialError=g.price_rent_citywide_data:le.initialData=g.price_rent_citywide_data,g.price_rent_citywide_columns&&(le.knownColumns=g.price_rent_citywide_columns));let ue,De=!1;const Ce=Ve.createReactive({callback:j=>{o(6,ue=j)},execFn:R},{id:"price_rent_citywide",...le});Ce(L,{noResolve:n,...le}),globalThis[Symbol.for("price_rent_citywide")]={get value(){return ue}};const Re=["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"];return p.$$set=j=>{"data"in j&&o(9,f=j.data)},p.$$.update=()=>{p.$$.dirty[0]&512&&o(10,{data:g={},customFormattingSettings:B,__db:q}=f,g),p.$$.dirty[0]&1024&&aa.set(Object.keys(g).length>0),p.$$.dirty[1]&1&&i.params,p.$$.dirty[0]&1&&o(12,P=he`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change vs. the immediately preceding snapshot_year
-- present in the mart for the same area + domain (window function over the full series, before
-- the year filter below) -- "development" = movement, not a re-derived indicator. Computed on
-- the RAW (pre-suppression) oa_domain_raw so a suppressed neighbouring year doesn't break the
-- lag chain; suppression (#274, ADR-0017 D5 D-3) is applied once, at the very end, based on
-- THIS row's own oa_domain_min_base_flag (see final select below).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${A.domain.value}'
    ),
    names as (
        select distinct area_code, area_name
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    )
select
    b.area_code,
    n.area_name,
    b.poi_density_per_km2,
    b.poi_count,
    -- #274 (ADR-0017 D5 D-3 discharge): suppress oa_domain/oa_delta to NULL for
    -- thinly-mapped PLR-years (< oa_min_poi_base_n total mapped POIs, default 10 --
    -- int_poi_offering_advantage.sql) -- renders as an unshaded gap on the choropleth
    -- rather than a compositional-LQ value a single POI could have swung. poi_density
    -- is UNAFFECTED (it is not a compositional ratio, so it is not subject to the
    -- same small-denominator instability -- D-3 only names the LQ).
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): the map's link
    -- column is rendered as a plain SVG <a href> by PolygonMap (#351; AreaMap did a raw window.location.href), unlike Evidence's own
    -- nav/DataTable links, so \`${ke}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${ke}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${A.year.value}`),p.$$.dirty[0]&1&&o(13,C=`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change vs. the immediately preceding snapshot_year
-- present in the mart for the same area + domain (window function over the full series, before
-- the year filter below) -- "development" = movement, not a re-derived indicator. Computed on
-- the RAW (pre-suppression) oa_domain_raw so a suppressed neighbouring year doesn't break the
-- lag chain; suppression (#274, ADR-0017 D5 D-3) is applied once, at the very end, based on
-- THIS row's own oa_domain_min_base_flag (see final select below).
with
    base as (
        select
            area_code,
            snapshot_year,
            poi_density_per_km2,
            poi_count,
            oa_domain as oa_domain_raw,
            oa_domain_min_base_flag,
            poi_density_per_km2
            - lag(poi_density_per_km2) over (
                partition by area_code order by snapshot_year
            ) as density_delta,
            oa_domain
            - lag(oa_domain) over (partition by area_code order by snapshot_year) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${A.domain.value}'
    ),
    names as (
        select distinct area_code, area_name
        from gentriduck_marts.gentrification_index
        where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
    )
select
    b.area_code,
    n.area_name,
    b.poi_density_per_km2,
    b.poi_count,
    -- #274 (ADR-0017 D5 D-3 discharge): suppress oa_domain/oa_delta to NULL for
    -- thinly-mapped PLR-years (< oa_min_poi_base_n total mapped POIs, default 10 --
    -- int_poi_offering_advantage.sql) -- renders as an unshaded gap on the choropleth
    -- rather than a compositional-LQ value a single POI could have swung. poi_density
    -- is UNAFFECTED (it is not a compositional ratio, so it is not subject to the
    -- same small-denominator instability -- D-3 only names the LQ).
    case when b.oa_domain_min_base_flag then null else b.oa_domain_raw end as oa_domain,
    b.density_delta,
    case when b.oa_domain_min_base_flag then null else b.oa_delta_raw end as oa_delta,
    b.oa_domain_min_base_flag,
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): the map's link
    -- column is rendered as a plain SVG <a href> by PolygonMap (#351; AreaMap did a raw window.location.href), unlike Evidence's own
    -- nav/DataTable links, so \`${ke}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${ke}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${A.year.value}`),p.$$.dirty[0]&30720&&(P||!K?P||(H(C,{noResolve:P,...N}),o(14,K=!0)):H(C,{noResolve:P})),p.$$.dirty[0]&491520&&(D||!Y?D||(y(U,{noResolve:D,...z}),o(18,Y=!0)):y(U,{noResolve:D})),p.$$.dirty[0]&7864320&&(m||!_e?m||(oe(O,{noResolve:m,...T}),o(22,_e=!0)):oe(O,{noResolve:m})),p.$$.dirty[0]&2&&o(24,W=he`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${ie[0].year}
group by all
order by poi_count desc
limit 15`),p.$$.dirty[0]&2&&o(25,fe=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${ie[0].year}
group by all
order by poi_count desc
limit 15`),p.$$.dirty[0]&125829120&&(W||!se?W||(pe(fe,{noResolve:W,...re}),o(26,se=!0)):pe(fe,{noResolve:W})),p.$$.dirty[0]&2013265920&&(n||!De?n||(Ce(L,{noResolve:n,...le}),o(30,De=!0)):Ce(L,{noResolve:n})),p.$$.dirty[0]&1&&o(2,t=A.view==="development"?"development":"stock"),p.$$.dirty[0]&5&&o(7,d=[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:A.metric.value==="density"?t==="stock"?"poi_density_per_km2":"density_delta":t==="stock"?"oa_domain":"oa_delta",title:(A.metric.value==="density"?"POI density / km²":"Offering Advantage")+(t==="development"?" (change vs. previous year)":""),fmt:"num1"},{id:"poi_count",title:"Mapped places (this domain)",fmt:"num0"},{id:"area_code",title:"Area code",valueClass:"text-xs opacity-60",fmt:"id"}])},o(16,D=he`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`),o(17,U=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`),o(20,m=he`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`),o(21,O=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`),o(28,n=he`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`),o(29,L=`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`),[A,ie,t,E,F,de,ue,d,Re,f,g,N,P,C,K,z,D,U,Y,T,m,O,_e,re,W,fe,se,le,n,L,De,i]}class Na extends Wt{constructor(a){super(),Kt(this,a,Ca,ka,Gt,{data:9},null,[-1,-1])}}export{Na as component};
