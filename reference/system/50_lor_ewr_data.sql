DROP table lor_ewr_data;
CREATE table lor_ewr_data as 
select 
ee.zeit as zeit, if(length(ee.raumid)=7,concat(0,ee.raumid),ee.raumid) as planungsraum
,wd.dau5, wd.dau10
,ee.e_e, ee.e_em, ee.e_ew
,( 0.5 * ee.E_E00_01 + 
1.5 * ee.E_E01_02 + 
2.5 * ee.E_E02_03 + 
4 * ee.E_E03_05 + 
5.5 * ee.E_E05_06 + 
6.5 * ee.E_E06_07 + 
7.5 * ee.E_E07_08 + 
9 * ee.E_E08_10 + 
11 * ee.E_E10_12 + 
13 * ee.E_E12_14 + 
14.5 * ee.E_E14_15 + 
16.5 * ee.E_E15_18 + 
19.5 * ee.E_E18_21 + 
23 * ee.E_E21_25 + 
26 * ee.E_E25_27 + 
28.5 * ee.E_E27_30 + 
32.5 * ee.E_E30_35 + 
37.5 * ee.E_E35_40 + 
42.5 * ee.E_E40_45 + 
47.5 * ee.E_E45_50 + 
52.5 * ee.E_E50_55 + 
57.5 * ee.E_E55_60 + 
61.5 * ee.E_E60_63 + 
64 * ee.E_E63_65 + 
66 * ee.E_E65_67 + 
68.5 * ee.E_E67_70 + 
72.5 * ee.E_E70_75 + 
77.5 * ee.E_E75_80 + 
82.5 * ee.E_E80_85 + 
87.5 * ee.E_E85_90 + 
92.5 * ee.E_E90_95 + 
102.5 * ee.E_E95_110 ) / ee.E_E as E_EALTER
,ee.E_U1+ee.E_1U6+ee.E_6U15+ee.E_15U18 as E_EU1U18
,ee.E_E18_21+ee.E_E21_25+ee.E_E25_27 as E_E18U27
,ee.E_E27_30+ee.E_E30_35+ee.E_E35_40+ee.E_E40_45 as E_E27U45
,ee.E_E18_21+ee.E_E21_25+ee.E_E25_27+ee.E_E27_30+ee.E_E30_35 as E_E18U35
,ee.E_E35_40+ee.E_E40_45 as E_E35U45
,ee.E_E45_50+ee.E_E50_55 as E_E45U55
,ee.E_55U65 as E_E55U65
,ee.E_65U80+ee.E_80U110 as E_E65U110
,ea.e_a, ea.e_am, ea.e_aw
,( 0.5 * ea.E_A00_01 + 
1.5 * ea.E_A01_02 + 
2.5 * ea.E_A02_03 + 
4 * ea.E_A03_05 + 
5.5 * ea.E_A05_06 + 
6.5 * ea.E_A06_07 + 
7.5 * ea.E_A07_08 + 
9 * ea.E_A08_10 + 
11 * ea.E_A10_12 + 
13 * ea.E_A12_14 + 
14.5 * ea.E_A14_15 + 
16.5 * ea.E_A15_18 + 
19.5 * ea.E_A18_21 + 
23 * ea.E_A21_25 + 
26 * ea.E_A25_27 + 
28.5 * ea.E_A27_30 + 
32.5 * ea.E_A30_35 + 
37.5 * ea.E_A35_40 + 
42.5 * ea.E_A40_45 + 
47.5 * ea.E_A45_50 + 
52.5 * ea.E_A50_55 + 
57.5 * ea.E_A55_60 + 
61.5 * ea.E_A60_63 + 
64 * ea.E_A63_65 + 
66 * ea.E_A65_67 + 
68.5 * ea.E_A67_70 + 
72.5 * ea.E_A70_75 + 
77.5 * ea.E_A75_80 + 
82.5 * ea.E_A80_85 + 
87.5 * ea.E_A85_90 + 
92.5 * ea.E_A90_95 + 
102.5 * ea.E_A95_110 ) / ea.e_a as E_AALTER
,ea.E_AU1+ea.E_A1U6+ea.E_A6U15+ea.E_A15U18 as E_AU1U18
,ea.E_A18_21+ea.E_A21_25+ea.E_A25_27 as E_A18U27
,ea.E_A27_30+ea.E_A30_35+ea.E_A35_40+ea.E_A40_45 as E_A27U45
,ea.E_A45_50+ea.E_A50_55 as E_A45U55
,ea.E_A55U65
,ea.E_A65U80+ea.E_A80U110 as E_A65U110
,eme.mh_e ,eme.mh_em, eme.mh_ew
,( 0.5 * eme.MH_E00_01 + 
1.5 * eme.MH_E01_02 + 
2.5 * eme.MH_E02_03 + 
4 * eme.MH_E03_05 + 
5.5 * eme.MH_E05_06 + 
6.5 * eme.MH_E06_07 + 
7.5 * eme.MH_E07_08 + 
9 * eme.MH_E08_10 + 
11 * eme.MH_E10_12 + 
13 * eme.MH_E12_14 + 
14.5 * eme.MH_E14_15 + 
16.5 * eme.MH_E15_18 + 
19.5 * eme.MH_E18_21 + 
23 * eme.MH_E21_25 + 
26 * eme.MH_E25_27 + 
28.5 * eme.MH_E27_30 + 
32.5 * eme.MH_E30_35 + 
37.5 * eme.MH_E35_40 + 
42.5 * eme.MH_E40_45 + 
47.5 * eme.MH_E45_50 + 
52.5 * eme.MH_E50_55 + 
57.5 * eme.MH_E55_60 + 
61.5 * eme.MH_E60_63 + 
64 * eme.MH_E63_65 + 
66 * eme.MH_E65_67 + 
68.5 * eme.MH_E67_70 + 
72.5 * eme.MH_E70_75 + 
77.5 * eme.MH_E75_80 + 
82.5 * eme.MH_E80_85 + 
87.5 * eme.MH_E85_90 + 
92.5 * eme.MH_E90_95 + 
102.5 * eme.MH_E95_110 ) / eme.MH_E as E_MHALTER
,eme.MH_U1+eme.MH_1U6+eme.MH_6U15+eme.MH_15U18 as MH_EU1U18
,eme.MH_E18_21+eme.MH_E21_25+eme.MH_E25_27 as MH_E18U27
,eme.MH_E27_30+eme.MH_E30_35+eme.MH_E35_40+eme.MH_E40_45 as MH_E27U45
,eme.MH_E45_50+eme.MH_E50_55 as MH_E45U55
,eme.MH_55U65 as MH_E55U65
,eme.MH_65U80+eme.MH_80U110 as MH_E65U110
,emh.hk_eu15, emh.hk_eu27, emh.hk_polen, emh.hk_ehejug, emh.hk_ehesu, emh.hk_turk, emh.hk_arab, emh.hk_sonst, emh.hk_nzord
from lor_ewr_e ee 
left join lor_ewr_a ea on 1=1
 and ea.raumid = ee.raumid
 and substr(ea.zeit,0,4) = substr(ee.zeit,0,4)
left join lor_whndauer wd on 1=1
 and wd.raumid = ee.raumid
 and substr(wd.zeit,0,4) = substr(ee.zeit,0,4)
left join lor_ewr_migra_e eme on 1=1
 and eme.raumid = ee.raumid
 and substr(eme.zeit,0,4) = substr(ee.zeit,0,4)
left join lor_ewr_migra_h emh on 1=1
 and emh.raumid = ee.raumid
 and substr(emh.zeit,0,4) = substr(ee.zeit,0,4)
;