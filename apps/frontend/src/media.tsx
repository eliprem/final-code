import { useState } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import EditModal from "./edit-modal";
import axios from "axios";
//import { useParams } from "react-router-dom";


type MediaProps = {
    _id: string;
    title: string;
    rating: number;
    type: string;
    review: string;
    imgUrl: string;
    onDelete: (string) => void;
    onEdit: (updatedMedia: unknown) => void;
};

const Media = ({ _id, title, rating, type, review, imgUrl, onDelete, onEdit}: MediaProps) => {


    //const { id } = useParams();

    const [isHovered, setIsHovered] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    
    // Function to handle edit
    const handleEdit = async (updatedMedia) => {
        try {
            const response = await axios.put(`/api/media/${_id}`, updatedMedia);
            onEdit(response.data); // Update media state in the parent component
            setShowModal(false);
        } catch (error) {
            //console.error("Error editing media:", error);
            // eslint-disable-next-line no-alert
            alert('Error updating media.');
        }
    };


    const handleDelete = async () => {
        try {
            // console.log(id);
            // console.log(_id);
            await axios.delete(`/api/media/${_id}`);
            onDelete(_id);
        } catch (error) {
            //console.error("Error deleting media:", error);
            // eslint-disable-next-line no-alert
            alert('Error deleting media.');
        }
    };

    
    const generateStarRating = (rating: number): string => {
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        return '⭐'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    };

    const starRating = generateStarRating(rating);


    return (
        <div id="contact" className="shadow">
            <Card 
                className="cards"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Card.Img variant="top" src={imgUrl}></Card.Img>
                {isHovered ? (
                    <Card.Body>
                        <Card.Text>{review}</Card.Text>
                    </Card.Body>
                ) : (
                   <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <br/>
                    <Card.Subtitle>{type}</Card.Subtitle>
                </Card.Body>
                )}

                {isHovered ? (
                    <Card.Footer className="text-muted">
                        <div className="button-container">
                            <Button variant="primary" onClick={handleShowModal} data-toggle="modal" data-target="#myModal">Edit</Button>
                            <Button variant="danger" onClick = {handleDelete}>Delete</Button>
                        </div>
                   </Card.Footer>
                ) : (
                   <Card.Footer className="text-muted">{starRating}</Card.Footer>
                )}
            </Card>

            <EditModal
                show={showModal}
                handleClose={handleCloseModal}
                handleEdit={handleEdit}
                media={{ _id, title, rating, type, review, imgUrl }}
                // onUpdateMedia={onUpdateMedia}
            />



        </div>
    );
};

export default Media;