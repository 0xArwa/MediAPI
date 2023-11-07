-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema insight_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema insight_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `insight_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `insight_db` ;

-- -----------------------------------------------------
-- Table `insight_db`.`user_account`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`user_account` (
  `user_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_name`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`admin` (
  `admin_ID` INT NOT NULL AUTO_INCREMENT,
  `phone_number` VARCHAR(50) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `country` VARCHAR(255) NULL DEFAULT NULL,
  `postalCode` VARCHAR(255) NULL DEFAULT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`admin_ID`),
  UNIQUE INDEX `admin_ID_UNIQUE` (`admin_ID` ASC) VISIBLE,
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC) VISIBLE,
  INDEX `user_name_idx` (`user_name` ASC) VISIBLE,
  CONSTRAINT `user_name`
    FOREIGN KEY (`user_name`)
    REFERENCES `insight_db`.`user_account` (`user_name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`physician`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`physician` (
  `doc_ID` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `username_` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`doc_ID`),
  UNIQUE INDEX `doc_ID_UNIQUE` (`doc_ID` ASC) VISIBLE,
  INDEX `user_name_idx` (`username_` ASC) VISIBLE,
  CONSTRAINT `username_`
    FOREIGN KEY (`username_`)
    REFERENCES `insight_db`.`user_account` (`user_name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 220063
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`child`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`child` (
  `patient_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `gender` VARCHAR(1) NOT NULL,
  `birth_date` DATE NOT NULL,
  `docID` INT NOT NULL,
  PRIMARY KEY (`patient_id`),
  INDEX `docID` (`docID` ASC) VISIBLE,
  CONSTRAINT `docID`
    FOREIGN KEY (`docID`)
    REFERENCES `insight_db`.`physician` (`doc_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`treatment_record`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`treatment_record` (
  `record_id` INT NOT NULL AUTO_INCREMENT,
  `diagnosis_date` DATE NOT NULL,
  `doc_managed` INT NOT NULL,
  `patient_id` INT NOT NULL,
  PRIMARY KEY (`record_id`),
  UNIQUE INDEX `patient_id_UNIQUE` (`patient_id` ASC) VISIBLE,
  UNIQUE INDEX `record_id_UNIQUE` (`record_id` ASC) VISIBLE,
  INDEX `doc_ID_idx` (`doc_managed` ASC) VISIBLE,
  INDEX `patient_id_idx` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `treat_doctor_relation`
    FOREIGN KEY (`doc_managed`)
    REFERENCES `insight_db`.`physician` (`doc_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `treat_patient_relation`
    FOREIGN KEY (`patient_id`)
    REFERENCES `insight_db`.`child` (`patient_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`medication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`medication` (
  `record_id` INT NOT NULL,
  `med_name` VARCHAR(60) NOT NULL,
  `start_date` DATE NOT NULL,
  `dosage_amount` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `patient_id_idx` (`record_id` ASC) VISIBLE,
  CONSTRAINT `recored_id`
    FOREIGN KEY (`record_id`)
    REFERENCES `insight_db`.`treatment_record` (`record_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`parents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`parents` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `address` TEXT NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `postalCode` VARCHAR(20) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `patient_id` INT NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC) VISIBLE,
  INDEX `user_name_idx` (`user_name` ASC) VISIBLE,
  INDEX `parents_child_relation` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `parents_child_relation`
    FOREIGN KEY (`patient_id`)
    REFERENCES `insight_db`.`child` (`patient_id`),
  CONSTRAINT `username`
    FOREIGN KEY (`user_name`)
    REFERENCES `insight_db`.`user_account` (`user_name`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`prediction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`prediction` (
  `patient_ID` INT NOT NULL,
  `pred` VARCHAR(45) NULL DEFAULT NULL,
  `pred_date` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`patient_ID`),
  CONSTRAINT `p_id`
    FOREIGN KEY (`patient_ID`)
    REFERENCES `insight_db`.`treatment_record` (`patient_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`questionnaire`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`questionnaire` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `patient_id` INT NOT NULL,
  `full_name` VARCHAR(255) NOT NULL,
  `gender` ENUM('Male', 'Female') NOT NULL DEFAULT 'Male',
  `age` INT NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `q1` INT NOT NULL,
  `q2` INT NOT NULL,
  `q3` INT NOT NULL,
  `q4` INT NOT NULL,
  `q5` INT NOT NULL,
  `q6` INT NOT NULL,
  `q7` INT NOT NULL,
  `q8` INT NOT NULL,
  `q9` INT NOT NULL,
  `q10` INT NOT NULL,
  `q11` INT NOT NULL,
  `q12` INT NOT NULL,
  `q13` INT NOT NULL,
  `q14` INT NOT NULL,
  `q15` INT NOT NULL,
  `q16` INT NOT NULL,
  `q17` INT NOT NULL,
  `q18` INT NOT NULL,
  `q19` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `questionnaire_child_relation` (`patient_id` ASC) VISIBLE,
  CONSTRAINT `questionnaire_child_relation`
    FOREIGN KEY (`patient_id`)
    REFERENCES `insight_db`.`child` (`patient_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `insight_db`.`report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`report` (
  `report_id` INT NOT NULL AUTO_INCREMENT,
  `issue_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `report_content` TEXT NOT NULL,
  `objectiveFindings` TEXT NULL DEFAULT NULL,
  `patient_name` VARCHAR(60) NOT NULL,
  `doc_notes` TEXT NOT NULL,
  `patient_id` INT NOT NULL,
  `doc_id` INT NOT NULL,
  PRIMARY KEY (`report_id`),
  UNIQUE INDEX `report_id_UNIQUE` (`report_id` ASC) VISIBLE,
  INDEX `patient_id_idx` (`patient_id` ASC) VISIBLE,
  INDEX `doc_ID_idx` (`doc_id` ASC) VISIBLE,
  CONSTRAINT `docID_report_relation`
    FOREIGN KEY (`doc_id`)
    REFERENCES `insight_db`.`physician` (`doc_ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `report_patient_relation`
    FOREIGN KEY (`patient_id`)
    REFERENCES `insight_db`.`child` (`patient_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `insight_db`.`verification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `insight_db`.`verification` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `code` VARCHAR(4) NOT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 61
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
