-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2025 at 02:46 AM
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
('BOOKMARK- 2025-047a684', 'POST - 2024-1042b28', 'USER - 2024-08aa9ad', '2025-01-04 19:49:37'),
('BOOKMARK- 2025-04f11c2', 'POST - 2024-1251fa6', 'USER - 2024-08aa9ad', '2025-01-04 20:56:56'),
('BOOKMARK- 2025-04f2ebc', 'POST - 2025-042423e', 'USER - 2024-08aa9ad', '2025-01-04 19:49:48'),
('BOOKMARK- 2025-05329cc', 'POST - 2025-0527540', 'USER - 2024-08aa9ad', '2025-01-05 20:10:53'),
('BOOKMARK- 2025-05befa9', 'POST - 2025-059cef1', 'USER - 2024-08aa9ad', '2025-01-05 20:10:39'),
('BOOKMARK- 2025-0987238', 'POST - 2025-05a6e94', 'USER - 2024-08aa9ad', '2025-01-09 19:27:44'),
('BOOKMARK- 2025-1639ea5', 'POST - 2025-121a3bd', 'USER - 2024-08aa9ad', '2025-01-16 15:49:11'),
('BOOKMARK- 2025-18cf892', 'POST - 2025-17ed55f', 'USER - 2025-18ce3fd', '2025-01-19 05:56:57'),
('BOOKMARK- 2025-1905458', 'POST - 2024-09d619e', 'USER - 2024-08aa9ad', '2025-01-19 13:24:08');

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
('COMMENT- 2025-166b30f', 'POST - 2024-09d619e', 'USER - 2024-08aa9ad', 'test comment', '2025-01-16 20:12:50', NULL),
('COMMENT- 2025-1731cc3', 'POST - 2025-1706999', 'USER - 2025-1790624', 'pwetan mo ko', '2025-01-18 01:38:43', NULL),
('COMMENT- 2025-1752119', 'POST - 2025-1706999', 'USER - 2025-1790624', 'putukan mo ko sa pwet', '2025-01-18 01:38:28', NULL),
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
('GP - 2024-12c9282', 'POST - 2024-1251fa6', '5', '5'),
('GP - 2025-040de0d', 'POST - 2025-04edff4', '1', '2'),
('GP - 2025-04381e7', 'POST - 2025-042423e', '1', '2'),
('GP - 2025-056fcda', 'POST - 2025-05a6e94', '1', '1'),
('GP - 2025-056fed0', 'POST - 2025-05a6e94', '11', '1'),
('GP - 2025-05be704', 'POST - 2025-059cef1', '1', '1'),
('GP - 2025-05e01ef', 'POST - 2025-0527540', '1', '1'),
('GP - 2025-05e0651', 'POST - 2025-0527540', '11', '1'),
('GP - 2025-072ac82', 'POST - 2025-075db57', '1', '2'),
('GP - 2025-073891c', 'POST - 2025-077d013', '3', '2'),
('GP - 2025-0738cbe', 'POST - 2025-077d013', '7', '2'),
('GP - 2025-074d5d2', 'POST - 2025-07ba8b6', '1', '2'),
('GP - 2025-074e278', 'POST - 2025-07ba8b6', '10', '2'),
('GP - 2025-0753b7b', 'POST - 2025-07c099b', '12', '1'),
('GP - 2025-0753e6d', 'POST - 2025-07c099b', '4', '1'),
('GP - 2025-0754327', 'POST - 2025-07c099b', '1', '1'),
('GP - 2025-09b5fb3', 'POST - 2025-099c4be', '11', '1'),
('GP - 2025-1214c20', 'POST - 2025-12195c4', '1', '1'),
('GP - 2025-1216d66', 'POST - 2025-12195c4', '2', '1'),
('GP - 2025-1220286', 'POST - 2025-1289677', '1', '1'),
('GP - 2025-12203ed', 'POST - 2025-1289677', '2', '1'),
('GP - 2025-12bd439', 'POST - 2025-121a3bd', '1', '1'),
('GP - 2025-12bd745', 'POST - 2025-121a3bd', '2', '1'),
('GP - 2025-170b68e', 'POST - 2025-1756b85', '11', '1'),
('GP - 2025-170b87c', 'POST - 2025-1700d0b', '11', '2'),
('GP - 2025-1729a27', 'POST - 2025-175bb4b', '5', '1'),
('GP - 2025-175f39e', 'POST - 2025-1750598', '1', '1'),
('GP - 2025-175fea7', 'POST - 2025-179e87e', '11', '1'),
('GP - 2025-1777918', 'POST - 2025-177fa62', '11', '1'),
('GP - 2025-1778139', 'POST - 2025-17b4d2e', '11', '1'),
('GP - 2025-179665a', 'POST - 2025-17e5b12', '10', '3'),
('GP - 2025-179f785', 'POST - 2025-17ed55f', '10', '2'),
('GP - 2025-17c10cd', 'POST - 2025-172306f', '2', '2'),
('GP - 2025-17d0ee6', 'POST - 2025-17296fa', '11', '2'),
('GP - 2025-17d97e4', 'POST - 2025-1722444', '11', '1'),
('GP - 2025-17d98e1', 'POST - 2025-1722444', '12', '1'),
('GP - 2025-17e2616', 'POST - 2025-1755081', '10', '2'),
('GP - 2025-17e6482', 'POST - 2025-172c013', '11', '3'),
('GP - 2025-17ef7ec', 'POST - 2025-17ee870', '11', '1'),
('GP - 2025-17f4156', 'POST - 2025-1706999', '10', '2'),
('GP - 2025-196b682', 'POST - 2025-1993366', '11', '3'),
('GP - 2025-196b885', 'POST - 2025-1993366', '10', '3'),
('GP - 2025-19b9266', 'POST - 2025-19294f6', '1', '5'),
('GP - 2025-19b931a', 'POST - 2025-19294f6', '10', '5'),
('GP - 2025-19b93e1', 'POST - 2025-19294f6', '11', '5'),
('GP - 2025-19bcb5d', 'POST - 2025-199624d', '1', '2'),
('test_id1', 'POST - 2024-09d619e', '1', '2'),
('test_id2', 'POST - 2024-09d619e', '5', '2');

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
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts_tbl`
--

INSERT INTO `posts_tbl` (`post_id`, `user_id`, `title`, `content`, `status`, `image`, `analysis_score`, `published_at`, `created_at`, `updated_at`) VALUES
('POST - 2024-09d58ca', 'USER - 2024-086146e', 'the buhay of yngwie serrano', 'we all hated yngwie serrano', 'for_review', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'negative', NULL, '2024-12-09 18:43:24', '0000-00-00 00:00:00'),
('POST - 2024-09d619e', 'USER - 2024-086146e', 'birds of a feather', 'we all cared for yngwie serrano. we all cared for yngwie serrano. we all miss him so much. we wish that he comes back someday so we can all be together again!', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'positive', '2024-12-09 18:44:01', '2024-12-09 18:44:01', '2025-01-07 20:43:57'),
('POST - 2024-10103a2', 'USER - 2024-08aa9ad', 'the paa of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-10 17:35:06', '2024-12-10 17:35:06', '0000-00-00 00:00:00'),
('POST - 2024-101d6aa', 'USER - 2024-08aa9ad', 'the ass of yngwie serrano', 'we all hated yngwie serrano', 'for_review', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'negative', NULL, '2024-12-10 18:20:36', '0000-00-00 00:00:00'),
('POST - 2024-1042b28', 'USER - 2024-08aa9ad', 'the betlog of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-10 17:39:02', '2024-12-10 17:39:02', '0000-00-00 00:00:00'),
('POST - 2024-104d4d2', 'USER - 2024-08aa9ad', 'the pussy of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-10 15:58:16', '2024-12-10 15:58:16', '0000-00-00 00:00:00'),
('POST - 2024-1073e84', 'USER - 2024-08aa9ad', 'the hairline of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-10 17:38:51', '2024-12-10 17:38:51', '0000-00-00 00:00:00'),
('POST - 2024-10f380e', 'USER - 2024-08aa9ad', 'the death of yngwie serrano', 'we all loved yngwie serrano', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-10 17:33:09', '2024-12-10 17:33:09', '0000-00-00 00:00:00'),
('POST - 2024-121f26e', 'USER - 2024-08aa9ad', 'mahal ni carl si yngwie serrano', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.\n', 'posted', 'https://storage.googleapis.com/crb-bucket/464084995_530158416467706_535068514797436265_n.jpg', 'positive', '2024-12-13 00:21:38', '2024-12-13 00:21:38', '2025-01-06 00:46:56'),
('POST - 2024-1220a34', 'USER - 2024-08aa9ad', 'mahal ni carl si yngwie serrano', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.', 'posted', 'https://storage.googleapis.com/crb-bucket/219bd546715da50f37dce476c0c391b9.png', 'positive', '2024-12-13 00:13:57', '2024-12-13 00:13:57', NULL),
('POST - 2024-122fc12', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming, while exhilarating, can sometimes be frustrating due to its inherent nuances. A misplaced semicolon or a missing parenthesis can halt progress, leaving programmers scratching their heads. The rigid syntax and strict rules, though necessary for logical execution, can feel restrictive. Yet, these very nuances are what make programming a precise and powerful tool. They force us to pay attention to detail, think critically, and ultimately produce elegant and efficient solutions. While these minor irritations are inevitable, they are often outweighed by the satisfaction of conquering a programming challenge.', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-12 14:56:55', '2024-12-12 14:56:55', NULL),
('POST - 2024-123c9ea', 'USER - 2024-08aa9ad', 'ang cute nya', 'she is a cutieee', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-13 00:32:58', '2024-12-13 00:32:58', NULL),
('POST - 2024-1251fa6', 'USER - 2024-08aa9ad', 'booger is the babyyyyyy', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.', 'posted', 'https://storage.googleapis.com/crb-bucket/59bb4020-2d2b-46f2-8e9f-e62b97cd2f28.jpg', 'positive', '2024-12-13 00:28:59', '2024-12-13 00:28:59', NULL),
('POST - 2024-12a43ce', 'USER - 2024-086146e', 'si don ay cutie', 'Programming, despite its potential for innovation and problem-solving, can often feel like a relentless battle against a machine. The endless stream of syntax errors, cryptic error messages, and the constant need to stay updated with ever-evolving technologies can be draining. The pressure to meet deadlines and deliver perfect code can lead to burnout and frustration. Additionally, the lack of human interaction in a solitary coding environment can be isolating. While the rewards of successful programming are undeniable, the journey can be fraught with challenges that can sour one\'s perspective on technology as a whole', 'for_review', '', 'negative', NULL, '2024-12-12 23:55:45', NULL),
('POST - 2024-12ba06a', 'USER - 2024-08aa9ad', 'kamahal mahal ba si yngwie serrano', 'yngwie loves carl  very very much. They could never be separated by anyone. Why is that the case? we don\'t know. The only thing we know is that we all love how happy they are with their lives.', 'posted', 'https://storage.googleapis.com/crb-bucket/1af2b9f1-5fab-49b5-9e80-2efc4a3aabea.jpg', 'positive', '2024-12-13 00:25:37', '2024-12-13 00:25:37', NULL),
('POST - 2024-12c04f2', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming, despite its potential for innovation and problem-solving, can often feel like a relentless battle against a machine. The endless stream of syntax errors, cryptic error messages, and the constant need to stay updated with ever-evolving technologies can be draining. The pressure to meet deadlines and deliver perfect code can lead to burnout and frustration. Additionally, the lack of human interaction in a solitary coding environment can be isolating. While the rewards of successful programming are undeniable, the journey can be fraught with challenges that can sour one\'s perspective on technology as a whole', 'for_review', '', 'negative', NULL, '2024-12-12 14:57:23', NULL),
('POST - 2024-12d6713', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming is an exhilarating journey into the realm of creativity and problem-solving. It\'s the thrill of crafting intricate solutions from simple lines of code, the satisfaction of witnessing a program spring to life, and the joy of overcoming complex ', 'posted', 'https://storage.googleapis.com/crb-bucket/dababy.jpg', 'positive', '2024-12-12 14:55:36', '2024-12-12 14:55:36', NULL),
('POST - 2024-12e6993', 'USER - 2024-08aa9ad', 'si don ay cutie', 'don looks like snorlax', 'for_review', '', 'negative', NULL, '2024-12-12 14:53:24', NULL),
('POST - 2025-042423e', 'USER - 2024-08aa9ad', 'elmer tite', 'elmer is a beautiful kind of person', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'positive', '2025-01-04 17:34:26', '2025-01-04 17:34:26', NULL),
('POST - 2025-04edff4', 'USER - 2024-08aa9ad', 'elmer pakyu ka', 'elmer is not a great person. we hate elmer', 'for_review', '', 'negative', NULL, '2025-01-04 17:47:26', NULL),
('POST - 2025-0527540', 'USER - 2024-08aa9ad', 'hello', 'yngwie serrano is very nice', 'posted', 'https://storage.googleapis.com/crb-bucket/boy.jpg', 'positive', '2025-01-05 15:40:52', '2025-01-05 15:40:52', NULL),
('POST - 2025-059cef1', 'USER - 2024-08aa9ad', 'hello', 'yngwie serrano is very nice', 'posted', 'https://storage.googleapis.com/crb-bucket/boy.jpg', 'positive', '2025-01-05 15:39:23', '2025-01-05 15:39:23', NULL),
('POST - 2025-05a6e94', 'USER - 2024-08aa9ad', 'i like food', 'carl falcon is a good person. where could he be now. we all miss him so much. he was a great inspiration to all of us', 'posted', 'https://storage.googleapis.com/crb-bucket/471681653_2315850812113669_5425843380743772554_n.png', 'positive', '2025-01-05 20:20:35', '2025-01-05 20:20:35', NULL),
('POST - 2025-075db57', 'USER - 2024-08aa9ad', 'bobo ka ba loraine', 'loraine is not a bad person', 'posted', 'https://storage.googleapis.com/crb-bucket/472290797_529002196829003_3809922207646469742_n.jpg', 'neutral', '2025-01-07 19:21:51', '2025-01-07 19:21:51', NULL),
('POST - 2025-077d013', 'USER - 2024-08aa9ad', 'tanginamo elmer bano', 'how was life in the 1980\'s?', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'neutral', '2025-01-07 19:26:36', '2025-01-07 19:26:36', NULL),
('POST - 2025-077f9bb', 'USER - 2024-08aa9ad', 'asasasasa', 'what was life like back then? ', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'neutral', '2025-01-07 19:37:24', '2025-01-07 19:37:24', NULL),
('POST - 2025-079fb72', 'USER - 2024-08aa9ad', 'bano ka ba elmer alino', 'how was life in the 1980\'s', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'neutral', '2025-01-07 19:28:01', '2025-01-07 19:28:01', NULL),
('POST - 2025-07ba8b6', 'USER - 2024-08aa9ad', 'asdasdasdasd', 'how was life in the 1980\'s?', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'neutral', '2025-01-07 19:31:12', '2025-01-07 19:31:12', NULL),
('POST - 2025-07c099b', 'USER - 2024-08aa9ad', 'asdasdasd', 'was life better back then in the 1900\'s?', 'posted', 'https://storage.googleapis.com/crb-bucket/db9d9808-45df-436d-94ea-9b16ddb8796c.jpg', 'neutral', '2025-01-07 19:34:59', '2025-01-07 19:34:59', NULL),
('POST - 2025-099c4be', 'USER - 2024-08aa9ad', 'hello how are you', 'how great would it be if the weather today was sunny', 'posted', 'https://storage.googleapis.com/crb-bucket/471681653_2315850812113669_5425843380743772554_n.png', 'positive', '2025-01-09 19:20:10', '2025-01-09 19:20:10', NULL),
('POST - 2025-12195c4', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming, despite its potential for innovation and problem-solving, can often feel like a relentless battle against a machine. The endless stream of syntax errors, cryptic error messages, and the constant need to stay updated with ever-evolving technologies can be draining. The pressure to meet deadlines and deliver perfect code can lead to burnout and frustration. Additionally, the lack of human interaction in a solitary coding environment can be isolating. While the rewards of successful programming are undeniable, the journey can be fraught with challenges that can sour one\'s perspective on technology as a whole', 'rejected', '', 'negative', NULL, '2025-01-13 00:57:30', NULL),
('POST - 2025-121a3bd', 'USER - 2024-08aa9ad', 'si don ay cutie', 'programming is very fun', 'posted', 'https://storage.googleapis.com/crb-bucket/471681653_2315850812113669_5425843380743772554_n.png', 'positive', '2025-01-13 01:01:23', '2025-01-13 01:01:23', NULL),
('POST - 2025-1289677', 'USER - 2024-08aa9ad', 'si don ay cutie', 'Programming, despite its potential for innovation and problem-solving, can often feel like a relentless battle against a machine. The endless stream of syntax errors, cryptic error messages, and the constant need to stay updated with ever-evolving technologies can be draining. The pressure to meet deadlines and deliver perfect code can lead to burnout and frustration. Additionally, the lack of human interaction in a solitary coding environment can be isolating. While the rewards of successful programming are undeniable, the journey can be fraught with challenges that can sour one\'s perspective on technology as a whole', 'rejected', '', 'negative', NULL, '2025-01-13 00:57:46', NULL),
('POST - 2025-1700d0b', 'USER - 2025-1790624', 'witwat test', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:08:08', '2025-01-18 00:08:08', NULL),
('POST - 2025-1706999', 'USER - 2025-1790624', 'kantotin mo ko yngwie', 'i love living my life', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 01:37:54', '2025-01-18 01:37:54', NULL),
('POST - 2025-1719217', 'USER - 2025-1790624', 'asdasd', 'im doing just fine!', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'neutral', '2025-01-17 21:48:48', '2025-01-17 21:48:48', NULL),
('POST - 2025-1722444', 'USER - 2025-1790624', 'asdasd', 'i am the very best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:51:08', '2025-01-18 00:51:08', NULL),
('POST - 2025-172306f', 'USER - 2025-1790624', 'how did i', 'witness never wronged us!', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'neutral', '2025-01-17 23:27:41', '2025-01-17 23:27:41', NULL),
('POST - 2025-17296fa', 'USER - 2025-1790624', 'wokeness', 'witness awoke at our time of need', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-17 23:25:25', '2025-01-17 23:25:25', NULL),
('POST - 2025-172c013', 'USER - 2025-1790624', 'what did witness do', 'witness never wronged us', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'neutral', '2025-01-17 23:26:31', '2025-01-17 23:26:31', NULL),
('POST - 2025-1750598', 'USER - 2025-1790624', 'witwt', 'i am a good man', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-17 23:31:06', '2025-01-17 23:31:06', NULL),
('POST - 2025-1755081', 'USER - 2025-1790624', 'witness', 'witness is a good man', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-17 23:24:42', '2025-01-17 23:24:42', NULL),
('POST - 2025-1756b85', 'USER - 2024-08aa9ad', 'asdasd', 'i am a great person', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:50:15', '2025-01-18 00:50:15', NULL),
('POST - 2025-175bb4b', 'USER - 2025-1790624', 'witwatss', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:05:47', '2025-01-18 00:05:47', NULL),
('POST - 2025-177fa62', 'USER - 2024-08aa9ad', 'asdasd', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:10:18', '2025-01-18 00:10:18', NULL),
('POST - 2025-179e87e', 'USER - 2024-08aa9ad', 'asdasd', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/471926401_578623785063047_85270400168519337_n.jpg', 'positive', '2025-01-17 23:58:37', '2025-01-17 23:58:37', NULL),
('POST - 2025-17a07ce', 'USER - 2025-1790624', 'witwat', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:05:26', '2025-01-18 00:05:26', NULL),
('POST - 2025-17b4d2e', 'USER - 2024-08aa9ad', 'asdasd', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-17 23:59:37', '2025-01-17 23:59:37', NULL),
('POST - 2025-17e5b12', 'USER - 2025-1790624', 'rarara', 'what a great guy he is!', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-17 23:22:10', '2025-01-17 23:22:10', NULL),
('POST - 2025-17ed55f', 'USER - 2025-1790624', 'asdasdaaa', 'i am a great guy', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-17 23:21:04', '2025-01-17 23:21:04', NULL),
('POST - 2025-17ee870', 'USER - 2024-08aa9ad', 'asdasd', 'witness is the best', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-18 00:18:38', '2025-01-18 00:18:38', NULL),
('POST - 2025-19294f6', 'USER - 2024-08aa9ad', 'carl testing update 1', 'i love carl very much ', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-19 19:55:53', '2025-01-19 19:55:53', '2025-01-19 20:09:49'),
('POST - 2025-1993366', 'USER - 2024-08aa9ad', 'carl testing', 'i love carl very much', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-19 19:55:40', '2025-01-19 19:55:40', NULL),
('POST - 2025-199624d', 'USER - 2024-08aa9ad', 'carl', 'i love carl very much', 'posted', 'https://storage.googleapis.com/crb-bucket/witwiw.png', 'positive', '2025-01-19 19:21:12', '2025-01-19 19:21:12', NULL);

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
  `user_id` varchar(255) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` enum('reported','closed') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports_tbl`
--

INSERT INTO `reports_tbl` (`report_id`, `post_id`, `user_id`, `reason`, `status`, `created_at`, `updated_at`) VALUES
('testReport1', 'POST - 2025-1993366', 'USER - 2024-08aa9ad', 'panget si carl', 'reported', '2025-01-20 02:38:54', NULL),
('testReport2', 'POST - 2025-1755081', 'USER - 2024-08aa9ad', 'panget si yngwie', 'reported', '2025-01-20 02:38:54', NULL);

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
('REJECT - 2024-12954fa', 'POST - 2024-12e6993', 'negative', 'rejected', '2024-12-12 14:53:24', NULL),
('REJECT - 2025-040da4a', 'POST - 2025-04edff4', 'negative', 'rejected', '2025-01-04 17:47:26', NULL),
('REJECT - 2025-121475b', 'POST - 2025-12195c4', 'negative', 'rejected', '2025-01-13 00:57:30', NULL),
('REJECT - 2025-1220128', 'POST - 2025-1289677', 'negative', 'rejected', '2025-01-13 00:57:46', NULL);

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
('USER - 2024-086146e', 'akosiblek', 'blake', 'laviano', 'reframing_ml@yahoo.com', '202cb962ac59075b964b07152d234b70', 'user', '', 142109, '2024-12-08 15:41:07', 1733660647, '2024-12-08 20:14:07', NULL),
('USER - 2024-08aa9ad', 'akosiblek', 'blake', 'laviano', 'cristianpogi.laviano@gmail.com', '202cb962ac59075b964b07152d234b70', 'user', '', NULL, '2024-12-08 15:41:07', NULL, '2024-12-08 15:02:55', NULL),
('USER - 2025-1790624', 'pogi', 'bleky', 'ako', 'cristianlaviano@gmail.com1', '202cb962ac59075b964b07152d234b70', 'user', 'ako ay isang bakal', NULL, '2025-01-17 21:21:02', NULL, '2025-01-17 20:51:52', '2025-01-17 21:24:53'),
('USER - 2025-18ce3fd', 'cristianlaviano@gmail.com', 'blake', 'asdad', 'cristianlaviano@gmail.com', '202cb962ac59075b964b07152d234b70', 'user', '', NULL, '2025-01-18 20:59:06', NULL, '2025-01-18 20:51:21', NULL);

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
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

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
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

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
  ADD CONSTRAINT `reports_tbl_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`),
  ADD CONSTRAINT `reports_tbl_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user_tbl` (`user_id`);

--
-- Constraints for table `review_tbl`
--
ALTER TABLE `review_tbl`
  ADD CONSTRAINT `review_tbl_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts_tbl` (`post_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
