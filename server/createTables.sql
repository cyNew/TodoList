-- Table Definition
-- mysql version: v8.0.18

-- User
CREATE TABLE `user` (
  `userid` varchar(36) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL,
  `created` datetime NOT NULL,
  `isAuth` tinyint(4) NOT NULL DEFAULT '0',
  `login` datetime DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Todo
CREATE TABLE `todo` (s
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `todo` text NOT NULL,
  `completed` text NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `useridUserid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_7581941fdcddeff61bedd4214c9` (`useridUserid`),
  CONSTRAINT `FK_7581941fdcddeff61bedd4214c9` FOREIGN KEY (`useridUserid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;