function initSettings()
{
	// Réinitialiser les valeurs
	try
	{
		if(typeof(Storage)!==undefined)
		{
			localStorage.clear();
			document.getElementById("height").value = "";
			document.getElementById("weight").value = "";
			document.getElementById("age").value = "";
			document.getElementById("sex").value = "F";
			
			document.getElementById("met").value = "9";
			document.getElementById("duration").value = "";
			document.getElementById("target_kcal").value = "";
		}
	}
	catch(e)
	{
		
	}	
}

function loadSettings()
{
	// Charger les valeurs
	try
	{
		if(typeof(Storage)!==undefined)
		{
			if(localStorage.height) document.getElementById("height").value = Number(localStorage.height);
			if(localStorage.weight) document.getElementById("weight").value = Number(localStorage.weight);
			if(localStorage.age) document.getElementById("age").value = Number(localStorage.age);
			if(localStorage.sex) document.getElementById("sex").value = localStorage.sex;
			
			if(localStorage.met) document.getElementById("met").value = Number(localStorage.met);
			if(localStorage.duration) document.getElementById("duration").value = Number(localStorage.duration);
			if(localStorage.target_kcal) document.getElementById("target_kcal").value = Number(localStorage.target_kcal);
		}
	}
	catch(e)
	{
		
	}
}

function saveSettings()
{
	// Sauvegarder les valeurs
	try
	{
		if(typeof(Storage)!==undefined)
		{
			localStorage.height = document.getElementById("height").value;
			localStorage.weight = document.getElementById("weight").value;
			localStorage.age = document.getElementById("age").value;
			localStorage.sex = document.getElementById("sex").value;
			
			localStorage.met = document.getElementById("met").value;
			localStorage.duration = document.getElementById("duration").value;
			localStorage.target_kcal = document.getElementById("target_kcal").value;
		}
	}
	catch(e)
	{
		
	}	
}

function init()
{
	loadSettings();
}

function getBaseMetabolicRate(height, weight, age, sex)
{
	try
	{
		// Calculer le métabolisme de base
		var bmr;
		if(sex=="F")
			bmr = (9.740*weight) + (172.9*(height/100)) - (4.737*age) + 667.051;
		else
			bmr = (13.707*weight) + (492.3*(height/100)) - (6.673*age) + 77.607;

		return bmr;
	}
	catch(e)
	{
		return 0;
	}
}

function getCalories(bm, met)
{
	try
	{		
		// Total des calories en 24h
		var kcal = bm*met;
		return kcal;
	}
	catch(e)
	{
		return 0;
	}
}

function validate()
{
	// Valider les données
	try
	{
		if(document.getElementById("height").validity.valid &&
		   document.getElementById("weight").validity.valid &&
		   document.getElementById("age").validity.valid &&
		   document.getElementById("met").validity.valid &&
		   document.getElementById("duration").validity.valid &&
		   document.getElementById("target_kcal").validity.valid)
			return true;
		else
			return false;
	}
	catch(e)
	{
		return false;
	}
}

function formatMinutes(minutes)
{
	// Formater un nombre de minutes en heures et minutes
	try
	{
		var hours = Math.floor(minutes/60);
		var minutes = minutes%60;
		var result = "";
					
		if(hours>0)
		{
			result+= "<b>" + hours + "</b> " + (hours>1 ? RESOURCES["hours"] : RESOURCES["hour"]);
			if(minutes>0) result+= ", ";
		}
		if(minutes>0)
			result+= "<b>" + minutes + "</b> " + (minutes>1 ? RESOURCES["minutes"] : RESOURCES["minute"]);		
		
		return result;
	}
	catch(e)
	{
		return "-";
	}
}

function process()
{
	// Traitement
	try
	{
			if(validate())
			{
				// Obtenir les différentes données depuis le document
				var height = parseInt(document.getElementById("height").value); // Taille
				var weight = parseInt(document.getElementById("weight").value); // Poids
				var age = parseInt(document.getElementById("age").value); // Âge
				var sex = document.getElementById("sex").value; // Sexe
				var met = parseFloat(document.getElementById("met").value); // MET
				var duration = parseInt(document.getElementById("duration").value); // Durée
				var target_kcal = parseInt(document.getElementById("target_kcal").value); // Objectif
				
				// Calculer
				var bmr = getBaseMetabolicRate(height, weight, age, sex);
				var kcal = getCalories(bmr, met);
				
				// Formater le résultat
				var result = "";
				result+= "<hr class=\"blueLine\"/>";
				result+= "<p><u>" + RESOURCES["burned_calories"] +"</u></p>";
				
				if(duration>0)
				{
					result+= "<p>";
					result+= formatMinutes(duration) + " : <b>" + Math.round((kcal/1440)*duration) + "</b>";
					result+= "</p>";
				}
				
				result+= "<p>";
				result+= "15 " + RESOURCES["minutes"] + " : <b>" + Math.round((kcal/1440)*15) + "</b> kcal<br/>";
				result+= "30 " + RESOURCES["minutes"] + " : <b>" + Math.round((kcal/1440)*30) + "</b> kcal<br/>";
				result+= "45 " + RESOURCES["minutes"] + " : <b>" + Math.round((kcal/1440)*45) + "</b> kcal<br/>";
				result+= "1 " + RESOURCES["hour"] + " : <b>" + Math.round(kcal/24) + "</b> kcal<br/>";
				result+= "</p>"
								
				// Calculer le temps nécessaire
				if(target_kcal>0)
				{
					result+= "<p><u>" + RESOURCES["time_to_burn_kcal"].replaceAll("{1}", target_kcal) + "</u></p>";
					
					var kcal_m = kcal / 1440;
					var totalMinutes = Math.round(target_kcal/kcal_m);
					result+= "<p>"
					result+= formatMinutes(totalMinutes);
					result+= "</p>";
				}
				
				// Besoins caloriques
				result+= "<p>";
				result+= "<u>" + RESOURCES["estimated_daily_calories_needed"] + "</u>";
				result+= "<table class=\"resultsTable\">";
				result+= "<tr>";
				result+= "<td><b>" + RESOURCES["profile"] + "</b></td>";
				result+= "<td><b>" + RESOURCES["sedentary"] +"</b></td>"; 
				result+= "<td><b>" + RESOURCES["active"] + "</b></td>";
				result+= "<td><b>" + RESOURCES["sportive"] +"</b></td>";
				result+="</tr>";
				result+= "<tr>";
				result+= "<td>Calories</td>"
				result+= "<td>" + Math.round(bmr*1.37) + "</td>";
				result+= "<td>" + Math.round(bmr*1.55) + "</td>";
				result+= "<td>" + Math.round(bmr*1.8) + "</td>";
				result+= "<tr>";
				result+= "</table>"
				result+= "</p>";
				
				document.getElementById("result").innerHTML = result;
				saveSettings();
			}
			else
				alert(RESOURCES["data_error"]);
	}
	catch(e)
	{
		alert(RESOURCES["process_error"]);
	}
}
