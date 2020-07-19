import {thumbnails} from './thumbnails.component'
import {photos} from './photo.component'

export default function data(dataURL) {
    fetch(dataURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            thumbnails(data);
            photos(data);
        })
        .catch(function(err) {
            console.log('error: ' + err);
        });
}