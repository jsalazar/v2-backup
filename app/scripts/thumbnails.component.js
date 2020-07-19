export function thumbnails(data) {
    const thumbnailRoot = document.getElementById('thumbnailRoot');
    // let thumbGroupsContainer = [];

    for (let i = 0; i < data.length; i++) {        
        if (i % 4 === 0) {
            // create a container for each group of thumbnails
            let thumbGroup = document.createElement('div');
            thumbGroup.id = `tG${i}`;
            // thumbGroupsContainer.push(`tG${i}`);
            thumbGroup.classList.add('thumbGroup');
            // hide all thumbnail containers except for 1st one
            if (i !== 0) {
                thumbGroup.classList.add('group-hide');
            }
            thumbnailRoot.appendChild(thumbGroup);
        }
    }

    // thumbgroups have been created, now fill them with children
    hydrateThumbnails(data);
}

export function hydrateThumbnails(data) {
    // cache empty thumbnail containers
    const thumbGroups = document.querySelectorAll('.thumbGroup');

    // loop thru containers and append children to each
    Array.from(thumbGroups).forEach((group, current) => {
        
        // determine which thumbnails to append to our container 
        let indexStart = Number(group.id.replace('tG', ''));
        let indexEnd = (current == thumbGroups.length - 1) ? data.length : indexStart + 4;
        // create thumbnails and append them
        for (let i = indexStart; i < indexEnd; i++) {
            let thumbLink = document.createElement('a');
            thumbLink.href = '#';
            thumbLink.title = `${data[i].id}`;
            thumbLink.classList.add('thumbLink');
            if (i == 0) {
                // add active class to first thumbnail
                thumbLink.classList.add('active');
            }
            thumbLink.innerHTML = `<img src="images/thumbnails/${data[i].thumbnail}" alt="${data[i].id}" width="145" height="121" /><span>${data[i].id}</span>`;
            // add children to group container
            document.getElementById(group.id).appendChild(thumbLink);
        }

    });
}