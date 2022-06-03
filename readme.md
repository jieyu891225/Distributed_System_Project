# database config

<p>Install postgresql (see https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)</p>
<p>Change postgresql user to root and password to password, or rewrite settings in dbconfig.js as wishes</p>

<p>Launch your pgAdmin, a management tool for PostgresDB.</p>

<p>CREATE TABLE by Line_Info.sql and Import Data(Line_Info.csv)to create user server database.</p>

# get started

```npm install```
 to install node modules

```npm start```
 to run server on localhost:8001

# API

## get /line_info

<p>Return all line_info</p>

## put /line_info

<p>To update line_info</p>
<p>valid: 200</p>
<p>invalid: 400</p>

### example put body

```{"nick_name": "mozix","channel_id": "656452143","channel_secret": "05425dffa740b7c5d81f89fc5993e074"}```
  this token is only for example, this will not work

