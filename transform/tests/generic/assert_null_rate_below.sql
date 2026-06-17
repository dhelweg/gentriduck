-- assert_null_rate_below.sql
-- Generic dbt test: asserts that the NULL rate for `column_name` is below
-- `max_null_fraction` within each partition defined by `partition_by`.
--
-- Parameters:
-- model              — the model under test (injected by dbt as {{ model }})
-- column_name        — the column to check for NULLs
-- partition_by       — column to partition by (e.g. snapshot_year)
-- max_null_fraction  — maximum allowed NULL fraction per partition (default 0.02)
--
-- Returns rows for each partition that violates the threshold.
-- A non-empty result set causes the test to fail (or warn, depending on severity).
--
-- Usage in schema.yml:
-- - assert_null_rate_below:
-- column_name: area_code
-- partition_by: snapshot_year
-- max_null_fraction: 0.02
-- config:
-- severity: warn
{% test assert_null_rate_below(model, column_name, partition_by, max_null_fraction=0.02) %}

    with
        partitioned as (
            select
                {{ partition_by }} as partition_key,
                count(*) as total_rows,
                sum(case when {{ column_name }} is null then 1 else 0 end) as null_rows
            from {{ model }}
            group by {{ partition_by }}
        ),

        violations as (
            select
                partition_key,
                total_rows,
                null_rows,
                cast(null_rows as double) / nullif(total_rows, 0) as null_fraction,
                {{ max_null_fraction }} as max_null_fraction
            from partitioned
            where
                total_rows > 0
                and cast(null_rows as double) / nullif(total_rows, 0)
                > {{ max_null_fraction }}
        )

    select *
    from violations

{% endtest %}
