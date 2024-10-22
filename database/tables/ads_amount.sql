CREATE TABLE `ads_amount` (
  `ads_amount_id` int(11) NOT NULL AUTO_INCREMENT,
  `viewer_amount` decimal(20,3) NOT NULL,
  `sponsor_amount` decimal(20,3) NOT NULL,
  `status_id` int(11) NOT NULL,
  PRIMARY KEY (`ads_amount_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
