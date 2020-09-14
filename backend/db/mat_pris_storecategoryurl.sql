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
-- Table structure for table `storecategoryurl`
--

DROP TABLE IF EXISTS `storecategoryurl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `storecategoryurl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storeId` int(11) NOT NULL,
  `mainCategoryId` int(11) NOT NULL,
  `subCategoryId` int(11) DEFAULT NULL,
  `categoryURL` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_StoreCategoryUrlCategoryId` (`mainCategoryId`),
  KEY `FK_StoreCategoryUrlStoreId` (`storeId`),
  CONSTRAINT `FK_StoreCategoryUrlCategoryId` FOREIGN KEY (`mainCategoryId`) REFERENCES `maincategory` (`id`),
  CONSTRAINT `FK_StoreCategoryUrlStoreId` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storecategoryurl`
--

LOCK TABLES `storecategoryurl` WRITE;
/*!40000 ALTER TABLE `storecategoryurl` DISABLE KEYS */;
INSERT INTO `storecategoryurl` VALUES (53,3,1,1,'Mejeri-ost-och-agg/Mjolk/Standardmjolk'),(54,2,1,1,'Mejeri-ost-och-agg/Mjolk/Standardmjolk'),(55,1,1,1,'search?text=standardmj%C3%B6lk:'),(56,3,1,2,'Mejeri-ost-och-agg/Mjolk/Mellanmjolk'),(57,2,1,2,'Mejeri-ost-och-agg/Mjolk/Mellanmjolk'),(58,1,1,2,'search?text=mellanmj%C3%B6lk:'),(59,3,1,3,'Mejeri-ost-och-agg/Mjolk/Lattmjolk'),(60,2,1,3,'Mejeri-ost-och-agg/Mjolk/Lattmjolk'),(61,1,1,3,'search?text=l%C3%A4ttmj%C3%B6lk:'),(62,3,1,NULL,'Mejeri-ost-och-agg'),(63,2,1,NULL,'Mejeri-ost-och-agg'),(64,1,1,NULL,'discover?categoryId=6262'),(65,3,1,5,'Mejeri-ost-och-agg/Agg'),(66,2,1,5,'Mejeri-ost-och-agg/Agg/Agg'),(67,1,1,5,'discover?categoryId=32243'),(68,3,1,6,'Mejeri-ost-och-agg/Ost'),(69,2,1,6,'Mejeri-ost-och-agg/Ost'),(70,1,1,6,'discover?categoryId=6327'),(71,3,2,7,'Frukt-och-Gront/Frukt/Bananer'),(72,2,2,7,'Frukt-och-gront/Frukt/Bananer'),(73,1,2,7,'discover?categoryId=32490'),(74,3,2,8,'Frukt-och-Gront/Frukt/Applen'),(75,2,2,8,'Frukt-och-gront/Frukt/Applen'),(76,1,2,8,'discover?categoryId=32486'),(77,3,2,9,'Frukt-och-Gront/Frukt/Druvor'),(78,2,2,9,'Frukt-och-Gront/Frukt/Druvor'),(79,1,2,9,'discover?categoryId=32494'),(80,3,2,10,'Frukt-och-Gront/Frukt/Melon'),(81,2,2,10,'Frukt-och-gront/Frukt/Meloner'),(82,1,2,10,'discover?categoryId=32496'),(83,3,3,11,'Frukt-och-Gront/Gronsaker/Tomater'),(84,2,3,11,'Frukt-och-gront/Gronsaker/Tomater'),(85,1,3,11,'discover?categoryId=32408'),(86,3,3,12,'Frukt-och-Gront/Gronsaker/Paprika'),(87,2,3,12,'Frukt-och-gront/Gronsaker/Paprika'),(88,1,3,12,'discover?categoryId=198002'),(89,3,4,14,'Brod-och-Kakor/Knackebrod-och-Skorpor/Knackebrod'),(90,2,4,14,'Brod-och-kakor/Knackebrod-och-skorpor/Knackebrod'),(91,1,4,14,'search?text=kn%C3%A4ckebr%C3%B6d:'),(92,3,2,NULL,'Frukt-och-Gront/Frukt'),(93,2,2,NULL,'Frukt-och-gront/Frukt'),(94,1,2,NULL,'discover?categoryId=32484'),(95,3,3,NULL,'Frukt-och-Gront/Gronsaker'),(96,2,3,NULL,'Frukt-och-gront/Gronsaker'),(97,1,3,NULL,'discover?categoryId=32361'),(98,3,4,NULL,'Brod-och-Kakor'),(99,2,4,NULL,'Brod-och-kakor'),(100,1,4,NULL,'discover?categoryId=18121'),(101,3,4,15,'Brod-och-Kakor/Brod'),(102,2,4,15,'Brod-och-kakor/Brod'),(103,1,4,15,'discover?categoryId=32528'),(104,3,4,16,'Brod-och-Kakor/Kondis-och-fika'),(105,2,4,16,'Brod-och-kakor/Kondis-och-fika'),(106,1,4,16,'discover?categoryId=34994'),(107,3,4,17,'Brod-och-Kakor/Kex-och-Kakor'),(108,2,4,17,'Brod-och-kakor/Kex-och-kakor'),(109,1,4,17,'discover?categoryId=34996'),(110,3,5,18,'Dryck/Kaffe/Snabbkaffe'),(111,2,5,18,'Skafferi/Kaffe/Snabbkaffe'),(112,1,5,18,'discover?categoryId=32768'),(113,3,5,NULL,'Dryck/Kaffe'),(114,2,5,NULL,'Skafferi/Kaffe'),(115,1,5,NULL,'discover?categoryId=32644'),(116,3,5,20,'Dryck/Kaffe/Hela-bonor'),(117,2,5,20,'Skafferi/Kaffe/Hela-bonor'),(118,1,5,20,'discover?categoryId=32766'),(119,3,5,31,'Dryck/Kaffe/Kaffefilter'),(120,2,5,31,'Skafferi/Kaffe/Filter'),(121,1,5,31,'discover?categoryId=32778'),(122,3,6,NULL,'Hem-och-Stad'),(123,2,6,NULL,'Hem-och-stad'),(124,1,6,NULL,'discover?categoryId=29659'),(125,3,6,21,'Hem-och-Stad/Disk-och-stad/Handdiskmedel'),(126,2,6,21,'Hem-och-stad/Disk/Handdisk'),(127,1,6,21,'discover?categoryId=33591'),(128,3,6,22,'Hem-och-Stad/Toalett-och-hushallspapper/Toalettpapper'),(129,2,6,22,'Hem-och-stad/Toalett-och-hushallspapper/Toalettpapper'),(130,1,6,22,'discover?categoryId=141448711'),(131,3,6,24,'Hem-och-Stad/Toalett-och-hushallspapper/Hushallspapper'),(132,2,6,24,'Hem-och-stad/Toalett-och-hushallspapper/Hushallspapper'),(133,1,6,24,'discover?categoryId=141448713'),(134,3,6,23,'Hem-och-Stad/Tvatt/Tvattmedel'),(135,2,6,23,'Hem-och-stad/Tvatt/Tvattmedel'),(136,1,6,23,'discover?categoryId=33613'),(137,3,7,NULL,'Kott-chark-och-fagel'),(138,2,7,NULL,'Kott-och-kyckling'),(139,1,7,NULL,'discover?categoryId=11777'),(140,3,7,26,'Kott-chark-och-fagel/Fagel'),(141,2,7,26,'Kott-och-kyckling/Kyckling-och-kalkon'),(142,1,7,26,'discover?categoryId=32203'),(143,3,8,NULL,'Fisk-och-Skaldjur'),(144,2,8,NULL,'Fisk-och-skaldjur'),(145,1,8,NULL,'discover?categoryId=14754'),(146,3,9,NULL,'Vegetariskt'),(147,2,9,NULL,'Vegetariskt'),(148,1,9,NULL,'discover?categoryId=39033900'),(152,3,8,29,'Fisk-och-Skaldjur/Fisk'),(153,2,8,29,'Fisk-och-skaldjur/Fisk'),(154,1,8,29,'discover?categoryId=32321'),(155,3,8,30,'Skaldjur-och-Havsdelikatesser'),(156,2,8,30,'Fisk-och-skaldjur/Skaldjur'),(157,1,8,30,'discover?categoryId=32345'),(158,3,9,27,'Vegetariskt/Tofu'),(159,2,9,27,'Vegetariskt/Tofu'),(160,1,9,27,'discover?categoryId=193841390'),(161,3,9,28,'Vegetariskt/Palagg-och-ost'),(162,2,9,28,'Vegetariskt/Ost-och-palagg'),(163,1,9,28,'discover?categoryId=39047236');
/*!40000 ALTER TABLE `storecategoryurl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-14 22:51:00
