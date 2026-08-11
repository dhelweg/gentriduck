import{s as jt,d as r,i as s,a as rt,b as M,c as u,h as Gt,e as x,f as st,g as Q,j as c,k as D,l as Et,m as Nt,o as Ut,n as Qt,p as Vt,q as me,t as ne,u as ie,r as zt}from"../chunks/scheduler.BopPEjhc.js";import{S as Wt,i as Kt,d as v,t as g,a as h,c as Ge,m as y,b,e as $,g as Ne}from"../chunks/index.CYkVJg6_.js";import{F as Yt}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as Xt}from"../chunks/Hero.CRoRGI02.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{b as Ce,w as Jt}from"../chunks/entry.BMmpG6A7.js";import{A as Ie}from"../chunks/Alert.BO8kFSQK.js";import{e as Zt,s as ea,Q as Ue,p as ta,a as Tt,r as Pt,C as aa}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as ge}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as dt,a as B}from"../chunks/Dropdown.BxlIFH-r.js";import{B as na,a as Mt}from"../chunks/ButtonGroup.inaDnyw_.js";import{p as ia}from"../chunks/stores.Ceyp10jj.js";import{Q as Qe}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as xt}from"../chunks/BarChart.DzrCmZ_r.js";import{L as Dt}from"../chunks/LineChart.BThKrpoY.js";import{A as oa}from"../chunks/AreaMap.w9kcpT6D.js";import{p as ra}from"../chunks/profile.BW8tN6E9.js";function sa(_){let a,o=G.title+"",t;return{c(){a=D("h1"),t=ie(o),this.h()},l(l){a=x(l,"H1",{class:!0});var i=zt(a);t=ne(i,o),i.forEach(r),this.h()},h(){M(a,"class","title")},m(l,i){s(l,a,i),rt(a,t)},p:me,d(l){l&&r(a)}}}function la(_){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:me,p:me,d:me}}function da(_){let a,o,t,l,i;return document.title=a=G.title,{c(){o=c(),t=D("meta"),l=c(),i=D("meta"),this.h()},l(f){o=u(f),t=x(f,"META",{property:!0,content:!0}),l=u(f),i=x(f,"META",{name:!0,content:!0}),this.h()},h(){var f,p;M(t,"property","og:title"),M(t,"content",((f=G.og)==null?void 0:f.title)??G.title),M(i,"name","twitter:title"),M(i,"content",((p=G.og)==null?void 0:p.title)??G.title)},m(f,p){s(f,o,p),s(f,t,p),s(f,l,p),s(f,i,p)},p(f,p){p&0&&a!==(a=G.title)&&(document.title=a)},d(f){f&&(r(o),r(t),r(l),r(i))}}}function ma(_){var i,f;let a,o,t=(G.description||((i=G.og)==null?void 0:i.description))&&pa(),l=((f=G.og)==null?void 0:f.image)&&_a();return{c(){t&&t.c(),a=c(),l&&l.c(),o=st()},l(p){t&&t.l(p),a=u(p),l&&l.l(p),o=st()},m(p,S){t&&t.m(p,S),s(p,a,S),l&&l.m(p,S),s(p,o,S)},p(p,S){var H,k;(G.description||(H=G.og)!=null&&H.description)&&t.p(p,S),(k=G.og)!=null&&k.image&&l.p(p,S)},d(p){p&&(r(a),r(o)),t&&t.d(p),l&&l.d(p)}}}function pa(_){let a,o,t,l,i;return{c(){a=D("meta"),o=c(),t=D("meta"),l=c(),i=D("meta"),this.h()},l(f){a=x(f,"META",{name:!0,content:!0}),o=u(f),t=x(f,"META",{property:!0,content:!0}),l=u(f),i=x(f,"META",{name:!0,content:!0}),this.h()},h(){var f,p,S;M(a,"name","description"),M(a,"content",G.description??((f=G.og)==null?void 0:f.description)),M(t,"property","og:description"),M(t,"content",((p=G.og)==null?void 0:p.description)??G.description),M(i,"name","twitter:description"),M(i,"content",((S=G.og)==null?void 0:S.description)??G.description)},m(f,p){s(f,a,p),s(f,o,p),s(f,t,p),s(f,l,p),s(f,i,p)},p:me,d(f){f&&(r(a),r(o),r(t),r(l),r(i))}}}function _a(_){let a,o,t;return{c(){a=D("meta"),o=c(),t=D("meta"),this.h()},l(l){a=x(l,"META",{property:!0,content:!0}),o=u(l),t=x(l,"META",{name:!0,content:!0}),this.h()},h(){var l,i;M(a,"property","og:image"),M(a,"content",Tt((l=G.og)==null?void 0:l.image)),M(t,"name","twitter:image"),M(t,"content",Tt((i=G.og)==null?void 0:i.image))},m(l,i){s(l,a,i),s(l,o,i),s(l,t,i)},p:me,d(l){l&&(r(a),r(o),r(t))}}}function fa(_){let a,o="How to read this:",t,l,i="OA = 1.0",f,p,S="above 1.0",H,k,I="below 1.0",F,R,N="Density",T,C,E='"Stock vs. development"',W,P,z='"Change since previous year"',q,V,j="two-colour (diverging) legend",K;return{c(){a=D("b"),a.textContent=o,t=c(),l=D("b"),l.textContent=i,f=ie(` means an area has exactly the citywide-average share of
  a POI domain; `),p=D("b"),p.textContent=S,H=ie(` means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), `),k=D("b"),k.textContent=I,F=ie(` means under-represented.
  `),R=D("b"),R.textContent=N,T=ie(" is simply mapped-place count per km². Switch "),C=D("b"),C.textContent=E,W=ie(` to
  `),P=D("b"),P.textContent=z,q=ie(` to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. Offering Advantage
  and any "Change since previous year" view use a `),V=D("b"),V.textContent=j,K=ie(` centred on
  that neutral point (1.0 for Offering Advantage, 0 for a year-over-year change) -- one hue means
  above it, the other means below; plain POI-density "stock" values use a single-colour scale
  instead, since there's no natural centre to diverge around. This map covers Berlin only for now;
  Hamburg's underlying gentrification index isn't signed off yet
  ([#125](https://github.com/dhelweg/gentriduck/issues/125)).`)},l(w){a=x(w,"B",{"data-svelte-h":!0}),Q(a)!=="svelte-1d2ahpj"&&(a.textContent=o),t=u(w),l=x(w,"B",{"data-svelte-h":!0}),Q(l)!=="svelte-17c8v7u"&&(l.textContent=i),f=ne(w,` means an area has exactly the citywide-average share of
  a POI domain; `),p=x(w,"B",{"data-svelte-h":!0}),Q(p)!=="svelte-11ia4c8"&&(p.textContent=S),H=ne(w,` means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), `),k=x(w,"B",{"data-svelte-h":!0}),Q(k)!=="svelte-1m0m3gk"&&(k.textContent=I),F=ne(w,` means under-represented.
  `),R=x(w,"B",{"data-svelte-h":!0}),Q(R)!=="svelte-uzvr2g"&&(R.textContent=N),T=ne(w," is simply mapped-place count per km². Switch "),C=x(w,"B",{"data-svelte-h":!0}),Q(C)!=="svelte-17y0108"&&(C.textContent=E),W=ne(w,` to
  `),P=x(w,"B",{"data-svelte-h":!0}),Q(P)!=="svelte-t4tx04"&&(P.textContent=z),q=ne(w,` to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. Offering Advantage
  and any "Change since previous year" view use a `),V=x(w,"B",{"data-svelte-h":!0}),Q(V)!=="svelte-qnoy8c"&&(V.textContent=j),K=ne(w,` centred on
  that neutral point (1.0 for Offering Advantage, 0 for a year-over-year change) -- one hue means
  above it, the other means below; plain POI-density "stock" values use a single-colour scale
  instead, since there's no natural centre to diverge around. This map covers Berlin only for now;
  Hamburg's underlying gentrification index isn't signed off yet
  ([#125](https://github.com/dhelweg/gentriduck/issues/125)).`)},m(w,O){s(w,a,O),s(w,t,O),s(w,l,O),s(w,f,O),s(w,p,O),s(w,H,O),s(w,k,O),s(w,F,O),s(w,R,O),s(w,T,O),s(w,C,O),s(w,W,O),s(w,P,O),s(w,q,O),s(w,V,O),s(w,K,O)},p:me,d(w){w&&(r(a),r(t),r(l),r(f),r(p),r(H),r(k),r(F),r(R),r(T),r(C),r(W),r(P),r(q),r(V),r(K))}}}function ua(_){let a,o="Thinly-mapped PLRs are left blank.",t,l,i=`A blank
  cell means only "too thinly observed to compute a stable ratio" -- never "commercially dead."`,f,p,S=`A
  bandwidth sweep found the Gaussian-weighted Offering Advantage construct bandwidth-sensitive at
  wide catchments`,H,k,I=`The map above does not use
  that weighted construct`,F,R,N="methodology page §7",T;return{c(){a=D("b"),a.textContent=o,t=ie(` Offering Advantage is a compositional ratio (a location
  quotient) -- in a PLR-year with very few mapped places overall, a single new or removed business
  can swing its Offering Advantage value disproportionately. PLR-years with fewer than 10 total
  mapped places (across every domain) are shown as an unshaded gap on the map rather than a
  potentially misleading Offering Advantage value; the raw mapped-place count for the selected
  domain is always visible in the tooltip so you can judge borderline cases yourself. `),l=D("b"),l.textContent=i,f=ie(`
  OSM's mapping coverage is not spatially neutral: besides the early-year effect on the citywide
  chart below, completeness also varies *within* a given year and tends to correlate with area
  advantage -- poorer/peripheral areas are typically less thoroughly mapped than richer/central ones
  (Haklay, M. 2010, "How Good is Volunteered Geographical Information?", *Environment and Planning
  B*). So a low mapped-place count -- and the blank cell it produces -- can reflect an OSM coverage
  gap rather than a real absence of commercial activity; please don't read a blank PLR as evidence
  that nothing is happening there. `),p=D("b"),p.textContent=S,H=ie(`: it is stable close to its 1000 m headline catchment (500m vs 1000m and 1000m
  vs 1500m both rank-correlate above 0.7 across every year 2008-2026), but re-ranks meaningfully
  across the full 500 m to 1500 m sweep (pooled Spearman r = 0.68). `),k=D("b"),k.textContent=I,F=ie(` -- it uses the hard point-in-polygon variant, which has no bandwidth
  parameter and is therefore bandwidth-invariant by construction -- meaning only that it makes no
  bandwidth choice, not that it has been tested and found spatially robust: it remains untested for
  this exact fragility and sits at the sharp/narrow end of the same spatial-grain family swept above
  (the 500 m end was the more volatile side of the fragile pair); the sweep is disclosed here as
  relevant context for a separate, still-open question
  ([#174](https://github.com/dhelweg/gentriduck/issues/174)) about whether the published headline
  should switch to the bandwidth-weighted construct, not as a characterization of the numbers shown
  above. See the `),R=D("a"),R.textContent=N,T=ie(` and
  [the bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail.`),this.h()},l(C){a=x(C,"B",{"data-svelte-h":!0}),Q(a)!=="svelte-5taehe"&&(a.textContent=o),t=ne(C,` Offering Advantage is a compositional ratio (a location
  quotient) -- in a PLR-year with very few mapped places overall, a single new or removed business
  can swing its Offering Advantage value disproportionately. PLR-years with fewer than 10 total
  mapped places (across every domain) are shown as an unshaded gap on the map rather than a
  potentially misleading Offering Advantage value; the raw mapped-place count for the selected
  domain is always visible in the tooltip so you can judge borderline cases yourself. `),l=x(C,"B",{"data-svelte-h":!0}),Q(l)!=="svelte-oa5bnp"&&(l.textContent=i),f=ne(C,`
  OSM's mapping coverage is not spatially neutral: besides the early-year effect on the citywide
  chart below, completeness also varies *within* a given year and tends to correlate with area
  advantage -- poorer/peripheral areas are typically less thoroughly mapped than richer/central ones
  (Haklay, M. 2010, "How Good is Volunteered Geographical Information?", *Environment and Planning
  B*). So a low mapped-place count -- and the blank cell it produces -- can reflect an OSM coverage
  gap rather than a real absence of commercial activity; please don't read a blank PLR as evidence
  that nothing is happening there. `),p=x(C,"B",{"data-svelte-h":!0}),Q(p)!=="svelte-7jvz40"&&(p.textContent=S),H=ne(C,`: it is stable close to its 1000 m headline catchment (500m vs 1000m and 1000m
  vs 1500m both rank-correlate above 0.7 across every year 2008-2026), but re-ranks meaningfully
  across the full 500 m to 1500 m sweep (pooled Spearman r = 0.68). `),k=x(C,"B",{"data-svelte-h":!0}),Q(k)!=="svelte-1hpn7q2"&&(k.textContent=I),F=ne(C,` -- it uses the hard point-in-polygon variant, which has no bandwidth
  parameter and is therefore bandwidth-invariant by construction -- meaning only that it makes no
  bandwidth choice, not that it has been tested and found spatially robust: it remains untested for
  this exact fragility and sits at the sharp/narrow end of the same spatial-grain family swept above
  (the 500 m end was the more volatile side of the fragile pair); the sweep is disclosed here as
  relevant context for a separate, still-open question
  ([#174](https://github.com/dhelweg/gentriduck/issues/174)) about whether the published headline
  should switch to the bandwidth-weighted construct, not as a characterization of the numbers shown
  above. See the `),R=x(C,"A",{href:!0,"data-svelte-h":!0}),Q(R)!=="svelte-db3vh3"&&(R.textContent=N),T=ne(C,` and
  [the bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail.`),this.h()},h(){M(R,"href","/gentriduck/methodology")},m(C,E){s(C,a,E),s(C,t,E),s(C,l,E),s(C,f,E),s(C,p,E),s(C,H,E),s(C,k,E),s(C,F,E),s(C,R,E),s(C,T,E)},p:me,d(C){C&&(r(a),r(t),r(l),r(f),r(p),r(H),r(k),r(F),r(R),r(T))}}}function ca(_){let a,o,t,l;return a=new B({props:{value:"density",valueLabel:"POI density (mapped places per km²)"}}),t=new B({props:{value:"oa",valueLabel:"Offering Advantage (location quotient vs. citywide)"}}),{c(){$(a.$$.fragment),o=c(),$(t.$$.fragment)},l(i){b(a.$$.fragment,i),o=u(i),b(t.$$.fragment,i)},m(i,f){y(a,i,f),s(i,o,f),y(t,i,f),l=!0},p:me,i(i){l||(h(a.$$.fragment,i),h(t.$$.fragment,i),l=!0)},o(i){g(a.$$.fragment,i),g(t.$$.fragment,i),l=!1},d(i){i&&r(o),v(a,i),v(t,i)}}}function ha(_){let a,o,t,l,i,f,p,S,H,k,I,F,R,N,T,C,E,W,P,z,q,V,j,K,w,O;return a=new B({props:{value:"Entertainment",valueLabel:"Entertainment"}}),t=new B({props:{value:"Gastronomy",valueLabel:"Gastronomy"}}),i=new B({props:{value:"Mobility",valueLabel:"Mobility"}}),p=new B({props:{value:"Office",valueLabel:"Office"}}),H=new B({props:{value:"Other",valueLabel:"Other"}}),I=new B({props:{value:"Public Service",valueLabel:"Public Service"}}),R=new B({props:{value:"Public Space",valueLabel:"Public Space"}}),T=new B({props:{value:"Religion",valueLabel:"Religion"}}),E=new B({props:{value:"Retail",valueLabel:"Retail"}}),P=new B({props:{value:"Services",valueLabel:"Services"}}),q=new B({props:{value:"Sports and Recreation",valueLabel:"Sports and Recreation"}}),j=new B({props:{value:"Tourism",valueLabel:"Tourism"}}),w=new B({props:{value:"Vacancy",valueLabel:"Vacancy"}}),{c(){$(a.$$.fragment),o=c(),$(t.$$.fragment),l=c(),$(i.$$.fragment),f=c(),$(p.$$.fragment),S=c(),$(H.$$.fragment),k=c(),$(I.$$.fragment),F=c(),$(R.$$.fragment),N=c(),$(T.$$.fragment),C=c(),$(E.$$.fragment),W=c(),$(P.$$.fragment),z=c(),$(q.$$.fragment),V=c(),$(j.$$.fragment),K=c(),$(w.$$.fragment)},l(m){b(a.$$.fragment,m),o=u(m),b(t.$$.fragment,m),l=u(m),b(i.$$.fragment,m),f=u(m),b(p.$$.fragment,m),S=u(m),b(H.$$.fragment,m),k=u(m),b(I.$$.fragment,m),F=u(m),b(R.$$.fragment,m),N=u(m),b(T.$$.fragment,m),C=u(m),b(E.$$.fragment,m),W=u(m),b(P.$$.fragment,m),z=u(m),b(q.$$.fragment,m),V=u(m),b(j.$$.fragment,m),K=u(m),b(w.$$.fragment,m)},m(m,L){y(a,m,L),s(m,o,L),y(t,m,L),s(m,l,L),y(i,m,L),s(m,f,L),y(p,m,L),s(m,S,L),y(H,m,L),s(m,k,L),y(I,m,L),s(m,F,L),y(R,m,L),s(m,N,L),y(T,m,L),s(m,C,L),y(E,m,L),s(m,W,L),y(P,m,L),s(m,z,L),y(q,m,L),s(m,V,L),y(j,m,L),s(m,K,L),y(w,m,L),O=!0},p:me,i(m){O||(h(a.$$.fragment,m),h(t.$$.fragment,m),h(i.$$.fragment,m),h(p.$$.fragment,m),h(H.$$.fragment,m),h(I.$$.fragment,m),h(R.$$.fragment,m),h(T.$$.fragment,m),h(E.$$.fragment,m),h(P.$$.fragment,m),h(q.$$.fragment,m),h(j.$$.fragment,m),h(w.$$.fragment,m),O=!0)},o(m){g(a.$$.fragment,m),g(t.$$.fragment,m),g(i.$$.fragment,m),g(p.$$.fragment,m),g(H.$$.fragment,m),g(I.$$.fragment,m),g(R.$$.fragment,m),g(T.$$.fragment,m),g(E.$$.fragment,m),g(P.$$.fragment,m),g(q.$$.fragment,m),g(j.$$.fragment,m),g(w.$$.fragment,m),O=!1},d(m){m&&(r(o),r(l),r(f),r(S),r(k),r(F),r(N),r(C),r(W),r(z),r(V),r(K)),v(a,m),v(t,m),v(i,m),v(p,m),v(H,m),v(I,m),v(R,m),v(T,m),v(E,m),v(P,m),v(q,m),v(j,m),v(w,m)}}}function ga(_){let a,o,t,l,i,f,p,S,H,k,I,F,R,N,T,C,E,W,P,z,q,V,j,K,w,O,m,L,pe,_e,X,re,Y,ce,de,se,oe,le;return a=new B({props:{value:"2008",valueLabel:"2008"}}),t=new B({props:{value:"2009",valueLabel:"2009"}}),i=new B({props:{value:"2010",valueLabel:"2010"}}),p=new B({props:{value:"2011",valueLabel:"2011"}}),H=new B({props:{value:"2012",valueLabel:"2012"}}),I=new B({props:{value:"2013",valueLabel:"2013"}}),R=new B({props:{value:"2014",valueLabel:"2014"}}),T=new B({props:{value:"2015",valueLabel:"2015"}}),E=new B({props:{value:"2016",valueLabel:"2016"}}),P=new B({props:{value:"2017",valueLabel:"2017"}}),q=new B({props:{value:"2018",valueLabel:"2018"}}),j=new B({props:{value:"2019",valueLabel:"2019"}}),w=new B({props:{value:"2020",valueLabel:"2020"}}),m=new B({props:{value:"2021",valueLabel:"2021"}}),pe=new B({props:{value:"2022",valueLabel:"2022"}}),X=new B({props:{value:"2023",valueLabel:"2023"}}),Y=new B({props:{value:"2024",valueLabel:"2024"}}),de=new B({props:{value:"2025",valueLabel:"2025"}}),oe=new B({props:{value:"2026",valueLabel:"2026"}}),{c(){$(a.$$.fragment),o=c(),$(t.$$.fragment),l=c(),$(i.$$.fragment),f=c(),$(p.$$.fragment),S=c(),$(H.$$.fragment),k=c(),$(I.$$.fragment),F=c(),$(R.$$.fragment),N=c(),$(T.$$.fragment),C=c(),$(E.$$.fragment),W=c(),$(P.$$.fragment),z=c(),$(q.$$.fragment),V=c(),$(j.$$.fragment),K=c(),$(w.$$.fragment),O=c(),$(m.$$.fragment),L=c(),$(pe.$$.fragment),_e=c(),$(X.$$.fragment),re=c(),$(Y.$$.fragment),ce=c(),$(de.$$.fragment),se=c(),$(oe.$$.fragment)},l(n){b(a.$$.fragment,n),o=u(n),b(t.$$.fragment,n),l=u(n),b(i.$$.fragment,n),f=u(n),b(p.$$.fragment,n),S=u(n),b(H.$$.fragment,n),k=u(n),b(I.$$.fragment,n),F=u(n),b(R.$$.fragment,n),N=u(n),b(T.$$.fragment,n),C=u(n),b(E.$$.fragment,n),W=u(n),b(P.$$.fragment,n),z=u(n),b(q.$$.fragment,n),V=u(n),b(j.$$.fragment,n),K=u(n),b(w.$$.fragment,n),O=u(n),b(m.$$.fragment,n),L=u(n),b(pe.$$.fragment,n),_e=u(n),b(X.$$.fragment,n),re=u(n),b(Y.$$.fragment,n),ce=u(n),b(de.$$.fragment,n),se=u(n),b(oe.$$.fragment,n)},m(n,A){y(a,n,A),s(n,o,A),y(t,n,A),s(n,l,A),y(i,n,A),s(n,f,A),y(p,n,A),s(n,S,A),y(H,n,A),s(n,k,A),y(I,n,A),s(n,F,A),y(R,n,A),s(n,N,A),y(T,n,A),s(n,C,A),y(E,n,A),s(n,W,A),y(P,n,A),s(n,z,A),y(q,n,A),s(n,V,A),y(j,n,A),s(n,K,A),y(w,n,A),s(n,O,A),y(m,n,A),s(n,L,A),y(pe,n,A),s(n,_e,A),y(X,n,A),s(n,re,A),y(Y,n,A),s(n,ce,A),y(de,n,A),s(n,se,A),y(oe,n,A),le=!0},p:me,i(n){le||(h(a.$$.fragment,n),h(t.$$.fragment,n),h(i.$$.fragment,n),h(p.$$.fragment,n),h(H.$$.fragment,n),h(I.$$.fragment,n),h(R.$$.fragment,n),h(T.$$.fragment,n),h(E.$$.fragment,n),h(P.$$.fragment,n),h(q.$$.fragment,n),h(j.$$.fragment,n),h(w.$$.fragment,n),h(m.$$.fragment,n),h(pe.$$.fragment,n),h(X.$$.fragment,n),h(Y.$$.fragment,n),h(de.$$.fragment,n),h(oe.$$.fragment,n),le=!0)},o(n){g(a.$$.fragment,n),g(t.$$.fragment,n),g(i.$$.fragment,n),g(p.$$.fragment,n),g(H.$$.fragment,n),g(I.$$.fragment,n),g(R.$$.fragment,n),g(T.$$.fragment,n),g(E.$$.fragment,n),g(P.$$.fragment,n),g(q.$$.fragment,n),g(j.$$.fragment,n),g(w.$$.fragment,n),g(m.$$.fragment,n),g(pe.$$.fragment,n),g(X.$$.fragment,n),g(Y.$$.fragment,n),g(de.$$.fragment,n),g(oe.$$.fragment,n),le=!1},d(n){n&&(r(o),r(l),r(f),r(S),r(k),r(F),r(N),r(C),r(W),r(z),r(V),r(K),r(O),r(L),r(_e),r(re),r(ce),r(se)),v(a,n),v(t,n),v(i,n),v(p,n),v(H,n),v(I,n),v(R,n),v(T,n),v(E,n),v(P,n),v(q,n),v(j,n),v(w,n),v(m,n),v(pe,n),v(X,n),v(Y,n),v(de,n),v(oe,n)}}}function wa(_){let a,o,t,l;return a=new Mt({props:{value:"stock",valueLabel:"Stock (this year's value)"}}),t=new Mt({props:{value:"development",valueLabel:"Change since previous year"}}),{c(){$(a.$$.fragment),o=c(),$(t.$$.fragment)},l(i){b(a.$$.fragment,i),o=u(i),b(t.$$.fragment,i)},m(i,f){y(a,i,f),s(i,o,f),y(t,i,f),l=!0},p:me,i(i){l||(h(a.$$.fragment,i),h(t.$$.fragment,i),l=!0)},o(i){g(a.$$.fragment,i),g(t.$$.fragment,i),l=!1},d(i){i&&r(o),v(a,i),v(t,i)}}}function va(_){let a,o='"Change since previous year" for POI density is not adjusted for growing OSM coverage.',t;return{c(){a=D("b"),a.textContent=o,t=ie(`
  Growing OpenStreetMap contributor coverage over time inflates early-year counts on its own,
  independent of real-world change (see the citywide growth chart further down this page for the
  shape of that coverage growth), so an early-year density delta can reflect new OSM contributors
  catching up rather than real commercial change. Offering Advantage's "change" view is less
  exposed to this: it is a same-year ratio to the citywide average, so an area-uniform coverage
  shift cancels out; density's raw count carries no such protection. Read early-year density
  deltas cautiously.`)},l(l){a=x(l,"B",{"data-svelte-h":!0}),Q(a)!=="svelte-b5xv1v"&&(a.textContent=o),t=ne(l,`
  Growing OpenStreetMap contributor coverage over time inflates early-year counts on its own,
  independent of real-world change (see the citywide growth chart further down this page for the
  shape of that coverage growth), so an early-year density delta can reflect new OSM contributors
  catching up rather than real commercial change. Offering Advantage's "change" view is less
  exposed to this: it is a same-year ratio to the citywide average, so an area-uniform coverage
  shift cancels out; density's raw count carries no such protection. Read early-year density
  deltas cautiously.`)},m(l,i){s(l,a,i),s(l,t,i)},p:me,d(l){l&&(r(a),r(t))}}}function St(_){let a,o;return a=new Qe({props:{queryID:"poi_map_data",queryResult:_[2]}}),{c(){$(a.$$.fragment)},l(t){b(a.$$.fragment,t)},m(t,l){y(a,t,l),o=!0},p(t,l){const i={};l[0]&4&&(i.queryResult=t[2]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){g(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function ya(_){let a;return{c(){a=ie(`These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.`)},l(o){a=ne(o,`These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.`)},m(o,t){s(o,a,t)},d(o){o&&r(a)}}}function qt(_){let a,o;return a=new Qe({props:{queryID:"poi_citywide",queryResult:_[3]}}),{c(){$(a.$$.fragment)},l(t){b(a.$$.fragment,t)},m(t,l){y(a,t,l),o=!0},p(t,l){const i={};l[0]&8&&(i.queryResult=t[3]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){g(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function ba(_){let a,o,t="completeness-bias correction write-up",l;return{c(){a=ie(`Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  `),o=D("a"),o.textContent=t,l=ie(`
  for how the index itself corrects for this).`),this.h()},l(i){a=ne(i,`Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  `),o=x(i,"A",{href:!0,"data-svelte-h":!0}),Q(o)!=="svelte-2rwr8v"&&(o.textContent=t),l=ne(i,`
  for how the index itself corrects for this).`),this.h()},h(){M(o,"href","https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md")},m(i,f){s(i,a,f),s(i,o,f),s(i,l,f)},p:me,d(i){i&&(r(a),r(o),r(l))}}}function Ht(_){let a,o;return a=new Qe({props:{queryID:"poi_latest_year",queryResult:_[1]}}),{c(){$(a.$$.fragment)},l(t){b(a.$$.fragment,t)},m(t,l){y(a,t,l),o=!0},p(t,l){const i={};l[0]&2&&(i.queryResult=t[1]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){g(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function Bt(_){let a,o;return a=new Qe({props:{queryID:"poi_mix_latest",queryResult:_[4]}}),{c(){$(a.$$.fragment)},l(t){b(a.$$.fragment,t)},m(t,l){y(a,t,l),o=!0},p(t,l){const i={};l[0]&16&&(i.queryResult=t[4]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){g(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function It(_){let a,o;return a=new Qe({props:{queryID:"price_rent_citywide",queryResult:_[5]}}),{c(){$(a.$$.fragment)},l(t){b(a.$$.fragment,t)},m(t,l){y(a,t,l),o=!0},p(t,l){const i={};l[0]&32&&(i.queryResult=t[5]),a.$set(i)},i(t){o||(h(a.$$.fragment,t),o=!0)},o(t){g(a.$$.fragment,t),o=!1},d(t){v(a,t)}}}function $a(_){let a,o,t="n_areas_with_brw",l;return{c(){a=ie(`These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see `),o=D("code"),o.textContent=t,l=ie(` in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.`)},l(i){a=ne(i,`These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see `),o=x(i,"CODE",{"data-svelte-h":!0}),Q(o)!=="svelte-134q9ci"&&(o.textContent=t),l=ne(i,` in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.`)},m(i,f){s(i,a,f),s(i,o,f),s(i,l,f)},p:me,d(i){i&&(r(a),r(o),r(l))}}}function ka(_){let a,o,t,l,i,f,p,S,H=`This map shows where different kinds of shops, cafés, and other mapped places (&quot;points of
interest,&quot; or POIs) are concentrated across Berlin – either as raw density, or as
<strong class="markdown">Offering Advantage (OA)</strong>: how over- or under-represented a POI domain is in an area compared
to the citywide average for that domain (a location quotient). OA already feeds the governed
gentrification index as one input among several; this page surfaces it directly, then (further
down) zooms out to the same signal added up across the whole city, alongside land value &amp; rent.
See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
and <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md" rel="nofollow" class="markdown">ADR-0018</a>
for the full method, or the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for a plain-language walkthrough.`,k,I,F,R,N,T,C,E,W,P,z,q,V,j,K,w,O,m,L,pe=`Click a Planungsraum on the map to open its exact neighbourhood page, which also shows the
area's full OA-by-domain profile as a radar chart.`,_e,X,re,Y,ce='<a href="#citywide-context-poi-growth-land-value--rent">Citywide context: POI growth, land value &amp; rent</a>',de,se,oe=`Two more contextual signals, added up across the whole city rather than one neighbourhood at a
time: how the mix of mapped shops, cafés, and other amenities has grown, and how land value and
estimated rent have moved. Neither feeds the governed index directly — they&#39;re both context, not
predictors — but they&#39;re the same underlying data as the map above. Looking at the whole city
lets you see the citywide trend without already knowing which neighbourhood to check; for a
single-neighbourhood breakdown, see the <a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a>.`,le,n,A,fe,De='<a href="#shops-cafés--amenities-citywide">Shops, cafés &amp; amenities, citywide</a>',Se,U,he,Ve,Re,ze,we,mt='<a href="#what-kinds-of-places-make-up-that-total-latest-year">What kinds of places make up that total? (latest year)</a>',We,qe,He,Le,Ke,ve,pt='<a href="#land-value--estimated-rent-citywide">Land value &amp; estimated rent, citywide</a>',Ye,Be,Ae,Xe,Oe,Je,Ee,Ze,ye,_t='<a href="#honest-caveats">Honest caveats</a>',et,Te,ft=`<li class="markdown"><strong class="markdown">OSM early-year completeness bias.</strong> The citywide POI-growth chart&#39;s early years should be read
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
detail.</li>`,tt,be,ut='<a href="#further-reading">Further reading</a>',at,Pe,ct=`See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
for how Offering Advantage is computed, the
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md" rel="nofollow" class="markdown">bandwidth-sweep findings</a>
for the C-4 discharge detail, the <a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a> for a
single-neighbourhood breakdown of these same signals alongside the governed index, the
<a href="/gentriduck/berlin/maps" class="markdown">gentrification-pressure map</a> for the governed index itself, or
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage — modes, scales &amp; dominance</a> for the other eight
calculation methods, the area-hierarchy scale switch, and the within-group dominance construct
this map does not yet surface (this map shows only the canonical nested-LQ method at PLR grain).`,nt,Fe,it,xe,ot,$e=typeof G<"u"&&G.title&&G.hide_title!==!0&&sa();function Ft(e,d){return typeof G<"u"&&G.title?da:la}let je=Ft()(_),ke=typeof G=="object"&&ma();f=new Xt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"POI & Offering Advantage map",lede:"Where shops, cafés, and other mapped places are concentrated across Berlin, and how that commercial mix has grown over time — the commercial half of the double invasion-succession model this project's index is built on."}}),I=new Ie({props:{status:"info",$$slots:{default:[fa]},$$scope:{ctx:_}}}),R=new Ie({props:{status:"warning",$$slots:{default:[ua]},$$scope:{ctx:_}}}),T=new dt({props:{name:"metric",title:"Metric",defaultValue:"density",$$slots:{default:[ca]},$$scope:{ctx:_}}}),E=new dt({props:{name:"domain",title:"POI domain",defaultValue:"Retail",$$slots:{default:[ha]},$$scope:{ctx:_}}}),P=new dt({props:{name:"year",title:"Year",defaultValue:"2025",$$slots:{default:[ga]},$$scope:{ctx:_}}}),q=new na({props:{name:"view",title:"Stock vs. development",display:"tabs",defaultValue:"stock",$$slots:{default:[wa]},$$scope:{ctx:_}}}),j=new Ie({props:{status:"warning",$$slots:{default:[va]},$$scope:{ctx:_}}});let J=_[2]&&St(_);O=new oa({props:{data:_[2],geoJsonUrl:`${Ce}/geo/plr_live_data.geojson`,geoId:"area_code",areaCol:"area_code",value:_[0].metric.value==="density"?_[0].view==="stock"?"poi_density_per_km2":"density_delta":_[0].view==="stock"?"oa_domain":"oa_delta",legendType:"scalar",colorPalette:_[0].metric.value==="density"&&_[0].view==="stock"?void 0:_[7],min:_[0].metric.value==="oa"?_[0].view==="stock"?ue(_[2],"oa_domain",1)[0]:ue(_[2],"oa_delta",0)[0]:_[0].view==="development"?ue(_[2],"density_delta",0)[0]:void 0,max:_[0].metric.value==="oa"?_[0].view==="stock"?ue(_[2],"oa_domain",1)[1]:ue(_[2],"oa_delta",0)[1]:_[0].view==="development"?ue(_[2],"density_delta",0)[1]:void 0,title:"Berlin Planungsraum (PLR) — "+(_[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+_[0].domain.value+", "+_[0].year.value+(_[0].view==="development"?" (change vs. previous year)":""),startingLat:52.52,startingLong:13.405,startingZoom:9,link:"link",tooltip:_[6],emptySet:"warn",emptyMessage:"No data for this domain/year combination."}}),n=new Ie({props:{status:"info",$$slots:{default:[ya]},$$scope:{ctx:_}}});let Z=_[3]&&qt(_);he=new Ie({props:{status:"info",$$slots:{default:[ba]},$$scope:{ctx:_}}}),Re=new Dt({props:{data:_[3],x:"snapshot_year",y:"poi_count",title:"Total mapped shops, cafés & amenities, city of Berlin",yAxisTitle:"Number of mapped places"}});let ee=_[1]&&Ht(_),te=_[4]&&Bt(_);Le=new xt({props:{data:_[4],x:"poi_category_h",y:"poi_count",title:"Top 15 categories of mapped places, "+_[1][0].year,yAxisTitle:"Number of mapped places",swapXY:"true"}});let ae=_[5]&&It(_);return Ae=new Ie({props:{status:"info",$$slots:{default:[$a]},$$scope:{ctx:_}}}),Oe=new Dt({props:{data:_[5],x:"snapshot_year",y:["avg_est_rent_low","avg_est_rent_mid","avg_est_rent_high"],title:"Citywide estimated rent range (EUR/m²), by year",yAxisTitle:"EUR/m²"}}),Ee=new xt({props:{data:_[5],x:"snapshot_year",y:"avg_brw_eur_m2",title:"Citywide average land value (Bodenrichtwert), residential zones (EUR/m²)",yAxisTitle:"EUR/m²",emptySet:"warn",emptyMessage:"No residential land-value zones matched for any year."}}),xe=new Yt({}),{c(){$e&&$e.c(),a=c(),je.c(),o=D("meta"),t=D("meta"),ke&&ke.c(),l=st(),i=c(),$(f.$$.fragment),p=c(),S=D("p"),S.innerHTML=H,k=c(),$(I.$$.fragment),F=c(),$(R.$$.fragment),N=c(),$(T.$$.fragment),C=c(),$(E.$$.fragment),W=c(),$(P.$$.fragment),z=c(),$(q.$$.fragment),V=c(),$(j.$$.fragment),K=c(),J&&J.c(),w=c(),$(O.$$.fragment),m=c(),L=D("p"),L.textContent=pe,_e=c(),X=D("hr"),re=c(),Y=D("h2"),Y.innerHTML=ce,de=c(),se=D("p"),se.innerHTML=oe,le=c(),$(n.$$.fragment),A=c(),fe=D("h3"),fe.innerHTML=De,Se=c(),Z&&Z.c(),U=c(),$(he.$$.fragment),Ve=c(),$(Re.$$.fragment),ze=c(),we=D("h4"),we.innerHTML=mt,We=c(),ee&&ee.c(),qe=c(),te&&te.c(),He=c(),$(Le.$$.fragment),Ke=c(),ve=D("h3"),ve.innerHTML=pt,Ye=c(),ae&&ae.c(),Be=c(),$(Ae.$$.fragment),Xe=c(),$(Oe.$$.fragment),Je=c(),$(Ee.$$.fragment),Ze=c(),ye=D("h2"),ye.innerHTML=_t,et=c(),Te=D("ul"),Te.innerHTML=ft,tt=c(),be=D("h2"),be.innerHTML=ut,at=c(),Pe=D("p"),Pe.innerHTML=ct,nt=c(),Fe=D("hr"),it=c(),$(xe.$$.fragment),this.h()},l(e){$e&&$e.l(e),a=u(e);const d=Gt("svelte-2igo1p",document.head);je.l(d),o=x(d,"META",{name:!0,content:!0}),t=x(d,"META",{name:!0,content:!0}),ke&&ke.l(d),l=st(),d.forEach(r),i=u(e),b(f.$$.fragment,e),p=u(e),S=x(e,"P",{class:!0,"data-svelte-h":!0}),Q(S)!=="svelte-rlyga1"&&(S.innerHTML=H),k=u(e),b(I.$$.fragment,e),F=u(e),b(R.$$.fragment,e),N=u(e),b(T.$$.fragment,e),C=u(e),b(E.$$.fragment,e),W=u(e),b(P.$$.fragment,e),z=u(e),b(q.$$.fragment,e),V=u(e),b(j.$$.fragment,e),K=u(e),J&&J.l(e),w=u(e),b(O.$$.fragment,e),m=u(e),L=x(e,"P",{class:!0,"data-svelte-h":!0}),Q(L)!=="svelte-1gvsp54"&&(L.textContent=pe),_e=u(e),X=x(e,"HR",{class:!0}),re=u(e),Y=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(Y)!=="svelte-1o83ktl"&&(Y.innerHTML=ce),de=u(e),se=x(e,"P",{class:!0,"data-svelte-h":!0}),Q(se)!=="svelte-wcr46p"&&(se.innerHTML=oe),le=u(e),b(n.$$.fragment,e),A=u(e),fe=x(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),Q(fe)!=="svelte-1pe5ai8"&&(fe.innerHTML=De),Se=u(e),Z&&Z.l(e),U=u(e),b(he.$$.fragment,e),Ve=u(e),b(Re.$$.fragment,e),ze=u(e),we=x(e,"H4",{class:!0,id:!0,"data-svelte-h":!0}),Q(we)!=="svelte-1mnfgmg"&&(we.innerHTML=mt),We=u(e),ee&&ee.l(e),qe=u(e),te&&te.l(e),He=u(e),b(Le.$$.fragment,e),Ke=u(e),ve=x(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),Q(ve)!=="svelte-9thoit"&&(ve.innerHTML=pt),Ye=u(e),ae&&ae.l(e),Be=u(e),b(Ae.$$.fragment,e),Xe=u(e),b(Oe.$$.fragment,e),Je=u(e),b(Ee.$$.fragment,e),Ze=u(e),ye=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(ye)!=="svelte-ad0syq"&&(ye.innerHTML=_t),et=u(e),Te=x(e,"UL",{class:!0,"data-svelte-h":!0}),Q(Te)!=="svelte-1mdj6eh"&&(Te.innerHTML=ft),tt=u(e),be=x(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),Q(be)!=="svelte-oimjns"&&(be.innerHTML=ut),at=u(e),Pe=x(e,"P",{class:!0,"data-svelte-h":!0}),Q(Pe)!=="svelte-1ok57l7"&&(Pe.innerHTML=ct),nt=u(e),Fe=x(e,"HR",{class:!0}),it=u(e),b(xe.$$.fragment,e),this.h()},h(){M(o,"name","twitter:card"),M(o,"content","summary_large_image"),M(t,"name","twitter:site"),M(t,"content","@evidence_dev"),M(S,"class","markdown"),M(L,"class","markdown"),M(X,"class","markdown"),M(Y,"class","markdown"),M(Y,"id","citywide-context-poi-growth-land-value--rent"),M(se,"class","markdown"),M(fe,"class","markdown"),M(fe,"id","shops-cafés--amenities-citywide"),M(we,"class","markdown"),M(we,"id","what-kinds-of-places-make-up-that-total-latest-year"),M(ve,"class","markdown"),M(ve,"id","land-value--estimated-rent-citywide"),M(ye,"class","markdown"),M(ye,"id","honest-caveats"),M(Te,"class","markdown"),M(be,"class","markdown"),M(be,"id","further-reading"),M(Pe,"class","markdown"),M(Fe,"class","markdown")},m(e,d){$e&&$e.m(e,d),s(e,a,d),je.m(document.head,null),rt(document.head,o),rt(document.head,t),ke&&ke.m(document.head,null),rt(document.head,l),s(e,i,d),y(f,e,d),s(e,p,d),s(e,S,d),s(e,k,d),y(I,e,d),s(e,F,d),y(R,e,d),s(e,N,d),y(T,e,d),s(e,C,d),y(E,e,d),s(e,W,d),y(P,e,d),s(e,z,d),y(q,e,d),s(e,V,d),y(j,e,d),s(e,K,d),J&&J.m(e,d),s(e,w,d),y(O,e,d),s(e,m,d),s(e,L,d),s(e,_e,d),s(e,X,d),s(e,re,d),s(e,Y,d),s(e,de,d),s(e,se,d),s(e,le,d),y(n,e,d),s(e,A,d),s(e,fe,d),s(e,Se,d),Z&&Z.m(e,d),s(e,U,d),y(he,e,d),s(e,Ve,d),y(Re,e,d),s(e,ze,d),s(e,we,d),s(e,We,d),ee&&ee.m(e,d),s(e,qe,d),te&&te.m(e,d),s(e,He,d),y(Le,e,d),s(e,Ke,d),s(e,ve,d),s(e,Ye,d),ae&&ae.m(e,d),s(e,Be,d),y(Ae,e,d),s(e,Xe,d),y(Oe,e,d),s(e,Je,d),y(Ee,e,d),s(e,Ze,d),s(e,ye,d),s(e,et,d),s(e,Te,d),s(e,tt,d),s(e,be,d),s(e,at,d),s(e,Pe,d),s(e,nt,d),s(e,Fe,d),s(e,it,d),y(xe,e,d),ot=!0},p(e,d){typeof G<"u"&&G.title&&G.hide_title!==!0&&$e.p(e,d),je.p(e,d),typeof G=="object"&&ke.p(e,d);const ht={};d[1]&8192&&(ht.$$scope={dirty:d,ctx:e}),I.$set(ht);const gt={};d[1]&8192&&(gt.$$scope={dirty:d,ctx:e}),R.$set(gt);const wt={};d[1]&8192&&(wt.$$scope={dirty:d,ctx:e}),T.$set(wt);const vt={};d[1]&8192&&(vt.$$scope={dirty:d,ctx:e}),E.$set(vt);const yt={};d[1]&8192&&(yt.$$scope={dirty:d,ctx:e}),P.$set(yt);const bt={};d[1]&8192&&(bt.$$scope={dirty:d,ctx:e}),q.$set(bt);const $t={};d[1]&8192&&($t.$$scope={dirty:d,ctx:e}),j.$set($t),e[2]?J?(J.p(e,d),d[0]&4&&h(J,1)):(J=St(e),J.c(),h(J,1),J.m(w.parentNode,w)):J&&(Ne(),g(J,1,1,()=>{J=null}),Ge());const Me={};d[0]&4&&(Me.data=e[2]),d[0]&1&&(Me.value=e[0].metric.value==="density"?e[0].view==="stock"?"poi_density_per_km2":"density_delta":e[0].view==="stock"?"oa_domain":"oa_delta"),d[0]&1&&(Me.colorPalette=e[0].metric.value==="density"&&e[0].view==="stock"?void 0:e[7]),d[0]&5&&(Me.min=e[0].metric.value==="oa"?e[0].view==="stock"?ue(e[2],"oa_domain",1)[0]:ue(e[2],"oa_delta",0)[0]:e[0].view==="development"?ue(e[2],"density_delta",0)[0]:void 0),d[0]&5&&(Me.max=e[0].metric.value==="oa"?e[0].view==="stock"?ue(e[2],"oa_domain",1)[1]:ue(e[2],"oa_delta",0)[1]:e[0].view==="development"?ue(e[2],"density_delta",0)[1]:void 0),d[0]&1&&(Me.title="Berlin Planungsraum (PLR) — "+(e[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+e[0].domain.value+", "+e[0].year.value+(e[0].view==="development"?" (change vs. previous year)":"")),d[0]&64&&(Me.tooltip=e[6]),O.$set(Me);const kt={};d[1]&8192&&(kt.$$scope={dirty:d,ctx:e}),n.$set(kt),e[3]?Z?(Z.p(e,d),d[0]&8&&h(Z,1)):(Z=qt(e),Z.c(),h(Z,1),Z.m(U.parentNode,U)):Z&&(Ne(),g(Z,1,1,()=>{Z=null}),Ge());const Ct={};d[1]&8192&&(Ct.$$scope={dirty:d,ctx:e}),he.$set(Ct);const Rt={};d[0]&8&&(Rt.data=e[3]),Re.$set(Rt),e[1]?ee?(ee.p(e,d),d[0]&2&&h(ee,1)):(ee=Ht(e),ee.c(),h(ee,1),ee.m(qe.parentNode,qe)):ee&&(Ne(),g(ee,1,1,()=>{ee=null}),Ge()),e[4]?te?(te.p(e,d),d[0]&16&&h(te,1)):(te=Bt(e),te.c(),h(te,1),te.m(He.parentNode,He)):te&&(Ne(),g(te,1,1,()=>{te=null}),Ge());const lt={};d[0]&16&&(lt.data=e[4]),d[0]&2&&(lt.title="Top 15 categories of mapped places, "+e[1][0].year),Le.$set(lt),e[5]?ae?(ae.p(e,d),d[0]&32&&h(ae,1)):(ae=It(e),ae.c(),h(ae,1),ae.m(Be.parentNode,Be)):ae&&(Ne(),g(ae,1,1,()=>{ae=null}),Ge());const Lt={};d[1]&8192&&(Lt.$$scope={dirty:d,ctx:e}),Ae.$set(Lt);const At={};d[0]&32&&(At.data=e[5]),Oe.$set(At);const Ot={};d[0]&32&&(Ot.data=e[5]),Ee.$set(Ot)},i(e){ot||(h(f.$$.fragment,e),h(I.$$.fragment,e),h(R.$$.fragment,e),h(T.$$.fragment,e),h(E.$$.fragment,e),h(P.$$.fragment,e),h(q.$$.fragment,e),h(j.$$.fragment,e),h(J),h(O.$$.fragment,e),h(n.$$.fragment,e),h(Z),h(he.$$.fragment,e),h(Re.$$.fragment,e),h(ee),h(te),h(Le.$$.fragment,e),h(ae),h(Ae.$$.fragment,e),h(Oe.$$.fragment,e),h(Ee.$$.fragment,e),h(xe.$$.fragment,e),ot=!0)},o(e){g(f.$$.fragment,e),g(I.$$.fragment,e),g(R.$$.fragment,e),g(T.$$.fragment,e),g(E.$$.fragment,e),g(P.$$.fragment,e),g(q.$$.fragment,e),g(j.$$.fragment,e),g(J),g(O.$$.fragment,e),g(n.$$.fragment,e),g(Z),g(he.$$.fragment,e),g(Re.$$.fragment,e),g(ee),g(te),g(Le.$$.fragment,e),g(ae),g(Ae.$$.fragment,e),g(Oe.$$.fragment,e),g(Ee.$$.fragment,e),g(xe.$$.fragment,e),ot=!1},d(e){e&&(r(a),r(i),r(p),r(S),r(k),r(F),r(N),r(C),r(W),r(z),r(V),r(K),r(w),r(m),r(L),r(_e),r(X),r(re),r(Y),r(de),r(se),r(le),r(A),r(fe),r(Se),r(U),r(Ve),r(ze),r(we),r(We),r(qe),r(He),r(Ke),r(ve),r(Ye),r(Be),r(Xe),r(Je),r(Ze),r(ye),r(et),r(Te),r(tt),r(be),r(at),r(Pe),r(nt),r(Fe),r(it)),$e&&$e.d(e),je.d(e),r(o),r(t),ke&&ke.d(e),r(l),v(f,e),v(I,e),v(R,e),v(T,e),v(E,e),v(P,e),v(q,e),v(j,e),J&&J.d(e),v(O,e),v(n,e),Z&&Z.d(e),v(he,e),v(Re,e),ee&&ee.d(e),te&&te.d(e),v(Le,e),ae&&ae.d(e),v(Ae,e),v(Oe,e),v(Ee,e),v(xe,e)}}}const G={title:"POI & Offering Advantage map"};function ue(_,a,o){const l=_.map(i=>i[a]).filter(i=>i!=null&&!isNaN(i)).reduce((i,f)=>Math.max(i,Math.abs(f-o)),0)||1;return[o-l,o+l]}function Ca(_,a,o){let t,l,i;Et(_,ia,U=>o(30,l=U)),Et(_,Pt,U=>o(35,i=U));let{data:f}=a,{data:p={},customFormattingSettings:S,__db:H,inputs:k}=f;Nt(Pt,i="68035a6698e6e61c5a0a6fe031efcb76",i);let I=Zt(Jt(k));Ut(I.subscribe(U=>o(0,k=U))),Qt(aa,{getCustomFormats:()=>S.customFormats||[]});const F=(U,he)=>ra(H.query,U,{query_name:he});ea(F),l.params,Vt(()=>!0);let R={initialData:void 0,initialError:void 0},N=ge`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
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
            and poi_domain_h = '${k.domain.value}'
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
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): AreaMap's link
    -- column does a raw \`window.location.href = link\` (EvidenceMap.js), unlike Evidence's own
    -- nav/DataTable links, so \`${Ce}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${Ce}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${k.year.value}`,T=`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
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
            and poi_domain_h = '${k.domain.value}'
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
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): AreaMap's link
    -- column does a raw \`window.location.href = link\` (EvidenceMap.js), unlike Evidence's own
    -- nav/DataTable links, so \`${Ce}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${Ce}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${k.year.value}`;p.poi_map_data_data&&(p.poi_map_data_data instanceof Error?R.initialError=p.poi_map_data_data:R.initialData=p.poi_map_data_data,p.poi_map_data_columns&&(R.knownColumns=p.poi_map_data_columns));let C,E=!1;const W=Ue.createReactive({callback:U=>{o(2,C=U)},execFn:F},{id:"poi_map_data",...R});W(T,{noResolve:N,...R}),globalThis[Symbol.for("poi_map_data")]={get value(){return C}};let P={initialData:void 0,initialError:void 0},z=ge`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`,q=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`;p.poi_citywide_data&&(p.poi_citywide_data instanceof Error?P.initialError=p.poi_citywide_data:P.initialData=p.poi_citywide_data,p.poi_citywide_columns&&(P.knownColumns=p.poi_citywide_columns));let V,j=!1;const K=Ue.createReactive({callback:U=>{o(3,V=U)},execFn:F},{id:"poi_citywide",...P});K(q,{noResolve:z,...P}),globalThis[Symbol.for("poi_citywide")]={get value(){return V}};let w={initialData:void 0,initialError:void 0},O=ge`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`,m=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`;p.poi_latest_year_data&&(p.poi_latest_year_data instanceof Error?w.initialError=p.poi_latest_year_data:w.initialData=p.poi_latest_year_data,p.poi_latest_year_columns&&(w.knownColumns=p.poi_latest_year_columns));let L,pe=!1;const _e=Ue.createReactive({callback:U=>{o(1,L=U)},execFn:F},{id:"poi_latest_year",...w});_e(m,{noResolve:O,...w}),globalThis[Symbol.for("poi_latest_year")]={get value(){return L}};let X={initialData:void 0,initialError:void 0},re=ge`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${L[0].year}
group by all
order by poi_count desc
limit 15`,Y=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${L[0].year}
group by all
order by poi_count desc
limit 15`;p.poi_mix_latest_data&&(p.poi_mix_latest_data instanceof Error?X.initialError=p.poi_mix_latest_data:X.initialData=p.poi_mix_latest_data,p.poi_mix_latest_columns&&(X.knownColumns=p.poi_mix_latest_columns));let ce,de=!1;const se=Ue.createReactive({callback:U=>{o(4,ce=U)},execFn:F},{id:"poi_mix_latest",...X});se(Y,{noResolve:re,...X}),globalThis[Symbol.for("poi_mix_latest")]={get value(){return ce}};let oe={initialData:void 0,initialError:void 0},le=ge`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`,n=`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`;p.price_rent_citywide_data&&(p.price_rent_citywide_data instanceof Error?oe.initialError=p.price_rent_citywide_data:oe.initialData=p.price_rent_citywide_data,p.price_rent_citywide_columns&&(oe.knownColumns=p.price_rent_citywide_columns));let A,fe=!1;const De=Ue.createReactive({callback:U=>{o(5,A=U)},execFn:F},{id:"price_rent_citywide",...oe});De(n,{noResolve:le,...oe}),globalThis[Symbol.for("price_rent_citywide")]={get value(){return A}};const Se=["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"];return _.$$set=U=>{"data"in U&&o(8,f=U.data)},_.$$.update=()=>{_.$$.dirty[0]&256&&o(9,{data:p={},customFormattingSettings:S,__db:H}=f,p),_.$$.dirty[0]&512&&ta.set(Object.keys(p).length>0),_.$$.dirty[0]&1073741824&&l.params,_.$$.dirty[0]&1&&o(11,N=ge`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
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
            and poi_domain_h = '${k.domain.value}'
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
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): AreaMap's link
    -- column does a raw \`window.location.href = link\` (EvidenceMap.js), unlike Evidence's own
    -- nav/DataTable links, so \`${Ce}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${Ce}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${k.year.value}`),_.$$.dirty[0]&1&&o(12,T=`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
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
            and poi_domain_h = '${k.domain.value}'
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
    -- basePath-aware click-through (see /berlin/maps' \`<script>\` header comment): AreaMap's link
    -- column does a raw \`window.location.href = link\` (EvidenceMap.js), unlike Evidence's own
    -- nav/DataTable links, so \`${Ce}\` (SvelteKit's deployment.basePath) must be interpolated
    -- into the link literal here, or click-through 404s on the GitHub Pages project site.
    '${Ce}/berlin/area/' || b.area_code as link
from base as b
left join names as n on b.area_code = n.area_code
where b.snapshot_year = ${k.year.value}`),_.$$.dirty[0]&15360&&(N||!E?N||(W(T,{noResolve:N,...R}),o(13,E=!0)):W(T,{noResolve:N})),_.$$.dirty[0]&245760&&(z||!j?z||(K(q,{noResolve:z,...P}),o(17,j=!0)):K(q,{noResolve:z})),_.$$.dirty[0]&3932160&&(O||!pe?O||(_e(m,{noResolve:O,...w}),o(21,pe=!0)):_e(m,{noResolve:O})),_.$$.dirty[0]&2&&o(23,re=ge`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${L[0].year}
group by all
order by poi_count desc
limit 15`),_.$$.dirty[0]&2&&o(24,Y=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${L[0].year}
group by all
order by poi_count desc
limit 15`),_.$$.dirty[0]&62914560&&(re||!de?re||(se(Y,{noResolve:re,...X}),o(25,de=!0)):se(Y,{noResolve:re})),_.$$.dirty[0]&1006632960&&(le||!fe?le||(De(n,{noResolve:le,...oe}),o(29,fe=!0)):De(n,{noResolve:le})),_.$$.dirty[0]&1&&o(6,t=[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:k.metric.value==="density"?k.view==="stock"?"poi_density_per_km2":"density_delta":k.view==="stock"?"oa_domain":"oa_delta",title:(k.metric.value==="density"?"POI density / km²":"Offering Advantage")+(k.view==="development"?" (change vs. previous year)":""),fmt:"num1"},{id:"poi_count",title:"Mapped places (this domain)",fmt:"num0"},{id:"area_code",title:"Area code",valueClass:"text-xs opacity-60",fmt:"id"}])},o(15,z=ge`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`),o(16,q=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`),o(19,O=ge`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`),o(20,m=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`),o(27,le=ge`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`),o(28,n=`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`),[k,L,C,V,ce,A,t,Se,f,p,R,N,T,E,P,z,q,j,w,O,m,pe,X,re,Y,de,oe,le,n,fe,l]}class Na extends Wt{constructor(a){super(),Kt(this,a,Ca,ka,jt,{data:8},null,[-1,-1])}}export{Na as component};
