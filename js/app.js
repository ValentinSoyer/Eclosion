var app = {

	proposedWord : false,

	filters : {
		age: false,
		sexe: false
	},

	init: function(){

		UI.init();

		model.initFirebase();

		app.watchData();

		document.querySelector('#addContribution').addEventListener('keypress', app.addContribution);
		document.querySelector('div.filters button.reset').addEventListener('click', app.resetFilters);
	},

	watchData: function(){
		model.getData(function(words){
			//Crée le graph avec D3.js
			if(app.filters.sexe || app.filters.age){

				model.applyFilters(words, app.filters, function(filteredWords){
					
					UI.createD3Graph( filteredWords );
				});

			}else{
				UI.createD3Graph(words);
			}
			
			//récupère un mot au hasard pour faire contribuer l'utilisateur
			app.proposedWord = model.getRandomWord();

			UI.printWord(app.proposedWord);
		});
	},

	reloadData: function(){
		model.getDataOnce(function(words){

			if(app.filters.sexe || app.filters.age){

				model.applyFilters(words, app.filters, function(filteredWords){
							
					UI.createD3Graph( filteredWords );
				});

			}else{
				UI.createD3Graph(words);
			}
		});
	},

	addContribution: function(e){
		if(e.keyCode == 13){
			if(this.value){

				model.addContribution(this.value, app.proposedWord);
				
				this.value = '';
			}

		}
	},

	addFilter: function(filter, value){

		app.filters[filter] = value;
		
		app.reloadData();		
	},

	resetFilters: function(){
		
		app.filters.sexe = false;
		app.filters.age = false;
		
		app.reloadData();		
		
	}
};

app.init();