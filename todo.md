1. Users
    -> Register
    -> Login
    -> Logout
    -> Profile
        -> Image
        -> Bio
        -> Interests
        -> Follow Button
            -> Unfollow
    -> List Feed
        -> User + who they follow
        -> Subscribed Collections
        -> Personal Collections
        -> Interest Collections
        

2. Collections made up of content
    -> Category (or tags?)
    -> Collections of collections
    -> Private and public collections
    -> Collaborative collections
    -> Creating
    -> Delete
    -> Sharing
    -> Like
    -> Comments
    -> User Subscribe
        -> Unsubscribe

3. Content
    -> Title
    -> Description
    -> Picture -> Media Storage
    -> Link
    -> Geographical location
    -> Spotify Link (embed)
    -> Social media link
    -> IMDB Link (autofill key info for movies)
    -> YT Thumbnail embed
    -> Collection of wikipedia pages, news articles
    -> Collection of Recipes
    -> Collection of courses, universities, textbooks, reading lists
    -> Collection of things to buy for a project
    -> Collection of clothes or favourite shops
    -> Collection of Restaurants
    -> Collection of your own works (art, articles, projects etc)
    -> Category

Long-term
- Neo4j?
- Example Lists (How to use app)
- add custom columns (like ratings for movies)
    - add custom properties to content
- Explore page
- Collections of specific types e.g. spotify songs. Maybe as a template or option
    - Freestyle collections any format (may have many redundant/null data values)
- Third party api integration Spotify, IMDB collections
- Suggested collections
- Graph of connected collection
- Display collection by
    - Picture property (gallery view)
    - Title (select to view as either:)
        - List
        - Table

A mixture of twitter, LinkedIn, Github

Endpoints:
- login/
- feed/
- collecction/<int: id>