document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const canvasContainer = document.querySelector('#canvas_container');
    const imageCanvas = document.getElementById('imageCanvas');
    const jsonOutput = document.getElementById('jsonOutput');
    const generateButton = document.getElementById('generateButton');
    const exportButton = document.getElementById('exportButton');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
    const sourceLinkInput = document.getElementById('sourceLinkInput');
    const notification = document.getElementById('notification');
    const ctx = imageCanvas.getContext('2d');
    let image = new Image();
    let isDrawing = false;
    let startX, startY, endX, endY;
    let originalImageWidth, originalImageHeight;
    let jsonObjects = [];
    let prodCount = 1;

    imageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });

    image.onload = function () {
        originalImageWidth = image.width;
        originalImageHeight = image.height;
    
        imageCanvas.width = originalImageWidth;
        imageCanvas.height = originalImageHeight;
    
        ctx.drawImage(image, 0, 0, originalImageWidth, originalImageHeight);
    
        // Show canvas container and product forms
        document.getElementById('canvas_container').style.display = 'block';
        document.getElementById('productForms').style.display = 'block';
    };
    

    const inputChoice = document.getElementById('inputChoice');
    const jsonInputFormat = document.getElementById('jsonInputFormat');
    const normalInputFormat = document.getElementById('normalInputFormat');

    inputChoice.addEventListener('change', function () {
        if (inputChoice.value === 'json') {
            jsonInputFormat.style.display = 'block';
            normalInputFormat.style.display = 'none';
        } else {
            jsonInputFormat.style.display = 'none';
            normalInputFormat.style.display = 'block';
        }
    });

    imageCanvas.addEventListener('mousedown', function (event) {
        if (!isDrawing) {
            startX = event.offsetX;
            startY = event.offsetY;
            isDrawing = true;
        } else {
            endX = event.offsetX;
            endY = event.offsetY;
            drawRectangle(prodCount);
            generateJavaScriptObject();
            isDrawing = false;
        }
    });

    copyButton.addEventListener('click', function () {
        jsonOutput.select();
        document.execCommand('copy');
        showNotification('JavaScript objects copied to clipboard!');
    });

    generateButton.addEventListener('click', function () {
        updateJSONOutput();
    });

    exportButton.addEventListener('click', function () {
        exportJSON();
    });

    clearButton.addEventListener('click', function () {
        clearCanvas();
        clearJSONOutput();
    });

    function drawRectangle(count) {
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(image, 0, 0, originalImageWidth, originalImageHeight);

        jsonObjects.forEach((obj, index) => {
            const [x1, y1, x2, y2] = obj.coords.split(',').map(Number);
            drawSingleRectangle(x1, y1, x2, y2, index + 1);
        });

        drawSingleRectangle(startX, startY, endX, endY, count);
    }

    function drawSingleRectangle(x1, y1, x2, y2, count) {
        const canvasRect = imageCanvas.getBoundingClientRect();
        const canvasScaleX = originalImageWidth / canvasRect.width;
        const canvasScaleY = originalImageHeight / canvasRect.height;

        const scaledX1 = x1 * canvasScaleX;
        const scaledY1 = y1 * canvasScaleY;
        const scaledWidth = (x2 - x1) * canvasScaleX;
        const scaledHeight = (y2 - y1) * canvasScaleY;

        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.fillRect(scaledX1, scaledY1, scaledWidth, scaledHeight);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.font = '16px Arial';
        ctx.fillText(`Product ${count}`, scaledX1 + 5, scaledY1 + 20);
    }

    function generateJavaScriptObject() {
        const coords = `${startX},${startY},${endX},${endY}`;
        const objectLiteral = {
            "shape": "rect",
            "coords": coords,
            "alt": "Product" + prodCount,
            "href": "#",
            "dataInfo": "Product" + prodCount,
            "link1": "link1",
            "link2": "link2"
        };

        jsonObjects.push(objectLiteral);

        const productForms = document.getElementById('productForms');
        const formHTML = `
            <div id="productForm${prodCount}">
                <h3>Product ${prodCount}</h3>
                <label for="dataInfo${prodCount}">Data Info:</label>
                <input type="text" id="dataInfo${prodCount}" name="dataInfo${prodCount}" value="${objectLiteral.dataInfo}">
                <br>
                <label for="link1${prodCount}">Link 1:</label>
                <input type="text" id="link1${prodCount}" name="link1${prodCount}" value="${objectLiteral.link1}">
                <br>
                <label for="link2${prodCount}">Link 2:</label>
                <input type="text" id="link2${prodCount}" name="link2${prodCount}" value="${objectLiteral.link2}">
            </div>
        `;
        productForms.insertAdjacentHTML('beforeend', formHTML);

        // Add event listeners to handle input changes
        document.getElementById(`dataInfo${prodCount}`).addEventListener('input', updateProductData.bind(null, prodCount - 1, 'dataInfo'));
        document.getElementById(`link1${prodCount}`).addEventListener('input', updateProductData.bind(null, prodCount - 1, 'link1'));
        document.getElementById(`link2${prodCount}`).addEventListener('input', updateProductData.bind(null, prodCount - 1, 'link2'));

        prodCount++;
        updateJSONOutput();
    }

    function updateProductData(index, key, event) {
        jsonObjects[index][key] = event.target.value;
        updateJSONOutput();
    }

    function prepareJSONData() {
        const rank = document.getElementById('rankInput').value;
        const sourceLink = sourceLinkInput.value;
        let jsonWithRank;

        if (inputChoice.value === 'json') {
            const inputData = document.getElementById('inputData').value.trim();
            if (inputData) {
                try {
                    jsonWithRank = JSON.parse(inputData);
                    jsonWithRank = {
                        id: jsonWithRank.id || `owner${rank}`,
                        ...jsonWithRank,
                        contact: jsonWithRank.contact || "N/A",
                        sourceLink: jsonWithRank.sourceLink || sourceLink,
                        imagePath: jsonWithRank.imagePath || "assets/placeholder.jpg",
                        products: jsonWithRank.products || jsonObjects
                    };
                    jsonWithRank.id = `owner${rank}`;
                    jsonWithRank.name = jsonWithRank.name || "";
                    jsonWithRank.category = jsonWithRank.category || "";
                    jsonWithRank.description = jsonWithRank.description || "";
                    jsonWithRank.basedIn = jsonWithRank.basedIn || "";
                    jsonWithRank.website = jsonWithRank.website || "";
                    jsonWithRank.followers = jsonWithRank.followers || "";
                    jsonWithRank.popularContent = jsonWithRank.popularContent || "";
                } catch (error) {
                    console.error('Invalid JSON format');
                    jsonWithRank = {
                        "id": `owner${rank}`,
                        "name": "",
                        "category": "",
                        "description": "",
                        "basedIn": "",
                        "website": "",
                        "followers": "",
                        "popularContent": "",
                        "contact": "N/A",
                        "sourceLink": sourceLink,
                        "imagePath": "assets/placeholder.jpg",
                        "products": jsonObjects
                    };
                }
            } else {
                jsonWithRank = {
                    "id": `owner${rank}`,
                    "name": "",
                    "category": "",
                    "description": "",
                    "basedIn": "",
                    "website": "",
                    "followers": "",
                    "popularContent": "",
                    "contact": "N/A",
                    "sourceLink": sourceLink,
                    "imagePath": "assets/placeholder.jpg",
                    "products": jsonObjects
                };
            }
        } else {
            jsonWithRank = {
                "id": `owner${rank}`,
                "name": document.getElementById('nameInput').value || "",
                "category": document.getElementById('categoryInput').value || "",
                "description": document.getElementById('descriptionInput').value || "",
                "basedIn": document.getElementById('basedInInput').value || "",
                "website": document.getElementById('websiteInput').value || "",
                "followers": document.getElementById('followersInput').value || "",
                "popularContent": document.getElementById('popularContentInput').value || "",
                "contact": "N/A",
                "sourceLink": sourceLink,
                "imagePath": "assets/placeholder.jpg",
                "products": jsonObjects
            };
        }

        return jsonWithRank;
    }

    function updateJSONOutput() {
        const jsonWithRank = prepareJSONData();
        jsonOutput.value = JSON.stringify(jsonWithRank, null, 2);
    }

    function exportJSON() {
        const jsonWithRank = prepareJSONData();
        const filename = `owner${rank}.json`;
        const blob = new Blob([JSON.stringify(jsonWithRank, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        ctx.drawImage(image, 0, 0, originalImageWidth, originalImageHeight);
        jsonObjects = [];
        prodCount = 1;
        document.getElementById('productForms').innerHTML = '';
    }

    function clearJSONOutput() {
        jsonOutput.value = '';
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }
});
