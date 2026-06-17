add jar hdfs://<hadoop-cluster>/user/<redacted>/OSM2Hive.jar;

CREATE TEMPORARY FUNCTION OSMImportNodes AS 'info.pavie.osm2hive.controller.HiveNodeImporter';

DROP TABLE IF EXISTS osmdata;
CREATE TABLE osmdata(osm_content STRING) STORED AS TEXTFILE;
LOAD DATA INPATH 'hdfs://<hadoop-cluster>/user/<redacted>/filtered_140101.osm' OVERWRITE INTO TABLE osmdata;
CREATE TABLE osmnodes_filtered_140101 AS SELECT OSMImportNodes(osm_content) FROM osmdata;
DROP TABLE IF EXISTS osmdata;
CREATE TABLE osmdata(osm_content STRING) STORED AS TEXTFILE;
LOAD DATA INPATH 'hdfs://<hadoop-cluster>/user/<redacted>/filtered_150101.osm' OVERWRITE INTO TABLE osmdata;
CREATE TABLE osmnodes_filtered_150101 AS SELECT OSMImportNodes(osm_content) FROM osmdata;
DROP TABLE IF EXISTS osmdata;
CREATE TABLE osmdata(osm_content STRING) STORED AS TEXTFILE;
LOAD DATA INPATH 'hdfs://<hadoop-cluster>/user/<redacted>/filtered_160101.osm' OVERWRITE INTO TABLE osmdata;
CREATE TABLE osmnodes_filtered_160101 AS SELECT OSMImportNodes(osm_content) FROM osmdata;
DROP TABLE IF EXISTS osmdata;
CREATE TABLE osmdata(osm_content STRING) STORED AS TEXTFILE;
LOAD DATA INPATH 'hdfs://<hadoop-cluster>/user/<redacted>/filtered_170101.osm' OVERWRITE INTO TABLE osmdata;
CREATE TABLE osmnodes_filtered_170101 AS SELECT OSMImportNodes(osm_content) FROM osmdata;
DROP TABLE IF EXISTS osmdata;
CREATE TABLE osmdata(osm_content STRING) STORED AS TEXTFILE;
LOAD DATA INPATH 'hdfs://<hadoop-cluster>/user/<redacted>/filtered_180101.osm' OVERWRITE INTO TABLE osmdata;
CREATE TABLE osmnodes_filtered_180101 AS SELECT OSMImportNodes(osm_content) FROM osmdata;
DROP TABLE IF EXISTS osmdata;


/* 1. Create Table based on osm file in HDFS */
CREATE TABLE osmdata(osm_content STRING) STORED AS TEXTFILE;
LOAD DATA INPATH 'hdfs://<hadoop-cluster>/user/<redacted>/filtered_140101.osm' OVERWRITE INTO TABLE osmdata;

/* 2. Import OSM2Hive and create node-table */
add jar hdfs://<hadoop-cluster>/user/<redacted>/OSM2Hive.jar;
CREATE TEMPORARY FUNCTION OSMImportNodes AS 'in-fo.pavie.osm2hive.controller.HiveNodeImporter';
CREATE TABLE osmnodes_filtered_140101 AS 
	SELECT OSMIm-portNodes(osm_content) FROM osmdata;
