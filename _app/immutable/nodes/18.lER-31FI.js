import{s as nt,d as n,i as c,a as Fe,b as f,c as p,h as ot,e as b,f as De,g as D,j as y,k as v,l as Ye,m as lt,o as ct,n as dt,p as _t,q as se,t as ye,u as he,r as mt}from"../chunks/scheduler.BopPEjhc.js";import{S as ut,i as ft,d as B,t as x,a as w,c as Le,m as H,b as M,e as S,g as qe}from"../chunks/index.CYkVJg6_.js";import{F as pt}from"../chunks/FooterNav.Q7MmbWm3.js";import{H as yt}from"../chunks/Hero.CRoRGI02.js";import{D as Ke,C as Z}from"../chunks/VennDiagram.svelte_svelte_type_style_lang.DrVUZ76A.js";import{w as ht}from"../chunks/entry.BMmpG6A7.js";import{A as gt}from"../chunks/Alert.BO8kFSQK.js";import{e as wt,s as bt,Q as Ae,p as vt,a as Ze,r as et,C as $t}from"../chunks/inferColumnTypes.B1nNps41.js";import{h as pe}from"../chunks/setTrackProxy.Cyfckp0w.js";import{p as kt}from"../chunks/stores.Ceyp10jj.js";import{Q as Ie}from"../chunks/QueryViewer.CNDqAaoE.js";import{B as xt}from"../chunks/BarChart.DzrCmZ_r.js";import{L as jt}from"../chunks/LineChart.BThKrpoY.js";import{p as Tt}from"../chunks/profile.BW8tN6E9.js";function Et(m){let a,s=$.title+"",t;return{c(){a=v("h1"),t=he(s),this.h()},l(o){a=b(o,"H1",{class:!0});var d=mt(a);t=ye(d,s),d.forEach(n),this.h()},h(){f(a,"class","title")},m(o,d){c(o,a,d),Fe(a,t)},p:se,d(o){o&&n(a)}}}function Ct(m){return{c(){this.h()},l(a){this.h()},h(){document.title="Evidence"},m:se,p:se,d:se}}function Rt(m){let a,s,t,o,d;return document.title=a=$.title,{c(){s=y(),t=v("meta"),o=y(),d=v("meta"),this.h()},l(i){s=p(i),t=b(i,"META",{property:!0,content:!0}),o=p(i),d=b(i,"META",{name:!0,content:!0}),this.h()},h(){var i,_;f(t,"property","og:title"),f(t,"content",((i=$.og)==null?void 0:i.title)??$.title),f(d,"name","twitter:title"),f(d,"content",((_=$.og)==null?void 0:_.title)??$.title)},m(i,_){c(i,s,_),c(i,t,_),c(i,o,_),c(i,d,_)},p(i,_){_&0&&a!==(a=$.title)&&(document.title=a)},d(i){i&&(n(s),n(t),n(o),n(d))}}}function Bt(m){var d,i;let a,s,t=($.description||((d=$.og)==null?void 0:d.description))&&Ht(),o=((i=$.og)==null?void 0:i.image)&&Mt();return{c(){t&&t.c(),a=y(),o&&o.c(),s=De()},l(_){t&&t.l(_),a=p(_),o&&o.l(_),s=De()},m(_,g){t&&t.m(_,g),c(_,a,g),o&&o.m(_,g),c(_,s,g)},p(_,g){var k,j;($.description||(k=$.og)!=null&&k.description)&&t.p(_,g),(j=$.og)!=null&&j.image&&o.p(_,g)},d(_){_&&(n(a),n(s)),t&&t.d(_),o&&o.d(_)}}}function Ht(m){let a,s,t,o,d;return{c(){a=v("meta"),s=y(),t=v("meta"),o=y(),d=v("meta"),this.h()},l(i){a=b(i,"META",{name:!0,content:!0}),s=p(i),t=b(i,"META",{property:!0,content:!0}),o=p(i),d=b(i,"META",{name:!0,content:!0}),this.h()},h(){var i,_,g;f(a,"name","description"),f(a,"content",$.description??((i=$.og)==null?void 0:i.description)),f(t,"property","og:description"),f(t,"content",((_=$.og)==null?void 0:_.description)??$.description),f(d,"name","twitter:description"),f(d,"content",((g=$.og)==null?void 0:g.description)??$.description)},m(i,_){c(i,a,_),c(i,s,_),c(i,t,_),c(i,o,_),c(i,d,_)},p:se,d(i){i&&(n(a),n(s),n(t),n(o),n(d))}}}function Mt(m){let a,s,t;return{c(){a=v("meta"),s=y(),t=v("meta"),this.h()},l(o){a=b(o,"META",{property:!0,content:!0}),s=p(o),t=b(o,"META",{name:!0,content:!0}),this.h()},h(){var o,d;f(a,"property","og:image"),f(a,"content",Ze((o=$.og)==null?void 0:o.image)),f(t,"name","twitter:image"),f(t,"content",Ze((d=$.og)==null?void 0:d.image))},m(o,d){c(o,a,d),c(o,s,d),c(o,t,d)},p:se,d(o){o&&(n(a),n(s),n(t))}}}function St(m){let a,s="How to read status:",t,o,d="1 = least deprived",i,_,g="4 = most deprived",k,j,r="falling",h,T,Y="negative",J,I,Q="less",P,E,K="methodology & data sources",z;return{c(){a=v("b"),a.textContent=s,t=he(" the official status scale runs "),o=v("b"),o.textContent=d,i=he(` to
  `),_=v("b"),_.textContent=g,k=he(", so a "),j=v("b"),j.textContent=r,h=he(" line or a "),T=v("b"),T.textContent=Y,J=he(` change means an area became
  `),I=v("b"),I.textContent=Q,P=he(` deprived (its official status rose). "Rose" is not automatically good news for existing
  residents — rising status is also the signature of gentrification, and can reflect displacement as
  easily as incumbent social mobility. See the
  `),E=v("a"),E.textContent=K,z=he(` page for the full picture. Berlin's area
  boundaries were redrawn in 2021; the movers table below is computed on the current (2021+)
  boundaries so it lines up with the map and the area drill-down.`),this.h()},l(u){a=b(u,"B",{"data-svelte-h":!0}),D(a)!=="svelte-194jxrl"&&(a.textContent=s),t=ye(u," the official status scale runs "),o=b(u,"B",{"data-svelte-h":!0}),D(o)!=="svelte-1bcgix4"&&(o.textContent=d),i=ye(u,` to
  `),_=b(u,"B",{"data-svelte-h":!0}),D(_)!=="svelte-1cr3k8t"&&(_.textContent=g),k=ye(u,", so a "),j=b(u,"B",{"data-svelte-h":!0}),D(j)!=="svelte-164rnor"&&(j.textContent=r),h=ye(u," line or a "),T=b(u,"B",{"data-svelte-h":!0}),D(T)!=="svelte-1kmedgd"&&(T.textContent=Y),J=ye(u,` change means an area became
  `),I=b(u,"B",{"data-svelte-h":!0}),D(I)!=="svelte-u149sn"&&(I.textContent=Q),P=ye(u,` deprived (its official status rose). "Rose" is not automatically good news for existing
  residents — rising status is also the signature of gentrification, and can reflect displacement as
  easily as incumbent social mobility. See the
  `),E=b(u,"A",{href:!0,"data-svelte-h":!0}),D(E)!=="svelte-3zcnok"&&(E.textContent=K),z=ye(u,` page for the full picture. Berlin's area
  boundaries were redrawn in 2021; the movers table below is computed on the current (2021+)
  boundaries so it lines up with the map and the area drill-down.`),this.h()},h(){f(E,"href","/gentriduck/methodology")},m(u,R){c(u,a,R),c(u,t,R),c(u,o,R),c(u,i,R),c(u,_,R),c(u,k,R),c(u,j,R),c(u,h,R),c(u,T,R),c(u,J,R),c(u,I,R),c(u,P,R),c(u,E,R),c(u,z,R)},p:se,d(u){u&&(n(a),n(t),n(o),n(i),n(_),n(k),n(j),n(h),n(T),n(J),n(I),n(P),n(E),n(z))}}}function tt(m){let a,s;return a=new Ie({props:{queryID:"citywide_trend",queryResult:m[0]}}),{c(){S(a.$$.fragment)},l(t){M(a.$$.fragment,t)},m(t,o){H(a,t,o),s=!0},p(t,o){const d={};o[0]&1&&(d.queryResult=t[0]),a.$set(d)},i(t){s||(w(a.$$.fragment,t),s=!0)},o(t){x(a.$$.fragment,t),s=!1},d(t){B(a,t)}}}function at(m){let a,s;return a=new Ie({props:{queryID:"improvers",queryResult:m[1]}}),{c(){S(a.$$.fragment)},l(t){M(a.$$.fragment,t)},m(t,o){H(a,t,o),s=!0},p(t,o){const d={};o[0]&2&&(d.queryResult=t[1]),a.$set(d)},i(t){s||(w(a.$$.fragment,t),s=!0)},o(t){x(a.$$.fragment,t),s=!1},d(t){B(a,t)}}}function Lt(m){let a,s,t,o,d,i,_,g,k,j;return a=new Z({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),t=new Z({props:{id:"status_2021",title:"Status 2021"}}),d=new Z({props:{id:"status_2025",title:"Status 2025"}}),_=new Z({props:{id:"status_delta",title:"Change",fmt:"+0;-0"}}),k=new Z({props:{id:"trajectory_type",title:"Trajectory"}}),{c(){S(a.$$.fragment),s=y(),S(t.$$.fragment),o=y(),S(d.$$.fragment),i=y(),S(_.$$.fragment),g=y(),S(k.$$.fragment)},l(r){M(a.$$.fragment,r),s=p(r),M(t.$$.fragment,r),o=p(r),M(d.$$.fragment,r),i=p(r),M(_.$$.fragment,r),g=p(r),M(k.$$.fragment,r)},m(r,h){H(a,r,h),c(r,s,h),H(t,r,h),c(r,o,h),H(d,r,h),c(r,i,h),H(_,r,h),c(r,g,h),H(k,r,h),j=!0},p:se,i(r){j||(w(a.$$.fragment,r),w(t.$$.fragment,r),w(d.$$.fragment,r),w(_.$$.fragment,r),w(k.$$.fragment,r),j=!0)},o(r){x(a.$$.fragment,r),x(t.$$.fragment,r),x(d.$$.fragment,r),x(_.$$.fragment,r),x(k.$$.fragment,r),j=!1},d(r){r&&(n(s),n(o),n(i),n(g)),B(a,r),B(t,r),B(d,r),B(_,r),B(k,r)}}}function rt(m){let a,s;return a=new Ie({props:{queryID:"decliners",queryResult:m[2]}}),{c(){S(a.$$.fragment)},l(t){M(a.$$.fragment,t)},m(t,o){H(a,t,o),s=!0},p(t,o){const d={};o[0]&4&&(d.queryResult=t[2]),a.$set(d)},i(t){s||(w(a.$$.fragment,t),s=!0)},o(t){x(a.$$.fragment,t),s=!1},d(t){B(a,t)}}}function qt(m){let a,s,t,o,d,i,_,g,k,j;return a=new Z({props:{id:"area_name",title:"Neighbourhood (PLR)"}}),t=new Z({props:{id:"status_2021",title:"Status 2021"}}),d=new Z({props:{id:"status_2025",title:"Status 2025"}}),_=new Z({props:{id:"status_delta",title:"Change",fmt:"+0;-0"}}),k=new Z({props:{id:"trajectory_type",title:"Trajectory"}}),{c(){S(a.$$.fragment),s=y(),S(t.$$.fragment),o=y(),S(d.$$.fragment),i=y(),S(_.$$.fragment),g=y(),S(k.$$.fragment)},l(r){M(a.$$.fragment,r),s=p(r),M(t.$$.fragment,r),o=p(r),M(d.$$.fragment,r),i=p(r),M(_.$$.fragment,r),g=p(r),M(k.$$.fragment,r)},m(r,h){H(a,r,h),c(r,s,h),H(t,r,h),c(r,o,h),H(d,r,h),c(r,i,h),H(_,r,h),c(r,g,h),H(k,r,h),j=!0},p:se,i(r){j||(w(a.$$.fragment,r),w(t.$$.fragment,r),w(d.$$.fragment,r),w(_.$$.fragment,r),w(k.$$.fragment,r),j=!0)},o(r){x(a.$$.fragment,r),x(t.$$.fragment,r),x(d.$$.fragment,r),x(_.$$.fragment,r),x(k.$$.fragment,r),j=!1},d(r){r&&(n(s),n(o),n(i),n(g)),B(a,r),B(t,r),B(d,r),B(_,r),B(k,r)}}}function it(m){let a,s;return a=new Ie({props:{queryID:"trajectory_mix",queryResult:m[3]}}),{c(){S(a.$$.fragment)},l(t){M(a.$$.fragment,t)},m(t,o){H(a,t,o),s=!0},p(t,o){const d={};o[0]&8&&(d.queryResult=t[3]),a.$set(d)},i(t){s||(w(a.$$.fragment,t),s=!0)},o(t){x(a.$$.fragment,t),s=!1},d(t){B(a,t)}}}function At(m){let a,s,t,o,d,i,_,g,k=`To inspect any single area, use the district browser on the
<a href="/gentriduck/berlin/area-detail" class="markdown">area detail</a> page.`,j,r,h,T,Y='<a href="#berlin-citywide-social-status-over-time">Berlin, citywide: social status over time</a>',J,I,Q,P,E,K=`The line stitches together two boundary systems across the 2021 redistricting — read it as one long
trend, not a break at 2021.`,z,u,R='<a href="#which-neighbourhoods-moved-the-most-2021--2025">Which neighbourhoods moved the most (2021 → 2025)</a>',W,N,ne="Over the three most recent official editions, these areas' official social status changed the most.",oe,G,we='<a href="#status-rose-the-most-toward-less-deprived">Status rose the most (toward <em class="markdown">less</em> deprived)</a>',X,U,O,le,V,be='<a href="#status-fell-the-most-toward-more-deprived">Status fell the most (toward <em class="markdown">more</em> deprived)</a>',C,ce,de,xe,ee,Qe='<a href="#how-neighbourhoods-trajectories-break-down">How neighbourhoods&#39; trajectories break down</a>',je,_e,Ue=`Every area's path across the recent editions is classified into a trajectory type. Here is how
Berlin's neighbourhoods distribute across those types.`,Te,ve,me,Ee,te,Oe='<a href="#honest-caveats">Honest caveats</a>',Ce,ue,Je=`<li class="markdown"><strong class="markdown">&quot;Rose&quot; is not automatically good news for existing residents</strong> — rising status (a falling
status-index line) is also the signature of gentrification, and can reflect displacement as
easily as incumbent social mobility; see the alert above for the full decoder.</li> <li class="markdown">The citywide trend line <strong class="markdown">stitches together two boundary systems</strong> across Berlin&#39;s 2021
redistricting — read it as one long trend, not a break at 2021.</li> <li class="markdown">The &quot;biggest movers&quot; tables are computed on the <strong class="markdown">current (2021+) boundaries only</strong>, so they
line up with the map and area drill-down, but do not extend before 2021.</li>`,Re,ae,ze='<a href="#where-next">Where next</a>',Be,fe,Ge=`Click any row above to open that exact neighbourhood&#39;s full breakdown — status trajectory,
commercial mix, and price/rent. To browse by district instead, use the
<a href="/gentriduck/berlin/area-detail" class="markdown">area detail page</a>, or see the citywide <a href="/gentriduck/berlin/maps" class="markdown">maps</a> and the
<a href="/gentriduck/" class="markdown">home page</a> for the current index and stage typology.`,He,$e,Me,ge,Se,re=typeof $<"u"&&$.title&&$.hide_title!==!0&&Et();function st(e,l){return typeof $<"u"&&$.title?Rt:Ct}let ke=st()(m),ie=typeof $=="object"&&Bt();i=new yt({props:{compact:!0,eyebrow:"Chapter 3 — The Evidence",title:"Time series — how Berlin has moved",lede:"Rather than making you guess one of Berlin's ~540 planning areas from a dropdown, this page zooms out: how the city as a whole has moved across the official social-monitoring reports, and which neighbourhoods moved the most."}}),r=new gt({props:{status:"info",$$slots:{default:[St]},$$scope:{ctx:m}}});let L=m[0]&&tt(m);Q=new jt({props:{data:m[0],x:"snapshot_year",y:"median_status_index",title:"City-wide median social status, Berlin (1 = least deprived … 4 = most deprived)",yAxisTitle:"Median status class"}});let q=m[1]&&at(m);O=new Ke({props:{data:m[1],rows:"12",rowShading:"true",emptySet:"warn",link:"area_link",$$slots:{default:[Lt]},$$scope:{ctx:m}}});let A=m[2]&&rt(m);de=new Ke({props:{data:m[2],rows:"12",rowShading:"true",emptySet:"warn",link:"area_link",$$slots:{default:[qt]},$$scope:{ctx:m}}});let F=m[3]&&it(m);return me=new xt({props:{data:m[3],x:"trajectory_type",y:"area_count",swapXY:"true",title:"Berlin neighbourhoods by status trajectory (2021 → 2025)",xAxisTitle:"Number of areas",yAxisTitle:"Trajectory type"}}),ge=new pt({}),{c(){re&&re.c(),a=y(),ke.c(),s=v("meta"),t=v("meta"),ie&&ie.c(),o=De(),d=y(),S(i.$$.fragment),_=y(),g=v("p"),g.innerHTML=k,j=y(),S(r.$$.fragment),h=y(),T=v("h2"),T.innerHTML=Y,J=y(),L&&L.c(),I=y(),S(Q.$$.fragment),P=y(),E=v("p"),E.textContent=K,z=y(),u=v("h2"),u.innerHTML=R,W=y(),N=v("p"),N.textContent=ne,oe=y(),G=v("h3"),G.innerHTML=we,X=y(),q&&q.c(),U=y(),S(O.$$.fragment),le=y(),V=v("h3"),V.innerHTML=be,C=y(),A&&A.c(),ce=y(),S(de.$$.fragment),xe=y(),ee=v("h2"),ee.innerHTML=Qe,je=y(),_e=v("p"),_e.textContent=Ue,Te=y(),F&&F.c(),ve=y(),S(me.$$.fragment),Ee=y(),te=v("h2"),te.innerHTML=Oe,Ce=y(),ue=v("ul"),ue.innerHTML=Je,Re=y(),ae=v("h2"),ae.innerHTML=ze,Be=y(),fe=v("p"),fe.innerHTML=Ge,He=y(),$e=v("hr"),Me=y(),S(ge.$$.fragment),this.h()},l(e){re&&re.l(e),a=p(e);const l=ot("svelte-2igo1p",document.head);ke.l(l),s=b(l,"META",{name:!0,content:!0}),t=b(l,"META",{name:!0,content:!0}),ie&&ie.l(l),o=De(),l.forEach(n),d=p(e),M(i.$$.fragment,e),_=p(e),g=b(e,"P",{class:!0,"data-svelte-h":!0}),D(g)!=="svelte-1u6nsna"&&(g.innerHTML=k),j=p(e),M(r.$$.fragment,e),h=p(e),T=b(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(T)!=="svelte-1od655g"&&(T.innerHTML=Y),J=p(e),L&&L.l(e),I=p(e),M(Q.$$.fragment,e),P=p(e),E=b(e,"P",{class:!0,"data-svelte-h":!0}),D(E)!=="svelte-lluer7"&&(E.textContent=K),z=p(e),u=b(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(u)!=="svelte-5piksh"&&(u.innerHTML=R),W=p(e),N=b(e,"P",{class:!0,"data-svelte-h":!0}),D(N)!=="svelte-1wapa1l"&&(N.textContent=ne),oe=p(e),G=b(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),D(G)!=="svelte-nhpc6o"&&(G.innerHTML=we),X=p(e),q&&q.l(e),U=p(e),M(O.$$.fragment,e),le=p(e),V=b(e,"H3",{class:!0,id:!0,"data-svelte-h":!0}),D(V)!=="svelte-1peusy2"&&(V.innerHTML=be),C=p(e),A&&A.l(e),ce=p(e),M(de.$$.fragment,e),xe=p(e),ee=b(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(ee)!=="svelte-9rza0p"&&(ee.innerHTML=Qe),je=p(e),_e=b(e,"P",{class:!0,"data-svelte-h":!0}),D(_e)!=="svelte-1sm62w0"&&(_e.textContent=Ue),Te=p(e),F&&F.l(e),ve=p(e),M(me.$$.fragment,e),Ee=p(e),te=b(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(te)!=="svelte-ad0syq"&&(te.innerHTML=Oe),Ce=p(e),ue=b(e,"UL",{class:!0,"data-svelte-h":!0}),D(ue)!=="svelte-9eypgt"&&(ue.innerHTML=Je),Re=p(e),ae=b(e,"H2",{class:!0,id:!0,"data-svelte-h":!0}),D(ae)!=="svelte-1v8k4cs"&&(ae.innerHTML=ze),Be=p(e),fe=b(e,"P",{class:!0,"data-svelte-h":!0}),D(fe)!=="svelte-dt8t97"&&(fe.innerHTML=Ge),He=p(e),$e=b(e,"HR",{class:!0}),Me=p(e),M(ge.$$.fragment,e),this.h()},h(){f(s,"name","twitter:card"),f(s,"content","summary_large_image"),f(t,"name","twitter:site"),f(t,"content","@evidence_dev"),f(g,"class","markdown"),f(T,"class","markdown"),f(T,"id","berlin-citywide-social-status-over-time"),f(E,"class","markdown"),f(u,"class","markdown"),f(u,"id","which-neighbourhoods-moved-the-most-2021--2025"),f(N,"class","markdown"),f(G,"class","markdown"),f(G,"id","status-rose-the-most-toward-less-deprived"),f(V,"class","markdown"),f(V,"id","status-fell-the-most-toward-more-deprived"),f(ee,"class","markdown"),f(ee,"id","how-neighbourhoods-trajectories-break-down"),f(_e,"class","markdown"),f(te,"class","markdown"),f(te,"id","honest-caveats"),f(ue,"class","markdown"),f(ae,"class","markdown"),f(ae,"id","where-next"),f(fe,"class","markdown"),f($e,"class","markdown")},m(e,l){re&&re.m(e,l),c(e,a,l),ke.m(document.head,null),Fe(document.head,s),Fe(document.head,t),ie&&ie.m(document.head,null),Fe(document.head,o),c(e,d,l),H(i,e,l),c(e,_,l),c(e,g,l),c(e,j,l),H(r,e,l),c(e,h,l),c(e,T,l),c(e,J,l),L&&L.m(e,l),c(e,I,l),H(Q,e,l),c(e,P,l),c(e,E,l),c(e,z,l),c(e,u,l),c(e,W,l),c(e,N,l),c(e,oe,l),c(e,G,l),c(e,X,l),q&&q.m(e,l),c(e,U,l),H(O,e,l),c(e,le,l),c(e,V,l),c(e,C,l),A&&A.m(e,l),c(e,ce,l),H(de,e,l),c(e,xe,l),c(e,ee,l),c(e,je,l),c(e,_e,l),c(e,Te,l),F&&F.m(e,l),c(e,ve,l),H(me,e,l),c(e,Ee,l),c(e,te,l),c(e,Ce,l),c(e,ue,l),c(e,Re,l),c(e,ae,l),c(e,Be,l),c(e,fe,l),c(e,He,l),c(e,$e,l),c(e,Me,l),H(ge,e,l),Se=!0},p(e,l){typeof $<"u"&&$.title&&$.hide_title!==!0&&re.p(e,l),ke.p(e,l),typeof $=="object"&&ie.p(e,l);const Ve={};l[1]&32&&(Ve.$$scope={dirty:l,ctx:e}),r.$set(Ve),e[0]?L?(L.p(e,l),l[0]&1&&w(L,1)):(L=tt(e),L.c(),w(L,1),L.m(I.parentNode,I)):L&&(qe(),x(L,1,1,()=>{L=null}),Le());const We={};l[0]&1&&(We.data=e[0]),Q.$set(We),e[1]?q?(q.p(e,l),l[0]&2&&w(q,1)):(q=at(e),q.c(),w(q,1),q.m(U.parentNode,U)):q&&(qe(),x(q,1,1,()=>{q=null}),Le());const Pe={};l[0]&2&&(Pe.data=e[1]),l[1]&32&&(Pe.$$scope={dirty:l,ctx:e}),O.$set(Pe),e[2]?A?(A.p(e,l),l[0]&4&&w(A,1)):(A=rt(e),A.c(),w(A,1),A.m(ce.parentNode,ce)):A&&(qe(),x(A,1,1,()=>{A=null}),Le());const Ne={};l[0]&4&&(Ne.data=e[2]),l[1]&32&&(Ne.$$scope={dirty:l,ctx:e}),de.$set(Ne),e[3]?F?(F.p(e,l),l[0]&8&&w(F,1)):(F=it(e),F.c(),w(F,1),F.m(ve.parentNode,ve)):F&&(qe(),x(F,1,1,()=>{F=null}),Le());const Xe={};l[0]&8&&(Xe.data=e[3]),me.$set(Xe)},i(e){Se||(w(i.$$.fragment,e),w(r.$$.fragment,e),w(L),w(Q.$$.fragment,e),w(q),w(O.$$.fragment,e),w(A),w(de.$$.fragment,e),w(F),w(me.$$.fragment,e),w(ge.$$.fragment,e),Se=!0)},o(e){x(i.$$.fragment,e),x(r.$$.fragment,e),x(L),x(Q.$$.fragment,e),x(q),x(O.$$.fragment,e),x(A),x(de.$$.fragment,e),x(F),x(me.$$.fragment,e),x(ge.$$.fragment,e),Se=!1},d(e){e&&(n(a),n(d),n(_),n(g),n(j),n(h),n(T),n(J),n(I),n(P),n(E),n(z),n(u),n(W),n(N),n(oe),n(G),n(X),n(U),n(le),n(V),n(C),n(ce),n(xe),n(ee),n(je),n(_e),n(Te),n(ve),n(Ee),n(te),n(Ce),n(ue),n(Re),n(ae),n(Be),n(fe),n(He),n($e),n(Me)),re&&re.d(e),ke.d(e),n(s),n(t),ie&&ie.d(e),n(o),B(i,e),B(r,e),L&&L.d(e),B(Q,e),q&&q.d(e),B(O,e),A&&A.d(e),B(de,e),F&&F.d(e),B(me,e),B(ge,e)}}}const $={title:"Time series — how Berlin has moved"};function Ft(m,a,s){let t,o;Ye(m,kt,C=>s(22,t=C)),Ye(m,et,C=>s(28,o=C));let{data:d}=a,{data:i={},customFormattingSettings:_,__db:g,inputs:k}=d;lt(et,o="401e524d62809191351872e12f36f0f3",o);let j=wt(ht(k));ct(j.subscribe(C=>k=C)),dt($t,{getCustomFormats:()=>_.customFormats||[]});const r=(C,ce)=>Tt(g.query,C,{query_name:ce});bt(r),t.params,_t(()=>!0);let h={initialData:void 0,initialError:void 0},T=pe`select
    snapshot_year,
    median(status_index) as median_status_index,
    count(*) filter (where not is_uninhabited) as areas_reporting
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER'
group by all
order by snapshot_year`,Y=`select
    snapshot_year,
    median(status_index) as median_status_index,
    count(*) filter (where not is_uninhabited) as areas_reporting
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER'
group by all
order by snapshot_year`;i.citywide_trend_data&&(i.citywide_trend_data instanceof Error?h.initialError=i.citywide_trend_data:h.initialData=i.citywide_trend_data,i.citywide_trend_columns&&(h.knownColumns=i.citywide_trend_columns));let J,I=!1;const Q=Ae.createReactive({callback:C=>{s(0,J=C)},execFn:r},{id:"citywide_trend",...h});Q(Y,{noResolve:T,...h}),globalThis[Symbol.for("citywide_trend")]={get value(){return J}};let P={initialData:void 0,initialError:void 0},E=pe`select
    g.area_name,
    -- Exact-code drill-down (#150): area/[code] resolves lor_2021 PLR codes only.
    -- I2 (#219): area moved under /berlin/area. DataTable's own link mechanism is basePath-aware
    -- (unlike AreaMap's raw window.location click-through), so no base-path interpolation is
    -- needed here (NB: literal "dollar-brace-base" text would be evaluated by Evidence's SQL
    -- block compiler as a JS template expression even inside a comment -- avoid writing it here).
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta < 0
order by t.status_delta asc, g.area_name
limit 12`,K=`select
    g.area_name,
    -- Exact-code drill-down (#150): area/[code] resolves lor_2021 PLR codes only.
    -- I2 (#219): area moved under /berlin/area. DataTable's own link mechanism is basePath-aware
    -- (unlike AreaMap's raw window.location click-through), so no base-path interpolation is
    -- needed here (NB: literal "dollar-brace-base" text would be evaluated by Evidence's SQL
    -- block compiler as a JS template expression even inside a comment -- avoid writing it here).
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta < 0
order by t.status_delta asc, g.area_name
limit 12`;i.improvers_data&&(i.improvers_data instanceof Error?P.initialError=i.improvers_data:P.initialData=i.improvers_data,i.improvers_columns&&(P.knownColumns=i.improvers_columns));let z,u=!1;const R=Ae.createReactive({callback:C=>{s(1,z=C)},execFn:r},{id:"improvers",...P});R(K,{noResolve:E,...P}),globalThis[Symbol.for("improvers")]={get value(){return z}};let W={initialData:void 0,initialError:void 0},N=pe`select
    g.area_name,
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta > 0
order by t.status_delta desc, g.area_name
limit 12`,ne=`select
    g.area_name,
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta > 0
order by t.status_delta desc, g.area_name
limit 12`;i.decliners_data&&(i.decliners_data instanceof Error?W.initialError=i.decliners_data:W.initialData=i.decliners_data,i.decliners_columns&&(W.knownColumns=i.decliners_columns));let oe,G=!1;const we=Ae.createReactive({callback:C=>{s(2,oe=C)},execFn:r},{id:"decliners",...W});we(ne,{noResolve:N,...W}),globalThis[Symbol.for("decliners")]={get value(){return oe}};let X={initialData:void 0,initialError:void 0},U=pe`select
    trajectory_type,
    count(*) as area_count
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021'
group by all
order by area_count desc`,O=`select
    trajectory_type,
    count(*) as area_count
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021'
group by all
order by area_count desc`;i.trajectory_mix_data&&(i.trajectory_mix_data instanceof Error?X.initialError=i.trajectory_mix_data:X.initialData=i.trajectory_mix_data,i.trajectory_mix_columns&&(X.knownColumns=i.trajectory_mix_columns));let le,V=!1;const be=Ae.createReactive({callback:C=>{s(3,le=C)},execFn:r},{id:"trajectory_mix",...X});return be(O,{noResolve:U,...X}),globalThis[Symbol.for("trajectory_mix")]={get value(){return le}},m.$$set=C=>{"data"in C&&s(4,d=C.data)},m.$$.update=()=>{m.$$.dirty[0]&16&&s(5,{data:i={},customFormattingSettings:_,__db:g}=d,i),m.$$.dirty[0]&32&&vt.set(Object.keys(i).length>0),m.$$.dirty[0]&4194304&&t.params,m.$$.dirty[0]&960&&(T||!I?T||(Q(Y,{noResolve:T,...h}),s(9,I=!0)):Q(Y,{noResolve:T})),m.$$.dirty[0]&15360&&(E||!u?E||(R(K,{noResolve:E,...P}),s(13,u=!0)):R(K,{noResolve:E})),m.$$.dirty[0]&245760&&(N||!G?N||(we(ne,{noResolve:N,...W}),s(17,G=!0)):we(ne,{noResolve:N})),m.$$.dirty[0]&3932160&&(U||!V?U||(be(O,{noResolve:U,...X}),s(21,V=!0)):be(O,{noResolve:U}))},s(7,T=pe`select
    snapshot_year,
    median(status_index) as median_status_index,
    count(*) filter (where not is_uninhabited) as areas_reporting
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER'
group by all
order by snapshot_year`),s(8,Y=`select
    snapshot_year,
    median(status_index) as median_status_index,
    count(*) filter (where not is_uninhabited) as areas_reporting
from gentriduck_marts.fct_gentrification_change
where city_code = 'BER'
group by all
order by snapshot_year`),s(11,E=pe`select
    g.area_name,
    -- Exact-code drill-down (#150): area/[code] resolves lor_2021 PLR codes only.
    -- I2 (#219): area moved under /berlin/area. DataTable's own link mechanism is basePath-aware
    -- (unlike AreaMap's raw window.location click-through), so no base-path interpolation is
    -- needed here (NB: literal "dollar-brace-base" text would be evaluated by Evidence's SQL
    -- block compiler as a JS template expression even inside a comment -- avoid writing it here).
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta < 0
order by t.status_delta asc, g.area_name
limit 12`),s(12,K=`select
    g.area_name,
    -- Exact-code drill-down (#150): area/[code] resolves lor_2021 PLR codes only.
    -- I2 (#219): area moved under /berlin/area. DataTable's own link mechanism is basePath-aware
    -- (unlike AreaMap's raw window.location click-through), so no base-path interpolation is
    -- needed here (NB: literal "dollar-brace-base" text would be evaluated by Evidence's SQL
    -- block compiler as a JS template expression even inside a comment -- avoid writing it here).
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta < 0
order by t.status_delta asc, g.area_name
limit 12`),s(15,N=pe`select
    g.area_name,
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta > 0
order by t.status_delta desc, g.area_name
limit 12`),s(16,ne=`select
    g.area_name,
    '/berlin/area/' || t.area_code as area_link,
    t.status_index_first as status_2021,
    t.status_index_last as status_2025,
    t.status_delta,
    t.trajectory_type
from gentriduck_marts.fct_gentrification_trajectory t
left join (
    select distinct area_code, area_name
    from gentriduck_marts.gentrification_index
    where variant = 'live_data' and area_level = 'plr' and city_code = 'BER'
) g on g.area_code = t.area_code
where t.city_code = 'BER' and t.area_vintage = 'lor_2021' and t.status_delta > 0
order by t.status_delta desc, g.area_name
limit 12`),s(19,U=pe`select
    trajectory_type,
    count(*) as area_count
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021'
group by all
order by area_count desc`),s(20,O=`select
    trajectory_type,
    count(*) as area_count
from gentriduck_marts.fct_gentrification_trajectory
where city_code = 'BER' and area_vintage = 'lor_2021'
group by all
order by area_count desc`),[J,z,oe,le,d,i,h,T,Y,I,P,E,K,u,W,N,ne,G,X,U,O,V,t]}class Zt extends ut{constructor(a){super(),ft(this,a,Ft,At,nt,{data:4},null,[-1,-1])}}export{Zt as component};
