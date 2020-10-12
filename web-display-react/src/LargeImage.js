import React from "react"

function LargeImage(url) {
    var active = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    document.addEventListener("touchstart", dragStart, false);
    document.addEventListener("touchend", dragEnd, false);
    document.addEventListener("touchmove", drag, false);

    document.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false);
    

    function dragStart(e) {
//console.log(e.target.id)
document.addEventListener("mousemove", drag, false);
      //var dragItem = document.querySelector("#"+e.target.id);
      var dragItem = document.getElementById(e.target.id)
console.log(dragItem)
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === dragItem) {
        active = true;
      }
    }

    function dragEnd(e) {
      document.removeEventListener("mousemove", drag, false);
      initialX = currentX;
      initialY = currentY;

      active = false;
    }

    function drag(e) {
      //var dragItem = document.querySelector("#"+e.target.id);
      var dragItem = document.getElementById(e.target.id)
      if (active) {
      
        e.preventDefault();
      
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        //(dragItem && setTranslate(currentX, currentY, dragItem))
        setTranslate(currentX, currentY, dragItem)
      }
    }

    function setTranslate(xPos, yPos, el) {
      if(el){
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
      }
    }
  return (
    <div id="outerContainer">
    <div id="container">
      <div id="item">

      </div>
    </div>
  </div>
  )
}
export default LargeImage;