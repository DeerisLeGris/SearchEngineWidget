const Widget = require("../base/widget.js");
const WidgetModel = require("../base/widget_model.js");
const WidgetController = require("../base/widget_controller.js");

const Scrapper = load("./com/nicopr/scrapper/scrapper.js");

class SearchEngine extends Widget {
	
	constructor(app) {
		super(SearchEngineModel, SearchEngineController, app);
		
	}
	
	setUp() {
		super.setUp();
		
	}
	
	ready() {
		super.ready();
		
	}
	
	getQwantApi(data) {
		return await Scrapper.webpage("https://api.qwant.com/api/suggest/?q=" + data + "&client=opensearch&lang=fr_fr");
	}
}

class SearchEngineModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
}

class SearchEngineController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
}

module.exports = Mult;