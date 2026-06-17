DROP table lor_ewr_einwohnergewichtet_bzr;
CREATE table lor_ewr_einwohnergewichtet_bzr as 
select
 d.zeit              as zeit
,substr(d.planungsraum,0,6)     as planungsraum
,sum(d.e_e)          as ee
,sum(d.dau5         ) / sum(d.e_e)          as dau5
,sum(d.dau10        ) / sum(d.e_e)          as dau10
,sum(d.e_em         ) / sum(d.e_e)          as ee_m
,sum(d.e_ew         ) / sum(d.e_e)          as ee_w
,sum(d.e_ealter * d.e_e )  / sum(d.e_e)     as ee_alter
,sum(d.e_eu1u18     ) / sum(d.e_e)          as ee_u1u18
,sum(d.e_e18u27     ) / sum(d.e_e)          as ee_18u27
,sum(d.e_e27u45     ) / sum(d.e_e)          as ee_27u45
,sum(d.e_e18u35     ) / sum(d.e_e)          as ee_18u35
,sum(d.e_e35u45     ) / sum(d.e_e)          as ee_35u45
,sum(d.e_e45u55     ) / sum(d.e_e)          as ee_45u55
,sum(d.e_e55u65     ) / sum(d.e_e)          as ee_55u65
,sum(d.e_e65u110    ) / sum(d.e_e)          as ee_65u110
,sum(d.e_a          ) / sum(d.e_e)          as ea
,sum(d.e_am         ) / sum(d.e_e)          as ea_m
,sum(d.e_aw         ) / sum(d.e_e)          as ea_w
,sum(d.e_aalter * d.e_a )  / sum(d.e_a)     as ea_alter
,sum(d.e_au1u18     ) / sum(d.e_e)          as ea_u1u18
,sum(d.e_a18u27     ) / sum(d.e_e)          as ea_18u27
,sum(d.e_a27u45     ) / sum(d.e_e)          as ea_27u45
,sum(d.e_a45u55     ) / sum(d.e_e)          as ea_45u55
,sum(d.e_a55u65     ) / sum(d.e_e)          as ea_55u65
,sum(d.e_a65u110    ) / sum(d.e_e)          as ea_65u110
,sum(d.mh_e         ) / sum(d.e_e)          as mh
,sum(d.mh_em        ) / sum(d.e_e)          as mh_m
,sum(d.mh_ew        ) / sum(d.e_e)          as mh_w
,sum(d.e_mhalter * d.mh_e )  / sum(d.mh_e)  as mh_alter
,sum(d.mh_eu1u18    ) / sum(d.e_e)          as mh_u1u18
,sum(d.mh_e18u27    ) / sum(d.e_e)          as mh_18u27
,sum(d.mh_e27u45    ) / sum(d.e_e)          as mh_27u45
,sum(d.mh_e45u55    ) / sum(d.e_e)          as mh_45u55
,sum(d.mh_e55u65    ) / sum(d.e_e)          as mh_55u65
,sum(d.mh_e65u110   ) / sum(d.e_e)          as mh_65u110
,sum(d.hk_eu15      ) / sum(d.e_e)          as hk_eu15
,sum(d.hk_eu27      ) / sum(d.e_e)          as hk_eu27
,sum(d.hk_polen     ) / sum(d.e_e)          as hk_polen
,sum(d.hk_ehejug    ) / sum(d.e_e)          as hk_ehejug
,sum(d.hk_ehesu     ) / sum(d.e_e)          as hk_ehesu
,sum(d.hk_turk      ) / sum(d.e_e)          as hk_turk
,sum(d.hk_arab      ) / sum(d.e_e)          as hk_arab
,sum(d.hk_sonst     ) / sum(d.e_e)          as hk_sonst
,sum(d.hk_nzord     ) / sum(d.e_e)          as hk_nzord
from lor_ewr_data d
group by d.zeit, substr(d.planungsraum,0,6)
;