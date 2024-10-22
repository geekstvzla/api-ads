CREATE TABLE `ads_files_extensions` (
  `ads_file_extension_id` int(11) NOT NULL AUTO_INCREMENT,
  `file_ext_id` int(11) NOT NULL,
  `ads_type_id` int(11) NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`ads_file_extension_id`),
  KEY `file_ext_id` (`file_ext_id`),
  KEY `ads_type_id` (`ads_type_id`),
  CONSTRAINT `ads_files_extensions_ibfk_1` FOREIGN KEY (`file_ext_id`) REFERENCES `file_extensions` (`file_extension_id`),
  CONSTRAINT `ads_files_extensions_ibfk_2` FOREIGN KEY (`ads_type_id`) REFERENCES `ads_type` (`ads_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
