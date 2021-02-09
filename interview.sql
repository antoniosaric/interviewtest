-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2021 at 05:43 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interview`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_location`
--

CREATE TABLE `customer_location` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer_location`
--

INSERT INTO `customer_location` (`Id`, `Name`, `Address`, `Contact`) VALUES
(1, 'Cust A', 'C Address A', 'C Contact A'),
(2, 'Cust B', 'C Address B', 'C Contact B'),
(3, 'Cust C', 'C Address C', 'C Contact C'),
(4, 'Cust D', 'C Address D', 'C Contact D'),
(5, 'Cust E', 'C Address E', 'C Contact E');

-- --------------------------------------------------------

--
-- Table structure for table `distributor_location`
--

CREATE TABLE `distributor_location` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `distributor_location`
--

INSERT INTO `distributor_location` (`Id`, `Name`, `Address`, `Contact`) VALUES
(1, 'Dist A', 'D Address A', 'Cust A'),
(2, 'Dist B', 'D Address B', 'Cust B'),
(3, 'Dist C', 'D Address C', 'Cust C'),
(4, 'Dist D', 'D Address D', 'Cust D'),
(5, 'Dist E', 'D Address E', 'Cust E');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `Id` int(11) NOT NULL,
  `InvoiceNumber` int(11) NOT NULL,
  `PurchaseDate` date NOT NULL DEFAULT current_timestamp(),
  `TotalPurchases` int(11) NOT NULL,
  `CustomerLocationId` int(11) NOT NULL,
  `DistributorLocationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`Id`, `InvoiceNumber`, `PurchaseDate`, `TotalPurchases`, `CustomerLocationId`, `DistributorLocationId`) VALUES
(1, 1111, '2020-10-22', 3, 1, 1),
(2, 1112, '2020-10-24', 2, 2, 2),
(3, 1113, '2020-10-26', 3, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_line`
--

CREATE TABLE `invoice_line` (
  `Id` int(11) NOT NULL,
  `Qty` int(11) NOT NULL,
  `Weight` int(11) NOT NULL,
  `UnitOfMeasure` varchar(255) NOT NULL,
  `UnitPrice` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `InvoiceId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `invoice_line`
--

INSERT INTO `invoice_line` (`Id`, `Qty`, `Weight`, `UnitOfMeasure`, `UnitPrice`, `ProductId`, `InvoiceId`) VALUES
(1, 5, 50, 'CASE', 7, 1, 1),
(2, 10, 20, 'CASE', 5, 2, 1),
(3, 0, 40, 'WEIGHT', 3, 3, 1),
(4, 10, 100, 'CASE', 7, 1, 2),
(5, 0, 30, 'WEIGHT', 3, 5, 2),
(6, 12, 100, 'CASE', 9, 6, 3),
(7, 0, 25, 'WEIGHT', 3, 5, 3),
(8, 7, 70, 'CASE', 10, 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Contact` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`Id`, `Name`, `Address`, `Contact`) VALUES
(1, 'Manuf A', 'M Address A', 'M Contact A'),
(2, 'Manuf B', 'M Address B', 'M Contact B'),
(3, 'Manuf C', 'M Address C', 'M Contact C'),
(4, 'Manuf D', 'M Address D', 'M Contact D'),
(5, 'Manuf E', 'M Address E', 'M Contact E');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `Description` text NOT NULL,
  `ProductCode` int(11) NOT NULL,
  `DistributorLocationId` int(11) NOT NULL,
  `ManufacturerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `Description`, `ProductCode`, `DistributorLocationId`, `ManufacturerId`) VALUES
(1, 'Almonds', 123, 1, 1),
(2, 'Eggs', 125, 1, 2),
(3, 'Russet Potatoes', 125, 1, 3),
(4, 'Almonds', 123, 2, 1),
(5, 'Onions', 127, 2, 4),
(6, 'Ketchup', 124, 3, 1),
(7, 'Onions', 127, 3, 4),
(8, 'Mayonnaisse', 128, 3, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_location`
--
ALTER TABLE `customer_location`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `distributor_location`
--
ALTER TABLE `distributor_location`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CustomerLocationId` (`CustomerLocationId`),
  ADD KEY `DistributorLocationId` (`DistributorLocationId`);

--
-- Indexes for table `invoice_line`
--
ALTER TABLE `invoice_line`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `InvoiceId` (`InvoiceId`),
  ADD KEY `ProductId` (`ProductId`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ManufacturerId` (`ManufacturerId`),
  ADD KEY `DistributorLocationId` (`DistributorLocationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_location`
--
ALTER TABLE `customer_location`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `distributor_location`
--
ALTER TABLE `distributor_location`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `invoice_line`
--
ALTER TABLE `invoice_line`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`CustomerLocationId`) REFERENCES `customer_location` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `invoices_ibfk_2` FOREIGN KEY (`DistributorLocationId`) REFERENCES `distributor_location` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `invoice_line`
--
ALTER TABLE `invoice_line`
  ADD CONSTRAINT `invoice_line_ibfk_1` FOREIGN KEY (`InvoiceId`) REFERENCES `invoices` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `invoice_line_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `product` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`ManufacturerId`) REFERENCES `manufacturer` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`DistributorLocationId`) REFERENCES `distributor_location` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
