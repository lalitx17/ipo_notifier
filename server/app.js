const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const fs = require('fs');
const ejs = require('ejs');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  express,
  cors,
  nodemailer,
  google,
  fs,
  ejs,
  prisma
};


