import{s as xn,y as An,d as l,z as On,A as Cn,B as Bn,i as d,a as Y,b as m,e as b,g as dt,c as _,m as N,l as g,f as ut,w as St,j as Ne,t as ve,h as Wn,k as A,n as sn,o as Sn,p as Un,q as Pn,r as jn,u as ce}from"../chunks/scheduler.wXRIqz25.js";import{S as Hn,i as En,t as u,a as y,d as x,c as Ue,m as H,b as E,e as R,g as Pe}from"../chunks/index.uz5rP6Z2.js";import{F as Fn}from"../chunks/FooterNav.Bvj2VGiR.js";import{H as Rn}from"../chunks/Hero.C0o6T8tj.js";import{D as Xt,C as le}from"../chunks/VennDiagram.svelte_svelte_type_style_lang._18RWoi3.js";import{w as In}from"../chunks/entry.DotynpIs.js";import{e as Mn,s as $n,Q as ht,p as Xn,a as an,r as rn,C as Ln}from"../chunks/inferColumnTypes.XAQ6Cehw.js";import{h as K}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as zn}from"../chunks/stores.DJGNasUV.js";import{Q as ct}from"../chunks/QueryViewer.RFckNDEV.js";import{V as on}from"../chunks/Value.CtteLknp.js";import{p as Vn}from"../chunks/profile.BW8tN6E9.js";function ln(o){let e;function i(r,p){return r[1]===2?Qn:r[1]===4?Gn:qn}let t=i(o),s=t(o);return{c(){s.c(),e=ut()},l(r){s.l(r),e=ut()},m(r,p){s.m(r,p),d(r,e,p)},p(r,p){t===(t=i(r))&&s?s.p(r,p):(s.d(1),s=t(r),s&&(s.c(),s.m(e.parentNode,e)))},d(r){r&&l(e),s.d(r)}}}function qn(o){let e,i;return{c(){e=N("h3"),i=ve(o[0]),this.h()},l(t){e=b(t,"H3",{class:!0});var s=dt(e);i=Ne(s,o[0]),s.forEach(l),this.h()},h(){m(e,"class","methods-box-title svelte-1c62ztq")},m(t,s){d(t,e,s),Y(e,i)},p(t,s){s&1&&St(i,t[0])},d(t){t&&l(e)}}}function Gn(o){let e,i;return{c(){e=N("h4"),i=ve(o[0]),this.h()},l(t){e=b(t,"H4",{class:!0});var s=dt(e);i=Ne(s,o[0]),s.forEach(l),this.h()},h(){m(e,"class","methods-box-title svelte-1c62ztq")},m(t,s){d(t,e,s),Y(e,i)},p(t,s){s&1&&St(i,t[0])},d(t){t&&l(e)}}}function Qn(o){let e,i;return{c(){e=N("h2"),i=ve(o[0]),this.h()},l(t){e=b(t,"H2",{class:!0});var s=dt(e);i=Ne(s,o[0]),s.forEach(l),this.h()},h(){m(e,"class","methods-box-title svelte-1c62ztq")},m(t,s){d(t,e,s),Y(e,i)},p(t,s){s&1&&St(i,t[0])},d(t){t&&l(e)}}}function Jn(o){let e,i,t,s,r=o[0]&&ln(o);const p=o[3].default,c=An(p,o,o[2],null);return{c(){e=N("section"),r&&r.c(),i=g(),t=N("div"),c&&c.c(),this.h()},l(h){e=b(h,"SECTION",{class:!0});var f=dt(e);r&&r.l(f),i=_(f),t=b(f,"DIV",{class:!0});var v=dt(t);c&&c.l(v),v.forEach(l),f.forEach(l),this.h()},h(){m(t,"class","methods-box-body"),m(e,"class","methods-box svelte-1c62ztq")},m(h,f){d(h,e,f),r&&r.m(e,null),Y(e,i),Y(e,t),c&&c.m(t,null),s=!0},p(h,[f]){h[0]?r?r.p(h,f):(r=ln(h),r.c(),r.m(e,i)):r&&(r.d(1),r=null),c&&c.p&&(!s||f&4)&&On(c,p,h,h[2],s?Bn(p,h[2],f,null):Cn(h[2]),null)},i(h){s||(y(c,h),s=!0)},o(h){u(c,h),s=!1},d(h){h&&l(e),r&&r.d(),c&&c.d(h)}}}function Kn(o,e,i){let{$$slots:t={},$$scope:s}=e,{title:r=""}=e,{level:p=3}=e;return o.$$set=c=>{"title"in c&&i(0,r=c.title),"level"in c&&i(1,p=c.level),"$$scope"in c&&i(2,s=c.$$scope)},[r,p,s,t]}class Yn extends Hn{constructor(e){super(),En(this,e,Kn,Jn,xn,{title:0,level:1})}}function Zn(o){let e,i=T.title+"",t;return{c(){e=N("h1"),t=ve(i),this.h()},l(s){e=b(s,"H1",{class:!0});var r=dt(e);t=Ne(r,i),r.forEach(l),this.h()},h(){m(e,"class","title")},m(s,r){d(s,e,r),Y(e,t)},p:ce,d(s){s&&l(e)}}}function ei(o){return{c(){this.h()},l(e){this.h()},h(){document.title="Evidence"},m:ce,p:ce,d:ce}}function ti(o){let e,i,t,s,r;return document.title=e=T.title,{c(){i=g(),t=N("meta"),s=g(),r=N("meta"),this.h()},l(p){i=_(p),t=b(p,"META",{property:!0,content:!0}),s=_(p),r=b(p,"META",{name:!0,content:!0}),this.h()},h(){var p,c;m(t,"property","og:title"),m(t,"content",((p=T.og)==null?void 0:p.title)??T.title),m(r,"name","twitter:title"),m(r,"content",((c=T.og)==null?void 0:c.title)??T.title)},m(p,c){d(p,i,c),d(p,t,c),d(p,s,c),d(p,r,c)},p(p,c){c&0&&e!==(e=T.title)&&(document.title=e)},d(p){p&&(l(i),l(t),l(s),l(r))}}}function ni(o){var r,p;let e,i,t=(T.description||((r=T.og)==null?void 0:r.description))&&ii(),s=((p=T.og)==null?void 0:p.image)&&si();return{c(){t&&t.c(),e=g(),s&&s.c(),i=ut()},l(c){t&&t.l(c),e=_(c),s&&s.l(c),i=ut()},m(c,h){t&&t.m(c,h),d(c,e,h),s&&s.m(c,h),d(c,i,h)},p(c,h){var f,v;(T.description||(f=T.og)!=null&&f.description)&&t.p(c,h),(v=T.og)!=null&&v.image&&s.p(c,h)},d(c){c&&(l(e),l(i)),t&&t.d(c),s&&s.d(c)}}}function ii(o){let e,i,t,s,r;return{c(){e=N("meta"),i=g(),t=N("meta"),s=g(),r=N("meta"),this.h()},l(p){e=b(p,"META",{name:!0,content:!0}),i=_(p),t=b(p,"META",{property:!0,content:!0}),s=_(p),r=b(p,"META",{name:!0,content:!0}),this.h()},h(){var p,c,h;m(e,"name","description"),m(e,"content",T.description??((p=T.og)==null?void 0:p.description)),m(t,"property","og:description"),m(t,"content",((c=T.og)==null?void 0:c.description)??T.description),m(r,"name","twitter:description"),m(r,"content",((h=T.og)==null?void 0:h.description)??T.description)},m(p,c){d(p,e,c),d(p,i,c),d(p,t,c),d(p,s,c),d(p,r,c)},p:ce,d(p){p&&(l(e),l(i),l(t),l(s),l(r))}}}function si(o){let e,i,t;return{c(){e=N("meta"),i=g(),t=N("meta"),this.h()},l(s){e=b(s,"META",{property:!0,content:!0}),i=_(s),t=b(s,"META",{name:!0,content:!0}),this.h()},h(){var s,r;m(e,"property","og:image"),m(e,"content",an((s=T.og)==null?void 0:s.image)),m(t,"name","twitter:image"),m(t,"content",an((r=T.og)==null?void 0:r.image))},m(s,r){d(s,e,r),d(s,i,r),d(s,t,r)},p:ce,d(s){s&&(l(e),l(i),l(t))}}}function hn(o){let e,i;return e=new ct({props:{queryID:"mc_shown",queryResult:o[2]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&4&&(r.queryResult=t[2]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function dn(o){let e,i;return e=new ct({props:{queryID:"mc_checks",queryResult:o[3]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&8&&(r.queryResult=t[3]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function cn(o){let e,i;return e=new ct({props:{queryID:"mc_cells",queryResult:o[4]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&16&&(r.queryResult=t[4]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function pn(o){let e,i;return e=new ct({props:{queryID:"mc_hyp",queryResult:o[5]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&32&&(r.queryResult=t[5]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function wn(o){let e,i;return e=new ct({props:{queryID:"thesis_side_by_side",queryResult:o[6]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&64&&(r.queryResult=t[6]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function fn(o){let e,i;return e=new ct({props:{queryID:"thesis_differences",queryResult:o[7]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&128&&(r.queryResult=t[7]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function mn(o){let e,i;return e=new ct({props:{queryID:"new_hypotheses",queryResult:o[8]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&256&&(r.queryResult=t[8]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function _n(o){let e,i;return e=new ct({props:{queryID:"guards",queryResult:o[0]}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},p(t,s){const r={};s[0]&1&&(r.queryResult=t[0]),e.$set(r)},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function ai(o){let e,i;return e=new Rn({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Berlin vs Hamburg, like for like",lede:"The eight hypotheses of the 2018 thesis, tested in Berlin and Hamburg on matched areas, shared indicators and the same years. This summary is being updated after a re-run of the analysis; the tables below show the current results."}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function ri(o){let e,i;return e=new Rn({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Berlin vs Hamburg, like for like",lede:"Compared like for like (neighbourhoods of similar size, the same three indicators of poverty and unemployment, the same years and the same map data), Berlin and Hamburg show no detectable difference in how the local mix of shops and services relates to neighbourhood disadvantage. The comparison can only pick up large differences, so this does not mean the two cities are the same."}}),{c(){R(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,s){H(e,t,s),i=!0},i(t){i||(y(e.$$.fragment,t),i=!0)},o(t){u(e.$$.fragment,t),i=!1},d(t){x(e,t)}}}function gn(o){let e,i=`<li class="markdown">In each city, areas where cafés make up a larger share of local businesses tend to be less
disadvantaged, and areas where fast-food outlets do tend to be more disadvantaged. This describes
where businesses are today. It does not mean that cafés improve an area or that fast-food outlets
signal a problem: which businesses can survive depends largely on local incomes, rents and
passing trade.</li>`;return{c(){e=N("ul"),e.innerHTML=i,this.h()},l(t){e=b(t,"UL",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1arkymd"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function yn(o){let e,i=`<li class="markdown">In neither city did changes in the business mix come before changes in measured disadvantage, or
follow them, between 2019 and 2025. The areas compared have 15,000–26,000 residents, so changes
at street or block level may not show up at this scale.</li>`;return{c(){e=N("ul"),e.innerHTML=i,this.h()},l(t){e=b(t,"UL",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1v9bc50"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function un(o){let e,i=`<li class="markdown">In Berlin, the business mix gave a weak hint of which areas fell behind in 2021–2023 only. It
disappears without the welfare-receipt indicator and adds nothing to knowing how disadvantaged an
area already was. That period coincides with refugees from Ukraine entering basic income support
(Grundsicherung), so we do not read it as an effect of local businesses.</li>`;return{c(){e=N("ul"),e.innerHTML=i,this.h()},l(t){e=b(t,"UL",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-12y5rzl"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function bn(o){let e,i=`Some sentences of this summary are being updated after a re-run of the analysis; the tables below
show the current results.`;return{c(){e=N("p"),e.textContent=i,this.h()},l(t){e=b(t,"P",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1lbwxz6"&&(e.textContent=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function oi(o){let e,i=`<li class="markdown"><strong class="markdown">Matched grain.</strong> Berlin Bezirksregionen (BZR, 143) and Hamburg Stadtteile (99): areas of
roughly 15,000–26,000 residents and 4–6 km². Each is built up from the city&#39;s smaller areas
(Berlin planning areas, Hamburg statistical areas), weighted by residents.</li> <li class="markdown"><strong class="markdown">Harmonised core.</strong> The same three indicators in both cities: unemployment, welfare receipt and
child poverty. Berlin&#39;s welfare figure is re-based to all recipients (T*), so that both cities
weigh unemployment the same way. The remaining differences in what each figure counts are
disclosed above.</li> <li class="markdown"><strong class="markdown">Same years.</strong> The 2019, 2021, 2023 and 2025 editions of each city&#39;s social monitor, with the
same reference dates and three two-year windows, and the same OpenStreetMap snapshots and
business categories. Berlin&#39;s end-2022 population, used as weights, is interpolated between
2020 and 2024, as fixed in advance.</li> <li class="markdown"><strong class="markdown">Spatial block bootstrap.</strong> Confidence intervals resample 24 blocks of neighbouring areas per
city (1,999 draws), so neighbours are not treated as independent. Benjamini–Hochberg corrects
across each city&#39;s eight tests and across the eight city comparisons.</li> <li class="markdown"><strong class="markdown">Hamburg 2019 base revised by the publisher.</strong> Hamburg&#39;s 2019 welfare figures come from an S3
base revised by the publisher (a change in how asylum-seeker benefits are counted, Hamburg
Sozialmonitoring report 2021). The comparison uses the revised base; the figures as first
published are a check.</li> <li class="markdown"><strong class="markdown">Fixed in advance.</strong> The design, the checks and this page&#39;s statement rule were registered
before the results were computed. Two clarifications (how a check is marked as moving a result,
and how the 5,000-resident condition of the statement rule is tested) were added after the
results were computed and are disclosed in Amendment 5 of the pre-registration:
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/371-matched-comparison-preregistration.md" rel="nofollow" class="markdown">pre-registration</a>,
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/371-data-checks.md" rel="nofollow" class="markdown">data checks</a>,
<a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1c-matched-comparison-findings.md" rel="nofollow" class="markdown">findings</a>.</li>`;return{c(){e=N("ul"),e.innerHTML=i,this.h()},l(t){e=b(t,"UL",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-ymzl0w"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},p:ce,d(t){t&&l(e)}}}function li(o){let e,i,t,s,r,p,c,h;return e=new le({props:{id:"hypothesis",title:"#"}}),t=new le({props:{id:"plain",title:"Hypothesis",wrap:"true"}}),r=new le({props:{id:"berlin",title:"Berlin (143 Bezirksregionen)",contentType:"html",wrap:"true"}}),c=new le({props:{id:"hamburg",title:"Hamburg (99 Stadtteile)",contentType:"html",wrap:"true"}}),{c(){R(e.$$.fragment),i=g(),R(t.$$.fragment),s=g(),R(r.$$.fragment),p=g(),R(c.$$.fragment)},l(f){E(e.$$.fragment,f),i=_(f),E(t.$$.fragment,f),s=_(f),E(r.$$.fragment,f),p=_(f),E(c.$$.fragment,f)},m(f,v){H(e,f,v),d(f,i,v),H(t,f,v),d(f,s,v),H(r,f,v),d(f,p,v),H(c,f,v),h=!0},p:ce,i(f){h||(y(e.$$.fragment,f),y(t.$$.fragment,f),y(r.$$.fragment,f),y(c.$$.fragment,f),h=!0)},o(f){u(e.$$.fragment,f),u(t.$$.fragment,f),u(r.$$.fragment,f),u(c.$$.fragment,f),h=!1},d(f){f&&(l(i),l(s),l(p)),x(e,f),x(t,f),x(r,f),x(c,f)}}}function Nn(o){let e,i=`<strong class="markdown">Berlin H2.</strong> In Berlin, the business mix gave a weak hint of which areas fell behind in
2021–2023 only. It disappears without the welfare-receipt indicator and adds nothing to knowing how
disadvantaged an area already was. That period coincides with refugees from Ukraine entering basic
income support (Grundsicherung), so we do not read it as an effect of local businesses.`;return{c(){e=N("p"),e.innerHTML=i,this.h()},l(t){e=b(t,"P",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1wt6drb"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function vn(o){let e,i=`<strong class="markdown">Berlin H1c, read carefully.</strong> In Berlin, where sport and leisure make up a larger share of all
mapped places, measured disadvantage tends to be higher. That share rises where few shops and
services are mapped, so the result is about the mix of mapped places, not about sports provision
as such.`;return{c(){e=N("p"),e.innerHTML=i,this.h()},l(t){e=b(t,"P",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1y50uvy"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function hi(o){let e,i,t,s,r,p,c,h,f,v;return e=new le({props:{id:"hypothesis",title:"#"}}),t=new le({props:{id:"plain",title:"Hypothesis",wrap:"true"}}),r=new le({props:{id:"delta_ci",title:"Δ Berlin − Hamburg [95% CI]",wrap:"true"}}),c=new le({props:{id:"mdd_txt",title:"MDD",wrap:"true"}}),f=new le({props:{id:"result",title:"City difference",contentType:"html",wrap:"true"}}),{c(){R(e.$$.fragment),i=g(),R(t.$$.fragment),s=g(),R(r.$$.fragment),p=g(),R(c.$$.fragment),h=g(),R(f.$$.fragment)},l(w){E(e.$$.fragment,w),i=_(w),E(t.$$.fragment,w),s=_(w),E(r.$$.fragment,w),p=_(w),E(c.$$.fragment,w),h=_(w),E(f.$$.fragment,w)},m(w,D){H(e,w,D),d(w,i,D),H(t,w,D),d(w,s,D),H(r,w,D),d(w,p,D),H(c,w,D),d(w,h,D),H(f,w,D),v=!0},p:ce,i(w){v||(y(e.$$.fragment,w),y(t.$$.fragment,w),y(r.$$.fragment,w),y(c.$$.fragment,w),y(f.$$.fragment,w),v=!0)},o(w){u(e.$$.fragment,w),u(t.$$.fragment,w),u(r.$$.fragment,w),u(c.$$.fragment,w),u(f.$$.fragment,w),v=!1},d(w){w&&(l(i),l(s),l(p),l(h)),x(e,w),x(t,w),x(r,w),x(c,w),x(f,w)}}}function di(o){let e,i,t,s,r;return e=new on({props:{data:o[0],column:"x8_differs"}}),t=new on({props:{data:o[0],column:"x8_n"}}),{c(){R(e.$$.fragment),i=ve(" of the "),R(t.$$.fragment),s=ve(" comparisons are flagged in the main test; see the findings for which of them pass the rule.")},l(p){E(e.$$.fragment,p),i=Ne(p," of the "),E(t.$$.fragment,p),s=Ne(p," comparisons are flagged in the main test; see the findings for which of them pass the rule.")},m(p,c){H(e,p,c),d(p,i,c),H(t,p,c),d(p,s,c),r=!0},p(p,c){const h={};c[0]&1&&(h.data=p[0]),e.$set(h);const f={};c[0]&1&&(f.data=p[0]),t.$set(f)},i(p){r||(y(e.$$.fragment,p),y(t.$$.fragment,p),r=!0)},o(p){u(e.$$.fragment,p),u(t.$$.fragment,p),r=!1},d(p){p&&(l(i),l(s)),x(e,p),x(t,p)}}}function ci(o){let e;return{c(){e=ve("None of the eight comparisons gives a difference in the main test, so no city difference is stated.")},l(i){e=Ne(i,"None of the eight comparisons gives a difference in the main test, so no city difference is stated.")},m(i,t){d(i,e,t)},p:ce,i:ce,o:ce,d(i){i&&l(e)}}}function kn(o){let e,i=`<strong class="markdown">H2, 2021–2023 window only (exploratory).</strong> Run on this window alone, without correction for
multiple testing, the comparison test is flagged. That is not a city difference: in this window
Hamburg&#39;s estimate is below chance, so the test only registers Berlin&#39;s weak 2021–2023 hint (see
Berlin H2 above) against nothing usable on the Hamburg side (pre-registration Amendment 3, D6). The
window coincides with refugees from Ukraine entering basic income support in June 2022, which did
not enter both cities&#39; indicators through the same route. The main comparison, over all three windows, detects
no difference.`;return{c(){e=N("p"),e.innerHTML=i,this.h()},l(t){e=b(t,"P",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-1y9k6ns"&&(e.innerHTML=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function pi(o){let e,i,t,s,r,p,c,h,f,v;return e=new le({props:{id:"hypothesis",title:"#"}}),t=new le({props:{id:"plain",title:"Hypothesis",wrap:"true"}}),r=new le({props:{id:"berlin",title:"Berlin",contentType:"html",wrap:"true"}}),c=new le({props:{id:"hamburg",title:"Hamburg",contentType:"html",wrap:"true"}}),f=new le({props:{id:"difference",title:"City difference",contentType:"html",wrap:"true"}}),{c(){R(e.$$.fragment),i=g(),R(t.$$.fragment),s=g(),R(r.$$.fragment),p=g(),R(c.$$.fragment),h=g(),R(f.$$.fragment)},l(w){E(e.$$.fragment,w),i=_(w),E(t.$$.fragment,w),s=_(w),E(r.$$.fragment,w),p=_(w),E(c.$$.fragment,w),h=_(w),E(f.$$.fragment,w)},m(w,D){H(e,w,D),d(w,i,D),H(t,w,D),d(w,s,D),H(r,w,D),d(w,p,D),H(c,w,D),d(w,h,D),H(f,w,D),v=!0},p:ce,i(w){v||(y(e.$$.fragment,w),y(t.$$.fragment,w),y(r.$$.fragment,w),y(c.$$.fragment,w),y(f.$$.fragment,w),v=!0)},o(w){u(e.$$.fragment,w),u(t.$$.fragment,w),u(r.$$.fragment,w),u(c.$$.fragment,w),u(f.$$.fragment,w),v=!1},d(w){w&&(l(i),l(s),l(p),l(h)),x(e,w),x(t,w),x(r,w),x(c,w),x(f,w)}}}function Tn(o){let e,i=`In Berlin, N1 could not be tested at this grain: the areas above the median fall into too few of
the spatial blocks used for the confidence intervals.`;return{c(){e=N("p"),e.textContent=i,this.h()},l(t){e=b(t,"P",{class:!0,"data-svelte-h":!0}),A(e)!=="svelte-7gtr9v"&&(e.textContent=i),this.h()},h(){m(e,"class","markdown")},m(t,s){d(t,e,s)},d(t){t&&l(e)}}}function wi(o){let e,i,t,s,r,p,c,h,f,v,w,D,L,F,I,pe,we,ft=`The <a href="/gentriduck/thesis-recheck" class="markdown">Berlin</a> and <a href="/gentriduck/hamburg/thesis-recheck" class="markdown">Hamburg</a> re-checks of the 2018
thesis each use their own city&#39;s monitor, area size and years, so they cannot be set against each
other directly. This page puts the two cities on one footing instead: areas of similar size, the
same three indicators, the same editions and the same map data. It then tests, hypothesis by
hypothesis, whether the link between the local business mix and neighbourhood disadvantage shows a
detectable city difference.`,ze,$,Te='<a href="#what-the-comparison-shows">What the comparison shows</a>',xe,He,Ee,Re,z,De=`<li class="markdown">The years covered include the pandemic, the arrival of refugees from Ukraine and the 2023 benefit
reforms. These moved the official indicators in both cities, but not always through the same
indicator or at the same time.</li> <li class="markdown">These results describe patterns in official statistics and open map data. They are not forecasts
and cannot be used to identify neighbourhoods that will gentrify.</li>`,Ae,Oe,he,mt='<a href="#read-this-first">Read this first</a>',fe,V,Ve=`<li class="markdown"><strong class="markdown">Welfare receipt.</strong> Welfare receipt is measured slightly differently in the two cities:
Berlin&#39;s figure, derived from two published indicators, includes social assistance (mainly older
and disabled people); Hamburg&#39;s includes asylum-seeker benefits. A city difference is only stated
if it also appears without this indicator.</li> <li class="markdown"><strong class="markdown">Refugee accommodation in Hamburg.</strong> In Hamburg, the welfare indicator includes asylum-seeker
benefits. Where the city opens or closes refugee accommodation, an area&#39;s figure can change by
tens of percentage points without any change among its existing residents. Such changes show
where accommodation was placed. We do not read them as neighbourhood decline or improvement.</li> <li class="markdown"><strong class="markdown">Scale.</strong> The matched units (15–26k residents) are coarser than the scale at which
gentrification is usually observed, so a null here does not rule out a neighbourhood-scale
process.</li> <li class="markdown"><strong class="markdown">Within-city scores.</strong> The disadvantage score is standardised within each city, so it ranks
areas within a city only. A Berlin and a Hamburg area with the same score are not equally
disadvantaged, and this page does not compare the cities&#39; levels.</li> <li class="markdown"><strong class="markdown">Change is not either city&#39;s official trend.</strong> The change measure here is built from the three
shared indicators. It is not either city&#39;s own published change classification.</li>`,qe,me,Ge,X,Ce='<a href="#the-thesis-hypotheses-in-each-city">The thesis hypotheses in each city</a>',Be,_e,_t=`Each city is tested on its own, with the same design. A result counts as supported or opposite only
if it is significant after a Benjamini–Hochberg correction across the city's eight tests. ρ is a
rank correlation with the disadvantage score (positive: goes with more disadvantage); AUC says how
well the mix tells areas apart (0.5 is chance). Brackets give the 95% confidence interval.`,Qe,q,ge,ye,We,de,gt='<a href="#city-differences-tested">City differences, tested</a>',ue,G,Je=`For each hypothesis, the test compares Berlin's estimate with Hamburg's: Δ is Berlin's minus
Hamburg's. The MDD is the smallest difference the comparison could reliably detect (2.8 times its
standard error). "No difference detected" is never "the same": where the MDD is larger than 0.30
(ρ) or 0.10 (AUC), the comparison is too imprecise to say the cities agree.`,Ke,be,Ye,M,Z,Ze="Statement rule, fixed in advance.",Se,Q,J,k,et,je,Lt='<a href="#three-new-hypotheses">Three new hypotheses</a>',kt,tt,zt=`Pre-registered for this comparison: N1 and N2 are confirmatory in each city (corrected across the
city's N tests), N3 is exploratory, and the city differences for N1–N3 are exploratory and
uncorrected. These are ordering tests, not warning, forecasting or investment indicators.`,Tt,nt,xt,it,Vt=`N1 is about the more disadvantaged half of neighbourhoods in each city, which mixes very different
kinds of area; it is not about gentrifying areas.`,Ht,yt,st,qt=`<strong class="markdown">Reading the checks.</strong> Each result was also re-run with one change at a time. A check is listed
under a result only where it changed that result&#39;s sign or its significance before correction.
<em class="markdown">Sign unstable around zero</em>: the estimate changes
sign, but is not statistically significant in either version, so it is not a substantive change.
<em class="markdown">Unadjusted significance change</em>: significant before correction in one version and not in the
other. <em class="markdown">Grain-dependent, MAUP</em>: the result depends on the size of the areas (the modifiable areal
unit problem). No check can change a verdict, and a check is not a finding on its own. Berlin&#39;s
uncorrected welfare indicator, for example, leaves out recipients who are unemployed, while
Hamburg&#39;s includes them, so the two cities&#39; scores would weigh unemployment differently. That is
why the corrected one is used for every verdict.`,Et,ke,Ut,Fe,Gt="results table",Pt,Rt,jt,Dt,Ie,Qt='<a href="#honest-caveats">Honest caveats</a>',At,at,Jt=`<li class="markdown">With about 100–143 areas per city, the comparison can detect only large differences between the
cities.</li> <li class="markdown">OpenStreetMap is not mapped equally completely everywhere, nor equally in both cities, so the
business mix is captured more fully in some areas than in others.</li> <li class="markdown">All analysis is at the level of areas. Nothing here says anything about an individual person,
household, business or building.</li> <li class="markdown">These are associations. Nothing here shows that commercial change causes change in officially
measured disadvantage.</li> <li class="markdown">The many secondary and sensitivity checks in the findings are not corrected for multiple testing,
so they are context, not verdicts.</li>`,Ot,Me,Kt='<a href="#further-reading">Further reading</a>',Ct,rt,Yt='<li class="markdown"><a href="/gentriduck/thesis-recheck" class="markdown">The 2018 thesis, re-checked</a> — the Berlin re-test in full, on Berlin&#39;s own planning areas and monitor</li> <li class="markdown"><a href="/gentriduck/hamburg/thesis-recheck" class="markdown">The 2018 thesis, re-tested on Hamburg</a> — the Hamburg transfer test on Hamburg&#39;s own statistical areas and monitor</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/E1c-matched-comparison-findings.md" rel="nofollow" class="markdown">Matched comparison findings (#371)</a> — every primary, secondary and sensitivity row behind this page</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/methodology/371-matched-comparison-preregistration.md" rel="nofollow" class="markdown">Pre-registration</a> — the design fixed in advance, including what the results must not be used to claim (§10)</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/371-data-checks.md" rel="nofollow" class="markdown">Data checks</a> — how the two cities&#39; indicators were checked and aligned</li> <li class="markdown"><a href="https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/matched-comparison-results.csv" rel="nofollow" class="markdown">Results table (CSV)</a> — every row, machine-readable</li> <li class="markdown"><a href="/gentriduck/methodology" class="markdown">Methodology &amp; data sources</a> — what the site&#39;s index measures, city by city</li>',Bt,bt,Wt,pt,Nt,$e=typeof T<"u"&&T.title&&T.hide_title!==!0&&Zn();function Dn(n,a){return typeof T<"u"&&T.title?ti:ei}let vt=Dn()(o),Xe=typeof T=="object"&&ni(),O=o[2]&&hn(o),C=o[3]&&dn(o),B=o[4]&&cn(o),W=o[5]&&pn(o),S=o[6]&&wn(o),U=o[7]&&fn(o),P=o[8]&&mn(o),j=o[0]&&_n(o);const Zt=[ri,ai],wt=[];function en(n,a){return n[1].lead_ok?0:1}F=en(o),I=wt[F]=Zt[F](o);let ee=o[1].s1_ok&&gn(),te=o[1].s2_ok&&yn(),ne=o[1].s3_ok&&un(),ie=!(o[1].s1_ok&&o[1].s2_ok&&o[1].s3_ok)&&bn();me=new Yn({props:{title:"How the comparison works",$$slots:{default:[oi]},$$scope:{ctx:o}}}),q=new Xt({props:{data:o[6],rows:"8",sortable:"false",downloadable:"false",wrapTitles:"true",formatColumnTitles:"false",$$slots:{default:[li]},$$scope:{ctx:o}}});let se=o[1].s3_ok&&Nn(),ae=o[1].h1c_ok&&vn();be=new Xt({props:{data:o[7],rows:"8",sortable:"false",downloadable:"false",wrapTitles:"true",formatColumnTitles:"false",$$slots:{default:[hi]},$$scope:{ctx:o}}});const tn=[ci,di],ot=[];function nn(n,a){return n[1].x8_n===8&&n[1].x8_differs===0?0:1}Q=nn(o),J=ot[Q]=tn[Q](o);let re=o[1].w2_note_ok&&kn();nt=new Xt({props:{data:o[8],rows:"3",sortable:"false",downloadable:"false",wrapTitles:"true",formatColumnTitles:"false",$$slots:{default:[pi]},$$scope:{ctx:o}}});let oe=o[1].n1_ok&&Tn();return pt=new Fn({}),{c(){$e&&$e.c(),e=g(),vt.c(),i=N("meta"),t=N("meta"),Xe&&Xe.c(),s=ut(),r=g(),O&&O.c(),p=g(),C&&C.c(),c=g(),B&&B.c(),h=g(),W&&W.c(),f=g(),S&&S.c(),v=g(),U&&U.c(),w=g(),P&&P.c(),D=g(),j&&j.c(),L=g(),I.c(),pe=g(),we=N("p"),we.innerHTML=ft,ze=g(),$=N("h2"),$.innerHTML=Te,xe=g(),ee&&ee.c(),He=g(),te&&te.c(),Ee=g(),ne&&ne.c(),Re=g(),z=N("ul"),z.innerHTML=De,Ae=g(),ie&&ie.c(),Oe=g(),he=N("h2"),he.innerHTML=mt,fe=g(),V=N("ul"),V.innerHTML=Ve,qe=g(),R(me.$$.fragment),Ge=g(),X=N("h2"),X.innerHTML=Ce,Be=g(),_e=N("p"),_e.textContent=_t,Qe=g(),R(q.$$.fragment),ge=g(),se&&se.c(),ye=g(),ae&&ae.c(),We=g(),de=N("h2"),de.innerHTML=gt,ue=g(),G=N("p"),G.textContent=Je,Ke=g(),R(be.$$.fragment),Ye=g(),M=N("p"),Z=N("strong"),Z.textContent=Ze,Se=ve(` A city difference is stated only if it shows up in this main
test, holds up without areas under 5,000 residents and without the welfare-receipt indicator, and
points the same way with Berlin's uncorrected welfare indicator. `),J.c(),k=g(),re&&re.c(),et=g(),je=N("h2"),je.innerHTML=Lt,kt=g(),tt=N("p"),tt.textContent=zt,Tt=g(),R(nt.$$.fragment),xt=g(),it=N("p"),it.textContent=Vt,Ht=g(),oe&&oe.c(),yt=g(),st=N("p"),st.innerHTML=qt,Et=g(),ke=N("p"),Ut=ve(`The tables are read directly from the committed
`),Fe=N("a"),Fe.textContent=Gt,Pt=ve(`
(run `),Rt=ve(o[9]),jt=ve(")."),Dt=g(),Ie=N("h2"),Ie.innerHTML=Qt,At=g(),at=N("ul"),at.innerHTML=Jt,Ot=g(),Me=N("h2"),Me.innerHTML=Kt,Ct=g(),rt=N("ul"),rt.innerHTML=Yt,Bt=g(),bt=N("hr"),Wt=g(),R(pt.$$.fragment),this.h()},l(n){$e&&$e.l(n),e=_(n);const a=Wn("svelte-2igo1p",document.head);vt.l(a),i=b(a,"META",{name:!0,content:!0}),t=b(a,"META",{name:!0,content:!0}),Xe&&Xe.l(a),s=ut(),a.forEach(l),r=_(n),O&&O.l(n),p=_(n),C&&C.l(n),c=_(n),B&&B.l(n),h=_(n),W&&W.l(n),f=_(n),S&&S.l(n),v=_(n),U&&U.l(n),w=_(n),P&&P.l(n),D=_(n),j&&j.l(n),L=_(n),I.l(n),pe=_(n),we=b(n,"P",{class:!0,"data-svelte-h":!0}),A(we)!=="svelte-1jta1t0"&&(we.innerHTML=ft),ze=_(n),$=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A($)!=="svelte-9vapku"&&($.innerHTML=Te),xe=_(n),ee&&ee.l(n),He=_(n),te&&te.l(n),Ee=_(n),ne&&ne.l(n),Re=_(n),z=b(n,"UL",{class:!0,"data-svelte-h":!0}),A(z)!=="svelte-p4oe3i"&&(z.innerHTML=De),Ae=_(n),ie&&ie.l(n),Oe=_(n),he=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(he)!=="svelte-17vlrra"&&(he.innerHTML=mt),fe=_(n),V=b(n,"UL",{class:!0,"data-svelte-h":!0}),A(V)!=="svelte-hj6zg0"&&(V.innerHTML=Ve),qe=_(n),E(me.$$.fragment,n),Ge=_(n),X=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(X)!=="svelte-1dv8ero"&&(X.innerHTML=Ce),Be=_(n),_e=b(n,"P",{class:!0,"data-svelte-h":!0}),A(_e)!=="svelte-17a7042"&&(_e.textContent=_t),Qe=_(n),E(q.$$.fragment,n),ge=_(n),se&&se.l(n),ye=_(n),ae&&ae.l(n),We=_(n),de=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(de)!=="svelte-1tvxfby"&&(de.innerHTML=gt),ue=_(n),G=b(n,"P",{class:!0,"data-svelte-h":!0}),A(G)!=="svelte-s06wps"&&(G.textContent=Je),Ke=_(n),E(be.$$.fragment,n),Ye=_(n),M=b(n,"P",{class:!0});var lt=dt(M);Z=b(lt,"STRONG",{class:!0,"data-svelte-h":!0}),A(Z)!=="svelte-1uvpljo"&&(Z.textContent=Ze),Se=Ne(lt,` A city difference is stated only if it shows up in this main
test, holds up without areas under 5,000 residents and without the welfare-receipt indicator, and
points the same way with Berlin's uncorrected welfare indicator. `),J.l(lt),lt.forEach(l),k=_(n),re&&re.l(n),et=_(n),je=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(je)!=="svelte-q97bkk"&&(je.innerHTML=Lt),kt=_(n),tt=b(n,"P",{class:!0,"data-svelte-h":!0}),A(tt)!=="svelte-1ex994p"&&(tt.textContent=zt),Tt=_(n),E(nt.$$.fragment,n),xt=_(n),it=b(n,"P",{class:!0,"data-svelte-h":!0}),A(it)!=="svelte-o44jpj"&&(it.textContent=Vt),Ht=_(n),oe&&oe.l(n),yt=_(n),st=b(n,"P",{class:!0,"data-svelte-h":!0}),A(st)!=="svelte-1jtqal0"&&(st.innerHTML=qt),Et=_(n),ke=b(n,"P",{class:!0});var Le=dt(ke);Ut=Ne(Le,`The tables are read directly from the committed
`),Fe=b(Le,"A",{href:!0,rel:!0,class:!0,"data-svelte-h":!0}),A(Fe)!=="svelte-1rlzjf3"&&(Fe.textContent=Gt),Pt=Ne(Le,`
(run `),Rt=Ne(Le,o[9]),jt=Ne(Le,")."),Le.forEach(l),Dt=_(n),Ie=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(Ie)!=="svelte-ad0syq"&&(Ie.innerHTML=Qt),At=_(n),at=b(n,"UL",{class:!0,"data-svelte-h":!0}),A(at)!=="svelte-1v6kf4p"&&(at.innerHTML=Jt),Ot=_(n),Me=b(n,"H2",{class:!0,id:!0,"data-svelte-h":!0}),A(Me)!=="svelte-oimjns"&&(Me.innerHTML=Kt),Ct=_(n),rt=b(n,"UL",{class:!0,"data-svelte-h":!0}),A(rt)!=="svelte-1hi4cfx"&&(rt.innerHTML=Yt),Bt=_(n),bt=b(n,"HR",{class:!0}),Wt=_(n),E(pt.$$.fragment,n),this.h()},h(){m(i,"name","twitter:card"),m(i,"content","summary_large_image"),m(t,"name","twitter:site"),m(t,"content","@evidence_dev"),m(we,"class","markdown"),m($,"class","markdown"),m($,"id","what-the-comparison-shows"),m(z,"class","markdown"),m(he,"class","markdown"),m(he,"id","read-this-first"),m(V,"class","markdown"),m(X,"class","markdown"),m(X,"id","the-thesis-hypotheses-in-each-city"),m(_e,"class","markdown"),m(de,"class","markdown"),m(de,"id","city-differences-tested"),m(G,"class","markdown"),m(Z,"class","markdown"),m(M,"class","markdown"),m(je,"class","markdown"),m(je,"id","three-new-hypotheses"),m(tt,"class","markdown"),m(it,"class","markdown"),m(st,"class","markdown"),m(Fe,"href","https://github.com/dhelweg/gentriduck/blob/main/docs/epic-e/matched-comparison-results.csv"),m(Fe,"rel","nofollow"),m(Fe,"class","markdown"),m(ke,"class","markdown"),m(Ie,"class","markdown"),m(Ie,"id","honest-caveats"),m(at,"class","markdown"),m(Me,"class","markdown"),m(Me,"id","further-reading"),m(rt,"class","markdown"),m(bt,"class","markdown")},m(n,a){$e&&$e.m(n,a),d(n,e,a),vt.m(document.head,null),Y(document.head,i),Y(document.head,t),Xe&&Xe.m(document.head,null),Y(document.head,s),d(n,r,a),O&&O.m(n,a),d(n,p,a),C&&C.m(n,a),d(n,c,a),B&&B.m(n,a),d(n,h,a),W&&W.m(n,a),d(n,f,a),S&&S.m(n,a),d(n,v,a),U&&U.m(n,a),d(n,w,a),P&&P.m(n,a),d(n,D,a),j&&j.m(n,a),d(n,L,a),wt[F].m(n,a),d(n,pe,a),d(n,we,a),d(n,ze,a),d(n,$,a),d(n,xe,a),ee&&ee.m(n,a),d(n,He,a),te&&te.m(n,a),d(n,Ee,a),ne&&ne.m(n,a),d(n,Re,a),d(n,z,a),d(n,Ae,a),ie&&ie.m(n,a),d(n,Oe,a),d(n,he,a),d(n,fe,a),d(n,V,a),d(n,qe,a),H(me,n,a),d(n,Ge,a),d(n,X,a),d(n,Be,a),d(n,_e,a),d(n,Qe,a),H(q,n,a),d(n,ge,a),se&&se.m(n,a),d(n,ye,a),ae&&ae.m(n,a),d(n,We,a),d(n,de,a),d(n,ue,a),d(n,G,a),d(n,Ke,a),H(be,n,a),d(n,Ye,a),d(n,M,a),Y(M,Z),Y(M,Se),ot[Q].m(M,null),d(n,k,a),re&&re.m(n,a),d(n,et,a),d(n,je,a),d(n,kt,a),d(n,tt,a),d(n,Tt,a),H(nt,n,a),d(n,xt,a),d(n,it,a),d(n,Ht,a),oe&&oe.m(n,a),d(n,yt,a),d(n,st,a),d(n,Et,a),d(n,ke,a),Y(ke,Ut),Y(ke,Fe),Y(ke,Pt),Y(ke,Rt),Y(ke,jt),d(n,Dt,a),d(n,Ie,a),d(n,At,a),d(n,at,a),d(n,Ot,a),d(n,Me,a),d(n,Ct,a),d(n,rt,a),d(n,Bt,a),d(n,bt,a),d(n,Wt,a),H(pt,n,a),Nt=!0},p(n,a){typeof T<"u"&&T.title&&T.hide_title!==!0&&$e.p(n,a),vt.p(n,a),typeof T=="object"&&Xe.p(n,a),n[2]?O?(O.p(n,a),a[0]&4&&y(O,1)):(O=hn(n),O.c(),y(O,1),O.m(p.parentNode,p)):O&&(Pe(),u(O,1,1,()=>{O=null}),Ue()),n[3]?C?(C.p(n,a),a[0]&8&&y(C,1)):(C=dn(n),C.c(),y(C,1),C.m(c.parentNode,c)):C&&(Pe(),u(C,1,1,()=>{C=null}),Ue()),n[4]?B?(B.p(n,a),a[0]&16&&y(B,1)):(B=cn(n),B.c(),y(B,1),B.m(h.parentNode,h)):B&&(Pe(),u(B,1,1,()=>{B=null}),Ue()),n[5]?W?(W.p(n,a),a[0]&32&&y(W,1)):(W=pn(n),W.c(),y(W,1),W.m(f.parentNode,f)):W&&(Pe(),u(W,1,1,()=>{W=null}),Ue()),n[6]?S?(S.p(n,a),a[0]&64&&y(S,1)):(S=wn(n),S.c(),y(S,1),S.m(v.parentNode,v)):S&&(Pe(),u(S,1,1,()=>{S=null}),Ue()),n[7]?U?(U.p(n,a),a[0]&128&&y(U,1)):(U=fn(n),U.c(),y(U,1),U.m(w.parentNode,w)):U&&(Pe(),u(U,1,1,()=>{U=null}),Ue()),n[8]?P?(P.p(n,a),a[0]&256&&y(P,1)):(P=mn(n),P.c(),y(P,1),P.m(D.parentNode,D)):P&&(Pe(),u(P,1,1,()=>{P=null}),Ue()),n[0]?j?(j.p(n,a),a[0]&1&&y(j,1)):(j=_n(n),j.c(),y(j,1),j.m(L.parentNode,L)):j&&(Pe(),u(j,1,1,()=>{j=null}),Ue());let lt=F;F=en(n),F!==lt&&(Pe(),u(wt[lt],1,1,()=>{wt[lt]=null}),Ue(),I=wt[F],I||(I=wt[F]=Zt[F](n),I.c()),y(I,1),I.m(pe.parentNode,pe)),n[1].s1_ok?ee||(ee=gn(),ee.c(),ee.m(He.parentNode,He)):ee&&(ee.d(1),ee=null),n[1].s2_ok?te||(te=yn(),te.c(),te.m(Ee.parentNode,Ee)):te&&(te.d(1),te=null),n[1].s3_ok?ne||(ne=un(),ne.c(),ne.m(Re.parentNode,Re)):ne&&(ne.d(1),ne=null),n[1].s1_ok&&n[1].s2_ok&&n[1].s3_ok?ie&&(ie.d(1),ie=null):ie||(ie=bn(),ie.c(),ie.m(Oe.parentNode,Oe));const Le={};a[2]&1&&(Le.$$scope={dirty:a,ctx:n}),me.$set(Le);const Ft={};a[0]&64&&(Ft.data=n[6]),a[2]&1&&(Ft.$$scope={dirty:a,ctx:n}),q.$set(Ft),n[1].s3_ok?se||(se=Nn(),se.c(),se.m(ye.parentNode,ye)):se&&(se.d(1),se=null),n[1].h1c_ok?ae||(ae=vn(),ae.c(),ae.m(We.parentNode,We)):ae&&(ae.d(1),ae=null);const It={};a[0]&128&&(It.data=n[7]),a[2]&1&&(It.$$scope={dirty:a,ctx:n}),be.$set(It);let Mt=Q;Q=nn(n),Q===Mt?ot[Q].p(n,a):(Pe(),u(ot[Mt],1,1,()=>{ot[Mt]=null}),Ue(),J=ot[Q],J?J.p(n,a):(J=ot[Q]=tn[Q](n),J.c()),y(J,1),J.m(M,null)),n[1].w2_note_ok?re||(re=kn(),re.c(),re.m(et.parentNode,et)):re&&(re.d(1),re=null);const $t={};a[0]&256&&($t.data=n[8]),a[2]&1&&($t.$$scope={dirty:a,ctx:n}),nt.$set($t),n[1].n1_ok?oe||(oe=Tn(),oe.c(),oe.m(yt.parentNode,yt)):oe&&(oe.d(1),oe=null),(!Nt||a[0]&512)&&St(Rt,n[9])},i(n){Nt||(y(O),y(C),y(B),y(W),y(S),y(U),y(P),y(j),y(I),y(me.$$.fragment,n),y(q.$$.fragment,n),y(be.$$.fragment,n),y(J),y(nt.$$.fragment,n),y(pt.$$.fragment,n),Nt=!0)},o(n){u(O),u(C),u(B),u(W),u(S),u(U),u(P),u(j),u(I),u(me.$$.fragment,n),u(q.$$.fragment,n),u(be.$$.fragment,n),u(J),u(nt.$$.fragment,n),u(pt.$$.fragment,n),Nt=!1},d(n){n&&(l(e),l(r),l(p),l(c),l(h),l(f),l(v),l(w),l(D),l(L),l(pe),l(we),l(ze),l($),l(xe),l(He),l(Ee),l(Re),l(z),l(Ae),l(Oe),l(he),l(fe),l(V),l(qe),l(Ge),l(X),l(Be),l(_e),l(Qe),l(ge),l(ye),l(We),l(de),l(ue),l(G),l(Ke),l(Ye),l(M),l(k),l(et),l(je),l(kt),l(tt),l(Tt),l(xt),l(it),l(Ht),l(yt),l(st),l(Et),l(ke),l(Dt),l(Ie),l(At),l(at),l(Ot),l(Me),l(Ct),l(rt),l(Bt),l(bt),l(Wt)),$e&&$e.d(n),vt.d(n),l(i),l(t),Xe&&Xe.d(n),l(s),O&&O.d(n),C&&C.d(n),B&&B.d(n),W&&W.d(n),S&&S.d(n),U&&U.d(n),P&&P.d(n),j&&j.d(n),wt[F].d(n),ee&&ee.d(n),te&&te.d(n),ne&&ne.d(n),ie&&ie.d(n),x(me,n),x(q,n),se&&se.d(n),ae&&ae.d(n),x(be,n),ot[Q].d(),re&&re.d(n),x(nt,n),oe&&oe.d(n),x(pt,n)}}}const T={title:"Berlin vs Hamburg, like for like"};function fi(o,e,i){let t,s,r,p;sn(o,zn,k=>i(44,r=k)),sn(o,rn,k=>i(50,p=k));let{data:c}=e,{data:h={},customFormattingSettings:f,__db:v,inputs:w}=c;Sn(rn,p="9dbda18bab4916da88311f5baa763749",p);let D=Mn(In(w));Un(D.subscribe(k=>w=k)),Pn(Ln,{getCustomFormats:()=>f.customFormats||[]});const L=(k,et)=>Vn(v.query,k,{query_name:et});$n(L),r.params,jn(()=>!0);let F={initialData:void 0,initialError:void 0},I=K`-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))`,pe=`-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))`;h.mc_shown_data&&(h.mc_shown_data instanceof Error?F.initialError=h.mc_shown_data:F.initialData=h.mc_shown_data,h.mc_shown_columns&&(F.knownColumns=h.mc_shown_columns));let we,ft=!1;const ze=ht.createReactive({callback:k=>{i(2,we=k)},execFn:L},{id:"mc_shown",...F});ze(pe,{noResolve:I,...F}),globalThis[Symbol.for("mc_shown")]={get value(){return we}};let $={initialData:void 0,initialError:void 0},Te=K`-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window`,xe=`-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window`;h.mc_checks_data&&(h.mc_checks_data instanceof Error?$.initialError=h.mc_checks_data:$.initialData=h.mc_checks_data,h.mc_checks_columns&&($.knownColumns=h.mc_checks_columns));let He,Ee=!1;const Re=ht.createReactive({callback:k=>{i(3,He=k)},execFn:L},{id:"mc_checks",...$});Re(xe,{noResolve:Te,...$}),globalThis[Symbol.for("mc_checks")]={get value(){return He}};let z={initialData:void 0,initialError:void 0},De=K`-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base`,Ae=`-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base`;h.mc_cells_data&&(h.mc_cells_data instanceof Error?z.initialError=h.mc_cells_data:z.initialData=h.mc_cells_data,h.mc_cells_columns&&(z.knownColumns=h.mc_cells_columns));let Oe,he=!1;const mt=ht.createReactive({callback:k=>{i(4,Oe=k)},execFn:L},{id:"mc_cells",...z});mt(Ae,{noResolve:De,...z}),globalThis[Symbol.for("mc_cells")]={get value(){return Oe}};let fe={initialData:void 0,initialError:void 0},V=K`-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)`,Ve=`-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)`;h.mc_hyp_data&&(h.mc_hyp_data instanceof Error?fe.initialError=h.mc_hyp_data:fe.initialData=h.mc_hyp_data,h.mc_hyp_columns&&(fe.knownColumns=h.mc_hyp_columns));let qe,me=!1;const Ge=ht.createReactive({callback:k=>{i(5,qe=k)},execFn:L},{id:"mc_hyp",...fe});Ge(Ve,{noResolve:V,...fe}),globalThis[Symbol.for("mc_hyp")]={get value(){return qe}};let X={initialData:void 0,initialError:void 0},Ce=K`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
where h.hypothesis not like 'N%'
order by h.sort_order`,Be=`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
where h.hypothesis not like 'N%'
order by h.sort_order`;h.thesis_side_by_side_data&&(h.thesis_side_by_side_data instanceof Error?X.initialError=h.thesis_side_by_side_data:X.initialData=h.thesis_side_by_side_data,h.thesis_side_by_side_columns&&(X.knownColumns=h.thesis_side_by_side_columns));let _e,_t=!1;const Qe=ht.createReactive({callback:k=>{i(6,_e=k)},execFn:L},{id:"thesis_side_by_side",...X});Qe(Be,{noResolve:Ce,...X}),globalThis[Symbol.for("thesis_side_by_side")]={get value(){return _e}};let q={initialData:void 0,initialError:void 0},ge=K`select h.sort_order, h.hypothesis, h.plain, d.delta_ci, d.mdd_txt, d.cell as result
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH' and d.family = 'X8'
where h.hypothesis not like 'N%'
order by h.sort_order`,ye=`select h.sort_order, h.hypothesis, h.plain, d.delta_ci, d.mdd_txt, d.cell as result
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH' and d.family = 'X8'
where h.hypothesis not like 'N%'
order by h.sort_order`;h.thesis_differences_data&&(h.thesis_differences_data instanceof Error?q.initialError=h.thesis_differences_data:q.initialData=h.thesis_differences_data,h.thesis_differences_columns&&(q.knownColumns=h.thesis_differences_columns));let We,de=!1;const gt=ht.createReactive({callback:k=>{i(7,We=k)},execFn:L},{id:"thesis_differences",...q});gt(ye,{noResolve:ge,...q}),globalThis[Symbol.for("thesis_differences")]={get value(){return We}};let ue={initialData:void 0,initialError:void 0},G=K`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg,
    case when d.delta_ci is not null then 'Δ ' || d.delta_ci || ', MDD ' || d.mdd_txt || '<br>' else '' end
    || d.cell as difference
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH'
where h.hypothesis like 'N%'
order by h.sort_order`,Je=`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg,
    case when d.delta_ci is not null then 'Δ ' || d.delta_ci || ', MDD ' || d.mdd_txt || '<br>' else '' end
    || d.cell as difference
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH'
where h.hypothesis like 'N%'
order by h.sort_order`;h.new_hypotheses_data&&(h.new_hypotheses_data instanceof Error?ue.initialError=h.new_hypotheses_data:ue.initialData=h.new_hypotheses_data,h.new_hypotheses_columns&&(ue.knownColumns=h.new_hypotheses_columns));let Ke,be=!1;const Ye=ht.createReactive({callback:k=>{i(8,Ke=k)},execFn:L},{id:"new_hypotheses",...ue});Ye(Je,{noResolve:G,...ue}),globalThis[Symbol.for("new_hypotheses")]={get value(){return Ke}};let M={initialData:void 0,initialError:void 0},Z=K`-- Each hand-written sentence is shown only while the rows still carry the result it was written
-- for (see the header comment). x8_differs feeds the statement-rule line (domain O1).
select
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') = 8
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where family = 'X8' and verdict <> 'NO DIFFERENCE DETECTED') = 0 as lead_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H1a', 'H1b') and verdict = 'SUPPORTED') = 4 as s1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H3a', 'H3b', 'H3c')
       and verdict = 'NOT SIGNIFICANT') = 6 as s2_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H2' and verdict = 'SUPPORTED') = 1 as s3_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H1c' and verdict = 'CONTRADICTED') = 1 as h1c_ok,
    -- D6 note (review low 4): only while the primary X8 H2 row is NO DIFFERENCE DETECTED, the
    -- Berlin H2 sentence holds (as s3_ok), and the W2-only exploratory BER-HH H2 row (window
    -- 2021-2023) is DIFFERS with Hamburg below chance (flag amendment3_below_chance).
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'X8' and hypothesis = 'H2' and verdict = 'NO DIFFERENCE DETECTED') = 1
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where city = 'BER' and family = 'T8' and hypothesis = 'H2'
               and verdict = 'SUPPORTED') = 1
        and (select count(*) from gentriduck_findings.matched_comparison
             where city = 'BER-HH' and role = 'exploratory' and sens_tag = ''
               and hypothesis = 'H2' and time_window = '2021-2023'
               and verdict = 'DIFFERS'
               and flags like '%amendment3_below_chance%') = 1 as w2_note_ok,
    -- Berlin N1 sentence (review low 5): only while the BER N1 primary row is NO DATA.
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and role = 'primary' and hypothesis = 'N1'
       and verdict = 'NO DATA') = 1 as n1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') as x8_n,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8' and verdict = 'DIFFERS') as x8_differs,
    (select string_agg(distinct run_sha, ', ') from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))) as run_sha`,Ze=`-- Each hand-written sentence is shown only while the rows still carry the result it was written
-- for (see the header comment). x8_differs feeds the statement-rule line (domain O1).
select
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') = 8
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where family = 'X8' and verdict <> 'NO DIFFERENCE DETECTED') = 0 as lead_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H1a', 'H1b') and verdict = 'SUPPORTED') = 4 as s1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H3a', 'H3b', 'H3c')
       and verdict = 'NOT SIGNIFICANT') = 6 as s2_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H2' and verdict = 'SUPPORTED') = 1 as s3_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H1c' and verdict = 'CONTRADICTED') = 1 as h1c_ok,
    -- D6 note (review low 4): only while the primary X8 H2 row is NO DIFFERENCE DETECTED, the
    -- Berlin H2 sentence holds (as s3_ok), and the W2-only exploratory BER-HH H2 row (window
    -- 2021-2023) is DIFFERS with Hamburg below chance (flag amendment3_below_chance).
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'X8' and hypothesis = 'H2' and verdict = 'NO DIFFERENCE DETECTED') = 1
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where city = 'BER' and family = 'T8' and hypothesis = 'H2'
               and verdict = 'SUPPORTED') = 1
        and (select count(*) from gentriduck_findings.matched_comparison
             where city = 'BER-HH' and role = 'exploratory' and sens_tag = ''
               and hypothesis = 'H2' and time_window = '2021-2023'
               and verdict = 'DIFFERS'
               and flags like '%amendment3_below_chance%') = 1 as w2_note_ok,
    -- Berlin N1 sentence (review low 5): only while the BER N1 primary row is NO DATA.
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and role = 'primary' and hypothesis = 'N1'
       and verdict = 'NO DATA') = 1 as n1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') as x8_n,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8' and verdict = 'DIFFERS') as x8_differs,
    (select string_agg(distinct run_sha, ', ') from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))) as run_sha`;h.guards_data&&(h.guards_data instanceof Error?M.initialError=h.guards_data:M.initialData=h.guards_data,h.guards_columns&&(M.knownColumns=h.guards_columns));let Se,Q=!1;const J=ht.createReactive({callback:k=>{i(0,Se=k)},execFn:L},{id:"guards",...M});return J(Ze,{noResolve:Z,...M}),globalThis[Symbol.for("guards")]={get value(){return Se}},o.$$set=k=>{"data"in k&&i(10,c=k.data)},o.$$.update=()=>{o.$$.dirty[0]&1024&&i(11,{data:h={},customFormattingSettings:f,__db:v}=c,h),o.$$.dirty[0]&2048&&Xn.set(Object.keys(h).length>0),o.$$.dirty[1]&8192&&r.params,o.$$.dirty[0]&61440&&(I||!ft?I||(ze(pe,{noResolve:I,...F}),i(15,ft=!0)):ze(pe,{noResolve:I})),o.$$.dirty[0]&983040&&(Te||!Ee?Te||(Re(xe,{noResolve:Te,...$}),i(19,Ee=!0)):Re(xe,{noResolve:Te})),o.$$.dirty[0]&15728640&&(De||!he?De||(mt(Ae,{noResolve:De,...z}),i(23,he=!0)):mt(Ae,{noResolve:De})),o.$$.dirty[0]&251658240&&(V||!me?V||(Ge(Ve,{noResolve:V,...fe}),i(27,me=!0)):Ge(Ve,{noResolve:V})),o.$$.dirty[0]&1879048192|o.$$.dirty[1]&1&&(Ce||!_t?Ce||(Qe(Be,{noResolve:Ce,...X}),i(31,_t=!0)):Qe(Be,{noResolve:Ce})),o.$$.dirty[1]&30&&(ge||!de?ge||(gt(ye,{noResolve:ge,...q}),i(35,de=!0)):gt(ye,{noResolve:ge})),o.$$.dirty[1]&480&&(G||!be?G||(Ye(Je,{noResolve:G,...ue}),i(39,be=!0)):Ye(Je,{noResolve:G})),o.$$.dirty[1]&7680&&(Z||!Q?Z||(J(Ze,{noResolve:Z,...M}),i(43,Q=!0)):J(Ze,{noResolve:Z})),o.$$.dirty[0]&1&&i(1,t=(Se==null?void 0:Se[0])??{}),o.$$.dirty[0]&2&&i(9,s=t.run_sha??"")},i(13,I=K`-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))`),i(14,pe=`-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))`),i(17,Te=K`-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window`),i(18,xe=`-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window`),i(21,De=K`-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base`),i(22,Ae=`-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base`),i(25,V=K`-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)`),i(26,Ve=`-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)`),i(29,Ce=K`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
where h.hypothesis not like 'N%'
order by h.sort_order`),i(30,Be=`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
where h.hypothesis not like 'N%'
order by h.sort_order`),i(33,ge=K`select h.sort_order, h.hypothesis, h.plain, d.delta_ci, d.mdd_txt, d.cell as result
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH' and d.family = 'X8'
where h.hypothesis not like 'N%'
order by h.sort_order`),i(34,ye=`select h.sort_order, h.hypothesis, h.plain, d.delta_ci, d.mdd_txt, d.cell as result
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH' and d.family = 'X8'
where h.hypothesis not like 'N%'
order by h.sort_order`),i(37,G=K`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg,
    case when d.delta_ci is not null then 'Δ ' || d.delta_ci || ', MDD ' || d.mdd_txt || '<br>' else '' end
    || d.cell as difference
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH'
where h.hypothesis like 'N%'
order by h.sort_order`),i(38,Je=`select h.sort_order, h.hypothesis, h.plain, be.cell as berlin, hh.cell as hamburg,
    case when d.delta_ci is not null then 'Δ ' || d.delta_ci || ', MDD ' || d.mdd_txt || '<br>' else '' end
    || d.cell as difference
from (-- Plain-language hypothesis wording (thesis H1-H3c as on /thesis-recheck; N1-N3 per the
-- pre-registration §7 with the D5a/D5b/D7 public wording).
select * from (
    values
        (1, 'H1',  'An area''s social status is linked to its local business mix'),
        (2, 'H1a', 'Areas where cafés make up more of the gastronomy mix have higher status'),
        (3, 'H1b', 'Areas where fast food makes up more of the gastronomy mix have lower status'),
        (4, 'H1c', 'Areas with many sport and leisure facilities have higher status'),
        (5, 'H2',  'Today''s mix of shops, services and public facilities is linked to the next change in officially measured disadvantage'),
        (6, 'H3a', 'Commercial change comes first; change in measured disadvantage follows'),
        (7, 'H3b', 'Change in measured disadvantage comes first; commercial change follows'),
        (8, 'H3c', 'Both change in the same period'),
        (9, 'N1',  'Among the more disadvantaged half of neighbourhoods, growth in local businesses comes before a fall in measured disadvantage'),
        (10, 'N2', 'A shift in the gastronomy mix toward cafés comes before a fall in measured disadvantage'),
        (11, 'N3', 'Business growth in neighbouring areas comes before a fall in an area''s measured disadvantage, beyond its own growth')
) as t(sort_order, hypothesis, plain)) h
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) be on be.hypothesis = h.hypothesis and be.city = 'BER'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) hh on hh.hypothesis = h.hypothesis and hh.city = 'HH'
left join (-- One HTML cell per displayed row (DataTable contentType=html). Every string is a fixed literal;
-- the only CSV-derived text is numbers and the effect label, so no CSV text is injected as HTML.
-- Unknown verdict -> NULL -> blank cell.
with base as (
    select s.*, c.checks_html,
        case when s.estimator like '%auc%' then 0.10 else 0.30 end as mdd_threshold,
        case when s.estimator like '%auc%' then 'AUC ' else 'ρ ' end as est_prefix
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) s
    left join (-- One line per flag, rendered as "<check> (<meaning>)" with the same meaning labels as the
-- regenerated findings (2e818492): "(sign unstable around zero)", "(unadjusted significance
-- change)", and for maup_flip "(grain-dependent, MAUP)" (domain R1, geo R2/R5). The sensitivity row
-- that set each flag is found by its operationalisation tag (same city, hypothesis and window), and
-- the meaning is read off the two unadjusted p values (A5.1; §6.5 for maup_flip). Flags that are
-- not checks are handled elsewhere: ewr_2022_interpolated (legend + methods box),
-- amendment3_below_chance (only on rows not shown here). Unknown flags still render as words.
with f as (
    select city, hypothesis, time_window, p_boot as p_main,
        unnest(string_split(flags, ';')) as flag
    from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
    where coalesce(flags, '') <> ''
),
j as (
    select f.*, x.p_boot as p_sens
    from f
    left join gentriduck_findings.matched_comparison x
        on x.city = f.city
        and x.hypothesis = f.hypothesis
        and x.time_window = f.time_window
        and x.sens_tag = case f.flag
            when 'small_units_flip' then 'ge5000'
            when 'core2_flip' then 'core2'
            when 'core3m_flip' then 'core3m'
            when 'w24_weight_sensitive' then 'W24'
            when 'r19_revision_sensitive' then 'R19pub'
            when 'maup_flip' then 'fine'
        end
),
lbl as (
    select city, hypothesis, time_window, flag,
        case flag
            when 'small_units_flip' then 1 when 'core2_flip' then 2 when 'core3m_flip' then 3
            when 'core1u_flip' then 4 when 'w24_weight_sensitive' then 5
            when 'r19_revision_sensitive' then 6 when 'maup_flip' then 7 else 9
        end as sort_order,
        case flag
            when 'small_units_flip' then 'Without areas under 5,000 residents'
            when 'core2_flip' then 'Without the welfare-receipt indicator'
            when 'core3m_flip' then 'With Berlin''s uncorrected welfare indicator'
            when 'core1u_flip' then 'With unemployment alone'
            when 'w24_weight_sensitive' then 'With 2024 population weights (weight-sensitive)'
            when 'r19_revision_sensitive' then 'With Hamburg''s 2019 welfare base as first published'
            when 'maup_flip' then 'At the finer grain (planning areas, statistical areas)'
            when 'mapping_driven' then 'Without the areas with the fastest growth in mapped places'
            when 'popgrowth_driven' then 'Without the areas with the fastest population growth'
            when 'w2_only' then 'Only in the 2021–2023 window (exploratory): see the note below this table'
            else 'Another robustness check (see the findings)'
        end
        || case
            when flag = 'w2_only' then ''
            when p_sens is null or p_main is null then ''
            when flag = 'maup_flip' then
                case when p_main >= 0.05 and p_sens >= 0.05
                    then ' (sign unstable around zero)'
                    else ' (grain-dependent, MAUP)' end
            when (p_main < 0.05) <> (p_sens < 0.05) then ' (unadjusted significance change)'
            when p_main >= 0.05 and p_sens >= 0.05 then ' (sign unstable around zero)'
            else ' (sign change)'
        end as label
    from j
    where flag not in ('ewr_2022_interpolated', 'amendment3_below_chance')
)
select city, hypothesis, time_window,
    string_agg(label, '<br>' order by sort_order) as checks_html
from lbl
group by city, hypothesis, time_window) c
        on c.city = s.city and c.hypothesis = s.hypothesis and c.time_window = s.time_window
)
select
    city,
    hypothesis,
    family,
    case
        -- per-city rows (T8, N1-N3)
        when city <> 'BER-HH' then
            case verdict
                when 'SUPPORTED' then '<b>Supported</b>'
                when 'CONTRADICTED' then '<b>Opposite direction</b>'
                when 'NOT SIGNIFICANT' then '<b>Not significant</b>'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when verdict <> 'NO DATA' and effect_label is not null
                then ', ' || effect_label else '' end
            || case when role = 'exploratory' then ' (exploratory)' else '' end
            || case
                when estimate is not null then
                    '<br>' || est_prefix || replace(printf('%.2f', estimate), '-', '−')
                    || ' [' || replace(printf('%.2f', ci_low), '-', '−') || ', '
                    || replace(printf('%.2f', ci_high), '-', '−') || '], n = ' || cast(cast(n as integer) as varchar)
                when verdict = 'NO DATA' then
                    '<br><span style="opacity:0.8">Only ' || cast(cast(n_blocks as integer) as varchar)
                    || ' spatial blocks are occupied; at least 20 are needed for a verdict.</span>'
                else ''
            end
            -- Domain O2: the Berlin H2 sentence (domain §3, bullet 3, verbatim) sits directly
            -- below the table; the cell carries a short pointer to it, so the row stays short on
            -- mobile (review low 9). Same condition as the sentence's guard (BER H2 SUPPORTED).
            || case when city = 'BER' and hypothesis = 'H2' and verdict = 'SUPPORTED' then
                '<br><span style="opacity:0.9"><i>Weak, 2021–2023 only: see the Berlin H2 note directly below this table.</i></span>'
                else '' end
        -- city differences (X8, and the exploratory N1-N3 differences)
        else
            case verdict
                when 'NO DIFFERENCE DETECTED' then '<b>No difference detected</b>'
                    || case when mdd > mdd_threshold then
                        ' (too imprecise to say the cities agree: MDD '
                        || printf('%.3f', mdd) || ' > ' || printf('%.2f', mdd_threshold) || ')'
                        else '' end
                when 'DIFFERS' then '<b>Flagged by the test</b> (a city difference is stated only if it passes the statement rule; see the findings)'
                when 'NO DATA' then '<b>Could not be tested at this grain</b>'
            end
            || case when role = 'exploratory' then '<br><i>Exploratory, uncorrected</i>' else '' end
    end
    || coalesce(
        '<br><span style="opacity:0.75;font-size:0.92em">Checks: ' || checks_html || '</span>', ''
    ) as cell,
    case when estimate is not null and city = 'BER-HH' then
        replace(printf('%.3f', estimate), '-', '−') || ' ['
        || replace(printf('%.3f', ci_low), '-', '−') || ', '
        || replace(printf('%.3f', ci_high), '-', '−') || ']'
    end as delta_ci,
    case when mdd is not null then printf('%.3f', mdd) end as mdd_txt,
    run_sha
from base) d on d.hypothesis = h.hypothesis and d.city = 'BER-HH'
where h.hypothesis like 'N%'
order by h.sort_order`),i(41,Z=K`-- Each hand-written sentence is shown only while the rows still carry the result it was written
-- for (see the header comment). x8_differs feeds the statement-rule line (domain O1).
select
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') = 8
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where family = 'X8' and verdict <> 'NO DIFFERENCE DETECTED') = 0 as lead_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H1a', 'H1b') and verdict = 'SUPPORTED') = 4 as s1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H3a', 'H3b', 'H3c')
       and verdict = 'NOT SIGNIFICANT') = 6 as s2_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H2' and verdict = 'SUPPORTED') = 1 as s3_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H1c' and verdict = 'CONTRADICTED') = 1 as h1c_ok,
    -- D6 note (review low 4): only while the primary X8 H2 row is NO DIFFERENCE DETECTED, the
    -- Berlin H2 sentence holds (as s3_ok), and the W2-only exploratory BER-HH H2 row (window
    -- 2021-2023) is DIFFERS with Hamburg below chance (flag amendment3_below_chance).
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'X8' and hypothesis = 'H2' and verdict = 'NO DIFFERENCE DETECTED') = 1
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where city = 'BER' and family = 'T8' and hypothesis = 'H2'
               and verdict = 'SUPPORTED') = 1
        and (select count(*) from gentriduck_findings.matched_comparison
             where city = 'BER-HH' and role = 'exploratory' and sens_tag = ''
               and hypothesis = 'H2' and time_window = '2021-2023'
               and verdict = 'DIFFERS'
               and flags like '%amendment3_below_chance%') = 1 as w2_note_ok,
    -- Berlin N1 sentence (review low 5): only while the BER N1 primary row is NO DATA.
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and role = 'primary' and hypothesis = 'N1'
       and verdict = 'NO DATA') = 1 as n1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') as x8_n,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8' and verdict = 'DIFFERS') as x8_differs,
    (select string_agg(distinct run_sha, ', ') from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))) as run_sha`),i(42,Ze=`-- Each hand-written sentence is shown only while the rows still carry the result it was written
-- for (see the header comment). x8_differs feeds the statement-rule line (domain O1).
select
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') = 8
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where family = 'X8' and verdict <> 'NO DIFFERENCE DETECTED') = 0 as lead_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H1a', 'H1b') and verdict = 'SUPPORTED') = 4 as s1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'T8' and hypothesis in ('H3a', 'H3b', 'H3c')
       and verdict = 'NOT SIGNIFICANT') = 6 as s2_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H2' and verdict = 'SUPPORTED') = 1 as s3_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and family = 'T8' and hypothesis = 'H1c' and verdict = 'CONTRADICTED') = 1 as h1c_ok,
    -- D6 note (review low 4): only while the primary X8 H2 row is NO DIFFERENCE DETECTED, the
    -- Berlin H2 sentence holds (as s3_ok), and the W2-only exploratory BER-HH H2 row (window
    -- 2021-2023) is DIFFERS with Hamburg below chance (flag amendment3_below_chance).
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where family = 'X8' and hypothesis = 'H2' and verdict = 'NO DIFFERENCE DETECTED') = 1
        and (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
             where city = 'BER' and family = 'T8' and hypothesis = 'H2'
               and verdict = 'SUPPORTED') = 1
        and (select count(*) from gentriduck_findings.matched_comparison
             where city = 'BER-HH' and role = 'exploratory' and sens_tag = ''
               and hypothesis = 'H2' and time_window = '2021-2023'
               and verdict = 'DIFFERS'
               and flags like '%amendment3_below_chance%') = 1 as w2_note_ok,
    -- Berlin N1 sentence (review low 5): only while the BER N1 primary row is NO DATA.
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))
     where city = 'BER' and role = 'primary' and hypothesis = 'N1'
       and verdict = 'NO DATA') = 1 as n1_ok,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8') as x8_n,
    (select count(*) from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3'))) where family = 'X8' and verdict = 'DIFFERS') as x8_differs,
    (select string_agg(distinct run_sha, ', ') from (-- The rows this page displays: T8 and N per city (role primary), X8 (role interaction), the
-- per-city N3 rows and the BER-HH N1-N3 rows (role exploratory, all windows pooled, untagged).
select *
from gentriduck_findings.matched_comparison
where role in ('primary', 'interaction')
   or (role = 'exploratory' and sens_tag = '' and time_window = '2019-2025'
       and hypothesis in ('N1', 'N2', 'N3')))) as run_sha`),[Se,t,we,He,Oe,qe,_e,We,Ke,s,c,h,F,I,pe,ft,$,Te,xe,Ee,z,De,Ae,he,fe,V,Ve,me,X,Ce,Be,_t,q,ge,ye,de,ue,G,Je,be,M,Z,Ze,Q,r]}class Ri extends Hn{constructor(e){super(),En(this,e,fi,wi,xn,{data:10},null,[-1,-1,-1])}}export{Ri as component};
