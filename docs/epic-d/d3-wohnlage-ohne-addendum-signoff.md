# D3 Wohnlage 'ohne' Tier Exclusion — Sign-Off Addendum

Date: 2026-07-09
Reviewers: geo-data-scientist, gentrification-domain-expert
Ticket: #212
Parent sign-offs: `docs/epic-d/d3-price-rent-geo-signoff.md` (PASS WITH CONDITIONS),
`docs/epic-d/d3-price-rent-domain-signoff.md` (PASS WITH CONDITIONS)

## Scope

A maintainer-run `dbt build` surfaced `wohnlage = 'ohne'` (the Berlin WFS `wol` attribute value
for "no simple/middle/good grade assigned", predominantly non-residential/uninhabited addresses)
failing the `stg_berlin_wohnlage.wohnlage` `accepted_values` test (`einfach`/`mittel`/`gut` only).
PM investigation found `'ohne'` rows were not filtered before `int_berlin_wohnlage_plr`'s tier-share
aggregation: they inflated `total_n_addresses` (the `pct_wohnlage` denominator) while contributing
zero share to `pct_einfach`/`pct_mittel`/`pct_gut` downstream, silently diluting `wohnlage_score`
toward "einfach" for PLRs with a meaningful `'ohne'` share.

## Fix reviewed

1. `stg_berlin_wohnlage.wohnlage` `accepted_values` widened to `['einfach','mittel','gut','ohne']`
   — `'ohne'` is a legitimate raw WFS value; the staging layer should describe reality, not reject it.
2. `int_berlin_wohnlage_plr.sql`'s Wohnlage CTE now excludes `wohnlage = 'ohne'` **before**
   aggregation, so `total_n_addresses` (and therefore `pct_wohnlage`/`wohnlage_score`) reflects only
   the three ordered residential tiers.

## Verdict: PASS

This is a narrow **correction within the already-approved D3 methodology**, not a new weighting
scheme, spatial method, or indicator. It is fully consistent with, and required by, two framings
already binding in the parent geo sign-off (§2): "composition, not modal class" (the three named
tiers are the intended ordinal scale) and "uninhabited/non-residential PLRs are transparently NULL,
not zero" (non-residential address points should not silently participate in a residential-quality
share). Excluding `'ohne'` from the denominator is the direct application of that same principle at
the address level rather than the PLR level — a non-residential *address* diluting a residential
*tier share* is the same category error as a non-residential *PLR* being zero-filled instead of
NULLed.

Domain read: `'ohne'` addresses (mostly commercial/industrial/institutional parcels within a PLR)
carry no housing-quality signal relevant to residential gentrification pressure; including them in
the denominator manufactures a spurious "more einfach" reading in PLRs with more non-residential
land use, which is a confound (land-use mix), not a gentrification signal. Excluding them keeps
`wohnlage_score` a clean read of the *residential* stock's tier composition, per index-definition
§5 polarity (D3 = precondition/headroom on the residential stock specifically).

No re-litigation of the D3 sign-off's binding conditions is needed; all remain in force. This
addendum authorizes integration of the #212 fix into `develop` under the existing D3 gate.

## Verification

`dbt build --select stg_berlin_wohnlage int_berlin_wohnlage_plr int_price_rent_wohnlage_mietspiegel
int_price_rent_brw_wohnlage_combined mart_price_rent_dimension mart_price_rent_dimension_pre2021`
— 49/49 PASS, 0 WARN/ERROR. 1,812 `'ohne'` rows confirmed present in `stg_berlin_wohnlage` and now
excluded upstream of the tier-share denominator.
