export function photos(data) {
    let largeContainer = document.getElementById('largeRoot');

    for (let i = 0; i < data.length; i++) {
        
        // greate group and add id to group and store in array
        let largeGroup = document.createElement('div');
            largeGroup.id = data[i].id;
            largeGroup.classList.add('largeGroup');
            largeGroup.classList.add('row');
            // hide all large photos except 1st one onLoad
            if (i !== 0) {
                largeGroup.classList.add('group-hide');
            }
            largeGroup.innerHTML = `
            <div class="col-7 largePhoto"><img src="images/large/${data[i].image}" alt="${data[i].title}" /></div>
            <div class="col-5 details">
                <p><strong>Title</strong> ${data[i].title}</p>
                <p><strong>Description</strong>  ${data[i].description}</p>
                <p><strong>Cost</strong> ${data[i].cost}</p>
                <p><strong>ID #</strong> ${data[i].id}</p>
                <p><strong>Thumbnail File</strong> ${data[i].thumbnail}</p>
                <p><strong>Large Image File</strong> ${data[i].image}</p>
            </div>
            `;

        largeContainer.appendChild(largeGroup);

    }
}