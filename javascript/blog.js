const requetePost = new XMLHttpRequest();
const fil = document.querySelector('.filAccueil')
const boutonafficher = document.querySelector('.boutonAfficher')
const boutonEnvoyer = document.querySelector('.envoyer')
const textMessage = document.querySelector('#textMessage')
const connexionButton = document.querySelector('#connection')
const usernameSignIn = document.querySelector('.usernameSignIn')
const passwordSignIn = document.querySelector('.passwordSignIn')
const signUpZone =document.querySelector('.signUp')
const boutonSuppr = document.querySelector('.suppr')
const afficher= document.querySelector('.afficher')


let allMessages=""
let usernameLogged=""
let passwordLogged=""
let baseUrl="https://esdexamen.tk/b1devweb/api"
let token=""
let affichageButton=`<button class="btn btn-danger boutonAfficher"></button>`
let body={
    username:`${usernameLogged}`,
    password:`${passwordLogged}`
}
let fetchParamsDelete={
    method: "DELETE"
}


boutonEnvoyer.addEventListener("click", () => {

    requetePost.open("POST", `${baseUrl}/post`, true);
    requetePost.setRequestHeader('Content-Type', 'application/json');
    requetePost.setRequestHeader('Authorization', `Bearer ${token}`)
    requetePost.send(JSON.stringify({
        content: textMessage.value
    }));
    clearMessageZone(textMessage)
    setTimeout(fil.innerHTML=allMessages,2000)
})
boutonafficher.addEventListener('click',()=>{
    getMessages()
    clearMessageFil()
    fil.innerHTML=allMessages
    setTimeout("scrollBy(0,100000)",1000)


})


function getMessages(){
    fetch(`${baseUrl}/posts`)
        .then(responseSerialise=> responseSerialise.json())
        .then(posts=>{
            posts["hydra:member"].forEach(post=>{
                    templatePostErasble(post)
                post.comments.forEach(comment=>{
                        templateCommentErasble(comment)

                })

            })
        })
}

function templatePostErasble(post){
    let template=`
    <div class="card text-center">
  <div class="card-header post">
    ${post.user.username}
    </div>  
    n°${post.id}
  <div class="card-body carte">
    <h5 class="card-title">Post</h5>
    <p class="card-text">${post.content}</p>
  </div>
     <button class="suppr btn btn-danger">supprimer</button>
  <div class="card-footer text-muted">
  <input type="text" name="commentaire" id="commentZone" >
  <button class="btn btn-success boutonComment">Envoyer</button>
  </div>
</div>`

    allMessages += template

}

function templateCommentErasble(comment){
    let template=`
    <div class="card text-center carteCommentaire">
  <div style="color: white" class="card-header">
    ${comment.user.username}
  </div>
  n°${comment.id}
  <div class="card-body carteCommentaire">
    <h5 style="color: white" class="card-title">Commentaire</h5>
    <p style="color: white" class="card-text">${comment.content}</p>
  </div>
       <button class="suppr btn btn-danger">supprimer</button>
</div>`

    allMessages +=template
}

function clearMessageZone(message){
    message.value=""
}

function clearMessageFil(){
    fil.innerHTML=""
}

function addComment(){
    const commentZone = document.querySelector('#commentZone')
    const boutonComment= document.querySelector('.boutonComment')

    boutonComment.addEventListener('click',()=>{
        requetePost.open("POST", `${baseUrl}/comment/${post.id}`, true);
        requetePost.setRequestHeader('Content-Type', 'application/json');
        requetePost.setRequestHeader('Authorization', `Bearer ${token}`)
        requetePost.send(JSON.stringify({
            content: commentZone.value
        }));
        clearMessageZone(commentZone)

    })
}

function connexion(){
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
                        usernameLogged=usernameSignIn.value
                        passwordLogged= passwordSignIn.value
                        signUpZone.innerHTML=""
                        getMessages()
                        clearMessageFil()
                        fil.innerHTML=allMessages
                        setTimeout("scrollBy(0,100000)",1000)
                        afficher.innerHTML+=affichageButton
                        return token = responseDeserialise.token
                    }
                })

        })
    }
}

function supprimerPost(post){
    if (post.user.username===usernameLogged){
        boutonSuppr.addEventListener('click',()=>{
            fetch(`${baseUrl}/post/${post.id}`,fetchParamsDelete)
                .then(responseSerialise=>responseSerialise.json())
                .then(responseDeserialise=>responseDeserialise)
        })
    }
}

getMessages()
connexion()
addComment()
supprimerPost(142)