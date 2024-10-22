CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `message_type_id` int(11) DEFAULT NULL,
  `language_id` int(11) unsigned NOT NULL,
  `description` varchar(100) NOT NULL,
  `status_code` int(1) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
