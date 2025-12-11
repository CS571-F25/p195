import { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import RecipeCard from "./RecipeCard";
import "./Home.css";

export default function Home(props) {
  const [recipes, setRecipes] = useState({});
  const [itemsPerSlide, setItemsPerSlide] = useState(4);
  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);
  const [season, setSeason] = useState([]);
  const [country, setCountry] = useState([]);
  const [fullRecipes, setFullRecipes] = useState({});

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
        setFeatured(Object.entries(data.results).filter(([_, recipe]) =>
          recipe.tags?.includes("featured")
        ));
        setPopular(Object.entries(data.results).filter(([_, recipe]) =>
          recipe.tags?.includes("popular")
        ));
        setSeason(Object.entries(data.results).filter(([_, recipe]) =>
          recipe.tags?.includes("winter")
        ));
        setCountry(Object.entries(data.results).filter(([_, recipe]) =>
          recipe.tags?.includes("italy")
        ));
      });

    fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/full-recipes", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId()
      }
    })
      .then(res => res.json())
      .then(data => {
        setFullRecipes(data.results);
      });
  }, []);

  // Responsive breakpoints
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setItemsPerSlide(1);
      } else if (width < 768) {
        setItemsPerSlide(2);
      } else if (width < 992) {
        setItemsPerSlide(3);
      } else {
        setItemsPerSlide(4);
      }
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const chunkEntries = (entries, size) => {
    const chunks = [];
    for (let i = 0; i < entries.length; i += size) {
      chunks.push(entries.slice(i, i + size));
    }
    return chunks;
  };

  const renderCarousel = (entries) => (
    <Container className="carousel-wrapper">
      <Carousel interval={null} controls indicators>
        {chunkEntries(entries, itemsPerSlide).map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className="carousel-slide">
              {group.map(([_, recipe]) => (
                <RecipeCard key={recipe.name} name={recipe.name} {...recipe} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );

  return (
    <div style={{ width: "100%", margin: "2rem auto" }}>
      <div className="justify-content-center text-center">
        <h1>Welcome to Foodie!</h1>
        <p>
          Your go-to app for discovering and sharing delicious recipes from around the world.
          <br />Whether you're a seasoned chef or just starting out in the kitchen, Foodie has something for everyone.
          <br />Explore a vast collection of recipes, save your favorites, and connect with a community of food enthusiasts.
          <br />Let's get cooking!
        </p>
      </div>

      <div style={{ width: "100%", margin: "2rem auto", paddingLeft: "3rem" }}>
        <h2 className="ms-3 mt-4">Featured Recipes:</h2>
        {featured.length > 0 ? renderCarousel(featured) : <p>No featured recipes available.</p>}

        <h2 className="ms-3 mt-4">Popular:</h2>
        {popular.length > 0 ? renderCarousel(popular) : <p>No popular recipes available.</p>}

        <h2 className="ms-3 mt-4">Seasonal Specials:</h2>
        {season.length > 0 ? renderCarousel(season) : <p>No seasonal specials available.</p>}

        <h2 className="ms-3 mt-4">Country of the Month: Italy</h2>
        {country.length > 0 ? renderCarousel(country) : <p>No Italian recipes available.</p>}
      </div>
    </div>
  );
}