import React from 'react'
import { Heading, List, Stack, Input, Button } from "@chakra-ui/react";
import Player from "./Player";
import { useState,useEffect  } from "react";
import { useDrop } from "react-dnd";

export default function Main() {

    const [players, setPlayer] = useState([
        // { name: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2017/11/autumn_fireball/17255671-1-eng-GB/Autumn_fireball.jpg" },
        // { name: "https://2.bp.blogspot.com/_opS9Z5vqQYQ/TTYrMHXNiRI/AAAAAAAAAVA/H0gJ2oCoBTg/s1600/html5_bg_no_icons.png" },
        // { name: "https://th.bing.com/th/id/OIP.X8E5YwaBzsJ5QtHWeSGuiQHaEK?rs=1&pid=ImgDetMain" },
    ]);

    const [team, setTeam] = useState([]);

    const [listStyle, setListStyle] = useState({
        width: "100%",
        padding: "5px",
        align: "center",
    });

    const [isurl, setIsurl] = useState("");

    const [showsidebar, setshowsidebar] = useState(true);

    const [{ isOver }, addToTeamRef] = useDrop({
        accept: "player",
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
        accept: "team",
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    const movePlayerToTeam = (item) => {
        console.log(item);

        setPlayer((prev) => prev.filter((_, i) => item.index !== i));
        // setTeam((prev) => [item]);
        setTeam((prev) => [item, ...prev]);
    };

    const removePlayerFromTeam = (item) => {
        console.log(item);
        // setTeam((prev) => prev.filter((_, i) => item.index !== i));
        // setPlayer((prev) => [...prev, item]);
    };

    const handleWidthChange = (e) => {
        setListStyle({ ...listStyle, width: e.target.value });
    };

    const handlePaddingChange = (e) => {
        setListStyle({ ...listStyle, padding: e.target.value });
    };

    const handleAlignmentChange = (e) => {
        setListStyle({ ...listStyle, align: e.target.value });
    };

    const handleUrlChange = (e) => {
        setIsurl(e.target.value);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file instanceof Blob) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const image = reader.result;
                setPlayer([...players, { name: image }]);
            };
            reader.readAsDataURL(file);
        } else {
            console.log('Invalid file selected');
        }
    };

    const generateImageJSON = (image, styles, link) => {
        return {
            filename: image.name,
            src: image.name,
            styles: styles,
            link: link,
        };
    };

    const Onclickresponse = (e) => {
        console.log(e);
        setmobileview(!ismobileview)
        console.log(ismobileview);
    }

    const handleSidebar = (e) => {
        setshowsidebar(!showsidebar)
    }

    const [ismobileview, setmobileview] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth<=750 ) {setshowsidebar(false);}
            else{
                setshowsidebar(true);
            }
            
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ minHeight: "100vh" }}>
            
            <div className='main'>
            
                <div className={showsidebar ? 'first' : 'first  hidesidebar'} >
                    
                    <div className='first-1' style={{ height: "100%" }}>
                        <Stack width="100%" style={{ height: "100%" }} >

                            <Heading fontSize="3xl" color="yellow.800" textAlign="center">
                                <Button colorScheme='teal' size='sm' onClick={(e) => { Onclickresponse(e) }} style={{ float: "left" }}>{ismobileview ? 'Desktop' : 'Mobile'}</Button>
                                
                                Drag
                            </Heading>
                            <List
                                bgGradient={
                                    isPlayerOver
                                        ? "linear(to-b, yellow.300, yellow.500)"
                                        : "linear(to-b, yellow.100, yellow.200)"
                                }
                                ref={removeFromTeamRef}
                                minH="70vh"
                                boxShadow="xl"
                                borderRadius="md"
                                height="100%"
                                style={{ height: "100%" }}
                            >
                                <input type="file" accept="image/*" style={{ maxWidth: "100%", width: "100%", padding: "20px" }} onChange={handleImageUpload} />
                                {players.map((p, i) => (
                                    <Player
                                        item={p}
                                        key={i}
                                        playerType="player"
                                        styles={listStyle}
                                        onDropPlayer={movePlayerToTeam}
                                        index={i}
                                    />
                                ))}
                                
                                <div className='first-2'>
                                    <Stack justify="space-between">
                                        <Heading fontSize="3xl" color="gray.800" textAlign="center">
                                            Styling Options
                                        </Heading>

                                        <div className='input-group'>
                                            <label htmlFor="width">Width: </label>
                                            <Input
                                                type="text"
                                                placeholder="Width"
                                                value={listStyle.width}
                                                onChange={handleWidthChange}
                                                mb="2"
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor="width">Padding: </label>
                                            <Input
                                                type="text"
                                                placeholder="Padding"
                                                value={listStyle.padding}

                                                onChange={handlePaddingChange}
                                                mb="2"
                                            />
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor="width">Align: </label>
                                            <select value={listStyle.align} onChange={handleAlignmentChange} mb="2">
                                                <option value="start">Left</option>
                                                <option value="center">Center</option>
                                                <option value="end">Right</option>
                                            </select>
                                        </div>

                                        <div className='input-group'>
                                            <label htmlFor="width">Url: </label>
                                            <Input type="url" value={isurl} onChange={handleUrlChange} placeholder="URL" />
                                        </div>
                                        
                                    </Stack>
                                    <Button colorScheme='teal' size='sm' onClick={(e) => { }} style={{ }}>Preview</Button>
                                </div>
                            </List>
                        </Stack>
                    </div>

                </div>


                <div className={ismobileview ? 'second second-mobile' : showsidebar? "second":"second hidesidebar2"} style={{}}>
                    <Stack className={ismobileview ? 'second-mobile-child' : ''} width="100%" style={{ height: "100%" }}>
                        <Heading fontSize="3xl" color="teal.800" textAlign="center">
                            Drop
                            <Button colorScheme='teal' size='sm' onClick={(e) => { handleSidebar(e) }} style={{ float: "right" }}>{showsidebar ? 'Hide' : 'Show'}</Button>
                        </Heading>
                        <List
                            bgGradient={
                                isOver
                                    ? "linear(to-b, teal.300, teal.500)"
                                    : "linear(to-b, teal.100, teal.200)"
                            }
                            ref={addToTeamRef}
                            minH="70vh"
                            boxShadow="xl"
                            borderRadius="md"
                            p="4"
                            style={{ height: "100%" }}
                        >
                            {team.map((p, i) => {
                                const imageDetails = generateImageJSON(p, listStyle, isurl);
                                console.log('Image Details:', imageDetails);
                                return (
                                    <Player
                                        item={p}
                                        key={p}
                                        index={i}
                                        playerType="team"
                                        styles={listStyle}
                                        link={isurl}
                                        onDropPlayer={removePlayerFromTeam}
                                    />
                                );
                            })}
                            {/* {team.map((p, i) => (
              <Player
                item={p}
                key={p}
                index={i}
                playerType="team"
                styles={listStyle}
                link={isurl}
                onDropPlayer={removePlayerFromTeam}
              />
            ))} */}
                        </List>
                    </Stack>

                </div>
            </div>
        </div>
    )
}
