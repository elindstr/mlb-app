## Slash Line Stats

Slash Line Stats (SLS) is a JavaScript web app providing realtime Major League Baseball [slash line](https://www.mlb.com/glossary/miscellaneous/slash-line) stats for user-generated head-to-head comparisons. SLS aggregates stats from an extensive array of API endpoints and curates an easy-to-read slash line of just the stats you really care to know. View team rosters, team schedules, and the check the current weather at your team's stadium. Use the autocomplete search bar to find any player.
 
SLS is deployed on [GitHub pages](https://elindstr.github.io/slash-line-stats/).

## Screenshots

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

## Acceptance Criteria:

1. **Player Selection:**
   - On the app's main page, I can select Player 1 and Player 2 from dropdown menus.
   - Each dropdown menu displays a list of baseball players, allowing me to easily choose the players I want to compare.

2. **Season Selection:**
   - There is a dropdown menu for selecting the baseball season I am interested in.
   - The dropdown contains available seasons, allowing me to choose the specific season for which I want to compare player statistics.

3. **Comparison Button:**
   - A "Compare Players" button triggers the comparison process.
   - Clicking the button fetches and displays statistics for the selected players in the chosen season.

4. **Results Display:**
   - After comparison, a table is presented with clear rows for each player and columns for relevant hitting statistics.
   - Statistics include Batting Average (AVG), On-Base Percentage (OBP), and Slugging Percentage (SLG).
   - Pitching statistics should include Earned Run Average (ERA), Walks and Hits Per Inning Pitched (WHIP), and Strikeout-to-Walk Ratio (K/BB)

5. **Visual Clarity:**
   - The UI provides a clear and visually appealing display of the comparison results.
   - The layout is organized, and statistics are easy to read and understand.

6. **Responsive Design:**
   - The app is designed to be responsive, ensuring a consistent and user-friendly experience across various devices and screen sizes.

8. **Accessibility:**
   - The app is designed with accessibility in mind, ensuring it can be used by individuals with diverse needs, including keyboard navigation and screen readers.

9. **User Feedback:**
   - The app provides feedback to confirm that the comparison process is underway.
   - Clear messages or indicators notify the user of successful comparisons or any issues encountered.

10. **Persistent Selections:**
    - After making a comparison, the selected players and season remain selected, allowing me to easily modify my selections for further comparisons.

