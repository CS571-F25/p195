import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RecipeCard(props) {
  const navigate = useNavigate();
  const tags = props.tags?.map(tag => `#${tag}`).join(" ");

  const handleClick = () => {
    // Use recipe name instead of id
    navigate(`/recipe/${encodeURIComponent(props.name)}`, { state: { recipeName: props.name } });
  };

  return (
    <Card
      style={{ width: "18rem", margin: "10px", cursor: "pointer" }}
      onClick={handleClick}
    >
      <Card.Img
        variant="top"
        src={props.image}
        alt={props.alt}
        style={{
          height: "180px",
          objectFit: "cover"
        }}
      />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Created by {props.chef}
          <br />
          {tags}
          <br />
          Rating: {props.rating} stars
        </Card.Text>
      </Card.Body>
    </Card>
  );
}