
function build_text (DOM)
{
	var textDiv = getDiv ('text');

	var textNode = document.createTextNode(DOM.innerHTML);

	textDiv.appendChild(textNode);

	return textDiv;
}