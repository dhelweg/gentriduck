import{s as Nt,d as o,i as s,a as rt,b as M,c as h,h as Gt,e as E,f as st,k as z,l as c,m as S,n as Pt,o as zt,p as jt,q as Ut,r as Vt,u as me,j as X,t as J,g as Qt}from"../chunks/scheduler.wXRIqz25.js";import{S as Wt,i as Kt,d as b,t as w,a as g,c as ze,m as $,b as k,e as L,g as je}from"../chunks/index.uz5rP6Z2.js";import{F as Yt}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Xt}from"../chunks/Hero.C0o6T8tj.js";import{P as Jt}from"../chunks/PolygonMap.DD1ANdqB.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{b as ke,w as Zt}from"../chunks/entry.DotynpIs.js";import{A as Fe}from"../chunks/Alert.DFISYc09.js";import{e as ea,s as ta,Q as Ue,p as aa,a as Tt,r as xt,C as na}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as ce}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as dt,a as N}from"../chunks/Dropdown.Dl2mephJ.js";import{B as ia,a as Et}from"../chunks/ButtonGroup.CVfHA_5U.js";import{p as oa}from"../chunks/stores.DJGNasUV.js";import{Q as Ve}from"../chunks/QueryViewer.RFckNDEV.js";import{B as St}from"../chunks/BarChart.Cy9nf948.js";import{L as Mt}from"../chunks/LineChart.DDKWAAFN.js";import{p as ra}from"../chunks/profile.BW8tN6E9.js";function sa(p){let a,r=G.title+"",t;return{c(){a=S("h1"),t=J(r),this.h()},l(d){a=E(d,"H1",{class:!0});var i=Qt(a);t=X(i,r),i.forEach(o),this.h()},h(){M(a,"class","title")},m(d,i){s(d,a,i),rt(a,t)},p:me,d(d){d&&o(a)}}}function la(p){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:me,p:me,d:me}}function da(p){let a,r,t,d,i;return document.title=a=G.title,{c(){r=c(),t=S("meta"),d=c(),i=S("meta"),this.h()},l(f){r=h(f),t=E(f,"META",{property:!0,content:!0}),d=h(f),i=E(f,"META",{name:!0,content:!0}),this.h()},h(){var f,u;M(t,"property","og:title"),M(t,"content",((f=G.og)==null?void 0:f.title)??G.title),M(i,"name","twitter:title"),M(i,"content",((u=G.og)==null?void 0:u.title)??G.title)},m(f,u){s(f,r,u),s(f,t,u),s(f,d,u),s(f,i,u)},p(f,u){u&0&&a!==(a=G.title)&&(document.title=a)},d(f){f&&(o(r),o(t),o(d),o(i))}}}function ma(p){var i,f;let a,r,t=(G.description||((i=G.og)==null?void 0:i.description))&&pa(),d=((f=G.og)==null?void 0:f.image)&&_a();return{c(){t&&t.c(),a=c(),d&&d.c(),r=st()},l(u){t&&t.l(u),a=h(u),d&&d.l(u),r=st()},m(u,y){t&&t.m(u,y),s(u,a,y),d&&d.m(u,y),s(u,r,y)},p(u,y){var H,I;(G.description||(H=G.og)!=null&&H.description)&&t.p(u,y),(I=G.og)!=null&&I.image&&d.p(u,y)},d(u){u&&(o(a),o(r)),t&&t.d(u),d&&d.d(u)}}}function pa(p){let a,r,t,d,i;return{c(){a=S("meta"),r=c(),t=S("meta"),d=c(),i=S("meta"),this.h()},l(f){a=E(f,"META",{name:!0,content:!0}),r=h(f),t=E(f,"META",{property:!0,content:!0}),d=h(f),i=E(f,"META",{name:!0,content:!0}),this.h()},h(){var f,u,y;M(a,"name","description"),M(a,"content",G.description??((f=G.og)==null?void 0:f.description)),M(t,"property","og:description"),M(t,"content",((u=G.og)==null?void 0:u.description)??G.description),M(i,"name","twitter:description"),M(i,"content",((y=G.og)==null?void 0:y.description)??G.description)},m(f,u){s(f,a,u),s(f,r,u),s(f,t,u),s(f,d,u),s(f,i,u)},p:me,d(f){f&&(o(a),o(r),o(t),o(d),o(i))}}}function _a(p){let a,r,t;return{c(){a=S("meta"),r=c(),t=S("meta"),this.h()},l(d){a=E(d,"META",{property:!0,content:!0}),r=h(d),t=E(d,"META",{name:!0,content:!0}),this.h()},h(){var d,i;M(a,"property","og:image"),M(a,"content",Tt((d=G.og)==null?void 0:d.image)),M(t,"name","twitter:image"),M(t,"content",Tt((i=G.og)==null?void 0:i.image))},m(d,i){s(d,a,i),s(d,r,i),s(d,t,i)},p:me,d(d){d&&(o(a),o(r),o(t))}}}function fa(p){let a,r="How to read this:",t,d,i="OA = 1.0",f,u,y="above 1.0",H,I,R="below 1.0",K,O,U="Density",T,q,B='"Stock vs. development"',V,P,Q='"Change since previous year"',x,D,F="two-colour (diverging) legend",W;return{c(){a=S("b"),a.textContent=r,t=c(),d=S("b"),d.textContent=i,f=J(` means an area has exactly the citywide-average share of
  a POI domain; `),u=S("b"),u.textContent=y,H=J(` means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), `),I=S("b"),I.textContent=R,K=J(` means under-represented.
  `),O=S("b"),O.textContent=U,T=J(" is simply mapped-place count per km². Switch "),q=S("b"),q.textContent=B,V=J(` to
  `),P=S("b"),P.textContent=Q,x=J(` to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. Offering Advantage
  and any "Change since previous year" view use a `),D=S("b"),D.textContent=F,W=J(` centred on
  that neutral point (1.0 for Offering Advantage, 0 for a year-over-year change) -- one hue means
  above it, the other means below; plain POI-density "stock" values use a single-colour scale
  instead, since there's no natural centre to diverge around. Hamburg has its own map at
  [/hamburg/poi-map](/hamburg/poi-map); the two cities' Offering Advantage baselines are never
  pooled.`)},l(_){a=E(_,"B",{"data-svelte-h":!0}),z(a)!=="svelte-1d2ahpj"&&(a.textContent=r),t=h(_),d=E(_,"B",{"data-svelte-h":!0}),z(d)!=="svelte-17c8v7u"&&(d.textContent=i),f=X(_,` means an area has exactly the citywide-average share of
  a POI domain; `),u=E(_,"B",{"data-svelte-h":!0}),z(u)!=="svelte-11ia4c8"&&(u.textContent=y),H=X(_,` means that domain is over-represented there (e.g. more
  gastronomy per resident/area than the city as a whole), `),I=E(_,"B",{"data-svelte-h":!0}),z(I)!=="svelte-1m0m3gk"&&(I.textContent=R),K=X(_,` means under-represented.
  `),O=E(_,"B",{"data-svelte-h":!0}),z(O)!=="svelte-uzvr2g"&&(O.textContent=U),T=X(_," is simply mapped-place count per km². Switch "),q=E(_,"B",{"data-svelte-h":!0}),z(q)!=="svelte-17y0108"&&(q.textContent=B),V=X(_,` to
  `),P=E(_,"B",{"data-svelte-h":!0}),z(P)!=="svelte-t4tx04"&&(P.textContent=Q),x=X(_,` to see year-over-year movement instead of the point-in-time
  value -- useful for spotting where a domain is growing or shrinking fastest. Offering Advantage
  and any "Change since previous year" view use a `),D=E(_,"B",{"data-svelte-h":!0}),z(D)!=="svelte-qnoy8c"&&(D.textContent=F),W=X(_,` centred on
  that neutral point (1.0 for Offering Advantage, 0 for a year-over-year change) -- one hue means
  above it, the other means below; plain POI-density "stock" values use a single-colour scale
  instead, since there's no natural centre to diverge around. Hamburg has its own map at
  [/hamburg/poi-map](/hamburg/poi-map); the two cities' Offering Advantage baselines are never
  pooled.`)},m(_,v){s(_,a,v),s(_,t,v),s(_,d,v),s(_,f,v),s(_,u,v),s(_,H,v),s(_,I,v),s(_,K,v),s(_,O,v),s(_,T,v),s(_,q,v),s(_,V,v),s(_,P,v),s(_,x,v),s(_,D,v),s(_,W,v)},p:me,d(_){_&&(o(a),o(t),o(d),o(f),o(u),o(H),o(I),o(K),o(O),o(T),o(q),o(V),o(P),o(x),o(D),o(W))}}}function ua(p){let a,r="What 0 and the grey hatching mean.",t,d,i="POI density",f,u,y="0",H,I,R="Offering Advantage",K,O,U=`A 0 or a hatched area means only "nothing of this kind is mapped here" or "too
  thinly observed to compute a stable ratio" -- never "commercially dead."`,T,q,B=`A
  bandwidth sweep found the Gaussian-weighted Offering Advantage construct bandwidth-sensitive at
  wide catchments`,V,P,Q=`The map above does not use
  that weighted construct`,x,D,F="methodology page §7",W;return{c(){a=S("b"),a.textContent=r,t=J(" On the "),d=S("b"),d.textContent=i,f=J(` view, a PLR with no mapped
  place of the selected domain that year is shown as `),u=S("b"),u.textContent=y,H=J(`, the lowest colour on the scale.
  On the `),I=S("b"),I.textContent=R,K=J(` view, a PLR is hatched grey ("No data") in two cases. First, the
  selected domain has no mapped place there that year: Offering Advantage is only computed for a
  domain present in the area, so there is no value to show. Second, the PLR-year is thinly mapped:
  Offering Advantage is a compositional ratio (a location quotient), so in a PLR-year with very few
  mapped places overall a single new or removed business can swing its value disproportionately.
  PLR-years with fewer than 10 total mapped places (across every domain) are therefore hatched
  rather than given a potentially misleading Offering Advantage value. The raw mapped-place count
  for the selected domain is always visible in the tooltip, so you can judge borderline cases
  yourself. `),O=S("b"),O.textContent=U,T=J(`
  OSM's mapping coverage is not spatially neutral: besides the early-year effect on the citywide
  chart below, completeness also varies *within* a given year and tends to correlate with area
  advantage -- poorer/peripheral areas are typically less thoroughly mapped than richer/central ones
  (Haklay, M. 2010, "How Good is Volunteered Geographical Information?", *Environment and Planning
  B*). So a low or zero mapped-place count -- and the 0 or blank cell it produces -- can reflect an
  OSM coverage gap rather than a real absence of commercial activity; please don't read such a PLR
  as evidence that nothing is happening there. `),q=S("b"),q.textContent=B,V=J(`: it is stable close to its 1000 m headline catchment (500m vs 1000m and 1000m
  vs 1500m both rank-correlate above 0.7 across every year 2008-2026), but re-ranks meaningfully
  across the full 500 m to 1500 m sweep (pooled Spearman r = 0.68). `),P=S("b"),P.textContent=Q,x=J(` -- it uses the hard point-in-polygon variant, which has no bandwidth
  parameter and is therefore bandwidth-invariant by construction -- meaning only that it makes no
  bandwidth choice, not that it has been tested and found spatially robust: it remains untested for
  this exact fragility and sits at the sharp/narrow end of the same spatial-grain family swept above
  (the 500 m end was the more volatile side of the fragile pair); the sweep is disclosed here as
  relevant context for a separate, still-open question
  ([#174](https://github.com/dhelweg/gentriduck/issues/174)) about whether the published headline
  should switch to the bandwidth-weighted construct, not as a characterization of the numbers shown
  above. See the `),D=S("a"),D.textContent=F,W=J(` and
  [the bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail.`),this.h()},l(_){a=E(_,"B",{"data-svelte-h":!0}),z(a)!=="svelte-bozku2"&&(a.textContent=r),t=X(_," On the "),d=E(_,"B",{"data-svelte-h":!0}),z(d)!=="svelte-10svj7c"&&(d.textContent=i),f=X(_,` view, a PLR with no mapped
  place of the selected domain that year is shown as `),u=E(_,"B",{"data-svelte-h":!0}),z(u)!=="svelte-12bhsds"&&(u.textContent=y),H=X(_,`, the lowest colour on the scale.
  On the `),I=E(_,"B",{"data-svelte-h":!0}),z(I)!=="svelte-197gaox"&&(I.textContent=R),K=X(_,` view, a PLR is hatched grey ("No data") in two cases. First, the
  selected domain has no mapped place there that year: Offering Advantage is only computed for a
  domain present in the area, so there is no value to show. Second, the PLR-year is thinly mapped:
  Offering Advantage is a compositional ratio (a location quotient), so in a PLR-year with very few
  mapped places overall a single new or removed business can swing its value disproportionately.
  PLR-years with fewer than 10 total mapped places (across every domain) are therefore hatched
  rather than given a potentially misleading Offering Advantage value. The raw mapped-place count
  for the selected domain is always visible in the tooltip, so you can judge borderline cases
  yourself. `),O=E(_,"B",{"data-svelte-h":!0}),z(O)!=="svelte-5qobgv"&&(O.textContent=U),T=X(_,`
  OSM's mapping coverage is not spatially neutral: besides the early-year effect on the citywide
  chart below, completeness also varies *within* a given year and tends to correlate with area
  advantage -- poorer/peripheral areas are typically less thoroughly mapped than richer/central ones
  (Haklay, M. 2010, "How Good is Volunteered Geographical Information?", *Environment and Planning
  B*). So a low or zero mapped-place count -- and the 0 or blank cell it produces -- can reflect an
  OSM coverage gap rather than a real absence of commercial activity; please don't read such a PLR
  as evidence that nothing is happening there. `),q=E(_,"B",{"data-svelte-h":!0}),z(q)!=="svelte-7jvz40"&&(q.textContent=B),V=X(_,`: it is stable close to its 1000 m headline catchment (500m vs 1000m and 1000m
  vs 1500m both rank-correlate above 0.7 across every year 2008-2026), but re-ranks meaningfully
  across the full 500 m to 1500 m sweep (pooled Spearman r = 0.68). `),P=E(_,"B",{"data-svelte-h":!0}),z(P)!=="svelte-1hpn7q2"&&(P.textContent=Q),x=X(_,` -- it uses the hard point-in-polygon variant, which has no bandwidth
  parameter and is therefore bandwidth-invariant by construction -- meaning only that it makes no
  bandwidth choice, not that it has been tested and found spatially robust: it remains untested for
  this exact fragility and sits at the sharp/narrow end of the same spatial-grain family swept above
  (the 500 m end was the more volatile side of the fragile pair); the sweep is disclosed here as
  relevant context for a separate, still-open question
  ([#174](https://github.com/dhelweg/gentriduck/issues/174)) about whether the published headline
  should switch to the bandwidth-weighted construct, not as a characterization of the numbers shown
  above. See the `),D=E(_,"A",{href:!0,"data-svelte-h":!0}),z(D)!=="svelte-db3vh3"&&(D.textContent=F),W=X(_,` and
  [the bandwidth-sweep findings](https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md)
  for the full detail.`),this.h()},h(){M(D,"href","/gentriduck/methodology")},m(_,v){s(_,a,v),s(_,t,v),s(_,d,v),s(_,f,v),s(_,u,v),s(_,H,v),s(_,I,v),s(_,K,v),s(_,O,v),s(_,T,v),s(_,q,v),s(_,V,v),s(_,P,v),s(_,x,v),s(_,D,v),s(_,W,v)},p:me,d(_){_&&(o(a),o(t),o(d),o(f),o(u),o(H),o(I),o(K),o(O),o(T),o(q),o(V),o(P),o(x),o(D),o(W))}}}function ha(p){let a,r,t,d;return a=new N({props:{value:"density",valueLabel:"POI density (mapped places per km²)"}}),t=new N({props:{value:"oa",valueLabel:"Offering Advantage (location quotient vs. citywide)"}}),{c(){L(a.$$.fragment),r=c(),L(t.$$.fragment)},l(i){k(a.$$.fragment,i),r=h(i),k(t.$$.fragment,i)},m(i,f){$(a,i,f),s(i,r,f),$(t,i,f),d=!0},p:me,i(i){d||(g(a.$$.fragment,i),g(t.$$.fragment,i),d=!0)},o(i){w(a.$$.fragment,i),w(t.$$.fragment,i),d=!1},d(i){i&&o(r),b(a,i),b(t,i)}}}function ca(p){let a,r,t,d,i,f,u,y,H,I,R,K,O,U,T,q,B,V,P,Q,x,D,F,W,_,v;return a=new N({props:{value:"Entertainment",valueLabel:"Entertainment"}}),t=new N({props:{value:"Gastronomy",valueLabel:"Gastronomy"}}),i=new N({props:{value:"Mobility",valueLabel:"Mobility"}}),u=new N({props:{value:"Office",valueLabel:"Office"}}),H=new N({props:{value:"Other",valueLabel:"Other"}}),R=new N({props:{value:"Public Service",valueLabel:"Public Service"}}),O=new N({props:{value:"Public Space",valueLabel:"Public Space"}}),T=new N({props:{value:"Religion",valueLabel:"Religion"}}),B=new N({props:{value:"Retail",valueLabel:"Retail"}}),P=new N({props:{value:"Services",valueLabel:"Services"}}),x=new N({props:{value:"Sports and Recreation",valueLabel:"Sports and Recreation"}}),F=new N({props:{value:"Tourism",valueLabel:"Tourism"}}),_=new N({props:{value:"Vacancy",valueLabel:"Vacancy"}}),{c(){L(a.$$.fragment),r=c(),L(t.$$.fragment),d=c(),L(i.$$.fragment),f=c(),L(u.$$.fragment),y=c(),L(H.$$.fragment),I=c(),L(R.$$.fragment),K=c(),L(O.$$.fragment),U=c(),L(T.$$.fragment),q=c(),L(B.$$.fragment),V=c(),L(P.$$.fragment),Q=c(),L(x.$$.fragment),D=c(),L(F.$$.fragment),W=c(),L(_.$$.fragment)},l(m){k(a.$$.fragment,m),r=h(m),k(t.$$.fragment,m),d=h(m),k(i.$$.fragment,m),f=h(m),k(u.$$.fragment,m),y=h(m),k(H.$$.fragment,m),I=h(m),k(R.$$.fragment,m),K=h(m),k(O.$$.fragment,m),U=h(m),k(T.$$.fragment,m),q=h(m),k(B.$$.fragment,m),V=h(m),k(P.$$.fragment,m),Q=h(m),k(x.$$.fragment,m),D=h(m),k(F.$$.fragment,m),W=h(m),k(_.$$.fragment,m)},m(m,A){$(a,m,A),s(m,r,A),$(t,m,A),s(m,d,A),$(i,m,A),s(m,f,A),$(u,m,A),s(m,y,A),$(H,m,A),s(m,I,A),$(R,m,A),s(m,K,A),$(O,m,A),s(m,U,A),$(T,m,A),s(m,q,A),$(B,m,A),s(m,V,A),$(P,m,A),s(m,Q,A),$(x,m,A),s(m,D,A),$(F,m,A),s(m,W,A),$(_,m,A),v=!0},p:me,i(m){v||(g(a.$$.fragment,m),g(t.$$.fragment,m),g(i.$$.fragment,m),g(u.$$.fragment,m),g(H.$$.fragment,m),g(R.$$.fragment,m),g(O.$$.fragment,m),g(T.$$.fragment,m),g(B.$$.fragment,m),g(P.$$.fragment,m),g(x.$$.fragment,m),g(F.$$.fragment,m),g(_.$$.fragment,m),v=!0)},o(m){w(a.$$.fragment,m),w(t.$$.fragment,m),w(i.$$.fragment,m),w(u.$$.fragment,m),w(H.$$.fragment,m),w(R.$$.fragment,m),w(O.$$.fragment,m),w(T.$$.fragment,m),w(B.$$.fragment,m),w(P.$$.fragment,m),w(x.$$.fragment,m),w(F.$$.fragment,m),w(_.$$.fragment,m),v=!1},d(m){m&&(o(r),o(d),o(f),o(y),o(I),o(K),o(U),o(q),o(V),o(Q),o(D),o(W)),b(a,m),b(t,m),b(i,m),b(u,m),b(H,m),b(R,m),b(O,m),b(T,m),b(B,m),b(P,m),b(x,m),b(F,m),b(_,m)}}}function ga(p){let a,r,t,d,i,f,u,y,H,I,R,K,O,U,T,q,B,V,P,Q,x,D,F,W,_,v,m,A,ie,_e,oe,re,Y,fe,de,se,pe,le;return a=new N({props:{value:"2008",valueLabel:"2008"}}),t=new N({props:{value:"2009",valueLabel:"2009"}}),i=new N({props:{value:"2010",valueLabel:"2010"}}),u=new N({props:{value:"2011",valueLabel:"2011"}}),H=new N({props:{value:"2012",valueLabel:"2012"}}),R=new N({props:{value:"2013",valueLabel:"2013"}}),O=new N({props:{value:"2014",valueLabel:"2014"}}),T=new N({props:{value:"2015",valueLabel:"2015"}}),B=new N({props:{value:"2016",valueLabel:"2016"}}),P=new N({props:{value:"2017",valueLabel:"2017"}}),x=new N({props:{value:"2018",valueLabel:"2018"}}),F=new N({props:{value:"2019",valueLabel:"2019"}}),_=new N({props:{value:"2020",valueLabel:"2020"}}),m=new N({props:{value:"2021",valueLabel:"2021"}}),ie=new N({props:{value:"2022",valueLabel:"2022"}}),oe=new N({props:{value:"2023",valueLabel:"2023"}}),Y=new N({props:{value:"2024",valueLabel:"2024"}}),de=new N({props:{value:"2025",valueLabel:"2025"}}),pe=new N({props:{value:"2026",valueLabel:"2026"}}),{c(){L(a.$$.fragment),r=c(),L(t.$$.fragment),d=c(),L(i.$$.fragment),f=c(),L(u.$$.fragment),y=c(),L(H.$$.fragment),I=c(),L(R.$$.fragment),K=c(),L(O.$$.fragment),U=c(),L(T.$$.fragment),q=c(),L(B.$$.fragment),V=c(),L(P.$$.fragment),Q=c(),L(x.$$.fragment),D=c(),L(F.$$.fragment),W=c(),L(_.$$.fragment),v=c(),L(m.$$.fragment),A=c(),L(ie.$$.fragment),_e=c(),L(oe.$$.fragment),re=c(),L(Y.$$.fragment),fe=c(),L(de.$$.fragment),se=c(),L(pe.$$.fragment)},l(n){k(a.$$.fragment,n),r=h(n),k(t.$$.fragment,n),d=h(n),k(i.$$.fragment,n),f=h(n),k(u.$$.fragment,n),y=h(n),k(H.$$.fragment,n),I=h(n),k(R.$$.fragment,n),K=h(n),k(O.$$.fragment,n),U=h(n),k(T.$$.fragment,n),q=h(n),k(B.$$.fragment,n),V=h(n),k(P.$$.fragment,n),Q=h(n),k(x.$$.fragment,n),D=h(n),k(F.$$.fragment,n),W=h(n),k(_.$$.fragment,n),v=h(n),k(m.$$.fragment,n),A=h(n),k(ie.$$.fragment,n),_e=h(n),k(oe.$$.fragment,n),re=h(n),k(Y.$$.fragment,n),fe=h(n),k(de.$$.fragment,n),se=h(n),k(pe.$$.fragment,n)},m(n,C){$(a,n,C),s(n,r,C),$(t,n,C),s(n,d,C),$(i,n,C),s(n,f,C),$(u,n,C),s(n,y,C),$(H,n,C),s(n,I,C),$(R,n,C),s(n,K,C),$(O,n,C),s(n,U,C),$(T,n,C),s(n,q,C),$(B,n,C),s(n,V,C),$(P,n,C),s(n,Q,C),$(x,n,C),s(n,D,C),$(F,n,C),s(n,W,C),$(_,n,C),s(n,v,C),$(m,n,C),s(n,A,C),$(ie,n,C),s(n,_e,C),$(oe,n,C),s(n,re,C),$(Y,n,C),s(n,fe,C),$(de,n,C),s(n,se,C),$(pe,n,C),le=!0},p:me,i(n){le||(g(a.$$.fragment,n),g(t.$$.fragment,n),g(i.$$.fragment,n),g(u.$$.fragment,n),g(H.$$.fragment,n),g(R.$$.fragment,n),g(O.$$.fragment,n),g(T.$$.fragment,n),g(B.$$.fragment,n),g(P.$$.fragment,n),g(x.$$.fragment,n),g(F.$$.fragment,n),g(_.$$.fragment,n),g(m.$$.fragment,n),g(ie.$$.fragment,n),g(oe.$$.fragment,n),g(Y.$$.fragment,n),g(de.$$.fragment,n),g(pe.$$.fragment,n),le=!0)},o(n){w(a.$$.fragment,n),w(t.$$.fragment,n),w(i.$$.fragment,n),w(u.$$.fragment,n),w(H.$$.fragment,n),w(R.$$.fragment,n),w(O.$$.fragment,n),w(T.$$.fragment,n),w(B.$$.fragment,n),w(P.$$.fragment,n),w(x.$$.fragment,n),w(F.$$.fragment,n),w(_.$$.fragment,n),w(m.$$.fragment,n),w(ie.$$.fragment,n),w(oe.$$.fragment,n),w(Y.$$.fragment,n),w(de.$$.fragment,n),w(pe.$$.fragment,n),le=!1},d(n){n&&(o(r),o(d),o(f),o(y),o(I),o(K),o(U),o(q),o(V),o(Q),o(D),o(W),o(v),o(A),o(_e),o(re),o(fe),o(se)),b(a,n),b(t,n),b(i,n),b(u,n),b(H,n),b(R,n),b(O,n),b(T,n),b(B,n),b(P,n),b(x,n),b(F,n),b(_,n),b(m,n),b(ie,n),b(oe,n),b(Y,n),b(de,n),b(pe,n)}}}function ya(p){let a,r,t,d;return a=new Et({props:{value:"stock",valueLabel:"Stock (this year's value)",default:!0}}),t=new Et({props:{value:"development",valueLabel:"Change since previous year"}}),{c(){L(a.$$.fragment),r=c(),L(t.$$.fragment)},l(i){k(a.$$.fragment,i),r=h(i),k(t.$$.fragment,i)},m(i,f){$(a,i,f),s(i,r,f),$(t,i,f),d=!0},p:me,i(i){d||(g(a.$$.fragment,i),g(t.$$.fragment,i),d=!0)},o(i){w(a.$$.fragment,i),w(t.$$.fragment,i),d=!1},d(i){i&&o(r),b(a,i),b(t,i)}}}function wa(p){let a,r='"Change since previous year" for POI density is not adjusted for growing OSM coverage.',t;return{c(){a=S("b"),a.textContent=r,t=J(`
  Growing OpenStreetMap contributor coverage over time inflates early-year counts on its own,
  independent of real-world change (see the citywide growth chart further down this page for the
  shape of that coverage growth), so an early-year density delta can reflect new OSM contributors
  catching up rather than real commercial change. Offering Advantage's "change" view is less
  exposed to this: it is a same-year ratio to the citywide average, so an area-uniform coverage
  shift cancels out; density's raw count carries no such protection. Read early-year density
  deltas cautiously.`)},l(d){a=E(d,"B",{"data-svelte-h":!0}),z(a)!=="svelte-b5xv1v"&&(a.textContent=r),t=X(d,`
  Growing OpenStreetMap contributor coverage over time inflates early-year counts on its own,
  independent of real-world change (see the citywide growth chart further down this page for the
  shape of that coverage growth), so an early-year density delta can reflect new OSM contributors
  catching up rather than real commercial change. Offering Advantage's "change" view is less
  exposed to this: it is a same-year ratio to the citywide average, so an area-uniform coverage
  shift cancels out; density's raw count carries no such protection. Read early-year density
  deltas cautiously.`)},m(d,i){s(d,a,i),s(d,t,i)},p:me,d(d){d&&(o(a),o(t))}}}function Dt(p){let a,r;return a=new Ve({props:{queryID:"poi_map_data",queryResult:p[3]}}),{c(){L(a.$$.fragment)},l(t){k(a.$$.fragment,t)},m(t,d){$(a,t,d),r=!0},p(t,d){const i={};d[0]&8&&(i.queryResult=t[3]),a.$set(i)},i(t){r||(g(a.$$.fragment,t),r=!0)},o(t){w(a.$$.fragment,t),r=!1},d(t){b(a,t)}}}function va(p){let a;return{c(){a=J(`These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.`)},l(r){a=X(r,`These are simple citywide averages/totals of the same governed data used elsewhere on the site —
  no new indicator, weight, or method is introduced here, so no separate methodology sign-off
  applies. See the [methodology & data sources](/methodology) page for how the underlying figures
  are built.`)},m(r,t){s(r,a,t)},d(r){r&&o(a)}}}function It(p){let a,r;return a=new Ve({props:{queryID:"poi_citywide",queryResult:p[4]}}),{c(){L(a.$$.fragment)},l(t){k(a.$$.fragment,t)},m(t,d){$(a,t,d),r=!0},p(t,d){const i={};d[0]&16&&(i.queryResult=t[4]),a.$set(i)},i(t){r||(g(a.$$.fragment,t),r=!0)},o(t){w(a.$$.fragment,t),r=!1},d(t){b(a,t)}}}function ba(p){let a,r,t="completeness-bias correction write-up",d;return{c(){a=J(`Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  `),r=S("a"),r.textContent=t,d=J(`
  for how the index itself corrects for this).`),this.h()},l(i){a=X(i,`Because Berlin's official neighbourhood boundaries changed in 2021, this line stitches together
  counts from two boundary systems (pre-2021 and 2021+) into one continuous citywide series — read
  it as one trend, not two. It's also worth reading the early years cautiously: since these are
  OpenStreetMap-derived counts, growing map-contributor coverage over time inflates early-year
  counts on its own, independent of real-world change (see the
  `),r=E(i,"A",{href:!0,"data-svelte-h":!0}),z(r)!=="svelte-2rwr8v"&&(r.textContent=t),d=X(i,`
  for how the index itself corrects for this).`),this.h()},h(){M(r,"href","https://github.com/dhelweg/gentriduck/blob/main/docs/epic-c/C5-geo-signoff.md")},m(i,f){s(i,a,f),s(i,r,f),s(i,d,f)},p:me,d(i){i&&(o(a),o(r),o(d))}}}function qt(p){let a,r;return a=new Ve({props:{queryID:"poi_latest_year",queryResult:p[1]}}),{c(){L(a.$$.fragment)},l(t){k(a.$$.fragment,t)},m(t,d){$(a,t,d),r=!0},p(t,d){const i={};d[0]&2&&(i.queryResult=t[1]),a.$set(i)},i(t){r||(g(a.$$.fragment,t),r=!0)},o(t){w(a.$$.fragment,t),r=!1},d(t){b(a,t)}}}function Ht(p){let a,r;return a=new Ve({props:{queryID:"poi_mix_latest",queryResult:p[5]}}),{c(){L(a.$$.fragment)},l(t){k(a.$$.fragment,t)},m(t,d){$(a,t,d),r=!0},p(t,d){const i={};d[0]&32&&(i.queryResult=t[5]),a.$set(i)},i(t){r||(g(a.$$.fragment,t),r=!0)},o(t){w(a.$$.fragment,t),r=!1},d(t){b(a,t)}}}function Bt(p){let a,r;return a=new Ve({props:{queryID:"price_rent_citywide",queryResult:p[6]}}),{c(){L(a.$$.fragment)},l(t){k(a.$$.fragment,t)},m(t,d){$(a,t,d),r=!0},p(t,d){const i={};d[0]&64&&(i.queryResult=t[6]),a.$set(i)},i(t){r||(g(a.$$.fragment,t),r=!0)},o(t){w(a.$$.fragment,t),r=!1},d(t){b(a,t)}}}function $a(p){let a,r,t="n_areas_with_brw",d;return{c(){a=J(`These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see `),r=S("code"),r.textContent=t,d=J(` in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.`)},l(i){a=X(i,`These are citywide averages of official reference values, not observed transaction prices — see
  the [area detail page](/berlin/area-detail)'s price & rent section, or the
  [methodology page](/methodology), for what "land value" (Bodenrichtwert) and "estimated rent"
  (Mietspiegel-derived) actually measure and their caveats. Land-value coverage is uneven across
  years (some years have no residential zones matched — see `),r=E(i,"CODE",{"data-svelte-h":!0}),z(r)!=="svelte-134q9ci"&&(r.textContent=t),d=X(i,` in the
  underlying data); the chart below only plots years with a usable citywide average. Estimated-rent
  coverage is broader.`)},m(i,f){s(i,a,f),s(i,r,f),s(i,d,f)},p:me,d(i){i&&(o(a),o(r),o(d))}}}function ka(p){let a,r,t,d,i,f,u,y,H=`This map shows where different kinds of shops, cafés, and other mapped places (&quot;points of
interest,&quot; or POIs) are concentrated across Berlin – either as raw density, or as
<strong class="markdown">Offering Advantage (OA)</strong>: how over- or under-represented a POI domain is in an area compared
to the citywide average for that domain (a location quotient). OA already feeds the governed
gentrification index as one input among several; this page surfaces it directly, then (further
down) zooms out to the same signal added up across the whole city, alongside land value &amp; rent.
See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
and <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0018-causal-tiered-poi-selection.md" rel="nofollow" class="markdown">ADR-0018</a>
for the full method, or the <a href="/gentriduck/methodology" class="markdown">methodology page</a> for a plain-language walkthrough.`,I,R,K,O,U,T,q,B,V,P,Q,x,D,F,W,_,v,m,A,ie=`Click a Planungsraum on the map to open its exact neighbourhood page, which also shows the
area's full OA-by-domain profile as a radar chart.`,_e,oe,re,Y,fe='<a href="#citywide-context-poi-growth-land-value--rent">Citywide context: POI growth, land value &amp; rent</a>',de,se,pe=`Two more contextual signals, added up across the whole city rather than one neighbourhood at a
time: how the mix of mapped shops, cafés, and other amenities has grown, and how land value and
estimated rent have moved. Neither feeds the governed index directly — they&#39;re both context, not
predictors — but they&#39;re the same underlying data as the map above. Looking at the whole city
lets you see the citywide trend without already knowing which neighbourhood to check; for a
single-neighbourhood breakdown, see the <a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a>.`,le,n,C,ue,De='<a href="#shops-cafés--amenities-citywide">Shops, cafés &amp; amenities, citywide</a>',Le,Ce,j,Ie,Oe,Qe,ge,mt='<a href="#what-kinds-of-places-make-up-that-total-latest-year">What kinds of places make up that total? (latest year)</a>',We,qe,He,Re,Ke,ye,pt='<a href="#land-value--estimated-rent-citywide">Land value &amp; estimated rent, citywide</a>',Ye,Be,Ae,Xe,Pe,Je,Te,Ze,we,_t='<a href="#honest-caveats">Honest caveats</a>',et,xe,ft=`<li class="markdown"><strong class="markdown">OSM early-year completeness bias.</strong> The citywide POI-growth chart&#39;s early years should be read
cautiously — growing OpenStreetMap contributor coverage over time inflates early-year counts
independent of real change; the governed index corrects for this at the area level (see
<a href="/gentriduck/methodology" class="markdown">methodology §6</a>), but the simple citywide totals above do not.</li> <li class="markdown"><strong class="markdown">Land value and estimated rent are reference values, not transaction prices</strong>, and their
<em class="markdown">level</em> is a context/desirability signal, not a vulnerability score — only their <em class="markdown">change</em> over
time carries any displacement-risk reading, and even that is not yet part of the governed
index (see <a href="/gentriduck/methodology" class="markdown">methodology §2/§6</a>).</li> <li class="markdown"><strong class="markdown">Offering Advantage and POI density are commercial-side signals, not the outcome variable.</strong>
A high OA or fast-growing POI count is read as a signal of commercial succession, never as a
standalone claim that an area is gentrifying — see <a href="/gentriduck/methodology" class="markdown">methodology §1</a> for the
double invasion-succession model this reads into.</li> <li class="markdown"><strong class="markdown">Offering Advantage is unstable in thinly-mapped PLRs — now suppressed, not just flagged.</strong> It
is a compositional ratio (a location quotient), so in a PLR-year with very few mapped businesses
a single new or removed business can swing its OA value disproportionately (#274, ADR-0017 D5
D-3). On the Offering Advantage view, PLR-years with fewer than 10 total mapped places are shown
as a hatched gap on the map above rather than a potentially misleading value; the raw
mapped-place count is always in the tooltip so you can judge near-threshold cases yourself. <strong class="markdown">A
hatched cell means &quot;no place of this kind is mapped here&quot; or &quot;too thinly observed to compute a
stable ratio,&quot; never &quot;commercially dead.&quot;</strong> The same holds for a 0 on the density view, which
only means no place of that domain is mapped there. OSM coverage is not spatially
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
detail.</li>`,tt,ve,ut='<a href="#further-reading">Further reading</a>',at,Ee,ht=`See <a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0017-poi-offering-advantage-revival.md" rel="nofollow" class="markdown">ADR-0017</a>
for how Offering Advantage is computed, the
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-g/G2-oa-bandwidth-sweep-findings.md" rel="nofollow" class="markdown">bandwidth-sweep findings</a>
for the C-4 discharge detail, the <a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a> for a
single-neighbourhood breakdown of these same signals alongside the governed index, the
<a href="/gentriduck/berlin/maps" class="markdown">gentrification-stage map</a> for the governed index itself, or
<a href="/gentriduck/methodology-oa-modes" class="markdown">Offering Advantage — modes, scales &amp; dominance</a> for the other eight
calculation methods, the area-hierarchy scale switch, and the within-group dominance construct
this map does not yet surface (this map shows only the canonical nested-LQ method at PLR grain).`,nt,Ne,it,Me,ot,be=typeof G<"u"&&G.title&&G.hide_title!==!0&&sa();function Ft(e,l){return typeof G<"u"&&G.title?da:la}let Ge=Ft()(p),$e=typeof G=="object"&&ma();f=new Xt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"POI & Offering Advantage map",lede:"Where shops, cafés, and other mapped places are concentrated across Berlin, and how that commercial mix has grown over time — the commercial half of the double invasion-succession model this project's index is built on."}}),R=new Fe({props:{status:"info",$$slots:{default:[fa]},$$scope:{ctx:p}}}),O=new Fe({props:{status:"warning",$$slots:{default:[ua]},$$scope:{ctx:p}}}),T=new dt({props:{name:"metric",title:"Metric",defaultValue:"density",$$slots:{default:[ha]},$$scope:{ctx:p}}}),B=new dt({props:{name:"domain",title:"POI domain",defaultValue:"Retail",$$slots:{default:[ca]},$$scope:{ctx:p}}}),P=new dt({props:{name:"year",title:"Year",defaultValue:"2025",$$slots:{default:[ga]},$$scope:{ctx:p}}}),x=new ia({props:{name:"view",title:"Stock vs. development",display:"tabs",defaultValue:"stock",$$slots:{default:[ya]},$$scope:{ctx:p}}}),F=new Fe({props:{status:"warning",$$slots:{default:[wa]},$$scope:{ctx:p}}});let Z=p[3]&&Dt(p);v=new Jt({props:{data:p[3],geoJsonUrl:`${ke}/geo/plr_live_data.geojson`,geoId:"area_code",areaCol:"area_code",value:p[0].metric.value==="density"?p[2]==="stock"?"poi_density_per_km2":"density_delta":p[2]==="stock"?"oa_domain":"oa_delta",legendType:"scalar",colorPalette:p[0].metric.value==="density"&&p[2]==="stock"?void 0:p[8],min:p[0].metric.value==="oa"?p[2]==="stock"?he(p[3],"oa_domain",1)[0]:he(p[3],"oa_delta",0)[0]:p[2]==="development"?he(p[3],"density_delta",0)[0]:void 0,max:p[0].metric.value==="oa"?p[2]==="stock"?he(p[3],"oa_domain",1)[1]:he(p[3],"oa_delta",0)[1]:p[2]==="development"?he(p[3],"density_delta",0)[1]:void 0,title:"Berlin Planungsraum (PLR) — "+(p[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+p[0].domain.value+", "+p[0].year.value+(p[2]==="development"?" (change vs. previous year)":""),link:"link",tooltip:p[7],emptyMessage:"No data for this domain/year combination."}}),n=new Fe({props:{status:"info",$$slots:{default:[va]},$$scope:{ctx:p}}});let ee=p[4]&&It(p);j=new Fe({props:{status:"info",$$slots:{default:[ba]},$$scope:{ctx:p}}}),Oe=new Mt({props:{data:p[4],x:"snapshot_year",y:"poi_count",title:"Total mapped shops, cafés & amenities, city of Berlin",yAxisTitle:"Number of mapped places"}});let te=p[1]&&qt(p),ae=p[5]&&Ht(p);Re=new St({props:{data:p[5],x:"poi_category_h",y:"poi_count",title:"Top 15 categories of mapped places, "+p[1][0].year,yAxisTitle:"Number of mapped places",swapXY:"true"}});let ne=p[6]&&Bt(p);return Ae=new Fe({props:{status:"info",$$slots:{default:[$a]},$$scope:{ctx:p}}}),Pe=new Mt({props:{data:p[6],x:"snapshot_year",y:["avg_est_rent_low","avg_est_rent_mid","avg_est_rent_high"],title:"Citywide estimated rent range (EUR/m²), by year",yAxisTitle:"EUR/m²"}}),Te=new St({props:{data:p[6],x:"snapshot_year",y:"avg_brw_eur_m2",title:"Citywide average land value (Bodenrichtwert), residential zones (EUR/m²)",yAxisTitle:"EUR/m²",emptyMessage:"No residential land-value zones matched for any year."}}),Me=new Yt({}),{c(){be&&be.c(),a=c(),Ge.c(),r=S("meta"),t=S("meta"),$e&&$e.c(),d=st(),i=c(),L(f.$$.fragment),u=c(),y=S("p"),y.innerHTML=H,I=c(),L(R.$$.fragment),K=c(),L(O.$$.fragment),U=c(),L(T.$$.fragment),q=c(),L(B.$$.fragment),V=c(),L(P.$$.fragment),Q=c(),L(x.$$.fragment),D=c(),L(F.$$.fragment),W=c(),Z&&Z.c(),_=c(),L(v.$$.fragment),m=c(),A=S("p"),A.textContent=ie,_e=c(),oe=S("hr"),re=c(),Y=S("h2"),Y.innerHTML=fe,de=c(),se=S("p"),se.innerHTML=pe,le=c(),L(n.$$.fragment),C=c(),ue=S("h3"),ue.innerHTML=De,Le=c(),ee&&ee.c(),Ce=c(),L(j.$$.fragment),Ie=c(),L(Oe.$$.fragment),Qe=c(),ge=S("h4"),ge.innerHTML=mt,We=c(),te&&te.c(),qe=c(),ae&&ae.c(),He=c(),L(Re.$$.fragment),Ke=c(),ye=S("h3"),ye.innerHTML=pt,Ye=c(),ne&&ne.c(),Be=c(),L(Ae.$$.fragment),Xe=c(),L(Pe.$$.fragment),Je=c(),L(Te.$$.fragment),Ze=c(),we=S("h2"),we.innerHTML=_t,et=c(),xe=S("ul"),xe.innerHTML=ft,tt=c(),ve=S("h2"),ve.innerHTML=ut,at=c(),Ee=S("p"),Ee.innerHTML=ht,nt=c(),Ne=S("hr"),it=c(),L(Me.$$.fragment),this.h()},l(e){be&&be.l(e),a=h(e);const l=Gt("svelte-2igo1p",document.head);Ge.l(l),r=E(l,"META",{name:!0,content:!0}),t=E(l,"META",{name:!0,content:!0}),$e&&$e.l(l),d=st(),l.forEach(o),i=h(e),k(f.$$.fragment,e),u=h(e),y=E(e,"P",{class:!0,"data-svelte-h":!0}),z(y)!=="svelte-rlyga1"&&(y.innerHTML=H),I=h(e),k(R.$$.fragment,e),K=h(e),k(O.$$.fragment,e),U=h(e),k(T.$$.fragment,e),q=h(e),k(B.$$.fragment,e),V=h(e),k(P.$$.fragment,e),Q=h(e),k(x.$$.fragment,e),D=h(e),k(F.$$.fragment,e),W=h(e),Z&&Z.l(e),_=h(e),k(v.$$.fragment,e),m=h(e),A=E(e,"P",{class:!0,"data-svelte-h":!0}),z(A)!=="svelte-1gvsp54"&&(A.textContent=ie),_e=h(e),oe=E(e,"HR",{class:!0}),re=h(e),Y=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),z(Y)!=="svelte-1o83ktl"&&(Y.innerHTML=fe),de=h(e),se=E(e,"P",{class:!0,"data-svelte-h":!0}),z(se)!=="svelte-wcr46p"&&(se.innerHTML=pe),le=h(e),k(n.$$.fragment,e),C=h(e),ue=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),z(ue)!=="svelte-1pe5ai8"&&(ue.innerHTML=De),Le=h(e),ee&&ee.l(e),Ce=h(e),k(j.$$.fragment,e),Ie=h(e),k(Oe.$$.fragment,e),Qe=h(e),ge=E(e,"H4",{class:!0,id:!0,"data-svelte-h":!0}),z(ge)!=="svelte-1mnfgmg"&&(ge.innerHTML=mt),We=h(e),te&&te.l(e),qe=h(e),ae&&ae.l(e),He=h(e),k(Re.$$.fragment,e),Ke=h(e),ye=E(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),z(ye)!=="svelte-9thoit"&&(ye.innerHTML=pt),Ye=h(e),ne&&ne.l(e),Be=h(e),k(Ae.$$.fragment,e),Xe=h(e),k(Pe.$$.fragment,e),Je=h(e),k(Te.$$.fragment,e),Ze=h(e),we=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),z(we)!=="svelte-ad0syq"&&(we.innerHTML=_t),et=h(e),xe=E(e,"UL",{class:!0,"data-svelte-h":!0}),z(xe)!=="svelte-13dq2p8"&&(xe.innerHTML=ft),tt=h(e),ve=E(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),z(ve)!=="svelte-oimjns"&&(ve.innerHTML=ut),at=h(e),Ee=E(e,"P",{class:!0,"data-svelte-h":!0}),z(Ee)!=="svelte-rcu59c"&&(Ee.innerHTML=ht),nt=h(e),Ne=E(e,"HR",{class:!0}),it=h(e),k(Me.$$.fragment,e),this.h()},h(){M(r,"name","twitter:card"),M(r,"content","summary_large_image"),M(t,"name","twitter:site"),M(t,"content","@evidence_dev"),M(y,"class","markdown"),M(A,"class","markdown"),M(oe,"class","markdown"),M(Y,"class","markdown"),M(Y,"id","citywide-context-poi-growth-land-value--rent"),M(se,"class","markdown"),M(ue,"class","markdown"),M(ue,"id","shops-cafés--amenities-citywide"),M(ge,"class","markdown"),M(ge,"id","what-kinds-of-places-make-up-that-total-latest-year"),M(ye,"class","markdown"),M(ye,"id","land-value--estimated-rent-citywide"),M(we,"class","markdown"),M(we,"id","honest-caveats"),M(xe,"class","markdown"),M(ve,"class","markdown"),M(ve,"id","further-reading"),M(Ee,"class","markdown"),M(Ne,"class","markdown")},m(e,l){be&&be.m(e,l),s(e,a,l),Ge.m(document.head,null),rt(document.head,r),rt(document.head,t),$e&&$e.m(document.head,null),rt(document.head,d),s(e,i,l),$(f,e,l),s(e,u,l),s(e,y,l),s(e,I,l),$(R,e,l),s(e,K,l),$(O,e,l),s(e,U,l),$(T,e,l),s(e,q,l),$(B,e,l),s(e,V,l),$(P,e,l),s(e,Q,l),$(x,e,l),s(e,D,l),$(F,e,l),s(e,W,l),Z&&Z.m(e,l),s(e,_,l),$(v,e,l),s(e,m,l),s(e,A,l),s(e,_e,l),s(e,oe,l),s(e,re,l),s(e,Y,l),s(e,de,l),s(e,se,l),s(e,le,l),$(n,e,l),s(e,C,l),s(e,ue,l),s(e,Le,l),ee&&ee.m(e,l),s(e,Ce,l),$(j,e,l),s(e,Ie,l),$(Oe,e,l),s(e,Qe,l),s(e,ge,l),s(e,We,l),te&&te.m(e,l),s(e,qe,l),ae&&ae.m(e,l),s(e,He,l),$(Re,e,l),s(e,Ke,l),s(e,ye,l),s(e,Ye,l),ne&&ne.m(e,l),s(e,Be,l),$(Ae,e,l),s(e,Xe,l),$(Pe,e,l),s(e,Je,l),$(Te,e,l),s(e,Ze,l),s(e,we,l),s(e,et,l),s(e,xe,l),s(e,tt,l),s(e,ve,l),s(e,at,l),s(e,Ee,l),s(e,nt,l),s(e,Ne,l),s(e,it,l),$(Me,e,l),ot=!0},p(e,l){typeof G<"u"&&G.title&&G.hide_title!==!0&&be.p(e,l),Ge.p(e,l),typeof G=="object"&&$e.p(e,l);const ct={};l[1]&16384&&(ct.$$scope={dirty:l,ctx:e}),R.$set(ct);const gt={};l[1]&16384&&(gt.$$scope={dirty:l,ctx:e}),O.$set(gt);const yt={};l[1]&16384&&(yt.$$scope={dirty:l,ctx:e}),T.$set(yt);const wt={};l[1]&16384&&(wt.$$scope={dirty:l,ctx:e}),B.$set(wt);const vt={};l[1]&16384&&(vt.$$scope={dirty:l,ctx:e}),P.$set(vt);const bt={};l[1]&16384&&(bt.$$scope={dirty:l,ctx:e}),x.$set(bt);const $t={};l[1]&16384&&($t.$$scope={dirty:l,ctx:e}),F.$set($t),e[3]?Z?(Z.p(e,l),l[0]&8&&g(Z,1)):(Z=Dt(e),Z.c(),g(Z,1),Z.m(_.parentNode,_)):Z&&(je(),w(Z,1,1,()=>{Z=null}),ze());const Se={};l[0]&8&&(Se.data=e[3]),l[0]&5&&(Se.value=e[0].metric.value==="density"?e[2]==="stock"?"poi_density_per_km2":"density_delta":e[2]==="stock"?"oa_domain":"oa_delta"),l[0]&5&&(Se.colorPalette=e[0].metric.value==="density"&&e[2]==="stock"?void 0:e[8]),l[0]&13&&(Se.min=e[0].metric.value==="oa"?e[2]==="stock"?he(e[3],"oa_domain",1)[0]:he(e[3],"oa_delta",0)[0]:e[2]==="development"?he(e[3],"density_delta",0)[0]:void 0),l[0]&13&&(Se.max=e[0].metric.value==="oa"?e[2]==="stock"?he(e[3],"oa_domain",1)[1]:he(e[3],"oa_delta",0)[1]:e[2]==="development"?he(e[3],"density_delta",0)[1]:void 0),l[0]&5&&(Se.title="Berlin Planungsraum (PLR) — "+(e[0].metric.value==="density"?"POI density":"Offering Advantage")+", "+e[0].domain.value+", "+e[0].year.value+(e[2]==="development"?" (change vs. previous year)":"")),l[0]&128&&(Se.tooltip=e[7]),v.$set(Se);const kt={};l[1]&16384&&(kt.$$scope={dirty:l,ctx:e}),n.$set(kt),e[4]?ee?(ee.p(e,l),l[0]&16&&g(ee,1)):(ee=It(e),ee.c(),g(ee,1),ee.m(Ce.parentNode,Ce)):ee&&(je(),w(ee,1,1,()=>{ee=null}),ze());const Lt={};l[1]&16384&&(Lt.$$scope={dirty:l,ctx:e}),j.$set(Lt);const Ct={};l[0]&16&&(Ct.data=e[4]),Oe.$set(Ct),e[1]?te?(te.p(e,l),l[0]&2&&g(te,1)):(te=qt(e),te.c(),g(te,1),te.m(qe.parentNode,qe)):te&&(je(),w(te,1,1,()=>{te=null}),ze()),e[5]?ae?(ae.p(e,l),l[0]&32&&g(ae,1)):(ae=Ht(e),ae.c(),g(ae,1),ae.m(He.parentNode,He)):ae&&(je(),w(ae,1,1,()=>{ae=null}),ze());const lt={};l[0]&32&&(lt.data=e[5]),l[0]&2&&(lt.title="Top 15 categories of mapped places, "+e[1][0].year),Re.$set(lt),e[6]?ne?(ne.p(e,l),l[0]&64&&g(ne,1)):(ne=Bt(e),ne.c(),g(ne,1),ne.m(Be.parentNode,Be)):ne&&(je(),w(ne,1,1,()=>{ne=null}),ze());const Ot={};l[1]&16384&&(Ot.$$scope={dirty:l,ctx:e}),Ae.$set(Ot);const Rt={};l[0]&64&&(Rt.data=e[6]),Pe.$set(Rt);const At={};l[0]&64&&(At.data=e[6]),Te.$set(At)},i(e){ot||(g(f.$$.fragment,e),g(R.$$.fragment,e),g(O.$$.fragment,e),g(T.$$.fragment,e),g(B.$$.fragment,e),g(P.$$.fragment,e),g(x.$$.fragment,e),g(F.$$.fragment,e),g(Z),g(v.$$.fragment,e),g(n.$$.fragment,e),g(ee),g(j.$$.fragment,e),g(Oe.$$.fragment,e),g(te),g(ae),g(Re.$$.fragment,e),g(ne),g(Ae.$$.fragment,e),g(Pe.$$.fragment,e),g(Te.$$.fragment,e),g(Me.$$.fragment,e),ot=!0)},o(e){w(f.$$.fragment,e),w(R.$$.fragment,e),w(O.$$.fragment,e),w(T.$$.fragment,e),w(B.$$.fragment,e),w(P.$$.fragment,e),w(x.$$.fragment,e),w(F.$$.fragment,e),w(Z),w(v.$$.fragment,e),w(n.$$.fragment,e),w(ee),w(j.$$.fragment,e),w(Oe.$$.fragment,e),w(te),w(ae),w(Re.$$.fragment,e),w(ne),w(Ae.$$.fragment,e),w(Pe.$$.fragment,e),w(Te.$$.fragment,e),w(Me.$$.fragment,e),ot=!1},d(e){e&&(o(a),o(i),o(u),o(y),o(I),o(K),o(U),o(q),o(V),o(Q),o(D),o(W),o(_),o(m),o(A),o(_e),o(oe),o(re),o(Y),o(de),o(se),o(le),o(C),o(ue),o(Le),o(Ce),o(Ie),o(Qe),o(ge),o(We),o(qe),o(He),o(Ke),o(ye),o(Ye),o(Be),o(Xe),o(Je),o(Ze),o(we),o(et),o(xe),o(tt),o(ve),o(at),o(Ee),o(nt),o(Ne),o(it)),be&&be.d(e),Ge.d(e),o(r),o(t),$e&&$e.d(e),o(d),b(f,e),b(R,e),b(O,e),b(T,e),b(B,e),b(P,e),b(x,e),b(F,e),Z&&Z.d(e),b(v,e),b(n,e),ee&&ee.d(e),b(j,e),b(Oe,e),te&&te.d(e),ae&&ae.d(e),b(Re,e),ne&&ne.d(e),b(Ae,e),b(Pe,e),b(Te,e),b(Me,e)}}}const G={title:"POI & Offering Advantage map"};function he(p,a,r){const d=p.map(i=>i[a]).filter(i=>i!=null&&!isNaN(i)).reduce((i,f)=>Math.max(i,Math.abs(f-r)),0)||1;return[r-d,r+d]}function La(p,a,r){let t,d,i,f;Pt(p,oa,j=>r(31,i=j)),Pt(p,xt,j=>r(36,f=j));let{data:u}=a,{data:y={},customFormattingSettings:H,__db:I,inputs:R}=u;zt(xt,f="68035a6698e6e61c5a0a6fe031efcb76",f);let K=ea(Zt(R));jt(K.subscribe(j=>r(0,R=j))),Ut(na,{getCustomFormats:()=>H.customFormats||[]});const O=(j,Ie)=>ra(I.query,j,{query_name:Ie});ta(O),i.params,Vt(()=>!0);let U={initialData:void 0,initialError:void 0},T=ce`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change for the same area + domain (window functions
-- over the full series, before the year filter below). density_delta compares with the previous
-- calendar year (the mart's yearly series is complete since #357); oa_delta compares with the
-- previous year that has an OA value (see the inline #357 note) -- "development" = movement, not a re-derived indicator. Computed on
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
            -- #357: the mart now zero-fills domain-years with no POI (is_zero_filled,
            -- oa_domain NULL). Partitioning the OA lag by is_zero_filled keeps
            -- oa_delta exactly as before (previous year WITH an OA value); the
            -- density lag above now runs over the complete yearly series, so a
            -- 0 -> n year reads +n instead of "no data".
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${R.domain.value}'
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
where b.snapshot_year = ${R.year.value}`,q=`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change for the same area + domain (window functions
-- over the full series, before the year filter below). density_delta compares with the previous
-- calendar year (the mart's yearly series is complete since #357); oa_delta compares with the
-- previous year that has an OA value (see the inline #357 note) -- "development" = movement, not a re-derived indicator. Computed on
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
            -- #357: the mart now zero-fills domain-years with no POI (is_zero_filled,
            -- oa_domain NULL). Partitioning the OA lag by is_zero_filled keeps
            -- oa_delta exactly as before (previous year WITH an OA value); the
            -- density lag above now runs over the complete yearly series, so a
            -- 0 -> n year reads +n instead of "no data".
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${R.domain.value}'
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
where b.snapshot_year = ${R.year.value}`;y.poi_map_data_data&&(y.poi_map_data_data instanceof Error?U.initialError=y.poi_map_data_data:U.initialData=y.poi_map_data_data,y.poi_map_data_columns&&(U.knownColumns=y.poi_map_data_columns));let B,V=!1;const P=Ue.createReactive({callback:j=>{r(3,B=j)},execFn:O},{id:"poi_map_data",...U});P(q,{noResolve:T,...U}),globalThis[Symbol.for("poi_map_data")]={get value(){return B}};let Q={initialData:void 0,initialError:void 0},x=ce`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`,D=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`;y.poi_citywide_data&&(y.poi_citywide_data instanceof Error?Q.initialError=y.poi_citywide_data:Q.initialData=y.poi_citywide_data,y.poi_citywide_columns&&(Q.knownColumns=y.poi_citywide_columns));let F,W=!1;const _=Ue.createReactive({callback:j=>{r(4,F=j)},execFn:O},{id:"poi_citywide",...Q});_(D,{noResolve:x,...Q}),globalThis[Symbol.for("poi_citywide")]={get value(){return F}};let v={initialData:void 0,initialError:void 0},m=ce`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`,A=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`;y.poi_latest_year_data&&(y.poi_latest_year_data instanceof Error?v.initialError=y.poi_latest_year_data:v.initialData=y.poi_latest_year_data,y.poi_latest_year_columns&&(v.knownColumns=y.poi_latest_year_columns));let ie,_e=!1;const oe=Ue.createReactive({callback:j=>{r(1,ie=j)},execFn:O},{id:"poi_latest_year",...v});oe(A,{noResolve:m,...v}),globalThis[Symbol.for("poi_latest_year")]={get value(){return ie}};let re={initialData:void 0,initialError:void 0},Y=ce`select
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
limit 15`;y.poi_mix_latest_data&&(y.poi_mix_latest_data instanceof Error?re.initialError=y.poi_mix_latest_data:re.initialData=y.poi_mix_latest_data,y.poi_mix_latest_columns&&(re.knownColumns=y.poi_mix_latest_columns));let de,se=!1;const pe=Ue.createReactive({callback:j=>{r(5,de=j)},execFn:O},{id:"poi_mix_latest",...re});pe(fe,{noResolve:Y,...re}),globalThis[Symbol.for("poi_mix_latest")]={get value(){return de}};let le={initialData:void 0,initialError:void 0},n=ce`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`,C=`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`;y.price_rent_citywide_data&&(y.price_rent_citywide_data instanceof Error?le.initialError=y.price_rent_citywide_data:le.initialData=y.price_rent_citywide_data,y.price_rent_citywide_columns&&(le.knownColumns=y.price_rent_citywide_columns));let ue,De=!1;const Le=Ue.createReactive({callback:j=>{r(6,ue=j)},execFn:O},{id:"price_rent_citywide",...le});Le(C,{noResolve:n,...le}),globalThis[Symbol.for("price_rent_citywide")]={get value(){return ue}};const Ce=["#e66101","#fdb863","#f7f7f7","#b2abd2","#5e3c99"];return p.$$set=j=>{"data"in j&&r(9,u=j.data)},p.$$.update=()=>{p.$$.dirty[0]&512&&r(10,{data:y={},customFormattingSettings:H,__db:I}=u,y),p.$$.dirty[0]&1024&&aa.set(Object.keys(y).length>0),p.$$.dirty[1]&1&&i.params,p.$$.dirty[0]&1&&r(12,T=ce`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change for the same area + domain (window functions
-- over the full series, before the year filter below). density_delta compares with the previous
-- calendar year (the mart's yearly series is complete since #357); oa_delta compares with the
-- previous year that has an OA value (see the inline #357 note) -- "development" = movement, not a re-derived indicator. Computed on
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
            -- #357: the mart now zero-fills domain-years with no POI (is_zero_filled,
            -- oa_domain NULL). Partitioning the OA lag by is_zero_filled keeps
            -- oa_delta exactly as before (previous year WITH an OA value); the
            -- density lag above now runs over the complete yearly series, so a
            -- 0 -> n year reads +n instead of "no data".
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${R.domain.value}'
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
where b.snapshot_year = ${R.year.value}`),p.$$.dirty[0]&1&&r(13,q=`-- #210: reads mart_poi_offering_advantage_map (domain-grain, ~1/3 the rows and
-- 4 fewer columns than the leaf-grain mart_poi_offering_advantage) -- Evidence
-- ships the whole referenced table to the client for any reactive query
-- against it, so this page never needed the poi_category_h/poi_type_h leaf
-- grain it doesn't read.
-- density_delta / oa_delta: year-over-year change for the same area + domain (window functions
-- over the full series, before the year filter below). density_delta compares with the previous
-- calendar year (the mart's yearly series is complete since #357); oa_delta compares with the
-- previous year that has an OA value (see the inline #357 note) -- "development" = movement, not a re-derived indicator. Computed on
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
            -- #357: the mart now zero-fills domain-years with no POI (is_zero_filled,
            -- oa_domain NULL). Partitioning the OA lag by is_zero_filled keeps
            -- oa_delta exactly as before (previous year WITH an OA value); the
            -- density lag above now runs over the complete yearly series, so a
            -- 0 -> n year reads +n instead of "no data".
            oa_domain - lag(oa_domain) over (
                partition by area_code, is_zero_filled order by snapshot_year
            ) as oa_delta_raw
        from gentriduck_marts.mart_poi_offering_advantage_map
        where
            city_code = 'BER'
            and area_vintage = 'lor_2021'
            and weight_variant = 'standard'
            and methodology_variant = 'faithful'
            and poi_domain_h = '${R.domain.value}'
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
where b.snapshot_year = ${R.year.value}`),p.$$.dirty[0]&30720&&(T||!V?T||(P(q,{noResolve:T,...U}),r(14,V=!0)):P(q,{noResolve:T})),p.$$.dirty[0]&491520&&(x||!W?x||(_(D,{noResolve:x,...Q}),r(18,W=!0)):_(D,{noResolve:x})),p.$$.dirty[0]&7864320&&(m||!_e?m||(oe(A,{noResolve:m,...v}),r(22,_e=!0)):oe(A,{noResolve:m})),p.$$.dirty[0]&2&&r(24,Y=ce`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${ie[0].year}
group by all
order by poi_count desc
limit 15`),p.$$.dirty[0]&2&&r(25,fe=`select
    poi_category_h,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
  and snapshot_year = ${ie[0].year}
group by all
order by poi_count desc
limit 15`),p.$$.dirty[0]&125829120&&(Y||!se?Y||(pe(fe,{noResolve:Y,...re}),r(26,se=!0)):pe(fe,{noResolve:Y})),p.$$.dirty[0]&2013265920&&(n||!De?n||(Le(C,{noResolve:n,...le}),r(30,De=!0)):Le(C,{noResolve:n})),p.$$.dirty[0]&1&&r(2,t=R.view==="development"?"development":"stock"),p.$$.dirty[0]&5&&r(7,d=[{id:"area_name",showColumnName:!1,valueClass:"font-bold text-sm",fmt:"id"},{id:R.metric.value==="density"?t==="stock"?"poi_density_per_km2":"density_delta":t==="stock"?"oa_domain":"oa_delta",title:(R.metric.value==="density"?"POI density / km²":"Offering Advantage")+(t==="development"?" (change vs. previous year)":""),fmt:"num1"},{id:"poi_count",title:"Mapped places (this domain)",fmt:"num0"},{id:"area_code",title:"Area code",valueClass:"text-xs opacity-60",fmt:"id"}])},r(16,x=ce`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`),r(17,D=`select
    snapshot_year,
    sum(poi_count) as poi_count
from gentriduck_marts.fct_poi_development
where city_code = 'BER'
group by all
order by snapshot_year`),r(20,m=ce`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`),r(21,A=`select max(snapshot_year) as year
from gentriduck_marts.fct_poi_development
where city_code = 'BER'`),r(28,n=ce`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`),r(29,C=`select
    snapshot_year,
    avg(est_rent_mid) as avg_est_rent_mid,
    avg(est_rent_low) as avg_est_rent_low,
    avg(est_rent_high) as avg_est_rent_high,
    avg(brw_weighted_avg_eur_m2) filter (where brw_weighted_avg_eur_m2 is not null)
        as avg_brw_eur_m2,
    count(*) filter (where brw_weighted_avg_eur_m2 is not null) as n_areas_with_brw
from gentriduck_marts.mart_price_rent_dimension
group by all
order by snapshot_year`),[R,ie,t,B,F,de,ue,d,Ce,u,y,U,T,q,V,Q,x,D,W,v,m,A,_e,re,Y,fe,se,le,n,C,De,i]}class za extends Wt{constructor(a){super(),Kt(this,a,La,ka,Nt,{data:9},null,[-1,-1])}}export{za as component};
