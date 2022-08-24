function id(id) {
    return document.getElementById(id)
}
function addLinkPreview() {
    id('addLinkPreviewTitle').innerText = id('title').value
    id('addLinkPreviewLink').href = id('link').value
    id('addLinkPreview').style.backgroundColor = id('bg').value
    id('addLinkPreviewLink').style.color = id('text').value
}
function addModalData(linkId, title, link, bg, text) {
    id('linkId').value = linkId
    id('uTitle').value = title
    id('uLink').value = link
    id('uBg').value = bg
    id('uText').value = text
    id('updateLinkPreviewTitle').innerText = title
    id('updateLinkPreviewLink').href = link
    id('updateLinkPreview').style.backgroundColor = bg
    id('updateLinkPreviewLink').style.color = text
}
function updateLinkPreview() {
    id('updateLinkPreviewTitle').innerText = id('uTitle').value
    id('updateLinkPreviewLink').href = id('uLink').value
    id('updateLinkPreview').style.backgroundColor = id('uBg').value
    id('updateLinkPreviewLink').style.color = id('uText').value
}
function updateUserPreview() {
    id('userPreview').style.backgroundColor = id('bg').value
    id('userPreviewText').style.color = id('text').value
}