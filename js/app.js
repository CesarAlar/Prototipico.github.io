const formulario = document.querySelector('.formulario');
const year = document.querySelector('.year');
const mensaje = document.querySelector('.mensaje');
const producto1 = document.getElementById('producto1');
const producto2 = document.getElementById('producto2');

const cantidad1 = document.querySelector('.cantidad1');
const cantidad2 = document.querySelector('.cantidad2');

const prog = document.querySelector('.fa-chart-bar');
const mat = document.querySelector('.fa-laptop-code');
const pres = document.querySelector('.fa-address-card');
const user = document.querySelector('.fa-user');

if(window.location.href.includes('Programa.html')){
    prog.style.color = 'rgb(65, 246, 113)';
}else if (window.location.href.includes('Materias.html')) {
    mat.style.color = 'rgb(65, 246, 113)';
}else if (window.location.href.includes('Presentacion.html')) {
    pres.style.color = 'rgb(65, 246, 113)';
}else{
    user.style.color = 'rgb(65, 246, 113)';
}
document.addEventListener('DOMContentLoaded',() => { 
    formulario.addEventListener('submit', formu)   
})

let nuevo = []
let nuevo2 = []
let campos = {}
const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
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
    p.innerHTML = `En los resultados de la tabla anterior podemos observar un decremento en el precio de ${produ1} y de ${produ2}. <br> A los precios originales se les aplicó la inflación de los meses de todo este año, los cuales son producto de una <a href="${link}" target="_blanket">Red neuronal</a> que genero las predicciones de las inflaciones.`;
    p.classList.add('nota')
    aqui.classList.add('datos')
    h3.textContent = `${produ1}`
    h32.textContent = `${produ2}`
    div1.appendChild(h3)
    div2.appendChild(h32)
    for (let i = 0; i < nuevo.length; i++) {
        const p = document.createElement('p');
        p.textContent =  meses[i] + ':' + nuevo[i]
        div1.appendChild(p)
    }
    for (let i = 0; i < nuevo2.length; i++) {
        const p = document.createElement('p');
        p.textContent =  meses[i] + ':' + nuevo2[i]
        div2.appendChild(p)
    }
    
    aqui.appendChild(div1)
    aqui.appendChild(div2)
    resultados.appendChild(aqui)
    resultados.appendChild(p)
    // -----------------------------------GRAFICAS -----------------------------------
    Graf(campos,nuevo,nuevo2)
   
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
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)','rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true,
            min: nuevo[11] - 0.1,
            max: nuevo[0],
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
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'],
            borderColor: ['rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)','rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'],
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true,
            min: nuevo2[11] - 0.1,
            max: nuevo2[0] ,
            }
        }
        }
    });

}