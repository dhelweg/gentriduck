-- doppelter Eintrag (beide Datensätze gleich)
select * from osmnodes_filtered_170101 where id = "N3922305547"; 
-- doppelter Eintrag (Datensätze unterschiedlich!!!)
select * from osmnodes_filtered_180101 where id = "N3337544389";


-- also check  "N1228246438" - in 2016 nicht enthalten, in 14,15,17,18 aber schon