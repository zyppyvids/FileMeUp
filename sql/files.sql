CREATE TABLE `files` (
  `file_id` INT NOT NULL AUTO_INCREMENT ,
  `file_name` VARCHAR(255) NOT NULL ,
  `file_path` VARCHAR(255) NOT NULL ,
  `file_type` VARCHAR(255) NOT NULL ,
  `size` INT NOT NULL ,
  `owner_id` INT NOT NULL ,
  PRIMARY KEY (`file_id`)
);

ALTER TABLE `files` ADD CONSTRAINT `foreign_key` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;