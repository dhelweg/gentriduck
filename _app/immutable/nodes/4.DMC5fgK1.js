import{s as ii,d as n,w as _a,i as r,a as W,b as m,c as h,h as ni,e as g,f as la,k as x,g as $t,j as T,l as _,m as v,t as S,n as Qa,o as si,p as ri,q as li,r as oi,u as U}from"../chunks/scheduler.wXRIqz25.js";import{S as di,i as ui,d as L,t as $,a as b,c as vt,m as R,b as M,e as B,g as wt}from"../chunks/index.uz5rP6Z2.js";import{A as ci}from"../chunks/AgentPipeline.BrCuCNlk.js";import{C as pa}from"../chunks/ChapterLabel.DDRHFypw.js";import{F as mi}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as fi}from"../chunks/Hero.C0o6T8tj.js";import{L as hi,a as yt}from"../chunks/LinkCards.5LR_0vQi.js";import{S as _i}from"../chunks/StageNumberLegend.DOZy85Oa.js";import{S as pi}from"../chunks/StatusTrendLegend.CS5WnfS4.js";import"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{w as gi}from"../chunks/entry.DotynpIs.js";import{A as vi}from"../chunks/Alert.DFISYc09.js";import{e as wi,s as yi,Q as bt,p as bi,a as Ya,r as Va,C as $i}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as de}from"../chunks/setTrackProxy.Cyfckp0w.js";import{D as ki,a as Ka}from"../chunks/Dropdown.Dl2mephJ.js";import{p as xi}from"../chunks/stores.DJGNasUV.js";import{Q as kt}from"../chunks/QueryViewer.RFckNDEV.js";import{B as Ci}from"../chunks/BarChart.Cy9nf948.js";import{B as et}from"../chunks/BigValue.Bpt9v-UH.js";import{p as Hi}from"../chunks/profile.BW8tN6E9.js";function Ti(c){let i,t=E.title+"",s;return{c(){i=v("h1"),s=S(t),this.h()},l(o){i=g(o,"H1",{class:!0});var l=$t(i);s=T(l,t),l.forEach(n),this.h()},h(){m(i,"class","title")},m(o,l){r(o,i,l),W(i,s)},p:U,d(o){o&&n(i)}}}function Si(c){return{c(){this.h()},l(i){this.h()},h(){document.title="Evidence"},m:U,p:U,d:U}}function Li(c){let i,t,s,o,l;return document.title=i=E.title,{c(){t=_(),s=v("meta"),o=_(),l=v("meta"),this.h()},l(d){t=h(d),s=g(d,"META",{property:!0,content:!0}),o=h(d),l=g(d,"META",{name:!0,content:!0}),this.h()},h(){var d,f;m(s,"property","og:title"),m(s,"content",((d=E.og)==null?void 0:d.title)??E.title),m(l,"name","twitter:title"),m(l,"content",((f=E.og)==null?void 0:f.title)??E.title)},m(d,f){r(d,t,f),r(d,s,f),r(d,o,f),r(d,l,f)},p(d,f){f&0&&i!==(i=E.title)&&(document.title=i)},d(d){d&&(n(t),n(s),n(o),n(l))}}}function Ri(c){var l,d;let i,t,s=(E.description||((l=E.og)==null?void 0:l.description))&&Mi(),o=((d=E.og)==null?void 0:d.image)&&Bi();return{c(){s&&s.c(),i=_(),o&&o.c(),t=la()},l(f){s&&s.l(f),i=h(f),o&&o.l(f),t=la()},m(f,w){s&&s.m(f,w),r(f,i,w),o&&o.m(f,w),r(f,t,w)},p(f,w){var p,k;(E.description||(p=E.og)!=null&&p.description)&&s.p(f,w),(k=E.og)!=null&&k.image&&o.p(f,w)},d(f){f&&(n(i),n(t)),s&&s.d(f),o&&o.d(f)}}}function Mi(c){let i,t,s,o,l;return{c(){i=v("meta"),t=_(),s=v("meta"),o=_(),l=v("meta"),this.h()},l(d){i=g(d,"META",{name:!0,content:!0}),t=h(d),s=g(d,"META",{property:!0,content:!0}),o=h(d),l=g(d,"META",{name:!0,content:!0}),this.h()},h(){var d,f,w;m(i,"name","description"),m(i,"content",E.description??((d=E.og)==null?void 0:d.description)),m(s,"property","og:description"),m(s,"content",((f=E.og)==null?void 0:f.description)??E.description),m(l,"name","twitter:description"),m(l,"content",((w=E.og)==null?void 0:w.description)??E.description)},m(d,f){r(d,i,f),r(d,t,f),r(d,s,f),r(d,o,f),r(d,l,f)},p:U,d(d){d&&(n(i),n(t),n(s),n(o),n(l))}}}function Bi(c){let i,t,s;return{c(){i=v("meta"),t=_(),s=v("meta"),this.h()},l(o){i=g(o,"META",{property:!0,content:!0}),t=h(o),s=g(o,"META",{name:!0,content:!0}),this.h()},h(){var o,l;m(i,"property","og:image"),m(i,"content",Ya((o=E.og)==null?void 0:o.image)),m(s,"name","twitter:image"),m(s,"content",Ya((l=E.og)==null?void 0:l.image))},m(o,l){r(o,i,l),r(o,t,l),r(o,s,l)},p:U,d(o){o&&(n(i),n(t),n(s))}}}function Ei(c){let i,t="How it's organised →",s,o,l="What we found →",d,f,w="How we measure it →";return{c(){i=v("a"),i.textContent=t,s=_(),o=v("a"),o.textContent=l,d=_(),f=v("a"),f.textContent=w,this.h()},l(p){i=g(p,"A",{href:!0,class:!0,"data-svelte-h":!0}),x(i)!=="svelte-1ap5o98"&&(i.textContent=t),s=h(p),o=g(p,"A",{href:!0,class:!0,"data-svelte-h":!0}),x(o)!=="svelte-17wu6fx"&&(o.textContent=l),d=h(p),f=g(p,"A",{href:!0,class:!0,"data-svelte-h":!0}),x(f)!=="svelte-tfe2jh"&&(f.textContent=w),this.h()},h(){m(i,"href","/gentriduck/how-its-organised"),m(i,"class","primary"),m(o,"href","#the-finding"),m(o,"class","secondary"),m(f,"href","/gentriduck/methodology"),m(f,"class","secondary")},m(p,k){r(p,i,k),r(p,s,k),r(p,o,k),r(p,d,k),r(p,f,k)},p:U,d(p){p&&(n(i),n(s),n(o),n(d),n(f))}}}function Ai(c){let i;return{c(){i=S("Chapter 2 — The Revival")},l(t){i=T(t,"Chapter 2 — The Revival")},m(t,s){r(t,i,s)},d(t){t&&n(i)}}}function qi(c){let i,t,s="about page",o,l,d="project timeline",f,w,p="GitHub repository",k;return{c(){i=S(`Curious how a multi-agent system builds this statistics site under an enforced methodology gate? The
  `),t=v("a"),t.textContent=s,o=S(` walks through the full workflow, the enforced "free & open only"
  rules, and the methodology gate — the `),l=v("a"),l.textContent=d,f=S(` lays out every
  milestone, dated and source-cited — or read the agent definitions and Architecture Decision Records
  directly in the `),w=v("a"),w.textContent=p,k=S("."),this.h()},l(u){i=T(u,`Curious how a multi-agent system builds this statistics site under an enforced methodology gate? The
  `),t=g(u,"A",{href:!0,"data-svelte-h":!0}),x(t)!=="svelte-1toknon"&&(t.textContent=s),o=T(u,` walks through the full workflow, the enforced "free & open only"
  rules, and the methodology gate — the `),l=g(u,"A",{href:!0,"data-svelte-h":!0}),x(l)!=="svelte-1388bv5"&&(l.textContent=d),f=T(u,` lays out every
  milestone, dated and source-cited — or read the agent definitions and Architecture Decision Records
  directly in the `),w=g(u,"A",{href:!0,"data-svelte-h":!0}),x(w)!=="svelte-dgjine"&&(w.textContent=p),k=T(u,"."),this.h()},h(){m(t,"href","/gentriduck/about"),m(l,"href","/gentriduck/timeline"),m(w,"href","https://github.com/dhelweg/gentriduck")},m(u,y){r(u,i,y),r(u,t,y),r(u,o,y),r(u,l,y),r(u,f,y),r(u,w,y),r(u,k,y)},p:U,d(u){u&&(n(i),n(t),n(o),n(l),n(f),n(w),n(k))}}}function Ii(c){let i;return{c(){i=S("Chapter 3 — The Evidence")},l(t){i=T(t,"Chapter 3 — The Evidence")},m(t,s){r(t,i,s)},d(t){t&&n(i)}}}function Di(c){let i,t,s,o;return i=new Ka({props:{value:"live_data",valueLabel:"Live data (latest MSS editions, 2013–2025)"}}),s=new Ka({props:{value:"standard",valueLabel:"2018 thesis reproduction (Dec 2016 snapshot)"}}),{c(){B(i.$$.fragment),t=_(),B(s.$$.fragment)},l(l){M(i.$$.fragment,l),t=h(l),M(s.$$.fragment,l)},m(l,d){R(i,l,d),r(l,t,d),R(s,l,d),o=!0},p:U,i(l){o||(b(i.$$.fragment,l),b(s.$$.fragment,l),o=!0)},o(l){$(i.$$.fragment,l),$(s.$$.fragment,l),o=!1},d(l){l&&n(t),L(i,l),L(s,l)}}}function Xa(c){let i,t;return i=new kt({props:{queryID:"latest_period",queryResult:c[0]}}),{c(){B(i.$$.fragment)},l(s){M(i.$$.fragment,s)},m(s,o){R(i,s,o),t=!0},p(s,o){const l={};o[0]&1&&(l.queryResult=s[0]),i.$set(l)},i(s){t||(b(i.$$.fragment,s),t=!0)},o(s){$(i.$$.fragment,s),t=!1},d(s){L(i,s)}}}function Ja(c){let i,t;return i=new kt({props:{queryID:"headline",queryResult:c[1]}}),{c(){B(i.$$.fragment)},l(s){M(i.$$.fragment,s)},m(s,o){R(i,s,o),t=!0},p(s,o){const l={};o[0]&2&&(l.queryResult=s[1]),i.$set(l)},i(s){t||(b(i.$$.fragment,s),t=!0)},o(s){$(i.$$.fragment,s),t=!1},d(s){L(i,s)}}}function Za(c){let i,t;return i=new kt({props:{queryID:"trend_ber",queryResult:c[2]}}),{c(){B(i.$$.fragment)},l(s){M(i.$$.fragment,s)},m(s,o){R(i,s,o),t=!0},p(s,o){const l={};o[0]&4&&(l.queryResult=s[2]),i.$set(l)},i(s){t||(b(i.$$.fragment,s),t=!0)},o(s){$(i.$$.fragment,s),t=!1},d(s){L(i,s)}}}function ei(c){let i,t;return i=new kt({props:{queryID:"trend_hh",queryResult:c[3]}}),{c(){B(i.$$.fragment)},l(s){M(i.$$.fragment,s)},m(s,o){R(i,s,o),t=!0},p(s,o){const l={};o[0]&8&&(l.queryResult=s[3]),i.$set(l)},i(s){t||(b(i.$$.fragment,s),t=!0)},o(s){$(i.$$.fragment,s),t=!1},d(s){L(i,s)}}}function ti(c){let i,t;return i=new kt({props:{queryID:"stage_distribution",queryResult:c[4]}}),{c(){B(i.$$.fragment)},l(s){M(i.$$.fragment,s)},m(s,o){R(i,s,o),t=!0},p(s,o){const l={};o[0]&16&&(l.queryResult=s[4]),i.$set(l)},i(s){t||(b(i.$$.fragment,s),t=!0)},o(s){$(i.$$.fragment,s),t=!1},d(s){L(i,s)}}}function Pi(c){let i;return{c(){i=S("Chapter 4 — What it means for you")},l(t){i=T(t,"Chapter 4 — What it means for you")},m(t,s){r(t,i,s)},d(t){t&&n(i)}}}function zi(c){let i,t,s="maps",o;return{c(){i=S(`Plain-language, honestly caveated takeaways on gentrification signals — each with a
    "what the data shows" link and an explicit "what this can NOT tell you" boundary — plus the
    `),t=v("a"),t.textContent=s,o=S(" and per-neighbourhood profiles behind them."),this.h()},l(l){i=T(l,`Plain-language, honestly caveated takeaways on gentrification signals — each with a
    "what the data shows" link and an explicit "what this can NOT tell you" boundary — plus the
    `),t=g(l,"A",{href:!0,"data-svelte-h":!0}),x(t)!=="svelte-vod8uv"&&(t.textContent=s),o=T(l," and per-neighbourhood profiles behind them."),this.h()},h(){m(t,"href","/gentriduck/berlin/maps")},m(l,d){r(l,i,d),r(l,t,d),r(l,o,d)},p:U,d(l){l&&(n(i),n(t),n(o))}}}function Fi(c){let i,t,s="2018 thesis re-checked",o,l,d="maps",f,w,p="area detail",k,u,y="time series",A;return{c(){i=S(`What the gentrification stages mean here and the theory behind the six-stage typology, the
    `),t=v("a"),t.textContent=s,o=S(` hypothesis by hypothesis, then the
    `),l=v("a"),l.textContent=d,f=S(", "),w=v("a"),w.textContent=p,k=S(`, and
    `),u=v("a"),u.textContent=y,A=S("."),this.h()},l(C){i=T(C,`What the gentrification stages mean here and the theory behind the six-stage typology, the
    `),t=g(C,"A",{href:!0,"data-svelte-h":!0}),x(t)!=="svelte-u6e7mg"&&(t.textContent=s),o=T(C,` hypothesis by hypothesis, then the
    `),l=g(C,"A",{href:!0,"data-svelte-h":!0}),x(l)!=="svelte-vod8uv"&&(l.textContent=d),f=T(C,", "),w=g(C,"A",{href:!0,"data-svelte-h":!0}),x(w)!=="svelte-1l5krna"&&(w.textContent=p),k=T(C,`, and
    `),u=g(C,"A",{href:!0,"data-svelte-h":!0}),x(u)!=="svelte-1v3m1ue"&&(u.textContent=y),A=T(C,"."),this.h()},h(){m(t,"href","/gentriduck/thesis-recheck"),m(l,"href","/gentriduck/berlin/maps"),m(w,"href","/gentriduck/berlin/area-detail"),m(u,"href","/gentriduck/berlin/time-series")},m(C,H){r(C,i,H),r(C,t,H),r(C,o,H),r(C,l,H),r(C,f,H),r(C,w,H),r(C,k,H),r(C,u,H),r(C,A,H)},p:U,d(C){C&&(n(i),n(t),n(o),n(l),n(f),n(w),n(k),n(u),n(A))}}}function Ni(c){let i,t,s="how it's built",o;return{c(){i=S(`What open data enabled here, the concrete friction encountered building on it, and
    standardization recommendations for data publishers — grounded in the same pipeline documented on
    `),t=v("a"),t.textContent=s,o=S("."),this.h()},l(l){i=T(l,`What open data enabled here, the concrete friction encountered building on it, and
    standardization recommendations for data publishers — grounded in the same pipeline documented on
    `),t=g(l,"A",{href:!0,"data-svelte-h":!0}),x(t)!=="svelte-1i3cbgj"&&(t.textContent=s),o=T(l,"."),this.h()},h(){m(t,"href","/gentriduck/how-its-built")},m(l,d){r(l,i,d),r(l,t,d),r(l,o,d)},p:U,d(l){l&&(n(i),n(t),n(o))}}}function ji(c){let i,t,s="GitHub repository",o;return{c(){i=S(`dbt + DuckDB, local-first, rebuilt from open sources with a full OpenStreetMap history back
    to 2008. The stack, the data sources, and a worked completeness-bias correction; every model,
    seed, and test lives in the
    `),t=v("a"),t.textContent=s,o=S("."),this.h()},l(l){i=T(l,`dbt + DuckDB, local-first, rebuilt from open sources with a full OpenStreetMap history back
    to 2008. The stack, the data sources, and a worked completeness-bias correction; every model,
    seed, and test lives in the
    `),t=g(l,"A",{href:!0,"data-svelte-h":!0}),x(t)!=="svelte-dgjine"&&(t.textContent=s),o=T(l,"."),this.h()},h(){m(t,"href","https://github.com/dhelweg/gentriduck")},m(l,d){r(l,i,d),r(l,t,d),r(l,o,d)},p:U,d(l){l&&(n(i),n(t),n(o))}}}function Wi(c){let i,t,s="project timeline",o,l,d="agent definitions",f,w,p="ADRs",k;return{c(){i=S(`A supervised multi-agent workflow with an enforced, adversarial methodology gate. The agent
    team, the pipeline that ships a change, the `),t=v("a"),t.textContent=s,o=S(` from
    thesis to today, then the
    `),l=v("a"),l.textContent=d,f=S(`
    and `),w=v("a"),w.textContent=p,k=S("."),this.h()},l(u){i=T(u,`A supervised multi-agent workflow with an enforced, adversarial methodology gate. The agent
    team, the pipeline that ships a change, the `),t=g(u,"A",{href:!0,"data-svelte-h":!0}),x(t)!=="svelte-1388bv5"&&(t.textContent=s),o=T(u,` from
    thesis to today, then the
    `),l=g(u,"A",{href:!0,"data-svelte-h":!0}),x(l)!=="svelte-btiar9"&&(l.textContent=d),f=T(u,`
    and `),w=g(u,"A",{href:!0,"data-svelte-h":!0}),x(w)!=="svelte-ouziig"&&(w.textContent=p),k=T(u,"."),this.h()},h(){m(t,"href","/gentriduck/timeline"),m(l,"href","https://github.com/dhelweg/gentriduck/tree/main/.claude/agents"),m(w,"href","https://github.com/dhelweg/gentriduck/tree/main/docs/adr")},m(u,y){r(u,i,y),r(u,t,y),r(u,o,y),r(u,l,y),r(u,f,y),r(u,w,y),r(u,k,y)},p:U,d(u){u&&(n(i),n(t),n(o),n(l),n(f),n(w),n(k))}}}function Oi(c){let i,t,s,o,l,d,f,w,p,k;return i=new yt({props:{href:"/gentriduck/takeaways",icon:"🏛️",title:"You work in housing policy or a local initiative",cta:"Start with takeaways →",$$slots:{default:[zi]},$$scope:{ctx:c}}}),s=new yt({props:{href:"/gentriduck/methodology",icon:"🏙️",title:"You study cities & gentrification",cta:"Start with methodology →",$$slots:{default:[Fi]},$$scope:{ctx:c}}}),l=new yt({props:{href:"/gentriduck/open-data",icon:"🔓",title:"You care about open data",cta:"Start with the open-data report →",$$slots:{default:[Ni]},$$scope:{ctx:c}}}),f=new yt({props:{href:"/gentriduck/how-its-built",icon:"⚙️",title:"You build data pipelines",cta:"Start with how it's built →",$$slots:{default:[ji]},$$scope:{ctx:c}}}),p=new yt({props:{href:"/gentriduck/how-its-organised",icon:"🤖",title:"You design AI systems",cta:"Start with how it's organised →",$$slots:{default:[Wi]},$$scope:{ctx:c}}}),{c(){B(i.$$.fragment),t=_(),B(s.$$.fragment),o=_(),B(l.$$.fragment),d=_(),B(f.$$.fragment),w=_(),B(p.$$.fragment)},l(u){M(i.$$.fragment,u),t=h(u),M(s.$$.fragment,u),o=h(u),M(l.$$.fragment,u),d=h(u),M(f.$$.fragment,u),w=h(u),M(p.$$.fragment,u)},m(u,y){R(i,u,y),r(u,t,y),R(s,u,y),r(u,o,y),R(l,u,y),r(u,d,y),R(f,u,y),r(u,w,y),R(p,u,y),k=!0},p(u,y){const A={};y[1]&2048&&(A.$$scope={dirty:y,ctx:u}),i.$set(A);const C={};y[1]&2048&&(C.$$scope={dirty:y,ctx:u}),s.$set(C);const H={};y[1]&2048&&(H.$$scope={dirty:y,ctx:u}),l.$set(H);const ue={};y[1]&2048&&(ue.$$scope={dirty:y,ctx:u}),f.$set(ue);const Z={};y[1]&2048&&(Z.$$scope={dirty:y,ctx:u}),p.$set(Z)},i(u){k||(b(i.$$.fragment,u),b(s.$$.fragment,u),b(l.$$.fragment,u),b(f.$$.fragment,u),b(p.$$.fragment,u),k=!0)},o(u){$(i.$$.fragment,u),$(s.$$.fragment,u),$(l.$$.fragment,u),$(f.$$.fragment,u),$(p.$$.fragment,u),k=!1},d(u){u&&(n(t),n(o),n(d),n(w)),L(i,u),L(s,u),L(l,u),L(f,u),L(p,u)}}}function Gi(c){var Ea,Aa;let i,t,s,o,l,d,f,w,p,k,u='<a href="#built-by-a-team-of-ai-agents--with-a-human-at-the-wheel">Built by a team of AI agents — with a human at the wheel</a>',y,A,C,H,ue=`Gentriduck is unusual: the data pipeline, the models, and this website are built and maintained
largely by a <strong class="markdown">team of specialised AI agents</strong> (running on
<a href="https://claude.com/claude-code" rel="nofollow" class="markdown">Claude Code</a>), each with one narrow job, working a shared backlog.
Nobody grades their own homework, and nothing sensitive ships without a person looking at it.`,Z,j,te="The work flows through a deliberately adversarial pipeline:",ae,ee,ye,Q,ie=`That last step is the point: the agents self-integrate onto an internal branch, but the published
site only ever advances through a <strong class="markdown">weekly pull request a human reviews and merges</strong>. It is
supervised autonomy, not a black box — and because the project is fully open, you can read every
agent definition, every architecture decision, and every line of SQL that produces a number here.`,Y,O,be,ce,$e,N,ne='<a href="#the-finding">The finding</a>',se,V,ke,K,re='<strong class="markdown">Does the 2018 thesis&#39;s result still hold in 2025? Partly — and that&#39;s the interesting part.</strong>',X,G,tt=`The original thesis asked whether the churn of shops, cafés and restaurants in a Berlin
neighbourhood tracks its social change. Re-tested in 2026 with a design fixed in advance, on both
the thesis&#39;s own era (2013–2019) and 2019–2025, two of its findings hold: an area&#39;s social status is
linked to its local business mix, modestly, and <strong class="markdown">fast food makes up a larger share of the
gastronomy mix where officially measured disadvantage is higher</strong>. Its tentative timing finding, that
a fall in disadvantage comes before commercial change, is not reproduced: we find no detectable
ordering between commercial change and change in officially measured disadvantage, in either
direction. We show where the thesis holds and where it does not, openly, rather than papering
over it.`,xe,J,q=`<strong class="markdown">→ <a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked hypothesis by hypothesis</a></strong> — the full comparison
of what the thesis claimed, what it found, and what our rebuild finds today.`,at,dt,xt,me,ga='<a href="#berlin-right-now">Berlin right now</a>',Ct,Ce,Ht,it,nt,st,He,Tt,fe,oa,rt,ut=c[0][0].period+"",St,da,Lt,le,Qe,va="Official status trend, Berlin",ua,ct=(((Ea=c[2][0])==null?void 0:Ea.period)??"—")+"",Rt,ca,Mt,Te,Bt,Se,Et,Le,At,Ye,qt,Re,wa=`Full plain-language decoder on the <a href="/gentriduck/methodology" class="markdown">methodology page</a>. For the full Berlin deep-dive —
maps, per-neighbourhood profiles, time series, and the commercial-mix data — start at the
<strong class="markdown"><a href="/gentriduck/berlin" class="markdown">Berlin data hub</a></strong>.`,It,Me,ya=`Gentriduck now also tracks <strong class="markdown">Hamburg</strong> — admitted 2026-07-18 after its own methodology gate, and
live since with the same kinds of views as Berlin: maps, a time series, a district browse,
per-area profiles, and a POI map. It is a narrower dataset than Berlin&#39;s, honestly scoped on its
own page: the <strong class="markdown"><a href="/gentriduck/hamburg" class="markdown">Hamburg data hub</a></strong>. To see the 2018 thesis&#39;s hypotheses tested in both
cities on matched areas and shared indicators, see
<strong class="markdown"><a href="/gentriduck/berlin-vs-hamburg" class="markdown">Berlin vs Hamburg, like for like</a></strong>.`,Dt,lt,oe,Ve,ba="Official status trend, Hamburg",ma,mt=(((Aa=c[3][0])==null?void 0:Aa.period)??"—")+"",Pt,fa,zt,Be,Ft,Ee,Nt,Ae,jt,he,$a='<a href="#where-each-neighbourhood-sits-in-the-gentrification-cycle">Where each neighbourhood sits in the gentrification cycle</a>',Wt,qe,ka=`Instead of a single blended score, the live index places every neighbourhood into one <strong class="markdown">stage</strong> of
the invasion–succession process — from 1 · Pre-gentrification through 3 · Pioneer signal and
4 · Active gentrification to 5 · Consolidation, plus 6 · Stable / established and the deliberately
ambiguous 2 · Improving from very low status. This staged
typology is the project&#39;s headline product; here is how Berlin&#39;s neighbourhoods distribute across
it today.`,Ot,ot,Ie,Gt,Ke,Ut,De,xa=`<strong class="markdown">What to notice:</strong> most of the city sits in 6 · Stable / established — Berlin is not one giant
gentrification wave. The smaller 3 · Pioneer signal and 4 · Active gentrification bars are areas
whose status is low or middle <em class="markdown">and</em> whose official trend is improving relative to the city, the two-part signature
this project&#39;s typology is built to pick up.
2 · Improving from very low status is deliberately ambiguous (see the <a href="/gentriduck/methodology" class="markdown">methodology page</a>) —
rising status in an area that started out deprived reads as good news and displacement risk at
once.`,Qt,_e,Ca='<a href="#does-this-agree-with-what-we-already-know">Does this agree with what we already know?</a>',Yt,Pe,Ha=`Before trusting a headline like the one above, it is worth asking: does this index recognise
the Berlin neighbourhoods that housing researchers describe as gentrifying — or as
stable, affluent areas? The project runs a back-test whenever the index changes
(<code class="markdown">docs/methodology/backtest.md</code>). It is worth reading for what it is, and what it is not:`,Vt,ze,Ta=`<li class="markdown"><strong class="markdown">Pipeline-integrity checks, not validation.</strong> The index&#39;s status column <em class="markdown">is</em> the official MSS
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
own studies of upgrading and displacement risk: 57% against 42% for other areas (odds ratio
1.84, interval 1.02–3.41). The exact test just misses significance (p = 0.0525), so this is weak
support. It is only partly independent: the designation studies use some of the same social
indicators, and district policy varies a lot.</li>`,Kt,Fe,Sa=`In short: the index is internally consistent, it does not mistake Wannsee for a hotspot, and the one
external check points weakly in the expected direction. That is not proof that it measures
gentrification. The full methodology, thresholds, and PLR-by-PLR detail are in
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/backtest.md" rel="nofollow" class="markdown"><code class="markdown">docs/methodology/backtest.md</code></a>.`,Xt,ft,Jt,pe,La='<a href="#honest-caveats">Honest caveats</a>',Zt,Ne,Ra=`<li class="markdown"><strong class="markdown">Status trend</strong> is the city&#39;s own official change class (Berlin: MSS Dynamik over 2 years;
Hamburg: Sozialmonitoring Dynamik over 3 years). It says whether an area&#39;s social-status
indicators <strong class="markdown">improved</strong>, stayed <strong class="markdown">stable</strong> or <strong class="markdown">worsened</strong> relative to the city as a whole. A
<strong class="markdown">low</strong> status class means <strong class="markdown">lower</strong> deprivation
(a wealthier area) — so &quot;low&quot; is not the same as &quot;bad.&quot; The
<a href="/gentriduck/methodology" class="markdown">methodology &amp; data sources</a> page is the full decoder;
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/adr/0004-data-governance-and-index-definition.md" rel="nofollow" class="markdown">ADR-0004</a>
is the technical spec.</li> <li class="markdown"><strong class="markdown">&quot;Improving&quot; is not automatically good news.</strong> Rising status is also the signature of
gentrification — that is exactly why the 2 · Improving from very low status stage above is deliberately
ambiguous rather than a straightforward &quot;good&quot; result (see <a href="/gentriduck/methodology" class="markdown">methodology</a> §3).</li> <li class="markdown">Open data can observe socio-economic upgrading and demographic recomposition; <strong class="markdown">it cannot
observe that a specific household was involuntarily displaced.</strong> Every figure on this page
describes an aggregate area of a few thousand residents, never a person, household, or building,
and the project uses risk and signal language throughout rather than a claim that displacement has
occurred (full statement: <a href="/gentriduck/methodology" class="markdown">methodology</a> §6).</li> <li class="markdown">The commerce ↔ social-status relationship above is an association, and a modest one: the local
business mix goes with an area&#39;s social status, but we find no detectable ordering between
commercial change and change in officially measured disadvantage.
<a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked</a> shows this hypothesis by hypothesis rather than
behind one headline number.</li>`,ea,ht,ta,ge,Ma='<a href="#pick-your-path">Pick your path</a>',aa,je,ia,We,Ba="Gentriduck speaks to five audiences. Start wherever you fit:",na,Oe,sa,_t,ra,Xe,Je,ve=typeof E<"u"&&E.title&&E.hide_title!==!0&&Ti();function ai(e,a){return typeof E<"u"&&E.title?Li:Si}let pt=ai()(c),we=typeof E=="object"&&Ri();d=new fi({props:{eyebrow:"A 2018 Berlin master's thesis, revived — built by a supervised team of AI agents",title:"Gentriduck",lede:"A live, public statistics project tracking signs of gentrification across neighbourhoods in Berlin — and, since 2026, Hamburg — on a free, open, local-first data stack. Everything here runs on open, official data — each city's own social-monitoring reports, population register, OpenStreetMap, and official land-value/rent references — and every figure describes a small area of a few thousand residents, never a person, household, or building.",$$slots:{default:[Ei]},$$scope:{ctx:c}}}),A=new pa({props:{$$slots:{default:[Ai]},$$scope:{ctx:c}}}),ee=new ci({}),O=new vi({props:{status:"info",$$slots:{default:[qi]},$$scope:{ctx:c}}}),V=new pa({props:{$$slots:{default:[Ii]},$$scope:{ctx:c}}}),Ce=new ki({props:{name:"variant",title:"Data",defaultValue:"live_data",$$slots:{default:[Di]},$$scope:{ctx:c}}});let I=c[0]&&Xa(c),D=c[1]&&Ja(c),P=c[2]&&Za(c);He=new et({props:{data:c[1],value:"areas_monitored",title:"Areas monitored"}}),Te=new et({props:{data:c[2],value:"n_improving",title:"Status improving",fmt:"0"}}),Se=new et({props:{data:c[2],value:"n_stable",title:"Status stable",fmt:"0"}}),Le=new et({props:{data:c[2],value:"n_worsening",title:"Status worsening",fmt:"0"}}),Ye=new pi({});let z=c[3]&&ei(c);Be=new et({props:{data:c[3],value:"n_improving",title:"Status improving",fmt:"0"}}),Ee=new et({props:{data:c[3],value:"n_stable",title:"Status stable",fmt:"0"}}),Ae=new et({props:{data:c[3],value:"n_worsening",title:"Status worsening",fmt:"0"}});let F=c[4]&&ti(c);return Ie=new Ci({props:{data:c[4],title:"Berlin neighbourhoods by gentrification stage, "+c[0][0].period,x:"stage",y:"area_count",swapXY:"true",sort:"false",chartAreaHeight:"300",echartsOptions:{yAxis:{axisLabel:{width:130,overflow:"break",interval:0,hideOverlap:!1}},grid:{left:16,containLabel:!0}},xAxisTitle:"Number of areas",yAxisTitle:"Stage"}}),Ke=new _i({}),je=new pa({props:{$$slots:{default:[Pi]},$$scope:{ctx:c}}}),Oe=new hi({props:{$$slots:{default:[Oi]},$$scope:{ctx:c}}}),Xe=new mi({}),{c(){ve&&ve.c(),i=_(),pt.c(),t=v("meta"),s=v("meta"),we&&we.c(),o=la(),l=_(),B(d.$$.fragment),f=_(),w=v("hr"),p=_(),k=v("h2"),k.innerHTML=u,y=_(),B(A.$$.fragment),C=_(),H=v("p"),H.innerHTML=ue,Z=_(),j=v("p"),j.textContent=te,ae=_(),B(ee.$$.fragment),ye=_(),Q=v("p"),Q.innerHTML=ie,Y=_(),B(O.$$.fragment),be=_(),ce=v("hr"),$e=_(),N=v("h2"),N.innerHTML=ne,se=_(),B(V.$$.fragment),ke=_(),K=v("p"),K.innerHTML=re,X=_(),G=v("p"),G.innerHTML=tt,xe=_(),J=v("p"),J.innerHTML=q,at=_(),dt=v("hr"),xt=_(),me=v("h2"),me.innerHTML=ga,Ct=_(),B(Ce.$$.fragment),Ht=_(),I&&I.c(),it=_(),D&&D.c(),nt=_(),P&&P.c(),st=_(),B(He.$$.fragment),Tt=_(),fe=v("p"),oa=S("Figures reflect the most recent available reporting period: "),rt=v("strong"),St=S(ut),da=S("."),Lt=_(),le=v("p"),Qe=v("strong"),Qe.textContent=va,ua=S(" (live data, MSS edition "),Rt=S(ct),ca=S(`; shown
whichever data option is selected above, since only the live data carries it):`),Mt=_(),B(Te.$$.fragment),Bt=_(),B(Se.$$.fragment),Et=_(),B(Le.$$.fragment),At=_(),B(Ye.$$.fragment),qt=_(),Re=v("p"),Re.innerHTML=wa,It=_(),Me=v("p"),Me.innerHTML=ya,Dt=_(),z&&z.c(),lt=_(),oe=v("p"),Ve=v("strong"),Ve.textContent=ba,ma=S(` (statistische Gebiete, Sozialmonitoring edition
`),Pt=S(mt),fa=S(`). Hamburg's trend covers 3 years and a different indicator set, so
these counts are not comparable with Berlin's and are never added to them:`),zt=_(),B(Be.$$.fragment),Ft=_(),B(Ee.$$.fragment),Nt=_(),B(Ae.$$.fragment),jt=_(),he=v("h3"),he.innerHTML=$a,Wt=_(),qe=v("p"),qe.innerHTML=ka,Ot=_(),F&&F.c(),ot=_(),B(Ie.$$.fragment),Gt=_(),B(Ke.$$.fragment),Ut=_(),De=v("p"),De.innerHTML=xa,Qt=_(),_e=v("h3"),_e.innerHTML=Ca,Yt=_(),Pe=v("p"),Pe.innerHTML=Ha,Vt=_(),ze=v("ul"),ze.innerHTML=Ta,Kt=_(),Fe=v("p"),Fe.innerHTML=Sa,Xt=_(),ft=v("hr"),Jt=_(),pe=v("h2"),pe.innerHTML=La,Zt=_(),Ne=v("ul"),Ne.innerHTML=Ra,ea=_(),ht=v("hr"),ta=_(),ge=v("h2"),ge.innerHTML=Ma,aa=_(),B(je.$$.fragment),ia=_(),We=v("p"),We.textContent=Ba,na=_(),B(Oe.$$.fragment),sa=_(),_t=v("hr"),ra=_(),B(Xe.$$.fragment),this.h()},l(e){ve&&ve.l(e),i=h(e);const a=ni("svelte-2igo1p",document.head);pt.l(a),t=g(a,"META",{name:!0,content:!0}),s=g(a,"META",{name:!0,content:!0}),we&&we.l(a),o=la(),a.forEach(n),l=h(e),M(d.$$.fragment,e),f=h(e),w=g(e,"HR",{class:!0}),p=h(e),k=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),x(k)!=="svelte-1us9auz"&&(k.innerHTML=u),y=h(e),M(A.$$.fragment,e),C=h(e),H=g(e,"P",{class:!0,"data-svelte-h":!0}),x(H)!=="svelte-slqkev"&&(H.innerHTML=ue),Z=h(e),j=g(e,"P",{class:!0,"data-svelte-h":!0}),x(j)!=="svelte-11eolut"&&(j.textContent=te),ae=h(e),M(ee.$$.fragment,e),ye=h(e),Q=g(e,"P",{class:!0,"data-svelte-h":!0}),x(Q)!=="svelte-1qje0p3"&&(Q.innerHTML=ie),Y=h(e),M(O.$$.fragment,e),be=h(e),ce=g(e,"HR",{class:!0}),$e=h(e),N=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),x(N)!=="svelte-24guds"&&(N.innerHTML=ne),se=h(e),M(V.$$.fragment,e),ke=h(e),K=g(e,"P",{class:!0,"data-svelte-h":!0}),x(K)!=="svelte-11xz6jt"&&(K.innerHTML=re),X=h(e),G=g(e,"P",{class:!0,"data-svelte-h":!0}),x(G)!=="svelte-tcljvj"&&(G.innerHTML=tt),xe=h(e),J=g(e,"P",{class:!0,"data-svelte-h":!0}),x(J)!=="svelte-1mtg6xo"&&(J.innerHTML=q),at=h(e),dt=g(e,"HR",{class:!0}),xt=h(e),me=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),x(me)!=="svelte-3kqp6y"&&(me.innerHTML=ga),Ct=h(e),M(Ce.$$.fragment,e),Ht=h(e),I&&I.l(e),it=h(e),D&&D.l(e),nt=h(e),P&&P.l(e),st=h(e),M(He.$$.fragment,e),Tt=h(e),fe=g(e,"P",{class:!0});var Ze=$t(fe);oa=T(Ze,"Figures reflect the most recent available reporting period: "),rt=g(Ze,"STRONG",{class:!0});var gt=$t(rt);St=T(gt,ut),gt.forEach(n),da=T(Ze,"."),Ze.forEach(n),Lt=h(e),le=g(e,"P",{class:!0});var Ge=$t(le);Qe=g(Ge,"STRONG",{class:!0,"data-svelte-h":!0}),x(Qe)!=="svelte-ckbp1m"&&(Qe.textContent=va),ua=T(Ge," (live data, MSS edition "),Rt=T(Ge,ct),ca=T(Ge,`; shown
whichever data option is selected above, since only the live data carries it):`),Ge.forEach(n),Mt=h(e),M(Te.$$.fragment,e),Bt=h(e),M(Se.$$.fragment,e),Et=h(e),M(Le.$$.fragment,e),At=h(e),M(Ye.$$.fragment,e),qt=h(e),Re=g(e,"P",{class:!0,"data-svelte-h":!0}),x(Re)!=="svelte-1dlz7o4"&&(Re.innerHTML=wa),It=h(e),Me=g(e,"P",{class:!0,"data-svelte-h":!0}),x(Me)!=="svelte-1lrlds"&&(Me.innerHTML=ya),Dt=h(e),z&&z.l(e),lt=h(e),oe=g(e,"P",{class:!0});var Ue=$t(oe);Ve=g(Ue,"STRONG",{class:!0,"data-svelte-h":!0}),x(Ve)!=="svelte-xk81w0"&&(Ve.textContent=ba),ma=T(Ue,` (statistische Gebiete, Sozialmonitoring edition
`),Pt=T(Ue,mt),fa=T(Ue,`). Hamburg's trend covers 3 years and a different indicator set, so
these counts are not comparable with Berlin's and are never added to them:`),Ue.forEach(n),zt=h(e),M(Be.$$.fragment,e),Ft=h(e),M(Ee.$$.fragment,e),Nt=h(e),M(Ae.$$.fragment,e),jt=h(e),he=g(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),x(he)!=="svelte-b3lu50"&&(he.innerHTML=$a),Wt=h(e),qe=g(e,"P",{class:!0,"data-svelte-h":!0}),x(qe)!=="svelte-375kpk"&&(qe.innerHTML=ka),Ot=h(e),F&&F.l(e),ot=h(e),M(Ie.$$.fragment,e),Gt=h(e),M(Ke.$$.fragment,e),Ut=h(e),De=g(e,"P",{class:!0,"data-svelte-h":!0}),x(De)!=="svelte-5z5op2"&&(De.innerHTML=xa),Qt=h(e),_e=g(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),x(_e)!=="svelte-qr6boj"&&(_e.innerHTML=Ca),Yt=h(e),Pe=g(e,"P",{class:!0,"data-svelte-h":!0}),x(Pe)!=="svelte-wbnk8t"&&(Pe.innerHTML=Ha),Vt=h(e),ze=g(e,"UL",{class:!0,"data-svelte-h":!0}),x(ze)!=="svelte-60q3bh"&&(ze.innerHTML=Ta),Kt=h(e),Fe=g(e,"P",{class:!0,"data-svelte-h":!0}),x(Fe)!=="svelte-1fa6w0x"&&(Fe.innerHTML=Sa),Xt=h(e),ft=g(e,"HR",{class:!0}),Jt=h(e),pe=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),x(pe)!=="svelte-ad0syq"&&(pe.innerHTML=La),Zt=h(e),Ne=g(e,"UL",{class:!0,"data-svelte-h":!0}),x(Ne)!=="svelte-kcoi5z"&&(Ne.innerHTML=Ra),ea=h(e),ht=g(e,"HR",{class:!0}),ta=h(e),ge=g(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),x(ge)!=="svelte-1lqu8qx"&&(ge.innerHTML=Ma),aa=h(e),M(je.$$.fragment,e),ia=h(e),We=g(e,"P",{class:!0,"data-svelte-h":!0}),x(We)!=="svelte-vcjj2j"&&(We.textContent=Ba),na=h(e),M(Oe.$$.fragment,e),sa=h(e),_t=g(e,"HR",{class:!0}),ra=h(e),M(Xe.$$.fragment,e),this.h()},h(){m(t,"name","twitter:card"),m(t,"content","summary_large_image"),m(s,"name","twitter:site"),m(s,"content","@evidence_dev"),m(w,"class","markdown"),m(k,"class","markdown"),m(k,"id","built-by-a-team-of-ai-agents--with-a-human-at-the-wheel"),m(H,"class","markdown"),m(j,"class","markdown"),m(Q,"class","markdown"),m(ce,"class","markdown"),m(N,"class","markdown"),m(N,"id","the-finding"),m(K,"class","markdown"),m(G,"class","markdown"),m(J,"class","markdown"),m(dt,"class","markdown"),m(me,"class","markdown"),m(me,"id","berlin-right-now"),m(rt,"class","markdown"),m(fe,"class","markdown"),m(Qe,"class","markdown"),m(le,"class","markdown"),m(Re,"class","markdown"),m(Me,"class","markdown"),m(Ve,"class","markdown"),m(oe,"class","markdown"),m(he,"class","markdown"),m(he,"id","where-each-neighbourhood-sits-in-the-gentrification-cycle"),m(qe,"class","markdown"),m(De,"class","markdown"),m(_e,"class","markdown"),m(_e,"id","does-this-agree-with-what-we-already-know"),m(Pe,"class","markdown"),m(ze,"class","markdown"),m(Fe,"class","markdown"),m(ft,"class","markdown"),m(pe,"class","markdown"),m(pe,"id","honest-caveats"),m(Ne,"class","markdown"),m(ht,"class","markdown"),m(ge,"class","markdown"),m(ge,"id","pick-your-path"),m(We,"class","markdown"),m(_t,"class","markdown")},m(e,a){ve&&ve.m(e,a),r(e,i,a),pt.m(document.head,null),W(document.head,t),W(document.head,s),we&&we.m(document.head,null),W(document.head,o),r(e,l,a),R(d,e,a),r(e,f,a),r(e,w,a),r(e,p,a),r(e,k,a),r(e,y,a),R(A,e,a),r(e,C,a),r(e,H,a),r(e,Z,a),r(e,j,a),r(e,ae,a),R(ee,e,a),r(e,ye,a),r(e,Q,a),r(e,Y,a),R(O,e,a),r(e,be,a),r(e,ce,a),r(e,$e,a),r(e,N,a),r(e,se,a),R(V,e,a),r(e,ke,a),r(e,K,a),r(e,X,a),r(e,G,a),r(e,xe,a),r(e,J,a),r(e,at,a),r(e,dt,a),r(e,xt,a),r(e,me,a),r(e,Ct,a),R(Ce,e,a),r(e,Ht,a),I&&I.m(e,a),r(e,it,a),D&&D.m(e,a),r(e,nt,a),P&&P.m(e,a),r(e,st,a),R(He,e,a),r(e,Tt,a),r(e,fe,a),W(fe,oa),W(fe,rt),W(rt,St),W(fe,da),r(e,Lt,a),r(e,le,a),W(le,Qe),W(le,ua),W(le,Rt),W(le,ca),r(e,Mt,a),R(Te,e,a),r(e,Bt,a),R(Se,e,a),r(e,Et,a),R(Le,e,a),r(e,At,a),R(Ye,e,a),r(e,qt,a),r(e,Re,a),r(e,It,a),r(e,Me,a),r(e,Dt,a),z&&z.m(e,a),r(e,lt,a),r(e,oe,a),W(oe,Ve),W(oe,ma),W(oe,Pt),W(oe,fa),r(e,zt,a),R(Be,e,a),r(e,Ft,a),R(Ee,e,a),r(e,Nt,a),R(Ae,e,a),r(e,jt,a),r(e,he,a),r(e,Wt,a),r(e,qe,a),r(e,Ot,a),F&&F.m(e,a),r(e,ot,a),R(Ie,e,a),r(e,Gt,a),R(Ke,e,a),r(e,Ut,a),r(e,De,a),r(e,Qt,a),r(e,_e,a),r(e,Yt,a),r(e,Pe,a),r(e,Vt,a),r(e,ze,a),r(e,Kt,a),r(e,Fe,a),r(e,Xt,a),r(e,ft,a),r(e,Jt,a),r(e,pe,a),r(e,Zt,a),r(e,Ne,a),r(e,ea,a),r(e,ht,a),r(e,ta,a),r(e,ge,a),r(e,aa,a),R(je,e,a),r(e,ia,a),r(e,We,a),r(e,na,a),R(Oe,e,a),r(e,sa,a),r(e,_t,a),r(e,ra,a),R(Xe,e,a),Je=!0},p(e,a){var Ga,Ua;typeof E<"u"&&E.title&&E.hide_title!==!0&&ve.p(e,a),pt.p(e,a),typeof E=="object"&&we.p(e,a);const Ze={};a[1]&2048&&(Ze.$$scope={dirty:a,ctx:e}),d.$set(Ze);const gt={};a[1]&2048&&(gt.$$scope={dirty:a,ctx:e}),A.$set(gt);const Ge={};a[1]&2048&&(Ge.$$scope={dirty:a,ctx:e}),O.$set(Ge);const Ue={};a[1]&2048&&(Ue.$$scope={dirty:a,ctx:e}),V.$set(Ue);const qa={};a[1]&2048&&(qa.$$scope={dirty:a,ctx:e}),Ce.$set(qa),e[0]?I?(I.p(e,a),a[0]&1&&b(I,1)):(I=Xa(e),I.c(),b(I,1),I.m(it.parentNode,it)):I&&(wt(),$(I,1,1,()=>{I=null}),vt()),e[1]?D?(D.p(e,a),a[0]&2&&b(D,1)):(D=Ja(e),D.c(),b(D,1),D.m(nt.parentNode,nt)):D&&(wt(),$(D,1,1,()=>{D=null}),vt()),e[2]?P?(P.p(e,a),a[0]&4&&b(P,1)):(P=Za(e),P.c(),b(P,1),P.m(st.parentNode,st)):P&&(wt(),$(P,1,1,()=>{P=null}),vt());const Ia={};a[0]&2&&(Ia.data=e[1]),He.$set(Ia),(!Je||a[0]&1)&&ut!==(ut=e[0][0].period+"")&&_a(St,ut),(!Je||a[0]&4)&&ct!==(ct=(((Ga=e[2][0])==null?void 0:Ga.period)??"—")+"")&&_a(Rt,ct);const Da={};a[0]&4&&(Da.data=e[2]),Te.$set(Da);const Pa={};a[0]&4&&(Pa.data=e[2]),Se.$set(Pa);const za={};a[0]&4&&(za.data=e[2]),Le.$set(za),e[3]?z?(z.p(e,a),a[0]&8&&b(z,1)):(z=ei(e),z.c(),b(z,1),z.m(lt.parentNode,lt)):z&&(wt(),$(z,1,1,()=>{z=null}),vt()),(!Je||a[0]&8)&&mt!==(mt=(((Ua=e[3][0])==null?void 0:Ua.period)??"—")+"")&&_a(Pt,mt);const Fa={};a[0]&8&&(Fa.data=e[3]),Be.$set(Fa);const Na={};a[0]&8&&(Na.data=e[3]),Ee.$set(Na);const ja={};a[0]&8&&(ja.data=e[3]),Ae.$set(ja),e[4]?F?(F.p(e,a),a[0]&16&&b(F,1)):(F=ti(e),F.c(),b(F,1),F.m(ot.parentNode,ot)):F&&(wt(),$(F,1,1,()=>{F=null}),vt());const ha={};a[0]&16&&(ha.data=e[4]),a[0]&1&&(ha.title="Berlin neighbourhoods by gentrification stage, "+e[0][0].period),Ie.$set(ha);const Wa={};a[1]&2048&&(Wa.$$scope={dirty:a,ctx:e}),je.$set(Wa);const Oa={};a[1]&2048&&(Oa.$$scope={dirty:a,ctx:e}),Oe.$set(Oa)},i(e){Je||(b(d.$$.fragment,e),b(A.$$.fragment,e),b(ee.$$.fragment,e),b(O.$$.fragment,e),b(V.$$.fragment,e),b(Ce.$$.fragment,e),b(I),b(D),b(P),b(He.$$.fragment,e),b(Te.$$.fragment,e),b(Se.$$.fragment,e),b(Le.$$.fragment,e),b(Ye.$$.fragment,e),b(z),b(Be.$$.fragment,e),b(Ee.$$.fragment,e),b(Ae.$$.fragment,e),b(F),b(Ie.$$.fragment,e),b(Ke.$$.fragment,e),b(je.$$.fragment,e),b(Oe.$$.fragment,e),b(Xe.$$.fragment,e),Je=!0)},o(e){$(d.$$.fragment,e),$(A.$$.fragment,e),$(ee.$$.fragment,e),$(O.$$.fragment,e),$(V.$$.fragment,e),$(Ce.$$.fragment,e),$(I),$(D),$(P),$(He.$$.fragment,e),$(Te.$$.fragment,e),$(Se.$$.fragment,e),$(Le.$$.fragment,e),$(Ye.$$.fragment,e),$(z),$(Be.$$.fragment,e),$(Ee.$$.fragment,e),$(Ae.$$.fragment,e),$(F),$(Ie.$$.fragment,e),$(Ke.$$.fragment,e),$(je.$$.fragment,e),$(Oe.$$.fragment,e),$(Xe.$$.fragment,e),Je=!1},d(e){e&&(n(i),n(l),n(f),n(w),n(p),n(k),n(y),n(C),n(H),n(Z),n(j),n(ae),n(ye),n(Q),n(Y),n(be),n(ce),n($e),n(N),n(se),n(ke),n(K),n(X),n(G),n(xe),n(J),n(at),n(dt),n(xt),n(me),n(Ct),n(Ht),n(it),n(nt),n(st),n(Tt),n(fe),n(Lt),n(le),n(Mt),n(Bt),n(Et),n(At),n(qt),n(Re),n(It),n(Me),n(Dt),n(lt),n(oe),n(zt),n(Ft),n(Nt),n(jt),n(he),n(Wt),n(qe),n(Ot),n(ot),n(Gt),n(Ut),n(De),n(Qt),n(_e),n(Yt),n(Pe),n(Vt),n(ze),n(Kt),n(Fe),n(Xt),n(ft),n(Jt),n(pe),n(Zt),n(Ne),n(ea),n(ht),n(ta),n(ge),n(aa),n(ia),n(We),n(na),n(sa),n(_t),n(ra)),ve&&ve.d(e),pt.d(e),n(t),n(s),we&&we.d(e),n(o),L(d,e),L(A,e),L(ee,e),L(O,e),L(V,e),L(Ce,e),I&&I.d(e),D&&D.d(e),P&&P.d(e),L(He,e),L(Te,e),L(Se,e),L(Le,e),L(Ye,e),z&&z.d(e),L(Be,e),L(Ee,e),L(Ae,e),F&&F.d(e),L(Ie,e),L(Ke,e),L(je,e),L(Oe,e),L(Xe,e)}}}const E={title:"Gentriduck — Gentrification Index for Berlin & Hamburg"};function Ui(c,i,t){let s,o;Qa(c,xi,q=>t(28,s=q)),Qa(c,Va,q=>t(33,o=q));let{data:l}=i,{data:d={},customFormattingSettings:f,__db:w,inputs:p}=l;si(Va,o="6666cd76f96956469e7be39d750cc7d9",o);let k=wi(gi(p));ri(k.subscribe(q=>t(7,p=q))),li($i,{getCustomFormats:()=>f.customFormats||[]});const u=(q,at)=>Hi(w.query,q,{query_name:at});yi(u),s.params,oi(()=>!0);let y={initialData:void 0,initialError:void 0},A=de`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}' and city_code = 'BER'`,C=`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}' and city_code = 'BER'`;d.latest_period_data&&(d.latest_period_data instanceof Error?y.initialError=d.latest_period_data:y.initialData=d.latest_period_data,d.latest_period_columns&&(y.knownColumns=d.latest_period_columns));let H,ue=!1;const Z=bt.createReactive({callback:q=>{t(0,H=q)},execFn:u},{id:"latest_period",...y});Z(C,{noResolve:A,...y}),globalThis[Symbol.for("latest_period")]={get value(){return H}};let j={initialData:void 0,initialError:void 0},te=de`select
    count(*) as areas_monitored
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'`,ae=`select
    count(*) as areas_monitored
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'`;d.headline_data&&(d.headline_data instanceof Error?j.initialError=d.headline_data:j.initialData=d.headline_data,d.headline_columns&&(j.knownColumns=d.headline_columns));let ee,ye=!1;const Q=bt.createReactive({callback:q=>{t(1,ee=q)},execFn:u},{id:"headline",...j});Q(ae,{noResolve:te,...j}),globalThis[Symbol.for("headline")]={get value(){return ee}};let ie={initialData:void 0,initialError:void 0},Y=de`-- #358 (spec §3, C4): Berlin's official status-trend counts -- live_data only (status_trend is
-- NULL for the thesis variants), Berlin's own latest MSS edition, never pooled with Hamburg.
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  )`,O=`-- #358 (spec §3, C4): Berlin's official status-trend counts -- live_data only (status_trend is
-- NULL for the thesis variants), Berlin's own latest MSS edition, never pooled with Hamburg.
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  )`;d.trend_ber_data&&(d.trend_ber_data instanceof Error?ie.initialError=d.trend_ber_data:ie.initialData=d.trend_ber_data,d.trend_ber_columns&&(ie.knownColumns=d.trend_ber_columns));let be,ce=!1;const $e=bt.createReactive({callback:q=>{t(2,be=q)},execFn:u},{id:"trend_ber",...ie});$e(O,{noResolve:Y,...ie}),globalThis[Symbol.for("trend_ber")]={get value(){return be}};let N={initialData:void 0,initialError:void 0},ne=de`-- #358 (spec §3, C4): Hamburg's official status-trend counts -- live_data only, Hamburg's own
-- latest Sozialmonitoring edition, kept separate from Berlin's (3-year window, other indicators).
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  )`,se=`-- #358 (spec §3, C4): Hamburg's official status-trend counts -- live_data only, Hamburg's own
-- latest Sozialmonitoring edition, kept separate from Berlin's (3-year window, other indicators).
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  )`;d.trend_hh_data&&(d.trend_hh_data instanceof Error?N.initialError=d.trend_hh_data:N.initialData=d.trend_hh_data,d.trend_hh_columns&&(N.knownColumns=d.trend_hh_columns));let V,ke=!1;const K=bt.createReactive({callback:q=>{t(3,V=q)},execFn:u},{id:"trend_hh",...N});K(se,{noResolve:ne,...N}),globalThis[Symbol.for("trend_hh")]={get value(){return V}};let re={initialData:void 0,initialError:void 0},X=de`-- #358: live_data reads the dbt stage_label in cycle order (spec §1). The thesis variant carries
-- no stage (stage_label NULL), so it keeps showing its own status_class as before.
select
    coalesce(stage_label, status_class) as stage,
    min(stage_number) as stage_number,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'
  and status_class is not null
group by 1
order by stage_number nulls last, stage`,G=`-- #358: live_data reads the dbt stage_label in cycle order (spec §1). The thesis variant carries
-- no stage (stage_label NULL), so it keeps showing its own status_class as before.
select
    coalesce(stage_label, status_class) as stage,
    min(stage_number) as stage_number,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'
  and status_class is not null
group by 1
order by stage_number nulls last, stage`;d.stage_distribution_data&&(d.stage_distribution_data instanceof Error?re.initialError=d.stage_distribution_data:re.initialData=d.stage_distribution_data,d.stage_distribution_columns&&(re.knownColumns=d.stage_distribution_columns));let tt,xe=!1;const J=bt.createReactive({callback:q=>{t(4,tt=q)},execFn:u},{id:"stage_distribution",...re});return J(G,{noResolve:X,...re}),globalThis[Symbol.for("stage_distribution")]={get value(){return tt}},c.$$set=q=>{"data"in q&&t(5,l=q.data)},c.$$.update=()=>{c.$$.dirty[0]&32&&t(6,{data:d={},customFormattingSettings:f,__db:w}=l,d),c.$$.dirty[0]&64&&bi.set(Object.keys(d).length>0),c.$$.dirty[0]&268435456&&s.params,c.$$.dirty[0]&128&&t(9,A=de`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}' and city_code = 'BER'`),c.$$.dirty[0]&128&&t(10,C=`select max(period_yyyymm) as period
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}' and city_code = 'BER'`),c.$$.dirty[0]&3840&&(A||!ue?A||(Z(C,{noResolve:A,...y}),t(11,ue=!0)):Z(C,{noResolve:A})),c.$$.dirty[0]&129&&t(13,te=de`select
    count(*) as areas_monitored
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'`),c.$$.dirty[0]&129&&t(14,ae=`select
    count(*) as areas_monitored
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'`),c.$$.dirty[0]&61440&&(te||!ye?te||(Q(ae,{noResolve:te,...j}),t(15,ye=!0)):Q(ae,{noResolve:te})),c.$$.dirty[0]&983040&&(Y||!ce?Y||($e(O,{noResolve:Y,...ie}),t(19,ce=!0)):$e(O,{noResolve:Y})),c.$$.dirty[0]&15728640&&(ne||!ke?ne||(K(se,{noResolve:ne,...N}),t(23,ke=!0)):K(se,{noResolve:ne})),c.$$.dirty[0]&129&&t(25,X=de`-- #358: live_data reads the dbt stage_label in cycle order (spec §1). The thesis variant carries
-- no stage (stage_label NULL), so it keeps showing its own status_class as before.
select
    coalesce(stage_label, status_class) as stage,
    min(stage_number) as stage_number,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'
  and status_class is not null
group by 1
order by stage_number nulls last, stage`),c.$$.dirty[0]&129&&t(26,G=`-- #358: live_data reads the dbt stage_label in cycle order (spec §1). The thesis variant carries
-- no stage (stage_label NULL), so it keeps showing its own status_class as before.
select
    coalesce(stage_label, status_class) as stage,
    min(stage_number) as stage_number,
    count(*) as area_count
from gentriduck_marts.gentrification_index
where variant = '${p.variant.value}'
  and city_code = 'BER'
  and area_level = case when '${p.variant.value}' = 'live_data' then 'plr' else 'bzr' end
  and period_yyyymm = '${H[0].period}'
  and status_class is not null
group by 1
order by stage_number nulls last, stage`),c.$$.dirty[0]&251658240&&(X||!xe?X||(J(G,{noResolve:X,...re}),t(27,xe=!0)):J(G,{noResolve:X}))},t(17,Y=de`-- #358 (spec §3, C4): Berlin's official status-trend counts -- live_data only (status_trend is
-- NULL for the thesis variants), Berlin's own latest MSS edition, never pooled with Hamburg.
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  )`),t(18,O=`-- #358 (spec §3, C4): Berlin's official status-trend counts -- live_data only (status_trend is
-- NULL for the thesis variants), Berlin's own latest MSS edition, never pooled with Hamburg.
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'BER' and area_level = 'plr'
  )`),t(21,ne=de`-- #358 (spec §3, C4): Hamburg's official status-trend counts -- live_data only, Hamburg's own
-- latest Sozialmonitoring edition, kept separate from Berlin's (3-year window, other indicators).
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  )`),t(22,se=`-- #358 (spec §3, C4): Hamburg's official status-trend counts -- live_data only, Hamburg's own
-- latest Sozialmonitoring edition, kept separate from Berlin's (3-year window, other indicators).
select
    max(period_yyyymm) as period,
    count(*) filter (where status_trend = 'Improving') as n_improving,
    count(*) filter (where status_trend = 'Stable') as n_stable,
    count(*) filter (where status_trend = 'Worsening') as n_worsening
from gentriduck_marts.gentrification_index
where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  and period_yyyymm = (
      select max(period_yyyymm) from gentriduck_marts.gentrification_index
      where variant = 'live_data' and city_code = 'HH' and area_level = 'subarea_l2'
  )`),[H,ee,be,V,tt,l,d,p,y,A,C,ue,j,te,ae,ye,ie,Y,O,ce,N,ne,se,ke,re,X,G,xe,s]}class _n extends di{constructor(i){super(),ui(this,i,Ui,Gi,ii,{data:5},null,[-1,-1])}}export{_n as component};
