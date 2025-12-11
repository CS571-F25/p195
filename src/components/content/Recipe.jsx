import { Button, Table } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";

export default function Recipe({ fullRecipes }) {
  // Get recipe name from URL or navigation state
  const { name } = useParams();
  const location = useLocation();
  const recipeName = location.state?.recipeName || decodeURIComponent(name);

  // Find the full recipe by name
  const recipe = Object.values(fullRecipes).find(r => r.name === recipeName);

  if (!recipe) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Recipe not found.</p>;
  }

  return (
    <div style={{ width: "100%", textAlign: "center", margin: "20px auto" }}>
      {/* Hero Image */}
      <img
        src={recipe.image}
        alt={recipe.alt}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
      />

      {/* Title & Chef */}
      <h1 style={{ marginTop: "20px" }}>{recipe.name}</h1>
      <h3>By {recipe.chef}</h3>

      {/* Tags, Rating, Cook Time, Price */}
      <p>
        Tags: {recipe.tags?.map(tag => `#${tag}`).join(" ")}
        <br />
        Rating: {recipe.rating} stars
        <br />
        Cook time: {recipe.cookTime} minutes
        <br />
        Relative Price: ${recipe.relativePrice}
      </p>

      {/* Ingredients Table */}
      <h4>Ingredients:</h4>
      <Table striped bordered hover style={{ maxWidth: "600px", margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recipe.ingredients.map((item, index) => (
            <tr key={index}>
              <td>{item.ingredient}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Instructions */}
      <h4 style={{ marginTop: "20px" }}>Instructions:</h4>
      <ol style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Comments */}
      <h4 style={{ marginTop: "20px" }}>Comments:</h4>
      {recipe.comments.length > 0 ? (
        <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
          {recipe.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}

      {/* Favorites Button */}
      <Button variant="primary" style={{ marginTop: "20px" }}>
        Add to Favorites
      </Button>
    </div>
  );
}