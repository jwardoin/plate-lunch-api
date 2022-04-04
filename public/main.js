const recommendSelection = document.querySelectorAll('.recommend')

Array.from(recommendSelection).forEach(selection => selection.addEventListener('click', recommendPLS))

async function recommendPLS(){
    const rName = this.parentNode.childNodes[1].innerText
    const recommendations = Number(this.parentNode.childNodes[5].innerText)
    console.log(rName)
    console.log(recommendations)
    try {
        const response = await fetch('addRecommendation', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'restaurantName': rName,
                'recommendedBy': recommendations
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    
    }
    catch(err){
        console.error(err)
    }
}

const deleteText = document.querySelectorAll('.del')

Array.from(deleteText).forEach(elem => elem.addEventListener('click', deletePLS))

async function deletePLS() {
    const rName = this.parentNode.childNodes[1].innerText
    console.log(rName)
    try {
        const response = await fetch('deletePLS', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'restaurantName': rName
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}