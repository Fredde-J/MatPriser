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
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `nameEng` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Belgien','Belgium'),(2,'Brasilien','Brazil'),(3,'Chile','Chile'),(4,'Colombia','Colombia'),(5,'Costa Rica','Costa Rica'),(6,'Ecuador','Ecuador'),(7,'Egypten','Egypt'),(8,'Elfenbenskusten','Ivory Coast'),(9,'Frankrike','France'),(10,'Nederländerna','Holland'),(11,'Iran','Iran'),(12,'Israel','Israel'),(13,'Italien','Italy'),(14,'Kina','Kina'),(16,'Nya Zeeland','New Zealand'),(17,'Polen','Poland'),(18,'Serbien','Serbia'),(19,'Spanien','Spain'),(20,'Sverige','Sweden'),(21,'Sydafrika','South Africa'),(22,'Turkiet','Turkey'),(23,'Ungern','Hungary'),(24,'Tyskland','Germany'),(25,'Tjeckien','Czech Republic'),(26,'Danmark','Denmark'),(27,'Österrike','Austria'),(28,'Estland','Estonia'),(29,'Finland','Finland'),(30,'Japan','Japan'),(31,'Kroatien','Croatia'),(32,'Norge','Norway'),(33,'USA','UK'),(34,'Storbritannien','UK'),(35,'Australien','Australia'),(36,'Tunisien','Tunisia'),(37,'Kenya','Kenya'),(38,'Peru','Peru'),(39,'Portugal','Portugal'),(40,'Zimbabwe','Zimbabwe'),(41,'Mexico','Mexico'),(42,'Litauen','Lithuania'),(43,'Schweiz','Switzerland'),(44,'Kazakstan','Kazakstan'),(45,'Malaysia','Malaysia');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
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
