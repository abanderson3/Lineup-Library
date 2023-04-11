<h1 align="center"> Lineup Library </h1>
<h3 align="center"> An application powered by the Spotify API that allows users to generate playlists from music festival lineups. </h3> <br>

## Table of Contents

- [Introduction](#introduction)
  - [Built With](#built-with)
 - [Features](#features)
  - [Authorization](#authorization)
  - [Festival and Artist List](#festival-and-artist-list)
  - [Playlist Creation](#playlist-creation)
  
  
## Introduction
The goal of Lineup Library is to create a better way for people to decide whether they want to attend a music festival or explore the lineup of a festival they plan to attend. Music festivals are an incredible way to find new music and this applicaiton is meant to streamline the artist discovery process and get users excited for upcoming events!

### Built With:

- Authorization: 

    <img src="https://github.com/abanderson3/Lineup-Library/blob/main/src/Auth%20LL.gif" width=30px height=30px> **Auth0**
    
- Front End:

    <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" width=30px height=30px> **React**

- Back End:

   <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" width=30px height=30px> **NodeJs**

   <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" width=30px height=30px> **Express**

   <img src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/postgresql/postgresql.png" width=30px height=30px> **PostgreSQL**
   
   
   
## Features

Here are some of the features of Lineup Library:

### Authorization
A user is able to log into their Spotify account using Auth0 authentication. This process generates an authorization code that can then be used in all future requests to the Spotify API for user data or artist information. 

![login](https://github.com/abanderson3/Lineup-Library/blob/027248562da0d4c06f6a07e8154ab1858deff5dd/src/Auth%20LL.gif)

### Festival and Artist List
After login, the user is given an opportunity to select from upcoming music festivals to view the list of artists attending the festival. The artist list provides the genres of each individual artist, their name, and their Spotify popularity ranking. The Spotify popularity ranking is used to sort the artist list and is a 0 to 100 score determined by a mixture of all spotify statistics. 

![list](https://github.com/abanderson3/Lineup-Library/blob/e9d9ca0bbbe60e672b37b18ad6d82a0400d79369/src/List%20LL.gif)

### Playlist Creation
A user can create a playlist by selecting any artists they are interested in, providing a playlist title, and subtitle. When the user clicks "Create Playlist", the top 10 songs of all artists selected are added to a playlist with the users Spotify. 

![creating](https://github.com/abanderson3/Lineup-Library/blob/main/src/Creating%20LL.gif)
