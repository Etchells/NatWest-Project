const carsList = document.querySelector('.cars-list');
const addCarForm = document.querySelector('.add-car-form');
let makeValue = document.getElementById('make-value');
let modelValue = document.getElementById('model-value');
let colourValue = document.getElementById('colour-value');
let regValue = document.getElementById('reg-value');
const btnSubmit = document.querySelector('.btn');

let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        // console.log(post);
        output += `
    <div class="card mt-4 col-md-6 bg-ligt">
    <div class="card-body" data-id=${post.id}>
        <h5 class="card-title">${post.make}</h5>
        <h6 class="card-subtitle1 mb-2 text-muted">${post.model}</h6>
        <h6 class="card-subtitle2 mb-2 text-muted">${post.colour}</h6>
        <h6 class="card-subtitle3 mb-2 text-muted">${post.reg}</h6>
        <p class="card-text"></p>
        <a href="#" class="card-link" id="update-car">Update</a>
        <a href="#" class="card-link" id="delete-car">Delete</a>
    </div>
</div>
`;
    });
    carsList.innerHTML = output;
}

// const url = 'http://localhost:9002/readfromdb';
const url = 'http://54.171.87.157:9002/readfromdb';
const url2 = 'http://localhost:9002/create';
const url3 = 'http://localhost:9002/delete';
const url4 = 'http://localhost:9002/update';

// Get - Read all the cars
// Method: Get
fetch(url)
    .then(res => res.json())
    // .then(data => console.log(data));
    .then(data => renderPosts(data))

carsList.addEventListener('click', (e) => {
    // console.log(e.target.id);
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-car';
    let updateButtonIsPressed = e.target.id == 'update-car';

    // console.log(e.target.parentElement.dataset.id)
    let id = e.target.parentElement.dataset.id;

    // Delete - Remove the existing car
    // Method: DELETE
    if (delButtonIsPressed) {
        // console.log('remove car')
        fetch(`${url3}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload()) // For some reason i am having to press delete twice for this to work
    }

    // Update - update the exsisting car
    // Method: Patch
    if (updateButtonIsPressed) {
        // console.log('update car')
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let subContent1 = parent.querySelector('.card-subtitle1').textContent;
        let subContent2 = parent.querySelector('.card-subtitle2').textContent;
        let subContent3 = parent.querySelector('.card-subtitle3').textContent;
        // console.log(subContent1);

        makeValue.value = titleContent;
        modelValue.value = subContent1;
        colourValue.value = subContent2;
        regValue.value = subContent3;
    }

    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        // console.log('car updated')
        fetch(`${url4}/${id}`, {
            // method: 'PATCH',
            method: 'PUT',
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                make: makeValue.value,
                model: modelValue.value,
                colour: colourValue.value,
                reg: regValue.value
            }),
        })
            .then(res => res.json())
            .then(() => location.reload())
    })

});
//--------------------------------------------------------------------------------------------------------------------
// Create - Insert new post
// Method: Post
addCarForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // console.log(makeValue.value);

    // console.log('Form submitted');
    // fetch(url2, {
    //     meth: 'POST',
    //     headers: {
    //         'content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         make: makeValue.value,
    //         model: modelValue.value,
    //         colour: colourValue.value,
    //         reg: regValue.value
    //     })
    // })

    let make = document.getElementById('make-value').value
    let model = document.getElementById('model-value').value
    let colour = document.getElementById('colour-value').value
    let reg = document.getElementById('reg-value').value
    fetch("http://localhost:9002/create", {
        method: 'POST',
        body: JSON.stringify({
            make: make,
            model: model,
            colour: colour,
            reg: reg
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })

        // Reset input fields to empty
        // make = "";
        // model = "";
        // colour = "";
        // reg = "";
        .then(() => location.reload())
})
//--------------------------------------------------------------------------------------------------------------------
