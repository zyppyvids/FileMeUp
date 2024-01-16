CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18,
  `username` varchar(10) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;