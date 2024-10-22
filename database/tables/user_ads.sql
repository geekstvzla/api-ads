CREATE TABLE `user_ads` (
  `user_ads_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `ad_id` int(11) NOT NULL,
  `date_played` datetime NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`user_ads_id`),
  KEY `user_ads_user_id_foreign` (`user_id`),
  CONSTRAINT `user_ads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
