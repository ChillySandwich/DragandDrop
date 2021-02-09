import React, { Component, createRef, useCallback, useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Text, Ellipse, Image, Transformer } from "react-konva";
import Konva from "konva";
import roadCone from "./Components/roadCone.png"
import useImage from 'use-image';
import { v4 as uuidv4 } from 'uuid';
import { FaImage } from "react-icons/fa";
import ImageContainer from "./Components/ImageContainer"

const STANDARD_RECTANGLE_DRAG = (
  e, idx, rectanglePosition,
  setRectanglePosition,
  userHazards, setUserHazards, draggableRef) => {

  setRectanglePosition({
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
  })
  // puts rectangle back to original position (on top of static rectangle)
  var rect = draggableRef.current;
  rect.position({
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
  });

  // Update the position of the rectangle in question
  console.log(idx);

  let userHazardsUpdate = {
    ...userHazards,
    rectangles: userHazards.rectangles.map((eachRect, currentIdx) => {
      if (currentIdx !== idx) {
        return eachRect;
      }
      return {
        x: e.target._lastPos.x,
        y: e.target._lastPos.y,
        strokewidth: 0.5,
        stroke: "black",
        width: 25,
        height: 25,
        fill: "black",
        idx: idx
      }
    })
  }

  setUserHazards(userHazardsUpdate);
}

const STANDARD_RECTANGLE_DELETE = (
  e, idx, eachRect, userHazards, setUserHazards) => {
  console.log('Delete idx: ', idx);

  // update the user hazards
  let userHazardsUpdate = {
    ...userHazards,

    // loop through all the rectangles
    rectangles: userHazards.rectangles.filter(rectangle => {
      // if the rectangle ID is not equal to the idx which was clicked, return
      return rectangle.idx !== idx;
    })
  }

  console.log('Pre-delete update: ', userHazardsUpdate)
  setUserHazards(userHazardsUpdate);
}




const TOOLBAR_RECTANGLE_DRAG = (
  e, idx, rectanglePosition,
  setRectanglePosition,
  userHazards, setUserHazards, draggableRef) => {

  setRectanglePosition({
    x: rectanglePosition.x,
    y: rectanglePosition.y
  })
  // puts rectangle back to original position (on top of static rectangle)
  var rect = draggableRef.current;
  rect.position({
    x: rectanglePosition.x,
    y: rectanglePosition.y
  });

  //creates a new rectangle, using the last coordinates of where the mouse was let go
  let newRect = {
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
    strokewidth: 0.5,
    stroke: "black",
    width: 25,
    height: 25,
    fill: "black",
    idx: uuidv4()
  }

  let userHazardsUpdate = {
    ...userHazards,
    rectangles: [...userHazards.rectangles, newRect]
  }

  console.log(userHazardsUpdate);
  setUserHazards(userHazardsUpdate);
}


const STANDARD_ELLIPSE_DELETE = (e, idx, eachEllips, userHazards, setUserHazards) => {
  console.log(idx);

  let userHazardsUpdate = {
    ...userHazards,
    ellipses: userHazards.ellipses.filter(ellipses => {
      console.log(ellipses);
      console.log(idx);
      return ellipses.idx !== idx;
    })
  }
  setUserHazards(userHazardsUpdate);
}

const STANDARD_ELLIPSE_DRAG = (
  e, idx, ellipsePosition, setEllipsePosition,
  userHazards, setUserHazards, draggableRef) => {

  setEllipsePosition({
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
  });

  var ellips = draggableRef.current;
  ellips.position({
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
  });

  let userHazardsUpdate = {
    ...userHazards,
    ellipses: userHazards.ellipses.map((eachEllips, currentIdx) => {
      if (currentIdx !== idx) {
        return eachEllips;
      }
      return {
        x: e.target._lastPos.x,
        y: e.target._lastPos.y,
        radiusX: 12.5,
        radiusY: 12.5,
        stroke: "black",
        strokeWidth: 0.5,
        idx: idx
      }
    })
  }

  setUserHazards(userHazardsUpdate);
}

const TOOLBAR_ELLIPSE_DRAG = (
  e, idx, ellipsePosition, setEllipsePosition,
  userHazards, setUserHazards, draggableRef) => {

  setEllipsePosition({
    x: ellipsePosition.x,
    y: ellipsePosition.y
  });

  var ellips = draggableRef.current;
  ellips.position({
    x: ellipsePosition.x,
    y: ellipsePosition.y
  });

  let newEllips = {
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
    radiusX: 12.5,
    radiusY: 12.5,
    stroke: "black",
    strokeWidth: 0.5,
    idx: uuidv4()
  }

  let userHazardsUpdate = {
    ...userHazards,
    ellipses: [...userHazards.ellipses, newEllips]
  }

  setUserHazards(userHazardsUpdate);
}

const TOOLBAR_IMAGE_DRAG = (
  e, idx, imagePosition, setImagePosition,
  userHazards, setUserHazards, draggableRef) => {

  setImagePosition({
    x: imagePosition.x,
    y: imagePosition.y
  });

  var imag = draggableRef.current;
  imag.position({
    x: imagePosition.x,
    y: imagePosition.y
  });

  let newImag = {
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
    width: 35,
    height: 35,
    idx: uuidv4()
  }

  let userHazardsUpdate = {
    ...userHazards,
    images: [...userHazards.images, newImag]
  }

  setUserHazards(userHazardsUpdate);
}

const STANDARD_IMAGE_DRAG = (
  e, idx, ImagePosition, setImagePosition,
  userHazards, setUserHazards, draggableRef) => {

  setImagePosition({
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
  });

  var imag = draggableRef.current;
  imag.position({
    x: e.target._lastPos.x,
    y: e.target._lastPos.y,
  });

  let userHazardsUpdate = {
    ...userHazards,
    images: userHazards.images.map((eachImage, currentIdx) => {
      if (currentIdx !== idx) {
        return eachImage;
      }
      return {
        x: e.target._lastPos.x,
        y: e.target._lastPos.y,
        width: 35,
        height: 35,
        idx: uuidv4()
      }
    })
  }

  setUserHazards(userHazardsUpdate);
}

const STANDARD_IMAGE_DELETE = (e, idx, eachImg, userHazards, setUserHazards) => {
  console.log(idx);

  let userHazardsUpdate = {
    ...userHazards,
    images: userHazards.images.filter(images => {
      return images.idx !== idx;
    })
  }
  setUserHazards(userHazardsUpdate);
}


//creating a functional component here of the Draggable Rectangle
const DraggableReferenceRectangle = (props) => {
  // ---------------------------------------  // setting the original state of the rectangle position

  const [rectanglePosition, setRectanglePosition] = useState(props.initialPosition)

  const draggableRef = useRef(null);
  const transformRef = useRef();

  useEffect(() => {
    if (props.isSelected) {
      // -------------------------------
      transformRef.current.nodes([draggableRef.current]);
      console.log(transformRef.current.getLayer());
      transformRef.current.getLayer().batchDraw();
    }

  }, [props.isSelected]);

 
  return (
    <>
      {/* rectangle which is going to be dragged */}

      <Rect
        onClick={props.onSelect}
        onTap={props.onSelect}
        ref={draggableRef}
        {...props.shapeProps}
        x={rectanglePosition.x}
        y={rectanglePosition.y}
        width={25}
        height={25}
        stroke="black"
        strokeWidth={0.5}
        draggable
        // onClick={props.onClick}
        onChange={props.onChange}
        onDragEnd={(e) => { props.onDragEnd(e, props.idx, rectanglePosition, setRectanglePosition, props.userHazards, props.setUserHazards, draggableRef) }}
        // onTransformEnd={props.onTransformEnd}
        // Only add TransformEnd at app level for the draggable rectangle (which isn;t within toolbar)
        //Drag was made at this level because you can drag both the toolbar rect and standard rect
        isSelected={props.isSelected}
      />
      {props.isSelected && (
        <Transformer
          ref={transformRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )
      }
    </>
  )
}

const DraggableReferenceImage = (props) => {
  const [img] = useImage("https://www.tinyurl.com/1mcn26eq");
  const draggableRef = useRef(null);
  const [imagePosition, setImagePosition] = useState(props.initialPosition)

  return (
    <Image
      image={img}
      ref={draggableRef}
      x={imagePosition.x}
      y={imagePosition.y}
      width={35}
      height={35}
      draggable
      onClick={props.onClick}
      onDragEnd={(e) => { props.onDragEnd(e, props.idx, imagePosition, setImagePosition, props.userHazards, props.setUserHazards, draggableRef) }}
    />
  )

}

const DraggableReferenceEllipse = (props) => {

  const [ellipsePosition, setEllipsePosition] = useState(props.initialPosition)

  const draggableRef = useRef(null);

  return (
    <>
      <Ellipse
        ref={draggableRef}
        x={ellipsePosition.x}
        y={ellipsePosition.y}
        radiusX={12.5}
        radiusY={12.5}
        stroke="black"
        strokeWidth={0.5}
        draggable
        onClick={props.onClick}
        onDragEnd={(e) => { props.onDragEnd(e, props.idx, ellipsePosition, setEllipsePosition, props.userHazards, props.setUserHazards, draggableRef) }}
      />
    </>
  )
}


const ToolBar = (props) => {
  // ---------------------------------------//creating a functional component of the Draggable Toolbar
  const [toolbarAttributes, setToolbarAttributes] = useState(null);

  const toolbarRef = useCallback(node => {
    if (node !== null) {
      setToolbarAttributes(node.attrs);
    }
  }, []);

  return (
    <Layer draggable height={window.innerHeight} width={window.innerwidth}>
      <Rect
        ref={toolbarRef}
        x={10}
        y={window.innerHeight / 2 - 200 / 2}
        width={50}
        height={200}
        stroke="black"
        strokeWidth={1.5}
        fill="white"
      />

      {/* create base rectangle - REMOVED */}
      {/* <Rect
        x={22.5}
        y={window.innerHeight / 2 - 50}
        width={25}
        height={25}
        stroke="black"
        strokeWidth={0.5}

      /> */}
      <DraggableReferenceRectangle
        key={`TOOLBAR_RECT`}
        idx={0}
        setUserHazards={props.setUserHazards}
        userHazards={props.userHazards}
        onDragEnd={TOOLBAR_RECTANGLE_DRAG}
        initialPosition={{ x: 22.5, y: (!props.toolbarAttributes) ? (window.innerHeight / 2 - 50) : props.toolbarAttributes.y + 50 }}
      />
      {/* create base ellipse - REMOVED */}
      {/* <Ellipse
        x={35}
        y={window.innerHeight / 2}
        radiusX={12.5}
        radiusY={12.5}
        stroke="black"
        strokeWidth={0.5}
      /> */}

      <DraggableReferenceEllipse
        key={`TOOLBAR_ELLIP`}
        x={35}
        y={window.innerHeight / 2}
        radiusX={12.5}
        radiusY={12.5}
        setUserHazards={props.setUserHazards}
        userHazards={props.userHazards}
        stroke="black"
        strokeWidth={0.5}
        onDragEnd={TOOLBAR_ELLIPSE_DRAG}
        initialPosition={{ x: 35, y: (!props.toolbarAttributes) ? (window.innerHeight / 2) : props.toolbarAttributes.y }}
      />

      {/* REMOVED */}
      {/* <Image
        x={18}
        y={window.innerHeight / 2 + 30} s
        width={35}
        height={35}
      /> */}

      <DraggableReferenceImage
        key={`TOOLBAR_IMAGE`}
        x={18}
        y={window.innerHeight / 2 + 30}
        width={35}
        height={35}
        setUserHazards={props.setUserHazards}
        userHazards={props.userHazards}
        onDragEnd={TOOLBAR_IMAGE_DRAG}
        initialPosition={{ x: 18, y: (!props.toolbarAttributes) ? (window.innerHeight / 2 + 30) : props.toolbarAttributes.y - 30 }}
      />

    </Layer>
  )
}


const App = () => {

  const [userHazards, setUserHazards] = useState({ rectangles: [], ellipses: [], images: [] });
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      console.log(selectShape);
    }
  };

  console.log(`SELECTED SHAPE: ${selectedId}`)

  return (
    //creates background stage (like canvas)
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      {/* add a layer for the canvas */}
      <Layer>
        {/* loop through all the rectangles, and draw them on the screen */}
        {userHazards.rectangles.map((eachRect, idx) => {
          return (
            <DraggableReferenceRectangle
              key={`USER_RECT_${eachRect.idx}`}
              idx={eachRect.idx}
              setUserHazards={setUserHazards}
              userHazards={userHazards}
              onDragEnd={STANDARD_RECTANGLE_DRAG}
              shapeProps={eachRect.idx}
              initialPosition={{ x: eachRect.x, y: eachRect.y }}
              // onDblClick={(e) => { STANDARD_RECTANGLE_DELETE(e, eachRect.idx, eachRect, userHazards, setUserHazards) }}
              isSelected={eachRect.idx === selectedId}
              onSelect={() => {
                selectShape(eachRect.idx);
              }}
              onChange={(newAttrs) => {
                const rects = userHazards.rectangles.slice();
                rects[eachRect.idx] = newAttrs;
                setUserHazards(rects);
              }}
            />
          )
        })}
        {userHazards.ellipses.map((eachEllips, idx) => (
          <DraggableReferenceEllipse
            key={`USER_ELLIPS_${eachEllips.idx}`}
            idx={eachEllips.idx}
            setUserHazards={setUserHazards}
            userHazards={userHazards}
            onDragEnd={STANDARD_ELLIPSE_DRAG}
            initialPosition={{ x: eachEllips.x, y: eachEllips.y }}
            onClick={(e) => { STANDARD_ELLIPSE_DELETE(e, eachEllips.idx, eachEllips, userHazards, setUserHazards) }}
          />
        ))}


        {userHazards.images.map((eachImg, idx) => (
          <DraggableReferenceImage
            key={`USER_IMG_${eachImg.idx}`}
            idx={eachImg.idx}
            setUserHazards={setUserHazards}
            userHazards={userHazards}
            onDragEnd={STANDARD_IMAGE_DRAG}
            initialPosition={{ x: eachImg.x, y: eachImg.y }}
            onClick={(e) => { STANDARD_IMAGE_DELETE(e, eachImg.idx, eachImg, userHazards, setUserHazards) }}
          />
        ))}
      </Layer>

      {/* Making toolbar draggable */}
      <ToolBar
        setUserHazards={setUserHazards}
        userHazards={userHazards}
      />

    </Stage >
  );
}


export default App;