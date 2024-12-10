-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 01:02 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crb-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookmarks_tbl`
--

CREATE TABLE `bookmarks_tbl` (
  `bookmark_id` varchar(255) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category_id`
--

CREATE TABLE `category_id` (
  `category_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category_id`
--

INSERT INTO `category_id` (`category_id`, `name`) VALUES
('1', 'poem'),
('2', 'short story');

-- --------------------------------------------------------

--
-- Table structure for table `comments_tbl`
--

CREATE TABLE `comments_tbl` (
  `comment_id` varchar(255) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genre_post_tbl`
--

CREATE TABLE `genre_post_tbl` (
  `gp_id` varchar(255) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `tag_id` varchar(255) NOT NULL,
  `category_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre_post_tbl`
--

INSERT INTO `genre_post_tbl` (`gp_id`, `post_id`, `tag_id`, `category_id`) VALUES
('GP - 2024-10ad4e0', 'POST - 2024-101d6aa', '2', '1'),
('GP - 2024-10ad728', 'POST - 2024-101d6aa', '1', '1'),
('GP - 2024-10ecf72', 'POST - 2024-1042b28', '1', '1'),
('GP - 2024-10ed08e', 'POST - 2024-1042b28', '2', '1');

-- --------------------------------------------------------

--
-- Table structure for table `genre_tbl`
--

CREATE TABLE `genre_tbl` (
  `tag_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `genre_tbl`
--

INSERT INTO `genre_tbl` (`tag_id`, `name`) VALUES
('1', 'horror'),
('2', 'comedy');

-- --------------------------------------------------------

--
-- Table structure for table `posts_tbl`
--

CREATE TABLE `posts_tbl` (
  `post_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `status` enum('for_review','rejected','posted','reviewing') NOT NULL,
  `analysis_score` varchar(255) NOT NULL,
  `published_at` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_tbl`
--

INSERT INTO `posts_tbl` (`post_id`, `user_id`, `title`, `content`, `status`, `analysis_score`, `published_at`, `created_at`, `updated_at`) VALUES
('POST - 2024-09d58ca', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all hated yngwie serrano', 'for_review', 'negative', NULL, '2024-12-09 18:43:24', '0000-00-00 00:00:00'),
('POST - 2024-09d619e', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'positive', '2024-12-09 18:44:01', '2024-12-09 18:44:01', '0000-00-00 00:00:00'),
('POST - 2024-10103a2', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'positive', '2024-12-10 17:35:06', '2024-12-10 17:35:06', '0000-00-00 00:00:00'),
('POST - 2024-101d6aa', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all hated yngwie serrano', 'for_review', 'negative', NULL, '2024-12-10 18:20:36', '0000-00-00 00:00:00'),
('POST - 2024-1042b28', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'positive', '2024-12-10 17:39:02', '2024-12-10 17:39:02', '0000-00-00 00:00:00'),
('POST - 2024-104d4d2', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'positive', '2024-12-10 15:58:16', '2024-12-10 15:58:16', '0000-00-00 00:00:00'),
('POST - 2024-1073e84', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'positive', '2024-12-10 17:38:51', '2024-12-10 17:38:51', '0000-00-00 00:00:00'),
('POST - 2024-10f380e', 'USER - 2024-08aa9ad', 'the life of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'positive', '2024-12-10 17:33:09', '2024-12-10 17:33:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `post_views_tbl`
--

CREATE TABLE `post_views_tbl` (
  `view_id` varchar(255) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `viewed_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports_tbl`
--

CREATE TABLE `reports_tbl` (
  `report_id` varchar(255) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `review_tbl`
--

CREATE TABLE `review_tbl` (
  `review_id` varchar(255) NOT NULL,
  `post_id` varchar(255) NOT NULL,
  `analysis_score` varchar(255) NOT NULL,
  `status` enum('for_review','rejected','posted','reviewing') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review_tbl`
--

INSERT INTO `review_tbl` (`review_id`, `post_id`, `analysis_score`, `status`, `created_at`, `updated_at`) VALUES
('REJECT - 2024-09aca35', 'POST - 2024-09d58ca', 'negative', 'rejected', '2024-12-09 18:43:24', NULL),
('REJECT - 2024-10aca63', 'POST - 2024-101d6aa', 'negative', 'rejected', '2024-12-10 18:20:36', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_tbl`
--

CREATE TABLE `user_tbl` (
  `user_id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','guest','user') NOT NULL,
  `verification_code` int(11) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `verification_expiry` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`user_id`, `username`, `first_name`, `last_name`, `email`, `password`, `role`, `verification_code`, `verified_at`, `verification_expiry`, `created_at`, `updated_at`) VALUES
('USER - 2024-086146e', 'akosiblek', 'blake', 'laviano', 'reframing_ml@yahoo.com', '202cb962ac59075b964b07152d234b70', 'user', 142108, NULL, 1733660647, '2024-12-08 20:14:07', NULL),
('USER - 2024-08a3714', 'akosiblek', 'blake', 'laviano', 'reframing_ml@yahoo.com', '202cb962ac59075b964b07152d234b70', 'user', 804905, NULL, 1733660681, '2024-12-08 20:14:41', NULL),
('USER - 2024-08aa9ad', 'akosiblek', 'blake', 'laviano', 'cristianpogi.laviano@gmail.com', '202cb962ac59075b964b07152d234b70', 'user', NULL, '2024-12-08 15:41:07', NULL, '2024-12-08 15:02:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookmarks_tbl`
--
ALTER TABLE `bookmarks_tbl`
  ADD PRIMARY KEY (`bookmark_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `category_id`
--
ALTER TABLE `category_id`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments_tbl`
--
ALTER TABLE `comments_tbl`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `uesr_id` (`user_id`);

--
-- Indexes for table `genre_post_tbl`
--
ALTER TABLE `genre_post_tbl`
  ADD PRIMARY KEY (`gp_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `genre_tbl`
--
ALTER TABLE `genre_tbl`
  ADD PRIMARY KEY (`tag_id`);

--
-- Indexes for table `posts_tbl`
--
ALTER TABLE `posts_tbl`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_views_tbl`
--
ALTER TABLE `post_views_tbl`
  ADD PRIMARY KEY (`view_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `reports_tbl`
--
ALTER TABLE `reports_tbl`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `review_tbl`
--
ALTER TABLE `review_tbl`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `user_tbl`
--
ALTER TABLE `user_tbl`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmarks_tbl`
--
ALTER TABLE `bookmarks_tbl`
  ADD CONSTRAINT `bookmarks_tbl_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`),
  ADD CONSTRAINT `bookmarks_tbl_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`);

--
-- Constraints for table `comments_tbl`
--
ALTER TABLE `comments_tbl`
  ADD CONSTRAINT `comments_tbl_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`),
  ADD CONSTRAINT `comments_tbl_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`);

--
-- Constraints for table `genre_post_tbl`
--
ALTER TABLE `genre_post_tbl`
  ADD CONSTRAINT `genre_post_tbl_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category_id` (`category_id`),
  ADD CONSTRAINT `genre_post_tbl_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`),
  ADD CONSTRAINT `genre_post_tbl_ibfk_3` FOREIGN KEY (`tag_id`) REFERENCES `genre_tbl` (`tag_id`);

--
-- Constraints for table `posts_tbl`
--
ALTER TABLE `posts_tbl`
  ADD CONSTRAINT `posts_tbl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`);

--
-- Constraints for table `post_views_tbl`
--
ALTER TABLE `post_views_tbl`
  ADD CONSTRAINT `post_views_tbl_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`),
  ADD CONSTRAINT `post_views_tbl_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`);

--
-- Constraints for table `reports_tbl`
--
ALTER TABLE `reports_tbl`
  ADD CONSTRAINT `reports_tbl_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`);

--
-- Constraints for table `review_tbl`
--
ALTER TABLE `review_tbl`
  ADD CONSTRAINT `review_tbl_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
