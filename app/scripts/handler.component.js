export function handler() {
    // single handler for all clicks
    const handlerRoot = document.getElementById('thumbnailContainer');
    const previousButton = document.getElementById('previous');
    const nextButton = document.getElementById('next');
    const thumbGroupsContainer = document.querySelectorAll('.thumbGroup');
    const thumbContainerLength = thumbGroupsContainer.length;
    let currentIndex = 0;
    let showGroup = 0;

    handlerRoot.addEventListener('click', event => {
        const eT = event.target;
        // handler for thumbnail links
        if (eT.parentNode.classList.contains('thumbLink')) {
            // remove active class from all links
            document.querySelectorAll('.thumbLink').forEach(tLink => {
                tLink.classList.remove('active')
            });
            // add active class to current selection
            eT.parentNode.classList.add('active');
 
            // hide all large image groups
            document.querySelectorAll('.largeGroup').forEach(largeImage => {
                largeImage.classList.add('group-hide')
            });
            
            // show selected large image group  
            document.getElementById(eT.parentNode.title).classList.remove('group-hide');
            event.preventDefault();
        }

        // handler for prev/next carousel links
        if (eT.classList.contains('previous') || eT.classList.contains('next')) {
            // get index of visible group, then hide it
            Array.from(thumbGroupsContainer).forEach((group, current) => {
                let currentGroup = document.getElementById(group.id);
                if (!currentGroup.classList.contains('group-hide')) {
                    currentIndex = current;
                    currentGroup.classList.add('group-hide');
                } 
            });

            if (eT.classList.contains('next')) {
                // calculate next group to display - not circular
                showGroup = (currentIndex == thumbContainerLength - 1) ? thumbContainerLength - 1 : currentIndex + 1;
                // enable prev button
                previousButton.classList.remove('disabled');

                if (currentIndex == thumbContainerLength - 2) {
                    // disable button
                    nextButton.classList.add('disabled');
                }
            }
            else {
                // calculate previous group to display - not circular
                showGroup = (currentIndex == 0) ? 0 : currentIndex - 1;
                // enable next button
                nextButton.classList.remove('disabled');
                
                if (currentIndex == 1) {
                    // disable button
                    previousButton.classList.add('disabled');
                }

            }
            console.log(thumbGroupsContainer[showGroup].id)
            // show prev or next thumbnail group  
            document.getElementById(thumbGroupsContainer[showGroup].id).classList.remove('group-hide');
        }
        
        event.preventDefault();
    });
}