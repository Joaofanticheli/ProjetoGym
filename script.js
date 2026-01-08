//funções funçoes genericas
function showElements(elements) {
    elements.forEach(el => el.classList.remove("hidden"))
}
function hideElements(elements) {
    elements.forEach(el => el.classList.add("hidden"))
}
const mainContent = document.getElementById("main")
const treinoContent = document.getElementById("treino")
const mobilidadeContent = document.getElementById("mobilidade")
const alimentacaoContent = document.getElementById("alimentacao")
const logBox = document.getElementById("logBox");
const enviar = document.getElementById("criar");
const esqueceu = document.getElementById("esqueceu");
const loginMenu = document.getElementById("login");
const logadoMenu = document.getElementById("logado");
const motivation = document.getElementById("text-motivation");
const question = document.getElementById("question");
const mainPages = [mainContent, treinoContent, mobilidadeContent, alimentacaoContent]
const boxForms = [logBox, enviar, esqueceu];
const navBarMenus= [loginMenu, logadoMenu];
const mainContentText = [motivation, question];
function changeUI(pageToShow, pageToHide){
    pageToHide.forEach(p => hideElements([p]))
    if (pageToShow !== null){showElements([pageToShow])}
}
const toastContainer = document.getElementById("toast-container");
function notifyUser(container, mensagem){
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = mensagem;
    container.appendChild(toast);
    const timeoutId1 = setTimeout(() => {toast.remove();}, 3000);
    toast.addEventListener("click", () => {
        clearTimeout(timeoutId1);
        toast.remove();})
}
//pergunta inicial
const awnserbtn = document.getElementById("awnser-btn");
const update={
    motivationStatus: false,
    logBoxStatus:false
};
awnserbtn.addEventListener("click", () => {handleInitialItention()})
function handleInitialItention(){
    update.motivationStatus = true
    orchestratorInitialPage()
}
function orchestratorInitialPage(){
    if(update.motivationStatus === true)
        {
            toggleMotivationUI()
            notifyUser(toastContainer, "boa decisão, crie sua conta")
        }
}
function toggleMotivationUI(){
    changeUI(motivation, mainContentText)
    changeUI(loginMenu, navBarMenus)
}
// logBox open-close
const loginbtn = document.getElementById("login-btn");
const logCloseBtn = document.getElementById("logCloseBtn");
loginbtn.addEventListener("click", handleLogBoxIntention)
logCloseBtn.addEventListener("click",  handleClosebtnIntention)
function handleLogBoxIntention(){
    update.logBoxStatus = !update.logBoxStatus
    orchestratorLogBox()
}
function handleClosebtnIntention(){
    update.logBoxStatus = false
    closeLogBox()
}
function orchestratorLogBox(){
    if(update.logBoxStatus === true)
        {
            openLogbox()
        }
    else
        {
            closeLogBox()
        }
}
function openLogbox(){  
    changeUI(logBox, boxForms) 
}
function closeLogBox(){
    changeUI(null, boxForms)
}
// logBox entrar
function getLoginRegistered(){
    const usuarios = localStorage.getItem("usuarios");
    return usuarios ? JSON.parse(usuarios) : [];
}
function authenticateLogin(listaDeLogins, usuarioLogin){
    return listaDeLogins.find(cadastrado =>(cadastrado.email=== usuarioLogin.email && cadastrado.senha === usuarioLogin.senha))   
}
logBox.addEventListener("submit", (e)=>{
    e.preventDefault()
    const listaDeLogins = getLoginRegistered()
    const usuarioLogin = {
        email: document.getElementById("email-login").value,
        senha: document.getElementById("senha-login").value
    }
    orchestratorloginMenu(usuarioLogin, listaDeLogins, e)
})
function orchestratorloginMenu(usuarioLogin, listaDeLogins, e){
    getLoginsValue(usuarioLogin, listaDeLogins)
    e.target.reset();
}
function getLoginsValue(usuarioLogin, listaDeLogins){ 
    if( usuarioLogin.email !== "" && usuarioLogin.senha !== "")
        {   
            const loginAutenticado = authenticateLogin(listaDeLogins, usuarioLogin)
            goodSession(loginAutenticado)
        }
    else
        {
            fillAllInputs();
        }

}
function goodSession(loginAutenticado){
    if (loginAutenticado)
        {   
            alertRightLogin();
            orchestratorNavBarMenu();
        } 
    else 
        {
            wrongLogin()
        }
}
function wrongLogin(){
    notifyUser(toastContainer, "login inexistente")
}
function alertRightLogin(){
    notifyUser(toastContainer, "boa sessão");
}
// troca do Navbar menu
let navBarMenuStatus = false
function toggleNavBarMenuStatus(){
    navBarMenuStatus = !navBarMenuStatus
}
function orchestratorNavBarMenu(){
    toggleNavBarMenuStatus()
    changeNavBarMenu()
}
function changeNavBarMenu(){
    if(navBarMenuStatus == true)
        {
            changeToLogado()
        }
    else
        {
            changeToLogout()
        }
}
function changeToLogado(){
    changeUI(null, boxForms)
    changeUI(logadoMenu, navBarMenus)
}
function changeToLogout(){
    changeUI(loginMenu, navBarMenus)
}
// LogBox criar
const criar = document.getElementById("logBox-criar-btn");
let criarStatus = false
criar.addEventListener("click", orchestratorCriarform)
function orchestratorCriarform(){
    criarStatus = true
    showCriarBox()
}
function showCriarBox(){
    if(criarStatus === true)
        {
            changeUI(enviar, boxForms)
        }
    else
        {
            changeUI(null, boxForms)
        }
}
// logBox esqueceu
const esqueceubtn = document.getElementById("logBox-esqueceu-btn");
let esqueceuStatus = false
esqueceubtn.addEventListener("click", orchestratorEsqeuceuForm)
function orchestratorEsqeuceuForm(){
    esqueceuStatus = true
    showEsqueceuBox()
}
function showEsqueceuBox(){
    if(esqueceuStatus === true)
        {
            changeUI(esqueceu, boxForms)
        }
    else
        {
            changeUI(null, boxForms)
        }
}
// criar a conta
enviar.addEventListener("submit", (e)=>{
    e.preventDefault()
    const usuarioCadastro = {
        nome: document.getElementById("nome").value,
        idade: Number(document.getElementById("age").value),
        peso: Number(document.getElementById("weight").value),
        altura: Number(document.getElementById("size").value),
        freq: Number(document.getElementById("freq").value),
        sexo: document.getElementById("sexo").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("password").value,
        confirmar: document.getElementById("confirma").value
    }
    getUserInfos(usuarioCadastro)
})
function getUserInfos(usuarioCadastro){
    if(geResultsOfInputs(usuarioCadastro))
        {
            confirm(usuarioCadastro);
            target.reset();
        }    
    else
        {   
            fillAllInputs()
        }

}
function confirm(usuarioCadastro){   
    if(seePasswords(usuarioCadastro))
        { 
            toggleMenuScreen(usuarioCadastro)
        }
    else
        {   
            passwordNotEqual()
        }
}
function toggleMenuScreen(usuarioCadastro){
    changeUI(logadoMenu, navBarMenus)
    changeUI(null, boxForms)
    calculateTBM(usuarioCadastro)          
}        
function signUp(usuarioCadastro, tbm){
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    pushUserInfos(usuarioCadastro, tbm, usuarios)
    localStorage.setItem("usuarios", JSON.stringify(usuarios)
    )
}
function geResultsOfInputs(usuarioCadastro){
    return usuarioCadastro.nome !=="" && !isNaN(usuarioCadastro.idade) && !isNaN(usuarioCadastro.peso) && !isNaN(usuarioCadastro.altura) && !isNaN(usuarioCadastro.freq)
        && usuarioCadastro.sexo !=="" && usuarioCadastro.email !=="" && usuarioCadastro.senha !=="" && usuarioCadastro.confirmar !==""
}
function fillAllInputs(){
    notifyUser(toastContainer, "Preencha todos os campos");
}
function passwordNotEqual(){
    notifyUser(toastContainer, "As senhas não estão batendo")
}
function seePasswords(usuarioCadastro){
    return usuarioCadastro.confirmar== usuarioCadastro.senha
}
function whichSex(usuarioCadastro){
    return usuarioCadastro.sexo === "masculino"
}
function calculateTBM(usuarioCadastro){
    let tbm = 0;
    if(whichSex(usuarioCadastro))
        {
            tbm =(10 * usuarioCadastro.peso) + (6.25 * usuarioCadastro.altura) - (5 * usuarioCadastro.idade) + 5 
        }
    else{
            tbm =(10 * usuarioCadastro.peso) + (6.25 * usuarioCadastro.altura) - (5 * usuarioCadastro.idade) - 161 
        }
    tellTBM(usuarioCadastro, tbm)
    signUp(usuarioCadastro, tbm)   
}
function tellTBM(usuarioCadastro, tbm){
    notifyUser(toastContainer, "Olá "+ usuarioCadastro.nome +" o seu TBM é "+ tbm)
}
function pushUserInfos(usuarioCadastro, tbm, usuarios){
usuarios.push({
        nome: usuarioCadastro.nome,
        email: usuarioCadastro.email,
        senha: usuarioCadastro.senha,
        idade: usuarioCadastro.idade,
        tbm: tbm
    })
}
// recuperar conta

// troca de content page
const treinobtn = document.getElementById("treino-btn")
const mobilidadebtn = document.getElementById("mobilidade-btn")
const alimentacaobtn = document.getElementById("alimentacao-btn")
const logoutbtn = document.getElementById("logout-btn")
logoutbtn.addEventListener("click", ()=>{
    changeUI(mainContent, mainPages)
    changeUI(loginMenu, navBarMenus)
})
treinobtn.addEventListener("click", ()=>{
    changeUI(treinoContent, mainPages)
});
mobilidadebtn.addEventListener("click", ()=>{
    changeUI(mobilidadeContent, mainPages)
});
alimentacaobtn.addEventListener("click", ()=>{
    changeUI(alimentacaoContent, mainPages)
});
//