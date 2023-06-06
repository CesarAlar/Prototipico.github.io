const formulario = document.querySelector('.formulario');
const year = document.querySelector('.year');
const mensaje = document.querySelector('.mensaje');
const producto1 = document.getElementById('producto1');
const producto2 = document.getElementById('producto2');

const cantidad1 = document.querySelector('.cantidad1');
const cantidad2 = document.querySelector('.cantidad2');

document.addEventListener('DOMContentLoaded',() => { 
    formulario.addEventListener('submit', formu)   
    formulario.addEventListener('submit', Graficas)   
})

let nuevo = []
let nuevo2 = []
let campos = {}
const meses22 = {
    enero22 : 7.07,
    febrero22 : 7.28,
    marzo22 : 7.45,
    abril22 : 7.68,
    mayo22 : 7.65,
    junio22 : 7.99,
    julio22 : 8.15,
    agosto22 : 8.7,
    septiembre22 : 8.7,
    octubre22 : 8.41,
    noviembre22 : 7.8,
    diciembre22 : 7.82
}
const meses23 =[7.91,7.62,6.85,6.25,6.22,6.2,6.18,6.17,6.15,6.14,6.12,6.11]

function formu(e) {
    e.preventDefault()
    campos = {
        produ1: producto1.value.trim(),
        produ2: producto2.value.trim(),
    }
    const precios = {
        canti1: Number(cantidad1.value),
        canti2: Number(cantidad2.value)
    }
    const {produ1,produ2} = campos;
    if (produ1 === '' || produ2 === '' || Number(cantidad1.value) <= 0 || Number(cantidad2.value) <= 0) {
        console.log(campos);
        if (!document.querySelector('.alert')) {
            const p = document.createElement('p');
            p.textContent = 'Faltan campos por llenar o ingresaste un precio incorrecto';
            p.classList.add('alerta', 'alert');
            mensaje.appendChild(p)
            setTimeout(() => {
                p.remove()
            }, 3000);
        }
        return;
    }
    
    year23(campos,precios)
    // Graficas(produ1,produ2,nuevo,nuevo2)
    // campos.produ1 = ''
    // campos.produ2 = ''
    // precios.canti1 = 0
    // precios.canti2 = 0
}

function year23(campos,precios) {
    const {produ1,produ2} = campos;
    
    
    for (let i = 0; i < meses23.length; i++) {
        nuevo[i] = Number((precios.canti1 + (precios.canti1 * (meses23[i] / 100) )).toFixed(2))
        nuevo2[i] = Number((precios.canti2 + (precios.canti2 * (meses23[i]/100) )).toFixed(2))
    }
    
    // -----------------------------------------------
    const resultados = document.querySelector('.resultados')
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild)
    }
    const link = 'https://colab.research.google.com/drive/1i-16TU45un7Bdj2U0y0wLFTQ6lhaJUzD?usp=sharing'
    const  aqui = document.createElement('div');
    const  div1 = document.createElement('div');
    const  h3 = document.createElement('h3');
    const  div2 = document.createElement('div');
    const  h32 = document.createElement('h3');
    const  p = document.createElement('p');
    p.innerHTML = `Nota: Se recuerda que los precios se muestran, son producto de la PREDICCION de la INFLACION de la red neuronal que se creo para la materia de Inteligencia artificial <a href=${link} target="_blanket">Red Neuronal</a>.`;
    p.classList.add('nota')
    aqui.classList.add('datos')
    h3.textContent = `${produ1}`
    h32.textContent = `${produ2}`
    div1.appendChild(h3)
    div2.appendChild(h32)
    for (let i = 0; i < nuevo.length; i++) {
        const p = document.createElement('p');
        p.textContent =  `El mes${i +1} :` + nuevo[i]
        div1.appendChild(p)
    }
    for (let i = 0; i < nuevo2.length; i++) {
        const p = document.createElement('p');
        p.textContent =  `El mes${i +1} :` + nuevo2[i]
        div2.appendChild(p)
    }
    
    aqui.appendChild(div1)
    aqui.appendChild(div2)
    resultados.appendChild(aqui)
    resultados.appendChild(p)
    // -----------------------------------GRAFICAS -----------------------------------
    // Graficas(campos,nuevo,nuevo2)
    Graf(campos,nuevo,nuevo2)
   
}

function Graficas(campos,nuevo,nuevo2) {
    const {produ1,produ2} = campos
    const ctx = document.querySelector('.myChart');
    const ctx2 = document.querySelector('.myChart2');
    const reco = document.querySelector('.recomendaciones');
    
    const texto = document.createElement('div')
    const graf1 = document.createElement('div')
    const graf2 = document.createElement('div')
    const canvas1 = document.createElement('canvas')
    const canvas2 = document.createElement('canvas')
    texto.classList.add('texto')
    graf1.classList.add('grafica','graf1')
    graf2.classList.add('grafica','graf2')
    canvas1.classList.add('myChart')
    canvas2.classList.add('myChart2')

                      
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Noviembre','Diciembre'],
        datasets: [{
            label: `${produ1} con precio con inflacion`,
            data: nuevo,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
    new Chart(ctx2, {
        type: 'bar',
        data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Noviembre','Diciembre'],
        datasets: [{
            label: `${produ2} con precio con inflacion`,
            data: nuevo2,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
}

function Graf(campos,nuevo,nuevo2) {
    const {produ1,produ2} = campos
    const reco = document.querySelector('.recomendaciones');
    
    while (reco.firstChild) {
        reco.removeChild(reco.firstChild)
    }

    const texto = document.createElement('div')
    const graf1 = document.createElement('div')
    const graf2 = document.createElement('div')
    const canvas1 = document.createElement('canvas')
    const canvas2 = document.createElement('canvas')
    texto.classList.add('texto')
    graf1.classList.add('grafica','graf1')
    graf2.classList.add('grafica','graf2')
    // canvas1.classList.add('myChart')
    canvas1.id ='myChart'
    canvas2.id ='myChart2'

    graf1.appendChild(canvas1)
    graf2.appendChild(canvas2)
    texto.appendChild(graf1)
    texto.appendChild(graf2)
    reco.appendChild(texto)

    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myChart2');
    new Chart(ctx, {
        type: 'bar',
        data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Noviembre','Diciembre'],
        datasets: [{
            label: `${produ1} con precio con inflacion`,
            data: nuevo,
            backgroundColor: ['#B0F5FF','#B0FFBB','#B0FFE2','#B0F5FF','#B0FFBB','#B0FFE2','#B0F5FF','#B0FFBB','#B0FFE2','#B0F5FF','#B0FFBB','#B0FFE2',],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });
    new Chart(ctx2, {
        type: 'bar',
        data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Noviembre','Diciembre'],
        datasets: [{
            label: `${produ2} con precio con inflacion`,
            data: nuevo2,
            backgroundColor: ['#B0F5FF','#B0FFBB','#B0FFE2','#B0F5FF','#B0FFBB','#B0FFE2','#B0F5FF','#B0FFBB','#B0FFE2','#B0F5FF','#B0FFBB','#B0FFE2',],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            }
        }
        }
    });

}