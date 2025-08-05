<script setup>


</script>

<template>
 <router-view />
</template>

<style scoped>
.loading {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-family: "Indie Flower", cursive;
  color: #f7ede2;
  z-index: 1000;
}

.error {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ef476f;
  color: white;
  padding: 20px;
  border-radius: 8px;
  font-family: "Indie Flower", cursive;
  text-align: center;
  z-index: 1000;
}

.error button {
  margin-top: 10px;
  background: white;
  color: #ef476f;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: "Indie Flower", cursive;
}

/* Resto degli stili rimangono uguali... */
.post-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.columns-container {
  display: flex;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

.column {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.column-header {
  padding: 15px 20px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  pointer-events: all;
  border-bottom: 2px solid #ddd;
  border-left: 2px solid #ddd;
  border-right: 2px solid #ddd;
}

.column-header h3 {
  margin: 0;
  font-size: 26px;
  font-weight: bold;
  font-family: "Indie Flower", cursive;
}

.column-content {
  flex: 1;
  position: relative;
  background: rgba(0,0,0,0.02);
  border-left: 2px solid #ddd;
  border-right: 2px solid #ddd;
}

.drop-zone {
  width: 100%;
  height: 100%;
  background-color: #2d2926;
  opacity: 0.3;
}

.note {
  position: absolute;
  width: 250px;
  height: 185px;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
  border-radius: 4px;
  font-family: 'Comic Sans MS', cursive;
  cursor: move;
  transition: all 0.3s ease;
  user-select: none;
  pointer-events: all;
  transform-origin: center;
}

.note:hover {
  box-shadow: 4px 4px 12px rgba(0,0,0,0.2);
  transform: scale(1.02);
}

.note.dragging {
  transform: scale(1.05) rotate(2deg);
  box-shadow: 6px 6px 20px rgba(0,0,0,0.3);
  transition: none;
}

.note:not(.dragging) {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.note-header {
  display: flex;
  justify-content: flex-end;
  padding: 2px;
  height: 20px;
  cursor: move;
}

.delete-button {
  background: rgba(255,255,255,0.7);
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.3s;
}

.delete-button:hover {
  background: rgba(255,0,0,0.7);
  color: white;
  transform: scale(1.1);
}

.note-content {
  width: calc(100% - 16px);
  height: calc(100% - 36px);
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  line-height: 1.4;
  cursor: text;
  color: #000000;
  font-family: "Indie Flower", cursive;
  font-weight: bold;
  font-style: normal;
}

.note-content::placeholder {
  color: #888;
  font-style: italic;
}

.fab {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f7ede2;
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  border: none;
  cursor: pointer;
  z-index: 1000;
  transition: background 0.3s;
}

.fab:hover {
  transform: scale(1.1);
}

.note-title {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: bold;
  font-family: "Indie Flower", cursive;
  text-transform: uppercase;
  color: #000;
  padding: 4px 8px;
  outline: none;
}

.note-title-display {
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  font-family: "Indie Flower", regular;
  text-transform: uppercase;
  color: #000;
  padding: 4px 8px;
  cursor: pointer;
}

.note-content-display {
  padding: 8px;
  font-size: 16px;
  line-height: 1.4;
  font-family: "Indie Flower", regular;
  font-weight: bold;
  color: #000;
  white-space: pre-wrap;
  cursor: pointer;
}

.note.completed {
  filter: brightness(0.95) contrast(1.2) grayscale(0.2);
  transform: rotate(-2deg) scale(0.98);
  background-image: url('/img/crumpled-paper-texture.png');
  background-size: cover;
  background-blend-mode: multiply;
}
</style>