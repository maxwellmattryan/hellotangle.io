[![HelloTangle](https://storage.googleapis.com/hellotangle-assets/images/hellotangle-banner.png)](https://hellotangle.io)

# HelloTangle

> Direct way of interacting with the IOTA Tangle

[![HelloTangle](https://github.com/maxwellmattryan/hellotangle/actions/workflows/hellotangle-api.yaml/badge.svg)](https://github.com/maxwellmattryan/hellotangle/actions/workflows/hellotangle-api.yaml)
[![IOTA](https://img.shields.io/badge/IOTA-1.0.0--beta.30-b8caf2)](https://github.com/iotaledger/iota.js/tree/next)
[![NestJS](https://img.shields.io/badge/NestJS-7.5.6-red)](https://github.com/nestjs/nest)


## Overview

- [About](#About)
- [API](#API)
- [Web](#Web)
- [Utils](#Utils)

## About

Welcome! This repository is an introduction into the world of [IOTA](https://iota.org) and shows the beauty of working with such a unique protocol. 

I wanted to provide a simple interface for people to send arbitrary messages to the Tangle to a provided address. I thought that [NestJS](https://nestjs.com) and [Angular](https://angular.io) would serve as an excellent pair to create a simple platform to try this out.

## API

The API is built with the NestJS framework and utilizes its Express implementation for the application backend. The architecture is in a layered style promoting maintainability. For example, there are interfaces for handling the various services along.

It is worth mentioning that for an app of this size, going to such lengths for a "good" architecture is perhaps overkill. However it serves as a good base point to start on more serious and ambitious projects in the future.

## Web

The Web component of this project houses the Angular application that connects the client-side user with the API backend allowing people to send messages via the IOTA protocol, which is my ultimate goal with this platform.

Angular applications can be heavy-duty and while perhaps too large for this app, it is a great framework for larger enterprise-level applications, so I think it is good practice to use it.

## Utils

I have written a few small but important scripts in helping me build and test the application. These includes things like encoding / decoding tools and most interestingly the spammer tool.

To run, just make sure that your machine has [Python](https://www.python.org/) installed and run the commands with `python utils/script_name.py <1> <2> ...`.

### Spammer

The spammer is a fun tool to really test the limits of the HelloTangle API. It uses the python `requests` library to spam the backend with message requests.

Parameters:
  - MESSAGE_COUNT*: An integer in the range [1, 10000).
  - NUM_WORKERS*: An integer in the range [1, 1000) and less than or equal to the MESSAGE_COUNT.
