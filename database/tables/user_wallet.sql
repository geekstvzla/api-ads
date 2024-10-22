CREATE TABLE `user_wallet` (
  `user_wallet_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `currency_id` int(11) NOT NULL,
  `amount` float(20,3) NOT NULL,
  PRIMARY KEY (`user_wallet_id`),
  KEY `client_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
