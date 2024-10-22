CREATE TABLE `ads` (
  `ad_id` int(11) NOT NULL AUTO_INCREMENT,
  `sponsor_id` int(11) NOT NULL COMMENT 'ID del patrocinante o dueño de la publicidad',
  `publish_date` datetime NOT NULL COMMENT 'Fecha en que se publicó el anuncion',
  `due_date` datetime NOT NULL COMMENT 'Fecha en que vence el anuncio',
  `currency_id` int(11) NOT NULL,
  `payable_amount` float(20,3) NOT NULL,
  `receivable_amount` float(20,3) NOT NULL,
  `status_id` int(1) NOT NULL,
  PRIMARY KEY (`ad_id`),
  KEY `ads_ibfk_2` (`sponsor_id`),
  CONSTRAINT `ads_ibfk_2` FOREIGN KEY (`sponsor_id`) REFERENCES `sponsors` (`sponsor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;