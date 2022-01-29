
# Best Bout Machine

This website is made for everyone who casts their annual vote for pro wrestling's match of the year, can't remember all the matches they watched, and just chooses something from Wrestle Kingdom. You know how it goes.


## Demo

https://best-bout-machine.herokuapp.com/

Please allow Heroku a few moments to greet us ; )


![Logo](https://i.imgur.com/1yHUd2z.png?1)

This project takes it's name from Kenny Omega, known as the Best Bout Machine during his time in Japan. He is arguably one of the greatest in-ring performers of all time and, without doubt, the greatest Canadian professional wrestler of his generation.


## Related

Here is my project Trello Board, which includes my ERD and wireframes.

[Best Bout Machine Project Board and Resources](https://trello.com/b/6Wsepmkf/best-bout-machine-project-board)


## Tech Stack

**Client:** Bulma, EJS

**Server:** Node, Express

**Database:** MongoDB, Mongoose

**Authorization:** GoogleOauth2.0, Passport


## Screenshots

![App Screenshot](https://i.imgur.com/ZXyJmD7.png)


## Features

- Match of the year tracker. Logged in users nominate match of the year candidates to track the top matches of the year. Matches can be reviewed and rated.  Matches are stored in the database/main index. Users can create their own list of favourite matches.
- Users are able to create profiles containing bio's, their personalized Best Bout List, and add other users to their faction (follow). Users may also turn heel (unfollow), as needed.
- The application also includes a Promo Board for users to discuss various topics with the community.
- The application is seeded with many of the top promotions in wrestling, for the ability to view nominated Best Bouts by promotion.


## Usage/Examples

Main Mongoose Model
![App Screenshot](https://i.imgur.com/RTMQ3Sq.png)

Main Controller
![App Screenshot](https://i.imgur.com/nx2liyt.png)


## Icebox

- Additional database tracking for individual wrestlers and events

- Potentially consume an API for wrestler profile images

- Implement real-time chat functionality

- Add the ability to search the database


## Lessons Learned

This was my first foray into working with a database that I designed. Despite putting a lot of thought into my models, even as I write this I still consider various changes that I might make. While data excites me, I now realize how difficult it is to develop applications from an architecture and data perspective. I believe that I left opportunities to maximize functionality on the table by collecting data in a simplified format. On the other side of that coin, I remind myself that the purpose of this project was not specifically database design but, rather, server-side JavaScript. I did manage to make the MVP for the project's idea, and was able to push a bit beyond that. Ultimately, this should be considered a success but perhaps the greatest takeaway is that no project is ever truly finished!


## Authors

- [Anthony Vanoni](https://www.github.com/tonypurple)


## Acknowledgements

My inspriration to attempt this project comes from two well established resources in the internet wrestling community. For functionality that this project was not intended to provide, please visit the following sites:
 - [The Internet Wrestling Database](http://www.profightdb.com/)
 - [CAGEMATCH](https://www.cagematch.net/)

Stock photography provided courtesy of: 
 - [Martin Kníže, Carlos E. Ramirez, Larry Costales on Unsplash](https://unsplash.com/)


## Feedback

If you have any feedback, please reach out at tony.vanoni@outlook.com


## 🚀 About Me
I've been somewhere in the middle of creative and technical my whole life. Software development has proven to be the outlet for both that I was always looking for. I am currently participating in a remote flex immersive through General Assembly, where I am gaining skills and experience in full-stack development.



## ⚡️ Fun fact...

It was my childhood dream to become a professional wrestler. While life took me down other roads (not to mention having the athletic ability of a software developer), at the age of 31 I spent a summer literally learning the ropes at a professional wrestling school on Vancouver Island. At that point, I never intended to pursue it as any sort of career but I suppose I was hoping to prove something to my childhood self. My summer as Surrey Jack will be as close as I get to that childhood dream, but this project makes me feel positive about the potential of turning this adulthood dream into a reality. I am happy to have been able to pair my passion for wrestling with my passion for development.

