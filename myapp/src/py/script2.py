import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
import pickle

def process_file(file_path):
    datos = pd.read_excel("uploads/"+file_path)
    # Dividir los datos en conjuntos de entrenamiento y prueba
    X = datos.iloc[:, :-1]  # Características sin la última columna
    y = datos.iloc[:, -1]   # Variable objetivo (última columna)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Definir modelos a evaluar
    modelos = {
        "Logistic Regresion": LogisticRegression(),
        "Decision tree": DecisionTreeClassifier(),
        "Random Forest": RandomForestClassifier(),
        "Naive Bayes": GaussianNB(),
        "SVM": SVC(),
        "K Vecinos Cercanos": KNeighborsClassifier()
    }

    # Entrenar y evaluar los modelos
    resultados = {}
    resultado_print=''
 
    # saca el acuraccy y separar el mas alto
    for nombre_modelo, modelo in modelos.items():
        modelo.fit(X_train, y_train)
        y_pred = modelo.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        resultados[nombre_modelo] = accuracy
        clave_maxima = max(resultados, key=lambda k: resultados[k])


    for nombre_modelo, modelo in modelos.items():
        if clave_maxima == nombre_modelo:
            modelo_entrenado = modelo.fit(X_train, y_train)
            with open(f"src/models/{clave_maxima}.pkl", 'wb') as archivo:
                pickle.dump(modelo_entrenado, archivo)


    # Imprimir los resultados
    for nombre_modelo, accuracy in resultados.items():
        resultado_print +=f"{nombre_modelo}: Accuracy = {accuracy:.4f}"
        resultado_print+= '\n'
    print(resultado_print)
    


    # Crear y escribir el archivo de texto
    archivo_resultados = "outputs/salida.txt"
    with open(archivo_resultados, "w") as archivo:
        archivo.write(resultado_print)

    


if __name__ == "__main__":
    # Obtener la ruta del archivo como argumento de línea de comandos
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        print(file_path)
        process_file(file_path)
    else:
        print("Por favor, especifique la ruta del archivo como argumento.")
