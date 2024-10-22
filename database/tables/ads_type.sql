CREATE TABLE `ads_type` (
  `ads_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(10) NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`ads_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
