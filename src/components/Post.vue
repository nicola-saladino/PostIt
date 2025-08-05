<script setup>
import { ref } from 'vue'

// Colonne definite
const columns = ref([
  { id: 'todo', title: 'DA FARE', color: '#f7ede2' },
  { id: 'urgent', title: 'URGENTE (Perché se tutto è urgente, nulla è urgente)', color: '#ef476f' },
  { id: 'completed', title: 'COMPLETATO', color: '#06d6a0' }
])

// Lista dei post-it con colonna assegnata
const postits = ref([
  {
    id: 1,
    x: 50,
    y: 150,
    content: 'Finire il progetto Vue 📝',
    color: '#FFFFFF',
    column: 'todo',
    zIndex: 100
  },
  {
    id: 2,
    x: 380,
    y: 170,
    content: 'Chiamare il cliente 📞\nScadenza: oggi!',
    color: '#FFF53F',
    column: 'urgent',
    zIndex: 101
  },
  {
    id: 3,
    x: 720,
    y: 150,
    content: 'Setup progetto ✅\nTutto fatto!',
    color: '#FFB9DB',
    column: 'completed',
    zIndex: 102
  }
])

// Variabili per il drag e snap
const isDragging = ref(false)
const dragId = ref(null)
const dragOffset = ref({ x: 0, y: 0 })
const snapDistance = 30 // Distanza per l'effetto "incollato"

// Colori casuali per i post-it
const colors = ['#FFFFFF', '#FFF53F', '#FFB9DB']
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)]

// Funzione per aggiungere un nuovo post-it
const addPostit = () => {
  const maxZ = Math.max(...postits.value.map(p => p.zIndex), 100)
  const newPostit = {
    id: Date.now(),
    x: Math.random() * 200 + 50,
    y: Math.random() * 200 + 150,
    title: '', 
    content: 'Nuovo post-it!\nScrivi qui...',
    color: getRandomColor(),
    column: 'todo',
    zIndex: maxZ + 1,
    isEditing: false 
  }
  postits.value.push(newPostit)
}

// Funzione per rimuovere un post-it
const removePostit = (id) => {
  const index = postits.value.findIndex(p => p.id === id)
  if (index > -1) {
    postits.value.splice(index, 1)
  }
}

// Funzione per determinare in quale colonna si trova un post-it
const getColumnFromPosition = (x) => {
  const columnWidth = window.innerWidth / 3
  if (x < columnWidth) return 'todo'
  if (x < columnWidth * 2) return 'urgent'
  return 'completed'
}

// Funzione per aggiornare il colore del post-it in base alla colonna
const updatePostitColumn = (postit) => {
  const newColumn = getColumnFromPosition(postit.x)
  if (newColumn !== postit.column) {
    postit.column = newColumn
    const column = columns.value.find(c => c.id === newColumn)
    //postit.color = column.color
  }
}

// Funzione per trovare post-it vicini (effetto incollato)
const findNearbyPostits = (currentPostit) => {
  return postits.value.filter(postit => {
    if (postit.id === currentPostit.id) return false
    
    const dx = Math.abs(postit.x - currentPostit.x)
    const dy = Math.abs(postit.y - currentPostit.y)
    
    return dx < snapDistance && dy < snapDistance
  })
}

// Funzione per applicare l'effetto snap/incollato
const applySnapEffect = (postit) => {
  const nearby = findNearbyPostits(postit)
  
  if (nearby.length > 0) {
    const closest = nearby[0]
    
    // Snap orizzontale se sono molto vicini
    if (Math.abs(postit.x - closest.x) < snapDistance) {
      postit.x = closest.x
    }
    
    // Snap verticale se sono molto vicini
    if (Math.abs(postit.y - closest.y) < snapDistance) {
      postit.y = closest.y
    }
    
    // Effetto di impilamento verticale
    if (Math.abs(postit.x - closest.x) < 20) {
      const offset = postit.y > closest.y ? 20 : -20
      postit.y = closest.y + offset
    }
  }
}

// Gestione del drag
const startDrag = (event, id) => {
  if (event.target.tagName === 'TEXTAREA' || event.target.classList.contains('delete-button') 
|| event.target.classList.contains('note-title')) 
return
  
  isDragging.value = true
  dragId.value = id
  
  const postit = postits.value.find(p => p.id === id)
  
  // Porta il post-it in primo piano
  const maxZ = Math.max(...postits.value.map(p => p.zIndex), 100)
  postit.zIndex = maxZ + 1
  
  dragOffset.value = {
    x: event.clientX - postit.x,
    y: event.clientY - postit.y
  }
  
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
  event.preventDefault()
}

const drag = (event) => {
  if (!isDragging.value || !dragId.value) return
  
  const postit = postits.value.find(p => p.id === dragId.value)
  if (postit) {
    postit.x = Math.max(0, Math.min(window.innerWidth - 250, event.clientX - dragOffset.value.x))
    postit.y = Math.max(70, Math.min(window.innerHeight - 260, event.clientY - dragOffset.value.y))
    
    // Aggiorna la colonna e il colore in tempo reale
    updatePostitColumn(postit)
  }
}

const stopDrag = () => {
  if (dragId.value) {
    const postit = postits.value.find(p => p.id === dragId.value)
    if (postit) {
      // Applica l'effetto snap quando si rilascia
      applySnapEffect(postit)
    }
  }
  
  isDragging.value = false
  dragId.value = null
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>

<template>
  <div class="post-container">
    <!-- Colonne -->
    <div class="columns-container">
      <div 
        v-for="(column, index) in columns" 
        :key="column.id"
        class="column"
        :class="column.id"
      >
        <div class="column-header" :style="{ backgroundColor: column.color }">
          <h3>{{ column.title }}</h3>
        </div>
        <div class="column-content">
          <!-- Area di drop visiva -->
          <div class="drop-zone"></div>
        </div>
      </div>
    </div>

    <!-- Pulsante per aggiungere post-it -->
    <button @click="addPostit" class="fab">📌</button>


    <!-- Post-it draggabili -->
    <div
      v-for="postit in postits"
      :key="postit.id"
      :style="{ 
        left: postit.x + 'px', 
        top: postit.y + 'px',
        backgroundColor: postit.color,
        zIndex: postit.zIndex
      }"
      class="note"
      :class="['note', postit.column, { 'dragging': isDragging && dragId === postit.id }]"
      @mousedown="startDrag($event, postit.id)"
    >
    
      <div class="note-header">
      <input 
      v-if="postit.isEditing"
      v-model="postit.title" 
      class="note-title" 
      placeholder="Titolo..." 
      @mousedown.stop
      @blur="postit.isEditing = false"
      />
      
      <span 
          v-else 
          class="note-title-display" 
          @dblclick="postit.isEditing = true"
        >
          {{ postit.title || 'Titolo...' }}
        </span>

        <button @click="removePostit(postit.id)" class="delete-button">×</button>
      </div>
      <textarea 
        v-if="postit.isEditing"
        v-model="postit.content"
        class="note-content"
        placeholder="Scrivi qui..."
        @mousedown.stop
        @blur="postit.isEditing = false"
      ></textarea>
      
      <div 
        v-else 
        class="note-content-display" 
        @dblclick="postit.isEditing = true"
      >
        {{ postit.content }}
      </div>

    </div>
  </div>
</template>

<style scoped>
.post-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /*pointer-events: none;*/
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

.add-button {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #2d2926;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: background 0.3s;
  pointer-events: all;
  font-size: 16px;
}

.add-button:hover {
  background: #008f6f;
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

/* Effetto incollato quando i post-it sono vicini */
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
  background-image: url('/img/crumpled-paper-texture.png'); /* 👈 immagine da aggiungere */
  background-size: cover;
  background-blend-mode: multiply;
}

</style>