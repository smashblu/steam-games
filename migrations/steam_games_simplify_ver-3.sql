DROP DATABASE IF EXISTS `steam_games`;
CREATE DATABASE `steam_games`;
USE `steam_games`;

DROP TABLE IF EXISTS `publisher`;
CREATE TABLE `publisher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `publisher` WRITE;
INSERT INTO `publisher` VALUES (1,'Nintendo'),(2,'Sega'),(3,'Midway'),(4,'Konami');
UNLOCK TABLES;

DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `releaseDate` date DEFAULT NULL,
  `rating` enum('Rating Pending','Rating Pending - Likely Mature 17+','Everyone','Everyone 10+','Teen','Mature 17+','Adults Only 18+') NOT NULL,
  `publisherId` int DEFAULT NULL,
  `currentPrice` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publisher_id` (`publisherId`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`publisherId`) REFERENCES `publisher` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `games` WRITE;
INSERT INTO `games` VALUES (1,'Super Mario Bros. 3','1990-02-12','Everyone',1,19.99),(2,'Sonic the Hedgehog 2','1992-11-24','Everyone',2,9.99),(3,'Mortal Kombat 4','1997-09-11','Mature 17+',3,19.99),(4,'The Legend of Zelda: Ocarina of Time','1998-11-23','Everyone',1,59.99),(5,'Metal Gear Solid 3: Snake Eater','2004-11-17','Mature 17+',4,69.99);
UNLOCK TABLES;

DROP TABLE IF EXISTS `steam_library`;
CREATE TABLE `steam_library` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `steam_library` WRITE;
INSERT INTO `steam_library` VALUES (1,'smashblu');
UNLOCK TABLES;


DROP TABLE IF EXISTS `library_games`;
CREATE TABLE `library_games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int DEFAULT NULL,
  `library_id` int DEFAULT NULL,
  `playtime` time DEFAULT NULL,
  `cost` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `library_id` (`library_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `library_games_ibfk_1` FOREIGN KEY (`library_id`) REFERENCES `steam_library` (`id`),
  CONSTRAINT `library_games_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `library_games` WRITE;
UNLOCK TABLES;
