CREATE TABLE `user_device_tokens` (
  `user_device_token_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`user_device_token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
