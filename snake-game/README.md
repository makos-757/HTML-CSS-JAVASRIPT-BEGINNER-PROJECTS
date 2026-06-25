# Snake Game 🐍 | Makos Tech

A modern, blue-themed Snake game built with HTML, CSS, and JavaScript. Featuring immersive visuals, sound effects, multiple difficulty levels, and mobile touch support.

![Snake Game](https://github.com/anlbora/SnakeGame---JavaScript/assets/100442507/9f1aed03-7cd0-4c65-be1f-c4966df9b50d)

## 👨‍💻 Made by Makos Tech

**GitHub**: [@samuel-2044](https://github.com/samuel-2044)

---

## 🎮 Play Now

Open `index.html` in your browser to start playing!

## ✨ Features

### Blue Theme (Makos Tech Edition)
- **Stunning Blue Aesthetic**: Deep ocean blues with cyan accents
- **Neon Glow Effects**: Modern visual effects with glowing elements
- **Gradient Backgrounds**: Smooth color transitions throughout
- **Animated Elements**: Pulsing food, sliding modals

### Core Gameplay
- 🎯 **Classic Snake Mechanics** - Eat food, grow longer, avoid collisions
- ⏸️ **Pause Functionality** - Press SPACE to pause/resume
- 📱 **Mobile Support** - Touch swipe controls for smartphones
- 🔊 **Sound Effects** - Audio feedback for eating and game over

### Food Variety System
| Type | Appearance | Points | Chance |
|------|------------|--------|--------|
| Normal | 🔴 Red | 1 | 80% |
| Golden | 🟡 Gold | 5 | 10% |
| Icy | 🔵 Cyan | 3 | 10% |

### Difficulty Levels
- **Easy** - Perfect for beginners (200ms speed)
- **Medium** - Balanced challenge (125ms speed)
- **Hard** - For experienced players (75ms speed)

### Additional Features
- **High Score Tracking** - Persistent local storage
- **Games Played Counter** - Track your total games
- **Score Animation** - Visual feedback on score increase
- **Responsive Design** - Adapts to any screen size

## 🎯 How to Play

1. **Start the Game**: Select a difficulty level from the main menu
   
2. **Controls**:
   - **Arrow Keys** - Control snake direction
   - **Spacebar** - Pause/Resume game
   - **Touch Swipe** - Mobile controls (swipe to change direction)

3. **Objective**: 
   - Eat food to grow and score points
   - Golden food = 5 points
   - Icy food = 3 points  
   - Normal food = 1 point

4. **Game Over**: 
   - Avoid hitting walls
   - Avoid hitting your own tail

## 🛠️ Technologies Used

- **HTML5** - Game structure
- **CSS3** - Styling, animations, gradients
- **JavaScript (ES6+)** - Game logic
- **Web Audio API** - Sound effects

## 📁 Project Structure

```
Snake Game/
├── index.html    # Main game interface
├── style.css     # Blue theme styling
├── script.js     # Game logic & features
├── README.md     # Documentation
└── LICENSE       # MIT License
```

## 🎨 Color Palette

| Element | Color |
|---------|-------|
| Background | #0d1b2a → #1b263b |
| Board | #1b263b |
| Primary Blue | #00b4d8 |
| Accent Cyan | #48cae4 |
| Light Blue | #90e0ef |
| Snake Head | #48cae4 → #00b4d8 |
| Snake Body | #0077b6 → #023e8a |
| Food (Normal) | #ff6b6b |
| Food (Golden) | #ffd700 |
| Food (Icy) | #00ffff |

## 🔧 Customization

### Change Game Speed
Edit `gameSpeed` values in `script.js`:
```javascript
case 'easy':
    gameSpeed = 200;  // Change this value
    break;
```

### Add New Food Types
1. Add new type in CSS (`.food.yourtype`)
2. Update `getRandomFoodType()` in `script.js`
3. Add scoring logic in `initGame()`

## 📱 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**Version**: 2.0 (Blue Theme Edition)  
**License**: MIT  
**Author**: Makos Tech ([@samuel-2044](https://github.com/samuel-2044))  
**Last Updated**: 2026

---

### Contributing

Feel free to fork and enhance! Pull requests are welcome.

### Credits

Original game by [Makos Tech](https://github.com/samuel-2044)  
Blue theme & enhanced features by Makos Tech
