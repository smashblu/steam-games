CREATE DATABASE `steam_games`;
USE `steam_games`;

CREATE TABLE `publisher` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `publisher` VALUES (1,'Nintendo'),(2,'Sega'),(3,'Midway'),(4,'Konami');

CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `rating` enum('Rating Pending','Rating Pending - Likely Mature 17+','Everyone','Everyone 10+','Teen','Mature 17+','Adults Only 18+') NOT NULL,
  `publisher_id` int DEFAULT NULL,
  `current_price` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `publisher_id` (`publisher_id`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`publisher_id`) REFERENCES `publisher` (`id`)
);

INSERT INTO `games` VALUES (1,'Super Mario Bros. 3','1990-02-12','Everyone',1,19.99),(2,'Sonic the Hedgehog 2','1992-11-24','Everyone',2,9.99),(3,'Mortal Kombat 4','1997-09-11','Mature 17+',3,19.99),(4,'The Legend of Zelda: Ocarina of Time','1998-11-23','Everyone',1,59.99),(5,'Metal Gear Solid 3: Snake Eater','2004-11-17','Mature 17+',4,69.99);

CREATE TABLE `steam_library` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `steam_library` VALUES (1,'smashblu');


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
);
