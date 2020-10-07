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
  `categoryURL` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_StoreCategoryUrlCategoryId` (`mainCategoryId`),
  KEY `FK_StoreCategoryUrlStoreId` (`storeId`),
  CONSTRAINT `FK_StoreCategoryUrlCategoryId` FOREIGN KEY (`mainCategoryId`) REFERENCES `maincategory` (`id`),
  CONSTRAINT `FK_StoreCategoryUrlStoreId` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storecategoryurl`
--

LOCK TABLES `storecategoryurl` WRITE;
/*!40000 ALTER TABLE `storecategoryurl` DISABLE KEYS */;
INSERT INTO `storecategoryurl` VALUES (62,3,1,'Mejeri-ost-och-agg/Mjolk'),(63,2,1,'Mejeri-ost-och-agg/Mjolk'),(64,1,1,'discover?categoryId=6264'),(92,3,2,'Frukt-och-Gront/Frukt'),(93,2,2,'Frukt-och-gront/Frukt'),(94,1,2,'discover?categoryId=32484'),(95,3,3,'Frukt-och-Gront/Gronsaker'),(96,2,3,'Frukt-och-gront/Gronsaker'),(97,1,3,'discover?categoryId=32361'),(98,3,4,'Brod-och-Kakor'),(99,2,4,'Brod-och-kakor'),(100,1,4,'discover?categoryId=18121'),(113,3,5,'Dryck/Kaffe'),(114,2,5,'Skafferi/Kaffe'),(115,1,5,'discover?categoryId=32644'),(122,3,6,'Hem-och-Stad'),(123,2,6,'Hem-och-stad'),(124,1,6,'discover?categoryId=29659'),(137,3,7,'Kott-chark-och-fagel'),(138,2,7,'Kott-och-kyckling'),(139,1,7,'discover?categoryId=11777'),(143,3,8,'Fisk-och-Skaldjur'),(144,2,8,'Fisk-och-skaldjur'),(145,1,8,'discover?categoryId=14754'),(146,3,9,'Vegetariskt'),(147,2,9,'Vegetariskt'),(148,1,9,'discover?categoryId=39033900'),(164,3,20,'Mejeri-ost-och-agg/Agg'),(165,2,20,'Mejeri-ost-och-agg/Agg/Agg'),(166,1,20,'discover?categoryId=32243'),(167,3,19,'Mejeri-ost-och-agg/Ost'),(168,2,19,'Mejeri-ost-och-agg/Ost'),(169,1,19,'discover?categoryId=6327'),(170,2,3,'Frukt-och-gront/Lok'),(171,2,3,'Frukt-och-gront/Potatis-och-rotfrukter'),(172,1,3,'discover?categoryId=32460'),(173,1,2,'discover?categoryId=32502'),(174,3,3,'Frukt-och-Gront/Potatis-och-rotsaker'),(175,3,3,'Frukt-och-Gront/Svamp'),(176,1,3,'discover?categoryId=32430'),(177,3,3,'Frukt-och-Gront/Kryddor-och-smaksattare/Kryddor-och-orter'),(178,2,3,'Frukt-och-gront/Kryddor-och-smaksattare/Kryddor'),(179,1,3,'discover?categoryId=32476'),(180,2,3,'Frukt-och-gront/Svamp'),(181,2,21,'Djur'),(182,3,21,'Husdjur'),(183,1,21,'discover?categoryId=32045'),(184,1,7,'discover?categoryId=32283'),(185,2,7,'Chark-och-palagg/Korv');
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

-- Dump completed on 2020-10-07 15:08:05
