import { useState } from "react";

const Formulario = () => {


    const [formulario, setFormulario] = useState({
        embarazos: '',
        glucosa: '',
        presionSanguinea: '',
        grosorPiel: '',
        insulina: '',
        BMI: '',
        diabetesPedigreeFunction: '',
        edad: ''
    });

    const handleChange = event => {
        const { name, value } = event.target;

        setFormulario(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = event => {
        event.preventDefault();
        const URL = 'http://localhost:5000/predict/' + formulario.embarazos + '/' + formulario.glucosa + '/' + formulario.presionSanguinea + '/' + formulario.grosorPiel + '/' + formulario.insulina + '/' + formulario.BMI + '/' + formulario.diabetesPedigreeFunction + '/' + formulario.edad

        fetch(URL, {
            method: "GET"
        })
            .then((response) => response.text())
            .then((result) => {
                console.log(result); // Mensaje de respuesta del servidor
            })
            .catch((error) => {
                console.error('Error al enviar el archivo:', error);
            });
    };


    return (
        <>
            <h2>Prueba de Diabetes</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    Embarazos:
                    <input type="number" name="embarazos" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    Glucosa:
                    <input type="number" name="glucosa" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    Presion sanguinea:
                    <input type="number" name="presionSanguinea" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    Grosor de la piel:
                    <input type="number" name="grosorPiel" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    Insulina:
                    <input type="number" name="insulina" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    BMI:
                    <input type="number" name="BMI" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    DiabetesPedigreeFunction:
                    <input type="number" name="diabetesPedigreeFunction" id="" onChange={handleChange} />
                </label>
                <br />
                <label htmlFor="">
                    Edad:
                    <input type="number" name="edad" id="" onChange={handleChange} />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </>
    )
}

export default Formulario;