# 🧱 Brick Breaker Game

## 🎮 Introduction
With the evolution of technology, the human brain demands constant stimulation. To combat boredom and practice your JavaScript skills, you've built your own game — a **Brick Breaker**–style project made entirely with plain JavaScript.  
No external frameworks, no Canvas — just pure HTML, CSS, and DOM magic.

## 🧩 Overview
This is a **classic Brick Breaker / Arkanoid-style game** where a ball bounces off a paddle to destroy bricks. The player's objective is to keep the ball in play, destroy all the bricks, and finish before the timer runs out.

### Key Mechanics
- Maintain smooth **60 FPS** performance.
- Use an optimized **`requestAnimationFrame()`** loop.
- Responsive paddle movement with arrow keys.
- Functional **pause and restart menus**.
- Scoreboard displaying:
   - **Timer:** Remaining game time.
   - **Score:** Points earned by breaking bricks.
   - **Lives:** Remaining attempts.

---

## 🚀 How to Run the Game

The easiest way to run this game is with **Visual Studio Code** and the **Live Server** extension.

### Steps

1. **Download or clone** this repository to your computer:
   ```bash
   git clone https://github.com/cmbigk/make-your-game-arkanoid
   ```

2. **Open the folder in VS Code** — go to *File → Open Folder* and select the project directory.

3. **Install the Live Server extension** (if not already installed) — open the Extensions tab with `Ctrl+Shift+X` (or `Cmd+Shift+X` on macOS), search for **"Live Server"** by *Ritwick Dey*, and click **Install**.

4. **Start the live server** — click the **Go Live** button in the bottom-right corner of VS Code. Your default browser will open automatically at `http://127.0.0.1:5500`.

5. **Play the game!** 🎉

---

## ⌨️ Game Controls

| Key / Button   | Action                      |
|----------------|-----------------------------|
| ← Arrow Left   | Move paddle left            |
| → Arrow Right  | Move paddle right           |
| Pause Button   | Pause or resume the game    |
| Restart Button | Restart from the beginning  |

---

## 🕹️ Gameplay Rules

- The ball starts on the paddle at the beginning of the game.
- Move the paddle to bounce the ball and break bricks.
- Each brick destroyed increases your score.
- If the ball falls below the paddle, you lose a life.
- The game ends when you lose all lives or run out of time.
- Win by destroying **all bricks** before time expires.

---

## 🛠️ Developer Tools

You can use your browser's developer tools for optimization and debugging:

- **Page Inspector:** Edit and inspect HTML/CSS in real time.
- **Web Console:** View JavaScript logs and debug issues.
- **Performance Tool:** Analyze FPS, JavaScript execution time, and rendering efficiency.
- **Paint Flashing:** Visualize DOM repaints to fine-tune performance.

---

## ⚙️ Technologies Used

- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**

---

## 💡 Learning Outcomes

Through this project, you'll gain hands-on experience with:

- `requestAnimationFrame()` and smooth animation loops
- The JavaScript event loop and performance optimization
- DOM manipulation and event handling
- FPS monitoring and minimizing frame drops (jank-free animation)

---

## 🚀 Future Enhancements

- Power-ups (multi-ball, larger paddle, slow motion, etc.)
- Additional difficulty levels with more complex brick layouts
- Background music and sound effects for immersion
