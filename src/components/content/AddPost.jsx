import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function AddPost() {
  const [name, setName] = useState("");
  const [chef, setChef] = useState("");
  const [tags, setTags] = useState("");
  const rating = 5;
  const [image, setImage] = useState("");
  const alt = name;
  const [cookTime, setCookTime] = useState("");
  const [relativePrice, setRelativePrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Full recipe object
    const recipe = {
      name,
      chef,
      tags: tags.split(",").map(tag => tag.trim()),
      rating,
      image,
      alt,
      cookTime: Number(cookTime),
      relativePrice: Number(relativePrice),
      ingredients: ingredients.split("\n").map(line => {
        const [ingredient, amount] = line.split(":").map(s => s.trim());
        return { ingredient, amount };
      }),
      instructions: instructions.split("\n").map(step => step.trim()),
      comments: [] // always add empty comments array
    };

    // Recipe card object
    const recipeCard = {
      name,
      chef,
      tags: tags.split(",").map(tag => tag.trim()),
      rating,
      image,
      alt
    };

    try {
      const resFull = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/full-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": CS571.getBadgerId()
        },
        body: JSON.stringify(recipe)
      });

      const resCard = await fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/recipe-cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CS571-ID": CS571.getBadgerId()
        },
        body: JSON.stringify(recipeCard)
      });

      if (resFull.status === 200 && resCard.status === 200) {
        alert("Recipe successfully added!");
      } else {
        alert("Failed to add recipe.");
      }
    } catch (err) {
      alert("Error submitting recipe.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>Add a New Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Chef</Form.Label>
          <Form.Control value={chef} onChange={e => setChef(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control value={tags} onChange={e => setTags(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control value={image} onChange={e => setImage(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cook Time (minutes)</Form.Label>
          <Form.Control type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Relative Price</Form.Label>
          <Form.Control type="number" step="0.01" value={relativePrice} onChange={e => setRelativePrice(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ingredients (one per line, format: Ingredient: Amount)</Form.Label>
          <Form.Control as="textarea" rows={4} value={ingredients} onChange={e => setIngredients(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Instructions (one step per line)</Form.Label>
          <Form.Control as="textarea" rows={4} value={instructions} onChange={e => setInstructions(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">Submit Recipe</Button>
      </Form>
    </div>
  );
}