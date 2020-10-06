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
  `description` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategory`
--

LOCK TABLES `subcategory` WRITE;
/*!40000 ALTER TABLE `subcategory` DISABLE KEYS */;
INSERT INTO `subcategory` VALUES (1,'Standard Mjölk',1,'standardmjölk,standard, 3%'),(2,'Mellan Mjölk',1,'mellanmjölk,mjölk mellan,mjölk Mellan 1,5%,mjölk 1,5%'),(3,'Lätt Mjölk',1,'lättmjölk,lättare, lätt'),(7,'Banan',2,'banan'),(8,'Äpple',2,'äpple'),(9,'Druvor',2,'druvor'),(10,'Melon',2,'melon'),(11,'Tomat',3,'tomat'),(12,'Paprika',3,'paprika'),(14,'Knäckebröd',4,'knäckebröd,knäcke,veteknäcke,falu rågrut,spisbröd,skorpor'),(15,'Bröd',4,'skivad,jättefranska,rasker,rosta,toast,hönö,superbröd,lantbröd,grötbröd,rostbröd,surdegsbröd,rågbröd,fröbröd,formbröd,frukt,bondbröd, sportbröd, jubileumsbröd, vallmobröd, medelhavsbröd, fullkornsbröd, finbröd, kraftbröd, surdeg, rågkaka, vetekaka, levain, abisko, lingongrova, lingon, guldkorn, baguette, limpa,chiafralla,ciabatta,bagel,rostbröd,hot dog,ciabatta,julia, fralla, ruta,bräck,småfranska,grekisk,långfranska,ungerskt,korvbröd,hamburgerbröd,hamburger,hot dog'),(16,'Fika',4,'muffin,croissant,donut,kanelbulle,toscabulle,wienerbröd,vaniljbulle,estellefläta,munk,maple pecan,gifflar,fläta,kanelsnäckor,rolls,kaka,goding kanel,tårtbotten,cinelle,marängbotten,längd,macarons,havreboll,kanelbullar,punschrullar,tårta,dammsugare  '),(17,'Kex och Kakor',4,'digestivekex, kex, riskakor,chocosticks,mariekex,cookies,kanelgömma,kanelkakor,kakor,finska pinnar,syltkakor, kakor, biscotti, guldmarie, kinder, crackers, oreo, mars, biscoff, flarn, finger, biscuit'),(18,'Snabbkaffe',5,'instant,snabbkaffe,mellanrost lyx glas,nescafé'),(20,'Hela bönor',5,'kaffebönor,hela bönor,bönkaffe'),(21,'Hand diskmedel',6,'handdiskmedel, diskmedel'),(22,'Toalettpapper',6,'toa, toalettpapper'),(23,'Tvättmedel',6,'tvättmedel,tvättkapslar,tvättpulver,bleksalt,fläckborttagning,Oxi Action,Vanish'),(24,'Hushållspapper',6,'torkpapper,hushållspapper'),(25,'Fläsk',7,'fläsk,karré,skinkschnitzel,salsiccia,kassler,kotlett,ribs,pulled pork,pork'),(26,'Kyckling',7,'kyckling,chicken,kalkon,wings'),(27,'Tofu',9,'tofu'),(28,'Pålägg',9,'vegiar,pålägg,pastej,påmackan,paté,salami,vego skrivor'),(29,'Fisk',8,'lax,fisk,kummel,torsk,fish,pollock,sej,ton,regnbåge,surimi,koljal,sardeller'),(30,'Skaldjur',8,'räkor,hummer,skaldjur,kammusslor,kräftor,räka,krabba,musslor'),(31,'Filter',5,'kaffefilter'),(32,'Citrusfrukt',2,'citron,apelsin,satsumas,lime,clementiner,grapefrukt,honungspomelo,grape'),(33,'Bönkaffe',5,'bryggkaffe'),(34,'Maskindiskmedel',6,'maskindiskmedel,maskindisktabletter,diskmaskinssalt'),(35,'Sköljmedel',6,'sköljmedel'),(36,'Nöt',7,'lövbiff,oxfilé,nötkött,nöt,högrev,biff,entrecote,ryggbiff,nötfärs,kalv,beef'),(37,'Kaviar och Rom',8,'caviar,kaviar,stenbitsrom,vegiar,ishavsrom'),(38,'Skivad ost',19,'skivad'),(39,'Dessertost',19,'camambert,getost,ädel,chevrette,le bon brie,brie,danablu,saint agur,marquis,morbier,gorgonzola,manchego,flödeost,le roule'),(40,'Riven ost',19,'riven'),(41,'Mozzarella',19,'mozzarella'),(42,'Korv',7,'hot dog,korv,kabanos,bratwurst,kryddkorv,grillkorv,wienerkorv,kokkorv,varmkorv,falukorv,isterband,fläskkorv,chorizo,salsicca,cabanossy,krakauer,kolbasz,Medister Asmundtorps,salami'),(43,'Svamp',3,'svamp,champinjoner,kantareller'),(44,'Potatis',3,'potatis'),(45,'Rotsaker',3,'morötter,rotselleri,palsternacka,morot,rödbetor,polkabeta'),(46,'Päron',2,'päron'),(47,'Exotisk frukt',2,'kiwi,ananas,dadlar,fikon,kokosnöt,papaya,physalis,passionsfrukt,mango,cherimoya,bigarråer'),(48,'Sill, Anjovis & Sardiner',8,'sil,sil,ansjovis,matjes'),(49,'Grill',6,'grill,lampolja,tändvätska,braständare,spritbränsle,gas För Tändare,spisrent,tändkuber,korvhalster,rökflis,stektång,grillborste'),(50,'Städ',6,'spray,städservetter,avlopprengöring,mopp,borste,Wc-sticks,toalettfräsch,wc-rengöring,keramikren,klorin,avfallspåse,rengöring,Wc-Rent,aktive-Gel,gel,rent,sopsäck,puts,diskduk,diskborste,slaskrensare,stålboll,rengöring,sopset,toalettborste,allrent,köksspray,allrengöring,allduk,microfiber,grönsåpa,svamp,såpa,våtrum,luktstopp,fönsterduk,damm,fönsterraka,luftfräschare,kantborste,städservett,städpapper,supermocio,hink,rengöringscrème,spolglans,puts,borste,diskunderlägg,fönsterputs,universalduk,handskar,handske,rent,stålboll,putsmedel,propplösare'),(51,'Kök',6,'bägare,mugg,grytunderlägg,tallrik,snapsglas,ölglas,pappersmugg,glas,gaffel,kaffesked,springform,skärbräda,silicone pensel,borste siliko,kniv,durkslag,servetter,mått,te Sil,matförvaring,sked,duk,bestickset,konservöppnare,ägg,kaffesil,smörkniv,osthyvel,vitlökspress,pizzaskärare,spritspåse,dressingbägare,ballongvisp,korkskruv,slickepott,kapsylöppnare,köttermometer,brödkavel,potatisstomp,stekspade,nötknäckare,potatisskalare,Slev Bambu,Spatel Bambu,pajform,brödform,Stekpincett Bambu,rivjärn,hamburgerbox,kaffekopp,fryspåse,stekpåse,burk Med,aluminiumform,träbestick,ätpinnar,tårtpapper,majskolvshållare,köttermometer,stekpanna,kaffemått,måttsats,plastsked,soppslev,visp,brödpensel,potatisstöt,pastaslev,stekspade,gryta,vispskål'),(53,'Kläder',6,'strumpa,byxor,strumpor,tights,byxa,leggings,vante'),(54,'Pitabröd',4,'pita'),(55,'Husdjur',21,'hund,katt,Adult Oxkött,kyckling,kalkon,lax,tonf,lever,anka,gourmet,torrfoder,perle,sea,delicacies,oxkött,paté,sticks,jumbo,fisk,pate,favoriträtt,räkor,bitar,beef,gele,party mix original,smådjur,favoritgodis,boll i boll'),(56,'Plommon',2,'plommon'),(57,'Nektarin, Persika',2,'nektarin,persika'),(58,'Lök',3,'lök'),(59,'Sallad & Kål',3,'Isbergssallad,vitkål,spenat,säsongmix,ruccola,kål,sallat,sallad,frisé,rucola,sockerärtor,mangold,groodar,raw slaw hackat,medelhavsmix,bistromix,Hackat & Klart'),(60,'Auberginer & Zucchini',3,'zucchini,aubergine'),(61,'Gurka',3,'gurka'),(62,'Kryddor',2,'basilika,dil,persilja,koriander,timjan,chillipeppar,mynta,gurkmeja'),(63,'Avocado',3,'avocado,avokado'),(64,'Broccoli',3,'broccoli'),(65,'Ägg',20,'ägg'),(66,'Hemmet',6,'batteri,sudd,penna,tejp,clips,pennor,ljus,kronljus,vattenfärglåda,partypoppers,bägare,allkrok,möbel,spik,klädnypor,nagelfil,blompinnar,påsklämmor,näringspinnar,ballonger,skosvamp,skodeo,Alphabet Beads Kit,klister,lampa,led,block,brandvarnare,lås,yatzy,spelkort,kort,skarvsladd,gren,stift,tipp-ex,myrdosa,skurborste,vävtape,gummiband,häftmassa,hue go, hue white,sladd,flexislang,propp,tandpetare,målar,vas rund,linjal,microfiber,halogen,reseflaska,tändare,necessär,korg,braständare,skollim,dammsugar,potatissticka,pennvässare,lecakulor,play-doh,islåda,duschboll,nagelborste,kritor,fotfil,tandborstar,musfällor,gravlykta,isfacklor,serpentiner,pincett,glaslykta,marschaller,stickers,kruka,Make-up,hårturban,ritapper,doftljus,bilar,badborste,magnetblock,pruttkudde,rödsprit,lacknafta,lampolja,belysning,sticky Notes,flygplan,haolgenrör,bracelets,sax,fasadset,memo,slime,rubiks Kub,refill,DVD,Blue-ray,WiZ,skrivbok,Hue ,partyvimpel,serpentiner,klädvårdsrulle,tändstickor,sprayflaska,Textile Marker,knappcell,doftpärlor,dammvippa');
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

-- Dump completed on 2020-10-04 22:40:51
