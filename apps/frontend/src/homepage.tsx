import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Media from "./media";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import AddModal from "./add-modal";
import { Dropdown, DropdownButton } from "react-bootstrap";




function MediaGenius() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [media, setMedia] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const navigate = useNavigate();
    const routeLogin = () => {
         const path = "/login"
         navigate(path);
    }
    const [filteredType, setFilteredType] = useState('');
    const [filteredRating, setFilteredRating] = useState('');


    //checking if user is logged in
    useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get('/api/account');
            setLoggedIn(response.data.loggedIn);
            if (response.data.loggedIn) {
                setUsername(response.data.username);
            }
            } catch (error) {
                //console.error('Error checking login status:', error);
                // eslint-disable-next-line no-alert
                alert('Error checking login status. Please try again.');
            }
        };
        checkLoginStatus();
        const interval = setInterval(checkLoginStatus, 2000);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let url = '/api/media/bycreator';
                if (loggedIn) {
                    url += `?type=${filteredType}&rating=${filteredRating}`;
                }
                const response = await axios.get(url);
                setMedia(response.data);
            } catch (error) {
                //console.error('Error fetching media:', error);
                // eslint-disable-next-line no-alert
                alert('Error fetching media. Please try again.');
            }
        };
        fetchData();

        if (loggedIn) {
            const interval = setInterval(fetchData, 2000);
            return () => clearInterval(interval); 
        }
    }, [loggedIn, filteredType, filteredRating]);
    

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/account/logout');
            routeLogin();
        } catch (error) {
            // eslint-disable-next-line no-alert
            alert('Logout failed.');
        }
    };

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const handleDeleteMedia = async (deletedId) => {
        try {
            setMedia(media.filter(item => item._id !== deletedId)); // Update media list by filtering out the deleted item
        } catch (error) {
            //console.error("Error deleting media:", error);
            // eslint-disable-next-line no-alert
            alert('Error deleting media.');
        }
    };

    const handleEditMedia = async (updatedMedia) => {
        try {
            setMedia(media.map(item => item._id === updatedMedia._id ? updatedMedia : item)); // Update media list with edited item
        } catch (error) {
            //console.error("Error editing media:", error);
            // eslint-disable-next-line no-alert
            alert('Error updating media.');
        }
    };

    const getStarRating = (rating) => {
        return '⭐'.repeat(parseInt(rating));
    };

    
    return (
        <Container>
            <h2>
                <span className="font-2">Media Genius</span>
                <div className="logout-container">
                    <span className="font-1">{username}</span>
                    <button className="logout-button" onClick={handleLogout}>&#x27A0;</button>
                    {/* other button options: &#x2348; &#x27A0; &#x27A5; */}
                </div>
            </h2>
            <br/>
            <Container fluid>
                <Row style={{ marginBottom: '15px' }}>
                    <Col>
                        <Button className="transparent-button" onClick={handleShowAddModal}>Add Media</Button>
                    </Col>
                    <Col>
                        <DropdownButton className="filter" title={`Type: ${filteredType || 'All'}`} onSelect={(eventKey) => setFilteredType(eventKey)}>
                            <Dropdown.Item eventKey="">All</Dropdown.Item>
                            <Dropdown.Item eventKey="Book 📖">Book 📖</Dropdown.Item>
                            <Dropdown.Item eventKey="Movie 🎥">Movie 🎥</Dropdown.Item>
                            <Dropdown.Item eventKey="TV Show 📺">TV Show 📺</Dropdown.Item>
                            <Dropdown.Item eventKey="Album 💿">Album 💿</Dropdown.Item>
                            <Dropdown.Item eventKey="Song 🎵">Song 🎵</Dropdown.Item>
                            <Dropdown.Item eventKey="Podcast 🎙️">Podcast 🎙️</Dropdown.Item>
                            <Dropdown.Item eventKey="Video Game 🎮">Video Game 🎮</Dropdown.Item>
                            <Dropdown.Item eventKey="Other ❓">Other ❓</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col>
                        <DropdownButton className="filter" title={`Rating: ${getStarRating(filteredRating) || 'All'}`} onSelect={(eventKey) => setFilteredRating(eventKey)}>
                            <Dropdown.Item eventKey="">All</Dropdown.Item>
                            <Dropdown.Item eventKey="1">⭐</Dropdown.Item>
                            <Dropdown.Item eventKey="2">⭐⭐</Dropdown.Item>
                            <Dropdown.Item eventKey="3">⭐⭐⭐</Dropdown.Item>
                            <Dropdown.Item eventKey="4">⭐⭐⭐⭐</Dropdown.Item>
                            <Dropdown.Item eventKey="5">⭐⭐⭐⭐⭐</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
            {/* <br/>
            <Button className="transparent-button" onClick={handleShowAddModal}>Add Media</Button>
            <br/> */}
            <Container fluid>

                {media && media.length > 0 && (
                    media.reduce((rows, m, index) => {
                        if (index % 3 === 0) {
                            rows.push([]);
                        }
                        rows[rows.length - 1].push(
                            <Col sm={4} key={m._id}>
                                <div className={`holder`}>
                                    <Media key={m._id} {...m} onDelete={handleDeleteMedia} onEdit={handleEditMedia} />
                                </div>
                            </Col>
                        );
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <Row key={rowIndex} style={{ marginBottom: '25px' }}>
                            {row}
                        </Row>
                    ))
                )}

                {/* {media && media.length > 0 && (
                    media.reduce((rows, m, index) => {
                        if (index % 3 === 0) {
                            rows.push([]);
                            if (rows.length === 1 && !rows[0].includes('placeholder')) {
                                // Push the placeholder card as the first element in the first row
                                rows[0].push(
                                    <Col sm={4} key={`placeholder-${index}`}>
                                        <div className={`holder`}>
                                            <Button className="transparent-button" onClick={handleShowAddModal}>  +  </Button>

                                             <Card className="add-media-card">
                                                <Card.Body>
                                                    <Button className="transparent-button" onClick={handleShowAddModal}>  +  </Button>
                                                </Card.Body>
                                                <Card.Subtitle className="new-rocker">Add Media</Card.Subtitle>
                                                <br/>
                                            </Card> 
                                        </div>
                                    </Col>
                                );
                                // Push the first and second elements from the media list to the middle and last columns
                                if (media.length >= 2) {
                                    rows[0].push(
                                        <Col sm={4} key={media[0]._id}>
                                            <div className={`holder`}>
                                                <Media key={media[0]._id} {...media[0]} onDelete={handleDeleteMedia} onEdit={handleEditMedia} />
                                            </div>
                                        </Col>
                                    );
                                }
                                if (media.length >= 3) {
                                    rows[0].push(
                                        <Col sm={4} key={media[1]._id}>
                                            <div className={`holder`}>
                                                <Media key={media[1]._id} {...media[1]} onDelete={handleDeleteMedia} onEdit={handleEditMedia} />
                                            </div>
                                            <br/>
                                        </Col>
                                    );
                                }
                            }
                        } else {
                            // Push the rest of the media in row and column format sequentially
                            rows[rows.length - 1].push(
                                <Col sm={4} key={media[index + 1]._id}>
                                    <div className={`holder`}>
                                        <Media key={media[index + 1]._id} {...media[index + 1]} onDelete={handleDeleteMedia} onEdit={handleEditMedia} />
                                    </div>
                                </Col>
                            );
                        }
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <Row key={rowIndex} style={{ marginBottom: '25px' }}>
                            {row}
                        </Row>
                    ))
                )} */}
            </Container>

            <AddModal show={showAddModal} handleClose={handleCloseAddModal} />

        </Container>
    );
};

export default MediaGenius;