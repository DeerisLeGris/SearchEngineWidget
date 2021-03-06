class SearchEngine extends Widget {
    constructor(id, app) {
		super(id, SearchEngineModel, SearchEngineView, SearchEngineController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = false;
	}
	
	ready() {
		super.ready();
		
	}
}

class SearchEngineModel extends WidgetModel {
    constructor() {
		super();
        this.url = ["https://www.qwant.com/?client=brz-vivaldi&q={0}", "https://www.google.com/search?q={0}", "https://www.ecosia.org/search?tt=vivaldi&q={0}", "https://www.bing.com/search?FORM=INCOH2&PC=IFJ1&PTAG=ICO-c9d0fc87&q={0}", "https://fr.search.yahoo.com/yhs/search?hspart=iry&hsimp=yhs-fullyhosted_009&type=dpp_vvldnu_00_00&param1=1&param2=pa%3Ddowncoll&p={0}"];
	}
}

class SearchEngineView extends WidgetView {
    constructor() {
		super();
	}

	setUp() {
		super.setUp();
	}

	draw() {
		super.draw();
		
        this.try.searchBar = HH.create("input");
        this.try.searchBar.setAttribute("type", "text");
        this.try.searchBar.setAttribute("placeholder", "Rechercher...");
		SS.style(this.searchBar, {"width": "85%", "border-radius": "10px", "padding": "2px", "margin": "5px"});
		Events.on(this.try.searchBar, "keydown", event => this.try.mvc.controller.keyDownSearchBar(event));
        this.try.stage.appendChild(this.try.searchBar);

        this.try.autocompletionResults = HH.create("div");
        this.try.stage.appendChild(this.try.autocompletionResults);
	}
}

class SearchEngineController extends WidgetController {
	constructor() {
		super();
	}

	setUp() {
		super.setUp();
	}

	async keyDownSearchBar(e) {

		//PROBLEME AVEC L'API (cross-domain interdit)
		
		await this.try.getAutocompletionResults(this.try.mvc.view.searchBar.value);

		if(e.keyCode == 13) //Si on appuie sur entrer...
			this.try.openTabsResults(this.try.mvc.view.searchBar.value);

	}

	openTabsResults(result) {
		for(let i = 0; i < this.try.mvc.model.url.length; i++) {
			window.open(this.try.mvc.model.url[i].replace("{0}", result), '_blank');
		}
	}

	async getAutocompletionResults(search) {
		let json = await this.mvc.main.dom("https://api.qwant.com/api/suggest/?q=" + search + "&client=opensearch&lang=fr_fr");
		let jsonParsed = JSON.parse(atob(json.response.dom));
		let results = [];

		for(let i = 0; i < jsonParsed[1].length; i++) {
			let div = document.createElement("div"), text = document.createElement("p");

			div.style.cursor = "pointer";
			div.style.paddingLeft = "5px";
			div.style.paddingRight = "5px";
			text.innerText = jsonParsed[1][i];
			div.appendChild(text);

			div.addEventListener("click", event => { this.try.openTabsResults(jsonParsed[1][i]) });
			results.push(div);
		}

		this.try.mvc.view.autocompletionResults.innerHTML = "";
		for(let i = 0; i < results.length; i++) {
			this.try.mvc.view.autocompletionResults.appendChild(results[i]);
		}
	}

}