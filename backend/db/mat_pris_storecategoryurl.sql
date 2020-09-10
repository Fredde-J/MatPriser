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
  `categoryId` int(11) NOT NULL,
  `categoryURL` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_StoreCategoryUrlCategoryId` (`categoryId`),
  KEY `FK_StoreCategoryUrlStoreId` (`storeId`),
  CONSTRAINT `FK_StoreCategoryUrlCategoryId` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`),
  CONSTRAINT `FK_StoreCategoryUrlStoreId` FOREIGN KEY (`storeId`) REFERENCES `store` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `storecategoryurl`
--

LOCK TABLES `storecategoryurl` WRITE;
/*!40000 ALTER TABLE `storecategoryurl` DISABLE KEYS */;
INSERT INTO `storecategoryurl` VALUES (1,3,1,'Mejeri-ost-och-agg/Mjolk/Standardmjolk'),(2,3,2,'Mejeri-ost-och-agg/Mjolk/Mellanmjolk'),(3,3,3,'Mejeri-ost-och-agg/Mjolk/Lattmjolk'),(4,3,4,'Frukt-och-Gront/Frukt/Bananer'),(5,3,5,'Frukt-och-Gront/Frukt/Applen'),(6,3,7,'Frukt-och-Gront/Gronsaker/Tomater'),(7,3,8,'Frukt-och-Gront/Gronsaker/Paprika'),(8,3,11,'Mejeri-ost-och-agg/Agg'),(9,3,12,'Vegetariskt/Tofu'),(10,3,13,'Dryck/Kaffe/Snabbkaffe'),(11,3,14,'Brod-och-Kakor/Knackebrod-och-Skorpor/Knackebrod'),(12,3,15,'Fisk-och-Skaldjur/Fisk/Farsk-fisk'),(13,3,16,'Hem-och-Stad/Disk-och-stad/Handdiskmedel'),(14,1,1,'search?text=standardmjölk:'),(15,1,2,'search?text=mellanmj%C3%B6lk:'),(16,1,3,'search?text=l%C3%A4ttmj%C3%B6lk:'),(17,1,4,'discover?categoryId=32490'),(18,1,5,'discover?categoryId=32486'),(19,1,7,'discover?categoryId=32408'),(20,1,8,'discover?categoryId=198002'),(21,1,10,'search?text=apelsinjuice:'),(22,1,12,'discover?categoryId=193841390'),(23,1,13,'discover?categoryId=32768'),(24,1,14,'search?text=kn%C3%A4ckebr%C3%B6d:'),(25,1,15,'discover?categoryId=32327'),(26,1,16,'discover?categoryId=33591'),(27,2,1,'Mejeri-ost-och-agg/Mjolk/Standardmjolk'),(28,2,2,'Mejeri-ost-och-agg/Mjolk/Mellanmjolk'),(29,2,3,'Mejeri-ost-och-agg/Mjolk/Lattmjolk'),(30,2,4,'Frukt-och-gront/Frukt/Bananer'),(31,2,5,'Frukt-och-gront/Frukt/Applen'),(32,2,7,'Frukt-och-gront/Gronsaker/Tomater'),(33,2,8,'Frukt-och-gront/Gronsaker/Paprika'),(34,2,10,'search?q=apelsinjuice'),(35,2,11,'Mejeri-ost-och-agg/Agg/Agg'),(36,2,12,'Vegetariskt/Tofu'),(37,2,13,'Skafferi/Kaffe/Snabbkaffe'),(38,2,14,'Brod-och-kakor/Knackebrod-och-skorpor/Knackebrod'),(39,2,15,'Fisk-och-skaldjur/Fisk/Farsk-fisk'),(40,2,16,'Hem-och-stad/Disk/Handdisk'),(41,3,9,'Frukt-och-Gront/Frukt/Melon'),(42,2,9,'Frukt-och-gront/Frukt/Meloner'),(43,1,9,'discover?categoryId=32496'),(44,1,6,'discover?categoryId=32494'),(45,2,6,'Frukt-och-gront/Frukt/Druvor'),(46,3,6,'Frukt-och-Gront/Frukt/Druvor');
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

-- Dump completed on 2020-09-10 11:40:31
