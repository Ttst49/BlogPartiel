const usernameSignUp = document.querySelector('.usernameSignUp')
const passwordSignUp = document.querySelector('.passwordSignUp')
const inscriptionButton= document.querySelector('#send')



let baseUrl="https://esdexamen.tk/b1devweb/api"


function inscription(){
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
                }else{location.href="blogMainChat.html"}
            })
    })
}
}



inscription()
connexion()
