const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	const automata = new Automata();
	gameEngine.addEntity(automata);

	document.getElementById("addPlantButton").addEventListener("click", () => {
		automata.addNewPlant();
	})

	document.getElementById("addAnimatButton").addEventListener("click", () => {
		const x = randomInt(automata.width + 1);
		const y = randomInt(automata.height + 1);
		gameEngine.addEntity(new Animat(automata, randomInt(361), x, y));
	})

	document.getElementById("removePlantsButton").addEventListener("click", () => {
		automata.newEnvironment();
	})

	gameEngine.start();
});
