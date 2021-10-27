
/**
 * Título na página quando não estivermos
 * dentro do intervalo horarioEntrada/horarioSaida
 * no dia "D", ou se não estivermos no dia "D" ainda.
 */
const tituloAindaFalta = 'Piada Ruim Em'

/**
 * Título para quando estivermos
 * no dia de piada ruim, e no intervalo de horário
 * em que as piadas ruins são permitidas.
 */
const tituloDeuODia = '😓 É Hoje'

/**
 * Valor de dias usado para
 * calcularmos se falta pouco
 * para o próximo dia de piadas ruins
 * (faltam diasDePanico ou menos para o dia)
 * ou se falta bastante para o dia de piada
 * ruim (faltam mais que diasDePanico).
 */
const diasDePanico = 2

/**
 * O dia da semana em que teremos
 * piada ruim.
 *
 * Os dias da semana são:
 * 1 : segunda-feira
 * 2 : terça-feira
 * 3 : quarta-feira
 * 4 : quinta-feira
 * 5 : sexta-feira
 * 6 : sábado
 * 7 : domingo
 * 
 */
const diaDePiadaRuim = 5

/**
 * O horário de entrada no trabalho.
 * Consideramos esse horário para iniciarmos
 * o dia de piada (caso estejamos no dia de
 * piada ruim, as piadas começarão a partir
 * desse horário).
 */
const horarioEntrada = 8

/**
 * O horário de saída do trabalho.
 * Consideramos esse horário para finalizarmos
 * o dia de piada (caso estejamos no dia de
 * piada ruim, as piadas cessarão a partir
 * desse horário).
 */
const horarioSaida = 17

// O componente de dias
let daysComp    = null
// O componente de horas
let hoursComp   = null
// O componente de minutos
let minutesComp = null
// O componente de segundos
let secondsComp = null
// O componente de título (da página)
let titleComp   = null
// O componente do body da página
let bodyComp    = null
// O container com os horários
let timeBoxComp = null

// O componente de label dos dias
let daysLabelComp       = null
// O componente de label de horas
let hoursLabelComp      = null
// O componente de label de minutos
let minutesLabelComp    = null
// O componente de label de segundos
let secondsLabelComp    = null


// A regra de gradiente na imagem de fundo
const backgroundGradient =
  'linear-gradient(to bottom, rgba(255, 254, 254, 0.9), rgba(0, 0, 0, 0.7))'

// A imagem quando falta pouco para o 
// dia/horário de piada ruim
const almostImage = 'res/almost-time.jpg'
// A imagem quando estamos no dia/horário
// de piada ruim!
const nowImage = 'res/its-time.jpg'
// A imagem quando ainda falta bastante
// para o dia de piada ruim
const longtimeImage = 'res/long-time.jpg'

/**
 * Controla a visibilidade do container
 * com os componentes que exibem o tempo
 * restante.
 * 
 * @param {boolean} visible Se iremos habilitar/desabilitar a visibilidade do container que exibe o tempo restante
 */
const setTimerVisible = (visible) => {

    const visibility = visible ? 'flex' : 'none'

    timeBoxComp.style.display = visibility

}

/**
 * Define a imagem informada como imagem de fundo com gradiente
 * (vai clareando na parte superior).
 * 
 * @param {String} image O nome do arquivo de imagem que será definido como imagem de fundo
 */
const setBackgroundImage = (image) => {

    bodyComp.style['background-image']  = `${backgroundGradient}, url("${image}")`

}

/**
 * Define o título na página (se é dia de piada ruim, etc.)
 * 
 * @param {String} title O título na página
 */
const setTitle = (title) => {

    titleComp.innerHTML = title

}

/**
 * Ajusta texto das labels dependendo da quantidade de dias faltando para piada
 * ruim.
 * 
 * Se falta mais de um dia, então usamos texto no plural. Se falta menos que um dia,
 * texto fica no singular.
 * 
 * @param {Number|String} days Quantidade de dias que faltam para piada ruim
 * @param {Number|String} hours Quantidade de horas que faltam para piada ruim
 * @param {Number|String} minutes Quantidade de minutos que faltam para piada ruim
 * @param {Number|String} seconds Quantidade de segundos que faltam para piada ruim
 */
const adjustLabels = (
    days,
    hours,
    minutes,
    seconds
) => {

    // Se valor for diferente de 1, 
    // usamos plural (daí atende múltiplos e o zero)

    daysLabelComp.innerHTML     = Number(days) != 1 ? 'dias' : 'dia'
    hoursLabelComp.innerHTML    = Number(hours) != 1 ? 'horas' : 'hora'
    minutesLabelComp.innerHTML  = Number(minutes) != 1 ? 'minutos' : 'minuto'
    secondsLabelComp.innerHTML  = Number(seconds) != 1 ? 'segundos' : 'segundo' 

} 

/**
 * Calcula o tempo restante para o dia/horário
 * de piada ruim e atualiza os componentes de acordo.
 * 
 * Se o dia atual da semana for o indicado para dia de piada ruim e
 * o horário atual estiver dentro do intervalo de início/fim de
 * trabalho definido, então, atualiza os componentes para
 * indicar dia/horário de piada ruim. Caso contrário, atualiza
 * os componentes com o tempo restante para o próximo dia de 
 * piada ruim no horário especificado para início do trabalho.
 * 
 */
const calculateTime = () => {

    // Hoje
    const hoje = new Date()

    // é o dia de piada ruim e estamos dentro do intervalo de horário habilitado 😲 
    if (hoje.getDay() === diaDePiadaRuim && 
        horarioSaida > hoje.getHours() && 
        horarioEntrada <= hoje.getHours()) {

        // Definimos a imagem que é hoje
        setBackgroundImage(nowImage)
        // Definimos o título que é hoje
        setTitle(tituloDeuODia)
        // Escondemos o timer
        setTimerVisible(false)
        // Saímos fora do calculateTime()
        return

    }
    /*
     * Ou hoje num é sexta, ou 
     * já passou do horário de saída!
     */
    setTimerVisible(true)

    // Colocamos o título de
    // ainda falta
    setTitle(tituloAindaFalta)

    const proximoDia = new Date(hoje.getTime())

    let proximoDiaNoMes = proximoDia.getDate() + (diaDePiadaRuim + 7 - proximoDia.getDay()) % 7

    /* 
     * Ixe! Hoje É o dia de piada ruim 
     * mas já acabou o horário de trabalho
     * (ou nem começou ainda 🤦 )...
     * (o cálculo do próximo dia nos deu hoje 🤦)
     * Adicionamos sete dias no 'hoje' e boas
     */
    if (proximoDiaNoMes === hoje.getDate() && 
        horarioSaida <= hoje.getHours()) {

        proximoDiaNoMes += 7 // 🤷 

    }

    // Deu 'horarioEntrada' então começa o 
    // trabalho e vamos considerar que as 
    // piadas ruims já começarão também
    proximoDia.setHours(horarioEntrada)

    // Aos 0 minutos ...
    proximoDia.setMinutes(0)
    // ... nos 0 segundos!
    proximoDia.setSeconds(0)
    // Definimos o dia do mês
    // para p ŕoximo dia de
    // piadas ruins
    proximoDia.setDate(proximoDiaNoMes)

    // Faltam 'diasDePanico' ou menos para a próxima sexta
    if (proximoDiaNoMes - hoje.getDate() <= diasDePanico) {

        setBackgroundImage(almostImage)

    } else {

        // A próxima sexta tá longe
        setBackgroundImage(longtimeImage)

    }

    // Pegamos a diferença entre o próximo dia e hoje
    const diff = new Date(proximoDia.getTime() - hoje.getTime())

    // Calculamos os segundos faltantes
    const secondsToBadJoke = Math.floor(diff.getTime() / 1000) % 60
    // ... os minutos
    const minutesToBadJoke = Math.floor(diff.getTime() / 1000 / 60) % 60;
    // ... as horas! 🎉 
    const hoursToBadJoke = Math.floor(diff.getTime() / 1000 / 60 / 60) % 24;
    // ... e finalmente os dias!
    const daysToBadJoke = Math.floor(diff.getTime() / 1000 / 60 / 60 / 24);

    // Calculamos as labels...
    adjustLabels(
        daysToBadJoke,
        hoursToBadJoke,
        minutesToBadJoke,
        secondsToBadJoke
    )

    // Calculamos os segundos faltantes
    secondsComp.innerHTML = secondsToBadJoke
    // ... os minutos
    minutesComp.innerHTML = minutesToBadJoke
    // ... as horas! 🎉 
    hoursComp.innerHTML = hoursToBadJoke
    // ... e finalmente os dias! 🤞 
    daysComp.innerHTML = daysToBadJoke

}

/**
 * Recuperamos os componentes de contagem 
 * 
 * @param {*} doc O documento para recuperar os componentes html por 'query selector'
 */
const startComponents = (doc) => {
    daysComp    = doc.querySelector('#days-text')
    hoursComp   = doc.querySelector('#hours-text')
    minutesComp = doc.querySelector('#minutes-text')
    secondsComp = doc.querySelector('#seconds-text')
    titleComp   = doc.querySelector('#counter-title')
    timeBoxComp = doc.querySelector('#time-box')
}

/**
 * Recuperamos os componentes de label das contagens (dias, horas, etc.)
 * @param {*} doc O documento para recuperar os componentes html, de label, por 'query selector'
 */
const startLabelComponents = (doc) => {
    daysLabelComp    = doc.querySelector('#days-title')
    // console.log(`days %j`, daysLabelComp)
    hoursLabelComp   = doc.querySelector('#hours-title')
    // console.log(`hours %j`, hoursLabelComp)
    minutesLabelComp = doc.querySelector('#minutes-title')
    // console.log(`minutes %j`, minutesLabelComp)
    secondsLabelComp = doc.querySelector('#seconds-title')
    // console.log(`seconds %j`, secondsLabelComp)
}

// Quando carregar o document
document.addEventListener('DOMContentLoaded', function(evt) {

    // Iniciamos os componentes (pegamos eles do documento)
    startComponents(document)

    // Iniciamos o bodyComp com o body do documento
    bodyComp = document.body

    // Iniciamos os componentes de label (do documento)
    startLabelComponents(document)

    // Rodamos a função de cálculo agora...
    calculateTime()

    // ... e de 1 em 1 segundo
    setInterval(calculateTime, 1000)

})

