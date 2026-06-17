DROP table lor_mss_idx_bzr_idx;
CREATE table lor_mss_idx_bzr_idx as 
select 
raum_id
,raum_desc
,s.zeit
,ew
,zs1
,zs2
,zs3
,zs4
,status_summe
,(status_summe - status_avg) / status_stddev as status_index
,case 
	when ((status_summe - status_avg) / status_stddev) < -1 then "hoch"
	when -1 <= ((status_summe - status_avg) / status_stddev) <= 1  then "mittel"
	when 1 <= ((status_summe - status_avg) / status_stddev) <= 1.5  then "niedrig"
	when ((status_summe - status_avg) / status_stddev) > 1.5  then "sehr niedrig"
	else null
end as status_klasse
,zd1
,zd2
,zd3
,zd4
,dynamik_summe
,(dynamik_summe - dynamik_avg) / dynamik_stddev as dynamik_index
,case 
	when ((dynamik_summe - dynamik_avg) / dynamik_stddev) < -1 then "positiv"
	when -1 <= ((dynamik_summe - dynamik_avg) / dynamik_stddev) <= 1  then "stabil"
	when ((dynamik_summe - dynamik_avg) / dynamik_stddev) > 1  then "negativ"
	else null
end as dynamik_klasse
,s1
,s2
,s3
,s4
,d1
,d2
,d3
,d4
from lor_mss_idx_bzr_z s
join 
(
select zeit
	,stddev_pop(status_summe) as status_stddev
	,stddev_pop(dynamik_summe) as dynamik_stddev
	,avg(status_summe) as status_avg
	,avg(dynamik_summe) as dynamik_avg
from lor_mss_idx_bzr_z
group by zeit
) a on a.zeit = s.zeit
;