## Slash Line Stats

Slash Line Stats (SLS) is a JavaScript web application providing realtime Major League Baseball [slash line](https://www.mlb.com/glossary/miscellaneous/slash-line) stats for user-generated head-to-head comparisons. SLS aggregates stats from an extensive array of API endpoints and curates an easy-to-read slash line of just the stats you want to know. View team rosters, team schedules, and the check the current weather at your team's stadium. Use the autocomplete search bar to find any player.
 
SLS is deployed on [GitHub pages](https://elindstr.github.io/slash-line-stats/).

## Screenshots

<img src="./assets/media/Screenshot 2024-02-06 at 10.52.55 PM.png" width="400px">

<img src="./assets/media/Screenshot 2024-02-06 at 11.03.17 PM.png" width="200px">

## User Story

```
As a baseball enthusiast, I want to compare the
slash line stats of two players so I can analyze
their performance. When I'm watching a live game,
I want to be able to open an app, see my favorite
team and its roster, see other teams and their
players, and easily select and compare players' 
slash lines. 
```

## Features:

1. **Player Selection:**
   - Select a team and the active roster displays dynamically. You can drag the player items from the roster to the comparison board.
   - View the team's schedule, click on the opposing team, and drag players from the opposing roster.
   - Or use the search box, which features an autocomplete engine for all current MLB players. Select a result and that player is added to the main board.

2. **Comparison:**
   - By dragging two player cards to the main comparison box, you're able to compare the slash line stats of any two MLB players.

3. **Results Display:**
   - Hitting stats include Batting Average (AVG), On-Base Percentage (OBP), and Slugging Percentage (SLG).
   - Pitching stat include Earned Run Average (ERA), Walks and Hits Per Inning Pitched (WHIP), and Strikeout-to-Walk Ratio (K:BB).
   - If available, stats are show for career and last two seasons.

4. **Visual Clarity:**
   - The UI provides a clear and visually appealing display of the comparison results.
   - The layout is organized, and statistics are easy to read and understand.

5. **Responsive Design:**
   - The app is designed to be responsive, ensuring a consistent and user-friendly experience across various devices and screen sizes.

6. **Persistent Selections:**
    - The app remembers your last-selected team, so when you close and reopen your browser, you can pick up right where you left off.

 7. **Games Schedule**
    - The "Next Games" tab holds the current list of scheduled games for the team you have selected in the drop down menu.
    - You can also click the team icon in the "Next Games" tab to auto populate the roster for that team!

  8. **Media**
    - The app includes all player images in the MLB.com database and background images for every team's stadium.
     
  9. **Field Name and Weather**
    - Along with the team stadium image, the app displays the name of the stadium and the current weather at that stadium.
       
