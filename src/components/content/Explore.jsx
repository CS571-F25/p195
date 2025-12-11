import { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import RecipeCard from "./RecipeCard";

export default function Explore(props) {
  const [recipes, setRecipes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/recipe-cards", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    })
      .then(res => res.json())
      .then(data => {
        setRecipes(data.results);
      });
  }, []);

  const recipeEntries = Object.entries(recipes);

  // Collect unique tags
  const tags = [];
  recipeEntries.forEach(([id, recipe]) => {
    recipe.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
  });

  // Filter recipes by name and tag
  const filteredEntries = recipeEntries.filter(([id, recipe]) => {
    const matchesName = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? recipe.tags.includes(selectedTag) : true;
    return matchesName && matchesTag;
  });

  return (
    <Container className="mt-4">
      <div className="justify-content-center text-center mb-4">
        <h1>Foodie Explore</h1>
        <p>
          Browse through our multitudes of recipes, or find exactly what you're looking for!
        </p>

        {/* 🔍 Search + Tag Filter */}
        <div className="d-flex justify-content-center mt-3">
          <Form.Control
            type="text"
            placeholder="Search recipes by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: "400px", marginRight: "1rem" }}
          />
          <Form.Select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            style={{ maxWidth: "200px" }}
          >
            <option value="">Filter by tag...</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <Row className="justify-content-center">
        {filteredEntries.length > 0 ? (
          filteredEntries.map(([id, recipe]) => (
            <Col
              key={id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex justify-content-center mb-4"
            >
              <RecipeCard {...recipe} />
            </Col>
          ))
        ) : (
          <p className="text-center mt-4">No recipes found.</p>
        )}
      </Row>
    </Container>
  );
}