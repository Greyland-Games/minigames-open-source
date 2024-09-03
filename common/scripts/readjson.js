async function readjson(filename) {
    let response = await fetch(filename);
    let data = await response.json();
    return data
}
