![Rounders](logo-banner.gif)

# Rounders API

This repository implements a RESTFul API for our CS304 project - it is scrappy and bootstrapped just for the course.

# Setting up project

## With Docker
[TODO]

## Without Docker

### Package requirements for your machine:

- node v8.x.x or v9.x.x
- npm v6.x.x or newer
- Yarn v1.3 or newer

### Setup

```bash
# Clone the repository
$ git clone https://github.com/mehtamanan/dao-core.git

# Install local node dependencies:
$ npm i

# To run
$ npm run dev
```

### Queries

INSERT - POST /users (User signup)
DELETE - DELETE /articles/:id (Article delete cascade delete reactions)
UPDATE - PATCH /users/:id (User password update)
SELECTION - GET /articles?title=xxxx (Get articles containing the param using LIKE)
PROJECTION - GET /institutions (Get all institute names)
JOIN - GET /users/:id/articles (Get all articles by that user)
AGGREGATION - /analytics (Get count of all new users and new articles and new claps)
NESTED AGGREGATION WITH GROUP BY - /analytics (Avg claps/user, avg claps/articles, avg articles/user)
DIVISION - GET /xxx (search articles based on tags)

Functionality:

POST /users/auth (login)
POST /articles (for article write. params: title, content, tags)
GET /tags (for article write and search)
GET /users (basic current user info)
