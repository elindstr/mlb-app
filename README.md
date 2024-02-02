## Slash Line Stats

Slash Line Stats (SLS) is a JavaScript web app providing realtime Major League Baseball [slash line](https://www.mlb.com/glossary/miscellaneous/slash-line) stats for user-generated head-to-head comparisons. SLS aggregates stats from an extensive array of API endpoints and curates an easy-to-read slash line of just the stats you really care to know. View team rosters, team schedules, and the check the current weather at your team's stadium. Use the autocomplete search bar to find any player.
 
SLS is deployed on [GitHub pages](https://elindstr.github.io/slash-line-stats/).

## Screenshots

![image](https://github.com/elindstr/slash-line-stats/assets/149442786/7f01c34b-eef9-456b-ad63-88e052855f4b)

![image](https://github.com/elindstr/slash-line-stats/assets/149442786/a9dac917-0ea3-439d-bb49-6c6ad406e56b)



...

## Design Process

SLS began with a simple user story:

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
   - On the app's main page, you can select Player 1 and Player 2 from dropdown menus and then compare the stats of each player!
   - Each dropdown menu displays the most current 40 man roster for each MLB team.

2. **Comparison:**
   - By dragging two player cards to the main box, you're able to compare the most recent season slash line stats of any two MLB players.

3. **Results Display:**
   - Statistics include Batting Average (AVG), On-Base Percentage (OBP), and Slugging Percentage (SLG).
   - Pitching statistics should include Earned Run Average (ERA), Walks and Hits Per Inning Pitched (WHIP), and Strikeout-to-Walk Ratio (K/BB)

4. **Visual Clarity:**
   - The UI provides a clear and visually appealing display of the comparison results.
   - The layout is organized, and statistics are easy to read and understand.

5. **Responsive Design:**
   - The app is designed to be responsive, ensuring a consistent and user-friendly experience across various devices and screen sizes.
   - 
6. **Persistent Selections:**
    - After making a comparison, the selected players and season remain selected, allowing you to easily modify your selections for further comparisons.

 7. **Games Schedule**
    - The "Next Games" tab holds the current list of scheduled games for the team you have selected in the drop down menu.
    - You can also click the team icon in the "Next Games" tab to auto populate the roster for that team!    

