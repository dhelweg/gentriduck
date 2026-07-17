-- test_ortsteil_overlap_one_dominant_per_plr.sql
-- #269 (I-ortsteile): every lor_2021 PLR in int_berlin_plr_ortsteil_overlap
-- must have EXACTLY ONE row flagged is_dominant_ortsteil=true -- the
-- ROW_NUMBER() OVER (PARTITION BY plr_area_code ORDER BY ...) = 1 dominant
-- flag is meant to be a strict per-PLR singleton (see that model's "ranked"
-- CTE). This guards against a future tie-break regression silently producing
-- zero (e.g. a mis-ordered window frame) or more than one dominant row for
-- the same PLR, which would break every downstream consumer that inner-joins
-- on `is_dominant_ortsteil` expecting a 1:1 PLR->Ortsteil key.
--
-- Returns rows that VIOLATE the invariant. Zero rows = test passes.
select plr_area_code, count(*) as n_dominant_rows
from {{ ref("int_berlin_plr_ortsteil_overlap") }}
where is_dominant_ortsteil
group by plr_area_code
having count(*) != 1
