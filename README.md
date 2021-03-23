[![HelloTangle](https://00f74ba44be59298357f93d3c18e1478371fc12303-apidata.googleusercontent.com/download/storage/v1/b/hellotangle-assets/o/images%2Fhellotangle-banner.png?jk=AFshE3VvmumsOiTdxJLzxbhU2AnA9twbm9OB1a4wv4NWUEMA_XMmSq-kf5Bs5Ieei8R5isB_twZ1mrvaJFa_CiLAlscgzRd949Y6qOUiae_7y2G_DRD4lpvx7sET8Gl5WsqW48JQ9A0Xvnqy6dLBZVAnepVEdyUCybF9Kx2rzSDpxBP5ipvJyS5PnqyuUjaS_4bPRepVvcEuqvYAIP_A1823XhtBFdgQtthVAsESKr5CSrdLnQe-Hm07jxF2ZIZQmOPpEFqV1T6Ty8RCL2ntNAs8XkFkZh7uc4tjh3BRCzZz7ujmgPONJB9pHpwviqAmXZg70HGmx7oQG6rft6HTvxVmEvdUkcM_V5OaapUJOOPhLZ-hq2rCOlgkTOUUL6gFG9j84FTMDfKHlqG8AYBl9ulLIoE-BHNE1ZcUrE43Q_uKTtcf6jrSjUqOKLVTYckrR4aHkyT3pT5QKLzZJyshos8Pvzmo8S1rnbaAP3fL-2wvCoDoWTxwnvJdqMlvdwcnl5trc4FQ0rYY7pMlY6bIUoLwlNno06dw6_YDRGeQF-U_rjNsfQaxSOwSVsyejN7_bRlO9Xy57Em6GYwPEdnNxHOLPzNQBESnawPV7iMRlted1spBXwKSKyP-eJqmkGkDEp9zxJqf4aQIZSUHSiqhlAWnJGdHpvXHyNVbrHBdiZ9GWqei1AHKZzoJgkzcTcz0YCcerQeuuPK00Z7RdjPY8bJQF9RufvcG7bE8_PAyExGBs47qHVPh-hvKMdk43ABFbS5M3fbmYXnMHaesAY_TCPUon79HozVGGfUmaCSxud8mHTe-mQjduH4Zkzh10g7flWOqrZW4pBgN5jCyFKDcpBh63ODzhK5ch--wUD6Mwnpirr6mvwZ_SFmAyd9DDbllMzlu3crrWtnwJ4IgDOGjdyXPcSBxQeSWrz00G9uJJDywCuz16jIMRrlkHdw&isca=1)](https://hellotangle.io)

# HelloTangle

> Direct way of interacting with the IOTA Tangle

[![HelloTangle](https://github.com/maxwellmattryan/hellotangle/actions/workflows/hellotangle-api.yaml/badge.svg)](https://github.com/maxwellmattryan/hellotangle/actions/workflows/hellotangle-api.yaml)
[![IOTA](https://img.shields.io/badge/IOTA-1.0.0--beta.30-b8caf2)](https://github.com/iotaledger/iota.js/tree/next)
[![NestJS](https://img.shields.io/badge/NestJS-7.5.6-red)](https://github.com/nestjs/nest)


## Overview

- [About](#About)
- [API](#API)
- [Web](#Web)

## About

Welcome! This repository is an introduction into the world of [IOTA](https://iota.org) and shows the beauty of working with such a unique protocol. 

I wanted to provide a simple interface for people to send arbitrary messages to the Tangle to a provided address. I thought that [NestJS](https://nestjs.com) and [Angular](https://angular.io) would serve as an excellent pair to create a simple platform to try this out.

## API

The API is built with the NestJS framework and utilizes its Express implementation for the application backend. The architecture is in a layered style promoting maintainability. For example, there are interfaces for handling the various services along.

It is worth mentioning that for an app of this size, going to such lengths for a "good" architecture is perhaps overkill. However it serves as a good base point to start on more serious and ambitious projects in the future.

## Web

The Web component of this project houses the Angular application that connects the client-side user with the API backend allowing people to send messages to the IOTA Tangle, which is my ultimate goal with this platform.

Angular applications can be heavy-duty and while perhaps too large for this app, it is a great framework for larger enterprise-level applications, so I think it is good practice to use it.


