-- Kshetradarshini Database Initialization Script
CREATE DATABASE IF NOT EXISTS kshetradarshini;
USE kshetradarshini;

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(20) DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sevas Table
CREATE TABLE IF NOT EXISTS `sevas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `time` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Bookings Table
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `seva_id` int(11) NOT NULL,
  `booking_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `time_slot` varchar(50) NOT NULL,
  `devotee_name` varchar(100) NOT NULL,
  `num_persons` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `status` varchar(20) DEFAULT 'pending',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Lineage Table
CREATE TABLE IF NOT EXISTS `lineage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Initial Seed Data for Sevas
INSERT INTO `sevas` (`name`, `location`, `price`, `time`, `icon`) VALUES
('Go Seva', 'Kanchipeetam Temple', 500.0, 'Morning', '🐄'),
('Veda Rakshana', 'Kanchipeetam Temple', 1000.0, 'Evening', '📿'),
('Aalya Seva', 'Kanchipeetam Temple', 750.0, 'All Day', '🏛️'),
('Maha Rudrabhishekam', 'Kanchipeetam Temple', 1500.0, 'Weekend', '🔱')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Initial Seed Data for Lineage
INSERT INTO `lineage` (`name`, `image`) VALUES
('Acharya 1', 'https://api.a0.dev/assets/image?text=hindu%20acharya%20portrait&aspect=1:1'),
('Acharya 2', 'https://api.a0.dev/assets/image?text=spiritual%20guru%20portrait&aspect=1:1'),
('Acharya 3', 'https://api.a0.dev/assets/image?text=monk%20portrait&aspect=1:1'),
('Acharya 4', 'https://api.a0.dev/assets/image?text=vedic%20scholar%20portrait&aspect=1:1'),
('Acharya 5', 'https://api.a0.dev/assets/image?text=sanyasi%20portrait&aspect=1:1')
ON DUPLICATE KEY UPDATE `id`=`id`;
