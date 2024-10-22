CREATE TABLE `file_extensions` (
  `file_extension_id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(5) NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`file_extension_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
