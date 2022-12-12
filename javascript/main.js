const usernameSignIn = document.querySelector('.usernameSignIn')
const usernameSignUp = document.querySelector('.usernameSignUp')
const passwordSignIn = document.querySelector('.passwordSignIn')
const passwordSignUp = document.querySelector('.passwordSignUp')
const inscriptionButton= document.querySelector('#send')
const connexionButton = document.querySelector('#connection')


let baseUrl="https://esdexamen.tk/b1devweb/api"

let token="bonjur"

if (inscriptionButton===null){
    console.log('no worry')
}else {
    inscriptionButton.addEventListener('click',()=>{
        let body={
            username:`${usernameSignUp.value}`,
            password:`${passwordSignUp.value}`
        }
        let fetchParams={
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type":"application/json"}

        }
        console.log(fetchParams)
        console.log(usernameSignUp.value,passwordSignUp.value)
        fetch(`${baseUrl}/registeruser`,fetchParams)
            .then(responseSerialise=>responseSerialise.json())
            .then(responseDeserialise=>{
                if(responseDeserialise=== "username already taken"){
                    alert("Nom d'utilisateur déja utilisé")
                }else{location.href="signIn.html"}
            })
    })
}

if (connexionButton===null){
    console.log('no worry')

}else{
connexionButton.addEventListener('click',()=>{
        let body={
            username:`${usernameSignIn.value}`,
            password:`${passwordSignIn.value}`
        }
        let fetchParams={
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-Type":"application/json"}

        }
        console.log(fetchParams)
        console.log(usernameSignIn.value,passwordSignIn.value)
        fetch(`${baseUrl}/login_check`,fetchParams)
            .then(responseSerialise=>responseSerialise.json())
            .then(responseDeserialise=>{
                if(responseDeserialise.message=== "Invalid credentials."){
                    alert("Vous vous êtes trompé quelque part visiblement 乁(⪨╭╮⪩)ㄏ")
                }else{
                    token= responseDeserialise
                    location.href="blogMainChat.html"
                }
            })
    })
}

export let newtoken=[token]