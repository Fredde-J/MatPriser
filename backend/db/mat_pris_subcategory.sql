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
-- Table structure for table `subcategory`
--

DROP TABLE IF EXISTS `subcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `mainCategoryId` int(11) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Standard Mjölk',1,'standardmjölk, standard, 3%'),(2,'Mellan Mjölk',1,'mellanmjölk, mjölk mellan'),(3,'Lätt Mjölk',1,'lättmjölk, lättare, lätt'),(7,'Banan',2,'banan'),(8,'Äpple',2,'äpple'),(9,'Druvor',2,'druvor'),(10,'Melon',2,'melon'),(11,'Tomat',3,'tomat'),(12,'Paprika',3,'paprika'),(14,'Knäckebröd',4,'knäckebröd, knäcke, veteknäcke,falu rågrut, spisbröd, skorpor'),(15,'Bröd',4,'skivad, jättefranska, rasker, rosta, toast, hönö, superbröd, lantbröd, grötbröd, rostbröd, surdegsbröd, rågbröd, fröbröd, formbröd, frukt, bondbröd, sportbröd, jubileumsbröd, vallmobröd, medelhavsbröd, fullkornsbröd, finbröd, kraftbröd, surdeg, rågkaka, vetekaka, levain, abisko, lingongrova, lingon, guldkorn, baguette, limpa, ciabatta, bagel, julia, fralla, ruta, bräck, småfranska, grekisk, långfranska, ungerskt, korvbröd, hamburgerbröd, hamburger, hot dog'),(16,'Fika',4,'muffin, croissant, donut, kanelbulle, toscabulle, wienerbröd, vaniljbulle, estellefläta, munk, maple pecan, gifflar, tårtbotten, cinelle, marängbotten, längd, macarons, havreboll, punschrullar, tårta, dammsugare  '),(17,'Kex och Kakor',4,'digestivekex, kex, riskakor, mariekex, cookies, finska pinnar, syltkakor, kakor, biscotti, guldmarie, kinder, crackers, oreo, mars, biscoff, flarn, finger, biscuit'),(18,'Snabbkaffe',5,'instant,snabbkaffe'),(20,'Hela bönor',5,'keffebönor,hela bönor,bönkaffe'),(21,'Hand diskmedel',6,'handdiskmedel, diskmedel'),(22,'Toalettpapper',6,'toa, toalettpapper'),(23,'Tvättmedel',6,'tvättmedel'),(24,'Hushållspapper',6,'torkpapper,hushållspapper'),(25,'Fläsk',7,'fläsk,karré,skinkschnitzel,salsiccia,kassler,kotlett'),(26,'Kyckling',7,'kyckling,chicken,kalkon'),(27,'Tofu',9,'tofu'),(28,'Pålägg',9,'vegiar,pålägg,pastej,påmackan,paté,salami,vego skrivor'),(29,'Fisk',8,'lax,fisk,kummel,torsk,fish,pollock,sej,ton,regnbåge,surimi,kolja,sil,sill,sardeller'),(30,'Skaldjur',8,'räkor,hummer,skaldjur,kammusslor,kräftor,räka,krabba,musslor'),(31,'Filter',5,'kaffefilter'),(32,'Citrusfrukt',2,'citron,apelsin,satsumas,lime,clementiner,grapefrukt'),(33,'Bönkaffe',5,'bryggkaffe'),(34,'Maskindiskmedel',6,'maskindiskmedel'),(35,'Sköljmedel',6,'sköljmedel'),(36,'Nöt',7,'lövbiff,oxfilé,nötkött,nöt,högrev,biff,entrecote,ryggbiff,nötfärs'),(37,'Kaviar och Rom',8,'caviar,kaviar,stenbitsrom,vegiar,ishavsrom'),(38,'Skivad ost',19,'skivad'),(39,'Dessertost',19,'camambert,getost,ädel,chevrette,le bon brie,brie,danablu,saint agur,marquis,morbier,gorgonzola,manchego,flödeost,le roule'),(40,'Riven ost',19,'riven'),(41,'Mozzarella',19,'mozzarella');
/*!40000 ALTER TABLE `subcategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-24  5:36:04
