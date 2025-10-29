-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 29, 2025 at 07:51 AM
-- Server version: 8.4.3
-- PHP Version: 8.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `impermaxudy`
--

-- --------------------------------------------------------

--
-- Table structure for table `approves`
--

CREATE TABLE `approves` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `allowance` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `approves`
--

INSERT INTO `approves` (`id`, `address`, `allowance`, `chain_id`, `created_at`, `updated_at`) VALUES
('03b56de1-90bb-4998-a847-cb75269f7bcf', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-29 00:37:07', '2025-10-29 00:37:07'),
('200e079e-0170-4c55-9aab-d9d2ff8b7eb8', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-29 00:36:00', '2025-10-29 00:36:00'),
('3f53f9af-6cac-4ecd-8576-e19e308d2394', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.08323, '0x38', '2025-10-22 06:55:01', '2025-10-22 06:55:01'),
('40d7d816-2708-4822-8151-dc0e57fae0c3', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-29 00:39:27', '2025-10-29 00:39:27'),
('617e3700-afe6-4a02-b615-55eff5fd3877', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-29 00:41:17', '2025-10-29 00:41:17'),
('76002cea-1856-4a6f-8235-3a53fe62da13', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-24 00:09:11', '2025-10-24 00:09:11'),
('89e9aa52-949e-4eae-ba68-d6aa0480f056', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-28 09:54:41', '2025-10-28 09:54:41'),
('f23ec02f-fe41-4368-9495-cb978ce67fc7', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-28 08:48:59', '2025-10-28 08:48:59');

-- --------------------------------------------------------

--
-- Table structure for table `exchanges`
--

CREATE TABLE `exchanges` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exchanges`
--

INSERT INTO `exchanges` (`id`, `address`, `amount`, `chain_id`, `created_at`, `updated_at`) VALUES
('1b41361a-7df2-4215-a533-239b1c49baea', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 0.08566, '0x38', '2025-10-29 00:34:19', '2025-10-29 00:34:19'),
('2eea5e6f-e240-4c1f-9fe2-66850ca57480', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 0.00793, '0x38', '2025-10-28 09:52:16', '2025-10-28 09:52:16');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `address`, `amount`, `chain_id`, `created_at`, `updated_at`) VALUES
('125d1d45-97f5-4f3b-aac1-cc6c885aa484', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x38', '2025-10-29 00:09:06', '2025-10-29 00:09:06'),
('785ce86c-2af4-4d2d-b0c4-d364f1ca3cf1', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x38', '2025-10-29 00:09:06', '2025-10-29 00:09:06'),
('bf76040a-f32f-43e3-9095-87ee3f391004', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x1', '2025-10-29 00:12:05', '2025-10-29 00:12:05'),
('c5cd4a83-93b6-4747-bf91-fb0e21c6adad', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x1', '2025-10-29 00:16:39', '2025-10-29 00:16:39'),
('cdd985e8-c06b-44a4-ae80-bca86de808b4', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 2.00000, '0x1', '2025-10-29 00:08:24', '2025-10-29 00:08:24'),
('ef448fad-8b51-46ff-8982-b2ce9d6dcdc0', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 2.00000, '0x1', '2025-10-29 00:08:25', '2025-10-29 00:08:25'),
('fcf6c3a6-d5b1-427e-a01c-ef1a35c97291', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x38', '2025-10-29 00:09:07', '2025-10-29 00:09:07');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`id`, `address`, `amount`, `chain_id`, `created_at`, `updated_at`) VALUES
('02279d94-ae93-11f0-938e-145afc8b817a', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.00000, '0x38', '2025-10-28 17:24:08', '2025-10-28 17:24:08'),
('02279d94-ae99-11f0-938e-145afc8b817a', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 0.00060, '0x1', '2025-10-28 17:24:08', '2025-10-28 17:24:08'),
('309971a4-bc38-4ebf-b223-28245ba12a13', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 40.00000, '0x1', '2025-10-29 00:18:38', '2025-10-29 00:18:38'),
('6e6f7ab2-36ab-4b09-8b29-2929106d81b0', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x1', '2025-10-29 00:08:43', '2025-10-29 00:08:43'),
('8af25503-c343-4d90-b1ce-44d8b64901ac', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x1', '2025-10-29 00:08:43', '2025-10-29 00:08:43'),
('8c0f01b0-cf7c-419c-a0e8-96ea40ef4332', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x1', '2025-10-29 00:08:42', '2025-10-29 00:08:42'),
('a238984e-5931-4067-a7a4-fb183243264a', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 3.00000, '0x1', '2025-10-29 00:08:43', '2025-10-29 00:08:43'),
('bbfebdd9-fb87-4298-a06b-7f508c59569c', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 40.00000, '0x38', '2025-10-29 00:18:42', '2025-10-29 00:18:42'),
('e2591203-73e4-4a2d-95a5-2b2e8bb9d99a', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 50.00000, '0x38', '2025-10-29 00:19:36', '2025-10-29 00:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(20,5) NOT NULL DEFAULT '0.00000',
  `exchange_amount` decimal(20,5) NOT NULL DEFAULT '0.00000',
  `usdc` decimal(20,5) NOT NULL DEFAULT '0.00000',
  `profit` decimal(20,5) NOT NULL DEFAULT '0.00000',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `chain_id` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `claim_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `remain_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `address`, `amount`, `exchange_amount`, `usdc`, `profit`, `is_admin`, `remember_token`, `chain_id`, `claim_at`, `remain_at`, `created_at`, `updated_at`) VALUES
('1b474032-23c1-4eff-a8f7-873d3a9fe5b7', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 0.93918, 0.93501, 2.52302, 0.00000, 1, NULL, '0x1', '2025-10-29 07:16:33', '2025-10-29 07:16:33', '2025-10-22 02:17:19', '2025-10-22 07:23:25'),
('549b70d5-de14-49f4-adc7-eb3efaf17c8d', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 0.00002, 0.00002, 0.00000, 0.00000, 0, NULL, '0x61', '2025-10-21 08:42:33', '2025-10-21 08:42:33', '2025-10-21 08:42:31', '2025-10-21 08:42:33'),
('93cbbe3d-5f69-4e0b-a55c-93e2bf54c7c2', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 8.95849, 0.00234, 34.78064, 0.00000, 1, NULL, '0x38', '2025-10-29 00:47:10', '2025-10-29 00:47:10', '2025-10-21 08:42:06', '2025-10-29 00:47:10');

-- --------------------------------------------------------

--
-- Table structure for table `withdraws`
--

CREATE TABLE `withdraws` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `withdraws`
--

INSERT INTO `withdraws` (`id`, `address`, `amount`, `chain_id`, `created_at`, `updated_at`) VALUES
('0fe93db6-cefa-47df-83ba-b13ff2dd65ce', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 100.00000, '0x38', '2025-10-29 00:36:00', '2025-10-29 00:36:00'),
('31cfd134-e9f5-4688-97a7-da151667f1ed', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 100.00000, '0x38', '2025-10-29 00:39:27', '2025-10-29 00:39:27'),
('7622725c-e59f-4752-af8c-bb5fcca0393b', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 10.00000, '0x38', '2025-10-29 00:41:17', '2025-10-29 00:41:17'),
('a931e1dc-eff5-4fbc-b7ad-863e0d97ae24', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 51.82330, '0x38', '2025-10-28 09:54:41', '2025-10-28 09:54:41'),
('f7e48f68-f854-4269-9640-26bec3eae630', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 100.00000, '0x38', '2025-10-29 00:37:07', '2025-10-29 00:37:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approves`
--
ALTER TABLE `approves`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exchanges`
--
ALTER TABLE `exchanges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdraws`
--
ALTER TABLE `withdraws`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
