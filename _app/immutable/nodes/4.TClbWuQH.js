import{s as Ia,d as s,w as za,i as r,a as W,b as m,c as p,h as Fa,e as g,f as zt,k as y,g as Zt,j as M,l as _,m as v,t as R,n as La,o as Na,p as Wa,q as Ga,r as Oa,u as O}from"../chunks/scheduler.BR_Z37Nz.js";import{S as Ua,i as Qa,d as L,t as C,a as k,c as jt,m as A,b as E,e as q,g as Pt}from"../chunks/index.YbAFqEx0.js";import{A as Ya}from"../chunks/AgentPipeline.BiS8y73o.js";import{C as Kt}from"../chunks/ChapterLabel.BZXM0Hh9.js";import{F as Va}from"../chunks/FooterNav.DStxE3MT.js";import{H as Ka}from"../chunks/Hero.DHbywMea.js";import{L as Xa,a as it}from"../chunks/LinkCards.stVjiBNO.js";import{D as Ja,C as Xt}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.BlK45LYr.js";import{w as Za}from"../chunks/entry.D32pNYWo.js";import{A as es}from"../chunks/Alert.D5Co_FzM.js";import{e as ts,s as as,Q as It,p as ss,a as Aa,r as Ea,C as is}from"../chunks/inferColumnTypes.xG5QTKbT.js";import{h as Ie}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as ns,a as qa}from"../chunks/Dropdown.CGEMdaqw.js";import{p as rs}from"../chunks/stores.Ey6mBcjg.js";import{Q as Ft}from"../chunks/QueryViewer.BzGm4RbA.js";import{B as ls}from"../chunks/BarChart.Bdwiz75y.js";import{B as Jt}from"../chunks/BigValue.DNIPeER5.js";import{p as os}from"../chunks/profile.BW8tN6E9.js";function ds(h){let a,t=H.title+"",i;return{c(){a=v("h1"),i=R(t),this.h()},l(o){a=g(o,"H1",{class:!0});var n=Zt(a);i=M(n,t),n.forEach(s),this.h()},h(){m(a,"class","title")},m(o,n){r(o,a,n),W(a,i)},p:O,d(o){o&&s(a)}}}function us(h){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:O,p:O,d:O}}function cs(h){let a,t,i,o,n;return document.title=a=H.title,{c(){t=_(),i=v("meta"),o=_(),n=v("meta"),this.h()},l(d){t=p(d),i=g(d,"META",{property:!0,content:!0}),o=p(d),n=g(d,"META",{name:!0,content:!0}),this.h()},h(){var d,u;m(i,"property","og:title"),m(i,"content",((d=H.og)==null?void 0:d.title)??H.title),m(n,"name","twitter:title"),m(n,"content",((u=H.og)==null?void 0:u.title)??H.title)},m(d,u){r(d,t,u),r(d,i,u),r(d,o,u),r(d,n,u)},p(d,u){u&0&&a!==(a=H.title)&&(document.title=a)},d(d){d&&(s(t),s(i),s(o),s(n))}}}function ms(h){var n,d;let a,t,i=(H.description||((n=H.og)==null?void 0:n.description))&&hs(),o=((d=H.og)==null?void 0:d.image)&&fs();return{c(){i&&i.c(),a=_(),o&&o.c(),t=zt()},l(u){i&&i.l(u),a=p(u),o&&o.l(u),t=zt()},m(u,w){i&&i.m(u,w),r(u,a,w),o&&o.m(u,w),r(u,t,w)},p(u,w){var f,b;(H.description||(f=H.og)!=null&&f.description)&&i.p(u,w),(b=H.og)!=null&&b.image&&o.p(u,w)},d(u){u&&(s(a),s(t)),i&&i.d(u),o&&o.d(u)}}}function hs(h){let a,t,i,o,n;return{c(){a=v("meta"),t=_(),i=v("meta"),o=_(),n=v("meta"),this.h()},l(d){a=g(d,"META",{name:!0,content:!0}),t=p(d),i=g(d,"META",{property:!0,content:!0}),o=p(d),n=g(d,"META",{name:!0,content:!0}),this.h()},h(){var d,u,w;m(a,"name","description"),m(a,"content",H.description??((d=H.og)==null?void 0:d.description)),m(i,"property","og:description"),m(i,"content",((u=H.og)==null?void 0:u.description)??H.description),m(n,"name","twitter:description"),m(n,"content",((w=H.og)==null?void 0:w.description)??H.description)},m(d,u){r(d,a,u),r(d,t,u),r(d,i,u),r(d,o,u),r(d,n,u)},p:O,d(d){d&&(s(a),s(t),s(i),s(o),s(n))}}}function fs(h){let a,t,i;return{c(){a=v("meta"),t=_(),i=v("meta"),this.h()},l(o){a=g(o,"META",{property:!0,content:!0}),t=p(o),i=g(o,"META",{name:!0,content:!0}),this.h()},h(){var o,n;m(a,"property","og:image"),m(a,"content",Aa((o=H.og)==null?void 0:o.image)),m(i,"name","twitter:image"),m(i,"content",Aa((n=H.og)==null?void 0:n.image))},m(o,n){r(o,a,n),r(o,t,n),r(o,i,n)},p:O,d(o){o&&(s(a),s(t),s(i))}}}function ps(h){let a,t="How it's organised →",i,o,n="What we found →",d,u,w="How we measure it →";return{c(){a=v("a"),a.textContent=t,i=_(),o=v("a"),o.textContent=n,d=_(),u=v("a"),u.textContent=w,this.h()},l(f){a=g(f,"A",{href:!0,class:!0,"data-svelte-h":!0}),y(a)!=="svelte-1ap5o98"&&(a.textContent=t),i=p(f),o=g(f,"A",{href:!0,class:!0,"data-svelte-h":!0}),y(o)!=="svelte-17wu6fx"&&(o.textContent=n),d=p(f),u=g(f,"A",{href:!0,class:!0,"data-svelte-h":!0}),y(u)!=="svelte-tfe2jh"&&(u.textContent=w),this.h()},h(){m(a,"href","/gentriduck/how-its-organised"),m(a,"class","primary"),m(o,"href","#the-finding"),m(o,"class","secondary"),m(u,"href","/gentriduck/methodology"),m(u,"class","secondary")},m(f,b){r(f,a,b),r(f,i,b),r(f,o,b),r(f,d,b),r(f,u,b)},p:O,d(f){f&&(s(a),s(i),s(o),s(d),s(u))}}}function _s(h){let a;return{c(){a=R("Chapter 2 — The Revival")},l(t){a=M(t,"Chapter 2 — The Revival")},m(t,i){r(t,a,i)},d(t){t&&s(a)}}}function gs(h){let a,t,i="about page",o,n,d="project timeline",u,w,f="GitHub repository",b;return{c(){a=R(`Curious how a multi-agent system builds this statistics site under an enforced methodology gate? The
  `),t=v("a"),t.textContent=i,o=R(` walks through the full workflow, the enforced "free & open only"
  rules, and the methodology gate — the `),n=v("a"),n.textContent=d,u=R(` lays out every
  milestone, dated and source-cited — or read the agent definitions and Architecture Decision Records
  directly in the `),w=v("a"),w.textContent=f,b=R("."),this.h()},l(c){a=M(c,`Curious how a multi-agent system builds this statistics site under an enforced methodology gate? The
  `),t=g(c,"A",{href:!0,"data-svelte-h":!0}),y(t)!=="svelte-1toknon"&&(t.textContent=i),o=M(c,` walks through the full workflow, the enforced "free & open only"
  rules, and the methodology gate — the `),n=g(c,"A",{href:!0,"data-svelte-h":!0}),y(n)!=="svelte-1388bv5"&&(n.textContent=d),u=M(c,` lays out every
  milestone, dated and source-cited — or read the agent definitions and Architecture Decision Records
  directly in the `),w=g(c,"A",{href:!0,"data-svelte-h":!0}),y(w)!=="svelte-dgjine"&&(w.textContent=f),b=M(c,"."),this.h()},h(){m(t,"href","/gentriduck/about"),m(n,"href","/gentriduck/timeline"),m(w,"href","https://github.com/dhelweg/gentriduck")},m(c,$){r(c,a,$),r(c,t,$),r(c,o,$),r(c,n,$),r(c,u,$),r(c,w,$),r(c,b,$)},p:O,d(c){c&&(s(a),s(t),s(o),s(n),s(u),s(w),s(b))}}}function vs(h){let a;return{c(){a=R("Chapter 3 — The Evidence")},l(t){a=M(t,"Chapter 3 — The Evidence")},m(t,i){r(t,a,i)},d(t){t&&s(a)}}}function ws(h){let a,t,i,o;return a=new qa({props:{value:"live_data",valueLabel:"Live data (latest MSS editions, 2013–2025)"}}),i=new qa({props:{value:"standard",valueLabel:"2018 thesis reproduction (Dec 2016 snapshot)"}}),{c(){q(a.$$.fragment),t=_(),q(i.$$.fragment)},l(n){E(a.$$.fragment,n),t=p(n),E(i.$$.fragment,n)},m(n,d){A(a,n,d),r(n,t,d),A(i,n,d),o=!0},p:O,i(n){o||(k(a.$$.fragment,n),k(i.$$.fragment,n),o=!0)},o(n){C(a.$$.fragment,n),C(i.$$.fragment,n),o=!1},d(n){n&&s(t),L(a,n),L(i,n)}}}function Sa(h){let a,t;return a=new Ft({props:{queryID:"latest_period",queryResult:h[0]}}),{c(){q(a.$$.fragment)},l(i){E(a.$$.fragment,i)},m(i,o){A(a,i,o),t=!0},p(i,o){const n={};o[0]&1&&(n.queryResult=i[0]),a.$set(n)},i(i){t||(k(a.$$.fragment,i),t=!0)},o(i){C(a.$$.fragment,i),t=!1},d(i){L(a,i)}}}function Ba(h){let a,t;return a=new Ft({props:{queryID:"headline",queryResult:h[1]}}),{c(){q(a.$$.fragment)},l(i){E(a.$$.fragment,i)},m(i,o){A(a,i,o),t=!0},p(i,o){const n={};o[0]&2&&(n.queryResult=i[1]),a.$set(n)},i(i){t||(k(a.$$.fragment,i),t=!0)},o(i){C(a.$$.fragment,i),t=!1},d(i){L(a,i)}}}function Da(h){let a,t;return a=new Ft({props:{queryID:"stage_distribution",queryResult:h[2]}}),{c(){q(a.$$.fragment)},l(i){E(a.$$.fragment,i)},m(i,o){A(a,i,o),t=!0},p(i,o){const n={};o[0]&4&&(n.queryResult=i[2]),a.$set(n)},i(i){t||(k(a.$$.fragment,i),t=!0)},o(i){C(a.$$.fragment,i),t=!1},d(i){L(a,i)}}}function ja(h){let a,t;return a=new Ft({props:{queryID:"top_pressure",queryResult:h[3]}}),{c(){q(a.$$.fragment)},l(i){E(a.$$.fragment,i)},m(i,o){A(a,i,o),t=!0},p(i,o){const n={};o[0]&8&&(n.queryResult=i[3]),a.$set(n)},i(i){t||(k(a.$$.fragment,i),t=!0)},o(i){C(a.$$.fragment,i),t=!1},d(i){L(a,i)}}}function $s(h){let a,t,i,o,n,d;return a=new Xt({props:{id:"area_name",title:"Area"}}),i=new Xt({props:{id:"status_class",title:"Stage / classification"}}),n=new Xt({props:{id:"dynamism_class",title:"Pressure trend"}}),{c(){q(a.$$.fragment),t=_(),q(i.$$.fragment),o=_(),q(n.$$.fragment)},l(u){E(a.$$.fragment,u),t=p(u),E(i.$$.fragment,u),o=p(u),E(n.$$.fragment,u)},m(u,w){A(a,u,w),r(u,t,w),A(i,u,w),r(u,o,w),A(n,u,w),d=!0},p:O,i(u){d||(k(a.$$.fragment,u),k(i.$$.fragment,u),k(n.$$.fragment,u),d=!0)},o(u){C(a.$$.fragment,u),C(i.$$.fragment,u),C(n.$$.fragment,u),d=!1},d(u){u&&(s(t),s(o)),L(a,u),L(i,u),L(n,u)}}}function ys(h){let a;return{c(){a=R("Chapter 4 — What it means for you")},l(t){a=M(t,"Chapter 4 — What it means for you")},m(t,i){r(t,a,i)},d(t){t&&s(a)}}}function bs(h){let a,t,i="maps",o;return{c(){a=R(`Plain-language, honestly caveated takeaways on gentrification pressure — each with a
    "what the data shows" link and an explicit "what this can NOT tell you" boundary — plus the
    `),t=v("a"),t.textContent=i,o=R(" and per-neighbourhood profiles behind them."),this.h()},l(n){a=M(n,`Plain-language, honestly caveated takeaways on gentrification pressure — each with a
    "what the data shows" link and an explicit "what this can NOT tell you" boundary — plus the
    `),t=g(n,"A",{href:!0,"data-svelte-h":!0}),y(t)!=="svelte-vod8uv"&&(t.textContent=i),o=M(n," and per-neighbourhood profiles behind them."),this.h()},h(){m(t,"href","/gentriduck/berlin/maps")},m(n,d){r(n,a,d),r(n,t,d),r(n,o,d)},p:O,d(n){n&&(s(a),s(t),s(o))}}}function ks(h){let a,t,i="2018 thesis re-checked",o,n,d="maps",u,w,f="area detail",b,c,$="time series",S;return{c(){a=R(`What "gentrification pressure" means here and the theory behind the six-stage typology, the
    `),t=v("a"),t.textContent=i,o=R(` hypothesis by hypothesis, then the
    `),n=v("a"),n.textContent=d,u=R(", "),w=v("a"),w.textContent=f,b=R(`, and
    `),c=v("a"),c.textContent=$,S=R("."),this.h()},l(T){a=M(T,`What "gentrification pressure" means here and the theory behind the six-stage typology, the
    `),t=g(T,"A",{href:!0,"data-svelte-h":!0}),y(t)!=="svelte-u6e7mg"&&(t.textContent=i),o=M(T,` hypothesis by hypothesis, then the
    `),n=g(T,"A",{href:!0,"data-svelte-h":!0}),y(n)!=="svelte-vod8uv"&&(n.textContent=d),u=M(T,", "),w=g(T,"A",{href:!0,"data-svelte-h":!0}),y(w)!=="svelte-1l5krna"&&(w.textContent=f),b=M(T,`, and
    `),c=g(T,"A",{href:!0,"data-svelte-h":!0}),y(c)!=="svelte-1v3m1ue"&&(c.textContent=$),S=M(T,"."),this.h()},h(){m(t,"href","/gentriduck/thesis-recheck"),m(n,"href","/gentriduck/berlin/maps"),m(w,"href","/gentriduck/berlin/area-detail"),m(c,"href","/gentriduck/berlin/time-series")},m(T,x){r(T,a,x),r(T,t,x),r(T,o,x),r(T,n,x),r(T,u,x),r(T,w,x),r(T,b,x),r(T,c,x),r(T,S,x)},p:O,d(T){T&&(s(a),s(t),s(o),s(n),s(u),s(w),s(b),s(c),s(S))}}}function xs(h){let a,t,i="how it's built",o;return{c(){a=R(`What open data enabled here, the concrete friction encountered building on it, and
    standardization recommendations for data publishers — grounded in the same pipeline documented on
    `),t=v("a"),t.textContent=i,o=R("."),this.h()},l(n){a=M(n,`What open data enabled here, the concrete friction encountered building on it, and
    standardization recommendations for data publishers — grounded in the same pipeline documented on
    `),t=g(n,"A",{href:!0,"data-svelte-h":!0}),y(t)!=="svelte-1i3cbgj"&&(t.textContent=i),o=M(n,"."),this.h()},h(){m(t,"href","/gentriduck/how-its-built")},m(n,d){r(n,a,d),r(n,t,d),r(n,o,d)},p:O,d(n){n&&(s(a),s(t),s(o))}}}function Cs(h){let a,t,i="GitHub repository",o;return{c(){a=R(`dbt + DuckDB, local-first, rebuilt from open sources with a full OpenStreetMap history back
    to 2008. The stack, the data sources, and a worked completeness-bias correction; every model,
    seed, and test lives in the
    `),t=v("a"),t.textContent=i,o=R("."),this.h()},l(n){a=M(n,`dbt + DuckDB, local-first, rebuilt from open sources with a full OpenStreetMap history back
    to 2008. The stack, the data sources, and a worked completeness-bias correction; every model,
    seed, and test lives in the
    `),t=g(n,"A",{href:!0,"data-svelte-h":!0}),y(t)!=="svelte-dgjine"&&(t.textContent=i),o=M(n,"."),this.h()},h(){m(t,"href","https://github.com/dhelweg/gentriduck")},m(n,d){r(n,a,d),r(n,t,d),r(n,o,d)},p:O,d(n){n&&(s(a),s(t),s(o))}}}function Ts(h){let a,t,i="project timeline",o,n,d="agent definitions",u,w,f="ADRs",b;return{c(){a=R(`A supervised multi-agent workflow with an enforced, adversarial methodology gate. The agent
    team, the pipeline that ships a change, the `),t=v("a"),t.textContent=i,o=R(` from
    thesis to today, then the
    `),n=v("a"),n.textContent=d,u=R(`
    and `),w=v("a"),w.textContent=f,b=R("."),this.h()},l(c){a=M(c,`A supervised multi-agent workflow with an enforced, adversarial methodology gate. The agent
    team, the pipeline that ships a change, the `),t=g(c,"A",{href:!0,"data-svelte-h":!0}),y(t)!=="svelte-1388bv5"&&(t.textContent=i),o=M(c,` from
    thesis to today, then the
    `),n=g(c,"A",{href:!0,"data-svelte-h":!0}),y(n)!=="svelte-btiar9"&&(n.textContent=d),u=M(c,`
    and `),w=g(c,"A",{href:!0,"data-svelte-h":!0}),y(w)!=="svelte-ouziig"&&(w.textContent=f),b=M(c,"."),this.h()},h(){m(t,"href","/gentriduck/timeline"),m(n,"href","https://github.com/dhelweg/gentriduck/tree/main/.claude/agents"),m(w,"href","https://github.com/dhelweg/gentriduck/tree/main/docs/adr")},m(c,$){r(c,a,$),r(c,t,$),r(c,o,$),r(c,n,$),r(c,u,$),r(c,w,$),r(c,b,$)},p:O,d(c){c&&(s(a),s(t),s(o),s(n),s(u),s(w),s(b))}}}function Hs(h){let a,t,i,o,n,d,u,w,f,b;return a=new it({props:{href:"/gentriduck/takeaways",icon:"🏛️",title:"You work in housing policy or a local initiative",cta:"Start with takeaways →",$$slots:{default:[bs]},$$scope:{ctx:h}}}),i=new it({props:{href:"/gentriduck/methodology",icon:"🏙️",title:"You study cities & gentrification",cta:"Start with methodology →",$$slots:{default:[ks]},$$scope:{ctx:h}}}),n=new it({props:{href:"/gentriduck/open-data",icon:"🔓",title:"You care about open data",cta:"Start with the open-data report →",$$slots:{default:[xs]},$$scope:{ctx:h}}}),u=new it({props:{href:"/gentriduck/how-its-built",icon:"⚙️",title:"You build data pipelines",cta:"Start with how it's built →",$$slots:{default:[Cs]},$$scope:{ctx:h}}}),f=new it({props:{href:"/gentriduck/how-its-organised",icon:"🤖",title:"You design AI systems",cta:"Start with how it's organised →",$$slots:{default:[Ts]},$$scope:{ctx:h}}}),{c(){q(a.$$.fragment),t=_(),q(i.$$.fragment),o=_(),q(n.$$.fragment),d=_(),q(u.$$.fragment),w=_(),q(f.$$.fragment)},l(c){E(a.$$.fragment,c),t=p(c),E(i.$$.fragment,c),o=p(c),E(n.$$.fragment,c),d=p(c),E(u.$$.fragment,c),w=p(c),E(f.$$.fragment,c)},m(c,$){A(a,c,$),r(c,t,$),A(i,c,$),r(c,o,$),A(n,c,$),r(c,d,$),A(u,c,$),r(c,w,$),A(f,c,$),b=!0},p(c,$){const S={};$[1]&32&&(S.$$scope={dirty:$,ctx:c}),a.$set(S);const T={};$[1]&32&&(T.$$scope={dirty:$,ctx:c}),i.$set(T);const x={};$[1]&32&&(x.$$scope={dirty:$,ctx:c}),n.$set(x);const ie={};$[1]&32&&(ie.$$scope={dirty:$,ctx:c}),u.$set(ie);const X={};$[1]&32&&(X.$$scope={dirty:$,ctx:c}),f.$set(X)},i(c){b||(k(a.$$.fragment,c),k(i.$$.fragment,c),k(n.$$.fragment,c),k(u.$$.fragment,c),k(f.$$.fragment,c),b=!0)},o(c){C(a.$$.fragment,c),C(i.$$.fragment,c),C(n.$$.fragment,c),C(u.$$.fragment,c),C(f.$$.fragment,c),b=!1},d(c){c&&(s(t),s(o),s(d),s(w)),L(a,c),L(i,c),L(n,c),L(u,c),L(f,c)}}}function Ms(h){let a,t,i,o,n,d,u,w,f,b,c='<a href="#built-by-a-team-of-ai-agents--with-a-human-at-the-wheel">Built by a team of AI agents — with a human at the wheel</a>',$,S,T,x,ie=`Gentriduck is unusual: the data pipeline, the models, and this website are built and maintained
largely by a <strong class="markdown">team of specialised AI agents</strong> (running on
<a href="https://claude.com/claude-code" rel="nofollow" class="markdown">Claude Code</a>), each with one narrow job, working a shared backlog.
Nobody grades their own homework, and nothing sensitive ships without a person looking at it.`,X,N,Z="The work flows through a deliberately adversarial pipeline:",ee,J,fe,Q,te=`That last step is the point: the agents self-integrate onto an internal branch, but the published
site only ever advances through a <strong class="markdown">weekly pull request a human reviews and merges</strong>. It is
supervised autonomy, not a black box — and because the project is fully open, you can read every
agent definition, every architecture decision, and every line of SQL that produces a number here.`,Y,U,pe,ne,_e,z,ae='<a href="#the-finding">The finding</a>',se,V,ge,K,B='<strong class="markdown">Does the 2018 thesis&#39;s result still hold in 2025? Partly — and that&#39;s the interesting part.</strong>',Ge,ve,ea=`The original thesis asked whether the churn of shops, cafés and restaurants in a Berlin
neighbourhood tracks its social change. Re-tested in 2026 with a design fixed in advance, on both
the thesis&#39;s own era (2013–2019) and 2019–2025, two of its findings hold: an area&#39;s social status is
linked to its local business mix, modestly, and <strong class="markdown">fast food makes up a larger share of the
gastronomy mix where officially measured disadvantage is higher</strong>. Its tentative timing finding, that
a fall in disadvantage comes before commercial change, is not reproduced: we find no detectable
ordering between commercial change and change in officially measured disadvantage, in either
direction. We show where the thesis holds and where it does not, openly, rather than papering
over it.`,nt,we,ta=`<strong class="markdown">→ <a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked hypothesis by hypothesis</a></strong> — the full comparison
of what the thesis claimed, what it found, and what our rebuild finds today.`,rt,Ke,lt,re,aa='<a href="#berlin-right-now">Berlin right now</a>',ot,$e,dt,Oe,Ue,ye,ut,be,ct,ke,mt,F,Nt,Qe,Xe=h[0][0].period+"",ht,Wt,ze,sa="negative",Gt,Fe,ia="higher",Ot,xe,na="methodology page",Ut,Ne,ra='<a href="/gentriduck/berlin" class="markdown">Berlin data hub</a>',Qt,ft,Ce,la=`Gentriduck now also tracks <strong class="markdown">Hamburg</strong> — admitted 2026-07-18 after its own methodology gate, and
live since with the same kinds of views as Berlin: maps, a time series, a district browse,
per-area profiles, and a POI map. It is a narrower dataset than Berlin&#39;s, honestly scoped on its
own page: the <strong class="markdown"><a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a></strong>.`,pt,le,oa='<a href="#where-each-neighbourhood-sits-in-the-gentrification-cycle">Where each neighbourhood sits in the gentrification cycle</a>',_t,Te,da=`Instead of a single blended score, the live index places every neighbourhood into one <strong class="markdown">stage</strong> of
the invasion–succession process — from <code class="markdown">pre-gentrification</code>, through the <code class="markdown">pioneer-signal</code> and
<code class="markdown">active-gentrification</code> phases, to <code class="markdown">consolidation-pressure</code>, plus <code class="markdown">stable-established</code> for areas
outside the process and the deliberately ambiguous <code class="markdown">improving-vulnerable</code> case. This staged
typology is the project&#39;s headline product; here is how Berlin&#39;s neighbourhoods distribute across
it today.`,gt,Ye,He,vt,Me,ua=`<strong class="markdown">What to notice:</strong> most of the city sits in <code class="markdown">stable-established</code> — Berlin is not one giant
gentrification wave. The neighbourhoods to watch are the smaller <code class="markdown">pioneer-signal</code> and
<code class="markdown">active-gentrification</code> bars: those are areas where status is currently deprived <em class="markdown">and</em> the
official trend is moving fast, the two-part signature this project&#39;s typology is built to catch.
<code class="markdown">improving-vulnerable</code> is deliberately ambiguous (see the <a href="/gentriduck/methodology" class="markdown">methodology page</a>) —
rising status in an area that started out deprived reads as good news and displacement risk at
once.`,wt,oe,ca='<a href="#highest-pressure-neighbourhoods">Highest-pressure neighbourhoods</a>',$t,Re,ma=`The ten planning areas currently showing the strongest gentrification-pressure signal (a
"negative" trend) for the latest period.`,yt,Ve,Le,bt,Ae,ha=`<strong class="markdown">What to notice:</strong> this table re-sorts itself every time the underlying MSS/EWR editions update —
it is not a fixed watch-list, it is whatever the latest official data currently flags. Areas that
combine a deprived <code class="markdown">status_class</code> with a fast <code class="markdown">dynamism_class</code> trend are the ones under the most
pressure right now; areas already <code class="markdown">stable-established</code> rarely appear here even with a strong trend,
because they started from a position with less room to fall.`,kt,de,fa='<a href="#does-this-agree-with-what-we-already-know">Does this agree with what we already know?</a>',xt,Ee,pa=`Before trusting a headline like the one above, it is worth asking: does this index recognise
the Berlin neighbourhoods that housing researchers describe as under gentrification pressure — or as
stable, affluent areas? The project runs a back-test whenever the index changes
(<code class="markdown">docs/methodology/backtest.md</code>). It is worth reading for what it is, and what it is not:`,Ct,qe,_a=`<li class="markdown"><strong class="markdown">Pipeline-integrity checks, not validation.</strong> The index&#39;s status column <em class="markdown">is</em> the official MSS
status class, so comparing the two gives Spearman rho = 1.00 by construction. That check catches
pipeline breakage (a vintage mismatch, a flipped sign); it says nothing about whether the index
measures gentrification.</li> <li class="markdown"><strong class="markdown">Label consistency.</strong> 8 literature-documented gentrification hotspots — Neukölln&#39;s Rollberg,
Wartheplatz and Silbersteinstraße (the Reuterkiez/Schillerkiez area), Mitte&#39;s Koloniestraße and
Soldiner Straße (Wedding/Gesundbrunnen), and Friedrichshain-Kreuzberg&#39;s Wassertorplatz and
Prinzenstraße — all land in the most-deprived MSS status band, and 6 stable, affluent outer-city
PLRs (Alt-Gatow, Wannsee, Nikolassee, Dahlem and similar) all land in the least-deprived band. But
2 of the 8 hotspot labels and all 6 stable-area labels were themselves taken from MSS status
classes, and because the status column takes only four values, the &quot;top decile&quot; they are scored
against actually covers 17% of PLRs. These recalls are far easier than they look.</li> <li class="markdown"><strong class="markdown">The one partially independent check.</strong> Areas the index places in an upgrading stage are more
often under Milieuschutz (social preservation) designation, which the districts decide from their
own studies of upgrading and displacement pressure: 57% against 42% for other areas (odds ratio
1.84, interval 1.02–3.41). The exact test just misses significance (p = 0.0525), so this is weak
support. It is only partly independent: the designation studies use some of the same social
indicators, and district policy varies a lot.</li>`,Tt,Se,ga=`In short: the index is internally consistent, it does not mistake Wannsee for a hotspot, and the one
external check points weakly in the expected direction. That is not proof that it measures
gentrification. The full methodology, thresholds, and PLR-by-PLR detail are in
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/backtest.md" rel="nofollow" class="markdown"><code class="markdown">docs/methodology/backtest.md</code></a>.`,Ht,Je,Mt,ue,va='<a href="#honest-caveats">Honest caveats</a>',Rt,Be,wa=`<li class="markdown">A <strong class="markdown">negative</strong> trend is the one this project reads as <strong class="markdown">higher</strong> gentrification pressure; a
<strong class="markdown">positive</strong> trend means <strong class="markdown">lower</strong> pressure. A <strong class="markdown">low</strong> status class means <strong class="markdown">lower</strong> deprivation
(a wealthier area) — so &quot;low&quot; is not the same as &quot;bad.&quot; The
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> page is the full decoder;
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md" rel="nofollow" class="markdown">ADR-0004</a>
is the technical spec.</li> <li class="markdown"><strong class="markdown">&quot;Improving&quot; is not automatically good news.</strong> Rising status is also the signature of
gentrification — that is exactly why the <code class="markdown">improving-vulnerable</code> stage above is deliberately
ambiguous rather than a straightforward &quot;good&quot; result (see <a href="/gentriduck/methodology" class="markdown">methodology</a> §3).</li> <li class="markdown">Open data can observe socio-economic upgrading and demographic recomposition; <strong class="markdown">it cannot
observe that a specific household was involuntarily displaced.</strong> Every figure on this page
describes an aggregate area of a few thousand residents, never a person, household, or building,
and the project uses risk/pressure language throughout rather than a claim that displacement has
occurred (full statement: <a href="/gentriduck/methodology" class="markdown">methodology</a> §6).</li> <li class="markdown">The commerce ↔ social-status relationship above is an association, and a modest one: the local
business mix goes with an area&#39;s social status, but we find no detectable ordering between
commercial change and change in officially measured disadvantage.
<a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked</a> shows this hypothesis by hypothesis rather than
behind one headline number.</li>`,Lt,Ze,At,ce,$a='<a href="#pick-your-path">Pick your path</a>',Et,De,qt,je,ya="Gentriduck speaks to five audiences. Start wherever you fit:",St,Pe,Bt,et,Dt,We,tt,me=typeof H<"u"&&H.title&&H.hide_title!==!0&&ds();function Pa(e,l){return typeof H<"u"&&H.title?cs:us}let at=Pa()(h),he=typeof H=="object"&&ms();d=new Ka({props:{eyebrow:"A 2018 Berlin master's thesis, revived — built by a supervised team of AI agents",title:"Gentriduck",lede:"A live, public statistics project tracking gentrification pressure across neighbourhoods in Berlin — and, since 2026, Hamburg — on a free, open, local-first data stack. Everything here runs on open, official data — each city's own social-monitoring reports, population register, OpenStreetMap, and official land-value/rent references — and every figure describes a small area of a few thousand residents, never a person, household, or building.",$$slots:{default:[ps]},$$scope:{ctx:h}}}),S=new Kt({props:{$$slots:{default:[_s]},$$scope:{ctx:h}}}),J=new Ya({}),U=new es({props:{status:"info",$$slots:{default:[gs]},$$scope:{ctx:h}}}),V=new Kt({props:{$$slots:{default:[vs]},$$scope:{ctx:h}}}),$e=new ns({props:{name:"variant",title:"Data",defaultValue:"live_data",$$slots:{default:[ws]},$$scope:{ctx:h}}});let D=h[0]&&Sa(h),j=h[1]&&Ba(h);ye=new Jt({props:{data:h[1],value:"areas_monitored",title:"Areas monitored"}}),be=new Jt({props:{data:h[1],value:"high_pressure_areas",title:"High gentrification pressure",fmt:"0"}}),ke=new Jt({props:{data:h[1],value:"low_pressure_areas",title:"Low gentrification pressure",fmt:"0"}});let P=h[2]&&Da(h);He=new ls({props:{data:h[2],title:"Berlin neighbourhoods by gentrification stage, "+h[0][0].period,x:"stage",y:"area_count",swapXY:"true",xAxisTitle:"Number of areas",yAxisTitle:"Stage"}});let I=h[3]&&ja(h);return Le=new Ja({props:{data:h[3],rows:"10",$$slots:{default:[$s]},$$scope:{ctx:h}}}),De=new Kt({props:{$$slots:{default:[ys]},$$scope:{ctx:h}}}),Pe=new Xa({props:{$$slots:{default:[Hs]},$$scope:{ctx:h}}}),We=new Va({}),{c(){me&&me.c(),a=_(),at.c(),t=v("meta"),i=v("meta"),he&&he.c(),o=zt(),n=_(),q(d.$$.fragment),u=_(),w=v("hr"),f=_(),b=v("h2"),b.innerHTML=c,$=_(),q(S.$$.fragment),T=_(),x=v("p"),x.innerHTML=ie,X=_(),N=v("p"),N.textContent=Z,ee=_(),q(J.$$.fragment),fe=_(),Q=v("p"),Q.innerHTML=te,Y=_(),q(U.$$.fragment),pe=_(),ne=v("hr"),_e=_(),z=v("h2"),z.innerHTML=ae,se=_(),q(V.$$.fragment),ge=_(),K=v("p"),K.innerHTML=B,Ge=_(),ve=v("p"),ve.innerHTML=ea,nt=_(),we=v("p"),we.innerHTML=ta,rt=_(),Ke=v("hr"),lt=_(),re=v("h2"),re.innerHTML=aa,ot=_(),q($e.$$.fragment),dt=_(),D&&D.c(),Oe=_(),j&&j.c(),Ue=_(),q(ye.$$.fragment),ut=_(),q(be.$$.fragment),ct=_(),q(ke.$$.fragment),mt=_(),F=v("p"),Nt=R("Figures reflect the most recent available reporting period: "),Qe=v("strong"),ht=R(Xe),Wt=R(`. A
`),ze=v("em"),ze.textContent=sa,Gt=R(" trend is the one this project reads as "),Fe=v("strong"),Fe.textContent=ia,Ot=R(` gentrification pressure — full
plain-language decoder on the `),xe=v("a"),xe.textContent=na,Ut=R(`. For the full Berlin deep-dive —
maps, per-neighbourhood profiles, time series, and the commercial-mix data — start at the
`),Ne=v("strong"),Ne.innerHTML=ra,Qt=R("."),ft=_(),Ce=v("p"),Ce.innerHTML=la,pt=_(),le=v("h3"),le.innerHTML=oa,_t=_(),Te=v("p"),Te.innerHTML=da,gt=_(),P&&P.c(),Ye=_(),q(He.$$.fragment),vt=_(),Me=v("p"),Me.innerHTML=ua,wt=_(),oe=v("h3"),oe.innerHTML=ca,$t=_(),Re=v("p"),Re.textContent=ma,yt=_(),I&&I.c(),Ve=_(),q(Le.$$.fragment),bt=_(),Ae=v("p"),Ae.innerHTML=ha,kt=_(),de=v("h3"),de.innerHTML=fa,xt=_(),Ee=v("p"),Ee.innerHTML=pa,Ct=_(),qe=v("ul"),qe.innerHTML=_a,Tt=_(),Se=v("p"),Se.innerHTML=ga,Ht=_(),Je=v("hr"),Mt=_(),ue=v("h2"),ue.innerHTML=va,Rt=_(),Be=v("ul"),Be.innerHTML=wa,Lt=_(),Ze=v("hr"),At=_(),ce=v("h2"),ce.innerHTML=$a,Et=_(),q(De.$$.fragment),qt=_(),je=v("p"),je.textContent=ya,St=_(),q(Pe.$$.fragment),Bt=_(),et=v("hr"),Dt=_(),q(We.$$.fragment),this.h()},l(e){me&&me.l(e),a=p(e);const l=Fa("svelte-2igo1p",document.head);at.l(l),t=g(l,"META",{name:!0,content:!0}),i=g(l,"META",{name:!0,content:!0}),he&&he.l(l),o=zt(),l.forEach(s),n=p(e),E(d.$$.fragment,e),u=p(e),w=g(e,"HR",{class:!0}),f=p(e),b=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),y(b)!=="svelte-1us9auz"&&(b.innerHTML=c),$=p(e),E(S.$$.fragment,e),T=p(e),x=g(e,"P",{class:!0,"data-svelte-h":!0}),y(x)!=="svelte-slqkev"&&(x.innerHTML=ie),X=p(e),N=g(e,"P",{class:!0,"data-svelte-h":!0}),y(N)!=="svelte-11eolut"&&(N.textContent=Z),ee=p(e),E(J.$$.fragment,e),fe=p(e),Q=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Q)!=="svelte-1qje0p3"&&(Q.innerHTML=te),Y=p(e),E(U.$$.fragment,e),pe=p(e),ne=g(e,"HR",{class:!0}),_e=p(e),z=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),y(z)!=="svelte-24guds"&&(z.innerHTML=ae),se=p(e),E(V.$$.fragment,e),ge=p(e),K=g(e,"P",{class:!0,"data-svelte-h":!0}),y(K)!=="svelte-11xz6jt"&&(K.innerHTML=B),Ge=p(e),ve=g(e,"P",{class:!0,"data-svelte-h":!0}),y(ve)!=="svelte-tcljvj"&&(ve.innerHTML=ea),nt=p(e),we=g(e,"P",{class:!0,"data-svelte-h":!0}),y(we)!=="svelte-1mtg6xo"&&(we.innerHTML=ta),rt=p(e),Ke=g(e,"HR",{class:!0}),lt=p(e),re=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),y(re)!=="svelte-3kqp6y"&&(re.innerHTML=aa),ot=p(e),E($e.$$.fragment,e),dt=p(e),D&&D.l(e),Oe=p(e),j&&j.l(e),Ue=p(e),E(ye.$$.fragment,e),ut=p(e),E(be.$$.fragment,e),ct=p(e),E(ke.$$.fragment,e),mt=p(e),F=g(e,"P",{class:!0});var G=Zt(F);Nt=M(G,"Figures reflect the most recent available reporting period: "),Qe=g(G,"STRONG",{class:!0});var st=Zt(Qe);ht=M(st,Xe),st.forEach(s),Wt=M(G,`. A
`),ze=g(G,"EM",{class:!0,"data-svelte-h":!0}),y(ze)!=="svelte-15o4c6z"&&(ze.textContent=sa),Gt=M(G," trend is the one this project reads as "),Fe=g(G,"STRONG",{class:!0,"data-svelte-h":!0}),y(Fe)!=="svelte-1k171vv"&&(Fe.textContent=ia),Ot=M(G,` gentrification pressure — full
plain-language decoder on the `),xe=g(G,"A",{href:!0,class:!0,"data-svelte-h":!0}),y(xe)!=="svelte-x3j765"&&(xe.textContent=na),Ut=M(G,`. For the full Berlin deep-dive —
maps, per-neighbourhood profiles, time series, and the commercial-mix data — start at the
`),Ne=g(G,"STRONG",{class:!0,"data-svelte-h":!0}),y(Ne)!=="svelte-1h2q96s"&&(Ne.innerHTML=ra),Qt=M(G,"."),G.forEach(s),ft=p(e),Ce=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Ce)!=="svelte-mfbo4z"&&(Ce.innerHTML=la),pt=p(e),le=g(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),y(le)!=="svelte-b3lu50"&&(le.innerHTML=oa),_t=p(e),Te=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Te)!=="svelte-1vvhkub"&&(Te.innerHTML=da),gt=p(e),P&&P.l(e),Ye=p(e),E(He.$$.fragment,e),vt=p(e),Me=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Me)!=="svelte-1w5vu7y"&&(Me.innerHTML=ua),wt=p(e),oe=g(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),y(oe)!=="svelte-1nv8x8i"&&(oe.innerHTML=ca),$t=p(e),Re=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Re)!=="svelte-1o3qmoa"&&(Re.textContent=ma),yt=p(e),I&&I.l(e),Ve=p(e),E(Le.$$.fragment,e),bt=p(e),Ae=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Ae)!=="svelte-11or0th"&&(Ae.innerHTML=ha),kt=p(e),de=g(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),y(de)!=="svelte-qr6boj"&&(de.innerHTML=fa),xt=p(e),Ee=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Ee)!=="svelte-1c8tzx6"&&(Ee.innerHTML=pa),Ct=p(e),qe=g(e,"UL",{class:!0,"data-svelte-h":!0}),y(qe)!=="svelte-1orwum1"&&(qe.innerHTML=_a),Tt=p(e),Se=g(e,"P",{class:!0,"data-svelte-h":!0}),y(Se)!=="svelte-1fa6w0x"&&(Se.innerHTML=ga),Ht=p(e),Je=g(e,"HR",{class:!0}),Mt=p(e),ue=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),y(ue)!=="svelte-ad0syq"&&(ue.innerHTML=va),Rt=p(e),Be=g(e,"UL",{class:!0,"data-svelte-h":!0}),y(Be)!=="svelte-nv87ef"&&(Be.innerHTML=wa),Lt=p(e),Ze=g(e,"HR",{class:!0}),At=p(e),ce=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),y(ce)!=="svelte-1lqu8qx"&&(ce.innerHTML=$a),Et=p(e),E(De.$$.fragment,e),qt=p(e),je=g(e,"P",{class:!0,"data-svelte-h":!0}),y(je)!=="svelte-vcjj2j"&&(je.textContent=ya),St=p(e),E(Pe.$$.fragment,e),Bt=p(e),et=g(e,"HR",{class:!0}),Dt=p(e),E(We.$$.fragment,e),this.h()},h(){m(t,"name","twitter:card"),m(t,"content","summary_large_image"),m(i,"name","twitter:site"),m(i,"content","@evidence_dev"),m(w,"class","markdown"),m(b,"class","markdown"),m(b,"id","built-by-a-team-of-ai-agents--with-a-human-at-the-wheel"),m(x,"class","markdown"),m(N,"class","markdown"),m(Q,"class","markdown"),m(ne,"class","markdown"),m(z,"class","markdown"),m(z,"id","the-finding"),m(K,"class","markdown"),m(ve,"class","markdown"),m(we,"class","markdown"),m(Ke,"class","markdown"),m(re,"class","markdown"),m(re,"id","berlin-right-now"),m(Qe,"class","markdown"),m(ze,"class","markdown"),m(Fe,"class","markdown"),m(xe,"href","/gentriduck/methodology"),m(xe,"class","markdown"),m(Ne,"class","markdown"),m(F,"class","markdown"),m(Ce,"class","markdown"),m(le,"class","markdown"),m(le,"id","where-each-neighbourhood-sits-in-the-gentrification-cycle"),m(Te,"class","markdown"),m(Me,"class","markdown"),m(oe,"class","markdown"),m(oe,"id","highest-pressure-neighbourhoods"),m(Re,"class","markdown"),m(Ae,"class","markdown"),m(de,"class","markdown"),m(de,"id","does-this-agree-with-what-we-already-know"),m(Ee,"class","markdown"),m(qe,"class","markdown"),m(Se,"class","markdown"),m(Je,"class","markdown"),m(ue,"class","markdown"),m(ue,"id","honest-caveats"),m(Be,"class","markdown"),m(Ze,"class","markdown"),m(ce,"class","markdown"),m(ce,"id","pick-your-path"),m(je,"class","markdown"),m(et,"class","markdown")},m(e,l){me&&me.m(e,l),r(e,a,l),at.m(document.head,null),W(document.head,t),W(document.head,i),he&&he.m(document.head,null),W(document.head,o),r(e,n,l),A(d,e,l),r(e,u,l),r(e,w,l),r(e,f,l),r(e,b,l),r(e,$,l),A(S,e,l),r(e,T,l),r(e,x,l),r(e,X,l),r(e,N,l),r(e,ee,l),A(J,e,l),r(e,fe,l),r(e,Q,l),r(e,Y,l),A(U,e,l),r(e,pe,l),r(e,ne,l),r(e,_e,l),r(e,z,l),r(e,se,l),A(V,e,l),r(e,ge,l),r(e,K,l),r(e,Ge,l),r(e,ve,l),r(e,nt,l),r(e,we,l),r(e,rt,l),r(e,Ke,l),r(e,lt,l),r(e,re,l),r(e,ot,l),A($e,e,l),r(e,dt,l),D&&D.m(e,l),r(e,Oe,l),j&&j.m(e,l),r(e,Ue,l),A(ye,e,l),r(e,ut,l),A(be,e,l),r(e,ct,l),A(ke,e,l),r(e,mt,l),r(e,F,l),W(F,Nt),W(F,Qe),W(Qe,ht),W(F,Wt),W(F,ze),W(F,Gt),W(F,Fe),W(F,Ot),W(F,xe),W(F,Ut),W(F,Ne),W(F,Qt),r(e,ft,l),r(e,Ce,l),r(e,pt,l),r(e,le,l),r(e,_t,l),r(e,Te,l),r(e,gt,l),P&&P.m(e,l),r(e,Ye,l),A(He,e,l),r(e,vt,l),r(e,Me,l),r(e,wt,l),r(e,oe,l),r(e,$t,l),r(e,Re,l),r(e,yt,l),I&&I.m(e,l),r(e,Ve,l),A(Le,e,l),r(e,bt,l),r(e,Ae,l),r(e,kt,l),r(e,de,l),r(e,xt,l),r(e,Ee,l),r(e,Ct,l),r(e,qe,l),r(e,Tt,l),r(e,Se,l),r(e,Ht,l),r(e,Je,l),r(e,Mt,l),r(e,ue,l),r(e,Rt,l),r(e,Be,l),r(e,Lt,l),r(e,Ze,l),r(e,At,l),r(e,ce,l),r(e,Et,l),A(De,e,l),r(e,qt,l),r(e,je,l),r(e,St,l),A(Pe,e,l),r(e,Bt,l),r(e,et,l),r(e,Dt,l),A(We,e,l),tt=!0},p(e,l){typeof H<"u"&&H.title&&H.hide_title!==!0&&me.p(e,l),at.p(e,l),typeof H=="object"&&he.p(e,l);const G={};l[1]&32&&(G.$$scope={dirty:l,ctx:e}),d.$set(G);const st={};l[1]&32&&(st.$$scope={dirty:l,ctx:e}),S.$set(st);const ba={};l[1]&32&&(ba.$$scope={dirty:l,ctx:e}),U.$set(ba);const ka={};l[1]&32&&(ka.$$scope={dirty:l,ctx:e}),V.$set(ka);const xa={};l[1]&32&&(xa.$$scope={dirty:l,ctx:e}),$e.$set(xa),e[0]?D?(D.p(e,l),l[0]&1&&k(D,1)):(D=Sa(e),D.c(),k(D,1),D.m(Oe.parentNode,Oe)):D&&(Pt(),C(D,1,1,()=>{D=null}),jt()),e[1]?j?(j.p(e,l),l[0]&2&&k(j,1)):(j=Ba(e),j.c(),k(j,1),j.m(Ue.parentNode,Ue)):j&&(Pt(),C(j,1,1,()=>{j=null}),jt());const Ca={};l[0]&2&&(Ca.data=e[1]),ye.$set(Ca);const Ta={};l[0]&2&&(Ta.data=e[1]),be.$set(Ta);const Ha={};l[0]&2&&(Ha.data=e[1]),ke.$set(Ha),(!tt||l[0]&1)&&Xe!==(Xe=e[0][0].period+"")&&za(ht,Xe),e[2]?P?(P.p(e,l),l[0]&4&&k(P,1)):(P=Da(e),P.c(),k(P,1),P.m(Ye.parentNode,Ye)):P&&(Pt(),C(P,1,1,()=>{P=null}),jt());const Yt={};l[0]&4&&(Yt.data=e[2]),l[0]&1&&(Yt.title="Berlin neighbourhoods by gentrification stage, "+e[0][0].period),He.$set(Yt),e[3]?I?(I.p(e,l),l[0]&8&&k(I,1)):(I=ja(e),I.c(),k(I,1),I.m(Ve.parentNode,Ve)):I&&(Pt(),C(I,1,1,()=>{I=null}),jt());const Vt={};l[0]&8&&(Vt.data=e[3]),l[1]&32&&(Vt.$$scope={dirty:l,ctx:e}),Le.$set(Vt);const Ma={};l[1]&32&&(Ma.$$scope={dirty:l,ctx:e}),De.$set(Ma);const Ra={};l[1]&32&&(Ra.$$scope={dirty:l,ctx:e}),Pe.$set(Ra)},i(e){tt||(k(d.$$.fragment,e),k(S.$$.fragment,e),k(J.$$.fragment,e),k(U.$$.fragment,e),k(V.$$.fragment,e),k($e.$$.fragment,e),k(D),k(j),k(ye.$$.fragment,e),k(be.$$.fragment,e),k(ke.$$.fragment,e),k(P),k(He.$$.fragment,e),k(I),k(Le.$$.fragment,e),k(De.$$.fragment,e),k(Pe.$$.fragment,e),k(We.$$.fragment,e),tt=!0)},o(e){C(d.$$.fragment,e),C(S.$$.fragment,e),C(J.$$.fragment,e),C(U.$$.fragment,e),C(V.$$.fragment,e),C($e.$$.fragment,e),C(D),C(j),C(ye.$$.fragment,e),C(be.$$.fragment,e),C(ke.$$.fragment,e),C(P),C(He.$$.fragment,e),C(I),C(Le.$$.fragment,e),C(De.$$.fragment,e),C(Pe.$$.fragment,e),C(We.$$.fragment,e),tt=!1},d(e){e&&(s(a),s(n),s(u),s(w),s(f),s(b),s($),s(T),s(x),s(X),s(N),s(ee),s(fe),s(Q),s(Y),s(pe),s(ne),s(_e),s(z),s(se),s(ge),s(K),s(Ge),s(ve),s(nt),s(we),s(rt),s(Ke),s(lt),s(re),s(ot),s(dt),s(Oe),s(Ue),s(ut),s(ct),s(mt),s(F),s(ft),s(Ce),s(pt),s(le),s(_t),s(Te),s(gt),s(Ye),s(vt),s(Me),s(wt),s(oe),s($t),s(Re),s(yt),s(Ve),s(bt),s(Ae),s(kt),s(de),s(xt),s(Ee),s(Ct),s(qe),s(Tt),s(Se),s(Ht),s(Je),s(Mt),s(ue),s(Rt),s(Be),s(Lt),s(Ze),s(At),s(ce),s(Et),s(qt),s(je),s(St),s(Bt),s(et),s(Dt)),me&&me.d(e),at.d(e),s(t),s(i),he&&he.d(e),s(o),L(d,e),L(S,e),L(J,e),L(U,e),L(V,e),L($e,e),D&&D.d(e),j&&j.d(e),L(ye,e),L(be,e),L(ke,e),P&&P.d(e),L(He,e),I&&I.d(e),L(Le,e),L(De,e),L(Pe,e),L(We,e)}}}const H={title:"Gentriduck — Gentrification Index for Berlin & Hamburg"};function Rs(h,a,t){let i,o;La(h,rs,B=>t(23,i=B)),La(h,Ea,B=>t(28,o=B));let{data:n}=a,{data:d={},customFormattingSettings:u,__db:w,inputs:f}=n;Na(Ea,o="6666cd76f96956469e7be39d750cc7d9",o);let b=ts(Za(f));Wa(b.subscribe(B=>t(6,f=B))),Ga(is,{getCustomFormats:()=>u.customFormats||[]});const c=(B,Ge)=>os(w.query,B,{query_name:Ge});as(c),i.params,Oa(()=>!0);let $={initialData:void 0,initialError:void 0},S=Ie`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}' and city_code = 'BER'`,T=`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}' and city_code = 'BER'`;d.latest_period_data&&(d.latest_period_data instanceof Error?$.initialError=d.latest_period_data:$.initialData=d.latest_period_data,d.latest_period_columns&&($.knownColumns=d.latest_period_columns));let x,ie=!1;const X=It.createReactive({callback:B=>{t(0,x=B)},execFn:c},{id:"latest_period",...$});X(T,{noResolve:S,...$}),globalThis[Symbol.for("latest_period")]={get value(){return x}};let N={initialData:void 0,initialError:void 0},Z=Ie`select
    count(*) as areas_monitored,
    count(*) filter (where dynamism_class_bi = 'negative') as high_pressure_areas,
    count(*) filter (where dynamism_class_bi = 'positive') as low_pressure_areas
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'`,ee=`select
    count(*) as areas_monitored,
    count(*) filter (where dynamism_class_bi = 'negative') as high_pressure_areas,
    count(*) filter (where dynamism_class_bi = 'positive') as low_pressure_areas
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'`;d.headline_data&&(d.headline_data instanceof Error?N.initialError=d.headline_data:N.initialData=d.headline_data,d.headline_columns&&(N.knownColumns=d.headline_columns));let J,fe=!1;const Q=It.createReactive({callback:B=>{t(1,J=B)},execFn:c},{id:"headline",...N});Q(ee,{noResolve:Z,...N}),globalThis[Symbol.for("headline")]={get value(){return J}};let te={initialData:void 0,initialError:void 0},Y=Ie`select
    status_class as stage,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and status_class is not null
group by all
order by area_count desc`,U=`select
    status_class as stage,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and status_class is not null
group by all
order by area_count desc`;d.stage_distribution_data&&(d.stage_distribution_data instanceof Error?te.initialError=d.stage_distribution_data:te.initialData=d.stage_distribution_data,d.stage_distribution_columns&&(te.knownColumns=d.stage_distribution_columns));let pe,ne=!1;const _e=It.createReactive({callback:B=>{t(2,pe=B)},execFn:c},{id:"stage_distribution",...te});_e(U,{noResolve:Y,...te}),globalThis[Symbol.for("stage_distribution")]={get value(){return pe}};let z={initialData:void 0,initialError:void 0},ae=Ie`select
    area_name,
    status_class,
    dynamism_class
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and dynamism_class_bi = 'negative'
order by dynamism_index desc
limit 10`,se=`select
    area_name,
    status_class,
    dynamism_class
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and dynamism_class_bi = 'negative'
order by dynamism_index desc
limit 10`;d.top_pressure_data&&(d.top_pressure_data instanceof Error?z.initialError=d.top_pressure_data:z.initialData=d.top_pressure_data,d.top_pressure_columns&&(z.knownColumns=d.top_pressure_columns));let V,ge=!1;const K=It.createReactive({callback:B=>{t(3,V=B)},execFn:c},{id:"top_pressure",...z});return K(se,{noResolve:ae,...z}),globalThis[Symbol.for("top_pressure")]={get value(){return V}},h.$$set=B=>{"data"in B&&t(4,n=B.data)},h.$$.update=()=>{h.$$.dirty[0]&16&&t(5,{data:d={},customFormattingSettings:u,__db:w}=n,d),h.$$.dirty[0]&32&&ss.set(Object.keys(d).length>0),h.$$.dirty[0]&8388608&&i.params,h.$$.dirty[0]&64&&t(8,S=Ie`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}' and city_code = 'BER'`),h.$$.dirty[0]&64&&t(9,T=`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}' and city_code = 'BER'`),h.$$.dirty[0]&1920&&(S||!ie?S||(X(T,{noResolve:S,...$}),t(10,ie=!0)):X(T,{noResolve:S})),h.$$.dirty[0]&65&&t(12,Z=Ie`select
    count(*) as areas_monitored,
    count(*) filter (where dynamism_class_bi = 'negative') as high_pressure_areas,
    count(*) filter (where dynamism_class_bi = 'positive') as low_pressure_areas
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'`),h.$$.dirty[0]&65&&t(13,ee=`select
    count(*) as areas_monitored,
    count(*) filter (where dynamism_class_bi = 'negative') as high_pressure_areas,
    count(*) filter (where dynamism_class_bi = 'positive') as low_pressure_areas
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'`),h.$$.dirty[0]&30720&&(Z||!fe?Z||(Q(ee,{noResolve:Z,...N}),t(14,fe=!0)):Q(ee,{noResolve:Z})),h.$$.dirty[0]&65&&t(16,Y=Ie`select
    status_class as stage,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and status_class is not null
group by all
order by area_count desc`),h.$$.dirty[0]&65&&t(17,U=`select
    status_class as stage,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and status_class is not null
group by all
order by area_count desc`),h.$$.dirty[0]&491520&&(Y||!ne?Y||(_e(U,{noResolve:Y,...te}),t(18,ne=!0)):_e(U,{noResolve:Y})),h.$$.dirty[0]&65&&t(20,ae=Ie`select
    area_name,
    status_class,
    dynamism_class
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and dynamism_class_bi = 'negative'
order by dynamism_index desc
limit 10`),h.$$.dirty[0]&65&&t(21,se=`select
    area_name,
    status_class,
    dynamism_class
from gentriduck_marts.gentrification_index
where variant = '${f.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${f.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${x[0].period}'
  and dynamism_class_bi = 'negative'
order by dynamism_index desc
limit 10`),h.$$.dirty[0]&7864320&&(ae||!ge?ae||(K(se,{noResolve:ae,...z}),t(22,ge=!0)):K(se,{noResolve:ae}))},[x,J,pe,V,n,d,f,$,S,T,ie,N,Z,ee,fe,te,Y,U,ne,z,ae,se,ge,i]}class Vs extends Ua{constructor(a){super(),Qa(this,a,Rs,Ms,Ia,{data:4},null,[-1,-1])}}export{Vs as component};
