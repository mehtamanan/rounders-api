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
$ git clone https://github.com/mehtamanan/rounders-api.git

# Install local node dependencies:
$ npm i

# Set an environment variable for DB_URI (or defaults to postgres://postgres:password@localhost:5432/rounders)
$ export DB_URI="postgres://user:password@host:5432/database"

# To run
$ npm run dev
```

### Queries

+ INSERT operation - POST /users
+ DELETE operation - DELETE /articles/:id
+ UPDATE operation - PATCH /users/:id
+ SELECTION query - GET /articles?title=xxxx (retrieves articles that contain xxxx in title)
+ PROJECTION query - GET /institutions?include=bank_code&include=name (retrieves all institutions with projected fields bank_codes and name)
+ JOIN - GET /users/:id/articles (retrieve articles written by user :id)
+ AGGREGATION - /analytics (get count of users,  count of articles, sum of claps within one week)
+ NESTED AGGREGATION WITH GROUP BY - /leaderboard (retrieve users whose articles have received the highest claps in the past week)
+ DIVISION - GET /trending (retrieve articles that are clapped by (reacted) all users)

#### Extras:

+ GET /tags (for article write and search)
+ GET /users/:id
+ GET /users
