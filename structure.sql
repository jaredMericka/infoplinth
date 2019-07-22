-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: infoplinth
-- ------------------------------------------------------
-- Server version	5.7.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `seqno` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `parentid` char(32) NOT NULL,
  `body` text NOT NULL,
  `creatorid` char(32) NOT NULL,
  `creatorname` varchar(100) NOT NULL,
  `creatorip` varchar(100) NOT NULL,
  `createddate` int(10) unsigned NOT NULL,
  `modifieddate` int(10) unsigned DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT NULL,
  `re` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`seqno`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entity`
--

DROP TABLE IF EXISTS `entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `entity` (
  `id` char(32) NOT NULL,
  `name` varchar(100) NOT NULL,
  `parentid` char(32) DEFAULT NULL,
  `typeid` varchar(20) DEFAULT NULL,
  `creatorid` char(32) NOT NULL,
  `creatorip` varchar(40) NOT NULL,
  `creatorname` varchar(100) NOT NULL,
  `createddate` int(10) unsigned NOT NULL,
  `modifieddate` int(10) unsigned DEFAULT NULL,
  `deleted` int(11) DEFAULT '0',
  `deteleddate` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `metadatum`
--

DROP TABLE IF EXISTS `metadatum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metadatum` (
  `name` varchar(100) NOT NULL,
  `entityid` char(32) NOT NULL,
  `idvalue` char(32) DEFAULT NULL,
  `textvalue` text,
  `numbervalue` int(11) DEFAULT NULL,
  `datevalue` int(10) unsigned DEFAULT NULL,
  `booleanvalue` tinyint(4) DEFAULT NULL,
  `creatorid` char(32) DEFAULT NULL,
  `creatorname` varchar(100) DEFAULT NULL,
  `creatorip` varchar(100) DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT NULL,
  `deleteddate` int(10) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'infoplinth'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-22 21:54:15
