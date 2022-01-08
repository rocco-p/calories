import math

def calculerCalories(taille, poids, age, sexe, met):
    # Calcul métabolisme de base (24h)
    if sexe == "F":
        mb = (9.740*poids) + (172.9*taille) - (4.737*age) + 667.051
    else:
        mb = (13.707*poids) + (492.3*taille) - (6.673*age) + 77.607

    # Calculer le nombre total de Calories (24h)
    kcal = mb*met
    return kcal

# Entrée des données
taille = float(input("Taille (m) ? "))
poids = int(input("Poids (kg) ? "))
age = int(input("Age ? "))
sexe = input("Sexe (F/H) ? ").upper()

met = float(input("MET ? "))

# Calories totales pour cette valeur MET (24 heures)
kcal = calculerCalories(taille, poids, age, sexe, met)

duree = int(input("Durée de l'activité (minutes) ? "))
print(str(round((kcal/1440)*duree)) + " kcal.")

# kcal/minute
kcal_m = kcal/1440
objectif = int(input("Objectif (kcal) ? "))
totalMinutes = round(objectif/kcal_m)

# Calculer le temps
heures = math.floor(totalMinutes/60)
minutes = totalMinutes%60

resultat = ""
if heures>0:
    resultat+= str(heures) + (" heures" if heures>1 else " heure")
    resultat+= ", " if minutes>0 else ""

if minutes>0:
    resultat+= str(minutes) + (" minutes" if minutes>1 else " minute")

print(resultat)
