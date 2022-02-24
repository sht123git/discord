# Reacr.js + Next.js + Tailwind CSS + Mysql Project

# Node Module Install Way
    yarn install

# How to connect to Mysql
# - Please create new database in Mysql using SQLyog or phpmyadmin of XAMP. for example, 
        database name : 'Discord_Scrape' 
# - Please change settings in .env.local file. for example
    MYSQL_HOST='127.0.0.1'
    MYSQL_DATABASE='Discord_Scrape'
    MYSQL_USERNAME='root'
    MYSQL_PASSWORD=''
    MYSQL_PORT=3306
# - Please run following CLI to create new tables of database.
    yarn migrate
# - Please run Python exe file to scrap data on discord.com and add data to database. Refore 'Python Readme' for run Python.

# How to run Project
    yarn dev

# How to build Project
    yarn build

# How to export Poject
    yarn export


# HOw to use localtunnel package
    npm install -g localtunnel
    yarn add localtunnel
    lt --port(p) [Port_Number] --subdomain(s) [Domain_Name]