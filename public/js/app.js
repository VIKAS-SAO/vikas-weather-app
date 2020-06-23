 
const weatherform =document.querySelector('form')
const input =document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')


weatherform.addEventListener('submit',function(e){
    e.preventDefault()
    const search=input.value

    message1.textContent='Loading ...'
    message2.textContent=' ...'
    fetch('/weather?address='+search).then(function(response){
        response.json().then(function(data){
            console.log(data)
            if(data.error){
                   message1.textContent=data.error 
            }
            else{
                message2.textContent=data.forecast 
                message1.textContent=data.location 


            }


        })
    })
    
})
 