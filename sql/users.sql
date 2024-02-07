CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18,
  `username` varchar(10) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);