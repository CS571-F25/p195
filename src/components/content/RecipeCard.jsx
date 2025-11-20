import { Card } from "react-bootstrap";
import { useNavigate } from "react-router"


export default function RecipeCard (props) {

    const nav = useNavigate();
    const tags = props.tags.reduce((acc, tag) => acc + " #" + tag, "");

    return <Card style={{ width: '18rem', margin: '10px' }} onClick={ () => nav("/recipe") }>
        <Card.Header>This will be an image</Card.Header>
        <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>Created by {props.chef}
            <br/>{tags}
            <br/>Rating: {props.rating} stars</Card.Text>
        </Card.Body>
    </Card>
}