const Widget = require("../base/widget.js");
const WidgetModel = require("../base/widget_model.js");
const WidgetController = require("../base/widget_controller.js");

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