DROP view lor_mss_idx_bzr_z;
CREATE view lor_mss_idx_bzr_z as 
select 
raum_id
,s.raum_desc
,s.zeit
,ew
,(s1 - s1_avg) / s1_stddev as zs1
,(s2 - s2_avg) / s2_stddev as zs2
,(s3 - s3_avg) / s3_stddev as zs3
,(s4 - s4_avg) / s4_stddev as zs4
,(
((s1 - s1_avg) / s1_stddev)+
((s2 - s2_avg) / s2_stddev)+
((s3 - s3_avg) / s3_stddev)+
((s4 - s4_avg) / s4_stddev)
) as status_summe
,null as status_index
,null as status_klasse
,(d1 - d1_avg) / d1_stddev as zd1
,(d2 - d2_avg) / d2_stddev as zd2
,(d3 - d3_avg) / d3_stddev as zd3
,(d4 - d4_avg) / d4_stddev as zd4
,(
((d1 - d1_avg) / d1_stddev)+
((d2 - d2_avg) / d2_stddev)+
((d3 - d3_avg) / d3_stddev)+
((d4 - d4_avg) / d4_stddev)
) as dynamik_summe
,null as dynamik_index
,null as dynamik_klasse
,s1
,s2
,s3
,s4
,d1
,d2
,d3
,d4
from lor_mss_idx_bzr_raw s
join 
(
select zeit
	,stddev_pop(s1) as s1_stddev
	,stddev_pop(s2) as s2_stddev
	,stddev_pop(s3) as s3_stddev
	,stddev_pop(s4) as s4_stddev
	,avg(s1) as s1_avg
	,avg(s2) as s2_avg
	,avg(s3) as s3_avg
	,avg(s4) as s4_avg
	,stddev_pop(d1) as d1_stddev
	,stddev_pop(d2) as d2_stddev
	,stddev_pop(d3) as d3_stddev
	,stddev_pop(d4) as d4_stddev
	,avg(d1) as d1_avg
	,avg(d2) as d2_avg
	,avg(d3) as d3_avg
	,avg(d4) as d4_avg
from lor_mss_idx_bzr_raw
group by zeit
) a on a.zeit = s.zeit
;