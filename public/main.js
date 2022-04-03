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