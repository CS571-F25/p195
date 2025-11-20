import { Button } from "react-bootstrap";

export default function Recipe (props) {
    return <div style={{width: '100%', textAlign: 'center'}}>
        <h1>This is where a recipe image would be!</h1>
        <h1>Recipe Name</h1>
        <h3>By Chef Name</h3>
        <p>#tag1 #tag2 #tag3
        <br/>Rating: 4.5 stars
        <br/>Cook time:
        <br/>Relative Price:</p>
        <p></p>
        <p>Ingredients:</p>
        <p>(Table of ingredients)</p>
        <p>Instructions:</p>
        <p>(Step by step instructions)</p>
        <p>Comments Section:</p>
        <Button variant="primary">Add to Favorites</Button>
    </div>
}