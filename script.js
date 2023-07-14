let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");

function generateQR(){

  qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value;

  console.log(qrImage.height);

  if(qrText.value.length > 0){

    imgBox.classList.add("show-img");

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width=qrImage.width;
    canvas.height=qrImage.height;

    context.drawImage(qrImage,0,0);
    
    const pieceWidth = canvas.width/10;
    const pieceHeight = canvas.height/10;

    for(let i=0;i<10;i++){

        for(let j=0;j<10;j++){

            const pieceCanvas = document.createElement('canvas');
            const pieceContext = pieceCanvas.getContext('2d');

            pieceCanvas.width = pieceWidth;
            pieceCanvas.height = pieceHeight;

            const sourceX = j * pieceWidth;
            const sourceY = i * pieceHeight;
            const sourceWidth = pieceWidth;
            const sourceHeight = pieceHeight;

            // Calculate the destination rectangle on the canvas for the current piece
            const destX = j * pieceWidth;
            const destY = i * pieceHeight;
            const destWidth = pieceWidth;
            const destHeight = pieceHeight;

            // Copy the piece from the image onto the canvas
            pieceContext.drawImage(qrImage, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

            pieceCanvas.dataset.index = i*10 + j;

            imgBox.appendChild(pieceCanvas);

        }

    }

    const check=document.querySelector('[data-index="${13}"]');

    imgBox.removeChild(qrImage);

    // imgBox.appendChild(check);

  }
  else{
    qrText.classList.add("error");
    setTimeout(()=>{
      qrText.classList.remove("error");
    },1000);
  }

}
