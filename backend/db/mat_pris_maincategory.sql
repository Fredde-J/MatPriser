-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: mat_pris
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB

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
-- Table structure for table `maincategory`
--

DROP TABLE IF EXISTS `maincategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maincategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `isPopular` tinyint(1) DEFAULT 0 COMMENT '1- true, 0-false',
  `picURL` varchar(45) DEFAULT NULL,
  `isCountryDropdown` tinyint(1) DEFAULT 0 COMMENT 'true 1, false 0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maincategory`
--

LOCK TABLES `maincategory` WRITE;
/*!40000 ALTER TABLE `maincategory` DISABLE KEYS */;
INSERT INTO `maincategory` VALUES (1,'Mjölk',1,'/images/milk.png',0),(2,'Frukt',1,'/images/fruit.png',1),(3,'Grönsaker',1,'/images/vegtables.png',1),(4,'Bröd, kakor',1,'/images/bread.png',0),(5,'Kaffe',1,'/images/coffe.png',0),(6,'Hem',1,'/images/house.png',0),(7,'Kött',1,'/images/meat.png',0),(8,'Fisk, skaldjur',1,'/images/fish.svg',0),(9,'Vegetariskt',1,'/images/vegan.jpg',0),(19,'Ost',1,'/images/cheese.png',0),(20,'Ägg',1,'/images/egg.png',0);
/*!40000 ALTER TABLE `maincategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-03  0:05:22
