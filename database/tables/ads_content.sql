CREATE TABLE `ads_content` (
  `ads_content_id` int(11) NOT NULL AUTO_INCREMENT,
  `ad_id` int(11) NOT NULL,
  `ad_type_id` int(11) NOT NULL,
  `ads_orientation_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `play_time` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`ads_content_id`),
  KEY `ads_orientation_fk` (`ads_orientation_id`),
  KEY `ads_content_ibfk_1` (`ad_id`),
  KEY `ads_content_ad_type_id_fk_idx` (`ad_type_id`),
  CONSTRAINT `ads_content_ad_type_id_fk` FOREIGN KEY (`ad_type_id`) REFERENCES `ads_type` (`ads_type_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ads_content_ibfk_1` FOREIGN KEY (`ad_id`) REFERENCES `ads` (`ad_id`),
  CONSTRAINT `ads_orientation_fk` FOREIGN KEY (`ads_orientation_id`) REFERENCES `ads_orientation` (`ads_orientation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
