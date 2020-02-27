-- Table Definition
-- mysql version: v8.0.18

-- User
CREATE TABLE `user` (
  `userid` varchar(36) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `isAuth` tinyint(4) NOT NULL DEFAULT '0',
  `created` text NOT NULL,
  `login` text,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Todo
CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo` text NOT NULL,
  `completed` text NOT NULL,
  `useridUserid` varchar(36) DEFAULT NULL,
  `created` text NOT NULL,
  `updated` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7581941fdcddeff61bedd4214c9` (`useridUserid`),
  CONSTRAINT `FK_7581941fdcddeff61bedd4214c9` FOREIGN KEY (`useridUserid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;