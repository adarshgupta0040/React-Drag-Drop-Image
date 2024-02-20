import { useDrag } from "react-dnd";

const Player = ({ item, playerType, onDropPlayer, index, styles, link }) => {

  console.log(link)
  const handleImageClick = () => {
    if (link) {
      window.open("http://" + link, "_blank");
    }
    else {
      console.log('Invalid URL:', link);
    }
  };

  // console.log(styles)
  const [{ isDragging }, dragRef] = useDrag({
    type: playerType,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        onDropPlayer(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });



  return (
    <div className="image" style={{ display: "flex", justifyContent: playerType === "team" ? styles.align : "center" }}>
      <img
        src={item.name}
        alt={item.name}
        ref={dragRef}
        style={{
          height: "auto",
          opacity: isDragging ? 0.5 : 1,
          width: playerType === "team" ? styles.width : "100%",
          padding: playerType === "team" ? styles.padding : "4px",
        }}
        onClick={playerType === "team" ? handleImageClick : undefined}
      />

    </div>
  );
};
export default Player;















// const Player = ({ item, playerType, onDropPlayer, index,styles }) => {
//   console.log(styles)
//   const [{ isDragging }, dragRef] = useDrag({
//     type: playerType,
//     item: () => ({ ...item, index }),
//     end: (item, monitor) => {
//       const dropResult = monitor.getDropResult();

//       if (item && dropResult) {
//         onDropPlayer(item);
//       }
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//   <div class = "image">
//     <img
//     src={item.name}
//     alt={item.name}
//     ref={dragRef}
//     style={{
//       // width:"400px"
//       // width: styles.width,
//       // width: "auto", // Adjust the width of the image as needed
//       height: "auto", // Adjust the height of the image as needed
//       // borderRadius: "50%", // Make the image circular (optional)
//       // border: isDragging ? "2px solid red" : "none", // Add border when dragging (optional)
//       opacity: isDragging ? 0.5 : 1,
//       padding: "5px"
//     }}
//   /></div>

//   );
// };

// export default Player;








// import { ListItem } from "@chakra-ui/react";
// import React from "react";
// import { useDrag } from "react-dnd";

// const Player = ({ item, playerType, onDropPlayer, index }) => {
//   const [{ isDragging }, dragRef] = useDrag({
//     type: playerType,
//     item: () => ({ ...item, index }),
//     end: (item, monitor) => {
//       const dropResult = monitor.getDropResult();

//       if (item && dropResult) {
//         onDropPlayer(item);
//       }
//     },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <ListItem
//       p="2"
//       borderRadius="md"
//       boxShadow="md"
//       mb="2"
//       textAlign="center"
//       ref={dragRef}
//       bg={
//         isDragging
//           ? playerType === "player"
//             ? "yellow.600"
//             : "teal.400"
//           : "white"
//       }
//       color={isDragging ? "white" : "black"}
//     >
//       {item.name}
//     </ListItem>
//   );
// };

// export default Player;