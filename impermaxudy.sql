-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th10 23, 2025 lúc 04:01 PM
-- Phiên bản máy phục vụ: 10.6.20-MariaDB-cll-lve-log
-- Phiên bản PHP: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `xomdoxythosting_impermaxudy`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `approves`
--

CREATE TABLE `approves` (
  `id` char(36) NOT NULL,
  `address` varchar(255) NOT NULL,
  `allowance` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `approves`
--

INSERT INTO `approves` (`id`, `address`, `allowance`, `chain_id`, `created_at`, `updated_at`) VALUES
('3f53f9af-6cac-4ecd-8576-e19e308d2394', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.08323, '0x38', '2025-10-22 06:55:01', '2025-10-22 06:55:01'),
('491b83da-1ca6-4870-8057-7578d4ec0788', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.06718, '0x38', '2025-10-23 05:39:27', '2025-10-23 05:39:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `histories`
--

CREATE TABLE `histories` (
  `id` char(36) NOT NULL,
  `address` varchar(255) NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `histories`
--

INSERT INTO `histories` (`id`, `address`, `amount`, `chain_id`, `created_at`, `updated_at`) VALUES
('02279d94-ae99-11f0-938e-145afc8b417b', '0x8DD6df4849eD1197aD15606222d6Cc7E68423247', 1.00000, '0x1', '2025-10-21 16:14:23', '2025-10-21 16:14:23'),
('02279d94-ae99-11f0-938e-145afc8b817b', '0x8DD6df4849eD1197aD15606222d6Cc7E68423247', 1.00000, '0x38', '2025-10-23 05:22:07', '2025-10-23 05:22:07'),
('02279d94-ae99-11f0-938e-145afc9b217a', '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888', 10.00000, '0x1', '2025-10-23 05:18:12', '2025-10-23 05:18:12'),
('02279d94-ae99-11f0-938e-145afc9b817a', '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888', 2.00000, '0x38', '2025-10-23 05:18:12', '2025-10-23 05:18:12');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rewards`
--

CREATE TABLE `rewards` (
  `id` char(36) NOT NULL,
  `address` varchar(255) NOT NULL,
  `amount` decimal(20,5) NOT NULL,
  `chain_id` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `rewards`
--

INSERT INTO `rewards` (`id`, `address`, `amount`, `chain_id`, `created_at`, `updated_at`) VALUES
('02279d94-ae99-11f0-938e-145afc8b817a', '0x535b7A99CAF6F73697E69bEcb437B6Ba4b788888', 0.00060, '0x1', '2025-10-21 16:26:32', '2025-10-21 16:26:32');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `address` varchar(255) NOT NULL,
  `amount` decimal(20,5) NOT NULL DEFAULT 0.00000,
  `exchange_amount` decimal(20,5) NOT NULL DEFAULT 0.00000,
  `usdc` decimal(20,5) NOT NULL DEFAULT 0.00000,
  `profit` decimal(20,5) NOT NULL DEFAULT 0.00000,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `abc` varchar(10) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `chain_id` varchar(10) NOT NULL,
  `claim_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `remain_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `address`, `amount`, `exchange_amount`, `usdc`, `profit`, `is_admin`, `abc`, `remember_token`, `chain_id`, `claim_at`, `remain_at`, `created_at`, `updated_at`) VALUES
('1b474032-23c1-4eff-a8f7-873d3a9fe5b7', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 1.40640, 0.10543, 4988.29682, 0.00000, 0, NULL, NULL, '0x1', '2025-10-23 07:59:05', '2025-10-23 07:59:05', '2025-10-22 02:17:19', '2025-10-23 07:59:05'),
('30d8e614-ab74-48e5-bd4c-fc2f5ec6e07d', '0x8dd6df4849ed1197ad15606222d6cc7e68423247', 0.18854, 0.01189, 678.19128, 0.00000, 0, NULL, NULL, '0x1', '2025-10-22 23:27:43', '2025-10-22 23:27:43', '2025-10-22 07:57:53', '2025-10-22 23:27:43'),
('549b70d5-de14-49f4-adc7-eb3efaf17c8d', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 0.00002, 0.00002, 0.00000, 0.00000, 0, '', NULL, '0x61', '2025-10-21 08:42:33', '2025-10-21 08:42:33', '2025-10-21 08:42:31', '2025-10-21 08:42:33'),
('93cbbe3d-5f69-4e0b-a55c-93e2bf54c7c2', '0x535b7a99caf6f73697e69becb437b6ba4b788888', 7.77079, 0.03878, 325.42957, 0.00000, 0, '', NULL, '0x38', '2025-10-23 09:01:37', '2025-10-23 09:01:37', '2025-10-21 08:42:06', '2025-10-23 09:01:37'),
('b83cc5f8-799e-4738-b780-66dae381339a', '0x8dd6df4849ed1197ad15606222d6cc7e68423247', 0.00000, 0.00000, 0.00000, 0.00000, 0, NULL, NULL, '0x38', '2025-10-22 22:44:06', '2025-10-22 22:44:06', '2025-10-22 22:44:06', '2025-10-22 22:44:06');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `approves`
--
ALTER TABLE `approves`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Chỉ mục cho bảng `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
