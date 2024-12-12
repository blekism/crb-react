-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 12, 2024 at 06:23 PM
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

--
-- Dumping data for table `bookmarks_tbl`
--

INSERT INTO `bookmarks_tbl` (`bookmark_id`, `post_id`, `user_id`, `created_at`) VALUES
('test1', 'POST - 2024-09d58ca', 'USER - 2024-08aa9ad', '2024-12-12 12:42:12'),
('test10', 'POST - 2024-12d6713', 'USER - 2024-086146e', '2024-12-12 12:42:12'),
('test2', 'POST - 2024-1073e84', 'USER - 2024-08aa9ad', '2024-12-12 12:42:12'),
('test3', 'POST - 2024-12c04f2', 'USER - 2024-086146e', '2024-12-12 12:42:12'),
('test4', 'POST - 2024-12c04f2', 'USER - 2024-086146e', '2024-12-12 12:42:12'),
('test5', 'POST - 2024-12e6993', 'USER - 2024-086146e', '2024-12-12 12:42:12'),
('test6', 'POST - 2024-12c04f2', 'USER - 2024-08aa9ad', '2024-12-12 12:42:12'),
('test7', 'POST - 2024-12c04f2', 'USER - 2024-086146e', '2024-12-12 12:42:12'),
('test8', 'POST - 2024-12c04f2', 'USER - 2024-086146e', '2024-12-12 12:42:12'),
('test9', 'POST - 2024-12d6713', 'USER - 2024-086146e', '2024-12-12 12:42:12');

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
('1', 'Poem'),
('2', 'Short Story'),
('3', 'Novella'),
('4', 'Novel'),
('5', 'Essay'),
('6', 'Memoir'),
('7', 'Diary'),
('8', 'Autobiography'),
('9', 'Biography');

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

--
-- Dumping data for table `comments_tbl`
--

INSERT INTO `comments_tbl` (`comment_id`, `post_id`, `user_id`, `content`, `created_at`, `updated_at`) VALUES
('test', 'POST - 2024-09d58ca', 'USER - 2024-08aa9ad', 'asdasdasdasdasdasds', '2024-12-12 12:39:28', NULL),
('test10', 'POST - 2024-12d6713', 'USER - 2024-08aa9ad', 'asdasdasdasd', '2024-12-12 12:39:29', NULL),
('test2', 'POST - 2024-12e6993', 'USER - 2024-086146e', 'asdasdasdasd', '2024-12-12 12:39:29', NULL),
('test3', 'POST - 2024-10f380e', 'USER - 2024-08aa9ad', 'asdasdasdasdasd', '2024-12-12 12:39:29', NULL),
('test4', 'POST - 2024-12c04f2', 'USER - 2024-086146e', 'asdasdasdasd', '2024-12-12 12:39:29', NULL),
('test5', 'POST - 2024-122fc12', 'USER - 2024-086146e', 'asdadasdasd', '2024-12-12 12:39:29', NULL),
('test6', 'POST - 2024-12c04f2', 'USER - 2024-08aa9ad', 'dasdasdasd', '2024-12-12 12:39:29', NULL),
('test7', 'POST - 2024-09d58ca', 'USER - 2024-08aa9ad', 'asdasdasd', '2024-12-12 12:39:29', NULL),
('test8', 'POST - 2024-09d58ca', 'USER - 2024-086146e', 'asdasdasd', '2024-12-12 12:39:29', NULL),
('test9', 'POST - 2024-101d6aa', 'USER - 2024-086146e', 'asdasdasda', '2024-12-12 12:39:29', NULL);

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
('GP - 2024-121e0d9', 'POST - 2024-12a43ce', '1', '1'),
('GP - 2024-121e82a', 'POST - 2024-12a43ce', '2', '1'),
('GP - 2024-128a73d', 'POST - 2024-12ba06a', '4', '1'),
('GP - 2024-129ac48', 'POST - 2024-121f26e', '1', '1'),
('GP - 2024-12a5f27', 'POST - 2024-123c9ea', '2', '3'),
('GP - 2024-12b844a', 'POST - 2024-1220a34', '10', '2'),
('GP - 2024-12c810d', 'POST - 2024-1251fa6', '10', '5'),
('GP - 2024-12c8500', 'POST - 2024-1251fa6', '2', '5'),
('GP - 2024-12c9282', 'POST - 2024-1251fa6', '5', '5');

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
('1', 'Action'),
('10', 'Science Fiction'),
('11', 'Thriller'),
('12', 'Western'),
('2', 'Adventure'),
('3', 'Comedy'),
('4', 'Drama'),
('5', 'Fantasy'),
('6', 'Historical'),
('7', 'Horror'),
('8', 'Mystery'),
('9', 'Romance');

-- --------------------------------------------------------

--
-- Table structure for table `posts_tbl`
--

CREATE TABLE `posts_tbl` (
  `post_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` enum('for_review','rejected','posted','reviewing') NOT NULL,
  `image` text NOT NULL,
  `analysis_score` varchar(255) NOT NULL,
  `published_at` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_tbl`
--

INSERT INTO `posts_tbl` (`post_id`, `user_id`, `title`, `content`, `status`, `image`, `analysis_score`, `published_at`, `created_at`, `updated_at`) VALUES
('POST - 2024-09d58ca', 'USER - 2024-08aa9ad', 'the buhay of yngwie serrano', 'we all hated yngwie serrano', 'for_review', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'negative', NULL, '2024-12-09 18:43:24', '0000-00-00 00:00:00'),
('POST - 2024-09d619e', 'USER - 2024-08aa9ad', 'the kuba of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-09 18:44:01', '2024-12-09 18:44:01', '0000-00-00 00:00:00'),
('POST - 2024-10103a2', 'USER - 2024-08aa9ad', 'the paa of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-10 17:35:06', '2024-12-10 17:35:06', '0000-00-00 00:00:00'),
('POST - 2024-101d6aa', 'USER - 2024-08aa9ad', 'the ass of yngwie serrano', 'we all hated yngwie serrano', 'for_review', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'negative', NULL, '2024-12-10 18:20:36', '0000-00-00 00:00:00'),
('POST - 2024-1042b28', 'USER - 2024-08aa9ad', 'the betlog of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-10 17:39:02', '2024-12-10 17:39:02', '0000-00-00 00:00:00'),
('POST - 2024-104d4d2', 'USER - 2024-08aa9ad', 'the pussy of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-10 15:58:16', '2024-12-10 15:58:16', '0000-00-00 00:00:00'),
('POST - 2024-1073e84', 'USER - 2024-08aa9ad', 'the hairline of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-10 17:38:51', '2024-12-10 17:38:51', '0000-00-00 00:00:00'),
('POST - 2024-10f380e', 'USER - 2024-08aa9ad', 'the death of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-10 17:33:09', '2024-12-10 17:33:09', '0000-00-00 00:00:00'),
('POST - 2024-121f26e', 'USER - 2024-08aa9ad', 'mahal ni carl si yngwie serrano', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.\nyngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.\n', 'posted', 'https://storage.googleapis.com/crb-bucket/219bd546715da50f37dce476c0c391b9.png', 'positive', '2024-12-13 00:21:38', '2024-12-13 00:21:38', NULL),
('POST - 2024-1220a34', 'USER - 2024-08aa9ad', 'mahal ni carl si yngwie serrano', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.', 'posted', 'https://storage.googleapis.com/crb-bucket/219bd546715da50f37dce476c0c391b9.png', 'positive', '2024-12-13 00:13:57', '2024-12-13 00:13:57', NULL),
('POST - 2024-122fc12', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming, while exhilarating, can sometimes be frustrating due to its inherent nuances. A misplaced semicolon or a missing parenthesis can halt progress, leaving programmers scratching their heads. The rigid syntax and strict rules, though necessary for logical execution, can feel restrictive. Yet, these very nuances are what make programming a precise and powerful tool. They force us to pay attention to detail, think critically, and ultimately produce elegant and efficient solutions. While these minor irritations are inevitable, they are often outweighed by the satisfaction of conquering a programming challenge.', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-12 14:56:55', '2024-12-12 14:56:55', NULL),
('POST - 2024-123c9ea', 'USER - 2024-08aa9ad', 'ang cute nya', 'she is a cutieee', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-13 00:32:58', '2024-12-13 00:32:58', NULL),
('POST - 2024-1251fa6', 'USER - 2024-08aa9ad', 'booger is the babyyyyyy', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.', 'posted', 'https://storage.googleapis.com/crb-bucket/59bb4020-2d2b-46f2-8e9f-e62b97cd2f28.jpg', 'positive', '2024-12-13 00:28:59', '2024-12-13 00:28:59', NULL),
('POST - 2024-12a43ce', 'USER - 2024-086146e', 'si don ay cutie', 'Programming, despite its potential for innovation and problem-solving, can often feel like a relentless battle against a machine. The endless stream of syntax errors, cryptic error messages, and the constant need to stay updated with ever-evolving technologies can be draining. The pressure to meet deadlines and deliver perfect code can lead to burnout and frustration. Additionally, the lack of human interaction in a solitary coding environment can be isolating. While the rewards of successful programming are undeniable, the journey can be fraught with challenges that can sour one\'s perspective on technology as a whole', 'for_review', '', 'negative', NULL, '2024-12-12 23:55:45', NULL),
('POST - 2024-12ba06a', 'USER - 2024-08aa9ad', 'kamahal mahal ba si yngwie serrano', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.', 'posted', 'https://storage.googleapis.com/crb-bucket/1af2b9f1-5fab-49b5-9e80-2efc4a3aabea.jpg', 'positive', '2024-12-13 00:25:37', '2024-12-13 00:25:37', NULL),
('POST - 2024-12c04f2', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming, despite its potential for innovation and problem-solving, can often feel like a relentless battle against a machine. The endless stream of syntax errors, cryptic error messages, and the constant need to stay updated with ever-evolving technologies can be draining. The pressure to meet deadlines and deliver perfect code can lead to burnout and frustration. Additionally, the lack of human interaction in a solitary coding environment can be isolating. While the rewards of successful programming are undeniable, the journey can be fraught with challenges that can sour one\'s perspective on technology as a whole', 'for_review', '', 'negative', NULL, '2024-12-12 14:57:23', NULL),
('POST - 2024-12d6713', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming is an exhilarating journey into the realm of creativity and problem-solving. It\'s the thrill of crafting intricate solutions from simple lines of code, the satisfaction of witnessing a program spring to life, and the joy of overcoming complex ', 'posted', 'https://storage.googleapis.com/crb-bucket/jigglydon.png', 'positive', '2024-12-12 14:55:36', '2024-12-12 14:55:36', NULL),
('POST - 2024-12e6993', 'USER - 2024-08aa9ad', 'si don ay cutie', 'don looks like snorlax', 'for_review', '', 'negative', NULL, '2024-12-12 14:53:24', NULL);

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
('REJECT - 2024-10aca63', 'POST - 2024-101d6aa', 'negative', 'rejected', '2024-12-10 18:20:36', NULL),
('REJECT - 2024-121db98', 'POST - 2024-12a43ce', 'negative', 'rejected', '2024-12-12 23:55:45', NULL),
('REJECT - 2024-123609a', 'POST - 2024-12c04f2', 'negative', 'rejected', '2024-12-12 14:57:23', NULL),
('REJECT - 2024-12954fa', 'POST - 2024-12e6993', 'negative', 'rejected', '2024-12-12 14:53:24', NULL);

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
  `bio` text NOT NULL,
  `verification_code` int(11) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `verification_expiry` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_tbl`
--

INSERT INTO `user_tbl` (`user_id`, `username`, `first_name`, `last_name`, `email`, `password`, `role`, `bio`, `verification_code`, `verified_at`, `verification_expiry`, `created_at`, `updated_at`) VALUES
('USER - 2024-086146e', 'akosiblek', 'blake', 'laviano', 'reframing_ml@yahoo.com', '202cb962ac59075b964b07152d234b70', 'user', '', 142108, '2024-12-08 15:41:07', 1733660647, '2024-12-08 20:14:07', NULL),
('USER - 2024-08aa9ad', 'akosiblek', 'blake', 'laviano', 'cristianpogi.laviano@gmail.com', '202cb962ac59075b964b07152d234b70', 'user', '', NULL, '2024-12-08 15:41:07', NULL, '2024-12-08 15:02:55', NULL);

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
