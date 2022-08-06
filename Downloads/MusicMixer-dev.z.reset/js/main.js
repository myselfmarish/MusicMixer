
(() => {
	// collect ALL of the elements that we want the user to interact with and also elements that to change
	// JS holds these in memory so that it can access them later (these are elements in the HTML)
	let soundPieces = document.querySelectorAll('.sound-pieces img'),
		dropZones = document.querySelectorAll('.drop-zone'),
		playBut = document.getElementById('play-button'),
        pauseBut = document.getElementById('stop-button'),
		resetBut = document.getElementById('reset-button'),
		volumeSliders = document.querySelectorAll('.volume-control'),
		dragId = null;

	// Array of each sound that is currently playing
	const soundMixer = [];

	function allowDrag(event) {
		// create a reference to the element we're dragging so we can retrieve it later
		event.dataTransfer.setData('draggedEl', this.id);
		dragId = this.id;
	}

	function allowDragOver(event) {
		// override default behaviour on certain elements when an event happens
		let nodeCopy = document.getElementById(dragId).cloneNode(true);
		nodeCopy.id = Date.now();  /* Prevent us form using same ID */
		event.preventDefault();
	}

	function allowDrop(event) {
		event.preventDefault();
		let droppedElId = event.dataTransfer.getData('draggedEl');
		if(event.currentTarget.childNodes.length < 2)
		{
			let nodeCopy = document.getElementById(droppedElId).cloneNode(true);
			nodeCopy.id = Date.now(); /* Prevent us form using same ID */
			event.target.appendChild(nodeCopy);
			dragId = null;
			// Hardcode a file path based on the element ID
			playSound(`media/audio/${droppedElId}.mp3`, nodeCopy.id, event.currentTarget);
		}
	}

	function playSound(path, id, droppedLocation) {
		let sound = new Audio(path);
		sound.id = id; // This ID allows us to keep track of what's playing
		soundMixer.push(sound);
		sound.play();
		setVolume(droppedLocation.firstChild.value, droppedLocation) // Take the sliders intial value;
	}

	// play all sounds
	function playAudio() {
		soundMixer.forEach((sound) => {
			sound.play();
		});
	}

	// pause all sounds
	function pauseAudio() {
		soundMixer.forEach((sound) => {
			sound.pause();
		});
	}

	function setVolume(vol, parent) {
		// Grab the id generated during the prior drop  
		let dropId = parent.lastChild.id;
		soundMixer.forEach((sound) => {
			if(sound.id == dropId) {
				sound.volume = vol / 100;
			}
		});
	}

	// reset page
	function reset() {
		location.reload(); 
	}
  
	// UI EventListeners
	playBut.addEventListener('click', playAudio);
    pauseBut.addEventListener('click', pauseAudio);
	resetBut.addEventListener('click', reset);
	volumeSliders.forEach(volumeSider =>{
		volumeSider.addEventListener("input", (e) => {
			setVolume(e.currentTarget.value, volumeSider.parentElement);
		});
	});
	soundPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));
	

	// set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});
})();