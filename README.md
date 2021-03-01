Deployed [here](our-parks-next.vercel.app)!

## About

This is a prototype of a passion project I hope to build on soon. All research and work done in ~4 days!

At the moment, anyone can view markers posted around NYC in real-time, and hopefully about NYC's green spaces!

If you sign in with Google, you can add your own markers (again, hopefully about NYC's green spaces)!

## Tech Stack

I dabbled with Next.js and its next-pwa module to get a taste of how PWAs can function.

React Hook Forms for the input.

Leaflet.js (with its React library) for the map.

Firebase for its Auth, and Firestore for its real-time updates.

I also tried using React.Context for auth and some map data instead of Redux.

## Challenges

I had a lot of trouble with an earlier version trying to make the input form look like an overlay, but I think it looks rather nice without any noticeable hiccups now!

Mapping is always a challenge, but I definitely learned a lot about Leaflet.js and how to make it work with React-Leaflet. A minor still present is consistently getting the map framed properly on the screen, such that the attributions always show. 

Firebase was suggested to me for the live updates, and while it is likely more easier to implement than a whole backend with Express and maybe MongoDB, it was a bit of work to look through all the docs and learn its querying.
