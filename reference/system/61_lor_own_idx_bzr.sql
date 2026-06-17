drop view lor_own_idx_k11_bzr;
create view lor_own_idx_k11_bzr as 
select 
s.id as raum_id, s.name as raum_desc, concat(s.jahr-1,'12') as zeit
, s.k11, a.k11_stddev, a.k11_avg, (s.k11-a.k11_avg) / a.k11_stddev as k11_msr
from zeitreihe_mss_k11_bzr s
join 
(
select jahr
	,stddev_pop(k11) as k11_stddev
	,avg(k11) as k11_avg
from zeitreihe_mss_k11_bzr
where k11 > 0
group by jahr
) a on a.jahr = s.jahr
where s.k11 > 0
;


drop view lor_own_idx_d2_bzr;
create view lor_own_idx_d2_bzr as 
select 
s.raum_id, s.raum_desc, s.zeit
, s.d2, a.d2_stddev, a.d2_avg, (s.d2-a.d2_avg) / a.d2_stddev as d2_msr
from lor_mss_idx_bzr_idx s
join 
(
select zeit
	,stddev_pop(d2) as d2_stddev
	,avg(d2) as d2_avg
from lor_mss_idx_bzr_idx
where s1 > 0 or s2 > 0 or s3 > 0 or s4 > 0
group by zeit
) a on a.zeit = s.zeit
where s1 > 0 or s2 > 0 or s3 > 0 or s4 > 0
;


drop table lor_ewr_calc_base_bzr;
create table lor_ewr_calc_base_bzr as
select 
curr.planungsraum as raum_id,
null as raum_desc,
curr.zeit,
curr.dau5 - prev.dau5 as dau5_ytd,
curr.dau10 - prev.dau10 as dau10_ytd,
curr.ea - prev.ea as ea_ytd,
curr.mh - prev.mh as mh_ytd,
curr.ee_18u35 - prev.ee_18u35 as ee_18u35_ytd,
curr.ee_35u45 - prev.ee_35u45 as ee_35u45_ytd
from lor_ewr_einwohnergewichtet_bzr curr 
left join lor_ewr_einwohnergewichtet_bzr prev 
on curr.planungsraum = prev.planungsraum and curr.zeit = (prev.zeit+200)
where 1=1;

drop view lor_own_idx_ewr_bzr;
create view lor_own_idx_ewr_bzr as 
select 
s.raum_id, s.raum_desc, s.zeit
,s.dau5_ytd, a.dau5_ytd_stddev, a.dau5_ytd_avg
, (s.dau5_ytd-a.dau5_ytd_avg) / a.dau5_ytd_stddev as dau5_msr
,s.dau10_ytd, a.dau10_ytd_stddev, a.dau10_ytd_avg
, (s.dau10_ytd-a.dau10_ytd_avg) / a.dau10_ytd_stddev as dau10_msr
,s.ea_ytd, a.ea_ytd_stddev, a.ea_ytd_avg
, (s.ea_ytd-a.ea_ytd_avg) / a.ea_ytd_stddev as ea_msr
,s.mh_ytd, a.mh_ytd_stddev, a.mh_ytd_avg
, (s.mh_ytd-a.mh_ytd_avg) / a.mh_ytd_stddev as mh_msr
,s.ee_18u35_ytd, a.ee_18u35_ytd_stddev, a.ee_18u35_ytd_avg
, (s.ee_18u35_ytd-a.ee_18u35_ytd_avg) / a.ee_18u35_ytd_stddev as ee_18u35_msr
,s.ee_35u45_ytd, a.ee_35u45_ytd_stddev, a.ee_35u45_ytd_avg
, (s.ee_35u45_ytd-a.ee_35u45_ytd_avg) / a.ee_35u45_ytd_stddev as ee_35u45_msr
from lor_ewr_calc_base_bzr s
join 
(
select zeit
	,stddev_pop(dau5_ytd) as dau5_ytd_stddev
	,avg(dau5_ytd) as dau5_ytd_avg
	,stddev_pop(dau10_ytd) as dau10_ytd_stddev
	,avg(dau10_ytd) as dau10_ytd_avg
	,stddev_pop(ea_ytd) as ea_ytd_stddev
	,avg(ea_ytd) as ea_ytd_avg
	,stddev_pop(mh_ytd) as mh_ytd_stddev
	,avg(mh_ytd) as mh_ytd_avg
	,stddev_pop(ee_18u35_ytd) as ee_18u35_ytd_stddev
	,avg(ee_18u35_ytd) as ee_18u35_ytd_avg
	,stddev_pop(ee_35u45_ytd) as ee_35u45_ytd_stddev
	,avg(ee_35u45_ytd) as ee_35u45_ytd_avg
from lor_ewr_calc_base_bzr
where raum_id in (select raum_id from lor_mss_idx_bzr_idx where s1 > 0 or s2 > 0 or s3 > 0 or s4 > 0)
group by zeit
) a on a.zeit = s.zeit
where s.raum_id in (select raum_id from lor_mss_idx_bzr_idx where s1 > 0 or s2 > 0 or s3 > 0 or s4 > 0);


drop view lor_own_idx_bzr;
create view lor_own_idx_bzr as
select 
d2.raum_id, d2.raum_desc, d2.zeit as jahr,
round(k11.k11_msr * 2, 0)        as k11_msr_points,
round(ewr.dau5_msr * -1 * 2, 0)  as dau5_msr_points,
round(ewr.dau10_msr * -1 * 2, 0) as dau10_msr_points,
round(k11.k11_msr * 2, 0)        +
round(ewr.dau5_msr * -1 * 2, 0)  +
round(ewr.dau10_msr * -1 * 2, 0) as doering_ulbricht_idx_m_points,
k11.k11_msr         +
ewr.dau5_msr * -1   +
ewr.dau10_msr * -1  as doering_ulbricht_idx_m_value,
round(d2.d2_msr * -1 * 2, 0)     as d2_msr_points,
round(ewr.ea_msr * -1 * 2, 0)    as ea_msr_points,
round(ewr.mh_msr * -1 * 2, 0)    as mh_msr_points,
round(ewr.ee_18u35_msr * 2, 0)   as ee_18u35_msr_points,
round(ewr.ee_35u45_msr * 2, 0)   as ee_35u45_msr_points,
round(d2.d2_msr * -1 * 2, 0)     +
round(ewr.ea_msr * -1 * 2, 0)    +
round(ewr.mh_msr * -1 * 2, 0)    +
round(ewr.ee_18u35_msr * 2, 0)   +
round(ewr.ee_35u45_msr * 2, 0)   as doering_ulbricht_idx_b_points,
d2.d2_msr * -1      +
ewr.ea_msr * -1     +
ewr.mh_msr * -1     +
ewr.ee_18u35_msr    +
ewr.ee_35u45_msr   as doering_ulbricht_idx_b_value,
round(d2.d2_msr * -1 * 2, 0)     +
round(k11.k11_msr * 2, 0)        +
round(ewr.dau5_msr * -1 * 2, 0)  +
round(ewr.dau10_msr * -1 * 2, 0) +
round(ewr.ea_msr * -1 * 2, 0)    +
round(ewr.mh_msr * -1 * 2, 0)    +
round(ewr.ee_18u35_msr * 2, 0)   +
round(ewr.ee_35u45_msr * 2, 0)   as sum_idx_points,
d2.d2_msr * -1      +
k11.k11_msr         +
ewr.dau5_msr * -1   +
ewr.dau10_msr * -1  +
ewr.ea_msr * -1     +
ewr.mh_msr * -1     +
ewr.ee_18u35_msr    +
ewr.ee_35u45_msr   as sum_idx_value
from lor_own_idx_d2_bzr d2 
join lor_own_idx_k11_bzr k11 
on cast(d2.raum_id as int) = cast(k11.raum_id as int) and d2.zeit = k11.zeit
left join lor_own_idx_ewr_bzr ewr
on cast(d2.raum_id as int) = cast(ewr.raum_id as int) and d2.zeit = ewr.zeit;

drop table lor_own_idx_bzr_tb;
create table lor_own_idx_bzr_tb as select * from lor_own_idx_bzr;