(() => {
	// collect ALL of the elements that we want the user to interact with and also elements that to change
	// JS holds these in memory so that it can access them later (these are elements in the HTML)
	let musicBoard = document.querySelector('.sound-board'),
		  soundPieces = document.querySelectorAll('.sound-pieces img'),
		  dropZones = document.querySelectorAll('.drop-zone'),
      dragId = null;

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
    let nodeCopy = document.getElementById(droppedElId).cloneNode(true);
    nodeCopy.id = Date.now(); /* Prevent us form using same ID */
    event.target.appendChild(nodeCopy);
    dragId = null;
    // Hardcode a file path based on the element ID
    playSound(`media/audio/${droppedElId}.mp3`);
    console.log(`${droppedElId}.mp3`);
	}

  function playSound(path) {
    var sound = new Audio(path);
    sound.play();
  }

	//theSoundImages.forEach(image => image.addEventListener('click', changeImageSet));
	soundPieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	// set up the drop zone event handling
	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});
})();
