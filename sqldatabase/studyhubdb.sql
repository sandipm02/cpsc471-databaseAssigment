CREATE DATABASE  IF NOT EXISTS `studyhubdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `studyhubdb`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: studyhubdb
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `Id` int NOT NULL,
  `City` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL,
  `Stateprovince` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Calgary','Canada','Alberta'),(2,'Toronto','Canada','Ontario'),(3,'Vancouver','Canada','BC'),(4,'Edmonton','Canada','Alberta');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qualification` (
  `Username` varchar(255) NOT NULL,
  `Major` varchar(255) DEFAULT NULL,
  `Graddate` varchar(255) DEFAULT NULL,
  `Gpa` int DEFAULT NULL,
  `Accreditation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Username`),
  CONSTRAINT `qualification_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qualification`
--

LOCK TABLES `qualification` WRITE;
/*!40000 ALTER TABLE `qualification` DISABLE KEYS */;
INSERT INTO `qualification` VALUES ('jeff2','Art','2021-11-30',2,'Bachelors Degree'),('jim08','Computer Science','2021-12-17',4,'Master Degree'),('lastguy2','Engineering','2021-12-17',3,'Master Degree'),('new2','Education','2021-12-23',NULL,'Bachelors Degree'),('teacher21','Bio','2021-12-17',2,'Master Degree');
/*!40000 ALTER TABLE `qualification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `T_username` varchar(255) NOT NULL,
  `S_username` varchar(255) NOT NULL,
  `Stars` int NOT NULL,
  PRIMARY KEY (`T_username`,`S_username`),
  KEY `S_username` (`S_username`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`T_username`) REFERENCES `user` (`Username`),
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`S_username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES ('jeff2','student1',3),('jeff2','student2',1);
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `Username` varchar(255) NOT NULL,
  `Subjectname` varchar(255) NOT NULL,
  PRIMARY KEY (`Username`,`Subjectname`),
  CONSTRAINT `subject_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES ('jeff2','Mathematics'),('jim08','Mathematics'),('jim08','Social Studies'),('lastguy2','Biology'),('new2','Business'),('teacher21','Biology');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timeslot`
--

DROP TABLE IF EXISTS `timeslot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslot` (
  `Sessionid` int NOT NULL AUTO_INCREMENT,
  `T_username` varchar(255) NOT NULL,
  `S_username` varchar(255) NOT NULL,
  `User_date` date NOT NULL,
  `Time_start` int NOT NULL,
  `Time_end` int NOT NULL,
  `IsApproved` tinyint NOT NULL,
  PRIMARY KEY (`Sessionid`,`T_username`,`S_username`),
  KEY `T_username` (`T_username`),
  KEY `S_username` (`S_username`),
  CONSTRAINT `timeslot_ibfk_1` FOREIGN KEY (`T_username`) REFERENCES `user` (`Username`),
  CONSTRAINT `timeslot_ibfk_2` FOREIGN KEY (`S_username`) REFERENCES `user` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timeslot`
--

LOCK TABLES `timeslot` WRITE;
/*!40000 ALTER TABLE `timeslot` DISABLE KEYS */;
INSERT INTO `timeslot` VALUES (1,'jeff2','student1','2000-10-02',200,300,1),(2,'jim08','student3','2022-01-02',400,600,0),(3,'jeff2','student3','2022-01-20',600,720,1),(4,'jim08','student1','2021-12-24',800,860,1),(5,'jeff2','student2','2021-12-26',400,460,0);
/*!40000 ALTER TABLE `timeslot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Username` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Pword` varchar(255) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) NOT NULL,
  `Usertype` varchar(255) NOT NULL,
  `Locationid` int NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('jeff2','jeff@gmail.com','password','Jeff','Guy','Tutor',3),('jim08','j@gmail.com','password','Jim','Browning','Tutor',2),('lastguy2','last@gmail.com','password','Chris','Robert','Tutor',1),('new2','n@gmail.com','password','newTutor','newguy','Tutor',4),('student1','student1@gmail.com','password','Andy','Anderson','Student',1),('student2','student2@gmaiil.com','password','Jesper','Tjader','Student',1),('student3','s3@gmail.com','password','Zach','Doelling','Student',2),('teacher21','teachallday@gmail.com','password','Allan','Shoe','Tutor',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-18 15:03:25
