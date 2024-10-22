CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `abbreviation` varchar(4) NOT NULL,
  `symbol` varchar(2) NOT NULL,
  `status_id` varchar(11) NOT NULL,
  PRIMARY KEY (`currency_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
